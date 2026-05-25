import { Resend } from "resend";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import DiscoveryEmail from "@/emails/DiscoveryEmail";
import { failsBasicBotChecks, verifyTurnstile, getClientIp } from "@/lib/antiBot";
import { saveLead } from "@/lib/leads";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Discovery API: RESEND_API_KEY is not set");
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

    const { firstName, lastName, email, phone, organisation, orgType, meeting, preferredTime, problem } = body;

    if (!firstName || !email || !phone || !problem) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Persist the lead. Never let a DB issue break the email path.
    await saveLead({
      type: "discovery",
      firstName, lastName, email, phone,
      service: orgType,
      message: problem,
      data: { organisation, orgType, meeting, preferredTime },
    }).catch((e) => console.error("saveLead (discovery) failed:", e));

    const html = await render(
      DiscoveryEmail({ firstName, lastName, email, phone, organisation, orgType, meeting, preferredTime, problem })
    );

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "WebGaze <noreply@webgaze.com.au>",
      to: ["hello@webgaze.com.au"],
      replyTo: email,
      subject: `Discovery Session: ${firstName} ${lastName}${organisation ? ` — ${organisation}` : ""}`,
      html,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Discovery API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
