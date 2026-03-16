import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    assets: 'assets'
  },
  server: {
    // Ensures /admin/ serves public/admin/index.html correctly in dev
    headers: {
      '/**': [
        { key: 'Cache-Control', value: 'no-store' }
      ]
    }
  },
  trailingSlash: 'always'
});
