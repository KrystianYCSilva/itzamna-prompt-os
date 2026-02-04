---
name: templates-monitoring-rejection-analysis-report
description: "Rejection Analysis Report Template"
---

# Rejection Analysis Report Template

**Period:** YYYY-MM-DD to YYYY-MM-DD  
**Generated:** YYYY-MM-DD  
**Report Type:** Rejection Learning Analysis (SPEC-002 - AUTO-INCREMENT)

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Rejections | [NUMBER] |
| Unique Items Rejected | [NUMBER] |
| Rejection Rate | [PERCENTAGE]% (rejections / total artifacts) |
| Pattern Threshold Met (>30%) | [YES/NO] |
| Most Common Category | [CATEGORY] ([PERCENTAGE]%) |

---

## Data Sources

**Agent Memory Files Analyzed:**
- [ ] `memory/opencode-memory.md`
- [ ] `memory/itzamna-memory.md`
- [ ] `memory/speckit-memory.md`
- [ ] `memory/[other-agent]-memory.md`

**Data Collection Method:**
1. Read `## Log de Rejeicoes` section from each agent memory file
2. Aggregate counts across all agents
3. Calculate category percentages
4. Identify patterns (categories >30%)
5. Extract learned actions

---

## Rejection Category Breakdown

| Category | Count | Percentage | Pattern? | Recommended Actions |
|----------|-------|------------|----------|---------------------|
| **Exemplos** | [N] | [%] | [✅/❌] | Validar exemplos, testar comandos antes de gerar |
| **Especificidade** | [N] | [%] | [✅/❌] | Adicionar mais detalhes, incluir casos reais |
| **Clareza** | [N] | [%] | [✅/❌] | Simplificar linguagem, evitar jargão |
| **Completude** | [N] | [%] | [✅/❌] | Verificar todas seções obrigatórias |
| **Relevancia** | [N] | [%] | [✅/❌] | Melhorar classificação de input, confirmar escopo |
| **Outros** | [N] | [%] | [✅/❌] | Revisar caso a caso |
| **TOTAL** | [N] | 100% | — | — |

**Pattern Detection Threshold:** >30% in any single category

✅ = Pattern detected (>30%)  
❌ = No pattern (<30%)

---

## Pattern Analysis

### Detected Patterns (>30%)

**Pattern 1: [Category Name] - [PERCENTAGE]%**

- **Occurrences:** [N] rejections
- **Impact:** [HIGH/MEDIUM/LOW]
- **Root Cause:** [Brief analysis of why this pattern exists]
- **Recommended Action:** [Specific action to address pattern]
- **Success Metric:** Reduce to <20% within [timeframe]

**Example Rejection:**
```
Date: YYYY-MM-DD
Artifact: [skill-name]
Reason: "[User's feedback]"
Learned Action: "[What was learned]"
```

### No Patterns Detected

[If no categories exceed 30%, note this and explain that rejections are well-distributed across categories]

---

## Top 10 Most Rejected Artifacts

| Rank | Artifact Type | Name | Rejection Count | Main Category | Last Rejection |
|------|---------------|------|-----------------|---------------|----------------|
| 1 | skill | [name] | [N] | [category] | YYYY-MM-DD |
| 2 | persona | [name] | [N] | [category] | YYYY-MM-DD |
| 3 | skill | [name] | [N] | [category] | YYYY-MM-DD |
| ... | ... | ... | ... | ... | ... |

**Note:** Artifacts rejected 2+ times indicate potential quality issues or misalignment with user expectations.

---

## Rejection Distribution by Agent

| Agent | Total Rejections | Most Common Category | Pattern Detected |
|-------|------------------|----------------------|------------------|
| opencode | [N] | [category] ([%]) | [YES/NO] |
| itzamna | [N] | [category] ([%]) | [YES/NO] |
| speckit | [N] | [category] ([%]) | [YES/NO] |

---

## Rejection Distribution by Artifact Type

| Artifact Type | Rejections | Percentage | Most Common Category |
|---------------|------------|------------|----------------------|
| skill | [N] | [%] | [category] |
| persona | [N] | [%] | [category] |
| documentation | [N] | [%] | [category] |
| code | [N] | [%] | [category] |

---

## Learned Actions Summary

**Top 5 Most Frequent Learned Actions:**

1. **"[Learned action text]"** - Applied [N] times
   - Category: [category]
   - Effectiveness: [HIGH/MEDIUM/LOW based on re-rejection rate]

2. **"[Learned action text]"** - Applied [N] times
   - Category: [category]
   - Effectiveness: [HIGH/MEDIUM/LOW]

3-5. [Continue list]

---

## Trends Over Time

### Rejection Rate Trend

| Week | Total Artifacts | Rejections | Rejection Rate | Top Category |
|------|-----------------|------------|----------------|--------------|
| Week 1 | [N] | [N] | [%] | [category] |
| Week 2 | [N] | [N] | [%] | [category] |
| Week 3 | [N] | [N] | [%] | [category] |
| Week 4 | [N] | [N] | [%] | [category] |

**Trend Interpretation:**
- 📈 Increasing rejection rate: [Analysis]
- 📉 Decreasing rejection rate: [Analysis]
- ➡️ Stable rejection rate: [Analysis]

### Category Shift Analysis

[Track if dominant rejection categories are changing over time]

---

## Cross-Category Correlations

**Artifacts Rejected for Multiple Reasons:**

| Artifact | Rejection Count | Categories | Insight |
|----------|-----------------|------------|---------|
| [name] | [N] | [cat1, cat2, cat3] | Multiple quality issues - needs comprehensive review |
| [name] | [N] | [cat1, cat2] | [Insight] |

---

## Recommendations

### Immediate Actions (Critical Patterns)

**If ANY category >40%:**
1. **CRITICAL:** Implement systematic checks for [category]
2. Add [category]-specific checklist to SELF-CRITIQUE.md
3. Create training examples for [category]

**If rejection rate >20%:**
1. Review Self-Critique scoring (may be too lenient)
2. Add pre-generation validation for common issues
3. Update HUMAN-GATE.md display to highlight [category] criteria

### Process Improvements

**For "Exemplos" pattern:**
- [ ] Add "Example Validation" step to generation workflow
- [ ] Require all code examples to be tested before submission
- [ ] Include environment/version info with examples

**For "Especificidade" pattern:**
- [ ] Add "Specificity Score" to Self-Critique (detail level 1-5)
- [ ] Require minimum 3 concrete examples per section
- [ ] Include real-world use cases

**For "Clareza" pattern:**
- [ ] Run readability check (target: Grade 8-10)
- [ ] Limit technical jargon, provide definitions
- [ ] Add "Clarity" dimension to Self-Critique

**For "Completude" pattern:**
- [ ] Add section checklist to generation template
- [ ] Auto-validate YAML frontmatter completeness
- [ ] Require all L2/L3 skills to have 5+ sections

**For "Relevancia" pattern:**
- [ ] Improve INPUT-CLASSIFIER.md accuracy
- [ ] Add relevance confirmation before generation
- [ ] Cross-check against existing skills to avoid duplication

---

## Success Metrics

**Target Improvements (Next Period):**

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Overall Rejection Rate | [%] | <15% | [🔴/🟡/🟢] |
| Largest Category % | [%] | <25% | [🔴/🟡/🟢] |
| Artifacts w/ 2+ Rejections | [N] | 0 | [🔴/🟡/🟢] |
| Pattern Detection | [YES/NO] | NO | [🔴/🟡/🟢] |

---

## Appendix A: Category Definitions

**From AUTO-INCREMENT.md:**

| Category | Keywords | What to Learn |
|----------|----------|---------------|
| **Exemplos** | "exemplo errado", "não funciona" | Validar exemplos melhor |
| **Especificidade** | "genérico", "vago", "superficial" | Adicionar mais detalhes |
| **Clareza** | "confuso", "não entendi" | Simplificar linguagem |
| **Completude** | "falta", "incompleto" | Verificar todas seções |
| **Relevancia** | "não aplica", "fora do escopo" | Melhorar classificação |
| **Outros** | (nenhum match acima) | Revisar manualmente |

---

## Appendix B: Data Extraction Commands

```bash
# Count rejections per category
grep "| exemplos |" memory/*/memory.md | wc -l
grep "| especificidade |" memory/*-memory.md | wc -l

# Find most rejected artifacts
grep "^| [0-9]" memory/*-memory.md | awk -F'|' '{print $4}' | sort | uniq -c | sort -rn

# Calculate category percentages
total=$(grep -c "^| [0-9]" memory/*-memory.md)
exemplos=$(grep -c "| exemplos |" memory/*-memory.md)
echo "scale=2; $exemplos * 100 / $total" | bc
```

---

## Appendix C: Example Rejection Entry

```markdown
## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-02 | skill | redis-cache | "Exemplos incorretos" | exemplos | Testar comandos |
| 2026-02-01 | skill | graphql-api | "Muito genérico" | especificidade | Adicionar casos reais |
```

---

**Report Version:** 1.0  
**Template Last Updated:** 2026-02-03  
**Related Protocols:** `.prompt-os/core/AUTO-INCREMENT.md` (US2 - Rejection Learning)
