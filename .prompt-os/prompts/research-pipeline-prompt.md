# 🔍 RESEARCH PIPELINE - Meta-Prompt v2.0

> **Purpose:** Pesquisar e compilar informações antes de gerar skills/personas
> **For:** Agentes com acesso a web search
> **Output:** Arquivo research-{topic}.md

---

## 📋 INSTRUÇÕES PARA O AGENTE

Você vai **pesquisar um tópico** e compilar informações estruturadas.
Este arquivo será usado pelo Skill Generator para criar skills de qualidade.

---

## PASSO 1: RECEBER INPUT

```yaml
topic: "{tópico a pesquisar, ex: kubernetes}"
category: "{academic | technology}"
depth: "{quick | standard | deep}"
user_context: "{contexto adicional, opcional}"
```

**Níveis de profundidade:**
- `quick`: 2-3 buscas, resumo básico (5 min)
- `standard`: 4-5 buscas, análise moderada (15 min)
- `deep`: 7-10 buscas, análise completa (30 min)

---

## PASSO 2: GERAR QUERIES DE BUSCA

**Para depth = quick:**
```
Query 1: "{topic} official documentation"
Query 2: "{topic} best practices"
```

**Para depth = standard:**
```
Query 1: "{topic} official documentation"
Query 2: "{topic} best practices 2025 2026"
Query 3: "{topic} common mistakes pitfalls"
Query 4: "{topic} vs alternatives comparison"
```

**Para depth = deep:**
```
Query 1: "{topic} official documentation"
Query 2: "{topic} best practices 2025 2026"
Query 3: "{topic} common mistakes pitfalls"
Query 4: "{topic} vs alternatives comparison"
Query 5: "{topic} architecture patterns"
Query 6: "{topic} security considerations"
Query 7: "{topic} performance optimization"
Query 8: "{topic} real world case studies"
```

---

## PASSO 3: EXECUTAR BUSCAS

**Para cada query:**
1. Executar web search
2. Analisar top 3-5 resultados
3. Extrair informações relevantes
4. Anotar URL e confiabilidade da fonte

**Níveis de confiabilidade:**
```
★★★ T0: Documentação oficial, papers peer-reviewed
★★☆ T1: Livros técnicos, blogs de empresas reconhecidas
★☆☆ T2: Tutoriais, blogs pessoais de experts
☆☆☆ T3: Fórums, StackOverflow, discussões
```

---

## PASSO 4: COMPILAR RESULTADOS

### 4.1 Criar Header

```markdown
---
topic: {topic}
date: {YYYY-MM-DD}
depth: {depth}
status: complete
sources_count: {N}
confidence: {high | medium | low}
---

# Pesquisa: {Topic Name}

## Objetivo

{Por que esta pesquisa foi iniciada - 1-2 frases}
```

### 4.2 Listar Fontes

```markdown
## Fontes Consultadas

### Fonte 1: {Nome da Fonte}
- **URL:** {link completo}
- **Tipo:** {documentação oficial | paper | livro | blog | tutorial | forum}
- **Confiabilidade:** {★★★ | ★★☆ | ★☆☆ | ☆☆☆}
- **Data:** {data de publicação se disponível}
- **Resumo:** {2-3 frases do que foi extraído}

### Fonte 2: {Nome}
...
```

**Mínimo de fontes por depth:**
- quick: 2 fontes
- standard: 4 fontes
- deep: 6+ fontes

### 4.3 Extrair Conceitos

```markdown
## Conceitos Identificados

### 1. {Conceito Principal}
**Definição:** {O que é em 1-2 frases}
**Fonte:** {Qual fonte}
**Importância:** {Por que é importante para a skill}

### 2. {Segundo Conceito}
**Definição:** {descrição}
**Fonte:** {fonte}
**Importância:** {relevância}

### 3. {Terceiro Conceito}
...
```

**Regras:**
- Mínimo 3 conceitos, máximo 7
- Cada conceito deve ter fonte citada
- Priorizar conceitos mais fundamentais

### 4.4 Compilar Best Practices

```markdown
## Best Practices (da indústria)

1. **{Prática 1}** - {Descrição} (Fonte: {X})
2. **{Prática 2}** - {Descrição} (Fonte: {Y})
3. **{Prática 3}** - {Descrição} (Fonte: {Z})
4. **{Prática 4}** - {Opcional}
```

**Regras:**
- Mínimo 3 práticas
- Cada prática deve ser acionável
- Citar fonte

### 4.5 Compilar Pitfalls

```markdown
## Pitfalls Comuns

1. **{Pitfall 1}:** {Descrição do problema} → {Consequência}
   - Fonte: {X}
   - Prevenção: {Como evitar}

2. **{Pitfall 2}:** {Descrição}
   - Fonte: {Y}
   - Prevenção: {Como evitar}
```

**Regras:**
- Mínimo 2 pitfalls
- Incluir consequência do erro
- Incluir prevenção

### 4.6 Mapear Skills Relacionadas

```markdown
## Skills Relacionadas Existentes

| Skill | Path | Relevância |
|-------|------|------------|
| {skill-1} | skills/path/skill-1.md | {Alta/Média/Baixa} - {por que} |
| {skill-2} | skills/path/skill-2.md | {relevância} |
```

**Se não existir skill relacionada:**
```markdown
## Skills Relacionadas Existentes

Nenhuma skill diretamente relacionada encontrada no INDEX.md.
Skills que PODERIAM ser criadas junto:
- {skill-sugerida-1}: {descrição}
- {skill-sugerida-2}: {descrição}
```

### 4.7 Recomendação Final

```markdown
## Recomendação

**Ação sugerida:** {criar skill nova | expandir skill existente | não necessário | criar múltiplas}

**Justificativa:** {1-2 frases explicando a recomendação}

**Prioridade:** {alta | média | baixa}

**Estimativa de esforço:** {quick: 10min | standard: 30min | complex: 1h+}
```

---

## PASSO 5: SALVAR ARQUIVO

**Localização:** `docs/pesquisa-previa/research-{topic}.md`

**Naming convention:**
- Usar kebab-case
- Prefixo "research-"
- Exemplo: `research-kubernetes.md`

---

## 📌 EXEMPLO COMPLETO

**Input:**
```yaml
topic: "kubernetes"
category: "technology"
depth: "standard"
```

**Output:**

```markdown
---
topic: kubernetes
date: 2026-02-02
depth: standard
status: complete
sources_count: 5
confidence: high
---

# Pesquisa: Kubernetes

## Objetivo

Coletar informações para criar skill de Kubernetes focada em conceitos fundamentais e práticas de produção para desenvolvedores.

## Fontes Consultadas

### Fonte 1: Kubernetes Official Documentation
- **URL:** https://kubernetes.io/docs/concepts/
- **Tipo:** documentação oficial
- **Confiabilidade:** ★★★
- **Resumo:** Documentação completa de conceitos, arquitetura e APIs. Fonte primária para definições de Pod, Service, Deployment, etc.

### Fonte 2: CNCF Kubernetes Best Practices
- **URL:** https://www.cncf.io/blog/kubernetes-best-practices/
- **Tipo:** blog oficial (CNCF)
- **Confiabilidade:** ★★★
- **Resumo:** Práticas recomendadas pela Cloud Native Computing Foundation para produção.

### Fonte 3: Kubernetes Patterns (O'Reilly)
- **URL:** https://www.oreilly.com/library/view/kubernetes-patterns/
- **Tipo:** livro técnico
- **Confiabilidade:** ★★☆
- **Resumo:** Padrões de design para aplicações cloud-native em Kubernetes.

### Fonte 4: "Kubernetes the Hard Way"
- **URL:** https://github.com/kelseyhightower/kubernetes-the-hard-way
- **Tipo:** tutorial
- **Confiabilidade:** ★★☆
- **Resumo:** Tutorial detalhado que explica cada componente internamente.

### Fonte 5: StackOverflow - Kubernetes Common Issues
- **URL:** https://stackoverflow.com/questions/tagged/kubernetes
- **Tipo:** forum
- **Confiabilidade:** ★☆☆
- **Resumo:** Problemas comuns enfrentados por desenvolvedores iniciantes.

## Conceitos Identificados

### 1. Pod
**Definição:** Menor unidade deployável em Kubernetes, contendo um ou mais containers que compartilham storage e network.
**Fonte:** kubernetes.io/docs
**Importância:** Conceito fundamental - tudo em K8s é baseado em Pods.

### 2. Service
**Definição:** Abstração que define um conjunto lógico de Pods e política de acesso (load balancing).
**Fonte:** kubernetes.io/docs
**Importância:** Essencial para comunicação entre componentes e exposição externa.

### 3. Deployment
**Definição:** Controller que gerencia ReplicaSets e permite declarar estado desejado para Pods.
**Fonte:** kubernetes.io/docs
**Importância:** Principal forma de deployar aplicações stateless.

### 4. ConfigMap e Secret
**Definição:** Objetos para armazenar configuração (ConfigMap) e dados sensíveis (Secret) separados do código.
**Fonte:** kubernetes.io/docs
**Importância:** Separação de config/código é best practice fundamental.

### 5. Ingress
**Definição:** API object que gerencia acesso externo HTTP/HTTPS aos services do cluster.
**Fonte:** kubernetes.io/docs
**Importância:** Principal forma de expor aplicações web para internet.

## Best Practices (da indústria)

1. **Use namespaces para isolamento** - Separar ambientes (dev, staging, prod) e times em namespaces diferentes. (Fonte: CNCF)
2. **Defina resource limits sempre** - Especificar requests e limits de CPU/memory para evitar noisy neighbors. (Fonte: kubernetes.io)
3. **Use liveness e readiness probes** - Kubernetes precisa saber quando container está saudável e pronto. (Fonte: CNCF)
4. **Prefira Deployments sobre Pods raw** - Controllers gerenciam lifecycle automaticamente. (Fonte: Kubernetes Patterns)
5. **Externalize configuração** - Nunca hardcode configs em imagens. (Fonte: 12-factor app)

## Pitfalls Comuns

1. **Não definir resource limits:** Containers podem consumir todos recursos do node
   - Fonte: StackOverflow
   - Prevenção: Sempre definir requests e limits em todos containers

2. **Usar :latest tag em produção:** Builds não reproduzíveis, rollbacks impossíveis
   - Fonte: CNCF
   - Prevenção: Usar tags específicas com SHA ou semver

3. **Ignorar probes:** Kubernetes não sabe se app está healthy
   - Fonte: kubernetes.io
   - Prevenção: Implementar endpoints /health e /ready

## Skills Relacionadas Existentes

| Skill | Path | Relevância |
|-------|------|------------|
| docker | skills/technology/cloud/docker.md | Alta - Kubernetes orquestra containers |
| ci-cd | skills/technology/practices/ci-cd.md | Média - Deploy pipelines usam K8s |

## Recomendação

**Ação sugerida:** criar skill nova

**Justificativa:** Docker já existe como skill de containers, mas não há skill específica de orquestração. Kubernetes é ferramenta fundamental para cloud-native.

**Prioridade:** alta

**Estimativa de esforço:** standard: 30min (conceitos bem documentados)
```

---

## ⚠️ NOTAS IMPORTANTES

1. **Priorize fontes oficiais** - Documentação oficial > blogs > fórums
2. **Cite TUDO** - Cada conceito, prática e pitfall deve ter fonte
3. **Seja objetivo** - Pesquisa é para coletar fatos, não opiniões
4. **Não invente** - Se não encontrou, diga que não encontrou
5. **Atualize datas** - Tecnologia muda, preferir fontes recentes

---

**Version:** 2.0.0 | **Requires:** Web Search capability
