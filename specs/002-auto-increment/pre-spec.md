# SPEC-002: Auto-Increment Module

> **Status:** ✅ IMPLEMENTED (Prompt-Based)
> **Priority:** P0 (Critical)
> **Estimated Effort:** 5-7 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-02
> **Depends On:** SPEC-001 (Self-Critique)

---

## ⚠️ IMPLEMENTATION NOTE (v2.0.0)

**This spec has been implemented as PROMPT INSTRUCTIONS, not JavaScript code.**

| Original Design | Actual Implementation |
|-----------------|----------------------|
| `gap-detector.js` | `.prompt-os/core/AUTO-INCREMENT.md` |
| `rejection-learner.js` | `.prompt-os/core/AUTO-INCREMENT.md` |
| `evolution-engine.js` | `.prompt-os/core/AUTO-INCREMENT.md` |

**How it works now:** AI agents READ the prompt file and FOLLOW the instructions.
The AI conversationally detects gaps, learns from rejections, and suggests improvements.

**See:** `.prompt-os/core/AUTO-INCREMENT.md` for the implementation.

---

## Original Spec (Historical Reference)

---

## 1. Problem Statement

### 1.1 Current State

O Itzamna PromptOS atualmente:
- Gera skills apenas sob demanda explicita do usuario
- Nao detecta lacunas no conhecimento
- Nao aprende com feedback de rejeicoes
- Nao propoe evolucoes proativamente

**O sistema e estatico** - nao melhora sozinho.

### 1.2 Desired State

O sistema deve ser **auto-evolutivo**:
- Detectar quando uma skill esta faltando
- Propor novas skills baseado em padroes de uso
- Aprender com rejeicoes e ajustar geracoes futuras
- Sugerir melhorias em skills existentes

### 1.3 Neuroscience Parallel

| Cerebro Humano | PromptOS Equivalent |
|----------------|---------------------|
| Plasticidade neural | Templates que evoluem |
| Aprendizado por erro | Feedback de rejeicoes |
| Reconhecimento de padroes | Deteccao de gaps |
| Consolidacao de memoria | Otimizacao de skills |

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. **G1:** Detectar lacunas quando usuario pede algo que nao existe
2. **G2:** Registrar e analisar motivos de rejeicao
3. **G3:** Sugerir novas skills baseado em padroes
4. **G4:** Propor melhorias em skills com baixo desempenho
5. **G5:** Gerar relatorio mensal de evolucao do sistema

### 2.2 Non-Goals

- **NG1:** Nao criar skills automaticamente (sempre Human Gate)
- **NG2:** Nao modificar skills existentes automaticamente
- **NG3:** Nao usar ML/AI para deteccao nesta fase (regras simples)
- **NG4:** Nao implementar A/B testing de templates

---

## 3. Solution Design

### 3.1 Architecture

```
Auto-Increment System
========================================

+-------------------+     +-------------------+     +-------------------+
|   Gap Detector    |     | Rejection Learner |     | Evolution Engine  |
+-------------------+     +-------------------+     +-------------------+
| - detectMissing() |     | - logRejection()  |     | - suggestNew()    |
| - logGap()        |     | - analyzePatterns |     | - proposeImprove()|
| - categorizeGap() |     | - adjustWeights() |     | - generateReport()|
+-------------------+     +-------------------+     +-------------------+
         |                         |                         |
         v                         v                         v
+-----------------------------------------------------------------------+
|                           MEMORY.md                                    |
|  - gaps_detected[]                                                     |
|  - rejections_log[]                                                    |
|  - improvement_suggestions[]                                           |
|  - monthly_evolution_report                                            |
+-----------------------------------------------------------------------+
```

### 3.2 Gap Detection Flow

```
Usuario: "Preciso de uma skill para Kafka"
                    |
                    v
          [Search Existing Skills]
                    |
                    v
           Skill nao encontrada?
                    |
            +-------+-------+
            |               |
           Sim             Nao
            |               |
            v               v
    [Log Gap to MEMORY]   [Load Skill]
            |
            v
    [Suggest Creation]
            |
            v
    "Skill 'kafka' nao existe. Deseja criar?"
```

### 3.3 Rejection Learning Flow

```
Human Gate: reject "Exemplos nao funcionam"
                    |
                    v
         [Log Rejection]
         - skill_name
         - reason_category
         - full_feedback
         - timestamp
                    |
                    v
         [Analyze Patterns]
         - "exemplos" aparece em 40% das rejeicoes?
         - Qual dominio tem mais rejeicoes?
                    |
                    v
         [Adjust Generation]
         - Aumentar peso de "exemplos executaveis"
         - Adicionar validacao extra para dominio X
```

### 3.4 Data Structures

```yaml
# MEMORY.md - Secao de Auto-Increment

## Auto-Increment Data

### Gaps Detectados
| Data | Request | Skill Faltante | Status | Criada Em |
|------|---------|----------------|--------|-----------|
| 2026-02-02 | "Como usar Kafka?" | kafka | pending | - |
| 2026-02-01 | "Deploy com ArgoCD" | argocd | created | 2026-02-02 |

### Log de Rejeicoes
| Data | Skill | Motivo | Categoria | Acao |
|------|-------|--------|-----------|------|
| 2026-02-02 | redis-cache | "Exemplos incorretos" | examples | fixed |
| 2026-02-01 | graphql-api | "Muito generico" | specificity | regenerated |

### Analise de Padroes
| Categoria | Ocorrencias | Peso Atual | Peso Sugerido |
|-----------|-------------|------------|---------------|
| examples | 12 (40%) | 10 | 15 |
| specificity | 8 (27%) | 5 | 10 |
| clarity | 5 (17%) | 5 | 5 |

### Sugestoes de Evolucao
| Tipo | Descricao | Prioridade | Status |
|------|-----------|------------|--------|
| new_skill | "kafka" detectado 3x | high | pending |
| improve | "graphql" tem score < 60 | medium | pending |
| template | Adicionar secao troubleshooting | low | pending |
```

---

## 4. Implementation Plan

### 4.1 Task 1: Gap Detector (Day 1-2)

```javascript
// .prompt-os/scripts/gap-detector.js

const fs = require('fs').promises;
const path = require('path');

/**
 * Detecta se uma skill existe
 * @param {string} query - O que o usuario pediu
 * @returns {GapResult} - skill encontrada ou gap detectado
 */
async function detectGap(query) {
  const keywords = extractKeywords(query);
  const existingSkills = await loadSkillsIndex();
  
  const matches = findMatches(keywords, existingSkills);
  
  if (matches.length === 0) {
    // GAP DETECTADO
    const gap = {
      query,
      keywords,
      suggested_skill_name: toKebabCase(keywords[0]),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    await logGap(gap);
    return { found: false, gap };
  }
  
  return { found: true, skills: matches };
}

/**
 * Registra gap no MEMORY.md
 */
async function logGap(gap) {
  const memoryPath = path.join(process.cwd(), 'MEMORY.md');
  let memory = await fs.readFile(memoryPath, 'utf8');
  
  // Encontrar secao de gaps ou criar
  if (!memory.includes('### Gaps Detectados')) {
    memory += `\n\n### Gaps Detectados\n| Data | Request | Skill Faltante | Status |\n|------|---------|----------------|--------|\n`;
  }
  
  const entry = `| ${gap.timestamp.split('T')[0]} | "${gap.query}" | ${gap.suggested_skill_name} | ${gap.status} |`;
  memory = memory.replace(/(### Gaps Detectados\n\|[^\n]+\n\|[^\n]+\n)/, `$1${entry}\n`);
  
  await fs.writeFile(memoryPath, memory, 'utf8');
}

/**
 * Sugere criacao de skill baseado em gaps frequentes
 */
async function suggestFromGaps() {
  const gaps = await parseGapsFromMemory();
  
  // Agrupar por skill sugerida
  const gapCounts = {};
  for (const gap of gaps) {
    gapCounts[gap.suggested_skill_name] = (gapCounts[gap.suggested_skill_name] || 0) + 1;
  }
  
  // Retornar gaps com 2+ ocorrencias
  return Object.entries(gapCounts)
    .filter(([_, count]) => count >= 2)
    .map(([name, count]) => ({ name, count, priority: count >= 3 ? 'high' : 'medium' }));
}

module.exports = { detectGap, logGap, suggestFromGaps };
```

### 4.2 Task 2: Rejection Learner (Day 2-3)

```javascript
// .prompt-os/scripts/rejection-learner.js

/**
 * Categoriza motivo de rejeicao
 */
function categorizeRejection(reason) {
  const categories = {
    examples: ['exemplo', 'exemplo', 'nao funciona', 'incorreto', 'errado'],
    specificity: ['generico', 'vago', 'superficial', 'falta detalhe'],
    clarity: ['confuso', 'ambiguo', 'nao entendi', 'complexo'],
    completeness: ['falta', 'incompleto', 'ausente', 'missing'],
    relevance: ['irrelevante', 'fora do escopo', 'nao aplica'],
  };
  
  const lowerReason = reason.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => lowerReason.includes(kw))) {
      return category;
    }
  }
  
  return 'other';
}

/**
 * Registra rejeicao e analisa padroes
 */
async function logRejection(skillName, reason, fullFeedback) {
  const rejection = {
    timestamp: new Date().toISOString(),
    skill: skillName,
    reason: reason,
    category: categorizeRejection(reason),
    feedback: fullFeedback,
  };
  
  await appendToMemory('rejections', rejection);
  await analyzePatterns();
}

/**
 * Analisa padroes de rejeicao e sugere ajustes
 */
async function analyzePatterns() {
  const rejections = await parseRejectionsFromMemory();
  
  if (rejections.length < 5) return; // Minimo para analise
  
  const categoryCounts = {};
  for (const r of rejections) {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  }
  
  const total = rejections.length;
  const suggestions = [];
  
  for (const [category, count] of Object.entries(categoryCounts)) {
    const percentage = (count / total) * 100;
    
    if (percentage > 30) {
      suggestions.push({
        category,
        percentage,
        action: getActionForCategory(category),
      });
    }
  }
  
  if (suggestions.length > 0) {
    await updateWeightSuggestions(suggestions);
  }
}

function getActionForCategory(category) {
  const actions = {
    examples: 'Aumentar peso de validacao de exemplos executaveis',
    specificity: 'Exigir mais detalhes em Guidelines',
    clarity: 'Adicionar step-by-step obrigatorio',
    completeness: 'Verificar todas as secoes antes do gate',
    relevance: 'Melhorar classificacao de dominio',
  };
  return actions[category] || 'Revisar regras de geracao';
}

module.exports = { categorizeRejection, logRejection, analyzePatterns };
```

### 4.3 Task 3: Evolution Engine (Day 4-5)

```javascript
// .prompt-os/scripts/evolution-engine.js

/**
 * Gera sugestoes de evolucao do sistema
 */
async function generateEvolutionSuggestions() {
  const suggestions = [];
  
  // 1. Novas skills baseado em gaps
  const frequentGaps = await suggestFromGaps();
  for (const gap of frequentGaps) {
    suggestions.push({
      type: 'new_skill',
      target: gap.name,
      reason: `Detectado ${gap.count}x sem skill correspondente`,
      priority: gap.priority,
    });
  }
  
  // 2. Melhorias em skills existentes
  const lowScoreSkills = await findLowScoreSkills();
  for (const skill of lowScoreSkills) {
    suggestions.push({
      type: 'improve_skill',
      target: skill.name,
      reason: `Score medio ${skill.avgScore} (< 60)`,
      priority: 'medium',
    });
  }
  
  // 3. Ajustes em templates
  const patternSuggestions = await getPatternSuggestions();
  for (const ps of patternSuggestions) {
    suggestions.push({
      type: 'adjust_template',
      target: ps.category,
      reason: `${ps.percentage.toFixed(0)}% das rejeicoes nesta categoria`,
      priority: ps.percentage > 40 ? 'high' : 'low',
    });
  }
  
  return suggestions;
}

/**
 * Gera relatorio mensal de evolucao
 */
async function generateMonthlyReport() {
  const now = new Date();
  const month = now.toISOString().slice(0, 7);
  
  const stats = await gatherMonthlyStats(month);
  
  const report = `
## Relatorio de Evolucao - ${month}

### Resumo
| Metrica | Valor |
|---------|-------|
| Skills criadas | ${stats.skillsCreated} |
| Skills aprovadas | ${stats.skillsApproved} |
| Taxa de aprovacao | ${stats.approvalRate}% |
| Gaps detectados | ${stats.gapsDetected} |
| Gaps resolvidos | ${stats.gapsResolved} |

### Top 3 Gaps Mais Frequentes
${stats.topGaps.map((g, i) => `${i+1}. ${g.name} (${g.count}x)`).join('\n')}

### Categorias de Rejeicao
${stats.rejectionCategories.map(c => `- ${c.category}: ${c.count} (${c.percentage}%)`).join('\n')}

### Acoes Sugeridas
${stats.suggestions.map((s, i) => `${i+1}. [${s.priority}] ${s.type}: ${s.reason}`).join('\n')}

---
*Gerado automaticamente pelo PromptOS Evolution Engine*
`;

  await appendToMemory('monthly_reports', { month, report });
  return report;
}

module.exports = { generateEvolutionSuggestions, generateMonthlyReport };
```

### 4.4 Task 4: Integracao com brain.js (Day 5-6)

```javascript
// Adicoes ao brain.js

const { detectGap, suggestFromGaps } = require('./gap-detector');
const { logRejection, analyzePatterns } = require('./rejection-learner');
const { generateEvolutionSuggestions } = require('./evolution-engine');

// No inicio do generate command
async function generateCommand(type, description) {
  // NOVO: Verificar se skill ja existe
  const gapResult = await detectGap(description);
  
  if (gapResult.found) {
    log.info(`Skills similares encontradas: ${gapResult.skills.map(s => s.name).join(', ')}`);
    
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise(r => rl.question('Criar nova skill mesmo assim? (y/n): ', r));
    rl.close();
    
    if (answer.toLowerCase() !== 'y') {
      console.log('Operacao cancelada. Use uma skill existente.');
      return;
    }
  }
  
  // ... resto do fluxo ...
}

// Apos rejeicao no Human Gate
case 'reject':
  console.log(`\nRejeitado. Motivo: ${approval.reason || 'Nao especificado'}`);
  
  // NOVO: Registrar rejeicao para aprendizado
  await logRejection(draft.metadata.name, approval.reason, approval.reason);
  
  break;

// Novo comando: evolution
async function evolutionCommand() {
  console.log('\n=== EVOLUTION ENGINE ===\n');
  
  const suggestions = await generateEvolutionSuggestions();
  
  if (suggestions.length === 0) {
    console.log('Nenhuma sugestao de evolucao no momento.');
    return;
  }
  
  console.log('Sugestoes de Evolucao:\n');
  
  for (const s of suggestions) {
    const priority = s.priority === 'high' ? '[!!!]' : s.priority === 'medium' ? '[!!]' : '[!]';
    console.log(`${priority} ${s.type}: ${s.target}`);
    console.log(`    Motivo: ${s.reason}\n`);
  }
}
```

### 4.5 Task 5: Novo Comando CLI (Day 6-7)

```bash
# Novos comandos do brain.js

node brain.js evolution           # Mostra sugestoes de evolucao
node brain.js evolution report    # Gera relatorio mensal
node brain.js gaps                # Lista gaps detectados
node brain.js gaps resolve <name> # Marca gap como resolvido
```

---

## 5. Success Criteria

### 5.1 Functional Requirements

| ID | Requirement | Validation |
|----|-------------|------------|
| FR1 | Detectar gap quando skill nao existe | Pedir skill inexistente, verificar log |
| FR2 | Registrar rejeicoes com categoria | Rejeitar 5 skills, verificar MEMORY.md |
| FR3 | Sugerir skills apos 2+ gaps | Criar 2 gaps iguais, verificar sugestao |
| FR4 | Gerar relatorio mensal | Executar evolution report |

### 5.2 Quality Metrics

| Metrica | Target |
|---------|--------|
| Gaps detectados automaticamente | > 5/mes |
| Skills criadas a partir de sugestoes | > 3/mes |
| Reducao em rejeicoes apos ajuste | > 20% |

---

## 6. Dependencies

| Dependencia | Tipo | Status |
|-------------|------|--------|
| SPEC-001 (Self-Critique) | Interna | Required |
| brain.js v1.1.0 | Interna | OK |
| MEMORY.md com secoes novas | Interna | Criar |

---

## 7. Timeline

| Fase | Duracao | Deliverable |
|------|---------|-------------|
| Day 1-2 | 2 dias | gap-detector.js |
| Day 2-3 | 2 dias | rejection-learner.js |
| Day 4-5 | 2 dias | evolution-engine.js |
| Day 5-6 | 1 dia | Integracao brain.js |
| Day 6-7 | 1 dia | CLI commands + testes |

**Total:** 7 dias

---

## 8. Future Considerations

### 8.1 ML-based Pattern Detection

Na v2.0, usar clustering para detectar padroes:

```python
from sklearn.cluster import KMeans

def cluster_rejections(rejections):
    embeddings = encode_reasons(rejections)
    clusters = KMeans(n_clusters=5).fit(embeddings)
    return clusters.labels_
```

### 8.2 Predictive Gaps

Prever gaps antes de ocorrerem baseado em tendencias:

```javascript
async function predictGaps() {
  const trends = await getTechTrends(); // HackerNews, GitHub trending
  const existingSkills = await loadSkillsIndex();
  
  return trends.filter(t => !existingSkills.includes(t.name));
}
```

---

*SPEC-002 | Auto-Increment Module | v1.0.0 | 2026-02-02*
