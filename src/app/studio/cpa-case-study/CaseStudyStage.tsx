"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectHeroPreview from "@/components/sections/ProjectHeroPreview";
import { getProject } from "@/lib/projects";

/* ------------------------------------------------------------------ */
/*  Care Partners Australia — premium, light-led case study.           */
/*  Copy tightened for a human, confident read; visuals are real       */
/*  captures of carepartnersau.com (homepage + inner pages + mobile).  */
/* ------------------------------------------------------------------ */

const project = getProject("care-partners-australia")!;
const heroPreview = "/portfolio/cpa/care-partners-australia-homepage-fullpage.webp";

const CPA_NAVY = "#0C4A73";
const CPA_ORANGE = "#F08A1C";
const L = "/portfolio/cpa/live";

const SCOPE =
  "We rebuilt Care Partners end-to-end — a refreshed brand and a fast, accessible custom website that's simple to manage and ready to grow.";

const STEPS = [
  {
    n: "01",
    kicker: "The Challenge",
    title: "Good care, hidden behind an unclear site.",
    body:
      "Families, participants, and referrers struggled to find services through cluttered navigation — and the brand never felt as trustworthy as the team behind it.",
  },
  {
    n: "02",
    kicker: "The Approach",
    title: "Refresh the brand, rebuild the foundation.",
    body:
      "We simplified the content and structure so every visitor is guided, calmly, toward the right service and a clear next step — all on a fast, accessible custom build.",
  },
  {
    n: "03",
    kicker: "The Outcome",
    title: "A modern, people-first platform.",
    body:
      "Clearer information, intuitive navigation, and a quick, accessible site the team can update and scale without friction.",
  },
];

const SERVICES = [
  "NDIS Support",
  "Disability Housing",
  "Day Programs",
  "Allied Health",
  "Disability Employment",
  "Support Coordination",
];

// Real inner pages — proof the whole site was designed, not just a homepage.
const PAGES = [
  { src: `${L}/care-partners-australia-homepage.jpg`, label: "Homepage" },
  { src: `${L}/care-partners-australia-ndis.jpg`, label: "NDIS Services" },
  { src: `${L}/care-partners-australia-allied-health.jpg`, label: "Allied Health" },
  { src: `${L}/care-partners-australia-disability-housing.jpg`, label: "Disability Housing" },
  { src: `${L}/care-partners-australia-day-programs.jpg`, label: "Day Programs" },
  { src: `${L}/care-partners-australia-support-coordination.jpg`, label: "Support Coordination" },
  { src: `${L}/care-partners-australia-supported-independent-living.jpg`, label: "Supported Living" },
  { src: `${L}/care-partners-australia-short-medium-term.jpg`, label: "Respite & STA" },
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

function Kicker({ children, className = "", light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-[11px] font-bold uppercase tracking-[0.24em] ${light ? "text-red-light" : "text-red-brand"} ${className}`}>
      <span className="h-px w-6 bg-red-brand" />
      {children}
    </span>
  );
}

/* ---------------------- phone mockup ------------------------------ */

function PhoneDeck({ src, scroll = false, className = "" }: { src: string; scroll?: boolean; className?: string }) {
  return (
    <div className={`wgPause ${className}`}>
      <div className="relative overflow-hidden rounded-[2.4rem] border-[7px] border-[#15161a] bg-black shadow-[0_30px_70px_-25px_rgba(12,74,115,0.45)]">
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-[500px] w-[244px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="Care Partners on mobile" loading="lazy" decoding="async" className={`block w-full ${scroll ? "wgDeckP" : ""}`} />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  HERO — reused, locked.                                             */
/* ================================================================== */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070707] pt-16 text-white">
      <div
        className="absolute inset-x-0 top-0 h-[520px] opacity-25 blur-3xl"
        style={{ background: `radial-gradient(circle at 72% 24%, ${project.accent}, transparent 42%)` }}
      />
      <div className="container-wide relative z-10 pb-16">
        <span className="mb-8 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45">
          <span>←</span> All Projects
        </span>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(420px,1.08fr)] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              {project.tag} · {project.year}
            </p>
            <h1 className="font-display text-[clamp(2.35rem,4.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">{project.name}</h1>
            <p className="mt-6 max-w-[560px] font-body text-base leading-relaxed text-white/62 md:text-lg">{project.summary}</p>
            <div className="mt-9 grid max-w-[660px] gap-6 border-t border-white/10 pt-7 md:grid-cols-3">
              {[
                ["Industry", project.industry],
                ["Platform", project.platform],
                ["Category", project.category],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{label}</p>
                  <p className="font-display text-sm font-bold leading-snug text-white/78">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 max-w-[660px]">
              <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Services</p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span key={service} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-display text-xs font-bold text-white/76">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ProjectHeroPreview src={heroPreview} alt="Care Partners Australia website" url="carepartnersau.com" scroll priority />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CASE STUDY (light-led)                                             */
/* ================================================================== */

export default function CaseStudyStage() {
  return (
    <main className="bg-white text-[#141414]">
      <style>{`
        @keyframes wgDeckP { 0%,8%{transform:translateY(0)} 92%,100%{transform:translateY(calc(-100% + 500px))} }
        .wgDeckP { animation: wgDeckP 24s ease-in-out infinite alternate; }
        .wgPause:hover .wgDeckP { animation-play-state: paused; }
        @keyframes wgMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wgMarquee { animation: wgMarquee 48s linear infinite; }
        .wgMarqueeWrap:hover .wgMarquee { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce){ .wgDeckP,.wgMarquee{ animation: none !important; } }
      `}</style>

      {/* HERO (locked, dark) */}
      <Hero />

      {/* 1 — OVERVIEW (white) ------------------------------------------ */}
      <section className="border-b border-black/8 py-16 md:py-20">
        <div className="container-wide">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <Kicker>Overview</Kicker>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.03em]">
                A clearer digital home for a multicultural care provider.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body text-lg leading-relaxed text-[#444]">{SCOPE}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-black/10 md:grid-cols-4">
            {[
              ["Year", "2024"],
              ["Sector", "NDIS · Disability"],
              ["Coverage", "NSW & VIC"],
              ["Scope", "15+ pages"],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.05} className={`p-6 ${i < 3 ? "border-r border-black/10" : ""} ${i < 2 ? "border-b border-black/10 md:border-b-0" : ""}`}>
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/35">{k}</p>
                <p className="mt-2 font-display text-lg font-bold tracking-[-0.01em]">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — THE STORY (soft grey) ------------------------------------- */}
      <section className="bg-[#f5f5f2] py-16 md:py-24">
        <div className="container-wide">
          <Reveal>
            <Kicker>The Story</Kicker>
            <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              From unclear to <span className="text-red-brand">unmistakably trusted</span>.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-brand font-display text-xs font-black text-white">{s.n}</span>
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">{s.kicker}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-[#555]">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — A CLEARER PATH / SERVICES (white) ------------------------- */}
      <section className="py-16 md:py-24">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Kicker>A Clearer Path</Kicker>
            <h2 className="mt-5 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              Every support, one tap away.
            </h2>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-[#555]">
              We mapped the site to how families actually search — surfacing the full range of supports with direct, confident
              pathways to enquiry.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {SERVICES.map((srv, i) => (
                <Reveal key={srv} delay={i * 0.04}>
                  <span className="rounded-full border border-black/12 bg-[#fafafa] px-4 py-2 font-display text-sm font-semibold text-[#333]">{srv}</span>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-black/10 shadow-[0_30px_70px_-35px_rgba(12,74,115,0.5)]">
              <div className="flex items-center gap-1.5 border-b border-black/8 bg-[#f3f3f1] px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 truncate rounded bg-white px-2.5 py-1 font-body text-[11px] text-black/40">carepartnersau.com/ndis</span>
              </div>
              <div className="relative aspect-[1440/900] w-full overflow-hidden bg-[#eee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${L}/care-partners-australia-ndis.jpg`} alt="Care Partners NDIS services page" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 — EVERY PAGE / MARQUEE (dark band) -------------------------- */}
      <section className="relative overflow-hidden bg-[#0b0b0d] py-16 text-white md:py-24">
        <div className="container-wide mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <Reveal>
            <Kicker light>The Whole Site</Kicker>
            <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.7rem,3vw,2.7rem)] font-bold leading-[1.08] tracking-[-0.02em]">
              Not just a homepage — every page rebuilt.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-body text-sm leading-relaxed text-white/55">
              Fifteen-plus pages across services, housing, allied health, and programs — each designed with the same clarity and
              calm.
            </p>
          </Reveal>
        </div>
        <div className="wgMarqueeWrap relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0b0b0d] to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0b0b0d] to-transparent md:w-32" />
          <div className="wgMarquee flex w-max gap-5">
            {[...PAGES, ...PAGES].map((p, i) => (
              <figure key={i} className="group relative shrink-0">
                <div className="relative h-[250px] w-[400px] overflow-hidden rounded-xl border border-white/10 bg-[#111] md:h-[300px] md:w-[480px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.label} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
                </div>
                <figcaption className="mt-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45">{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — MOBILE (white, hero moment) ------------------------------- */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${CPA_NAVY}22, transparent 60%)` }}
        />
        <div className="container-wide relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center">Mobile First</Kicker>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.02em]">
                Calm and fast, right in their hand.
              </h2>
              <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-[#555]">
                Most families arrive on a phone. Light, legible pages that load fast and feel effortless — wherever they open.
              </p>
            </Reveal>
          </div>

          {/* phone trio */}
          <Reveal delay={0.1}>
            <div className="mt-14 flex items-center justify-center">
              <PhoneDeck src={`${L}/care-partners-australia-allied-health-mobile.jpg`} className="hidden translate-x-10 translate-y-6 rotate-[-7deg] scale-[0.82] opacity-90 lg:block" />
              <PhoneDeck src={`${L}/care-partners-australia-homepage-mobile.jpg`} scroll className="relative z-10" />
              <PhoneDeck src={`${L}/care-partners-australia-ndis-mobile.jpg`} className="hidden -translate-x-10 translate-y-6 rotate-[7deg] scale-[0.82] opacity-90 lg:block" />
            </div>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Accessible", "Readable contrast and clear structure throughout."],
              ["Fast", "A lightweight custom build, not a heavy template."],
              ["Effortless to update", "The team manages content without a developer."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06} className="rounded-xl border border-black/8 bg-[#fafafa] p-5">
                <p className="font-display text-sm font-bold">{t}</p>
                <p className="mt-1.5 font-body text-[13px] leading-relaxed text-[#666]">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — RESULT + CTA (dark, bookend) ------------------------------ */}
      <section className="relative overflow-hidden bg-[#070707] py-24 text-white md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] opacity-35 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 100%, ${project.accent}, transparent 55%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-[320px] w-[320px] rounded-full opacity-20 blur-[120px]"
          style={{ background: `radial-gradient(circle, ${CPA_ORANGE}, transparent 60%)` }}
        />
        <div className="container-wide relative text-center">
          <Reveal>
            <Kicker light className="justify-center">The Result</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              A digital home as trusted as the care behind it.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://carepartnersau.com"
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
    </main>
  );
}
