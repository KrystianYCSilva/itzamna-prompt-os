# Tasks: Language Skills Baseline Implementation

**Input**: Design documents from `C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, execution-checklist.md ✅

**Feature Type**: Documentation workflow execution (NOT traditional software development)  
**Organization**: Tasks organized by user story to enable independent workflow validation

**Tests**: NOT INCLUDED - This is a documentation creation workflow, not code. Validation occurs via Self-Critique protocol and Human Gate approval.

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- All paths are absolute from repository root

---

## Phase 1: Setup & Validation

**Purpose**: Verify prerequisites and prepare execution environment

**Estimated Time**: 1 hour

- [X] T001 Verify all prerequisite files exist: check memory/opencode-spec010-session.md, .prompt-os/core/SELF-CRITIQUE.md, .prompt-os/core/HUMAN-GATE.md, .prompt-os/core/AUTO-INCREMENT.md, .prompt-os/templates/SKILL.template.md
- [X] T002 Create directory structure C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\ if not exists
- [X] T003 [P] Review C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\research.md (understand language versions, sources, standards)
- [X] T004 [P] Review C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\data-model.md (skill structure, workflow states, Human Gate format)
- [X] T005 Load protocols JIT: read .prompt-os/core/SELF-CRITIQUE.md, .prompt-os/core/HUMAN-GATE.md, .prompt-os/core/AUTO-INCREMENT.md (20 min first-time read)
- [X] T006 Mark Phase 1 complete in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\execution-checklist.md

**Checkpoint**: Foundation ready - baseline skill creation can now begin

---

## Phase 2: Foundational

**Purpose**: NO FOUNDATIONAL PHASE - Each language skill is independent

**Note**: Unlike software projects, this workflow has no blocking prerequisites beyond Phase 1. Each language can theoretically be created in parallel, BUT we execute sequentially (Java → Kotlin → C/C++ → JS → Python) to enable rejection learning per Assumption #7.

**Checkpoint**: Proceed directly to User Story 1 (Java Baseline)

---

## Phase 3: User Story 1 - Agent References Baseline Language Skill (Priority: P1) 🎯 MVP

**Goal**: Create Java baseline skill as first reference for agents needing Java guidance

**Independent Test**: Agent loads C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\java\SKILL.md and successfully answers questions about Java threading, typing system, memory management

**Language**: Java (First skill - establishes baseline workflow)

**Estimated Time**: 45-60 minutes

### Research Phase (T007-T009)

- [X] T007 [US1] Research Java core concepts: Access docs.oracle.com/javase/17 and docs.oracle.com/javase/21, identify typing system (static strong generics), memory model (heap GC stack), concurrency (threads synchronized virtual-threads), ecosystem (Maven Gradle JVM)
- [X] T008 [US1] Collect 4-5 Java code examples: type safety with generics, GC memory leak example, thread synchronization, Maven/Gradle basics (15 min research)
- [X] T009 [US1] Detect and log gaps: While researching, if foundational concepts missing from system (e.g., "JVM internals", "GC algorithms"), log in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md Gaps Detectados table

### Generation Phase (T010-T011)

- [X] T010 [US1] Create directory C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\java\ if not exists
- [X] T011 [US1] Generate C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\java\SKILL.md: Fill YAML frontmatter (name: java, level: baseline, version: "1.0.0", language_version: "Java 17 LTS, 21 LTS", tags, sources from R1 research), write 6 sections (Introdução, Sistema de Tipagem, Gerenciamento de Memória, Modelo de Concorrência, Ecossistema, Recursos e Referências), include ≥3 examples, verify <1400 tokens, no placeholders

### Self-Critique Phase (T012-T014)

- [X] T012 [US1] Execute Self-Critique protocol on Java skill: Load .prompt-os/core/SELF-CRITIQUE.md, evaluate 4 dimensions (Completude 0-25, Clareza 0-25, Correção 0-25, Best Practices 0-25), calculate overall score 0-100, run constitution check (T0-SIZE-01 <1400 tokens, T0-VALIDATE no placeholders, T0-SOURCE-01 sources cited), generate suggestions
- [X] T013 [US1] Record Java Self-Critique scores in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md Self-Critique Tracking table: Date, Language: java, Overall, Comp, Clar, Corr, BP, Const (PASS/FAIL), Status
- [X] T014 [US1] If score <70: Revise Java skill weakest dimension, re-run Self-Critique (FR-010), repeat until ≥70

### Human Gate Phase (T015-T018)

- [X] T015 [US1] Present Java skill via Human Gate: Load .prompt-os/core/HUMAN-GATE.md, display preview (overall score, 4 dimension scores with interpretation from R5 research, constitution check status, learned actions applied if any, suggestions, skill preview YAML + structure + first 200 chars)
- [X] T016 [US1] Await human decision: approve | view | edit [section] | reject [reason] | cancel
- [X] T017 [US1] If rejected: Categorize rejection reason using R7 decision tree (exemplos/especificidade/clareza/completude/relevancia/outros), extract learned action, record in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md Log de Rejeicoes table (Date, Tipo: skill, Item: java, Motivo, Categoria, Aprendizado), offer retry
- [X] T018 [US1] If approved: Proceed to indexing

### Indexing Phase (T019-T021)

- [X] T019 [US1] Add Java skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\skills\INDEX.md: Insert entry with name, category: technology/languages, description, file path
- [X] T020 [US1] Add Java skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\INDEX.md: Mirror entry from main INDEX
- [X] T021 [US1] Commit Java skill: git add .prompt-os/skills/linguagens/java/SKILL.md skills/INDEX.md .prompt-os/skills/INDEX.md && git commit -m "skill(linguagens): add Java baseline skill"

- Core concepts: static strong typing, heap GC, threads/virtual threads, Maven/Gradle
- Self-Critique score: [N]/100 (Completude: [N], Clareza: [N], Correção: [N], Best Practices: [N])
- Constitution: PASS
- Examples: [N] code examples with context
- Sources: docs.oracle.com/javase/17, docs.oracle.com/javase/21"

### Monitoring Phase (T022)

- [ ] T022 [US1] Update C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\execution-checklist.md: Mark Java baseline complete, note actual time spent vs 45-60 min estimate

**Checkpoint**: Java baseline skill complete, indexed, and available. User Story 1 acceptance scenarios testable.

---

## Phase 4: User Story 2 - Human Validates Skill Quality Through Self-Critique (Priority: P1)

**Goal**: Create Kotlin baseline skill, demonstrating Self-Critique quality validation with human decision-making

**Independent Test**: Agent loads C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\kotlin\SKILL.md, human reviews Self-Critique score breakdown and makes informed approval decision

**Language**: Kotlin (Second skill - validates Self-Critique workflow with human in loop)

**Estimated Time**: 45-60 minutes

**Note**: This phase demonstrates User Story 2 (Quality Validation) while also delivering Kotlin skill content

### Research Phase (T023-T025)

- [X] T023 [US2] Research Kotlin core concepts: Access kotlinlang.org/docs, identify typing system (static strong null-safety type-inference), memory model (JVM-based GC plus Kotlin/Native), concurrency (coroutines suspend-fun structured-concurrency), ecosystem (Gradle Kotlin-DSL JVM/JS/Native)
- [X] T024 [US2] Collect 4-5 Kotlin code examples: null safety with ?. and !!, coroutine basics with suspend, type inference, Gradle Kotlin DSL (15 min research)
- [X] T025 [US2] Detect and log gaps: Check for JVM overlap with Java (may reference Java skill for JVM internals), log only Kotlin-specific gaps if any

### Generation Phase (T026-T027)

- [X] T026 [US2] Create directory C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\kotlin\ if not exists
- [X] T027 [US2] Generate C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\kotlin\SKILL.md: Apply learned actions from Java rejection if any, fill YAML (name: kotlin, language_version: "Kotlin 1.9.x", related_skills: [java]), write 6 sections, include ≥3 examples, <1400 tokens, no placeholders

### Self-Critique Phase (T028-T030)

- [ ] T028 [US2] Execute Self-Critique protocol on Kotlin skill: 4 dimensions scoring, overall 0-100, constitution check
- [ ] T029 [US2] Record Kotlin Self-Critique scores in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md
- [ ] T030 [US2] If score <70: Revise and re-critique

### Human Gate Phase (T031-T034) - DEMONSTRATES US2 ACCEPTANCE SCENARIOS

- [ ] T031 [US2] Present Kotlin skill via Human Gate: Show overall score with quality label (90-100 Excellent, 80-89 Production, 70-79 Acceptable, 60-69 Needs Work, <60 Unacceptable per R5), dimension breakdown with interpretations (20-25 Good, 15-19 Acceptable, <15 Needs Work), constitution check (size tokens violations), learned actions applied from Java, suggestions for improvement
- [ ] T032 [US2] Demonstrate score interpretation: If score 85, human sees "Production Ready - Strong baseline, approve", if score 68, human sees "Needs Improvement - Below threshold, edit required" with weakest dimensions flagged
- [ ] T033 [US2] If rejected: Categorize, extract learned action, record in memory Log de Rejeicoes, verify rejection reason maps to category correctly (validates US2 acceptance scenario 3)
- [ ] T034 [US2] If approved: Proceed to indexing

### Indexing Phase (T035-T037)

- [ ] T035 [US2] Add Kotlin skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\skills\INDEX.md
- [ ] T036 [US2] Add Kotlin skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\INDEX.md
- [ ] T037 [US2] Commit Kotlin skill: git commit message includes Self-Critique score breakdown (demonstrates quality metrics transparency)

### Monitoring Phase (T038)

- [ ] T038 [US2] Update execution-checklist.md: Mark Kotlin complete, note if Self-Critique scores improved from Java (validates rejection learning if applicable)

**Checkpoint**: Kotlin baseline skill complete. User Story 2 acceptance scenarios testable (human saw score breakdown, made informed decision, constitution violations detected if any).

---

## Phase 5: User Story 3 - System Detects Knowledge Gaps During Research (Priority: P2)

**Goal**: Create C/C++ baseline skill while actively monitoring for and logging knowledge gaps

**Independent Test**: After generating C/C++ skill, review C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md Gaps Detectados table for entries logged during C/C++ research phase

**Language**: C/C++ (Third skill - emphasizes gap detection workflow)

**Estimated Time**: 45-60 minutes

**Note**: This phase demonstrates User Story 3 (Gap Detection) while delivering C/C++ skill content

### Research Phase (T039-T041) - DEMONSTRATES US3 ACCEPTANCE SCENARIOS

- [ ] T039 [US3] Research C/C++ core concepts: Access cppreference.com, identify typing (static weak-C strong-C++ manual-casting templates), memory (manual malloc/free new/delete RAII smart-pointers), concurrency (pthreads std::thread mutexes atomics), ecosystem (GCC/Clang/MSVC Make/CMake STL)
- [ ] T040 [US3] Collect 4-5 C/C++ code examples: pointer management, RAII with smart pointers, memory leak pattern, thread synchronization (15 min research)
- [ ] T041 [US3] **Actively detect gaps** (US3 focus): While researching C/C++ memory management, if "Memory allocation fundamentals" or "RAII pattern explained" missing from system, log gaps in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md Gaps Detectados table (Date, Request: "While documenting C++ RAII, realized memory allocation fundamentals skill would help", Skill Sugerida: memory-allocation-fundamentals, Status: pending), verify gap doesn't duplicate existing skills by checking skills/INDEX.md first (validates US3 acceptance scenario 3)

### Generation Phase (T042-T043)

- [ ] T042 [US3] Create directory C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\c-and-cpp\ if not exists
- [ ] T043 [US3] Generate C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\c-and-cpp\SKILL.md: Apply learned actions from Java/Kotlin rejections if any, fill YAML (name: c-and-cpp, language_version: "C11/C17, C++17/C++20"), write 6 sections covering both C and C++ where relevant, include ≥3 examples, <1400 tokens

### Self-Critique Phase (T044-T046)

- [ ] T044 [US3] Execute Self-Critique protocol on C/C++ skill
- [ ] T045 [US3] Record C/C++ Self-Critique scores in memory
- [ ] T046 [US3] If score <70: Revise and re-critique

### Human Gate Phase (T047-T050)

- [ ] T047 [US3] Present C/C++ skill via Human Gate
- [ ] T048 [US3] If rejected: Categorize, extract learned action, record in memory
- [ ] T049 [US3] If approved: Proceed to indexing
- [ ] T050 [US3] Note any gaps mentioned during Human Gate feedback (human may suggest additional gaps)

### Indexing Phase (T051-T053)

- [ ] T051 [US3] Add C/C++ skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\skills\INDEX.md
- [ ] T052 [US3] Add C/C++ skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\INDEX.md
- [ ] T053 [US3] Commit C/C++ skill

### Monitoring Phase (T054)

- [ ] T054 [US3] Update execution-checklist.md: Mark C/C++ complete, count total gaps logged so far (should be <10 target per SC-011)

**Checkpoint**: C/C++ baseline skill complete. User Story 3 acceptance scenarios testable (gaps logged during research, gap detection report inputs collected).

---

## Phase 6: User Story 4 - System Learns From Rejections (Priority: P2)

**Goal**: Create JavaScript baseline skill, demonstrating rejection learning workflow if any prior rejections occurred

**Independent Test**: If any prior skill (Java/Kotlin/C++) was rejected, verify JavaScript generation references learned actions from memory and applies them

**Language**: JavaScript (Fourth skill - emphasizes rejection learning)

**Estimated Time**: 45-60 minutes

**Note**: This phase demonstrates User Story 4 (Rejection Learning) while delivering JavaScript skill content. If no rejections yet, this validates zero-rejection scenario.

### Research Phase (T055-T057)

- [ ] T055 [US4] Research JavaScript core concepts: Access developer.mozilla.org/en-US/docs/Web/JavaScript, identify typing (dynamic weak coercion typeof), memory (automatic GC closures V8), concurrency (event-loop async/await Promises Web-Workers), ecosystem (npm/yarn/pnpm Node.js/browser ECMAScript bundlers)
- [ ] T056 [US4] Collect 4-5 JavaScript code examples: type coercion == vs ===, closure memory implications, async/await pattern, npm package.json (15 min research)
- [ ] T057 [US4] Detect and log gaps if any

### Generation Phase (T058-T060) - DEMONSTRATES US4 ACCEPTANCE SCENARIOS

- [ ] T058 [US4] Create directory C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\javascript\ if not exists
- [ ] T059 [US4] **Review learned actions** (US4 focus): Before generating, read C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md Log de Rejeicoes table, identify all learned actions from Java/Kotlin/C++ rejections (e.g., "Test all code examples before submission", "Include language-idiomatic examples"), apply to JavaScript generation (validates US4 acceptance scenario 3)
- [ ] T060 [US4] Generate C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\javascript\SKILL.md: Apply learned actions explicitly (if learned "Test examples", test all JS examples; if learned "Include idioms", add JavaScript-specific patterns like closures/prototypes), fill YAML (name: javascript, language_version: "ES2023 (ES14)"), write 6 sections, include ≥3 tested examples, <1400 tokens

### Self-Critique Phase (T061-T063)

- [ ] T061 [US4] Execute Self-Critique protocol on JavaScript skill
- [ ] T062 [US4] Record JavaScript Self-Critique scores in memory
- [ ] T063 [US4] If score <70: Revise and re-critique

### Human Gate Phase (T064-T067) - VALIDATES REJECTION LEARNING

- [ ] T064 [US4] Present JavaScript skill via Human Gate: Include "Learned Actions Applied" section showing which prior rejections informed this generation (validates US4 acceptance scenario 3 and SC-017)
- [ ] T065 [US4] If rejected with category already seen (e.g., 2nd "exemplos" rejection): Flag potential pattern >30% threshold per FR-022, pause execution, generate interim rejection analysis, recommend process adjustment
- [ ] T066 [US4] If rejected: Categorize, extract learned action, record in memory, note if this creates pattern
- [ ] T067 [US4] If approved: Proceed to indexing

### Indexing Phase (T068-T070)

- [ ] T068 [US4] Add JavaScript skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\skills\INDEX.md
- [ ] T069 [US4] Add JavaScript skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\INDEX.md
- [ ] T070 [US4] Commit JavaScript skill

### Monitoring Phase (T071)

- [ ] T071 [US4] Update execution-checklist.md: Mark JavaScript complete, calculate rejection rate so far (should be <20% per SC-007: max 1 rejection across 4 skills = 25%, borderline acceptable)

**Checkpoint**: JavaScript baseline skill complete. User Story 4 acceptance scenarios testable (learned actions from prior rejections applied and visible in Human Gate preview).

---

## Phase 7: User Story 5 - Team Reviews Evolution Through Reports (Priority: P3)

**Goal**: Create Python baseline skill (final skill), then generate all 3 monitoring reports for team review

**Independent Test**: After completing Python skill and generating reports, team reviews C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\reports\gap-detection-report.md, rejection-analysis-report.md, self-critique-metrics.md for insights

**Language**: Python (Fifth and final skill)

**Estimated Time**: 45-60 minutes for skill + 30-45 minutes for report generation

**Note**: This phase delivers Python skill AND demonstrates User Story 5 (Report Generation)

### Research Phase (T072-T074)

- [ ] T072 [US5] Research Python core concepts: Access docs.python.org/3, identify typing (dynamic strong duck-typing type-hints gradual-typing), memory (automatic GC reference-counting cycle-detector), concurrency (GIL threading-limited asyncio multiprocessing), ecosystem (pip/poetry PyPI CPython/PyPy venv data-science)
- [ ] T073 [US5] Collect 4-5 Python code examples: duck typing, type hints PEP 484, GIL implications, asyncio basics, pip requirements.txt (15 min research)
- [ ] T074 [US5] Detect and log gaps if any (final opportunity to identify foundational missing concepts)

### Generation Phase (T075-T076)

- [ ] T075 [US5] Create directory C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\python\ if not exists
- [ ] T076 [US5] Generate C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\python\SKILL.md: Apply all learned actions from Java/Kotlin/C++/JS rejections, fill YAML (name: python, language_version: "Python 3.11+, 3.12"), write 6 sections, include ≥3 examples, <1400 tokens

### Self-Critique Phase (T077-T079)

- [ ] T077 [US5] Execute Self-Critique protocol on Python skill
- [ ] T078 [US5] Record Python Self-Critique scores in memory
- [ ] T079 [US5] If score <70: Revise and re-critique (final skill, apply maximum learning from previous 4)

### Human Gate Phase (T080-T082)

- [ ] T080 [US5] Present Python skill via Human Gate: Show all learned actions applied (potentially 4 prior rejections' lessons)
- [ ] T081 [US5] If rejected: Categorize, extract learned action, record in memory (final rejection log entry)
- [ ] T082 [US5] If approved: Proceed to indexing

### Indexing Phase (T083-T085)

- [ ] T083 [US5] Add Python skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\skills\INDEX.md
- [ ] T084 [US5] Add Python skill to C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\INDEX.md
- [ ] T085 [US5] Commit Python skill

### Report Generation Phase (T086-T094) - DEMONSTRATES US5 ACCEPTANCE SCENARIOS

**Purpose**: Generate 3 monitoring reports from memory data (FR-024 to FR-026)

- [ ] T086 [P] [US5] Read C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md as single source of truth (FR-028)
- [ ] T087 [P] [US5] Generate Gap Detection Report: Count total gaps (should be <10 per SC-011), calculate resolution rate (created / total), identify most frequent gaps (group by skill_sugerida), cross-reference detection dates, fill C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\reports\gap-detection-report-DRAFT.md placeholders, save as gap-detection-report.md (remove -DRAFT per FR-027), validates US5 acceptance scenario 3
- [ ] T088 [P] [US5] Generate Rejection Analysis Report: Count total rejections (should result in <20% rate per SC-007), calculate category percentages (exemplos/especificidade/clareza/completude/relevancia/outros), check if any category >30% (flag pattern per FR-022 and US4 acceptance scenario 2), list top learned actions by frequency, fill C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\reports\rejection-analysis-report-DRAFT.md, save as rejection-analysis-report.md, validates US5 acceptance scenario 2
- [ ] T089 [P] [US5] Generate Self-Critique Metrics Report: Calculate average overall score across 5 skills (must be ≥75 per SC-002), calculate average per dimension (completude clareza correcao best_practices), identify min/max scores (range analysis), calculate standard deviation (consistency measure), count constitution violations (should be 0 per SC-004), analyze score distribution (how many 90-100, 80-89, 70-79, etc. per R5 ranges), correlate scores with Human Gate decisions (rejected skills should have lower scores per SC-022), fill C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\reports\self-critique-metrics-DRAFT.md, save as self-critique-metrics.md, validates US5 acceptance scenario 1
- [ ] T090 [US5] Review all 3 reports for actionable insights (SC-020): Identify protocol weaknesses (e.g., if Self-Critique scores don't correlate with rejections, flag SPEC-001 issue), identify process improvements (e.g., if gap detection >10, tune threshold), note patterns (e.g., if "exemplos" category dominates rejections, recommend example validation step)
- [ ] T091 [US5] Commit reports: git add specs/010-language-skills-baseline/reports/*.md && git commit -m "docs(spec-010): generate monitoring reports for 5 language baselines

- Gap Detection Report: [N] gaps total, [N]% resolution rate
- Rejection Analysis Report: [N] rejections ([N]% rate), categories: [distribution]
- Self-Critique Metrics Report: avg score [N]/100, correlation analysis [result]
- Insights: [key findings for protocol improvement]"
- [ ] T092 [US5] Update C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\execution-checklist.md: Mark Python baseline and report generation complete, verify 100% completion per SC-021
- [ ] T093 [US5] Update C:\Users\kryst\IdeaProjects\itzamna-prompt-os\MEMORY.md: Document SPEC-010 completion, key learnings from reports, protocol effectiveness findings (SC-022 to SC-025 outcomes)
- [ ] T094 [US5] Commit execution checklist and MEMORY updates: git add specs/010-language-skills-baseline/execution-checklist.md MEMORY.md && git commit -m "docs(spec-010): complete execution checklist and document learnings"

### Monitoring Phase (T095)

- [ ] T095 [US5] Final verification: Ensure all 5 skills indexed (SC-001), average score ≥75 (SC-002), all scores ≥70 (SC-003), rejection rate <20% (SC-007), gaps <10 (SC-011), all 3 reports generated (SC-019)

**Checkpoint**: Python baseline skill complete. All 5 skills created. All 3 monitoring reports generated. User Story 5 acceptance scenarios testable (reports show quality trends, common issues, protocol effectiveness).

---

## Phase 8: Polish & Validation

**Purpose**: Verify all success criteria and finalize SPEC-010

**Estimated Time**: 30 minutes

- [ ] T096 Verify all 25 success criteria from C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\spec.md: SC-001 (5 skills created), SC-002 (avg ≥75), SC-003 (all ≥70), SC-004 (0 violations), SC-005 (≥3 examples), SC-006 (sources cited), SC-007 (<20% rejections), SC-008 (≤60 min/skill), SC-009 (≤8 days total), SC-010 (0 re-rejections), SC-011 (<10 gaps), SC-012 (<30% false positives), SC-013 (gaps logged), SC-014 (rejections categorized), SC-015 (learned actions documented), SC-016 (no category >30%), SC-017 (learned actions applied), SC-018 (memory file complete), SC-019 (reports generated), SC-020 (insights identified), SC-021 (checklist 100%), SC-022 (score correlation), SC-023 (gap signal-to-noise ≥70%), SC-024 (rejection improvement over time), SC-025 (monitoring workflow successful)
- [ ] T097 Document any deviations from success criteria in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\MEMORY.md: If any SC not met, explain why and recommend mitigation (e.g., SC-002 avg score 73 instead of 75, explain Java was learning curve)
- [ ] T098 Document protocol effectiveness findings in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\MEMORY.md: SPEC-001 (Self-Critique v2.0) performance (did scores correlate with decisions?), SPEC-002 (Auto-Increment) performance (were gaps useful? did rejection learning work?), recommendations for protocol improvements
- [ ] T099 Mark SPEC-010 as complete in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\MEMORY.md: Update status, record total execution time, note key achievements
- [ ] T100 Final commit: git add MEMORY.md && git commit -m "docs(spec-010): complete all 5 baseline language skills and validation

Summary:
- Skills created: Java, Kotlin, C/C++, JavaScript, Python
- Average Self-Critique score: [N]/100 (target: ≥75)
- Rejection rate: [N]% (target: <20%)
- Gaps detected: [N] (target: <10)
- Execution time: [N] days (target: ≤8)
- Constitution violations: 0
- All 3 monitoring reports generated
- SPEC-001 (Self-Critique) validation: [PASS/FINDINGS]
- SPEC-002 (Auto-Increment) validation: [PASS/FINDINGS]

SPEC-010 COMPLETE ✅"

**Checkpoint**: SPEC-010 Language Skills Baseline Implementation COMPLETE

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: N/A - no blocking foundational phase for this workflow
- **User Stories (Phases 3-7)**: All depend on Phase 1 (Setup) completion
  - **MUST execute sequentially**: Java (P3) → Kotlin (P4) → C/C++ (P5) → JavaScript (P6) → Python (P7)
  - **Rationale**: Sequential execution enables rejection learning (Assumption #7, FR-021, SC-024)
- **Polish (Phase 8)**: Depends on all 5 language skills complete (Phases 3-7)

### User Story Dependencies

- **US1 (Java - Agent References Baseline)**: Can start after Phase 1 - No dependencies
- **US2 (Kotlin - Quality Validation)**: Depends on US1 (applies Java learned actions if any) - Demonstrates Self-Critique workflow
- **US3 (C/C++ - Gap Detection)**: Depends on US2 (applies Java/Kotlin learned actions if any) - Demonstrates gap logging
- **US4 (JavaScript - Rejection Learning)**: Depends on US3 (applies all prior learned actions) - Demonstrates rejection pattern detection
- **US5 (Python + Reports - Evolution Review)**: Depends on US4 (applies all prior learned actions) PLUS requires all 5 skills complete before report generation

### Within Each User Story (Language Skill)

1. Research BEFORE Generation (need concepts to write about)
2. Generation BEFORE Self-Critique (need artifact to evaluate)
3. Self-Critique BEFORE Human Gate (need score to present)
4. Human Gate decision BEFORE Indexing or Rejection (human must approve)
5. Indexing only if Approved (rejected skills don't get indexed)
6. Monitoring updates AFTER skill complete (track actual outcomes)

### Parallel Opportunities

**NONE for language skills** - Sequential execution required per Assumption #7

**Within Phase 1 (Setup)**:
- T003 (review research.md) and T004 (review data-model.md) can run in parallel [P]

**Within Phase 7 (Report Generation)**:
- T086 (read memory file), T087 (gap report), T088 (rejection report), T089 (self-critique report) can run in parallel [P] after all 5 skills complete

---

## Parallel Example: Report Generation (User Story 5)

```bash
# After all 5 skills complete, launch all report generation tasks together:

Task: "Read memory/opencode-spec010-session.md as single source of truth"
Task: "Generate Gap Detection Report from memory data"
Task: "Generate Rejection Analysis Report from memory data"
Task: "Generate Self-Critique Metrics Report from memory data"

# These are independent analyses of the same source data, can execute in parallel
```

---

## Implementation Strategy

### MVP First (User Story 1 Only - Java Baseline)

1. Complete Phase 1: Setup & Validation (~1 hour)
2. Complete Phase 3: User Story 1 (Java baseline) (~45-60 min)
3. **STOP and VALIDATE**: Load Java skill, test with agent queries about Java threading/typing/memory
4. Deploy Java skill to production (agents can now reference)

**Result**: Minimum viable baseline skill library with 1 language

### Incremental Delivery (Add Languages Sequentially)

1. Setup → Java skill → **Test Java independently** → Deploy
2. Add Kotlin skill → **Test Kotlin independently** → Deploy (now 2 languages available)
3. Add C/C++ skill → **Test C/C++ independently** → Deploy (now 3 languages)
4. Add JavaScript skill → **Test JavaScript independently** → Deploy (now 4 languages)
5. Add Python skill → **Test Python independently** → Deploy (now 5 languages)
6. Generate reports → **Review protocol effectiveness** → Complete

**Result**: Each skill adds value incrementally without breaking existing skills

### Full Completion (All 5 Skills + Reports)

1. Complete Phase 1: Setup (~1 hour)
2. Complete Phase 3-7: All 5 language skills sequentially (~4-5 hours active time)
3. Generate all 3 monitoring reports (~45 min)
4. Complete Phase 8: Validation (~30 min)
5. **Total active time**: ~6.5 hours
6. **Total calendar time**: ≤8 working days (depends on Human Gate response times)

**Result**: Complete baseline language skills library with protocol effectiveness data

---

## Validation Checklist (Run After Completion)

Use this checklist to verify SPEC-010 success:

### Skill Creation & Quality (SC-001 to SC-006)

- [ ] ✅ SC-001: All 5 skills created in C:\Users\kryst\IdeaProjects\itzamna-prompt-os\.prompt-os\skills\linguagens\ (java, kotlin, c-and-cpp, javascript, python)
- [ ] ✅ SC-002: Average Self-Critique score ≥75 (calculate from memory Self-Critique Tracking table)
- [ ] ✅ SC-003: All 5 individual scores ≥70 (check each skill's overall score)
- [ ] ✅ SC-004: Zero constitution violations in approved skills (check Const column = PASS for all)
- [ ] ✅ SC-005: All skills contain ≥3 code examples (grep "### Exemplo:" in each SKILL.md)
- [ ] ✅ SC-006: All skills cite authoritative sources (check sources: field in YAML frontmatter)

### Process Efficiency (SC-007 to SC-010)

- [ ] ✅ SC-007: Rejection rate <20% (count rejections in memory Log de Rejeicoes, divide by 5 skills)
- [ ] ✅ SC-008: Average time ≤60 min per skill (check timestamps in execution-checklist.md)
- [ ] ✅ SC-009: Total execution ≤8 working days (check execution-checklist.md start to end dates)
- [ ] ✅ SC-010: Zero re-rejections (check memory Log de Rejeicoes for duplicate Item entries)

### Gap Detection Quality (SC-011 to SC-013)

- [ ] ✅ SC-011: Total gaps <10 (count rows in memory Gaps Detectados table)
- [ ] ✅ SC-012: False positive rate <30% (count gaps with Status: rejected or deferred, divide by total)
- [ ] ✅ SC-013: All gaps logged with complete info (check table has Date, Request, Skill Sugerida, Status)

### Rejection Learning Effectiveness (SC-014 to SC-017)

- [ ] ✅ SC-014: All rejections categorized (check Categoria column populated in memory Log de Rejeicoes)
- [ ] ✅ SC-015: All rejections have learned action (check Aprendizado column populated)
- [ ] ✅ SC-016: No category >30% (count by Categoria, check max % <30)
- [ ] ✅ SC-017: Learned actions applied to later skills (verify in Human Gate previews or commit messages)

### Data Collection & Reporting (SC-018 to SC-021)

- [ ] ✅ SC-018: Memory file complete (check C:\Users\kryst\IdeaProjects\itzamna-prompt-os\memory\opencode-spec010-session.md has all 3 tables filled)
- [ ] ✅ SC-019: All 3 reports generated (check C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\reports\ for gap-detection-report.md, rejection-analysis-report.md, self-critique-metrics.md without -DRAFT)
- [ ] ✅ SC-020: Reports identify actionable insights (read reports, verify recommendations section populated)
- [ ] ✅ SC-021: Execution checklist 100% complete (check all checkboxes marked in execution-checklist.md)

### Protocol Validation (SC-022 to SC-025)

- [ ] ✅ SC-022: Score correlation validated (check self-critique-metrics.md for correlation analysis, rejected skills should have lower scores)
- [ ] ✅ SC-023: Gap signal-to-noise ≥70% (check gap-detection-report.md, calculate useful gaps / total gaps)
- [ ] ✅ SC-024: Rejection improvement over time (if multiple rejections, later skills should score higher per self-critique-metrics.md)
- [ ] ✅ SC-025: Monitoring workflow successful (verify data collected naturally per execution-checklist.md, no extra steps needed)

---

## Notes

- **No [P] markers on language skill tasks**: All language tasks sequential (Java → Kotlin → C/C++ → JavaScript → Python) per Assumption #7 rejection learning requirement
- **User Story labels [US1-US5]** map tasks to spec.md user stories for traceability
- **Exact file paths** included in every task for immediate executability
- **Workflow-based tasks** (not code-based): Tasks focus on research, generation, evaluation, approval rather than traditional software implementation
- **Human Gate blocking**: Tasks after T015, T031, T047, T064, T080 block on human availability (variable wait time)
- **Self-Critique loops**: Tasks T014, T030, T046, T063, T079 may loop multiple times until score ≥70 (FR-010)
- **Checkpoint validation**: Each phase ends with verifiable checkpoint enabling independent story testing per spec requirement
- **Constitution violations**: If any task detects T0 violations, MUST block approval and revise before continuing
- **Commit messages**: Include Self-Critique scores and key metrics for transparency and traceability

---

**Total Tasks**: 100 tasks  
**Task Count by User Story**:
- Setup (Phase 1): 6 tasks
- US1 (Java): 16 tasks
- US2 (Kotlin): 16 tasks
- US3 (C/C++): 16 tasks
- US4 (JavaScript): 16 tasks
- US5 (Python + Reports): 25 tasks
- Polish (Phase 8): 5 tasks

**Parallel Opportunities**: 5 parallel tasks total (2 in Setup, 3 in Report Generation)

**Independent Test Criteria**:
- US1: Agent loads Java skill and answers Java questions correctly
- US2: Human reviews Kotlin Self-Critique preview and makes informed decision
- US3: Memory file shows gaps logged during C/C++ research
- US4: JavaScript Human Gate preview shows learned actions from prior rejections applied
- US5: Reports generated from memory data showing protocol effectiveness metrics

**Suggested MVP Scope**: Phase 1 (Setup) + Phase 3 (Java Baseline - US1) = ~2 hours total

---

**STATUS**: Tasks.md generation COMPLETE ✅  
**Output**: C:\Users\kryst\IdeaProjects\itzamna-prompt-os\specs\010-language-skills-baseline\tasks.md  
**Ready for**: Execution following tasks.md and execution-checklist.md