"use client";
// Mobile-only Process view — light theme, vertical timeline with a red
// scroll-driven rail. Ported from /v2's Process section.

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export type ProcessStep = {
  num: string;
  title: string;
  short: string;
  desc: string;
  tags: string[];
};

export default function MobileProcess({ steps }: { steps: ProcessStep[] }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const fill = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section className="relative bg-[#f4f4f6] pt-24 pb-20">
      <div className="px-6">
        <span className="label-tag">How we work</span>
        <h2
          className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
        >
          A process built for clarity, not chaos.
        </h2>
        <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
          From the first conversation to final delivery, every step is
          intentional — keeping you informed, on time, and confident in the
          outcome.
        </p>
      </div>

      <div ref={wrapRef} className="relative mt-12 px-6">
        <div className="absolute left-[34px] top-3 bottom-3 w-px bg-black/10" />
        <motion.div
          className="absolute left-[34px] top-3 w-px bg-red-brand"
          style={{ height: fill }}
        />

        <ul className="space-y-10">
          {steps.map((s, i) => (
            <motion.li
              key={s.num}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="relative flex gap-5 pl-2"
            >
              <span className="relative z-10 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-red-brand font-display text-[11px] font-bold text-white">
                {s.num}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[1.05rem] font-bold leading-tight tracking-[-0.02em] text-[#0a0a0a]">
                  {s.title}
                </h3>
                <p className="mt-1 font-display text-[13px] font-medium text-red-brand">
                  {s.short}
                </p>
                <p className="mt-3 font-body text-[13px] leading-[1.55] text-[#0a0a0a]/65">
                  {s.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
