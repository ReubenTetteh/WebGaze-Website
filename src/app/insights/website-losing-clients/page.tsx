import type { Metadata } from "next";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import BlogArticleLayout from "@/components/sections/BlogArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Your Website Is Losing You Clients (And How to Fix It)",
  description: "Most business websites fail silently — no errors, just visitors who leave before they convert. Here are 6 common reasons and exactly how to fix each one.",
  keywords: ["why website not converting", "website losing clients", "website conversion tips", "improve website conversions", "website UX mistakes Australia"],
  alternates: { canonical: "https://webgaze.com.au/insights/website-losing-clients" },
  openGraph: {
    title: "Why Your Website Is Losing You Clients (And How to Fix It)",
    description: "Most business websites fail silently — no errors, just visitors who leave before they convert. Here are 6 common reasons and exactly how to fix each one.",
    url: "https://webgaze.com.au/insights/website-losing-clients",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "article",
    publishedTime: "2025-04-01",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Why Your Website Is Losing You Clients (And How to Fix It)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Your Website Is Losing You Clients (And How to Fix It)",
    description: "Most business websites fail silently — no errors, just visitors who leave before they convert. Here are 6 common reasons and exactly how to fix each one.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://webgaze.com.au/insights/website-losing-clients",
  "headline": "Why Your Website Is Losing You Clients (And How to Fix It)",
  "description": "Most business websites fail silently \u2014 no errors, just visitors who leave before they convert. Here are 6 common reasons and exactly how to fix each one.",
  "url": "https://webgaze.com.au/insights/website-losing-clients",
  "datePublished": "2025-04-01",
  "dateModified": "2025-04-01",
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
  "keywords": "why website not converting, website losing clients, website conversion tips, improve website conversions, website UX mistakes Australia",
  "inLanguage": "en-AU",
  "isPartOf": {
    "@type": "Blog",
    "@id": "https://webgaze.com.au/insights",
    "name": "WebGaze Insights"
  }
};

const toc = [
  { id: "value-proposition",  title: "Value proposition" },
  { id: "clear-next-step",    title: "Clear next step" },
  { id: "mobile-speed",       title: "Mobile load speed" },
  { id: "trust-signals",      title: "Trust signals" },
  { id: "design-signals",     title: "Design signals" },
  { id: "where-to-start",     title: "Where to start" },
];

const relatedPosts = [
  { title: "The Brand Mistake Costing Australian Businesses Trust", href: "/insights/brand-consistency",    category: "Branding",  readTime: "4 min read" },
  { title: "Local SEO in 2025: What Actually Moves the Needle",     href: "/insights/local-seo-2025",       category: "SEO",       readTime: "8 min read" },
  { title: "When to Redesign vs. Refresh",                          href: "/insights/redesign-vs-refresh",  category: "Strategy",  readTime: "5 min read" },
];

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-light-bg dark:bg-dark-bg">
      <ServicePageHeader
        title="Why Your Website Is Losing You Clients"
        backHref="/insights"
        tag="Web Design"
      />
      <BlogArticleLayout
        category="Web Design"
        date="Apr 2025"
        readTime="6 min read"
        wordCount={620}
        title="Why Your Website Is Losing You Clients (And How to Fix It)"
        lead="Most business websites fail silently. No error messages, no crashes — just visitors who leave before they convert. Here's what's actually going wrong."
        toc={toc}
        tags={["Web Design", "CRO", "UX", "Performance", "Australia"]}
        relatedPosts={relatedPosts}
        ctaHref="/contact"
        ctaLabel="Get a Website Audit"
      >
        <p>
          There's a particular kind of business pain that's hard to name: you know your product or service is good. You get referrals. Existing clients are happy. But your website? It just sits there, generating nothing. Potential clients land on it and disappear — no enquiry, no call, no conversion.
        </p>
        <p>
          We've audited hundreds of Australian business websites. The patterns are remarkably consistent, regardless of industry or budget. Here are the most common reasons your site is quietly costing you work.
        </p>

        <h2 id="value-proposition">1. Your value proposition takes too long to land</h2>
        <p>
          Within three seconds of arriving on your site, a visitor should know exactly what you do, who you do it for, and why they should care. Most websites bury this. The hero section is a beautiful image with a vague headline like "Elevating Your Business" — which tells a prospect nothing they need to act on.
        </p>
        <p>
          The fix is ruthless clarity. Replace abstract language with a specific, outcome-focused statement. Instead of "We provide innovative digital solutions," try "We build websites that turn visitors into enquiries — for Australian trade businesses." Concrete beats clever every time.
        </p>

        <h2 id="clear-next-step">2. There's no clear next step</h2>
        <p>
          Visitors don't want to hunt for what to do next. If your site doesn't have one dominant call to action per page — and if that action isn't immediately visible without scrolling — you're losing people at the moment of intent.
        </p>
        <p>
          Audit every page on your site right now. Ask: "What is the single most important action I want someone to take here?" If the answer isn't reflected in your layout, you have a conversion problem, not a traffic problem.
        </p>

        <h2 id="mobile-speed">3. Your site loads slowly on mobile</h2>
        <p>
          In Australia, more than 60% of web traffic is mobile. If your site takes more than three seconds to load on a phone, more than half your visitors will leave before they see a single word. Speed isn't a nice-to-have — it's the foundation everything else sits on.
        </p>
        <p>
          Check your Core Web Vitals in Google Search Console. Look at your largest contentful paint (LCP), cumulative layout shift (CLS), and interaction to next paint (INP). These three numbers tell you where your site is bleeding visitors.
        </p>

        <h2 id="trust-signals">4. You're missing trust signals</h2>
        <p>
          A visitor who doesn't know you needs a reason to trust you before they'll hand over their contact details or money. Testimonials, case studies, recognisable client logos, awards, and professional photography all serve this function. If your site has none of these — or features generic stock photos — you're asking prospects to take a leap of faith your competitors aren't requiring of them.
        </p>

        <h2 id="design-signals">5. The design signals the wrong things</h2>
        <p>
          Humans make subconscious quality judgements about a brand based on its visual presentation — in roughly 50 milliseconds. An outdated layout, mismatched fonts, inconsistent colours, or low-quality imagery all communicate "this business doesn't care about the details." If your service costs $5,000 or more, your website needs to look like it's worth at least that.
        </p>

        <h2 id="where-to-start">Where to start</h2>
        <p>
          You don't need to rebuild everything at once. Start with your homepage. Rewrite the hero section with a clear, specific value proposition. Add one strong testimonial above the fold. Make your primary CTA button impossible to miss. Measure enquiry rates for 30 days. You'll be surprised what clarity alone can do.
        </p>
        <p>
          If you want a second pair of eyes on your site, <Link href="/contact">get in touch</Link>. We offer frank, no-obligation website audits for Australian businesses.
        </p>
      </BlogArticleLayout>
    </div>
    </>
  );
}
