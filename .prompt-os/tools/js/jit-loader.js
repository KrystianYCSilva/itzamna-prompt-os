#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - JIT Loader v1.0.0
 * 
 * Implementa o protocolo de carregamento Just-In-Time em 3 niveis:
 * - Level 1 (Kernel): AGENTS.md, MEMORY.md, T0 rules (~2KB) - SEMPRE
 * - Level 2 (Core): input-classifier, master-router (~3KB) - POR TAREFA
 * - Level 3 (JIT): 2-5 skills por tarefa (~4-10KB) - SELETIVO
 * 
 * Target: 10-16KB por tarefa (vs 50KB sem JIT = -68-76% reducao)
 * 
 * Baseado em: .prompt-os/core/JIT-PROTOCOL.md
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  BASE_DIR: process.cwd(),
  
  // Level 1 - Kernel (sempre carregado)
  KERNEL_FILES: [
    'AGENTS.md',
    'MEMORY.md'
  ],
  
  // Level 2 - Core (por tarefa)
  CORE_DIR: '.prompt-os/core',
  CORE_FILES: [
    'INPUT-CLASSIFIER.md',
    'JIT-PROTOCOL.md',
    'SELF-CRITIQUE.md'
  ],
  
  // Level 3 - Skills (JIT)
  SKILLS_DIR: '.prompt-os/skills',
  SKILLS_INDEX: '.prompt-os/skills/INDEX.md',
  MAX_SKILLS_PER_TASK: 5,
  MAX_SKILL_SIZE_KB: 2,
  
  // Token budgets
  BUDGET: {
    LEVEL_1: 3 * 1024,    // 3KB
    LEVEL_2: 7 * 1024,    // 7KB
    LEVEL_3: 10 * 1024,   // 10KB
    TOTAL: 20 * 1024      // 20KB max
  }
};

// ============================================================================
// SKILL INDEX CACHE
// ============================================================================

let skillIndexCache = null;
let skillIndexCacheTime = 0;
const CACHE_TTL = 60000; // 1 minute

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calcula tamanho em KB
 */
function sizeKB(content) {
  return Buffer.byteLength(content, 'utf8') / 1024;
}

/**
 * Formata tamanho para exibicao
 */
function formatSize(bytes) {
  const kb = bytes / 1024;
  return kb < 1 ? `${bytes}B` : `${kb.toFixed(1)}KB`;
}

/**
 * Le arquivo com tratamento de erro
 */
async function readFileSafe(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return {
      success: true,
      path: filePath,
      content,
      size: Buffer.byteLength(content, 'utf8')
    };
  } catch (error) {
    return {
      success: false,
      path: filePath,
      error: error.message,
      size: 0
    };
  }
}

// ============================================================================
// LEVEL 1: KERNEL LOADING
// ============================================================================

/**
 * Carrega arquivos do kernel (sempre necessarios)
 */
async function loadKernel(baseDir = CONFIG.BASE_DIR) {
  const results = {
    level: 1,
    name: 'Kernel',
    files: [],
    totalSize: 0,
    content: {},
    errors: []
  };

  for (const file of CONFIG.KERNEL_FILES) {
    const filePath = path.join(baseDir, file);
    const result = await readFileSafe(filePath);
    
    if (result.success) {
      results.files.push({
        name: file,
        path: filePath,
        size: result.size
      });
      results.content[file] = result.content;
      results.totalSize += result.size;
    } else {
      results.errors.push({
        file,
        error: result.error
      });
    }
  }

  return results;
}

// ============================================================================
// LEVEL 2: CORE LOADING
// ============================================================================

/**
 * Carrega arquivos core do sistema (por workflow)
 */
async function loadCore(baseDir = CONFIG.BASE_DIR, workflow = null) {
  const results = {
    level: 2,
    name: 'Core',
    workflow,
    files: [],
    totalSize: 0,
    content: {},
    errors: []
  };

  // Determina quais arquivos core carregar baseado no workflow
  let filesToLoad = CONFIG.CORE_FILES;
  
  // Para workflows simples, pode-se reduzir o core
  if (workflow === 'consultation') {
    filesToLoad = ['input-classifier.md']; // Minimo necessario
  }

  for (const file of filesToLoad) {
    const filePath = path.join(baseDir, CONFIG.CORE_DIR, file);
    const result = await readFileSafe(filePath);
    
    if (result.success) {
      results.files.push({
        name: file,
        path: filePath,
        size: result.size
      });
      results.content[file] = result.content;
      results.totalSize += result.size;
    } else {
      // Core files are optional in some setups
      results.errors.push({
        file,
        error: result.error,
        optional: true
      });
    }
  }

  return results;
}

// ============================================================================
// SKILL INDEX MANAGEMENT
// ============================================================================

/**
 * Carrega e parseia o indice de skills
 */
async function loadSkillIndex(baseDir = CONFIG.BASE_DIR) {
  const now = Date.now();
  
  // Return cached if valid
  if (skillIndexCache && (now - skillIndexCacheTime) < CACHE_TTL) {
    return skillIndexCache;
  }

  const indexPath = path.join(baseDir, CONFIG.SKILLS_INDEX);
  const result = await readFileSafe(indexPath);
  
  if (!result.success) {
    // Fallback: scan directories
    return await scanSkillDirectories(baseDir);
  }

  // Parse INDEX.md format
  const skills = parseSkillIndex(result.content);
  
  skillIndexCache = skills;
  skillIndexCacheTime = now;
  
  return skills;
}

/**
 * Parseia INDEX.md para extrair skills
 */
function parseSkillIndex(content) {
  const skills = {};
  const lines = content.split('\n');
  
  let currentCategory = 'general';
  
  for (const line of lines) {
    // Detect category headers
    const categoryMatch = line.match(/^##\s+(.+)/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].toLowerCase().replace(/\s+/g, '-');
      continue;
    }
    
    // Detect skill links
    const skillMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (skillMatch) {
      const name = skillMatch[1].toLowerCase().replace(/\s+/g, '-');
      const relativePath = skillMatch[2];
      
      skills[name] = {
        name,
        displayName: skillMatch[1],
        category: currentCategory,
        path: relativePath,
        loaded: false
      };
    }
    
    // Detect simple list items (- skill-name)
    const listMatch = line.match(/^\s*[-*]\s+(\S+)/);
    if (listMatch && !line.includes('[')) {
      const name = listMatch[1].toLowerCase().replace(/\s+/g, '-');
      skills[name] = {
        name,
        displayName: listMatch[1],
        category: currentCategory,
        path: null, // Path unknown
        loaded: false
      };
    }
  }
  
  return skills;
}

/**
 * Escaneia diretorios de skills como fallback
 */
async function scanSkillDirectories(baseDir = CONFIG.BASE_DIR) {
  const skills = {};
  const skillsDir = path.join(baseDir, CONFIG.SKILLS_DIR);
  
  try {
    const categories = await fs.readdir(skillsDir, { withFileTypes: true });
    
    for (const cat of categories) {
      if (!cat.isDirectory() || cat.name.startsWith('_')) continue;
      
      const categoryPath = path.join(skillsDir, cat.name);
      const skillDirs = await fs.readdir(categoryPath, { withFileTypes: true });
      
      for (const skill of skillDirs) {
        if (!skill.isDirectory()) continue;
        
        const skillPath = path.join(categoryPath, skill.name, 'SKILL.md');
        const exists = await fs.access(skillPath).then(() => true).catch(() => false);
        
        if (exists) {
          skills[skill.name] = {
            name: skill.name,
            displayName: skill.name.replace(/-/g, ' '),
            category: cat.name,
            path: path.relative(baseDir, skillPath),
            loaded: false
          };
        }
      }
    }
  } catch (error) {
    // Skills directory might not exist
  }
  
  return skills;
}

// ============================================================================
// LEVEL 3: JIT SKILL LOADING
// ============================================================================

/**
 * Resolve caminho de uma skill
 */
async function resolveSkillPath(skillName, baseDir = CONFIG.BASE_DIR) {
  const index = await loadSkillIndex(baseDir);
  
  // Check if skill exists in index
  if (index[skillName]) {
    if (index[skillName].path) {
      return path.join(baseDir, index[skillName].path);
    }
    // Path unknown, try to find it
    const category = index[skillName].category;
    const possiblePath = path.join(baseDir, CONFIG.SKILLS_DIR, category, skillName, 'SKILL.md');
    const exists = await fs.access(possiblePath).then(() => true).catch(() => false);
    if (exists) return possiblePath;
  }
  
  // Fallback: search in all categories
  const skillsDir = path.join(baseDir, CONFIG.SKILLS_DIR);
  try {
    const categories = await fs.readdir(skillsDir, { withFileTypes: true });
    
    for (const cat of categories) {
      if (!cat.isDirectory()) continue;
      
      const possiblePath = path.join(skillsDir, cat.name, skillName, 'SKILL.md');
      const exists = await fs.access(possiblePath).then(() => true).catch(() => false);
      if (exists) return possiblePath;
    }
  } catch (error) {
    // Skills directory might not exist
  }
  
  return null;
}

/**
 * Carrega skills especificas via JIT
 */
async function loadSkills(skillNames, baseDir = CONFIG.BASE_DIR, maxCount = CONFIG.MAX_SKILLS_PER_TASK) {
  const results = {
    level: 3,
    name: 'Skills (JIT)',
    requested: skillNames,
    loaded: [],
    notFound: [],
    totalSize: 0,
    content: {},
    budgetRemaining: CONFIG.BUDGET.LEVEL_3
  };

  // Limit number of skills
  const toLoad = skillNames.slice(0, maxCount);

  for (const skillName of toLoad) {
    // Check budget
    if (results.totalSize >= CONFIG.BUDGET.LEVEL_3) {
      results.notFound.push({
        name: skillName,
        reason: 'Budget exceeded'
      });
      continue;
    }

    const skillPath = await resolveSkillPath(skillName, baseDir);
    
    if (!skillPath) {
      results.notFound.push({
        name: skillName,
        reason: 'Not found'
      });
      continue;
    }

    const fileResult = await readFileSafe(skillPath);
    
    if (fileResult.success) {
      // Check individual skill size
      const sizeKb = fileResult.size / 1024;
      
      if (sizeKb > CONFIG.MAX_SKILL_SIZE_KB * 1.5) {
        // Skill too large, try to truncate or skip
        results.notFound.push({
          name: skillName,
          reason: `Too large (${sizeKb.toFixed(1)}KB > ${CONFIG.MAX_SKILL_SIZE_KB}KB)`
        });
        continue;
      }

      results.loaded.push({
        name: skillName,
        path: skillPath,
        size: fileResult.size
      });
      results.content[skillName] = fileResult.content;
      results.totalSize += fileResult.size;
      results.budgetRemaining = CONFIG.BUDGET.LEVEL_3 - results.totalSize;
    } else {
      results.notFound.push({
        name: skillName,
        reason: fileResult.error
      });
    }
  }

  return results;
}

// ============================================================================
// FULL CONTEXT LOADING
// ============================================================================

/**
 * Carrega contexto completo para uma tarefa
 * Segue o protocolo de 3 niveis
 */
async function loadContext(options = {}) {
  const {
    baseDir = CONFIG.BASE_DIR,
    workflow = null,
    skills = [],
    includeCore = true
  } = options;

  const context = {
    timestamp: new Date().toISOString(),
    options,
    levels: {},
    totals: {
      files: 0,
      size: 0,
      budget: CONFIG.BUDGET.TOTAL,
      remaining: CONFIG.BUDGET.TOTAL
    },
    report: []
  };

  // Level 1: Kernel (always)
  context.levels.kernel = await loadKernel(baseDir);
  context.totals.files += context.levels.kernel.files.length;
  context.totals.size += context.levels.kernel.totalSize;
  context.report.push({
    level: 1,
    name: 'Kernel',
    files: context.levels.kernel.files.length,
    size: context.levels.kernel.totalSize
  });

  // Level 2: Core (if requested)
  if (includeCore) {
    context.levels.core = await loadCore(baseDir, workflow);
    context.totals.files += context.levels.core.files.length;
    context.totals.size += context.levels.core.totalSize;
    context.report.push({
      level: 2,
      name: 'Core',
      files: context.levels.core.files.length,
      size: context.levels.core.totalSize
    });
  }

  // Level 3: Skills (JIT)
  if (skills.length > 0) {
    // Calculate remaining budget for skills
    const usedBudget = context.totals.size;
    const skillBudget = Math.min(
      CONFIG.BUDGET.LEVEL_3,
      CONFIG.BUDGET.TOTAL - usedBudget
    );
    
    context.levels.skills = await loadSkills(skills, baseDir);
    context.totals.files += context.levels.skills.loaded.length;
    context.totals.size += context.levels.skills.totalSize;
    context.report.push({
      level: 3,
      name: 'Skills (JIT)',
      files: context.levels.skills.loaded.length,
      size: context.levels.skills.totalSize,
      notFound: context.levels.skills.notFound.length
    });
  }

  // Calculate remaining budget
  context.totals.remaining = CONFIG.BUDGET.TOTAL - context.totals.size;
  context.totals.withinBudget = context.totals.size <= CONFIG.BUDGET.TOTAL;

  return context;
}

// ============================================================================
// CONTEXT CACHING
// ============================================================================

const contextCache = new Map();

/**
 * Carrega contexto com cache
 */
async function loadContextCached(cacheKey, options = {}) {
  // Check cache
  if (contextCache.has(cacheKey)) {
    const cached = contextCache.get(cacheKey);
    // Cache valid for 5 minutes
    if (Date.now() - cached.timestamp < 300000) {
      return { ...cached.context, fromCache: true };
    }
    contextCache.delete(cacheKey);
  }

  const context = await loadContext(options);
  
  // Store in cache
  contextCache.set(cacheKey, {
    timestamp: Date.now(),
    context
  });

  return { ...context, fromCache: false };
}

/**
 * Limpa cache
 */
function clearCache() {
  contextCache.clear();
  skillIndexCache = null;
}

// ============================================================================
// REPORTING
// ============================================================================

/**
 * Formata relatorio de contexto
 */
function formatContextReport(context) {
  const lines = [];
  
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('JIT LOADING REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  
  // Summary
  lines.push('SUMMARY:');
  lines.push(`  Total Files: ${context.totals.files}`);
  lines.push(`  Total Size: ${formatSize(context.totals.size)}`);
  lines.push(`  Budget: ${formatSize(CONFIG.BUDGET.TOTAL)}`);
  lines.push(`  Remaining: ${formatSize(context.totals.remaining)}`);
  lines.push(`  Within Budget: ${context.totals.withinBudget ? 'YES' : 'NO'}`);
  if (context.fromCache) {
    lines.push(`  From Cache: YES`);
  }
  lines.push('');
  
  // Per-level breakdown
  lines.push('BREAKDOWN:');
  for (const report of context.report) {
    const status = report.size <= CONFIG.BUDGET[`LEVEL_${report.level}`] ? '[OK]' : '[OVER]';
    lines.push(`  ${status} Level ${report.level} (${report.name}): ${report.files} files, ${formatSize(report.size)}`);
    
    if (report.notFound > 0) {
      lines.push(`      (${report.notFound} skills not found)`);
    }
  }
  lines.push('');
  
  // Detailed file list
  if (context.levels.kernel) {
    lines.push('Level 1 - Kernel:');
    for (const file of context.levels.kernel.files) {
      lines.push(`  - ${file.name} (${formatSize(file.size)})`);
    }
  }
  
  if (context.levels.core) {
    lines.push('Level 2 - Core:');
    for (const file of context.levels.core.files) {
      lines.push(`  - ${file.name} (${formatSize(file.size)})`);
    }
  }
  
  if (context.levels.skills) {
    lines.push('Level 3 - Skills (JIT):');
    for (const skill of context.levels.skills.loaded) {
      lines.push(`  - ${skill.name} (${formatSize(skill.size)})`);
    }
    if (context.levels.skills.notFound.length > 0) {
      lines.push('  Not Found:');
      for (const nf of context.levels.skills.notFound) {
        lines.push(`    x ${nf.name}: ${nf.reason}`);
      }
    }
  }
  
  lines.push('');
  lines.push('-'.repeat(60));
  
  // Reduction calculation
  const assumedFullLoad = 50 * 1024; // 50KB assumed without JIT
  const reduction = ((assumedFullLoad - context.totals.size) / assumedFullLoad * 100).toFixed(1);
  lines.push(`Estimated Reduction: ${reduction}% (vs 50KB full load)`);
  lines.push('');
  
  return lines.join('\n');
}

/**
 * Gera relatorio de self-report para AI
 */
function generateSelfReport(context) {
  const lines = [];
  
  lines.push('Contexto carregado:');
  lines.push(`- NIVEL 1: Kernel (${formatSize(context.levels.kernel?.totalSize || 0)})`);
  
  if (context.levels.core) {
    lines.push(`- NIVEL 2: Core (${formatSize(context.levels.core.totalSize)})`);
  }
  
  if (context.levels.skills) {
    const skillNames = context.levels.skills.loaded.map(s => s.name).join(', ');
    lines.push(`- NIVEL 3: Skills [${skillNames}] (${formatSize(context.levels.skills.totalSize)})`);
  }
  
  lines.push(`Total: ${formatSize(context.totals.size)} ${context.totals.withinBudget ? '' : ' OVER BUDGET'}`);
  
  return lines.join('\n');
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  CONFIG,
  loadKernel,
  loadCore,
  loadSkills,
  loadContext,
  loadContextCached,
  loadSkillIndex,
  resolveSkillPath,
  clearCache,
  formatContextReport,
  generateSelfReport,
  sizeKB,
  formatSize
};

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Itzamna PromptOS - JIT Loader v1.0.0

Uso:
  node jit-loader.js --kernel              Carrega apenas kernel (Level 1)
  node jit-loader.js --full                Carrega contexto completo
  node jit-loader.js --skills s1,s2,s3     Carrega skills especificas
  node jit-loader.js --index               Lista skills disponiveis
  node jit-loader.js --help                Mostra ajuda

Exemplos:
  node jit-loader.js --kernel
  node jit-loader.js --skills graphql-api,clean-code,software-testing
  node jit-loader.js --full --skills react,typescript

Niveis:
  Level 1 (Kernel): AGENTS.md, MEMORY.md (~2-3KB) - SEMPRE
  Level 2 (Core): input-classifier, master-router, tier-system (~3-7KB)
  Level 3 (JIT): 2-5 skills por tarefa (~4-10KB)

Budget Total: 20KB
Target: 10-16KB por tarefa (-68-76% reducao)
`);
    return;
  }

  const options = {
    baseDir: CONFIG.BASE_DIR,
    skills: [],
    includeCore: true
  };

  // Parse args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--kernel') {
      options.includeCore = false;
    } else if (args[i] === '--skills' && args[i + 1]) {
      options.skills = args[i + 1].split(',').map(s => s.trim());
      i++;
    } else if (args[i] === '--index') {
      const index = await loadSkillIndex();
      console.log('\nSkills Disponiveis:');
      console.log('-'.repeat(40));
      const byCategory = {};
      for (const [name, skill] of Object.entries(index)) {
        const cat = skill.category || 'general';
        if (!byCategory[cat]) byCategory[cat] = [];
        byCategory[cat].push(name);
      }
      for (const [cat, skills] of Object.entries(byCategory)) {
        console.log(`\n[${cat}]`);
        skills.forEach(s => console.log(`  - ${s}`));
      }
      return;
    }
  }

  // Load context
  const context = await loadContext(options);
  console.log(formatContextReport(context));
  
  // Show self-report format
  console.log('AI Self-Report Format:');
  console.log('-'.repeat(40));
  console.log(generateSelfReport(context));
}

// Run CLI if called directly
if (require.main === module) {
  main().catch(console.error);
}
