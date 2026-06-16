import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://abbiesangels.org',
  output: 'static',
  adapter: cloudflare(),
  build: {
    assets: 'assets'
  },
});
