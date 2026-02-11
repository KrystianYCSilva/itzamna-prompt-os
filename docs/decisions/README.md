# Architectural Decision Records (ADRs)

> Documenting key design decisions for Itzamna PromptOS.

---

## Active ADRs

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](./ADR-001-coala-memory.md) | CoALA-Inspired Memory Architecture | Accepted | 2026-02-11 |
| [ADR-002](./ADR-002-cognitive-kernel.md) | 3-Level Cognitive Kernel (K1/K2/K3) | Accepted | 2026-02-11 |
| [ADR-003](./ADR-003-token-economy.md) | Token Economy Strategy (95% Reduction) | Accepted | 2026-02-11 |

---

## ADR Template

Use this template for new ADRs:

```markdown
# ADR-XXX: Title

**Status:** Proposed | Accepted | Rejected | Superseded  
**Date:** YYYY-MM-DD  
**Authors:** Name(s)

---

## Context

What is the issue that we're seeing that is motivating this decision or change?

---

## Decision

What is the change that we're proposing and/or doing?

---

## Consequences

What becomes easier or more difficult to do because of this change?

### Positive

- Pro 1
- Pro 2

### Negative

- Con 1
- Con 2

---

## Alternatives Considered

### Alternative 1: Name

**Description:** Brief description

**Why rejected:** Reason

---

## References

- Link 1
- Link 2

---

**Last Updated:** YYYY-MM-DD
```

---

## How to Propose an ADR

1. Copy template above
2. Create new file: `ADR-XXX-title.md`
3. Fill in all sections
4. Submit PR with ADR
5. Discuss in PR comments
6. Merge when accepted

---

**ADRs Documentation** | v3.0.0 | 2026
