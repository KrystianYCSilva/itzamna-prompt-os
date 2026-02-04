# RAG Workflow — Retrieve → Augment → Generate

> **JIT sub-file de KNOWLEDGE-BASE.md**  
> Carregue quando está prestes a gerar uma nova skill. Executa antes de GENERATE no pipeline de 6 fases.

**Governa:** FR-004, SC-002 | **Contrato:** `specs/004-vector-db-rag/contracts/rag-workflow.md`

---

## Quando Executa

**Trigger:** Request "criar skill" chega após INPUT-CLASSIFIER rotear.  
**Input:** Tópico / descrição da skill a ser criada.  
**Output:** Bloco de contexto (2-3 skills de referência + regras estruturais) — consumido durante a geração, não aparece no output final.

---

## Step 1 — RETRIEVE

Executa similarity-scoring (`knowledge-base/similarity-scoring.md`) com o tópico solicitado como query. Seta `topN = 3`.

Filtra: mantém apenas skills com score ≥ 40. Se menos que 2 sobrar, usa o que tiver (mesmo 0 — Step 2 trata o caso vazio).

**Output:** `referenceSkills[]` — até 3 entradas com seus scores.

---

## Step 2 — AUGMENT

Monta o bloco de contexto que guiará a geração. Dois casos:

### Case A: referenceSkills não vazio (normal)

Para cada skill de referência, extrai da respectiva SKILL.md:
1. **Headings** — estrutura H2/H3
2. **Contagem de exemplos** — quantos exemplos funcionais contém
3. **Comparison table** — possui tabela cross-language ou cross-paradigm?
4. **Citation format** — usa minimal YAML array (padrão SPEC-003/SPEC-010)?

Produz o bloco de guia:

```
## RAG Reference Context

Você vai gerar uma nova skill. As skills abaixo são os matches mais próximos
no repositório. Reproduza a estrutura delas.

### Referência 1: {name} (similaridade: {score})
- Estrutura: {headings}
- Exemplos: {count}
- Tem comparison table: {sim/não}
- Citation format: {formato}

### Referência 2: {name} (similaridade: {score})
[mesmos campos]

### Regras estruturais (derivadas das referências):
- Sua skill DEVE ter estas seções: {união de todos os headings das referências}
- Sua skill DEVE ter pelo menos {max de exemplos entre as referências} exemplos
- {se alguma referência tem comparison table} Sua skill DEVE ter comparison table
- Citations DEVEM usar minimal YAML array
```

### Case B: referenceSkills vazio

Sem guia estrutural disponível. Caia no template canônico `.prompt-os/templates/SKILL.template.md`. Registre nota: RAG context indisponível para esta geração (útil para rastreamento SC-002).

---

## Step 3 — GENERATE

Gere o draft da nova skill com o bloco de contexto RAG ativo. O bloco **não faz parte do output** — é consumido durante a geração.

**Constraints no draft gerado:**
- Headings DEVEM respeitar as regras estruturais do Step 2
- Contagem de exemplos DEVE atingir ou superar o mínimo do Step 2
- Se comparison table foi requerida, DEVE estar presente
- Citations DEVEM usar minimal YAML array (convenção SPEC-003)
- Tamanho DEVE respeitar T0-SIZE-01 (≤ 1,400 tokens para o SKILL.md principal; overflow vai para JIT sub-files)

---

## Protocolo de Medição SC-002

Para validar que RAG realmente melhora qualidade, execute este A/B em 3 criações de skill:

1. Gere skill **com** RAG context (fluxo normal acima)
2. Gere a **mesma** skill **sem** RAG context (pule Steps 1-2; vá direto ao template)
3. Score ambos drafts com SELF-CRITIQUE (4 dimensões)
4. Registre o delta nas dimensões Clarity e Best Practices

**Target:** Draft com RAG score ≥ 5 pontos a mais em média nas duas dimensões.

---

## Exemplo Calculado

**Request:** "Criar skill baseline de Ruby"

**Step 1 (Retrieve):**
- Query: "Ruby baseline language skill"
- Scores: `python: 72`, `javascript: 68`, `java: 61`
- Todos ≥ 40 → referenceSkills = [python, javascript, java]

**Step 2 (Augment):**
- python: Core Concepts, Type System, Concurrency, Error Handling, Comparison Table, 8 exemplos
- javascript: Core Concepts, Async Model, Ecosystem, Error Handling, Comparison Table, 7 exemplos
- java: Core Concepts, OOP, Concurrency, Error Handling, Comparison Table, 9 exemplos
- Regras derivadas:
  - Seções: Core Concepts, OOP/Type System, Concurrency/Async, Error Handling, Comparison Table, Examples
  - Min exemplos: 9
  - Comparison table: obrigatório
  - Citations: minimal YAML array

**Step 3 (Generate):** Draft Ruby produzido com as regras ativas. Resultado: skill que "cabe" na biblioteca existente.

---

*rag-workflow | KNOWLEDGE-BASE JIT sub-file | SPEC-004*
