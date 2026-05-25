// Lightweight, layered bot protection for the public form endpoints.
//
// 1. Honeypot  — a hidden field real users never fill; bots auto-fill everything.
// 2. Time gate — submissions faster than a human could realistically type are dropped.
// 3. Turnstile — Cloudflare's privacy-friendly CAPTCHA, verified server-side.
//
// Turnstile gracefully no-ops until TURNSTILE_SECRET_KEY is set, so the site keeps
// working before the Cloudflare keys are added — the honeypot + time gate still apply.

const MIN_SUBMIT_MS = 2500; // anything faster than ~2.5s is almost certainly a script

type AntiBotFields = {
  _hp?: unknown; // honeypot field
  _elapsedMs?: unknown; // ms the form was on screen before submit
};

/**
 * Cheap, no-network checks. Returns true if the submission looks like a bot.
 * Callers should silently pretend success when this trips, so bots learn nothing.
 */
export function failsBasicBotChecks(body: AntiBotFields): boolean {
  // Honeypot filled in → bot.
  if (typeof body._hp === "string" && body._hp.trim() !== "") return true;
  // Submitted implausibly fast → bot.
  if (typeof body._elapsedMs === "number" && body._elapsedMs < MIN_SUBMIT_MS) return true;
  return false;
}

/**
 * Verifies a Cloudflare Turnstile token against the siteverify API.
 * Returns true (i.e. "allow") when no secret is configured, so the forms keep
 * working until you add TURNSTILE_SECRET_KEY in your environment.
 */
export async function verifyTurnstile(token: unknown, ip?: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet — don't block real users
  if (typeof token !== "string" || token === "") return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}
