"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShimmerText } from "@/components/ui/shimmer-text";
import { SpecialText } from "@/components/ui/special-text";
import { cn } from "@/lib/utils";

/**
 * Animated Instagram post, built to be screen-recorded. Direction: editorial,
 * near-monochrome graphite — generous negative space, left-aligned type, and a
 * single thin RED thread used sparingly (an underline that draws under the key
 * word, the live index digit, the CTA). Red is the accent, not the mood.
 *
 * Motion idea: kinetic word-swap. Beat 1 cycles the "where your business
 * actually runs" through scrambling words (special-text), then it resolves to
 * one system, then the payoff. Plays/loops like a short video.
 *
 * Canvas renders at true export px and scales to fit. No grid/line overlays.
 */

type Format = "9:16" | "4:5" | "1:1";

type Cfg = {
  w: number;
  h: number;
  pad: number;
  kicker: number;
  lead: number; // the smaller setup line
  word: number; // the big kinetic word
  h1: number; // big statement
  sub: number;
  cta: number;
  gap: number;
};

const FORMATS: Record<Format, Cfg> = {
  "9:16": { w: 1080, h: 1920, pad: 112, kicker: 27, lead: 58, word: 100, h1: 92, sub: 40, cta: 30, gap: 30 },
  "4:5": { w: 1080, h: 1350, pad: 96, kicker: 25, lead: 52, word: 90, h1: 84, sub: 37, cta: 29, gap: 26 },
  "1:1": { w: 1080, h: 1080, pad: 84, kicker: 23, lead: 46, word: 78, h1: 72, sub: 34, cta: 27, gap: 22 },
};

// Where a business "actually" runs — scrambles through these in beat 1.
const WORDS = ["spreadsheets", "email threads", "sticky notes", "memory", "guesswork"];
const BEAT_KICKERS = ["The hard way", "The fix", "The result"];

// How long each beat holds before advancing (ms).
const SLIDE_MS = [4400, 3600, 4800];
const SLIDE_COUNT = SLIDE_MS.length;
const WORD_MS = Math.floor(SLIDE_MS[0] / WORDS.length);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Neutral, slightly warm graphite — never pure black, never red-washed.
const BG = "linear-gradient(162deg, #1C1B1F 0%, #111014 54%, #171619 100%)";
// Greyscale film grain (no lines) for premium texture.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const sceneVariants = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -22 },
};

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

function Reveal({
  delay = 0,
  className,
  style,
  children,
}: {
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 + delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** The thin red line that draws in under a key word — the single red "thread". */
function RedRule({ delay = 0, height = 4 }: { delay?: number; height?: number }) {
  return (
    <motion.div
      className="mt-3 w-full origin-left rounded-full bg-red-brand"
      style={{ height }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.15 + delay, ease: EASE }}
    />
  );
}

function Kicker({ cfg, label }: { cfg: Cfg; label: string }) {
  return (
    <Reveal delay={0} className="flex items-center" style={{ gap: 14, marginBottom: cfg.gap * 0.4 }}>
      <span className="bg-red-brand" style={{ width: 30, height: 3 }} />
      <span
        className="font-mono uppercase text-white/45"
        style={{ fontSize: cfg.kicker, letterSpacing: "0.28em" }}
      >
        {label}
      </span>
    </Reveal>
  );
}

/** BEAT 1 — kinetic word swap. */
function BeatProblem({ cfg, wordIndex }: { cfg: Cfg; wordIndex: number }) {
  return (
    <>
      <Kicker cfg={cfg} label={BEAT_KICKERS[0]} />
      <Reveal
        delay={0.1}
        className="font-display font-medium text-white/55"
        style={{ fontSize: cfg.lead, lineHeight: 1.1, letterSpacing: "-0.01em" }}
      >
        Your business still runs on
      </Reveal>
      <Reveal delay={0.24} className="inline-flex flex-col items-start" style={{ marginTop: cfg.gap * 0.3 }}>
        <span
          className="font-display font-extrabold text-white"
          style={{ fontSize: cfg.word, lineHeight: 1.0, letterSpacing: "-0.03em" }}
        >
          <SpecialText key={wordIndex} speed={14} className="!leading-[1] whitespace-nowrap">
            {WORDS[wordIndex]}
          </SpecialText>
        </span>
        {/* underline redraws on every word swap */}
        <motion.div
          key={`rule-${wordIndex}`}
          className="mt-4 w-full origin-left rounded-full bg-red-brand"
          style={{ height: 5 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </Reveal>
    </>
  );
}

/** BEAT 2 — the fix. */
function BeatFix({ cfg }: { cfg: Cfg }) {
  return (
    <>
      <Kicker cfg={cfg} label={BEAT_KICKERS[1]} />
      <Reveal delay={0.1}>
        <span
          className="font-display font-extrabold"
          style={{ fontSize: cfg.h1, lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          <span className="text-white/55">It should run on </span>
          <span className="inline-flex flex-col items-start align-bottom">
            <span className="text-white">one system.</span>
            <RedRule delay={0.45} height={5} />
          </span>
        </span>
      </Reveal>
      <Reveal
        delay={0.55}
        className="font-body text-white/55"
        style={{ fontSize: cfg.sub, lineHeight: 1.45, maxWidth: cfg.w - cfg.pad * 2.2, marginTop: cfg.gap * 0.4 }}
      >
        Custom-built around how you actually work — and AI quietly handles the
        busywork in the background.
      </Reveal>
    </>
  );
}

/** BEAT 3 — payoff + CTA. */
function BeatResult({ cfg }: { cfg: Cfg }) {
  return (
    <>
      <Kicker cfg={cfg} label={BEAT_KICKERS[2]} />
      <Reveal
        delay={0.1}
        className="font-display font-extrabold text-white"
        style={{ fontSize: cfg.h1 * 1.18, lineHeight: 1.0, letterSpacing: "-0.04em" }}
      >
        <span className="block text-white/55">Less admin.</span>
        <span className="inline-flex items-end">
          <ShimmerText delay={0.5} duration={2} className="block text-white">
            More business
          </ShimmerText>
          <span className="text-red-brand">.</span>
        </span>
      </Reveal>

      <Reveal
        delay={0.5}
        className="flex flex-col items-start"
        style={{ gap: 18, marginTop: cfg.gap * 0.9 }}
      >
        <motion.span
          className="inline-flex items-center rounded-full bg-red-brand font-display font-semibold uppercase tracking-wide text-white"
          style={{ paddingInline: 42, paddingBlock: 22, fontSize: cfg.cta, gap: 14 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          Book a free systems audit
          <span aria-hidden>→</span>
        </motion.span>
        <span className="font-mono text-white/40" style={{ fontSize: cfg.cta - 3, letterSpacing: "0.06em" }}>
          webgaze.com.au
        </span>
      </Reveal>
    </>
  );
}

function TopBar({ cfg, slide }: { cfg: Cfg; slide: number }) {
  return (
    <div
      className="absolute left-0 right-0 z-20 flex items-center justify-between"
      style={{ top: cfg.pad * 0.6, paddingLeft: cfg.pad, paddingRight: cfg.pad }}
    >
      <span
        className="font-display font-bold uppercase text-white/70"
        style={{ fontSize: cfg.kicker, letterSpacing: "0.32em" }}
      >
        WebGaze
      </span>
      <span className="font-mono tabular-nums text-white/35" style={{ fontSize: cfg.kicker, letterSpacing: "0.1em" }}>
        <span className="text-red-brand">0{slide + 1}</span> / 0{SLIDE_COUNT}
      </span>
    </div>
  );
}

function Stage({ cfg, slide, wordIndex, runKey }: { cfg: Cfg; slide: number; wordIndex: number; runKey: number }) {
  return (
    <div className="relative overflow-hidden font-body text-white" style={{ width: cfg.w, height: cfg.h, background: BG }}>
      {/* soft neutral light for depth (not red) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(75% 55% at 22% 8%, rgba(255,255,255,0.06), transparent 60%)" }}
      />
      {/* a single faint red ember, far corner — a hint of brand warmth only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(48% 40% at 108% 104%, rgba(224,27,36,0.10), transparent 66%)" }}
      />
      {/* greyscale grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "150px 150px", opacity: 0.05, mixBlendMode: "overlay" }}
      />

      <TopBar cfg={cfg} slide={slide} />

      <AnimatePresence>
        <motion.div
          key={`${runKey}-${slide}`}
          className="absolute inset-0 z-10 flex flex-col items-start justify-center text-left"
          style={{ paddingLeft: cfg.pad, paddingRight: cfg.pad, paddingTop: cfg.pad, paddingBottom: cfg.pad, gap: cfg.gap * 0.5 }}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.55, ease: EASE }}
        >
          {slide === 0 && <BeatProblem cfg={cfg} wordIndex={wordIndex} />}
          {slide === 1 && <BeatFix cfg={cfg} />}
          {slide === 2 && <BeatResult cfg={cfg} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PostStage() {
  const [format, setFormat] = useState<Format>("9:16");
  const [slide, setSlide] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [autoLoop, setAutoLoop] = useState(true);
  const cfg = FORMATS[format];
  const { ref, scale } = useFitScale(cfg.w, cfg.h);

  // Advance beats like a video; loop the whole sequence if enabled.
  useEffect(() => {
    const id = setTimeout(() => {
      if (slide < SLIDE_COUNT - 1) {
        setSlide(slide + 1);
      } else if (autoLoop) {
        setRunKey((k) => k + 1);
        setSlide(0);
      }
    }, SLIDE_MS[slide]);
    return () => clearTimeout(id);
  }, [slide, runKey, autoLoop]);

  // Cycle the kinetic word only while beat 1 is on screen.
  useEffect(() => {
    if (slide !== 0) {
      setWordIndex(0);
      return;
    }
    setWordIndex(0);
    const id = setInterval(() => {
      setWordIndex((i) => Math.min(i + 1, WORDS.length - 1));
    }, WORD_MS);
    return () => clearInterval(id);
  }, [slide, runKey]);

  const replay = () => {
    setRunKey((k) => k + 1);
    setSlide(0);
  };

  return (
    <main className="fixed inset-0 flex flex-col bg-neutral-950 text-white">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-neutral-900/80 px-4 py-3 text-sm backdrop-blur">
        <span className="mr-1 font-semibold tracking-wide text-white/90">WebGaze Studio</span>
        <div className="flex overflow-hidden rounded-lg border border-white/15">
          {(Object.keys(FORMATS) as Format[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "px-3 py-1.5 font-mono text-xs transition-colors",
                format === f ? "bg-red-brand text-white" : "text-white/60 hover:bg-white/10",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={replay}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10"
        >
          ↺ Replay
        </button>
        <div className="flex overflow-hidden rounded-lg border border-white/15">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={cn(
                "px-3 py-1.5 font-mono text-xs transition-colors",
                slide === i ? "bg-white/20 text-white" : "text-white/55 hover:bg-white/10",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-white/70">
          <input type="checkbox" checked={autoLoop} onChange={(e) => setAutoLoop(e.target.checked)} className="accent-red-brand" />
          Loop
        </label>
        <span className="ml-auto text-xs text-white/40">
          {cfg.w}×{cfg.h} · record only the framed area
        </span>
      </div>

      <div ref={ref} className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        <div
          className="shrink-0 origin-center overflow-hidden rounded-[14px] shadow-2xl ring-1 ring-white/10"
          style={{ width: cfg.w, height: cfg.h, transform: `scale(${scale})` }}
        >
          <Stage cfg={cfg} slide={slide} wordIndex={wordIndex} runKey={runKey} />
        </div>
      </div>
    </main>
  );
}
