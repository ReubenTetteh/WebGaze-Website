"use client";
// Mobile-only hero — left-aligned, full-height, app-like. Desktop hero
// (right-aligned, geometric artwork) is left untouched in Hero.tsx.
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "./Typewriter";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* Ambient brand rings, tucked into the top-right corner. */
function CornerRings({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 select-none opacity-50"
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.5, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {/* slowly rotating dotted ring */}
      <motion.circle
        cx="100"
        cy="100"
        r="94"
        fill="none"
        stroke="#E01B24"
        strokeWidth="1"
        strokeDasharray="1 7"
        style={{ transformOrigin: "100px 100px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="100" cy="100" r="72" fill="none" stroke="#E01B24" strokeWidth="0.6" opacity="0.6" />
      {/* concentric arcs */}
      {[34, 50, 66].map((r, i) => (
        <path
          key={i}
          d={`M ${100 - r} 100 A ${r} ${r} 0 0 1 ${100 + r} 100`}
          fill="none"
          stroke="#E01B24"
          strokeWidth="1.2"
        />
      ))}
      {/* filled quarter accent */}
      <path d="M 100 100 L 166 100 A 66 66 0 0 1 100 166 Z" fill="#E01B24" opacity="0.85" />
    </motion.svg>
  );
}

export default function MobileHero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-dark-bg text-[#fafafa]">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* ambient red glows */}
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-red-brand/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-red-brand/10 blur-[130px]" />

      <CornerRings reduce={reduce} />

      {/* content */}
      <div className="container-wide relative z-10 flex flex-1 flex-col justify-center pb-12 pt-28">
        {/* status pill */}
        <motion.div
          {...rise(0.15)}
          className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-brand opacity-60" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-brand" />
          </span>
          <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/70">
            Sydney Digital Agency · Est. 2019
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          {...rise(0.3)}
          className="font-display font-bold leading-[1.04] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(2.1rem, 9.5vw, 3.4rem)" }}
        >
          We build modern brands &amp; digital experiences
        </motion.h1>

        {/* rotating tagline */}
        <motion.p
          {...rise(0.45)}
          className="mt-5 font-display font-semibold tracking-[-0.015em] text-white/70"
          style={{ fontSize: "clamp(1.25rem, 5vw, 1.8rem)" }}
        >
          Designed to <Typewriter />
        </motion.p>

        {/* sub */}
        <motion.p
          {...rise(0.58)}
          className="mt-5 max-w-md font-body text-[0.95rem] leading-relaxed text-white/60"
        >
          A strategic web design, branding, and SEO studio creating clear,
          practical work that helps Australian businesses grow.
        </motion.p>

        {/* CTAs — full width, big tap targets */}
        <motion.div {...rise(0.72)} className="mt-9 flex flex-col gap-3">
          <Link href="/request-a-quote" className="btn-primary w-full justify-center">
            Start a Project →
          </Link>
          <Link
            href="/projects"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#444] px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-[#fafafa] transition-all duration-300 hover:border-red-brand hover:text-red-brand"
          >
            See Our Work
          </Link>
        </motion.div>
      </div>

      {/* scroll hint */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-white/40"
          >
            <span className="font-display text-[0.6rem] uppercase tracking-[0.2em]">
              Scroll
            </span>
            <span className="text-sm leading-none">↓</span>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
