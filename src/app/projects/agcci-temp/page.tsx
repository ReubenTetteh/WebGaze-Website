import type { Metadata } from "next";
import CTA from "@/components/sections/CTA";
import AgcciCaseStudy from "@/components/projects/AgcciCaseStudy";

const summary =
  "A polished chamber website built to communicate authority, membership value and cross-market opportunity between Australia and Ghana.";

export const metadata: Metadata = {
  title: "AGCCI Portfolio Case Study (Temp)",
  description: summary,
  robots: { index: false, follow: false },
  openGraph: {
    title: "Australian Ghanaian Chamber of Commerce — Case Study | WebGaze",
    description: summary,
    images: [
      {
        url: "/portfolio/agcci-temp/home-full.png",
        width: 1200,
        height: 900,
        alt: "AGCCI website",
      },
    ],
  },
};

export default function AgcciTempPage() {
  return (
    <>
      <AgcciCaseStudy />
      <CTA />
    </>
  );
}
