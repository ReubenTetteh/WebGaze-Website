"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
  {
    label: "Phase 1",
    title: "Discovery",
    desc: "The Discovery phase is crucial for laying the foundation of your website. It involves understanding your business goals, identifying user needs, and planning the website structure through research-driven insights.",
    steps: [
      { title: "Initial Meeting", desc: "We start with a deep-dive conversation to understand your business, goals, and audience - setting the direction for everything that follows." },
      { title: "Competitor Research", desc: "We analyse direct and indirect competitors to identify industry standards, gaps, and opportunities for differentiation." },
      { title: "Content Gathering", desc: "We identify and collect the content assets needed - text, images, and resources - and define your brand voice and messaging strategy." },
      { title: "Information Architecture", desc: "We structure the website's navigation and content hierarchy for intuitive, user-friendly browsing." },
      { title: "UX Research", desc: "We create user personas and study behaviour patterns to ensure the site meets real audience expectations." },
      { title: "Defining KPIs", desc: "We establish measurable success criteria and set up tracking tools so we can monitor and improve performance over time." },
    ],
  },
  {
    label: "Phase 2",
    title: "Design & Development",
    desc: "In this stage, we turn your vision into a fully functional website. We design visually appealing, user-friendly layouts and develop them using modern coding standards to ensure speed, security, and accessibility.",
    steps: [
      { title: "Style Guide Development", desc: "We define colour palettes, typography, and UI components to establish a consistent visual identity." },
      { title: "Wireframe Creation & Mockups", desc: "We develop wireframes and high-fidelity mockups that visualise the final design before any code is written." },
      { title: "Platform Setup", desc: "We choose and configure the right platform - CMS, eCommerce, or custom framework - based on your needs." },
      { title: "Front & Back-End Development", desc: "We build the full site using modern standards, ensuring responsiveness, speed, and security throughout." },
      { title: "Testing & Optimisation", desc: "We run thorough testing across devices and browsers and optimise for performance, SEO, and accessibility." },
      { title: "Client Review & Final Revisions", desc: "We present the developed site for your review, address feedback, and obtain final sign-off before launch." },
    ],
  },
  {
    label: "Phase 3",
    title: "Finalisation",
    desc: "This phase ensures the website is fully optimised, secure, and ready for a successful launch. We conduct final testing, enhance performance, and implement SEO best practices to maximise visibility. Post-launch, we provide continuous support, security updates, and performance monitoring.",
    steps: [
      { title: "Cross-Browser Testing", desc: "We verify the site works flawlessly across Chrome, Firefox, Safari, Edge, and mobile browsers." },
      { title: "Performance Optimisation", desc: "We optimise images, code, and caching to achieve fast load times and strong Core Web Vitals scores." },
      { title: "SEO Optimisation", desc: "We implement on-page SEO, structured data, and mobile-friendliness, then submit the site to search engines." },
      { title: "Final Client Review & Approval", desc: "We present the finished site, incorporate last refinements, and obtain your approval for deployment." },
      { title: "Website Launch", desc: "We configure hosting and domain, migrate the site to the live server, and conduct final checks." },
      { title: "Post-Launch Support", desc: "We monitor performance, apply security updates, and provide ongoing maintenance to keep your site running at its best." },
    ],
  },
];

export default function WebDesignProcess() {
  const [openPhase, setOpenPhase] = useState<number>(0);
  const [openStep, setOpenStep] = useState<string | null>(null);

  return (
    <div className="mt-16 space-y-0 divide-y divide-dark-border border-t border-dark-border">
      {phases.map((phase, pi) => (
        <div key={phase.title}>
          <button
            onClick={() => setOpenPhase(openPhase === pi ? -1 : pi)}
            className="w-full text-left py-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
            aria-expanded={openPhase === pi}
          >
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-dark-muted mb-3">{phase.label}</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white group-hover:text-red-brand transition-colors duration-200">
                {phase.title}
              </h3>
              <p className="mt-3 font-body text-sm text-dark-muted leading-relaxed max-w-xl">{phase.desc}</p>
            </div>
            <span className={`text-dark-muted text-xl mt-2 transition-transform duration-300 ${openPhase === pi ? "rotate-45" : ""}`}>+</span>
          </button>

          <AnimatePresence initial={false}>
            {openPhase === pi && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.steps.map((step, si) => {
                    const key = `${pi}-${si}`;
                    const isOpen = openStep === key;
                    return (
                      <button
                        key={step.title}
                        onClick={() => setOpenStep(isOpen ? null : key)}
                        className="text-left border border-dark-border rounded-xl p-5 hover:border-red-brand/50 transition-colors duration-200 group/step focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-brand"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-display font-semibold text-sm text-white">
                            {si + 1}. {step.title}
                          </span>
                          <span className={`text-dark-muted flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>+</span>
                        </div>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-3 font-body text-sm text-dark-muted leading-relaxed overflow-hidden"
                            >
                              {step.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
