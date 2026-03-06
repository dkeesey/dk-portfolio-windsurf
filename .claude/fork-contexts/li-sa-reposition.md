# LinkedIn SA Repositioning + Site Maintenance — Session Handoff

## Handoff Type
Continuation — Session productive but long, context heavy. LI rewrite in progress, site deployed.

## Mission
Complete LinkedIn profile SA repositioning using `job-search-2026/linkedin/profile-v2-ai-systems-builder.md` as source. Site work is deployed and passing.

## Resource Ownership

- **OWNS (exclusive):** `deankeesey-com` git repo, `job-search-2026/linkedin/` files
- **SHARES (concurrent):** N/A
- **DONE CRITERIA:** LinkedIn profile fully updated per v2.1 doc. All Featured links working with OG images.
- **CLEANUP ORDER:** 1st (solo session)

## Critical Context
### Project Setup
- Working directory: `/Users/deankeesey/Workspace/deankeesey-com`
- Project CLAUDE.md: `/Users/deankeesey/Workspace/deankeesey-com/CLAUDE.md`
- LinkedIn source doc: `/Users/deankeesey/Workspace/job-search-2026/linkedin/profile-v2-ai-systems-builder.md` (v2.1, updated 2026-03-05)
- job-search-2026 is now an Obsidian vault synced via iCloud (real files in iCloud, symlink at ~/Workspace/job-search-2026)
- Featured images copied to: `job-search-2026/linkedin-featured/` (3 PNGs)
- NanoBanana learnings: `~/.claude/projects/-Users-deankeesey-Workspace/memory/nanobanana-image-generation.md`

### Decisions Made & Why
- **4 case studies, not 5:** Dropped "AI Product Portfolio" — insufficient evidence (no user metrics, ClientEngineAI aspirational). Fewer cards with depth > more cards that don't hold up.
- **Masumi Hayashi as hero card:** Strongest CTO narrative, real metrics (30K+ visitors, 523 pages, 92% bot filtering, SFMOMA deadline).
- **"AI Systems Architect" not "AI Systems Builder":** "Architect" signals engineering rigor and enterprise credibility. "Builder" is less specific.
- **Internal links not external:** Case study cards link to `/projects/[slug]` detail pages, not external URLs. Keeps visitors on site, supports SA claims with depth.
- **Keep "When Platforms Hide Their Walls" article:** Rewritten to lead with Platform Defense Maturity Model framework. Emotional vulnerability removed, authenticity preserved. Experienced SAs read "been there", non-technical readers see the framework.
- **LinkedIn headshot retouched via NanoBanana:** Smoothed skin, added blazer, dark gradient background. Professional but not stiff.
- **Banner generated via NanoBanana:** Circuit-board topology, dark navy/cyan. 640x640 square cropped to 1584x396 via sips.

### What I Tried That Failed
- **NanoBanana aspect ratio params ignored through AG:** Always outputs 640x640 regardless of aspect_ratio field. Workaround: generate square, crop with sips.
- **iCloud symlink direction matters:** Symlink FROM Workspace TO iCloud = iCloud syncs the 43-byte pointer, not the files. Must be real files in iCloud, symlink back to Workspace.
- **LinkedIn "Add Education" wizard:** Skipping the recommendation step short-circuits the whole add. Must click + on Education section header directly.

## Key Files
- `src/pages/projects/*.astro` — 4 case study detail pages (all have OG images now)
- `src/components/sections/ProjectsGrid.tsx` — 4 projects, Masumi hero, internal links
- `src/components/sections/__tests__/projects-sa.test.tsx` — 19 SA positioning tests
- `src/components/sections/__tests__/projects-coherency.test.tsx` — 4 coherency tests
- `job-search-2026/linkedin/profile-v2-ai-systems-builder.md` — canonical LI source (v2.1)
- `~/Workspace/linkedin-banner-final.png` — LinkedIn banner (1584x396)
- `job-search-2026/photo/deankeesey_retouched_final.png` — retouched headshot

## Current State

**Site (DEPLOYED, ALL GREEN):**
- 48 tests passing, build clean, pushed to main, live on Cloudflare Pages
- 4 case study detail pages with OG images deployed
- All "Full Stack Developer" references replaced with "AI Systems Architect"
- Blog articles rewritten, hero images added
- Animation timings fixed (blobs 10-22s, timeline reveals faster)

**LinkedIn (IN PROGRESS):**
- ✅ Headline updated — "AI Systems Architect · Multi-Agent Orchestration · Enterprise Automation..."
- ✅ Banner uploaded — circuit-board topology
- ✅ Avatar uploaded — retouched headshot with blazer
- ✅ Open to Work — 5 SA-aligned titles (Solutions Architect, Staff System Engineer, Infrastructure Engineer, AI Software Engineer, AI Engineer)
- ✅ About section — new SA-aligned text pasted
- ✅ Education — Amherst College added
- ✅ Featured #1 added — "AI Systems Architecture — Case Studies" with image
- ⬜ Featured #2 — Multi-Agent Coordination case study link (URL now live)
- ⬜ Featured #3 — Platform Defense Maturity Model blog link (URL live)
- ⬜ Experience rewrites — New "AI Systems Architect — Independent" entry, Masumi title → "Fractional CTO & Founder", updated descriptions
- ⬜ Skills reorder — AI Systems Architecture to top
- ⬜ Contact info — remove clientengineai.com/spore.com, add deankeesey.com
- ⬜ Featured items should be Links (not Media uploads) — LinkedIn auto-pulls OG data from URL. Use https://www.linkedin.com/post-inspector/ to force re-scrape if OG image doesn't show.

## The Plan (Remaining Steps)

1. Help user add Featured #2 and #3 as Links (not Media)
2. Walk through Experience section rewrites — paste text from v2.1 doc
3. Skills reorder guidance
4. Contact info cleanup
5. Optional: LinkedIn Post Inspector to verify OG images pulling correctly
6. Optional: Architecture diagrams for case studies (D2 generation — discussed, not started)
7. Optional: Blog article "When to use n8n vs sh vs py" (discussed, not started)

## Success Criteria

- [ ] All 3 Featured links working with OG image thumbnails
- [ ] Experience section updated with SA-aligned descriptions
- [ ] Skills reordered (AI Systems Architecture at top)
- [ ] Contact info cleaned up

## Traps & Gotchas

- **LinkedIn Featured: Link vs Media** — Adding as "Link" auto-pulls OG data. Adding as "Media" just uploads a static image. User initially uploaded as Media.
- **LinkedIn OG cache** — LinkedIn caches OG data aggressively. Use https://www.linkedin.com/post-inspector/ to force re-scrape after deploying new OG tags.
- **NanoBanana always 640x640** — Don't waste time trying aspect ratio params. Generate square, crop with sips.
- **iCloud sync lag** — Files moved to iCloud take 1-2 min to appear on iPhone. Opening Files app on phone can trigger sync.
- **"Temporary" employment type** — User had this checked in Open to Work. Signals desperation. Should be unchecked.

## Verification Commands

```bash
# Verify site is deployed and OG images work
curl -s https://deankeesey.com/projects/multi-agent-coordination | grep 'og:image'
curl -s https://deankeesey.com/projects | grep 'og:image'

# Check all tests pass
cd /Users/deankeesey/Workspace/deankeesey-com && npx vitest run

# Verify LinkedIn source doc
cat /Users/deankeesey/Workspace/job-search-2026/linkedin/profile-v2-ai-systems-builder.md | head -5
```
