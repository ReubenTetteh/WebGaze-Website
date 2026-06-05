import type { Metadata } from "next";
import HomeV2 from "./HomeV2";

export const metadata: Metadata = {
  title: "Home v2 — Mobile Preview | WebGaze",
  description: "WebGaze mobile-first home experience (v2 preview).",
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return <HomeV2 />;
}
