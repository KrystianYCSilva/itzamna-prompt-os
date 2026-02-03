# Contract: Evolution Reports Protocol

**Spec**: `002-auto-increment`  
**Version**: 1.0.0  
**Created**: 2026-02-03

---

## Purpose

This contract defines the interface and workflow for generating periodic evolution reports that summarize system growth, learning patterns, and suggested improvements by aggregating data across all agent memory files and global statistics.

---

## Trigger Conditions

This protocol activates when:

1. **User explicitly requests report**: "Generate evolution report", "Show system stats", "How is the system evolving?"
2. **Scheduled review** (optional): Monthly/quarterly reviews if user configures them
3. **After milestone**: User completes major project phase and wants summary

---

## Input Requirements

### Required Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `reporting_period` | User or system | String (date range or month/year) | "Janeiro 2026" or "2026-01-01 to 2026-01-31" |
| `agent_memories` | File system | Array of paths | `["memory/opencode-memory.md", "memory/itzamna-memory.md"]` |
| `global_stats` | File system | Path to root memory | `MEMORY.md` |

### Optional Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `report_format` | User preference | Enum (markdown/json) | `markdown` |
| `include_details` | User flag | Boolean | `true` |

---

## Process Flow

### Phase 1: Aggregate Agent Memory Data

Cross-agent aggregation is the core of evolution reports:

```
Algorithm:

1. Discover all agent memory files:
   - Glob pattern: memory/*.md (excluding root MEMORY.md)
   - Example: ["memory/opencode-memory.md", "memory/itzamna-memory.md"]

2. FOR each agent_memory_file:
   
   A. Read "## Gaps Detectados" section:
      - Parse table rows
      - Extract: date, request, suggested_skill_name, status
      - Append to aggregated_gaps[]
   
   B. Read "## Log de Rejeicoes" section:
      - Parse table rows
      - Extract: date, tipo, item, motivo, categoria, aprendizado
      - Append to aggregated_rejections[]

3. Return {aggregated_gaps, aggregated_rejections}
```

**Cross-Agent Aggregation Note**: This is the ONLY operation that reads multiple agent memory files. Individual agents only read their own memory for session-local learning.

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 176-206 (needs explicit cross-agent aggregation note)

### Phase 2: Read Global Statistics

Global metrics come from root MEMORY.md:

```
1. Read MEMORY.md (root file)
2. Extract metrics:
   - Total skills count (created + existing)
   - Overall approval rate (approvals / total submissions)
   - Skills created this period (if tracked)
   - Skills updated this period (if tracked)
3. Return global_metrics
```

**Global Stats Format** (example):

```markdown
# PromptOS Memory

## Global Statistics

| Metric | Value |
|--------|-------|
| Total Skills | 42 |
| Approval Rate | 87.5% |
| Skills Created (Jan 2026) | 5 |
| Skills Updated (Jan 2026) | 3 |
```

**Fallback**: If root MEMORY.md doesn't exist or lacks stats, calculate from aggregated data.

### Phase 3: Calculate Report Metrics

Process aggregated data into report sections:

#### A. Summary Metrics

```
Calculate:

1. skills_created:
   - Count gaps with status "created" in reporting period
   - OR read from global_metrics
   
2. skills_updated:
   - Count rejection logs where same skill improved and re-approved
   - OR read from global_metrics

3. approval_rate:
   - (Total approvals / Total submissions) * 100
   - Read from global_metrics

4. gaps_detected:
   - Count all gaps in reporting period

5. gaps_resolved:
   - Count gaps with status "created" in reporting period
```

**Example**:
```json
{
  "skills_created": 5,
  "skills_updated": 3,
  "approval_rate": 87.5,
  "gaps_detected": 12,
  "gaps_resolved": 5
}
```

#### B. Top Gaps Analysis

```
Algorithm:

1. Filter aggregated_gaps:
   - status IN ["pending", "deferred"] (unresolved)
   
2. Group by suggested_skill_name
3. Count occurrences per skill
4. Sort by count (descending)
5. Take top 3

6. Return top_gaps = [
     {name: "kafka-basics", count: 3},
     {name: "argocd-deploy", count: 2},
     {name: "graphql-advanced", count: 2}
   ]
```

**Output Format**:
```markdown
### Top 3 Gaps Mais Frequentes
1. kafka-basics - 3 occurrences
2. argocd-deploy - 2 occurrences  
3. graphql-advanced - 2 occurrences
```

#### C. Rejection Patterns

```
Algorithm:

1. Group aggregated_rejections by categoria
2. Count per category
3. Calculate percentages:
   percentage[cat] = count[cat] / total_rejections * 100
4. Sort by percentage (descending)
5. Return rejection_patterns = [
     {category: "examples", count: 8, percentage: 40.0},
     {category: "clarity", count: 5, percentage: 25.0},
     {category: "other", count: 7, percentage: 35.0}
   ]
```

**Output Format**:
```markdown
### Padroes de Rejeicao
- Examples: 40% das rejeicoes (8 occurrences)
- Clarity: 25% das rejeicoes (5 occurrences)
- Other: 35% das rejeicoes (7 occurrences)
```

#### D. Suggested Actions

```
Algorithm:

1. Generate actions based on patterns:

   A. For each category with percentage > 30%:
      -> "Improve {category} quality in all skills - {percentage}% of rejections"
   
   B. For top unresolved gap:
      -> "Create skill for '{gap_name}' - requested {count} times"
   
   C. For outdated skills (if known):
      -> "Update skills older than {threshold} years"

2. Prioritize:
   - Critical patterns (>50%) first
   - Frequent gaps (count >3) second
   - Quality improvements third

3. Return sorted suggested_actions[]
```

**Example**:
```markdown
### Sugestoes de Acao
1. Improve examples quality in all skills - 40% of rejections
2. Create skill for 'kafka-basics' - requested 3 times
3. Review clarity in documentation - 25% of rejections
```

### Phase 4: Format Report

Generate markdown report following template:

```markdown
## Relatorio de Evolucao do PromptOS

### Periodo: {reporting_period}

### Resumo
| Metrica | Valor |
|---------|-------|
| Skills criadas | {skills_created} |
| Skills atualizadas | {skills_updated} |
| Gaps detectados | {gaps_detected} |
| Gaps resolvidos | {gaps_resolved} |
| Taxa de aprovacao | {approval_rate}% |

### Top 3 Gaps Mais Frequentes
{top_gaps[0]}
{top_gaps[1]}
{top_gaps[2]}

### Padroes de Rejeicao
{rejection_patterns}

### Sugestoes de Acao
{suggested_actions}

---
*Gerado automaticamente pelo PromptOS*
*Periodo: {reporting_period}*
*Gerado em: {generation_timestamp}*
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 176-206

### Phase 5: Present to User

Display report and offer follow-up actions:

```
1. Show formatted report
2. Offer options:
   - "Create skill for top gap?"
   - "Review rejection patterns in detail?"
   - "Export report to file?"
   - "Continue working"
```

---

## Output Specifications

### Success Output (Complete Report)

```json
{
  "report_generated": true,
  "reporting_period": "Janeiro 2026",
  "summary": {
    "skills_created": 5,
    "skills_updated": 3,
    "approval_rate": 87.5,
    "gaps_detected": 12,
    "gaps_resolved": 5
  },
  "top_gaps": [
    {"name": "kafka-basics", "count": 3},
    {"name": "argocd-deploy", "count": 2},
    {"name": "graphql-advanced", "count": 2}
  ],
  "rejection_patterns": [
    {"category": "examples", "percentage": 40.0, "count": 8},
    {"category": "clarity", "percentage": 25.0, "count": 5},
    {"category": "other", "percentage": 35.0, "count": 7}
  ],
  "suggested_actions": [
    "Improve examples quality - 40% of rejections",
    "Create skill for 'kafka-basics' - requested 3 times",
    "Review clarity in documentation - 25% of rejections"
  ],
  "generation_time_ms": 450,
  "agents_analyzed": ["opencode", "itzamna", "speckit"]
}
```

### No Data Output

When no historical data exists:

```json
{
  "report_generated": false,
  "reason": "No agent memory data found for period 'Janeiro 2026'",
  "suggestion": "Use the system and request report after some interactions",
  "fallback_message": "System is new, no evolution data available yet"
}
```

### Partial Data Output

When some metrics are unavailable:

```json
{
  "report_generated": true,
  "warnings": [
    "Global statistics not found in MEMORY.md - calculated from agent data",
    "Skills updated count unavailable - showing 0"
  ],
  "summary": {
    "skills_created": 5,
    "skills_updated": 0,
    "approval_rate": "N/A",
    "gaps_detected": 12,
    "gaps_resolved": 5
  }
}
```

---

## Integration Points

### Upstream Dependencies

| Protocol | Dependency | Usage |
|----------|------------|-------|
| Gap Detection | Required | Provides gap logs for aggregation |
| Rejection Learning | Required | Provides rejection logs for patterns |
| Agent Memory Files | Required | Source of all session-local data |
| Global Statistics | Optional | Provides aggregated metrics |

### Downstream Consumers

| Protocol | Trigger Condition |
|----------|-------------------|
| Proactive Suggestions | User acts on "Suggested Actions" |
| Skill Generation | User requests creating top gap |

---

## Memory Contract

### Read Locations

**Multiple Agent Memories** (cross-agent aggregation):
- `memory/opencode-memory.md`
- `memory/itzamna-memory.md`
- `memory/speckit-memory.md`
- `memory/{any-agent}-memory.md`

**Pattern**: Read ALL files matching `memory/*.md` (excluding root `MEMORY.md`)

**Global Statistics**:
- `MEMORY.md` (root)

### Write Location

**Report Output**: NOT persisted by default (displayed to user)

**Optional**: User can request export to file:
- `reports/evolution-{YYYY-MM}.md`

---

## Cross-Agent Aggregation Algorithm

### Detailed Implementation

```
Function: generate_evolution_report(reporting_period)

1. DISCOVER AGENT MEMORY FILES
   agent_files = glob("memory/*.md")
   agent_files = exclude(agent_files, "memory/MEMORY.md")  # Exclude root
   
   Example result:
   [
     "memory/opencode-memory.md",
     "memory/itzamna-memory.md",
     "memory/speckit-memory.md"
   ]

2. AGGREGATE GAPS
   all_gaps = []
   FOR each file in agent_files:
     gaps = parse_table(file, section="## Gaps Detectados")
     all_gaps.extend(gaps)
   
   Result: Array of all gaps across all agents

3. AGGREGATE REJECTIONS
   all_rejections = []
   FOR each file in agent_files:
     rejections = parse_table(file, section="## Log de Rejeicoes")
     all_rejections.extend(rejections)
   
   Result: Array of all rejections across all agents

4. FILTER BY PERIOD (if specified)
   IF reporting_period is date_range:
     all_gaps = filter_by_date(all_gaps, period)
     all_rejections = filter_by_date(all_rejections, period)

5. CALCULATE METRICS
   metrics = calculate_summary(all_gaps, all_rejections)
   top_gaps = analyze_gap_frequency(all_gaps)
   patterns = analyze_rejection_patterns(all_rejections)
   actions = generate_suggestions(metrics, top_gaps, patterns)

6. FORMAT REPORT
   report = format_markdown_report(metrics, top_gaps, patterns, actions)

7. RETURN report
```

### Performance Optimization

For large datasets:

```
Optimization strategies:

1. Lazy loading: Don't load all data at once
2. Streaming: Process files one at a time
3. Caching: Cache aggregated data for 1 hour
4. Parallel reads: Read multiple agent files concurrently (if supported)
```

**Expected Performance**:
- 3 agent files × 1000 entries each = 3000 entries
- Parse + aggregate: ~300ms
- Calculate metrics: ~100ms
- Format report: ~50ms
- **Total**: <500ms (meets spec SC-004: <10 seconds)

---

## Edge Cases

### 1. No Agent Memory Files Exist

**Scenario**: Fresh system, no agents have logged data yet

**Handling**:
```
1. Report: "No evolution data available yet"
2. Explain: "System is new. Use it for a few days, then request report"
3. Do NOT generate empty report
```

### 2. Partial Period Coverage

**Scenario**: Report for "January 2026", but some agents only have data from Jan 15 onwards

**Handling**:
```
1. Include all data available in period
2. Add note: "Data available from Jan 15 onwards for agent 'opencode'"
3. Calculate metrics based on available data
```

### 3. Conflicting Global Stats

**Scenario**: Root MEMORY.md says 50 skills, but agent data shows 42 skill creations

**Handling**:
```
1. Prioritize root MEMORY.md (authoritative source)
2. Add warning: "Note: Global stats may include data from before agent memory tracking"
3. Show both if discrepancy is large
```

### 4. Very Large Dataset (>10,000 entries)

**Scenario**: Agent memory files have grown to 10,000+ entries each

**Handling**:
```
1. Limit report to specified period only (don't aggregate all-time)
2. If period not specified, default to last 30 days
3. Add note: "Report limited to recent data. For full history, specify date range"
```

### 5. Corrupted Memory File

**Scenario**: One agent's memory file is malformed (broken table)

**Handling**:
```
1. Skip corrupted file, log warning
2. Generate report from remaining valid files
3. Add warning: "Could not read memory/agent-x-memory.md - skipped"
4. Suggest: "Run memory file validation"
```

---

## Reporting Periods

### Supported Period Formats

| Format | Example | Interpretation |
|--------|---------|----------------|
| Month/Year | "Janeiro 2026" | All of January 2026 |
| Date Range | "2026-01-01 to 2026-01-31" | Specific range |
| Month Name | "January" | Current year assumed |
| Quarter | "Q1 2026" | Jan-Mar 2026 |
| "Last 30 days" | (relative) | 30 days from now |
| "All time" | (no filter) | All historical data |

### Default Period

If user doesn't specify:
- **Default**: Last 30 days
- **Rationale**: Most relevant, manageable dataset

---

## Testing & Validation

### Acceptance Scenarios

From spec User Story 4:

1. ✅ **Report generation**: User requests report → system generates with all 6 sections
2. ✅ **Accurate metrics**: All metrics match aggregated agent memory data + global stats
3. ✅ **Formatted markdown**: Report is valid markdown with tables
4. ✅ **High rejection category**: Shows in "Suggested Actions" with concrete advice

### Test Cases

**Test 1: Basic Report Generation**
```
GIVEN: 
  - 2 agent memories with gaps and rejections
  - Global stats available
WHEN: User requests "Generate evolution report"
THEN: Report includes summary, top gaps, patterns, actions
```

**Test 2: Cross-Agent Aggregation**
```
GIVEN:
  - Agent A logged gaps: ["kafka-basics", "redis-cache"]
  - Agent B logged gaps: ["kafka-basics", "docker-guide"]
WHEN: Report generated
THEN: Top gap is "kafka-basics" (count 2, appeared in both agents)
```

**Test 3: Rejection Pattern Identification**
```
GIVEN: 20 rejections across agents, 9 are "examples" (45%)
WHEN: Report generated
THEN: Patterns show "Examples: 45%" and suggested action includes improving examples
```

**Test 4: Empty Data Handling**
```
GIVEN: No agent memory files exist
WHEN: Report requested
THEN: Display "No data available yet" message, don't error
```

**Test 5: Performance (< 10 seconds)**
```
GIVEN: 5 agent files × 2000 entries each = 10,000 entries
WHEN: Report generated
THEN: Completes in <10 seconds (spec SC-004)
```

---

## Performance Considerations

### Expected Latency

| Operation | Expected Time | Dataset Size | Notes |
|-----------|---------------|--------------|-------|
| Discover agent files | < 50ms | 10 files | File system glob |
| Read 1 agent file | < 100ms | 1000 entries | Markdown parse |
| Read all agents | < 300ms | 3-5 files | Sequential reads |
| Aggregate data | < 100ms | 5000 entries | Array concatenation |
| Calculate metrics | < 100ms | 5000 entries | Grouping + counting |
| Format report | < 50ms | - | String templating |
| **Total** | **< 1 second** | **5000 entries** | Well under 10s limit |

### Scalability Considerations

| Metric | Current | Limit | Action |
|--------|---------|-------|--------|
| Agent files | 3-5 | 20 | Use parallel reads |
| Entries per agent | 1000 | 10,000 | Filter by period |
| Total entries | 5,000 | 100,000 | Archive old data |
| Report size | 2KB | 50KB | Limit top N lists |

---

## Related Documentation

- **Spec**: `specs/002-auto-increment/spec.md` (FR-010, User Story 4)
- **Data Model**: `specs/002-auto-increment/data-model.md` (EvolutionReport)
- **Implementation**: `.prompt-os/core/AUTO-INCREMENT.md` (lines 170-206)
- **Dependencies**: Gap Detection, Rejection Learning, MEMORY.md

---

**Version**: 1.0.0  
**Author**: Itzamna PromptOS  
**Status**: Complete  
**Last Updated**: 2026-02-03
