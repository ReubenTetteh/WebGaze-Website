"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PortfolioGalleryProps {
  title?: string;
  /**
   * Optional CTA button. WebGaze's "Our Work" header omits this
   * (the View gallery button was removed), so it defaults to undefined.
   */
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
    /** Project detail page this tile links to (e.g. `/projects/sababa-global`). */
    href?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content in marquee (mobile only)
   * @default 4
   */
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title = "Our Work",
  archiveButton,
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Each tile links to its real project page so "Our Work" is clickable.
  const defaultImages = [
    { src: "/portfolio/care-partners-australia-cover.jpg", alt: "Care Partners Australia — NDIS & disability support website design by WebGaze", href: "/projects/care-partners-australia" },
    { src: "/portfolio/australian-ghanaian-chamber-of-commerce-cover.jpg", alt: "Australian Ghanaian Chamber of Commerce — business & trade website design by WebGaze", href: "/projects/australian-ghanaian-chamber-of-commerce" },
    { src: "/portfolio/winstamac-tile.avif", alt: "WINSTAMAC — house-plan marketplace website design by WebGaze", href: "/projects/winstamac" },
    { src: "/portfolio/sababa-global-cover.webp", alt: "Sababa Global Trade & Logistics — freight forwarding website design by WebGaze", href: "/projects/sababa-global" },
    { src: "/portfolio/viride-energy-africa-cover.webp", alt: "Viride Energy Africa — renewable energy website design by WebGaze", href: "/projects/viride-energy-africa" },
    { src: "/portfolio/ben-ari-accounting-cover.jpg", alt: "Ben Ari Accounting — accounting & advisory website design by WebGaze", href: "/projects/ben-ari-accounting" },
    { src: "/portfolio/phytoscience-australia-cover.webp", alt: "PhytoScience Australia — health & wellness website design by WebGaze", href: "/projects/phytoscience-australia" },
    { src: "/portfolio/petra-care-services-cover.webp", alt: "Petra Care Services — community care website design by WebGaze", href: "/projects/petra-care-services" },
    { src: "/portfolio/janny-global-cover.webp", alt: "Janny Global — real estate mobile UI & website design by WebGaze", href: "/projects/janny-global" },
    { src: "/portfolio/salaka-dance-ensemble-cover.webp", alt: "Salaka Dance Ensemble — performing arts website design by WebGaze", href: "/projects/salaka-dance-ensemble" },
  ]

  const images = customImages || defaultImages

  // Shared tile chrome — used by both the desktop 3D layout and the mobile marquee.
  const cardShadow = {
    boxShadow: `
      rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
      rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
      rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
      rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
    `,
  } as const

  return (
    <section
      aria-label={title}
      className={`relative min-h-screen py-20 px-4 ${className}`}
      id="archives"
    >
      <div className="max-w-7xl mx-auto bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
        {/* Header Section */}
        <div className="relative z-10 text-center pt-16 pb-8 px-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#111] dark:text-white mb-8 text-balance">{title}</h2>

          {archiveButton && (
            <Link
              href={archiveButton.href}
              className="inline-flex items-center gap-3 bg-[#111] text-white hover:bg-[#111]/90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-6 py-3 rounded-full font-medium transition-colors group mb-20"
            >
              <span>{archiveButton.text}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Desktop 3D overlapping layout - hidden on mobile */}
        <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
            {images.map((image, index) => {
              // Calculate stagger height - peak in middle, descending to edges
              const totalImages = images.length
              const middle = Math.floor(totalImages / 2)
              const distanceFromMiddle = Math.abs(index - middle)
              const staggerOffset = maxHeight - distanceFromMiddle * 20

              const zIndex = totalImages - index

              const isHovered = hoveredIndex === index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

              // When hovering: hovered card moves to consistent top position, others move to baseline
              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: zIndex,
                  }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2, // Much faster hover animation
                    delay: index * 0.05, // Faster entrance stagger
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => onImageClick?.(index)}
                >
                  {image.href ? (
                    <Link
                      href={image.href}
                      aria-label={image.alt}
                      className="relative block aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={cardShadow}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover object-left-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  ) : (
                    <div
                      className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={cardShadow}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover object-left-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile marquee layout */}
        <div className="block md:hidden relative pb-8">
          <div
            className={cn(
              "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
              "flex-row"
            )}
          >
            {Array(marqueeRepeat)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)]",
                    "animate-marquee flex-row",
                    {
                      "group-hover:[animation-play-state:paused]": pauseOnHover,
                    }
                  )}
                >
                  {images.map((image, index) => {
                    const inner = (
                      <div
                        className="relative aspect-video w-64 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                        style={cardShadow}
                      >
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-full object-cover object-left-top"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    );
                    return image.href ? (
                      <Link
                        key={`${i}-${index}`}
                        href={image.href}
                        aria-label={image.alt}
                        className="group cursor-pointer flex-shrink-0"
                        onClick={() => onImageClick?.(index)}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div
                        key={`${i}-${index}`}
                        className="group cursor-pointer flex-shrink-0"
                        onClick={() => onImageClick?.(index)}
                      >
                        {inner}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
