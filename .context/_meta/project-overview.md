# Project Overview - Itzamna PromptOS v2.0.0

> **Versão:** 2.0.0 | **Arquitetura:** Prompt-Based
> **Última Atualização:** 2026-02-02

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
version: 2.0.0
architecture: prompt-based
entry_point: .prompt-os/PROMPTOS.md
core_protocols: 7
skills_total: 17
skills_categories: 7
personas_total: 1
agents_synced: 5
specs_implemented: 5
```

### Core Protocols Implementados

| Protocolo | Arquivo | Propósito |
|-----------|---------|-----------|
| Self-Critique | `SELF-CRITIQUE.md` | Avaliação de qualidade |
| Auto-Increment | `AUTO-INCREMENT.md` | Detecção de gaps |
| Web Research | `WEB-RESEARCH.md` | Metodologia de pesquisa |
| Knowledge Base | `KNOWLEDGE-BASE.md` | Gestão de conhecimento |
| Persona Generator | `PERSONA-GENERATOR.md` | Criação de personas |
| Input Classifier | `INPUT-CLASSIFIER.md` | Classificação de input |
| JIT Protocol | `JIT-PROTOCOL.md` | Carregamento otimizado |

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
| 2.0.0 | 2026-02-02 | Arquitetura prompt-based |
| 1.0.0 | 2026-02-02 | Piloto funcional (code-centric) |

---

## Referências

- [CoALA](https://arxiv.org/abs/2309.02427) - Cognitive Architectures for Language Agents
- [MCP](https://modelcontextprotocol.io/) - Model Context Protocol
- [Spec-Kit](https://github.com/spec-kit) - Specification-driven development

---

*Itzamna PromptOS v2.0.0 | Project Overview | 2026-02-02*
