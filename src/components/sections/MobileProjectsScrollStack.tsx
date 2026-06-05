"use client";
// Mobile concept v7 — cards that stack on top of each other as you scroll up.
// Each card is sticky; the next scrolls up and pins slightly lower, leaving a
// peeking edge so the pile builds. Covered cards scale back for depth.
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { portfolioProjects, type PortfolioProject } from "@/lib/projects";

function StackCard({
  project,
  index,
  total,
  containerRef,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div ref={ref} className="sticky" style={{ top: `${22 + index * 11}px` }}>
      <motion.div
        style={reduce ? undefined : { scale, filter }}
        className="origin-top"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="group block overflow-hidden rounded-[1.5rem] bg-[#141414] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={project.image}
              alt={`${project.name} — ${project.category} project cover`}
              fill
              sizes="(max-width: 460px) 100vw, 460px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />

            <span className="absolute left-5 top-4 font-display text-sm font-bold tabular-nums tracking-[0.14em] text-white/70">
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/35"> / {String(total).padStart(2, "0")}</span>
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                {project.category}
              </p>
              <h3 className="mt-2 font-display text-[2rem] font-bold leading-[0.98] tracking-[-0.03em] text-white">
                {project.name}
              </h3>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function MobileProjectsScrollStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const total = portfolioProjects.length;

  return (
    <div className="flex min-h-[100svh] justify-center bg-neutral-900">
      <div
        ref={containerRef}
        className="relative h-[100svh] w-full max-w-[460px] overflow-y-auto overflow-x-hidden bg-[#0b0b0b] font-body [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* overall scroll progress */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed left-0 right-0 top-0 z-40 h-[2px] origin-left bg-white/80"
        />

        <div className="px-5 pb-6 pt-10">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-white">
            Selected Work
            <span className="ml-3 font-body text-white/40">{total} projects</span>
          </p>
          <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            Scroll the deck.
          </h2>
        </div>

        <div className="px-4 pb-[42svh]">
          {portfolioProjects.map((project, index) => (
            <StackCard
              key={project.slug}
              project={project}
              index={index}
              total={total}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
