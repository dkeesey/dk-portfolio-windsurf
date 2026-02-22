# deankeesey.com - AI Systems Builder Portfolio

**Live Site**: https://deankeesey.com
**Repository**: ~/Workspace/dk-sites/deankeesey-com/
**Branch**: main
**Deployment**: Cloudflare Pages (git-driven, push to main auto-deploys)

---

## 1. WHAT IS THIS?

**Purpose**: Personal portfolio and technical blog. Positioning: AI Systems Builder / AI Product Engineer.

**Tech Stack**:
- **Framework**: Astro 5.17.1 — SSR mode, Cloudflare adapter
- **Frontend**: React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Content**: MDX/Markdown via Astro content collections (glob loader)
- **Analytics**: GTMAnalytics.astro — GA4 + GTM + FB Pixel + Microsoft Clarity (direct load); PostHog via Partytown
- **Error tracking**: Sentry (conditional — only loads if `PUBLIC_SENTRY_DSN` set)
- **Chatbot**: Botpress
- **Hosting**: Cloudflare Pages only — Netlify removed Feb 2026

**Architecture**:
```
src/
├── components/        # React + Astro components
│   └── GTMAnalytics.astro  # All analytics in one component
├── content/blog/      # Markdown/MDX blog posts
├── content/projects/  # Project showcase entries
├── content.config.ts  # Collection definitions (glob loaders) — ROOT LEVEL
├── layouts/           # RootLayout.astro (ClientRouter, analytics)
├── pages/             # Astro routes
└── lib/               # Utilities, env config

public/               # Static assets
```

---

## 2. HOW DO I WORK HERE?

```bash
npm run dev        # Start dev server (http://localhost:4321)
npm run build      # Build for production
npm run preview    # Preview production build locally
```

**Deployment**: Push to `main` → Cloudflare Pages auto-deploys. No manual step needed.

**Content collections config**: `src/content.config.ts` (root-level, NOT `src/content/config.ts`)

**Environment variables** (set in Cloudflare Pages dashboard):
- `PUBLIC_GA4_ID` — GA4 measurement ID
- `PUBLIC_GTM_ID` — GTM container ID
- `PUBLIC_FB_PIXEL_ID` — Facebook Pixel
- `PUBLIC_CLARITY_ID` — Microsoft Clarity
- `PUBLIC_SENTRY_DSN` — Sentry (optional; Sentry skipped if unset)
- `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`

**Local builds without .env**: GTMAnalytics.astro renders nothing silently (no throw). Build will succeed.

---

## 3. ⚠️ ANTI-PATTERNS

### Astro 5 migration (from 4.x) — breaking changes
These are the actual changes made; will bite you on any future migration or new Astro 5 project:

- **Config file moved**: `src/content/config.ts` → `src/content.config.ts` (project root)
- **Collections need glob loader**: `defineCollection({ loader: glob({ pattern, base, generateId }) })` — no glob loader = no entries loaded
- **generateId must strip extensions**: `generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '')` — without this, URLs become `/blog/post.md`
- **`.slug` → `.id`** everywhere: `getStaticPaths`, RSS feed, any template referencing `entry.slug`
- **`render()` import changed**: `import { render } from 'astro:content'` + `await render(entry)` — NOT `await entry.render()`
- **`ViewTransitions` → `ClientRouter`**: `import { ClientRouter } from 'astro:transitions'`
- **rehype-pretty-code removed**: Use Astro's built-in Shiki instead (configured in `astro.config.mjs`)

### GA4 + View Transitions
- **Don't defer gtag.js via requestIdleCallback** — users who navigate quickly (<2s) never trigger idle, causing ~96% hit loss
- **Soft-nav pages don't auto-track**: Must fire `gtag('config', ...)` on every `astro:page-load` event for View Transitions to register page views
- Pattern that works:
  ```js
  document.addEventListener('astro:page-load', () => {
    gtag('config', GA4_ID, { page_path: window.location.pathname });
  });
  ```

### Build with missing env vars
- GTMAnalytics.astro previously `throw`'d if no tracking IDs — broke SSG builds locally
- Fixed: component renders nothing silently when env vars absent
- **Never throw in Astro frontmatter based on env vars** — SSG runs at build time without production env

### Partytown scope
- Partytown handles PostHog only — GA4/GTM/Clarity/FB Pixel load directly (not via Partytown)
- If analytics broken: check `forward` config in `astro.config.mjs` for PostHog; check GTMAnalytics.astro for the others

---

## 4. WHERE DO I FIND X?

| What | Where |
|------|-------|
| Analytics (GA4/GTM/Pixel/Clarity) | `src/components/GTMAnalytics.astro` |
| Collection schemas | `src/content.config.ts` |
| Site/adapter config | `astro.config.mjs` |
| Blog posts | `src/content/blog/*.md` |
| Blog detail page | `src/pages/blog/[slug].astro` |
| Main layout (ClientRouter) | `src/layouts/RootLayout.astro` |
| Env var handling | `src/lib/env.ts` |

---

## 5. WHAT'S HAPPENING NOW?

**Status**: Live. Active blog + portfolio. Positioning: AI Systems Builder.

**Recent work**:
- **Feb 2026**: Fixed GA4 tracking (immediate load + View Transitions page view events). Commit 69f6625.
- **Feb 2026**: Migrated Astro 4.4.0 → 5.17.1. Commit 245a874.
- **Feb 2026**: Removed Netlify, consolidated on Cloudflare Pages. Commit a1ec707.
- **Feb 2026**: Repositioned as AI Systems Builder. Updated /about, /hire, /ai-stack pages.
- **Feb 2026**: Added /hire landing page (freelance services), /ai-stack positioning page.

**Next**:
- Blog content: continue AI + infrastructure articles
- See `memory/MEMORY.md` for Astro 5 migration gotchas reference

---

**Last Updated**: 2026-02-22
