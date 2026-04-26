import { Resend } from "resend";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import ContactEmail from "@/emails/ContactEmail";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact API: RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, service, budget, message } = body;

    if (!firstName || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

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
