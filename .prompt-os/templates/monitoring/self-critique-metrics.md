---
name: templates-monitoring-self-critique-metrics
description: "Self-Critique Metrics Report Template"
---

# Self-Critique Metrics Report Template

**Period:** YYYY-MM-DD to YYYY-MM-DD  
**Generated:** YYYY-MM-DD  
**Report Type:** Quality Metrics Analysis (SPEC-001 - SELF-CRITIQUE)

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Artifacts Evaluated | [NUMBER] |
| Average Overall Score | [SCORE] / 100 |
| Artifacts ≥80 (Production Ready) | [NUMBER] ([%]) |
| Artifacts <60 (Below Threshold) | [NUMBER] ([%]) |
| Constitution Violations | [NUMBER] |
| Most Common Weakness | [DIMENSION] (avg: [SCORE]) |

---

## Data Sources

**Methods for Data Collection:**

1. **From Human Gate Logs:**
   - Track scores displayed in Human Gate previews
   - Extract from commit messages (if scores included)

2. **From MEMORY.md:**
   - Review "Memoria Episodica Recente" for quality notes
   - Check for mentions of "score" or "Self-Critique"

3. **Manual Tracking:**
   - Maintain spreadsheet during development sessions
   - Log scores in dedicated tracking file

**Agent Memory Files Reviewed:**
- [ ] Session logs from all active agents
- [ ] Commit history (search for "Self-Critique" mentions)
- [ ] MEMORY.md session notes

---

## Overall Score Distribution

### Score Bands

| Score Band | Count | Percentage | Status | Action |
|------------|-------|------------|--------|--------|
| 90-100 🟢 | [N] | [%] | Excellent | None - continue current approach |
| 80-89 🟢 | [N] | [%] | Production Ready | Minor polishing acceptable |
| 70-79 🔵 | [N] | [%] | Acceptable | Consider improvements |
| 60-69 🟡 | [N] | [%] | Needs Improvement | Revise before approval |
| 0-59 🔴 | [N] | [%] | Unacceptable | Major rework required |

**Visual Distribution:**
```
90-100: ████████████████████ 20
80-89:  ███████████████ 15
70-79:  ██████████ 10
60-69:  ████ 4
0-59:   ██ 2
```

---

## Four-Dimension Analysis

### Dimension Scores

| Dimension | Avg Score | Min | Max | Std Dev | Trend |
|-----------|-----------|-----|-----|---------|-------|
| **Completude** | [SCORE]/25 | [N] | [N] | [N] | [↑/↓/→] |
| **Clareza** | [SCORE]/25 | [N] | [N] | [N] | [↑/↓/→] |
| **Correção** | [SCORE]/25 | [N] | [N] | [N] | [↑/↓/→] |
| **Best Practices** | [SCORE]/25 | [N] | [N] | [N] | [↑/↓/→] |

### Dimension Performance (Normalized to 100)

| Dimension | Normalized Score | Grade | Status |
|-----------|------------------|-------|--------|
| Completude | [N]/100 | [A/B/C/D/F] | [🟢/🔵/🟡/🔴] |
| Clareza | [N]/100 | [A/B/C/D/F] | [🟢/🔵/🟡/🔴] |
| Correção | [N]/100 | [A/B/C/D/F] | [🟢/🔵/🟡/🔴] |
| Best Practices | [N]/100 | [A/B/C/D/F] | [🟢/🔵/🟡/🔴] |

**Grade Scale:**
- A (90-100): Excellent
- B (80-89): Good
- C (70-79): Acceptable
- D (60-69): Needs work
- F (0-59): Failing

---

## Detailed Criterion Breakdown

### Completude (Max: 25 pts)

| Criterion | Avg Score | /5 | Issues |
|-----------|-----------|-----|--------|
| Todas seções obrigatórias presentes | [N] | /5 | [N artifacts missing sections] |
| Exemplos práticos incluídos | [N] | /5 | [N artifacts lacking examples] |
| Casos de uso cobertos | [N] | /5 | [N artifacts with insufficient use cases] |
| Limitações documentadas | [N] | /5 | [N artifacts missing limitations] |
| Fontes citadas | [N] | /5 | [N artifacts missing citations] |

### Clareza (Max: 25 pts)

| Criterion | Avg Score | /5 | Issues |
|-----------|-----------|-----|--------|
| Linguagem clara e objetiva | [N] | /5 | [N artifacts with clarity issues] |
| Estrutura lógica | [N] | /5 | [N artifacts with structure issues] |
| Terminologia consistente | [N] | /5 | [N artifacts with inconsistencies] |
| Explicações suficientes | [N] | /5 | [N artifacts needing more detail] |
| Formatação Markdown correta | [N] | /5 | [N artifacts with formatting errors] |

### Correção (Max: 25 pts)

| Criterion | Avg Score | /5 | Issues |
|-----------|-----------|-----|--------|
| Informações técnicas corretas | [N] | /5 | [N artifacts with technical errors] |
| Exemplos funcionais | [N] | /5 | [N artifacts with broken examples] |
| Sintaxe válida | [N] | /5 | [N artifacts with syntax errors] |
| Versionamento claro | [N] | /5 | [N artifacts with version issues] |
| Ausência de informações desatualizadas | [N] | /5 | [N artifacts with outdated info] |

### Best Practices (Max: 25 pts)

| Criterion | Avg Score | /5 | Issues |
|-----------|-----------|-----|--------|
| Segue padrões da indústria | [N] | /5 | [N artifacts not following standards] |
| Código idiomático | [N] | /5 | [N artifacts with non-idiomatic code] |
| Warnings de segurança incluídos | [N] | /5 | [N artifacts missing security warnings] |
| Performance considerations | [N] | /5 | [N artifacts missing performance notes] |
| Trade-offs documentados | [N] | /5 | [N artifacts missing trade-off analysis] |

---

## Score Distribution by Artifact Type

| Artifact Type | Count | Avg Score | Score Range | Status |
|---------------|-------|-----------|-------------|--------|
| skill (L1) | [N] | [SCORE] | [MIN]-[MAX] | [🟢/🔵/🟡/🔴] |
| skill (L2) | [N] | [SCORE] | [MIN]-[MAX] | [🟢/🔵/🟡/🔴] |
| skill (L3) | [N] | [SCORE] | [MIN]-[MAX] | [🟢/🔵/🟡/🔴] |
| persona | [N] | [SCORE] | [MIN]-[MAX] | [🟢/🔵/🟡/🔴] |
| documentation | [N] | [SCORE] | [MIN]-[MAX] | [🟢/🔵/🟡/🔴] |
| code | [N] | [SCORE] | [MIN]-[MAX] | [🟢/🔵/🟡/🔴] |

**Insight:** [Which artifact types score highest/lowest and why]

---

## Score Distribution by Category

| Category | Artifacts | Avg Score | Best Dimension | Worst Dimension |
|----------|-----------|-----------|----------------|-----------------|
| frontend | [N] | [SCORE] | [dimension] ([N]) | [dimension] ([N]) |
| backend | [N] | [SCORE] | [dimension] ([N]) | [dimension] ([N]) |
| devops | [N] | [SCORE] | [dimension] ([N]) | [dimension] ([N]) |
| ... | ... | ... | ... | ... |

---

## Constitution Violations

| Date | Artifact | Rule Violated | Severity | Resolution |
|------|----------|---------------|----------|------------|
| YYYY-MM-DD | [name] | [T0-XXX] | BLOCKER | [How resolved] |
| YYYY-MM-DD | [name] | [T1-XXX] | WARNING | [How resolved] |

**Total Violations:** [NUMBER]
**Blocker Rate:** [PERCENTAGE]%

**Alert:** 🔴 Any T0 violation is a BLOCKER - artifact MUST NOT be approved until fixed.

---

## Trends Over Time

### Weekly Average Scores

| Week | Artifacts | Avg Overall | Completude | Clareza | Correção | Best Practices |
|------|-----------|-------------|------------|---------|----------|----------------|
| Week 1 | [N] | [SCORE] | [SCORE] | [SCORE] | [SCORE] | [SCORE] |
| Week 2 | [N] | [SCORE] | [SCORE] | [SCORE] | [SCORE] | [SCORE] |
| Week 3 | [N] | [SCORE] | [SCORE] | [SCORE] | [SCORE] | [SCORE] |
| Week 4 | [N] | [SCORE] | [SCORE] | [SCORE] | [SCORE] | [SCORE] |

**Trend Analysis:**
- 📈 Improving: [Which dimensions are trending up]
- 📉 Declining: [Which dimensions are trending down]
- ➡️ Stable: [Which dimensions are stable]

### Score Volatility

**Standard Deviation by Dimension:**
- Completude: [N] ([HIGH/MEDIUM/LOW] volatility)
- Clareza: [N] ([HIGH/MEDIUM/LOW] volatility)
- Correção: [N] ([HIGH/MEDIUM/LOW] volatility)
- Best Practices: [N] ([HIGH/MEDIUM/LOW] volatility)

**Interpretation:**
- Low volatility (σ <5): Consistent quality
- Medium volatility (σ 5-10): Some variability
- High volatility (σ >10): Inconsistent quality - needs attention

---

## Low-Performing Artifacts (Score <70)

| Artifact | Score | Weakest Dimension | Issues | Status |
|----------|-------|-------------------|--------|--------|
| [name] | [N] | [dimension] ([N]/25) | [List issues] | [Revised/Rejected/Pending] |
| [name] | [N] | [dimension] ([N]/25) | [List issues] | [Revised/Rejected/Pending] |

**Action Items:**
- [ ] Review and revise all artifacts scoring <70
- [ ] Identify root causes for low scores
- [ ] Update generation prompts to address common issues

---

## High-Performing Artifacts (Score ≥90)

| Artifact | Score | Best Feature | Lessons Learned |
|----------|-------|--------------|-----------------|
| [name] | [N] | [What made it excellent] | [What to replicate] |
| [name] | [N] | [What made it excellent] | [What to replicate] |

**Success Patterns:**
- [Pattern 1: e.g., "All high-scoring skills include 5+ tested examples"]
- [Pattern 2: e.g., "Clear use case descriptions in introduction"]
- [Pattern 3: e.g., "Comprehensive limitations section"]

---

## Recommendations

### Immediate Actions

**If Average Overall Score <70:**
1. 🔴 **CRITICAL:** Review Self-Critique implementation
2. Add more stringent pre-checks before Human Gate
3. Create quality checklist for common failure points

**If Any Dimension <60 Average:**
1. 🔴 Focus improvement efforts on weakest dimension
2. Add dimension-specific guidelines to generation prompts
3. Review dimension rubric for clarity

**If Constitution Violations >0:**
1. 🔴 **BLOCKER:** Investigate why violations reached Human Gate
2. Add T0 validation before Self-Critique
3. Update CONSTITUTION.md if rules unclear

### Process Improvements

**For Low Completude:**
- [ ] Add section checklist to skill template
- [ ] Require minimum example count (3 for L2, 5 for L3)
- [ ] Mandate sources/references section

**For Low Clareza:**
- [ ] Run readability check (Flesch-Kincaid Grade Level)
- [ ] Limit paragraph length (max 5 sentences)
- [ ] Add clarity review step to workflow

**For Low Correção:**
- [ ] Test all code examples before submission
- [ ] Add syntax validation for code blocks
- [ ] Cross-reference with official documentation

**For Low Best Practices:**
- [ ] Include industry standards checklist
- [ ] Add security/performance warnings template
- [ ] Require trade-off analysis for L2/L3

---

## Success Metrics Tracking

| Metric | Current | Target | Status | Deadline |
|--------|---------|--------|--------|----------|
| Average Overall Score | [N] | ≥80 | [🔴/🟡/🟢] | [DATE] |
| Artifacts ≥80 | [%] | ≥90% | [🔴/🟡/🟢] | [DATE] |
| Artifacts <60 | [%] | <5% | [🔴/🟡/🟢] | [DATE] |
| Weakest Dimension | [N] | ≥70 | [🔴/🟡/🟢] | [DATE] |
| Constitution Violations | [N] | 0 | [🔴/🟡/🟢] | [DATE] |

---

## Appendix A: Scoring Rubric Reference

**From SELF-CRITIQUE.md:**

Each dimension scored 0-25 (5 criteria × 5 points each):

- **5 points:** Exceeds expectations
- **4 points:** Meets all requirements
- **3 points:** Acceptable with minor issues
- **2 points:** Significant issues
- **1 point:** Major problems
- **0 points:** Missing or critically flawed

---

## Appendix B: Data Collection Template

```markdown
## Self-Critique Tracking (Manual Log)

| Date | Artifact | Type | Overall | Comp | Clar | Corr | BP | Notes |
|------|----------|------|---------|------|------|------|----|-------|
| 2026-02-03 | kafka-basics | skill | 85 | 22 | 21 | 21 | 21 | Good examples |
| 2026-02-02 | redis-cache | skill | 68 | 18 | 17 | 16 | 17 | Needs revision |
```

**Abbreviations:**
- Comp = Completude
- Clar = Clareza
- Corr = Correção
- BP = Best Practices

---

## Appendix C: Example Self-Critique Output

```yaml
overall_score: 85
dimensions:
  completude:
    score: 22
    criteria_scores: [5, 5, 4, 4, 4]
  clareza:
    score: 21
    criteria_scores: [5, 4, 4, 4, 4]
  correcao:
    score: 21
    criteria_scores: [5, 4, 4, 4, 4]
  best_practices:
    score: 21
    criteria_scores: [5, 5, 4, 4, 3]
constitution_check: PASS
suggestions:
  - "Adicionar mais detalhes sobre performance considerations"
  - "Incluir warning sobre compatibilidade de versões"
```

---

**Report Version:** 1.0  
**Template Last Updated:** 2026-02-03  
**Related Protocols:** `.prompt-os/core/SELF-CRITIQUE.md`, `.prompt-os/core/HUMAN-GATE.md`
