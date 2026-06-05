"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { portfolioProjects } from "@/lib/projects";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

/**
 * "Agency Promo"-style reintro reel — a faithful WebGaze rebuild of the
 * inspiration template (gerak_visual, WEBGAZE/Inspiration/61809293.mp4),
 * mapped beat-for-beat from a frame-by-frame re-watch and re-skinned RED-LED
 * (Reuben's call — energy carried by motion/scale/strobe, not multi-colour):
 *
 *   1. INTRO    — a tilted 3D wall of work cards flies past, resolves to title.
 *   2. MONTAGE  — fast strobe of real portfolio frames with black/red flashes.
 *   3. QUESTION — typewriter: "Do you… need a creative partner?"
 *   4. RIBBON   — wavy red band, "Everything you imagine," on it (SVG textPath).
 *   5. PILL     — a red pill pops in: "we bring it to life".
 *   6. FRAME    — red marquee-bordered frame ("THE CLIENTS") revealing cards.
 *   7. FLOAT    — "REAL WORK." over floating, drifting client cards.
 *   8. DESIGN   — "WE DESIGN :" + cycling words (Websites/Brands/Interfaces/Systems).
 *   9. SEAMLESS — giant "SEAMLESSLY" knockout filled with the scrolling work.
 *  10. CONTACT  — full-red end card ("Let's build something.", "Contact us!").
 *
 * Separate from /studio/reintro-reel (the typewriter/wall/cta version) — both kept.
 * Recording-stage conventions: true-export-px canvas scaled to fit, format switch,
 * section selector, replay + loop, tool bar OUTSIDE the frame. No grid overlays.
 */

type Format = "9:16" | "4:5" | "1:1";
type Scene =
  | "intro"
  | "montage"
  | "question"
  | "ribbon"
  | "pill"
  | "frame"
  | "float"
  | "design"
  | "seamless"
  | "contact";
type View = "full" | Scene;

type Cfg = {
  w: number; h: number; pad: number;
  kicker: number; title: number; hero: number; mega: number;
  sub: number; body: number; band: number; ribbon: number; knock: number; frame: number;
};

const FORMATS: Record<Format, Cfg> = {
  "9:16": { w: 1080, h: 1920, pad: 92, kicker: 27, title: 150, hero: 116, mega: 152, sub: 40, body: 54, band: 200, ribbon: 116, knock: 300, frame: 720 },
  "4:5":  { w: 1080, h: 1350, pad: 82, kicker: 25, title: 128, hero: 100, mega: 128, sub: 37, body: 47, band: 184, ribbon: 104, knock: 262, frame: 640 },
  "1:1":  { w: 1080, h: 1080, pad: 74, kicker: 23, title: 110, hero: 88,  mega: 110, sub: 34, body: 41, band: 168, ribbon: 92,  knock: 224, frame: 560 },
};

const DM = "var(--font-dm-sans), sans-serif";
const RED = "#E01B24";
const RED_DEEP = "#B5141C";
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ORDER: Scene[] = ["intro", "montage", "question", "ribbon", "pill", "frame", "float", "design", "seamless", "contact"];
const SCENE_MS: Record<Scene, number> = {
  intro: 3000, montage: 2300, question: 2200, ribbon: 2600, pill: 2200,
  frame: 3000, float: 2700, design: 3500, seamless: 3000, contact: 4000,
};

// Real portfolio imagery — covers (cards) + everything (wall / montage / fill).
const COVERS = portfolioProjects.map((p) => p.image);
const GALLERY = Array.from(new Set(portfolioProjects.flatMap((p) => [p.image, ...p.gallery])));

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

function Background() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 44% at 50% -2%, rgba(224,27,36,0.26), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 54%, rgba(0,0,0,0.5) 100%)" }} />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{ opacity: 0.05, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "260px 260px" }}
      />
    </>
  );
}

function Kicker({ cfg, label, color = "rgba(255,255,255,0.82)" }: { cfg: Cfg; label: string; color?: string }) {
  return (
    <motion.div
      className="flex items-center justify-center"
      style={{ gap: 13 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: EXPO }}
    >
      <span className="inline-block rounded-full bg-red-brand" style={{ width: 11, height: 11 }} />
      <span style={{ fontFamily: DM, fontWeight: 600, fontSize: cfg.kicker, letterSpacing: "0.32em", textTransform: "uppercase", color }}>{label}</span>
    </motion.div>
  );
}

// ── Scene 1: tilted 3D wall of work cards flies past → title resolves ────────
function IntroScene({ cfg }: { cfg: Cfg }) {
  const cardW = cfg.w * 0.27;
  const cards = useMemo(() => Array.from({ length: 18 }, (_, i) => GALLERY[i % GALLERY.length]), []);
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.4 }}>
      <div className="absolute inset-0 overflow-hidden" style={{ perspective: 1500 }}>
        <motion.div
          className="absolute left-1/2 top-1/2 flex flex-wrap content-center justify-center"
          style={{ width: cfg.w * 1.7, gap: cfg.w * 0.035, x: "-50%", y: "-50%", transformStyle: "preserve-3d" }}
          initial={{ rotateX: 52, rotateZ: -7, y: "-12%", scale: 1.45, filter: "blur(11px)" }}
          animate={{ rotateX: 16, rotateZ: -3, y: "-50%", scale: 0.96, filter: "blur(0px)" }}
          transition={{ duration: 2.4, ease: EXPO }}
        >
          {cards.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden bg-white/5"
              style={{ width: cardW, height: cardW * 0.66, borderRadius: 16, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" style={{ filter: "saturate(0.92)" }} />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,13,0.35) 0%, rgba(10,10,13,0.72) 55%, rgba(10,10,13,0.95) 100%)" }} />

      <div className="relative flex flex-col items-center text-center" style={{ paddingInline: cfg.pad }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.6, ease: EXPO }}>
          <Kicker cfg={cfg} label="WebGaze Studio" />
        </motion.div>
        <motion.div
          style={{ fontFamily: DM, fontWeight: 800, fontSize: cfg.title, lineHeight: 0.92, letterSpacing: "-0.035em", color: "#fff", marginTop: cfg.pad * 0.45 }}
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 0.8, ease: EXPO }}
        >
          WebGaze
        </motion.div>
        <motion.div
          style={{ fontFamily: DM, fontWeight: 500, fontStyle: "italic", fontSize: cfg.title * 0.4, letterSpacing: "0.01em", color: RED, marginTop: cfg.pad * 0.1 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7, ease: EXPO }}
        >
          reintroduced.
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Scene 2: fast strobe montage of real work, with flash frames ─────────────
function MontageScene({ cfg }: { cfg: Cfg }) {
  // -1 = black flash, -2 = red flash, otherwise GALLERY index
  const seq = useMemo(() => {
    const s: number[] = [];
    GALLERY.slice(0, 14).forEach((_, i) => {
      s.push(i);
      if (i % 4 === 3) s.push(-1);
      if (i % 6 === 5) s.push(-2);
    });
    return s;
  }, []);
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % seq.length), 132);
    return () => clearInterval(id);
  }, [seq.length]);

  const cur = seq[i];
  return (
    <motion.div className="absolute inset-0 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.35 } }} transition={{ duration: 0.25 }}>
      {cur === -2 ? (
        <div className="absolute inset-0" style={{ background: RED }} />
      ) : cur === -1 ? (
        <div className="absolute inset-0 bg-black" />
      ) : (
        <motion.div key={i} className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GALLERY[cur % GALLERY.length]} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))" }} />
        </motion.div>
      )}
      {/* moving red scan accent */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ height: cfg.kicker * 0.5, background: RED, mixBlendMode: "screen" }}
        initial={{ top: "8%" }}
        animate={{ top: ["8%", "88%", "8%"] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

// ── Scene 3: typewriter question ─────────────────────────────────────────────
function QuestionScene({ cfg }: { cfg: Cfg }) {
  const full = "Do you… need a creative partner?";
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => setN((v) => (v < full.length ? v + 1 : v)), 48);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ padding: cfg.pad }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.35 } }} transition={{ duration: 0.3 }}>
      <div className="text-center" style={{ fontFamily: DM, fontWeight: 500, fontSize: cfg.body, lineHeight: 1.25, letterSpacing: "-0.01em", color: "#fff" }}>
        {full.slice(0, n)}
        <motion.span style={{ display: "inline-block", width: cfg.body * 0.06, height: cfg.body, background: RED, marginLeft: cfg.body * 0.08, transform: "translateY(0.12em)" }} animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} />
      </div>
    </motion.div>
  );
}

// ── Scene 4: wavy red ribbon with white text ─────────────────────────────────
function RibbonScene({ cfg }: { cfg: Cfg }) {
  const midY = cfg.h * 0.5;
  const D = `M ${-0.22 * cfg.w} ${midY + 70} C ${0.16 * cfg.w} ${midY - 170}, ${0.42 * cfg.w} ${midY + 230}, ${0.66 * cfg.w} ${midY - 6} S ${1.06 * cfg.w} ${midY - 200}, ${1.26 * cfg.w} ${midY - 90}`;
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.4 }}>
      <div className="absolute inset-x-0 z-10" style={{ top: cfg.pad * 1.1 }}>
        <Kicker cfg={cfg} label="Everything you need" />
      </div>
      <motion.svg
        viewBox={`0 0 ${cfg.w} ${cfg.h}`}
        className="absolute inset-0 h-full w-full"
        initial={{ rotate: -1.5, scale: 1.02 }}
        animate={{ rotate: 1.5, scale: 1.02 }}
        transition={{ duration: SCENE_MS.ribbon / 1000 + 1, ease: "easeInOut" }}
      >
        <defs>
          <path id="ribbonPath" d={D} fill="none" />
        </defs>
        <motion.path
          d={D} stroke={RED} strokeWidth={cfg.band} strokeLinecap="round" fill="none"
          pathLength={1} strokeDasharray="1"
          initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.05, ease: EXPO }}
        />
        <motion.text
          fill="#fff" dominantBaseline="middle"
          style={{ fontFamily: DM, fontWeight: 800, fontStyle: "italic", fontSize: cfg.ribbon, letterSpacing: "-0.02em" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
        >
          <textPath href="#ribbonPath" startOffset="20%">Everything you imagine,</textPath>
        </motion.text>
      </motion.svg>
    </motion.div>
  );
}

// ── Scene 5: red pill pops in ────────────────────────────────────────────────
function PillScene({ cfg }: { cfg: Cfg }) {
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ padding: cfg.pad }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.3 }}>
      <motion.div
        className="flex items-center justify-center"
        style={{ background: RED, borderRadius: 999, paddingInline: cfg.hero * 0.62, paddingBlock: cfg.hero * 0.34, boxShadow: "0 30px 80px rgba(224,27,36,0.35)" }}
        initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: -4, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 15 }}
      >
        <span style={{ fontFamily: DM, fontWeight: 800, fontStyle: "italic", fontSize: cfg.hero, letterSpacing: "-0.02em", color: "#fff", whiteSpace: "nowrap" }}>
          we bring it to life
        </span>
      </motion.div>
    </motion.div>
  );
}

// ── Scene 6: marquee-bordered frame revealing client cards ───────────────────
function FrameScene({ cfg }: { cfg: Cfg }) {
  const size = cfg.frame;
  const strip = cfg.kicker * 1.9;
  const cards = useMemo(() => [COVERS[0], COVERS[2], COVERS[4]], []);
  const MarqueeText = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} style={{ fontFamily: DM, fontWeight: 700, fontSize: cfg.kicker, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", paddingInline: cfg.kicker * 0.7 }}>
          The Clients <span style={{ color: "rgba(255,255,255,0.55)" }}>●</span>
        </span>
      ))}
    </>
  );
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.35 }}>
      <motion.div
        className="relative overflow-hidden"
        style={{ width: size, height: size, borderRadius: 22, border: `${strip}px solid ${RED}`, background: "#0c0c10" }}
        initial={{ scale: 0.9, opacity: 0, rotate: -1.5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
      >
        {/* top + bottom marquee rails sit on top of the red border */}
        <div className="absolute left-0 right-0 flex items-center" style={{ top: -strip, height: strip }}>
          <InfiniteSlider gap={0} duration={14} className="w-full"><MarqueeText /></InfiniteSlider>
        </div>
        <div className="absolute left-0 right-0 flex items-center" style={{ bottom: -strip, height: strip }}>
          <InfiniteSlider gap={0} duration={14} reverse className="w-full"><MarqueeText /></InfiniteSlider>
        </div>

        <div className="absolute inset-0 flex items-center justify-center" style={{ gap: size * 0.04, padding: size * 0.07 }}>
          {cards.map((src, i) => (
            <motion.div
              key={i}
              className="overflow-hidden bg-white/5"
              style={{ flex: 1, height: "82%", borderRadius: 12 }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.16, duration: 0.6, ease: EXPO }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Scene 7: "REAL WORK." over floating, drifting client cards ───────────────
function FloatScene({ cfg }: { cfg: Cfg }) {
  const cardW = cfg.w * 0.3;
  const slots = useMemo(
    () => [
      { src: COVERS[1], x: -cfg.w * 0.3, y: -cfg.h * 0.18, r: -8, d: 0 },
      { src: COVERS[3], x: cfg.w * 0.31, y: -cfg.h * 0.1, r: 7, d: 0.12 },
      { src: COVERS[5], x: -cfg.w * 0.26, y: cfg.h * 0.18, r: 6, d: 0.24 },
      { src: COVERS[7], x: cfg.w * 0.28, y: cfg.h * 0.2, r: -6, d: 0.36 },
    ],
    [cfg.w, cfg.h]
  );
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.35 }}>
      {slots.map((s, i) => (
        <motion.div
          key={i}
          className="absolute overflow-hidden"
          style={{ width: cardW, height: cardW * 0.7, borderRadius: 16, boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}
          initial={{ x: s.x * 1.25, y: s.y * 1.25, rotate: s.r, opacity: 0, scale: 0.9 }}
          animate={{ x: [s.x, s.x + 14, s.x], y: [s.y, s.y - 16, s.y], rotate: s.r, opacity: 1, scale: 1 }}
          transition={{ x: { duration: 5, repeat: Infinity, ease: "easeInOut" }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: s.d, duration: 0.6 }, scale: { delay: s.d, duration: 0.7, ease: EXPO } }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt="" className="h-full w-full object-cover" />
        </motion.div>
      ))}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 40% at 50% 50%, rgba(10,10,13,0.85), transparent 75%)" }} />
      <motion.div
        className="relative text-center"
        style={{ fontFamily: DM, fontWeight: 800, fontSize: cfg.mega, lineHeight: 0.9, letterSpacing: "-0.045em", color: "#fff", filter: "drop-shadow(0 18px 50px rgba(0,0,0,0.7))" }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EXPO }}
      >
        REAL<br />WORK<span style={{ color: RED }}>.</span>
      </motion.div>
    </motion.div>
  );
}

// ── Scene 8: "WE DESIGN :" with cycling words ────────────────────────────────
function DesignScene({ cfg }: { cfg: Cfg }) {
  const words = useMemo(() => ["Websites", "Brands", "Interfaces", "Systems"], []);
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(0);
    const id = setInterval(() => setW((v) => (v + 1) % words.length), 780);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <motion.div className="absolute inset-0 flex items-center" style={{ paddingInline: cfg.pad }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.35 }}>
      <div className="flex flex-col" style={{ gap: cfg.mega * 0.04 }}>
        <motion.div
          style={{ fontFamily: DM, fontWeight: 800, fontSize: cfg.mega * 0.62, lineHeight: 0.92, letterSpacing: "-0.03em", color: "#fff" }}
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EXPO }}
        >
          WE<br />DESIGN<span style={{ color: RED }}> :</span>
        </motion.div>
        <div style={{ height: cfg.mega * 0.78, position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={w}
              style={{ position: "absolute", fontFamily: DM, fontWeight: 700, fontStyle: "italic", fontSize: cfg.mega * 0.66, letterSpacing: "-0.02em", color: RED }}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -34 }}
              transition={{ duration: 0.42, ease: EXPO }}
            >
              {words[w]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ── Scene 9: giant "SEAMLESSLY" filled with the scrolling real work ──────────
function SeamlessScene({ cfg }: { cfg: Cfg }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.35 }}>
      <div className="absolute inset-x-0 z-10" style={{ top: cfg.pad * 1.1 }}>
        <Kicker cfg={cfg} label="✱ Made for you" />
      </div>
      <motion.div
        className="text-center"
        style={{
          fontFamily: DM, fontWeight: 800, fontSize: cfg.knock, lineHeight: 0.84, letterSpacing: "-0.05em",
          color: "transparent", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text",
          backgroundImage: "url(/studio/work-strip.jpg)", backgroundSize: "auto 122%", backgroundRepeat: "repeat-x", backgroundPositionY: "center",
          filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.55))",
        }}
        initial={{ backgroundPositionX: 0, opacity: 0, scale: 1.07 }}
        animate={{ backgroundPositionX: -3200, opacity: 1, scale: 1 }}
        transition={{ backgroundPositionX: { duration: 11, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 }, scale: { duration: 0.9, ease: EXPO } }}
      >
        SEAMLESSLY
      </motion.div>
      <motion.div
        className="absolute"
        style={{ bottom: cfg.pad * 1.3, fontFamily: DM, fontWeight: 500, fontSize: cfg.sub * 0.74, letterSpacing: "0.04em", color: "rgba(255,255,255,0.6)" }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: EXPO }}
      >
        design + build, end to end
      </motion.div>
    </motion.div>
  );
}

// ── Scene 10: full-red end card ──────────────────────────────────────────────
function ContactScene({ cfg }: { cfg: Cfg }) {
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.4 }}>
      <motion.div
        className="absolute overflow-hidden"
        style={{ inset: cfg.pad * 0.5, background: RED, borderRadius: 44 }}
        initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: EXPO }}
      >
        <div className="absolute" style={{ inset: 28, border: "2px solid rgba(255,255,255,0.5)", borderRadius: 32 }} />
        <div className="absolute inset-x-0 text-center text-white" style={{ top: 54, fontFamily: DM, fontWeight: 700, fontSize: cfg.kicker, letterSpacing: "0.24em" }}>WEBGAZE</div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ padding: cfg.pad }}>
          <motion.div
            style={{ fontFamily: DM, fontWeight: 600, fontSize: cfg.kicker, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 22 }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.55, ease: EXPO }}
          >
            Ready when you are
          </motion.div>
          <motion.div
            style={{ fontFamily: DM, fontWeight: 800, fontSize: cfg.hero, lineHeight: 0.98, letterSpacing: "-0.03em", color: "#fff" }}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6, ease: EXPO }}
          >
            Let&rsquo;s build<br />something.
          </motion.div>
          <motion.div
            style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: cfg.sub, color: "rgba(255,255,255,0.85)", marginTop: 26 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
          >
            No pressure. Just next steps.
          </motion.div>
          <motion.div
            style={{ fontFamily: DM, fontWeight: 700, fontSize: cfg.sub, color: "#fff", marginTop: 30 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1, scale: [1, 1.04, 1] }}
            transition={{ opacity: { delay: 0.9, duration: 0.5 }, scale: { delay: 1.4, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
          >
            webgaze.com.au
          </motion.div>
        </div>

        <motion.div
          className="absolute italic text-white"
          style={{ right: cfg.pad, bottom: cfg.pad, fontFamily: DM, fontWeight: 800, fontSize: cfg.hero * 0.5, lineHeight: 0.98, textAlign: "right" }}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6, ease: EXPO }}
        >
          Contact<br />us!
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const SCENES: Record<Scene, (p: { cfg: Cfg }) => React.ReactElement> = {
  intro: IntroScene,
  montage: MontageScene,
  question: QuestionScene,
  ribbon: RibbonScene,
  pill: PillScene,
  frame: FrameScene,
  float: FloatScene,
  design: DesignScene,
  seamless: SeamlessScene,
  contact: ContactScene,
};

// ── Stage + tool bar ─────────────────────────────────────────────────────────
function startScene(view: View): Scene {
  return view === "full" ? "intro" : view;
}

function Stage({ cfg, runKey, view, onCycleEnd }: { cfg: Cfg; runKey: number; view: View; onCycleEnd: () => void }) {
  const [scene, setScene] = useState<Scene>(startScene(view));
  useEffect(() => setScene(startScene(view)), [runKey, view]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (view !== "full") { onCycleEnd(); return; } // section review: loop just this scene
      const i = ORDER.indexOf(scene);
      if (i < ORDER.length - 1) setScene(ORDER[i + 1]);
      else onCycleEnd();
    }, SCENE_MS[scene]);
    return () => clearTimeout(id);
  }, [scene, view, onCycleEnd]);

  const Active = SCENES[scene];
  return (
    <div className="dark relative overflow-hidden text-white" style={{ width: cfg.w, height: cfg.h, fontFamily: "var(--font-inter), sans-serif", background: "linear-gradient(157deg, #15151B 0%, #0E0E11 46%, #120A0C 100%)" }}>
      <Background />
      <AnimatePresence mode="wait">
        <Active key={`${scene}-${runKey}`} cfg={cfg} />
      </AnimatePresence>
    </div>
  );
}

const VIEWS: View[] = ["full", ...ORDER];

export default function PromoStage() {
  const [format, setFormat] = useState<Format>("9:16");
  const [view, setView] = useState<View>("full");
  const [runKey, setRunKey] = useState(0);
  const [autoLoop, setAutoLoop] = useState(true);
  const cfg = FORMATS[format];
  const { ref, scale } = useFitScale(cfg.w, cfg.h);

  const replay = () => setRunKey((k) => k + 1);
  const onCycleEnd = () => { if (autoLoop) setRunKey((k) => k + 1); };

  const seg = "flex overflow-hidden rounded-lg border border-white/15";
  const btn = (active: boolean) => cn("px-2.5 py-1.5 font-mono text-xs transition-colors", active ? "bg-red-brand text-white" : "text-white/60 hover:bg-white/10");

  return (
    <main className="fixed inset-0 flex flex-col bg-neutral-950 text-white">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-neutral-900/80 px-4 py-3 text-sm backdrop-blur">
        <span className="mr-1 font-semibold tracking-wide text-white/90">WebGaze Studio · Promo</span>
        <div className={seg}>
          {(Object.keys(FORMATS) as Format[]).map((f) => (
            <button key={f} onClick={() => setFormat(f)} className={btn(format === f)}>{f}</button>
          ))}
        </div>
        <div className={cn(seg, "flex-wrap")} title="jump to scene">
          {VIEWS.map((v) => (
            <button key={v} onClick={() => { setView(v); setRunKey((k) => k + 1); }} className={btn(view === v)}>{v}</button>
          ))}
        </div>
        <button onClick={replay} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10">↺ Replay</button>
        <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-white/70">
          <input type="checkbox" checked={autoLoop} onChange={(e) => setAutoLoop(e.target.checked)} className="accent-red-brand" />
          Loop
        </label>
        <span className="ml-auto text-xs text-white/40">{cfg.w}×{cfg.h} · {view} · record only the framed area</span>
      </div>

      <div ref={ref} className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        <div className="shrink-0 origin-center overflow-hidden rounded-[14px] shadow-2xl ring-1 ring-white/10" style={{ width: cfg.w, height: cfg.h, transform: `scale(${scale})` }}>
          <Stage cfg={cfg} runKey={runKey} view={view} onCycleEnd={onCycleEnd} />
        </div>
      </div>
    </main>
  );
}
