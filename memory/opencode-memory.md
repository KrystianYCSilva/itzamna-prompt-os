# OpenCode Agent Memory

**Agent**: opencode  
**Purpose**: Session logs for gap detection, rejection learning, and pattern analysis  
**Format**: Structured Markdown tables following Auto-Increment Protocol

---

## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "How to use Kafka?" | kafka-basics | pending |
| 2026-02-05 | "Kafka setup help" | kafka-basics | pending |
| 2026-02-07 | "Help with Kafka configuration" | kafka-basics | pending |
| 2026-02-03 | "Deploy with ArgoCD" | argocd-deploy | pending |
| 2026-02-06 | "ArgoCD best practices" | argocd-deploy | pending |

---

## Gap Pattern Analysis

**kafka-basics**: 3 occurrences (2026-02-03, 2026-02-05, 2026-02-07) → **PROACTIVE SUGGESTION TRIGGERED** ✅

**Acao Proativa**: "Percebi que voce tem perguntado sobre 'kafka' algumas vezes (3x). Atualmente, nao temos uma skill dedicada para isso. Gostaria que eu criasse uma skill 'kafka-basics'?"

**argocd-deploy**: 2 occurrences (2026-02-03, 2026-02-06) → **PROACTIVE SUGGESTION TRIGGERED** ✅

**Acao Proativa**: "Percebi que voce tem perguntado sobre 'argocd' algumas vezes (2x). Atualmente, nao temos uma skill dedicada para isso. Gostaria que eu criasse uma skill 'argocd-deploy'?"

---

## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-01 | skill | skill-1 | "Exemplos errados" | exemplos | Validar exemplos antes de mostrar |
| 2026-02-02 | skill | skill-2 | "Muito generico" | especificidade | Adicionar detalhes especificos |
| 2026-02-03 | skill | skill-3 | "Exemplos nao funcionam" | exemplos | Testar comandos em ambiente real |
| 2026-02-04 | skill | skill-4 | "Confuso" | clareza | Simplificar linguagem |
| 2026-02-05 | skill | skill-5 | "Exemplos incorretos" | exemplos | Validar sintaxe antes de Human Gate |
| 2026-02-06 | skill | skill-6 | "Incompleto" | completude | Verificar todas secoes obrigatorias |
| 2026-02-07 | skill | skill-7 | "Exemplos ruins" | exemplos | Melhorar qualidade dos exemplos |
| 2026-02-08 | skill | skill-8 | "Muito vago" | especificidade | Adicionar casos de uso concretos |
| 2026-02-09 | skill | skill-9 | "Falta conteudo" | completude | Completar secoes faltantes |
| 2026-02-10 | skill | skill-10 | "Confuso demais" | clareza | Reorganizar estrutura para clareza |
| 2026-02-03 | skill | redis-cache | "Exemplos incorretos" | exemplos | Testar comandos antes de mostrar |

---

## Padroes Identificados

**Categoria "exemplos"**: 5 ocorrencias de 11 total = 45.45% > 30% ✅ **PADRAO DETECTADO**

**Acao Proativa**: Na proxima skill, enfatizar: "Verifiquei que os exemplos funcionam" + "Exemplos testados em ambiente de desenvolvimento"

---

## Notas de Sessao

- **2026-02-03**: Iniciado validacao do protocolo Auto-Increment (User Story 1)
- Arquivo criado para teste de gap detection (T011)
- **2026-02-03**: User Story 2 validation - Added 10 rejection examples demonstrating pattern detection
- Pattern detected: "exemplos" category at 45% (above 30% threshold)
- **2026-02-03**: User Story 3 validation - Added duplicate gaps demonstrating proactive suggestions
- Gap patterns identified: kafka-basics (3x), argocd-deploy (2x) - both trigger proactive suggestions
