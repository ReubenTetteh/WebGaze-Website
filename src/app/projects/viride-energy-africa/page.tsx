import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { getProject } from "@/lib/projects";

const project = getProject("viride-energy-africa");

export const metadata: Metadata = {
  title: "Viride Energy Africa Portfolio Case Study",
  description: project?.summary,
  alternates: { canonical: "https://webgaze.com.au/projects/viride-energy-africa" },
  openGraph: {
    title: "Viride Energy Africa Portfolio Case Study | WebGaze",
    description: project?.summary,
    url: "https://webgaze.com.au/projects/viride-energy-africa",
    images: [{ url: "/portfolio/webgaze_viride-energy.webp", width: 1200, height: 900, alt: "Viride Energy Africa" }],
  },
};

const projectMeta = [
  ["Client", "Viride Energy Africa"],
  ["Industry", "Renewable energy"],
  ["Year", "2024"],
  ["Scope", "Website design, React development, content hierarchy"],
];

const reelItems = [
  {
    count: "01",
    label: "Message",
    title: "Make the business instantly understandable.",
    body: "The project needed to explain a technical energy operation without asking visitors to work too hard. We shaped the page hierarchy around direct claims, concise supporting copy, and proof-led sections.",
    image: "/portfolio/webgaze_viride-energy.webp",
    imageClass: "object-top",
  },
  {
    count: "02",
    label: "Presence",
    title: "Create a sharper first impression.",
    body: "The visual direction leans into infrastructure, scale, and momentum. Darker contrast, confident spacing, and purposeful image use help the brand feel more established from the first screen.",
    image: "/portfolio/Building-front.webp",
    imageClass: "object-center",
  },
  {
    count: "03",
    label: "Flow",
    title: "Guide visitors without over-explaining.",
    body: "Instead of overloading the site with dense information, we built a rhythm of short sections that introduce capability, direct users toward key details, and keep calls to action close.",
    image: "/portfolio/Scene-2.png",
    imageClass: "object-center",
  },
];

const resultRows = [
  ["01", "A more credible energy-sector web presence."],
  ["02", "A clearer structure for partners, customers, and stakeholders."],
  ["03", "A flexible foundation for future pages, updates, and campaigns."],
];

function HoverScrollPreview({
  src,
  alt,
  priority = false,
  large = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  large?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[8px] bg-[#101410] shadow-[0_36px_100px_rgba(0,0,0,0.56)]">
      <div className="flex items-center gap-2 bg-[#1d251f] px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-[#ff625d]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd3d]" />
        <span className="h-3 w-3 rounded-full bg-[#35c95a]" />
        <span className="ml-4 truncate font-body text-sm text-white/30">
          viride-energy-africa.webgaze.com.au
        </span>
      </div>
      <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={large ? "(max-width: 1024px) 100vw, 82vw" : "(max-width: 1024px) 100vw, 54vw"}
          className="object-cover object-top transition-transform duration-[2400ms] ease-in-out group-hover:-translate-y-[18%] group-hover:scale-[1.02]"
        />
      </div>
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur transition duration-300 group-hover:opacity-0">
        Hover to scroll
      </div>
    </div>
  );
}

export default function VirideEnergyAfricaPage() {
  if (!project) {
    return null;
  }

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#050706] pt-28 text-white md:pt-36">
        <Image
          src="/service-header-bg.jpg"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/86 to-black/46" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />

        <div className="container-wide relative z-10 grid min-h-[calc(100vh-9rem)] gap-12 pb-20 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <div className="max-w-[620px]">
            <Link
              href="/projects"
              className="mb-20 inline-flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-white/46 transition hover:text-white md:mb-24"
            >
              <span>←</span>
              All Projects
            </Link>

            <p className="mb-6 inline-flex rounded-full border border-white/16 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/52">
              {project.tag} · {project.year}
            </p>
            <h1 className="font-display text-[clamp(2.65rem,4.7vw,5rem)] font-bold leading-[1] tracking-[-0.035em] text-white">
              Viride
              <br />
              Energy
              <br />
              Africa
            </h1>
            <p className="mt-8 max-w-[610px] font-body text-base leading-relaxed text-white/72 md:text-lg">
              {project.summary}
            </p>
          </div>

          <HoverScrollPreview src={project.image} alt={project.name} priority />
        </div>
      </section>

      <section className="bg-[#f4f2ea] py-20 text-[#0f120e] md:py-28">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
                The Brief
              </p>
              <h2 className="max-w-[800px] font-display text-[clamp(2.65rem,5.4vw,6.4rem)] font-bold leading-[0.98] tracking-[-0.04em]">
                Turn a complex energy story into a confident digital presence.
              </h2>
            </div>
            <p className="max-w-[620px] font-body text-lg leading-relaxed text-[#55564f]">
              Viride needed a site that could speak to commercial credibility, operational capability, and sustainability without feeling crowded or overly technical.
            </p>
          </div>

          <div className="mt-16 grid border-t border-[#d7d3c7] md:grid-cols-4">
            {projectMeta.map(([label, value]) => (
              <div key={label} className="border-b border-[#d7d3c7] py-6 md:border-b-0 md:border-r md:pr-6 md:last:border-r-0">
                <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b877c]">
                  {label}
                </p>
                <p className="max-w-[260px] font-display text-sm font-bold leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070807] py-20 text-white md:py-28">
        <div className="container-wide grid gap-16 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)] lg:self-start">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
                  Project Reel
                </p>
                <h2 className="font-display text-[clamp(2rem,3vw,3.45rem)] font-bold leading-[1.04]">
                  Three decisions shaped the experience.
                </h2>
                <p className="mt-6 font-body text-base leading-relaxed text-white/56">
                  Keep the story anchored, let the project move, and use each visual moment to reveal a different layer of the work.
                </p>
              </div>

              <div className="mt-10 hidden border-t border-white/10 pt-6 lg:block">
                <p className="font-body text-sm leading-relaxed text-white/36">
                  Scroll through the project notes. The fixed left column keeps the case study grounded while each right-side panel carries the visual proof.
                </p>
              </div>
            </div>
          </aside>

          <div className="space-y-10 md:space-y-16">
            {reelItems.map((item) => (
              <article key={item.count} className="border-t border-white/10 pt-10">
                <div className="grid gap-8 xl:grid-cols-[0.44fr_1fr] xl:items-end">
                  <div>
                    <p className="mb-8 font-display text-xs font-black tracking-[0.24em] text-white/24">
                      {item.count}
                    </p>
                    <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-red-brand">
                      {item.label}
                    </p>
                    <h3 className="font-display text-[clamp(2rem,3vw,3.5rem)] font-bold leading-[1.04]">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-[520px] font-body text-base leading-relaxed text-white/56">
                      {item.body}
                    </p>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
                    <Image
                      src={item.image}
                      alt={`${project.name} ${item.label}`}
                      fill
                      sizes="(max-width: 1280px) 100vw, 52vw"
                      className={`object-cover ${item.imageClass}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d120f] py-20 text-white md:py-28">
        <div className="container-wide">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
                Website Preview
              </p>
              <h2 className="font-display text-[clamp(2.4rem,4.5vw,5.4rem)] font-bold leading-[1.02]">
                The site experience, in motion.
              </h2>
            </div>
            <p className="max-w-[620px] font-body text-base leading-relaxed text-white/56">
              This hover-scroll preview stays in the final direction so long-form website screenshots can feel interactive without needing a full embedded site.
            </p>
          </div>

          <HoverScrollPreview src={project.image} alt={`${project.name} website preview`} large />
        </div>
      </section>

      <section className="bg-[#f4f2ea] py-20 text-[#111] md:py-28">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-start">
            <h2 className="font-display text-[clamp(2.7rem,5vw,6rem)] font-bold leading-[0.98] tracking-[-0.04em]">
              Clearer story. Stronger first impression.
            </h2>
            <div>
              <p className="mb-10 max-w-[700px] font-body text-lg leading-relaxed text-[#55564f]">
                The redesigned direction gives Viride a calmer, more confident platform for explaining who they are, what they do, and why their work matters.
              </p>
              <div className="border-t border-[#d7d3c7]">
                {resultRows.map(([number, text]) => (
                  <div key={number} className="grid grid-cols-[70px_1fr] gap-6 border-b border-[#d7d3c7] py-6">
                    <p className="font-display text-xs font-black tracking-[0.2em] text-red-brand">{number}</p>
                    <p className="font-display text-xl font-bold leading-snug md:text-2xl">{text}</p>
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
