"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";

const TEXT =
  "Web Design · Visual Branding · SEO & Growth · Website Maintenance · Consulting & Audit · Digital Strategy · ";

export default function VelocityBanner() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(scrollVelocity, [-0.5, 0.5], ["20deg", "-20deg"]);
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -2400]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  return (
    <section
      ref={targetRef}
      className="bg-dark-bg border-y border-dark-border overflow-hidden py-6"
    >
      <motion.p
        style={{ skewX, x }}
        className="origin-bottom-left whitespace-nowrap font-display font-black uppercase
                   text-4xl md:text-5xl leading-none tracking-[-0.02em]
                   text-white/90 select-none"
      >
        {/* Repeat text so it fills wide screens */}
        {TEXT.repeat(4)}
        <span className="text-red-brand">{TEXT.repeat(2)}</span>
      </motion.p>
    </section>
  );
}
