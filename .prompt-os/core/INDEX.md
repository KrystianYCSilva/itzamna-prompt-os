---
name: core-index
description: ".prompt-os/core/INDEX.md - Master Index"
---

# .prompt-os/core/INDEX.md - Master Index

> **Master registry of all 12 core protocols + 6 subdirectories.**  
> Start here to understand what exists, then navigate to specific protocols or subdirectories.

---

## Overview

| Component | Count | Total Lines | Total Size |
|-----------|-------|-------------|-----------|
| Core Protocols | 12 | 4,500+ | 140KB+ |
| Subdirectory Files | ~25 | ~3,000+ | ~100KB+ |
| **TOTAL** | **~40 files** | **~7,500+** | **~240KB+** |

---

## The 12 Core Protocols (Mandatory)

These are the fundamental algorithms that power PromptOS. **Every AI agent must understand these.**

| # | Protocol | File | Lines | Size | Purpose | Status |
|---|----------|------|-------|------|---------|--------|
| 1 | **AUTO-INCREMENT** | `AUTO-INCREMENT.md` | 384 | 11K | System evolution and gap detection | ✅ Stable |
| 2 | **BOOTSTRAP** | `BOOTSTRAP.md` | 63 | 1.4K | Project initialization workflow | ✅ Stable |
| 3 | **COMMAND-ROUTER** | `COMMAND-ROUTER.md` | 156 | 5.6K | CLI command parsing and routing (SPEC-006) | ✅ Stable |
| 4 | **HUMAN-GATE** | `HUMAN-GATE.md` | 426 | 12K | Approval workflow for artifacts (T0-HUMAN-01) | ✅ Stable |
| 5 | **INPUT-CLASSIFIER** | `INPUT-CLASSIFIER.md` | 308 | 9.8K | Route user requests to correct workflow | ✅ Stable |
| 6 | **JIT-PROTOCOL** | `JIT-PROTOCOL.md` | 350 | 16.8K | Token-efficient skill loading | ✅ Stable |
| 7 | **KNOWLEDGE-BASE** | `KNOWLEDGE-BASE.md` | 118 | 4.4K | RAG system overview | ✅ Stable |
| 8 | **MEMORY-MANAGEMENT** | `MEMORY-MANAGEMENT.md` | 862 | 25K | Multi-layer memory architecture (T0-MEMORY-01) | ✅ Stable |
| 9 | **PERSONA-GENERATOR** | `PERSONA-GENERATOR.md` | 225 | 5.5K | Create specialized personas from skills | ✅ Stable |
| 10 | **SELF-CRITIQUE** | `SELF-CRITIQUE.md` | 697 | 20K | Quality evaluation (0-100 scoring) | ✅ Stable |
| 11 | **WEB-RESEARCH** | `WEB-RESEARCH.md` | 190 | 5.5K | Research and source validation | ✅ Stable |
| 12 | **WORKFLOW-ORCHESTRATOR** | `WORKFLOW-ORCHESTRATOR.md` | 510 | 18.9K | Workflow → Persona → Skills mapping (SPEC-007) | ✅ Stable |

---

## The 6 Specialized Subdirectories

Each subdirectory contains implementation files, rules, or strategic prompts for a specific domain.

### **1. knowledge-base/** - RAG
Vector-based knowledge retrieval, deduplication, and relationship mapping.
**See:** [knowledge-base/INDEX.md](./knowledge-base/INDEX.md)

### **2. web-research/** - Research & Validation
Source classification, citation, and gap detection.
**See:** [web-research/INDEX.md](./web-research/INDEX.md)

### **3. persona-generator/** - Persona Logic
Traits matrices, trigger definitions, and generation workflows.
**See:** [persona-generator/INDEX.md](./persona-generator/INDEX.md)

### **4. checklists/** - Operational Checklists
Step-by-step guides for applying protocols (e.g., `PROTOCOL-APPLICATION.md`).
**See:** [checklists/INDEX.md](./checklists/INDEX.md)

### **5. governance/** - System Governance
Maintenance rules and skill governance policies (formerly `docs/`).
**See:** [governance/INDEX.md](./governance/INDEX.md)

### **6. prompts/** - Strategic Prompts
Kernel driver prompts for initializing agents and complex pipelines.
**See:** [prompts/INDEX.md](./prompts/INDEX.md)

---

## Quick Protocol Reference

### By Purpose

**When you need to... → Read**

- Generate an artifact (skill, persona, code) → `AUTO-INCREMENT.md` + `SELF-CRITIQUE.md` + `HUMAN-GATE.md`
- Load skills efficiently → `JIT-PROTOCOL.md`
- Store/retrieve persistent knowledge → `MEMORY-MANAGEMENT.md`
- Route user requests → `INPUT-CLASSIFIER.md`
- Retrieve knowledge without hallucinating → `KNOWLEDGE-BASE.md` + `knowledge-base/rag-workflow.md`
- Research and cite sources → `WEB-RESEARCH.md` + `web-research/tier-system.md`
- Create a new persona → `PERSONA-GENERATOR.md` + `persona-generator/persona-generation-workflow.md`
- Evaluate your own work → `SELF-CRITIQUE.md`
- Get human approval → `HUMAN-GATE.md`
- Detect system gaps → `AUTO-INCREMENT.md`
- **Apply all protocols correctly** → `checklists/PROTOCOL-APPLICATION.md`

---

## Cross-References to Architectural Rules

These protocols enforce the architectural rules defined in:
- **[.context/standards/architectural-rules.md](../../.context/standards/architectural-rules.md)** - Detailed rules
- **[.prompt-os/CONSTITUTION.md](../CONSTITUTION.md)** - T0/T1/T2 rules

**Key T0 rules:**
- `T0-HUMAN-01`: NEVER create files without approval (enforced by `HUMAN-GATE.md`)
- `T0-MEMORY-01`: ALWAYS update MEMORY.md (enforced by `MEMORY-MANAGEMENT.md`)
- `T0-SIZE-01`: Skills < 1,400 tokens (enforced by `JIT-PROTOCOL.md`)

---

## Navigation

### For AI Agents

1. **First time?** Start with [README.md](./README.md) (this directory's overview)
2. **Need a specific protocol?** Find it in the table above, click the filename
3. **Need a subdirectory?** Click the subdirectory name → then INDEX.md
4. **Need implementation details?** Jump to specific files within subdirectories

### For Humans

1. **System overview** → [.prompt-os/README.md](../README.md)
2. **All rules** → [CONSTITUTION.md](../CONSTITUTION.md)
3. **Protocol checklist** → [checklists/PROTOCOL-APPLICATION.md](./checklists/PROTOCOL-APPLICATION.md)
4. **Maintenance guide** → [governance/INDEX-MAINTENANCE.md](./governance/INDEX-MAINTENANCE.md)

---

## File Structure

```
.prompt-os/core/
├── README.md                    # ← START HERE (directory overview)
├── INDEX.md                     # ← YOU ARE HERE (master index)
│
├── AUTO-INCREMENT.md            # Protocol 1: Gap detection
├── BOOTSTRAP.md                 # Protocol 2: Project initialization
├── COMMAND-ROUTER.md            # Protocol 3: CLI command parsing (SPEC-006)
├── HUMAN-GATE.md                # Protocol 4: Approval workflow
├── INPUT-CLASSIFIER.md          # Protocol 5: Route requests
├── JIT-PROTOCOL.md              # Protocol 6: Load skills efficiently
├── KNOWLEDGE-BASE.md            # Protocol 7: RAG overview
├── MEMORY-MANAGEMENT.md         # Protocol 8: Multi-layer memory
├── PERSONA-GENERATOR.md         # Protocol 9: Create personas
├── SELF-CRITIQUE.md             # Protocol 10: Evaluate quality
├── WEB-RESEARCH.md              # Protocol 11: Research & sources
├── WORKFLOW-ORCHESTRATOR.md     # Protocol 12: Workflow → Persona mapping (SPEC-007)
│
├── checklists/                  # Subdirectory: Operational checklists
│   ├── INDEX.md
│   └── PROTOCOL-APPLICATION.md
│
├── governance/                  # Subdirectory: Maintenance & Policies
│   ├── INDEX.md
│   ├── INDEX-MAINTENANCE.md
│   └── SKILL-GOVERNANCE.md
│
├── knowledge-base/              # Subdirectory: RAG implementation
│   └── [RAG files]
│
├── persona-generator/           # Subdirectory: Persona logic
│   └── [Persona files]
│
├── prompts/                     # Subdirectory: Strategic prompts
│   ├── INDEX.md
│   └── [Prompt files]
│
└── web-research/                # Subdirectory: Research tools
    └── [Research files]
```

---

## Statistics & Metadata

| Metric | Value |
|--------|-------|
| Core Protocols | 12 |
| Subdirectories | 6 |
| Total Files | ~40 |
| Version | 2.3.0-dev |
| Status | Production Ready |
| Last Updated | 2026-02-04 |

---

## Links to Parent & Related

- **Parent**: [.prompt-os/README.md](../README.md)
- **Entry Point**: [.prompt-os/PROMPTOS.md](../PROMPTOS.md)
- **Rules**: [.prompt-os/CONSTITUTION.md](../CONSTITUTION.md)
- **Memory**: [.prompt-os/MEMORY.md](../MEMORY.md)
- **Architectural Rules**: [.context/standards/architectural-rules.md](../../.context/standards/architectural-rules.md)

---

*Last Updated: 2026-02-04*  
*Maintained by PromptOS Team*  
*For updates, see [governance/INDEX-MAINTENANCE.md](./governance/INDEX-MAINTENANCE.md)*
