import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://deankeesey.com', // Replace with your site URL
  integrations: [
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag', 'posthog'],
      },
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  markdown: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
        },
      ],
    ],
  },
  server: {
    headers: {
      // Development-friendly CSP that allows analytics services
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://*.posthog.com https://app.posthog.com https://*.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://placehold.co https://*.posthog.com https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://*.posthog.com https://app.posthog.com https://*.google-analytics.com https://www.googletagmanager.com;"
    }
  }
});
