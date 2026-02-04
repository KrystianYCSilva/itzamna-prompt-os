# Implementation Plan: WEB-RESEARCH Protocol Enhancement

**Spec**: `specs/003-web-research/spec.md`  
**Branch**: `003-web-research` (or master - working directly)  
**Created**: 2026-02-03  
**Status**: Phase 0 - Research & Planning

---

## Technical Context

### Current State Analysis

**Existing Protocol**: `.prompt-os/core/WEB-RESEARCH.md`
- Current size: 401 lines, ~1,500 tokens (estimated)
- Has informal tier system (Tier 1-7 hierarchy table)
- Contains domain registry for official sources
- No formal validation rules or scoring rubric
- No structured citation templates
- No AUTO-INCREMENT integration

**Target Enhancements**:
1. Formal 4-dimension validation (authority, recency, completeness, relevance)
2. 3 citation template formats (minimal, standard, detailed)
3. Refined 5-tier system (T1-T5) with scoring algorithm
4. AUTO-INCREMENT integration for gap detection
5. JIT sub-files architecture to stay under T0-SIZE-01 limit

### Technology Stack

**Primary**: Markdown-based protocol design (prompt engineering)  
**Integration Points**:
- `.prompt-os/core/AUTO-INCREMENT.md` - Gap detection triggers
- `.prompt-os/core/MEMORY-MANAGEMENT.md` - Gap registration
- `.prompt-os/core/SELF-CRITIQUE.md` - Quality validation (≥95 target)
- `.prompt-os/core/HUMAN-GATE.md` - Incremental approval

**No Code Implementation**: This is a protocol enhancement, not software development. All "implementation" is Markdown documentation that AI agents will read and follow.

### Known Unknowns

- **RESOLVED (Q1)**: Gap registration format → Markdown table: `| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |`
- **RESOLVED (Q2)**: Tier conflict resolution → Score-based precedence + conflict flag
- **RESOLVED (Q3)**: Retroactive validation failures → Document as known issues, fix in v2.3.0+
- **RESOLVED (Q4)**: Human override mechanism → Inline conversational approval
- **RESOLVED (Q5)**: Observability signals → Structured validation logs

**Remaining Research Needed**:
1. Token count measurement for current WEB-RESEARCH.md (need exact count, not estimate)
2. Best practices for JIT sub-file organization (examples from existing protocols)
3. Validation scoring rubric thresholds (need to define exact point allocations)
4. AUTO-INCREMENT API contract (how exactly to trigger gap registration)

---

## Constitution Check

### T0 Rules Compliance

| Rule | Status | Notes |
|------|--------|-------|
| **T0-SEC-01** (No hardcoded secrets) | ✅ N/A | Protocol-only, no code/credentials |
| **T0-SEC-02** (No SQL injection) | ✅ N/A | No database operations |
| **T0-SEC-03** (No sensitive data in logs) | ✅ PASS | Structured logs contain only metadata (source counts, scores, times) |
| **T0-SEC-04** (No disabled security) | ✅ N/A | No security validations to disable |
| **T0-HUMAN-01** (Significant changes require approval) | ✅ PASS | All protocol files go through HUMAN-GATE |
| **T0-HUMAN-02** (Never auto-commit) | ✅ PASS | Explicit commit step after human approval |
| **T0-HUMAN-03** (Never auto-push) | ✅ PASS | No auto-push in workflow |
| **T0-HUMAN-04** (Never delete without confirming) | ✅ N/A | No file deletions planned |
| **T0-STRUCT-01** (CARD-FIRST) | ✅ PASS | Spec created first (specs/003-web-research/spec.md) |
| **T0-STRUCT-02** (Maintain folder structure) | ✅ PASS | Following `.prompt-os/core/` structure with JIT sub-directory |
| **T0-STRUCT-03** (No files outside scope) | ✅ PASS | All files within `.prompt-os/core/web-research/` subdirectory |
| **T0-VAL-01** (Verify success claims) | ✅ PASS | SC-001/007/008 require measurement via structured logs |
| **T0-VAL-02** (Never invent APIs) | ✅ **RESOLVED** | AUTO-INCREMENT API contract verified (research.md Task 0.4, gap registration via agent memory tables) |
| **T0-VAL-03** (Never ignore errors) | ✅ N/A | No compilation errors in Markdown protocols |

**Additional PromptOS T0 Rules** (from `.prompt-os/CONSTITUTION.md` if different):
| Rule | Status | Notes |
|------|--------|-------|
| **T0-SIZE-01** (Skills <1,400 tokens) | ✅ PASS | Main protocol target: ~1,100 tokens via JIT architecture |
| **T0-MEMORY-01** (Always update MEMORY.md) | ✅ PASS | FR-006 specifies gap registration; Phase 6 includes memory update |
| **T0-SOURCE-01** (Always cite sources) | ✅ PASS | FR-003 creates citation templates; this protocol enhances source citation |

### T1 Rules Compliance

| Rule | Status | Notes |
|------|--------|-------|
| **T1-QUAL-02** (Write tests) | ✅ PASS | 5 user stories with acceptance scenarios = test specifications |
| **T1-QUAL-03** (Don't duplicate) | ✅ PASS | JIT sub-files prevent duplication; current tier table extracted to tier-system.md |
| **T1-DOC-01** (Document decisions) | ✅ PASS | Spec includes 5 design decisions, clarifications documented |
| **T1-DOC-02** (README for modules) | ✅ PASS | Main protocol acts as README with JIT references |
| **T1-DOC-03** (Comments for complex logic) | ✅ PASS | Validation scoring rubric will include worked examples |
| **T1-ARCH-04** (Explicit error handling) | ✅ PASS | Edge cases documented with resolution workflows |

### Gate Evaluation

**Pre-Implementation Gates**:
- ✅ **Spec Approved**: spec.md created, clarified (5/5 questions), ready for planning
- ⚠️ **Research Required**: Phase 0 needed to resolve AUTO-INCREMENT API contract
- ✅ **Human Oversight**: All phases follow HUMAN-GATE protocol

**Blocking Issues**: None (T0-VAL-02 warning resolved via Phase 0 research)

---

## Phase 0: Research & Discovery

**Status**: 🔄 IN PROGRESS  
**Goal**: Resolve all NEEDS CLARIFICATION items and establish technical foundation

### Research Tasks

#### Task 0.1: Token Count Measurement
**Question**: What is the exact token count of current WEB-RESEARCH.md?  
**Method**:
1. Read `.prompt-os/core/WEB-RESEARCH.md` (401 lines)
2. Use token counting tool or approximation (1 token ≈ 4 characters for English Markdown)
3. Calculate: 401 lines × ~40 chars/line ÷ 4 = ~4,010 tokens (rough estimate)
4. Document actual count for planning

**Deliverable**: Token count baseline in `research.md`

#### Task 0.2: JIT Sub-File Architecture Patterns
**Question**: How are JIT sub-files organized in existing protocols?  
**Method**:
1. Search for existing JIT patterns: `grep -r "\.prompt-os\/core\/.+\/.+\.md" .prompt-os/`
2. Check if other protocols use subdirectories (e.g., `.prompt-os/core/memory/` structure)
3. Identify reference pattern (e.g., "For details, load `.prompt-os/core/X/Y.md`")
4. Document best practices

**Deliverable**: JIT architecture pattern in `research.md`

#### Task 0.3: Validation Scoring Rubric Design
**Question**: What are the exact point allocations for 4 validation dimensions?  
**Method**:
1. Review US1 acceptance scenario 1 (kubernetes.io example with scores)
2. Extract point ranges: authority (0-40), recency (0-30), completeness (0-20), relevance (0-10)
3. Define threshold rules for each dimension (e.g., official domain = 40pts, <30 days old = 28-30pts)
4. Create scoring rubric table with examples

**Deliverable**: Validation rubric in `research.md`, to be moved to `source-validation-rules.md`

#### Task 0.4: AUTO-INCREMENT API Contract
**Question**: How exactly does WEB-RESEARCH trigger AUTO-INCREMENT for gap detection?  
**Method**:
1. Read `.prompt-os/core/AUTO-INCREMENT.md` fully (currently read only first 60 lines)
2. Identify gap registration API (method, parameters, format)
3. Verify MEMORY-MANAGEMENT table format compatibility
4. Document integration points

**Deliverable**: Integration contract in `research.md`

#### Task 0.5: SPEC-010 Baseline Skills Analysis
**Question**: What are the current citation patterns in SPEC-010 skills for retroactive testing?  
**Method**:
1. Read 5 baseline skills from `.prompt-os/skills/lang-*`
2. Extract citation formats (YAML structure, fields used)
3. Identify inconsistencies (some use URLs only, some use objects)
4. Document patterns for citation template design

**Deliverable**: Citation pattern analysis in `research.md`

### Research Output: `research.md`

**Location**: `specs/003-web-research/research.md`  
**Structure**:
```markdown
# Research Findings - WEB-RESEARCH Protocol Enhancement

## 1. Token Count Baseline
- Decision: [exact count]
- Budget remaining: [1,400 - current - enhancements = X tokens]

## 2. JIT Sub-File Architecture
- Decision: [pattern chosen]
- Rationale: [why this structure]
- Reference syntax: [how agents load sub-files]

## 3. Validation Scoring Rubric
- Authority (40%): [thresholds]
- Recency (30%): [thresholds]
- Completeness (20%): [thresholds]
- Relevance (10%): [thresholds]

## 4. AUTO-INCREMENT Integration
- Gap trigger method: [how to invoke]
- Registration format: [MEMORY-MANAGEMENT table structure]
- Integration points: [where in validation workflow]

## 5. SPEC-010 Citation Patterns
- Current formats: [analysis]
- Inconsistencies: [list]
- Template requirements: [derived from analysis]
```

---

## Phase 1: Design & Contracts

**Status**: ⏳ PENDING (blocked by Phase 0)  
**Goal**: Define data models, validation contracts, and file structure

### Data Model

**Entities** (from spec.md Key Entities):

#### 1. Validation Rule
```yaml
dimension: "authority" | "recency" | "completeness" | "relevance"
weight_percentage: 40 | 30 | 20 | 10
max_points: 40 | 30 | 20 | 10
thresholds:
  - condition: "official_domain"
    points: 40
  - condition: "known_organization"
    points: 30
  # ... more thresholds
calculation_formula: "sum(matching_thresholds.points)"
```

#### 2. Citation Template
```yaml
format_type: "minimal" | "standard" | "detailed"
use_case: "baseline skills" | "mixed sources" | "research-heavy"
required_fields:
  - "url"
optional_fields:
  - "type"
  - "accessed_date"
  - "tier"
  - "reliability_score"
  - "notes"
example: |
  # Minimal
  sources:
    - https://kubernetes.io/docs/
  
  # Standard
  sources:
    - url: https://kubernetes.io/docs/
      type: official_docs
      accessed: 2026-02-03
  
  # Detailed
  sources:
    - url: https://kubernetes.io/docs/
      type: official_docs
      tier: T1
      reliability_score: 95
      notes: "Primary source for Kubernetes concepts"
```

#### 3. Quality Tier
```yaml
tier: "T1" | "T2" | "T3" | "T4" | "T5"
label: "Official Docs" | "Org Repos" | "Community" | "Personal" | "Unreliable"
score_range: [90-100] | [80-89] | [60-79] | [40-59] | [0-39]
confidence: "✓✓✓" | "✓✓" | "✓" | "⚠" | "🚫"
visual_badge: "🟢" | "🔵" | "🟡" | "🟠" | "🔴"
assignment_rules:
  domain_patterns:
    - "*.io/docs"
    - "docs.*"
  score_override: true  # Score takes precedence in conflicts (Q2 clarification)
```

#### 4. Source Gap
```yaml
type: "missing_official_docs" | "outdated_sources" | "insufficient_coverage" | "low_reliability"
trigger_conditions:
  - "0 Tier 1 sources"
  - "all sources >2 years old"
  - "< 2 total sources"
  - "all sources score <50"
resolution_workflow:
  - "present_suggestion"
  - "wait_human_decision"
  - "register_in_memory"
registration_format: "| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |"
```

#### 5. Validation Log Entry
```yaml
timestamp: "2026-02-03T14:30:00Z"
protocol: "WEB-RESEARCH-VALIDATION"
sources_count: 3
avg_score: 78.5
dimension_scores:
  authority: 85
  recency: 70
  completeness: 75
  relevance: 85
gaps_triggered: ["missing_official_docs"]
conflicts_flagged: 1
validation_time_seconds: 45
```

### File Structure

**Before Enhancement**:
```
.prompt-os/core/
└── WEB-RESEARCH.md (401 lines, ~1,500 tokens)
```

**After Enhancement** (JIT Architecture):
```
.prompt-os/core/
├── WEB-RESEARCH.md (~285 lines, ~1,100 tokens)
│   ├── Overview & when to use
│   ├── High-level workflow (5 phases)
│   ├── JIT references to sub-files
│   └── Quick examples
│
└── web-research/  (JIT sub-files, loaded on-demand)
    ├── source-validation-rules.md (~200 lines)
    │   ├── 4-dimension scoring rubric
    │   ├── Threshold definitions
    │   ├── Worked examples (kubernetes.io, medium.com)
    │   └── Conflict resolution algorithm
    │
    ├── citation-templates.md (~150 lines)
    │   ├── 3 template formats (minimal/standard/detailed)
    │   ├── Usage guidelines (when to use each)
    │   ├── YAML examples for each format
    │   └── SPEC-010 migration guide
    │
    ├── tier-system.md (~200 lines)
    │   ├── T1-T5 definitions
    │   ├── Domain pattern registry
    │   ├── Score-based assignment rules
    │   ├── Visual indicators guide
    │   └── Edge case handling
    │
    └── gap-detection.md (~100 lines)
        ├── 4 gap scenarios
        ├── AUTO-INCREMENT integration
        ├── Memory registration format
        └── Human decision workflows
```

**Total**: ~285 (main) + 650 (sub-files) = 935 lines (~3,600 tokens split across 5 files)

### Contracts

#### Contract 1: Validation Workflow API

**Input**: Source URL + Research Context  
**Output**: Validation Result

```yaml
# Input
validate_source:
  url: "https://kubernetes.io/docs/concepts/overview/"
  context:
    topic: "Kubernetes architecture"
    keywords: ["pods", "nodes", "cluster"]
    research_date: "2026-02-03"

# Output
validation_result:
  url: "https://kubernetes.io/docs/concepts/overview/"
  scores:
    authority: 40  # official domain
    recency: 28    # updated <30 days
    completeness: 18  # has code examples
    relevance: 9   # perfect keyword match
    overall: 95
  tier: "T1"
  confidence: "✓✓✓"
  visual_badge: "🟢"
  conflicts: []
  notes: "Official Kubernetes documentation, primary source"
  validation_time: 42  # seconds
```

#### Contract 2: Gap Detection API (AUTO-INCREMENT Integration)

**Trigger**: After validation completes for all sources in research phase  
**Input**: Validation results aggregated  
**Output**: Gap registration + Human prompt

```yaml
# Input
check_gaps:
  sources_validated: 3
  tier_distribution:
    T1: 0  # ⚠️ No official docs
    T2: 1
    T3: 2
  avg_score: 62
  max_age_days: 180  # <2 years, OK
  
# Output
gap_detected:
  type: "missing_official_docs"
  trigger: "0 Tier 1 sources found"
  severity: "medium"
  suggestion: "Search for official Kubernetes documentation at kubernetes.io/docs"
  human_prompt: "Research more | Defer | Accept limitation"
  memory_registration:
    date: "2026-02-03"
    gap_type: "missing_official_docs"
    topic: "Kubernetes architecture"
    trigger: "validation_found_0_T1"
    resolution: "PENDING"  # Updated after human decision
    deferred_until: null
```

#### Contract 3: Citation Template Selection

**Input**: Skill context + Source count + Research depth  
**Output**: Recommended template format

```yaml
# Input
select_citation_template:
  skill_type: "baseline" | "integration" | "research"
  source_count: 2
  tier_distribution: [T1, T2]
  controversial_topic: false

# Output
template_recommendation:
  format: "minimal"  # baseline skills use minimal
  rationale: "2 official sources, non-controversial, matches SPEC-010 pattern"
  example: |
    sources:
      - https://kubernetes.io/docs/
      - https://github.com/kubernetes/kubernetes
```

### Integration Points

**With AUTO-INCREMENT**:
- Trigger: After all sources validated, before skill generation
- Method: Call gap detection contract (Contract 2)
- Registration: Write to `MEMORY.md` + `memory/opencode-memory.md` (table format from Q1)

**With MEMORY-MANAGEMENT**:
- Update points: After gap registration, after skill creation with citations
- Format: Table row (Q1 clarification): `| 2026-02-03 | missing_official_docs | Kubernetes | validation | Researched more | N/A |`

**With SELF-CRITIQUE**:
- Validation phase: After each sub-file created (target ≥95/100 per SC-003)
- Dimensions: Completeness, Clarity, Correctness, Best Practices

**With HUMAN-GATE**:
- Checkpoints: After each sub-file generated (4 gates total), after main protocol refactored (5th gate)
- Pattern: Generate → Self-Critique → Preview → Wait for approval

---

## Phase 2: Implementation Tasks

**Status**: ⏳ PENDING (blocked by Phase 0, Phase 1)  
**Goal**: Generate protocol files following spec requirements

### Task Breakdown

#### Task 2.1: Create `source-validation-rules.md` (US1 - Priority P1)
**Dependencies**: Phase 0 (Task 0.3 - Scoring rubric research)  
**Deliverable**: `.prompt-os/core/web-research/source-validation-rules.md`  
**Requirements**: FR-001, FR-002, FR-009, FR-010, FR-011

**Content**:
1. **4-Dimension Scoring Rubric**
   - Authority (40%): Official domain patterns, organization types, author reputation
   - Recency (30%): Publication date, last updated, content freshness thresholds
   - Completeness (20%): Code examples, depth of coverage, practical applicability
   - Relevance (10%): Keyword matching, topic alignment, contextual fit

2. **Threshold Definitions**
   - Authority: Official domain (40pts), Known org (30pts), Popular GitHub (25pts), Community (15pts), Personal (5pts)
   - Recency: <30 days (28-30pts), <6mo (20-25pts), <1yr (15-20pts), <2yr (5-10pts), >2yr (0pts)
   - Completeness: Full examples (18-20pts), Partial examples (10-15pts), Theory only (5-10pts)
   - Relevance: Perfect match (9-10pts), Partial match (5-8pts), Tangential (1-4pts)

3. **Worked Examples**
   - Example 1: kubernetes.io (US1 Scenario 1 - score 95)
   - Example 2: medium.com old post (US1 Scenario 2 - score 28)
   - Example 3: Conflict case (US1 Scenario 3 - official domain but outdated)

4. **Conflict Resolution Algorithm**
   - Rule: Score-based precedence (Q2 clarification)
   - Flag: Add to validation notes: `[CONFLICT] Domain pattern suggests T1, score assigns T3`
   - Human review: Inline conversational prompt (Q4 clarification)

5. **Validation Workflow**
   - Step 1: Fetch source metadata
   - Step 2: Calculate 4-dimension scores
   - Step 3: Sum to overall (weighted: 0.4×A + 0.3×R + 0.2×C + 0.1×Rel)
   - Step 4: Assign tier based on overall score
   - Step 5: Check for conflicts, flag if needed
   - Step 6: Emit structured log (FR-011)

**Self-Critique Target**: ≥95/100  
**Human Gate**: After generation, show preview for approval

**Effort Estimate**: 2 hours (research-heavy, requires worked examples)

---

#### Task 2.2: Create `citation-templates.md` (US2 - Priority P1)
**Dependencies**: Phase 0 (Task 0.5 - SPEC-010 patterns), Task 2.1 (validation rules define tiers)  
**Deliverable**: `.prompt-os/core/web-research/citation-templates.md`  
**Requirements**: FR-003, FR-010

**Content**:
1. **Minimal Format** (US2 Scenario 1)
   - Use case: Baseline skills, 1-2 official sources, non-controversial
   - Structure: YAML array of URLs only
   - Example:
     ```yaml
     sources:
       - https://kubernetes.io/docs/
       - https://github.com/kubernetes/kubernetes
     ```

2. **Standard Format** (US2 Scenario 2)
   - Use case: Mixed sources (docs + GitHub + Stack Overflow), framework integrations
   - Structure: YAML objects with `url`, `type`, `accessed`
   - Example:
     ```yaml
     sources:
       - url: https://kubernetes.io/docs/
         type: official_docs
         accessed: 2026-02-03
       - url: https://github.com/kubernetes/examples
         type: github_official
         accessed: 2026-02-03
       - url: https://stackoverflow.com/questions/12345
         type: community
         accessed: 2026-02-03
     ```

3. **Detailed Format** (US2 Scenario 3)
   - Use case: Research-heavy skills, controversial topics, multiple low-tier sources
   - Structure: YAML objects with `url`, `type`, `tier`, `reliability_score`, `notes`
   - Example:
     ```yaml
     sources:
       - url: https://kubernetes.io/docs/
         type: official_docs
         tier: T1
         reliability_score: 95
         accessed: 2026-02-03
         notes: "Primary source for Kubernetes architecture"
       - url: https://medium.com/@expert/k8s-guide
         type: blog
         tier: T4
         reliability_score: 55
         accessed: 2026-02-03
         notes: "Secondary perspective, verify against official docs"
     ```

4. **Selection Guidelines**
   - Decision tree: `IF baseline_skill AND sources≤2 AND all_T1_T2 → minimal`
   - Decision tree: `IF mixed_sources OR sources≥3 → standard`
   - Decision tree: `IF controversial OR any_T4_T5 → detailed`

5. **SPEC-010 Migration Guide**
   - Current state: 5 baseline skills use inconsistent formats (from Task 0.5 analysis)
   - Target state: All use minimal format (they're all baseline with ≤2 official sources)
   - Migration: Retroactive validation will standardize citations (SC-002)

**Self-Critique Target**: ≥95/100  
**Human Gate**: After generation, show preview for approval

**Effort Estimate**: 1.5 hours (template design, examples)

---

#### Task 2.3: Create `tier-system.md` (US3 - Priority P2)
**Dependencies**: Task 2.1 (validation rules define scoring)  
**Deliverable**: `.prompt-os/core/web-research/tier-system.md`  
**Requirements**: FR-004, FR-008, FR-010

**Content**:
1. **Tier Definitions**
   - T1 (🟢): Official Docs - Score 90-100 - Confidence ✓✓✓
   - T2 (🔵): Official Repos - Score 80-89 - Confidence ✓✓
   - T3 (🟡): Community - Score 60-79 - Confidence ✓
   - T4 (🟠): Personal - Score 40-59 - Confidence ⚠
   - T5 (🔴): Unreliable - Score 0-39 - Confidence 🚫

2. **Domain Pattern Registry**
   - Extract from current WEB-RESEARCH.md (lines 39-68)
   - Add pattern matching rules:
     - `*.io/docs`, `docs.*` → potential T1
     - `github.com/{official_org}` → potential T2
     - `stackoverflow.com` → T3
     - `medium.com`, `dev.to` → T4
     - Unknown/personal blogs → T5

3. **Score-Based Assignment Rules**
   - Primary: Use overall score to assign tier
   - Override: Score takes precedence over domain pattern (Q2 clarification)
   - Example: `.io` domain but score 58 → T4 (not T1), flag conflict

4. **Visual Indicators Guide**
   - Tier badges: 🟢🔵🟡🟠🔴 (emojis for quick scanning)
   - Confidence: ✓✓✓ (high), ✓✓ (medium-high), ✓ (medium), ⚠ (low), 🚫 (unreliable)
   - Usage: Display in validation results, citation detailed format

5. **Edge Case Handling**
   - Boundary scores (e.g., 60/100): Apply threshold rule (60-79 = T2)
   - Unknown domains: Conservative scoring (T4-T5), flag for human review (Q4)
   - Domain migration (e.g., reactjs.org → react.dev): Update registry, flag old domains

**Self-Critique Target**: ≥95/100  
**Human Gate**: After generation, show preview for approval

**Effort Estimate**: 1.5 hours (extract existing tier table, refine rules)

---

#### Task 2.4: Create `gap-detection.md` (US4 - Priority P2)
**Dependencies**: Phase 0 (Task 0.4 - AUTO-INCREMENT API), Task 2.1 (validation defines gaps)  
**Deliverable**: `.prompt-os/core/web-research/gap-detection.md`  
**Requirements**: FR-005, FR-006

**Content**:
1. **4 Gap Scenarios** (US4 Acceptance Scenarios)
   - Gap 1: Missing Tier 1 (0 official docs found)
   - Gap 2: Outdated Sources (all >2 years old)
   - Gap 3: Insufficient Coverage (<2 total sources)
   - Gap 4: Low Reliability (all scores <50)

2. **Trigger Conditions**
   - When: After all sources validated, before skill generation
   - Check: Iterate through validation results, apply gap rules
   - Output: List of detected gaps (may be multiple)

3. **AUTO-INCREMENT Integration**
   - Method: Call AUTO-INCREMENT protocol (from Task 0.4 research)
   - Parameters: `gap_type`, `topic`, `trigger_reason`, `suggested_action`
   - Example invocation:
     ```yaml
     trigger_auto_increment:
       gap_type: "missing_official_docs"
       topic: "Kubernetes architecture"
       trigger_reason: "validation_found_0_T1"
       suggested_action: "Search kubernetes.io/docs for official resources"
     ```

4. **Memory Registration Format** (Q1 clarification)
   - Location: `MEMORY.md` (aggregate stats) + `memory/opencode-memory.md` (detailed)
   - Format: Markdown table row
   - Structure: `| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |`
   - Example: `| 2026-02-03 | missing_official_docs | Kubernetes | validation | Researched more | N/A |`

5. **Human Decision Workflows** (Q4 clarification)
   - Present: Show gap + suggestion to human in conversational prompt
   - Options: "Research more" | "Defer" | "Accept limitation"
   - Resolution:
     - Research more → Agent performs additional search, re-validates
     - Defer → Register gap with deferred_until date, proceed with current sources
     - Accept limitation → Register gap as accepted, document in skill notes
   - Memory update: After human decision, update Resolution column in table

**Self-Critique Target**: ≥95/100  
**Human Gate**: After generation, show preview for approval

**Effort Estimate**: 1.5 hours (AUTO-INCREMENT integration contract, workflows)

---

#### Task 2.5: Refactor Main `WEB-RESEARCH.md` with JIT References (US5 - Priority P3)
**Dependencies**: Tasks 2.1-2.4 (all sub-files must exist before referencing)  
**Deliverable**: Updated `.prompt-os/core/WEB-RESEARCH.md`  
**Requirements**: FR-007, FR-009

**Content Changes**:
1. **Extract Detailed Sections**
   - Remove: Full tier table (lines 29-37) → Reference `tier-system.md`
   - Remove: Domain registry (lines 39-68) → Move to `tier-system.md`
   - Retain: High-level workflow, when to use, quick examples

2. **Add JIT References**
   - Section: "Validation Rules" → "For detailed scoring rubric, load `.prompt-os/core/web-research/source-validation-rules.md`"
   - Section: "Citation Formats" → "For template examples, load `.prompt-os/core/web-research/citation-templates.md`"
   - Section: "Source Tiers" → "For tier definitions and domain registry, load `.prompt-os/core/web-research/tier-system.md`"
   - Section: "Gap Detection" → "For AUTO-INCREMENT integration, load `.prompt-os/core/web-research/gap-detection.md`"

3. **Preserve Core Workflow** (keep in main protocol)
   - Phase 1: Plan research (what to find, which official sources)
   - Phase 2: Execute search (use web fetch, gather metadata)
   - Phase 3: Validate sources (load validation rules JIT, apply scoring)
   - Phase 4: Detect gaps (load gap detection JIT, trigger AUTO-INCREMENT if needed)
   - Phase 5: Cite sources (load citation templates JIT, select format)

4. **Token Budget Verification**
   - Target: <1,100 tokens (~275 lines)
   - Measure: After refactoring, verify against T0-SIZE-01 (<1,400 limit)
   - Adjust: If >1,100 tokens, extract additional quick examples to sub-files

**Self-Critique Target**: ≥95/100  
**Human Gate**: After refactoring, show diff for approval

**Effort Estimate**: 1 hour (extraction, references, verification)

---

#### Task 2.6: SPEC-010 Retroactive Validation (SC-002)
**Dependencies**: Tasks 2.1-2.5 (all protocols must be complete)  
**Deliverable**: `specs/003-web-research/validation-report.md`  
**Requirements**: SC-002, In Scope item 7

**Content**:
1. **Load 5 Baseline Skills**
   - `.prompt-os/skills/lang-javascript.md`
   - `.prompt-os/skills/lang-python.md`
   - `.prompt-os/skills/lang-typescript.md`
   - `.prompt-os/skills/lang-go.md`
   - `.prompt-os/skills/lang-rust.md`

2. **Apply Citation Template Validation**
   - Check: Does each skill use consistent format?
   - Target: All should use minimal format (baseline skills, official sources)
   - Action: If inconsistent, document in validation report (Q3: don't modify immediately)

3. **Apply Source Validation Rules** (optional, documents known issues)
   - Run validation scoring on each source
   - Check: Do sources meet authority/recency/completeness/relevance thresholds?
   - Document: Any failures as "Known Issues for v2.3.0 revision" (Q3 clarification)

4. **Generate Validation Report**
   - Section 1: Citation Format Compliance (target 100% per SC-002)
   - Section 2: Source Quality Scores (informational, failures = known issues)
   - Section 3: Recommendations for v2.3.0 skill revisions

**Self-Critique Target**: N/A (validation report, not a protocol)  
**Human Gate**: Show report, ask if any immediate fixes needed or defer to v2.3.0

**Effort Estimate**: 1 hour (skill analysis, report generation)

---

### Task Summary

| Task | Priority | Effort | Dependencies | Deliverable |
|------|----------|--------|--------------|-------------|
| 2.1 | P1 | 2h | Task 0.3 | `source-validation-rules.md` |
| 2.2 | P1 | 1.5h | Task 0.5, 2.1 | `citation-templates.md` |
| 2.3 | P2 | 1.5h | 2.1 | `tier-system.md` |
| 2.4 | P2 | 1.5h | Task 0.4, 2.1 | `gap-detection.md` |
| 2.5 | P3 | 1h | 2.1-2.4 | Updated `WEB-RESEARCH.md` |
| 2.6 | P2 | 1h | 2.1-2.5 | `validation-report.md` |

**Total Effort**: 8.5 hours (~2 days with reviews)

---

## Phase 3: Testing & Validation

**Status**: ⏳ PENDING (blocked by Phase 2)  
**Goal**: Verify all 5 user stories pass acceptance scenarios

### Test Plan

#### Test 1: US1 - Source Validation with Scoring (P1)
**Method**: Provide test URLs, verify scores and tier assignments
- Test 1.1: kubernetes.io → Authority 40, Recency 28, Completeness 18, Relevance 9 → Overall 95 → T1
- Test 1.2: medium.com old post → Authority 10, Recency 0, Completeness 10, Relevance 8 → Overall 28 → T5
- Test 1.3: Conflict case (official domain but outdated) → Score-based precedence, flag conflict
**Pass Criteria**: All 3 scenarios produce expected scores ±5 points (SC-001)

#### Test 2: US2 - Consistent Citation Formats (P1)
**Method**: Generate 3 test skills with different source profiles
- Test 2.1: Baseline skill (2 official docs) → Uses minimal format
- Test 2.2: Integration skill (mixed sources) → Uses standard format
- Test 2.3: Research-heavy skill (controversial) → Uses detailed format
**Pass Criteria**: Each skill uses appropriate template per selection guidelines

#### Test 3: US3 - Tier Classification (P2)
**Method**: Validate 10 mixed-quality sources
- Test 3.1: kubernetes.io (score 95) → T1 🟢 ✓✓✓
- Test 3.2: github.com/kubernetes (score 85) → T2 🔵 ✓✓
- Test 3.3: .io domain but score 55 → T4 (score override), flag for review
**Pass Criteria**: All 10 sources correctly assigned tiers per rules

#### Test 4: US4 - Gap Detection & AUTO-INCREMENT (P2)
**Method**: Simulate 4 gap scenarios
- Test 4.1: 0 T1 sources → Triggers "missing_official_docs", prompts human, registers gap
- Test 4.2: All sources >2 years → Triggers "outdated_sources", offers options, registers decision
- Test 4.3: Only 1 source → Triggers "insufficient_coverage", suggests additional search
- Test 4.4: All scores <50 → Triggers "low_reliability", recommends better sources
**Pass Criteria**: All 4 scenarios correctly trigger AUTO-INCREMENT, register in memory table

#### Test 5: US5 - JIT Architecture Token Budget (P3)
**Method**: Measure token counts
- Test 5.1: Main protocol <1,100 tokens (target per US5 Scenario 1)
- Test 5.2: JIT references load correctly when agent follows workflow
- Test 5.3: Total enhancement fits T0-SIZE-01 limit (distributed across 5 files)
**Pass Criteria**: SC-004 met (main protocol <1,400 tokens)

### Success Criteria Verification

| Criterion | Measurement Method | Target | Status |
|-----------|-------------------|--------|--------|
| **SC-001** | Test 1 - Repeat validation, check ±5 consistency | ±5 points | ⏳ Pending |
| **SC-002** | Task 2.6 - Retroactive validation report | 100% citation format | ⏳ Pending |
| **SC-003** | Each task's Self-Critique score | ≥95/100 average | ⏳ Pending |
| **SC-004** | Task 2.5 - Token count after refactoring | <1,100 actual | ⏳ Pending |
| **SC-005** | Test 4 - All gap scenarios trigger correctly | 4/4 pass | ⏳ Pending |
| **SC-006** | Phase 6 - Memory updated atomically | 0 violations | ⏳ Pending |
| **SC-007** | Observability logs - Time measurement | 40% reduction | 📊 Baseline needed |
| **SC-008** | Post-deployment tracking (v2.3.0+) | 60% reduction | 📊 Long-term metric |

**Note**: SC-007 and SC-008 require baseline measurement before enhancement (to be collected during Phase 0 research if data available).

---

## Phase 4: Documentation & Quickstart

**Status**: ⏳ PENDING (blocked by Phase 2)  
**Goal**: Create usage guide for agents and developers

### Deliverable: `quickstart.md`

**Location**: `specs/003-web-research/quickstart.md`

**Content**:
1. **For AI Agents: Using Enhanced WEB-RESEARCH Protocol**
   - Step 1: Load main protocol (`.prompt-os/core/WEB-RESEARCH.md`)
   - Step 2: When validating sources, load `source-validation-rules.md` JIT
   - Step 3: When citing sources, load `citation-templates.md` JIT
   - Step 4: After validation, load `gap-detection.md` JIT to check for gaps
   - Example workflow walkthrough

2. **For Developers: Maintaining Protocol**
   - How to update domain registry in `tier-system.md`
   - How to add new gap scenarios in `gap-detection.md`
   - How to adjust scoring thresholds in `source-validation-rules.md`
   - Token budget monitoring (keep main <1,400)

3. **Troubleshooting**
   - Q: Score conflicts between domain and calculation → A: Score takes precedence (Q2)
   - Q: Retroactive validation failures → A: Document as known issues (Q3)
   - Q: How to override tier assignment → A: Inline conversational approval (Q4)

**Effort Estimate**: 30 minutes

---

## Phase 5: Agent Context Update

**Status**: ⏳ PENDING (blocked by Phase 2)  
**Goal**: Register new protocols in agent-specific context

### Task: Update Agent Context

**Method**:
```powershell
.specify/scripts/powershell/update-agent-context.ps1 -AgentType opencode
```

**What This Does**:
1. Detects which AI agent is in use (OpenCode in this case)
2. Reads agent-specific context file (e.g., `.context/opencode-context.md`)
3. Adds new technology/protocols from this plan:
   - WEB-RESEARCH Protocol Enhancement (v2.3.0-dev)
   - Source Validation Rules (4-dimension scoring)
   - Citation Templates (3 formats)
   - Tier System (T1-T5 with visual indicators)
   - Gap Detection (AUTO-INCREMENT integration)
4. Preserves manual additions between markers
5. Updates file atomically

**Verification**: Check that `.context/opencode-context.md` (or equivalent) lists new protocols in technology stack section.

**Effort Estimate**: 5 minutes (automated script)

---

## Phase 6: Commit & Memory Update

**Status**: ⏳ PENDING (blocked by Phase 2, 3, 4, 5)  
**Goal**: Persist changes and update system memory (T0-MEMORY-01 compliance)

### Commit Strategy

**Branch**: `003-web-research` (create if doesn't exist) OR commit directly to `master` (if working without feature branch)

**Commits** (atomic, each after Human Gate approval):
1. `feat(web-research): add source validation rules (SPEC-003 US1)`
2. `feat(web-research): add citation templates (SPEC-003 US2)`
3. `feat(web-research): add tier system (SPEC-003 US3)`
4. `feat(web-research): add gap detection integration (SPEC-003 US4)`
5. `feat(web-research): refactor main protocol with JIT architecture (SPEC-003 US5)`
6. `docs(spec-003): add retroactive validation report`

**Files to Commit**:
- `.prompt-os/core/WEB-RESEARCH.md` (modified)
- `.prompt-os/core/web-research/source-validation-rules.md` (new)
- `.prompt-os/core/web-research/citation-templates.md` (new)
- `.prompt-os/core/web-research/tier-system.md` (new)
- `.prompt-os/core/web-research/gap-detection.md` (new)
- `specs/003-web-research/validation-report.md` (new)
- `specs/003-web-research/research.md` (new)
- `specs/003-web-research/quickstart.md` (new)
- `.context/opencode-context.md` (modified, if agent context updated)

### Memory Update (T0-MEMORY-01 Compliance)

**Required**: Update `MEMORY.md` and `memory/opencode-memory.md` ATOMICALLY with commits

#### Update 1: `MEMORY.md` (Aggregate Statistics)

Add to episodic memory section:
```markdown
### Session 2026-02-03 - SPEC-003 WEB-RESEARCH Enhancement

**Context**: Implemented formal source validation, citation templates, tier system, AUTO-INCREMENT integration, and JIT architecture for WEB-RESEARCH protocol.

**Artifacts Created**:
- 4 JIT sub-files: source-validation-rules.md, citation-templates.md, tier-system.md, gap-detection.md
- Refactored main WEB-RESEARCH.md (401 → ~285 lines, ~1,500 → ~1,100 tokens)
- Retroactive validation report for SPEC-010 baseline skills

**Success Metrics**:
- Self-Critique scores: [Task 2.1: X], [Task 2.2: Y], [Task 2.3: Z], [Task 2.4: W], [Task 2.5: V] (avg: ≥95 target)
- Token budget: Main protocol [actual tokens] (<1,100 target, <1,400 limit)
- Citation format compliance: 100% (SC-002)
- Gap detection: 4/4 scenarios pass (SC-005)

**Clarifications Resolved**: 5 (Gap format, conflict resolution, retroactive failures, human override, observability)

**Learned Actions**:
1. JIT sub-files effective for large protocol enhancements (kept main <1,400 tokens)
2. Score-based tier assignment more reproducible than domain-based (Q2 clarification)
3. Inline conversational approval simpler than file-based overrides (Q4 clarification)
4. Structured logs essential for quantitative SC measurement (Q5 clarification)
```

#### Update 2: `memory/opencode-memory.md` (Detailed Session Notes)

Add session entry with:
- Gaps detected (if any during implementation)
- Rejections (if human rejected any sub-file during Human Gate)
- Detailed task execution notes (what worked, what didn't)
- Recommendations for future protocol enhancements

**Format**: Follow existing `opencode-memory.md` structure (table rows for gaps, narrative for sessions)

**Verification**: Confirm MEMORY.md and opencode-memory.md updated BEFORE final commit push.

---

## Timeline & Effort Summary

| Phase | Effort | Status | Blocking |
|-------|--------|--------|----------|
| **Phase 0: Research** | 3 hours | 🔄 IN PROGRESS | - |
| **Phase 1: Design** | 1 hour | ⏳ PENDING | Phase 0 |
| **Phase 2: Implementation** | 8.5 hours | ⏳ PENDING | Phase 0, 1 |
| **Phase 3: Testing** | 2 hours | ⏳ PENDING | Phase 2 |
| **Phase 4: Documentation** | 0.5 hours | ⏳ PENDING | Phase 2 |
| **Phase 5: Agent Context** | 0.1 hours | ⏳ PENDING | Phase 2 |
| **Phase 6: Commit & Memory** | 0.5 hours | ⏳ PENDING | Phase 2-5 |

**Total Effort**: ~15.6 hours (~2 days)  
**Aligns with**: execution-checklist.md estimate (3-5 days with buffers)

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Token budget exceeded despite JIT | Low | Medium | Monitor token counts per section (Task 0.1), extract additional sub-files if needed |
| AUTO-INCREMENT API incompatible | Medium | High | Phase 0 Task 0.4 resolves before implementation, verify with actual protocol read |
| Scoring rubric not reproducible across agents | Medium | Medium | Provide worked examples (Task 2.1), accept ±5 variance per SC-001 |
| SPEC-010 retroactive validation shows major failures | Low | Medium | Q3 clarification: document as known issues, defer to v2.3.0 |
| Human rejects sub-file during Human Gate | Medium | Low | Iterate based on feedback, update Self-Critique dimensions, re-submit |
| Self-Critique scores <95 average | Medium | Medium | Iterate on content quality, add more examples, clarify ambiguous sections |

---

## Next Steps

### Immediate Actions (Phase 0 Execution)

1. **Start Research Tasks** (Tasks 0.1-0.5)
   - Launch 5 agents in parallel (Task tool) OR execute sequentially
   - Consolidate findings in `research.md`

2. **Resolve T0-VAL-02 Warning**
   - Task 0.4 must verify AUTO-INCREMENT API before proceeding to Phase 2

3. **Await Human Approval**
   - Present this plan to human for review
   - Address any concerns or requested changes
   - Proceed to Phase 0 execution upon approval

### After Phase 0 Complete

1. Move to Phase 1 (Design) - Generate data models and contracts
2. Update agent context (Phase 5 script)
3. Proceed to Phase 2 (Implementation) - Generate 4 sub-files + refactor main protocol

### Command to Continue

**User should run after approving this plan**:
```
Begin Phase 0 research for SPEC-003. Execute Tasks 0.1-0.5 to resolve unknowns, then generate research.md for review.
```

---

**Plan Status**: ⏳ AWAITING HUMAN APPROVAL  
**Next Checkpoint**: After research.md generated (end of Phase 0)  
**Expected Completion**: 2 days from approval (per timeline)

---

*Implementation Plan v1.0 | SPEC-003 WEB-RESEARCH Protocol Enhancement*

