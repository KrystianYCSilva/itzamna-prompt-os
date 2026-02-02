# 📄 SKILL.md Template

> **Location:** `/skills/{skill-name}/SKILL.md`
> **Format:** Diretório por skill, arquivo sempre `SKILL.md`

---

## TEMPLATE COMPLETO

````markdown
---
name: {skill-name}
description: |
  {Linha 1: O que é e propósito principal}
  {Linha 2: Quando usar esta skill}
keywords:
  - {keyword-1}
  - {keyword-2}
  - {keyword-3}
  - {keyword-4}
  - {keyword-5}
category: {academic | technology}
subcategory: {ver lista abaixo}
version: "3.5.0"
created: {YYYY-MM-DD}
type: skill
---

# {Skill Name}

> **Quick Reference:** {Resumo em uma linha}
> **Use when:** {Caso de uso em 5-10 palavras}

## When to Use

- ✅ {Use case 1 - específico e acionável}
- ✅ {Use case 2 - específico e acionável}
- ✅ {Use case 3 - específico e acionável}
- ❌ **NOT for:** {Anti-pattern ou uso incorreto}

## Core Concepts

### 1. {Conceito Principal}

{Explicação em 2-3 frases}

```
{Pseudocódigo ou exemplo}
```

### 2. {Segundo Conceito}

{Explicação}

```
{Código exemplo}
```

### 3. {Terceiro Conceito}

{Explicação}

## Best Practices

1. **{Prática 1}:** {Descrição}
2. **{Prática 2}:** {Descrição}
3. **{Prática 3}:** {Descrição}

## Common Pitfalls

- ❌ **{Pitfall 1}:** {Problema} → {Solução}
- ❌ **{Pitfall 2}:** {Problema} → {Solução}

## Related Skills

- [{skill-1}](../{skill-1}/SKILL.md) - {relação}
- [{skill-2}](../{skill-2}/SKILL.md) - {relação}

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder
````

---

## SUBCATEGORIAS VÁLIDAS

### Academic
```
fundamentals          # Algoritmos, estruturas de dados, matemática
software-engineering  # Design patterns, arquitetura, qualidade
programming-paradigms # OOP, FP, paradigmas
web-mobile           # Frontend, mobile, PWAs
systems              # SO, redes, distributed
data                 # Databases, big data, analytics
ai-ml                # Machine learning, deep learning
security             # Cybersecurity, criptografia
```

### Technology
```
cloud                # AWS, GCP, Azure, Kubernetes, Docker
languages            # Python, JS, Go, Rust, etc.
frameworks           # React, FastAPI, Spring, etc.
databases            # PostgreSQL, Redis, MongoDB
practices            # CI/CD, testing, DevOps
ai-tools             # LangChain, LlamaIndex, RAG
```

---

## ESTRUTURA DE DIRETÓRIO

```
skills/
├── {skill-name}/
│   ├── SKILL.md           # Arquivo principal (obrigatório)
│   ├── examples/          # Exemplos detalhados (opcional)
│   │   ├── example-1.md
│   │   └── example-2.md
│   └── assets/            # Imagens, diagramas (opcional)
│       └── diagram.png
```

---

## TOKEN BUDGET

| Seção | Tokens | Obrigatória |
|-------|--------|-------------|
| YAML Frontmatter | 100 | ✅ |
| Header + Quick Ref | 50 | ✅ |
| When to Use | 100 | ✅ |
| Core Concepts | 600-800 | ✅ |
| Best Practices | 150 | ✅ |
| Common Pitfalls | 150 | ✅ |
| Related Skills | 50 | ✅ |
| **TOTAL** | **1200-1400** | |

---

## EXEMPLO COMPLETO

**Path:** `/skills/docker/SKILL.md`

````markdown
---
name: docker
description: |
  Containerization platform for packaging applications with dependencies.
  Use for consistent environments across development, testing, and production.
keywords:
  - docker
  - container
  - dockerfile
  - docker-compose
  - containerization
category: technology
subcategory: cloud
version: "3.5.0"
created: 2026-02-02
type: skill
---

# Docker

> **Quick Reference:** Container platform for packaging apps with dependencies
> **Use when:** Ensuring consistent environments across dev/test/prod

## When to Use

- ✅ Packaging applications with all dependencies for deployment
- ✅ Creating reproducible development environments
- ✅ Running multiple isolated services on single host
- ✅ Building CI/CD pipelines with consistent builds
- ❌ **NOT for:** GUI applications or when VM-level isolation required

## Core Concepts

### 1. Images and Containers

Images are immutable templates; containers are running instances.

```
STRUCTURE Image
    layers: LIST[Layer]
    config: ImageConfig

STRUCTURE Container
    image: Image
    state: running | stopped
    volumes: LIST[Mount]

FUNCTION run(image_name)
    image = pull_or_cache(image_name)
    container = create(image)
    start(container)
    RETURN container.id
```

### 2. Dockerfile

Declarative build instructions for creating images.

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]
```

### 3. Docker Compose

Multi-container orchestration for local development.

```yaml
services:
  web:
    build: .
    ports: ["8000:8000"]
  db:
    image: postgres:15
    volumes: [db_data:/var/lib/postgresql/data]
```

## Best Practices

1. **Use multi-stage builds:** Separate build and runtime for smaller images
2. **One process per container:** Keep containers focused and composable
3. **Pin versions:** Use specific tags, never `latest` in production
4. **Use .dockerignore:** Exclude unnecessary files from build context

## Common Pitfalls

- ❌ **Running as root:** Security risk → Use `USER` directive
- ❌ **Storing data in container:** Data loss on restart → Use volumes
- ❌ **Large images:** Slow deploys → Use slim/alpine bases

## Related Skills

- [kubernetes](../kubernetes/SKILL.md) - Container orchestration at scale
- [ci-cd](../ci-cd/SKILL.md) - Automated pipelines with containers

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder
````

---

## CHECKLIST DE VALIDAÇÃO

```
[ ] Path correto: skills/{name}/SKILL.md
[ ] Nome do arquivo: SKILL.md (maiúsculo)
[ ] YAML tem 9 campos obrigatórios
[ ] Categoria válida: academic | technology
[ ] Subcategoria válida (ver lista)
[ ] Todas seções obrigatórias presentes
[ ] Nenhum placeholder {}, [AQUI:], [PENDENTE:]
[ ] Token total < 1400
[ ] Links relativos corretos: ../{skill}/SKILL.md
```

---

**Version:** 2.0.1 | **Format:** Corrigido para `/skills/{name}/SKILL.md`
