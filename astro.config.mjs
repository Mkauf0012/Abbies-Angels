import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://abbiesangels.org',
  output: 'static',
  build: {
    assets: 'assets'
  },
});
