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

**Nota:** Para preencher este contexto, use `/itzamna.init`.
