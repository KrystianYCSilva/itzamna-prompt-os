# Gap Detection Report Template

**Period:** YYYY-MM-DD to YYYY-MM-DD  
**Generated:** YYYY-MM-DD  
**Report Type:** Gap Analysis (SPEC-002 - AUTO-INCREMENT)

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Gaps Detected | [NUMBER] |
| Unique Gap Types | [NUMBER] |
| Gaps Resolved (created) | [NUMBER] |
| Gaps Deferred | [NUMBER] |
| Gaps Rejected | [NUMBER] |
| Resolution Rate | [PERCENTAGE]% |

---

## Data Sources

**Agent Memory Files Analyzed:**
- [ ] `memory/opencode-memory.md`
- [ ] `memory/itzamna-memory.md`
- [ ] `memory/speckit-memory.md`
- [ ] `memory/[other-agent]-memory.md`

**Data Collection Method:**
1. Read `## Gaps Detectados` section from each agent memory file
2. Aggregate counts across all agents
3. Group by `skill_name` to identify duplicates
4. Calculate resolution rates based on `status` column

---

## Top 10 Most Frequent Gaps

| Rank | Skill Name | Count | Agents | Last Detected | Status |
|------|------------|-------|--------|---------------|--------|
| 1 | [skill-name] | [N] | [agent1, agent2] | YYYY-MM-DD | pending/created/deferred |
| 2 | [skill-name] | [N] | [agent1] | YYYY-MM-DD | pending/created/deferred |
| 3 | [skill-name] | [N] | [agent1, agent2] | YYYY-MM-DD | pending/created/deferred |
| ... | ... | ... | ... | ... | ... |

---

## Gap Distribution by Agent

| Agent | Total Gaps | Unique Gaps | Most Frequent Gap |
|-------|------------|-------------|-------------------|
| opencode | [N] | [N] | [skill-name] ([N]x) |
| itzamna | [N] | [N] | [skill-name] ([N]x) |
| speckit | [N] | [N] | [skill-name] ([N]x) |

---

## Gap Resolution Status

| Status | Count | Percentage |
|--------|-------|------------|
| `created` | [N] | [%] |
| `pending` | [N] | [%] |
| `deferred` | [N] | [%] |
| `rejected` | [N] | [%] |

**Interpretation:**
- **created**: Gap was resolved by creating the requested skill
- **pending**: User hasn't decided yet (default status)
- **deferred**: User chose to proceed without creating skill
- **rejected**: User explicitly declined skill creation

---

## Cross-Agent Insights

**Gaps Requested by Multiple Agents:**

| Skill Name | Total Occurrences | Agents | Priority Score |
|------------|-------------------|--------|----------------|
| [skill-name] | [N] | [agent1, agent2, agent3] | HIGH |
| [skill-name] | [N] | [agent1, agent2] | MEDIUM |

**Priority Score Calculation:**
- HIGH: 3+ agents OR 5+ total occurrences
- MEDIUM: 2 agents OR 3-4 total occurrences
- LOW: 1 agent AND 1-2 occurrences

---

## Trends Over Time

**Gap Detection Rate (per week):**

| Week | Gaps Detected | Gaps Resolved | Resolution Rate |
|------|---------------|---------------|-----------------|
| Week 1 (MM-DD) | [N] | [N] | [%] |
| Week 2 (MM-DD) | [N] | [N] | [%] |
| Week 3 (MM-DD) | [N] | [N] | [%] |
| Week 4 (MM-DD) | [N] | [N] | [%] |

---

## Recommendations

### High Priority Actions

1. **[Skill Name]**: Requested [N] times across [N] agents
   - **Impact**: Would resolve [N] gaps
   - **Suggested Action**: Create skill immediately
   - **Estimated Effort**: [L1/L2/L3]

2. **[Skill Name]**: Requested [N] times across [N] agents
   - **Impact**: Would resolve [N] gaps
   - **Suggested Action**: Create skill this sprint
   - **Estimated Effort**: [L1/L2/L3]

### Medium Priority Actions

3-5. [List medium priority gaps]

### Monitoring Notes

**Alert Thresholds:**
- 🔴 RED: Any gap with 5+ occurrences (immediate action needed)
- 🟡 YELLOW: Any gap with 3-4 occurrences (plan for creation)
- 🟢 GREEN: Gaps with 1-2 occurrences (monitor)

**Current Alerts:**
- [List any gaps exceeding thresholds]

---

## Appendix A: Data Extraction Commands

```bash
# Count total gaps per agent
grep -c "^| [0-9]" memory/opencode-memory.md

# List unique skill names
grep "^| [0-9]" memory/opencode-memory.md | awk -F'|' '{print $4}' | sort | uniq -c

# Find gaps with status "pending"
grep "pending" memory/opencode-memory.md | awk -F'|' '{print $4}'
```

---

## Appendix B: Example Gap Entry

```markdown
## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "Como usar Kafka?" | kafka-basics | pending |
| 2026-02-03 | "Deploy com ArgoCD" | argocd-deploy | created |
| 2026-02-02 | "Configurar Redis" | redis-config | deferred |
```

---

**Report Version:** 1.0  
**Template Last Updated:** 2026-02-03  
**Related Protocols:** `.prompt-os/core/AUTO-INCREMENT.md` (US1 - Gap Detection)
