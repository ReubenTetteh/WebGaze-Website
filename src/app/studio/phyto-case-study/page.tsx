import type { Metadata } from "next";
import { PhytoCaseStudyStage } from "./CaseStudyStage";

// Internal-only iteration stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — PhytoScience Case Study",
  robots: { index: false, follow: false },
};

export default function PhytoCaseStudyPage() {
  return <PhytoCaseStudyStage />;
}
