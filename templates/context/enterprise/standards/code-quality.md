---
description: |
  Code quality standards, linting rules, and formatting conventions.
  Use when: writing or reviewing code.
---

# Code Quality Standards

## Linting & Formatting

- **Tool:** *(ex: ESLint, Checkstyle, Ruff)*
- **Config:** *(caminho do arquivo de config)*
- **CI Enforcement:** *(sim/nao)*

## Code Review Checklist

- [ ] Segue padrao de nomenclatura do projeto
- [ ] Testes cobrem o codigo novo
- [ ] Sem duplicacao de codigo
- [ ] Sem hardcoded values (usar constantes)
- [ ] Documentacao atualizada
- [ ] Performance considerada

## Complexity Limits

| Metric | Limit | Tool |
|--------|-------|------|
| Cyclomatic Complexity | *(ex: < 10)* | *(ex: SonarQube)* |
| Function Length | *(ex: < 50 lines)* | |
| File Length | *(ex: < 500 lines)* | |

## Forbidden Patterns

*(Liste padroes que NAO devem ser usados neste projeto e por que)*
