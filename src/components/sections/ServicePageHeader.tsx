"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServicePageHeaderProps {
  title: string;
  backHref?: string;
  tag?: string;      // small category label shown above title
  subtitle?: string; // optional descriptor below title
}

export default function ServicePageHeader({
  title,
  backHref = "/services",
  tag,
  subtitle,
}: ServicePageHeaderProps) {
  return (
    <section className="relative overflow-hidden min-h-[380px] flex flex-col justify-end bg-[#0a0a0a] pb-16 pt-36">
      {/* Background image */}
      <Image
        src="/service-header-bg.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden="true"
      />

      {/* Gradient: strong on left for text, subtle on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <div className="container-wide relative z-10">
        <div className="max-w-[760px]">

          {/* Back arrow + title */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-5"
          >
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-display font-medium transition-colors duration-200 group"
              aria-label="Go back"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 text-base leading-none">←</span>
            </Link>
          </motion.div>

          {tag && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.22em] uppercase text-red-brand border border-red-brand/30 bg-red-brand/[0.08] rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-brand" />
                {tag}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display font-bold text-display-xl text-white leading-[1.04] max-w-[18ch]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="mt-4 font-body text-white/55 text-base leading-relaxed max-w-[44ch]"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
