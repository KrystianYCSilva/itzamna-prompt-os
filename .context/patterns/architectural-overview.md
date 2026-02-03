# Architectural Overview - T1 (Blueprints)

> **Tier**: T1 - Blueprints. Estes padrões arquiteturais devem ser seguidos em novas implementações.
> **Versão:** 2.1.0 | **Arquitetura:** Prompt-Based

## Visão Geral da Arquitetura

### Insight Chave (v2.1.0)

```
PromptOS = PROMPTS (Markdown) que AI agents LEEM e SEGUEM
         ≠ Código que executa

Entry Point: .prompt-os/PROMPTOS.md
Protocols: .prompt-os/core/*.md (8 protocolos)
Knowledge: skills/*.md (17 skills)
```

### Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                     ANY AI AGENT                             │
│        (Claude, GPT, Gemini, Cursor, Copilot, etc.)         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              .prompt-os/PROMPTOS.md                          │
│                   (ENTRY POINT)                              │
│      "Leia este arquivo PRIMEIRO ao iniciar sessão"          │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│ CONSTITUTION.md  │ │  core/*.md   │ │   skills/*.md    │
│   (T0 Rules)     │ │ (Protocols)  │ │  (Knowledge)     │
│   7 princípios   │ │ 8 protocolos │ │  17 skills       │
└──────────────────┘ └──────────────┘ └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     HUMAN GATE                               │
│            (Aprovação antes de persistir)                    │
│        approve | view | edit | reject | cancel               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     MEMORY.md                                │
│               (Estado persistente)                           │
└─────────────────────────────────────────────────────────────┘
```

### Componentes Principais (v2.1.0)

```
┌─────────────────────────────────────────────────────────────┐
│                    Itzamna PromptOS v2.1.0                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   .prompt-os/   │  │    skills/      │  │  personas/  │ │
│  │                 │  │                 │  │             │ │
│  │ • PROMPTOS.md   │  │ • INDEX.md      │  │ • INDEX.md  │ │
│  │ • CONSTITUTION  │  │ • {categoria}/  │  │ • {nome}/   │ │
│  │ • core/*.md     │  │ • SKILL.md      │  │ • PERSONA.md│ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Root Files     │  │   .context/     │  │  Agents     │ │
│  │                 │  │                 │  │             │ │
│  │ • AGENTS.md     │  │ • README.md     │  │ • .claude/  │ │
│  │ • MEMORY.md     │  │ • _meta/        │  │ • .cursor/  │ │
│  │ • CLAUDE.md     │  │ • standards/    │  │ • .qwen/    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Padrões Arquiteturais

### 1. Prompt-Based Architecture (CORE)
**Objetivo**: Sistema funciona via instruções Markdown, não código executável.

**Princípio v2.1.0**:
```
O sistema são PROMPTS que AI agents LEEM e SEGUEM.
Não há código que precisa executar para funcionar.
Todos os protocolos estão integrados e se referenciam mutuamente.
```

**Características**:
- Entry point: `.prompt-os/PROMPTOS.md`
- Protocolos: `.prompt-os/core/*.md`
- Universal: funciona com qualquer AI que leia Markdown
- Sem dependências de runtime

**Implementação**:
- AI agent lê `PROMPTOS.md` → segue instruções
- Carrega `CONSTITUTION.md` → aprende regras T0/T1/T2
- Carrega protocolos JIT conforme necessidade

### 2. Kernel Leve (Lightweight Kernel)
**Objetivo**: Manter o núcleo do sistema pequeno e focado nas regras fundamentais.

**Características**:
- Entry point (PROMPTOS.md) < 3KB
- Constitution (CONSTITUTION.md) < 10KB
- Contém apenas instruções fundamentais
- Carregado automaticamente por todos os agentes

**Implementação**:
- Instruções fundamentais em PROMPTOS.md
- Regras T0/T1/T2 em CONSTITUTION.md
- Extensões em core/*.md (protocolos)
- Skills carregadas JIT conforme necessário

### 3. Human-in-the-Loop (Human Gate)
**Objetivo**: Garantir controle humano sobre operações de persistência.

**Características**:
- Aprovação obrigatória para operações L2/L3
- Pré-visualização antes de persistência
- Registro de decisões de aprovação/rejeição
- Workflow explícito de gate humano
- Integração com Self-Critique (v2.1.0)

**Implementação**:
- Fase 5 do pipeline de geração (Human Gate)
- Comandos: approve, view, edit, reject, cancel
- Definido em CONSTITUTION.md (T0-HUMAN-01)
- Recebe e exibe resultados do Self-Critique

**Fluxo**:
```
1. AI gera artefato
2. AI executa Self-Critique
3. AI MOSTRA preview + score + sugestões ao usuário
4. AGUARDA decisão: approve | reject | edit
5. SE aprovado: persiste e atualiza MEMORY.md
6. SE rejeitado: registra motivo para aprendizado
```

### 4. JIT Protocol (Carregamento Just-In-Time)
**Objetivo**: Carregar contexto sob demanda para economizar tokens.

**Características**:
- Skills organizadas por categorias
- Carregamento dinâmico baseado em necessidade
- Tamanho limitado (< 1400 tokens por skill)
- Target: 10-16KB por tarefa

**Níveis de Carregamento**:
```
Nível 1 - Kernel (SEMPRE): ~3KB
├── CONSTITUTION.md
└── MEMORY.md

Nível 2 - Core (SE NECESSÁRIO): ~4KB
├── INPUT-CLASSIFIER.md
└── Persona ativa

Nível 3 - Skills (JIT): 2-5 skills
├── Apenas relevantes
└── ~2KB cada
```

**Implementação**:
- Protocolo: `.prompt-os/core/JIT-PROTOCOL.md`
- Classificador: `.prompt-os/core/INPUT-CLASSIFIER.md`
- Índice: `skills/INDEX.md`

### 5. Skills Composíveis
**Objetivo**: Conhecimento modular reutilizável.

**Características**:
- Skills organizadas por categorias (7 categorias, 17 skills)
- Cada skill < 1400 tokens
- YAML frontmatter para metadados
- Exemplos obrigatórios (mínimo 2)

**Estrutura**:
```
skills/
├── INDEX.md
├── frontend/    # HTML, CSS
├── backend/     # API, TypeScript, GraphQL
├── config/      # YAML, JSON, Properties
├── markup/      # XML, XSLT, Markdown
├── devops/      # Docker, Git
├── docs/        # Technical Writing
└── testing/     # Test skills
```

### 6. Personas Especializadas
**Objetivo**: Perfis de especialistas compostos por múltiplas skills.

**Características**:
- Composição de múltiplas skills
- Definição de domínio de expertise
- Perfil de comportamento específico

**Implementação**:
- Estrutura: `personas/{nome}/PERSONA.md`
- Índice: `personas/INDEX.md`
- Referência a skills compostas
- Gerador: `.prompt-os/core/PERSONA-GENERATOR.md`

## Pipeline de Geração (6 Fases)

### Fluxo Completo
```
TRIGGER: Pedido do usuário OU gap detection
    |
PHASE 1: CLASSIFY (INPUT-CLASSIFIER.md)
    - Detectar tipo (skill/persona/code)
    - Detectar domínio (programming, devops, etc.)
    - Determinar nível cognitivo (L1/L2/L3)
    |
PHASE 2: RESEARCH (WEB-RESEARCH.md, KNOWLEDGE-BASE.md)
    - Buscar skills existentes
    - Encontrar padrões e antipadrões
    - Compilar fontes confiáveis
    |
PHASE 3: GENERATE
    - Carregar template canônico
    - Preencher com conteúdo pesquisado
    - Adicionar YAML frontmatter
    |
PHASE 4: SELF-CRITIQUE (SELF-CRITIQUE.md)
    - Avaliar qualidade (score 0-100)
    - Gerar sugestões de melhoria
    - SE score < 70: melhorar antes de continuar
    |
+==============================+
|  PHASE 5: HUMAN GATE         |
|  * Mostrar preview + score   |
|  * Aguardar: approve/reject  |
|  * SE reject → registrar     |
+==============================+
    |
PHASE 6: COMMIT (após aprovação)
    - Salvar arquivo
    - Atualizar INDEX.md
    - Registrar em MEMORY.md
```

### Níveis Cognitivos

| Nível | Tempo | Exemplos | Auto-Approve? |
|-------|-------|----------|---------------|
| L1 | 100ms-2s | Formatação, lint, boilerplate | Sim |
| L2 | 10-60s | Criação de skill, código | Não |
| L3 | 5-15min | Arquitetura, planejamento | Não |

## Protocolos Core (v2.1.0)

### 8 Protocolos Implementados

| Protocolo | Arquivo | Propósito |
|-----------|---------|-----------|
| Self-Critique | `SELF-CRITIQUE.md` | Avaliação de qualidade |
| Auto-Increment | `AUTO-INCREMENT.md` | Detecção de gaps |
| Web Research | `WEB-RESEARCH.md` | Metodologia de pesquisa |
| Knowledge Base | `KNOWLEDGE-BASE.md` | Gestão de conhecimento |
| Persona Generator | `PERSONA-GENERATOR.md` | Criação de personas |
| Input Classifier | `INPUT-CLASSIFIER.md` | Classificação de input |
| JIT Protocol | `JIT-PROTOCOL.md` | Carregamento otimizado |
| Human Gate | `HUMAN-GATE.md` | Aprovação humana (v2.1.0) |

### Como Protocolos Funcionam

```
AI Agent lê protocolo → Entende instruções → Segue comportamento

Exemplo:
1. AI recebe: "Crie uma skill de Docker"
2. AI lê: INPUT-CLASSIFIER.md
3. AI classifica: tipo=skill, domínio=devops, nível=L2
4. AI lê: KNOWLEDGE-BASE.md, WEB-RESEARCH.md
5. AI pesquisa e gera
6. AI lê: SELF-CRITIQUE.md
7. AI avalia qualidade
8. AI lê: HUMAN-GATE.md
9. AI apresenta para aprovação humana
```

## Padrões de Integração

### 1. Multi-Agent Bootstrap
**Objetivo**: Suportar múltiplos AI agents com configurações específicas.

**Bootstrap Files**:
| Agent | Bootstrap | Como Usa |
|-------|-----------|----------|
| Claude Code | `CLAUDE.md` | Lê PROMPTOS.md |
| Cursor | `.cursorrules` | Lê .context/ |
| GitHub Copilot | `AGENTS.md` | Lê AGENTS.md |
| Gemini | `.gemini/` | Lê PROMPTOS.md |
| Qwen | `.qwen/` | Lê PROMPTOS.md |

### 2. Enhanced Protocol Integration (v2.1.0)
**Objetivo**: Garantir que todos os protocolos se referenciem mutuamente e funcionem em conjunto.

**Características (v2.1.0)**:
- Self-Critique se integra com Human Gate
- Human Gate exibe resultados do Self-Critique
- JIT Protocol referencia Input Classifier
- Knowledge Base referencia outras skills

**Implementação**:
- Protocolos se referenciam mutuamente
- Resultados de um alimentam o próximo
- Informações compartilhadas entre protocolos

### 3. Spec-Kit Integration
**Objetivo**: Especificações formais para funcionalidades complexas (>5 dias).

**Quando Usar**:
- Esforço estimado > 5 dias OU funcionalidade crítica
- Funcionalidade crítica
- Múltiplos componentes envolvidos

**Implementação**:
- Diretório `.specify/` para specs
- Arquivo `.specify/memory/constitution.md`

## Sistema de Memória (CoALA)

### 4 Tipos de Memória

| Tipo | Função | Localização |
|------|--------|-------------|
| **Working** | Contexto da sessão (~16K tokens) | Context window |
| **Episodic** | Histórico de interações | `MEMORY.md` |
| **Semantic** | Base de conhecimento | `skills/`, `docs/` |
| **Procedural** | Biblioteca de skills | `skills/INDEX.md` |

### Gestão de Estado

```
MEMORY.md
├── Last Updated
├── Current State (projeto, status)
├── Recent Actions (ações recentes)
├── Episodic Memory (histórico)
├── Statistics (métricas)
└── Next Steps (próximos passos)
```

## Tier System

### Hierarquia de Precedência

| Tier | Tipo | Autoridade | Arquivos |
|------|------|------------|----------|
| **T0** | Enforcement | ABSOLUTA | `CONSTITUTION.md`, `architectural-rules.md` |
| **T1** | Standards | NORMATIVA | `code-quality.md`, `patterns/` |
| **T2** | Context | INFORMATIVA | `_meta/`, `workflows/` |
| **T3** | Examples | ILUSTRATIVA | `examples/`, `skills/` |

### Resolução de Conflitos

```
T0 > T1 > T2 > T3

SE T0 conflita com qualquer tier → T0 VENCE
SE T1 conflita com T2 ou T3 → T1 VENCE
SEMPRE citar regra específica (ID) na resposta
```

---

*Itzamna PromptOS v2.1.0 | Architectural Overview | T1 Blueprints | 2026-02-03*