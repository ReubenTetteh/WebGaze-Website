"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

const serviceOptions = [
  "Website Design",
  "Branding",
  "Branding & Website Design",
  "SEO",
  "Social Media",
  "Consultation Audit",
  "Graphic Design",
];

const budgetOptions = [
  "Less than $1,500",
  "$1,500 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $8,000",
  "$8,000 – $15,000",
  "$15,000+ (Custom Solutions)",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", service: "", budget: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end bg-dark-bg text-[#fafafa] relative overflow-hidden">
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
          transition={{ duration: 1.2 }}
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
            Contact Us
          </motion.span>
          <motion.h1
            className="mt-6 font-display font-bold text-display-xl text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            The Next Step Is
            <br />
            a Conversation
          </motion.h1>
        </div>
      </section>

      {/* Contact body */}
      <section className="section-pad bg-light-bg dark:bg-dark-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24">

            {/* Left — info */}
            <div>
              <AnimateIn>
                <p className="font-body text-base text-light-muted dark:text-dark-muted leading-relaxed">
                  Leave us a little info and we&apos;ll be in touch. No pressure — just next steps.
                </p>
              </AnimateIn>

              <div className="mt-10 space-y-8">
                {[
                  { label: "Phone", value: "+61 411 078 843", href: "tel:+61411078843" },
                  { label: "Email", value: "hello@webgaze.com.au", href: "mailto:hello@webgaze.com.au" },
                ].map((item, i) => (
                  <AnimateIn key={item.label} delay={i * 0.1}>
                    <div>
                      <p className="text-xs font-display font-semibold tracking-[0.18em] uppercase text-dark-muted mb-1">{item.label}</p>
                      <a href={item.href} className="font-display font-bold text-lg dark:text-white hover:text-red-brand transition-colors duration-200">
                        {item.value}
                      </a>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              {/* Red accent block */}
              <AnimateIn delay={0.3}>
                <div className="mt-12 bg-red-brand p-8 rounded-2xl">
                  <p className="font-display font-bold text-xl text-white leading-snug">
                    &ldquo;Tell us where you are and where you&apos;re headed.&rdquo;
                  </p>
                  <p className="mt-3 text-sm text-white/70 font-body">We&apos;ll handle the strategy.</p>
                </div>
              </AnimateIn>
            </div>

            {/* Right — form */}
            <AnimateIn delay={0.1} direction="left">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-light-border dark:border-dark-border rounded-2xl p-10 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-red-brand mx-auto flex items-center justify-center text-white text-2xl mb-5">✓</div>
                  <h3 className="font-display font-bold text-2xl dark:text-white">Message Sent</h3>
                  <p className="mt-3 text-sm text-light-muted dark:text-dark-muted">We&apos;ll be in touch shortly. Thanks for reaching out.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                        First Name <span className="text-red-brand">*</span>
                      </label>
                      <input
                        type="text" required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full bg-transparent border border-light-border dark:border-dark-border px-4 py-3 text-sm font-body
                                   focus:outline-none focus:border-red-brand transition-colors duration-200 dark:text-white"
                        placeholder="Reuben"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full bg-transparent border border-light-border dark:border-dark-border px-4 py-3 text-sm font-body
                                   focus:outline-none focus:border-red-brand transition-colors duration-200 dark:text-white"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {[
                    { label: "Email", key: "email", type: "email", required: true, placeholder: "hello@company.com.au" },
                    { label: "Phone Number", key: "phone", type: "tel", required: true, placeholder: "+61 4XX XXX XXX" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                        {field.label} {field.required && <span className="text-red-brand">*</span>}
                      </label>
                      <input
                        type={field.type} required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-transparent border border-light-border dark:border-dark-border px-4 py-3 text-sm font-body
                                   focus:outline-none focus:border-red-brand transition-colors duration-200 dark:text-white"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                      Service Required <span className="text-red-brand">*</span>
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border px-4 py-3 text-sm font-body
                                 focus:outline-none focus:border-red-brand transition-colors duration-200 dark:text-white"
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                      Investment Range <span className="text-red-brand">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b} type="button"
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`px-3 py-2.5 text-xs font-display font-semibold border rounded-xl transition-all duration-200 text-left ${
                            form.budget === b
                              ? "border-red-brand bg-red-brand text-white"
                              : "border-light-border dark:border-dark-border hover:border-red-brand hover:text-red-brand dark:text-white"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                      Tell Us About Your Project <span className="text-red-brand">*</span>
                    </label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border border-light-border dark:border-dark-border px-4 py-3 text-sm font-body resize-none
                                 focus:outline-none focus:border-red-brand transition-colors duration-200 dark:text-white"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4">
                    Send Message →
                  </button>
                </form>
              )}
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
