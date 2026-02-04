# Contract: Two-Tier Redundancy Gate

**Feature**: 004-vector-db-rag | **Date**: 2026-02-03  
**Governs**: FR-005, FR-006, SC-003 | **Consumed by**: `knowledge-base/redundancy-gate.md` (JIT sub-file)

---

## What this contract defines

The exact decision flow the agent follows when a new skill draft is about to be persisted. It runs the similarity scorer against the full library, interprets the highest score, and either blocks, presents options, or allows the write — based on which tier the score falls into.

---

## When this runs

**Trigger**: Immediately after SELF-CRITIQUE passes and before HUMAN-GATE write. This sits between the "GENERATE" and "COMMIT" steps of the 6-phase pipeline.

**Input**: The candidate skill draft (name, tags, description, full content).  
**Output**: One of three dispositions: `allowed`, `options-presented`, or `blocked`.

---

## Decision tree

```
Run similarity-scoring against full registry
         │
         ▼
    Highest score?
         │
    ┌────┴────────────────┐
    ▼                     ▼
  < 80                  ≥ 80
    │                     │
    ▼               ┌─────┴─────┐
 ALLOWED            ▼           ▼
 (no overlap)     80-89        ≥ 90
                    │           │
                    ▼           ▼
              OPTIONS        HARD BLOCK
              (3 choices)    (2 choices)
```

---

## Tier 1: High overlap (80-89)

The agent presents the developer with **three options** and waits for a response before proceeding.

| Option | Label | What happens next |
|--------|-------|-------------------|
| A | Expand existing | Agent surfaces the overlapping skill for editing. New draft is discarded. |
| B | Create complementary | Agent adds a `complementary` relationship link from the new skill to the overlapping skill (and vice-versa). Proceeds to HUMAN-GATE. |
| C | Proceed as-is | Agent proceeds to HUMAN-GATE with no relationship link. Developer takes responsibility for the overlap. |

**Presentation format** (the agent shows):
```
⚠ Redundancy detected: "{newSkillName}" overlaps {overlapPercent}% with "{existingSkillName}"

Options:
  A) Expand "{existingSkillName}" with the new content
  B) Create as complementary skill (cross-referenced)
  C) Proceed as-is

Your choice:
```

---

## Tier 2: Near-duplicate (≥ 90) — HARD BLOCK

"Proceed as-is" is **not available**. The agent presents only two options.

| Option | Label | What happens next |
|--------|-------|-------------------|
| A | Expand existing | Same as Tier 1 Option A |
| B | Create complementary | Same as Tier 1 Option B |

**Presentation format**:
```
🚫 Near-duplicate detected: "{newSkillName}" overlaps {overlapPercent}% with "{existingSkillName}"
   This level of overlap indicates a duplicate. "Proceed as-is" is not available.

Options:
  A) Expand "{existingSkillName}" with the new content
  B) Create as complementary skill (cross-referenced)

Your choice:
```

**Rationale for hard block**: At ≥ 90, the content is substantively the same skill. The only legitimate case for a near-90 score with distinct intent is a version-extension (e.g., `go-118` extending `go`), and that is handled by the relationship system (`version-extension` type), not by creating an unlinked duplicate.

---

## Gap forwarding (score < 40 on all skills)

If the similarity scorer returns `gapDetected = true` (zero skills scored ≥ 40), the redundancy gate does not run. Instead, the agent appends a GapRecord to MEMORY.md:

```
| {today's date} | knowledge-gap | "{original query}" | open |
```

This is the FR-010 integration point.

---

## Test scenarios (maps to SC-003)

| Scenario | Input overlap | Expected tier | Expected options |
|----------|---------------|---------------|------------------|
| T1 | "Go Concurrency Patterns" vs `go` (≥ 90) | nearDuplicate | A, B only |
| T2 | "Python Async Patterns" vs `python` (82) | high | A, B, C |
| T3 | "Rust Error Handling" vs `java` (45) | none | — (allowed) |
| T4 | "Kafka Consumer" vs all skills (< 40) | gap | GapRecord forwarded |
| T5 | "JavaScript Testing" vs `javascript` (88) | high | A, B, C |

SC-003 requires zero false negatives on T1 and T2 (both must be flagged).

---

*Contract: redundancy-gate | SPEC-004 | 2026-02-03*
