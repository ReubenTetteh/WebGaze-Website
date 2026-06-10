"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProcessScroller from "@/components/services/ProcessScroller";
import { systemsPhases } from "@/components/services/systemsPhases";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  { num: "01", title: "We listen", label: "A free session to understand your problem." },
  { num: "02", title: "We build", label: "A custom system that removes the manual work." },
  { num: "03", title: "It runs", label: "Your team gets time back, for good." },
];

const features = [
  { title: "Custom internal tools", desc: "Dashboards, portals, trackers, and apps built around the way your team already works. No rigid templates." },
  { title: "Workflow automation", desc: "The repetitive, manual steps in your day handled automatically, so your team stops doing them by hand." },
  { title: "AI where it counts", desc: "AI put to work on the right tasks: summarising, sorting, drafting, flagging. Not bolted on for show." },
  { title: "Learning platforms", desc: "Private learning spaces, training portals, and resource hubs built for communities, churches, and teams." },
  { title: "Smart forms & intake", desc: "Replace paper and clunky spreadsheets with intake, booking, and capture systems that just work." },
  { title: "Tracking & records", desc: "Turn messy manual logs like fleet updates, job sheets, or reports into clean, searchable records." },
];

const tags = ["AI Solutions", "Custom Tools", "Automation", "Internal Apps", "Dashboards", "Workflow"];

const heroActions = [
  { label: "Request a Proposal", href: "/request-a-quote" },
  { label: "Book Discovery Call", href: "/book-a-discovery-session" },
];

function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

export default function SystemsAutomationPage() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative flex min-h-[40vh] flex-col justify-end overflow-hidden bg-[#0a0a0a] pb-10 pt-24 md:pb-14">
        <Image
          src="/service-header-bg.jpg"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="container-wide relative z-10 w-full">
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
            <div className="max-w-[820px]">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.04, ease: EASE }}
                className="mb-4 inline-flex items-center rounded-full border border-red-brand/30 bg-red-brand/[0.08] px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-red-brand"
              >
                New Service
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-display font-bold text-white text-[clamp(2.55rem,10.5vw,3.7rem)] leading-[1.02] tracking-[-0.035em] lg:text-[clamp(2.4rem,5vw,4.6rem)] lg:leading-[1.0] lg:tracking-[-0.04em]"
              >
                Software that fits<br />
                <span className="text-white/45">how you actually work</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
                className="mt-5 max-w-[56ch] font-body text-base leading-relaxed text-white/55"
              >
                Off-the-shelf tools make you bend your business to fit them. We build
                custom apps, automation, and AI that fit around your team — and quietly
                take the busywork off their plate.
              </motion.p>
            </div>

            {/* Right: pills on mobile, editorial action list on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
            >
              <div className="flex flex-col gap-3 sm:flex-row lg:hidden">
                <Link href="/request-a-quote" className="btn-primary justify-center">
                  Request a Proposal
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/book-a-discovery-session"
                  className="btn-outline justify-center border-white/30 text-white hover:border-red-brand"
                >
                  Book Discovery Call
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="hidden w-[300px] lg:block">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
                  Start your project
                </p>
                <div className="mt-4 border-t border-white/15">
                  {heroActions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="group flex items-center justify-between gap-6 border-b border-white/15 py-4"
                    >
                      <span className="font-display text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-brand">
                        {action.label}
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-base text-white transition-all duration-300 group-hover:translate-x-1 group-hover:border-red-brand group-hover:bg-red-brand">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-light-border bg-light-bg dark:border-dark-border dark:bg-dark-bg"
      >
        <div className="container-wide py-4">
          <ol className="flex items-center gap-2 font-body text-xs text-light-muted dark:text-dark-muted">
            <li><Link href="/" className="transition-colors hover:text-red-brand">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/services" className="transition-colors hover:text-red-brand">Services</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-[#0a0a0a] dark:text-white">Custom Software &amp; Automation</li>
          </ol>
        </div>
      </nav>

      {/* ───────────────────────── Intro — LIGHT ───────────────────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">Why it matters</span>
          </Reveal>
          <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
            <Reveal delay={0.06} className="lg:col-span-6">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Every team has work that software should be doing for them.
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
              <p className="font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                The double-handled spreadsheets. The fleet updates buried in chat. The
                training scattered across five platforms. The report that eats half a
                day. We build software and automation that quietly takes that work off
                your team — with AI doing the useful parts where it genuinely helps.
              </p>
            </Reveal>
          </div>

          {/* 3-step */}
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-light-border pt-10 dark:border-dark-border sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={0.06 + i * 0.06}>
                <p className="font-display text-sm font-bold text-red-brand">{step.num}</p>
                <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em]">
                  {step.title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                  {step.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Process — DARK (isolated, sticky-scroll) ───────────────────────── */}
      <ProcessScroller
        eyebrow="How we build it"
        heading="From a daily headache to software that runs itself."
        intro="A clear, proven path from the first conversation to a tool your team relies on every day."
        stages={systemsPhases}
        bg="#0a0a0a"
      />

      {/* ───────────────────────── What we build — LIGHT SURFACE ───────────────────────── */}
      <section className="bg-light-surface py-16 dark:bg-dark-surface md:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">What we build</span>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Practical tools shaped around your business.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
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
              </Reveal>
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

      {/* ───────────────────────── Real example — LIGHT ───────────────────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <span className="label-tag">A real example</span>
            </Reveal>
            <div className="lg:col-span-9">
              <Reveal>
                <p className="font-display text-2xl font-bold leading-[1.2] tracking-[-0.02em] md:text-3xl">
                  A care provider was tracking behaviour charts by hand: paper forms,
                  re-typed into spreadsheets, hours every week.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                  We sat down, listened to how their team actually worked, and built a
                  custom solution that captured everything digitally, organised it
                  automatically, and surfaced the insights they needed. We have also
                  built a church learning platform, a simple fleet tracker, and a
                  focused chat app. That is the kind of problem this service exists to
                  solve.
                </p>
                <Link
                  href="/projects"
                  className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-red-brand transition-colors hover:text-red-dark"
                >
                  See our work
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Thin CTA row ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-10 md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-1/2 h-56 w-[420px] -translate-y-1/2 rounded-full bg-red-brand opacity-[0.07] blur-[120px]"
        />
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-red-brand"
        />
        <div className="container-wide relative z-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-red-brand">
                No pressure. Just next steps.
              </p>
              <p className="mt-3 max-w-[24ch] font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[2rem]">
                Tell us the work that&apos;s{" "}
                <span className="text-white/45">slowing your team down</span>.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href="/request-a-quote" className="btn-primary justify-center">
                Request a Proposal
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/book-a-discovery-session"
                className="btn-outline justify-center border-white/30 text-white hover:border-red-brand"
              >
                Book Discovery Call
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
