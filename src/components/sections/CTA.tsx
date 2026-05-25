"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

function VerticalMarquee({
  children,
  pauseOnHover = true,
  reverse = false,
  className,
  speed = 24,
}: {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}) {
  return (
    <div
      className={cn("group flex flex-col overflow-hidden", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 flex-col animate-marquee-vertical",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

// Who we build for — scrolls beside the final ask.
const audiences = [
  "Care Providers",
  "Startups & Founders",
  "Trades & Services",
  "Real Estate",
  "Energy & Industry",
  "Health & Wellness",
  "Local Businesses",
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-dark-bg py-24 md:py-32">
      {/* Red glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-red-brand opacity-[0.07] blur-[120px] rounded-full" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-dark-border" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left — the ask */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xl"
          >
            <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-red-brand mb-6">
              No pressure. Just next steps.
            </p>
            <h2 className="font-display font-bold text-[clamp(2.75rem,6vw,5rem)] text-white leading-[0.98] tracking-[-0.03em]">
              Let&apos;s get<br />started.
            </h2>
            <p className="font-display font-medium text-lg md:text-xl text-[#888] leading-snug mt-8 mb-10">
              Tell us where you are and where you&apos;re headed.{" "}
              <span className="text-white">We&apos;ll handle the strategy, design, and build.</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/request-a-quote"
                className="group relative overflow-hidden rounded-full bg-red-brand px-8 py-4
                           font-display text-sm font-bold uppercase tracking-[0.15em] text-white
                           transition-colors duration-300 hover:bg-red-dark"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Request a Proposal <span className="text-base">→</span>
                </span>
                <span className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              </Link>

              <a
                href="mailto:hello@webgaze.com.au"
                className="rounded-full border border-white/20 px-8 py-4
                           font-display text-sm font-bold uppercase tracking-[0.15em] text-white
                           transition-colors duration-300 hover:border-red-brand hover:text-red-brand"
              >
                Email Us
              </a>
            </div>

            <p className="font-body text-xs text-[#555] mt-6">
              We typically respond within 1 business day.
            </p>
          </motion.div>

          {/* Right — vertical marquee of who we build for.
              A CSS mask fades the top/bottom toward the section so the centre
              reads brightest — no per-frame JS measuring required. */}
          <div
            className="relative hidden h-[360px] overflow-hidden sm:block lg:h-[560px]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)",
            }}
          >
            <VerticalMarquee speed={22} className="h-full">
              {audiences.map((item) => (
                <div
                  key={item}
                  className="py-6 font-display font-semibold tracking-[-0.02em] text-white
                             text-4xl md:text-5xl lg:text-6xl"
                >
                  {item}
                </div>
              ))}
            </VerticalMarquee>
          </div>

        </div>
      </div>
    </section>
  );
}
