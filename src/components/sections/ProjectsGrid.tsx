"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const images = [
  { src: "/portfolio/Care-Partners-bbnn.png",               name: "Care Partners Australia",  category: "Web Design · Branding" },
  { src: "/portfolio/AGCCI.png",                            name: "AGCCI",                    category: "Web Design · Branding" },
  { src: "/portfolio/WINSTAMAC.png",                        name: "WINSTAMAC",                category: "Brand Strategy · UI/UX" },
  { src: "/portfolio/Saba-Mock.png",                        name: "Sababa Global",            category: "UX Strategy · Branding" },
  { src: "/portfolio/webgaze_viride-energy.webp",           name: "Viride Energy Africa",     category: "Web Design · Dev" },
  { src: "/portfolio/Ben-Ari.jpg",                          name: "Ben Ari Accounting",       category: "Web Design" },
  { src: "/portfolio/Salaka-Dance-scaled.webp",             name: "Salaka Dance Ensemble",    category: "Web Design · Branding" },
  { src: "/portfolio/DownUnder-Radio-scaled.jpg",           name: "DownUnder Radio",          category: "Web Design" },
  { src: "/portfolio/Onboard.jpg",                          name: "Onboard",                  category: "Web Design" },
  { src: "/portfolio/PhytoScience-Au2.webp",                name: "PhytoScience",             category: "Web Design" },
  { src: "/portfolio/Petra-Care.webp",                      name: "Petra Care",               category: "Web Design · UI/UX" },
  { src: "/portfolio/jjkkkll.jpg",                          name: "Creative Project",         category: "Web Design" },
  { src: "/portfolio/gghb.png",                             name: "Brand Campaign",           category: "Branding" },
  { src: "/portfolio/hghgmn.png",                           name: "Digital Experience",       category: "Web Design" },
  { src: "/portfolio/Winstamac-Portfolio-Cover.avif",       name: "WINSTAMAC Cover",          category: "Brand Strategy" },
  { src: "/portfolio/Scene-2.png",                          name: "Visual Direction",         category: "Art Direction" },
  { src: "/portfolio/004-Wall-Sign-Logo-Mockup_-scaled.jpg",name: "Signage Mockup",           category: "Branding" },
  { src: "/portfolio/AGCCI-99.png",                         name: "AGCCI Detail",             category: "Web Design" },
  { src: "/portfolio/Building-front.webp",                  name: "Space & Identity",         category: "Brand Direction" },
  { src: "/portfolio/Janny-global-mobile.webp",             name: "Janny Global",             category: "Mobile Design" },
  { src: "/portfolio/kkjjhh-1.webp",                        name: "UI System",                category: "UI/UX Design" },
];

function buildRow(startIndex: number, count: number) {
  const row = [];
  for (let i = 0; i < count; i++) {
    row.push(images[(startIndex + i) % images.length]);
  }
  return row;
}

const rows = [
  { items: buildRow(0, 8),  direction: -1 },
  { items: buildRow(8, 8),  direction:  1 },
  { items: buildRow(16, 8), direction: -1 },
];

const TRAVEL = 220;

// Each row has a unique starting offset so card edges never line up vertically.
// Row 0 starts at -80px, row 1 at -280px, row 2 at -160px — all different.
const ROW_OFFSETS = [-80, -280, -160];

function ParallaxRow({
  items,
  direction,
  startOffset,
  scrollYProgress,
}: {
  items: ReturnType<typeof buildRow>;
  direction: 1 | -1;
  startOffset: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [startOffset + direction * TRAVEL * -0.5, startOffset + direction * TRAVEL * 0.5]
  );
  const x = useSpring(xRaw, { mass: 1, stiffness: 60, damping: 18 });

  return (
    <div className="overflow-visible">
      <motion.div style={{ x }} className="flex gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="group relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] overflow-hidden rounded-2xl bg-[#111] cursor-pointer"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="360px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
              <p className="font-display font-bold text-sm text-white leading-snug">{item.name}</p>
              <p className="font-display text-[10px] tracking-[0.15em] uppercase text-red-brand mt-1">{item.category}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="bg-[#080808] text-[#fafafa] py-24 md:py-32 overflow-hidden">
      {/* Header — inside container */}
      <div className="container-wide mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-red-brand flex-shrink-0" />
              <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
                Our Work
              </span>
            </div>
            <h2 className="font-display font-bold text-[clamp(2.4rem,5vw,5rem)] text-white leading-[1.06] tracking-[-0.03em]">
              Projects that<br />speak for themselves.
            </h2>
          </div>

          <Link
            href="/projects"
            className="self-start md:self-auto inline-flex items-center gap-3 font-display font-bold text-sm
                       tracking-[0.18em] uppercase text-white border border-[#2a2a2a] px-8 py-4 rounded-full
                       hover:border-red-brand hover:text-red-brand transition-all duration-300 group flex-shrink-0"
          >
            See All Projects
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
          </Link>
        </div>
      </div>

      {/* Full-bleed parallax rows */}
      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <ParallaxRow
            key={i}
            items={row.items}
            direction={row.direction as 1 | -1}
            startOffset={ROW_OFFSETS[i]}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
