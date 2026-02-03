# Contract: Gap Detection Protocol

**Spec**: `002-auto-increment`  
**Version**: 1.0.0  
**Created**: 2026-02-03

---

## Purpose

This contract defines the interface and workflow for detecting knowledge gaps when users request topics that don't have corresponding skills in the PromptOS knowledge base.

---

## Trigger Conditions

This protocol activates when:

1. **User makes request** requiring domain knowledge or specific skill
2. **INPUT-CLASSIFIER** extracts topic/keywords from request
3. **Skills registry check** is needed to determine if coverage exists

---

## Input Requirements

### Required Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `user_request` | User message | String (original text) | "Help me configure Kafka streaming" |
| `extracted_topics` | INPUT-CLASSIFIER | Array of keywords | `["kafka", "streaming", "configuration"]` |
| `skills_registry` | File system | Path to INDEX.md | `.prompt-os/skills/INDEX.md` |

### Optional Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `agent_memory` | File system | Path to agent memory | `MEMORY/opencode-memory.md` |
| `search_context` | JIT-PROTOCOL | Skill search results | `{found: false, searched: ["kafka", "stream"]}` |

---

## Process Flow

### Phase 1: Skill Existence Check

```
1. Parse user_request to extract main topic (use INPUT-CLASSIFIER)
2. Check if skill exists:
   a. Read .prompt-os/skills/INDEX.md
   b. Search for topic keywords in skill names/descriptions
   c. Use JIT-PROTOCOL skill search (handles fuzzy matching)
3. Determine result:
   IF skill found:
     -> STOP (no gap, proceed with existing skill)
   IF no skill found:
     -> CONTINUE to Phase 2 (gap detected)
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 40-48

**Skills Registry Format**:
```markdown
## Skills Index

- kafka-basics.md - Introduction to Apache Kafka
- redis-cache.md - Redis caching patterns
```

**Search Algorithm**:
```
FOR each keyword in extracted_topics:
  Search INDEX.md for:
    - Exact match in skill filename (e.g., "kafka" -> kafka-basics.md)
    - Partial match in description
  IF any match found:
    RETURN skill_found = true
```

### Phase 2: Inform User (Gap Detected)

When gap is confirmed, present 3 options to user:

```
Output Format:

"I didn't find a skill for '{topic}' in the system.

Options:
1. I can create a skill for this topic now
2. I can help without a specific skill (quality may vary)
3. You can indicate where to find information

What do you prefer?"
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 55-62

**User Response Handling**:

| User Choice | Action | Next Step |
|-------------|--------|-----------|
| "Create now" (option 1) | Initiate skill generation | Pass to skill generation workflow + HUMAN-GATE |
| "Proceed without" (option 2) | Continue without skill | Log gap with status "deferred" |
| "Provide info" (option 3) | Wait for external resource | Continue with provided context |
| No response / unclear | Default to option 2 | Log gap with status "pending" |

### Phase 3: Log Gap to Agent Memory

For options 2 or 3 (skill not created immediately), persist gap for future reference:

```
Write to: MEMORY/{agente}-memory.md

Section: ## Gaps Detectados

Format (MVP):
| Data       | Request                    | Skill Sugerida | Status   |
|------------|----------------------------|----------------|----------|
| 2026-02-03 | "Help me configure Kafka"  | kafka-basics   | pending  |

Fields:
- Data: ISO 8601 date (YYYY-MM-DD)
- Request: Original user request (excerpt, max 50 chars)
- Skill Sugerida: Suggested skill name in kebab-case
- Status: "pending" (unless user explicitly rejected)
```

**Status Values**:
- `pending` - User deferred decision, may ask later
- `deferred` - User chose "proceed without", not urgent
- `rejected` - User explicitly said "don't create"
- `created` - Skill was created (updated after generation)

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 69-76

**Skill Name Generation**:

```
Algorithm to derive suggested_skill_name:

1. Extract primary topic from user_request (e.g., "Kafka")
2. Convert to lowercase
3. Add "-basics" or "-guide" suffix
4. Apply kebab-case formatting

Examples:
- "Configure Kafka" -> kafka-basics
- "Use Redis for caching" -> redis-cache
- "Deploy with ArgoCD" -> argocd-deploy
```

### Phase 4: Check for Repeated Gaps (Proactive Suggestion)

After logging gap, check historical data:

```
1. Read MEMORY/{agente}-memory.md
2. Count occurrences of same suggested_skill_name
3. IF count >= 2:
     -> Add note to user: "This is the {count}th time this topic was requested"
     -> Recommend creating skill more strongly
```

**Example Output**:
```
"Note: This is the 2nd time you've asked about Kafka. 
Would you like me to prioritize creating a skill for this topic?"
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` line 135

---

## Output Specifications

### Success Output

When gap is successfully detected and logged:

```json
{
  "gap_detected": true,
  "topic": "kafka",
  "suggested_skill_name": "kafka-basics",
  "user_informed": true,
  "logged_to_memory": true,
  "detection_count": 2,
  "options_presented": ["create_now", "proceed_without", "provide_info"]
}
```

### No Gap Output

When skill exists (no gap):

```json
{
  "gap_detected": false,
  "skill_found": "kafka-basics.md",
  "proceed_with_skill": true
}
```

### Error Output

When registry is unavailable or corrupted:

```json
{
  "error": true,
  "message": "Cannot access .prompt-os/skills/INDEX.md",
  "fallback": "Proceeding without gap detection"
}
```

---

## Integration Points

### Upstream Dependencies

| Protocol | Dependency | Usage |
|----------|------------|-------|
| INPUT-CLASSIFIER | Required | Extract topics from user request |
| JIT-PROTOCOL | Required | Search skills before declaring gap |
| Skills INDEX | Required | Check skill existence |

### Downstream Consumers

| Protocol | Trigger Condition |
|----------|-------------------|
| Skill Generation Workflow | User chooses "create now" |
| HUMAN-GATE | Skill generation requires approval |
| Proactive Suggestions Protocol | Detection count >= 2 |

---

## Memory Contract

### Write Location

**Agent-Specific Memory**: `MEMORY/{agente}-memory.md`

**Why**: Each agent maintains independent gap logs to prevent concurrent write conflicts. Agents operate in separate sessions and write to isolated files.

**Global Statistics**: Root `MEMORY.md` is NOT written by this protocol (read-only for gap detection).

### Write Format

```markdown
## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| {ISO_DATE} | {USER_REQUEST_EXCERPT} | {KEBAB_CASE_NAME} | {STATUS_ENUM} |
```

### Append vs. Overwrite

**Rule**: ALWAYS append new rows, NEVER overwrite existing entries.

**Rationale**: Preserves complete history for pattern analysis and detection counting.

---

## Edge Cases

### 1. Vague Topic (Unclear Skill Name)

**Scenario**: User request is too vague to derive skill name (e.g., "help me with stuff")

**Handling**:
```
1. Ask user for clarification:
   "Could you specify what topic you need help with? (e.g., a technology, process, or concept)"
2. Wait for clarification
3. Re-run gap detection with clarified topic
4. Do NOT log vague gaps
```

**Rationale**: Prevents polluting gap logs with unusable data.

### 2. Gap Covered by Different Name

**Scenario**: Skill exists but with different naming (e.g., user asks "RabbitMQ" but skill is named "message-queue-rabbitmq")

**Handling**:
```
1. JIT-PROTOCOL search should catch this (fuzzy matching)
2. If found: Inform user "Found skill: message-queue-rabbitmq (covers RabbitMQ)"
3. If missed: Log gap, human can mention existing skill during review
```

**Rationale**: Relies on JIT search quality; accepts minor false positives for safety.

### 3. Multiple Topics in Single Request

**Scenario**: User asks "Help me use Kafka with Docker"

**Handling**:
```
1. Extract both topics: ["kafka", "docker"]
2. Check each independently
3. Report gaps separately:
   - "Found skill for Docker"
   - "No skill for Kafka (do you want to create one?)"
```

**Rationale**: Each topic is independent; user may want skill for subset.

### 4. Agent Memory File Missing

**Scenario**: First run of agent, `MEMORY/{agente}-memory.md` doesn't exist

**Handling**:
```
1. Create file with template:
   ## Gaps Detectados
   
   | Data | Request | Skill Sugerida | Status |
   |------|---------|----------------|--------|
   
2. Log gap as first entry
```

**Rationale**: Self-healing; agents initialize their own memory.

---

## Performance Considerations

### Expected Latency

| Operation | Expected Time | Notes |
|-----------|---------------|-------|
| Read INDEX.md | < 100ms | Typically 50-200 lines |
| Keyword search | < 50ms | Linear scan acceptable |
| Write to agent memory | < 100ms | Append-only operation |
| **Total** | **< 500ms** | Acceptable for interactive use |

### Scalability Limits

| Metric | Limit | Mitigation |
|--------|-------|------------|
| Skills in INDEX.md | ~1000 skills | If exceeded, consider indexing |
| Gaps in memory | ~10,000 entries | Manual archival (see quickstart.md) |
| Concurrent gap detection | No limit | Independent agent files eliminate conflicts |

---

## Testing & Validation

### Acceptance Scenarios

From spec User Story 1:

1. ✅ **Gap detected and user informed**: Request "Help me configure Kafka", no skill exists, system detects gap and presents 3 options
2. ✅ **User chooses "create now"**: Gap detection triggers skill generation workflow
3. ✅ **User chooses "proceed without"**: Gap logged with status "deferred"
4. ✅ **Repeated gap (2+ times)**: System mentions "This is the 2nd time this topic was requested"

### Test Cases

**Test 1: Basic Gap Detection**
```
GIVEN: INDEX.md does not contain "kafka"
WHEN: User requests "Help with Kafka"
THEN: Gap detected, user informed, logged with status "pending"
```

**Test 2: No Gap (Skill Exists)**
```
GIVEN: INDEX.md contains "redis-cache.md"
WHEN: User requests "Help with Redis caching"
THEN: No gap detected, proceed with existing skill
```

**Test 3: Repeated Gap Detection**
```
GIVEN: MEMORY/{agente}-memory.md contains 1 entry for "kafka-basics"
WHEN: User requests "Kafka help" again
THEN: Detection count = 2, system recommends creating skill
```

**Test 4: Vague Topic Handling**
```
GIVEN: User request is "help me"
WHEN: Gap detection runs
THEN: Ask for clarification, do NOT log gap yet
```

---

## Related Documentation

- **Spec**: `specs/002-auto-increment/spec.md` (FR-001, FR-002, FR-003, FR-008)
- **Data Model**: `specs/002-auto-increment/data-model.md` (GapRecord)
- **Implementation**: `.prompt-os/core/AUTO-INCREMENT.md` (lines 34-76)
- **Dependencies**: `.prompt-os/core/INPUT-CLASSIFIER.md`, `.prompt-os/core/JIT-PROTOCOL.md`

---

**Version**: 1.0.0  
**Author**: Itzamna PromptOS  
**Status**: Complete  
**Last Updated**: 2026-02-03
