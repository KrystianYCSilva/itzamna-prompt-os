#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - Persona Generator Tool v1.0.0
 *
 * Usage:
 *   node persona-generator.js generate <description>     Generate persona from description
 *   node persona-generator.js list                    List all personas
 *   node persona-generator.js inspect <persona-name>  Inspect specific persona
 *   node persona-generator.js validate <persona-file> Validate persona file
 *
 * Implements: SPEC-005 Persona Generator Protocol
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// CONSTANTS
// ============================================================================

const LEVELS = ['junior', 'mid', 'senior', 'principal'];
const DOMAINS = ['backend', 'frontend', 'devops', 'mobile', 'data', 'security', 'qa', 'product'];

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
 * Generate a persona from a natural language description
 */
async function generatePersona(description) {
  // Extract keywords and infer persona attributes
  const personaAttributes = extractPersonaAttributes(description);
  
  // Select relevant skills based on domains and keywords
  const skills = await selectRelevantSkills(personaAttributes);
  
  // Generate behavioral traits based on level and domains
  const behavioralTraits = generateBehavioralTraits(personaAttributes.level, personaAttributes.domains);
  
  // Generate triggers based on role and domains
  const triggers = generateTriggers(personaAttributes.role, personaAttributes.domains);
  
  // Create the persona object
  const persona = {
    name: personaAttributes.name,
    role: personaAttributes.role,
    level: personaAttributes.level,
    domains: personaAttributes.domains,
    skills: skills,
    context: behavioralTraits,
    triggers: triggers,
    description: description
  };
  
  return persona;
}

/**
 * Extract persona attributes from description
 */
function extractPersonaAttributes(description) {
  const lowerDesc = description.toLowerCase();
  
  // Infer level
  let level = 'mid'; // default
  if (lowerDesc.includes('junior') || lowerDesc.includes('entry')) level = 'junior';
  if (lowerDesc.includes('senior') || lowerDesc.includes('expert')) level = 'senior';
  if (lowerDesc.includes('principal') || lowerDesc.includes('lead')) level = 'principal';
  
  // Infer domains
  const domains = [];
  for (const domain of DOMAINS) {
    if (lowerDesc.includes(domain)) {
      domains.push(domain);
    }
  }
  
  // If no domains found, try to infer from related terms
  if (domains.length === 0) {
    if (lowerDesc.includes('react') || lowerDesc.includes('angular') || lowerDesc.includes('vue')) domains.push('frontend');
    if (lowerDesc.includes('java') || lowerDesc.includes('python') || lowerDesc.includes('node')) domains.push('backend');
    if (lowerDesc.includes('mobile') || lowerDesc.includes('ios') || lowerDesc.includes('android')) domains.push('mobile');
    if (lowerDesc.includes('devops') || lowerDesc.includes('docker') || lowerDesc.includes('kubernetes')) domains.push('devops');
    if (lowerDesc.includes('data') || lowerDesc.includes('ml') || lowerDesc.includes('ai')) domains.push('data');
    if (lowerDesc.includes('security') || lowerDesc.includes('cyber')) domains.push('security');
  }
  
  // Generate role and name from description
  const role = generateRoleFromDescription(description, domains);
  const name = generateNameFromRole(role);
  
  return {
    name,
    role,
    level,
    domains: domains.length > 0 ? domains : ['general'],
    description
  };
}

/**
 * Generate role from description and domains
 */
function generateRoleFromDescription(description, domains) {
  // Simple mapping based on domains and keywords
  if (domains.includes('frontend')) {
    if (description.toLowerCase().includes('react')) return 'React Frontend Developer';
    if (description.toLowerCase().includes('angular')) return 'Angular Frontend Developer';
    return 'Frontend Developer';
  }
  
  if (domains.includes('backend')) {
    if (description.toLowerCase().includes('java')) return 'Java Backend Developer';
    if (description.toLowerCase().includes('python')) return 'Python Backend Developer';
    if (description.toLowerCase().includes('node')) return 'Node.js Backend Developer';
    return 'Backend Developer';
  }
  
  if (domains.includes('devops')) {
    return 'DevOps Engineer';
  }
  
  if (domains.includes('mobile')) {
    if (description.toLowerCase().includes('android')) return 'Android Developer';
    if (description.toLowerCase().includes('ios')) return 'iOS Developer';
    return 'Mobile Developer';
  }
  
  if (domains.includes('data')) {
    return 'Data Engineer';
  }
  
  if (domains.includes('security')) {
    return 'Security Engineer';
  }
  
  return 'Software Engineer'; // default
}

/**
 * Generate name from role
 */
function generateNameFromRole(role) {
  // Convert role to a slug-like name
  return role
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

/**
 * Select relevant skills based on persona attributes
 */
async function selectRelevantSkills(attributes) {
  // In a real implementation, this would query the skills index
  // For this example, we'll return a mock selection based on domains
  const allSkills = await loadSkillsIndex();
  
  // Filter skills by domain
  const relevantSkills = allSkills.filter(skill => {
    return attributes.domains.some(domain => 
      skill.tags.includes(domain) || 
      skill.domain === domain ||
      skill.name.includes(domain)
    );
  });
  
  // Sort by relevance (in a real implementation, this would be more sophisticated)
  relevantSkills.sort((a, b) => b.tags.length - a.tags.length);
  
  // Select 3-5 core skills and 2-3 secondary skills
  const coreSkills = relevantSkills.slice(0, Math.min(5, relevantSkills.length))
    .map(skill => skill.name);
  
  const secondarySkills = relevantSkills.slice(coreSkills.length, coreSkills.length + 3)
    .map(skill => skill.name);
  
  return {
    core: coreSkills,
    secondary: secondarySkills
  };
}

/**
 * Generate behavioral traits based on level and domains
 */
function generateBehavioralTraits(level, domains) {
  // Communication style based on level
  let communicationStyle = '';
  if (level === 'junior') {
    communicationStyle = 'learning-oriented, asks clarifying questions';
  } else if (level === 'senior') {
    communicationStyle = 'technical and mentoring, provides strategic guidance';
  } else if (level === 'principal') {
    communicationStyle = 'strategic and visionary, focuses on architecture and long-term decisions';
  } else {
    communicationStyle = 'balanced approach, collaborative problem-solving';
  }
  
  // Decision approach based on domains
  let decisionApproach = '';
  if (domains.includes('backend')) {
    decisionApproach = 'scalability-focused, considers performance implications';
  } else if (domains.includes('frontend')) {
    decisionApproach = 'UX-conscious, considers user experience implications';
  } else if (domains.includes('devops')) {
    decisionApproach = 'reliability-focused, considers deployment and operational aspects';
  } else if (domains.includes('data')) {
    decisionApproach = 'data-driven, considers analytics and insights implications';
  } else {
    decisionApproach = 'balanced approach, considers multiple perspectives';
  }
  
  // Collaboration mode (common across all personas)
  const collaborationMode = 'async-first with documentation, responsive to synchronous communication when needed';
  
  return {
    communicationStyle,
    decisionApproach,
    collaborationMode
  };
}

/**
 * Generate triggers based on role and domains
 */
function generateTriggers(role, domains) {
  const triggers = [];
  
  // Add role-based triggers
  triggers.push(...role.toLowerCase().split(/\s+/).filter(word => word.length > 3));
  
  // Add domain-based triggers
  triggers.push(...domains);
  
  // Add common technical terms based on domains
  if (domains.includes('frontend')) {
    triggers.push('ui', 'ux', 'react', 'angular', 'vue', 'javascript', 'css', 'html');
  }
  
  if (domains.includes('backend')) {
    triggers.push('api', 'server', 'database', 'microservices', 'architecture');
  }
  
  if (domains.includes('devops')) {
    triggers.push('deployment', 'ci/cd', 'docker', 'kubernetes', 'infrastructure');
  }
  
  if (domains.includes('mobile')) {
    triggers.push('mobile', 'ios', 'android', 'native', 'cross-platform');
  }
  
  // Remove duplicates and return
  return [...new Set(triggers)].slice(0, 8); // Max 8 triggers
}

/**
 * Load skills index for skill selection
 */
async function loadSkillsIndex() {
  // In a real implementation, this would read from .prompt-os/skills/INDEX.md
  // For this example, we'll return a mock list
  return [
    { 
      name: 'java', 
      description: 'Fundamentos da linguagem Java: tipagem estática, JVM, GC, threads', 
      tags: ['java', 'jvm', 'backend', 'oop'],
      domain: 'backend'
    },
    { 
      name: 'python', 
      description: 'Fundamentos da linguagem Python: tipagem dinâmica com duck typing, GIL e concorrência', 
      tags: ['python', 'dynamic', 'scripting', 'data'],
      domain: 'backend'
    },
    { 
      name: 'javascript', 
      description: 'Fundamentos da linguagem JavaScript: tipagem dinâmica, event loop single-threaded', 
      tags: ['javascript', 'frontend', 'nodejs', 'async'],
      domain: 'frontend'
    },
    { 
      name: 'go', 
      description: 'Fundamentos da linguagem Go: goroutines, channels, interfaces, defer', 
      tags: ['go', 'golang', 'concurrency', 'backend'],
      domain: 'backend'
    },
    { 
      name: 'kotlin', 
      description: 'Fundamentos da linguagem Kotlin: tipagem estática com null safety, coroutines', 
      tags: ['kotlin', 'android', 'jvm', 'coroutines'],
      domain: 'mobile'
    },
    { 
      name: 'c-cpp', 
      description: 'Fundamentos de C e C++: tipagem estática, gerenciamento manual de memória, ponteiros', 
      tags: ['c', 'cpp', 'systems', 'performance'],
      domain: 'systems'
    },
    { 
      name: 'docker-basics', 
      description: 'Fundamentos de containers com Docker: imagens, containers, volumes, redes', 
      tags: ['docker', 'containers', 'devops'],
      domain: 'devops'
    },
    { 
      name: 'kubernetes', 
      description: 'Orquestração de containers com Kubernetes: pods, deployments, services, ingress', 
      tags: ['kubernetes', 'k8s', 'orchestration', 'devops'],
      domain: 'devops'
    },
    { 
      name: 'api-design', 
      description: 'Boas práticas para design de APIs REST e GraphQL: versionamento, documentação, padrões', 
      tags: ['api', 'rest', 'graphql', 'design'],
      domain: 'backend'
    },
    { 
      name: 'testing-backend', 
      description: 'Estratégias de testes para backend: unitários, integração, contrato, carga', 
      tags: ['testing', 'unit', 'integration', 'backend'],
      domain: 'backend'
    }
  ];
}

/**
 * List all personas
 */
async function listPersonas() {
  // In a real implementation, this would scan the personas directory
  // For this example, we'll return a mock list
  return [
    { name: 'senior-backend-engineer', role: 'Backend Engineer', level: 'senior', domains: ['backend'], coreSkills: ['java', 'api-design', 'testing-backend'] },
    { name: 'junior-frontend-developer', role: 'Frontend Developer', level: 'junior', domains: ['frontend'], coreSkills: ['javascript', 'react'] },
    { name: 'devops-engineer', role: 'DevOps Engineer', level: 'mid', domains: ['devops'], coreSkills: ['docker-basics', 'kubernetes'] }
  ];
}

/**
 * Inspect a specific persona
 */
async function inspectPersona(personaName) {
  // In a real implementation, this would read the specific persona file
  // For this example, we'll return a mock persona if it matches known names
  const personas = await listPersonas();
  const persona = personas.find(p => p.name === personaName);
  
  if (!persona) {
    throw new Error(`Persona not found: ${personaName}`);
  }
  
  // Return detailed information about the persona
  return {
    ...persona,
    context: {
      communicationStyle: 'Technical and mentoring, provides strategic guidance',
      decisionApproach: 'Scalability-focused, considers performance implications',
      collaborationMode: 'Async-first with documentation, responsive to synchronous communication when needed'
    },
    triggers: ['backend', 'java', 'api', 'microservices', 'architecture'],
    skills: {
      core: ['java', 'api-design', 'testing-backend'],
      secondary: ['python', 'go']
    }
  };
}

/**
 * Validate a persona file
 */
async function validatePersona(personaFile) {
  try {
    const content = await fs.readFile(personaFile, 'utf8');
    
    // Parse the YAML frontmatter if present
    let personaData = {};
    if (content.startsWith('---')) {
      const parts = content.split('---');
      if (parts.length >= 3) {
        const yamlContent = parts[1];
        // Simple YAML parsing for required fields
        personaData = parseSimpleYaml(yamlContent);
      }
    } else {
      // If no YAML frontmatter, treat as JSON
      personaData = JSON.parse(content);
    }
    
    // Validate required fields
    const requiredFields = ['name', 'role', 'level', 'domains', 'skills', 'context', 'triggers'];
    const missingFields = requiredFields.filter(field => !(field in personaData));
    
    if (missingFields.length > 0) {
      return {
        valid: false,
        errors: [`Missing required fields: ${missingFields.join(', ')}`]
      };
    }
    
    // Validate level
    if (!LEVELS.includes(personaData.level)) {
      return {
        valid: false,
        errors: [`Invalid level: ${personaData.level}. Must be one of: ${LEVELS.join(', ')}`]
      };
    }
    
    // Validate domains
    if (!Array.isArray(personaData.domains) || personaData.domains.length === 0) {
      return {
        valid: false,
        errors: ['Domains must be a non-empty array']
      };
    }
    
    // Validate skills structure
    if (typeof personaData.skills !== 'object' || 
        !Array.isArray(personaData.skills.core)) {
      return {
        valid: false,
        errors: ['Skills must have a "core" array']
      };
    }
    
    // If we got here, the persona is valid
    return {
      valid: true,
      errors: []
    };
  } catch (error) {
    return {
      valid: false,
      errors: [`Error parsing persona file: ${error.message}`]
    };
  }
}

/**
 * Simple YAML parser for required fields
 */
function parseSimpleYaml(yamlContent) {
  const result = {};
  const lines = yamlContent.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      
      // Handle array values
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.substring(1, value.length - 1)
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''));  // Remove quotes
      } else {
        // Remove quotes from string values
        value = value.replace(/^["']|["']$/g, '');
      }
      
      result[key] = value;
    }
  }
  
  return result;
}

// ============================================================================
// CLI HANDLER
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
ITZAMNA PROMPTOS - Persona Generator Tool v1.0.0

Usage:
  node persona-generator.js generate <description>     Generate persona from description
  node persona-generator.js list                    List all personas
  node persona-generator.js inspect <persona-name>  Inspect specific persona
  node persona-generator.js validate <persona-file> Validate persona file

Implements: SPEC-005 Persona Generator Protocol
`);
    process.exit(1);
  }
  
  const command = args[0];
  
  try {
    switch (command) {
      case 'generate':
        if (!args[1]) {
          log.error("Please provide a description for the persona");
          process.exit(1);
        }
        const description = args.slice(1).join(' ');
        const persona = await generatePersona(description);
        console.log(JSON.stringify(persona, null, 2));
        break;
        
      case 'list':
        const personas = await listPersonas();
        console.log(JSON.stringify(personas, null, 2));
        break;
        
      case 'inspect':
        if (!args[1]) {
          log.error("Please provide a persona name to inspect");
          process.exit(1);
        }
        const inspectedPersona = await inspectPersona(args[1]);
        console.log(JSON.stringify(inspectedPersona, null, 2));
        break;
        
      case 'validate':
        if (!args[1]) {
          log.error("Please provide a persona file path to validate");
          process.exit(1);
        }
        const validation = await validatePersona(args[1]);
        console.log(JSON.stringify(validation, null, 2));
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
  generatePersona,
  extractPersonaAttributes,
  selectRelevantSkills,
  generateBehavioralTraits,
  generateTriggers,
  listPersonas,
  inspectPersona,
  validatePersona,
  parseSimpleYaml
};