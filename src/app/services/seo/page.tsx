import type { Metadata } from "next";
import Link from "next/link";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "SEO Agency Sydney | Search Engine Optimisation | WebGaze",
  description: "Data-driven SEO services for Sydney businesses. Keyword research, on-page optimisation, technical SEO, and monthly reporting — built for long-term, sustainable rankings.",
  keywords: ["SEO agency Sydney", "search engine optimisation Sydney", "SEO services Sydney", "local SEO Sydney", "technical SEO Sydney"],
  alternates: { canonical: "https://webgaze.com.au/services/seo" },
  openGraph: {
    title: "SEO Agency Sydney | Search Engine Optimisation | WebGaze",
    description: "Data-driven SEO services for Sydney businesses. Keyword research, on-page optimisation, technical SEO, and monthly reporting — built for long-term, sustainable rankings.",
    url: "https://webgaze.com.au/services/seo",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "SEO Agency Sydney | Search Engine Optimisation | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Agency Sydney | Search Engine Optimisation | WebGaze",
    description: "Data-driven SEO services for Sydney businesses. Keyword research, on-page optimisation, technical SEO, and monthly reporting — built for long-term, sustainable rankings.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/seo",
  "name": "SEO Agency Sydney",
  "description": "Data-driven search engine optimisation for Sydney businesses.",
  "url": "https://webgaze.com.au/services/seo",
  "provider": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "serviceType": "Search Engine Optimisation"
};

const features = [
  { title: "Keyword Research & Strategy", desc: "Targeting the exact terms your ideal customers are searching for." },
  { title: "On-Page SEO", desc: "Optimised titles, meta descriptions, headings, and content structure." },
  { title: "Technical SEO Audit", desc: "Fixing crawlability, indexing issues, and Core Web Vitals that hold you back." },
  { title: "Content Optimisation", desc: "Refining existing pages to rank higher and convert better." },
  { title: "Performance Monitoring", desc: "Tracking rankings, traffic, and key metrics over time." },
  { title: "Monthly Reporting", desc: "Clear, plain-English reports that show exactly what&apos;s moving." },
];

const tags = ["On-Page SEO", "Technical SEO", "Keyword Research", "Analytics", "Content", "Core Web Vitals"];

const processSteps = [
  {
    num: "01",
    title: "Audit & Research",
    desc: "We begin with a thorough audit of your current site and a deep dive into keyword opportunities in your market — identifying where you stand, what&apos;s holding you back, and where the biggest wins are.",
  },
  {
    num: "02",
    title: "Strategy & Implementation",
    desc: "We build a clear, prioritised SEO strategy and start implementing — from on-page optimisations and technical fixes to content improvements aligned with what your audience is searching for.",
  },
  {
    num: "03",
    title: "Monitor & Refine",
    desc: "SEO is a long game. We track rankings, traffic, and performance month on month — adjusting the strategy as results come in and the landscape evolves.",
  },
];

export default function SEOPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServicePageHeader title="Search Engine Optimisation" />

      {/* Breadcrumb */}
      <section className="bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-light-muted dark:text-dark-muted">
            <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-red-brand transition-colors">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Search Engine Optimisation</span>
          </nav>
        </div>
      </section>

      {/* Intro — LIGHT */}
      <section className="section-pad bg-light-bg dark:bg-dark-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimateIn>
              <span className="label-tag">What We Do</span>
              <h2 className="mt-5 font-display font-bold text-display-md text-[#0a0a0a] dark:text-white leading-[1.1]">
                Get Found.<br />Stay Found.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <p className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                A strong SEO strategy helps your website get found by the right people. We optimise your site to improve visibility, attract relevant traffic, and support a smooth user experience.
              </p>
              <p className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                Every decision is grounded in data and aligned with long-term, sustainable growth — not quick fixes that fade or tactics that put your site at risk.
              </p>
              <Link href="/request-a-quote" className="btn-primary mt-8 inline-flex">
                Start Growing Organically
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Features — LIGHT SURFACE */}
      <section className="section-pad bg-light-surface dark:bg-dark-surface border-y border-light-border dark:border-dark-border">
        <div className="container-wide">
          <AnimateIn>
            <span className="label-tag">What&apos;s Included</span>
            <h2 className="mt-5 font-display font-bold text-display-md text-[#0a0a0a] dark:text-white max-w-lg leading-[1.1]">
              Strategy-led SEO, built to last.
            </h2>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-light-border dark:bg-dark-border rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <AnimateIn key={f.title} delay={i * 0.07}>
                <div className="bg-light-surface dark:bg-dark-surface p-8 h-full">
                  <span className="block w-8 h-px bg-red-brand mb-5" />
                  <h3 className="font-display font-bold text-sm text-[#0a0a0a] dark:text-white mb-2">{f.title}</h3>
                  <p className="font-body text-sm text-light-muted dark:text-dark-muted leading-relaxed">{f.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-display font-semibold tracking-widest uppercase px-3 py-1.5 border border-red-brand text-red-brand rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process — DARK */}
      <section className="section-pad bg-[#0d0d0d]">
        <div className="container-wide">
          <AnimateIn>
            <span className="label-tag">Our SEO Process</span>
            <h2 className="mt-5 font-display font-bold text-display-md text-white max-w-xl leading-[1.1]">
              Data in. Results out.
            </h2>
            <p className="mt-5 font-body text-base text-dark-muted max-w-2xl leading-relaxed">
              We don&apos;t guess. Every recommendation is backed by research, every result is tracked, and every strategy evolves with your business.
            </p>
          </AnimateIn>

          <div className="mt-16 divide-y divide-dark-border border-t border-dark-border">
            {processSteps.map((step, i) => (
              <AnimateIn key={step.num} delay={i * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-12 py-12 items-start">
                  <span className="font-display font-bold text-5xl text-red-brand/20 select-none leading-none">{step.num}</span>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">{step.title}</h3>
                    <p className="mt-3 font-body text-base text-dark-muted leading-relaxed max-w-2xl">{step.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
