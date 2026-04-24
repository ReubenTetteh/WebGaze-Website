"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_DURATION = 6000;

const testimonials = [
  {
    quote: "WebGaze completely transformed how we show up online. The website is clean, fast, and we're already getting more enquiries. They really understood what we needed.",
    name: "Care Partners Australia",
    role: "NDIS Service Provider",
    abbr: "CPA",
    dark: true,
  },
  {
    quote: "From logo to website, everything came together exactly as we envisioned. They communicated well throughout and delivered a result we're genuinely proud of.",
    name: "Australian Ghanaian Chamber of Commerce",
    role: "Commerce & Trade Organisation",
    abbr: "AGCCI",
    dark: false,
  },
  {
    quote: "The level of craft and attention to detail was impressive. Our brand now feels cohesive and professional across every touchpoint.",
    name: "WINSTAMAC",
    role: "Brand & Design",
    abbr: "WM",
    dark: true,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
    setProgress(0);
  }, []);

  // Always running — no pause on hover
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

        {/* LEFT — text + progress bars */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-[max(3rem,calc((100vw-1400px)/2+5rem))] lg:pr-16 py-20 lg:py-24">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.2rem] text-[#0f0f0f] dark:text-white leading-[1.08] mb-5">
            What our clients think
          </h2>
          <p className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-sm mb-12">
            Real outcomes for real businesses — built with strategy, clarity, and craft.
          </p>

          {/* Progress bars */}
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
        </div>

        {/* RIGHT — card slides right to left */}
        <div className="relative flex items-center py-10 lg:py-16 pl-6 lg:pl-8 pr-0 overflow-hidden">

          {/* Active card — slides in from right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.52, ease: [0.32, 0, 0.18, 1] }}
              className={`relative w-full h-full flex flex-col justify-between p-10 md:p-14 rounded-sm lg:rounded-r-none ${
                t.dark
                  ? "bg-[#0f0f0f] text-white"
                  : "bg-[#f2f2f2] dark:bg-[#141414] text-[#0f0f0f] dark:text-white"
              }`}
              style={{
                minHeight: "460px",
                boxShadow: t.dark
                  ? "8px 12px 48px rgba(0,0,0,0.55), 2px 2px 0px rgba(255,255,255,0.04) inset"
                  : "8px 12px 48px rgba(0,0,0,0.14), 2px 2px 0px rgba(255,255,255,0.8) inset",
                zIndex: 3,
              }}
            >
              {/* Logo / abbr */}
              <div className="flex justify-center mb-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl font-display font-black text-xl tracking-tight ${
                  t.dark
                    ? "bg-white/10 text-white"
                    : "bg-[#0f0f0f]/8 text-[#0f0f0f] dark:bg-white/10 dark:text-white"
                }`}>
                  {t.abbr}
                </div>
              </div>

              {/* Quote */}
              <blockquote className={`font-body text-xl md:text-2xl leading-[1.6] italic flex-1 ${
                t.dark ? "text-white/85" : "text-[#1a1a1a] dark:text-white/85"
              }`}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Name + role */}
              <div className={`mt-10 pt-7 border-t ${
                t.dark ? "border-white/10" : "border-[#0f0f0f]/10 dark:border-white/10"
              }`}>
                <p className={`font-display font-bold text-base ${t.dark ? "text-white" : "text-[#0f0f0f] dark:text-white"}`}>
                  {t.name}
                </p>
                <p className={`font-body text-sm mt-1 ${t.dark ? "text-white/50" : "text-[#777] dark:text-white/50"}`}>
                  {t.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
