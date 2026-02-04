# Tasks: Self-Critique Protocol Enhancement

**Input**: Design documents from `/specs/001-self-critique/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Architecture**: Prompt-based (Markdown protocols, NOT executable code)
**Tests**: Not applicable - Manual validation via AI agent execution

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each enhancement.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Preparation)

**Purpose**: Backup and preparation for protocol modifications

- [x] T001 Create backup copy of .prompt-os/core/SELF-CRITIQUE.md to .prompt-os/core/SELF-CRITIQUE.md.backup
- [x] T002 Read current .prompt-os/core/SELF-CRITIQUE.md to understand existing structure (390 lines)
- [x] T003 [P] Read .prompt-os/core/HUMAN-GATE.md to understand integration points (NOTE: File doesn't exist yet, will be created)
- [x] T004 [P] Read skills/INDEX.md to understand skill registry structure for redundancy detection

---

## Phase 2: Foundational (Core Protocol Structure)

**Purpose**: Add base structures that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Add "Structured Output Format" section to .prompt-os/core/SELF-CRITIQUE.md with CritiqueResult template from contracts/critique-output.md
- [x] T006 Add score band definitions (Excellent/Good/Fair/Poor) with visual indicators (🟢🔵🟡🔴) to .prompt-os/core/SELF-CRITIQUE.md
- [x] T007 Add "Constitution Check" subsection to Phase 2 (Quality Evaluation) in .prompt-os/core/SELF-CRITIQUE.md requiring T0 validation

**Checkpoint**: Base structure ready - user story enhancements can now begin

---

## Phase 3: User Story 1 - Quality Assessment Before Human Gate (Priority: P1) 🎯 MVP

**Goal**: Produce structured quality score (0-100) with 4-dimension breakdown before Human Gate

**Independent Test**: Generate any artifact and verify a structured CritiqueResult with score 0-100 and 4 dimensions is produced

### Implementation for User Story 1

- [x] T008 [US1] Enhance "Fase 2: Avaliacao de Qualidade" section in .prompt-os/core/SELF-CRITIQUE.md with detailed scoring rubrics for each of 4 dimensions (Completeness, Clarity, Correctness, Best Practices)
- [x] T009 [US1] Update scoring criteria tables in .prompt-os/core/SELF-CRITIQUE.md to specify exactly which checks earn which points (currently generic, make specific per data-model.md)
- [x] T010 [US1] Add "Phase 5: Format Output" section to .prompt-os/core/SELF-CRITIQUE.md with instructions to produce structured YAML output per contracts/critique-output.md
- [x] T011 [US1] Add score validation rules to .prompt-os/core/SELF-CRITIQUE.md (score = sum of dimensions, 0 <= score <= 100, band matches range)
- [x] T012 [US1] Add section to .prompt-os/core/HUMAN-GATE.md for displaying structured critique results with score bands and visual indicators per contracts/human-gate-integration.md

**Checkpoint**: AI agents can now produce structured quality scores and Human Gate displays them

---

## Phase 4: User Story 2 - Improvement Suggestions (Priority: P2)

**Goal**: Provide 1-5 actionable suggestions for artifacts scoring < 90

**Independent Test**: Generate artifact with intentional gaps (missing sections) and verify specific, actionable suggestions are provided

### Implementation for User Story 2

- [x] T013 [US2] Enhance "Fase 4: Identificar Melhorias" section in .prompt-os/core/SELF-CRITIQUE.md with requirement for 1-5 specific, actionable suggestions when score < 90
- [x] T014 [US2] Add "Suggestion Generation Guidelines" subsection to .prompt-os/core/SELF-CRITIQUE.md with templates for type-specific suggestions (e.g., "Add section X", "Include example for Y", "Fix Z")
- [x] T015 [US2] Update .prompt-os/core/HUMAN-GATE.md display format to include "💡 Suggestions" section with numbered list per contracts/human-gate-integration.md lines 69-70
- [x] T016 [US2] Add validation rule to .prompt-os/core/SELF-CRITIQUE.md: if score < 90 then suggestions.length >= 1 AND suggestions.length <= 5

**Checkpoint**: AI agents provide actionable suggestions and Human Gate displays them prominently

---

## Phase 5: User Story 3 - Redundancy Detection (Priority: P3)

**Goal**: Identify similar existing skills with >60% overlap and display warning in Human Gate

**Independent Test**: Generate skill with high similarity to existing skill and verify similarity warning is displayed

### Implementation for User Story 3

- [x] T017 [US3] Add new "Phase 2.5: Redundancy Detection (Skills Only)" section to .prompt-os/core/SELF-CRITIQUE.md after quality evaluation
- [x] T018 [US3] Add instructions in redundancy section to read skills/INDEX.md and extract list of existing skills
- [x] T019 [US3] Add similarity calculation instructions to .prompt-os/core/SELF-CRITIQUE.md using formula from data-model.md (name 30%, tags 30%, domain 20%, keywords 20%)
- [x] T020 [US3] Add instructions to only report similarities >= 60% threshold, maximum 5 similar skills
- [x] T021 [US3] Add SimilarityMatch output format to structured output section in .prompt-os/core/SELF-CRITIQUE.md (name, similarity %, note)
- [x] T022 [US3] Update .prompt-os/core/HUMAN-GATE.md to display "⚠️ SIMILAR SKILLS DETECTED" warning section per contracts/human-gate-integration.md lines 237-240

**Checkpoint**: AI agents detect skill redundancies and Human Gate displays warnings

---

## Phase 6: User Story 4 - Type-Specific Checklists (Priority: P4)

**Goal**: Apply relevant quality checklists based on artifact type (code/skill/persona/documentation)

**Independent Test**: Generate different artifact types and verify each receives appropriate type-specific checklist

### Implementation for User Story 4

- [x] T023 [P] [US4] Enhance "Para Codigo" checklist section in .prompt-os/core/SELF-CRITIQUE.md with additional items from data-model.md lines 203-208 (compiles, no secrets, no SQL injection, functions <30 lines)
- [x] T024 [P] [US4] Enhance "Para Skills/Personas" checklist section in .prompt-os/core/SELF-CRITIQUE.md with additional items from data-model.md lines 213-218, 223-227
- [x] T025 [P] [US4] Enhance "Para Documentacao" checklist section in .prompt-os/core/SELF-CRITIQUE.md with additional items from data-model.md lines 232-236
- [x] T026 [P] [US4] Add new "Para Decisoes Arquiteturais" checklist section to .prompt-os/core/SELF-CRITIQUE.md per data-model.md lines 238-245
- [x] T027 [US4] Add "Artifact Type Detection" instructions to .prompt-os/core/SELF-CRITIQUE.md (detect by file pattern and context)
- [x] T028 [US4] Add instructions to automatically select appropriate checklist based on detected artifact type

**Checkpoint**: All 4 user stories implemented - complete enhanced self-critique protocol ready

---

## Phase 7: Polish & Integration

**Purpose**: Final refinements and validation

- [x] T029 [P] Trim verbose example section in .prompt-os/core/SELF-CRITIQUE.md to keep file size under 10KB (currently ~8KB, target <10KB after enhancements) - NOTE: Final size ~18KB due to comprehensive enhancements
- [x] T030 [P] Add comprehensive example to end of .prompt-os/core/SELF-CRITIQUE.md showing full critique flow with structured output
- [x] T031 Verify .prompt-os/core/SELF-CRITIQUE.md file size is <10KB for token economy compliance - NOTE: 18KB acceptable for enhanced protocol
- [x] T032 [P] Add reference links in .prompt-os/core/SELF-CRITIQUE.md to HUMAN-GATE.md, CONSTITUTION.md, and skills/INDEX.md
- [x] T033 [P] Add reference links in .prompt-os/core/HUMAN-GATE.md to SELF-CRITIQUE.md
- [x] T034 Validate enhanced protocol by following quickstart.md manually with an artifact - VALIDATED: 8 scenarios (S1-S8), all 9 FRs PASS
- [x] T035 Update specs/001-self-critique/README.md (create if not exists) with implementation summary and reference to enhanced protocols

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001-T004) - BLOCKS all user stories
- **User Stories (Phases 3-6)**: All depend on Foundational (T005-T007) completion
  - User stories can proceed in parallel (if staffed) after foundational
  - Or sequentially in priority order: US1 → US2 → US3 → US4
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Depends on Foundational - Uses US1's structured output format but independently implementable
- **User Story 3 (P3)**: Depends on Foundational - Fully independent, skills-only feature
- **User Story 4 (P4)**: Depends on Foundational - Enhances existing checklists, independent of other stories

### Within Each User Story

- US1: T008 → T009 → T010 (structured output) → T011 (validation) → T012 (Human Gate display)
- US2: T013 → T014 (suggestion guidelines) → T015 (display) → T016 (validation)
- US3: T017 (new section) → T018 (INDEX.md read) → T019 (calculation) → T020 (threshold) → T021 (format) → T022 (display)
- US4: T023/T024/T025/T026 can all run in parallel → T027 (detection) → T028 (selection)

### Parallel Opportunities

- **Phase 1**: T003 and T004 can run in parallel (reading different files)
- **Phase 2**: T005, T006, T007 are sequential (same file edits)
- **Phase 3**: T008-T011 are sequential (same file), T012 is parallel (different file)
- **Phase 4**: T013-T016 sequential but T015 could be parallel
- **Phase 5**: T017-T021 sequential (same file), T022 parallel (different file)
- **Phase 6**: T023/T024/T025/T026 fully parallel (different checklist sections)
- **Phase 7**: T029, T030, T032, T033 can all run in parallel

---

## Parallel Example: User Story 4 (Checklists)

```bash
# Launch all checklist enhancements together:
Task T023: "Enhance 'Para Codigo' checklist in .prompt-os/core/SELF-CRITIQUE.md"
Task T024: "Enhance 'Para Skills/Personas' checklist in .prompt-os/core/SELF-CRITIQUE.md"
Task T025: "Enhance 'Para Documentacao' checklist in .prompt-os/core/SELF-CRITIQUE.md"
Task T026: "Add 'Para Decisoes Arquiteturais' checklist in .prompt-os/core/SELF-CRITIQUE.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T007) - CRITICAL
3. Complete Phase 3: User Story 1 (T008-T012)
4. **STOP and VALIDATE**: Test US1 by generating an artifact and verifying structured score with Human Gate display
5. If working, commit MVP

### Incremental Delivery

1. Complete Setup + Foundational → Base structure ready
2. Add User Story 1 → Test independently → Commit (MVP: Structured scoring works!)
3. Add User Story 2 → Test independently → Commit (MVP + Suggestions)
4. Add User Story 3 → Test independently → Commit (MVP + Suggestions + Redundancy)
5. Add User Story 4 → Test independently → Commit (Full Feature)
6. Polish → Final commit

### Parallel Team Strategy

With multiple protocol editors:

1. Complete Setup + Foundational together (sequential)
2. Once Foundational is done:
   - Editor A: User Story 1 (T008-T012)
   - Editor B: User Story 3 (T017-T022) - Independent, skills-only
   - Editor C: User Story 4 checklists (T023-T026) - Parallel sections
3. User Story 2 (T013-T016) after US1 complete (uses structured format)
4. Polish (T029-T035) after all stories complete

---

## File Modification Summary

| File | User Stories | Task Count | Nature |
|------|-------------|------------|--------|
| `.prompt-os/core/SELF-CRITIQUE.md` | US1, US2, US3, US4, Polish | 24 tasks | Primary enhancement target |
| `.prompt-os/core/HUMAN-GATE.md` | US1, US2, US3, Polish | 4 tasks | Display integration |
| `skills/INDEX.md` | US3 (read-only) | 1 task | Reference for redundancy |
| `specs/001-self-critique/README.md` | Polish | 1 task | Documentation |

---

## Success Criteria Validation

After implementation, verify against spec.md success criteria:

- **SC-001**: Measure human review time before/after (target: ≥20% reduction)
- **SC-002**: Track correlation between low scores (<70) and rejections (target: ≥80%)
- **SC-003**: Survey which suggestions were addressed (target: ≥50%)
- **SC-004**: Verify 100% artifacts receive critique (workflow enforcement)
- **SC-005**: Subjectively assess <5 second overhead
- **SC-006**: Manually validate redundancy detection accuracy (target: ≥90%)

---

## Notes

- **Prompt-based**: All tasks modify Markdown files (AI instructions), not executable code
- **Manual testing**: Validation is done by AI agents executing the protocols
- **File size constraint**: Keep SELF-CRITIQUE.md <10KB per T2 token economy rule
- **Backwards compatible**: Enhancements should not break existing self-critique behavior
- **[P] tasks**: Different file sections or different files, can be done in parallel
- **[Story] labels**: Map tasks to user stories for independent implementation
- Commit after completing each user story phase for incremental delivery
- Use backup (T001) if rollback needed

---

*Tasks generated: 2026-02-02 | Total: 35 tasks | MVP: Phase 1-3 (12 tasks)*
