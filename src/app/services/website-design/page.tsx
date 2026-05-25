import Link from "next/link";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";
import WebDesignProcess from "@/components/services/WebDesignProcess";

const features = [
  { title: "Custom Design", desc: "Tailored to your brand — no templates, no shortcuts." },
  { title: "Mobile-First", desc: "Fully responsive across every screen size, from mobile to desktop." },
  { title: "SEO-Ready", desc: "Structured and optimised from day one so you get found faster." },
  { title: "Easy to Manage", desc: "Clean CMS so you can update your site without a developer." },
  { title: "Performance Optimised", desc: "Fast load times that keep visitors engaged and reduce bounce rate." },
  { title: "Accessibility Considered", desc: "Built to work for all users, meeting modern accessibility standards." },
];

const tags = ["React.js", "Next.js", "WordPress", "E-Commerce", "Figma", "UI/UX"];

export default function WebsiteDesignPage() {
  return (
    <>
      <ServicePageHeader title="Website Design" />

      {/* Breadcrumb */}
      <section className="bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-light-muted dark:text-dark-muted">
            <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-red-brand transition-colors">Services</Link>
            <span>›</span>
            <span className="text-[#0a0a0a] dark:text-white">Website Design</span>
          </nav>
        </div>
      </section>

      {/* Intro — LIGHT */}
      <section className="section-pad bg-light-bg dark:bg-dark-bg">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateIn>
              <h2 className="font-display font-bold text-display-lg text-[#0a0a0a] dark:text-white leading-[1.08]">
                Custom Built Websites to Make a Difference.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <p className="mt-6 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-2xl mx-auto">
                Your website is the only salesperson that can work 24 hours, 7 days a week. Your only job is to make sure your salesperson is professional and has what it needs to lock in more customers and sales. Let&apos;s discuss your web project on a call.
              </p>
              <Link href="/request-a-quote" className="btn-primary mt-8 inline-flex">
                Let&apos;s Discuss Your Project
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Stats strip — LIGHT SURFACE */}
      <section className="bg-light-surface dark:bg-dark-surface border-y border-light-border dark:border-dark-border">
        <div className="container-wide py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "3+", label: "Designers & Developers" },
              { num: "4+", label: "Awards for Digital Innovation" },
              { num: "50+", label: "Projects Delivered" },
              { num: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <AnimateIn key={stat.label}>
                <div className="text-center">
                  <p className="font-display font-bold text-4xl text-red-brand">{stat.num}</p>
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
            <span className="label-tag">What&apos;s Included</span>
            <h2 className="mt-5 font-display font-bold text-display-md text-[#0a0a0a] dark:text-white max-w-lg leading-[1.1]">
              Everything you need, nothing you don&apos;t.
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

      {/* Process — DARK */}
      <section className="section-pad bg-[#0d0d0d]">
        <div className="container-wide">
          <AnimateIn>
            <div className="inline-flex items-center gap-2 border border-dark-border rounded-full px-4 py-1.5 mb-8">
              <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-dark-muted">
                Our Web Design &amp; Development Process
              </span>
            </div>
            <h2 className="font-display font-bold text-display-md text-white max-w-2xl leading-[1.1]">
              A Closer Look At Our<br />Web Design Methodology
            </h2>
            <p className="mt-5 font-body text-base text-dark-muted max-w-2xl leading-relaxed">
              Transforming insights into captivating digital experiences — from discovery to launch and beyond.
            </p>
          </AnimateIn>

          <WebDesignProcess />
        </div>
      </section>

      <CTA />
    </>
  );
}
