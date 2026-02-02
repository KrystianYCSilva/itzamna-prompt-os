# Guia de Migracao Brownfield

> **Versao:** 1.0.0
> **Data:** 2026-01-16
> **Objetivo:** Atualizar projetos existentes para conformidade com Prompt OS v3.2

---

## 1. Visao Geral

Este guia fornece uma rotina passo-a-passo para migrar projetos **brownfield** (existentes) que possuem estruturas `.context/` e/ou `docs/` desatualizadas ou nao-conformes.

### Cenarios Cobertos

| Cenario | Descricao | Complexidade |
|---------|-----------|--------------|
| **A** | Projeto sem .context/ nem docs/ | Simples (Greenfield) |
| **B** | Projeto com docs/ mas sem .context/ | Media |
| **C** | Projeto com .context/ mas desatualizado | Media |
| **D** | Projeto com ambos mas nao-conformes | Alta |

---

## 2. Rotina de Auditoria

### 2.1. Script de Diagnostico

Execute no terminal para diagnosticar o estado atual:

```bash
#!/bin/bash
# diagnostico-conformidade.sh

PROJECT_ROOT="${1:-.}"
echo "=== DIAGNOSTICO DE CONFORMIDADE v3.2 ==="
echo "Projeto: $PROJECT_ROOT"
echo ""

# Verificar arquivos de kernel
echo "--- KERNEL FILES ---"
[ -f "$PROJECT_ROOT/AGENTS.md" ] && echo "[OK] AGENTS.md" || echo "[FALTA] AGENTS.md"
[ -f "$PROJECT_ROOT/CLAUDE.md" ] && echo "[OK] CLAUDE.md" || echo "[FALTA] CLAUDE.md (opcional)"
[ -f "$PROJECT_ROOT/MEMORY.md" ] && echo "[OK] MEMORY.md" || echo "[FALTA] MEMORY.md"
[ -f "$PROJECT_ROOT/.cursorrules" ] && echo "[OK] .cursorrules" || echo "[FALTA] .cursorrules (opcional)"

# Verificar .context/
echo ""
echo "--- .context/ STRUCTURE ---"
[ -d "$PROJECT_ROOT/.context" ] && echo "[OK] .context/" || echo "[FALTA] .context/"
[ -f "$PROJECT_ROOT/.context/README.md" ] && echo "[OK] .context/README.md" || echo "[FALTA] .context/README.md"
[ -d "$PROJECT_ROOT/.context/_meta" ] && echo "[OK] .context/_meta/" || echo "[FALTA] .context/_meta/"
[ -f "$PROJECT_ROOT/.context/_meta/tech-stack.md" ] && echo "[OK] tech-stack.md" || echo "[FALTA] tech-stack.md"
[ -d "$PROJECT_ROOT/.context/standards" ] && echo "[OK] .context/standards/" || echo "[FALTA] .context/standards/"
[ -f "$PROJECT_ROOT/.context/standards/architectural-rules.md" ] && echo "[OK] architectural-rules.md" || echo "[FALTA] architectural-rules.md"

# Verificar docs/
echo ""
echo "--- docs/ STRUCTURE ---"
[ -d "$PROJECT_ROOT/docs" ] && echo "[OK] docs/" || echo "[FALTA] docs/"
[ -f "$PROJECT_ROOT/docs/README.md" ] && echo "[OK] docs/README.md" || echo "[FALTA] docs/README.md"
[ -d "$PROJECT_ROOT/docs/cards" ] && echo "[OK] docs/cards/" || echo "[FALTA] docs/cards/"
[ -d "$PROJECT_ROOT/docs/decisions" ] && echo "[OK] docs/decisions/" || echo "[FALTA] docs/decisions/"

# Contar arquivos
echo ""
echo "--- CONTAGEM ---"
CARDS=$(find "$PROJECT_ROOT/docs/cards" -name "CARD-*.md" 2>/dev/null | wc -l)
ADRS=$(find "$PROJECT_ROOT/docs/decisions" -name "ADR-*.md" 2>/dev/null | wc -l)
echo "Cards encontrados: $CARDS"
echo "ADRs encontrados: $ADRS"

echo ""
echo "=== FIM DO DIAGNOSTICO ==="
```

### 2.2. Checklist Manual de Auditoria

```markdown
## Checklist de Auditoria - Projeto: [NOME]

### Kernel (Obrigatorio)
- [ ] AGENTS.md existe e esta atualizado (v3.1+)
- [ ] MEMORY.md existe e tem estrutura correta
- [ ] Tier System esta documentado

### .context/ (Nivel Basico)
- [ ] .context/README.md existe
- [ ] .context/_meta/tech-stack.md existe e reflete stack atual
- [ ] .context/standards/architectural-rules.md tem regras T0

### .context/ (Nivel Completo)
- [ ] .context/ai-assistant-guide.md existe
- [ ] .context/_meta/project-overview.md existe
- [ ] .context/_meta/key-decisions.md existe
- [ ] .context/standards/code-quality.md existe
- [ ] .context/standards/testing-strategy.md existe
- [ ] .context/patterns/ existe e tem conteudo
- [ ] .context/examples/ existe e tem conteudo

### docs/ (Nivel Basico)
- [ ] docs/README.md existe
- [ ] docs/cards/ existe
- [ ] docs/decisions/ existe

### docs/ (Nivel Completo)
- [ ] docs/ARCHITECTURE.md existe
- [ ] docs/requisitos/ existe (tecnicos/, qualidade/, negocial/)
- [ ] docs/diagramas/ existe
- [ ] docs/requests-for-comments/ existe
- [ ] docs/pesquisa-previa/ existe com README.md

### Nomenclatura
- [ ] Cards seguem padrao CARD-XXX-descricao.md
- [ ] ADRs seguem padrao ADR-XXX-descricao.md
- [ ] Templates (_TEMPLATE.md) existem em cada pasta
```

---

## 3. Rotina de Migracao

### 3.1. Cenario B: Projeto com docs/ mas sem .context/

```bash
# Passo 1: Criar estrutura .context/
mkdir -p .context/{_meta,standards,patterns,examples,workflows,troubleshooting}

# Passo 2: Copiar templates base
cp [REPO_PROMPTS]/.agents/templates/.context-README-template.md .context/README.md
cp [REPO_PROMPTS]/.agents/templates/.context-tech-stack-template.md .context/_meta/tech-stack.md
cp [REPO_PROMPTS]/.agents/templates/.context-architectural-rules-template.md .context/standards/architectural-rules.md

# Passo 3: Criar kernel se nao existir
[ ! -f AGENTS.md ] && cp [REPO_PROMPTS]/AGENTS.md ./AGENTS.md
[ ! -f MEMORY.md ] && touch MEMORY.md

# Passo 4: Preencher tech-stack.md com dados do projeto
# (Analisar pom.xml/build.gradle e preencher)
```

### 3.2. Cenario C: Projeto com .context/ desatualizado

```bash
# Passo 1: Backup
cp -r .context .context.backup.$(date +%Y%m%d)

# Passo 2: Verificar e criar pastas faltantes
mkdir -p .context/{_meta,standards,patterns,examples,workflows,troubleshooting}

# Passo 3: Verificar arquivos obrigatorios
[ ! -f .context/README.md ] && echo "CRIAR: .context/README.md"
[ ! -f .context/_meta/tech-stack.md ] && echo "CRIAR: .context/_meta/tech-stack.md"
[ ! -f .context/standards/architectural-rules.md ] && echo "CRIAR: .context/standards/architectural-rules.md"

# Passo 4: Atualizar AGENTS.md para v3.2
# Verificar se tem Tier System e input-classifier referenciado
```

### 3.3. Cenario D: Ambos existem mas nao-conformes

Este e o cenario mais complexo. Siga esta ordem:

#### Fase 1: Preservar Conteudo Existente

```bash
# Backup completo
tar -czvf backup-docs-context-$(date +%Y%m%d).tar.gz docs .context AGENTS.md MEMORY.md

# Listar conteudo existente
find docs -name "*.md" -type f > existing-docs.txt
find .context -name "*.md" -type f > existing-context.txt
```

#### Fase 2: Reestruturar .context/

```bash
# Criar estrutura padrao
mkdir -p .context.new/{_meta,standards,patterns,examples,workflows,troubleshooting}

# Migrar arquivos existentes para nova estrutura
# Regras arquiteturais → standards/
# Decisoes/ADRs → _meta/key-decisions.md (consolidado)
# Exemplos → examples/
# Workflows → workflows/

# Criar README.md com navegacao
```

#### Fase 3: Reestruturar docs/

```bash
# Criar estrutura padrao
mkdir -p docs.new/{cards,decisions,requisitos/{tecnicos,qualidade,negocial},diagramas,requests-for-comments,pesquisa-previa,debitos-tecnicos,plan}

# Migrar conteudo existente
# - Mover cards para docs.new/cards/ (renomear se necessario)
# - Mover ADRs para docs.new/decisions/ (renomear se necessario)
# - Mover requisitos para pastas apropriadas
# - Mover diagramas para docs.new/diagramas/

# Criar README.md
```

#### Fase 4: Atualizar Kernel

```markdown
1. Atualizar AGENTS.md:
   - Verificar referencias ao Tier System
   - Adicionar referencia ao input-classifier.md
   - Atualizar versao para 3.2.0

2. Atualizar MEMORY.md:
   - Registrar migracao
   - Atualizar estado atual
```

#### Fase 5: Validacao

```bash
# Executar diagnostico novamente
./diagnostico-conformidade.sh .

# Verificar se todas as referencias estao corretas
grep -r "\.context/" AGENTS.md
grep -r "docs/" AGENTS.md
```

---

## 4. Guia de Mapeamento

### 4.1. Mapeamento de Conteudo Existente

Use esta tabela para decidir onde colocar conteudo existente:

| Conteudo Existente | Destino Novo | Nivel |
|--------------------|--------------|-------|
| Regras de arquitetura | .context/standards/architectural-rules.md | T0 |
| Padroes de codigo | .context/standards/code-quality.md | T1 |
| Estrategia de testes | .context/standards/testing-strategy.md | T1 |
| ADRs/Decisoes | docs/decisions/ OU .context/_meta/key-decisions.md | - |
| Visao geral do projeto | .context/_meta/project-overview.md | T2 |
| Stack tecnica | .context/_meta/tech-stack.md | T2 |
| Exemplos de codigo | .context/examples/ | T3 |
| Cards/Tarefas | docs/cards/ | - |
| Diagramas | docs/diagramas/ | - |
| Requisitos de negocio | docs/requisitos/negocial/ | - |
| Requisitos tecnicos | docs/requisitos/tecnicos/ | - |
| Requisitos qualidade | docs/requisitos/qualidade/ | - |
| Pesquisas | docs/pesquisa-previa/ | - |
| Debitos tecnicos | docs/debitos-tecnicos/ | - |

### 4.2. Renomeacao de Arquivos

| Padrao Antigo | Padrao Novo |
|---------------|-------------|
| `card-001.md` | `CARD-001-descricao.md` |
| `adr001.md` | `ADR-001-descricao.md` |
| `decision-001.md` | `ADR-001-descricao.md` |
| `rfc-001.md` | `RFC-001-descricao.md` |
| `task-001.md` | `CARD-001-descricao.md` |

---

## 5. Script de Migracao Automatizada

```bash
#!/bin/bash
# migrate-to-v32.sh

PROJECT_ROOT="${1:-.}"
TEMPLATE_REPO="${2:-./prompts}"

echo "=== MIGRACAO PARA PROMPT OS v3.2 ==="
echo "Projeto: $PROJECT_ROOT"
echo "Templates: $TEMPLATE_REPO"
echo ""

# Backup
echo "[1/6] Criando backup..."
BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).tar.gz"
tar -czvf "$BACKUP_FILE" "$PROJECT_ROOT/.context" "$PROJECT_ROOT/docs" "$PROJECT_ROOT/AGENTS.md" "$PROJECT_ROOT/MEMORY.md" 2>/dev/null || true
echo "Backup criado: $BACKUP_FILE"

# Estrutura .context/
echo "[2/6] Criando estrutura .context/..."
mkdir -p "$PROJECT_ROOT/.context"/{_meta,standards,patterns,examples,workflows,troubleshooting}

# Estrutura docs/
echo "[3/6] Criando estrutura docs/..."
mkdir -p "$PROJECT_ROOT/docs"/{cards,decisions,requisitos/{tecnicos,qualidade,negocial},diagramas/{classes,sequencia,c4,outros},requests-for-comments,pesquisa-previa,debitos-tecnicos,plan}

# Copiar templates se nao existirem
echo "[4/6] Verificando arquivos obrigatorios..."

# Kernel
[ ! -f "$PROJECT_ROOT/AGENTS.md" ] && cp "$TEMPLATE_REPO/AGENTS.md" "$PROJECT_ROOT/AGENTS.md" && echo "  Criado: AGENTS.md"
[ ! -f "$PROJECT_ROOT/MEMORY.md" ] && echo "# MEMORY.md - AI Persistent State

## Last Updated
$(date +%Y-%m-%d)

## Current State
**Project:** $(basename $PROJECT_ROOT)
**Status:** Migrando para v3.2

## Recent Actions
- Migracao para Prompt OS v3.2 iniciada

## Next Steps
- Completar configuracao .context/
- Revisar documentacao em docs/
" > "$PROJECT_ROOT/MEMORY.md" && echo "  Criado: MEMORY.md"

# .context/ README
[ ! -f "$PROJECT_ROOT/.context/README.md" ] && echo "# .context/ - AI Context Hub

## Quick Start
1. Read this file
2. Load \`standards/architectural-rules.md\` (T0)
3. Check \`_meta/tech-stack.md\` for project specifics

## Structure
- \`_meta/\` - Project context (T2)
- \`standards/\` - Rules and patterns (T0-T1)
- \`patterns/\` - Blueprints (T1)
- \`examples/\` - Code samples (T3)

## Tier System
| Tier | Type | Authority |
|------|------|-----------|
| T0 | Enforcement | ABSOLUTE |
| T1 | Standards | NORMATIVE |
| T2 | Context | INFORMATIVE |
| T3 | Examples | ILLUSTRATIVE |
" > "$PROJECT_ROOT/.context/README.md" && echo "  Criado: .context/README.md"

# tech-stack.md
[ ! -f "$PROJECT_ROOT/.context/_meta/tech-stack.md" ] && echo "# Tech Stack

## Language
- [TODO: Identificar linguagem e versao]

## Frameworks
- [TODO: Listar frameworks]

## Build
- [TODO: Maven/Gradle/etc]

## Database
- [TODO: Banco de dados]

## Notes
- Migrado para Prompt OS v3.2 em $(date +%Y-%m-%d)
" > "$PROJECT_ROOT/.context/_meta/tech-stack.md" && echo "  Criado: tech-stack.md"

# architectural-rules.md
[ ! -f "$PROJECT_ROOT/.context/standards/architectural-rules.md" ] && echo "# Architectural Rules - T0 (Enforcement)

> **Tier**: T0 - ABSOLUTO. SEMPRE seguir estas regras.

---

## [TODO] Adicionar regras T0 do projeto

Exemplo:
## CODE-01: Proibido System.out.println
**Regra**: Use logger ao inves de System.out

\`\`\`java
// CORRETO
logger.info(\"Message\");

// PROIBIDO
System.out.println(\"Message\");
\`\`\`

---
" > "$PROJECT_ROOT/.context/standards/architectural-rules.md" && echo "  Criado: architectural-rules.md"

# docs/README.md
[ ! -f "$PROJECT_ROOT/docs/README.md" ] && echo "# docs/ - Documentacao do Projeto

> **AVISO PARA IAs**: Esta pasta e 'arquivo morto' para humanos.
> Para contexto ativo, consulte \`/.context/\` primeiro.

## Estrutura

| Pasta | Conteudo |
|-------|----------|
| cards/ | Unidades de trabalho |
| decisions/ | ADRs |
| requisitos/ | Especificacoes (RN, RT, RQ) |
| diagramas/ | Visualizacoes |
" > "$PROJECT_ROOT/docs/README.md" && echo "  Criado: docs/README.md"

echo "[5/6] Atualizando MEMORY.md..."
echo "
---
## Migration Log
- **Data:** $(date +%Y-%m-%d)
- **Versao:** 3.2.0
- **Status:** Migracao concluida
" >> "$PROJECT_ROOT/MEMORY.md"

echo "[6/6] Validando..."
echo ""
echo "=== RESULTADO ==="
echo "Estrutura criada. Proximos passos:"
echo "1. Revisar e preencher .context/_meta/tech-stack.md"
echo "2. Adicionar regras T0 em .context/standards/architectural-rules.md"
echo "3. Mover conteudo existente para pastas apropriadas"
echo "4. Executar diagnostico: ./diagnostico-conformidade.sh $PROJECT_ROOT"
echo ""
echo "=== MIGRACAO CONCLUIDA ==="
```

---

## 6. Pos-Migracao

### 6.1. Validacao Final

```bash
# Executar diagnostico
./diagnostico-conformidade.sh .

# Testar com IA
# Abrir projeto no Cursor/VS Code e verificar se Copilot/Claude
# carrega corretamente o contexto
```

### 6.2. Comunicar ao Time

```markdown
## [PROJETO] Migracao para Prompt OS v3.2

**Data:** [DATA]
**Responsavel:** [NOME]

### O que mudou
- Estrutura .context/ padronizada
- Estrutura docs/ padronizada
- Kernel atualizado (AGENTS.md, MEMORY.md)

### Como usar
- IAs agora carregam contexto automaticamente
- Tier System define precedencia de regras
- Cards em docs/cards/, ADRs em docs/decisions/

### Proximos passos
- [ ] Preencher regras T0 faltantes
- [ ] Documentar decisoes arquiteturais em ADRs
- [ ] Criar cards para trabalho em andamento
```

---

## 7. Troubleshooting

### Problema: IA nao carrega contexto

**Causa:** AGENTS.md nao referencia .context/ corretamente
**Solucao:** Verificar se AGENTS.md tem:
```markdown
**CRITICAL**: Load context from `/.context/`
```

### Problema: Conflito entre arquivos antigos e novos

**Causa:** Arquivos duplicados apos migracao
**Solucao:**
1. Manter apenas versao na estrutura nova
2. Remover duplicatas da estrutura antiga
3. Atualizar referencias

### Problema: Nomenclatura inconsistente

**Causa:** Arquivos nao seguem padrao CARD-XXX/ADR-XXX
**Solucao:**
```bash
# Renomear em lote
for f in docs/cards/card-*.md; do
  NEW=$(echo $f | sed 's/card-/CARD-/' | sed 's/\.md/-descricao.md/')
  mv "$f" "$NEW"
done
```

---

## 8. Referencias

- RFC-UNIFIED-CONTEXT-STRUCTURE.md
- RFC-UNIFIED-DOCS-STRUCTURE.md
- START-UP.md (Guia de instalacao)

---

**Versao:** 1.0.0
**Ultima Atualizacao:** 2026-01-16
