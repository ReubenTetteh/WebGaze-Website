"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import CTA from "@/components/sections/CTA";
import type { Metadata } from "next";

const capabilities = [
  {
    id: "web",
    label: "Web Design & Dev",
    title: "Websites That Work for Your Business",
    body: "At WebGaze, we design and build websites that work for your business. Every site is carefully designed and built to help your brand stand out, perform well online, and connect with the right audience. From business websites to landing pages and eCommerce, every build is responsive, SEO-ready, and easy for you to manage.",
    tags: ["React.js", "WordPress", "eCommerce", "UI/UX"],
  },
  {
    id: "seo",
    label: "SEO",
    title: "Get Found by the Right People",
    body: "A strong SEO strategy helps your website get found by the right people. We optimise your site to improve visibility, attract relevant traffic, and support a smooth user experience. Every decision is grounded in data and aligned with long-term growth.",
    tags: ["On-page SEO", "Keyword Research", "Performance Monitoring"],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    title: "Ongoing Care, Zero Headaches",
    body: "Every website needs ongoing maintenance to stay secure, fast, and up to date. Regular care helps prevent issues and ensures a smooth experience for your users. We keep your site secure, updated, backed up, and running smoothly.",
    tags: ["Security Updates", "Backups", "Uptime Monitoring"],
  },
  {
    id: "audit",
    label: "Consulting & Audit",
    title: "Clarity on What's Working — and What Isn't",
    body: "Our website consultation and audit services help you understand what's working and what needs improvement. We review your site's performance, security, design, and SEO to identify gaps and opportunities for growth.",
    tags: ["SEO Audit", "Security Audit", "UI/UX Audit"],
  },
];

const values = [
  { title: "Structure", desc: "We work best with businesses that value clear thinking and organised execution." },
  { title: "Clarity", desc: "No jargon. No unnecessary complexity. Just honest, direct communication." },
  { title: "Partnership", desc: "We see ourselves as a long-term digital partner, not just a vendor." },
  { title: "Quality", desc: "Every deliverable is built to last — purposeful, scalable, and easy to maintain." },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("web");
  const active = capabilities.find((c) => c.id === activeTab)!;

  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] flex items-end bg-dark-bg text-[#fafafa] relative overflow-hidden">
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
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="block w-6 h-px bg-red-brand" />
            About Us
          </motion.span>
          <motion.h1
            className="mt-6 font-display font-bold text-display-xl text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            We&apos;re a Focused
            <br />
            Digital Studio
          </motion.h1>
        </div>
      </section>

      {/* Who we are */}
      <section className="section-pad bg-light-bg dark:bg-dark-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <AnimateIn>
                <h2 className="font-display font-bold text-display-md dark:text-white">
                  Who We Are
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <p className="mt-6 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                  WebGaze is an Australian web design and digital agency focused on building clear brands, high-performance websites, and practical digital systems that support long-term business growth.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.15}>
                <p className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                  We work with businesses that value structure, clarity, and thoughtful execution — partnering closely to design digital experiences that are purposeful, scalable, and easy to maintain.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                  Rather than pushing trends or unnecessary complexity, our approach is grounded in understanding your goals, your audience, and the systems your business relies on.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.25}>
                <p className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                  We see ourselves not just as a service provider, but as a <strong className="font-semibold dark:text-white">long-term digital partner</strong> — helping you build with confidence today and scale sustainably into the future.
                </p>
              </AnimateIn>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-light-border dark:bg-dark-border">
              {values.map((v, i) => (
                <AnimateIn key={v.title} delay={i * 0.08}>
                  <div className="bg-light-bg dark:bg-dark-bg p-8">
                    <div className="w-8 h-px bg-red-brand mb-4" />
                    <h3 className="font-display font-bold text-lg dark:text-white">{v.title}</h3>
                    <p className="mt-2 text-sm font-body text-light-muted dark:text-dark-muted leading-relaxed">{v.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — tabbed */}
      <section className="section-pad bg-light-surface dark:bg-[#0d0d0d]">
        <div className="container-wide">
          <AnimateIn>
            <span className="label-tag">Capabilities</span>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="mt-5 font-display font-bold text-display-md dark:text-white max-w-lg">
              What We Can Do for You
            </h2>
          </AnimateIn>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                onClick={() => setActiveTab(cap.id)}
                className={`font-display text-sm font-semibold px-5 py-2.5 border rounded-full transition-all duration-200 ${
                  activeTab === cap.id
                    ? "bg-red-brand border-red-brand text-white"
                    : "border-light-border dark:border-dark-border hover:border-red-brand hover:text-red-brand"
                }`}
              >
                {cap.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 border border-light-border dark:border-dark-border rounded-2xl p-8 md:p-12 bg-light-bg dark:bg-dark-bg"
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl dark:text-white">{active.title}</h3>
              <p className="mt-5 font-body text-base text-light-muted dark:text-dark-muted max-w-2xl leading-relaxed">{active.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span key={tag} className="text-xs font-display font-semibold tracking-widest uppercase px-3 py-1.5 border border-red-brand text-red-brand rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/services" className="mt-8 btn-primary inline-flex">
                Explore Services
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTA />
    </>
  );
}
