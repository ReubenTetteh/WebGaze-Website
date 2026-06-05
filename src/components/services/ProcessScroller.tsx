"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export type ProcessSubStep = { title: string; desc: string };

export type ProcessStage = {
  /** Short marker shown in the rail / counter — e.g. "Phase 1" or "01". */
  label: string;
  title: string;
  desc: string;
  /** Optional detail cards. Omit for simple, single-description stages. */
  steps?: ProcessSubStep[];
};

type Props = {
  eyebrow: string;
  heading: string;
  intro?: string;
  stages: ProcessStage[];
  /** Section background. Defaults to the deep services dark. */
  bg?: string;
};

/** Pull the leading digits out of a label ("Phase 2" -> "02", "03" -> "03"). */
function ghostNumber(label: string, index: number) {
  const m = label.match(/\d+/);
  const n = m ? parseInt(m[0], 10) : index + 1;
  return String(n).padStart(2, "0");
}

export default function ProcessScroller({
  eyebrow,
  heading,
  intro,
  stages,
  bg = "#0a0a0a",
}: Props) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(stages.length - 1, Math.floor(p * stages.length));
    setActive(i < 0 ? 0 : i);
  });

  const hasSubSteps = stages.some((s) => s.steps && s.steps.length > 0);

  // ── Mobile: no pinning. Accordion when there are sub-steps, otherwise a
  // simple stacked list. Keeps the compact phone experience intact.
  if (isMobile) {
    return (
      <section className="py-16 md:py-24" style={{ backgroundColor: bg }}>
        <div className="container-wide">
          <span className="label-tag">{eyebrow}</span>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            {heading}
          </h2>
          {intro && (
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-dark-muted md:text-base">
              {intro}
            </p>
          )}

          {hasSubSteps ? (
            <div className="mt-12 divide-y divide-dark-border border-t border-dark-border">
              {stages.map((stage, si) => {
                const open = openMobile === si;
                return (
                  <div key={stage.title}>
                    <button
                      onClick={() => setOpenMobile(open ? -1 : si)}
                      className="grid w-full grid-cols-[1fr_auto] items-start gap-4 py-7 text-left focus-visible:outline-none"
                      aria-expanded={open}
                    >
                      <div>
                        <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-dark-muted">
                          {stage.label}
                        </p>
                        <h3 className="font-display text-2xl font-bold text-white">
                          {stage.title}
                        </h3>
                        <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-dark-muted">
                          {stage.desc}
                        </p>
                      </div>
                      <span
                        className={`mt-1 text-xl text-dark-muted transition-transform duration-300 ${
                          open ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && stage.steps && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-2 pb-8">
                            {stage.steps.map((step, i) => (
                              <div
                                key={step.title}
                                className="rounded-xl border border-dark-border p-4"
                              >
                                <span className="font-display text-sm font-semibold text-white">
                                  {i + 1}. {step.title}
                                </span>
                                <p className="mt-1.5 font-body text-sm leading-relaxed text-dark-muted">
                                  {step.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 divide-y divide-dark-border border-t border-dark-border">
              {stages.map((stage) => (
                <div
                  key={stage.title}
                  className="grid grid-cols-[56px_1fr] gap-5 py-8 items-start"
                >
                  <span className="font-display text-4xl font-bold leading-none text-red-brand/25 select-none">
                    {stage.label}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {stage.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-dark-muted">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  const stage = stages[active];

  return (
    // Tall track gives the scroll distance; the inner panel pins so only one
    // stage is on screen at a time.
    <section
      ref={ref}
      className="relative"
      style={{ backgroundColor: bg, height: `${stages.length * 85}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* subtle red glow so the pinned panel doesn't read flat */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(50% 45% at 88% 12%, rgba(224,27,36,0.08), transparent 70%)",
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="label-tag">{eyebrow}</span>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                {heading}
              </h2>
            </div>
            <div className="hidden select-none items-baseline font-display font-bold leading-none lg:flex">
              <span className="text-5xl text-red-brand/80">
                {ghostNumber(stage.label, active)}
              </span>
              <span className="text-2xl text-white/15">
                /{String(stages.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
            {/* Left rail — stage list with vertical progress track */}
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-dark-border" />
              <motion.div
                className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-red-brand"
                style={{ scaleY: scrollYProgress }}
              />
              <ul className="space-y-6">
                {stages.map((s, i) => {
                  const isActive = i === active;
                  const isDone = i < active;
                  return (
                    <li key={s.title} className="relative pl-8">
                      <span
                        className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-300 ${
                          isActive
                            ? "border-red-brand bg-red-brand"
                            : isDone
                            ? "border-red-brand/60"
                            : "border-white/25"
                        }`}
                        style={{ backgroundColor: isActive ? undefined : bg }}
                      />
                      <button
                        onClick={() => {
                          const el = ref.current;
                          if (!el) return;
                          const top =
                            el.offsetTop +
                            (el.offsetHeight - window.innerHeight) *
                              ((i + 0.5) / stages.length);
                          window.scrollTo({ top, behavior: "smooth" });
                        }}
                        className="text-left focus-visible:outline-none"
                      >
                        <span
                          className={`mb-0.5 block font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                            isActive ? "text-red-brand" : "text-dark-muted"
                          }`}
                        >
                          {s.label}
                        </span>
                        <span
                          className={`block font-display text-lg font-bold leading-snug transition-colors ${
                            isActive ? "text-white" : "text-white/40"
                          }`}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right — active stage detail */}
            <div className="relative min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {stage.steps && stage.steps.length > 0 ? (
                    <>
                      <p className="mb-8 max-w-xl font-body text-sm leading-relaxed text-dark-muted lg:text-base">
                        {stage.desc}
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {stage.steps.map((step, si) => (
                          <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: 0.08 + si * 0.05,
                              ease: EASE,
                            }}
                            className="rounded-xl border border-dark-border p-5 transition-colors duration-200 hover:border-red-brand/40"
                          >
                            <span className="font-display text-sm font-semibold text-white">
                              {si + 1}. {step.title}
                            </span>
                            <p className="mt-2 font-body text-sm leading-relaxed text-dark-muted">
                              {step.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="relative">
                      <span className="block select-none font-display text-[7rem] font-bold leading-none text-white/[0.05] lg:text-[9rem]">
                        {ghostNumber(stage.label, active)}
                      </span>
                      <h3 className="-mt-4 font-display text-2xl font-bold text-white lg:text-3xl">
                        {stage.title}
                      </h3>
                      <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-dark-muted lg:text-lg">
                        {stage.desc}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
