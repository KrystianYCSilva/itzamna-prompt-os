# Skills do Itzamna PromptOS

> Biblioteca de skills geradas pelo sistema auto-evolutivo.
> Cada skill segue o formato canonico definido em `.prompt-os/templates/SKILL.template.md`.
> Skills organizadas por categoria para facilitar navegacao.

## Estrutura

```
skills/
├── INDEX.md
├── frontend/     # HTML, CSS, JavaScript, frameworks
├── backend/      # APIs, GraphQL, async programming
├── config/       # YAML, JSON, properties, env files
├── markup/       # XML, XSLT, Markdown
├── devops/       # Git, CI/CD, Docker, Kubernetes
├── docs/         # Technical writing, documentation
├── testing/      # Test skills, examples
└── linguagens-programacao/  # Java, Python, Go, etc.
```

## Indice por Categoria

### Frontend (3 skills)

| Nome | Descricao                                                | Status | Level |
|------|----------------------------------------------------------|--------|-------|
| [css-basico](frontend/css-basico/SKILL.md) | Fundamentos de CSS: seletores, box model, posicionamento | approved | L2    |
| [css-grid-layout-avancado](frontend/css-grid-layout-avancado/SKILL.md) | Layouts complexos com CSS Grid                           | approved | L2    |
| [css](frontend/css) | Pasta para organizar skills do css                       | approved | L1    |
| [html](frontend/html/SKILL.md) | Estrutura e semantica HTML                               | approved | L1    |

### Backend (4 skills)

| Nome | Descricao | Status | Level |
|------|-----------|--------|-------|
| [api-rest](backend/api-rest/SKILL.md) | Design de APIs RESTful, HTTP methods, status codes | approved | L2 |
| [graphql](backend/graphql/SKILL.md) | Schemas, queries, mutations e resolvers | approved | L2 |
| [python-async-programming](backend/python-async-programming/SKILL.md) | Programacao assincrona com asyncio | approved | L2 |
| [typescript](backend/typescript/SKILL.md) | Types, interfaces, generics, tsconfig | approved | L2 |

### Config (3 skills)

| Nome | Descricao | Status | Level |
|------|-----------|--------|-------|
| [java-properties](config/java-properties/SKILL.md) | Arquivos .properties para Java/Spring | approved | L1 |
| [json](config/json/SKILL.md) | Formato JSON para dados e configuracao | approved | L1 |
| [yaml-configuration-best-practices](config/yaml-configuration-best-practices/SKILL.md) | YAML para configuracao e IaC | approved | L2 |

### Markup (3 skills)

| Nome | Descricao | Status | Level |
|------|-----------|--------|-------|
| [markdown](markup/markdown/SKILL.md) | Formatacao de texto com Markdown | approved | L1 |
| [xml](markup/xml/SKILL.md) | Estrutura e validacao XML | approved | L1 |
| [xslt](markup/xslt/SKILL.md) | Transformacoes XML com XSLT | approved | L2 |

### DevOps (2 skills)

| Nome | Descricao | Status | Level |
|------|-----------|--------|-------|
| [docker](devops/docker/SKILL.md) | Containerizacao, multi-stage builds, docker-compose | approved | L2 |
| [git](devops/git/SKILL.md) | Controle de versao com Git | approved | L1 |

### Docs (1 skill)

| Nome | Descricao | Status | Level |
|------|-----------|--------|-------|
| [technical-writing](docs/technical-writing/SKILL.md) | Redacao tecnica e documentacao | approved | L2 |

### Linguagens de Programacao (2 skills)

| Nome | Descricao | Status | Level |
|------|-----------|--------|-------|
| [java](linguagens-programacao/java/SKILL.md) | Fundamentos da linguagem Java: tipagem estatica, GC, threads, ecossistema JVM | approved | L1 |
| [java-8-orientacao-objetos](linguagens-programacao/java/java-8-orientacao-objetos/SKILL.md) | Fundamentos de OOP em Java 8: classes, heranca, interfaces e polimorismo | approved | L2 |

### Testing (1 skill)

| Nome | Descricao | Status | Level |
|------|-----------|--------|-------|
| [hello-world-test](testing/hello-world-test/SKILL.md) | Skill de teste do sistema | approved | L0 |

---

## Estatisticas

- **Total de Skills:** 19
- **Aprovadas:** 19
- **Rascunho:** 0
- **Categorias:** 8

## Niveis (Levels)

- **L0:** Teste/exemplo
- **L1:** Fundamentos - conhecimento basico
- **L2:** Intermediario - padroes e boas praticas
- **L3:** Avancado - otimizacao e casos complexos

## Adicionar Nova Skill

```bash
# Via CLI do brain.js
node .prompt-os/scripts/brain.js generate skill "descricao da skill" --category frontend

# Categorias disponiveis: frontend, backend, config, markup, devops, docs, testing
```

---

*Atualizado: 2026-02-02*
