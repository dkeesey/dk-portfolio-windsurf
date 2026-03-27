---
title: "Last Mover Advantage"
description: "The architectural case for building second, building light, and building right — why the organizations that get AI right are rarely the first ones in."
publishDate: 2026-03-26
tags: [last-mover-advantage, ai-architecture, enterprise-ai, deterministic-systems]
draft: true
readingTime: 8
author: "Dean Keesey"
---

# Last Mover Advantage

The boards that approved AI transformation initiatives in 2023 are now looking at results that don't match projections. Some are cutting harder. Some are concluding the models don't work. A few are starting to understand what actually went wrong.

The mistake wasn't moving too slowly. It was moving before the models were ready — and building infrastructure sized to compensate for what they couldn't do.

---

## The Doom Loop

Every enterprise AI rollout starts the same way: identify the low-hanging fruit, automate the repetitive tasks, reduce headcount to capture the savings.

The problem is the sequencing. Every cut reduces redundancy. Every reduction makes the remaining people more irreplaceable. But those people are also the ones holding the domain knowledge the AI needs to work — the context, the edge cases, the "we tried that in 2019 and here's why it failed," the customer relationships that make the data mean something.

The enterprise ends up simultaneously:
- Cutting the people who hold the context the AI needs
- Asking the AI to perform without that context
- Wondering why the promised returns aren't materializing
- Cutting more headcount to compensate

The model doesn't know your contracts, your customers, your regulatory exceptions, your failure history. It knows everything except what makes your company *yours*. Cut the people who hold that before the model has it, and you've accidentally lobotomized the organization. The transformation strategy becomes the doom loop.

---

## The First-Mover Tax

The other version of the mistake is the enterprise that moved fast and built big. Custom AI middleware. Enterprise copilot rollouts sized for model limitations that no longer exist. Entire teams dedicated to prompt engineering for systems that would be obsolete within a release cycle.

First movers paid to figure out what the models couldn't do yet. They paid in integration work, in custom tooling, in architecture decisions sized to compensate for capability gaps that closed in the next generation. That investment doesn't disappear when the models improve — it becomes a liability. You can't easily rearchitect when the scaffolding is load-bearing.

Microsoft and Salesforce moved before the value was proven. Before the model tradeoffs were understood well enough to know the cost of rebuilding everything around AI. The commitments got made when the trajectory was clearer than the destination. Now the backpedaling is expensive and public.

The Lindy effect runs backwards for early enterprise AI: the investments that need to survive longest are the ones that were built to compensate for limitations that have since been solved. The hardware installed in the first generation is still there. So is the organizational debt.

Last movers get to skip the tuition.

---

## The Principal-Agent Trap

Inside these organizations, there's a parallel problem that makes the transformation harder.

The employee's rational move and the company's rational move are opposite.

The company wants to scale AI productivity: share the gains, democratize the tools, multiply the output across the org. But the employee who has actually figured it out — who is quietly doing in 20 minutes what used to take a day — has a different calculation. Share it, and the "special" status evaporates. Demonstrate the leverage, and you've made the case for reducing headcount in your role. Teach your colleagues, and now you're competing with people who have the same tools and more institutional context.

So the most capable operators comply least. They carry 3x the load quietly. They become single points of failure. And the organization thinks it has an AI strategy. It actually has three people holding it together.

The transformation fails before it starts because the incentive structure guarantees it.

---

## The Frame That Fixes It

The "AI will replace you" narrative — the doomer discourse, the breathless predictions about which roles disappear first — is poisoning the well. It turns every transformation initiative into a siege. Everyone digs in.

The true frame is different: **AI doesn't replace domain mastery. It multiplies it.**

The person with 20 years of oncology workflow knowledge plus AI capability isn't replaced — they become something that didn't previously exist. The model is useless without the domain. The domain is slow without the model. Together they're superhuman.

Wind doesn't replace the sailor. A sail with no one at the helm crashes. The sailor with wind beats the sailor without wind every time. But you still need to know the rocks and the currents. The AI is the wind — it doesn't decide where to go. The person with domain mastery does.

That's the pitch that doesn't terrify people. You've spent years becoming an expert in something real. That expertise is worth more now than it's ever been. I'll show you how to raise the sail.

The goal isn't survival. It's sitting at the intersection of domain mastery and AI capability. That person isn't replaceable. That person chooses their direction.

---

## The Architectural Principle

The last-mover advantage isn't just organizational. It's architectural.

Building on capable models means building light infrastructure that *supports* the model — not infrastructure that compensates for what it can't do. The pattern is: **deterministic scaffolding + non-deterministic execution.**

Build the typed interfaces, the clear APIs, the tests — the deterministic frame. Let the model handle the non-deterministic parts. Don't over-engineer what the model can do. Go fast where it's strong. Go deep where you have to.

This means choosing a stack the model can maintain context within, top to bottom. It means gradually tearing out what's in the way as model capabilities expand rather than defending sunk-cost investments. It means the people building in this frame benefit from every model advance without rebuilding from scratch each time.

Not being deeply invested in 10-year-old engineering internals is a feature, not a gap. The engineer defending sunk-cost knowledge can't accept certain tradeoffs. The last mover can. You're not protecting anything.

---

## What This Looks Like

The organizations that get AI right are almost never the first ones in. They watch the first movers discover what doesn't work. They build on what the models can actually do. They structure the engagement so domain mastery is preserved and amplified rather than cut and replaced.

The knowledge exists in the first movers' failures. The infrastructure is lighter. The models are stronger. The people who held the domain are still there — or if they're not, the organization has a problem no amount of AI will fix.

The window for last-mover advantage is open right now. The first movers' expensive mistakes are well-documented. The models are capable enough to deliver real results with light infrastructure. And most organizations haven't committed yet to the architectures they'll be paying to maintain for the next decade.

Build second. Build light. Build right.

---

*Related: [The Hoarding Problem](/blog/the-hoarding-problem) — why the principal-agent trap plays out inside enterprises that think they have an AI strategy.*
