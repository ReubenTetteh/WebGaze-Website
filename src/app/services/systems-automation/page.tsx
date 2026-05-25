import Link from "next/link";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";
import SystemsProcess from "@/components/services/SystemsProcess";

const features = [
  { title: "Custom Internal Tools", desc: "Dashboards and apps built around the way your team already works — no rigid templates." },
  { title: "Workflow Automation", desc: "The repetitive, manual steps in your day, handled automatically so your team stops doing them by hand." },
  { title: "AI Where It Counts", desc: "AI put to work on the right tasks — summarising, sorting, drafting, flagging — not bolted on for show." },
  { title: "Smart Forms & Intake", desc: "Replace paper and clunky spreadsheets with intake, booking, and capture systems that just work." },
  { title: "Reporting & Records", desc: "Turn messy manual logs — like behaviour charts or job sheets — into clean, searchable records." },
  { title: "Tool Integrations", desc: "Connect the email, calendars, CRMs, and spreadsheets you already use so everything talks to each other." },
];

const tags = ["Custom Tools", "Automation", "AI Assistants", "Integrations", "Dashboards", "Workflow"];

export default function SystemsAutomationPage() {
  return (
    <>
      <ServicePageHeader
        title="Systems & Automation"
        tag="New Service"
        subtitle="Stop doing it by hand. We build custom systems that take the busywork off your plate — with AI doing the heavy lifting where it makes sense."
      />

      {/* Breadcrumb */}
      <section className="bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-light-muted dark:text-dark-muted">
            <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-red-brand transition-colors">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Systems &amp; Automation</span>
          </nav>
        </div>
      </section>

      {/* Intro — LIGHT */}
      <section className="section-pad bg-light-bg dark:bg-dark-bg">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateIn>
              <h2 className="font-display font-bold text-display-lg text-[#0a0a0a] dark:text-white leading-[1.08]">
                Every business has work it shouldn&apos;t be doing by hand.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <p className="mt-6 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-2xl mx-auto">
                The double-handled spreadsheets. The forms re-typed three times. The reports that take half a day to pull together. We build custom systems and automations that quietly take that work off your team&apos;s plate — so your people spend their time on what actually matters. Book a free Discovery Session and tell us what&apos;s slowing you down.
              </p>
              <Link href="/book-a-discovery-session" className="btn-primary mt-8 inline-flex">
                Book a Free Discovery Session
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* How it works strip — LIGHT SURFACE */}
      <section className="bg-light-surface dark:bg-dark-surface border-y border-light-border dark:border-dark-border">
        <div className="container-wide py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: "01", title: "We Listen", label: "A free session to understand your problem." },
              { num: "02", title: "We Build", label: "A custom system that removes the manual work." },
              { num: "03", title: "It Runs", label: "Your team gets time back — for good." },
            ].map((stat) => (
              <AnimateIn key={stat.num}>
                <div className="text-center sm:text-left">
                  <p className="font-display font-bold text-4xl text-red-brand">{stat.num}</p>
                  <p className="mt-2 font-display font-bold text-base text-[#0a0a0a] dark:text-white">{stat.title}</p>
                  <p className="mt-1 font-body text-sm text-light-muted dark:text-dark-muted">{stat.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features — LIGHT */}
      <section className="section-pad bg-light-bg dark:bg-dark-bg">
        <div className="container-wide">
          <AnimateIn>
            <span className="label-tag">What We Build</span>
            <h2 className="mt-5 font-display font-bold text-display-md text-[#0a0a0a] dark:text-white max-w-lg leading-[1.1]">
              Solutions shaped around your business.
            </h2>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-light-border dark:bg-dark-border rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <AnimateIn key={f.title} delay={i * 0.07}>
                <div className="bg-light-bg dark:bg-dark-bg p-8 h-full">
                  <span className="block w-8 h-px bg-red-brand mb-5" />
                  <h3 className="font-display font-bold text-sm text-[#0a0a0a] dark:text-white mb-2">{f.title}</h3>
                  <p className="font-body text-sm text-light-muted dark:text-dark-muted leading-relaxed">{f.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-display font-semibold tracking-widest uppercase px-3 py-1.5 border border-red-brand text-red-brand rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Real example — LIGHT SURFACE */}
      <section className="bg-light-surface dark:bg-dark-surface border-y border-light-border dark:border-dark-border section-pad">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
            <AnimateIn>
              <span className="font-display font-bold text-xs tracking-[0.2em] uppercase text-red-brand">
                A Real Example
              </span>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <p className="font-display font-bold text-2xl md:text-3xl text-[#0a0a0a] dark:text-white leading-[1.25]">
                A care provider was tracking behaviour charts by hand — paper forms, re-typed into spreadsheets, hours every week.
              </p>
              <p className="mt-6 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-2xl">
                We sat down, listened to how their team actually worked, and built them a custom solution that captured everything digitally, organised it automatically, and surfaced the insights they needed — taking the busywork off their plate entirely. That&apos;s the kind of problem this service exists to solve.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/book-a-discovery-session" className="btn-primary inline-flex">
                  Tell Us Your Problem
                </Link>
                <Link href="/projects" className="btn-outline inline-flex text-[#0a0a0a] dark:text-white">
                  See Our Work
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Process — DARK */}
      <section className="section-pad bg-[#0d0d0d]">
        <div className="container-wide">
          <AnimateIn>
            <div className="inline-flex items-center gap-2 border border-dark-border rounded-full px-4 py-1.5 mb-8">
              <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-dark-muted">
                How We Build Your System
              </span>
            </div>
            <h2 className="font-display font-bold text-display-md text-white max-w-2xl leading-[1.1]">
              From Manual Headache<br />to System That Runs Itself
            </h2>
            <p className="mt-5 font-body text-base text-dark-muted max-w-2xl leading-relaxed">
              A clear, proven path — from the first conversation to a system your team relies on every day.
            </p>
          </AnimateIn>

          <SystemsProcess />
        </div>
      </section>

      <CTA />
    </>
  );
}
