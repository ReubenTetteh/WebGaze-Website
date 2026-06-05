import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Custom Business Systems Sydney | WebGaze",
  description: "WebGaze builds custom apps, internal tools, and AI-assisted business systems for Sydney businesses — solving real operational problems without forcing you into generic software.",
  keywords: ["AI business solutions Sydney", "custom business systems Sydney", "custom software Sydney", "business automation Sydney", "workflow automation Sydney", "custom internal tools"],
  alternates: { canonical: "https://webgaze.com.au/services/systems-automation" },
  openGraph: {
    title: "AI & Custom Business Systems Sydney | WebGaze",
    description: "WebGaze builds custom apps, internal tools, and AI-assisted business systems for Sydney businesses — solving real operational problems without forcing you into generic software.",
    url: "https://webgaze.com.au/services/systems-automation",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "AI & Custom Business Systems Sydney | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Custom Business Systems Sydney | WebGaze",
    description: "WebGaze builds custom apps, internal tools, and AI-assisted business systems for Sydney businesses — solving real operational problems without forcing you into generic software.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/systems-automation",
  "name": "AI & Custom Business Systems Sydney",
  "description": "Custom apps, internal tools, and AI-assisted business systems for Sydney businesses and organisations. We solve real operational problems without forcing teams into generic software.",
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
  "serviceType": "AI and Custom Business Systems",
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
