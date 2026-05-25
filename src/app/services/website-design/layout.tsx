import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design Sydney | Custom Web Development | WebGaze",
  description: "Custom website design and development in Sydney. Fast, responsive, conversion-focused websites built on Next.js and WordPress — SEO-ready and easy to manage from day one.",
  keywords: ["website design Sydney", "custom web development Sydney", "web design agency Sydney", "Next.js website Sydney", "WordPress website design Sydney"],
  alternates: { canonical: "https://webgaze.com.au/services/website-design" },
  openGraph: {
    title: "Website Design Sydney | Custom Web Development | WebGaze",
    description: "Custom website design and development in Sydney. Fast, responsive, conversion-focused websites built on Next.js and WordPress — SEO-ready and easy to manage from day one.",
    url: "https://webgaze.com.au/services/website-design",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Website Design Sydney | Custom Web Development | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design Sydney | Custom Web Development | WebGaze",
    description: "Custom website design and development in Sydney. Fast, responsive, conversion-focused websites built on Next.js and WordPress — SEO-ready and easy to manage from day one.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/website-design",
  "name": "Website Design & Development Sydney",
  "description": "Custom website design and development for Sydney businesses. Fast, responsive, and conversion-focused.",
  "url": "https://webgaze.com.au/services/website-design",
  "provider": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "serviceType": "Website Design and Development",
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
