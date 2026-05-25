"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

const posts = [
  {
    index: "01",
    category: "Web Design",
    title: "Why Your Website Is Losing You Clients (And How to Fix It)",
    excerpt:
      "Most business websites fail silently. No error messages, no crashes — just visitors who leave before they convert. Here's what's actually going wrong.",
    date: "Apr 2026",
    readTime: "6 min read",
    href: "/insights/website-losing-clients",
    accent: "#E01B24",
  },
  {
    index: "02",
    category: "Branding",
    title: "The Brand Mistake That's Costing Australian Businesses Trust",
    excerpt:
      "Inconsistent branding costs more than you think. We break down the single most common visual identity mistake — and the fast fix.",
    date: "Mar 2026",
    readTime: "4 min read",
    href: "/insights/brand-consistency",
    accent: "#E01B24",
  },
  {
    index: "03",
    category: "SEO",
    title: "Local SEO in 2025: What Actually Moves the Needle",
    excerpt:
      "Google's algorithm has shifted again. Here's what's working right now for Australian businesses trying to rank in their local market.",
    date: "Feb 2026",
    readTime: "8 min read",
    href: "/insights/local-seo-2025",
    accent: "#E01B24",
  },
  {
    index: "04",
    category: "Strategy",
    title: "When to Redesign vs. Refresh: A Framework for Business Owners",
    excerpt:
      "A full redesign is expensive. A surface refresh often misses the point. This decision framework helps you pick the right path.",
    date: "Jan 2026",
    readTime: "5 min read",
    href: "/insights/redesign-vs-refresh",
    accent: "#E01B24",
  },
];

const featured = posts[0];
const secondary = posts.slice(1);

export default function BlogPosts() {
  return (
    <section className="bg-light-bg dark:bg-[#0c0c0c] py-24 md:py-36 overflow-hidden">
      <div className="container-wide">

        {/* Section label */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-16 md:mb-20">
            <span className="block w-8 h-[2px] bg-red-brand flex-shrink-0" />
            <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
              Insights
            </span>
          </div>
        </AnimateIn>

        {/* Main editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-0 lg:gap-0">

          {/* ── Featured Post ── */}
          <AnimateIn delay={0.05}>
            <Link
              href={featured.href}
              className="group block lg:pr-14 lg:border-r border-light-border dark:border-[#1e1e1e] pb-12 lg:pb-0"
            >
              {/* Large index number — decorative background */}
              <div className="relative mb-8">
                <span
                  className="absolute -top-6 -left-2 font-display font-black text-[9rem] md:text-[11rem] leading-none
                             text-[#0a0a0a]/[0.04] dark:text-white/[0.03] select-none pointer-events-none"
                >
                  {featured.index}
                </span>

                {/* Category pill */}
                <span className="relative z-10 inline-flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.2em] uppercase
                                 text-red-brand border border-red-brand/30 bg-red-brand/[0.06] rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-brand inline-block" />
                  {featured.category}
                </span>
              </div>

              {/* Big title */}
              <h2
                           className="relative font-display font-black text-[clamp(2.1rem,3.5vw,3.4rem)] leading-[1.05] tracking-[-0.03em]
                           text-[#0a0a0a] dark:text-white mb-6
                           group-hover:text-red-brand transition-colors duration-300"
              >
                {featured.title}
              </h2>

              {/* Excerpt */}
              <p className="font-body text-base md:text-lg text-light-muted dark:text-[#888] leading-relaxed max-w-[52ch] mb-10">
                {featured.excerpt}
              </p>

              {/* Meta + CTA row */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-xs font-display text-[#777] dark:text-[#555]">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span>{featured.readTime}</span>
                </div>

                <motion.span
                  className="ml-auto inline-flex items-center gap-2 font-display font-bold text-xs tracking-[0.18em] uppercase
                             text-[#0a0a0a] dark:text-white group-hover:text-red-brand transition-colors duration-200"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Read Article
                  <span className="text-sm">→</span>
                </motion.span>
              </div>

              {/* Animated bottom border */}
              <div className="mt-8 h-px bg-light-border dark:bg-[#1e1e1e] relative overflow-hidden">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-red-brand"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                />
              </div>
            </Link>
          </AnimateIn>

          {/* ── Secondary Posts ── */}
          <div className="lg:pl-14 pt-0 lg:pt-0 flex flex-col divide-y divide-light-border dark:divide-[#1a1a1a]">
            {secondary.map((post, i) => (
              <AnimateIn key={post.index} delay={0.12 + i * 0.08}>
                <Link
                  href={post.href}
                  className="group flex items-start gap-5 py-8 first:pt-0 lg:first:pt-2"
                >
                  {/* Index number */}
                  <span
                    className="flex-shrink-0 font-display font-black text-[2.2rem] leading-none tracking-tight
                               text-[#0a0a0a]/10 dark:text-white/[0.06] mt-0.5 w-10 select-none"
                  >
                    {post.index}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Category */}
                    <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-red-brand mb-2 block">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3
                                 className="font-display font-bold text-[1.05rem] md:text-lg leading-snug tracking-[-0.02em]
                                 text-[#0a0a0a] dark:text-[#d8d8d8]
                                 group-hover:text-red-brand transition-colors duration-200 mb-3"
                    >
                      {post.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-[11px] font-display text-[#777] dark:text-[#555]">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-current" />
                      <span>{post.readTime}</span>
                      <span
                        className="ml-auto text-[11px] font-bold tracking-[0.15em] uppercase
                                   text-[#777] dark:text-[#666] group-hover:text-red-brand transition-colors duration-200"
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}

            {/* View all — anchored to bottom */}
            <AnimateIn delay={0.4}>
              <div className="pt-8">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-3 font-display font-bold text-sm tracking-[0.18em] uppercase
                             text-[#0a0a0a] dark:text-white border border-light-border dark:border-[#2a2a2a]
                             px-8 py-4 rounded-full
                             hover:border-red-brand hover:text-red-brand
                             transition-all duration-300 group"
                >
                  All Insights
                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
                </Link>
              </div>
            </AnimateIn>
          </div>

        </div>

      </div>
    </section>
  );
}
