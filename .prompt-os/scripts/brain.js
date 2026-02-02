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
