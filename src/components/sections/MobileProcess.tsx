"use client";
// Mobile-only Process view — a compact tap-to-expand timeline.
// Desktop keeps the 4-column grid in Process.tsx untouched.
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type ProcessStep = {
  num: string;
  title: string;
  short: string;
  desc: string;
  tags: string[];
};

export default function MobileProcess({ steps }: { steps: ProcessStep[] }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 35% at 90% 6%, rgba(224,27,36,0.10), transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10">
        {/* header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-[2px] w-8 bg-red-brand" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-brand">
              How We Work
            </span>
          </div>
          <h2 className="font-display text-[1.85rem] font-bold leading-[1.12] text-white">
            A process built for clarity, not chaos.
          </h2>
        </div>

        {/* timeline */}
        <ul className="relative">
          {/* connecting rail behind the nodes */}
          <div
            aria-hidden
            className="absolute left-[1.375rem] top-6 bottom-6 w-px bg-white/10"
          />

          {steps.map((step, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={step.num}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-2.5 text-left"
                >
                  {/* node — solid bg cuts the rail so it reads as a stop */}
                  <span
                    className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-sm font-bold tracking-[0.05em] transition-colors duration-300 ${
                      isOpen
                        ? "border-red-brand bg-red-brand text-white"
                        : "border-white/15 bg-[#0c0c0c] text-red-brand"
                    }`}
                  >
                    {step.num}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-bold leading-snug text-white">
                      {step.title}
                    </span>
                    <span className="block text-sm text-red-brand/90">
                      {step.short}
                    </span>
                  </span>

                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-xl leading-none text-white/40"
                  >
                    ›
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-[3.75rem] pr-1 pt-1">
                        <p className="text-sm leading-relaxed text-white/60">
                          {step.desc}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
