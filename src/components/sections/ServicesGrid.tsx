"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

const services = [
  {
    title: "Web Design & Development",
    desc: "At WebGaze, we design and build websites that work for your business. Every site is carefully designed and built to help your brand stand out, perform well online, and connect with the right audience.",
    tags: ["REACT.JS", "E-COMMERCE", "WORDPRESS"],
    href: "/services",
  },
  {
    title: "Visual Branding",
    desc: "Visual branding is how people recognise your brand. We create cohesive brand visuals — from logos to colour systems — that help your business stand out, stay consistent, and connect with the right audience.",
    tags: ["GRAPHIC DESIGN", "LOGO DESIGN", "BRAND GUIDE"],
    href: "/services",
  },
  {
    title: "Website Maintenance",
    desc: "Every website needs ongoing maintenance to stay secure, fast, and up to date. Regular care helps prevent issues and ensures a smooth experience for your users.",
    tags: ["SECURITY", "UPDATES", "BACKUPS"],
    href: "/services",
  },
  {
    title: "Search Engine Optimization",
    desc: "A strong SEO strategy helps your website get found by the right people. We optimise your site to improve visibility, attract relevant traffic, and support a smooth user experience.",
    tags: ["ON-PAGE SEO", "KEYWORD RESEARCH", "ANALYTICS"],
    href: "/services",
  },
  {
    title: "Consulting & Audit",
    desc: "Our website consultation and audit services help you understand what's working and what needs improvement. We review your site's performance, security, design, and SEO.",
    tags: ["SEO AUDIT", "SECURITY AUDIT", "UI/UX AUDIT"],
    href: "/services",
  },
];

const CARD_STICKY_BASE = 160;
const CARD_STACK_OFFSET = 28;

export default function ServicesGrid() {
  return (
    <section className="bg-light-bg dark:bg-dark-bg py-20 md:py-28 lg:py-36">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">

          {/* Left — sticky intro */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <AnimateIn delay={0.1}>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0f0f0f] dark:text-white leading-[1.1]">
                Everything You Need to Build a Strong Online Presence
              </h2>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <p className="mt-6 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-md">
                Everything we do is focused on helping businesses build a strong and consistent online presence. From strategy and design to optimisation and ongoing support, our services are designed to support growth with clarity and confidence.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Contact Us
                </Link>
                <Link href="/request-a-quote" className="btn-outline">
                  Request Proposal
                </Link>
              </div>
            </AnimateIn>
          </div>

          {/* Right — sticky stacking cards */}
          <div className="relative">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="sticky mb-4"
                style={{
                  top: `${CARD_STICKY_BASE + i * CARD_STACK_OFFSET}px`,
                  zIndex: i + 1,
                }}
              >
                <div className="bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 group
                               shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]
                               dark:shadow-[0_4px_32px_rgba(224,27,36,0.08)] dark:hover:shadow-[0_8px_48px_rgba(224,27,36,0.18)]
                               transition-all duration-300">

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-[#0f0f0f] dark:text-white mb-4 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-[15px] text-light-muted dark:text-dark-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-display font-semibold tracking-[0.14em] uppercase
                                   px-3 py-1.5 rounded-full border border-light-border dark:border-dark-border
                                   text-[#555] dark:text-dark-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-light-border dark:border-dark-border pt-5 flex items-center justify-between gap-4">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 font-display font-semibold text-sm text-[#0f0f0f] dark:text-white
                                 border border-[#0f0f0f] dark:border-white rounded-full px-4 py-2
                                 hover:bg-[#0f0f0f] hover:text-white dark:hover:bg-white dark:hover:text-dark-bg
                                 transition-all duration-200"
                    >
                      Learn more →
                    </Link>
                    <Link
                      href="/projects"
                      className="font-display font-bold text-sm text-[#0f0f0f] dark:text-white hover:text-red-brand dark:hover:text-red-brand transition-colors duration-200"
                    >
                      View Our Work →
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
