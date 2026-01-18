import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import rehypePrettyCode from 'rehype-pretty-code';
import fs from 'fs';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://deankeesey.com', // Replace with your site URL
  // Temporarily disabled SSR for debugging
  // output: 'server',
  // adapter: node({
  //   mode: 'standalone',
  // }),
  integrations: [
    react(),
    tailwind(),
    mdx(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag', 'posthog', 'botpress', 'botpressWebChat'],
        debug: process.env.NODE_ENV === 'development',
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
      // More permissive CSP for development environment
      'Content-Security-Policy': process.env.NODE_ENV === 'development' ?
        // Development CSP - more permissive
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.botpress.cloud https://cdn.botpress.cloud https://messaging.botpress.cloud https://*.bpcontent.cloud https://files.bpcontent.cloud https://*.posthog.com https://cdn.jsdelivr.net https://unpkg.com https://*.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://*.botpress.cloud https://cdn.botpress.cloud https://*.bpcontent.cloud https://files.bpcontent.cloud https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://placehold.co https://res.cloudinary.com https://*.posthog.com https://*.botpress.cloud https://cdn.botpress.cloud https://*.bpcontent.cloud https://files.bpcontent.cloud https://*.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://*.posthog.com https://*.botpress.cloud https://cdn.botpress.cloud https://messaging.botpress.cloud https://*.bpcontent.cloud https://files.bpcontent.cloud https://*.openai.azure.com https://*.supabase.co https://api.github.com https://*.google-analytics.com https://*.googletagmanager.com; frame-src 'self' https://*.botpress.cloud https://cdn.botpress.cloud https://*.bpcontent.cloud https://files.bpcontent.cloud;"
        :
        // Production CSP - more strict
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://*.posthog.com https://app.posthog.com https://*.googletagmanager.com https://www.google-analytics.com https://*.supabase.co https://unpkg.com https://cdn.jsdelivr.net https://*.i.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://eu-assets.i.posthog.com https://app-assets.i.posthog.com https://cdn.botpress.cloud https://files.bpcontent.cloud; style-src 'self' 'unsafe-inline' https://cdn.botpress.cloud https://files.bpcontent.cloud https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://placehold.co https://res.cloudinary.com https://*.posthog.com https://www.google-analytics.com https://*.googletagmanager.com https://cdn.botpress.cloud https://files.bpcontent.cloud; connect-src 'self' https://*.posthog.com https://app.posthog.com https://*.google-analytics.com https://www.googletagmanager.com https://*.openai.azure.com https://*.supabase.co https://api.github.com https://api.linkedin.com https://unpkg.com https://cdn.jsdelivr.net https://*.i.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://eu-assets.i.posthog.com https://app-assets.i.posthog.com https://cdn.botpress.cloud https://messaging.botpress.cloud https://files.bpcontent.cloud https://*.bpcontent.cloud; frame-src 'self' https://*.botpress.cloud https://cdn.botpress.cloud https://*.bpcontent.cloud https://files.bpcontent.cloud;"
    }
  }
});
