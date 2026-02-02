# Copilot Instructions - Itzamna PromptOS

## Build, Test, and Lint
- This repo is primarily prompt/documentation driven; there is no required build for core usage.
- Optional CLI tools:
  - Node CLI (brain.js): `node .prompt-os\tools\brain.js ...`
  - Python CLI: `py .prompt-os\core\cli.py ...`
  - PowerShell automation: `\.\.prompt-os\scripts\sync-constitution.ps1 ...`
- Tests/linting are referenced in `.context/workflows/development-workflows.md` (npm scripts), but no repo-level package.json is present. Run them only if you add a local package.json for tooling:
  - `npm test`
  - `npm run coverage`
  - `npm run lint`

## High-Level Architecture
- PromptOS is a prompt-based system: AI agents read Markdown instructions; the entry point is `.prompt-os/PROMPTOS.md` and it loads `.prompt-os/CONSTITUTION.md`, core protocols in `.prompt-os/core/`, and skills/personas in `skills/` and `personas/` (see `README.md` and `AGENTS.md`).
- The persistent state lives in `MEMORY.md`; skill and persona registries live in `skills/INDEX.md` and `personas/INDEX.md`.
- Optional tooling exists for humans: Node-based `brain.js` and Python `cli.py`/`orchestrator.py`, plus PowerShell scripts for constitution sync.
- The `.context/` tree provides AI-specific standards, workflows, and metadata; treat `standards/architectural-rules.md` (T0) as highest priority guidance.

## Key Conventions
- Human-in-the-loop is mandatory for persistent changes (T0). Always show a preview and wait for approval before writing/modifying files (see `.prompt-os/CONSTITUTION.md` and `.context/standards/architectural-rules.md`).
- Entry point for any AI session is `.prompt-os/PROMPTOS.md`; always read it first, then `.prompt-os/CONSTITUTION.md`, then `MEMORY.md` and `AGENTS.md` as needed.
- Skills/personas are Markdown with YAML frontmatter and live under `skills/{category}/{skill}/SKILL.md` and `personas/{name}/PERSONA.md`; update the respective INDEX.md when adding new ones.
- Keep skills <1400 tokens and cite sources in generated skills (T0/T1 rules in `.context/standards/architectural-rules.md`).
- Prefer just-in-time loading of only relevant skills/personas; do not load everything by default.
