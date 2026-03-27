# deankeesey.com Blog Posts — Session Handoff

## Handoff Type
Continuation — session wound down after shipping case studies + compliance section; handing off remaining blog content work

## Mission
Complete the Last Mover Advantage blog: expand 2 draft seeds into full posts, and voice-check/rewrite 2 existing posts that are in tutorial voice rather than practitioner voice.

## Resource Ownership

- **OWNS (exclusive):** `~/Workspace/deankeesey-com` git repo
- **SHARES (concurrent):** N/A — solo session
- **DONE CRITERIA:** All 4 blog posts in practitioner voice, `draft: false` (or left as draft if not ready), tests passing, pushed to main
- **CLEANUP ORDER:** 1st (solo session)

## Critical Context

### Project Setup
- Working directory: `/Users/deankeesey/Workspace/deankeesey-com`
- Project CLAUDE.md: `/Users/deankeesey/Workspace/deankeesey-com/CLAUDE.md` — READ FIRST (Astro 5, CF Pages, positioning notes)
- Dev: `npm run dev -- --port 4321`
- Test: `npm run test:run` (46/46 must pass)
- Build: `npm run build`
- Deploy: push to main → GitHub Actions → CF Pages (Node 20, now fixed)

### Blog schema (STRICT — missing fields = broken CI)
```
title: "..."
description: "..."
publishDate: 2026-XX-XX
tags: [...]
readingTime: N
author: "Dean Keesey"
draft: true   # omit or set false to publish
```

### Decisions Made & Why
- **Practitioner voice, not tutorial voice**: The reader is a technical CTO or senior engineer, not a beginner. Name the failures. Concrete > abstract. No "leveraging," "robust," "cutting-edge," "seamlessly."
- **Open with specific problem, not general AI commentary**: Don't start with "AI is changing everything." Start with the actual problem that drove the work.
- **Name the pattern or insight**: Each post should have a named concept (e.g., "Cowboy Coordination," "Last Mover Advantage") — something the reader can take away and reference.
- **End with implications beyond the specific use case**: The failure story matters, but so does what it means for similar systems.
- **Draft seeds are `draft: true`**: The two seeds already have this. Keep it until the post is actually done.
- **TaskMaster is history**: Don't reference it as current — it was a tool that became unnecessary when Claude's native task decomposition matured. Already handled in multi-agent-orchestration-benefits.md.

### What I Tried That Failed
- N/A this session — the blog rewrite of multi-agent-orchestration-benefits.md was successful; use that as the voice reference.

## Key Files

### Blog posts to work on:

1. **`src/content/blog/last-mover-advantage-manifesto.md`** — Rich seed already. Has all the arguments: enterprise doom loop, principal-agent trap, wind/sailor metaphor, deterministic scaffolding + non-deterministic execution. Needs to be expanded into a full publishable post. The core argument: "First movers paid to figure out what the models couldn't do yet. Last movers build on what they can." Currently `draft: true`.

2. **`src/content/blog/the-hoarding-problem.md`** — Seed exists but is likely thin. The hoarding problem = employees who've figured out AI productivity hoard it as job security, because sharing it means training your replacement. Connects to the principal-agent trap in the manifesto. Currently `draft: true`. Read it first — content may be sparse.

3. **`src/content/blog/breaking-claude-desktop-bottleneck.md`** — 266 lines, exists, published (no draft flag). Describes the multi-agent coordination breakthrough. MAY need voice revision — check if it opens with specific problem or generic AI commentary, check if it names the failure that led to the solution, check if the tone is practitioner vs tutorial. May be fine as-is.

4. **`src/content/blog/cli-first-ai-workflows.md`** — 340 lines, exists, published. "CLI-First AI Workflows: Why Simple Beats Complex." MAY need voice revision — the title sounds like it's making an argument, which is good. Check opening and tone. May be fine as-is.

### Reference: the voice is RIGHT in this file (use as template):
- `src/content/blog/multi-agent-orchestration-benefits.md` — just rewritten this session with the correct practitioner voice. Read it before touching the others.
- `src/content/blog/the-non-determinism-defense.md` — also good voice, published.

### Source material for the two seeds:
- The `last-mover-advantage-manifesto.md` seed itself has all the raw material — it just needs to be turned into a post structure with an opening problem, failure story, named insight, and implications.
- For the hoarding problem, the principal-agent trap section in the manifesto seed is directly relevant.

## Current State

**Shipped this session (committed + pushed, CI green):**
- ✅ 3 case study pages: prometheus-careers.astro, prettify-ai.astro, clientengine-ai.astro
- ✅ ProjectsGrid reordered + internal links + unifying passage + WeasyPrint fix
- ✅ ai-stack.astro "Built for Auditability" compliance section
- ✅ multi-agent-orchestration-benefits.md fully rewritten (practitioner voice, SQLite story)
- ✅ CI fixed: Node 18→20 in deploy.yml
- ✅ All tests passing (46/46)

**Pending (this session's work):**
- ❌ last-mover-advantage-manifesto.md — needs expansion from seed to full post
- ❌ the-hoarding-problem.md — needs expansion from seed to full post
- ❌ breaking-claude-desktop-bottleneck.md — needs voice audit, possible rewrite
- ❌ cli-first-ai-workflows.md — needs voice audit, possible rewrite

## The Plan (Remaining Steps)

1. Read `src/content/blog/the-hoarding-problem.md` — assess how much content exists
2. Read `src/content/blog/breaking-claude-desktop-bottleneck.md` and `cli-first-ai-workflows.md` — voice audit against the reference
3. Expand `last-mover-advantage-manifesto.md` into full post using the seed material. Keep `draft: true` until done. The seed has: core argument, enterprise doom loop, principal-agent trap, wind/sailor metaphor, deterministic scaffolding framing. All of this is usable — structure it into a readable post.
4. Expand `the-hoarding-problem.md` — may need to cross-reference manifesto seed for the principal-agent trap content.
5. Voice-check and revise `breaking-claude-desktop-bottleneck.md` if needed.
6. Voice-check and revise `cli-first-ai-workflows.md` if needed.
7. `npm run test:run` — confirm 46/46 still passing
8. `npm run build` — confirm clean
9. Commit and push

## Success Criteria

- [ ] `last-mover-advantage-manifesto.md` is a full readable post (can stay `draft: true` if not ready to publish)
- [ ] `the-hoarding-problem.md` is a full readable post
- [ ] `breaking-claude-desktop-bottleneck.md` and `cli-first-ai-workflows.md` are in practitioner voice
- [ ] 46/46 tests passing
- [ ] Build clean, pushed

## Traps & Gotchas

- **Blog schema is strict**: `title`, `description`, `publishDate`, `tags`, `readingTime`, `author` all required. Missing any = broken build. `draft: true` hides from index; omitting it publishes. Check schema before saving.
- **Don't invent metrics or failures**: Only use what you can source from the actual experience described in the seeds or from the DECISIONS/TOMBSTONES files in the repos. The manifesto seed has a lot of real content — use it.
- **The manifesto seed ends with expansion notes**: Lines starting with `*[Expand: ...]` — these are the author's own notes about what to develop. Use them as a roadmap, not as content.
- **Two hero components**: `HeroSection.tsx` (unused) and `HeroSectionVibe.tsx` (active) — not relevant to blog work but noted for reference.
- **The voice reference**: Read `multi-agent-orchestration-benefits.md` before writing. It's the most recent example of the correct tone.

## Verification Commands

```bash
# Run tests
cd ~/Workspace/deankeesey-com && npm run test:run

# Build check
cd ~/Workspace/deankeesey-com && npm run build

# Check CI after push
cd ~/Workspace/deankeesey-com && gh run list --limit 3

# Read the voice reference first
cat ~/Workspace/deankeesey-com/src/content/blog/multi-agent-orchestration-benefits.md

# Read the seeds
cat ~/Workspace/deankeesey-com/src/content/blog/last-mover-advantage-manifesto.md
cat ~/Workspace/deankeesey-com/src/content/blog/the-hoarding-problem.md
```
