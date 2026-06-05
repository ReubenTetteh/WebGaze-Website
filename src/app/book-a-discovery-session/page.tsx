"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ServicePageHeader from "@/components/sections/ServicePageHeader";
import Turnstile, { turnstileEnabled } from "@/components/ui/Turnstile";

const orgTypes = [
  "Care / Disability Provider",
  "Health & Wellness",
  "Trades & Services",
  "Real Estate",
  "Energy & Industry",
  "Startup / Founder",
  "Retail / E-Commerce",
  "Other",
];

const meetingOptions = ["Video call", "Phone call", "In person"];
const timeOptions = ["Weekday morning", "Weekday afternoon", "Evening", "I'm flexible"];

const expectations = [
  { title: "We listen first", desc: "No sales pitch. You walk us through the manual, repetitive work that's slowing your team down." },
  { title: "We spot the opportunity", desc: "We point out exactly where a custom system, automation, or AI could take that work off your plate." },
  { title: "You leave with clarity", desc: "Whether you build with us or not, you'll leave knowing what's possible — and what it would take." },
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[\d\s\+\-\(\)]{7,15}$/.test(phone.trim());

export default function BookDiscoverySessionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    organisation: "", orgType: "", meeting: "", preferredTime: "", problem: "",
  });
  const [touched, setTouched] = useState({
    firstName: false, email: false, phone: false, problem: false,
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [hp, setHp] = useState("");
  const startedAt = useRef(Date.now());

  const errors = {
    firstName: touched.firstName && !form.firstName ? "First name is required." : "",
    email: touched.email && !form.email ? "Email is required."
      : touched.email && !isValidEmail(form.email) ? "Please enter a valid email address." : "",
    phone: touched.phone && !form.phone ? "Phone number is required."
      : touched.phone && !isValidPhone(form.phone) ? "Please enter a valid phone number." : "",
    problem: touched.problem && !form.problem ? "Tell us a little about what's slowing you down." : "",
  };

  const isValid =
    !!form.firstName && isValidEmail(form.email) && isValidPhone(form.phone) && !!form.problem;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, email: true, phone: true, problem: true });
    if (!isValid) return;
    if (turnstileEnabled && !captchaToken) {
      setSubmitError("Please complete the verification below.");
      return;
    }
    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/discovery", {
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
      setSubmitError("Something went wrong. Please try again or email us directly.");
      setCaptchaToken("");
      setCaptchaKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full bg-transparent border rounded-xl px-4 py-3.5 text-sm font-body focus:outline-none focus:ring-1 transition-all dark:text-white";
  const inputOk = "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20";
  const inputErr = "border-red-brand focus:border-red-brand focus:ring-red-brand/20";
  const labelCls = "block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2";

  return (
    <>
      <ServicePageHeader
        title="Book a Free Discovery Session"
        tag="AI & Custom Business Systems"
        subtitle="Tell us what's slowing your team down. We'll listen, then show you how a custom system could take it off your plate."
        backHref="/services/systems-automation"
      />

      <section className="bg-light-bg dark:bg-dark-bg py-20 md:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">

            {/* Left — what to expect */}
            <div className="lg:sticky lg:top-28">
              <span className="label-tag">What to Expect</span>
              <h2 className="mt-5 font-display font-bold text-2xl md:text-3xl text-[#0a0a0a] dark:text-white leading-[1.15]">
                A 30-minute, no-pressure conversation.
              </h2>
              <p className="mt-4 font-body text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                It&apos;s completely free, and there&apos;s no obligation to go further. The goal is simple: understand your problem and show you what&apos;s possible.
              </p>

              <div className="mt-10 space-y-6">
                {expectations.map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-brand/10 text-red-brand flex items-center justify-center font-display font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-[#0a0a0a] dark:text-white">{item.title}</p>
                      <p className="mt-1 font-body text-sm text-light-muted dark:text-dark-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-light-border dark:border-dark-border">
                <p className="font-body text-sm text-light-muted dark:text-dark-muted">
                  Prefer to talk first?
                </p>
                <a href="mailto:hello@webgaze.com.au" className="font-display font-semibold text-sm text-red-brand hover:underline">
                  hello@webgaze.com.au
                </a>
              </div>
            </div>

            {/* Right — booking form */}
            <div className="border border-light-border dark:border-dark-border rounded-3xl p-7 md:p-10">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-red-brand mx-auto flex items-center justify-center text-white text-2xl mb-8">
                    ✓
                  </motion.div>
                  <h2 className="font-display font-bold text-3xl dark:text-white mb-3">Session Requested</h2>
                  <p className="text-base text-light-muted dark:text-dark-muted max-w-md mx-auto leading-relaxed mb-6">
                    Thanks, {form.firstName}. We&apos;ve got your details and we&apos;ll reach out within 1 business day to lock in a time that works for you.
                  </p>
                  <a href="mailto:hello@webgaze.com.au" className="text-sm text-red-brand hover:underline">hello@webgaze.com.au</a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-display font-bold text-2xl md:text-3xl dark:text-white mb-1">Book your session</h2>
                  <p className="text-sm text-light-muted dark:text-dark-muted mb-8">Takes about a minute. <span className="text-red-brand">*</span> required.</p>

                  <div className="space-y-5">
                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>First Name <span className="text-red-brand">*</span></label>
                        <input type="text" placeholder="Reuben" value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                          className={`${inputBase} ${errors.firstName ? inputErr : inputOk}`} />
                        {errors.firstName && <p className="mt-1.5 text-xs text-red-brand">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>Last Name</label>
                        <input type="text" placeholder="Smith" value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className={`${inputBase} ${inputOk}`} />
                      </div>
                    </div>

                    {/* Email + phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Email <span className="text-red-brand">*</span></label>
                        <input type="email" placeholder="you@company.com.au" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          className={`${inputBase} ${errors.email ? inputErr : inputOk}`} />
                        {errors.email && <p className="mt-1.5 text-xs text-red-brand">{errors.email}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>Phone <span className="text-red-brand">*</span></label>
                        <input type="tel" placeholder="+61 4XX XXX XXX" value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                          className={`${inputBase} ${errors.phone ? inputErr : inputOk}`} />
                        {errors.phone && <p className="mt-1.5 text-xs text-red-brand">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Organisation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Organisation</label>
                        <input type="text" placeholder="Your business name" value={form.organisation}
                          onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                          className={`${inputBase} ${inputOk}`} />
                      </div>
                      <div>
                        <label className={labelCls}>Type of Organisation</label>
                        <select value={form.orgType}
                          onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                          className={`${inputBase} ${inputOk} ${form.orgType ? "" : "text-light-muted dark:text-dark-muted"}`}>
                          <option value="">Select…</option>
                          {orgTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Problem */}
                    <div>
                      <label className={labelCls}>What would you like to take off your plate? <span className="text-red-brand">*</span></label>
                      <textarea rows={5} placeholder="e.g. We track behaviour charts on paper and re-type them into spreadsheets every week — it eats hours and things get missed."
                        value={form.problem}
                        onChange={(e) => setForm({ ...form, problem: e.target.value })}
                        onBlur={() => setTouched((t) => ({ ...t, problem: true }))}
                        className={`${inputBase} resize-none ${errors.problem ? inputErr : inputOk}`} />
                      {errors.problem && <p className="mt-1.5 text-xs text-red-brand">{errors.problem}</p>}
                    </div>

                    {/* Meeting type */}
                    <div>
                      <label className={labelCls}>How would you like to meet?</label>
                      <div className="flex flex-wrap gap-2">
                        {meetingOptions.map((m) => (
                          <button key={m} type="button" onClick={() => setForm({ ...form, meeting: m })}
                            className={`px-4 py-2.5 rounded-full text-sm font-display font-semibold border-2 transition-all duration-200 ${
                              form.meeting === m
                                ? "border-red-brand bg-red-brand text-white"
                                : "border-light-border dark:border-dark-border text-[#0a0a0a] dark:text-white hover:border-red-brand/50"
                            }`}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferred time */}
                    <div>
                      <label className={labelCls}>Preferred Time</label>
                      <div className="flex flex-wrap gap-2">
                        {timeOptions.map((t) => (
                          <button key={t} type="button" onClick={() => setForm({ ...form, preferredTime: t })}
                            className={`px-4 py-2.5 rounded-full text-sm font-display font-semibold border-2 transition-all duration-200 ${
                              form.preferredTime === t
                                ? "border-red-brand bg-red-brand text-white"
                                : "border-light-border dark:border-dark-border text-[#0a0a0a] dark:text-white hover:border-red-brand/50"
                            }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
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
                    <div className="mt-6">
                      <Turnstile key={captchaKey} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken("")} />
                    </div>
                  )}

                  {submitError && <p className="mt-5 text-sm text-red-brand">{submitError}</p>}

                  <button type="submit" disabled={loading || (turnstileEnabled && !captchaToken)}
                    className="btn-primary w-full justify-center mt-8 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? "Sending…" : "Book My Free Session →"}
                  </button>
                  <p className="mt-4 text-center font-body text-xs text-light-muted dark:text-dark-muted">
                    Free · No obligation · We respond within 1 business day.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
