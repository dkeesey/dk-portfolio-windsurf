# Astro 6 Migration + Analytics Fix — Session Handoff

## Handoff Type
Plan Execution — full brief already written; read the brief file, produce a plan, wait for approval before touching code.

## Mission
Upgrade deankeesey.com to Astro 6 (beta) + fix broken analytics stack (GA4 + Clarity + Pixel) + implement Astro CSP. Produce `docs/migrations/deankeesey-astro6-notes.mdx` as a committed deliverable usable as a migration pattern for other sites.

## Resource Ownership
- **OWNS (exclusive):** `~/Workspace/dk-sites/deankeesey-com` git repo
- **SHARES (concurrent):** N/A — solo session
- **DONE CRITERIA:** Tests green + build passes + analytics verified firing + MDX doc committed + pushed to main
- **CLEANUP ORDER:** 1st (solo)

## Critical Context

### Project Setup
- Working directory: `~/Workspace/dk-sites/deankeesey-com`
- Project CLAUDE.md: `~/Workspace/dk-sites/deankeesey-com/CLAUDE.md`
- **FULL BRIEF FILE (READ THIS FIRST):** `~/Workspace/dk-sites/deankeesey-com/ephemera/astro6-migration-prompt.md`
- Deployment: Cloudflare Pages only (Netlify was removed this session — no netlify.toml)
- Branch: main → auto-deploys to Cloudflare Pages on push

### Decisions Made & Why
- **Netlify removed:** All `netlify/` functions and `netlify.toml` deleted this session. `@netlify/functions` dep is stale — remove it.
- **ClientRouter already in use:** `src/layouts/RootLayout.astro` already imports and uses `<ClientRouter />` from `astro:transitions`. NOT `<ViewTransitions />`. So the v4→v5 migration already happened.
- **Analytics already direct (not Partytown):** `GTMAnalytics.astro` loads all scripts via `is:inline` directly — Partytown is NOT actively proxying analytics. The package is just stale in deps.
- **Astro 6 is beta (Jan 13, 2026):** Explicitly target Astro 6 beta OR present a plan with tradeoffs. Do NOT assume Astro 6 is stable.
- **Cloudflare Zaraz evaluated:** GA4 ✅ + FB Pixel ✅ native, Clarity ❌ (Custom HTML only, known bugs). Present as option in plan.

### What I Tried That Failed
- N/A — no failed approaches. This is a fresh execution session.

## Key Files

- `src/components/GTMAnalytics.astro` — **PRIMARY BUG HERE**
  ```astro
  <!-- THIS IS THE BUG: is:inline and src are mutually exclusive in Astro -->
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} is:inline></script>
  ```
  The `is:inline` directive tells Astro "don't process this script" but combined with an external `src`, it's contradictory and likely causes gtag.js to silently not load. This is the primary cause of the 20:1 GA4 vs Cloudflare analytics discrepancy.

- `src/layouts/RootLayout.astro` — ClientRouter is here, analytics component mounted here
  - Line 4: `import { ClientRouter } from 'astro:transitions';`
  - Line 31: `<ClientRouter />`
  - Lines 34-37: `<GTMAnalytics ga4Id={...} clarityId={...} />` — FB Pixel ID NOT passed

- `astro.config.mjs` — Partytown still configured with `forward` array, check if it intercepts anything
- `package.json` — `@astrojs/partytown`, `@netlify/functions` are stale deps to remove
- `public/scripts/analytics-tracking.js` — may or may not exist; `GTMAnalytics.astro` tries to load it

## Current State
- Astro: 5.17.1 (target: 6 beta or confirm plan)
- Analytics: BROKEN — gtag.js likely not loading due to `is:inline` + `src` bug
- GA4 discrepancy: ~20:1 vs Cloudflare (Cloudflare shows real traffic, GA4 near-zero)
- ClientRouter: in use, working
- Partytown: in deps, NOT actively used for analytics
- Netlify: fully removed
- Tests: none exist yet for analytics

## The Plan (To Be Produced)

The first thing you should do is output a plan covering these phases — DO NOT write code until the plan is approved:

1. **Fix analytics bug immediately** (the `is:inline` + `src` issue)
2. **Write Playwright tests** for analytics firing (TDD — tests must fail first on broken state)
3. **Evaluate Cloudflare Zaraz vs direct tags** — recommendation with tradeoffs
4. **Implement clean analytics** (GA4 + Clarity + Pixel)
5. **CSP implementation** using Astro's built-in mechanism
6. **Astro 6 upgrade** — or Astro 5 latest + Astro 6 readiness doc
7. **Remove stale deps** (partytown, @netlify/functions, etc.)
8. **Write docs/migrations/deankeesey-astro6-notes.mdx**

## Success Criteria
- [ ] GA4 events visible in GA4 DebugView after deployment
- [ ] Clarity recording sessions
- [ ] No CSP violations in browser console
- [ ] Playwright analytics tests passing
- [ ] `docs/migrations/deankeesey-astro6-notes.mdx` committed with before/after patterns
- [ ] `npm run build` passes with zero errors
- [ ] Pushed and deployed to Cloudflare Pages

## Traps & Gotchas

- **`is:inline` + `src`**: Never use both on the same `<script>` tag. For external scripts, omit `is:inline`. For inline scripts with `define:vars`, use `is:inline` only (no `src`).
- **`astro:page-load` timing**: The handler needs to be set up ONCE on initial page load, not re-registered on every navigation. Current implementation re-registers on every `page-load` event — check for listener accumulation.
- **Cloudflare Zaraz + Clarity**: Clarity has no native Zaraz integration. If Zaraz is chosen for GA4/Pixel, Clarity still needs a direct script tag.
- **Astro 6 is beta**: Do not deploy beta to production without a rollback plan. Consider a feature branch + preview deployment first.
- **Partytown `forward` array**: Even if Partytown isn't loading analytics, it might still be intercepting `dataLayer.push` calls due to the `forward` config. Check `astro.config.mjs`.
- **FB Pixel not wired**: `fbPixelId` prop exists in GTMAnalytics.astro but is not passed from RootLayout. Either wire it or remove the dead prop.
- **`public/scripts/analytics-tracking.js`**: The `useDetailedTracking` flag tries to load this file. Verify it exists or the script tag 404s silently.
- **Zod 4** (if upgrading to Astro 6): Content collections schemas may need migration if using Zod validators.
- **Node 22+** required for Astro 6: Check local Node version and Cloudflare Pages Node setting.

## Verification Commands

```bash
# Check current state
cd ~/Workspace/dk-sites/deankeesey-com
cat package.json | node -e "const p=require('/dev/stdin'); console.log('astro:', p.dependencies?.astro || p.devDependencies?.astro)"
node --version
cat astro.config.mjs
ls public/scripts/ 2>/dev/null || echo "no public/scripts dir"

# Dev server
npm run dev

# Build check
npm run build 2>&1 | tail -20

# Check for Partytown interception
grep -r "partytown\|forward" astro.config.mjs
```
