---
description: |
  Documentation for Itzamna PromptOS: installation, usage, architecture, and what it injects into projects.
  Use when: you need to understand how to install, configure, or use Itzamna CLI.
---

# Itzamna PromptOS

Cognitive orchestrator for AI coding agents. Teaches CLIs to use context, memory, and workflows.

## What it does

- **Kernel**: 3-level decision system (K1 reflexive, K2 deliberate, K3 deep)
- **Memory**: Forces agents to read/update MEMORY.md (CoALA 4-layer memory)
- **Context**: `.context/` directory support (lean 3-file + enterprise 10+ file structures)
- **Routing**: Delegates to Hefesto (skills) and spec-kit (specs) when detected
- **Cross-CLI**: Supports 17 AI CLIs (GitHub Copilot, Claude Code, Gemini, Cursor, Qwen, opencode, Codex, Windsurf, Kilo Code, Auggie, CodeBuddy, Qoder, Roo Code, Amazon Q, Amp, SHAI, IBM Bob)

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

1. **kernel.md** - 3-level cognitive decision system (K1/K2/K3)
2. **AGENTS.md** - Entry point with rules and structure
3. **CONSTITUTION.md** - T0/T1/T2 rule hierarchy
4. **MEMORY.md** - Episodic memory template
5. **Slash commands** - 4 commands:
   - `/itzamna.init` - Verify installation
   - `/itzamna.status` - System status
   - `/itzamna.memory` - Read/update/check MEMORY.md
   - `/itzamna.context` - Manage .context/ directory (status/check/upgrade/update)
6. **Core files** - WORKFLOWS.md, QUALITY-GATES.md

## Architecture

```
itzamna-prompt-os/
├── src/itzamna_cli/__init__.py   # CLI (549 lines, Python/Typer/Rich)
├── templates/
│   ├── kernel.md                 # 3-level cognitive kernel (K1/K2/K3)
│   ├── agents-template.md        # Agent entry point (AGENTS.md)
│   ├── constitution-template.md  # T0/T1/T2 rules hierarchy
│   ├── memory-template.md        # Episodic memory template
│   ├── skill-template.md         # Skill creation (Hefesto integration)
│   ├── commands/                 # 4 slash commands
│   │   ├── itzamna.init.md
│   │   ├── itzamna.status.md
│   │   ├── itzamna.memory.md
│   │   └── itzamna.context.md
│   └── context/                  # .context/ templates
│       ├── project.md            # Lean structure (3 files)
│       ├── tech.md
│       ├── rules.md
│       └── enterprise/           # Enterprise structure (10+ files)
│           ├── README.md
│           ├── _meta/
│           ├── standards/
│           ├── patterns/
│           ├── knowledge/
│           └── workflows/
├── core/
│   ├── WORKFLOWS.md              # Task workflows
│   └── QUALITY-GATES.md          # Quality criteria
└── pyproject.toml                # v3.0.0

Total: 14 core files, 1,354 lines (95% reduction from v2)
```

## Key Features

- **CoALA-inspired Memory**: 4-layer memory architecture (Working, Project Context, Episodic, Semantic)
- **Context Engineering**: `.context/` directory with lean (3 files) or enterprise (10+ files) structures
- **Semantic Routing**: YAML frontmatter in all .md files for JIT loading
- **Cross-CLI Detection**: Auto-detects 17 AI CLIs + installs to all simultaneously
- **Token Economy**: Agent reads 1 file (~562 tokens) to start vs ~12K+ in v2

## Stats

- **Files**: 200+ (v2) → 14 (v3) — 95% reduction
- **Lines**: ~15,000 (v2) → 1,354 (v3) — 91% reduction
- **Token budget to start**: ~12K+ (v2) → ~562 (v3) — 95% reduction

## License

MIT
