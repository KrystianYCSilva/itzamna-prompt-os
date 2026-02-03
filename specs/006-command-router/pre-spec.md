# SPEC-006: Command Router & Chat Grammar

> **Status:** Draft
> **Priority:** P0 (Critical)
> **Estimated Effort:** 4-6 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-03
> **Depends On:** SPEC-001 (Self-Critique), SPEC-002 (Auto-Increment), .prompt-os/core/INPUT-CLASSIFIER.md

---

## 1. Problem Statement

### 1.1 Current State

- PromptOS possui protocolos core e workflows definidos, mas **nao existe um grammar formal** para comandos via chat.
- Agentes interpretam comandos de forma ad-hoc (ex.: `#new`, `#impl`, `#docs`).
- Falta um **router central** para comandos (init/add/sync/update) e flags (`--here`, `--ia`).

### 1.2 Desired State

- Um **grammar de comandos** padronizado e documentado.
- Um **Command Router** que classifica comandos e dispara o workflow correto.
- Mensagens de erro e ajuda consistentes.
- Compatibilidade cross-model (Claude, Copilot, Gemini, etc.).

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. Definir grammar para comandos (ex.: `#init --here --ia {agente}`).
2. Mapear comandos → workflows/personas/skills.
3. Estabelecer regras de parsing e validação.
4. Criar respostas padronizadas (help/usage/errors).
5. Integrar com Input Classifier e JIT Protocol.

### 2.2 Non-Goals

- Nao implementar runtime/CLI obrigatorio.
- Nao criar parser complexo fora de Markdown.
- Nao substituir os protocolos core existentes.

---

## 3. Proposed Command Grammar

### 3.1 Formato Base

```
#<command> [subcommand] [args...] [--flags]
```

### 3.2 Comandos Principais (MVP)

| Comando | Exemplo | Objetivo |
|---------|---------|----------|
| `#init` | `#init --here --ia copilot` | Inicializar contexto do projeto na sessao |
| `#add` | `#add agent qwen` | Adicionar agente/config bootstrap |
| `#sync` | `#sync context` / `#sync agents` | Sincronizar arquivos de contexto/agents |
| `#update` | `#update v2.1.0` | Atualizar versao/referencias |
| `#impl` | `#impl CARD-001` | Implementar card/spec existente |
| `#docs` | `#docs update` | Atualizar documentacao |

### 3.3 Flags Padrao

| Flag | Funcao |
|------|--------|
| `--here` | Usar diretorio atual como root |
| `--ia {agent}` | Definir agente alvo (copilot, gemini, qwen, claude, cursor) |
| `--dry-run` | Simular sem persistir |
| `--help` | Mostrar ajuda |

---

## 4. Workflow Integration

### 4.1 Router Flow

```
Input (chat) → Command Router → Input Classifier → Workflow → JIT Protocol → Human Gate
```

### 4.2 Routing Rules

- `#init` → bootstrap workflow (carregar ITZAMNA-AGENT.md, PROMPTOS.md, CONSTITUTION.md, MEMORY.md)
- `#add` → agent bootstrap workflow
- `#sync` → sync workflow (context/agents)
- `#update` → version/update workflow
- `#impl/#docs/#test/#review` → workflows existentes do Input Classifier

---

## 5. Step-by-Step (MVP)

1. Definir grammar e comandos suportados (tabela + exemplos).
2. Criar seção `Command Router` em `.prompt-os/core/INPUT-CLASSIFIER.md` ou novo protocolo `COMMAND-ROUTER.md`.
3. Documentar respostas padronizadas (help/errors) em `.context/workflows/development-workflows.md`.
4. Adicionar exemplos de uso em `docs/add-core/master-router.md`.
5. Validar com 2+ agentes (Claude + Copilot).

---

## 6. Deliverables

- `specs/006-command-router/pre-spec.md`
- Protocolo `COMMAND-ROUTER.md` (novo ou integrado)
- Documentacao de comandos e exemplos de chat
- Casos de teste de parsing (manual)

---

## 7. Acceptance Criteria

- Comandos definidos com exemplos claros.
- Router identifica corretamente comando e workflow.
- Erros de parsing retornam help padronizado.
- Funciona em pelo menos 2 agentes (cross-model).

---

## 8. References

- https://github.com/github/spec-kit (workflow/command patterns)
- docs/add-core/master-router.md
- .prompt-os/core/INPUT-CLASSIFIER.md
