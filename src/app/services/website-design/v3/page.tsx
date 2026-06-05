"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimateIn from "@/components/ui/AnimateIn";
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

const tags = ["React.js", "Next.js", "WordPress", "E-Commerce", "Figma", "UI/UX"];

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

export default function WebsiteDesignV3Page() {
  return (
    <>
      {/* ─────────────────────── Hero ─────────────────────── */}
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
            {/* Left */}
            <div className="max-w-[800px]">
              {/* BOLD MOMENT: oversized service-name headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
                className="max-w-[15ch] font-display text-[clamp(2.6rem,5.5vw,5.2rem)] font-bold leading-[1.0] tracking-[-0.04em] text-white"
              >
                Website Design <span className="text-white/50">&amp; Development</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
                className="mt-5 max-w-[52ch] font-body text-base leading-relaxed text-white/55"
              >
                For Australian businesses that need a site that loads fast, looks
                credible, and turns visitors into enquiries. No templates, no
                shortcuts.
              </motion.p>
            </div>

            {/* Right: simple pills on mobile, editorial action list on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
            >
              {/* Mobile / tablet */}
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

              {/* Desktop: editorial action list */}
              <div className="hidden w-[300px] lg:block">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
                  Start your project
                </p>
                <div className="mt-4 border-t border-white/15">
                  {[
                    { label: "Request a Proposal", href: "/request-a-quote" },
                    { label: "Book Discovery Call", href: "/book-a-discovery-session" },
                  ].map((action) => (
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
            <li>
              <Link href="/" className="transition-colors hover:text-red-brand">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/services" className="transition-colors hover:text-red-brand">Services</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-[#0a0a0a] dark:text-white">Website Design</li>
          </ol>
        </div>
      </nav>

      {/* ─────────────────────── Intro — LIGHT ─────────────────────── */}
      <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">Why it matters</span>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
            <Reveal delay={0.06} className="lg:col-span-6">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Think of it as your hardest-working salesperson.
              </h2>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
              <p className="font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                Your website is the only salesperson that works 24 hours a day,
                7 days a week. Your job is to make sure it looks professional and
                has everything it needs to lock in more customers and sales.
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

      {/* ─────────────────────── Process — DARK (isolated between light sections) ─────────────────────── */}
      <section className="bg-[#0a0a0a] py-16 md:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">Our process</span>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              A closer look at our web design methodology.
            </h2>
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-dark-muted md:text-base">
              Turning insights into digital experiences that work, from discovery to
              launch and beyond.
            </p>
          </Reveal>

          <WebDesignProcess />
        </div>
      </section>

      {/* ─────────────────────── Features — LIGHT SURFACE ─────────────────────── */}
      <section className="bg-light-surface py-16 dark:bg-dark-surface md:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="label-tag">What&apos;s included</span>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Standard on every site we build.
            </h2>
          </Reveal>

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

          {/* Tech tags */}
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

      {/* ─────────────────────── Thin CTA row ─────────────────────── */}
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
              <p className="mt-3 max-w-[22ch] font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[2rem]">
                Let&apos;s build your{" "}
                <span className="text-white/45">hardest-working</span> salesperson.
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
