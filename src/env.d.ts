/// <reference path="../.astro/types.d.ts" />

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
