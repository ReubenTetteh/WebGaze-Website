"use client";
// Mobile-only hero — refined, restraint-first. Desktop hero (right-aligned,
// geometric artwork) is left untouched in Hero.tsx.
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "./Typewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MobileHero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[80svh] flex-col overflow-hidden bg-dark-bg text-[#fafafa]">
      {/* One restrained ambient glow, anchored low-left so the top stays clean */}
      <div className="pointer-events-none absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-red-brand/[0.06] blur-[140px]" />

      <div className="container-wide relative z-10 flex flex-1 flex-col justify-center pb-10 pt-28">
        {/* Headline */}
        <motion.h1
          {...rise(0.12)}
          className="font-display font-semibold leading-[1.02] tracking-[-0.035em] text-white"
          style={{ fontSize: "clamp(2.55rem, 10.5vw, 3.7rem)" }}
        >
          We build modern brands &amp; digital experiences.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...rise(0.24)}
          className="mt-5 font-display font-medium tracking-[-0.01em] text-white/55"
          style={{ fontSize: "clamp(1.1rem, 4.4vw, 1.55rem)" }}
        >
          Designed to <Typewriter />
        </motion.p>

        {/* Sub */}
        <motion.p
          {...rise(0.36)}
          className="mt-6 max-w-[34ch] font-body text-[0.92rem] leading-[1.55] text-white/45"
        >
          Brands that hold their own.
          <br />
          Websites that pull their weight.
        </motion.p>

        {/* CTAs — compact primary + quiet text-link secondary */}
        <motion.div {...rise(0.48)} className="mt-8 flex items-center gap-5">
          <Link
            href="/request-a-quote"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-red-brand pl-4 pr-3.5 font-display text-[0.82rem] font-semibold text-white shadow-[0_8px_24px_rgba(224,27,36,0.26)] transition-colors hover:bg-red-dark"
          >
            Start a project
            <span aria-hidden className="text-sm leading-none">→</span>
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 font-display text-[0.82rem] font-medium text-white/60 transition-colors hover:text-white"
          >
            See our work
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
