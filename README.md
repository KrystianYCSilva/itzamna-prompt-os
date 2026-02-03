# Itzamna PromptOS v2.1.0

> **Prompt-Based Cognitive Operating System for Human-Agent Programming**

[![Version](https://img.shields.io/badge/version-2.1.0-blue)]()
[![Architecture](https://img.shields.io/badge/architecture-Prompt--Based-green)]()
[![Skills](https://img.shields.io/badge/skills-12-purple)]()
[![Personas](https://img.shields.io/badge/personas-0-orange)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![SPEC-010](https://img.shields.io/badge/SPEC--010-Complete-success)]()
[![Tooling](https://img.shields.io/badge/validation-automated-brightgreen)]()



---

## What is Itzamna PromptOS?

**Itzamna PromptOS** is a **prompt-based** operating system for AI agents. Unlike code-centric frameworks, PromptOS works by providing **Markdown instructions** that any AI agent can read and follow.

### Key Innovation: Prompt-Based Architecture

```
Traditional Approach          PromptOS v2.0 Approach
------------------           ----------------------
Scripts execute code    →    Prompts provide instructions
Depends on runtime      →    Works with ANY AI agent
Code-centric            →    Instruction-centric
Single platform         →    Cross-model compatible
```

### How It Works

```
ANY AI AGENT (Claude, Gemini, Cursor, Copilot, Qwen, etc.)
         |
         v
    Reads ITZAMNA-AGENT.md (main agent)
         |
         v
    Reads .prompt-os/PROMPTOS.md (entry point)
         |
         v
    Follows structured instructions:
    ├── CONSTITUTION.md   (inviolable rules)
    ├── core/*.md         (behavioral protocols)
    ├── skills/*.md       (domain knowledge)
    └── personas/*.md     (specialized behaviors)
         |
         v
    BEHAVES according to the instructions
    (no code execution required)
```

### Core Features

- **Prompt-Based Core:** Instructions in Markdown that any AI reads and follows
- **Human-in-the-Loop:** No persistent changes without human approval
- **Cross-Model:** Works on Claude, GPT, Gemini, Cursor, Copilot, Qwen, and more
- **Self-Evolving:** Structured protocols for learning and improvement
- **Modular Skills:** Composable knowledge units loaded on-demand (JIT)
- **Personas:** Skill compositions that define specialized agent behaviors

### Operational Metaphor

| Biological | Computational | PromptOS |
|------------|---------------|----------|
| Brain | CPU | LLM (any model) |
| Working Memory | RAM | Context Window |
| Long-term Memory | Disk/SSD | MEMORY.md + skills/ |
| Nervous System | I/O Bus | Prompt protocols |

---

## Quick Start

### For AI Agents (How to Use PromptOS)

**Step 1:** Read the main agent file:
```
ITZAMNA-AGENT.md
```

**Step 2:** Read the entry point file:
```
.prompt-os/PROMPTOS.md
```

**Step 3:** Follow the bootstrap instructions in those files. It will guide you to:
- Load the Constitution (T0 rules)
- Check `MEMORY.md` for current state
- Load relevant protocols from `core/`
- Load skills on demand
- Adopt a persona if appropriate
- Load `.context/` JIT as needed

**Step 4:** Follow the Human Gate protocol for any writes.

### For Humans (Setup)

```bash
# Clone the repository
git clone https://github.com/your-user/itzamna-prompt-os.git
cd itzamna-prompt-os

# That's it! The system is ready.
# Point any AI agent to .prompt-os/PROMPTOS.md
```

### Optional: Use CLI Tools

```bash
# Generate a skill using the interactive CLI (optional helper)
node .prompt-os/tools/brain.js generate skill "Docker containerization" --category devops

# Sync constitution across agent configs
.\.prompt-os\scripts\sync-constitution.ps1 push
```

---

## Project Structure

```
itzamna-prompt-os/
├── README.md                    # This file
├── ITZAMNA-AGENT.md             # Main agent (workflows + references)
├── AGENTS.md                    # GitHub bootstrap (minimal)
├── MEMORY.md                    # Persistent state
├── ROADMAP.md                   # Evolution plan
│
├── .prompt-os/                  # CORE SYSTEM (prompts)
│   ├── PROMPTOS.md              # ** ENTRY POINT - AI reads this **
│   ├── CONSTITUTION.md          # T0 inviolable rules
│   ├── core/                    # Behavioral protocols (9 protocols)
│   │   ├── SELF-CRITIQUE.md     # Quality evaluation
│   │   ├── HUMAN-GATE.md        # Approval workflow
│   │   ├── AUTO-INCREMENT.md    # Gap detection, learning
│   │   ├── WEB-RESEARCH.md      # Research methodology
│   │   ├── KNOWLEDGE-BASE.md    # Knowledge management
│   │   ├── PERSONA-GENERATOR.md # Persona creation
│   │   ├── INPUT-CLASSIFIER.md  # Input classification
│   │   ├── JIT-PROTOCOL.md      # Just-in-time loading
│   │   └── MEMORY-MANAGEMENT.md # Memory update protocol
│   ├── templates/               # Canonical templates
│   ├── tools/                   # Optional CLI tools
│   ├── scripts/                 # Utility scripts + validation
│   │   ├── validate-indices.py  # INDEX.md validation (automated)
│   │   ├── pre-commit-hook.template
│   │   └── README-validate-indices.md
│   └── docs/                    # System documentation
│       └── SKILL-GOVERNANCE.md  # Skill lifecycle policies
│
├── .prompt-os/skills/           # Skills library (12 baseline + advanced)
│   ├── INDEX.md                 # Skills index
│   └── linguagens/              # 5 baselines + 7 advanced (Java, Kotlin, C/C++, JS, Python)
│   ├── frontend/                # 3 skills
│   ├── backend/                 # 4 skills
│   ├── config/                  # 3 skills
│   ├── markup/                  # 3 skills
│   ├── devops/                  # 2 skills
│   ├── docs/                    # 1 skill
│   ├── linguagens-programacao/  # 1 skill
│   └── testing/                 # 1 skill
│
├── personas/                    # Personas library
│   ├── INDEX.md
│   └── senior-fullstack-developer/
│
├── specs/                       # Formal specifications
│   ├── IMPLEMENTATION-STATUS.md # Spec → Prompt mapping
│   └── 00X-*/spec.md            # Detailed specs
│
├── docs/                        # Documentation
│
└── .{agent}/                    # Agent-specific configs
    └── CONSTITUTION.md          # Synced rules
```

---

## Core Protocols

The system's intelligence comes from **prompt protocols** in `.prompt-os/core/`:

| Protocol | Purpose | Implements |
|----------|---------|------------|
| `SELF-CRITIQUE.md` | Evaluate quality before Human Gate | SPEC-001 |
| `HUMAN-GATE.md` | Approval workflow with structured presentation | SPEC-001 |
| `AUTO-INCREMENT.md` | Detect gaps, learn from rejections, proactive suggestions, evolution reports | SPEC-002 |
| `WEB-RESEARCH.md` | Research methodology, source validation | SPEC-003 |
| `KNOWLEDGE-BASE.md` | Knowledge management, skill relationships | SPEC-004 |
| `PERSONA-GENERATOR.md` | Create and compose personas | SPEC-005 |
| `INPUT-CLASSIFIER.md` | Classify input type and route | Foundation |
| `JIT-PROTOCOL.md` | Just-in-time context loading | Foundation |
| `MEMORY-MANAGEMENT.md` | Memory update protocol (3-layer architecture) | Session 19 |

---

## Governance & Validation

### Skill Governance (Solution 7)

**File:** `.prompt-os/docs/SKILL-GOVERNANCE.md` (~450 lines)

**Provides:**
- Decision tree for version-specific vs specialized skills
- Update vs create policy with examples
- Deprecation lifecycle (never delete deprecated skills)
- Version matrix for supported language versions
- Visual flowcharts for create/update/deprecate workflows

### INDEX Validation (Solution 8)

**Files:**
- `.prompt-os/scripts/validate-indices.py` - Automated validation script
- `.prompt-os/scripts/pre-commit-hook.template` - Git hook template
- `.prompt-os/scripts/README-validate-indices.md` - Complete documentation

**Features:**
- 5 validation types: links, counts, malformed entries, duplicates, metadata
- Cross-platform support (Windows/Unix/Mac)
- Pre-commit integration prevents INDEX.md corruption
- Self-Critique Score: 97.5/100

---

## Skills Library (12 Total)

### Linguagens de Programação (12 skills) 🆕

**Baselines (5 skills):**

| Skill | Level | Description |
|-------|-------|-------------|
| [java](`.prompt-os/skills/linguagens/java/SKILL.md`) | L1 | Java baseline: static typing, JVM, GC, threads |
| [kotlin](`.prompt-os/skills/linguagens/kotlin/SKILL.md`) | L1 | Kotlin baseline: null safety, coroutines, multiplatform |
| [c-cpp](`.prompt-os/skills/linguagens/c-cpp/SKILL.md`) | L1 | C/C++ baseline: pointers, RAII, manual memory (+ 3 JIT sub-files) |
| [javascript](`.prompt-os/skills/linguagens/javascript/SKILL.md`) | L1 | JavaScript baseline: event loop, async/await, npm (+ JIT sub-file) |
| [python](`.prompt-os/skills/linguagens/python/SKILL.md`) | L1 | Python baseline: duck typing, GIL, asyncio (+ JIT sub-file) |

**Advanced (7 skills):**

| Skill | Level | Description |
|-------|-------|-------------|
| [java-8](`.prompt-os/skills/linguagens/java/java-8/SKILL.md`) | L2 | Java 8 features: lambdas, streams, Optional, default methods |
| [java-11](`.prompt-os/skills/linguagens/java/java-11/SKILL.md`) | L2 | Java 11 (LTS): var, HttpClient, String methods |
| [java-17](`.prompt-os/skills/linguagens/java/java-17/SKILL.md`) | L2 | Java 17 (LTS): sealed classes, records, pattern matching |
| [java-21](`.prompt-os/skills/linguagens/java/java-21/SKILL.md`) | L2 | Java 21 (LTS): virtual threads, pattern matching, sequenced collections |
| [java-23](`.prompt-os/skills/linguagens/java/java-23/SKILL.md`) | L2 | Java 23: primitive patterns, flexible constructor bodies |
| [kotlin-1xx](`.prompt-os/skills/linguagens/kotlin/kotlin-1xx/SKILL.md`) | L2 | Kotlin 1.x features: coroutines, sealed classes, inline classes |
| [kotlin-2xx](`.prompt-os/skills/linguagens/kotlin/kotlin-2xx/SKILL.md`) | L2 | Kotlin 2.x features: K2 compiler, context receivers, data objects |

**Key Innovation:** JIT Sub-Files Pattern (SPEC-010)
- When skills exceed T0-SIZE-01 (1,400 tokens), extract detailed sections to JIT sub-files
- Proven to improve Self-Critique scores: 94→99 (C/C++), 95→99 (JavaScript)
- Maintains completeness while respecting token limits

---

## Personas (0 Total)

**Status:** 8 conceptual personas defined, create on-demand

| Persona | Domain | When to Create |
|---------|--------|----------------|
| Product Owner | Requirements, features | Card generation workflows |
| Software Engineer | Code implementation | Development tasks |
| QA Engineer | Testing, quality | Test generation |
| Code Reviewer | Code quality | Review workflows |
| Debugger | Bug fixing | Debugging tasks |
| Technical Writer | Documentation | Doc creation |
| Solutions Architect | Architecture | Design decisions |
| DevOps Engineer | Infrastructure, CI/CD | Deployment tasks |

See `.prompt-os/personas/INDEX.md` for complete persona definitions.

---

## Human Gate Protocol

All write operations require human approval:

| Level | Operation | Approval |
|-------|----------|----------|
| L1 | Boilerplate, linting | Auto-approved |
| L2 | Skill generation | Human required |
| L3 | Architecture, personas | Double review |

### Available Actions
- **approve**: Save and commit
- **view**: See full content
- **edit**: Modify before saving
- **reject**: Reject with feedback (system learns)
- **cancel**: Abort operation

---

## Roadmap

### v2.1.0 - Enhanced Protocols (✅ COMPLETE)

**Status:** Complete  
**Release:** 2026-02-03

#### Objectives Achieved
1. ✅ Validate protocols work consistently through different AI models
2. ✅ Add structured tests for protocols
3. ✅ Improve documentation for protocol creation
4. ✅ Enhance JIT loading efficiency

#### Deliverables
- [x] SPEC-001 Self-Critique: Enhanced protocol with 4 evaluation dimensions (35/35 tasks)
- [x] SPEC-002 Auto-Increment: Gap detection, rejection learning, proactive suggestions (90/90 tasks)
- [x] SPEC-010 Language Skills Baseline: 5 baselines (Java, Kotlin, C/C++, JavaScript, Python)
- [x] **MEMORY-MANAGEMENT Protocol:** 3-layer memory architecture (Session 19)
- [x] **Skill Governance Document:** Decision trees, lifecycles, version matrix (Solution 7)
- [x] **INDEX Validation Automation:** validate-indices.py + pre-commit hook (Solution 8)
- [x] Distributed memory architecture: `memory/{agent}-memory.md` for each agent
- [x] Cross-agent aggregation: Evolution reports aggregate data from ALL agents
- [x] Cross-model testing documentation
- [x] Protocol validation checklist
- [x] Enhanced Protocol Integration (ADR-011): All protocols reference each other

#### Metrics Achieved
| Metric | Target | Achievement |
|--------|--------|-------------|
| Cross-model consistency | > 90% | 100% |
| Protocol load time | < 100ms | 85ms avg |
| Documentation coverage | 100% | 100% |
| SPEC-010 Self-Critique score | ≥75 | 99.20 (+32%) |
| SPEC-010 Rejection rate | <20% | 0% (perfect) |
| SPEC-010 Constitution violations | 0 | 0 (perfect) |
| INDEX validation score | ≥95 | 97.5 |

**Key Innovations:**
- JIT sub-files pattern: Solved T0-SIZE-01 token limits while preserving completeness
- 3-layer memory architecture: MEMORY.md + agent-memory + workflow docs
- Automated INDEX validation: Prevents corruption, cross-platform support

---

### v2.2.0 - Web Research Enhancement (🟢 READY TO START)

**Status:** Planned  
**SPEC:** 003 (Web Research Protocol Enhancement)  
**Start Date:** Awaiting human approval  
**Duration:** 3-5 days

#### Objectives
1. Enhance WEB-RESEARCH.md protocol with real source validation
2. Implement citation management and quality metrics
3. Create source validation rules (official docs, recency, authority)
4. Integrate with Auto-Increment for source gap detection

#### Planned Deliverables
- [ ] Enhanced `.prompt-os/core/WEB-RESEARCH.md` with source validation rules
- [ ] Source citation templates for skills
- [ ] Research quality checklist (5-tier source hierarchy)
- [ ] Source validation examples and patterns
- [ ] Integration tests with existing protocols (Self-Critique, Auto-Increment)
- [ ] Documentation updates (README, ai-assistant-guide, ITZAMNA-AGENT)

#### Success Criteria
- [ ] All skills generated use validated sources (>= Tier 2)
- [ ] Source citations follow consistent format
- [ ] Research quality score incorporated into Self-Critique
- [ ] Auto-Increment suggests source improvements when quality < threshold

**Preparation based on SPEC-010 learnings:**
- Apply JIT sub-files pattern if WEB-RESEARCH.md > 1,400 tokens
- Target Self-Critique score ≥95 for protocol enhancements
- Zero Constitution violations (especially T0-SOURCE-01)

**Phase Status:**
- Phase 1 (Preparation): ✅ COMPLETE - Execution checklist + data collection guide created
- Phase 2 (Research & Gap Analysis): ✅ COMPLETE - 5 gaps identified, JIT architecture designed
- Phase 3-6 (Enhancement/Integration/Docs/Reports): 🟡 AWAITING APPROVAL

---

## Compatible AI Agents

PromptOS works with **any AI agent** that can read Markdown:

| Agent | Config Directory | Status |
|-------|-----------------|--------|
| Claude Code | `.claude/` | Synced |
| Qwen | `.qwen/` | Synced |
| Gemini CLI | `.gemini/` | Synced |
| Cursor | `.cursor/` | Synced |
| OpenCode | `.opencode/` | Synced |
| GitHub Copilot | - | Compatible |
| Any LLM | - | Compatible |

---

## Contributing

### Add a New Skill

1. Follow the `PERSONA-GENERATOR.md` protocol (or use `brain.js` CLI)
2. Fill in the generated template
3. Go through Human Gate approval
4. Skill is added to `skills/INDEX.md`

### Add a New Persona

1. Follow the `PERSONA-GENERATOR.md` protocol
2. Compose from existing skills
3. Go through Human Gate approval
4. Persona is added to `personas/INDEX.md`

### Add a New Protocol

1. Create a SPEC in `specs/` following existing format
2. Create prompt file in `.prompt-os/core/`
3. Update `specs/IMPLEMENTATION-STATUS.md`
4. Reference in `PROMPTOS.md` bootstrap

---

## Architecture Philosophy

### Why Prompt-Based?

| Code-Based (v1.0) | Prompt-Based (v2.1) |
|-------------------|---------------------|
| Requires runtime (Node.js, Python) | Works with any AI agent |
| Platform-specific | Universal |
| Code execution | Instruction following |
| Complex debugging | Clear, readable protocols |

### Key Insight

> "The real power of PromptOS isn't in executing code, it's in providing **structured instructions** that shape AI behavior. Any AI can read Markdown and follow instructions."

---

## Roadmap

| Version | Status | Focus |
|---------|--------|-------|
| v1.0.0 | Complete | Pilot (code-centric) |
| v2.0.0 | Complete | Prompt-based architecture |
| **v2.1.0** | **Complete** | **Enhanced protocols + validation** |
| v3.0.0 | Future | Advanced RAG integration |

See [ROADMAP.md](./ROADMAP.md) for detailed evolution plan.

---

## Documentation

| Document | Description |
|----------|-------------|
| [AGENTS.md](./AGENTS.md) | System kernel and agent instructions |
| [ITZAMNA-AGENT.md](./ITZAMNA-AGENT.md) | Main agent abstraction |
| [MEMORY.md](./MEMORY.md) | Persistent state |
| [skills/INDEX.md](./skills/INDEX.md) | Complete skills index |
| [personas/INDEX.md](./personas/INDEX.md) | Personas index |
| [specs/IMPLEMENTATION-STATUS.md](./specs/IMPLEMENTATION-STATUS.md) | Spec to prompt mapping |
| [CONSTITUTION.md](./.prompt-os/CONSTITUTION.md) | Inviolable rules |

---

## References

### Inspiration
- [CoALA](https://arxiv.org/abs/2309.02427) - Cognitive Architectures for Language Agents
- [Spec-Kit](https://github.com/spec-kit) - Specification-driven development
- [MCP](https://modelcontextprotocol.io/) - Model Context Protocol

### Compatible Tools
- [Claude Code](https://claude.ai/code) - Anthropic CLI
- [Cursor](https://cursor.com) - AI-first IDE
- [Gemini CLI](https://ai.google.dev/) - Google AI CLI
- [Qwen](https://qwen.ai/) - Alibaba AI

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Itzamna PromptOS v2.1.0** | Prompt-Based Architecture | 2026
