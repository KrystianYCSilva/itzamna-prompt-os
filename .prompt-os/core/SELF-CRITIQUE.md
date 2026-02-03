# SELF-CRITIQUE - Auto-Avaliacao

> **Instrucoes para voce (agente de IA) avaliar seu proprio trabalho.**  
> Antes de entregar qualquer resultado, aplique esta auto-critica.

---

## POR QUE AUTO-AVALIAR?

Voce pode cometer erros. Este protocolo ajuda a:

1. **Detectar problemas** antes do humano ver
2. **Melhorar qualidade** da entrega
3. **Economizar tempo** do humano (menos retrabalho)
4. **Aumentar confianca** nas suas entregas

---

## QUANDO APLICAR

Aplique self-critique **SEMPRE** antes de:

- Entregar codigo novo
- Entregar skill ou persona gerada
- Entregar documento tecnico
- Responder pergunta complexa
- Fazer recomendacao arquitetural

**Excecao:** Respostas simples (sim/nao, comandos rapidos) nao precisam.

---

## PROTOCOLO DE AUTO-AVALIACAO

### Fase 1: Verificacao Rapida (30 segundos)

Responda mentalmente:

```
[ ] Entendi corretamente o pedido?
[ ] Minha resposta responde ao que foi pedido?
[ ] Ha erros obvios? (typos, sintaxe, logica)
[ ] Estou violando alguma regra T0?
```

**Se qualquer resposta for "nao":** Corrija antes de continuar.

---

### Fase 2: Avaliacao de Qualidade

Avalie seu trabalho em 4 dimensoes:

#### 1. Completude (0-25 pontos)

**Descricao:** Todas as partes necessarias estao presentes

```
- Todos os requisitos foram atendidos?
- Falta alguma parte importante?
- Ha TODOs ou placeholders nao resolvidos?
- Tratei casos de erro/edge cases?
- Exemplos minimos presentes?
```

| Criterio | Pontos |
|----------|--------|
| Todas secoes obrigatorias presentes | +5 |
| Sem TODOs ou placeholders | +5 |
| Edge cases considerados | +5 |
| Tratamento de erros incluido | +5 |
| Exemplos minimos atendidos | +5 |

---

#### 2. Clareza (0-25 pontos)

**Descricao:** Facil de entender

```
- O codigo/texto e facil de entender?
- Ha comentarios onde necessario?
- Nomes sao descritivos?
- A estrutura e logica?
- Ha step-by-step quando apropriado?
```

| Criterio | Pontos |
|----------|--------|
| Facil de ler | +5 |
| Nomes descritivos | +5 |
| Estrutura logica | +5 |
| Comentarios uteis onde necessario | +5 |
| Step-by-step quando apropriado | +5 |

---

#### 3. Corretude (0-25 pontos)

**Descricao:** Tecnicamente preciso

```
- O codigo funciona corretamente?
- A logica esta certa?
- Usei APIs/metodos corretamente?
- Ha bugs obvios?
- Compila/valida sem erros?
```

| Criterio | Pontos |
|----------|--------|
| Logica correta | +5 |
| Sem bugs obvios | +5 |
| APIs usadas corretamente | +5 |
| Tipos corretos | +5 |
| Compila/valida | +5 |

---

#### 4. Boas Praticas (0-25 pontos)

**Descricao:** Segue padroes e standards

```
- Segue principios SOLID?
- Nao viola DRY?
- Segue padroes do projeto?
- Segue convencoes da linguagem?
- Segue regras da Constitution?
```

| Criterio | Pontos |
|----------|--------|
| Principios SOLID | +5 |
| DRY respeitado | +5 |
| Padroes do projeto seguidos | +5 |
| Convencoes da linguagem | +5 |
| Constitution rules seguidas | +5 |

---

#### Constitution Check (Obrigatorio)

**ANTES de finalizar a avaliacao, verifique compliance com a Constitution:**

```
[ ] T0 violations = 0? (inviolavel - BLOCKER se nao)
[ ] T1 warnings identificadas? (strong rules)
[ ] T2 conventions seguidas? (preferences)
```

**Regras T0 (INVIOLAVEIS)**:
- T0-SEC-01: Sem secrets hardcoded
- T0-SEC-02: Sem SQL injection
- T0-HUMAN-01: File operations requerem aprovacao
- T0-VAL-01: Nunca afirmar sucesso sem verificacao

**Se T0 violation detectada:**
- constitution_check.t0_violations = 1 (ou mais)
- Score automaticamente = 0 (BLOCKER)
- NAO apresentar no Human Gate sem corrigir

**Se T1 warning detectada:**
- constitution_check.t1_warnings = numero de warnings
- Adicionar aos weaknesses
- Mencionar no notes

---

### Fase 3: Calcular Score

```
Score Total = Completude + Clareza + Corretude + Boas Praticas
             (max 100 pontos)
```

| Score | Band | Classificacao | Indicador | Acao |
|-------|------|---------------|-----------|------|
| 90-100 | Excellent | Excelente | 🟢 | Entregar com confianca |
| 70-89 | Good | Bom | 🔵 | Entregar, mencionar pontos de atencao |
| 50-69 | Fair | Regular | 🟡 | Revisar antes de entregar |
| 0-49 | Poor | Insuficiente | 🔴 | NAO entregar. Refazer. |

**Indicadores Visuais:**
- 🟢 **Excellent (90-100)**: Alta confianca - pronto para aprovacao
- 🔵 **Good (70-89)**: Boa qualidade - melhorias menores possiveis
- 🟡 **Fair (50-69)**: ⚠️ Qualidade regular - melhorias recomendadas
- 🔴 **Poor (0-49)**: ⚠️⚠️ Baixa qualidade - regeneracao sugerida

---

### Fase 4: Identificar Melhorias

Para **TODOS** os artefatos, liste:

1. **Pontos Fortes** (o que ficou bom) - **OBRIGATORIO**: minimo 1, maximo 5
2. **Pontos Fracos** (o que pode melhorar) - Se score < 90: minimo 1, maximo 5
3. **Sugestoes** (como melhorar) - **OBRIGATORIO se score < 90**: minimo 1, maximo 5

---

#### Regras para Sugestoes

**Se score < 90:**
- DEVE fornecer entre 1-5 sugestoes **especificas e acionaveis**
- Sugestoes DEVEM ser concretas, nao genericas
- Cada sugestao DEVE ser algo que o humano pode fazer imediatamente

**Formato de sugestoes acionaveis:**

✅ **BOM** (especifico):
- "Adicionar try-catch no metodo `connectToDatabase()` para capturar `ConnectionError`"
- "Extrair funcao auxiliar `validateUserInput()` de `processRequest()` (45 linhas → 20 linhas)"
- "Adicionar exemplo mostrando erro 404 com response body"

❌ **EVITE** (generico):
- "Melhorar tratamento de erros"
- "Refatorar codigo"
- "Adicionar mais exemplos"

---

Exemplo:
```
Score: 75/100 (Bom)

Pontos Fortes:
+ Logica correta
+ Nomes descritivos
+ Estrutura bem organizada

Pontos Fracos:
- Falta tratamento de erro no caso de conexao falhar
- Funcao `processRequest()` esta longa (45 linhas)
- Apenas 2 exemplos (recomendado: 3+)

Sugestoes:
1. Adicionar try-catch no metodo `connectToDatabase()` para capturar `ConnectionError`
2. Extrair funcao auxiliar `validateUserInput()` de `processRequest()`
3. Adicionar terceiro exemplo mostrando caso de erro 404
```

---

### Fase 2.5: Redundancy Detection (Skills Only)

**APLIQUE APENAS SE artifact_type = "skill"**

Antes de finalizar a avaliacao, verifique se a nova skill e similar a skills existentes.

#### Procedimento

1. **Ler Skills Registry:**
   - Abra o arquivo `.prompt-os/skills/INDEX.md`
   - Extraia a lista de todas as skills existentes com seus nomes, categorias, e descricoes

2. **Calcular Similarity:**
   - Para cada skill existente, calcule similarity score baseado em:
     - **Name similarity (30%)**: Palavras comuns nos nomes
     - **Tag overlap (30%)**: Tags compartilhadas
     - **Domain match (20%)**: Mesma categoria/domain
     - **Description keywords (20%)**: Keywords comuns nas descricoes

3. **Threshold:**
   - Apenas reporte skills com similarity >= 60%
   - Maximo de 5 skills similares

4. **Output Format:**
   ```yaml
   similar_items:
     - name: "skill-name"
       similarity: 72
       note: "Both cover API endpoint patterns"
   ```

#### Similarity Calculation Example

```
Nova skill: "rest-api-error-handling"
Tags: ["api", "rest", "error", "http"]
Description: "Handle errors in REST APIs with proper status codes"

Existing skill: "rest-api-design"
Tags: ["api", "rest", "design", "http"]
Description: "Design RESTful APIs with HTTP methods and status codes"

Calculation:
- Name similarity: "rest-api" comum = 0.7 → 0.7 * 0.3 = 0.21
- Tag overlap: 3/4 tags comuns = 0.75 → 0.75 * 0.3 = 0.225
- Domain match: Ambos "backend/api" = 1.0 → 1.0 * 0.2 = 0.2
- Description keywords: "api", "rest", "http", "status codes" = 0.6 → 0.6 * 0.2 = 0.12

Total similarity = (0.21 + 0.225 + 0.2 + 0.12) * 100 = 75.5% → 76%

RESULTADO: Reportar (>= 60%)
```

#### Quando Nenhuma Similarity Encontrada

Se nenhuma skill atinge similarity >= 60%:

```yaml
similar_items: []
```

Ou omitir o campo completamente no output.

---

### Fase 5: Formatar Saida

Apos completar as fases 1-4, produza o resultado em formato estruturado YAML.

**Instrucoes:**
1. Calcule score total = soma das 4 dimensoes
2. Determine band baseado no score (Excellent/Good/Fair/Poor)
3. Liste 1-5 strengths (o que ficou bom)
4. Se score < 90: Liste weaknesses e suggestions (1-5 cada)
5. Se artifact_type = "skill": Execute redundancy check (veja secao abaixo)
6. Verifique Constitution compliance (t0_violations DEVE ser 0)
7. Produza output no formato especificado abaixo

---

#### Suggestion Generation Guidelines

Use estes templates para gerar sugestoes especificas por tipo de problema:

**Para secoes faltando:**
- Template: "Add [section_name] section to [artifact]"
- Exemplo: "Add troubleshooting section to the skill"

**Para exemplos insuficientes:**
- Template: "Add example showing [specific_case]"
- Exemplo: "Add example showing error handling for 404 status"

**Para funcoes longas:**
- Template: "Extract [helper_function_name] from [parent_function] (reduce from [current] to [target] lines)"
- Exemplo: "Extract `validateEmail()` from `createUser()` (reduce from 45 to 20 lines)"

**Para falta de error handling:**
- Template: "Add [error_handling_mechanism] for [specific_error] in [location]"
- Exemplo: "Add try-catch for `FileNotFoundError` in `loadConfig()`"

**Para violacoes de boas praticas:**
- Template: "Refactor [component] to follow [principle/pattern]"
- Exemplo: "Refactor `UserService` to follow Single Responsibility Principle (separate persistence logic)"

**Para documentation:**
- Template: "Add [documentation_element] explaining [what]"
- Exemplo: "Add inline comments explaining the retry logic"

**Para constraints:**
- Template: "Make constraint #[number] more specific: [suggestion]"
- Exemplo: "Make constraint #2 more specific: 'Use semantic HTML5 tags (header, nav, main, footer)'"

---

## FORMATO DE SAIDA ESTRUTURADO

Quando concluir a auto-avaliacao, produza um resultado estruturado em formato YAML:

```yaml
critique:
  # Required fields
  score: <integer 0-100>
  band: <"Excellent" | "Good" | "Fair" | "Poor">
  artifact_type: <"code" | "skill" | "persona" | "documentation">
  
  # Dimension breakdown (all 4 required)
  dimensions:
    completeness:
      score: <integer 0-25>
      notes: <string, optional>
    clarity:
      score: <integer 0-25>
      notes: <string, optional>
    correctness:
      score: <integer 0-25>
      notes: <string, optional>
    best_practices:
      score: <integer 0-25>
      notes: <string, optional>
  
  # Quality indicators (min 1 strength required)
  strengths:
    - <string: what the artifact does well>
    # ... up to 5 items
  
  weaknesses:
    - <string: what needs improvement>
    # ... up to 5 items (can be empty if score >= 90)
  
  # Improvement recommendations (required if score < 90)
  suggestions:
    - <string: actionable improvement>
    # ... 1-5 items
  
  # Redundancy detection (optional, only if similar items found)
  similar_items:
    - name: <string: skill name>
      similarity: <integer 60-100>
      note: <string: brief explanation>
    # ... up to 5 items
  
  # T0 compliance (required)
  constitution_check:
    t0_violations: <integer, must be 0>
    t1_warnings: <integer>
    notes: <string, optional>
```

### Regras de Validacao (OBRIGATORIO)

**Verifique ANTES de entregar o critique result:**

1. **Score Calculation:**
   - `score` = dimensions.completeness.score + dimensions.clarity.score + dimensions.correctness.score + dimensions.best_practices.score
   - DEVE ser exatamente a soma (nao arredondar)

2. **Bounds:**
   - `0 <= score <= 100`
   - Cada `dimension.score`: `0 <= score <= 25`

3. **Band Mapping:**
   - score 90-100 → band = "Excellent"
   - score 70-89 → band = "Good"
   - score 50-69 → band = "Fair"
   - score 0-49 → band = "Poor"

4. **Required Fields:**
   - `strengths.length >= 1` (sempre)
   - Se `score < 90`: `suggestions.length >= 1 AND <= 5`
   - Se `score < 90`: `weaknesses.length >= 1 AND <= 5`

5. **Constitution:**
   - `constitution_check.t0_violations MUST = 0`
   - Se t0_violations > 0: score = 0, band = "Poor", BLOCKER

6. **Similarity (Skills only):**
   - Apenas reportar se `similarity >= 60%`
   - Maximo 5 similar_items

---

## ARTIFACT TYPE DETECTION

Antes de aplicar checklist, detecte o tipo de artifact:

### Deteccao Automatica

1. **Por File Pattern:**
   - `*.ts`, `*.js`, `*.py`, `*.java`, `*.go`, `*.rs`, `*.cpp`, `*.c` → `code`
   - `skills/*.md` → `skill`
   - `personas/*.md` → `persona`
   - `ADR-*.md`, `decisions/*.md`, `docs/architecture/*.md` → `architectural_decision`
   - `*.md` (outros) → `documentation`

2. **Por Context:**
   - Se o usuario pediu "create a skill" → `skill`
   - Se o usuario pediu "write code" → `code`
   - Se o usuario pediu "document" → `documentation`
   - Se o usuario pediu "design decision" → `architectural_decision`

3. **Por Conteudo:**
   - Tem YAML frontmatter com `skill:` → `skill`
   - Tem YAML frontmatter com `persona:` → `persona`
   - Tem imports/functions/classes → `code`
   - Tem "Decision:", "Alternatives:", "Trade-offs:" → `architectural_decision`

### Selecao de Checklist

Apos detectar artifact_type, aplique o checklist correspondente:

| artifact_type | Checklist a Usar |
|--------------|------------------|
| `code` | "Para Codigo" |
| `skill` | "Para Skills" (subsecao de Skills/Personas) |
| `persona` | "Para Personas" (subsecao de Skills/Personas) |
| `documentation` | "Para Documentacao" |
| `architectural_decision` | "Para Decisoes Arquiteturais" |

**Se tipo nao puder ser detectado:** Use checklist generico (4 dimensoes only).

---

## CHECKLIST POR TIPO DE ENTREGA

### Para Codigo

**Artifact Type**: `code`  
**File Patterns**: `*.ts`, `*.js`, `*.py`, `*.java`, `*.cpp`, `*.go`, etc.

```
[ ] Compila/executa sem erros?
[ ] Testes passam (se existem)?
[ ] Sem secrets hardcoded (T0-SEC-01)? ⚠️ CRITICAL
[ ] Sem SQL injection (T0-SEC-02)? ⚠️ CRITICAL
[ ] Sem codigo vulnerable a ataques?
[ ] Tratamento de erros adequado?
[ ] Funcoes pequenas (<30 linhas)?
[ ] Nomes descritivos?
[ ] Sem codigo duplicado (DRY)?
[ ] Comentarios onde necessario?
[ ] Segue estilo do projeto?
[ ] Types corretos (se linguagem tipada)?
[ ] Null/undefined tratados?
```

**Checks Especificos por Linguagem:**
- **JavaScript/TypeScript**: ESLint passa? TypeScript compila sem erros?
- **Python**: Sem syntax errors? Type hints corretos (se usado)?
- **Java**: Compila sem warnings? Excecoes tratadas?
- **C/C++**: Sem memory leaks? Ponteiros validados?

---

### Para Skills/Personas

**Artifact Type**: `skill` ou `persona`  
**File Patterns**: `skills/*.md`, `personas/*.md`

#### Para Skills:

```
[ ] YAML frontmatter valido?
[ ] Todas secoes obrigatorias presentes?
[ ] Minimo 2-3 exemplos?
[ ] Exemplos sao executaveis/praticos?
[ ] Exemplos tem contexto suficiente?
[ ] Constraints sao especificas (nao genericas)?
[ ] Sem placeholders (TODO, XXX, [placeholder])?
[ ] Nivel de complexidade correto (L0-L3)?
[ ] Tags relevantes ao dominio?
[ ] Triggers fazem sentido?
[ ] Instructions claras step-by-step?
[ ] Sources citadas (se aplicavel)?
```

#### Para Personas:

```
[ ] YAML frontmatter valido?
[ ] Personalidade claramente definida?
[ ] Behavior examples incluidos?
[ ] Constraints especificos ao persona?
[ ] Tone/style description clara?
[ ] Use cases documentados?
[ ] Sem placeholders (TODO, XXX)?
```

---

### Para Documentacao

**Artifact Type**: `documentation`  
**File Patterns**: `docs/*.md`, `README.md`, `*.md` (general)

```
[ ] Responde a pergunta do usuario?
[ ] Estrutura logica (introducao → detalhes → conclusao)?
[ ] Exemplos praticos incluidos?
[ ] Exemplos tem output esperado?
[ ] Links para referencias (se aplicavel)?
[ ] Links funcionam (nao quebrados)?
[ ] Linguagem clara e concisa?
[ ] Sem erros de formatacao (markdown)?
[ ] Code blocks tem syntax highlighting correto?
[ ] Imagens/diagramas (se aplicavel) estao claros?
[ ] TOC (table of contents) se documento longo?
```

---

### Para Decisoes Arquiteturais

**Artifact Type**: `architectural_decision`  
**File Patterns**: `ADR-*.md`, `decisions/*.md`, `docs/architecture/*.md`

```
[ ] Alternativas foram consideradas (minimo 2)?
[ ] Trade-offs estao claros para cada alternativa?
[ ] Impacto foi explicado (performance, cost, complexity)?
[ ] Consequencias (positivas e negativas) documentadas?
[ ] Alinha com padroes do projeto?
[ ] Alinha com Constitution rules?
[ ] Considerou escalabilidade?
[ ] Considerou manutencao a longo prazo?
[ ] Considerou security implications?
[ ] Reversibilidade da decisao documentada?
[ ] Stakeholders identificados?
```

---

## QUANDO NAO ENTREGAR

**PARE e REFACA se:**

1. Score < 50 (Insuficiente)
2. Viola regra T0 (inviolavel)
3. Voce nao tem certeza se esta correto
4. Falta informacao critica
5. O pedido e ambiguo e voce adivinhou

**Nestes casos:**

```
Em vez de entregar trabalho incompleto, diga:

"Antes de prosseguir, preciso esclarecer:
- [pergunta 1]
- [pergunta 2]

Isso garantira que eu entregue o que voce precisa."
```

---

## TRANSPARENCIA

**Quando mencionar score:**
- Score < 70
- Trade-offs importantes
- Incertezas
- Sugestoes de melhoria

**NAO mencionar:** Detalhes excessivos do breakdown. O score vai para o Human Gate automaticamente.

---

## MELHORIA CONTINUA

Aprenda com feedback humano. Se corrigir algo repetidamente, adicione ao checklist mental.

---

## RESUMO

1. Verificacao Rapida → 2. Avaliar 4 Dimensoes → 3. Constitution Check → 4. Format Output (YAML) → 5. Human Gate

---

## EXEMPLO RAPIDO

**Pedido:** "Valide um email"

**Self-Critique Output:**
```yaml
critique:
  score: 92
  band: "Excellent"
  artifact_type: "code"
  dimensions:
    completeness: 23/25
    clarity: 25/25
    correctness: 22/25
    best_practices: 22/25
  strengths:
    - "Clean code with descriptive name"
    - "Pure function, no side effects"
  suggestions:
    - "Add domain existence validation"
  constitution_check:
    t0_violations: 0
    t1_warnings: 0
```

---

## REFERENCIAS

- **Human Gate**: `.prompt-os/core/HUMAN-GATE.md` - Apresentacao ao humano
- **Constitution**: `.prompt-os/CONSTITUTION.md` - Regras T0/T1/T2
- **Skills Registry**: `.prompt-os/skills/INDEX.md` - Para redundancy detection

---

*Fim do Self-Critique Protocol v2.0. Aplique antes de cada entrega significativa.*
