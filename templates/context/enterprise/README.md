---
description: |
  Navigation hub for .context/ directory. Entry point for agents.
  Use when: you need to understand what context files exist and when to load each.
---

# .context/ Navigation Hub

> Este diretorio contem o contexto estruturado do projeto.
> Arquivos sao organizados por tiers (T0-T3) conforme sua autoridade.

---

## T2: Project Identity

Informacoes fundamentais sobre o que e este projeto.

- [Project Overview](_meta/project-overview.md) - O que e, por que existe, escopo
- [Tech Stack](_meta/tech-stack.md) - Tecnologias, arquitetura, estrutura
- [Key Decisions](_meta/key-decisions.md) - ADRs (Architecture Decision Records)

---

## T1: Standards (Normative)

Regras e padroes que DEVEM ser seguidos.

- [Architectural Rules](standards/architectural-rules.md) - Regras de arquitetura (T0/T1)
- [Code Quality](standards/code-quality.md) - Padroes de codigo
- [Testing Strategy](standards/testing-strategy.md) - Estrategia de testes

---

## T1: Patterns (Blueprints)

Padroes de design e arquitetura do projeto.

- [Architecture](patterns/architecture.md) - Padroes arquiteturais aplicados

---

## T3: Knowledge (Deep Dives)

Conhecimento de dominio e conceitos complexos.

- [Domain Concepts](knowledge/domain-concepts.md) - Conceitos de negocio

---

## T2: Workflows (Operational)

Guias operacionais e processos.

- [Deployment](workflows/deployment.md) - Processo de deploy

---

## Como usar

Agentes devem:
1. Ler este README para entender o que existe
2. Ler o `description` no frontmatter YAML de cada arquivo para decidir se e relevante
3. Carregar apenas os arquivos necessarios para a tarefa (JIT loading)

Token target: Carregar apenas 2-4 arquivos por tarefa (10-16KB total).
