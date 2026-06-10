import type { Metadata } from "next";

export const metadata: Metadata = {
  // absolute: the string is already the final title — stops the root
  // layout's "%s | WebGaze" template doubling the brand suffix.
  title: { absolute: "Web Design & Digital Services Sydney | WebGaze" },
  description: "Custom websites, brand identity, SEO, maintenance, and digital consulting — WebGaze offers full-service digital solutions for Sydney businesses ready to grow online.",
  keywords: ["web design services Sydney", "digital agency services Sydney", "website development services", "branding and SEO Sydney"],
  alternates: { canonical: "https://webgaze.com.au/services" },
  openGraph: {
    title: "Web Design & Digital Services Sydney | WebGaze",
    description: "Custom websites, brand identity, SEO, maintenance, and digital consulting — WebGaze offers full-service digital solutions for Sydney businesses ready to grow online.",
    url: "https://webgaze.com.au/services",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Web Design & Digital Services Sydney | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Digital Services Sydney | WebGaze",
    description: "Custom websites, brand identity, SEO, maintenance, and digital consulting — WebGaze offers full-service digital solutions for Sydney businesses ready to grow online.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://webgaze.com.au/services",
  "name": "Web Design & Digital Services",
  "description": "Full-service digital agency offering web design, branding, SEO, maintenance, and consulting in Sydney.",
  "provider": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "url": "https://webgaze.com.au/services"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
