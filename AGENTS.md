# AGENTS.md - Itzamna PromptOS v2.0.0

> **Version:** 2.0.0 | **Updated:** 2026-02-02
> **Architecture:** Prompt-Based (AI agents read and follow instructions)
> **Compatibility:** Claude, GPT, Gemini, Cursor, Copilot, Qwen, and any LLM

---

## READ FIRST

This file is for **GitHub's AGENTS.md convention**. For full agent behavior, see:

| File | Purpose |
|------|---------|
| **`ITZAMNA-AGENT.md`** | Main agent abstraction (identity, workflows, protocols) |
| **`.context/`** | Project context (load JIT) |
| **`.prompt-os/PROMPTOS.md`** | System entry point |
| **`.prompt-os/CONSTITUTION.md`** | T0/T1/T2 rules |

---

## Quick Start for AI Agents

```
1. READ: ITZAMNA-AGENT.md (main agent - identity, workflows, rules)
2. READ: .prompt-os/PROMPTOS.md (system entry point)
3. READ: .prompt-os/CONSTITUTION.md (inviolable rules)
4. READ: MEMORY.md (current state)
5. LOAD JIT: .context/ (project context as needed)
```

---

## How PromptOS Works

**PromptOS is NOT a code-based system.** It is a collection of **Markdown files** that AI agents **read and follow**.

```
ANY AI AGENT (Claude, Gemini, Cursor, Copilot, etc.)
         |
         v
    Reads ITZAMNA-AGENT.md (unified agent abstraction)
         |
         v
    Reads .prompt-os/PROMPTOS.md (system entry point)
         |
         v
    Follows instructions to load:
    - CONSTITUTION.md (inviolable rules)
    - core/*.md (behavioral protocols)
    - .context/ (project context - JIT)
         |
         v
    BEHAVES according to the instructions
    (no code execution required for core system)
```

---

## T0 Rules Summary (Inviolable)

| ID | Rule |
|----|------|
| T0-HUMAN-01 | NEVER create/modify file without human approval |
| T0-HUMAN-02 | ALWAYS show preview before commit |
| T0-MEMORY-01 | ALWAYS update MEMORY.md after significant actions |
| T0-SIZE-01 | Skills < 1400 tokens, Kernel < 5KB |
| T0-SOURCE-01 | ALWAYS cite sources in generated skills |

**Full rules:** See `.prompt-os/CONSTITUTION.md`

---

## Context Loading (JIT)

Load from `.context/` as needed:

| Need | Load |
|------|------|
| T0 Rules | `.context/standards/architectural-rules.md` |
| Project overview | `.context/_meta/project-overview.md` |
| Tech stack | `.context/_meta/tech-stack.md` |
| Key decisions | `.context/_meta/key-decisions.md` |
| Code quality | `.context/standards/code-quality.md` |
| Testing | `.context/standards/testing-strategy.md` |
| Architecture | `.context/patterns/architectural-overview.md` |
| Development | `.context/workflows/development-workflows.md` |
| Examples | `.context/examples/clean-architecture-structure.md` |
| Troubleshooting | `.context/troubleshooting/common-issues.md` |

**Hub:** `.context/README.md` and `.context/ai-assistant-guide.md`

---

## Core Protocols

Located in `.prompt-os/core/`:

| Protocol | Purpose |
|----------|---------|
| `SELF-CRITIQUE.md` | Quality evaluation before Human Gate |
| `AUTO-INCREMENT.md` | Gap detection, learning from rejections |
| `WEB-RESEARCH.md` | Research methodology, source validation |
| `KNOWLEDGE-BASE.md` | Knowledge management |
| `PERSONA-GENERATOR.md` | Creating and composing personas |
| `INPUT-CLASSIFIER.md` | Classify input by domain/workflow |
| `JIT-PROTOCOL.md` | Just-In-Time loading |

---

## Human Gate Protocol

**MANDATORY for all file operations:**

```
1. Generate artifact
2. Self-critique (score 0-100)
3. Show preview to human
4. WAIT for response:
   - "ok/yes/approve" → Commit
   - "view/show" → Display full content
   - "edit X" → Revise section X
   - "reject [reason]" → Learn, offer retry
   - "cancel" → Abort
```

**⚠️ NEVER skip Human Gate for file writes**

---

## Generation Pipeline (6 Phases)

```
USER REQUEST
    ↓
1. CLASSIFY → Detect type, domain, cognitive level
    ↓
2. RESEARCH → Search existing skills, find patterns
    ↓
3. GENERATE → Apply template, fill content
    ↓
4. SELF-CRITIQUE → Score 0-100, identify improvements
    ↓
╔════════════════════════════════╗
║ 5. HUMAN GATE                  ║
║    Show summary + score        ║
║    Wait for approval           ║
╚════════════════════════════════╝
    ↓
6. COMMIT → Save file, update INDEX.md, update MEMORY.md
```

---

## Project Structure

```
{project-root}/
├── ITZAMNA-AGENT.md             # Main agent abstraction
├── AGENTS.md                    # This file (GitHub convention)
├── MEMORY.md                    # Persistent state
├── README.md                    # Project overview
│
├── .context/                    # Project context (JIT)
│   ├── README.md                # Hub
│   ├── ai-assistant-guide.md    # AI protocol
│   ├── _meta/                   # Project metadata
│   ├── standards/               # T0 rules, quality standards
│   ├── patterns/                # Architecture patterns
│   ├── examples/                # Code examples
│   ├── workflows/               # Development workflows
│   └── troubleshooting/         # Common issues
│
├── .prompt-os/                  # Core system
│   ├── PROMPTOS.md              # Entry point
│   ├── CONSTITUTION.md          # T0/T1/T2 rules
│   ├── core/                    # Behavioral protocols
│   ├── templates/               # Canonical templates
│   ├── tools/                   # Optional CLI (for humans)
│   └── scripts/                 # Utility scripts
│
├── skills/                      # Skills library
│   └── INDEX.md                 # Skills index
│
├── personas/                    # Personas library
│   └── INDEX.md                 # Personas index
│
└── .{agent}/                    # Agent-specific (commands only)
    └── commands/                # SpecKit commands
```

---

## Agent-Specific Configurations

Each agent has a lightweight bootstrap file:

| Agent | Bootstrap File |
|-------|----------------|
| Claude | `CLAUDE.md` |
| Gemini | `GEMINI.md` |
| Qwen | `QWEN.md` |
| Cursor | `.cursorrules` |
| Copilot | `.github/copilot-instructions.md` |

**All point to:** `ITZAMNA-AGENT.md` → `.context/` → `.prompt-os/`

---

## SpecKit Integration

| Command | Action |
|---------|--------|
| `/speckit.constitution` | Create/sync T0 rules |
| `/speckit.specify` | Create formal specification |
| `/speckit.plan` | Generate technical plan |
| `/speckit.tasks` | Break into tasks |
| `/speckit.implement` | Execute implementation |

**Commands located in:** `.{agent}/commands/speckit.*.md`

---

## Session Start

```
"Olá! Sou Itzamna PromptOS v2.0.0.
 Última sessão: [MEMORY.last_session]
 Objetivos ativos: [MEMORY.active_goals]
 Como posso ajudar?"
```

---

**EOF** | Size: ~3KB | Version: 2.0.0
