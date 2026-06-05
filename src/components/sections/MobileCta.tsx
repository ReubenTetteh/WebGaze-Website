"use client";
// Mobile-only final CTA — dark red gradient, headline customizable per page.
// Opens the shared QuoteSheet modal in-page. Ported from /v2's Finale section.

import { useState } from "react";
import QuoteSheet from "@/components/ui/QuoteSheet";

type MobileCtaProps = {
  eyebrow?: string;
  lead?: string;
  accent?: string;
};

export default function MobileCta({
  eyebrow = "No pressure. Just next steps.",
  lead = "Let's build something that",
  accent = "earns its keep",
}: MobileCtaProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden bg-gradient-to-b from-black via-[#15050a] to-[#3a060c] px-6 pt-28 pb-16">
      <div>
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-red-brand">
          {eyebrow}
        </p>
        <h2
          className="mt-7 font-display font-bold leading-[1.02] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(2.5rem, 12vw, 3.6rem)" }}
        >
          {lead} <span className="text-white/45">{accent}</span>.
        </h2>
        <p className="mt-8 font-display font-medium text-[1.05rem] leading-snug text-white/55">
          Tell us where you are and where you&apos;re headed.{" "}
          <span className="text-white">
            We&apos;ll handle the strategy, design, and build.
          </span>
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-red-brand px-7 font-display text-sm font-bold uppercase tracking-[0.14em] text-white transition active:scale-[0.98]"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            Request a Proposal <span className="text-base">→</span>
          </span>
        </button>
        <a
          href="mailto:hello@webgaze.com.au"
          className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/20 px-7 font-display text-sm font-bold uppercase tracking-[0.14em] text-white"
        >
          Email Us
        </a>
        <p className="pt-4 text-center font-body text-[11px] text-white/40">
          We typically respond within 1 business day.
        </p>
      </div>

      <QuoteSheet open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
