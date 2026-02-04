# Tasks: Slash Command Aliases for PromptOS

**Input**: Design documents from `/specs/011-slash-command-aliases/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Not explicitly requested - test tasks omitted

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Core protocols**: `.prompt-os/core/`
- **Agent configs**: Root level (AGENTS.md, CLAUDE.md, etc.)
- **Spec artifacts**: `specs/011-slash-command-aliases/`

---

## Phase 1: Setup

**Purpose**: Verify prerequisites and prepare for implementation

- [x] T001 Verify SPEC-006 (COMMAND-ROUTER.md) is complete and accessible in .prompt-os/core/COMMAND-ROUTER.md
- [x] T002 Verify SPEC-007 (WORKFLOW-ORCHESTRATOR.md) is complete and accessible in .prompt-os/core/WORKFLOW-ORCHESTRATOR.md
- [x] T003 [P] Verify INPUT-CLASSIFIER.md exists and contains current Step 0 in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T004 [P] Create backup reference of current INPUT-CLASSIFIER.md flow structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Update INPUT-CLASSIFIER.md Step 0 to split into 0a (special commands) and 0b (router delegation) in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T006 Add regex pattern `^/itzamna\.([a-z\-]+)(\s+.*)?$` detection to INPUT-CLASSIFIER.md in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T007 Update COMMAND-ROUTER.md grammar to include `slash_command = "itzamna." , hash_command` in .prompt-os/core/COMMAND-ROUTER.md
- [x] T008 Add alias translation logic section to COMMAND-ROUTER.md explaining slash → hash conversion in .prompt-os/core/COMMAND-ROUTER.md

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Basic Command Invocation via Slash Syntax (Priority: P1) MVP

**Goal**: Enable users to invoke any existing hash command using `/itzamna.{command}` syntax with identical results

**Independent Test**: Type `/itzamna.init my-project` and verify it routes to `#init my-project` workflow

### Implementation for User Story 1

- [x] T009 [US1] Expand COMMAND-ROUTER.md Router Map with all 11 workflow slash command aliases in .prompt-os/core/COMMAND-ROUTER.md:
  - `/itzamna.init` → BOOTSTRAP.md
  - `/itzamna.add` → BOOTSTRAP-AGENT.md
  - `/itzamna.sync` → SYNC-CONTEXT.md
  - `/itzamna.update` → UPDATE.md
  - `/itzamna.impl` → IMPLEMENTATION.md
  - `/itzamna.docs` → DOCUMENTATION.md
  - `/itzamna.new` → CARD-GENERATION.md
  - `/itzamna.bug` → BUG-FIXING.md
  - `/itzamna.review` → CODE-REVIEW.md
  - `/itzamna.test` → TEST-GENERATION.md
  - `/itzamna.arch` → ARCHITECTURE.md
- [x] T010 [US1] Document flag preservation rules (--persona, --skills, --dry-run) for slash commands in .prompt-os/core/COMMAND-ROUTER.md
- [x] T011 [US1] Verify argument preservation: test `/itzamna.impl --persona "Software Engineer" --skills tdd,clean-code` passes all flags to workflow
- [x] T012 [US1] Verify quoted argument parsing works with slash commands (e.g., `/itzamna.impl "arg with spaces"`)
- [x] T013 [US1] Implement sequential processing for multiple slash commands in single message (process in order of appearance) in .prompt-os/core/INPUT-CLASSIFIER.md

**Checkpoint**: User Story 1 complete - all workflow commands work via `/itzamna.*` syntax

---

## Phase 4: User Story 2 - Special Slash Commands for System Introspection (Priority: P2)

**Goal**: Provide read-only system introspection commands that don't trigger workflows

**Independent Test**: Type `/itzamna.status` and verify it returns system state without triggering any workflow

### Implementation for User Story 2

- [x] T014 [US2] Add special command detection in INPUT-CLASSIFIER.md Step 0a for status, skill, memory in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T015 [P] [US2] Implement `/itzamna.status` handler response template in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T016 [P] [US2] Implement `/itzamna.skill` handler with --list support in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T017 [P] [US2] Implement `/itzamna.skill {name}` handler for viewing specific skill in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T018 [P] [US2] Implement `/itzamna.memory` handler response template in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T019 [US2] Document data sources for special commands (MEMORY.md, skills/INDEX.md, tech-stack.md) in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T020 [US2] Verify special commands do NOT delegate to COMMAND-ROUTER (remain in INPUT-CLASSIFIER)

**Checkpoint**: User Story 2 complete - special commands return information without workflow execution

---

## Phase 5: User Story 3 - Help and Discovery via Slash Commands (Priority: P3)

**Goal**: Enable command discovery through help system and error suggestions

**Independent Test**: Type `/itzamna.help` and verify it returns complete command list with examples

### Implementation for User Story 3

- [x] T021 [US3] Implement `/itzamna.help` handler with full command table in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T022 [US3] Add `/itzamna` (without subcommand) → help redirect in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T023 [US3] Implement `--help` flag support for all slash commands in .prompt-os/core/COMMAND-ROUTER.md
- [x] T024 [US3] Implement unknown command error handler with suggestions in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T025 [US3] Add Levenshtein-based suggestion algorithm (suggest commands sharing ≥3 characters with input) in .prompt-os/core/INPUT-CLASSIFIER.md
- [x] T026 [US3] Document available commands list for error messages (init, impl, new, bug, review, test, docs, arch, add, sync, update, status, skill, memory, help)

**Checkpoint**: User Story 3 complete - users can discover commands via help and get suggestions for typos

---

## Phase 6: Agent Configuration Updates

**Purpose**: Update all agent bootstrap files with slash command documentation

- [x] T027 [P] Add slash command section to AGENTS.md with command table and examples in AGENTS.md
- [x] T028 [P] Add slash command section to CLAUDE.md with detection patterns in CLAUDE.md
- [x] T029 [P] Add slash command section to GEMINI.md with detection patterns in GEMINI.md
- [x] T030 [P] Add slash command section to QWEN.md with detection patterns in QWEN.md
- [x] T031 [P] Add slash command section to .cursorrules with detection patterns in .cursorrules
- [x] T032 Update version to v2.3.0-dev in all modified agent files

**Checkpoint**: All agent configurations recognize slash command syntax

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation

- [x] T033 Run regression test: verify `#init` still works after changes
- [x] T034 Run regression test: verify `#impl` still works after changes
- [x] T035 Run regression test: verify all hash shortcuts unchanged
- [x] T036 [P] Update MEMORY.md with SPEC-011 completion status
- [x] T037 [P] Update specs/COMPLETION-STATUS.md with SPEC-011 entry
- [x] T038 Cross-model validation: test slash commands in Claude conversation
- [x] T039 Cross-model validation: test slash commands in Gemini conversation
- [x] T040 Cross-model validation: test slash commands with Copilot
- [x] T041 Create COMPLETION-SUMMARY.md in specs/011-slash-command-aliases/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially (P1 → P2 → P3) or in parallel
- **Agent Updates (Phase 6)**: Can run in parallel with User Stories 2-3 after Phase 3 is complete
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May reference US1/US2 for help content

### Within Each User Story

- US1: T009 is the main Router Map task (single consolidated task)
- US2: Special command handlers (T015-T018) can run in parallel
- US3: Help and error handlers are sequential
- Agent config updates (T027-T031) can all run in parallel
- Validation/verification tasks must run after implementation

### Parallel Opportunities

**Within Phase 4 (US2):**
```bash
# All special command handlers can run in parallel:
T015, T016, T017, T018
```

**Within Phase 6:**
```bash
# All agent config updates can run in parallel:
T027, T028, T029, T030, T031
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test `/itzamna.init`, `/itzamna.impl` work correctly
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add Agent Updates → All agents recognize slash commands
6. Polish → Cross-model validation complete

### Files Modified Summary

| File | Phase | Tasks |
|------|-------|-------|
| `.prompt-os/core/INPUT-CLASSIFIER.md` | 2, 3, 4, 5 | T005, T006, T013-T022, T024-T025 |
| `.prompt-os/core/COMMAND-ROUTER.md` | 2, 3, 5 | T007-T012, T023 |
| `AGENTS.md` | 6 | T027, T032 |
| `CLAUDE.md` | 6 | T028, T032 |
| `GEMINI.md` | 6 | T029, T032 |
| `QWEN.md` | 6 | T030, T032 |
| `.cursorrules` | 6 | T031, T032 |
| `MEMORY.md` | 7 | T036 |
| `specs/COMPLETION-STATUS.md` | 7 | T037 |
| `specs/011-slash-command-aliases/COMPLETION-SUMMARY.md` | 7 | T041 |

---

## Notes

- [P] tasks = different files or independent sections, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Hash commands must continue working (regression tests in Phase 7)

---

*tasks.md — SPEC-011 Task List | v1.1 | 2026-02-04*
