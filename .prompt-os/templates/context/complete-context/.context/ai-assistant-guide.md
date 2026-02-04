# AI Assistant Guide — T0 Authority

> **Tier:** T0 (Enforcement) — Fonte de verdade para regras, links e protocolos.
> **Projeto:** {PROJECT_NAME}
> **Atualizado:** {YYYY-MM-DD}
> **Leia SEMPRE antes de qualquer ação.**

---

## Parte Comum (Padrao do PromptOS)

### Bootstrap Basico

1. Leia este arquivo
2. Leia `ITZAMNA-AGENT.md` para workflows (T1)
3. Leia `MEMORY.md` para estado atual

### Tier System

| Tier | Tipo | Autoridade | Prevalece Sobre | Diretorio |
| --- | --- | --- | --- | --- |
| T0 | Enforcement | ABSOLUTA | Todos | `standards/architectural-rules.md` |
| T1 | Standards | NORMATIVA | T2, T3 | `standards/`, `patterns/` |
| T2 | Context | INFORMATIVA | T3 | `_meta/` |
| T3 | Examples | ILUSTRATIVA | Nenhum | `examples/` |

### Regras T0 (Resumo)

- Nunca escrever arquivos sem aprovacao humana
- Nunca quebrar regras de seguranca (secrets, SQL injection, logs sensiveis)
- Sempre seguir o entry point definido em `.prompt-os/PROMPTOS.md`

### Comandos de Sistema

- `#init` e `#ini` inicializam o bootstrap
- `/itzamna.init` inicia o preenchimento de contexto via chat
- `#sync` sincroniza contexto e indices

---

## Parte Especifica do Projeto

### Contexto do Projeto

- Visao geral: `{PROJECT_CONTEXT_OVERVIEW}`
- Stack tecnica: `{PROJECT_STACK}`
- Decisoes arquiteturais: `{PROJECT_ADRS}`

### Documentacao Humana

- Arquitetura consolidada: `{PROJECT_DOCS_ARCHITECTURE}`

### Regras e Padrões Especificos

{PROJECT_EXTRA_RULES}

---

## Definition of Done (Projeto)

- Critérios minimos do projeto devem ser listados aqui
- Exemplo: cobertura, testes, documentação, checklist

---

## Metodologia de Pesquisa

Ver `.prompt-os/core/WEB-RESEARCH.md` e aplique a hierarquia de fontes.
