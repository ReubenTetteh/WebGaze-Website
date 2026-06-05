import type { Metadata } from "next";
import CaseStudyStage from "./CaseStudyStage";

export const metadata: Metadata = {
  title: "CPA Case Study — Versions",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CaseStudyStage />;
}
