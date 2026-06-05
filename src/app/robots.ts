import type { MetadataRoute } from "next";

const BASE_URL = "https://webgaze.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal/temp routes that should not be indexed.
      disallow: ["/api/", "/admin", "/studio", "/projects/agcci-temp"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
