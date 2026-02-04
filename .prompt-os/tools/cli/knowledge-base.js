#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - Knowledge Base Tool v1.0.0
 *
 * Usage:
 *   node knowledge-base.js search <query>              Search for relevant skills
 *   node knowledge-base.js similarity <skill1> <skill2>  Compare two skills
 *   node knowledge-base.js rag-context <query>        Get RAG context for generation
 *   node knowledge-base.js redundancy <new-skill>     Check for redundancy
 *
 * Implements: SPEC-004 Knowledge Retrieval & RAG
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// CONSTANTS
// ============================================================================

const SIGNAL_WEIGHTS = {
  NAME_TOPIC: 0.30,
  TAG_OVERLAP: 0.30,
  DOMAIN_MATCH: 0.20,
  DESCRIPTION_KEYWORD: 0.20
};

// ============================================================================
// HELPERS
// ============================================================================

const log = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`),
  debug: (msg) => console.log(`[DEBUG] ${msg}`)
};

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Load skills index for searching
 */
async function loadSkillsIndex() {
  // In a real implementation, this would read from .prompt-os/skills/INDEX.md
  // For this example, we'll return a mock list
  return [
    { 
      name: 'java', 
      description: 'Fundamentos da linguagem Java: tipagem estática, JVM, GC, threads', 
      tags: ['java', 'jvm', 'backend', 'oop'],
      level: 'L1',
      domain: 'backend'
    },
    { 
      name: 'python', 
      description: 'Fundamentos da linguagem Python: tipagem dinâmica com duck typing, GIL e concorrência', 
      tags: ['python', 'dynamic', 'scripting', 'data'],
      level: 'L1',
      domain: 'backend'
    },
    { 
      name: 'javascript', 
      description: 'Fundamentos da linguagem JavaScript: tipagem dinâmica, event loop single-threaded', 
      tags: ['javascript', 'frontend', 'nodejs', 'async'],
      level: 'L1',
      domain: 'frontend'
    },
    { 
      name: 'go', 
      description: 'Fundamentos da linguagem Go: goroutines, channels, interfaces, defer', 
      tags: ['go', 'golang', 'concurrency', 'backend'],
      level: 'L1',
      domain: 'backend'
    },
    { 
      name: 'kotlin', 
      description: 'Fundamentos da linguagem Kotlin: tipagem estática com null safety, coroutines', 
      tags: ['kotlin', 'android', 'jvm', 'coroutines'],
      level: 'L1',
      domain: 'mobile'
    },
    { 
      name: 'c-cpp', 
      description: 'Fundamentos de C e C++: tipagem estática, gerenciamento manual de memória, ponteiros', 
      tags: ['c', 'cpp', 'systems', 'performance'],
      level: 'L1',
      domain: 'systems'
    },
    { 
      name: 'java-8', 
      description: 'Java 8 features: lambdas, streams, Optional, default methods', 
      tags: ['java', 'java8', 'lambdas', 'streams'],
      level: 'L2',
      domain: 'backend'
    },
    { 
      name: 'java-11', 
      description: 'Java 11 (LTS) features: var, HttpClient, String methods', 
      tags: ['java', 'java11', 'lts', 'httpclient'],
      level: 'L2',
      domain: 'backend'
    },
    { 
      name: 'java-17', 
      description: 'Java 17 (LTS) features: sealed classes, records, pattern matching', 
      tags: ['java', 'java17', 'lts', 'records', 'sealed'],
      level: 'L2',
      domain: 'backend'
    },
    { 
      name: 'java-21', 
      description: 'Java 21 (LTS) features: virtual threads, pattern matching, sequenced collections', 
      tags: ['java', 'java21', 'lts', 'virtual-threads', 'records'],
      level: 'L2',
      domain: 'backend'
    },
    { 
      name: 'java-23', 
      description: 'Java 23 features: primitive patterns, flexible constructor bodies', 
      tags: ['java', 'java23', 'preview', 'patterns'],
      level: 'L2',
      domain: 'backend'
    },
    { 
      name: 'kotlin-1xx', 
      description: 'Kotlin 1.x features: extension functions, lambdas with receiver, DSLs', 
      tags: ['kotlin', 'kotlin1', 'dsl', 'extensions'],
      level: 'L2',
      domain: 'mobile'
    },
    { 
      name: 'kotlin-2xx', 
      description: 'Kotlin 2.x features: K2 compiler, context receivers, data objects', 
      tags: ['kotlin', 'kotlin2', 'k2', 'compiler'],
      level: 'L2',
      domain: 'mobile'
    }
  ];
}

/**
 * Calculate similarity score between a query and a skill
 */
function calculateSimilarity(query, skill) {
  const queryLower = query.toLowerCase();
  const skillNameLower = skill.name.toLowerCase();
  const skillDescLower = skill.description.toLowerCase();
  
  // Name/topic overlap (30%)
  const nameOverlap = calculateKeywordOverlap(queryLower, skillNameLower);
  
  // Tag overlap (30%)
  const tagOverlap = calculateTagOverlap(queryLower, skill.tags);
  
  // Domain match (20%)
  const domainMatch = queryLower.includes(skill.domain) ? 1 : 0;
  
  // Description keyword overlap (20%)
  const descOverlap = calculateKeywordOverlap(queryLower, skillDescLower);
  
  // Calculate weighted score
  const score = Math.round(
    (nameOverlap * SIGNAL_WEIGHTS.NAME_TOPIC * 100) +
    (tagOverlap * SIGNAL_WEIGHTS.TAG_OVERLAP * 100) +
    (domainMatch * SIGNAL_WEIGHTS.DOMAIN_MATCH * 100) +
    (descOverlap * SIGNAL_WEIGHTS.DESCRIPTION_KEYWORD * 100)
  );
  
  return {
    skill: skill.name,
    score: score,
    details: {
      nameOverlap: Math.round(nameOverlap * 100),
      tagOverlap: Math.round(tagOverlap * 100),
      domainMatch: Math.round(domainMatch * 100),
      descOverlap: Math.round(descOverlap * 100)
    }
  };
}

/**
 * Calculate keyword overlap between two strings
 */
function calculateKeywordOverlap(str1, str2) {
  const words1 = str1.split(/\W+/).filter(w => w.length > 2);
  const words2 = str2.split(/\W+/).filter(w => w.length > 2);
  
  const commonWords = words1.filter(word => words2.includes(word));
  const totalWords = [...new Set([...words1, ...words2])];
  
  return totalWords.length > 0 ? commonWords.length / totalWords.length : 0;
}

/**
 * Calculate tag overlap between query and skill tags
 */
function calculateTagOverlap(query, tags) {
  const queryWords = query.split(/\W+/).filter(w => w.length > 2);
  const tagWords = tags.flatMap(tag => tag.split(/\W+/).filter(w => w.length > 2));
  
  const commonWords = queryWords.filter(word => tagWords.includes(word));
  const totalWords = [...new Set([...queryWords, ...tagWords])];
  
  return totalWords.length > 0 ? commonWords.length / totalWords.length : 0;
}

/**
 * Search for relevant skills based on query
 */
async function searchSkills(query, topN = 3) {
  const skills = await loadSkillsIndex();
  const similarities = skills.map(skill => calculateSimilarity(query, skill));
  
  // Sort by score descending and return top N
  return similarities
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

/**
 * Compare similarity between two specific skills
 */
async function compareSkills(skill1Name, skill2Name) {
  const skills = await loadSkillsIndex();
  const skill1 = skills.find(s => s.name === skill1Name);
  const skill2 = skills.find(s => s.name === skill2Name);
  
  if (!skill1 || !skill2) {
    throw new Error(`One or both skills not found: ${skill1Name}, ${skill2Name}`);
  }
  
  // Calculate similarity of skill1 against skill2's description
  return calculateSimilarity(skill1.description, skill2);
}

/**
 * Get RAG context for generation based on query
 */
async function getRagContext(query) {
  // Get top 2-3 most similar skills as context
  const topSkills = await searchSkills(query, 3);
  
  // Load the actual skill content for context
  const contexts = [];
  for (const result of topSkills) {
    // In a real implementation, this would read the actual skill file content
    // For this example, we'll use the description
    const skills = await loadSkillsIndex();
    const skill = skills.find(s => s.name === result.skill);
    
    if (skill) {
      contexts.push({
        name: skill.name,
        description: skill.description,
        tags: skill.tags,
        score: result.score
      });
    }
  }
  
  return contexts;
}

/**
 * Check redundancy of a new skill against existing skills
 */
async function checkRedundancy(newSkill) {
  const skills = await loadSkillsIndex();
  const similarities = skills.map(skill => calculateSimilarity(newSkill.description || newSkill.query, skill));
  
  // Sort by score descending
  similarities.sort((a, b) => b.score - a.score);
  
  // Return high similarity matches (>= 80 for advisory, >= 90 for hard block)
  const highSimilarity = similarities.filter(s => s.score >= 80);
  
  return {
    allMatches: similarities,
    advisoryMatches: similarities.filter(s => s.score >= 80 && s.score < 90),
    hardBlockMatches: similarities.filter(s => s.score >= 90),
    hasHighSimilarity: highSimilarity.length > 0
  };
}

// ============================================================================
// CLI HANDLER
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
ITZAMNA PROMPTOS - Knowledge Base Tool v1.0.0

Usage:
  node knowledge-base.js search <query>              Search for relevant skills
  node knowledge-base.js similarity <skill1> <skill2>  Compare two skills
  node knowledge-base.js rag-context <query>        Get RAG context for generation
  node knowledge-base.js redundancy <new-skill>     Check for redundancy

Implements: SPEC-004 Knowledge Retrieval & RAG
`);
    process.exit(1);
  }
  
  const command = args[0];
  
  try {
    switch (command) {
      case 'search':
        if (!args[1]) {
          log.error("Please provide a search query");
          process.exit(1);
        }
        const query = args.slice(1).join(' ');
        const searchResults = await searchSkills(query);
        console.log(JSON.stringify(searchResults, null, 2));
        break;
        
      case 'similarity':
        if (args.length < 3) {
          log.error("Please provide two skill names to compare");
          process.exit(1);
        }
        const similarity = await compareSkills(args[1], args[2]);
        console.log(JSON.stringify(similarity, null, 2));
        break;
        
      case 'rag-context':
        if (!args[1]) {
          log.error("Please provide a query for RAG context");
          process.exit(1);
        }
        const ragQuery = args.slice(1).join(' ');
        const ragContext = await getRagContext(ragQuery);
        console.log(JSON.stringify(ragContext, null, 2));
        break;
        
      case 'redundancy':
        if (!args[1]) {
          log.error("Please provide a description or query for the new skill");
          process.exit(1);
        }
        const redundancyQuery = args.slice(1).join(' ');
        const redundancyCheck = await checkRedundancy({ query: redundancyQuery });
        console.log(JSON.stringify(redundancyCheck, null, 2));
        break;
        
      default:
        log.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    log.error(`Failed to execute command: ${error.message}`);
    process.exit(1);
  }
}

// ============================================================================
// RUN
// ============================================================================

if (require.main === module) {
  main();
}

module.exports = {
  searchSkills,
  compareSkills,
  getRagContext,
  checkRedundancy,
  calculateSimilarity,
  calculateKeywordOverlap,
  calculateTagOverlap,
  loadSkillsIndex
};