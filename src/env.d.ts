/// <reference path="../.astro/types.d.ts" />

// ── Vite / import.meta.env (build-time) ──────────────────────────────────────
interface ImportMetaEnv {
  // HubSpot
  readonly HUBSPOT_TOKEN: string;
  readonly HUBSPOT_PORTAL_ID: string;

  // Sanity
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
  readonly SANITY_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ── Cloudflare Workers runtime Env (used by @astrojs/cloudflare adapter) ─────
// This is what the generated src/worker/index.ts types as `Env`.
declare interface Env {
  HUBSPOT_TOKEN: string;
  HUBSPOT_PORTAL_ID: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_TOKEN: string;
}
