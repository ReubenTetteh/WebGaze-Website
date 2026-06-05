import type { Metadata } from "next";
import PromoStage from "./PromoStage";

// Internal-only recording stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — Reintro Promo",
  robots: { index: false, follow: false },
};

export default function ReintroPromoPage() {
  return <PromoStage />;
}
