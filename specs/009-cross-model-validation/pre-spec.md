# SPEC-009: Cross-Model Validation & Playbooks

> **Status:** Draft
> **Priority:** P1 (High)
> **Estimated Effort:** 4-6 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-03
> **Depends On:** SPEC-006 (Command Router), SPEC-007 (Orchestrator)

---

## 1. Problem Statement

### 1.1 Current State

- Protocolos core existem, mas **nao ha validacao formal** entre modelos.
- Resultado pode variar entre Claude, Copilot, Gemini, Qwen, etc.
- Falta um **playbook** de testes manuais padronizados.

### 1.2 Desired State

- Um conjunto de **playbooks de validacao** cross-model.
- Checklists para garantir consistencia de output.
- Registro de resultados em MEMORY.md ou docs.

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. Criar playbooks de validacao para workflows principais.
2. Definir criterios de consistencia (output esperado).
3. Registrar resultados e gaps.
4. Garantir compatibilidade cross-model > 90%.

### 2.2 Non-Goals

- Nao automatizar testes com CI agora.
- Nao criar benchmarks complexos.

---

## 3. Playbooks (MVP)

### 3.1 Fluxos obrigatorios

- `#init` (bootstrap)
- `#impl` (code implementation)
- `#docs` (documentation)
- `#review` (code review)

### 3.2 Critérios

- Output segue protocolo Human Gate.
- Seleção correta de persona/skills.
- Self-Critique aplicado antes de persistir.
- Mensagens de erro padronizadas.

---

## 4. Step-by-Step (MVP)

1. Definir checklist por workflow (docs/checklists/).
2. Executar playbook com 2 agentes (ex.: Claude + Copilot).
3. Registrar diferenças e gaps.
4. Ajustar protocolos conforme necessario.

---

## 5. Deliverables

- `specs/009-cross-model-validation/pre-spec.md`
- `docs/checklists/cross-model-validation.md`
- Registro de resultados por agente

---

## 6. Acceptance Criteria

- Playbooks definidos e repetiveis.
- Consistencia >= 90% nos outputs principais.
- Gaps documentados e adicionados ao backlog.

---

## 7. References

- .context/standards/architectural-rules.md
- .prompt-os/core/SELF-CRITIQUE.md
- .prompt-os/core/HUMAN-GATE.md
- https://github.com/github/spec-kit
