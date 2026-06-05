"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { portfolioProjects } from "@/lib/projects";
import { faqs } from "@/lib/faqs";
import { Typewriter } from "@/components/sections/Typewriter";
import QuoteSheet from "@/components/ui/QuoteSheet";

/* ──────────────────────────────────────────────────────────────────────────
   Section model — drives both the scroll-spy chip and the morphing CTA.
   ────────────────────────────────────────────────────────────────────────── */

type SectionId =
  | "overview"
  | "services"
  | "work"
  | "process"
  | "proof"
  | "faq"
  | "talk";

type SectionDef = {
  id: SectionId;
  label: string;
  cta: { label: string; action: "next" | "openSheet" };
};

const SECTIONS: SectionDef[] = [
  { id: "overview", label: "Overview", cta: { label: "Explore", action: "next" } },
  { id: "services", label: "Services", cta: { label: "Our Work", action: "next" } },
  { id: "work", label: "Work", cta: { label: "Our Process", action: "next" } },
  { id: "process", label: "Process", cta: { label: "Reviews", action: "next" } },
  { id: "proof", label: "Proof", cta: { label: "FAQs", action: "next" } },
  { id: "faq", label: "FAQ", cta: { label: "Request Proposal", action: "openSheet" } },
  { id: "talk", label: "Talk", cta: { label: "Request Proposal", action: "openSheet" } },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;
const SPRING = { type: "spring", damping: 34, stiffness: 340 } as const;

/* ──────────────────────────────────────────────────────────────────────────
   Top page — picks scroll context (window vs phone-shell) and renders.
   ────────────────────────────────────────────────────────────────────────── */

export default function HomeV2() {
  const isMobile = useIsMobile();
  const phoneScrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when desktop phone-shell is active so the page behind
  // doesn't fight the phone's internal scroll.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    if (!isMobile) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMobile]);

  if (isMobile) {
    return <Experience scrollRoot={null} />;
  }
  return (
    <PhoneShell innerRef={phoneScrollRef}>
      <Experience scrollRoot={phoneScrollRef} />
    </PhoneShell>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Desktop phone shell — Apple-style hardware frame around the experience.
   ────────────────────────────────────────────────────────────────────────── */

function PhoneShell({
  innerRef,
  children,
}: {
  innerRef: RefObject<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#eeeef2_55%,_#d8d8df_100%)] px-6 py-8">
      {/* faint background label */}
      <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-[#0a0a0a]/40">
        WebGaze · Home v2 · Mobile Preview
      </div>

      <div
        className="relative"
        style={{ width: 393, height: "min(852px, calc(100dvh - 96px))" }}
      >
        {/* side buttons — silenced, mute, volume up/down, power */}
        <div className="pointer-events-none absolute -left-[3px] top-[110px] h-9 w-[3px] rounded-l-sm bg-[#2a2a2e]" />
        <div className="pointer-events-none absolute -left-[3px] top-[170px] h-14 w-[3px] rounded-l-sm bg-[#2a2a2e]" />
        <div className="pointer-events-none absolute -left-[3px] top-[230px] h-14 w-[3px] rounded-l-sm bg-[#2a2a2e]" />
        <div className="pointer-events-none absolute -right-[3px] top-[180px] h-24 w-[3px] rounded-r-sm bg-[#2a2a2e]" />

        {/* outer titanium ring */}
        <div
          className="relative h-full w-full rounded-[58px] p-[7px]"
          style={{
            background:
              "linear-gradient(145deg, #2a2a2e 0%, #131316 50%, #2a2a2e 100%)",
            boxShadow:
              "0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px #0a0a0c, inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* inner bezel + scroll surface */}
          <div className="relative h-full w-full overflow-hidden rounded-[51px] bg-white">
            <div
              ref={innerRef}
              className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-white"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Dynamic island — always dark, regardless of theme */}
              <div className="pointer-events-none sticky top-0 z-[60] flex h-0 justify-center">
                <div className="absolute top-[10px] h-[34px] w-[120px] rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Experience — sticky top bar + sections + bottom-sheet modal.
   ────────────────────────────────────────────────────────────────────────── */

function Experience({
  scrollRoot,
}: {
  scrollRoot: RefObject<HTMLDivElement> | null;
}) {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Cache refs to each section block so the IntersectionObserver can watch them.
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    overview: null,
    services: null,
    work: null,
    process: null,
    proof: null,
    faq: null,
    talk: null,
  });

  // Scroll-spy. Picks whichever section's centerline is closest to the
  // scroll-root's top — works the same for window scroll (mobile) and the
  // phone-shell's internal scroll (desktop).
  useEffect(() => {
    const root = scrollRoot?.current ?? null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = (visible[0].target as HTMLElement).dataset.section as SectionId;
        const idx = SECTIONS.findIndex((s) => s.id === id);
        if (idx >= 0) setActiveIdx(idx);
      },
      { root, threshold: [0.35, 0.55, 0.75], rootMargin: "-15% 0px -25% 0px" },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [scrollRoot]);

  const active = SECTIONS[activeIdx];

  const scrollToSection = (id: SectionId) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const handleCta = () => {
    if (active.cta.action === "openSheet") {
      setSheetOpen(true);
      return;
    }
    const next = SECTIONS[Math.min(activeIdx + 1, SECTIONS.length - 1)];
    scrollToSection(next.id);
  };

  // Lock the scroll root behind the sheet so users can't accidentally
  // dismiss it by flicking the page.
  useEffect(() => {
    const target = scrollRoot?.current ?? document.body;
    if (!sheetOpen) return;
    const prev = target.style.overflow;
    target.style.overflow = "hidden";
    return () => {
      target.style.overflow = prev;
    };
  }, [sheetOpen, scrollRoot]);

  const setSectionRef = (id: SectionId) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const shelled = scrollRoot !== null;

  return (
    <div className="relative isolate min-h-full w-full bg-[#fafafa] text-[#0a0a0a] font-body">
      <TopBar
        active={active}
        onCta={handleCta}
        onSectionTap={() => scrollToSection("overview")}
      />

      <HeroSec
        sectionRef={setSectionRef("overview")}
        onCta={() => scrollToSection("services")}
        onSeeWork={() => scrollToSection("work")}
        shelled={shelled}
      />
      <LogosBand />
      <ServicesSec sectionRef={setSectionRef("services")} />
      <WorkSec sectionRef={setSectionRef("work")} scrollRoot={scrollRoot} />
      <ProcessSec sectionRef={setSectionRef("process")} scrollRoot={scrollRoot} />
      <ProofSec sectionRef={setSectionRef("proof")} />
      <FaqSec sectionRef={setSectionRef("faq")} />
      <FinaleSec
        sectionRef={setSectionRef("talk")}
        onOpen={() => setSheetOpen(true)}
        shelled={shelled}
      />

      <QuoteSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        scrollRoot={scrollRoot}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Sticky top bar — glass blur · current section label · morphing CTA pill.
   ────────────────────────────────────────────────────────────────────────── */

function TopBar({
  active,
  onCta,
  onSectionTap,
}: {
  active: SectionDef;
  onCta: () => void;
  onSectionTap: () => void;
}) {
  const ctaIsBrand = active.cta.action === "openSheet";

  return (
    <header className="sticky top-0 z-50 px-3 pt-[46px]">
      <div className="relative mx-auto flex h-11 max-w-[360px] items-center justify-between rounded-full border border-black/8 bg-white/75 px-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <button
          type="button"
          onClick={onSectionTap}
          className="flex items-center gap-2 rounded-full px-2.5 py-1.5"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-red-brand text-[10px] font-black text-white">
            W
          </span>
          <span className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active.id}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="block font-display text-[12px] font-semibold tracking-[0.04em] text-[#0a0a0a]"
              >
                {active.label}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>

        <button
          type="button"
          onClick={onCta}
          aria-label={active.cta.label}
          className="relative overflow-hidden rounded-full px-3.5"
        >
          <motion.span
            initial={false}
            animate={{
              backgroundColor: ctaIsBrand ? "#E01B24" : "rgba(10,10,10,0.92)",
              color: "#ffffff",
            }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute inset-0 rounded-full"
          />
          <span className="relative flex h-8 items-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active.cta.label}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="block whitespace-nowrap font-display text-[12px] font-semibold tracking-[0.04em] text-white"
              >
                {active.cta.label}
                <span className="ml-1.5 inline-block">{ctaIsBrand ? "→" : "↓"}</span>
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Hero — Apple-style oversized type, slow ambient red glow, scroll hint.
   ────────────────────────────────────────────────────────────────────────── */

type SectionRef = (el: HTMLElement | null) => void;

function HeroSec(props: {
  sectionRef: SectionRef;
  onCta: () => void;
  onSeeWork: () => void;
  shelled: boolean;
}) {
    const reduce = useReducedMotion();
    return (
      <section
        ref={props.sectionRef}
        data-section="overview"
        className={`relative -mt-[88px] flex flex-col justify-end overflow-hidden bg-[#fafafa] px-6 pb-16 pt-[140px] ${
          props.shelled ? "min-h-full" : "min-h-[100svh]"
        }`}
      >
        {/* Ambient gradient — subtle red wash + warm bottom. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 60% at 50% 0%, rgba(224,27,36,0.10) 0%, rgba(224,27,36,0) 55%), radial-gradient(80% 50% at 50% 100%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 65%)",
          }}
        />
        {/* Slow rotating ring — quiet ambient detail. */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[40%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.06]"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "inset 0 0 80px rgba(224,27,36,0.10)" }}
          />
        )}

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-[#0a0a0a]"
            style={{ fontSize: "clamp(2.1rem, 9.5vw, 3.4rem)" }}
          >
            We build modern brands &amp; digital experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
            className="mt-5 font-display font-semibold tracking-[-0.015em] text-[#0a0a0a]/70"
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.8rem)" }}
          >
            Designed to <Typewriter />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: EASE }}
            className="mt-5 max-w-md font-body text-[0.95rem] leading-relaxed text-[#0a0a0a]/65"
          >
            A strategic web design, branding, and SEO studio creating clear,
            practical work that helps Australian businesses grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.48, ease: EASE }}
            className="mt-8 flex flex-col gap-3"
          >
            <button
              onClick={props.onCta}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-red-brand px-6 font-display text-sm font-semibold uppercase tracking-wide text-white transition active:scale-[0.97]"
            >
              Start a Project →
            </button>
            <button
              onClick={props.onSeeWork}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/15 px-6 font-display text-sm font-semibold uppercase tracking-wide text-[#0a0a0a] transition active:scale-[0.97]"
            >
              See Our Work
            </button>
          </motion.div>
        </div>
      </section>
    );
}

/* ──────────────────────────────────────────────────────────────────────────
   Logos band — white shelf emerging from the hero, scrolling client marks.
   ────────────────────────────────────────────────────────────────────────── */

const CLIENT_LOGOS = [
  { src: "/clients/care-partners-australia.png", alt: "Care Partners Australia" },
  { src: "/clients/agcci.png", alt: "Australian Ghanaian Chamber of Commerce" },
  { src: "/clients/salaka-dance-ensemble.png", alt: "Salaka Dance Ensemble" },
  { src: "/clients/viride-energy-africa.png", alt: "Viride Energy Africa" },
  { src: "/clients/camden-tyre-recycle.png", alt: "Camden Tyre Recycle" },
];

function LogosBand() {
  // duplicated set for a seamless horizontal scroll
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="relative z-10 -mt-6 overflow-hidden rounded-t-[2rem] bg-white py-5">
      <div className="px-5">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6b6b]">
          Trusted by organisations across Australia
        </p>
      </div>
      <div
        className="relative mt-4 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="flex w-max items-center gap-10 px-6 animate-[logos-scroll_28s_linear_infinite]">
          {track.map((l, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary-ratio client logos
            <img
              key={`${l.alt}-${i}`}
              src={l.src}
              alt={l.alt}
              className="h-7 w-auto max-w-[140px] shrink-0 object-contain opacity-80"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes logos-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Services — horizontal snap carousel of Apple-feature-card style tiles.
   ────────────────────────────────────────────────────────────────────────── */

type Service = {
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  href: string;
  tint: string;
};

const SERVICES: Service[] = [
  {
    eyebrow: "01 · Web",
    title: "Web Design & Development",
    body: "We design and build websites that work for your business — carefully designed to help your brand stand out, perform well online, and connect with the right audience.",
    tags: ["React.js", "E-commerce", "WordPress"],
    href: "/services/website-design",
    tint: "from-[#E01B24] via-[#7a0d12] to-black",
  },
  {
    eyebrow: "02 · Brand",
    title: "Visual Branding",
    body: "Cohesive brand visuals — from logos to colour systems — that help your business stand out, stay consistent, and connect with the right audience.",
    tags: ["Graphic design", "Logo design", "Brand guide"],
    href: "/services/visual-branding",
    tint: "from-[#1c1c1c] via-[#0c0c0c] to-black",
  },
  {
    eyebrow: "03 · Care",
    title: "Website Maintenance",
    body: "Every website needs ongoing maintenance to stay secure, fast, and up to date. Regular care prevents issues and keeps the experience smooth.",
    tags: ["Security", "Updates", "Backups"],
    href: "/services/maintenance",
    tint: "from-[#252a45] via-[#0e1024] to-black",
  },
  {
    eyebrow: "04 · Search",
    title: "Search Engine Optimisation",
    body: "A strong SEO strategy helps your website get found by the right people — improving visibility, attracting relevant traffic, and supporting a smooth user experience.",
    tags: ["On-page SEO", "Keyword research", "Analytics"],
    href: "/services/seo",
    tint: "from-[#0b3d2e] via-[#062117] to-black",
  },
  {
    eyebrow: "05 · Audit",
    title: "Consulting & Audit",
    body: "Understand what's working and what needs improvement. We review your site's performance, security, design, and SEO — then map a clear path forward.",
    tags: ["SEO audit", "Security audit", "UI/UX audit"],
    href: "/services/consulting",
    tint: "from-[#3d260b] via-[#1c0f04] to-black",
  },
];

function ServicesSec({ sectionRef }: { sectionRef: SectionRef }) {
  return (
    <section
      ref={sectionRef}
      data-section="services"
      className="relative bg-[#f4f4f6] pt-20 pb-16"
    >
      <div className="px-6">
        <span className="label-tag">What we do</span>
        <h2
          className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
        >
          Everything you need to build a strong online presence.
        </h2>
        <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
          From strategy and design to optimisation and ongoing support — our
          services work together to help your business grow online.
        </p>
      </div>

      <div
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6"
        style={{ scrollbarWidth: "none" }}
      >
        {SERVICES.map((s) => (
          <article
            key={s.title}
            className={`relative flex aspect-[4/5] w-[82%] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-b ${s.tint} p-6`}
            style={{
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              {s.eyebrow}
            </div>

            <div>
              <h3
                className="font-display font-bold leading-[1.08] tracking-[-0.025em] text-white"
                style={{ fontSize: "clamp(1.25rem, 5.2vw, 1.5rem)" }}
              >
                {s.title}
              </h3>
              <p className="mt-3 font-body text-[13px] leading-[1.55] text-white/75">
                {s.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={s.href}
                className="mt-5 inline-flex items-center gap-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white"
              >
                Learn more →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="px-6 pt-2 font-display text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/45">
        Swipe to explore →
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Selected Work — vertical project stack with parallaxed image reveals.
   ────────────────────────────────────────────────────────────────────────── */

function WorkSec(props: {
  sectionRef: SectionRef;
  scrollRoot: RefObject<HTMLDivElement> | null;
}) {
  const featured = useMemo(
    () => portfolioProjects.filter((p) => p.featured || p.fullPage).slice(0, 4),
    [],
  );
  return (
    <section
      ref={props.sectionRef}
      data-section="work"
      className="relative bg-[#fafafa] pt-24 pb-12"
    >
      <div className="px-6">
        <span className="label-tag">Selected work</span>
        <h2
          className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
        >
          Real outcomes for real businesses.
        </h2>
        <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
          A selection of recent work — built with strategy, clarity, and craft.
        </p>
      </div>

      <div className="mt-10 space-y-6 px-6">
        {featured.map((p, i) => (
          <WorkCard key={p.slug} project={p} index={i} scrollRoot={props.scrollRoot} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  scrollRoot,
}: {
  project: (typeof portfolioProjects)[number];
  index: number;
  scrollRoot: RefObject<HTMLDivElement> | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: scrollRoot ?? undefined,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 * (index % 3) }}
      className="relative overflow-hidden rounded-[26px] border border-black/8 bg-white"
      style={{
        boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
      }}
    >
      {/* Tinted accent rim — uses the project's own brand colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: project.accent }}
      />
      <div className="relative aspect-[5/3] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1023px) 100vw, 390px"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4">
          <span
            className="rounded-full px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
            style={{ background: `${project.accent}33`, border: `1px solid ${project.accent}55` }}
          >
            {project.tag}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3
          className="font-display font-bold leading-[1.1] tracking-[-0.02em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.1rem, 5vw, 1.35rem)" }}
        >
          {project.name}
        </h3>
        <p className="mt-2 font-body text-[13.5px] leading-[1.55] text-[#0a0a0a]/60">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full border border-black/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]/65"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Process — pinned vertical timeline with scroll-driven highlight.
   ────────────────────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Understanding",
    short: "We listen before we act.",
    body: "We get clear on your goals, your audience, and the context around the work — defining what success looks like before a single pixel moves.",
    tags: ["Kickoff Call", "Goals", "Research"],
  },
  {
    num: "02",
    title: "Direction & Planning",
    short: "We map the path forward.",
    body: "With the picture in place, we set scope, priorities, and the practical steps to move — keeping everything aligned, realistic, and built for results.",
    tags: ["Scope", "Sitemap", "Timeline"],
  },
  {
    num: "03",
    title: "Development & Refinement",
    short: "We build and iterate.",
    body: "Design, content, and systems are shaped through an iterative loop — focused on quality, consistency, and purpose at every stage.",
    tags: ["Design", "Build", "Feedback"],
  },
  {
    num: "04",
    title: "Delivery & Implementation",
    short: "We launch with confidence.",
    body: "We bring it together, run final checks, and hand over a site that's complete and ready to perform — with support so nothing slips.",
    tags: ["QA", "Launch", "Handover"],
  },
];

function ProcessSec(props: {
  sectionRef: SectionRef;
  scrollRoot: RefObject<HTMLDivElement> | null;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    container: props.scrollRoot ?? undefined,
    offset: ["start end", "end start"],
  });
  const fill = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
  return (
    <section
      ref={props.sectionRef}
      data-section="process"
      className="relative bg-[#f4f4f6] pt-24 pb-20"
    >
      <div className="px-6">
        <span className="label-tag">How we work</span>
        <h2
          className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
        >
          A process built for clarity, not chaos.
        </h2>
        <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
          From the first conversation to final delivery, every step is
          intentional — keeping you informed, on time, and confident in the
          outcome.
        </p>
      </div>

      <div ref={wrapRef} className="relative mt-12 px-6">
        {/* Rail */}
        <div className="absolute left-[34px] top-3 bottom-3 w-px bg-black/10" />
        <motion.div
          className="absolute left-[34px] top-3 w-px bg-red-brand"
          style={{ height: fill }}
        />

        <ul className="space-y-10">
          {PROCESS_STEPS.map((s, i) => (
            <motion.li
              key={s.num}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="relative flex gap-5 pl-2"
            >
              <span className="relative z-10 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-red-brand font-display text-[11px] font-bold text-white">
                {s.num}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[1.05rem] font-bold leading-tight tracking-[-0.02em] text-[#0a0a0a]">
                  {s.title}
                </h3>
                <p className="mt-1 font-display text-[13px] font-medium text-red-brand">
                  {s.short}
                </p>
                <p className="mt-3 font-body text-[13px] leading-[1.55] text-[#0a0a0a]/65">
                  {s.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Proof — auto-rotating client testimonial card.
   ────────────────────────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    quote:
      "WebGaze completely transformed how we show up online. The website is clean, fast, and we're already getting more enquiries.",
    name: "Care Partners Australia",
    role: "NDIS Service Provider",
  },
  {
    quote:
      "From logo to website, everything came together exactly as we envisioned. They communicated well and delivered work we're proud of.",
    name: "Australian Ghanaian Chamber of Commerce",
    role: "Commerce & Trade",
  },
  {
    quote:
      "The level of craft and attention to detail was impressive. Our brand now feels cohesive across every touchpoint.",
    name: "WINSTAMAC",
    role: "Brand & Product",
  },
];

function ProofSec({ sectionRef }: { sectionRef: SectionRef }) {
    const [i, setI] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setI((n) => (n + 1) % TESTIMONIALS.length), 5500);
      return () => clearInterval(id);
    }, []);
    const t = TESTIMONIALS[i];
    return (
      <section
        ref={sectionRef}
        data-section="proof"
        className="relative overflow-hidden bg-[#fafafa] pt-24 pb-16"
      >
        <div className="px-6">
          <span className="label-tag">Testimonials</span>
          <h2
            className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
            style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
          >
            What clients think.
          </h2>
        </div>

        <div className="relative mx-6 mt-10 min-h-[260px] overflow-hidden rounded-[26px] border border-black/8 bg-gradient-to-b from-[#0f0f12] to-[#050507] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <span className="font-display text-5xl leading-none text-red-brand">&ldquo;</span>
              <p className="mt-3 font-display text-[1.05rem] leading-[1.45] tracking-[-0.012em] text-white/85">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                <p className="font-body text-[12px] text-white/45">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 right-5 flex gap-1.5">
            {TESTIMONIALS.map((_, n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                aria-label={`Testimonial ${n + 1}`}
                className={`h-1 rounded-full transition-all ${
                  n === i ? "w-6 bg-white" : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
}

/* ──────────────────────────────────────────────────────────────────────────
   FAQ — tap-to-expand accordion using shared faqs source.
   ────────────────────────────────────────────────────────────────────────── */

function FaqSec({ sectionRef }: { sectionRef: SectionRef }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <section
      ref={sectionRef}
      data-section="faq"
      className="relative bg-[#f4f4f6] pt-24 pb-20"
    >
      <div className="px-6">
        <span className="label-tag">FAQ</span>
        <h2
          className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
        >
          Questions, answered.
        </h2>
        <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
          Can&apos;t find the answer you&apos;re looking for? Reach out directly
          — we&apos;re happy to help.
        </p>
      </div>

      <ul className="mt-9 px-6">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li
              key={f.q}
              className="border-t border-black/10 last:border-b last:border-black/10"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 py-4 text-left"
              >
                <span className="font-display text-[15px] font-semibold leading-snug text-[#0a0a0a]">
                  {f.q}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-black/20 text-[#0a0a0a]"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-9 font-body text-[13.5px] leading-relaxed text-[#0a0a0a]/65">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 px-6">
        <a
          href="mailto:hello@webgaze.com.au"
          className="inline-flex h-12 items-center justify-center rounded-full border border-black/20 px-6 font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a0a0a]"
        >
          Email Us
        </a>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Finale — last push. Big editorial close, opens modal.
   ────────────────────────────────────────────────────────────────────────── */

function FinaleSec(props: {
  sectionRef: SectionRef;
  onOpen: () => void;
  shelled: boolean;
}) {
    return (
      <section
        ref={props.sectionRef}
        data-section="talk"
        className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-black via-[#15050a] to-[#3a060c] px-6 pt-24 pb-12 ${
          props.shelled ? "min-h-full" : "min-h-[90svh]"
        }`}
      >
        <div>
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-red-brand">
            No pressure. Just next steps.
          </p>
          <h2
            className="mt-5 font-display font-bold leading-[0.98] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(2.5rem, 12vw, 3.6rem)" }}
          >
            Let&apos;s get
            <br />
            started.
          </h2>
          <p className="mt-6 font-display font-medium text-[1.05rem] leading-snug text-white/55">
            Tell us where you are and where you&apos;re headed.{" "}
            <span className="text-white">
              We&apos;ll handle the strategy, design, and build.
            </span>
          </p>
        </div>

        <div className="mt-10 space-y-3">
          <button
            onClick={props.onOpen}
            className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-red-brand px-7 font-display text-sm font-bold uppercase tracking-[0.14em] text-white transition active:scale-[0.98]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Request a Proposal <span className="text-base">→</span>
            </span>
          </button>
          <a
            href="mailto:hello@webgaze.com.au"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 px-7 font-display text-sm font-bold uppercase tracking-[0.14em] text-white"
          >
            Email Us
          </a>
          <p className="pt-2 text-center font-body text-[11px] text-white/40">
            We typically respond within 1 business day.
          </p>
          <p className="pt-3 text-center font-display text-[10px] uppercase tracking-[0.25em] text-white/30">
            © WebGaze · Sydney
          </p>
        </div>
      </section>
    );
}

