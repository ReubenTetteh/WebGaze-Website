import Image from "next/image";

type ProjectHeroPreviewProps = {
  src: string;
  alt: string;
  url: string;
  /** When true, render the full-page screenshot and scroll it top-to-bottom on hover. */
  scroll?: boolean;
  priority?: boolean;
};

/**
 * Browser-framed project hero.
 *
 * In `scroll` mode the full-page screenshot is laid out at its natural height
 * inside a short viewport, then translated up on hover so the whole page glides
 * past — `calc(-100% + Hpx)` aligns the image's bottom edge to the viewport's
 * bottom regardless of the screenshot's actual height.
 */
export default function ProjectHeroPreview({
  src,
  alt,
  url,
  scroll = false,
  priority = false,
}: ProjectHeroPreviewProps) {
  return (
    <div className="group relative overflow-hidden rounded-[10px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex min-w-0 items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1 font-body text-xs text-white/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 shrink-0" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span className="truncate">{url}</span>
        </span>
      </div>

      {scroll ? (
        <div className="relative h-[360px] overflow-hidden md:h-[460px]">
          {/* `h-auto w-full` keeps the full-page screenshot at its natural laid-out
              height (the hover translate depends on it) while still serving the
              resized AVIF/WebP rendition instead of the raw multi-hundred-KB JPEG.
              width/height only seed the pre-load aspect ratio — the clipping
              container's height is fixed, so a mismatch can't shift layout. */}
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={4320}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="block h-auto w-full will-change-transform transition-transform duration-[5500ms] ease-linear group-hover:[transform:translateY(calc(-100%_+_360px))] md:group-hover:[transform:translateY(calc(-100%_+_460px))]"
          />
        </div>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-[2600ms] ease-in-out group-hover:-translate-y-[24%] group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Attention cue — pulses, ripples, and nudges so visitors notice the scroll interaction; fades the moment they hover. */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-0">
        <div className="relative flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur">
          {/* expanding ripple ring */}
          <span className="absolute inset-0 -z-10 animate-ripple rounded-full border border-red-light/60" />
          {/* soft breathing glow */}
          <span className="absolute inset-0 -z-10 animate-breathe rounded-full bg-red-brand/25 blur-md" />
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-red-light/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-red-light" />
          </span>
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
            Hover to scroll
          </span>
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 animate-nudge text-red-light" aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
