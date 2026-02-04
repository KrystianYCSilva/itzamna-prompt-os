---
name: prompt-os-readme
description: ".prompt-os/ - AI System Core"
---

# .prompt-os/ - AI System Core

> **The heart of PromptOS**: Markdown-based configuration, protocols, and automation for AI agents.  
> This directory contains everything an AI agent needs to understand the system, follow rules, and execute workflows.

---

## What is .prompt-os/?

`.prompt-os/` is the **AI system core** - a collection of markdown files and scripts that define:

- **WHO** you are (Personas)
- **WHAT** you can do (Skills)
- **HOW** you should do it (Protocols & Constitution)
- **WHAT** was already done (Memory)

Everything is **prompt-based**: AI agents read markdown files and follow them. Tools are optional for human interaction.

---

## Directory Structure

```
.prompt-os/
├── core/                    # Core protocols & governance (The Brain)
├── skills/                  # Capabilities & how-to guides
├── personas/                # Role definitions & behaviors
├── templates/               # Reusable file templates
├── tools/                   # Helper scripts (optional)
├── scripts/                 # Validation & utilities
├── PROMPTOS.md              # 📖 START HERE
├── CONSTITUTION.md          # ⚖️ Rules (T0/T1/T2)
└── MEMORY.md                # 🧠 Project state
```

---

## Major Directories

### **core/** - The Brain (Protocols & Rules)

Contains the fundamental algorithms, decision-making processes, and governance rules.

**Key Components:**
- **Protocols (12):** `AUTO-INCREMENT`, `BOOTSTRAP`, `COMMAND-ROUTER`, `HUMAN-GATE`, `INPUT-CLASSIFIER`, `JIT-PROTOCOL`, `KNOWLEDGE-BASE`, `MEMORY-MANAGEMENT`, `PERSONA-GENERATOR`, `SELF-CRITIQUE`, `WEB-RESEARCH`, `WORKFLOW-ORCHESTRATOR`
- **Governance:** `core/governance/` (Maintenance rules & policies)
- **Checklists:** `core/checklists/` (Execution guides)
- **Prompts:** `core/prompts/` (Strategic AI prompts)
- **Logic:** `knowledge-base/`, `persona-generator/`, `web-research/`

See [core/INDEX.md](./core/INDEX.md) for the master registry.

### **skills/** - Capabilities (13+ skills)

How-to guides for specific domains (currently: 6 programming language baselines + 7 advanced versions). Uses **JIT sub-files** pattern for token efficiency.

See [skills/INDEX.md](./skills/INDEX.md) for complete registry.

### **personas/** - Role Definitions

Defines specific AI agent personas with behaviors, constraints, and trigger conditions.

See [personas/INDEX.md](./personas/INDEX.md) for available personas.

### **templates/** - Reusable File Templates

Standard blueprints for generating new artifacts (`ADR`, `AGENTS`, `CARD`, `SKILL`, etc.) and monitoring reports.

See [templates/INDEX.md](./templates/INDEX.md) for details.

### **tools/** - Helper Scripts

Automation scripts for humans and agents (optional):
- **JS Tools:** `brain.js`, `jit-loader.js` (Routing & Loading)
- **Shell Tools:** `setup`, `sync`, `validate`

See [tools/INDEX.md](./tools/INDEX.md) for details.

### **scripts/** - Validation

Developer tools for verifying system integrity:
- `validate-indices.py` - Verify INDEX.md consistency

---

## Quick Navigation

### For AI Agents

1. **First Visit?** → Read [PROMPTOS.md](./PROMPTOS.md) (entry point)
2. **Need Rules?** → Read [CONSTITUTION.md](./CONSTITUTION.md) (T0/T1/T2 rules)
3. **Need State?** → Read [MEMORY.md](./MEMORY.md) (project status)
4. **Need Task Details?** → See [INDEX.md](./INDEX.md) (master file registry)

### For Humans

- **System Architecture** → `core/governance/SKILL-GOVERNANCE.md`
- **Create new skill** → Use `tools/brain.js` or `templates/SKILL.template.md`
- **Understand memory** → `core/MEMORY-MANAGEMENT.md`
- **Validate files** → Run `scripts/validate-indices.py`

### Related Directories

- **[.context/](../.context/)** - AI context files (domain knowledge, workflows, standards)
- **[docs/](../docs/)** - Human-facing documentation
- **[AGENTS.md](../AGENTS.md)** - Project agent configuration

---

## Key Concepts

### Constitution (Rules)

Three-tier rule hierarchy defined in `CONSTITUTION.md`:
- **T0** (Inviolable) - Never break (security, human approval)
- **T1** (Strong) - Rarely break (SOLID principles, testing)
- **T2** (Convention) - Flexible (naming, commit style)

### Protocols

Six mandatory protocols for artifact generation:
1. **AUTO-INCREMENT** - Check for duplicates
2. **GENERATE** - Create artifact
3. **SELF-CRITIQUE** - Score 0-100
4. **HUMAN-GATE** - Await approval
5. **COMMIT** - Write files
6. **MEMORY-MANAGEMENT** - Update state

### Memory Architecture

- **MEMORY.md** - Aggregate stats + recent sessions (concise)
- **memory/{agent}-memory.md** - Agent-specific details
- **.context/workflows/** - Reusable patterns

---

## Version & Maintenance

- **Version**: 2.3.0-dev
- **Status**: Production ready
- **Current**: SPEC-011 (Slash Command Aliases) in specification
- **Next Phase**: v2.3.0 (slash commands, advanced personas, expanded skills)

Maintained by the PromptOS team. See `core/governance/INDEX-MAINTENANCE.md` for contribution guidelines.

---

*For detailed specifications, see [INDEX.md](./INDEX.md)*
