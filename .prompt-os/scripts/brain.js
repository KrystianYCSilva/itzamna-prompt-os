#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS BRAIN - CLI Principal v1.1.0
 * 
 * Uso:
 *   node brain.js generate skill "descricao da skill" [--category frontend]
 *   node brain.js generate persona "descricao da persona"
 *   node brain.js list skills
 *   node brain.js search "termo"
 * 
 * Categorias disponiveis:
 *   frontend, backend, config, markup, devops, docs, testing
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
  CATEGORIES: ['frontend', 'backend', 'config', 'markup', 'devops', 'docs', 'testing'],
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
function classifyInput(input, explicitCategory = null) {
  const domainKeywords = {
    frontend: ['css', 'html', 'tailwind', 'sass', 'webpack', 'vite', 'react', 'vue', 'angular', 'jsx', 'tsx'],
    backend: ['graphql', 'apollo', 'resolver', 'nodejs', 'express', 'fastify', 'api', 'rest', 'grpc', 'server'],
    config: ['yaml', 'json', 'properties', 'env', 'configuration', 'settings', 'dotenv'],
    markup: ['xml', 'xslt', 'markdown', 'md', 'sgml', 'xhtml'],
    devops: ['docker', 'kubernetes', 'k8s', 'ci/cd', 'terraform', 'ansible', 'git', 'github', 'gitlab'],
    docs: ['documentation', 'technical writing', 'readme', 'docs', 'manual'],
    testing: ['test', 'jest', 'pytest', 'cypress', 'coverage', 'tdd', 'unit test'],
    database: ['sql', 'postgres', 'mysql', 'mongodb', 'redis', 'orm', 'prisma'],
    security: ['auth', 'jwt', 'oauth', 'security', 'encryption', 'owasp'],
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

  // Map non-category domains to appropriate categories
  const domainToCategoryMap = {
    database: 'backend',
    security: 'backend',
    python: 'backend',
    react: 'frontend',
    nodejs: 'backend',
    api: 'backend',
    general: 'docs',
  };

  // Use explicit category if provided, otherwise derive from domain
  let category = explicitCategory;
  if (!category) {
    if (CONFIG.CATEGORIES.includes(detectedDomain)) {
      category = detectedDomain;
    } else {
      category = domainToCategoryMap[detectedDomain] || 'docs';
    }
  }

  // Detectar complexidade
  const complexIndicators = ['arquitetura', 'sistema completo', 'enterprise', 'avancado', 'advanced'];
  const simpleIndicators = ['basico', 'simples', 'introducao', 'hello', 'starter', 'basic'];
  
  let complexity = 'medium';
  if (complexIndicators.some(i => lowerInput.includes(i))) complexity = 'complex';
  if (simpleIndicators.some(i => lowerInput.includes(i))) complexity = 'simple';

  return {
    description: input,
    domain: detectedDomain,
    category,
    complexity,
    triggers: [
      `trabalhar com ${detectedDomain}`,
      `criar ${detectedDomain}`,
      input.toLowerCase().substring(0, 60),
    ],
  };
}

// PESQUISA - Retorna placeholders para preenchimento manual
async function conductResearch(classification) {
  log.step(2, 'RESEARCH - Preparando template com placeholders...');
  
  // Template com placeholders - usuario deve preencher manualmente
  const research = {
    patterns: [
      `[GUIDELINE_1: Descreva a primeira boa pratica para ${classification.description}]`,
      `[GUIDELINE_2: Descreva a segunda boa pratica para ${classification.description}]`,
      `[GUIDELINE_3: Descreva a terceira boa pratica para ${classification.description}]`,
    ],
    antipatterns: [
      `[CONSTRAINT_1: Descreva o que NUNCA fazer com ${classification.description}]`,
      `[CONSTRAINT_2: Descreva outro antipattern para ${classification.description}]`,
    ],
    sources: [
      { url: '[URL_DOCUMENTACAO_OFICIAL]', type: 'official_docs' },
      { url: '[URL_TUTORIAL_OU_ARTIGO]', type: 'tutorial' },
    ],
  };

  log.info(`Template com ${research.patterns.length} guidelines para preencher`);
  log.info(`Template com ${research.antipatterns.length} constraints para preencher`);

  return {
    summary: `Template preparado para ${classification.description}.`,
    ...research,
  };
}

// GERACAO - Template com [PLACEHOLDERS] para preenchimento manual
function generateSkillContent(classification, research) {
  const name = toKebabCase(classification.description);
  const title = classification.description
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const content = `---
name: "${name}"
description: "[DESCRICAO: Resumo de 1-2 linhas sobre o que esta skill ensina]"
version: "1.0.0"
domain: "${classification.domain}"
level: "${classification.complexity === 'simple' ? 'L1' : 'L2'}"
tags:
  - "${classification.domain}"
  - "[TAG_ADICIONAL_1]"
  - "[TAG_ADICIONAL_2]"
triggers:
  - "${classification.description.toLowerCase()}"
  - "[TRIGGER_2: Quando ativar esta skill]"
  - "[TRIGGER_3: Outro contexto de ativacao]"
dependencies: []
author: "promptos-brain"
created: "${today()}"
status: "draft"
sources:
${research.sources.map(s => `  - url: "${s.url}"\n    type: "${s.type}"`).join('\n')}
---

# ${title}

## Visao Geral

[VISAO_GERAL: Descreva em 2-3 paragrafos o proposito desta skill, quando ela deve ser usada, e qual problema ela resolve. Seja especifico sobre ${classification.description}.]

**Contexto de Uso:**
- [CONTEXTO_1: Quando usar esta skill]
- [CONTEXTO_2: Cenario tipico de aplicacao]
- [CONTEXTO_3: Tipo de projeto ou tarefa]

---

## Instrucoes

### Ao receber uma tarefa relacionada a ${classification.description}:

1. **Analise** o contexto e requisitos especificos
2. **Verifique** [O_QUE_VERIFICAR_ANTES_DE_COMECAR]
3. **Aplique** os padroes documentados nas Guidelines abaixo
4. **Valide** [COMO_VALIDAR_O_RESULTADO]
5. **Documente** [O_QUE_DOCUMENTAR_APOS_CONCLUSAO]

---

## Guidelines (SEMPRE)

${research.patterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}

---

## Constraints (NUNCA)

${research.antipatterns.map((a, i) => `${i + 1}. **NUNCA** ${a}`).join('\n')}

---

## Exemplos

### Exemplo 1: [TITULO_EXEMPLO_1]

**Cenario:** [DESCREVA_O_CENARIO_DE_USO]

**Input:**
\`\`\`[LINGUAGEM]
[CODIGO_OU_REQUISICAO_DE_ENTRADA]
\`\`\`

**Output esperado:**
\`\`\`[LINGUAGEM]
[CODIGO_OU_RESULTADO_ESPERADO]
\`\`\`

**Explicacao:** [EXPLIQUE_POR_QUE_ESTE_OUTPUT_SEGUE_AS_GUIDELINES]

---

### Exemplo 2: [TITULO_EXEMPLO_2]

**Cenario:** [DESCREVA_OUTRO_CENARIO_DE_USO]

**Input:**
\`\`\`[LINGUAGEM]
[CODIGO_OU_REQUISICAO_DE_ENTRADA_2]
\`\`\`

**Output esperado:**
\`\`\`[LINGUAGEM]
[CODIGO_OU_RESULTADO_ESPERADO_2]
\`\`\`

**Explicacao:** [EXPLIQUE_POR_QUE_ESTE_OUTPUT_SEGUE_AS_GUIDELINES]

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| [EDGE_CASE_1] | [COMO_RESOLVER_1] |
| [EDGE_CASE_2] | [COMO_RESOLVER_2] |
| [EDGE_CASE_3] | [COMO_RESOLVER_3] |

---

## Referencias

${research.sources.map((s, i) => `${i + 1}. ${s.url} (${s.type})`).join('\n')}

---

## Notas de Implementacao

> **IMPORTANTE:** Este arquivo foi gerado como template pelo PromptOS Brain.
> Todos os campos marcados com [PLACEHOLDER] devem ser preenchidos manualmente.
> Apos preencher, altere o status de "draft" para "approved" no frontmatter.
`;

  return { 
    metadata: { name, domain: classification.domain, category: classification.category }, 
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

  // Contar placeholders nao preenchidos
  const placeholderCount = (draft.content.match(/\[[A-Z_]+[^\]]*\]/g) || []).length;
  if (placeholderCount > 0) {
    warnings.push(`${placeholderCount} placeholder(s) para preencher manualmente`);
  }

  if (errors.length === 0) {
    log.success('Draft valido!');
  } else {
    errors.forEach(e => log.error(e));
  }
  warnings.forEach(w => log.warn(w));

  return { valid: errors.length === 0, errors, warnings, placeholderCount };
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
  
  // Skills are now organized by category
  const categoryDir = path.join(CONFIG.SKILLS_DIR, draft.metadata.category);
  const skillDir = path.join(categoryDir, draft.metadata.name);
  
  await fs.mkdir(skillDir, { recursive: true });
  
  // Manter status como "draft" - usuario deve mudar para "approved" apos preencher placeholders
  const filePath = path.join(skillDir, 'SKILL.md');
  await fs.writeFile(filePath, draft.fullText, 'utf8');
  log.info(`Arquivo: ${filePath}`);
  log.info(`Categoria: ${draft.metadata.category}`);
  log.warn('Status: draft - preencha os [PLACEHOLDERS] e altere para "approved"');
  
  // Nao atualizar INDEX.md automaticamente - esta organizado por categoria
  log.info('Lembre-se de atualizar skills/INDEX.md manualmente ou executar brain.js index');
  
  return filePath;
}

// COMANDOS
async function generateCommand(type, description, options = {}) {
  console.log('\n' + '='.repeat(70));
  console.log(`PROMPTOS BRAIN - Gerando ${type.toUpperCase()}`);
  console.log('='.repeat(70));
  console.log(`\nInput: "${description}"`);
  if (options.category) {
    console.log(`Categoria: ${options.category}`);
  }

  try {
    log.step(1, 'CLASSIFY - Analisando pedido...');
    const classification = classifyInput(description, options.category);
    log.info(`Dominio: ${classification.domain}`);
    log.info(`Categoria: ${classification.category}`);
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
    const categories = entries.filter(e => e.isDirectory() && !e.name.startsWith('_'));
    
    if (categories.length === 0) {
      console.log('   (vazio)');
      return;
    }
    
    let totalCount = 0;
    
    for (const category of categories) {
      // Check if this is a category directory (contains subdirectories with SKILL.md)
      const categoryPath = path.join(dir, category.name);
      const categoryEntries = await fs.readdir(categoryPath, { withFileTypes: true }).catch(() => []);
      const skills = categoryEntries.filter(e => e.isDirectory());
      
      if (skills.length > 0) {
        console.log(`   [${category.name}]`);
        for (const skill of skills) {
          console.log(`      - ${skill.name}`);
          totalCount++;
        }
      } else {
        // It's a skill in old flat structure or empty category
        const hasSkillFile = await fs.access(path.join(categoryPath, 'SKILL.md')).then(() => true).catch(() => false);
        if (hasSkillFile) {
          console.log(`   - ${category.name}`);
          totalCount++;
        }
      }
    }
    
    console.log(`\n   Total: ${totalCount} ${type}`);
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
Itzamna PromptOS Brain CLI v1.1.0

Uso:
  node brain.js generate skill "descricao" [--category CAT]   Gera nova skill
  node brain.js generate persona "descricao"                  Gera nova persona
  node brain.js list skills                                   Lista skills
  node brain.js list personas                                 Lista personas
  node brain.js search "termo"                                Busca por termo

Categorias disponiveis:
  frontend, backend, config, markup, devops, docs, testing

Exemplos:
  node brain.js generate skill "API GraphQL com Apollo Server" --category backend
  node brain.js generate skill "CSS Flexbox layouts" --category frontend
  node brain.js list skills
  node brain.js search "react"
`);
    return;
  }
  
  const [command, subcommand, ...rest] = args;
  
  // Parse options like --category
  const options = {};
  const descriptionParts = [];
  
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--category' && rest[i + 1]) {
      const cat = rest[i + 1].toLowerCase();
      if (CONFIG.CATEGORIES.includes(cat)) {
        options.category = cat;
      } else {
        log.warn(`Categoria "${cat}" invalida. Disponiveis: ${CONFIG.CATEGORIES.join(', ')}`);
      }
      i++; // Skip next arg
    } else if (!rest[i].startsWith('--')) {
      descriptionParts.push(rest[i]);
    }
  }
  
  const description = descriptionParts.join(' ');
  
  switch (command) {
    case 'generate':
      if (!subcommand || !description) {
        log.error('Uso: node brain.js generate <skill|persona> "descricao" [--category CAT]');
        return;
      }
      await generateCommand(subcommand, description, options);
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
