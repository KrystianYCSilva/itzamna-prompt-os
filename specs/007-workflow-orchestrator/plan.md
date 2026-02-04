# Implementation Plan: Workflow & Persona Orchestrator

**Branch**: `007-workflow-orchestrator` | **Date**: 2026-02-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/007-workflow-orchestrator/spec.md`

## Summary

Implement a Workflow Orchestrator layer that sits between the Command Router (SPEC-006) and the JIT Protocol. It maintains a declarative Orchestration Map of 7 workflows, automatically selects the correct Persona and Skill set for each, supports manual overrides (`--persona`, `--skills`), and enforces the 5-skill cap with an "explicit-first" eviction strategy. State is stateless per command (Last command wins).

## Technical Context

**Language/Version**: Markdown (System Prompts)  
**Primary Dependencies**: `COMMAND-ROUTER.md` (SPEC-006), `INPUT-CLASSIFIER.md`, `JIT-PROTOCOL.md`, `.context/_meta/tech-stack.md`  
**Storage**: N/A (Stateless per command; Orchestration Map is a static protocol document)  
**Testing**: Manual cross-model validation (Claude, Gemini, Copilot)  
**Target Platform**: LLM Context Window (Text-based)  
**Project Type**: Prompt-based System  
**Performance Goals**: Zero overhead on non-command messages; skill selection resolved within single reasoning step.  
**Constraints**: Must stay within context limits; Orchestration Map + instructions must be concise (JIT-loadable). Max 5 skills active at any time.  
**Scale/Scope**: 7 workflows, 7 personas, dynamic skill selection based on tech-stack detection.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### T0 - INVIOLABLE
- **T0-SEC-01 (Secrets)**: ✅ No secrets involved. Orchestrator deals with personas and skills only.
- **T0-HUMAN-01 (Approval)**: ✅ Orchestrator activates workflows that respect Human Gate downstream.
- **T0-STRUCT-01 (Card-First)**: ✅ Feature has a SPEC, clarifications, and PLAN.
- **T0-STRUCT-03 (Scope)**: ✅ New files are within `.prompt-os/core/` and `specs/` — both in scope.
- **T0-VAL-01 (Verify)**: ✅ Cross-model validation checklist will be produced.
- **T0-VAL-02 (No Invented APIs)**: ✅ Extending existing PromptOS patterns (JIT, Router).

### T1 - STRONG
- **T1-QUAL-01 (SOLID)**: ✅ Orchestrator is a single-responsibility layer (select → load). Does not execute workflows.
- **T1-ARCH-01 (Layer Separation)**: ✅ Router dispatches → Orchestrator selects → JIT loads. Three distinct layers.
- **T1-DOC-02 (README)**: ✅ `quickstart.md` and docs updates planned.

### Post-Design Re-check
- Will re-validate after data-model and contracts are finalized (Phase 1 gate).

## Project Structure

### Documentation (this feature)

```text
specs/007-workflow-orchestrator/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── orchestration-map.yaml
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
.prompt-os/core/
├── COMMAND-ROUTER.md          # Already exists (SPEC-006); receives new --persona/--skills flags
├── WORKFLOW-ORCHESTRATOR.md   # New protocol file
└── JIT-PROTOCOL.md            # Updated with orchestrator integration rules

.context/_meta/
└── tech-stack.md              # Read-only dependency (stack detection source)
```

**Structure Decision**: Standalone `WORKFLOW-ORCHESTRATOR.md` protocol. Keeps separation from Router and JIT. `INPUT-CLASSIFIER.md` references it after Router delegation, consistent with the layered architecture established in SPEC-006.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
