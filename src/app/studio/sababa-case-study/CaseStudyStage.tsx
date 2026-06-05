"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import ProjectHeroPreview from "@/components/sections/ProjectHeroPreview";
import { getProject } from "@/lib/projects";

/* ------------------------------------------------------------------ */
/*  Sababa Global Trade & Logistics — premium, light-led case study.   */
/*  Light-led body, neutral-dark hero/marquee/bookend, and WebGaze red */
/*  throughout (accents AND glows) to stay on house brand.             */
/*  Visuals are real captures of sababaservices.com — homepage         */
/*  (full page), every inner page, and mobile.                         */
/* ------------------------------------------------------------------ */

const project = getProject("sababa-global")!;
const heroPreview = "/portfolio/sababa/live/sababa-global-homepage-fullpage.jpg";
const L = "/portfolio/sababa/live";

// Dark grounds stay neutral; the glows carry our house red.
const INK = "#070707"; // hero + bookend ground
const BAND = "#0b0b0d"; // marquee band
const LEAF = "#E01B24"; // red-brand — ambient glow colour
const FOREST = "#5e0d11"; // deeper red for glow falloff

const SCOPE =
  "Door-to-door services, real customs depth, and a quick path to a quote — all made obvious.";

const VALUES = [
  { title: "One dedicated expert", icon: "people" },
  { title: "Safe passage", icon: "shield" },
  { title: "Best landed price", icon: "spark" },
  { title: "Fully accredited", icon: "globe" },
] as const;

const STEPS = [
  {
    n: "01",
    kicker: "Challenge",
    title: "A global operator, a local-feeling site.",
    body: "Real scale and deep customs expertise, hidden behind a flat, template-feeling presence.",
  },
  {
    n: "02",
    kicker: "Approach",
    title: "Lead with the promise, then prove it.",
    body: "Safe passage and timely delivery up front — then every freight mode and customs service its own clear page.",
  },
  {
    n: "03",
    kicker: "Outcome",
    title: "Reads like the global operator it is.",
    body: "Clear services, a credible tone, and a fast route from visitor to quote.",
  },
];

// Their real service lines — the substance behind the brand.
const SERVICES = [
  { name: "Air Freight", note: "Door-to-door air options to most points in the world." },
  { name: "Sea Freight", note: "Customised sea freight matched to your goals and budget." },
  { name: "Road Freight", note: "Complete cargoes moved with savings in both time and cost." },
  { name: "Export Packaging", note: "The right packaging for your products, sorted." },
  { name: "Export Customs Clearance", note: "All export formalities handled by accredited brokers." },
  { name: "Customs & Quarantine Clearance", note: "Smooth clearance through customs and quarantine." },
  { name: "Tariff Consulting & Audit", note: "Tariff advice and audits that protect your margins." },
  { name: "Warehousing & Storage", note: "Storage and warehousing at destination." },
];

// Real inner pages — proof the whole site was designed, not just a homepage.
const PAGES = [
  { src: `${L}/sababa-global-homepage.jpg`, label: "Homepage" },
  { src: `${L}/sababa-global-about.jpg`, label: "About" },
  { src: `${L}/sababa-global-services.jpg`, label: "Services" },
  { src: `${L}/sababa-global-sea-freight.jpg`, label: "Sea Freight" },
  { src: `${L}/sababa-global-air-freight.jpg`, label: "Air Freight" },
  { src: `${L}/sababa-global-road-freight.jpg`, label: "Road Freight" },
  { src: `${L}/sababa-global-customs.jpg`, label: "Customs Clearance" },
  { src: `${L}/sababa-global-warehousing.jpg`, label: "Warehousing" },
  { src: `${L}/sababa-global-quote.jpg`, label: "Request a Quote" },
  { src: `${L}/sababa-global-contact.jpg`, label: "Contacts" },
];

/* ---------------------- motion helper ----------------------------- */

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({
  children,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-[11px] font-bold uppercase tracking-[0.24em] ${light ? "text-red-light" : "text-red-brand"} ${className}`}>
      <span className="h-px w-6 bg-red-brand" />
      {children}
    </span>
  );
}

/* ---------------------- value icons ------------------------------- */

function ValueIcon({ name }: { name: (typeof VALUES)[number]["icon"] }) {
  const common = { fill: "none", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" {...common} aria-hidden="true">
      {name === "spark" && <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m13.5-6.5L14 8m-4 8-2.5 2.5m9 0L14 16m-4-8L7.5 5.5M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />}
      {name === "shield" && <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Zm-2.5 9 2 2 4-4" />}
      {name === "people" && <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c-3 0-5 1.7-5 4.5V18h7m6-2a3 3 0 1 0 0-5m2.5 7H22v-1.5c0-2-1.3-3.4-3.2-3.4" />}
      {name === "globe" && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c-2.5 0-4.5-4-4.5-9S9.5 3 12 3s4.5 4 4.5 9-2 9-4.5 9ZM3.5 9h17M3.5 15h17" />}
    </svg>
  );
}

/* ---------------------- phone mockup ------------------------------ */

function PhoneDeck({ src, scroll = false, className = "" }: { src: string; scroll?: boolean; className?: string }) {
  return (
    <div className={`wgPause ${className}`}>
      <div className="relative overflow-hidden rounded-[2.4rem] border-[7px] border-[#15161a] bg-black shadow-[0_30px_70px_-28px_rgba(20,20,22,0.45)]">
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-[500px] w-[244px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="Sababa Global on mobile" loading="lazy" decoding="async" className={`block w-full ${scroll ? "wgDeckP" : ""}`} />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  HERO — neutral dark, hover-to-scroll preview (mirrors CPA).       */
/* ================================================================== */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 text-white" style={{ backgroundColor: INK }}>
      <div
        className="absolute inset-x-0 top-0 h-[520px] opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle at 70% 22%, ${LEAF}, transparent 44%)` }}
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[340px] w-[340px] rounded-full opacity-20 blur-[120px]"
        style={{ background: `radial-gradient(circle, ${FOREST}, transparent 60%)` }}
      />
      <div className="container-wide relative z-10 pb-16">
        <a href="/work" className="mb-8 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white/75">
          <span>←</span> All Projects
        </a>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(420px,1.08fr)] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              {project.tag} · {project.year}
            </p>
            <h1 className="font-display text-[clamp(2.35rem,4.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">{project.name}</h1>
            <p className="mt-6 max-w-[560px] font-body text-base leading-relaxed text-white/64 md:text-lg">{project.summary}</p>
            <div className="mt-9 grid max-w-[660px] gap-6 border-t border-white/10 pt-7 md:grid-cols-3">
              {[
                ["Industry", project.industry],
                ["Platform", project.platform],
                ["Category", project.category],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{label}</p>
                  <p className="font-display text-sm font-bold leading-snug text-white/80">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 max-w-[660px]">
              <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Services</p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span key={service} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-display text-xs font-bold text-white/78">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ProjectHeroPreview src={heroPreview} alt="Sababa Global Trade & Logistics website" url="sababaservices.com" scroll priority />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CASE STUDY (light-led)                                             */
/* ================================================================== */

export function SababaCaseStudyStage() {
  const [step, setStep] = useState(0);
  const [openSrv, setOpenSrv] = useState(0);
  return (
    <main className="bg-white text-[#141414]">
      <style>{`
        @keyframes wgDeckP { 0%,8%{transform:translateY(0)} 92%,100%{transform:translateY(calc(-100% + 500px))} }
        .wgDeckP { animation: wgDeckP 26s ease-in-out infinite alternate; }
        .wgPause:hover .wgDeckP { animation-play-state: paused; }
        @keyframes wgMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wgMarquee { animation: wgMarquee 55s linear infinite; }
        .wgMarqueeWrap:hover .wgMarquee { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce){ .wgDeckP,.wgMarquee{ animation: none !important; } }
      `}</style>

      {/* HERO (neutral dark) */}
      <Hero />

      {/* 1 — THE BRIEF: overview · values · story · services (one section) */}
      <section className="py-12 md:py-16">
        <div className="container-wide space-y-12 md:space-y-16">

          {/* Overview */}
          <div>
            <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <Kicker>Overview</Kicker>
                <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.03em]">
                  A digital home as global as the freight it moves.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-base leading-relaxed text-[#444] md:text-lg">{SCOPE}</p>
              </Reveal>
            </div>
            <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-black/10 md:grid-cols-4">
              {[
                ["Year", "2024"],
                ["Sector", "Freight · Logistics"],
                ["Coverage", "Door-to-door, worldwide"],
                ["Scope", "10 pages"],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.05} className={`p-6 ${i < 3 ? "border-r border-black/10" : ""} ${i < 2 ? "border-b border-black/10 md:border-b-0" : ""}`}>
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/35">{k}</p>
                  <p className="mt-2 font-display text-lg font-bold tracking-[-0.01em]">{v}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Core values — icon + label only, no body copy */}
          <div className="border-t border-black/8 pt-12 md:pt-16">
            <Reveal>
              <Kicker>What They Stand For</Kicker>
              <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                Four promises, made <span className="text-red-brand">impossible to miss</span>.
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <article className="group flex items-center gap-3.5 rounded-2xl border border-black/8 bg-[#fafafa] p-4 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(15,15,20,0.3)]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-brand text-white">
                      <ValueIcon name={v.icon} />
                    </span>
                    <h3 className="font-display text-[15px] font-bold tracking-[-0.01em]">{v.title}</h3>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* The story (tabs) + services (accordion) — side by side */}
          <div className="grid gap-10 border-t border-black/8 pt-12 md:pt-16 lg:grid-cols-2 lg:gap-14">

            {/* The story — tabs (one panel shown at a time) */}
            <div>
              <Reveal>
                <Kicker>The Story</Kicker>
                <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold leading-[1.12] tracking-[-0.02em]">
                  From overlooked to <span className="text-red-brand">unmistakably global</span>.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.n}
                      type="button"
                      onClick={() => setStep(i)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                        i === step ? "border-red-brand bg-red-brand text-white" : "border-black/10 bg-white text-black/55 hover:border-black/25"
                      }`}
                    >
                      <span className={i === step ? "text-white/70" : "text-black/35"}>{s.n}</span>
                      {s.kicker}
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-black/8 bg-[#fafafa] p-6 md:p-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="font-display text-lg font-bold tracking-[-0.01em] md:text-xl">{STEPS[step].title}</h3>
                      <p className="mt-3 font-body text-[15px] leading-relaxed text-[#555]">{STEPS[step].body}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>

            {/* Services — accordion */}
            <div>
              <Reveal>
                <Kicker>The Full Offering</Kicker>
                <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold leading-[1.12] tracking-[-0.02em]">
                  Eight service lines, one clear path.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 divide-y divide-black/8 overflow-hidden rounded-2xl border border-black/8 bg-[#fafafa]">
                  {SERVICES.map((srv, i) => {
                    const open = i === openSrv;
                    return (
                      <div key={srv.name}>
                        <button
                          type="button"
                          onClick={() => setOpenSrv(open ? -1 : i)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-black/[0.02]"
                          aria-expanded={open}
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-brand/10 text-red-brand">
                              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                                <path d="m5 12 5 5 9-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span className="font-display text-sm font-bold tracking-[-0.005em]">{srv.name}</span>
                          </span>
                          <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 shrink-0 text-black/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true">
                            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-3.5 pl-[3.25rem] font-body text-[13px] leading-relaxed text-[#666]">{srv.note}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </section>

      {/* 5 — EVERY PAGE / MARQUEE (dark band) -------------------------- */}
      <section className="relative overflow-hidden py-14 text-white md:py-20" style={{ backgroundColor: BAND }}>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[300px] opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle at 30% 0%, ${LEAF}, transparent 50%)` }}
        />
        <div className="container-wide relative mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <Reveal>
            <Kicker light>The Whole Site</Kicker>
            <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.7rem,3vw,2.7rem)] font-bold leading-[1.08] tracking-[-0.02em]">
              Every page, built to the same standard.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-body text-sm leading-relaxed text-white/55">
              Ten pages — every freight mode, customs, the quote form and contacts — one clear system.
            </p>
          </Reveal>
        </div>
        <div className="wgMarqueeWrap relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-32" style={{ backgroundImage: `linear-gradient(to right, ${BAND}, transparent)` }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-32" style={{ backgroundImage: `linear-gradient(to left, ${BAND}, transparent)` }} />
          <div className="wgMarquee flex w-max gap-5">
            {[...PAGES, ...PAGES].map((p, i) => (
              <figure key={i} className="group relative shrink-0">
                <div className="relative h-[250px] w-[400px] overflow-hidden rounded-xl border border-white/10 bg-[#111114] md:h-[300px] md:w-[480px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.label} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
                </div>
                <figcaption className="mt-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45">{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — MOBILE (white, hero moment) ------------------------------- */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(20,20,22,0.05), transparent 60%)" }}
        />
        <div className="container-wide relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center">Mobile First</Kicker>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.02em]">
                The same confidence, right in their hand.
              </h2>
              <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-[#555]">
                Most enquiries start on a phone. Fast, clear pages that put services and the quote form first.
              </p>
            </Reveal>
          </div>

          {/* phone trio */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex items-center justify-center">
              <PhoneDeck src={`${L}/sababa-global-services-mobile.jpg`} className="hidden translate-x-10 translate-y-6 rotate-[-7deg] scale-[0.82] opacity-90 lg:block" />
              <PhoneDeck src={`${L}/sababa-global-homepage-mobile.jpg`} scroll className="relative z-10" />
              <PhoneDeck src={`${L}/sababa-global-about-mobile.jpg`} className="hidden -translate-x-10 translate-y-6 rotate-[7deg] scale-[0.82] opacity-90 lg:block" />
            </div>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Clear", "Every freight mode scannable on a small screen."],
              ["Fast", "A lightweight build that loads quickly."],
              ["Quote-ready", "The request form is always one tap away."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06} className="rounded-xl border border-black/8 bg-[#fafafa] p-5">
                <p className="font-display text-sm font-bold">{t}</p>
                <p className="mt-1.5 font-body text-[13px] leading-relaxed text-[#666]">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — RESULT + CTA (neutral-dark bookend) ----------------------- */}
      <section className="relative overflow-hidden py-20 text-white md:py-28" style={{ backgroundColor: INK }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 100%, ${LEAF}, transparent 55%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-[320px] w-[320px] rounded-full opacity-25 blur-[120px]"
          style={{ background: `radial-gradient(circle, ${FOREST}, transparent 60%)` }}
        />
        <div className="container-wide relative text-center">
          <Reveal>
            <Kicker light className="justify-center">The Result</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-[20ch] font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              A freight forwarder that finally looks the part — worldwide.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://sababaservices.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-brand px-7 py-3.5 font-display text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(224,27,36,0.6)] transition hover:bg-red-light"
              >
                Visit the live site
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/work" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-display text-sm font-bold text-white/85 transition hover:bg-white/10">
                See more projects
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
