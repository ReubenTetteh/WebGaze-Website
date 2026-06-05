import { Resend } from "resend";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import ContactEmail from "@/emails/ContactEmail";
import { failsBasicBotChecks, verifyTurnstile, getClientIp } from "@/lib/antiBot";
import { isValidEmail, isValidPhone, textField } from "@/lib/formValidation";
import { saveLead } from "@/lib/leads";
import { forwardToOs } from "@/lib/intake";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact API: RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot / time-gate: silently accept so bots don't learn, but send nothing.
    if (failsBasicBotChecks(body)) {
      return NextResponse.json({ success: true });
    }
    // Turnstile: real users who fail can retry.
    if (!(await verifyTurnstile(body.captchaToken, getClientIp(req)))) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const firstName = textField(body.firstName, 80);
    const lastName = textField(body.lastName, 80);
    const email = textField(body.email, 254);
    const phone = textField(body.phone, 30);
    const service = textField(body.service, 120);
    const budget = textField(body.budget, 120);
    const message = textField(body.message, 5000);

    if (
      firstName === null ||
      lastName === null ||
      email === null ||
      phone === null ||
      service === null ||
      budget === null ||
      message === null
    ) {
      return NextResponse.json({ error: "Invalid fields." }, { status: 400 });
    }

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!isValidEmail(email) || (phone && !isValidPhone(phone))) {
      return NextResponse.json({ error: "Invalid contact details." }, { status: 400 });
    }

    // Persist the lead. Never let a DB issue break the email path.
    await saveLead({
      type: "contact",
      firstName, lastName, email, phone, service, budget, message,
      data: { service, budget },
    }).catch((e) => console.error("saveLead (contact) failed:", e));

    // Hand the lead to WebGaze OS for the instant acknowledgement + follow-ups.
    await forwardToOs({ type: "contact", firstName, lastName, email, phone, service, budget, message });

    const html = await render(
      ContactEmail({ firstName, lastName, email, phone, service, budget, message })
    );

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "WebGaze <noreply@webgaze.com.au>",
      to: ["hello@webgaze.com.au"],
      replyTo: email,
      subject: `New Contact: ${firstName} ${lastName} — ${service || "General Enquiry"}`,
      html,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
