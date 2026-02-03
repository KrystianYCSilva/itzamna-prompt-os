# Data Model: Auto-Increment Protocol

**Spec**: `002-auto-increment`  
**Version**: 1.0.0  
**Created**: 2026-02-03

---

## Overview

This document defines the 4 core data entities used by the Auto-Increment Protocol. These entities are stored as **structured Markdown tables** in agent-specific memory files (`MEMORY/{agente}-memory.md`) and global statistics file (`MEMORY.md`).

**Important**: This is a prompt-based protocol. Entities are represented as Markdown tables that AI agents read and write following structured instructions, not as database records or code objects.

---

## Entity Specifications

### 1. GapRecord

**Purpose**: Tracks detected knowledge gaps when users request topics that don't have corresponding skills.

**Storage**: `MEMORY/{agente}-memory.md` (per-agent session logs)

**Table Format** (Full Specification):

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `date` | Date | ✅ Yes | Date when gap was first detected | `2026-02-03` |
| `user_request` | String | ✅ Yes | Original user request text (excerpt) | "Help me configure Kafka" |
| `suggested_skill_name` | String | ✅ Yes | Suggested skill filename in kebab-case | `kafka-basics` |
| `status` | Enum | ✅ Yes | Current gap status (see enum below) | `pending` |
| `detection_count` | Integer | ⚠️ Optional | Number of times same gap detected | `2` |
| `first_detected` | DateTime | ⚠️ Optional | Timestamp of first detection | `2026-02-03T14:23:00Z` |
| `last_detected` | DateTime | ⚠️ Optional | Timestamp of most recent detection | `2026-02-05T09:15:00Z` |

**Status Enum Values**:
- `pending` - Gap detected, no action taken yet
- `created` - Skill was created to fill this gap
- `deferred` - User chose to proceed without creating skill
- `rejected` - User explicitly rejected skill creation

**Simplified MVP Format** (Currently Implemented):

The existing implementation uses a 4-column simplified format:

```markdown
## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "Como usar Kafka?" | kafka-basics | pending |
```

**Implementation Note**: The simplified format is acceptable for MVP. The `detection_count`, `first_detected`, and `last_detected` fields can be inferred from duplicate entries or added when pattern analysis requires precise tracking.

**Related Functional Requirements**: FR-001, FR-002, FR-003, FR-008

---

### 2. RejectionRecord

**Purpose**: Logs artifact rejections at Human Gate with categorized reasons for learning patterns.

**Storage**: `MEMORY/{agente}-memory.md` (per-agent session logs)

**Table Format** (Full Specification):

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `date` | Date | ✅ Yes | Date of rejection | `2026-02-03` |
| `artifact_type` | Enum | ✅ Yes | Type of rejected artifact (see enum) | `skill` |
| `artifact_name` | String | ✅ Yes | Name/identifier of rejected artifact | `redis-cache` |
| `reason` | String | ✅ Yes | User-provided rejection reason (verbatim) | "Exemplos incorretos" |
| `category` | Enum | ✅ Yes | Categorized reason (see enum below) | `examples` |
| `learned_action` | String | ✅ Yes | Actionable lesson from this rejection | "Testar comandos antes de mostrar" |
| `timestamp` | DateTime | ⚠️ Optional | Full timestamp with time | `2026-02-03T16:45:00Z` |

**Artifact Type Enum Values**:
- `skill` - Skill file rejected
- `persona` - Persona rejected
- `code` - Code artifact rejected
- `documentation` - Documentation rejected
- `other` - Other artifact types

**Category Enum Values** (Must Match One):
- `examples` - Examples don't work or are incorrect
- `specificity` - Too generic, vague, or superficial
- `clarity` - Confusing, hard to understand
- `completeness` - Missing sections or incomplete
- `relevance` - Not applicable or out of scope
- `other` - Doesn't match any category

**Categorization Keywords** (for AI agents):

| Category | Trigger Keywords (Portuguese/English) |
|----------|---------------------------------------|
| `examples` | exemplo errado, nao funciona, example wrong, doesn't work |
| `specificity` | generico, vago, superficial, generic, vague, shallow |
| `clarity` | confuso, nao entendi, confusing, unclear |
| `completeness` | falta, incompleto, missing, incomplete |
| `relevance` | nao aplica, fora do escopo, not applicable, out of scope |
| `other` | (any reason not matching above) |

**Simplified MVP Format** (Currently Implemented):

```markdown
## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-03 | skill | redis-cache | "Exemplos incorretos" | exemplos | Testar comandos |
```

**Implementation Note**: Current implementation uses date-only instead of full timestamp. This is acceptable for MVP since agents typically process rejections synchronously.

**Related Functional Requirements**: FR-004, FR-005, FR-006, FR-007, FR-011

---

### 3. PatternAnalysis

**Purpose**: Represents aggregated rejection patterns identified when a category exceeds 30% threshold.

**Storage**: In-memory (calculated on-demand), not persistently stored

**Attributes** (Conceptual):

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `category` | Enum | ✅ Yes | Rejection category being analyzed | `examples` |
| `occurrence_count` | Integer | ✅ Yes | Number of rejections in this category | `4` |
| `total_rejections` | Integer | ✅ Yes | Total rejections analyzed | `10` |
| `percentage` | Float | ✅ Yes | Percentage (occurrence / total * 100) | `40.0` |
| `threshold_status` | Boolean | ✅ Yes | Whether percentage exceeds 30% | `true` |
| `suggested_correction` | String | ✅ Yes | Actionable advice for future generations | "Validate all examples before Human Gate" |

**Usage Pattern**:

AI agents calculate this dynamically by:
1. Reading all `RejectionRecord` entries from `MEMORY/{agente}-memory.md`
2. Grouping by `category`
3. Calculating percentages
4. Identifying categories > 30%
5. Applying `suggested_correction` proactively in next generation

**Example Logic** (Prompt-Based):

```
IF (rejections with category "examples") / (total rejections) > 0.30:
  THEN mention: "I've noticed examples are a common concern, so I've validated all examples carefully"
```

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 122-125

**Related Functional Requirements**: FR-006, FR-007

---

### 4. EvolutionReport

**Purpose**: Periodic summary of system growth and learning, generated on-demand.

**Storage**: Generated dynamically by aggregating across:
- All `MEMORY/{agente}-memory.md` files (gap and rejection logs)
- Root `MEMORY.md` (global statistics)

**Report Structure** (Markdown Format):

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `reporting_period` | String | ✅ Yes | Time period covered (month/year or date range) | "Janeiro 2026" |
| `skills_created` | Integer | ✅ Yes | Number of new skills created | `5` |
| `skills_updated` | Integer | ✅ Yes | Number of existing skills updated | `3` |
| `approval_rate` | Float | ✅ Yes | Percentage of artifacts approved at Human Gate | `82.5` |
| `gaps_detected` | Integer | ✅ Yes | Number of knowledge gaps logged | `12` |
| `gaps_resolved` | Integer | ✅ Yes | Number of gaps with status "created" | `5` |
| `top_gaps` | Array[Object] | ✅ Yes | Top 3 most frequent unresolved gaps with counts | See below |
| `rejection_patterns` | Array[Object] | ✅ Yes | Breakdown of rejection categories with percentages | See below |
| `suggested_actions` | Array[String] | ✅ Yes | Prioritized list of recommended actions | See below |

**Nested Structures**:

**`top_gaps` Structure**:
```markdown
1. {gap_name} - {count} occurrences
2. {gap_name} - {count} occurrences
3. {gap_name} - {count} occurrences
```

**`rejection_patterns` Structure**:
```markdown
- {category1}: {percentage}% of rejections
- {category2}: {percentage}% of rejections
```

**`suggested_actions` Structure** (Prioritized):
```markdown
1. Create skill for {most_frequent_gap}
2. Improve {category_over_30%} in all skills
3. Update skills older than {threshold}
```

**Complete Report Template**:

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
```

**Cross-Agent Aggregation Algorithm**:

1. **Read all agent memory files**: Glob `MEMORY/*.md` (excluding root `MEMORY.md`)
2. **Aggregate GapRecords**: Sum all gap entries, group by `suggested_skill_name`, count occurrences
3. **Aggregate RejectionRecords**: Sum all rejection entries, group by `category`, calculate percentages
4. **Read global statistics**: Parse root `MEMORY.md` for `skills_created`, `skills_updated`, `approval_rate`
5. **Generate top gaps**: Sort gaps by occurrence count, take top 3 with status "pending" or "deferred"
6. **Generate patterns**: Calculate category percentages, highlight any > 30%
7. **Generate actions**: Prioritize by: (1) Most frequent gap, (2) Categories > 30%, (3) Old skills

**Implementation Reference**: `.prompt-os/core/AUTO-INCREMENT.md` lines 176-206

**Related Functional Requirements**: FR-010

---

## Memory Architecture

### Distributed vs. Global Memory

The Auto-Increment Protocol uses a **distributed memory architecture** to prevent concurrent write conflicts:

**Per-Agent Memory** (`MEMORY/{agente}-memory.md`):
- Each AI agent maintains its own memory file
- Logs session-local gaps and rejections
- Written to frequently during active sessions
- Independent files eliminate concurrent write conflicts

**Global Statistics** (`MEMORY.md` - root):
- Stores only aggregated, cross-agent statistics
- Examples: Total skills count, overall approval rate
- Updated less frequently (typically by humans or evolution reports)
- Read-only for most agent operations

**Example Directory Structure**:

```
MEMORY/
├── opencode-memory.md        # OpenCode agent's session logs
├── itzamna-memory.md          # ITZAMNA agent's session logs
├── speckit-memory.md          # SpecKit agent's session logs
└── ...

MEMORY.md                      # Global statistics (root)
```

**When to Write Where**:

| Operation | Write To | Rationale |
|-----------|----------|-----------|
| Log new gap | `MEMORY/{agente}-memory.md` | Session-local, agent-specific |
| Log rejection | `MEMORY/{agente}-memory.md` | Session-local, agent-specific |
| Pattern analysis | In-memory calculation | No persistence needed |
| Evolution report | Output to user (not saved) | On-demand report |
| Update skill count | `MEMORY.md` (root) | Global statistic |

---

## Data Validation Rules

### GapRecord Validation

```
MUST:
- date in ISO 8601 format (YYYY-MM-DD)
- user_request non-empty
- suggested_skill_name in kebab-case
- status one of: pending | created | deferred | rejected

SHOULD:
- detection_count >= 1 if tracked
- first_detected <= last_detected if both tracked
```

### RejectionRecord Validation

```
MUST:
- date in ISO 8601 format
- artifact_type one of: skill | persona | code | documentation | other
- artifact_name non-empty
- reason non-empty (user-provided verbatim)
- category one of: examples | specificity | clarity | completeness | relevance | other
- learned_action non-empty (actionable text)

SHOULD:
- category match keywords from reason (use categorization table)
```

### EvolutionReport Validation

```
MUST:
- reporting_period defined
- skills_created >= 0
- skills_updated >= 0
- approval_rate between 0.0 and 100.0
- gaps_detected >= gaps_resolved
- top_gaps sorted by count (descending)
- suggested_actions non-empty

SHOULD:
- rejection_patterns sum to 100%
```

---

## MVP vs. Full Implementation

### Current Simplified Format (MVP)

The existing implementation in `.prompt-os/core/AUTO-INCREMENT.md` uses simplified 4-6 column tables:

**Advantages**:
- Easier for AI agents to parse and write
- Fits in narrow console output
- Sufficient for core functionality

**Limitations**:
- Missing `detection_count`, `first_detected`, `last_detected` for gaps
- Date-only instead of full timestamps
- Harder to track precise patterns

### Future Enhancement Options (v2.1+)

If more rigorous tracking is needed:

1. **Structured Format**: Switch from Markdown tables to YAML/JSON for precise parsing
2. **Full Timestamps**: Track exact times for temporal analysis
3. **Detection Counters**: Explicit `detection_count` field for faster pattern detection
4. **Relational IDs**: Add unique IDs to cross-reference gaps with created skills

**Decision**: MVP format is acceptable for prompt-based protocols. Enhance only if analytics require precision.

---

## Related Documentation

- **Spec**: `specs/002-auto-increment/spec.md` - Functional requirements
- **Implementation**: `.prompt-os/core/AUTO-INCREMENT.md` - Agent instructions
- **Contracts**: `specs/002-auto-increment/contracts/*.md` - Protocol workflows
- **Quickstart**: `specs/002-auto-increment/quickstart.md` - Usage guide

---

**Version**: 1.0.0  
**Author**: Itzamna PromptOS  
**Status**: Complete  
**Last Updated**: 2026-02-03
