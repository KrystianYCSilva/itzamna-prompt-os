# AGENTS.md — Itzamna PromptOS v2.2.0 (T3)

> **Bootstrap mínimo para agentes.**
> **Leia primeiro:** `.context/ai-assistant-guide.md` (T0) → `ITZAMNA-AGENT.md` (T1)

---

## Ordem de Leitura

```
1. .context/ai-assistant-guide.md   ← T0 (regras, links, protocolos)
2. ITZAMNA-AGENT.md                 ← T1 (workflows, memória, exemplos)
3. MEMORY.md                        ← Estado persistente
4. .prompt-os/CONSTITUTION.md       ← Regras detalhadas
5. .context/ (JIT)                  ← Contexto conforme necessidade
```

---

## Essência do Sistema

- **Prompt-based:** o core são arquivos Markdown que AI agents leem e seguem.
- **Human Gate obrigatório** para L2/L3 — nunca persista sem aprovação.
- **JIT:** carregue apenas 2-5 skills relevantes. Target 10-16KB por tarefa.
- Tools (`brain.js`, `cli.py`, `sync-constitution.ps1`) são **opcionais** para uso humano.

---

## T0 Quick

| ID | Regra |
|----|-------|
| T0-HUMAN-01 | NUNCA criar/modificar arquivos sem aprovação humana |
| T0-HUMAN-02 | NUNCA commit automático |
| T0-MEMORY-01 | SEMPRE atualizar MEMORY.md após ações significativas |
| T0-SIZE-01 | Skills < 1400 tokens, Kernel < 5KB |
| T0-SOURCE-01 | SEMPRE citar fontes (mínimo 2 para skills técnicas) |

**Regras completas:** `.context/ai-assistant-guide.md` (T0)

---

## Referências Rápidas

| Preciso de... | Arquivo |
|---------------|---------|
| Regras & protocolos | `.context/ai-assistant-guide.md` |
| Workflows & memória | `ITZAMNA-AGENT.md` |
| Estado atual | `MEMORY.md` |
| Regras detalhadas | `.prompt-os/CONSTITUTION.md` |
| Skills disponíveis | `.prompt-os/skills/INDEX.md` |

---

*AGENTS.md — T3 | Generic Agent Bootstrap | v2.2.0 | 2026-02-04*
