import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.RESEND_API_KEY;
  return NextResponse.json({
    ok: true,
    resendKeySet: !!key,
    resendKeyPrefix: key ? key.slice(0, 6) + "…" : null,
  });
}
