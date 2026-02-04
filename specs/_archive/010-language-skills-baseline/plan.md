# Implementation Plan: Language Skills Baseline Implementation

**Branch**: `010-language-skills-baseline` | **Date**: 2026-02-03 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/010-language-skills-baseline/spec.md`

**Note**: This is a workflow-execution feature, not traditional software implementation. The "implementation" is executing a defined process (research → generate → critique → approve → index) for 5 programming languages while collecting monitoring data.

---

## Summary

Create 5 baseline language skills (Java, Kotlin, C/C++, JavaScript, Python) following Self-Critique and Human Gate protocols, while collecting monitoring data to validate SPEC-001 (Self-Critique v2.0) and SPEC-002 (Auto-Increment) in production. This is the **first real production test** of these protocols. Each skill documents core language concepts (typing, memory, concurrency, ecosystem) with working examples and authoritative sources. Success = 5 skills created AND evidence that protocols work as designed (average score ≥75, rejection rate <20%, gap detection <10, reports generated).

---

## Technical Context

**Language/Version**: N/A - This is a documentation/workflow feature  
**Primary Dependencies**: 
- `.prompt-os/core/SELF-CRITIQUE.md` (v2.0, 4-dimension scoring)
- `.prompt-os/core/HUMAN-GATE.md` (approval workflow)
- `.prompt-os/core/AUTO-INCREMENT.md` (gap detection, rejection learning)
- `.prompt-os/templates/SKILL.template.md` (skill structure)

**Storage**: File system (Git repository)
- Skills: `.prompt-os/skills/linguagens/{language}/SKILL.md`
- Tracking: `memory/opencode-spec010-session.md`
- Reports: `specs/010-language-skills-baseline/reports/*.md`

**Testing**: Manual human validation via Human Gate + protocol effectiveness measurement
- Self-Critique score validation (scores correlate with human decisions?)
- Gap detection quality (signal-to-noise ratio ≥70%?)
- Rejection learning effectiveness (later skills better than earlier?)

**Target Platform**: AI agent execution environment (OpenCode, Itzamna, SpecKit agents)  
**Project Type**: Workflow execution (agent follows checklist, human validates artifacts)  
**Performance Goals**: 
- ≤60 minutes per skill (research + generation + critique + approval + indexing)
- ≤8 working days total for all 5 skills
- Score ≥75 average (quality threshold)

**Constraints**:
- <1400 tokens per skill (T0-SIZE-01 constitution rule)
- Zero placeholders `[XXX]` (T0-VALIDATE constitution rule)
- All sources cited (T0-SOURCE-01 from spec assumptions)
- Sequential execution (Java → Kotlin → C/C++ → JavaScript → Python to enable learning)

**Scale/Scope**:
- 5 baseline skills (fixed scope)
- 3 monitoring reports (gap detection, rejection analysis, self-critique metrics)
- ~15 acceptance scenarios (3 per user story × 5 stories)
- 33 functional requirements to verify
- 25 success criteria to measure

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### T0 - INVIOLABLE Rules

#### T0-SEC (Security First)
- **Status**: ✅ **NOT APPLICABLE** - No code execution, database access, or security-sensitive operations
- **Rationale**: This feature creates documentation (skills) via human-approved workflow, no security implications

#### T0-HUMAN (Human Control)
- **Status**: ✅ **COMPLIANT** - Human Gate protocol is CORE REQUIREMENT
- **How Complied**:
  - FR-011: Every skill presented via Human Gate with preview
  - FR-012: Human decisions supported: approve/view/edit/reject/cancel
  - T0-HUMAN-01: Skills cannot be committed without human approval
  - T0-HUMAN-02: Commits only after explicit approval
  - No auto-push (user controls git push timing)

#### T0-STRUCT (Structure)
- **Status**: ✅ **COMPLIANT** - Follows existing directory structure
- **How Complied**:
  - Uses existing `.prompt-os/skills/` directory (not creating new top-level structure)
  - Adds subdirectory `linguagens/` under skills (consistent with existing organization)
  - Spec-first approach already followed (SPEC-010 created before implementation)
  - FR-013: Updates existing INDEX.md files (doesn't create rogue files)

#### T0-VALIDATE (Validation)
- **Status**: ✅ **COMPLIANT** - Validation is core feature purpose
- **How Complied**:
  - FR-006 to FR-010: Self-Critique validation mandatory for every skill
  - FR-003: Code examples must work (verified before approval)
  - FR-004: Sources cited (no invented APIs)
  - Success measured by SC-022: Scores correlate with decisions (no false claims)

### T1 - STRONG Rules

#### T1-QUAL (Code Quality)
- **Status**: ✅ **NOT APPLICABLE** - No code written, only documentation created
- **Rationale**: Skills are Markdown documentation, not software code

#### T1-ARCH (Architecture)
- **Status**: ✅ **NOT APPLICABLE** - No architecture, this is content creation workflow
- **Rationale**: Workflow architecture defined by protocols (SELF-CRITIQUE, HUMAN-GATE), not implementation choice

#### T1-DOC (Documentation)
- **Status**: ✅ **COMPLIANT** - Documentation IS the deliverable
- **How Complied**:
  - T1-DOC-01: Important decisions documented in spec.md (assumptions, dependencies, risks)
  - T1-DOC-02: README equivalent = execution-checklist.md (guides execution)
  - T1-DOC-03: Complex logic explained = data-collection-guide.md (instrumentation)
  - T1-DOC-04: CHANGELOG equivalent = monitoring reports (track evolution)

#### T1-PERF (Performance)
- **Status**: ✅ **COMPLIANT** - Performance targets defined and measured
- **How Complied**:
  - SC-008: Average time ≤60 min per skill (measurable target)
  - SC-009: Total execution ≤8 days (timeline constraint)
  - FR-032: JIT loading protocols (token efficiency)

### T2 - CONVENTION Rules

#### T2-NAMING
- **Status**: ✅ **COMPLIANT** - Follows existing naming conventions
- **File names**: `SKILL.md` (existing convention), `opencode-spec010-session.md` (kebab-case)
- **Directory names**: `linguagens/` (Portuguese, consistent with existing `.prompt-os/` naming)

#### T2-GIT
- **Status**: ✅ **COMPLIANT** - Conventional commits will be used
- **Branch name**: `010-language-skills-baseline` (follows `###-feature-name` pattern)
- **Commits**: Will use `skill(linguagens):` prefix for skill commits, `docs(spec-010):` for reports

#### T2-STYLE & T2-STRUCT
- **Status**: ✅ **COMPLIANT** - Markdown files follow existing style
- **Rationale**: YAML frontmatter + Markdown body (existing skill pattern), T2 style rules for code apply to examples within skills

### Complexity Tracking

**No violations requiring justification.** All T0 rules complied, T1/T2 rules not applicable or followed.

**Key Design Choice (not a violation, but worth noting)**:
- **Choice**: Sequential language execution (Java → Kotlin → C/C++ → JavaScript → Python)
- **Why**: Enables rejection learning - agent applies lessons from earlier rejections to later skills
- **Alternative Rejected**: Parallel generation (5 skills at once) - would lose learning opportunity, risk repeating same mistakes across all 5

---

## Project Structure

### Documentation (this feature)

```text
specs/010-language-skills-baseline/
├── spec.md                      # ✅ Complete - Feature specification (33 FR, 25 SC)
├── plan.md                      # ✅ This file - Implementation plan
├── execution-checklist.md       # ✅ Complete - Step-by-step task breakdown
├── data-collection-guide.md     # ✅ Complete - Instrumentation instructions
├── pre-spec.md                  # ✅ Complete - Original planning document
├── checklists/
│   └── requirements.md          # ✅ Complete - Spec quality validation (16/16 passed)
└── reports/
    ├── gap-detection-report-DRAFT.md         # ✅ Template ready
    ├── rejection-analysis-report-DRAFT.md    # ✅ Template ready
    └── self-critique-metrics-DRAFT.md        # ✅ Template ready
```

**Status**: All documentation infrastructure complete. Reports are templates with "[TO BE FILLED]" placeholders that will be populated during execution.

### Source Code (repository root)

**Structure Decision**: This is a **documentation workflow feature**, not traditional source code. The "source code" is the content created (skills) and tracking data (memory file).

```text
# Content Creation Structure (NEW)
.prompt-os/skills/linguagens/          # NEW directory for language baselines
├── java/
│   └── SKILL.md                       # To be created - Java baseline
├── kotlin/
│   └── SKILL.md                       # To be created - Kotlin baseline
├── c-and-cpp/
│   └── SKILL.md                       # To be created - C/C++ baseline
├── javascript/
│   └── SKILL.md                       # To be created - JavaScript baseline
└── python/
    └── SKILL.md                       # To be created - Python baseline

# Skill Registry (UPDATES)
skills/INDEX.md                        # Update with 5 new language skills
.prompt-os/skills/INDEX.md             # Mirror update with 5 new entries

# Monitoring Data (NEW)
memory/opencode-spec010-session.md     # ✅ Complete - Tracking file initialized
                                       # Contains: Gaps Detectados, Log de Rejeicoes, Self-Critique Tracking

# Reports (FINAL OUTPUTS)
specs/010-language-skills-baseline/reports/
├── gap-detection-report.md            # Generated from memory data (remove -DRAFT)
├── rejection-analysis-report.md       # Generated from memory data (remove -DRAFT)
└── self-critique-metrics.md           # Generated from memory data (remove -DRAFT)
```

**Key Insight**: Traditional "src/" and "tests/" structure doesn't apply. The execution structure is:
1. **Input**: Language documentation (web research)
2. **Process**: Research → Generate → Self-Critique → Human Gate → Index
3. **Output**: Skill files + tracking data + reports
4. **Validation**: Human approval + protocol effectiveness metrics

---

## Phase 0: Research & Discovery

**Goal**: Understand language documentation sources, establish research patterns, resolve technical unknowns.

**Deliverable**: `research.md` documenting research approach for each language.

### Research Tasks

#### R1: Language Documentation Sources ⏳
**Question**: What are the authoritative documentation sources for each language?

**Research Required**:
- Java: Verify access to docs.oracle.com, OpenJDK documentation, Java Language Specification
- Kotlin: Verify kotlinlang.org, Kotlin reference documentation
- C/C++: Verify cppreference.com, ISO C/C++ standards (if accessible)
- JavaScript: Verify MDN (developer.mozilla.org), ECMAScript specification
- Python: Verify docs.python.org, Python Enhancement Proposals (PEPs)

**Deliverable**: Table of sources per language with URLs, version coverage, and accessibility status

**Rationale**: FR-004 requires citing authoritative sources; Assumption #10 defines what "authoritative" means

---

#### R2: Current Language Versions (2026) ⏳
**Question**: What are the current stable/LTS versions as of 2026 for baseline coverage?

**Research Required**:
- Java: LTS versions (likely Java 17, 21, possibly 23?)
- Kotlin: Current stable (1.9.x → likely 2.x by 2026?)
- C/C++: Standards to reference (C11, C17, C23? / C++17, C++20, C++23?)
- JavaScript: ECMAScript version (ES2023? ES2024? ES2025?)
- Python: Current stable (3.11, 3.12, 3.13?)

**Deliverable**: Version table with baseline coverage decisions

**Rationale**: Assumption #8 (Out of Scope) specifies "current stable/LTS versions as of 2026"

---

#### R3: Core Concepts Framework ⏳
**Question**: What are the consistent dimensions for baseline coverage across all languages?

**Research Required**:
- Analyze pre-spec.md mentions: "Tipagem, Memória, Concorrência, Ecossistema"
- Validate against FR-002: "typing system, memory management, concurrency model, ecosystem overview"
- Define what each dimension means for each language:
  - Typing: Static/dynamic, strong/weak, type inference, generics/templates
  - Memory: Manual/automatic (GC), stack/heap, ownership models (Rust-inspired for C++)
  - Concurrency: Threads, async/await, actors, coroutines, event loops
  - Ecosystem: Package managers, build tools, standard library, community

**Deliverable**: 4-dimension framework template applicable to all 5 languages

**Rationale**: Ensures consistency across skills (SC-001 requires all 5 created with comparable structure)

---

#### R4: Code Example Standards ⏳
**Question**: What makes a "working code example" for baseline skills?

**Research Required**:
- Review Assumption #9: "syntactically correct, demonstrates concept clearly, includes context"
- Define testability: Can examples be copy-pasted and run? Or conceptual with "would output"?
- Determine example length: FR specifies nothing, Out of Scope says "5-20 line snippets"
- Establish context format: "Java 17+", "Python 3.11+", "Requires: [library]"

**Deliverable**: Example style guide with 2-3 sample examples per language showing style

**Rationale**: FR-003 requires "minimum 3 working code examples" - clarity needed on "working"

---

#### R5: Self-Critique Baseline Standards ⏳
**Question**: What score ranges indicate quality levels for baseline skills?

**Research Required**:
- Review SELF-CRITIQUE.md protocol: 4 dimensions (Completude, Clareza, Correção, Best Practices) × 25pts each
- Analyze success criteria:
  - SC-002: Average ≥75 (target quality)
  - SC-003: All skills ≥70 (minimum acceptable)
  - Assumption #11: "≥70 acceptable, 80+ production-ready"
- Map score ranges to quality labels:
  - 90-100: Excellent (exceeds baseline expectations)
  - 80-89: Production-ready (strong baseline)
  - 70-79: Acceptable (meets baseline threshold)
  - 60-69: Needs improvement (below threshold)
  - <60: Unacceptable (major rework)

**Deliverable**: Score interpretation guide for Human Gate decisions

**Rationale**: Human reviewers need context to interpret Self-Critique scores during approval

---

#### R6: Gap Detection Sensitivity Tuning ⏳
**Question**: What threshold should trigger gap logging to achieve <10 total gaps (SC-011)?

**Research Required**:
- Review AUTO-INCREMENT.md gap detection logic
- Analyze risk R-003: "Gap detection too aggressive (>20 gaps)"
- Define "foundational concepts" vs "advanced topics":
  - Foundational: Required to understand baseline concepts (e.g., "JVM basics" for Java)
  - Advanced: Nice-to-have specializations (e.g., "JVM bytecode engineering")
- Establish decision criteria: When to log gap vs when to defer to Phase 2?

**Deliverable**: Gap detection decision tree or threshold guidance

**Rationale**: SC-011 requires <10 gaps; SC-012 requires <30% false positives; balance needed

---

#### R7: Rejection Categorization Training ⏳
**Question**: How to consistently categorize rejection reasons into 6 categories?

**Research Required**:
- Review FR-019 categories: exemplos, especificidade, clareza, completude, relevancia, outros
- Analyze data-collection-guide.md decision tree (if exists)
- Create example rejections for each category:
  - "Exemplos": "Code doesn't compile", "Examples missing output"
  - "Especificidade": "Too generic", "Lacks language-specific idioms"
  - "Clareza": "Confusing explanation", "Too much jargon"
  - "Completude": "Missing concurrency section", "No ecosystem overview"
  - "Relevancia": "Too advanced for baseline", "Framework-specific (out of scope)"
  - "Outros": Edge cases not fitting above 5

**Deliverable**: Rejection categorization cheat sheet with examples

**Rationale**: SC-014 requires 100% categorization; consistency critical for pattern detection (SC-016)

---

### Research Output Format (`research.md`)

For each research task above, document:

```markdown
## [Task ID]: [Task Name]

**Decision**: [What was chosen - direct answer to question]

**Rationale**: [Why chosen - supporting evidence, trade-offs considered]

**Alternatives Considered**: [What else was evaluated and why rejected]

**Source**: [URLs, protocol references, or reasoning basis]

**Action Items**: [Any follow-up needed during execution]
```

**Research Schedule**:
- R1, R2: 30 min (parallel web research for documentation + versions)
- R3, R4: 45 min (framework design + example standards - requires thought)
- R5, R6, R7: 45 min (protocol calibration - review existing protocols + tune thresholds)
- **Total**: ~2 hours for complete research phase

**Dependencies**:
- R3 depends on R1 (need docs to understand core concepts)
- R5 depends on R4 (example quality impacts Self-Critique scores)
- R7 depends on R5 (rejection categories relate to Self-Critique dimensions)

---

## Phase 1: Design & Workflow Definition

**Goal**: Define skill structure, establish execution workflow, prepare tooling.

**Deliverable**: `data-model.md`, `quickstart.md`, agent context updated.

### Design Tasks

#### D1: Skill Data Model ⏳
**Question**: What is the canonical structure for baseline language skills?

**Design Required**:

**Entity**: Baseline Language Skill

**YAML Frontmatter** (required metadata):
```yaml
---
type: skill
category: linguagens
subcategory: [language-name]
name: [Language Name] Baseline
level: L2                      # Skill complexity level
version: 1.0                   # Skill version (incremented on updates)
language_version: [e.g., "Java 17+, 21+"]
tags: [core-concepts, programming-languages, [specific-tags]]
dependencies: []               # No dependencies for baselines
related_skills: []             # Populated during execution if gaps detected
sources:
  - name: [e.g., "Oracle Java Documentation"]
    url: [e.g., "https://docs.oracle.com/en/java/javase/17/"]
  - name: [Additional sources...]
    url: [URLs...]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
---
```

**Markdown Body** (required sections from FR-002):
1. **Introdução**: What is [language]? Brief history, philosophy, use cases (2-3 paragraphs)
2. **Sistema de Tipagem**: Static/dynamic, strong/weak, type inference, examples (3-5 paragraphs + 1-2 code examples)
3. **Gerenciamento de Memória**: Stack/heap, GC details or manual management, common patterns (3-5 paragraphs + 1-2 code examples)
4. **Modelo de Concorrência**: Threads, async, coroutines, synchronization primitives (3-5 paragraphs + 1-2 code examples)
5. **Ecossistema**: Package managers, build tools, standard library overview, community resources (3-5 paragraphs + examples)
6. **Recursos e Referências**: Links to official docs, tutorials, community sites

**Code Example Format** (from R4 research):
```markdown
### Exemplo: [Concept Being Demonstrated]

**Contexto**: [Language Version] - [Brief setup explanation]

```[language]
// Code here (5-20 lines)
// Comments explaining key points
```

**Saída Esperada** (ou **Comportamento**):
```
[Expected output or description of behavior]
```
```

**Constraints**:
- Total skill <1400 tokens (T0-SIZE-01)
- No placeholders `[XXX]` (FR-005)
- Minimum 3 code examples (FR-003)
- All sources cited (FR-004)

**Deliverable**: `data-model.md` with complete YAML + Markdown template

**Rationale**: Ensures consistency across all 5 skills; serves as checklist for Self-Critique

---

#### D2: Workflow State Machine ⏳
**Question**: What are the states and transitions for skill creation workflow?

**Design Required**:

**State Diagram**:
```
[NOT STARTED]
      ↓ (agent starts research)
[RESEARCHING]
      ↓ (core concepts identified)
[GENERATING]
      ↓ (draft complete)
[SELF-CRITIQUING]
      ↓ (score calculated)
  ┌───┴───┐
  │ Score │
  │ ≥70?  │
  └───┬───┘
  YES │   NO
      ↓   ↓ (revise and re-critique)
[HUMAN_GATE] ← ┘
      ↓ (human decision)
  ┌───┴───────────┐
  │  Decision?    │
  └───┬─────┬─────┬────┬───┘
      │     │     │    │
   approve view edit reject cancel
      ↓     ↓     ↓    ↓     ↓
 [INDEXING] │  [REVISING] [REJECTED] [CANCELLED]
      ↓     │     │    │
 [COMPLETE] │ [HUMAN_GATE] [LOGGED]
            │     │
         [return to HUMAN_GATE after view]
```

**State Metadata** (tracked in `memory/opencode-spec010-session.md`):
- Language: java | kotlin | c-and-cpp | javascript | python
- Status: not_started | researching | generating | self_critiquing | human_gate | revising | indexing | complete | rejected | cancelled
- Score: null | {overall, completude, clareza, correcao, best_practices}
- Constitution: null | PASS | FAIL
- Rejection_Category: null | exemplos | especificidade | clareza | completude | relevancia | outros
- Timestamp_Started: ISO 8601
- Timestamp_Completed: ISO 8601 | null

**Transitions** (from execution-checklist.md):
1. NOT_STARTED → RESEARCHING: Agent begins (checklist item checked)
2. RESEARCHING → GENERATING: Core concepts identified (research notes in session)
3. GENERATING → SELF_CRITIQUING: Draft complete (skill file created locally)
4. SELF_CRITIQUING → HUMAN_GATE (if score ≥70) or REVISING (if score <70)
5. REVISING → SELF_CRITIQUING: Revision complete (FR-010)
6. HUMAN_GATE → INDEXING (approve) | HUMAN_GATE (view) | REVISING (edit) | REJECTED (reject) | CANCELLED (cancel)
7. INDEXING → COMPLETE: Added to INDEX.md (FR-013)
8. REJECTED → next language: Logged in memory (FR-014), learned action recorded

**Deliverable**: `data-model.md` section on workflow states

**Rationale**: FR-031 defines workflow steps; state tracking enables progress monitoring (FR-033)

---

#### D3: Human Gate Display Format ⏳
**Question**: What information should Human Gate preview display for consistent decision-making?

**Design Required**:

**Human Gate Preview Template**:
```markdown
# 🔍 Human Gate: [Language] Baseline Skill

## Self-Critique Summary

**Overall Score**: [N]/100 - [🟢 Excellent | 🔵 Good | 🟡 Acceptable | 🔴 Needs Work]

| Dimension | Score | /25 | Grade | Status |
|-----------|-------|-----|-------|--------|
| **Completude** | [N] | /25 | [A-F] | [🟢/🔵/🟡/🔴] |
| **Clareza** | [N] | /25 | [A-F] | [🟢/🔵/🟡/🔴] |
| **Correção** | [N] | /25 | [A-F] | [🟢/🔵/🟡/🔴] |
| **Best Practices** | [N] | /25 | [A-F] | [🟢/🔵/🟡/🔴] |

**Constitution Check**: [✅ PASS | ❌ FAIL - [violations]]

**Learned Actions Applied** (from previous rejections):
- [List any learned actions from earlier skills, or "None - first skill"]

---

## Suggestions for Improvement

1. [Self-Critique suggestion 1]
2. [Self-Critique suggestion 2]
3. [Self-Critique suggestion 3]

---

## Skill Preview

**File**: `.prompt-os/skills/linguagens/[language]/SKILL.md`  
**Size**: [N] tokens / 1400 max  
**Code Examples**: [N] (minimum 3 required)  
**Sources Cited**: [N] (minimum 1 required)

### YAML Frontmatter
```yaml
[Show complete frontmatter]
```

### Content Structure
- [✅] Introdução (present, [N] paragraphs)
- [✅] Sistema de Tipagem (present, [N] paragraphs, [N] examples)
- [✅] Gerenciamento de Memória (present, [N] paragraphs, [N] examples)
- [✅] Modelo de Concorrência (present, [N] paragraphs, [N] examples)
- [✅] Ecossistema (present, [N] paragraphs, [N] examples)
- [✅] Recursos e Referências (present, [N] sources)

### First 200 Characters
```
[First 200 chars of Introduction section to give human context...]
```

---

## Your Decision

Reply with one of:
- **approve** - Index skill and mark complete
- **view** - Show full skill content
- **edit [section]** - Request revision of specific section
- **reject [reason]** - Reject with reason for learning
- **cancel** - Abort this skill (mark as cancelled)

What is your decision?
```

**Deliverable**: Human Gate display template in `data-model.md`

**Rationale**: FR-011 requires structured preview; consistent format enables informed decisions

---

#### D4: Data Collection Automation ⏳
**Question**: Can any data collection be automated to reduce manual tracking burden?

**Design Required**:

**Automated Data Points** (no human intervention):
- Self-Critique scores → Auto-record in memory file after critique completes (Date, Language, Overall, Comp, Clar, Corr, BP, Const)
- Timestamps → Auto-record start/end times per language (for SC-008: ≤60 min average)
- File paths → Auto-record skill file location after indexing
- Constitution violations → Auto-flag if FAIL detected

**Semi-Automated Data Points** (agent prompts human):
- Gap detection → Agent logs gaps as detected during research, asks human "Is this a genuine gap or already covered?"
- Rejection categorization → Agent suggests category based on keywords, human confirms or corrects
- Learned action → Agent drafts learned action from rejection reason, human approves or edits

**Manual Data Points** (human provides):
- Rejection reason (free text) → Human provides during reject decision
- Quality assessment notes (optional) → Human adds notes to session file if desired

**Deliverable**: Data collection workflow diagram in `data-model.md`

**Rationale**: SC-018 requires complete tracking; automation reduces errors and saves time

---

#### D5: Report Generation Workflow ⏳
**Question**: How will draft reports be populated with actual data after execution completes?

**Design Required**:

**Report Generation Process** (FR-024 to FR-026):

**Input**: `memory/opencode-spec010-session.md` (single source of truth per FR-028)

**Process for Gap Detection Report**:
1. Read "Gaps Detectados" table from memory file
2. Count total gaps, unique gaps, by status (pending/created/deferred/rejected)
3. Calculate resolution rate: created / (created + deferred + rejected)
4. Identify most frequent gaps (group by skill_name, count occurrences)
5. Cross-reference agents that detected same gap
6. Fill template `gap-detection-report-DRAFT.md` placeholders
7. Save as `gap-detection-report.md` (remove -DRAFT suffix per FR-027)

**Process for Rejection Analysis Report**:
1. Read "Log de Rejeicoes" table from memory file
2. Count total rejections, by category (exemplos, especificidade, clareza, completude, relevancia, outros)
3. Calculate category percentages, identify if any >30% (pattern threshold per FR-022)
4. List top learned actions by frequency
5. Fill template `rejection-analysis-report-DRAFT.md` placeholders
6. Save as `rejection-analysis-report.md`

**Process for Self-Critique Metrics Report**:
1. Read "Self-Critique Tracking" table from memory file
2. Calculate average scores: overall, per dimension (completude, clareza, correcao, best_practices)
3. Identify min/max scores, standard deviation (volatility measure)
4. Count constitution violations, score distribution (90-100, 80-89, 70-79, etc.)
5. Correlate scores with Human Gate decisions (SC-022: do rejections have lower scores?)
6. Fill template `self-critique-metrics-DRAFT.md` placeholders
7. Save as `self-critique-metrics.md`

**Tooling**: No automation - agent manually reads memory file and fills templates (L3 cognitive task, ~30-45 min total for 3 reports)

**Deliverable**: Report generation checklist in `quickstart.md`

**Rationale**: SC-019 requires all 3 reports generated; manual process acceptable for one-time execution

---

### Design Output Format (`data-model.md`)

```markdown
# Data Model: Language Skills Baseline

## Skill Entity

[D1 output - YAML + Markdown structure]

## Workflow State Machine

[D2 output - states, transitions, metadata]

## Human Gate Display

[D3 output - preview template]

## Data Collection

[D4 output - automation levels, workflow]

## Report Generation

[D5 output - process per report type]
```

**Design Schedule**:
- D1: 30 min (skill template - straightforward structure)
- D2: 20 min (workflow - already defined in execution-checklist.md, just formalize)
- D3: 30 min (Human Gate - design clear display format)
- D4: 30 min (data collection - determine what can be automated)
- D5: 30 min (report generation - process per report type)
- **Total**: ~2.5 hours for design phase

---

### Quickstart Guide (`quickstart.md`)

**Purpose**: Get agent ready to execute SPEC-010 in <10 minutes

**Contents**:

```markdown
# Quickstart: SPEC-010 Execution

## Prerequisites (2 min)

**Verify these exist before starting**:
- [ ] `memory/opencode-spec010-session.md` (tracking file)
- [ ] `specs/010-language-skills-baseline/execution-checklist.md` (task list)
- [ ] `specs/010-language-skills-baseline/data-collection-guide.md` (instrumentation)
- [ ] `.prompt-os/core/SELF-CRITIQUE.md` (protocol)
- [ ] `.prompt-os/core/HUMAN-GATE.md` (protocol)
- [ ] `.prompt-os/core/AUTO-INCREMENT.md` (protocol)
- [ ] `.prompt-os/templates/SKILL.template.md` (template)

**Run this command to verify**:
```bash
ls memory/opencode-spec010-session.md \
   specs/010-language-skills-baseline/execution-checklist.md \
   specs/010-language-skills-baseline/data-collection-guide.md \
   .prompt-os/core/SELF-CRITIQUE.md \
   .prompt-os/core/HUMAN-GATE.md \
   .prompt-os/core/AUTO-INCREMENT.md \
   .prompt-os/templates/SKILL.template.md
```

All 7 files should exist. If any missing, stop and resolve.

---

## Execution Flow (overview - 5 min read)

**For each language (Java → Kotlin → C/C++ → JavaScript → Python)**:

1. **Load protocols JIT** (1 min):
   - Read `.prompt-os/core/SELF-CRITIQUE.md` (if first skill, or if rejected)
   - Read `.prompt-os/core/HUMAN-GATE.md` (if first skill)
   - Read `.prompt-os/core/AUTO-INCREMENT.md` (if first skill)
   - Skim `specs/010-language-skills-baseline/data-model.md` (skill structure reminder)

2. **Research** (15 min):
   - Access official language documentation (URLs from `research.md`)
   - Identify core concepts: Typing, Memory, Concurrency, Ecosystem
   - Collect 3-5 code examples (test if possible)
   - Note any gaps detected (foundational concepts missing from system)

3. **Generate** (20 min):
   - Create `.prompt-os/skills/linguagens/[language]/SKILL.md`
   - Fill YAML frontmatter (use `data-model.md` template)
   - Write 6 sections: Introdução, Tipagem, Memória, Concorrência, Ecossistema, Recursos
   - Include ≥3 code examples, cite ≥1 source
   - Verify <1400 tokens, no placeholders `[XXX]`

4. **Self-Critique** (5 min):
   - Load `.prompt-os/core/SELF-CRITIQUE.md`
   - Evaluate 4 dimensions: Completude, Clareza, Correção, Best Practices (each 0-25)
   - Calculate overall score (0-100)
   - Run constitution check (T0 violations?)
   - Generate suggestions for improvement
   - **Record in memory**: Date, Language, Overall, Comp, Clar, Corr, BP, Const, Status

5. **Revise if needed** (variable):
   - If score <70: Revise weakest dimension, re-run Self-Critique
   - If score ≥70: Proceed to Human Gate

6. **Human Gate** (variable - depends on human availability):
   - Load `.prompt-os/core/HUMAN-GATE.md`
   - Present preview (use template from `data-model.md`)
   - Wait for decision: approve | view | edit | reject | cancel
   - **If rejected**:
     - Categorize rejection: exemplos | especificidade | clareza | completude | relevancia | outros
     - Extract learned action: "What to do differently next time?"
     - **Record in memory**: Date, Tipo, Item, Motivo, Categoria, Aprendizado
     - Offer retry or move to next language
   - **If approved**: Proceed to Index

7. **Index** (5 min):
   - Add skill to `skills/INDEX.md` (main registry)
   - Add skill to `.prompt-os/skills/INDEX.md` (protocol registry)
   - Commit with message: `skill(linguagens): add [language] baseline skill`
   - **Update memory**: Mark language status as "complete"

8. **Monitor** (2 min):
   - Note actual time spent (vs 45 min estimate)
   - Check execution-checklist.md, mark language complete
   - Move to next language

**Total time per language**: ~45-60 min (SC-008)

---

## After All 5 Languages Complete

**Generate Reports** (30-45 min total):

1. **Read** `memory/opencode-spec010-session.md` (single source of truth)

2. **Gap Detection Report**:
   - Count gaps, calculate resolution rate
   - Identify top gaps by frequency
   - Fill `specs/010-language-skills-baseline/reports/gap-detection-report-DRAFT.md`
   - Save as `gap-detection-report.md` (remove -DRAFT)

3. **Rejection Analysis Report**:
   - Count rejections by category, calculate percentages
   - Check if any category >30% (pattern threshold)
   - List top learned actions
   - Fill `rejection-analysis-report-DRAFT.md`
   - Save as `rejection-analysis-report.md`

4. **Self-Critique Metrics Report**:
   - Calculate average scores, min/max, standard deviation
   - Correlate scores with Human Gate decisions
   - Analyze dimension breakdown
   - Fill `self-critique-metrics-DRAFT.md`
   - Save as `self-critique-metrics.md`

5. **Commit reports**:
   ```bash
   git add specs/010-language-skills-baseline/reports/*.md
   git commit -m "docs(spec-010): generate monitoring reports for 5 language baselines"
   ```

---

## Success Verification

**Run this checklist after completion**:

- [ ] 5 skills created in `.prompt-os/skills/linguagens/` (java, kotlin, c-and-cpp, javascript, python)
- [ ] All 5 skills indexed in `skills/INDEX.md` and `.prompt-os/skills/INDEX.md`
- [ ] `memory/opencode-spec010-session.md` complete with all 3 tables filled
- [ ] 3 reports generated in `specs/010-language-skills-baseline/reports/` (no -DRAFT suffix)
- [ ] Average Self-Critique score ≥75 (SC-002)
- [ ] All 5 skills scored ≥70 (SC-003)
- [ ] Rejection rate <20% (SC-007: max 1 rejection)
- [ ] Total gaps detected <10 (SC-011)
- [ ] No constitution violations in approved skills (SC-004)
- [ ] Execution-checklist.md 100% complete (SC-021)

**If all checked**: SPEC-010 COMPLETE ✅

**If any failed**: Review success criteria in `spec.md` and investigate discrepancies.
```

**Deliverable**: `quickstart.md` as standalone execution guide

**Rationale**: Enables agent to start execution without re-reading full spec/plan

---

### Agent Context Update

**Task**: Update agent-specific context file with SPEC-010 execution information

**What to add** (via `.specify/scripts/powershell/update-agent-context.ps1`):
- Technology: "Markdown documentation workflow"
- Protocols: SELF-CRITIQUE.md, HUMAN-GATE.md, AUTO-INCREMENT.md
- Data format: YAML frontmatter + Markdown
- Workflow: Research → Generate → Self-Critique → Human Gate → Index
- Key files: execution-checklist.md, data-collection-guide.md, memory session file

**Agent**: `opencode` (primary executor for this spec)

**Command**:
```bash
.specify/scripts/powershell/update-agent-context.ps1 -AgentType opencode
```

**Note**: This script detects which AI agent is in use and updates the appropriate agent-specific context file, adding only new information between markers while preserving manual additions.

**Deliverable**: Agent context file updated (automated by script)

**Rationale**: Ensures agent has SPEC-010 context available in future sessions

---

## Phase 2: Task Breakdown

**Note**: Phase 2 (`/speckit.tasks`) is NOT executed by `/speckit.plan`. This section outlines what will happen when `/speckit.tasks` is run.

**Goal**: Generate `tasks.md` with detailed task breakdown, dependencies, and time estimates.

**Expected Output** (when `/speckit.tasks` runs):

```markdown
# tasks.md structure (preview)

## Phase 1: Setup & Validation (estimated: 1 hour)
- Task 1.1: Verify all prerequisite files exist (10 min)
- Task 1.2: Create `.prompt-os/skills/linguagens/` directory (2 min)
- Task 1.3: Review research.md and data-model.md (15 min)
- Task 1.4: Review learned actions from previous session (if any) (5 min)
- Task 1.5: Load protocols: SELF-CRITIQUE, HUMAN-GATE, AUTO-INCREMENT (20 min first-time read)
- Task 1.6: Mark Phase 1 complete in execution-checklist.md (2 min)

## Phase 2: Java Baseline (estimated: 45-60 min)
- Task 2.1: Research Java core concepts (15 min)
- Task 2.2: Generate java/SKILL.md draft (20 min)
- Task 2.3: Execute Self-Critique, record score (5 min)
- Task 2.4: Present Human Gate, await decision (variable)
- Task 2.5: Index in skills/INDEX.md (5 min)
- Task 2.6: Commit skill (2 min)
- Task 2.7: Update execution-checklist.md (2 min)

## Phase 3: Kotlin Baseline (estimated: 45-60 min)
[Similar structure to Phase 2]

## Phase 4: C/C++ Baseline (estimated: 45-60 min)
[Similar structure to Phase 2]

## Phase 5: JavaScript Baseline (estimated: 45-60 min)
[Similar structure to Phase 2]

## Phase 6: Python Baseline (estimated: 45-60 min)
[Similar structure to Phase 2]

## Phase 7: Monitoring & Reports (estimated: 30-45 min)
- Task 7.1: Review memory/opencode-spec010-session.md data (5 min)
- Task 7.2: Generate gap detection report (10 min)
- Task 7.3: Generate rejection analysis report (10 min)
- Task 7.4: Generate self-critique metrics report (10 min)
- Task 7.5: Commit reports (5 min)
- Task 7.6: Mark execution-checklist.md 100% complete (2 min)

## Phase 8: Validation & Completion (estimated: 30 min)
- Task 8.1: Verify all 25 success criteria (SC-001 to SC-025) (20 min)
- Task 8.2: Document any deviations or learnings in MEMORY.md (10 min)
- Task 8.3: Close SPEC-010 feature branch (or merge if appropriate) (variable)
```

**Total Estimated Time**: 
- Setup: 1 hour
- 5 Languages × 50 min avg: 4.2 hours
- Reports: 45 min
- Validation: 30 min
- **Total: ~6.5 hours of active agent time** (within SC-009: ≤8 working days calendar time)

**Dependencies**:
- Phases 2-6 (languages) must run sequentially (assumption #7: enables learning from rejections)
- Phase 7 (reports) depends on Phases 2-6 complete (FR-024 to FR-026: "after completing all 5 baselines")
- Phase 8 (validation) depends on Phase 7 complete (SC-018 to SC-021 require reports generated)

**Parallelization**: None - sequential execution by design

**Blockers**:
- Human Gate decisions (variable wait time depending on human availability)
- External documentation access (Dependency #7: web research capability)
- Protocol file access (Dependencies #1-4: SPEC-001, SPEC-002, templates)

---

## Re-Evaluation: Constitution Check After Design

*Re-checking T0-T2 rules now that design is complete*

### T0 - INVIOLABLE (Re-check)

#### T0-SEC (Security)
- **Status**: ✅ **STILL COMPLIANT** - No security-sensitive operations added in design
- **Design Impact**: None

#### T0-HUMAN (Human Control)
- **Status**: ✅ **STILL COMPLIANT** - Human Gate remains mandatory, no auto-commits
- **Design Impact**: D3 (Human Gate Display) reinforces human control with clear decision points

#### T0-STRUCT (Structure)
- **Status**: ✅ **STILL COMPLIANT** - Directory structure follows existing `.prompt-os/skills/` pattern
- **Design Impact**: D1 (Skill Data Model) confirms structure: `.prompt-os/skills/linguagens/{language}/SKILL.md`

#### T0-VALIDATE (Validation)
- **Status**: ✅ **STILL COMPLIANT** - Self-Critique mandatory, no claims without verification
- **Design Impact**: D2 (Workflow State Machine) enforces Self-Critique before Human Gate

### T1 - STRONG (Re-check)

#### T1-DOC (Documentation)
- **Status**: ✅ **ENHANCED** - Design adds quickstart.md, data-model.md
- **Design Impact**: Improved documentation beyond spec requirements

### T2 - CONVENTION (Re-check)

#### T2-NAMING, T2-GIT, T2-STYLE, T2-STRUCT
- **Status**: ✅ **COMPLIANT** - All design decisions follow existing conventions
- **Design Impact**: 
  - D1: YAML frontmatter follows existing skill pattern
  - D2: Markdown structure uses Portuguese section names (existing convention)
  - D5: Commit messages use `skill(linguagens):` prefix (follows `type(scope):` pattern)

### Conclusion

**No new violations introduced in design phase.** All T0 rules maintained, T1/T2 rules followed or enhanced. No complexity tracking needed.

---

## Risks & Mitigations (Implementation-Specific)

### From Spec (Recap)

**High Risks** (from spec.md):
- R-001: Self-Critique scores don't correlate with decisions
- R-002: Rejection rate exceeds 30%

**Medium Risks** (from spec.md):
- R-003: Gap detection too aggressive (>20 gaps)
- R-004: Time estimates exceeded (>12 days)
- R-005: External documentation unavailable

**Low Risks** (from spec.md):
- R-006: Memory file corruption
- R-007: Report generation fails

### Implementation-Specific Risks (NEW)

**IR-001: Skill Token Limit Violation (T0-SIZE-01)**
- **Scenario**: Generated skill exceeds 1400 tokens during Self-Critique
- **Impact**: Medium - Constitution violation blocks approval, requires revision
- **Probability**: Medium (30-40%) - C/C++ and Java topics extensive, hard to fit in 1400 tokens
- **Mitigation**:
  - Monitor token count during generation (estimate ~250 tokens per section × 6 sections = ~1500, already over!)
  - Target ~200 tokens per section to leave margin
  - Prioritize breadth over depth (baseline, not comprehensive guide)
  - If over limit: Remove least-essential examples or condense explanations
- **Contingency**: If persistent issue, request spec amendment to increase limit to 1600 tokens (reasonable for L2 skills)

**IR-002: Human Gate Availability Gap**
- **Scenario**: Agent completes skill generation but human unavailable for hours/days
- **Impact**: Low - Delays timeline but doesn't block completion
- **Probability**: Medium (30-50%) - Human availability unpredictable
- **Mitigation**:
  - Agent saves draft locally, records "awaiting Human Gate" status in memory
  - Agent can start research on next language while waiting (parallel work)
  - Agent sends notification: "Java skill ready for review" and continues
- **Contingency**: If human unavailable >1 day, agent proceeds with next language research and queues multiple skills for batch review

**IR-003: Inconsistent Self-Critique Scoring Across Languages**
- **Scenario**: First language (Java) scores 68, but later languages score 85+ due to agent learning curve
- **Impact**: Low - Doesn't violate requirements (all ≥70 acceptable) but skews average
- **Probability**: Medium (40-50%) - Agent improves with practice
- **Mitigation**:
  - R5 research task establishes score interpretation baseline
  - Agent applies learned actions from Java to subsequent languages (by design)
  - If Java scores <70, revise before approval (FR-010)
- **Contingency**: If Java scores significantly lower than others, offer to revise Java after completing all 5 (optional enhancement, not required)

**IR-004: Gap Detection Overwhelm (Complementary to R-003)**
- **Scenario**: R6 research establishes threshold, but agent still detects >10 gaps during execution
- **Impact**: Low - Violates SC-011 but doesn't block skill creation
- **Probability**: Low-Medium (20-30%) - Threshold tuning in R6 should prevent
- **Mitigation**:
  - R6 research defines "foundational vs advanced" criteria
  - Agent asks human mid-execution (after language 2-3): "I've detected [N] gaps so far. Should I continue logging or increase threshold?"
  - Filter retroactively: At report generation, human reviews gaps and marks "defer to Phase 2" for non-critical
- **Contingency**: SC-012 allows 30% false positives - if 12 gaps detected but 4 are false positives, still within tolerance

---

## Next Steps

**After this plan approved:**

1. **Immediately**: Agent executes Phase 0 (Research) → generates `research.md` (~2 hours)
2. **Next**: Agent executes Phase 1 (Design) → generates `data-model.md`, `quickstart.md` (~2.5 hours)
3. **Then**: Agent updates context → runs `update-agent-context.ps1` (~2 min)
4. **Ready**: User runs `/speckit.tasks` → generates `tasks.md` with detailed task breakdown
5. **Execute**: Agent follows `tasks.md` and `execution-checklist.md` to create 5 skills (~6.5 hours active time, spread over ≤8 calendar days)

**Human Action Required**: 
- Review and approve this plan
- Be available for Human Gate decisions during execution (5 approvals expected if no rejections)
- Review final reports after completion (30 min review time)

**Estimated Calendar Time**: 
- Phase 0 + 1: 1-2 days (agent work)
- Execution (5 languages): 3-6 days (depends on human availability for Human Gate)
- Reports + Validation: 1 day (agent work)
- **Total: 5-9 calendar days** (within SC-009: ≤8 working days target, may need slight extension)

---

## Appendix A: File Manifest

**Files Created by `/speckit.plan` (this command)**:
- ✅ `specs/010-language-skills-baseline/plan.md` (this file)
- ⏳ `specs/010-language-skills-baseline/research.md` (Phase 0 output - to be created)
- ⏳ `specs/010-language-skills-baseline/data-model.md` (Phase 1 output - to be created)
- ⏳ `specs/010-language-skills-baseline/quickstart.md` (Phase 1 output - to be created)

**Files Created by `/speckit.tasks` (next command)**:
- ⏳ `specs/010-language-skills-baseline/tasks.md` (detailed task breakdown - NOT created by this command)

**Files Already Exist** (created in previous session):
- ✅ `specs/010-language-skills-baseline/spec.md` (feature specification)
- ✅ `specs/010-language-skills-baseline/execution-checklist.md` (workflow checklist)
- ✅ `specs/010-language-skills-baseline/data-collection-guide.md` (instrumentation guide)
- ✅ `specs/010-language-skills-baseline/checklists/requirements.md` (spec validation)
- ✅ `specs/010-language-skills-baseline/reports/gap-detection-report-DRAFT.md` (template)
- ✅ `specs/010-language-skills-baseline/reports/rejection-analysis-report-DRAFT.md` (template)
- ✅ `specs/010-language-skills-baseline/reports/self-critique-metrics-DRAFT.md` (template)
- ✅ `memory/opencode-spec010-session.md` (tracking file initialized)

**Files to be Created During Execution**:
- ⏳ `.prompt-os/skills/linguagens/java/SKILL.md` (Java baseline skill)
- ⏳ `.prompt-os/skills/linguagens/kotlin/SKILL.md` (Kotlin baseline skill)
- ⏳ `.prompt-os/skills/linguagens/c-and-cpp/SKILL.md` (C/C++ baseline skill)
- ⏳ `.prompt-os/skills/linguagens/javascript/SKILL.md` (JavaScript baseline skill)
- ⏳ `.prompt-os/skills/linguagens/python/SKILL.md` (Python baseline skill)
- ⏳ `specs/010-language-skills-baseline/reports/gap-detection-report.md` (final report)
- ⏳ `specs/010-language-skills-baseline/reports/rejection-analysis-report.md` (final report)
- ⏳ `specs/010-language-skills-baseline/reports/self-critique-metrics.md` (final report)

**Total Files**:
- Existing: 11
- Created by plan: 4 (including this file)
- To be created by tasks: 1
- To be created during execution: 8
- **Grand Total: 24 files** for complete SPEC-010 lifecycle

---

**END OF IMPLEMENTATION PLAN**

*Ready for Phase 0 (Research) execution. Awaiting approval to proceed.*
