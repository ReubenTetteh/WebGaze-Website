"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import Turnstile, { turnstileEnabled } from "@/components/ui/Turnstile";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[\d\s\+\-\(\)]{7,15}$/.test(phone.trim());

const contactMethods = [
  {
    label: "Call us",
    value: "+61 422 169 233",
    href: "tel:+61422169233",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email us",
    value: "hello@webgaze.com.au",
    href: "mailto:hello@webgaze.com.au",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Based in",
    value: "Sydney, NSW",
    href: "https://maps.google.com/?q=Sydney+NSW",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: "",
  });
  const [touched, setTouched] = useState({
    firstName: false, email: false, phone: false, message: false,
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [hp, setHp] = useState("");
  const startedAt = useRef(Date.now());

  const errors = {
    firstName: touched.firstName && !form.firstName ? "First name is required." : "",
    email: touched.email && !form.email ? "Email is required."
      : touched.email && !isValidEmail(form.email) ? "Please enter a valid email address." : "",
    phone: touched.phone && form.phone && !isValidPhone(form.phone) ? "Please enter a valid phone number." : "",
    message: touched.message && !form.message ? "Please add a short message." : "",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, email: true, phone: true, message: true });
    if (!form.firstName || !isValidEmail(form.email) || !form.message) return;
    if (turnstileEnabled && !captchaToken) {
      setError("Please complete the verification below.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _hp: hp,
          _elapsedMs: Date.now() - startedAt.current,
          captchaToken,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
      setCaptchaToken("");
      setCaptchaKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-white/60 dark:bg-white/[0.03] border rounded-xl pl-4 sm:pl-11 pr-4 py-3.5 text-sm font-body " +
    "placeholder:text-[#9a9a9a] dark:placeholder:text-[#5a5a5a] dark:text-white " +
    "focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm";

  // Leading icon sits inside the field on tablet/desktop only. On phones it is
  // hidden so the input border stretches full-width with balanced padding.
  const fieldIcon =
    "hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 text-[#b5b5b5] dark:text-[#555] peer-focus:text-red-brand transition-colors duration-200 pointer-events-none";

  return (
    <>
      <ServicePageHeader title="Get in Touch" subtitle="Tell us about your project and we'll get back to you within one business day." backHref="/" />

      {/* Contact body */}
      <section className="relative overflow-hidden bg-light-bg dark:bg-dark-bg section-pad">
        {/* Ambient background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* Soft radial glows */}
          <div className="absolute -top-24 -right-24 h-[480px] w-[480px] rounded-full bg-red-brand/10 blur-[120px]" />
          <div className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-red-brand/[0.07] blur-[120px]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.5] dark:opacity-[0.4]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              color: "rgba(120,120,120,0.18)",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

            {/* Left — info */}
            <div className="lg:sticky lg:top-28">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-display font-bold text-display-md dark:text-white leading-[1.1]"
              >
                Let&apos;s build something{" "}
                <span className="text-red-brand">worth looking at.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 font-body text-base text-light-muted dark:text-dark-muted leading-relaxed max-w-md"
              >
                Have a quick question or want to speak with us first? Drop a short message and a real person will get back to you — usually within one business day.
              </motion.p>

              {/* Contact method cards */}
              <div className="mt-9 space-y-3">
                {contactMethods.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Based in" ? "_blank" : undefined}
                    rel={item.label === "Based in" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                    className="group flex items-center gap-4 rounded-2xl border border-light-border dark:border-dark-border bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm p-4 transition-all duration-300 hover:border-red-brand/40 hover:shadow-[0_10px_30px_-12px_rgba(224,27,36,0.35)] hover:-translate-y-0.5"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-light-surface dark:bg-dark-surface text-[#777] dark:text-[#888] transition-colors duration-300 group-hover:bg-red-brand group-hover:text-white">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-display font-semibold tracking-[0.18em] uppercase text-light-muted dark:text-dark-muted">
                        {item.label}
                      </span>
                      <span className="block font-display font-bold text-base dark:text-white truncate group-hover:text-red-brand transition-colors duration-200">
                        {item.value}
                      </span>
                    </span>
                    <svg className="ml-auto flex-shrink-0 text-[#bbb] dark:text-[#555] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-red-brand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Proposal accent panel */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative mt-6 overflow-hidden rounded-2xl bg-red-brand p-7 noise"
              >
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <p className="relative font-display font-bold text-lg text-white leading-snug">
                  Need a scoped quote with pricing?
                </p>
                <p className="relative mt-2 text-sm text-white/75 font-body leading-relaxed">
                  Use our proposal builder for project scopes, budgets and a tailored plan.
                </p>
                <Link
                  href="/request-a-quote"
                  className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white text-red-brand font-display font-semibold text-sm px-5 py-2.5 transition-transform duration-200 hover:gap-3"
                >
                  Request a Proposal
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl border border-light-border dark:border-dark-border bg-white/70 dark:bg-white/[0.025] backdrop-blur-xl px-4 py-7 sm:p-10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]"
            >
              {/* top gradient hairline */}
              <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-brand/50 to-transparent" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-brand text-white"
                    >
                      <span className="absolute inset-0 animate-ping rounded-full bg-red-brand/40" />
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </motion.div>
                    <h3 className="mt-7 font-display font-bold text-2xl dark:text-white">Message sent</h3>
                    <p className="mt-3 max-w-sm text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                      Thanks for reaching out — we&apos;ll be in touch shortly, usually within one business day.
                    </p>
                    <a href="mailto:hello@webgaze.com.au" className="mt-5 text-sm text-red-brand hover:underline">
                      hello@webgaze.com.au
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div>
                      <h3 className="font-display font-bold text-xl dark:text-white">Send a message</h3>
                      <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">
                        Fields marked <span className="text-red-brand">*</span> are required.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* First name */}
                      <div>
                        <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                          First Name <span className="text-red-brand">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                            placeholder="Reuben"
                            className={`peer ${inputBase} ${errors.firstName ? "border-red-brand focus:ring-red-brand/25" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`}
                          />
                          <span className={fieldIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                          </span>
                        </div>
                        {errors.firstName && <p className="mt-1.5 text-xs text-red-brand">{errors.firstName}</p>}
                      </div>

                      {/* Last name */}
                      <div>
                        <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            placeholder="Smith"
                            className={`peer ${inputBase} border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20`}
                          />
                          <span className={fieldIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                        Email <span className="text-red-brand">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          placeholder="hello@company.com.au"
                          className={`peer ${inputBase} ${errors.email ? "border-red-brand focus:ring-red-brand/25" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`}
                        />
                        <span className={fieldIcon}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </span>
                      </div>
                      {errors.email && <p className="mt-1.5 text-xs text-red-brand">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                          placeholder="+61 4XX XXX XXX"
                          className={`peer ${inputBase} ${errors.phone ? "border-red-brand focus:ring-red-brand/25" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`}
                        />
                        <span className={fieldIcon}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </span>
                      </div>
                      {errors.phone && <p className="mt-1.5 text-xs text-red-brand">{errors.phone}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                        Message <span className="text-red-brand">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                        placeholder="How can we help?"
                        className={`w-full bg-white/60 dark:bg-white/[0.03] border rounded-xl px-4 py-3.5 text-sm font-body resize-none placeholder:text-[#9a9a9a] dark:placeholder:text-[#5a5a5a] dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm ${errors.message ? "border-red-brand focus:ring-red-brand/25" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`}
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-red-brand">{errors.message}</p>}
                    </div>

                    {/* Honeypot — hidden from real users; bots fill it and get dropped */}
                    <input
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={hp}
                      onChange={(e) => setHp(e.target.value)}
                      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                    />

                    {turnstileEnabled && (
                      <Turnstile key={captchaKey} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken("")} />
                    )}

                    {error && (
                      <p className="rounded-lg bg-red-brand/10 border border-red-brand/20 px-4 py-3 text-sm text-red-brand">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || (turnstileEnabled && !captchaToken)}
                      className="btn-primary btn-primary-glow w-full justify-center py-4 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending…" : "Send Message →"}
                    </button>

                    <p className="text-center text-xs text-light-muted dark:text-dark-muted">
                      We typically reply within one business day. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
