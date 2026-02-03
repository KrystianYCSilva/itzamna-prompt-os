# Data Collection Guide - SPEC-010 Execution

**Purpose:** Instruções práticas para coletar dados durante a implementação da SPEC-010  
**For:** Agent executando a spec (OpenCode, Claude, etc.)  
**Output:** Dados para relatórios de monitoramento (SPEC-001 e SPEC-002)

---

## Overview

Durante a execução da SPEC-010, você irá coletar 3 tipos de dados:

1. **Self-Critique Scores** (SPEC-001) - Qualidade das skills geradas
2. **Gaps Detectados** (SPEC-002 US1) - Skills faltantes identificadas
3. **Rejeições** (SPEC-002 US2) - Artifacts rejeitados pelo humano

**Arquivo de tracking:** `memory/opencode-spec010-session.md`

---

## 1. Coletando Self-Critique Scores

### Quando Coletar

**SEMPRE** que gerar uma skill e executar SELF-CRITIQUE.md

### Como Coletar

1. Após executar Self-Critique, você receberá um output YAML:

```yaml
overall_score: 85
dimensions:
  completude:
    score: 22
    criteria_scores: [5, 5, 4, 4, 4]
  clareza:
    score: 21
    criteria_scores: [5, 4, 4, 4, 4]
  correcao:
    score: 21
    criteria_scores: [5, 4, 4, 4, 4]
  best_practices:
    score: 21
    criteria_scores: [5, 5, 4, 4, 3]
```

2. Extraia os valores:
   - Overall: 85
   - Completude: 22
   - Clareza: 21
   - Correção: 21
   - Best Practices: 21

3. Adicione à tabela em `memory/opencode-spec010-session.md`:

```markdown
| 2026-02-03 | java-baseline | skill | 85 | 22 | 21 | 21 | 21 | Good examples |
```

### Formato da Linha

```
| Data | Artifact | Type | Overall | Comp | Clar | Corr | BP | Notes |
```

- **Data:** YYYY-MM-DD
- **Artifact:** Nome da skill (ex: `java-baseline`)
- **Type:** Sempre `skill` nesta spec
- **Overall:** Score total (0-100)
- **Comp:** Completude (0-25)
- **Clar:** Clareza (0-25)
- **Corr:** Correção (0-25)
- **BP:** Best Practices (0-25)
- **Notes:** Observações breves (opcional)

---

## 2. Coletando Gaps Detectados

### Quando Coletar

**Durante Research ou Generation**, se você identificar que:
- Precisa de uma sub-skill que não existe (ex: `java-streams`)
- Usuário pede algo fora do escopo desta skill (ex: "Como usar Spring?")
- Detecta lacuna no conhecimento do sistema

### Como Coletar

1. Identifique a skill faltante (seja específico no nome)
2. Adicione à tabela `## Gaps Detectados` em `memory/opencode-spec010-session.md`:

```markdown
| 2026-02-03 | "Preciso de exemplos de Streams do Java 8" | java-streams | pending |
```

### Formato da Linha

```
| Data | Request | Skill Sugerida | Status |
```

- **Data:** YYYY-MM-DD
- **Request:** Frase que gerou a detecção (entre aspas)
- **Skill Sugerida:** Nome sugerido para a skill (kebab-case)
- **Status:** Inicialmente `pending`

### Atualizando Status

Se você criar a skill durante a sessão:
```markdown
| 2026-02-03 | "Preciso de exemplos de Streams do Java 8" | java-streams | created |
```

Se decidir adiar:
```markdown
| 2026-02-03 | "Preciso de exemplos de Streams do Java 8" | java-streams | deferred |
```

---

## 3. Coletando Rejeições

### Quando Coletar

**SEMPRE** que o humano rejeitar uma skill na fase de Human Gate

### Como Coletar

1. Quando o humano responde `reject`, pergunte o motivo (se não foi dado)
2. Classifique em uma das 6 categorias:
   - `exemplos` - Exemplos incorretos ou não funcionam
   - `especificidade` - Muito genérico, vago
   - `clareza` - Confuso, difícil de entender
   - `completude` - Faltam seções
   - `relevancia` - Fora do escopo
   - `outros` - Outro motivo

3. Identifique o aprendizado (o que fazer diferente)

4. Adicione à tabela `## Log de Rejeicoes` em `memory/opencode-spec010-session.md`:

```markdown
| 2026-02-03 | skill | java-baseline | "Exemplos muito genéricos" | especificidade | Adicionar casos de uso reais |
```

### Formato da Linha

```
| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
```

- **Data:** YYYY-MM-DD
- **Tipo:** Sempre `skill` nesta spec
- **Item:** Nome da skill rejeitada
- **Motivo:** Feedback do humano (entre aspas)
- **Categoria:** Uma das 6 categorias listadas acima
- **Aprendizado:** Ação corretiva para próximas gerações

---

## 4. Workflow de Coleta por Skill

**Checklist para cada linguagem:**

### Fase Research
- [ ] Se detectar gap → Registrar em Gaps Detectados

### Fase Generate
- [ ] Criar skill
- [ ] (Gaps podem surgir durante pesquisa de conteúdo)

### Fase Self-Critique
- [x] **OBRIGATÓRIO:** Registrar score em Self-Critique Tracking
- [ ] Se score <70 → Revisar e re-coletar score

### Fase Human Gate
- [ ] Se `reject` → **OBRIGATÓRIO:** Registrar em Log de Rejeições
- [ ] Se gap mencionado pelo usuário → Registrar em Gaps Detectados
- [ ] Se `approve` → Prosseguir

### Fase Index
- [ ] (Sem coleta necessária)

### Fase Monitor
- [ ] Anotar tempo total gasto
- [ ] Anotar qualquer observação para Session Notes

---

## 5. Comandos Rápidos

### Adicionar Score

```bash
# Copiar linha e preencher valores
echo "| $(date +%Y-%m-%d) | {artifact} | skill | {overall} | {comp} | {clar} | {corr} | {bp} | {notes} |" >> memory/opencode-spec010-session.md
```

### Adicionar Gap

```bash
echo "| $(date +%Y-%m-%d) | \"{request}\" | {skill-name} | pending |" >> memory/opencode-spec010-session.md
```

### Adicionar Rejeição

```bash
echo "| $(date +%Y-%m-%d) | skill | {item} | \"{motivo}\" | {categoria} | {aprendizado} |" >> memory/opencode-spec010-session.md
```

---

## 6. Validação de Dados

### Antes de Gerar Relatórios

Verifique que:

**Self-Critique Tracking:**
- [ ] Todas as 5 skills têm entrada na tabela
- [ ] Todos os scores estão entre 0-100 (overall) e 0-25 (dimensões)
- [ ] Soma das dimensões = overall score

**Gaps Detectados:**
- [ ] Todos os gaps têm skill sugerida (nome específico)
- [ ] Status está correto (`pending`, `created`, `deferred`, ou `rejected`)

**Log de Rejeições:**
- [ ] Todas as rejeições têm categoria classificada
- [ ] Motivo está entre aspas
- [ ] Aprendizado documentado

---

## 7. Exemplo Completo de Sessão

### Skill: Java Baseline

**Research:**
- Detectado gap: "Preciso entender Generics em Java" → `java-generics`
- Adicionado em Gaps Detectados

**Generate:**
- Skill criada com 5 exemplos

**Self-Critique:**
- Score: 87 (Comp: 23, Clar: 22, Corr: 22, BP: 20)
- Registrado em Self-Critique Tracking

**Human Gate:**
- Resposta: `edit` → usuário pediu para adicionar exemplo de interfaces
- Re-gerado
- Re-critique: 89
- Resposta: `approve`

**Index:**
- Adicionado ao INDEX.md

**Monitor:**
- Tempo total: 42 minutos
- 1 gap detectado
- 0 rejeições
- Score final: 89

---

## 8. Troubleshooting

### "Esqueci de registrar o score!"

Se você já passou da fase de Self-Critique:
1. Não há problema - tente lembrar o score aproximado
2. Se não lembrar, marque como "N/A" e anote que foi perdido
3. Continue coletando os próximos

### "Não sei em qual categoria classificar a rejeição"

Use esta árvore de decisão:

```
O problema é nos EXEMPLOS? → exemplos
O problema é FALTA de informação? → completude
O problema é SER MUITO GENÉRICO? → especificidade
O problema é SER CONFUSO? → clareza
O problema é NÃO SER RELEVANTE? → relevancia
Nenhum acima? → outros
```

### "O humano rejeitou por múltiplas razões"

Escolha a razão PRIMÁRIA (mais importante) e mencione as outras no campo "Aprendizado".

Exemplo:
```markdown
| 2026-02-03 | skill | java | "Exemplos ruins e falta seção de concorrência" | exemplos | Testar todos os exemplos; também adicionar seção de concorrência |
```

---

## 9. Após Coleta Completa

Quando todas as 5 skills estiverem prontas:

1. **Revisar dados coletados** em `memory/opencode-spec010-session.md`
2. **Gerar relatórios** usando templates em `docs/monitoring/`:
   - Gap Detection Report (se houver gaps)
   - Rejection Analysis Report (se houver rejeições)
   - Self-Critique Metrics Report (sempre)
3. **Documentar lições aprendidas** em Session Notes
4. **Calcular métricas finais** (avg score, rejection rate, etc.)

---

## 10. Checklist Final de Qualidade

Antes de considerar a coleta completa:

- [ ] Todos os Self-Critique scores registrados (5/5)
- [ ] Todos os gaps têm nome de skill sugerido
- [ ] Todas as rejeições têm categoria e aprendizado
- [ ] Session Notes documentadas
- [ ] Métricas calculadas
- [ ] Arquivo commitado: `memory/opencode-spec010-session.md`

---

**Pronto para começar!**

Ao iniciar a primeira skill (Java), siga este guia passo a passo para garantir que todos os dados sejam coletados corretamente.

**Próximo passo:** Executar comandos SpecKit para Java baseline

---

**Versão:** 1.0  
**Última atualização:** 2026-02-03  
**Related:** `docs/MONITORING-GUIDE.md`, `specs/010-language-skills-baseline/execution-checklist.md`
