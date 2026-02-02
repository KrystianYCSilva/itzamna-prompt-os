# Itzamna PromptOS v1.0.0 - Arquitetura

> **Sistema Operacional Cognitivo para Programacao Paralela Humano-Agente**
>
> Este documento consolida a arquitetura tecnica do Itzamna PromptOS, baseada no framework
> CoALA (Cognitive Architectures for Language Agents) simplificado para implementacao pratica.

---

## Indice

1. [Visao Geral](#1-visao-geral)
2. [Arquitetura Cognitiva](#2-arquitetura-cognitiva)
3. [Sistema de Memorias](#3-sistema-de-memorias)
4. [Niveis Cognitivos](#4-niveis-cognitivos)
5. [Fluxo de Auto-Geracao](#5-fluxo-de-auto-geracao)
6. [Human Gate Protocol](#6-human-gate-protocol)
7. [Templates Canonicos](#7-templates-canonicos)
8. [Integracao Spec-Kit](#8-integracao-spec-kit)
9. [Estrutura de Diretorios](#9-estrutura-de-diretorios)

---

## 1. Visao Geral

### 1.1 O Que Este Sistema Resolve

O Itzamna PromptOS implementa um mecanismo de **auto-incrementacao controlada** onde:

1. O usuario solicita algo que nao existe (ex: "skill para GraphQL")
2. O sistema pesquisa automaticamente melhores praticas
3. Gera skill/persona/prompt seguindo templates padronizados
4. **Humano aprova** antes de persistir
5. Sistema indexa e disponibiliza para uso futuro

### 1.2 Principios Arquiteturais

| Principio | Implementacao |
|-----------|---------------|
| **Simplicidade** | Apenas 4 tipos de memoria (vs 7+ em CoALA completo) |
| **Human-in-the-Loop** | Aprovacao obrigatoria antes de commit |
| **Conversacional** | Usuario pode sugerir/corrigir durante geracao |
| **Incremental** | Comeca com programacao, expande depois |
| **Cross-Model** | Funciona em Claude/GPT/Gemini/DeepSeek |

### 1.3 Stack Tecnologica Recomendada

```yaml
# Implementacao Minima (MVP)
runtime: Node.js 20+ ou Python 3.11+
llm_primary: claude-sonnet-4-20250514
llm_fallback: gpt-4o-mini | gemini-flash
storage: Filesystem (SKILL.md files)
indexing: Keyword matching (upgrade para embeddings depois)
validation: JSON Schema + regex

# Implementacao Completa
vector_db: ChromaDB ou Pinecone
embeddings: text-embedding-3-small
workflow_engine: LangGraph
mcp_server: modelcontextprotocol/servers
```

---

## 2. Arquitetura Cognitiva

### 2.1 CoALA Simplificado

Baseado no framework CoALA (Cognitive Architectures for Language Agents), mas **drasticamente simplificado** para implementacao pratica:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ITZAMNA PROMPTOS BRAIN ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │               GLOBAL WORKSPACE (Hub de Atencao)                   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │  │
│  │  │ Goal Ativo  │  │  Contexto   │  │  Broadcast  │               │  │
│  │  │ (Tarefa)    │  │  (~10K tok) │  │  (Notify)   │               │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│           │                    │                    │                   │
│           ▼                    ▼                    ▼                   │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐            │
│  │   RECALL    │      │   REASON    │      │     ACT     │            │
│  │  (Memory)   │      │    (LLM)    │      │   (Tools)   │            │
│  ├─────────────┤      ├─────────────┤      ├─────────────┤            │
│  │• Working    │      │• Classify   │      │• Web Search │            │
│  │• Episodic   │      │• Plan       │      │• File Ops   │            │
│  │• Semantic   │      │• Generate   │      │• Code Exec  │            │
│  │• Procedural │      │• Validate   │      │• Human Gate │            │
│  └─────────────┘      └─────────────┘      └─────────────┘            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Global Workspace

O **Global Workspace** implementa a teoria de Baars: multiplos modulos competem por atencao, e o vencedor faz broadcast de informacao para todo o sistema.

| Componente | Funcao | Implementacao |
|------------|--------|---------------|
| Goal Ativo | Tarefa atual em foco | String + metadata |
| Contexto | Buffer de trabalho | ~10K tokens |
| Broadcast | Notifica modulos | Event system |

### 2.3 Modulos Principais

| Modulo | Funcao | Componentes |
|--------|--------|-------------|
| **RECALL** | Acesso a memorias | Working, Episodica, Semantica, Procedural |
| **REASON** | Processamento LLM | Classificar, Planejar, Gerar, Validar |
| **ACT** | Execucao de acoes | Web Search, File Ops, Human Gate |

---

## 3. Sistema de Memorias

### 3.1 Quatro Tipos de Memoria

```yaml
# 1. WORKING MEMORY (Sessao)
tipo: context_window
capacidade: ~10K tokens
persistencia: Apenas durante sessao
implementacao: Buffer de mensagens da conversa
uso: Manter contexto da tarefa atual

# 2. EPISODIC MEMORY (Historico)
tipo: chromadb_collection ou arquivo JSON
capacidade: Ilimitado (com retention policy)
persistencia: 90 dias padrao
implementacao: Vector DB com timestamps
uso: "Lembra quando fizemos X?"

# 3. SEMANTIC MEMORY (Conhecimento)
tipo: embeddings + knowledge base
capacidade: Ilimitado
persistencia: Permanente
implementacao: RAG com skills/docs indexados
uso: "O que e GraphQL?"

# 4. PROCEDURAL MEMORY (Skills)
tipo: filesystem (SKILL.md files)
capacidade: Ilimitado
persistencia: Permanente
implementacao: Biblioteca de skills indexada
uso: "Como fazer X?"
```

### 3.2 Diagrama do Sistema de Memorias

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      SISTEMA DE MEMORIAS v1.0                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │              WORKING MEMORY (Memoria de Trabalho)                │   │
│  │  • Localizacao: Context Window do LLM                            │   │
│  │  • Capacidade: ~200K tokens (modelo dependente)                  │   │
│  │  • Persistencia: Apenas durante sessao                           │   │
│  │  • Conteudo: Goal atual + Skills carregadas + Historico recente  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                               ↕                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        │
│  │    EPISODICA    │  │    SEMANTICA    │  │   PROCEDURAL    │        │
│  │   (Experiencias)│  │  (Conhecimento) │  │    (Skills)     │        │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤        │
│  │ MEMORY.md       │  │ skills/         │  │ prompts/        │        │
│  │ • Decisoes      │  │ • academic/     │  │ • meta-prompts  │        │
│  │ • Erros         │  │ • technology/   │  │ • generators    │        │
│  │ • Aprendizados  │  │ • INDEX.md      │  │ • workflows     │        │
│  │ • Timestamps    │  │ • embeddings/   │  │                 │        │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘        │
│                                                                         │
│  PERSISTENCIA: Git + Filesystem (sem banco de dados no MVP)            │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.3 MEMORY.md - Template de Estado Persistente

O arquivo `MEMORY.md` mantem o estado persistente entre sessoes:

```markdown
# MEMORY.md - Estado Persistente

**Ultima Atualizacao:** {timestamp}
**Versao:** 1.0.0
**Sessoes Totais:** {count}

## Estatisticas

| Metrica | Valor |
|---------|-------|
| Skills Geradas | {n} |
| Personas Geradas | {n} |
| Taxa de Aprovacao | {%} |

## Memoria Episodica Recente

| Data | Tipo | Nome | Status |
|------|------|------|--------|
| 2026-01-26 | skill | graphql-api | Aprovado |
| 2026-01-25 | persona | devops-engineer | Aprovado |

## Pendencias

- [ ] Skill `kubernetes-basics` aguardando aprovacao
```

---

## 4. Niveis Cognitivos

### 4.1 Sistema de 3 Niveis

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NIVEL 3: ESTRATEGICO (Cortex Pre-Frontal) - Ciclo: 5-15 minutos       │
│  • Planejamento de arquitetura                                          │
│  • Decisoes de design                                                   │
│  • Verificacao de requisitos                                            │
│  • Metacognicao: "O que estou fazendo?"                                │
│  TRIGGER: Criacao de specs, arquitetura, roadmaps                      │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ feedback top-down (constraints)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NIVEL 2: CONTEXTUAL (Sistema Limbico) - Ciclo: 10-60 segundos         │
│  • Julgamento de trade-offs                                             │
│  • Priorizacao de tarefas                                               │
│  • Deteccao de riscos                                                   │
│  • Memoria de decisoes anteriores                                       │
│  TRIGGER: Escolha entre alternativas, avaliacao de impacto             │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ feedback (errors + context)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NIVEL 1: AUTOMATICO (Ganglios Basais) - Ciclo: 100ms-2s               │
│  • Geracao de codigo padrao                                             │
│  • Correcao sintatica                                                   │
│  • Aplicacao de heuristicas                                             │
│  • Boilerplate e templates                                              │
│  TRIGGER: Tarefas repetitivas, formatacao, linting                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Mapeamento Nivel → Aprovacao Humana

| Nivel | Tipo de Operacao | Aprovacao | Exemplo |
|-------|------------------|-----------|---------|
| **N1** | Read-only, boilerplate | Auto-aprovado | Gerar getter/setter |
| **N1** | Formatacao, linting | Auto-aprovado | Aplicar ESLint |
| **N2** | Criar skill tecnico | **Requer aprovacao** | Nova skill GraphQL |
| **N2** | Modificar skill existente | **Requer aprovacao** | Atualizar skill React |
| **N3** | Criar persona | **Requer aprovacao** | Nova persona DevOps |
| **N3** | Decisao arquitetural | **Dupla aprovacao** | Mudar padrao de skills |

### 4.3 Niveis de Autonomia

| Nivel | Nome | Descricao | Aprovacao Necessaria |
|-------|------|-----------|---------------------|
| **A1** | Operador | User controla cada passo | Toda acao |
| **A2** | Colaborador | AI sugere, user revisa tudo | Skills, Personas, Commits |
| **A3** | Consultor | Rotinas auto-executam, novidades escalam | Apenas criacoes novas |
| **A4** | Aprovador | Planos completos → yes/no | Apenas planos |
| **A5** | Observador | Autonomia total | Auditorias periodicas |

**Recomendacao MVP:** Iniciar em **A2 (Colaborador)** para programacao.

---

## 5. Fluxo de Auto-Geracao

### 5.1 Pipeline Completo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: PESQUISA → GERACAO → APROVACAO → COMMIT       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐                                                       │
│  │   TRIGGER    │  "Preciso de uma skill para GraphQL"                 │
│  │   (Usuario)  │  "Crie uma persona DevOps"                           │
│  └──────┬───────┘                                                       │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   CLASSIFY   │  Identifica: TIPO + DOMINIO + COMPLEXIDADE           │
│  │  (N1 Auto)   │  • tipo: skill | persona | prompt                    │
│  └──────┬───────┘  • dominio: graphql, devops, security                │
│         │          • complexidade: simple | medium | complex           │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   RESEARCH   │  1. Buscar skills similares existentes               │
│  │  (N2 Context)│  2. Web search: best practices, docs oficiais        │
│  └──────┬───────┘  3. Consolidar: fontes + padroes + antipadroes       │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   GENERATE   │  1. Aplicar template canonico                        │
│  │  (N2 Context)│  2. Preencher: metadata, instrucoes, exemplos        │
│  └──────┬───────┘  3. Gerar draft completo                             │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   VALIDATE   │  1. Schema: YAML frontmatter valido?                 │
│  │  (N1 Auto)   │  2. Completude: tem exemplos? constraints?           │
│  └──────┬───────┘  3. Consistencia: descricao match conteudo?          │
│         │                                                               │
│         ▼                                                               │
│  ╔══════════════╗                                                       │
│  ║  HUMAN GATE  ║  PAUSA OBRIGATORIA - REQUER INPUT HUMANO            │
│  ║  (L2 Collab) ║  • approve → Commit                                  │
│  ╚══════════════╝  • edit → Humano edita                               │
│         │          • reject → Feedback, volta para Research           │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │    COMMIT    │  1. Salvar arquivo no diretorio correto              │
│  │  (N1 Auto)   │  2. Atualizar INDEX.md                               │
│  └──────────────┘  3. Registrar em MEMORY.md                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Ciclo de Decisao (OODA Simplificado)

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ OBSERVE  │ ──▶ │  ORIENT  │ ──▶ │  DECIDE  │ ──▶ │   ACT    │
│ (Input)  │     │ (Classify)│    │ (Route)  │     │ (Execute)│
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     │               │                │                │
     ▼               ▼                ▼                ▼
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Receber  │     │ Nivel    │     │ Skill +  │     │ Executar │
│ request  │     │ cognitivo│     │ Persona  │     │ + validar│
│ do user  │     │ L1/L2/L3 │     │ adequados│     │ resultado│
└──────────┘     └──────────┘     └──────────┘     └──────────┘

SE resultado insatisfatorio OU incerteza alta:
──▶ HUMAN GATE (pausa para aprovacao/correcao)
```

---

## 6. Human Gate Protocol

### 6.1 Estados do Human Gate

```yaml
human_gate_states:
  waiting_approval:
    description: "Draft gerado, aguardando revisao humana"
    timeout: "24h"
    actions_available:
      - approve
      - edit
      - reject
      - cancel
  
  in_review:
    description: "Humano esta editando o draft"
    timeout: "none"
    
  approved:
    description: "Humano aprovou, pronto para commit"
    next_step: "commit"
    
  rejected:
    description: "Humano rejeitou com feedback"
    next_step: "research"
    requires: "rejection_reason"
    
  cancelled:
    description: "Processo abortado"
    next_step: "none"
    cleanup: true
```

### 6.2 Interface de Aprovacao

```
┌─────────────────────────────────────────────────────────────────┐
│  HUMAN GATE - APROVACAO NECESSARIA                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SKILL: kubernetes                                              │
│  CATEGORIA: technology/cloud                                    │
│  CONCEITOS: Pod, Service, Deployment, ConfigMap, Ingress       │
│  TOKEN COUNT: 1,287 tokens ✓                                    │
│  VALIDACAO: 95/100 ✓                                            │
│                                                                 │
│  FONTES:                                                        │
│  • kubernetes.io/docs (oficial)                                 │
│  • CNCF best practices                                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  [approve]  [view full]  [edit]  [reject]                      │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Acoes de Aprovacao

| Acao | Comportamento | Proximo Estado |
|------|---------------|----------------|
| `approve` | Prosseguir para commit | `approved` |
| `view` | Mostrar artefato completo | `waiting_approval` |
| `edit [secao]` | Regenerar secao especifica | `in_review` |
| `reject [motivo]` | Registrar feedback | `rejected` |
| `cancel` | Abortar processo | `cancelled` |

---

## 7. Templates Canonicos

### 7.1 Template de Skill

```markdown
---
name: "{skill-name-kebab-case}"
description: "{Descricao semantica densa, 50-100 palavras}"
version: "1.0.0"
domain: "{programming|devops|data|security|...}"
level: "{L1|L2|L3}"
tags:
  - "{tag1}"
  - "{tag2}"
triggers:
  - "{frase que ativa a skill}"
dependencies: []
author: "promptos-brain"
created: "{YYYY-MM-DD}"
status: "approved"
sources:
  - url: "{fonte}"
    type: "official_docs"
---

# {Skill Name}

## Visao Geral
{Paragrafo explicativo}

## Instrucoes
{Instrucoes detalhadas}

## Guidelines (SEMPRE)
1. {Guideline 1}
2. {Guideline 2}

## Constraints (NUNCA)
1. **NUNCA** {antipadrao 1}
2. **NUNCA** {antipadrao 2}

## Exemplos
### Exemplo 1: {Caso comum}
**Input:**
{codigo ou descricao}

**Output esperado:**
{codigo ou descricao}

## Referencias
1. {fonte 1}
2. {fonte 2}
```

### 7.2 Template de Persona

```markdown
---
name: "{persona-name-kebab-case}"
type: "persona"
description: "{Descricao da persona}"
version: "1.0.0"
expertise:
  - "{area 1}"
  - "{area 2}"
communication_style: "{technical|accessible|formal|casual}"
skills:
  - "{skill-1}"
  - "{skill-2}"
author: "promptos-brain"
created: "{YYYY-MM-DD}"
status: "approved"
---

# {Persona Name}

## Identidade
- **Role:** {Titulo profissional}
- **Especialidades:** {Lista}
- **Estilo:** {Como se comunica}
- **Mindset:** {Como pensa}

## Comportamentos Core
1. **{Comportamento 1}** - {Detalhamento}
2. **{Comportamento 2}** - {Detalhamento}

## Padroes de Interacao
| Situacao | Comportamento |
|----------|---------------|
| Tarefa vaga | {Como age} |
| Bug encontrado | {Como age} |

## Constraints
1. **NAO** {constraint 1}
2. **SEMPRE** {constraint positivo}
```

---

## 8. Integracao Spec-Kit

### 8.1 Quando Usar Cada Workflow

| Complexidade | Tempo Estimado | Workflow |
|--------------|----------------|----------|
| Simples | <3 dias | `brain generate` direto |
| Media | 3-5 dias | Spec-Kit recomendado |
| Complexa | >5 dias | Spec-Kit **obrigatorio** |
| Formal | Qualquer | Spec-Kit **obrigatorio** |

### 8.2 Matriz de Decisao: CARD vs SPEC

| Criterio | CARD (PromptOS) | SPEC (Spec-Kit) |
|----------|-----------------|-----------------|
| **Escopo** | < 5 dias | > 10 dias |
| **Stakeholders** | Time interno | Cliente externo |
| **Formalidade** | Baixa | Alta |
| **Documentacao** | Minima | Completa |

### 8.3 Sincronizacao

O PromptOS sincroniza automaticamente:
- `constitution.md` ↔ `architectural-rules.md`
- Skills geradas ↔ INDEX.md

---

## 9. Estrutura de Diretorios

### 9.1 Estrutura Correta

```
{project-root}/
│
├── AGENTS.md                    # Kernel PromptOS
├── MEMORY.md                    # Estado persistente
│
├── skills/                      # Skills do PromptOS
│   ├── {skill-name}/            # Diretorio por skill
│   │   └── SKILL.md             # Arquivo da skill
│   ├── docker/
│   │   └── SKILL.md
│   └── INDEX.md                 # Indice de skills
│
├── personas/                    # Personas do PromptOS
│   ├── {persona-name}/
│   │   └── PERSONA.md
│   └── INDEX.md
│
├── .prompt-os/                  # Internals do PromptOS
│   ├── core/
│   ├── templates/
│   ├── scripts/
│   └── prompts/
│
├── .specify/                    # Spec-Kit (gerado por speckit init)
│   ├── memory/
│   │   └── constitution.md
│   └── templates/
│
└── .context/                    # Contexto do projeto
    ├── _meta/
    └── standards/
```

### 9.2 Formato de Skill (Correto)

```
skills/
├── {skill-name}/
│   └── SKILL.md          # Arquivo principal
├── docker/
│   └── SKILL.md
├── kubernetes/
│   └── SKILL.md
└── INDEX.md              # Indice
```

**Caminho correto:** `/skills/docker/SKILL.md`
**Caminho errado:** `/skills/technology/cloud/docker.md`

---

## Referencias

### Frameworks
- [CoALA](https://arxiv.org/abs/2309.02427) - Cognitive Architectures for Language Agents
- [SOAR](https://soar.eecs.umich.edu/) - Arquitetura cognitiva com impasse handling
- [ACT-R](http://act-r.psy.cmu.edu/) - Adaptive Control of Thought-Rational
- [Global Workspace Theory](https://en.wikipedia.org/wiki/Global_workspace_theory) - Bernard Baars

### Padroes Modernos
- [Voyager Skill Library](https://voyager.minedojo.org/) - Skills como codigo executavel
- [ADAS Meta-Agent](https://arxiv.org/abs/2408.08435) - Meta-agente para auto-geracao
- [MCP](https://modelcontextprotocol.io/) - Model Context Protocol

### Repositorios de Referencia
| Repositorio | Padrao Relevante |
|-------------|------------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | Workflows graph-based, checkpointing |
| [MetaGPT](https://github.com/geekan/MetaGPT) | SOPs em prompts |
| [DSPy](https://github.com/stanfordnlp/dspy) | Programmatic prompts |

---

**Itzamna PromptOS v1.0.0 (Piloto)** | Arquitetura | 2026
