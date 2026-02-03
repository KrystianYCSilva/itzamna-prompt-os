# Implementation Plan: Auto-Increment Protocol

**Branch**: `002-auto-increment` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-auto-increment/spec.md`

**Note**: This feature is **already implemented** as a prompt-based protocol in `.prompt-os/core/AUTO-INCREMENT.md` (v2.0.0). This plan formalizes the implementation and validates it against the specification.

## Summary

The Auto-Increment Protocol enables the PromptOS system to evolve autonomously by:
1. **Gap Detection**: Detecting missing skills when users request non-existent topics
2. **Rejection Learning**: Categorizing and learning from Human Gate rejections to improve future generations
3. **Proactive Suggestions**: Suggesting skill creation when same gap appears 2+ times
4. **Evolution Reports**: Generating periodic reports showing system growth and improvement patterns

**Technical Approach**: Prompt-based implementation using Markdown instructions that AI agents read and follow. Uses distributed memory architecture where each agent maintains its own memory file (`MEMORY/{agente}-memory.md`) for session-local logs, eliminating concurrent write conflicts.

## Technical Context

**Language/Version**: Markdown (AI-readable instructions), no runtime language required  
**Primary Dependencies**: 
  - `.prompt-os/core/AUTO-INCREMENT.md` (existing implementation)
  - `.prompt-os/core/SELF-CRITIQUE.md` (SPEC-001, for quality scoring)
  - `.prompt-os/core/HUMAN-GATE.md` (SPEC-001, for rejection capture)
  - `.prompt-os/core/INPUT-CLASSIFIER.md` (for topic extraction)
  - `.prompt-os/core/JIT-PROTOCOL.md` (for skill search)

**Storage**: 
  - Distributed memory: `MEMORY/{agente}-memory.md` (per-agent gap and rejection logs)
  - Global statistics: `MEMORY.md` (root, shared stats: skills total, approval rate, etc.)
  - Skills registry: `.prompt-os/skills/INDEX.md` (to detect gaps)

**Testing**: Manual validation via spec acceptance scenarios (no automated test framework for prompt-based protocols)  

**Target Platform**: Any AI agent capable of reading Markdown and following structured instructions  

**Project Type**: Prompt-based protocol (documentation + validation)  

**Performance Goals**: 
  - SC-004: Evolution report generation <10 seconds
  - SC-007: Proactive suggestions within 1 interaction after 2nd gap
  - 100% rejection categorization accuracy (SC-006)

**Constraints**: 
  - Prompt-based only (no code execution)
  - Human Gate required for all skill creation/modification (FR-012)
  - Keyword-based categorization only (no ML/NLP)
  - Memory distributed per-agent (no centralized database)

**Scale/Scope**: 
  - Supports unlimited agents (each maintains own memory)
  - Tracks all gaps and rejections indefinitely (manual archival only)
  - Aggregates cross-agent data for evolution reports on-demand

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### T0 (INVIOLABLE) - Compliance Status

| Rule | Status | Verification |
|------|--------|--------------|
| **T0-SEC-01**: No hardcoded secrets | ✅ PASS | N/A - Prompt protocol has no code with secrets |
| **T0-SEC-02**: No SQL injection | ✅ PASS | N/A - No database queries in prompt protocol |
| **T0-SEC-03**: No sensitive data in logs | ✅ PASS | Agent memory logs contain only skill names, categories, timestamps |
| **T0-SEC-04**: No disabled security | ✅ PASS | N/A - Prompt protocol has no security layers to disable |
| **T0-HUMAN-01**: Significant changes require approval | ✅ PASS | FR-012: NEVER auto-create/modify skills, Human Gate always required |
| **T0-HUMAN-02**: NEVER auto-commit | ✅ PASS | Spec explicitly requires human approval for all skill operations |
| **T0-HUMAN-03**: NEVER auto-push | ✅ PASS | Out of scope for this protocol |
| **T0-HUMAN-04**: NEVER delete without confirming | ✅ PASS | Protocol only creates/logs, never deletes |
| **T0-STRUCT-01**: CARD-FIRST for features | ✅ PASS | Using SpecKit workflow (specify → clarify → plan → tasks → implement) |
| **T0-STRUCT-02**: Maintain folder structure | ✅ PASS | All files in `.prompt-os/core/` following existing structure |
| **T0-STRUCT-03**: No files outside scope | ✅ PASS | Only modifies agent memory files in `MEMORY/` and root `MEMORY.md` |
| **T0-VAL-01**: NEVER claim success without verification | ✅ PASS | Spec includes testable acceptance scenarios for validation |
| **T0-VAL-02**: NEVER invent APIs | ✅ PASS | Protocol uses existing protocols (SELF-CRITIQUE, HUMAN-GATE, etc.) |
| **T0-VAL-03**: NEVER ignore errors | ✅ PASS | Protocol defines explicit error handling (e.g., vague topics, unmatched categories) |

### T1 (STRONG) - Compliance Status

| Rule | Status | Notes |
|------|--------|-------|
| **T1-QUAL-01**: SOLID principles | ⚠️ JUSTIFIED | Prompt protocol, not code. Single Responsibility applies to protocol sections. |
| **T1-QUAL-02**: Write tests | ⚠️ JUSTIFIED | No automated testing for prompt protocols. Manual validation via acceptance scenarios. |
| **T1-QUAL-03**: Don't duplicate code (DRY) | ✅ PASS | Protocol references existing protocols instead of duplicating instructions |
| **T1-QUAL-04**: Small focused functions | ✅ PASS | Protocol divided into focused sections (Gap Detection, Rejection Learning, etc.) |
| **T1-QUAL-05**: Descriptive names | ✅ PASS | Clear naming: GapRecord, RejectionRecord, PatternAnalysis, EvolutionReport |
| **T1-ARCH-01**: Layer separation | ✅ PASS | Protocol integrates with other protocols (SELF-CRITIQUE, HUMAN-GATE) via clear interfaces |
| **T1-ARCH-02**: Dependency Injection | N/A | Prompt protocol concept, not applicable |
| **T1-ARCH-03**: Interfaces for dependencies | ✅ PASS | Protocol defines integration points with other protocols |
| **T1-ARCH-04**: Explicit error handling | ✅ PASS | Edge cases documented in spec (vague topics, unmatched categories, etc.) |
| **T1-DOC-01**: Document decisions | ✅ PASS | Spec documents all assumptions, dependencies, architectural decisions |
| **T1-DOC-02**: README for modules | ✅ PASS | AUTO-INCREMENT.md serves as protocol documentation |
| **T1-DOC-03**: Comments for complex logic | ✅ PASS | Protocol includes examples and checklists for clarity |
| **T1-DOC-04**: CHANGELOG | ✅ PASS | MEMORY.md tracks protocol evolution across versions |
| **T1-PERF-01**: Optimize queries | N/A | No database queries in prompt protocol |
| **T1-PERF-02**: Use caching | ✅ PASS | Agent memory files serve as persistent cache |
| **T1-PERF-03**: Lazy loading | ✅ PASS | Agents only read their own memory, not all agent memories |

### Gate Evaluation

✅ **GATE PASSED** - No T0 violations. All T1 exceptions justified for prompt-based architecture.

**Re-evaluation Required**: After Phase 1 design, verify that documentation artifacts don't introduce new T0/T1 concerns.

## Project Structure

### Documentation (this feature)

```text
specs/002-auto-increment/
├── spec.md              # Feature specification (COMPLETE)
├── plan.md              # This file (Phase 0 output)
├── research.md          # Phase 0: Validation research (TO BE CREATED)
├── data-model.md        # Phase 1: Entity specifications (TO BE CREATED)
├── quickstart.md        # Phase 1: Usage guide (TO BE CREATED)
├── contracts/           # Phase 1: Protocol interaction contracts (TO BE CREATED)
│   ├── gap-detection-contract.md
│   ├── rejection-learning-contract.md
│   ├── proactive-suggestions-contract.md
│   └── evolution-reports-contract.md
├── pre-spec.md          # Historical pre-spec (reference only)
└── checklists/
    └── requirements.md  # Spec validation checklist (COMPLETE)
```

### Existing Implementation

```text
.prompt-os/core/
└── AUTO-INCREMENT.md    # Existing prompt-based implementation (v2.0.0)
                         # Status: Implemented, needs validation against spec

MEMORY/
└── {agente}-memory.md   # Per-agent memory files (distributed architecture)
                         # Created automatically by agents as needed

MEMORY.md                # Global statistics (root)
                         # Updated by agents for global metrics
```

**Structure Decision**: This is a **validation and documentation project**, not a code development project. The implementation already exists as `.prompt-os/core/AUTO-INCREMENT.md`. This plan focuses on:
1. Validating existing implementation against spec requirements
2. Creating formal data model documentation
3. Creating protocol contracts for integration points
4. Creating quickstart guide for agents

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*No violations requiring justification. All T1 exceptions are standard for prompt-based protocols.*

---

## Phase 0: Research & Validation

**Goal**: Validate that existing `.prompt-os/core/AUTO-INCREMENT.md` implementation satisfies all spec requirements, and research any gaps.

### Research Tasks

1. **Validate Implementation Coverage**
   - Map all 13 Functional Requirements (FR-001 to FR-013) to sections in AUTO-INCREMENT.md
   - Identify any missing requirements
   - Identify any implementation features not in spec

2. **Validate Data Model**
   - Verify GapRecord fields are logged in agent memory
   - Verify RejectionRecord fields are logged in agent memory
   - Verify PatternAnalysis calculation matches spec (>30% threshold)
   - Verify EvolutionReport structure matches spec

3. **Validate Integration Points**
   - Verify SELF-CRITIQUE integration (FR-011)
   - Verify HUMAN-GATE integration (FR-012)
   - Verify INPUT-CLASSIFIER integration (topic extraction)
   - Verify JIT-PROTOCOL integration (skill search)
   - Verify Skills INDEX integration (FR-001)

4. **Validate Edge Cases**
   - Verify handling of 6 edge cases documented in spec
   - Check for any edge cases in implementation not in spec

5. **Research Best Practices**
   - Prompt engineering patterns for categorization (keyword matching)
   - Memory file growth management strategies
   - Cross-agent aggregation patterns for reporting

**Output**: `research.md` documenting validation results and any gaps found.

---

## Phase 1: Design & Contracts

**Prerequisites**: Phase 0 research complete, all gaps identified and resolved.

### 1. Data Model Documentation

**File**: `data-model.md`

Document the four key entities with complete field specifications:

```markdown
# Data Model: Auto-Increment Protocol

## GapRecord

Logged in: `MEMORY/{agente}-memory.md` under section "## Gaps Detectados"

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| date | Date (YYYY-MM-DD) | Yes | Detection date | 2026-02-03 |
| user_request | Text | Yes | Original user request | "Como usar Kafka?" |
| suggested_skill_name | kebab-case | Yes | Derived skill name | kafka-basics |
| status | Enum | Yes | pending/created/deferred/rejected | pending |
| detection_count | Integer | No | Times detected | 2 |
| first_detected | Timestamp | Yes | First occurrence | 2026-02-03T10:00:00 |
| last_detected | Timestamp | Yes | Most recent occurrence | 2026-02-03T14:00:00 |

... (continue for all 4 entities)
```

### 2. Protocol Contracts

**Directory**: `contracts/`

Create four contract files documenting interaction patterns:

#### `contracts/gap-detection-contract.md`
- **Trigger**: User request for non-existent skill
- **Input**: User request text, skills INDEX
- **Process**: Search INDEX → Extract topic → Derive skill name → Log gap
- **Output**: User notification with 3 options, gap logged in agent memory
- **Integration**: INPUT-CLASSIFIER (topic extraction), JIT-PROTOCOL (skill search)

#### `contracts/rejection-learning-contract.md`
- **Trigger**: Human rejects artifact at Human Gate
- **Input**: Rejection reason (text), artifact metadata
- **Process**: Categorize reason → Log in memory → Check for patterns (>30%)
- **Output**: Acknowledgment, pattern detection if threshold met
- **Integration**: HUMAN-GATE (rejection capture), SELF-CRITIQUE (score tracking)

#### `contracts/proactive-suggestions-contract.md`
- **Trigger**: Gap detected 2+ times OR low score (<60) detected
- **Input**: Agent memory (gaps log, Self-Critique scores)
- **Process**: Count gap occurrences → Generate suggestion message
- **Output**: Proactive suggestion to user
- **Integration**: Agent memory read, SELF-CRITIQUE scores

#### `contracts/evolution-reports-contract.md`
- **Trigger**: User requests "Generate evolution report"
- **Input**: All agent memory files, global MEMORY.md
- **Process**: Aggregate gaps/rejections → Calculate statistics → Format markdown
- **Output**: Evolution report with 4 sections (Summary, Top Gaps, Patterns, Actions)
- **Integration**: Read all `MEMORY/{agente}-memory.md` files, read root `MEMORY.md`

### 3. Quickstart Guide

**File**: `quickstart.md`

```markdown
# Quickstart: Auto-Increment Protocol

## For AI Agents

### Gap Detection
When user requests unknown topic:
1. Search `.prompt-os/skills/INDEX.md`
2. If not found → Read `.prompt-os/core/AUTO-INCREMENT.md` § Gap Detection
3. Follow 3-step flow: Detect → Inform → Log

### Rejection Learning
When artifact rejected at Human Gate:
1. Read `.prompt-os/core/AUTO-INCREMENT.md` § Rejection Learning
2. Categorize reason using keyword matching
3. Log in your `MEMORY/{agente}-memory.md`
4. Check if category >30% of total → mention in next generation

### Proactive Suggestions
On session start or context match:
1. Read your `MEMORY/{agente}-memory.md`
2. Check for gaps with count ≥ 2
3. Proactively suggest skill creation

### Evolution Reports
When user requests report:
1. Read all `MEMORY/*/memory.md` files
2. Read root `MEMORY.md` for global stats
3. Follow report format in AUTO-INCREMENT.md § Evolution Reports

## For Humans

### Triggering Gap Detection
Simply ask about a topic not in the system:
- "How do I use Kafka?"
- System will detect gap and offer creation

### Providing Rejection Feedback
At Human Gate, provide specific reasons:
- ✅ "Examples don't work" → categorized as 'examples'
- ✅ "Too generic" → categorized as 'specificity'
- ❌ "Bad" → categorized as 'other' (not actionable)

### Requesting Evolution Reports
- Ask: "Generate evolution report"
- Or: "Show me system growth this month"

## Testing

Use acceptance scenarios from spec.md § User Scenarios.
```

### 4. Agent Context Update

**Action**: Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType opencode`

This will update `.opencode/context.md` (or equivalent) with:
- New technology: Prompt-based protocol architecture
- New dependencies: AUTO-INCREMENT.md integration points
- Preserve existing manual additions

---

## Phase 2: Task Breakdown

**Note**: This phase is handled by `/speckit.tasks` command (NOT part of `/speckit.plan`).

Expected task structure:
- T001: Validate FR-001 to FR-013 against AUTO-INCREMENT.md
- T002: Document gaps found (if any)
- T003: Create data-model.md
- T004: Create contracts/ (4 files)
- T005: Create quickstart.md
- T006: Validate all 7 Success Criteria
- T007: Update agent context
- T008: Final review and spec alignment check

---

## Validation Strategy

### Acceptance Criteria Validation

| Success Criterion | Validation Method | Expected Result |
|-------------------|-------------------|-----------------|
| SC-001: 90% gap detection | Manual test: Request 10 non-existent skills, verify 9+ detected | 9+ gaps logged |
| SC-002: 20% rejection decrease | Historical analysis after 30 days (requires time) | Tracked in MEMORY.md |
| SC-003: 3 skills/month from gaps | Count skills with "from gap" status in memories | ≥3 per month |
| SC-004: Report <10s | Time evolution report generation | <10 seconds |
| SC-005: 30% faster resolution | Compare gap-to-skill time before/after 5 gaps | 30% reduction |
| SC-006: 100% rejection logging | Reject 10 artifacts, verify 10 logged | 10/10 logged |
| SC-007: Suggestions within 1 interaction | Log 2 same gaps, verify suggestion appears | Suggestion shown |

### Implementation Completeness Check

For each FR, verify existence in AUTO-INCREMENT.md:

- [ ] FR-001: Skill existence detection → § Gap Detection Phase 1
- [ ] FR-002: User notification with 3 options → § Gap Detection Phase 2
- [ ] FR-003: Gap logging to agent memory → § Gap Detection Phase 3
- [ ] FR-004: Rejection categorization (6 categories) → § Rejection Learning / Categorias
- [ ] FR-005: Rejection logging to agent memory → § Rejection Learning / Registro
- [ ] FR-006: Pattern identification (>30%) → § Rejection Learning / Aplicar Aprendizado
- [ ] FR-007: Proactive corrections → § Rejection Learning / Aplicar Aprendizado
- [ ] FR-008: Skill suggestions (2+ gaps) → § Proactive Suggestions / Quando Sugerir
- [ ] FR-009: Low score/old skill suggestions → § Proactive Suggestions / Sugestoes de Melhoria
- [ ] FR-010: Evolution report generation → § Evolution Reports
- [ ] FR-011: Self-Critique integration → § Integracao com SELF-CRITIQUE
- [ ] FR-012: No auto-creation → § Principios Fundamentais
- [ ] FR-013: Distributed memory architecture → § Clarifications (added in spec)

---

## Deliverables Summary

**Phase 0 (Research)**: 
- ✅ `research.md` - Implementation validation report

**Phase 1 (Design)**:
- ✅ `data-model.md` - 4 entities fully specified
- ✅ `contracts/` - 4 protocol contracts
- ✅ `quickstart.md` - Agent and human usage guide
- ✅ Updated agent context (`.opencode/context.md` or equivalent)

**Phase 2 (Tasks)**:
- Handled by `/speckit.tasks` command (see tasks.md after running command)

---

## Next Steps

1. **Run Phase 0**: Create `research.md` by validating AUTO-INCREMENT.md against spec
2. **Review findings**: Check if any gaps need to be filled in implementation
3. **Run Phase 1**: Create data-model.md, contracts/, quickstart.md
4. **Update agent context**: Run update-agent-context script
5. **Invoke `/speckit.tasks`**: Break Phase 2 into atomic tasks
6. **Execute tasks**: Validate and document per task list

---

**Plan Status**: Phase 0-1 planned, ready for execution  
**Branch**: `002-auto-increment`  
**Next Command**: Begin Phase 0 research by reading `.prompt-os/core/AUTO-INCREMENT.md`
