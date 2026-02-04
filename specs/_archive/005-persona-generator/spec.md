# Feature Specification: Persona Generator Protocol Enhancement

**Feature Branch**: `005-persona-generator`  
**Created**: 2026-02-03  
**Status**: Draft - Specification Phase  
**Input**: Formalize SPEC-005 with Persona Generator protocol that enables AI agents to create context-appropriate personas by composing existing skills and defining behavioral traits

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI Agent Generates a Persona from Natural Language Description (Priority: P1)

An AI agent needs to create a new persona based on a simple natural language description like "Senior backend engineer specializing in microservices."

**Why this priority**: Core capability - personas are composites of skills and behavioral patterns. Without a formal protocol, persona creation is manual and inconsistent.

**Independent Test**: Provide an AI agent with 5 persona descriptions and verify it:
1. Extracts key concepts (level: senior, domain: backend, specialization: microservices)
2. Selects 3-5 relevant core skills from the skill library
3. Selects 2-3 relevant secondary skills
4. Infers behavioral traits (communication style, decision approach, collaboration mode)
5. Generates valid PERSONA.md with YAML frontmatter + Markdown content
6. Passes self-critique (≥80/100)
7. Obtains human approval via Human Gate

**Acceptance Scenarios**:

1. **Given** persona description "Senior backend engineer specializing in microservices", **When** agent generates persona, **Then**:
   - Infers level = "senior"
   - Infers domains = ["backend", "devops"] (from "microservices" keyword)
   - Selects 3-5 core skills with scores ≥0.70 (e.g., nodejs-api 0.9, docker-basics 0.85, kubernetes 0.80)
   - Selects 2-3 secondary skills with scores 0.4-0.69 (e.g., api-design 0.6, testing-backend 0.5)
   - Generates YAML frontmatter with: name, role, level, domains, skills.core, skills.secondary, context, triggers

2. **Given** PERSONA-GENERATOR.md protocol loaded, **When** agent creates persona for "Junior React developer with TypeScript", **Then**:
   - Infers level = "junior"
   - Infers domains = ["frontend"]
   - Generates communication_style = "learning-oriented, asks clarifying questions"
   - Generates decision_approach = "methodical, seeks validation"
   - Triggers list includes: "frontend", "react", "typescript"

3. **Given** persona description with no matching skills (e.g., "Expert in extinct programming language COBOL"), **When** agent generates persona, **Then**:
   - Rejects persona creation (Strict Validation)
   - Returns message: "No skills found matching 'COBOL'. Current library has: {list of available domains}"
   - Suggests: "To create this persona, please add COBOL-related skills first"
   - Logs gap to AUTO-INCREMENT.md for future skill creation

---

### User Story 2 - AI Agent Composes Skills into Persona Template (Priority: P1)

An AI agent needs to combine multiple existing skills into a coherent persona file with proper YAML frontmatter and markdown structure.

**Why this priority**: Foundational - skill composition is the core of persona generation. Without proper composition rules, personas become inconsistent.

**Independent Test**: Provide 3 different skill sets and verify agent:
1. Selects 3-5 core skills (marked in YAML under `skills.core`)
2. Selects 2-3 secondary skills (marked under `skills.secondary`)
3. Generates unique triggers based on domains and skill names
4. Fills all mandatory sections: Identity, Core Competencies, Behavioral Traits, When to Activate, Integration with Skills

**Acceptance Scenarios**:

1. **Given** skill library with 13 baseline skills, **When** agent composes persona for "DevOps engineer", **Then**:
   - Core skills = 3-5 selected from {docker-basics, kubernetes, ci-cd, terraform, monitoring} (example domain match)
   - Secondary skills = 2-3 from {logging, performance-tuning, security-hardening} (example complementary)
   - YAML structure matches template: name, role, level, domains, skills, context, triggers
   - All skill names reference actual skills from INDEX.md

2. **Given** persona with 5 core skills, **When** agent generates Behavioral Traits section, **Then**:
   - Communication Style reflects level (junior="learning-oriented", senior="mentoring and strategic")
   - Decision Approach reflects domain (backend="scalability-focused", frontend="UX-conscious")
   - Collaboration Mode is consistent across all personas (default: "async-first with documentation")

---

### User Story 3 - AI Agent Applies Self-Critique and Human Gate to Persona (Priority: P1)

An AI agent generates a persona and validates it using SELF-CRITIQUE.md, then presents to human for approval via HUMAN-GATE.md.

**Why this priority**: Quality gate - personas must meet quality standards before being added to the library. Self-critique identifies gaps, human gate ensures human oversight.

**Independent Test**: Generate 3 personas and verify:
1. Self-critique score calculated using 4 dimensions (Completeness, Clarity, Correctness, Best Practices)
2. Score ≥80/100 for approval eligibility
3. Human Gate workflow displayed (approve/view/edit/reject options)
4. Persona only saved if human clicks approve

**Acceptance Scenarios**:

1. **Given** persona generated with all sections filled, **When** self-critique runs, **Then**:
   - Completeness ≥25: All mandatory sections present and filled (Identity, Core Competencies, Behavioral Traits, When to Activate, Integration with Skills)
   - Clarity ≥25: YAML is valid, triggers are non-overlapping with other personas, writing is professional
   - Correctness ≥25: Skills exist in INDEX.md, level is valid (junior|mid|senior|principal), domains are consistent
   - Best Practices ≥25: Triggers derived from domains and skills, no duplication with existing personas, follows template structure
   - Overall ≥80/100

2. **Given** human reviews persona with score 82/100, **When** human clicks [approve], **Then**:
   - Persona saved to `personas/{slug}/PERSONA.md`
   - Personas INDEX.md updated with new entry
   - Session logged to memory.md (gap detection: 0, rejections: 0)

3. **Given** human reviews persona with score 78/100, **When** human clicks [reject], **Then**:
   - Persona not saved
   - Rejection logged to memory.md with reason
   - Suggestion to improve: identify specific sections needing work

---

### User Story 4 - AI Agent Lists and Inspects Existing Personas (Priority: P2)

An AI agent needs to query the persona library to list, inspect, and activate personas.

**Why this priority**: User experience - users need to discover available personas and understand their capabilities.

**Independent Test**: With 3+ personas in library, verify agent:
1. Lists all personas with name, role, level, domains
2. Inspects specific persona showing core/secondary skills, triggers, behavioral traits
3. Displays skill integration details (which skills activate together)

**Acceptance Scenarios**:

1. **Given** persona library with "Senior Backend Engineer" and "Junior Frontend Developer", **When** agent lists personas, **Then**:
   - Shows table: | Persona | Role | Level | Domains | Core Skills |
   - Each row displays: Senior Backend Engineer | Backend Engineer | senior | backend, devops | nodejs-api, docker-basics, kubernetes

2. **Given** user inspects "Senior Backend Engineer" persona, **When** agent shows details, **Then**:
   - Displays: Name, Role, Level, Domains, Core Skills list, Secondary Skills list, Triggers list
   - Shows context: Communication Style = "Technical and mentoring", Decision Approach = "Strategic"
   - Shows when to activate (triggers and example scenarios)

---

## Functional Requirements

| ID | Requirement | Acceptance Criteria | Priority |
|----|-------------|-------------------|----------|
| **FR-001** | Persona generation from natural language | Agent extracts level, domain, keywords from description and selects matching skills | P1 |
| **FR-002** | Skill composition into persona template | 3-5 core skills + 2-3 secondary skills in YAML structure | P1 |
| **FR-003** | Behavioral trait inference | Communication style, decision approach, collaboration mode derived from level + domains | P1 |
| **FR-004** | Trigger generation | List of 4-8 activation triggers derived from domains, skill names, and role | P1 |
| **FR-005** | Self-critique integration | 4-dimension scoring (Completeness, Clarity, Correctness, Best Practices) with ≥80/100 target | P1 |
| **FR-006** | Human Gate integration | Preview + approve/view/edit/reject workflow before saving | P1 |
| **FR-007** | Persona persistence | Save to `personas/{slug}/PERSONA.md` with valid YAML + Markdown structure | P1 |
| **FR-008** | INDEX.md updates | Update personas INDEX if exists, creating if necessary | P1 |
| **FR-009** | List personas | Query library and display all personas in table format | P2 |
| **FR-010** | Inspect persona | Display detailed view of specific persona with all metadata and skill integrations | P2 |
| **FR-011** | Duplicate detection | Warn if generating persona with triggers overlapping existing personas | P2 |
| **FR-012** | Skill metadata validation | Verify all selected skills exist in skills/INDEX.md before saving | P1 |

---

## Success Criteria

| ID | Criteria | Measurement |
|----|----------|-------------|
| **SC-001** | Persona generation accuracy | 100% of 5 test personas generate with ≥70% average skill match score |
| **SC-002** | Self-critique consistency | Average score variation ±3 points across 5 generated personas (consistent evaluation) |
| **SC-003** | Human Gate adoption | 100% of generated personas require human approval; 0 bypasses |
| **SC-004** | YAML validity | 100% of generated PERSONA.md files have valid YAML frontmatter that can be parsed |
| **SC-005** | Skill reference integrity | 100% of skills in persona match actual skills in skills/INDEX.md |
| **SC-006** | Protocol documentation | PERSONA-GENERATOR.md ≤1,400 tokens (if >1,400, extract JIT sub-files) |
| **SC-007** | Constitution compliance | 0 T0/T1 rule violations (T0-HUMAN-01, T0-SOURCE-01, T0-MEMORY-01 verified) |
| **SC-008** | Persona templates | 3+ example personas generated and approved (demoing P1 user stories) |

---

## Key Entities

### Persona Metadata
- **name** (string): Display name (e.g., "Senior Backend Engineer")
- **role** (string): Professional title
- **level** (enum): junior | mid | senior | principal
- **domains** (array): Technical domains (backend, frontend, devops, security, etc.)
- **skills** (object):
  - **core** (array): 3-5 primary skill names
  - **secondary** (array): 2-3 complementary skill names
- **context** (object):
  - **communication_style** (string): How this persona communicates
  - **decision_approach** (string): How this persona makes technical decisions
  - **collaboration_mode** (string): How this persona works with teams
- **triggers** (array): 4-8 activation phrases/keywords

### Persona Generation Process
1. **Extract**: Keywords, domains, level from description
2. **Match**: Query skill library by domain + keywords
3. **Score**: Rank skills by relevance (0.0-1.0)
4. **Select**: Top 3-5 core (score ≥0.70), top 2-3 secondary (0.4-0.69)
5. **Infer**: Behavioral traits based on level + domains
6. **Compose**: Generate PERSONA.md from template
7. **Validate**: Self-critique ≥80/100
8. **Approve**: Human Gate review
9. **Persist**: Save to personas/ directory + update INDEX.md

---

## Assumptions

1. **Skill library exists**: `.prompt-os/skills/INDEX.md` or equivalent is available and populated
2. **SPEC-001 available**: SELF-CRITIQUE.md and HUMAN-GATE.md protocols are implemented and functional
3. **SPEC-004 integration optional**: KNOWLEDGE-BASE.md can support semantic skill matching in future, but v1.0 uses keyword matching
4. **Persona storage**: `personas/` directory structure with one PERSONA.md per persona (slug-based naming)
5. **No persona deletion**: This spec covers creation only; deletion is out of scope
6. **English + Portuguese**: Personas can use both languages; infer from skill library language
7. **One persona at a time**: CLI/agent can generate one persona per invocation
8. **Behavioral templates**: Context inference follows templates (level-based patterns), not learned from data
9. **No API integrations**: Keyword-based skill matching only (no LLM embeddings, vector DB, or external APIs)
10. **Manual skill addition**: If persona request requires skills that don't exist, recommend user add skills first

---

## Design Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| **Keyword-based skill matching** | No external APIs or vector DB required in v2.2.0 architecture | Matching accuracy depends on INDEX.md metadata quality; can upgrade to SPEC-004 semantic search in v3.0 |
| **4-8 triggers per persona** | Balances specificity (too few triggers = poor discovery) with precision (too many = false positives) | Triggers must be manually reviewed during Human Gate to avoid overlap |
| **Template-based behavioral inference** | Consistent, deterministic trait generation without ML | All level-based personas have similar traits; future: learn from skill metadata |
| **Self-critique ≥80 threshold** | Persona generation is simpler than protocol enhancement (SPEC-003 used ≥95); balance quality vs generation speed | Personas with 78-79 score can be manually edited and re-approved |
| **One persona per file** | Simplifies INDEX.md and skill loading | Composite personas (extending other personas) deferred to v2.3.0 |
| **Slug-based directory naming** | Consistent, URL-safe naming for personas | Persona names with spaces become slugs: "Senior Backend Engineer" → "senior-backend-engineer" |

---

## Out of Scope

- **Persona deletion or archival**: Only creation is in scope
- **Persona updating/merging**: Creating from scratch each time (future: FR-013)
- **Persona hierarchy**: "Tech Lead extending Senior Developer" deferred to v2.3.0
- **Persona composition**: "Combining two personas" deferred to v2.3.0
- **Vector embeddings**: Semantic skill matching via SPEC-004 is optional enhancement for v3.0
- **Machine learning**: No training on persona usage patterns
- **Multi-language personas**: English only for v2.2.0 (could add i18n later)
- **Persona activation commands**: Just the protocol for generation (usage/activation is agent-specific)

---

## Clarifications Resolved

**Q1: Skill Gap Handling** ✅ **RESOLVED**

**Decision**: **Option B — Strict Validation (Recommended)**

When a persona description requests skills that don't exist:
1. **Reject** persona creation with clear message
2. **Inform** user: "No skills found matching {missing_domain}. Current library has: {available_domains}"
3. **Guide** user: "To create this persona, add skills for {missing_domain} first"
4. **Log gap** to AUTO-INCREMENT.md for future skill creation

**Rationale**: Ensures personas only compose from high-quality, existing skills. Maintains persona quality standards. AUTO-INCREMENT gap detection allows community to contribute missing skills.

**Impact**: Persona generation may be rejected if skill library is incomplete; this is acceptable and drives skill library growth.

---

**Specification Status**: Ready for clarification phase  
**Estimated effort**: 4-6 sessions (research, planning, implementation, validation)  
**Target version**: v2.2.0 formalization (protocol already exists; this spec formalizes the process)
