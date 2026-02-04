# Contract: Skill Relationship Map

**Feature**: 004-vector-db-rag | **Date**: 2026-02-03  
**Governs**: FR-007, SC-006 | **Consumed by**: `knowledge-base/relationship-map.md` (JIT sub-file)

---

## What this contract defines

How the agent discovers, records, and surfaces relationships between skills. Covers the four relationship types, the persistence format inside INDEX.md, the proposal-confirmation lifecycle, and the surfacing rules when a skill is loaded.

---

## Relationship types

| Type | Directional? | Meaning | Example |
|------|--------------|---------|---------|
| `prerequisite` | Yes (A → B) | A must be understood before B is useful | `java` is prerequisite of `java-21` |
| `version-extension` | Yes (A → B) | B is a version-specific sub-skill of A | `java` → `java-21` |
| `complementary` | No | Adjacent topics; neither depends on the other | `go` ↔ `python` |
| `domain-cluster` | No | Same broad domain; informational grouping | all language baselines |

**Note**: `prerequisite` and `version-extension` often co-occur on the same pair. Both links are stored. They carry different semantic meaning: `prerequisite` affects loading order recommendations; `version-extension` affects how the skills are presented in the INDEX.

---

## Discovery: when and how relationships are proposed

### On new skill creation (post-HUMAN-GATE approval)

After a new skill is persisted, the agent runs a lightweight scan:

1. Load INDEX.md.
2. For each existing skill, check:
   - Is the new skill a version-specific sub-folder of this skill? → propose `version-extension` (directional: existing → new).
   - Do they share ≥ 2 tags? → propose `domain-cluster`.
   - Is the new skill's category the same but the topic clearly adjacent? → propose `complementary`.
3. Surface proposals to the developer: "I found {N} potential relationships. Review and confirm."

### On redundancy gate "create complementary" choice

If the developer chose Option B in the redundancy gate, the `complementary` link is created automatically — no proposal step needed. Both skills get the link.

---

## Lifecycle: proposal → confirmation

| State | Who acts | What happens |
|-------|----------|--------------|
| `agent-proposed` | Agent | Link is written to INDEX.md with `addedBy: agent-proposed`. Surfaced to developer for review. |
| `human-confirmed` | Developer | Developer reviews and says "confirm" (or confirms a subset). `addedBy` field updated to `human-confirmed`. |
| Rejected | Developer | Link is removed from INDEX.md. No record kept (it was never confirmed). |

**T0-HUMAN compliance**: No relationship link becomes permanent without human confirmation. The agent writes `agent-proposed` links as drafts; they become effective only after confirmation.

---

## Persistence format

Stored as a YAML block inside each skill's entry in INDEX.md. Bidirectional links appear on both skills.

```yaml
# Inside INDEX.md, under the skill "go":
relationships:
  - target: python
    type: complementary
    addedBy: human-confirmed
    addedAt: "2026-02-03"
  - target: java
    type: domain-cluster
    addedBy: human-confirmed
    addedAt: "2026-02-03"
  - target: go-118
    type: version-extension   # go is the base; go-118 extends it
    addedBy: agent-proposed
    addedAt: "2026-02-03"
```

**Constraints**:
- No self-edges.
- No duplicate (same target + same type).
- Directional types (`prerequisite`, `version-extension`) stored only on the dependent/extended skill's entry, PLUS a reverse pointer on the base skill for surfacing.

---

## Surfacing: what the agent shows when a skill is loaded

When the agent loads a skill (via JIT-PROTOCOL), it checks that skill's `relationships` block and surfaces them grouped by type:

```
📚 Loaded: go (Goroutines, channels, interfaces, defer)

Related skills:
  🔗 Complementary: python, javascript  (same tier, different paradigm)
  📦 Domain cluster: java, kotlin, c-cpp  (all language baselines)
  📈 Extended by: go-118  (Go 1.18+ generics & fuzzing)

Want me to load any of these?
```

**Rules**:
- Show `version-extension` children (skills this one extends into) and parents (skill this one extends from).
- Show `complementary` links as peers.
- Show `domain-cluster` links as a flat list; do not load them automatically.
- Show `prerequisite` parents as "recommended before this skill".
- Maximum displayed: 5 links total. If more exist, show top 5 by recency and offer "show all".

---

## SC-006 measurement

After the relationship map is populated, verify: for each skill in the library, does the agent surface ≥ 1 related skill when it is loaded? Target: ≥ 90% of skills (i.e., at most 1 skill in a 13-skill library may have zero surfaced relationships).

---

*Contract: relationship-map | SPEC-004 | 2026-02-03*
