# RFC: Estrutura Unificada docs/ para Documentacao Humana

> **Versao:** 1.0.0
> **Data:** 2026-01-16
> **Status:** APROVADA
> **Baseado em:** RFC-001, RFC-002, RFC-CONTEXT-ENGINEERING

---

## 1. Resumo Executivo

Esta RFC define a estrutura padronizada da pasta `docs/` para documentacao destinada a **humanos** (desenvolvedores, analistas, stakeholders).

**Principio fundamental:**
- `.context/` → Para IAs (contexto ativo, just-in-time loading)
- `docs/` → Para Humanos (arquivo morto, governanca, rastreabilidade)

---

## 2. Estrutura de Diretorios

### 2.1. Nivel Basico (Minimo Obrigatorio)

```
docs/
├── README.md               # Indice e navegacao
├── cards/                  # Unidades de trabalho (Cards)
│   └── CARD-001-xxx.md
└── decisions/              # ADRs (Architecture Decision Records)
    └── ADR-001-xxx.md
```

### 2.2. Nivel Completo (Projetos Criticos)

```
docs/
├── README.md               # Indice e navegacao
│
├── cards/                  # Unidades de Trabalho
│   ├── CARD-001-xxx.md
│   ├── CARD-002-xxx.md
│   └── _TEMPLATE.md        # Template padrao
│
├── decisions/              # ADRs
│   ├── ADR-001-xxx.md
│   ├── ADR-002-xxx.md
│   └── _TEMPLATE.md
│
├── requisitos/             # Especificacoes do Sistema
│   ├── README.md
│   ├── tecnicos/           # RTs (Restricoes, Stack)
│   │   └── RT-001-xxx.md
│   ├── qualidade/          # RQs (NFRs: Performance, Seguranca)
│   │   └── RQ-001-xxx.md
│   └── negocial/           # RNs + Use Cases
│       └── RN-001-xxx.md
│
├── diagramas/              # Representacoes Visuais
│   ├── README.md
│   ├── classes/            # Estrutura estatica
│   ├── sequencia/          # Comportamento dinamico
│   ├── c4/                 # C4 Model
│   └── outros/
│
├── requests-for-comments/  # RFCs (Propostas de Mudanca)
│   ├── RFC-001-xxx.md
│   └── _TEMPLATE.md
│
├── pesquisa-previa/        # Pesquisas de Negocio/Tecnicas
│   ├── README.md           # Guia de pesquisa para IAs
│   └── PESQ-001-xxx.md
│
├── debitos-tecnicos/       # Registro de Divida Tecnica
│   ├── DT-001-xxx.md
│   └── _TEMPLATE.md
│
├── plan/                   # Planos de Implementacao
│   ├── PLAN-001-xxx.md
│   └── _TEMPLATE.md
│
└── ARCHITECTURE.md         # Mapa Mental do Sistema (Visao Geral)
```

---

## 3. Definicoes e Propositos

| Pasta | Proposito | Volatilidade | Exemplo |
|-------|-----------|--------------|---------|
| `cards/` | Onde trabalho e planejado | Alta (task → done → historico) | CARD-001-crud-empresa.md |
| `decisions/` | Historico de "porques" | Baixa (imutavel) | ADR-001-escolha-postgresql.md |
| `requisitos/` | Verdade atual do sistema | Media (atualizado) | RN-001-calculo-impostos.md |
| `diagramas/` | Visualizacoes | Media | sequence-checkout.mmd |
| `requests-for-comments/` | Propostas de mudanca | Alta (proposta → aceita/rejeitada) | RFC-001-nova-arquitetura.md |
| `pesquisa-previa/` | Pesquisas documentadas | Baixa | PESQ-001-esocial-2024.md |
| `debitos-tecnicos/` | Divida tecnica | Media | DT-001-falta-testes-service.md |
| `plan/` | Planos de implementacao | Alta | PLAN-001-migracao-java17.md |

---

## 4. Templates

### 4.1. Card (CARD-XXX.md)

```markdown
# CARD-XXX: [Titulo]

## 1. Descricao & User Story
"Como um [Persona], eu quero [Acao], para que [Valor]."

## 2. Regras de Negocio (RN)
* [RN01] O calculo deve considerar X...
* [RN02] ...

## 3. Regras Tecnicas (RT)
* [RT01] Deve usar Java 17 Records
* [RT02] (Tier 0) Proibido Lombok

## 4. Requisitos de Qualidade (RQ)
* [RQ01] Cobertura >= 90%
* [RQ02] Tempo resposta < 500ms

## 5. Criterios de Aceite
- [ ] Teste unitario cobrindo cenario X
- [ ] Endpoint retorna 200 para caso sucesso
- [ ] Documentacao atualizada

## 6. Referencias
- ADR-001: [Link]
- CARD-YYY: [Dependencia]

## 7. Metadata
| Campo | Valor |
|-------|-------|
| **Status** | Backlog / Em Andamento / Done |
| **Prioridade** | Alta / Media / Baixa |
| **Estimativa** | [X]h |
| **Assignee** | [Nome] |
```

### 4.2. ADR (ADR-XXX.md)

```markdown
# ADR-XXX: [Titulo da Decisao]

**Status:** Proposta | Aceito | Rejeitado | Substituido por ADR-YYY
**Data:** YYYY-MM-DD
**Autores:** [Nomes]

---

## Contexto
[Qual problema/necessidade motivou esta decisao?]

## Decisao
[O que foi decidido?]

## Consequencias

### Positivas
- ...

### Negativas
- ...

## Alternativas Consideradas

### Alternativa 1: [Nome]
**Descricao:** ...
**Por que rejeitada:** ...

### Alternativa 2: [Nome]
**Descricao:** ...
**Por que rejeitada:** ...

## Referencias
- [Links para documentacao, artigos, etc.]
```

### 4.3. RFC (RFC-XXX.md)

```markdown
# RFC-XXX: [Titulo da Proposta]

## Status da RFC

| Campo | Valor |
|-------|-------|
| **Status** | Proposta / Em Revisao / Aprovada / Rejeitada |
| **Data de Criacao** | YYYY-MM-DD |
| **Data Limite Revisao** | YYYY-MM-DD |
| **Autor(es)** | [Nomes] |

---

## Resumo Executivo
[3-5 linhas resumindo a proposta]

## Problema a ser Resolvido
[Descricao detalhada do problema]

## Proposta de Solucao
[Descricao da solucao proposta]

## Alternativas Consideradas
[Outras opcoes avaliadas]

## Impacto
[Como afeta o sistema/time]

## Plano de Implementacao
[Fases e timeline]

## Criterios de Sucesso
[Como medir se funcionou]

## Referencias
[Links]
```

### 4.4. Pesquisa (PESQ-XXX.md)

```markdown
# PESQ-XXX: [Titulo da Pesquisa]

**Data:** YYYY-MM-DD
**Status:** Validado | Pendente | Rejeitado
**Autor:** [Nome]

---

## Objetivo
[O que precisa ser descoberto]

## Resumo Executivo
[3-5 linhas com principais descobertas]

## Fontes Consultadas

### Tier 1 (Oficiais)
1. [Titulo] - [URL] - Acessado em: YYYY-MM-DD

### Tier 2 (Academicas)
1. [Titulo] - [URL] - Acessado em: YYYY-MM-DD

### Tier 3 (Consolidadas)
1. [Titulo] - [URL] - Acessado em: YYYY-MM-DD

## Descobertas
[Informacoes detalhadas com citacoes]

## Implicacoes para Implementacao
[Como afeta o codigo]

## Perguntas em Aberto
[Pontos que precisam validacao humana]
```

### 4.5. Debito Tecnico (DT-XXX.md)

```markdown
# DT-XXX: [Titulo do Debito]

**Status:** Identificado | Em Resolucao | Resolvido
**Severidade:** Critica | Alta | Media | Baixa
**Data Identificacao:** YYYY-MM-DD

---

## Descricao
[O que e o debito tecnico]

## Impacto
[Como afeta o sistema]

## Causa Raiz
[Por que existe]

## Solucao Proposta
[Como resolver]

## Esforco Estimado
[Tempo/custo para resolver]

## Referencias
- CARD-XXX: [Se houver card relacionado]
```

### 4.6. Plano (PLAN-XXX.md)

```markdown
# PLAN-XXX: [Nome do Plano]

**Versao Alvo:** vX.Y.Z
**Status:** Em Andamento | Concluido | Bloqueado
**Data Criacao:** YYYY-MM-DD

---

## Objetivo
[O que este plano visa atingir]

## Checklist

### Fase 1: [Nome]
- [ ] Tarefa 1.1
- [ ] Tarefa 1.2

### Fase 2: [Nome]
- [ ] Tarefa 2.1

### Fase 3: Validacao
- [ ] Testes passando
- [ ] Code review aprovado
- [ ] Documentacao atualizada

## Progresso

| Fase | Status | Progresso |
|------|--------|-----------|
| Fase 1 | Em Andamento | 2/5 |
| Fase 2 | Pendente | 0/3 |

## Riscos e Mitigacoes
| Risco | Mitigacao |
|-------|-----------|
| [Risco 1] | [Mitigacao 1] |

---
*Ultima atualizacao: YYYY-MM-DD*
```

---

## 5. docs/README.md (Indice)

```markdown
# docs/ - Documentacao do Projeto

> **AVISO PARA IAs**: Esta pasta e "arquivo morto" para humanos.
> Para contexto ativo, consulte `/.context/` primeiro.

---

## Estrutura

| Pasta | Conteudo |
|-------|----------|
| `cards/` | Unidades de trabalho (tarefas) |
| `decisions/` | ADRs (decisoes arquiteturais) |
| `requisitos/` | Especificacoes (RN, RT, RQ) |
| `diagramas/` | Visualizacoes (Mermaid, PlantUML) |
| `requests-for-comments/` | Propostas de mudanca |
| `pesquisa-previa/` | Pesquisas documentadas |
| `debitos-tecnicos/` | Divida tecnica |
| `plan/` | Planos de implementacao |

## Links Rapidos

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Visao geral do sistema
- [Cards Ativos](./cards/) - Trabalho em andamento
- [Decisoes](./decisions/) - Historico de ADRs

## Convencoes de Nomenclatura

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Card | `CARD-XXX-descricao.md` | CARD-001-crud-empresa.md |
| ADR | `ADR-XXX-descricao.md` | ADR-001-escolha-postgresql.md |
| RFC | `RFC-XXX-descricao.md` | RFC-001-nova-arquitetura.md |
| Pesquisa | `PESQ-XXX-descricao.md` | PESQ-001-esocial-2024.md |
| Debito | `DT-XXX-descricao.md` | DT-001-falta-testes.md |
| Plano | `PLAN-XXX-descricao.md` | PLAN-001-migracao-java17.md |
```

---

## 6. Checklist de Conformidade

### Nivel Basico

- [ ] docs/README.md criado
- [ ] docs/cards/ criado com pelo menos 1 card ou template
- [ ] docs/decisions/ criado com pelo menos 1 ADR ou template

### Nivel Completo (adicional)

- [ ] docs/ARCHITECTURE.md criado
- [ ] docs/requisitos/ estruturado (tecnicos/, qualidade/, negocial/)
- [ ] docs/diagramas/ estruturado
- [ ] docs/requests-for-comments/ criado
- [ ] docs/pesquisa-previa/ criado com README.md
- [ ] docs/debitos-tecnicos/ criado
- [ ] docs/plan/ criado com template
- [ ] Templates (_TEMPLATE.md) em cada pasta

---

## 7. Rastreabilidade

### Matriz de Rastreabilidade

```
RN (Regra Negocio) ←→ CARD ←→ ADR ←→ Codigo
        ↓                ↓
       RT              Teste
        ↓
       RQ
```

### Exemplo

```
RN-001 (Calculo IRRF)
  └→ CARD-015 (Implementar calculo)
       └→ ADR-003 (Escolha biblioteca)
            └→ src/main/java/.../IrrfCalculator.java
                 └→ IrrfCalculatorTest.java
```

---

## 8. Migracao de Projetos Existentes

Ver: `docs/templates/BROWNFIELD-MIGRATION-GUIDE.md`

---

## 9. Referencias

- RFC-001: AI-Assisted Software Development Lifecycle
- RFC-002: Standardized Documentation Structure
- RFC-CONTEXT-ENGINEERING: Context Engineering para IAs

---

**Versao:** 1.0.0
**Ultima Atualizacao:** 2026-01-16
