# .prompt-os/core/ - The Heart of PromptOS

> **Phase 2: Core Hub Documentation**  
> The 9 core protocols that power PromptOS, plus 3 specialized subdirectories for advanced operations.  
> Everything here is **executed by AI agents** to follow rules, generate artifacts, and maintain system integrity.

---

## What is .prompt-os/core/?

`.prompt-os/core/` contains **9 fundamental protocols** and **3 specialized subdirectories**:

- **Protocols** define HOW the system operates (decision-making, generation, validation, memory)
- **Subdirectories** contain implementation details for complex domains (RAG, web research, persona generation)
- **Everything is Markdown**: AI agents read and follow these files; no external tools required

This directory is the **entry point for AI behavior** - it answers:
- "How do I generate artifacts correctly?"
- "What rules must I follow?"
- "How do I load skills efficiently?"
- "When do I ask the human for approval?"

---

## The 9 Core Protocols

| # | Protocol | File | Lines | Purpose |
|---|----------|------|-------|---------|
| 1 | **AUTO-INCREMENT** | `AUTO-INCREMENT.md` | 384 | Gap detection and skill tracking system; evolve PromptOS autonomously |
| 2 | **HUMAN-GATE** | `HUMAN-GATE.md` | 426 | Quality gates for artifacts; enforce human approval before saving (T0-HUMAN-01) |
| 3 | **INPUT-CLASSIFIER** | `INPUT-CLASSIFIER.md` | 308 | Classify user input into system modes (generation, research, memory, etc.) |
| 4 | **JIT-PROTOCOL** | `JIT-PROTOCOL.md` | 350 | Just-In-Time loading of skills and context files to save tokens |
| 5 | **KNOWLEDGE-BASE** | `KNOWLEDGE-BASE.md` | 118 | RAG system overview; retrieve knowledge via vector similarity and relevance |
| 6 | **MEMORY-MANAGEMENT** | `MEMORY-MANAGEMENT.md` | 862 | Multi-layer memory architecture (3 layers) for persistent agent knowledge |
| 7 | **PERSONA-GENERATOR** | `PERSONA-GENERATOR.md` | 225 | Create specialized personas from skills; 6-phase generation workflow |
| 8 | **SELF-CRITIQUE** | `SELF-CRITIQUE.md` | 697 | Self-evaluation framework (0-100 scoring) for artifact quality assessment |
| 9 | **WEB-RESEARCH** | `WEB-RESEARCH.md` | 190 | Web research protocol; source validation, citation, and gap detection |

**Total: 9 protocols | 3,560 lines | 103KB**

---

## Protocol Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER INPUT                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │   INPUT-CLASSIFIER.md      │  Classify request type
            └────────┬───────────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
    ▼                ▼                ▼
┌─────────┐   ┌──────────┐   ┌──────────────┐
│ GENERATE │   │ RESEARCH │   │ MEMORY/STATE │
│ MODE    │   │ MODE     │   │ MODE         │
└────┬────┘   └────┬─────┘   └──────┬───────┘
     │             │                │
     ▼             ▼                ▼
┌──────────────────────────────────────────┐
│      JIT-PROTOCOL.md                     │  Load only needed skills
│      (Load 2-5 skills, not all 13+)      │
└────────┬─────────────────────────────────┘
         │
         ▼
    ┌─────────────────────┐
    │  Generate Artifact  │
    │  (Code/Skill/Docs)  │
    └────────┬────────────┘
             │
             ▼
    ┌────────────────────┐
    │SELF-CRITIQUE.md    │  Score 0-100 (4 dimensions)
    │(Evaluate Quality)  │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ HUMAN-GATE.md      │  ⚠️ CHECKPOINT: Await approval
    │ (Get Approval)     │     (approve/edit/reject/cancel)
    └────────┬───────────┘
             │ (approved)
             ▼
    ┌────────────────────┐
    │ COMMIT & WRITE     │  Write to filesystem
    │ (Save Artifact)    │
    └────────┬───────────┘
             │
             ▼
    ┌──────────────────────────────────┐
    │ MEMORY-MANAGEMENT.md             │  Update MEMORY.md + agent memory
    │ (Record Action)                  │
    └────────┬─────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────┐
    │ AUTO-INCREMENT.md                │  Check for gaps, suggest improvements
    │ (Detect Gaps)                    │
    └──────────────────────────────────┘

SPECIALIZED PATHS (triggered by INPUT-CLASSIFIER):
├─ KNOWLEDGE-BASE.md + subdirectories/  → RAG operations (vector similarity, deduplication)
├─ WEB-RESEARCH.md + subdirectories/    → Research tasks (tier classification, validation)
└─ PERSONA-GENERATOR.md + subdirectories/ → Create personas (traits, triggers)
```

---

## The 3 Specialized Subdirectories

### **knowledge-base/** - RAG Implementation (Retrieval-Augmented Generation)

**Purpose:** Vector-based knowledge retrieval, deduplication, and relationship mapping.

**When to use:** When you need to retrieve relevant knowledge from a large corpus without hallucinating.

**Files:**
- `rag-workflow.md` - Main workflow for RAG operations
- `relationship-map.md` - Knowledge graph relationships and entity linking
- `similarity-scoring.md` - Vector similarity and ranking algorithms
- `redundancy-gate.md` - Deduplication and filtering logic

**Reading order:** rag-workflow → relationship-map → similarity-scoring → redundancy-gate

See [knowledge-base/INDEX.md](./knowledge-base/INDEX.md) for complete details.

---

### **web-research/** - Web Research & Source Validation

**Purpose:** Classify information sources, validate citations, detect research gaps.

**When to use:** When you need to research topics, validate sources, or ensure citations are accurate.

**Files:**
- `tier-system.md` - Tier classification for sources (T0-T3, from inviolable to unreliable)
- `source-validation-rules.md` - Rules for validating credibility and relevance
- `citation-templates.md` - How to cite sources correctly in artifacts
- `gap-detection.md` - Finding research gaps and incomplete coverage

**Reading order:** tier-system → source-validation-rules → citation-templates → gap-detection

See [web-research/INDEX.md](./web-research/INDEX.md) for complete details.

---

### **persona-generator/** - Persona Generation & Triggers

**Purpose:** Create specialized AI personas from skills; generate behavioral triggers.

**When to use:** When you need to generate a new persona or understand how existing personas are built.

**Files:**
- `persona-generation-workflow.md` - Complete 6-phase generation workflow
- `persona-traits-inference.md` - Level-based trait matrices and inference rules
- `persona-triggers.md` - Trigger generation and conflict detection
- `persona-examples.md` - 3 complete worked examples of personas

**Reading order:** persona-generation-workflow → persona-traits-inference → persona-triggers → persona-examples

See [persona-generator/INDEX.md](./persona-generator/INDEX.md) for complete details.

---

## Quick Navigation

### For AI Agents: Where to Start

1. **First time here?** → Start with [INDEX.md](./INDEX.md) (master index of all 9+3 files)
2. **Need to generate an artifact?** → Read the **MANDATORY PROTOCOL SEQUENCE** (see AGENTS.md)
3. **Need to load skills efficiently?** → Read `JIT-PROTOCOL.md`
4. **Need memory rules?** → Read `MEMORY-MANAGEMENT.md`
5. **Got a complex task?** → Use `INPUT-CLASSIFIER.md` to route correctly

### For Humans: Reference

- **System overview** → [.prompt-os/README.md](../README.md)
- **Constitution (rules)** → [CONSTITUTION.md](../CONSTITUTION.md)
- **Artifact generation checklist** → [.prompt-os/checklists/PROTOCOL-APPLICATION.md](../checklists/PROTOCOL-APPLICATION.md)
- **Governance** → [.prompt-os/core/governance/SKILL-GOVERNANCE.md](../docs/SKILL-GOVERNANCE.md)

---

## How Protocols Work Together

### Scenario: Generate a New Skill

1. **INPUT-CLASSIFIER** → "This is a skill generation request"
2. **AUTO-INCREMENT** → "Check if similar skill exists"
3. **JIT-PROTOCOL** → "Load SKILL.template.md + skill-generator-prompt.md"
4. **GENERATE** → Create skill using template
5. **SELF-CRITIQUE** → Evaluate quality (4 dimensions, 0-100 score)
6. **HUMAN-GATE** → Show preview to human, await approval
7. **COMMIT** → Write to filesystem
8. **MEMORY-MANAGEMENT** → Update MEMORY.md with new skill
9. **AUTO-INCREMENT** → "Suggest next improvements"

### Scenario: Research a Topic

1. **INPUT-CLASSIFIER** → "This is a research request"
2. **WEB-RESEARCH** → Classify sources (T0-T3), validate credibility
3. **KNOWLEDGE-BASE** → Retrieve relevant documents via RAG
4. **WEB-RESEARCH** → Cite sources correctly, detect gaps
5. **MEMORY-MANAGEMENT** → Record research in memory

### Scenario: Generate a Specialized Persona

1. **INPUT-CLASSIFIER** → "This is a persona generation request"
2. **PERSONA-GENERATOR** → Execute 6-phase workflow
3. **HUMAN-GATE** → Show persona preview, await approval
4. **COMMIT** → Save to `.prompt-os/personas/`
5. **MEMORY-MANAGEMENT** → Record new persona

---

## Key Concepts

### T0 Rules (Inviolable)

These protocols enforce the three critical T0 rules:

- **T0-HUMAN-01**: NEVER create/modify files without human approval (enforced by `HUMAN-GATE.md`)
- **T0-MEMORY-01**: ALWAYS update MEMORY.md after significant actions (enforced by `MEMORY-MANAGEMENT.md`)
- **T0-SIZE-01**: Skills must be < 1,400 tokens (enforced by `JIT-PROTOCOL.md` + `AUTO-INCREMENT.md`)

### The MANDATORY PROTOCOL SEQUENCE

Every artifact generation must follow this exact sequence:

```
1. AUTO-INCREMENT      → Check for duplicates, detect gaps
2. GENERATE            → Create artifact
3. SELF-CRITIQUE       → Score 0-100
4. HUMAN-GATE          → Await approval ⚠️ CHECKPOINT
5. COMMIT              → Write files
6. MEMORY-MANAGEMENT   → Update state
```

Skipping any step = violation of project rules.

### Three-Layer Memory

- **MEMORY.md** - Aggregate stats + last 5-10 sessions (concise)
- **memory/{agent}-memory.md** - Agent-specific details, gaps, rejections
- **.context/workflows/** - Reusable execution patterns

---

## Statistics

| Metric | Value |
|--------|-------|
| Core Protocols | 9 |
| Specialized Subdirectories | 3 |
| Total Protocol Files | 12 (9 main + 3 INDEX) |
| Subdirectory Files | 12 (4 × 3 subdirs) |
| Total Lines of Code | 3,560+ (main protocols only) |
| Total Size | 103KB+ |
| Version | 2.2.0 |

---

## Related Files

- **[.prompt-os/README.md](../README.md)** - Parent directory overview
- **[.prompt-os/CONSTITUTION.md](../CONSTITUTION.md)** - Rules (T0/T1/T2)
- **[.prompt-os/MEMORY.md](../MEMORY.md)** - Project state
- **[.prompt-os/PROMPTOS.md](../PROMPTOS.md)** - System entry point
- **[.context/standards/architectural-rules.md](../../.context/standards/architectural-rules.md)** - Detailed architectural rules

---

## File Metadata

| Component | Type | Status | Last Updated |
|-----------|------|--------|--------------|
| Core Protocols (9) | Production | Stable | 2026-02-03 |
| Subdirectories (3) | Production | Stable | 2026-02-03 |
| Documentation | Production | NEW (Phase 2) | 2026-02-03 |

---

## Next Steps

For detailed information about any protocol:
- See [INDEX.md](./INDEX.md) for master index
- Read individual protocol files (see table above)
- Check subdirectory INDEX.md files for specialized topics

**Status**: ✅ Phase 2 Complete - All core protocols documented with subdirectory guides.

---

*Last Updated: 2026-02-03 23:15:53*  
*Maintained by PromptOS Team*  
*For contribution guidelines, see [.prompt-os/docs/INDEX-MAINTENANCE.md](../docs/INDEX-MAINTENANCE.md)*

