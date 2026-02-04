# CLAUDE.md — Claude Code Bootstrap (T3)

> **Leia primeiro:** `.context/ai-assistant-guide.md` (T0) → `ITZAMNA-AGENT.md` (T1)
> Itzamna PromptOS v2.2.0 | 2026-02-04

---

## Dicas Claude Code

- **SpecKit** são skills nativas do Claude Code:
  `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`,
  `/speckit.implement`, `/speckit.analyze`, `/speckit.checklist`,
  `/speckit.constitution`, `/speckit.taskstoissues`
- **Shortcuts `#`** funcionam diretamente no chat:
  `#new`, `#impl`, `#impl-direct`, `#test`, `#review`, `#bug`,
  `#refactor`, `#docs`, `#deploy`, `#db`, `#security`, `#arch`
- **CLAUDE.md** é carregado automaticamente como contexto do projeto
- **Hooks**: verifique `~/.claude/` para hooks e keybindings configurados
- **Commits**: use `git commit` via Bash — nunca auto-commite (T0-HUMAN-02)
- **Dois sistemas de contexto:**
  - `.prompt-os/` — como o sistema opera (protocolos, skills, personas)
  - `.context/` — como navegar e tomar decisões (regras, workflows, exemplos)

## Complexidade & SpecKit

| Esforço | Ação |
|---------|------|
| < 3 dias | Implementação direta |
| 3-5 dias | Recomendar SpecKit |
| > 5 dias | SpecKit **obrigatório** |

## Referências Rápidas

| Preciso de... | Arquivo |
|---------------|---------|
| Regras & protocolos | `.context/ai-assistant-guide.md` |
| Workflows & memória | `ITZAMNA-AGENT.md` |
| Estado atual | `MEMORY.md` |
| Regras detalhadas | `.prompt-os/CONSTITUTION.md` |
| Skills disponíveis | `.prompt-os/skills/INDEX.md` |
| Troubleshooting | `.context/troubleshooting/common-issues.md` |
| ADRs | `.context/_meta/key-decisions.md` |

---

*CLAUDE.md — T3 | Claude Code | v2.2.0 | 2026-02-04*
