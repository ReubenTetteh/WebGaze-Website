import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = {
  logos: Logo[];
};

/**
 * Auto-scrolling client logo wall. Full-colour brand marks render directly on
 * the dark hero (no backing chips), normalised to a uniform height. Relies on
 * the source PNGs having transparent backgrounds.
 */
export function LogoCloud({ logos }: LogoCloudProps) {
  // With only a few logos, one loop set is narrower than a wide track, so the
  // marquee's wrap point leaves blank space on the right. Repeat the set so it
  // always overflows the container, and scale the duration by the same factor
  // to keep the scroll speed unchanged.
  const REPEAT = 4;
  const items = Array.from({ length: REPEAT }, () => logos).flat();

  return (
    <div className="relative w-full overflow-hidden">
      <InfiniteSlider gap={48} duration={48 * REPEAT} durationOnHover={142 * REPEAT} reverse>
        {items.map((logo, index) => (
          /* eslint-disable-next-line @next/next/no-img-element -- client logos are arbitrary-ratio assets normalised by height */
          <img
            key={`${logo.alt}-${index}`}
            src={logo.src}
            alt={logo.alt}
            /* Top-of-page social proof — load with the page so logos never pop in
               under the hero. They're tiny transparent PNGs, so eager is cheap. */
            loading="eager"
            decoding="async"
            fetchPriority={index < logos.length ? "high" : "auto"}
            className="h-8 w-auto max-w-[160px] select-none object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 md:h-10"
          />
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[120px] md:w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[120px] md:w-[160px]"
        direction="right"
      />
    </div>
  );
}
