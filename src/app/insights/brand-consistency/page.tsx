import type { Metadata } from "next";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import BlogArticleLayout from "@/components/sections/BlogArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Brand Mistake That's Costing Australian Businesses Trust",
  description: "Inconsistent branding silently erodes trust. We break down the most common visual identity mistake Australian businesses make — and the fast fix.",
  keywords: ["brand consistency mistake", "visual branding mistakes Australia", "brand identity tips", "inconsistent branding", "brand trust Australia"],
  alternates: { canonical: "https://webgaze.com.au/insights/brand-consistency" },
  openGraph: {
    title: "The Brand Mistake That's Costing Australian Businesses Trust",
    description: "Inconsistent branding silently erodes trust. We break down the most common visual identity mistake Australian businesses make — and the fast fix.",
    url: "https://webgaze.com.au/insights/brand-consistency",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "article",
    publishedTime: "2025-03-01",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "The Brand Mistake That's Costing Australian Businesses Trust" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Brand Mistake That's Costing Australian Businesses Trust",
    description: "Inconsistent branding silently erodes trust. We break down the most common visual identity mistake Australian businesses make — and the fast fix.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://webgaze.com.au/insights/brand-consistency",
  "headline": "The Brand Mistake That's Costing Australian Businesses Trust",
  "description": "Inconsistent branding silently erodes trust. We break down the most common visual identity mistake Australian businesses make \u2014 and the fast fix.",
  "url": "https://webgaze.com.au/insights/brand-consistency",
  "datePublished": "2025-03-01",
  "dateModified": "2025-03-01",
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
  "keywords": "brand consistency mistake, visual branding mistakes Australia, brand identity tips, inconsistent branding, brand trust Australia",
  "inLanguage": "en-AU",
  "isPartOf": {
    "@type": "Blog",
    "@id": "https://webgaze.com.au/insights",
    "name": "WebGaze Insights"
  }
};

const toc = [
  { id: "why-consistency",        title: "Why consistency matters" },
  { id: "common-inconsistency",   title: "The most common mistake" },
  { id: "fast-fix",               title: "The fast fix" },
];

const relatedPosts = [
  { title: "Why Your Website Is Losing You Clients",       href: "/insights/website-losing-clients", category: "Web Design", readTime: "6 min read" },
  { title: "Local SEO in 2025: What Actually Moves the Needle", href: "/insights/local-seo-2025",    category: "SEO",        readTime: "8 min read" },
  { title: "When to Redesign vs. Refresh",                 href: "/insights/redesign-vs-refresh",   category: "Strategy",   readTime: "5 min read" },
];

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-light-bg dark:bg-dark-bg">
      <ServicePageHeader
        title="The Brand Mistake Costing Businesses Trust"
        backHref="/insights"
        tag="Branding"
        titleAs="p"
      />
      <BlogArticleLayout
        category="Branding"
        date="Mar 2025"
        readTime="4 min read"
        wordCount={430}
        title="The Brand Mistake That's Costing Australian Businesses Trust"
        lead="Inconsistent branding costs more than you think. We break down the single most common visual identity mistake — and the fast fix."
        toc={toc}
        tags={["Branding", "Visual Identity", "Typography", "Style Guide", "Australia"]}
        relatedPosts={relatedPosts}
        ctaHref="/services/visual-branding"
        ctaLabel="Explore Branding Services"
      >
        <p>
          Ask any brand strategist what the most common mistake small-to-medium businesses make, and you'll get a near-unanimous answer: inconsistency. Not poor design. Not the wrong logo colour. Inconsistency — using your brand elements differently across different touchpoints until they no longer feel like a unified identity.
        </p>
        <p>
          It's a problem that sneaks up on businesses because each individual inconsistency seems minor. A slightly different shade of blue on the invoice. The logo with a white background on the website and a transparent one on Instagram. The heading font used correctly on the brochure but replaced by a default sans-serif in email templates. Together, they quietly erode trust.
        </p>

        <h2 id="why-consistency">Why consistency matters more than you think</h2>
        <p>
          Research consistently shows that brand recognition requires repeated, consistent exposure to the same visual cues. When those cues shift — even subtly — the subconscious signal a prospect receives is "this business is disorganised." That's not a conscious thought; it's a feeling. And feelings drive buying decisions far more than logic.
        </p>
        <p>
          For Australian service businesses especially — where trust is often the deciding factor between competitors — brand inconsistency can be directly correlated with lower conversion rates, shorter client relationships, and more price sensitivity. When you look unpolished, people assume you charge less. Or they go elsewhere.
        </p>

        <h2 id="common-inconsistency">The single most common inconsistency we see</h2>
        <p>
          It's not the logo. Most businesses get their logo right and use it correctly most of the time. The single most common inconsistency we see in audits is <strong>typography</strong> — specifically, the use of multiple, unrelated fonts across different materials.
        </p>
        <p>
          A business might have a beautiful website using a premium typeface, then send proposals in Times New Roman because that's what the Word template defaulted to ten years ago. Or they'll use one font family online and a completely different one in print, with no intentional relationship between them.
        </p>

        <h2 id="fast-fix">The fast fix: a brand style guide</h2>
        <p>
          A brand style guide doesn't need to be a 60-page PDF. For most small businesses, a one or two-page document is enough. It should specify your primary and secondary colours (with exact hex codes), your font choices and where each is used, your logo variations and minimum sizes, and any photography or illustration guidelines.
        </p>
        <p>
          Once that exists, share it with everyone who creates anything for your business — your VA, your social media manager, your accountant who edits invoices. Consistency at that level is achievable within a week, and the compounding effect on brand perception is significant.
        </p>
        <p>
          If you don't have a style guide yet, or your brand identity has drifted over time, <Link href="/services/visual-branding">we can help you build one</Link> — or rebuild the underlying identity if it needs more than a refresh.
        </p>
      </BlogArticleLayout>
    </div>
    </>
  );
}
