# RFC: Estrutura de Documentação otimizada para Context Engineering com IA

> **Issue**: Closed  
> **Criado**: 1 mês atrás por Luca Fenris Elert

---

## Status da RFC

| Campo | Valor |
|-------|-------|
| **Status** | ✅ Aprovada |
| **Data de Criação** | 15/10/2025 |
| **Data limite para revisão** | 23/10/2025 |
| **Data de aprovação ou rejeição** | 23/10/2025 |
| **Autor(es)** | Leonardo Assumpção, Luca Fenris Elert, Eduardo Souza e Maurício Pelissari |

---

## Resumo Executivo

Esta RFC propõe a adoção de **Context Engineering**, uma estrutura autodescritiva de documentação que otimiza a interação de assistentes de IA (GitHub Copilot, Claude, Cursor, ChatGPT) com a base de código. Em vez de fornecer instruções manuais repetitivas (Prompt Engineering), cria-se uma estrutura hierárquica onde IAs descobrem automaticamente o contexto relevante (just-in-time loading).

### Context Engineering vs Prompt Engineering

| Aspecto | Prompt Engineering | Context Engineering |
|---------|-------------------|---------------------|
| **Abordagem** | Manual, repetitivo, per-request | Automático, autodescritivo, on-demand |
| **Exemplo** | Copiar instruções arquiteturais para cada prompt | GitHub Copilot lê AGENTS.md automaticamente |

### Benefícios Principais

- **Consistência arquitetural** — IAs seguem mesmos padrões
- **Autodescoberta** — GitHub Copilot sem configuração
- **Rastreabilidade de decisões** — ADRs documentam histórico
- **Escalabilidade** — Para novos devs e novas IAs
- **Carregamento just-in-time** — Evita sobrecarga

### Alinhamento Estratégico

Posiciona a empresa para escalar desenvolvimento assistido por IA, reduzindo dependência de "prompt experts" e democratizando acesso a padrões arquiteturais.

> ⚠️ **IMPORTANTE**: Esta RFC é baseada em observações qualitativas, NÃO em dados mensuráveis reais. Não temos medições baseline nem dados científicos validando eficácia. Impactos são descritos qualitativamente sem percentuais. Implementação é aposta calculada, não decisão baseada em dados. Validação posterior via GitLab Analytics.

---

## Problema a ser Resolvido

O time de desenvolvimento enfrenta **cinco problemas principais** relacionados à organização e acesso ao conhecimento arquitetural:

### 1. Fragmentação de Conhecimento

Informações arquiteturais espalhadas em READMEs isolados, Outline, código-fonte, Google Chat e conhecimento tácito dos seniores. Devs gastam tempo procurando justificativas de padrões em múltiplas fontes, às vezes sem sucesso.

### 2. Ambiguidade e Conflitos de Informação

Documentação arquitetural no Outline contradiz código legado, causando dúvidas sobre o padrão correto. Discussões em MRs sobre "qual fonte seguir", delays em aprovações.

### 3. Ineficiência de Assistentes de IA

IAs geram código que viola padrões arquiteturais (ex: lógica no Controller, Hibernate no Domain Layer), exigindo refatoração manual. Retrabalho pós-geração, correções em MRs, inconsistências no codebase.

### 4. Falta de Rastreabilidade de Decisões

O desconhecimento das razões técnicas para decisões arquiteturais críticas (como a escolha do RabbitMQ) é uma consequência comum da falta de documentação. Sem essa rastreabilidade, a manutenção futura torna-se mais difícil e o risco de refatorações desnecessárias aumenta.

### 5. Inconsistência Arquitetural Entre Squads

Times interpretam padrões arquiteturais de formas diferentes (ex: 3 padrões distintos para validações). Dificuldade de rotação entre squads, código heterogêneo, aumenta curva de aprendizado.

### Impacto no Negócio

- Tempo de contextualização elevado
- Violações de padrões detectadas tardiamente em MRs
- Onboarding lento
- Conhecimento não escalável para novas IAs

---

## Proposta de Solução e Desenhos Arquiteturais

### Estrutura de Diretórios

```
project-root/
├── AGENTS.md                    # Auto-descoberta pelo GitHub Copilot
├── .context/
│   ├── README.md                   # Hub de navegação
│   ├── ai-assistant-guide.md       # Protocolo completo para IAs
│   ├── _meta/                      # T2: Contexto e Decisões
│   │   ├── project-overview.md
│   │   └── key-decisions.md        # ADRs (Architectural Decision Records)
│   ├── standards/                  # T0-T1: Regras e Padrões
│   │   ├── architectural-rules.md  # T0: ABSOLUTO (enforçável)
│   │   ├── code-quality.md         # T1: SOLID, DRY, KISS
│   │   └── testing-strategy.md     # T1: TDD
│   ├── patterns/                   # T1: Blueprints
│   │   └── architectural-overview.md
│   ├── examples/                   # T3: Exemplos
│   │   └── clean-architecture-structure.md
│   ├── workflows/                  # Fluxos de trabalho
│   │   └── development-workflows.md
│   └── troubleshooting/            # Erros comuns para IA evitar
│       └── common-issues.md
```

### Tier System (Sistema de Precedência)

Hierarquia de autoridade para resolver conflitos de documentação:

| Tier | Tipo | Autoridade | Quando Prevalece |
|------|------|------------|------------------|
| **T0** | Enforcement | ABSOLUTA | SEMPRE — Regras enforçáveis via linting |
| **T1** | Standards | NORMATIVA | Sobre T2, T3 — Padrões recomendados fortemente |
| **T2** | Context | INFORMATIVA | Sobre T3 apenas — Decisões e histórico |
| **T3** | Examples | ILUSTRATIVA | Nunca sobrepõe — Apenas referência |

#### Exemplo de Resolução de Conflito

```
Conflito: Exemplo (T3) mostra setters públicos, regra T0 os proíbe
Resolução: T0 vence — "Conforme architectural-rules.md regra DDD-ENT-03: 
           Entidades DDD devem ser imutáveis após construção (No setters públicos)"
```

---

## Componentes

### 1. AGENTS.md (Bootstrap/Auto-Descoberta)

- **GitHub Copilot lê automaticamente** (zero configuração para devs)
- **Arquivo leve** (50-100 linhas): Ponteiro para documentação completa
- **Propósito**: Redirecionar Copilot para carregar protocolo completo

#### Exemplo Mínimo

```markdown
# GitHub Copilot - Context Engineering Setup

**CRITICAL**: Before generating code, read the comprehensive guide:
👉 `/.context/ai-assistant-guide.md`

## Essential Context Pointers
- Standards (T0): `/.context/standards/architectural-rules.md` - MUST follow
- Decisions (T2): `/.context/_meta/key-decisions.md` - ADRs
- Patterns (T1): `/.context/patterns/` - Recommended blueprints
- Examples (T3): `/.context/examples/` - Exemplos de código
```

### 2. ai-assistant-guide.md (Protocolo de Navegação e Workflow)

- **Arquivo de protocolo** (~400-450 linhas): Define COMO trabalhar com a documentação
- **Propósito**: Navigation hub e workflow para TODOS os assistentes de IA

#### Conteúdo

| Seção | Descrição |
|-------|-----------|
| Bootstrap Sequence | 3 passos: README → guide → aguardar request |
| Request Classification | Tabela de mapeamento (request type → qual arquivo carregar) |
| Tier System | Hierarquia de precedência (T0>T1>T2>T3) |
| Just-in-time loading | Princípio de carregar mínimo necessário |
| Session Management | Como criar session plans para tasks >30min |
| Response Structure | Formato padronizado (Analysis → Recommendation → Rationale → Steps) |

**Papel**: Aponta para onde as regras reais estão (`/standards/`, `/patterns/`, `/_meta/`)

### 3. standards/architectural-rules.md (T0 - Enforçável)

- **Contém as regras reais**: Não apenas resumo, mas especificação completa
- **Regras com IDs rastreáveis** (CA-DIR-01, DDD-ENT-03, etc.)
- **Especifica qual camada afeta** (Domain, Application, Infrastructure)
- **Como verificar** (análise estática, linting, testes)

### 4. _meta/key-decisions.md (ADRs - Tier 2)

- **Registro histórico** de decisões arquiteturais
- **IAs citam ADRs** ao gerar código (contexto histórico)
- **Formato**: Context, Decision, Status, Consequences

> 📍 **Importante**: `ai-assistant-guide.md` NÃO contém as regras em si — ele é um protocolo de navegação que ensina IA COMO buscar as regras nos arquivos apropriados (`/standards/`, `/patterns/`, `/_meta/`)

### 5. Integração Multi-IA

| IA | Bootstrap | Protocolo |
|----|-----------|-----------|
| GitHub Copilot | `AGENTS.md` | → `ai-assistant-guide.md` |
| Claude | `CLAUDE.md` | → `ai-assistant-guide.md` |
| Cursor IDE | `.cursor/rules` | → `ai-assistant-guide.md` |
| ChatGPT/Gemini | (direto) | `ai-assistant-guide.md` |

#### Arquitetura de Carregamento

```
Copilot/Claude/Cursor → Bootstrap file (50-100 linhas) → ai-assistant-guide.md (completo)
ChatGPT/Gemini → ai-assistant-guide.md (direto)
```

---

## Fluxo de Dados

```
Developer cria feature
    ↓
GitHub Copilot carrega AGENTS.md automaticamente (bootstrap - 50 linhas)
    ↓
AGENTS.md redireciona → ai-assistant-guide.md (protocolo completo)
    ↓
IA carrega just-in-time: standards/architectural-rules.md (T0) + ADRs (T2)
    ↓
IA gera código seguindo regras T0 (Clean Architecture, DDD)
    ↓
Dev faz MR → CI/CD executa linting (valida T0)
    ↓
Reviewer valida arquitetura (referencia ADRs em _meta/)
    ↓
Merge → Sucesso (código alinhado desde início)
```

### Vantagens da Arquitetura Bootstrap

| Vantagem | Descrição |
|----------|-----------|
| ⚡ Auto-descoberta rápida | Copilot carrega arquivo pequeno |
| 📦 Lazy loading | Protocolo completo carregado sob demanda |
| 🔄 Single source of truth | `ai-assistant-guide.md` |
| 🌐 Multi-IA | Cada IA tem seu bootstrap, todos apontam para mesmo protocolo |

---

## Impacto na Performance e Escalabilidade

### Performance

| Aspecto | Impacto |
|---------|---------|
| **Carregamento de Contexto** | Just-in-time loading (5-10 arquivos por request vs todos os arquivos) |
| **Latência de Resposta de IA** | Redução esperada no tempo de geração (IA carrega apenas contexto relevante) |
| **Throughput de Desenvolvimento** | Menos iterações de refatoração (código correto desde primeira geração) |

### Escalabilidade

| Aspecto | Impacto |
|---------|---------|
| **Escalabilidade Organizacional** | Estrutura replicável para múltiplos projetos (mesma convenção) |
| **Escalabilidade de Time** | Onboarding de novos devs acelerado (documentação centralizada) |
| **Escalabilidade de IAs** | Adicionar nova IA = criar protocolo específico (ex: `GEMINI.md`) |

#### Exemplo de Escalabilidade

```
Squad Billing (6 devs) → .context/ com 15 arquivos
Squad ERP (3 devs) → .context/ com 12 arquivos (mesma estrutura, conteúdo específico)
Squad Aquisição (5 devs) → .context/ com 18 arquivos (mesma estrutura, conteúdo específico)

= Padrão único, contextos específicos
```

---

## Análise de Custo (Financeiro e Técnico)

### Custos Diretos

#### Implementação Fase 1 (MVP - Semana 1): ~14 horas de engenharia (vs 80h sem IA)

| Tarefa | Tempo | Descrição |
|--------|-------|-----------|
| Criar estrutura `.context/` básica | 2h | IA gera estrutura e templates |
| Escrever AGENTS.md com 5-10 regras T0 | 4h | IA analisa codebase, sugere regras |
| Criar ai-assistant-guide.md básico | 2h | IA gera protocolo inicial |
| Documentar 3-5 regras arquiteturais | 4h | IA extrai regras do código |
| Criar 1-2 ADRs críticos | 2h | IA sugere ADRs |

#### Implementação Fase 2 (Expansão - Semanas 2-3): ~20-30 horas distribuídas

- Documentação on-demand conforme necessidade
- Dev + IA documentam padrões sob demanda

#### Implementação Fase 3 (Contínuo): 5-10 horas/mês

- Manutenção (~30min/ADR com IA)
- Auditoria trimestral (2h com relatório de IA)

### Custos Indiretos

| Custo | Descrição |
|-------|-----------|
| **Curva de Aprendizado** | Devs precisam entender Tier System e convenções (1-2 dias iniciais) |
| **Manutenção** | Documentação precisa ser mantida atualizada (disciplina do time) |
| **Tooling** | Integração de linting para T0 (já existente em projetos modernos) |

### Retorno Esperado (Qualitativo)

| Retorno | Descrição |
|---------|-----------|
| **Redução de Retrabalho** | Menos correções arquiteturais pós-merge (código correto desde início) |
| **Onboarding Acelerado** | Novos devs ganham contexto arquitetural mais rapidamente |
| **Consistência Arquitetural** | Convergência para padrões únicos entre squads |
| **Democratização de Conhecimento** | Padrões acessíveis para todos, não apenas seniores |

> **Nota**: Valores quantitativos dependem de medições pós-implementação (GitLab Analytics).

---

## Alternativas Consideradas

### Alternativa 1: Status Quo (Prompt Engineering)

**Descrição**: Continuar com abordagem atual onde devs fornecem instruções manuais às IAs.

| Prós | Contras |
|------|---------|
| Zero custo de implementação | Repetitivo e não escalável |
| Flexibilidade total | Inconsistência entre devs |
| | Conhecimento não centralizado |

**Por que rejeitada**: Não resolve problemas de fragmentação, ambiguidade e inconsistência entre squads.

### Alternativa 2: Instructions Files (.copilot, .cursorrules, etc.)

**Descrição**: Usar apenas instruction files raiz (`.copilot`, `.cursorrules`) sem estrutura hierárquica.

| Prós | Contras |
|------|---------|
| Simples de implementar (1 arquivo) | Sem hierarquia de precedência |
| GitHub Copilot e Cursor suportam nativamente | Sem rastreabilidade (não há ADRs) |
| | Difícil de escalar (1 arquivo monolítico) |
| | Não serve outras IAs sem adaptação |

**Por que rejeitada**: Resolve autodescoberta mas não resolve ambiguidade, rastreabilidade nem escalabilidade.

### Alternativa 3: Context Engineering (Proposta) ✅

**Descrição**: Estrutura hierárquica autodescritiva com Tier System, ADRs e integração multi-IA.

| Prós | Contras |
|------|---------|
| Resolve ambiguidade (Tier System) | Custo inicial de setup (~14h) |
| Rastreabilidade (ADRs) | Requer disciplina de manutenção |
| Escalabilidade organizacional | Curva de aprendizado inicial (1-2 dias) |
| Multi-IA (Copilot, Claude, ChatGPT, Cursor) | |
| Just-in-time loading (eficiência) | |

**Por que selecionada**: Única alternativa que resolve todos os cinco problemas identificados de forma estruturada e escalável.

---

## Plano de Implementação

### Fase 1: MVP - Fundação Crítica (Semana 1)

**Objetivo**: Implementar estrutura básica funcional que demonstre valor imediato.

#### Tarefas

1. Criar estrutura `.context/` básica (2h — IA gera estrutura e templates)
2. Escrever AGENTS.md com 5-10 regras T0 (4h — IA analisa codebase, sugere regras)
3. Criar ai-assistant-guide.md básico (2h — IA gera protocolo inicial)
4. Documentar 3-5 regras arquiteturais em `standards/` (4h — IA extrai regras do código)
5. Criar 1-2 ADRs críticos em `_meta/key-decisions.md` (2h — IA sugere ADRs)

#### Critérios de Sucesso

- [ ] GitHub Copilot aplicando regras T0 automaticamente
- [ ] Time vê valor imediato (ex: Copilot sugere código alinhado com Clean Architecture)
- [ ] Estrutura navegável e compreensível

**Tempo Total Fase 1**: ~14 horas (vs 2 semanas sem IA)

### Fase 2: Expansão Incremental (Semanas 2-3)

**Objetivo**: Documentar padrões adicionais conforme necessidade (on-demand).

#### Abordagem

- Documentação under demand (quando surgir necessidade, dev + IA documentam)
- Exemplo: Dev precisa implementar retry pattern → documenta em `patterns/resilience-patterns.md` com auxílio de IA
- Crescimento orgânico baseado em demanda real

**Tempo**: 20-30 horas distribuídas conforme demanda

### Fase 3: Adoção e Refinamento (Contínuo)

**Objetivo**: Manter documentação atualizada e refinar processos.

#### Manutenção

- Criação de ADRs (~30min/ADR com IA)
- Auditoria trimestral de consistência (2h com relatório de IA)
- Atualizações incrementais conforme evolução arquitetural

**Tempo**: 5-10 horas/mês (sustentável)

### Timeline Realista

| Período | Fase | Resultado |
|---------|------|-----------|
| Semana 1 | MVP funcional | Valor imediato |
| Semanas 2-3 | Expansão on-demand | Crescimento orgânico |
| Contínuo | Manutenção 5-10h/mês | Sustentável |

---

## Informações Complementares

### Multi-Repository Support

- Estrutura replicável para múltiplos projetos
- Convenções únicas, contextos específicos
- Exemplo: Squad Billing, Squad ERP, Squad Aquisição compartilham mesma estrutura `.context/`, conteúdos diferentes

### Possível Integração com CI/CD (Pipeline)

- Linting de regras T0 em pipeline (ex: ArchUnit, SonarQube)
- Validação automática de violações arquiteturais
- Falha de build se T0 violado

### Compatibilidade de IAs

| Status | IAs |
|--------|-----|
| **Testado** | GitHub Copilot (nativo via AGENTS.md) |
| **Compatível** | Claude, ChatGPT, Cursor, Gemini (via protocolo em ai-assistant-guide.md) |
| **Extensível** | Adicionar nova IA = criar protocolo específico (ex: GEMINI.md) |

---

## Critérios de Sucesso

### Métricas Qualitativas (Observáveis)

- [ ] Devs reportam que GitHub Copilot sugere código mais alinhado com padrões arquiteturais
- [ ] Redução em discussões sobre "qual padrão seguir" em MRs
- [ ] Onboarding de novos devs com menor necessidade de explicações ad-hoc sobre arquitetura

### Métricas Quantitativas (GitLab Analytics - Pós-Implementação)

| Métrica | Descrição |
|---------|-----------|
| **Onboarding** | Tempo até primeiro MR aprovado seguindo padrões (baseline vs pós-implementação) |
| **Code Review** | Comentários em MRs solicitando correções arquiteturais (ex: "mover lógica para Application Layer") |
| **Consistência** | Análise de código via scanning (detecção de implementações divergentes do padrão) |

### Critério de Rejeição

Se após 3 meses não houver melhoria observável em nenhuma métrica acima, reavaliar abordagem ou reverter.

---

## Referências

- [CONTEXT-ENGINEERING-GUIDE.md](./CONTEXT-ENGINEERING-GUIDE.md) — Guia de implementação prático
- [Guia de Pesquisa para IAs](./pesquisa-previa/README.md) — Metodologia de pesquisa

---

*RFC aprovada em 23/10/2025*
*Implementação de referência: conta-commons-lang*

