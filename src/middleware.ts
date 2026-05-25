import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, sessionToken } from "@/lib/adminAuth";

/** Gate everything under /admin behind the password cookie (login page aside). */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const expected = await sessionToken();
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;

  // If not configured (no ADMIN_PASSWORD) the login page explains setup.
  if (!expected || cookie !== expected) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
