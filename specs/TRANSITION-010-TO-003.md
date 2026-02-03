# Transição: SPEC-010 → SPEC-003

**Data:** 2026-02-03  
**De:** SPEC-010 (Language Skills Baseline) - COMPLETE ✅  
**Para:** SPEC-003 (Web Research Protocol Enhancement) - NEXT 🎯

---

## Contexto da Transição

### SPEC-010: O Que Foi Alcançado

**Status:** ✅ **COMPLETE** - Todos os objetivos superados

| Métrica | Target | Alcançado | Delta |
|---------|--------|-----------|-------|
| Skills criadas | 5 | 5 | ✅ 100% |
| Avg Self-Critique score | ≥75 | **99.20** | ✅ +32.3% |
| Rejection rate | <20% | **0%** | ✅ +20% melhor |
| Constitution violations | 0 | **0** | ✅ Perfect |
| Avg time per skill | <60min | **51min** | ✅ +15% faster |
| Gaps detected | <10 | **0** | ✅ Optimal |

**Deliverables completos:**
- ✅ 5 language baseline skills (Java, Kotlin, C/C++, JavaScript, Python)
- ✅ 10 files total (5 SKILL.md + 5 JIT sub-files)
- ✅ 3 final reports (self-critique metrics, gap detection, rejection analysis)
- ✅ Documentation updated (README, project-overview, MEMORY)
- ✅ Skills registry updated (18→23 skills)

**Innovation documentada:** JIT sub-files pattern para T0-SIZE-01 compliance

---

## Por Que SPEC-003 Agora?

### Dependências Satisfeitas

**SPEC-003 depende de:**
1. ✅ SPEC-002 (Auto-Increment) - Implementado e testado
2. ✅ Sistema de protocolos core - 8 protocolos funcionais
3. ✅ Constitution rules - T0-SOURCE-01 definida
4. ✅ MEMORY.md e tracking - Sistema de memória distribuída

**Todas dependências satisfeitas!**

### Motivação da Transição

**Problema identificado durante SPEC-010:**

Durante a criação dos 5 language baselines, o protocolo `WEB-RESEARCH.md` foi usado informalmente. Insights:

1. **Fontes não validadas formalmente** - Skills citam docs oficiais, mas sem processo estruturado
2. **Sem hierarquia de qualidade** - Todas as fontes tratadas igualmente
3. **Sem integração com Auto-Increment** - Sistema não sugere melhoria de fontes
4. **Sem templates de citação** - Formato inconsistente entre skills

**Exemplo (Python baseline):**
```markdown
### Fontes
- Python Official Docs: https://docs.python.org/3/
- Real Python: https://realpython.com/
- PEP 8: https://peps.python.org/pep-0008/
```

**Problema:** Sem validação de:
- Data de acesso
- Nível de autoridade (oficial vs community)
- Recência da informação
- Completude das fontes

**Solução (SPEC-003):** Implementar validation rules, citation templates, quality tiers

---

## Aprendizados SPEC-010 a Aplicar em SPEC-003

### 1. JIT Sub-Files Pattern (Proven)

**Contexto:** C/C++, JavaScript, Python skills excediam 1,400 tokens inicialmente

**Solução aplicada:**
```
skills/linguagens/c-cpp/
├── SKILL.md            # Main: 370 lines (~1,400 tokens)
├── compilation.md      # JIT sub-file
├── build-tools.md      # JIT sub-file
└── advanced-memory.md  # JIT sub-file
```

**Resultado:** Score 94→99 após refatoração

**Aplicação em SPEC-003:**
- Se `WEB-RESEARCH.md` > 1,400 tokens → extrair seções para JIT sub-files
- Candidatos: `source-validation-rules.md`, `citation-templates.md`, `tier-system.md`

### 2. Version-Agnostic Approach (Learned from Java)

**Problema inicial:** Java skill mencionava "Java 17/21" (version-specific)

**Solução:** Use "Java (moderno)" para evitar content desatualizado

**Aplicação em SPEC-003:**
- Validation rules devem ser agnósticas a ferramentas específicas
- Focar em princípios (autoridade, recência, completude) não em sites específicos
- Tier system baseado em características, não em URLs

### 3. Self-Critique ≥99 = Approval (Correlation Proven)

**Dados SPEC-010:**
- 5/5 skills com score ≥99 foram aprovadas (100% correlation)
- 0/5 skills com score <99 (nenhuma rejeitada)

**Implicação:** Self-Critique rigoroso previne rejections

**Aplicação em SPEC-003:**
- Target score ≥95 para protocol enhancements (mais complexo que baselines)
- Se score <95, revisar antes de Human Gate
- Documentar suggestions mesmo se aprovado (continuous improvement)

### 4. Estrutura Consistente Acelera Criação (15% faster)

**Dados SPEC-010:**
- Avg time: 51min (target: 60min) = 15% faster
- Atribuído a: Template-driven creation, estrutura consistente

**Aplicação em SPEC-003:**
- Use template existente `.prompt-os/core/` como base
- Manter estrutura de seções consistente com outros protocolos
- Reusar patterns (YAML metadata, markdown sections, examples)

### 5. Zero Gaps para Baselines Auto-Contidos (Optimal)

**Dados SPEC-010:**
- 0 gaps detectados durante 5 language baselines
- Razão: Scope bem-definido, context suficiente disponível

**Aplicação em SPEC-003:**
- SPEC-003 é enhancement (não baseline) → expectativa de gaps baixa
- Se gaps detectados: likely relacionados a tools externos (Tavily API, etc.)
- Manter scope no protocolo, não em implementações específicas

---

## Execução SPEC-003: Checklist de Preparação

### Pre-Requisitos (Antes de Iniciar)

- [x] SPEC-010 completa e relatórios finalizados
- [x] Pull Request SPEC-010 criado (branch `010-language-skills-baseline`)
- [x] Documentação atualizada (README, MEMORY, .context/)
- [ ] SPEC-003 pre-spec revisado e approved
- [ ] Execution checklist criado (`specs/003-web-research/execution-checklist.md`)
- [ ] Data collection guide criado (`specs/003-web-research/data-collection-guide.md`)
- [ ] Memory file preparado (`memory/opencode-spec003-session.md`)

### Arquivos a Criar/Atualizar

**Core Protocol Enhancement:**
- [ ] `.prompt-os/core/WEB-RESEARCH.md` - Enhance com validation rules

**Novos Arquivos (Se JIT Sub-Files Necessário):**
- [ ] `.prompt-os/core/web-research/source-validation-rules.md` (JIT)
- [ ] `.prompt-os/core/web-research/citation-templates.md` (JIT)
- [ ] `.prompt-os/core/web-research/tier-system.md` (JIT)

**Documentation Updates:**
- [ ] `README.md` - Add SPEC-003 to roadmap complete
- [ ] `.context/_meta/project-overview.md` - Update with SPEC-003 status
- [ ] `.context/ai-assistant-guide.md` - Add research quality guidelines
- [ ] `ITZAMNA-AGENT.md` - Reference SPEC-003 learnings

**Tracking & Reports:**
- [ ] `specs/003-web-research/execution-checklist.md`
- [ ] `specs/003-web-research/data-collection-guide.md`
- [ ] `memory/opencode-spec003-session.md`
- [ ] `specs/003-web-research/reports/` (post-execution)

---

## Riscos e Mitigações (SPEC-003)

### Risco 1: Protocol Enhancement Complexidade Alta

**Descrição:** SPEC-003 é um enhancement de protocol existente (mais complexo que baseline skills)

**Probabilidade:** Alta  
**Impacto:** Médio

**Mitigação:**
- Aplicar JIT sub-files pattern se necessário
- Target Self-Critique ≥95 (vs ≥99 para baselines)
- Extra Human Gate reviews para validation rules

### Risco 2: Integration com AUTO-INCREMENT

**Descrição:** WEB-RESEARCH.md precisa integrar com AUTO-INCREMENT.md para source gap detection

**Probabilidade:** Média  
**Impacto:** Alto (afeta future specs)

**Mitigação:**
- Review AUTO-INCREMENT.md antes de enhancement
- Ensure API consistency (input/output formats)
- Test integration com skill generation workflow

### Risco 3: Scope Creep (API Integrations)

**Descrição:** SPEC-003 pre-spec menciona APIs (Tavily, Perplexity) - pode expandir scope além de protocol

**Probabilidade:** Média  
**Impacto:** Alto (delay)

**Mitigação:**
- **Focus on protocol instructions** (prompt-based approach)
- API integrations são OPTIONAL (para automation)
- Core deliverable: Validation rules, citation templates, tier system

---

## Métricas de Sucesso (SPEC-003)

### Quantitativas

| Métrica | Target | Baseline (Current) | Como Medir |
|---------|--------|--------------------|------------|
| Self-Critique score | ≥95 | N/A (new protocol) | SELF-CRITIQUE.md output |
| Rejection rate | <20% | N/A | Human Gate decisions |
| Constitution violations | 0 | 0 (SPEC-010) | Constitution check |
| Avg time per deliverable | <2h | N/A | Tracking in memory file |
| Skills using validated sources | 100% | ~80% (informal) | Post-SPEC-003 audit |

### Qualitativas

- [ ] Source validation rules são claras e aplicáveis
- [ ] Citation templates fáceis de usar
- [ ] Tier system cobre casos comuns (docs oficiais, acadêmicos, community)
- [ ] Integration com Auto-Increment funcional
- [ ] AI agents conseguem seguir protocol sem ambiguidade

---

## Timeline Estimado

**Duração total:** 3-5 dias

| Fase | Duração | Deliverables |
|------|---------|--------------|
| **Preparação** | 0.5 dia | Pre-spec review, checklists, memory file |
| **Research** | 1 dia | Review WEB-RESEARCH.md atual, identify gaps |
| **Enhancement** | 1.5 dias | Implement validation rules, citation templates, tier system |
| **Integration** | 0.5 dia | AUTO-INCREMENT.md integration, testing |
| **Documentation** | 0.5 dia | README, .context/, examples |
| **Reports** | 1 dia | Final reports (similar to SPEC-010) |

**Total:** 5 dias (conservative estimate)

---

## Aprovação para Iniciar SPEC-003

**Pré-requisitos checklist:**

- [x] SPEC-010 100% completa
- [x] Aprendizados documentados (este arquivo + reports)
- [x] Documentation atualizada
- [ ] Human approval para iniciar SPEC-003

**Status:** **AGUARDANDO APROVAÇÃO HUMANA** 🟡

Quando aprovado, próximo passo:
1. Criar `specs/003-web-research/execution-checklist.md`
2. Criar `specs/003-web-research/data-collection-guide.md`
3. Criar `memory/opencode-spec003-session.md`
4. Iniciar Phase 1 (Research)

---

**Documento de Transição** | SPEC-010 → SPEC-003  
**Gerado:** 2026-02-03  
**Versão:** 1.0  
**Status:** Aguardando aprovação humana para SPEC-003
