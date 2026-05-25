export type Faq = {
  q: string;
  a: string;
};

/**
 * Shared FAQ content. Rendered by the FAQ component and also emitted as
 * FAQPage JSON-LD on the homepage for rich-result eligibility — keep both in
 * sync by sourcing from here.
 */
export const faqs: Faq[] = [
  {
    q: "What does WebGaze actually do?",
    a: "WebGaze helps businesses grow online through strategic website design, branding, SEO, and ongoing digital support. We don't just build websites — we create digital experiences designed to attract the right audience and convert them into customers.",
  },
  {
    q: "How much does a website cost?",
    a: "Every project is different. Pricing depends on your goals, features, and level of support required. After a quick conversation, we'll recommend a clear, practical solution and provide a custom proposal with no obligation.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most websites are completed within 2–6 weeks, depending on scope and content readiness. We'll give you realistic timelines upfront and keep you informed at every stage of the process.",
  },
  {
    q: "Can you redesign or improve an existing website?",
    a: "Absolutely. If your current website feels outdated, slow, or isn't converting, we can audit it, identify opportunities, and redesign or optimise it to perform better — without starting from scratch if it's not necessary.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We offer website maintenance plans starting from $129/month, covering security updates, backups, performance monitoring, and ongoing peace of mind so your site stays healthy long after launch.",
  },
];
