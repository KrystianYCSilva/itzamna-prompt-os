# MEMORY-MANAGEMENT - Gestão de Memória Distribuída

> **Protocolo para criar, atualizar e gerenciar a memória do sistema.**  
> Garante que cada agente mantenha sua memória corretamente e contribua para a memória global.

---

## POR QUE GESTÃO DE MEMÓRIA?

A memória distribuída permite que:

1. **Cada agente rastreie seu próprio histórico** (gaps, rejeições, sessões)
2. **Sistema mantenha estatísticas agregadas** (metrics globais)
3. **Workflows sejam documentados** (patterns reutilizáveis)
4. **Contexto persista entre sessões** (continuidade)
5. **Análise cross-agent seja possível** (insights coletivos)

---

## ARQUITETURA DE MEMÓRIA (CRITICAL)

### Estrutura de 3 Camadas

```
┌─────────────────────────────────────────────────────────┐
│ MEMORY.md (Global)                                      │
│ - Estatísticas agregadas (skills count, avg score)     │
│ - Sessões recentes (últimas 5-10 entradas sucintas)    │
│ - Status de SPECs                                       │
│ - Skills/Personas criadas                               │
│ - NO verbose details, NO workflows completos            │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ memory/{agente}-memory.md (Agent-Specific)             │
│ - Gaps detectados (para Auto-Increment)                │
│ - Rejeições registradas (para pattern learning)        │
│ - Notas de sessão detalhadas (contexto do agente)      │
│ - Test data (se aplicável)                             │
│ - EXEMPLOS: opencode-memory.md, itzamna-memory.md      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ .context/workflows/{workflow}.md (Workflow Docs)       │
│ - Execution patterns detalhados                         │
│ - Step-by-step procedures                               │
│ - Metrics e análises profundas                          │
│ - EXEMPLOS: spec-010-execution-pattern.md               │
└─────────────────────────────────────────────────────────┘
```

---

## QUANDO ATUALIZAR MEMÓRIA

Atualize memória **SEMPRE** após:

1. **Criar skill/persona/documento** → Registrar em MEMORY.md + agent memory
2. **Detectar gap** → Registrar em `memory/{agente}-memory.md`
3. **Receber rejeição humana** → Registrar em `memory/{agente}-memory.md`
4. **Completar sessão significativa** → Adicionar nota em agent memory
5. **Completar SPEC** → Atualizar MEMORY.md + criar workflow doc se necessário

**NÃO atualizar** para:
- Operações read-only
- Perguntas simples respondidas
- Comandos rápidos executados

---

## PROTOCOLO DE ATUALIZAÇÃO

### Fase 1: Identificar Tipo de Atualização

Determine qual memória atualizar:

| Tipo de Evento | MEMORY.md | memory/{agente}-memory.md | .context/workflows/ |
|----------------|-----------|---------------------------|---------------------|
| Skill/Persona criada | ✅ Sim | ✅ Sim (nota de sessão) | ❌ Não |
| Gap detectado | ❌ Não | ✅ Sim (tabela gaps) | ❌ Não |
| Rejeição recebida | ❌ Não | ✅ Sim (tabela rejeições) | ❌ Não |
| Sessão significativa | ✅ Sim (sucinta) | ✅ Sim (detalhada) | ❌ Não |
| SPEC completa | ✅ Sim | ✅ Sim | ✅ Sim (se workflow complexo) |

---

### Fase 2: Atualizar MEMORY.md (Global)

**Arquivo**: `MEMORY.md`  
**Quando**: Após criar artifacts, completar SPECs, mudanças significativas

#### 2.1. Header (Sempre Atualizar)

```markdown
**Ultima Atualizacao:** {DATA_ATUAL}
**Versao:** {VERSAO_SISTEMA}
**Sessoes Totais:** {INCREMENTAR_CONTADOR}
**Spec Atual:** {SPEC_EM_ANDAMENTO}
```

**Exemplo**:
```markdown
**Ultima Atualizacao:** 2026-02-03
**Versao:** 2.1.0
**Sessoes Totais:** 19
**Spec Atual:** SPEC-010 ✅ COMPLETE | SPEC-003 🟢 UNBLOCKED
```

#### 2.2. Estatísticas (Atualizar Quando Artifacts Criados)

```markdown
| Metrica | Valor |
|---------|-------|
| Skills Totais | {COUNT_SKILLS} |
| Skills Approved | {COUNT_APPROVED} |
| Skills Draft | {COUNT_DRAFT} |
| Language Baselines | {COUNT_BASELINES} |
| Language Advanced | {COUNT_ADVANCED} |
| Personas Geradas | {COUNT_PERSONAS} |
| Taxa de Aprovacao | {APPROVED/TOTAL * 100}% |
| Categorias | {COUNT_CATEGORIAS} |
| Core Protocols | {COUNT_PROTOCOLS} |
| Ultima Geracao | {DATA_ULTIMO_ARTIFACT} |
```

**Como atualizar**:
1. Ler contadores atuais
2. Incrementar apropriadamente (ex: Skills Totais +1)
3. Recalcular Taxa de Aprovação se necessário
4. Atualizar "Ultima Geracao" com data atual

#### 2.3. Memória Episódica Recente (Top 5-10 Eventos)

```markdown
## Memoria Episodica Recente

| Data | Tipo | Nome | Status |
| {DATA} | {TIPO} | {NOME_ARTIFACT} | {STATUS} |
```

**Regras**:
- **Manter apenas últimos 5-10 eventos** (mais recentes no topo)
- **Tipos válidos**: skill, persona, doc, update, create, refactor, fix, feature
- **Status válidos**: ✅ created, ✅ updated, ✅ complete, ⏳ pending, ❌ failed
- **Ser SUCINTO**: Nome de arquivo ou descrição curta (max 60 chars)

**Exemplo**:
```markdown
| Data | Tipo | Nome | Status |
| 2026-02-03 | fix | Phase 1 - Protocol Sequence Enforcement | ✅ complete |
| 2026-02-03 | create | .prompt-os/checklists/PROTOCOL-APPLICATION.md | ✅ created |
| 2026-02-03 | skill | java-23 baseline | ✅ created |
```

#### 2.4. Notas da Sessão (Última Sessão no Topo)

```markdown
## Notas da Sessao

### Sessao {N} ({DATA}) - {TITULO_CURTO} {EMOJI}

**Feature: {DESCRICAO_FEATURE} — {STATUS}**

- **Objetivo**: {OBJETIVO_PRINCIPAL}

- **Tasks completadas**: {N}/{TOTAL} ({PERCENTUAL}%)
  1. ✅ {TASK_1}
  2. ✅ {TASK_2}
  ...

- **Files modified**: {COUNT} ({LISTA_RESUMIDA})
- **Files created**: {COUNT} ({LISTA_RESUMIDA})
- **Files deleted**: {COUNT} ({LISTA_RESUMIDA})

- **Commit**: `{HASH}` - "{MENSAGEM}"

- **Result**: 
  - ✅ {RESULTADO_1}
  - ✅ {RESULTADO_2}

- **Next Steps**:
  - [ ] {PROXIMO_PASSO_1}
  - [ ] {PROXIMO_PASSO_2}

**Status**: {STATUS_FINAL}

---
```

**Regras**:
- **Máximo 10-15 sessões** no histórico (deletar mais antigas periodicamente)
- **Ser SUCINTO**: Focar em resultados, não em processo detalhado
- **Usar emojis apropriados**: ✅ 🧹 🔄 📋 🚀 🔧 ⚙️ 📊 🎯 🔍
- **NO workflows completos** aqui - extrair para `.context/workflows/`

---

### Fase 3: Atualizar memory/{agente}-memory.md (Agent-Specific)

**Arquivo**: `memory/{agente}-memory.md` (ex: `memory/opencode-memory.md`)  
**Quando**: Após gaps, rejeições, sessões significativas

#### 3.1. Template de Agent Memory (Se Não Existe)

```markdown
# {Agent Name} Agent Memory

**Agent**: {agent_id}  
**Purpose**: Session logs for gap detection, rejection learning, and pattern analysis  
**Format**: Structured Markdown tables following Auto-Increment Protocol

---

## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| {DATA} | "{USER_REQUEST}" | {SKILL_NAME} | {pending/created/deferred} |

---

## Gap Pattern Analysis

{PADROES_AUTOMATICOS_DETECTADOS}

---

## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| {DATA} | {skill/persona/doc} | {ITEM_NAME} | "{FEEDBACK_HUMANO}" | {CATEGORIA} | {ACAO_CORRETIVA} |

---

## Padroes Identificados

{ANALISE_DE_PADROES_CROSS_SESSION}

---

## Notas de Sessao

### Session {N} ({DATA}) - {TITULO}
{DETALHES_DA_SESSAO}

---
```

#### 3.2. Registrar Gap Detectado

**Quando**: AUTO-INCREMENT detectou gap e usuário escolheu "defer"

```markdown
## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "Como usar Kafka?" | kafka-basics | pending |
```

**Campos**:
- **Data**: YYYY-MM-DD
- **Request**: Pedido original do usuário (max 60 chars, entre aspas)
- **Skill Sugerida**: Nome da skill que preencheria o gap
- **Status**: `pending` | `created` | `deferred`

#### 3.3. Registrar Rejeição

**Quando**: Human Gate resultou em "reject"

```markdown
## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-03 | skill | redis-cache | "Exemplos incorretos" | exemplos | Testar comandos antes de mostrar |
```

**Campos**:
- **Data**: YYYY-MM-DD
- **Tipo**: `skill` | `persona` | `doc` | `code`
- **Item**: Nome do artifact rejeitado
- **Motivo**: Feedback do humano (entre aspas, max 60 chars)
- **Categoria**: Classificação do problema (exemplos, completude, clareza, especificidade, relevancia, correcao_usuario)
- **Aprendizado**: Ação corretiva para próximas criações (imperativo, max 80 chars)

#### 3.4. Adicionar Nota de Sessão (Agent Memory)

**Quando**: Sessão significativa completa (pode ser detalhada aqui)

```markdown
## Notas de Sessao

### Session 19 (2026-02-03) - Phase 1 Protocol Enforcement
- Completed mandatory protocol sequence enforcement (9/9 tasks)
- Updated all 6 agent bootstrap files with MANDATORY PROTOCOL SEQUENCE section
- Created PROTOCOL-APPLICATION.md checklist (208 lines)
- Added cross-references to AUTO-INCREMENT, SELF-CRITIQUE, HUMAN-GATE
- Memory architecture cleanup: moved workflows to .context/workflows/
- Result: SPEC-003 unblocked, T0-HUMAN-01 violations prevented
```

**Regras**:
- **Pode ser mais detalhada** que MEMORY.md (agent-specific context)
- **Bullet points OK** para listas de ações
- **Incluir metrics específicas** do agente (ex: test data, validation results)

---

### Fase 4: Criar Workflow Doc (Se Necessário)

**Arquivo**: `.context/workflows/{workflow-name}.md`  
**Quando**: SPEC completa com pattern execution reutilizável

#### 4.1. Template de Workflow Doc

```markdown
# {Workflow Name} - Execution Pattern

> **Padrão de execução documentado para {OBJETIVO}.**  
> Baseado em: {SPEC_OU_PROJETO}

---

## Contexto

**SPEC**: {SPEC_ID}  
**Período**: {DATA_INICIO} - {DATA_FIM}  
**Agente**: {AGENTE_RESPONSAVEL}  
**Objetivo**: {OBJETIVO_ALTO_NIVEL}

---

## Metrics

| Métrica | Valor |
|---------|-------|
| {METRICA_1} | {VALOR_1} |
| {METRICA_2} | {VALOR_2} |

---

## Execution Pattern

### Phase 1: {NOME_FASE}

**Steps**:
1. {STEP_1}
2. {STEP_2}

**Output**: {OUTPUT_ESPERADO}

### Phase 2: {NOME_FASE}

...

---

## Learned Actions

1. **{ACTION_1}**: {DESCRICAO_E_QUANDO_APLICAR}
2. **{ACTION_2}**: {DESCRICAO_E_QUANDO_APLICAR}

---

## Artifacts Created

- `{FILE_PATH_1}` - {DESCRICAO}
- `{FILE_PATH_2}` - {DESCRICAO}

---

## Key Insights

1. {INSIGHT_1}
2. {INSIGHT_2}

---

**EOF** | Version: {VERSAO}
```

**Quando criar**:
- ✅ SPEC completa com múltiplas fases
- ✅ Pattern execution que pode ser replicado
- ✅ Metrics significativas coletadas
- ❌ Sessões simples (manter apenas em agent memory)

**Exemplo existente**: `.context/workflows/spec-010-execution-pattern.md`

---

## REGRAS CRÍTICAS (MUST FOLLOW)

### R1: Separação de Responsabilidades

```
MEMORY.md           → Estatísticas agregadas + últimas 5-10 sessões (SUCINTO)
memory/{agente}/    → Gaps + Rejeições + Sessões detalhadas (AGENT-SPECIFIC)
.context/workflows/ → Execution patterns reutilizáveis (WORKFLOW DOCS)
```

**❌ NUNCA**:
- Colocar workflows completos em MEMORY.md
- Colocar gaps/rejeições em MEMORY.md (vai para agent memory)
- Esquecer de atualizar estatísticas após criar artifact

**✅ SEMPRE**:
- Atualizar header de MEMORY.md (data, sessões, spec atual)
- Registrar artifacts em Memória Episódica Recente
- Manter agent memory estruturada (tabelas)

---

### R2: Formato Estruturado (Tabelas)

**Gaps e Rejeições DEVEM usar tabelas Markdown**:

```markdown
| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "Como usar X?" | x-basics | pending |
```

**❌ NUNCA usar texto livre** para gaps/rejeições (não-parseável)

---

### R3: Consistência de Nomenclatura

**Agent Memory Files**:
- ✅ `memory/opencode-memory.md`
- ✅ `memory/itzamna-memory.md`
- ✅ `memory/claude-memory.md`
- ❌ `memory/opencode-spec010-session.md` (sessions vão dentro do agent memory)
- ❌ `memory/speckit-memory.md` (SpecKit é tool, não agent)

**Workflow Docs**:
- ✅ `.context/workflows/spec-010-execution-pattern.md`
- ✅ `.context/workflows/protocol-enforcement-pattern.md`
- ❌ `.context/workflows/session-18-notes.md` (sessions vão em agent memory)

---

### R4: Atualização Atômica

**Ordem correta**:
1. Criar/modificar artifacts
2. Atualizar agent memory (`memory/{agente}-memory.md`)
3. Atualizar MEMORY.md (estatísticas + episódica)
4. Criar workflow doc (se necessário)
5. Commit tudo junto

**❌ NUNCA**:
- Criar artifact e esquecer de atualizar memória
- Atualizar apenas MEMORY.md (esquecer agent memory)
- Commitar artifact sem atualizar índices + memória

---

### R5: Token Budget para Memória

**MEMORY.md**:
- Target: < 1000 linhas
- Se exceder: Mover sessões antigas para arquivo de histórico

**Agent Memory**:
- Target: < 500 linhas por agente
- Se exceder: Arquivar dados antigos (manter últimos 3-6 meses)

**Workflow Docs**:
- Target: < 300 linhas por workflow
- Se exceder: Split em sub-docs

---

## CHECKLIST DE ATUALIZAÇÃO

Use este checklist ao atualizar memória:

### Pre-Update
- [ ] Identifiquei tipo de evento (skill/gap/rejeição/sessão/SPEC)
- [ ] Sei quais arquivos atualizar (MEMORY.md / agent memory / workflows)
- [ ] Li arquivos atuais para entender formato

### MEMORY.md Global
- [ ] Atualizei header (data, sessões, spec atual)
- [ ] Atualizei estatísticas (skills count, personas count, etc.)
- [ ] Adicionei evento à Memória Episódica Recente (top 5-10)
- [ ] Adicionei/atualizei Notas da Sessão (se sessão significativa)
- [ ] Mantive formato sucinto (NO workflows completos aqui)
- [ ] Verifiquei que não excedi 1000 linhas

### memory/{agente}-memory.md (Agent-Specific)
- [ ] Se gap detectado: Adicionei linha à tabela "Gaps Detectados"
- [ ] Se rejeição: Adicionei linha à tabela "Log de Rejeicoes"
- [ ] Se sessão significativa: Adicionei nota detalhada em "Notas de Sessao"
- [ ] Mantive tabelas formatadas corretamente (pipes alinhados)
- [ ] Verifiquei que não excedi 500 linhas

### .context/workflows/ (Se Workflow Complexo)
- [ ] SPEC completa com pattern reutilizável? → Criar workflow doc
- [ ] Usei template de workflow doc
- [ ] Documentei: contexto, metrics, execution pattern, learned actions
- [ ] Verifiquei que não excedi 300 linhas

### Post-Update
- [ ] Arquivos salvos corretamente
- [ ] Formato Markdown válido (sem erros de sintaxe)
- [ ] Tabelas renderizam corretamente (pipes alinhados)
- [ ] Links internos funcionam (se aplicável)

---

## EXEMPLOS PRÁTICOS

### Exemplo 1: Criar Skill de Java 23

**Evento**: Skill `java-23` criada e aprovada

**Ações**:

1. **Atualizar MEMORY.md**:
```markdown
**Ultima Atualizacao:** 2026-02-03
**Sessoes Totais:** 19  # ← INCREMENTOU

| Metrica | Valor |
| Skills Totais | 11 |  # ← FOI 10, AGORA 11
| Language Advanced | 6 |  # ← FOI 5, AGORA 6

## Memoria Episodica Recente
| Data | Tipo | Nome | Status |
| 2026-02-03 | skill | java-23 baseline | ✅ created |  # ← NOVO
```

2. **Atualizar memory/opencode-memory.md**:
```markdown
## Notas de Sessao

### Session 19 (2026-02-03) - Java 23 Skill Creation
- Created java-23 baseline skill (Virtual Threads, Pattern Matching, Sequenced Collections)
- Self-Critique score: 99/100
- Applied learned actions: version-agnostic baseline, JIT sub-files pattern
- Result: Approved first time, no rejections
```

3. **NÃO criar workflow doc** (single skill, pattern já documentado em SPEC-010)

---

### Exemplo 2: Gap Detectado - Kafka

**Evento**: Usuário pediu "Como usar Kafka?", não temos skill, usuário escolheu "defer"

**Ações**:

1. **NÃO atualizar MEMORY.md** (gaps vão apenas em agent memory)

2. **Atualizar memory/opencode-memory.md**:
```markdown
## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "Como usar Kafka?" | kafka-basics | pending |  # ← NOVO
```

3. **NÃO criar workflow doc** (gap detection é evento simples)

---

### Exemplo 3: Rejeição - Redis Cache

**Evento**: Skill `redis-cache` rejeitada por "Exemplos incorretos"

**Ações**:

1. **NÃO atualizar MEMORY.md** (rejeições vão apenas em agent memory)

2. **Atualizar memory/opencode-memory.md**:
```markdown
## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-03 | skill | redis-cache | "Exemplos incorretos" | exemplos | Testar comandos antes de mostrar |  # ← NOVO

## Padroes Identificados

**Categoria "exemplos"**: 6 ocorrencias de 12 total = 50% > 30% ✅ **PADRAO DETECTADO**

**Acao Proativa**: Na proxima skill, enfatizar: "Verifiquei que os exemplos funcionam"
```

3. **NÃO criar workflow doc** (rejeição é evento simples)

---

### Exemplo 4: SPEC-010 Completa

**Evento**: SPEC-010 Language Skills Baseline completa (5 skills, 99.20 avg)

**Ações**:

1. **Atualizar MEMORY.md**:
```markdown
**Spec Atual:** SPEC-010 ✅ COMPLETE | SPEC-003 🟢 READY

## Memoria Episodica Recente
| 2026-02-03 | spec | SPEC-010 Language Skills Baseline | ✅ complete |

## Notas da Sessao

### Sessao 15 (2026-02-03) - SPEC-010 COMPLETE ✅

**Feature: Language baseline skills (5 languages) — 100% COMPLETE**

- **Tempo total**: ~4.25 horas (5 skills × ~51min)
- **Skills**: Java (100), Kotlin (99), C/C++ (99), JavaScript (99), Python (99)
- **Innovation**: JIT sub-files pattern for T0-SIZE-01 compliance
- **Reports**: 3 final reports generated
- **Result**: ✅ 100% approval rate, 0 rejections, 99.20 avg score
```

2. **Atualizar memory/opencode-memory.md**:
```markdown
## Notas de Sessao

### Session 15 (2026-02-03) - SPEC-010 Complete
- Created 5 language baseline skills (Java, Kotlin, C/C++, JavaScript, Python)
- Average Self-Critique score: 99.20/100
- Innovation: JIT sub-files pattern (C/C++ 3 files, JavaScript 1 file, Python 1 file)
- Key learnings: Version-agnostic baselines, Self-Critique ≥99 → approval
- Generated 3 final reports (metrics, gap-detection, rejection-analysis)
- Total time: 4.25 hours (~51min per skill, 15% faster than 60min target)
```

3. **Criar workflow doc** `.context/workflows/spec-010-execution-pattern.md`:
```markdown
# SPEC-010 Language Skills Baseline - Execution Pattern

> **Padrão de execução documentado para criação de language baseline skills.**  
> Baseado em: SPEC-010 Language Skills Baseline

## Metrics

| Métrica | Valor |
| Skills Created | 5 (Java, Kotlin, C/C++, JavaScript, Python) |
| Avg Self-Critique Score | 99.20/100 |
| Rejection Rate | 0% |
| Avg Time per Skill | 51 minutes |

## Learned Actions

1. **Version-Agnostic Baselines**: Avoid version-specific markers in L1 baselines
2. **JIT Sub-Files Pattern**: Extract detailed sections to keep main skill < 1,400 tokens
3. **Self-Critique as Rejection Prevention**: Score ≥99 correlates with approval
...
```

---

## TROUBLESHOOTING

### Problema: "Não sei qual agent memory usar"

**Solução**: Use o nome do agente que está executando:
- OpenCode → `memory/opencode-memory.md`
- Itzamna → `memory/itzamna-memory.md`
- Claude → `memory/claude-memory.md`
- Gemini → `memory/gemini-memory.md`
- Qwen → `memory/qwen-memory.md`

Se arquivo não existe, crie usando template da Fase 3.1.

---

### Problema: "MEMORY.md está ficando muito grande"

**Solução**:
1. Mover sessões antigas (> 10 sessões atrás) para `docs/history/memory-archive-{YEAR}.md`
2. Manter apenas últimas 10 sessões em MEMORY.md
3. Manter estatísticas e memória episódica completas

---

### Problema: "Esqueci de atualizar memória após criar skill"

**Solução**:
1. PARE imediatamente
2. Antes de fazer qualquer commit, atualize:
   - MEMORY.md (estatísticas + episódica)
   - `memory/{agente}-memory.md` (nota de sessão)
3. Commite artifact + memória juntos

**❌ NUNCA commite artifact sem atualizar memória** (viola T0-MEMORY-01)

---

### Problema: "Tabelas de gaps/rejeições ficaram desalinhadas"

**Solução**:
1. Use editor com suporte Markdown (VSCode, Cursor)
2. Use formatter de tabelas Markdown
3. Verifique que pipes `|` estão alinhados verticalmente
4. Teste render antes de commitar

---

### Problema: "Não sei se devo criar workflow doc"

**Decisão**:

| Situação | Criar Workflow Doc? |
|----------|---------------------|
| SPEC completa (multi-phase) | ✅ Sim |
| Pattern execution reutilizável | ✅ Sim |
| Metrics significativas coletadas | ✅ Sim |
| Single skill/persona criada | ❌ Não (apenas agent memory) |
| Gap/rejeição registrada | ❌ Não (apenas agent memory) |
| Sessão de bug fixes | ❌ Não (apenas agent memory) |

Se em dúvida, pergunte ao humano.

---

## INTEGRAÇÃO COM OUTROS PROTOCOLOS

### AUTO-INCREMENT.md

Quando AUTO-INCREMENT detecta gap e usuário escolhe "defer":

```
1. AUTO-INCREMENT identifica gap: "skill X não existe"
2. Usuário escolhe "defer"
3. ⚠️ MEMORY-MANAGEMENT: Registrar gap em memory/{agente}-memory.md
4. AUTO-INCREMENT continua monitorando
```

**Responsabilidade**: AUTO-INCREMENT chama MEMORY-MANAGEMENT para persistir gap

---

### HUMAN-GATE.md

Quando HUMAN-GATE resulta em "reject":

```
1. HUMAN-GATE apresenta artifact
2. Humano rejeita com feedback
3. ⚠️ MEMORY-MANAGEMENT: Registrar rejeição em memory/{agente}-memory.md
4. HUMAN-GATE cancela operação
```

**Responsabilidade**: HUMAN-GATE chama MEMORY-MANAGEMENT para persistir rejeição

---

### SELF-CRITIQUE.md

SELF-CRITIQUE não interage diretamente com MEMORY-MANAGEMENT, mas:

```
Self-Critique score → Human Gate → Approval/Rejection → MEMORY-MANAGEMENT
```

Se rejection, feedback vai para memory via MEMORY-MANAGEMENT.

---

## SEQUÊNCIA DE PROTOCOLOS ATUALIZADA

```
1. AUTO-INCREMENT → Verificar gaps
   ├─ Se gap + defer → MEMORY-MANAGEMENT (registrar gap)
   └─ Se continuar → Fase 2

2. GENERATE → Criar artefato

3. SELF-CRITIQUE → Avaliar qualidade

4. HUMAN-GATE → Apresentar ao humano
   ├─ Se approve → Fase 5
   └─ Se reject → MEMORY-MANAGEMENT (registrar rejeição) → STOP

5. COMMIT → Persistir mudanças
   └─ MEMORY-MANAGEMENT (atualizar MEMORY.md + agent memory) ← ⚠️ OBRIGATÓRIO

6. MEMORY-MANAGEMENT → Garantir memória atualizada ← ⚠️ NOVO
```

**⚠️ CRITICAL**: MEMORY-MANAGEMENT é chamado em 3 momentos:
1. Após gap deferred (por AUTO-INCREMENT)
2. Após rejection (por HUMAN-GATE)
3. **Após commit bem-sucedido** (SEMPRE, para qualquer artifact criado)

---

## CONSTITUTION INTEGRATION

### T0-MEMORY-01 (Tier 0 - Inviolável)

**Regra**: SEMPRE atualizar MEMORY.md após ações significativas

**Violação**: Criar artifact + commit SEM atualizar MEMORY.md

**Enforcement**: MEMORY-MANAGEMENT protocol obrigatório na sequência

**Verificação**:
```bash
# Antes de commit, verificar se memória foi atualizada
git diff MEMORY.md  # Deve mostrar mudanças
git diff memory/{agente}-memory.md  # Deve mostrar mudanças (se aplicável)
```

---

## REFERÊNCIAS

- `.prompt-os/CONSTITUTION.md` - Regra T0-MEMORY-01
- `.prompt-os/core/AUTO-INCREMENT.md` - Gap detection que alimenta memória
- `.prompt-os/core/HUMAN-GATE.md` - Rejections que alimentam memória
- `MEMORY.md` - Memória global do sistema
- `memory/` - Memórias distribuídas por agente
- `.context/workflows/` - Workflow docs detalhados

---

## TEMPLATE RÁPIDO

### Criar Skill (Exemplo Completo)

1. **Executar protocolos** → Skill aprovada
2. **Atualizar MEMORY.md**:
   ```markdown
   **Ultima Atualizacao:** 2026-02-03
   **Sessoes Totais:** 20  # ← +1
   
   | Skills Totais | 12 |  # ← +1
   
   | 2026-02-03 | skill | {skill-name} | ✅ created |  # ← NOVO
   ```
3. **Atualizar memory/opencode-memory.md**:
   ```markdown
   ### Session 20 (2026-02-03) - {Skill Name} Creation
   - Created {skill-name} skill ({brief-description})
   - Self-Critique: {score}/100
   - Result: Approved first time
   ```
4. **Commit tudo junto**:
   ```bash
   git add skills/ MEMORY.md memory/
   git commit -m "feat(skill): add {skill-name}"
   ```

---

**EOF** | Version: 2.1.0 | Protocol: MEMORY-MANAGEMENT
