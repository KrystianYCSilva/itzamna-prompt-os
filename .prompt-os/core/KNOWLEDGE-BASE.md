# KNOWLEDGE-BASE - Gestao de Conhecimento

> **Instrucoes para voce (agente de IA) gerenciar e acessar o conhecimento do PromptOS.**  
> Como encontrar, avaliar, gerar e relacionar skills. Protocolo com 4 capacidades, cada uma em um JIT sub-file.

---

## QUANDO USAR CADA CAPACIDADE

| Ação que você está fazendo | Sub-file a carregar |
|----------------------------|---------------------|
| Buscar uma skill por tópico ou query | `knowledge-base/similarity-scoring.md` |
| Criar uma nova skill (geração guiada) | `knowledge-base/rag-workflow.md` |
| Persistir uma skill (verificar duplicatas) | `knowledge-base/redundancy-gate.md` |
| Skill persistida — propor ou surfaciar links | `knowledge-base/relationship-map.md` |

**Regra de carregamento:** Carregue apenas o sub-file que a ação atual exige. Não carregue todos.

---

## JIT REFERENCE: Similarity Scoring

**Para o rubric completo de 4 sinais e exemplos calculados**, carregue:  
→ `.prompt-os/core/knowledge-base/similarity-scoring.md`

**Quick Summary:**
- **4 sinais**: Name/Topic (30%), Tag Overlap (30%), Domain Match (20%), Description Keywords (20%)
- **Score**: 0-100, calculado pela fórmula ponderada contra cada skill em INDEX.md
- **Threshold de busca**: retorna apenas skills com score ≥ 40 (top-3 por padrão)
- **Gap detection**: se zero skills ≥ 40, gera GapRecord → MEMORY.md
- Use quando precisa buscar skills ou avaliar similaridade

---

## JIT REFERENCE: RAG Workflow

**Para o fluxo Retrieve → Augment → Generate completo**, carregue:  
→ `.prompt-os/core/knowledge-base/rag-workflow.md`

**Quick Summary:**
- **Retrieve**: Executa similarity scoring com topN=3; filtra score ≥ 40
- **Augment**: Extrai estrutura das skills de referência (headings, exemplos, comparison tables); monta bloco de contexto com regras estruturais derivadas
- **Generate**: Produz o draft da nova skill com as regras estruturais ativas; respeita T0-SIZE-01 (≤ 1,400 tokens)
- **Case B (sem referências)**: cai no template canônico `SKILL.template.md`
- Use antes de gerar qualquer nova skill

---

## JIT REFERENCE: Redundancy Gate

**Para a árvore de decisão completa e formatos de apresentação**, carregue:  
→ `.prompt-os/core/knowledge-base/redundancy-gate.md`

**Quick Summary:**
- **Tier 1 (80-89)**: overlap alto — apresenta 3 opções (Expandir | Complementar | Prosseguir)
- **Tier 2 (≥ 90)**: near-duplicate — HARD BLOCK, apenas 2 opções (Expandir | Complementar)
- **< 80**: permitido, sem intervenção
- **Gap forwarding**: se score < 40 em todas → GapRecord em MEMORY.md (não entra na gate)
- Executa após SELF-CRITIQUE, antes de HUMAN-GATE write

---

## JIT REFERENCE: Relationship Map

**Para tipos de relação, ciclo de vida e regras de surfacing**, carregue:  
→ `.prompt-os/core/knowledge-base/relationship-map.md`

**Quick Summary:**
- **4 tipos**: prerequisite (direcional), version-extension (direcional), complementary (bidirecional), domain-cluster (bidirecional)
- **Persistência**: bloco YAML dentro de cada skill no INDEX.md
- **Ciclo**: agent-proposed → human-confirmed (T0-HUMAN compliance)
- **Surfacing**: quando uma skill é carregada, exibe até 5 links agrupados por tipo
- Use após persistir uma skill nova ou ao carregar uma skill existente

---

## HIERARQUIA DE BUSCA (inalterada)

Quando precisar de informação, siga esta ordem:

```
1. SKILLS existentes          → similarity-scoring.md
2. PERSONAS disponiveis       → .prompt-os/personas/INDEX.md
3. DOCS do sistema            → docs/
4. MEMORY do projeto          → MEMORY.md
5. PESQUISA EXTERNA           → WEB-RESEARCH.md
```

---

## LIMITES DE CARREGAMENTO (inalterados)

```
Skills simultâneas: 2-5 (JIT)
Personas ativas:    1
TARGET contexto:    10-16KB por tarefa
```

---

## EXEMPLO RÁPIDO

```
Usuário: "Crie uma skill para Redis caching"

1. BUSCA        → similarity-scoring.md   → top-3: docker (42), python (38), ...
2. RAG          → rag-workflow.md         → referências: docker; augment com estrutura
3. GENERATE     → draft criado com regras estruturais
4. SELF-CRITIQUE → score calculado
5. REDUNDANCY   → redundancy-gate.md     → score < 80 → permitido
6. HUMAN-GATE   → apresenta ao humano
7. COMMIT       → persiste skill
8. RELATIONSHIPS → relationship-map.md   → propõe links com skills existentes
```

---

*KNOWLEDGE-BASE Protocol v2.1 (JIT-enabled, SPEC-004). Para detalhes, carregue os sub-files acima.*
