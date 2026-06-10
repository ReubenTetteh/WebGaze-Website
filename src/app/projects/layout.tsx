import type { Metadata } from "next";

export const metadata: Metadata = {
  // absolute: the string is already the final title — stops the root
  // layout's "%s | WebGaze" template doubling the brand suffix.
  title: { absolute: "Web Design Portfolio Sydney | Our Work | WebGaze" },
  description: "Browse WebGaze's portfolio of web design, branding, and digital projects for Sydney businesses — real work, real results, built to perform.",
  keywords: ["web design portfolio Sydney", "digital agency portfolio", "WebGaze projects", "website design examples Sydney"],
  alternates: { canonical: "https://webgaze.com.au/projects" },
  openGraph: {
    title: "Web Design Portfolio Sydney | Our Work | WebGaze",
    description: "Browse WebGaze's portfolio of web design, branding, and digital projects for Sydney businesses — real work, real results, built to perform.",
    url: "https://webgaze.com.au/projects",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Web Design Portfolio Sydney | Our Work | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Portfolio Sydney | Our Work | WebGaze",
    description: "Browse WebGaze's portfolio of web design, branding, and digital projects for Sydney businesses — real work, real results, built to perform.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://webgaze.com.au/projects",
  "name": "WebGaze Portfolio",
  "description": "Portfolio of web design, branding, and digital projects by WebGaze Sydney.",
  "url": "https://webgaze.com.au/projects",
  "publisher": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
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
