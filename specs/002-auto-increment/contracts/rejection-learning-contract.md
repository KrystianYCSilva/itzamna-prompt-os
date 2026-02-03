# Contract: Rejection Learning Protocol

**Spec**: `002-auto-increment`  
**Version**: 1.0.0  
**Created**: 2026-02-03

---

## Purpose

This contract defines the interface and workflow for learning from Human Gate rejections by categorizing feedback, logging patterns, and applying corrections proactively in future generations.

---

## Trigger Conditions

This protocol activates when:

1. **Human Gate returns "reject" decision** for any artifact (skill, persona, code, documentation)
2. **User provides rejection reason** (or system prompts for it)
3. **Rejection requires categorization and persistence** for learning

---

## Input Requirements

### Required Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `artifact_type` | HUMAN-GATE | Enum | `skill` |
| `artifact_name` | HUMAN-GATE | String | `redis-cache.md` |
| `rejection_reason` | User or HUMAN-GATE | String (verbatim) | "Examples don't work correctly" |
| `rejection_timestamp` | System clock | ISO 8601 DateTime | `2026-02-03T16:45:00Z` |

### Optional Inputs

| Input | Source | Format | Example |
|-------|--------|--------|---------|
| `quality_score` | SELF-CRITIQUE | Float (0-100) | `65.0` |
| `previous_attempts` | Agent memory | Integer | `2` |

---

## Process Flow

### Phase 1: Capture Rejection Reason

When HUMAN-GATE returns "reject":

```
1. Check if rejection_reason was provided
   IF reason given:
     -> Proceed to Phase 2 (categorization)
   
   IF reason NOT given:
     -> Ask user:
        "Could you tell me why you rejected this? (helps me improve)"
     -> Wait for user response
     -> Store reason verbatim
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 83-88

**User Experience**:
- Non-blocking prompt (user can skip)
- Encouraging tone ("helps me improve")
- No forced dropdown (free text preferred for learning)

**Fallback**: If user doesn't respond, log with reason "No reason provided" and category "other"

### Phase 2: Categorize Rejection

Apply keyword matching to categorize rejection reason:

```
Algorithm:

1. Normalize rejection_reason:
   - Convert to lowercase
   - Remove punctuation
   - Split into words

2. Check category keywords:
   FOR each category in [examples, specificity, clarity, completeness, relevance]:
     IF any keyword from category found in reason:
       ASSIGN category
       BREAK
   
   IF no match:
     ASSIGN category = "other"

3. Return categorized_rejection
```

**Category Keywords** (Portuguese + English):

| Category | Keywords |
|----------|----------|
| `examples` | exemplo, errado, nao funciona, incorreto, example, wrong, doesn't work, incorrect, broken |
| `specificity` | generico, vago, superficial, raso, generic, vague, shallow, broad, too general |
| `clarity` | confuso, nao entendi, ambiguo, unclear, confusing, ambiguous, hard to understand |
| `completeness` | falta, incompleto, ausente, faltando, missing, incomplete, absent, lacks |
| `relevance` | nao aplica, fora do escopo, irrelevante, not applicable, out of scope, irrelevant, doesn't apply |
| `other` | (default if no match) |

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 94-100

**Multi-Match Handling**: If multiple categories match, use first match priority order (examples > specificity > clarity > completeness > relevance).

### Phase 3: Derive Learned Action

Generate actionable lesson from this rejection:

```
Algorithm:

Based on category, derive learned_action:

| Category | Learned Action Template |
|----------|-------------------------|
| examples | "Validate all code examples in {environment}" |
| specificity | "Add concrete use cases and scenarios" |
| clarity | "Simplify language and structure" |
| completeness | "Verify all required sections are present" |
| relevance | "Ensure artifact matches user request closely" |
| other | "Review: {first_10_words_of_reason}" |

If reason contains specific tech/tool:
  -> Include in learned_action (e.g., "Test Kafka commands before showing")
```

**Examples**:

| Rejection Reason | Category | Learned Action |
|------------------|----------|----------------|
| "Kafka examples return errors" | examples | "Test Kafka commands in Docker before showing" |
| "Too generic, no real examples" | specificity | "Add concrete Kafka use cases (pub/sub, streaming)" |
| "Structure is confusing" | clarity | "Simplify skill structure, use clear headings" |
| "Missing configuration section" | completeness | "Verify configuration section is present" |
| "Applies to RabbitMQ, not Kafka" | relevance | "Ensure artifact matches Kafka specifically" |

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` line 108

### Phase 4: Log to Agent Memory

Persist rejection for pattern analysis:

```
Write to: memory/{agente}-memory.md

Section: ## Log de Rejeicoes

Format (MVP):
| Data       | Tipo  | Item          | Motivo                  | Categoria       | Aprendizado        |
|------------|-------|---------------|-------------------------|-----------------|--------------------|
| 2026-02-03 | skill | redis-cache   | "Exemplos incorretos"   | examples        | Testar comandos    |

Fields:
- Data: ISO 8601 date (YYYY-MM-DD)
- Tipo: Artifact type (skill|persona|code|documentation|other)
- Item: Artifact name/identifier
- Motivo: User-provided reason (verbatim, quoted)
- Categoria: Categorized reason (enum)
- Aprendizado: Learned action (actionable text)
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 104-111

**Write Rules**:
- ALWAYS append (never overwrite)
- Keep original reason verbatim (preserve exact wording)
- Store date-only (full timestamp optional)
- Quote reason to preserve formatting

### Phase 5: Identify Patterns (Immediate Check)

After logging, check for immediate patterns:

```
1. Read all entries from memory/{agente}-memory.md -> Log de Rejeicoes
2. Count total rejections
3. Count rejections per category
4. Calculate percentages:
   percentage[category] = count[category] / total_rejections * 100

5. Identify patterns:
   FOR each category:
     IF percentage[category] > 30%:
       -> PATTERN DETECTED
       -> Store in session context for next generation
```

**Threshold**: 30% (spec requirement FR-006)

**Example Calculation**:
```
Total rejections: 10
Examples: 4 rejections (40%) -> PATTERN DETECTED
Clarity: 2 rejections (20%)
Other categories: 4 rejections (40%)

Result: "examples" category is a recurring issue
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 122-125

### Phase 6: Apply Learning (Next Generation)

When generating next artifact, apply learned patterns proactively:

```
BEFORE generating artifact:

1. Calculate current patterns (repeat Phase 5)
2. FOR each category with percentage > 30%:
     -> Mention explicitly in generation:
        "I've noticed {category} are a common concern, so I've {action}"

Examples:
- "I've noticed examples are a common concern, so I've validated all code examples"
- "I've noticed specificity is a common concern, so I've added concrete use cases"
- "I've noticed completeness is a common concern, so I've verified all required sections"
```

**User-Facing Message**:
```
Before presenting artifact to Human Gate:

"Note: Based on previous feedback, I've focused extra attention on {category} 
({percentage}% of recent rejections). All {specific_items} have been {action}."
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 122-125

---

## Output Specifications

### Success Output

When rejection is successfully logged and categorized:

```json
{
  "rejection_logged": true,
  "artifact_type": "skill",
  "artifact_name": "kafka-basics.md",
  "category": "examples",
  "learned_action": "Test Kafka commands in Docker before showing",
  "patterns_detected": {
    "examples": 40.0,
    "threshold_exceeded": true
  },
  "will_apply_next_generation": true
}
```

### Pattern Detection Output

When pattern analysis identifies category > 30%:

```json
{
  "pattern_detected": true,
  "category": "examples",
  "occurrence_count": 4,
  "total_rejections": 10,
  "percentage": 40.0,
  "suggested_correction": "Validate all code examples before Human Gate",
  "applies_to_next_generation": true
}
```

### No Pattern Output

When no category exceeds threshold:

```json
{
  "pattern_detected": false,
  "total_rejections": 5,
  "categories": {
    "examples": 20.0,
    "clarity": 20.0,
    "other": 60.0
  },
  "message": "No recurring pattern detected yet (need 30% threshold)"
}
```

---

## Integration Points

### Upstream Dependencies

| Protocol | Dependency | Usage |
|----------|------------|-------|
| HUMAN-GATE | Required | Provides rejection signal and reason |
| SELF-CRITIQUE | Optional | Provides quality score context |

### Downstream Consumers

| Protocol | Trigger Condition |
|----------|-------------------|
| Skill Generation | Apply learned patterns before generation |
| Evolution Reports | Aggregate rejection data for reporting |
| Proactive Suggestions | Identify low-quality skills for improvement |

---

## Memory Contract

### Write Location

**Agent-Specific Memory**: `memory/{agente}-memory.md`

**Why**: Each agent maintains independent rejection logs. Rejections are session-local learning signals.

**Global Statistics**: Root `MEMORY.md` may be updated with aggregated approval_rate, but this protocol only writes to agent memory.

### Write Format

```markdown
## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| {ISO_DATE} | {ARTIFACT_TYPE} | {NAME} | "{VERBATIM_REASON}" | {CATEGORY} | {ACTION} |
```

### Read Pattern

For pattern analysis:
```
1. Read entire "Log de Rejeicoes" section
2. Parse table (skip header, read data rows)
3. Group by "Categoria" column
4. Count occurrences
5. Calculate percentages
```

---

## Edge Cases

### 1. Rejection Without Reason

**Scenario**: User clicks "reject" but doesn't provide reason

**Handling**:
```
1. Prompt once: "Could you tell me why you rejected this?"
2. Wait 30 seconds for response
3. If no response:
   - Log with reason "No reason provided"
   - Category "other"
   - Learned action "Review: unclear issue"
4. Do NOT block workflow
```

**Rationale**: Respect user's time; optional feedback is better than forced.

### 2. Ambiguous Reason (Multiple Categories Match)

**Scenario**: Reason is "Examples are vague and incomplete"

**Matching**: Both "examples" (vague) and "completeness" (incomplete)

**Handling**:
```
1. Use priority order: examples > specificity > clarity > completeness > relevance
2. Assign category = "examples"
3. Note: Future enhancement could support multiple categories
```

**Rationale**: Single category simplifies pattern detection; first match captures primary concern.

### 3. Same Artifact Rejected Multiple Times

**Scenario**: "kafka-basics.md" rejected 3 times with different reasons

**Handling**:
```
1. Log each rejection separately (3 entries)
2. When suggesting improvements, mention:
   "This skill was rejected 3 times previously. Reasons: {list}"
3. Aggregate all learned actions when revising
```

**Rationale**: Each rejection provides unique learning signal.

### 4. Uncategorized Reason (No Keywords Match)

**Scenario**: Reason is "I just don't like it"

**Handling**:
```
1. Assign category = "other"
2. Learned action = "Review: i just don't like it"
3. Store verbatim for manual review later
```

**Rationale**: Preserves data for future analysis even if not immediately actionable.

### 5. First Rejection (No Pattern Yet)

**Scenario**: Total rejections = 1, cannot calculate meaningful percentage

**Handling**:
```
1. Log rejection normally
2. Pattern detection: No pattern (need 3+ rejections for 30% threshold)
3. Do NOT apply proactive corrections yet
4. Wait for more data
```

**Rationale**: Avoid over-fitting to single data point.

---

## Performance Considerations

### Expected Latency

| Operation | Expected Time | Notes |
|-----------|---------------|-------|
| Prompt for reason | User-dependent | 0-30 seconds |
| Categorization | < 50ms | Keyword matching |
| Write to agent memory | < 100ms | Append operation |
| Pattern analysis | < 200ms | Parse 100-1000 entries |
| **Total** | **< 500ms** | Excluding user wait time |

### Scalability Limits

| Metric | Limit | Mitigation |
|--------|-------|------------|
| Rejections in memory | ~10,000 entries | Manual archival (see quickstart.md) |
| Categorization keywords | ~50 keywords | Sufficient for 6 categories |
| Pattern analysis frequency | Every generation | Acceptable (<200ms overhead) |

---

## Testing & Validation

### Acceptance Scenarios

From spec User Story 2:

1. ✅ **Rejection with reason**: Artifact rejected with reason "Examples don't work" → categorized as "examples", logged correctly
2. ✅ **Rejection without reason**: System prompts "Could you tell me why?" and waits for input
3. ✅ **Pattern detected (>30%)**: 4/10 rejections are "examples" (40%) → system mentions "I've noticed examples are a concern" in next generation
4. ✅ **Evolution report includes patterns**: Report shows "Examples: 40% of rejections" with suggested action

### Test Cases

**Test 1: Basic Rejection Logging**
```
GIVEN: Artifact rejected with reason "Examples are wrong"
WHEN: Rejection learning protocol runs
THEN: Logged with category "examples", learned action "Validate all code examples"
```

**Test 2: Pattern Detection**
```
GIVEN: memory/{agente}-memory.md contains 10 rejections, 4 are "examples"
WHEN: Pattern analysis runs
THEN: Pattern detected (40% > 30%), applies correction to next generation
```

**Test 3: No Pattern Yet**
```
GIVEN: Only 2 rejections logged
WHEN: Pattern analysis runs
THEN: No pattern detected (insufficient data), no proactive corrections applied
```

**Test 4: Ambiguous Categorization**
```
GIVEN: Reason is "Examples are incomplete"
WHEN: Categorization runs
THEN: Category = "examples" (priority match), not "completeness"
```

**Test 5: Multiple Rejections Same Artifact**
```
GIVEN: "kafka-basics" rejected 3 times with different reasons
WHEN: Suggesting improvements
THEN: Mention "This skill was rejected 3 times" with aggregated lessons
```

---

## Categorization Reference

### Complete Keyword Lists

**Examples Category**:
```
PT: exemplo, errado, nao funciona, incorreto, falha, quebrado
EN: example, wrong, doesn't work, incorrect, fails, broken, error, bug
```

**Specificity Category**:
```
PT: generico, vago, superficial, raso, amplo
EN: generic, vague, shallow, broad, too general, not specific
```

**Clarity Category**:
```
PT: confuso, nao entendi, ambiguo, complicado, dificil de entender
EN: confusing, unclear, ambiguous, complicated, hard to understand, convoluted
```

**Completeness Category**:
```
PT: falta, incompleto, ausente, faltando, nao tem
EN: missing, incomplete, absent, lacks, doesn't have, not present
```

**Relevance Category**:
```
PT: nao aplica, fora do escopo, irrelevante, nao relacionado
EN: not applicable, out of scope, irrelevant, unrelated, doesn't apply
```

**Other Category**:
```
(No keywords - default fallback)
```

---

## Related Documentation

- **Spec**: `specs/002-auto-increment/spec.md` (FR-004, FR-005, FR-006, FR-007)
- **Data Model**: `specs/002-auto-increment/data-model.md` (RejectionRecord, PatternAnalysis)
- **Implementation**: `.prompt-os/core/AUTO-INCREMENT.md` (lines 79-125)
- **Dependencies**: `.prompt-os/core/HUMAN-GATE.md`, `.prompt-os/core/SELF-CRITIQUE.md`

---

**Version**: 1.0.0  
**Author**: Itzamna PromptOS  
**Status**: Complete  
**Last Updated**: 2026-02-03
