# QWEN.md — Qwen Bootstrap (T3)

> **Leia primeiro:** `.context/ai-assistant-guide.md` (T0) → `ITZAMNA-AGENT.md` (T1)
> Itzamna PromptOS v2.3.0-dev | 2026-02-04

---

## Dicas Qwen

- **Protocolo de operação:** T0 (ai-assistant-guide) → T1 (ITZAMNA-AGENT) → MEMORY.md → JIT
- **Regras T0:** Invioláveis — segurança, controle humano, validação (ver T0 em ai-assistant-guide)
- **Workflow:** Classificar input (`#` shortcuts ou `/itzamna.*` slash commands) antes de agir
- **Slash Commands:** `/itzamna.init`, `/itzamna.impl`, `/itzamna.new`, `/itzamna.test`, etc.
- **Comandos especiais:** `/itzamna.status`, `/itzamna.skill`, `/itzamna.memory`, `/itzamna.help`
- **JIT:** Carregar apenas 2-5 skills de `.prompt-os/skills/` + o necessário de `.context/`
- **Human Gate:** NUNCA gravar em disco ou commitar sem aprovação + preview
- **Self-Critique:** Obrigatório para criação L2/L3
- **Protocolos core (20):** 12 main + 4 JIT web-research + 4 JIT knowledge-base
  (ver lista completa em `ITZAMNA-AGENT.md` → Protocolos Core)

## Referências Rápidas

| Preciso de... | Arquivo |
|---------------|---------|
| Regras & protocolos | `.context/ai-assistant-guide.md` |
| Workflows & memória | `ITZAMNA-AGENT.md` |
| Estado atual | `MEMORY.md` |
| Regras detalhadas | `.prompt-os/CONSTITUTION.md` |
| Skills disponíveis | `.prompt-os/skills/INDEX.md` |
| Troubleshooting | `.context/troubleshooting/common-issues.md` |

---

*QWEN.md — T3 | Qwen | v2.3.0-dev | 2026-02-04*
