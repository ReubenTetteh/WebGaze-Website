import type { MetadataRoute } from "next";

const BASE_URL = "https://webgaze.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal/temp routes that should not be indexed.
      disallow: ["/api/", "/studio", "/projects/agcci-temp", "/v2-a", "/v2-b"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
