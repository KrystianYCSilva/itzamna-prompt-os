# SPEC-005 Unified Strategy: Protocol + CLI Implementation

**Date**: 2026-02-03  
**Status**: Strategy Definition  
**Scope**: Two complementary SPECs for Persona functionality

---

## Overview

SPEC-005 is being formalized as **TWO complementary specifications**:

### SPEC-005a: Persona Generator Protocol (Protocol-Based)
- **Directory**: `specs/005-persona-generator/`
- **Status**: Phase 3 COMPLETE (Specify → Clarify → Plan done)
- **Files**: spec.md, plan.md
- **Next**: Tasks → Analyse → Implement
- **Deliverable**: Formalized PERSONA-GENERATOR.md protocol with JIT sub-files
- **Artifacts**: 
  - Enhanced `.prompt-os/core/PERSONA-GENERATOR.md` (<1,400 tokens)
  - JIT sub-files: persona-generation-workflow.md, persona-traits-inference.md, persona-triggers.md, persona-examples.md
  - 3 example personas with metrics

### SPEC-005b: Persona CLI Implementation (Code-Based)
- **Directory**: `specs/005-persona-cli/`
- **Status**: Pre-spec exists; starting Phase 0 (Research)
- **Files**: pre-spec.md (existing), research.md (TODO), data-model.md (TODO), contracts/ (TODO)
- **Next**: Research → Design → Implementation
- **Deliverable**: JavaScript CLI commands for persona generation
- **Artifacts**:
  - skill-matcher.js (skill matching engine)
  - persona-generator.js (persona generation logic)
  - brain.js CLI commands (generate persona, list, inspect)
  - Tests + documentation

---

## Execution Strategy

### Phase A: SPEC-005a (Protocol Formalization) — Days 1-7
**Status**: IN PROGRESS (Phase 3 complete, Phase 4 pending)

| Phase | Tasks | Deliverables | Days |
|-------|-------|--------------|------|
| 4 | Tasks definition (tasks.md) | 30 tasks, dependency map | 1 |
| 5 | Analyse (execute-checklist.md) | Cross-spec analysis, readiness | 1 |
| 6-7 | Implement + Validate | Enhanced protocol, JIT files, examples | 2-3 |
| 8 | Human Gate + Commit | Approval, memory update, closure | 1 |

**Execution**: Sequential, starting next session

### Phase B: SPEC-005b (CLI Implementation) — Days 8-14
**Status**: TODO (Phase 0 pending)

| Phase | Tasks | Deliverables | Days |
|-------|-------|--------------|------|
| 0 | Research | research.md (resolve unknowns) | 1-2 |
| 1 | Design | data-model.md, contracts/, quickstart.md | 1-2 |
| 2-6 | Implementation | skill-matcher.js, persona-generator.js, CLI, tests | 3-4 |
| 7 | Validation | Self-critique, Human Gate | 1 |

**Execution**: After SPEC-005a approved (dependent on protocol being stable)

---

## Dependency Graph

```
SPEC-001 (Self-Critique + Human Gate)
    ↓
SPEC-005a (Protocol Formalization)
    ↓ (protocol stable)
SPEC-005b (CLI Implementation)
    ↓ (uses protocol from 005a)
```

**Critical Path**: SPEC-005a must complete BEFORE SPEC-005b starts (CLI depends on stable protocol)

---

## File Structure

```
specs/005-persona-generator/          (Protocol Formalization)
├── spec.md                            ✅ DONE (648 lines)
├── plan.md                            ✅ DONE (561 lines)
├── tasks.md                           📝 TODO (Phase 4)
├── execute-checklist.md               📝 TODO (Phase 5)
└── COMPLETION-SUMMARY.md              📝 TODO (Phase 8)

specs/005-persona-cli/                (CLI Implementation)
├── pre-spec.md                        ✅ EXISTING (1,146 lines, old format)
├── spec.md                            📝 TODO (Phase 0 - research)
├── research.md                        📝 TODO (Phase 0)
├── data-model.md                      📝 TODO (Phase 1)
├── contracts/                         📝 TODO (Phase 1)
│   ├── skill-matcher-spec.md          
│   ├── persona-generator-spec.md      
│   └── cli-commands-spec.md           
├── quickstart.md                      📝 TODO (Phase 1)
└── COMPLETION-SUMMARY.md              📝 TODO (Phase 7)

.prompt-os/core/
├── PERSONA-GENERATOR.md               ✅ EXISTING, will enhance (SPEC-005a Phase 6)
└── persona-generator/                 📝 TODO JIT sub-files
    ├── persona-generation-workflow.md
    ├── persona-traits-inference.md
    ├── persona-triggers.md
    └── persona-examples.md

.prompt-os/scripts/                   📝 TODO (SPEC-005b Phase 2)
├── skill-matcher.js
├── persona-generator.js
└── cli-integration.js
```

---

## Next Steps (This Session)

### For SPEC-005a (Protocol Formalization):
Continue with **Phase 4: Tasks Definition** (spec005-4-tasks)
- Create `specs/005-persona-generator/tasks.md`
- Break down 30 tasks with dependencies
- Estimate effort per task
- Mark parallelizable tasks [P]

### For SPEC-005b (CLI Implementation):
Prepare for **Phase 0: Research** (next session)
- Move/refactor `pre-spec.md` as research input
- Plan research tasks for unknowns
- Prepare for design phase

---

## Clarification on Two Different Workflows

### SPEC-005a Workflow (Protocol):
```
specify → clarify → plan → tasks → analyse → implement → validate → close
        ↑(done)   ↑(done) ↑(done) ↓(next)
```
Uses: Manual process, AI agent reads/follows protocol

### SPEC-005b Workflow (CLI):
```
research → design → implement → validate → close
  ↓(next)
```
Uses: `.specify/` system, generates contracts/API specs

---

## Why Two SPECs?

| Aspect | SPEC-005a (Protocol) | SPEC-005b (CLI) |
|--------|---------------------|-----------------|
| **Purpose** | Formalize AI agent instructions | Provide JavaScript implementation |
| **Artifact** | Markdown protocol file | Executable JavaScript code |
| **Audience** | AI agents reading protocol | Developers using CLI |
| **Validation** | Self-critique + Human Gate | Unit tests + Integration tests |
| **Dependencies** | SPEC-001, SPEC-002, SPEC-004 | SPEC-005a (protocol) + npm packages |
| **Version Target** | v2.2.0 | v2.3.0 (after protocol stable) |
| **Scope** | What agents should do | How to implement technically |

---

## Immediate Actions

**Session Now (Consolidation + SPEC-005a Phase 4)**:
1. ✅ Completed: C001-C008 consolidation tasks
2. ✅ Completed: SPEC-005a Phase 1-3 (specify, clarify, plan)
3. **TODO**: SPEC-005a Phase 4 (tasks.md)

**Next Session (SPEC-005a completion)**:
1. Phase 4: Create tasks.md (1 hour)
2. Phase 5: Create execute-checklist.md + cross-spec analysis (1 hour)
3. Phase 6-7: Implement protocol enhancements + examples (3-4 hours)
4. Phase 8: Human Gate + commit (1 hour)

**Session After (SPEC-005b Phase 0)**:
1. Phase 0: Research unknowns → research.md
2. Phase 1: Design → data-model.md, contracts/, quickstart.md
3. Phases 2-7: Implementation + validation

---

## Status Summary

| SPEC | Phase | Status | Files | Next |
|------|-------|--------|-------|------|
| **005a** (Generator) | 3/8 | ✅ Spec + Plan done | spec.md, plan.md | tasks.md |
| **005b** (CLI) | 0/7 | 📝 Pre-spec ready | pre-spec.md | research.md |

**Overall**: SPEC-005 formalization **IN PROGRESS** with parallel tracks

---

**Strategy Complete** — Ready to execute Phase 4 (SPEC-005a tasks)
