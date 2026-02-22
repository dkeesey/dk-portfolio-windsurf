# deankeesey.com — Project Memory

## Current State (2026-02-22)
- **Astro**: 5.17.3 (updated from 5.17.1 same session)
- **Deployment**: Cloudflare Pages only — Netlify removed (commit a1ec707)
- **Output mode**: `server` with `@astrojs/cloudflare` adapter (mode: directory, functionPerRoute: true)
- **Positioning**: AI Systems Builder / AI Product Engineer
- **Analytics**: Direct load — GA4 + Clarity + optional Pixel in `Analytics.astro`. No GTM. No Partytown.
- **CLAUDE.md**: Accurate as of 2026-02-22 — trust it.

---

## Analytics Simplification (commit 91ad4e1, 2026-02-22)

Full teardown of over-engineered analytics stack. Key decisions and gotchas:

### What changed
- `GTMAnalytics.astro` → deleted. Replaced by `Analytics.astro` (ga4Id, clarityId, fbPixelId — no gtmId)
- Partytown removed entirely from `astro.config.mjs` and deps
- PostHog.astro: `type="text/partytown"` → direct `is:inline`
- `public/scripts/analytics-tracking.js` deleted — was Megan Gredesky's file (wrong site, hardcoded her GA4 ID + therapy service paths). The `is:inline` + `src` bug was accidentally protecting Dean from loading it.
- `public/_headers` created — CSP now actually applies on Cloudflare Pages (previously only set via `server.headers` in astro.config.mjs which doesn't affect CF Pages static delivery)
- 5 stale deps removed: `@astrojs/partytown`, `@netlify/functions`, `@astrojs/node`, `next`, `netlify-plugin-form-submissions`
- 7 Playwright analytics e2e tests added: `tests/e2e/analytics.spec.ts`

### The `is:inline` + `src` bug (root cause of 20:1 analytics discrepancy)
```astro
<!-- BROKEN — Astro silently drops the src, script never loads -->
<script is:inline src="https://www.googletagmanager.com/gtag/js?id={ga4Id}"></script>

<!-- CORRECT — external file -->
<script async src="https://www.googletagmanager.com/gtag/js?id={ga4Id}"></script>

<!-- CORRECT — inline code -->
<script is:inline>/* actual code here */</script>
```
`is:inline` tells Astro "don't process this script" — but Astro still resolves `src`. Combining them is contradictory; Astro drops `src`. This is undocumented behavior.

### CSP on Cloudflare Pages
- `server.headers` in `astro.config.mjs` = dev server only, NOT production CF Pages
- Production CSP must be in `public/_headers` — Cloudflare Pages serves this file's headers on every route
- Clarity needs both `www.clarity.ms` AND `c.clarity.ms` in CSP — missing the second breaks beacon calls silently

### Partytown removal pattern (reusable for other projects)
1. Remove `import partytown from '@astrojs/partytown'` from `astro.config.mjs`
2. Remove `partytown({...})` from integrations array
3. Remove `server.headers` block (dev-only CSP) from astro.config.mjs
4. On any `<script type="text/partytown">` tags → change to direct `<script is:inline>` or `<script async src="...">`
5. Remove `@astrojs/partytown` from `package.json` deps
6. Create `public/_headers` for production CSP
7. Verify analytics fire in browser DevTools Network tab after

---

## Astro 5 Migration Gotchas (commit 245a874, 2026-02-01)

### 1. Content config file moved
```
src/content/config.ts  →  src/content.config.ts  (project root level)
```

### 2. Collections use glob loader now
```ts
import { glob } from 'astro/loaders';
defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({...})
})
```
`generateId` must strip extensions or URLs become `/blog/post.md`.

### 3. `.slug` → `.id` everywhere
`getStaticPaths()`, RSS feed, any template referencing `entry.slug`.

### 4. `render()` import changed
```ts
import { render } from 'astro:content';
const { Content } = await render(entry);  // NOT entry.render()
```

### 5. `ViewTransitions` → `ClientRouter`
```ts
import { ClientRouter } from 'astro:transitions';
```

### 6. rehype-pretty-code → Shiki built-in

### 7. GA4 + ClientRouter soft-nav tracking
```js
document.addEventListener('astro:page-load', () => {
  gtag('config', GA4_ID, { page_path: window.location.pathname });
});
```
Without this, only the first page ever registers in GA4.

---

## Key Files
- `src/content.config.ts` — collection definitions (glob loaders)
- `src/layouts/RootLayout.astro` — ClientRouter, Analytics component mount
- `src/components/Analytics.astro` — GA4 + Clarity + Pixel (direct load)
- `src/components/PostHog.astro` — PostHog (direct inline)
- `astro.config.mjs` — Cloudflare adapter, Sentry conditional, NO Partytown
- `public/_headers` — production CSP for Cloudflare Pages
- `tests/e2e/analytics.spec.ts` — 7 analytics verification tests
- `docs/migrations/deankeesey-astro6-notes.mdx` — migration patterns doc

## Relevant Bundles
- Deployment: `cat ~/.claude/bundles/cloudflare-deployment-gotchas.md`
- Astro 5 upgrade (any project): `cat ~/.claude/bundles/astro-5-migration.md`
