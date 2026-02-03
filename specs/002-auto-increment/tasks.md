# Tasks: Auto-Increment Protocol

**Input**: Design documents from `/specs/002-auto-increment/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Tests are NOT included - this is a prompt-based protocol validated through manual acceptance scenarios.

**Organization**: Tasks are organized by user story to enable independent validation and incremental delivery of each protocol feature.

**Project Type**: Prompt-based protocol (documentation + validation project)

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths included in descriptions

## Path Conventions

- Implementation: `.prompt-os/core/AUTO-INCREMENT.md` (existing)
- Agent memories: `MEMORY/{agente}-memory.md` (distributed)
- Global stats: `MEMORY.md` (root)
- Documentation: `specs/002-auto-increment/`

---

## Phase 1: Setup (Documentation Infrastructure)

**Purpose**: Validate existing documentation and prepare for protocol updates

- [x] T001 Review all Phase 1 deliverables in specs/002-auto-increment/ (data-model.md, contracts/, quickstart.md)
- [x] T002 [P] Validate research.md findings against current AUTO-INCREMENT.md implementation
- [x] T003 [P] Create backup of .prompt-os/core/AUTO-INCREMENT.md before any modifications

**Checkpoint**: Documentation reviewed, implementation backed up

---

## Phase 2: Foundational (Critical Architecture Updates)

**Purpose**: Update AUTO-INCREMENT.md to reflect distributed memory architecture from spec clarification

**⚠️ CRITICAL**: This phase MUST complete before user stories can be validated, as it fixes the architectural mismatch identified in research.md

- [x] T004 Update .prompt-os/core/AUTO-INCREMENT.md line 65: Replace "MEMORY.md" with "MEMORY/{agente}-memory.md" in gap logging section
- [x] T005 Update .prompt-os/core/AUTO-INCREMENT.md line 87: Replace "MEMORY.md" with agent-specific memory reference
- [x] T006 Update .prompt-os/core/AUTO-INCREMENT.md line 104: Replace "MEMORY.md" with "MEMORY/{agente}-memory.md" in rejection logging section
- [x] T007 Update .prompt-os/core/AUTO-INCREMENT.md line 135: Clarify gap counting reads from agent's own memory file
- [x] T008 Update .prompt-os/core/AUTO-INCREMENT.md line 228: Update memory reference to agent-specific file
- [x] T009 Update .prompt-os/core/AUTO-INCREMENT.md line 273: Add note explaining distributed vs global memory architecture
- [x] T010 Add cross-agent aggregation paragraph before line 174 in AUTO-INCREMENT.md explaining evolution reports read ALL agent memories

**Checkpoint**: AUTO-INCREMENT.md updated with distributed memory architecture - Foundation ready for user story validation

---

## Phase 3: User Story 1 - Gap Detection and Notification (Priority: P1) 🎯 MVP

**Goal**: Validate that gap detection protocol correctly detects missing skills, informs users with 3 options, logs to agent-specific memory, and tracks repeated gaps.

**Independent Test**: Request help for non-existent skill (e.g., "How do I use Kafka?") and verify: (1) gap detected, (2) user informed with 3 options, (3) gap logged in `MEMORY/{agente}-memory.md`, (4) 2nd request mentions "This is the 2nd time"

### Validation for User Story 1

- [x] T011 [US1] Create test agent memory file MEMORY/test-agent-memory.md with gap detection template
- [x] T012 [US1] Validate FR-001: Skill existence check works against .prompt-os/skills/INDEX.md
- [x] T013 [US1] Validate FR-002: User notification includes exactly 3 options (create now/proceed without/defer)
- [x] T014 [US1] Validate FR-003: Gap logging to MEMORY/test-agent-memory.md includes all required fields (date, request, suggested_skill_name, status)
- [x] T015 [US1] Validate FR-008: Repeated gap (2+ occurrences) triggers proactive suggestion message
- [x] T016 [US1] Test Acceptance Scenario 1: Request "Help me configure Kafka" with no kafka skill → verify gap detected and logged with status "pending"
- [x] T017 [US1] Test Acceptance Scenario 2: User chooses "create now" → verify skill generation workflow starts
- [x] T018 [US1] Test Acceptance Scenario 3: User chooses "proceed without" → verify gap logged with status "deferred"
- [x] T019 [US1] Test Acceptance Scenario 4: Same topic requested 2+ times → verify system mentions "This is the Nth time"
- [x] T020 [US1] Validate edge case: Vague topic (unclear skill name) → verify system asks for clarification
- [x] T021 [US1] Validate edge case: Gap covered by different name → verify JIT-PROTOCOL catches it
- [x] T022 [US1] Validate SC-001: Test 10 non-existent skills, verify 9+ gaps detected (90% threshold)
- [x] T023 [US1] Validate SC-007: Log 2 same gaps, verify suggestion appears within 1 interaction
- [x] T024 [US1] Document gap detection validation results in specs/002-auto-increment/validation-us1.md

**Checkpoint**: User Story 1 validated - Gap detection works independently with distributed memory

---

## Phase 4: User Story 2 - Rejection Learning (Priority: P2)

**Goal**: Validate that rejection learning protocol correctly categorizes rejections, logs to agent memory, identifies patterns (>30%), and applies learned corrections proactively.

**Independent Test**: Reject 5 artifacts with different reasons, verify: (1) system asks for reason if missing, (2) each categorized correctly, (3) all logged in agent memory, (4) 40% examples pattern detected and mentioned in next generation

### Validation for User Story 2

- [x] T025 [US2] Create test rejection scenarios in MEMORY/test-agent-memory.md with 10 sample rejections
- [x] T026 [US2] Validate FR-004: Test categorization of 20 rejection reasons across all 6 categories (examples/specificity/clarity/completeness/relevance/other)
- [x] T027 [US2] Validate FR-005: Rejection logging to MEMORY/test-agent-memory.md includes all required fields (date, artifact_type, artifact_name, reason, category, learned_action, timestamp)
- [x] T028 [US2] Validate FR-006: Pattern identification when "examples" category exceeds 30% (test with 4/10 = 40%)
- [x] T029 [US2] Validate FR-007: Proactive corrections applied in next generation (verify message mentions "I've noticed examples are a concern")
- [x] T030 [US2] Test Acceptance Scenario 1: Reject with reason "Examples don't work" → verify categorized as "examples" and logged
- [x] T031 [US2] Test Acceptance Scenario 2: Reject without reason → verify system asks "Could you tell me why you rejected this?"
- [x] T032 [US2] Test Acceptance Scenario 3: 10 rejections with 4 "examples" (40%) → verify pattern detected and proactive mention appears
- [x] T033 [US2] Test Acceptance Scenario 4: Pattern learned → verify evolution report includes "Examples: 40%" with suggested action
- [x] T034 [US2] Validate edge case: Rejection without reason → verify logged as "No reason provided" with category "other"
- [x] T035 [US2] Validate edge case: Ambiguous reason matching multiple categories → verify first priority match used
- [x] T036 [US2] Validate edge case: Same artifact rejected multiple times → verify each logged separately with mention "rejected X times"
- [x] T037 [US2] Validate SC-006: Reject 10 artifacts, verify 10 logged (100% capture rate)
- [x] T038 [US2] Validate integration with SELF-CRITIQUE.md (FR-011): Verify quality scores tracked per skill
- [x] T039 [US2] Validate integration with HUMAN-GATE.md (FR-012): Verify rejection capture works correctly
- [x] T040 [US2] Document rejection learning validation results in specs/002-auto-increment/validation-us2.md

**Checkpoint**: User Story 2 validated - Rejection learning works independently, patterns detected correctly

---

## Phase 5: User Story 3 - Proactive Skill Suggestions (Priority: P3)

**Goal**: Validate that proactive suggestions protocol correctly identifies frequent gaps (2+), low quality skills (<60), and outdated skills (>2 years), and presents prioritized suggestions.

**Independent Test**: Log 2+ gaps for same topic (e.g., "Kafka"), start new session, verify agent proactively suggests "I noticed you've asked about Kafka X times. Would you like me to create a skill for it?"

### Validation for User Story 3

- [ ] T041 [US3] Create test scenarios in MEMORY/test-agent-memory.md with 3 frequent gaps (counts: 3, 2, 2)
- [x] T042 [US3] Validate FR-008: Gap frequency analysis correctly identifies gaps with count ≥ 2
- [x] T043 [US3] Validate FR-009 (low scores): Simulate skill with Self-Critique scores [45, 52, 58] (avg 51.7) → verify improvement suggestion
- [x] T044 [US3] Validate FR-009 (outdated skills): Simulate skill created 2022-01-01 (4+ years old) → verify update suggestion
- [x] T045 [US3] Validate suggestion prioritization algorithm (gaps × 10, quality × 2, age × 5) with 3 test cases
- [x] T046 [US3] Test Acceptance Scenario 1: "Kafka" detected 2+ times → verify proactive suggestion "I noticed 'kafka' was requested multiple times"
- [x] T047 [US3] Test Acceptance Scenario 2: Skill has low Self-Critique scores (<60) → verify suggestion "The skill '{name}' has been scoring low"
- [x] T048 [US3] Test Acceptance Scenario 3: Skill created >2 years ago → verify suggestion "The skill '{name}' is outdated"
- [x] T049 [US3] Validate edge case: Suggestion already acted upon → verify re-check before presenting
- [x] T050 [US3] Validate edge case: User repeatedly defers suggestion (3 times) → verify suggestion stops (status "rejected")
- [x] T051 [US3] Validate edge case: Conflicting priorities → verify both suggestions presented in priority order
- [x] T052 [US3] Test cooldown periods: Deferred suggestion shouldn't re-appear for 7 days
- [x] T053 [US3] Validate SC-007: After 2nd gap detection, verify suggestion appears within 1 interaction
- [x] T054 [US3] Document proactive suggestions validation results in specs/002-auto-increment/validation-us3.md

**Checkpoint**: User Story 3 validated - Proactive suggestions work independently, correct prioritization

---

## Phase 6: User Story 4 - Evolution Reports (Priority: P4)

**Goal**: Validate that evolution reports protocol correctly aggregates data across ALL agent memories, reads global stats, calculates metrics, and generates formatted markdown report with all 6 sections.

**Independent Test**: Use system for a week (create skills, reject some, log gaps), request evolution report, verify includes: (1) skills created, (2) approval rate, (3) gaps detected/resolved, (4) top 3 gaps, (5) rejection breakdown, (6) suggested actions

### Validation for User Story 4

- [x] T055 [US4] Create test data: 3 agent memory files (opencode, itzamna, speckit) with gaps and rejections
- [x] T056 [US4] Create test global statistics in MEMORY.md with sample metrics
- [x] T057 [US4] Validate FR-010: Cross-agent aggregation reads ALL MEMORY/*-memory.md files (verify 3 agents processed)
- [x] T058 [US4] Validate FR-010: Report includes all 6 sections (Summary, Top Gaps, Rejection Patterns, Suggested Actions)
- [x] T059 [US4] Validate FR-010: Summary metrics calculated correctly (skills created/updated, approval rate, gaps detected/resolved)
- [x] T060 [US4] Validate FR-010: Top 3 gaps sorted by occurrence count descending
- [x] T061 [US4] Validate FR-010: Rejection patterns show percentages per category
- [x] T062 [US4] Validate FR-010: Suggested actions prioritized (critical patterns >50% first, frequent gaps second, quality third)
- [x] T063 [US4] Test Acceptance Scenario 1: Request "Generate evolution report" → verify report generated with all sections
- [x] T064 [US4] Test Acceptance Scenario 2: Verify report metrics accurate based on aggregated agent data and global stats
- [x] T065 [US4] Test Acceptance Scenario 3: Report shows 40% examples rejection → verify suggested action "Validate all examples before Human Gate"
- [x] T066 [US4] Validate edge case: No agent memory files exist → verify message "No data available yet"
- [x] T067 [US4] Validate edge case: Partial period coverage → verify note added "Data available from [date] onwards"
- [x] T068 [US4] Validate edge case: Conflicting global stats → verify prioritizes root MEMORY.md with warning
- [x] T069 [US4] Validate edge case: Very large dataset (>10,000 entries) → verify report limited to specified period
- [x] T070 [US4] Validate edge case: Corrupted memory file → verify skip with warning, process remaining files
- [x] T071 [US4] Validate SC-004: Generate report with 5000 entries → verify completes in <10 seconds
- [x] T072 [US4] Validate cross-agent aggregation: Verify "kafka-basics" gap appearing in 2 agents counted as 2 occurrences
- [x] T073 [US4] Test report formatting: Verify valid markdown with tables, sections properly formatted
- [x] T074 [US4] Document evolution reports validation results in specs/002-auto-increment/validation-us4.md

**Checkpoint**: User Story 4 validated - Evolution reports work with cross-agent aggregation, all metrics accurate

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation updates, and integration testing

- [x] T075 [P] Run all 4 acceptance scenarios from spec.md User Stories end-to-end
- [x] T076 [P] Validate all 7 Success Criteria (SC-001 to SC-007) documented in specs/002-auto-increment/success-criteria-validation.md
- [x] T077 [P] Validate all 13 Functional Requirements (FR-001 to FR-013) checklist in specs/002-auto-increment/requirements-validation.md
- [x] T078 [P] Test all 6 edge cases documented in spec.md Edge Cases section
- [x] T079 Test integration between all 4 user stories: Gap detection → Rejection learning → Proactive suggestions → Evolution report
- [x] T080 Validate distributed memory architecture: Test concurrent writes to 3 agent memories simultaneously (no conflicts)
- [x] T081 Validate memory file structure: Verify MEMORY/{agente}-memory.md format matches data-model.md specifications
- [x] T082 Test evolution report with real multi-agent data: opencode + itzamna + speckit agents
- [x] T083 [P] Update quickstart.md with any lessons learned during validation
- [x] T084 [P] Update research.md with final completeness score after updates
- [x] T085 Create final validation report in specs/002-auto-increment/final-validation-report.md summarizing all test results
- [x] T086 Run through quickstart.md manual scenarios: For AI Agents section (all 4 protocol entry points)
- [x] T087 Run through quickstart.md manual scenarios: For Humans section (all 4 user interactions)
- [x] T088 Verify AGENTS.md context updated correctly with Markdown technology and distributed memory references
- [x] T089 [P] Review all contracts/ files for accuracy against final AUTO-INCREMENT.md implementation
- [x] T090 Create MEMORY/ directory structure documentation in specs/002-auto-increment/memory-architecture.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001-T003) - **BLOCKS all user stories**
- **User Stories (Phase 3-6)**: All depend on Foundational (Phase 2) completion
  - US1 (Gap Detection): Can start after Phase 2
  - US2 (Rejection Learning): Can start after Phase 2 (independent of US1)
  - US3 (Proactive Suggestions): Depends on US1 data (gaps must exist to suggest)
  - US4 (Evolution Reports): Depends on US1 + US2 data (needs gaps and rejections to report)
- **Polish (Phase 7)**: Depends on all 4 user stories being validated

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Depends on User Story 1 (needs gap logs to analyze) - Can start after US1 validation complete
- **User Story 4 (P4)**: Depends on User Story 1 + 2 (needs gaps and rejections to aggregate) - Can start after US1 + US2 validation complete

### Within Each User Story

- Validation tasks follow logical order:
  1. Create test data/scenarios
  2. Validate functional requirements
  3. Test acceptance scenarios
  4. Validate edge cases
  5. Validate success criteria
  6. Document results

### Parallel Opportunities

- **Phase 1 Setup**: All 3 tasks can run in parallel (T001, T002, T003 all marked [P] where possible)
- **Phase 2 Foundational**: Tasks T004-T010 must run sequentially (editing same file: AUTO-INCREMENT.md)
- **Phase 3 (US1)**: Tasks T011-T024 mostly sequential (same test agent memory file), but documentation (T024) can run parallel with final validation
- **Phase 4 (US2)**: Tasks T025-T040 mostly sequential, but documentation (T040) can run parallel
- **Phase 5 (US3)**: Tasks T041-T054 mostly sequential, but documentation (T054) can run parallel
- **Phase 6 (US4)**: Tasks T055-T074 mostly sequential, but documentation (T074) can run parallel
- **Phase 7 Polish**: Tasks marked [P] can run in parallel:
  - T075 (end-to-end scenarios)
  - T076 (success criteria validation)
  - T077 (functional requirements checklist)
  - T078 (edge cases)
  - T083 (quickstart.md updates)
  - T084 (research.md updates)
  - T089 (contracts review)

---

## Parallel Example: User Story 1

```bash
# These tasks can run in parallel (different validation areas):
# (Note: Limited parallelization due to prompt-based nature and shared test files)

# Independent validation streams:
Task T011: Create test agent memory file
Task T024: Document validation results (after other tasks complete)
```

**Note**: Due to prompt-based protocol nature and single-file testing, most tasks are sequential. Parallelization opportunities exist primarily in documentation tasks and cross-story validation.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T010) - **CRITICAL architectural update**
3. Complete Phase 3: User Story 1 (T011-T024)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Can AI agents detect gaps?
   - Are gaps logged to agent-specific memory?
   - Does repeat detection work?
5. Deploy updated AUTO-INCREMENT.md if ready

### Incremental Delivery

1. Complete Setup + Foundational → AUTO-INCREMENT.md updated with distributed memory architecture
2. Add User Story 1 → Test independently → **MVP ready** (gap detection works)
3. Add User Story 2 → Test independently → Rejection learning works
4. Add User Story 3 → Test independently → Proactive suggestions work
5. Add User Story 4 → Test independently → Evolution reports work
6. Each story adds value without breaking previous stories

### Validation-First Approach (Recommended)

Since implementation already exists:

1. **Phase 2 first**: Update AUTO-INCREMENT.md with distributed memory (critical fix)
2. **Validate in priority order**: US1 → US2 → US3 → US4
3. **Stop at any checkpoint**: Each user story can be validated independently
4. **Document findings**: Create validation reports per story
5. **Fix issues immediately**: If validation fails, update AUTO-INCREMENT.md before proceeding

### Sequential Strategy (Single Validator)

1. Complete Setup (1 day)
2. Complete Foundational updates (1 day)
3. Validate User Story 1 (2 days)
4. Validate User Story 2 (2 days)
5. Validate User Story 3 (1 day)
6. Validate User Story 4 (2 days)
7. Polish and final integration (2 days)

**Total**: ~11 days of validation work

---

## Notes

- **[P] tasks**: Different files, can run in parallel (limited due to prompt-based testing)
- **[Story] label**: Maps task to specific user story for traceability
- **Each user story**: Should be independently validatable through acceptance scenarios
- **Validation approach**: Manual testing following quickstart.md and acceptance scenarios (no automated tests for prompt protocols)
- **Documentation**: Each phase produces validation reports documenting results
- **Commit strategy**: Commit after each phase or major validation milestone
- **Stop at checkpoints**: Validate story independently before moving to next priority
- **Avoid**: Skipping foundational phase (blocks all stories), validating stories out of dependency order

---

## Summary

**Total Tasks**: 90 tasks across 7 phases  
**User Stories**: 4 (P1-P4) with independent validation  
**Parallel Opportunities**: Limited (11 tasks marked [P] - primarily documentation)  
**Critical Path**: Setup → Foundational (AUTO-INCREMENT.md updates) → US1 → US3 → US4 (US2 can run parallel to US1/US3)  
**MVP Scope**: User Story 1 only (24 tasks: T001-T024)  
**Estimated Timeline**: 11 days for full validation (all user stories)

**Format Validation**: ✅ All tasks follow checklist format with ID, [P] where applicable, [Story] labels for US tasks, and exact file paths in descriptions.
