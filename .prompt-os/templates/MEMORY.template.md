# 📝 MEMORY.md - PromptOS State v2.0

> **Version:** 2.0.0 | **Last Updated:** {TIMESTAMP}
> **Purpose:** Estado persistente entre sessões

---

## 1. LAST SESSION

```yaml
timestamp: "{YYYY-MM-DD HH:MM}"
user_input: "{Último input significativo}"
classification:
  intent: "{intent detectado}"
  level: "{L1|L2|L3|L4}"
  complexity: "{trivial|simple|moderate|complex}"
result: "{Resumo do resultado}"
skills_used:
  - "{skill-1}"
  - "{skill-2}"
outcome: "{success|partial|failed}"
```

---

## 2. ACTIVE GOALS

```yaml
goals:
  - id: "GOAL-001"
    description: "{Descrição do objetivo}"
    status: "pending"  # pending | in_progress | completed | blocked
    created_at: "{YYYY-MM-DD}"
    due_date: "{YYYY-MM-DD}"  # opcional
    related_specs:
      - "SPEC-XXX"
    blockers: []
    
  - id: "GOAL-002"
    description: "{Outro objetivo}"
    status: "in_progress"
    created_at: "{YYYY-MM-DD}"
    progress: "50%"
    next_action: "{Próximo passo}"
```

---

## 3. LEARNED (Aprendizados)

```yaml
insights:
  - id: "LEARN-001"
    date: "{YYYY-MM-DD}"
    insight: "{O que foi aprendido}"
    source: "{De onde veio: user feedback, error, discovery}"
    applied_to: "{Onde foi aplicado}"
    confidence: "high"  # high | medium | low

  - id: "LEARN-002"
    date: "{YYYY-MM-DD}"
    insight: "{Outro aprendizado}"
    source: "{fonte}"
    tags:
      - "{tag1}"
      - "{tag2}"
```

---

## 4. ERRORS (Erros e Resoluções)

```yaml
errors:
  - id: "ERR-001"
    date: "{YYYY-MM-DD}"
    description: "{O que aconteceu}"
    root_cause: "{Por que aconteceu}"
    resolution: "{Como foi resolvido}"
    prevention: "{Como evitar no futuro}"
    severity: "medium"  # critical | high | medium | low

  - id: "ERR-002"
    date: "{YYYY-MM-DD}"
    description: "{Outro erro}"
    status: "unresolved"  # resolved | unresolved | investigating
    attempts:
      - "{Tentativa 1}"
      - "{Tentativa 2}"
```

---

## 5. CREATED ARTIFACTS (Registro de Criações)

```yaml
skills_created:
  - name: "{skill-name}"
    date: "{YYYY-MM-DD}"
    path: "skills/{category}/{skill-name}.md"
    status: "active"  # active | deprecated | draft
    usage_count: 0
    
personas_created:
  - name: "{persona-name}"
    date: "{YYYY-MM-DD}"
    path: "personas/{persona-name}.md"
    status: "active"

specs_created:
  - id: "SPEC-001"
    name: "{feature-name}"
    date: "{YYYY-MM-DD}"
    status: "completed"  # draft | in_review | approved | in_progress | completed
```

---

## 6. USER PREFERENCES (Detectadas)

```yaml
preferences:
  communication_style: "technical"  # casual | technical | formal
  detail_level: "moderate"  # minimal | moderate | verbose
  approval_strictness: "standard"  # strict | standard | relaxed
  favorite_domains:
    - "{domain-1}"
    - "{domain-2}"
  tech_stack:
    - "{tech-1}"
    - "{tech-2}"
```

---

## 7. SESSION STATISTICS

```yaml
stats:
  total_sessions: 0
  skills_generated: 0
  skills_approved: 0
  skills_rejected: 0
  personas_generated: 0
  specs_completed: 0
  average_approval_rate: "0%"
  most_used_skills:
    - name: "{skill}"
      count: 0
```

---

## 8. PENDING ACTIONS

```yaml
pending:
  - type: "skill_draft"
    name: "{skill-name}"
    path: "drafts/{skill-name}-DRAFT.md"
    waiting_for: "human_approval"
    created_at: "{YYYY-MM-DD}"
    
  - type: "research"
    topic: "{topic}"
    path: "docs/pesquisa-previa/{topic}.md"
    status: "complete"
    next_step: "generate_skill"
```

---

## 📌 QUICK ACCESS

**Resumo atual:**
- 🎯 Goals ativos: {N}
- 📚 Skills criadas: {N}
- 👤 Personas criadas: {N}
- ⏳ Pendentes: {N}
- ❌ Erros não resolvidos: {N}

---

**Last auto-update:** {TIMESTAMP}
