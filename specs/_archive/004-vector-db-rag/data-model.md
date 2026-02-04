# Data Model: Enhanced Knowledge Retrieval & RAG

**Branch**: `004-vector-db-rag` | **Date**: 2026-02-03  
**Source**: spec.md Key Entities + research.md D2/D5

---

## Entities

### Skill (existing — extended)

The primary knowledge unit. Already persisted as `SKILL.md` files; metadata mirrored in INDEX.md.

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| name | string | INDEX.md | Unique identifier; kebab-case |
| category | string | INDEX.md | e.g., `linguagens` |
| level | enum (L0, L1, L2, L3) | INDEX.md | L1 = baseline, L2 = advanced |
| tags | string[] | INDEX.md | Used by similarity signal "Tag overlap" (30%) |
| triggers | string[] | INDEX.md | Subset of tags; folded into tag signal (no separate weight) |
| description | string | INDEX.md | Used by similarity signal "Description keyword overlap" (20%) |
| filePath | string | INDEX.md | Relative path to SKILL.md |
| relationships | RelationshipLink[] | INDEX.md (NEW) | Added by this feature; see entity below |

**Validation rules**:
- `name` must be unique across the entire INDEX.md registry.
- `tags` must be non-empty (required for similarity scoring; skills with empty tags fall back to name + description only and are flagged for metadata enrichment — see Edge Cases in spec).
- `relationships` is optional at creation time; populated by the relationship-surfacing step post-creation (FR-007).

**State transitions**: Skills move through `draft → flagged (redundancy) → approved → persisted`. The redundancy gate (FR-005/FR-006) sits between `draft` and `approved`. No other lifecycle states are in scope.

---

### SimilarityScore (computed — ephemeral)

Not persisted. Computed on-the-fly by the agent during a search or redundancy check. Exists only for the duration of a single agent turn.

| Field | Type | Derivation |
|-------|------|------------|
| targetSkill | Skill.name | The skill being scored against |
| score | integer (0-100) | Weighted sum of four signals |
| nameOverlap | integer (0-100) | Signal 1 — weight 30% |
| tagOverlap | integer (0-100) | Signal 2 — weight 30% |
| domainMatch | integer (0-100) | Signal 3 — weight 20% |
| descriptionOverlap | integer (0-100) | Signal 4 — weight 20% |
| tier | enum (none, high, nearDuplicate) | Derived: < 80 = none; 80-89 = high; ≥ 90 = nearDuplicate |

**Validation rules**:
- `score` = round(nameOverlap×0.30 + tagOverlap×0.30 + domainMatch×0.20 + descriptionOverlap×0.20).
- Each signal is independently scored 0-100 by the agent following the rubric in `contracts/similarity-scoring.md`.
- `tier` is a pure derivation; never set independently.

---

### RelationshipLink (new — persisted in INDEX.md)

A typed, bidirectional edge between two skills.

| Field | Type | Notes |
|-------|------|-------|
| targetSkill | Skill.name | The other end of the edge |
| type | enum (prerequisite, complementary, domain-cluster, version-extension) | See type definitions below |
| addedBy | string | "agent-proposed" or "human-confirmed" |
| addedAt | date | ISO date |

**Type definitions**:
- `prerequisite`: Skill A must be understood before Skill B is useful. Direction matters: A is the prerequisite of B.
- `complementary`: Skills cover adjacent but non-overlapping ground. No ordering. e.g., `go` ↔ `python` (both baselines, different paradigms).
- `domain-cluster`: Skills share a domain (e.g., all web-framework skills). Informational; no ordering.
- `version-extension`: Skill B is a version-specific sub-skill of A. e.g., `java` → `java-21`. Direction matters: A is the base.

**Validation rules**:
- No self-edges (targetSkill ≠ ownerSkill).
- `prerequisite` and `version-extension` are directional; stored on the dependent/extended skill only.
- `complementary` and `domain-cluster` are bidirectional; stored on both skills to enable surfacing from either side.
- Duplicates (same target + same type) are rejected silently.

**Persistence format** (inline in INDEX.md, under each skill entry):

```yaml
relationships:
  - target: python
    type: complementary
    addedBy: agent-proposed
    addedAt: "2026-02-03"
  - target: java
    type: domain-cluster
    addedBy: human-confirmed
    addedAt: "2026-02-03"
```

---

### GapRecord (new — persisted in MEMORY.md)

A structured entry forwarded to AUTO-INCREMENT when a search yields no results above the relevance threshold.

| Field | Type | Notes |
|-------|------|-------|
| date | date | ISO date of the search that triggered the gap |
| type | string | Always `knowledge-gap` |
| description | string | The original user query that found no match |
| status | enum (open, deferred, addressed) | Lifecycle managed by AUTO-INCREMENT |

**Persistence format** (row in MEMORY.md episodic table):

```
| 2026-02-03 | knowledge-gap | "How do I consume messages from Kafka?" | open |
```

**Validation rules**:
- `description` is the raw query string; do not paraphrase.
- One row per unique query. If the same query recurs, increment a usage counter rather than adding a duplicate row (counter field is managed by AUTO-INCREMENT, not this protocol).

---

## Entity Relationship Diagram (textual)

```
Skill ─────────────── 1:N ─────────────── RelationshipLink
  │                                            │
  │ (metadata read by)                         │ (targetSkill →)
  ▼                                            ▼
SimilarityScore                             Skill (other end)
  │
  │ (zero results →)
  ▼
GapRecord ──── forwarded to ──── AUTO-INCREMENT (MEMORY.md)
```

---

*SPEC-004 | Data Model | 2026-02-03*
