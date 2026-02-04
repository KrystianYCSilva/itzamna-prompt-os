# .prompt-os/core/INDEX.md - Master Index

> **Master registry of all 9 core protocols + 3 subdirectories.**  
> Start here to understand what exists, then navigate to specific protocols or subdirectories.

---

## Overview

| Component | Count | Total Lines | Total Size |
|-----------|-------|-------------|-----------|
| Core Protocols | 9 | 3,560 | 103KB |
| Subdirectory Files | 12 (4 × 3) | ~2,000+ | ~60KB |
| **TOTAL** | **21 files** | **5,560+** | **163KB+** |

---

## The 9 Core Protocols (Mandatory)

These are the fundamental algorithms that power PromptOS. **Every AI agent must understand these.**

| # | Protocol | File | Lines | Size | Purpose | Status |
|---|----------|------|-------|------|---------|--------|
| 1 | **AUTO-INCREMENT** | `AUTO-INCREMENT.md` | 384 | 11K | System evolution and gap detection | ✅ Stable |
| 2 | **HUMAN-GATE** | `HUMAN-GATE.md` | 426 | 12K | Approval workflow for artifacts (T0-HUMAN-01) | ✅ Stable |
| 3 | **INPUT-CLASSIFIER** | `INPUT-CLASSIFIER.md` | 308 | 8.8K | Route user requests to correct workflow | ✅ Stable |
| 4 | **JIT-PROTOCOL** | `JIT-PROTOCOL.md` | 350 | 8.8K | Token-efficient skill loading | ✅ Stable |
| 5 | **KNOWLEDGE-BASE** | `KNOWLEDGE-BASE.md` | 118 | 4.4K | RAG system overview | ✅ Stable |
| 6 | **MEMORY-MANAGEMENT** | `MEMORY-MANAGEMENT.md` | 862 | 25K | Multi-layer memory architecture (T0-MEMORY-01) | ✅ Stable |
| 7 | **PERSONA-GENERATOR** | `PERSONA-GENERATOR.md` | 225 | 5.5K | Create specialized personas from skills | ✅ Stable |
| 8 | **SELF-CRITIQUE** | `SELF-CRITIQUE.md` | 697 | 20K | Quality evaluation (0-100 scoring) | ✅ Stable |
| 9 | **WEB-RESEARCH** | `WEB-RESEARCH.md` | 190 | 5.5K | Research and source validation | ✅ Stable |

---

## The 3 Specialized Subdirectories

Each subdirectory contains 4 implementation files + 1 INDEX.md for a specific domain.

### **1. knowledge-base/** - RAG (Retrieval-Augmented Generation)

Vector-based knowledge retrieval, deduplication, and relationship mapping.

**Files:**

| File | Lines | Purpose |
|------|-------|---------|
| `rag-workflow.md` | ~400 | Main workflow for RAG operations |
| `relationship-map.md` | ~500 | Knowledge graph relationships |
| `similarity-scoring.md` | ~450 | Vector similarity algorithms |
| `redundancy-gate.md` | ~300 | Deduplication logic |
| **INDEX.md** | ~200 | Directory guide + reading order |

**When to use:** Retrieving knowledge without hallucinating; building knowledge graphs.

**See:** [knowledge-base/INDEX.md](./knowledge-base/INDEX.md)

---

### **2. web-research/** - Web Research & Source Validation

Source classification, citation, and gap detection for research tasks.

**Files:**

| File | Lines | Purpose |
|------|-------|---------|
| `tier-system.md` | ~350 | Source tier classification (T0-T3) |
| `source-validation-rules.md` | ~400 | Credibility validation rules |
| `citation-templates.md` | ~300 | Citation formatting and standards |
| `gap-detection.md` | ~350 | Research gap analysis |
| **INDEX.md** | ~200 | Directory guide + reading order |

**When to use:** Researching topics; validating sources; ensuring accurate citations.

**See:** [web-research/INDEX.md](./web-research/INDEX.md)

---

### **3. persona-generator/** - Persona Generation & Triggers

Create specialized AI personas with traits, triggers, and behaviors.

**Files:**

| File | Lines | Purpose |
|------|-------|---------|
| `persona-generation-workflow.md` | ~450 | 6-phase generation workflow |
| `persona-traits-inference.md` | ~500 | Level-based trait matrices |
| `persona-triggers.md` | ~400 | Trigger generation + conflict detection |
| `persona-examples.md` | ~350 | 3 worked examples |
| **INDEX.md** | ~200 | Directory guide + reading order |

**When to use:** Creating new personas; understanding persona architecture.

**See:** [persona-generator/INDEX.md](./persona-generator/INDEX.md)

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

---

### By Execution Order (MANDATORY PROTOCOL SEQUENCE)

Every artifact generation follows this sequence:

```
1. AUTO-INCREMENT.md         → Detect gaps, check for duplicates
2. (GENERATE)                → Create artifact (use templates, skills)
3. SELF-CRITIQUE.md          → Score 0-100 on 4 dimensions
4. HUMAN-GATE.md             → ⚠️ CHECKPOINT: Show preview, await approval
5. (COMMIT)                  → Write files to filesystem
6. MEMORY-MANAGEMENT.md      → Update MEMORY.md + agent memory
```

---

### By Complexity Level

**Simple Tasks (1 protocol):**
- Load a skill → Use `JIT-PROTOCOL.md`
- Evaluate artifact → Use `SELF-CRITIQUE.md`
- Record memory → Use `MEMORY-MANAGEMENT.md`

**Medium Tasks (2-3 protocols):**
- Generate artifact → `AUTO-INCREMENT.md` + `SELF-CRITIQUE.md` + `HUMAN-GATE.md`
- Research topic → `WEB-RESEARCH.md` + `KNOWLEDGE-BASE.md`

**Complex Tasks (4+ protocols):**
- Generate persona → `INPUT-CLASSIFIER.md` + `PERSONA-GENERATOR.md` + `SELF-CRITIQUE.md` + `HUMAN-GATE.md` + `MEMORY-MANAGEMENT.md`
- Full workflow → All 9 protocols working together

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
3. **Protocol checklist** → [checklists/PROTOCOL-APPLICATION.md](../checklists/PROTOCOL-APPLICATION.md)
4. **Maintenance guide** → [docs/INDEX-MAINTENANCE.md](../docs/INDEX-MAINTENANCE.md)

---

## File Structure

```
.prompt-os/core/
├── README.md                    # ← START HERE (directory overview)
├── INDEX.md                     # ← YOU ARE HERE (master index)
│
├── AUTO-INCREMENT.md            # Protocol 1: Gap detection
├── HUMAN-GATE.md               # Protocol 2: Approval workflow
├── INPUT-CLASSIFIER.md          # Protocol 3: Route requests
├── JIT-PROTOCOL.md             # Protocol 4: Load skills efficiently
├── KNOWLEDGE-BASE.md           # Protocol 5: RAG overview
├── MEMORY-MANAGEMENT.md        # Protocol 6: Multi-layer memory
├── PERSONA-GENERATOR.md        # Protocol 7: Create personas
├── SELF-CRITIQUE.md            # Protocol 8: Evaluate quality
├── WEB-RESEARCH.md             # Protocol 9: Research & sources
│
├── knowledge-base/             # Subdirectory 1: RAG implementation
│   ├── INDEX.md                # ← Start here for this subdir
│   ├── rag-workflow.md
│   ├── relationship-map.md
│   ├── similarity-scoring.md
│   └── redundancy-gate.md
│
├── web-research/               # Subdirectory 2: Research & validation
│   ├── INDEX.md                # ← Start here for this subdir
│   ├── tier-system.md
│   ├── source-validation-rules.md
│   ├── citation-templates.md
│   └── gap-detection.md
│
└── persona-generator/          # Subdirectory 3: Persona generation
    ├── INDEX.md                # ← Start here for this subdir
    ├── persona-generation-workflow.md
    ├── persona-traits-inference.md
    ├── persona-triggers.md
    └── persona-examples.md
```

---

## Statistics & Metadata

| Metric | Value |
|--------|-------|
| Core Protocols | 9 |
| Subdirectories | 3 |
| Total Files | 21 (9 + 3 + 9 subdir files) |
| Total Lines | 5,560+ |
| Total Size | 163KB+ |
| Version | 2.2.0 |
| Status | Production Ready |
| Last Updated | 2026-02-03 |

---

## Links to Parent & Related

- **Parent**: [.prompt-os/README.md](../README.md)
- **Entry Point**: [.prompt-os/PROMPTOS.md](../PROMPTOS.md)
- **Rules**: [.prompt-os/CONSTITUTION.md](../CONSTITUTION.md)
- **Memory**: [.prompt-os/MEMORY.md](../MEMORY.md)
- **Architectural Rules**: [.context/standards/architectural-rules.md](../../.context/standards/architectural-rules.md)

---

*Last Updated: 2026-02-03 23:15:53*  
*Maintained by PromptOS Team*  
*For updates, see [.prompt-os/docs/INDEX-MAINTENANCE.md](../docs/INDEX-MAINTENANCE.md)*
