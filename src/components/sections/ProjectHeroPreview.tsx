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
          {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary-height full-page screenshot needs natural rendering, not next/image's fixed box */}
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="block w-full will-change-transform transition-transform duration-[5500ms] ease-linear group-hover:[transform:translateY(calc(-100%_+_360px))] md:group-hover:[transform:translateY(calc(-100%_+_460px))]"
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

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur transition duration-300 group-hover:opacity-0">
        Hover to scroll
      </div>
    </div>
  );
}
