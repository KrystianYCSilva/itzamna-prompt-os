# PROMPTOS BRAIN BLUEPRINT v1.0
## Sistema Auto-Evolutivo para Programação Paralela Humano-Agente

**Status:** Especificação Completa para Implementação  
**Compatível:** Prompt OS v3.5+, GitHub Spec-Kit, Claude Code, Cursor, Copilot  
**Objetivo:** Criar um "cérebro" simplificado que auto-gera skills/personas/prompts  
**Fluxo:** Pesquisa → Geração → Aprovação Humana → Commit  
**Escopo Inicial:** Skills de Programação/Tecnologia

---

## 📋 ÍNDICE

1. [Resumo Executivo](#1-resumo-executivo)
2. [Arquitetura Cognitiva Simplificada](#2-arquitetura-cognitiva-simplificada)
3. [Sistema de Memórias](#3-sistema-de-memórias)
4. [Fluxo de Auto-Geração](#4-fluxo-de-auto-geração)
5. [Templates Canônicos](#5-templates-canônicos)
6. [Scripts de Implementação](#6-scripts-de-implementação)
7. [Integração Spec-Kit](#7-integração-spec-kit)
8. [Plano de Implementação](#8-plano-de-implementação)
9. [Checklist de Validação](#9-checklist-de-validação)
10. [Referências](#10-referências)

---

## 1. RESUMO EXECUTIVO

### 1.1 O Que Este Documento Resolve

O PromptOS v3.5 precisa de um mecanismo de **auto-incrementação controlada** onde:
1. O usuário solicita algo que não existe (ex: "skill para GraphQL")
2. O sistema pesquisa automaticamente melhores práticas
3. Gera skill/persona/prompt seguindo templates padronizados
4. **Humano aprova** antes de persistir
5. Sistema indexa e disponibiliza para uso futuro

### 1.2 Princípios Arquiteturais

| Princípio | Implementação |
|-----------|---------------|
| **Simplicidade** | Apenas 4 tipos de memória (vs 7+ em CoALA completo) |
| **Human-in-the-Loop** | Aprovação obrigatória antes de commit |
| **Conversacional** | Usuário pode sugerir/corrigir durante geração |
| **Incremental** | Começa com programação, expande depois |
| **Spec-Kit Nativo** | Usa `/speckit.*` para features complexas |

### 1.3 Stack Tecnológica Recomendada

```yaml
# Para implementação mínima (MVP)
runtime: Node.js 20+ ou Python 3.11+
llm_primary: claude-sonnet-4-20250514
llm_fallback: gpt-4o-mini | gemini-flash
storage: Filesystem (SKILL.md files)
indexing: Keyword matching (upgrade para embeddings depois)
validation: JSON Schema + regex

# Para implementação completa
vector_db: ChromaDB ou Pinecone
embeddings: text-embedding-3-small
workflow_engine: LangGraph
mcp_server: modelcontextprotocol/servers
```

---

## 2. ARQUITETURA COGNITIVA SIMPLIFICADA

### 2.1 Visão Geral (CoALA Simplificado)

Baseado no framework CoALA (Cognitive Architectures for Language Agents), mas **drasticamente simplificado** para implementação prática:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PROMPTOS BRAIN ARCHITECTURE v1.0                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │               GLOBAL WORKSPACE (Hub de Atenção)                   │  │
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

### 2.2 Níveis Cognitivos (Sistema de 3 Níveis)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NÍVEL 3: ESTRATÉGICO (Córtex Pré-Frontal) - Ciclo: 5-15 minutos       │
│  • Planejamento de arquitetura                                          │
│  • Decisões de design                                                   │
│  • Verificação de requisitos                                            │
│  • Metacognição: "O que estou fazendo?"                                │
│  TRIGGER: Criação de specs, arquitetura, roadmaps                      │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ feedback top-down (constraints)
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NÍVEL 2: CONTEXTUAL (Sistema Límbico) - Ciclo: 10-60 segundos         │
│  • Julgamento de trade-offs                                             │
│  • Priorização de tarefas                                               │
│  • Detecção de riscos                                                   │
│  • Memória de decisões anteriores                                       │
│  TRIGGER: Escolha entre alternativas, avaliação de impacto             │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ feedback (errors + context)
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NÍVEL 1: AUTOMÁTICO (Gânglios Basais) - Ciclo: 100ms-2s               │
│  • Geração de código padrão                                             │
│  • Correção sintática                                                   │
│  • Aplicação de heurísticas                                             │
│  • Boilerplate e templates                                              │
│  TRIGGER: Tarefas repetitivas, formatação, linting                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Mapeamento Nível → Aprovação Humana

| Nível | Tipo de Operação | Aprovação | Exemplo |
|-------|------------------|-----------|---------|
| **N1** | Read-only, boilerplate | Auto-aprovado | Gerar getter/setter |
| **N1** | Formatação, linting | Auto-aprovado | Aplicar ESLint |
| **N2** | Criar skill técnico | **Requer aprovação** | Nova skill GraphQL |
| **N2** | Modificar skill existente | **Requer aprovação** | Atualizar skill React |
| **N3** | Criar persona | **Requer aprovação** | Nova persona DevOps |
| **N3** | Decisão arquitetural | **Dupla aprovação** | Mudar padrão de skills |

---

## 3. SISTEMA DE MEMÓRIAS

### 3.1 Quatro Tipos de Memória

```yaml
# 1. WORKING MEMORY (Sessão)
tipo: context_window
capacidade: ~10K tokens
persistência: Apenas durante sessão
implementação: Buffer de mensagens da conversa
uso: Manter contexto da tarefa atual

# 2. EPISODIC MEMORY (Histórico)
tipo: chromadb_collection ou arquivo JSON
capacidade: Ilimitado (com retention policy)
persistência: 90 dias padrão
implementação: Vector DB com timestamps
uso: "Lembra quando fizemos X?"

# 3. SEMANTIC MEMORY (Conhecimento)
tipo: embeddings + knowledge base
capacidade: Ilimitado
persistência: Permanente
implementação: RAG com skills/docs indexados
uso: "O que é GraphQL?"

# 4. PROCEDURAL MEMORY (Skills)
tipo: filesystem (SKILL.md files)
capacidade: Ilimitado
persistência: Permanente
implementação: Biblioteca de skills indexada
uso: "Como fazer X?"
```

### 3.2 Estrutura de Diretórios para Memórias

```
~/src/prompt-os/
├── core/                        # Kernel do sistema
│   ├── brain-config.yaml        # Configuração do cérebro
│   ├── memory-manager.md        # Protocolo de memória
│   └── global-workspace.md      # Hub de atenção
│
├── memory/                      # Sistema de memórias
│   ├── working/                 # Working Memory (sessão)
│   │   └── .gitkeep             # Arquivos temporários
│   │
│   ├── episodic/                # Episodic Memory (histórico)
│   │   ├── index.json           # Índice de interações
│   │   └── 2026/                # Organizadas por ano
│   │       ├── 01/              # Por mês
│   │       │   ├── 2026-01-25-skill-created.json
│   │       │   └── 2026-01-26-persona-updated.json
│   │       └── 02/
│   │
│   ├── semantic/                # Semantic Memory (conhecimento)
│   │   ├── index.json           # Índice de embeddings
│   │   ├── embeddings/          # Vetores (se usar ChromaDB)
│   │   └── knowledge/           # Knowledge base em texto
│   │       ├── graphql-basics.md
│   │       └── react-patterns.md
│   │
│   └── procedural/              # Procedural Memory (skills)
│       └── → symlink para skills/
│
├── skills/                      # Biblioteca de Skills
│   ├── INDEX.md                 # Índice master
│   ├── academic/                # Skills acadêmicas (84)
│   ├── technical/               # Skills técnicas (34)
│   └── generated/               # Skills auto-geradas
│       ├── INDEX.md             # Índice de geradas
│       ├── graphql/             # Pasta por skill
│       │   └── SKILL.md
│       └── nextjs/
│           └── SKILL.md
│
├── personas/                    # Biblioteca de Personas
│   ├── INDEX.md                 # Índice master
│   ├── composable/              # Personas compostas (6)
│   └── generated/               # Personas auto-geradas
│       └── devops-engineer/
│           └── PERSONA.md
│
└── prompts/                     # Biblioteca de Prompts
    ├── INDEX.md                 # Índice master
    ├── meta/                    # Meta-prompts (geram outros)
    │   ├── skill-generator.md   # Gera skills
    │   ├── persona-generator.md # Gera personas
    │   └── prompt-generator.md  # Gera prompts
    └── generated/               # Prompts auto-gerados
        └── code-review-security/
            └── PROMPT.md
```

### 3.3 MEMORY.md - Template do Estado Persistente

```markdown
# MEMORY.md - Estado Persistente do PromptOS Brain

**Última Atualização:** {timestamp}
**Versão:** 1.0.0
**Sessões Totais:** {count}

---

## 📊 ESTATÍSTICAS

| Métrica | Valor |
|---------|-------|
| Skills Geradas | {n} |
| Personas Geradas | {n} |
| Prompts Gerados | {n} |
| Taxa de Aprovação | {%} |
| Última Geração | {timestamp} |

---

## 🧠 MEMÓRIA EPISÓDICA RECENTE (últimas 10)

| Data | Tipo | Nome | Status | Humano |
|------|------|------|--------|--------|
| 2026-01-26 | skill | graphql-api | ✅ Aprovado | @user |
| 2026-01-25 | persona | devops-engineer | ✅ Aprovado | @user |
| 2026-01-24 | skill | nextjs-ssr | ❌ Rejeitado | @user |

---

## 📚 SKILLS GERADAS

### Aprovadas (Production)
- `graphql-api` - API GraphQL com Apollo Server (2026-01-26)
- `react-hooks` - Custom hooks e padrões (2026-01-20)

### Pendentes (Review)
- `kubernetes-basics` - Aguardando aprovação

### Rejeitadas (Arquivo)
- `nextjs-ssr` - Motivo: "Muito genérico, precisa de exemplos específicos"

---

## 👤 PERSONAS GERADAS

### Ativas
- `devops-engineer` - Especialista em CI/CD, Docker, K8s

### Pendentes
- (nenhuma)

---

## 🔧 CONFIGURAÇÃO ATUAL

```yaml
auto_generation:
  enabled: true
  domain: "programming"  # Escopo: apenas programação
  approval_required: true
  
human_gate:
  level: "L2"  # Colaborador - agente sugere, humano revisa
  channels: ["cli", "slack"]
  
quality:
  min_examples: 2
  require_constraints: true
  llm_judge: false  # Desabilitado para MVP
```

---

## 📝 NOTAS DA ÚLTIMA SESSÃO

{Contexto importante que deve persistir entre sessões}

---

## ⚠️ PENDÊNCIAS

- [ ] Skill `kubernetes-basics` aguardando aprovação
- [ ] Atualizar skill `react-hooks` com novos patterns do React 19
```

---

## 4. FLUXO DE AUTO-GERAÇÃO

### 4.1 Diagrama do Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: PESQUISA → GERAÇÃO → APROVAÇÃO → COMMIT       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐                                                       │
│  │   TRIGGER    │  "Preciso de uma skill para GraphQL"                 │
│  │   (Usuário)  │  "Crie uma persona DevOps"                           │
│  └──────┬───────┘  "Faça um prompt para code review"                   │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   CLASSIFY   │  Identifica: TIPO + DOMÍNIO + COMPLEXIDADE           │
│  │  (N1 Auto)   │  • tipo: skill | persona | prompt                    │
│  └──────┬───────┘  • domínio: graphql, devops, security                │
│         │          • complexidade: simple | medium | complex           │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   RESEARCH   │  1. Buscar skills similares existentes               │
│  │  (N2 Context)│  2. Web search: best practices, docs oficiais        │
│  └──────┬───────┘  3. Consolidar: fontes + padrões + antipadrões       │
│         │                                                               │
│         │  ↔ LOOP CONVERSACIONAL (usuário pode intervir)               │
│         │    "Adicione também X"                                        │
│         │    "Ignore padrão Y, prefiro Z"                               │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   GENERATE   │  1. Aplicar template canônico                        │
│  │  (N2 Context)│  2. Preencher: metadata, instruções, exemplos        │
│  └──────┬───────┘  3. Gerar draft completo                             │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   VALIDATE   │  1. Schema: YAML frontmatter válido?                 │
│  │  (N1 Auto)   │  2. Completude: tem exemplos? constraints?           │
│  └──────┬───────┘  3. Consistência: descrição match conteúdo?          │
│         │                                                               │
│         │  Se inválido → volta para GENERATE com feedback              │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐  ╔═══════════════════════════════════════════════╗   │
│  │ HUMAN GATE   │  ║  PAUSA OBRIGATÓRIA - REQUER INPUT HUMANO     ║   │
│  │ (L2 Collab)  │  ╠═══════════════════════════════════════════════╣   │
│  └──────┬───────┘  ║  Opções:                                      ║   │
│         │          ║  • approve  → Continua para COMMIT            ║   │
│         │          ║  • edit     → Humano edita, depois COMMIT     ║   │
│         │          ║  • reject   → Feedback, volta para RESEARCH   ║   │
│         │          ║  • cancel   → Aborta completamente            ║   │
│         │          ╚═══════════════════════════════════════════════╝   │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │    COMMIT    │  1. Salvar arquivo no diretório correto              │
│  │  (N1 Auto)   │  2. Atualizar INDEX.md                               │
│  └──────┬───────┘  3. Registrar em MEMORY.md (episódico)               │
│         │          4. Atualizar embeddings (se configurado)            │
│         │                                                               │
│         ▼                                                               │
│  ┌──────────────┐                                                       │
│  │   CONFIRM    │  "✅ Skill 'graphql-api' criada com sucesso!"        │
│  │  (Feedback)  │  "📁 Localização: skills/generated/graphql/"         │
│  └──────────────┘  "🔄 Índice atualizado"                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Estados do Human Gate

```yaml
# Estados possíveis no Human Gate
human_gate_states:
  waiting_approval:
    description: "Draft gerado, aguardando revisão humana"
    timeout: "24h"  # Auto-cancela após 24h sem resposta
    actions_available:
      - approve
      - edit
      - reject
      - request_changes
      - cancel
  
  in_review:
    description: "Humano está editando o draft"
    timeout: "none"  # Sem timeout durante edição ativa
    
  approved:
    description: "Humano aprovou, pronto para commit"
    next_step: "commit"
    
  rejected:
    description: "Humano rejeitou com feedback"
    next_step: "research"  # Volta com o feedback
    requires: "rejection_reason"
    
  cancelled:
    description: "Processo abortado"
    next_step: "none"
    cleanup: true
```

### 4.3 Protocolo de Interação Conversacional

```markdown
## PROTOCOLO: Geração Conversacional de Skill

### Fase 1: Trigger
**Usuário:** "Preciso de uma skill para trabalhar com GraphQL"

**Agente:** 
```
🔍 Entendi! Vou criar uma skill para GraphQL.

📋 **Escopo inicial:**
- Tipo: Skill técnica
- Domínio: API/GraphQL
- Stack: Node.js + Apollo (mais comum)

❓ **Perguntas de refinamento:**
1. Client-side, server-side, ou ambos?
2. Alguma stack específica? (Apollo, Relay, urql)
3. Algum foco especial? (subscriptions, federation, auth)

💬 Ou posso começar a pesquisa com escopo amplo. O que prefere?
```

### Fase 2: Refinamento (opcional)
**Usuário:** "Server-side com Apollo, foco em auth e rate limiting"

**Agente:**
```
✅ Refinando escopo:
- Server: Apollo Server 4
- Foco: Authentication + Rate Limiting

🔎 Iniciando pesquisa...
```

### Fase 3: Pesquisa
**Agente:**
```
📚 **Pesquisa concluída!**

**Fontes consultadas:**
1. Apollo Server docs (oficial)
2. GraphQL Security best practices (OWASP)
3. Skills similares no repositório (graphql-basics)

**Padrões identificados:**
- Auth: JWT middleware + context
- Rate limiting: graphql-rate-limit directive
- Error handling: formatError + masking

**Antipadrões a evitar:**
- ❌ Expor stack traces em produção
- ❌ Rate limit por IP sem considerar proxies
- ❌ Auth no resolver (deve ser no context)

💬 Posso prosseguir com a geração, ou quer ajustar algo?
```

### Fase 4: Geração
**Usuário:** "Prossiga"

**Agente:** [Gera draft completo e apresenta]

### Fase 5: Aprovação
**Agente:**
```
📝 **Draft gerado!**

[Preview do SKILL.md]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔐 **APROVAÇÃO NECESSÁRIA**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Opções:
• `approve` - Salvar skill como está
• `edit` - Quero fazer alterações manuais
• `reject [motivo]` - Rejeitar e refazer
• `cancel` - Cancelar completamente

O que deseja fazer?
```
```

---

## 5. TEMPLATES CANÔNICOS

### 5.1 Template: SKILL.md (Auto-Gerado)

```markdown
---
# ═══════════════════════════════════════════════════════════════════════
# METADATA (YAML Frontmatter) - NÃO ABREVIAR CHAVES
# ═══════════════════════════════════════════════════════════════════════
name: "{skill-name-kebab-case}"
description: "{Descrição semântica densa, 50-100 palavras. Usada pelo roteador para decidir se carrega a skill. Inclua: o que faz, quando usar, keywords relevantes.}"
version: "1.0.0"
domain: "{programming|devops|data|security|frontend|backend|mobile|...}"
level: "{L1|L2|L3}"  # L1=automático, L2=contextual, L3=estratégico
tags:
  - "{tag1}"
  - "{tag2}"
  - "{tag3}"
triggers:
  - "{frase que ativa a skill}"
  - "{outra frase de ativação}"
dependencies:
  - "{skill-base-se-herdar}"
author: "promptos-brain"
created: "{YYYY-MM-DD}"
updated: "{YYYY-MM-DD}"
status: "approved"  # draft|pending|approved|deprecated
sources:
  - url: "{fonte1}"
    type: "official_docs"
  - url: "{fonte2}"
    type: "best_practices"
---

# {Skill Name}

## 📋 Visão Geral

{Parágrafo explicativo sobre o propósito da skill, quando usar, e o que ela resolve. 3-5 linhas.}

---

## 🎯 Instruções

{Instruções detalhadas em linguagem imperativa. Use verbos de ação.}

### Ao receber uma tarefa relacionada a {domínio}:

1. **Analise** o contexto e requisitos
2. **Verifique** se há código existente relacionado
3. **Aplique** os padrões documentados abaixo
4. **Valide** o resultado antes de apresentar

---

## ✅ Guidelines (SEMPRE)

1. {Guideline 1 - ação obrigatória}
2. {Guideline 2 - ação obrigatória}
3. {Guideline 3 - ação obrigatória}

## ❌ Constraints (NUNCA)

1. **NUNCA** {antipadrão 1}
2. **NUNCA** {antipadrão 2}
3. **NUNCA** {antipadrão 3}

---

## 📚 Exemplos

### Exemplo 1: {Caso comum}

**Input:**
```{language}
{código ou descrição do input}
```

**Output esperado:**
```{language}
{código ou descrição do output}
```

**Explicação:** {Por que este é o output correto}

### Exemplo 2: {Edge case}

**Input:**
```{language}
{input do edge case}
```

**Output esperado:**
```{language}
{output do edge case}
```

**Explicação:** {Por que tratar este caso de forma especial}

---

## 🔗 Skills Relacionadas

- `{skill-relacionada-1}` - {breve descrição}
- `{skill-relacionada-2}` - {breve descrição}

---

## 📖 Referências

1. {Título da fonte 1} - {URL}
2. {Título da fonte 2} - {URL}

---

<!-- 
METADATA INTERNO (não carregar no contexto do LLM)
generation_id: {uuid}
generation_timestamp: {ISO8601}
research_sources_count: {n}
human_approved_by: {username}
human_approved_at: {timestamp}
-->
```

### 5.2 Template: PERSONA.md (Auto-Gerado)

```markdown
---
# ═══════════════════════════════════════════════════════════════════════
# METADATA (YAML Frontmatter)
# ═══════════════════════════════════════════════════════════════════════
name: "{persona-name-kebab-case}"
type: "persona"
description: "{Descrição da persona em 50-100 palavras}"
version: "1.0.0"
expertise:
  - "{área de expertise 1}"
  - "{área de expertise 2}"
  - "{área de expertise 3}"
communication_style: "{technical|accessible|formal|casual}"
inherits:
  - "{persona-base-se-herdar}"
skills:
  - "{skill-1}"
  - "{skill-2}"
  - "{skill-3}"
author: "promptos-brain"
created: "{YYYY-MM-DD}"
status: "approved"
---

# {Persona Name}

## 🎭 Identidade

- **Role:** {Título profissional, ex: "Engenheiro DevOps Sênior com 10+ anos de experiência"}
- **Especialidades:** {Lista das principais áreas, ex: "Kubernetes, CI/CD, Infrastructure as Code"}
- **Estilo:** {Como se comunica, ex: "Pragmático, foca em soluções que funcionam em produção"}
- **Mindset:** {Como pensa, ex: "Automação > trabalho manual, observabilidade é essencial"}

---

## 💡 Comportamentos Core

1. **{Comportamento 1}**
   - {Detalhamento}
   
2. **{Comportamento 2}**
   - {Detalhamento}

3. **{Comportamento 3}**
   - {Detalhamento}

---

## 🗣️ Padrões de Interação

| Situação | Comportamento |
|----------|---------------|
| Tarefa vaga | {Como age quando a tarefa é vaga} |
| Bug encontrado | {Como age ao encontrar bug} |
| Code review | {Como faz code review} |
| Decisão de arquitetura | {Como aborda decisões} |

---

## ⚠️ Constraints

1. **NÃO** {constraint 1}
2. **NÃO** {constraint 2}
3. **SEMPRE** {constraint positivo importante}

---

## 🔧 Skills Carregadas Automaticamente

Quando esta persona é ativada, as seguintes skills são carregadas (JIT):

```yaml
skills:
  - {skill-1}
  - {skill-2}
  - {skill-3}
```

---

## 📝 Exemplos de Uso

### Exemplo: {Cenário típico}

**Usuário:** "{Pedido do usuário}"

**Resposta da Persona:**
```
{Exemplo de como a persona responderia}
```
```

### 5.3 Template: PROMPT.md (Meta-Prompt)

```markdown
---
# ═══════════════════════════════════════════════════════════════════════
# METADATA (YAML Frontmatter)
# ═══════════════════════════════════════════════════════════════════════
name: "{prompt-name-kebab-case}"
type: "prompt"
description: "{Descrição do prompt em 50-100 palavras}"
version: "1.0.0"
category: "{meta|task|analysis|generation|...}"
target_models:
  - "claude"
  - "gpt"
  - "gemini"
input_schema:
  required:
    - "{campo1}"
    - "{campo2}"
  optional:
    - "{campo3}"
output_format: "{json|markdown|code|text}"
author: "promptos-brain"
created: "{YYYY-MM-DD}"
status: "approved"
---

# {Prompt Name}

## 🎯 Objetivo

{O que este prompt faz em 2-3 linhas}

---

## 📥 Input Esperado

```yaml
# Campos obrigatórios
{campo1}: "{tipo e descrição}"
{campo2}: "{tipo e descrição}"

# Campos opcionais
{campo3}: "{tipo e descrição}"
```

---

## 📤 Output Esperado

```{formato}
{estrutura do output esperado}
```

---

## 📝 Template do Prompt

```xml
<context>
{Contexto fixo que sempre será incluído}
</context>

<input>
{campo1}: {{campo1}}
{campo2}: {{campo2}}
</input>

<instructions>
{Instruções detalhadas em linguagem imperativa}

1. {Passo 1}
2. {Passo 2}
3. {Passo 3}
</instructions>

<output_format>
{Especificação exata do formato de saída}
</output_format>

<constraints>
- {Constraint 1}
- {Constraint 2}
</constraints>
```

---

## 💡 Exemplos

### Input
```yaml
{campo1}: "{valor exemplo}"
{campo2}: "{valor exemplo}"
```

### Output
```{formato}
{exemplo de output}
```
```

---

## 6. SCRIPTS DE IMPLEMENTAÇÃO

### 6.1 Script: skill-generator.js (Node.js)

```javascript
/**
 * ═══════════════════════════════════════════════════════════════════════
 * SKILL GENERATOR - PromptOS Brain
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Este script implementa o fluxo completo de geração de skills:
 * 1. CLASSIFY - Classifica o pedido
 * 2. RESEARCH - Pesquisa fontes
 * 3. GENERATE - Gera draft
 * 4. VALIDATE - Valida estrutura
 * 5. HUMAN_GATE - Aguarda aprovação
 * 6. COMMIT - Salva e indexa
 * 
 * Uso: node skill-generator.js "Descrição da skill desejada"
 */

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════════════════════

const CONFIG = {
  // Diretórios
  SKILLS_DIR: './skills/generated',
  INDEX_FILE: './skills/generated/INDEX.md',
  MEMORY_FILE: './MEMORY.md',
  
  // Templates
  SKILL_TEMPLATE: './templates/SKILL-TEMPLATE.md',
  
  // LLM
  LLM_MODEL: 'claude-sonnet-4-20250514',
  LLM_FALLBACK: 'gpt-4o-mini',
  
  // Validação
  MIN_EXAMPLES: 2,
  REQUIRE_CONSTRAINTS: true,
  
  // Human Gate
  APPROVAL_TIMEOUT_MS: 24 * 60 * 60 * 1000, // 24h
};

// ═══════════════════════════════════════════════════════════════════════
// TIPOS E INTERFACES
// ═══════════════════════════════════════════════════════════════════════

/**
 * @typedef {Object} SkillRequest
 * @property {string} description - Descrição do usuário
 * @property {string} domain - Domínio identificado
 * @property {string} complexity - simple|medium|complex
 * @property {string[]} refinements - Refinamentos do usuário
 */

/**
 * @typedef {Object} ResearchResult
 * @property {string} summary - Resumo da pesquisa
 * @property {Object[]} sources - Fontes consultadas
 * @property {string[]} patterns - Padrões identificados
 * @property {string[]} antipatterns - Antipadrões a evitar
 */

/**
 * @typedef {Object} SkillDraft
 * @property {Object} metadata - YAML frontmatter
 * @property {string} content - Conteúdo markdown
 * @property {string} fullText - Texto completo
 */

/**
 * @typedef {'approve'|'edit'|'reject'|'cancel'} ApprovalAction
 */

// ═══════════════════════════════════════════════════════════════════════
// FASE 1: CLASSIFY
// ═══════════════════════════════════════════════════════════════════════

/**
 * Classifica o pedido do usuário
 * @param {string} userInput - Input do usuário
 * @returns {Promise<SkillRequest>}
 */
async function classifyRequest(userInput) {
  console.log('\n🔍 [CLASSIFY] Analisando pedido...');
  
  // Em produção: usar LLM para classificar
  // Para MVP: heurísticas simples
  
  const request = {
    description: userInput,
    domain: detectDomain(userInput),
    complexity: detectComplexity(userInput),
    refinements: [],
  };
  
  console.log(`   Domínio: ${request.domain}`);
  console.log(`   Complexidade: ${request.complexity}`);
  
  return request;
}

/**
 * Detecta domínio baseado em keywords
 * @param {string} text 
 * @returns {string}
 */
function detectDomain(text) {
  const domains = {
    'graphql': ['graphql', 'apollo', 'schema', 'resolver', 'mutation', 'query'],
    'react': ['react', 'hook', 'component', 'jsx', 'tsx', 'redux'],
    'nodejs': ['node', 'express', 'fastify', 'npm', 'backend'],
    'devops': ['docker', 'kubernetes', 'k8s', 'ci/cd', 'terraform', 'ansible'],
    'security': ['auth', 'jwt', 'oauth', 'security', 'encryption', 'xss', 'csrf'],
    'database': ['sql', 'postgres', 'mysql', 'mongodb', 'redis', 'orm'],
    'testing': ['test', 'jest', 'pytest', 'cypress', 'coverage', 'tdd'],
    'api': ['rest', 'api', 'endpoint', 'swagger', 'openapi'],
  };
  
  const lowerText = text.toLowerCase();
  
  for (const [domain, keywords] of Object.entries(domains)) {
    if (keywords.some(kw => lowerText.includes(kw))) {
      return domain;
    }
  }
  
  return 'general';
}

/**
 * Detecta complexidade baseado em indicadores
 * @param {string} text 
 * @returns {string}
 */
function detectComplexity(text) {
  const complexIndicators = ['arquitetura', 'sistema', 'completo', 'avançado', 'enterprise'];
  const simpleIndicators = ['básico', 'simples', 'introdução', 'hello world'];
  
  const lowerText = text.toLowerCase();
  
  if (complexIndicators.some(i => lowerText.includes(i))) return 'complex';
  if (simpleIndicators.some(i => lowerText.includes(i))) return 'simple';
  return 'medium';
}

// ═══════════════════════════════════════════════════════════════════════
// FASE 2: RESEARCH
// ═══════════════════════════════════════════════════════════════════════

/**
 * Pesquisa fontes sobre o tópico
 * @param {SkillRequest} request 
 * @returns {Promise<ResearchResult>}
 */
async function conductResearch(request) {
  console.log('\n🔎 [RESEARCH] Pesquisando fontes...');
  
  // Em produção: usar web search + RAG
  // Para MVP: retornar estrutura mock
  
  const research = {
    summary: `Pesquisa sobre ${request.domain} concluída.`,
    sources: [
      { url: 'https://docs.example.com', type: 'official_docs' },
      { url: 'https://best-practices.example.com', type: 'best_practices' },
    ],
    patterns: [
      'Padrão 1: Usar abordagem X para Y',
      'Padrão 2: Sempre validar Z antes de W',
    ],
    antipatterns: [
      'Antipadrão 1: Evitar fazer A porque B',
      'Antipadrão 2: Nunca expor C diretamente',
    ],
  };
  
  console.log(`   Fontes encontradas: ${research.sources.length}`);
  console.log(`   Padrões identificados: ${research.patterns.length}`);
  
  return research;
}

// ═══════════════════════════════════════════════════════════════════════
// FASE 3: GENERATE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Gera o draft da skill
 * @param {SkillRequest} request 
 * @param {ResearchResult} research 
 * @returns {Promise<SkillDraft>}
 */
async function generateSkillDraft(request, research) {
  console.log('\n📝 [GENERATE] Gerando draft...');
  
  const skillName = generateSkillName(request.description);
  const today = new Date().toISOString().split('T')[0];
  
  const metadata = {
    name: skillName,
    description: `Skill para ${request.description}. Gerada automaticamente pelo PromptOS Brain.`,
    version: '1.0.0',
    domain: request.domain,
    level: 'L2',
    tags: [request.domain, 'auto-generated'],
    triggers: generateTriggers(request.description),
    dependencies: [],
    author: 'promptos-brain',
    created: today,
    updated: today,
    status: 'pending',
    sources: research.sources,
  };
  
  const content = generateSkillContent(request, research, metadata);
  
  // Monta o arquivo completo
  const fullText = `---
${objectToYaml(metadata)}
---

${content}`;
  
  console.log(`   Nome: ${skillName}`);
  console.log(`   Tamanho: ${fullText.length} caracteres`);
  
  return { metadata, content, fullText };
}

/**
 * Gera nome da skill em kebab-case
 * @param {string} description 
 * @returns {string}
 */
function generateSkillName(description) {
  return description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

/**
 * Gera triggers de ativação
 * @param {string} description 
 * @returns {string[]}
 */
function generateTriggers(description) {
  const words = description.toLowerCase().split(/\s+/);
  const mainKeyword = words.find(w => w.length > 4) || words[0];
  
  return [
    `trabalhar com ${mainKeyword}`,
    `criar ${mainKeyword}`,
    `usar ${mainKeyword}`,
    description.toLowerCase(),
  ];
}

/**
 * Gera conteúdo markdown da skill
 * @param {SkillRequest} request 
 * @param {ResearchResult} research 
 * @param {Object} metadata 
 * @returns {string}
 */
function generateSkillContent(request, research, metadata) {
  return `# ${capitalizeWords(metadata.name.replace(/-/g, ' '))}

## 📋 Visão Geral

Esta skill fornece diretrizes e padrões para trabalhar com ${request.domain}. 
Gerada automaticamente pelo PromptOS Brain com base em pesquisa de melhores práticas.

---

## 🎯 Instruções

### Ao receber uma tarefa relacionada a ${request.domain}:

1. **Analise** o contexto e requisitos específicos
2. **Verifique** se há código existente relacionado no projeto
3. **Aplique** os padrões documentados abaixo
4. **Valide** o resultado antes de apresentar

---

## ✅ Guidelines (SEMPRE)

${research.patterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## ❌ Constraints (NUNCA)

${research.antipatterns.map((a, i) => `${i + 1}. **NUNCA** ${a}`).join('\n')}

---

## 📚 Exemplos

### Exemplo 1: Caso Básico

**Input:**
\`\`\`
[Descrição do cenário básico]
\`\`\`

**Output esperado:**
\`\`\`
[Exemplo de output correto]
\`\`\`

**Explicação:** Este é o caso mais comum de uso.

### Exemplo 2: Edge Case

**Input:**
\`\`\`
[Descrição do edge case]
\`\`\`

**Output esperado:**
\`\`\`
[Exemplo de output para edge case]
\`\`\`

**Explicação:** Tratamento especial necessário porque [razão].

---

## 📖 Referências

${research.sources.map((s, i) => `${i + 1}. ${s.url} (${s.type})`).join('\n')}
`;
}

/**
 * Converte objeto para YAML string
 * @param {Object} obj 
 * @returns {string}
 */
function objectToYaml(obj) {
  const lines = [];
  
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach(item => {
        if (typeof item === 'object') {
          lines.push(`  - url: "${item.url}"`);
          lines.push(`    type: "${item.type}"`);
        } else {
          lines.push(`  - "${item}"`);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      lines.push(`${key}:`);
      for (const [k, v] of Object.entries(value)) {
        lines.push(`  ${k}: "${v}"`);
      }
    } else {
      lines.push(`${key}: "${value}"`);
    }
  }
  
  return lines.join('\n');
}

/**
 * Capitaliza palavras
 * @param {string} str 
 * @returns {string}
 */
function capitalizeWords(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

// ═══════════════════════════════════════════════════════════════════════
// FASE 4: VALIDATE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Valida o draft da skill
 * @param {SkillDraft} draft 
 * @returns {{valid: boolean, errors: string[]}}
 */
function validateDraft(draft) {
  console.log('\n✅ [VALIDATE] Validando draft...');
  
  const errors = [];
  
  // Validar metadata
  if (!draft.metadata.name) errors.push('Nome é obrigatório');
  if (!draft.metadata.description) errors.push('Descrição é obrigatória');
  if (!draft.metadata.domain) errors.push('Domínio é obrigatório');
  
  // Validar conteúdo
  if (!draft.content.includes('## 📚 Exemplos')) {
    errors.push('Deve conter seção de exemplos');
  }
  
  if (CONFIG.REQUIRE_CONSTRAINTS && !draft.content.includes('## ❌ Constraints')) {
    errors.push('Deve conter seção de constraints');
  }
  
  // Contar exemplos
  const exampleCount = (draft.content.match(/### Exemplo \d+/g) || []).length;
  if (exampleCount < CONFIG.MIN_EXAMPLES) {
    errors.push(`Mínimo ${CONFIG.MIN_EXAMPLES} exemplos requeridos (encontrado: ${exampleCount})`);
  }
  
  const valid = errors.length === 0;
  
  if (valid) {
    console.log('   ✅ Draft válido!');
  } else {
    console.log('   ❌ Erros encontrados:');
    errors.forEach(e => console.log(`      - ${e}`));
  }
  
  return { valid, errors };
}

// ═══════════════════════════════════════════════════════════════════════
// FASE 5: HUMAN GATE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Solicita aprovação humana
 * @param {SkillDraft} draft 
 * @returns {Promise<{action: ApprovalAction, editedContent?: string, reason?: string}>}
 */
async function requestHumanApproval(draft) {
  console.log('\n' + '═'.repeat(60));
  console.log('🔐 HUMAN GATE - APROVAÇÃO NECESSÁRIA');
  console.log('═'.repeat(60));
  
  console.log('\n📝 PREVIEW DO DRAFT:\n');
  console.log('─'.repeat(40));
  console.log(draft.fullText.substring(0, 2000));
  if (draft.fullText.length > 2000) {
    console.log(`\n... [${draft.fullText.length - 2000} caracteres omitidos]`);
  }
  console.log('─'.repeat(40));
  
  console.log('\n📋 OPÇÕES:');
  console.log('  approve  - Salvar skill como está');
  console.log('  edit     - Abrir para edição manual');
  console.log('  reject   - Rejeitar e refazer (informe motivo)');
  console.log('  cancel   - Cancelar completamente');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question('\n❓ Sua decisão: ', (answer) => {
      rl.close();
      
      const [action, ...reasonParts] = answer.trim().toLowerCase().split(' ');
      
      switch (action) {
        case 'approve':
          resolve({ action: 'approve' });
          break;
        case 'edit':
          // Em produção: abrir editor
          console.log('   [Editor não implementado no MVP - usando approve]');
          resolve({ action: 'approve' });
          break;
        case 'reject':
          resolve({ 
            action: 'reject', 
            reason: reasonParts.join(' ') || 'Sem motivo especificado' 
          });
          break;
        case 'cancel':
          resolve({ action: 'cancel' });
          break;
        default:
          console.log('   Opção inválida. Assumindo cancel.');
          resolve({ action: 'cancel' });
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// FASE 6: COMMIT
// ═══════════════════════════════════════════════════════════════════════

/**
 * Salva a skill e atualiza índices
 * @param {SkillDraft} draft 
 * @returns {Promise<string>} Caminho do arquivo salvo
 */
async function commitSkill(draft) {
  console.log('\n💾 [COMMIT] Salvando skill...');
  
  // Criar diretório
  const skillDir = path.join(CONFIG.SKILLS_DIR, draft.metadata.name);
  await fs.mkdir(skillDir, { recursive: true });
  
  // Atualizar status para approved
  const finalText = draft.fullText.replace('status: "pending"', 'status: "approved"');
  
  // Salvar arquivo
  const filePath = path.join(skillDir, 'SKILL.md');
  await fs.writeFile(filePath, finalText, 'utf8');
  console.log(`   📁 Arquivo: ${filePath}`);
  
  // Atualizar INDEX.md
  await updateIndex(draft.metadata);
  console.log('   📑 INDEX.md atualizado');
  
  // Atualizar MEMORY.md
  await updateMemory(draft.metadata, 'approved');
  console.log('   🧠 MEMORY.md atualizado');
  
  return filePath;
}

/**
 * Atualiza o índice de skills
 * @param {Object} metadata 
 */
async function updateIndex(metadata) {
  const indexPath = CONFIG.INDEX_FILE;
  
  let indexContent;
  try {
    indexContent = await fs.readFile(indexPath, 'utf8');
  } catch {
    indexContent = '# Skills Geradas\n\n| Nome | Domínio | Status | Data |\n|------|---------|--------|------|\n';
  }
  
  const newEntry = `| ${metadata.name} | ${metadata.domain} | ${metadata.status} | ${metadata.created} |`;
  
  // Adicionar antes da última linha vazia ou no final
  if (!indexContent.includes(metadata.name)) {
    indexContent = indexContent.trimEnd() + '\n' + newEntry + '\n';
    await fs.writeFile(indexPath, indexContent, 'utf8');
  }
}

/**
 * Atualiza o arquivo de memória
 * @param {Object} metadata 
 * @param {string} status 
 */
async function updateMemory(metadata, status) {
  const memoryPath = CONFIG.MEMORY_FILE;
  
  let memoryContent;
  try {
    memoryContent = await fs.readFile(memoryPath, 'utf8');
  } catch {
    memoryContent = '# MEMORY.md\n\n## Histórico\n\n';
  }
  
  const timestamp = new Date().toISOString();
  const entry = `- [${timestamp}] Skill \`${metadata.name}\` ${status}\n`;
  
  // Inserir após "## Histórico"
  memoryContent = memoryContent.replace(
    '## Histórico\n',
    `## Histórico\n\n${entry}`
  );
  
  await fs.writeFile(memoryPath, memoryContent, 'utf8');
}

// ═══════════════════════════════════════════════════════════════════════
// ORQUESTRADOR PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════

/**
 * Executa o fluxo completo de geração
 * @param {string} userInput 
 */
async function generateSkill(userInput) {
  console.log('\n' + '═'.repeat(60));
  console.log('🧠 PROMPTOS BRAIN - SKILL GENERATOR');
  console.log('═'.repeat(60));
  console.log(`\n📥 Input: "${userInput}"`);
  
  try {
    // 1. CLASSIFY
    const request = await classifyRequest(userInput);
    
    // 2. RESEARCH
    const research = await conductResearch(request);
    
    // 3. GENERATE
    const draft = await generateSkillDraft(request, research);
    
    // 4. VALIDATE
    const validation = validateDraft(draft);
    
    if (!validation.valid) {
      console.log('\n⚠️ Draft inválido. Refinando...');
      // Em produção: loop de refinamento
      // Para MVP: prosseguir com avisos
    }
    
    // 5. HUMAN GATE
    const approval = await requestHumanApproval(draft);
    
    switch (approval.action) {
      case 'approve':
        // 6. COMMIT
        const filePath = await commitSkill(draft);
        console.log('\n' + '═'.repeat(60));
        console.log('✅ SKILL CRIADA COM SUCESSO!');
        console.log('═'.repeat(60));
        console.log(`📁 Localização: ${filePath}`);
        break;
        
      case 'reject':
        console.log(`\n❌ Skill rejeitada. Motivo: ${approval.reason}`);
        // Em produção: voltar para RESEARCH com feedback
        break;
        
      case 'cancel':
        console.log('\n🚫 Operação cancelada pelo usuário.');
        break;
    }
    
  } catch (error) {
    console.error('\n❌ Erro durante geração:', error.message);
    process.exit(1);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Uso: node skill-generator.js "Descrição da skill"');
  console.log('Exemplo: node skill-generator.js "API GraphQL com Apollo Server"');
  process.exit(1);
}

generateSkill(args.join(' '));
```

### 6.2 Script: brain-config.yaml

```yaml
# ═══════════════════════════════════════════════════════════════════════
# PROMPTOS BRAIN - CONFIGURAÇÃO CENTRAL
# ═══════════════════════════════════════════════════════════════════════
# Versão: 1.0.0
# Compatível: PromptOS v3.5+

version: "1.0"

# ─────────────────────────────────────────────────────────────────────────
# KERNEL (Core do Sistema)
# ─────────────────────────────────────────────────────────────────────────
kernel:
  # Modelos de linguagem
  llm:
    primary: "claude-sonnet-4-20250514"
    fallback: "gpt-4o-mini"
    temperature:
      generation: 0.7
      validation: 0.1
      classification: 0.0
  
  # Sistema de memórias
  memory:
    working:
      type: "context_window"
      max_tokens: 16000
      
    episodic:
      type: "filesystem"  # Upgrade para chromadb depois
      path: "./memory/episodic/"
      retention_days: 90
      
    semantic:
      type: "filesystem"  # Upgrade para embeddings depois
      path: "./memory/semantic/"
      
    procedural:
      type: "filesystem"
      path: "./skills/"
      index_type: "keyword"  # Upgrade para embeddings depois

# ─────────────────────────────────────────────────────────────────────────
# AUTO-GERAÇÃO
# ─────────────────────────────────────────────────────────────────────────
auto_generation:
  enabled: true
  
  # Escopo (v1.0: apenas programação)
  domains:
    allowed:
      - "programming"
      - "devops"
      - "security"
      - "testing"
      - "api"
      - "database"
      - "frontend"
      - "backend"
    blocked:
      - "medical"
      - "legal"
      - "financial_advice"
  
  # Tipos gerables
  types:
    skill:
      enabled: true
      template: "./templates/SKILL-TEMPLATE.md"
      output_dir: "./skills/generated/"
      
    persona:
      enabled: true
      template: "./templates/PERSONA-TEMPLATE.md"
      output_dir: "./personas/generated/"
      
    prompt:
      enabled: true
      template: "./templates/PROMPT-TEMPLATE.md"
      output_dir: "./prompts/generated/"
  
  # Fluxo de pesquisa
  research:
    web_search: true
    existing_skills: true
    documentation: true
    max_sources: 5
    
  # Qualidade
  quality:
    min_examples: 2
    require_constraints: true
    validate_schema: true
    llm_judge: false  # Habilitar em v2.0

# ─────────────────────────────────────────────────────────────────────────
# HUMAN-IN-THE-LOOP
# ─────────────────────────────────────────────────────────────────────────
human_gate:
  # Nível de autonomia (L1-L5)
  # L1: Toda ação requer aprovação
  # L2: Agente sugere, humano revisa (RECOMENDADO PARA MVP)
  # L3: Rotinas auto-executam, incertezas escalam
  # L4: Planos completos → yes/no
  # L5: Autonomia total
  default_level: "L2"
  
  # Quando escalar para humano
  escalation_triggers:
    - "skill_creation"
    - "skill_modification"
    - "persona_creation"
    - "uncertainty_high"
    - "destructive_operation"
  
  # Operações auto-aprovadas (bypass human gate)
  auto_approve:
    - "read_only"
    - "formatting"
    - "linting"
    - "search"
  
  # Canais de aprovação
  channels:
    - type: "cli"
      enabled: true
    - type: "slack"
      enabled: false
      channel: "#promptos-approvals"
      
  # Timeouts
  timeouts:
    approval_wait_hours: 24
    review_session_hours: 4

# ─────────────────────────────────────────────────────────────────────────
# INTEGRAÇÃO SPEC-KIT
# ─────────────────────────────────────────────────────────────────────────
spec_kit:
  enabled: true
  
  # Quando usar Spec-Kit vs geração direta
  thresholds:
    use_speckit_if:
      - "complexity >= complex"
      - "estimated_days >= 5"
      - "stakeholders >= 2"
    use_direct_generation_if:
      - "complexity == simple"
      - "estimated_days < 3"
      - "single_user"
  
  # Mapeamento de comandos
  commands:
    "/gerar-skill": "direct_generation"
    "/speckit.specify": "spec_kit_flow"

# ─────────────────────────────────────────────────────────────────────────
# VALIDAÇÃO E QUALIDADE
# ─────────────────────────────────────────────────────────────────────────
validation:
  # Validação estrutural (schema)
  schema:
    enabled: true
    strict_mode: false  # true = falha em warnings
    
  # Validação semântica (LLM)
  semantic:
    enabled: false  # Habilitar em v2.0
    model: "claude-haiku-4-20250514"
    
  # Testes automáticos
  testing:
    golden_set: true
    min_test_cases: 3

# ─────────────────────────────────────────────────────────────────────────
# OBSERVABILIDADE
# ─────────────────────────────────────────────────────────────────────────
observability:
  # Logging
  logging:
    level: "info"
    file: "./logs/brain.log"
    
  # Métricas
  metrics:
    enabled: true
    track:
      - "skills_generated"
      - "approval_rate"
      - "generation_time"
      - "tokens_used"
      
  # Tracing (para debug)
  tracing:
    enabled: false  # Habilitar em produção
    service: "promptos-brain"

# ─────────────────────────────────────────────────────────────────────────
# NÍVEIS COGNITIVOS
# ─────────────────────────────────────────────────────────────────────────
cognitive_levels:
  L1_automatic:
    cycle_time_ms: 2000
    approval_required: false
    operations:
      - "linting"
      - "formatting"
      - "boilerplate"
      - "syntax_fix"
      
  L2_contextual:
    cycle_time_ms: 45000
    approval_required: true
    operations:
      - "skill_generation"
      - "code_review"
      - "trade_off_analysis"
      
  L3_strategic:
    cycle_time_ms: 900000  # 15 min
    approval_required: true
    double_approval_for:
      - "architectural_decision"
      - "persona_creation"
    operations:
      - "architecture_planning"
      - "spec_creation"
      - "roadmap_planning"
```

---

## 7. INTEGRAÇÃO SPEC-KIT

### 7.1 Quando Usar Spec-Kit vs Geração Direta

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DECISÃO: SPEC-KIT vs GERAÇÃO DIRETA                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────┐                                                │
│  │ Complexidade?       │                                                │
│  └──────────┬──────────┘                                                │
│             │                                                           │
│     ┌───────┴───────┐                                                   │
│     ▼               ▼                                                   │
│  SIMPLE         MEDIUM/COMPLEX                                          │
│     │               │                                                   │
│     ▼               ▼                                                   │
│  ┌─────────┐    ┌─────────────────┐                                     │
│  │ Geração │    │ Tempo estimado? │                                     │
│  │ Direta  │    └────────┬────────┘                                     │
│  └─────────┘         ┌───┴───┐                                          │
│                      ▼       ▼                                          │
│                   < 5 dias  ≥ 5 dias                                    │
│                      │       │                                          │
│                      ▼       ▼                                          │
│               ┌─────────┐  ┌─────────┐                                  │
│               │ Geração │  │Spec-Kit │                                  │
│               │ Direta  │  │ Full    │                                  │
│               └─────────┘  └─────────┘                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

RESUMO:
┌────────────────────┬────────────────────────────────────────────────────┐
│ GERAÇÃO DIRETA     │ SPEC-KIT                                           │
├────────────────────┼────────────────────────────────────────────────────┤
│ • Skill simples    │ • Feature complexa (>5 dias)                       │
│ • <3 dias trabalho │ • Múltiplos stakeholders                           │
│ • Usuário único    │ • Documentação formal necessária                   │
│ • Protótipo/teste  │ • Compliance/auditoria                             │
│ • Refactoring      │ • Cliente externo                                  │
└────────────────────┴────────────────────────────────────────────────────┘
```

### 7.2 Mapeamento Brain → Spec-Kit

```yaml
# Mapeamento de comandos do Brain para Spec-Kit

brain_commands:
  # Comando Brain → Spec-Kit equivalente
  "/gerar-skill simples":
    action: "direct_generation"
    flow: "research → generate → approve → commit"
    
  "/gerar-skill complexa":
    action: "spec_kit_hybrid"
    flow:
      1: "/speckit.specify → criar spec"
      2: "brain.generate → criar skill a partir da spec"
      3: "brain.approve → humano aprova"
      4: "brain.commit → salvar"
      
  "/gerar-persona":
    action: "direct_generation"
    flow: "research → generate → approve → commit"
    
  "/gerar-sistema completo":
    action: "spec_kit_full"
    flow:
      1: "/speckit.constitution → definir regras"
      2: "/speckit.specify → criar spec completa"
      3: "/speckit.plan → plano técnico"
      4: "/speckit.tasks → quebrar em tasks"
      5: "brain.generate → gerar skills necessárias"
      6: "/speckit.implement → implementar"
```

### 7.3 Novo Comando: `/brain.generate`

```markdown
# Comando: /brain.generate

## Descrição
Gera automaticamente skill, persona ou prompt usando o fluxo conversacional do Brain.

## Sintaxe
```
/brain.generate [tipo] [descrição]
```

## Parâmetros
- `tipo`: `skill` | `persona` | `prompt` (opcional, auto-detectado)
- `descrição`: Descrição livre do que gerar

## Exemplos
```
/brain.generate skill para API GraphQL com Apollo
/brain.generate persona DevOps especialista em Kubernetes
/brain.generate prompt para code review de segurança
```

## Fluxo
1. **Classificar** → Identifica tipo, domínio, complexidade
2. **Decidir** → Geração direta ou Spec-Kit?
3. **Pesquisar** → Busca fontes e padrões
4. **Gerar** → Cria draft usando template
5. **Validar** → Verifica estrutura e qualidade
6. **Aprovar** → Human Gate (obrigatório)
7. **Commit** → Salva e indexa

## Integração Spec-Kit
- Se complexidade >= complex: sugere `/speckit.specify` primeiro
- Se <3 dias: geração direta
- Usuário pode forçar modo com flags `--direct` ou `--speckit`
```

---

## 8. PLANO DE IMPLEMENTAÇÃO

### 8.1 Fases de Implementação

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ROADMAP DE IMPLEMENTAÇÃO                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  FASE 1: MVP (2 semanas)                                                │
│  ════════════════════════                                               │
│  ✓ Estrutura de diretórios                                             │
│  ✓ Templates canônicos (SKILL, PERSONA, PROMPT)                        │
│  ✓ Script skill-generator.js (Node)                                    │
│  ✓ Human Gate via CLI                                                  │
│  ✓ Indexação por keyword                                               │
│  ✓ MEMORY.md básico                                                    │
│                                                                         │
│  Entregáveis:                                                           │
│  - Gerar skills de programação via CLI                                 │
│  - Aprovar/rejeitar via terminal                                       │
│  - Índice atualizado automaticamente                                   │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  FASE 2: INTEGRAÇÃO (2 semanas)                                         │
│  ══════════════════════════════                                         │
│  □ Integrar com Spec-Kit (comandos /speckit.*)                         │
│  □ Pesquisa web real (web search tool)                                 │
│  □ Validação com LLM (draft quality check)                             │
│  □ Múltiplos canais de aprovação (Slack)                               │
│  □ Episodic memory funcional                                           │
│                                                                         │
│  Entregáveis:                                                           │
│  - Fluxo híbrido Brain + Spec-Kit                                      │
│  - Pesquisa automática de fontes                                       │
│  - Notificações de aprovação                                           │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  FASE 3: INTELIGÊNCIA (3 semanas)                                       │
│  ═════════════════════════════════                                      │
│  □ Embeddings para retrieval semântico                                 │
│  □ ChromaDB para memórias                                              │
│  □ Meta-agent (gera outros agentes)                                    │
│  □ DSPy para otimização de prompts                                     │
│  □ Analytics e dashboard                                               │
│                                                                         │
│  Entregáveis:                                                           │
│  - Busca semântica de skills existentes                                │
│  - Auto-refinamento baseado em feedback                                │
│  - Métricas de qualidade                                               │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  FASE 4: ESCALA (contínuo)                                              │
│  ═════════════════════════                                              │
│  □ Expandir domínios (data science, mobile, etc)                       │
│  □ MCP compatibility                                                   │
│  □ Multi-agent coordination                                            │
│  □ Versioning de skills com Git                                        │
│  □ Marketplace de skills                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Checklist Detalhado - Fase 1 (MVP)

```markdown
## FASE 1: MVP - Checklist de Implementação

### Week 1: Fundação

#### Day 1-2: Estrutura de Diretórios
- [ ] Criar estrutura `~/src/prompt-os/`
- [ ] Criar `core/brain-config.yaml`
- [ ] Criar `memory/` com subpastas
- [ ] Criar `skills/generated/`
- [ ] Criar `personas/generated/`
- [ ] Criar `prompts/meta/`
- [ ] Criar `templates/`

#### Day 3-4: Templates
- [ ] Criar `templates/SKILL-TEMPLATE.md`
- [ ] Criar `templates/PERSONA-TEMPLATE.md`
- [ ] Criar `templates/PROMPT-TEMPLATE.md`
- [ ] Validar templates com YAML parser

#### Day 5: Scripts Base
- [ ] Criar `scripts/skill-generator.js`
- [ ] Implementar CLASSIFY
- [ ] Implementar RESEARCH (mock)
- [ ] Testar fluxo básico

### Week 2: Funcionalidade

#### Day 6-7: Geração Completa
- [ ] Implementar GENERATE
- [ ] Implementar VALIDATE
- [ ] Implementar HUMAN GATE (CLI)
- [ ] Implementar COMMIT

#### Day 8-9: Indexação
- [ ] Criar `skills/generated/INDEX.md`
- [ ] Implementar updateIndex()
- [ ] Criar `MEMORY.md` inicial
- [ ] Implementar updateMemory()

#### Day 10: Testes e Docs
- [ ] Testar fluxo completo E2E
- [ ] Documentar uso
- [ ] Criar 3 skills de exemplo
- [ ] Code review final

### Critérios de Aceite MVP
- [ ] `node skill-generator.js "GraphQL"` funciona
- [ ] Skill gerada segue template
- [ ] Human Gate pausa para aprovação
- [ ] INDEX.md atualizado após commit
- [ ] MEMORY.md registra histórico
```

### 8.3 Task Breakdown para Agentes Simples

```markdown
## TASKS PARA IMPLEMENTAÇÃO POR AGENTES SIMPLES

Cada task abaixo é auto-contida e pode ser executada por um agente 
como Gemini Flash, GPT-mini ou Haiku.

---

### TASK 001: Criar Estrutura de Diretórios

**Objetivo:** Criar a estrutura de pastas do PromptOS Brain

**Entrada:** Nenhuma

**Saída:** Estrutura de diretórios criada

**Passos:**
```bash
# Executar no terminal
mkdir -p ~/src/prompt-os/{core,memory/{working,episodic,semantic,procedural},skills/{academic,technical,generated},personas/{composable,generated},prompts/{meta,generated},templates,scripts,logs}

# Criar arquivos placeholder
touch ~/src/prompt-os/skills/generated/INDEX.md
touch ~/src/prompt-os/personas/generated/INDEX.md
touch ~/src/prompt-os/prompts/generated/INDEX.md
touch ~/src/prompt-os/MEMORY.md
```

**Validação:**
```bash
tree ~/src/prompt-os -L 3
# Deve mostrar estrutura completa
```

---

### TASK 002: Criar Template SKILL.md

**Objetivo:** Criar o template canônico para skills

**Entrada:** Especificação do template (seção 5.1 deste documento)

**Saída:** Arquivo `templates/SKILL-TEMPLATE.md`

**Passos:**
1. Criar arquivo em `~/src/prompt-os/templates/SKILL-TEMPLATE.md`
2. Copiar conteúdo da seção 5.1
3. Substituir placeholders por `{variável}`

**Validação:**
- [ ] Arquivo existe
- [ ] YAML frontmatter é válido
- [ ] Todas as seções presentes

---

### TASK 003: Criar brain-config.yaml

**Objetivo:** Criar arquivo de configuração central

**Entrada:** Especificação da seção 6.2

**Saída:** Arquivo `core/brain-config.yaml`

**Passos:**
1. Criar arquivo em `~/src/prompt-os/core/brain-config.yaml`
2. Copiar conteúdo da seção 6.2
3. Ajustar paths para estrutura local

**Validação:**
```bash
# Validar YAML
python3 -c "import yaml; yaml.safe_load(open('core/brain-config.yaml'))"
```

---

### TASK 004: Implementar Função classifyRequest()

**Objetivo:** Criar função que classifica pedidos do usuário

**Entrada:** String do usuário

**Saída:** Objeto `{description, domain, complexity, refinements}`

**Código:**
```javascript
// Em skill-generator.js
function classifyRequest(userInput) {
  return {
    description: userInput,
    domain: detectDomain(userInput),
    complexity: detectComplexity(userInput),
    refinements: [],
  };
}

function detectDomain(text) {
  const domains = {
    'graphql': ['graphql', 'apollo', 'resolver'],
    'react': ['react', 'hook', 'component'],
    // ... adicionar mais
  };
  // implementar lógica
}
```

**Validação:**
```javascript
// Teste
const result = classifyRequest("skill para GraphQL com Apollo");
console.assert(result.domain === 'graphql');
console.assert(result.complexity !== undefined);
```

---

### TASK 005: Implementar Human Gate CLI

**Objetivo:** Criar interação de aprovação no terminal

**Entrada:** SkillDraft objeto

**Saída:** `{action: 'approve'|'reject'|'cancel', reason?: string}`

**Código:**
```javascript
const readline = require('readline');

async function requestHumanApproval(draft) {
  console.log('📝 PREVIEW:', draft.fullText.substring(0, 1000));
  console.log('\nOpções: approve | reject [motivo] | cancel');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question('Decisão: ', (answer) => {
      rl.close();
      const [action, ...reason] = answer.split(' ');
      resolve({ action, reason: reason.join(' ') });
    });
  });
}
```

**Validação:**
- [ ] Mostra preview do draft
- [ ] Aceita input do usuário
- [ ] Retorna objeto correto

---

### TASK 006: Implementar updateIndex()

**Objetivo:** Atualizar INDEX.md após criar skill

**Entrada:** Metadata da skill

**Saída:** INDEX.md atualizado

**Código:**
```javascript
async function updateIndex(metadata) {
  const indexPath = './skills/generated/INDEX.md';
  
  let content = await fs.readFile(indexPath, 'utf8').catch(() => 
    '# Skills Geradas\n\n| Nome | Domínio | Status | Data |\n|------|---------|--------|------|\n'
  );
  
  const newEntry = `| ${metadata.name} | ${metadata.domain} | ${metadata.status} | ${metadata.created} |`;
  
  if (!content.includes(metadata.name)) {
    content = content.trimEnd() + '\n' + newEntry + '\n';
    await fs.writeFile(indexPath, content, 'utf8');
  }
}
```

**Validação:**
```bash
cat skills/generated/INDEX.md
# Deve mostrar tabela com nova entrada
```

---

### TASK 007: Criar 3 Skills de Exemplo

**Objetivo:** Gerar skills de exemplo para validar o sistema

**Entrada:** Lista de skills a criar
- graphql-api
- react-hooks
- docker-basics

**Saída:** 3 arquivos SKILL.md em skills/generated/

**Passos:**
1. Executar `node skill-generator.js "API GraphQL com Apollo"`
2. Aprovar quando solicitado
3. Repetir para "Custom React Hooks"
4. Repetir para "Docker containers básico"

**Validação:**
```bash
ls skills/generated/*/SKILL.md
# Deve listar 3 arquivos
```

---

### TASK 008: Teste E2E Completo

**Objetivo:** Validar fluxo completo de geração

**Entrada:** Comando de teste

**Passos:**
```bash
# 1. Limpar ambiente
rm -rf skills/generated/*
echo "# Skills Geradas" > skills/generated/INDEX.md

# 2. Gerar skill
node skill-generator.js "skill para testes com Jest"

# 3. Quando perguntado, digitar: approve

# 4. Verificar resultados
cat skills/generated/skill-para-testes-com-jest/SKILL.md
cat skills/generated/INDEX.md
cat MEMORY.md
```

**Validação:**
- [ ] SKILL.md criado com conteúdo correto
- [ ] INDEX.md contém nova entrada
- [ ] MEMORY.md registra a criação
- [ ] Status é "approved"
```

---

## 9. CHECKLIST DE VALIDAÇÃO

### 9.1 Checklist de Qualidade de Skill

```markdown
## CHECKLIST: Validação de Skill Gerada

### Estrutura (Automático)
- [ ] YAML frontmatter válido
- [ ] Campo `name` presente e em kebab-case
- [ ] Campo `description` presente (50-100 palavras)
- [ ] Campo `version` presente (semver)
- [ ] Campo `domain` presente
- [ ] Campo `triggers` presente (array)
- [ ] Campo `status` presente

### Conteúdo (Automático)
- [ ] Seção "## 🎯 Instruções" presente
- [ ] Seção "## ✅ Guidelines" presente
- [ ] Seção "## ❌ Constraints" presente
- [ ] Seção "## 📚 Exemplos" presente
- [ ] Mínimo 2 exemplos
- [ ] Seção "## 📖 Referências" presente

### Qualidade (Human Review)
- [ ] Descrição é semanticamente densa
- [ ] Instruções são acionáveis
- [ ] Exemplos são realistas
- [ ] Constraints evitam antipadrões reais
- [ ] Referências são fontes confiáveis
```

### 9.2 Checklist de Sistema

```markdown
## CHECKLIST: Validação do Sistema Brain

### Fase 1 (MVP)
- [ ] Estrutura de diretórios criada
- [ ] Templates validados (YAML válido)
- [ ] skill-generator.js executa sem erros
- [ ] Human Gate funciona no CLI
- [ ] INDEX.md atualiza corretamente
- [ ] MEMORY.md registra histórico
- [ ] 3+ skills de exemplo criadas

### Fase 2 (Integração)
- [ ] Web search funciona
- [ ] Spec-Kit integrado
- [ ] Slack notifications (se configurado)
- [ ] Episodic memory funciona

### Fase 3 (Inteligência)
- [ ] Embeddings configurados
- [ ] Busca semântica funciona
- [ ] Meta-agent funciona
- [ ] Analytics coletando métricas
```

---

## 10. REFERÊNCIAS

### 10.1 Papers e Frameworks

| Referência | Uso no PromptOS Brain |
|------------|----------------------|
| [CoALA (arXiv:2309.02427)](https://arxiv.org/abs/2309.02427) | Arquitetura de memórias e ciclo de decisão |
| [Voyager (arXiv:2305.16291)](https://arxiv.org/abs/2305.16291) | Skill library pattern |
| [ADAS](https://github.com/ShengranHu/ADAS) | Meta-agent para auto-geração |
| [LangGraph](https://github.com/langchain-ai/langgraph) | Interrupt pattern para human gate |
| [DSPy](https://github.com/stanfordnlp/dspy) | Otimização de prompts (futuro) |
| [The Prompt Report (arXiv:2406.06608)](https://arxiv.org/abs/2406.06608) | Taxonomia de técnicas |

### 10.2 Documentação Relacionada

- `docs/HOW-TO-USE-SPECIFY.md` - Guia do Spec-Kit
- `docs/v3_4/OVERVIEW-V3.4.md` - Overview do PromptOS
- `.prompt-os/agents/spec-kit-commands.md` - Comandos Spec-Kit
- `.specify/memory/constitution.md` - Regras T0 do projeto

### 10.3 Skills de Referência

```markdown
## Skills Modelo para Referência

1. **Claude Code SKILL.md Pattern**
   - Localização: `/mnt/skills/public/docx/SKILL.md`
   - Uso: Padrão de formatação oficial Anthropic

2. **Academic Skills (PromptOS)**
   - Localização: `.github/skills/academic/`
   - Uso: 84 skills acadêmicas como referência

3. **Composable Personas**
   - Localização: `.github/skills/composable/`
   - Uso: 6 personas compostas como referência
```

---

## APÊNDICE A: Glossário

| Termo | Definição |
|-------|-----------|
| **Brain** | Sistema cognitivo simplificado do PromptOS |
| **CoALA** | Cognitive Architectures for Language Agents (paper) |
| **Human Gate** | Ponto de aprovação humana obrigatória |
| **JIT Loading** | Carregamento Just-In-Time de skills |
| **L1/L2/L3** | Níveis cognitivos (Automático/Contextual/Estratégico) |
| **Meta-prompt** | Prompt que gera outros prompts/skills |
| **Procedural Memory** | Memória de "como fazer" (skills) |
| **Semantic Memory** | Memória de conhecimento geral |
| **Spec-Kit** | Framework de especificação do GitHub |

---

## APÊNDICE B: FAQ

**Q: Posso usar Python em vez de Node.js?**
A: Sim! O script skill-generator.js pode ser portado para Python. A lógica é idêntica.

**Q: Preciso de ChromaDB desde o início?**
A: Não. O MVP usa filesystem + keyword matching. ChromaDB é upgrade da Fase 3.

**Q: Como expandir para outros domínios?**
A: Adicione novos domínios em `brain-config.yaml > auto_generation > domains > allowed`.

**Q: O que fazer se a skill gerada for ruim?**
A: Use `reject [motivo]` no Human Gate. O sistema registrará o feedback para melhoria futura.

---

**FIM DO DOCUMENTO**

*Versão: 1.0.0 | Última atualização: 2026-02-02*
