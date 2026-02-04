# ITZAMNA-AGENT.md — T1 Workflows & Memory

> **Tier**: T1 | **Leia T0 primeiro**: `.context/ai-assistant-guide.md`
> **Versão**: 2.3.0-dev | **Atualizado**: 2026-02-04
> Arquitetura Prompt-Based | Cross-Model (Claude, GPT, Gemini, Cursor, Copilot, Qwen)

---

## Antes de Tudo

```
1. LER: .context/ai-assistant-guide.md   ← T0 (regras, links, protocolo)
2. LER: MEMORY.md                        ← Estado atual do projeto
3. Carregar JIT conforme a tarefa         ← Apenas o necessário (2-5 skills)
```

---

## Estado Atual (snapshot — consulte MEMORY.md para dados vivos)

| Métrica | Valor |
|---------|-------|
| Versão | 2.3.0-dev |
| Skills | 13 (6 baselines + 7 advanced, todas aprovadas) |
| Baselines | Java, Kotlin, C/C++, JavaScript, Python, Go |
| Personas | 0 criadas (8 conceituais, on-demand) |
| Core Protocols | 19 (11 main + 4 JIT web-research + 4 JIT knowledge-base) |
| SPECs Completas | 8 (001, 002, 003, 004, 005, 006, 007, 010) |
| Em Especificação | SPEC-011 (Slash Command Aliases) |
| Próximo | Implementar SPEC-011, depois Ecosystem + Baselines |
| Feature em andamento | SPEC-011 Slash Command Aliases (Specification complete) |

---

## Inicialização

```
1. LER .context/ai-assistant-guide.md   (T0 — regras & protocolos)
2. LER MEMORY.md                        (estado atual, sessões recentes)
3. CLASSIFICAR input                    (ver tabela abaixo)
4. CARREGAR JIT                         (apenas 2-5 skills relevantes)
5. EXECUTAR seguindo Constitution
6. ATUALIZAR MEMORY.md ao concluir
```

---

## Classificação de Input & Shortcuts

| Shortcut | Workflow | Persona | Skills a Carregar |
|----------|----------|---------|-------------------|
| `#new` | card_generation | Product Owner | requirements-gathering |
| `#impl CARD-XXX` | code_implementation | Software Engineer | linguagem do projeto |
| `#impl-direct` | code_implementation | Software Engineer | linguagem do projeto |
| `#test` | test_generation | QA Engineer | testing |
| `#review` | code_review | Code Reviewer | code-quality |
| `#bug` | bug_fixing | Debugger | debugging |
| `#refactor` | refactoring | Software Engineer | clean-code |
| `#docs` | documentation | Technical Writer | technical-writing |
| `#deploy` | devops | DevOps Engineer | docker, kubernetes |
| `#db` | database | DB Specialist | databases |
| `#security` | security_audit | Security Engineer | security |
| `#arch` | architecture | Solutions Architect | design-patterns |

Classificação detalhada: `.prompt-os/core/INPUT-CLASSIFIER.md`

---

## Workflows Típicos

### Nova Skill
```
1. AUTO-INCREMENT  → Verificar gaps / artefato similar
2. WEB-RESEARCH   → Pesquisar fontes (≥ 2)
3. KNOWLEDGE-BASE → Verificar skills existentes
4. GENERATE       → Template canônico
5. TOKEN CHECK    → Se > 1,400 tokens → JIT sub-files
6. SELF-CRITIQUE  → Score (target ≥ 99 para baselines, ≥ 80 para advanced)
7. HUMAN GATE     → Preview + aprovação
8. COMMIT         → Salvar + INDEX.md + MEMORY.md
```

### Nova Persona
```
1. INPUT-CLASSIFIER  → Classificar
2. KNOWLEDGE-BASE    → Identificar skills para compor
3. PERSONA-GENERATOR → Criar composição
4. SELF-CRITIQUE     → Avaliar
5. HUMAN GATE        → Aprovar
6. COMMIT            → Salvar + MEMORY.md
```

### Tarefa de Código
```
1. INPUT-CLASSIFIER → Classificar
2. JIT-PROTOCOL     → Carregar contexto mínimo
3. standards/       → Verificar regras aplicáveis
4. EXECUTE          → Realizar tarefa
5. SELF-CRITIQUE    → Se L2/L3
6. HUMAN GATE       → Se escrita de arquivo
```

---

## Personas Disponíveis (8 conceituais, on-demand)

| Persona | Ativa Quando | Skills Carregadas |
|---------|--------------|-------------------|
| Product Owner | `#new`, criação de CARD | requirements-gathering, card-templates |
| Software Engineer | `#impl`, `#refactor` | clean-code, linguagem do projeto, testing |
| QA Engineer | `#test` | software-testing, tdd |
| Code Reviewer | `#review` | code-quality, clean-code |
| Debugger | `#bug` | debugging-techniques, error-handling |
| Technical Writer | `#docs` | technical-writing |
| Solutions Architect | `#arch` | design-patterns, system design |
| DevOps Engineer | `#deploy` | docker, kubernetes |

Índice: `.prompt-os/personas/INDEX.md`

---

## SpecKit — Features Complexas

| Comando | Função |
|---------|--------|
| `/speckit.specify` | Criar especificação formal |
| `/speckit.clarify` | Identificar áreas sub-especificadas (até 5 perguntas) |
| `/speckit.plan` | Plano técnico |
| `/speckit.tasks` | Tarefas ordenadas por dependência |
| `/speckit.implement` | Executar implementação |
| `/speckit.analyze` | Consistência cross-artifact (spec ↔ plan ↔ tasks) |
| `/speckit.checklist` | Checklist customizado |
| `/speckit.taskstoissues` | Converter tarefas em GitHub issues |
| `/speckit.constitution` | Criar/atualizar constituição |

**Threshold:** < 3 dias → direto | 3-5 dias → recomendar | > 5 dias → **obrigatório**

---

## Protocolos Core (JIT — carregar conforme necessidade)

| Protocolo | Arquivo | Quando Carregar |
|-----------|---------|-----------------|
| Self-Critique | `.prompt-os/core/SELF-CRITIQUE.md` | Antes de L2/L3 |
| Human Gate | `.prompt-os/core/HUMAN-GATE.md` | Fase 4 do pipeline |
| Auto-Increment | `.prompt-os/core/AUTO-INCREMENT.md` | Após rejeições, gaps |
| Input Classifier | `.prompt-os/core/INPUT-CLASSIFIER.md` | Ao receber pedido |
| Command Router | `.prompt-os/core/COMMAND-ROUTER.md` | Comandos `#` ou `/itzamna.*` |
| Workflow Orchestrator | `.prompt-os/core/WORKFLOW-ORCHESTRATOR.md` | Workflow → Persona mapping |
| JIT Protocol | `.prompt-os/core/JIT-PROTOCOL.md` | Economia de tokens |
| Web Research | `.prompt-os/core/WEB-RESEARCH.md` | Pesquisa externa |
| Knowledge Base | `.prompt-os/core/KNOWLEDGE-BASE.md` | Buscar skills relacionadas |
| Persona Generator | `.prompt-os/core/PERSONA-GENERATOR.md` | Criar persona |
| Memory Management | `.prompt-os/core/MEMORY-MANAGEMENT.md` | Atualizar memória após ações |
| Memory Management | `.prompt-os/core/MEMORY-MANAGEMENT.md` | Após ações significativas |

---

## Monitoring & Tracking (durante specs)

| Arquivo | Propósito |
|---------|-----------|
| `memory/{agente}-spec{N}-session.md` | Gaps, rejeições, scores |
| `specs/{N}/execution-checklist.md` | Checklist de tarefas |
| `specs/{N}/reports/*.md` | Relatórios |
| `.prompt-os/templates/monitoring/` | Templates de relatório |

---

## Aprendizados Provados (SPEC-010)

1. **JIT sub-files** — scores: 94→99 (C/C++), 95→99 (JS)
2. **Version-agnostic** — "Python (moderno)" não "Python 3.12"
3. **Self-Critique ≥ 99** = 100% aprovação na primeira tentativa
4. **Estrutura consistente** = 15% mais rápido (51min avg)

---

## Estrutura do Projeto

```
itzamna-prompt-os/
├── .context/ai-assistant-guide.md   ← T0 (regras & links)
├── ITZAMNA-AGENT.md                 ← T1 (este arquivo — workflows)
├── MEMORY.md                        ← Estado persistente
├── CLAUDE.md / GEMINI.md / QWEN.md  ← T3 (CLI-específico)
├── AGENTS.md                        ← T3 (GitHub bootstrap)
├── .github/copilot-instructions.md  ← T3 (Copilot)
├── .cursorrules                     ← T3 (Cursor)
│
├── .prompt-os/                      ← Sistema core
│   ├── PROMPTOS.md                  ← Entry point
│   ├── CONSTITUTION.md             ← Fonte de verdade das regras
│   ├── core/                        ← 9 protocolos + JIT sub-files
│   ├── skills/                      ← 13 skills (INDEX.md)
│   ├── personas/                    ← Personas on-demand
│   ├── templates/                   ← Templates canônicos
│   ├── docs/                        ← Governance docs
│   └── scripts/                     ← Validação + hooks
│
├── .context/                        ← Contexto JIT para AIs
│   ├── standards/                   ← T0-T1 (regras, qualidade)
│   ├── _meta/                       ← T2 (projeto, decisões, ADRs)
│   ├── patterns/                    ← T1 (blueprints)
│   ├── workflows/                   ← T1 (fluxos)
│   ├── examples/                    ← T3 (exemplos)
│   └── troubleshooting/             ← T2 (problemas comuns)
│
├── .specify/                        ← SpecKit (constitution, templates)
├── specs/                           ← SPECs formais
├── memory/                          ← Memória por agente
└── docs/                            ← Docs para usuários
```

---

## SPECs Completadas

| Spec | Status | Protocolo |
|------|--------|-----------|
| SPEC-001 Self-Critique | ✅ | SELF-CRITIQUE.md + HUMAN-GATE.md (35/35) |
| SPEC-002 Auto-Increment | ✅ | AUTO-INCREMENT.md (90/90) |
| SPEC-003 Web Research | ✅ | WEB-RESEARCH.md + 4 JIT sub-files (23/23) |
| SPEC-004 Knowledge Base | ✅ | KNOWLEDGE-BASE.md + 4 JIT sub-files (Phases 0-3) |
| SPEC-005 Persona CLI | ✅ | PERSONA-GENERATOR.md |
| SPEC-006 Command Router | 🔄 | COMMAND-ROUTER.md (Phase 3 complete) |
| SPEC-010 Language Baselines | ✅ | 6 baselines (99.20 avg score) |

---

## Economia de Tokens (JIT)

```
Nível 1 — Kernel (SEMPRE):     ~3KB  → ai-assistant-guide.md + MEMORY.md
Nível 2 — Core (necessário):   ~4KB  → INPUT-CLASSIFIER.md + Persona ativa
Nível 3 — Skills/Context (JIT): var   → 2-5 skills + contexto necessário
TARGET: 10-16KB por tarefa
```

---

*ITZAMNA-AGENT.md — T1 Workflows & Memory | v2.2.0 | 2026-02-04*
