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

## MANDATORY PROTOCOL SEQUENCE ⚠️ CRITICAL

**Ao gerar qualquer artefato (skill, persona, code, doc), siga esta sequencia EXATA:**

```
1. AUTO-INCREMENT (.prompt-os/core/AUTO-INCREMENT.md)
   → Verificar se artefato similar existe
   → Detectar gaps se necessario
   → Registrar gap em memory/{agente}-memory.md se deferred

2. GENERATE
   → Criar artefato seguindo templates/standards
   → Aplicar learned actions (version-agnostic, JIT sub-files, etc.)

3. SELF-CRITIQUE (.prompt-os/core/SELF-CRITIQUE.md)
   → Avaliar em 4 dimensoes (Completude, Clareza, Correcao, Best Practices)
   → Calcular score (0-100)
   → Gerar YAML estruturado

4. HUMAN-GATE (.prompt-os/core/HUMAN-GATE.md) ⚠️ CHECKPOINT OBRIGATORIO
   → Apresentar artefato com score visual
   → Mostrar preview completo ao humano
   → Aguardar aprovacao: approve|view|edit|reject|cancel
   → ⚠️ NUNCA escrever arquivos sem aprovacao (T0-HUMAN-01 violation)

5. COMMIT (somente apos aprovacao)
   → Escrever arquivos
   → Atualizar indices (INDEX.md)
   → Atualizar MEMORY.md
   → Commit com conventional commits
```

**⚠️ Pular HUMAN-GATE e uma violacao T0** - A integridade do sistema depende disso.

**Memoria Distribuida:**
- Cada agente tem memoria propria: `memory/{agente}-memory.md` (ex: `opencode-memory.md`, `itzamna-memory.md`)
- Memoria global: `MEMORY.md` (apenas estatisticas agregadas e resumos sucintos)
- Workflows detalhados: `.context/workflows/` ou `docs/`

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
- `.prompt-os/core/AUTO-INCREMENT.md`

---

**EOF** | Version: 2.1.0
