# 🧠 PROMPTOS BRAIN v2.0 - PLANO DE IMPLEMENTAÇÃO

> **Versão:** 2.0.0 | **Data:** 2026-02-02 | **Status:** SPEC COMPLETA
> **Objetivo:** Sistema auto-evolutivo para programação paralela humano-agente
> **Princípio:** Arquitetura neurocientífica simplificada + Human-in-the-loop

---

## 📋 ÍNDICE

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Modelo Neurocientífico Simplificado](#2-modelo-neurocientífico-simplificado)
3. [Sistema de Auto-Incrementação](#3-sistema-de-auto-incrementação)
4. [Integração com Spec-Kit](#4-integração-com-spec-kit)
5. [Templates Prontos](#5-templates-prontos)
6. [Roteiro de Implementação](#6-roteiro-de-implementação)
7. [Comandos e Fluxos](#7-comandos-e-fluxos)

---

## 1. VISÃO GERAL DA ARQUITETURA

### 1.1 Metáfora Operacional (Atualizada)

| Componente Biológico | Computacional | PromptOS v2.0 |
|---------------------|---------------|---------------|
| **Cérebro** | CPU | LLM (Claude/GPT/Gemini) |
| **Memória de Trabalho** | RAM | Context Window (~200K tokens) |
| **Memória de Longo Prazo** | Disco/SSD | `MEMORY.md` + `skills/` + Vector DB |
| **Sistema Nervoso** | Barramento I/O | MCP (Model Context Protocol) |
| **Córtex Pré-Frontal** | Scheduler | `master-router.md` |
| **Hipocampo** | Cache/Index | `INDEX.md` + Embeddings |
| **Tronco Cerebral** | BIOS/Boot | `AGENTS.md` (Kernel) |

### 1.2 Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PROMPTOS BRAIN v2.0                              │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                 GLOBAL WORKSPACE (Hub de Atenção)                │   │
│  │  • Goal atual / foco ativo                                       │   │
│  │  • Context buffer (~10-50K tokens úteis)                         │   │
│  │  • Broadcast para módulos                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│           ↕                    ↕                    ↕                   │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐            │
│  │   RECALL    │      │   REASON    │      │     ACT     │            │
│  │  (Memória)  │      │    (LLM)    │      │   (Tools)   │            │
│  ├─────────────┤      ├─────────────┤      ├─────────────┤            │
│  │• Episódica  │      │• Planning   │      │• Web search │            │
│  │  (MEMORY.md)│      │• Reflection │      │• Code exec  │            │
│  │• Semântica  │      │• Evaluation │      │• File ops   │            │
│  │  (skills/)  │      │• Generation │      │• Git ops    │            │
│  │• Procedural │      │• Criticism  │      │• HUMAN GATE │ ← CRÍTICO  │
│  │  (prompts/) │      │             │      │             │            │
│  └─────────────┘      └─────────────┘      └─────────────┘            │
│           ↕                    ↕                    ↕                   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    AUTO-INCREMENT ENGINE                         │   │
│  │  Pesquisa → Geração → Validação → [HUMAN APPROVAL] → Commit     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Princípios Fundamentais

| Princípio | Descrição | Implementação |
|-----------|-----------|---------------|
| **P1: Kernel Leve** | AGENTS.md < 5KB, aponta para skills externas | JIT Loading |
| **P2: Human-in-the-Loop** | Nenhuma criação/modificação sem aprovação | Gates em pontos críticos |
| **P3: Conversacional** | Fluxo natural com sugestões e correções | Não comandos rígidos |
| **P4: Auto-Evolutivo** | Sistema gera próprias skills/personas | Pipeline de geração |
| **P5: Cross-Model** | Funciona em Claude/GPT/Gemini/DeepSeek | Markdown > XML |

---

## 2. MODELO NEUROCIENTÍFICO SIMPLIFICADO

### 2.1 Sistema de Memórias (CoALA Simplificado)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      SISTEMA DE MEMÓRIAS v2.0                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │              WORKING MEMORY (Memória de Trabalho)                │   │
│  │  • Localização: Context Window do LLM                            │   │
│  │  • Capacidade: ~200K tokens (modelo dependente)                  │   │
│  │  • Persistência: Apenas durante sessão                           │   │
│  │  • Conteúdo: Goal atual + Skills carregadas + Histórico recente  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                               ↕                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        │
│  │    EPISÓDICA    │  │    SEMÂNTICA    │  │   PROCEDURAL    │        │
│  │   (Experiências)│  │  (Conhecimento) │  │    (Skills)     │        │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤        │
│  │ MEMORY.md       │  │ skills/         │  │ prompts/        │        │
│  │ • Decisões      │  │ • academic/     │  │ • meta-prompts  │        │
│  │ • Erros         │  │ • technology/   │  │ • generators    │        │
│  │ • Aprendizados  │  │ • INDEX.md      │  │ • workflows     │        │
│  │ • Timestamps    │  │ • embeddings/   │  │                 │        │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘        │
│                                                                         │
│  PERSISTÊNCIA: Git + Filesystem (sem banco de dados no MVP)            │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Níveis Cognitivos (PromptSO)

| Nível | Nome | Função | Latência | Exemplo |
|-------|------|--------|----------|---------|
| **L1** | Instintivo | Respostas automáticas | <1s | Linting, formatação, autocomplete |
| **L2** | Contextual | Análise com contexto | 1-10s | Code review, debugging, refactoring |
| **L3** | Estratégico | Planejamento profundo | 10-60s | Arquitetura, design de sistemas |
| **L4** | Meta-Cognitivo | Auto-reflexão e evolução | 1-5min | Geração de skills, auto-melhoria |

### 2.3 Ciclo de Decisão (OODA Simplificado)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CICLO DE DECISÃO (OODA + PDCA)                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│    ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐    │
│    │ OBSERVE  │ ──▶ │  ORIENT  │ ──▶ │  DECIDE  │ ──▶ │   ACT    │    │
│    │ (Input)  │     │ (Classify)│    │ (Route)  │     │ (Execute)│    │
│    └──────────┘     └──────────┘     └──────────┘     └──────────┘    │
│         │               │                │                │            │
│         ▼               ▼                ▼                ▼            │
│    ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐    │
│    │ Receber  │     │ Nível    │     │ Skill +  │     │ Executar │    │
│    │ request  │     │ cognitivo│     │ Persona  │     │ + validar│    │
│    │ do user  │     │ L1/L2/L3 │     │ adequados│     │ resultado│    │
│    └──────────┘     └──────────┘     └──────────┘     └──────────┘    │
│                                                                         │
│    SE resultado insatisfatório OU incerteza alta:                      │
│    ──▶ HUMAN GATE (pausa para aprovação/correção)                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. SISTEMA DE AUTO-INCREMENTAÇÃO

### 3.1 Pipeline de Geração (Human-in-the-Loop)

```
┌─────────────────────────────────────────────────────────────────────────┐
│           PIPELINE DE AUTO-GERAÇÃO (com aprovação humana)               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  FASE 1: TRIGGER                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ User: "Preciso de uma skill para Kubernetes"                     │   │
│  │ OU: Sistema detecta gap (skill não encontrada para query)        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                               │                                         │
│                               ▼                                         │
│  FASE 2: PESQUISA (Web Search + Project Knowledge)                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 1. Buscar documentação oficial (kubernetes.io)                   │   │
│  │ 2. Buscar best practices (CNCF, artigos técnicos)                │   │
│  │ 3. Verificar skills existentes similares (INDEX.md)              │   │
│  │ 4. Compilar fontes e referências                                 │   │
│  │                                                                   │   │
│  │ OUTPUT: research-kubernetes.md (salvo em docs/pesquisa-previa/)  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                               │                                         │
│                               ▼                                         │
│  FASE 3: GERAÇÃO (Meta-Prompt + Template)                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 1. Carregar skill-template.md                                    │   │
│  │ 2. Aplicar meta-prompt de geração                                │   │
│  │ 3. Preencher seções obrigatórias                                 │   │
│  │ 4. Gerar exemplos de código                                      │   │
│  │                                                                   │   │
│  │ OUTPUT: kubernetes-DRAFT.md (skill candidata)                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                               │                                         │
│                               ▼                                         │
│  FASE 4: VALIDAÇÃO AUTOMÁTICA                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 1. ✓ YAML frontmatter válido (9 campos obrigatórios)             │   │
│  │ 2. ✓ Seções obrigatórias presentes                               │   │
│  │ 3. ✓ Token budget respeitado (1200-1400 tokens)                  │   │
│  │ 4. ✓ Pseudocódigo sintáticamente válido                          │   │
│  │ 5. ✓ Nenhum placeholder [AQUI:] remanescente                     │   │
│  │                                                                   │   │
│  │ OUTPUT: validation-report.json                                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                               │                                         │
│                               ▼                                         │
│  ╔═════════════════════════════════════════════════════════════════╗   │
│  ║  FASE 5: HUMAN GATE (OBRIGATÓRIO)                               ║   │
│  ╠═════════════════════════════════════════════════════════════════╣   │
│  ║                                                                   ║   │
│  ║  AI: "Gerei uma skill para Kubernetes. Aqui está o preview:"    ║   │
│  ║                                                                   ║   │
│  ║  [Mostra resumo da skill + link para preview completo]          ║   │
│  ║                                                                   ║   │
│  ║  Fontes utilizadas:                                              ║   │
│  ║  - kubernetes.io/docs (oficial)                                  ║   │
│  ║  - CNCF best practices                                           ║   │
│  ║                                                                   ║   │
│  ║  ┌───────────────────────────────────────────────────────────┐  ║   │
│  ║  │ [APROVAR]  [EDITAR]  [REJEITAR]  [VER COMPLETO]          │  ║   │
│  ║  └───────────────────────────────────────────────────────────┘  ║   │
│  ║                                                                   ║   │
│  ║  User pode:                                                      ║   │
│  ║  • Aprovar → skill é salva e indexada                           ║   │
│  ║  • Editar → sugere correções, AI ajusta                         ║   │
│  ║  • Rejeitar → skill descartada, feedback para melhoria          ║   │
│  ║  • Adicionar referências → AI incorpora e regenera              ║   │
│  ║                                                                   ║   │
│  ╚═════════════════════════════════════════════════════════════════╝   │
│                               │                                         │
│                               ▼                                         │
│  FASE 6: COMMIT (Somente após aprovação)                               │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 1. Salvar skill em src/prompt-os/skills/{category}/             │   │
│  │ 2. Atualizar INDEX.md (adicionar entrada)                       │   │
│  │ 3. Atualizar MEMORY.md (registrar criação)                      │   │
│  │ 4. Git commit com mensagem semântica                            │   │
│  │ 5. (Opcional) Gerar embeddings para busca semântica             │   │
│  │                                                                   │   │
│  │ OUTPUT: Skill disponível para uso imediato                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Níveis de Autonomia

| Nível | Nome | Descrição | Aprovação Necessária |
|-------|------|-----------|---------------------|
| **A1** | Operador | User controla cada passo | Toda ação |
| **A2** | Colaborador | AI sugere, user revisa tudo | Skills, Personas, Commits |
| **A3** | Consultor | Rotinas auto-executam, novidades escalam | Apenas criações novas |
| **A4** | Aprovador | Planos completos → yes/no | Apenas planos |
| **A5** | Observador | Autonomia total | Auditorias periódicas |

**RECOMENDAÇÃO MVP:** Iniciar em **A2 (Colaborador)** para programação.

### 3.3 Tipos de Artefatos Geráveis

| Artefato | Template | Gatilho | Aprovação |
|----------|----------|---------|-----------|
| **Skill** | `skill-template.md` | User request / Gap detection | Obrigatória |
| **Persona** | `persona-template.md` | User request / Composição | Obrigatória |
| **Prompt** | `prompt-template.md` | Workflow específico | Obrigatória |
| **Exemplo** | `example-template.md` | Skill existente sem exemplos | Opcional (sugestão) |

---

## 4. INTEGRAÇÃO COM SPEC-KIT

### 4.1 Arquitetura de Integração

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PROMPTOS + SPEC-KIT INTEGRATION                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                     CAMADA DE ORQUESTRAÇÃO                         │ │
│  │  AGENTS.md (Kernel) ←→ .specify/constitution.md (Spec-Kit)        │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                               ↕                                         │
│  ┌─────────────────────────────┬─────────────────────────────────────┐ │
│  │      PROMPTOS (Interno)     │       SPEC-KIT (Cliente)            │ │
│  ├─────────────────────────────┼─────────────────────────────────────┤ │
│  │ • Skills (auto-geração)     │ • Specs (especificações formais)    │ │
│  │ • Personas (composição)     │ • Plans (planos técnicos)           │ │
│  │ • CARDs (tasks ágeis)       │ • Tasks (implementação)             │ │
│  │ • MEMORY.md (estado)        │ • Constitution (regras T0)          │ │
│  └─────────────────────────────┴─────────────────────────────────────┘ │
│                               ↕                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                     COMANDOS UNIFICADOS                            │ │
│  │                                                                     │ │
│  │  PROMPTOS (conversacional):        SPEC-KIT (formal):              │ │
│  │  • "Gera uma skill de React"       • /speckit.specify              │ │
│  │  • "Preciso de uma persona..."     • /speckit.plan                 │ │
│  │  • "Cria um CARD para..."          • /speckit.tasks                │ │
│  │  • "Atualiza o INDEX"              • /speckit.implement            │ │
│  │                                                                     │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Matriz de Decisão: CARD vs SPEC

| Critério | CARD (PromptOS) | SPEC (Spec-Kit) |
|----------|-----------------|-----------------|
| **Escopo** | < 5 dias | > 10 dias |
| **Stakeholders** | Time interno | Cliente externo |
| **Formalidade** | Baixa | Alta |
| **Documentação** | Mínima | Completa |
| **Aprovação** | Humano local | Stakeholder formal |
| **Workflow** | Ágil | Waterfall-ish |

### 4.3 Sincronização Bidirecional

```yaml
# Sync: Constitution.md ↔ Architectural-Rules.md

.specify/memory/constitution.md:
  - Principle I: Security First
  - Principle II: API Contracts

.context/standards/architectural-rules.md:
  - [T0-SEC-01]: All endpoints require auth
  - [T0-API-01]: REST conventions mandatory

# Script: Sync-Constitution.ps1
# Mantém ambos em sync automaticamente
```

---

## 5. TEMPLATES PRONTOS

### 5.1 Localização dos Templates

```
src/prompt-os/
├── templates/
│   ├── auto-increment/
│   │   ├── skill-generator.prompt.md      ← Meta-prompt para gerar skills
│   │   ├── persona-generator.prompt.md    ← Meta-prompt para gerar personas
│   │   ├── skill-template.md              ← Template base de skill
│   │   ├── persona-template.md            ← Template base de persona
│   │   ├── example-template.md            ← Template de exemplos
│   │   └── research-template.md           ← Template de pesquisa
│   ├── context/
│   │   ├── AGENTS.template.md             ← Kernel para novos projetos
│   │   ├── MEMORY.template.md             ← Estado inicial
│   │   └── README.template.md             ← README do .prompt-os/
│   └── speckit/
│       ├── spec-template.md               ← SPEC-XXX.md
│       ├── plan-template.md               ← plan.md
│       └── tasks-template.md              ← tasks.md
├── scripts/
│   ├── generate-skill.ps1                 ← Script de geração
│   ├── validate-skill.ps1                 ← Script de validação
│   ├── sync-index.ps1                     ← Atualiza INDEX.md
│   └── sync-constitution.ps1              ← Sync Spec-Kit
└── prompts/
    ├── research.prompt.md                 ← Prompt de pesquisa
    ├── generation.prompt.md               ← Prompt de geração
    ├── validation.prompt.md               ← Prompt de validação
    └── criticism.prompt.md                ← Prompt de auto-crítica
```

### 5.2 Template: Skill Generator Prompt

**Arquivo:** `templates/auto-increment/skill-generator.prompt.md`

```markdown
---
name: skill-generator
version: "2.0.0"
type: meta-prompt
purpose: Gerar skills completas seguindo ADR-001
---

# Skill Generator Protocol

## INPUT ESPERADO

Você receberá:
1. **Nome da skill** (ex: "kubernetes", "react-hooks")
2. **Categoria** (academic | technology)
3. **Subcategoria** (ex: cloud, web-mobile)
4. **Pesquisa prévia** (opcional, arquivo .md com referências)

## INSTRUÇÕES DE GERAÇÃO

### Passo 1: Analisar Contexto

1. Ler pesquisa prévia (se fornecida)
2. Identificar conceitos core (máximo 5)
3. Listar use cases principais (4-5)
4. Identificar anti-patterns (1-2)

### Passo 2: Gerar YAML Frontmatter

```yaml
---
name: {skill-name}                    # kebab-case
description: |
  {Linha 1: O que é e para que serve}
  {Linha 2: Quando usar esta skill}
keywords:
  - {keyword principal}
  - {sinônimo}
  - {termo técnico}
  - {ferramenta relacionada}
category: {academic | technology}
subcategory: {subcategoria}
version: "3.5.0"
created: {YYYY-MM-DD}
type: skill
---
```

### Passo 3: Gerar Seções Obrigatórias

**BUDGET DE TOKENS:**
| Seção | Tokens | Obrigatória |
|-------|--------|-------------|
| YAML | 100 | ✅ |
| When to Use | 100 | ✅ |
| Core Concepts | 600-800 | ✅ |
| Best Practices | 150 | ✅ |
| Common Pitfalls | 150 | ✅ |
| Related Skills | 50 | ✅ |
| **TOTAL** | **1200-1400** | |

### Passo 4: Auto-Validar

Antes de retornar, verificar:
- [ ] YAML é válido (testar parse)
- [ ] Todos os 9 campos YAML presentes
- [ ] Nenhum placeholder [AQUI:] ou [PENDENTE:]
- [ ] Pseudocódigo tem sintaxe correta
- [ ] Total < 1400 tokens

## OUTPUT ESPERADO

Retornar APENAS o arquivo markdown completo.
Não incluir explicações antes ou depois.
```

### 5.3 Template: Skill Base

**Arquivo:** `templates/auto-increment/skill-template.md`

```markdown
---
name: {skill-name}
description: |
  {Linha 1: Descrição principal e propósito}
  {Linha 2: Quando usar / contexto ideal}
keywords:
  - {keyword-1}
  - {keyword-2}
  - {keyword-3}
category: {academic | technology}
subcategory: {subcategoria}
version: "3.5.0"
created: {YYYY-MM-DD}
type: skill
---

# {Skill Name}

> **Quick Reference:** {Resumo em uma linha}
> **Use when:** {Caso de uso principal em 5-10 palavras}

## When to Use

- ✅ {Use case 1 - específico e acionável}
- ✅ {Use case 2 - específico e acionável}
- ✅ {Use case 3 - específico e acionável}
- ❌ **NOT for:** {Anti-pattern ou uso incorreto}

## Core Concepts

### 1. {Conceito Principal}

{Explicação concisa + pseudocódigo se aplicável}

```
STRUCTURE {ConceptName}
    field1: TYPE
    field2: TYPE

FUNCTION main_operation(input)
    // Lógica principal
    RETURN result
```

### 2. {Segundo Conceito}

{Explicação concisa + exemplo prático}

### 3. {Terceiro Conceito}

{Explicação concisa + código de exemplo}

## Best Practices

1. **{Prática 1}:** {Descrição curta}
2. **{Prática 2}:** {Descrição curta}
3. **{Prática 3}:** {Descrição curta}

## Common Pitfalls

- ❌ **{Pitfall 1}:** {Por que é problema + como evitar}
- ❌ **{Pitfall 2}:** {Por que é problema + como evitar}

## Related Skills

- [{skill-relacionada-1}](../path/skill-1.md)
- [{skill-relacionada-2}](../path/skill-2.md)

## Examples

📚 **Implementações detalhadas:**
→ [View {skill-name}-examples.md](../examples/{skill-name}-examples.md)
```

### 5.4 Template: Persona

**Arquivo:** `templates/auto-increment/persona-template.md`

```markdown
---
name: {persona-name}
type: persona
expertise:
  - {expertise-1}
  - {expertise-2}
  - {expertise-3}
skills:
  - {skill-1}
  - {skill-2}
  - {skill-3}
inherits_from: []  # ou [parent-persona-name]
communication_style: {technical | casual | formal}
version: "3.5.0"
created: {YYYY-MM-DD}
---

# {Persona Name}

## Identity

**Role:** {Descrição do papel em uma frase}
**Experience:** {Nível de experiência simulado}
**Specialties:** {Lista de especialidades}

## Core Behaviors

1. **{Comportamento 1}:** {Descrição}
2. **{Comportamento 2}:** {Descrição}
3. **{Comportamento 3}:** {Descrição}

## Interaction Patterns

- **Ao receber task vaga:** {Como responde}
- **Ao encontrar bug:** {Como aborda}
- **Ao revisar código:** {Como feedback}

## Constraints

- {Constraint 1 - o que NÃO faz}
- {Constraint 2 - limitação}

## Loaded Skills

Carrega automaticamente:
1. [{skill-1}](../skills/path/skill-1.md)
2. [{skill-2}](../skills/path/skill-2.md)
```

### 5.5 Template: Pesquisa Prévia

**Arquivo:** `templates/auto-increment/research-template.md`

```markdown
---
topic: {topic-name}
date: {YYYY-MM-DD}
status: draft | complete
sources_count: {N}
---

# Pesquisa: {Topic Name}

## Objetivo

{Por que esta pesquisa foi iniciada}

## Fontes Consultadas

### Fonte 1: {Nome da Fonte}
- **URL:** {link}
- **Tipo:** documentação oficial | artigo técnico | paper | blog
- **Confiabilidade:** alta | média | baixa
- **Resumo:** {2-3 frases}

### Fonte 2: {Nome da Fonte}
- **URL:** {link}
- **Tipo:** {tipo}
- **Confiabilidade:** {nível}
- **Resumo:** {2-3 frases}

## Conceitos Identificados

1. **{Conceito 1}:** {Definição}
2. **{Conceito 2}:** {Definição}
3. **{Conceito 3}:** {Definição}

## Best Practices (da indústria)

- {BP 1}
- {BP 2}
- {BP 3}

## Pitfalls Comuns

- {Pitfall 1}
- {Pitfall 2}

## Skills Relacionadas Existentes

- [{skill-name}](path/to/skill.md) - {relevância}

## Recomendação

{Conclusão: criar skill nova, expandir existente, ou não necessário}
```

---

## 6. ROTEIRO DE IMPLEMENTAÇÃO

### 6.1 Visão Geral das Fases

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ROADMAP DE IMPLEMENTAÇÃO                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  FASE 1: FOUNDATION (1-2 dias)                                         │
│  ├── 1.1 Estrutura de diretórios                                       │
│  ├── 1.2 AGENTS.md v2.0 (kernel simplificado)                          │
│  ├── 1.3 MEMORY.md v2.0 (estado inicial)                               │
│  └── 1.4 Templates base                                                │
│                                                                         │
│  FASE 2: CORE ENGINE (2-3 dias)                                        │
│  ├── 2.1 Input Classifier v2.0                                         │
│  ├── 2.2 Master Router v2.0                                            │
│  ├── 2.3 Skill Loader (JIT)                                            │
│  └── 2.4 Memory Manager                                                │
│                                                                         │
│  FASE 3: AUTO-INCREMENT (3-4 dias)                                     │
│  ├── 3.1 Research Pipeline                                             │
│  ├── 3.2 Generation Pipeline                                           │
│  ├── 3.3 Validation Pipeline                                           │
│  ├── 3.4 Human Gate Implementation                                     │
│  └── 3.5 Commit Pipeline                                               │
│                                                                         │
│  FASE 4: SPEC-KIT INTEGRATION (1-2 dias)                               │
│  ├── 4.1 Constitution Sync                                             │
│  ├── 4.2 Spec-Kit Commands                                             │
│  └── 4.3 Workflow Integration                                          │
│                                                                         │
│  FASE 5: TESTING & POLISH (2-3 dias)                                   │
│  ├── 5.1 Unit Tests                                                    │
│  ├── 5.2 Integration Tests                                             │
│  ├── 5.3 E2E Scenarios                                                 │
│  └── 5.4 Documentation                                                 │
│                                                                         │
│  TOTAL ESTIMADO: 9-14 dias                                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 FASE 1: Foundation (Detalhada)

#### Task 1.1: Estrutura de Diretórios

**Objetivo:** Criar estrutura completa de pastas

**Input:** Nenhum

**Output:**
```
src/prompt-os/
├── core/
│   ├── input-classifier.md
│   ├── master-router.md
│   ├── tier-system.md
│   └── loading-protocol.md
├── skills/
│   ├── academic/
│   │   ├── INDEX.md
│   │   └── {subcategories}/
│   ├── technology/
│   │   ├── INDEX.md
│   │   └── {subcategories}/
│   └── _generators/
│       ├── skill-generator-protocol.md
│       └── skill-template.md
├── personas/
│   ├── INDEX.md
│   ├── base/
│   └── composed/
├── prompts/
│   ├── research.prompt.md
│   ├── generation.prompt.md
│   └── validation.prompt.md
├── templates/
│   ├── auto-increment/
│   ├── context/
│   └── speckit/
├── scripts/
│   ├── generate-skill.ps1
│   ├── validate-skill.ps1
│   └── sync-index.ps1
├── AGENTS.md
├── MEMORY.md
├── VERSION.txt
└── README.md
```

**Comando para agente simples:**
```
Crie a estrutura de diretórios acima.
Para cada pasta, crie um arquivo .gitkeep vazio.
Para INDEX.md, use o template de INDEX vazio.
```

#### Task 1.2: AGENTS.md v2.0

**Objetivo:** Criar kernel minimalista (<5KB)

**Input:** Template AGENTS abaixo

**Output:** `src/prompt-os/AGENTS.md`

**Critérios de Aceite:**
- [ ] Tamanho < 5KB
- [ ] Seções: Identity, Memory, Routing, Skills Index, Auto-Increment
- [ ] Nenhuma skill completa inline (apenas referências)

#### Task 1.3: MEMORY.md v2.0

**Objetivo:** Criar estado inicial

**Input:** Template MEMORY abaixo

**Output:** `src/prompt-os/MEMORY.md`

**Critérios de Aceite:**
- [ ] Seções: Last Session, Active Goals, Learned, Errors
- [ ] Formato YAML para parsing fácil
- [ ] Timestamp automático

#### Task 1.4: Templates Base

**Objetivo:** Criar todos os templates

**Input:** Templates da Seção 5

**Output:** Arquivos em `templates/`

**Critérios de Aceite:**
- [ ] Todos os 8 templates criados
- [ ] Placeholders claramente marcados com {NOME}
- [ ] Validável via script

---

### 6.3 FASE 2: Core Engine (Detalhada)

#### Task 2.1: Input Classifier v2.0

**Objetivo:** Classificar inputs em níveis cognitivos + tipo

**Input:** Mensagem do usuário

**Output:** Classificação estruturada

**Arquivo:** `core/input-classifier.md`

**Algoritmo:**
```
FUNCTION classify_input(user_message)
    
    # 1. Detectar intent principal
    intent = detect_intent(user_message)
    # Valores: generate_skill, create_persona, ask_question, 
    #          execute_task, review_code, debug, research
    
    # 2. Classificar nível cognitivo
    IF contains(["lint", "format", "autocomplete"]) THEN
        level = L1_INSTINCTIVE
    ELSE IF contains(["review", "explain", "refactor"]) THEN
        level = L2_CONTEXTUAL
    ELSE IF contains(["architect", "design", "plan"]) THEN
        level = L3_STRATEGIC
    ELSE IF contains(["generate skill", "create persona", "auto-improve"]) THEN
        level = L4_META_COGNITIVE
    
    # 3. Detectar se é Spec-Kit
    IF starts_with("/speckit.") THEN
        workflow = SPECKIT_WORKFLOW
        command = extract_speckit_command()
    ELSE
        workflow = STANDARD_WORKFLOW
    
    # 4. Estimar complexidade
    complexity = estimate_complexity(user_message)
    # Valores: trivial, simple, moderate, complex, expert
    
    RETURN {
        intent: intent,
        level: level,
        workflow: workflow,
        complexity: complexity,
        requires_research: level >= L3 OR complexity >= "complex",
        requires_approval: intent IN [generate_skill, create_persona]
    }
```

**Critérios de Aceite:**
- [ ] Classifica 100% dos inputs
- [ ] Detecta comandos /speckit.*
- [ ] Estima complexidade corretamente
- [ ] Flag de aprovação humana quando necessário

#### Task 2.2: Master Router v2.0

**Objetivo:** Rotear para persona + skills corretas

**Input:** Classificação do input

**Output:** Contexto carregado para execução

**Arquivo:** `core/master-router.md`

**Algoritmo:**
```
FUNCTION route_request(classification)
    
    # 1. Selecionar persona base
    IF classification.intent == "review_code" THEN
        persona = load_persona("code-reviewer")
    ELSE IF classification.intent == "debug" THEN
        persona = load_persona("debugger")
    ELSE IF classification.intent == "generate_skill" THEN
        persona = load_persona("skill-engineer")
    ELSE
        persona = load_persona("general-assistant")
    
    # 2. Carregar skills relevantes (JIT)
    relevant_skills = search_skills(classification.keywords, top_k=5)
    
    FOR EACH skill IN relevant_skills:
        load_skill_into_context(skill)
    
    # 3. Determinar workflow
    IF classification.workflow == SPECKIT_WORKFLOW THEN
        workflow = load_workflow("speckit/" + classification.command)
    ELSE IF classification.requires_research THEN
        workflow = load_workflow("research-first")
    ELSE
        workflow = load_workflow("standard-execution")
    
    # 4. Montar contexto
    context = {
        persona: persona,
        skills: relevant_skills,
        workflow: workflow,
        memory: load_recent_memory(last_n=5),
        constraints: load_tier_constraints(classification.level)
    }
    
    RETURN context
```

#### Task 2.3: Skill Loader (JIT)

**Objetivo:** Carregar skills sob demanda

**Input:** Lista de keywords ou skill names

**Output:** Skills carregadas no contexto

**Arquivo:** `core/loading-protocol.md`

**Algoritmo:**
```
FUNCTION load_skills_jit(query, top_k=5)
    
    # 1. Buscar no INDEX.md (fast path)
    index_matches = search_index(query)
    
    IF len(index_matches) >= top_k THEN
        RETURN load_skills_from_paths(index_matches[:top_k])
    
    # 2. Fallback: busca semântica (se embeddings disponíveis)
    IF embeddings_available THEN
        semantic_matches = semantic_search(query, top_k)
        RETURN load_skills_from_paths(semantic_matches)
    
    # 3. Fallback final: retornar skills genéricas
    RETURN load_default_skills()

FUNCTION load_skill_into_context(skill_path)
    
    # Carregar apenas core (sem examples)
    skill_content = read_file(skill_path)
    
    # Verificar se já está no contexto
    IF skill_in_context(skill_content.name) THEN
        RETURN  # Skip duplicate
    
    # Adicionar ao contexto de trabalho
    add_to_working_memory(skill_content)
    
    # Registrar no MEMORY.md
    log_skill_usage(skill_content.name)
```

#### Task 2.4: Memory Manager

**Objetivo:** Gerenciar memórias persistentes

**Input:** Eventos do sistema

**Output:** MEMORY.md atualizado

**Arquivo:** `core/memory-manager.md`

**Algoritmo:**
```
STRUCTURE Memory
    last_session: {
        timestamp: DATETIME,
        user_input: STRING,
        classification: OBJECT,
        result: STRING,
        skills_used: LIST[STRING]
    }
    active_goals: LIST[{
        id: STRING,
        description: STRING,
        status: pending | in_progress | completed,
        created_at: DATETIME
    }]
    learned: LIST[{
        id: STRING,
        insight: STRING,
        source: STRING,
        date: DATETIME
    }]
    errors: LIST[{
        id: STRING,
        description: STRING,
        root_cause: STRING,
        resolution: STRING,
        date: DATETIME
    }]

FUNCTION update_memory(event_type, data)
    
    memory = load_memory("MEMORY.md")
    
    SWITCH event_type:
        CASE "session_end":
            memory.last_session = data
        CASE "goal_added":
            memory.active_goals.append(data)
        CASE "goal_completed":
            update_goal_status(data.id, "completed")
        CASE "insight_learned":
            memory.learned.append(data)
        CASE "error_occurred":
            memory.errors.append(data)
    
    save_memory(memory, "MEMORY.md")
    
    # Compactar se muito grande (>100 entries)
    IF memory.size > THRESHOLD THEN
        compact_memory(memory)
```

---

### 6.4 FASE 3: Auto-Increment (Detalhada)

#### Task 3.1: Research Pipeline

**Objetivo:** Pesquisar antes de gerar

**Input:** Tópico para skill/persona

**Output:** Arquivo de pesquisa + fontes

**Arquivo:** `prompts/research.prompt.md`

**Fluxo:**
```
1. RECEBER tópico (ex: "kubernetes")

2. GERAR queries de busca:
   - "{tópico} official documentation"
   - "{tópico} best practices 2026"
   - "{tópico} common mistakes"

3. EXECUTAR web search (3-5 queries)

4. FILTRAR fontes por confiabilidade:
   - T0: Documentação oficial (kubernetes.io)
   - T1: Papers/livros reconhecidos
   - T2: Blogs técnicos respeitados
   - T3: Fórums, StackOverflow

5. EXTRAIR conceitos principais (max 5)

6. COMPILAR em research-{tópico}.md

7. SALVAR em docs/pesquisa-previa/

8. RETORNAR path do arquivo
```

#### Task 3.2: Generation Pipeline

**Objetivo:** Gerar skill/persona a partir de pesquisa

**Input:** Arquivo de pesquisa + template

**Output:** Skill/persona draft

**Arquivo:** `prompts/generation.prompt.md`

**Fluxo:**
```
1. CARREGAR pesquisa prévia

2. CARREGAR template apropriado:
   - skill-template.md para skills
   - persona-template.md para personas

3. PREENCHER seções:
   a. YAML frontmatter (100 tokens)
   b. Quick Reference (50 tokens)
   c. When to Use (100 tokens)
   d. Core Concepts (600-800 tokens)
   e. Best Practices (150 tokens)
   f. Common Pitfalls (150 tokens)
   g. Related Skills (50 tokens)

4. VALIDAR token budget (total < 1400)

5. SALVAR como {name}-DRAFT.md

6. RETORNAR para validação
```

#### Task 3.3: Validation Pipeline

**Objetivo:** Validar artefato antes de aprovação humana

**Input:** Draft de skill/persona

**Output:** Relatório de validação

**Arquivo:** `prompts/validation.prompt.md`

**Checklist de Validação:**
```yaml
validation_checks:
  structural:
    - yaml_valid: "YAML frontmatter parse sem erros"
    - required_fields: "9 campos YAML obrigatórios presentes"
    - sections_complete: "Todas seções obrigatórias presentes"
    - no_placeholders: "Nenhum [AQUI:] ou {placeholder} remanescente"
  
  content:
    - description_quality: "Descrição clara e específica"
    - examples_present: "Pelo menos 1 exemplo de código"
    - pseudocode_valid: "Sintaxe de pseudocódigo correta"
    - best_practices_actionable: "Práticas são acionáveis"
  
  size:
    - token_budget: "Total < 1400 tokens"
    - yaml_budget: "YAML < 100 tokens"
    - concepts_budget: "Core concepts < 800 tokens"
  
  quality:
    - no_fluff: "Sem frases vazias ou óbvias"
    - technical_accuracy: "Informações tecnicamente corretas"
    - sources_cited: "Fontes da pesquisa referenciadas"

output:
  passed: BOOLEAN
  score: 0-100
  issues: LIST[{check, severity, message}]
  suggestions: LIST[STRING]
```

#### Task 3.4: Human Gate Implementation

**Objetivo:** Pausar para aprovação humana

**Input:** Artefato validado + relatório

**Output:** Decisão (approve/edit/reject)

**Fluxo de Interação:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        HUMAN GATE INTERFACE                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  AI: "Gerei uma skill para Kubernetes. Resumo:"                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ SKILL: kubernetes                                                │   │
│  │ CATEGORIA: technology/cloud                                      │   │
│  │ CONCEITOS: Pod, Service, Deployment, ConfigMap, Ingress         │   │
│  │ TOKEN COUNT: 1,287 tokens ✓                                      │   │
│  │ VALIDAÇÃO: 95/100 ✓                                              │   │
│  │                                                                   │   │
│  │ FONTES:                                                          │   │
│  │ • kubernetes.io/docs (oficial) ★★★                               │   │
│  │ • CNCF best practices ★★★                                        │   │
│  │ • learnk8s.io ★★                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ O que você gostaria de fazer?                                    │   │
│  │                                                                   │   │
│  │ • "aprovar" - Salvar skill e indexar                            │   │
│  │ • "ver completo" - Mostrar skill inteira                        │   │
│  │ • "editar X" - Sugerir mudança específica                       │   │
│  │ • "adicionar fonte Y" - Incorporar nova referência              │   │
│  │ • "rejeitar" - Descartar e explicar por quê                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  User: "adicionar StatefulSet nos conceitos, é importante para DBs"    │
│                                                                         │
│  AI: "Boa sugestão! Vou adicionar StatefulSet focando em workloads     │
│       stateful como databases. Regenerando..."                          │
│                                                                         │
│  [Ciclo volta para Generation com feedback incorporado]                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Task 3.5: Commit Pipeline

**Objetivo:** Persistir artefato aprovado

**Input:** Artefato aprovado

**Output:** Arquivos commitados

**Fluxo:**
```
1. MOVER draft para localização final:
   kubernetes-DRAFT.md → skills/technology/cloud/kubernetes.md

2. ATUALIZAR INDEX.md:
   - Adicionar entrada na categoria correta
   - Atualizar contagem total

3. ATUALIZAR MEMORY.md:
   - Registrar skill criada
   - Adicionar timestamp
   - Linkar pesquisa prévia

4. (OPCIONAL) GERAR embeddings:
   - Se vector DB configurado
   - Indexar para busca semântica

5. GIT COMMIT:
   - Mensagem: "feat(skills): add kubernetes skill"
   - Incluir: skill.md, INDEX.md, MEMORY.md

6. CONFIRMAR para usuário:
   - "✓ Skill 'kubernetes' criada e indexada!"
   - "Localização: skills/technology/cloud/kubernetes.md"
```

---

### 6.5 FASE 4: Spec-Kit Integration (Detalhada)

#### Task 4.1: Constitution Sync

**Objetivo:** Sincronizar regras T0 entre sistemas

**Script:** `scripts/sync-constitution.ps1`

**Algoritmo:**
```powershell
# sync-constitution.ps1

param(
    [string]$Direction = "bidirectional"  # promptos-to-speckit | speckit-to-promptos | bidirectional
)

$promptosRules = ".context/standards/architectural-rules.md"
$speckitConstitution = ".specify/memory/constitution.md"

function Sync-ToSpecKit {
    $rules = Parse-ArchitecturalRules $promptosRules
    $constitution = Convert-ToConstitution $rules
    Save-Constitution $speckitConstitution $constitution
}

function Sync-ToPromptOS {
    $constitution = Parse-Constitution $speckitConstitution
    $rules = Convert-ToArchitecturalRules $constitution
    Save-Rules $promptosRules $rules
}

# Mapeamento de formatos
# [T0-SEC-01]: descrição → Principle I: Security - descrição
```

#### Task 4.2: Comandos Spec-Kit

**Objetivo:** Implementar 5 comandos /speckit.*

**Comandos:**
1. `/speckit.constitution` - Criar/atualizar constitution
2. `/speckit.specify` - Gerar SPEC-XXX.md
3. `/speckit.plan` - Gerar plano técnico
4. `/speckit.tasks` - Quebrar em tasks
5. `/speckit.implement` - Executar tasks

**Cada comando segue o padrão:**
```
TRIGGER: /speckit.{command} [args]
DETECT: Input Classifier (categoria 13)
ROUTE: Master Router → Spec Engineer persona
EXECUTE: Workflow específico
GATE: Human approval antes de commit
OUTPUT: Arquivo(s) criado(s)
```

---

### 6.6 FASE 5: Testing & Polish (Detalhada)

#### Test Categories

| Categoria | Quantidade | Foco |
|-----------|------------|------|
| Unit | 30+ | Parsing, validation, routing |
| Integration | 20+ | Pipelines end-to-end |
| E2E | 10+ | Cenários completos |
| Regression | 5+ | Compatibilidade retroativa |

#### E2E Scenarios

1. **Scenario: Generate Skill from Scratch**
   - User: "Preciso de uma skill para GraphQL"
   - Expected: Research → Generation → Validation → Approval → Commit

2. **Scenario: Generate Persona**
   - User: "Crie uma persona de DevOps Engineer"
   - Expected: Similar ao skill, mas com template de persona

3. **Scenario: Spec-Kit Full Flow**
   - User: "/speckit.specify OAuth2 Authentication"
   - Expected: Spec → Plan → Tasks → Implement (com gates)

4. **Scenario: Edit During Approval**
   - User aprova skill mas pede mudança
   - Expected: Regenerar com feedback, novo ciclo de approval

5. **Scenario: Reject and Feedback**
   - User rejeita skill com explicação
   - Expected: Registrar feedback em MEMORY.md, não salvar skill

---

## 7. COMANDOS E FLUXOS

### 7.1 Comandos Conversacionais (PromptOS)

| Frase do Usuário | Intent | Ação |
|------------------|--------|------|
| "Gera uma skill de X" | generate_skill | Pipeline de geração |
| "Preciso de uma persona para Y" | create_persona | Pipeline de persona |
| "Lista as skills de Z" | list_skills | Buscar INDEX.md |
| "Atualiza o INDEX" | sync_index | Regenerar INDEX.md |
| "O que você sabe sobre W?" | query_knowledge | Buscar skills + web |

### 7.2 Comandos Spec-Kit (Formais)

| Comando | Descrição | Output |
|---------|-----------|--------|
| `/speckit.constitution` | Criar regras T0 | `.specify/memory/constitution.md` |
| `/speckit.specify [feature]` | Especificação formal | `docs/specs/SPEC-XXX/spec.md` |
| `/speckit.plan [spec]` | Plano técnico | `docs/specs/SPEC-XXX/plan.md` |
| `/speckit.tasks [spec]` | Tasks implementáveis | `docs/specs/SPEC-XXX/tasks.md` |
| `/speckit.implement [task]` | Implementar task | Código + testes |

### 7.3 Fluxo Típico de Sessão

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXEMPLO DE SESSÃO TÍPICA                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [INÍCIO DA SESSÃO]                                                    │
│                                                                         │
│  AI: "Olá! Sou seu assistente PromptOS v2.0.                           │
│       Última sessão: Trabalhamos em skill de Docker (aprovada).        │
│       Goals ativos: Completar sistema de auth (SPEC-002).              │
│       Como posso ajudar?"                                               │
│                                                                         │
│  User: "Preciso criar uma skill de Kubernetes, é relacionado ao        │
│         Docker que fizemos"                                             │
│                                                                         │
│  AI: "Ótima ideia! Kubernetes complementa Docker para orquestração.    │
│       Vou iniciar o processo:                                          │
│                                                                         │
│       1. 🔍 Pesquisando fontes oficiais...                             │
│       2. 📝 Gerando skill baseado na pesquisa...                       │
│       3. ✓ Validando estrutura..."                                     │
│                                                                         │
│  [Após alguns segundos]                                                 │
│                                                                         │
│  AI: "Skill gerada! Resumo:                                            │
│       - 5 conceitos core: Pod, Service, Deployment, ConfigMap, Ingress │
│       - 4 best practices identificadas                                  │
│       - 3 pitfalls comuns                                              │
│       - 1,287 tokens (dentro do budget)                                │
│                                                                         │
│       Fontes: kubernetes.io (oficial), CNCF docs                       │
│                                                                         │
│       O que você gostaria de fazer?                                    │
│       • aprovar • ver completo • editar • adicionar fonte • rejeitar"  │
│                                                                         │
│  User: "Adiciona Helm como conceito, usamos muito aqui"                │
│                                                                         │
│  AI: "Boa! Adicionando Helm como sexto conceito, focando em            │
│       package management e templating. Regenerando..."                  │
│                                                                         │
│  [Após ajuste]                                                          │
│                                                                         │
│  AI: "Atualizado! Helm adicionado com exemplo de values.yaml.          │
│       Token count: 1,342 (ainda OK).                                   │
│       Aprovar agora?"                                                   │
│                                                                         │
│  User: "Aprova"                                                         │
│                                                                         │
│  AI: "✓ Skill 'kubernetes' criada com sucesso!                         │
│       📁 Localização: skills/technology/cloud/kubernetes.md            │
│       🔗 Relacionada com: docker.md                                    │
│       📊 INDEX.md atualizado                                           │
│       💾 MEMORY.md registrado                                          │
│                                                                         │
│       Próximos passos sugeridos:                                       │
│       - Criar skill de Helm (mais detalhada)?                          │
│       - Voltar para SPEC-002 (auth system)?                            │
│       - Algo mais?"                                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📎 ANEXOS

### A. Checklist de Implementação

```markdown
## FASE 1: Foundation
- [ ] 1.1 Estrutura de diretórios criada
- [ ] 1.2 AGENTS.md v2.0 criado (<5KB)
- [ ] 1.3 MEMORY.md v2.0 criado
- [ ] 1.4 Todos templates criados (8 arquivos)

## FASE 2: Core Engine
- [ ] 2.1 Input Classifier implementado
- [ ] 2.2 Master Router implementado
- [ ] 2.3 Skill Loader (JIT) implementado
- [ ] 2.4 Memory Manager implementado

## FASE 3: Auto-Increment
- [ ] 3.1 Research Pipeline funcional
- [ ] 3.2 Generation Pipeline funcional
- [ ] 3.3 Validation Pipeline funcional
- [ ] 3.4 Human Gate implementado
- [ ] 3.5 Commit Pipeline funcional

## FASE 4: Spec-Kit
- [ ] 4.1 Constitution Sync funcional
- [ ] 4.2 5 comandos /speckit.* implementados
- [ ] 4.3 Workflows integrados

## FASE 5: Testing
- [ ] 5.1 30+ unit tests passando
- [ ] 5.2 20+ integration tests passando
- [ ] 5.3 10+ E2E scenarios passando
- [ ] 5.4 Documentação completa
```

### B. Glossário

| Termo | Definição |
|-------|-----------|
| **JIT Loading** | Just-In-Time: carregar recursos sob demanda |
| **Human Gate** | Ponto de pausa para aprovação humana |
| **CoALA** | Cognitive Architectures for Language Agents |
| **OODA** | Observe-Orient-Decide-Act (ciclo de decisão) |
| **PDCA** | Plan-Do-Check-Act (ciclo de qualidade) |
| **T0/T1/T2** | Níveis de prioridade de regras (T0 = inviolável) |

### C. Referências

1. **CoALA Framework:** arxiv.org/abs/2309.02427
2. **Voyager Skill Library:** github.com/MineDojo/Voyager
3. **LangGraph:** docs.langchain.com/langgraph
4. **MCP Protocol:** modelcontextprotocol.io
5. **DSPy:** dspy.ai

---

**Versão:** 2.0.0 | **Autor:** PromptOS Team | **Data:** 2026-02-02
