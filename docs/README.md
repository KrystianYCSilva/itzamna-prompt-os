# Itzamna PromptOS - Documentation

> Human-readable documentation for understanding, maintaining, and extending Itzamna.

---

## Documentation Index

### Core Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture, cognitive kernel, memory layers, and design decisions
- **[decisions/](./decisions/)** - Architectural Decision Records (ADRs) documenting key decisions

---

## What is Itzamna?

Itzamna PromptOS is a cognitive orchestrator that teaches AI coding agents to think with context, memory, and workflows. It transforms basic AI CLIs into intelligent, memory-aware development assistants.

### Key Objectives

1. **Cognitive architecture**: 3-level decision system (K1 reflexive, K2 deliberate, K3 deep)
2. **Memory management**: CoALA-inspired 4-layer memory architecture
3. **Context engineering**: Lean (3 files) or enterprise (10+ files) structures
4. **Multi-CLI support**: Single install bootstraps 17 AI CLIs simultaneously
5. **Token efficiency**: 95% reduction in initial context load vs v2

---

## What Does Itzamna Do?

### For AI Agents

- **Cognitive Kernel**: 3-level decision making (K1/K2/K3) with reflexive, deliberate, and deep reasoning
- **Memory System**: CoALA 4-layer memory (Working, Project Context, Episodic, Semantic)
- **Context Management**: JIT loading of project context via `.context/` directory
- **Workflow Guidance**: WORKFLOWS.md and QUALITY-GATES.md for structured development

### For Developers

- **Bootstrap projects** with `itzamna init`
- **Auto-detect** 17 AI CLIs and install kernel + commands
- **Manage memory** with `/itzamna.memory` (read/update/check MEMORY.md)
- **Manage context** with `/itzamna.context` (status/check/upgrade .context/)
- **Check status** with `itzamna check` or `/itzamna.status`

---

## Architecture Overview

```
PYTHON CLI (itzamna)  →  Bootstrap + Detection
                         ↓
                    Templates (kernel, memory, context)
                         ↓
    AI AGENT + KERNEL (K1/K2/K3)  →  MEMORY + CONTEXT
                         ↑
                    AGENTS.md
                    CONSTITUTION.md
                    MEMORY.md
```

### Components

1. **Python CLI** - Bootstrap, multi-CLI detection, status (typer + rich)
2. **Cognitive Kernel** - 3-level decision making (reflexive → deliberate → deep)
3. **Memory System** - CoALA 4-layer architecture (Working, Project Context, Episodic, Semantic)
4. **Context Engineering** - `.context/` directory with lean or enterprise structures
5. **AI Commands** - 4 slash commands per CLI (`/itzamna.*`)
6. **Core Files** - AGENTS.md, CONSTITUTION.md, WORKFLOWS.md, QUALITY-GATES.md

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

---

## Requirements

### For Users

- **At least 1 AI CLI** installed (Claude Code, Gemini CLI, Codex, Copilot, OpenCode, Cursor, Qwen, etc.)
- **Python 3.11+** for CLI installation
- **uv** or **pipx** recommended for installation

### For Projects

- **AGENTS.md** - Entry point for AI agents (installed by `itzamna init`)
- **CONSTITUTION.md** - T0/T1/T2 rule hierarchy (installed by `itzamna init`)
- **MEMORY.md** - Episodic memory (installed by `itzamna init`)
- **.context/** - Optional context directory (lean or enterprise)

---

## Key Design Decisions

See [decisions/](./decisions/) for detailed ADRs:

- **[ADR-001](./decisions/ADR-001-coala-memory.md)** - Why CoALA-inspired memory architecture
- **[ADR-002](./decisions/ADR-002-cognitive-kernel.md)** - 3-level cognitive kernel design
- **[ADR-003](./decisions/ADR-003-token-economy.md)** - Token reduction strategy (95% reduction)

---

## How to Extend Itzamna

### Add Support for New CLI

1. Add CLI mapping to `CLI_CONFIGS` in `src/itzamna_cli/__init__.py`
2. Test detection with `itzamna check`
3. Test installation with `itzamna init --ai <new-cli>`
4. Verify commands work in CLI

### Add New Command

1. Create `itzamna.{cmd}.md` in `templates/commands/`
2. Update installation logic to copy command to all CLIs
3. Document in README

### Customize Templates

1. Edit templates in `templates/` directory
2. Rebuild with `itzamna init` to update projects
3. Test with AI CLI to verify functionality

---

## Links

| Resource | URL |
|----------|-----|
| CoALA Paper | https://arxiv.org/abs/2309.02427 |
| Agent Skills Spec | https://agentskills.io |
| Main README | [../README.md](../README.md) |
| Contributing | [../CONTRIBUTING.md](../CONTRIBUTING.md) |
| Constitution (T0 Rules) | [../CONSTITUTION.md](../CONSTITUTION.md) |

---

**Itzamna Documentation** | v3.0.0 | 2026
