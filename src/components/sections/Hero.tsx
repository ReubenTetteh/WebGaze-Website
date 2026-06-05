"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "./Typewriter";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileHero from "./MobileHero";

/* ──────────────────────────────────────────────────────────
   Geometric brand artwork — concentric arcs, circles, grid
   ────────────────────────────────────────────────────────── */
function GeometricBg() {
  return (
    <motion.svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 top-0 h-full w-auto max-w-[55%] opacity-[0.18] pointer-events-none select-none"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 0.18, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Grid lines */}
      <line x1="200" y1="0" x2="200" y2="800" stroke="#ffffff" strokeWidth="0.5" />
      <line x1="400" y1="0" x2="400" y2="800" stroke="#ffffff" strokeWidth="0.5" />
      <line x1="0" y1="200" x2="800" y2="200" stroke="#ffffff" strokeWidth="0.5" />
      <line x1="0" y1="400" x2="800" y2="400" stroke="#ffffff" strokeWidth="0.5" />
      <line x1="0" y1="600" x2="800" y2="600" stroke="#ffffff" strokeWidth="0.5" />

      {/* Concentric arcs — top */}
      {[30, 55, 80, 105, 130, 155, 180].map((r, i) => (
        <motion.path
          key={`arc-tl-${i}`}
          d={`M ${200 - r} 400 A ${r} ${r} 0 0 1 ${200 + r} 400`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.2 + i * 0.04, ease: "easeOut" }}
        />
      ))}

      {/* Concentric arcs — bottom */}
      {[30, 55, 80, 105, 130, 155, 180, 205].map((r, i) => (
        <motion.path
          key={`arc-bl-${i}`}
          d={`M ${200 - r} 600 A ${r} ${r} 0 0 0 ${200 + r} 600`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.4 + i * 0.04, ease: "easeOut" }}
        />
      ))}

      {/* Slowly rotating outer ring — quiet ambient motion */}
      <motion.g
        style={{ transformOrigin: "400px 400px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="400" cy="400" r="380" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.5" />
        <circle cx="400" cy="400" r="280" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 8" />
      </motion.g>

      <circle cx="200" cy="200" r="160" fill="none" stroke="#ffffff" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#ffffff" strokeWidth="0.4" />

      {/* Filled accents — one sparing red wedge, the rest neutral */}
      <path d="M 200 200 L 400 200 A 200 200 0 0 1 200 400 Z" fill="#E01B24" opacity="0.55" />
      <path d="M 0 400 L 200 400 A 200 200 0 0 0 0 600 Z" fill="#ffffff" opacity="0.16" />
    </motion.svg>
  );
}

/* ──────────────────────────────────────────────────────────
   Hero
   ────────────────────────────────────────────────────────── */
export default function Hero() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  // Phones get a bespoke hero; the desktop layout below is left exactly as-is.
  if (isMobile) {
    return <MobileHero />;
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-dark-bg text-[#fafafa]">
      {/* Geometric brand artwork */}
      <GeometricBg />

      {/* Ambient red glow — anchored bottom-right, kept subtle */}
      <div className="absolute -bottom-40 -right-40 w-[720px] h-[720px] bg-red-brand/[0.06] blur-[160px] rounded-full pointer-events-none" />

      {/* Main content — right-aligned, kept within the container edge */}
      {/* w-full is required: this div is a flex item of the `flex flex-col` section,
          and container-wide's mx-auto would otherwise cancel the cross-axis stretch
          and shrink it to its content width, pulling the block off the site's right edge. */}
      <div className="container-wide w-full relative z-10 flex-1 flex flex-col justify-center items-end text-right pt-32 pb-12">
          {/* Headline — static brand statement */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display font-bold leading-[1.05] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(1.85rem, 4.5vw, 4.4rem)" }}
          >
            <span className="block">We build modern brands</span>
            <span className="block">and digital experiences</span>
          </motion.h1>

          {/* Rotating tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="mt-6 font-display font-semibold tracking-[-0.015em] text-white/70"
            style={{ fontSize: "clamp(1.3rem, 2.8vw, 2.8rem)" }}
          >
            Designed to <Typewriter />
          </motion.p>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-9 ml-auto max-w-xl text-left font-body text-base md:text-lg text-white/65 leading-relaxed"
          >
            A strategic web design, branding, and SEO studio creating clear, practical work
            that helps Australian businesses grow.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex flex-col items-end sm:flex-row sm:justify-end gap-4"
          >
            <Link href="/request-a-quote" className="btn-primary justify-center">
              Start a Project →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 border border-[#444] text-[#fafafa] font-display font-semibold
                         px-7 py-3.5 text-sm tracking-wide uppercase rounded-full
                         hover:border-red-brand hover:text-red-brand transition-all duration-300"
            >
              See Our Work
            </Link>
          </motion.div>
      </div>

      {/* Scroll cue — sits above the logo shelf that overlaps the hero base */}
      {!reduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-white/40"
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
