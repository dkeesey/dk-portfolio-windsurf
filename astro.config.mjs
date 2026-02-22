import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://deankeesey.com',
  output: 'server',
  adapter: cloudflare(),

  // Astro 6 built-in CSP — hash-based, works with all adapters
  // Note: incompatible with <ClientRouter />, so we use full page navigations
  csp: {
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", "https:", "data:"],
      'font-src': ["'self'", "https://fonts.gstatic.com", "data:"],
      'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      'connect-src': [
        "'self'",
        "https://www.google-analytics.com",
        "https://*.google-analytics.com",
        "https://www.clarity.ms",
        "https://graph.facebook.com",
        "https://www.facebook.com",
        "https://*.supabase.co",
        "https://*.openai.azure.com",
        "https://api.github.com",
      ],
      'frame-src': ["'self'"],
    },
    scriptDirective: {
      resources: [
        "https://www.googletagmanager.com",
        "https://www.clarity.ms",
        "https://connect.facebook.net",
      ],
    },
  },

  integrations: [
    react(),
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
    plugins: [
      tailwindcss(),
    ],
    // Define environment variables to be available in both client and server
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.PUBLIC_SUPABASE_URL || 'https://clzvndqgtmbsugmdpdsq.supabase.co'),
      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.PUBLIC_SUPABASE_ANON_KEY || ''),
    },
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
