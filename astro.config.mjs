import { defineConfig } from 'astro/config';

// Project Pages: https://mbc0426.github.io/manBocchi.github.io/
// For a custom domain set SITE_URL and BASE_PATH=/ in the build environment.
export default defineConfig({
  site: process.env.SITE_URL || 'https://mbc0426.github.io',
  base: process.env.BASE_PATH || '/manBocchi.github.io',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
  devToolbar: { enabled: false },
});
