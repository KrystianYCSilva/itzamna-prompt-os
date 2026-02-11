# ARCHITECTURE.md - Itzamna PromptOS

> **Architectural Vision of the System**
> **Version:** 3.0.0

---

## 1. Overview

Itzamna PromptOS is a cognitive orchestrator that teaches AI coding agents to think with context, memory, and workflows. It implements a CoALA-inspired memory architecture with a 3-level cognitive kernel, delivering 95% token reduction vs v2.

```
                            USER
                              |
                    itzamna init / check
                              |
                              v
                   PYTHON CLI (Bootstrap)
                              |
              Detects 17 AI CLIs + Installs Templates
                              |
                              v
                      AI AGENT WORKFLOW
                              |
          K1 (Reflexive) → K2 (Deliberate) → K3 (Deep)
                              |
                              v
                    MEMORY + CONTEXT SYSTEM
                              |
        MEMORY.md (Episodic) + .context/ (Project) + CONSTITUTION.md (Semantic)
```

---

## 2. Components

### 2.1. Python CLI

Entry point for bootstrapping and status:

| Command | Description |
|---------|-------------|
| `itzamna init` | Bootstrap: detect CLIs, install kernel, create MEMORY.md, setup .context/ |
| `itzamna check` | Show status (version, detected CLIs, installed commands) |
| `itzamna version` | Show CLI version |
| `itzamna init --ai <cli>` | Bootstrap for specific CLI only |
| `itzamna init /path` | Bootstrap in specific directory |

**Implementation:** Python (typer + rich), 549 lines

### 2.2. Cognitive Kernel (K1/K2/K3)

3-level decision system inspired by cognitive science:

| Level | Name | Speed | Use Case | Data Source |
|-------|------|-------|----------|-------------|
| **K1** | Reflexive | ~100ms | Fast decisions from memory | MEMORY.md |
| **K2** | Deliberate | ~1-2s | Structured reasoning with context | .context/ directory |
| **K3** | Deep | ~5-10s | Long-term planning with rules | CONSTITUTION.md |

**Implementation:** `templates/kernel.md` (installed to each CLI)

### 2.3. Memory System (CoALA-inspired)

4-layer memory architecture based on [CoALA paper](https://arxiv.org/abs/2309.02427):

| Layer | Type | Storage | Purpose |
|-------|------|---------|---------|
| **Working Memory** | Volatile | Agent's current context window | Current task state |
| **Project Context** | JIT-loaded | `.context/` directory | Project structure, tech stack, rules |
| **Episodic Memory** | Persistent | `MEMORY.md` | Past sessions, decisions, learnings |
| **Semantic Memory** | Static | Templates + knowledge base | General knowledge, patterns |

**Key Innovation:** JIT (Just-In-Time) loading via YAML frontmatter reduces initial load from ~12K+ tokens (v2) to ~562 tokens (v3).

### 2.4. Context Engineering

`.context/` directory with two structures:

#### Lean Structure (3 files)

```
.context/
  project.md      # Project overview
  tech.md         # Tech stack
  rules.md        # Project-specific rules
```

**Use case:** Small to medium projects (< 50K LOC)

#### Enterprise Structure (10+ files)

```
.context/
  _meta/
    key-decisions.md
    project-overview.md
    tech-stack.md
  standards/
    architectural-rules.md
    code-quality.md
    testing-strategy.md
  patterns/
    architecture.md
  knowledge/
    domain-concepts.md
  workflows/
    deployment.md
  README.md
```

**Use case:** Large projects (> 50K LOC), regulated industries, multi-team

### 2.5. AI Commands

4 slash commands installed per CLI:

| Command | Description | Implementation |
|---------|-------------|----------------|
| `/itzamna.init` | Verify installation | `templates/commands/itzamna.init.md` |
| `/itzamna.status` | System status | `templates/commands/itzamna.status.md` |
| `/itzamna.memory` | Memory management | `templates/commands/itzamna.memory.md` |
| `/itzamna.context` | Context management | `templates/commands/itzamna.context.md` |

### 2.6. Core Files

Installed to each detected CLI:

1. **kernel.md** - 3-level cognitive kernel (K1/K2/K3)
2. **AGENTS.md** - Entry point with bootstrap instructions
3. **CONSTITUTION.md** - T0/T1/T2 rule hierarchy
4. **MEMORY.md** - Episodic memory template
5. **WORKFLOWS.md** - Task workflows
6. **QUALITY-GATES.md** - Quality criteria

---

## 3. Data Flow

### Bootstrap Flow (`itzamna init`)

```
1. Detect CLIs → Scan 17 directories (PATH + config)
2. For each detected CLI:
   a. Create CLI directory (e.g., .claude/)
   b. Install kernel.md
   c. Install AGENTS.md, CONSTITUTION.md
   d. Install 4 slash commands
   e. Create core/ with WORKFLOWS.md, QUALITY-GATES.md
3. Create project-wide:
   a. MEMORY.md (episodic memory template)
   b. .context/ (lean structure by default)
4. Report installation status
```

### Agent Thinking Flow

```
Agent receives task
    |
    v
K1: Check MEMORY.md for similar past tasks (~100ms)
    |
    v
K2: Load .context/ for project structure (~1-2s)
    |
    v
K3: Consult CONSTITUTION.md for rules if needed (~5-10s)
    |
    v
Execute task
    |
    v
Update MEMORY.md with learnings
```

### Memory Management Flow (`/itzamna.memory`)

```
/itzamna.memory read
    → Read current MEMORY.md
    → Display recent sessions + key learnings

/itzamna.memory update "learned X about Y"
    → Append to MEMORY.md with timestamp
    → Structured as episode

/itzamna.memory check
    → Validate MEMORY.md format
    → Check for missing frontmatter
```

### Context Management Flow (`/itzamna.context`)

```
/itzamna.context status
    → Detect structure (lean vs enterprise)
    → Show files and last modified

/itzamna.context check
    → Validate YAML frontmatter in all .md files
    → Check for required files

/itzamna.context upgrade
    → Migrate lean → enterprise structure
    → Preserve existing content

/itzamna.context update <file>
    → Update specific context file
    → Validate changes
```

---

## 4. Data Structures

### Cognitive Kernel (kernel.md)

```yaml
---
description: |
  3-level cognitive decision system (K1/K2/K3) for AI agents.
  Use when: agent starts thinking about a task.
---

# Cognitive Kernel

## K1 - Reflexive (~100ms)
Fast decisions from MEMORY.md

## K2 - Deliberate (~1-2s)
Structured reasoning with .context/

## K3 - Deep (~5-10s)
Long-term planning with CONSTITUTION.md
```

### Episodic Memory (MEMORY.md)

```yaml
---
description: |
  Episodic memory for AI agents (CoALA layer).
  Use when: storing learnings, retrieving past decisions.
---

# Memory - [Project Name]

## Recent Sessions

### 2026-02-11 - Session Title
**Context:** What was I working on?
**Actions:** What did I do?
**Learnings:** What did I learn?
**Next:** What should I do next?

## Key Learnings

- Learning 1
- Learning 2
```

### Constitution (CONSTITUTION.md)

```yaml
---
description: |
  T0/T1/T2 rule hierarchy for project governance.
  Use when: making decisions, writing code, reviewing.
---

# Constitution

## T0 - Inviolable
Security, human control, validation

## T1 - Strong
Quality, architecture, documentation

## T2 - Convention
Naming, formatting, commits
```

---

## 5. Supported CLIs (17 total)

| CLI | Commands Directory | Core Files Location | Type |
|-----|-------------------|-------------------|------|
| GitHub Copilot | `.github/agents/` | `.github/` | IDE |
| Claude Code | `.claude/commands/` | `.claude/` | CLI |
| Gemini CLI | `.gemini/commands/` | `.gemini/` | CLI |
| Cursor | `.cursor/commands/` | `.cursor/` | IDE |
| Qwen Code | `.qwen/commands/` | `.qwen/` | CLI |
| opencode | `.opencode/commands/` | `.opencode/` | CLI |
| Codex CLI | `.codex/prompts/` | `.codex/` | CLI |
| Windsurf | `.windsurf/commands/` | `.windsurf/` | IDE |
| Kilo Code | `.kilocode/commands/` | `.kilocode/` | IDE |
| Auggie CLI | `.augment/commands/` | `.augment/` | CLI |
| CodeBuddy | `.codebuddy/commands/` | `.codebuddy/` | CLI |
| Qoder CLI | `.qoder/commands/` | `.qoder/` | CLI |
| Roo Code | `.roo/commands/` | `.roo/` | IDE |
| Amazon Q CLI | `.amazonq/commands/` | `.amazonq/` | CLI |
| Amp | `.agents/` | `.agents/` | CLI |
| SHAI | `.shai/commands/` | `.shai/` | CLI |
| IBM Bob | `.bob/commands/` | `.bob/` | IDE |

---

## 6. Project Structure

### Itzamna Repository

```
itzamna-prompt-os/
  src/itzamna_cli/__init__.py   # CLI implementation (549 lines)
  templates/
    kernel.md                   # 3-level cognitive kernel
    agents-template.md          # AGENTS.md template
    constitution-template.md    # T0/T1/T2 rules
    memory-template.md          # Episodic memory template
    skill-template.md           # Skill creation (Hefesto integration)
    commands/
      itzamna.init.md
      itzamna.status.md
      itzamna.memory.md
      itzamna.context.md
    context/
      project.md                # Lean structure
      tech.md
      rules.md
      enterprise/               # Enterprise structure
  core/
    WORKFLOWS.md
    QUALITY-GATES.md
  pyproject.toml                # v3.0.0
```

### User Project (after `itzamna init`)

```
your-project/
  AGENTS.md                     # AI entry point
  CONSTITUTION.md               # T0/T1/T2 rules
  MEMORY.md                     # Episodic memory
  .context/                     # Context directory
    project.md
    tech.md
    rules.md
  .claude/                      # Per detected CLI
    commands/
      itzamna.init.md
      itzamna.status.md
      itzamna.memory.md
      itzamna.context.md
    kernel.md
    core/
      WORKFLOWS.md
      QUALITY-GATES.md
  .gemini/                      # Repeated for each CLI
    ...
```

---

## 7. Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| CoALA-inspired memory | Proven cognitive architecture for LLM agents |
| 3-level kernel (K1/K2/K3) | Balances speed vs depth in decision making |
| JIT loading via frontmatter | 95% token reduction (12K+ → 562 tokens) |
| Lean + Enterprise structures | Flexibility for projects of all sizes |
| Multi-CLI detection | Universal compatibility (17 CLIs) |
| Python CLI for bootstrap | Reliable, portable, easy to maintain |
| Markdown templates | Universal, readable, versionable |

See `docs/decisions/` for detailed ADRs.

---

## 8. Performance Metrics

| Metric | v2 | v3 | Improvement |
|--------|----|----|-------------|
| **Files** | 200+ | 14 | 95% reduction |
| **Lines** | ~15,000 | 1,354 | 91% reduction |
| **Initial tokens** | ~12K+ | ~562 | 95% reduction |
| **Bootstrap time** | ~10s | ~2s | 5x faster |
| **Memory load** | Full upfront | JIT | Lazy loading |

---

## 9. Extensibility

### Add Support for New CLI

1. Add CLI mapping to `CLI_CONFIGS` in `src/itzamna_cli/__init__.py`:
   ```python
   "new-cli": {
       "commands_dir": ".newcli/commands",
       "core_dir": ".newcli",
       "detection_path": ".newcli"
   }
   ```
2. Test detection: `itzamna check`
3. Test installation: `itzamna init --ai new-cli`

### Add New Command

1. Create `itzamna.{cmd}.md` in `templates/commands/`
2. Update `copy_commands()` in `src/itzamna_cli/__init__.py`
3. Document in README

### Customize Memory Structure

1. Edit `templates/memory-template.md`
2. Rebuild with `itzamna init` to update projects

---

## 10. Integration Points

### Hefesto Integration

When Hefesto is detected (`/hefesto.*` commands exist), Itzamna delegates skill-related tasks:

```
Agent detects skill request
    → Check for /hefesto.create
    → If exists, use Hefesto
    → Otherwise, guide user to install Hefesto
```

### Spec-kit Integration

When Spec-kit is detected (`speckit.*` commands exist), Itzamna delegates specification tasks:

```
Agent detects spec request
    → Check for speckit.specify
    → If exists, use Spec-kit
    → Otherwise, guide user to install Spec-kit
```

---

## 11. Security Considerations

| Risk | Mitigation |
|------|------------|
| Secrets in MEMORY.md | T0-SEC-01: Never include secrets hardcoded |
| Context pollution | JIT loading prevents unintended context leaks |
| Malicious templates | User controls templates directory |
| CLI detection false positives | Multi-heuristic detection (PATH + config + directories) |

---

**Last Updated:** 2026-02-11 (v3.0.0)
