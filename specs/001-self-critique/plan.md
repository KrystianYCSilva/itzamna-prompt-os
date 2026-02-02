# Implementation Plan: Self-Critique Protocol Enhancement

**Branch**: `001-self-critique` | **Date**: 2026-02-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-self-critique/spec.md`

## Summary

Enhance the existing SELF-CRITIQUE.md protocol with structured quality scoring, type-specific checklists, redundancy detection, and Human Gate integration output format. This is a **prompt-based implementation** - AI agents read and follow Markdown instructions (no executable code required).

## Technical Context

**Language/Version**: Markdown (Prompt-based architecture)  
**Primary Dependencies**: None (self-contained protocol)  
**Storage**: N/A (protocol instructions only; skills stored in `skills/` directory)  
**Testing**: Manual validation via AI agent execution  
**Target Platform**: Any AI agent (Claude, Cursor, Gemini, GPT, Codex, etc.)  
**Project Type**: Prompt Protocol (part of .prompt-os core)  
**Performance Goals**: Self-critique adds <5 seconds to artifact generation  
**Constraints**: Protocol file must stay <10KB (T2 token economy)  
**Scale/Scope**: Applies to all 4 artifact types (code, skill, persona, documentation)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### T0 (INVIOLABLE) - All Clear ✅

| Rule | Status | Notes |
|------|--------|-------|
| T0-SEC-* | N/A | No secrets, credentials, or security-sensitive content |
| T0-HUMAN-01 | ✅ COMPLIANT | FR-008 explicitly states humans always decide (no auto-reject) |
| T0-HUMAN-02/03/04 | ✅ COMPLIANT | Self-critique outputs to Human Gate, never bypasses |
| T0-STRUCT-01 | ✅ COMPLIANT | This spec/plan follows CARD-FIRST workflow |
| T0-STRUCT-02 | ✅ COMPLIANT | Enhances existing `.prompt-os/core/SELF-CRITIQUE.md` |
| T0-VAL-* | ✅ COMPLIANT | FR-009 requires transparency in score calculation |

### T1 (STRONG) - Compliance Verified ✅

| Rule | Status | Notes |
|------|--------|-------|
| T1-QUAL-* | ✅ COMPLIANT | Protocol defines quality dimensions aligned with SOLID, DRY |
| T1-ARCH-* | N/A | No executable architecture (prompt-based) |
| T1-DOC-01 | ✅ COMPLIANT | This planning documentation exists |
| T1-PERF-* | ✅ COMPLIANT | SC-005 requires <5s performance overhead |

### T2 (CONVENTION) - Followed ✅

| Rule | Status | Notes |
|------|--------|-------|
| T2-NAMING | ✅ | kebab-case for files, PascalCase for entities |
| T2-GIT | ✅ | Branch `001-self-critique` follows convention |
| T2-STYLE | N/A | Markdown content |
| T2-STRUCT | ✅ | Following `.prompt-os/core/` structure |

## Project Structure

### Documentation (this feature)

```text
specs/001-self-critique/
├── plan.md              # This file
├── spec.md              # Feature specification (COMPLETED)
├── pre-spec.md          # Original draft (historical reference)
├── research.md          # Phase 0 output (technical decisions)
├── data-model.md        # Phase 1 output (entity definitions)
├── quickstart.md        # Phase 1 output (usage guide)
├── contracts/           # Phase 1 output (protocol interfaces)
│   ├── critique-output.md
│   └── human-gate-integration.md
├── checklists/
│   └── requirements.md  # Quality checklist (COMPLETED)
└── tasks.md             # Phase 2 output (implementation tasks)
```

### Source Code (repository root)

```text
# Prompt-based architecture (NO executable code)

.prompt-os/
├── PROMPTOS.md              # System entry point (loads core protocols)
├── CONSTITUTION.md          # Source of truth for rules
└── core/
    ├── SELF-CRITIQUE.md     # ⭐ TARGET: Enhance this file
    ├── HUMAN-GATE.md        # Integration point for critique output
    ├── GENERATION.md        # Calls self-critique before Human Gate
    └── [other protocols]

skills/
├── INDEX.md                 # Skill registry for redundancy detection
└── [skill files]            # Comparison targets for similarity
```

**Structure Decision**: This feature enhances the existing `SELF-CRITIQUE.md` protocol within the `.prompt-os/core/` directory. No new directories or executable code files are created. The implementation adds structured sections to the existing Markdown protocol.

## Complexity Tracking

> No T0 violations. No complexity justification needed.

| Consideration | Decision | Rationale |
|--------------|----------|-----------|
| Rule-based vs ML-based | Rule-based | Aligns with prompt architecture; no external dependencies |
| Keyword vs Vector similarity | Keyword/structural | Avoids vector DB dependency; sufficient for initial version |
| Single protocol file vs split | Single file enhancement | Maintains token economy; protocol already <400 lines |

---

## Implementation Approach

### Key Insight: Prompt-Based Architecture

This is **NOT** executable JavaScript code. The "implementation" consists of:

1. **Enhanced SELF-CRITIQUE.md** - More detailed instructions for AI agents
2. **Structured output format** - Template for critique results
3. **Type-specific checklists** - Already partially exist, will be expanded
4. **Redundancy detection instructions** - New section with lookup procedure

### What Changes

| Current State | Enhanced State |
|--------------|----------------|
| 4 quality dimensions (generic) | 4 dimensions with detailed scoring rubrics |
| Single checklist format | Type-specific checklists (code, skill, persona, doc) |
| Score thresholds defined | Score thresholds + Human Gate display instructions |
| No redundancy detection | Skills comparison using INDEX.md lookup |
| Freeform critique output | Structured YAML-like output format |

### Files to Modify

1. **`.prompt-os/core/SELF-CRITIQUE.md`** - Primary enhancement target
   - Add structured output format section
   - Expand type-specific checklists
   - Add redundancy detection procedure
   - Add Human Gate integration instructions

2. **`.prompt-os/core/HUMAN-GATE.md`** - Integration point
   - Add section for displaying critique results
   - Define visual indicators (score bands, warnings)

### Files to Reference (Read-Only)

- `skills/INDEX.md` - For redundancy detection lookup
- `.prompt-os/PROMPTOS.md` - Ensure protocol loading order
- `.specify/memory/constitution.md` - T0 compliance verification

---

## Success Metrics (from spec.md)

| ID | Metric | Target | Validation Method |
|----|--------|--------|-------------------|
| SC-001 | Human review time reduction | ≥20% | Time tracking in Human Gate |
| SC-002 | Low-score correlation with rejection | ≥80% | Feedback analysis |
| SC-003 | Suggestion utility | ≥50% addressed | Human feedback tracking |
| SC-004 | Critique coverage | 100% artifacts | Workflow enforcement |
| SC-005 | Performance overhead | <5 seconds | Subjective timing |
| SC-006 | Redundancy detection accuracy | ≥90% | Manual review comparison |

---

*Plan created: 2026-02-02 | Next: Create research.md, data-model.md, contracts/*
