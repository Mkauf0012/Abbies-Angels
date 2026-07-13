import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://abbiesangels.org',
  output: 'server',
  adapter: cloudflare(),
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  },
});
