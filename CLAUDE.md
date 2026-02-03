# CLAUDE.md

> **Bootstrap para Claude Code** | Itzamna PromptOS v2.1.0

---

## LEIA PRIMEIRO

Este arquivo configura o Claude Code para trabalhar com Itzamna PromptOS.

**Carregamento JIT - Ordem de prioridade:**

1. **`ITZAMNA-AGENT.md`** - Agente principal (contextos, workflows, regras comuns)
2. **`.prompt-os/PROMPTOS.md`** - Entry point do sistema
3. **`.prompt-os/CONSTITUTION.md`** - Regras T0/T1/T2
4. **`MEMORY.md`** - Estado persistente
5. **`.context/`** - Contexto do projeto (carregar JIT)

---

## INICIALIZACAO RAPIDA

```
1. LER: ITZAMNA-AGENT.md (agente principal)
2. LER: .prompt-os/PROMPTOS.md (entry point)
3. LER: .prompt-os/CONSTITUTION.md (regras)
4. LER: MEMORY.md (estado atual)
5. CARREGAR JIT: .context/ conforme necessidade
```

---

## REGRAS T0 (INVIOLAVEIS)

| ID | Regra |
|----|-------|
| T0-HUMAN-01 | TODA criacao/modificacao de arquivo REQUER aprovacao humana |
| T0-HUMAN-02 | SEMPRE mostrar preview antes de commit |
| T0-MEMORY-01 | SEMPRE atualizar MEMORY.md apos acoes significativas |
| T0-SIZE-01 | Skills < 1400 tokens, Kernel < 5KB |
| T0-SOURCE-01 | SEMPRE citar fontes em skills geradas |

---

## CONTEXTO DO PROJETO

O contexto esta em `.context/` - carregue JIT:

| Arquivo | Quando Carregar |
|---------|-----------------|
| `.context/standards/architectural-rules.md` | Ao escrever codigo (T0) |
| `.context/_meta/project-overview.md` | Para entender o projeto |
| `.context/_meta/tech-stack.md` | Para entender a stack |
| `.context/patterns/architectural-overview.md` | Ao projetar sistemas |
| `.context/workflows/development-workflows.md` | Ao executar workflows |

---

## HUMAN GATE

**Nivel de Autonomia: A2 (Colaborador)**  
**Protocolo completo:** `.prompt-os/core/HUMAN-GATE.md`

Operacoes que REQUEREM aprovacao:
- Criar/modificar arquivos
- Gerar skills/personas
- Fazer commits
- Deletar arquivos

Formato (v2.1 — score estruturado via Self-Critique):
```
"[Artefato] gerado! Score: [score]/100 ([band]) [indicator]
 approve | view | edit | reject | cancel"
```

---

## WORKFLOWS

| Shortcut | Workflow | Quando Usar |
|----------|----------|-------------|
| `#new` | card_generation | Nova feature |
| `#impl CARD-XXX` | code_implementation | Implementar CARD |
| `#test` | test_generation | Criar testes |
| `#review` | code_review | Revisar codigo |
| `#bug` | bug_fixing | Corrigir bug |

---

## SPEC-KIT

Para features complexas (>5 dias):

- `/speckit.constitution` - Criar/atualizar constituicao
- `/speckit.specify` - Criar especificacao
- `/speckit.plan` - Gerar plano
- `/speckit.tasks` - Quebrar em tarefas
- `/speckit.implement` - Executar

---

## REFERENCIA COMPLETA

Para informacoes detalhadas, consulte:
- **`ITZAMNA-AGENT.md`** - Agente principal com todos os detalhes
- **`.context/ai-assistant-guide.md`** - Guia completo para AIs
- **`.prompt-os/CONSTITUTION.md`** - Regras completas

---

*Itzamna PromptOS v2.1.0 | Claude Code Bootstrap | 2026-02-03*
