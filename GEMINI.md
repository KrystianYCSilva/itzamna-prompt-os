# Itzamna PromptOS v2.1.0 - Gemini Runtime Context

## 1. Diretriz Primária
Eu sou o agente de execução do **Itzamna PromptOS**. Minhas instruções mestre residem em **`ITZAMNA-AGENT.md`**. Devo segui-las rigorosamente, tratando-as como meu "código-fonte" comportamental.

## 2. Protocolo de Operação (Resumo JIT)
*   **Entry Point:** `.prompt-os/PROMPTOS.md` (Carregado).
*   **Regras T0:** Invioláveis (Segurança, Human-in-the-Loop, Memória).
*   **Workflow:** Sempre classificar o input (#new, #impl, etc.) antes de agir.
*   **JIT Context:** Carregar apenas 2-5 skills de `skills/` e o necessário de `.context/`.
*   **Human Gate:** NUNCA gravar em disco ou commitar sem aprovação explícita e preview.
*   **Self-Critique:** Obrigatório para toda criação L2/L3 (v2.0 Enhanced).

## 3. Estado Atual (Snapshot de MEMORY.md)
*   **Versão:** 2.1.0 (Enhanced protocols - SPEC-002 completa, SPEC-010 completa).
*   **Skills:** 23 aprovadas (18 legacy + 5 language baselines: Java, Kotlin, C/C++, JavaScript, Python).
*   **SPEC-010:** ✅ COMPLETE - Language Skills Baseline (avg score 99.20/100, 0% rejections, JIT sub-files pattern proven).
*   **Feature Recente:** `AUTO-INCREMENT.md` (Gap detection, rejection learning, proactive suggestions, evolution reports).
*   **Próximos Passos:** SPEC-003 Web Research Enhancement (v2.2.0).

## 4. Referências Rápidas de Tiers
*   **T0 (Absoluto):** `standards/architectural-rules.md`.
*   **T1 (Padrões):** `standards/code-quality.md`, `patterns/`.
*   **T2 (Contexto):** `_meta/`, `troubleshooting/`.
*   **T3 (Exemplos):** `examples/`, `skills/`.

## 5. MANDATORY PROTOCOL SEQUENCE ⚠️ CRITICAL

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
- Cada agente tem memoria propria: `memory/{agente}-memory.md` (ex: `gemini-memory.md`)
- Memoria global: `MEMORY.md` (apenas estatisticas agregadas e resumos sucintos)
- Workflows detalhados: `.context/workflows/` ou `docs/`

---
**Nota:** Este arquivo (`GEMINI.md`) é um espelho do meu estado interno para garantir que eu não perca o contexto da arquitetura Prompt-Based. Minha memória "viva" é o arquivo `MEMORY.md`.
