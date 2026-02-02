#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - Tier System v1.0.0
 * 
 * Implementa o sistema de regras T0/T1/T2:
 * - T0: INVIOLAVEIS - Nunca quebrar. Violacao = rejeicao automatica.
 * - T1: FORTES - Raramente quebrar. Requer justificativa.
 * - T2: CONVENCOES - Aceitavel quebrar com razao tecnica.
 * 
 * Baseado em: docs/add-core/tier-system.md
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// TIER DEFINITIONS
// ============================================================================

const TIERS = {
  T0: {
    name: 'INVIOLABLE',
    description: 'Regras que NUNCA podem ser quebradas. Violacao = rejeicao automatica.',
    severity: 'critical',
    rules: []
  },
  T1: {
    name: 'STRONG',
    description: 'Regras fortes. Quebrar e raro e requer justificativa.',
    severity: 'warning',
    rules: []
  },
  T2: {
    name: 'CONVENTIONS',
    description: 'Convencoes e preferencias. Aceitavel quebrar com razao tecnica.',
    severity: 'info',
    rules: []
  }
};

// ============================================================================
// T0 RULES - INVIOLABLE
// ============================================================================

TIERS.T0.rules = [
  // T0-STRUCTURAL
  {
    id: 'T0-STRUCT-01',
    name: 'Frontmatter Required',
    description: 'Skills devem ter frontmatter YAML valido',
    category: 'structural',
    check: (content) => {
      const hasFrontmatter = content.startsWith('---') && content.indexOf('---', 3) > 3;
      return {
        passed: hasFrontmatter,
        message: hasFrontmatter 
          ? 'Frontmatter YAML presente' 
          : 'Frontmatter YAML ausente. Skill deve comecar com --- e ter metadados.'
      };
    }
  },
  {
    id: 'T0-STRUCT-02',
    name: 'Required Sections',
    description: 'Skills devem ter secoes obrigatorias: Guidelines, Constraints, Exemplos',
    category: 'structural',
    check: (content) => {
      const requiredSections = ['## Guidelines', '## Constraints', '## Exemplos'];
      const missing = requiredSections.filter(s => !content.includes(s));
      return {
        passed: missing.length === 0,
        message: missing.length === 0
          ? 'Todas as secoes obrigatorias presentes'
          : `Secoes ausentes: ${missing.join(', ')}`
      };
    }
  },
  {
    id: 'T0-STRUCT-03',
    name: 'Status Field',
    description: 'Frontmatter deve ter campo status (draft/approved/deprecated)',
    category: 'structural',
    check: (content) => {
      const hasStatus = /status:\s*["']?(draft|approved|deprecated)["']?/i.test(content);
      return {
        passed: hasStatus,
        message: hasStatus
          ? 'Campo status presente no frontmatter'
          : 'Campo status ausente ou invalido. Use: draft, approved, ou deprecated.'
      };
    }
  },

  // T0-SECURITY
  {
    id: 'T0-SEC-01',
    name: 'No Hardcoded Secrets',
    description: 'Nao deve conter secrets hardcoded (passwords, API keys, tokens)',
    category: 'security',
    check: (content) => {
      const secretPatterns = [
        /password\s*[=:]\s*["'][^"']+["']/gi,
        /api[_-]?key\s*[=:]\s*["'][^"']+["']/gi,
        /secret\s*[=:]\s*["'][^"']+["']/gi,
        /token\s*[=:]\s*["'][A-Za-z0-9+/=]{20,}["']/gi,
        /Bearer\s+[A-Za-z0-9\-._~+/]+=*/g,
      ];
      
      const violations = [];
      for (const pattern of secretPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          // Filter out obvious placeholders
          const realMatches = matches.filter(m => 
            !m.includes('[') && !m.includes('PLACEHOLDER') && !m.includes('xxx')
          );
          if (realMatches.length > 0) {
            violations.push(...realMatches.map(m => m.substring(0, 30) + '...'));
          }
        }
      }
      
      return {
        passed: violations.length === 0,
        message: violations.length === 0
          ? 'Nenhum secret hardcoded detectado'
          : `Possiveis secrets detectados: ${violations.slice(0, 3).join(', ')}`
      };
    }
  },
  {
    id: 'T0-SEC-02',
    name: 'No SQL Injection Patterns',
    description: 'Nao deve conter padroes de SQL injection',
    category: 'security',
    check: (content) => {
      const dangerousPatterns = [
        /["']\s*\+\s*\w+\s*\+\s*["']/g,  // "SELECT * FROM " + userId + "..."
        /\$\{[^}]*\}\s*(?:FROM|WHERE|AND|OR)/gi,  // Template literals in SQL
        /execute\s*\(\s*["'][^"']*\+/gi,  // execute("SELECT..." +
      ];
      
      const violations = [];
      for (const pattern of dangerousPatterns) {
        if (pattern.test(content)) {
          violations.push(pattern.source.substring(0, 20));
        }
      }
      
      return {
        passed: violations.length === 0,
        message: violations.length === 0
          ? 'Nenhum padrao de SQL injection detectado'
          : 'Padrao de SQL injection detectado. Use parameterized queries.'
      };
    }
  },

  // T0-VALIDATION
  {
    id: 'T0-VAL-01',
    name: 'No Empty Placeholders',
    description: 'Skills aprovadas nao devem ter placeholders vazios [XXX]',
    category: 'validation',
    check: (content, metadata = {}) => {
      // Only enforce for approved skills
      if (metadata.status !== 'approved') {
        return { passed: true, message: 'Skill em draft - placeholders permitidos' };
      }
      
      const placeholders = content.match(/\[[A-Z_]{3,}[^\]]*\]/g) || [];
      const unfilled = placeholders.filter(p => 
        !p.includes(':') || p.includes('PLACEHOLDER')
      );
      
      return {
        passed: unfilled.length === 0,
        message: unfilled.length === 0
          ? 'Nenhum placeholder vazio em skill aprovada'
          : `Skill aprovada com ${unfilled.length} placeholder(s) nao preenchido(s)`
      };
    }
  },

  // T0-CARD-FIRST (for future workflow integration)
  {
    id: 'T0-CARD-01',
    name: 'Version Required',
    description: 'Skills devem ter versao semantica no frontmatter',
    category: 'validation',
    check: (content) => {
      const hasVersion = /version:\s*["']?\d+\.\d+\.\d+["']?/i.test(content);
      return {
        passed: hasVersion,
        message: hasVersion
          ? 'Versao semantica presente'
          : 'Versao ausente. Use formato: version: "1.0.0"'
      };
    }
  }
];

// ============================================================================
// T1 RULES - STRONG
// ============================================================================

TIERS.T1.rules = [
  // T1-CODE-QUALITY
  {
    id: 'T1-QUAL-01',
    name: 'Minimum Examples',
    description: 'Skills devem ter pelo menos 2 exemplos praticos',
    category: 'quality',
    check: (content) => {
      const exampleCount = (content.match(/###\s*Exemplo\s*\d+/gi) || []).length;
      return {
        passed: exampleCount >= 2,
        message: exampleCount >= 2
          ? `${exampleCount} exemplo(s) encontrado(s)`
          : `Apenas ${exampleCount} exemplo(s). Minimo recomendado: 2`
      };
    }
  },
  {
    id: 'T1-QUAL-02',
    name: 'Constraints Section',
    description: 'Skills devem ter pelo menos 2 constraints (NUNCA fazer)',
    category: 'quality',
    check: (content) => {
      const constraintsSection = content.match(/## Constraints[\s\S]*?(?=##|$)/i);
      if (!constraintsSection) {
        return { passed: false, message: 'Secao Constraints nao encontrada' };
      }
      
      const nunca = (constraintsSection[0].match(/NUNCA|NEVER|NAO FACA/gi) || []).length;
      return {
        passed: nunca >= 2,
        message: nunca >= 2
          ? `${nunca} constraint(s) encontrada(s)`
          : `Apenas ${nunca} constraint(s). Minimo recomendado: 2`
      };
    }
  },
  {
    id: 'T1-QUAL-03',
    name: 'Guidelines Section',
    description: 'Skills devem ter pelo menos 3 guidelines (SEMPRE fazer)',
    category: 'quality',
    check: (content) => {
      const guidelinesSection = content.match(/## Guidelines[\s\S]*?(?=##|$)/i);
      if (!guidelinesSection) {
        return { passed: false, message: 'Secao Guidelines nao encontrada' };
      }
      
      // Count numbered items or bullet points
      const items = (guidelinesSection[0].match(/^\s*(\d+\.|[-*])\s+/gm) || []).length;
      return {
        passed: items >= 3,
        message: items >= 3
          ? `${items} guideline(s) encontrada(s)`
          : `Apenas ${items} guideline(s). Minimo recomendado: 3`
      };
    }
  },

  // T1-DOCUMENTATION
  {
    id: 'T1-DOC-01',
    name: 'Description Present',
    description: 'Frontmatter deve ter descricao clara',
    category: 'documentation',
    check: (content) => {
      const descMatch = content.match(/description:\s*["']([^"']+)["']/i);
      if (!descMatch) {
        return { passed: false, message: 'Campo description ausente no frontmatter' };
      }
      
      const desc = descMatch[1];
      const isPlaceholder = desc.includes('[') || desc.includes('PLACEHOLDER');
      const isTooShort = desc.length < 20;
      
      return {
        passed: !isPlaceholder && !isTooShort,
        message: isPlaceholder 
          ? 'Description contem placeholder nao preenchido'
          : isTooShort 
            ? 'Description muito curta (minimo 20 caracteres)'
            : 'Description adequada'
      };
    }
  },
  {
    id: 'T1-DOC-02',
    name: 'Tags Present',
    description: 'Skill deve ter pelo menos 2 tags relevantes',
    category: 'documentation',
    check: (content) => {
      const tagsSection = content.match(/tags:\s*\n((?:\s*-\s*.+\n?)+)/i);
      if (!tagsSection) {
        return { passed: false, message: 'Secao tags ausente no frontmatter' };
      }
      
      const tags = (tagsSection[1].match(/-\s*["']?[^"'\n]+["']?/g) || []);
      const validTags = tags.filter(t => !t.includes('[') && !t.includes('TAG'));
      
      return {
        passed: validTags.length >= 2,
        message: validTags.length >= 2
          ? `${validTags.length} tag(s) valida(s)`
          : `Apenas ${validTags.length} tag(s) valida(s). Minimo: 2`
      };
    }
  },

  // T1-ARCHITECTURE
  {
    id: 'T1-ARCH-01',
    name: 'Edge Cases Section',
    description: 'Skills devem documentar edge cases',
    category: 'architecture',
    check: (content) => {
      const hasEdgeCases = /##\s*Edge\s*Cases/i.test(content);
      return {
        passed: hasEdgeCases,
        message: hasEdgeCases
          ? 'Secao Edge Cases presente'
          : 'Secao Edge Cases ausente. Documente casos especiais.'
      };
    }
  }
];

// ============================================================================
// T2 RULES - CONVENTIONS
// ============================================================================

TIERS.T2.rules = [
  // T2-NAMING
  {
    id: 'T2-NAME-01',
    name: 'Kebab-case Name',
    description: 'Nome da skill deve estar em kebab-case',
    category: 'naming',
    check: (content, metadata = {}) => {
      const nameMatch = content.match(/name:\s*["']([^"']+)["']/i);
      if (!nameMatch) {
        return { passed: false, message: 'Campo name ausente' };
      }
      
      const name = nameMatch[1];
      const isKebab = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name);
      
      return {
        passed: isKebab,
        message: isKebab
          ? 'Nome em kebab-case'
          : `Nome "${name}" nao esta em kebab-case. Ex: "minha-skill"`
      };
    }
  },
  {
    id: 'T2-NAME-02',
    name: 'Title Case Heading',
    description: 'Titulo principal deve estar em Title Case',
    category: 'naming',
    check: (content) => {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (!titleMatch) {
        return { passed: false, message: 'Titulo H1 ausente' };
      }
      
      const title = titleMatch[1];
      // Check if words start with uppercase (allowing small words like 'de', 'com')
      const words = title.split(/\s+/);
      const smallWords = ['de', 'da', 'do', 'das', 'dos', 'com', 'para', 'e', 'ou', 'a', 'o', 'em'];
      const isTitleCase = words.every((word, i) => {
        if (i > 0 && smallWords.includes(word.toLowerCase())) return true;
        return /^[A-Z]/.test(word);
      });
      
      return {
        passed: isTitleCase,
        message: isTitleCase
          ? 'Titulo em Title Case'
          : `Titulo "${title}" deve usar Title Case`
      };
    }
  },

  // T2-STRUCTURE
  {
    id: 'T2-STRUCT-01',
    name: 'References Section',
    description: 'Skill deve ter secao de referencias',
    category: 'structure',
    check: (content) => {
      const hasRefs = /##\s*Referencias|##\s*References|##\s*Fontes/i.test(content);
      return {
        passed: hasRefs,
        message: hasRefs
          ? 'Secao de referencias presente'
          : 'Considere adicionar secao ## Referencias'
      };
    }
  },
  {
    id: 'T2-STRUCT-02',
    name: 'Code Blocks Have Language',
    description: 'Blocos de codigo devem especificar linguagem',
    category: 'structure',
    check: (content) => {
      const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
      const noLang = codeBlocks.filter(block => /^```\s*\n/.test(block));
      
      return {
        passed: noLang.length === 0,
        message: noLang.length === 0
          ? 'Todos os blocos de codigo tem linguagem especificada'
          : `${noLang.length} bloco(s) de codigo sem linguagem`
      };
    }
  },

  // T2-STYLE
  {
    id: 'T2-STYLE-01',
    name: 'Consistent Bullet Style',
    description: 'Usar estilo consistente de bullets (- ou *)',
    category: 'style',
    check: (content) => {
      const dashes = (content.match(/^\s*-\s+/gm) || []).length;
      const asterisks = (content.match(/^\s*\*\s+/gm) || []).length;
      
      // One style should dominate (>80%)
      const total = dashes + asterisks;
      if (total === 0) return { passed: true, message: 'Sem listas' };
      
      const dominant = Math.max(dashes, asterisks);
      const consistent = dominant / total >= 0.8;
      
      return {
        passed: consistent,
        message: consistent
          ? `Estilo consistente (${dashes > asterisks ? 'dashes' : 'asterisks'})`
          : 'Mistura de - e * nas listas. Escolha um estilo.'
      };
    }
  },
  {
    id: 'T2-STYLE-02',
    name: 'Reasonable Line Length',
    description: 'Linhas devem ter no maximo 120 caracteres',
    category: 'style',
    check: (content) => {
      const lines = content.split('\n');
      const longLines = lines.filter(l => l.length > 120 && !l.startsWith('|') && !l.includes('http'));
      
      return {
        passed: longLines.length === 0,
        message: longLines.length === 0
          ? 'Todas as linhas dentro do limite'
          : `${longLines.length} linha(s) com mais de 120 caracteres`
      };
    }
  }
];

// ============================================================================
// VALIDATION ENGINE
// ============================================================================

/**
 * Extrai metadados do frontmatter YAML
 */
function extractMetadata(content) {
  const metadata = {};
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (frontmatterMatch) {
    const yaml = frontmatterMatch[1];
    
    // Simple YAML parsing for common fields
    const statusMatch = yaml.match(/status:\s*["']?(\w+)["']?/i);
    if (statusMatch) metadata.status = statusMatch[1];
    
    const nameMatch = yaml.match(/name:\s*["']([^"']+)["']/i);
    if (nameMatch) metadata.name = nameMatch[1];
    
    const versionMatch = yaml.match(/version:\s*["']([^"']+)["']/i);
    if (versionMatch) metadata.version = versionMatch[1];
  }
  
  return metadata;
}

/**
 * Valida conteudo contra todas as regras de um tier
 */
function validateTier(tier, content, metadata = {}) {
  const results = {
    tier: tier,
    tierName: TIERS[tier].name,
    severity: TIERS[tier].severity,
    passed: 0,
    failed: 0,
    rules: []
  };

  for (const rule of TIERS[tier].rules) {
    try {
      const result = rule.check(content, metadata);
      results.rules.push({
        id: rule.id,
        name: rule.name,
        category: rule.category,
        passed: result.passed,
        message: result.message
      });
      
      if (result.passed) {
        results.passed++;
      } else {
        results.failed++;
      }
    } catch (error) {
      results.rules.push({
        id: rule.id,
        name: rule.name,
        category: rule.category,
        passed: false,
        message: `Erro ao validar: ${error.message}`
      });
      results.failed++;
    }
  }

  return results;
}

/**
 * Valida conteudo contra todos os tiers
 */
function validateAllTiers(content) {
  const metadata = extractMetadata(content);
  
  const results = {
    metadata,
    timestamp: new Date().toISOString(),
    tiers: {
      T0: validateTier('T0', content, metadata),
      T1: validateTier('T1', content, metadata),
      T2: validateTier('T2', content, metadata)
    },
    summary: {
      t0Passed: 0,
      t0Failed: 0,
      t1Passed: 0,
      t1Failed: 0,
      t2Passed: 0,
      t2Failed: 0,
      totalPassed: 0,
      totalFailed: 0,
      score: 0,
      canApprove: false
    }
  };

  // Calculate summary
  results.summary.t0Passed = results.tiers.T0.passed;
  results.summary.t0Failed = results.tiers.T0.failed;
  results.summary.t1Passed = results.tiers.T1.passed;
  results.summary.t1Failed = results.tiers.T1.failed;
  results.summary.t2Passed = results.tiers.T2.passed;
  results.summary.t2Failed = results.tiers.T2.failed;

  results.summary.totalPassed = results.summary.t0Passed + results.summary.t1Passed + results.summary.t2Passed;
  results.summary.totalFailed = results.summary.t0Failed + results.summary.t1Failed + results.summary.t2Failed;

  // Calculate score (T0=50%, T1=35%, T2=15%)
  const t0Total = TIERS.T0.rules.length;
  const t1Total = TIERS.T1.rules.length;
  const t2Total = TIERS.T2.rules.length;

  const t0Score = t0Total > 0 ? (results.summary.t0Passed / t0Total) * 50 : 50;
  const t1Score = t1Total > 0 ? (results.summary.t1Passed / t1Total) * 35 : 35;
  const t2Score = t2Total > 0 ? (results.summary.t2Passed / t2Total) * 15 : 15;

  results.summary.score = Math.round(t0Score + t1Score + t2Score);

  // Can only approve if ALL T0 rules pass
  results.summary.canApprove = results.summary.t0Failed === 0;

  return results;
}

/**
 * Formata resultados para exibicao no console
 */
function formatResults(results) {
  const lines = [];
  
  lines.push('');
  lines.push('='.repeat(70));
  lines.push('TIER SYSTEM VALIDATION REPORT');
  lines.push('='.repeat(70));
  lines.push('');

  // Summary
  lines.push(`Score: ${results.summary.score}/100`);
  lines.push(`Can Approve: ${results.summary.canApprove ? 'YES' : 'NO (T0 violations)'}`);
  lines.push('');

  // Per-tier results
  for (const tier of ['T0', 'T1', 'T2']) {
    const tierData = results.tiers[tier];
    const icon = tierData.failed === 0 ? '[OK]' : tierData.severity === 'critical' ? '[FAIL]' : '[WARN]';
    
    lines.push(`${icon} ${tier} - ${tierData.tierName}: ${tierData.passed}/${tierData.passed + tierData.failed} passed`);
    
    // Show failed rules
    for (const rule of tierData.rules) {
      if (!rule.passed) {
        lines.push(`     [X] ${rule.id}: ${rule.message}`);
      }
    }
  }

  lines.push('');
  lines.push('-'.repeat(70));

  // Suggestions
  if (!results.summary.canApprove) {
    lines.push('');
    lines.push('ACOES NECESSARIAS (T0 violations):');
    for (const rule of results.tiers.T0.rules) {
      if (!rule.passed) {
        lines.push(`  - ${rule.name}: ${rule.message}`);
      }
    }
  }

  if (results.summary.t1Failed > 0) {
    lines.push('');
    lines.push('RECOMENDACOES (T1 issues):');
    for (const rule of results.tiers.T1.rules) {
      if (!rule.passed) {
        lines.push(`  - ${rule.name}: ${rule.message}`);
      }
    }
  }

  lines.push('');

  return lines.join('\n');
}

/**
 * Valida um arquivo de skill
 */
async function validateFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const results = validateAllTiers(content);
    return results;
  } catch (error) {
    throw new Error(`Erro ao ler arquivo: ${error.message}`);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  TIERS,
  validateTier,
  validateAllTiers,
  validateFile,
  formatResults,
  extractMetadata
};

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Itzamna PromptOS - Tier System v1.0.0

Uso:
  node tier-system.js <arquivo>         Valida arquivo contra T0/T1/T2
  node tier-system.js --help            Mostra ajuda

Tiers:
  T0 - INVIOLAVEL: Nunca quebrar. Violacao = rejeicao automatica.
  T1 - FORTE: Raramente quebrar. Requer justificativa.
  T2 - CONVENCAO: Aceitavel quebrar com razao tecnica.

Exemplos:
  node tier-system.js skills/backend/graphql-api/SKILL.md
  node tier-system.js SKILL.md
`);
    return;
  }

  const filePath = args[0];
  
  try {
    console.log(`Validando: ${filePath}`);
    const results = await validateFile(filePath);
    console.log(formatResults(results));
    
    // Exit with error code if T0 failed
    if (!results.summary.canApprove) {
      process.exit(1);
    }
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    process.exit(1);
  }
}

// Run CLI if called directly
if (require.main === module) {
  main().catch(console.error);
}
