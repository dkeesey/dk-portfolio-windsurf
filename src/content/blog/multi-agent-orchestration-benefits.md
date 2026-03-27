---
title: "Coordinating AI Agents: From Cowboy Coordination to SQLite"
description: "What happens when you give multiple AI agents access to the same codebase with no coordination layer. And what you build instead."
publishDate: 2026-03-27
tags: ["ai-development", "multi-agent", "orchestration", "sqlite", "systems-architecture"]
readingTime: 9
author: "Dean Keesey"
---

# Coordinating AI Agents: From Cowboy Coordination to SQLite

The first time I ran two Claude Code sessions on the same codebase simultaneously, they both tried to edit the same file. Neither one knew the other existed. One session finished first and committed. The second session finished ten seconds later and committed on top of it, silently dropping the first session's changes because it had been working from a stale read.

No error. No warning. Just lost work.

That's cowboy coordination: multiple agents working independently, assuming they own the territory, resolving conflicts only when someone has already lost.

---

## The Tempting First Approach

The appeal of running parallel AI agents is obvious. One session researches the pattern. Another implements it. A third writes tests. Wall-clock time drops, and the total work gets done faster than any single session could manage.

The problem is that this model assumes independence that doesn't exist. The sessions are reading from the same filesystem, the same git tree, the same configuration state. When one session reads a file and starts working, that read is already stale by the time the other session finishes its write.

Early attempts to solve this with explicit coordination — telling each agent "don't edit these files, I've assigned them to another session" — worked for about two sessions. By the third session, the instruction surface was larger than the work surface. More time spent managing agents than having them do anything useful.

---

## What Actually Failed

The failure mode wasn't what I expected. I assumed the problem would be obvious: two sessions edit the same file, git catches the conflict, I merge. Clean story.

The real failure was invisible. Sessions would finish work that was internally coherent but externally wrong — they'd edited files that another session had already changed, producing output that was correct given their starting state but incorrect given the actual current state. The kind of bug that passes the unit tests for the changed file while breaking the integration that the other session had already fixed.

Git doesn't catch logical conflicts. It catches line conflicts. A session that reads a valid file, reasons correctly about it, and writes valid output can still produce a broken system if the file it read was already out of date.

This is the core problem with cowboy coordination: every agent is working from a snapshot of a world that's already changed.

---

## The SQLite Coordination Layer

The solution wasn't a smarter agent or better prompting. It was a shared state store.

A SQLite database — `coordination.db` — became the coordination substrate. It tracks which files are in active use, which tasks are assigned to which sessions, and what state each session has reported about its work. Before any session touches a file, it checks whether that file is locked. Before it starts a task, it claims the task by writing to the database. When it finishes, it releases the lock and records the outcome.

SQLite was the right choice for three reasons that aren't obvious until you've tried alternatives:

**It's a file.** Every session can read and write it without a running server, a port conflict, or a startup sequence. The coordination layer starts when the first session touches the database.

**It's inspectable.** At any point, you can open the database with any SQL tool and see exactly what the system thinks is happening. When something goes wrong — and it will — the debugging path is just a query.

**It's an open standard.** The state format doesn't depend on a vendor, a service, or a protocol version. Five years from now, the schema is still readable. That's vendor independence in the sense that actually matters.

---

## The Pattern That Emerged: Orchestrator + Specialists

The coordination layer made a cleaner architecture possible. With shared state, you can reliably have one session in the orchestrator role — tracking the high-level plan, decomposing tasks, assigning work — while other sessions operate as specialists focused on narrower execution.

The orchestrator doesn't do the implementation work. It maintains coherence. It knows which tasks are in flight, which have completed, which have hit errors. The specialists don't need to know what the other specialists are doing — they only need to know their task and the state of the files they're touching.

This is how reliable systems have always worked: separation of concerns between coordination and execution. The AI context makes it feel novel, but the pattern is the same one that makes operating systems, distributed databases, and factory floors function.

---

## What Happened to Explicit Task Management Tools

There was a period when the right answer seemed to be a dedicated task management layer — a tool purpose-built for decomposing AI work and assigning it to agents. The appeal was structured decomposition: explicit dependencies, named task states, formalized handoffs between agents.

The problem was that Claude's native task decomposition improved fast enough to make the overhead feel like friction rather than value. A model that can reason about task dependencies and decompose work appropriately doesn't need an external system to structure that reasoning — it can do it in context. The coordination layer still matters (file locking, state tracking, conflict detection), but the orchestration reasoning that sits above it can live in the model itself.

When a tool becomes unnecessary because the model it was supporting grew into the capability the tool was compensating for, the right move is to remove the tool. The coordination substrate (SQLite) stayed. The explicit orchestration tooling didn't.

---

## Cowboy Coordination Isn't Always Wrong

One of the counterintuitive findings from running this infrastructure daily: cowboy coordination is actually fine when tasks are truly independent and the conflict surface is small.

If two agents are working on files that have no shared dependencies, no overlapping test coverage, and no cross-cutting concerns — just two separate, contained changes — the overhead of coordination exceeds the cost of the occasional conflict. Let them work independently. Merge the results. The conflict rate on truly independent work is low enough that post-hoc resolution costs less than pre-hoc coordination.

The lesson: coordination infrastructure solves conflict problems on shared state. If the state isn't shared, you don't have the problem. Build the coordination layer for work that needs it; don't impose it on work that doesn't.

---

## The Implications Beyond AI Development

The multi-agent coordination pattern solves a problem that isn't unique to AI. Any system where multiple workers — human or automated — operate on shared state with incomplete information about each other's current activity has the same failure modes.

The git conflict is the most familiar version. Distributed teams solving the same problem in parallel: the locking solution is code review workflows, feature branches, and explicit task assignment. The inspection solution is the git log.

SQLite as a coordination layer for AI agents is the same architecture applied to a faster, less predictable actor class. The agents are more autonomous than human developers in some ways and less in others. The coordination primitives that make human collaboration work apply with modifications.

If you're building systems that will eventually coordinate multiple AI agents — and most meaningful AI deployments will — the architecture question isn't optional. Build the coordination layer before you need it, or spend significant time later figuring out why your agents are silently overwriting each other's work.

---

*The full coordination infrastructure is described in the [Multi-Agent Coordination System case study](/projects/multi-agent-coordination).*
