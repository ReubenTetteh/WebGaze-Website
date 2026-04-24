"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

const filters = ["All", "Web Design", "Branding", "UI/UX"];

const projects = [
  {
    name: "Care Partners Australia",
    category: "Web Design · Branding · UI/UX",
    tag: "NDIS Provider",
    filter: ["Web Design", "Branding", "UI/UX"],
    slug: "care-partners-australia",
    platform: "Next.js · Figma",
    image: "/portfolio/Care-Partners-bbnn.png",
    year: "2024",
    featured: true,
  },
  {
    name: "Australian Ghanaian Chamber of Commerce",
    category: "Web Design · Branding",
    tag: "Commerce",
    filter: ["Web Design", "Branding"],
    platform: "WordPress",
    image: "/portfolio/AGCCI.png",
    year: "2024",
    featured: false,
  },
  {
    name: "WINSTAMAC",
    category: "Brand Strategy · UI/UX",
    tag: "Brand",
    filter: ["Branding", "UI/UX"],
    platform: "Figma",
    image: "/portfolio/Winstamac-Portfolio-Cover.avif",
    year: "2024",
    featured: false,
  },
  {
    name: "Sababa Global",
    category: "Brand Strategy · UX",
    tag: "Global",
    filter: ["Branding"],
    platform: "Figma",
    image: "/portfolio/Saba-Mock.png",
    year: "2023",
    featured: false,
  },
  {
    name: "Viride Energy Africa",
    category: "Web Design · Development",
    tag: "Energy",
    filter: ["Web Design"],
    platform: "React.js",
    image: "/portfolio/webgaze_viride-energy.webp",
    year: "2024",
    featured: false,
  },
  {
    name: "Ben Ari Accounting",
    category: "Web Design · Product Design",
    tag: "Accounting",
    filter: ["Web Design", "UI/UX"],
    platform: "WordPress",
    image: "/portfolio/Ben-Ari.jpg",
    year: "2023",
    featured: false,
  },
  {
    name: "PhytoScience Australia",
    category: "Web Design · Branding",
    tag: "Health",
    filter: ["Web Design", "Branding"],
    platform: "WordPress",
    image: "/portfolio/PhytoScience-Au2.webp",
    year: "2024",
    featured: false,
  },
  {
    name: "Petra Care Services",
    category: "Web Design · UI/UX",
    tag: "Care",
    filter: ["Web Design", "UI/UX"],
    platform: "WordPress",
    image: "/portfolio/Petra-Care.webp",
    year: "2024",
    featured: false,
  },
  {
    name: "Onboard Plumbing",
    category: "Web Design · Branding",
    tag: "Trades",
    filter: ["Web Design", "Branding"],
    platform: "WordPress",
    image: "/portfolio/Onboard.jpg",
    year: "2023",
    featured: false,
  },
  {
    name: "Janny Global",
    category: "Web Design · Mobile UI",
    tag: "Real Estate",
    filter: ["Web Design", "UI/UX"],
    platform: "React.js",
    image: "/portfolio/Janny-global-mobile.webp",
    year: "2024",
    featured: false,
  },
  {
    name: "DownUnder Radio",
    category: "Web Design · Branding",
    tag: "Media",
    filter: ["Web Design", "Branding"],
    platform: "WordPress",
    image: "/portfolio/DownUnder-Radio-scaled.jpg",
    year: "2023",
    featured: false,
  },
  {
    name: "Salaka Dance Ensemble",
    category: "Web Design · Branding",
    tag: "Arts",
    filter: ["Web Design", "Branding"],
    platform: "WordPress",
    image: "/portfolio/Salaka-Dance-scaled.webp",
    year: "2023",
    featured: false,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const Wrapper = (project as { slug?: string }).slug
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={`/projects/${(project as { slug?: string }).slug}`} className="contents">{children}</Link>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return (
    <Wrapper>
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col bg-white dark:bg-[#111] rounded-2xl overflow-hidden cursor-pointer
                 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]
                 transition-shadow duration-300"
    >
      {/* Image — fixed aspect ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f0f0f0] dark:bg-[#1a1a1a] flex-shrink-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
        />
        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 right-3 text-[9px] font-display font-semibold tracking-[0.18em] uppercase bg-red-brand text-white rounded-full px-2.5 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tag */}
        <span className="self-start text-[9px] font-display font-semibold tracking-[0.18em] uppercase text-red-brand border border-red-brand rounded-full px-2.5 py-1 mb-3">
          {project.tag}
        </span>

        {/* Name */}
        <h3 className={`font-display font-bold text-base leading-snug transition-colors duration-200 ${hovered ? "text-red-brand" : "text-[#0a0a0a] dark:text-white"}`}>
          {project.name}
        </h3>
        <p className="mt-1 text-[10px] font-display tracking-[0.12em] uppercase text-[#999]">
          {project.category}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#f0f0f0] dark:border-[#222] mt-4">
          <span className="text-[10px] font-display tracking-[0.1em] uppercase text-[#bbb]">
            {project.platform} · {project.year}
          </span>
          <span className={`text-sm transition-all duration-300 ${hovered ? "text-red-brand translate-x-1" : "text-[#ccc]"}`}>
            →
          </span>
        </div>
      </div>
    </motion.div>
    </Wrapper>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.filter.includes(activeFilter)
  );


  return (
    <>
      {/* Hero */}
      <section className="min-h-[46vh] flex items-end bg-dark-bg text-[#fafafa] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 right-0 h-px bg-red-brand origin-left"
        />
        <div className="container-wide relative z-10 pt-36 pb-14">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="block w-8 h-[2px] bg-red-brand" />
            <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
              Our Work
            </span>
          </motion.div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <motion.h1
              className="font-display font-bold text-[clamp(3rem,7vw,6.5rem)] text-white leading-[1.02] tracking-[-0.04em]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.65 }}
            >
              Work That Speaks
              <br />for Itself
            </motion.h1>

            {/* Filter inline with heading */}
            <motion.div
              className="flex flex-wrap gap-2 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`font-display text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-red-brand border-red-brand text-white"
                      : "border-white/20 text-white/60 hover:border-red-brand hover:text-red-brand"
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#f7f7f7] dark:bg-[#0d0d0d] py-16 px-4 md:px-10 lg:px-16">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <CTA />
    </>
  );
}
