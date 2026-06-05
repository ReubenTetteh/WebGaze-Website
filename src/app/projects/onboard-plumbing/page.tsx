import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import ProjectHeroPreview from "@/components/sections/ProjectHeroPreview";
import BrowserSlider from "@/components/sections/BrowserSlider";
import { getProject } from "@/lib/projects";

const L = "/portfolio/onboard-plumbing/live"; // e.g. "/portfolio/onboard-plumbing/live"

const browsePages = [
  { src: `${L}/onboard-plumbing-homepage.jpg`, url: "onboardplumbing.com.au" },
  { src: `${L}/onboard-plumbing-about.jpg`, url: "onboardplumbing.com.au/about" },
  { src: `${L}/onboard-plumbing-services.jpg`, url: "onboardplumbing.com.au/services/general-plumbing-maintenance" },
];

const mobileShots = [`${L}/onboard-plumbing-homepage-mobile.jpg`, `${L}/onboard-plumbing-about-mobile.jpg`];

const project = getProject("onboard-plumbing");

const heroPreview = `${L}/onboard-plumbing-homepage-fullpage.jpg`;

export const metadata: Metadata = {
  title: "Onboard Plumbing Portfolio Case Study",
  description: project?.summary,
  alternates: { canonical: "https://webgaze.com.au/projects/onboard-plumbing" },
  openGraph: {
    title: "Onboard Plumbing Portfolio Case Study | WebGaze",
    description: project?.summary,
    url: "https://webgaze.com.au/projects/onboard-plumbing",
    images: [{ url: project?.image ?? heroPreview, width: 1200, height: 900, alt: "Onboard Plumbing — trades & local services website designed and built by WebGaze" }],
  },
};

export default function ProjectPage() {
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
              url={project.liveUrl ?? "onboardplumbing.com.au"}
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

      <section className="bg-white py-16 dark:bg-dark-bg md:py-24">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            {/* More of the work — desktop browsing slider */}
            <div>
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
                Visual System
              </p>
              <h2 className="mb-8 font-display text-3xl font-bold leading-tight text-[#111] dark:text-white md:text-4xl">
                More of the work.
              </h2>
              <BrowserSlider pages={browsePages} />
            </div>

            {/* Just as clean on mobile — two phones, always side-by-side */}
            <div>
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
                Responsive
              </p>
              <h2 className="mb-8 font-display text-3xl font-bold leading-tight text-[#111] dark:text-white md:text-4xl">
                Just as clean on mobile.
              </h2>
              <div className="grid grid-cols-2 items-start justify-items-center gap-3 sm:gap-5">
                {mobileShots.map((image) => (
                  <div
                    key={image}
                    className="relative aspect-[224/460] w-full max-w-[224px] overflow-hidden rounded-[2.2rem] border-[6px] border-[#15161a] bg-black shadow-[0_30px_70px_-28px_rgba(20,20,22,0.45)] sm:border-[7px]"
                  >
                    <div className="absolute left-1/2 top-2 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black sm:top-2.5 sm:h-4 sm:w-16" />
                    <Image src={image} alt={`${project.name} website on mobile — responsive design by WebGaze`} fill sizes="(max-width: 640px) 45vw, 224px" loading="eager" className="object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
