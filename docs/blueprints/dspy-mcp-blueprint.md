# Blueprint: PromptOS via DSPy + MCP/CLI Plugins

## Objetivo
Evoluir o PromptOS de "prompt-only" para um sistema programatico baseado em DSPy, integrado como MCP ou plugins para CLIs existentes (ex.: Claude Code, Codex CLI, Gemini CLI, Cursor), mantendo compatibilidade com os protocolos atuais (T0/T1/T2) e o Human Gate.

## Visao Geral
- **Core**: motor DSPy que interpreta e executa os protocolos do PromptOS.
- **Integracao**: exposto via MCP Server e/ou plugins especificos para CLIs.
- **Ferramentas Externas**: conectores para Web Search (Tavily/Perplexity), RAG, lint/test, etc.
- **Governanca**: Human Gate obrigatorio para qualquer escrita/commit.

## Diagrama de Fluxo (macro)

```
User Input (CLI/MCP)
        |
        v
  Input Classifier  ---> JIT Loader ---> Skill Retriever
        |                   |                |
        v                   v                v
  DSPy Generate ------> Self-Critique ---> Human Gate
                                    |
                                    v
                              Approved?
                               |     |
                               v     v
                           Persist  Reject
                              |
                              v
                          Memory Update
```

## Componentes Principais

### 1. Orquestrador (Python)
Responsavel por executar a sequencia obrigatoria:
AUTO-INCREMENT -> GENERATE -> SELF-CRITIQUE -> HUMAN-GATE -> COMMIT

### 2. Loader JIT
Implementa o carregamento sob demanda:
- Kernel: CONSTITUTION.md, MEMORY.md, AGENTS.md
- Core: INPUT-CLASSIFIER.md + Persona
- Skills: 2-5 skills por tarefa

### 3. Input Classifier
- Regra deterministica + DSPy Predict fallback
- Saida: workflow, persona, skills, complexidade

### 4. Knowledge Base / Similarity Scoring
Implementa o scoring de 4 sinais:
- Name/Topic (30%), Tag Overlap (30%), Domain (20%), Keywords (20%)

### 5. RAG Workflow
Retrieve -> Augment -> Generate
- Se nao houver skill similar, usar template canonico

### 6. Self-Critique
Gera YAML com score, dimensoes e checagem T0

### 7. Human Gate
Mostra preview ao humano, aguarda approve/view/edit/reject/cancel

### 8. Memory Manager
Atualiza MEMORY.md + memory/{agent}-memory.md apos acoes significativas

## MCP Server (Python)

### Endpoints sugeridos
- `POST /classify`
- `POST /retrieve`
- `POST /generate`
- `POST /critique`
- `POST /gate`
- `POST /persist`
- `POST /memory`

### Exemplo de Payloads (request/response)

#### 1) /classify
Request:
```json
{
  "user_message": "Quero criar um endpoint REST para listar usuarios",
  "context": {
    "loaded": ["CONSTITUTION.md", "MEMORY.md", "AGENTS.md"]
  }
}
```

Response:
```json
{
  "workflow": "card_generation",
  "persona": "Product Owner",
  "skills": ["requirements-gathering", "card-templates", "api-design"],
  "complexity": "L2"
}
```

#### 2) /retrieve
Request:
```json
{
  "query": "api-design pagination",
  "top_n": 3,
  "threshold": 40
}
```

Response:
```json
{
  "matches": [
    { "skill": "api-design", "score": 78 },
    { "skill": "rest-patterns", "score": 64 }
  ],
  "gap": false
}
```

#### 3) /generate
Request:
```json
{
  "workflow": "card_generation",
  "persona": "Product Owner",
  "skills": ["requirements-gathering", "card-templates"],
  "context_snippets": ["..."],
  "constraints": ["T0-HUMAN-01", "T0-SIZE-01"]
}
```

Response:
```json
{
  "artifact": {
    "type": "documentation",
    "title": "CARD-XXX",
    "content": "..."
  }
}
```

#### 4) /critique
Request:
```json
{
  "artifact": { "type": "documentation", "content": "..." },
  "constitution": "..."
}
```

Response:
```json
{
  "critique": {
    "score": 91,
    "band": "Excellent",
    "dimensions": {
      "completeness": 23,
      "clarity": 24,
      "correctness": 22,
      "best_practices": 22
    },
    "constitution_check": { "t0_violations": 0, "t1_warnings": 0 }
  }
}
```

#### 5) /gate
Request:
```json
{
  "artifact": { "title": "CARD-XXX", "content": "..." },
  "critique": { "score": 91, "band": "Excellent" }
}
```

Response:
```json
{
  "status": "pending_human",
  "actions": ["approve", "view", "edit", "reject", "cancel"]
}
```

## Plugins para CLIs (JS/TS)

### Camada de integracao
- Plugin escuta eventos do CLI (input, output, actions).
- Encaminha requests para MCP Server.
- Apresenta Human Gate para aprovacao humana.

## Web Research (Tavily / Perplexity)

### Adaptadores
- `TavilyAdapter` (Python)
- `PerplexityAdapter` (Python)

### Interfaces (sugestao)
Request:
```json
{
  "query": "DSPy documentation",
  "source": "tavily",
  "max_results": 5
}
```

Response:
```json
{
  "results": [
    {
      "title": "DSPy Official Docs",
      "url": "...",
      "snippet": "...",
      "score": 95,
      "tier": "T1"
    }
  ]
}
```

### Uso no fluxo
- Web Research ativa apenas quando necessario (WEB-RESEARCH.md).
- Scoring de fontes: Authority, Recency, Completeness, Relevance.
- Citacoes formatadas com templates do PromptOS.

## Roadmap Incremental

### Fase 1: MCP Core
- Orquestrador + Loader + Classifier
- Human Gate bloqueando writes

### Fase 2: Skills + RAG
- Similarity scoring
- RAG pipeline com DSPy

### Fase 3: Web Research
- Adaptadores Tavily/Perplexity
- Citations + tier scoring

### Fase 4: Plugins CLI
- Plugin JS para Codex/Claude/Gemini

## Riscos e Mitigacoes
- Risco: Quebra do Human Gate -> Mitigacao: bloqueio hard antes de write
- Risco: Overload de contexto -> Mitigacao: JIT enforced
- Risco: Fonte ruim -> Mitigacao: scoring + tiering

## Observacoes
- Compativel com T0-HUMAN-01 e T0-MEMORY-01
- Nunca escreve sem aprovacao humana
