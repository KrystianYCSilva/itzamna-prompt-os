# 📚 SKILLS INDEX

> **Version:** 3.5.0 | **Last Updated:** {TIMESTAMP}
> **Total Skills:** {N} | **Categories:** {N}

---

## 🔍 Quick Search

**Por keyword:** Ctrl+F e busque o termo desejado.

**Por categoria:** Use os links abaixo para navegar.

---

## 📂 Categories

### Academic Skills

| Subcategory | Count | Description |
|-------------|-------|-------------|
| [fundamentals](#fundamentals) | {N} | Algoritmos, estruturas de dados, matemática |
| [software-engineering](#software-engineering) | {N} | Design patterns, arquitetura, qualidade |
| [programming-paradigms](#programming-paradigms) | {N} | OOP, FP, paradigmas |
| [web-mobile](#web-mobile) | {N} | Frontend, mobile, PWAs |
| [systems](#systems) | {N} | SO, redes, distributed |
| [data](#data) | {N} | Databases, big data, analytics |
| [ai-ml](#ai-ml) | {N} | Machine learning, deep learning, NLP |
| [security](#security) | {N} | Cybersecurity, criptografia |

### Technology Skills

| Subcategory | Count | Description |
|-------------|-------|-------------|
| [cloud](#cloud) | {N} | AWS, GCP, Azure, Kubernetes |
| [languages](#languages) | {N} | Python, JS, Go, Rust |
| [databases](#databases) | {N} | PostgreSQL, Redis, MongoDB |
| [practices](#practices) | {N} | CI/CD, testing, DevOps |

---

## 📖 Full Index

### Fundamentals

| Skill | Keywords | Path | Size |
|-------|----------|------|------|
| algorithm-design | algorithm, complexity, optimization | [link](academic/fundamentals/algorithm-design.md) | 1.2KB |
| data-structures | array, tree, graph, hash | [link](academic/fundamentals/data-structures.md) | 1.3KB |

### Software Engineering

| Skill | Keywords | Path | Size |
|-------|----------|------|------|
| design-patterns | pattern, singleton, factory | [link](academic/software-engineering/design-patterns.md) | 1.4KB |
| clean-code | readable, maintainable, SOLID | [link](academic/software-engineering/clean-code.md) | 1.1KB |

### Cloud

| Skill | Keywords | Path | Size |
|-------|----------|------|------|
| docker | container, dockerfile, compose | [link](technology/cloud/docker.md) | 1.3KB |
| kubernetes | k8s, pod, deployment, service | [link](technology/cloud/kubernetes.md) | 1.4KB |

### Languages

| Skill | Keywords | Path | Size |
|-------|----------|------|------|
| python-fundamentals | python, pip, virtualenv | [link](technology/languages/python-fundamentals.md) | 1.2KB |
| typescript | ts, types, interfaces | [link](technology/languages/typescript.md) | 1.1KB |

### Practices

| Skill | Keywords | Path | Size |
|-------|----------|------|------|
| code-review | review, PR, feedback | [link](technology/practices/code-review.md) | 1.0KB |
| ci-cd | pipeline, jenkins, github-actions | [link](technology/practices/ci-cd.md) | 1.2KB |

---

## 🏷️ Keyword Quick Reference

```
KEYWORD          →  SKILL(S)
────────────────────────────────────
algorithm        →  algorithm-design
api              →  rest-api, graphql
architecture     →  software-architecture, microservices
authentication   →  security-basics, oauth
aws              →  aws-fundamentals
ci-cd            →  ci-cd, devops
container        →  docker, kubernetes
database         →  postgresql, redis, mongodb
debugging        →  debugging, code-review
design           →  design-patterns, clean-code
docker           →  docker
git              →  version-control
kubernetes       →  kubernetes
performance      →  performance-optimization
python           →  python-fundamentals
react            →  react-fundamentals
security         →  security-basics
testing          →  testing-fundamentals, tdd
typescript       →  typescript
```

---

## 📊 Statistics

```yaml
total_skills: {N}
categories:
  academic: {N}
  technology: {N}
subcategories: {N}
average_size: "1.2KB"
last_added: "{skill-name} ({date})"
most_used: 
  - "{skill-1}: {count} uses"
  - "{skill-2}: {count} uses"
```

---

## 🔄 Recent Changes

| Date | Action | Skill | Notes |
|------|--------|-------|-------|
| {YYYY-MM-DD} | Added | {skill-name} | {breve nota} |
| {YYYY-MM-DD} | Updated | {skill-name} | {o que mudou} |
| {YYYY-MM-DD} | Deprecated | {skill-name} | {razão} |

---

## 📝 How to Add New Skill

1. **Gerar skill:** Use o Skill Generator ou crie manualmente
2. **Validar:** Execute `validate-skill.ps1` no arquivo
3. **Salvar:** Coloque em `skills/{category}/{subcategory}/{name}.md`
4. **Indexar:** Adicione entrada neste arquivo
5. **Commit:** `git commit -m "feat(skills): add {skill-name}"`

---

**Maintained by:** PromptOS Auto-Index | **Sync:** Manual + Auto-increment
