import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://abbiesangels.org',
  output: 'hybrid',
  adapter: cloudflare(),
  build: {
    assets: 'assets'
  },
});
