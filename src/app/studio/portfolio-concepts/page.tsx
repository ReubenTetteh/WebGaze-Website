import type { Metadata } from "next";
import { PortfolioConceptsStage } from "./PortfolioConceptsStage";

// Internal-only iteration stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — Portfolio Concepts (v2)",
  robots: { index: false, follow: false },
};

export default function PortfolioConceptsPage() {
  return <PortfolioConceptsStage />;
}
