"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";

const services = [
  {
    id: "web",
    num: "01",
    label: "Web Design & Dev",
    title: "Web Design & Development",
    headline: "Built to Perform. Designed to Convert.",
    body: [
      "At WebGaze, we design and build websites that work for your business. From business websites to landing pages and eCommerce, every build is responsive, SEO-ready, and easy for you to manage.",
      "Every site is carefully designed and built to help your brand stand out, perform well online, and connect with the right audience.",
    ],
    tags: ["React.js", "E-Commerce", "WordPress", "Next.js", "Figma"],
    features: [
      "Custom design tailored to your brand",
      "Mobile-first, fully responsive",
      "SEO-ready from day one",
      "Easy content management",
      "Performance optimised",
      "Accessibility considered",
    ],
  },
  {
    id: "branding",
    num: "02",
    label: "Visual Branding",
    title: "Visual Branding",
    headline: "Your Brand. Unmistakable.",
    body: [
      "Visual branding is how people recognise your brand. We create cohesive brand visuals — from logos to colour systems — that help your business stand out, stay consistent, and connect with the right audience.",
      "We refine your visual identity so your business looks credible, recognisable, and ready to scale.",
    ],
    tags: ["Graphic Design", "Logo Design", "Brand Guide", "Colour Systems"],
    features: [
      "Logo design & identity",
      "Colour palette & typography",
      "Brand guidelines document",
      "Visual asset creation",
      "Messaging & tone of voice",
      "Brand consistency review",
    ],
  },
  {
    id: "maintenance",
    num: "03",
    label: "Maintenance",
    title: "Website Maintenance",
    headline: "Secure. Fast. Always On.",
    body: [
      "Every website needs ongoing maintenance to stay secure, fast, and up to date. Regular care helps prevent issues and ensures a smooth experience for your users.",
      "We keep your site secure, updated, backed up, and running smoothly — so you avoid downtime, slow pages, and surprise issues.",
    ],
    tags: ["Security", "Updates", "Backups", "Monitoring"],
    features: [
      "Regular software & plugin updates",
      "Security monitoring & patching",
      "Daily/weekly backups",
      "Uptime monitoring",
      "Performance optimisation",
      "Monthly reports",
    ],
  },
  {
    id: "seo",
    num: "04",
    label: "SEO",
    title: "Search Engine Optimisation",
    headline: "Get Found. Stay Found.",
    body: [
      "A strong SEO strategy helps your website get found by the right people. We optimise your site to improve visibility, attract relevant traffic, and support a smooth user experience.",
      "Every decision is grounded in data and aligned with long-term, sustainable growth.",
    ],
    tags: ["On-page SEO", "Keyword Research", "Performance", "Analytics"],
    features: [
      "Keyword research & strategy",
      "On-page SEO implementation",
      "Technical SEO audit",
      "Content optimisation",
      "Performance monitoring",
      "Monthly reporting",
    ],
  },
  {
    id: "audit",
    num: "05",
    label: "Consulting & Audit",
    title: "Consulting & Audit",
    headline: "Know Exactly Where You Stand.",
    body: [
      "Our website consultation and audit services help you clearly understand what's working, what's holding you back, and where the biggest opportunities lie.",
      "We review your site's performance, security, design, user experience, and SEO, then provide practical recommendations to improve visibility, usability, and conversions.",
    ],
    tags: ["SEO Audit", "Security Audit", "UI/UX Audit", "Strategy"],
    features: [
      "Full website performance review",
      "SEO health check",
      "Security vulnerability scan",
      "UI/UX usability assessment",
      "Conversion opportunity analysis",
      "Prioritised action report",
    ],
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState("web");
  const active = services.find((s) => s.id === activeService)!;

  return (
    <>
      {/* Hero */}
      <section className="min-h-[55vh] flex items-end bg-dark-bg text-[#fafafa] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute top-0 left-0 right-0 h-px bg-red-brand origin-left"
        />
        <div className="container-wide relative z-10 pt-36 pb-20">
          <motion.span
            className="label-tag"
            style={{ color: "#E01B24" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="block w-6 h-px bg-red-brand" />
            Services
          </motion.span>
          <motion.h1
            className="mt-6 font-display font-bold text-display-xl text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            Built with Strategy,
            <br />
            Not Guesswork
          </motion.h1>
        </div>
      </section>

      {/* Services — tabbed explorer */}
      <section className="section-pad bg-light-bg dark:bg-dark-bg">
        <div className="container-wide">
          <AnimateIn>
            <p className="font-body text-base text-light-muted dark:text-dark-muted max-w-2xl leading-relaxed">
              WebGaze helps businesses turn attention into enquiries, bookings, and sales through high-performing websites, strong branding, and consistent optimisation.
            </p>
          </AnimateIn>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 border border-light-border dark:border-dark-border rounded-2xl overflow-hidden">
            {/* Sidebar nav */}
            <div className="border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s.id)}
                  className={`w-full text-left px-6 py-5 border-b border-light-border dark:border-dark-border last:border-b-0
                    flex items-center justify-between group transition-all duration-200 ${
                    activeService === s.id
                      ? "bg-red-brand text-white"
                      : "hover:bg-light-surface dark:hover:bg-dark-surface"
                  }`}
                >
                  <div>
                    <span className={`text-xs font-display font-semibold ${activeService === s.id ? "text-white/60" : "text-dark-muted"}`}>
                      {s.num}
                    </span>
                    <p className={`font-display font-bold text-sm mt-0.5 ${activeService === s.id ? "text-white" : "dark:text-white"}`}>
                      {s.label}
                    </p>
                  </div>
                  <span className={`transition-colors duration-200 ${activeService === s.id ? "text-white" : "text-dark-muted"}`}>→</span>
                </button>
              ))}
            </div>

            {/* Content panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-8 md:p-12"
              >
                <span className="font-display font-bold text-6xl text-red-brand/10 select-none">
                  {active.num}
                </span>
                <h2 className="mt-2 font-display font-bold text-2xl md:text-3xl dark:text-white">{active.title}</h2>
                <p className="mt-1 text-red-brand font-display font-semibold text-sm tracking-wide">{active.headline}</p>

                <div className="mt-6 space-y-4">
                  {active.body.map((para, i) => (
                    <p key={i} className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Features grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {active.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm font-body text-light-muted dark:text-dark-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-brand flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span key={tag} className="text-xs font-display font-semibold tracking-widest uppercase px-3 py-1.5 border border-red-brand text-red-brand rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href="/request-a-quote" className="mt-8 btn-primary inline-flex">
                  Get a Proposal
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}
