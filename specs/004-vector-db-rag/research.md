# Research: Enhanced Knowledge Retrieval & RAG

**Branch**: `004-vector-db-rag` | **Date**: 2026-02-03  
**Purpose**: Resolve every technical unknown from plan.md Technical Context before Phase 1 design begins.

---

## D1 — Scoring mechanism: prompt-based multi-signal vs. embedding-based

**Decision**: Prompt-based multi-signal scoring. The agent computes a 0-100 score by evaluating four signals against the skill's INDEX.md metadata.

**Rationale**: PromptOS is architecturally prompt-based (v2.0.0 constraint). Embedding-based scoring requires an external model + vector store — that is the explicit v3.0.0 deliverable. The multi-signal approach has already been proven in INDEX.md's REDUNDANCY DETECTION section (lines 117-124) where the same four signals and weights are used. Reusing it means zero new abstraction; agents already know how to apply it.

**Alternatives considered**:
- Embedding-based (ChromaDB + local model): rejected — requires runtime, violates prompt-only constraint, is v3.0.0 scope.
- Single-signal (name match only): rejected — too brittle; "run tasks in parallel" would never match `go`.
- LLM-as-judge scoring (ask the agent to rate similarity free-form): rejected — non-deterministic, not reproducible across agents, no consistent threshold behaviour.

---

## D2 — Signal weight source: derive new weights vs. reuse INDEX.md

**Decision**: Reuse INDEX.md weights exactly (Name 30 / Tags 30 / Domain 20 / Description 20). Confirmed by `/speckit.clarify` Q1.

**Rationale**: INDEX.md's REDUNDANCY DETECTION block already defines these four signals with these weights and states "Reporte apenas se similarity >= 60%". The weights have been implicitly validated across all 13 current skills (no false positives reported). Inventing a fifth signal or re-deriving weights would create two scoring systems in the same codebase — a DRY violation.

**Alternatives considered**:
- Add a fifth signal (trigger overlap): the spec originally listed triggers as a signal, but triggers are a subset of tags in the current skill metadata. Folding them into tag scoring avoids double-counting.
- Authority-weighted signals (e.g., official-doc skills score higher): rejected — similarity should be content-based, not provenance-based. Authority is a source-validation concern (SPEC-003), not a retrieval concern.

---

## D3 — Redundancy threshold architecture: single threshold vs. two-tier

**Decision**: Two-tier. 80-89 = high overlap (3 options including proceed). ≥ 90 = near-duplicate hard block (2 options only). Confirmed by `/speckit.clarify` Q2.

**Rationale**: A single threshold at 80 with "proceed as-is" always available would let near-copies slip through if the developer clicks without reading. The hard block at 90 is a guardrail — the only scenario where a ≥ 90 overlap is legitimate is a version-specific sub-skill (e.g., `go-118` vs `go`), and those are handled by the relationship system (version-extension type), not by creating a standalone duplicate.

**Alternatives considered**:
- Single threshold at 80, always 3 options: rejected — no protection against accidental duplicates at high overlap.
- Hard block at 85: rejected — 85-89 is still a range where "complementary" is a plausible intent (e.g., `python-async` alongside `python`). 90 is the cleaner semantic boundary.

---

## D4 — JIT sub-file structure: flat (all in main) vs. 4-file split

**Decision**: 4 JIT sub-files, one per capability. Main file is a thin router.

**Rationale**: SC-004 requires main file ≤ 1,400 tokens. The four capabilities (scoring, redundancy, RAG, relationships) are independently triggered — an agent searching does not need the redundancy decision tree loaded; an agent generating does not need the relationship graph rules. JIT loading means each sub-file is loaded only when the agent's current action requires it. This is exactly the pattern WEB-RESEARCH.md proved in SPEC-003 (401→190 line refactor, 4 sub-files, 1,393 tokens main).

**Alternatives considered**:
- Two sub-files (scoring+redundancy, rag+relationships): rejected — scoring and redundancy are triggered at different lifecycle points (search vs. pre-persist). Bundling them wastes tokens when only one is needed.
- Six sub-files (split worked examples separately): rejected — over-granular for 13 skills; examples are small enough to live inline in each capability file.

---

## D5 — Relationship map persistence: separate file vs. inside INDEX.md

**Decision**: YAML block inside INDEX.md, under each skill's entry. Deferred from `/speckit.clarify` to planning; resolved here.

**Rationale**: INDEX.md is already the single source of truth for skill metadata (tags, triggers, level, path). Adding relationship links there keeps the data co-located with its subject. Agents already load INDEX.md for search; surfacing relationships costs zero additional I/O. A separate `relationships.yaml` file would require a second read on every skill-load.

**Alternatives considered**:
- Standalone `relationships.yaml` at repo root: rejected — splits metadata across two files; agents must remember to load both.
- Inline in each SKILL.md: rejected — creates N copies of each bidirectional edge; updating one side requires updating both files.
- Computed at runtime by the agent (no persistence): rejected — agents would re-derive relationships every session, with no consistency guarantee across agents.

---

## D6 — Gap forwarding format to AUTO-INCREMENT

**Decision**: Structured bullet in MEMORY.md episodic table, matching the existing gap-record pattern used by AUTO-INCREMENT.

**Rationale**: AUTO-INCREMENT.md already defines how gaps are recorded: a row in the episodic table with columns `date | type | description | status`. FR-010 says gaps MUST be forwarded — reusing the existing format means AUTO-INCREMENT picks them up with no protocol change.

**Alternatives considered**:
- New dedicated gaps file: rejected — AUTO-INCREMENT already reads MEMORY.md; a second file is redundant.
- Inline comment in INDEX.md: rejected — INDEX.md is a registry, not a gap tracker. Violates single-responsibility.

---

## Summary of all decisions

| ID | Decision | Key constraint it serves |
|----|----------|--------------------------|
| D1 | Prompt-based multi-signal scoring | A1, A3, FR-008 |
| D2 | Reuse INDEX.md weights (30/30/20/20) | FR-002, DRY |
| D3 | Two-tier redundancy (80-89 / ≥90) | FR-005, FR-006, SC-003 |
| D4 | 4 JIT sub-files + thin router main | SC-004, A5, T0-SIZE-01 |
| D5 | Relationships persist in INDEX.md YAML | FR-007, single source of truth |
| D6 | Gap records in MEMORY.md episodic table | FR-010, AUTO-INCREMENT compatibility |

**All NEEDS CLARIFICATION items resolved. Phase 1 may proceed.**
