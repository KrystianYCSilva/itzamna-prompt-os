# Similarity Scoring — Multi-Signal Rubric

> **JIT sub-file de KNOWLEDGE-BASE.md**  
> Carregue quando precisa buscar skills ou avaliar similaridade entre um query e o registro.

**Governa:** FR-001, FR-002, FR-003 | **Contrato:** `specs/004-vector-db-rag/contracts/similarity-scoring.md`

---

## Entradas

| Entrada | Tipo | Origem |
|---------|------|--------|
| query | string | Pergunta do usuário OU resumo do draft candidato |
| skillRegistry | Skill[] | `.prompt-os/skills/INDEX.md` — colunas: name, category, tags, description, filePath |
| topN | integer | Quantos resultados retornar. **Default: 3** |

---

## Os 4 Sinais

Avalie cada sinal independentemente (0-100). Aplique na ordem.

### Sinal 1 — Name/Topic Overlap (peso 30%)

Compare nouns e verbs-chave do query contra o `name` da skill e sinónimos inferíveis da `description`.

| Score | Condição |
|-------|----------|
| 90-100 | Query contém o nome verbatim ou sinónimo direto (ex: "goroutine" → `go`) |
| 60-89 | Tópico do query claramente relacionado ao domínio (ex: "tarefas paralelas" → `go`) |
| 30-59 | Conexão tópica fraca; mesmo domínio, foco diferente |
| 0-29 | Sem conexão significativa |

### Sinal 2 — Tag Overlap (peso 30%)

Conta quantas `tags` da skill (inclui triggers, que são subset) aparecem no query ou são sinónimas.

| Score | Condição |
|-------|----------|
| 90-100 | ≥ 3 tags coincidem com termos do query |
| 60-89 | 2 tags coincidem |
| 30-59 | 1 tag coincide |
| 0-29 | 0 tags coincidem |

### Sinal 3 — Domain Match (peso 20%)

O domínio implícito do query (linguagem, paradigma, infra) condiz com a `category` da skill?

| Score | Condição |
|-------|----------|
| 80-100 | Category exata (ex: query sobre Go → skill `go`, category `linguagens`) |
| 40-79 | Category adjacente (ex: query sobre web servers → linguagem usada para servers) |
| 0-39 | Sem conexão de domínio |

### Sinal 4 — Description Keyword Overlap (peso 20%)

Extrai termos técnicos-chave do query. Quantos aparecem na `description` da skill?

| Score | Condição |
|-------|----------|
| 80-100 | ≥ 2 termos-chave do query na description |
| 40-79 | 1 termo aparece |
| 0-39 | 0 termos |

---

## Cálculo

```
finalScore = round(
    nameOverlap   × 0.30 +
    tagOverlap    × 0.30 +
    domainMatch   × 0.20 +
    descOverlap   × 0.20
)
```

Aplique para **cada** skill no INDEX. Ordene descrescente. Retorne top-N.

---

## Saídas

| Saída | Tipo | Notas |
|-------|------|-------|
| results | SimilarityScore[] | Ordenado decrescente; tamanho = min(topN, skills com score > 0) |
| gapDetected | boolean | `true` se zero skills com score ≥ 40 |

### Se gapDetected = true

Adicione uma linha à tabela episódica do MEMORY.md:

```
| {data hoje} | knowledge-gap | "{query original}" | open |
```

Não parafrase — use a query raw do usuário.

---

## Exemplo Calculado

**Query:** "Como rodar tarefas em paralelo no Go?"

| Skill | Name (30%) | Tags (30%) | Domain (20%) | Desc (20%) | Final |
|-------|-----------|------------|--------------|------------|-------|
| go | 85 | 90 | 90 | 80 | **87** |
| java | 35 | 60 | 40 | 40 | **43** |
| python | 40 | 30 | 40 | 30 | **35** |

Resultado: `[go:87, java:43, python:35]`. `gapDetected = false`.

---

*similarity-scoring | KNOWLEDGE-BASE JIT sub-file | SPEC-004*
