"use client";

import { motion } from "framer-motion";

// Results bridge — sits directly under the portfolio so the visual proof
// hands off to measurable proof before the page opens up into lighter sections.
const stats = [
  { value: "50+", label: "Projects delivered", sub: "Websites, brands & systems" },
  { value: "9", label: "Industries served", sub: "Care, energy, trade, more" },
  { value: "6+", label: "Years of craft", sub: "Sydney-based, Australia-wide" },
  { value: "100%", label: "Custom built", sub: "No templates, ever" },
];

export default function StatsStrip() {
  return (
    <section className="relative bg-[#080808] overflow-hidden py-20 md:py-28">
      {/* faint top hairline to separate from the portfolio above */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* soft red glow, low-key */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(224,27,36,0.10), transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="max-w-2xl mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-[2px] bg-red-brand" />
            <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
              By the numbers
            </span>
          </div>
          <h2 className="font-display font-bold text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.12] tracking-[-0.025em] text-white">
            Proof that goes beyond the portfolio.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative pl-5 border-l border-white/10"
            >
              <span className="absolute top-1 left-0 block h-8 w-[2px] bg-red-brand" />
              <p className="font-display font-bold text-[clamp(2.6rem,5vw,4rem)] leading-none tracking-[-0.04em] text-white">
                {stat.value}
              </p>
              <p className="font-display font-semibold text-sm md:text-base text-white mt-4">
                {stat.label}
              </p>
              <p className="font-body text-xs md:text-sm text-white/45 mt-1.5 leading-relaxed">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
