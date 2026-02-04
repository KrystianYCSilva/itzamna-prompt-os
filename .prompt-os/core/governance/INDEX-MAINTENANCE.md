# INDEX Maintenance Guide

> **Guia para atualizar INDEX.md files de forma segura.**  
> Previne erros comuns ao adicionar/modificar skills e personas.

---

## POR QUE ESTE GUIA?

Durante a validação do sistema (Sessions 16-19), identificamos que agents cometiam erros ao atualizar INDEX.md:

**Problemas Comuns:**
1. **Line replacement errado** - Substituir linha errada por similaridade
2. **Tabelas desalinhadas** - Pipes `|` não alinhados verticalmente
3. **Seções duplicadas** - Adicionar entry na seção errada
4. **Estatísticas desatualizadas** - Esquecer de incrementar contadores
5. **Links quebrados** - Paths incorretos para arquivos

---

## REGRA DE OURO: SECTION REPLACEMENT

**❌ NUNCA use line replacement** (substituir linha individual)  
**✅ SEMPRE use section replacement** (substituir seção inteira)

### Por quê?

Line replacement falha quando há similaridade:

```markdown
| java | Fundamentos Java | L1 | `.prompt-os/skills/linguagens/java/SKILL.md` |
| java-8 | Java 8 features | L2 | `.prompt-os/skills/linguagens/java/java-8/SKILL.md` |
| java-11 | Java 11 features | L2 | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` |
```

Se você quer atualizar `java-11`, mas faz line replacement com "java", pode substituir a linha errada!

**Solution:** Replace the entire table section.

---

## PROTOCOLO DE ATUALIZAÇÃO

### Step 1: Ler INDEX Completo

```markdown
# SKILLS INDEX

## SKILLS DISPONIVEIS (5 baselines, 1 categoria)

### Linguagens de Programação (5 language baselines)

**Baselines** - Fundamentos essenciais:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| c-cpp | Fundamentos C/C++ | L1 | `.prompt-os/skills/linguagens/c-cpp/SKILL.md` |
| java | Fundamentos Java | L1 | `.prompt-os/skills/linguagens/java/SKILL.md` |
...
```

### Step 2: Identificar Seção a Modificar

Determine qual seção precisa ser atualizada:

**Seções típicas:**
- `## SKILLS DISPONIVEIS (X baselines, Y categoria)` - Header com estatísticas
- `### Linguagens de Programação (X language baselines)` - Categoria
- `**Baselines** - Fundamentos essenciais:` + tabela - Sub-seção
- `**Advanced** - Features avançadas:` + tabela - Sub-seção
- `## ESTATISTICAS` - Métricas gerais

### Step 3: Copiar Seção Inteira

**Exemplo - Adicionar `java-23` à tabela Advanced:**

**ANTES:**
```markdown
**Advanced** - Features avançadas e versões específicas:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| java-8 | Features do Java 8: lambdas, streams, Optional | L2 | `.prompt-os/skills/linguagens/java/java-8/SKILL.md` |
| java-11 | Features do Java 11 (LTS): var, HttpClient | L2 | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` |
| java-17 | Features do Java 17 (LTS): sealed classes, records | L2 | `.prompt-os/skills/linguagens/java/java-17/SKILL.md` |
| java-21 | Features do Java 21 (LTS): virtual threads | L2 | `.prompt-os/skills/linguagens/java/java-21/SKILL.md` |
```

**DEPOIS:**
```markdown
**Advanced** - Features avançadas e versões específicas:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| java-8 | Features do Java 8: lambdas, streams, Optional | L2 | `.prompt-os/skills/linguagens/java/java-8/SKILL.md` |
| java-11 | Features do Java 11 (LTS): var, HttpClient | L2 | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` |
| java-17 | Features do Java 17 (LTS): sealed classes, records | L2 | `.prompt-os/skills/linguagens/java/java-17/SKILL.md` |
| java-21 | Features do Java 21 (LTS): virtual threads | L2 | `.prompt-os/skills/linguagens/java/java-21/SKILL.md` |
| java-23 | Features do Java 23: primitive patterns | L2 | `.prompt-os/skills/linguagens/java/java-23/SKILL.md` |
```

### Step 4: Usar Edit Tool com Section Replacement

```python
edit(
    filePath=".prompt-os/skills/INDEX.md",
    oldString="""**Advanced** - Features avançadas e versões específicas:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| java-8 | Features do Java 8: lambdas, streams, Optional | L2 | `.prompt-os/skills/linguagens/java/java-8/SKILL.md` |
| java-11 | Features do Java 11 (LTS): var, HttpClient | L2 | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` |
| java-17 | Features do Java 17 (LTS): sealed classes, records | L2 | `.prompt-os/skills/linguagens/java/java-17/SKILL.md` |
| java-21 | Features do Java 21 (LTS): virtual threads | L2 | `.prompt-os/skills/linguagens/java/java-21/SKILL.md` |""",
    newString="""**Advanced** - Features avançadas e versões específicas:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| java-8 | Features do Java 8: lambdas, streams, Optional | L2 | `.prompt-os/skills/linguagens/java/java-8/SKILL.md` |
| java-11 | Features do Java 11 (LTS): var, HttpClient | L2 | `.prompt-os/skills/linguagens/java/java-11/SKILL.md` |
| java-17 | Features do Java 17 (LTS): sealed classes, records | L2 | `.prompt-os/skills/linguagens/java/java-17/SKILL.md` |
| java-21 | Features do Java 21 (LTS): virtual threads | L2 | `.prompt-os/skills/linguagens/java/java-21/SKILL.md` |
| java-23 | Features do Java 23: primitive patterns | L2 | `.prompt-os/skills/linguagens/java/java-23/SKILL.md` |"""
)
```

### Step 5: Atualizar Estatísticas

Não esqueça de atualizar os contadores no header:

**ANTES:**
```markdown
## SKILLS DISPONIVEIS (5 baselines, 1 categoria)
```

**DEPOIS (após adicionar java-23):**
```markdown
## SKILLS DISPONIVEIS (5 baselines + 5 advanced, 1 categoria)
```

E na seção `## ESTATISTICAS`:

**ANTES:**
```markdown
| Total de Skills | 5 baselines + 4 advanced = 9 |
```

**DEPOIS:**
```markdown
| Total de Skills | 5 baselines + 5 advanced = 10 |
```

### Step 6: Verificar Formato

Antes de commitar, verifique:

- [ ] Pipes `|` alinhados verticalmente
- [ ] Sem linhas vazias dentro de tabelas
- [ ] Paths começam com `.prompt-os/skills/` ou `.prompt-os/personas/`
- [ ] Descrições sucintas (max 80 chars)
- [ ] Level correto (L0/L1/L2/L3)
- [ ] Estatísticas atualizadas (header + seção ESTATISTICAS)

---

## EXEMPLOS PRÁTICOS

### Exemplo 1: Adicionar Skill de Framework

**Task:** Adicionar `spring-boot` skill

**Files a atualizar:**
1. `.prompt-os/skills/INDEX.md` - Adicionar entry na categoria `frameworks`
2. `skills/INDEX.md` (legado, se existir) - Mirror do primeiro

**Step 1:** Ler INDEX, encontrar seção `### Frameworks`

**Step 2:** Copiar tabela inteira da seção Frameworks

**Step 3:** Adicionar nova linha à tabela:
```markdown
| spring-boot | Spring Boot framework: auto-config, starters, embedded servers | L2 | `.prompt-os/skills/frameworks/spring/spring-boot/SKILL.md` |
```

**Step 4:** Replace seção completa (header + tabela)

**Step 5:** Atualizar estatísticas:
- Header: `(X baselines, Y categorias)` → incrementar se nova categoria
- Seção ESTATISTICAS: `Total de Skills` +1

### Exemplo 2: Atualizar Descrição de Skill

**Task:** Melhorar descrição de `kotlin` skill

**❌ ERRADO (line replacement):**
```python
edit(
    oldString="| kotlin | Fundamentos da linguagem Kotlin | L1 | ... |",
    newString="| kotlin | Fundamentos de Kotlin: null safety, coroutines, multiplatforma | L1 | ... |"
)
```

**✅ CORRETO (section replacement):**
```python
edit(
    oldString="""**Baselines** - Fundamentos essenciais de cada linguagem:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| c-cpp | Fundamentos de C/C++: ponteiros, memoria manual, RAII | L1 | `.prompt-os/skills/linguagens/c-cpp/SKILL.md` |
| java | Fundamentos da linguagem Java: tipagem estatica, GC, threads | L1 | `.prompt-os/skills/linguagens/java/SKILL.md` |
| javascript | Fundamentos de JavaScript: tipagem dinamica, event loop, async/await | L1 | `.prompt-os/skills/linguagens/javascript/SKILL.md` |
| kotlin | Fundamentos da linguagem Kotlin | L1 | `.prompt-os/skills/linguagens/kotlin/SKILL.md` |
| python | Fundamentos da linguagem Python: duck typing, GIL, asyncio | L1 | `.prompt-os/skills/linguagens/python/SKILL.md` |""",
    newString="""**Baselines** - Fundamentos essenciais de cada linguagem:

| Nome | Descricao | Level | Arquivo |
|------|-----------|-------|---------|
| c-cpp | Fundamentos de C/C++: ponteiros, memoria manual, RAII | L1 | `.prompt-os/skills/linguagens/c-cpp/SKILL.md` |
| java | Fundamentos da linguagem Java: tipagem estatica, GC, threads | L1 | `.prompt-os/skills/linguagens/java/SKILL.md` |
| javascript | Fundamentos de JavaScript: tipagem dinamica, event loop, async/await | L1 | `.prompt-os/skills/linguagens/javascript/SKILL.md` |
| kotlin | Fundamentos de Kotlin: null safety, coroutines, multiplatforma (JVM/JS/Native) | L1 | `.prompt-os/skills/linguagens/kotlin/SKILL.md` |
| python | Fundamentos da linguagem Python: duck typing, GIL, asyncio | L1 | `.prompt-os/skills/linguagens/python/SKILL.md` |"""
)
```

### Exemplo 3: Remover Skill Deprecated

**Task:** Remover `java-8` skill (deprecated)

**Step 1:** Ler INDEX, encontrar tabela Advanced

**Step 2:** Copiar tabela inteira

**Step 3:** Remover linha `java-8`

**Step 4:** Replace seção completa (SEM java-8)

**Step 5:** Atualizar estatísticas: `Total de Skills` -1

---

## TROUBLESHOOTING

### Problema: "oldString not found in content"

**Causa:** String que você está procurando não existe exatamente como escrito

**Solução:**
1. Leia o arquivo novamente para ver conteúdo atual
2. Copie EXATAMENTE a seção (incluindo espaços, quebras de linha)
3. Use seção maior se necessário (mais contexto = menos ambiguidade)

### Problema: "oldString found multiple times"

**Causa:** String aparece múltiplas vezes no arquivo

**Solução:**
1. Aumente o contexto (inclua header da seção)
2. Use string única (ex: inclua parte da descrição específica)
3. Se inevitável, use `replaceAll=true` (cuidado!)

### Problema: Tabela ficou desalinhada

**Causa:** Pipes não verticalmente alinhados

**Solução:**
1. Use editor com formatter Markdown (VSCode, Cursor)
2. Ou use ferramenta online: https://www.tablesgenerator.com/markdown_tables
3. Ou verifique manualmente que cada coluna tem mesma largura

### Problema: Estatísticas não batem

**Causa:** Esqueceu de atualizar contadores

**Solução:**
1. Conte manualmente skills na tabela
2. Atualize `## SKILLS DISPONIVEIS (X baselines + Y advanced, Z categorias)`
3. Atualize `## ESTATISTICAS` - `Total de Skills`
4. Verifique `Aprovadas`, `Rascunho` também

---

## CHECKLIST DE VERIFICAÇÃO

Antes de commitar mudanças em INDEX.md:

- [ ] Usei section replacement (NÃO line replacement)
- [ ] Copiei seção inteira corretamente
- [ ] Tabelas estão alinhadas (pipes verticais)
- [ ] Paths estão corretos (`.prompt-os/skills/...` ou `.prompt-os/personas/...`)
- [ ] Descrições sucintas (max 80 chars)
- [ ] Level correto (L0/L1/L2/L3)
- [ ] Estatísticas atualizadas (header)
- [ ] Estatísticas atualizadas (seção ESTATISTICAS)
- [ ] Arquivo renderiza corretamente (preview Markdown)
- [ ] Não criei linhas vazias dentro de tabelas
- [ ] Não quebrei formatação de seções existentes

---

## REFERÊNCIAS

- `.prompt-os/skills/INDEX.md` - Skills registry
- `.prompt-os/personas/INDEX.md` - Personas registry
- `.prompt-os/CONSTITUTION.md` - T1-NAMING-01 naming conventions
- `.prompt-os/core/MEMORY-MANAGEMENT.md` - How to update memory after changes

---

**EOF** | Version: 2.2.0 | INDEX Maintenance Guide
