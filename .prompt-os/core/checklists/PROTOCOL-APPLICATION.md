# Checklist de Aplicacao de Protocolos

> **Guia passo-a-passo para agentes aplicarem protocolos corretamente.**  
> Use esta checklist ao gerar qualquer artefato que requer file write.

---

## Quando Usar Este Checklist

Use esta checklist **SEMPRE** que for:
- Criar novo skill, persona, ou documento
- Modificar arquivo existente
- Gerar codigo que sera commitado
- Fazer qualquer operacao que escreve arquivos

**Excecao:** Operacoes read-only (buscar, analisar, responder) nao precisam.

---

## Pre-Generation

Antes de comecar, verifique:

- [ ] Li o bootstrap file do meu agente (AGENTS.md, QWEN.md, GEMINI.md, CLAUDE.md, .cursorrules, ou .github/copilot-instructions.md)
- [ ] Entendi a sequencia obrigatoria: AUTO-INCREMENT → GENERATE → SELF-CRITIQUE → HUMAN-GATE → COMMIT → MEMORY-MANAGEMENT
- [ ] Verifiquei que esta task requer file write (nao e apenas read-only)
- [ ] Carreguei protocolos relevantes: `.prompt-os/core/AUTO-INCREMENT.md`, `SELF-CRITIQUE.md`, `HUMAN-GATE.md`, `MEMORY-MANAGEMENT.md`

**Se qualquer item falhou:** Pare e leia os arquivos necessarios antes de continuar.

---

## Phase 1: AUTO-INCREMENT

**Objetivo:** Detectar lacunas (gaps) e evitar redundancia.

- [ ] Li `.prompt-os/core/AUTO-INCREMENT.md`
- [ ] Verifiquei se artefato similar ja existe no INDEX.md
- [ ] Se similar existe: Avaliei se novo artefato adiciona valor incremental
- [ ] Se gap detectado: Informei usuario com 3 opcoes (agora | defer | skip)
- [ ] Se usuario escolheu "defer": Registrei gap em `memory/{agente}-memory.md`
- [ ] Se usuario escolheu "skip": Cancelei operacao
- [ ] Se usuario escolheu "agora" ou nao ha gap: Prossegui para Phase 2

**Output:** Decisao clara sobre continuar ou nao.

---

## Phase 2: GENERATE

**Objetivo:** Criar artefato completo e correto.

- [ ] Identifiquei tipo de artefato (skill, persona, code, doc)
- [ ] Carreguei template apropriado de `.prompt-os/templates/`
- [ ] Segui architectural rules (`.context/standards/architectural-rules.md`)
- [ ] Apliquei learned actions:
  - [ ] Version-agnostic baselines (se aplicavel)
  - [ ] JIT sub-files para skills grandes (se aplicavel)
  - [ ] Token budget respeitado (skills < 1400 tokens, T0-SIZE-01)
- [ ] Se skill: Verifiquei fontes e adicionei citacoes (T0-SOURCE-01)
- [ ] Gerei artefato completo (nao apenas outline)

**Output:** Artefato pronto para avaliacao.

---

## Phase 3: SELF-CRITIQUE

**Objetivo:** Avaliar qualidade antes de apresentar ao humano.

- [ ] Li `.prompt-os/core/SELF-CRITIQUE.md`
- [ ] Avaliei em 4 dimensoes:
  - [ ] **Completude** (0-25): Cobre todos aspectos necessarios?
  - [ ] **Clareza** (0-25): Linguagem clara, bem organizada?
  - [ ] **Correcao** (0-25): Tecnicamente correto, sem erros?
  - [ ] **Best Practices** (0-25): Segue padroes e convencoes?
- [ ] Calculei score total (0-100)
- [ ] Determinei band: Excellent (90-100) | Good (75-89) | Fair (60-74) | Poor (<60)
- [ ] Gerei YAML estruturado com:
  - [ ] Strengths (2-3 pontos fortes)
  - [ ] Weaknesses (2-3 pontos fracos)
  - [ ] Suggestions (2-3 melhorias)
- [ ] Verifiquei Constitution violations:
  - [ ] T0 violations (critico - corrigir imediatamente)
  - [ ] T1 violations (importante - avisar)
  - [ ] T2 violations (menor - avisar se relevante)
- [ ] Se skill: Detectei redundancia com skills existentes
- [ ] Se score < 75: Corrigi problemas e reavaliie

**Output:** Score, band, analise estruturada em YAML.

---

## Phase 4: HUMAN-GATE ⚠️ CHECKPOINT OBRIGATORIO

**Objetivo:** Apresentar artefato ao humano e aguardar aprovacao.

- [ ] Li `.prompt-os/core/HUMAN-GATE.md`
- [ ] Apresentei artefato com score visual:
  ```
  ============================================
   HUMAN GATE - APPROVAL REQUIRED
  ============================================
   Artifact: {nome}
   Type: {tipo}
   
   SELF-CRITIQUE: {score}/100 ({band}) {indicador}
  ```
- [ ] Mostrei preview completo do artefato (nao apenas summary)
- [ ] Mostrei self-critique YAML completo
- [ ] Informei acoes pendentes (files to write, INDEX.md updates, etc.)
- [ ] Aguardei aprovacao do humano com opcoes claras:
  - `approve` - Prosseguir com commit
  - `view` - Ver detalhes especificos
  - `edit` - Fazer alteracoes
  - `reject` - Cancelar completamente
  - `cancel` - Cancelar completamente
- [ ] ⚠️ **CONFIRMEI:** NAO escrevi nenhum arquivo antes de receber "approve"

**⚠️ CRITICO:** Pular este checkpoint e uma **violacao T0-HUMAN-01**. NUNCA escreva arquivos sem aprovacao explicita do humano.

**Output:** Decisao do humano (approve | edit | reject | cancel).

---

## Phase 5: COMMIT (Somente Apos Aprovacao)

**Objetivo:** Persistir mudancas de forma organizada.

**⚠️ So execute esta fase se recebeu "approve" no Human Gate!**

- [ ] Escrevi arquivos usando Write tool
- [ ] Atualizei INDEX.md relevante:
  - [ ] Usei section replacement (nao line replacement)
  - [ ] Verifiquei formatacao (tabelas alinhadas)
  - [ ] Testei links gerados
- [ ] Verifiquei files modificados: `git status`
- [ ] Criei commit com conventional commits:
  - [ ] Tipo correto: `feat` | `fix` | `docs` | `refactor` | `test`
  - [ ] Escopo apropriado: `(skills)` | `(protocols)` | `(memory)` | etc.
  - [ ] Mensagem descritiva (50 chars no titulo)
  - [ ] Body detalhado se necessario
- [ ] Confirmei commit bem-sucedido: `git log -1`

**Output:** Mudancas persistidas, indices atualizados, commit criado.

---

## Phase 6: MEMORY-MANAGEMENT ⚠️ OBRIGATORIO

**Objetivo:** Atualizar memoria distribuida para manter historico e contexto.

**⚠️ CRITICAL: Esta fase e OBRIGATORIA apos QUALQUER artifact criado!**

- [ ] Li `.prompt-os/core/MEMORY-MANAGEMENT.md`
- [ ] Atualizei MEMORY.md (global):
  - [ ] Header (Ultima Atualizacao, Sessoes Totais +1, Spec Atual)
  - [ ] Estatisticas (Skills Totais +1, Taxa de Aprovacao, etc.)
  - [ ] Memoria Episodica Recente (adicionei evento no topo, max 5-10)
  - [ ] Notas da Sessao (adicionei/atualizei nota da sessao atual)
  - [ ] Mantive sucinto (NO workflows completos)
- [ ] Atualizei memory/{agente}-memory.md (agent-specific):
  - [ ] Se gap foi deferred: Adicionei linha à tabela "Gaps Detectados"
  - [ ] Se artifact foi rejeitado: Adicionei linha à tabela "Log de Rejeicoes"
  - [ ] Adicionei nota de sessao detalhada em "Notas de Sessao"
  - [ ] Mantive tabelas formatadas (pipes alinhados)
- [ ] Se SPEC completa: Considerei criar workflow doc em `.context/workflows/`
- [ ] ⚠️ Commitei memoria junto com artifact (nunca separado)

**⚠️ CRITICO:** Commitar artifact sem atualizar memoria e uma **violacao T0-MEMORY-01**.

**Output:** Memoria atualizada, contexto preservado, historico mantido.

---

## Post-Commit Verification

Apos commit, verifique rapidamente:

- [ ] `git status` mostra working tree limpo
- [ ] Arquivos criados existem no filesystem
- [ ] INDEX.md abre sem erros de formatacao
- [ ] MEMORY.md foi atualizado corretamente ⚠️ OBRIGATORIO
- [ ] memory/{agente}-memory.md foi atualizado (se aplicavel)

**Se qualquer verificacao falhou:** Corrija imediatamente com novo commit (nao use `--amend` a menos que commit nao foi pushed).

---

## Checklist Rapido (Resume)

Para referencia rapida durante execucao:

```
[ ] AUTO-INCREMENT: Gap detection executado
[ ] GENERATE: Artefato criado completamente
[ ] SELF-CRITIQUE: Score calculado (>= 75/100)
[ ] HUMAN-GATE: Apresentado e aprovado pelo humano ⚠️
[ ] COMMIT: Files escritos, INDEX.md atualizado, commit criado
[ ] MEMORY-MANAGEMENT: MEMORY.md + agent memory atualizados ⚠️
```

**⚠️ Lembre-se:** 
- HUMAN-GATE e obrigatorio (T0-HUMAN-01)
- MEMORY-MANAGEMENT e obrigatorio (T0-MEMORY-01)
- Pular qualquer um = T0 violation

---

## Troubleshooting

### Problema: "Esqueci de fazer Self-Critique"
**Solucao:** PARE. Nao apresente ao Human Gate sem Self-Critique. Volte para Phase 3.

### Problema: "Score muito baixo (< 60)"
**Solucao:** NAO apresente ao Human Gate. Corrija problemas e reavalie ate atingir >= 75.

### Problema: "Ja escrevi arquivo sem aprovacao"
**Solucao:** VIOLACAO T0-HUMAN-01. Delete arquivo, apresente via Human Gate corretamente.

### Problema: "Usuario rejeitou no Human Gate"
**Solucao:** Normal. Registre feedback em memory, aprenda, e tente novamente se usuario quiser.

### Problema: "Nao sei se task requer file write"
**Solucao:** Se tem duvida, pergunte ao usuario. Se for gerar codigo/skill/doc = sim.

---

## Referencias

- `.prompt-os/core/AUTO-INCREMENT.md` - Gap detection
- `.prompt-os/core/SELF-CRITIQUE.md` - Auto-avaliacao
- `.prompt-os/core/HUMAN-GATE.md` - Aprovacao humana
- `.prompt-os/CONSTITUTION.md` - Regras T0/T1/T2
- `.context/standards/architectural-rules.md` - Standards

---

**EOF** | Version: 2.1.0
