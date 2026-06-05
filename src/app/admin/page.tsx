import Link from "next/link";
import { getLeads, getLeadStats, isDbConfigured, LEAD_STATUSES, LEAD_TYPES } from "@/lib/leads";
import LeadsTable from "./LeadsTable";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">{label}</p>
      <p className={`mt-2 font-display text-3xl font-bold ${accent ? "text-[#E01B24]" : "text-white"}`}>{value}</p>
    </div>
  );
}

function FilterChip({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${
        active
          ? "border-[#E01B24] bg-[#E01B24]/15 text-white"
          : "border-white/12 text-white/55 hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

function NotConfigured() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      <h2 className="font-display text-xl font-bold text-white">Database not connected yet</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        The dashboard is built and ready — it just needs a Postgres database to store leads. In your
        Vercel project: <span className="text-white">Storage → Create Database → Postgres (Neon)</span>.
        Vercel injects the connection automatically. Redeploy and leads will start appearing here.
      </p>
      <p className="mt-4 text-xs text-white/40">
        Until then, all form submissions still arrive by email as normal — nothing is lost.
      </p>
    </div>
  );
}

type SearchParams = { status?: string; type?: string };

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const configured = isDbConfigured();
  const status = searchParams.status ?? "all";
  const type = searchParams.type ?? "all";

  const [stats, leads] = configured
    ? await Promise.all([getLeadStats(), getLeads({ status, type })])
    : [{ total: 0, last7: 0, last30: 0, new_count: 0, won: 0 }, []];

  const buildHref = (next: Partial<SearchParams>) => {
    const params = new URLSearchParams();
    const s = next.status ?? status;
    const t = next.type ?? type;
    if (s !== "all") params.set("status", s);
    if (t !== "all") params.set("type", t);
    const qs = params.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

  return (
    <main className="min-h-screen bg-dark-bg px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E01B24]" />
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                WebGaze Dashboard
              </span>
            </div>
            <h1 className="mt-1.5 font-display text-2xl font-bold md:text-3xl">Leads &amp; Enquiries</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-white/45 transition hover:text-white">
              ← Back to site
            </Link>
            <form action={logout}>
              <button className="rounded-lg border border-white/12 px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-white/25 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>

        {!configured ? (
          <NotConfigured />
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
              <StatCard label="New" value={stats.new_count} accent />
              <StatCard label="Last 7 days" value={stats.last7} />
              <StatCard label="Last 30 days" value={stats.last30} />
              <StatCard label="Won" value={stats.won} />
              <StatCard label="Total" value={stats.total} />
            </div>

            {/* Filters */}
            <div className="mb-5 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">Status</span>
                <FilterChip active={status === "all"} href={buildHref({ status: "all" })}>all</FilterChip>
                {LEAD_STATUSES.map((s) => (
                  <FilterChip key={s} active={status === s} href={buildHref({ status: s })}>{s}</FilterChip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">Type</span>
                <FilterChip active={type === "all"} href={buildHref({ type: "all" })}>all</FilterChip>
                {LEAD_TYPES.map((t) => (
                  <FilterChip key={t} active={type === t} href={buildHref({ type: t })}>{t}</FilterChip>
                ))}
              </div>
            </div>

            <LeadsTable leads={leads} />
          </>
        )}
      </div>
    </main>
  );
}
