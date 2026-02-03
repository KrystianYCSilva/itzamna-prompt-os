# HUMAN GATE - Aprovacao Humana

> **Protocolo para apresentar artefatos gerados ao humano para aprovacao.**  
> Garante que humanos sempre decidem sobre mudancas significativas (T0-HUMAN-01).

---

## POR QUE HUMAN GATE?

O Human Gate e um checkpoint obrigatorio que:

1. **Respeita T0-HUMAN-01**: Humanos SEMPRE decidem sobre file operations
2. **Fornece contexto**: Mostra self-critique score e sugestoes
3. **Permite revisao**: Humano pode aprovar, editar, rejeitar, ou cancelar
4. **Registra decisoes**: Feedback usado para melhoria continua

---

## QUANDO APLICAR

Human Gate e **OBRIGATORIO** antes de:

- Criar novo arquivo
- Modificar arquivo existente
- Deletar arquivo
- Fazer commit
- Fazer push

**Excecao:** Operacoes read-only (ler arquivos, buscar informacao) nao precisam.

---

## PROTOCOLO DE APRESENTACAO

### 1. Executar Self-Critique

Antes de apresentar ao Human Gate, execute o protocolo SELF-CRITIQUE.md e obtenha:
- Score (0-100)
- Band (Excellent/Good/Fair/Poor)
- Dimensions breakdown
- Strengths, weaknesses, suggestions
- Similar items (se aplicavel)
- Constitution check

Veja: `.prompt-os/core/SELF-CRITIQUE.md`

**PROTOCOLO COMPLETO - Sequencia Obrigatoria:**
```
1. AUTO-INCREMENT (.prompt-os/core/AUTO-INCREMENT.md) → JA aplicado (gap detection)
2. GENERATE → JA executado (artefato criado)
3. SELF-CRITIQUE (.prompt-os/core/SELF-CRITIQUE.md) → JA aplicado (este e o resultado)
4. **HUMAN-GATE** (este protocolo) → Checkpoint final OBRIGATORIO antes de file writes
5. COMMIT → Somente apos aprovacao humana neste checkpoint
```

⚠️ **Este protocolo e o ULTIMO checkpoint antes de persistir mudancas.**  
⚠️ **Pular este passo e uma violacao T0-HUMAN-01** - NUNCA escreva arquivos sem aprovacao.

---

### 2. Formato de Display

Apresente o artefato com o seguinte formato:

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: {artifact_name}
 Type: {artifact_type}
 
 SELF-CRITIQUE: {score}/100 ({band}) {indicator}
 
 Dimensions:
   Completeness:   {dim_1}/25  {bar_1}
   Clarity:        {dim_2}/25  {bar_2}
   Correctness:    {dim_3}/25  {bar_3}
   Best Practices: {dim_4}/25  {bar_4}
 
 ✓ Strengths:
   + {strength_1}
   + {strength_2}
   ...
 
 ✗ Weaknesses:
   - {weakness_1}
   - {weakness_2}
   ...
 
 💡 Suggestions:
   1. {suggestion_1}
   2. {suggestion_2}
   ...
 
 {similarity_warning_if_any}
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

---

### 3. Indicadores Visuais por Band

| Band | Score | Indicator | Header Style |
|------|-------|-----------|--------------|
| Excellent | 90-100 | 🟢 | Standard |
| Good | 70-89 | 🔵 | Standard |
| Fair | 50-69 | 🟡 | ⚠️ Warning prefix |
| Poor | 0-49 | 🔴 | ⚠️⚠️ Strong warning |

**Exemplos de Headers:**

```
# Excellent (90-100)
HUMAN GATE - APPROVAL REQUIRED

# Good (70-89)
HUMAN GATE - APPROVAL REQUIRED

# Fair (50-69)
⚠️ HUMAN GATE - APPROVAL REQUIRED

# Poor (0-49)
⚠️⚠️ HUMAN GATE - LOW QUALITY WARNING
```

---

### 4. Progress Bars para Dimensions

Use caracteres Unicode para visualizar scores:

```
25/25: █████████████████████████ (100%)
20/25: ████████████████████░░░░░ (80%)
15/25: ███████████████░░░░░░░░░░ (60%)
10/25: ██████████░░░░░░░░░░░░░░░ (40%)
 5/25: █████░░░░░░░░░░░░░░░░░░░░ (20%)
 0/25: ░░░░░░░░░░░░░░░░░░░░░░░░░ (0%)
```

Formula: `█` para cada 4% (1 ponto), `░` para o resto

---

### 5. Similarity Warning (Skills only)

Se similar_items detectados (>= 60% similarity):

```
 ⚠️ SIMILAR SKILLS DETECTED:
   - {skill_name_1} ({similarity}% overlap) - {note}
   - {skill_name_2} ({similarity}% overlap) - {note}
   Consider merging or differentiating from existing skills.
```

---

### 6. Behavior por Score Range

| Score Range | Automatic Behavior |
|-------------|-------------------|
| 90-100 | Display with confidence indicator 🟢 |
| 70-89 | Standard display 🔵 |
| 50-69 | Add warning prefix ⚠️ to header |
| 0-49 | Add strong warning ⚠️⚠️, suggest regeneration |

**Score < 70:** Adicionar linha ao fim:

```
⚠️ REVIEW SUGGESTIONS BEFORE APPROVING
```

**Score < 50:** Adicionar linha ao fim:

```
🔴 REGENERATION STRONGLY RECOMMENDED
```

---

## ACOES DO HUMANO

### Comandos Aceitos

| Action | Commands | Behavior |
|--------|----------|----------|
| **Approve** | `1`, `approve`, `ok`, `yes` | Commit artifact, record approval |
| **View** | `2`, `view`, `show` | Display full artifact content |
| **Edit** | `3`, `edit`, `edit <section>` | Revise artifact (entire or specific section) |
| **Reject** | `4`, `reject`, `no` | Discard artifact, record rejection with reason |
| **Cancel** | `5`, `cancel` | Abort operation without recording |

### Fluxo de Decisao

```
Human input received
    ├─ "approve" → Commit artifact → Update MEMORY.md
    ├─ "view" → Show full content → Wait for next command
    ├─ "edit" → Revise artifact → Re-run self-critique → Show again
    ├─ "reject" → Record reason → Offer retry or abort
    └─ "cancel" → Abort → No changes made
```

---

## CONSTITUTION VIOLATIONS

### T0 Violation Detectada

Se `constitution_check.t0_violations > 0`:

```
============================================
 ⚠️⚠️ HUMAN GATE - CONSTITUTION VIOLATION
============================================
 Artifact: {artifact_name}
 
 🔴 T0 VIOLATION DETECTED
 
 Violations:
   - {violation_description}
 
 This artifact CANNOT be approved until violations are fixed.
 T0 rules are INVIOLABLE.
============================================

[1] fix   [2] view   [3] cancel
```

**Blocker:** NAO permitir aprovacao ate que t0_violations = 0

---

### T1 Warnings

Se `constitution_check.t1_warnings > 0`:

Incluir nos weaknesses:

```
✗ Weaknesses:
   - T1-QUAL-04: Function exceeds 30 lines
   - T1-ARCH-04: Missing error handling
```

Humano pode aprovar com warnings, mas deve ser informado.

---

## ERROR HANDLING

### Self-Critique Falhou

Se self-critique nao puder completar:

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: {artifact_name}
 Type: {artifact_type}
 
 SELF-CRITIQUE: ⚠️ INCOMPLETE
 
 Reason: {reason}
 - Could not evaluate dimension: {dimension}
 - Artifact may be malformed
 
 Proceed with manual review.
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

---

### No Similar Skills Found

Se nenhuma similarity >= 60% for encontrada:

Omitir secao de similarity warning, ou mostrar:

```
Similar skills: None found
```

---

## COMPACT FORMAT (Opcional)

Para artefatos simples ou quando verbosidade nao e necessaria:

```
============================================
 HUMAN GATE: {artifact_name} ({type})
 Score: {score}/100 ({band}) {indicator}
 
 ✓ {summary_strengths}
 ✗ {summary_weaknesses}
 💡 {key_suggestion}
============================================
[1] approve  [2] view  [3] edit  [4] reject
```

---

## EXEMPLO COMPLETO

### Excellent Score (92/100)

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: kubernetes-deployment
 Type: skill
 
 SELF-CRITIQUE: 92/100 (Excellent) 🟢
 
 Dimensions:
   Completeness:   23/25  █████████████████████░░░░
   Clarity:        24/25  ██████████████████████░░░
   Correctness:    22/25  ████████████████████░░░░░
   Best Practices: 23/25  █████████████████████░░░░
 
 ✓ Strengths:
   + Comprehensive coverage of deployment scenarios
   + Well-structured with clear sections
   + Practical, copy-paste ready examples
 
 💡 Suggestions:
   1. Consider adding rollback example
 
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

### Fair Score with Warnings (58/100)

```
============================================
 ⚠️ HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: database-connection
 Type: code
 
 SELF-CRITIQUE: 58/100 (Fair) 🟡
 
 Dimensions:
   Completeness:   15/25  ███████████████░░░░░░░░░░
   Clarity:        18/25  ██████████████████░░░░░░░
   Correctness:    12/25  ████████████░░░░░░░░░░░░░
   Best Practices: 13/25  █████████████░░░░░░░░░░░░
 
 ✓ Strengths:
   + Basic connection logic works
   + Good variable naming
 
 ✗ Weaknesses:
   - No error handling for connection failure
   - Connection string hardcoded (T1 warning)
   - No connection pooling
 
 💡 Suggestions:
   1. Add try-catch for connection errors
   2. Move connection string to environment variable
   3. Implement connection pooling
   4. Add retry logic for transient failures
 
 ⚠️ REVIEW SUGGESTIONS BEFORE APPROVING
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

### With Similarity Warning

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: api-error-handling
 Type: skill
 
 SELF-CRITIQUE: 76/100 (Good) 🔵
 
 Dimensions:
   Completeness:   19/25  ███████████████████░░░░░░
   Clarity:        21/25  █████████████████████░░░░
   Correctness:    18/25  ██████████████████░░░░░░░
   Best Practices: 18/25  ██████████████████░░░░░░░
 
 ✓ Strengths:
   + Good error code examples
   + Clear HTTP status mapping
 
 ✗ Weaknesses:
   - Only 2 examples provided
 
 💡 Suggestions:
   1. Add example for validation errors
   2. Include retry-after header example
 
 ⚠️ SIMILAR SKILLS DETECTED:
   - rest-api-design (68% overlap) - Both cover error responses
   - http-status-codes (62% overlap) - Overlapping status code guidance
   Consider merging or differentiating from existing skills.
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

---

## REFERENCIAS

- Self-Critique Protocol: `.prompt-os/core/SELF-CRITIQUE.md`
- Constitution: `.prompt-os/CONSTITUTION.md`
- Skills Registry: `.prompt-os/skills/INDEX.md`

---

*Fim do Human Gate Protocol. Use sempre antes de file operations.*
