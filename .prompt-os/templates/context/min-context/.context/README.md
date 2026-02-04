# .context/ - AI Context Hub

> **Projeto:** {PROJECT_NAME}
> **Nivel:** min-context

---

## Quick Start

1. Leia este arquivo
2. Carregue `standards/architectural-rules.md` (T0)
3. Consulte `_meta/tech-stack.md` para contexto do projeto

---

## Estrutura Minima

- `_meta/` (T2) contexto do projeto
- `standards/` (T0) regras inviolaveis

---

## Tier System

| Tier | Tipo | Autoridade | Prevalece Sobre | Diretorio |
| --- | --- | --- | --- | --- |
| T0 | Enforcement | ABSOLUTA | Todos | `standards/architectural-rules.md` |
| T1 | Standards | NORMATIVA | T2, T3 | `standards/` |
| T2 | Context | INFORMATIVA | T3 | `_meta/` |
| T3 | Examples | ILUSTRATIVA | Nenhum | `examples/` |

---

**Nota:** Para inicializar o contexto completo, use `/itzamna.init`.
