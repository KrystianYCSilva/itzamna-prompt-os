# Quickstart: Enhanced Knowledge Retrieval & RAG

**Branch**: `004-vector-db-rag` | **Date**: 2026-02-03  
**Audience**: Any AI agent operating within PromptOS after this feature ships.

---

## What changed

`KNOWLEDGE-BASE.md` was a keyword-search helper with a basic RAG checklist. It is now a **4-capability protocol** with JIT sub-files. The main file routes you to exactly the sub-file you need. You will rarely need to read more than one sub-file per action.

---

## File map

| File | Load when… |
|------|------------|
| `.prompt-os/core/KNOWLEDGE-BASE.md` | Always — this is your entry point |
| `.prompt-os/core/knowledge-base/similarity-scoring.md` | You need to search for a skill by topic |
| `.prompt-os/core/knowledge-base/redundancy-gate.md` | A new skill is about to be persisted |
| `.prompt-os/core/knowledge-base/rag-workflow.md` | You are about to generate a new skill |
| `.prompt-os/core/knowledge-base/relationship-map.md` | You just persisted a skill and need to propose links, or you loaded a skill and want to surface related ones |

---

## Quick-reference: which sub-file for which action

### "A developer asked a question. Do I have a skill for this?"

1. Load `KNOWLEDGE-BASE.md` → it tells you to run similarity scoring.
2. Load `knowledge-base/similarity-scoring.md`.
3. Score the query against INDEX.md. Return top-3.
4. If all scores < 40 → forward a GapRecord to MEMORY.md (instructions are in similarity-scoring.md).

### "The developer wants a new skill created."

1. Load `knowledge-base/rag-workflow.md`.
2. Follow Retrieve → Augment → Generate.
3. After the draft is generated, run SELF-CRITIQUE (existing protocol).
4. Before persisting, load `knowledge-base/redundancy-gate.md` and run the decision tree.
5. After the skill is persisted (HUMAN-GATE approved), load `knowledge-base/relationship-map.md` and propose links.

### "I just loaded a skill. Should I tell the developer about related ones?"

1. Check the skill's `relationships` block in INDEX.md.
2. If non-empty, surface them using the format in `knowledge-base/relationship-map.md` → "Surfacing" section.
3. If empty and the library has ≥ 3 skills, note it — SC-006 expects ≥ 90% coverage.

---

## What has NOT changed

- The search hierarchy (Skills → Personas → Docs → Memory → External research) is unchanged.
- JIT loading limits (2-5 skills at a time) are unchanged.
- SELF-CRITIQUE and HUMAN-GATE run exactly as before; this feature inserts steps *around* them, not inside them.
- The 6-phase pipeline order is unchanged. RAG fires during RESEARCH; redundancy fires during VALIDATE.

---

## Key numbers to remember

| Number | What it means |
|--------|---------------|
| 30 / 30 / 20 / 20 | Signal weights: Name, Tags, Domain, Description |
| 40 | Minimum score to return a skill in search results |
| 60 | Minimum score to report a redundancy candidate (INDEX.md legacy threshold) |
| 80 | Redundancy gate activates (high overlap — 3 options) |
| 90 | Hard block tier (near-duplicate — 2 options only) |
| 3 | Default top-N for search results |
| 2-3 | Number of reference skills RAG retrieves |
| 1,400 | Token budget for main KNOWLEDGE-BASE.md |

---

*Quickstart: SPEC-004 Enhanced Knowledge Retrieval & RAG | 2026-02-03*
