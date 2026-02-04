# Data Model: Workflow & Persona Orchestrator

## 1. Orchestration Map

The static binding that maps each supported workflow to its default Persona and Skill set. Skills are listed in priority order (highest priority first). This order is used for eviction when the 5-skill cap is hit.

| Workflow | Persona | Skills (priority order) |
|----------|---------|-------------------------|
| `#new` | Product Owner | requirements-gathering, card-templates |
| `#impl` | Software Engineer | {stack-skill}, clean-code, software-testing |
| `#bug` | Debugger | debugging-techniques, error-handling, {stack-skill} |
| `#review` | Code Reviewer | code-quality, security-basics |
| `#docs` | Technical Writer | technical-writing, markdown |
| `#test` | QA Engineer | software-testing, tdd |
| `#arch` | Solutions Architect | system-design, architecture-patterns |

> `{stack-skill}` is resolved at runtime from the Tech Stack Profile. If unresolvable, it is omitted and a warning is shown.

---

## 2. Entities

### Orchestration Map Entry
*One row per supported workflow. Static configuration.*

| Field | Type | Description |
|-------|------|-------------|
| `workflow` | enum | The workflow identifier (e.g., `impl`, `review`). |
| `persona` | string | The canonical persona name to activate. |
| `skills` | string[] | Ordered list of skill identifiers. First = highest priority. |

### Active Context
*The resolved state after the Orchestrator processes a command. Ephemeral — reset on every new command.*

| Field | Type | Description |
|-------|------|-------------|
| `workflow` | enum | The active workflow. |
| `persona` | string | The resolved persona (default or overridden). |
| `skills` | string[] | The final skill set after stack resolution, overrides, and eviction. Max 5. |
| `stack_skill` | string? | The language-specific skill resolved from Tech Stack Profile. Null if unresolvable. |
| `warnings` | string[] | Any warnings generated (e.g., missing stack, invalid persona override). |

### Tech Stack Profile
*Read-only input. Sourced from `.context/_meta/tech-stack.md`.*

| Field | Type | Description |
|-------|------|-------------|
| `primary_language` | string | The main language of the project (e.g., `python`, `java`, `typescript`). |
| `skill_id` | string | The skill identifier that corresponds to the primary language. |
| `last_updated` | date | When the profile was last updated. Used to detect staleness. |

---

## 3. Resolution Flow

```
Command received (e.g., #impl --skills tdd --persona architect)
    ↓
1. Lookup workflow in Orchestration Map → get default persona + skills
    ↓
2. Resolve {stack-skill} from Tech Stack Profile
   - If missing/stale → WARNING, omit stack-skill
    ↓
3. Apply --persona override (if present)
   - If persona invalid → WARNING, list valid personas, use default
    ↓
4. Apply --skills override (if present)
   - Merge: explicit skills + defaults (explicit first)
   - If total > 5 → evict defaults in reverse priority order until ≤ 5
   - WARNING if eviction occurred
    ↓
5. Output Active Context → pass to JIT Protocol for loading
```

---

## 4. Validation Rules

- `skills` array length MUST be between 2 and 5 at all times.
- `persona` MUST be one of the 7 defined personas in the Orchestration Map.
- `workflow` MUST be one of the 7 supported workflows.
- `stack-skill` resolution is OPTIONAL — its absence does not block the flow.
- Warnings MUST be surfaced to the user before the workflow executes.
