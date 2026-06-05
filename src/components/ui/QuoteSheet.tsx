"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

const SPRING = { type: "spring", damping: 34, stiffness: 340 } as const;

const SERVICE_TAGS = [
  "Website Design",
  "AI & Custom Systems",
  "Branding",
  "SEO",
  "Maintenance",
  "Consulting",
];

/**
 * Bottom-sheet "Request a Proposal" form. Slides up from the bottom, drag-to
 * dismiss, posts to /api/quote.
 *
 * Anchoring: when `scrollRoot` is provided (e.g. inside the /v2 phone shell)
 * the sheet positions absolutely so it stays inside that scroll container.
 * On a regular full-page mobile view, omit `scrollRoot` and the sheet pins to
 * the viewport.
 */
export default function QuoteSheet({
  open,
  onClose,
  scrollRoot = null,
}: {
  open: boolean;
  onClose: () => void;
  scrollRoot?: RefObject<HTMLDivElement> | null;
}) {
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
    budget: "Not sure yet",
  });
  const [hp, setHp] = useState("");
  const startedAt = useRef(Date.now());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      startedAt.current = Date.now();
      setError("");
    }
  }, [open]);

  const toggleService = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const canSubmit =
    form.firstName.trim().length > 1 &&
    /.+@.+\..+/.test(form.email) &&
    form.message.trim().length > 4 &&
    services.length > 0;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lastName: "",
          services,
          _hp: hp,
          _elapsedMs: Date.now() - startedAt.current,
          captchaToken: "",
        }),
      });
      if (!res.ok) throw new Error("send_failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const portalStyle: CSSProperties = scrollRoot
    ? { position: "absolute", inset: 0 }
    : { position: "fixed", inset: 0 };

  return (
    <AnimatePresence>
      {open && (
        <div style={portalStyle} className="z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={SPRING}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className="absolute inset-x-0 bottom-0 flex max-h-[92%] flex-col rounded-t-[28px] border-t border-black/8 bg-white text-[#0a0a0a] shadow-[0_-24px_50px_rgba(0,0,0,0.18)]"
          >
            <div className="flex justify-center pt-3">
              <span className="h-1.5 w-10 rounded-full bg-black/15" />
            </div>

            {submitted ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-red-brand text-2xl text-white">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                  Got it — we&rsquo;ll be in touch.
                </h3>
                <p className="mt-3 max-w-[30ch] font-body text-sm leading-relaxed text-[#0a0a0a]/65">
                  We aim to reply within two working days. Check your inbox for a
                  confirmation.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#0a0a0a] px-7 font-display text-sm font-semibold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4"
              >
                <div>
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-red-brand">
                    Request a Proposal
                  </p>
                  <h3 className="mt-2 font-display text-[1.6rem] font-bold leading-tight tracking-[-0.025em]">
                    Tell us about the project.
                  </h3>
                </div>

                <input
                  type="text"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div>
                  <label className="block font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/55">
                    What do you need?
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SERVICE_TAGS.map((s) => {
                      const on = services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-full border px-3 py-1.5 font-display text-[12px] font-semibold transition ${
                            on
                              ? "border-red-brand bg-red-brand text-white"
                              : "border-black/15 bg-white text-[#0a0a0a]/75 hover:border-black/30"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <SheetField label="First name">
                  <input
                    required
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-transparent font-display text-[15px] text-[#0a0a0a] outline-none placeholder:text-[#0a0a0a]/35"
                    placeholder="Jane"
                  />
                </SheetField>

                <SheetField label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent font-display text-[15px] text-[#0a0a0a] outline-none placeholder:text-[#0a0a0a]/35"
                    placeholder="you@company.com"
                  />
                </SheetField>

                <SheetField label="Phone (optional)">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent font-display text-[15px] text-[#0a0a0a] outline-none placeholder:text-[#0a0a0a]/35"
                    placeholder="04…"
                  />
                </SheetField>

                <SheetField label="Budget">
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-transparent font-display text-[15px] text-[#0a0a0a] outline-none"
                  >
                    {["Not sure yet", "Under $5k", "$5k – $15k", "$15k – $40k", "$40k+"].map(
                      (b) => (
                        <option key={b} value={b} className="bg-white">
                          {b}
                        </option>
                      ),
                    )}
                  </select>
                </SheetField>

                <SheetField label="Tell us about the project">
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full resize-none bg-transparent font-display text-[15px] leading-relaxed text-[#0a0a0a] outline-none placeholder:text-[#0a0a0a]/35"
                    placeholder="A few sentences on what you're after, your timeline, and anything we should know."
                  />
                </SheetField>

                {error && (
                  <p className="font-display text-[12px] text-red-brand">{error}</p>
                )}

                <div className="sticky bottom-0 -mx-6 -mb-6 mt-2 flex flex-col gap-2 border-t border-black/10 bg-white/95 p-6 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className="inline-flex h-13 items-center justify-center rounded-full bg-red-brand px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition disabled:opacity-40"
                  >
                    {loading ? "Sending…" : "Send request →"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-display text-[12px] uppercase tracking-[0.2em] text-[#0a0a0a]/55"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SheetField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block rounded-2xl border border-black/10 bg-[#f7f7f9] px-4 py-3">
      <span className="block font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/55">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
