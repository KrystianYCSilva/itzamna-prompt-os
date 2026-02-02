# TIER SYSTEM - T0 → T2 Rules

---

## 🎯 DEFINIÇÃO

O Tier System define 3 níveis de regras (T0, T1, T2) que organizam como o Prompt OS opera.

---

## T0 - REGRAS INVIOLÁVEIS

**Nunca quebrem. Period.** Violação = projeto inviável.

### T0-STRUCTURAL
- Estrutura `AGENTS.md` + `MEMORY.md` + `.context/` + `docs/` **SEMPRE**
- Kernel `~/ src/prompt-os/` para all projects
- JIT loading protocol **obrigatório**

### T0-VALIDATION
- **T0-PROMPT-04:** Detectar integrações oficiais → pesquisa OBRIGATÓRIA
- **T0-PROMPT-05:** Validar tech-stack ANTES de usar features
- **T0-PROMPT-10:** NUNCA afirmar sucesso sem executar build/test

### T0-SECURITY
- **T0-01:** Sem hardcoded secrets em código
- **T0-02:** Sem SQL injection (use parameterized queries)
- **T0-03:** Sem XSS (sanitize user input)

### T0-CARD-FIRST
- Novas funcionalidades → card_generation (ANTES de code_implementation)
- Exceção: `#impl CARD-XXX` ou `#impl-direct` (consciente)

---

## T1 - REGRAS FORTES

**Quebrar é raro. Justifique exceções.**

### T1-CODE-QUALITY
- SOLID principles obrigatórios
- Clean Code practices
- 80%+ test coverage
- Sem code duplications

### T1-ARCHITECTURE
- Camadas bem-definidas (controller → service → repository)
- Separação de concerns
- Dependency Injection (injetar dependências)

### T1-PERFORMANCE
- Queries otimizadas (usar índices)
- Caching onde apropriado
- Lazy loading para objetos grandes

### T1-DOCUMENTATION
- Métodos públicos com javadoc/docstrings
- Decision records para arquitetura
- README.md para projetos

---

## T2 - CONVENÇÕES & PREFERÊNCIAS

**Quebrar é aceitável se há razão técnica.**

### T2-NAMING
- Variáveis: camelCase
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Database tables: snake_case

### T2-STRUCTURE
- Pastas por feature (domain-driven)
- Ou por tipo (controllers/, services/, etc)
- Documentado em architectural-rules.md

### T2-STYLE
- Indentação: 4 espaços (Java) ou 2 espaços (JS)
- Line length: ≤120 caracteres
- Imports organizados

---

## 📊 MATRIZ DE IMPACTO

| Tier | Impacto | Quebra? | Exceção? |
|------|---------|--------|----------|
| T0 | 🔴 Critical | ❌ Não | ❌ Raramente |
| T1 | 🟠 Alto | ⚠️ Raro | ✅ Com justificativa |
| T2 | 🟡 Médio | ✅ Sim | ✅ Sempre |

---

**Versão:** 3.5.0
**Status:** PRODUCTION READY
