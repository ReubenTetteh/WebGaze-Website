import type { Metadata } from "next";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import BlogArticleLayout from "@/components/sections/BlogArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Redesign vs Refresh: A Framework for Business Owners",
  description: "A full redesign is expensive. A surface refresh often misses the point. This framework helps you pick the right path before you spend a cent.",
  keywords: ["website redesign vs refresh", "when to redesign website", "website redesign Australia", "website refresh guide", "redesign decision framework"],
  alternates: { canonical: "https://webgaze.com.au/insights/redesign-vs-refresh" },
  openGraph: {
    title: "Website Redesign vs Refresh: A Framework for Business Owners",
    description: "A full redesign is expensive. A surface refresh often misses the point. This framework helps you pick the right path before you spend a cent.",
    url: "https://webgaze.com.au/insights/redesign-vs-refresh",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "article",
    publishedTime: "2025-01-01",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Website Redesign vs Refresh: A Framework for Business Owners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Redesign vs Refresh: A Framework for Business Owners",
    description: "A full redesign is expensive. A surface refresh often misses the point. This framework helps you pick the right path before you spend a cent.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://webgaze.com.au/insights/redesign-vs-refresh",
  "headline": "Website Redesign vs Refresh: A Framework for Business Owners",
  "description": "A full redesign is expensive. A surface refresh often misses the point. This framework helps you pick the right path before you spend a cent.",
  "url": "https://webgaze.com.au/insights/redesign-vs-refresh",
  "datePublished": "2025-01-01",
  "dateModified": "2025-01-01",
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
  "keywords": "website redesign vs refresh, when to redesign website, website redesign Australia, website refresh guide, redesign decision framework",
  "inLanguage": "en-AU",
  "isPartOf": {
    "@type": "Blog",
    "@id": "https://webgaze.com.au/insights",
    "name": "WebGaze Insights"
  }
};

const toc = [
  { id: "diagnose",           title: "Diagnose the problem" },
  { id: "case-refresh",       title: "The case for a refresh" },
  { id: "case-redesign",      title: "The case for a redesign" },
  { id: "decision-test",      title: "The decision test" },
  { id: "dont-block-progress", title: "Don't block progress" },
];

const relatedPosts = [
  { title: "Why Your Website Is Losing You Clients",              href: "/insights/website-losing-clients", category: "Web Design", readTime: "6 min read" },
  { title: "The Brand Mistake Costing Australian Businesses Trust", href: "/insights/brand-consistency",    category: "Branding",   readTime: "4 min read" },
  { title: "Local SEO in 2025: What Actually Moves the Needle",   href: "/insights/local-seo-2025",        category: "SEO",        readTime: "8 min read" },
];

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-light-bg dark:bg-dark-bg">
      <ServicePageHeader
        title="Redesign vs. Refresh"
        backHref="/insights"
        tag="Strategy"
      />
      <BlogArticleLayout
        category="Strategy"
        date="Jan 2025"
        readTime="5 min read"
        wordCount={550}
        title="When to Redesign vs. Refresh: A Framework for Business Owners"
        lead="A full redesign is expensive. A surface refresh often misses the point. This decision framework helps you pick the right path."
        toc={toc}
        tags={["Strategy", "Web Design", "Redesign", "UX", "Decision Framework"]}
        relatedPosts={relatedPosts}
        ctaHref="/contact"
        ctaLabel="Book a Strategy Call"
      >
        <p>
          At some point, every business owner looks at their website and thinks: "We need to do something about this." The next question — whether to do a full redesign or a targeted refresh — is where significant money gets spent wisely or wasted.
        </p>
        <p>We've guided dozens of Australian businesses through this decision. Here's the framework we use.</p>

        <h2 id="diagnose">First: diagnose the actual problem</h2>
        <p>
          Before discussing solutions, get clear on what's broken. Pull your analytics. Look at bounce rate, time on site, pages per session, and — most importantly — conversion rate. If traffic is healthy but conversions are low, the problem is likely messaging or UX. If traffic is low, the problem is likely SEO or discoverability. If the site loads slowly, it's a performance problem. Each of these has a different solution.
        </p>
        <p>
          The worst reason to trigger a redesign is aesthetic boredom. "It's looking a bit dated" is almost never worth $15,000–$40,000. Start with data.
        </p>

        <h2 id="case-refresh">The case for a refresh</h2>
        <p>A refresh is the right call when your underlying site structure is sound but specific elements have degraded. Signs you need a refresh rather than a rebuild:</p>
        <ul>
          {[
            "Your conversion rate was once good but has declined — the structure works, but the messaging is stale",
            "Your brand has evolved and the site no longer reflects it, but the information architecture is still logical",
            "The site is technically healthy (fast, mobile-friendly) but visually feels behind competitors",
            "You need new service pages or a content refresh, not a structural overhaul",
          ].map((item, i) => (
            <li key={i}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-brand flex-shrink-0 mt-[0.6em]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          A refresh might involve new copywriting, updated photography, revised colour application, and tweaks to key pages. Done well, it can be completed in 2–4 weeks and costs a fraction of a full rebuild.
        </p>

        <h2 id="case-redesign">The case for a full redesign</h2>
        <p>A redesign is justified when the problems are structural. Signs you genuinely need a rebuild:</p>
        <ul>
          {[
            "The site is built on an outdated platform that can't support modern performance standards",
            "The information architecture is confusing — users can't find what they're looking for",
            "Your business has pivoted significantly and the current site reflects who you used to be",
            "Core Web Vitals are poor and the underlying code or CMS can't be optimised without a rebuild",
            "You're scaling and need integrations the current platform can't support",
          ].map((item, i) => (
            <li key={i}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-brand flex-shrink-0 mt-[0.6em]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 id="decision-test">The decision test</h2>
        <p>When a client is on the fence, we ask them two questions:</p>
        <p>
          <strong>1. If you fixed only the visual layer — new photography, updated colours, refreshed copy — would the site still frustrate users?</strong> If yes, you need a redesign. The problem isn't cosmetic.
        </p>
        <p>
          <strong>2. If you kept the current visual design but fixed the speed, structure, and messaging — would you be embarrassed to send someone to it?</strong> If no, a refresh might be enough.
        </p>

        <h2 id="dont-block-progress">One more thing: don't let perfect block progress</h2>
        <p>
          We've seen businesses spend six months planning the perfect redesign while their current site costs them clients every week. If you're confident a refresh won't solve the core problem, start the redesign. But if you're uncertain, do the refresh first — it's faster, cheaper, and the data you get from an improved version of the current site often clarifies what the full rebuild should focus on.
        </p>
        <p>
          If you'd like to talk through your situation, <Link href="/contact">book a strategy call</Link>. We'll give you a straight answer on which path makes sense.
        </p>
      </BlogArticleLayout>
    </div>
    </>
  );
}
