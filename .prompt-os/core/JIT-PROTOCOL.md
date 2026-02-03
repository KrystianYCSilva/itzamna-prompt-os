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

**Carregue APENAS o necessario:**

```
7. Consultar: .prompt-os/skills/INDEX.md (tabela de lookup)

8. Selecionar 2-5 skills baseado em:
   - Workflow detectado
   - Tech stack do projeto
   - Dominio do pedido

9. Carregar APENAS essas skills:
   - skills/{category}/{skill}/SKILL.md
   - Cada skill deve ter ~2KB
```

**Token count apos Passo 3:** ~10-16KB ✓

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
