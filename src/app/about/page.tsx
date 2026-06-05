"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CTA from "@/components/sections/CTA";

const EASE = [0.16, 1, 0.3, 1] as const;

const studioFacts = [
  { label: "Based in", value: "Sydney, NSW" },
  { label: "Working", value: "Australia-wide" },
  { label: "Experience", value: "6+ years" },
  { label: "Projects", value: "50+ delivered" },
];

const stats = [
  { value: "50+", label: "Projects delivered", sub: "Websites, brands & systems" },
  { value: "9", label: "Industries served", sub: "Care, energy, trade & more" },
  { value: "6+", label: "Years of craft", sub: "Sydney-based, Australia-wide" },
  { value: "100%", label: "Custom built", sub: "No templates, ever" },
];

const services = [
  {
    eyebrow: "01",
    title: "Website design & development",
    body: "Custom websites for Australian businesses that need credibility, speed, a clear conversion path, and structure search engines can understand.",
    href: "/services/website-design",
  },
  {
    eyebrow: "02",
    title: "Visual branding",
    body: "Logos, brand identities, and visual systems that make your business feel consistent across web, social, proposals, and signage.",
    href: "/services/visual-branding",
  },
  {
    eyebrow: "03",
    title: "Search engine optimisation",
    body: "SEO strategy, technical foundations, and content structure designed to help the right customers actually find you.",
    href: "/services/seo",
  },
  {
    eyebrow: "04",
    title: "Maintenance & digital care",
    body: "Updates, security, backups, and practical support so your website keeps working long after launch day.",
    href: "/services/maintenance",
  },
];

const principles = [
  {
    title: "Strategy before pixels",
    body: "We get clear on your offer, audience, and goals before any design decisions are made. The prettiest site fails if it says the wrong thing.",
  },
  {
    title: "Design that earns trust",
    body: "Clean, fast, and consistent. We make your business feel established without sacrificing readability, accessibility, or load speed.",
  },
  {
    title: "Built to be found",
    body: "Search thinking lives inside the architecture, not bolted on later. The right people should be able to discover you and understand you quickly.",
  },
  {
    title: "We don't disappear",
    body: "Launch is the start, not the finish. We stick around for updates, fixes, and changes so your site stays useful as the business grows.",
  },
];

const fit = [
  "Your current site no longer reflects the quality of the business.",
  "Customers keep asking questions the website should already answer.",
  "The brand feels inconsistent across web, proposals, and social.",
  "You want better visibility in search, without turning the site into keyword soup.",
];

/* Scroll-reveal wrapper with real entrance motion. */
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

export default function AboutPage() {
  return (
    <>
      <main className="bg-light-bg text-[#0a0a0a] dark:bg-dark-bg dark:text-white">
        {/* ───────────────────────── Hero (matches /projects header style) ───────────────────────── */}
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
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-5"
            >
              <Link
                href="/"
                aria-label="Go back home"
                className="group inline-flex items-center gap-2 font-display text-sm font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
              >
                <span className="text-base leading-none transition-transform duration-200 group-hover:-translate-x-1">
                  ←
                </span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              {/* Left: heading */}
              <div className="max-w-[760px]">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                  className="mb-4 inline-flex items-center rounded-full border border-red-brand/30 bg-red-brand/[0.08] px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-red-brand"
                >
                  About WebGaze
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="max-w-[18ch] font-display font-bold text-white text-[clamp(2.55rem,10.5vw,3.7rem)] leading-[1.02] tracking-[-0.035em] lg:text-[clamp(1.9rem,3.4vw,3.2rem)] lg:leading-[1.05] lg:tracking-[-0.02em]"
                >
                  We make good businesses impossible to ignore.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18, ease: EASE }}
                  className="mt-4 max-w-[52ch] font-body text-base leading-relaxed text-white/55"
                >
                  A Sydney web design, branding, and SEO studio. We build custom sites
                  that load fast, look credible, and turn visitors into enquiries.
                </motion.p>
              </div>

              {/* Right: CTA */}
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

        {/* ───────────────────────── Studio facts (compact strip) ───────────────────────── */}
        <section className="border-b border-light-border bg-light-surface dark:border-dark-border dark:bg-[#0d0d0d]">
          <div className="container-wide">
            <dl className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-light-border md:dark:divide-dark-border">
              {studioFacts.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`py-5 md:px-8 ${i % 2 === 0 ? "pr-4" : "pl-4"} ${
                    i < 2 ? "border-b border-light-border dark:border-dark-border md:border-b-0" : ""
                  }`}
                >
                  <dt className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-red-brand">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-bold md:text-lg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────────────────────── Story / why ───────────────────────── */}
        <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
          <div className="container-wide">
            <Reveal>
              <p className="label-tag">Why we exist</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[24ch] font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Most people judge your business before they ever speak to you.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
              <Reveal delay={0.1} className="lg:col-span-6">
                <p className="font-display text-xl font-semibold leading-[1.3] tracking-[-0.015em] md:text-2xl">
                  They find you online, scan for a few seconds, and decide whether
                  you&apos;re worth their time. A slow, confusing, or dated website
                  quietly loses good customers every day.
                </p>
              </Reveal>
              <Reveal delay={0.16} className="lg:col-span-5 lg:col-start-8">
                <p className="font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                  We started WebGaze to fix that gap. Plenty of Australian businesses
                  are excellent at what they do, but their website doesn&apos;t show
                  it. Our job is to close the distance between how good the business
                  really is and how it comes across online, with clearer structure,
                  stronger branding, faster pages, and content the right people can
                  actually find.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────── Stats ───────────────────────── */}
        <section className="bg-[#0a0a0a] py-16 text-white md:py-20">
          <div className="container-wide">
            <Reveal>
              <p className="label-tag">By the numbers</p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
              {stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 0.06}
                  className={`pt-6 md:pt-7 lg:px-8 ${
                    i % 2 === 0 ? "pr-4" : "border-l border-white/10 pl-4 lg:border-l-0 lg:pl-8"
                  } ${i < 2 ? "border-b border-white/10 pb-6 lg:border-b-0 lg:pb-0" : ""}`}
                >
                  <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-none tracking-[-0.04em]">
                    {stat.value}
                  </p>
                  <p className="mt-3 font-display text-sm font-semibold">{stat.label}</p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-white/45">
                    {stat.sub}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── What we do ───────────────────────── */}
        <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="label-tag">What we do</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                    One studio. Four connected disciplines.
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                    Because they live under one roof, your website, brand, and search
                    presence all pull in the same direction.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <div className="border-t border-light-border dark:border-dark-border">
                  {services.map((service, index) => (
                    <Reveal key={service.title} delay={index * 0.05}>
                      <Link
                        href={service.href}
                        className="group relative grid items-start gap-x-5 gap-y-2 border-b border-light-border py-6 dark:border-dark-border md:grid-cols-[44px_1fr_24px]"
                      >
                        <span className="absolute left-0 top-0 h-[2px] w-0 bg-red-brand transition-all duration-500 ease-out group-hover:w-full" />
                        <span className="font-display text-sm font-semibold text-red-brand">
                          {service.eyebrow}
                        </span>
                        <span>
                          <span className="block font-display text-lg font-bold leading-tight tracking-[-0.015em] transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-xl">
                            {service.title}
                          </span>
                          <span className="mt-2 block max-w-2xl font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                            {service.body}
                          </span>
                        </span>
                        <span className="hidden self-center text-xl text-light-muted/40 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-red-brand dark:text-white/40 md:block">
                          →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── How we work ───────────────────────── */}
        <section className="bg-[#0a0a0a] py-16 text-white md:py-24">
          <div className="container-wide">
            <div className="max-w-2xl">
              <Reveal>
                <p className="label-tag">How we work</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                  Four things we never cut corners on.
                </h2>
              </Reveal>
            </div>

            {/* Mobile: stacked compact rows. Desktop: compact 2-col grid. */}
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-white/12 bg-white/12 md:mt-12 md:grid-cols-2">
              {principles.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full bg-[#0a0a0a] p-6 md:p-7">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm font-bold text-red-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg font-bold tracking-[-0.015em] md:text-xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── Who we're a fit for ───────────────────────── */}
        <section className="bg-light-bg py-16 dark:bg-dark-bg md:py-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="label-tag">When we&apos;re a fit</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                    The business is good. The website just isn&apos;t saying so yet.
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={0.1}>
                  <p className="font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
                    We work best with established teams that need clearer positioning,
                    a stronger website, better SEO foundations, and a partner who keeps
                    the site useful after launch. A few signs it might be time:
                  </p>
                </Reveal>
                <div className="mt-6 border-t border-light-border dark:border-dark-border">
                  {fit.map((item, index) => (
                    <Reveal key={item} delay={0.14 + index * 0.05}>
                      <div className="flex items-start gap-3 border-b border-light-border py-4 dark:border-dark-border">
                        <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-brand" />
                        <p className="font-display text-base font-semibold leading-snug tracking-[-0.01em]">
                          {item}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CTA />
    </>
  );
}
