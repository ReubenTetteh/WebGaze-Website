/**
 * Minimal single-password gate for /admin. The session cookie stores a hash of
 * the admin password (never the password itself), so it can be verified in edge
 * middleware without a database. Uses Web Crypto so it runs in both the edge
 * (middleware) and Node (route handler) runtimes.
 */
export const ADMIN_COOKIE = "wg_admin";

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Deterministic session token derived from the configured password. */
export async function sessionToken(): Promise<string | null> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  const bytes = new TextEncoder().encode(`webgaze-admin:${pw}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  // Length-then-content compare; fine for a single-user internal tool.
  return candidate === pw;
}
