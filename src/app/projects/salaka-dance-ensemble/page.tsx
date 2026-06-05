import type { Metadata } from "next";
import { SalakaCaseStudyStage } from "@/app/studio/salaka-case-study/CaseStudyStage";
import { getProject } from "@/lib/projects";

const project = getProject("salaka-dance-ensemble");

export const metadata: Metadata = {
  title: "Salaka Dance Ensemble Portfolio Case Study",
  description: project?.summary,
  alternates: { canonical: "https://webgaze.com.au/projects/salaka-dance-ensemble" },
  openGraph: {
    title: "Salaka Dance Ensemble Portfolio Case Study | WebGaze",
    description: project?.summary,
    url: "https://webgaze.com.au/projects/salaka-dance-ensemble",
    images: [{ url: project?.image ?? "", width: 1200, height: 900, alt: "Salaka Dance Ensemble — performing arts & African culture website designed and built by WebGaze" }],
  },
};

export default function SalakaProjectPage() {
  return <SalakaCaseStudyStage />;
}
