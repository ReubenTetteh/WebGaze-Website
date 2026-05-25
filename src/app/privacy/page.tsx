import ServicePageHeader from "@/components/sections/ServicePageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | WebGaze",
  description: "WebGaze's privacy and cookie policy — how we collect, use, and protect your information.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://webgaze.com.au/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <ServicePageHeader title="Privacy & Cookie Policy" subtitle="How we collect, use, and protect your information." backHref="/" />

      <section className="bg-light-bg dark:bg-dark-bg section-pad">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none
                          [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3
                          [&_p]:text-light-muted [&_p]:dark:text-dark-muted [&_p]:leading-relaxed [&_p]:mb-4
                          [&_ul]:text-light-muted [&_ul]:dark:text-dark-muted [&_ul]:leading-relaxed [&_ul]:space-y-1.5 [&_ul]:mb-4">

            <p className="text-base text-[#555] dark:text-[#999] mb-8">
              Last updated: May 2026 &nbsp;·&nbsp; WebGaze PTY LTD (ABN 53 694 048 158)
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              When you use our website or submit an enquiry, we may collect personal information including your name, email address,
              phone number, and details about your project. We only collect what is necessary to respond to your enquiry or
              fulfil a service.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to enquiries and provide our services</li>
              <li>Send project updates and relevant communications</li>
              <li>Improve our website and service offerings</li>
              <li>Meet legal and regulatory obligations</li>
            </ul>
            <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>

            <h2>3. Cookies</h2>
            <p>
              Our website uses cookies to understand how visitors interact with our site (e.g. pages visited, time on site).
              These are analytics-only cookies and do not track you across other websites. You can disable cookies in your
              browser settings at any time without affecting your ability to use the site.
            </p>

            <h2>4. Data Storage & Security</h2>
            <p>
              Your data is stored securely and only accessible to authorised WebGaze team members. We take reasonable
              precautions to protect your information from unauthorised access, disclosure, or loss.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Under the Australian Privacy Act 1988, you have the right to access the personal information we hold about you
              and request corrections if necessary. To make a request, contact us at{" "}
              <a href="mailto:hello@webgaze.com.au" className="text-red-brand hover:underline">hello@webgaze.com.au</a>.
            </p>

            <h2>6. Contact</h2>
            <p>
              If you have any questions about this policy, please reach out to us at{" "}
              <a href="mailto:hello@webgaze.com.au" className="text-red-brand hover:underline">hello@webgaze.com.au</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
