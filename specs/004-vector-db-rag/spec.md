# Feature Specification: Enhanced Knowledge Retrieval & RAG for PromptOS

**Feature Branch**: `004-vector-db-rag`  
**Created**: 2026-02-03  
**Status**: Draft  
**Input**: Enhance KNOWLEDGE-BASE with prompt-based multi-signal similarity search and RAG for the PromptOS skill library

---

## Context & Assumptions

The original SPEC-004 design assumed a code-based Vector DB layer (ChromaDB, embeddings). Since v2.0.0 PromptOS shifted to a fully prompt-based architecture — AI agents **read and follow** Markdown instructions, with no required runtime. The current `KNOWLEDGE-BASE.md` already provides keyword-based search and a basic RAG checklist, but lacks:

1. A structured similarity-scoring method agents can apply without embeddings.
2. A redundancy-detection protocol with clear thresholds and actions.
3. A context-augmentation workflow that guides agents through retrieve → augment → generate.
4. A defined upgrade path for when the library grows large enough to warrant actual vector tooling.

**Assumptions (informed defaults, no clarification needed):**

- A1: All matching and scoring is performed *by the AI agent itself* using the instructions in this protocol — no external service required for the core feature.
- A2: "Multi-signal similarity" is the scoring mechanism used throughout this spec — structured comparison across four weighted signals (name overlap, tag overlap, domain match, description keyword overlap) applied by the agent following a rubric. This is distinct from embedding-based "semantic similarity", which is the v3.0.0 scope.
- A3: The optional vector-tooling layer (ChromaDB / Ollama embeddings) remains out of scope for this spec; it is the v3.0.0 deliverable referenced in the ROADMAP.
- A4: Skills are the primary knowledge units. Personas and docs are secondary and follow the same patterns once the skill layer works.
- A5: The protocol must stay within the JIT loading philosophy — main file ≤ 1,400 tokens, depth in sub-files loaded on demand.

## Clarifications

### Session 2026-02-03

- Q: What are the four signal weights for the similarity rubric (FR-002)? → A: Adopt existing INDEX.md weights — Name/topic overlap 30%, Tag overlap 30%, Domain match 20%, Description keyword overlap 20%.
- Q: What happens when similarity is ≥ 90 and user selects "proceed as-is"? → A: Hard block — "proceed as-is" is removed at ≥ 90; only "expand existing" or "create complementary" are available. Full three-option choice remains at 80-89.
- Q: Should there be a hard latency target (ms) for the scoring step? → A: No — scoring is performed by the agent inside its context window (no network or DB call). Qualitative constraint added: scoring must complete within a single agent turn.
- Q: Which term is canonical — "semantic similarity" or "multi-signal similarity"? → A: "Multi-signal similarity". More precise for the prompt-based mechanism; "semantic similarity" typically implies embedding-based vectors (v3.0.0 scope). All occurrences normalised.

---

## User Scenarios & Testing

### User Story 1 — Find the Right Skill by Intent (Priority: P1)

A developer asks the AI agent a question in natural language (e.g., "How do I deploy to Kubernetes?"). The agent uses the knowledge-retrieval protocol to surface the most relevant skill(s) from the library — even when the question words do not literally match the skill name or tags.

**Why this priority**: This is the single most common interaction with the knowledge layer. Every other feature (RAG, redundancy detection) is downstream of this working well.

**Independent Test**: Ask the agent 10 questions whose answers live in the current 13 skills but whose wording shares no exact tokens with skill names. Measure how many of the correct skills surface in the top-3 results.

**Acceptance Scenarios**:

1. **Given** the skill `go` exists with triggers `[goroutine, channel, concurrency]`, **When** the agent receives "How do I run tasks in parallel in Go?", **Then** the `go` skill appears in the top-3 retrieved results with a relevance score ≥ 60.
2. **Given** no skill covers Kafka, **When** the agent receives "How do I consume messages from Kafka?", **Then** the agent returns zero results and logs a gap for AUTO-INCREMENT.

---

### User Story 2 — Context-Augmented Skill Generation (Priority: P2)

When a developer requests a new skill be created, the agent retrieves the 2-3 most similar existing skills first, uses their structure and style as a reference context, and then generates the new skill draft. The result is stylistically and structurally consistent with the library without being a copy.

**Why this priority**: RAG-augmented generation is the mechanism that keeps the library internally consistent as it grows. Without it, each new skill is generated in isolation and quality drift accumulates.

**Independent Test**: Create two skill drafts for the same topic — one with RAG context loaded, one without. Score both against SELF-CRITIQUE. The RAG-augmented draft should score ≥ 5 points higher on average across Clarity and Best Practices dimensions.

**Acceptance Scenarios**:

1. **Given** skills `java` and `python` exist, **When** the agent is asked to create a `ruby` baseline, **Then** the agent retrieves `java` and `python` as reference context and produces a draft whose section structure matches theirs.
2. **Given** retrieved context includes skill X with a comparison table, **When** the new skill is generated, **Then** the new skill also includes a cross-language comparison table.

---

### User Story 3 — Redundancy Detection Before Persistence (Priority: P2)

Before any new skill is committed, the agent runs a redundancy check against the existing library. Two tiers govern behaviour: at 80-89 similarity the agent presents three options (expand, complementary, proceed as-is); at ≥ 90 similarity "proceed as-is" is blocked and only expand or complementary are available.

**Why this priority**: Redundancy directly undermines the value of the knowledge base. SKILL-GOVERNANCE.md already defines the policy; this spec provides the *detection* mechanism the agent follows. The two-tier threshold prevents near-duplicates from entering the library while preserving developer choice for borderline cases.

**Independent Test**: Submit two drafts — one near-paraphrase (expected ≥ 90) and one partial-overlap case (expected 80-89). Verify the ≥ 90 draft is hard-blocked to two options and the 80-89 draft receives all three options.

**Acceptance Scenarios**:

1. **Given** skill `go` covers goroutines, channels, and interfaces, **When** a draft skill titled "Go Concurrency Patterns" is submitted that covers goroutines and channels, **Then** the agent reports overlap ≥ 90 with `go` and presents only two options (expand or complementary) — "proceed as-is" is blocked.
2. **Given** a draft skill covers a topic partially covered by skill X (overlap 80-89), **When** the redundancy check runs, **Then** the agent presents all three options (expand, complementary, proceed as-is) and waits for human approval.

---

### User Story 4 — Structured Skill Relationships (Priority: P3)

The knowledge base maintains an explicit relationship graph between skills. When a skill is loaded, the agent can surface "related skills" that are complementary, prerequisite, or in the same domain cluster.

**Why this priority**: This is an enhancement layer. The system works without it; it improves discoverability once the library reaches 15+ skills.

**Independent Test**: Load the `javascript` skill. Verify the agent can name at least 2 related skills from the current library and explain *why* they are related.

**Acceptance Scenarios**:

1. **Given** skills `javascript`, `typescript` (future), and `python` exist, **When** `javascript` is loaded, **Then** the agent suggests `typescript` as a "version extension" and `python` as a "paradigm comparison".
2. **Given** a new skill is added to the library, **When** the post-creation step runs, **Then** the agent proposes relationship links to existing skills and records them.

---

### Edge Cases

- What happens when the library has only 1 skill and a similarity search is requested? → Return that skill if score ≥ 40; otherwise return empty + log gap.
- How does the system handle a skill that is related to itself during redundancy checks? → Self-match is excluded; only compare against *other* skills.
- What if two skills have identical similarity scores? → Break ties by recency (most recently created first), then alphabetically.
- What if the agent cannot determine a similarity score (e.g., skill has no tags or triggers)? → Fall back to name + description keyword comparison only; flag the skill for metadata enrichment.

---

## Requirements

### Functional Requirements

- **FR-001**: The agent MUST be able to compute a similarity score (0-100) between a user query and any skill in the library using a defined multi-signal rubric.
- **FR-002**: The similarity rubric MUST use exactly four signals with these weights: Name/topic overlap 30%, Tag overlap 30%, Domain match 20%, Description keyword overlap 20%. These are the same weights used by the existing INDEX.md redundancy heuristic.
- **FR-003**: The agent MUST return the top-N skills (default N=3) sorted by descending similarity score when performing a knowledge search.
- **FR-004**: The agent MUST retrieve 2-3 reference skills and include their structure in the generation context *before* drafting any new skill (RAG step).
- **FR-005**: The agent MUST run a redundancy check against the existing library before any new skill is persisted. Two tiers apply: similarity 80-89 = high overlap; similarity ≥ 90 = near-duplicate (hard block).
- **FR-006**: At 80-89 overlap the agent MUST present three options: expand existing, create complementary, or proceed as-is — and wait for human approval. At ≥ 90 overlap the agent MUST present only two options: expand existing or create complementary. "Proceed as-is" is blocked at this tier.
- **FR-007**: The agent MUST maintain a relationship map between skills (prerequisite, complementary, domain-cluster) and surface related skills when a skill is loaded.
- **FR-008**: All retrieval and scoring logic MUST be expressible as prompt instructions — no external service or runtime required for the core feature. Scoring MUST complete within a single agent turn (no hard ms target; the operation is in-context, not network-bound).
- **FR-009**: The main protocol file MUST remain ≤ 1,400 tokens (T0-SIZE-01). Detailed rubrics and sub-protocols MUST live in JIT sub-files.
- **FR-010**: Gaps detected during search (zero results above threshold) MUST be forwarded to AUTO-INCREMENT for tracking.

### Key Entities

- **Skill**: The primary knowledge unit. Attributes: name, category, level (L0-L3), tags, triggers, description, file path. Relationships: related-to, prerequisite-of, complements.
- **Similarity Score**: A computed 0-100 value representing how well a skill matches a query or another skill. Composed of four weighted signals: Name 30%, Tags 30%, Domain 20%, Description 20% (FR-002). Reuses the weight split already defined in INDEX.md.
- **Relationship Link**: A typed edge between two skills. Types: `prerequisite`, `complementary`, `domain-cluster`, `version-extension`.
- **Gap Record**: A structured entry forwarded to AUTO-INCREMENT when no skill meets the relevance threshold for a query.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: ≥ 80% of test queries (a defined set of 20 natural-language questions) surface the correct skill in the top-3 results. Measured by running the test set against the protocol.
- **SC-002**: RAG-augmented skill drafts score ≥ 5 points higher on average (SELF-CRITIQUE, Clarity + Best Practices) than drafts generated without retrieval context. Measured by A/B comparison on 3 skill creations.
- **SC-003**: 100% of skills with similarity ≥ 80 are flagged before persistence. Skills at ≥ 90 MUST be hard-blocked (only expand / complementary). Zero false negatives on a test set of 5 drafts (at least 2 at ≥ 90, at least 2 at 80-89).
- **SC-004**: The main KNOWLEDGE-BASE.md protocol file stays ≤ 1,400 tokens after enhancement. Verified by token count.
- **SC-005**: The protocol introduces zero T0 violations when applied by any of the 5 synced agents. Verified by running the mandatory protocol sequence on 2 skill creations end-to-end.
- **SC-006**: Relationship suggestions are surfaced for ≥ 90% of skills when the library contains ≥ 3 skills. Measured after implementing the relationship map.

---

## Scope Boundaries

**In scope:**
- Multi-signal similarity scoring rubric (prompt-based)
- RAG context-augmentation workflow
- Redundancy detection + 3-option human gate
- Skill relationship map and surfacing
- JIT sub-file structure for the enhanced protocol
- Integration with AUTO-INCREMENT (gap forwarding) and SELF-CRITIQUE (RAG A/B scoring)

**Out of scope (v3.0.0):**
- Actual vector embeddings or embedding models
- ChromaDB / Pinecone / Qdrant integration
- LLM-based self-critique (distinct from the existing prompt-based SELF-CRITIQUE)
- Multi-modal skill indexing
- Incremental re-indexing pipelines

---

*PromptOS v2.2.0 | SPEC-004 Specification | 2026-02-03*
