/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly HUBSPOT_ACCESS_TOKEN: string;
  readonly HUBSPOT_PORTAL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
