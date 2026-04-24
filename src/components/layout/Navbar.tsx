"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const serviceLinks = [
  {
    label: "Website Design & Development",
    short: "Custom, high-performance websites built to convert.",
    href: "/services#web",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Visual Branding",
    short: "Cohesive brand identities that make you unmistakable.",
    href: "/services#branding",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="19" cy="13" r="2" />
        <circle cx="6" cy="13" r="2" />
        <circle cx="10" cy="19" r="2" />
        <path d="M13.5 9C12 13 8 14 8 14M13.5 9C15 12 17.5 12 17.5 12M8 15c1 2 2 2.5 2 2.5M17.5 12c0 2-1.5 3.5-1.5 3.5" />
      </svg>
    ),
  },
  {
    label: "Website Maintenance",
    short: "Keep your site secure, fast, and up to date.",
    href: "/services#maintenance",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Search Engine Optimisation",
    short: "Get found by the right people at the right time.",
    href: "/services#seo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    label: "Consulting & Audit",
    short: "Understand what's working and what needs to improve.",
    href: "/services#audit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "#" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const linkColor = scrolled ? "text-[#0a0a0a] dark:text-[#e0e0e0]" : "text-[#cccccc]";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-light-border dark:border-dark-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-wide flex items-center justify-between h-[70px] md:h-[80px]">

          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Image
              src={mounted && scrolled && theme === "light" ? "/images/logo-dark-cropped.png" : "/images/logo-white-cropped.png"}
              alt="WebGaze"
              width={200}
              height={50}
              className="h-8 md:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={cn(
                      "flex items-center gap-1 font-display text-base font-medium tracking-wide transition-colors duration-200 relative group hover:text-red-brand",
                      linkColor
                    )}
                  >
                    {link.label}
                    <motion.span
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs mt-0.5 opacity-60"
                    >
                      ▾
                    </motion.span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-brand group-hover:w-full transition-all duration-300" />
                  </button>

                  {/* Mega-menu */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px]
                                   bg-light-bg dark:bg-dark-surface rounded-2xl
                                   border border-light-border dark:border-dark-border
                                   shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                                   overflow-hidden p-2"
                      >
                        {/* Header strip */}
                        <div className="px-4 py-3 mb-1">
                          <p className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-red-brand">
                            Our Services
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-0.5">
                          {serviceLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-start gap-4 px-4 py-3 rounded-xl group/item
                                         hover:bg-light-surface dark:hover:bg-dark-border
                                         transition-colors duration-150"
                            >
                              {/* Icon box */}
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-light-surface dark:bg-dark-border
                                              flex items-center justify-center
                                              text-[#555] dark:text-[#888]
                                              group-hover/item:bg-red-brand/10 group-hover/item:text-red-brand
                                              transition-colors duration-150">
                                {sub.icon}
                              </div>
                              {/* Text */}
                              <div className="min-w-0">
                                <p className="font-display font-semibold text-sm text-[#0a0a0a] dark:text-[#e0e0e0]
                                              group-hover/item:text-red-brand transition-colors duration-150 leading-snug">
                                  {sub.label}
                                </p>
                                <p className="font-body text-xs text-light-muted dark:text-dark-muted mt-0.5 leading-relaxed">
                                  {sub.short}
                                </p>
                              </div>
                              {/* Arrow */}
                              <span className="flex-shrink-0 self-center text-xs text-[#bbb] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200 ml-auto">
                                →
                              </span>
                            </Link>
                          ))}
                        </div>

                        {/* Footer strip */}
                        <div className="mt-2 pt-2 px-4 pb-3 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                          <span className="font-body text-xs text-light-muted dark:text-dark-muted">
                            Not sure where to start?
                          </span>
                          <Link
                            href="/request-a-quote"
                            onClick={() => setServicesOpen(false)}
                            className="font-display text-xs font-semibold text-red-brand hover:underline"
                          >
                            Get a free proposal →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-display text-base font-medium tracking-wide transition-colors duration-200 relative group hover:text-red-brand",
                    linkColor
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-brand group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle — single icon */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-light-border dark:border-dark-border
                           hover:border-red-brand dark:hover:border-red-brand transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            {/* CTA */}
            <Link href="/request-a-quote" className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5">
              Get a Free Proposal
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-[5px] w-9 h-9 items-center justify-center"
              aria-label="Toggle menu"
            >
              <span className={cn("block w-5 h-[1.5px] bg-current transition-all duration-300", menuOpen && "rotate-45 translate-y-[7px]")} />
              <span className={cn("block w-5 h-[1.5px] bg-current transition-all duration-300", menuOpen && "opacity-0")} />
              <span className={cn("block w-5 h-[1.5px] bg-current transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[7px]")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-light-bg dark:bg-dark-bg flex flex-col pt-24 px-6 pb-10 overflow-y-auto"
          >
            <nav className="flex flex-col gap-0 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="border-b border-light-border dark:border-dark-border"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-3xl font-bold tracking-tight py-5
                               hover:text-red-brand transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pb-4 space-y-1">
                      {serviceLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface group/mob transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-light-surface dark:bg-dark-surface
                                          flex items-center justify-center text-[#777]
                                          group-hover/mob:bg-red-brand/10 group-hover/mob:text-red-brand transition-colors flex-shrink-0">
                            {sub.icon}
                          </div>
                          <span className="font-display text-sm font-medium text-light-muted dark:text-dark-muted
                                           group-hover/mob:text-red-brand transition-colors">
                            {sub.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
            <Link
              href="/request-a-quote"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center mt-6"
            >
              Get a Free Proposal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
