"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import { portfolioProjects, projectFilters, type PortfolioProject } from "@/lib/projects";

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.035 }}
      className={project.featured ? "md:col-span-2 xl:col-span-2" : ""}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full overflow-hidden rounded-[8px] bg-white shadow-[0_12px_36px_rgba(10,10,10,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(10,10,10,0.14)] dark:bg-[#111] dark:ring-white/10"
      >
        <div
          className={`relative overflow-hidden bg-[#e9e9e9] dark:bg-[#171717] ${
            project.featured ? "aspect-[16/9]" : "aspect-[5/4]"
          }`}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes={project.featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/25 bg-black/35 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
              {project.tag}
            </span>
            {project.featured && (
              <span className="rounded-full bg-red-brand px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                Featured
              </span>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              {project.category}
            </p>
            <h2 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl">
              {project.name}
            </h2>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-end md:p-6">
          <p className="font-body text-sm leading-relaxed text-[#555] dark:text-[#aaa]">
            {project.summary}
          </p>
          <div className="flex items-center justify-between gap-5 md:block md:text-right">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
              {project.platform} · {project.year}
            </p>
            <span className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ddd] text-lg text-[#111] transition duration-300 group-hover:border-red-brand group-hover:bg-red-brand group-hover:text-white dark:border-[#2a2a2a] dark:text-white">
              ↗
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

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

      <section className="bg-[#f4f4f1] px-4 py-14 dark:bg-[#0b0b0b] md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
                Portfolio
              </p>
              <h2 className="max-w-[860px] font-display text-[clamp(2rem,4vw,4.2rem)] font-bold leading-[1.04] text-[#101010] dark:text-white">
                A sharper grid for work that deserves more room to breathe.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 font-display text-xs font-bold transition-all duration-200 ${
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

          <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}
