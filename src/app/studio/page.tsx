import type { Metadata } from "next";
import StudioHome from "./StudioHome";

// The Studio index — our internal iteration board. Never indexed, and the
// whole /studio tree 404s on deployed builds (see src/middleware.ts).
export const metadata: Metadata = {
  title: "WebGaze Studio — Iterations",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioHome />;
}
