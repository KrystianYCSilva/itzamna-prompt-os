# Monitoring Guide for Itzamna PromptOS

**Version:** 1.0  
**Last Updated:** 2026-02-03  
**Applies to:** SPEC-001 (Self-Critique) and SPEC-002 (Auto-Increment)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Data Sources](#2-data-sources)
3. [SPEC-001 Monitoring (Self-Critique)](#3-spec-001-monitoring-self-critique)
4. [SPEC-002 Monitoring (Auto-Increment)](#4-spec-002-monitoring-auto-increment)
5. [Report Generation](#5-report-generation)
6. [Interpreting Results](#6-interpreting-results)
7. [Examples](#7-examples)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Overview

### What to Monitor

Itzamna PromptOS generates rich data through two key specifications:

| Spec | Feature | Data Generated |
|------|---------|----------------|
| **SPEC-001** | Self-Critique | Quality scores (0-100), dimension breakdowns, constitution checks |
| **SPEC-002** | Auto-Increment | Gaps detected, rejection patterns, proactive suggestions, evolution metrics |

### Why Monitoring Matters

Monitoring enables you to:

1. **Track system evolution**: See what skills/features are missing
2. **Improve quality**: Identify recurring issues in generated artifacts
3. **Learn from feedback**: Understand why artifacts get rejected
4. **Prioritize work**: Focus on high-impact improvements
5. **Measure progress**: Quantify system maturity over time

### Monitoring Frequency

| Report Type | Frequency | When to Generate |
|-------------|-----------|------------------|
| **Gap Detection** | Weekly | Every Monday or after major development sessions |
| **Rejection Analysis** | Bi-weekly | When rejection count >10 or pattern suspected |
| **Self-Critique Metrics** | Monthly | End of month or end of sprint |
| **Evolution Report** | Quarterly | End of quarter or major milestone |
| **Ad-hoc** | On-demand | After major changes, before releases, when issues arise |

---

## 2. Data Sources

### Primary Sources

**1. Agent Memory Files (`memory/{agente}-memory.md`)**

Each agent maintains its own memory file with:
- `## Gaps Detectados` - Table of requested but missing skills
- `## Log de Rejeicoes` - Table of rejected artifacts with reasons

**Location:**
```
memory/
├── opencode-memory.md
├── itzamna-memory.md
├── speckit-memory.md
└── [other-agent]-memory.md
```

**2. Root Memory File (`MEMORY.md`)**

Contains:
- Global statistics (aggregated counts)
- Session notes (high-level summaries)
- Historical milestones

**3. Validation Reports (for baseline data)**

- `specs/002-auto-increment/validation-us1.md` - Gap detection examples
- `specs/002-auto-increment/validation-us2.md` - Rejection learning examples
- `specs/002-auto-increment/validation-us4.md` - Complete evolution report example

### Secondary Sources

**4. Git History**

- Commit messages (may include scores or rejection notes)
- File changes (track when skills created/updated)

**5. Human Gate Logs (if implemented)**

- Display outputs showing Self-Critique scores
- User decisions (approve/reject/edit)

**6. Manual Tracking**

- Spreadsheet or dedicated log file
- Session notes in `MEMORY.md`

---

## 3. SPEC-001 Monitoring (Self-Critique)

### What SPEC-001 Tracks

Self-Critique evaluates artifact quality across 4 dimensions:

| Dimension | Max Points | What It Measures |
|-----------|------------|------------------|
| Completude | 25 | All required sections, examples, sources present |
| Clareza | 25 | Clear language, logical structure, good formatting |
| Correção | 25 | Technical accuracy, working examples, valid syntax |
| Best Practices | 25 | Industry standards, security, performance, trade-offs |

**Overall Score:** 0-100 (sum of 4 dimensions)

### Collecting Self-Critique Data

**Method 1: Manual Logging During Sessions**

When you generate an artifact and see the Self-Critique score:

1. Note the score in a tracking file:

```markdown
## Self-Critique Tracking

| Date | Artifact | Type | Overall | Comp | Clar | Corr | BP | Notes |
|------|----------|------|---------|------|------|------|----|-------|
| 2026-02-03 | kafka-basics | skill | 85 | 22 | 21 | 21 | 21 | Good examples |
| 2026-02-02 | redis-cache | skill | 68 | 18 | 17 | 16 | 17 | Needs revision |
```

2. Save to `memory/self-critique-log.md` or spreadsheet

**Method 2: Extract from Git Commits**

If commit messages include scores:

```bash
# Search commit history for Self-Critique mentions
git log --all --grep="Self-Critique" --oneline

# Example commit message format:
# "feat(skill): add kafka-basics (Self-Critique: 85/100)"
```

**Method 3: Extract from MEMORY.md**

Check session notes in `MEMORY.md` for score mentions:

```bash
grep -i "score" MEMORY.md
grep -i "self-critique" MEMORY.md
```

### Calculating Metrics

**1. Average Overall Score**

```
Sum of all overall scores / Total artifacts evaluated
```

**2. Dimension Averages**

```
Sum of dimension scores / Total artifacts evaluated
(For each: Completude, Clareza, Correção, Best Practices)
```

**3. Score Band Distribution**

Count artifacts in each band:
- 90-100: Excellent (🟢)
- 80-89: Production Ready (🟢)
- 70-79: Acceptable (🔵)
- 60-69: Needs Improvement (🟡)
- 0-59: Unacceptable (🔴)

**4. Constitution Violation Rate**

```
(Artifacts with T0 violations / Total artifacts) × 100
```

### Generating Self-Critique Report

**Step 1:** Collect data using methods above  
**Step 2:** Open template `.prompt-os/templates/monitoring/self-critique-metrics.md`  
**Step 3:** Fill in the template with your data  
**Step 4:** Analyze trends and identify weak areas  
**Step 5:** Create action plan based on findings

**Template Location:** [`.prompt-os/templates/monitoring/self-critique-metrics.md`](../.prompt-os/templates/monitoring/self-critique-metrics.md)

---

## 4. SPEC-002 Monitoring (Auto-Increment)

### What SPEC-002 Tracks

Auto-Increment has 4 user stories, each generating data:

| User Story | Data Generated | Location |
|------------|----------------|----------|
| **US1: Gap Detection** | Missing skills requested | `memory/{agent}-memory.md` → `## Gaps Detectados` |
| **US2: Rejection Learning** | Artifacts rejected with reasons | `memory/{agent}-memory.md` → `## Log de Rejeicoes` |
| **US3: Proactive Suggestions** | Skills suggested based on patterns | (Not explicitly logged, infer from US1/US2) |
| **US4: Evolution Reports** | Aggregated cross-agent insights | Generated on-demand from all agent memories |

### 4.1. Gap Detection Metrics

**What to Track:**

- Total gaps detected
- Unique skill names requested
- Frequency of each gap (how many times requested)
- Cross-agent gaps (requested by multiple agents)
- Gap resolution status (pending/created/deferred/rejected)

**Data Collection Process:**

**Step 1: Extract Gaps from Each Agent**

```bash
# For each agent memory file
cat memory/opencode-memory.md | awk '/## Gaps Detectados/,/^##/ {print}'
```

Example output:
```markdown
## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "Como usar Kafka?" | kafka-basics | pending |
| 2026-02-03 | "Deploy com ArgoCD" | argocd-deploy | created |
| 2026-02-02 | "Configurar Redis" | redis-config | deferred |
```

**Step 2: Aggregate Across Agents**

Combine all gaps and group by `Skill Sugerida`:

| Skill Name | opencode | itzamna | speckit | TOTAL |
|------------|----------|---------|---------|-------|
| kafka-basics | 3 | 0 | 1 | 4 |
| kubernetes-deploy | 2 | 1 | 0 | 3 |

**Step 3: Calculate Resolution Rate**

```
Resolution Rate = (Gaps with status="created" / Total gaps) × 100
```

**Generating Gap Detection Report:**

1. Open template: `.prompt-os/templates/monitoring/gap-detection-report.md`
2. Fill in period dates
3. Check all agent memory files analyzed
4. Extract and aggregate gap data
5. Fill in Top 10 table
6. Calculate resolution rates
7. Add cross-agent insights
8. Create recommendations for high-frequency gaps

**Template Location:** [`.prompt-os/templates/monitoring/gap-detection-report.md`](../.prompt-os/templates/monitoring/gap-detection-report.md)

### 4.2. Rejection Learning Metrics

**What to Track:**

- Total rejections
- Rejection categories (exemplos, especificidade, clareza, completude, relevancia, outros)
- Category percentages (identify patterns >30%)
- Most rejected artifacts
- Learned actions applied

**Data Collection Process:**

**Step 1: Extract Rejections from Each Agent**

```bash
# For each agent memory file
cat memory/opencode-memory.md | awk '/## Log de Rejeicoes/,/^##/ {print}'
```

Example output:
```markdown
## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-02 | skill | redis-cache | "Exemplos incorretos" | exemplos | Testar comandos |
| 2026-02-01 | skill | graphql-api | "Muito genérico" | especificidade | Adicionar casos reais |
```

**Step 2: Count Category Distribution**

```bash
# Count each category
grep "| exemplos |" memory/*-memory.md | wc -l
grep "| especificidade |" memory/*-memory.md | wc -l
grep "| clareza |" memory/*-memory.md | wc -l
grep "| completude |" memory/*-memory.md | wc -l
grep "| relevancia |" memory/*-memory.md | wc -l
grep "| outros |" memory/*-memory.md | wc -l
```

**Step 3: Calculate Percentages**

```bash
total=$(cat memory/*-memory.md | grep -c "^| [0-9]")
exemplos=$(cat memory/*-memory.md | grep -c "| exemplos |")
percentage=$(echo "scale=2; $exemplos * 100 / $total" | bc)
echo "Exemplos: ${percentage}%"
```

**Step 4: Detect Patterns**

**Pattern Detected:** Any category >30% of total rejections

**Example:**
- Total rejections: 24
- Exemplos: 7 (29%) → No pattern
- Especificidade: 8 (33%) → **PATTERN DETECTED** ✅

**Generating Rejection Analysis Report:**

1. Open template: `.prompt-os/templates/monitoring/rejection-analysis-report.md`
2. Fill in period dates
3. Extract and aggregate rejection data
4. Calculate category percentages
5. Identify patterns (>30%)
6. Fill in pattern analysis section
7. Create recommendations for detected patterns

**Template Location:** [`.prompt-os/templates/monitoring/rejection-analysis-report.md`](../.prompt-os/templates/monitoring/rejection-analysis-report.md)

### 4.3. Proactive Suggestions Metrics

**What to Track:**

Proactive suggestions are triggered by:
1. Frequent gaps (same gap appears 2+ times)
2. Quality issues (Self-Critique score <60)
3. Outdated skills (>2 years old)

**Data Collection:**

Suggestions are not explicitly logged in memory files, but you can infer them:

**From Gap Data:**
- Any skill with count ≥2 → Should trigger suggestion
- Check if suggestion was made and user response

**From Self-Critique Data:**
- Any artifact with score <60 → Should trigger update suggestion
- Check if artifact was updated

**Metrics to Track:**

| Metric | How to Calculate |
|--------|------------------|
| Suggestions Made | Count of times agent offered to create/update |
| Suggestions Accepted | Count of times user said "yes" |
| Suggestions Deferred | Count of times user said "maybe later" |
| Suggestions Rejected | Count of times user said "no" |
| Acceptance Rate | (Accepted / Made) × 100 |

**Note:** This requires manual tracking during sessions or reviewing session logs.

### 4.4. Evolution Reports

**What It Is:**

Evolution Reports aggregate data from ALL user stories and ALL agents to provide a comprehensive view of system health.

**When to Generate:**

- Quarterly (end of Q1, Q2, Q3, Q4)
- Before major releases
- When requested by stakeholders
- After significant development phases

**Data Collection Process:**

**Step 1: Aggregate Gap Data (from US1)**

Read ALL agent memory files and merge gap tables.

**Step 2: Aggregate Rejection Data (from US2)**

Read ALL agent memory files and merge rejection tables.

**Step 3: Calculate System Metrics**

- Total gaps, unique gaps, resolution rate
- Total rejections, category breakdown, patterns
- Skills added this period
- Average quality scores (from SPEC-001)

**Step 4: Identify Cross-Agent Insights**

- Which gaps requested by multiple agents?
- Are certain agents specializing in certain categories?
- Cross-agent collaboration examples

**Step 5: Generate Recommendations**

Based on aggregated data, prioritize:
- High-frequency gaps (create these skills first)
- Detected rejection patterns (fix systematic issues)
- Quality improvements (update low-scoring skills)

**Generating Evolution Report:**

1. Open template: `.prompt-os/templates/monitoring/evolution-report-template.md`
2. Fill in period dates (e.g., Q1 2026)
3. Aggregate data from ALL `memory/*-memory.md` files
4. Fill in all 6 sections:
   - Section 1: Gap Detection Analysis
   - Section 2: Rejection Learning Analysis
   - Section 3: Proactive Suggestions Analysis
   - Section 4: System Growth Metrics
   - Section 5: Agent-Specific Insights
   - Section 6: Recommendations & Action Plan
5. Compare with previous period (if available)
6. Create prioritized action plan

**Template Location:** [`.prompt-os/templates/monitoring/evolution-report-template.md`](../.prompt-os/templates/monitoring/evolution-report-template.md)

**Reference Example:** [`specs/002-auto-increment/validation-us4.md`](../specs/002-auto-increment/validation-us4.md) (complete validation report with real data)

---

## 5. Report Generation

### Quick Start Workflow

**Weekly Gap Report (15 mins):**

1. Open `.prompt-os/templates/monitoring/gap-detection-report.md`
2. Extract gaps from agent memories: `grep "^| [0-9]" memory/*-memory.md`
3. Count occurrences: `awk -F'|' '{print $4}' | sort | uniq -c | sort -rn`
4. Fill in Top 10 table
5. Note any gaps with 3+ occurrences (high priority)
6. Save report as `reports/gap-report-YYYY-MM-DD.md`

**Bi-Weekly Rejection Analysis (20 mins):**

1. Open `.prompt-os/templates/monitoring/rejection-analysis-report.md`
2. Count total rejections: `grep -c "^| [0-9]" memory/*-memory.md`
3. Count by category: `grep "| [category] |" memory/*-memory.md | wc -l`
4. Calculate percentages (see commands in template)
5. Identify if any category >30%
6. If pattern detected, fill in pattern analysis
7. Save report as `reports/rejection-analysis-YYYY-MM-DD.md`

**Monthly Self-Critique Metrics (30 mins):**

1. Open `.prompt-os/templates/monitoring/self-critique-metrics.md`
2. Gather scores from your tracking log or git history
3. Calculate averages (overall and per dimension)
4. Count artifacts per score band
5. Identify lowest-scoring dimension
6. Fill in trends section (compare to last month)
7. Save report as `reports/self-critique-YYYY-MM.md`

**Quarterly Evolution Report (1-2 hours):**

1. Open `.prompt-os/templates/monitoring/evolution-report-template.md`
2. Aggregate gap data from all agents
3. Aggregate rejection data from all agents
4. Review skills added this quarter (check `MEMORY.md`)
5. Calculate all metrics in Sections 1-4
6. Analyze agent specialization (Section 5)
7. Create prioritized recommendations (Section 6)
8. Compare with previous quarter
9. Save report as `reports/evolution-report-Q[N]-YYYY.md`

### Automation Opportunities

**Basic Shell Scripts:**

```bash
#!/bin/bash
# count-gaps.sh - Quick gap frequency report

echo "=== Gap Frequency Report ==="
echo "Generated: $(date)"
echo ""
echo "Top 10 Most Requested Skills:"
cat memory/*-memory.md | grep "^| [0-9]" | awk -F'|' '{print $4}' | \
  sort | uniq -c | sort -rn | head -10 | \
  awk '{printf "%2d. %s (x%d)\n", NR, $2, $1}'
```

```bash
#!/bin/bash
# rejection-categories.sh - Category breakdown

total=$(cat memory/*-memory.md | grep -c "^| [0-9]")
echo "=== Rejection Category Breakdown ==="
echo "Total Rejections: $total"
echo ""

for category in exemplos especificidade clareza completude relevancia outros; do
  count=$(cat memory/*-memory.md | grep -c "| $category |")
  if [ $total -gt 0 ]; then
    pct=$(echo "scale=1; $count * 100 / $total" | bc)
  else
    pct=0
  fi
  printf "%-18s: %3d (%5.1f%%)\n" "$category" "$count" "$pct"
done
```

**Advanced: Python Script (Future Enhancement)**

```python
# monitor.py - Automated report generation
# TODO: Implement in future version
# - Parse all agent memory files
# - Generate JSON/CSV data
# - Create filled-out report templates
# - Generate charts/graphs
```

### Report Storage

**Recommended Structure:**

```
reports/
├── 2026-Q1/
│   ├── gap-report-2026-01-06.md
│   ├── gap-report-2026-01-13.md
│   ├── gap-report-2026-01-20.md
│   ├── rejection-analysis-2026-01-15.md
│   ├── self-critique-2026-01.md
│   └── evolution-report-Q1-2026.md
├── 2026-Q2/
│   └── ...
└── README.md (index of reports)
```

---

## 6. Interpreting Results

### Healthy Ranges

**Self-Critique (SPEC-001):**

| Metric | Healthy Range | Warning Range | Critical |
|--------|---------------|---------------|----------|
| Average Overall Score | 80-100 | 70-79 | <70 |
| Individual Dimension | 20-25 (out of 25) | 15-19 | <15 |
| Score ≥80 Rate | >80% of artifacts | 60-80% | <60% |
| Score <60 Rate | <5% | 5-15% | >15% |
| Constitution Violations | 0 | 0 | ANY (blocker) |

**Gap Detection (SPEC-002 US1):**

| Metric | Healthy Range | Warning Range | Critical |
|--------|---------------|---------------|----------|
| Resolution Rate | >70% | 50-70% | <50% |
| Gaps per Week | <10 (mature system) | 10-20 | >20 (early system) |
| Cross-Agent Gaps | <3 HIGH priority | 3-5 HIGH priority | >5 HIGH priority |

**Rejection Learning (SPEC-002 US2):**

| Metric | Healthy Range | Warning Range | Critical |
|--------|---------------|---------------|----------|
| Rejection Rate | <15% | 15-25% | >25% |
| Pattern Detection | NO (well-distributed) | YES (1 category >30%) | YES (2+ categories >30%) |
| Repeat Rejections | 0 artifacts | 1-2 artifacts | >2 artifacts |

**System Maturity (Evolution Reports):**

| Maturity Level | Score | Characteristics |
|----------------|-------|-----------------|
| **Mature** | 90-100 | Self-optimizing, minimal gaps, high quality, <10% rejection rate |
| **Growing** | 70-89 | Expanding library, learning actively, 10-20% rejection rate |
| **Developing** | 50-69 | Building foundation, moderate gaps, 20-30% rejection rate |
| **Early** | 0-49 | High volatility, many gaps, >30% rejection rate |

### Warning Signs

**🔴 Red Flags (Take Immediate Action):**

1. **Average Self-Critique score <70** → Review generation process
2. **Any T0 Constitution violation** → Blocker, must fix before approval
3. **Rejection rate >25%** → Systematic quality issues
4. **Any rejection category >40%** → Critical pattern
5. **Same artifact rejected 3+ times** → Fundamental misalignment

**🟡 Yellow Flags (Monitor Closely):**

1. **Average score declining 3 weeks in a row** → Process degradation
2. **Resolution rate <60%** → Gaps not being addressed
3. **Cross-agent gap with 5+ occurrences** → High-impact missing skill
4. **Rejection pattern (>30%) persisting 2+ periods** → Systemic issue not resolved

**🟢 Green Flags (Healthy System):**

1. **Average score >80 and stable**
2. **Resolution rate >70%**
3. **No rejection patterns**
4. **Decreasing gap detection rate** (system maturing)
5. **Proactive suggestions accepted >60%**

### Action Triggers

**When Average Score <70:**
1. Review SELF-CRITIQUE.md implementation
2. Add pre-checks before Human Gate
3. Create quality checklist for common failures

**When Pattern Detected (>30%):**
1. Add category-specific validation to workflow
2. Update SELF-CRITIQUE.md with category criteria
3. Create examples/templates addressing pattern
4. Re-evaluate in next period

**When Cross-Agent Gap (3+ agents):**
1. **IMMEDIATE:** Create this skill (high priority)
2. Estimated impact: Resolves N gaps across N agents
3. Assign to next sprint/milestone

**When Resolution Rate <50%:**
1. Review why gaps aren't being resolved
2. Are suggestions clear enough?
3. Are resources available to create skills?
4. Adjust prioritization strategy

---

## 7. Examples

### Example 1: Gap Detection Report (Real Data from Validation)

**From:** `specs/002-auto-increment/validation-us4.md`

**Period:** 2026-02-01 to 2026-02-03  
**Agents Analyzed:** 3 (opencode, itzamna, speckit)

**Top Gaps:**

| Rank | Skill | Total | Agents | Priority |
|------|-------|-------|--------|----------|
| 1 | kafka-basics | 4 | opencode (3x), speckit (1x) | **HIGH** |
| 2 | kubernetes-deploy | 3 | opencode (2x), itzamna (1x) | **HIGH** |
| 3 | argocd-deploy | 2 | opencode (2x) | MEDIUM |

**Resolution Rate:** 41% (7 created / 17 total)

**Insight:** Kafka and Kubernetes are CRITICAL priorities - requested by multiple agents. Creating these 2 skills would resolve 7 gaps (41% of total).

**Recommendation:** Create `kafka-basics` (L2) and `kubernetes-deploy` (L2) in next sprint.

### Example 2: Rejection Analysis Report (Real Data)

**From:** `specs/002-auto-increment/validation-us2.md`

**Period:** 2026-02-01 to 2026-02-03  
**Agents Analyzed:** 3 (opencode, itzamna, speckit)

**Category Breakdown:**

| Category | Count | Percentage | Pattern? |
|----------|-------|------------|----------|
| exemplos | 7 | 29% | NO |
| especificidade | 6 | 25% | NO |
| completude | 6 | 25% | NO |
| clareza | 3 | 13% | NO |
| relevancia | 2 | 8% | NO |
| outros | 0 | 0% | NO |

**Total Rejections:** 24  
**Pattern Detected:** NO (all categories <30%)

**Insight:** Rejections are well-distributed. No systematic issue. This indicates healthy variability and learning.

**Recommendation:** Continue current process. No pattern-specific actions needed.

### Example 3: Self-Critique Metrics (Hypothetical)

**Period:** January 2026  
**Artifacts Evaluated:** 15 skills

**Overall Performance:**

- Average Score: 82/100
- Score ≥80: 11 (73%) ✅ Healthy
- Score <60: 1 (7%) ✅ Acceptable

**Dimension Averages:**

- Completude: 21/25 (84%)
- Clareza: 20/25 (80%)
- Correção: 20/25 (80%)
- Best Practices: 21/25 (84%)

**Lowest Performer:** skill-X (score: 58)
- Weakest dimension: Correção (12/25)
- Issue: Broken examples
- Action: Revise and test all examples

**Insight:** Overall healthy performance. One artifact needs attention (skill-X). No systematic issues.

**Recommendation:** Revise skill-X, otherwise continue current approach.

### Example 4: Evolution Report Excerpt

**From:** `specs/002-auto-increment/validation-us4.md` (Section 1)

**Period:** Q1 2026  
**Agents:** 3 (opencode, itzamna, speckit)

**Gap Analysis:**

- Total Gaps: 17
- Unique Skills: 12
- Cross-Agent Gaps: 3 (HIGH priority)
- Resolution Rate: 41%

**Rejection Analysis:**

- Total Rejections: 24
- Pattern Detected: NO
- Most Common Category: exemplos (29%)
- Rejection Rate: 18%

**System Growth:**

- Skills Added: 3
- Categories Added: 1 (linguagens-programacao/)
- Avg Quality Score: 85/100

**Recommendations:**

1. **Create kafka-basics** (4 requests) - HIGH
2. **Create kubernetes-deploy** (3 requests) - HIGH
3. **Create argocd-deploy** (2 requests) - MEDIUM
4. Continue monitoring rejection distribution (healthy)

**System Maturity:** Growing (75/100)

---

## 8. Troubleshooting

### Issue 1: No Data in Agent Memory Files

**Problem:** Agent memory files are empty or don't have gap/rejection sections.

**Cause:** AUTO-INCREMENT protocol not being followed, or memory files not initialized.

**Solution:**

1. Create memory file structure:

```markdown
# [Agent Name] Memory

## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| (No gaps yet) | | | |

## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| (No rejections yet) | | | | | |
```

2. Ensure agents are reading AUTO-INCREMENT.md
3. Manually log gaps/rejections if needed

### Issue 2: Inconsistent Data Formats

**Problem:** Different agents log data in different formats.

**Cause:** Manual entry, different agent implementations.

**Solution:**

1. Standardize format per AUTO-INCREMENT.md specification
2. Validate format in validation scripts
3. Document required fields clearly

### Issue 3: Missing Self-Critique Scores

**Problem:** No scores recorded for generated artifacts.

**Cause:** SELF-CRITIQUE.md not applied, or scores not logged.

**Solution:**

1. Implement manual tracking during sessions
2. Add scores to commit messages
3. Create dedicated tracking file
4. Review Human Gate outputs for score mentions

### Issue 4: Can't Calculate Percentages

**Problem:** Division by zero or invalid calculations.

**Cause:** No data available for denominator.

**Solution:**

1. Check if data exists before calculating
2. Handle zero cases: `if total = 0, then percentage = N/A`
3. Use safe calculation: `if [ $total -gt 0 ]; then ... fi`

### Issue 5: Cross-Agent Gaps Not Detected

**Problem:** Same gap requested by multiple agents but not identified.

**Cause:** Different skill names used for same concept.

**Solution:**

1. Normalize skill names (e.g., "kafka" → "kafka-basics")
2. Group similar requests manually
3. Note aliases in report

### Issue 6: Pattern False Positives

**Problem:** Category shows >30% but it's due to small sample size.

**Cause:** Low total rejection count (e.g., 3 rejections, 2 in one category = 67%).

**Solution:**

1. Only flag patterns if total rejections ≥10
2. Note small sample size in report
3. Wait for more data before acting

### Issue 7: Can't Generate Quarterly Report (Not Enough Data)

**Problem:** First quarter of usage, no historical data.

**Cause:** System newly deployed.

**Solution:**

1. Generate report with available data
2. Mark "Historical Comparison" section as N/A
3. Use this report as baseline for next quarter

---

## Appendix A: Command Reference

### Common Data Extraction Commands

**Count total gaps:**
```bash
grep -c "^| [0-9]" memory/opencode-memory.md
```

**List unique skill names:**
```bash
grep "^| [0-9]" memory/opencode-memory.md | awk -F'|' '{print $4}' | sort | uniq
```

**Count gap frequency (all agents):**
```bash
cat memory/*-memory.md | grep "^| [0-9]" | awk -F'|' '{print $4}' | sort | uniq -c | sort -rn
```

**Count rejections by category:**
```bash
grep -c "| exemplos |" memory/*-memory.md
grep -c "| especificidade |" memory/*-memory.md
```

**Calculate percentage (bash + bc):**
```bash
total=$(cat memory/*-memory.md | grep -c "^| [0-9]")
exemplos=$(cat memory/*-memory.md | grep -c "| exemplos |")
echo "scale=1; $exemplos * 100 / $total" | bc
```

**Find gaps with status "pending":**
```bash
grep "| pending" memory/*-memory.md
```

---

## Appendix B: Report Templates Quick Reference

| Template | Use Case | Frequency | Estimated Time |
|----------|----------|-----------|----------------|
| [`gap-detection-report.md`](../.prompt-os/templates/monitoring/gap-detection-report.md) | Track missing skills | Weekly | 15 mins |
| [`rejection-analysis-report.md`](../.prompt-os/templates/monitoring/rejection-analysis-report.md) | Identify quality patterns | Bi-weekly | 20 mins |
| [`self-critique-metrics.md`](../.prompt-os/templates/monitoring/self-critique-metrics.md) | Measure artifact quality | Monthly | 30 mins |
| [`evolution-report-template.md`](../.prompt-os/templates/monitoring/evolution-report-template.md) | Comprehensive system health | Quarterly | 1-2 hours |

---

## Appendix C: Monitoring Checklist

### Weekly Tasks

- [ ] Generate gap detection report
- [ ] Review high-frequency gaps (≥3 occurrences)
- [ ] Update gap status (pending → created/deferred)
- [ ] Note any new patterns or trends

### Bi-Weekly Tasks

- [ ] Generate rejection analysis report
- [ ] Calculate category percentages
- [ ] Check for patterns (>30%)
- [ ] Update learned actions

### Monthly Tasks

- [ ] Generate self-critique metrics report
- [ ] Calculate average scores and trends
- [ ] Identify low-performing artifacts (<70)
- [ ] Review constitution violations (should be 0)

### Quarterly Tasks

- [ ] Generate evolution report
- [ ] Aggregate cross-agent data
- [ ] Compare with previous quarter
- [ ] Create prioritized action plan
- [ ] Share with team/stakeholders

---

## Appendix D: Related Documentation

- [AUTO-INCREMENT.md](../.prompt-os/core/AUTO-INCREMENT.md) - Protocol specification
- [SELF-CRITIQUE.md](../.prompt-os/core/SELF-CRITIQUE.md) - Quality evaluation protocol
- [HUMAN-GATE.md](../.prompt-os/core/HUMAN-GATE.md) - Approval workflow
- [SPEC-002 Validation Reports](../specs/002-auto-increment/) - Real examples
- [MEMORY.md](../MEMORY.md) - Root system memory

---

**End of Monitoring Guide**  
**Version:** 1.0  
**Maintained by:** Itzamna PromptOS Team  
**Feedback:** Update this guide as you learn best practices from actual usage
