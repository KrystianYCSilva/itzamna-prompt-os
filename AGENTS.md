# AGENTS.md - Itzamna PromptOS v2.1.0

> **Bootstrap minimo para agentes.**
> **Agente principal:** `ITZAMNA-AGENT.md` (workflows + referencias).

---

## READ FIRST (ordem)

1. **ITZAMNA-AGENT.md** - agente principal (identidade, workflows, regras)
2. **.prompt-os/PROMPTOS.md** - entry point do sistema
3. **.prompt-os/CONSTITUTION.md** - regras T0/T1/T2 (inviolaveis)
4. **MEMORY.md** - estado persistente (deve ser atualizado e mantido estavel)
5. **.context/** - contexto do projeto (carregar JIT)

---

## Essencia do Sistema

- PromptOS e **prompt-based**: o core sao arquivos Markdown que AI agents leem e seguem.
- Ferramentas (brain.js, cli.py, sync-constitution.ps1) sao **opcionais** para uso humano.

---

## Regras T0 (resumo)

| ID | Regra |
|----|-------|
| T0-HUMAN-01 | NUNCA criar/modificar arquivos sem aprovacao humana |
| T0-HUMAN-02 | SEMPRE mostrar preview antes de commit |
| T0-MEMORY-01 | SEMPRE atualizar MEMORY.md apos acoes significativas |
| T0-SIZE-01 | Skills < 1400 tokens, Kernel < 5KB |
| T0-SOURCE-01 | SEMPRE citar fontes em skills |

**Fonte completa:** `.context/standards/architectural-rules.md` e `.prompt-os/CONSTITUTION.md`

---

## Human Gate (obrigatorio)

```
1. Gerar artefato
2. Self-Critique (score 0-100)
3. Mostrar preview ao humano
4. Aguardar: approve | view | edit | reject | cancel
```

---

## JIT Loading (economia de tokens)

- Carregar apenas 2-5 skills relevantes por tarefa.
- Prioridade: Constitution → Memory → Protocolos Core → Contexto necessario.

---

## Referencias Rapidas

- `ITZAMNA-AGENT.md` (agente principal)
- `.context/README.md` e `.context/ai-assistant-guide.md`
- `.prompt-os/core/SELF-CRITIQUE.md`
- `.prompt-os/core/HUMAN-GATE.md`

---

**EOF** | Version: 2.1.0
