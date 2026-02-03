# Contract: Proactive Suggestions Protocol

**Spec**: `002-auto-increment`  
**Version**: 1.0.0  
**Created**: 2026-02-03

---

## Purpose

This contract defines the interface and workflow for proactively suggesting skill creation or improvement based on detected patterns in gap logs, rejection history, and quality metrics.

---

## Trigger Conditions

This protocol activates when:

1. **Session start** - Check for frequent unresolved gaps
2. **After gap detection** - If same gap detected 2+ times
3. **Periodic review** - User requests system health check
4. **Low quality detected** - Skill has multiple low Self-Critique scores

---

## Input Requirements

### Required Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `agent_memory` | File system | Path to memory file | `MEMORY/opencode-memory.md` |
| `gap_logs` | Agent memory | GapRecord entries | Array of gaps with counts |
| `rejection_logs` | Agent memory | RejectionRecord entries | Array of rejections by artifact |
| `skills_index` | File system | Path to INDEX.md | `.prompt-os/skills/INDEX.md` |

### Optional Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `self_critique_scores` | Agent memory | Map of skill → scores | `{"kafka-basics": [45, 52, 58]}` |
| `skill_metadata` | Skills files | Creation dates | `{"kafka-basics": "2023-01-15"}` |
| `global_statistics` | Root MEMORY.md | Aggregated stats | `{approval_rate: 85.0}` |

---

## Process Flow

### Phase 1: Analyze Gap Frequency

When checking for proactive suggestions, start with gap analysis:

```
1. Read MEMORY/{agente}-memory.md -> "## Gaps Detectados" section
2. Group gaps by suggested_skill_name
3. Count occurrences per skill name
4. Filter for:
   - status IN ["pending", "deferred"] (not created yet)
   - count >= 2 (requested multiple times)
5. Sort by count (descending)
6. Return top_gaps = {skill_name: count}
```

**Example Output**:
```json
{
  "kafka-basics": 3,
  "argocd-deploy": 2,
  "graphql-advanced": 2
}
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` line 135

**Threshold**: 2+ occurrences triggers suggestion (spec FR-008)

### Phase 2: Analyze Skill Quality

Check existing skills for quality issues:

```
1. Read MEMORY/{agente}-memory.md -> Self-Critique score logs
2. Group scores by skill name
3. FOR each skill:
     IF average_score < 60:
       -> Flag as low_quality_skill
     IF all recent scores (last 3) < 60:
       -> Flag as consistently_low_quality
4. Return skills_needing_improvement = [skill_names]
```

**Quality Thresholds** (spec FR-009):
- **Low quality**: Average Self-Critique score < 60
- **Consistently low**: Last 3 scores all < 60
- **Action**: Suggest improvement/revision

**Example Output**:
```json
{
  "low_quality_skills": [
    {
      "name": "redis-cache",
      "average_score": 58,
      "recent_scores": [55, 60, 59],
      "reason": "consistently below threshold"
    }
  ]
}
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 152-166

### Phase 3: Analyze Skill Age

Check if skills are outdated:

```
1. Read .prompt-os/skills/ directory
2. FOR each skill file:
     - Extract creation date from file metadata or frontmatter
     - Calculate age_in_years = (current_date - creation_date) / 365
     - IF age_in_years > 2:
         -> Flag as potentially_outdated
3. Return outdated_skills = [skill_names]
```

**Age Threshold** (spec FR-009):
- **Outdated**: Created > 2 years ago
- **Rationale**: Technology evolves; old skills may miss new features/best practices

**Example Output**:
```json
{
  "outdated_skills": [
    {
      "name": "docker-basics",
      "created": "2022-01-10",
      "age_years": 4.1,
      "reason": "Docker has added many features since 2022"
    }
  ]
}
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` line 166

### Phase 4: Prioritize Suggestions

Combine all analyses and prioritize:

```
Algorithm:

1. Collect all candidates:
   - Frequent gaps (count >= 2)
   - Low quality skills (score < 60)
   - Outdated skills (age > 2 years)

2. Assign priority scores:
   - Frequent gap: priority = gap_count * 10
   - Low quality: priority = (60 - avg_score) * 2
   - Outdated: priority = age_in_years * 5

3. Sort by priority (descending)
4. Take top 3 suggestions
5. Return prioritized_suggestions
```

**Priority Rationale**:
- Gap requested 3 times: priority = 30 (high urgency, users actively asking)
- Skill with score 45: priority = 30 (poor quality, user dissatisfaction)
- Skill age 4 years: priority = 20 (moderate urgency, may still work)

**Example Output**:
```json
{
  "suggestions": [
    {
      "type": "create_skill",
      "skill_name": "kafka-basics",
      "reason": "Requested 3 times",
      "priority": 30,
      "action": "Create new skill"
    },
    {
      "type": "improve_skill",
      "skill_name": "redis-cache",
      "reason": "Average score 58 (below 60)",
      "priority": 24,
      "action": "Revise and improve"
    },
    {
      "type": "update_skill",
      "skill_name": "docker-basics",
      "reason": "Created 4.1 years ago",
      "priority": 20,
      "action": "Update with latest features"
    }
  ]
}
```

### Phase 5: Present Suggestions to User

Format suggestions as user-friendly prompts:

**For Frequent Gaps** (Type: create_skill):
```
"I noticed you've asked about '{topic}' {count} times.

Currently, we don't have a dedicated skill for this topic.

Would you like me to create a skill '{suggested_name}'?
This would help with future interactions about {topic}.

[Yes, create skill] [Not now] [Maybe later]"
```

**For Low Quality Skills** (Type: improve_skill):
```
"I've noticed the skill '{skill_name}' has been scoring low in quality checks
(average score: {score}/100, threshold: 60).

Would you like me to revise and improve this skill?
I can focus on {areas_needing_work}.

[Yes, improve it] [Show me what's wrong first] [Skip for now]"
```

**For Outdated Skills** (Type: update_skill):
```
"The skill '{skill_name}' was created {years} years ago ({date}).

Since then, {technology} has evolved significantly with new features like {examples}.

Should I create an updated version of this skill?

[Yes, update it] [Show me what changed] [Keep current version]"
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 142-166

### Phase 6: User Response Handling

Process user's decision:

```
User Response Mapping:

| Response | Action |
|----------|--------|
| "Yes, create/improve/update" | Initiate skill generation workflow → HUMAN-GATE |
| "Show me what's wrong/changed" | Provide detailed analysis, then re-ask |
| "Not now" / "Skip" | Update gap status to "deferred", log decision |
| "Maybe later" | Keep gap status "pending", don't re-suggest for 7 days |
| No response (30s timeout) | Default to "not now", don't block workflow |
```

**State Updates**:
- If user accepts: Update gap status to "created" (pending generation)
- If user defers: Update gap status to "deferred" + timestamp
- If user rejects: Update gap status to "rejected"

---

## Output Specifications

### Suggestions Output

When proactive suggestions are generated:

```json
{
  "suggestions_available": true,
  "suggestion_count": 3,
  "suggestions": [
    {
      "id": "sugg-001",
      "type": "create_skill",
      "skill_name": "kafka-basics",
      "reason": "Requested 3 times",
      "priority": 30,
      "first_detected": "2026-01-15",
      "last_detected": "2026-02-03",
      "user_requests": [
        "Help me configure Kafka",
        "How do I use Kafka?",
        "Kafka streaming guide"
      ]
    }
  ],
  "presented_to_user": true,
  "awaiting_response": true
}
```

### No Suggestions Output

When no patterns warrant suggestions:

```json
{
  "suggestions_available": false,
  "reason": "No gaps exceed 2 occurrences, all skills score above 60, no skills older than 2 years",
  "next_check": "2026-02-10"
}
```

---

## Integration Points

### Upstream Dependencies

| Protocol | Dependency | Usage |
|----------|------------|-------|
| Gap Detection | Required | Provides gap logs with counts |
| Rejection Learning | Required | Provides quality context |
| SELF-CRITIQUE | Required | Provides skill quality scores |

### Downstream Consumers

| Protocol | Trigger Condition |
|----------|-------------------|
| Skill Generation Workflow | User accepts "create" or "improve" suggestion |
| HUMAN-GATE | All generated skills pass through approval |
| Gap Detection | Update gap status when suggestion accepted |

---

## Memory Contract

### Read Location

**Agent-Specific Memory**: `MEMORY/{agente}-memory.md`

**Sections Read**:
- `## Gaps Detectados` - For gap frequency analysis
- `## Log de Rejeicoes` - For quality context (if skill was rejected before)
- Self-Critique logs (if stored in memory)

**Global Statistics**: Root `MEMORY.md` (optional, for context)

### Write Location

**Agent-Specific Memory**: `MEMORY/{agente}-memory.md`

**Updates**:
- Gap status changes (pending → deferred/rejected)
- Suggestion timestamps (when suggested, when user responded)

---

## Edge Cases

### 1. Suggestion Already Acted Upon

**Scenario**: Gap "kafka-basics" detected 3 times, but skill was created in parallel session

**Handling**:
```
1. Before presenting suggestion, re-check .prompt-os/skills/INDEX.md
2. IF skill now exists:
   - Update gap status to "created"
   - Skip suggestion
   - Inform user: "Skill 'kafka-basics' was recently created"
```

**Rationale**: Prevent duplicate work across sessions.

### 2. User Repeatedly Defers Suggestion

**Scenario**: Same gap suggested 3 times, user says "not now" each time

**Handling**:
```
1. Track defer count in gap record
2. IF defer_count >= 3:
   - Stop suggesting (user clearly not interested)
   - Update status to "rejected"
   - Log: "User deferred 3 times, assuming not wanted"
```

**Rationale**: Respect user preferences, avoid nagging.

### 3. Conflicting Priorities

**Scenario**: Gap "kafka-basics" requested 2 times AND skill "redis-cache" has score 45 (both priority ~30)

**Handling**:
```
1. Present both suggestions in priority order
2. Allow user to choose which to address first
3. User can accept multiple (queue for sequential generation)
```

**Rationale**: User decides urgency based on current needs.

### 4. Outdated Skill Still Functional

**Scenario**: "docker-basics" is 4 years old but still accurate

**Handling**:
```
1. Suggestion includes: "Show me what changed"
2. If user chooses this, list new Docker features since 2022
3. User can decide if update is worth it
4. If declined, mark skill with "reviewed_YYYY-MM-DD" to skip for 1 year
```

**Rationale**: Age is heuristic; user validates if update needed.

### 5. No Agent Memory File (New Agent)

**Scenario**: First run of new agent, no `MEMORY/{agente}-memory.md` exists

**Handling**:
```
1. Pattern analysis returns: No suggestions (no data)
2. Agent initializes memory file with templates
3. Suggestions will be available after first gaps/rejections logged
```

**Rationale**: Need historical data for pattern-based suggestions.

---

## Suggestion Timing

### When to Check for Suggestions

**Trigger Points**:

1. **Session Start** (recommended):
   - User opens new conversation
   - Check for frequent gaps from previous sessions
   - Present suggestions before user asks again

2. **After Gap Detection**:
   - Gap detected, count now >= 2
   - Immediately suggest creating skill
   - Example: "This is the 2nd time you've asked about Kafka. Create skill?"

3. **On User Request**:
   - User explicitly asks: "What should I improve?"
   - Generate and present all suggestions

4. **Periodic (NOT automated)**:
   - When user runs: "Generate evolution report"
   - Report includes "Suggested Actions" section

**Anti-Pattern**: DO NOT interrupt user mid-task with suggestions

### Cooldown Periods

To avoid spam:

```
Cooldown Rules:

- Same suggestion: Don't re-suggest for 7 days if user deferred
- Same category: Don't suggest >3 skills per session
- Overall: Max 5 suggestions per session (prevent overwhelming)
```

---

## Testing & Validation

### Acceptance Scenarios

From spec User Story 3:

1. ✅ **Frequent gap (2+ times)**: "Kafka" requested 2 times → system suggests creating "kafka-basics"
2. ✅ **Low quality skill**: "redis-cache" scores <60 → system suggests improving it
3. ✅ **Outdated skill**: "docker-basics" created >2 years ago → system suggests updating

### Test Cases

**Test 1: Frequent Gap Suggestion**
```
GIVEN: MEMORY/{agente}-memory.md contains 2 gaps for "kafka-basics"
WHEN: Session starts or gap detected again
THEN: System suggests "I noticed 'kafka' was requested 2 times. Create skill?"
```

**Test 2: Low Quality Suggestion**
```
GIVEN: Skill "redis-cache" has scores [45, 52, 58] (avg 51.7)
WHEN: Proactive check runs
THEN: System suggests "Skill 'redis-cache' scoring low (51/100). Improve it?"
```

**Test 3: Outdated Skill Suggestion**
```
GIVEN: Skill "docker-basics" created 2022-01-01 (4+ years ago)
WHEN: Proactive check runs
THEN: System suggests "Skill 'docker-basics' is 4 years old. Update it?"
```

**Test 4: Multiple Suggestions Prioritization**
```
GIVEN: 
  - Gap "kafka-basics" count 3 (priority 30)
  - Skill "redis-cache" score 45 (priority 30)
  - Skill "docker-basics" age 4 years (priority 20)
WHEN: Suggestions generated
THEN: Present in order: kafka-basics, redis-cache, docker-basics
```

**Test 5: No Suggestions Available**
```
GIVEN: All gaps count=1, all skills score>60, all skills age<2 years
WHEN: Proactive check runs
THEN: No suggestions presented, silent continuation
```

---

## Performance Considerations

### Expected Latency

| Operation | Expected Time | Notes |
|-----------|---------------|-------|
| Read agent memory | < 100ms | 1000-10000 entries |
| Gap frequency analysis | < 100ms | Group + count |
| Quality score analysis | < 100ms | Average calculation |
| Skill age analysis | < 200ms | File metadata reads |
| Priority calculation | < 50ms | Arithmetic |
| **Total** | **< 500ms** | Acceptable for session start |

### When NOT to Check

**Skip proactive checks if**:
- User is mid-task (interrupts flow)
- Agent memory has <3 entries (insufficient data)
- Last check was <1 hour ago (too frequent)

---

## Related Documentation

- **Spec**: `specs/002-auto-increment/spec.md` (FR-008, FR-009)
- **Data Model**: `specs/002-auto-increment/data-model.md` (GapRecord)
- **Implementation**: `.prompt-os/core/AUTO-INCREMENT.md` (lines 130-166)
- **Dependencies**: Gap Detection, Rejection Learning, SELF-CRITIQUE

---

**Version**: 1.0.0  
**Author**: Itzamna PromptOS  
**Status**: Complete  
**Last Updated**: 2026-02-03
