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

---
**Nota:** Este arquivo (`GEMINI.md`) é um espelho do meu estado interno para garantir que eu não perca o contexto da arquitetura Prompt-Based. Minha memória "viva" é o arquivo `MEMORY.md`.
