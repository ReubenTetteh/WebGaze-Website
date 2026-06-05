export type SystemsPhaseStep = { title: string; desc: string };

export type SystemsPhase = {
  label: string;
  title: string;
  desc: string;
  steps: SystemsPhaseStep[];
};

export const systemsPhases: SystemsPhase[] = [
  {
    label: "Phase 1",
    title: "Listen",
    desc: "It starts with a free Discovery Session. We sit with you, learn how your business actually runs day to day, and find the repetitive, manual work quietly eating your team's time.",
    steps: [
      { title: "Discovery Session", desc: "A relaxed, no-pressure conversation. You tell us where the friction is — the spreadsheets, the double-handling, the things that should be simpler." },
      { title: "Workflow Mapping", desc: "We map the steps your team takes today — who does what, when, and where things get stuck or repeated." },
      { title: "Pain-Point Audit", desc: "We pinpoint the tasks costing the most time and the most frustration, and rank them by impact." },
      { title: "Opportunity Spotting", desc: "We identify exactly where a custom tool, an automation, or AI could take work off your plate." },
    ],
  },
  {
    label: "Phase 2",
    title: "Design the Solution",
    desc: "We scope the simplest system that removes the pain — nothing bloated, nothing you won't use. We decide together where automation and AI genuinely add value, and where they don't.",
    steps: [
      { title: "Solution Blueprint", desc: "We define what the system does, who uses it, and the outcome it delivers — in plain language, not jargon." },
      { title: "Where AI Fits", desc: "We identify the moments where AI saves real time — summarising, sorting, drafting, flagging — and leave the rest simple." },
      { title: "Tool & Stack Choice", desc: "We choose the right foundation, whether that's a custom build or connecting tools you already pay for." },
      { title: "Scope & Timeline", desc: "You get a clear plan: what we'll build, what it costs, and when it lands. No surprises." },
    ],
  },
  {
    label: "Phase 3",
    title: "Build & Automate",
    desc: "We build your system, wire up the automations, and connect it to the tools you already use. Then we test it with your team using real scenarios — not a demo that only works on paper.",
    steps: [
      { title: "Custom Build", desc: "We build the tool, dashboard, or workflow around your process — so it fits how you work, not the other way around." },
      { title: "Automation & AI Setup", desc: "We automate the repetitive steps and put AI to work where it earns its place, removing manual effort end to end." },
      { title: "Integrations", desc: "We connect your existing tools — email, calendars, spreadsheets, CRMs — so everything talks to each other." },
      { title: "Real-World Testing", desc: "We test with your actual team and real data, then refine until it's genuinely better than the old way." },
    ],
  },
  {
    label: "Phase 4",
    title: "Handover & Support",
    desc: "We train your team, hand over a system that's truly yours, and stay close. As your business grows, the system grows with it.",
    steps: [
      { title: "Team Training", desc: "We walk your team through the system until it feels obvious — with simple guides they can come back to." },
      { title: "Smooth Handover", desc: "You own the system. We document how it works so you're never locked in or left guessing." },
      { title: "Iteration", desc: "We watch how it performs in the wild and fine-tune the rough edges in the first weeks." },
      { title: "Ongoing Support", desc: "Need a new feature or a tweak as you scale? We're a message away, ready to evolve it with you." },
    ],
  },
];
