import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, sessionToken } from "@/lib/adminAuth";

/** Gate everything under /admin behind the password cookie (login page aside). */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The Studio is our local-only iteration lab — it must NEVER serve on a
  // deployed build (prod or preview). On `npm run dev` it works as normal; on
  // any production build it 404s, so it can't accidentally go live. Escape
  // hatch: set ENABLE_STUDIO=1 if you ever need to demo it from a deploy.
  if (pathname.startsWith("/studio")) {
    if (process.env.NODE_ENV === "production" && process.env.ENABLE_STUDIO !== "1") {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.next();
  }

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
  matcher: ["/admin/:path*", "/studio", "/studio/:path*"],
};
