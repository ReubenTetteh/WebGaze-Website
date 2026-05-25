import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Systems & Automation Sydney | AI Business Solutions | WebGaze",
  description: "WebGaze builds custom systems, internal tools, and AI-powered automations for Sydney businesses — taking repetitive, manual work off your team's plate. Book a free Discovery Session.",
  keywords: ["business automation Sydney", "custom software Sydney", "AI automation Sydney", "workflow automation Sydney", "custom internal tools", "business systems Sydney"],
  alternates: { canonical: "https://webgaze.com.au/services/systems-automation" },
  openGraph: {
    title: "Custom Systems & Automation Sydney | AI Business Solutions | WebGaze",
    description: "WebGaze builds custom systems, internal tools, and AI-powered automations for Sydney businesses — taking repetitive, manual work off your team's plate. Book a free Discovery Session.",
    url: "https://webgaze.com.au/services/systems-automation",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Custom Systems & Automation Sydney | AI Business Solutions | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Systems & Automation Sydney | AI Business Solutions | WebGaze",
    description: "WebGaze builds custom systems, internal tools, and AI-powered automations for Sydney businesses — taking repetitive, manual work off your team's plate. Book a free Discovery Session.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/systems-automation",
  "name": "Custom Systems & Automation Sydney",
  "description": "Custom systems, internal tools, and AI-powered automation for Sydney businesses and organisations. We take repetitive, manual work off your team's plate.",
  "url": "https://webgaze.com.au/services/systems-automation",
  "provider": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "serviceType": "Custom Systems, Automation and AI Solutions",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AUD",
    "availability": "https://schema.org/InStock"
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
