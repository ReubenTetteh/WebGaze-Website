// The Studio registry — the single source of truth for the /studio home page.
//
// Every iteration we build under /studio gets ONE entry here. The home page
// reads this list and renders a card per experiment, grouped by status. When
// something is approved or shipped, change its `status` (and add `liveAt`) —
// nothing else needs to move. The studio itself is never deployed (see
// src/middleware.ts), so this is purely our local iteration board.

export type StudioStatus = "testing" | "approved" | "live" | "archived";
export type StudioKind = "Reel" | "Post" | "Page";

export interface StudioEntry {
  /** Route slug under /studio — the card links to `/studio/{id}`. */
  id: string;
  title: string;
  kind: StudioKind;
  status: StudioStatus;
  /** One tight line. No repetition — say what it is, not what it could be. */
  blurb: string;
  /** Export/target format, shown as a small tag. */
  format: string;
  /** ISO date this iteration was last touched. */
  updated: string;
  /** Where it lives once it ships — page route or social channel. Optional. */
  shipsTo?: string;
}

// Order doesn't matter — the home page sorts by `updated`. Newest stays on top.
export const STUDIO_ENTRIES: StudioEntry[] = [
  {
    id: "portfolio-concepts",
    title: "Portfolio v2",
    kind: "Page",
    status: "testing",
    blurb: "Reworking “Our Work” — v1 is stacking cards; v2/v3 reserved for the next codes.",
    format: "Web page",
    updated: "2026-06-05",
    shipsTo: "/work",
  },
  {
    id: "cpa-case-study",
    title: "CPA Case Study",
    kind: "Page",
    status: "testing",
    blurb: "Light-led case study for the CPA build — tight copy, shows the whole site.",
    format: "Web page",
    updated: "2026-06-05",
    shipsTo: "/work/cpa",
  },
  {
    id: "phyto-case-study",
    title: "PhytoScience Case Study",
    kind: "Page",
    status: "live",
    blurb: "Forest-green, science-led case study — real captures, core values, every page.",
    format: "Web page",
    updated: "2026-06-05",
    shipsTo: "/projects/phytoscience-australia",
  },
  {
    id: "winstamac-case-study",
    title: "WINSTAMAC Case Study",
    kind: "Page",
    status: "live",
    blurb: "Light-led, architecture-led case study — real captures, house-plan marketplace, every page.",
    format: "Web page",
    updated: "2026-06-05",
    shipsTo: "/projects/winstamac",
  },
  {
    id: "salaka-case-study",
    title: "Salaka Dance Ensemble Case Study",
    kind: "Page",
    status: "live",
    blurb: "Light-led, performance-led case study — real captures, four service lines, all ten pages.",
    format: "Web page",
    updated: "2026-06-05",
    shipsTo: "/projects/salaka-dance-ensemble",
  },
  {
    id: "sababa-case-study",
    title: "Sababa Global Case Study",
    kind: "Page",
    status: "testing",
    blurb: "Light-led, freight-led case study — real captures, eight service lines, all ten pages.",
    format: "Web page",
    updated: "2026-06-05",
    shipsTo: "/work/sababa-global",
  },
  {
    id: "reintro-promo",
    title: "Reintro Promo",
    kind: "Reel",
    status: "testing",
    blurb: "Full 10-beat red-led rebuild of the inspiration template — strobe montage to end card.",
    format: "9:16 · 4:5 · 1:1",
    updated: "2026-06-04",
    shipsTo: "Instagram",
  },
  {
    id: "reintro-reel",
    title: "Reintro Reel",
    kind: "Reel",
    status: "approved",
    blurb: "“WebGaze is new. The work is not.” Typewriter hook → portfolio wall → red CTA.",
    format: "9:16 · 4:5 · 1:1",
    updated: "2026-06-04",
    shipsTo: "Instagram",
  },
  {
    id: "ai-systems-post",
    title: "AI Systems Post",
    kind: "Post",
    status: "approved",
    blurb: "Editorial graphite kinetic-typography post — the business problem is the hero.",
    format: "1080 · 9:16 · 4:5 · 1:1",
    updated: "2026-06-03",
    shipsTo: "Instagram",
  },
];

export const STATUS_META: Record<
  StudioStatus,
  { label: string; note: string; dot: string; ring: string; text: string }
> = {
  testing: {
    label: "Testing",
    note: "In the lab — playing with it.",
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    text: "text-amber-300",
  },
  approved: {
    label: "Approved",
    note: "Reuben likes it — ready to ship.",
    dot: "bg-red-brand",
    ring: "ring-red-brand/30",
    text: "text-red-light",
  },
  live: {
    label: "Live",
    note: "Shipped to production.",
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/30",
    text: "text-emerald-300",
  },
  archived: {
    label: "Archived",
    note: "Parked — kept for reference.",
    dot: "bg-white/40",
    ring: "ring-white/15",
    text: "text-white/50",
  },
};
