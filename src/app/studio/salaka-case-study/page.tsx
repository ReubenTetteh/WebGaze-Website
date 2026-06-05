import type { Metadata } from "next";
import { SalakaCaseStudyStage } from "./CaseStudyStage";

// Internal-only iteration stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — Salaka Dance Ensemble Case Study",
  robots: { index: false, follow: false },
};

export default function SalakaCaseStudyPage() {
  return <SalakaCaseStudyStage />;
}
