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
├── core/                    # Core protocols & algorithms
├── skills/                  # Capabilities & how-to guides
├── personas/                # Role definitions & behaviors
├── templates/               # Reusable file templates
├── tools/                   # Helper scripts (optional)
├── prompts/                 # AI generation prompts
├── checklists/              # Protocol checklists
├── docs/                    # Internal documentation
├── scripts/                 # Validation & utilities
├── PROMPTOS.md              # 📖 START HERE
├── CONSTITUTION.md          # ⚖️ Rules (T0/T1/T2)
└── MEMORY.md                # 🧠 Project state
```

---

## Major Directories

### **core/** - Core Protocols (9 files)

Defines the fundamental algorithms and decision-making processes:

- `AUTO-INCREMENT.md` - Version tracking and gap detection
- `HUMAN-GATE.md` - Approval workflow for artifacts
- `INPUT-CLASSIFIER.md` - Classify user requests to workflows
- `JIT-PROTOCOL.md` - Just-In-Time loading (token efficiency)
- `KNOWLEDGE-BASE.md` - RAG and knowledge retrieval system
- `MEMORY-MANAGEMENT.md` - Memory architecture (3 layers)
- `PERSONA-GENERATOR.md` - Generate personas dynamically
- `SELF-CRITIQUE.md` - Self-evaluation framework (0-100 scoring)
- `WEB-RESEARCH.md` - Research & source validation protocol

See [core/README.md](./core/README.md) for detailed descriptions.

### **skills/** - Capabilities & Guidelines (13+ skills)

How-to guides for specific domains (currently: 6 programming language baselines + 7 advanced versions):

- `linguagens/c-cpp/SKILL.md` - C/C++ fundamentals
- `linguagens/go/SKILL.md` - Go fundamentals
- `linguagens/java/SKILL.md` - Java fundamentals + advanced versions (Java 8, 11, 17, 21, 23)
- `linguagens/javascript/SKILL.md` - JavaScript fundamentals
- `linguagens/kotlin/SKILL.md` - Kotlin fundamentals + advanced (K2 compiler)
- `linguagens/python/SKILL.md` - Python fundamentals

**Note:** Skills use **JIT sub-files** pattern to stay under 1,400 token limit.

See [skills/INDEX.md](./skills/INDEX.md) for complete registry.

### **personas/** - Role Definitions

Defines specific AI agent personas with behaviors, constraints, and communication styles:

- Role-specific prompts and instructions
- Decision-making frameworks
- Tone and communication guidelines
- Trigger conditions for activation

See [personas/INDEX.md](./personas/INDEX.md) for available personas.

### **templates/** - Reusable File Templates (8 files)

Standard templates for generating new artifacts:

- `ADR.template.md` - Architecture Decision Records
- `AGENTS.template.md` - Agent bootstrap files
- `CARD.template.md` - Feature cards
- `INDEX.template.md` - Directory indices
- `MEMORY.template.md` - Memory files
- `SKILL.template.md` - New skills
- `TEST-PLAN.template.md` - Test planning
- Standard section headers and metadata patterns

### **tools/** - Helper Scripts (8 tools)

Automation scripts for humans and agents (optional):

- `brain.js` - Main CLI for artifact generation
- `input-classifier.js` - Classify user requests
- `jit-loader.js` - Load skills intelligently
- `tier-system.js` - Manage skill tiers
- `setup-promptos-brain.sh` / `.ps1` - Installation scripts
- `sync-constitution.ps1` - Sync rules across project
- `validate-skill.ps1` - Validate new skills

See [tools/README.md](./tools/README.md) for details.

### **prompts/** - AI Generation Prompts (3 files)

Prompts used to generate skills, personas, and research workflows:

- `skill-generator-prompt.md` - Generate new skills
- `persona-generator-prompt.md` - Generate personas
- `research-pipeline-prompt.md` - Research workflow

These are used by `.prompt-os/core/PERSONA-GENERATOR.md` and WEB-RESEARCH.md.

### **checklists/** - Protocol Checklists (1 file)

Execution checklists for complex protocols:

- `PROTOCOL-APPLICATION.md` - Human-readable checklist for mandatory protocols

### **docs/** - Internal Documentation (2 files)

Governance and maintenance guides:

- `INDEX-MAINTENANCE.md` - How to maintain INDEX.md files
- `SKILL-GOVERNANCE.md` - Rules for creating/updating skills

### **scripts/** - Validation & Utilities (3+ files)

Developer tools for validation:

- `validate-indices.py` / `.sh` - Verify INDEX.md consistency
- `pre-commit-hook.template` - Git hook template
- `README-validate-indices.md` - Documentation

---

## Quick Navigation

### For AI Agents

1. **First Visit?** → Read [PROMPTOS.md](./PROMPTOS.md) (entry point)
2. **Need Rules?** → Read [CONSTITUTION.md](./CONSTITUTION.md) (T0/T1/T2 rules)
3. **Need State?** → Read [MEMORY.md](./MEMORY.md) (project status)
4. **Need Task Details?** → See [INDEX.md](./INDEX.md) (master file registry)

### For Humans

- **System Architecture** → `docs/SKILL-GOVERNANCE.md`
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

Three-tier rule hierarchy:

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

### JIT Loading

Load only 2-5 relevant skills per task (not all 13+). Saves tokens and improves focus.

### Memory Architecture

Three-layer system:

- **MEMORY.md** - Aggregate stats + recent sessions (concise)
- **memory/{agent}-memory.md** - Agent-specific details
- **.context/workflows/** - Reusable patterns

---

## File Metadata

| File | Size | Purpose | Tags |
|------|------|---------|------|
| PROMPTOS.md | 7.2KB | System entry point | entry-point, rules |
| CONSTITUTION.md | 15KB | Compliance rules | governance, rules |
| MEMORY.md | 8KB | Project state | state, memory |
| INDEX.md | 12KB | Master registry | index, navigation |

---

## Statistics

| Metric | Value |
|--------|-------|
| Total Files | 45+ |
| Core Protocols | 9 |
| Skills | 13 (6 baselines + 7 advanced) |
| Templates | 8 |
| Tools | 8 |
| Prompts | 3 |
| Checklists | 1 |

---

## Version & Maintenance

- **Version**: 2.2.0
- **Last Updated**: 2026-02-03
- **Status**: Production ready
- **Next Phase**: v2.3.0 (advanced personas, expanded skills)

Maintained by the PromptOS team. See `docs/INDEX-MAINTENANCE.md` for contribution guidelines.

---

*For detailed specifications, see [INDEX.md](./INDEX.md)*
