# Session Memory Template

**Spec**: {SPEC-ID} ({Spec Name})  
**Agent**: {Agent Name}  
**Started**: {YYYY-MM-DD}  
**Status**: 🔵 IN PROGRESS | ✅ COMPLETE  
**Purpose**: Track Self-Critique scores, gaps, rejections, and enhancement metrics during execution

---

## Self-Critique Tracking

**Target**: Avg overall score ≥{Target Score} (rationale)

| Data | Artifact | Type | Overall | Comp | Clar | Corr | BP | Notes |
|------|----------|------|---------|------|------|------|----|-------|
| {Date} | {File Name} | {Type} | {Score} | {S} | {S} | {S} | {S} | {Notes} |

**Calculation Space:**
```
Total scores: 0
Count: 0
Average: N/A

Target: ≥{Target Score}
```

---

## Gaps Detectados

**Categories**: `source`, `tool`, `integration`, `documentation`, `feature`

| Data | Request | Component Suggested | Type | Status |
|------|---------|---------------------|------|--------|
| {Date} | {User Request} | {Suggestion} | {Category} | pending |

---

## Log de Rejeições

**Categories**: `exemplos`, `especificidade`, `clareza`, `completude`, `relevancia`, `integracao`, `outros`

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| {Date} | {Type} | {Item} | {Reason} | {Category} | {Learning} |

---

## Enhancement Metrics

### Protocol Size

| Metric | Before (Current) | After (Enhanced) | Delta |
|--------|------------------|------------------|-------|
| Lines | {Value} | TBD | TBD |
| Sections | {Value} | TBD | TBD |
| Examples | {Value} | TBD | TBD |
| Token estimate | ~{Value} | TBD | TBD |
| JIT sub-files | {Value} | TBD | TBD |

---

### Feature Coverage

| Feature | Before | After | Status |
|---------|--------|-------|--------|
| {Feature 1} | ❌ Missing | TBD | Pending |
| {Feature 2} | ⚠️ Partial | TBD | Pending |

---

### Validation Test Results

| Skill | Sources Before | Validation Result | Issues Found | Actions Taken |
|-------|----------------|-------------------|--------------|---------------|
| {Skill Name} | {Value} | {Pass/Fail} | {Issues} | {Action} |

---

## Notas de Sessão

### Session {X} ({Date}) - {Phase Name} ✅ COMPLETE

**Phase {X}: {Name}**

- ✅ **{Action}** - {Details}
- ✅ **{Action}** - {Details}

**Context**:
- {Context item}

**Identified problems**:
1. {Problem 1}
2. {Problem 2}

**Objectives**:
- {Objective 1}
- {Objective 2}

**Time estimate**: {Estimate}

**Next**: {Next Phase}

---

### Key Decisions

**Decision {X}: {Title}**
- **Rationale**: {Why}
- **Action**: {What}
- **Risk mitigation**: {How to avoid risk}

---

## Pattern Analysis (Post-Execution)

_Patterns will be analyzed after completion to identify learnings for future specs_

---

## Session Statistics

**Phase {X} Completion**:
- Files created: {Count}
- Time spent: {Time}
- Commits: {Count}

---
