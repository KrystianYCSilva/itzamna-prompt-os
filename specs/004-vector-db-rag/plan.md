# Implementation Plan: Enhanced Knowledge Retrieval & RAG

**Branch**: `004-vector-db-rag` | **Date**: 2026-02-03 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/004-vector-db-rag/spec.md`

## Summary

Upgrade `.prompt-os/core/KNOWLEDGE-BASE.md` from a keyword-search + basic-RAG-checklist protocol into a full multi-signal similarity search, context-augmented generation, two-tier redundancy detection, and skill-relationship system — all expressed as prompt instructions an AI agent follows, with no external runtime. The main protocol file stays ≤ 1,400 tokens; four JIT sub-files carry the detailed rubrics and workflows, following the same pattern proven by WEB-RESEARCH + web-research/.

## Technical Context

**Language/Version**: Markdown (prompt instructions). No executable code.  
**Primary Dependencies**: None. Consumes `.prompt-os/skills/INDEX.md` (read-only at search time) and `.prompt-os/core/AUTO-INCREMENT.md` (gap forwarding interface).  
**Storage**: File-based. Relationship map persists as a YAML block inside INDEX.md (existing pattern: tags, triggers). Main protocol + 4 JIT sub-files under `.prompt-os/core/knowledge-base/`.  
**Testing**: Manual agent-run. Test harness is a defined 20-query set (SC-001) and 5 near-duplicate drafts (SC-003). No automated test runner; validation is the agent executing the protocol and a human reviewing results.  
**Target Platform**: Any AI agent that reads Markdown. Cross-model (Claude, Qwen, Gemini, Cursor, OpenCode).  
**Project Type**: Protocol authoring (Markdown files only).  
**Performance Goals**: Scoring completes within a single agent turn (FR-008). No hard ms target.  
**Constraints**: Main KNOWLEDGE-BASE.md ≤ 1,400 tokens (T0-SIZE-01 / SC-004). Each JIT sub-file ≤ 1,400 tokens recommended; hard cap 2,000 tokens.  
**Scale/Scope**: Current library: 13 skills. Protocol must remain effective up to ~50 skills without modification; beyond that, v3.0.0 vector tooling takes over.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Rule | Tier | Status | Notes |
|------|------|--------|-------|
| T0-SEC (no secrets, no SQL injection, no PII in logs) | T0 | PASS | No runtime, no data storage, no credentials involved |
| T0-HUMAN (approval before persistence) | T0 | PASS | FR-006 gates all skill writes through Human Gate; redundancy options wait for human choice |
| T0-STRUCT (CARD-FIRST, folder structure) | T0 | PASS | Files land in `.prompt-os/core/` + `knowledge-base/` sub-dir — mirrors `web-research/` precedent |
| T0-VALIDATE (no invented APIs) | T0 | PASS | All interfaces (INDEX.md shape, AUTO-INCREMENT gap format) verified against live files |
| T1-QUAL (DRY, no duplication) | T1 | PASS | Signal weights defined once in sub-file, referenced by main protocol and INDEX.md |
| T1-ARCH (layer separation) | T1 | PASS | Main protocol = thin router; depth in JIT sub-files. Same layering as WEB-RESEARCH |
| T1-DOC (document decisions) | T1 | PASS | research.md records every decision; quickstart.md covers usage |
| Size limit (skills < 1,400 tokens, kernel < 5 KB) | T0 | PASS | Main file target ≤ 1,400 tokens; sub-files each ≤ 2,000 tokens |

**Gate result: ALL PASS. Phase 0 may proceed.**

## Project Structure

### Documentation (this feature)

```text
specs/004-vector-db-rag/
├── spec.md              # Clarified specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── similarity-scoring.md   # Multi-signal rubric contract
│   ├── redundancy-gate.md      # Two-tier detection + option flow
│   ├── rag-workflow.md         # Retrieve → Augment → Generate sequence
│   └── relationship-map.md    # Skill graph types + surfacing rules
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source (protocol files written to repo)

```text
.prompt-os/core/
├── KNOWLEDGE-BASE.md              # Refactored main protocol (≤ 1,400 tokens)
└── knowledge-base/                # JIT sub-files (new directory)
    ├── similarity-scoring.md      # FR-001/FR-002 rubric + worked examples
    ├── redundancy-gate.md         # FR-005/FR-006 two-tier flow + decision tree
    ├── rag-workflow.md            # FR-004 retrieve → augment → generate steps
    └── relationship-map.md        # FR-007 graph types, surfacing rules, persistence
```

**Structure Decision**: Mirrors the `WEB-RESEARCH.md` + `web-research/` pattern established in SPEC-003. Main file is a 4-phase router that JIT-loads exactly the sub-file the agent needs for the current action. No new top-level directories.

## Complexity Tracking

No constitution violations. This section is intentionally empty.
