# Feature Specification: Self-Critique Protocol Enhancement

**Feature Branch**: `001-self-critique`  
**Created**: 2026-02-02  
**Status**: Draft  
**Input**: User description: "Enhanced Self-Critique Module based on pre-spec.md with prompt-based architecture context"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quality Assessment Before Human Gate (Priority: P1)

As an AI agent generating artifacts (skills, personas, code), I need to evaluate the quality of my output before presenting it to the human, so that low-quality work is identified and improved before wasting human review time.

**Why this priority**: This is the core value proposition - reducing human effort by filtering out low-quality outputs automatically. Without this, humans must review everything regardless of quality.

**Independent Test**: Can be fully tested by generating any artifact and verifying that a quality score (0-100) is produced before the Human Gate prompt appears.

**Acceptance Scenarios**:

1. **Given** an AI agent generates a new skill, **When** the generation is complete, **Then** the system produces a quality score between 0-100 with breakdown by dimension (Completeness, Clarity, Correctness, Best Practices)

2. **Given** a generated artifact scores below 70, **When** presenting to Human Gate, **Then** the system displays a warning indicator and lists specific improvement suggestions

3. **Given** a generated artifact scores 90 or above, **When** presenting to Human Gate, **Then** the system displays a confidence indicator showing high quality

---

### User Story 2 - Improvement Suggestions (Priority: P2)

As a human reviewer, I want to see actionable improvement suggestions for any artifact scoring below 90, so that I can either request improvements or make informed decisions about acceptance.

**Why this priority**: Suggestions turn passive quality assessment into actionable guidance, directly improving output quality over iterations.

**Independent Test**: Can be fully tested by generating an artifact with intentional gaps (e.g., missing examples) and verifying that specific, actionable suggestions are provided.

**Acceptance Scenarios**:

1. **Given** an artifact with missing required sections, **When** self-critique runs, **Then** the system suggests adding the specific missing sections by name

2. **Given** an artifact with only 1 example when 2+ are required, **When** self-critique runs, **Then** the system suggests adding more examples with specific guidance

3. **Given** any artifact with score below 90, **When** self-critique runs, **Then** at least 1 improvement suggestion is provided (maximum 5)

---

### User Story 3 - Redundancy Detection (Priority: P3)

As a human reviewer, I want to know if a newly generated skill overlaps significantly with existing skills, so that I can avoid redundant content in the knowledge base.

**Why this priority**: Prevents knowledge base bloat and confusion from having multiple similar skills. Less critical than core quality assessment but important for maintainability.

**Independent Test**: Can be fully tested by generating a skill with high similarity to an existing one and verifying that a similarity warning is displayed.

**Acceptance Scenarios**:

1. **Given** a new skill being generated that covers similar topics as an existing skill, **When** self-critique runs, **Then** the system identifies the similar skill and estimates overlap percentage

2. **Given** multiple skills with >60% similarity to the new skill, **When** self-critique runs, **Then** all similar skills are listed with their similarity scores

---

### User Story 4 - Type-Specific Checklists (Priority: P4)

As an AI agent, I need type-specific quality checklists (for code, skills, personas, documentation), so that quality assessment is relevant to what I'm generating.

**Why this priority**: Different artifact types have different quality criteria. Generic assessment would miss type-specific issues.

**Independent Test**: Can be fully tested by generating different artifact types and verifying that each receives a relevant checklist.

**Acceptance Scenarios**:

1. **Given** the agent is generating code, **When** self-critique runs, **Then** the checklist includes code-specific items (compilation, security, testing)

2. **Given** the agent is generating a skill, **When** self-critique runs, **Then** the checklist includes skill-specific items (YAML frontmatter, examples, triggers)

3. **Given** the agent is generating documentation, **When** self-critique runs, **Then** the checklist includes documentation-specific items (structure, references, clarity)

---

### Edge Cases

- What happens when self-critique cannot complete (e.g., artifact is malformed)?
  - System should report partial score with explanation of what could not be evaluated

- What happens when no similar skills exist for comparison?
  - Redundancy check should return empty list with note "No similar skills found"

- What happens when artifact is in a language/format the checklist doesn't cover?
  - System should fall back to generic quality dimensions only

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST produce a quality score between 0-100 for every generated artifact before Human Gate
- **FR-002**: System MUST break down the score into 4 dimensions: Completeness (0-25), Clarity (0-25), Correctness (0-25), Best Practices (0-25)
- **FR-003**: System MUST provide between 1-5 improvement suggestions for any artifact scoring below 90
- **FR-004**: System MUST identify similar existing skills when generating new skills (similarity threshold: 60%)
- **FR-005**: System MUST use type-specific checklists based on artifact type (code, skill, persona, documentation)
- **FR-006**: System MUST integrate with Human Gate protocol - score and suggestions displayed in approval interface
- **FR-007**: System MUST follow score-based behavior thresholds:
  - 90-100 (Excellent): Proceed with confidence indicator
  - 70-89 (Good): Proceed with attention points noted
  - 50-69 (Fair): Display warning, emphasize suggestions
  - 0-49 (Poor): Display strong warning, suggest regeneration
- **FR-008**: System MUST NOT auto-reject any artifact (human always decides)
- **FR-009**: System MUST provide transparency - score calculation should be explainable when requested

### Key Entities

- **CritiqueResult**: The output of self-critique containing score, dimensions breakdown, strengths, weaknesses, suggestions, and similar items
- **QualityDimension**: One of four evaluation dimensions (Completeness, Clarity, Correctness, Best Practices) with individual score 0-25
- **ArtifactType**: Classification of what is being evaluated (code, skill, persona, documentation, architectural decision)
- **SimilarityMatch**: A reference to an existing skill with calculated similarity score (0-100%)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Human review time decreases by 20% or more after self-critique implementation (measured by time from artifact presentation to decision)
- **SC-002**: 80% or more of artifacts rejected by humans have self-critique scores below 70 (correlation validation)
- **SC-003**: 50% or more of self-critique suggestions are addressed or acknowledged by humans (utility validation)
- **SC-004**: 100% of generated artifacts receive a self-critique score before Human Gate (coverage)
- **SC-005**: Self-critique adds less than 5 seconds to artifact generation workflow (performance)
- **SC-006**: Redundancy detection catches 90% of skill overlap situations (measured against manual review)

## Assumptions

- The self-critique protocol operates as Markdown instructions that AI agents read and follow (prompt-based architecture)
- Self-critique does not require external LLM calls - it uses rule-based evaluation that the AI agent executes by following the protocol
- The existing SELF-CRITIQUE.md protocol provides the foundation; this spec enhances it with specific implementation details
- Skills are stored in `skills/` directory with INDEX.md for lookup
- Human Gate protocol is already implemented and accepts structured critique results

## Out of Scope

- Automatic rejection of artifacts (humans always decide)
- Machine learning-based quality scoring (rule-based only in this version)
- Vector database for semantic similarity (keyword/structural matching only)
- Integration with external quality tools or linters
- Modification of existing skill format or storage structure
