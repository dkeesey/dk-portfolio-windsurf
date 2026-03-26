---
title: "Last Mover Advantage"
subtitle: "The architectural case for building second, building light, and building right"
status: seed
date: 2026-03-26
tags: [last-mover-advantage, ai-architecture, enterprise-ai, deterministic-systems]
---

## The Seed (captured 2026-03-26 — expand when ready)

### The Core Argument

First movers paid to figure out what the models couldn't do yet. Last movers build on what they can.

### The Cautionary Tales

- **Network security hardware**: Companies that installed 1st gen hardware at great expense are now stuck maintaining it until it earns back its cost. The early investment became a liability.
- **Microsoft & Salesforce**: Moved too fast, before value was proven. Didn't understand model tradeoffs well enough to know the cost of rearchitecting everything for AI. Now backpedaling — painfully and publicly.

### The Right Move (what Dean did instead)

Building with Claude 3.5+ meant:
- Light infrastructure that *supports* the model — not replaces it
- Knowledge management, /skills, /commands, /mcp, /hooks as the support layer
- Gradually tearing out what's in the way as model capabilities expand
- Choosing a stack the model can maintain context within — up and down
- Benefitting from model advances without rebuilding from scratch each time

### The Architectural Principle

**Deterministic scaffolding + non-deterministic execution.**

Build the typed interfaces, the clear APIs, the tests — the deterministic frame. Let the model handle the non-deterministic parts. Don't over-engineer what the model can do. Go fast where it's strong. Go deep where you have to.

### The Hidden Advantage

Not being deeply invested in 10-year-old engineering internals is a feature, not a gap. You can accept tradeoffs that a senior engineer defending sunk-cost knowledge cannot. You can go fast where it's possible. You can go deep where it matters. You're not protecting anything.

### The Byline Candidates

- "Building on what the models can do today — not defending what engineers had to internalize ten years ago."
- "The architectural case for building second, building light, and building right."

---

*[Expand: the network hardware / Lindy effect analogy in depth]*
*[Expand: Microsoft/Salesforce specific examples — what they over-invested in]*
*[Expand: what "context-native stack" means as an architectural principle]*
*[Expand: deterministic scaffolding in practice — concrete examples]*
*[Expand: how this connects to The Hoarding Problem post]*
