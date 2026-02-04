# Tasks: Enhanced Knowledge Retrieval & RAG (SPEC-004)

**Input**: Design documents from `/specs/004-vector-db-rag/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md  
**Tests**: Not explicitly requested — validation is manual agent-run (SC-001 query walk-through, SC-003 draft walk-through). Validation tasks are in the final phase.  
**Organization**: Tasks grouped by user story. Each story is independently testable.

---

## Phase 1: Setup

**Purpose**: Verify environment, confirm all design artifacts are in place, validate the live protocol files written in Phase 2 (previous session).

- [ ] T001 Verify `.prompt-os/core/KNOWLEDGE-BASE.md` exists and is the refactored JIT router (≤ 1,400 tokens) — SC-004 token check
- [ ] T002 [P] Verify `.prompt-os/core/knowledge-base/similarity-scoring.md` exists and references contract `specs/004-vector-db-rag/contracts/similarity-scoring.md`
- [ ] T003 [P] Verify `.prompt-os/core/knowledge-base/redundancy-gate.md` exists and references contract `specs/004-vector-db-rag/contracts/redundancy-gate.md`
- [ ] T004 [P] Verify `.prompt-os/core/knowledge-base/rag-workflow.md` exists and references contract `specs/004-vector-db-rag/contracts/rag-workflow.md`
- [ ] T005 [P] Verify `.prompt-os/core/knowledge-base/relationship-map.md` exists and references contract `specs/004-vector-db-rag/contracts/relationship-map.md`
- [ ] T006 Confirm `.prompt-os/skills/INDEX.md` contains all 13 skills with name, category, tags, description fields (inputs for similarity scoring)

**Checkpoint**: All protocol files live and INDEX.md registry confirmed. User story validation can begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm the shared scoring engine and gap-forwarding path work correctly before any user story runs. These are exercised by every subsequent phase.

**⚠️ CRITICAL**: No user story walk-through can begin until this phase is complete.

- [ ] T007 Walk through the similarity-scoring formula end-to-end on ONE known skill: query = "How do I run tasks in parallel in Go?", expected winner = `go`. Record all 4 signal sub-scores and verify `finalScore = round(name×0.30 + tags×0.30 + domain×0.20 + desc×0.20)` per `knowledge-base/similarity-scoring.md`
- [ ] T008 Walk through gap-forwarding: query = "How do I consume messages from Kafka?". Confirm zero skills score ≥ 40, `gapDetected = true`, and the GapRecord format matches `| {date} | knowledge-gap | "{query}" | open |` per `data-model.md` GapRecord entity
- [ ] T009 Confirm self-match exclusion: when scoring a candidate skill against INDEX.md, the candidate's own entry (if present) is excluded from results — per edge case in spec.md

**Checkpoint**: Scoring engine + gap path validated. All 4 user stories may now proceed.

---

## Phase 3: User Story 1 — Find the Right Skill by Intent (Priority: P1) 🎯 MVP

**Goal**: Agent surfaces the correct skill(s) from the 13-skill library when a developer asks a natural-language question, even when query words don't literally match skill names. Covers FR-001, FR-002, FR-003, FR-010.

**Independent Test**: Run SC-001 — 20 natural-language queries against the live protocol. Target: ≥ 80% (≥ 16/20) surface the correct skill in top-3.

### Implementation for User Story 1

- [ ] T010 [US1] Compose the 20-query test set for SC-001 in `specs/004-vector-db-rag/validation/sc-001-queries.md`. Each row: query text, expected correct skill, rationale. Cover all 13 skills (some skills may appear as expected answer for multiple queries). Include at least 2 queries that should trigger gap detection (no correct skill exists).
- [ ] T011 [P] [US1] Walk through queries 1-5 against `knowledge-base/similarity-scoring.md`: for each query, score against all 13 INDEX.md skills, record top-3 + scores, mark hit/miss vs expected
- [ ] T012 [P] [US1] Walk through queries 6-10 (same procedure as T011)
- [ ] T013 [P] [US1] Walk through queries 11-15 (same procedure as T011)
- [ ] T014 [P] [US1] Walk through queries 16-20 (same procedure as T011; includes the 2 gap-trigger queries — verify GapRecord is produced)
- [ ] T015 [US1] Aggregate SC-001 results: total hits, total misses, hit-rate %. Record in `specs/004-vector-db-rag/validation/sc-001-results.md`. Flag any query where the correct skill did NOT appear in top-3 — note which signal(s) caused the miss
- [ ] T016 [US1] Verify tie-breaking rule per spec edge cases: if two skills share the same finalScore, the more-recently-created skill ranks first; ties on recency break alphabetically. Document one observed or constructed tie scenario in sc-001-results.md

**Checkpoint**: SC-001 complete. Hit-rate recorded. If < 80%, flag the failing queries for rubric tuning before proceeding.

---

## Phase 4: User Story 2 — Context-Augmented Skill Generation (Priority: P2)

**Goal**: When creating a new skill, the agent retrieves 2-3 reference skills first, extracts their structure, and generates a draft that is structurally consistent with the library. Covers FR-004, SC-002.

**Independent Test**: Walk through one skill-creation request end-to-end using `knowledge-base/rag-workflow.md`. Verify Step 1 (Retrieve), Step 2 (Augment — structural rules are derived), and Step 3 (Generate — constraints are enforced).

### Implementation for User Story 2

- [ ] T017 [US2] Pick a target topic not in the current library (e.g., "Ruby baseline"). Execute Step 1 (Retrieve) of `knowledge-base/rag-workflow.md`: run similarity-scoring with topN=3, filter ≥ 40. Record referenceSkills[] + scores
- [ ] T018 [US2] Execute Step 2 (Augment): for each reference skill, read its SKILL.md and extract headings, example count, comparison-table presence, citation format. Produce the "RAG Reference Context" guidance block per the contract in `specs/004-vector-db-rag/contracts/rag-workflow.md`. Record the derived structural rules
- [ ] T019 [US2] Execute Step 3 (Generate): produce a draft skill using the structural rules from T018. Verify all constraints: section headings match, example count meets minimum, comparison table present if required, citations use minimal YAML array, total length ≤ 1,400 tokens. Record draft path and compliance checklist in `specs/004-vector-db-rag/validation/sc-002-rag-walkthrough.md`
- [ ] T020 [US2] Execute Case B fallback: pick a topic so divergent that zero skills score ≥ 40 (or simulate by artificially zeroing references). Confirm the agent falls back to `.prompt-os/templates/SKILL.template.md` and logs "RAG context unavailable" note. Record in sc-002-rag-walkthrough.md

**Checkpoint**: RAG workflow end-to-end verified. Both Case A (normal) and Case B (fallback) exercised.

---

## Phase 5: User Story 3 — Redundancy Detection Before Persistence (Priority: P2)

**Goal**: Before any new skill is committed, the agent runs the two-tier redundancy gate. Skills at 80-89 get 3 options; skills at ≥ 90 are hard-blocked to 2 options. Covers FR-005, FR-006, SC-003.

**Independent Test**: Run SC-003 — 5 candidate drafts through the redundancy gate. Target: zero false negatives (every draft at ≥ 80 is flagged; every draft at ≥ 90 is hard-blocked).

### Implementation for User Story 3

- [ ] T021 [US3] Design the 5-draft SC-003 test set in `specs/004-vector-db-rag/validation/sc-003-drafts.md`. Per spec SC-003: at least 2 drafts must produce score ≥ 90 (near-duplicate), at least 2 must produce 80-89 (high overlap), 1 must produce < 80 (allowed). For each draft, specify: title, tags, description, which existing skill it overlaps with, and the expected tier
- [ ] T022 [P] [US3] Walk through SC-003 Draft 1 (expected ≥ 90): score against all INDEX.md skills per similarity-scoring.md. Confirm highest score ≥ 90. Confirm redundancy-gate.md presents ONLY options A and B ("Proceed as-is" blocked). Record tier + options shown
- [ ] T023 [P] [US3] Walk through SC-003 Draft 2 (expected ≥ 90): same procedure as T022
- [ ] T024 [P] [US3] Walk through SC-003 Draft 3 (expected 80-89): score, confirm highest score 80-89. Confirm gate presents all 3 options (A, B, C). Record tier + options shown
- [ ] T025 [P] [US3] Walk through SC-003 Draft 4 (expected 80-89): same procedure as T024
- [ ] T026 [US3] Walk through SC-003 Draft 5 (expected < 80): score, confirm highest score < 80. Confirm disposition = `allowed`, gate does not fire. Record result
- [ ] T027 [US3] Aggregate SC-003 results in `specs/004-vector-db-rag/validation/sc-003-results.md`: for each draft, record expected tier vs actual tier, expected options vs options presented. Flag any false negative (draft ≥ 80 that was not flagged, or draft ≥ 90 that was not hard-blocked). Confirm zero false negatives

**Checkpoint**: SC-003 complete. Zero false negatives confirmed (or failures documented for rubric fix).

---

## Phase 6: User Story 4 — Structured Skill Relationships (Priority: P3)

**Goal**: The knowledge base can store and surface typed relationship links between skills. When a skill is loaded, related skills are shown grouped by type. Covers FR-007, SC-006.

**Independent Test**: Simulate loading 3 skills and verify surfacing output matches `knowledge-base/relationship-map.md` rules. Verify the YAML persistence format is correct.

### Implementation for User Story 4

- [ ] T028 [US4] Design a sample relationship graph for the current 13 skills in `specs/004-vector-db-rag/validation/sc-006-relationships.md`. For each baseline skill (go, java, python, javascript, kotlin, c-cpp), propose at least 1 relationship. For each advanced skill (java-8 through java-23, kotlin-1xx, kotlin-2xx), propose the version-extension link to its base. Justify each link per the 4 type definitions in `knowledge-base/relationship-map.md`
- [ ] T029 [P] [US4] Verify persistence format: for 3 chosen skills, write out the YAML `relationships` block as it would appear in INDEX.md. Confirm: no self-edges, no duplicates, directional types stored on the dependent/extended skill + reverse pointer on base, bidirectional types stored on both skills
- [ ] T030 [P] [US4] Verify surfacing format: simulate loading skill `go` with the relationships from T028/T029. Produce the surfacing output block per the template in `knowledge-base/relationship-map.md` "Surfacing" section. Confirm grouping by type, max 5 links rule, and the "Want me to load any of these?" prompt
- [ ] T031 [US4] Verify lifecycle: confirm that a link marked `agent-proposed` does NOT become permanent until explicitly confirmed by human (T0-HUMAN compliance). Walk through the proposal → confirmation → rejection states per the contract. Record in sc-006-relationships.md
- [ ] T032 [US4] SC-006 coverage check: count how many of the 13 skills have ≥ 1 relationship in the proposed graph from T028. Target: ≥ 90% (≥ 12 of 13). Record coverage in sc-006-relationships.md

**Checkpoint**: Relationship graph designed, persistence + surfacing + lifecycle verified. SC-006 coverage target confirmed.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all stories, protocol compliance, and documentation.

- [ ] T033 SC-005 compliance walk-through: trace one full skill-creation end-to-end through the mandatory 6-phase protocol sequence (AUTO-INCREMENT → GENERATE → SELF-CRITIQUE → HUMAN-GATE → COMMIT → MEMORY-MANAGEMENT). Confirm zero T0 violations at each step. Record in `specs/004-vector-db-rag/validation/sc-005-compliance.md`
- [ ] T034 [P] Update `specs/004-vector-db-rag/quickstart.md` if any protocol behaviour observed during validation differs from what quickstart documents
- [ ] T035 [P] Update `.prompt-os/skills/INDEX.md` with a `relationships` section header (empty block) to indicate the field is ready for population per FR-007 — do NOT populate until human confirms the graph from T028
- [ ] T036 Consolidate all validation results into a single summary in `specs/004-vector-db-rag/validation/SUMMARY.md`: SC-001 hit-rate, SC-002 RAG walkthrough pass/fail, SC-003 false-negative count, SC-004 token counts (already verified), SC-005 compliance, SC-006 coverage

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          → no deps, start immediately
Phase 2 (Foundational)   → depends on Phase 1
Phase 3 (US1 Search)     → depends on Phase 2  ← MVP
Phase 4 (US2 RAG)        → depends on Phase 2 + Phase 3 (uses scoring from US1)
Phase 5 (US3 Redundancy) → depends on Phase 2 + Phase 3 (uses scoring from US1)
Phase 6 (US4 Relations)  → depends on Phase 2 (independent of US2/US3)
Phase 7 (Polish)         → depends on all user stories
```

### User Story Dependencies

- **US1 (P1)** — independent after Foundational. This is the scoring engine; US2 and US3 call into it.
- **US2 (P2)** — depends on US1 (Step 1 of RAG is a similarity search). Independently testable once US1 passes.
- **US3 (P2)** — depends on US1 (redundancy gate opens with a similarity search). Independently testable once US1 passes.
- **US4 (P3)** — independent of US2/US3. Only needs the scoring engine (Phase 2) to be stable.

### Parallel Opportunities

- T002–T005 (Setup verification) — all [P], run together
- T011–T014 (SC-001 query batches) — all [P], each batch scores independently
- T022–T025 (SC-003 drafts 1-4) — all [P], each draft scores independently
- T029–T030 (Relationship persistence + surfacing) — [P], different concerns
- T034–T035 (Polish updates) — [P], different files

### Parallel Example: Phase 5 (SC-003)

```
After T021 (draft design) completes, launch in parallel:
  T022 — Draft 1 walk-through (≥ 90 expected)
  T023 — Draft 2 walk-through (≥ 90 expected)
  T024 — Draft 3 walk-through (80-89 expected)
  T025 — Draft 4 walk-through (80-89 expected)
Then sequentially:
  T026 — Draft 5 (< 80, allowed)
  T027 — Aggregate results
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) — verify all files in place
2. Complete Phase 2 (Foundational) — scoring engine + gap path
3. Complete Phase 3 (US1) — SC-001 20-query walk-through
4. **STOP and VALIDATE**: check SC-001 hit-rate ≥ 80%
5. If pass → proceed to US2/US3. If fail → tune scoring rubric before continuing

### Incremental Delivery

1. Setup + Foundational → engine verified
2. US1 (Search) → SC-001 validated → core value delivered
3. US2 (RAG) + US3 (Redundancy) → in parallel, each independently testable
4. US4 (Relationships) → enhancement layer, last
5. Polish → cross-cutting validation + docs

---

## Notes

- All "walk-through" tasks are **manual agent-run**: the agent (you) executes the protocol steps and records results. No automated test runner exists for prompt-based protocols.
- Validation output files go in `specs/004-vector-db-rag/validation/` (new directory, created as needed).
- [P] tasks within a phase can run in the same agent turn if context allows; otherwise batch by phase.
- SC-001 and SC-003 are the two hard gate criteria per the user's request: **zero false negatives on SC-003, ≥ 80% hit-rate on SC-001**.
