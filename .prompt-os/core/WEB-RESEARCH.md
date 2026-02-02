# WEB-RESEARCH - Pesquisa na Web

> **Instrucoes para voce (agente de IA) fazer pesquisa na web.**  
> Use estas diretrizes quando precisar buscar informacao externa.

---

## QUANDO USAR PESQUISA WEB

Use pesquisa web quando:

1. **Criar nova skill** que requer informacao atualizada
2. **Validar informacao** que pode estar desatualizada
3. **Buscar documentacao oficial** de tecnologias
4. **Encontrar best practices** para determinado topico
5. **Usuario solicita** explicitamente pesquisa

**NAO use** para:
- Informacao que voce ja conhece com confianca
- Topicos cobertos por skills existentes (consulte primeiro)
- Questoes de opiniao/preferencia

---

## FONTES CONFIAVEIS

### Hierarquia de Confiabilidade

| Tier | Tipo de Fonte | Exemplos | Confiabilidade |
|------|---------------|----------|----------------|
| **1** | Documentacao Oficial | kubernetes.io, reactjs.org, nodejs.org | Muito Alta |
| **2** | Organizacoes Oficiais | CNCF, W3C, OWASP, IEEE | Muito Alta |
| **3** | Repositorios GitHub Oficiais | github.com/facebook/react | Alta |
| **4** | Repos GitHub Populares | >1000 stars, ativo recentemente | Media-Alta |
| **5** | Stack Overflow | Respostas aceitas, alto score | Media |
| **6** | Blogs Tech Reconhecidos | Martin Fowler, Kent C. Dodds | Media |
| **7** | Tutoriais Gerais | Medium, Dev.to | Baixa-Media |

### Dominios Oficiais por Tecnologia

```yaml
# Frontend
react: reactjs.org, react.dev
vue: vuejs.org
angular: angular.io
next: nextjs.org

# Backend
node: nodejs.org
python: python.org, docs.python.org
go: golang.org, go.dev
rust: rust-lang.org

# DevOps/Cloud
kubernetes: kubernetes.io
docker: docker.com, docs.docker.com
aws: docs.aws.amazon.com
azure: docs.microsoft.com/azure
gcp: cloud.google.com/docs

# Databases
postgres: postgresql.org
mongodb: mongodb.com/docs
redis: redis.io

# Security
owasp: owasp.org
```

---

## PROTOCOLO DE PESQUISA

### Fase 1: Planejar Pesquisa

Antes de pesquisar, defina:

```
1. O que preciso saber? (objetivo claro)
2. Quais fontes oficiais existem? (docs oficiais)
3. O que ja sei sobre o topico? (conhecimento base)
4. Qual nivel de profundidade? (overview vs detalhado)
```

### Fase 2: Executar Busca

Se voce tem acesso a web search:

```
ESTRATEGIA DE BUSCA:

1. PRIMEIRA busca: "{tecnologia} official documentation"
   -> Objetivo: Encontrar docs oficiais

2. SEGUNDA busca: "{tecnologia} best practices {ano}"
   -> Objetivo: Encontrar praticas atualizadas

3. TERCEIRA busca: "{tecnologia} {caso_especifico} example"
   -> Objetivo: Encontrar exemplos praticos

4. SE NECESSARIO: "site:github.com {tecnologia} {caso}"
   -> Objetivo: Encontrar implementacoes reais
```

### Fase 3: Validar Resultados

Para cada resultado encontrado, verifique:

```
[ ] Data: Publicado nos ultimos 2 anos?
[ ] Fonte: E fonte oficial ou reconhecida?
[ ] Autor: Tem credibilidade na area?
[ ] Atualizacao: Conteudo parece atualizado?
[ ] Consenso: Outras fontes confirmam?
```

### Fase 4: Sintetizar

Ao consolidar informacao:

```
1. Priorize fontes oficiais
2. Cross-reference entre multiplas fontes
3. Identifique conflitos e mencione-os
4. Cite as fontes usadas
5. Indique nivel de confianca
```

---

## SE VOCE NAO TEM ACESSO A WEB

Se voce NAO pode fazer web search diretamente:

### Opcao 1: Usar Conhecimento Base

```
"Baseado no meu conhecimento (ate minha data de corte):

{informacao}

NOTA: Recomendo verificar a documentacao oficial em {url}
para garantir que a informacao esta atualizada."
```

### Opcao 2: Pedir ao Usuario

```
"Para garantir informacao atualizada sobre {topico}, 
recomendo consultar:

1. {url_oficial} - Documentacao oficial
2. {url_github} - Repositorio oficial

Gostaria que eu:
1. Continue com meu conhecimento base
2. Aguarde voce verificar e me passar informacao
3. Crie a skill marcando para revisao posterior"
```

### Opcao 3: Marcar para Revisao

```
---
# Skill gerada SEM pesquisa web
# REQUER REVISAO antes de uso em producao
status: needs_review
sources: knowledge_base_only
---
```

---

## FORMATANDO RESULTADOS DE PESQUISA

### Estrutura Padrao

```markdown
## Resultado da Pesquisa: {topico}

### Fontes Consultadas
| Fonte | Tipo | Data | Confiabilidade |
|-------|------|------|----------------|
| {url1} | Docs Oficial | {data} | Alta |
| {url2} | GitHub | {data} | Media-Alta |

### Descobertas Principais

#### 1. {Conceito 1}
{Explicacao}
**Fonte:** {url}

#### 2. {Conceito 2}
{Explicacao}
**Fonte:** {url}

### Best Practices Identificadas
1. {pratica1} - Fonte: {url}
2. {pratica2} - Fonte: {url}

### Padroes a Evitar
1. {antipadrao1} - Por que: {razao}
2. {antipadrao2} - Por que: {razao}

### Exemplos de Codigo
\`\`\`{linguagem}
// Fonte: {url}
{codigo}
\`\`\`

### Confianca
{nivel}: {justificativa}
```

---

## NIVEIS DE CONFIANCA

### Como Classificar

| Nivel | Quando Usar | Indicador Visual |
|-------|-------------|------------------|
| **Alta** | Docs oficiais + exemplos testados | ✓✓✓ |
| **Media-Alta** | Multiplas fontes confiaveis | ✓✓ |
| **Media** | Fontes secundarias, consenso | ✓ |
| **Baixa** | Fonte unica ou desatualizada | ⚠ |
| **Incerta** | Informacao conflitante | ❓ |

### Como Comunicar

```
# Alta Confianca
"De acordo com a documentacao oficial de {tecnologia}..."

# Media-Alta Confianca
"Baseado em multiplas fontes confiaveis, incluindo {fonte1} e {fonte2}..."

# Media Confianca
"Fontes secundarias indicam que..."

# Baixa Confianca
"NOTA: Esta informacao e baseada em {fonte} de {data}. 
Recomendo verificar se ainda e valido."

# Incerta
"Ha informacoes conflitantes sobre este topico:
- {fonte1} diz: {X}
- {fonte2} diz: {Y}
Recomendo testar ou consultar fonte mais recente."
```

---

## CACHE DE PESQUISA

### Quando Reutilizar

Se voce fez pesquisa recente sobre o topico:

```
"Encontrei informacao sobre {topico} na pesquisa de {data}:
{resumo}

Gostaria que eu:
1. Use esta informacao
2. Faca nova pesquisa para atualizar"
```

### Validade do Cache

| Tipo de Informacao | Validade |
|--------------------|----------|
| Conceitos fundamentais | 2 anos |
| Best practices | 1 ano |
| Versoes/APIs | 6 meses |
| Tutoriais/Exemplos | 1 ano |
| Security/Vulnerabilidades | 1 mes |

---

## PARA GERACAO DE SKILLS

### Estrutura de Pesquisa para Skills

Ao pesquisar para criar skill:

```
1. DOCUMENTACAO OFICIAL
   - URL principal
   - Guia de inicio rapido
   - Referencia de API

2. BEST PRACTICES
   - Padroes recomendados
   - Antipadroes a evitar
   - Configuracoes de producao

3. EXEMPLOS PRATICOS
   - Hello World
   - Caso de uso comum
   - Caso avancado

4. TROUBLESHOOTING
   - Erros comuns
   - Solucoes conhecidas
   - FAQs
```

### Citando Fontes na Skill

```yaml
# No frontmatter da skill
sources:
  - url: "https://kubernetes.io/docs/"
    type: "official_docs"
    accessed: "2026-02-02"
  - url: "https://github.com/kubernetes/examples"
    type: "github"
    accessed: "2026-02-02"
```

---

## EXEMPLO COMPLETO

### Cenario: Pesquisar para Skill de Redis

```
Usuario: "Crie uma skill para Redis caching"

Agente (voce):

1. PLANEJAR:
   - Objetivo: Criar skill de caching com Redis
   - Fonte oficial: redis.io
   - Conhecimento base: Tenho fundamentos
   - Profundidade: Intermediario

2. PESQUISAR (se tiver acesso):
   - Busca 1: "redis caching official documentation"
   - Busca 2: "redis caching best practices 2026"
   - Busca 3: "redis cache patterns examples"

3. VALIDAR:
   - redis.io/docs - Oficial, atualizado ✓
   - github.com/redis/redis - Oficial ✓
   - stackoverflow redis caching - Verificar data ⚠

4. SINTETIZAR:
   "Pesquisa concluida para Redis caching:
   
   Fontes principais:
   - redis.io/docs/latest/develop/use/client-side-caching/
   - redis.io/docs/latest/commands/
   
   Padroes identificados:
   - Cache-aside pattern (mais comum)
   - TTL obrigatorio para evitar stale data
   - Evitar keys muito grandes
   
   Confianca: Alta (documentacao oficial)"

5. GERAR SKILL com informacoes pesquisadas
```

---

## LIMITACOES

### Reconheca Quando Nao Sabe

```
"Nao consegui encontrar informacao confiavel sobre {topico}.

Possiveis razoes:
- Tecnologia muito nova
- Termo especifico do seu projeto
- Documentacao limitada

Sugestoes:
1. Verifique a documentacao oficial diretamente
2. Consulte a comunidade (Discord, Slack, Forum)
3. Me passe informacao e eu ajudo a estruturar"
```

### Informacao Desatualizada

```
"Encontrei informacao sobre {topico}, porem:

⚠ ATENCAO: A fonte mais recente e de {data}.
Para {tecnologia} que evolui rapidamente, recomendo
verificar se ainda e valido na versao atual.

Documentacao oficial: {url}"
```

---

*Fim do Web-Research Protocol. Use para pesquisar informacao externa de forma estruturada.*
