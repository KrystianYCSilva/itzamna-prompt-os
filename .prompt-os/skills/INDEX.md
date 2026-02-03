# SKILLS INDEX

> **Registry de todas as skills disponiveis no PromptOS.**  
> Voce (agente de IA) deve consultar este indice para saber quais skills carreagar (JIT).  
> Fonte de verdade: `skills/INDEX.md` (raiz do projeto).

---

## O QUE E UMA SKILL?

Uma skill define **COMO FAZER** algo especifico:

- **Instrucoes** - Passo a passo para executar a tarefa
- **Exemplos** - Casos praticos e executaveis
- **Constraints** - Limites e regras do dominio
- **Triggers** - Quando carregar automaticamente

---

## SKILLS DISPONIVEIS (21 total, 8 categorias)

### Frontend (3 skills)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| css-basico | Fundamentos de CSS: seletores, box model, posicionamento | L2 | `skills/frontend/css/css-basico/SKILL.md` |
| css-grid-layout-avancado | Layouts complexos com CSS Grid | L2 | `skills/frontend/css/css-grid-layout-avancado/SKILL.md` |
| html | Estrutura e semantica HTML | L1 | `skills/frontend/html/SKILL.md` |

### Backend (4 skills)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| api-rest | Design de APIs RESTful, HTTP methods, status codes | L2 | `skills/backend/api-rest/SKILL.md` |
| graphql | Schemas, queries, mutations e resolvers | L2 | `skills/backend/graphql/SKILL.md` |
| python-async-programming | Programacao assincrona com asyncio | L2 | `skills/backend/python-async-programming/SKILL.md` |
| typescript | Types, interfaces, generics, tsconfig | L2 | `skills/backend/typescript/SKILL.md` |

### Config (3 skills)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| java-properties | Arquivos .properties para Java/Spring | L1 | `skills/config/java-properties/SKILL.md` |
| json | Formato JSON para dados e configuracao | L1 | `skills/config/json/SKILL.md` |
| yaml-configuration-best-practices | YAML para configuracao e IaC | L2 | `skills/config/yaml-configuration-best-practices/SKILL.md` |

### Markup (3 skills)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| markdown | Formatacao de texto com Markdown | L1 | `skills/markup/markdown/SKILL.md` |
| xml | Estrutura e validacao XML | L1 | `skills/markup/xml/SKILL.md` |
| xslt | Transformacoes XML com XSLT | L2 | `skills/markup/xslt/SKILL.md` |

### DevOps (2 skills)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| docker | Containerizacao, multi-stage builds, docker-compose | L2 | `skills/devops/docker/SKILL.md` |
| git | Controle de versao com Git | L1 | `skills/devops/git/SKILL.md` |

### Docs (1 skill)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| technical-writing | Redacao tecnica e documentacao | L2 | `skills/docs/technical-writing/SKILL.md` |

### Linguagens de Programacao (6 skills)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| c-cpp | Fundamentos de C/C++: ponteiros, memoria manual, RAII, compilacao nativa | L1 | `.prompt-os/skills/linguagens/c-cpp/SKILL.md` |
| java | Fundamentos da linguagem Java: tipagem estatica, GC, threads, ecossistema JVM | L1 | `.prompt-os/skills/linguagens/java/SKILL.md` |
| java-11 | Features do Java 11 (LTS): var, HttpClient, String methods | L2 | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` |
| java-17 | Features do Java 17 (LTS): sealed classes, records, pattern matching, virtual threads | L2 | `.prompt-os/skills/linguagens/java/java-17/SKILL.md` |
| java-8-orientacao-objetos | Fundamentos de OOP em Java 8: classes, heranca, interfaces e polimorismo | L2 | `skills/linguagens-programacao/java/java-8-orientacao-objetos/SKILL.md` |
| javascript | Fundamentos de JavaScript: tipagem dinamica, event loop, async/await, npm | L1 | `.prompt-os/skills/linguagens/javascript/SKILL.md` |
| kotlin | Fundamentos da linguagem Kotlin: null safety, coroutines, multiplatforma (JVM/JS/Native) | L1 | `.prompt-os/skills/linguagens/kotlin/SKILL.md` |
| python | Fundamentos da linguagem Python: duck typing, GIL, asyncio, ecossistema pip/PyPI | L1 | `.prompt-os/skills/linguagens/python/SKILL.md` |

### Testing (1 skill)

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| hello-world-test | Skill de teste do sistema | L0 | `skills/testing/hello-world-test/SKILL.md` |

---

## ESTATISTICAS

| Metrica | Valor |
|---------|-------|
| Total de Skills | 24 |
| Aprovadas | 24 |
| Rascunho | 0 |
| Categorias | 8 |

---

## NIVEIS (Levels)

| Level | Descricao |
|-------|-----------|
| L0 | Teste/exemplo |
| L1 | Fundamentos - conhecimento basico |
| L2 | Intermediario - padroes e boas praticas |
| L3 | Avancado - otimizacao e casos complexos |

---

## COMO USAR

### 1. Identifique a Skill Necessaria

Baseado no pedido do usuario, identifique qual skill e relevante.

### 2. Consulte a Tabela

Use as tabelas acima para encontrar o nome e caminho.

### 3. Carregue a Skill (JIT)

```
Ler: skills/{categoria}/{nome}/SKILL.md
```

**NUNCA carregue todas as skills de uma vez!** Carregue apenas 2-5 relevantes.

### 4. Aplique as Instrucoes

Siga as instrucoes da skill para executar a tarefa.

---

## REDUNDANCY DETECTION

Quando gerando uma nova skill, compare com a tabela acima para detectar sobreposicao:

- **Name similarity (30%)**: Palavras comuns nos nomes
- **Tag overlap (30%)**: Tags compartilhadas
- **Domain match (20%)**: Mesma categoria
- **Description keywords (20%)**: Keywords comuns nas descricoes

**Threshold**: Reporte apenas se similarity >= 60%

---

## ADICIONAR NOVA SKILL

Para adicionar uma nova skill:

1. Criar pasta: `skills/{categoria}/{nome-da-skill}/`
2. Criar arquivo: `SKILL.md` seguindo `.prompt-os/templates/SKILL.template.md`
3. Atualizar `skills/INDEX.md` (raiz)
4. Atualizar este INDEX.md

**Ou use o brain.js:**
```bash
node .prompt-os/tools/brain.js generate skill "descricao da skill" --category {categoria}
```

---

## NOTAS

- Paths nos arquivos da tabela sao relativos à raiz do projeto
- Este INDEX é sincronizado com `skills/INDEX.md` na raiz
- Use este arquivo dentro dos protocolos `.prompt-os/core/`
- Para redundancy detection: compare nome, tags, dominio e keywords

---

*Sincronizado com skills/INDEX.md | Atualizado: 2026-02-03*
