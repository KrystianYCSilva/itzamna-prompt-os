# SKILLS INDEX

> **Registry de todas as skills disponiveis no PromptOS.**  
> Voce (agente de IA) deve consultar este indice para saber quais skills carregar (JIT).

---

## O QUE E UMA SKILL?

Uma skill define **COMO FAZER** algo especifico:

- **Instrucoes** - Passo a passo para executar a tarefa
- **Exemplos** - Casos praticos e executaveis
- **Constraints** - Limites e regras do dominio
- **Triggers** - Quando carregar automaticamente

---

## SKILLS DISPONIVEIS (5 baselines, 1 categoria)

### Linguagens de Programação (5 language baselines)

**Baselines** - Fundamentos essenciais de cada linguagem:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| c-cpp | Fundamentos de C/C++: ponteiros, memoria manual, RAII, compilacao nativa | L1 | `.prompt-os/skills/linguagens/c-cpp/SKILL.md` |
| java | Fundamentos da linguagem Java: tipagem estatica, GC, threads, ecossistema JVM | L1 | `.prompt-os/skills/linguagens/java/SKILL.md` |
| javascript | Fundamentos de JavaScript: tipagem dinamica, event loop, async/await, npm | L1 | `.prompt-os/skills/linguagens/javascript/SKILL.md` |
| kotlin | Fundamentos da linguagem Kotlin: null safety, coroutines, multiplatforma (JVM/JS/Native) | L1 | `.prompt-os/skills/linguagens/kotlin/SKILL.md` |
| python | Fundamentos da linguagem Python: duck typing, GIL, asyncio, ecossistema pip/PyPI | L1 | `.prompt-os/skills/linguagens/python/SKILL.md` |

**Advanced** - Features avançadas e versões específicas:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| java-8 | Features do Java 8: lambdas, streams, Optional, default methods | L2 | `.prompt-os/skills/linguagens/java/java-8/SKILL.md` |
| java-11 | Features do Java 11 (LTS): var, HttpClient, String methods | L2 | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` |
| java-17 | Features do Java 17 (LTS): sealed classes, records, pattern matching | L2 | `.prompt-os/skills/linguagens/java/java-17/SKILL.md` |
| java-21 | Features do Java 21 (LTS): virtual threads, pattern matching, sequenced collections | L2 | `.prompt-os/skills/linguagens/java/java-21/SKILL.md` |
| java-23 | Features do Java 23: primitive patterns, flexible constructor bodies | L2 | `.prompt-os/skills/linguagens/java/java-23/SKILL.md` |

---

## JIT SUB-FILES PATTERN

Algumas skills usam **sub-files** para manter o tamanho dentro do limite T0-SIZE-01 (1,400 tokens):

**Exemplo: C/C++**
- Main: `.prompt-os/skills/linguagens/c-cpp/SKILL.md`
- Sub-files:
  - `compilation.md` - Processo de compilação e linking
  - `build-tools.md` - CMake, Make, etc.
  - `advanced-memory.md` - Smart pointers, custom allocators

**Como usar:**
1. Carregue `SKILL.md` primeiro (overview + fundamentos)
2. Se precisar de detalhes, carregue o sub-file relevante (JIT)

---

## ESTATISTICAS

| Metrica | Valor |
|---------|-------|
| Total de Skills | 5 baselines + 5 advanced = 10 |
| Aprovadas | 10 |
| Rascunho | 0 |
| Categorias | 1 (linguagens) |

---

## NIVEIS (Levels)

| Level | Descricao |
|-------|-----------|
| L0 | Teste/exemplo |
| L1 | Fundamentos - conhecimento basico (baselines) |
| L2 | Intermediario - padroes e boas praticas (advanced) |
| L3 | Avancado - otimizacao e casos complexos |

---

## COMO USAR

### 1. Identifique a Skill Necessaria

Baseado no pedido do usuario, identifique qual skill e relevante.

**Exemplo:**
- "Como criar threads em Java?" → Carregue `java` (baseline)
- "Preciso usar virtual threads do Java 21" → Carregue `java-21` (advanced)

### 2. Consulte a Tabela

Use as tabelas acima para encontrar o nome e caminho.

### 3. Carregue a Skill (JIT)

```
Ler: .prompt-os/skills/linguagens/{language}/SKILL.md
```

**NUNCA carregue todas as skills de uma vez!** Carregue apenas 2-5 relevantes.

### 4. Aplique as Instrucoes

Siga as instrucoes da skill para executar a tarefa.

---

## REDUNDANCY DETECTION

Quando gerando uma nova skill, compare com a tabela acima para detectar sobreposicao:

- **Name similarity (30%)**: Palavras comuns nos nomes
- **Tag overlap (30%)**: Tags compartilhadas
- **Domain match (20%)**: Mesma categoria
- **Description keywords (20%)**: Keywords comuns nas descricoes

**Threshold**: Reporte apenas se similarity >= 60%

---

## ADICIONAR NOVA SKILL

Para adicionar uma nova skill:

1. Criar pasta: `.prompt-os/skills/{categoria}/{nome-da-skill}/`
2. Criar arquivo: `SKILL.md` seguindo `.prompt-os/templates/SKILL.template.md`
3. Atualizar este INDEX.md

**Ou use o brain.js:**
```bash
node .prompt-os/tools/brain.js generate skill "descricao da skill" --category {categoria}
```

---

## SPEC-010 LEARNINGS

As 5 language baselines foram criadas via **SPEC-010: Language Skills Baseline**:

**Key Metrics:**
- Avg Self-Critique score: 99.20/100
- Rejection rate: 0%
- Avg creation time: 51min (15% faster than 60min target)

**Proven Patterns:**
1. **JIT sub-files** - Use when skill >1,400 tokens (score improvement: 94→99)
2. **Version-agnostic baselines** - Avoid version-specific markers (e.g., "Java" not "Java 8")
3. **Self-Critique ≥99** - Perfect correlation with first-pass approval
4. **Consistent structure** - Same section flow aids quality and speed

**References:**
- `specs/010-language-skills-baseline/reports/self-critique-metrics.md`
- `specs/010-language-skills-baseline/reports/gap-detection-report.md`
- `specs/010-language-skills-baseline/reports/rejection-analysis-report.md`

---

## NOTAS

- Paths nos arquivos da tabela sao relativos à raiz do projeto
- Este INDEX é a **fonte de verdade** para skills no sistema
- Skills antigas (18) em `skills/` foram removidas (exemplos de teste v1.0)
- Novas skills serão criadas em `.prompt-os/skills/` conforme necessidade
- Use este arquivo dentro dos protocolos `.prompt-os/core/`

---

*PromptOS v2.1.0 | Atualizado: 2026-02-03 | Ready for SPEC-003*
