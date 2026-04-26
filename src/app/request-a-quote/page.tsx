"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const serviceOptions = [
  {
    id: "web",
    label: "Website Design & Development",
    short: "Custom websites built to perform and convert.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "branding",
    label: "Visual Branding",
    short: "Logos, colour systems, and brand identity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "maintenance",
    label: "Website Maintenance",
    short: "Security, updates, backups and ongoing care.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "seo",
    label: "Search Engine Optimisation",
    short: "Get found by the right people at the right time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    id: "audit",
    label: "Consulting & Audit",
    short: "Identify what's working and what to improve.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    id: "full",
    label: "Full Digital Package",
    short: "Website + branding + SEO — the complete setup.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const budgetOptions = [
  { label: "Under $1,500", value: "Under $1,500" },
  { label: "$1.5k – $3k", value: "$1,500 – $3,000" },
  { label: "$3k – $5k", value: "$3,000 – $5,000" },
  { label: "$5k – $8k", value: "$5,000 – $8,000" },
  { label: "$8k – $15k", value: "$8,000 – $15,000" },
  { label: "$15k+ Custom", value: "$15,000+ Custom" },
];

const steps = ["Services", "Budget", "Details", "Review"];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[\d\s\+\-\(\)]{7,15}$/.test(phone.trim());

export default function RequestQuotePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    budget: "", message: "",
  });
  const [touched, setTouched] = useState({
    email: false, phone: false, firstName: false, message: false,
  });

  const errors = {
    firstName: touched.firstName && !form.firstName ? "First name is required." : "",
    email: touched.email && !form.email ? "Email is required."
      : touched.email && !isValidEmail(form.email) ? "Please enter a valid email address." : "",
    phone: touched.phone && !form.phone ? "Phone number is required."
      : touched.phone && !isValidPhone(form.phone) ? "Please enter a valid phone number." : "",
    message: touched.message && !form.message ? "Please tell us about your project." : "",
  };

  const toggleService = (label: string) => {
    setServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const stepValid = (s: number) => {
    if (s === 0) return services.length > 0;
    if (s === 1) return !!form.budget;
    if (s === 2) return !!form.firstName && isValidEmail(form.email) && isValidPhone(form.phone) && !!form.message;
    return true;
  };

  const goToStep = (i: number) => {
    if (i < step) { setStep(i); return; }
    if (i === step + 1 && stepValid(step)) { setStep(i); }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="min-h-[42vh] flex items-end bg-dark-bg text-[#fafafa] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`, backgroundSize: "80px 80px" }} />
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-red-brand origin-left" />
        {/* Red glow */}
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-red-brand/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="container-wide relative z-10 pt-36 pb-16">
          <motion.div className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="block w-8 h-[2px] bg-red-brand" />
            <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-red-brand">Get a Proposal</span>
          </motion.div>
          <motion.h1 className="font-display font-bold text-display-xl text-white leading-[1.04]"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}>
            Let&apos;s Build<br />Something Great
          </motion.h1>
          <motion.p className="mt-5 text-base text-[#888] max-w-sm leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            Complete the form and we&apos;ll put together a tailored proposal — no obligation.
          </motion.p>
        </div>
      </section>

      {/* Form section */}
      <section className="bg-light-bg dark:bg-dark-bg py-20 md:py-28">
        <div className="container-wide max-w-3xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="border border-light-border dark:border-dark-border rounded-3xl p-16 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-red-brand mx-auto flex items-center justify-center text-white text-2xl mb-8">
                ✓
              </motion.div>
              <h2 className="font-display font-bold text-3xl dark:text-white mb-3">Request Sent</h2>
              <p className="text-base text-light-muted dark:text-dark-muted max-w-md mx-auto leading-relaxed mb-6">
                Thanks for reaching out. We&apos;ll review your details and come back with a clear proposal — usually within 1–2 business days.
              </p>
              <a href="mailto:hello@webgaze.com.au" className="text-sm text-red-brand hover:underline">hello@webgaze.com.au</a>
            </motion.div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="flex items-center mb-14">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <button
                      onClick={() => goToStep(i)}
                      disabled={i > step || (i === step + 1 && !stepValid(step))}
                      className={`flex flex-col items-center gap-2 group ${i > step && !(i === step + 1 && stepValid(step)) ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold border-2 transition-all duration-300 ${
                        i < step ? "bg-red-brand border-red-brand text-white"
                        : i === step ? "border-red-brand text-red-brand bg-red-brand/5"
                        : "border-light-border dark:border-dark-border text-[#aaa]"
                      }`}>
                        {i < step ? "✓" : i + 1}
                      </div>
                      <span className={`text-[10px] font-display font-semibold tracking-[0.18em] uppercase transition-colors ${
                        i === step ? "text-red-brand" : i < step ? "text-[#555] dark:text-[#888]" : "text-[#bbb] dark:text-[#555]"
                      }`}>{s}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className="flex-1 mx-3 h-[2px] rounded-full overflow-hidden bg-light-border dark:bg-dark-border mb-5">
                        <motion.div className="h-full bg-red-brand origin-left"
                          animate={{ scaleX: i < step ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">

                  {/* Step 0 — Services (multi-select) */}
                  {step === 0 && (
                    <motion.div key="step0"
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.28 }}>
                      <h2 className="font-display font-bold text-2xl md:text-3xl dark:text-white mb-1">
                        What are you looking for?
                      </h2>
                      <p className="text-sm text-light-muted dark:text-dark-muted mb-8">
                        Select all that apply — you can choose multiple. <span className="text-red-brand">*</span>
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceOptions.map((s) => {
                          const selected = services.includes(s.label);
                          return (
                            <button key={s.id} type="button" onClick={() => toggleService(s.label)}
                              className={`relative flex items-start gap-4 px-5 py-5 border-2 rounded-2xl text-left transition-all duration-200 group ${
                                selected
                                  ? "border-red-brand bg-red-brand/5 dark:bg-red-brand/10"
                                  : "border-light-border dark:border-dark-border hover:border-red-brand/50 dark:hover:border-red-brand/40"
                              }`}>
                              {/* Icon */}
                              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                                selected ? "bg-red-brand text-white" : "bg-light-surface dark:bg-dark-surface text-[#777] dark:text-[#666] group-hover:bg-red-brand/10 group-hover:text-red-brand"
                              }`}>
                                {s.icon}
                              </div>
                              {/* Text */}
                              <div className="flex-1 min-w-0 pt-0.5">
                                <p className={`font-display font-semibold text-sm leading-snug mb-0.5 ${selected ? "text-red-brand" : "text-[#0f0f0f] dark:text-white"}`}>
                                  {s.label}
                                </p>
                                <p className="font-body text-xs text-light-muted dark:text-dark-muted leading-relaxed">
                                  {s.short}
                                </p>
                              </div>
                              {/* Tick */}
                              <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
                                selected ? "bg-red-brand border-red-brand" : "border-light-border dark:border-dark-border"
                              }`}>
                                {selected && (
                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {services.length > 0 && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="mt-4 text-xs text-light-muted dark:text-dark-muted">
                          {services.length} service{services.length > 1 ? "s" : ""} selected
                        </motion.p>
                      )}

                      <div className="mt-8 flex justify-end">
                        <button type="button" onClick={next} disabled={services.length === 0}
                          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                          Continue →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1 — Budget */}
                  {step === 1 && (
                    <motion.div key="step1"
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.28 }}>
                      <h2 className="font-display font-bold text-2xl md:text-3xl dark:text-white mb-1">What&apos;s your budget range?</h2>
                      <p className="text-sm text-light-muted dark:text-dark-muted mb-8">This helps us tailor the right scope for you. <span className="text-red-brand">*</span></p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {budgetOptions.map((b) => (
                          <button key={b.value} type="button" onClick={() => setForm({ ...form, budget: b.value })}
                            className={`relative px-4 py-6 border-2 rounded-2xl text-left transition-all duration-200 group ${
                              form.budget === b.value
                                ? "border-red-brand bg-red-brand text-white"
                                : "border-light-border dark:border-dark-border hover:border-red-brand/50 dark:text-white"
                            }`}>
                            <span className="font-display font-bold text-base block">{b.label}</span>
                            {form.budget === b.value && (
                              <span className="absolute top-3 right-3 text-white text-xs">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-8 flex justify-between">
                        <button type="button" onClick={back} className="btn-outline">← Back</button>
                        <button type="button" onClick={next} disabled={!form.budget}
                          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">Continue →</button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 — Details */}
                  {step === 2 && (
                    <motion.div key="step2"
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.28 }}>
                      <h2 className="font-display font-bold text-2xl md:text-3xl dark:text-white mb-1">Tell us about your project</h2>
                      <p className="text-sm text-light-muted dark:text-dark-muted mb-8">The more detail, the better we can tailor your proposal.</p>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                              First Name <span className="text-red-brand">*</span>
                            </label>
                            <input type="text" required placeholder="Reuben"
                              value={form.firstName}
                              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                              onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                              className={`w-full bg-transparent border rounded-xl px-4 py-3.5 text-sm font-body focus:outline-none focus:ring-1 transition-all dark:text-white ${errors.firstName ? "border-red-brand focus:border-red-brand focus:ring-red-brand/20" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`} />
                            {errors.firstName && <p className="mt-1.5 text-xs text-red-brand">{errors.firstName}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                              Last Name
                            </label>
                            <input type="text" placeholder="Smith"
                              value={form.lastName}
                              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                              className="w-full bg-transparent border border-light-border dark:border-dark-border rounded-xl px-4 py-3.5 text-sm font-body focus:outline-none focus:border-red-brand focus:ring-1 focus:ring-red-brand/20 transition-all dark:text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                            Email <span className="text-red-brand">*</span>
                          </label>
                          <input type="email" required placeholder="hello@yourcompany.com.au" value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            className={`w-full bg-transparent border rounded-xl px-4 py-3.5 text-sm font-body focus:outline-none focus:ring-1 transition-all dark:text-white ${errors.email ? "border-red-brand focus:border-red-brand focus:ring-red-brand/20" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`} />
                          {errors.email && <p className="mt-1.5 text-xs text-red-brand">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                            Phone <span className="text-red-brand">*</span>
                          </label>
                          <input type="tel" required placeholder="+61 4XX XXX XXX" value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            className={`w-full bg-transparent border rounded-xl px-4 py-3.5 text-sm font-body focus:outline-none focus:ring-1 transition-all dark:text-white ${errors.phone ? "border-red-brand focus:border-red-brand focus:ring-red-brand/20" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`} />
                          {errors.phone && <p className="mt-1.5 text-xs text-red-brand">{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-display font-semibold tracking-[0.15em] uppercase text-light-muted dark:text-dark-muted mb-2">
                            Project Details <span className="text-red-brand">*</span>
                          </label>
                          <textarea required rows={5} placeholder="Tell us about your project, goals, audience, and any specific requirements..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                            className={`w-full bg-transparent border rounded-xl px-4 py-3.5 text-sm font-body resize-none focus:outline-none focus:ring-1 transition-all dark:text-white ${errors.message ? "border-red-brand focus:border-red-brand focus:ring-red-brand/20" : "border-light-border dark:border-dark-border focus:border-red-brand focus:ring-red-brand/20"}`} />
                          {errors.message && <p className="mt-1.5 text-xs text-red-brand">{errors.message}</p>}
                        </div>
                      </div>
                      <div className="mt-8 flex justify-between">
                        <button type="button" onClick={back} className="btn-outline">← Back</button>
                        <button type="button" onClick={next}
                          onClick={() => {
                            setTouched({ firstName: true, email: true, phone: true, message: true });
                            if (stepValid(2)) next();
                          }}
                          className="btn-primary">Review →</button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 — Review */}
                  {step === 3 && (
                    <motion.div key="step3"
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.28 }}>
                      <h2 className="font-display font-bold text-2xl md:text-3xl dark:text-white mb-1">Review your request</h2>
                      <p className="text-sm text-light-muted dark:text-dark-muted mb-8">Everything look right? Hit submit and we&apos;ll be in touch within 1–2 business days.</p>

                      <div className="border border-light-border dark:border-dark-border rounded-2xl overflow-hidden divide-y divide-light-border dark:divide-dark-border">
                        <div className="flex gap-4 px-6 py-4">
                          <span className="text-xs font-display font-semibold tracking-[0.15em] uppercase text-[#aaa] w-24 flex-shrink-0 pt-0.5">Services</span>
                          <div className="flex flex-wrap gap-2">
                            {services.map((s) => (
                              <span key={s} className="text-xs font-display font-semibold px-3 py-1 rounded-full bg-red-brand/10 text-red-brand border border-red-brand/20">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        {[
                          { label: "Budget", value: form.budget },
                          { label: "Name", value: `${form.firstName} ${form.lastName}`.trim() },
                          { label: "Email", value: form.email },
                          { label: "Phone", value: form.phone },
                          { label: "Project", value: form.message },
                        ].map((row) => (
                          <div key={row.label} className="flex gap-4 px-6 py-4">
                            <span className="text-xs font-display font-semibold tracking-[0.15em] uppercase text-[#aaa] w-24 flex-shrink-0 pt-0.5">{row.label}</span>
                            <span className="text-sm font-body dark:text-white leading-relaxed">{row.value || "—"}</span>
                          </div>
                        ))}
                      </div>

                      {submitError && (
                        <p className="mt-4 text-sm text-red-brand">{submitError}</p>
                      )}
                      <div className="mt-8 flex justify-between">
                        <button type="button" onClick={back} className="btn-outline">← Edit</button>
                        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                          {loading ? "Sending…" : "Submit Request →"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
