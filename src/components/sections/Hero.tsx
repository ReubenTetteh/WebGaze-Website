"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    num: "01",
    label: "Web Design & Development",
    heading: ["We build websites", "that convert visitors", "into customers."],
    sub: "Custom-designed, high-performance websites that help your brand stand out and grow online.",
    cta: { primary: { text: "View Web Services", href: "/services" }, secondary: { text: "See Our Work", href: "/projects" } },
  },
  {
    num: "02",
    label: "Visual Branding",
    heading: ["Your brand.", "Unmistakable."],
    sub: "Cohesive brand identities that make your business look credible, consistent, and ready to scale.",
    cta: { primary: { text: "View Branding", href: "/services" }, secondary: { text: "See Our Work", href: "/projects" } },
  },
  {
    num: "03",
    label: "SEO & Growth",
    heading: ["Get found by", "the right people."],
    sub: "Strategic SEO that improves visibility, drives relevant traffic, and supports long-term growth.",
    cta: { primary: { text: "View SEO Services", href: "/services" }, secondary: { text: "See Our Work", href: "/projects" } },
  },
  {
    num: "04",
    label: "Australian Digital Agency",
    heading: ["We build modern brands", "and digital experiences", "designed to grow."],
    sub: "A strategic web design, branding, and digital agency creating clear, practical work that helps your business grow.",
    cta: { primary: { text: "Our Services", href: "/services" }, secondary: { text: "Request Proposal", href: "/request-a-quote" } },
  },
];

const SLIDE_DURATION = 5000;

const slideVariants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Geometric brand artwork — concentric arcs, circles and grid lines
function GeometricBg() {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 top-0 h-full w-auto max-w-[55%] opacity-[0.18] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Grid lines */}
      <line x1="200" y1="0" x2="200" y2="800" stroke="#E01B24" strokeWidth="0.5" />
      <line x1="400" y1="0" x2="400" y2="800" stroke="#E01B24" strokeWidth="0.5" />
      <line x1="0" y1="200" x2="800" y2="200" stroke="#E01B24" strokeWidth="0.5" />
      <line x1="0" y1="400" x2="800" y2="400" stroke="#E01B24" strokeWidth="0.5" />
      <line x1="0" y1="600" x2="800" y2="600" stroke="#E01B24" strokeWidth="0.5" />

      {/* Top-left large arc cluster — concentric arcs forming a U/arch shape */}
      {[30, 55, 80, 105, 130, 155, 180].map((r, i) => (
        <path
          key={`arc-tl-${i}`}
          d={`M ${200 - r} 400 A ${r} ${r} 0 0 1 ${200 + r} 400`}
          fill="none"
          stroke="#E01B24"
          strokeWidth="1.2"
        />
      ))}

      {/* Bottom arc cluster — reversed arcs */}
      {[30, 55, 80, 105, 130, 155, 180, 205].map((r, i) => (
        <path
          key={`arc-bl-${i}`}
          d={`M ${200 - r} 600 A ${r} ${r} 0 0 0 ${200 + r} 600`}
          fill="none"
          stroke="#E01B24"
          strokeWidth="1.2"
        />
      ))}

      {/* Top-left full circle outline */}
      <circle cx="200" cy="200" r="160" fill="none" stroke="#E01B24" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#E01B24" strokeWidth="0.4" />

      {/* Red filled half-circle top right quadrant */}
      <path d="M 200 200 L 400 200 A 200 200 0 0 1 200 400 Z" fill="#E01B24" opacity="0.9" />

      {/* Dark filled half-circle bottom left quadrant */}
      <path d="M 0 400 L 200 400 A 200 200 0 0 0 0 600 Z" fill="#333333" opacity="0.8" />

      {/* Large outer circle */}
      <circle cx="400" cy="400" r="380" fill="none" stroke="#E01B24" strokeWidth="0.4" opacity="0.5" />
      <circle cx="400" cy="400" r="280" fill="none" stroke="#E01B24" strokeWidth="0.4" opacity="0.4" />
    </svg>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goTo = (i: number) => {
    setCurrent(i);
    setProgress(0);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden bg-dark-bg text-[#fafafa]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Geometric brand artwork background */}
      <GeometricBg />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: "90px 90px",
        }}
      />

      {/* Top red accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-red-brand origin-left"
      />

      {/* Slide content — two-column grid, text always in right column */}
      <div className="container-wide relative z-10 flex-1 flex flex-col justify-center pt-32 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left col — intentionally empty; geometric SVG fills this space */}
          <div />

          {/* Right col — slide text */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Label */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="block w-8 h-[2px] bg-red-brand flex-shrink-0" />
                  <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
                    {slide.label}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-display font-bold leading-[1.06] tracking-[-0.04em] text-[clamp(2.2rem,4vw,4.8rem)] text-white mb-8">
                  {slide.heading.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h1>

                {/* Subtext */}
                <p className="text-base md:text-lg text-white/60 font-body max-w-md leading-relaxed mb-10">
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={slide.cta.secondary.href}
                    className="inline-flex items-center justify-center gap-2 border border-[#444] text-[#fafafa] font-display font-semibold
                               px-7 py-3.5 text-sm tracking-wide uppercase rounded-full
                               hover:border-red-brand hover:text-red-brand transition-all duration-300"
                  >
                    {slide.cta.secondary.text}
                  </Link>
                  <Link href={slide.cta.primary.href} className="btn-primary justify-center">
                    {slide.cta.primary.text}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-wide relative z-10 pb-8 flex items-end justify-between gap-6">
        {/* Slide nav */}
        <div className="flex items-center gap-5">
          <span className="font-display text-xs tracking-[0.2em] text-[#555]">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === current ? "32px" : "16px", background: "#333" }}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === current && (
                  <motion.div
                    className="absolute inset-0 bg-red-brand origin-left"
                    style={{ scaleX: progress / 100 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center text-[#666] hover:border-red-brand hover:text-red-brand transition-colors duration-200" aria-label="Previous slide">←</button>
            <button onClick={next} className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center text-[#666] hover:border-red-brand hover:text-red-brand transition-colors duration-200" aria-label="Next slide">→</button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-red-brand to-transparent"
          />
          <span className="text-[10px] font-display tracking-[0.22em] uppercase text-[#444]">Scroll</span>
        </div>
      </div>
    </section>
  );
}
