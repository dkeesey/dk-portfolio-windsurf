# Antigravity Context Bridge

> **CRITICAL**: This project relies on the Claude/Antigravity coordination protocol.

## Infrastructure
- **Coordination DB**: `~/.claude/shared/coordination.db` (Use `mcp_sqlite` to read/write)
- **Global Context**: `~/.claude/CLAUDE.md` (Read this first for protocols)
- **Local Context**: `./CLAUDE.md` (Read this for project-specifics)
- **Delegation Scripts**: `~/.claude/scripts/`

## Instructions
1. When starting a session here, read `CLAUDE.md`.
2. To receive tasks, check `work_items` in `coordination.db`.
