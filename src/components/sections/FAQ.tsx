"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";
import { faqs } from "@/lib/faqs";

type FAQProps = {
  variant?: "full" | "column";
};

export default function FAQ({ variant = "full" }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  const accordionItems = faqs.map((faq, i) => (
    <AnimateIn key={i} delay={i * 0.06}>
      <div className="py-5">
        <button
          onClick={() => setOpen(open === i ? null : i)}
          className="w-full flex items-start justify-between gap-6 text-left group"
        >
          <span className="font-display font-semibold text-base md:text-lg dark:text-white group-hover:text-red-brand transition-colors duration-200">
            {faq.q}
          </span>
          <motion.span
            animate={{ rotate: open === i ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 w-7 h-7 rounded-full border border-current flex items-center justify-center mt-0.5 text-base"
          >
            +
          </motion.span>
        </button>

        <AnimatePresence>
          {open === i && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-sm font-body text-light-muted dark:text-dark-muted leading-relaxed">
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimateIn>
  ));

  // ── Column layout — designed to sit beside the Testimonials in a shared row ──
  if (variant === "column") {
    return (
      <div className="flex h-full flex-col">
        <span className="label-tag">FAQ</span>
        <h2 className="mt-5 font-display font-bold text-display-lg dark:text-white">
          Questions, Answered.
        </h2>
        <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-light-muted dark:text-dark-muted">
          Can&apos;t find the answer you&apos;re looking for? Reach out directly — we&apos;re happy to help.
        </p>

        <div className="mt-9 flex-1 divide-y divide-light-border border-t border-light-border dark:divide-dark-border dark:border-dark-border">
          {accordionItems}
        </div>

        <a href="mailto:hello@webgaze.com.au" className="mt-8 inline-flex btn-primary self-start">
          Email Us
        </a>
      </div>
    );
  }

  // ── Full layout (original) ──
  return (
    <section className="section-pad bg-light-bg dark:bg-dark-bg">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Left */}
          <div>
            <AnimateIn>
              <span className="label-tag">FAQ</span>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="mt-5 font-display font-bold text-display-lg dark:text-white">
                Questions,
                <br />
                Answered.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-6 text-base font-body text-light-muted dark:text-dark-muted max-w-sm leading-relaxed">
                Can&apos;t find the answer you&apos;re looking for? Reach out directly — we&apos;re happy to help.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <a href="mailto:hello@webgaze.com.au" className="mt-8 inline-flex btn-primary">
                Email Us
              </a>
            </AnimateIn>
          </div>

          {/* Right - accordion */}
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {accordionItems}
          </div>
        </div>
      </div>
    </section>
  );
}
