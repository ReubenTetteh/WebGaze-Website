import type { Metadata } from "next";
import { WinstamacCaseStudyStage } from "@/app/studio/winstamac-case-study/CaseStudyStage";
import { getProject } from "@/lib/projects";

const project = getProject("winstamac");

export const metadata: Metadata = {
  title: "WINSTAMAC — House Plans Website Design | WebGaze",
  description: project?.summary,
  alternates: { canonical: "https://webgaze.com.au/projects/winstamac" },
  openGraph: {
    title: "WINSTAMAC — House Plans Website Design | WebGaze",
    description: project?.summary,
    url: "https://webgaze.com.au/projects/winstamac",
    images: [{ url: project?.image ?? "", width: 1200, height: 900, alt: "WINSTAMAC — house-plan marketplace website designed and built by WebGaze" }],
  },
};

export default function WinstamacProjectPage() {
  return <WinstamacCaseStudyStage />;
}
