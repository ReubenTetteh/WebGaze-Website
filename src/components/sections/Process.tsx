"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

const steps = [
  {
    num: "01",
    title: "Discovery & Understanding",
    short: "We listen before we act.",
    desc: "This stage is about understanding your goals, your audience, and the broader context around the work. We ask the right questions and define what success looks like before a single pixel is moved.",
    tags: ["Kickoff Call", "Goals Mapping", "Audience Research"],
  },
  {
    num: "02",
    title: "Direction & Planning",
    short: "We map the path forward.",
    desc: "With a clear picture in place, we define scope, priorities, and the practical steps needed to move forward — ensuring everything stays aligned, realistic, and built for results.",
    tags: ["Scope Definition", "Sitemap", "Timeline"],
  },
  {
    num: "03",
    title: "Development & Refinement",
    short: "We build and iterate.",
    desc: "Ideas are shaped and refined through an iterative process. Whether it's design, content, or systems, we focus on quality, consistency, and purpose at every stage.",
    tags: ["Design", "Development", "Feedback Loops"],
  },
  {
    num: "04",
    title: "Delivery & Implementation",
    short: "We launch with confidence.",
    desc: "We bring everything together, run final checks, and hand over a site that's complete, functional, and ready to perform — with support to make sure nothing falls through the cracks.",
    tags: ["QA Testing", "Launch", "Handover"],
  },
];

export default function Process() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="section-pad bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="container-wide">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-red-brand" />
              <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">
                How We Work
              </span>
            </div>
            <h2 className="font-display font-bold text-display-md dark:text-white leading-[1.1]">
              A process built for clarity, not chaos.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="lg:pt-2 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-md">
              From the first conversation to final delivery, every step is intentional — keeping you informed, on time, and confident in the outcome.
            </p>
          </AnimateIn>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-light-border dark:divide-dark-border border-t border-b border-light-border dark:border-dark-border">
          {steps.map((step, i) => {
            const isOpen = open === i;
            return (
              <div key={step.num}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center gap-6 py-6 md:py-8">
                    {/* Number */}
                    <span className={`font-display font-bold text-sm tracking-[0.18em] w-10 flex-shrink-0 transition-colors duration-300 ${isOpen ? "text-red-brand" : "text-[#bbb] dark:text-[#444]"}`}>
                      {step.num}
                    </span>

                    {/* Title */}
                    <h3 className={`font-display font-bold text-xl md:text-2xl flex-1 transition-colors duration-300 ${isOpen ? "text-[#0f0f0f] dark:text-white" : "text-[#0f0f0f]/70 dark:text-white/50"}`}>
                      {step.title}
                    </h3>

                    {/* Short desc — visible when closed */}
                    <span className={`hidden md:block font-body text-sm text-light-muted dark:text-dark-muted max-w-[200px] text-right transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                      {step.short}
                    </span>

                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-light transition-colors duration-300 ${isOpen ? "border-red-brand text-red-brand bg-red-brand/10" : "border-light-border dark:border-dark-border text-[#999]"}`}
                    >
                      +
                    </motion.span>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="relative pb-10 pl-16 pr-4 md:pr-16 overflow-hidden">
                        {/* Ghost number */}
                        <span className="absolute -right-4 top-[-1.5rem] font-display font-bold text-[8rem] md:text-[10rem] leading-none text-[#0f0f0f]/[0.04] dark:text-white/[0.04] select-none pointer-events-none">
                          {step.num}
                        </span>

                        <p className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-2xl mb-6 relative z-10">
                          {step.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 relative z-10">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-display font-semibold tracking-[0.14em] uppercase
                                         px-3 py-1.5 rounded-full border border-red-brand/30 text-red-brand bg-red-brand/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
