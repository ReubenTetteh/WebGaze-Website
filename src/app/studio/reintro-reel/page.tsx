import type { Metadata } from "next";
import ReintroStage from "./ReintroStage";

// Internal-only recording stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — Reintro Reel",
  robots: { index: false, follow: false },
};

export default function ReintroReelPage() {
  return <ReintroStage />;
}
