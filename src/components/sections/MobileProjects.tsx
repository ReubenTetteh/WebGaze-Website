"use client";
// Mobile-only /projects view — an immersive vertical feed of large portrait
// cards with a subtle scroll-driven parallax inside each image. Desktop keeps
// the uniform grid (see src/app/projects/page.tsx).
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { portfolioProjects, projectFilters, type PortfolioProject } from "@/lib/projects";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function FeedCard({ project, number }: { project: PortfolioProject; number: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <Link href={`/projects/${project.slug}`} className="block active:opacity-90">
        <div
          ref={ref}
          className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#e6e6e2] dark:bg-[#161616]"
        >
          <motion.div
            style={{ y: reduce ? 0 : y }}
            className="absolute inset-x-0 -top-[7%] h-[114%]"
          >
            <Image
              src={project.image}
              alt={`${project.name} project cover`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <span className="absolute left-5 top-4 font-display text-[3.25rem] font-bold leading-none text-white/15 tabular-nums mix-blend-overlay">
            {String(number).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-3.5 flex items-baseline justify-between gap-4 px-1">
          <div>
            <h3 className="font-display text-lg font-bold leading-snug text-[#111] dark:text-white">
              {project.name}
            </h3>
            <p className="mt-1 font-body text-sm leading-snug text-[#9a9a92] dark:text-[#777]">
              {project.category}
            </p>
          </div>
          <span className="shrink-0 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#b0b0a7] dark:text-[#666]">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function MobileProjects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () =>
      portfolioProjects.filter(
        (project) => activeFilter === "All" || project.filters.includes(activeFilter)
      ),
    [activeFilter]
  );

  return (
    <section className="bg-[#f4f4f1] dark:bg-[#0b0b0b]">
      {/* sticky filter bar */}
      <div className="sticky top-0 z-30 border-b border-[#dcdcd6]/80 bg-[#f4f4f1]/85 px-4 py-3 backdrop-blur-md dark:border-[#222]/80 dark:bg-[#0b0b0b]/85">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-[#101010] dark:text-white">
            Selected Work
          </p>
          <span className="font-body text-xs text-[#a3a39b] dark:text-[#666]">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 font-display text-xs font-bold transition-colors duration-200 ${
                activeFilter === filter
                  ? "border-red-brand bg-red-brand text-white"
                  : "border-[#cfcfca] bg-white text-[#4a4a4a] dark:border-[#292929] dark:bg-[#111] dark:text-[#aaa]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* immersive feed */}
      <motion.div layout className="flex flex-col gap-12 px-4 pb-20 pt-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <FeedCard key={project.slug} project={project} number={index + 1} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
