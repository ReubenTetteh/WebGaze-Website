"use client";

// Portfolio "version two" — iteration cockpit (the /versions skill).
// One page, every concept a click away. The "Our Work" header is shared;
// the body concept is switched by the `variant` toggle. v2 and v3 are
// reserved for the next codes — add them as options, never replace v1.

import { useState } from "react";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import StackingCards, { type ProjectData } from "@/components/ui/stacking-card";
import { portfolioProjects } from "@/lib/projects";

const VARIANTS = [
  { id: "v1", label: "v1 · Stacking cards", ready: true },
  { id: "v2", label: "v2 · (next code)", ready: false },
  { id: "v3", label: "v3 · (next code)", ready: false },
] as const;
type V = (typeof VARIANTS)[number]["id"];

// Real portfolio → the stacking-card shape. Real work is the hero (brand rule).
const stackingProjects: ProjectData[] = portfolioProjects
  .slice(0, 6)
  .map((p) => ({
    title: p.name,
    description: p.summary,
    link: p.image,
    color: p.accent,
    href: `/projects/${p.slug}`,
  }));

export function PortfolioConceptsStage() {
  const [variant, setVariant] = useState<V>("v1");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const seg = "flex overflow-hidden rounded-lg border border-white/15";
  const btn = (on: boolean, ready = true) =>
    `px-3 py-1.5 font-mono text-xs whitespace-nowrap ${
      on
        ? "bg-white text-black"
        : ready
          ? "text-white/70 hover:bg-white/10"
          : "text-white/30"
    }`;

  return (
    <div className="min-h-screen bg-black">
      {/* TOOL BAR — outside the artifact, sticky so it survives the long scroll */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-3 border-b border-white/10 bg-black/90 px-4 py-3 text-sm text-white backdrop-blur">
        <span className="font-semibold">Portfolio v2</span>
        <div className={seg}>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => v.ready && setVariant(v.id)}
              disabled={!v.ready}
              className={btn(variant === v.id, v.ready)}
              title={v.ready ? v.label : "Send me the code for this variant"}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className={seg}>
          {(["dark", "light"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={btn(theme === t)}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-xs text-white/40">
          Our Work header · {variant}
        </span>
      </div>

      {/* ARTIFACT — themed wrapper so the header's CSS-var tokens follow the toggle */}
      <div className={theme === "dark" ? "dark bg-black" : "bg-white"}>
        {/* Shared header: "Our Work", no View-gallery button, real portfolio items */}
        <PortfolioGallery />

        {/* Body concept */}
        {variant === "v1" && (
          <StackingCards projects={stackingProjects} lenis={false} />
        )}
      </div>
    </div>
  );
}
