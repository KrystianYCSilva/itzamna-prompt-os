# Itzamna PromptOS

> **Cognitive orchestrator for AI coding agents**

[![Version](https://img.shields.io/badge/version-3.0.0-blue)]()
[![CoALA](https://img.shields.io/badge/inspired-CoALA-purple)](https://arxiv.org/abs/2309.02427)
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## What is Itzamna?

**Itzamna** teaches AI coding agents to think with context, memory, and workflows. It's a cognitive orchestrator that transforms basic AI CLIs into intelligent, memory-aware development assistants.

**Key capabilities:**
- **Python CLI** (`itzamna`): Bootstrap, status, check commands
- **Cognitive Kernel**: 3-level decision system (K1 reflexive, K2 deliberate, K3 deep)
- **Memory System**: CoALA-inspired 4-layer memory architecture
- **Context Engineering**: Lean (3 files) or enterprise (10+ files) structures
- **AI Slash Commands** (`/itzamna.*`): Memory & context management for agents

Named after the Mayan god of wisdom and writing, Itzamna brings intelligence to AI development workflows.

---

## Architecture

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

- **Python CLI**: Bootstrap, multi-CLI detection, status (typer + rich)
- **Cognitive Kernel**: 3-level decision making (reflexive → deliberate → deep)
- **Memory**: CoALA 4-layer architecture (Working, Project Context, Episodic, Semantic)
- **Multi-CLI**: Auto-detects and installs to 17 AI CLIs simultaneously
- **Token Efficient**: 95% reduction from v2 (~562 tokens vs ~12K+)

---

## Supported CLIs (17 total)

| CLI | Commands Directory | Core Files | Type |
|-----|-------------------|------------|------|
| GitHub Copilot | `.github/agents/` | kernel.md, AGENTS.md | IDE |
| Claude Code | `.claude/commands/` | kernel.md, AGENTS.md | CLI |
| Gemini CLI | `.gemini/commands/` | GEMINI.md, kernel.md | CLI |
| Cursor | `.cursor/commands/` | kernel.md, AGENTS.md | IDE |
| Qwen Code | `.qwen/commands/` | kernel.md, AGENTS.md | CLI |
| opencode | `.opencode/commands/` | kernel.md, AGENTS.md | CLI |
| Codex CLI | `.codex/prompts/` | kernel.md, AGENTS.md | CLI |
| Windsurf | `.windsurf/commands/` | kernel.md, AGENTS.md | IDE |
| Kilo Code | `.kilocode/commands/` | kernel.md, AGENTS.md | IDE |
| Auggie CLI | `.augment/commands/` | kernel.md, AGENTS.md | CLI |
| CodeBuddy | `.codebuddy/commands/` | kernel.md, AGENTS.md | CLI |
| Qoder CLI | `.qoder/commands/` | kernel.md, AGENTS.md | CLI |
| Roo Code | `.roo/commands/` | kernel.md, AGENTS.md | IDE |
| Amazon Q CLI | `.amazonq/commands/` | kernel.md, AGENTS.md | CLI |
| Amp | `.agents/` | kernel.md, AGENTS.md | CLI |
| SHAI | `.shai/commands/` | kernel.md, AGENTS.md | CLI |
| IBM Bob | `.bob/commands/` | kernel.md, AGENTS.md | IDE |

---

## Commands

### Python CLI

| Command | Description |
|---------|-------------|
| `itzamna init` | Bootstrap: detect CLIs, install kernel, create MEMORY.md, setup .context/ |
| `itzamna check` | Show status (version, detected CLIs, installed commands) |
| `itzamna version` | Show Itzamna CLI version |
| `itzamna init --ai <cli>` | Bootstrap for specific CLI only |
| `itzamna init /path/to/project` | Bootstrap in specific directory |

### AI Slash Commands

| Command | Description | Purpose |
|---------|-------------|---------|
| `/itzamna.init` | Verify Itzamna installation | Check if kernel, memory, context are loaded |
| `/itzamna.status` | System status | Show CLI info, memory state, context structure |
| `/itzamna.memory` | Memory management | Read/update/check MEMORY.md (episodic memory) |
| `/itzamna.context` | Context management | Manage .context/ directory (status/check/upgrade/update) |

---

## Quick Start

### 1. Install Python CLI

```bash
uv tool install itzamna-cli --from git+https://github.com/KrystianYCSilva/itzamna-prompt-os.git
```

### 2. Initialize in Your Project

```bash
cd your-project/
itzamna init        # Detects CLIs, creates kernel, MEMORY.md, .context/
itzamna check       # Verify installation
```

### 3. Use Slash Commands (in AI CLI)

```bash
# Verify installation
/itzamna.init

# Check system status
/itzamna.status

# Read memory
/itzamna.memory read

# Check context structure
/itzamna.context status
```

### 4. Let the Agent Think with Kernel

The agent now has:
- **K1** (Reflexive): Fast decisions from MEMORY.md
- **K2** (Deliberate): Structured reasoning with .context/
- **K3** (Deep): Long-term planning with CONSTITUTION.md

---

## How Itzamna Works

```
Phase 1: Detection    → Scan for AI CLI directories
Phase 2: Bootstrap    → Install kernel.md + AGENTS.md per CLI
Phase 3: Memory       → Create MEMORY.md (episodic memory template)
Phase 4: Context      → Setup .context/ (lean or enterprise)
Phase 5: Core         → Install WORKFLOWS.md, QUALITY-GATES.md
Phase 6: Commands     → Install 4 slash commands per CLI
```

---

## Installation

### Option 1: Python CLI (Recommended)

```bash
# Install globally with uv
uv tool install itzamna-cli --from git+https://github.com/KrystianYCSilva/itzamna-prompt-os.git

# Or with pipx
pipx install git+https://github.com/KrystianYCSilva/itzamna-prompt-os.git

# Or from local clone
git clone https://github.com/KrystianYCSilva/itzamna-prompt-os.git
cd itzamna-prompt-os
uv tool install .
```

See [INSTALL.md](INSTALL.md) for detailed installation instructions and troubleshooting.

### Option 2: From Source

```bash
# Clone and install in development mode
git clone https://github.com/KrystianYCSilva/itzamna-prompt-os.git
cd itzamna-prompt-os
pip install -e .

# Or with uv
uv tool install --editable .
```

### Verify Installation

```bash
itzamna version     # Check CLI version
itzamna check       # Check detected CLIs
/itzamna.init       # Check installation in AI CLI
```

---

## What `itzamna init` Injects

For each detected AI CLI:

### Core System Files

1. **kernel.md** - 3-level cognitive decision system (K1/K2/K3)
2. **AGENTS.md** - Entry point with rules and structure
3. **CONSTITUTION.md** - T0/T1/T2 rule hierarchy
4. **MEMORY.md** - Episodic memory template (CoALA-inspired)

### Slash Commands (4 per CLI)

- `/itzamna.init` - Verify installation
- `/itzamna.status` - System status
- `/itzamna.memory` - Read/update/check MEMORY.md
- `/itzamna.context` - Manage .context/ directory

### Workflows & Quality

5. **WORKFLOWS.md** - Task workflows
6. **QUALITY-GATES.md** - Quality criteria

### Context Structure (Optional)

7. **.context/** - Lean (3 files) or enterprise (10+ files)
   - `project.md` - Project overview
   - `tech.md` - Tech stack
   - `rules.md` - Project rules
   - Enterprise: `_meta/`, `standards/`, `patterns/`, `knowledge/`, `workflows/`

---

## Project Structure

```
itzamna-prompt-os/
├── src/itzamna_cli/
│   └── __init__.py           # CLI implementation (Python/Typer/Rich)
├── templates/
│   ├── kernel.md             # 3-level cognitive kernel (K1/K2/K3)
│   ├── agents-template.md    # AGENTS.md template
│   ├── constitution-template.md # T0/T1/T2 rules
│   ├── memory-template.md    # Episodic memory template
│   ├── skill-template.md     # Skill creation (Hefesto integration)
│   ├── commands/             # 4 slash commands
│   │   ├── itzamna.init.md
│   │   ├── itzamna.status.md
│   │   ├── itzamna.memory.md
│   │   └── itzamna.context.md
│   └── context/              # .context/ templates
│       ├── project.md        # Lean structure (3 files)
│       ├── tech.md
│       ├── rules.md
│       └── enterprise/       # Enterprise structure (10+ files)
│           ├── README.md
│           ├── _meta/
│           ├── standards/
│           ├── patterns/
│           ├── knowledge/
│           └── workflows/
├── core/
│   ├── WORKFLOWS.md          # Task workflows
│   └── QUALITY-GATES.md      # Quality criteria
├── CONTRIBUTING.md           # Contribution guide
├── CODE_OF_CONDUCT.md        # Community standards
├── CONSTITUTION.md           # T0 governance rules
├── LICENSE                   # MIT License
└── pyproject.toml            # v3.0.0

Total: 14 core files, 1,354 lines (95% reduction from v2)
```

### User Project (after install)

```
your-project/
├── AGENTS.md                 # AI entry point
├── CONSTITUTION.md           # T0/T1/T2 rules
├── MEMORY.md                 # Episodic memory
├── .context/                 # Context directory
│   ├── project.md
│   ├── tech.md
│   └── rules.md
├── .claude/commands/         # Commands (per detected CLI)
│   ├── itzamna.init.md
│   ├── itzamna.status.md
│   ├── itzamna.memory.md
│   └── itzamna.context.md
├── .claude/                  # Core files
│   ├── kernel.md
│   └── core/
│       ├── WORKFLOWS.md
│       └── QUALITY-GATES.md
└── ...
```

---

## Key Features

### CoALA-inspired Memory

4-layer memory architecture:
- **Working Memory**: Current task context
- **Project Context**: .context/ directory (JIT loaded)
- **Episodic Memory**: MEMORY.md (past sessions)
- **Semantic Memory**: Templates + knowledge base

### Context Engineering

**Lean structure** (3 files):
- `project.md` - Project overview
- `tech.md` - Tech stack
- `rules.md` - Project rules

**Enterprise structure** (10+ files):
- `_meta/` - Key decisions, project overview, tech stack
- `standards/` - Architecture rules, code quality, testing
- `patterns/` - Architectural patterns
- `knowledge/` - Domain concepts
- `workflows/` - Deployment, development processes

### 3-Level Cognitive Kernel

- **K1 (Reflexive)**: Fast decisions from MEMORY.md (~100ms)
- **K2 (Deliberate)**: Structured reasoning with .context/ (~1-2s)
- **K3 (Deep)**: Long-term planning with CONSTITUTION.md (~5-10s)

### Token Economy

- **Files**: 200+ (v2) → 14 (v3) — 95% reduction
- **Lines**: ~15,000 (v2) → 1,354 (v3) — 91% reduction
- **Token budget to start**: ~12K+ (v2) → ~562 (v3) — 95% reduction

### Semantic Routing

YAML frontmatter in all .md files enables:
- JIT (Just-In-Time) loading
- Metadata-driven discovery
- Efficient context switching

---

## Links

| Resource | URL |
|----------|-----|
| CoALA Paper | https://arxiv.org/abs/2309.02427 |
| Agent Skills Spec | https://agentskills.io |
| Hefesto Skill Generator | https://github.com/KrystianYCSilva/hefesto-skill-generator |
| Spec-kit | https://github.com/KrystianYCSilva/spec-kit |

---

## Also in This Repo

- **Spec-kit Integration**: Detects `speckit.*` commands and delegates specification tasks
- **Hefesto Integration**: Detects `/hefesto.*` commands and delegates skill generation
- **Enterprise Templates**: Ready-to-use .context/ structures for large projects

---

## Contributing & Governance

- See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to contribute
- See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community behavior expectations
- See [CONSTITUTION.md](./CONSTITUTION.md) for T0 governance rules
- Licensed under MIT - see [LICENSE](./LICENSE)

---

**Itzamna PromptOS** | Teaching AI agents to think | 2026
