import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Website Quote Sydney | WebGaze",
  description: "Request a free proposal from WebGaze — Sydney's web design and digital agency. Tell us what you need and we'll put together a tailored quote. No obligation.",
  keywords: ["web design quote Sydney", "free website proposal Sydney", "get website quote", "hire web agency Sydney"],
  alternates: { canonical: "https://webgaze.com.au/request-a-quote" },
  openGraph: {
    title: "Get a Free Website Quote Sydney | WebGaze",
    description: "Request a free proposal from WebGaze — Sydney's web design and digital agency. Tell us what you need and we'll put together a tailored quote. No obligation.",
    url: "https://webgaze.com.au/request-a-quote",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Get a Free Website Quote Sydney | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Free Website Quote Sydney | WebGaze",
    description: "Request a free proposal from WebGaze — Sydney's web design and digital agency. Tell us what you need and we'll put together a tailored quote. No obligation.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://webgaze.com.au/request-a-quote",
  "name": "Request a Quote \u2014 WebGaze",
  "description": "Get a free, tailored web design or digital services proposal from WebGaze Sydney.",
  "url": "https://webgaze.com.au/request-a-quote",
  "mainEntity": {
    "@type": "Organization",
    "name": "WebGaze",
    "telephone": "+61-411-078-843",
    "email": "hello@webgaze.com.au"
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
