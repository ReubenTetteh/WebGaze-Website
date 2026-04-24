"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

// Screenshot native dims: 2560 × 2142
const IMG_RATIO = 2142 / 2560; // height / width

/* ─── Hover-to-scroll card ─────────────────────────────────────────────── */
function ScrollRevealCard() {
  const [active, setActive]   = useState(false);
  const [travel, setTravel]   = useState(0);
  const containerRef          = useRef<HTMLDivElement>(null);
  const CONTAINER_H           = 400; // fixed visible window height

  // Once mounted, measure actual rendered width → compute true travel distance
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w   = containerRef.current.offsetWidth;
      const imgH = w * IMG_RATIO;          // actual rendered image height
      setTravel(Math.max(0, imgH - CONTAINER_H));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.22)] border border-[#e5e5e5]"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Browser bar */}
      <div className="bg-[#f0f0f0] border-b border-[#e0e0e0] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 text-[10px] font-display text-[#aaa] border border-[#e8e8e8]">
          carepartnersau.com.au
        </div>
      </div>

      {/* Screenshot */}
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-none"
        style={{ height: `${CONTAINER_H}px` }}
      >
        <motion.div
          animate={{ y: active ? -travel : 0 }}
          transition={{
            duration: active ? Math.max(travel / 50, 2) : 0.9,
            ease: active ? "linear" : [0.25, 0.1, 0.25, 1],
          }}
        >
          <Image
            src="/portfolio/cpa/screencapture-carepartnersau-2024-12-07-23_50_07-copy-scaled.png"
            alt="Care Partners Australia website"
            width={2560}
            height={2142}
            className="w-full h-auto block"
            priority
          />
        </motion.div>

        {/* Hover overlay */}
        <AnimatePresence>
          {!active && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/25 flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-14 rounded-full border-2 border-white/80 flex items-start justify-center pt-2">
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="w-1 h-3 bg-white rounded-full"
                  />
                </div>
                <span className="bg-red-brand text-white font-display font-bold text-xs tracking-[0.14em] uppercase px-5 py-2.5 rounded-full">
                  Hover to Scroll
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function CarePartnersPage() {
  return (
    <>
      {/* ── Hero + About split section ── */}
      <section className="relative bg-white dark:bg-white">
        {/* Dark background — covers only the top portion */}
        <div className="absolute top-0 left-0 right-0 h-[340px] bg-dark-bg" />

        {/* Top red accent */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 right-0 h-px bg-red-brand origin-left z-10"
        />

        <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-28 pb-16">

          {/* ── LEFT col ── */}
          <div className="flex flex-col">
            {/* Back link — sits in the dark area */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-display tracking-[0.18em] uppercase text-[#555] hover:text-red-brand transition-colors duration-200 mb-8 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
                All Projects
              </Link>
            </motion.div>

            {/* Title — in the dark area */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.65 }}
              className="font-display font-bold text-[clamp(2.6rem,5vw,5rem)] text-white leading-[1.04] tracking-[-0.04em] mb-12"
            >
              Care Partners<br />Australia
            </motion.h1>

            {/* White area starts here — About + Scope */}
            <AnimateIn delay={0.15}>
              <div className="pt-2">
                <p className="font-display font-bold text-sm tracking-[0.06em] text-[#0a0a0a] mb-3">About Client</p>
                <p className="font-body text-base text-[#444] leading-relaxed mb-6">
                  Care Partners Australia is a specialist provider of multicultural support services providing exceptional care and support across NSW and VIC.
                </p>

                <p className="font-body text-base text-[#444] leading-relaxed">
                  <span className="font-bold text-[#0a0a0a]">Scope: </span>
                  End-to-end brand and website delivery for Care Partners Australia, including logo design and a complete website rebuild using a fully custom React (Next.js) solution. The project prioritised speed, performance, accessibility, and scalability, resulting in a modern, responsive platform that is easy to manage and built for long-term growth.
                </p>
              </div>
            </AnimateIn>

            {/* Dividers + meta columns */}
            <AnimateIn delay={0.2}>
              <div className="mt-8 pt-8 border-t border-[#e8e8e8] grid grid-cols-3 gap-6">
                {[
                  { label: "Deliverables", items: ["Logo Design", "Custom Web Design", "UI/UX"] },
                  { label: "Platform",     items: ["Next JS", "Figma"] },
                  { label: "Industry",     items: ["NDIS Service Provider"] },
                ].map((col) => (
                  <div key={col.label}>
                    <p className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-[#999] mb-3">{col.label}</p>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 font-body text-sm text-[#333]">
                          <span className="mt-0.5 text-red-brand">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimateIn>

            {/* Discuss a Project button */}
            <AnimateIn delay={0.25}>
              <div className="mt-8">
                <Link
                  href="/request-a-quote"
                  className="inline-flex items-center gap-2 border border-[#0a0a0a] text-[#0a0a0a] font-display font-semibold
                             px-7 py-3.5 text-sm tracking-wide uppercase rounded-full
                             hover:bg-red-brand hover:border-red-brand hover:text-white transition-all duration-300"
                >
                  Discuss a Project →
                </Link>
              </div>
            </AnimateIn>
          </div>

          {/* ── RIGHT col — scroll card, top-aligned with title ── */}
          {/* mt matches: back-link height (~20px) + mb-8 (32px) = ~52px */}
          <AnimateIn direction="left" delay={0.3}>
            <div className="lg:sticky lg:top-24 lg:mt-[52px]">
              <ScrollRevealCard />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Project Highlights ── */}
      <section className="section-pad bg-dark-bg text-[#fafafa]">
        <div className="container-wide">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-14">
              <span className="block w-8 h-[2px] bg-red-brand" />
              <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
                Project Highlights
              </span>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "The Challenge",
                body: "Care Partners Australia needed a clearer, more trustworthy digital presence that reflected the quality of care they provide. Their existing website lacked clarity, consistency, and ease of navigation, making it difficult for participants, families, and stakeholders to quickly understand services and take the next step.",
              },
              {
                num: "02",
                title: "Our Approach",
                body: "We began by refining the brand through a refreshed logo and a clearer visual direction. We then rebuilt the website from the ground up using a fully custom design, focusing on clarity, accessibility, and ease of use. Content and page structure were simplified to guide users naturally toward key information and enquiries.",
              },
              {
                num: "03",
                title: "Final Outcome",
                body: "The new website presents Care Partners Australia as a trusted, modern, and people-first service provider. Information is clearer, navigation is intuitive, and the overall experience supports confidence and engagement from the first visit. The platform is fast, responsive, and easy to maintain.",
              },
            ].map((item, i) => (
              <AnimateIn key={item.num} delay={i * 0.1}>
                <div className="border-t border-[#222] pt-8">
                  <span className="font-display font-black text-xs tracking-[0.2em] text-[#444] block mb-5">{item.num}</span>
                  <h3 className="font-display font-bold text-2xl text-white mb-4">{item.title}</h3>
                  <p className="font-body text-base text-[#888] leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="bg-[#f7f7f7] dark:bg-[#0d0d0d] py-16">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimateIn>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <Image src="/portfolio/cpa/Scene-2.png" alt="Care Partners — Mockup" fill className="object-cover" />
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <Image src="/portfolio/cpa/ghyt.jpg" alt="Care Partners — Detail" fill className="object-cover" />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-dark-bg py-20 border-t border-dark-border">
        <div className="container-wide flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="label-tag mb-3">
              Let's get in touch — we respond fast.
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-[1.06] tracking-[-0.03em]">
              Ready to work<br />together?
            </h2>
          </div>
          <Link
            href="/request-a-quote"
            className="inline-flex items-center gap-3 bg-red-brand text-white font-display font-bold
                       px-8 py-4 text-sm tracking-[0.15em] uppercase rounded-full
                       hover:bg-red-dark transition-colors duration-300 flex-shrink-0"
          >
            Get a Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
