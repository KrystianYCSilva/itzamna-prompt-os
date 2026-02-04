# Gap Detection

**Protocol**: WEB-RESEARCH Enhancement  
**Version**: 2.2.0  
**Purpose**: Automatic source quality gap detection with AUTO-INCREMENT integration  
**Integration**: Main protocol → `.prompt-os/core/WEB-RESEARCH.md` + `AUTO-INCREMENT.md`

---

## Introduction

This document defines **4 gap detection scenarios** that trigger automatic notifications when source quality is insufficient for reliable research. The system integrates with AUTO-INCREMENT protocol to register gaps in agent memory and prompt human decisions for resolution.

**Why gap detection matters:**
- **Proactive Quality Assurance**: Catches missing official documentation before skill generation
- **Source Recency**: Identifies outdated content that may contain obsolete information
- **Coverage Completeness**: Ensures sufficient sources to support claims
- **Reliability Baseline**: Prevents reliance on low-quality sources alone
- **Memory-Driven Evolution**: Records gaps to inform future system improvements

**Integration Point**: Triggered after validation completes for all sources, before artifact generation.

---

## 4 Gap Scenarios

### Scenario 1: Missing Official Documentation (missing_official_docs)

**Trigger Condition**: 0 Tier 1 sources found after validation

**Description**: No official documentation sources identified. Research relies entirely on community resources, tutorials, or unofficial content.

**Why this matters**: Official documentation is the authoritative, canonical source. Skills without official docs are at high risk of inaccuracy or obsolescence.

**Example**:
```
Research Topic: "Kubernetes persistent volumes"
Sources Validated:
  - medium.com blog post (Tier 3)
  - stackoverflow.com answer (Tier 3)
  - personal-blog.com tutorial (Tier 4)

Tier Distribution: {T1: 0, T2: 0, T3: 2, T4: 1, T5: 0}
Gap Triggered: missing_official_docs
```

**Suggested Action**: Search for official documentation at known domains:
- Kubernetes → `kubernetes.io/docs`
- React → `reactjs.org`, `react.dev`
- Python → `python.org/3/library`

---

### Scenario 2: Outdated Sources (outdated_sources)

**Trigger Condition**: All sources are >2 years old (max age across all sources > 730 days)

**Description**: All research sources are dated, with no recent content. For fast-evolving technologies (frameworks, cloud services, DevOps tools), 2+ year-old content often contains obsolete information.

**Why this matters**: Technology evolves rapidly. 2-year-old Kubernetes docs may miss 4-6 major versions. React best practices from 2022 predate modern hooks patterns.

**Example**:
```
Research Topic: "React state management"
Sources Validated:
  - reactjs.org/docs (Tier 1, last updated 2021-08-15 = 4.5 years ago)
  - medium.com article (Tier 4, published 2020-03-10 = 5.9 years ago)

All sources > 2 years old: TRUE
Gap Triggered: outdated_sources
```

**Suggested Action**: Search for updated content:
- Check if official docs have current version available
- Look for "2024 guide" or "2025 update" articles
- Verify best practices haven't changed significantly

**Exception**: Foundational concepts (algorithms, design patterns, mathematical proofs) may be exempt from recency requirements if content remains accurate.

---

### Scenario 3: Insufficient Coverage (insufficient_coverage)

**Trigger Condition**: <2 total sources found after validation

**Description**: Research is based on a single source or no sources at all. Insufficient triangulation to verify claims or provide comprehensive coverage.

**Why this matters**: Single-source research risks:
- Bias (one perspective only)
- Incomplete coverage (missing important details)
- Lack of verification (can't corroborate claims)
- No fallback if primary source becomes unavailable

**Example**:
```
Research Topic: "Docker networking patterns"
Sources Validated:
  - docs.docker.com/network (Tier 1, score 92)

Total Sources: 1
Gap Triggered: insufficient_coverage
```

**Suggested Action**: Add 1-2 supplementary sources:
- Official GitHub examples repository
- Stack Overflow community Q&A
- Company engineering blog with practical use cases

**Minimum Recommendation**: 2 sources for baseline skills, 3-5 sources for integration/research-heavy skills.

---

### Scenario 4: Low Reliability (low_reliability)

**Trigger Condition**: All sources score <50 points (no source reaches "acceptable" quality threshold)

**Description**: All research sources are low-quality (Tier 4-5), with no authoritative or reliable content. Research is built entirely on personal blogs, unknown sites, or severely outdated material.

**Why this matters**: Low-reliability sources increase risk of:
- Factual inaccuracies
- Untested code examples
- Deprecated practices
- Misleading guidance

**Example**:
```
Research Topic: "Emerging framework XYZ"
Sources Validated:
  - unknown-blog.com tutorial (Tier 4, score 48)
  - medium.com/@random/xyz-guide (Tier 4, score 42)
  - github.com/user/abandoned-repo (Tier 5, score 35)

All scores < 50: TRUE
Gap Triggered: low_reliability
```

**Suggested Action**:
- Search for official project documentation (if exists)
- Look for recognized authors or company engineering blogs
- Consider deferring skill creation until higher-quality sources emerge
- Document limitation explicitly if proceeding

---

## Trigger Conditions

### Detection Timing

**When**: After all sources validated, before artifact generation

**Workflow Integration**:
```
WEB-RESEARCH Phase 2: Validate Sources
  ↓
Validation complete for all N sources
  ↓
Calculate aggregate statistics:
  - tier_distribution = {T1: x, T2: y, T3: z, T4: a, T5: b}
  - avg_score = sum(scores) / N
  - max_age_days = max(current_date - source.accessed for all sources)
  - total_sources = N
  ↓
Apply gap detection rules (check 4 scenarios)
  ↓
IF any gap triggered:
  → Format gap notification
  → Register in agent memory (MEMORY-MANAGEMENT)
  → Present human decision prompt
  → Wait for resolution
  ↓
ELSE:
  → Proceed to skill generation
```

### Trigger Logic (Pseudocode)

```python
def detect_gaps(validation_results):
    gaps_detected = []
    
    # Aggregate statistics
    tier_counts = count_by_tier(validation_results)
    scores = [r.overall_score for r in validation_results]
    ages_days = [days_since(r.accessed) for r in validation_results]
    total_sources = len(validation_results)
    
    # Scenario 1: Missing Tier 1
    if tier_counts.get('T1', 0) == 0:
        gaps_detected.append({
            'type': 'missing_official_docs',
            'trigger': f'validation_found_0_T1',
            'severity': 'medium',
            'suggestion': 'Search for official documentation at known domains'
        })
    
    # Scenario 2: Outdated Sources
    if all(age > 730 for age in ages_days):  # 730 days = 2 years
        gaps_detected.append({
            'type': 'outdated_sources',
            'trigger': f'all_sources_>{max(ages_days)}_days',
            'severity': 'medium',
            'suggestion': 'Search for updated content or verify accuracy of dated sources'
        })
    
    # Scenario 3: Insufficient Coverage
    if total_sources < 2:
        gaps_detected.append({
            'type': 'insufficient_coverage',
            'trigger': f'only_{total_sources}_source',
            'severity': 'low',
            'suggestion': 'Add 1-2 supplementary sources for verification'
        })
    
    # Scenario 4: Low Reliability
    if all(score < 50 for score in scores):
        gaps_detected.append({
            'type': 'low_reliability',
            'trigger': f'all_scores_<50_avg_{avg(scores)}',
            'severity': 'high',
            'suggestion': 'Search for higher-authority sources or defer skill creation'
        })
    
    return gaps_detected
```

### Priority and Severity

| Gap Type | Severity | Impact | Blocking? |
|----------|----------|--------|-----------|
| `missing_official_docs` | Medium | High risk of inaccuracy | No, but requires human acknowledgment |
| `outdated_sources` | Medium | Obsolete information risk | No, but requires human acknowledgment |
| `insufficient_coverage` | Low | Limited perspective | No, optional to address |
| `low_reliability` | High | Credibility risk | **Recommended blocking** (human must approve proceeding) |

**Blocking Recommendation**: `low_reliability` gap should prompt strong warning. Proceeding without higher-quality sources significantly reduces skill credibility.

---

## AUTO-INCREMENT Integration

### Integration Contract

**Purpose**: Register detected gaps in agent memory for pattern tracking and proactive suggestions.

**Integration Method**: After gap detection, invoke AUTO-INCREMENT gap registration via MEMORY-MANAGEMENT protocol.

### Gap Registration Format

**Location**: `memory/{agent}-memory.md` (e.g., `memory/opencode-memory.md`)

**Table Structure**:

```markdown
## Gaps Detectados (Source Quality)

| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |
|------|----------|-------|---------|------------|----------------|
```

**Columns**:
- **Date**: Gap detection date (YYYY-MM-DD format, e.g., `2026-02-03`)
- **Gap Type**: One of 4 types (`missing_official_docs`, `outdated_sources`, `insufficient_coverage`, `low_reliability`)
- **Topic**: Research topic that triggered gap (e.g., "Kubernetes persistent volumes")
- **Trigger**: Technical trigger condition (e.g., `validation_found_0_T1`, `all_sources_>730_days`)
- **Resolution**: Human decision outcome (`Researched more`, `Accepted limitation`, `Deferred`)
- **Deferred Until**: Target date for revisiting (if deferred), or `N/A` if resolved immediately

### Example Entries

```markdown
## Gaps Detectados (Source Quality)

| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |
|------|----------|-------|---------|------------|----------------|
| 2026-02-03 | missing_official_docs | Kubernetes persistent volumes | validation_found_0_T1 | Researched more, found kubernetes.io/docs | N/A |
| 2026-02-03 | outdated_sources | React state management | all_sources_>1460_days | Accepted limitation (foundational concepts still valid) | N/A |
| 2026-02-03 | insufficient_coverage | Docker networking | only_1_source | Deferred (sufficient for baseline, will expand in v2) | 2026-03-01 |
| 2026-02-03 | low_reliability | Emerging framework XYZ | all_scores_<50_avg_42 | Deferred (no official docs exist yet) | 2026-06-01 |
```

### API Call Example

**Invocation Pattern** (conceptual, not actual code):

```python
# After gap detection completes
for gap in gaps_detected:
    auto_increment.register_gap(
        gap_type=gap['type'],
        topic=research_context.topic,
        trigger_reason=gap['trigger'],
        suggested_action=gap['suggestion'],
        severity=gap['severity']
    )
```

**AUTO-INCREMENT Protocol Response**:
1. Register gap entry in agent memory table
2. Set `Resolution` = "PENDING" (awaiting human decision)
3. Present human decision prompt (see next section)
4. Update gap entry with human resolution after decision

---

## Human Decision Workflows

### Decision Prompt Format

**When**: Immediately after gap detection, before artifact generation

**Presentation**: Inline conversational prompt with structured options

**Template**:

```
⚠️ Source quality gap detected: {gap_type}

Research Topic: {topic}
Trigger: {trigger_description}

Current sources:
  1. {url_1} → Tier {tier}, score {score}/100
  2. {url_2} → Tier {tier}, score {score}/100
  ...

Issue: {specific_issue_description}

Suggested Action: {suggestion}

Options:
1. Research more - I'll search for better sources now
2. Defer - Proceed with current sources, mark for future improvement
3. Accept limitation - Document gap, proceed with awareness

Your choice (1/2/3)?
```

### Example Prompts

#### Prompt 1: Missing Official Docs

```
⚠️ Source quality gap detected: missing_official_docs

Research Topic: Kubernetes persistent volumes
Trigger: No Tier 1 (official documentation) sources found

Current sources:
  1. https://medium.com/@blog/k8s-storage → Tier 3, score 68/100
  2. https://stackoverflow.com/questions/... → Tier 3, score 65/100

Issue: Without official Kubernetes documentation, skill may contain inaccuracies 
or miss important details about PV/PVC concepts.

Suggested Action: Search for official documentation at kubernetes.io/docs/concepts/storage/

Options:
1. Research more - I'll search for kubernetes.io docs now
2. Defer - Proceed with current sources, mark for future improvement
3. Accept limitation - Document gap, proceed with awareness

Your choice (1/2/3)?
```

#### Prompt 2: Outdated Sources

```
⚠️ Source quality gap detected: outdated_sources

Research Topic: React hooks best practices
Trigger: All sources are >2 years old (oldest: 4.5 years)

Current sources:
  1. https://reactjs.org/docs/hooks-intro.html → Tier 1, score 75/100 (last updated 2021-08-15)
  2. https://medium.com/@expert/hooks-guide → Tier 4, score 48/100 (published 2020-03-10)

Issue: React hooks patterns have evolved significantly since 2021. Modern patterns 
(useTransition, useDeferredValue, React 18 concurrent features) are missing.

Suggested Action: Search for 2024-2025 React hooks guides or React 18+ documentation

Options:
1. Research more - I'll search for updated React docs and recent guides
2. Defer - Proceed with current sources (foundational concepts still valid)
3. Accept limitation - Document as "pre-React 18" content, proceed

Your choice (1/2/3)?
```

#### Prompt 3: Low Reliability

```
⚠️ Source quality gap detected: low_reliability

Research Topic: New framework "FastAPI 2.0"
Trigger: All sources score <50 (average: 42/100)

Current sources:
  1. https://unknown-blog.com/fastapi-2 → Tier 4, score 48/100
  2. https://github.com/user/fastapi-example → Tier 5, score 35/100

Issue: All sources are low-quality (Tier 4-5) with no official documentation found. 
Skill credibility and accuracy are at high risk.

Suggested Action: Search for official FastAPI documentation or defer skill creation 
until official 2.0 release documentation is available.

⚠️ **RECOMMENDATION**: Defer skill creation. Low-reliability sources significantly 
reduce skill quality.

Options:
1. Research more - I'll search harder for official docs or recognized sources
2. Defer - Postpone skill creation until official docs available (recommended)
3. Accept limitation - Proceed anyway, document as "experimental/unverified content"

Your choice (1/2/3)?
```

### Resolution Handling

**After human responds**:

1. **Option 1: Research More**
   - Agent re-executes WEB-RESEARCH Phase 1 (search)
   - Adds new sources to validation queue
   - Re-runs validation + gap detection
   - If gap resolved: Update memory with "Researched more" + continue
   - If gap persists: Present prompt again with updated source list

2. **Option 2: Defer**
   - Update memory entry: `Resolution = "Deferred"`
   - Prompt for defer date: "When should we revisit? (YYYY-MM-DD or 'next major update')"
   - Set `Deferred Until` field
   - Add note to artifact metadata: `[DEFERRED-GAP] {gap_type} - revisit on {date}`
   - Proceed with artifact generation

3. **Option 3: Accept Limitation**
   - Update memory entry: `Resolution = "Accepted limitation"`
   - Add prominent note to artifact:
     ```yaml
     quality_notes:
       - "⚠️ Missing official documentation - content based on community sources"
       - "Last verified: 2026-02-03"
       - "Recommend re-validation when official docs available"
     ```
   - Proceed with artifact generation

### Multi-Gap Handling

**Scenario**: Multiple gaps detected simultaneously (e.g., both `missing_official_docs` AND `outdated_sources`)

**Handling**:
- Present gaps in order of severity: High → Medium → Low
- Allow individual resolution for each gap
- If user chooses "Research more" for first gap, re-check all gaps after new sources added

**Example**:
```
⚠️ Multiple source quality gaps detected (2 gaps):

Gap 1: missing_official_docs (Severity: Medium)
Gap 2: insufficient_coverage (Severity: Low)

Would you like to:
1. Address all gaps together (research more sources)
2. Address gaps individually (choose per gap)
3. Defer all gaps
4. Accept all limitations

Your choice (1/2/3/4)?
```

---

## Memory Registration Format

### Complete Example Entry

```markdown
## Gaps Detectados (Source Quality)

| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |
|------|----------|-------|---------|------------|----------------|
| 2026-02-03 | missing_official_docs | Kubernetes PVs | validation_found_0_T1 | Researched more | N/A |
| 2026-02-03 | outdated_sources | React hooks | all_sources_>1460_days | Accepted limitation | N/A |
| 2026-02-03 | insufficient_coverage | Docker networking | only_1_source | Deferred | 2026-03-01 |
| 2026-02-03 | low_reliability | Framework XYZ | all_scores_<50_avg_42 | Deferred | 2026-06-01 |
```

### Pattern Detection (AUTO-INCREMENT Feature)

**Purpose**: Identify recurring gaps to trigger proactive suggestions

**Example**:
```
Analysis: "missing_official_docs" detected 3x in last 7 days
Topics: Kubernetes, Docker, Terraform

Pattern Identified: DevOps/Cloud tools consistently missing official docs
Proactive Suggestion: "I've noticed we're missing official docs for DevOps tools. 
Would you like me to create a checklist of official doc sources to consult first?"
```

---

**Version**: 2.2.0  
**Last Updated**: 2026-02-03  
**Related**: `.prompt-os/core/WEB-RESEARCH.md`, `AUTO-INCREMENT.md`, `MEMORY-MANAGEMENT.md`, `source-validation-rules.md`

