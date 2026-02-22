# deankeesey.com — Project Memory

## Current State (2026-02-21)
- **Astro**: 5.17.1 (migrated from 4.4.0 on 2026-02-01) — CLAUDE.md still says 4.4.0, ignore it
- **Deployment**: Cloudflare Pages only — Netlify removed (commit a1ec707). CLAUDE.md says Netlify primary, that's wrong.
- **Output mode**: `server` with `@astrojs/cloudflare` adapter (mode: directory, functionPerRoute: true)
- **Positioning**: AI Systems Builder / AI Product Engineer (updated ~2026-02-09)

---

## Astro 5 Migration Gotchas (commit 245a874, 2026-02-01)

These will bite any future migration work or new projects following the same pattern.

### 1. Content config file moved
```
src/content/config.ts  →  src/content.config.ts  (project root level)
```

### 2. Collections use glob loader now
```ts
// Astro 4 — legacy
defineCollection({ schema: z.object({...}) })

// Astro 5 — required
import { glob } from 'astro/loaders';
defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),  // strips .md from IDs
  }),
  schema: z.object({...})
})
```
**Why generateId matters:** Without it, entry IDs include the `.md` extension → URLs become `/blog/post-title.md` instead of `/blog/post-title`. Must strip it.

### 3. .slug → .id everywhere
```ts
// Astro 4
params: { slug: entry.slug }
link: `/blog/${post.slug}/`

// Astro 5
params: { slug: entry.id }
link: `/blog/${post.id}/`
```
Check: `getStaticPaths()`, RSS feed, any template that references entry.slug.

### 4. render() import changed
```ts
// Astro 4
const { Content } = await entry.render();

// Astro 5
import { getCollection, render } from 'astro:content';
const { Content } = await render(entry);
```

### 5. ViewTransitions → ClientRouter
```astro
// Astro 4
import { ViewTransitions } from 'astro:transitions';
<ViewTransitions />

// Astro 5
import { ClientRouter } from 'astro:transitions';
<ClientRouter />
```

### 6. rehype-pretty-code dropped
Replaced with Astro's built-in Shiki syntax highlighting. If rehype-pretty-code config existed, it's gone — use Shiki themes in `astro.config.mjs` markdown config instead.

### 7. GA4 + View Transitions tracking (fixed 2026-02-21, commit 69f6625)
- **Problem**: `requestIdleCallback` deferred gtag load → ~96% hit loss (users navigate before idle fires)
- **Fix**: Immediate async load + `astro:page-load` listener for soft-nav tracking
- **Pattern**: Every View Transitions page nav needs `gtag('config', ...)` re-fired via `document.addEventListener('astro:page-load', ...)`
- **Build gotcha**: GTMAnalytics.astro threw if env vars absent (local builds without .env) — fixed to render nothing silently

---

## Key Files
- `src/content.config.ts` — collection definitions with glob loaders
- `src/layouts/RootLayout.astro` — ClientRouter, analytics component
- `src/components/GTMAnalytics.astro` — GA4/GTM/FB Pixel/Clarity (all four)
- `astro.config.mjs` — Cloudflare adapter, Partytown, Sentry conditional load
- `src/pages/blog/[slug].astro` — uses `entry.id`, `render(entry)` from astro:content

## Relevant Bundles
- Deployment work: `cat ~/.claude/bundles/cloudflare-deployment-gotchas.md`
