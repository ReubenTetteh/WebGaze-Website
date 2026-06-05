"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import ProjectHeroPreview from "@/components/sections/ProjectHeroPreview";
import { getProject } from "@/lib/projects";

/* ------------------------------------------------------------------ */
/*  WINSTAMAC — premium, light-led case study.                         */
/*  Light-led body, neutral-dark hero/marquee/bookend, and WebGaze red */
/*  throughout (accents AND glows) to stay on house brand. The client's*/
/*  orange lives only inside the real screenshots.                     */
/*  Visuals are real captures of winstamac.com — homepage (full page), */
/*  every inner page, and mobile.                                      */
/* ------------------------------------------------------------------ */

const project = getProject("winstamac")!;
const heroPreview = "/portfolio/winstamac/live/winstamac-homepage-fullpage.jpg";
const L = "/portfolio/winstamac/live";

// Dark grounds stay neutral; the glows carry our house red.
const INK = "#070707"; // hero + bookend ground
const BAND = "#0b0b0d"; // marquee band
const LEAF = "#E01B24"; // red-brand — ambient glow colour
const FOREST = "#5e0d11"; // deeper red for glow falloff

const SCOPE =
  "A house-plan marketplace that lets the architecture do the selling — searchable, priced, and clear on every screen.";

const VALUES = [
  { title: "Customisation", body: "Plans tailored to your land, climate and budget.", icon: "home" },
  { title: "Fair Pricing", body: "Transparent prices with a cost-of-build estimate.", icon: "tag" },
  { title: "Customer Satisfaction", body: "Top-notch service, end to end.", icon: "heart" },
  { title: "Global Reach", body: "Serving home-builders on every continent.", icon: "globe" },
] as const;

const STEPS = [
  {
    n: "01",
    kicker: "Challenge",
    title: "Brilliant designs, a forgettable storefront.",
    body: "World-class 3D house plans, buried in a flat template that made browsing and pricing a chore.",
  },
  {
    n: "02",
    kicker: "Approach",
    title: "Let the architecture lead.",
    body: "A searchable plan marketplace, full property pages with specs and video tours, and pricing up front.",
  },
  {
    n: "03",
    kicker: "Outcome",
    title: "A catalogue that finally sells.",
    body: "Easy to search, compare and buy — for home-builders anywhere in the world.",
  },
];

// Their real service lines — the substance behind the brand.
const SERVICES = [
  { name: "Custom House-Plan Design", note: "Plans customised to suit your land, climate and lifestyle." },
  { name: "3D & Smart-Tech Visualisation", note: "State-of-the-art renders and walkthroughs of every design." },
  { name: "Cost-of-Build Reports", note: "An estimated build cost so buyers can plan with confidence." },
  { name: "Exterior & Interior Design", note: "Considered detailing inside and out, ready to build." },
  { name: "Real Estate Development & Management", note: "Project delivery from drawing to handover." },
  { name: "Construction & Renovation", note: "Building new and reworking existing properties." },
];

// Real inner pages — proof the whole site was designed, not just a homepage.
const PAGES = [
  { src: `${L}/winstamac-homepage.jpg`, label: "Homepage" },
  { src: `${L}/winstamac-house-plans.jpg`, label: "House Plans" },
  { src: `${L}/winstamac-property-mansion.jpg`, label: "10-Bed Mansion" },
  { src: `${L}/winstamac-property-7bed.jpg`, label: "7-Bed Mansion" },
  { src: `${L}/winstamac-property-6bed.jpg`, label: "6-Bed House" },
  { src: `${L}/winstamac-property-8bed.jpg`, label: "8-Bed Modern" },
  { src: `${L}/winstamac-about.jpg`, label: "About" },
  { src: `${L}/winstamac-faq.jpg`, label: "FAQ" },
  { src: `${L}/winstamac-contact.jpg`, label: "Contact" },
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
      {name === "home" && <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5" />}
      {name === "tag" && <path d="M4 4h7l9 9-7 7-9-9V4Zm3.5 3.5h.01" />}
      {name === "heart" && <path d="M12 20s-7-4.6-9.2-9A4.4 4.4 0 0 1 12 6.6 4.4 4.4 0 0 1 21.2 11C19 15.4 12 20 12 20Z" />}
      {name === "globe" && <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c-3 3-3 15 0 18m0-18c3 3 3 15 0 18M3.5 9h17M3.5 15h17" />}
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
          <img src={src} alt="WINSTAMAC on mobile" loading="lazy" decoding="async" className={`block w-full ${scroll ? "wgDeckP" : ""}`} />
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
    <section className="relative overflow-hidden pt-28 text-white md:pt-32" style={{ backgroundColor: INK }}>
      <div
        className="absolute inset-x-0 top-0 h-[520px] opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle at 70% 22%, ${LEAF}, transparent 44%)` }}
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[340px] w-[340px] rounded-full opacity-20 blur-[120px]"
        style={{ background: `radial-gradient(circle, ${FOREST}, transparent 60%)` }}
      />
      <div className="container-wide relative z-10 pb-16">
        <a href="/projects" className="mb-8 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white/75">
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
          <ProjectHeroPreview src={heroPreview} alt="WINSTAMAC website" url="winstamac.com" scroll priority />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CASE STUDY (light-led)                                             */
/* ================================================================== */

export function WinstamacCaseStudyStage() {
  const [step, setStep] = useState(0);
  const [openSrv, setOpenSrv] = useState(0);
  return (
    <div className="bg-white text-[#141414]">
      <style>{`
        @keyframes wgDeckP { 0%,8%{transform:translateY(0)} 92%,100%{transform:translateY(calc(-100% + 500px))} }
        .wgDeckP { animation: wgDeckP 26s ease-in-out infinite alternate; }
        .wgPause:hover .wgDeckP { animation-play-state: paused; }
        @keyframes wgMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wgMarquee { animation: wgMarquee 50s linear infinite; }
        .wgMarqueeWrap:hover .wgMarquee { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce){ .wgDeckP,.wgMarquee{ animation: none !important; } }
      `}</style>

      {/* HERO (dark) */}
      <Hero />

      {/* 1 — THE BRIEF: overview · values · story · services (one section) */}
      <section className="py-12 md:py-16">
        <div className="container-wide space-y-12 md:space-y-16">

          {/* Overview */}
          <div>
            <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <Kicker>Overview</Kicker>
                <h2 className="mt-5 max-w-[17ch] font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.03em]">
                  A storefront worthy of the designs.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-base leading-relaxed text-[#444] md:text-lg">{SCOPE}</p>
              </Reveal>
            </div>
            <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-black/10 md:grid-cols-4">
              {[
                ["Year", "2024"],
                ["Sector", "Architecture · House Plans"],
                ["Catalogue", "17+ plans"],
                ["Scope", "9+ pages"],
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
                Built on <span className="text-red-brand">top-notch satisfaction</span>.
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
                  From buried catalogue to <span className="text-red-brand">browsable storefront</span>.
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
                  From first sketch to finished build.
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
              Nine pages — listings, full property details, FAQ, contact — one consistent system.
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
                The whole catalogue, right in their hand.
              </h2>
              <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-[#555]">
                Most buyers browse plans on a phone. Fast, scannable pages that keep the designs front and centre.
              </p>
            </Reveal>
          </div>

          {/* phone trio */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex items-center justify-center">
              <PhoneDeck src={`${L}/winstamac-house-plans-mobile.jpg`} className="hidden translate-x-10 translate-y-6 rotate-[-7deg] scale-[0.82] opacity-90 lg:block" />
              <PhoneDeck src={`${L}/winstamac-homepage-mobile.jpg`} scroll className="relative z-10" />
              <PhoneDeck src={`${L}/winstamac-property-mansion-mobile.jpg`} className="hidden -translate-x-10 translate-y-6 rotate-[7deg] scale-[0.82] opacity-90 lg:block" />
            </div>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Searchable", "Filter plans by bedrooms, baths and budget."],
              ["Detailed", "Specs, galleries and video tours on every plan."],
              ["Ready to buy", "Pricing and enquiry never more than a tap away."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06} className="rounded-xl border border-black/8 bg-[#fafafa] p-5">
                <p className="font-display text-sm font-bold">{t}</p>
                <p className="mt-1.5 font-body text-[13px] leading-relaxed text-[#666]">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — RESULT + CTA (dark bookend) ------------------------------- */}
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
              A storefront that finally sells the designs.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://winstamac.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-brand px-7 py-3.5 font-display text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(224,27,36,0.6)] transition hover:bg-red-light"
              >
                Visit the live site
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/projects" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-display text-sm font-bold text-white/85 transition hover:bg-white/10">
                See more projects
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
