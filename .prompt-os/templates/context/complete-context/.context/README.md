# .context/ - AI Context Hub

> **Projeto:** {PROJECT_NAME}
> **Nivel:** complete-context

---

## Quick Start

1. Leia este arquivo
2. Carregue `ai-assistant-guide.md` (T0)
3. Consulte `_meta/tech-stack.md` e `_meta/project-overview.md`

---

## Estrutura

- `ai-assistant-guide.md` (T0) regras, links e protocolos
- `_meta/` (T2) contexto do projeto
- `standards/` (T0-T1) regras e padroes
- `patterns/` (T1) blueprints arquiteturais
- `examples/` (T3) exemplos
- `workflows/` (T1) fluxos de trabalho
- `troubleshooting/` (T2) problemas comuns

---

## Tier System

| Tier | Tipo | Autoridade | Prevalece Sobre | Diretorio |
| --- | --- | --- | --- | --- |
| T0 | Enforcement | ABSOLUTA | Todos | `standards/architectural-rules.md` |
| T1 | Standards | NORMATIVA | T2, T3 | `standards/`, `patterns/` |
| T2 | Context | INFORMATIVA | T3 | `_meta/` |
| T3 | Examples | ILUSTRATIVA | Nenhum | `examples/` |

---

## Protocolos Core

| Protocolo | Arquivo | Propósito |
|-----------|---------|-----------|
| Self-Critique | `.prompt-os/core/SELF-CRITIQUE.md` | Avaliação de qualidade |
| Auto-Increment | `.prompt-os/core/AUTO-INCREMENT.md` | Detecção de gaps |
| Human Gate | `.prompt-os/core/HUMAN-GATE.md` | Aprovação humana |
| Input Classifier | `.prompt-os/core/INPUT-CLASSIFIER.md` | Classificação de input |
| JIT Protocol | `.prompt-os/core/JIT-PROTOCOL.md` | Carregamento sob demanda |
| Web Research | `.prompt-os/core/WEB-RESEARCH.md` | Metodologia de pesquisa |
| Knowledge Base | `.prompt-os/core/KNOWLEDGE-BASE.md` | Gestão de conhecimento |
| Persona Generator | `.prompt-os/core/PERSONA-GENERATOR.md` | Criação de personas |
| Memory Management | `.prompt-os/core/MEMORY-MANAGEMENT.md` | Gestão de memória |
| Command Router | `.prompt-os/core/COMMAND-ROUTER.md` | Comandos de sistema |
| Bootstrap | `.prompt-os/core/BOOTSTRAP.md` | Inicialização por chat |
| Workflow Orchestrator | `.prompt-os/core/WORKFLOW-ORCHESTRATOR.md` | Workflow → Persona mapping |

---

**Nota:** Para preencher este contexto, use `/itzamna.init`.
