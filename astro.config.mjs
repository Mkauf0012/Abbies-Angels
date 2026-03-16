import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    server: {
      allowedHosts: [
        'devserver-feature-astro-conversion--dancing-treacle-6631ef.netlify.app',
        '.netlify.app'
      ]
    }
  }
});
