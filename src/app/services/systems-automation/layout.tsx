import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software & Automation for Sydney Businesses | WebGaze",
  description: "WebGaze builds custom software, automation, and AI for Sydney businesses — tools shaped around your team instead of generic apps you have to bend your business around.",
  keywords: ["AI business solutions Sydney", "custom business systems Sydney", "custom software Sydney", "business automation Sydney", "workflow automation Sydney", "custom internal tools"],
  alternates: { canonical: "https://webgaze.com.au/services/systems-automation" },
  openGraph: {
    title: "Custom Software & Automation for Sydney Businesses | WebGaze",
    description: "WebGaze builds custom software, automation, and AI for Sydney businesses — tools shaped around your team instead of generic apps you have to bend your business around.",
    url: "https://webgaze.com.au/services/systems-automation",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Custom Software & Automation for Sydney Businesses | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software & Automation for Sydney Businesses | WebGaze",
    description: "WebGaze builds custom software, automation, and AI for Sydney businesses — tools shaped around your team instead of generic apps you have to bend your business around.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/systems-automation",
  "name": "Custom Software, Automation & AI — Sydney",
  "description": "Custom software, automation, and AI for Sydney businesses. We build tools shaped around how your team works, instead of forcing you into generic off-the-shelf apps.",
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
  "serviceType": "Custom Software, Automation and AI",
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
