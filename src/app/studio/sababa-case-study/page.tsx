import type { Metadata } from "next";
import { SababaCaseStudyStage } from "./CaseStudyStage";

// Internal-only iteration stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — Sababa Global Case Study",
  robots: { index: false, follow: false },
};

export default function SababaCaseStudyPage() {
  return <SababaCaseStudyStage />;
}
