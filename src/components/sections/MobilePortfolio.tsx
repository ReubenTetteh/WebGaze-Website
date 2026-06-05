"use client";
// Mobile-only portfolio view — a full-bleed "coverflow" carousel.
// Desktop keeps the HeroParallax marquee untouched (see HeroParallax.tsx).
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { ParallaxProduct } from "@/components/ui/HeroParallax";

export default function MobilePortfolio({
  products,
}: {
  products: ParallaxProduct[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);
  const [hintGone, setHintGone] = useState(false);

  const n = products.length;
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeRef = useRef<number | undefined>(undefined);

  // The left-aligned card is the focus; the next one bleeds in on the right
  // as a "there's more" cue. Inactive cards sit slightly smaller and dimmer.
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const padL = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const focusX = trackRect.left + padL;

    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((wrap, i) => {
      if (!wrap) return;
      const dist = Math.abs(wrap.getBoundingClientRect().left - focusX);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    cardRefs.current.forEach((wrap, i) => {
      const inner = wrap?.firstElementChild as HTMLElement | null;
      if (!inner) return;
      if (reduce) {
        inner.style.transform = "";
        inner.style.opacity = "1";
      } else {
        inner.style.transform = i === best ? "scale(1)" : "scale(0.92)";
        inner.style.opacity = i === best ? "1" : "0.5";
      }
    });

    activeRef.current = best;
    setActive((prev) => (prev !== best ? best : prev));
  }, [reduce]);

  const onScroll = useCallback(() => {
    if (!hintGone) setHintGone(true);
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      update();
    });
  }, [update, hintGone]);

  // Scroll a card to the left focus position (respecting the gutter).
  const go = useCallback(
    (i: number, smooth = true) => {
      const idx = Math.max(0, Math.min(n - 1, i));
      const track = trackRef.current;
      const wrap = cardRefs.current[idx];
      if (!track || !wrap) return;
      const padL = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const target =
        track.scrollLeft +
        (wrap.getBoundingClientRect().left - track.getBoundingClientRect().left) -
        padL;
      track.scrollTo({ left: target, behavior: smooth ? "smooth" : "auto" });
    },
    [n]
  );

  // Pause auto-scroll while the user interacts, resume shortly after.
  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
  }, []);
  const scheduleResume = useCallback(() => {
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 4500);
  }, []);

  useEffect(() => {
    update();
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
    };
  }, [update]);

  // Auto-advance, looping back to the start at the end.
  useEffect(() => {
    if (reduce || n <= 1) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      const next = activeRef.current + 1;
      if (next >= n) go(0, false);
      else go(next, true);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduce, n, go]);

  return (
    <section
      aria-labelledby="mobile-portfolio-heading"
      className="relative overflow-hidden bg-dark-bg py-16"
    >
      {/* ambient glow to match the desktop section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 40% at 50% 0%, rgba(224,27,36,0.12), transparent 70%)",
        }}
      />

      {/* header */}
      <div className="container-wide relative">
        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
          Selected work
        </p>
        <h2
          id="mobile-portfolio-heading"
          className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-white"
        >
          Projects that
          <br />
          speak for themselves.
        </h2>
        <p className="mt-3 max-w-sm text-sm text-neutral-300">
          A selection of recent websites, brand systems, and digital
          experiences for clients across Australia and beyond.
        </p>
      </div>

      {/* coverflow track */}
      <div className="relative mt-8">
        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={pause}
          onPointerUp={scheduleResume}
          onPointerCancel={scheduleResume}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scroll-pl-6 pl-6 pr-[16vw] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, i) => (
            <div
              key={product.link}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-[80vw] shrink-0 snap-start py-5"
            >
              <div className="relative origin-center rounded-[1.75rem] bg-[#0f0f0f] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-[transform,opacity] duration-500 ease-out will-change-transform">
                <div className="relative aspect-[16/11] overflow-hidden rounded-t-[1.75rem]">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="78vw"
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    className="object-cover object-top"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent"
                  />
                  <span className="absolute left-4 top-4 font-display text-5xl font-bold leading-none text-white/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="px-5 pb-6 pt-1">
                  {product.category && (
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-red-brand">
                      {product.category}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">
                    {product.title}
                  </h3>

                  <Link
                    href={product.link}
                    aria-label={`View ${product.title}`}
                    className="group mt-4 inline-flex items-center gap-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
                  >
                    View project
                    <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* swipe hint */}
        <AnimatePresence>
          {!hintGone && !reduce && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm"
            >
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                Swipe to explore →
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* counter + progress + controls */}
      <div className="container-wide mt-6 flex items-center gap-4">
        <span className="font-display text-sm font-bold tabular-nums text-white">
          {String(active + 1).padStart(2, "0")}
          <span className="text-neutral-500"> / {String(n).padStart(2, "0")}</span>
        </span>
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-red-brand transition-[width] duration-300 ease-out"
            style={{ width: `${((active + 1) / n) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => {
              pause();
              go(active - 1);
              scheduleResume();
            }}
            disabled={active === 0}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition active:scale-95 disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => {
              pause();
              go(active + 1);
              scheduleResume();
            }}
            disabled={active === n - 1}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition active:scale-95 disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      {/* See all */}
      <div className="container-wide mt-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-red-brand hover:text-red-brand"
        >
          See All Projects
          <span className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
