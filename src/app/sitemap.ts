import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/projects";

const BASE_URL = "https://webgaze.com.au";

// Routes excluded from indexing (internal A/B tests, temp/demo pages).
const EXCLUDED_PROJECT_SLUGS = ["agcci-temp"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top-level + key marketing pages. `priority` is relative within the site.
  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/website-design", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/visual-branding", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/seo", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/consulting", priority: 0.7, changeFrequency: "monthly" },
    { path: "/services/maintenance", priority: 0.7, changeFrequency: "monthly" },
    { path: "/services/systems-automation", priority: 0.7, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/insights/local-seo-2025", priority: 0.6, changeFrequency: "yearly" },
    { path: "/insights/brand-consistency", priority: 0.6, changeFrequency: "yearly" },
    { path: "/insights/redesign-vs-refresh", priority: 0.6, changeFrequency: "yearly" },
    { path: "/insights/website-losing-clients", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/request-a-quote", priority: 0.8, changeFrequency: "yearly" },
    { path: "/book-a-discovery-session", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = portfolioProjects
    .filter((project) => !EXCLUDED_PROJECT_SLUGS.includes(project.slug))
    .map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticEntries, ...projectEntries];
}
