"use client";
// Mobile-only Testimonials — light section bg with a dark "product moment"
// card. Auto-rotates every 5.5s. Ported from /v2's Proof section.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export type MobileTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export default function MobileTestimonials({
  items,
}: {
  items: MobileTestimonial[];
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [items.length]);

  const t = items[i];

  return (
    <section className="relative overflow-hidden bg-[#fafafa] pt-24 pb-16">
      <div className="px-6">
        <span className="label-tag">Testimonials</span>
        <h2
          className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)" }}
        >
          What clients think.
        </h2>
      </div>

      <div className="relative mx-6 mt-10 min-h-[260px] overflow-hidden rounded-[26px] border border-black/8 bg-gradient-to-b from-[#0f0f12] to-[#050507] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="font-display text-5xl leading-none text-red-brand">
              &ldquo;
            </span>
            <p className="mt-3 font-display text-[1.05rem] leading-[1.45] tracking-[-0.012em] text-white/85">
              {t.quote}
            </p>
            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="font-display text-sm font-semibold text-white">
                {t.name}
              </p>
              <p className="font-body text-[12px] text-white/45">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 right-5 flex gap-1.5">
          {items.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={`Testimonial ${n + 1}`}
              className={`h-1 rounded-full transition-all ${
                n === i ? "w-6 bg-white" : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
