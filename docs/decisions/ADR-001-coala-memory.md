# ADR-001: CoALA-Inspired Memory Architecture

**Status:** Accepted  
**Date:** 2026-02-11  
**Authors:** Itzamna Team

---

## Context

AI coding agents need memory to:
1. Remember past sessions and decisions
2. Access project context efficiently
3. Maintain working memory for current tasks
4. Store general knowledge and patterns

Existing approaches:
- **Stateless**: No memory, every session starts fresh
- **Full context**: Load entire codebase (token expensive)
- **RAG**: External vector database (complex setup)
- **Simple memory**: Single MEMORY.md file (unstructured)

We needed a memory architecture that:
- Works with any AI CLI (no external dependencies)
- Reduces token usage (cost + speed)
- Supports episodic and semantic memory
- Enables JIT (Just-In-Time) loading

---

## Decision

Adopt a **CoALA-inspired 4-layer memory architecture**:

| Layer | Type | Storage | Purpose |
|-------|------|---------|---------|
| **Working Memory** | Volatile | Agent's context window | Current task state |
| **Project Context** | JIT-loaded | `.context/` directory | Project structure, tech, rules |
| **Episodic Memory** | Persistent | `MEMORY.md` | Past sessions, decisions, learnings |
| **Semantic Memory** | Static | Templates + knowledge | General knowledge, patterns |

Inspired by [CoALA: Cognitive Architectures for Language Agents](https://arxiv.org/abs/2309.02427)

---

## Consequences

### Positive

- **Token efficient**: JIT loading reduces initial load from ~12K+ (v2) to ~562 tokens (v3) — **95% reduction**
- **Structured memory**: Clear separation between episodic (MEMORY.md) and semantic (templates)
- **No external dependencies**: Everything in Markdown, no vector DB needed
- **Multi-CLI compatible**: Works with any AI CLI that reads Markdown
- **Lazy loading**: Only load what's needed when needed (via YAML frontmatter)
- **Proven architecture**: Based on cognitive science research (CoALA)

### Negative

- **Manual structure**: User must maintain MEMORY.md and .context/
- **No automatic pruning**: Old memories accumulate (mitigated by structured format)
- **No semantic search**: Can't vector-search memories (trade-off for simplicity)
- **Frontmatter dependency**: Requires YAML frontmatter for JIT loading

---

## Alternatives Considered

### Alternative 1: RAG (Retrieval-Augmented Generation)

**Description:** Use vector database (ChromaDB, Pinecone) for semantic search.

**Why rejected:**
- External dependency (complex setup)
- Not portable across AI CLIs
- Overkill for most projects
- Requires embedding model

### Alternative 2: Single MEMORY.md

**Description:** Single flat file with all memory.

**Why rejected:**
- No separation of concerns (episodic vs semantic)
- No JIT loading (all or nothing)
- Grows unbounded
- Hard to navigate

### Alternative 3: SQLite Database

**Description:** Store memory in SQLite database.

**Why rejected:**
- Not human-readable
- Not version-controllable
- Requires parsing code
- Not portable

---

## Implementation Details

### MEMORY.md Structure

```yaml
---
description: |
  Episodic memory for AI agents (CoALA layer).
  Use when: storing learnings, retrieving past decisions.
---

# Memory - [Project Name]

## Recent Sessions

### 2026-02-11 - Session Title
**Context:** What was I working on?
**Actions:** What did I do?
**Learnings:** What did I learn?
**Next:** What should I do next?

## Key Learnings

- Learning 1
- Learning 2
```

### .context/ Structure (Lean)

```
.context/
  project.md      # Project overview
  tech.md         # Tech stack
  rules.md        # Project-specific rules
```

### JIT Loading via Frontmatter

```yaml
---
description: |
  Brief description.
  Use when: specific trigger condition.
---
```

Agent loads file ONLY when `Use when:` condition matches.

---

## References

- [CoALA: Cognitive Architectures for Language Agents](https://arxiv.org/abs/2309.02427)
- [Memory Systems in Cognitive Science](https://plato.stanford.edu/entries/memory/)
- [Agent Skills Specification](https://agentskills.io)

---

**Last Updated:** 2026-02-11
