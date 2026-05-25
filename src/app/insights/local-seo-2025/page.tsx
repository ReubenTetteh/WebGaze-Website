import type { Metadata } from "next";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import BlogArticleLayout from "@/components/sections/BlogArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local SEO in 2025: What Actually Moves the Needle in Australia",
  description: "Google's local algorithm has shifted. Here's what's working for Australian businesses trying to rank — from Google Business Profile to Core Web Vitals.",
  keywords: ["local SEO tips 2025", "Google Business Profile Australia", "local SEO Australia", "rank in Google local", "local SEO guide"],
  alternates: { canonical: "https://webgaze.com.au/insights/local-seo-2025" },
  openGraph: {
    title: "Local SEO in 2025: What Actually Moves the Needle in Australia",
    description: "Google's local algorithm has shifted. Here's what's working for Australian businesses trying to rank — from Google Business Profile to Core Web Vitals.",
    url: "https://webgaze.com.au/insights/local-seo-2025",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "article",
    publishedTime: "2025-02-01",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Local SEO in 2025: What Actually Moves the Needle in Australia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local SEO in 2025: What Actually Moves the Needle in Australia",
    description: "Google's local algorithm has shifted. Here's what's working for Australian businesses trying to rank — from Google Business Profile to Core Web Vitals.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://webgaze.com.au/insights/local-seo-2025",
  "headline": "Local SEO in 2025: What Actually Moves the Needle in Australia",
  "description": "Google's local algorithm has shifted. Here's what's working for Australian businesses trying to rank \u2014 from Google Business Profile to Core Web Vitals.",
  "url": "https://webgaze.com.au/insights/local-seo-2025",
  "datePublished": "2025-02-01",
  "dateModified": "2025-02-01",
  "author": {
    "@type": "Organization",
    "name": "WebGaze",
    "url": "https://webgaze.com.au"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze",
    "logo": {
      "@type": "ImageObject",
      "url": "https://webgaze.com.au/images/logo-white-cropped.png"
    }
  },
  "keywords": "local SEO tips 2025, Google Business Profile Australia, local SEO Australia, rank in Google local, local SEO guide",
  "inLanguage": "en-AU",
  "isPartOf": {
    "@type": "Blog",
    "@id": "https://webgaze.com.au/insights",
    "name": "WebGaze Insights"
  }
};

const toc = [
  { id: "google-business-profile", title: "Google Business Profile" },
  { id: "reviews",                 title: "Reviews & velocity" },
  { id: "local-content",          title: "Localised content" },
  { id: "core-web-vitals",        title: "Core Web Vitals" },
  { id: "local-links",            title: "Local backlinks" },
  { id: "bottom-line",            title: "The bottom line" },
];

const relatedPosts = [
  { title: "Why Your Website Is Losing You Clients",              href: "/insights/website-losing-clients", category: "Web Design", readTime: "6 min read" },
  { title: "The Brand Mistake Costing Australian Businesses Trust", href: "/insights/brand-consistency",    category: "Branding",   readTime: "4 min read" },
  { title: "When to Redesign vs. Refresh",                        href: "/insights/redesign-vs-refresh",   category: "Strategy",   readTime: "5 min read" },
];

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-light-bg dark:bg-[#080808]">
      <ServicePageHeader
        title="Local SEO in 2025"
        backHref="/insights"
        tag="SEO"
      />
      <BlogArticleLayout
        category="SEO"
        date="Feb 2025"
        readTime="8 min read"
        wordCount={780}
        title="Local SEO in 2025: What Actually Moves the Needle"
        lead="Google's algorithm has shifted again. Here's what's working right now for Australian businesses trying to rank in their local market."
        toc={toc}
        tags={["SEO", "Local SEO", "Google", "Australia", "Rankings", "GBP"]}
        relatedPosts={relatedPosts}
        ctaHref="/services/seo"
        ctaLabel="Explore SEO Services"
      >
        <p>
          Local SEO has always rewarded consistency and patience. But the tactics that worked in 2022 — mass directory submissions, keyword-stuffed service pages, buying reviews — don't just fail in 2025. They actively hurt you. Google's local ranking systems have become sophisticated enough to detect and penalise the shortcuts that used to work.
        </p>
        <p>Here's what's actually driving results for Australian local businesses this year.</p>

        <h2 id="google-business-profile">1. Google Business Profile is more important than ever — and most profiles are half-finished</h2>
        <p>
          Your Google Business Profile (GBP) is now the single most important asset for local visibility. For many searches, it matters more than your website. Yet most businesses treat it as a set-and-forget checkbox they completed years ago.
        </p>
        <p>
          In 2025, a high-performing GBP means: complete and accurate business information, at least 20 high-quality photos updated in the last 12 months, a minimum of 15–20 genuine reviews with responses to all of them, weekly Google Posts, and your products or services listed with detailed descriptions. If you haven't touched your profile in six months, start there.
        </p>

        <h2 id="reviews">2. Reviews have compounding returns — and velocity matters</h2>
        <p>
          Not just the number of reviews, but how recently they're being received. Google's algorithm interprets a steady stream of new reviews as a signal that the business is active and trusted. A business with 200 reviews from three years ago and nothing recent is outranked by a competitor with 40 reviews and a consistent monthly cadence.
        </p>
        <p>
          The most effective review strategy is the simplest one: ask every satisfied client, immediately after you deliver value, while the experience is fresh. A follow-up SMS with a direct link to your review page converts at 3–5× the rate of an email.
        </p>

        <h2 id="local-content">3. Localised content on your website still works — when done properly</h2>
        <p>
          Service-area pages remain effective, but only if they contain genuinely useful, location-specific content. A page that says "We provide plumbing services in Parramatta" and repeats slight variations of that sentence for 400 words is not going to rank. Google's Helpful Content system is specifically designed to demote exactly this kind of thin page.
        </p>
        <p>
          What works instead: specific mentions of local context (local landmarks, suburbs served, common issues in that area), testimonials from clients in that location, photos taken in that area, and genuinely useful information for someone searching in that suburb.
        </p>

        <h2 id="core-web-vitals">4. Core Web Vitals are a local ranking factor too</h2>
        <p>
          This surprises many business owners: page experience signals — particularly load speed and mobile responsiveness — now influence local pack rankings, not just organic search. A slow, difficult-to-use website drags down your local visibility even when the ranking is displayed in a map pack, not a traditional search result.
        </p>

        <h2 id="local-links">5. Links from local sources still carry outsized weight</h2>
        <p>
          A mention and link from the local Chamber of Commerce, a regional news outlet, an industry association, or a prominent local supplier still signals to Google that your business is genuinely embedded in the community. Even a handful of these links outweigh hundreds of generic directory citations.
        </p>
        <p>
          Identify three local organisations in your area that accept guest contributions, list members, or publish business news. Getting mentioned on two or three of these sites this year will move your rankings more than 50 directory submissions.
        </p>

        <h2 id="bottom-line">The bottom line</h2>
        <p>
          Local SEO in 2025 rewards businesses that are genuinely active, genuinely trusted, and genuinely useful online. The shortcut era is over. But for businesses willing to invest in the fundamentals — a complete GBP, a steady review cadence, quality local content, and fast pages — the opportunity is significant. Most competitors still aren't doing it properly.
        </p>
        <p>
          If you'd like us to audit your current local SEO standing and build a realistic action plan, <Link href="/services/seo">see our SEO services</Link> or <Link href="/contact">get in touch directly</Link>.
        </p>
      </BlogArticleLayout>
    </div>
    </>
  );
}
