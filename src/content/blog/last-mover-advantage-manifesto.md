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

### The Enterprise Doom Loop

Every cut reduces redundancy. Every reduction makes remaining people more irreplaceable. But those people are also holding the domain knowledge the AI needs to work — the context, the edge cases, the "we tried that in 2019 and here's why it failed," the relationships that make the data mean something.

The enterprise is simultaneously:
- Cutting the people who hold the context the AI needs
- Asking the AI to perform without that context
- Wondering why the AI isn't delivering promised returns
- Cutting more headcount to compensate

Cut too soon and the AI hallucinates in your domain. The model doesn't know your contracts, your customers, your failure history, your regulatory exceptions. It knows everything except what makes your company *yours*.

**The enterprise can accidentally lobotomize itself.** The doom loop is dressed up as a transformation strategy.

### The Principal-Agent Trap

The employee's rational move and the company's rational move are opposite:

- **Employee logic**: My AI productivity is job security. I do more, faster, quietly. If I share it, I've trained my replacement.
- **Company logic**: Scale AI productivity across the org. Share the gains. Democratize the tools.

The company is asking employees to act against their own survival interest. The most capable operators — the ones who've actually figured it out — comply the least, because they have the most to lose.

Result: the best AI operators quietly carry 3x the load, become single points of failure, and the org thinks it has an AI strategy. It actually has 3 people holding it together.

### The Real Value Proposition (not what it sounds like)

Not: "I'll help the enterprise become more efficient." (That framing terrifies everyone.)

Not: "I'll help you survive the cuts." (Defensive, reactive.)

**The actual pitch to the people inside:**

> You've spent years becoming an expert in something real. That expertise is worth more now than it's ever been. I'll show you how to raise the sail.

The goal isn't survival. It's: **help them sit at the intersection of domain mastery and AI capability.** That person isn't replaceable. That person chooses their direction. The AI is the wind — it doesn't decide where to go, it doesn't know the rocks or the currents. The sailor with wind beats the sailor without wind every time. But a sail with no sailor just crashes.

### The Reframe That Changes Everything

The "AI will replace you" narrative — Altman, Amodei, the doomer discourse — is poisoning the well. It makes people hoard, hide, resist. It makes enterprise transformation fail before it starts.

**The true frame:** AI doesn't replace domain mastery. It multiplies it.

The person with 20 years of oncology workflow knowledge plus AI capability isn't replaced — they become superhuman. The AI is useless without the domain. The domain is slow without the AI. Together they're something that didn't exist before.

Wind doesn't replace the sailor. It never will.

---

*[Expand: the network hardware / Lindy effect analogy in depth]*
*[Expand: Microsoft/Salesforce specific examples — what they over-invested in]*
*[Expand: what "context-native stack" means as an architectural principle]*
*[Expand: deterministic scaffolding in practice — concrete examples]*
*[Expand: the oncology worker example — domain mastery + AI = superhuman]*
*[Expand: how this connects to The Hoarding Problem post]*
