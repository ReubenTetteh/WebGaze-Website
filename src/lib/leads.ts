import { sql } from "@vercel/postgres";

export type LeadType = "contact" | "quote" | "discovery";
export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];
export const LEAD_TYPES: LeadType[] = ["contact", "quote", "discovery"];

export type Lead = {
  id: number;
  created_at: string;
  type: LeadType;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  status: LeadStatus;
  data: Record<string, unknown> | null;
};

export type SaveLeadInput = {
  type: LeadType;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  message?: string | null;
  data?: Record<string, unknown>;
};

/** True once a Postgres connection string is present (Vercel injects this). */
export function isDbConfigured(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
}

// Create the table on first use so there's no manual migration step. Cached so
// the DDL only runs once per server instance; a failure clears the cache so the
// next call retries.
let schemaPromise: Promise<void> | null = null;
function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id          SERIAL PRIMARY KEY,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
          type        TEXT NOT NULL,
          first_name  TEXT,
          last_name   TEXT,
          email       TEXT,
          phone       TEXT,
          service     TEXT,
          budget      TEXT,
          message     TEXT,
          status      TEXT NOT NULL DEFAULT 'new',
          data        JSONB
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
    })().catch((err) => {
      schemaPromise = null;
      throw err;
    });
  }
  return schemaPromise;
}

/**
 * Persist a form submission. No-op (resolves silently) when the database isn't
 * configured yet, so forms keep working before the DB is provisioned. Callers
 * should still guard with try/catch so a DB outage never breaks the email path.
 */
export async function saveLead(input: SaveLeadInput): Promise<void> {
  if (!isDbConfigured()) return;
  await ensureSchema();
  await sql`
    INSERT INTO leads (type, first_name, last_name, email, phone, service, budget, message, data)
    VALUES (
      ${input.type},
      ${input.firstName ?? null},
      ${input.lastName ?? null},
      ${input.email ?? null},
      ${input.phone ?? null},
      ${input.service ?? null},
      ${input.budget ?? null},
      ${input.message ?? null},
      ${JSON.stringify(input.data ?? {})}::jsonb
    )
  `;
}

export type LeadFilters = {
  status?: string;
  type?: string;
};

export async function getLeads(filters: LeadFilters = {}): Promise<Lead[]> {
  if (!isDbConfigured()) return [];
  await ensureSchema();

  const where: string[] = [];
  const params: string[] = [];
  if (filters.status && filters.status !== "all") {
    params.push(filters.status);
    where.push(`status = $${params.length}`);
  }
  if (filters.type && filters.type !== "all") {
    params.push(filters.type);
    where.push(`type = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const { rows } = await sql.query(
    `SELECT * FROM leads ${clause} ORDER BY created_at DESC LIMIT 500`,
    params
  );
  return rows as Lead[];
}

export type LeadStats = {
  total: number;
  last7: number;
  last30: number;
  new_count: number;
  won: number;
};

export async function getLeadStats(): Promise<LeadStats> {
  if (!isDbConfigured()) return { total: 0, last7: 0, last30: 0, new_count: 0, won: 0 };
  await ensureSchema();
  const { rows } = await sql.query(`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE created_at > now() - interval '7 days')::int  AS last7,
      COUNT(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS last30,
      COUNT(*) FILTER (WHERE status = 'new')::int AS new_count,
      COUNT(*) FILTER (WHERE status = 'won')::int AS won
    FROM leads
  `);
  return rows[0] as LeadStats;
}

export async function updateLeadStatus(id: number, status: LeadStatus): Promise<void> {
  if (!isDbConfigured()) return;
  await ensureSchema();
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
}
