import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isValidEmail, textField } from "@/lib/formValidation";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Newsletter API: RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const email = textField(body.email, 254);
    const honeypot = textField(body._hp, 200);
    const elapsedMs = typeof body._elapsedMs === "number" ? body._elapsedMs : 0;

    if (honeypot || (elapsedMs > 0 && elapsedMs < 1500)) {
      return NextResponse.json({ success: true });
    }
    if (email === null || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const safeEmail = escapeHtml(email);
    const { error } = await resend.emails.send({
      from: "WebGaze <noreply@webgaze.com.au>",
      to: ["hello@webgaze.com.au"],
      replyTo: email,
      subject: `Newsletter signup: ${email}`,
      html: `<p><strong>New newsletter signup</strong></p><p>${safeEmail}</p>`,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
