# Abbie's Angels

Marketing site for Abbie's Angels, a nonprofit supporting caregivers and families of
differently abled children in Western New York.

## Stack

| Concern   | Tool |
|-----------|------|
| Framework | [Astro](https://astro.build) (`output: 'server'`) |
| Hosting   | [Cloudflare Workers](https://developers.cloudflare.com/workers/) via `@astrojs/cloudflare` |
| CMS       | [Sanity](https://www.sanity.io) (content fetched at request time) |
| Forms/CRM | [HubSpot](https://www.hubspot.com) (embedded forms + `/api/hubspot` endpoint) |

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

Other scripts:

```bash
npm run build    # production build (Cloudflare adapter)
npm run preview  # preview the built worker locally
npm run check    # astro check (type-check)
```

## Environment variables

With the Cloudflare adapter, runtime vars live on `context.locals.runtime.env`, not
`process.env`. Set real values as **encrypted** variables in the Cloudflare dashboard
(Workers & Pages -> Settings -> Variables). `wrangler.toml` lists the keys with blank
placeholders:

| Variable | Purpose |
|----------|---------|
| `HUBSPOT_TOKEN` | HubSpot private-app token (required for `/api/hubspot`) |
| `HUBSPOT_PORTAL_ID` | HubSpot portal id |
| `SANITY_PROJECT_ID` / `SANITY_DATASET` / `SANITY_API_TOKEN` | Sanity access |
| `ALLOWED_ORIGINS` | Comma-separated origin allowlist for `/api/hubspot` (defaults to abbiesangels.org) |
| `TURNSTILE_SECRET` | Enables Cloudflare Turnstile verification on form submissions when set |

For local dev, put secrets in a `.dev.vars` file (git-ignored).

## Content model (Sanity)

Pages fetch documents by `_type` (e.g. `hero`, `mission`, `events`, `event`,
`gallery_image`, `spotlight`, `contact`). The Sanity Studio that edits this content
lives in its own project/repo. The shared client and image-URL helper are in
`src/lib/sanity.ts`.

## Project layout

| Path | Purpose |
|------|---------|
| `src/pages/` | Astro routes (home, events, gallery, contact, donate, sponsor, volunteer, ...) |
| `src/pages/api/hubspot.ts` | HubSpot form endpoint (contact/volunteer/donate/sponsor/newsletter) |
| `src/layouts/Base.astro` | Shared header, nav, footer, global styles |
| `src/lib/` | Sanity client + HubSpot client |
| `public/` | Static assets served as-is (`/images/...`) |
| `scripts/` | One-off maintenance scripts (e.g. Sanity gallery migration) |
