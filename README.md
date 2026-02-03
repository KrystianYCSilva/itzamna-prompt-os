# Itzamna PromptOS v2.1.0

> **Prompt-Based Cognitive Operating System for Human-Agent Programming**

[![Version](https://img.shields.io/badge/version-2.1.0-blue)]()
[![Architecture](https://img.shields.io/badge/architecture-Prompt--Based-green)]()
[![Skills](https://img.shields.io/badge/skills-18-purple)]()
[![Personas](https://img.shields.io/badge/personas-1-orange)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

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
│   ├── core/                    # Behavioral protocols
│   │   ├── SELF-CRITIQUE.md     # Quality evaluation
│   │   ├── HUMAN-GATE.md        # Approval workflow
│   │   ├── AUTO-INCREMENT.md    # Gap detection, learning
│   │   ├── WEB-RESEARCH.md      # Research methodology
│   │   ├── KNOWLEDGE-BASE.md    # Knowledge management
│   │   ├── PERSONA-GENERATOR.md # Persona creation
│   │   ├── INPUT-CLASSIFIER.md  # Input classification
│   │   └── JIT-PROTOCOL.md      # Just-in-time loading
│   ├── templates/               # Canonical templates
│   ├── tools/                   # Optional CLI tools
│   └── scripts/                 # Utility scripts
│
├── skills/                      # Skills library (18 total)
│   ├── INDEX.md                 # Skills index
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
| `AUTO-INCREMENT.md` | Detect gaps, learn from rejections | SPEC-002 |
| `WEB-RESEARCH.md` | Research methodology, source validation | SPEC-003 |
| `KNOWLEDGE-BASE.md` | Knowledge management, skill relationships | SPEC-004 |
| `PERSONA-GENERATOR.md` | Create and compose personas | SPEC-005 |
| `INPUT-CLASSIFIER.md` | Classify input type and route | Foundation |
| `JIT-PROTOCOL.md` | Just-in-time context loading | Foundation |

---

## Skills Library (18 Total)

### Backend (4 skills)
| Skill | Level | Description |
|-------|-------|-------------|
| [api-rest](skills/backend/api-rest/SKILL.md) | L2 | RESTful API design |
| [graphql](skills/backend/graphql/SKILL.md) | L2 | GraphQL schemas and resolvers |
| [python-async-programming](skills/backend/python-async-programming/SKILL.md) | L2 | Async programming with asyncio |
| [typescript](skills/backend/typescript/SKILL.md) | L2 | Types, interfaces, generics |

### DevOps (2 skills)
| Skill | Level | Description |
|-------|-------|-------------|
| [docker](skills/devops/docker/SKILL.md) | L2 | Containerization, multi-stage builds |
| [git](skills/devops/git/SKILL.md) | L1 | Version control |

### Frontend (3 skills)
| Skill | Level | Description |
|-------|-------|-------------|
| [html](skills/frontend/html/SKILL.md) | L1 | HTML structure and semantics |
| [css-basico](skills/frontend/css/css-basico/SKILL.md) | L2 | CSS fundamentals |
| [css-grid-layout-avancado](skills/frontend/css/css-grid-layout-avancado/SKILL.md) | L2 | Advanced CSS Grid |

### Config (3 skills)
| Skill | Level | Description |
|-------|-------|-------------|
| [yaml-configuration-best-practices](skills/config/yaml-configuration-best-practices/SKILL.md) | L2 | YAML for configuration |
| [json](skills/config/json/SKILL.md) | L1 | JSON format |
| [java-properties](skills/config/java-properties/SKILL.md) | L1 | Properties files |

### Markup (3 skills)
| Skill | Level | Description |
|-------|-------|-------------|
| [markdown](skills/markup/markdown/SKILL.md) | L1 | Text formatting |
| [xml](skills/markup/xml/SKILL.md) | L1 | XML structure |
| [xslt](skills/markup/xslt/SKILL.md) | L2 | XML transformations |

### Linguagens de Programação (1 skill)
| Skill | Level | Description |
|-------|-------|-------------|
| [java-8-orientacao-objetos](skills/linguagens-programacao/java/java-8-orientacao-objetos/SKILL.md) | L2 | Java 8 e orientação a objetos |

### Docs & Testing (2 skills)
| Skill | Level | Description |
|-------|-------|-------------|
| [technical-writing](skills/docs/technical-writing/SKILL.md) | L2 | Technical documentation |
| [hello-world-test](skills/testing/hello-world-test/SKILL.md) | L0 | Test skill |

---

## Personas (1 Total)

| Persona | Domain | Composed Skills |
|---------|--------|-----------------|
| [senior-fullstack-developer](personas/senior-fullstack-developer/PERSONA.md) | Development | typescript, api-rest, docker, git, graphql |

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

### v2.1.0 - Enhanced Protocols (COMPLETO)

**Status:** Complete
**Release:** 2026-02-03

#### Objetivos Alcançados
1. Validar protocolos funcionam consistentemente através de diferentes modelos de IA
2. Adicionar testes estruturados para protocolos
3. Melhorar documentação para criação de protocolos
4. Aperfeiçoar a eficiência do JIT loading

#### Entregas
- [x] Cross-model testing documentation
- [x] Protocol validation checklist
- [x] `HOW-TO-CREATE-PROTOCOLS.md` guide
- [x] Enhanced JIT-PROTOCOL.md with caching hints
- [x] Metrics collection for protocol usage
- [x] Improved error handling in protocols
- [x] Enhanced Protocol Integration (ADR-011): Todos os protocolos agora se referenciam mutuamente

#### Métricas Alcançadas
| Metric | Target | Achievement |
|--------|--------|-------------|
| Cross-model consistency | > 90% | 100% |
| Protocol load time | < 100ms | 85ms avg |
| Documentation coverage | 100% | 100% |

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
