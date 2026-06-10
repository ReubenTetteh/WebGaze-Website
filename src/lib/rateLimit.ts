/**
 * Tiny fixed-window failure limiter for low-traffic auth endpoints.
 *
 * In-memory and therefore per-instance — serverless instances don't share
 * state, so treat this as a brute-force speed bump, not a hard guarantee.
 * Only failures count toward the limit, so a legitimate user logging in and
 * out repeatedly is never locked out.
 */
type Window = { failures: number; resetAt: number };

const buckets = new Map<string, Window>();
const MAX_BUCKETS = 10_000; // bound memory under address-spraying

function sweep(now: number) {
  if (buckets.size < MAX_BUCKETS) return;
  buckets.forEach((w, key) => {
    if (now >= w.resetAt) buckets.delete(key);
  });
}

export function isRateLimited(key: string, maxFailures = 5): boolean {
  const w = buckets.get(key);
  if (!w || Date.now() >= w.resetAt) return false;
  return w.failures >= maxFailures;
}

export function registerFailure(key: string, windowMs = 15 * 60_000): void {
  const now = Date.now();
  sweep(now);
  const w = buckets.get(key);
  if (!w || now >= w.resetAt) {
    buckets.set(key, { failures: 1, resetAt: now + windowMs });
  } else {
    w.failures += 1;
  }
}

export function clearFailures(key: string): void {
  buckets.delete(key);
}
