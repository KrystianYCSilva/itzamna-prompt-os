# Itzamna PromptOS - Roadmap

> Plano de evolucao do sistema: Prompt-Based Architecture

---

## Visao Geral

```
v1.0.0 (Piloto)    v2.0.0 (ANTERIOR)   v2.1.0             v2.2.0 (ATUAL)      v2.3.0              v3.0.0
     |                   |                 |                   |                   |                   |
     v                   v                 v                   v                   v                   v
+----------+      +--------------+   +-------------+     +-------------+     +-------------+     +------------+
| Code-    |  ->  | Prompt-Based |-> | Enhanced    |  -> | Protocol    |  -> | Advanced    |  -> | Advanced   |
| Centric  |      | Architecture |   | Protocols   |     | Enhancement |     | Features    |     | RAG        |
+----------+      +--------------+   +-------------+     +-------------+     +-------------+     +------------+
     |                   |                 |                   |                   |                   |
  5 phases           COMPLETE           COMPLETE           COMPLETE           5-7 days            7-10 days
  complete                              2026-02-03         2026-02-03
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

## v2.1.0 - Enhanced Protocols (COMPLETE)

**Status:** Complete  
**Release:** 2026-02-03

### Objectives
1. ✅ Validate protocols work consistently across different AI models
2. ✅ Add structured testing for protocols
3. ✅ Improve documentation for protocol creation
4. ✅ Enhance JIT loading efficiency

### Deliverables
- [x] MEMORY-MANAGEMENT.md protocol (Session 19) - 3-layer memory architecture
- [x] SPEC-010 (5 Baseline Language Skills) - 51 minutes, 100% approval rate
- [x] JIT sub-files pattern innovation (SPEC-010) - scores improved 94→99
- [x] Solution 7: SKILL-GOVERNANCE.md (~450 lines) - lifecycle policies
- [x] Solution 8: INDEX validation tooling (~785 lines total)
  - validate-indices.py (cross-platform Python)
  - Pre-commit hook template
  - Documentation (README-validate-indices.md)
  - Self-Critique Score: 97.5/100
- [x] Skills library cleanup: 23→12 skills (Session 18)
- [x] Personas cleanup: 1→0 created (8 conceptual defined, on-demand creation)
- [x] Version-agnostic skill approach (learned action from SPEC-010)
- [x] Documentation updates (README, ARCHITECTURE, ROADMAP, .context/)

### Metrics Achieved
| Metric | Target | Achieved |
|--------|--------|----------|
| Cross-model consistency | > 90% | 100% (5 agents supported) |
| Protocol quality | ≥ 95 | 97.5 (Solution 8) |
| Documentation coverage | 100% | 100% |
| SPEC-010 approval rate | - | 100% (5/5 skills) |
| SPEC-010 avg quality | ≥ 80 | 99 (baseline avg) |

### Key Innovations
1. **JIT Sub-Files Pattern:** Skills can exceed 1,400 tokens by extracting advanced topics
2. **3-Layer Memory:** MEMORY.md (L1 stats) + agent-memory.md (L2 details) + workflows (L3 patterns)
3. **Automated Validation:** Python-based INDEX.md validation prevents corruption
4. **Governance Framework:** Clear lifecycle policies for skill deprecation and quality

---

## v2.2.0 - Protocol Enhancements (COMPLETE)

**Status:** ✅ Complete  
**Release:** 2026-02-03

### Objectives
1. ✅ Enhance WEB-RESEARCH.md protocol (SPEC-003 Phase 1-6)
2. ✅ Add structured source validation system
3. ✅ Create citation templates and tier system
4. ✅ Integrate gap detection with AUTO-INCREMENT

### Deliverables Completed
- [x] Enhanced WEB-RESEARCH.md (refactored: 401→190 lines, 1,393 tokens):
  - 4-phase workflow (Planejar → Buscar → Validar → Sintetizar)
  - JIT loading of 4 sub-files for advanced features
  - Token-optimized main protocol (<1,400 tokens, T0-SIZE-01 compliant)
- [x] 4 JIT sub-files created:
  - `source-validation-rules.md` (4-dimension scoring: Authority 40%, Recency 30%, Completeness 20%, Relevance 10%)
  - `citation-templates.md` (3 formats: minimal/standard/detailed with selection guidelines)
  - `tier-system.md` (T1-T5 classification with domain patterns and conflict resolution)
  - `gap-detection.md` (AUTO-INCREMENT integration with 4 gap scenarios)
- [x] token-report.md (367 lines) - SC-004 compliance verification
- [x] validation-report.md (582 lines) - 100% SPEC-010 citation compliance
- [x] Go baseline skill (424 lines, ~1,696 tokens) - **first to apply SPEC-003 protocols**
  - Self-Critique: 100/100 (perfect score)
  - Source quality: 3 T1 sources (go.dev, golang.org), avg 100/100
  - Citation format: minimal YAML array (consistent with SPEC-010)
- [x] INDEX.md updated (5→6 baseline skills)
- [x] Documentation updated (MEMORY.md, agent files, ROADMAP.md)

### SPEC-003 All Phases Complete
- **Phase 1 (Preparation):** ✅ COMPLETE (execution checklist, data collection guide)
- **Phase 2 (Gap Analysis):** ✅ COMPLETE (5 gaps identified with priorities)
- **Phase 3 (Enhancement):** ✅ COMPLETE (WEB-RESEARCH refactored + 4 JIT sub-files)
- **Phase 4 (Integration):** ✅ COMPLETE (gap detection ↔ AUTO-INCREMENT)
- **Phase 5 (Documentation):** ✅ COMPLETE (token report, validation report)
- **Phase 6 (Final Report):** ✅ COMPLETE (tasks.md all 23 tasks marked complete)

### Metrics Achieved
| Metric | Target | Achieved |
|--------|--------|----------|
| WEB-RESEARCH quality score | ≥ 95 | 100 ✅ |
| Gap coverage | 100% (5/5 gaps) | 100% (5/5) ✅ |
| Main protocol tokens | <1,400 | 1,393 ✅ |
| SPEC-010 citation compliance | 100% | 100% (5/5 skills) ✅ |
| Go skill Self-Critique | ≥ 95 | 100 ✅ |

### Key Innovations
1. **4-Dimension Source Validation:** Authority (40%) + Recency (30%) + Completeness (20%) + Relevance (10%)
2. **3-Format Citation System:** Minimal (YAML array), Standard (inline with metadata), Detailed (full APA-like)
3. **T1-T5 Tier System:** Official docs → Community trusted → General resources → Forums → Legacy
4. **Gap Detection Integration:** AUTO-INCREMENT protocol now handles web research gaps

---

## v2.3.0 - Advanced Features & Ecosystem (NEXT)

**Status:** Planning  
**Estimate:** 5-7 days

### Objectives
1. Create ecosystem sub-files for existing baseline skills
2. Add more baseline skills (Rust, TypeScript, Ruby)
3. Version-specific advanced skills (e.g., Go 1.18+ generics)
4. Enhanced governance and validation tooling

### Deliverables (Planned)
- [ ] Ecosystem sub-files:
  - `go/ecosystem.md` (Gin, Echo, GORM, testing frameworks)
  - `python/ecosystem.md` (Django, Flask, FastAPI, pytest)
  - `javascript/ecosystem.md` (React, Node.js, Express, Jest)
- [ ] New baseline skills:
  - Rust baseline skill
  - TypeScript baseline skill
  - Ruby baseline skill
- [ ] Version-specific advanced skills:
  - Go 1.18+ (generics, fuzzing)
  - Python 3.10+ (pattern matching, structural typing)
  - JavaScript ES2023+ (latest features)
- [ ] Enhanced SKILL-GOVERNANCE.md:
  - Version migration guides
  - Ecosystem evolution policies
  - Cross-skill dependency tracking

### Metrics Target
| Metric | Target |
|--------|--------|
| Baseline skills total | 9 (current 6 + 3 new) |
| Ecosystem sub-files | 3+ |
| Advanced skills | 10+ |
| Governance quality | ≥ 95 |

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
| SPEC-001 (Self-Critique) | `.prompt-os/core/SELF-CRITIQUE.md` | ✅ Implemented |
| SPEC-002 (Auto-Increment) | `.prompt-os/core/AUTO-INCREMENT.md` | ✅ Implemented |
| SPEC-003 (Web Research) | `.prompt-os/core/WEB-RESEARCH.md` + 4 JIT sub-files | ✅ Implemented (Complete Session 24) |
| SPEC-004 (Vector DB/RAG) | `.prompt-os/core/KNOWLEDGE-BASE.md` | ✅ Implemented |
| SPEC-005 (Persona CLI) | `.prompt-os/core/PERSONA-GENERATOR.md` | ✅ Implemented |
| SPEC-010 (Language Baselines) | 6 baseline skills | ✅ Implemented (Complete, 6/6 skills) |

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

**EOF** | Roadmap v2.2.0
