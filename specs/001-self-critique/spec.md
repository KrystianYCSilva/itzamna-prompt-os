# SPEC-001: Self-Critique Module

> **Status:** ✅ IMPLEMENTED (Prompt-Based)
> **Priority:** P0 (Critical)
> **Estimated Effort:** 3-5 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-02

---

## ⚠️ IMPLEMENTATION NOTE (v2.0.0)

**This spec has been implemented as PROMPT INSTRUCTIONS, not JavaScript code.**

| Original Design | Actual Implementation |
|-----------------|----------------------|
| `self-critique.js` | `.prompt-os/core/SELF-CRITIQUE.md` |

**How it works now:** AI agents READ the prompt file and FOLLOW the instructions.
No code execution required. Works with ANY AI agent (Claude, Gemini, Cursor, etc.)

**See:** `.prompt-os/core/SELF-CRITIQUE.md` for the implementation.

---

## Original Spec (Historical Reference)

---

## 1. Problem Statement

### 1.1 Current State

O brain.js atualmente gera skills com validacao apenas **sintatica**:
- Verifica se YAML frontmatter existe
- Verifica se secoes obrigatorias existem
- Conta numero de exemplos

**Limitacao:** Nao avalia **qualidade semantica** do conteudo.

### 1.2 Desired State

O sistema deve **auto-avaliar** a qualidade de suas geracoes antes de apresentar ao humano, incluindo:
- Score de confianca (0-100)
- Identificacao de pontos fracos
- Sugestoes de melhoria
- Comparacao com skills existentes

### 1.3 Impact

| Sem Self-Critique | Com Self-Critique |
|-------------------|-------------------|
| Humano revisa tudo | Sistema filtra low-quality |
| Feedback so apos rejeicao | Melhoria antes do gate |
| Nao aprende com erros | Acumula conhecimento |

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. **G1:** Implementar modulo `self-critique.js` que avalia qualidade de geracoes
2. **G2:** Gerar score de confianca (0-100) para cada skill
3. **G3:** Produzir 3 sugestoes de melhoria por skill
4. **G4:** Comparar nova skill com existentes para detectar redundancia
5. **G5:** Integrar ao fluxo do brain.js antes do Human Gate

### 2.2 Non-Goals

- **NG1:** Nao rejeitar automaticamente (humano sempre decide)
- **NG2:** Nao usar LLM externo nesta fase (regras locais)
- **NG3:** Nao implementar vector DB ainda
- **NG4:** Nao modificar formato de skills existentes

---

## 3. Solution Design

### 3.1 Architecture

```
brain.js Pipeline (Updated)
========================================

[CLASSIFY] -> [RESEARCH] -> [GENERATE] -> [SELF-CRITIQUE] -> [HUMAN GATE] -> [COMMIT]
                                               |
                                               v
                                    +-----------------------+
                                    | self-critique.js      |
                                    +-----------------------+
                                    | - evaluateQuality()   |
                                    | - generateScore()     |
                                    | - suggestImprovements |
                                    | - detectRedundancy()  |
                                    +-----------------------+
```

### 3.2 Quality Dimensions

| Dimensao | Peso | Criterios |
|----------|------|-----------|
| **Completude** | 25% | Todas secoes preenchidas, exemplos suficientes |
| **Clareza** | 25% | Instrucoes claras, sem ambiguidade |
| **Praticidade** | 25% | Exemplos executaveis, casos reais |
| **Consistencia** | 25% | Alinhamento descricao-conteudo |

### 3.3 Self-Critique Output

```yaml
# Exemplo de output do self-critique
critique:
  score: 78
  confidence: "medium"
  
  strengths:
    - "Exemplos praticos e executaveis"
    - "Constraints bem definidos"
  
  weaknesses:
    - "Apenas 2 exemplos (recomendado: 3+)"
    - "Secao de troubleshooting ausente"
  
  suggestions:
    - "Adicionar exemplo de caso de erro"
    - "Expandir secao de Guidelines com mais padroes"
    - "Incluir links para documentacao oficial"
  
  similar_skills:
    - name: "graphql"
      similarity: 0.65
      note: "Possivel sobreposicao em resolvers"
```

### 3.4 Score Bands

| Score | Band | Comportamento |
|-------|------|---------------|
| 90-100 | Excellent | Highlight verde no Human Gate |
| 70-89 | Good | Apresentacao normal |
| 50-69 | Fair | Warning amarelo + sugestoes enfatizadas |
| 0-49 | Poor | Warning vermelho + sugestao de regenerar |

---

## 4. Implementation Plan

### 4.1 Tasks

#### Task 1: Criar self-critique.js (Day 1-2)

```javascript
// .prompt-os/scripts/self-critique.js

/**
 * Avalia qualidade de uma skill gerada
 * @param {string} skillContent - Conteudo completo da skill
 * @param {string[]} existingSkills - Lista de skills existentes
 * @returns {CritiqueResult} - Score, strengths, weaknesses, suggestions
 */
function evaluateSkill(skillContent, existingSkills) {
  const dimensions = {
    completeness: evaluateCompleteness(skillContent),
    clarity: evaluateClarity(skillContent),
    practicality: evaluatePracticality(skillContent),
    consistency: evaluateConsistency(skillContent),
  };
  
  const score = calculateScore(dimensions);
  const suggestions = generateSuggestions(dimensions);
  const similar = findSimilarSkills(skillContent, existingSkills);
  
  return { score, dimensions, suggestions, similar };
}
```

**Criterios de avaliacao:**

```javascript
// Completeness (25%)
const completenessRules = [
  { check: 'hasYamlFrontmatter', weight: 5 },
  { check: 'hasAllRequiredSections', weight: 5 },
  { check: 'hasMinExamples(2)', weight: 5 },
  { check: 'hasConstraints', weight: 5 },
  { check: 'hasSources', weight: 5 },
];

// Clarity (25%)
const clarityRules = [
  { check: 'instructionsWordCount > 50', weight: 5 },
  { check: 'noAmbiguousTerms', weight: 5 },
  { check: 'hasStepByStep', weight: 5 },
  { check: 'examplesHaveContext', weight: 5 },
  { check: 'constraintsAreSpecific', weight: 5 },
];

// Practicality (25%)
const practicalityRules = [
  { check: 'examplesAreExecutable', weight: 10 },
  { check: 'hasRealWorldScenarios', weight: 10 },
  { check: 'noPlaceholdersLeft', weight: 5 },
];

// Consistency (25%)
const consistencyRules = [
  { check: 'descriptionMatchesContent', weight: 10 },
  { check: 'tagsMatchDomain', weight: 5 },
  { check: 'triggersAreRelevant', weight: 5 },
  { check: 'levelMatchesComplexity', weight: 5 },
];
```

#### Task 2: Integrar ao brain.js (Day 2)

```javascript
// Em brain.js, apos validateDraft()

async function critiqueSkill(draft) {
  log.step(4.5, 'SELF-CRITIQUE - Avaliando qualidade...');
  
  const existingSkills = await loadExistingSkills();
  const critique = evaluateSkill(draft.content, existingSkills);
  
  // Exibir resultado
  console.log(`\nScore: ${critique.score}/100 (${getScoreBand(critique.score)})`);
  
  if (critique.suggestions.length > 0) {
    console.log('\nSugestoes de melhoria:');
    critique.suggestions.forEach((s, i) => console.log(`  ${i+1}. ${s}`));
  }
  
  if (critique.similar.length > 0) {
    console.log('\nSkills similares encontradas:');
    critique.similar.forEach(s => console.log(`  - ${s.name} (${Math.round(s.similarity * 100)}%)`));
  }
  
  return critique;
}
```

#### Task 3: Atualizar Human Gate UI (Day 3)

```
============================================
 HUMAN GATE - APROVACAO NECESSARIA
============================================
 Skill: kubernetes-basics
 Dominio: devops
 
 SELF-CRITIQUE:
 Score: 78/100 (Good)
 
 + Exemplos praticos e executaveis
 + Constraints bem definidos
 
 - Apenas 2 exemplos (recomendado: 3+)
 - Secao de troubleshooting ausente
 
 Sugestoes:
 1. Adicionar exemplo de caso de erro
 2. Expandir Guidelines com mais padroes
 3. Incluir links para docs oficiais
 
 Similar: graphql (65%)
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel

```

#### Task 4: Testes e Ajustes (Day 4-5)

- [ ] Testar com 5 skills novas
- [ ] Calibrar pesos das dimensoes
- [ ] Ajustar thresholds de score bands
- [ ] Documentar criterios de avaliacao

---

## 5. Success Criteria

### 5.1 Functional Requirements

| ID | Requirement | Validation |
|----|-------------|------------|
| FR1 | Score de 0-100 para cada skill | Executar 10 geracoes, verificar scores |
| FR2 | Minimo 1 sugestao por skill | Nenhuma geracao sem sugestoes |
| FR3 | Deteccao de redundancia | Gerar skill similar, verificar alerta |
| FR4 | Integracao com Human Gate | Score visivel no gate |

### 5.2 Quality Metrics

| Metrica | Target | Como Medir |
|---------|--------|------------|
| Skills rejeitadas com score < 50 | > 80% | Correlacao score vs rejeicao |
| Sugestoes aceitas pelo humano | > 50% | Feedback pos-edicao |
| Tempo de revisao humana | -20% | Timer no Human Gate |

---

## 6. Risks and Mitigations

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| Score nao reflete qualidade real | Media | Alto | Calibrar com feedback humano |
| Sugestoes genericas demais | Alta | Medio | Regras especificas por dominio |
| Performance degradada | Baixa | Medio | Cache de skills existentes |

---

## 7. Dependencies

| Dependencia | Tipo | Status |
|-------------|------|--------|
| brain.js v1.1.0 | Interna | OK |
| skills/INDEX.md | Interna | OK |
| Node.js 20+ | Externa | OK |

---

## 8. Timeline

| Fase | Duracao | Deliverable |
|------|---------|-------------|
| Day 1-2 | 2 dias | self-critique.js com regras |
| Day 2 | 0.5 dia | Integracao com brain.js |
| Day 3 | 1 dia | Atualizacao Human Gate UI |
| Day 4-5 | 2 dias | Testes e calibracao |

**Total:** 5 dias

---

## 9. Future Considerations

### 9.1 Evolucao para LLM-based Critique

Na v2.0, considerar usar LLM para avaliacao semantica:

```javascript
async function llmCritique(skillContent) {
  const prompt = `
    Avalie esta skill de 0-100 considerando:
    - Completude
    - Clareza
    - Praticidade
    - Consistencia
    
    Skill:
    ${skillContent}
    
    Responda em JSON com score, strengths, weaknesses, suggestions.
  `;
  
  return await llm.generate(prompt);
}
```

### 9.2 Aprendizado com Feedback

Armazenar correlacao entre scores e aprovacoes para ajustar pesos:

```yaml
# MEMORY.md
critique_feedback:
  - skill: "kubernetes-basics"
    predicted_score: 78
    human_action: "approved"
    human_feedback: "Bom, mas faltou exemplo de erro"
    
  - skill: "redis-caching"
    predicted_score: 45
    human_action: "rejected"
    human_feedback: "Exemplos nao funcionam"
```

---

*SPEC-001 | Self-Critique Module | v1.0.0 | 2026-02-02*
