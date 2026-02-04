# Itzamna PromptOS v1.0.0 - Guia de Implementacao

> **Guia Pratico para Configurar e Usar o PromptOS Brain**
>
> Este documento consolida os passos de implementacao, scripts e workflows
> para colocar o sistema em funcionamento.

---

## Indice

1. [Setup Inicial](#1-setup-inicial)
2. [Scripts de Configuracao](#2-scripts-de-configuracao)
3. [CLI brain.js](#3-cli-brainjs)
4. [Integracao Spec-Kit](#4-integracao-spec-kit)
5. [Workflows](#5-workflows)
6. [Troubleshooting](#6-troubleshooting)
7. [Checklist de Implementacao](#7-checklist-de-implementacao)

---

## 1. Setup Inicial

### 1.1 Pre-requisitos

```yaml
runtime: Node.js 20+ ou Python 3.11+
sistema: Windows (PowerShell) ou Linux/Mac (Bash)
editor: VS Code, Cursor, ou qualquer IDE
git: Configurado para o projeto
```

### 1.2 Estrutura de Diretorios

O PromptOS requer a seguinte estrutura:

```
{project-root}/
├── AGENTS.md                    # Kernel PromptOS
├── MEMORY.md                    # Estado persistente
├── skills/                      # Skills do PromptOS
│   ├── {skill-name}/
│   │   └── SKILL.md
│   └── INDEX.md
├── personas/                    # Personas
│   ├── {persona-name}/
│   │   └── PERSONA.md
│   └── INDEX.md
├── .prompt-os/                  # Internals
│   ├── core/
│   ├── templates/
│   ├── scripts/
│   └── prompts/
├── .specify/                    # Spec-Kit (via speckit init)
│   └── memory/
│       └── constitution.md
└── GLOSSARIO-TECNICO-PROMPTOS.md
```

### 1.3 Regras de Formato (IMPORTANTE)

**Formato de Skills (CORRETO):**
```
skills/
├── docker/
│   └── SKILL.md          # Arquivo principal
├── kubernetes/
│   └── SKILL.md
└── INDEX.md              # Indice
```

**Caminho correto:** `/skills/docker/SKILL.md`
**Caminho errado:** `/skills/technology/cloud/docker.md`

A categoria vai no YAML frontmatter, NAO no path do arquivo.

---

## 2. Scripts de Configuracao

### 2.1 Setup Bash (Linux/Mac)

```bash
#!/bin/bash
# setup-promptos-brain.sh
# Execute: chmod +x setup-promptos-brain.sh && ./setup-promptos-brain.sh

set -e  # Para em caso de erro

echo "Criando estrutura do PromptOS Brain..."

# Diretorio base (ajuste conforme necessario)
BASE_DIR="${PWD}"

# Criar estrutura de diretorios
mkdir -p "${BASE_DIR}"/{skills,personas,.prompt-os/{core,templates,scripts,prompts}}

# Criar arquivos de indice
cat > "${BASE_DIR}/skills/INDEX.md" << 'EOF'
# Skills do PromptOS

| Nome | Dominio | Status | Data | Autor |
|------|---------|--------|------|-------|
EOF

cat > "${BASE_DIR}/personas/INDEX.md" << 'EOF'
# Personas do PromptOS

| Nome | Tipo | Status | Data | Autor |
|------|------|--------|------|-------|
EOF

# Criar MEMORY.md inicial
cat > "${BASE_DIR}/MEMORY.md" << 'EOF'
# MEMORY.md - Estado Persistente do PromptOS Brain

**Ultima Atualizacao:** $(date -Iseconds)
**Versao:** 1.0.0
**Sessoes Totais:** 0

---

## Estatisticas

| Metrica | Valor |
|---------|-------|
| Skills Geradas | 0 |
| Personas Geradas | 0 |
| Taxa de Aprovacao | N/A |

---

## Memoria Episodica Recente

(Vazio - nenhuma interacao registrada)

---

## Pendencias

- [ ] Criar primeira skill de teste
EOF

echo "Estrutura criada em ${BASE_DIR}"
echo ""
echo "Proximos passos:"
echo "1. Configurar AGENTS.md"
echo "2. Inicializar Spec-Kit: speckit init --here --ai claude"
echo "3. Testar geracao de skill"
```

### 2.2 Setup PowerShell (Windows)

```powershell
# setup-promptos-brain.ps1
# Execute: .\setup-promptos-brain.ps1

$ErrorActionPreference = "Stop"

Write-Host "Criando estrutura do PromptOS Brain..." -ForegroundColor Cyan

# Diretorio base
$BaseDir = Get-Location

# Criar estrutura
$dirs = @(
    "skills",
    "personas",
    ".prompt-os\core",
    ".prompt-os\templates",
    ".prompt-os\scripts",
    ".prompt-os\prompts"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path (Join-Path $BaseDir $dir) | Out-Null
}

# Criar INDEX.md para skills
@"
# Skills do PromptOS

| Nome | Dominio | Status | Data | Autor |
|------|---------|--------|------|-------|
"@ | Set-Content (Join-Path $BaseDir "skills\INDEX.md")

# Criar INDEX.md para personas
@"
# Personas do PromptOS

| Nome | Tipo | Status | Data | Autor |
|------|------|--------|------|-------|
"@ | Set-Content (Join-Path $BaseDir "personas\INDEX.md")

# Criar MEMORY.md
$timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss"
@"
# MEMORY.md - Estado Persistente do PromptOS Brain

**Ultima Atualizacao:** $timestamp
**Versao:** 1.0.0
**Sessoes Totais:** 0

---

## Estatisticas

| Metrica | Valor |
|---------|-------|
| Skills Geradas | 0 |
| Personas Geradas | 0 |
| Taxa de Aprovacao | N/A |

---

## Memoria Episodica Recente

(Vazio - nenhuma interacao registrada)

---

## Pendencias

- [ ] Criar primeira skill de teste
"@ | Set-Content (Join-Path $BaseDir "MEMORY.md")

Write-Host "Estrutura criada em $BaseDir" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. Configurar AGENTS.md"
Write-Host "2. Inicializar Spec-Kit: speckit init --here --ai claude"
Write-Host "3. Testar geracao de skill"
```

### 2.3 Configuracao YAML

Criar arquivo `brain-config.yaml`:

```yaml
# .prompt-os/core/brain-config.yaml
version: "1.0"

kernel:
  llm:
    primary: "claude-sonnet-4-20250514"
    fallback: "gpt-4o-mini"
    temperature:
      generation: 0.7
      validation: 0.1
      classification: 0.0

  memory:
    working:
      type: "context_window"
      max_tokens: 16000
    episodic:
      type: "filesystem"
      path: "./MEMORY.md"
      retention_days: 90
    procedural:
      type: "filesystem"
      path: "./skills/"
      index_type: "keyword"

auto_generation:
  enabled: true
  domains:
    allowed:
      - "programming"
      - "devops"
      - "security"
      - "testing"
      - "api"
      - "database"
      - "frontend"
      - "backend"
  quality:
    min_examples: 2
    require_constraints: true

human_gate:
  default_level: "L2"
  escalation_triggers:
    - "skill_creation"
    - "persona_creation"
  auto_approve:
    - "read_only"
    - "formatting"
```

---

## 3. CLI brain.js

### 3.1 Codigo Completo

Salvar como `.prompt-os/scripts/brain.js`:

```javascript
#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS BRAIN - CLI Principal v1.0.0
 * 
 * Uso:
 *   node brain.js generate skill "descricao da skill"
 *   node brain.js generate persona "descricao da persona"
 *   node brain.js list skills
 *   node brain.js search "termo"
 */

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// CONFIGURACAO
const CONFIG = {
  BASE_DIR: process.cwd(),
  get SKILLS_DIR() { return path.join(this.BASE_DIR, 'skills'); },
  get PERSONAS_DIR() { return path.join(this.BASE_DIR, 'personas'); },
  get MEMORY_FILE() { return path.join(this.BASE_DIR, 'MEMORY.md'); },
};

// UTILITARIOS
const log = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  success: (msg) => console.log(`[OK] ${msg}`),
  warn: (msg) => console.log(`[WARN] ${msg}`),
  error: (msg) => console.log(`[ERROR] ${msg}`),
  step: (n, msg) => console.log(`\n[${n}] ${msg}`),
};

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function today() {
  return new Date().toISOString().split('T')[0];
}

// CLASSIFICADOR
function classifyInput(input) {
  const domainKeywords = {
    graphql: ['graphql', 'apollo', 'schema', 'resolver', 'mutation'],
    react: ['react', 'hook', 'component', 'jsx', 'tsx', 'redux', 'nextjs'],
    nodejs: ['node', 'express', 'fastify', 'npm', 'backend', 'server'],
    devops: ['docker', 'kubernetes', 'k8s', 'ci/cd', 'terraform', 'ansible'],
    security: ['auth', 'jwt', 'oauth', 'security', 'encryption', 'owasp'],
    database: ['sql', 'postgres', 'mysql', 'mongodb', 'redis', 'orm', 'prisma'],
    testing: ['test', 'jest', 'pytest', 'cypress', 'coverage', 'tdd'],
    api: ['rest', 'api', 'endpoint', 'swagger', 'openapi', 'grpc'],
    frontend: ['css', 'html', 'tailwind', 'sass', 'webpack', 'vite'],
    python: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy'],
  };

  const lowerInput = input.toLowerCase();
  let detectedDomain = 'general';
  let maxMatches = 0;

  for (const [domain, keywords] of Object.entries(domainKeywords)) {
    const matches = keywords.filter(kw => lowerInput.includes(kw)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      detectedDomain = domain;
    }
  }

  // Detectar complexidade
  const complexIndicators = ['arquitetura', 'sistema completo', 'enterprise', 'avancado'];
  const simpleIndicators = ['basico', 'simples', 'introducao', 'hello', 'starter'];
  
  let complexity = 'medium';
  if (complexIndicators.some(i => lowerInput.includes(i))) complexity = 'complex';
  if (simpleIndicators.some(i => lowerInput.includes(i))) complexity = 'simple';

  return {
    description: input,
    domain: detectedDomain,
    complexity,
    triggers: [
      `trabalhar com ${detectedDomain}`,
      `criar ${detectedDomain}`,
      input.toLowerCase().substring(0, 60),
    ],
  };
}

// PESQUISA (Mock para MVP)
async function conductResearch(classification) {
  log.step(2, 'RESEARCH - Pesquisando fontes...');
  
  const domainPatterns = {
    graphql: {
      patterns: [
        'Usar DataLoader para evitar N+1 queries',
        'Implementar rate limiting por query complexity',
        'Separar schema em modulos por dominio',
      ],
      antipatterns: [
        'Expor todos os campos do banco diretamente',
        'Ignorar depth limiting em queries aninhadas',
      ],
      sources: [
        { url: 'https://graphql.org/learn/best-practices/', type: 'official_docs' },
      ],
    },
    react: {
      patterns: [
        'Usar React.memo para componentes puros',
        'Implementar custom hooks para logica reutilizavel',
      ],
      antipatterns: [
        'Mutar estado diretamente',
        'Usar indice como key em listas dinamicas',
      ],
      sources: [
        { url: 'https://react.dev/learn', type: 'official_docs' },
      ],
    },
    default: {
      patterns: [
        'Seguir principios SOLID',
        'Documentar funcoes publicas',
        'Escrever testes unitarios',
      ],
      antipatterns: [
        'Codigo duplicado',
        'Funcoes muito longas',
      ],
      sources: [
        { url: 'https://refactoring.guru/refactoring', type: 'best_practices' },
      ],
    },
  };

  const research = domainPatterns[classification.domain] || domainPatterns.default;
  log.info(`Fontes encontradas: ${research.sources.length}`);
  log.info(`Padroes identificados: ${research.patterns.length}`);

  return {
    summary: `Pesquisa sobre ${classification.domain} concluida.`,
    ...research,
  };
}

// GERACAO
function generateSkillContent(classification, research) {
  const name = toKebabCase(classification.description);
  const title = classification.description
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const content = `---
name: "${name}"
description: "Skill para ${classification.description}. Gerada pelo PromptOS Brain."
version: "1.0.0"
domain: "${classification.domain}"
level: "${classification.complexity === 'simple' ? 'L1' : 'L2'}"
tags:
  - "${classification.domain}"
  - "auto-generated"
triggers:
${classification.triggers.map(t => `  - "${t}"`).join('\n')}
dependencies: []
author: "promptos-brain"
created: "${today()}"
status: "pending"
sources:
${research.sources.map(s => `  - url: "${s.url}"\n    type: "${s.type}"`).join('\n')}
---

# ${title}

## Visao Geral

Esta skill fornece diretrizes e padroes para trabalhar com ${classification.domain}. 
Gerada automaticamente pelo PromptOS Brain.
Nivel de complexidade: ${classification.complexity}.

---

## Instrucoes

### Ao receber uma tarefa relacionada a ${classification.domain}:

1. **Analise** o contexto e requisitos especificos da tarefa
2. **Verifique** se ha codigo existente relacionado no projeto
3. **Aplique** os padroes documentados abaixo
4. **Valide** o resultado executando testes apropriados
5. **Documente** decisoes tecnicas relevantes

---

## Guidelines (SEMPRE)

${research.patterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## Constraints (NUNCA)

${research.antipatterns.map((a, i) => `${i + 1}. **NUNCA** ${a}`).join('\n')}

---

## Exemplos

### Exemplo 1: Caso Basico

**Cenario:** Implementacao padrao de ${classification.domain}

**Input:**
\`\`\`
// Requisicao do usuario
\`\`\`

**Output esperado:**
\`\`\`
// Codigo seguindo os padroes documentados
\`\`\`

### Exemplo 2: Tratamento de Erros

**Cenario:** Situacao onde erros podem ocorrer

**Input:**
\`\`\`
// Requisicao que pode resultar em erro
\`\`\`

**Output esperado:**
\`\`\`
try {
  // Operacao principal
} catch (error) {
  // Tratamento especifico
}
\`\`\`

---

## Referencias

${research.sources.map((s, i) => `${i + 1}. ${s.url} (${s.type})`).join('\n')}
`;

  return { 
    metadata: { name, domain: classification.domain }, 
    content, 
    fullText: content 
  };
}

// VALIDACAO
function validateDraft(draft) {
  log.step(4, 'VALIDATE - Validando draft...');
  
  const errors = [];
  const warnings = [];

  if (!draft.content.includes('## Exemplos')) errors.push('Secao de exemplos ausente');
  if (!draft.content.includes('## Constraints')) errors.push('Secao de constraints ausente');
  
  const exampleCount = (draft.content.match(/### Exemplo \d+/g) || []).length;
  if (exampleCount < 2) warnings.push(`Apenas ${exampleCount} exemplo(s) - recomendado: 2+`);

  if (errors.length === 0) {
    log.success('Draft valido!');
  } else {
    errors.forEach(e => log.error(e));
  }
  warnings.forEach(w => log.warn(w));

  return { valid: errors.length === 0, errors, warnings };
}

// HUMAN GATE
async function requestApproval(draft) {
  console.log('\n' + '='.repeat(70));
  console.log('HUMAN GATE - APROVACAO NECESSARIA');
  console.log('='.repeat(70));
  
  console.log('\nPREVIEW:\n');
  console.log('-'.repeat(50));
  
  const lines = draft.fullText.split('\n');
  console.log(lines.slice(0, 40).join('\n'));
  
  if (lines.length > 40) {
    console.log(`\n... [${lines.length - 40} linhas omitidas]`);
  }
  
  console.log('-'.repeat(50));
  
  console.log('\nOPCOES:');
  console.log('  approve  - Salvar como esta');
  console.log('  edit     - Salvar draft para edicao manual');
  console.log('  reject   - Rejeitar');
  console.log('  cancel   - Cancelar operacao');
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Sua decisao: ', (answer) => {
      rl.close();
      const parts = answer.trim().toLowerCase().split(' ');
      resolve({ action: parts[0], reason: parts.slice(1).join(' ') });
    });
  });
}

// COMMIT
async function commitSkill(draft) {
  log.step(6, 'COMMIT - Salvando skill...');
  
  const skillDir = path.join(CONFIG.SKILLS_DIR, draft.metadata.name);
  await fs.mkdir(skillDir, { recursive: true });
  
  const finalContent = draft.fullText.replace('status: "pending"', 'status: "approved"');
  const filePath = path.join(skillDir, 'SKILL.md');
  await fs.writeFile(filePath, finalContent, 'utf8');
  log.info(`Arquivo: ${filePath}`);
  
  // Atualizar INDEX.md
  const indexPath = path.join(CONFIG.SKILLS_DIR, 'INDEX.md');
  let indexContent = await fs.readFile(indexPath, 'utf8').catch(() => 
    '# Skills\n\n| Nome | Dominio | Status | Data | Autor |\n|------|---------|--------|------|-------|\n'
  );
  
  const newEntry = `| ${draft.metadata.name} | ${draft.metadata.domain} | approved | ${today()} | promptos-brain |`;
  if (!indexContent.includes(draft.metadata.name)) {
    indexContent = indexContent.trimEnd() + '\n' + newEntry + '\n';
    await fs.writeFile(indexPath, indexContent, 'utf8');
    log.info('INDEX.md atualizado');
  }
  
  return filePath;
}

// COMANDOS
async function generateCommand(type, description) {
  console.log('\n' + '='.repeat(70));
  console.log(`PROMPTOS BRAIN - Gerando ${type.toUpperCase()}`);
  console.log('='.repeat(70));
  console.log(`\nInput: "${description}"`);

  try {
    log.step(1, 'CLASSIFY - Analisando pedido...');
    const classification = classifyInput(description);
    log.info(`Dominio: ${classification.domain}`);
    log.info(`Complexidade: ${classification.complexity}`);
    
    const research = await conductResearch(classification);
    
    log.step(3, 'GENERATE - Gerando draft...');
    const draft = generateSkillContent(classification, research);
    log.info(`Nome: ${draft.metadata.name}`);
    
    validateDraft(draft);
    
    const approval = await requestApproval(draft);
    
    switch (approval.action) {
      case 'approve':
        const filePath = await commitSkill(draft);
        console.log('\n' + '='.repeat(70));
        console.log('SKILL CRIADA COM SUCESSO!');
        console.log('='.repeat(70));
        console.log(`Localizacao: ${filePath}`);
        break;
        
      case 'reject':
        console.log(`\nRejeitado. Motivo: ${approval.reason || 'Nao especificado'}`);
        break;
        
      case 'edit':
        const draftPath = path.join(CONFIG.SKILLS_DIR, `_draft_${draft.metadata.name}.md`);
        await fs.writeFile(draftPath, draft.fullText, 'utf8');
        console.log(`\nDraft salvo em: ${draftPath}`);
        break;
        
      default:
        console.log('\nOperacao cancelada.');
    }
    
  } catch (error) {
    log.error(`Erro: ${error.message}`);
    process.exit(1);
  }
}

async function listCommand(type) {
  const dir = type === 'skills' ? CONFIG.SKILLS_DIR : CONFIG.PERSONAS_DIR;
  
  console.log(`\nListando ${type}:\n`);
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const items = entries.filter(e => e.isDirectory() && !e.name.startsWith('_'));
    
    if (items.length === 0) {
      console.log('   (vazio)');
      return;
    }
    
    for (const item of items) {
      console.log(`   - ${item.name}`);
    }
    
    console.log(`\n   Total: ${items.length}`);
  } catch (error) {
    log.error(`Erro ao listar: ${error.message}`);
  }
}

async function searchCommand(term) {
  console.log(`\nBuscando "${term}"...\n`);
  
  const results = [];
  
  for (const [type, dir] of [['skill', CONFIG.SKILLS_DIR], ['persona', CONFIG.PERSONAS_DIR]]) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.includes(term.toLowerCase())) {
          results.push({ type, name: entry.name });
        }
      }
    } catch {}
  }
  
  if (results.length === 0) {
    console.log('   Nenhum resultado encontrado.');
    return;
  }
  
  for (const r of results) {
    console.log(`   [${r.type}] ${r.name}`);
  }
}

// MAIN
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Itzamna PromptOS Brain CLI v1.0.0

Uso:
  node brain.js generate skill "descricao"   Gera nova skill
  node brain.js generate persona "descricao" Gera nova persona
  node brain.js list skills                  Lista skills
  node brain.js list personas                Lista personas
  node brain.js search "termo"               Busca por termo

Exemplos:
  node brain.js generate skill "API GraphQL com Apollo Server"
  node brain.js generate skill "custom hooks React para forms"
  node brain.js list skills
  node brain.js search "react"
`);
    return;
  }
  
  const [command, subcommand, ...rest] = args;
  
  switch (command) {
    case 'generate':
      if (!subcommand || !rest.length) {
        log.error('Uso: node brain.js generate <skill|persona> "descricao"');
        return;
      }
      await generateCommand(subcommand, rest.join(' '));
      break;
      
    case 'list':
      await listCommand(subcommand || 'skills');
      break;
      
    case 'search':
      await searchCommand(subcommand || '');
      break;
      
    default:
      log.error(`Comando desconhecido: ${command}`);
  }
}

main().catch(console.error);
```

### 3.2 Uso do CLI

```bash
# Instalar como executavel (opcional)
chmod +x .prompt-os/scripts/brain.js

# Usar diretamente
node .prompt-os/scripts/brain.js generate skill "API GraphQL com Apollo"

# Ou criar alias
alias brain="node $(pwd)/.prompt-os/scripts/brain.js"
brain generate skill "Docker com multi-stage builds"
brain list skills
brain search "api"
```

---

## 4. Integracao Spec-Kit

### 4.1 Inicializacao

O Spec-Kit fornece templates e estrutura via comando:

```bash
speckit init --here --ai claude
```

Isso cria automaticamente:
```
.specify/
├── memory/
│   └── constitution.md      # Regras T0 do projeto
├── templates/
│   ├── spec.md              # Template de especificacao
│   ├── plan.md              # Template de plano tecnico
│   └── tasks.md             # Template de tasks
└── config.yaml
```

### 4.2 Quando Usar Spec-Kit

| Complexidade | Tempo Estimado | Workflow |
|--------------|----------------|----------|
| Simples | <3 dias | `brain generate` direto |
| Media | 3-5 dias | Spec-Kit recomendado |
| Complexa | >5 dias | Spec-Kit **obrigatorio** |

### 4.3 Sincronizacao Constitution

Script para sincronizar `constitution.md` com `architectural-rules.md`:

```powershell
# .prompt-os/scripts/sync-constitution.ps1

param(
    [ValidateSet("speckit-to-promptos", "promptos-to-speckit")]
    [string]$Direction = "speckit-to-promptos"
)

$SpecKitConstitution = ".specify/memory/constitution.md"
$ArchitecturalRules = ".context/standards/architectural-rules.md"

if ($Direction -eq "speckit-to-promptos") {
    if (Test-Path $SpecKitConstitution) {
        Copy-Item $SpecKitConstitution $ArchitecturalRules -Force
        Write-Host "Sincronizado: constitution.md -> architectural-rules.md"
    }
} else {
    if (Test-Path $ArchitecturalRules) {
        Copy-Item $ArchitecturalRules $SpecKitConstitution -Force
        Write-Host "Sincronizado: architectural-rules.md -> constitution.md"
    }
}
```

---

## 5. Workflows

### 5.1 Workflow: Primeira Skill

```markdown
## Passos para criar primeira skill

### Pre-requisitos
- [ ] Estrutura de diretorios criada
- [ ] brain.js copiado para .prompt-os/scripts/

### Execucao

1. Navegar para o diretorio do projeto
   cd {project-root}

2. Executar o gerador
   node .prompt-os/scripts/brain.js generate skill "validacao de formularios com Zod"

3. Revisar o output
   - Classificacao (dominio, complexidade)
   - Pesquisa (padroes, antipadroes)
   - Preview do draft

4. Aprovar
   approve

5. Verificar
   cat skills/validacao-de-formularios-com-zod/SKILL.md
   cat skills/INDEX.md

### Resultado
- SKILL.md criado em skills/{nome}/
- INDEX.md atualizado
```

### 5.2 Workflow: Geracao em Lote

```bash
#!/bin/bash
# batch-generate.sh

skills=(
  "validacao de schemas JSON"
  "gerenciamento de estado com Zustand"
  "chamadas HTTP com axios"
)

for skill in "${skills[@]}"; do
  echo "=========================================="
  echo "Gerando: $skill"
  echo "=========================================="
  
  echo "approve" | node .prompt-os/scripts/brain.js generate skill "$skill"
  
  sleep 2
done

echo "Batch completo!"
```

---

## 6. Troubleshooting

### Problema: "ENOENT: no such file or directory"

**Causa:** Estrutura de diretorios nao existe

**Solucao:**
```bash
# Executar setup
./setup-promptos-brain.sh

# Ou criar manualmente
mkdir -p skills personas
```

---

### Problema: "SyntaxError: Unexpected token"

**Causa:** Versao do Node.js antiga

**Solucao:**
```bash
# Verificar versao
node --version  # Precisa ser >= 18

# Atualizar via nvm
nvm install 20
nvm use 20
```

---

### Problema: Skill nao aparece no INDEX.md

**Causa:** Processo interrompido antes do commit

**Solucao:**
```bash
# Verificar se skill existe
ls skills/

# Se existir, adicionar manualmente
echo "| nome-da-skill | dominio | approved | $(date +%Y-%m-%d) | manual |" >> skills/INDEX.md
```

---

### Problema: Human Gate nao responde

**Causa:** stdin bloqueado ou pipe incorreto

**Solucao:**
```bash
# Executar em terminal interativo (nao em pipe)
node brain.js generate skill "teste"

# Para scripts automaticos, usar echo
echo "approve" | node brain.js generate skill "teste"
```

---

## 7. Checklist de Implementacao

### Fase 1: Setup (Dia 1)

- [ ] Executar script de setup (bash ou PowerShell)
- [ ] Criar brain-config.yaml
- [ ] Copiar brain.js para .prompt-os/scripts/
- [ ] Testar: `node brain.js` (deve mostrar help)

### Fase 2: Primeira Skill (Dia 2)

- [ ] Gerar skill de teste: `brain generate skill "hello world"`
- [ ] Verificar SKILL.md criado
- [ ] Verificar INDEX.md atualizado
- [ ] Verificar MEMORY.md atualizado

### Fase 3: Validacao (Dia 3)

- [ ] Gerar 3 skills diferentes
- [ ] Testar reject (rejeitar uma skill)
- [ ] Testar cancel (cancelar uma geracao)
- [ ] Verificar logs em MEMORY.md

### Fase 4: Integracao Spec-Kit (Dia 4-5)

- [ ] Executar `speckit init --here --ai claude`
- [ ] Criar script sync-constitution.ps1
- [ ] Testar sync bidirecional

### Fase 5: Producao (Dia 6+)

- [ ] Code review dos scripts
- [ ] Documentar uso para o time
- [ ] Monitorar primeiras geracoes reais

---

**Itzamna PromptOS v1.0.0 (Piloto)** | Guia de Implementacao | 2026
