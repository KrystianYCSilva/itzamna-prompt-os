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

### Linguagem 1: Java

- [ ] **Research** - Identificar conceitos core (15 min)
  - [ ] Tipagem (forte, estática)
  - [ ] Gerenciamento de memória (GC)
  - [ ] Concorrência (threads, synchronized)
  - [ ] Ecossistema (JVM, Maven/Gradle)
  
- [ ] **Generate** - Criar `SKILL.md` usando template (20 min)
  - [ ] Preencher YAML frontmatter
  - [ ] Escrever seções obrigatórias
  - [ ] Adicionar 3+ exemplos práticos
  - [ ] Incluir fontes/referências

- [ ] **Self-Critique** - Avaliar qualidade (5 min)
  - [ ] Executar protocolo SELF-CRITIQUE.md
  - [ ] Verificar score >=70 (target: 85+)
  - [ ] Documentar score em `memory/opencode-spec010-session.md`
  - [ ] Se score <70: revisar e re-avaliar

- [ ] **Human Gate** - Apresentar para aprovação (variável)
  - [ ] Mostrar preview estruturado
  - [ ] Aguardar decisão: approve | view | edit | reject | cancel
  - [ ] Se rejected: registrar em Log de Rejeições
  - [ ] Se approved: prosseguir para Index

- [ ] **Index** - Registrar no sistema (5 min)
  - [ ] Adicionar em `skills/INDEX.md`
  - [ ] Adicionar em `.prompt-os/skills/INDEX.md`
  - [ ] Commit com mensagem padronizada

- [ ] **Monitor** - Registrar métricas (2 min)
  - [ ] Tempo total gasto
  - [ ] Score final
  - [ ] Gaps detectados (se houver)
  - [ ] Lições aprendidas

**Tempo estimado:** ~45 min  
**Status:** ⬜ NOT STARTED

---

### Linguagem 2: Kotlin

- [ ] **Research** - Identificar conceitos core (15 min)
  - [ ] Null safety
  - [ ] Coroutines
  - [ ] Extension functions
  - [ ] Interop com Java

- [ ] **Generate** - Criar `SKILL.md` usando template (20 min)
- [ ] **Self-Critique** - Avaliar qualidade (5 min)
- [ ] **Human Gate** - Apresentar para aprovação (variável)
- [ ] **Index** - Registrar no sistema (5 min)
- [ ] **Monitor** - Registrar métricas (2 min)

**Tempo estimado:** ~45 min  
**Status:** ⬜ NOT STARTED

---

### Linguagem 3: C/C++

- [ ] **Research** - Identificar conceitos core (15 min)
  - [ ] Ponteiros e gerenciamento manual de memória
  - [ ] Compilação (preprocessor, linker)
  - [ ] STL (C++) vs stdlib (C)
  - [ ] RAII, smart pointers (C++)

- [ ] **Generate** - Criar `SKILL.md` usando template (20 min)
- [ ] **Self-Critique** - Avaliar qualidade (5 min)
- [ ] **Human Gate** - Apresentar para aprovação (variável)
- [ ] **Index** - Registrar no sistema (5 min)
- [ ] **Monitor** - Registrar métricas (2 min)

**Tempo estimado:** ~45 min  
**Status:** ⬜ NOT STARTED

---

### Linguagem 4: JavaScript

- [ ] **Research** - Identificar conceitos core (15 min)
  - [ ] Tipagem dinâmica
  - [ ] Event loop e assincronismo (Promises, async/await)
  - [ ] Prototypal inheritance
  - [ ] Ecossistema (npm, Node.js, browsers)

- [ ] **Generate** - Criar `SKILL.md` usando template (20 min)
- [ ] **Self-Critique** - Avaliar qualidade (5 min)
- [ ] **Human Gate** - Apresentar para aprovação (variável)
- [ ] **Index** - Registrar no sistema (5 min)
- [ ] **Monitor** - Registrar métricas (2 min)

**Tempo estimado:** ~45 min  
**Status:** ⬜ NOT STARTED

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
| Skills criadas | 5 | 0 | ⬜ |
| Avg Self-Critique score | ≥75 | - | ⬜ |
| Rejection rate | <20% | - | ⬜ |
| Constitution violations | 0 | - | ⬜ |
| Avg time per skill | <60min | - | ⬜ |

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

### 2026-02-03 - Setup

- ✅ Infraestrutura de monitoramento criada
- ✅ Checklist inicializado
- ⏳ Aguardando início da execução

---

**Próxima ação:** Executar comandos SpecKit para Java baseline

**Template path:** `.prompt-os/templates/SKILL.template.md`  
**Target path:** `.prompt-os/skills/linguagens/java/SKILL.md`  
**Protocol:** SELF-CRITIQUE.md, HUMAN-GATE.md, AUTO-INCREMENT.md

---

**Versão:** 1.0  
**Última atualização:** 2026-02-03
