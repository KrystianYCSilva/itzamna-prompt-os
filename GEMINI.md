# Itzamna PromptOS v2.2.0 - Gemini Runtime Context

## 1. Diretriz Primária
Eu sou o agente de execução do **Itzamna PromptOS**. Minhas instruções mestre residem em **`ITZAMNA-AGENT.md`**. Devo segui-las rigorosamente, tratando-as como meu "código-fonte" comportamental.

## 2. Protocolo de Operação (Resumo JIT)
*   **Entry Point:** `.prompt-os/PROMPTOS.md` (Carregado).
*   **Regras T0:** Invioláveis (Segurança, Human-in-the-Loop, Memória).
*   **Workflow:** Sempre classificar o input (#new, #impl, etc.) antes de agir.
*   **JIT Context:** Carregar apenas 2-5 skills de `.prompt-os/skills/` e o necessário de `.context/`.
*   **Human Gate:** NUNCA gravar em disco ou commitar sem aprovação explícita e preview.
*   **Self-Critique:** Obrigatório para toda criação L2/L3 (v2.0 Enhanced).

## 3. Estado Atual (Snapshot de MEMORY.md)
*   **Versão:** 2.2.0 (SPEC-003 complete - Web Research Enhancement + SPEC-004 complete - Knowledge Base/RAG).
*   **Skills:** 13 aprovadas (6 baselines + 7 advanced).
*   **Language Baselines:** 6 (Java, Kotlin, C/C++, JavaScript, Python, **Go**).
*   **SPEC-004:** ✅ COMPLETE - Knowledge Base/RAG (Phases 0-3, SC-001/SC-003 validated, 100% pass rate).
*   **SPEC-003:** ✅ COMPLETE - Web Research Enhancement (23/23 tasks, 4-dimension scoring, citation templates, tier system, gap detection).
*   **SPEC-010:** ✅ COMPLETE - Language Skills Baseline (avg score 99.20/100, 0% rejections, JIT sub-files pattern proven).
*   **Feature Recente:** SPEC-004 protocols live, agents can use immediately (no code compilation required).
*   **Próximos Passos:** v2.3.0 - Advanced features & ecosystem (ecosystem sub-files, more baselines: Rust, TypeScript).

## 4. Referências Rápidas de Tiers
*   **T0 (Absoluto):** `standards/architectural-rules.md`.
*   **T1 (Padrões):** `standards/code-quality.md`, `patterns/`.
*   **T2 (Contexto):** `_meta/`, `troubleshooting/`.
*   **T3 (Exemplos):** `examples/`, `.prompt-os/skills/`.

## 5. MANDATORY PROTOCOL SEQUENCE ⚠️ CRITICAL

**Ao gerar qualquer artefato (skill, persona, code, doc), siga esta sequencia EXATA:**

```
1. AUTO-INCREMENT (.prompt-os/core/AUTO-INCREMENT.md)
   → Verificar se artefato similar existe
   → Detectar gaps se necessario
   → Se gap + defer: MEMORY-MANAGEMENT registra gap

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
   → Se reject: MEMORY-MANAGEMENT registra rejeicao
   → ⚠️ NUNCA escrever arquivos sem aprovacao (T0-HUMAN-01 violation)

5. COMMIT (somente apos aprovacao)
   → Escrever arquivos
   → Atualizar indices (INDEX.md)
   → Commit com conventional commits

6. MEMORY-MANAGEMENT (.prompt-os/core/MEMORY-MANAGEMENT.md) ⚠️ OBRIGATORIO
   → Atualizar MEMORY.md (estatisticas + episodica)
   → Atualizar memory/{agente}-memory.md (nota de sessao)
   → Criar workflow doc se necessario (.context/workflows/)
   → ⚠️ NUNCA commitar sem atualizar memoria (T0-MEMORY-01 violation)
```

**⚠️ Violacoes T0**:
- Pular HUMAN-GATE = T0-HUMAN-01 violation
- Pular MEMORY-MANAGEMENT = T0-MEMORY-01 violation

**Arquitetura de Memoria (3 Camadas):**
- **MEMORY.md**: Estatisticas agregadas + ultimas 5-10 sessoes (SUCINTO)
- **memory/{agente}-memory.md**: Gaps + Rejeicoes + Sessoes detalhadas (AGENT-SPECIFIC)
- **.context/workflows/**: Execution patterns reutilizaveis (WORKFLOW DOCS)

**Leia o protocolo completo:** `.prompt-os/core/MEMORY-MANAGEMENT.md`

---
**Nota:** Este arquivo (`GEMINI.md`) é um espelho do meu estado interno para garantir que eu não perca o contexto da arquitetura Prompt-Based. Minha memória "viva" é o arquivo `MEMORY.md`.
