# Feature Specification: Auto-Increment Protocol

**Feature Branch**: `002-auto-increment`  
**Created**: 2026-02-03  
**Status**: Implemented (v2.0.0 - Prompt-Based)  
**Input**: User description: "Enhanced Auto-Increment Protocol: gap detection, rejection learning, proactive suggestions, and evolution reports for the PromptOS knowledge base"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gap Detection and Notification (Priority: P1)

When a user requests help with a topic that doesn't have a corresponding skill in the system, the AI agent should automatically detect this gap, inform the user, and offer options for proceeding.

**Why this priority**: This is the foundation of the auto-increment system. Without gap detection, the system cannot learn what knowledge is missing. This delivers immediate value by making users aware of system limitations and offering solutions.

**Independent Test**: Can be fully tested by requesting help for a topic with no existing skill (e.g., "How do I use Kafka?") and verifying that (1) the system detects the gap, (2) informs the user, (3) offers creation options, and (4) logs the gap in MEMORY.md.

**Acceptance Scenarios**:

1. **Given** a user requests "Help me configure Kafka" AND no skill exists for Kafka, **When** the agent processes the request, **Then** the system detects the gap, informs the user "No skill found for 'kafka'", offers 3 options (create now/proceed without/defer), and logs the gap with status "pending"
2. **Given** a gap was detected and user chooses "create now", **When** the agent initiates skill generation, **Then** the standard skill generation workflow starts with the detected topic as input
3. **Given** a gap was detected and user chooses "proceed without", **When** the agent continues, **Then** the gap is logged in MEMORY.md with status "deferred" for future reference
4. **Given** the same topic (e.g., "Kafka") was requested 2+ times, **When** the agent detects the gap again, **Then** the system mentions "This is the Nth time this topic was requested" and recommends creating the skill

---

### User Story 2 - Rejection Learning (Priority: P2)

When a human rejects an artifact at Human Gate, the system should ask for the reason (if not provided), categorize it, log it persistently, and learn patterns to improve future generations.

**Why this priority**: This enables the system to improve quality over time by understanding why artifacts are rejected. It's P2 because it depends on Human Gate (SPEC-001) being operational and requires several interactions to gather meaningful patterns.

**Independent Test**: Can be fully tested by rejecting 5 artifacts with different reasons, verifying (1) the system asks for reason if not given, (2) each rejection is categorized correctly (examples/specificity/clarity/completeness/relevance), (3) all rejections are logged in MEMORY.md, and (4) when a category exceeds 30% of rejections, the system proactively mentions it in subsequent generations.

**Acceptance Scenarios**:

1. **Given** an artifact is rejected at Human Gate with reason "Examples don't work", **When** the rejection is processed, **Then** the system categorizes it as "examples", logs it in MEMORY.md with timestamp/skill/reason/category, and acknowledges the rejection
2. **Given** an artifact is rejected without a reason, **When** the agent processes the rejection, **Then** the system asks "Could you tell me why you rejected this? (helps me improve)" and waits for user input
3. **Given** 10 rejections have been logged AND 4 of them are in the "examples" category (40%), **When** the agent generates a new artifact, **Then** the system proactively mentions "I've noticed examples are a common concern, so I've validated all examples in this artifact"
4. **Given** a pattern has been learned (e.g., "examples" category is frequent), **When** the user requests an evolution report, **Then** the report includes "Examples: 40% of rejections" and suggests "Action: Validate all examples before Human Gate"

---

### User Story 3 - Proactive Skill Suggestions (Priority: P3)

When the same knowledge gap appears multiple times, the system should proactively suggest creating a skill for that topic without waiting for the user to request it again.

**Why this priority**: This transforms the system from reactive to proactive, reducing friction for users. It's P3 because it depends on gap detection (US1) being operational and requires historical data to function.

**Independent Test**: Can be fully tested by logging 2+ gaps for the same topic (e.g., "Kafka"), then starting a new session and verifying the agent proactively says "I noticed you've asked about Kafka X times. Would you like me to create a skill for it?"

**Acceptance Scenarios**:

1. **Given** the topic "Kafka" has been detected as a gap 2+ times in MEMORY.md, **When** the user starts a new session or mentions related topics, **Then** the system proactively suggests "I noticed 'kafka' was requested multiple times. Would you like me to create a skill for it?"
2. **Given** a skill exists but has low Self-Critique scores (<60) across multiple generations, **When** the agent reviews evolution data, **Then** the system suggests "The skill '{name}' has been scoring low. Would you like me to improve it?"
3. **Given** a skill was created >2 years ago AND technology has evolved significantly, **When** the agent reviews skill age, **Then** the system suggests "The skill '{name}' is outdated. Should I create an updated version?"

---

### User Story 4 - Evolution Reports (Priority: P4)

Users should be able to request a periodic evolution report that summarizes system growth: skills created/updated, gaps detected/resolved, rejection patterns, and suggested actions.

**Why this priority**: This provides visibility into system learning and growth, helping users understand what the system knows and where it needs improvement. It's P4 because it's analytical/reporting functionality that depends on all other user stories having generated data.

**Independent Test**: Can be fully tested by using the system for a week (creating skills, rejecting some, logging gaps), then requesting an evolution report and verifying it includes: (1) total skills created, (2) approval rate, (3) gaps detected/resolved, (4) top 3 most frequent gaps, (5) rejection category breakdown, and (6) suggested actions.

**Acceptance Scenarios**:

1. **Given** the user requests "Generate evolution report", **When** the agent processes the request, **Then** the system generates a report with sections: Summary (skills created/updated, approval rate, gaps detected/resolved), Top Gaps (most frequent unresolved gaps), Rejection Patterns (category breakdown with percentages), and Suggested Actions (prioritized list)
2. **Given** an evolution report is generated, **When** the user views it, **Then** all metrics are accurate based on MEMORY.md data and the report is formatted in markdown with tables
3. **Given** the report shows high rejection rate for a specific category, **When** the user reviews suggested actions, **Then** the system recommends concrete steps (e.g., "40% of rejections are about examples — validate all code examples before Human Gate")

---

### Edge Cases

- What happens when a gap is detected but the topic is too vague to suggest a skill name? (System asks user to clarify the topic before logging the gap)
- How does the system handle rejection reasons that don't match any category keywords? (Categorized as "other" and logged separately for manual review)
- What if the same skill is rejected multiple times for different reasons? (Each rejection is logged separately, and the system mentions "This skill was rejected X times" when suggesting improvements)
- How does the system handle gaps that are actually covered by existing skills but with different naming? (JIT-PROTOCOL should catch this during search, but if missed, the gap is logged and the human can mention the existing skill during creation)
- What if MEMORY.md grows too large with historical data? (Out of scope for this spec — assume MEMORY.md is managed by humans or future archival process)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect when a requested skill does not exist in the skills registry (`.prompt-os/skills/INDEX.md`)
- **FR-002**: System MUST inform users when a gap is detected and present three options: (1) create skill now, (2) proceed without skill, (3) defer to later
- **FR-003**: System MUST log every detected gap to persistent memory with fields: date, user request text, suggested skill name, status (pending/created/deferred/rejected), and timestamps
- **FR-004**: System MUST categorize rejection reasons into one of five categories: examples, specificity, clarity, completeness, relevance, or other
- **FR-005**: System MUST log every rejection to persistent memory with fields: date, artifact type, artifact name, reason text, category, learned action, and timestamp
- **FR-006**: System MUST identify rejection patterns when any category represents >30% of total rejections
- **FR-007**: System MUST apply learned corrections proactively in future generations by mentioning identified concerns (e.g., "I've validated all examples carefully" when examples category is frequent)
- **FR-008**: System MUST suggest skill creation when the same gap (same topic/keywords) appears 2 or more times in the gap log
- **FR-009**: System MUST proactively suggest skill improvements when an existing skill has Self-Critique scores <60 across multiple generations or is >2 years old
- **FR-010**: System MUST generate evolution reports on demand containing: skills created/updated count, approval rate, gaps detected/resolved count, top 3 most frequent gaps, rejection category breakdown with percentages, and suggested actions
- **FR-011**: System MUST integrate with Self-Critique protocol (SPEC-001) to track quality scores per skill and identify low-performing skills for improvement suggestions
- **FR-012**: System MUST NEVER auto-create or auto-modify skills — all creations and modifications must go through Human Gate protocol

### Key Entities *(include if feature involves data)*

- **GapRecord**: Represents a detected knowledge gap. Attributes: date, user request (original text), suggested skill name, status (pending/created/deferred/rejected), detection count (how many times detected), timestamps (first detected, last detected)
- **RejectionRecord**: Represents a logged artifact rejection. Attributes: date, artifact type (skill/persona/code), artifact name, reason (user-provided text), category (enum: examples/specificity/clarity/completeness/relevance/other), learned action (text describing what to do differently), timestamp
- **PatternAnalysis**: Represents aggregated rejection patterns. Attributes: category (enum), occurrence count, percentage of total rejections, suggested correction (actionable text), threshold status (whether pattern exceeds 30%)
- **EvolutionReport**: Represents a periodic system evolution summary. Attributes: reporting period (date range or month/year), skills created count, skills updated count, approval rate percentage, gaps detected count, gaps resolved count, top gaps (list of gap names with counts), rejection patterns (list of categories with percentages), suggested actions (prioritized list)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of knowledge gaps are detected automatically (measured as: gaps logged divided by total requests for non-existent skills)
- **SC-002**: Rejection rate decreases by at least 20% within 30 days after pattern corrections are applied (measured as: rejection rate before patterns vs. after patterns)
- **SC-003**: At least 3 skills per month are created directly from gap suggestions (measured as: skills with "created from gap" status in MEMORY.md)
- **SC-004**: Evolution report generation completes in under 10 seconds (measured from user request to report display)
- **SC-005**: Gap-to-skill resolution time decreases by at least 30% after system has logged 5+ gaps (measured as: average time from gap detection to skill creation before vs. after)
- **SC-006**: 100% of rejections are categorized and logged with no data loss (measured as: rejection log entries divided by total Human Gate rejections)
- **SC-007**: Users receive proactive skill suggestions within 1 interaction after the 2nd gap detection for the same topic

---

## Assumptions

1. **Persistent Memory**: MEMORY.md is the single source of truth for all gap logs, rejection logs, and pattern analysis data
2. **Human Gate Prerequisite**: SPEC-001 (Self-Critique + Human Gate) is fully operational before this feature can function
3. **Prompt-Based Implementation**: This feature operates entirely through markdown instructions that AI agents read and follow — no runtime code or databases required
4. **Categorization Accuracy**: Simple keyword matching for rejection categorization is sufficient for initial version (no ML/NLP required)
5. **Gap Naming**: The system can derive reasonable skill names from user request text using kebab-case conversion of key topics
6. **Report Frequency**: Evolution reports are generated on-demand only (no scheduled/automated reporting in v1)
7. **Data Retention**: Historical gap and rejection data in MEMORY.md is never automatically purged or archived (manual cleanup only)
8. **Single User Context**: The system operates within a single user/project context (no multi-user/multi-project aggregation)

---

## Out of Scope

1. **Machine Learning**: No ML-based pattern detection, clustering, or predictive gap identification in this version
2. **Automated Actions**: System never auto-creates skills, auto-modifies skills, or auto-applies template changes without human approval
3. **A/B Testing**: No experimentation framework for testing different generation approaches
4. **Vector Similarity**: No embedding-based similarity matching for gaps or rejections (keyword matching only)
5. **External Trend Analysis**: No integration with external sources (HackerNews, GitHub trending, tech blogs) to predict future gaps
6. **Multi-Project Analytics**: No aggregation or comparison of patterns across different projects or users
7. **Scheduled Reports**: No automated periodic report generation or email notifications
8. **Gap Deduplication Logic**: Minimal duplicate detection — relies on exact topic matching or human intervention

---

## Dependencies

| Dependency | Type | Status | Reason |
|------------|------|--------|--------|
| SPEC-001 (Self-Critique + Human Gate) | Internal | Implemented | Required for rejection logging and quality score tracking |
| MEMORY.md persistent storage | Internal | Available | Single source of truth for all auto-increment data |
| `.prompt-os/skills/INDEX.md` registry | Internal | Available | Required to detect if skills exist or not |
| INPUT-CLASSIFIER protocol | Internal | Implemented | Used to extract topics/keywords from user requests |
| JIT-PROTOCOL | Internal | Implemented | Ensures skills are searched correctly before declaring a gap |

---

**Version**: 1.0.0  
**Author**: Itzamna PromptOS  
**Implementation Note**: This spec describes the WHAT and WHY of the Auto-Increment Protocol. The HOW is implemented as prompt-based instructions in `.prompt-os/core/AUTO-INCREMENT.md`, which AI agents read and follow. No code execution is required for the core functionality.
