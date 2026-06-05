import type { ProcessStage } from "./ProcessScroller";

export const webDesignPhases: ProcessStage[] = [
  {
    label: "Phase 1",
    title: "Discovery",
    desc: "The Discovery phase is crucial for laying the foundation of your website. It involves understanding your business goals, identifying user needs, and planning the website structure through research-driven insights.",
    steps: [
      { title: "Initial Meeting", desc: "We start with a deep-dive conversation to understand your business, goals, and audience - setting the direction for everything that follows." },
      { title: "Competitor Research", desc: "We analyse direct and indirect competitors to identify industry standards, gaps, and opportunities for differentiation." },
      { title: "Content Gathering", desc: "We identify and collect the content assets needed - text, images, and resources - and define your brand voice and messaging strategy." },
      { title: "Information Architecture", desc: "We structure the website's navigation and content hierarchy for intuitive, user-friendly browsing." },
      { title: "UX Research", desc: "We create user personas and study behaviour patterns to ensure the site meets real audience expectations." },
      { title: "Defining KPIs", desc: "We establish measurable success criteria and set up tracking tools so we can monitor and improve performance over time." },
    ],
  },
  {
    label: "Phase 2",
    title: "Design & Development",
    desc: "In this stage, we turn your vision into a fully functional website. We design visually appealing, user-friendly layouts and develop them using modern coding standards to ensure speed, security, and accessibility.",
    steps: [
      { title: "Style Guide Development", desc: "We define colour palettes, typography, and UI components to establish a consistent visual identity." },
      { title: "Wireframe Creation & Mockups", desc: "We develop wireframes and high-fidelity mockups that visualise the final design before any code is written." },
      { title: "Platform Setup", desc: "We choose and configure the right platform - CMS, eCommerce, or custom framework - based on your needs." },
      { title: "Front & Back-End Development", desc: "We build the full site using modern standards, ensuring responsiveness, speed, and security throughout." },
      { title: "Testing & Optimisation", desc: "We run thorough testing across devices and browsers and optimise for performance, SEO, and accessibility." },
      { title: "Client Review & Final Revisions", desc: "We present the developed site for your review, address feedback, and obtain final sign-off before launch." },
    ],
  },
  {
    label: "Phase 3",
    title: "Finalisation",
    desc: "This phase ensures the website is fully optimised, secure, and ready for a successful launch. We conduct final testing, enhance performance, and implement SEO best practices to maximise visibility. Post-launch, we provide continuous support, security updates, and performance monitoring.",
    steps: [
      { title: "Cross-Browser Testing", desc: "We verify the site works flawlessly across Chrome, Firefox, Safari, Edge, and mobile browsers." },
      { title: "Performance Optimisation", desc: "We optimise images, code, and caching to achieve fast load times and strong Core Web Vitals scores." },
      { title: "SEO Optimisation", desc: "We implement on-page SEO, structured data, and mobile-friendliness, then submit the site to search engines." },
      { title: "Final Client Review & Approval", desc: "We present the finished site, incorporate last refinements, and obtain your approval for deployment." },
      { title: "Website Launch", desc: "We configure hosting and domain, migrate the site to the live server, and conduct final checks." },
      { title: "Post-Launch Support", desc: "We monitor performance, apply security updates, and provide ongoing maintenance to keep your site running at its best." },
    ],
  },
];
