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

## DECISION-004: Explicit Project Screenshot for Portfolio Showcase (2026-03-06)
**Status:** Accepted
**Context:** The projects index page was falling back to a non-existent `og-default.jpg`, resulting in broken social media previews on LinkedIn and X.
**Decision:** Explicitly set the `og:image` to `/images/projects/masumi-hayashi-foundation-screenshot.png`.
**Considered options:**
- ✅ Specific Project Screenshot — Leading with a high-impact architectural screenshot directly supports the "AI Systems Builder" positioning for the case studies index.
- ❌ Creating a generic `og-default.jpg` — Deferred because site-wide fallbacks are less effective than tailored visual previews for high-value landing pages.
**Consequences:** The portfolio index now has a valid, specific social preview image. Other index pages still require explicit image definitions until a global fallback is created.

## DECISION-005: Practitioner-Led "Orchestration Architecture" for AI Workflow (2026-03-27)
**Status:** Accepted
**Context:** Claude Desktop's single-threaded nature creates a productivity bottleneck when complex development tasks require parallel research and execution.
**Decision:** Adopt an "Orchestration Architecture" where Claude Desktop serves as the strategic intelligence/orchestration layer, delegating focused execution tasks to parallel Claude Code agents.
**Considered options:**
- ✅ Orchestration Approach (Delegation Architecture) — enables parallel processing and maintains context across concurrent workstreams.
- ❌ Traditional Direct Execution — limited by single-threaded bottlenecks and high cognitive overhead during context-switching.
**Consequences:** Unlocks higher developer throughput for complex tasks but requires deliberate management of multiple agent states.
