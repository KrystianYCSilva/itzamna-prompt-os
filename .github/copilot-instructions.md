# Copilot Instructions - Itzamna PromptOS v2.2.0

## Context Summary
Itzamna PromptOS is a **prompt-based** operating system for AI agents. The core system is Markdown instructions, not executable code. The **primary agent** is `ITZAMNA-AGENT.md` (workflows + references) and it must be followed. Entry point is `.prompt-os/PROMPTOS.md`, which loads the Constitution (`.prompt-os/CONSTITUTION.md`), core protocols in `.prompt-os/core/`, and JIT-loaded skills/personas from `skills/` and `personas/`. The `.context/` directory is the AI context hub with tiered rules (T0–T3); T0 rules in `.context/standards/architectural-rules.md` always override others.

## What Exists Now
- **Core protocols** (prompt-based): 13 total (9 main: SELF-CRITIQUE, HUMAN-GATE, AUTO-INCREMENT, WEB-RESEARCH, KNOWLEDGE-BASE, PERSONA-GENERATOR, INPUT-CLASSIFIER, JIT-PROTOCOL, MEMORY-MANAGEMENT + 4 JIT web-research sub-files).
- **State**: `MEMORY.md` is the stable memory file; always update it after significant actions.
- **Skills/Personas**: 13 approved skills (6 baselines + 7 advanced) and 1 persona (see `MEMORY.md` for current inventory).
- **Language Baselines**: 6 (Java, Kotlin, C/C++, JavaScript, Python, **Go**).
- **Optional tools**: Node CLI `brain.js`, Python `cli.py`, PowerShell `sync-constitution.ps1` for human operators.

## Current Work / Roadmap (from MEMORY.md + specs)
- **v2.2.0** is complete: SPEC-003 Web Research Enhancement fully validated (23/23 tasks), 4-dimension source validation, citation templates, tier system, gap detection. Go baseline skill delivered (Session 24, 2026-02-03) - first to apply SPEC-003 protocols (score 100/100).
- **Spec status**:
  - **SPEC-001 Self-Critique**: ✅ Complete (35/35 tasks) - implemented in prompt protocols.
  - **SPEC-002 Auto-Increment**: ✅ Complete (90/90 tasks) - production ready, implemented as `.prompt-os/core/AUTO-INCREMENT.md`.
  - **SPEC-003 Web Research**: ✅ Complete (23/23 tasks, Session 24) - implemented as `.prompt-os/core/WEB-RESEARCH.md` + 4 JIT sub-files (source-validation-rules, citation-templates, tier-system, gap-detection).
  - **SPEC-010 Language Skills Baseline**: ✅ Complete (6/6 skills) - Java, Kotlin, C/C++, JavaScript, Python, **Go** baselines delivered. JIT sub-files pattern proven (scores: 94→99 for C/C++, 95→99 for JavaScript, 100/100 for Go).
  - **SPEC-004 Vector DB + RAG**: Prompt-based implementation in `.prompt-os/core/KNOWLEDGE-BASE.md`; full vector DB tooling optional.
  - **SPEC-005 Persona CLI**: Implemented as `.prompt-os/core/PERSONA-GENERATOR.md`.
- **Next steps (v2.3.0)**: Advanced features & ecosystem - ecosystem sub-files for existing baselines, more baselines (Rust, TypeScript, Ruby), version-specific advanced skills.

## Critical Conventions
- **Human Gate (T0)**: Never create/modify/delete files without explicit human approval. Always show a preview before committing changes.
- **Prompt-first workflow**: Read `ITZAMNA-AGENT.md` first; then `.prompt-os/PROMPTOS.md` and `.prompt-os/CONSTITUTION.md`; then `MEMORY.md`; then load relevant `.context/` and protocols JIT.
- **Skills/Personas**: Markdown + YAML frontmatter. Skills live under `skills/{category}/{skill}/SKILL.md`; personas under `personas/{name}/PERSONA.md`. Update the relevant INDEX.md when adding new ones.
- **Token economy**: Prefer JIT loading of only relevant skills/personas (2–5) per task.
- **Source citation**: Skills must include references; keep skills under 1400 tokens.

## MANDATORY PROTOCOL SEQUENCE ⚠️ CRITICAL

**When generating any artifact (skill, persona, code, doc), follow this EXACT sequence:**

```
1. AUTO-INCREMENT (.prompt-os/core/AUTO-INCREMENT.md)
   → Check if similar artifact exists
   → Detect gaps if necessary
   → If gap + defer: MEMORY-MANAGEMENT registers gap

2. GENERATE
   → Create artifact following templates/standards
   → Apply learned actions (version-agnostic, JIT sub-files, etc.)

3. SELF-CRITIQUE (.prompt-os/core/SELF-CRITIQUE.md)
   → Evaluate in 4 dimensions (Completeness, Clarity, Correctness, Best Practices)
   → Calculate score (0-100)
   → Generate structured YAML output

4. HUMAN-GATE (.prompt-os/core/HUMAN-GATE.md) ⚠️ MANDATORY CHECKPOINT
   → Present artifact with visual score
   → Show complete preview to human
   → Wait for approval: approve|view|edit|reject|cancel
   → If reject: MEMORY-MANAGEMENT registers rejection
   → ⚠️ NEVER write files without approval (T0-HUMAN-01 violation)

5. COMMIT (only after approval)
   → Write files
   → Update indices (INDEX.md)
   → Commit with conventional commits

6. MEMORY-MANAGEMENT (.prompt-os/core/MEMORY-MANAGEMENT.md) ⚠️ MANDATORY
   → Update MEMORY.md (statistics + episodic)
   → Update memory/{agent}-memory.md (session notes)
   → Create workflow doc if necessary (.context/workflows/)
   → ⚠️ NEVER commit without updating memory (T0-MEMORY-01 violation)
```

**⚠️ T0 Violations**:
- Skipping HUMAN-GATE = T0-HUMAN-01 violation
- Skipping MEMORY-MANAGEMENT = T0-MEMORY-01 violation

**Memory Architecture (3 Layers):**
- **MEMORY.md**: Aggregated statistics + last 5-10 sessions (SUCCINCT)
- **memory/{agent}-memory.md**: Gaps + Rejections + Detailed sessions (AGENT-SPECIFIC)
- **.context/workflows/**: Reusable execution patterns (WORKFLOW DOCS)

**Read full protocol:** `.prompt-os/core/MEMORY-MANAGEMENT.md`

## Build / Test / Lint (Optional)
This repo is prompt/documentation-first; no required build. Optional tooling:
- Node CLI: `node .prompt-os\tools\brain.js ...`
- Python CLI: `py .prompt-os\core\cli.py ...`
- PowerShell: `\.\.prompt-os\scripts\sync-constitution.ps1 ...`
If a local package.json is added for tooling, `.context/workflows/development-workflows.md` references:
- `npm test`
- `npm run coverage`
- `npm run lint`
