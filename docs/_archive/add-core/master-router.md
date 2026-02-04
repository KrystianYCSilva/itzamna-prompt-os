# MASTER ROUTER - Prompt OS v3.5
## Central Persona & Workflow Registry

---

## 🎯 PURPOSE

O Master Router é um **catálogo** de todas as personas disponíveis e suas implementações.

**Fluxo:**
```
User: "Quero criar um CRUD"
  ↓
input-classifier: Detecta card_generation + Product Owner
  ↓
master-router: Routes para ~/src/prompt-os/personas/INDEX.md
  ↓
JIT Loading: Carrega persona + 2-3 skills (≤8KB)
  ↓
Execute
```

---

## 📚 PERSONAS DISPONÍVEIS

### 🔷 Core Personas (14 padrão)

1. **Product Owner** → Card generation, requirements
2. **Solution Architect** → Architecture, decisions
3. **Software Engineer** → Code implementation
4. **Code Reviewer** → Code review
5. **QA Engineer** → Testing
6. **DevOps Engineer** → CI/CD, deployment
7. **Database Specialist** → DB design
8. **Security Engineer** → Security audit
9. **Debugger** → Bug fixing
10-14. [Outras 5 personas especializadas]

### 🎓 Academic Personas (14 reasoning-enhanced)

**v3.5 NEW:** Cada persona tem 2 versões:
- **Chat-optimized:** Para modelos rápidos (Claude, GPT-4)
- **Reasoning-optimized:** Para DeepSeek R1, GPT-o1

1. **computer-scientist-ai** (chat + reasoning)
2. **software-architect** (chat + reasoning)
3. **production-engineer** (chat + reasoning)
4. [+ 11 personas]

---

## 🎯 ROTEAMENTO JIT

### Quando classificar é `card_generation`:
```
Persona: Product Owner
Prompt: implement-feature.prompt.md (~1.7KB)
Skills JIT:
  - card-templates.md (~2KB)
  - requirements-gathering.md (~1.5KB)
  - validation-patterns.md (~1.5KB)
Total: ~6.7KB
```

### Quando classificar é `code_implementation`:
```
Persona: Software Engineer
Prompt: implement-feature.prompt.md (~1.7KB)
Skills JIT (baseado em tech-stack):
  - java.md (~2KB) [se Java detectado]
  - spring-boot.md (~2KB) [se Spring detectado]
  - api-design.md (~2KB)
  - software-testing.md (~2KB)
Total: ~9.7KB
```

### Quando classificar é `code_review`:
```
Persona: Code Reviewer
Prompt: code-review.prompt.md (~4KB)
Skills JIT:
  - software-quality.md (~1.5KB)
  - clean-code.md (~1.5KB)
  - code-smells.md (~1.5KB)
Total: ~8.5KB
```

### Quando classificar é `bug_fixing`:
```
Persona: Debugger
Prompt: debug-error.prompt.md (~1.6KB)
Skills JIT:
  - debugging-techniques.md (~1.5KB)
  - stack-trace-analysis.md (~1.5KB)
  - error-handling.md (~1.5KB)
Total: ~6.1KB
```

### Quando classificar é `test_generation`:
```
Persona: Quality Engineer
Prompt: test-generation.prompt.md (~1.7KB)
Skills JIT:
  - software-testing.md (~2KB)
  - test-automation.md (~2KB)
  - tdd.md (~1.5KB)
Total: ~7.2KB
```

### Quando classificar é `refactoring`:
```
Persona: Software Engineer
Prompt: refactor.prompt.md (~1.7KB)
Skills JIT:
  - refactoring.md (~2KB)
  - clean-code.md (~1.5KB)
  - software-design.md (~2KB)
Total: ~7.2KB
```

### Quando classificar é `security_audit`:
```
Persona: Security Engineer
Prompt: security-audit.prompt.md (~1.7KB)
Skills JIT:
  - cybersecurity.md (~2KB)
  - secure-coding.md (~2KB)
  - owasp.md (~2KB)
Total: ~7.7KB
```

### Quando classificar é `performance_optimization`:
```
Persona: Performance Engineer
Prompt: performance-analysis.prompt.md (~1.7KB)
Skills JIT:
  - performance-optimization.md (~2KB)
  - profiling.md (~1.5KB)
  - scalability.md (~1.5KB)
Total: ~6.7KB
```

### Quando classificar é `api_design`:
```
Persona: Solution Architect
Prompt: api-design.prompt.md (~1.7KB)
Skills JIT:
  - api-design.md (~2KB)
  - rest.md (~2KB)
  - software-architecture.md (~2KB)
Total: ~7.7KB
```

### Quando classificar é `documentation`:
```
Persona: Technical Writer
Prompt: documentation.prompt.md (~1.7KB)
Skills JIT:
  - technical-documentation.md (~2KB)
  - api-documentation.md (~1.5KB)
Total: ~5.2KB
```

---

## ✅ INHERITANCE MODEL

Personas herdam skills conforme progressão:

```
junior:
  - Persona base (10 skills core)
  - Acesso: 50% das skills disponíveis
  - Limit: ≤3 skills por task

mid-level:
  - Persona base (15 skills core)
  - Acesso: 75% das skills disponíveis
  - Limit: ≤4 skills por task

senior:
  - Persona base (20+ skills)
  - Acesso: 100% das skills
  - Limit: ≤5 skills por task
```

---

## 🔗 ÍNDICES

Consulte:
- `~/src/prompt-os/personas/INDEX.md` - Lookup de todas personas
- `~/src/prompt-os/skills/INDEX.md` - Lookup de todas skills
- `~/src/prompt-os/prompts/INDEX.md` - 15 prompts reutilizáveis

---

**Versão:** 3.5.0
**Status:** PRODUCTION READY
**Compatível com:** Prompt OS v3.5 (JIT Loading, Bifurcation)
