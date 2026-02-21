---
title: "The Non-Determinism Defense"
description: "OpenAI and other model vendors are positioning to assert IP claims over AI-generated output. Here's the architectural argument for why that claim fails — and what you have to build for the defense to hold."
publishDate: 2026-02-20
tags: ["ai-infrastructure", "ip-strategy", "orchestration", "systems-architecture", "claude-code"]
readingTime: 6
author: "Dean Keesey"
---

# The Non-Determinism Defense

OpenAI is signaling an IP play.

The argument, still forming in legal briefs and terms-of-service revisions, goes roughly like this: the model produces the value, the model belongs to us, therefore we want a share of what the model produces inside your products. The mechanism varies — licensing terms, revenue sharing, restrictions on competing model use — but the direction is consistent.

If your company is building on raw model APIs, this should concern you.

There's a defense. It's architectural. And it starts with a property of LLMs that most people treat as a limitation.

---

## The Cloud of Possibilities

A language model, left to itself, is non-deterministic. Run the same prompt twice and you get different outputs. That's not a bug — it's fundamental to how transformer-based models work. Temperature, sampling strategy, token probabilities: the model is always drawing from a distribution, never specifying a single correct answer.

That non-determinism is also the foundation of the IP defense.

If the model cannot reliably produce a specific output — if the same input generates different results every time — then it cannot credibly claim to have *authored* any particular output. Authorship requires intent. Intent requires choice. A probability distribution is not making choices.

**Value requires choices. If the model isn't making them, someone else is.**

That someone else is you. Or it should be.

---

## Where the Value Actually Lives

Most AI deployments today look like this: application sends prompt → model returns text → application displays text. The model is doing most of the work. The application is a wrapper.

That's where the exposure is. When the model is doing most of the work, the vendor's argument has traction. Strip away the API call and what's left? A UI.

The defense requires building a layer where *your* choices are what produce the specific output. That means:

**Routing decisions.** Which model handles this request, and why? Assigning Claude Haiku to a summarization task and Claude Opus to a high-stakes architectural review isn't configuration — it's a cost-per-outcome judgment that belongs to you. The model can't make that call. You built the system that does.

**Context management.** What does the model see when it responds? Retrieval strategy, context window composition, memory architecture — these determine what "space of possibilities" the model is drawing from. The model is working with what you gave it.

**Verification loops.** Does the output pass your checks before it ships? A model that generates code is different from a system that generates code, runs tests, evaluates results, and routes failures back for retry. The second system is yours.

**Orchestration.** Multi-agent coordination — where one model's output becomes another model's input, with routing logic and state management in between — creates a chain of deliberate decisions that are entirely attributable to your architecture.

Each layer is a set of choices. Each choice is attributable to human authorship. The delta between "model output" and "system output" is where your IP lives.

---

## What This Looks Like in Practice

The stack I run daily wasn't designed with IP defense in mind — it was designed to make AI output reliably useful. But the two goals turn out to be the same.

The architecture has six layers:

```
┌─────────────────────────────────────────┐
│  HUMAN INTERFACE LAYER                  │
│  Visual design · session awareness ·    │
│  operator optimization                  │
├─────────────────────────────────────────┤
│  SESSION ORCHESTRATION                  │
│  tmux · fork/spawn · inter-session state│
├─────────────────────────────────────────┤
│  EVENT / HOOK LAYER                     │
│  82 hooks · lifecycle management ·      │
│  automated context capture · triggers   │
├─────────────────────────────────────────┤
│  COORDINATION LAYER                     │
│  coordination.db · work_items ·         │
│  multi-agent state · async job queues   │
├─────────────────────────────────────────┤
│  MODEL ROUTING                          │
│  Haiku / Sonnet / Opus ·                │
│  token economics · cost-per-outcome     │
├─────────────────────────────────────────┤
│  MODELS  (commodity input)              │
│  Claude · Gemini · GPT                  │
└─────────────────────────────────────────┘
```

The models are at the bottom. They're commodity input — the equivalent of electricity in a factory. No one claims to own the output of a factory because they supply the power.

The value is in the layers above: the routing logic, the hook system, the coordination database, the session orchestration, the human interface design. Every one of those layers is a deliberate engineering decision, traceable in git history, attributable to human authorship.

Default Claude Code has none of this. The delta between raw model output and output produced inside this stack is entirely attributable to the architecture — not the model.

---

## The Argument Holds Because the Choices Are Real

I want to be precise about what this is and isn't.

This isn't a legal hack. It's not a contractual workaround. The non-determinism defense works because it's structurally true: a model that can't reliably produce a specific output genuinely cannot claim authorship of one. The architecture doesn't manufacture that argument — it makes it hold by ensuring that the specific, reliable outcomes are products of deliberate human choices, not lucky draws from a probability distribution.

That means the architecture has to be real. Routing decisions that are actually made. Context management that actually shapes output. Verification that actually catches failures. If the "stack" is just a marketing slide, the defense is empty.

When the stack is real, the defense is solid. Every decision has a commit. Every layer has a rationale. The work is yours because the choices were yours.

---

## Building Defensible Infrastructure

The companies that will be exposed in the next IP cycle are the ones running raw API calls with thin wrappers. The companies that will be protected are the ones who built the orchestration layer — where the model is one input among many, not the source of value.

If you're building AI into a product, the infrastructure question isn't optional. It's the difference between renting capability from a vendor who can reprice it at will, and owning the system that produces value.

I build that layer. If you're working through this problem — or want infrastructure that creates clear, attributable value from the start — [let's talk](/contact).

The full architecture is at [deankeesey.com/ai-stack](/ai-stack).
