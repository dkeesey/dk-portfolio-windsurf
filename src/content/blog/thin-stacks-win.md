---
title: "Why AI Can't Predict WordPress Behavior (And Why That Matters)"
description: "WordPress core doesn't fit in LLM context windows. Multiple abstraction layers create unpredictable runtime behavior. The complexity cost compounds with every task."
publishDate: 2025-01-06
tags: ["AI", "WordPress", "Astro", "development", "context-windows"]
image: "/images/blog/thin-stacks-win.png"
author: "Dean Keesey"
---

# Why AI Can't Predict WordPress Behavior (And Why That Matters)

Last month, Lee Robinson (VP of Product at Vercel) deleted his $56,000 headless CMS and moved to markdown files. Most analysis focused on "simplicity" or "modern workflows."

They missed the real issue: **LLMs can't predict WordPress behavior because it doesn't fit in their context window.**

Here's why that matters and what the actual numbers show.

## The Context Window Problem

**Claude Sonnet 4.5 context window:** 200,000 tokens

**WordPress 6.x core PHP code:** ~3.5MB
**Estimated tokens:** ~875,000 tokens (assuming 4 bytes per token)

**A typical Astro site I build:** ~400KB of source code
**Measured tokens:** ~100,000 tokens (measured from megangredesky.com)

**WordPress core alone is 4.3x larger than Claude's entire context window.**

This isn't about preferences or aesthetics. When the codebase exceeds the context window, the LLM cannot see the full system. It must reason about behavior it cannot directly observe.

## What Happens When Code Doesn't Fit

**When WordPress doesn't fit in context:**

1. **The model can't predict what will happen**
   - Can't see all 2,894 action hooks and 3,214 filter hooks
   - Doesn't know which plugins modify behavior
   - Can't track database schema changes
   - Can't verify function dependencies

2. **The model writes defensive code**
   ```php
   // AI must guard against uncertainty
   if (function_exists('the_content')) {
       $content = apply_filters('the_content', $post->post_content);
       // But which filters run? In what order?
       // AI can't see the full chain
   }
   ```

3. **The model is imprecise**
   - Suggests generic solutions: "check WordPress docs"
   - Can't reference specific hook names with confidence
   - Misses database fields because schema isn't visible
   - Proposes changes that work in isolation but break in production

**When Astro fits in context:**

1. **The model sees the entire system**
   - All components visible
   - All content structure visible
   - Build process fully defined
   - No hidden runtime behavior

2. **The model writes precise code**
   ```typescript
   // AI knows exactly what exists
   import { BlogPost } from '@/components/BlogPost'
   // AI knows this component's props
   // AI knows where it's used
   // AI predicts build output accurately
   ```

3. **The model references specifics**
   - Exact file paths
   - Actual function signatures
   - Real component names
   - Verifiable imports

## The Abstraction Layer Problem

**WordPress local development stack:**

1. Docker container (runtime abstraction)
2. MySQL database in container (state AI can't observe)
3. wp-cli (command abstraction over PHP)
4. WordPress core (too large for context)
5. Active plugins (behavior modifiers)
6. Theme functions (more hooks/filters)
7. Dev vs production differences (environment variance)

**Each layer adds uncertainty the AI must reason through:**
- What's the current database state?
- How will Docker execute this?
- Will wp-cli behave like direct PHP?
- Which plugins are active right now?
- How does dev differ from production?

**The AI cannot observe most of these layers directly.**

**Astro development stack:**

1. Source code (fits in context)
2. Static build (deterministic)
3. Output HTML (predictable)

**The AI sees all three layers. No hidden state.**

## The Compounding Cost

Here's what makes this worse: **The complexity cost compounds with every task.**

**WordPress development:**
- Task 1: Add blog post → 5 iterations (reasoning through Docker + DB + hooks + plugins)
- Task 5: Update CSS → Still 5 iterations (same abstraction stack every time)
- Task 10: Fix bug → Still 5 iterations (AI doesn't learn, system is non-deterministic)

**The cost never decreases because:**
- Database state changes between operations
- Plugin behavior isn't predictable
- Docker container state varies
- Environment differences persist
- **System is non-deterministic → AI can't learn patterns**

**Astro development:**
- Task 1: Add blog post → 3 iterations
- Task 5: Update CSS → 2 iterations (AI learned component patterns)
- Task 10: Fix bug → 1 iteration (AI knows the system)

**The cost decreases because:**
- Same markdown produces same output
- No database state to track
- No container variance
- Build is deterministic
- **System is predictable → AI learns and improves**

## Real Example: Update 15 Blog Posts

**Client request:** "Add new office address to all blog posts"

**WordPress workflow:**
1. AI proposes: Query posts via WP_Query
2. Test in Docker environment
3. Doesn't work (forgot to handle custom post meta)
4. AI proposes: Add meta query
5. Test again
6. Partially works (plugin modifies meta on save)
7. AI proposes: Bypass plugin with direct DB update
8. Test again
9. Works but cache not cleared
10. AI proposes: Add wp_cache_flush()

**Total iterations:** 10 attempts
**Time:** 2 hours
**Why:** AI can't predict plugin behavior, database schema, or cache layers

**Astro workflow:**
1. `grep -r "old address" content/blog/`
2. AI edits 15 markdown files
3. Build runs
4. Done

**Total iterations:** 1 attempt
**Time:** 10 minutes
**Why:** AI sees all markdown files, knows build is deterministic

## This Isn't About WordPress Being Bad

WordPress solved real problems in 2005:
- Non-technical users needed GUIs
- Dynamic content required databases
- Plugins enabled extensibility

Those were the right solutions for that era.

**The problem is:** WordPress was architected for human developers using GUIs, not for LLMs with 200K token context limits.

In 2025, when your pair programmer is an LLM:
- Context window size matters
- Abstraction layers create prediction failures
- Non-deterministic systems prevent learning
- The complexity cost compounds with every task

## The Numbers

**WordPress + Docker + plugins:**
- Core: ~875K tokens (4.3x over context limit)
- Abstraction layers: 7 (Docker, DB, CLI, core, plugins, theme, env)
- System determinism: Low (database + container + plugin state varies)
- AI learning curve: Flat (can't learn non-deterministic system)
- Iteration cost per task: Constant (complexity never decreases)

**Astro site:**
- Total: ~100K tokens (fits in 50% of context)
- Abstraction layers: 1 (source code → build → output)
- System determinism: High (same input = same output)
- AI learning curve: Positive (learns patterns, improves over time)
- Iteration cost per task: Decreasing (gets faster with each task)

## What This Means

**The question isn't "Should I use WordPress?"**

The question is: **"Can my LLM see enough of my system to predict behavior accurately?"**

If your codebase:
- Exceeds context window limits
- Has multiple abstraction layers the LLM can't observe
- Includes non-deterministic runtime behavior (databases, containers, plugins)

Then your AI pair programmer will be:
- Imprecise (defensive code, generic suggestions)
- Slow (more iterations to get it right)
- Non-learning (can't improve because system is unpredictable)

**And the cost will compound with every piece of work.**

---

*Dean Keesey builds websites for therapy practices. After migrating three sites from WordPress to Astro, measured iteration counts dropped 12x (2 hours → 10 minutes for batch updates). The difference: AI can see the entire system.*
