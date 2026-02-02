#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - Input Classifier v1.0.0
 * 
 * Classifica input do usuario em:
 * - Workflow: O que fazer (card_generation, code_implementation, bug_fixing, etc.)
 * - Persona: Quem deve fazer (Product Owner, Software Engineer, etc.)
 * - Domain: Area tecnica (frontend, backend, devops, etc.)
 * - Skills: Quais skills carregar via JIT
 * 
 * Baseado em: docs/add-core/input-classifier.md
 */

// ============================================================================
// WORKFLOW DEFINITIONS
// ============================================================================

const WORKFLOWS = {
  bug_fixing: {
    name: 'Bug Fixing',
    description: 'Correcao de erros e bugs',
    priority: 1, // Highest priority
    persona: 'Debugger',
    defaultSkills: ['debugging-techniques', 'error-handling', 'stack-trace-analysis'],
    patterns: [
      /\b(erro|error|bug|exception|crash|falha|failure|quebr|broken)\b/i,
      /\b(nao funciona|not working|doesnt work|failed)\b/i,
      /\bNullPointerException|TypeError|ReferenceError\b/i,
      /\b(fix|corrigir|resolver)\s+(bug|erro|problema)/i,
      /#bug\b/i
    ]
  },
  
  code_implementation: {
    name: 'Code Implementation',
    description: 'Implementacao de codigo a partir de um CARD',
    priority: 2,
    persona: 'Software Engineer',
    defaultSkills: ['clean-code', 'software-testing', 'api-design'],
    patterns: [
      /#impl\s+CARD-\d+/i,
      /#implement\s+CARD-\d+/i,
      /implementar\s+CARD-\d+/i,
      /#impl-direct\b/i
    ]
  },
  
  code_review: {
    name: 'Code Review',
    description: 'Revisao de codigo existente',
    priority: 3,
    persona: 'Code Reviewer',
    defaultSkills: ['clean-code', 'code-smells', 'software-quality'],
    patterns: [
      /\b(revis[ea]|review|analise|analyze)\s*(codigo|code|este|this|o)\b/i,
      /#review\b/i,
      /\bcode\s*review\b/i,
      /\bPR\s*review\b/i,
      /\bpull\s*request\s*review\b/i
    ]
  },
  
  test_generation: {
    name: 'Test Generation',
    description: 'Geracao de testes automatizados',
    priority: 4,
    persona: 'QA Engineer',
    defaultSkills: ['software-testing', 'test-automation', 'tdd'],
    patterns: [
      /#test\b/i,
      /\b(crie|criar|gerar|generate)\s*(testes?|tests?)\b/i,
      /\b(unit|unitario|integracao|integration|e2e)\s*test/i,
      /\btest\s*coverage\b/i,
      /\btdd\b/i
    ]
  },
  
  refactoring: {
    name: 'Refactoring',
    description: 'Refatoracao e melhoria de codigo',
    priority: 5,
    persona: 'Software Engineer',
    defaultSkills: ['refactoring', 'clean-code', 'software-design'],
    patterns: [
      /#refactor\b/i,
      /\b(refator|refactor|melhorar|improve)\s*(codigo|code|este|this)?\b/i,
      /\b(limpar|clean\s*up)\s*codigo\b/i,
      /\bextract\s*(method|class|function)\b/i
    ]
  },
  
  card_generation: {
    name: 'Card Generation',
    description: 'Criacao de CARD para nova feature (CARD-FIRST rule)',
    priority: 6,
    persona: 'Product Owner',
    defaultSkills: ['card-templates', 'requirements-gathering', 'validation-patterns'],
    patterns: [
      /#new\b/i,
      /\b(quero|preciso|gostaria)\s*(de\s*)?(criar|fazer|implementar|desenvolver)\b/i,
      /\b(criar|create|nova|new)\s*(feature|funcionalidade|crud|api|modulo)\b/i,
      /\b(adicionar|add)\s*(funcionalidade|feature|modulo)\b/i,
      /\bpreciso\s+de\s+um\b/i
    ]
  },
  
  security_audit: {
    name: 'Security Audit',
    description: 'Auditoria de seguranca',
    priority: 7,
    persona: 'Security Engineer',
    defaultSkills: ['cybersecurity', 'secure-coding', 'owasp'],
    patterns: [
      /#security\b/i,
      /\b(audit|auditoria)\s*(de\s*)?(seguranca|security)\b/i,
      /\bvulnerabilidade|vulnerability\b/i,
      /\bowasp\b/i,
      /\bpenteste?\b/i
    ]
  },
  
  performance: {
    name: 'Performance Optimization',
    description: 'Otimizacao de performance',
    priority: 8,
    persona: 'Performance Engineer',
    defaultSkills: ['performance-optimization', 'profiling', 'scalability'],
    patterns: [
      /#perf\b/i,
      /\b(otimizar|optimize|melhorar)\s*(performance|desempenho)\b/i,
      /\b(lento|slow|demora|lag)\b/i,
      /\bmemory\s*leak\b/i,
      /\bprofiling\b/i
    ]
  },
  
  documentation: {
    name: 'Documentation',
    description: 'Criacao ou atualizacao de documentacao',
    priority: 9,
    persona: 'Technical Writer',
    defaultSkills: ['technical-documentation', 'api-documentation'],
    patterns: [
      /#docs?\b/i,
      /\b(documentar|document|escrever\s*doc)\b/i,
      /\b(readme|changelog)\b/i,
      /\b(api\s*docs?|swagger)\b/i
    ]
  },
  
  devops: {
    name: 'DevOps',
    description: 'CI/CD, deployment, infraestrutura',
    priority: 10,
    persona: 'DevOps Engineer',
    defaultSkills: ['docker', 'kubernetes', 'ci-cd'],
    patterns: [
      /#deploy\b/i,
      /#devops\b/i,
      /\b(deploy|deployment|ci\/cd|pipeline)\b/i,
      /\b(docker|kubernetes|k8s|terraform)\b/i,
      /\b(infraestrutura|infrastructure)\b/i
    ]
  },
  
  database: {
    name: 'Database',
    description: 'Design e operacoes de banco de dados',
    priority: 11,
    persona: 'Database Specialist',
    defaultSkills: ['sql', 'database-design', 'orm'],
    patterns: [
      /#db\b/i,
      /\b(database|banco\s*de\s*dados)\b/i,
      /\b(sql|postgres|mysql|mongodb|redis)\b/i,
      /\b(migration|migracao|schema)\b/i
    ]
  },
  
  architecture: {
    name: 'Architecture',
    description: 'Decisoes arquiteturais',
    priority: 12,
    persona: 'Solution Architect',
    defaultSkills: ['software-architecture', 'ddd', 'clean-architecture'],
    patterns: [
      /#arch\b/i,
      /\b(arquitetura|architecture)\b/i,
      /\b(design\s*pattern|padrao\s*de\s*projeto)\b/i,
      /\b(ddd|hexagonal|clean\s*arch)\b/i,
      /\b(microservices?|monolito)\b/i
    ]
  },
  
  spec_kit: {
    name: 'Spec Kit',
    description: 'Criacao de especificacao detalhada',
    priority: 13,
    persona: 'Solution Architect',
    defaultSkills: ['software-architecture', 'requirements-gathering'],
    patterns: [
      /\/speckit\./i,
      /#speckit\b/i,
      /\b(criar|create)\s*spec\b/i
    ]
  },
  
  skill_generation: {
    name: 'Skill Generation',
    description: 'Geracao de nova skill para o PromptOS',
    priority: 14,
    persona: 'PromptOS Brain',
    defaultSkills: [],
    patterns: [
      /\b(gerar|generate|criar|create)\s*(nova\s*)?(skill)\b/i,
      /brain\.js\s*generate\s*skill/i,
      /#skill\b/i
    ]
  },
  
  consultation: {
    name: 'Consultation',
    description: 'Consulta, pergunta, explicacao',
    priority: 100, // Lowest priority (default)
    persona: 'Solution Architect',
    defaultSkills: ['software-architecture'],
    patterns: [
      /\b(como|how|what|o\s*que|por\s*que|why|explique|explain)\b/i,
      /\?$/
    ]
  }
};

// ============================================================================
// DOMAIN DEFINITIONS
// ============================================================================

const DOMAINS = {
  frontend: {
    name: 'Frontend',
    keywords: ['css', 'html', 'tailwind', 'sass', 'webpack', 'vite', 'react', 'vue', 'angular', 'jsx', 'tsx', 'nextjs', 'nuxt', 'svelte'],
    category: 'frontend'
  },
  backend: {
    name: 'Backend',
    keywords: ['nodejs', 'express', 'fastify', 'nestjs', 'spring', 'django', 'flask', 'fastapi', 'rails', 'laravel', 'api', 'rest', 'graphql', 'grpc'],
    category: 'backend'
  },
  database: {
    name: 'Database',
    keywords: ['sql', 'postgres', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'orm', 'prisma', 'typeorm', 'sequelize', 'hibernate'],
    category: 'backend'
  },
  devops: {
    name: 'DevOps',
    keywords: ['docker', 'kubernetes', 'k8s', 'ci/cd', 'github actions', 'gitlab', 'jenkins', 'terraform', 'ansible', 'aws', 'azure', 'gcp'],
    category: 'devops'
  },
  security: {
    name: 'Security',
    keywords: ['auth', 'jwt', 'oauth', 'security', 'encryption', 'owasp', 'xss', 'csrf', 'sql injection', 'penteste'],
    category: 'backend'
  },
  testing: {
    name: 'Testing',
    keywords: ['test', 'jest', 'pytest', 'cypress', 'playwright', 'selenium', 'coverage', 'tdd', 'bdd', 'unit test', 'integration test'],
    category: 'testing'
  },
  config: {
    name: 'Configuration',
    keywords: ['yaml', 'json', 'properties', 'env', 'configuration', 'settings', 'dotenv', 'config'],
    category: 'config'
  },
  markup: {
    name: 'Markup',
    keywords: ['xml', 'xslt', 'markdown', 'md', 'sgml', 'xhtml', 'latex'],
    category: 'markup'
  },
  docs: {
    name: 'Documentation',
    keywords: ['documentation', 'technical writing', 'readme', 'docs', 'manual', 'swagger', 'openapi'],
    category: 'docs'
  },
  java: {
    name: 'Java',
    keywords: ['java', 'spring', 'spring boot', 'maven', 'gradle', 'jpa', 'hibernate', 'junit', 'lombok'],
    category: 'backend'
  },
  python: {
    name: 'Python',
    keywords: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'pytest', 'pip', 'poetry'],
    category: 'backend'
  },
  typescript: {
    name: 'TypeScript',
    keywords: ['typescript', 'ts', 'tsx', 'type', 'interface', 'generic'],
    category: 'frontend'
  },
  mobile: {
    name: 'Mobile',
    keywords: ['react native', 'flutter', 'swift', 'kotlin', 'ios', 'android', 'mobile'],
    category: 'frontend'
  }
};

// ============================================================================
// SHORTCUT COMMANDS
// ============================================================================

const SHORTCUTS = {
  '#new': { workflow: 'card_generation', description: 'Criar novo CARD' },
  '#impl': { workflow: 'code_implementation', description: 'Implementar CARD' },
  '#test': { workflow: 'test_generation', description: 'Gerar testes' },
  '#review': { workflow: 'code_review', description: 'Revisar codigo' },
  '#bug': { workflow: 'bug_fixing', description: 'Corrigir bug' },
  '#refactor': { workflow: 'refactoring', description: 'Refatorar codigo' },
  '#deploy': { workflow: 'devops', description: 'Deploy/DevOps' },
  '#db': { workflow: 'database', description: 'Banco de dados' },
  '#security': { workflow: 'security_audit', description: 'Auditoria de seguranca' },
  '#perf': { workflow: 'performance', description: 'Otimizacao de performance' },
  '#docs': { workflow: 'documentation', description: 'Documentacao' },
  '#arch': { workflow: 'architecture', description: 'Arquitetura' },
  '#skill': { workflow: 'skill_generation', description: 'Gerar skill' }
};

// ============================================================================
// COMPLEXITY INDICATORS
// ============================================================================

const COMPLEXITY = {
  simple: {
    indicators: ['basico', 'simples', 'introducao', 'hello', 'starter', 'basic', 'quick', 'rapido'],
    level: 'L1',
    maxSkills: 2
  },
  medium: {
    indicators: [], // Default
    level: 'L2',
    maxSkills: 4
  },
  complex: {
    indicators: ['arquitetura', 'sistema completo', 'enterprise', 'avancado', 'advanced', 'completo', 'full', 'microservices'],
    level: 'L3',
    maxSkills: 5
  }
};

// ============================================================================
// CLASSIFICATION ENGINE
// ============================================================================

/**
 * Detecta workflow baseado em padroes no input
 */
function detectWorkflow(input) {
  const lowerInput = input.toLowerCase();
  
  // Sort workflows by priority
  const sortedWorkflows = Object.entries(WORKFLOWS)
    .sort((a, b) => a[1].priority - b[1].priority);
  
  for (const [workflowId, workflow] of sortedWorkflows) {
    for (const pattern of workflow.patterns) {
      if (pattern.test(input)) {
        return {
          id: workflowId,
          name: workflow.name,
          description: workflow.description,
          persona: workflow.persona,
          defaultSkills: workflow.defaultSkills,
          matchedPattern: pattern.toString()
        };
      }
    }
  }
  
  // Default to consultation
  return {
    id: 'consultation',
    name: WORKFLOWS.consultation.name,
    description: WORKFLOWS.consultation.description,
    persona: WORKFLOWS.consultation.persona,
    defaultSkills: WORKFLOWS.consultation.defaultSkills,
    matchedPattern: 'default'
  };
}

/**
 * Detecta dominio tecnico baseado em keywords
 */
function detectDomain(input) {
  const lowerInput = input.toLowerCase();
  let bestMatch = { domain: 'general', category: 'docs', score: 0 };
  
  for (const [domainId, domain] of Object.entries(DOMAINS)) {
    const matches = domain.keywords.filter(kw => lowerInput.includes(kw.toLowerCase()));
    if (matches.length > bestMatch.score) {
      bestMatch = {
        domain: domainId,
        name: domain.name,
        category: domain.category,
        score: matches.length,
        matchedKeywords: matches
      };
    }
  }
  
  return bestMatch;
}

/**
 * Detecta complexidade baseado em indicadores
 */
function detectComplexity(input) {
  const lowerInput = input.toLowerCase();
  
  for (const indicator of COMPLEXITY.complex.indicators) {
    if (lowerInput.includes(indicator)) {
      return { level: 'complex', skillLevel: 'L3', maxSkills: 5 };
    }
  }
  
  for (const indicator of COMPLEXITY.simple.indicators) {
    if (lowerInput.includes(indicator)) {
      return { level: 'simple', skillLevel: 'L1', maxSkills: 2 };
    }
  }
  
  return { level: 'medium', skillLevel: 'L2', maxSkills: 4 };
}

/**
 * Expande shortcuts para comandos completos
 */
function expandShortcut(input) {
  const words = input.trim().split(/\s+/);
  const firstWord = words[0];
  
  if (SHORTCUTS[firstWord]) {
    return {
      expanded: true,
      shortcut: firstWord,
      workflow: SHORTCUTS[firstWord].workflow,
      description: SHORTCUTS[firstWord].description,
      args: words.slice(1).join(' ')
    };
  }
  
  return { expanded: false, original: input };
}

/**
 * Sugere skills baseado em workflow + domain
 */
function suggestSkills(workflow, domain, complexity) {
  const skills = new Set();
  
  // Add workflow default skills
  if (workflow.defaultSkills) {
    workflow.defaultSkills.forEach(s => skills.add(s));
  }
  
  // Add domain-specific skills (limit based on complexity)
  const domainSkills = {
    java: ['java', 'spring-boot', 'maven'],
    python: ['python', 'django', 'pytest'],
    typescript: ['typescript', 'react', 'nodejs'],
    frontend: ['css', 'html', 'react'],
    backend: ['api-design', 'rest', 'graphql'],
    database: ['sql', 'postgres', 'orm'],
    devops: ['docker', 'kubernetes', 'ci-cd'],
    security: ['cybersecurity', 'owasp', 'secure-coding'],
    testing: ['software-testing', 'tdd', 'test-automation']
  };
  
  if (domain.domain && domainSkills[domain.domain]) {
    domainSkills[domain.domain].slice(0, 2).forEach(s => skills.add(s));
  }
  
  // Limit to maxSkills
  return Array.from(skills).slice(0, complexity.maxSkills);
}

/**
 * Classificacao completa do input
 */
function classify(input) {
  // Expand shortcuts first
  const shortcut = expandShortcut(input);
  const effectiveInput = shortcut.expanded ? shortcut.args || input : input;
  
  // Detect all dimensions
  const workflow = shortcut.expanded 
    ? { ...WORKFLOWS[shortcut.workflow], id: shortcut.workflow, matchedPattern: 'shortcut' }
    : detectWorkflow(input);
    
  const domain = detectDomain(effectiveInput);
  const complexity = detectComplexity(effectiveInput);
  
  // Suggest skills
  const skills = suggestSkills(workflow, domain, complexity);
  
  // Build triggers for skill matching
  const triggers = [
    `trabalhar com ${domain.domain}`,
    `usar ${workflow.id}`,
    input.toLowerCase().substring(0, 60)
  ];

  return {
    // Input info
    originalInput: input,
    shortcut: shortcut.expanded ? shortcut : null,
    
    // Classification
    workflow: {
      id: workflow.id,
      name: workflow.name || WORKFLOWS[workflow.id]?.name,
      description: workflow.description || WORKFLOWS[workflow.id]?.description,
      matchedPattern: workflow.matchedPattern
    },
    
    persona: workflow.persona || WORKFLOWS[workflow.id]?.persona,
    
    domain: {
      id: domain.domain,
      name: domain.name || domain.domain,
      category: domain.category,
      matchedKeywords: domain.matchedKeywords || []
    },
    
    complexity: {
      level: complexity.level,
      skillLevel: complexity.skillLevel,
      maxSkills: complexity.maxSkills
    },
    
    // Suggestions
    suggestedSkills: skills,
    triggers,
    
    // Metadata
    timestamp: new Date().toISOString()
  };
}

/**
 * Formata resultado para console
 */
function formatClassification(result) {
  const lines = [];
  
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('INPUT CLASSIFICATION');
  lines.push('='.repeat(60));
  lines.push('');
  
  lines.push(`Input: "${result.originalInput}"`);
  if (result.shortcut) {
    lines.push(`Shortcut: ${result.shortcut.shortcut} -> ${result.shortcut.description}`);
  }
  lines.push('');
  
  lines.push(`Workflow: ${result.workflow.name} (${result.workflow.id})`);
  lines.push(`Persona: ${result.persona}`);
  lines.push(`Domain: ${result.domain.name} (${result.domain.category})`);
  lines.push(`Complexity: ${result.complexity.level} (${result.complexity.skillLevel})`);
  lines.push('');
  
  lines.push(`Suggested Skills (max ${result.complexity.maxSkills}):`);
  result.suggestedSkills.forEach(s => lines.push(`  - ${s}`));
  lines.push('');
  
  if (result.domain.matchedKeywords?.length > 0) {
    lines.push(`Matched Keywords: ${result.domain.matchedKeywords.join(', ')}`);
  }
  
  lines.push('');
  
  return lines.join('\n');
}

/**
 * Lista todos os shortcuts disponiveis
 */
function listShortcuts() {
  const lines = [];
  lines.push('');
  lines.push('SHORTCUTS DISPONIVEIS:');
  lines.push('');
  
  for (const [shortcut, config] of Object.entries(SHORTCUTS)) {
    lines.push(`  ${shortcut.padEnd(12)} -> ${config.description} (${config.workflow})`);
  }
  
  lines.push('');
  return lines.join('\n');
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  WORKFLOWS,
  DOMAINS,
  SHORTCUTS,
  COMPLEXITY,
  classify,
  detectWorkflow,
  detectDomain,
  detectComplexity,
  expandShortcut,
  suggestSkills,
  formatClassification,
  listShortcuts
};

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Itzamna PromptOS - Input Classifier v1.0.0

Uso:
  node input-classifier.js "sua mensagem aqui"
  node input-classifier.js --shortcuts          Lista shortcuts
  node input-classifier.js --help               Mostra ajuda

Exemplos:
  node input-classifier.js "Quero criar um CRUD de produtos"
  node input-classifier.js "#impl CARD-001"
  node input-classifier.js "Erro: NullPointerException no login"
  node input-classifier.js "#test ProductService"
`);
    return;
  }
  
  if (args[0] === '--shortcuts') {
    console.log(listShortcuts());
    return;
  }
  
  const input = args.join(' ');
  const result = classify(input);
  console.log(formatClassification(result));
}

// Run CLI if called directly
if (require.main === module) {
  main().catch(console.error);
}
