import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, sessionToken } from "@/lib/adminAuth";

/**
 * Authorization guard for privileged admin Server Actions.
 *
 * Middleware alone is not sufficient to protect Server Actions: Next.js
 * dispatches actions by a build-time ID, and any `"use server"` module
 * imported by a route registers ALL its exported actions for that route. The
 * middleware happens to cover every route that imports these actions today,
 * but one import from an allow-listed page would silently expose them — so
 * each privileged action verifies the session cookie itself (same defence in
 * depth as webgaze-os' requireAuth).
 *
 * Separate file from adminAuth.ts so middleware (edge) never pulls in
 * next/headers' request-scoped cookies().
 */
export async function requireAdmin(): Promise<void> {
  const expected = await sessionToken();
  const got = cookies().get(ADMIN_COOKIE)?.value;
  if (!expected || !got || got !== expected) {
    throw new Error("Unauthorized");
  }
}
