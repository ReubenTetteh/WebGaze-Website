import type { Metadata } from "next";
import { WinstamacCaseStudyStage } from "./CaseStudyStage";

// Internal-only iteration stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — WINSTAMAC Case Study",
  robots: { index: false, follow: false },
};

export default function WinstamacCaseStudyPage() {
  return <WinstamacCaseStudyStage />;
}
