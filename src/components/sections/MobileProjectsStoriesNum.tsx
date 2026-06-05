"use client";
// Mobile concept v8 — a refined "stories" browser. Auto-advancing segmented
// progress bars up top, hold-to-pause, tap halves to navigate, and a large
// numeric index as the signature element.
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolioProjects, type PortfolioProject } from "@/lib/projects";

const STORY_DURATION = 4.5; // seconds per story

export default function MobileProjectsStoriesNum() {
  const reduceMotion = useReducedMotion();
  const projects = portfolioProjects;
  const count = projects.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback(
    (n: number) => {
      setProgress(0);
      setIndex(((n % count) + count) % count);
    },
    [count]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    lastTsRef.current = null;
    progressRef.current = 0;
    setProgress(0);
  }, [index]);

  useEffect(() => {
    if (reduceMotion || paused) {
      lastTsRef.current = null;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const delta = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      const value = progressRef.current + delta / STORY_DURATION;
      if (value >= 1) {
        progressRef.current = 0;
        setProgress(0);
        next();
        return;
      }
      progressRef.current = value;
      setProgress(value);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, reduceMotion, next]);

  const project: PortfolioProject = projects[index];

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-neutral-900">
      <div className="relative h-[100svh] w-full max-w-[460px] select-none overflow-hidden bg-[#0b0b0b] font-body text-neutral-100">
        {/* Image crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={`${project.name} — ${project.category} project cover`}
              fill
              priority
              sizes="(max-width: 460px) 100vw, 460px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Scrims */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/75 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

        {/* Segmented progress bars */}
        <div className="absolute inset-x-0 top-0 z-30 flex gap-1.5 px-4 pt-4">
          {projects.map((p, i) => (
            <div key={p.slug} className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-white/25">
              {i < index && <div className="absolute inset-0 bg-white" />}
              {i === index && (
                <div
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: reduceMotion ? "100%" : `${Math.min(progress, 1) * 100}%` }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Tap zones */}
        <button
          type="button"
          aria-label="Previous project"
          className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer"
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
          onPointerCancel={() => setPaused(false)}
          onClick={prev}
        />
        <button
          type="button"
          aria-label="Next project"
          className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer"
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
          onPointerCancel={() => setPaused(false)}
          onClick={next}
        />

        {/* Big numeric index */}
        <div className="pointer-events-none absolute left-5 top-10 z-20 flex items-end gap-2">
          <span className="font-display text-[4rem] font-bold leading-[0.8] tabular-nums tracking-[-0.04em] text-white">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mb-1.5 font-display text-sm font-bold tabular-nums tracking-[0.1em] text-white/50">
            / {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10">
          <p className="pointer-events-none font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            {project.category}
          </p>
          <h2 className="pointer-events-none mt-2 font-display text-[2.5rem] font-bold leading-[0.96] tracking-[-0.03em] text-white">
            {project.name}
          </h2>
          <p className="pointer-events-none mt-2.5 text-sm leading-relaxed text-white/80 line-clamp-2">
            {project.summary}
          </p>

          <Link
            href={`/projects/${project.slug}`}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="relative z-30 mt-5 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90"
          >
            View case study
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
