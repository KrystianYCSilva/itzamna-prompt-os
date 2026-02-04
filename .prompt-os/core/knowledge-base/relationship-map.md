---
name: core-knowledge-base-relationship-map
description: "Relationship Map — Skill Graph"
---

# Relationship Map — Skill Graph

> **JIT sub-file de KNOWLEDGE-BASE.md**  
> Carregue após persistir uma skill nova (para propor links) ou ao carregar uma skill existente (para surfaciar links).

**Governa:** FR-007, SC-006 | **Contrato:** `specs/004-vector-db-rag/contracts/relationship-map.md`

---

## Tipos de Relação

| Tipo | Direcional? | Significado | Exemplo |
|------|-------------|-------------|---------|
| `prerequisite` | Sim (A → B) | A deve ser entendido antes de B ser útil | `java` é prerequisite de `java-21` |
| `version-extension` | Sim (A → B) | B é sub-skill de versão específica de A | `java` → `java-21` |
| `complementary` | Não | Tópicos adjacentes; nenhum depende do outro | `go` ↔ `python` |
| `domain-cluster` | Não | Mesmo domínio amplo; agrupamento informacional | todos os baselines de linguagem |

**Nota:** `prerequisite` e `version-extension` frequentemente coexistem no mesmo par. Ambos os links são armazenados — significados diferentes: `prerequisite` afeta recomendação de ordem de carregamento; `version-extension` afeta como as skills são apresentadas no INDEX.

---

## Discovery: Quando e Como Propor

### Após criação de skill nova (post HUMAN-GATE approval)

1. Carregue INDEX.md
2. Para cada skill existente, verifique:
   - A skill nova é sub-folder de versão desta skill? → proposta `version-extension` (direcional: existente → nova)
   - Compartilham ≥ 2 tags? → proposta `domain-cluster`
   - Mesma category mas tópico claramente adjacente? → proposta `complementary`
3. Superficia propostas: *"Encontrei {N} relações potenciais. Revise e confirme."*

### Quando developer escolheu "Criar complementar" na redundancy gate

O link `complementary` é criado automaticamente — sem etapa de proposta. Ambas as skills recebem o link.

---

## Ciclo de Vida: Proposta → Confirmação

| Estado | Quem age | O que acontece |
|--------|----------|----------------|
| `agent-proposed` | Agente | Link escrito no INDEX.md com `addedBy: agent-proposed`. Superficiado ao developer. |
| `human-confirmed` | Developer | Developer revisa e confirma. Campo `addedBy` atualizado para `human-confirmed`. |
| Rejeitado | Developer | Link removido do INDEX.md. Nenhum registro mantido (nunca foi confirmado). |

**T0-HUMAN compliance:** Nenhum link torna-se permanente sem confirmação humana. Links `agent-proposed` são drafts; tornam-se efetivos apenas após confirmação.

---

## Formato de Persistência

Bloco YAML dentro da entrada de cada skill no INDEX.md. Links bidirecionais aparecem em ambas as skills.

```yaml
# Dentro do INDEX.md, sob a skill "go":
relationships:
  - target: python
    type: complementary
    addedBy: human-confirmed
    addedAt: "2026-02-03"
  - target: java
    type: domain-cluster
    addedBy: human-confirmed
    addedAt: "2026-02-03"
  - target: go-118
    type: version-extension
    addedBy: agent-proposed
    addedAt: "2026-02-03"
```

**Constraints:**
- Sem self-edges (target ≠ skill própria)
- Sem duplicatas (mesmo target + mesmo type)
- Tipos direcionales (`prerequisite`, `version-extension`): armazenados na entrada do skill dependente/extendido, + pointer reverso na skill base para surfacing

---

## Surfacing: O Que Mostrar Quando Uma Skill É Carregada

Quando o agente carrega uma skill (via JIT), verifica o bloco `relationships` dela no INDEX e superficia agrupado por tipo:

```
📚 Carregado: go (goroutines, channels, interfaces, defer)

Skills relacionadas:
  🔗 Complementar: python, javascript  (mesmo tier, paradigma diferente)
  📦 Domain cluster: java, kotlin, c-cpp  (todos baselines de linguagem)
  📈 Estendido por: go-118  (Go 1.18+ generics & fuzzing)

Quer que eu carregue alguma delas?
```

**Regras de surfacing:**
- Mostra `version-extension` filhos (skills que esta estende) e pais (skill que esta estende de)
- Mostra `complementary` como peers
- Mostra `domain-cluster` como lista plana; **não** carrega automaticamente
- Mostra `prerequisite` pais como "recomendado antes desta skill"
- **Máximo:** 5 links. Se houver mais, mostra top 5 por recência e oferece "mostrar todos"

---

## Medição SC-006

Após o relationship map estar populado, verifique: para cada skill no repositório, o agente surfacia ≥ 1 skill relacionada quando ela é carregada?

**Target:** ≥ 90% das skills (ou seja, no máximo 1 skill em uma biblioteca de 13 pode ter zero relações surfaciadas).

---

*relationship-map | KNOWLEDGE-BASE JIT sub-file | SPEC-004*
