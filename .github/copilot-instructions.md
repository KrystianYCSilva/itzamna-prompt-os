# Copilot Instructions - Itzamna PromptOS v2.1.0

> **Bootstrap para GitHub Copilot**

---

## READ FIRST

Este arquivo configura o GitHub Copilot para trabalhar com Itzamna PromptOS.

**Carregamento JIT - Ordem de prioridade:**

1. **`ITZAMNA-AGENT.md`** - Agente principal (identidade, workflows, regras)
2. **`.prompt-os/PROMPTOS.md`** - Entry point do sistema
3. **`.prompt-os/CONSTITUTION.md`** - Regras T0/T1/T2
4. **`MEMORY.md`** - Estado persistente
5. **`.context/`** - Contexto do projeto (carregar JIT)

---

## Inicialização Rápida

```
1. LER: ITZAMNA-AGENT.md (agente principal)
2. LER: .prompt-os/PROMPTOS.md (entry point)
3. LER: .prompt-os/CONSTITUTION.md (regras)
4. LER: MEMORY.md (estado atual)
5. CARREGAR JIT: .context/ conforme necessidade
```

---

## Regras T0 (Invioláveis)

| ID | Regra |
|----|-------|
| T0-HUMAN-01 | NUNCA criar/modificar arquivo sem aprovação humana |
| T0-HUMAN-02 | SEMPRE mostrar preview antes de commit |
| T0-MEMORY-01 | SEMPRE atualizar MEMORY.md após ações significativas |
| T0-SIZE-01 | Skills < 1400 tokens, Kernel < 5KB |
| T0-SOURCE-01 | SEMPRE citar fontes em skills geradas |

---

## Contexto do Projeto

O contexto está em `.context/` - carregar JIT:

| Arquivo | Quando Carregar |
|---------|-----------------|
| `standards/architectural-rules.md` | Regras T0 - carregar sempre |
| `_meta/project-overview.md` | Overview do projeto |
| `_meta/tech-stack.md` | Stack tecnológica |
| `standards/code-quality.md` | Qualidade de código |
| `standards/testing-strategy.md` | Estratégia de testes |
| `patterns/architectural-overview.md` | Padrões arquiteturais |

---

## Human Gate

**OBRIGATÓRIO para operações de arquivo.**  
**Protocolo completo:** `.prompt-os/core/HUMAN-GATE.md`

```
1. Gerar artefato
2. Self-critique (score 0-100, 4 dimensões)
3. Mostrar preview ao humano (formato estruturado com score + sugestões)
4. AGUARDAR resposta:
   - "ok/yes/approve" → Commit
   - "view/show" → Exibir conteúdo completo
   - "edit X" → Revisar seção X
   - "reject [reason]" → Aprender, oferecer retry
   - "cancel" → Abortar
```

---

## Build, Test, Lint (Opcional)

Este repo é primariamente baseado em prompts/documentação.

**Ferramentas opcionais:**
- Node CLI: `node .prompt-os\tools\brain.js ...`
- Python CLI: `py .prompt-os\core\cli.py ...`
- PowerShell: `.\.prompt-os\scripts\sync-constitution.ps1 ...`

**Testes (se package.json presente):**
- `npm test`
- `npm run coverage`
- `npm run lint`

---

## Referências

| Documento | Conteúdo |
|-----------|----------|
| `ITZAMNA-AGENT.md` | Agente principal completo |
| `.context/ai-assistant-guide.md` | Guia completo para AIs |
| `.context/README.md` | Hub de navegação |
| `.prompt-os/CONSTITUTION.md` | Regras completas |

---

**EOF** | Copilot Bootstrap | v2.1.0
