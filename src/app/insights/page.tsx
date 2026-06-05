import type { Metadata } from "next";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Design & Digital Marketing Insights | WebGaze",
  description: "Practical thinking on web design, branding, SEO, and digital strategy for Australian businesses. No fluff — just useful insights from the WebGaze team.",
  keywords: ["web design insights Australia", "digital marketing tips", "branding tips Australia", "SEO insights", "web design blog"],
  alternates: { canonical: "https://webgaze.com.au/insights" },
  openGraph: {
    title: "Web Design & Digital Marketing Insights | WebGaze",
    description: "Practical thinking on web design, branding, SEO, and digital strategy for Australian businesses.",
    url: "https://webgaze.com.au/insights",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "WebGaze Insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Digital Marketing Insights | WebGaze",
    description: "Practical thinking on web design, branding, SEO, and digital strategy for Australian businesses.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://webgaze.com.au/insights",
  "name": "WebGaze Insights",
  "description": "Practical thinking on web design, branding, SEO, and digital strategy for Australian businesses.",
  "url": "https://webgaze.com.au/insights",
  "publisher": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "inLanguage": "en-AU"
};

const posts = [
  {
    index: "01",
    category: "Web Design",
    title: "Why Your Website Is Losing You Clients (And How to Fix It)",
    excerpt: "Most business websites fail silently. No error messages, no crashes — just visitors who leave before they convert. Here's what's actually going wrong.",
    date: "Apr 2025",
    readTime: "6 min read",
    href: "/insights/website-losing-clients",
  },
  {
    index: "02",
    category: "Branding",
    title: "The Brand Mistake That's Costing Australian Businesses Trust",
    excerpt: "Inconsistent branding costs more than you think. We break down the single most common visual identity mistake — and the fast fix.",
    date: "Mar 2025",
    readTime: "4 min read",
    href: "/insights/brand-consistency",
  },
  {
    index: "03",
    category: "SEO",
    title: "Local SEO in 2025: What Actually Moves the Needle",
    excerpt: "Google's algorithm has shifted again. Here's what's working right now for Australian businesses trying to rank in their local market.",
    date: "Feb 2025",
    readTime: "8 min read",
    href: "/insights/local-seo-2025",
  },
  {
    index: "04",
    category: "Strategy",
    title: "When to Redesign vs. Refresh: A Framework for Business Owners",
    excerpt: "A full redesign is expensive. A surface refresh often misses the point. This decision framework helps you pick the right path.",
    date: "Jan 2025",
    readTime: "5 min read",
    href: "/insights/redesign-vs-refresh",
  },
];

export default function InsightsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
      <ServicePageHeader title="Insights" backHref="/" />

      {/* Posts list */}
      <div className="container-wide pb-32">
        <div className="divide-y divide-light-border dark:divide-[#1a1a1a]">
          {posts.map((post) => (
            <Link
              key={post.index}
              href={post.href}
              className="group grid grid-cols-1 md:grid-cols-[72px_1fr_auto] gap-4 md:gap-10 items-start py-12 hover:bg-light-surface dark:hover:bg-white/[0.015] -mx-4 px-4 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16 transition-colors duration-300"
            >
              {/* Index */}
              <span className="hidden md:block font-display font-black text-[2.5rem] leading-none text-[#0a0a0a]/10 dark:text-white/[0.06] mt-1 select-none">
                {post.index}
              </span>

              {/* Content */}
              <div>
                <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-red-brand mb-3 block">
                  {post.category}
                </span>
                <h2 className="font-display font-bold text-[1.35rem] md:text-2xl leading-snug tracking-[-0.025em] text-[#0a0a0a] dark:text-white group-hover:text-red-brand transition-colors duration-200 mb-4">
                  {post.title}
                </h2>
                <p className="font-body text-light-muted dark:text-[#888] leading-relaxed max-w-[60ch]">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-5 text-[11px] font-display text-[#777] dark:text-[#555]">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Arrow */}
              <span className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-light-border dark:border-[#2a2a2a] text-[#777] dark:text-[#555] group-hover:border-red-brand group-hover:text-red-brand transition-all duration-300 mt-1 flex-shrink-0">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
