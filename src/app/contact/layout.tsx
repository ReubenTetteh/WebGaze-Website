import type { Metadata } from "next";

export const metadata: Metadata = {
  // absolute: the string is already the final title — stops the root
  // layout's "%s | WebGaze" template doubling the brand suffix.
  title: { absolute: "Contact Us | WebGaze Sydney" },
  description: "Get in touch with WebGaze. Tell us about your project and we'll respond within one business day with a plan tailored to your Sydney business.",
  keywords: ["contact WebGaze", "hire web designer Sydney", "web design enquiry Sydney"],
  alternates: { canonical: "https://webgaze.com.au/contact" },
  openGraph: {
    title: "Contact Us | WebGaze Sydney",
    description: "Get in touch with WebGaze. Tell us about your project and we'll respond within one business day with a plan tailored to your Sydney business.",
    url: "https://webgaze.com.au/contact",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Contact Us | WebGaze Sydney" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | WebGaze Sydney",
    description: "Get in touch with WebGaze. Tell us about your project and we'll respond within one business day with a plan tailored to your Sydney business.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://webgaze.com.au/contact",
  "name": "Contact WebGaze",
  "description": "Get in touch with WebGaze \u2014 Sydney's web design and digital agency.",
  "url": "https://webgaze.com.au/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "WebGaze",
    "telephone": "+61-422-169-233",
    "email": "hello@webgaze.com.au",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sydney",
      "addressRegion": "NSW",
      "addressCountry": "AU"
    }
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
