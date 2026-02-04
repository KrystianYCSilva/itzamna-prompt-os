# .prompt-os/ Master Index

> **Master registry of ALL files in .prompt-os/**  
> Use this index to find files by category, purpose, and tags.

---

## Navigation

- [Core Protocols](#core-protocols) - 12 files
- [Skills](#skills) - 13 skills
- [Personas](#personas)
- [Templates](#templates) - 15 templates
- [Tools](#tools) - 8 scripts
- [Prompts](#prompts) - 3 files (in core)
- [Checklists](#checklists) - 1 file (in core)
- [Governance](#governance) - 2 files (in core)
- [Config](#config) - 3 files

---

## Core Protocols

The fundamental decision-making and validation algorithms for the system.

| File | Size | Purpose | Tags |
|------|------|---------|------|
| `core/AUTO-INCREMENT.md` | 11KB | Version tracking, gap detection, redundancy scoring | versioning, gap-detection, registry |
| `core/BOOTSTRAP.md` | 1.4KB | Project initialization workflow via chat | init, bootstrap, setup |
| `core/COMMAND-ROUTER.md` | 5.6KB | CLI command parsing and routing (SPEC-006) | cli, routing, commands |
| `core/HUMAN-GATE.md` | 12KB | Approval workflow for artifacts, preview protocol, user interaction | approval, human-gate, workflow |
| `core/INPUT-CLASSIFIER.md` | 9.8KB | Classify user requests into workflows, personas, and skills | classification, routing, workflow |
| `core/JIT-PROTOCOL.md` | 16.8KB | Just-In-Time loading, token economy, selective context | token-efficiency, loading, context |
| `core/KNOWLEDGE-BASE.md` | 4.4KB | RAG workflow, similarity scoring, redundancy gate | rag, knowledge, retrieval |
| `core/MEMORY-MANAGEMENT.md` | 25KB | 3-layer memory architecture, episodic recording, state persistence | memory, state, persistence |
| `core/PERSONA-GENERATOR.md` | 5.5KB | Dynamic persona generation, trait inference, trigger detection | persona, generation, behavior |
| `core/SELF-CRITIQUE.md` | 20KB | Self-evaluation framework, 4-dimension scoring (0-100) | evaluation, scoring, quality |
| `core/WEB-RESEARCH.md` | 5.5KB | Research protocol, source validation, citation templates | research, sources, validation |
| `core/WORKFLOW-ORCHESTRATOR.md` | 18.9KB | Workflow → Persona → Skills mapping (SPEC-007) | orchestration, persona, skills |

**Sub-directories in core/:**
- `core/checklists/` - Operational checklists
- `core/governance/` - Maintenance & policies (formerly docs/)
- `core/knowledge-base/` - RAG implementation files
- `core/persona-generator/` - Persona workflows
- `core/prompts/` - Strategic prompts
- `core/web-research/` - Research validation rules

---

## Skills

Language fundamentals and advanced features. Located in `.prompt-os/skills/linguagens/`.

### Baselines (L1 - Foundational)

| Name | Language | File | Tags | Status |
|------|----------|------|------|--------|
| `c-cpp` | C/C++ | `.prompt-os/skills/linguagens/c-cpp/SKILL.md` | pointers, memory, compilation | approved |
| `go` | Go | `.prompt-os/skills/linguagens/go/SKILL.md` | goroutines, channels, concurrency | approved |
| `java` | Java | `.prompt-os/skills/linguagens/java/SKILL.md` | oop, jvm, threading | approved |
| `javascript` | JavaScript | `.prompt-os/skills/linguagens/javascript/SKILL.md` | event-loop, async, npm | approved |
| `kotlin` | Kotlin | `.prompt-os/skills/linguagens/kotlin/SKILL.md` | jvm, nullsafety, coroutines | approved |
| `python` | Python | `.prompt-os/skills/linguagens/python/SKILL.md` | duck-typing, asyncio, pip | approved |

### Advanced (L2 - Features & Versions)

| Name | Based On | File | Tags | Status |
|------|----------|------|------|--------|
| `java-8` | Java | `.prompt-os/skills/linguagens/java/java-8/SKILL.md` | lambdas, streams, optional | approved |
| `java-11` | Java | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` | var, httpclient, lts | approved |
| `java-17` | Java | `.prompt-os/skills/linguagens/java/java-17/SKILL.md` | sealed-classes, records, lts | approved |
| `java-21` | Java | `.prompt-os/skills/linguagens/java/java-21/SKILL.md` | virtual-threads, lts, patterns | approved |
| `java-23` | Java | `.prompt-os/skills/linguagens/java/java-23/SKILL.md` | primitive-patterns, records | approved |
| `kotlin-1xx` | Kotlin | `.prompt-os/skills/linguagens/kotlin/kotlin-1xx/SKILL.md` | extension-functions, dsl | approved |
| `kotlin-2xx` | Kotlin | `.prompt-os/skills/linguagens/kotlin/kotlin-2xx/SKILL.md` | k2-compiler, context-receivers | approved |

### Statistics

| Metric | Value |
|--------|-------|
| Total Skills | 13 |
| Baselines | 6 |
| Advanced | 7 |
| Categories | 1 (linguagens) |
| Approval Rate | 100% |

**Reference:** See `.prompt-os/skills/INDEX.md` for detailed skill registry with JIT sub-files info.

---

## Personas

Role definitions for different AI agent behaviors. Located in `.prompt-os/personas/`.

| Name | File | Purpose | Tags |
|------|------|---------|------|
| INDEX | `.prompt-os/personas/INDEX.md` | Personas registry and documentation | index, registry |
| *[See .prompt-os/personas/INDEX.md for detailed list]* | - | Dynamic personas for workflows | - |

---

## Templates

Reusable markdown templates for generating artifacts. Located in `templates/`.

| File | Purpose | Tags |
|------|---------|------|
| `ADR.template.md` | Architecture Decision Records | adr, decision, docs |
| `AGENTS.template.md` | Agent bootstrap files | agents, bootstrap, config |
| `CARD.template.md` | Feature cards (requirements) | card, feature, requirements |
| `INDEX.template.md` | Directory index files | index, navigation, registry |
| `MEMORY.template.md` | Memory state files | memory, state, persistence |
| `SKILL.template.md` | New skill generation | skill, capability, how-to |
| `TEST-PLAN.template.md` | Test planning documents | test, qa, planning |
| `monitoring/` | Monitoring report templates | monitoring, reports, metrics |

---

## Tools

Helper scripts for automation (optional, for human use). Located in `tools/`.

### JavaScript Tools

| File | Purpose | Tags |
|------|---------|------|
| `brain.js` | Main CLI for artifact generation | cli, generation, automation |
| `input-classifier.js` | Classify user requests to workflows | classification, routing |
| `jit-loader.js` | Intelligent skill loading | loading, efficiency, jit |
| `tier-system.js` | Manage skill tiers and levels | tier, level, management |

### Shell Scripts

| File | Purpose | Platform | Tags |
|------|---------|----------|------|
| `setup-promptos-brain.sh` | Installation (Unix/Linux) | Unix | setup, install |
| `setup-promptos-brain.ps1` | Installation (Windows) | Windows | setup, install |
| `sync-constitution.ps1` | Sync rules across project | Windows | sync, governance |
| `validate-skill.ps1` | Validate new skills | Windows | validation, qa |

---

## Prompts

AI generation prompts for creating artifacts. Located in `core/prompts/`.

| File | Purpose | Tags |
|------|---------|------|
| `core/prompts/skill-generator-prompt.md` | Generate new skills | skill, generation, prompt |
| `core/prompts/persona-generator-prompt.md` | Generate personas | persona, generation, prompt |
| `core/prompts/research-pipeline-prompt.md` | Web research workflow | research, pipeline, prompt |

---

## Checklists

Execution checklists for complex protocols. Located in `core/checklists/`.

| File | Purpose | Tags |
|------|---------|------|
| `core/checklists/PROTOCOL-APPLICATION.md` | Mandatory protocol checklist | checklist, protocol, execution |

---

## Governance

Configuration and internal documentation files. Located in `core/governance/`.

| File | Purpose | Tags |
|------|---------|------|
| `core/governance/INDEX-MAINTENANCE.md` | How to maintain INDEX.md files | maintenance, documentation |
| `core/governance/SKILL-GOVERNANCE.md` | Rules for skill creation/update | governance, skills, standards |

---

## Config

Root configuration files.

| File | Purpose | Tags |
|------|---------|------|
| `PROMPTOS.md` | System entry point and overview | entry-point, rules, guide |
| `CONSTITUTION.md` | Governance rules (T0/T1/T2 hierarchy) | governance, rules, compliance |
| `MEMORY.md` | Current project state and metrics | state, memory, persistence |
| `system.yaml` | System configuration (metadata, versions) | config, metadata, system |

### Dependencies

| File | Purpose |
|------|---------|
| `requirements.txt` | Python dependencies for scripts |
| `core/brain-config.yaml` | Brain.js configuration |
| `core/cli.py` | Python CLI utilities |
| `core/orchestrator.py` | Workflow orchestration |

---

## Key Metrics

| Category | Count |
|----------|-------|
| Core Protocols | 12 |
| Skills (total) | 13 |
| Templates | 15 |
| Tools | 8 |
| Prompts | 3 |
| Checklists | 1 |
| Governance Docs | 2 |
| **Total Files** | **50+** |

---

## How to Use This Index

### Find by Category
1. Choose category above (Core, Skills, Templates, etc.)
2. Look at the table for your file
3. Navigate to the file path

### Find by Purpose
Search for keywords in the **Purpose** and **Tags** columns.

**Example:** Need to understand memory?
- Search: "memory"
- Found: `MEMORY.md`, `core/MEMORY-MANAGEMENT.md`, `templates/MEMORY.template.md`

---

## Subdirectory Indices

For detailed file listings within subdirectories:

- **Skills:** See `.prompt-os/skills/INDEX.md` - Complete skill registry with redundancy detection
- **Personas:** See `.prompt-os/personas/INDEX.md` - Available personas and triggers
- **Core:** See `core/INDEX.md` - Master core registry

---

## Version & Maintenance

- **Version**: 2.3.0-dev
- **Last Updated**: 2026-02-04
- **Maintenance**: Update whenever files are added/removed

For maintenance procedures, see `core/governance/INDEX-MAINTENANCE.md`.

---

*Index last generated: 2026-02-04 | v2.3.0-dev | Next update: When new files are added*
