"use client";

import { LogoCloud } from "@/components/ui/logo-cloud-4";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileClientLogos from "./MobileClientLogos";

const CLIENT_LOGOS = [
  { src: "/clients/care-partners-australia.png", alt: "Care Partners Australia" },
  { src: "/clients/agcci.png", alt: "Australian Ghanaian Chamber of Commerce and Industry" },
  { src: "/clients/salaka-dance-ensemble.png", alt: "Salaka Dance Ensemble" },
  { src: "/clients/viride-energy-africa.png", alt: "Viride Energy Africa" },
  { src: "/clients/camden-tyre-recycle.png", alt: "Camden Tyre Recycle" },
];

/**
 * Compact full-width white shelf emerging from the dark hero. The label is
 * pinned left on a solid white layer (z-20); the scrolling logo track is tucked
 * slightly underneath it (negative margin, z-10) so logos appear to glide out
 * from behind the text. The left fade smooths the emergence.
 */
export default function ClientLogos() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileClientLogos logos={CLIENT_LOGOS} />;
  }

  return (
    <section className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.25rem] bg-white py-5 md:-mt-16 md:rounded-t-[3rem] md:py-6">
      <div className="relative mx-auto flex max-w-[1400px] items-center px-4 md:px-10">
        {/* Label — solid white layer above the logos */}
        <div className="relative z-20 flex shrink-0 items-center bg-white pr-5 md:pr-7">
          <span className="max-w-[150px] font-display text-[11px] font-semibold uppercase leading-snug tracking-[0.2em] text-[#6b6b6b]">
            Trusted by organisations across Australia
          </span>
        </div>

        {/* Logos — tucked behind the label, scrolling out from behind it */}
        <div className="relative z-10 -ml-5 min-w-0 flex-1 md:-ml-7">
          <LogoCloud logos={CLIENT_LOGOS} />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white via-white/70 to-white/0 md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/70 to-white/0 md:w-28" />
        </div>
      </div>
    </section>
  );
}
