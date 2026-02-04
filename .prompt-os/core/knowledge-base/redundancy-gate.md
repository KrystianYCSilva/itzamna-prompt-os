# Redundancy Gate — Two-Tier Detection

> **JIT sub-file de KNOWLEDGE-BASE.md**  
> Carregue quando uma skill draft está pronta para ser persistida (após SELF-CRITIQUE, antes de HUMAN-GATE write).

**Governa:** FR-005, FR-006, SC-003 | **Contrato:** `specs/004-vector-db-rag/contracts/redundancy-gate.md`

---

## Quando Executa

**Trigger:** Draft de skill passou no SELF-CRITIQUE. Próximo passo seria HUMAN-GATE write.  
**Input:** Candidate skill (name, tags, description, content).  
**Output:** Uma das três disposições: `allowed` | `options-presented` | `blocked`.

---

## Árvore de Decisão

```
Executa similarity-scoring contra o INDEX completo
         │
         ▼
    Maior score?
         │
    ┌────┴────────────────┐
    ▼                     ▼
  < 80                  ≥ 80
    │                     │
    ▼               ┌─────┴─────┐
 ALLOWED            ▼           ▼
 (sem overlap)    80-89        ≥ 90
                    │           │
                    ▼           ▼
              OPTIONS        HARD BLOCK
              (3 opções)     (2 opções)
```

---

## Tier 1: High Overlap (80-89) — 3 Opções

Apresente ao developer e aguarde resposta **antes** de prosseguir.

| Opção | Label | O que acontece |
|-------|-------|----------------|
| A | Expandir existente | Superficia a skill sobreposta para edição. Draft novo é descartado. |
| B | Criar complementar | Adiciona link `complementary` entre a skill nova e a existente (ambas recebem o link). Prossegue para HUMAN-GATE. |
| C | Prosseguir como está | Prossegue para HUMAN-GATE sem link. Developer assume responsabilidade pelo overlap. |

**Formato de apresentação:**
```
⚠ Redundância detectada: "{nomeNovaSkill}" sobrepõe {overlapPercent}% com "{nomeSkillExistente}"

Opções:
  A) Expandir "{nomeSkillExistente}" com o conteúdo novo
  B) Criar como skill complementar (cross-referenced)
  C) Prosseguir como está

Sua escolha:
```

---

## Tier 2: Near-Duplicate (≥ 90) — HARD BLOCK

**"Prosseguir como está" NÃO está disponível.** Apenas 2 opções.

| Opção | Label | O que acontece |
|-------|-------|----------------|
| A | Expandir existente | Mesmo que Tier 1 Opção A |
| B | Criar complementar | Mesmo que Tier 1 Opção B |

**Formato de apresentação:**
```
🚫 Near-duplicate detectado: "{nomeNovaSkill}" sobrepõe {overlapPercent}% com "{nomeSkillExistente}"
   Nível de overlap indica duplicata. "Prosseguir como está" não disponível.

Opções:
  A) Expandir "{nomeSkillExistente}" com o conteúdo novo
  B) Criar como skill complementar (cross-referenced)

Sua escolha:
```

**Racional do hard block:** Score ≥ 90 significa conteúdo substantivamente igual. O único caso legítimo é version-extension (ex: `go-118` vs `go`), e esse é tratado pelo sistema de relationships, não por criação de duplicata sem link.

---

## Gap Forwarding (score < 40 em todas)

Se similarity-scoring retornar `gapDetected = true`, a redundancy gate **não executa**. Em vez disso, adicione GapRecord ao MEMORY.md:

```
| {data hoje} | knowledge-gap | "{query original}" | open |
```

Isso é o integration point FR-010.

---

## Cenários de Teste (SC-003)

| Cenário | Overlap | Tier esperado | Opções esperadas |
|---------|---------|---------------|------------------|
| T1 | "Go Concurrency Patterns" vs `go` (≥ 90) | nearDuplicate | A, B apenas |
| T2 | "Python Async Patterns" vs `python` (82) | high | A, B, C |
| T3 | "Rust Error Handling" vs `java` (45) | none | — (allowed) |
| T4 | "Kafka Consumer" vs todas (< 40) | gap | GapRecord forwarded |
| T5 | "JavaScript Testing" vs `javascript` (88) | high | A, B, C |

SC-003 requer zero false negatives em T1 e T2.

---

*redundancy-gate | KNOWLEDGE-BASE JIT sub-file | SPEC-004*
