import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://abbiesangels.org',
  output: 'static',
  build: {
    assets: 'assets'
  },
  integrations: [sitemap()],
});
