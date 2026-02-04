# Implementation Plan: Slash Command Aliases for PromptOS

**Spec:** `specs/011-slash-command-aliases/spec.md`  
**Created:** 2026-02-04  
**Status:** Draft

---

## 1. Executive Summary

This plan implements `/itzamna.*` slash command aliases that map to existing `#` commands, plus special introspection commands (`status`, `skill`, `memory`, `help`). The implementation requires updates to INPUT-CLASSIFIER, COMMAND-ROUTER, and all agent configuration files.

---

## 2. Technical Approach

### 2.1 Slash Command Detection

**Pattern Recognition:**
```regex
^/itzamna\.([a-z\-]+)(\s+.*)?$
```

- **Prefix:** `/itzamna.` (literal)
- **Command:** kebab-case identifier (e.g., `init`, `impl`, `add`)
- **Arguments:** Optional, following same shell-style quoting as hash commands

**Detection Location:** INPUT-CLASSIFIER.md Step 0 (already references `/itzamna.init`)

### 2.2 Command Categories

| Category | Commands | Handler |
|----------|----------|---------|
| Workflow Aliases | `init`, `add`, `sync`, `update`, `impl`, `docs`, `new`, `bug`, `review`, `test`, `arch` | Translate to `#` → COMMAND-ROUTER → WORKFLOW-ORCHESTRATOR |
| Special Commands | `status`, `skill`, `memory`, `help` | Direct handlers (no workflow execution) |

---

## 3. Integration Points

### 3.1 INPUT-CLASSIFIER.md Updates

**Current State (Line 26-29):**
```
│ 0. E UM COMANDO ROUTER?             │ → DELEGATE TO COMMAND-ROUTER.md
│    CRITERIO ESTRITO:                │
│    Deve ser o PRIMEIRO token (Regex: ^(#|/))
│    Ex: "#init", "#ini", "/itzamna.init" │
```

**Changes Required:**
1. Expand detection regex to capture full `/itzamna.*` pattern
2. Add explicit routing for special commands before COMMAND-ROUTER delegation
3. Document all valid slash commands in the protocol

**Proposed Flow:**
```
INPUT: [mensagem]
    ↓
┌─────────────────────────────────────┐
│ 0a. É SLASH COMMAND ESPECIAL?       │ → Execute directly (no workflow)
│     /itzamna.status                 │   Return system state
│     /itzamna.skill                  │   Return skill info
│     /itzamna.memory                 │   Return memory summary
│     /itzamna.help                   │   Return command list
│     /itzamna (sem subcomando)       │   Return help
└─────────────────────────────────────┘
    ↓ (não)
┌─────────────────────────────────────┐
│ 0b. É COMANDO ROUTER?               │ → DELEGATE TO COMMAND-ROUTER.md
│     ^#|^/itzamna\.                  │
└─────────────────────────────────────┘
```

### 3.2 COMMAND-ROUTER.md Updates

**Current Grammar (Section 2):**
```ebnf
command_prefix = "#" | "/" ;
command_name = "init" | "ini" | "itzamna.init" | "add" | ...
```

**Changes Required:**

1. **Expand Grammar:**
```ebnf
command_prefix = "#" | "/" ;
command_name = hash_command | slash_command ;
hash_command = "init" | "ini" | "add" | "sync" | "update" | "impl" | "docs" | "new" | "bug" | "review" | "test" | "arch" ;
slash_command = "itzamna." , hash_command ;
```

2. **Expand Router Map (Section 4):**

| Command | Subcommand | Workflow Target | Description |
|---------|------------|-----------------|-------------|
| `/itzamna.init` | * | `BOOTSTRAP.md` | Initialize project (alias) |
| `/itzamna.add` | `agent`, `core`, etc. | `BOOTSTRAP-AGENT.md` | Add components (alias) |
| `/itzamna.sync` | * | `SYNC-CONTEXT.md` | Sync context (alias) |
| `/itzamna.update` | * | `UPDATE.md` | Update system (alias) |
| `/itzamna.impl` | * | `IMPLEMENTATION.md` | Implementation (alias) |
| `/itzamna.docs` | * | `DOCUMENTATION.md` | Documentation (alias) |
| `/itzamna.new` | * | `CARD-GENERATION.md` | New card (alias) |
| `/itzamna.bug` | * | `BUG-FIXING.md` | Bug fixing (alias) |
| `/itzamna.review` | * | `CODE-REVIEW.md` | Code review (alias) |
| `/itzamna.test` | * | `TEST-GENERATION.md` | Test generation (alias) |
| `/itzamna.arch` | * | `ARCHITECTURE.md` | Architecture (alias) |

3. **Add Alias Resolution Logic:**
```
IF command matches /itzamna.{cmd}:
   TRANSLATE to #{cmd} with same arguments/flags
   CONTINUE with standard routing
```

### 3.3 WORKFLOW-ORCHESTRATOR.md Updates

**Minimal changes required** — the Orchestrator already receives workflow identifiers from COMMAND-ROUTER. The translation happens at router level.

**Verify:**
- Orchestration Map (Section 4) already supports: `new`, `impl`, `bug`, `review`, `docs`, `test`, `arch`
- No changes needed to resolution flow (Steps 1-5)

---

## 4. Special Command Handlers

### 4.1 `/itzamna.status`

**Purpose:** Display current system state without triggering workflow.

**Implementation:**
```markdown
## Active Context
- **Workflow:** {current_workflow or "none"}
- **Persona:** {active_persona or "none"}
- **Skills Loaded:** {skill_list or "none"}

## Project State
- **Initialized:** {yes/no based on .prompt-os/ existence}
- **Tech Stack:** {from .context/_meta/tech-stack.md or "not configured"}

## Memory Highlights
- **Last Action:** {from MEMORY.md}
- **Active Card:** {current CARD-XXX or "none"}
```

**Data Sources:**
- JIT Protocol Active Context (ephemeral)
- `.context/_meta/tech-stack.md`
- `MEMORY.md`

### 4.2 `/itzamna.skill [skill-name]`

**Purpose:** Show skill content or list all skills.

**Implementation:**

**Without argument (`/itzamna.skill --list` or `/itzamna.skill`):**
```markdown
## Available Skills

| Skill | Category | Description |
|-------|----------|-------------|
| clean-code | engineering | Code quality guidelines |
| ... | ... | ... |

Use `/itzamna.skill {name}` to view details.
```

**With argument (`/itzamna.skill clean-code`):**
```markdown
## Skill: clean-code

**Category:** engineering
**Source:** .prompt-os/skills/clean-code.md

### Content
{full skill content}
```

**Data Sources:**
- `.prompt-os/skills/INDEX.md`
- `.prompt-os/skills/{skill-name}.md`

### 4.3 `/itzamna.memory`

**Purpose:** Display session history and key decisions.

**Implementation:**
```markdown
## Session Memory

### Recent Actions
{last 5-10 entries from MEMORY.md ## Log section}

### Key Decisions
{from MEMORY.md ## Decisions section}

### Active Context
{from MEMORY.md ## Current State section}
```

**Data Source:** `MEMORY.md`

### 4.4 `/itzamna.help`

**Purpose:** List all available commands with usage.

**Implementation:**
```markdown
## PromptOS Commands

### Workflow Commands (alias: #{command})
| Command | Description | Example |
|---------|-------------|---------|
| `/itzamna.init` | Initialize project | `/itzamna.init my-project` |
| `/itzamna.impl` | Implement feature | `/itzamna.impl CARD-001` |
| `/itzamna.new` | Create new card | `/itzamna.new feature` |
| `/itzamna.bug` | Fix bug | `/itzamna.bug ERROR-001` |
| `/itzamna.review` | Code review | `/itzamna.review` |
| `/itzamna.test` | Generate tests | `/itzamna.test` |
| `/itzamna.docs` | Generate docs | `/itzamna.docs` |
| `/itzamna.arch` | Architecture | `/itzamna.arch` |
| `/itzamna.add` | Add component | `/itzamna.add core protocol` |
| `/itzamna.sync` | Sync context | `/itzamna.sync` |
| `/itzamna.update` | Update system | `/itzamna.update` |

### Special Commands
| Command | Description |
|---------|-------------|
| `/itzamna.status` | Show system state |
| `/itzamna.skill` | View skills |
| `/itzamna.memory` | View session memory |
| `/itzamna.help` | This help |

### Flags
- `--help`: Show command help
- `--persona {name}`: Override persona
- `--skills {s1,s2}`: Add skills
- `--dry-run`: Simulate only

Type `/itzamna.{command} --help` for detailed usage.
```

---

## 5. Agent File Updates

### 5.1 Files to Update

| File | Changes |
|------|---------|
| `AGENTS.md` | Add slash command examples to quick reference |
| `CLAUDE.md` | Add slash command syntax recognition |
| `GEMINI.md` | Add slash command syntax recognition |
| `QWEN.md` | Add slash command syntax recognition |
| `.cursorrules` | Add slash command pattern matching |

### 5.2 Content Template (for each file)

Add section:

```markdown
## Slash Commands

PromptOS supports `/itzamna.*` slash commands as aliases for `#` commands:

### Workflow Commands
- `/itzamna.init` → `#init`
- `/itzamna.impl` → `#impl`
- `/itzamna.new` → `#new`
- `/itzamna.bug` → `#bug`
- `/itzamna.review` → `#review`
- `/itzamna.test` → `#test`
- `/itzamna.docs` → `#docs`
- `/itzamna.arch` → `#arch`
- `/itzamna.add` → `#add`
- `/itzamna.sync` → `#sync`
- `/itzamna.update` → `#update`

### Special Commands (slash-only)
- `/itzamna.status` — Show system state
- `/itzamna.skill` — View skills
- `/itzamna.memory` — View memory
- `/itzamna.help` — Show help

### Detection
Slash commands MUST start at the absolute beginning of the message (first character).
Regex: `^/itzamna\.([a-z\-]+)(\s+.*)?$`
Arguments and flags follow same rules as hash commands.
**NOTE**: `/itzamna.init` in the middle of text will NOT trigger (e.g., "try /itzamna.init" → ignored).
```

---

## 6. Error Handling

### 6.1 Unknown Command

**Trigger:** `/itzamna.unknown-command`

**Suggestion Algorithm:** Levenshtein distance
- Calculate edit distance between invalid command and all valid commands
- Suggest commands with distance ≤ 3 (sharing ≥3 characters)
- If no close matches, show top 3 most common commands

**Response:**
```markdown
### ⚠️ Error: Unknown Command

> `/itzamna.unknown-command` is not a valid command.

**Did you mean:**
- `/itzamna.update` (similar spelling)

**Available commands:**
init, impl, new, bug, review, test, docs, arch, add, sync, update, status, skill, memory, help

Type `/itzamna.help` for full command list.
```

### 6.2 Missing Subcommand

**Trigger:** `/itzamna` (without `.command`)

**Response:** Same as `/itzamna.help`

---

## 7. Implementation Phases

### Phase 1: Core Infrastructure (P1)

**Tasks:**
1. [ ] Update INPUT-CLASSIFIER.md with slash command detection
2. [ ] Update COMMAND-ROUTER.md with expanded grammar and router map
3. [ ] Add alias translation logic (slash → hash)
4. [ ] Test basic workflow commands via slash syntax

**Deliverables:**
- Modified `INPUT-CLASSIFIER.md`
- Modified `COMMAND-ROUTER.md`
- All workflow commands work via `/itzamna.*`

### Phase 2: Special Commands (P2)

**Tasks:**
1. [ ] Implement `/itzamna.status` handler
2. [ ] Implement `/itzamna.skill` handler
3. [ ] Implement `/itzamna.memory` handler
4. [ ] Test special commands don't trigger workflows

**Deliverables:**
- Special command handlers in INPUT-CLASSIFIER.md
- Response templates for each special command

### Phase 3: Help & Discovery (P3)

**Tasks:**
1. [ ] Implement `/itzamna.help` handler
2. [ ] Add `--help` support for all slash commands
3. [ ] Implement error suggestions for unknown commands
4. [ ] Update all agent configuration files

**Deliverables:**
- Help system implemented
- Error handling with suggestions
- Updated: AGENTS.md, CLAUDE.md, GEMINI.md, QWEN.md, .cursorrules

---

## 8. Testing Approach

### 8.1 Unit Tests (Manual Verification)

| Test Case | Input | Expected Output |
|-----------|-------|-----------------|
| TC-001 | `/itzamna.init my-project` | Routes to `#init my-project` workflow |
| TC-002 | `/itzamna.impl --persona architect` | Routes to `#impl` with persona override |
| TC-003 | `/itzamna.status` | Returns system state, no workflow |
| TC-004 | `/itzamna.skill clean-code` | Returns skill content |
| TC-005 | `/itzamna.help` | Returns command list |
| TC-006 | `/itzamna` | Returns help (same as TC-005) |
| TC-007 | `/itzamna.invalid` | Returns error with suggestions |
| TC-008 | `/itzamna.impl "arg with spaces"` | Parses quoted argument correctly |
| TC-009 | `text /itzamna.init` | Does NOT trigger (not at start) |

### 8.2 Cross-Model Validation

Test each command with:
- [ ] Claude (via CLAUDE.md)
- [ ] Gemini (via GEMINI.md)
- [ ] Copilot (via .cursorrules)
- [ ] Generic agents (via AGENTS.md)

### 8.3 Regression Tests

Verify hash commands still work:
- [ ] `#init` still works
- [ ] `#impl` still works
- [ ] All shortcuts unchanged

---

## 9. Success Criteria Mapping

| Spec Criteria | Implementation | Verification |
|---------------|----------------|--------------|
| SC-001: Identical output within 1s | Alias translation, same routing | TC-001, TC-002 |
| SC-002: 100% commands documented | Help system | TC-005 |
| SC-003: Special commands no workflow | Direct handlers | TC-003, TC-004 |
| SC-004: Error suggestions | Unknown command handler | TC-007 |
| SC-005: Agent files updated | Phase 3 | File review |
| SC-006: Cross-model validation | Testing phase | Cross-model tests |

---

## 10. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Conflict with other `/` commands | Low | High | Use unique prefix `/itzamna.` |
| Regex complexity | Medium | Medium | Test thoroughly, keep simple |
| Special commands accessing protected state | Low | Medium | Read-only handlers only |
| Agent files not recognizing pattern | Medium | High | Explicit examples in each file |

---

## 11. File Change Summary

| File | Change Type | Priority |
|------|-------------|----------|
| `.prompt-os/core/INPUT-CLASSIFIER.md` | Modify | P1 |
| `.prompt-os/core/COMMAND-ROUTER.md` | Modify | P1 |
| `AGENTS.md` | Modify | P3 |
| `CLAUDE.md` | Modify | P3 |
| `GEMINI.md` | Modify | P3 |
| `QWEN.md` | Modify | P3 |
| `.cursorrules` | Modify | P3 |

---

*plan.md — SPEC-011 Implementation Plan | v1.0 | 2026-02-04*
