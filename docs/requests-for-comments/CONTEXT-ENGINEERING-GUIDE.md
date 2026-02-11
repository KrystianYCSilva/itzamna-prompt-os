# Context Engineering — Guia de Implementação para Pair Coding com IAs

> **Versão**: 1.0  
> **Data**: 2025-12-08  
> **Baseado em**: RFC Context Engineering - Estrutura de Documentação otimizada para IAs  
> **Projeto Referência**: conta-commons-lang (Contabilizei)

---

## 📋 Índice

1. [Resumo Executivo](#resumo-executivo)
2. [Context Engineering vs Prompt Engineering](#context-engineering-vs-prompt-engineering)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Tier System — Hierarquia de Precedência](#tier-system--hierarquia-de-precedência)
5. [Arquivos de Bootstrap (Multi-IA)](#arquivos-de-bootstrap-multi-ia)
6. [Guia de Conteúdo por Arquivo](#guia-de-conteúdo-por-arquivo)
7. [Agentes Especializados](#agentes-especializados)
8. [Metodologia de Pesquisa](#metodologia-de-pesquisa)
9. [Definition of Done](#definition-of-done)
10. [Plano de Implementação](#plano-de-implementação)
11. [Templates](#templates)
12. [Checklist de Implementação](#checklist-de-implementação)

---

## Resumo Executivo

### O que é Context Engineering?

**Context Engineering** é uma estrutura autodescritiva de documentação que otimiza a interação de assistentes de IA (GitHub Copilot, Claude, Cursor, ChatGPT, Gemini) com a base de código.

Em vez de fornecer instruções manuais repetitivas (**Prompt Engineering**), cria-se uma estrutura hierárquica onde IAs descobrem automaticamente o contexto relevante (**just-in-time loading**).

### Benefícios

| Benefício | Descrição |
|-----------|-----------|
| **Consistência Arquitetural** | IAs seguem mesmos padrões em todo o codebase |
| **Autodescoberta** | GitHub Copilot lê AGENTS.md automaticamente (zero config) |
| **Rastreabilidade** | ADRs documentam decisões arquiteturais |
| **Escalabilidade** | Padrão replicável para múltiplos projetos |
| **Just-in-time Loading** | Carrega apenas contexto necessário (evita sobrecarga) |
| **Multi-IA** | Suporta Copilot, Claude, Cursor, ChatGPT, Gemini |

### Problemas que Resolve

1. **Fragmentação de Conhecimento** — Centraliza informações arquiteturais
2. **Ambiguidade e Conflitos** — Tier System define precedência
3. **Ineficiência de IAs** — IAs geram código alinhado com padrões
4. **Falta de Rastreabilidade** — ADRs documentam decisões
5. **Inconsistência entre Squads** — Padrão único para todos

---

## Context Engineering vs Prompt Engineering

| Aspecto | Prompt Engineering | Context Engineering |
|---------|-------------------|---------------------|
| **Abordagem** | Manual, repetitivo | Automático, autodescritivo |
| **Instruções** | Per-request | On-demand |
| **Manutenção** | Cada dev repete mesmos prompts | Documentação centralizada |
| **Consistência** | Cada dev passa instruções diferentes | Padrão único |
| **Escalabilidade** | Não escalável | Replicável para múltiplos projetos |

---

## Estrutura de Diretórios

```
project-root/
├── MEMORIA.md                   # 📍 Memória de curto prazo (status atual, última ação)
├── AGENTS.md                    # Bootstrap — Auto-descoberta pelo GitHub Copilot
├── CLAUDE.md                    # Bootstrap — Claude AI
├── .cursorrules                 # Bootstrap — Cursor IDE
├── .cursor/
│   └── rules/
│       └── project-name.mdc    # Regras detalhadas Cursor
│
├── .context/                    # 📁 CONTEXT ENGINEERING (contexto ativo)
│   ├── README.md               # Hub de navegação
│   ├── ai-assistant-guide.md   # Protocolo completo para IAs
│   │
│   ├── _meta/                  # T2: Contexto e Decisões
│   │   ├── project-overview.md # Visão geral do projeto
│   │   └── key-decisions.md    # ADRs consolidados
│   │
│   ├── standards/              # T0-T1: Regras e Padrões
│   │   ├── architectural-rules.md  # T0: ABSOLUTO (enforçável)
│   │   ├── code-quality.md         # T1: SOLID, DRY, KISS
│   │   └── testing-strategy.md     # T1: TDD, cobertura
│   │
│   ├── patterns/               # T1: Blueprints
│   │   └── architectural-overview.md
│   │
│   ├── examples/               # T3: Exemplos
│   │   └── clean-architecture-structure.md
│   │
│   ├── workflows/              # Fluxos de trabalho
│   │   └── development-workflows.md
│   │
│   └── troubleshooting/        # Erros comuns
│       └── common-issues.md
│
├── .agents/                     # 📁 AGENTES ESPECIALIZADOS
│   ├── AGENTS.md               # Prompt de sistema principal
│   ├── bussines-and-kotlin-java-agent.md  # 🎯 Agente principal
│   ├── unit-test-engineer.md
│   ├── code-review-specialist.prompt.md
│   ├── java-spring-boot-gcp-developer.prompt.md
│   ├── kotlin-spring-developer.md
│   ├── software-architect-planner.md
│   ├── task-planner.prompt.md
│   ├── brazilian-payroll-tax-agent.md
│   └── research-plan-for-ai.md
│
├── .github/
│   └── copilot-instructions.md  # Instruções GitHub Copilot
│
├── docs/                        # 📁 ARQUIVO MORTO (documentação consolidada)
│   ├── README.md               # Explicação da pasta
│   ├── decisions/              # ADRs
│   │   ├── ADR-001-*.md
│   │   └── ADR-002-*.md
│   ├── patterns/               # Padrões documentados
│   │   └── *.md
│   ├── pesquisa-previa/        # Pesquisas de negócio
│   │   └── README.md           # Guia de pesquisa para IAs
│   └── plan/                   # Planos de implementação
│       └── _TEMPLATE.md        # Template com checklist
│
├── Memoria.md                   # Memória para IAs (status do projeto)
└── src/                         # Código-fonte
```

---

## Tier System — Hierarquia de Precedência

O Tier System define a hierarquia de autoridade para resolver conflitos de documentação:

| Tier | Tipo | Autoridade | Quando Prevalece | Diretório |
|------|------|------------|------------------|-----------|
| **T0** | Enforcement | ABSOLUTA | SEMPRE — Regras enforçáveis | `standards/architectural-rules.md` |
| **T1** | Standards | NORMATIVA | Sobre T2, T3 — Padrões recomendados | `standards/`, `patterns/` |
| **T2** | Context | INFORMATIVA | Sobre T3 — Decisões e histórico | `_meta/` |
| **T3** | Examples | ILUSTRATIVA | Nunca sobrepõe — Apenas referência | `examples/` |

### Exemplo de Resolução de Conflito

```
Conflito: Exemplo (T3) mostra setters públicos, regra T0 os proíbe
Resolução: T0 vence — "Conforme architectural-rules.md regra IMM-01: 
           Documentos são imutáveis (No setters públicos)"
```

### Lógica de Precedência

```
IF T0 conflita com qualquer tier → T0 VENCE
IF T1 conflita com T2 ou T3 → T1 VENCE
IF T2 conflita com T3 → T2 VENCE
ALWAYS cite a regra específica na resposta
```

---

## Arquivos de Bootstrap (Multi-IA)

### MEMORIA.md — Memória de Curto Prazo

**Propósito**: Manter IAs consistentes entre sessões.

**Conteúdo obrigatório:**
- Status atual (versão, status do projeto)
- Última sessão (o que foi feito)
- Próximos passos (o que falta fazer)
- Quick reference de padrões críticos
- Instruções para IA

**Regra para IAs:**
```
1. SEMPRE leia MEMORIA.md PRIMEIRO
2. SEMPRE atualize MEMORIA.md ao final da sessão
3. NUNCA implemente sem verificar o status atual
```

**Template mínimo:**
```markdown
# MEMORIA.md — [Nome do Projeto]

## 🎯 STATUS ATUAL
| Campo | Valor |
|-------|-------|
| **Versão** | vX.Y.Z |
| **Status** | ✅ Pronta / 🟡 Em andamento / 🔴 Bloqueado |
| **Última Ação** | [Descrição] |

## 📍 ONDE ESTAMOS
[O que foi feito na última sessão]

## 📋 PRÓXIMOS PASSOS
- [ ] Tarefa 1
- [ ] Tarefa 2

## ⚠️ INSTRUÇÕES PARA IA
1. SEMPRE leia este arquivo primeiro
2. SEMPRE atualize ao final da sessão
```

### Arquitetura de Carregamento

```
Copilot/Claude/Cursor → MEMORIA.md → Bootstrap file → ai-assistant-guide.md
ChatGPT/Gemini → MEMORIA.md → ai-assistant-guide.md (direto)
```

### AGENTS.md (GitHub Copilot)

**Propósito**: Auto-descoberta — Copilot lê automaticamente (zero config)

```markdown
# GitHub Copilot - Context Engineering Setup

> **Auto-descoberta**: Este arquivo é lido automaticamente pelo GitHub Copilot.

---

**CRITICAL**: Before generating code, load:
👉 `/.context/ai-assistant-guide.md`

---

## Essential Context Pointers (Tier System)

| Tier | Autoridade | Arquivo |
|------|------------|---------|
| **T0** | ABSOLUTA | `/.context/standards/architectural-rules.md` |
| **T1** | NORMATIVA | `/.context/standards/code-quality.md` |
| **T1** | NORMATIVA | `/.context/standards/testing-strategy.md` |
| **T2** | INFORMATIVA | `/.context/_meta/key-decisions.md` |
| **T3** | ILUSTRATIVA | `/.context/examples/` |

---

## 🎯 Agente Principal

👉 **`bussines-and-kotlin-java-agent`** — **CONSULTAR PRIMEIRO** para dúvidas de negócio ou técnicas

---

## Quick Rules (T0)

```java
// Exemplo de regras T0 do seu projeto
```

---

*Context Engineering v1.0*
```

### CLAUDE.md (Claude AI)

**Propósito**: Bootstrap para Claude AI

```markdown
# Claude AI — Context Engineering Setup

**CRITICAL**: Before generating code, load:
👉 `/.context/ai-assistant-guide.md`

## 🎯 Agente Principal
👉 **`bussines-and-kotlin-java-agent`** — CONSULTAR PRIMEIRO

## Essential Pointers
| Tier | File | Purpose |
|------|------|---------|
| T0 | `/.context/standards/architectural-rules.md` | MUST follow |
| T1 | `/.context/standards/code-quality.md` | SOLID, Clean Code |
| T2 | `/.context/_meta/key-decisions.md` | ADRs |

*Context Engineering v1.0*
```

### .cursorrules (Cursor IDE)

**Propósito**: Bootstrap para Cursor IDE

```markdown
# Cursor IDE Rules — [project-name]

Load `/.context/ai-assistant-guide.md` before generating code.

## 🎯 Agente Principal
👉 **`bussines-and-kotlin-java-agent`** — CONSULTAR PRIMEIRO

## Mandatory Rules (T0)
- [Lista de regras T0 do projeto]

## Testing
- Line coverage ≥ 90%
- Branch coverage ≥ 80%
- 1 test class per implementation class

## References
- Standards: `/.context/standards/`
- ADRs: `/.context/_meta/key-decisions.md`
```

---

## Guia de Conteúdo por Arquivo

### 1. `.context/README.md` — Hub de Navegação

**Conteúdo obrigatório:**
- Quick Start para IAs (3 passos)
- Estrutura de diretórios
- Tier System (tabela)
- Links rápidos
- Referência ao agente principal

### 2. `.context/ai-assistant-guide.md` — Protocolo Completo

**Conteúdo obrigatório:**
- Bootstrap Sequence
- Request Classification (tabela: tipo → arquivos a carregar)
- Tier System com lógica de precedência
- Regras T0 — Quick Reference (tabela com IDs)
- Definition of Done (cobertura mínima)
- Available Agents (tabela com quando usar)
- Metodologia de Pesquisa (hierarquia de fontes)
- Manutenção de Documentação (onde salvar cada tipo)
- Links úteis

### 3. `.context/standards/architectural-rules.md` — Regras T0

**Formato:**
```markdown
# Architectural Rules — T0 (Enforcement)

> **Tier**: T0 — ABSOLUTO. SEMPRE seguir estas regras.

---

## [CATEGORIA]-[ID]: Nome da Regra

**Regra**: Descrição clara do que DEVE ou NÃO DEVE fazer.

```java
// ✅ CORRETO
[código correto]

// ❌ PROIBIDO
[código proibido]
```

---
```

**Categorias sugeridas:**
- `EQ-XX`: Equals/HashCode
- `SER-XX`: Serialização
- `SAN-XX`: Sanitização
- `LOC-XX`: Locale/i18n
- `FMT-XX`: Formatação
- `DOC-XX`: Documentação
- `VAL-XX`: Validação
- `IMM-XX`: Imutabilidade
- `DEP-XX`: Dependências
- `TST-XX`: Testes

### 4. `.context/_meta/key-decisions.md` — ADRs

**Formato:**
```markdown
# Key Decisions — Architectural Decision Records

## Índice de ADRs
| ID | Título | Status | Data |
|----|--------|--------|------|
| ADR-001 | ... | ✅ Aceito | YYYY-MM-DD |

---

## ADR-001: Título

**Status:** Proposta | Aceito | Rejeitado | Substituído
**Data:** YYYY-MM-DD
**Documentação completa:** `docs/decisions/ADR-001-*.md`

### Contexto
[Problema/necessidade]

### Decisão
[O que foi decidido]

### Consequências
- ✅ Positivo: ...
- ⚠️ Negativo: ...
```

### 5. `docs/README.md` — Arquivo Morto

**Conteúdo obrigatório:**
- Aviso para IAs: "arquivo morto", consultar `/.context/` primeiro
- Estrutura de subpastas
- Quando usar cada pasta
- Formato de ADR
- Formato de Plano

### 6. `docs/pesquisa-previa/README.md` — Guia de Pesquisa

**Conteúdo obrigatório:**
- Aviso crítico (contexto do negócio)
- Metodologia de pesquisa (fluxo)
- Hierarquia de fontes (Tier 1-4 + Proibidas)
- Template de documentação de pesquisa
- Checklist de validação de fonte
- Como referenciar no código
- Procedimento para informação não-encontrada

---

## Agentes Especializados

### Estrutura da Pasta `.agents/`

```
.agents/
├── AGENTS.md                    # Prompt de sistema principal (contexto geral)
├── bussines-and-kotlin-java-agent.md  # 🎯 PRINCIPAL — Negócio + Técnico
├── unit-test-engineer.md
├── code-review-specialist.prompt.md
├── java-spring-boot-gcp-developer.prompt.md
├── kotlin-spring-developer.md
├── software-architect-planner.md
├── task-planner.prompt.md
├── brazilian-payroll-tax-agent.md
└── research-plan-for-ai.md
```

### Tabela de Agentes

| Agente | Quando Usar |
|--------|-------------|
| `bussines-and-kotlin-java-agent` | **PRINCIPAL** — Dúvidas de negócio ou técnicas (Java/Kotlin) |
| `unit-test-engineer` | Escrever/melhorar testes, aumentar cobertura |
| `code-review-specialist` | Review de qualidade, design, segurança |
| `java-spring-boot-gcp-developer` | Backend Java + Spring + GCP |
| `kotlin-spring-developer` | Kotlin + Spring Boot features |
| `software-architect-planner` | Planejamento estratégico, refatorações |
| `task-planner` | Quebrar tarefas complexas em planos |
| `brazilian-payroll-tax-agent` | eSocial, DCTFWeb, EFD-Reinf, ISS |
| `research-plan-for-ai` | Pesquisa em documentação oficial |

### Como Definir Agente Principal

Em **TODOS** os arquivos de bootstrap, adicionar:

```markdown
## 🎯 Agente Principal

👉 **`[nome-do-agente]`** — **CONSULTAR PRIMEIRO** para dúvidas de [contexto]
```

---

## Metodologia de Pesquisa

### Hierarquia de Fontes

| Tier | Tipo | Exemplos | Uso |
|------|------|----------|-----|
| **1** | Oficiais | gov.br, docs oficiais, repositório da lib | SEMPRE usar primeiro |
| **2** | Acadêmicas | Capes, SciELO, IEEE, Elsevier | Artigos científicos |
| **3** | Blogs consolidados | Baeldung, StackOverflow, W3Schools | Suplementar |
| **4** | Fóruns | Reddit | ÚLTIMO RECURSO |
| **❌** | **PROIBIDO** | Blogs pessoais, redes sociais, textos sem referência | NUNCA usar |

### Regras de Pesquisa

```
✅ SEMPRE trazer referência (URL + data de acesso)
✅ SEMPRE validar com fonte oficial quando possível
✅ SEMPRE documentar em docs/pesquisa-previa/
✅ SEMPRE citar fonte no código (Javadoc) para regras de negócio
❌ NUNCA usar fontes não-verificáveis
❌ NUNCA implementar baseado em suposições
⚠️ Rigor acadêmico/profissional é OBRIGATÓRIO
```

### Citação no Código

```java
/**
 * Calcula [algoritmo] conforme [referência].
 * 
 * @see <a href="[URL]">[Nome da Fonte]</a>
 */
public void metodo() { ... }
```

---

## Definition of Done

Uma tarefa é considerada **PRONTA** quando:

| Métrica | Mínimo |
|---------|--------|
| **Line Coverage** | ≥ 90% |
| **Branch Coverage** | ≥ 80% |
| **Convenção 1:1** | 1 classe de teste por 1 classe implementada |
| **Documentação** | Atualizada (se aplicável) |

### Convenções de Teste

```
ClasseImplementada.java → ClasseImplementadaTest.java
```

---

## Plano de Implementação

### Fase 1: MVP — Fundação Crítica (Semana 1)

**Tempo estimado**: ~14 horas

| Tarefa | Tempo | Descrição |
|--------|-------|-----------|
| Criar estrutura `.context/` | 2h | Pastas e arquivos base |
| Escrever AGENTS.md | 4h | Bootstrap + regras T0 críticas |
| Criar ai-assistant-guide.md | 2h | Protocolo completo |
| Documentar regras T0 | 4h | architectural-rules.md |
| Criar 1-2 ADRs | 2h | Decisões críticas |

### Fase 2: Expansão Incremental (Semanas 2-3)

**Abordagem**: Documentação on-demand

- Quando surgir necessidade, dev + IA documentam
- Crescimento orgânico baseado em demanda real
- Tempo: 20-30 horas distribuídas

### Fase 3: Manutenção Contínua

**Tempo**: 5-10 horas/mês

- Criação de ADRs (~30min/ADR com IA)
- Auditoria trimestral de consistência
- Atualizações incrementais

---

## Templates

### Template: ADR

```markdown
# ADR-XXX: [Título]

**Status:** Proposta | Aceito | Rejeitado | Substituído
**Data:** YYYY-MM-DD

## Contexto
[Descrição do problema/necessidade]

## Decisão
[O que foi decidido]

## Consequências

### Positivas
- ...

### Negativas
- ...

## Alternativas Consideradas
1. [Alternativa 1] — Por que rejeitada
2. [Alternativa 2] — Por que rejeitada

## Referências
- [Link]
```

### Template: Plano de Implementação

```markdown
# Plano: [Nome do Plano]

**Versão alvo:** vX.Y.Z
**Status:** 🟡 Em andamento | 🟢 Concluído | 🔴 Bloqueado
**Data de criação:** YYYY-MM-DD

---

## 📋 Objetivo
[Descrição do objetivo]

## ✅ Checklist

### Fase 1: [Nome]
- [ ] Tarefa 1.1
- [ ] Tarefa 1.2

### Fase 2: [Nome]
- [ ] Tarefa 2.1

### Fase 3: Testes
- [ ] Cobertura ≥90%
- [ ] Code review

## 📊 Progresso
| Fase | Status | Progresso |
|------|--------|-----------|
| Fase 1 | 🟡 | 2/5 |
| Fase 2 | ⚪ | 0/3 |

---
*Última atualização: YYYY-MM-DD*
```

### Template: Pesquisa

```markdown
# Pesquisa: [Título]

**Data:** YYYY-MM-DD
**Status:** ✅ Validado | ⚠️ Pendente | ❌ Rejeitado

## Objetivo
[O que precisa ser descoberto]

## Resumo Executivo
[3-5 linhas com principais descobertas]

## Fontes Consultadas

### Tier 1 (Oficiais)
1. [Título] - [URL] - Acessado em: YYYY-MM-DD

### Tier 2 (Acadêmicas)
1. [Título] - [URL] - Acessado em: YYYY-MM-DD

## Descobertas
[Informações com citação]

## Implicações para Implementação
[Como afeta o código]

## Perguntas em Aberto
[Pontos que precisam validação humana]
```

---

## Checklist de Implementação

### Preparação

- [ ] Definir regras T0 do projeto
- [ ] Identificar agente principal
- [ ] Listar ADRs existentes ou necessárias
- [ ] Definir métricas de cobertura

### Estrutura Base

- [ ] Criar pasta `.context/`
- [ ] Criar pasta `.agents/`
- [ ] Criar `docs/` com subpastas
- [ ] Criar `Memoria.md` (opcional)

### Arquivos de Bootstrap

- [ ] `AGENTS.md` (GitHub Copilot)
- [ ] `CLAUDE.md` (Claude)
- [ ] `.cursorrules` (Cursor)
- [ ] `.github/copilot-instructions.md`

### Context Engineering

- [ ] `.context/README.md`
- [ ] `.context/ai-assistant-guide.md`
- [ ] `.context/standards/architectural-rules.md`
- [ ] `.context/standards/code-quality.md`
- [ ] `.context/standards/testing-strategy.md`
- [ ] `.context/patterns/architectural-overview.md`
- [ ] `.context/examples/clean-architecture-structure.md`
- [ ] `.context/workflows/development-workflows.md`
- [ ] `.context/troubleshooting/common-issues.md`
- [ ] `.context/_meta/project-overview.md`
- [ ] `.context/_meta/key-decisions.md`

### Documentação

- [ ] `docs/README.md`
- [ ] `docs/pesquisa-previa/README.md`
- [ ] `docs/plan/_TEMPLATE.md`
- [ ] ADRs iniciais em `docs/decisions/`

### Validação

- [ ] Testar com GitHub Copilot
- [ ] Testar com Claude
- [ ] Testar com Cursor
- [ ] Verificar auto-descoberta funciona
- [ ] Validar que IA segue regras T0

---

## Referências

### Links Úteis

| Recurso | URL |
|---------|-----|
| Design Patterns (PT-BR) | https://refactoring.guru/pt-br/design-patterns |
| Spring Framework | https://spring.io/ |
| Baeldung (Java/Spring) | https://www.baeldung.com/ |
| Kotlin Documentation | https://kotlinlang.org/docs/home.html |
| Maven Repository | https://mvnrepository.com/ |
| Oracle Java Docs | https://docs.oracle.com/en/java/ |

### Fontes Oficiais Brasileiras

| Recurso | URL |
|---------|-----|
| Portal Gov.br | https://www.gov.br/ |
| Receita Federal | https://www.gov.br/receitafederal/ |
| eSocial | https://www.gov.br/esocial/ |
| SPED | http://sped.rfb.gov.br/ |
| Planalto (Legislação) | https://www.planalto.gov.br/ |

### Acadêmicas

| Recurso | URL |
|---------|-----|
| Portal Capes | https://www.periodicos.capes.gov.br/ |
| SciELO | https://www.scielo.br/ |
| Google Scholar | https://scholar.google.com/ |

---

## Critérios de Sucesso

### Métricas Qualitativas

- [ ] IAs sugerem código mais alinhado com padrões
- [ ] Redução em discussões sobre "qual padrão seguir"
- [ ] Onboarding mais rápido para novos devs

### Métricas Quantitativas (pós-implementação)

- Tempo até primeiro MR aprovado
- Comentários de correção arquitetural em MRs
- Análise de código via scanning

### Critério de Rejeição

Se após 3 meses não houver melhoria observável, reavaliar abordagem.

---

## Versionamento

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 2025-12-08 | Versão inicial baseada na RFC e implementação conta-commons-lang |

---

*Context Engineering v1.0 — Guia de Implementação*
*Baseado em: RFC Context Engineering + Implementação conta-commons-lang*

