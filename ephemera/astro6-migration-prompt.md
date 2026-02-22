# Astro 6 Migration + Analytics Stack — Session Handoff Prompt
**Created:** 2026-02-21
**Repo:** ~/Workspace/dk-sites/deankeesey-com
**Approach:** Plan first → write tests → TDD execution

---

## RECONNAISSANCE ALREADY DONE — DO NOT REPEAT

Current state confirmed before this session forked:

### Versions
- `astro: ^5.17.1` (already on v5, NOT v4)
- `@astrojs/cloudflare: ^12.6.12`
- `@astrojs/partytown: ^2.1.4` (in deps but NOT actively proxying analytics)
- `@astrojs/react: ^4.4.2`
- `framer-motion: ^12.4.7`
- `react: ^18.2.0`
- `@netlify/functions: ^3.0.1` ← STALE, should be removed (Netlify is gone)
- Node: unspecified in package.json

### Analytics: Current State
- **ClientRouter** already in use (`src/layouts/RootLayout.astro` line 4, 31) — NOT `ViewTransitions`
- Analytics loaded via `src/components/GTMAnalytics.astro` — direct `is:inline` scripts, NOT via Partytown worker
- GA4 direct gtag.js, Microsoft Clarity direct, Facebook Pixel direct — all inline
- **Known bug in GTMAnalytics.astro**: `<script async src={url} is:inline>` is contradictory — `is:inline` and `src` are mutually exclusive in Astro. This is likely silently dropping the gtag.js load.
- `astro:page-load` listener IS implemented for SPA navigation re-fires
- `useDetailedTracking` flag loads `/public/scripts/analytics-tracking.js` — verify this file exists

### Analytics: Why 20:1 Discrepancy (Cloudflare vs GA4)
Root causes identified:
1. `<script async src is:inline>` bug — gtag.js may not load at all
2. Partytown in `astro.config.mjs` still has `forward: ['dataLayer.push', 'posthog', 'botpress']` — may still intercept some calls
3. No FB Pixel ID passed to GTMAnalytics in RootLayout (only ga4Id + clarityId)
4. CSP headers may block `www.googletagmanager.com` in production

### Deployment
- Cloudflare Pages only (Netlify removed this session)
- `wrangler.toml` present — check for current config
- GitHub → Cloudflare Pages auto-deploy on main push

### Astro 6 Status (as of 2026-02-21)
- **Astro 6 is in BETA** (entered beta Jan 13, 2026)
- Backed by Cloudflare (acquired Astro Technology Company)
- Breaking changes:
  - `<ViewTransitions />` component REMOVED — uses native browser View Transitions API directly
  - `<ClientRouter />` being phased out (shared state needs explicit persistence)
  - `Astro.glob()` removed → use content collections
  - `Astro.locals.runtime` deprecated → direct env access
  - **Zod 4** upgrade required (schema migrations needed)
  - **Node 22+ required**
- Decision needed: target Astro 6 beta now OR wait for stable release?

### Cloudflare Zaraz (Evaluate as Alternative to Direct Tags)
- Cloudflare's server-side tag manager running in Workers at the edge
- GA4: ✅ native support
- Facebook Pixel: ✅ native + Conversions API (server-side deduplication)
- Microsoft Clarity: ❌ no native integration (Custom HTML workaround, known bugs)
- Requires custom domain on Cloudflare (already have it)
- Zero performance impact (moves execution off main thread to edge)
- Configured in Cloudflare dashboard → Zaraz

---

## SESSION GOAL

You are my migration engineer for this repo (`deankeesey.com`).

**High-level objectives:**
1. Fix the analytics stack immediately (the `is:inline` bug is breaking GA4 right now)
2. Evaluate Cloudflare Zaraz vs direct tags — make a recommendation
3. Implement clean, direct analytics: GA4 + Microsoft Clarity + (optionally) Meta Pixel
4. Implement Astro CSP in config with correct script-src / connect-src for analytics
5. Upgrade to Astro 6 (beta) OR upgrade all deps to latest Astro 5 + document Astro 6 readiness
6. Remove @astrojs/partytown, @netlify/functions, and any other stale deps
7. Ensure ClientRouter migration is clean (already in use, verify no v6 breakage)
8. Document all gotchas in `docs/migrations/deankeesey-astro6-notes.mdx` — this file is a DELIVERABLE and becomes the migration skill for masumihayashi.com and other sites

**Cross-site standardization goal:**
All findings are input to a reusable pattern for: masumihayashi.com, megan-gredesky, walt-opie, oakland-brainspotting. Document with that in mind.

---

## APPROACH: PLAN FIRST, STRICT TDD

### Phase 0 — Plan (output the plan, wait for approval before touching code)
1. Read `astro.config.mjs`, `src/layouts/RootLayout.astro`, `src/components/GTMAnalytics.astro`, `public/scripts/analytics-tracking.js` (if exists), `wrangler.toml`
2. Check all `is:inline` / `is:raw` script tags across the codebase for the same bug pattern
3. Decide: Astro 6 beta now or Astro 5 latest + Astro 6 readiness doc?
4. Decide: Cloudflare Zaraz or direct tags?
5. Output a step-by-step plan with estimated file changes

### Phase 1 — Write Tests First
Before touching analytics code, write Playwright tests that FAIL on current broken state:
- Test: GA4 gtag.js script loads (network request to `googletagmanager.com`)
- Test: `window.gtag` is defined after page load
- Test: `astro:page-load` fires gtag config on navigation
- Test: Clarity script loads
- Test: No console errors from analytics scripts
- Tests live in `tests/analytics/` directory

### Phase 2 — Fix Analytics
- Fix the `is:inline` + `src` bug in GTMAnalytics.astro
- Implement chosen approach (Zaraz or direct tags)
- All tests from Phase 1 must pass

### Phase 3 — CSP
- Enable Astro's CSP mechanism
- Add domains for all analytics vendors
- Test: no CSP violations in console, no blocked scripts

### Phase 4 — Astro Upgrade
- Upgrade to target version
- Fix deprecated APIs
- Run build, fix any errors
- All tests still pass

### Phase 5 — Documentation
- Complete `docs/migrations/deankeesey-astro6-notes.mdx`
- Include: versions, before/after snippets, CSP config, gotchas, reusable patterns

---

## DO NOT

- Do not commit broken intermediate states
- Do not skip the MDX documentation — it is a deliverable
- Do not proceed to Phase N+1 without Phase N tests passing
- Do not remove ClientRouter without understanding if views rely on it

---

## KEY FILES TO READ FIRST

```
astro.config.mjs
src/layouts/RootLayout.astro
src/components/GTMAnalytics.astro
public/scripts/analytics-tracking.js (may not exist)
wrangler.toml (if exists)
package.json
```

## DELIVERABLES

1. Working analytics stack (GA4 + Clarity + optional Pixel) — verified firing
2. Astro upgraded (v5 latest or v6 beta — per plan decision)
3. CSP configured
4. `docs/migrations/deankeesey-astro6-notes.mdx` — complete, committed
5. Passing Playwright tests in `tests/analytics/`
