"use client";
// Mobile-only FAQ — light theme, tap-to-expand accordion with a rotating
// +/× icon. Ported from /v2's FAQ section.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/lib/faqs";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function MobileFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#f4f4f6] pt-24 pb-20">
      <div className="px-6">
        <span className="label-tag">FAQ</span>
        <h2
          className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
        >
          Questions, answered.
        </h2>
        <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
          Can&apos;t find the answer you&apos;re looking for? Reach out directly
          — we&apos;re happy to help.
        </p>
      </div>

      <ul className="mt-9 px-6">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li
              key={f.q}
              className="border-t border-black/10 last:border-b last:border-black/10"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 py-4 text-left"
              >
                <span className="font-display text-[15px] font-semibold leading-snug text-[#0a0a0a]">
                  {f.q}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-black/20 text-[#0a0a0a]"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-9 font-body text-[13.5px] leading-relaxed text-[#0a0a0a]/65">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 px-6">
        <a
          href="mailto:hello@webgaze.com.au"
          className="inline-flex h-12 items-center justify-center rounded-full border border-black/20 px-6 font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a0a0a]"
        >
          Email Us
        </a>
      </div>
    </section>
  );
}
