import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://deankeesey.com',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@content': '/src/content',
        '@utils': '/src/utils'
      }
    }
  },
  integrations: [
    react({
      include: ['**/react/*'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,

  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['@radix-ui/*'],
    },
  },
});