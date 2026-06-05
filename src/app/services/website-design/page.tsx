import Link from "next/link";
import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";
import ProcessScroller from "@/components/services/ProcessScroller";
import { webDesignPhases } from "@/components/services/webDesignPhases";

const features = [
  { title: "Custom design", desc: "Tailored to your brand. No templates, no shortcuts." },
  { title: "Mobile-first", desc: "Fully responsive across every screen size, from phone to desktop." },
  { title: "SEO-ready", desc: "Structured and optimised from day one so you get found faster." },
  { title: "Easy to manage", desc: "A clean CMS so you can update your site without a developer." },
  { title: "Performance optimised", desc: "Fast load times that keep visitors engaged and reduce bounce." },
  { title: "Accessibility considered", desc: "Built to work for all users, meeting modern accessibility standards." },
];

const stats = [
  { num: "3+", label: "Designers & developers" },
  { num: "4+", label: "Awards for digital innovation" },
  { num: "50+", label: "Projects delivered" },
  { num: "100%", label: "Client satisfaction" },
];

const tags = ["React.js", "Next.js", "WordPress", "E-Commerce", "Figma", "UI/UX"];

export default function WebsiteDesignPage() {
  return (
    <>
      {/* ───────────────────────── Hero (left-aligned, matches /about) ───────────────────────── */}
      <section className="relative flex min-h-[40vh] flex-col justify-end overflow-hidden bg-[#0a0a0a] pb-10 pt-24 md:pb-12">
        <Image
          src="/service-header-bg.jpg"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

        <div className="container-wide relative z-10 w-full">
          <div className="mb-5">
            <Link
              href="/services"
              aria-label="Back to services"
              className="group inline-flex items-center gap-2 font-display text-sm font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
            >
              <span className="text-base leading-none transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-[760px]">
              <span className="mb-4 inline-flex items-center rounded-full border border-red-brand/30 bg-red-brand/[0.08] px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-red-brand">
                Website Design & Development
              </span>
              <h1 className="max-w-[18ch] font-display font-bold text-white text-[clamp(2.55rem,10.5vw,3.7rem)] leading-[1.02] tracking-[-0.035em] lg:text-[clamp(1.9rem,3.4vw,3.2rem)] lg:leading-[1.05] lg:tracking-[-0.02em]">
                Custom websites built to win you the work.
              </h1>
              <p className="mt-4 max-w-[52ch] font-body text-base leading-relaxed text-white/55">
                For Australian businesses that need a site that loads fast, looks
                credible, and turns visitors into enquiries. No templates, no
                shortcuts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link href="/request-a-quote" className="btn-primary justify-center">
                Request a Proposal
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/projects"
                className="btn-outline justify-center border-white/30 text-white hover:border-red-brand"
              >
                View Projects
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="border-b border-light-border bg-light-bg dark:border-dark-border dark:bg-dark-bg">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 font-body text-xs text-light-muted dark:text-dark-muted">
            <Link href="/" className="transition-colors hover:text-red-brand">Home</Link>
            <span>›</span>
            <Link href="/services" className="transition-colors hover:text-red-brand">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Website Design</span>
          </nav>
        </div>
      </section>

      {/* ───────────────────────── Intro — LIGHT ───────────────────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <AnimateIn>
            <span className="label-tag">Why it matters</span>
          </AnimateIn>
          <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
            <AnimateIn delay={0.06} className="lg:col-span-6">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Think of it as your hardest-working salesperson.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.12} className="lg:col-span-5 lg:col-start-8">
              <p className="font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                Your website is the only salesperson that works 24 hours a day, 7 days
                a week. Your job is to make sure it looks professional and has
                everything it needs to lock in more customers and sales.
              </p>
              <Link
                href="/request-a-quote"
                className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-red-brand transition-colors hover:text-red-dark"
              >
                Let&apos;s discuss your project
                <span aria-hidden="true">→</span>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Stats — DARK ───────────────────────── */}
      <section className="bg-[#0a0a0a] py-16 text-white md:py-20">
        <div className="container-wide">
          <AnimateIn>
            <span className="label-tag">By the numbers</span>
          </AnimateIn>
          <div className="mt-8 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
            {stats.map((stat, i) => (
              <AnimateIn
                key={stat.label}
                delay={i * 0.06}
                className={`pt-6 md:pt-7 lg:px-8 ${
                  i % 2 === 0 ? "pr-4" : "border-l border-white/10 pl-4 lg:border-l-0 lg:pl-8"
                } ${i < 2 ? "border-b border-white/10 pb-6 lg:border-b-0 lg:pb-0" : ""}`}
              >
                <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-none tracking-[-0.04em]">
                  {stat.num}
                </p>
                <p className="mt-3 font-body text-xs leading-relaxed text-white/55 md:text-sm">
                  {stat.label}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Features — LIGHT ───────────────────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <AnimateIn>
            <span className="label-tag">What&apos;s included</span>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Everything you need, nothing you don&apos;t.
            </h2>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <AnimateIn key={f.title} delay={i * 0.05}>
                <div className="border-t border-light-border pt-5 dark:border-dark-border">
                  <span className="font-display text-sm font-semibold text-red-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em]">
                    {f.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                    {f.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-light-border px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-light-muted dark:border-dark-border dark:text-dark-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Process — DARK (sticky-scroll) ───────────────────────── */}
      <ProcessScroller
        eyebrow="Our process"
        heading="A closer look at our web design methodology."
        intro="Turning insights into digital experiences that work, from discovery to launch and beyond."
        stages={webDesignPhases}
        bg="#0d0d0d"
      />

      <CTA lead="Your website should be" accent="winning you work" />
    </>
  );
}
