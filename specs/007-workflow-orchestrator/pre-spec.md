# SPEC-007: Workflow & Persona Orchestrator

> **Status:** Draft
> **Priority:** P1 (High)
> **Estimated Effort:** 4-6 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-03
> **Depends On:** SPEC-006 (Command Router), INPUT-CLASSIFIER.md, JIT-PROTOCOL.md

---

## 1. Problem Statement

### 1.1 Current State

- O Input Classifier existe, mas a **seleção de personas/skills** nao e explicitamente orquestrada.
- Alguns workflows sao conhecidos (#new, #impl, #docs), mas o **mapeamento para personas/skills** nao esta centralizado.
- O processo de “buscar skills/persona” depende de heuristicas dispersas.

### 1.2 Desired State

- Uma camada de **orquestracao** que seleciona persona + skills de forma consistente.
- Regras declarativas por workflow (ex.: `#impl` → Software Engineer + skills de linguagem/arquitetura/testes).
- Suporte a override manual (ex.: `--persona X`, `--skills A,B`).

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. Definir mapa workflow → persona + skills core.
2. Definir criterios de seleção por linguagem/stack.
3. Integrar com JIT Protocol (2-5 skills).
4. Permitir overrides via comando.
5. Documentar fluxo de escolha para consistencia cross-model.

### 2.2 Non-Goals

- Nao criar novas personas automaticamente.
- Nao carregar todas as skills.
- Nao substituir o Input Classifier (apenas complementar).

---

## 3. Workflow Mapping (MVP)

| Workflow | Persona | Skills Core | Observacoes |
|----------|---------|-------------|-------------|
| `#new` | Product Owner | requirements-gathering, card-templates | CARD-FIRST |
| `#impl` | Software Engineer | stack-skill, clean-code, testing | Detectar linguagem do projeto |
| `#bug` | Debugger | debugging-techniques, error-handling | Priorizar analise raiz |
| `#review` | Code Reviewer | code-quality, security-basics | Foco em T0 violations |
| `#docs` | Technical Writer | technical-writing, markdown | Atualizar referencias |
| `#test` | QA Engineer | software-testing, tdd | Cobertura >= 90% |
| `#arch` | Solutions Architect | system-design, architecture-patterns | Decisoes de alto nivel |

---

## 4. Selection Flow

```
Command Router → Input Classifier → Workflow Mapping → Persona + Skills → JIT Load
```

### 4.1 Skill Selection Rules

- Identificar stack principal (ex.: node/python/java) via `.context/_meta/tech-stack.md`.
- Carregar skill de linguagem correspondente + 1-2 skills de dominio.
- Limitar total de skills entre 2-5.

### 4.2 Overrides

- `--persona <name>` substitui persona default.
- `--skills a,b,c` adiciona skills especificas.

---

## 5. Step-by-Step (MVP)

1. Definir tabela oficial de workflows/personas/skills (documento fonte).
2. Atualizar `.prompt-os/core/INPUT-CLASSIFIER.md` com seção de orquestracao.
3. Atualizar `.prompt-os/core/JIT-PROTOCOL.md` com regras de seleção.
4. Adicionar exemplos de fluxo em `.context/workflows/development-workflows.md`.
5. Validar com 2 workflows reais (impl + review).

---

## 6. Deliverables

- `specs/007-workflow-orchestrator/pre-spec.md`
- Seção “Workflow Orchestrator” no Input Classifier
- Seção “Persona/Skill Selection” no JIT Protocol
- Examples de overrides

---

## 7. Acceptance Criteria

- Workflow sempre define persona + skills core.
- Seleção consistente em 2+ agentes.
- Overrides funcionam sem quebrar JIT.
- Mantém limite de 2-5 skills por tarefa.

---

## 8. References

- docs/add-core/input-classifier.md
- docs/add-core/loading-protocol.md
- .context/_meta/tech-stack.md
