# deankeesey-com — Dead Ends Index

> Load before proposing anything architectural.
> Append-only. One entry per failed path.
> Template: `~/.claude/templates/TOMBSTONES.md`

---

## PARTYTOWN_FOR_ANALYTICS (2026-02)
**Tried:** Partytown (web worker proxying) to offload GA4, FB Pixel, and Clarity from the main thread.
**Result:** Analytics events inconsistently fired. `astro:page-load` events from View Transitions didn't reliably reach the worker. Data gaps in GA4.
**Root constraint:** Partytown proxies script execution through a web worker via `postMessage`. Astro's View Transitions fire DOM events synchronously; by the time Partytown relays them to the worker and back, the page context may have already changed. The timing mismatch is inherent to the worker communication model, not fixable with configuration.
**Chose instead:** Direct analytics load in `Analytics.astro`. See `DECISIONS.md#DECISION-002`.
**Do not revisit unless:** Partytown adds explicit View Transitions / client-side routing support.

---

## GA4_REQUESTIDLECALLBACK_DEFER (2026-02)
**Tried:** Loading `gtag.js` deferred via `requestIdleCallback` to improve page load performance scores.
**Result:** ~96% GA4 hit loss. Most page views not recorded.
**Root constraint:** `requestIdleCallback` fires only when the browser is idle. Users who navigate quickly (within 1-2 seconds of page load) never trigger the idle callback, so gtag never loads and the page view is never recorded. On a portfolio/blog with fast scanners, this dropped >95% of hits.
**Chose instead:** Standard `<script async src="...gtag/js">` load. Async doesn't block render but fires immediately, not conditionally.
**Do not revisit unless:** The performance gain from deferring is critical AND the audience is known to dwell long enough on each page for idle to fire.

---

## IS_INLINE_SRC_COMBO (2026-02)
**Tried:** `<script is:inline src="/scripts/analytics-tracking.js">` to include an external analytics file.
**Result:** Script never loaded. No console error. 20:1 discrepancy between GA4 and Cloudflare analytics (Cloudflare counts raw requests; GA4 saw almost nothing).
**Root constraint:** In Astro, `is:inline` and `src` are mutually exclusive by design. The build pipeline drops `src` silently when `is:inline` is present. No warning, no error — the script tag renders in HTML without the `src` attribute.
**Chose instead:** `<script async src="...">` (no `is:inline`) for external scripts. `<script is:inline>` (no `src`) for inline code.
**Do not revisit unless:** Astro changes this behavior (tracked but not prioritized upstream).

---
