import { Resend } from "resend";
import { NextResponse } from "next/server";
import QuoteEmail from "@/emails/QuoteEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, services, budget, message } = body;

    if (!firstName || !email || !phone || !message || !services?.length) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "WebGaze <noreply@webgaze.com.au>",
      to: ["hello@webgaze.com.au"],
      replyTo: email,
      subject: `Quote Request: ${firstName} ${lastName} — ${budget}`,
      react: QuoteEmail({ firstName, lastName, email, phone, services, budget, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
