# Contract: Multi-Signal Similarity Scoring

**Feature**: 004-vector-db-rag | **Date**: 2026-02-03  
**Governs**: FR-001, FR-002, FR-003 | **Consumed by**: `knowledge-base/similarity-scoring.md` (JIT sub-file)

---

## What this contract defines

The exact inputs, computation steps, and outputs the agent follows when it needs to score a user query (or a candidate skill) against the existing skill library. This is the engine behind both search (US1) and redundancy detection (US3).

---

## Inputs

| Input | Type | Where it comes from |
|-------|------|---------------------|
| query | string | User's natural-language question, OR the content summary of a candidate skill draft |
| skillRegistry | Skill[] | Full INDEX.md entry list (name, category, tags, triggers, description) |
| topN | integer | How many results to return. Default: 3 |

---

## Signal scoring rubric

Each signal produces an independent 0-100 sub-score. The agent evaluates them in order.

### Signal 1 — Name/Topic Overlap (weight 30%)

Compare the query's key nouns and verbs against each skill's `name` and any topic aliases the agent can infer from the skill's description.

| Sub-score range | Condition |
|-----------------|-----------|
| 90-100 | Query contains the skill name verbatim or a direct synonym (e.g., "goroutine" → `go`) |
| 60-89 | Query topic is clearly related to the skill's domain (e.g., "parallel tasks" → `go`) |
| 30-59 | Weak topical connection; shared domain but different focus |
| 0-29 | No meaningful name or topic connection |

### Signal 2 — Tag Overlap (weight 30%)

Count how many of the skill's `tags` (and `triggers`, which are a subset) appear in or are synonymous with words in the query. Score proportionally.

| Sub-score range | Condition |
|-----------------|-----------|
| 90-100 | ≥ 3 tags match query terms or synonyms |
| 60-89 | 2 tags match |
| 30-59 | 1 tag matches |
| 0-29 | 0 tags match |

### Signal 3 — Domain Match (weight 20%)

Does the query's implied domain (language, paradigm, infrastructure, etc.) match the skill's `category`?

| Sub-score range | Condition |
|-----------------|-----------|
| 80-100 | Exact category match (e.g., query is about Go → skill category `linguagens`, skill name `go`) |
| 40-79 | Adjacent category (e.g., query is about web servers → skill is a language that is commonly used for servers) |
| 0-39 | No domain connection |

### Signal 4 — Description Keyword Overlap (weight 20%)

Extract key technical terms from the query. Check how many appear in the skill's `description` field.

| Sub-score range | Condition |
|-----------------|-----------|
| 80-100 | ≥ 2 key terms from query appear in description |
| 40-79 | 1 key term appears |
| 0-39 | 0 key terms appear |

---

## Computation

```
finalScore = round(
    nameOverlap   × 0.30 +
    tagOverlap    × 0.30 +
    domainMatch   × 0.20 +
    descOverlap   × 0.20
)
```

Apply to every skill in the registry. Sort descending by `finalScore`. Return top-N.

---

## Outputs

| Output | Type | Notes |
|--------|------|-------|
| results | SimilarityScore[] | Sorted descending by score; length = min(topN, number of skills with score > 0) |
| gapDetected | boolean | `true` if zero skills scored ≥ 40 |

If `gapDetected` is `true`, the agent MUST forward the original query to AUTO-INCREMENT as a GapRecord (see `contracts/redundancy-gate.md` for the forwarding step, or directly append to MEMORY.md episodic table).

---

## Worked example

**Query**: "How do I run tasks in parallel in Go?"

| Skill | Name (30%) | Tags (30%) | Domain (20%) | Desc (20%) | Final |
|-------|-----------|------------|--------------|------------|-------|
| go | 85 (topic: parallel → Go concurrency) | 90 (triggers: goroutine, concurrency match) | 90 (linguagens + Go) | 80 (description mentions goroutines) | **87** |
| python | 40 (weak: "tasks" exists but no Go link) | 30 (asyncio is parallel-adjacent) | 40 (linguagens but wrong lang) | 30 (no direct match) | **35** |
| java | 35 | 60 (threads tag) | 40 | 40 | **43** |

Result: `[go:87, java:43, python:35]`. Top-3 returned. `go` is the clear winner. `gapDetected = false`.

---

*Contract: similarity-scoring | SPEC-004 | 2026-02-03*
