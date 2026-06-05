"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileTestimonials from "./MobileTestimonials";

const SLIDE_DURATION = 6000;

const testimonials = [
  {
    quote: "WebGaze completely transformed how we show up online. The website is clean, fast, and we're already getting more enquiries. They really understood what we needed.",
    name: "Care Partners Australia",
    role: "NDIS Service Provider",
    abbr: "CPA",
    logo: "/clients/care-partners-australia.png",
    dark: true,
  },
  {
    quote: "From logo to website, everything came together exactly as we envisioned. They communicated well throughout and delivered a result we're genuinely proud of.",
    name: "Australian Ghanaian Chamber of Commerce",
    role: "Commerce & Trade Organisation",
    abbr: "AGCCI",
    logo: "/clients/agcci.png",
    dark: false,
  },
  {
    quote: "The level of craft and attention to detail was impressive. Our brand now feels cohesive and professional across every touchpoint.",
    name: "WINSTAMAC",
    role: "Brand & Design",
    abbr: "WM",
    logo: undefined,
    dark: true,
  },
];

type TestimonialsProps = {
  variant?: "full" | "column";
};

export default function Testimonials({ variant = "full" }: TestimonialsProps) {
  // All hooks run unconditionally — keep the early `isMobile` return BELOW
  // them so hook order is stable across re-renders.
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
    setProgress(0);
  }, []);

  // Auto-advance, but pause while hovered/focused so visitors can read
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);
    return () => clearInterval(id);
  }, [next, paused]);

  const isMobile = useIsMobile();

  // Phones get the v2-style mobile card (dark on light bg). Desktop variants
  // below are left exactly as-is.
  if (isMobile) {
    return (
      <MobileTestimonials
        items={testimonials.map(({ quote, name, role }) => ({ quote, name, role }))}
      />
    );
  }

  const t = testimonials[current];

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
  };

  const progressBars = (
    <div className="flex items-center gap-2">
      {testimonials.map((_, i) => (
        <button
          key={i}
          onClick={() => { setCurrent(i); setProgress(0); }}
          className="relative h-[3px] rounded-full overflow-hidden flex-1 bg-[#ddd] dark:bg-[#333]"
          aria-label={`Go to testimonial ${i + 1}`}
        >
          {i < current && (
            <div className="absolute inset-0 bg-[#0f0f0f] dark:bg-white rounded-full" />
          )}
          {i === current && (
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#0f0f0f] dark:bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
          )}
        </button>
      ))}
    </div>
  );

  const cardInner = (
    <>
      {/* Brand mark — real logo on a white plate so the full-colour marks read
          on any card; falls back to a monogram when no logo asset exists. */}
      <div className="flex justify-center mb-5 md:mb-10">
        {t.logo ? (
          <div className="inline-flex h-11 md:h-16 items-center justify-center rounded-lg md:rounded-xl bg-white px-3.5 md:px-5">
            {/* eslint-disable-next-line @next/next/no-img-element -- client logos are arbitrary-ratio assets normalised by height */}
            <img
              src={t.logo}
              alt={t.name}
              loading="lazy"
              className="h-6 md:h-9 w-auto max-w-[110px] md:max-w-[150px] object-contain"
            />
          </div>
        ) : (
          <div className={`inline-flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-lg md:rounded-xl font-display font-black text-base md:text-xl tracking-tight ${
            t.dark
              ? "bg-white/10 text-white"
              : "bg-[#0f0f0f]/8 text-[#0f0f0f] dark:bg-white/10 dark:text-white"
          }`}>
            {t.abbr}
          </div>
        )}
      </div>

      {/* Quote */}
      <blockquote className={`font-body text-[0.95rem] md:text-2xl leading-[1.55] md:leading-[1.6] italic flex-1 ${
        t.dark ? "text-white/85" : "text-[#1a1a1a] dark:text-white/85"
      }`}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Name + role */}
      <div className={`mt-5 pt-4 md:mt-10 md:pt-7 border-t ${
        t.dark ? "border-white/10" : "border-[#0f0f0f]/10 dark:border-white/10"
      }`}>
        <p className={`font-display font-bold text-sm md:text-base ${t.dark ? "text-white" : "text-[#0f0f0f] dark:text-white"}`}>
          {t.name}
        </p>
        <p className={`font-body text-xs md:text-sm mt-0.5 md:mt-1 ${t.dark ? "text-white/50" : "text-[#777] dark:text-white/50"}`}>
          {t.role}
        </p>
      </div>
    </>
  );

  const cardShadow = t.dark
    ? "8px 12px 48px rgba(0,0,0,0.55), 2px 2px 0px rgba(255,255,255,0.04) inset"
    : "8px 12px 48px rgba(0,0,0,0.14), 2px 2px 0px rgba(255,255,255,0.8) inset";

  // ── Column layout — designed to sit beside the FAQ in a shared row ──
  if (variant === "column") {
    return (
      <div className="flex h-full flex-col" {...pauseHandlers}>
        <span className="label-tag">Testimonials</span>
        <h2 className="mt-5 font-display font-bold text-display-lg dark:text-white">
          What clients think.
        </h2>
        <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-light-muted dark:text-dark-muted">
          Real outcomes for real businesses — built with strategy, clarity, and craft.
        </p>

        {/* Rotating card */}
        <div className="relative mt-9 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.52, ease: [0.32, 0, 0.18, 1] }}
              className={`flex h-full min-h-[380px] w-full flex-col justify-between rounded-2xl p-8 md:p-10 ${
                t.dark
                  ? "bg-[#0f0f0f] text-white"
                  : "bg-[#f2f2f2] dark:bg-[#141414] text-[#0f0f0f] dark:text-white"
              }`}
              style={{ boxShadow: cardShadow }}
            >
              {cardInner}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8">{progressBars}</div>
      </div>
    );
  }

  // ── Full-bleed layout (original) ──
  return (
    <section
      className="bg-[#f5f5f5] dark:bg-[#0e0e0e] overflow-hidden"
      {...pauseHandlers}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[560px]">

        {/* LEFT — text + progress bars */}
        <div className="flex flex-col justify-center px-4 md:px-12 lg:pl-[max(3rem,calc((100vw-1400px)/2+5rem))] lg:pr-16 py-10 md:py-20 lg:py-24">
          <h2 className="font-display font-bold text-[1.75rem] md:text-5xl lg:text-[3.2rem] text-[#0f0f0f] dark:text-white leading-[1.08] mb-3 md:mb-5">
            What our clients think
          </h2>
          <p className="font-body text-sm md:text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-sm mb-7 md:mb-12">
            Real outcomes for real businesses — built with strategy, clarity, and craft.
          </p>

          {progressBars}
        </div>

        {/* RIGHT — card slides right to left */}
        <div className="relative flex items-center py-6 md:py-10 lg:py-16 px-4 md:pl-6 lg:pl-8 md:pr-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.52, ease: [0.32, 0, 0.18, 1] }}
              className={`relative w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-14 rounded-2xl lg:rounded-r-none min-h-[280px] md:min-h-[460px] ${
                t.dark
                  ? "bg-[#0f0f0f] text-white"
                  : "bg-[#f2f2f2] dark:bg-[#141414] text-[#0f0f0f] dark:text-white"
              }`}
              style={{ boxShadow: cardShadow, zIndex: 3 }}
            >
              {cardInner}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
