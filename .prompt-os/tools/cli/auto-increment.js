#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - Auto-Increment Tool v1.0.0
 *
 * Usage:
 *   node auto-increment.js detect-gap <request-text>     Detect knowledge gaps
 *   node auto-increment.js log-rejection <artifact>     Log a rejected artifact
 *   node auto-increment.js suggest-skills              Proactively suggest skills
 *   node auto-increment.js evolution-report            Generate evolution report
 *
 * Implements: SPEC-002 Auto-Increment Protocol
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// CONSTANTS
// ============================================================================

const REJECTION_CATEGORIES = [
  'examples', 'specificity', 'clarity', 'completeness', 'relevance', 'other'
];

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
 * Detect knowledge gaps based on user request
 */
async function detectKnowledgeGap(requestText) {
  // This is a simplified version - in a real implementation, this would
  // check against the skills INDEX.md to see if a skill exists for the request
  const skillsIndex = await getSkillsIndex();
  const requestLower = requestText.toLowerCase();
  
  // Simple keyword matching against skill names and tags
  const matchingSkills = skillsIndex.filter(skill => {
    const skillText = `${skill.name} ${skill.tags.join(' ')}`.toLowerCase();
    return skillText.includes(requestLower);
  });
  
  if (matchingSkills.length === 0) {
    return {
      hasGap: true,
      suggestedSkillName: generateSuggestedSkillName(requestText),
      requestText: requestText,
      status: 'pending'
    };
  }
  
  return {
    hasGap: false,
    matchingSkills: matchingSkills
  };
}

/**
 * Log a rejected artifact
 */
async function logRejection(artifactName, reason, category) {
  if (!REJECTION_CATEGORIES.includes(category)) {
    throw new Error(`Invalid category: ${category}. Must be one of: ${REJECTION_CATEGORIES.join(', ')}`);
  }
  
  const rejectionRecord = {
    date: new Date().toISOString(),
    artifactName,
    reason,
    category,
    timestamp: Date.now()
  };
  
  // In a real implementation, this would append to agent-specific memory
  // For this example, we'll just return the record
  return rejectionRecord;
}

/**
 * Generate evolution report
 */
async function generateEvolutionReport() {
  // This would aggregate data from agent memories and global statistics
  // For this example, we'll return a mock report
  return {
    reportingPeriod: `${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()} to ${new Date().toISOString()}`,
    skillsCreated: 5,
    skillsUpdated: 3,
    approvalRate: 85,
    gapsDetected: 12,
    gapsResolved: 7,
    topGaps: [
      { name: 'kafka', count: 4 },
      { name: 'docker', count: 3 },
      { name: 'kubernetes', count: 2 }
    ],
    rejectionPatterns: [
      { category: 'examples', percentage: 40 },
      { category: 'clarity', percentage: 25 },
      { category: 'completeness', percentage: 20 }
    ],
    suggestedActions: [
      'Validate all examples before Human Gate',
      'Provide more specific requirements',
      'Add more detailed descriptions'
    ]
  };
}

/**
 * Get skills index for gap detection
 */
async function getSkillsIndex() {
  // This would normally read from .prompt-os/skills/INDEX.md
  // For this example, we'll return a mock list
  return [
    { name: 'java', tags: ['java', 'jvm', 'backend'] },
    { name: 'python', tags: ['python', 'scripting', 'data'] },
    { name: 'javascript', tags: ['javascript', 'frontend', 'nodejs'] },
    { name: 'go', tags: ['go', 'golang', 'backend', 'concurrency'] },
    { name: 'kotlin', tags: ['kotlin', 'android', 'jvm'] },
    { name: 'c-cpp', tags: ['c', 'cpp', 'systems', 'performance'] }
  ];
}

/**
 * Generate suggested skill name from request text
 */
function generateSuggestedSkillName(requestText) {
  // Convert to kebab-case
  return requestText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .trim();
}

// ============================================================================
// CLI HANDLER
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
ITZAMNA PROMPTOS - Auto-Increment Tool v1.0.0

Usage:
  node auto-increment.js detect-gap <request-text>     Detect knowledge gaps
  node auto-increment.js log-rejection <artifact>     Log a rejected artifact
  node auto-increment.js suggest-skills              Proactively suggest skills
  node auto-increment.js evolution-report            Generate evolution report

Implements: SPEC-002 Auto-Increment Protocol
`);
    process.exit(1);
  }
  
  const command = args[0];
  
  try {
    switch (command) {
      case 'detect-gap':
        if (!args[1]) {
          log.error("Please provide request text for gap detection");
          process.exit(1);
        }
        const gapResult = await detectKnowledgeGap(args[1]);
        console.log(JSON.stringify(gapResult, null, 2));
        break;
        
      case 'log-rejection':
        if (args.length < 3) {
          log.error("Please provide artifact name and reason for rejection");
          process.exit(1);
        }
        const artifactName = args[1];
        const reason = args[2];
        const category = args[3] || 'other';
        
        const rejectionRecord = await logRejection(artifactName, reason, category);
        console.log(JSON.stringify(rejectionRecord, null, 2));
        break;
        
      case 'suggest-skills':
        // For this example, we'll just return a mock list
        // In reality, this would analyze agent memory for frequently requested topics
        const suggestions = [
          { topic: 'kafka', requestCount: 4, status: 'recommended' },
          { topic: 'docker', requestCount: 3, status: 'recommended' },
          { topic: 'kubernetes', requestCount: 2, status: 'considering' }
        ];
        console.log(JSON.stringify(suggestions, null, 2));
        break;
        
      case 'evolution-report':
        const report = await generateEvolutionReport();
        console.log(JSON.stringify(report, null, 2));
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
  detectKnowledgeGap,
  logRejection,
  generateEvolutionReport,
  getSkillsIndex,
  generateSuggestedSkillName
};