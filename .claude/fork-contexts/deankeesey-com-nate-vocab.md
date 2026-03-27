# deankeesey.com — Nate B Jones Vocabulary Update

## Handoff Type
Continuation — LinkedIn vocabulary update complete, now applying the same Nate B Jones 7-skill framework to deankeesey.com

## Mission
Update deankeesey.com so hiring managers pattern-matching against Nate's 7 skill labels find the right vocabulary on the site. LinkedIn is done. The site needs the same treatment.

## Resource Ownership

- **OWNS (exclusive):** `~/Workspace/deankeesey-com` git repo
- **SHARES (concurrent):** N/A — solo session
- **DONE CRITERIA:** Nate's 7 skill labels surface naturally in site copy (ai-stack, projects, about/hire pages), tests passing, pushed to main
- **CLEANUP ORDER:** 1st (solo session)

## Critical Context

### Project Setup
- Working directory: `/Users/deankeesey/Workspace/deankeesey-com`
- Project CLAUDE.md: `/Users/deankeesey/Workspace/deankeesey-com/CLAUDE.md` — READ FIRST
- Dev: `npm run dev -- --port 4321`
- Test: `npm run test:run` (46/46 must pass)
- Deploy: push to main → GitHub Actions → CF Pages (Node 20)

### The Nate B Jones Framework (SOURCE OF TRUTH)
From: `src/content/blog/ephemera/nate-b-jones-transcript.md` — READ THIS

The 7 skills hiring managers are now searching for (derived from actual job postings):

1. **Specification Precision** — writing unambiguous agent instructions; technical writing for machines
2. **Evaluation and Quality Judgment** — most-cited skill; resisting fluency-as-correctness; eval harnesses
3. **Task Decomposition / Agent Delegation** — planner/subagent patterns; sizing work to the harness
4. **Failure Pattern Recognition** — context degradation, spec drift, sycophantic confirmation, tool selection errors, cascading failure, silent failure
5. **Trust and Security Design** — blast radius, reversibility, human-in-the-loop placement, verifiability
6. **Context Architecture** — most in-demand; "Dewey decimal system for agents"; companies pay almost anything for this
7. **Cost and Token Economics** — model selection for ROI, blended cost modeling; high school math, senior architect pay

### Mapping: Dean's Work → Nate's Labels

| Nate Label | Dean's Actual Work |
|------------|-------------------|
| Context Architecture | Bundle system, CLAUDE.md hierarchy, coordination.db |
| Cost and Token Economics | Haiku/Sonnet/Opus model assignment strategy (40-60% cost reduction) |
| Failure Pattern Recognition | TOMBSTONES.md, Ralph loop, exit-prep, cowboy coordination discovery |
| Task Decomposition / Agent Delegation | Multi-agent orchestration, planner/subagent architecture |
| Specification Precision | CLAUDE.md system prompts, MCP tool descriptions, hook specifications |
| Trust and Security Design | destructive-command-safety.sh, blast radius thinking, .claudeignore, pre-commit hooks |
| Evaluation and Quality Judgment | Playwright tests, verification protocols, vitest suite, build checks |

### What LinkedIn Already Has (DO NOT REDO)
LinkedIn is fully updated as of 2026-03-27:
- Headline: "AI Systems Architect · Agentic AI · Context Architecture · Multi-Agent Orchestration..."
- About: New paragraph with context architecture, failure pattern recognition, cost/token economics
- Skills: Context Architecture (top), Cost and Token Economics, Failure Pattern Recognition, Specification Precision, Agentic AI Development
- Experience: "Cost and token economics" bullet in AI Systems Architect role

### Decisions Made & Why
- **Vocabulary-first, not content-first**: Don't rewrite everything — surgically add the labels where they're missing. The work is already described correctly; it just doesn't use the search terms.
- **Practitioner voice required**: Don't add buzzword soup. The terms need to appear in context that makes them credible. "Context architecture" should appear in a sentence that explains what it means, not just listed.
- **ai-stack.astro is the highest-value target**: It already maps stack layers to compliance value. It should also map to the Nate 7 skill labels — same page, different audience frame.
- **Don't touch blog posts**: 4 posts were rewritten this session (multi-agent-orchestration-benefits, breaking-claude-desktop-bottleneck, cli-first-ai-workflows, last-mover-advantage-manifesto, the-hoarding-problem). They're done.

### What I Tried That Failed
- N/A — no failed approaches. LinkedIn update was clean.

## Key Files

### Primary targets:
- `src/pages/ai-stack.astro` — Stack page. Already has compliance section. Add Nate vocabulary framing. This is the most important page for the vocabulary update.
- `src/pages/hire.astro` — Hire/contact page (if it exists). Should surface the skill labels.
- `src/components/sections/ProjectsGrid.tsx` — Project cards. May need vocabulary update in descriptions.
- `src/pages/projects/multi-agent-coordination.astro` — Case study. Should reference context architecture, failure pattern recognition explicitly.

### Reference files (don't modify):
- `src/content/blog/multi-agent-orchestration-benefits.md` — Voice reference, already in practitioner voice
- `/Users/deankeesey/Workspace/deankeesey-com/ephemera/nate-b-jones-transcript.md` — Full transcript + career positioning notes

### Job search context (don't modify, just awareness):
- `/Users/deankeesey/Workspace/job-search-2026/linkedin/profile-current-state.md` — Updated this session

## Current State

**Done this session:**
- ✅ Blog posts: last-mover-advantage-manifesto.md expanded to full post
- ✅ Blog posts: the-hoarding-problem.md expanded to full post
- ✅ Blog posts: breaking-claude-desktop-bottleneck.md rewritten to practitioner voice
- ✅ Blog posts: cli-first-ai-workflows.md voice-revised
- ✅ LinkedIn: All 4 updates live (headline, about, skills, experience bullet)
- ✅ Anthropic partner application submitted via Masumi Hayashi Foundation
- ✅ Nate B Jones transcript saved to ephemera/
- ✅ 46/46 tests passing, build clean, pushed

**Pending:**
- ❌ deankeesey.com vocabulary update (the actual task for this session)
- ❌ Two draft blog posts (last-mover, hoarding-problem) — user needs to review and decide to publish

## The Plan (Remaining Steps)

1. **Read** `src/pages/ai-stack.astro` — understand current structure
2. **Read** `src/pages/hire.astro` or equivalent — check what's there
3. **Audit** `src/pages/projects/multi-agent-coordination.astro` — check vocabulary gaps
4. **Update ai-stack.astro** — add Nate vocabulary to the stack layer descriptions. The "Built for Auditability" section already maps layers to compliance. Add a parallel framing that maps to the 7 skill labels. OR weave the vocabulary into existing descriptions naturally.
5. **Update hire page** — surface the 7 skill labels in context (not a list, but naturally in the copy)
6. **Update ProjectsGrid.tsx** — check card descriptions for vocabulary gaps
7. **Update multi-agent-coordination case study** — ensure "context architecture" and "failure pattern recognition" appear explicitly
8. `npm run test:run` — confirm 46/46
9. `npm run build` — confirm clean
10. Commit and push

## Success Criteria

- [ ] "Context Architecture" appears naturally in site copy (not just a skills list)
- [ ] "Failure Pattern Recognition" appears in the multi-agent case study
- [ ] "Cost and Token Economics" appears somewhere (ai-stack or case study)
- [ ] "Agentic AI" appears in hero/about copy
- [ ] 46/46 tests passing
- [ ] Build clean, pushed

## Traps & Gotchas

- **Don't add a "7 Skills" section**: That's a LinkedIn recruiter move, not practitioner voice. The vocabulary should appear in context, not as a labeled list.
- **ai-stack.astro has two separate audiences now**: compliance (NIST/EO14028/FedRAMP framing added last session) and AI hiring managers (Nate vocabulary). Don't collapse them — they can coexist in the same page if they each speak to their audience.
- **Blog schema is strict**: `title`, `description`, `publishDate`, `tags`, `readingTime`, `author` all required. Don't touch blog files without checking.
- **Two hero components**: `HeroSectionVibe.tsx` (active) and `HeroSection.tsx` (unused). Don't confuse them.
- **Tests check specific copy**: sa-positioning.test.tsx and sa-coherency.test.tsx check hero and positioning copy. If you change hero copy, run tests immediately.
- **The draft posts**: `last-mover-advantage-manifesto.md` and `the-hoarding-problem.md` are `draft: true`. Don't auto-publish — user needs to review first.

## Job Search Context (Awareness Only)

Active pipeline as of 2026-03-27:
- **Thomson Reuters**: Recruiter led with $150/hr — waiting to hear back. HIGH PRIORITY.
- **Anthropic SA for Creatives & Institutions**: Applied directly. Also submitted partner application via Masumi Hayashi Foundation. Follow-up email sent to partner-support@anthropic.com.
- **Claude Certified Architect cert**: $99 after partner access confirmed. Study: "Building with the Claude API" course on Anthropic Academy (Skilljar). Exam domains: Agentic Architecture (27%), Claude Code Config (20%), Prompt Engineering (20%), Tool Design/MCP (18%), Context Management (15%).
- **Qualizeal/OTB Tech**: Passed. $90 1099, sloppy recruiter, below floor.

## Verification Commands

```bash
cd ~/Workspace/deankeesey-com && npm run test:run
cd ~/Workspace/deankeesey-com && npm run build
cd ~/Workspace/deankeesey-com && gh run list --limit 3
```
