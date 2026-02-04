# Feature Specification: Workflow & Persona Orchestrator

**Feature Branch**: `007-workflow-orchestrator`  
**Created**: 2026-02-04  
**Status**: Draft  
**Input**: User description: "Workflow & Persona Orchestrator"

## Clarifications

### Session 2026-02-04
- Q: How should the system evict skills when `--skills` overrides push the total above the 5-skill cap? → A: Explicit skills first: User-requested skills are always kept. Defaults are evicted in reverse priority order until the cap is met.
- Q: How does the orchestrator behave when two workflows are triggered in rapid succession? → A: Last command wins: The second workflow fully resets persona and skills. No state carries over from the first.
- Q: What happens if the tech-stack source file is missing or outdated? → A: Warn & fallback: Display a warning, then load only generic (non-language-specific) core skills.
- Q: What should happen when `--persona` specifies a non-existent persona? → A: Warn & list: Show an error, display the full list of valid personas, and fall back to the workflow default.
- Q: Which workflows are in scope for the MVP Orchestration Map? → A: Full set (7): `#new`, `#impl`, `#bug`, `#review`, `#docs`, `#test`, `#arch`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Persona & Skill Selection (Priority: P1)

As a user, I want the system to automatically select the right persona and relevant skills when I trigger a workflow command, so that I get focused, context-appropriate responses without manually configuring anything.

**Why this priority**: This is the core value of the orchestrator. Without consistent persona/skill selection, every workflow interaction requires manual setup, defeating the purpose of standardized commands.

**Independent Test**: Can be tested by triggering a known workflow (e.g., `#impl`) and verifying the system adopts the correct persona and loads the expected set of skills.

**Acceptance Scenarios**:

1. **Given** a user triggers `#impl`, **When** the orchestrator processes the command, **Then** the persona is set to "Software Engineer" and the appropriate language/architecture/testing skills are loaded.
2. **Given** a user triggers `#review`, **When** the orchestrator processes the command, **Then** the persona is set to "Code Reviewer" and code-quality/security skills are loaded.
3. **Given** a user triggers `#bug`, **When** the orchestrator processes the command, **Then** the persona is set to "Debugger" and debugging/error-handling skills are prioritized.

---

### User Story 2 - Manual Override of Persona & Skills (Priority: P2)

As a user, I want to override the default persona or add specific skills to a workflow session, so that I can tailor the orchestrator's behavior for edge cases or specialized tasks.

**Why this priority**: Provides flexibility. Some tasks don't fit neatly into a default mapping, and forcing the user into a rigid persona/skill set would reduce trust in the system.

**Independent Test**: Can be tested by issuing a command with an explicit override flag and verifying that the overridden values take effect while the rest of the defaults remain intact.

**Acceptance Scenarios**:

1. **Given** a user triggers `#impl --persona architect`, **When** the orchestrator processes the command, **Then** the persona is overridden to "Solutions Architect" while the base skill set still loads.
2. **Given** a user adds skills via `--skills security-basics,tdd`, **When** the orchestrator processes, **Then** those skills are added to (not replacing) the default set, and the total skill count is enforced to remain between 2 and 5 (maximum of 5).

---

### User Story 3 - JIT-Compliant Skill Loading (Priority: P3)

As a user, I want the orchestrator to respect the system's token economy rules, so that only the minimum necessary skills are loaded at any time, keeping context lean and responses fast.

**Why this priority**: Directly tied to the system's performance and reliability. Overloading context with unnecessary skills degrades response quality across all models.

**Independent Test**: Can be tested by triggering any workflow and verifying that no more than 5 skills are loaded, and that only skills relevant to the detected domain/stack are included.

**Acceptance Scenarios**:

1. **Given** a workflow is triggered in a Python project, **When** the orchestrator selects skills, **Then** the Python language skill is loaded along with domain-specific skills such that the total skill count is between 2 and 5.
2. **Given** a workflow is triggered with no detectable stack, **When** the orchestrator selects skills, **Then** it loads only generic core skills (total ≤ 3).

---

### Edge Cases

- **Resolved**: Non-existent persona triggers a warning, displays the list of valid personas, and falls back to the workflow default.
- **Resolved**: If `--skills` pushes total above 5, user-requested skills are kept and default skills are evicted in reverse priority order.
- **Resolved**: Missing or outdated tech-stack file triggers a warning and falls back to generic (non-language-specific) core skills.
- **Resolved**: Rapid succession uses "Last command wins" — the second workflow fully resets persona and skills; no state carries over.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST maintain a declarative mapping of each supported workflow to a default persona and a set of core skills.
- **FR-002**: System MUST automatically select and activate the persona and skills defined in the mapping when a workflow command is triggered.
- **FR-003**: System MUST allow users to override the default persona via an explicit flag (e.g., `--persona`).
- **FR-004**: System MUST allow users to add skills to the active set via an explicit flag (e.g., `--skills`), without replacing the defaults.
- **FR-005**: System MUST enforce a minimum of 2 and a maximum of 5 skills loaded at any time per session.
- **FR-006**: System MUST detect the project's primary technology stack and use it to select the appropriate language-specific skill. If the stack profile is missing or outdated, the system MUST warn the user and fall back to generic core skills only.
- **FR-007**: System MUST integrate with the JIT loading protocol to defer skill loading until it is actually needed.
- **FR-008**: System MUST behave consistently across at least 2 different AI model contexts.
- **FR-009**: If an override specifies a non-existent persona, the system MUST warn the user, display the full list of valid personas, and fall back to the workflow default.
- **FR-010**: If `--skills` would exceed the 5-skill limit, the system MUST notify the user and enforce the cap by always keeping explicitly requested skills and evicting default skills in reverse priority order until the limit is met.
- **FR-011**: If a new workflow command is issued while a previous workflow is active, the system MUST fully reset the persona and skill set to the new workflow's defaults (Last command wins). No state from the prior workflow carries over.

### Key Entities

- **Workflow**: A named execution mode triggered by a command (e.g., `impl`, `review`, `bug`).
- **Persona**: A role profile that shapes the style and focus of responses (e.g., "Software Engineer", "Debugger").
- **Skill**: A discrete knowledge module loaded into context for a specific domain or language.
- **Orchestration Map**: The static configuration that binds Workflows to Personas and Skill sets. MVP scope covers 7 workflows: `#new` (Product Owner), `#impl` (Software Engineer), `#bug` (Debugger), `#review` (Code Reviewer), `#docs` (Technical Writer), `#test` (QA Engineer), `#arch` (Solutions Architect).
- **Tech Stack Profile**: The detected technology context of the current project (used for language-skill selection).

### Assumptions & Dependencies

- **Dependencies**:
  - Depends on `COMMAND-ROUTER.md` (SPEC-006) for command dispatch.
  - Depends on `INPUT-CLASSIFIER.md` for initial workflow classification.
  - Depends on `JIT-PROTOCOL.md` for skill loading rules.
  - Depends on `.context/_meta/tech-stack.md` for stack detection.
- **Assumptions**:
  - The set of supported personas is fixed for this version (no dynamic persona creation).
  - The tech-stack source file is kept up to date by the user or a sync process.
  - Skills are already authored and available in the system.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the 7 supported workflow commands (`#new`, `#impl`, `#bug`, `#review`, `#docs`, `#test`, `#arch`) automatically activate their mapped persona and core skills without user intervention.
- **SC-002**: Override flags (`--persona`, `--skills`) correctly modify the active context in 100% of test cases, without breaking the base workflow.
- **SC-003**: The skill count never exceeds 5 in any observed session, across all workflows and override combinations tested.
- **SC-004**: Orchestrator behavior (persona selection, skill set) is identical for the same input across at least 2 different AI models.
- **SC-005**: Users can complete a standard workflow task (e.g., code review, implementation) with the orchestrator-selected context alone, without needing to manually load additional skills, in at least 90% of observed sessions.
