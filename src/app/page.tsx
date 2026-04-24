import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import VelocityBanner from "@/components/sections/VelocityBanner";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      {/* 1. Hook — who we are and what we do */}
      <Hero />

      {/* 2. Credibility — quick proof before they scroll away */}
      <StatsStrip />

      {/* Visual momentum break */}
      <VelocityBanner />

      {/* 3. Services — what we offer */}
      <ServicesGrid />

      {/* 4. Work — show don't tell */}
      <ProjectsGrid />

      {/* 5. Process — how we work */}
      <Process />

      {/* 6. Social proof — real clients, real results */}
      <Testimonials />

      {/* 7. FAQ — address objections */}
      <FAQ />

      {/* 8. CTA — final push */}
      <CTA />
    </>
  );
}
