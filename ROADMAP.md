# Itzamna PromptOS - Roadmap

> Plano de evolucao do sistema: Prompt-Based Architecture

---

## Visao Geral

```
v1.0.0 (Piloto)    v2.0.0 (ATUAL)      v2.1.0              v3.0.0
     |                   |                 |                   |
     v                   v                 v                   v
+----------+      +--------------+   +-------------+     +------------+
| Code-    |  ->  | Prompt-Based |-> | Enhanced    |  -> | Advanced   |
| Centric  |      | Architecture |   | Protocols   |     | RAG        |
+----------+      +--------------+   +-------------+     +------------+
     |                   |                 |                   |
  5 phases           CURRENT           3-5 days            7-10 days
  complete
```

---

## v1.0.0 - Piloto Funcional (COMPLETO)

**Status:** Complete  
**Release:** 2026-02-02

### Deliverables
- [x] Arquitetura cognitiva documentada (CoALA simplificado)
- [x] brain.js CLI v1.1.0 com --category
- [x] Human Gate Protocol (approve/reject/edit/cancel)
- [x] 17 skills em 7 categorias
- [x] 1 persona (senior-fullstack-developer)
- [x] Constitution v1.0.0 sincronizada para 5 agentes
- [x] Spec-Kit integration

### Note
v1.0.0 was code-centric, requiring Node.js/Python runtime. This was identified as architecturally incorrect for a cross-model system.

---

## v2.0.0 - Prompt-Based Architecture (ATUAL)

**Status:** Complete  
**Release:** 2026-02-02

### Key Insight

> "PromptOS should be PROMPTS, not CODE. AI agents READ Markdown and FOLLOW instructions. No code execution required for core functionality."

### Architecture Change

| v1.0 (Code-Centric) | v2.0 (Prompt-Based) |
|---------------------|---------------------|
| Scripts execute code | Prompts provide instructions |
| Requires runtime | Works with ANY AI agent |
| Platform-specific | Universal |
| `cli.py`, `orchestrator.py` | `PROMPTOS.md`, `core/*.md` |

### Deliverables
- [x] Entry point: `.prompt-os/PROMPTOS.md`
- [x] Constitution as prompt: `.prompt-os/CONSTITUTION.md`
- [x] 8 Core protocols created:
  - [x] `SELF-CRITIQUE.md` (from SPEC-001)
  - [x] `HUMAN-GATE.md` (from SPEC-001)
  - [x] `AUTO-INCREMENT.md` (from SPEC-002)
  - [x] `WEB-RESEARCH.md` (from SPEC-003)
  - [x] `KNOWLEDGE-BASE.md` (from SPEC-004)
  - [x] `PERSONA-GENERATOR.md` (from SPEC-005)
  - [x] `INPUT-CLASSIFIER.md` (Foundation)
  - [x] `JIT-PROTOCOL.md` (Foundation)
- [x] Specs updated with implementation references
- [x] `specs/IMPLEMENTATION-STATUS.md` mapping document
- [x] Root files updated (ITZAMNA-AGENT.md, AGENTS.md, README.md, MEMORY.md, ROADMAP.md)
- [x] Cross-model compatibility (Claude, GPT, Gemini, Cursor, Copilot, Qwen)

### How It Works Now

```
ANY AI AGENT (Claude, Gemini, Cursor, etc.)
         |
         v
    Reads .prompt-os/PROMPTOS.md
         |
         v
    Follows structured instructions
    (no code execution needed)
```

---

## v2.1.0 - Enhanced Protocols (EM ANDAMENTO)

**Status:** In progress  
**Estimate:** 3-5 days

### Objectives
1. Validate protocols work consistently across different AI models
2. Add structured testing for protocols
3. Improve documentation for protocol creation
4. Enhance JIT loading efficiency

### Deliverables
- [ ] Cross-model testing documentation
- [ ] Protocol validation checklist
- [ ] `HOW-TO-CREATE-PROTOCOLS.md` guide
- [ ] Enhanced JIT-PROTOCOL.md with caching hints
- [ ] Metrics collection for protocol usage
- [ ] Improved error handling in protocols

### Metrics Target
| Metric | Target |
|--------|--------|
| Cross-model consistency | > 90% |
| Protocol load time | < 100ms |
| Documentation coverage | 100% |

---

## v3.0.0 - Advanced RAG Integration (FUTURO)

**Status:** Planned  
**Estimate:** 7-10 days

### Objectives
1. Semantic search for skills using embeddings
2. Retrieval-Augmented Generation for skill creation
3. Advanced knowledge graph for skill relationships

### Deliverables
- [ ] Embedding generation for skills
- [ ] Semantic search protocol (update KNOWLEDGE-BASE.md)
- [ ] RAG-enhanced skill generation
- [ ] Knowledge graph visualization
- [ ] Advanced skill relationship detection

### Note
This can be implemented as additional prompts that guide AI agents on how to use external embedding services, OR as optional tooling.

---

## Specs Implementation Status

All original specs have been implemented as **prompt protocols**:

| Spec | Prompt File | Status |
|------|-------------|--------|
| SPEC-001 (Self-Critique) | `.prompt-os/core/SELF-CRITIQUE.md` | Implemented |
| SPEC-002 (Auto-Increment) | `.prompt-os/core/AUTO-INCREMENT.md` | Implemented |
| SPEC-003 (Web Research) | `.prompt-os/core/WEB-RESEARCH.md` | Implemented |
| SPEC-004 (Vector DB/RAG) | `.prompt-os/core/KNOWLEDGE-BASE.md` | Implemented |
| SPEC-005 (Persona CLI) | `.prompt-os/core/PERSONA-GENERATOR.md` | Implemented |

See `specs/IMPLEMENTATION-STATUS.md` for detailed mapping.

---

## Optional Tools (Legacy from v1.0)

These tools remain as **optional helpers** for human operators:

| Tool | Purpose | Status |
|------|---------|--------|
| `brain.js` | Interactive skill generation | Functional |
| `sync-constitution.ps1` | Sync constitution across agents | Functional |
| `tier-system.js` | Validate tier constraints | Available |

**Important:** These tools are NOT required for PromptOS to function. The core system works through prompts alone.

---

## How to Contribute

### For Protocol Development

1. Read existing protocols in `.prompt-os/core/`
2. Create a SPEC in `specs/` if it's a major feature
3. Create the protocol as a Markdown file
4. Update `PROMPTOS.md` to reference the new protocol
5. Update `IMPLEMENTATION-STATUS.md`
6. Test with multiple AI agents

### For Users

1. Report gaps detected in protocols
2. Give feedback on cross-model compatibility
3. Suggest new skills via issues
4. Document edge cases

---

## Key Principles for Evolution

- PromptOS is **prompt-based** and must remain so.
- Human-in-the-loop is mandatory for persistence.
- Keep kernel and skills lightweight for token economy.
- Maintain cross-model compatibility.

---

**EOF** | Roadmap v2.1.0
