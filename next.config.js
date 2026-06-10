/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // --- Pages renamed in the redesign ---
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },

      // --- Service sub-pages renamed ---
      { source: "/services/branding", destination: "/services/visual-branding", permanent: true },
      { source: "/services/website-maintenance", destination: "/services/maintenance", permanent: true },
      { source: "/services/search-engine-optimization", destination: "/services/seo", permanent: true },
      { source: "/services/consulting-audit", destination: "/services/consulting", permanent: true },

      // --- Legacy homepage links on the old site ---
      { source: "/our-work", destination: "/projects", permanent: true },
      { source: "/website-design", destination: "/services/website-design", permanent: true },
      { source: "/website-maintenance", destination: "/services/maintenance", permanent: true },

      // --- Projects: old prefix was /project/ (singular); two slugs also changed ---
      { source: "/project/agcci", destination: "/projects/australian-ghanaian-chamber-of-commerce", permanent: true },
      { source: "/project/benari-accounting", destination: "/projects/ben-ari-accounting", permanent: true },

      // Dropped projects -> home
      { source: "/project/kleenwave-services", destination: "/", permanent: true },
      { source: "/project/dinamica-lifestyle-elementor", destination: "/", permanent: true },

      // Catch-all for projects whose slug is unchanged (singular -> plural prefix).
      // Listed last so the specific rules above win.
      { source: "/project/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;
