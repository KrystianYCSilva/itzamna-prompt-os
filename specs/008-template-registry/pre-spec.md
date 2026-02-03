# SPEC-008: Template & Prompt Registry

> **Status:** Draft
> **Priority:** P1 (High)
> **Estimated Effort:** 3-5 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-03
> **Depends On:** SPEC-006 (Command Router)

---

## 1. Problem Statement

### 1.1 Current State

- Templates existem em `.prompt-os/templates/`, mas nao ha um **registry** ou index padronizado.
- Falta um processo claro para **selecionar templates** por tipo de artefato (skill, persona, docs, cards).
- Usuarios precisam descobrir manualmente onde estao os templates.

### 1.2 Desired State

- Um **Template Registry** (index) com metadados e lookup.
- Comandos para listar/selecionar templates via chat (`#template list`, `#template use X`).
- Padrao de storage e naming.

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. Criar index de templates (nome, tipo, path, uso).
2. Definir processo de selecao via chat.
3. Padronizar naming e estrutura.
4. Permitir extensoes futuras.

### 2.2 Non-Goals

- Nao criar engine de rendering complexa.
- Nao substituir templates existentes.

---

## 3. Registry Design

### 3.1 Estrutura Proposta

```
.prompt-os/templates/
├── INDEX.md
├── SKILL.template.md
├── PERSONA.template.md
├── CARD.template.md
└── DOC.template.md
```

### 3.2 Exemplo de INDEX.md

| Template | Tipo | Uso | Path |
|----------|------|-----|------|
| skill | skill | Geracao de skills | .prompt-os/templates/SKILL.template.md |
| persona | persona | Geracao de personas | .prompt-os/templates/PERSONA.template.md |
| card | card | Nova feature (CARD) | .prompt-os/templates/CARD.template.md |
| doc | doc | Documentacao tecnica | .prompt-os/templates/DOC.template.md |

---

## 4. Chat Commands (MVP)

- `#template list`
- `#template use <name>`
- `#template search <keyword>`

---

## 5. Step-by-Step (MVP)

1. Criar/atualizar `.prompt-os/templates/INDEX.md`.
2. Documentar naming e uso no README + ITZAMNA-AGENT.md.
3. Integrar com Command Router (SPEC-006).
4. Adicionar exemplos em docs/add-core/.

---

## 6. Deliverables

- `specs/008-template-registry/pre-spec.md`
- `.prompt-os/templates/INDEX.md` atualizado
- Docs de comando `#template`

---

## 7. Acceptance Criteria

- Templates listaveis via indice.
- Processo claro para escolher template correto.
- Referenciado em ITZAMNA-AGENT.md e README.

---

## 8. References

- .prompt-os/templates/SKILL.template.md
- .prompt-os/templates/PERSONA.template.md
- docs/add-core/master-router.md
