import type { CSSProperties } from "react";

export type BrowsePage = { src: string; url: string };

/**
 * Realistic MacBook mockup with an auto-sliding browser inside the lid — it
 * glides through up to three page screenshots (home → about → services and
 * back), so the section reads like someone browsing the live site.
 *
 * Designed for exactly three pages (the `browse` keyframe in globals.css steps
 * through 3 panels). The first page's `url` is shown in the address bar.
 */
export default function BrowserSlider({ pages, duration = "14s" }: { pages: BrowsePage[]; duration?: string }) {
  const style = { "--duration": duration } as CSSProperties;

  return (
    <div className="flex flex-col items-center">
      {/* Lid / screen */}
      <div className="relative w-full rounded-t-[16px] bg-[#1b1c1f] p-[11px] pb-[13px] shadow-[0_22px_50px_-26px_rgba(10,10,10,0.5)] ring-1 ring-black/40">
        {/* webcam */}
        <span className="absolute left-1/2 top-[4px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#34353a]" />

        <div className="relative overflow-hidden rounded-[5px] bg-white">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-black/10 bg-[#f1f1f3] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex min-w-0 items-center gap-1.5 rounded-md bg-black/[0.06] px-2.5 py-1 font-body text-[11px] text-black/45">
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 shrink-0" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span className="truncate">{pages[0]?.url}</span>
            </span>
          </div>

          {/* page track */}
          <div className="relative h-[280px] overflow-hidden md:h-[360px]">
            <div className="flex h-full w-[300%] animate-browse" style={style}>
              {pages.map((page) => (
                <div key={page.src} className="relative h-full w-1/3 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative viewport screenshot */}
                  {/* Eager so all three frames are ready before the visitor scrolls
                      to this section — the slider auto-plays and must not pop in. */}
                  <img src={page.src} alt="" loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Base / deck — slightly wider than the lid */}
      <div className="relative h-[12px] w-[107%] rounded-b-[11px] bg-gradient-to-b from-[#cfd2d7] to-[#a4a8ae] shadow-[0_14px_22px_-12px_rgba(10,10,10,0.45)]">
        <span className="absolute left-1/2 top-0 h-[5px] w-20 -translate-x-1/2 rounded-b-[7px] bg-[#9a9ea4]" />
      </div>
    </div>
  );
}
