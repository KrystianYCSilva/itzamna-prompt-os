# BOOTSTRAP - Init de Projeto (via Chat)

> **Versao:** 1.0.0
> **Tipo:** Core Workflow
> **Comandos:** `#init`, `#ini`, `/itzamna.init`

---

## Objetivo

Guiar a inicializacao do contexto de um projeto apos o `init` do CLI.

---

## Pre-condicoes

1. O projeto ja tem `.prompt-os/` e `ITZAMNA-AGENT.md`
2. O contexto foi gerado via templates (`min-context` ou `complete-context`)
3. `MEMORY.md` existe e pode ser atualizado

---

## Fluxo de Execucao

1. Detectar o nivel de contexto
2. Carregar `MEMORY.md` e `.context/README.md`
3. Coletar informacoes minimas do projeto via perguntas objetivas
4. Atualizar os arquivos de contexto com base nas respostas
5. Aplicar Self-Critique e Human Gate antes de escrever
6. Atualizar `MEMORY.md` ao final

---

## Perguntas Base (Minimo)

- Nome do projeto e objetivo principal
- Stack tecnica (backend, frontend, banco, infra)
- Regras T0 especificas do projeto

---

## Perguntas Adicionais (Complete)

- Visao arquitetural e modulos
- Decisoes importantes (ADRs)
- Padroes de qualidade e estrategia de testes
- Workflows e exemplos relevantes

---

## Saida Esperada

- `.context/` preenchido
- `ai-assistant-guide.md` com parte comum + parte especifica do projeto
- `MEMORY.md` atualizado com o estado inicial do projeto

---

## Observacoes

- Nunca escrever arquivos sem aprovacao humana
- Se o contexto for `min-context`, nao crie arquivos de `complete-context`
- Se o bootstrap foi feito com `--context-only` ou `--no-core-copy`, confirme onde o core PromptOS esta referenciado
