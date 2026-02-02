# Itzamna PromptOS v1.0.0

> **Sistema Operacional Cognitivo para Programacao Paralela Humano-Agente**

[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Status](https://img.shields.io/badge/status-Production-green)]()
[![Skills](https://img.shields.io/badge/skills-17-purple)]()
[![Personas](https://img.shields.io/badge/personas-1-orange)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## O Que e o Itzamna PromptOS?

O **Itzamna PromptOS** e um sistema de orquestracao de prompts, skills e personas para agentes de IA. Inspirado em arquiteturas cognitivas (CoALA), ele permite:

- **Auto-geracao de Skills**: Gera e valida skills automaticamente via CLI
- **Human-in-the-Loop**: Nenhuma modificacao persistente sem aprovacao humana
- **Cross-Model**: Funciona com Claude, GPT, Gemini, Qwen, Cursor e outros
- **Modularidade**: Skills composiveis carregadas sob demanda (JIT)
- **Personas**: Composicoes de skills que definem papeis especializados

### Metafora Operacional

| Componente Biologico | Computacional | PromptOS |
|---------------------|---------------|----------|
| Cerebro | CPU | LLM (Claude/GPT/Gemini) |
| Memoria de Trabalho | RAM | Context Window |
| Memoria de Longo Prazo | Disco/SSD | MEMORY.md + skills/ |
| Sistema Nervoso | Barramento I/O | MCP (Model Context Protocol) |

---

## Quick Start

### 1. Clone o Repositorio

```bash
git clone https://github.com/seu-usuario/itzamna-prompt-os.git
cd itzamna-prompt-os
```

### 2. Gerar uma Skill

```bash
# Gerar skill com categoria especifica
node .prompt-os/scripts/brain.js generate skill "Docker containerization" --category devops

# Categorias disponiveis: frontend, backend, config, markup, devops, docs, testing
```

### 3. Aprovar/Rejeitar a Skill

O sistema apresentara um Human Gate:

```
============================================
 HUMAN GATE - APROVACAO NECESSARIA
============================================
 Skill: docker
 Dominio: devops
 Status: AGUARDANDO APROVACAO
============================================

[1] approve  - Aprovar e salvar skill
[2] view     - Ver skill completa
[3] edit     - Editar antes de salvar
[4] reject   - Rejeitar com motivo
[5] cancel   - Cancelar operacao

Escolha [1-5]:
```

### 4. Sincronizar Constitution

```powershell
# Ver status de sincronizacao
.\.prompt-os\scripts\sync-constitution.ps1 status

# Sincronizar para todos os agentes
.\.prompt-os\scripts\sync-constitution.ps1 push
```

---

## Estrutura do Projeto

```
itzamna-prompt-os/
├── README.md                    # Este arquivo
├── MEMORY.md                    # Estado persistente do sistema
├── AGENTS.md                    # Configuracao de agentes
│
├── skills/                      # Biblioteca de skills (17 total)
│   ├── INDEX.md                 # Indice de todas as skills
│   ├── frontend/                # HTML, CSS (3 skills)
│   ├── backend/                 # APIs, GraphQL, TypeScript (4 skills)
│   ├── config/                  # YAML, JSON, properties (3 skills)
│   ├── markup/                  # XML, XSLT, Markdown (3 skills)
│   ├── devops/                  # Git, Docker (2 skills)
│   ├── docs/                    # Technical writing (1 skill)
│   └── testing/                 # Test skills (1 skill)
│
├── personas/                    # Biblioteca de personas (1 total)
│   ├── INDEX.md                 # Indice de personas
│   └── senior-fullstack-developer/
│       └── PERSONA.md           # Desenvolvedor fullstack senior
│
├── .prompt-os/                  # Core do sistema
│   ├── scripts/
│   │   ├── brain.js             # CLI v1.1.0 para geracao de skills
│   │   └── sync-constitution.ps1 # Sincronizacao de constitution
│   ├── core/
│   │   ├── cli.py               # CLI Python alternativa
│   │   └── orchestrator.py      # Orquestrador principal
│   └── templates/
│       └── SKILL.template.md    # Template canonico de skill
│
├── .specify/                    # Spec-Kit integration
│   └── memory/
│       └── constitution.md      # Constitution v1.0.0
│
├── .claude/                     # Claude Code config
│   └── CONSTITUTION.md          # Synced from .specify
├── .qwen/                       # Qwen config
├── .gemini/                     # Gemini CLI config
├── .cursor/                     # Cursor IDE config
└── .opencode/                   # OpenCode config
```

---

## Skills Disponiveis (17 total)

### Backend (4 skills)
| Skill | Level | Descricao |
|-------|-------|-----------|
| [api-rest](skills/backend/api-rest/SKILL.md) | L2 | Design de APIs RESTful, HTTP methods, status codes |
| [graphql](skills/backend/graphql/SKILL.md) | L2 | Schemas, queries, mutations e resolvers |
| [python-async-programming](skills/backend/python-async-programming/SKILL.md) | L2 | Programacao assincrona com asyncio |
| [typescript](skills/backend/typescript/SKILL.md) | L2 | Types, interfaces, generics, tsconfig |

### DevOps (2 skills)
| Skill | Level | Descricao |
|-------|-------|-----------|
| [docker](skills/devops/docker/SKILL.md) | L2 | Containerizacao, multi-stage builds, docker-compose |
| [git](skills/devops/git/SKILL.md) | L1 | Controle de versao com Git |

### Frontend (3 skills)
| Skill | Level | Descricao |
|-------|-------|-----------|
| [html](skills/frontend/html/SKILL.md) | L1 | Estrutura e semantica HTML |
| [css-basico](skills/frontend/css/css-basico/SKILL.md) | L2 | Fundamentos de CSS |
| [css-grid-layout-avancado](skills/frontend/css/css-grid-layout-avancado/SKILL.md) | L2 | Layouts complexos com CSS Grid |

### Config (3 skills)
| Skill | Level | Descricao |
|-------|-------|-----------|
| [yaml-configuration-best-practices](skills/config/yaml-configuration-best-practices/SKILL.md) | L2 | YAML para configuracao e IaC |
| [json](skills/config/json/SKILL.md) | L1 | Formato JSON |
| [java-properties](skills/config/java-properties/SKILL.md) | L1 | Arquivos .properties |

### Markup (3 skills)
| Skill | Level | Descricao |
|-------|-------|-----------|
| [markdown](skills/markup/markdown/SKILL.md) | L1 | Formatacao de texto |
| [xml](skills/markup/xml/SKILL.md) | L1 | Estrutura e validacao XML |
| [xslt](skills/markup/xslt/SKILL.md) | L2 | Transformacoes XML |

### Docs & Testing (2 skills)
| Skill | Level | Descricao |
|-------|-------|-----------|
| [technical-writing](skills/docs/technical-writing/SKILL.md) | L2 | Redacao tecnica |
| [hello-world-test](skills/testing/hello-world-test/SKILL.md) | L0 | Skill de teste |

---

## Personas Disponiveis (1 total)

| Persona | Dominio | Skills Compostas |
|---------|---------|------------------|
| [senior-fullstack-developer](personas/senior-fullstack-developer/PERSONA.md) | Desenvolvimento | typescript, api-rest, docker, git, graphql |

---

## CLI Usage

### brain.js (Node.js CLI)

```bash
# Gerar skill com categoria
node .prompt-os/scripts/brain.js generate skill "descricao" --category backend

# Categorias: frontend, backend, config, markup, devops, docs, testing
```

### sync-constitution.ps1 (PowerShell)

```powershell
# Ver status de todos os agentes
.\.prompt-os\scripts\sync-constitution.ps1 status

# Sincronizar constitution para todos os agentes
.\.prompt-os\scripts\sync-constitution.ps1 push

# Puxar modificacoes de volta (com deteccao de conflitos)
.\.prompt-os\scripts\sync-constitution.ps1 pull
```

---

## Human Gate Protocol

O sistema implementa aprovacao humana obrigatoria para todas as operacoes de persistencia:

| Nivel | Operacao | Aprovacao |
|-------|----------|-----------|
| L1 | Boilerplate, linting | Auto-aprovado |
| L2 | Geracao de skills | Humana obrigatoria |
| L3 | Arquitetura, personas | Dupla revisao |

### Fluxos Suportados

- **approve**: Salva skill em `skills/{categoria}/{nome}/SKILL.md`
- **view**: Mostra skill completa antes de decidir
- **edit**: Salva como draft para edicao manual
- **reject**: Rejeita com motivo documentado
- **cancel**: Cancela operacao sem criar arquivos

---

## Spec-Kit Integration

Para features complexas (>5 dias), use o workflow Spec-Kit:

```bash
# Inicializar Spec-Kit
speckit init --here --ai claude

# Criar especificacao
/speckit.specify "Sistema de autenticacao OAuth2"
```

### Agentes Sincronizados

| Agente | Diretorio | Status |
|--------|-----------|--------|
| Claude Code | `.claude/` | Synced |
| Qwen | `.qwen/` | Synced |
| Gemini CLI | `.gemini/` | Synced |
| Cursor | `.cursor/` | Synced |
| OpenCode | `.opencode/` | Synced |

---

## Contribuindo

### Adicionar Nova Skill

1. Execute `node .prompt-os/scripts/brain.js generate skill "descricao" --category categoria`
2. Preencha os `[PLACEHOLDERS]` gerados
3. Aprove no Human Gate
4. Atualize `skills/INDEX.md` se necessario

### Adicionar Nova Persona

1. Crie diretorio `personas/{nome-persona}/`
2. Crie `PERSONA.md` seguindo o formato existente
3. Liste skills compostas no frontmatter
4. Atualize `personas/INDEX.md`

### Criar Nova Categoria de Skill

1. Crie diretorio `skills/{categoria}/`
2. Adicione categoria em `brain.js` (array de categorias)
3. Atualize `skills/INDEX.md` com nova secao

---

## Arquitetura

### Sistema de Memorias

| Tipo | Funcao | Persistencia |
|------|--------|--------------|
| **Working** | Contexto ativo da sessao | Sessao |
| **Episodica** | Historico de interacoes | 90 dias |
| **Semantica** | Knowledge base | Permanente |
| **Procedural** | Biblioteca de skills | Permanente |

### Niveis de Skills

| Level | Descricao |
|-------|-----------|
| L0 | Teste/exemplo |
| L1 | Fundamentos - conhecimento basico |
| L2 | Intermediario - padroes e boas praticas |
| L3 | Avancado - otimizacao e casos complexos |

---

## Documentacao Adicional

| Documento | Descricao |
|-----------|-----------|
| [MEMORY.md](./MEMORY.md) | Estado persistente do sistema |
| [AGENTS.md](./AGENTS.md) | Configuracao de agentes |
| [skills/INDEX.md](./skills/INDEX.md) | Indice completo de skills |
| [personas/INDEX.md](./personas/INDEX.md) | Indice de personas |
| [constitution.md](./.specify/memory/constitution.md) | Constitution v1.0.0 |

---

## Roadmap

### v1.0.0 (Atual) - Production
- [x] Arquitetura cognitiva baseada em CoALA
- [x] CLI brain.js v1.1.0 com --category
- [x] 17 skills em 7 categorias
- [x] 1 persona (senior-fullstack-developer)
- [x] Human Gate Protocol completo
- [x] Spec-Kit integration
- [x] Sync-constitution para 5 agentes

### v1.1.0 (Proxima)
- [ ] Vector DB para busca semantica
- [ ] Embeddings para retrieval de skills
- [ ] CLI para geracao de personas
- [ ] Integracao com Slack para aprovacoes

### v2.0.0 (Futuro)
- [ ] Meta-agent para auto-geracao de skills
- [ ] Otimizacao de prompts com DSPy
- [ ] Multi-agent coordination
- [ ] MCP compatibility completa

---

## Referencias

### Frameworks e Padroes
- [CoALA](https://arxiv.org/abs/2309.02427) - Cognitive Architectures for Language Agents
- [MCP](https://modelcontextprotocol.io/) - Model Context Protocol
- [LangGraph](https://github.com/langchain-ai/langgraph) - Workflows com estado
- [DSPy](https://dspy.ai/) - Programmatic prompts

### Ferramentas Suportadas
- [Claude Code](https://claude.ai/code) - Anthropic CLI
- [Cursor](https://cursor.com) - AI-first IDE
- [Gemini CLI](https://ai.google.dev/) - Google AI CLI
- [Qwen](https://qwen.ai/) - Alibaba AI

---

## Licenca

MIT License - veja [LICENSE](./LICENSE) para detalhes.

---

**Itzamna PromptOS v1.0.0** | Production Ready | 2026
