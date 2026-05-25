import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Discovery Session | Systems & Automation | WebGaze",
  description: "Book a free, no-obligation Discovery Session with WebGaze. Tell us the manual work slowing your team down and we'll show you how a custom system or AI automation could take it off your plate.",
  keywords: ["free discovery session", "business automation consultation Sydney", "custom software consultation", "AI automation discovery call"],
  alternates: { canonical: "https://webgaze.com.au/book-a-discovery-session" },
  openGraph: {
    title: "Book a Free Discovery Session | Systems & Automation | WebGaze",
    description: "Book a free, no-obligation Discovery Session with WebGaze. Tell us the manual work slowing your team down and we'll show you how a custom system could take it off your plate.",
    url: "https://webgaze.com.au/book-a-discovery-session",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Book a Free Discovery Session | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Discovery Session | Systems & Automation | WebGaze",
    description: "Book a free, no-obligation Discovery Session with WebGaze. Tell us the manual work slowing your team down and we'll show you how a custom system could take it off your plate.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://webgaze.com.au/book-a-discovery-session",
  "name": "Book a Free Discovery Session — WebGaze",
  "description": "Book a free, no-obligation Discovery Session to scope a custom system or automation for your business.",
  "url": "https://webgaze.com.au/book-a-discovery-session"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
