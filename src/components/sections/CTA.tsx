"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-dark-bg py-24 md:py-36">
      {/* Red glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[400px] bg-red-brand opacity-[0.06] blur-[110px] rounded-full" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-dark-border" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <AnimateIn>
            <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-red-brand mb-5">
              No pressure. Just next steps.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h2 className="font-display font-bold text-[clamp(2.8rem,7vw,6.5rem)] text-white leading-[1.04] tracking-[-0.04em] uppercase mb-6">
              get started
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="font-display font-medium text-xl md:text-2xl text-[#888] leading-snug mb-10 max-w-xl">
              Tell us where you are and where you&apos;re headed.{" "}
              <span className="text-white">We&apos;ll handle the strategy.</span>
            </p>
          </AnimateIn>

          <AnimateIn delay={0.25}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href="/request-a-quote"
                className="inline-flex items-center gap-3 bg-red-brand text-white font-display font-bold
                           px-8 py-4 text-sm tracking-[0.15em] uppercase rounded-full
                           hover:bg-red-dark transition-colors duration-300"
              >
                request a proposal
                <span className="text-base">→</span>
              </Link>

              <div className="flex items-center gap-3">
                <span className="w-px h-8 bg-dark-border" />
                <div>
                  <p className="font-body text-sm text-dark-muted">
                    Or email us directly at{" "}
                    <a
                      href="mailto:hello@webgaze.com.au"
                      className="text-white hover:text-red-brand transition-colors duration-200"
                    >
                      hello@webgaze.com.au
                    </a>
                  </p>
                  <p className="font-body text-xs text-[#444] mt-0.5">
                    We typically respond within 1 business day.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
