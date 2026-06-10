import type { Metadata } from "next";

export const metadata: Metadata = {
  // absolute: the string is already the final title — stops the root
  // layout's "%s | WebGaze" template doubling the brand suffix.
  title: { absolute: "About WebGaze | Sydney Web Design, Branding & SEO Studio" },
  description: "Meet WebGaze, a Sydney web design studio creating custom websites, brand identities, SEO foundations, and ongoing digital care for Australian businesses.",
  keywords: ["about WebGaze", "Sydney web design studio", "Sydney branding studio", "Australian digital agency", "SEO web design Sydney", "website design team Sydney"],
  alternates: { canonical: "https://webgaze.com.au/about" },
  openGraph: {
    title: "About WebGaze | Sydney Web Design, Branding & SEO Studio",
    description: "Meet WebGaze, a Sydney web design studio creating custom websites, brand identities, SEO foundations, and ongoing digital care for Australian businesses.",
    url: "https://webgaze.com.au/about",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "About WebGaze | Sydney Web Design, Branding & SEO Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WebGaze | Sydney Web Design, Branding & SEO Studio",
    description: "Meet WebGaze, a Sydney web design studio creating custom websites, brand identities, SEO foundations, and ongoing digital care for Australian businesses.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://webgaze.com.au/about",
  "name": "About WebGaze",
  "description": "WebGaze is a Sydney web design, branding, SEO, and digital care studio for Australian businesses.",
  "url": "https://webgaze.com.au/about",
  "publisher": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze",
    "url": "https://webgaze.com.au",
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
