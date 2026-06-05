import type { Metadata } from "next";
import Link from "next/link";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";
import ProcessScroller from "@/components/services/ProcessScroller";

export const metadata: Metadata = {
  title: "Brand Identity Design Sydney | Logo & Visual Branding | WebGaze",
  description: "Brand identity design for Sydney businesses. Logos, colour systems, and brand guidelines that make your business unmistakable — consistent across every touchpoint.",
  keywords: ["brand identity design Sydney", "logo design Sydney", "visual branding agency Sydney", "brand guidelines", "branding agency Sydney"],
  alternates: { canonical: "https://webgaze.com.au/services/visual-branding" },
  openGraph: {
    title: "Brand Identity Design Sydney | Logo & Visual Branding | WebGaze",
    description: "Brand identity design for Sydney businesses. Logos, colour systems, and brand guidelines that make your business unmistakable — consistent across every touchpoint.",
    url: "https://webgaze.com.au/services/visual-branding",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Brand Identity Design Sydney | Logo & Visual Branding | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Identity Design Sydney | Logo & Visual Branding | WebGaze",
    description: "Brand identity design for Sydney businesses. Logos, colour systems, and brand guidelines that make your business unmistakable — consistent across every touchpoint.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/visual-branding",
  "name": "Brand Identity Design Sydney",
  "description": "Logos, colour systems, and brand guidelines for Sydney businesses.",
  "url": "https://webgaze.com.au/services/visual-branding",
  "provider": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "serviceType": "Brand Identity Design"
};

const features = [
  { title: "Logo Design & Identity", desc: "A distinctive mark that represents your business across every touchpoint." },
  { title: "Colour Palette & Typography", desc: "A visual system that communicates your brand personality consistently." },
  { title: "Brand Guidelines", desc: "A clear document so your team and partners always stay on brand." },
  { title: "Visual Asset Creation", desc: "Icons, graphics, and supporting visuals ready to use anywhere." },
  { title: "Messaging & Tone of Voice", desc: "Words that sound like you — clear, consistent, and positioned correctly." },
  { title: "Brand Consistency Review", desc: "An audit of existing materials to ensure everything aligns." },
];

const tags = ["Logo Design", "Graphic Design", "Brand Guide", "Colour Systems", "Typography", "Figma"];

const processSteps = [
  {
    label: "01",
    title: "Brand Discovery",
    desc: "We start by understanding your business, your audience, and your competitors — giving us the insight to make design decisions that are strategic, not just aesthetic.",
  },
  {
    label: "02",
    title: "Concept & Design",
    desc: "We develop visual concepts — logo directions, colour palettes, and type pairings — and refine them with you through a structured feedback process until the identity is exactly right.",
  },
  {
    label: "03",
    title: "Guidelines & Handover",
    desc: "Once approved, everything is packaged into a brand guidelines document and delivered in all the formats you need — ready to use across digital and print.",
  },
];

export default function VisualBrandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServicePageHeader title="Visual Branding" />

      {/* Breadcrumb */}
      <section className="bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-light-muted dark:text-dark-muted">
            <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-red-brand transition-colors">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Visual Branding</span>
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
                Your Brand.<br />Unmistakable.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <p className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                Visual branding is how people recognise your business before they even read a word. We create cohesive brand visuals — from logos to colour systems — that help you stand out, stay consistent, and connect with the right audience.
              </p>
              <p className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                We refine your visual identity so your business looks credible, recognisable, and ready to scale — whether you&apos;re starting from scratch or evolving an existing brand.
              </p>
              <Link href="/request-a-quote" className="btn-primary mt-8 inline-flex">
                Start Your Brand Project
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
              A complete identity, built to last.
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

      {/* Process — DARK (sticky-scroll) */}
      <ProcessScroller
        eyebrow="Our Branding Process"
        heading="How we build a brand that sticks."
        intro="From research and strategy through to final assets — every step is deliberate, collaborative, and focused on creating something that genuinely represents your business."
        stages={processSteps}
        bg="#0d0d0d"
      />

      <CTA lead="Look like the business" accent="you're becoming" />
    </>
  );
}
