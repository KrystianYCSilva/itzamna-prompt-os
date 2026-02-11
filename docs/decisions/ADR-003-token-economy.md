# ADR-003: Token Economy Strategy (95% Reduction)

**Status:** Accepted  
**Date:** 2026-02-11  
**Authors:** Itzamna Team

---

## Context

Itzamna v2 suffered from **token bloat**:
- **200+ files** loaded upfront
- **~15,000 lines** of context
- **~12K+ tokens** initial load
- Slow agent startup (~10s)
- High API costs

Users complained:
- "Agent takes too long to start"
- "My API bills are too high"
- "Agent seems confused by too much context"

We needed a token reduction strategy that:
- Maintains functionality
- Reduces initial load dramatically
- Enables JIT (Just-In-Time) loading
- Preserves human readability

---

## Decision

Implement **aggressive token economy** via:

1. **Reduce core files**: 200+ → 14 files (95% reduction)
2. **JIT loading**: YAML frontmatter for lazy loading
3. **Lean default**: 3-file `.context/` by default
4. **Single entry point**: AGENTS.md as bootstrap
5. **Remove duplication**: Consolidate overlapping docs

### Target Metrics

| Metric | v2 | v3 | Target |
|--------|----|----|--------|
| **Files** | 200+ | 14 | < 20 |
| **Lines** | ~15,000 | 1,354 | < 2,000 |
| **Initial tokens** | ~12K+ | ~562 | < 1,000 |
| **Bootstrap time** | ~10s | ~2s | < 3s |

---

## Consequences

### Positive

- **95% token reduction**: 12K+ → 562 tokens
- **91% line reduction**: 15,000 → 1,354 lines
- **5x faster bootstrap**: 10s → 2s
- **Lower API costs**: ~90% reduction per session
- **Clearer mental model**: Agent knows what to load when
- **Better performance**: Less context confusion

### Negative

- **Manual JIT**: Requires YAML frontmatter maintenance
- **Discovery harder**: Agent must know what files exist (mitigated by AGENTS.md index)
- **More planning**: Need to think about what to load when
- **Frontmatter dependency**: Breaks if frontmatter missing (validated by `/itzamna.context check`)

---

## Implementation Strategies

### 1. Core File Reduction (200+ → 14)

**Removed:**
- Duplicate READMEs (10+ files)
- Per-CLI docs (17 × 5 = 85 files)
- Research archives (20+ files)
- Old plans/cards (30+ files)

**Kept:**
- kernel.md (3-level cognitive kernel)
- AGENTS.md (entry point)
- CONSTITUTION.md (T0/T1/T2 rules)
- MEMORY.md (episodic memory)
- 4 slash commands
- 2 core files (WORKFLOWS.md, QUALITY-GATES.md)
- Context templates (3 lean + 7 enterprise)

### 2. JIT Loading via YAML Frontmatter

**Before (v2): Eager loading**
```markdown
# Some Documentation

All content loaded upfront (even if not needed)
```

**After (v3): Lazy loading**
```yaml
---
description: |
  Brief description.
  Use when: specific trigger condition.
---

# Some Documentation

Only loaded when "Use when:" matches
```

**Example:**
```yaml
---
description: |
  Architectural patterns for the project.
  Use when: planning major refactoring or designing new features.
---

# Architecture Patterns

(Only loaded when agent detects "refactoring" or "design" task)
```

### 3. Lean Default Context (3 files)

**Before (v2): Enterprise-first (10+ files)**
```
.context/
  _meta/
  standards/
  patterns/
  knowledge/
  workflows/
```

**After (v3): Lean-first (3 files)**
```
.context/
  project.md      # Project overview
  tech.md         # Tech stack
  rules.md        # Project rules
```

**Rationale:**
- 80% of projects don't need enterprise structure
- Simpler onboarding
- Can upgrade to enterprise later (`/itzamna.context upgrade`)

### 4. Single Entry Point (AGENTS.md)

**Before (v2): Multiple entry points**
- README.md
- AGENTS.md
- kernel.md
- CONSTITUTION.md
- (Agent confused about where to start)

**After (v3): AGENTS.md only**
```yaml
---
description: |
  Entry point for AI agents. Read this first.
  Use when: starting a new session.
---

# AGENTS.md

1. Read kernel.md (K1/K2/K3)
2. Read MEMORY.md (last session)
3. JIT-load .context/ as needed
4. Follow WORKFLOWS.md for tasks
```

---

## Measurement & Validation

### Token Counting

**Method:** Use `tiktoken` library (OpenAI tokenizer)

```python
import tiktoken
enc = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode(content)
print(len(tokens))
```

### Before/After Comparison

| File | v2 Tokens | v3 Tokens | Reduction |
|------|-----------|-----------|-----------|
| Entry point | ~3,000 | ~200 | 93% |
| Kernel | ~2,000 | ~150 | 92% |
| Context | ~7,000 | ~212 (lean) | 97% |
| **Total** | **~12,000** | **~562** | **95%** |

---

## Trade-offs Accepted

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| **Manual frontmatter** | Maintenance burden | Validate with `/itzamna.context check` |
| **Discovery harder** | Agent might miss files | AGENTS.md indexes all files |
| **Less context** | Agent knows less upfront | K1/K2/K3 loads as needed |
| **Lean default** | Enterprise needs upgrade | `/itzamna.context upgrade` command |

---

## Alternatives Considered

### Alternative 1: Vector Database (RAG)

**Description:** Use ChromaDB/Pinecoe for semantic search.

**Why rejected:**
- External dependency
- Not portable
- Adds complexity
- Overkill for most projects

### Alternative 2: Compression

**Description:** Compress Markdown with gzip.

**Why rejected:**
- Not human-readable
- Agent can't read compressed files
- Doesn't solve root cause (too many files)

### Alternative 3: Minimal (< 5 files)

**Description:** Reduce to < 5 core files total.

**Why rejected:**
- Too aggressive
- Loses separation of concerns
- Hard to maintain
- Breaks multi-CLI compatibility

---

## Success Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Files | < 20 | 14 | ✅ |
| Lines | < 2,000 | 1,354 | ✅ |
| Initial tokens | < 1,000 | ~562 | ✅ |
| Bootstrap time | < 3s | ~2s | ✅ |

---

## References

- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
- [CoALA Paper - Context Management](https://arxiv.org/abs/2309.02427)
- [Anthropic - Context Window Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips)

---

**Last Updated:** 2026-02-11
