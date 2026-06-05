"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import CTA from "@/components/sections/CTA";
import WebDesignProcess from "@/components/services/WebDesignProcess";

const EASE = [0.16, 1, 0.3, 1] as const;

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

const dossierMeta = [
  { label: "Discipline", value: "Web Design & Dev" },
  { label: "Stack", value: "Next.js, React, WordPress" },
  { label: "Timeline", value: "4–8 weeks" },
  { label: "Deliverables", value: "Design, build, launch" },
];

const sectionLabels = [
  { id: "brief", label: "Brief" },
  { id: "deliverables", label: "Deliverables" },
  { id: "stats", label: "By the numbers" },
  { id: "process", label: "Process" },
];

function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

function StickyRail({ activeSection }: { activeSection: string }) {
  return (
    <aside className="hidden lg:flex flex-col gap-1 sticky top-32 h-fit w-36 shrink-0">
      {sectionLabels.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`font-display text-[10px] font-bold uppercase tracking-[0.22em] py-1.5 transition-colors duration-200 ${
            activeSection === s.id
              ? "text-red-brand"
              : "text-light-muted/40 dark:text-dark-muted/40 hover:text-light-muted dark:hover:text-dark-muted"
          }`}
        >
          {s.label}
        </a>
      ))}
    </aside>
  );
}

export default function WebsiteDesignV1() {
  const [activeSection, setActiveSection] = useState("brief");

  // Track scroll position to update active section
  const briefRef = useRef<HTMLElement>(null);
  const deliverablesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);

  const briefInView = useInView(briefRef, { margin: "-40% 0px -55% 0px" });
  const deliverablesInView = useInView(deliverablesRef, { margin: "-40% 0px -55% 0px" });
  const statsInView = useInView(statsRef, { margin: "-40% 0px -55% 0px" });
  const processInView = useInView(processRef, { margin: "-40% 0px -55% 0px" });

  // Update active section based on which is in view
  const currentSection = processInView
    ? "process"
    : statsInView
    ? "stats"
    : deliverablesInView
    ? "deliverables"
    : briefInView
    ? "brief"
    : activeSection;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[40vh] flex-col justify-end overflow-hidden bg-[#0a0a0a] pb-10 pt-24 md:pb-12">
        <Image
          src="/service-header-bg.jpg"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="container-wide relative z-10 w-full">
          {/* Back arrow */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
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
            {/* Left: heading block */}
            <div className="max-w-[760px]">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
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
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                className="mt-4 max-w-[52ch] font-body text-base leading-relaxed text-white/55"
              >
                For Australian businesses that need a site that loads fast, looks
                credible, and turns visitors into enquiries.
              </motion.p>
            </div>

            {/* Right: dossier spec + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              className="flex flex-col gap-5 lg:items-end"
            >
              {/* Spec list */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:grid-cols-2 lg:text-right">
                {dossierMeta.map((m) => (
                  <div key={m.label}>
                    <dt className="font-display text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
                      {m.label}
                    </dt>
                    <dd className="mt-0.5 font-display text-xs font-semibold text-white/70">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* CTA buttons */}
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="border-b border-light-border bg-light-bg dark:border-dark-border dark:bg-dark-bg">
        <div className="container-wide py-3">
          <nav className="flex items-center gap-2 font-body text-xs text-light-muted/50 dark:text-dark-muted/50">
            <Link href="/" className="transition-colors hover:text-red-brand">Home</Link>
            <span>›</span>
            <Link href="/services" className="transition-colors hover:text-red-brand">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Website Design</span>
          </nav>
        </div>
      </div>

      {/* ── Body with sticky rail ── */}
      <div className="bg-light-bg dark:bg-dark-bg">

        {/* ── 01 Brief — LIGHT ── */}
        <section id="brief" ref={briefRef} className="py-16 md:py-24">
          <div className="container-wide">
            <div className="flex gap-16">
              <StickyRail activeSection={currentSection} />

              <div className="min-w-0 flex-1">
                {/* Section index header */}
                <Reveal>
                  <div className="flex items-baseline gap-5 border-b border-light-border pb-5 dark:border-dark-border">
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-red-brand">01</span>
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-light-muted/50 dark:text-dark-muted/50">Brief</span>
                  </div>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-7 lg:grid-cols-12">
                  <Reveal delay={0.05} className="lg:col-span-6">
                    <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                      Think of it as your hardest-working salesperson.
                    </h2>
                  </Reveal>

                  <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
                    <p className="font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                      Your website is the only salesperson that works 24 hours a day,
                      7 days a week. Your job is to make sure it looks professional and
                      has everything it needs to lock in more customers and sales.
                    </p>
                    <p className="mt-4 font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                      At WebGaze we design and build sites that carry their weight:
                      clear positioning, fast performance, and structure that search
                      engines can read from day one.
                    </p>
                    <Link
                      href="/request-a-quote"
                      className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-red-brand transition-colors hover:text-red-dark"
                    >
                      Discuss your project
                      <span aria-hidden="true">→</span>
                    </Link>
                  </Reveal>
                </div>

                {/* Stack tags */}
                <Reveal delay={0.14} className="mt-10">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-light-border px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-light-muted/60 dark:border-dark-border dark:text-dark-muted/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hairline rule ── */}
        <div className="container-wide">
          <div className="border-t border-light-border dark:border-dark-border" />
        </div>

        {/* ── 02 Deliverables — LIGHT ── */}
        <section id="deliverables" ref={deliverablesRef} className="py-16 md:py-24">
          <div className="container-wide">
            <div className="flex gap-16">
              <div className="hidden lg:block w-36 shrink-0" /> {/* spacer aligns with rail */}

              <div className="min-w-0 flex-1">
                <Reveal>
                  <div className="flex items-baseline gap-5 border-b border-light-border pb-5 dark:border-dark-border">
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-red-brand">02</span>
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-light-muted/50 dark:text-dark-muted/50">Deliverables</span>
                  </div>
                </Reveal>

                <Reveal delay={0.05} className="mt-10">
                  <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                    Everything you need, nothing you don&apos;t.
                  </h2>
                </Reveal>

                {/* Asymmetric editorial index */}
                <div className="mt-10 grid grid-cols-1 gap-px border-t border-light-border dark:border-dark-border lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  {features.map((f, i) => (
                    <Reveal key={f.title} delay={i * 0.04}>
                      <div
                        className={`border-b border-light-border py-7 dark:border-dark-border lg:px-6 ${
                          i % 2 === 0 ? "lg:border-r lg:pl-0" : ""
                        }`}
                      >
                        <div className="flex items-start gap-5">
                          <span className="mt-0.5 shrink-0 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-light-muted/30 dark:text-dark-muted/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="font-display text-base font-bold tracking-[-0.015em]">
                              {f.title}
                            </h3>
                            <p className="mt-1.5 font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                              {f.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── 03 Stats — DARK ── */}
      <section id="stats" ref={statsRef} className="bg-[#0a0a0a] py-16 text-white md:py-24">
        <div className="container-wide">
          <div className="flex gap-16">
            {/* Rail spacer (dark bg, no visible rail) */}
            <div className="hidden lg:block w-36 shrink-0" />

            <div className="min-w-0 flex-1">
              <Reveal>
                <div className="flex items-baseline gap-5 border-b border-white/10 pb-5">
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-red-brand">03</span>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-white/25">By the numbers</span>
                </div>
              </Reveal>

              <div className="mt-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
                {stats.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.06}>
                    <div className="bg-[#0a0a0a] px-7 py-8">
                      <p className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em]">
                        {stat.num}
                      </p>
                      <p className="mt-3 font-body text-xs leading-relaxed text-white/45 md:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Pull quote */}
              <Reveal delay={0.1} className="mt-12">
                <blockquote className="max-w-2xl">
                  <p className="font-display text-xl font-bold leading-[1.25] tracking-[-0.02em] text-white md:text-2xl">
                    &ldquo;Your website is the only salesperson that works 24 hours a
                    day, 7 days a week.&rdquo;
                  </p>
                  <footer className="mt-4">
                    <cite className="font-display text-[10px] not-italic font-bold uppercase tracking-[0.22em] text-white/30">
                      WebGaze, Sydney
                    </cite>
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Process — DARK ── */}
      <section id="process" ref={processRef} className="bg-[#0d0d0d] py-16 md:py-24">
        <div className="container-wide">
          <div className="flex gap-16">
            <div className="hidden lg:block w-36 shrink-0" />

            <div className="min-w-0 flex-1">
              <Reveal>
                <div className="flex items-baseline gap-5 border-b border-white/10 pb-5">
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-red-brand">04</span>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-white/25">Process</span>
                </div>
              </Reveal>

              <div className="mt-10 grid grid-cols-1 gap-x-14 lg:grid-cols-12">
                <Reveal delay={0.05} className="lg:col-span-5">
                  <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                    A closer look at our methodology.
                  </h2>
                </Reveal>
                <Reveal delay={0.1} className="mt-5 lg:col-span-6 lg:col-start-7 lg:mt-0">
                  <p className="font-body text-sm leading-relaxed text-dark-muted md:text-base">
                    Turning insights into digital experiences that work, from discovery
                    to launch and beyond.
                  </p>
                </Reveal>
              </div>

              <WebDesignProcess />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
