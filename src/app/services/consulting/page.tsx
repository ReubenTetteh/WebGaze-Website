import type { Metadata } from "next";
import Link from "next/link";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Website Audit & Digital Consulting Sydney | WebGaze",
  description: "Comprehensive website audits for Sydney businesses covering performance, SEO health, security, UX, and conversion opportunities — with a clear, prioritised action report.",
  keywords: ["website audit Sydney", "digital consulting Sydney", "UX audit service Sydney", "website review Sydney", "website performance audit"],
  alternates: { canonical: "https://webgaze.com.au/services/consulting" },
  openGraph: {
    title: "Website Audit & Digital Consulting Sydney | WebGaze",
    description: "Comprehensive website audits for Sydney businesses covering performance, SEO health, security, UX, and conversion opportunities — with a clear, prioritised action report.",
    url: "https://webgaze.com.au/services/consulting",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Website Audit & Digital Consulting Sydney | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Audit & Digital Consulting Sydney | WebGaze",
    description: "Comprehensive website audits for Sydney businesses covering performance, SEO health, security, UX, and conversion opportunities — with a clear, prioritised action report.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/consulting",
  "name": "Website Audit & Digital Consulting Sydney",
  "description": "Comprehensive website audits covering performance, SEO, security, UX for Sydney businesses.",
  "url": "https://webgaze.com.au/services/consulting",
  "provider": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "serviceType": "Website Audit and Digital Consulting"
};

const features = [
  { title: "Full Performance Review", desc: "Load speed, Core Web Vitals, and server performance — benchmarked and assessed." },
  { title: "SEO Health Check", desc: "On-page, technical, and structural SEO reviewed against current best practice." },
  { title: "Security Vulnerability Scan", desc: "Identifying exposed risks before they become real problems." },
  { title: "UI/UX Usability Assessment", desc: "Reviewing how users experience your site and where you&apos;re losing them." },
  { title: "Conversion Opportunity Analysis", desc: "Pinpointing gaps between current performance and what&apos;s possible." },
  { title: "Prioritised Action Report", desc: "A clear, ranked list of improvements with practical next steps." },
];

const tags = ["SEO Audit", "Security Audit", "UI/UX Review", "Performance", "Strategy", "Analytics"];

const processSteps = [
  {
    num: "01",
    title: "Briefing & Access",
    desc: "We start with a conversation to understand your goals and concerns, then gather access to the tools and data needed to conduct a thorough review.",
  },
  {
    num: "02",
    title: "Audit & Analysis",
    desc: "We systematically review every layer of your site — performance, SEO, security, UX, and conversion flow — building a clear picture of what&apos;s working and what isn&apos;t.",
  },
  {
    num: "03",
    title: "Report & Recommendations",
    desc: "You receive a clear, prioritised report with plain-English findings and practical recommendations — ranked by impact so you know exactly where to focus first.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServicePageHeader title="Consulting & Audit" />

      {/* Breadcrumb */}
      <section className="bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-light-muted dark:text-dark-muted">
            <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-red-brand transition-colors">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Consulting &amp; Audit</span>
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
                Know Exactly<br />Where You Stand.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <p className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                Our website consultation and audit services give you a clear, honest view of what&apos;s working, what&apos;s holding you back, and where your biggest opportunities lie.
              </p>
              <p className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                We review performance, security, design, user experience, and SEO — then deliver practical, prioritised recommendations you can act on straight away.
              </p>
              <Link href="/request-a-quote" className="btn-primary mt-8 inline-flex">
                Book a Website Audit
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
              A full picture, not just the surface.
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
            <span className="label-tag">Our Audit Process</span>
            <h2 className="mt-5 font-display font-bold text-display-md text-white max-w-xl leading-[1.1]">
              Clarity you can act on.
            </h2>
            <p className="mt-5 font-body text-base text-dark-muted max-w-2xl leading-relaxed">
              No jargon, no fluff. Just an honest assessment of your site and a clear path forward — ranked by what will make the biggest difference.
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
