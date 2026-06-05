"use client";

import { useState, useEffect, useRef } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const serviceLinks = [
  {
    label: "Website Design & Development",
    short: "Custom, high-performance websites built to convert.",
    href: "/services/website-design",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "AI & Custom Business Systems",
    short: "Custom apps, automations, and AI-assisted tools.",
    href: "/services/systems-automation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
  },
  {
    label: "Visual Branding",
    short: "Cohesive brand identities that make you unmistakable.",
    href: "/services/visual-branding",
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
    href: "/services/maintenance",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Search Engine Optimisation",
    short: "Get found by the right people at the right time.",
    href: "/services/seo",
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
    href: "/services/consulting",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [surfaceIsLight, setSurfaceIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"main" | "services">("main");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  // Mobile bar reveals on scroll-up, hides on scroll-down.
  const [hideBar, setHideBar] = useState(false);
  const { theme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const closeServicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The homepage moves between dark and light sections. Instead of using scroll
  // position as a proxy, sample the surface behind the fixed nav so contrast
  // follows the section currently underneath it.
  const isLight = mounted && theme === "light";
  const useLightShell = isLight && surfaceIsLight;

  useEffect(() => {
    setMounted(true);
    const parseRgb = (color: string) => {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (alpha < 0.08) return null;
      return [Number(match[1]), Number(match[2]), Number(match[3])] as const;
    };

    const updateSurface = () => {
      const sampleX = window.innerWidth / 2;
      const sampleY = 52;
      const elements = document.elementsFromPoint(sampleX, sampleY);
      const surface = elements.find((element) => {
        if (element.closest("header")) return false;
        const color = window.getComputedStyle(element).backgroundColor;
        return parseRgb(color);
      });

      if (!surface) {
        // No element with a solid background-color sits under the nav — this
        // happens on heroes built from a background image or gradient (which
        // expose no `background-color` to sample). Every such hero on the site
        // is dark, so default to the dark shell rather than assuming light.
        // Content sections always carry a solid background, so they are still
        // detected correctly as the user scrolls.
        setSurfaceIsLight(false);
        return;
      }

      const rgb = parseRgb(window.getComputedStyle(surface).backgroundColor);
      if (!rgb) return;

      const [r, g, b] = rgb;
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      setSurfaceIsLight(luminance > 0.62);
    };

    const syncSurface = () => requestAnimationFrame(updateSurface);
    syncSurface();
    const restoreChecks = [100, 300, 700].map((delay) => window.setTimeout(syncSurface, delay));
    window.addEventListener("scroll", syncSurface, { passive: true });
    window.addEventListener("resize", syncSurface);
    window.addEventListener("pageshow", syncSurface);
    return () => {
      restoreChecks.forEach(window.clearTimeout);
      window.removeEventListener("scroll", syncSurface);
      window.removeEventListener("resize", syncSurface);
      window.removeEventListener("pageshow", syncSurface);
    };
  }, [pathname]);

  // Track scroll direction so the mobile bar hides on the way down and slides
  // back in the moment the user scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return; // ignore jitter
      if (delta > 0 && y > 100) {
        setHideBar(true); // scrolling down, past the hero
      } else if (delta < 0) {
        setHideBar(false); // scrolling up
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
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

  useEffect(() => {
    return () => {
      if (closeServicesTimer.current) {
        clearTimeout(closeServicesTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileView("main");
    setHoveredNav(null);
  }, [pathname]);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Reset the drawer to the main view after it has finished closing — delay so
  // the user doesn't see the submenu snap away mid-exit animation.
  useEffect(() => {
    if (menuOpen) return;
    const t = window.setTimeout(() => setMobileView("main"), 320);
    return () => window.clearTimeout(t);
  }, [menuOpen]);

  const servicesMenuId = "services-menu";
  const isNavActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const openServicesMenu = () => {
    if (closeServicesTimer.current) {
      clearTimeout(closeServicesTimer.current);
      closeServicesTimer.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleServicesClose = () => {
    if (closeServicesTimer.current) {
      clearTimeout(closeServicesTimer.current);
    }
    closeServicesTimer.current = setTimeout(() => {
      setServicesOpen(false);
      closeServicesTimer.current = null;
    }, 180);
  };

  const handleServicesBlur = (e: FocusEvent<HTMLDivElement>) => {
    const nextFocused = e.relatedTarget;
    if (!(nextFocused instanceof Node) || !e.currentTarget.contains(nextFocused)) {
      setServicesOpen(false);
    }
  };

  const handleServicesKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      if (closeServicesTimer.current) {
        clearTimeout(closeServicesTimer.current);
        closeServicesTimer.current = null;
      }
      setServicesOpen(false);
      servicesButtonRef.current?.focus();
    }
  };

  const activeHref = hoveredNav ?? navLinks.find((item) => isNavActive(item.href))?.href;

  // The mobile menu is always a dark overlay, so force the header into its dark
  // treatment (white logo + light controls) while it is open, regardless of the
  // surface that was sampled underneath the nav.
  const shellIsLight = useLightShell && !menuOpen;

  const shellClass = shellIsLight
    ? "border-light-border bg-light-bg/88 text-[#0a0a0a] shadow-[0_16px_44px_rgba(0,0,0,0.1)] dark:border-dark-border dark:bg-dark-bg/82 dark:text-white"
    : "border-white/15 bg-[#101010]/55 text-white shadow-[0_16px_44px_rgba(0,0,0,0.18)]";

  const subtleTextClass = useLightShell
    ? "text-[#1c1c1c]/72 dark:text-white/72"
    : "text-white/72";

  const logoSrc = shellIsLight
    ? "/images/logo-dark-cropped.png"
    : "/images/logo-white-cropped.png";

  // Hide the mobile bar while scrolling down, but never while the menu is open.
  const barHidden = hideBar && !menuOpen;
  const barHideMobile = barHidden
    ? "max-lg:-translate-y-[150%] max-lg:opacity-0"
    : "max-lg:translate-y-0 max-lg:opacity-100";

  return (
    <>
      <header
        className="fixed inset-x-0 top-5 z-[100] overflow-visible"
      >
        <div className="container-wide relative flex items-center justify-between">
          {/* Mobile bar — hangs from the top edge (no top gap, no top border),
              giving the logo + menu button a single translucent surface. Slides
              away on scroll-down and returns on scroll-up. */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -top-5 -inset-x-3 -bottom-2 rounded-b-2xl border border-t-0 backdrop-blur-xl transition-[transform,opacity,background-color,border-color,box-shadow] duration-300 ease-out lg:hidden",
              shellClass,
              barHidden ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
            )}
          />
          <Link
            href="/"
            aria-label="WebGaze home"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "relative z-10 flex h-10 shrink-0 items-center rounded-full transition-[transform,opacity] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              barHideMobile
            )}
          >
            <Image
              src={logoSrc}
              alt="WebGaze"
              width={200}
              height={50}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className={cn(
              "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border px-5 py-3 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 lg:flex",
              shellClass
            )}
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => {
                    setHoveredNav(link.href);
                    openServicesMenu();
                  }}
                  onMouseLeave={scheduleServicesClose}
                  onFocus={openServicesMenu}
                  onBlur={handleServicesBlur}
                  onKeyDown={handleServicesKeyDown}
                >
                  <button
                    ref={servicesButtonRef}
                    onClick={() => setServicesOpen(!servicesOpen)}
                    aria-haspopup="menu"
                    aria-expanded={servicesOpen}
                    aria-controls={servicesMenuId}
                    className={cn(
                      "group relative flex h-8 items-center gap-1 overflow-hidden rounded-full px-3 font-display text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-brand",
                      activeHref === link.href ? "text-white" : subtleTextClass
                    )}
                    onMouseEnter={() => setHoveredNav(link.href)}
                    onFocus={() => setHoveredNav(link.href)}
                  >
                    {activeHref === link.href && (
                      <motion.span
                        layoutId="nav-strip-pill"
                        className="absolute inset-0 rounded-full bg-red-brand shadow-[0_10px_24px_rgba(224,27,36,0.22)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 transition-colors duration-200 group-hover:text-white">{link.label}</span>
                    <motion.span
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 text-xs mt-0.5 opacity-70"
                    >
                      ▾
                    </motion.span>
                  </button>

                  {/* Mega-menu */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                        id={servicesMenuId}
                        role="menu"
                        className="absolute top-full left-1/2 z-[110] -translate-x-1/2 w-[520px] pt-4"
                      >
                        <div
                          className="isolate rounded-2xl bg-light-bg dark:bg-dark-surface
                                     border border-light-border dark:border-dark-border
                                     shadow-[0_24px_70px_rgba(0,0,0,0.22)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)]
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
                                role="menuitem"
                                className="flex items-start gap-4 px-4 py-3 rounded-xl group/item
                                           hover:bg-light-surface dark:hover:bg-dark-border
                                           transition-colors duration-150 focus-visible:outline-none focus-visible:bg-light-surface dark:focus-visible:bg-dark-border"
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.href)}
                  onFocus={() => setHoveredNav(link.href)}
                  className={cn(
                    "group relative flex h-8 items-center overflow-hidden rounded-full px-3 font-display text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-brand",
                    activeHref === link.href ? "text-white" : subtleTextClass
                  )}
                >
                  {activeHref === link.href && (
                    <motion.span
                      layoutId="nav-strip-pill"
                      className="absolute inset-0 rounded-full bg-red-brand shadow-[0_10px_24px_rgba(224,27,36,0.22)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 transition-colors duration-200 group-hover:text-white">{link.label}</span>
                </Link>
              )
            )}
          </nav>

          <Link
            href="/request-a-quote"
            className="hidden h-9 shrink-0 items-center rounded-full bg-red-brand px-4 font-display text-sm font-semibold text-white shadow-[0_10px_24px_rgba(224,27,36,0.22)] transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:flex"
          >
            Request a Proposal
          </Link>

          {/* Hamburger — sits inside the mobile bar, so no pill of its own */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-[transform,opacity,color] duration-300 ease-out lg:hidden",
              shellIsLight ? "text-[#0a0a0a] dark:text-white" : "text-white",
              barHidden ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
            )}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={cn("block w-5 h-[1.5px] bg-current transition-all duration-300", menuOpen && "rotate-45 translate-y-[7px]")} />
            <span className={cn("block w-5 h-[1.5px] bg-current transition-all duration-300", menuOpen && "opacity-0")} />
            <span className={cn("block w-5 h-[1.5px] bg-current transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[7px]")} />
          </button>
        </div>

      </header>

      {/* Mobile Menu — right-side drawer with iOS-style stacked submenu */}
      <AnimatePresence>
        {menuOpen && (
          <div key="mobile-drawer" className="fixed inset-0 z-[90] lg:hidden">
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />

            {/* Drawer panel — slides in from the right */}
            <motion.div
              key="mobile-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-[420px] flex-col overflow-hidden bg-[#0a0a0a] text-white shadow-[-20px_0_60px_rgba(0,0,0,0.4)]"
            >
              {/* Ambient brand glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-24 h-[360px] w-[360px] rounded-full bg-red-brand/20 blur-[110px]"
              />

              {/* Stacked views container */}
              <div className="relative flex-1 overflow-hidden">
                {/* Main view */}
                <motion.div
                  animate={{
                    x: mobileView === "main" ? "0%" : "-30%",
                    opacity: mobileView === "main" ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col overflow-y-auto px-6 pb-8 pt-20"
                  aria-hidden={mobileView !== "main"}
                >
                  <p className="mb-4 font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-red-brand">
                    Menu
                  </p>

                  <nav className="flex flex-col">
                    {navLinks.map((link, i) => {
                      const active = isNavActive(link.href);
                      if (link.dropdown) {
                        return (
                          <button
                            key={link.label}
                            type="button"
                            onClick={() => setMobileView("services")}
                            className="group flex items-center justify-between gap-4 border-b border-white/10 py-3 text-left"
                          >
                            <span className="flex items-baseline gap-3">
                              <span
                                className={cn(
                                  "font-display text-[10px] font-semibold tabular-nums tracking-widest",
                                  active ? "text-red-brand" : "text-white/35"
                                )}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={cn(
                                  "font-display text-[1.375rem] font-semibold leading-none tracking-tight transition-colors duration-200 group-hover:text-red-brand",
                                  active ? "text-red-brand" : "text-white"
                                )}
                              >
                                {link.label}
                              </span>
                            </span>
                            <span className="font-display text-xl leading-none text-white/45 transition-colors group-hover:text-red-brand" aria-hidden>
                              ›
                            </span>
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-baseline gap-3 border-b border-white/10 py-3"
                        >
                          <span
                            className={cn(
                              "font-display text-[10px] font-semibold tabular-nums tracking-widest",
                              active ? "text-red-brand" : "text-white/35"
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[1.375rem] font-semibold leading-none tracking-tight transition-colors duration-200 group-hover:text-red-brand",
                              active ? "text-red-brand" : "text-white"
                            )}
                          >
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-6">
                    <Link
                      href="/request-a-quote"
                      onClick={() => setMenuOpen(false)}
                      className="flex h-12 items-center justify-center gap-2 rounded-xl bg-red-brand px-5 font-display text-sm font-semibold text-white shadow-[0_16px_40px_rgba(224,27,36,0.3)] transition-colors hover:bg-red-600"
                    >
                      Request a Proposal
                      <span aria-hidden>→</span>
                    </Link>
                  </div>

                  <div className="mt-auto flex flex-col gap-4 pt-8">
                    <div className="flex flex-col gap-1">
                      <a href="mailto:hello@webgaze.com.au" className="font-display text-[13px] font-medium text-white/70 transition-colors hover:text-red-brand">
                        hello@webgaze.com.au
                      </a>
                      <a href="tel:0411078843" className="font-display text-[13px] font-medium text-white/70 transition-colors hover:text-red-brand">
                        04 1107 8843
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <a href="https://www.linkedin.com/company/webgaze" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                         className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-red-brand hover:text-red-brand">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                          <rect x="2" y="9" width="4" height="12"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/webgaze.au" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                         className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-red-brand hover:text-red-brand">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </a>
                      <a href="https://x.com/webgaze_au" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                         className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-red-brand hover:text-red-brand">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Services submenu view */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: mobileView === "services" ? "0%" : "100%" }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col overflow-y-auto bg-[#0a0a0a] px-6 pb-8 pt-20"
                  aria-hidden={mobileView !== "services"}
                >
                  <button
                    type="button"
                    onClick={() => setMobileView("main")}
                    className="mb-5 flex items-center gap-2 self-start font-display text-xs font-semibold text-white/65 transition-colors hover:text-red-brand"
                  >
                    <span aria-hidden className="text-xl leading-none">‹</span>
                    <span className="uppercase tracking-[0.28em] text-[10px]">Back</span>
                  </button>

                  <p className="mb-5 font-display text-[1.375rem] font-semibold leading-none tracking-tight text-white">
                    Services
                  </p>

                  <div className="flex flex-col">
                    {serviceLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="group/mob flex items-center gap-3 border-b border-white/10 py-3"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/65 transition-colors group-hover/mob:bg-red-brand/15 group-hover/mob:text-red-brand">
                          {sub.icon}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-display text-sm font-semibold leading-snug text-white transition-colors group-hover/mob:text-red-brand">
                            {sub.label}
                          </span>
                          <span className="font-display text-[11px] leading-snug text-white/55">
                            {sub.short}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
