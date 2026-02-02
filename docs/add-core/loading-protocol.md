# LOADING PROTOCOL - JIT (Just-In-Time) Loading

---

## 🎯 OBJETIVO

Implementar carregamento progressivo de contexto para reduzir token footprint de **50KB → 10-16KB** (-68-76%).

---

## 🏗️ ARQUITETURA 3-NÍVEIS

### NÍVEL 1: Kernel (Sempre carregado)
**Tamanho:** ≤2KB
**Arquivos:**
- `AGENTS.md` (kernel do projeto)
- `MEMORY.md` (estado)
- `T0 rules` (invioláveis)

### NÍVEL 2: Sistema Core (Por tarefa)
**Tamanho:** ≤3KB
**Arquivos:**
- `input-classifier.md` (classificação)
- `master-router.md` (roteamento)
- `tier-system.md` (regras)
- **CARREGUE:** Baseado em workflow detectado

### NÍVEL 3: Skills & Prompts (JIT)
**Tamanho:** ≤10KB (2-5 skills, 1 prompt)
**Origem:** `~/src/prompt-os/skills/` e `~/src/prompt-os/prompts/`
**CARREGUE:** Somente se necessário para a tarefa

---

## 📊 ALGORITMO DE LOADING

```
┌──────────────────────────────────────┐
│ 1. USER MESSAGE ARRIVES              │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ 2. LOAD NÍVEL 1 (Kernel)             │
│    - AGENTS.md (~2KB)                │
│    - MEMORY.md (estado)              │
│    - T0 rules                        │
└──────────────────────────────────────┘
   RUNNING TOTAL: ~2KB
           ↓
┌──────────────────────────────────────┐
│ 3. CLASSIFY INPUT                    │
│    - Load input-classifier.md (~2KB) │
│    - Detectar: workflow + persona    │
│    - Return: JIT requirements        │
└──────────────────────────────────────┘
   RUNNING TOTAL: ~4KB
           ↓
┌──────────────────────────────────────┐
│ 4. ROUTE PERSONA                     │
│    - Load master-router.md (~2KB)    │
│    - Buscar persona em ~/src/...     │
│    - Identificar skills necessárias  │
└──────────────────────────────────────┘
   RUNNING TOTAL: ~6KB
           ↓
┌──────────────────────────────────────┐
│ 5. LOAD SKILLS (JIT)                 │
│    - Consultar skills/INDEX.md       │
│    - Selecionar 2-5 skills (~4-10KB) │
│    - Cada skill ≤2KB                 │
└──────────────────────────────────────┘
   RUNNING TOTAL: ~10-16KB ✅
           ↓
┌──────────────────────────────────────┐
│ 6. EXECUTE                           │
│    - Aplicar T0 rules                │
│    - Executar workflow               │
│    - Atualizar MEMORY.md             │
└──────────────────────────────────────┘
```

---

## 🔍 EXEMPLO PRÁTICO: card_generation

**USER:** "Quero criar um CRUD de produtos"

**Step 1-2:** Load Kernel (~2KB)
- AGENTS.md (Java 21, Spring Boot 3.2, PostgreSQL)
- MEMORY.md (estado v3.4.0)

**Step 3:** Classify
- Input: "Quero criar..." (novo)
- Workflow: `card_generation`
- Persona: `Product Owner`
- JIT requirements: [card-templates, requirements, validation]

**Step 4:** Route
- Master router detecta: PO → precisa skills em [requirements-gathering, validation-patterns, architecture-basics]

**Step 5:** Load Skills JIT
- `requirements-gathering.md` (~2KB)
- `card-templates.md` (~1.5KB)
- `validation-patterns.md` (~1.5KB)
- **Total skills: ~5KB**

**Step 6:** Execute
- PO cria CARD-XXX.md com padrão estruturado
- Atualizar MEMORY.md com nova tarefa

**Final token count: ~6-7KB** (vs 30KB sem JIT)

---

## ⚙️ CONFIGURAÇÃO

### Progressive Disclosure Strategy

```
Início da sessão:
- Carregar NÍVEL 1 (sempre)
- Aguardar input do usuário

Após primeiro input:
- Classificar → carregar NÍVEL 2 relevante
- Carregar NÍVEL 3 JIT baseado em classificação

Próximas tarefas:
- Reusar NÍVEL 2 (cache)
- Carregar novos NÍVEL 3 conforme necessário
```

### Cache Strategy

```
Cache persistente por sessão:
- NÍVEL 1: Always (AGENTS.md, MEMORY.md)
- NÍVEL 2: Until new workflow (input-classifier, master-router)
- NÍVEL 3: Per-task (descarta após task completa)

Benefício: Reduz reloads desnecessários
```

---

## ✅ MÉTRICAS

| Fase | Token antes | Token JIT | Redução |
|------|------------|----------|---------|
| v3.4 (Full) | 50KB | - | - |
| Kernel + Classification | - | 4KB | -92% |
| + Skills (2-5) | - | 10-16KB | -68-76% |
| Total Reduction | 50KB | 10-16KB | **-68-76%** |

---

## 🔧 IMPLEMENTAÇÃO

Cada agente/modelo implementa loading assim:

```
// Pseudocode
function process(userMessage) {
  // Level 1
  const kernel = load(AGENTS.md, MEMORY.md);

  // Level 2
  const classified = classify(userMessage, kernel);
  const systemCore = load(input-classifier, master-router);

  // Level 3 (JIT)
  const jitSkills = selectSkills(classified.workflow, 2-5);
  const skillContent = load(...jitSkills);

  // Execute
  return execute(classified, systemCore, skillContent);
}
```

---

## 💡 INSTRUÇÕES PARA IA (Como Executar JIT)

### Quando Você Recebe Uma Tarefa:

**Passo 1: Load NÍVEL 1 (SEMPRE)**
```markdown
1. Ler: AGENTS.md (~1.5KB)
2. Ler: MEMORY.md (estado atual)
3. Confirmar: T0 rules do projeto
```
**Token count:** ~2-3KB

---

**Passo 2: Classify Input (SEMPRE)**
```markdown
4. Ler: ~/src/prompt-os/core/input-classifier.md (~4KB)
5. Analisar: Mensagem do usuário
6. Detectar: 
   - Workflow (card_generation, code_implementation, etc)
   - Persona (Product Owner, Software Engineer, etc)
   - Skills necessárias (lista de 2-5 skills)
```
**Token count:** +4KB = ~6-7KB total

---

**Passo 3: Route to Persona (SEMPRE)**
```markdown
7. Ler: ~/src/prompt-os/core/master-router.md (~3KB)
8. Buscar: Persona identificada
9. Confirmar: Skills required para persona
```
**Token count:** +3KB = ~9-10KB total

---

**Passo 4: Load Skills (JIT - SELETIVO)**
```markdown
10. Consultar: ~/src/prompt-os/skills/INDEX.md (lookup table)
11. Carregar APENAS skills necessárias:
    - Se workflow = "card_generation" → skills: [requirements, validation]
    - Se workflow = "code_implementation" + tech = Java → skills: [java, spring-boot, testing]
    - Se workflow = "code_review" → skills: [clean-code, solid, patterns]
12. Cada skill ≤2KB
13. Carregar 2-5 skills (não mais!)
```
**Token count:** +4-10KB = ~13-20KB total ✅

---

**Passo 5: Execute Task**
```markdown
14. Aplicar T0 rules (architectural-rules.md + tier-system.md)
15. Executar workflow com persona + skills
16. Validar resultado (se aplicável, executar testes)
```

---

**Passo 6: Update Memory**
```markdown
17. Atualizar MEMORY.md seção "Recent Actions"
18. Adicionar: data, workflow, persona, resultado, próximos passos
19. Commit changes (se aplicável)
```

---

## 🎯 TARGET TOKEN BUDGETS

| Scenario | NÍVEL 1 | NÍVEL 2 | NÍVEL 3 | Total | vs v3.4 |
|----------|---------|---------|---------|-------|---------|
| **Simple** (ex: review) | 2KB | 7KB | 4KB | **13KB** | -74% (vs 50KB) |
| **Moderate** (ex: impl) | 2KB | 7KB | 8KB | **17KB** | -66% (vs 50KB) |
| **Complex** (ex: arch) | 2KB | 7KB | 10KB | **19KB** | -62% (vs 50KB) |

**Never exceed 20KB per task!**

---

## 🚨 ANTI-PATTERNS (O Que NÃO Fazer)

### ❌ PROIBIDO: Carregar tudo upfront
```markdown
# ERRADO
1. Carregar ~/src/prompt-os/ completo
2. Carregar todas 130 skills
3. Total: 260KB+

❌ Defeats entire purpose of v3.5!
```

### ❌ PROIBIDO: Ignorar JIT
```markdown
# ERRADO
1. Carregar AGENTS.md
2. Executar tarefa diretamente
3. Não usar input-classifier.md

❌ Quebra auto-detection!
```

### ❌ PROIBIDO: Carregar skills desnecessárias
```markdown
# ERRADO
Input: "Review ProductService.java"
Skills carregadas: [java, python, rust, golang, typescript]

❌ Só precisava: [java, clean-code, solid]
```

---

## ✅ BOAS PRÁTICAS

### ✅ Cache Inteligente
```markdown
Se mesma persona em tarefas consecutivas:
- Reutilizar persona já carregada
- Carregar APENAS novas skills

Exemplo:
Task 1: #impl CARD-001 (Java CRUD)
  → Load: java, spring-boot, jpa

Task 2: #impl CARD-002 (Java API)
  → Reuse: java, spring-boot
  → Load NEW: api-design

Saving: -4KB (não recarregou java)
```

### ✅ Progressive Disclosure
```markdown
Se tarefa complexa precisa mais contexto:
1. Comece com JIT mínimo
2. SE precisar mais → carregue incrementalmente
3. NUNCA carregue "just in case"

Exemplo:
Task: "Analise arquitetura completa"
  → Start: NÍVEL 1 + 2 (10KB)
  → Ask user: "Preciso carregar skills de arquitetura (DDD, Clean Arch, Microservices)?"
  → Load: APENAS se usuário confirmar
```

### ✅ Skill Granularization
```markdown
Prefer: skills atômicas (~2KB cada)
Avoid: skills monolíticas (>5KB)

Good:
- java.md (2KB)
- spring-boot.md (2KB)
- jpa.md (2KB)

Bad:
- java-complete-stack.md (15KB) ❌
```

---

## 📊 MEDIÇÃO DE SUCESSO

### Como Validar JIT Está Funcionando:

**Método 1: Token Count Manual**
```bash
# Conte tokens carregados
wc -c AGENTS.md + input-classifier.md + master-router.md + skills/*.md

# Esperado: ≤20KB
```

**Método 2: Tool Automatizado**
```powershell
# Script measurement
.\scripts\measure-tokens.ps1 -task "criar CRUD"

# Output esperado:
# NÍVEL 1: 1.5KB
# NÍVEL 2: 7KB
# NÍVEL 3: 8KB
# Total: 16.5KB ✅
```

**Método 3: AI Self-Report**
```markdown
Após carregar contexto, AI deve reportar:

"Contexto carregado:
- NÍVEL 1: AGENTS.md (1.5KB) + MEMORY.md (2KB)
- NÍVEL 2: input-classifier (4KB) + master-router (3KB)
- NÍVEL 3: skills [java, spring-boot, testing] (6KB)
Total: 16.5KB ✅"
```

---

**Versão:** 3.5.0
**Status:** PRODUCTION READY
**Expected Token Savings:** 68-76%
