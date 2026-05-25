"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";

const services = [
  {
    eyebrow: "01",
    title: "Website design and development",
    body: "Custom websites for Australian businesses that need credibility, speed, conversion flow, and a site structure search engines can understand.",
    href: "/services/website-design",
  },
  {
    eyebrow: "02",
    title: "Visual branding",
    body: "Logo design, brand identity, and visual systems that make your business feel consistent across web, social, proposals, signage, and campaigns.",
    href: "/services/visual-branding",
  },
  {
    eyebrow: "03",
    title: "Search engine optimisation",
    body: "SEO strategy, technical foundations, content structure, and ongoing optimisation designed to help the right customers find you.",
    href: "/services/seo",
  },
  {
    eyebrow: "04",
    title: "Maintenance and digital care",
    body: "Updates, security, backups, content changes, and practical support so your website keeps working after launch.",
    href: "/services/maintenance",
  },
];

const decisionSignals = [
  { label: "Find", text: "Can the right people discover you?", width: "w-[86%]" },
  { label: "Understand", text: "Can they explain what you do back to themselves?", width: "w-[92%]" },
  { label: "Trust", text: "Do the details make you feel established?", width: "w-[78%]" },
  { label: "Act", text: "Is the next step obvious without pressure?", width: "w-[84%]" },
];

const contrast = [
  ["Scattered pages", "A page system with clear roles"],
  ["Generic visuals", "A brand presence people can recognise"],
  ["Buried services", "Offers structured around customer intent"],
  ["SEO later", "Search thinking inside the architecture"],
  ["Launch and leave", "Ongoing care after the site is live"],
];

const method = [
  {
    title: "Message first",
    body: "We clarify the offer, audience, proof, objections, and conversion path before layout decisions start.",
  },
  {
    title: "UX as sales logic",
    body: "Every section has a job: orient, explain, prove, compare, reassure, or move the visitor forward.",
  },
  {
    title: "Brand with restraint",
    body: "We make the business feel distinctive without sacrificing speed, readability, accessibility, or trust.",
  },
  {
    title: "Build for use",
    body: "The finished site is responsive, SEO-ready, maintainable, and practical for the team that has to live with it.",
  },
];

const fit = [
  "The current site no longer reflects the quality of the business.",
  "Customers ask questions the website should already answer.",
  "The brand feels inconsistent across web, proposals, socials, and sales material.",
  "The business needs better visibility in search without turning the site into keyword soup.",
];

function SignalPanel() {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/14 bg-[#111]/88 shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-brand" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
          WebGaze Decision Map
        </p>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_180px]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[16px] bg-white/5">
          <Image
            src="/portfolio/Care-Partners-bbnn.png"
            alt="Care Partners Australia website interface designed by WebGaze"
            fill
            sizes="(min-width: 1024px) 42vw, 92vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
              Website before the phone call
            </p>
            <p className="mt-2 max-w-md font-display text-3xl font-bold leading-[1]">
              The first impression has to do the explaining.
            </p>
          </div>
        </div>

        <div className="grid content-between gap-3">
          {decisionSignals.map((signal) => (
            <div key={signal.label} className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-sm font-bold text-white">{signal.label}</p>
                <span className="h-1.5 w-1.5 rounded-full bg-red-brand" />
              </div>
              <p className="mt-2 font-body text-xs leading-relaxed text-white/48">{signal.text}</p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full rounded-full bg-red-brand ${signal.width}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <main className="bg-light-bg text-[#0a0a0a] dark:bg-dark-bg dark:text-white">
        <section className="relative overflow-hidden bg-[#060606] pt-32 text-white md:pt-40">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-red-brand" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.85) 1px, transparent 1px)",
                backgroundSize: "84px 84px",
              }}
            />
          </div>

          <div className="container-wide relative z-10">
            <div className="grid min-h-[calc(100vh-7rem)] grid-cols-1 items-end gap-12 pb-16 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <AnimateIn>
                  <p className="label-tag">About WebGaze</p>
                </AnimateIn>
                <AnimateIn delay={0.08}>
                  <h1 className="mt-8 max-w-[9.5ch] font-display text-6xl font-bold leading-[0.88] [letter-spacing:0] sm:text-7xl md:text-8xl lg:text-9xl">
                    The page before the phone call.
                  </h1>
                </AnimateIn>
                <AnimateIn delay={0.16}>
                  <p className="mt-8 max-w-xl font-body text-lg leading-[1.65] text-white/68 md:text-xl">
                    Most people meet your business when nobody from your team is in the room. WebGaze designs that moment: the website, brand, search structure, and next step that help Australian businesses get understood faster.
                  </p>
                </AnimateIn>
                <AnimateIn delay={0.24}>
                  <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                    <Link href="/request-a-quote" className="btn-primary justify-center">
                      Request a Proposal
                      <span aria-hidden="true">→</span>
                    </Link>
                    <Link href="/projects" className="btn-outline justify-center border-white/30 text-white hover:border-red-brand">
                      View Projects
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </AnimateIn>
              </div>

              <div className="lg:col-span-6">
                <AnimateIn delay={0.18}>
                  <SignalPanel />
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-light-bg py-20 dark:bg-dark-bg md:py-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <AnimateIn>
                  <p className="label-tag">The UX Problem</p>
                </AnimateIn>
                <AnimateIn delay={0.08}>
                  <h2 className="mt-6 font-display text-5xl font-bold leading-[0.98] [letter-spacing:0] md:text-7xl">
                    People do not read websites. They judge them.
                  </h2>
                </AnimateIn>
              </div>

              <div className="lg:col-span-7">
                <AnimateIn delay={0.12}>
                  <p className="max-w-4xl font-display text-3xl font-bold leading-[1.12] [letter-spacing:0] md:text-5xl">
                    They scan for relevance, proof, effort, and risk. If the site makes them work too hard, they leave with the wrong story.
                  </p>
                </AnimateIn>
                <AnimateIn delay={0.18}>
                  <p className="mt-8 max-w-3xl font-body text-base leading-relaxed text-light-muted dark:text-dark-muted md:text-lg">
                    Our work is to make the right story easier to reach. That means cleaner information architecture, better service framing, brand consistency, faster pages, search-aware content, and interfaces that respect how people actually decide.
                  </p>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-light-border bg-light-surface dark:border-dark-border dark:bg-[#0d0d0d]">
          <div className="container-wide py-6">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
              <div className="flex min-h-[180px] items-end bg-[#0a0a0a] p-6 text-white lg:col-span-2">
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-brand">
                    Before / After
                  </p>
                  <h2 className="mt-5 font-display text-4xl font-bold leading-[1] [letter-spacing:0] md:text-5xl">
                    From looking present to being chosen.
                  </h2>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="divide-y divide-light-border border-y border-light-border dark:divide-dark-border dark:border-dark-border">
                  {contrast.map(([before, after], index) => (
                    <AnimateIn key={before} delay={index * 0.04}>
                      <div className="grid grid-cols-[1fr_40px_1fr] items-center gap-4 py-5">
                        <p className="font-body text-sm leading-snug text-light-muted dark:text-dark-muted">{before}</p>
                        <span className="text-center font-display text-lg font-bold text-red-brand">→</span>
                        <p className="font-display text-base font-bold leading-snug md:text-lg">{after}</p>
                      </div>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-20 text-white md:py-28">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <AnimateIn>
                  <p className="label-tag">What We Build</p>
                </AnimateIn>
                <AnimateIn delay={0.08}>
                  <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] [letter-spacing:0] md:text-7xl">
                    One studio. Four connected disciplines.
                  </h2>
                </AnimateIn>
              </div>
              <div className="lg:col-span-7">
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {services.map((service, index) => (
                    <AnimateIn key={service.title} delay={index * 0.06}>
                      <Link
                        href={service.href}
                        className="group grid gap-5 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[72px_1fr_32px]"
                      >
                        <span className="font-display text-sm font-semibold text-red-brand">{service.eyebrow}</span>
                        <span>
                          <span className="block font-display text-2xl font-bold leading-tight">{service.title}</span>
                          <span className="mt-3 block max-w-2xl font-body text-sm leading-relaxed text-white/60">
                            {service.body}
                          </span>
                        </span>
                        <span className="self-start text-2xl text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red-brand">
                          →
                        </span>
                      </Link>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-light-bg py-20 dark:bg-dark-bg md:py-28">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <AnimateIn>
                  <p className="label-tag">Operating System</p>
                </AnimateIn>
                <AnimateIn delay={0.08}>
                  <h2 className="mt-6 font-display text-5xl font-bold leading-[1] [letter-spacing:0] md:text-6xl">
                    Strategy first. Interface second. Polish last.
                  </h2>
                </AnimateIn>
              </div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-px bg-light-border dark:bg-dark-border md:grid-cols-2">
                  {method.map((item, index) => (
                    <AnimateIn key={item.title} delay={index * 0.06}>
                      <article className="min-h-[250px] bg-light-bg p-7 dark:bg-dark-bg">
                        <span className="font-display text-sm font-bold text-red-brand">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-10 font-display text-2xl font-bold">{item.title}</h3>
                        <p className="mt-4 font-body text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                          {item.body}
                        </p>
                      </article>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-light-surface py-20 dark:bg-[#0d0d0d] md:py-28">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <AnimateIn>
                  <p className="label-tag">When WebGaze Fits</p>
                </AnimateIn>
                <AnimateIn delay={0.08}>
                  <h2 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1] [letter-spacing:0] md:text-7xl">
                    The business is good. The digital experience is not telling the truth yet.
                  </h2>
                </AnimateIn>
              </div>

              <div className="lg:col-span-5">
                <AnimateIn delay={0.14}>
                  <p className="font-body text-base leading-relaxed text-light-muted dark:text-dark-muted md:text-lg">
                    We are a Sydney web design studio for teams that need clearer positioning, stronger website design, better SEO foundations, and a digital partner who can keep the site useful after launch.
                  </p>
                </AnimateIn>
                <div className="mt-8 divide-y divide-light-border border-y border-light-border dark:divide-dark-border dark:border-dark-border">
                  {fit.map((item, index) => (
                    <AnimateIn key={item} delay={0.18 + index * 0.04}>
                      <p className="py-4 font-display text-lg font-semibold leading-snug">{item}</p>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CTA />
    </>
  );
}
