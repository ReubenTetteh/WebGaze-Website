import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Agency Sydney | WebGaze",
  description: "WebGaze is a Sydney web design and digital agency building high-performance websites, brand identities, and SEO strategies for businesses across Australia.",
  keywords: ["web design agency Sydney", "digital agency Sydney", "website design Sydney", "branding agency Sydney", "SEO Sydney"],
  alternates: { canonical: "https://webgaze.com.au" },
  openGraph: {
    title: "Web Design Agency Sydney | WebGaze",
    description: "WebGaze is a Sydney web design and digital agency. We build high-performance websites, brand identities, and SEO strategies that help businesses grow.",
    url: "https://webgaze.com.au",
    siteName: "WebGaze",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://webgaze.com.au/og-image.jpg", width: 1200, height: 630, alt: "WebGaze — Web Design Agency Sydney" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Agency Sydney | WebGaze",
    description: "WebGaze is a Sydney web design and digital agency building high-performance websites, brand identities, and SEO strategies.",
    images: ["https://webgaze.com.au/og-image.jpg"],
  },
};

import Hero from "@/components/sections/Hero";
import ClientLogos from "@/components/sections/ClientLogos";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { faqs } from "@/lib/faqs";


const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://webgaze.com.au/#organization",
      "name": "WebGaze",
      "url": "https://webgaze.com.au",
      "logo": { "@type": "ImageObject", "url": "https://webgaze.com.au/images/logo-white-cropped.png" },
      "contactPoint": { "@type": "ContactPoint", "telephone": "+61-411-078-843", "contactType": "customer service", "areaServed": "AU" },
      "address": { "@type": "PostalAddress", "addressLocality": "Sydney", "addressRegion": "NSW", "addressCountry": "AU" },
      "sameAs": ["https://www.linkedin.com/company/webgaze", "https://www.instagram.com/webgaze.au", "https://x.com/webgaze_au"]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://webgaze.com.au/#localbusiness",
      "name": "WebGaze",
      "description": "Sydney web design and digital agency specialising in custom websites, brand identity, SEO, and website maintenance.",
      "url": "https://webgaze.com.au",
      "telephone": "+61-411-078-843",
      "email": "hello@webgaze.com.au",
      "address": { "@type": "PostalAddress", "addressLocality": "Sydney", "addressRegion": "NSW", "addressCountry": "AU" },
      "areaServed": [{ "@type": "City", "name": "Sydney" }, { "@type": "State", "name": "New South Wales" }, { "@type": "Country", "name": "Australia" }],
      "priceRange": "$$",
      "image": "https://webgaze.com.au/og-image.jpg"
    },
    {
      "@type": "WebSite",
      "@id": "https://webgaze.com.au/#website",
      "url": "https://webgaze.com.au",
      "name": "WebGaze",
      "publisher": { "@id": "https://webgaze.com.au/#organization" },
      "potentialAction": { "@type": "SearchAction", "target": "https://webgaze.com.au/insights?q={search_term_string}", "query-input": "required name=search_term_string" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://webgaze.com.au/#faq",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    }
  ]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {/* 1. Hook — who we are and what we do */}
      <Hero />

      {/* 1b. Social proof — client logos on a clean surface */}
      <ClientLogos />

      {/* 2. Services — what we offer */}
      <ServicesGrid />

      {/* 3. Work — show don't tell (visual proof) */}
      <ProjectsGrid />

      {/* 4. Process — reassure on how we work */}
      <Process />

      {/* 5. Social proof + objections.
          On phones each component renders its own full-bleed v2-style section,
          so the shared wrapper is desktop-only. */}
      <div className="lg:hidden">
        <Testimonials variant="column" />
        <FAQ variant="column" />
      </div>
      <section className="hidden lg:block section-pad bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20 lg:items-stretch">
            <Testimonials variant="column" />
            <FAQ variant="column" />
          </div>
        </div>
      </section>

      {/* 6. CTA — final push */}
      <CTA />
    </>
  );
}
