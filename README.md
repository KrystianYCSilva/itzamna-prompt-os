# Itzamna PromptOS v1.0.0 (Piloto)

> **Sistema Operacional Cognitivo para Programacao Paralela Humano-Agente**

[![Version](https://img.shields.io/badge/version-1.0.0--piloto-blue)]()
[![Status](https://img.shields.io/badge/status-Piloto-orange)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## O Que e o Itzamna PromptOS?

O **Itzamna PromptOS** e um sistema de orquestracao de prompts, skills e personas para agentes de IA. Inspirado em arquiteturas cognitivas (CoALA), ele permite:

- **Auto-geracao de Skills**: Pesquisa, gera e valida skills automaticamente
- **Human-in-the-Loop**: Nenhuma modificacao persistente sem aprovacao humana
- **Cross-Model**: Funciona com Claude, GPT, Gemini, DeepSeek e outros
- **Modularidade**: Skills composiveis carregadas sob demanda (JIT)

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

### 2. Estrutura do Projeto

```
itzamna-prompt-os/
├── README.md                    # Este arquivo
├── ARCHITECTURE.md              # Arquitetura detalhada
├── IMPLEMENTATION-GUIDE.md      # Guia de implementacao
├── GLOSSARIO-TECNICO-PROMPTOS.md # Referencia de termos
│
├── protocolo/                   # Protocolos do sistema
│   └── human-gate-protocol.md   # Protocolo de aprovacao humana
│
├── prompts/                     # Meta-prompts para geracao
│   ├── skill-generator-prompt.md
│   ├── persona-generator-prompt.md
│   └── research-pipeline-prompt.md
│
├── templates/                   # Templates canonicos
│   ├── SKILL.template.md
│   ├── MEMORY.template.md
│   ├── AGENTS.template.md
│   ├── INDEX.template.md
│   └── context/                 # Templates de contexto
│       ├── project-overview.template.md
│       ├── tech-stack.template.md
│       ├── architectural-rules.template.md
│       └── code-quality.template.md
│
├── guias/                       # RFCs e guias de migracao
│   ├── RFC-UNIFIED-CONTEXT-STRUCTURE.md
│   ├── RFC-UNIFIED-DOCS-STRUCTURE.md
│   └── BROWNFIELD-MIGRATION-GUIDE.md
│
├── scripts/                     # Scripts de validacao
│   └── validate-skill.ps1
│
└── .specify/                    # Integracao Spec-Kit
    ├── memory/
    │   └── constitution.md      # Constituicao do projeto
    └── templates/
        └── plan-template.md
```

---

## Conceitos Fundamentais

### 1. Skills

Skills sao unidades modulares de conhecimento procedural. Cada skill:

- Tem seu proprio diretorio: `skills/{skill-name}/SKILL.md`
- Contem metadata YAML obrigatorio
- Define triggers, constraints e exemplos
- E carregada sob demanda (JIT - Just-In-Time)

```markdown
---
name: "docker"
description: "Skill para containerizacao com Docker"
version: "1.0.0"
domain: "devops"
level: "L2"
tags: ["docker", "containers", "devops"]
triggers:
  - "trabalhar com docker"
  - "criar container"
---

# Docker

## Instrucoes
...
```

### 2. Personas

Personas sao composicoes de skills que definem um papel especifico:

```markdown
---
name: "senior-backend-dev"
type: "persona"
expertise: ["Python", "APIs", "databases"]
skills:
  - python
  - fastapi
  - postgresql
---
```

### 3. Sistema de Memorias

| Tipo | Funcao | Persistencia |
|------|--------|--------------|
| **Working** | Contexto ativo da sessao | Sessao |
| **Episodica** | Historico de interacoes | 90 dias |
| **Semantica** | Knowledge base | Permanente |
| **Procedural** | Biblioteca de skills | Permanente |

### 4. Niveis Cognitivos

| Nivel | Nome | Funcao | Aprovacao |
|-------|------|--------|-----------|
| **L1** | Automatico | Boilerplate, linting | Auto-aprovado |
| **L2** | Contextual | Geracao de skills | Humana |
| **L3** | Estrategico | Arquitetura, personas | Dupla revisao |

---

## Fluxo de Auto-Geracao

```
Usuario pede skill → Classificar → Pesquisar → Gerar → Validar → HUMANO APROVA → Salvar
```

### Human Gate (Aprovacao Humana)

Nenhum artefato e salvo sem aprovacao explicita:

```
┌─────────────────────────────────────────┐
│  HUMAN GATE - APROVACAO NECESSARIA      │
├─────────────────────────────────────────┤
│  Skill: kubernetes                      │
│  Dominio: cloud                         │
│  Validacao: 95/100                      │
├─────────────────────────────────────────┤
│  [approve] [view] [edit] [reject]       │
└─────────────────────────────────────────┘
```

---

## Integracao com Spec-Kit

Para features complexas (>5 dias), use o workflow Spec-Kit:

| Complexidade | Workflow |
|--------------|----------|
| Simples (<3 dias) | `brain generate skill` direto |
| Media (3-5 dias) | Spec-Kit recomendado |
| Complexa (>5 dias) | Spec-Kit **obrigatorio** |

```bash
# Inicializar Spec-Kit
speckit init --here --ai claude

# Criar especificacao
/speckit.specify "Sistema de autenticacao OAuth2"
```

---

## Documentacao

| Documento | Descricao |
|-----------|-----------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitetura cognitiva detalhada |
| [IMPLEMENTATION-GUIDE.md](./IMPLEMENTATION-GUIDE.md) | Guia de implementacao passo-a-passo |
| [GLOSSARIO-TECNICO-PROMPTOS.md](./GLOSSARIO-TECNICO-PROMPTOS.md) | Referencia de termos tecnicos |
| [human-gate-protocol.md](./protocolo/human-gate-protocol.md) | Protocolo de aprovacao humana |
| [constitution.md](./.specify/memory/constitution.md) | Constituicao e principios |

---

## Principios Fundamentais

1. **Human-in-the-Loop**: Aprovacao humana obrigatoria para persistencia
2. **Skill Modularity**: Capacidades encapsuladas em skills independentes
3. **Template Canonicity**: Todos artefatos seguem templates validados
4. **Cognitive Levels**: Operacoes classificadas em L1/L2/L3
5. **Memory System**: Quatro tipos de memoria persistente
6. **Generation Pipeline**: Classify → Research → Generate → Validate → Approve → Commit
7. **Spec-Kit Integration**: Features complexas usam workflow Spec-Kit

---

## Roadmap

### v1.0.0 (Piloto) - Atual
- [x] Arquitetura cognitiva baseada em CoALA
- [x] Templates canonicos para Skills, Personas, Prompts
- [x] Protocolo Human Gate
- [x] Integracao basica com Spec-Kit
- [x] Scripts de validacao

### v1.1.0 (Proxima)
- [ ] CLI funcional (`brain generate skill`)
- [ ] Vector DB para busca semantica
- [ ] Embeddings para retrieval de skills
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
- [Claude Code](https://code.claude.com) - Anthropic CLI
- [GitHub Copilot](https://docs.github.com/copilot) - GitHub AI
- [Cursor](https://cursor.com) - AI-first IDE
- [Gemini CLI](https://geminicli.com) - Google AI CLI

---

## Licenca

MIT License - veja [LICENSE](./LICENSE) para detalhes.

---

**Itzamna PromptOS v1.0.0 (Piloto)** | 2026
