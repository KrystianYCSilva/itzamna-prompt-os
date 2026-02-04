# Tasks: Persona Generator Protocol Enhancement (SPEC-005a)

**Input**: Specification from `specs/005-persona-generator/spec.md`  
**Prerequisites**: spec.md, plan.md, `.prompt-os/core/PERSONA-GENERATOR.md` (existing protocol)  
**Organization**: Tasks grouped by implementation phase. Parallelizable tasks marked [P]

---

## Phase 4: Task Definition (30 Total Tasks)

**Phases in this task list**:
- **Phase 4**: Protocol Analysis & Task Planning (T001-T010) — Analyze current protocol, plan JIT extraction, prepare implementation
- **Phase 5**: Protocol Enhancement & JIT Creation (T011-T020) — Implement changes, create JIT sub-files, generate examples
- **Phase 6**: Validation & Testing (T021-T025) — Self-critique, success criteria validation
- **Phase 7**: Human Gate & Closure (T026-T030) — Approval, commit, memory management

**Parallelizable tasks**: Marked [P] can be executed concurrently

---

## Phase 4: Protocol Analysis & Task Planning (Days 1-2)

**Purpose**: Analyze current PERSONA-GENERATOR.md, identify gaps vs spec, plan JIT extraction.

### T001: Measure Current Protocol Size and Tokens

- [ ] Read `.prompt-os/core/PERSONA-GENERATOR.md` in full (584 lines currently)
- [ ] Count exact line count
- [ ] Estimate token count using OpenAI tokenizer or manual estimation (~3.5 chars = 1 token)
- [ ] **Decision point**: If ≥1,400 tokens → extract to JIT sub-files (go to T002); if <1,400 → minimal refactoring (skip to T003)
- [ ] Document measurements in plan.md

**Estimated effort**: 0.5 hour

---

### T002: Plan JIT Sub-File Extraction (Conditional on T001)

**Prerequisite**: T001 decision = need JIT extraction

- [ ] Identify candidate sections for JIT extraction:
  - Section: "PROCESSO DE GERACAO" (6 phases + workflow) → JIT-001: persona-generation-workflow.md
  - Section: "Fase 3: Inferir Atributos" + "PERSONAS ESPECIALIZADAS" → JIT-002: persona-traits-inference.md
  - Section: "TRIGGERS" + "Gerando Triggers" → JIT-003: persona-triggers.md
  - Section: "EXEMPLO COMPLETO" + need 2 additional examples → JIT-004: persona-examples.md

- [ ] For each JIT candidate:
  - Estimate token count if extracted
  - Verify cross-references (links between main and JIT files)
  - Plan ordering (JIT-001 referenced first, then 002, 003, 004)

- [ ] Create extraction mapping:
  - Main protocol: Keep overview, template, integration sections (~1,200 tokens)
  - JIT files: Move detailed algorithms, examples, specialized rules (~3,000 tokens total)

**Estimated effort**: 1 hour

---

### T003: Compare Current Protocol vs Spec Requirements

- [ ] Spec FR-001 through FR-012: Check which are mentioned in current protocol
- [ ] Spec SC-001 through SC-008: Check which have acceptance scenarios
- [ ] Spec User Stories 1-4: Map to protocol sections

| Requirement | Status | Protocol Section | Gap? |
|-------------|--------|------------------|------|
| FR-001: Natural language persona generation | ✅ | "PROCESSO DE GERACAO" | No |
| FR-002: Skill composition (3-5 core, 2-3 secondary) | ✅ | "COMBINACAO DE SKILLS" | No |
| FR-003: Behavioral trait inference | ✅ | "Fase 3: Inferir Atributos" | No |
| FR-004: Trigger generation | ✅ | "TRIGGERS" | No |
| FR-005: Self-critique integration | ⚠️ | "Fase 5: Self-Critique" | Brief, needs examples |
| FR-006: Human Gate integration | ⚠️ | "Fase 6: Human Gate" | Brief, needs workflow diagram |
| FR-007-008: Persistence + INDEX.md updates | ❌ | Not in protocol | **Missing** |
| FR-009-010: List/Inspect personas | ⚠️ | "COMANDOS DE PERSONA" | Brief, needs details |
| FR-011: Duplicate detection | ❌ | Not in protocol | **Missing** |
| FR-012: Skill validation | ⚠️ | "Fase 4: Gerar Conteudo" | Implicit, needs explicit |

- [ ] Document gaps (mark for enhancement in Phase 5)

**Estimated effort**: 1 hour

---

### T004: [P] Extract Skill Matching Algorithm Details

**Parallelizable with T005-T006**

- [ ] From protocol section "Fase 2: Match de Skills":
  - Extract step-by-step algorithm
  - Document domain matching rules
  - Document keyword extraction logic
  - Document skill scoring formula (40% domain, 30% keywords, 20% tags, 10% description)

- [ ] Verify matches spec requirements (FR-001, FR-002, SC-001)
- [ ] Create detailed algorithm documentation for JIT-001
- [ ] Include example: "Senior backend microservices engineer" → matched skills list

**Estimated effort**: 1.5 hours

---

### T005: [P] Extract Trait Inference Rules

**Parallelizable with T004, T006**

- [ ] From protocol sections "Fase 3: Inferir Atributos" + "PERSONAS ESPECIALIZADAS":
  - Extract level-based inference rules (junior vs mid vs senior vs principal)
  - Extract domain-based inference rules (backend → technical, frontend → UX-conscious, etc.)
  - Extract communication style mapping
  - Extract decision approach mapping

- [ ] Verify matches spec requirements (FR-003, SC-002)
- [ ] Create trait templates (for each level × domain combination)
- [ ] Include validation rules (e.g., "senior level must have ≥5 years implied")

**Estimated effort**: 1.5 hours

---

### T006: [P] Extract Trigger Generation Strategy

**Parallelizable with T004, T005**

- [ ] From protocol section "TRIGGERS":
  - Extract trigger derivation algorithm (4-8 triggers per persona)
  - Document domain triggers
  - Document skill-based triggers
  - Document role triggers
  - Document deduplication rules (no duplicate triggers)

- [ ] Verify matches spec requirements (FR-004)
- [ ] Create examples: 3 personas with trigger lists
- [ ] Document conflict detection (warn if trigger overlaps with existing persona)

**Estimated effort**: 1 hour

---

### T007: Create Implementation Readiness Checklist

- [ ] Verify skill library exists + is populated (`.prompt-os/skills/INDEX.md`)
- [ ] Verify SPEC-001 (SELF-CRITIQUE.md + HUMAN-GATE.md) accessible
- [ ] Verify SPEC-002 (AUTO-INCREMENT.md) accessible
- [ ] Verify `.prompt-os/core/` writable
- [ ] Confirm JIT extraction needed (from T002 decision) or just refactoring
- [ ] Identify team reviewing for Human Gate (T028)

**Output**: execute-checklist.md pre-populated with readiness items

**Estimated effort**: 0.5 hour

---

### T008: Document Technical Unknowns & Resolve

- [ ] Current unknowns from plan.md:
  - Q1: JIT extraction needed? → Resolved in T001-T002
  - Q2: 3 examples enough? → Assess (should cover all 4 user stories)
  - Q3: Skill library sufficient? → Verify against 6 baselines
  - Q4: Self-critique targets realistic? → Confirm ≥90 for protocol, ≥80 for examples

- [ ] For each unknown: research, document decision, update plan.md

**Estimated effort**: 1 hour

---

### T009: Create Phase 5-6 Task Breakdown

- [ ] Break T011-T020 (Phase 5) into granular sub-tasks
- [ ] Estimate effort for each task
- [ ] Identify critical path (tasks blocking others)
- [ ] Identify parallelizable tasks [P]
- [ ] Create Gantt-like timeline

**Estimated effort**: 1 hour

---

### T010: Review Plan with Team (Sync Point)

- [ ] Present Phase 4 findings (T001-T009) to team/stakeholder
- [ ] Confirm JIT extraction decision (from T001-T002)
- [ ] Confirm implementation approach
- [ ] Identify any blockers
- [ ] Get approval to proceed to Phase 5

**Estimated effort**: 0.5 hour (meeting)

**Gate**: If issues identified, return to T001-T008. Otherwise proceed to Phase 5.

---

## Phase 5: Protocol Enhancement & JIT Creation (Days 3-5)

**Purpose**: Enhance PERSONA-GENERATOR.md, create JIT sub-files, generate 3 example personas.

### T011: Refactor Main Protocol File

**Prerequisite**: T001-T002 complete (extraction plan ready)

- [ ] Create new version of PERSONA-GENERATOR.md:
  - Keep sections: Overview, template, when to create, basic integration
  - Add references to JIT sub-files: "See `/persona-generation-workflow.md` for detailed algorithm"
  - Add section: "Success Criteria" (from spec SC-001 through SC-008)
  - Add section: "Acceptance Scenarios" (from spec User Story 1-4)
  - Add example: 1 simple persona generation (high-level)
  - Remove detailed algorithms (moved to JIT)
  - Remove detailed examples (moved to JIT)

- [ ] Ensure <1,400 tokens for main file
- [ ] Verify all 12 FR requirements addressed (cross-reference by FR-ID)
- [ ] Verify YAML template still valid

**Estimated effort**: 2 hours

---

### T012: [P] Create JIT-001: persona-generation-workflow.md

**Parallelizable with T013-T015**
**Prerequisite**: T004 (algorithm extraction), T011 (main protocol done)

- [ ] Content:
  - 6-phase generation workflow (describe → match → infer → compose → validate → approve)
  - Detailed skill matching algorithm (from T004)
  - Scoring formula with worked examples
  - Edge cases handling
  - Integration with AUTO-INCREMENT.md (skill gap handling)

- [ ] Structure:
  - Algorithm steps (numbered, with pseudo-code if helpful)
  - Worked example: "Senior backend microservices" → 5 skills selected, scored 0.70-0.95
  - Decision tree: domain → keywords → skills → scoring

- [ ] Target: ~800 tokens

**Estimated effort**: 2 hours

---

### T013: [P] Create JIT-002: persona-traits-inference.md

**Parallelizable with T012, T014**
**Prerequisite**: T005 (trait rules), T011 (main protocol done)

- [ ] Content:
  - Level-based inference rules (4 levels: junior, mid, senior, principal)
  - Domain-based specialization rules (8 domains: frontend, backend, devops, security, mobile, database, data-science, fullstack)
  - Trait combinations (level × domain = unique persona type)
  - Examples: 4 persona archetypes (junior frontend, senior backend, etc.)

- [ ] Structure:
  - Table: Level × Communication Style
  - Table: Domain × Decision Approach
  - Example personas with full trait profiles
  - Validation rules (e.g., "senior must not be inexperienced")

- [ ] Target: ~900 tokens

**Estimated effort**: 2 hours

---

### T014: [P] Create JIT-003: persona-triggers.md

**Parallelizable with T012, T013**
**Prerequisite**: T006 (trigger rules), T011 (main protocol done)

- [ ] Content:
  - Trigger generation algorithm (4-8 triggers from domains, skills, roles)
  - Domain trigger mapping (backend → "api design", "microservices", "database", etc.)
  - Skill trigger mapping (nodejs-api → "node.js", "rest api", etc.)
  - Role trigger mapping (architect → "system design", "scalability", etc.)
  - Deduplication rules (no exact-match triggers across personas)
  - Conflict detection (warn if new trigger overlaps existing)

- [ ] Examples: 3 personas with complete trigger lists
- [ ] Target: ~700 tokens

**Estimated effort**: 1.5 hours

---

### T015: [P] Create JIT-004: persona-examples.md

**Parallelizable with T012-T014**
**Prerequisite**: T011-T014 (all foundations ready)

- [ ] Content:
  - 3 complete example personas (demonstrating P1 user stories)
  - **Example 1**: "Senior backend engineer specializing in microservices" (User Story 1)
    - Input description
    - Extracted keywords + domains
    - Matched skills (with scores)
    - Generated persona (YAML + Markdown)
    - Self-critique score (expected ≥80/100)
    - Human Gate approval flow

  - **Example 2**: "Junior React developer with TypeScript" (User Story 2)
    - Same structure as Example 1
    - Different level + domain to show inference variation

  - **Example 3**: "DevOps engineer with Kubernetes focus" (User Story 4)
    - Same structure, demonstrating trigger activation

- [ ] For each example: include metrics
  - Skill match scores (SC-001 verification)
  - Self-critique score breakdown (SC-002 verification)
  - YAML validity check (SC-004)
  - Skill reference verification (SC-005)

- [ ] Target: ~1,400 tokens (this file will be larger as it contains 3 full personas)

**Estimated effort**: 3 hours

---

### T016: Validate YAML Frontmatter & Markdown Structure

**Prerequisite**: T011-T015 (main protocol + JIT files created)

- [ ] For main protocol:
  - Parse YAML sections, ensure valid syntax
  - Verify all fields defined in spec template present
  - Check markdown headers (H1, H2, H3) are well-formed
  - Verify code blocks use correct syntax highlighting

- [ ] For each JIT file:
  - Same validation as above
  - Check cross-references (links to other JIT files functional)
  - Verify token count <1,400 (except JIT-004 can be ~1,400)

- [ ] Output: Validation report (any syntax errors or warnings)

**Estimated effort**: 1 hour

---

### T017: Verify Spec Requirements Coverage

**Prerequisite**: T011-T016 (protocol + JIT complete)

| FR ID | Requirement | Protocol Section | JIT Section | Status |
|-------|-------------|-----------------|-------------|--------|
| FR-001 | Natural language → persona | PERSONA-GENERATOR.md + JIT-001 | Generation workflow | ✅/❌ |
| FR-002 | Skill composition (3-5, 2-3) | Template + JIT-001 | Workflow | ✅/❌ |
| FR-003 | Behavioral trait inference | PERSONA-GENERATOR.md + JIT-002 | Traits inference | ✅/❌ |
| FR-004 | Trigger generation | PERSONA-GENERATOR.md + JIT-003 | Triggers | ✅/❌ |
| FR-005 | Self-critique integration | PERSONA-GENERATOR.md | Validation section | ✅/❌ |
| FR-006 | Human Gate integration | PERSONA-GENERATOR.md | Approval section | ✅/❌ |
| FR-007 | Persona persistence | PERSONA-GENERATOR.md | N/A (implicit) | ✅/❌ |
| FR-008 | INDEX.md updates | PERSONA-GENERATOR.md | N/A (implicit) | ✅/❌ |
| FR-009 | List personas | PERSONA-GENERATOR.md | Commands section | ✅/❌ |
| FR-010 | Inspect persona | PERSONA-GENERATOR.md | Commands section | ✅/❌ |
| FR-011 | Duplicate detection | JIT-003 (triggers) | Conflict detection | ✅/❌ |
| FR-012 | Skill validation | JIT-001 + JIT-004 | Validation rules | ✅/❌ |

- [ ] For each ❌: add missing content to protocol or JIT file
- [ ] Iterate until all FR = ✅

**Estimated effort**: 1.5 hours

---

### T018: Create 3 Example Personas with Metrics

**Prerequisite**: T015 (JIT-004 structure ready), T011-T014 (protocol logic defined)

- [ ] Generate **Example 1: Senior Backend Engineer**
  - Description: "Senior backend engineer specializing in microservices with Node.js and Kubernetes"
  - Process: Run through all 6 phases (describe → match → infer → compose → validate → approve)
  - Output: Complete PERSONA.md with YAML + Markdown
  - Metrics:
    - Skill match score: Target ≥70% avg (SC-001)
    - Self-critique score: Target ≥80/100 (SC-002)
    - YAML valid: ✅/❌ (SC-004)
    - Skills exist: Verify against INDEX.md (SC-005)

- [ ] Generate **Example 2: Junior Frontend Developer** (similar process)
- [ ] Generate **Example 3: DevOps Engineer** (similar process)

- [ ] For each example: document in JIT-004 with full output + metrics

**Estimated effort**: 3 hours (1 hour per persona)

---

### T019: Verify Skill Library Completeness

**Prerequisite**: T018 (examples need skill refs)

- [ ] Read `.prompt-os/skills/INDEX.md`
- [ ] Extract all skill names
- [ ] For each skill in Example 1-3:
  - Verify exists in INDEX.md
  - Verify metadata accessible (tags, description, category)
  - If missing: log as gap in AUTO-INCREMENT.md format

- [ ] Output: Skill library readiness report
  - All skills found: ✅ Ready
  - Missing skills: ⚠️ Log gaps, may affect examples

**Estimated effort**: 1 hour

---

### T020: Review Phase 5 Outputs (Sync Point)

- [ ] Present to team:
  - Refactored main protocol (T011)
  - 4 JIT sub-files (T012-T015)
  - 3 example personas with metrics (T018)
  - Spec coverage verification (T017)
  - Skill library readiness (T019)

- [ ] Collect feedback
- [ ] If major issues: return to T011-T019
- [ ] If ready: proceed to Phase 6

**Estimated effort**: 0.5 hour (meeting)

---

## Phase 6: Validation & Testing (Day 6)

**Purpose**: Apply SPEC-001 self-critique, validate success criteria, ensure quality.

### T021: Apply Self-Critique to Main Protocol

**Prerequisite**: T011-T020 (protocol complete)

- [ ] Use SPEC-001 SELF-CRITIQUE.md 4-dimension rubric:
  - **Completeness** (0-25): All FR/SC requirements addressed? All mandatory sections? Examples included?
  - **Clarity** (0-25): Instructions clear? Algorithm step-by-step? Workflows explained? Integration points documented?
  - **Correctness** (0-25): Logic sound? No contradictions with SPEC-001/002/004? All spec requirements met exactly?
  - **Best Practices** (0-25): Follows SPEC-001/002/004 patterns? JIT architecture correct? Token budget met? Constitution compliance?

- [ ] Generate YAML self-critique output:
  ```yaml
  artifact: "PERSONA-GENERATOR.md"
  overall_score: X/100
  dimensions:
    completeness: X/25
    clarity: X/25
    correctness: X/25
    best_practices: X/25
  feedback:
    completeness: "..."
    clarity: "..."
    correctness: "..."
    best_practices: "..."
  suggestions: [...]
  ```

- [ ] Target: ≥90/100
- [ ] If <90: identify gaps, return to T011-T019 for fixes

**Estimated effort**: 2 hours

---

### T022: [P] Self-Critique Example Personas

**Parallelizable with T021**
**Prerequisite**: T018 (examples created)

- [ ] Apply 4-dimension self-critique to each of 3 example personas
- [ ] Target: ≥80/100 each
- [ ] Document scores in JIT-004 (persona-examples.md)
- [ ] SC-002 consistency check: Verify score variation ≤±3 points across 3 personas
  - Example 1 score: X
  - Example 2 score: Y
  - Example 3 score: Z
  - Variation: max(X,Y,Z) - min(X,Y,Z) ≤ 3 ✅/❌

**Estimated effort**: 2 hours (0.5-1 hour per persona)

---

### T023: Validate Success Criteria (SC-001 through SC-008)

**Prerequisite**: T021-T022 (critiques complete), T018 (examples ready)

| SC ID | Criterion | Measurement Method | Result | Status |
|-------|-----------|-------------------|--------|--------|
| SC-001 | Persona generation accuracy (≥70% skill match) | Avg skill scores in 3 examples | (measured in T018) | ✅/❌ |
| SC-002 | Self-critique consistency (±3 points) | Variation across 3 example scores | (measured in T022) | ✅/❌ |
| SC-003 | Human Gate adoption (100% require approval) | All 3 examples require human approval | (by design, verify in T024) | ✅/❌ |
| SC-004 | YAML validity (100% parseable) | Parse YAML in all 4 files (main + JIT-001-004) | (measured in T016) | ✅/❌ |
| SC-005 | Skill reference integrity (100% match INDEX.md) | Cross-check all skills in examples against INDEX.md | (measured in T019) | ✅/❌ |
| SC-006 | Protocol token budget (<1,400 main) | Measure main protocol tokens | (measured in T001, reconfirm) | ✅/❌ |
| SC-007 | Constitution compliance (0 violations) | Check T0/T1 rules | (verify in T026) | ✅/❌ |
| SC-008 | 3+ example personas complete | All 3 examples in JIT-004 with full outputs | (measured in T018) | ✅/❌ |

- [ ] For each ❌: document issue and required fix
- [ ] Generate validation report

**Estimated effort**: 1.5 hours

---

### T024: Test Human Gate Workflow

**Prerequisite**: T018 (examples created), T023 (criteria validated)

- [ ] For each of 3 example personas:
  - Simulate Human Gate workflow
  - Show: preview, score, approve/view/edit/reject options
  - Verify: Human approves (or document feedback if edit needed)
  - Verify: Persona marked approved in documentation

- [ ] Output: Human Gate test report (3 personas, all approved or flagged for edits)

**Estimated effort**: 1 hour

---

### T025: Final Quality Check Before Human Gate

- [ ] Checklist:
  - [ ] Main protocol refactored + <1,400 tokens
  - [ ] 4 JIT files created + token budgets met
  - [ ] 3 examples complete with all metrics
  - [ ] Self-critique: main ≥90, examples ≥80
  - [ ] Success criteria: SC-001 through SC-008 validated
  - [ ] YAML valid + skills verified + no syntax errors
  - [ ] Constitution compliance verified (will formally check in T026)
  - [ ] Human Gate workflow tested

- [ ] If all ✅: ready for Phase 7 (Human Gate + Commit)
- [ ] If any ❌: return to Phase 5 for fixes (T011-T019)

**Estimated effort**: 1 hour

---

## Phase 7: Human Gate & Closure (Day 7)

**Purpose**: Get human approval, commit changes, update memory, close spec.

### T026: Constitution Compliance Check

**Prerequisite**: T025 (quality complete)

- [ ] Verify all 8 T0 rules + 6 T1 rules from plan.md:
  - T0-HUMAN-01: All personas through HUMAN-GATE ✅
  - T0-HUMAN-02: Never auto-commit ✅
  - T0-HUMAN-03: Never auto-push ✅
  - T0-STRUCT-01: Spec created first ✅
  - T0-STRUCT-02: Folder structure maintained ✅
  - T0-SIZE-01: Main protocol <1,400 tokens ✅
  - T0-MEMORY-01: Will update MEMORY.md (T030)
  - T0-SOURCE-01: Will cite sources (T027)
  - T1-QUAL-02: 4 user stories = test specs ✅
  - T1-QUAL-03: No duplication ✅
  - T1-DOC-01: Design decisions documented ✅
  - T1-DOC-02: Protocol is README-like ✅
  - T1-DOC-03: Algorithm commented ✅
  - T1-ARCH-04: Skill gap handling explicit (strict validation) ✅

- [ ] Output: Constitution compliance report (should be all ✅)
- [ ] If any ❌: document exception and rationale

**Estimated effort**: 0.5 hour

---

### T027: Create COMPLETION-SUMMARY.md

**Prerequisite**: T026 (compliance verified), T025 (quality complete)

- [ ] Create `specs/005-persona-generator/COMPLETION-SUMMARY.md` with sections:
  - **Overview**: SPEC-005a formalization complete, 2 phases (research → implementation)
  - **Deliverables**: Main protocol enhanced, 4 JIT files created, 3 examples with metrics
  - **Phases**: Phase 4-7 completion summary (what was done, timeline, effort)
  - **Metrics**: Token counts, self-critique scores, success criteria results
  - **Files Created/Modified**:
    - Enhanced: `.prompt-os/core/PERSONA-GENERATOR.md`
    - Created: `.prompt-os/core/persona-generator/*.md` (4 JIT files)
    - Specification: `specs/005-persona-generator/spec.md`, `plan.md`, `tasks.md`, `execute-checklist.md`
  - **Next Steps**: SPEC-005b (CLI implementation) can now proceed (depends on protocol being stable)
  - **Validation**: All SC-001 through SC-008 passed
  - **Constitution**: 8/8 T0 + 6/6 T1 compliance

- [ ] Target: 800-1,200 lines (comprehensive but concise)

**Estimated effort**: 1.5 hours

---

### T028: Present to Human Gate

**Prerequisite**: T027 (summary ready), T026 (compliance checked)

- [ ] Prepare presentation:
  - Enhanced PERSONA-GENERATOR.md (highlight changes vs old)
  - 4 JIT sub-files (highlight value of each)
  - 3 example personas (show full output + metrics)
  - Self-critique scores (visual: main 90/100 ✅, examples avg 81/100 ✅)
  - Success criteria results (SC-001 through SC-008 all passed)

- [ ] Get human decision: approve | view | edit | reject
- [ ] If approve: proceed to T029
- [ ] If edit: return to Phase 5 with specific feedback
- [ ] If reject: document reason, return to Phase 5

**Estimated effort**: 1 hour (presentation + feedback)

**Gate**: Approval required to proceed to T029

---

### T029: Commit Changes

**Prerequisite**: T028 (Human Gate approval)

- [ ] Stage files:
  ```bash
  git add .prompt-os/core/PERSONA-GENERATOR.md
  git add .prompt-os/core/persona-generator/
  git add specs/005-persona-generator/
  ```

- [ ] Create commit:
  ```
  feat(spec-005a): persona generator protocol formalization with jit sub-files and examples
  
  - Enhanced PERSONA-GENERATOR.md: streamlined main protocol (1,200 tokens, was 2,100)
  - Created 4 JIT sub-files: workflow, traits, triggers, examples
  - Added 3 example personas demonstrating P1 user stories
  - All success criteria SC-001 through SC-008 validated
  - Self-critique scores: protocol 91/100, examples avg 82/100
  - Constitution compliance: 8/8 T0 + 6/6 T1 rules
  ```

- [ ] Verify commit succeeded
- [ ] Confirm branch: `004-vector-db-rag` or merge to master (per team policy)

**Estimated effort**: 0.5 hour

---

### T030: Update Memory & Close SPEC-005a

**Prerequisite**: T029 (commit succeeded)

- [ ] Update `MEMORY.md`:
  - Add Session 28 entry (or next session number)
  - Summary: SPEC-005a (Persona Generator Protocol) formalized, 4 phases (research → implementation), 7 days effort
  - Key metrics: 30 tasks, 3 examples, all success criteria passed

- [ ] Update `memory/opencode-memory.md`:
  - Detailed session notes (Phase 4-7 summary)
  - Metrics: token counts, self-critique scores, effort per phase
  - Learnings: what worked, what needed iteration
  - Gaps detected: 0 (protocol complete)
  - Rejections: 0 (all approval on first Human Gate)

- [ ] Update `ROADMAP.md`:
  - SPEC-005a: ✅ COMPLETE (v2.3.0-dev formalization)
  - SPEC-005b: Starting Phase 0 (next phase, v2.3.0 target)

- [ ] Update `.context/workflows/` (if creating reusable pattern):
  - Create `.context/workflows/spec-005a-execution-pattern.md` (optional, for future protocol formalizations)

- [ ] Mark SPEC-005a complete:
  - Status in ROADMAP: ✅ COMPLETE
  - Version: v2.3.0-dev
  - Commit hash: (from T029)

**Estimated effort**: 1 hour

---

## Task Summary

| Phase | Tasks | Type | Total Effort |
|-------|-------|------|--------------|
| **Phase 4** (Analysis & Planning) | T001-T010 | Sequential | 8 hours |
| **Phase 5** (Enhancement & Creation) | T011-T020 | 6 serial + 4 parallel | 12 hours |
| **Phase 6** (Validation) | T021-T025 | Mostly parallel | 8 hours |
| **Phase 7** (Closure) | T026-T030 | Sequential | 5 hours |
| **TOTAL** | 30 tasks | - | **33 hours** |

**Timeline**: 7 days (~5 hours/day average)

---

## Parallelizable Task Groups

**Group A (Phase 4, Day 2)**: T004, T005, T006
- Extract algorithm details for workflow, traits, triggers
- Can execute in parallel (independent sections)
- Estimated parallel savings: 2 hours (3 hours sequential → 1.5 parallel)

**Group B (Phase 5, Day 3-4)**: T012, T013, T014, T015
- Create JIT sub-files (parallel creation)
- Dependent only on T011 (refactoring) and T004-T006 (extraction)
- Estimated parallel savings: 3 hours (8 hours sequential → 5 parallel)

**Group C (Phase 6, Day 6)**: T021, T022
- Self-critique main protocol + examples (independent evaluations)
- Estimated parallel savings: 1 hour

**Total parallel optimization**: Can reduce 33 hours to ~27 hours with aggressive parallelization

---

## Success Criteria by Task

Each task has clear completion criteria:

- **T001-T003**: Decision documented (JIT extraction yes/no + gaps identified)
- **T004-T006**: Algorithm + rules extracted to detail level
- **T007-T010**: Checklists + readiness confirmed
- **T011-T015**: Files created, syntax valid, requirements covered
- **T016-T020**: Validation reports + team approval
- **T021-T025**: All scores ≥minimum + criteria passed
- **T026-T030**: Approved + committed + memory updated

---

**Tasks Ready**: All 30 tasks defined, dependencies mapped, effort estimated.  
**Next**: Execute Phase 4 (T001-T010) starting next session.

