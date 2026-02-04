---
name: core-prompts-skill-generator-prompt
description: "🔧 SKILL GENERATOR - Meta-Prompt v2.0"
---

# 🔧 SKILL GENERATOR - Meta-Prompt v2.0

> **Purpose:** Gerar skills completas a partir de pesquisa
> **For:** Agentes simples (Haiku, Flash, GPT-mini)
> **Complexity:** LOW - Instruções explícitas passo a passo

---

## 📋 INSTRUÇÕES PARA O AGENTE

Você vai gerar uma **skill completa** seguindo este protocolo exato.
Siga cada passo na ordem. Não pule etapas.

---

## PASSO 1: RECEBER INPUTS

Você precisa de:

```yaml
skill_name: "{nome em kebab-case, ex: kubernetes}"
category: "{academic | technology}"
subcategory: "{ex: cloud, web-mobile, fundamentals}"
research_file: "{path para pesquisa prévia, opcional}"
user_context: "{contexto adicional do usuário}"
```

**SE não tiver research_file:**
- Pule para PASSO 2A (pesquisa rápida)

**SE tiver research_file:**
- Vá para PASSO 2B (usar pesquisa existente)

---

## PASSO 2A: PESQUISA RÁPIDA (se necessário)

Execute estas buscas web:

```
Query 1: "{skill_name} official documentation"
Query 2: "{skill_name} best practices 2026"
Query 3: "{skill_name} common mistakes pitfalls"
```

**Extrair de cada resultado:**
- 3-5 conceitos principais
- 3-4 best practices
- 2-3 pitfalls comuns
- URLs das fontes (para citação)

**Criar resumo mental:**
```
Conceitos: [lista]
Práticas: [lista]
Pitfalls: [lista]
Fontes: [URLs]
```

Vá para PASSO 3.

---

## PASSO 2B: USAR PESQUISA EXISTENTE

**Ler arquivo de pesquisa:**
```
1. Abrir {research_file}
2. Extrair seção "Conceitos Identificados"
3. Extrair seção "Best Practices"
4. Extrair seção "Pitfalls Comuns"
5. Extrair seção "Fontes Consultadas"
```

Vá para PASSO 3.

---

## PASSO 3: GERAR YAML FRONTMATTER

**Copiar e preencher:**

```yaml
---
name: {skill_name}
description: |
  {Uma frase: O que é e para que serve}
  {Uma frase: Quando usar esta skill}
keywords:
  - {keyword principal (geralmente = skill_name)}
  - {sinônimo ou termo relacionado}
  - {termo técnico específico}
  - {ferramenta ou framework relacionado}
  - {caso de uso comum}
category: {category}
subcategory: {subcategory}
version: "3.5.0"
created: {data de hoje YYYY-MM-DD}
type: skill
---
```

**Regras para description:**
- Máximo 2-3 frases
- Primeira frase: O QUE é
- Segunda frase: QUANDO usar
- Sem jargão excessivo

**Regras para keywords:**
- Mínimo 3, máximo 7
- Incluir sinônimos comuns
- Incluir termos que usuários buscariam

---

## PASSO 4: GERAR SEÇÕES OBRIGATÓRIAS

### 4.1 Header (50 tokens)

```markdown
# {Skill Name em Title Case}

> **Quick Reference:** {Resumo em UMA linha, máx 15 palavras}
> **Use when:** {Caso de uso principal em 5-10 palavras}
```

**Exemplo:**
```markdown
# Kubernetes

> **Quick Reference:** Container orchestration platform for deploying and scaling applications
> **Use when:** Managing containerized workloads in production environments
```

---

### 4.2 When to Use (100 tokens)

````markdown
## When to Use

- ✅ {Use case 1 - começar com verbo de ação}
- ✅ {Use case 2 - ser específico, não genérico}
- ✅ {Use case 3 - mencionar cenário real}
- ✅ {Use case 4 - opcional}
- ❌ **NOT for:** {Anti-pattern - quando NÃO usar}
```

**Regras:**
- Começar cada item com verbo: "Designing", "Implementing", "Debugging"
- Ser específico: não "trabalhar com dados" mas "processar streams de eventos"
- Incluir 1 anti-pattern obrigatório

---

### 4.3 Core Concepts (600-800 tokens)

```markdown
## Core Concepts

### 1. {Nome do Conceito Principal}

{Explicação em 2-3 frases}

```
{Pseudocódigo ou exemplo de código}
STRUCTURE/FUNCTION/CLASS exemplo
    // comentários explicativos
```

### 2. {Nome do Segundo Conceito}

{Explicação em 2-3 frases}

```
{Código de exemplo}
```

### 3. {Nome do Terceiro Conceito}

{Explicação em 2-3 frases}

### 4. {Quarto Conceito - se necessário}

{Explicação breve}

### 5. {Quinto Conceito - se necessário}

{Explicação breve}
````

**Regras:**
- Mínimo 3 conceitos, máximo 5
- Cada conceito tem explicação + código/exemplo
- Pseudocódigo deve ser sintaticamente consistente
- NÃO copiar textos de documentação (parafrasear)

---

### 4.4 Best Practices (150 tokens)

```markdown
## Best Practices

1. **{Prática 1}:** {Descrição em uma frase}
2. **{Prática 2}:** {Descrição em uma frase}
3. **{Prática 3}:** {Descrição em uma frase}
4. **{Prática 4}:** {Opcional}
```

**Regras:**
- Práticas devem ser ACIONÁVEIS
- Evitar obviedades ("use boas práticas")
- Específico ao domínio da skill

---

### 4.5 Common Pitfalls (150 tokens)

```markdown
## Common Pitfalls

- ❌ **{Pitfall 1}:** {Por que é problema} → {Como evitar}
- ❌ **{Pitfall 2}:** {Por que é problema} → {Como evitar}
- ❌ **{Pitfall 3}:** {Opcional}
```

**Regras:**
- Mínimo 2 pitfalls
- Explicar POR QUE é problema
- Dar solução/prevenção

---

### 4.6 Related Skills (50 tokens)

```markdown
## Related Skills

- [{skill-relacionada-1}](../path/skill-1.md) - {relação em 3-5 palavras}
- [{skill-relacionada-2}](../path/skill-2.md) - {relação}
```

**Regras:**
- 2-4 skills relacionadas
- Explicar brevemente a relação

---

### 4.7 Examples Link (50 tokens)

```markdown
## Examples

📚 **Detailed implementations:**
→ [View {skill_name}-examples.md](../examples/{skill_name}-examples.md)
```

---

## PASSO 5: MONTAR ARQUIVO COMPLETO

**Juntar todas as seções na ordem:**

1. YAML frontmatter
2. Header + Quick Reference
3. When to Use
4. Core Concepts
5. Best Practices
6. Common Pitfalls
7. Related Skills
8. Examples link

---

## PASSO 6: AUTO-VALIDAÇÃO

**Antes de retornar, verificar:**

```
[ ] YAML tem 9 campos obrigatórios?
    - name, description, keywords, category, subcategory, 
      version, created, type
    
[ ] Nenhum placeholder restante?
    - Buscar: {, [AQUI:], [PENDENTE:], TODO
    
[ ] Seções obrigatórias presentes?
    - When to Use, Core Concepts, Best Practices, 
      Common Pitfalls, Related Skills, Examples
    
[ ] Token budget respeitado?
    - Total aproximado < 1400 tokens
    - Core Concepts < 800 tokens
    
[ ] Pseudocódigo válido?
    - Sintaxe consistente
    - Indentação correta
```

**SE algum check falhar:**
- Corrigir antes de retornar

---

## PASSO 7: RETORNAR OUTPUT

**Formato de saída:**

```markdown
---
[YAML FRONTMATTER COMPLETO]
---

# [TÍTULO]

> **Quick Reference:** [resumo]
> **Use when:** [uso]

## When to Use
[conteúdo]

## Core Concepts
[conteúdo]

## Best Practices
[conteúdo]

## Common Pitfalls
[conteúdo]

## Related Skills
[conteúdo]

## Examples
[link]
```

**NÃO incluir:**
- Explicações antes do arquivo
- Comentários após o arquivo
- Markdown code fences ao redor do arquivo inteiro

---

## 📌 EXEMPLO COMPLETO

**Input:**
```yaml
skill_name: "docker"
category: "technology"
subcategory: "cloud"
```

**Output esperado:**

````markdown
---
name: docker
description: |
  Containerization platform for packaging and running applications in isolated environments.
  Use for consistent deployments across development, testing, and production.
keywords:
  - docker
  - container
  - containerization
  - dockerfile
  - docker-compose
category: technology
subcategory: cloud
version: "3.5.0"
created: 2026-02-02
type: skill
---

# Docker

> **Quick Reference:** Container platform for packaging apps with their dependencies
> **Use when:** Ensuring consistent environments across dev, test, and production

## When to Use

- ✅ Packaging applications with all dependencies for deployment
- ✅ Creating reproducible development environments
- ✅ Running multiple isolated services on single host
- ✅ Building CI/CD pipelines with consistent builds
- ❌ **NOT for:** Running GUI applications or when VM isolation is required

## Core Concepts

### 1. Images and Containers

Images are immutable templates; containers are running instances.

```
STRUCTURE Image
    layers: LIST[Layer]      // Layered filesystem
    config: ImageConfig      // Env vars, CMD, ENTRYPOINT
    
STRUCTURE Container
    image: Image
    state: running | stopped | paused
    volumes: LIST[Mount]
    networks: LIST[Network]

FUNCTION run_container(image_name, options)
    image = pull_or_use_local(image_name)
    container = create_from_image(image, options)
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
    depends_on: [db]
  db:
    image: postgres:15
    volumes: [db_data:/var/lib/postgresql/data]
```

## Best Practices

1. **Use multi-stage builds:** Reduce image size by separating build and runtime
2. **One process per container:** Keep containers focused and composable
3. **Use .dockerignore:** Exclude unnecessary files from build context
4. **Pin versions:** Use specific tags, not `latest`

## Common Pitfalls

- ❌ **Running as root:** Security risk → Use USER directive
- ❌ **Large images:** Slow deploys → Use slim/alpine bases + multi-stage
- ❌ **Storing data in containers:** Data loss → Use volumes for persistence

## Related Skills

- [kubernetes](../cloud/kubernetes.md) - Container orchestration at scale
- [ci-cd](../practices/ci-cd.md) - Automated build and deploy pipelines

## Examples

📚 **Detailed implementations:**
→ [View docker-examples.md](../examples/docker-examples.md)
````

---

## ⚠️ NOTAS PARA AGENTES SIMPLES

1. **Siga a ordem dos passos** - não pule etapas
2. **Use o template exato** - não invente estruturas novas
3. **Verifique o output** - passo 6 é obrigatório
4. **Seja conciso** - respeite token budgets
5. **Cite fontes** - mencione de onde veio a informação

---

**Version:** 2.0.0 | **Compatibility:** Haiku, Flash, GPT-4o-mini, Gemini Flash
