# deankeesey-com — Architecture Decision Log

> Point-in-time records of why architectural choices were made.
> Immutable entries. Superseding decisions reference prior ones.
> Template: `~/.claude/templates/DECISIONS.md`

---

## DECISION-001: Astro 5 Migration (4.4 → 5.17) (2026-02)
**Status:** Accepted
**Context:** Site was on Astro 4.4.0. Astro 5 introduced breaking changes to content collections, routing, and component APIs.
**Decision:** Migrate to Astro 5.17.1. Accept all breaking changes rather than pinning to v4.
**Considered options:**
- ✅ Migrate to Astro 5 — glob loader, `.id` over `.slug`, `ClientRouter`, Shiki built-in, forward compatibility
- ❌ Stay on Astro 4 — security debt accumulates, diverges from upstream patterns, delays inevitable migration
**Consequences:** Several breaking changes applied — see Anti-Patterns section in CLAUDE.md for full list. `src/content.config.ts` is at project root (not `src/content/config.ts`). Collections require explicit glob loader. `.slug` replaced by `.id` everywhere.

---

## DECISION-002: Direct Analytics Load, No Partytown/GTM (2026-02)
**Status:** Accepted — supersedes earlier Partytown approach
**Context:** Analytics (GA4, Clarity, FB Pixel) was loaded via Partytown (web worker proxying). View Transitions caused timing issues. Partytown added complexity without sufficient reliability benefit.
**Decision:** Remove Partytown and GTM. Load GA4, Clarity, and Pixel directly in `Analytics.astro`. No web worker proxying.
**Considered options:**
- ✅ Direct load via `Analytics.astro` — simpler, reliable with View Transitions, PostHog separate via `PostHog.astro`
- ❌ Partytown — timing issues with `astro:page-load` events, web worker adds indirection that breaks with CF Pages edge runtime. See `TOMBSTONES.md#PARTYTOWN_FOR_ANALYTICS`.
- ❌ GTM — extra layer of indirection, `is:inline` + `src` conflict risk, no meaningful benefit for single-dev site
**Consequences:** `Analytics.astro` is the single source of truth for all analytics. Must fire `gtag('config', ...)` on every `astro:page-load` for View Transitions. `send_page_view: false` on initial config to prevent double-fire.

---

## DECISION-003: Cloudflare Pages Only, Netlify Removed (2026-02)
**Status:** Accepted
**Context:** Site was deployed to both Cloudflare Pages and Netlify (redundant). Netlify added no value — CF Pages handles builds, CDN, Functions, and custom domains.
**Decision:** Remove Netlify. CF Pages is the sole deployment target.
**Considered options:**
- ✅ CF Pages only — single deploy pipeline, consistent with all other sites in this workspace, CF adapter for Astro SSR
- ❌ Keep both — dual deployment pipeline complexity, no actual redundancy benefit (different URLs, not failover)
**Consequences:** All routing, Functions, headers, and redirects in CF Pages config. Astro uses `@astrojs/cloudflare` adapter.

---
