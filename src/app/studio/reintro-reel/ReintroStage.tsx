"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { portfolioProjects } from "@/lib/projects";

/**
 * PHASE 1 — the animated TEXT hook for the "WebGaze is new. The work is not."
 * reintroduction reel, built to be screen-recorded for Instagram.
 *
 * Two motion styles, switchable in the tool bar:
 *  • v2 (default) — editorial: words rise word-by-word from behind a mask,
 *    lift away to "clean", then the rebuttal reveals with "not." in red, a
 *    soft glow, and a red underline that draws beneath it.
 *  • v1 — the original typewriter (type → clear → type), kept for comparison.
 *
 * Conventions from /studio/ai-systems-post: true-export-px canvas that scales
 * to fit, format switch, replay + loop, tool bar OUTSIDE the frame. Dark brand
 * gradient + breathing red glow, soft grain + vignette. No grid/line overlays.
 */

type Format = "9:16" | "4:5" | "1:1";
type StyleVariant = "v2" | "v1";

type Cfg = { w: number; h: number; pad: number; kicker: number; hero: number; sub: number; tileW: number; tileH: number; tileGap: number };

const FORMATS: Record<Format, Cfg> = {
  "9:16": { w: 1080, h: 1920, pad: 110, kicker: 27, hero: 118, sub: 40, tileW: 360, tileH: 234, tileGap: 24 },
  "4:5": { w: 1080, h: 1350, pad: 96, kicker: 25, hero: 104, sub: 38, tileW: 320, tileH: 208, tileGap: 22 },
  "1:1": { w: 1080, h: 1080, pad: 88, kicker: 23, hero: 90, sub: 34, tileW: 300, tileH: 195, tileGap: 20 },
};

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN: [number, number, number, number] = [0.7, 0, 0.84, 0];

// ─────────────────────────────────────────────────────────────────────────────
// Shared chrome
// ─────────────────────────────────────────────────────────────────────────────

/** Measures the available area and returns a scale that fits w×h inside it. */
function useFitScale(w: number, h: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const next = Math.min(rect.width / w, rect.height / h);
      if (next > 0) setScale(next);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return { ref, scale };
}

/** Persistent minimal brand anchor — a single softly pulsing red dot. */
function BrandDot({ cfg }: { cfg: Cfg }) {
  return (
    <motion.span
      className="absolute left-1/2 rounded-full bg-red-brand"
      style={{ top: cfg.pad, width: 13, height: 13, marginLeft: -6.5, boxShadow: "0 0 22px rgba(224,27,36,0.7)" }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.18, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Background() {
  return (
    <>
      {/* breathing brand glow — gradient, never flat black or a grid */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(58% 44% at 50% -2%, rgba(224,27,36,0.30), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.88, 0.5], scale: [1, 1.07, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(76% 58% at 50% 116%, rgba(224,27,36,0.13), transparent 72%)" }}
      />
      {/* vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 52%, rgba(0,0,0,0.55) 100%)" }}
      />
      {/* soft film grain (texture, not a grid) */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "260px 260px",
        }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// v2 — editorial mask reveal
// ─────────────────────────────────────────────────────────────────────────────

type Token = string | { t: string; red?: boolean; underline?: boolean };
type Rows = Token[][];

const STATEMENT_1: Rows = [["WebGaze", "is", "new."]];
const STATEMENT_2: Rows = [["But", "the", "work"], ["is", { t: "not.", red: true, underline: true }]];

type WordState = "hidden" | "in" | "out";

function MaskWord({ tok, state, delay, hero }: { tok: Token; state: WordState; delay: number; hero: number }) {
  const isObj = typeof tok === "object";
  const text = isObj ? tok.t : tok;
  const red = isObj && !!tok.red;
  const underline = isObj && !!tok.underline;
  return (
    <span
      // the mask: hides the word until it rises into place; padding/margin keep descenders from clipping at rest
      style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.16em", marginBottom: "-0.16em", paddingTop: "0.04em", marginTop: "-0.04em" }}
    >
      <motion.span
        className={red ? "text-red-brand" : "text-white"}
        style={{ display: "inline-block", position: "relative", textShadow: red ? "0 0 38px rgba(224,27,36,0.5)" : undefined }}
        initial="hidden"
        animate={state}
        variants={{
          hidden: { y: "120%", opacity: 0 },
          in: { y: "0%", opacity: 1, transition: { duration: 0.74, ease: EXPO, delay } },
          out: { y: "-120%", opacity: 0, transition: { duration: 0.5, ease: EASE_IN, delay: delay * 0.25 } },
        }}
      >
        {text}
        {underline && (
          <motion.span
            aria-hidden
            className="absolute bg-red-brand"
            style={{ left: 0, right: 0, bottom: "-0.1em", height: Math.max(5, hero * 0.055), borderRadius: 99, transformOrigin: "left center", boxShadow: "0 0 20px rgba(224,27,36,0.5)" }}
            initial={{ scaleX: 0 }}
            animate={state === "in" ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.55, ease: EXPO, delay: state === "in" ? delay + 0.5 : 0 }}
          />
        )}
      </motion.span>
    </span>
  );
}

function Statement({ rows, state, cfg }: { rows: Rows; state: WordState; cfg: Cfg }) {
  let idx = 0;
  return (
    <div
      className="absolute inset-x-0 flex flex-col items-center text-center font-display font-extrabold text-white"
      style={{ top: "50%", transform: "translateY(-50%)", paddingInline: cfg.pad, fontSize: cfg.hero, lineHeight: 1.02, letterSpacing: "-0.035em", rowGap: cfg.hero * 0.02 }}
    >
      {rows.map((row, ri) => (
        <div key={ri} className="flex flex-wrap items-end justify-center" style={{ columnGap: cfg.hero * 0.24 }}>
          {row.map((tok, ti) => {
            const delay = idx * 0.08;
            idx += 1;
            return <MaskWord key={ti} tok={tok} state={state} delay={delay} hero={cfg.hero} />;
          })}
        </div>
      ))}
    </div>
  );
}

/** v2 hook: statement 1 in → clean → statement 2 in (with red "not." + underline). */
function HookSlideV2({ cfg, runKey, onDone }: { cfg: Cfg; runKey: number; onDone: () => void }) {
  const [beat, setBeat] = useState<"l1" | "l1out" | "l2">("l1");
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setBeat("l1");
    const reveal1 = 1050, hold1 = 1350, clear = 600, reveal2 = 1350, hold2 = 1900;
    const timers = [
      setTimeout(() => setBeat("l1out"), reveal1 + hold1),
      setTimeout(() => setBeat("l2"), reveal1 + hold1 + clear),
      setTimeout(() => doneRef.current(), reveal1 + hold1 + clear + reveal2 + hold2),
    ];
    return () => timers.forEach(clearTimeout);
  }, [runKey]);

  const s1: WordState = beat === "l1" ? "in" : "out";
  const s2: WordState = beat === "l2" ? "in" : "hidden";

  return (
    <div className="absolute inset-0">
      <BrandDot cfg={cfg} />
      <Statement rows={STATEMENT_1} state={s1} cfg={cfg} />
      <Statement rows={STATEMENT_2} state={s2} cfg={cfg} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// v1 — original typewriter (kept for comparison)
// ─────────────────────────────────────────────────────────────────────────────

const TW_A = "WebGaze is new.";
const TW_B = "But the work\nis not.";
const TW_RED = TW_B.indexOf("not.");

function useTypewriterSequence(runKey: number, onDone: () => void) {
  const [text, setText] = useState("");
  const [redStart, setRedStart] = useState<number | null>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const typeOut = async (full: string, speed: number, red: number | null) => {
      setRedStart(red);
      for (let i = 1; i <= full.length; i++) {
        if (cancelled) return;
        setText(full.slice(0, i));
        await sleep(speed);
      }
    };
    (async () => {
      setText(""); setRedStart(null);
      await sleep(450);
      await typeOut(TW_A, 72, null);
      if (cancelled) return;
      await sleep(950);
      setRedStart(null);
      for (let i = TW_A.length; i >= 0; i--) { if (cancelled) return; setText(TW_A.slice(0, i)); await sleep(34); }
      await sleep(240);
      await typeOut(TW_B, 72, TW_RED);
      if (cancelled) return;
      await sleep(1600);
      if (!cancelled) doneRef.current();
    })();
    return () => { cancelled = true; };
  }, [runKey]);
  return { text, redStart };
}

function HookSlideV1({ cfg, runKey, onDone }: { cfg: Cfg; runKey: number; onDone: () => void }) {
  const { text, redStart } = useTypewriterSequence(runKey, onDone);
  const normal = redStart == null ? text : text.slice(0, redStart);
  const red = redStart == null ? "" : text.slice(redStart);
  const size = cfg.hero;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ padding: cfg.pad, gap: size * 0.5 }}>
      <BrandDot cfg={cfg} />
      <div
        className="font-display font-extrabold text-white"
        style={{ fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", whiteSpace: "pre-wrap", maxWidth: cfg.w - cfg.pad * 2, minHeight: size * 2.2 }}
      >
        <span>{normal}</span>
        {red && <span className="text-red-brand">{red}</span>}
        <motion.span
          aria-hidden
          className="inline-block rounded-[2px] bg-red-brand align-middle"
          style={{ width: Math.max(6, size * 0.07), height: size * 0.92, marginLeft: size * 0.06 }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — animated portfolio wall (echoes the homepage HeroParallax):
// 3 rows of real work auto-scrolling in alternating directions, on a 3D tilt.
// ─────────────────────────────────────────────────────────────────────────────

type Project = (typeof portfolioProjects)[number];
type WallVariant = "tilt" | "flat" | "dense" | "columns";

// Splits of the 12 projects. InfiniteSlider duplicates each track for a seamless loop.
const ROWS_3: Project[][] = [portfolioProjects.slice(0, 4), portfolioProjects.slice(4, 8), portfolioProjects.slice(8, 12)];
const ROWS_4: Project[][] = [portfolioProjects.slice(0, 3), portfolioProjects.slice(3, 6), portfolioProjects.slice(6, 9), portfolioProjects.slice(9, 12)];
// 4 vertical columns of 6, offset so each column reads differently.
const COLS_4: Project[][] = [0, 1, 2, 3].map((i) => Array.from({ length: 6 }, (_, k) => portfolioProjects[(i * 3 + k) % portfolioProjects.length]));

const EDGE_X = "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)";
const EDGE_Y = "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)";

function WallTile({ p, w, h }: { p: Project; w: number; h: number }) {
  return (
    <div className="relative shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10" style={{ width: w, height: h, boxShadow: "0 26px 60px rgba(0,0,0,0.55)" }}>
      <img src={p.image} alt={p.name} draggable={false} className="h-full w-full object-cover object-top" />
      <span className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${p.accent}33` }} />
      <div className="absolute inset-x-0 bottom-0 flex items-center" style={{ gap: 8, padding: `${Math.round(h * 0.13)}px 14px 11px`, background: "linear-gradient(to top, rgba(0,0,0,0.82), transparent)" }}>
        <span className="inline-block rounded-full" style={{ width: 7, height: 7, background: p.accent }} />
        <span className="truncate font-display font-semibold text-white/90" style={{ fontSize: Math.max(13, h * 0.085), letterSpacing: "-0.01em" }}>{p.name}</span>
      </div>
    </div>
  );
}

function HRow({ items, w, h, gap, duration, reverse }: { items: Project[]; w: number; h: number; gap: number; duration: number; reverse: boolean }) {
  return (
    <div style={{ maskImage: EDGE_X, WebkitMaskImage: EDGE_X }}>
      <InfiniteSlider gap={gap} duration={duration} reverse={reverse}>
        {items.map((p, i) => <WallTile key={`${p.slug}-${i}`} p={p} w={w} h={h} />)}
      </InfiniteSlider>
    </div>
  );
}

function VCol({ items, w, h, gap, duration, reverse, frameH }: { items: Project[]; w: number; h: number; gap: number; duration: number; reverse: boolean; frameH: number }) {
  return (
    <div style={{ height: frameH, maskImage: EDGE_Y, WebkitMaskImage: EDGE_Y }}>
      <InfiniteSlider direction="vertical" gap={gap} duration={duration} reverse={reverse}>
        {items.map((p, i) => <WallTile key={`${p.slug}-${i}`} p={p} w={w} h={h} />)}
      </InfiniteSlider>
    </div>
  );
}

/** Horizontal rows, optionally on a 3D tilt. */
function HorizontalWall({ rows, cfg, tileW, tileH, durations, tilt }: { rows: Project[][]; cfg: Cfg; tileW: number; tileH: number; durations: number[]; tilt: { rx: number; rz: number; s: number } | null }) {
  const tracks = rows.map((items, i) => (
    <HRow key={i} items={items} w={tileW} h={tileH} gap={cfg.tileGap} duration={durations[i % durations.length]} reverse={i % 2 === 1} />
  ));
  if (tilt) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1500 }}>
        <motion.div
          className="flex flex-col"
          style={{ width: "164%", rowGap: cfg.tileGap, transformStyle: "preserve-3d" }}
          initial={{ rotateX: tilt.rx + 7, rotateZ: tilt.rz - 1, scale: tilt.s - 0.1, opacity: 0 }}
          animate={{ rotateX: tilt.rx, rotateZ: tilt.rz, scale: tilt.s, opacity: 1 }}
          transition={{ duration: 1.2, ease: EXPO }}
        >
          {tracks}
        </motion.div>
      </div>
    );
  }
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ rowGap: cfg.tileGap, width: "100%" }}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EXPO }}
    >
      {tracks}
    </motion.div>
  );
}

/** Vertical columns scrolling up/down. */
function VerticalWall({ cols, cfg, tileW, tileH, durations }: { cols: Project[][]; cfg: Cfg; tileW: number; tileH: number; durations: number[] }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-stretch justify-center"
      style={{ columnGap: cfg.tileGap }}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EXPO }}
    >
      {cols.map((items, i) => (
        <VCol key={i} items={items} w={tileW} h={tileH} gap={cfg.tileGap} duration={durations[i % durations.length]} reverse={i % 2 === 1} frameH={cfg.h} />
      ))}
    </motion.div>
  );
}

function PortfolioWall({ cfg, variant }: { cfg: Cfg; variant: WallVariant }) {
  const r = (m: number) => Math.round(cfg.tileW * m);
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5, ease: EXPO } }} transition={{ duration: 0.6, ease: EXPO }}>
      <BrandDot cfg={cfg} />

      {variant === "tilt" && <HorizontalWall rows={ROWS_3} cfg={cfg} tileW={cfg.tileW} tileH={cfg.tileH} durations={[36, 29, 40]} tilt={{ rx: 11, rz: -6, s: 1.1 }} />}
      {variant === "flat" && <HorizontalWall rows={ROWS_3} cfg={cfg} tileW={r(1.06)} tileH={Math.round(cfg.tileH * 1.06)} durations={[34, 28, 38]} tilt={null} />}
      {variant === "dense" && <HorizontalWall rows={ROWS_4} cfg={cfg} tileW={r(0.74)} tileH={Math.round(cfg.tileH * 0.74)} durations={[30, 36, 26, 40]} tilt={{ rx: 8, rz: -4, s: 1.06 }} />}
      {variant === "columns" && <VerticalWall cols={COLS_4} cfg={cfg} tileW={r(0.7)} tileH={Math.round(cfg.tileH * 0.7)} durations={[34, 28, 38, 30]} />}

      {/* top + bottom scrims seat the kicker and fade the wall into the frame */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10" style={{ height: cfg.h * 0.2, background: "linear-gradient(to bottom, #0E0E11, transparent)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" style={{ height: cfg.h * 0.18, background: "linear-gradient(to top, #0E0E11, transparent)" }} />

      <motion.div
        className="absolute inset-x-0 z-20 flex items-center justify-center"
        style={{ top: cfg.pad * 1.4, gap: 13 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EXPO }}
      >
        <span className="inline-block rounded-full bg-red-brand" style={{ width: 11, height: 11 }} />
        <span className="font-display font-semibold uppercase text-white/80" style={{ fontSize: cfg.kicker, letterSpacing: "0.34em" }}>Selected work</span>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — closing call-to-action (matches the v2 editorial language)
// ─────────────────────────────────────────────────────────────────────────────

const CTA_HEAD: Token[] = ["Request", "a", { t: "proposal.", red: true, underline: true }];

function CtaSlide({ cfg }: { cfg: Cfg }) {
  const headSize = cfg.hero * 0.92;
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
      style={{ padding: cfg.pad, gap: cfg.hero * 0.32 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: EXPO } }}
      transition={{ duration: 0.5, ease: EXPO }}
    >
      <motion.img
        src="/images/logo-white-cropped.png"
        alt="WebGaze"
        style={{ height: cfg.hero * 0.5, width: "auto" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
      />

      <div
        className="flex flex-wrap items-end justify-center font-display font-extrabold text-white"
        style={{ fontSize: headSize, lineHeight: 1.02, letterSpacing: "-0.035em", columnGap: headSize * 0.24 }}
      >
        {CTA_HEAD.map((tok, i) => (
          <MaskWord key={i} tok={tok} state="in" delay={0.28 + i * 0.08} hero={headSize} />
        ))}
      </div>

      <motion.div
        className="font-body text-white/55"
        style={{ fontSize: cfg.sub }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.78, duration: 0.6, ease: EXPO }}
      >
        No pressure. Just next steps.
      </motion.div>

      <motion.div
        className="inline-flex items-center rounded-full bg-red-brand font-display font-semibold text-white"
        style={{ paddingInline: cfg.hero * 0.36, paddingBlock: cfg.hero * 0.18, fontSize: cfg.sub * 0.95, gap: 14, boxShadow: "0 18px 50px rgba(224,27,36,0.35)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.035, 1] }}
        transition={{ opacity: { delay: 1, duration: 0.55 }, y: { delay: 1, duration: 0.55, ease: EXPO }, scale: { delay: 1.7, duration: 1.9, repeat: Infinity, ease: "easeInOut" } }}
      >
        webgaze.com.au <span aria-hidden>→</span>
      </motion.div>

      <motion.div
        className="font-body text-white/40"
        style={{ fontSize: cfg.sub * 0.62, letterSpacing: "0.06em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.6 }}
      >
        Websites · AI &amp; custom systems · Sydney, Australia
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage + tool bar
// ─────────────────────────────────────────────────────────────────────────────

type View = "full" | "text" | "wall" | "cta";
type Phase = "text" | "wall" | "cta";

function startPhase(view: View): Phase {
  return view === "cta" ? "cta" : view === "wall" ? "wall" : "text";
}

function Stage({ cfg, runKey, styleVariant, wallVariant, view, onCycleEnd }: { cfg: Cfg; runKey: number; styleVariant: StyleVariant; wallVariant: WallVariant; view: View; onCycleEnd: () => void }) {
  const [phase, setPhase] = useState<Phase>(startPhase(view));
  useEffect(() => setPhase(startPhase(view)), [runKey, view]);

  // wall → cta (only in the full sequence; wall-only review just keeps scrolling)
  useEffect(() => {
    if (phase !== "wall" || view !== "full") return;
    const id = setTimeout(() => setPhase("cta"), 6500);
    return () => clearTimeout(id);
  }, [phase, view]);

  // cta hold → end cycle (loops in full + cta views)
  useEffect(() => {
    if (phase !== "cta") return;
    const id = setTimeout(() => onCycleEnd(), 3800);
    return () => clearTimeout(id);
  }, [phase, onCycleEnd]);

  const Hook = styleVariant === "v2" ? HookSlideV2 : HookSlideV1;
  const onHookDone = () => (view === "full" ? setPhase("wall") : onCycleEnd());

  return (
    <div
      className="dark relative overflow-hidden font-body text-white"
      style={{ width: cfg.w, height: cfg.h, background: "linear-gradient(157deg, #15151B 0%, #0E0E11 46%, #120A0C 100%)" }}
    >
      <Background />
      <AnimatePresence mode="wait">
        {phase === "text" && (
          <motion.div key={`text-${runKey}`} className="absolute inset-0" exit={{ opacity: 0, y: -30, scale: 1.025, transition: { duration: 0.6, ease: EXPO } }}>
            <Hook cfg={cfg} runKey={runKey} onDone={onHookDone} />
          </motion.div>
        )}
        {phase === "wall" && <PortfolioWall key={`wall-${runKey}-${wallVariant}`} cfg={cfg} variant={wallVariant} />}
        {phase === "cta" && <CtaSlide key={`cta-${runKey}`} cfg={cfg} />}
      </AnimatePresence>
    </div>
  );
}

const WALL_VARIANTS: WallVariant[] = ["tilt", "flat", "dense", "columns"];
const VIEWS: View[] = ["full", "text", "wall", "cta"];

export default function ReintroStage() {
  const [format, setFormat] = useState<Format>("9:16");
  const [styleVariant, setStyleVariant] = useState<StyleVariant>("v2");
  const [wallVariant, setWallVariant] = useState<WallVariant>("tilt");
  const [view, setView] = useState<View>("full");
  const [runKey, setRunKey] = useState(0);
  const [autoLoop, setAutoLoop] = useState(true);
  const cfg = FORMATS[format];
  const { ref, scale } = useFitScale(cfg.w, cfg.h);

  const replay = () => setRunKey((k) => k + 1);
  const onCycleEnd = () => { if (autoLoop) setRunKey((k) => k + 1); };

  const seg = "flex overflow-hidden rounded-lg border border-white/15";
  const btn = (active: boolean) => cn("px-3 py-1.5 font-mono text-xs transition-colors", active ? "bg-red-brand text-white" : "text-white/60 hover:bg-white/10");

  return (
    <main className="fixed inset-0 flex flex-col bg-neutral-950 text-white">
      {/* Tooling bar — OUTSIDE the frame; crop to the framed area when recording. */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-neutral-900/80 px-4 py-3 text-sm backdrop-blur">
        <span className="mr-1 font-semibold tracking-wide text-white/90">WebGaze Studio · Reintro</span>
        <div className={seg}>
          {(Object.keys(FORMATS) as Format[]).map((f) => (
            <button key={f} onClick={() => setFormat(f)} className={btn(format === f)}>{f}</button>
          ))}
        </div>
        <div className={seg} title="text style">
          {(["v2", "v1"] as StyleVariant[]).map((v) => (
            <button key={v} onClick={() => { setStyleVariant(v); setRunKey((k) => k + 1); }} className={btn(styleVariant === v)}>{v}</button>
          ))}
        </div>
        <div className={seg} title="wall variation">
          {WALL_VARIANTS.map((v) => (
            <button key={v} onClick={() => { setWallVariant(v); setRunKey((k) => k + 1); }} className={btn(wallVariant === v)}>{v}</button>
          ))}
        </div>
        <div className={seg} title="jump to section">
          {VIEWS.map((v) => (
            <button key={v} onClick={() => { setView(v); setRunKey((k) => k + 1); }} className={btn(view === v)}>{v}</button>
          ))}
        </div>
        <button onClick={replay} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10">↺ Replay</button>
        <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-white/70">
          <input type="checkbox" checked={autoLoop} onChange={(e) => setAutoLoop(e.target.checked)} className="accent-red-brand" />
          Loop
        </label>
        <span className="ml-auto text-xs text-white/40">{cfg.w}×{cfg.h} · {styleVariant} · {wallVariant} · {view} · record only the framed area</span>
      </div>

      {/* Fit area */}
      <div ref={ref} className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        <div className="shrink-0 origin-center overflow-hidden rounded-[14px] shadow-2xl ring-1 ring-white/10" style={{ width: cfg.w, height: cfg.h, transform: `scale(${scale})` }}>
          <Stage cfg={cfg} runKey={runKey} styleVariant={styleVariant} wallVariant={wallVariant} view={view} onCycleEnd={onCycleEnd} />
        </div>
      </div>
    </main>
  );
}
