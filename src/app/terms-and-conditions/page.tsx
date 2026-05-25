import ServicePageHeader from "@/components/sections/ServicePageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | WebGaze",
  description: "WebGaze's terms and conditions — your agreement when using our website and services.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://webgaze.com.au/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <>
      <ServicePageHeader title="Terms & Conditions" subtitle="Please read these terms carefully before using our website or engaging our services." backHref="/" />

      <section className="bg-light-bg dark:bg-dark-bg section-pad">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none
                          [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3
                          [&_p]:text-light-muted [&_p]:dark:text-dark-muted [&_p]:leading-relaxed [&_p]:mb-4
                          [&_ul]:text-light-muted [&_ul]:dark:text-dark-muted [&_ul]:leading-relaxed [&_ul]:space-y-1.5 [&_ul]:mb-4">

            <p className="text-base text-[#555] dark:text-[#999] mb-8">
              Last updated: May 2026 &nbsp;·&nbsp; WebGaze PTY LTD (ABN 53 694 048 158)
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the WebGaze website (webgaze.com.au) or engaging our services, you agree to be bound by
              these terms and conditions. If you do not agree, please do not use our website or services.
            </p>

            <h2>2. Services</h2>
            <p>
              WebGaze provides web design, development, branding, SEO, maintenance, and consulting services. The specific
              scope, deliverables, and terms of any project are outlined in a separate written agreement or proposal
              provided before work commences.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and code — is the property of WebGaze PTY LTD
              unless otherwise stated. Upon full payment of an engagement, clients receive ownership rights to their
              custom deliverables as specified in their project agreement.
            </p>

            <h2>4. Client Responsibilities</h2>
            <p>Clients are responsible for:</p>
            <ul>
              <li>Providing accurate content, assets, and feedback in a timely manner</li>
              <li>Ensuring they have rights to any materials supplied to WebGaze</li>
              <li>Reviewing and approving deliverables before sign-off</li>
            </ul>

            <h2>5. Payment</h2>
            <p>
              Payment terms are outlined in your project agreement. WebGaze reserves the right to pause or suspend work
              on engagements where payment is overdue by more than 14 days.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              WebGaze is not liable for any indirect, incidental, or consequential damages arising from the use of our
              website or services, including loss of revenue, data, or business opportunities.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These terms are governed by the laws of New South Wales, Australia. Any disputes will be resolved in
              the courts of New South Wales.
            </p>

            <h2>8. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of our website after changes are published
              constitutes acceptance of the updated terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a href="mailto:hello@webgaze.com.au" className="text-red-brand hover:underline">hello@webgaze.com.au</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
