import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          brand: "#E01B24",
          dark: "#B01219",
          light: "#FF2D37",
        },
        dark: {
          bg: "#0E0E11",
          surface: "#18181C",
          elevated: "#212127",
          border: "#2C2C33",
          muted: "#8A8A8A",
        },
        light: {
          bg: "#FAFAFA",
          surface: "#F2F2F2",
          border: "#E0E0E0",
          muted: "#1c1c1c",
        },
      },
      fontFamily: {
        display: ["var(--font-dm-sans)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.8rem, 6vw, 6rem)", { lineHeight: "1.04", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(1.8rem, 3vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.4rem, 2.5vw, 2.4rem)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        nudge: "nudge 1.4s ease-in-out infinite",
        ripple: "ripple 2s ease-out infinite",
        breathe: "breathe 2.6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        nudge: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" },
        },
        ripple: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
