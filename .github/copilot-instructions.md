# Copilot Instructions — Itzamna PromptOS v2.2.0 (T3)

> **Read first:** `.context/ai-assistant-guide.md` (T0) → `ITZAMNA-AGENT.md` (T1)

---

## What This Project Is

Itzamna PromptOS is a **prompt-based** operating system for AI-assisted programming.
The core is Markdown — not executable code. Agents read `.prompt-os/PROMPTOS.md` (entry point),
follow `.prompt-os/CONSTITUTION.md` (rules), and load skills/protocols JIT from `.prompt-os/`.

---

## Key Conventions

- **Human Gate (T0):** Never create/modify/delete files without explicit human approval. Always show preview first.
- **Read order:** `ai-assistant-guide.md` (T0) → `ITZAMNA-AGENT.md` (T1) → `MEMORY.md` → JIT context.
- **Skills:** Markdown files. Path: `.prompt-os/skills/{category}/{skill}/SKILL.md`. Update `INDEX.md` when adding.
- **Token economy:** JIT load only 2-5 relevant skills per task. Target 10-16KB total context.
- **Sources:** Skills require ≥ 2 cited sources. Keep under 1,400 tokens; use JIT sub-files if needed.

---

## Current State

- **v2.2.0** complete: SPEC-003 (Web Research) + SPEC-004 (Knowledge Base) fully validated.
- **Skills:** 13 total (6 baselines: Java, Kotlin, C/C++, JavaScript, Python, Go + 7 advanced).
- **SPEC-006** Command Router — Phase 3 complete, in progress.
- **Next:** v2.3.0 — ecosystem sub-files, Rust & TypeScript baselines.

---

## Protocol Sequence

Full details in `.context/ai-assistant-guide.md` (T0). Summary:

```
1. AUTO-INCREMENT   → Check duplicates / detect gaps
2. GENERATE         → Apply templates/standards
3. SELF-CRITIQUE    → Score 0-100 (< 70 = block and iterate)
4. HUMAN-GATE       → Preview + approval  ⚠️ NEVER skip
5. COMMIT           → Write files + update INDEX.md
6. MEMORY-MGMT      → Update MEMORY.md   ⚠️ NEVER skip
```

---

## Build / Test

This repo is prompt/documentation-first — no required build step. Optional tooling:
- `node .prompt-os\tools\brain.js`
- `py .prompt-os\core\cli.py`
- `.\prompt-os\scripts\sync-constitution.ps1`

---

*Copilot Instructions — T3 | GitHub Copilot | v2.2.0 | 2026-02-04*
