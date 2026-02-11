---
description: |
  Documentation for Itzamna PromptOS: installation, usage, architecture, and what it injects into projects.
  Use when: you need to understand how to install, configure, or use Itzamna CLI.
---

# Itzamna PromptOS

Cognitive orchestrator for AI coding agents. Teaches CLIs to use context, memory, and workflows.

## What it does

- **Kernel**: 3-level decision system (K1 reflexive, K2 deliberate, K3 deep)
- **Memory**: Forces agents to read/update MEMORY.md (CoALA-inspired)
- **Routing**: Delegates to Hefesto (skills) and spec-kit (specs) when detected
- **Cross-CLI**: Works with Claude, Gemini, Codex, Cursor, OpenCode, Qwen

## Install

```bash
uv tool install itzamna-cli --from git+https://github.com/KrystianYCSilva/itzamna-prompt-os.git
```

Or from source:

```bash
pip install -e .
```

## Usage

```bash
itzamna init                  # Bootstrap in current project
itzamna init /path/to/project # Bootstrap in specific directory
itzamna init --ai claude      # Target specific CLI
itzamna check                 # Show system status
itzamna version               # Show version
```

## What `itzamna init` injects

For each detected AI CLI:

1. **kernel.md** - 3-level cognitive decision system
2. **AGENTS.md** - Entry point with rules and structure
3. **CONSTITUTION.md** - T0/T1/T2 rule hierarchy
4. **MEMORY.md** - Project state template
5. **Slash commands** - `/itzamna.init`, `/itzamna.status`, `/itzamna.memory`
6. **Core files** - WORKFLOWS.md, QUALITY-GATES.md

## Architecture

```
itzamna-prompt-os/
├── src/itzamna_cli/__init__.py   # CLI (Python/Typer/Rich)
├── templates/
│   ├── kernel.md                 # 3-level cognitive kernel
│   ├── agents-template.md        # Agent entry point
│   ├── constitution-template.md  # Rules hierarchy
│   ├── memory-template.md        # Project state
│   ├── skill-template.md         # Skill creation template
│   └── commands/                 # Slash commands
│       ├── itzamna.init.md
│       ├── itzamna.status.md
│       └── itzamna.memory.md
├── core/
│   ├── WORKFLOWS.md              # Task workflows
│   └── QUALITY-GATES.md          # Quality criteria
└── pyproject.toml
```

## License

MIT
