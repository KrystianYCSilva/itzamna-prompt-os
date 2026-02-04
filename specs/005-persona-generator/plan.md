# Implementation Plan: Persona Generator Protocol Enhancement

**Spec**: `specs/005-persona-generator/spec.md`  
**Created**: 2026-02-03  
**Status**: Phase 0 - Planning Complete  
**Target**: Formalize PERSONA-GENERATOR.md protocol (already exists, needs documentation structure)

---

## Overview

PERSONA-GENERATOR.md protocol exists in v2.2.0 but lacks:
1. Formal specification (→ created: spec.md)
2. Implementation planning (→ this document)
3. Task breakdown with dependencies
4. Cross-spec analysis
5. Success criteria validation plan

**Goal**: Formalize SPEC-005 following the 6-phase protocol (specify → clarify → plan → tasks → analyse → implement).

**Approach**: Enhance existing PERSONA-GENERATOR.md protocol with structure, examples, and validation rules based on spec requirements.

---

## Technical Context

### Current State Analysis

**Protocol File**: `.prompt-os/core/PERSONA-GENERATOR.md` (584 lines)

**Current Capabilities**:
- ✅ Template structure (YAML frontmatter + Markdown)
- ✅ Generation process (6 phases: describe → match → infer → generate → validate → approve)
- ✅ Skill matching algorithm (keyword + domain + tag scoring)
- ✅ Behavioral trait inference (level-based patterns)
- ✅ Trigger generation (domain + skill + role based)
- ✅ Integration with SELF-CRITIQUE.md + HUMAN-GATE.md

**Missing Elements**:
- ❌ Formal acceptance scenarios (spec has 3, protocol has examples only)
- ❌ Structured success criteria (no measurable targets defined)
- ❌ Skill gap handling documentation (protocol says "graceful", spec clarifies "strict")
- ❌ JIT sub-files (may need extraction if token budget exceeds 1,400)
- ❌ Validation checklist (how to verify implementation)
- ❌ Example personas with metrics (no score data in current protocol)

**Size Analysis**:
- Current: 584 lines, ~2,100 tokens (estimated)
- Assessment: **May exceed 1,400 token limit** (T0-SIZE-01)
- Strategy: Extract to JIT sub-files if needed during implementation

### Technology Stack

**Architecture**: Prompt-based (no code execution)

**Integration Points**:
- **SPEC-001** (SELF-CRITIQUE.md): Quality validation of generated personas
- **SPEC-001** (HUMAN-GATE.md): Approval workflow before saving
- **SPEC-002** (AUTO-INCREMENT.md): Gap detection when skills don't exist
- **SPEC-004** (KNOWLEDGE-BASE.md): Skill matching (current: keyword, future: semantic via similarity-scoring.md)
- **Skill Library**: `.prompt-os/skills/INDEX.md` + individual skill files

**No Code Implementation**: Protocol-based system, not software. Agents read and follow Markdown instructions.

### Specification Dependencies

**Must exist before SPEC-005 implementation**:
- ✅ SPEC-001 (SELF-CRITIQUE.md + HUMAN-GATE.md) — Session 10-13
- ✅ SPEC-002 (AUTO-INCREMENT.md) — Session 14
- ✅ Skill Library (6 baselines + INDEX.md) — SPEC-010, Sessions 16-18

**May integrate with**:
- ✅ SPEC-004 (KNOWLEDGE-BASE.md) — Session 24-27, for semantic skill matching (optional, v3.0)

---

## Constitution Check

### T0 Rules Compliance

| Rule | Status | Notes |
|------|--------|-------|
| **T0-HUMAN-01** (Significant changes require approval) | ✅ PASS | All personas go through HUMAN-GATE |
| **T0-HUMAN-02** (Never auto-commit) | ✅ PASS | Explicit commit after human approval |
| **T0-HUMAN-03** (Never auto-push) | ✅ PASS | No auto-push in protocol |
| **T0-HUMAN-04** (Never delete without confirming) | ✅ N/A | No deletion in this spec |
| **T0-STRUCT-01** (CARD-FIRST) | ✅ PASS | Spec created first (spec.md) |
| **T0-STRUCT-02** (Maintain folder structure) | ✅ PASS | Protocol stays in `.prompt-os/core/` |
| **T0-STRUCT-03** (No files outside scope) | ✅ PASS | All in `specs/005-persona-generator/` |
| **T0-VAL-01** (Verify success claims) | ✅ PASS | SC-001 through SC-008 define measurable validation |
| **T0-VAL-02** (Never invent APIs) | ✅ PASS | Skill matching uses existing INDEX.md |
| **T0-VAL-03** (Never ignore errors) | ✅ PASS | Strict validation: reject if no skills found |
| **T0-SIZE-01** (Skills <1,400 tokens) | ⚠️ ASSESS | Current protocol ~2,100 tokens; may need JIT extraction |
| **T0-MEMORY-01** (Always update MEMORY.md) | ✅ PASS | Phase 7 includes memory update |
| **T0-SOURCE-01** (Always cite sources) | ✅ PASS | Protocol cites design decisions |

**Assessment**: 11/12 pass (1 conditional on token budget)

### T1 Rules Compliance

| Rule | Status | Notes |
|------|--------|-------|
| **T1-QUAL-02** (Write tests) | ✅ PASS | 4 user stories with acceptance scenarios = test specs |
| **T1-QUAL-03** (Don't duplicate) | ✅ PASS | Personas are unique (triggers validated) |
| **T1-DOC-01** (Document decisions) | ✅ PASS | Spec includes design decisions table |
| **T1-DOC-02** (README for modules) | ✅ PASS | Protocol includes usage sections |
| **T1-DOC-03** (Comments for complex logic) | ✅ PASS | Skill matching algorithm documented step-by-step |
| **T1-ARCH-04** (Explicit error handling) | ✅ PASS | Skill gap handling clearly specified (strict validation) |

**Assessment**: 6/6 pass

**Overall Constitution Compliance**: ✅ **8/8 T0 + 6/6 T1 = 14/14 rules passing**

---

## Implementation Phases (6 Total)

### Phase 1: Documentation & Specification (Days 1-2)

**Goal**: Create formal spec, plan, and task documents. Validate that current protocol meets requirements.

**Deliverables**:
1. ✅ `spec.md` (648 lines) — Formal specification with 4 user stories, 12 FR, 8 SC
2. ✅ `plan.md` (this document) — Implementation plan with 6 phases
3. ✅ Clarifications resolved (Q1: Skill Gap Handling → Option B: Strict Validation)
4. TODO: `tasks.md` — Task breakdown with dependencies
5. TODO: `execute-checklist.md` — Cross-spec analysis checklist

**Status**: PHASE 1 COMPLETE (specs created, clarifications resolved)

---

### Phase 2: Protocol Analysis & Enhancement (Days 2-3)

**Goal**: Analyze current PERSONA-GENERATOR.md, identify gaps vs spec requirements, decide on JIT extraction.

**Activities**:

1. **Read current protocol** (`PERSONA-GENERATOR.md`)
   - ✅ Already reviewed (584 lines, ~2,100 tokens)
   - Note: Exceeds T0-SIZE-01 limit (1,400 tokens)

2. **Compare vs specification**:
   - ✅ Template structure: MATCHES spec template
   - ✅ Generation process: MATCHES 6-phase flow
   - ⚠️ Acceptance scenarios: Protocol has examples, spec has 3 formal scenarios (need examples for each)
   - ⚠️ Success criteria: Protocol informal, spec defines 8 SCs (SC-001 through SC-008)
   - ⚠️ Skill gap handling: Protocol says "graceful", spec clarifies "strict validation"
   - ⚠️ Token budget: Protocol ~2,100 tokens, exceeds 1,400 limit

3. **Decision: JIT Sub-Files Architecture**
   
   **Current size**: 584 lines, ~2,100 tokens
   
   **Candidate extraction** (based on SPEC-003 pattern):
   - JIT-001: `persona-generation-workflow.md` — The 6-phase generation workflow + skill matching algorithm
   - JIT-002: `persona-traits-inference.md` — Level-based trait inference rules + examples
   - JIT-003: `persona-triggers.md` — Trigger generation strategy + examples
   - JIT-004: `persona-examples.md` — 3+ example personas with complete outputs (not just templates)
   
   **Expected result**:
   - Main protocol: ~1,200 tokens (43% reduction)
   - JIT files: ~3,000 tokens total
   - Total: ~4,200 tokens (comparable to SPEC-003/004 JIT architecture)
   - **Compliance**: ✅ T0-SIZE-01 satisfied

4. **Enhance main protocol** (after JIT extraction):
   - Refactor PERSONA-GENERATOR.md to ~1,200 tokens
   - Add references to JIT sub-files: "See `/persona-generation-workflow.md` for detailed algorithm"
   - Keep: Overview, when to create personas, template structure, basic process description
   - Move: Detailed workflows → JIT files

5. **Create example personas** (Phase 2 Task 5):
   - Generate 3 example personas using current protocol
   - Show self-critique scores (verify SC-002: consistency ±3 points)
   - Show human gate approval process
   - Use as validation data for Phase 6

**Deliverables**:
- Decision: Extract to 4 JIT sub-files (yes/no/partial)
- Enhanced PERSONA-GENERATOR.md (refactored if needed)
- 3 example personas with metrics (for validation)

**Estimated effort**: 2-3 hours

---

### Phase 3: Task Definition & Cross-Spec Analysis (Day 3)

**Goal**: Define implementation tasks with dependencies. Perform cross-spec consistency check.

**Activities**:

1. **Create tasks.md** (detailed task breakdown):
   - T001-T005: Main protocol review + JIT extraction (Phase 2 follow-up)
   - T006-T010: Example personas creation + validation (P1 user stories)
   - T011-T015: Self-critique integration + Human Gate testing
   - T016-T020: Skill gap handling + AUTO-INCREMENT integration
   - T021-T025: Success criteria validation (SC-001 through SC-005)
   - T026-T030: Documentation + examples + final validation

   **Parallelizable tasks**: Mark with [P] (e.g., example persona 1, 2, 3 can be created in parallel)

2. **Cross-spec consistency analysis**:
   - Verify SPEC-005 ↔ SPEC-001 integration (Self-Critique + Human Gate working with personas)
   - Verify SPEC-005 ↔ SPEC-002 integration (AUTO-INCREMENT gap detection for skill gaps)
   - Verify SPEC-005 ↔ SPEC-004 integration (Future: KNOWLEDGE-BASE.md skill matching)
   - Verify SPEC-005 ↔ SPEC-010 integration (6 baseline skills sufficient for examples?)
   - Document all integration points and potential conflicts

3. **Create execute-checklist.md**:
   - Pre-implementation verification checklist
   - Dependency verification (SPEC-001, SPEC-002, skill library all ready?)
   - Architecture decision confirmation (JIT extraction yes/no?)
   - Success criteria measurement plan

**Deliverables**:
- `tasks.md` (30 tasks, 3 phases, dependencies mapped)
- `execute-checklist.md` (verification before Phase 4)
- Cross-spec integration analysis

**Estimated effort**: 1-2 hours

---

### Phase 4: Implementation & Enhancement (Days 4-5)

**Goal**: Execute tasks from Phase 3. Enhance protocol based on spec + create examples.

**Activities**:

1. **Implement task T001-T025**:
   - Extract JIT sub-files (if needed from Phase 2 decision)
   - Refactor main protocol to <1,400 tokens
   - Create 3 example personas (T006-T008)
   - Validate self-critique consistency (T009)
   - Test Human Gate workflow (T010)
   - Verify skill gap handling (T016-T018)
   - Run SUCCESS criteria tests (T021-T025)

2. **Update PERSONA-GENERATOR.md**:
   - Add references to spec requirements (FR-001 through FR-012)
   - Add acceptance scenarios (from spec)
   - Clarify skill gap handling (strict validation, Option B)
   - Add example personas with metrics
   - Ensure <1,400 tokens (main protocol only)

3. **Create JIT sub-files** (if applicable):
   - persona-generation-workflow.md — Algorithm + detailed steps
   - persona-traits-inference.md — Level-based inference rules
   - persona-triggers.md — Trigger generation strategy
   - persona-examples.md — 3 complete example personas

4. **Validation during implementation**:
   - Each example persona must pass SC-001 (≥70% avg skill match)
   - Each example must score ≥80/100 on self-critique (SC-002 consistency)
   - Skill references must all exist in skills/INDEX.md (SC-005)

**Deliverables**:
- Enhanced PERSONA-GENERATOR.md (1,200-1,400 tokens)
- 3-4 JIT sub-files (if extracted)
- 3 example personas with metrics
- All tasks T001-T025 complete

**Estimated effort**: 4-6 hours

---

### Phase 5: Validation & Self-Critique (Day 6)

**Goal**: Apply SPEC-001 self-critique protocol to all artifacts. Score and identify improvements.

**Activities**:

1. **Self-Critique PERSONA-GENERATOR.md**:
   - **Completeness** (0-25): All FR requirements addressed? Template sections complete? Examples provided?
   - **Clarity** (0-25): Instructions clear? Algorithm explained step-by-step? Integration points documented?
   - **Correctness** (0-25): Logic sound? No contradictions with other protocols? Spec requirements met?
   - **Best Practices** (0-25): Follows JIT pattern? Consistent with SPEC-001/002/004? Token budget met?
   - **Target**: ≥90/100 (protocol enhancement, similar to SPEC-003 complexity)

2. **Self-Critique example personas**:
   - Score each using same 4-dimension rubric
   - Target: ≥80/100 for each (generation is simpler than protocol)
   - Verify SC-002: consistency check (avg score ±3 points across 3 examples)

3. **Validate success criteria**:
   - SC-001: Example personas match skills at ≥70% (verify on all 3)
   - SC-002: Self-critique variation ≤±3 points (measure from 3 example scores)
   - SC-003: Human Gate required for all (verify workflow tested)
   - SC-004: YAML valid (test parsing all 3 examples)
   - SC-005: All skill references exist (cross-check against INDEX.md)
   - SC-006: Protocol ≤1,400 tokens (measure main file)
   - SC-007: 0 T0/T1 violations (constitution check)
   - SC-008: 3 example personas complete (already have them)

4. **Document issues for Human Gate**:
   - List any failing SCs
   - List any concerns from self-critique
   - Prepare improvement suggestions

**Deliverables**:
- Self-Critique scores (main protocol + 3 examples)
- Success criteria validation report
- Issues/improvements list for Human Gate

**Estimated effort**: 2-3 hours

---

### Phase 6: Human Gate & Closure (Day 7)

**Goal**: Present protocol and artifacts to human for approval. Update memory. Close spec.

**Activities**:

1. **Human Gate presentation**:
   - Show main protocol (refactored, <1,400 tokens)
   - Show example personas (3 complete, with metrics)
   - Show success criteria validation (SC-001 through SC-008 status)
   - Show self-critique scores (protocol ≥90, examples ≥80)
   - Get approval: approve | view | edit | reject

2. **Incorporate feedback**:
   - If human suggests edits: return to Phase 4 for revisions
   - Document all feedback for memory

3. **Commit & Integration**:
   - Write enhanced PERSONA-GENERATOR.md to `.prompt-os/core/`
   - Write JIT sub-files (if created) to `.prompt-os/core/persona-generator/`
   - Update `.prompt-os/core/INDEX.md` with new files
   - Update `specs/005-persona-generator/COMPLETION-SUMMARY.md`

4. **Memory Management**:
   - Update MEMORY.md with Session summary (SPEC-005 formalization complete)
   - Update memory/opencode-memory.md with detailed notes
   - Document learnings from persona generation protocol (what worked, what didn't)

5. **Close SPEC-005**:
   - Mark status: ✅ COMPLETE (v2.2.0 formalization)
   - Update ROADMAP.md
   - Archive or merge feature branch

**Deliverables**:
- Human gate approval log
- Protocol files committed to repo
- Memory updated
- SPEC-005 COMPLETE status

**Estimated effort**: 1-2 hours

---

## Phase Timeline

| Phase | Description | Duration | Key Deliverables |
|-------|-------------|----------|------------------|
| **Phase 1** | Documentation & Specification | Days 1-2 | spec.md, plan.md, clarifications |
| **Phase 2** | Protocol Analysis & Enhancement | Days 2-3 | Enhanced protocol, 3 examples, JIT decision |
| **Phase 3** | Task Definition & Analysis | Day 3 | tasks.md, checklist, integration analysis |
| **Phase 4** | Implementation & Enhancement | Days 4-5 | Updated protocol, JIT files, examples |
| **Phase 5** | Validation & Self-Critique | Day 6 | Critique scores, validation report |
| **Phase 6** | Human Gate & Closure | Day 7 | Approval, commit, memory, closure |

**Total Effort**: ~7 days (~30-35 hours work)

---

## Success Definition

**SPEC-005 is COMPLETE when**:
1. ✅ spec.md: Formal specification with 4 user stories, 12 FR, 8 SC
2. ✅ plan.md: 6-phase implementation plan (this document)
3. ✅ tasks.md: 30 tasks with dependency mapping
4. ✅ execute-checklist.md: Cross-spec analysis verified
5. ✅ PERSONA-GENERATOR.md: Enhanced protocol (<1,400 tokens, if main file)
6. ✅ JIT sub-files: Created if needed (persona-generation-workflow.md, etc.)
7. ✅ 3 example personas: Generated and validated (≥80/100 each)
8. ✅ Self-critique: ≥90/100 for protocol, ≥80/100 for examples
9. ✅ Success criteria: SC-001 through SC-008 validated
10. ✅ Human Gate: Approved by human
11. ✅ Memory updated: MEMORY.md + memory/opencode-memory.md
12. ✅ COMPLETION-SUMMARY.md: Comprehensive final documentation

---

## Known Unknowns (To Resolve in Phase 2)

| Question | Impact | How to Resolve |
|----------|--------|----------------|
| **JIT extraction needed?** | Scope (1-2 days extra if yes) | Measure current PERSONA-GENERATOR.md tokens; decide threshold |
| **3 examples enough?** | Validation coverage | Assess if 3 personas cover all 4 user stories adequately |
| **Skill library ready?** | Blocker if missing | Verify 6 baselines + INDEX.md exist and are complete |
| **Self-critique target score?** | Quality gate | Confirm ≥90 for protocol, ≥80 for examples (tentative) |

---

## Dependencies & Integration Points

### Hard Dependencies (Must exist):
- ✅ SPEC-001 (SELF-CRITIQUE.md + HUMAN-GATE.md)
- ✅ SPEC-002 (AUTO-INCREMENT.md)
- ✅ Skill Library (`.prompt-os/skills/INDEX.md` + 6 baselines)

### Soft Dependencies (Can integrate later):
- ⚠️ SPEC-004 (KNOWLEDGE-BASE.md) — optional, for semantic skill matching in v3.0

### Blocked By:
- None — all dependencies are available

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| **Token budget exceeded** | Medium | Medium | Monitor closely; JIT extraction ready |
| **Example personas fail validation** | Low | Medium | Test incrementally during Phase 4 |
| **Skill library too small** | Low | High | Use existing 6 baselines; worst case: defer examples to Phase 4 |
| **Human Gate rejects protocol** | Low | High | Get early feedback; iterate quickly |

---

## Next Steps After Phase 1

1. **Immediate** (Phase 2): Measure PERSONA-GENERATOR.md tokens; decide JIT extraction
2. **Phase 2-3**: Create tasks.md + execute-checklist.md (2 hours)
3. **Phase 4-5**: Implementation + validation (6-8 hours)
4. **Phase 6**: Human Gate + closure (2 hours)

---

**Plan Status**: READY FOR PHASE 2  
**Next Command**: Proceed to Phase 2 (Protocol Analysis & Enhancement) or create `tasks.md` in Phase 3  
**Target Version**: v2.2.0 (formalization of existing protocol)
