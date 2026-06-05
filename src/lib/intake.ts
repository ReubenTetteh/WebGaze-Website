/**
 * Hand a new lead to WebGaze OS so it can auto-acknowledge + start automations.
 *
 * Fire-and-forget and defensive: it NEVER throws and is bounded by a short
 * timeout, so a slow or down OS can never break (or noticeably delay) the form
 * submission. The lead is already saved + emailed to Reuben by the caller, so
 * the worst case is a delayed auto-reply that can be reconciled later.
 */
export type OsIntakePayload = {
  type: "contact" | "quote" | "discovery";
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  service?: string | null;
  services?: string[];
  budget?: string | null;
  message?: string | null;
};

export async function forwardToOs(payload: OsIntakePayload): Promise<void> {
  const url = process.env.OS_INTAKE_URL;
  const secret = process.env.OS_INTAKE_SECRET;
  if (!url || !secret) return; // not configured yet — no-op
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": secret },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });
  } catch (e) {
    console.error("forwardToOs failed:", e);
  }
}
