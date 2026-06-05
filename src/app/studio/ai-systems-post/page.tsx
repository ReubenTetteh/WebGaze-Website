import type { Metadata } from "next";
import PostStage from "./PostStage";

// Internal-only recording stage — keep it out of search and sitemaps.
export const metadata: Metadata = {
  title: "Studio — AI Systems Post",
  robots: { index: false, follow: false },
};

export default function AiSystemsPostPage() {
  return <PostStage />;
}
