# INDEX: standards

> PromptOS standards for system architecture, code quality, and testing. These are inviolable (T0) and quality (T1) tier rules.

---

## 📋 CONTENTS

| File | Tier | Purpose | When to Use |
|------|------|---------|------------|
| [architectural-rules.md](architectural-rules.md) | T0 | Inviolable system rules and constraints | Before making architectural decisions |
| [code-quality.md](code-quality.md) | T1 | Quality standards, linting, testing, documentation | Code review, before committing |
| [testing-strategy.md](testing-strategy.md) | T1 | Testing approach, coverage, quality metrics | Planning test implementation |

---

## 🎯 READING ORDER

1. **Critical first**: [architectural-rules.md](architectural-rules.md) — T0 rules (MUST be followed)
2. **Then**: [code-quality.md](code-quality.md) — T1 quality standards
3. **For testing**: [testing-strategy.md](testing-strategy.md) — Test planning and execution

---

## ⚠️ TIER LEVELS

### T0 (Inviolable)
Rules in [architectural-rules.md](architectural-rules.md) are **non-negotiable**:
- T0-HUMAN-01: Never modify files without approval
- T0-MEMORY-01: Always update MEMORY.md
- T0-SIZE-01: Keep skills under 1400 tokens
- **Violation consequences**: Session termination, safety checks

### T1 (Quality Standards)
Rules in [code-quality.md](code-quality.md) and [testing-strategy.md](testing-strategy.md):
- Standard linting rules
- Code formatting conventions
- Testing coverage requirements
- **Violation consequences**: PR rejection, code review feedback

---

## 🚀 USE CASES

| Task | File |
|------|------|
| Check inviolable rules | architectural-rules.md |
| Code formatting | code-quality.md |
| Test coverage required | testing-strategy.md |
| Design decision vetting | architectural-rules.md |
| PR review checklist | code-quality.md, testing-strategy.md |

---

## 💡 KEY METRICS

**From architectural-rules.md (T0)**:
- Skill size: < 1400 tokens
- Kernel (core files): < 5 KB
- YAML syntax: Valid

**From code-quality.md (T1)**:
- Linting: 0 critical issues
- Documentation: Public API 100% documented
- Type safety: No untyped regions

**From testing-strategy.md (T1)**:
- Coverage: > 80%
- Test types: Unit, Integration, E2E
- Regression: No failing tests

---

## 🔗 QUICK NAVIGATION

- [Parent: Context](..\README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total files**: 3  
**Tiers**: T0 (1 file) + T1 (2 files)  
**Compliance**: Mandatory

