# Project Overview - Itzamna PromptOS v2.1.0

> **Versão:** 2.1.0 | **Arquitetura:** Prompt-Based
> **Última Atualização:** 2026-02-03
> **SPEC-010 Status:** ✅ COMPLETE (5 language baselines delivered)
> **Próxima SPEC:** SPEC-003 (Web Research Protocol Enhancement)

---

## Visão Geral

**Itzamna PromptOS** é um sistema operacional cognitivo para programação paralela humano-agente. Diferente de frameworks tradicionais baseados em código, o PromptOS utiliza uma **arquitetura prompt-based** onde AI agents leem arquivos Markdown e seguem as instruções contidas neles.

### Insight Chave

> "PromptOS é um CONJUNTO DE PROMPTS (Markdown) que AI agents LEEM e SEGUEM. Não é código que executa, são instruções que agentes seguem."

---

## Objetivos do Sistema

| Objetivo | Descrição | Status |
|----------|-----------|--------|
| **Prompt-Based** | Instruções em Markdown que qualquer AI lê e segue | ✅ Implementado |
| **Human-in-the-Loop** | Nenhuma modificação persistente sem aprovação humana | ✅ Implementado |
| **Cross-Model** | Funciona com Claude, GPT, Gemini, Cursor, Copilot, etc. | ✅ Implementado |
| **Self-Evolving** | Sistema melhora através de protocolos estruturados | ✅ Implementado |
| **Modular Skills** | Conhecimento composível carregado sob demanda (JIT) | ✅ Implementado |
| **Personas** | Composições de skills que definem comportamentos especializados | ✅ Implementado |

---

## Arquitetura

### Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                    ANY AI AGENT                              │
│        (Claude, GPT, Gemini, Cursor, Copilot, etc.)         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              .prompt-os/PROMPTOS.md                          │
│                   (Entry Point)                              │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│ CONSTITUTION.md  │ │  core/*.md   │ │   skills/*.md    │
│   (T0 Rules)     │ │ (Protocols)  │ │  (Knowledge)     │
└──────────────────┘ └──────────────┘ └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     HUMAN GATE                               │
│            (Aprovação antes de persistir)                    │
└─────────────────────────────────────────────────────────────┘
```

### Componentes Principais

| Componente | Caminho | Função |
|------------|---------|--------|
| Entry Point | `.prompt-os/PROMPTOS.md` | Ponto de entrada para AI agents |
| Constitution | `.prompt-os/CONSTITUTION.md` | Regras T0/T1/T2 |
| Core Protocols | `.prompt-os/core/*.md` | Protocolos comportamentais |
| Skills Library | `skills/` | Biblioteca de conhecimento |
| Personas | `personas/` | Perfis especializados |
| Context | `.context/` | Contexto para assistentes |
| Memory | `MEMORY.md` | Estado persistente |

---

## Status Atual

### Métricas

```yaml
version: 2.1.0
architecture: prompt-based
entry_point: .prompt-os/PROMPTOS.md
core_protocols: 8
skills_total: 23
skills_categories: 8
skills_language_baselines: 5
personas_total: 1
agents_synced: 5
specs_implemented: 6
```

### SPEC-010: Language Skills Baseline (COMPLETE ✅)

**Period:** 2026-02-03  
**Status:** Phase 1 Complete - 5 language baselines delivered

| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| Skills created | 5 | 5 | ✅ 100% |
| Avg Self-Critique score | ≥75 | 99.20 | ✅ +32% above target |
| Rejection rate | <20% | 0% | ✅ Perfect |
| Constitution violations | 0 | 0 | ✅ Perfect |
| Avg time per skill | <60min | 51min | ✅ 15% faster |

**Languages delivered:**
- Java (100/100) - Static typing, JVM, GC, threads
- Kotlin (99/100) - Null safety, coroutines, multiplatform
- C/C++ (99/100) - Manual memory, RAII, compilation (3 JIT sub-files)
- JavaScript (99/100) - Event loop, async/await, npm (1 JIT sub-file)
- Python (99/100) - Duck typing, GIL, asyncio (1 JIT sub-file)

**Innovation:** JIT sub-files pattern - solved token limits while preserving completeness

**Key Learnings from SPEC-010:**
1. ✅ **JIT sub-files pattern proven** - Use for skills >1,400 tokens (score improvements: 94→99)
2. ✅ **Version-agnostic approach** - Avoid version-specific markers ("Language (moderno)" pattern)
3. ✅ **Self-Critique ≥99 = approval** - Perfect correlation (100% first-pass approval rate)
4. ✅ **Zero gaps for baselines** - Comprehensive scope prevents gap triggers
5. ✅ **Consistent structure enhances quality** - Template-driven creation faster (51min avg vs 60min target)

**Reports:**
- `specs/010-language-skills-baseline/reports/self-critique-metrics.md` (99.20 avg score, 0% rejections)
- `specs/010-language-skills-baseline/reports/gap-detection-report.md` (0 gaps - optimal for baselines)
- `specs/010-language-skills-baseline/reports/rejection-analysis-report.md` (0% rejection rate vs <20% target)

### Core Protocols Implementados

| Protocolo | Arquivo | Propósito |
|-----------|---------|-----------|
| Self-Critique | `SELF-CRITIQUE.md` | Avaliação de qualidade (SPEC-001) |
| Auto-Increment | `AUTO-INCREMENT.md` | Detecção de gaps e rejection learning (SPEC-002) |
| Web Research | `WEB-RESEARCH.md` | Metodologia de pesquisa |
| Knowledge Base | `KNOWLEDGE-BASE.md` | Gestão de conhecimento |
| Persona Generator | `PERSONA-GENERATOR.md` | Criação de personas |
| Input Classifier | `INPUT-CLASSIFIER.md` | Classificação de input |
| JIT Protocol | `JIT-PROTOCOL.md` | Carregamento otimizado |
| Human Gate | `HUMAN-GATE.md` | Aprovação humana antes de persistir |

### Agentes Sincronizados

| Agente | Diretório | Status |
|--------|-----------|--------|
| Claude Code | `.claude/` | ✅ Synced |
| Qwen | `.qwen/` | ✅ Synced |
| Gemini CLI | `.gemini/` | ✅ Synced |
| Cursor | `.cursor/` | ✅ Synced |
| OpenCode | `.opencode/` | ✅ Synced |

---

## Filosofia

### Prompts Over Code

| Abordagem Antiga | Abordagem PromptOS |
|------------------|-------------------|
| Código que executa | Prompts que AI segue |
| Depende de runtime | Funciona com qualquer AI |
| Plataforma específica | Universal |
| Debugging complexo | Instruções claras e legíveis |

### Human-in-the-Loop

- Todas as operações L2/L3 requerem aprovação humana
- Preview obrigatório antes de persistir
- Feedback de rejeições é registrado para aprendizado

### Cross-Model Compatibility

O sistema funciona com qualquer AI que consiga:
1. Ler arquivos Markdown
2. Seguir instruções estruturadas
3. Manter contexto entre turnos

---

## Como Usar

### Para AI Agents

```
1. Leia .prompt-os/PROMPTOS.md
2. Siga as instruções de bootstrap
3. Carregue protocolos conforme necessário
4. Respeite o Human Gate para escritas
```

### Para Humanos

```
1. Clone o repositório
2. Aponte seu AI agent para .prompt-os/PROMPTOS.md
3. O sistema guiará o agente automaticamente
```

### Para Desenvolvedores

```
1. Novos protocolos → .prompt-os/core/
2. Novas skills → skills/{categoria}/
3. Novas personas → personas/
4. Atualize MEMORY.md após mudanças significativas
```

---

## Histórico de Versões

| Versão | Data | Mudança Principal |
|--------|------|-------------------|
| 2.1.0 | 2026-02-03 | SPEC-010 complete: 5 language baselines, JIT sub-files innovation |
| 2.0.0 | 2026-02-02 | Arquitetura prompt-based |
| 1.0.0 | 2026-02-02 | Piloto funcional (code-centric) |

---

## Roadmap

### Próximas SPECs

| SPEC | Nome | Status | Prioridade | Dependências |
|------|------|--------|------------|--------------|
| **003** | **Web Research Protocol Enhancement** | **NEXT** | **P1** | SPEC-002 (Auto-Increment) |
| 004 | Vector DB RAG | Planejada | P2 | SPEC-003 |
| 005 | Persona CLI | Planejada | P2 | SPEC-001, SPEC-002 |
| 011 | Advanced Language Skills (Phase 2) | Planejada | P1 | SPEC-010 |

**SPEC-003 Focus:** Enhance WEB-RESEARCH.md protocol with real source validation, citation management, and research quality metrics.

**Expected deliverables:**
- Enhanced `.prompt-os/core/WEB-RESEARCH.md` with source validation rules
- Source citation templates for skills
- Research quality checklist (official docs, recency, authority)
- Integration with Auto-Increment for source gap detection

---

## Referências

- [CoALA](https://arxiv.org/abs/2309.02427) - Cognitive Architectures for Language Agents
- [MCP](https://modelcontextprotocol.io/) - Model Context Protocol
- [Spec-Kit](https://github.com/spec-kit) - Specification-driven development

---

*Itzamna PromptOS v2.1.0 | Project Overview | 2026-02-03*
