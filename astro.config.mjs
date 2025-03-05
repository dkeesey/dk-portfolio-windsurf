import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import fs from 'fs';
import path from 'path';

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
    plugins: [
      {
        name: 'replace-env-vars',
        closeBundle() {
          // Path to the env.js file in the build output
          const envJsPath = path.resolve('dist/lib/env.js');

          // Check if the file exists
          if (fs.existsSync(envJsPath)) {
            // Read the file
            let content = fs.readFileSync(envJsPath, 'utf-8');

            // Replace placeholders with actual environment variables
            content = content.replace('__PUBLIC_POSTHOG_API_KEY__', process.env.PUBLIC_POSTHOG_API_KEY || '');
            content = content.replace('__PUBLIC_POSTHOG_HOST__', process.env.PUBLIC_POSTHOG_HOST || 'https://app.posthog.com');
            content = content.replace('__PUBLIC_GA_TRACKING_ID__', process.env.PUBLIC_GA_TRACKING_ID || '');

            // Write the file back
            fs.writeFileSync(envJsPath, content);
          }
        }
      }
    ]
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
      // Development-friendly CSP that allows analytics services, Azure OpenAI, and Supabase
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://*.posthog.com https://app.posthog.com https://*.googletagmanager.com https://www.google-analytics.com https://*.supabase.co https://unpkg.com https://cdn.jsdelivr.net https://*.i.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://eu-assets.i.posthog.com https://app-assets.i.posthog.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://placehold.co https://*.posthog.com https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://*.posthog.com https://app.posthog.com https://*.google-analytics.com https://www.googletagmanager.com https://*.openai.azure.com https://*.supabase.co https://api.github.com https://api.linkedin.com https://unpkg.com https://cdn.jsdelivr.net https://*.i.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://eu-assets.i.posthog.com https://app-assets.i.posthog.com;"
    }
  }
});
