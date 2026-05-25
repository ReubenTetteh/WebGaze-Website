import { Resend } from "resend";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import QuoteEmail from "@/emails/QuoteEmail";
import { failsBasicBotChecks, verifyTurnstile, getClientIp } from "@/lib/antiBot";
import { saveLead } from "@/lib/leads";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Quote API: RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const body = await req.json();

    // Honeypot / time-gate: silently accept so bots don't learn, but send nothing.
    if (failsBasicBotChecks(body)) {
      return NextResponse.json({ success: true });
    }
    // Turnstile: real users who fail can retry.
    if (!(await verifyTurnstile(body.captchaToken, getClientIp(req)))) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const { firstName, lastName, email, phone, services, budget, message } = body;

    if (!firstName || !email || !phone || !message || !services?.length) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Persist the lead. Never let a DB issue break the email path.
    await saveLead({
      type: "quote",
      firstName, lastName, email, phone,
      service: Array.isArray(services) ? services.join(", ") : services,
      budget, message,
      data: { services, budget },
    }).catch((e) => console.error("saveLead (quote) failed:", e));

    const html = await render(
      QuoteEmail({ firstName, lastName, email, phone, services, budget, message })
    );

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "WebGaze <noreply@webgaze.com.au>",
      to: ["hello@webgaze.com.au"],
      replyTo: email,
      subject: `Quote Request: ${firstName} ${lastName} — ${budget}`,
      html,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
