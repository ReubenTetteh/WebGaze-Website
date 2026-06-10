import type { Metadata } from "next";
import Link from "next/link";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";
import ProcessScroller from "@/components/services/ProcessScroller";

export const metadata: Metadata = {
  title: "Website Maintenance Sydney | Care Plans & Security | WebGaze",
  description: "Website maintenance for Sydney businesses: security monitoring, updates, daily backups, and performance optimisation that keep your site fast and secure.",
  keywords: ["website maintenance Sydney", "website care plan Sydney", "WordPress maintenance Sydney", "website security monitoring", "website support Sydney"],
  alternates: { canonical: "https://webgaze.com.au/services/maintenance" },
  openGraph: {
    title: "Website Maintenance Sydney | Care Plans & Security | WebGaze",
    description: "Professional website maintenance for Sydney businesses. Security monitoring, updates, daily backups, and performance optimisation — so your site stays fast, secure, and always on.",
    url: "https://webgaze.com.au/services/maintenance",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "Website Maintenance Sydney | Care Plans & Security | WebGaze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Maintenance Sydney | Care Plans & Security | WebGaze",
    description: "Professional website maintenance for Sydney businesses. Security monitoring, updates, daily backups, and performance optimisation — so your site stays fast, secure, and always on.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://webgaze.com.au/services/maintenance",
  "name": "Website Maintenance Sydney",
  "description": "Security monitoring, updates, backups, and performance optimisation for Sydney business websites.",
  "url": "https://webgaze.com.au/services/maintenance",
  "provider": {
    "@type": "Organization",
    "@id": "https://webgaze.com.au/#organization",
    "name": "WebGaze"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "serviceType": "Website Maintenance"
};

const features = [
  { title: "Software & Plugin Updates", desc: "Regular updates to keep your site secure and compatible with the latest standards." },
  { title: "Security Monitoring", desc: "Continuous scanning and patching to protect against vulnerabilities and attacks." },
  { title: "Daily & Weekly Backups", desc: "Automated backups so you can always recover from anything, quickly." },
  { title: "Uptime Monitoring", desc: "24/7 alerts so we know the moment something goes down — before you do." },
  { title: "Performance Optimisation", desc: "Regular checks to keep load times fast and your Core Web Vitals healthy." },
  { title: "Monthly Reports", desc: "Clear summaries of what was done, what was found, and what&apos;s next." },
];

const tags = ["Security", "Updates", "Backups", "Monitoring", "WordPress", "Performance"];

const processSteps = [
  {
    label: "01",
    title: "Onboarding & Audit",
    desc: "We start with a thorough review of your site — its current security posture, performance baseline, and update status — so we know exactly what we're working with from day one.",
  },
  {
    label: "02",
    title: "Ongoing Care",
    desc: "We run scheduled updates, security scans, and performance checks. Any issues found are addressed promptly, and you're kept informed with clear monthly reports.",
  },
  {
    label: "03",
    title: "Priority Support",
    desc: "If something goes wrong, we're on it fast. From emergency fixes to content updates, you have a reliable partner you can count on whenever you need it.",
  },
];

export default function MaintenancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServicePageHeader title="Website Maintenance" />

      {/* Breadcrumb */}
      <section className="bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-light-muted dark:text-dark-muted">
            <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-red-brand transition-colors">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Website Maintenance</span>
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
                Secure. Fast.<br />Always On.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <p className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                Every website needs ongoing maintenance to stay secure, fast, and up to date. Without it, small issues compound into costly problems — slow load times, security vulnerabilities, and unexpected downtime.
              </p>
              <p className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                We keep your site secure, updated, backed up, and running smoothly — so you can focus on your business without worrying about what&apos;s happening under the hood.
              </p>
              <Link href="/request-a-quote" className="btn-primary mt-8 inline-flex">
                Get a Maintenance Plan
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
              Everything covered, every month.
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
        eyebrow="How It Works"
        heading="Proactive care, not reactive fixes."
        intro="Our maintenance service is built around prevention. We stay ahead of issues so your site keeps performing — and you never have to think about it."
        stages={processSteps}
        bg="#0d0d0d"
      />

      <CTA lead="Keep it fast, secure," accent="and always online" />
    </>
  );
}
