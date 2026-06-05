"use client";
// PHASE: parallax-improve-pass-1 (paused 2026-05-15) — see memory project_home_parallax_portfolio.md
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MobilePortfolio from "@/components/sections/MobilePortfolio";
import { useIsMobile } from "@/hooks/useIsMobile";

export type ParallaxProduct = {
  title: string;
  link: string;
  thumbnail: string;
  category?: string;
  year?: string;
};

export const HeroParallax = ({
  products,
}: {
  products: ParallaxProduct[];
}) => {
  const rows = splitIntoRows(products, 2);
  const [firstRow, secondRow] = rows;

  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 90, damping: 28, mass: 1 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-100, 0]),
    springConfig
  );

  // Phones get a bespoke coverflow carousel; the desktop tree below is
  // left exactly as-is (it's the version the user signed off on).
  if (isMobile) {
    return <MobilePortfolio products={products} />;
  }

  if (prefersReducedMotion) {
    return (
      <section
        aria-labelledby="parallax-heading"
        className="relative bg-dark-bg py-20 md:py-28 overflow-hidden"
      >
        <AmbientGlow />
        <Header />
        <div className="mt-12 md:mt-16 flex flex-col gap-6 md:gap-8">
          {rows.map((row, i) => (
            <StaticRow key={i} items={row} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-labelledby="parallax-heading"
      className="relative bg-dark-bg antialiased h-[200vh] md:h-[220vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col [perspective:1000px] [transform-style:preserve-3d] pt-16 md:pt-20 pb-10">
        <AmbientGlow />
        <Header />
        <div className="flex-1 flex items-center mt-8 md:mt-10">
          <motion.div
            style={{ rotateX, rotateZ, translateY, opacity }}
            className="will-change-transform w-full"
          >
            <ParallaxRow items={firstRow} direction="left" duration={48} priority />
            <ParallaxRow items={secondRow} direction="right" duration={57.6} last />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const splitIntoRows = <T,>(items: T[], rows: number): T[][] => {
  const per = Math.ceil(items.length / rows);
  return Array.from({ length: rows }, (_, i) =>
    items.slice(i * per, (i + 1) * per)
  );
};

const AmbientGlow = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-60"
    style={{
      background:
        "radial-gradient(60% 40% at 50% 10%, rgba(224,27,36,0.10), transparent 70%), radial-gradient(40% 30% at 80% 60%, rgba(255,255,255,0.04), transparent 70%)",
    }}
  />
);

const ParallaxRow = ({
  items,
  direction,
  duration,
  last,
  priority = false,
}: {
  items: ParallaxProduct[];
  direction: "left" | "right";
  duration: number;
  last?: boolean;
  priority?: boolean;
}) => (
  <div className={last ? "" : "mb-3 md:mb-4 lg:mb-5"}>
    {/* duplicated set + travel of exactly -50% = seamless infinite loop */}
    <motion.div
      className="flex w-max"
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {[...items, ...items].map((product, i) => (
        <div key={`${product.title}-${i}`} className="shrink-0 pr-3 md:pr-4 lg:pr-5">
          {/* Preload only the first (original, non-duplicated) set of the lead row. */}
          <ProductCard product={product} priority={priority && i < items.length} />
        </div>
      ))}
    </motion.div>
  </div>
);

const StaticRow = ({ items }: { items: ParallaxProduct[] }) => (
  <div className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 snap-x snap-mandatory">
    {items.map((product, i) => (
      <div key={product.title} className="snap-start">
        <ProductCard product={product} priority={i < 3} />
      </div>
    ))}
  </div>
);

export const Header = () => {
  return (
    <div className="container-wide relative w-full z-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2
            id="parallax-heading"
            className="font-display font-bold text-[clamp(1.75rem,4vw,3.75rem)] leading-[1.04] tracking-[-0.03em] text-white"
          >
            Projects that<br />speak for themselves.
          </h2>
          <p className="max-w-xl text-sm md:text-base mt-4 text-neutral-300">
            A selection of recent websites, brand systems, and digital
            experiences for clients across Australia and beyond.
          </p>
        </div>

        <Link
          href="/projects"
          className="self-start md:self-auto inline-flex items-center gap-3 font-display font-bold text-sm
                     tracking-[0.18em] uppercase text-white border border-white/15 px-7 py-4 rounded-full
                     hover:border-red-brand hover:text-red-brand transition-colors duration-300 group flex-shrink-0"
        >
          See All Projects
          <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </Link>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  priority = false,
}: {
  product: ParallaxProduct;
  translate?: MotionValue<number>;
  /** Preload (vs. just eager-load) — used for the first row so the work
      gallery is fully painted by the time the visitor scrolls to it. */
  priority?: boolean;
}) => {
  return (
    <motion.div
      style={translate ? { x: translate } : undefined}
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group/product relative flex-shrink-0
                 w-[20.4rem] aspect-[16/9]
                 sm:w-[22.8rem]
                 md:w-[26.4rem]
                 lg:w-[30rem]"
    >
      <Link
        href={product.link}
        aria-label={`View ${product.title}`}
        className="block h-full w-full rounded-2xl overflow-hidden bg-[#111]
                   ring-1 ring-white/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]
                   transition-all duration-500
                   group-hover/product:ring-red-brand/40
                   group-hover/product:shadow-[0_25px_60px_-20px_rgba(224,27,36,0.35)]"
      >
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={product.thumbnail}
            height={720}
            width={1280}
            sizes="(max-width: 640px) 326px, (max-width: 768px) 365px, (max-width: 1024px) 422px, 480px"
            priority={priority}
            // First row preloads; the rest still load eagerly so no tile
            // fades in blank as the marquee comes into view.
            loading={priority ? undefined : "eager"}
            className="object-cover object-center absolute h-full w-full inset-0
                       transition-transform duration-700 ease-out
                       group-hover/product:scale-[1.06]"
            alt={product.title}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5
                       bg-gradient-to-t from-black/85 via-black/35 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 p-3">
            <h3 className="font-display font-semibold text-white text-xs md:text-sm leading-snug
                           opacity-90 group-hover/product:opacity-100 transition-opacity duration-300">
              {product.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
