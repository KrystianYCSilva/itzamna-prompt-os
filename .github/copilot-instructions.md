# Copilot Instructions - Itzamna PromptOS v2.1.0

## Context Summary
Itzamna PromptOS is a **prompt-based** operating system for AI agents. The core system is Markdown instructions, not executable code. The **primary agent** is `ITZAMNA-AGENT.md` (workflows + references) and it must be followed. Entry point is `.prompt-os/PROMPTOS.md`, which loads the Constitution (`.prompt-os/CONSTITUTION.md`), core protocols in `.prompt-os/core/`, and JIT-loaded skills/personas from `skills/` and `personas/`. The `.context/` directory is the AI context hub with tiered rules (T0–T3); T0 rules in `.context/standards/architectural-rules.md` always override others.

## What Exists Now
- **Core protocols** (prompt-based): SELF-CRITIQUE, HUMAN-GATE, AUTO-INCREMENT, WEB-RESEARCH, KNOWLEDGE-BASE, PERSONA-GENERATOR, INPUT-CLASSIFIER, JIT-PROTOCOL.
- **State**: `MEMORY.md` is the stable memory file; always update it after significant actions.
- **Skills/Personas**: 17 approved skills across 7 categories and 1 persona (see `MEMORY.md` for current inventory).
- **Optional tools**: Node CLI `brain.js`, Python `cli.py`, PowerShell `sync-constitution.ps1` for human operators.

## Current Work / Roadmap (from MEMORY.md + specs)
- **v2.1.0** is in progress: enhanced SELF-CRITIQUE + HUMAN-GATE and a consolidated skills registry in `.prompt-os/skills/INDEX.md`.
- **Spec status**:
  - **SPEC-001 Self-Critique**: Full spec/plan/tasks exist; enhancements implemented in prompt protocols.
  - **SPEC-002 Auto-Increment**: Implemented as `.prompt-os/core/AUTO-INCREMENT.md`.
  - **SPEC-003 Web Research**: Implemented as `.prompt-os/core/WEB-RESEARCH.md`.
  - **SPEC-004 Vector DB + RAG**: Prompt-based implementation in `.prompt-os/core/KNOWLEDGE-BASE.md`; full vector DB tooling optional.
  - **SPEC-005 Persona CLI**: Implemented as `.prompt-os/core/PERSONA-GENERATOR.md`.
- **Next steps (v2.1.0)**: automated protocol validation, cross-model compatibility tests, protocol-creation docs, improved JIT loading, metrics dashboard.

## Critical Conventions
- **Human Gate (T0)**: Never create/modify/delete files without explicit human approval. Always show a preview before committing changes.
- **Prompt-first workflow**: Read `.prompt-os/PROMPTOS.md` and `.prompt-os/CONSTITUTION.md` first; then `MEMORY.md`; then load relevant `.context/` and protocols JIT.
- **Skills/Personas**: Markdown + YAML frontmatter. Skills live under `skills/{category}/{skill}/SKILL.md`; personas under `personas/{name}/PERSONA.md`. Update the relevant INDEX.md when adding new ones.
- **Token economy**: Prefer JIT loading of only relevant skills/personas (2–5) per task.
- **Source citation**: Skills must include references; keep skills under 1400 tokens.

## Build / Test / Lint (Optional)
This repo is prompt/documentation-first; no required build. Optional tooling:
- Node CLI: `node .prompt-os\tools\brain.js ...`
- Python CLI: `py .prompt-os\core\cli.py ...`
- PowerShell: `\.\.prompt-os\scripts\sync-constitution.ps1 ...`
If a local package.json is added for tooling, `.context/workflows/development-workflows.md` references:
- `npm test`
- `npm run coverage`
- `npm run lint`
