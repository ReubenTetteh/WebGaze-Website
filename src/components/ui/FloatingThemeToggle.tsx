"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MoonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

export default function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center gap-0 p-1 rounded-full bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-lg border border-black/[0.06] dark:border-white/[0.08] shadow-sm">

        <button
          onClick={() => setTheme("light")}
          aria-label="Light mode"
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
            !isDark ? "bg-[#0f0f0f] text-white shadow-sm" : "text-[#444] hover:text-[#888]"
          )}
        >
          <SunIcon />
        </button>

        <button
          onClick={() => setTheme("dark")}
          aria-label="Dark mode"
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
            isDark ? "bg-[#0f0f0f] text-white shadow-sm" : "text-[#c0c0c0] hover:text-[#888]"
          )}
        >
          <MoonIcon />
        </button>

      </div>
    </div>
  );
}
