---
name: core-jit-protocol
description: "JIT PROTOCOL - Just-In-Time Loading"
---

# JIT PROTOCOL - Just-In-Time Loading

> **Instrucoes para carregar contexto de forma eficiente.**  
> Voce (agente de IA) deve seguir este protocolo para economizar tokens.

---

## POR QUE JIT?

Carregar TUDO de uma vez = desperdicio de tokens e contexto poluido.

```
SEM JIT: 50KB+ carregado → Lento, caro, confuso
COM JIT: 10-16KB carregado → Rapido, eficiente, focado
```

**Meta:** Reduza 68-76% do token footprint.

---

## ARQUITETURA 3-NIVEIS

```
┌─────────────────────────────────────────────────────────────┐
│ NIVEL 1 - KERNEL (SEMPRE carregue)                         │
│ ~2-3KB                                                      │
│ - CONSTITUTION.md (regras)                                  │
│ - MEMORY.md (estado do projeto)                             │
│ - AGENTS.md (contexto do projeto)                           │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ NIVEL 2 - CORE (Se necessario)                              │
│ ~4-7KB                                                      │
│ - INPUT-CLASSIFIER.md (para classificar pedidos)            │
│ - Persona ativa (apenas 1)                                  │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ NIVEL 3 - SKILLS (JIT - Sob demanda)                        │
│ ~4-10KB                                                     │
│ - 2-5 skills relevantes (cada uma ~2KB)                     │
│ - NAO carregue mais que o necessario!                       │
└─────────────────────────────────────────────────────────────┘
```

---

## PROTOCOLO DE LOADING

### Passo 1: Inicio da Sessao (NIVEL 1)

**SEMPRE carregue:**

```
1. Ler: .prompt-os/CONSTITUTION.md
   - Entender regras T0/T1/T2
   - Saber o que pode e nao pode fazer

2. Ler: .prompt-os/MEMORY.md (se existir)
   - Estado atual do projeto
   - Ultimas acoes realizadas
   - Decisoes pendentes

3. Ler: AGENTS.md (raiz do projeto, se existir)
   - Tech stack
   - Padroes do projeto
   - Contexto geral
```

**Token count apos Passo 1:** ~2-3KB

---

### Passo 2: Classificar Input (NIVEL 2)

**Quando usuario faz um pedido:**

```
4. Ler: .prompt-os/core/INPUT-CLASSIFIER.md
   
5. Analisar mensagem do usuario:
   - Qual workflow? (card_generation, code_implementation, etc.)
   - Qual persona? (Product Owner, Software Engineer, etc.)
   - Quais skills serao necessarias?

6. Ler: Persona identificada
   - .prompt-os/personas/{persona}/PERSONA.md
   - OU personas/{persona}/PERSONA.md
```

**Token count apos Passo 2:** ~6-8KB

---

### Passo 3: Carregar Skills (NIVEL 3 - JIT)

**IMPORTANTE (T011 - Orchestrator Integration):** Skill loading is now triggered by the Orchestrator's Active Context output, not ad-hoc selection.

**Novo fluxo:**

```
7. Receber Active Context do WORKFLOW-ORCHESTRATOR.md:
   - workflow: {workflow_id}
   - persona: {persona_name}
   - skills: [{skill1}, {skill2}, {skill3}, ...]
   - stack_skill: {resolved_stack_skill} (if applicable)
   - warnings: [{warning1}, {warning2}, ...]

8. Consultar: .prompt-os/skills/INDEX.md (tabela de lookup)

9. Carregar EXATAMENTE as skills listadas no Active Context:
   - skills/{category}/{skill}/SKILL.md
   - Cada skill deve ter ~2KB
   - NÃO selecionar skills adicionais
   - NÃO substituir skills do Active Context

10. Validação:
    - skills.length >= 2 && skills.length <= 5
    - Se fora do range: HALT e emitir erro
```

**Token count apos Passo 3:** ~10-16KB ✓

---

## ACTIVE CONTEXT CONTRACT (T018)

**Integration Contract:** JIT Protocol receives an Active Context object from Workflow Orchestrator and loads exactly those skills.

### Active Context Structure

```yaml
# Mandatory Fields
workflow: string          # One of: new, impl, bug, review, docs, test, arch
persona: string           # Full persona name (e.g., "Software Engineer")
skills: string[]          # List of skill IDs, length 2-5

# Optional Fields
stack_skill: string       # Resolved stack skill ID (e.g., "typescript"), only if {stack-skill} was present
warnings: string[]        # List of warning messages emitted during resolution

# Metadata
resolved_at: timestamp    # When resolution completed (for debugging)
```

### Mandatory Fields Specification

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `workflow` | string | MUST be one of: `new`, `impl`, `bug`, `review`, `docs`, `test`, `arch` | Workflow identifier |
| `persona` | string | MUST be one of 7 valid personas (see WORKFLOW-ORCHESTRATOR.md Section 4) | Full persona name (e.g., "Software Engineer") |
| `skills` | string[] | MUST contain 2-5 skill IDs; each skill ID MUST exist in `.prompt-os/skills/INDEX.md` | Ordered list of skills to load |

### Optional Fields Specification

| Field | Type | When Present | Description |
|-------|------|--------------|-------------|
| `stack_skill` | string | When `{stack-skill}` was resolved in Resolution Flow Step 2 | Resolved tech-stack skill ID (e.g., `typescript`, `python`) |
| `warnings` | string[] | When warnings were emitted during resolution (e.g., missing stack, invalid persona, skill eviction) | Human-readable warning messages for display |

### JIT Responsibilities

1. **Receive Active Context:**
   - JIT Protocol is invoked with a complete Active Context object
   - Object is guaranteed to be valid (passed Orchestrator's Step 5 validation gate)
   - JIT MUST NOT modify or validate the object (validation already done)

2. **Load Skills:**
   - Read `.prompt-os/skills/INDEX.md` to map skill IDs to file paths
   - Load EXACTLY `skills.length` skill files (no more, no less)
   - Load order: iterate `skills[]` in array order (priority already determined by Orchestrator)
   - Each skill file path format: `.prompt-os/skills/{category}/{skill-id}/SKILL.md`

3. **Surface Warnings:**
   - If `warnings[]` is non-empty: display warnings to user BEFORE executing workflow
   - Warnings are informational; they do NOT halt execution
   - Example display format:
     ```
     ⚠️ Active Context Warnings:
     - Tech Stack Profile missing or outdated
     - Fallback: Omitted language-specific skill from active set
     ```

4. **Execute Workflow:**
   - Activate the specified persona
   - Use loaded skills as context for workflow execution
   - Follow persona-specific guidelines from `.prompt-os/personas/{persona}/PERSONA.md`

### Skill Loading Rules (FR-005 Enforcement)

| Rule | Enforcement Point | Action |
|------|-------------------|--------|
| **Minimum 2 skills** | Orchestrator Step 5 | Enforced BEFORE passing to JIT |
| **Maximum 5 skills** | Orchestrator Step 5 | Enforced BEFORE passing to JIT |
| **Exact skill loading** | JIT Step 3 | Load `len(skills)` files, no more |
| **No ad-hoc selection** | JIT Step 3 | Do NOT add skills beyond Active Context |
| **No substitution** | JIT Step 3 | Do NOT replace skills in Active Context |

### Example Active Context Objects

**Example 1: Standard Workflow (No Overrides)**

```yaml
workflow: impl
persona: Software Engineer
skills:
  - typescript
  - clean-code
  - software-testing
stack_skill: typescript
warnings: []
resolved_at: 2026-02-04T10:30:00Z
```

**JIT Action:**
- Load 3 skill files: `.prompt-os/skills/languages/typescript/SKILL.md`, `.prompt-os/skills/engineering/clean-code/SKILL.md`, `.prompt-os/skills/testing/software-testing/SKILL.md`
- Activate persona: Software Engineer
- No warnings to display

---

**Example 2: With Persona Override**

```yaml
workflow: impl
persona: Solutions Architect
skills:
  - typescript
  - clean-code
  - software-testing
stack_skill: typescript
warnings: []
resolved_at: 2026-02-04T10:35:00Z
```

**JIT Action:**
- Load same 3 skill files (skills unchanged by persona override)
- Activate persona: Solutions Architect (overridden from default)
- No warnings to display

---

**Example 3: With Skills Merge & Eviction**

```yaml
workflow: review
persona: Code Reviewer
skills:
  - tdd
  - security-basics
  - system-design
  - code-quality
stack_skill: null
warnings:
  - "⚠️ Skill cap exceeded (5-skill limit)\n   - Evicted skills: (none - under cap)\n   - Active skills: tdd, security-basics, system-design, code-quality"
resolved_at: 2026-02-04T10:40:00Z
```

**JIT Action:**
- Load 4 skill files (explicit skills merged with defaults)
- Activate persona: Code Reviewer
- Display warning about skill merge (informational, not blocking)

---

**Example 4: With Stack Resolution Fallback**

```yaml
workflow: impl
persona: Software Engineer
skills:
  - clean-code
  - software-testing
stack_skill: null
warnings:
  - "⚠️ Tech Stack Profile missing or outdated\n   - File: .context/_meta/tech-stack.md\n   - Impact: Language-specific skill omitted from active skill set\n   - Action: Update .context/_meta/tech-stack.md with primary_language to resolve"
resolved_at: 2026-02-04T10:45:00Z
```

**JIT Action:**
- Load 2 skill files (stack-skill omitted due to fallback)
- Activate persona: Software Engineer
- Display warning about missing stack (user should fix `.context/_meta/tech-stack.md`)

---

### Anti-Patterns (DO NOT DO)

**❌ Adding Skills Beyond Active Context:**

```yaml
# Active Context from Orchestrator
skills: [typescript, clean-code]

# JIT decides to add more skills
# ❌ WRONG - loads [typescript, clean-code, tdd, security-basics]
# ✓ CORRECT - loads [typescript, clean-code] only
```

**❌ Substituting Skills:**

```yaml
# Active Context from Orchestrator
skills: [python, clean-code]

# JIT decides Python projects need pytest
# ❌ WRONG - loads [python, pytest] (replaced clean-code)
# ✓ CORRECT - loads [python, clean-code] exactly
```

**❌ Re-Validating Skill Count:**

```yaml
# Active Context from Orchestrator (already validated)
skills: [a, b, c]

# JIT re-validates
# ❌ WRONG - if len(skills) < 2: halt
# ✓ CORRECT - trust Orchestrator validation, load directly
```

---

### Integration Summary

| Responsibility | Owner | Notes |
|----------------|-------|-------|
| Skill selection logic | Workflow Orchestrator | Map lookup, stack resolution, overrides, eviction |
| Skill count validation | Workflow Orchestrator | Step 5 validation gate (2-5 skills) |
| Skill loading | JIT Protocol | Read INDEX.md, load skill files |
| Persona activation | JIT Protocol | Load persona file, apply guidelines |
| Workflow execution | JIT Protocol | Execute with loaded persona + skills |

**Key Principle:** Orchestrator decides WHAT to load; JIT executes HOW to load it.

---

**Contrato de Integração (Summary):**
- JIT Protocol recebe um objeto Active Context do Workflow Orchestrator
- JIT carrega EXATAMENTE as skills especificadas (não adiciona, não remove)
- JIT não precisa mais "adivinhar" quais skills são relevantes
- Workflow Orchestrator é responsável por toda lógica de seleção de skills
- Active Context é validado ANTES de chegar ao JIT (2-5 skills garantido)

---

### Passo 4: Executar

```
10. Aplicar regras T0/T1/T2 (da Constitution)

11. Executar workflow com:
    - Persona ativa
    - Skills carregadas
    - Contexto do projeto

12. Validar resultado (se aplicavel)
```

---

### Passo 5: Atualizar MEMORY

```
13. Apos concluir tarefa, atualizar MEMORY.md:
    - Data/hora
    - Workflow executado
    - Resultado
    - Proximos passos (se houver)
```

---

## TABELA DE SKILLS POR WORKFLOW

| Workflow | Skills Tipicas |
|----------|---------------|
| `card_generation` | requirements-gathering, card-templates, validation |
| `code_implementation` | clean-code, {tech-stack}, testing, api-design |
| `test_generation` | testing, {test-framework}, coverage |
| `code_review` | clean-code, solid, security, performance |
| `bug_fixing` | debugging, logging, {tech-stack} |
| `refactoring` | clean-code, solid, patterns, {tech-stack} |
| `documentation` | technical-writing, markdown, {domain} |

**Nota:** `{tech-stack}` = Skill especifica da tecnologia do projeto (java, typescript, python, etc.)

---

## EXEMPLOS PRATICOS

### Exemplo 1: Usuario quer criar feature

**Input:** "Quero criar um CRUD de produtos"

**Loading:**
```
NIVEL 1: (ja carregado)
- CONSTITUTION.md
- MEMORY.md  
- AGENTS.md

NIVEL 2:
- INPUT-CLASSIFIER.md → Workflow: card_generation
- personas/product-owner/PERSONA.md

NIVEL 3 (JIT):
- skills/requirements/gathering/SKILL.md
- skills/templates/card/SKILL.md

TOTAL: ~8KB ✓
```

---

### Exemplo 2: Usuario quer implementar CARD

**Input:** "#impl CARD-001"

**Loading:**
```
NIVEL 1: (ja carregado)

NIVEL 2:
- INPUT-CLASSIFIER.md → Workflow: code_implementation
- personas/software-engineer/PERSONA.md

NIVEL 3 (JIT):
- Le CARD-001.md para entender requisitos
- skills/backend/clean-code/SKILL.md
- skills/backend/api-design/SKILL.md
- skills/testing/unit-testing/SKILL.md

TOTAL: ~12KB ✓
```

---

### Exemplo 3: Tarefas consecutivas (Cache)

**Input 1:** "#impl CARD-001" (Java CRUD)
**Input 2:** "#impl CARD-002" (Java API)

**Loading Input 1:**
```
- skills/backend/java/SKILL.md
- skills/backend/spring-boot/SKILL.md
- skills/testing/junit/SKILL.md
```

**Loading Input 2:**
```
- REUTILIZA: java, spring-boot (ja em contexto)
- CARREGA NOVO: skills/backend/api-design/SKILL.md

ECONOMIA: ~4KB (nao recarregou java skills)
```

---

## ANTI-PATTERNS (O Que NAO Fazer)

### ❌ Carregar tudo upfront

```
# ERRADO
1. Carregar todos os arquivos de .prompt-os/
2. Carregar todas as skills
3. Carregar todas as personas
Total: 50KB+ ❌
```

### ❌ Ignorar classificacao

```
# ERRADO
1. Usuario pede algo
2. Ignorar INPUT-CLASSIFIER.md
3. Adivinhar workflow

Resultado: Skills erradas carregadas ❌
```

### ❌ Carregar skills desnecessarias

```
# ERRADO
Input: "Revisar ProductService.java"

Skills carregadas: [java, python, rust, golang, typescript]

Deveria ser: [java, clean-code, solid] ❌
```

### ❌ Recarregar tudo a cada pedido

```
# ERRADO
Pedido 1: Carregar 16KB
Pedido 2: Carregar 16KB novamente
Pedido 3: Carregar 16KB novamente

Deveria: Reutilizar o que ja esta em contexto ❌
```

---

## BOAS PRATICAS

### ✓ Cache Inteligente

```
Se mesma persona em tarefas consecutivas:
- Reutilizar persona ja carregada
- Carregar APENAS novas skills
```

### ✓ Progressive Disclosure

```
Se tarefa complexa precisa mais contexto:
1. Comece com JIT minimo
2. SE precisar mais → pergunte ao usuario
3. Carregue incrementalmente
4. NUNCA carregue "just in case"
```

### ✓ Skills Atomicas

```
Prefira: Skills pequenas (~2KB cada)
Evite: Skills monoliticas (>5KB)
```

---

## METRICAS DE SUCESSO

### Token Budgets por Cenario

| Cenario | NIVEL 1 | NIVEL 2 | NIVEL 3 | Total |
|---------|---------|---------|---------|-------|
| Simples (review) | 2KB | 5KB | 4KB | **11KB** |
| Moderado (impl) | 2KB | 5KB | 8KB | **15KB** |
| Complexo (arch) | 2KB | 5KB | 10KB | **17KB** |

**Regra:** NUNCA exceda 20KB por tarefa!

---

## AUTO-REPORT (Opcional)

Apos carregar contexto, voce pode reportar:

```
Contexto carregado:
- NIVEL 1: CONSTITUTION.md + MEMORY.md + AGENTS.md (~3KB)
- NIVEL 2: INPUT-CLASSIFIER.md + Persona: Software Engineer (~5KB)
- NIVEL 3: Skills [clean-code, api-design, testing] (~6KB)
Total: ~14KB ✓
```

Isso ajuda o usuario entender o que voce esta considerando.

---

## RESUMO

```
1. SEMPRE carregue NIVEL 1 (kernel) no inicio
2. CLASSIFIQUE o pedido antes de carregar mais
3. CARREGUE apenas skills necessarias (2-5)
4. REUTILIZE contexto entre tarefas relacionadas
5. NUNCA carregue tudo de uma vez
6. META: 10-16KB por tarefa
```

---

*Fim do JIT Protocol. Siga este protocolo para economizar tokens.*
