"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface TocItem { id: string; title: string }
export interface RelatedPost { title: string; href: string; category: string; readTime: string }

interface Props {
  category: string;
  date: string;
  readTime: string;
  wordCount: number;
  title: string;
  lead: string;
  toc: TocItem[];
  tags: string[];
  relatedPosts: RelatedPost[];
  ctaHref: string;
  ctaLabel: string;
  children: React.ReactNode;
}

export default function BlogArticleLayout({
  category, date, readTime, wordCount, title, lead,
  toc, tags, relatedPosts, ctaHref, ctaLabel, children,
}: Props) {
  const [scrollPct, setScrollPct]   = useState(0);
  const [activeId, setActiveId]     = useState(toc[0]?.id ?? "");
  const [copied, setCopied]         = useState(false);
  const [pageUrl, setPageUrl]       = useState("");
  const articleRef = useRef<HTMLElement>(null);

  // Set page URL client-side only
  useEffect(() => { setPageUrl(window.location.href); }, []);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const winH = window.innerHeight;
      setScrollPct(Math.round(Math.min(100, Math.max(0, (-top / (height - winH)) * 100))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active TOC section
  useEffect(() => {
    if (!toc.length) return;
    const obs: IntersectionObserver[] = [];
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(id); },
        { rootMargin: "-15% 0px -75% 0px" }
      );
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, [toc]);

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* ── Global reading progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-light-border dark:bg-[#111]">
        <motion.div
          className="h-full bg-red-brand origin-left"
          style={{ scaleX: scrollPct / 100 }}
          transition={{ duration: 0 }}
        />
      </div>

      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-wide py-14 xl:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_268px] gap-8 xl:gap-14">

            {/* ══════════════ LEFT SIDEBAR ══════════════ */}
            <aside className="hidden lg:flex flex-col">
              <div className="sticky top-24 flex flex-col gap-7">

                {/* Table of contents */}
                {toc.length > 0 && (
                  <div>
                    <p className="font-display text-[9px] font-bold tracking-[0.26em] uppercase text-[#777] dark:text-[#3a3a3a] mb-4">
                      Contents
                    </p>
                    <nav className="flex flex-col">
                      {toc.map((item) => {
                        const active = activeId === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`group flex items-center gap-2.5 py-[7px] text-[12px] font-display leading-snug transition-all duration-200
                              ${active ? "text-[#0a0a0a] dark:text-white" : "text-[#777] dark:text-[#3d3d3d] hover:text-[#0a0a0a] dark:hover:text-[#777]"}`}
                          >
                            <span className={`flex-shrink-0 h-[1.5px] transition-all duration-300
                              ${active ? "w-5 bg-red-brand" : "w-3 bg-light-border dark:bg-[#2a2a2a] group-hover:bg-[#999] dark:group-hover:bg-[#444]"}`}
                            />
                            {item.title}
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                )}

                <div className="h-px bg-light-border dark:bg-[#171717]" />

                {/* Reading progress */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="font-display text-[9px] font-bold tracking-[0.26em] uppercase text-[#777] dark:text-[#3a3a3a]">Progress</p>
                    <span className="font-display text-[10px] font-bold text-[#777] dark:text-[#444]">{scrollPct}%</span>
                  </div>
                  <div className="h-[3px] bg-light-border dark:bg-[#161616] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-brand rounded-full"
                      style={{ width: `${scrollPct}%` }}
                      transition={{ duration: 0 }}
                    />
                  </div>
                </div>

                <div className="h-px bg-light-border dark:bg-[#171717]" />

                {/* Share */}
                <div>
                  <p className="font-display text-[9px] font-bold tracking-[0.26em] uppercase text-[#777] dark:text-[#3a3a3a] mb-3.5">
                    Share
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2.5 text-[12px] font-display text-[#777] dark:text-[#444] hover:text-[#0a0a0a] dark:hover:text-white transition-colors duration-200 group"
                    >
                      <span className="w-7 h-7 rounded-full border border-light-border dark:border-[#1e1e1e] flex items-center justify-center group-hover:border-[#aaa] dark:group-hover:border-[#333] transition-colors text-[11px]">
                        {copied ? "✓" : "⎘"}
                      </span>
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-[12px] font-display text-[#777] dark:text-[#444] hover:text-[#0a0a0a] dark:hover:text-white transition-colors duration-200 group"
                    >
                      <span className="w-7 h-7 rounded-full border border-light-border dark:border-[#1e1e1e] flex items-center justify-center group-hover:border-[#aaa] dark:group-hover:border-[#333] transition-colors text-[10px] font-black">
                        𝕏
                      </span>
                      Share on X
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-[12px] font-display text-[#777] dark:text-[#444] hover:text-[#0a0a0a] dark:hover:text-white transition-colors duration-200 group"
                    >
                      <span className="w-7 h-7 rounded-full border border-light-border dark:border-[#1e1e1e] flex items-center justify-center group-hover:border-[#aaa] dark:group-hover:border-[#333] transition-colors text-[9px] font-black">
                        in
                      </span>
                      LinkedIn
                    </a>
                  </div>
                </div>

              </div>
            </aside>

            {/* ══════════════ MAIN ARTICLE ══════════════ */}
            <article ref={articleRef} className="min-w-0">

              {/* Meta strip */}
              <div className="flex flex-wrap items-center gap-2.5 mb-10">
                <span className="inline-flex items-center gap-1.5 font-display text-[9px] font-bold tracking-[0.2em] uppercase text-red-brand border border-red-brand/30 bg-red-brand/[0.07] rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-brand flex-shrink-0" />
                  {category}
                </span>
                <span className="text-[#aaa] dark:text-[#2a2a2a]">·</span>
                <span className="font-display text-[11px] text-[#777] dark:text-[#444]">{date}</span>
                <span className="text-[#aaa] dark:text-[#2a2a2a]">·</span>
                <span className="font-display text-[11px] text-[#777] dark:text-[#444] flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  {readTime}
                </span>
                <span className="text-[#aaa] dark:text-[#2a2a2a]">·</span>
                <span className="font-display text-[11px] text-[#777] dark:text-[#444]">{wordCount.toLocaleString()} words</span>
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-[clamp(1.85rem,3.8vw,3rem)] text-[#0a0a0a] dark:text-white leading-[1.06] tracking-[-0.03em] mb-8">
                {title}
              </h1>

              {/* Lead */}
              <div className="relative border-l-2 border-red-brand pl-6 mb-14">
                <p className="font-body text-[1.1rem] text-light-muted dark:text-[#777] leading-[1.75]">{lead}</p>
              </div>

              {/* Body content */}
              <div className="space-y-7 font-body text-light-muted dark:text-[#999] text-[1rem] leading-[1.85]
                [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-[1.45rem] [&_h2]:text-[#0a0a0a] dark:[&_h2]:text-white [&_h2]:tracking-[-0.02em] [&_h2]:pt-6 [&_h2]:pb-1
                [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-[1.15rem] [&_h3]:text-[#222] dark:[&_h3]:text-[#ccc] [&_h3]:tracking-[-0.01em] [&_h3]:pt-4
                [&_strong]:text-[#0a0a0a] dark:[&_strong]:text-[#d0d0d0] [&_strong]:font-semibold
                [&_a]:text-red-brand [&_a]:underline-offset-2 [&_a]:decoration-red-brand/40 [&_a:hover]:decoration-red-brand
                [&_ul]:space-y-2.5 [&_ul]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-3">
                {children}
              </div>

              {/* Divider */}
              <div className="h-px bg-light-border dark:bg-[#161616] my-14" />

              {/* Mobile tags */}
              <div className="lg:hidden flex flex-wrap gap-2 mb-10">
                {tags.map(t => (
                  <span key={t} className="font-display text-[9px] font-bold tracking-[0.15em] uppercase text-[#777] dark:text-[#444] border border-light-border dark:border-[#1e1e1e] px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              {/* Bottom nav */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Link href="/insights" className="font-display font-bold text-[11px] tracking-[0.18em] uppercase text-[#777] dark:text-[#444] hover:text-[#0a0a0a] dark:hover:text-white transition-colors duration-200">
                  ← All Insights
                </Link>
                <Link
                  href={ctaHref}
                  className="sm:ml-auto inline-flex items-center gap-2 font-display font-bold text-[11px] tracking-[0.18em] uppercase bg-red-brand text-white px-7 py-3.5 rounded-full hover:bg-red-dark transition-colors duration-200"
                >
                  {ctaLabel} →
                </Link>
              </div>
            </article>

            {/* ══════════════ RIGHT SIDEBAR ══════════════ */}
            <aside className="hidden lg:flex flex-col">
              <div className="sticky top-24 flex flex-col gap-4">

                {/* Article stats card */}
                <div className="bg-light-surface dark:bg-[#0c0c0c] border border-light-border dark:border-[#171717] rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-light-border dark:border-[#141414]">
                    <p className="font-display text-[9px] font-bold tracking-[0.26em] uppercase text-[#777] dark:text-[#3a3a3a]">Article Info</p>
                  </div>
                  <div className="px-5 py-4 space-y-3.5">
                    {[
                      { label: "Reading time", value: readTime },
                      { label: "Word count",   value: wordCount.toLocaleString() },
                      { label: "Category",     value: category, red: true },
                      { label: "Published",    value: date },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between gap-4">
                        <span className="font-display text-[11px] text-[#777] dark:text-[#3d3d3d]">{row.label}</span>
                        <span className={`font-display text-[11px] font-bold ${row.red ? "text-red-brand" : "text-[#333] dark:text-[#888]"}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-light-surface dark:bg-[#0c0c0c] border border-light-border dark:border-[#171717] rounded-2xl px-5 py-4">
                  <p className="font-display text-[9px] font-bold tracking-[0.26em] uppercase text-[#777] dark:text-[#3a3a3a] mb-3.5">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(t => (
                      <span key={t} className="font-display text-[9px] font-bold tracking-[0.12em] uppercase text-[#777] dark:text-[#444] border border-light-border dark:border-[#1a1a1a] px-2.5 py-1.5 rounded-full hover:border-red-brand/50 hover:text-red-brand transition-colors cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-light-surface dark:bg-[#0c0c0c] border border-light-border dark:border-[#171717] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-light-border dark:border-[#141414]">
                      <p className="font-display text-[9px] font-bold tracking-[0.26em] uppercase text-[#777] dark:text-[#3a3a3a]">Also Read</p>
                    </div>
                    <div className="divide-y divide-light-border dark:divide-[#111]">
                      {relatedPosts.map(post => (
                        <Link key={post.href} href={post.href}
                          className="group flex flex-col gap-1.5 px-5 py-4 hover:bg-light-bg dark:hover:bg-white/[0.02] transition-colors duration-200">
                          <span className="font-display text-[9px] font-bold tracking-[0.18em] uppercase text-red-brand">{post.category}</span>
                          <span className="font-display text-[12px] font-semibold text-[#333] dark:text-[#666] group-hover:text-[#0a0a0a] dark:group-hover:text-white transition-colors duration-200 leading-snug">{post.title}</span>
                          <span className="font-display text-[10px] text-[#777] dark:text-[#333] flex items-center gap-1">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            {post.readTime}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-brand/20 to-red-brand/5 border border-red-brand/20" />
                  <div className="relative px-5 py-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-brand" />
                      <p className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-red-brand">Work with us</p>
                    </div>
                    <p className="font-display font-bold text-[13px] text-[#0a0a0a] dark:text-white leading-snug mb-2">
                      Ready to build something great?
                    </p>
                    <p className="font-body text-[11px] text-light-muted dark:text-[#666] mb-4 leading-relaxed">
                      WebGaze works with Australian businesses to build websites and brands that actually convert.
                    </p>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 font-display font-bold text-[10px] tracking-[0.18em] uppercase bg-red-brand text-white px-4 py-2.5 rounded-full hover:bg-red-dark transition-colors duration-200">
                      Get in touch →
                    </Link>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
