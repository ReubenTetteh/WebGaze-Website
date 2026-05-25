"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Brand tokens for this case study                                          */
/* -------------------------------------------------------------------------- */

const GOLD = "#D8A21D";
const GOLD_SOFT = "#F2C14E";
const GREEN = "#1E7A4D"; // Ghana flag green accent
const INK = "#0b0a08";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const META = [
  ["Client", "Australian Ghanaian Chamber of Commerce"],
  ["Sector", "Bilateral trade & investment"],
  ["Year", "2024"],
  ["Platform", "WordPress"],
  ["Scope", "Web design · WordPress build · Content architecture · Brand presentation"],
];

const NARRATIVE = [
  {
    count: "01",
    label: "The Challenge",
    title: "Speak to two markets with one voice.",
    body: "A chamber that bridges Ghana and Australia has to feel credible to investors, members, diplomats and trade partners on both sides at once. The brief was a presence that reads as an authoritative institution — not a community page.",
    image: "/portfolio/agcci-temp/home-hero.png",
    object: "object-top",
  },
  {
    count: "02",
    label: "Our Approach",
    title: "An editorial structure built on trust.",
    body: "We led with the people and the partnership, then organised everything else into a clear hierarchy — about, service areas, membership, news. Confident spacing and a restrained gold-on-ink palette give the organisation the weight it deserves.",
    image: "/portfolio/agcci-temp/about-full.png",
    object: "object-top",
  },
  {
    count: "03",
    label: "The Outcome",
    title: "A platform stakeholders take seriously.",
    body: "AGCCI now has a flexible WordPress home that supports advocacy, events, membership and business development — a site that frames the chamber as a serious connector between two economies.",
    image: "/portfolio/agcci-temp/services-full.png",
    object: "object-top",
  },
];

const SERVICES = [
  {
    tag: "Pillar 01",
    title: "Business Development",
    body: "Capacity building, partner attraction and trade workshops that help members compete in the bilateral space.",
    icon: "growth",
  },
  {
    tag: "Pillar 02",
    title: "Advocacy",
    body: "Representing member interests to government and industry stakeholders across both markets through policy dialogue.",
    icon: "shield",
  },
  {
    tag: "Pillar 03",
    title: "Risk Advice",
    body: "Background checks, due diligence and ethical-practice guidance that safeguard investments on either side.",
    icon: "scale",
  },
  {
    tag: "Pillar 04",
    title: "Networking",
    body: "Trade fairs, expos and direct introductions that turn a chamber membership into real business connections.",
    icon: "link",
  },
  {
    tag: "Pillar 05",
    title: "Technology Exchange",
    body: "Promoting transfer of technology and industry know-how to lift the capability of members in both economies.",
    icon: "spark",
  },
];

const STATS = [
  { value: 2, suffix: "", label: "Connected markets — Australia & Ghana" },
  { value: 5, suffix: "", label: "Service pillars structured on the site" },
  { value: 2, suffix: "", label: "International offices, Liverpool & Accra" },
  { value: 100, suffix: "%", label: "Member-focused content architecture" },
];

const RESULTS = [
  "A more professional platform for members, partners and stakeholders.",
  "A clearer story across about, services, membership and events.",
  "A flexible WordPress foundation the team can grow and update.",
];

const PREVIEWS = [
  { key: "home", label: "Home", src: "/portfolio/agcci-temp/home-full.png" },
  { key: "about", label: "About Us", src: "/portfolio/agcci-temp/about-full.png" },
  { key: "services", label: "Service Areas", src: "/portfolio/agcci-temp/services-full.png" },
  { key: "membership", label: "Membership", src: "/portfolio/agcci-temp/membership-full.png" },
];

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

function ServiceIcon({ name }: { name: string }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "growth":
      return (
        <svg {...common}>
          <path d="M3 17l5-5 4 4 8-8" />
          <path d="M16 4h4v4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
          <path d="M9.5 12l1.8 1.8 3.5-3.6" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 7l-2.5 5h5L5 7zM19 7l-2.5 5h5L19 7z" />
          <path d="M8 21h8" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M9 12h6" />
          <path d="M10 7H7a5 5 0 000 10h3" />
          <path d="M14 7h3a5 5 0 010 10h-3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      );
  }
}

/* -------------------------------------------------------------------------- */
/*  Animated counter                                                          */
/* -------------------------------------------------------------------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hover-scroll browser preview                                              */
/* -------------------------------------------------------------------------- */

function BrowserPreview({
  src,
  alt,
  url,
  priority = false,
  ratio = "aspect-[16/10]",
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  ratio?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[10px] border border-white/10 bg-[#121110] shadow-[0_40px_110px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.04] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-body text-xs text-white/35">{url}</span>
      </div>
      <div className={`relative overflow-hidden ${ratio}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-top transition-transform duration-[3200ms] ease-in-out group-hover:-translate-y-[58%]"
        />
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur transition duration-300 group-hover:opacity-0">
          Hover to scroll
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Service slider                                                            */
/* -------------------------------------------------------------------------- */

function ServiceSlider() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = SERVICES.length;

  const go = (next: number) => {
    setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
    setIndex((next + count) % count);
  };

  // auto-advance, pause on hover
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, 4800);
    return () => clearInterval(t);
  }, [paused, count]);

  const active = SERVICES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-[16px] border border-white/10 bg-gradient-to-br from-[#16140f] to-[#0c0b08]"
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD}, transparent 65%)` }}
      />

      <div className="relative grid min-h-[340px] gap-6 p-7 md:grid-cols-[1.15fr_1fr] md:p-12">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -48 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col justify-center"
          >
            <span
              className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ borderColor: `${GOLD}55`, color: GOLD_SOFT }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
              {active.tag}
            </span>
            <h3 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
              {active.title}
            </h3>
            <p className="mt-5 max-w-[460px] font-body text-base leading-relaxed text-white/55">
              {active.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* visual panel */}
        <div className="relative hidden items-center justify-center md:flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative flex h-44 w-44 items-center justify-center rounded-[24px] border border-white/10"
              style={{
                background: `linear-gradient(150deg, ${GOLD}22, transparent)`,
                color: GOLD_SOFT,
              }}
            >
              <div className="scale-[2.4]">
                <ServiceIcon name={active.icon} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* controls */}
      <div className="relative flex items-center justify-between border-t border-white/[0.07] px-7 py-5 md:px-12">
        <div className="flex items-center gap-2.5">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to service ${i + 1}`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 30 : 10,
                background: i === index ? GOLD : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-xs font-bold tracking-[0.2em] text-white/35">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button
            aria-label="Previous"
            onClick={() => go(index - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={() => go(index + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Preview tabs                                                              */
/* -------------------------------------------------------------------------- */

function PreviewShowcase() {
  const [tab, setTab] = useState("home");
  const active = PREVIEWS.find((p) => p.key === tab) ?? PREVIEWS[0];

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2.5">
        {PREVIEWS.map((p) => (
          <button
            key={p.key}
            onClick={() => setTab(p.key)}
            className="rounded-full border px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.14em] transition"
            style={
              tab === p.key
                ? { borderColor: GOLD, background: `${GOLD}1a`, color: GOLD_SOFT }
                : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }
            }
          >
            {p.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <BrowserPreview
            src={active.src}
            alt={`AGCCI ${active.label} page`}
            url={`agcci.org.au${active.key === "home" ? "" : "/" + active.key}`}
            ratio="aspect-[16/9]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reveal helper                                                             */
/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AgcciCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-28 text-white md:pt-36"
        style={{ background: INK }}
      >
        <motion.div
          style={{ opacity: heroFade }}
          className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        >
          <div
            className="absolute -left-40 top-10 h-[460px] w-[460px] rounded-full opacity-30 blur-[120px]"
            style={{ background: GOLD }}
          />
          <div
            className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full opacity-20 blur-[120px]"
            style={{ background: GREEN }}
          />
        </motion.div>

        <div className="container-wide relative z-10 pb-20">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white md:mb-16"
          >
            <span>←</span> All Projects
          </Link>

          <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/60"
              >
                Australia <span style={{ color: GOLD_SOFT }}>⇄</span> Ghana · 2024
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                className="font-display text-[clamp(2.5rem,5vw,5.2rem)] font-bold leading-[1] tracking-[-0.04em]"
              >
                Australian Ghanaian
                <br />
                Chamber of{" "}
                <span style={{ color: GOLD_SOFT }}>Commerce</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="mt-7 max-w-[540px] font-body text-base leading-relaxed text-white/60 md:text-lg"
              >
                A polished chamber website built to communicate authority,
                membership value and cross-market opportunity between two
                economies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                className="mt-9 flex flex-wrap gap-2"
              >
                {["Web Design", "WordPress Build", "Content Structure", "Brand Presentation"].map(
                  (s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-display text-xs font-bold text-white/75"
                    >
                      {s}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              style={{ y: heroImgY }}
            >
              <BrowserPreview
                src="/portfolio/agcci-temp/home-full.png"
                alt="AGCCI website home page"
                url="agcci.org.au"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================== BRIEF ============================== */}
      <section className="bg-[#f4f1e8] py-20 text-[#13110c] md:py-28">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-end">
            <Reveal>
              <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                The Brief
              </p>
              <h2 className="max-w-[760px] font-display text-[clamp(2.3rem,4.6vw,5rem)] font-bold leading-[0.99] tracking-[-0.04em]">
                Give a bilateral chamber the weight of an institution.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-[560px] font-body text-lg leading-relaxed text-[#5b564a]">
                AGCCI needed more than a brochure site. It needed a structured
                presence that could carry advocacy, events, membership and
                business development — and feel equally credible in Accra and in
                Sydney.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16 grid border-t border-[#d8d1bf] md:grid-cols-5">
              {META.map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-[#d8d1bf] py-6 md:border-b-0 md:border-r md:pr-6 md:last:border-r-0"
                >
                  <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#928b78]">
                    {label}
                  </p>
                  <p className="max-w-[240px] font-display text-sm font-bold leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== NARRATIVE (sticky reel) ==================== */}
      <section className="py-20 text-white md:py-28" style={{ background: INK }}>
        <div className="container-wide grid gap-16 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
              The Story
            </p>
            <h2 className="font-display text-[clamp(2rem,3vw,3.4rem)] font-bold leading-[1.04]">
              From community page to credible connector.
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-white/55">
              Three moves shaped the redesign — anchor it in the partnership,
              structure it for clarity, and let it scale.
            </p>
            <div
              className="mt-10 hidden h-1 w-24 rounded-full lg:block"
              style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
            />
          </aside>

          <div className="space-y-12 md:space-y-20">
            {NARRATIVE.map((item, i) => (
              <Reveal key={item.count} delay={i * 0.05}>
                <article className="border-t border-white/10 pt-10">
                  <div className="grid gap-8 xl:grid-cols-[0.5fr_1fr] xl:items-center">
                    <div>
                      <p className="mb-7 font-display text-xs font-black tracking-[0.24em] text-white/22">
                        {item.count}
                      </p>
                      <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                        {item.label}
                      </p>
                      <h3 className="font-display text-[clamp(1.8rem,2.8vw,3rem)] font-bold leading-[1.05]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-[460px] font-body text-base leading-relaxed text-white/55">
                        {item.body}
                      </p>
                    </div>
                    <div className="group relative aspect-[16/10] overflow-hidden rounded-[12px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes="(max-width: 1280px) 100vw, 55vw"
                        className={`object-cover ${item.object} transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]`}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== SERVICE AREAS SLIDER ====================== */}
      <section className="bg-[#0e0d0a] py-20 text-white md:py-28">
        <div className="container-wide">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <Reveal>
              <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                Service Areas
              </p>
              <h2 className="font-display text-[clamp(2.2rem,4vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                Five pillars, one membership.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-[560px] font-body text-base leading-relaxed text-white/55">
                We turned the chamber&apos;s offer into a clear set of pillars
                members can scan in seconds. Glide through them below.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ServiceSlider />
          </Reveal>
        </div>
      </section>

      {/* ====================== WEBSITE PREVIEW TABS ====================== */}
      <section className="py-20 text-white md:py-28" style={{ background: INK }}>
        <div className="container-wide">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <Reveal>
              <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                Website Tour
              </p>
              <h2 className="font-display text-[clamp(2.2rem,4vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                Walk through the build.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-[560px] font-body text-base leading-relaxed text-white/55">
                Switch between key pages and hover any frame to scroll the full
                design — home, about, service areas and membership.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <PreviewShowcase />
          </Reveal>
        </div>
      </section>

      {/* ============================ STATS ============================== */}
      <section className="bg-[#f4f1e8] py-20 text-[#13110c] md:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="mb-12 max-w-[640px] font-display text-[clamp(1.6rem,2.6vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              A site built to carry the chamber across two markets.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[14px] bg-[#d8d1bf] sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-[#f4f1e8]">
                <div className="h-full p-8">
                  <p className="font-display text-[clamp(2.8rem,5vw,4.4rem)] font-black leading-none" style={{ color: GOLD }}>
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-4 font-body text-sm leading-relaxed text-[#5b564a]">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ RESULTS ============================ */}
      <section className="py-20 text-white md:py-28" style={{ background: INK }}>
        <div className="container-wide grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,4.6vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.04em]">
              Clearer story.
              <br />
              <span style={{ color: GOLD_SOFT }}>Stronger standing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-white/12">
              {RESULTS.map((text, i) => (
                <div
                  key={text}
                  className="grid grid-cols-[64px_1fr] gap-5 border-b border-white/12 py-6"
                >
                  <p className="font-display text-xs font-black tracking-[0.2em]" style={{ color: GOLD }}>
                    0{i + 1}
                  </p>
                  <p className="font-display text-xl font-bold leading-snug md:text-2xl">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
