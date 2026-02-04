# Itzamna PromptOS v2.2.0 - Arquitetura Consolidada

> Sistema operacional cognitivo para programacao paralela humano-agente
> Arquitetura: Prompt-Based | Atualizado: 2026-02-04

---

## 1. Resumo rapido (documentacao resumida)

**O que e**: um sistema prompt-based onde agentes leem Markdown e seguem protocolos.
**Entry point**: `.prompt-os/PROMPTOS.md`
**Regras inviolaveis**: `.prompt-os/CONSTITUTION.md` (T0/T1/T2)
**Estado atual**: `MEMORY.md`

**Onde encontrar o que voce precisa**
- Arquitetura consolidada: `docs/ARCHITECTURE.md` (este arquivo)
- Protocolos: `.prompt-os/core/`
- Contexto para agentes: `.context/`
- Skills/personas: `.prompt-os/skills/` e `.prompt-os/personas/`
- Specs e relatorios: `specs/`
- Templates de monitoramento: `.prompt-os/templates/monitoring/`

**Specs principais (todas prontas)**
SPEC-001, SPEC-002, SPEC-003, SPEC-004, SPEC-005, SPEC-010

---

## 2. Arquitetura Prompt-Based

PromptOS = colecao de **prompts (Markdown)** que agentes **leem e seguem**.
Nao depende de runtime, banco de dados ou servico ativo.

```
Agente -> .prompt-os/PROMPTOS.md -> Protocolos core -> Skills/Personas -> Human Gate -> Memory
```

---

## 3. Estrutura do Repositorio (macro)

```
itzamna-prompt-os/
├── .prompt-os/           # Core do sistema (protocolos, templates, tools)
├── .prompt-os/skills/    # Skills geradas
├── .prompt-os/personas/  # Personas geradas
├── .context/             # Contexto para agentes (T0-T3)
├── specs/                # Specs e relatorios formais
├── docs/                 # Documentacao humana consolidada
├── memory/               # Memoria por agente
├── MEMORY.md             # Memoria persistente global
└── ITZAMNA-AGENT.md      # Agente principal
```

---

## 4. Protocolos Core e SPECs

| SPEC | Protocolo | Arquivo | Status |
|------|-----------|---------|--------|
| SPEC-001 | Self-Critique + Human Gate | `.prompt-os/core/SELF-CRITIQUE.md`, `.prompt-os/core/HUMAN-GATE.md` | ✅ |
| SPEC-002 | Auto-Increment | `.prompt-os/core/AUTO-INCREMENT.md` | ✅ |
| SPEC-003 | Web Research | `.prompt-os/core/WEB-RESEARCH.md` + sub-files | ✅ |
| SPEC-004 | Knowledge Base / RAG | `.prompt-os/core/KNOWLEDGE-BASE.md` + sub-files | ✅ |
| SPEC-005 | Persona Generator | `.prompt-os/core/PERSONA-GENERATOR.md` | ✅ |
| SPEC-010 | Language Baselines | `.prompt-os/skills/linguagens/*/SKILL.md` | ✅ |

**Docs estrategicos**
- `specs/TRANSITION-010-TO-003.md`
- `specs/005-SPEC-STRATEGY.md`

---

## 5. Fluxo Operacional (Human Gate)

```
AUTO-INCREMENT -> GENERATE -> SELF-CRITIQUE -> HUMAN-GATE -> COMMIT -> MEMORY
```

Toda escrita exige aprovacao humana (T0-HUMAN-01).

---

## 6. Memoria e Governanca

**3 camadas**
- `MEMORY.md` (global e resumido)
- `memory/{agent}-memory.md` (episodica por agente)
- `.context/workflows/` (padroes reutilizaveis)

---

## 7. Pesquisa e Knowledge Base

- Web Research: valida fontes, tiers e citacoes
- Knowledge Base: similarity scoring + redundancy gate + RAG prompt-based
- Gaps alimentam Auto-Increment

---

## 8. Skills, Personas e Templates

- Skills: `.prompt-os/skills/` (JIT, < 1,400 tokens por skill principal)
- Personas: `.prompt-os/personas/`
- Templates gerais: `.prompt-os/templates/`
- Templates de monitoramento: `.prompt-os/templates/monitoring/`

---

## 9. Integracao e Automacao

Ferramentas opcionais:
- `.prompt-os/tools/brain.js`
- `.prompt-os/core/cli.py`
- `.prompt-os/scripts/validate-indices.py`

Blueprint futuro: `docs/blueprints/dspy-mcp-blueprint.md`

---

## 10. Status Atual e Proximos Passos

**Status**: v2.2.0 completa (SPEC-001/002/003/004/005/010)
**Proximo**: v2.3.0 (ver `specs/v2.3.0-plan.md`)

---

## 11. Referencias Rapidas

- Entry point: `.prompt-os/PROMPTOS.md`
- Regras: `.prompt-os/CONSTITUTION.md`
- Memoria: `MEMORY.md`
- Contexto: `.context/README.md`
- Specs: `specs/`
- Execucao: `ITZAMNA-AGENT.md`

---

EOF
