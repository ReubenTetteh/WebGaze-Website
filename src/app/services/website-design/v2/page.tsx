"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTA from "@/components/sections/CTA";

/* ─── Design tokens ──────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Data ───────────────────────────────────────────────────── */
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
const tagsDuplicated = [...tags, ...tags, ...tags];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    body: "We start with a deep-dive into your business, your goals, and your audience. Competitor research, content mapping, and information architecture come out of this phase.",
  },
  {
    num: "02",
    title: "Design",
    body: "Style guides, wireframes, and high-fidelity mockups built on your brand identity. You review before a single line of code is written.",
  },
  {
    num: "03",
    title: "Build",
    body: "Full front and back-end development on the right platform for your needs, built with performance, accessibility, and SEO foundations in from day one.",
  },
  {
    num: "04",
    title: "Launch",
    body: "Thorough cross-browser testing, Core Web Vitals optimisation, final client review, domain migration, and post-launch monitoring.",
  },
];

/* ─── Scroll-reveal helper ───────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated vertical timeline with scroll-driven rail ─────── */
function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative mt-12">
      {/* Red rail */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10 md:left-[23px]">
        <motion.div
          className="absolute inset-0 origin-top bg-red-brand"
          style={{ scaleY: railScaleY }}
        />
      </div>

      <div className="space-y-0">
        {processSteps.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.07}>
            <div className="relative flex gap-8 pb-12 last:pb-0">
              {/* Dot */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dark-border bg-[#0d0d0d]">
                <span className="font-display text-[10px] font-bold tracking-[0.15em] text-red-brand">
                  {step.num}
                </span>
              </div>

              {/* Content */}
              <div className="min-w-0 pt-1.5 pb-2">
                <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] text-white md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[52ch] font-body text-sm leading-relaxed text-dark-muted">
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature card with hover lift ──────────────────────────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: { title: string; desc: string };
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <motion.div
        className="border-t border-light-border pt-5 dark:border-dark-border"
        whileHover={{ y: -4, transition: { duration: 0.22, ease: EASE } }}
      >
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-red-brand">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em]">
          {feature.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted">
          {feature.desc}
        </p>
      </motion.div>
    </Reveal>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function WebsiteDesignV2Page() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
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
          {/* Back arrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-5"
          >
            <Link
              href="/services"
              aria-label="Back to services"
              className="group inline-flex items-center gap-2 font-display text-sm font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
            >
              <span className="text-base leading-none transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            {/* Left */}
            <div className="max-w-[760px]">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                className="mb-4 inline-flex items-center rounded-full border border-red-brand/30 bg-red-brand/[0.08] px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-red-brand"
              >
                Website Design &amp; Development
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                className="max-w-[18ch] font-display text-[clamp(1.9rem,3.4vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white"
              >
                Custom websites built to win you the work.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18, ease: EASE }}
                className="mt-4 max-w-[52ch] font-body text-base leading-relaxed text-white/55"
              >
                For Australian businesses that need a site that loads fast, looks
                credible, and turns visitors into enquiries. No templates, no
                shortcuts.
              </motion.p>
            </div>

            {/* Right: CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
              className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ────────────────────────────────────────── */}
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

      {/* ── Intro / salesperson pull-quote — LIGHT ───────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">Why it matters</span>
          </Reveal>

          <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
            <Reveal delay={0.06} className="lg:col-span-6">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Think of it as your hardest-working salesperson.
              </h2>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Tech tag marquee — DARK ───────────────────────────── */}
      <section
        className="overflow-hidden bg-[#0a0a0a] py-5 border-y border-white/8"
        aria-hidden="true"
      >
        <div
          className="flex w-max gap-10 motion-safe:animate-[marquee_22s_linear_infinite]"
          style={{
            /* Inline keyframe via a style tag below; we handle reduced-motion via @media */
          }}
        >
          {tagsDuplicated.map((tag, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-xs font-bold uppercase tracking-[0.22em] text-white/30"
            >
              {tag}
              <span className="mx-5 text-red-brand/50">·</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.333%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .motion-safe\\:animate-\\[marquee_22s_linear_infinite\\] {
              animation: none;
            }
          }
        `}</style>
      </section>

      {/* ── Stats — LIGHT ─────────────────────────────────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-20">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">By the numbers</span>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 border-t border-light-border dark:border-dark-border lg:grid-cols-4 lg:divide-x lg:divide-light-border dark:lg:divide-dark-border">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.07}
                className={`pt-6 md:pt-7 lg:px-8 ${
                  i % 2 === 0 ? "pr-4" : "border-l border-light-border pl-4 dark:border-dark-border lg:border-l-0 lg:pl-8"
                } ${i < 2 ? "border-b border-light-border pb-6 dark:border-dark-border lg:border-b-0 lg:pb-0" : ""}`}
              >
                <p className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-[-0.04em]">
                  {stat.num}
                </p>
                <p className="mt-2 font-body text-xs leading-relaxed text-light-muted dark:text-dark-muted md:text-sm">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features — DARK ───────────────────────────────────── */}
      <section className="bg-[#0d0d0d] py-16 md:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">What&apos;s included</span>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              Everything you need, nothing you don&apos;t.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <motion.div
                  className="border-t border-dark-border pt-5"
                  whileHover={{ y: -4, transition: { duration: 0.22, ease: EASE } }}
                >
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-red-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em] text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-dark-muted">
                    {f.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process timeline — LIGHT ──────────────────────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Sticky label column */}
            <div className="lg:col-span-4">
              <Reveal>
                <span className="label-tag">Our process</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                  From brief to browser.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-[38ch] font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                  A transparent, four-phase approach so you always know where things
                  stand and what comes next.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <Link
                  href="/request-a-quote"
                  className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-red-brand transition-colors hover:text-red-dark"
                >
                  Start your project
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>

            {/* Timeline column */}
            <div className="lg:col-span-7 lg:col-start-6">
              <ProcessTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* ── "Why now" conviction strip — DARK ────────────────── */}
      <section className="bg-[#0a0a0a] py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7" delay={0}>
              <blockquote className="font-display text-[clamp(1.3rem,2.8vw,2.2rem)] font-bold leading-[1.2] tracking-[-0.025em] text-white">
                &ldquo;Your website is the only salesperson that works 24 hours a
                day, 7 days a week. Make sure it&apos;s doing its job.&rdquo;
              </blockquote>
              <p className="mt-4 font-body text-sm text-dark-muted">
                WebGaze, Sydney
              </p>
            </Reveal>

            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <div className="flex flex-col gap-3">
                <Link href="/request-a-quote" className="btn-primary justify-center">
                  Request a Proposal
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/book-a-discovery-session"
                  className="btn-outline justify-center border-white/30 text-white hover:border-red-brand"
                >
                  Book a Discovery Call
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
