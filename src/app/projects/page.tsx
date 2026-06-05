"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import MobileProjects from "@/components/sections/MobileProjects";
import { useIsMobile } from "@/hooks/useIsMobile";
import { portfolioProjects, projectFilters, type PortfolioProject } from "@/lib/projects";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function ProjectTile({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.99 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block focus-visible:outline-none"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-[#e9e9e6] transition group-focus-visible:ring-2 group-focus-visible:ring-red-brand dark:bg-[#161616]">
          <Image
            src={project.image}
            alt={`${project.name} project cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "eager"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <h3 className="mt-4 font-display text-base font-bold leading-snug text-[#111] dark:text-white">
          {project.name}
        </h3>
        <p className="mt-1 font-body text-sm leading-snug text-[#9a9a92] dark:text-[#777]">
          {project.category}
        </p>
      </Link>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const isMobile = useIsMobile();

  const filtered = useMemo(
    () =>
      portfolioProjects.filter(
        (project) => activeFilter === "All" || project.filters.includes(activeFilter)
      ),
    [activeFilter]
  );

  return (
    <>
      <ServicePageHeader
        title="Our Work"
        subtitle="Selected websites, brands, and digital systems built for businesses across Australia."
        backHref="/"
      />

      {isMobile ? (
        <MobileProjects />
      ) : (
      <section className="bg-[#f4f4f1] px-4 py-14 dark:bg-[#0b0b0b] md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-12 flex flex-col gap-5 border-b border-[#dcdcd6] pb-6 dark:border-[#222] md:flex-row md:items-center md:justify-between">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#101010] dark:text-white">
              Selected Work
              <span className="ml-3 font-body text-[#a3a39b] dark:text-[#666]">
                {filtered.length} {filtered.length === 1 ? "project" : "projects"}
              </span>
            </p>

            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`cursor-pointer rounded-full border px-4 py-2 font-display text-xs font-bold transition-colors duration-200 ${
                    activeFilter === filter
                      ? "border-red-brand bg-red-brand text-white"
                      : "border-[#cfcfca] bg-white text-[#4a4a4a] hover:border-red-brand hover:text-red-brand dark:border-[#292929] dark:bg-[#111] dark:text-[#aaa]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectTile key={project.slug} project={project} priority={i < 6} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      )}

      <CTA />
    </>
  );
}
