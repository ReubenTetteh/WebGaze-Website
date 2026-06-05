import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import ProjectHeroPreview from "@/components/sections/ProjectHeroPreview";
import { getProject } from "@/lib/projects";

const project = getProject("care-partners-australia");

const heroPreview = "/portfolio/cpa/care-partners-australia-homepage-fullpage.webp";

export const metadata: Metadata = {
  title: "Care Partners Australia Portfolio Case Study",
  description: project?.summary,
  alternates: { canonical: "https://webgaze.com.au/projects/care-partners-australia" },
  openGraph: {
    title: "Care Partners Australia Portfolio Case Study | WebGaze",
    description: project?.summary,
    url: "https://webgaze.com.au/projects/care-partners-australia",
    images: [{ url: project?.image ?? heroPreview, width: 1200, height: 900, alt: "Care Partners Australia — NDIS & disability support website designed and built by WebGaze" }],
  },
};

export default function CarePartnersPage() {
  if (!project) {
    return null;
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#070707] pt-28 text-white md:pt-32">
        <div
          className="absolute inset-x-0 top-0 h-[520px] opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle at 72% 24%, ${project.accent}, transparent 42%)` }}
        />
        <div className="container-wide relative z-10 pb-16">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
          >
            <span>←</span>
            All Projects
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(420px,1.08fr)] lg:items-end">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                {project.tag} · {project.year}
              </p>
              <h1 className="font-display text-[clamp(2.35rem,4.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                {project.name}
              </h1>
              <p className="mt-6 max-w-[560px] font-body text-base leading-relaxed text-white/62 md:text-lg">
                {project.summary}
              </p>
              <div className="mt-9 grid max-w-[660px] gap-6 border-t border-white/10 pt-7 md:grid-cols-3">
                {[
                  ["Industry", project.industry],
                  ["Platform", project.platform],
                  ["Category", project.category],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {label}
                    </p>
                    <p className="font-display text-sm font-bold leading-snug text-white/78">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 max-w-[660px]">
                <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                  Services
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-display text-xs font-bold text-white/76"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ProjectHeroPreview
              src={heroPreview}
              alt={`${project.name} website homepage — ${project.industry} web design by WebGaze (${project.year})`}
              url="carepartnersau.com.au"
              scroll
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f2] py-16 dark:bg-[#0b0b0b] md:py-24">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["01", "The Challenge", project.challenge],
              ["02", "Our Approach", project.approach],
              ["03", "Final Outcome", project.outcome],
            ].map(([number, title, body]) => (
              <article key={number} className="rounded-[8px] bg-white p-6 shadow-[0_12px_34px_rgba(10,10,10,0.06)] dark:bg-[#111]">
                <p className="mb-7 font-display text-xs font-black tracking-[0.2em] text-red-brand">{number}</p>
                <h2 className="mb-4 font-display text-2xl font-bold leading-tight text-[#111] dark:text-white">
                  {title}
                </h2>
                <p className="font-body text-sm leading-relaxed text-[#555] dark:text-[#aaa]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-dark-bg">
        <div className="container-wide">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
                Visual System
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-[#111] dark:text-white md:text-5xl">
                More of the work.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {["/portfolio/cpa/care-partners-australia-gallery-1.webp", "/portfolio/cpa/care-partners-australia-gallery-2.jpg"].map((image) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#eee] dark:bg-[#111]">
                <Image src={image} alt={`${project.name} ${project.industry} website — design detail by WebGaze`} fill sizes="(max-width: 768px) 100vw, 50vw" loading="eager" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
