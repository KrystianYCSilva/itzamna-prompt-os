#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS BRAIN - CLI Principal v1.5.0
 * 
 * Uso:
 *   node brain.js generate skill "descricao da skill" [--category frontend] [--mode fast|brain]
 *   node brain.js generate persona "descricao da persona"
 *   node brain.js list skills
 *   node brain.js search "termo"
 *   node brain.js validate <arquivo>        Valida skill contra T0/T1/T2
 *   node brain.js classify "mensagem"       Classifica input (workflow, persona, domain)
 *   node brain.js context [--skills s1,s2]  Mostra contexto JIT
 * 
 * Shortcuts:
 *   #new, #impl, #test, #review, #bug, #refactor, #deploy, #db, #security, #docs
 * 
 * Categorias disponiveis:
 *   frontend, backend, config, markup, devops, docs, testing
 */

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// Import new modules
const tierSystem = require('./tier-system');
const inputClassifier = require('./input-classifier');
const jitLoader = require('./jit-loader');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  VERSION: '1.5.0',
  BASE_DIR: process.cwd(),
  get SKILLS_DIR() { return path.join(this.BASE_DIR, 'skills'); },
  get PERSONAS_DIR() { return path.join(this.BASE_DIR, 'personas'); },
  get MEMORY_FILE() { return path.join(this.BASE_DIR, 'MEMORY.md'); },
  CATEGORIES: ['frontend', 'backend', 'config', 'markup', 'devops', 'docs', 'testing'],
  MODES: ['fast', 'brain'],
  DEFAULT_MODE: 'fast',
};

// ============================================================================
// LOGGING
// ============================================================================

const log = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  success: (msg) => console.log(`[OK] ${msg}`),
  warn: (msg) => console.log(`[WARN] ${msg}`),
  error: (msg) => console.log(`[ERROR] ${msg}`),
  step: (n, msg) => console.log(`\n[${n}] ${msg}`),
  tier: (tier, msg) => {
    const icon = tier === 'T0' ? '[CRITICAL]' : tier === 'T1' ? '[WARN]' : '[INFO]';
    console.log(`${icon} ${msg}`);
  }
};

// ============================================================================
// UTILITIES
// ============================================================================

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

// ============================================================================
// ENHANCED CLASSIFIER (using input-classifier.js)
// ============================================================================

function classifyInput(input, explicitCategory = null) {
  // Use the new input-classifier module for workflow/domain detection
  const classification = inputClassifier.classify(input);
  
  // Map to brain.js format
  const category = explicitCategory || classification.domain.category || 'docs';
  
  return {
    description: input,
    domain: classification.domain.id,
    category: CONFIG.CATEGORIES.includes(category) ? category : 'docs',
    complexity: classification.complexity.level,
    workflow: classification.workflow,
    persona: classification.persona,
    suggestedSkills: classification.suggestedSkills,
    triggers: classification.triggers,
  };
}

// ============================================================================
// RESEARCH (Mode-dependent)
// ============================================================================

async function conductResearch(classification, mode = 'fast') {
  log.step(2, `RESEARCH - Modo: ${mode.toUpperCase()}`);
  
  if (mode === 'brain') {
    // Brain mode: Would use real web research (SPEC-003)
    // For now, still returns placeholders but with better structure
    log.info('Modo Brain: Preparando para pesquisa real (requer SPEC-003)');
    log.warn('Fallback para modo Fast - pesquisa real nao disponivel');
  }
  
  // Fast mode: Template with placeholders
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
    mode,
    ...research,
  };
}

// ============================================================================
// GENERATION
// ============================================================================

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

// ============================================================================
// VALIDATION (using tier-system.js)
// ============================================================================

function validateDraft(draft) {
  log.step(4, 'VALIDATE - Validando draft com Tier System...');
  
  // Use the new tier-system module
  const tierResults = tierSystem.validateAllTiers(draft.content);
  
  const errors = [];
  const warnings = [];

  // T0 violations are errors
  for (const rule of tierResults.tiers.T0.rules) {
    if (!rule.passed) {
      errors.push(`[T0] ${rule.id}: ${rule.message}`);
    }
  }

  // T1 violations are warnings
  for (const rule of tierResults.tiers.T1.rules) {
    if (!rule.passed) {
      warnings.push(`[T1] ${rule.id}: ${rule.message}`);
    }
  }

  // T2 violations are info
  for (const rule of tierResults.tiers.T2.rules) {
    if (!rule.passed) {
      log.info(`[T2] ${rule.id}: ${rule.message}`);
    }
  }

  // Legacy checks for placeholders
  const placeholderCount = (draft.content.match(/\[[A-Z_]+[^\]]*\]/g) || []).length;
  if (placeholderCount > 0) {
    warnings.push(`${placeholderCount} placeholder(s) para preencher manualmente`);
  }

  // Display results
  console.log('');
  console.log(`Score: ${tierResults.summary.score}/100`);
  console.log(`Can Approve: ${tierResults.summary.canApprove ? 'YES' : 'NO (T0 violations)'}`);
  console.log('');

  if (errors.length === 0) {
    log.success('Nenhuma violacao T0!');
  } else {
    errors.forEach(e => log.error(e));
  }
  warnings.forEach(w => log.warn(w));

  return { 
    valid: errors.length === 0, 
    errors, 
    warnings, 
    placeholderCount,
    tierResults 
  };
}

// ============================================================================
// HUMAN GATE
// ============================================================================

async function requestApproval(draft, tierResults = null) {
  console.log('\n' + '='.repeat(70));
  console.log('HUMAN GATE - APROVACAO NECESSARIA');
  console.log('='.repeat(70));
  
  // Show tier score if available
  if (tierResults) {
    console.log(`\nTier Score: ${tierResults.summary.score}/100`);
    console.log(`T0: ${tierResults.summary.t0Passed}/${tierResults.summary.t0Passed + tierResults.summary.t0Failed} passed`);
    console.log(`T1: ${tierResults.summary.t1Passed}/${tierResults.summary.t1Passed + tierResults.summary.t1Failed} passed`);
    console.log(`T2: ${tierResults.summary.t2Passed}/${tierResults.summary.t2Passed + tierResults.summary.t2Failed} passed`);
  }
  
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

// ============================================================================
// COMMIT
// ============================================================================

async function commitSkill(draft) {
  log.step(6, 'COMMIT - Salvando skill...');
  
  const categoryDir = path.join(CONFIG.SKILLS_DIR, draft.metadata.category);
  const skillDir = path.join(categoryDir, draft.metadata.name);
  
  await fs.mkdir(skillDir, { recursive: true });
  
  const filePath = path.join(skillDir, 'SKILL.md');
  await fs.writeFile(filePath, draft.fullText, 'utf8');
  log.info(`Arquivo: ${filePath}`);
  log.info(`Categoria: ${draft.metadata.category}`);
  log.warn('Status: draft - preencha os [PLACEHOLDERS] e altere para "approved"');
  
  return filePath;
}

// ============================================================================
// COMMANDS
// ============================================================================

async function generateCommand(type, description, options = {}) {
  const mode = options.mode || CONFIG.DEFAULT_MODE;
  
  console.log('\n' + '='.repeat(70));
  console.log(`PROMPTOS BRAIN - Gerando ${type.toUpperCase()} [Modo: ${mode.toUpperCase()}]`);
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
    log.info(`Workflow: ${classification.workflow?.id || 'N/A'}`);
    log.info(`Persona: ${classification.persona || 'N/A'}`);
    
    if (classification.suggestedSkills?.length > 0) {
      log.info(`Skills sugeridas: ${classification.suggestedSkills.join(', ')}`);
    }
    
    const research = await conductResearch(classification, mode);
    
    log.step(3, 'GENERATE - Gerando draft...');
    const draft = generateSkillContent(classification, research);
    log.info(`Nome: ${draft.metadata.name}`);
    
    const validation = validateDraft(draft);
    
    const approval = await requestApproval(draft, validation.tierResults);
    
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

async function validateCommand(filePath) {
  console.log('\n' + '='.repeat(70));
  console.log('TIER SYSTEM VALIDATION');
  console.log('='.repeat(70));
  
  try {
    const results = await tierSystem.validateFile(filePath);
    console.log(tierSystem.formatResults(results));
    
    if (!results.summary.canApprove) {
      process.exit(1);
    }
  } catch (error) {
    log.error(`Erro: ${error.message}`);
    process.exit(1);
  }
}

async function classifyCommand(input) {
  const result = inputClassifier.classify(input);
  console.log(inputClassifier.formatClassification(result));
}

async function contextCommand(options = {}) {
  const context = await jitLoader.loadContext({
    baseDir: CONFIG.BASE_DIR,
    skills: options.skills || [],
    includeCore: true
  });
  
  console.log(jitLoader.formatContextReport(context));
}

async function shortcutsCommand() {
  console.log(inputClassifier.listShortcuts());
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

// ============================================================================
// SHORTCUT EXPANSION
// ============================================================================

function expandShortcuts(args) {
  if (args.length === 0) return args;
  
  const shortcut = inputClassifier.expandShortcut(args[0]);
  
  if (shortcut.expanded) {
    log.info(`Shortcut: ${shortcut.shortcut} -> ${shortcut.description}`);
    // Map shortcut to appropriate command
    if (shortcut.workflow === 'skill_generation') {
      return ['generate', 'skill', shortcut.args || ''].filter(Boolean);
    }
    // Other shortcuts could trigger different workflows
    console.log(`Workflow detectado: ${shortcut.workflow}`);
    console.log(`Para executar: Use o comando apropriado ou continue manualmente.`);
    return args;
  }
  
  return args;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  let args = process.argv.slice(2);
  
  // Expand shortcuts
  args = expandShortcuts(args);
  
  if (args.length === 0) {
    console.log(`
Itzamna PromptOS Brain CLI v${CONFIG.VERSION}

Uso:
  node brain.js generate skill "descricao" [--category CAT] [--mode MODE]
  node brain.js generate persona "descricao"
  node brain.js list skills
  node brain.js list personas
  node brain.js search "termo"
  node brain.js validate <arquivo>          Valida skill contra T0/T1/T2
  node brain.js classify "mensagem"         Classifica input
  node brain.js context [--skills s1,s2]    Mostra contexto JIT
  node brain.js shortcuts                   Lista shortcuts

Modos (--mode):
  fast   - Template com placeholders (padrao)
  brain  - Pesquisa real + geracao completa (requer SPEC-003)

Categorias:
  frontend, backend, config, markup, devops, docs, testing

Shortcuts:
  #new, #impl, #test, #review, #bug, #refactor, #deploy, #db, #security, #docs

Exemplos:
  node brain.js generate skill "API GraphQL com Apollo Server" --category backend
  node brain.js generate skill "CSS Flexbox" --mode brain
  node brain.js validate skills/backend/graphql-api/SKILL.md
  node brain.js classify "Quero criar um CRUD de produtos"
  node brain.js context --skills graphql-api,clean-code
`);
    return;
  }
  
  const [command, subcommand, ...rest] = args;
  
  // Parse options
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
      i++;
    } else if (rest[i] === '--mode' && rest[i + 1]) {
      const mode = rest[i + 1].toLowerCase();
      if (CONFIG.MODES.includes(mode)) {
        options.mode = mode;
      } else {
        log.warn(`Modo "${mode}" invalido. Disponiveis: ${CONFIG.MODES.join(', ')}`);
      }
      i++;
    } else if (rest[i] === '--skills' && rest[i + 1]) {
      options.skills = rest[i + 1].split(',').map(s => s.trim());
      i++;
    } else if (!rest[i].startsWith('--')) {
      descriptionParts.push(rest[i]);
    }
  }
  
  const description = descriptionParts.join(' ');
  
  switch (command) {
    case 'generate':
      if (!subcommand || !description) {
        log.error('Uso: node brain.js generate <skill|persona> "descricao" [--category CAT] [--mode MODE]');
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
      
    case 'validate':
      if (!subcommand) {
        log.error('Uso: node brain.js validate <arquivo>');
        return;
      }
      await validateCommand(subcommand);
      break;
      
    case 'classify':
      const inputToClassify = [subcommand, ...descriptionParts].filter(Boolean).join(' ');
      if (!inputToClassify) {
        log.error('Uso: node brain.js classify "mensagem"');
        return;
      }
      await classifyCommand(inputToClassify);
      break;
      
    case 'context':
      await contextCommand(options);
      break;
      
    case 'shortcuts':
      await shortcutsCommand();
      break;
      
    default:
      log.error(`Comando desconhecido: ${command}`);
      console.log('Use: node brain.js --help para ver comandos disponiveis');
  }
}

main().catch(console.error);
