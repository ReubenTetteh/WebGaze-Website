import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import SiteChrome from "@/components/layout/SiteChrome";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

// GA4 only loads when NEXT_PUBLIC_GA_ID is set on a production deploy. Leave it
// unset until the domain is switched from WordPress to Vercel — otherwise
// staging traffic mixes into the same GA property WordPress is still feeding.
// At cutover, set NEXT_PUBLIC_GA_ID=G-4VDWWR3ZKQ in Vercel and GA turns on.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_ENABLED = Boolean(GA_ID) && process.env.VERCEL_ENV === "production";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webgaze.com.au"),
  title: {
    default: "WebGaze — Web Design & Digital Agency",
    template: "%s | WebGaze",
  },
  description:
    "WebGaze is an Australian web design and digital agency focused on building clear brands, high-performance websites, and practical digital systems that support long-term business growth.",
  keywords: ["web design", "digital agency", "branding", "SEO", "Australia"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://webgaze.com.au",
    siteName: "WebGaze",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${inter.variable}`}>
      <body>
        {/* Always start in light mode regardless of the device's system setting;
            only switch when the user manually toggles (choice persists). */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <SiteChrome>{children}</SiteChrome>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        {GA_ENABLED && GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
