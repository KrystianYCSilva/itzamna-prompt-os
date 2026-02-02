# PROMPTOS BRAIN - IMPLEMENTAÇÃO PRÁTICA
## Guia de Implementação Step-by-Step para Agentes Simples

**Documento Complementar ao:** PROMPTOS-BRAIN-BLUEPRINT-V1.md  
**Objetivo:** Passos detalhados que qualquer agente (Gemini Flash, GPT-mini, Haiku) pode executar

---

## 📋 SUMÁRIO

1. [Setup Inicial](#1-setup-inicial)
2. [Scripts Completos](#2-scripts-completos)
3. [Integração Spec-Kit](#3-integração-spec-kit)
4. [Comandos do Brain](#4-comandos-do-brain)
5. [Workflows Detalhados](#5-workflows-detalhados)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. SETUP INICIAL

### 1.1 Comando Único de Setup

Execute este script para criar toda a estrutura:

```bash
#!/bin/bash
# setup-promptos-brain.sh
# Execute: chmod +x setup-promptos-brain.sh && ./setup-promptos-brain.sh

set -e  # Para em caso de erro

echo "🧠 Criando estrutura do PromptOS Brain..."

# Diretório base
BASE_DIR="${HOME}/src/prompt-os"

# Criar estrutura de diretórios
mkdir -p "${BASE_DIR}"/{core,memory/{working,episodic/2026,semantic/knowledge,procedural},skills/{academic,technical,generated},personas/{composable,generated},prompts/{meta,generated},templates,scripts,logs}

# Criar arquivos de índice
cat > "${BASE_DIR}/skills/generated/INDEX.md" << 'EOF'
# Skills Geradas pelo PromptOS Brain

| Nome | Domínio | Status | Data | Autor |
|------|---------|--------|------|-------|
EOF

cat > "${BASE_DIR}/personas/generated/INDEX.md" << 'EOF'
# Personas Geradas pelo PromptOS Brain

| Nome | Tipo | Status | Data | Autor |
|------|------|--------|------|-------|
EOF

cat > "${BASE_DIR}/prompts/generated/INDEX.md" << 'EOF'
# Prompts Gerados pelo PromptOS Brain

| Nome | Categoria | Status | Data | Autor |
|------|-----------|--------|------|-------|
EOF

# Criar MEMORY.md inicial
cat > "${BASE_DIR}/MEMORY.md" << 'EOF'
# MEMORY.md - Estado Persistente do PromptOS Brain

**Última Atualização:** $(date -Iseconds)
**Versão:** 1.0.0
**Sessões Totais:** 0

---

## 📊 ESTATÍSTICAS

| Métrica | Valor |
|---------|-------|
| Skills Geradas | 0 |
| Personas Geradas | 0 |
| Prompts Gerados | 0 |
| Taxa de Aprovação | N/A |
| Última Geração | N/A |

---

## 🧠 MEMÓRIA EPISÓDICA RECENTE

(Vazio - nenhuma interação registrada)

---

## 📝 NOTAS DA ÚLTIMA SESSÃO

Sistema inicializado. Pronto para uso.

---

## ⚠️ PENDÊNCIAS

- [ ] Configurar brain-config.yaml
- [ ] Criar primeira skill de teste
EOF

echo "✅ Estrutura criada em ${BASE_DIR}"
echo ""
echo "Próximos passos:"
echo "1. cd ${BASE_DIR}"
echo "2. Criar templates (próximo script)"
echo "3. Criar scripts de geração"
```

### 1.2 Criar Templates

```bash
#!/bin/bash
# create-templates.sh

BASE_DIR="${HOME}/src/prompt-os"

# Template de Skill
cat > "${BASE_DIR}/templates/SKILL-TEMPLATE.md" << 'SKILL_EOF'
---
name: "{{name}}"
description: "{{description}}"
version: "1.0.0"
domain: "{{domain}}"
level: "{{level}}"
tags:
{{#tags}}
  - "{{.}}"
{{/tags}}
triggers:
{{#triggers}}
  - "{{.}}"
{{/triggers}}
dependencies: []
author: "promptos-brain"
created: "{{created}}"
updated: "{{updated}}"
status: "{{status}}"
sources:
{{#sources}}
  - url: "{{url}}"
    type: "{{type}}"
{{/sources}}
---

# {{title}}

## 📋 Visão Geral

{{overview}}

---

## 🎯 Instruções

{{instructions}}

---

## ✅ Guidelines (SEMPRE)

{{#guidelines}}
{{index}}. {{text}}
{{/guidelines}}

## ❌ Constraints (NUNCA)

{{#constraints}}
{{index}}. **NUNCA** {{text}}
{{/constraints}}

---

## 📚 Exemplos

{{#examples}}
### Exemplo {{index}}: {{title}}

**Input:**
```{{language}}
{{input}}
```

**Output esperado:**
```{{language}}
{{output}}
```

**Explicação:** {{explanation}}

{{/examples}}

---

## 📖 Referências

{{#references}}
{{index}}. {{title}} - {{url}}
{{/references}}
SKILL_EOF

# Template de Persona
cat > "${BASE_DIR}/templates/PERSONA-TEMPLATE.md" << 'PERSONA_EOF'
---
name: "{{name}}"
type: "persona"
description: "{{description}}"
version: "1.0.0"
expertise:
{{#expertise}}
  - "{{.}}"
{{/expertise}}
communication_style: "{{communication_style}}"
inherits: []
skills:
{{#skills}}
  - "{{.}}"
{{/skills}}
author: "promptos-brain"
created: "{{created}}"
status: "{{status}}"
---

# {{title}}

## 🎭 Identidade

- **Role:** {{role}}
- **Especialidades:** {{specialties}}
- **Estilo:** {{style}}
- **Mindset:** {{mindset}}

---

## 💡 Comportamentos Core

{{#behaviors}}
{{index}}. **{{title}}**
   - {{description}}

{{/behaviors}}

---

## 🗣️ Padrões de Interação

| Situação | Comportamento |
|----------|---------------|
{{#interactions}}
| {{situation}} | {{behavior}} |
{{/interactions}}

---

## ⚠️ Constraints

{{#constraints}}
{{index}}. {{text}}
{{/constraints}}

---

## 🔧 Skills Carregadas

```yaml
skills:
{{#loaded_skills}}
  - {{.}}
{{/loaded_skills}}
```
PERSONA_EOF

# Template de Prompt (Meta)
cat > "${BASE_DIR}/templates/PROMPT-TEMPLATE.md" << 'PROMPT_EOF'
---
name: "{{name}}"
type: "prompt"
description: "{{description}}"
version: "1.0.0"
category: "{{category}}"
target_models:
  - "claude"
  - "gpt"
  - "gemini"
input_schema:
  required:
{{#required_inputs}}
    - "{{.}}"
{{/required_inputs}}
  optional:
{{#optional_inputs}}
    - "{{.}}"
{{/optional_inputs}}
output_format: "{{output_format}}"
author: "promptos-brain"
created: "{{created}}"
status: "{{status}}"
---

# {{title}}

## 🎯 Objetivo

{{objective}}

---

## 📥 Input Esperado

```yaml
{{input_schema_yaml}}
```

---

## 📤 Output Esperado

```{{output_format}}
{{output_example}}
```

---

## 📝 Template do Prompt

```xml
{{prompt_template}}
```

---

## 💡 Exemplos

{{#examples}}
### Exemplo {{index}}

**Input:**
```yaml
{{input}}
```

**Output:**
```{{format}}
{{output}}
```
{{/examples}}
PROMPT_EOF

echo "✅ Templates criados em ${BASE_DIR}/templates/"
```

### 1.3 Criar Configuração

```yaml
# Salvar como: ~/src/prompt-os/core/brain-config.yaml

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
      path: "./memory/episodic/"
      retention_days: 90
    semantic:
      type: "filesystem"
      path: "./memory/semantic/"
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
  types:
    skill:
      enabled: true
      template: "./templates/SKILL-TEMPLATE.md"
      output_dir: "./skills/generated/"
    persona:
      enabled: true
      template: "./templates/PERSONA-TEMPLATE.md"
      output_dir: "./personas/generated/"
    prompt:
      enabled: true
      template: "./templates/PROMPT-TEMPLATE.md"
      output_dir: "./prompts/generated/"
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
  timeouts:
    approval_wait_hours: 24

spec_kit:
  enabled: true
  thresholds:
    use_speckit_if:
      - "complexity >= complex"
      - "estimated_days >= 5"
```

---

## 2. SCRIPTS COMPLETOS

### 2.1 Script Principal: brain.js

```javascript
#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════
 * PROMPTOS BRAIN - CLI Principal
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Uso:
 *   node brain.js generate skill "descrição da skill"
 *   node brain.js generate persona "descrição da persona"
 *   node brain.js list skills
 *   node brain.js search "termo"
 */

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════════════════════

const CONFIG = {
  BASE_DIR: process.env.PROMPTOS_DIR || path.join(process.env.HOME, 'src/prompt-os'),
  get SKILLS_DIR() { return path.join(this.BASE_DIR, 'skills/generated'); },
  get PERSONAS_DIR() { return path.join(this.BASE_DIR, 'personas/generated'); },
  get PROMPTS_DIR() { return path.join(this.BASE_DIR, 'prompts/generated'); },
  get MEMORY_FILE() { return path.join(this.BASE_DIR, 'MEMORY.md'); },
  get CONFIG_FILE() { return path.join(this.BASE_DIR, 'core/brain-config.yaml'); },
};

// ═══════════════════════════════════════════════════════════════════════
// UTILITÁRIOS
// ═══════════════════════════════════════════════════════════════════════

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warn: (msg) => console.log(`⚠️  ${msg}`),
  error: (msg) => console.log(`❌ ${msg}`),
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

// ═══════════════════════════════════════════════════════════════════════
// CLASSIFICADOR
// ═══════════════════════════════════════════════════════════════════════

function classifyInput(input) {
  const domainKeywords = {
    graphql: ['graphql', 'apollo', 'schema', 'resolver', 'mutation'],
    react: ['react', 'hook', 'component', 'jsx', 'tsx', 'redux', 'nextjs'],
    nodejs: ['node', 'express', 'fastify', 'npm', 'backend', 'server'],
    devops: ['docker', 'kubernetes', 'k8s', 'ci/cd', 'terraform', 'ansible', 'jenkins'],
    security: ['auth', 'jwt', 'oauth', 'security', 'encryption', 'xss', 'csrf', 'owasp'],
    database: ['sql', 'postgres', 'mysql', 'mongodb', 'redis', 'orm', 'prisma'],
    testing: ['test', 'jest', 'pytest', 'cypress', 'coverage', 'tdd', 'unittest'],
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
  const complexIndicators = ['arquitetura', 'sistema completo', 'enterprise', 'avançado', 'full'];
  const simpleIndicators = ['básico', 'simples', 'introdução', 'hello', 'starter'];
  
  let complexity = 'medium';
  if (complexIndicators.some(i => lowerInput.includes(i))) complexity = 'complex';
  if (simpleIndicators.some(i => lowerInput.includes(i))) complexity = 'simple';

  return {
    description: input,
    domain: detectedDomain,
    complexity,
    triggers: generateTriggers(input, detectedDomain),
  };
}

function generateTriggers(description, domain) {
  const keywords = description.split(/\s+/).filter(w => w.length > 3);
  const mainKeyword = keywords[0] || domain;
  
  return [
    `trabalhar com ${mainKeyword}`,
    `criar ${mainKeyword}`,
    `usar ${mainKeyword}`,
    description.toLowerCase().substring(0, 60),
  ];
}

// ═══════════════════════════════════════════════════════════════════════
// PESQUISA (Mock para MVP - substituir por web search real)
// ═══════════════════════════════════════════════════════════════════════

async function conductResearch(classification) {
  log.step(2, '🔎 RESEARCH - Pesquisando fontes...');
  
  // Simular delay de pesquisa
  await new Promise(r => setTimeout(r, 500));
  
  const domainPatterns = {
    graphql: {
      patterns: [
        'Usar DataLoader para evitar N+1 queries',
        'Implementar rate limiting por query complexity',
        'Separar schema em módulos por domínio',
      ],
      antipatterns: [
        'Expor todos os campos do banco diretamente',
        'Ignorar depth limiting em queries aninhadas',
        'Não implementar autenticação no context',
      ],
      sources: [
        { url: 'https://graphql.org/learn/best-practices/', type: 'official_docs' },
        { url: 'https://www.apollographql.com/docs/', type: 'official_docs' },
      ],
    },
    react: {
      patterns: [
        'Usar React.memo para componentes puros',
        'Implementar custom hooks para lógica reutilizável',
        'Separar componentes de apresentação e lógica',
      ],
      antipatterns: [
        'Mutar estado diretamente',
        'Usar índice como key em listas dinâmicas',
        'Fazer chamadas API dentro do render',
      ],
      sources: [
        { url: 'https://react.dev/learn', type: 'official_docs' },
        { url: 'https://react.dev/reference/react/hooks', type: 'official_docs' },
      ],
    },
    // ... adicionar mais domínios
    default: {
      patterns: [
        'Seguir princípios SOLID',
        'Documentar funções públicas',
        'Escrever testes unitários',
      ],
      antipatterns: [
        'Código duplicado',
        'Funções muito longas',
        'Acoplamento forte',
      ],
      sources: [
        { url: 'https://refactoring.guru/refactoring', type: 'best_practices' },
      ],
    },
  };

  const research = domainPatterns[classification.domain] || domainPatterns.default;
  
  log.info(`Fontes encontradas: ${research.sources.length}`);
  log.info(`Padrões identificados: ${research.patterns.length}`);

  return {
    summary: `Pesquisa sobre ${classification.domain} concluída.`,
    ...research,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// GERAÇÃO
// ═══════════════════════════════════════════════════════════════════════

function generateSkillContent(classification, research) {
  const name = toKebabCase(classification.description);
  const title = classification.description
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const metadata = {
    name,
    description: `Skill para ${classification.description}. Gerada automaticamente pelo PromptOS Brain com base em pesquisa de melhores práticas do domínio ${classification.domain}.`,
    version: '1.0.0',
    domain: classification.domain,
    level: classification.complexity === 'simple' ? 'L1' : 'L2',
    tags: [classification.domain, 'auto-generated', ...classification.triggers.slice(0, 2).map(t => t.split(' ')[0])],
    triggers: classification.triggers,
    author: 'promptos-brain',
    created: today(),
    updated: today(),
    status: 'pending',
    sources: research.sources,
  };

  const content = `---
name: "${metadata.name}"
description: "${metadata.description}"
version: "${metadata.version}"
domain: "${metadata.domain}"
level: "${metadata.level}"
tags:
${metadata.tags.map(t => `  - "${t}"`).join('\n')}
triggers:
${metadata.triggers.map(t => `  - "${t}"`).join('\n')}
dependencies: []
author: "${metadata.author}"
created: "${metadata.created}"
updated: "${metadata.updated}"
status: "${metadata.status}"
sources:
${metadata.sources.map(s => `  - url: "${s.url}"\n    type: "${s.type}"`).join('\n')}
---

# ${title}

## 📋 Visão Geral

Esta skill fornece diretrizes e padrões para trabalhar com ${classification.domain}. 
Gerada automaticamente pelo PromptOS Brain com base em pesquisa de melhores práticas.
Nível de complexidade: ${classification.complexity}.

---

## 🎯 Instruções

### Ao receber uma tarefa relacionada a ${classification.domain}:

1. **Analise** o contexto e requisitos específicos da tarefa
2. **Verifique** se há código existente relacionado no projeto
3. **Aplique** os padrões documentados abaixo
4. **Valide** o resultado executando testes ou verificações apropriadas
5. **Documente** decisões técnicas relevantes

---

## ✅ Guidelines (SEMPRE)

${research.patterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## ❌ Constraints (NUNCA)

${research.antipatterns.map((a, i) => `${i + 1}. **NUNCA** ${a}`).join('\n')}

---

## 📚 Exemplos

### Exemplo 1: Caso Básico

**Cenário:** Implementação padrão de ${classification.domain}

**Input:**
\`\`\`
// Requisição do usuário para implementar funcionalidade básica
\`\`\`

**Output esperado:**
\`\`\`
// Código seguindo os padrões documentados
// Com comentários explicativos
// E tratamento de erros apropriado
\`\`\`

**Explicação:** Este é o caso mais comum de uso. Note a aplicação dos padrões listados acima.

### Exemplo 2: Edge Case - Tratamento de Erros

**Cenário:** Situação onde erros podem ocorrer

**Input:**
\`\`\`
// Requisição que pode resultar em erro
\`\`\`

**Output esperado:**
\`\`\`
try {
  // Operação principal
} catch (error) {
  // Tratamento específico por tipo de erro
  // Logging apropriado
  // Mensagem amigável para o usuário
}
\`\`\`

**Explicação:** Sempre implementar tratamento de erros robusto, seguindo os constraints definidos.

---

## 🔗 Skills Relacionadas

- \`${classification.domain}-basics\` - Fundamentos básicos
- \`error-handling\` - Padrões de tratamento de erros
- \`testing-${classification.domain}\` - Testes específicos do domínio

---

## 📖 Referências

${research.sources.map((s, i) => `${i + 1}. ${s.url} (${s.type})`).join('\n')}

---

<!-- 
METADATA INTERNO (não carregar no contexto do LLM)
generation_id: ${Date.now()}
generation_timestamp: ${new Date().toISOString()}
research_sources_count: ${research.sources.length}
classification: ${JSON.stringify(classification)}
-->
`;

  return { metadata, content, fullText: content };
}

// ═══════════════════════════════════════════════════════════════════════
// VALIDAÇÃO
// ═══════════════════════════════════════════════════════════════════════

function validateDraft(draft) {
  log.step(4, '✅ VALIDATE - Validando draft...');
  
  const errors = [];
  const warnings = [];

  // Validar metadata
  if (!draft.metadata.name) errors.push('Nome é obrigatório');
  if (!draft.metadata.description) errors.push('Descrição é obrigatória');
  if (draft.metadata.description.length < 50) warnings.push('Descrição muito curta');
  
  // Validar conteúdo
  if (!draft.content.includes('## 📚 Exemplos')) errors.push('Seção de exemplos ausente');
  if (!draft.content.includes('## ❌ Constraints')) errors.push('Seção de constraints ausente');
  
  // Contar exemplos
  const exampleCount = (draft.content.match(/### Exemplo \d+/g) || []).length;
  if (exampleCount < 2) warnings.push(`Apenas ${exampleCount} exemplo(s) - recomendado: 2+`);

  if (errors.length > 0) {
    log.error('Erros de validação:');
    errors.forEach(e => console.log(`   - ${e}`));
  }
  
  if (warnings.length > 0) {
    log.warn('Avisos:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  if (errors.length === 0) {
    log.success('Draft válido!');
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ═══════════════════════════════════════════════════════════════════════
// HUMAN GATE
// ═══════════════════════════════════════════════════════════════════════

async function requestApproval(draft) {
  console.log('\n' + '═'.repeat(70));
  console.log('🔐 HUMAN GATE - APROVAÇÃO NECESSÁRIA');
  console.log('═'.repeat(70));
  
  console.log('\n📄 PREVIEW:\n');
  console.log('─'.repeat(50));
  
  // Mostrar primeiras linhas
  const lines = draft.fullText.split('\n');
  const preview = lines.slice(0, 50).join('\n');
  console.log(preview);
  
  if (lines.length > 50) {
    console.log(`\n... [${lines.length - 50} linhas omitidas]`);
  }
  
  console.log('─'.repeat(50));
  
  console.log('\n📋 OPÇÕES:');
  console.log('  approve  - Salvar como está');
  console.log('  edit     - Quero editar manualmente');
  console.log('  reject   - Rejeitar (informe motivo: reject motivo aqui)');
  console.log('  cancel   - Cancelar operação');
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('❓ Sua decisão: ', (answer) => {
      rl.close();
      
      const parts = answer.trim().toLowerCase().split(' ');
      const action = parts[0];
      const reason = parts.slice(1).join(' ');
      
      resolve({ action, reason });
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// COMMIT
// ═══════════════════════════════════════════════════════════════════════

async function commitSkill(draft) {
  log.step(6, '💾 COMMIT - Salvando skill...');
  
  // Criar diretório
  const skillDir = path.join(CONFIG.SKILLS_DIR, draft.metadata.name);
  await fs.mkdir(skillDir, { recursive: true });
  
  // Atualizar status
  const finalContent = draft.fullText.replace('status: "pending"', 'status: "approved"');
  
  // Salvar arquivo
  const filePath = path.join(skillDir, 'SKILL.md');
  await fs.writeFile(filePath, finalContent, 'utf8');
  log.info(`Arquivo: ${filePath}`);
  
  // Atualizar INDEX.md
  const indexPath = path.join(CONFIG.SKILLS_DIR, 'INDEX.md');
  let indexContent = await fs.readFile(indexPath, 'utf8').catch(() => 
    '# Skills Geradas\n\n| Nome | Domínio | Status | Data | Autor |\n|------|---------|--------|------|-------|\n'
  );
  
  const newEntry = `| ${draft.metadata.name} | ${draft.metadata.domain} | approved | ${today()} | promptos-brain |`;
  if (!indexContent.includes(draft.metadata.name)) {
    indexContent = indexContent.trimEnd() + '\n' + newEntry + '\n';
    await fs.writeFile(indexPath, indexContent, 'utf8');
    log.info('INDEX.md atualizado');
  }
  
  // Atualizar MEMORY.md
  await updateMemory('skill', draft.metadata.name, 'approved');
  log.info('MEMORY.md atualizado');
  
  return filePath;
}

async function updateMemory(type, name, status) {
  const memoryPath = CONFIG.MEMORY_FILE;
  let content = await fs.readFile(memoryPath, 'utf8').catch(() => '# MEMORY.md\n\n## Histórico\n\n');
  
  const timestamp = new Date().toISOString();
  const entry = `- [${timestamp}] ${type} \`${name}\` - ${status}`;
  
  // Inserir após "## MEMÓRIA EPISÓDICA RECENTE"
  content = content.replace(
    /## 🧠 MEMÓRIA EPISÓDICA RECENTE.*?\n\n/s,
    `## 🧠 MEMÓRIA EPISÓDICA RECENTE\n\n${entry}\n\n`
  );
  
  // Atualizar estatísticas
  const skillsMatch = content.match(/Skills Geradas \| (\d+)/);
  if (skillsMatch && type === 'skill') {
    const newCount = parseInt(skillsMatch[1]) + 1;
    content = content.replace(/Skills Geradas \| \d+/, `Skills Geradas | ${newCount}`);
  }
  
  // Atualizar última geração
  content = content.replace(/Última Geração \| .*?\|/, `Última Geração | ${timestamp} |`);
  
  await fs.writeFile(memoryPath, content, 'utf8');
}

// ═══════════════════════════════════════════════════════════════════════
// COMANDOS
// ═══════════════════════════════════════════════════════════════════════

async function generateCommand(type, description) {
  console.log('\n' + '═'.repeat(70));
  console.log(`🧠 PROMPTOS BRAIN - Gerando ${type.toUpperCase()}`);
  console.log('═'.repeat(70));
  console.log(`\n📥 Input: "${description}"`);

  try {
    // 1. CLASSIFY
    log.step(1, '🔍 CLASSIFY - Analisando pedido...');
    const classification = classifyInput(description);
    log.info(`Domínio: ${classification.domain}`);
    log.info(`Complexidade: ${classification.complexity}`);
    
    // 2. RESEARCH
    const research = await conductResearch(classification);
    
    // 3. GENERATE
    log.step(3, '📝 GENERATE - Gerando draft...');
    const draft = generateSkillContent(classification, research);
    log.info(`Nome: ${draft.metadata.name}`);
    log.info(`Tamanho: ${draft.fullText.length} caracteres`);
    
    // 4. VALIDATE
    const validation = validateDraft(draft);
    
    if (!validation.valid) {
      log.warn('Draft com erros, mas prosseguindo para revisão humana...');
    }
    
    // 5. HUMAN GATE
    const approval = await requestApproval(draft);
    
    switch (approval.action) {
      case 'approve':
        // 6. COMMIT
        const filePath = await commitSkill(draft);
        console.log('\n' + '═'.repeat(70));
        console.log('✅ SKILL CRIADA COM SUCESSO!');
        console.log('═'.repeat(70));
        console.log(`📁 Localização: ${filePath}`);
        console.log(`🏷️  Nome: ${draft.metadata.name}`);
        console.log(`📂 Domínio: ${draft.metadata.domain}`);
        break;
        
      case 'reject':
        console.log(`\n❌ Rejeitado. Motivo: ${approval.reason || 'Não especificado'}`);
        await updateMemory('skill', draft.metadata.name, `rejected: ${approval.reason}`);
        break;
        
      case 'edit':
        console.log('\n📝 Abrindo para edição...');
        // Em produção: abrir no editor padrão
        console.log('   (Funcionalidade de edição não implementada no MVP)');
        console.log('   Salvando draft para edição manual...');
        const draftPath = path.join(CONFIG.SKILLS_DIR, `_draft_${draft.metadata.name}.md`);
        await fs.writeFile(draftPath, draft.fullText, 'utf8');
        console.log(`   Draft salvo em: ${draftPath}`);
        break;
        
      case 'cancel':
      default:
        console.log('\n🚫 Operação cancelada.');
    }
    
  } catch (error) {
    log.error(`Erro: ${error.message}`);
    process.exit(1);
  }
}

async function listCommand(type) {
  const dirs = {
    skills: CONFIG.SKILLS_DIR,
    personas: CONFIG.PERSONAS_DIR,
    prompts: CONFIG.PROMPTS_DIR,
  };
  
  const dir = dirs[type];
  if (!dir) {
    log.error(`Tipo inválido: ${type}. Use: skills, personas, prompts`);
    return;
  }
  
  console.log(`\n📋 Listando ${type}:\n`);
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const items = entries.filter(e => e.isDirectory() && !e.name.startsWith('_'));
    
    if (items.length === 0) {
      console.log('   (vazio)');
      return;
    }
    
    for (const item of items) {
      console.log(`   • ${item.name}`);
    }
    
    console.log(`\n   Total: ${items.length}`);
  } catch (error) {
    log.error(`Erro ao listar: ${error.message}`);
  }
}

async function searchCommand(term) {
  console.log(`\n🔍 Buscando "${term}"...\n`);
  
  const searchInDir = async (dir, type) => {
    const results = [];
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.includes(term.toLowerCase())) {
          results.push({ type, name: entry.name });
        }
      }
    } catch {}
    return results;
  };
  
  const allResults = [
    ...await searchInDir(CONFIG.SKILLS_DIR, 'skill'),
    ...await searchInDir(CONFIG.PERSONAS_DIR, 'persona'),
    ...await searchInDir(CONFIG.PROMPTS_DIR, 'prompt'),
  ];
  
  if (allResults.length === 0) {
    console.log('   Nenhum resultado encontrado.');
    return;
  }
  
  console.log('   Resultados:\n');
  for (const r of allResults) {
    console.log(`   [${r.type}] ${r.name}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🧠 PromptOS Brain CLI

Uso:
  node brain.js generate skill "descrição"   Gera nova skill
  node brain.js generate persona "descrição" Gera nova persona
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
        log.error('Uso: node brain.js generate <skill|persona> "descrição"');
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

### 2.2 Como Usar

```bash
# 1. Salvar o script
cp brain.js ~/src/prompt-os/scripts/brain.js

# 2. Tornar executável
chmod +x ~/src/prompt-os/scripts/brain.js

# 3. Criar alias (opcional)
echo 'alias brain="node ~/src/prompt-os/scripts/brain.js"' >> ~/.bashrc
source ~/.bashrc

# 4. Usar
brain generate skill "API GraphQL com Apollo Server"
brain generate skill "custom hooks React para validação de forms"
brain generate skill "Docker containers com multi-stage builds"
brain list skills
brain search "react"
```

---

## 3. INTEGRAÇÃO SPEC-KIT

### 3.1 Arquivo de Integração

```markdown
# Salvar como: ~/src/prompt-os/core/spec-kit-bridge.md

# SPEC-KIT BRIDGE
## Integração PromptOS Brain ↔ GitHub Spec-Kit

### Quando o Brain Delega para Spec-Kit

O Brain automaticamente sugere Spec-Kit quando detecta:

| Indicador | Threshold | Ação |
|-----------|-----------|------|
| Complexidade | >= complex | Sugerir /speckit.specify |
| Tempo estimado | >= 5 dias | Sugerir /speckit.specify |
| Múltiplos stakeholders | >= 2 | Sugerir /speckit.specify |
| Documentação formal | required | Obrigatório /speckit.specify |

### Fluxo Híbrido

```
Usuário: "Preciso de um sistema completo de autenticação OAuth2"

Brain detecta:
- Complexidade: complex ✓
- Estimativa: ~10 dias ✓
- Múltiplas partes: auth server, client, tokens ✓

Brain responde:
"🧠 Detectei que esta é uma feature complexa. Recomendo usar Spec-Kit:

1. /speckit.specify - Criar especificação formal
2. /speckit.plan - Plano técnico detalhado
3. /speckit.tasks - Quebrar em tarefas
4. brain generate - Gerar skills necessárias

Posso iniciar com /speckit.specify ou prefere geração direta?"
```

### Mapeamento de Comandos

| Brain Command | Spec-Kit Equivalente | Quando Usar |
|---------------|---------------------|-------------|
| `brain generate skill "simples"` | N/A (direto) | < 3 dias, interno |
| `brain generate skill "complexo"` | `/speckit.specify` primeiro | >= 5 dias |
| `brain generate sistema` | `/speckit.*` completo | Projeto formal |

### Skills Geradas a partir de SPECs

Quando uma SPEC é criada, o Brain pode gerar skills automaticamente:

```yaml
# SPEC-001-oauth2/spec.md gera:
skills:
  - oauth2-server-setup
  - oauth2-client-integration
  - oauth2-token-management
  - oauth2-security-best-practices
```
```

### 3.2 Comando Híbrido

Adicionar ao brain.js:

```javascript
// Adicionar após a função classifyInput()

function shouldUseSpecKit(classification, description) {
  const complexityThreshold = classification.complexity === 'complex';
  const timeIndicators = ['sistema', 'completo', 'enterprise', 'full', 'plataforma'];
  const hasTimeIndicator = timeIndicators.some(i => description.toLowerCase().includes(i));
  const formalIndicators = ['cliente', 'formal', 'documentação', 'stakeholder'];
  const needsFormal = formalIndicators.some(i => description.toLowerCase().includes(i));
  
  return complexityThreshold || hasTimeIndicator || needsFormal;
}

// Modificar generateCommand() para verificar:
async function generateCommand(type, description) {
  // ... código existente ...
  
  // Após classificação, verificar Spec-Kit
  const classification = classifyInput(description);
  
  if (shouldUseSpecKit(classification, description)) {
    console.log('\n' + '═'.repeat(70));
    console.log('🎯 RECOMENDAÇÃO: Usar Spec-Kit');
    console.log('═'.repeat(70));
    console.log(`
Detectei que esta é uma feature complexa. Recomendo:

1. /speckit.specify - Criar especificação formal
2. /speckit.plan    - Plano técnico detalhado
3. /speckit.tasks   - Quebrar em tarefas
4. brain generate   - Gerar skills necessárias

Opções:
  [s] Usar Spec-Kit (recomendado)
  [d] Prosseguir com geração direta
  [c] Cancelar
`);
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const answer = await new Promise(resolve => {
      rl.question('Escolha: ', resolve);
    });
    rl.close();
    
    if (answer.toLowerCase() === 's') {
      console.log('\nExecute: /speckit.specify ' + description);
      return;
    } else if (answer.toLowerCase() === 'c') {
      console.log('\nCancelado.');
      return;
    }
    // Prosseguir com 'd'
  }
  
  // ... resto do código ...
}
```

---

## 4. COMANDOS DO BRAIN

### 4.1 Referência Rápida

```markdown
# REFERÊNCIA DE COMANDOS - PromptOS Brain

## Comandos CLI

### Geração
```bash
brain generate skill "descrição"     # Gera skill
brain generate persona "descrição"   # Gera persona
brain generate prompt "descrição"    # Gera prompt
```

### Listagem
```bash
brain list skills      # Lista skills geradas
brain list personas    # Lista personas geradas
brain list prompts     # Lista prompts gerados
brain list all         # Lista tudo
```

### Busca
```bash
brain search "termo"   # Busca em todos os tipos
brain search --type skill "termo"   # Busca apenas skills
```

### Utilitários
```bash
brain status           # Mostra status do sistema
brain stats            # Estatísticas de geração
brain cleanup          # Remove drafts não aprovados
```

## Flags Globais

```bash
--direct     # Força geração direta (ignora recomendação Spec-Kit)
--speckit    # Força uso de Spec-Kit
--auto       # Auto-aprova (para CI/CD, cuidado!)
--verbose    # Modo verbose
--dry-run    # Simula sem salvar
```

## Exemplos Completos

```bash
# Skill simples
brain generate skill "validação de email com regex"

# Skill complexa (vai sugerir Spec-Kit)
brain generate skill "sistema completo de pagamentos Stripe"

# Forçar geração direta
brain generate skill "sistema completo de pagamentos" --direct

# Dry run para ver o que seria gerado
brain generate skill "API REST com Express" --dry-run

# Buscar skills existentes
brain search "react"
brain search "auth"
```
```

---

## 5. WORKFLOWS DETALHADOS

### 5.1 Workflow: Criar Primeira Skill

```markdown
## WORKFLOW: Primeira Skill (Onboarding)

### Pré-requisitos
- [ ] Node.js 18+ instalado
- [ ] Estrutura de diretórios criada (setup-promptos-brain.sh)
- [ ] Scripts copiados para ~/src/prompt-os/scripts/

### Passos

**Step 1: Navegar para o diretório**
```bash
cd ~/src/prompt-os
```

**Step 2: Executar o gerador**
```bash
node scripts/brain.js generate skill "validação de formulários com Zod"
```

**Step 3: Revisar output**
O sistema vai mostrar:
- Classificação (domínio, complexidade)
- Resultado da pesquisa (padrões, antipadrões)
- Preview do draft

**Step 4: Aprovar**
Quando perguntado, digite:
```
approve
```

**Step 5: Verificar**
```bash
# Ver skill criada
cat skills/generated/validacao-de-formularios-com-zod/SKILL.md

# Ver índice atualizado
cat skills/generated/INDEX.md

# Ver memória
cat MEMORY.md
```

### Resultado Esperado
- Arquivo SKILL.md criado em skills/generated/{nome}/
- INDEX.md atualizado com nova entrada
- MEMORY.md com registro da criação
```

### 5.2 Workflow: Geração em Lote

```bash
#!/bin/bash
# batch-generate.sh
# Gera múltiplas skills em sequência com auto-aprovação

skills=(
  "validação de schemas JSON"
  "manipulação de datas com date-fns"
  "gerenciamento de estado com Zustand"
  "chamadas HTTP com axios"
  "cache com React Query"
)

for skill in "${skills[@]}"; do
  echo "═══════════════════════════════════════════════════"
  echo "Gerando: $skill"
  echo "═══════════════════════════════════════════════════"
  
  # Usar --auto para auto-aprovar (CUIDADO: apenas para ambientes de teste)
  echo "approve" | node scripts/brain.js generate skill "$skill"
  
  echo ""
  sleep 2  # Pausa entre gerações
done

echo "✅ Batch completo!"
echo "Skills geradas: ${#skills[@]}"
```

---

## 6. TROUBLESHOOTING

### 6.1 Problemas Comuns

```markdown
## TROUBLESHOOTING

### Problema: "ENOENT: no such file or directory"

**Causa:** Estrutura de diretórios não existe

**Solução:**
```bash
# Executar setup
./setup-promptos-brain.sh

# Ou criar manualmente
mkdir -p ~/src/prompt-os/skills/generated
```

---

### Problema: "SyntaxError: Unexpected token"

**Causa:** Versão do Node.js muito antiga

**Solução:**
```bash
# Verificar versão
node --version  # Precisa ser >= 18

# Atualizar (via nvm)
nvm install 20
nvm use 20
```

---

### Problema: Skill não aparece no INDEX.md

**Causa:** Processo interrompido antes do commit

**Solução:**
```bash
# Verificar se skill existe
ls skills/generated/

# Se existir, adicionar manualmente ao INDEX.md
echo "| nome-da-skill | dominio | approved | $(date +%Y-%m-%d) | manual |" >> skills/generated/INDEX.md
```

---

### Problema: MEMORY.md corrompido

**Causa:** Edição manual incorreta ou interrupção

**Solução:**
```bash
# Backup do atual
cp MEMORY.md MEMORY.md.bak

# Recriar
cat > MEMORY.md << 'EOF'
# MEMORY.md - Estado Persistente do PromptOS Brain

**Última Atualização:** $(date -Iseconds)
**Versão:** 1.0.0

## 📊 ESTATÍSTICAS

| Métrica | Valor |
|---------|-------|
| Skills Geradas | 0 |

## 🧠 MEMÓRIA EPISÓDICA RECENTE

(Vazio)
EOF
```

---

### Problema: Human Gate não responde

**Causa:** stdin bloqueado ou pipe incorreto

**Solução:**
```bash
# Executar em terminal interativo (não em pipe)
# Errado: echo "approve" | node brain.js ...
# Certo: node brain.js ... (e digitar manualmente)

# Para scripts, usar flag --auto se disponível
node brain.js generate skill "teste" --auto
```
```

---

## APÊNDICE: Checklist de Implementação

```markdown
## CHECKLIST COMPLETO

### Setup (Day 1)
- [ ] Executar setup-promptos-brain.sh
- [ ] Executar create-templates.sh
- [ ] Criar brain-config.yaml
- [ ] Copiar brain.js para scripts/
- [ ] Testar: `node scripts/brain.js` (deve mostrar help)

### Primeira Skill (Day 2)
- [ ] Gerar skill de teste: `brain generate skill "hello world"`
- [ ] Verificar SKILL.md criado
- [ ] Verificar INDEX.md atualizado
- [ ] Verificar MEMORY.md atualizado

### Validação (Day 3)
- [ ] Gerar 3 skills diferentes
- [ ] Testar reject (rejeitar uma skill)
- [ ] Testar cancel (cancelar uma geração)
- [ ] Verificar logs em MEMORY.md

### Integração (Day 4-5)
- [ ] Integrar com Spec-Kit (se disponível)
- [ ] Configurar notificações (se Slack disponível)
- [ ] Documentar uso para o time

### Produção (Day 6+)
- [ ] Code review dos scripts
- [ ] Backup inicial do sistema
- [ ] Treinamento de usuários
- [ ] Monitorar primeiras gerações reais
```

---

**FIM DO DOCUMENTO DE IMPLEMENTAÇÃO**

*Versão: 1.0.0 | Última atualização: 2026-02-02*
