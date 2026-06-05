"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileProcess from "./MobileProcess";

const steps = [
  {
    num: "01",
    title: "Discovery & Understanding",
    short: "We listen before we act.",
    desc: "We get clear on your goals, your audience, and the context around the work — defining what success looks like before a single pixel moves.",
    tags: ["Kickoff Call", "Goals", "Research"],
  },
  {
    num: "02",
    title: "Direction & Planning",
    short: "We map the path forward.",
    desc: "With the picture in place, we set scope, priorities, and the practical steps to move — keeping everything aligned, realistic, and built for results.",
    tags: ["Scope", "Sitemap", "Timeline"],
  },
  {
    num: "03",
    title: "Development & Refinement",
    short: "We build and iterate.",
    desc: "Design, content, and systems are shaped through an iterative loop — focused on quality, consistency, and purpose at every stage.",
    tags: ["Design", "Build", "Feedback"],
  },
  {
    num: "04",
    title: "Delivery & Implementation",
    short: "We launch with confidence.",
    desc: "We bring it together, run final checks, and hand over a site that's complete and ready to perform — with support so nothing slips.",
    tags: ["QA", "Launch", "Handover"],
  },
];

export default function Process() {
  const isMobile = useIsMobile();

  // Phones get a compact tap-to-expand timeline; the desktop grid below is
  // left exactly as-is.
  if (isMobile) {
    return <MobileProcess steps={steps} />;
  }

  return (
    <section className="relative bg-dark-surface overflow-hidden section-pad">
      {/* hairline seam — marks the join with the deeper portfolio band above */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* soft red glow to keep it from feeling flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(45% 40% at 85% 15%, rgba(224,27,36,0.08), transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-red-brand" />
              <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
                How We Work
              </span>
            </div>
            <h2 className="font-display font-bold text-display-md text-white leading-[1.1]">
              A process built for clarity, not chaos.
            </h2>
          </div>
          <p className="lg:pt-2 lg:self-end font-body text-base text-white/55 leading-relaxed max-w-md">
            From the first conversation to final delivery, every step is
            intentional — keeping you informed, on time, and confident in the
            outcome.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* connecting track (desktop) — runs through the number nodes */}
          <div className="hidden lg:block absolute top-[1.375rem] left-0 right-0 h-px bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative"
              >
                {/* number node — solid bg cuts the track so it reads as a stop */}
                <div className="relative z-10 mb-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-dark-bg font-display font-bold text-sm tracking-[0.1em] text-red-brand">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg md:text-xl text-white leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="font-display text-sm font-medium text-red-brand/90 mb-4">
                  {step.short}
                </p>
                <p className="font-body text-sm text-white/55 leading-relaxed mb-6">
                  {step.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-display font-semibold tracking-[0.12em] uppercase
                                 px-2.5 py-1 rounded-full border border-white/10 text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
