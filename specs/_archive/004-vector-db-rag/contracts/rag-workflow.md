# Contract: RAG (Retrieve → Augment → Generate) Workflow

**Feature**: 004-vector-db-rag | **Date**: 2026-02-03  
**Governs**: FR-004, SC-002 | **Consumed by**: `knowledge-base/rag-workflow.md` (JIT sub-file)

---

## What this contract defines

The exact three-step sequence the agent follows when it has been asked to create a new skill. The goal is to make the draft stylistically and structurally consistent with the existing library before a single word of the new skill is written.

---

## When this runs

**Trigger**: Agent receives a "create skill" request. Fires after INPUT-CLASSIFIER routes the request and before GENERATE begins.

**Input**: The topic/description of the skill to be created.  
**Output**: A context block (2-3 reference skills + structural guidance) that is prepended to the generation prompt.

---

## Step 1 — RETRIEVE

Run the similarity scorer (see `contracts/similarity-scoring.md`) against the full skill registry using the requested topic as the query. Set topN = 3.

Filter results: keep only skills with score ≥ 40. If fewer than 2 remain, use whatever is available (even 0 — Step 2 handles the empty case).

**Output of Step 1**: `referenceSkills[]` — up to 3 Skill entries with their scores.

---

## Step 2 — AUGMENT

Build a context block the agent will use during generation. Two cases:

### Case A: referenceSkills is non-empty (normal)

For each reference skill, extract:
1. **Section headings** — the H2/H3 structure of its SKILL.md
2. **Example count** — how many functional examples it contains
3. **Comparison table presence** — does it include a cross-language or cross-paradigm comparison?
4. **Citation format** — what citation style does it use (minimal YAML array, per SPEC-003 / SPEC-010 convention)?

Produce a guidance block:

```
## RAG Reference Context

You are about to generate a new skill. The following existing skills
are the closest matches in the library. Match their structure.

### Reference 1: {name} (similarity: {score})
- Section structure: {headings}
- Examples: {count}
- Has comparison table: {yes/no}
- Citation format: {format}

### Reference 2: {name} (similarity: {score})
[same fields]

### Structural rules (derived from references):
- Your skill MUST have these sections: {union of all reference section headings}
- Your skill MUST include at least {max example count across references} examples
- {if any reference has a comparison table} Your skill MUST include a comparison table
- Citations MUST use minimal YAML array format
```

### Case B: referenceSkills is empty

No structural guidance is available. The agent falls back to the canonical `SKILL.template.md` template structure. Log a note that RAG context was unavailable for this generation (useful for SC-002 A/B tracking).

---

## Step 3 — GENERATE

The agent generates the new skill draft with the RAG context block active. The context block is not part of the output — it is consumed during generation only.

**Constraints on the generated draft**:
- Section headings MUST match the structural rules from Step 2.
- Example count MUST meet or exceed the minimum from Step 2.
- If a comparison table was required, it MUST be present.
- Citation format MUST be minimal YAML array (SPEC-003 convention).
- Total length MUST stay within T0-SIZE-01 (≤ 1,400 tokens for the main SKILL.md; overflow goes to JIT sub-files).

---

## SC-002 measurement protocol

To validate that RAG actually improves quality, the agent (or a human reviewer) runs this A/B test on 3 skill creations:

1. Generate skill **with** RAG context (normal flow above).
2. Generate the **same** skill **without** RAG context (skip Steps 1-2; go straight to template).
3. Score both drafts against SELF-CRITIQUE (4 dimensions).
4. Record the delta on Clarity and Best Practices dimensions.

**Target**: RAG draft scores ≥ 5 points higher on average across the two dimensions.

---

## Worked example

**Request**: "Create a Ruby baseline skill"

**Step 1 (Retrieve)**:
- Query: "Ruby baseline language skill"
- Scores: `python: 72`, `javascript: 68`, `java: 61`
- All ≥ 40 → referenceSkills = [python, javascript, java]

**Step 2 (Augment)**:
- python SKILL.md sections: Core Concepts, Type System, Concurrency, Error Handling, Comparison Table, Examples (8)
- javascript SKILL.md sections: Core Concepts, Async Model, Ecosystem, Error Handling, Comparison Table, Examples (7)
- java SKILL.md sections: Core Concepts, OOP, Concurrency, Error Handling, Comparison Table, Examples (9)
- Structural rules derived:
  - Sections: Core Concepts, OOP/Type System, Concurrency/Async, Error Handling, Comparison Table, Examples
  - Min examples: 9 (java's count)
  - Comparison table: required (all 3 have one)
  - Citations: minimal YAML array

**Step 3 (Generate)**: Ruby draft is produced with those structural rules active. Result: a skill that looks like it belongs in the same library as the others.

---

*Contract: rag-workflow | SPEC-004 | 2026-02-03*
