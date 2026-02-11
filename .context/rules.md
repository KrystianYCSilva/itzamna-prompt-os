---
description: |
  Project-specific coding rules and standards beyond CONSTITUTION.md.
  Use when: writing or reviewing code for this specific project.
---

# Project Rules & Standards

> Regras específicas DESTE projeto. Regra geral: siga a CONSTITUTION.md e solicite aprovação humana para mudanças significativas.

## Regras do projeto

- Nunca commitar segredos (use .env ou secret manager).
- Mudanças significativas requerem aprovação humana (Human Gate - T0-HUM-01).
- Não executar alterações automáticas que alterem histórico do repositório sem revisão.
- Seguir commits no padrão Conventional Commits (feat/, fix/, chore/).

## Padrões de código

- Linguagem principal: Python — usar typing explícito para APIs públicas.
- Formatação: black + isort; executar pre-commit hooks quando disponíveis.
- Testes: pytest com cobertura mínima recomendada para código novo.
- Documentação: atualize README e .context/ quando decisões alterarem escopo ou arquitetura.

## Decisões arquiteturais (ADRs)

| # | Data | Decisão | Status |
|---|------|---------|--------|
| 1 | 2026-02-11 | Adotar CONSTITUTION.md como fonte de regras e exigir Human Gate para mudanças sensíveis; manter MEMORY.md append-only. | Aceita |

### Notas

- ADRs futuras devem ser adicionadas à tabela acima com data e justificativa curta.
- Para dúvidas sobre regras, consulte CONSTITUTION.md e abra uma issue para discussão.

