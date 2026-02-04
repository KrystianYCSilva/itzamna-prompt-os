# Tier System - Documentacao

> **Versao:** 1.0.0  
> **Modulo:** `.prompt-os/scripts/tier-system.js`  
> **Integracao:** brain.js v1.5.0+

---

## Visao Geral

O Tier System implementa um sistema de validacao em 3 niveis para garantir qualidade das skills geradas pelo PromptOS Brain.

```
┌─────────────────────────────────────────────────────────────┐
│ T0 - INVIOLAVEL                                             │
│ Regras que NUNCA podem ser quebradas.                       │
│ Violacao = rejeicao automatica.                             │
│ Peso no score: 50%                                          │
├─────────────────────────────────────────────────────────────┤
│ T1 - FORTE                                                  │
│ Regras importantes. Quebrar e raro e requer justificativa.  │
│ Peso no score: 35%                                          │
├─────────────────────────────────────────────────────────────┤
│ T2 - CONVENCAO                                              │
│ Preferencias e padroes. Aceitavel quebrar com razao tecnica.│
│ Peso no score: 15%                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Regras T0 (INVIOLAVEIS)

### T0-STRUCTURAL

| ID | Nome | Descricao |
|----|------|-----------|
| T0-STRUCT-01 | Frontmatter Required | Skills devem ter frontmatter YAML valido |
| T0-STRUCT-02 | Required Sections | Deve ter: Guidelines, Constraints, Exemplos |
| T0-STRUCT-03 | Status Field | Frontmatter deve ter status (draft/approved/deprecated) |

### T0-SECURITY

| ID | Nome | Descricao |
|----|------|-----------|
| T0-SEC-01 | No Hardcoded Secrets | Proibido passwords, API keys, tokens hardcoded |
| T0-SEC-02 | No SQL Injection Patterns | Proibido concatenacao insegura em queries |

### T0-VALIDATION

| ID | Nome | Descricao |
|----|------|-----------|
| T0-VAL-01 | No Empty Placeholders | Skills aprovadas nao podem ter [PLACEHOLDERS] vazios |
| T0-CARD-01 | Version Required | Deve ter versao semantica no frontmatter |

---

## Regras T1 (FORTES)

### T1-CODE-QUALITY

| ID | Nome | Descricao |
|----|------|-----------|
| T1-QUAL-01 | Minimum Examples | Deve ter pelo menos 2 exemplos praticos |
| T1-QUAL-02 | Constraints Section | Deve ter pelo menos 2 constraints (NUNCA) |
| T1-QUAL-03 | Guidelines Section | Deve ter pelo menos 3 guidelines (SEMPRE) |

### T1-DOCUMENTATION

| ID | Nome | Descricao |
|----|------|-----------|
| T1-DOC-01 | Description Present | Frontmatter deve ter descricao clara (>20 chars) |
| T1-DOC-02 | Tags Present | Deve ter pelo menos 2 tags validas |

### T1-ARCHITECTURE

| ID | Nome | Descricao |
|----|------|-----------|
| T1-ARCH-01 | Edge Cases Section | Deve documentar edge cases |

---

## Regras T2 (CONVENCOES)

### T2-NAMING

| ID | Nome | Descricao |
|----|------|-----------|
| T2-NAME-01 | Kebab-case Name | Nome da skill deve estar em kebab-case |
| T2-NAME-02 | Title Case Heading | Titulo principal deve usar Title Case |

### T2-STRUCTURE

| ID | Nome | Descricao |
|----|------|-----------|
| T2-STRUCT-01 | References Section | Deve ter secao de referencias |
| T2-STRUCT-02 | Code Blocks Have Language | Blocos de codigo devem especificar linguagem |

### T2-STYLE

| ID | Nome | Descricao |
|----|------|-----------|
| T2-STYLE-01 | Consistent Bullet Style | Usar - ou * consistentemente |
| T2-STYLE-02 | Reasonable Line Length | Linhas com no maximo 120 caracteres |

---

## Uso via CLI

### Validar arquivo

```bash
node .prompt-os/scripts/tier-system.js skills/backend/graphql-api/SKILL.md
```

### Validar via brain.js

```bash
node .prompt-os/scripts/brain.js validate skills/backend/graphql-api/SKILL.md
```

### Output exemplo

```
======================================================================
TIER SYSTEM VALIDATION REPORT
======================================================================

Score: 78/100
Can Approve: YES

[OK] T0 - INVIOLABLE: 6/6 passed
[WARN] T1 - STRONG: 4/6 passed
     [X] T1-QUAL-01: Apenas 1 exemplo(s). Minimo recomendado: 2
     [X] T1-DOC-02: Apenas 1 tag(s) valida(s). Minimo: 2
[INFO] T2 - CONVENTIONS: 4/6 passed
     [X] T2-STRUCT-01: Considere adicionar secao ## Referencias
     [X] T2-STYLE-02: 3 linha(s) com mais de 120 caracteres

----------------------------------------------------------------------

RECOMENDACOES (T1 issues):
  - Minimum Examples: Apenas 1 exemplo(s). Minimo recomendado: 2
  - Tags Present: Apenas 1 tag(s) valida(s). Minimo: 2
```

---

## Uso Programatico

```javascript
const tierSystem = require('./.prompt-os/scripts/tier-system');

// Validar conteudo
const content = fs.readFileSync('SKILL.md', 'utf8');
const results = tierSystem.validateAllTiers(content);

console.log(`Score: ${results.summary.score}/100`);
console.log(`Can Approve: ${results.summary.canApprove}`);

// Validar arquivo diretamente
const fileResults = await tierSystem.validateFile('SKILL.md');

// Formatar para console
console.log(tierSystem.formatResults(results));
```

---

## Integracao com Self-Critique (SPEC-001)

O Tier System e a base para o modulo de Self-Critique:

1. **Score Calculation**: O score do tier system alimenta o confidence score
2. **Suggestions**: Violacoes T1/T2 viram sugestoes de melhoria
3. **Auto-Rejection**: Violacoes T0 resultam em rejeicao automatica

```javascript
// Em self-critique.js (futuro SPEC-001)
function calculateConfidence(draft) {
  const tierResults = tierSystem.validateAllTiers(draft.content);
  
  // T0 violations = immediate rejection
  if (!tierResults.summary.canApprove) {
    return { score: 0, autoReject: true };
  }
  
  // Score based on tier compliance
  return {
    score: tierResults.summary.score,
    suggestions: extractSuggestions(tierResults)
  };
}
```

---

## Extensibilidade

### Adicionando novas regras

```javascript
// Em tier-system.js
TIERS.T1.rules.push({
  id: 'T1-CUSTOM-01',
  name: 'Custom Rule',
  description: 'Descricao da regra',
  category: 'custom',
  check: (content, metadata) => {
    const passed = /* sua logica */;
    return {
      passed,
      message: passed ? 'OK' : 'Falha: motivo'
    };
  }
});
```

### Regras por categoria/dominio

Futuras versoes poderao ter regras especificas por dominio:

```javascript
// Exemplo futuro
TIERS.T1_JAVA = {
  rules: [
    { id: 'T1-JAVA-01', name: 'Maven/Gradle mention', ... }
  ]
};
```

---

## Metricas

### Pesos do Score

| Tier | Peso | Impacto |
|------|------|---------|
| T0 | 50% | Compliance total = 50 pontos |
| T1 | 35% | Compliance total = 35 pontos |
| T2 | 15% | Compliance total = 15 pontos |

### Thresholds

| Score | Significado | Acao |
|-------|-------------|------|
| 0-49 | Baixo | Rejeicao automatica se T0 falhou |
| 50-69 | Medio | Revisao recomendada |
| 70-89 | Bom | Aprovacao sugerida |
| 90-100 | Excelente | Aprovacao confiante |

---

## Referencias

- [tier-system.md](add-core/tier-system.md) - Documento original
- [SPEC-001: Self-Critique](../specs/001-self-critique/pre-spec.md) - Integracao futura
- [INTEGRATION-ANALYSIS.md](INTEGRATION-ANALYSIS.md) - Analise de integracao

---

*Documentacao v1.0.0 | Itzamna PromptOS | 2026-02-03*
