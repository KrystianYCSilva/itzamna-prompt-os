# Itzamna PromptOS - Roadmap

> Plano de evolucao do sistema de v1.0.0 ate v2.0.0

---

## Visao Geral

```
v1.0.0 (Atual)        v1.1.0              v1.2.0              v1.3.0              v2.0.0
    |                    |                   |                   |                   |
    v                    v                   v                   v                   v
+----------+      +-------------+     +---------------+    +--------------+    +------------+
| Piloto   |  ->  | Self-       |  -> | Auto-         | -> | Web Research | -> | Vector DB  |
| Funcional|      | Critique    |     | Increment     |    | Real         |    | + RAG      |
+----------+      +-------------+     +---------------+    +--------------+    +------------+
    |                    |                   |                   |                   |
 5 fases           3-5 dias            5-7 dias            5-7 dias           7-10 dias
 completas
```

---

## v1.0.0 - Piloto Funcional (COMPLETO)

**Status:** Production Ready  
**Release:** 2026-02-02

### Deliverables
- [x] Arquitetura cognitiva documentada (CoALA simplificado)
- [x] brain.js CLI v1.1.0 com --category
- [x] Human Gate Protocol (approve/reject/edit/cancel)
- [x] 17 skills em 7 categorias
- [x] 1 persona (senior-fullstack-developer)
- [x] Constitution v1.0.0 sincronizada para 5 agentes
- [x] Spec-Kit integration

### Metricas
| Metrica | Valor |
|---------|-------|
| Skills | 17 |
| Personas | 1 |
| Agentes sincronizados | 5 |
| Taxa de aprovacao | 100% |

---

## v1.1.0 - Self-Critique (PROXIMO)

**Status:** Especificado  
**Estimativa:** 3-5 dias  
**Spec:** [SPEC-001-self-critique.md](.specify/specs/SPEC-001-self-critique.md)

### Objetivo
Sistema avalia qualidade propria antes do Human Gate.

### Deliverables
- [ ] Modulo `self-critique.js`
- [ ] Score de confianca (0-100)
- [ ] 3 sugestoes de melhoria por skill
- [ ] Deteccao de redundancia com skills existentes
- [ ] UI atualizada no Human Gate

### Metricas Target
| Metrica | Target |
|---------|--------|
| Skills rejeitadas com score < 50 | > 80% |
| Tempo de revisao humana | -20% |
| Sugestoes aceitas | > 50% |

---

## v1.2.0 - Auto-Increment

**Status:** Especificado  
**Estimativa:** 5-7 dias  
**Spec:** [SPEC-002-auto-increment.md](.specify/specs/SPEC-002-auto-increment.md)  
**Depende de:** v1.1.0

### Objetivo
Sistema detecta lacunas e propoe evolucoes.

### Deliverables
- [ ] Modulo `gap-detector.js`
- [ ] Modulo `rejection-learner.js`
- [ ] Modulo `evolution-engine.js`
- [ ] Novos comandos CLI: `brain evolution`, `brain gaps`
- [ ] Relatorio mensal de evolucao

### Metricas Target
| Metrica | Target |
|---------|--------|
| Gaps detectados automaticamente | > 5/mes |
| Skills criadas de sugestoes | > 3/mes |
| Reducao em rejeicoes | > 20% |

---

## v1.3.0 - Web Research Real

**Status:** Planejado  
**Estimativa:** 5-7 dias  
**Depende de:** v1.2.0

### Objetivo
Substituir mock de pesquisa por busca real.

### Deliverables
- [ ] Integracao com search API (Tavily/Perplexity)
- [ ] Parser de documentacao oficial
- [ ] Extrator de patterns de GitHub
- [ ] Sistema de cache para pesquisas
- [ ] Validacao de fontes (data, autoridade)

### Metricas Target
| Metrica | Target |
|---------|--------|
| Fontes reais por skill | > 3 |
| Precisao de patterns | > 80% |
| Tempo de pesquisa | < 30s |

---

## v2.0.0 - Vector DB + RAG

**Status:** Futuro  
**Estimativa:** 7-10 dias  
**Depende de:** v1.3.0

### Objetivo
Busca semantica de skills com RAG.

### Deliverables
- [ ] Integracao com ChromaDB ou Pinecone
- [ ] Embeddings para todas as skills
- [ ] Busca por similaridade semantica
- [ ] Retrieval Augmented Generation
- [ ] LLM-based self-critique

### Metricas Target
| Metrica | Target |
|---------|--------|
| Precisao de busca | > 90% |
| Skills encontradas por query | Top 3 relevantes |
| Tempo de retrieval | < 500ms |

---

## Backlog (Post v2.0.0)

| Feature | Complexidade | Prioridade |
|---------|--------------|------------|
| Slack Integration | Media | P3 |
| CLI para Personas | Baixa | P2 |
| Multi-language Skills | Media | P3 |
| A/B Testing de Templates | Alta | P3 |
| Multi-agent Coordination | Alta | P4 |
| MCP Full Compatibility | Alta | P4 |

---

## Timeline Visual

```
Fev 2026                              Mar 2026                              Abr 2026
|---------------------------------------|---------------------------------------|
 v1.0.0     v1.1.0         v1.2.0              v1.3.0              v2.0.0
   |          |              |                   |                   |
   +---5d-----+----5d--------+--------7d---------+--------7d---------+
   Piloto    Self-        Auto-              Web               Vector
             Critique     Increment          Research          DB+RAG
```

---

## Como Contribuir

### Para Desenvolvedores

1. Escolha uma SPEC do roadmap
2. Crie branch: `feature/spec-XXX-nome`
3. Implemente seguindo a spec
4. Teste com 5+ skills novas
5. PR para review

### Para Usuarios

1. Reporte gaps detectados
2. De feedback detalhado em rejeicoes
3. Sugira novas skills via issues

---

*Roadmap v1.0.0 | Itzamna PromptOS | 2026-02-02*
