#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - Self-Critique Tool v1.0.0
 *
 * Usage:
 *   node self-critique.js evaluate <artifact-file>     Evaluate quality of an artifact
 *   node self-critique.js score <artifact-file>      Get only the quality score
 *   node self-critique.js suggest <artifact-file>    Get improvement suggestions
 *   node self-critique.js breakdown <artifact-file>  Get detailed breakdown by dimension
 *
 * Implements: SPEC-001 Self-Critique Protocol Enhancement
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// CONSTANTS
// ============================================================================

const DIMENSIONS = {
  COMPLETENESS: { weight: 25, label: 'Completeness' },
  CLARITY: { weight: 25, label: 'Clarity' },
  CORRECTNESS: { weight: 25, label: 'Correctness' },
  BEST_PRACTICES: { weight: 25, label: 'Best Practices' }
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
// CORE EVALUATION FUNCTIONS
// ============================================================================

/**
 * Evaluate an artifact across all dimensions
 */
async function evaluateArtifact(artifactPath) {
  const content = await fs.readFile(artifactPath, 'utf8');
  
  // Calculate scores for each dimension
  const completenessScore = evaluateCompleteness(content);
  const clarityScore = evaluateClarity(content);
  const correctnessScore = evaluateCorrectness(content);
  const bestPracticesScore = evaluateBestPractices(content);

  const totalScore = Math.round(
    (completenessScore * DIMENSIONS.COMPLETENESS.weight / 100) +
    (clarityScore * DIMENSIONS.CLARITY.weight / 100) +
    (correctnessScore * DIMENSIONS.CORRECTNESS.weight / 100) +
    (bestPracticesScore * DIMENSIONS.BEST_PRACTICES.weight / 100)
  );

  return {
    totalScore,
    dimensions: {
      completeness: { score: completenessScore, max: 25 },
      clarity: { score: clarityScore, max: 25 },
      correctness: { score: correctnessScore, max: 25 },
      bestPractices: { score: bestPracticesScore, max: 25 }
    },
    suggestions: getImprovementSuggestions({
      completeness: completenessScore,
      clarity: clarityScore,
      correctness: correctnessScore,
      bestPractices: bestPracticesScore
    }, content)
  };
}

/**
 * Evaluate completeness of an artifact
 */
function evaluateCompleteness(content) {
  // Basic heuristics for completeness
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const hasTitle = /#\s+.+/.test(content);
  const hasDescription = content.length > 100; // At least 100 chars
  const hasStructure = (content.match(/##\s+/g) || []).length >= 2; // At least 2 sections
  
  let score = 0;
  
  if (hasTitle) score += 8;
  if (hasDescription) score += 8;
  if (hasStructure) score += 9;
  
  return Math.min(score, 25); // Cap at 25
}

/**
 * Evaluate clarity of an artifact
 */
function evaluateClarity(content) {
  // Basic heuristics for clarity
  const avgLineLength = content.split('\n')
    .reduce((sum, line) => sum + line.length, 0) / content.split('\n').length;
  const hasShortLines = avgLineLength < 120; // Good if under 120 chars avg
  const hasLists = /(-|\*|\d+\.)\s+.+/.test(content); // Has bullet points or numbered lists
  const hasCodeBlocks = /```[\s\S]*?```/.test(content); // Has code examples
  
  let score = 0;
  
  if (hasShortLines) score += 10;
  if (hasLists) score += 8;
  if (hasCodeBlocks) score += 7;
  
  return Math.min(score, 25); // Cap at 25
}

/**
 * Evaluate correctness of an artifact
 */
function evaluateCorrectness(content) {
  // Basic heuristics for correctness
  const hasExamples = (content.match(/\*\*Example\*\*|\*\*Sample\*\*|```/gi) || []).length > 0;
  const hasValidation = /validate|verify|check|test/gi.test(content);
  const hasRequirements = /requirement|mvp|constraint/gi.test(content);
  
  let score = 0;
  
  if (hasExamples) score += 10;
  if (hasValidation) score += 8;
  if (hasRequirements) score += 7;
  
  return Math.min(score, 25); // Cap at 25
}

/**
 * Evaluate best practices of an artifact
 */
function evaluateBestPractices(content) {
  // Basic heuristics for best practices
  const hasStandards = /standard|best practice|guideline/gi.test(content);
  const hasPatterns = /pattern|approach|method/gi.test(content);
  const hasOptimization = /optimize|performance|efficiency/gi.test(content);
  
  let score = 0;
  
  if (hasStandards) score += 9;
  if (hasPatterns) score += 8;
  if (hasOptimization) score += 8;
  
  return Math.min(score, 25); // Cap at 25
}

/**
 * Generate improvement suggestions based on scores
 */
function getImprovementSuggestions(scores, content) {
  const suggestions = [];
  
  if (scores.completeness < 20) {
    suggestions.push("Consider adding more sections or expanding existing ones");
    if (!content.match(/##\s+/g) || (content.match(/##\s+/g) || []).length < 3) {
      suggestions.push("Add at least 2-3 more sections to improve structure");
    }
  }
  
  if (scores.clarity < 20) {
    if (content.split('\n').some(line => line.length > 150)) {
      suggestions.push("Break down long lines for better readability");
    }
    if (!(content.match(/(-|\*|\d+\.)\s+.+/g) || []).length) {
      suggestions.push("Use bullet points or numbered lists to organize information");
    }
  }
  
  if (scores.correctness < 20) {
    if (!(content.match(/\*\*Example\*\*|\*\*Sample\*\*|```/gi) || []).length) {
      suggestions.push("Include examples or code samples to illustrate concepts");
    }
  }
  
  if (scores.bestPractices < 20) {
    suggestions.push("Consider adding information about best practices or standards");
  }
  
  return suggestions.slice(0, 5); // Max 5 suggestions
}

// ============================================================================
// CLI HANDLER
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
ITZAMNA PROMPTOS - Self-Critique Tool v1.0.0

Usage:
  node self-critique.js evaluate <artifact-file>     Evaluate quality of an artifact
  node self-critique.js score <artifact-file>      Get only the quality score
  node self-critique.js suggest <artifact-file>    Get improvement suggestions
  node self-critique.js breakdown <artifact-file>  Get detailed breakdown by dimension

Implements: SPEC-001 Self-Critique Protocol Enhancement
`);
    process.exit(1);
  }
  
  const command = args[0];
  const artifactPath = args[1];
  
  if (!artifactPath) {
    log.error("Please provide a path to the artifact file");
    process.exit(1);
  }
  
  try {
    const evaluation = await evaluateArtifact(artifactPath);
    
    switch (command) {
      case 'evaluate':
        console.log(JSON.stringify(evaluation, null, 2));
        break;
        
      case 'score':
        console.log(evaluation.totalScore);
        break;
        
      case 'suggest':
        console.log(evaluation.suggestions.join('\n'));
        break;
        
      case 'breakdown':
        console.log(`Total Score: ${evaluation.totalScore}/100\n`);
        console.log(`Completeness: ${evaluation.dimensions.completeness.score}/${evaluation.dimensions.completeness.max}`);
        console.log(`Clarity: ${evaluation.dimensions.clarity.score}/${evaluation.dimensions.clarity.max}`);
        console.log(`Correctness: ${evaluation.dimensions.correctness.score}/${evaluation.dimensions.correctness.max}`);
        console.log(`Best Practices: ${evaluation.dimensions.bestPractices.score}/${evaluation.dimensions.bestPractices.max}`);
        console.log(`\nSuggestions:\n${evaluation.suggestions.join('\n')}`);
        break;
        
      default:
        log.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    log.error(`Failed to evaluate artifact: ${error.message}`);
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
  evaluateArtifact,
  evaluateCompleteness,
  evaluateClarity,
  evaluateCorrectness,
  evaluateBestPractices,
  getImprovementSuggestions
};