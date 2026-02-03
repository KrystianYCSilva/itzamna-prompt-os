# SpecKit Agent Memory

**Agent**: speckit  
**Purpose**: Session logs for gap detection, rejection learning, and pattern analysis  
**Format**: Structured Markdown tables following Auto-Increment Protocol

---

## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-02 | "Help with GraphQL schema design" | graphql-schema-design | pending |
| 2026-02-03 | "GraphQL best practices" | graphql-schema-design | pending |
| 2026-02-06 | "Microservices architecture patterns" | microservices-patterns | rejected |
| 2026-02-07 | "Event-driven architecture" | event-driven-arch | pending |
| 2026-02-09 | "Kafka streaming setup" | kafka-basics | pending |

---

## Gap Pattern Analysis

**graphql-schema-design**: 2 occurrences (2026-02-02, 2026-02-03) → **PROACTIVE SUGGESTION TRIGGERED** ✅

**Acao Proativa**: "Percebi que voce tem perguntado sobre 'graphql-schema-design' algumas vezes (2x). Atualmente, nao temos uma skill dedicada para isso. Gostaria que eu criasse uma skill 'graphql-schema-design'?"

**kafka-basics**: 1 occurrence (overlaps with opencode agent - demonstrating cross-agent pattern)

---

## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-02 | skill | microservices-api | "Exemplo de autenticacao incorreto" | exemplos | Validar exemplos de seguranca com especialista |
| 2026-02-03 | skill | event-sourcing | "Muito generico e abstrato" | especificidade | Adicionar casos de uso concretos |
| 2026-02-04 | skill | cqrs-pattern | "Falta comparacao com alternativas" | completude | Adicionar secao "quando usar vs quando nao usar" |
| 2026-02-05 | skill | saga-pattern | "Diagrama errado" | exemplos | Revisar diagramas antes de Human Gate |
| 2026-02-08 | skill | graphql-mutations | "Muito vago" | especificidade | Detalhar com exemplos step-by-step |
| 2026-02-09 | skill | rest-vs-graphql | "Nao aplicavel" | relevancia | Focar no contexto do projeto |

---

## Padroes Identificados

**Categoria "especificidade"**: 2 ocorrencias de 6 total = 33.33% > 30% ✅ **PADRAO DETECTADO**

**Acao Proativa**: Na proxima skill, enfatizar: "Incluindo casos de uso concretos e step-by-step" + "Detalhamento especifico ao contexto"

---

## Notas de Sessao

- **2026-02-02**: Agent speckit started session logging
- Strong focus on architectural patterns and GraphQL
- **2026-02-08**: Pattern detected: specificity issues in 33% of rejections
- Learned: Always provide concrete use cases and detailed examples
- **2026-02-09**: Cross-agent gap identified: kafka-basics (also requested in opencode)
