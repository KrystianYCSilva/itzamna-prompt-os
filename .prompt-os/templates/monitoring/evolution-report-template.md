# Evolution Report Template

**Period:** YYYY-MM-DD to YYYY-MM-DD  
**Generated:** YYYY-MM-DD  
**Report Type:** System Evolution Analysis (SPEC-002 - AUTO-INCREMENT US4)

---

## Executive Summary

**System Health Score:** [SCORE]/100

| Category | Status | Summary |
|----------|--------|---------|
| Gap Resolution | [🟢/🟡/🔴] | [N] gaps detected, [N] resolved ([%] rate) |
| Rejection Learning | [🟢/🟡/🔴] | [N] rejections, [YES/NO] patterns detected |
| Proactive Suggestions | [🟢/🟡/🔴] | [N] suggestions made, [N] accepted |
| System Growth | [🟢/🟡/🔴] | [N] skills added, [N] categories expanded |

**Key Insight:** [1-2 sentence summary of most important finding]

---

## Data Sources

### Agent Memory Files Aggregated

**Analyzed:**
- [ ] `memory/opencode-memory.md` ([N] gaps, [N] rejections)
- [ ] `memory/itzamna-memory.md` ([N] gaps, [N] rejections)
- [ ] `memory/speckit-memory.md` ([N] gaps, [N] rejections)
- [ ] `memory/[other]-memory.md` ([N] gaps, [N] rejections)

**Aggregation Method:**
1. Read ALL `memory/*-memory.md` files (exclude root `MEMORY.md`)
2. Merge `## Gaps Detectados` tables across agents
3. Merge `## Log de Rejeicoes` tables across agents
4. Cross-reference gaps/rejections by skill name
5. Calculate system-wide statistics

---

## Section 1: Gap Detection Analysis

### Overall Gap Statistics

| Metric | Value | Change from Last Period |
|--------|-------|-------------------------|
| Total Gaps Detected | [N] | [+/-N] ([+/-%]) |
| Unique Skills Requested | [N] | [+/-N] |
| Cross-Agent Gaps (2+ agents) | [N] | [+/-N] |
| Gaps Resolved | [N] | [+/-N] |
| Resolution Rate | [%] | [+/-%] |

### Top 5 Most Requested Skills (Cross-Agent)

| Rank | Skill Name | Total Count | Agents | Priority | Status |
|------|------------|-------------|--------|----------|--------|
| 1 | [skill] | [N] | [agent1, agent2, agent3] | HIGH | [pending/created] |
| 2 | [skill] | [N] | [agent1, agent2] | HIGH | [pending/created] |
| 3 | [skill] | [N] | [agent1, agent2] | MEDIUM | [pending/created] |
| 4 | [skill] | [N] | [agent1] | LOW | [pending/created] |
| 5 | [skill] | [N] | [agent1] | LOW | [pending/created] |

**Cross-Agent Insight:**
- Skills requested by 3+ agents: [N] → **CRITICAL priority**
- Skills requested by 2 agents: [N] → **HIGH priority**
- Skills unique to 1 agent: [N] → **LOW priority**

### Gap Distribution by Category (Inferred)

| Category | Gap Count | Percentage | Top Requested |
|----------|-----------|------------|---------------|
| devops | [N] | [%] | [skill-name] |
| backend | [N] | [%] | [skill-name] |
| frontend | [N] | [%] | [skill-name] |
| database | [N] | [%] | [skill-name] |
| ... | ... | ... | ... |

**Category Gaps:** [Analysis of which categories have most gaps - indicates growth areas]

---

## Section 2: Rejection Learning Analysis

### Overall Rejection Statistics

| Metric | Value | Change from Last Period |
|--------|-------|-------------------------|
| Total Rejections | [N] | [+/-N] ([+/-%]) |
| Unique Artifacts Rejected | [N] | [+/-N] |
| Rejection Rate | [%] | [+/-%] |
| Patterns Detected (>30%) | [YES/NO] | — |
| Most Common Category | [category] ([%]) | — |

### Rejection Category Breakdown (Cross-Agent)

| Category | Count | Percentage | Pattern? | Trend |
|----------|-------|------------|----------|-------|
| Exemplos | [N] | [%] | [YES/NO] | [↑/↓/→] |
| Especificidade | [N] | [%] | [YES/NO] | [↑/↓/→] |
| Clareza | [N] | [%] | [YES/NO] | [↑/↓/→] |
| Completude | [N] | [%] | [YES/NO] | [↑/↓/→] |
| Relevancia | [N] | [%] | [YES/NO] | [↑/↓/→] |
| Outros | [N] | [%] | [YES/NO] | [↑/↓/→] |

### Pattern Detection

**Patterns Identified (>30% threshold):**

1. **[Category Name] - [%]**
   - **Impact:** [N] rejections across [N] agents
   - **Root Cause:** [Analysis]
   - **Action Taken:** [What was done]
   - **Effectiveness:** [Result]

[If no patterns: "✅ No rejection patterns detected. Rejections are well-distributed across categories."]

---

## Section 3: Proactive Suggestions Analysis

### Suggestion Activity

| Metric | Value | Success Rate |
|--------|-------|--------------|
| Suggestions Made | [N] | — |
| Suggestions Accepted | [N] | [%] |
| Suggestions Deferred | [N] | [%] |
| Suggestions Rejected | [N] | [%] |

### Suggestion Types

| Trigger Type | Count | Acceptance Rate | Examples |
|--------------|-------|-----------------|----------|
| Frequent gaps (2+ occurrences) | [N] | [%] | [skill-name], [skill-name] |
| Quality issues (score <60) | [N] | [%] | [skill-name], [skill-name] |
| Outdated skills (>2 years) | [N] | [%] | [skill-name], [skill-name] |

### Most Impactful Suggestions

| Suggestion | Trigger | Status | Impact |
|------------|---------|--------|--------|
| Create [skill] | Requested [N]x | Accepted | Resolved [N] gaps |
| Update [skill] | Score [N] | Accepted | Improved from [N] to [N] |
| Create [skill] | Requested [N]x | Deferred | [Reason] |

---

## Section 4: System Growth Metrics

### Skill Library Evolution

| Metric | Start of Period | End of Period | Change |
|--------|-----------------|---------------|--------|
| Total Skills | [N] | [N] | [+/-N] |
| Categories | [N] | [N] | [+/-N] |
| Personas | [N] | [N] | [+/-N] |
| Avg Skill Quality Score | [N] | [N] | [+/-N] |

### New Additions This Period

**Skills Created:**
1. `[category]/[skill-name]` (L[N]) - [1-line description]
2. `[category]/[skill-name]` (L[N]) - [1-line description]
3. ...

**Personas Created:**
1. `[persona-name]` - [N] skills - [1-line description]
2. ...

**Categories Added:**
- `[category]/` - [N] skills

### Coverage Analysis

**Topic Coverage by Category:**

| Category | Skills | Coverage | Gaps |
|----------|--------|----------|------|
| frontend | [N] | [HIGH/MEDIUM/LOW] | [N] pending gaps |
| backend | [N] | [HIGH/MEDIUM/LOW] | [N] pending gaps |
| devops | [N] | [HIGH/MEDIUM/LOW] | [N] pending gaps |
| ... | ... | ... | ... |

**Coverage Score Calculation:**
- HIGH: 5+ skills, <2 pending gaps
- MEDIUM: 2-4 skills, 2-5 pending gaps
- LOW: 0-1 skills, 5+ pending gaps

---

## Section 5: Agent-Specific Insights

### Agent Performance Comparison

| Agent | Gaps Detected | Rejections | Most Active Category | Quality Avg |
|-------|---------------|------------|----------------------|-------------|
| opencode | [N] | [N] | [category] | [SCORE] |
| itzamna | [N] | [N] | [category] | [SCORE] |
| speckit | [N] | [N] | [category] | [SCORE] |

### Agent Specialization

**Detected Patterns:**

- **opencode**: Focuses on [categories] - detected [N]% of gaps in this area
- **itzamna**: Focuses on [categories] - detected [N]% of gaps in this area
- **speckit**: Focuses on [categories] - detected [N]% of gaps in this area

**Cross-Agent Collaboration:**

| Skill | Detected By | Requested By | Created By |
|-------|-------------|--------------|------------|
| [skill] | [agent] | [agent1, agent2] | [agent] |
| [skill] | [agent] | [agent1, agent2] | [agent] |

**Insight:** [Analysis of how agents work together - do they complement each other or overlap?]

---

## Section 6: Recommendations & Action Plan

### Critical Actions (Next 7 Days)

**Priority 1: Address High-Frequency Gaps**

- [ ] Create skill for `[skill-name]` (requested [N]x by [N] agents)
  - **Estimated effort:** [TIME]
  - **Impact:** Resolves [N] gaps
  - **Assigned to:** [AGENT/HUMAN]

- [ ] Create skill for `[skill-name]` (requested [N]x by [N] agents)
  - **Estimated effort:** [TIME]
  - **Impact:** Resolves [N] gaps
  - **Assigned to:** [AGENT/HUMAN]

**Priority 2: Address Rejection Patterns**

- [ ] Implement systematic checks for [category] (pattern detected at [%])
  - **Action:** Add [category]-specific validation to SELF-CRITIQUE.md
  - **Timeline:** [DATE]
  - **Owner:** [NAME]

**Priority 3: Quality Improvements**

- [ ] Review and revise skills scoring <70
  - **Count:** [N] skills
  - **Timeline:** [DATE]
  - **Owner:** [NAME]

### Strategic Initiatives (Next 30 Days)

**Initiative 1: Expand Coverage in [Category]**

- Currently [N] skills, [N] pending gaps
- Target: Add [N] new skills
- Focus areas: [specific topics]

**Initiative 2: Reduce Rejection Rate**

- Current: [%]
- Target: [%]
- Methods: [List improvement strategies]

**Initiative 3: Improve Self-Critique Accuracy**

- Current avg score: [N]
- Target avg score: [N]
- Methods: [List improvements to scoring rubric or process]

### Success Metrics (Next Period)

| Metric | Current | Target | Action to Achieve |
|--------|---------|--------|-------------------|
| Gap Resolution Rate | [%] | [%] | Prioritize high-frequency gaps |
| Rejection Rate | [%] | <15% | Implement category checks |
| Avg Quality Score | [N] | ≥80 | Enhanced Self-Critique |
| Skills Added | [N] | [N] | Execute creation backlog |
| Proactive Acceptance | [%] | [%] | Improve suggestion relevance |

---

## Historical Comparison

### Quarter-over-Quarter Trends

| Metric | Q[N-1] | Q[N] | Change | Interpretation |
|--------|---------|------|--------|----------------|
| Gaps Detected | [N] | [N] | [+/-%] | [Analysis] |
| Resolution Rate | [%] | [%] | [+/-%] | [Analysis] |
| Rejection Rate | [%] | [%] | [+/-%] | [Analysis] |
| Skills Added | [N] | [N] | [+/-%] | [Analysis] |
| Avg Quality | [N] | [N] | [+/-%] | [Analysis] |

### Long-Term Health Indicators

**System Maturity Score:** [SCORE]/100

Calculated from:
- Coverage breadth (# categories × # skills): [SCORE]/25
- Quality consistency (avg score + 1/std dev): [SCORE]/25
- Learning effectiveness (1 - rejection rate): [SCORE]/25
- Gap resolution rate: [SCORE]/25

**Maturity Level:**
- 90-100: **Mature** - Self-optimizing, minimal gaps
- 70-89: **Growing** - Expanding, learning actively
- 50-69: **Developing** - Building foundation
- 0-49: **Early** - High volatility, rapid changes

---

## Appendix A: Data Extraction Process

### Step 1: Aggregate Gap Data

```bash
# Find all agent memory files
find memory/ -name "*-memory.md" -type f

# Extract gaps from each file
for file in memory/*-memory.md; do
  echo "=== $file ==="
  grep "^| [0-9]" "$file" | awk -F'|' '{print $4}' | sort
done

# Count cross-agent occurrences
cat memory/*-memory.md | grep "^| [0-9]" | awk -F'|' '{print $4}' | sort | uniq -c | sort -rn
```

### Step 2: Aggregate Rejection Data

```bash
# Extract rejections from each file
for file in memory/*-memory.md; do
  echo "=== $file ==="
  grep "^| [0-9]" "$file" | awk -F'|' '{print $6}' | sort
done

# Count category distribution
cat memory/*-memory.md | grep "^| [0-9]" | awk -F'|' '{print $6}' | sort | uniq -c
```

### Step 3: Calculate Percentages

```bash
# Total rejections
total=$(cat memory/*-memory.md | grep -c "^| [0-9]")

# Category counts
exemplos=$(cat memory/*-memory.md | grep -c "| exemplos |")
especificidade=$(cat memory/*-memory.md | grep -c "| especificidade |")

# Percentages
echo "Exemplos: $(echo "scale=2; $exemplos * 100 / $total" | bc)%"
echo "Especificidade: $(echo "scale=2; $especificidade * 100 / $total" | bc)%"
```

---

## Appendix B: Example Aggregated Data

**From 3 Agent Memory Files:**

**Gaps Detectados (Aggregated):**

| Skill Name | opencode | itzamna | speckit | TOTAL |
|------------|----------|---------|---------|-------|
| kafka-basics | 3 | 0 | 1 | **4** |
| kubernetes-deploy | 2 | 1 | 0 | **3** |
| argocd-setup | 2 | 0 | 0 | **2** |

**Log de Rejeicoes (Aggregated):**

| Category | opencode | itzamna | speckit | TOTAL | % |
|----------|----------|---------|---------|-------|---|
| exemplos | 5 | 2 | 0 | 7 | 29% |
| especificidade | 3 | 2 | 1 | 6 | 25% |
| completude | 3 | 3 | 0 | 6 | 25% |

---

## Appendix C: Report Generation Checklist

- [ ] Collect data from ALL agent memory files
- [ ] Verify data completeness (no missing agents)
- [ ] Calculate aggregated statistics
- [ ] Identify cross-agent patterns
- [ ] Compare with previous period
- [ ] Generate recommendations
- [ ] Review with team
- [ ] Publish report
- [ ] Schedule follow-up actions

---

**Report Version:** 1.0  
**Template Last Updated:** 2026-02-03  
**Related Protocols:** `.prompt-os/core/AUTO-INCREMENT.md` (US4 - Evolution Reports)  
**Based on:** `specs/002-auto-increment/validation-us4.md` (example report)
