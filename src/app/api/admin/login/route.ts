import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminConfigured, sessionToken, verifyPassword } from "@/lib/adminAuth";
import { getClientIp } from "@/lib/antiBot";
import { clearFailures, isRateLimited, registerFailure } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const limitKey = `admin-login:${getClientIp(req) ?? "unknown"}`;
  if (isRateLimited(limitKey)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin password is not configured. Set ADMIN_PASSWORD." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    ({ password } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!(await verifyPassword(password))) {
    registerFailure(limitKey);
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  clearFailures(limitKey);

  const token = await sessionToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
