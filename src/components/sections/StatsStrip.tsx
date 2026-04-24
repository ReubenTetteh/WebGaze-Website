"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "5+", label: "Years of Experience" },
  { value: "7", label: "Industries Served" },
  { value: "3–6wk", label: "Average Build Time" },
];

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-dark-bg border-t border-dark-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-dark-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="py-10 px-8 first:pl-0 last:pr-0 flex flex-col gap-1"
            >
              <span className="font-display font-bold text-[2.6rem] leading-none tracking-[-0.04em] text-white">
                {stat.value}
              </span>
              <span className="font-body text-sm text-dark-muted mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
