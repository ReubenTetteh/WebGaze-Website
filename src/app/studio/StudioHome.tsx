"use client";

// The Studio home — a visual board of every iteration we're trying, before
// any of it ships. Reads the registry, groups by status, lets us flip between
// All / Testing / Approved / Live. This page (and all of /studio) never
// deploys — it's our private place to play. See src/middleware.ts.

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  STUDIO_ENTRIES,
  STATUS_META,
  type StudioEntry,
  type StudioStatus,
} from "./registry";

const KIND_GLYPH: Record<StudioEntry["kind"], string> = {
  Reel: "▶",
  Post: "✦",
  Page: "❏",
};

type Filter = "all" | StudioStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "testing", label: "Testing" },
  { id: "approved", label: "Approved" },
  { id: "live", label: "Live" },
];

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
}

export default function StudioHome() {
  const [filter, setFilter] = useState<Filter>("all");

  const sorted = useMemo(
    () =>
      [...STUDIO_ENTRIES].sort((a, b) => b.updated.localeCompare(a.updated)),
    [],
  );

  const counts = useMemo(() => {
    const c = { all: sorted.length, testing: 0, approved: 0, live: 0 } as Record<
      Filter,
      number
    >;
    for (const e of sorted) if (e.status in c) c[e.status as Filter]++;
    return c;
  }, [sorted]);

  const shown = filter === "all" ? sorted : sorted.filter((e) => e.status === filter);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-red-brand" />
            WebGaze · Studio
          </div>
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            The Studio
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
            Every version we&rsquo;re trying, in one place. Iterate here, flip it
            to{" "}
            <span className="text-red-light">Approved</span> when it&rsquo;s right,
            ship it &mdash; then it goes <span className="text-emerald-300">Live</span>.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/50">
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 text-white/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
              <path d="M5 7V5a3 3 0 0 1 6 0v2" />
            </svg>
            Never deployed &mdash; this whole studio 404s in production. Local lab only.
          </div>
        </header>

        {/* Filter bar + counts */}
        <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4">
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm transition ${
                    on
                      ? "bg-white text-black"
                      : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {f.label}
                  <span
                    className={`font-mono text-xs ${on ? "text-black/50" : "text-white/35"}`}
                  >
                    {counts[f.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {shown.length === 0 ? (
          <p className="py-20 text-center text-white/40">
            Nothing {filter === "all" ? "here" : `in ${filter}`} yet.
          </p>
        ) : (
          <motion.div
            key={filter}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown.map((e) => (
              <Card key={e.id} entry={e} />
            ))}
          </motion.div>
        )}

        <footer className="mt-16 border-t border-white/10 pt-6 font-mono text-xs text-white/35">
          Add a new iteration → drop a route under{" "}
          <span className="text-white/55">src/app/studio/</span> and an entry in{" "}
          <span className="text-white/55">studio/registry.ts</span>.
        </footer>
      </div>
    </div>
  );
}

function Card({ entry }: { entry: StudioEntry }) {
  const s = STATUS_META[entry.status];

  return (
    <motion.a
      href={`/studio/${entry.id}`}
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-dark-surface transition-colors hover:border-white/25"
    >
      {/* Preview tile — graphite gradient, big kind glyph, format watermark. */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-dark-elevated to-black">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-6 select-none text-[8rem] leading-none text-white/[0.04] transition-transform duration-500 group-hover:scale-110"
        >
          {KIND_GLYPH[entry.kind]}
        </span>
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-white/70 backdrop-blur">
          {entry.kind}
        </div>
        <div
          className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[0.7rem] font-medium backdrop-blur ${s.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </div>
        <div className="absolute bottom-3 left-4 font-mono text-[0.7rem] text-white/40">
          /studio/{entry.id}
        </div>
        {/* thin red baseline — accent, not mood */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-brand transition-all duration-500 group-hover:w-full" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {entry.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/55">{entry.blurb}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-white/40">
          <span className="font-mono">{entry.format}</span>
          <span>Updated {fmtDate(entry.updated)}</span>
        </div>
      </div>
    </motion.a>
  );
}
