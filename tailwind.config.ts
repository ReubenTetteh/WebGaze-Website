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
          bg: "#080808",
          surface: "#111111",
          border: "#1f1f1f",
          muted: "#888888",
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
      },
    },
  },
  plugins: [],
};

export default config;
