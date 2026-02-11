# ADR-002: 3-Level Cognitive Kernel (K1/K2/K3)

**Status:** Accepted  
**Date:** 2026-02-11  
**Authors:** Itzamna Team

---

## Context

AI coding agents need decision-making systems that balance:
1. **Speed**: Fast responses for common tasks
2. **Accuracy**: Deep reasoning for complex problems
3. **Context**: Awareness of project state and rules
4. **Transparency**: Explainable decision process

Existing approaches:
- **Single-level**: All decisions same depth (slow or shallow)
- **Reactive**: No structured reasoning (inconsistent)
- **Rule-based**: Rigid, can't adapt
- **Full reasoning**: Always slow (poor UX)

We needed a cognitive architecture that:
- Provides fast responses for common tasks
- Enables deep reasoning when needed
- Integrates with memory system
- Is transparent and debuggable

---

## Decision

Adopt a **3-level cognitive kernel** inspired by cognitive science dual-process theory:

| Level | Name | Speed | Use Case | Data Source |
|-------|------|-------|----------|-------------|
| **K1** | Reflexive | ~100ms | Fast decisions from memory | MEMORY.md |
| **K2** | Deliberate | ~1-2s | Structured reasoning with context | .context/ directory |
| **K3** | Deep | ~5-10s | Long-term planning with rules | CONSTITUTION.md |

Inspired by:
- **System 1 / System 2** (Kahneman, "Thinking, Fast and Slow")
- **OODA Loop** (Observe, Orient, Decide, Act)
- **CoALA Decision Cycle** (from CoALA paper)

---

## Consequences

### Positive

- **Performance**: Fast responses (K1) for 80% of tasks
- **Quality**: Deep reasoning (K3) when needed
- **Transparency**: Clear reasoning level visible to user
- **Adaptability**: Agent chooses appropriate level
- **Memory integration**: Each level uses different memory layer
- **Debuggable**: Can trace which level made decision

### Negative

- **Complexity**: Agent must choose correct level
- **Level confusion**: Risk of using wrong level
- **Not enforced**: Relies on agent understanding (mitigated by clear docs)
- **Manual tuning**: Speed estimates are heuristic

---

## Implementation

### K1 - Reflexive (~100ms)

**Purpose:** Fast decisions from episodic memory

**Data source:** MEMORY.md

**Use cases:**
- "Did I fix this bug before?"
- "What command did I use last time?"
- "What was the last decision I made?"

**Example:**
```
Agent sees: "How do I run tests?"
K1 checks MEMORY.md → "Last session used `npm test`"
K1 responds: "npm test"
```

### K2 - Deliberate (~1-2s)

**Purpose:** Structured reasoning with project context

**Data source:** .context/ directory (JIT loaded)

**Use cases:**
- "What's the architecture?"
- "What tech stack are we using?"
- "What are the project-specific rules?"

**Example:**
```
Agent sees: "Where should I put this new API endpoint?"
K2 loads .context/patterns/architecture.md
K2 reasons: "REST APIs go in src/api/"
K2 responds: "Create src/api/users.ts"
```

### K3 - Deep (~5-10s)

**Purpose:** Long-term planning with governance rules

**Data source:** CONSTITUTION.md

**Use cases:**
- "Should I refactor this legacy code?"
- "Can I skip tests for this prototype?"
- "Is it OK to hardcode this API key?"

**Example:**
```
Agent sees: "Can I hardcode this API key temporarily?"
K3 loads CONSTITUTION.md
K3 checks T0-SEC-01: "Never hardcode secrets"
K3 responds: "No, use .env instead (T0 rule)"
```

---

## Kernel Selection Logic

```
Task arrives
    |
    v
Is it in MEMORY.md (episodic)?
    YES → K1 (reflexive)
    NO → ↓
    v
Requires project context?
    YES → K2 (deliberate)
    NO → ↓
    v
Requires governance rules?
    YES → K3 (deep)
    NO → K2 (default)
```

---

## Alternatives Considered

### Alternative 1: Single-Level (Always Deep)

**Description:** Always use full reasoning for all tasks.

**Why rejected:**
- Too slow for simple tasks
- Poor user experience
- Wasteful token usage

### Alternative 2: Reactive (No Structure)

**Description:** Let agent decide ad-hoc how to reason.

**Why rejected:**
- Inconsistent behavior
- Not debuggable
- No performance guarantees

### Alternative 3: 5+ Levels

**Description:** More granular levels (K1-K5).

**Why rejected:**
- Complexity without benefit
- Harder for agent to choose
- Diminishing returns

---

## Integration with Memory

| Kernel Level | Memory Layer | Access Pattern |
|-------------|--------------|----------------|
| K1 | Episodic Memory (MEMORY.md) | Direct read |
| K2 | Project Context (.context/) | JIT load via frontmatter |
| K3 | Semantic Memory (CONSTITUTION.md) | Full load + reasoning |

---

## Performance Metrics

| Metric | K1 | K2 | K3 |
|--------|----|----|-----|
| **Average time** | ~100ms | ~1-2s | ~5-10s |
| **Token usage** | ~500 | ~2000 | ~5000 |
| **Use frequency** | 60% | 30% | 10% |

---

## References

- [Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow) - Kahneman
- [OODA Loop](https://en.wikipedia.org/wiki/OODA_loop) - Boyd
- [CoALA: Cognitive Architectures for Language Agents](https://arxiv.org/abs/2309.02427)

---

**Last Updated:** 2026-02-11
