"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import type { Logo } from "@/components/ui/logo-cloud-4";

/**
 * Mobile-only "trusted by" strip. Unlike the desktop layout (label pinned left,
 * logos squeezed beside it), here the label sits centered on top and the logo
 * marquee gets the full screen width — with only thin edge fades so the logos
 * are actually visible on a narrow screen.
 */
export default function MobileClientLogos({ logos }: { logos: Logo[] }) {
  // Repeat the set so the track always overflows the narrow viewport.
  const REPEAT = 4;
  const items = Array.from({ length: REPEAT }, () => logos).flat();

  return (
    <section className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.25rem] bg-white pb-5 pt-6">
      <p className="mx-auto mb-5 max-w-[240px] px-4 text-center font-display text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#8a8a8a]">
        Trusted by organisations across Australia
      </p>

      <div className="relative">
        <InfiniteSlider gap={36} duration={50} durationOnHover={120} reverse>
          {items.map((logo, index) => (
            /* eslint-disable-next-line @next/next/no-img-element -- client logos are arbitrary-ratio assets normalised by height */
            <img
              key={`${logo.alt}-${index}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-8 w-auto max-w-[128px] select-none object-contain opacity-90"
            />
          ))}
        </InfiniteSlider>

        {/* Thin edge fades — just enough to soften, not hide, the logos. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-white/0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-white/0" />
      </div>
    </section>
  );
}
