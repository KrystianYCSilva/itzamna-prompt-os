# SPEC-010 Execution Checklist

**Spec:** Language Skills Baseline  
**Started:** 2026-02-03  
**Estimated Duration:** 5-8 days  
**Status:** 🔵 IN PROGRESS

---

## Phase 1: Setup & Baseline (5 Skills)

### Pre-Execution Setup ✅ COMPLETE

- [x] Inicializar estrutura `memory/` para tracking
- [x] Criar checklist de execução (este arquivo)
- [x] Criar guias de coleta de dados
- [x] Criar templates de relatórios
- [x] Atualizar ITZAMNA-AGENT.md com workflow

**Phase 1 Status**: ✅ COMPLETE - All prerequisites verified and protocols loaded

### Linguagem 1: Java ✅ COMPLETE

- [x] **Research** - Identificar conceitos core (15 min)
  - [x] Tipagem (forte, estática)
  - [x] Gerenciamento de memória (GC)
  - [x] Concorrência (threads, synchronized)
  - [x] Ecossistema (JVM, Maven/Gradle)
  
- [x] **Generate** - Criar `SKILL.md` usando template (20 min)
  - [x] Preencher YAML frontmatter
  - [x] Escrever seções obrigatórias
  - [x] Adicionar 3+ exemplos práticos
  - [x] Incluir fontes/referências

- [x] **Self-Critique** - Avaliar qualidade (5 min)
  - [x] Executar protocolo SELF-CRITIQUE.md
  - [x] Verificar score >=70 (target: 85+) → Score: 100/100
  - [x] Documentar score em `memory/opencode-spec010-session.md`
  - [x] Se score <70: revisar e re-avaliar

- [x] **Human Gate** - Apresentar para aprovação (variável)
  - [x] Mostrar preview estruturado
  - [x] Aguardar decisão: approve | view | edit | reject | cancel → APPROVED
  - [x] Se rejected: registrar em Log de Rejeições
  - [x] Se approved: prosseguir para Index

- [x] **Index** - Registrar no sistema (5 min)
  - [x] Adicionar em `skills/INDEX.md`
  - [x] Adicionar em `.prompt-os/skills/INDEX.md`
  - [x] Commit com mensagem padronizada → commit f98c934

- [x] **Monitor** - Registrar métricas (2 min)
  - [x] Tempo total gasto → ~45 min
  - [x] Score final → 100/100
  - [x] Gaps detectados (se houver) → 0 gaps
  - [x] Lições aprendidas → "Baseline = version-agnostic"

**Tempo estimado:** ~45 min  
**Tempo real:** ~45 min  
**Status:** ✅ COMPLETE (commit f98c934)

---

### Linguagem 2: Kotlin ✅ COMPLETE

- [x] **Research** - Identificar conceitos core (15 min)
  - [x] Null safety
  - [x] Coroutines
  - [x] Extension functions
  - [x] Interop com Java

- [x] **Generate** - Criar `SKILL.md` usando template (20 min)
- [x] **Self-Critique** - Avaliar qualidade (5 min) → Score: 99/100
- [x] **Human Gate** - Apresentar para aprovação (variável) → APPROVED
- [x] **Index** - Registrar no sistema (5 min)
- [x] **Monitor** - Registrar métricas (2 min)

**Tempo estimado:** ~45 min  
**Tempo real:** ~45 min  
**Status:** ✅ COMPLETE (commit 6ed835a)

---

### Linguagem 3: C/C++ ✅ COMPLETE

- [x] **Research** - Identificar conceitos core (15 min)
  - [x] Ponteiros e gerenciamento manual de memória
  - [x] Compilação (preprocessor, linker)
  - [x] STL (C++) vs stdlib (C)
  - [x] RAII, smart pointers (C++)

- [x] **Generate** - Criar `SKILL.md` usando template (20 min)
- [x] **Self-Critique** - Avaliar qualidade (5 min) → Score: 99/100
- [x] **Human Gate** - Apresentar para aprovação (variável) → APPROVED (after refactoring)
- [x] **Index** - Registrar no sistema (5 min)
- [x] **Monitor** - Registrar métricas (2 min)

**Tempo estimado:** ~45 min  
**Tempo real:** ~60 min (included JIT refactoring)  
**Status:** ✅ COMPLETE (commit c24cf50)  
**Innovation:** JIT sub-files architecture (compilation.md, build-tools.md, advanced-memory.md)

---

### Linguagem 4: JavaScript

- [x] **Research** - Identificar conceitos core (15 min)
  - [x] Tipagem dinâmica
  - [x] Event loop e assincronismo (Promises, async/await)
  - [x] Prototypal inheritance
  - [x] Ecossistema (npm, Node.js, browsers)

- [x] **Generate** - Criar `SKILL.md` usando template (20 min)
- [x] **Self-Critique** - Avaliar qualidade (5 min)
- [x] **Human Gate** - Apresentar para aprovação (variável)
- [x] **Index** - Registrar no sistema (5 min)
- [x] **Monitor** - Registrar métricas (2 min)

**Tempo estimado:** ~45 min  
**Status:** ✅ COMPLETE (commit 7e6d762)  
**Score:** 99/100 (Excellent)  
**Architecture:** Main skill + 1 JIT sub-file (ecosystem.md)

---

### Linguagem 5: Python

- [ ] **Research** - Identificar conceitos core (15 min)
  - [ ] Duck typing
  - [ ] List comprehensions
  - [ ] Decorators
  - [ ] Ecossistema (pip, virtualenv, PyPI)

- [ ] **Generate** - Criar `SKILL.md` usando template (20 min)
- [ ] **Self-Critique** - Avaliar qualidade (5 min)
- [ ] **Human Gate** - Apresentar para aprovação (variável)
- [ ] **Index** - Registrar no sistema (5 min)
- [ ] **Monitor** - Registrar métricas (2 min)

**Tempo estimado:** ~45 min  
**Status:** ⬜ NOT STARTED

---

## Phase 2: Specialization Planning (Future)

- [ ] Mapear versões críticas de cada linguagem
- [ ] Mapear tópicos profundos para sub-skills
- [ ] Definir estrutura de subpastas

**Status:** 📋 PLANNED (não nesta spec)

---

## Métricas de Sucesso

### Quantitativas

| Métrica | Target | Atual | Status |
|---------|--------|-------|--------|
| Skills criadas | 5 | 4 | 🔵 |
| Avg Self-Critique score | ≥75 | 99.25 | ✅ |
| Rejection rate | <20% | 0% | ✅ |
| Constitution violations | 0 | 0 | ✅ |
| Avg time per skill | <60min | ~50min | ✅ |

### Qualitativas

- [ ] Todas as skills têm 3+ exemplos funcionais
- [ ] Nenhuma skill contém placeholders `[XXX]`
- [ ] Todas as fontes estão citadas
- [ ] Estrutura hierárquica `linguagens/{lang}/SKILL.md` criada
- [ ] INDEX atualizado corretamente

---

## Data Collection Points

### Durante Execução

**A cada skill gerada:**
1. ✅ Registrar Self-Critique score em `memory/opencode-spec010-session.md`
2. ✅ Se rejeitado: registrar categoria e motivo no Log de Rejeições
3. ✅ Se gap detectado: registrar no Gaps Detectados
4. ✅ Anotar tempo gasto (research + generate + critique + gate)

**No final da sessão:**
1. ✅ Gerar Gap Detection Report (se houver gaps)
2. ✅ Gerar Rejection Analysis Report (se houver rejeições)
3. ✅ Gerar Self-Critique Metrics Report
4. ✅ Documentar lições aprendidas

---

## Quick Commands

**Iniciar skill:**
```bash
# Copiar template
cp .prompt-os/templates/SKILL.template.md .prompt-os/skills/linguagens/{lang}/SKILL.md

# Abrir para edição
code .prompt-os/skills/linguagens/{lang}/SKILL.md
```

**Após aprovação:**
```bash
# Adicionar ao INDEX
echo "| {lang} | L1 | Conceitos fundamentais da linguagem {Lang} |" >> skills/INDEX.md

# Commit
git add .prompt-os/skills/linguagens/{lang}/SKILL.md skills/INDEX.md
git commit -m "feat(skill): add {lang} baseline skill (L1, linguagens)"
```

**Registrar score:**
```bash
# Adicionar linha à tabela Self-Critique Tracking em memory/opencode-spec010-session.md
echo "| 2026-02-03 | {lang} | skill | {score} | {comp} | {clar} | {corr} | {bp} | {notes} |"
```

---

## Troubleshooting

**Se score <70:**
1. Revisar dimensão com menor score
2. Adicionar mais exemplos ou detalhes
3. Simplificar linguagem (se clareza baixa)
4. Adicionar fontes (se completude baixa)
5. Re-executar Self-Critique

**Se rejeitado:**
1. Registrar motivo no Log de Rejeições
2. Identificar categoria
3. Aplicar correção específica
4. Re-submeter via Human Gate

**Se gap detectado:**
1. Registrar skill sugerida
2. Decidir: criar agora ou defer
3. Se defer: marcar como `pending` para futura implementação

---

## Session Log

### 2026-02-03 - JavaScript Complete, Python Remaining

- ✅ Infraestrutura de monitoramento criada
- ✅ Checklist inicializado
- ✅ **Java baseline COMPLETE** (score: 100/100, commit f98c934)
- ✅ **Kotlin baseline COMPLETE** (score: 99/100, commit 6ed835a)
- ✅ **C/C++ baseline COMPLETE** (score: 99/100, commit c24cf50)
  - Innovation: JIT sub-files (compilation.md, build-tools.md, advanced-memory.md)
  - Refactored from 2,500 → 1,400 tokens to meet T0-SIZE-01
- ✅ **JavaScript baseline COMPLETE** (score: 99/100, commit 7e6d762)
  - Applied JIT pattern: 1 sub-file (ecosystem.md)
  - Refactored from 2,750 → 1,500 tokens
- ⏳ Next: Python baseline (Phase 7, Final Language)

---

**Próxima ação:** Executar comandos SpecKit para JavaScript baseline

**Template path:** `.prompt-os/templates/SKILL.template.md`  
**Target path:** `.prompt-os/skills/linguagens/javascript/SKILL.md`  
**Protocol:** SELF-CRITIQUE.md, HUMAN-GATE.md, AUTO-INCREMENT.md

---

**Versão:** 1.2  
**Última atualização:** 2026-02-03 (C/C++ complete with JIT architecture)
