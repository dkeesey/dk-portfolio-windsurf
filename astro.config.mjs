import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import sentry from '@sentry/astro';
import fs from 'fs';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://deankeesey.com', // Replace with your site URL
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    functionPerRoute: true,
  }),
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    // Sentry error tracking - only enable if DSN is configured
    ...(process.env.SENTRY_DSN || process.env.PUBLIC_SENTRY_DSN ? [
      sentry({
        dsn: process.env.PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
        sourceMapsUploadOptions: {
          project: 'deankeesey-portfolio',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      }),
    ] : []),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    // Define environment variables to be available in both client and server
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.PUBLIC_SUPABASE_URL || 'https://clzvndqgtmbsugmdpdsq.supabase.co'),
      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.PUBLIC_SUPABASE_ANON_KEY || '')
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
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
// CSP is defined in public/_headers for Cloudflare Pages production deployment.
