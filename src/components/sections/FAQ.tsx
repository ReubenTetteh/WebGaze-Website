"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

const faqs = [
  {
    q: "What does WebGaze actually do?",
    a: "WebGaze helps businesses grow online through strategic website design, branding, SEO, and ongoing digital support. We don't just build websites — we create digital experiences designed to attract the right audience and convert them into customers.",
  },
  {
    q: "How much does a website cost?",
    a: "Every project is different. Pricing depends on your goals, features, and level of support required. After a quick conversation, we'll recommend a clear, practical solution and provide a custom proposal with no obligation.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most websites are completed within 2–6 weeks, depending on scope and content readiness. We'll give you realistic timelines upfront and keep you informed at every stage of the process.",
  },
  {
    q: "Can you redesign or improve an existing website?",
    a: "Absolutely. If your current website feels outdated, slow, or isn't converting, we can audit it, identify opportunities, and redesign or optimise it to perform better — without starting from scratch if it's not necessary.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We offer website maintenance plans starting from $129/month, covering security updates, backups, performance monitoring, and ongoing peace of mind so your site stays healthy long after launch.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

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
            {faqs.map((faq, i) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
