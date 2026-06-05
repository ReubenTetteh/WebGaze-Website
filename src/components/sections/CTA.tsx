"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileCta from "./MobileCta";

const EASE = [0.16, 1, 0.3, 1] as const;

// CTA copy. `lead` renders in white, `accent` in faded white — together they
// form one short, punchy line: `{lead} {accent}.`
export type CtaProps = {
  eyebrow?: string;
  lead?: string;
  accent?: string;
};

// Default = the general CTA used on home / about / projects / services index.
const DEFAULT_COPY = {
  eyebrow: "No pressure. Just next steps.",
  lead: "Let's build something that",
  accent: "earns its keep",
};

export default function CTA(props: CtaProps = {}) {
  const isMobile = useIsMobile();
  const copy = {
    eyebrow: props.eyebrow ?? DEFAULT_COPY.eyebrow,
    lead: props.lead ?? DEFAULT_COPY.lead,
    accent: props.accent ?? DEFAULT_COPY.accent,
  };

  // Phones get the v2-style full-screen section with in-page modal.
  if (isMobile) {
    return <MobileCta {...copy} />;
  }

  // Desktop — clean, thin CTA row shared site-wide. No vertical marquee.
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-10 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 h-56 w-[420px] -translate-y-1/2 rounded-full bg-red-brand opacity-[0.07] blur-[120px]"
      />
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-red-brand"
      />
      <div className="container-wide relative z-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-red-brand">
              {copy.eyebrow}
            </p>
            <p className="mt-3 max-w-[24ch] font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[2rem]">
              {copy.lead}{" "}
              <span className="text-white/45">{copy.accent}</span>.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/request-a-quote" className="btn-primary justify-center">
              Request a Proposal
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/book-a-discovery-session"
              className="btn-outline justify-center border-white/30 text-white hover:border-red-brand"
            >
              Book Discovery Call
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
