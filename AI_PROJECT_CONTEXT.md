# WebGaze Website AI Project Context

Generated: 2026-05-28, Australia/Sydney.

This file is the handoff context for future AI agents after older chats are archived. Read this first, then verify the live repo state with `git status --short --branch` and `npm run build` before making decisions.

## Project Identity

WebGaze is a Sydney/Australia web design and digital agency website. The business positioning is:

- Clear brands, high-performance websites, SEO, maintenance, consulting, and practical digital systems.
- Sydney-based, serving Australia.
- Primary domain: `https://webgaze.com.au`.
- Public contact address used in code: `hello@webgaze.com.au`.
- Public phone used in code/schema/nav: `+61-411-078-843` / `04 1107 8843`.

The website is not just a brochure. It also includes public lead capture, transactional lead emails, optional database persistence, and an internal leads dashboard.

## Tech Stack

- Framework: Next.js 14 App Router.
- React: 18.
- Styling: Tailwind CSS.
- Animation: Framer Motion.
- Theme: `next-themes`, currently forced light in `src/app/layout.tsx`.
- Email: Resend plus `@react-email/components`.
- Database: Vercel Postgres via `@vercel/postgres`, used when Postgres env vars are configured.
- Analytics: Vercel Analytics, Vercel Speed Insights, optional GA4 through `@next/third-parties/google`.
- Deployment target: Vercel.

Important scripts in `package.json`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

The last checked build passed with `npm run build`.

## Repository State At Handoff

Current branch at time of writing:

```text
main...origin/main
HEAD: 7dc6791 Trigger deploy (repo now public)
```

Recent commit history:

```text
7dc6791 Trigger deploy (repo now public)
d292e04 Add SEO foundation, analytics, and leads dashboard
27e3a65 Fix: pre-render email to HTML string, avoid Resend react renderer issue
26828c1 Fix: lazy-init Resend inside handler, add /api/health diagnostic
6eef1aa Fix duplicate onClick on Review button
ed43e62 Add form validation and fixes
```

There are substantial uncommitted local changes. Treat them as intentional user work unless proven otherwise. Do not revert them casually.

Modified tracked files at handoff:

```text
src/app/about/page.tsx
src/app/admin/login/page.tsx
src/app/admin/page.tsx
src/app/api/contact/route.ts
src/app/api/discovery/route.ts
src/app/api/health/route.ts
src/app/api/quote/route.ts
src/app/globals.css
src/app/insights/brand-consistency/page.tsx
src/app/insights/local-seo-2025/page.tsx
src/app/insights/page.tsx
src/app/insights/redesign-vs-refresh/page.tsx
src/app/insights/website-losing-clients/page.tsx
src/app/layout.tsx
src/app/page.tsx
src/app/projects/[slug]/page.tsx
src/app/projects/care-partners-australia/page.tsx
src/components/layout/Footer.tsx
src/components/layout/Navbar.tsx
src/components/layout/SiteChrome.tsx
src/components/sections/BlogArticleLayout.tsx
src/components/sections/CTA.tsx
src/components/sections/ClientLogos.tsx
src/components/sections/FAQ.tsx
src/components/sections/Hero.tsx
src/components/sections/MobileHero.tsx
src/components/sections/MobilePortfolio.tsx
src/components/sections/MobileProcess.tsx
src/components/sections/Process.tsx
src/components/sections/ServicesGrid.tsx
src/components/sections/StatsStrip.tsx
src/components/sections/Testimonials.tsx
src/components/ui/HeroParallax.tsx
src/emails/ContactEmail.tsx
src/lib/projects.ts
tailwind.config.ts
```

Untracked files/directories at handoff:

```text
.eslintrc.json
src/app/api/newsletter/
src/app/v2/
src/components/sections/MobileClientLogos.tsx
src/components/sections/MobileCta.tsx
src/components/sections/MobileFaq.tsx
src/components/sections/MobileTestimonials.tsx
src/components/ui/QuoteSheet.tsx
src/lib/formValidation.ts
```

## Site Structure

Main public app lives under `src/app`.

Core public routes include:

- `/`
- `/about`
- `/services`
- `/services/website-design`
- `/services/visual-branding`
- `/services/seo`
- `/services/maintenance`
- `/services/consulting`
- `/services/systems-automation`
- `/projects`
- `/projects/[slug]`
- `/insights`
- `/contact`
- `/request-a-quote`
- `/book-a-discovery-session`
- `/privacy`
- `/terms-and-conditions`
- `/sitemap.xml`
- `/robots.txt`

Internal/protected route:

- `/admin`
- `/admin/login`

Preview/experimental route:

- `/v2`

API routes:

- `/api/contact`
- `/api/quote`
- `/api/discovery`
- `/api/newsletter`
- `/api/admin/login`
- `/api/health`

Public assets are mainly under:

- `public/images`
- `public/clients`
- `public/portfolio`
- `public/portfolio/cpa`
- `public/portfolio/agcci-temp`

## Homepage

Production homepage file:

```text
src/app/page.tsx
```

It includes metadata, local business/organization/schema JSON-LD, and this section order:

1. `Hero`
2. `ClientLogos`
3. `ServicesGrid`
4. `ProjectsGrid`
5. `Process`
6. Mobile-only `Testimonials` + `FAQ`
7. Desktop combined `Testimonials` + `FAQ`
8. `CTA`

The current local diff changed the social proof/FAQ area so mobile renders separate full-bleed v2-style sections, while desktop keeps the combined two-column section.

## Experimental `/v2`

There is a new noindex mobile-first preview route:

```text
src/app/v2/page.tsx
src/app/v2/HomeV2.tsx
```

Purpose: prototype a highly mobile, app-like homepage. On desktop it displays the experience inside an iPhone-style shell; on real mobile it uses the full viewport. It has a scroll-spy, morphing CTA, section navigation, and a `QuoteSheet` bottom sheet.

`/v2` intentionally bypasses normal site chrome:

```text
src/components/layout/SiteChrome.tsx
```

Current behavior: `SiteChrome` skips `Navbar`, `Footer`, and theme toggle for `/admin` and `/v2`.

## Design Direction

Current brand feel:

- Modern, polished, restrained, premium.
- WebGaze red is the key accent: `#E01B24`.
- Fonts: DM Sans for display, Inter for body.
- The recent mobile direction is cleaner and less decorative than older versions: fewer ambient effects, stronger typography, tighter CTAs, light-section mobile process/proof sections, and an iOS-style drawer/bottom-sheet pattern.

Important recent local design changes:

- Mobile navbar became a right-side drawer with a stacked services submenu.
- Mobile navbar hides on scroll-down and returns on scroll-up.
- Mobile hero was simplified into a restrained dark section with compact CTAs.
- Mobile process was moved from dark tap-to-expand cards to a light vertical timeline with a scroll-driven red rail.
- Mobile testimonial/FAQ/client-logo/CTA section variants were introduced or are in progress.
- Tailwind dark palette was adjusted to slightly softer elevated tones.
- Theme is currently forced light in `src/app/layout.tsx` even though dark classes still exist in many components.

## Navigation And Chrome

Main chrome:

```text
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/components/layout/SiteChrome.tsx
src/components/ui/FloatingThemeToggle.tsx
```

`Navbar.tsx` is large and animation-heavy. Be careful when editing it. Current local changes include:

- `mobileView: "main" | "services"` instead of a simple accordion.
- Scroll direction tracking for mobile bar hide/show.
- Right drawer menu with backdrop.
- Services submenu slide view.
- Contact/social links inside the drawer.

## Services

Service pages live under `src/app/services`.

Current service categories:

- Website Design
- Visual Branding
- SEO
- Maintenance
- Consulting
- Systems Automation

Shared service components:

```text
src/components/services/WebDesignProcess.tsx
src/components/services/SystemsProcess.tsx
src/components/sections/ServicePageHeader.tsx
```

## Projects / Portfolio

Portfolio data is centralized in:

```text
src/lib/projects.ts
```

Project fields include name, slug, category, filters, platform, image, year, summary, challenge, approach, outcome, services, accent, gallery, optional full page screenshot, optional live URL.

Known project slugs include:

- `care-partners-australia`
- `australian-ghanaian-chamber-of-commerce`
- `winstamac`
- `sababa-global`
- `viride-energy-africa`
- `ben-ari-accounting`
- `phytoscience-australia`
- `petra-care-services`
- `onboard-plumbing`
- `janny-global`
- `downunder-radio`
- `salaka-dance-ensemble`

Dynamic route:

```text
src/app/projects/[slug]/page.tsx
```

There are also bespoke/static case-study routes:

```text
src/app/projects/care-partners-australia/page.tsx
src/app/projects/viride-energy-africa/page.tsx
src/app/projects/agcci-temp/page.tsx
src/components/projects/AgcciCaseStudy.tsx
```

## Insights / Blog

Insights routes:

- `/insights`
- `/insights/brand-consistency`
- `/insights/local-seo-2025`
- `/insights/redesign-vs-refresh`
- `/insights/website-losing-clients`

Shared article layout:

```text
src/components/sections/BlogArticleLayout.tsx
```

Recent local edits appear to be mostly styling/copy polish and likely mobile visual alignment.

## Forms, Email, And Leads

Primary public form endpoints:

```text
src/app/api/contact/route.ts
src/app/api/quote/route.ts
src/app/api/discovery/route.ts
src/app/api/newsletter/route.ts
```

Email templates:

```text
src/emails/ContactEmail.tsx
src/emails/QuoteEmail.tsx
src/emails/DiscoveryEmail.tsx
```

Forms use Resend. Contact/quote/discovery also call `saveLead` so submissions are stored in Postgres when a database is configured.

Important form helpers:

```text
src/lib/antiBot.ts
src/lib/formValidation.ts
src/components/ui/Turnstile.tsx
```

Anti-bot layers:

- Honeypot field `_hp`.
- Time gate `_elapsedMs`.
- Optional Cloudflare Turnstile. Server verification no-ops if `TURNSTILE_SECRET_KEY` is absent.

Recent local changes hardened API routes:

- Invalid JSON is handled with a 400.
- Text fields are type-checked, trimmed, and length-limited.
- Email and phone are validated.
- Quote `services` must be a bounded non-empty list.
- Contact phone appears optional locally; quote/discovery phone required.

Newsletter route was newly added and emails WebGaze when someone signs up. It does not currently store newsletter signups in Postgres.

## Admin Dashboard

Admin route:

```text
src/app/admin/page.tsx
src/app/admin/login/page.tsx
src/app/admin/LeadsTable.tsx
src/app/admin/actions.ts
src/app/api/admin/login/route.ts
src/middleware.ts
src/lib/adminAuth.ts
```

Admin protection:

- Single password via `ADMIN_PASSWORD`.
- Login route verifies the password.
- Session cookie name: `wg_admin`.
- Cookie stores a deterministic SHA-256 token derived from the configured password, not the raw password.
- Middleware gates `/admin/:path*`, except `/admin/login`.

Lead dashboard:

- Uses Vercel Postgres only when `POSTGRES_URL` or `POSTGRES_PRISMA_URL` exists.
- Creates `leads` table and `leads_created_at_idx` on first use.
- Lead types: `contact`, `quote`, `discovery`.
- Lead statuses: `new`, `contacted`, `quoted`, `won`, `lost`.
- Dashboard includes stats, status/type filters, expandable rows, and status updates.

If no Postgres env is configured, the admin page shows a database setup message, but form submissions still send by email.

## Environment Variables

Do not commit secret values.

Expected/used environment variables from the code:

```text
ADMIN_PASSWORD
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_TURNSTILE_SITE_KEY
POSTGRES_PRISMA_URL
POSTGRES_URL
RESEND_API_KEY
TURNSTILE_SECRET_KEY
VERCEL_ENV
```

Local `.env.local` at handoff only exposed this key name during a safe key-only scan:

```text
VERCEL_OIDC_TOKEN
```

That means local form/email/database testing may not work unless env values are added locally or run in Vercel.

GA4 note from code:

- GA only loads when `NEXT_PUBLIC_GA_ID` is set and `VERCEL_ENV === "production"`.
- Code comment says to leave GA unset until the domain is switched from WordPress to Vercel.
- At cutover, set `NEXT_PUBLIC_GA_ID=G-4VDWWR3ZKQ` in Vercel.

Turnstile note:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` controls client widget rendering.
- `TURNSTILE_SECRET_KEY` controls server verification.
- Without the secret, server verification allows submissions so setup does not block forms.

## Deployment / Cutover Notes

Vercel config:

```text
vercel.json
```

Uses:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

`next.config.js` includes legacy redirects from older/WordPress-style URLs:

- `/contact-us` -> `/contact`
- `/privacy-policy` -> `/privacy`
- old service paths -> current service paths
- `/our-work` -> `/projects`
- `/project/:slug` -> `/projects/:slug`
- some dropped projects redirect to home

The code comments imply the current production domain may still have WordPress analytics/history concerns. Be careful with analytics and cutover changes.

## SEO And Metadata

Global metadata:

```text
src/app/layout.tsx
```

Homepage-specific metadata and JSON-LD:

```text
src/app/page.tsx
```

Other SEO files:

```text
src/app/sitemap.ts
src/app/robots.ts
```

Homepage JSON-LD includes Organization, LocalBusiness, WebSite, and FAQPage schema.

## Health Endpoint

Current local `/api/health` returns only:

```json
{ "ok": true }
```

It previously exposed Resend key presence/prefix diagnostics, but the local diff removed that. Keep it minimal unless there is a specific diagnostic need.

## Important Files To Read First

For product/site understanding:

```text
src/app/page.tsx
src/lib/projects.ts
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/app/layout.tsx
src/components/layout/SiteChrome.tsx
```

For forms/leads:

```text
src/app/api/contact/route.ts
src/app/api/quote/route.ts
src/app/api/discovery/route.ts
src/lib/leads.ts
src/lib/antiBot.ts
src/lib/formValidation.ts
src/components/ui/Turnstile.tsx
src/emails/*
```

For admin:

```text
src/app/admin/page.tsx
src/app/admin/LeadsTable.tsx
src/app/admin/actions.ts
src/app/api/admin/login/route.ts
src/middleware.ts
src/lib/adminAuth.ts
```

For `/v2`:

```text
src/app/v2/page.tsx
src/app/v2/HomeV2.tsx
src/components/ui/QuoteSheet.tsx
```

## Working Practices For Future Agents

1. Always run `git status --short --branch` before editing.
2. The working tree may already contain user/AI changes. Do not revert files unless the user explicitly asks.
3. Prefer small, focused edits that follow existing component patterns.
4. Use `rg` for search.
5. Use `npm run build` as the main verification command. `npm run lint` is available but may be less important if build already runs type/lint checks.
6. Do not expose or print secret env values.
7. When touching form APIs, preserve the email path even if database saving fails.
8. When touching `/admin`, preserve password-gated access and noindex behavior.
9. When touching `/v2`, remember it is noindex and intentionally self-contained without normal chrome.
10. When touching SEO/analytics, remember the WordPress-to-Vercel cutover context and avoid mixing staging traffic into production GA.

## Known Open Threads / Likely Next Steps

These are not instructions, just context for what may come next:

- Review and either finish or commit the current large mobile design pass.
- Decide whether `/v2` is only a preview or should influence the production homepage.
- Verify mobile nav/drawer behavior visually in browser after any Navbar edits.
- Confirm whether forcing light mode is intentional long-term, because dark-mode classes still exist.
- Configure/verify production env vars on Vercel: `RESEND_API_KEY`, `ADMIN_PASSWORD`, Postgres, Turnstile, and eventually GA.
- Confirm Vercel Postgres/Neon is connected so the admin dashboard stores leads.
- Decide whether newsletter signups should be stored in the leads table or a separate table.
- Verify legacy redirects before final domain cutover.

## Separate Nested MVP

There is a standalone static MVP in:

```text
diwc-learning-platform/
```

It is a separate browser-local-storage leadership training MVP, not part of the main WebGaze Next app. Its README says to run:

```bash
python3 -m http.server 4173
```

from that folder, then open:

```text
http://127.0.0.1:4173
```

Do not confuse it with the WebGaze production app.
