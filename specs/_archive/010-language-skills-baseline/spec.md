# Feature Specification: Language Skills Baseline Implementation

**Feature Branch**: `010-language-skills-baseline`  
**Created**: 2026-02-03  
**Status**: Draft  
**Input**: Generate formal specification for implementing 5 baseline language skills (Java, Kotlin, C/C++, JavaScript, Python) with monitoring and data collection workflow

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Agent References Baseline Language Skill (Priority: P1)

An AI agent needs to provide guidance about a programming language and consults the baseline skill to understand core concepts, syntax patterns, and ecosystem basics before generating specific advice.

**Why this priority**: This is the primary use case. Without baseline skills, agents lack a standardized knowledge foundation for language-specific assistance. This delivers immediate value by establishing consistent, high-quality language references.

**Independent Test**: Can be fully tested by having an agent load any single baseline skill (e.g., Java) and answer basic questions about the language (typing system, memory model, concurrency). Delivers value even if only one language baseline exists.

**Acceptance Scenarios**:

1. **Given** agent receives request about Java threading, **When** agent loads `.prompt-os/skills/linguagens/java/SKILL.md`, **Then** agent finds section on concurrency with examples and can provide accurate guidance
2. **Given** agent needs Python syntax reference, **When** agent accesses Python baseline skill, **Then** agent retrieves typing information, common patterns, and ecosystem tools
3. **Given** agent encounters C++ memory management question, **When** agent consults C/C++ baseline, **Then** agent finds pointers, RAII, and smart pointer concepts with working examples

---

### User Story 2 - Human Validates Skill Quality Through Self-Critique (Priority: P1)

A human reviewer receives a generated baseline skill and reviews the Self-Critique score, dimensional breakdown, and constitution check to decide whether to approve, reject, or request edits.

**Why this priority**: Quality validation is critical for establishing trust in the skill library. Without validated quality metrics, skills may contain errors, placeholders, or inadequate examples. This is P1 because it directly supports the primary workflow.

**Independent Test**: Can be tested by generating a single skill, running Self-Critique protocol, presenting Human Gate preview with scores ≥70, and verifying human can make informed approval decisions based on the metrics.

**Acceptance Scenarios**:

1. **Given** Java baseline skill generated with Self-Critique score 85, **When** human reviews preview, **Then** human sees overall score, 4 dimension scores (Completude, Clareza, Correção, Best Practices), constitution check status, and improvement suggestions
2. **Given** skill scores 68 (below threshold), **When** Self-Critique completes, **Then** system flags weakest dimensions and agent revises before presenting to human
3. **Given** skill contains placeholder `[XXX]`, **When** constitution check runs, **Then** violation detected, score reduced, and human warned before approval

---

### User Story 3 - System Detects Knowledge Gaps During Research (Priority: P2)

While researching a language (e.g., Kotlin), the agent identifies a related concept (e.g., "JVM internals") that would benefit from its own skill but doesn't exist yet. The system logs this gap for future action.

**Why this priority**: Gap detection enables organic growth of the skill library based on actual needs. It's P2 because the baseline skills can be created without gap detection, but capturing gaps improves long-term system quality.

**Independent Test**: Can be tested by generating one baseline skill while monitoring `memory/opencode-spec010-session.md` for entries in "Gaps Detectados" table. Delivers value by identifying improvement opportunities even if gaps aren't immediately addressed.

**Acceptance Scenarios**:

1. **Given** agent researching Java concurrency, **When** agent recognizes need for deeper JVM threading model explanation, **Then** gap logged in memory file with suggested skill name "jvm-threading-model" and status "pending"
2. **Given** multiple gaps detected during 5 language baseline creation, **When** execution completes, **Then** gap detection report generated showing top gaps by frequency and priority
3. **Given** gap suggested but similar skill already exists, **When** agent checks INDEX.md, **Then** no duplicate gap logged, existing skill referenced instead

---

### User Story 4 - System Learns From Rejections (Priority: P2)

A human rejects a baseline skill with feedback "Examples don't work - syntax errors". The system categorizes this as "exemplos" category, logs the learned action "Test all code examples before submission", and applies this learning to subsequent skills.

**Why this priority**: Rejection learning prevents repeated mistakes and improves quality over time. It's P2 because skills can be generated without rejection learning, but capturing patterns significantly improves efficiency and reduces rework.

**Independent Test**: Can be tested by simulating one rejection, verifying it's logged in "Log de Rejeicoes" with correct category and learned action, then confirming subsequent generations reference the learned action. Delivers value by documenting quality issues even if learning isn't automated.

**Acceptance Scenarios**:

1. **Given** Python skill rejected with "Too generic, lacks Python-specific idioms", **When** rejection logged, **Then** categorized as "especificidade", learned action "Include language-idiomatic examples and Python philosophy", and recorded in memory
2. **Given** 3 rejections all in "exemplos" category (>30% pattern), **When** rejection analysis report generated, **Then** pattern flagged as critical, specific remediation actions recommended
3. **Given** Kotlin skill generation starts after Java rejection learned, **When** agent prepares Kotlin skill, **Then** agent references learned action and includes tested examples

---

### User Story 5 - Team Reviews Evolution Through Reports (Priority: P3)

After completing all 5 baseline skills, the team generates three monitoring reports (gap detection, rejection analysis, self-critique metrics) to assess protocol effectiveness, identify patterns, and plan improvements.

**Why this priority**: Reports enable data-driven improvements to protocols and processes. It's P3 because the skills can be created and used without generating reports, but reports are essential for iterative system improvement and validating SPEC-001 and SPEC-002 in production.

**Independent Test**: Can be tested by generating all 5 skills with data collection, then producing the 3 reports using templates in `specs/010-language-skills-baseline/reports/`. Delivers value by providing insights into quality trends, common issues, and protocol effectiveness.

**Acceptance Scenarios**:

1. **Given** 5 baseline skills completed with scores tracked, **When** self-critique metrics report generated, **Then** report shows average score, dimension breakdown, weakest areas, and recommendations for process improvements
2. **Given** 2 rejections occurred during execution (40% rejection rate), **When** rejection analysis report generated, **Then** report flags rate above 20% target, identifies dominant category, and recommends corrective actions
3. **Given** 8 gaps detected across 5 languages, **When** gap detection report generated, **Then** report lists gaps by frequency, cross-references agents that detected them, and prioritizes gaps for Phase 2 creation

---

### Edge Cases

- What happens when Self-Critique score is ≥70 but human rejects the skill?
  - Log rejection with category and reason, record score mismatch in notes, flag for Self-Critique protocol review
  
- How does system handle zero gaps detected during all 5 baseline creations?
  - Generate gap detection report showing 0 gaps, document that baseline knowledge is self-contained, flag as successful outcome
  
- What if the same gap is detected by multiple agents during different language research?
  - Increment count for that gap in tracking table, show cross-agent consensus in gap detection report, elevate priority
  
- How to handle rejection rate >30% (pattern detected) during execution?
  - Pause after detecting pattern, generate interim rejection analysis, present findings to human, adjust process before continuing
  
- What if constitution violation (T0-SIZE-01: skill >1400 tokens) detected after generation?
  - Block approval, flag as blocker violation, agent must split skill or reduce content, re-run Self-Critique after fix

---

## Requirements *(mandatory)*

### Functional Requirements

#### Skill Generation

- **FR-001**: System MUST create exactly 5 baseline language skills (Java, Kotlin, C/C++, JavaScript, Python) in directory structure `.prompt-os/skills/linguagens/{language}/SKILL.md`
- **FR-002**: Each baseline skill MUST cover core concepts: typing system, memory management, concurrency model, and ecosystem overview
- **FR-003**: Each baseline skill MUST include minimum 3 working code examples with expected output or behavior
- **FR-004**: Each baseline skill MUST cite sources (official documentation, language specifications, or authoritative references)
- **FR-005**: Each baseline skill MUST NOT contain placeholders in format `[XXX]` or similar

#### Quality Validation

- **FR-006**: System MUST execute Self-Critique protocol (`.prompt-os/core/SELF-CRITIQUE.md`) for each generated skill
- **FR-007**: Self-Critique MUST produce overall score (0-100) and 4 dimension scores (Completude, Clareza, Correção, Best Practices, each 0-25)
- **FR-008**: Self-Critique MUST perform constitution check validating T0/T1/T2 rules (size limits, source citations, no placeholders)
- **FR-009**: System MUST record all Self-Critique scores in `memory/opencode-spec010-session.md` table format with columns: Date, Language, Overall, Comp, Clar, Corr, BP, Const, Status
- **FR-010**: Skills with score <70 MUST be revised and re-evaluated before Human Gate presentation

#### Human Gate Process

- **FR-011**: System MUST present each skill via Human Gate protocol (`.prompt-os/core/HUMAN-GATE.md`) with structured preview showing: skill name, Self-Critique score breakdown, constitution check status, suggestions
- **FR-012**: Human Gate MUST support decisions: approve, view (show full content), edit (human modifies), reject (with reason), cancel (abort workflow)
- **FR-013**: Approved skills MUST be indexed in both `skills/INDEX.md` and `.prompt-os/skills/INDEX.md`
- **FR-014**: Rejected skills MUST be logged in `memory/opencode-spec010-session.md` rejection table with: Date, Tipo (skill), Item (language name), Motivo (human's reason), Categoria (exemplos/especificidade/clareza/completude/relevancia/outros), Aprendizado (learned action)

#### Gap Detection

- **FR-015**: System MUST monitor for knowledge gaps during research phase of each language baseline creation
- **FR-016**: Detected gaps MUST be logged in `memory/opencode-spec010-session.md` gaps table with: Date, Request (context where gap found), Skill Sugerida (suggested skill name), Status (pending/created/deferred/rejected)
- **FR-017**: System MUST NOT log duplicate gaps - check existing INDEX.md entries before logging
- **FR-018**: Gap detection threshold MUST be reasonable: <10 total gaps across 5 baselines (<2 per language average)

#### Rejection Learning

- **FR-019**: System MUST categorize rejection reasons using decision tree: "exemplos" (examples don't work), "especificidade" (too generic), "clareza" (confusing), "completude" (missing sections), "relevancia" (out of scope), "outros" (other)
- **FR-020**: System MUST extract learned action from each rejection (what to do differently next time)
- **FR-021**: System MUST apply learned actions from previous rejections to subsequent skill generations
- **FR-022**: If rejection category exceeds 30% of total rejections, system MUST flag pattern and recommend process changes

#### Monitoring & Reporting

- **FR-023**: System MUST maintain session tracking file `memory/opencode-spec010-session.md` with three tables: Gaps Detectados, Log de Rejeicoes, Self-Critique Tracking
- **FR-024**: After completing all 5 baselines, system MUST generate gap detection report using template `specs/010-language-skills-baseline/reports/gap-detection-report-DRAFT.md`
- **FR-025**: After completing all 5 baselines, system MUST generate rejection analysis report using template `specs/010-language-skills-baseline/reports/rejection-analysis-report-DRAFT.md`
- **FR-026**: After completing all 5 baselines, system MUST generate self-critique metrics report using template `specs/010-language-skills-baseline/reports/self-critique-metrics-DRAFT.md`
- **FR-027**: All reports MUST be saved to `specs/010-language-skills-baseline/reports/` directory with filenames indicating final status (remove "-DRAFT" suffix)
- **FR-028**: System MUST reference data collection guide (`specs/010-language-skills-baseline/data-collection-guide.md`) for exact table formats and collection triggers
- **FR-029**: System MUST follow execution checklist (`specs/010-language-skills-baseline/execution-checklist.md`) for workflow steps and timing estimates

#### Workflow Integration

- **FR-030**: System MUST follow monitoring workflow documented in `ITZAMNA-AGENT.md` section "MONITORING & DATA COLLECTION"
- **FR-031**: For each artifact generated, system MUST: 1) Execute Self-Critique → Record score, 2) Present Human Gate → Log rejection if occurs, 3) Detect gaps if found → Log in memory, 4) Generate reports at end
- **FR-032**: System MUST load protocols JIT (Just-In-Time): Self-Critique, Human Gate, Auto-Increment loaded only when needed during execution
- **FR-033**: System MUST update execution checklist status as tasks complete (mark checkboxes, update status indicators)

### Key Entities

- **Baseline Skill**: Represents fundamental knowledge about a programming language
  - Attributes: language name, core concepts (typing, memory, concurrency, ecosystem), code examples (≥3), sources/references, YAML frontmatter
  - Location: `.prompt-os/skills/linguagens/{language}/SKILL.md`
  - Constraints: <1400 tokens (T0-SIZE-01), no placeholders, sources cited

- **Self-Critique Score**: Quality evaluation of a baseline skill
  - Attributes: overall_score (0-100), dimension scores (completude, clareza, correcao, best_practices each 0-25), constitution_check (PASS/FAIL), suggestions (list)
  - Source: Generated by SELF-CRITIQUE.md protocol
  - Constraints: Must be ≥70 for Human Gate presentation, stored in YAML format

- **Gap**: Identified missing skill that would enhance system knowledge
  - Attributes: detection date, request context, suggested skill name, status (pending/created/deferred/rejected)
  - Source: Detected during research phase via AUTO-INCREMENT.md protocol
  - Constraints: Must not duplicate existing INDEX.md entries, <10 total for SPEC-010

- **Rejection**: Human decision to not approve a generated skill
  - Attributes: rejection date, artifact type (skill), item name (language), human's reason, category (6 types), learned action
  - Source: Human Gate protocol when user selects "reject"
  - Constraints: Category must match decision tree (exemplos/especificidade/clareza/completude/relevancia/outros)

- **Monitoring Report**: Analytical summary of execution metrics
  - Types: Gap Detection Report, Rejection Analysis Report, Self-Critique Metrics Report
  - Attributes: period covered, data sources, metrics summary, recommendations
  - Source: Generated from memory file data using report templates
  - Purpose: Evaluate SPEC-001 and SPEC-002 effectiveness in production

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

#### Skill Creation & Quality

- **SC-001**: All 5 baseline language skills (Java, Kotlin, C/C++, JavaScript, Python) successfully created and indexed
- **SC-002**: Average Self-Critique score across 5 skills ≥75 (target quality threshold)
- **SC-003**: All 5 skills achieve individual Self-Critique scores ≥70 (minimum acceptable quality)
- **SC-004**: Zero constitution violations (T0 rules) in approved skills
- **SC-005**: All approved skills contain ≥3 working code examples with no placeholders
- **SC-006**: 100% of approved skills cite authoritative sources (official docs, specifications)

#### Process Efficiency

- **SC-007**: Rejection rate <20% (maximum 1 rejection across 5 skills)
- **SC-008**: Average time per skill ≤60 minutes (including research, generation, critique, approval, indexing)
- **SC-009**: Total execution time for all 5 baselines ≤8 working days
- **SC-010**: Zero re-rejections (same skill rejected multiple times after revision)

#### Gap Detection Quality

- **SC-011**: Total gaps detected <10 (average <2 per language)
- **SC-012**: Gap false positive rate <30% (gaps that are actually out of scope or already exist)
- **SC-013**: All detected gaps logged in memory file with complete information (date, context, suggestion, status)

#### Rejection Learning Effectiveness

- **SC-014**: All rejections categorized using standard decision tree (exemplos/especificidade/clareza/completude/relevancia/outros)
- **SC-015**: 100% of rejections include learned action documented in memory file
- **SC-016**: No rejection category exceeds 30% (pattern threshold) indicating systematic quality issue
- **SC-017**: Learned actions from earlier rejections applied to later skill generations (verifiable in Human Gate previews)

#### Data Collection & Reporting

- **SC-018**: Session tracking file (`memory/opencode-spec010-session.md`) maintained with all 3 tables complete (gaps, rejections, scores)
- **SC-019**: All 3 monitoring reports generated and saved with complete data analysis
- **SC-020**: Reports identify actionable insights for improving Self-Critique and Auto-Increment protocols
- **SC-021**: Execution checklist updated to 100% completion with all tasks marked

#### Protocol Validation (SPEC-001 & SPEC-002 in Production)

- **SC-022**: Self-Critique scores correlate with Human Gate decisions (rejected skills had lower scores than approved)
- **SC-023**: Gap detection provides valuable suggestions without overwhelming user (signal-to-noise ratio: ≥70% useful gaps)
- **SC-024**: Rejection learning demonstrates improvement over time (later skills have fewer rejections than earlier ones)
- **SC-025**: Monitoring workflow successfully collects data without disrupting creation workflow (agents follow monitoring steps naturally)

---

## Assumptions *(optional)*

### Technology Environment

1. Git repository properly configured with branch `010-language-skills-baseline` created
2. All required protocol files exist and are accessible:
   - `.prompt-os/core/SELF-CRITIQUE.md`
   - `.prompt-os/core/HUMAN-GATE.md`
   - `.prompt-os/core/AUTO-INCREMENT.md`
   - `.prompt-os/templates/SKILL.template.md`
3. Memory tracking directory `memory/` exists with write permissions
4. Agent has access to web research for language documentation (official docs, authoritative sources)

### Execution Context

5. Agent executing this spec has read and understood:
   - `ITZAMNA-AGENT.md` (identity, workflows, protocols)
   - `AGENTS.md` (bootstrap, T0 rules, Human Gate, JIT loading)
   - `.prompt-os/CONSTITUTION.md` (T0/T1/T2 rules)
6. Human reviewer is available to respond to Human Gate decisions within reasonable timeframe
7. Execution follows sequential order: Java → Kotlin → C/C++ → JavaScript → Python (allows learning from earlier languages)
8. Agent uses JIT loading to minimize token usage (loads only necessary protocols per phase)

### Quality Standards

9. "Working code examples" means: syntactically correct, demonstrates concept clearly, includes context (e.g., "Java 17+", "Python 3.11+")
10. "Authoritative sources" means: official language documentation, language specifications (ISO, ECMA), widely-recognized references (e.g., Oracle Java docs, MDN for JavaScript)
11. Self-Critique score ≥70 represents "acceptable for baseline" - higher scores (80+) indicate production-ready quality
12. Baseline skills focus on language fundamentals - frameworks, libraries, and advanced topics deferred to Phase 2 specializations

### Workflow Defaults

13. If rejection reason is ambiguous, agent categorizes as "outros" and notes specific feedback in "Aprendizado" column
14. If gap detection uncertain (similar skill might exist), agent checks INDEX.md first and only logs if genuinely missing
15. If Self-Critique produces score 68-70 (borderline), agent makes minor revisions and re-evaluates before Human Gate
16. If execution exceeds time estimates, agent documents delays in session notes with reasons (e.g., research complexity, revision cycles)

### Report Generation

17. Reports generated after ALL 5 skills complete (not incrementally)
18. Draft reports in `specs/010-language-skills-baseline/reports/` serve as templates - final reports replace "[TO BE FILLED]" placeholders with actual data
19. Report generation uses data from `memory/opencode-spec010-session.md` as single source of truth
20. If any report section has no data (e.g., zero rejections), section marked "N/A - no data" rather than leaving blank

---

## Dependencies *(optional)*

### Internal Dependencies (Blocking)

1. **SPEC-001 (Self-Critique v2.0)**: REQUIRED - Must be fully implemented with 4-dimension scoring, YAML output, constitution check
   - Status: ✅ Complete (v2.1.0)
   - Location: `.prompt-os/core/SELF-CRITIQUE.md`
   - Impact: Cannot evaluate skill quality without Self-Critique protocol

2. **SPEC-002 (Auto-Increment)**: REQUIRED - Must be fully implemented with gap detection and rejection learning
   - Status: ✅ Complete (v2.1.0)
   - Location: `.prompt-os/core/AUTO-INCREMENT.md`
   - Impact: Cannot detect gaps or learn from rejections without Auto-Increment protocol

3. **Skill Template**: REQUIRED - Must exist with proper structure and frontmatter
   - Status: ✅ Available
   - Location: `.prompt-os/templates/SKILL.template.md`
   - Impact: Cannot generate consistent skills without template

4. **Human Gate Protocol**: REQUIRED - Must be implemented for artifact approval workflow
   - Status: ✅ Available
   - Location: `.prompt-os/core/HUMAN-GATE.md`
   - Impact: Cannot present skills for human approval without Human Gate protocol

### Internal Dependencies (Non-Blocking)

5. **Monitoring Infrastructure**: Created in current session, ready for use
   - Status: ✅ Complete
   - Includes: execution checklist, data collection guide, report templates, memory tracking file
   - Impact if missing: Could execute without monitoring, but wouldn't collect validation data

6. **ITZAMNA-AGENT.md Updates**: Recently updated with monitoring workflow section
   - Status: ✅ Complete
   - Impact if missing: Agent might not discover monitoring workflow naturally

### External Dependencies

7. **Language Documentation**: Access to official documentation for all 5 languages
   - Java: docs.oracle.com, OpenJDK documentation
   - Kotlin: kotlinlang.org
   - C/C++: cppreference.com, ISO standards
   - JavaScript: MDN (developer.mozilla.org)
   - Python: docs.python.org
   - Impact if unavailable: Cannot research accurate language information, must use cached knowledge (may be outdated)

8. **Web Research Capability**: Agent must be able to fetch web content for research phase
   - Required for: Verifying current language versions, validating examples, citing sources
   - Impact if unavailable: Skills may contain outdated information, research phase takes longer

### Dependency Validation

Before beginning execution, agent MUST verify:
- [ ] SELF-CRITIQUE.md exists and contains 4-dimension scoring logic
- [ ] AUTO-INCREMENT.md exists and contains gap detection + rejection learning logic
- [ ] HUMAN-GATE.md exists and describes presentation protocol
- [ ] SKILL.template.md exists and contains YAML frontmatter structure
- [ ] memory/opencode-spec010-session.md exists with 3 empty tables ready for data
- [ ] specs/010-language-skills-baseline/reports/ directory exists with 3 draft templates

---

## Risks & Mitigations *(optional)*

### High Risk

**R-001: Self-Critique scores don't correlate with human approval decisions**
- **Scenario**: Skills with scores ≥75 get rejected; skills with scores 65-69 get approved
- **Impact**: Critical - invalidates SPEC-001 protocol, makes quality threshold meaningless
- **Probability**: Medium (20-30%) - first real production test of Self-Critique
- **Mitigation**: 
  - Track score vs. decision correlation in self-critique metrics report
  - If mismatch >30%, pause execution and review Self-Critique rubric
  - Document specific examples of mismatches for protocol refinement
- **Contingency**: If detected early (first 2 skills), stop and refine Self-Critique before continuing

**R-002: Rejection rate exceeds 30% (systematic quality issue)**
- **Scenario**: 2+ skills rejected across 5 languages, same category dominates
- **Impact**: High - indicates generation process flawed, wastes time on rework
- **Probability**: Low-Medium (15-25%) - learned from past skill creation, but new languages
- **Mitigation**:
  - Monitor rejection rate after each skill
  - If pattern detected (same category >30%), generate interim rejection analysis report
  - Apply corrective action immediately (e.g., if "exemplos" pattern: test all examples before next skill)
- **Contingency**: Pause execution, update generation process, revise remaining skills with improved approach

### Medium Risk

**R-003: Gap detection too aggressive (>20 gaps detected)**
- **Scenario**: Agent suggests excessive gaps during research, overwhelming tracking system
- **Impact**: Medium - dilutes signal-to-noise ratio, makes gap prioritization difficult
- **Probability**: Medium (30-40%) - Auto-Increment gap detection is new, thresholds untested
- **Mitigation**:
  - Review gap detection threshold in AUTO-INCREMENT.md
  - Add filter: only log gaps for foundational concepts (not advanced topics)
  - Cross-reference INDEX.md before logging to prevent duplicates
- **Contingency**: If >20 gaps detected, manually review and categorize: keep foundational, defer advanced, reject out-of-scope

**R-004: Time estimates significantly exceeded (>12 days instead of 5-8)**
- **Scenario**: Research takes longer, rejections require extensive revisions, human approval delays
- **Impact**: Medium - delays Phase 2 planning, but doesn't block completion
- **Probability**: Medium (25-35%) - time estimates based on ideal conditions
- **Mitigation**:
  - Track actual time per language in session notes
  - If first language exceeds 60 min, adjust estimates for remaining 4
  - Identify bottlenecks (research? revision? human delay?) and address
- **Contingency**: Extend timeline to 10-12 days if necessary, prioritize completion over speed

**R-005: External documentation unavailable (website down, access blocked)**
- **Scenario**: Official language docs unreachable during research phase
- **Impact**: Medium - may rely on cached knowledge (potentially outdated), source citations incomplete
- **Probability**: Low (5-10%) - major docs sites usually reliable
- **Mitigation**:
  - Use multiple sources (official docs + authoritative community references)
  - If primary source down, note in skill frontmatter and revisit later
  - Verify examples work even if docs unavailable
- **Contingency**: Use agent's training knowledge for core concepts, mark skill for source verification when docs accessible

### Low Risk

**R-006: Memory file corruption or data loss**
- **Scenario**: Tracking file accidentally overwritten, data not properly formatted
- **Impact**: Low - loses monitoring data but doesn't block skill creation
- **Probability**: Very Low (<5%) - file operations generally reliable
- **Mitigation**:
  - Commit memory file after each language completion
  - Use consistent table format per data collection guide
  - Back up session file at milestones (after languages 1, 3, 5)
- **Contingency**: Reconstruct data from git history, commit messages, and Human Gate logs

**R-007: Report generation fails (template issues, data format mismatch)**
- **Scenario**: Draft templates incompatible with collected data, report scripts error
- **Impact**: Low - skills still created and usable, just missing analysis reports
- **Probability**: Low (10-15%) - templates pre-validated, but data format could vary
- **Mitigation**:
  - Validate data format in memory file matches template expectations
  - Test report generation with sample data before full execution
  - Follow data collection guide precisely for table formats
- **Contingency**: Manually fill report templates using data from memory file, skip automated generation

---

## Out of Scope *(optional)*

### Explicitly NOT Included

1. **Phase 2 Specializations**: Version-specific skills (java-17, java-21) and deep-dive topics (kotlin-coroutines, c-pointers) are out of scope
   - Rationale: SPEC-010 focuses on establishing baseline foundation; specializations are separate effort
   - Future Work: SPEC-011 or later will address Phase 2 specialized skills

2. **Framework and Library Skills**: Spring Boot, React, Django, Express.js, etc. not included
   - Rationale: Baseline skills cover language fundamentals only, not ecosystem tools
   - Future Work: Framework skills belong in separate category under `.prompt-os/skills/frameworks/`

3. **Advanced Language Topics**: Metaprogramming, compiler internals, language design theory
   - Rationale: Baseline targets intermediate developers learning core concepts, not language experts
   - Future Work: Advanced topics may be Phase 2 specializations if demand exists

4. **Automated Skill Generation**: No automation of the entire workflow (research → generate → approve)
   - Rationale: Human Gate approval is mandatory (T0-HUMAN-01), ensuring quality control
   - Future Work: Partial automation (e.g., research assistance, example validation) possible later

5. **Multi-Language Comparison Skills**: Skills comparing languages (e.g., "Java vs Kotlin", "Python vs JavaScript")
   - Rationale: Out of scope for baseline creation; belongs in analysis/decision-making category
   - Future Work: Comparison skills could be separate category after baselines established

### Boundary Clarifications

6. **Code Example Depth**: Examples demonstrate concepts clearly but don't include production-ready applications
   - In Scope: 5-20 line snippets showing syntax, patterns, basic usage
   - Out of Scope: Full applications, deployment configs, build setups

7. **Ecosystem Coverage**: High-level overview of package managers, tooling, community resources
   - In Scope: "Java uses Maven/Gradle, JVM ecosystem, Oracle JDK vs OpenJDK"
   - Out of Scope: Maven configuration details, Gradle build scripts, IDE setup guides

8. **Version Coverage**: Focus on current stable/LTS versions as of 2026
   - In Scope: Java 17/21 (LTS), Python 3.11+, JavaScript ES2023
   - Out of Scope: Legacy versions (Java 6, Python 2.x), bleeding-edge beta releases

9. **Monitoring Scope**: Reports cover SPEC-010 execution only, not historical system data
   - In Scope: Gaps/rejections/scores from 5 baseline language skills
   - Out of Scope: Analysis of all skills ever created, system-wide quality trends

10. **Protocol Refinement**: Identifying issues with SPEC-001/SPEC-002, not implementing fixes
    - In Scope: Documenting protocol effectiveness, noting areas for improvement
    - Out of Scope: Modifying SELF-CRITIQUE.md or AUTO-INCREMENT.md protocols during execution

---

## Notes *(optional)*

### Implementation Strategy

This specification represents the **first real production test** of two critical protocols:
- **SPEC-001 (Self-Critique v2.0)**: Testing 4-dimension scoring, YAML output, constitution checks in live skill generation
- **SPEC-002 (Auto-Increment)**: Testing gap detection and rejection learning with actual baseline content

The dual purpose (create skills + validate protocols) requires careful attention to data collection. Success isn't just "5 skills created" - it's "5 skills created WITH evidence that protocols work as designed".

### Execution Philosophy

**Quality over speed**: If a skill scores 72 (above threshold) but agent knows it could be better, revise it. Target is 75+, not bare minimum 70.

**Learn as you go**: Apply lessons from Java baseline when creating Kotlin baseline. If Java was rejected for "too generic", ensure Kotlin includes language-specific idioms from the start.

**Document everything**: When in doubt, log it. A gap detected but uncertain if needed? Log it and mark status "pending" for later review. Rejection reason unclear? Document exact human feedback in notes.

### Key Differences from Pre-Spec

The `pre-spec.md` in this directory was a preliminary planning document. This formal specification differs in:

1. **Structure**: Follows spec-template.md with mandatory sections (User Scenarios, Requirements, Success Criteria)
2. **Testability**: Every requirement (FR-XXX) and success criterion (SC-XXX) is independently verifiable
3. **Completeness**: Includes assumptions, dependencies, risks, and out-of-scope clarifications
4. **User-Centric**: Focuses on user stories (agent references skill, human validates quality) rather than implementation tasks
5. **Monitoring Emphasis**: Explicitly requires report generation and data collection per user's request

### Relationship to Monitoring Infrastructure

Files in `specs/010-language-skills-baseline/`:
- **spec.md** (this file): WHAT to build and WHY (specification)
- **execution-checklist.md**: HOW to build it, step-by-step (operational guide)
- **data-collection-guide.md**: HOW to collect data (instrumentation guide)
- **reports/*.md**: WHAT to analyze after building (analysis templates)

All four work together: spec defines requirements, checklist defines workflow, guide defines data collection, reports define analysis.

### Version Information

- **Specification Version**: 1.0 (initial draft)
- **Related Specs**: SPEC-001 (Self-Critique v2.0), SPEC-002 (Auto-Increment v2.1.0)
- **System Version**: Itzamna PromptOS v2.1.0
- **Created**: 2026-02-03
- **Last Updated**: 2026-02-03

### Contact & Feedback

Questions or clarifications needed during execution:
1. Check `data-collection-guide.md` for data format questions
2. Check `execution-checklist.md` for workflow questions
3. Check `ITZAMNA-AGENT.md` for protocol questions
4. Escalate to human reviewer for scope or priority questions

---

**END OF SPECIFICATION**

*This specification is ready for planning (`/speckit.plan`) or execution. All mandatory sections complete, no [NEEDS CLARIFICATION] markers remain.*
