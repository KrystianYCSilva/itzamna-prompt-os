# SPEC-005: Persona CLI

> **Status:** Draft
> **Priority:** P2 (Medium)
> **Estimated Effort:** 3-5 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-02
> **Depends On:** SPEC-001 (Self-Critique)
> **Target Version:** Backlog

---

## 1. Problem Statement

### 1.1 Current State

Atualmente, personas sao criadas **manualmente**:

```
personas/
└── senior-fullstack-developer/
    └── PERSONA.md         # Criado manualmente
```

**Limitacoes:**
- Processo manual e demorado
- Nao reutiliza skills existentes
- Nao ha padrao de qualidade
- Dificil manter consistencia entre personas

### 1.2 Desired State

O sistema deve permitir **geracao automatica de personas** via CLI:

```bash
node brain.js generate persona "Backend engineer especialista em microsservicos"
```

O sistema deve:
- Compor persona a partir de skills existentes
- Gerar template padronizado
- Passar pelo Human Gate para aprovacao
- Integrar com self-critique para validacao

### 1.3 Impact

| Sem Persona CLI | Com Persona CLI |
|-----------------|-----------------|
| Criacao manual ~30min | Geracao automatica ~2min |
| Skills nao reutilizadas | Composicao inteligente de skills |
| Sem padrao de qualidade | Self-critique + Human Gate |
| Dificil escalar | Pode criar muitas personas |

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. **G1:** Comando CLI para gerar personas: `brain generate persona "descricao"`
2. **G2:** Composicao automatica de skills existentes baseado na descricao
3. **G3:** Template padronizado para personas (YAML frontmatter + Markdown)
4. **G4:** Integracao com self-critique para validacao
5. **G5:** Human Gate para aprovacao antes de commit

### 2.2 Non-Goals

- **NG1:** Nao criar skills novas automaticamente (so compor existentes)
- **NG2:** Nao suportar multiplas personas por arquivo
- **NG3:** Nao implementar hierarquia de personas nesta fase
- **NG4:** Nao integrar com vector DB nesta fase (busca por keyword)

---

## 3. Solution Design

### 3.1 Architecture

```
Persona Generation Pipeline
========================================

[DESCRIBE] --> [MATCH SKILLS] --> [COMPOSE] --> [SELF-CRITIQUE] --> [HUMAN GATE] --> [COMMIT]
     |               |                |                |                  |               |
     v               v                v                v                  v               v
 "Backend      [skill1, skill2,   Generate       Validate         Show for        Save to
  engineer      skill3, ...]      PERSONA.md     quality          approval        personas/
  microservices"
```

### 3.2 Persona Template

```yaml
---
# PERSONA: {name}
# Version: 1.0.0
# Generated: {date}
# Generator: Itzamna PromptOS v{version}

name: "{name}"
role: "{role}"
level: "{junior|mid|senior|principal}"
domains: ["{domain1}", "{domain2}"]

# Skills compostas
skills:
  core:
    - "{skill1}"
    - "{skill2}"
  secondary:
    - "{skill3}"
    - "{skill4}"
  
# Contexto comportamental
context:
  communication_style: "{style}"
  decision_approach: "{approach}"
  collaboration_mode: "{mode}"

# Triggers para ativacao
triggers:
  - "{trigger1}"
  - "{trigger2}"
---

# {name}

## Identity

{description of who this persona is}

## Core Competencies

{list of main skills and expertise areas}

## Behavioral Traits

{how this persona approaches problems}

## Communication Style

{how this persona communicates}

## When to Activate

{scenarios where this persona is most useful}

## Integration with Skills

{how to combine with skill library}
```

### 3.3 Skill Matching Flow

```
Input: "Backend engineer especialista em microsservicos"
                    |
                    v
          [Extract Keywords]
           - backend
           - engineer
           - microsservicos
                    |
                    v
          [Search Skills by Domain]
           domain: "backend"
           tags: ["api", "microservices", "node"]
                    |
                    v
          [Score Skills]
           - nodejs-api: 0.9
           - docker-compose: 0.8
           - kubernetes: 0.7
           - graphql: 0.6
           - testing: 0.5
                    |
                    v
          [Select Top Skills]
           core: [nodejs-api, docker-compose, kubernetes]
           secondary: [graphql, testing, security]
                    |
                    v
          [Compose Persona]
```

### 3.4 Data Structures

```javascript
// Persona metadata
const PersonaMetadata = {
  name: 'backend-microservices-engineer',
  role: 'Backend Engineer',
  level: 'senior',
  domains: ['backend', 'devops'],
  skills: {
    core: ['nodejs-api', 'docker-compose', 'kubernetes'],
    secondary: ['graphql', 'testing', 'security']
  },
  context: {
    communication_style: 'technical and concise',
    decision_approach: 'data-driven with focus on scalability',
    collaboration_mode: 'async-first, documentation-heavy'
  },
  triggers: [
    'microservices',
    'backend architecture',
    'api design',
    'distributed systems'
  ]
};

// Persona generation result
const PersonaResult = {
  metadata: PersonaMetadata,
  content: '# Backend Microservices Engineer\n...',
  matchedSkills: [
    { name: 'nodejs-api', score: 0.9, reason: 'Domain match: backend' },
    { name: 'docker-compose', score: 0.8, reason: 'Tag match: microservices' }
  ],
  critique: {
    score: 82,
    suggestions: ['Add security skills', 'Consider observability']
  },
  filePath: 'personas/backend-microservices-engineer/PERSONA.md'
};
```

---

## 4. Implementation Plan

### 4.1 Task 1: Skill Matcher (Day 1)

```javascript
// .prompt-os/scripts/skill-matcher.js

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

class SkillMatcher {
  constructor() {
    this.skillsIndex = null;
  }
  
  async init() {
    this.skillsIndex = await this.loadSkillsIndex();
  }
  
  async loadSkillsIndex() {
    const indexPath = 'skills/INDEX.md';
    const content = await fs.readFile(indexPath, 'utf8');
    
    // Parse index to extract skills
    const skills = [];
    const skillRegex = /\|\s*\[([^\]]+)\]\([^\)]+\)\s*\|\s*([^\|]+)\s*\|\s*([^\|]+)\s*\|/g;
    let match;
    
    while ((match = skillRegex.exec(content)) !== null) {
      skills.push({
        name: match[1].trim(),
        description: match[2].trim(),
        category: match[3].trim()
      });
    }
    
    // Enrich with metadata from each skill file
    for (const skill of skills) {
      try {
        const metadata = await this.loadSkillMetadata(skill.name, skill.category);
        Object.assign(skill, metadata);
      } catch (e) {
        // Keep basic info if metadata unavailable
      }
    }
    
    return skills;
  }
  
  async loadSkillMetadata(name, category) {
    const filePath = `skills/${category}/${name}.md`;
    const content = await fs.readFile(filePath, 'utf8');
    
    // Extract YAML frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return {};
    
    const yaml = require('yaml');
    return yaml.parse(frontmatterMatch[1]);
  }
  
  /**
   * Encontra skills que matcham com uma descricao de persona
   * @param {string} description - Descricao da persona
   * @param {object} options - Opcoes de matching
   * @returns {MatchResult[]}
   */
  async matchSkills(description, options = {}) {
    const { maxCore = 5, maxSecondary = 5, threshold = 0.3 } = options;
    
    if (!this.skillsIndex) {
      await this.init();
    }
    
    const keywords = this.extractKeywords(description);
    const domains = this.extractDomains(description);
    
    // Score each skill
    const scored = this.skillsIndex.map(skill => ({
      ...skill,
      score: this.calculateScore(skill, keywords, domains),
      reasons: this.getMatchReasons(skill, keywords, domains)
    }));
    
    // Sort by score
    scored.sort((a, b) => b.score - a.score);
    
    // Filter by threshold and split into core/secondary
    const matched = scored.filter(s => s.score >= threshold);
    
    return {
      core: matched.slice(0, maxCore),
      secondary: matched.slice(maxCore, maxCore + maxSecondary),
      total: matched.length,
      keywords,
      domains
    };
  }
  
  extractKeywords(description) {
    // Tech keywords to look for
    const techTerms = [
      'react', 'vue', 'angular', 'node', 'python', 'java', 'go', 'rust',
      'docker', 'kubernetes', 'k8s', 'aws', 'azure', 'gcp', 'cloud',
      'api', 'rest', 'graphql', 'grpc', 'microservices', 'monolith',
      'database', 'sql', 'nosql', 'redis', 'mongodb', 'postgres',
      'frontend', 'backend', 'fullstack', 'devops', 'sre', 'security',
      'mobile', 'ios', 'android', 'react-native', 'flutter',
      'testing', 'ci', 'cd', 'pipeline', 'observability', 'monitoring'
    ];
    
    const lowerDesc = description.toLowerCase();
    return techTerms.filter(term => lowerDesc.includes(term));
  }
  
  extractDomains(description) {
    const domainMap = {
      frontend: ['react', 'vue', 'angular', 'css', 'ui', 'ux', 'frontend'],
      backend: ['api', 'node', 'python', 'java', 'backend', 'server'],
      devops: ['docker', 'kubernetes', 'ci', 'cd', 'pipeline', 'devops', 'sre'],
      database: ['sql', 'nosql', 'redis', 'mongo', 'postgres', 'database'],
      mobile: ['ios', 'android', 'mobile', 'react-native', 'flutter'],
      security: ['security', 'auth', 'encryption', 'vulnerability']
    };
    
    const lowerDesc = description.toLowerCase();
    const domains = [];
    
    for (const [domain, keywords] of Object.entries(domainMap)) {
      if (keywords.some(kw => lowerDesc.includes(kw))) {
        domains.push(domain);
      }
    }
    
    return domains.length > 0 ? domains : ['general'];
  }
  
  calculateScore(skill, keywords, domains) {
    let score = 0;
    
    // Domain match (40%)
    if (domains.includes(skill.category)) {
      score += 0.4;
    }
    
    // Keyword match in name (30%)
    const nameLower = skill.name.toLowerCase();
    const keywordMatches = keywords.filter(kw => nameLower.includes(kw));
    score += Math.min(keywordMatches.length * 0.1, 0.3);
    
    // Keyword match in tags (20%)
    if (skill.tags) {
      const tagMatches = keywords.filter(kw => 
        skill.tags.some(t => t.toLowerCase().includes(kw))
      );
      score += Math.min(tagMatches.length * 0.05, 0.2);
    }
    
    // Keyword match in description (10%)
    if (skill.description) {
      const descLower = skill.description.toLowerCase();
      const descMatches = keywords.filter(kw => descLower.includes(kw));
      score += Math.min(descMatches.length * 0.02, 0.1);
    }
    
    return Math.min(score, 1.0);
  }
  
  getMatchReasons(skill, keywords, domains) {
    const reasons = [];
    
    if (domains.includes(skill.category)) {
      reasons.push(`Domain match: ${skill.category}`);
    }
    
    const nameLower = skill.name.toLowerCase();
    const nameMatches = keywords.filter(kw => nameLower.includes(kw));
    if (nameMatches.length > 0) {
      reasons.push(`Name contains: ${nameMatches.join(', ')}`);
    }
    
    if (skill.tags) {
      const tagMatches = keywords.filter(kw => 
        skill.tags.some(t => t.toLowerCase().includes(kw))
      );
      if (tagMatches.length > 0) {
        reasons.push(`Tags match: ${tagMatches.join(', ')}`);
      }
    }
    
    return reasons;
  }
}

module.exports = { SkillMatcher };
```

### 4.2 Task 2: Persona Generator (Day 1-2)

```javascript
// .prompt-os/scripts/persona-generator.js

const { SkillMatcher } = require('./skill-matcher');

class PersonaGenerator {
  constructor() {
    this.skillMatcher = new SkillMatcher();
  }
  
  async init() {
    await this.skillMatcher.init();
  }
  
  /**
   * Gera uma persona baseado na descricao
   * @param {string} description - Descricao da persona desejada
   * @returns {PersonaResult}
   */
  async generate(description) {
    // Step 1: Match skills
    const matchResult = await this.skillMatcher.matchSkills(description);
    
    // Step 2: Infer persona attributes
    const attributes = this.inferAttributes(description, matchResult);
    
    // Step 3: Generate content
    const content = this.generateContent(attributes, matchResult);
    
    // Step 4: Create metadata
    const metadata = this.createMetadata(attributes, matchResult);
    
    return {
      metadata,
      content,
      matchedSkills: [
        ...matchResult.core.map(s => ({ ...s, tier: 'core' })),
        ...matchResult.secondary.map(s => ({ ...s, tier: 'secondary' }))
      ],
      filePath: `personas/${attributes.slug}/PERSONA.md`
    };
  }
  
  inferAttributes(description, matchResult) {
    // Infer level
    let level = 'mid';
    if (/senior|principal|staff|lead/i.test(description)) {
      level = 'senior';
    } else if (/junior|entry|beginner/i.test(description)) {
      level = 'junior';
    }
    
    // Infer role
    let role = 'Software Developer';
    if (/engineer/i.test(description)) role = role.replace('Developer', 'Engineer');
    if (/architect/i.test(description)) role = 'Software Architect';
    if (/devops|sre/i.test(description)) role = 'DevOps Engineer';
    if (/frontend/i.test(description)) role = 'Frontend ' + role.split(' ')[1];
    if (/backend/i.test(description)) role = 'Backend ' + role.split(' ')[1];
    if (/fullstack|full-stack/i.test(description)) role = 'Fullstack ' + role.split(' ')[1];
    
    // Infer name
    const name = this.generateName(description, matchResult);
    
    // Infer communication style
    const communicationStyle = level === 'senior' 
      ? 'Technical and mentoring, explains rationale'
      : 'Clear and learning-oriented';
    
    // Infer decision approach
    const decisionApproach = level === 'senior'
      ? 'Strategic, considers long-term implications'
      : 'Practical, follows established patterns';
    
    return {
      name,
      slug: this.toSlug(name),
      role,
      level,
      domains: matchResult.domains,
      communicationStyle,
      decisionApproach,
      collaborationMode: 'Async-first with documentation'
    };
  }
  
  generateName(description, matchResult) {
    // Extract key concepts for name
    const parts = [];
    
    // Add level if specified
    if (/senior/i.test(description)) parts.push('Senior');
    else if (/principal|staff/i.test(description)) parts.push('Principal');
    
    // Add primary domain
    if (matchResult.domains.length > 0) {
      const domainNames = {
        frontend: 'Frontend',
        backend: 'Backend',
        devops: 'DevOps',
        database: 'Data',
        mobile: 'Mobile',
        security: 'Security'
      };
      parts.push(domainNames[matchResult.domains[0]] || 'Software');
    }
    
    // Add role type
    if (/architect/i.test(description)) {
      parts.push('Architect');
    } else if (/engineer/i.test(description)) {
      parts.push('Engineer');
    } else {
      parts.push('Developer');
    }
    
    return parts.join(' ');
  }
  
  toSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }
  
  createMetadata(attributes, matchResult) {
    return {
      name: attributes.name,
      role: attributes.role,
      level: attributes.level,
      domains: attributes.domains,
      skills: {
        core: matchResult.core.map(s => s.name),
        secondary: matchResult.secondary.map(s => s.name)
      },
      context: {
        communication_style: attributes.communicationStyle,
        decision_approach: attributes.decisionApproach,
        collaboration_mode: attributes.collaborationMode
      },
      triggers: this.generateTriggers(attributes, matchResult)
    };
  }
  
  generateTriggers(attributes, matchResult) {
    const triggers = [];
    
    // Add domain triggers
    for (const domain of attributes.domains) {
      triggers.push(domain);
    }
    
    // Add skill-based triggers
    for (const skill of matchResult.core.slice(0, 3)) {
      triggers.push(skill.name.replace(/-/g, ' '));
    }
    
    // Add role triggers
    triggers.push(attributes.role.toLowerCase());
    
    return [...new Set(triggers)];
  }
  
  generateContent(attributes, matchResult) {
    const coreSkillsList = matchResult.core
      .map(s => `- **${s.name}**: ${s.description || 'Core competency'}`)
      .join('\n');
    
    const secondarySkillsList = matchResult.secondary
      .map(s => `- **${s.name}**: ${s.description || 'Secondary skill'}`)
      .join('\n');
    
    const triggerslist = this.generateTriggers(attributes, matchResult)
      .map(t => `- "${t}"`)
      .join('\n');
    
    const yaml = require('yaml');
    const metadata = this.createMetadata(attributes, matchResult);
    
    return `---
# PERSONA: ${attributes.name}
# Version: 1.0.0
# Generated: ${new Date().toISOString().split('T')[0]}
# Generator: Itzamna PromptOS

${yaml.stringify(metadata)}---

# ${attributes.name}

## Identity

You are a **${attributes.level} ${attributes.role}** with expertise in ${attributes.domains.join(', ')}. 
You bring ${attributes.level === 'senior' ? 'years of' : 'growing'} experience in building and maintaining 
production systems.

## Core Competencies

These are your primary areas of expertise:

${coreSkillsList}

## Secondary Skills

Additional skills that complement your core competencies:

${secondarySkillsList}

## Behavioral Traits

### Communication Style
${attributes.communicationStyle}

### Decision Making
${attributes.decisionApproach}

### Collaboration
${attributes.collaborationMode}

## When to Activate

Activate this persona when the context involves:

${triggerslist}

## Integration with Skills

When activated, this persona automatically loads the following skills:

### Core Skills (Always Active)
${matchResult.core.map(s => `1. \`${s.name}\``).join('\n')}

### Secondary Skills (On-Demand)
${matchResult.secondary.map(s => `1. \`${s.name}\``).join('\n')}

## Example Interactions

### Example 1: Architecture Discussion
\`\`\`
User: How should we design the authentication system?

${attributes.name}: Based on my experience with ${matchResult.core[0]?.name || 'similar systems'}, 
I recommend...
\`\`\`

### Example 2: Code Review
\`\`\`
User: Can you review this implementation?

${attributes.name}: Looking at this code from a ${attributes.level} ${attributes.role} perspective...
\`\`\`

---

*Generated by Itzamna PromptOS Persona Generator*
`;
  }
}

module.exports = { PersonaGenerator };
```

### 4.3 Task 3: CLI Integration (Day 2-3)

```javascript
// Adicoes ao brain.js

const { PersonaGenerator } = require('./persona-generator');
const { evaluateSkill } = require('./self-critique');

let personaGenerator = null;

async function initPersonaGenerator() {
  if (!personaGenerator) {
    personaGenerator = new PersonaGenerator();
    await personaGenerator.init();
  }
}

/**
 * Comando para gerar persona
 * @param {string} description - Descricao da persona
 */
async function generatePersonaCommand(description) {
  log.header('PERSONA GENERATOR');
  
  // Validate input
  if (!description || description.length < 10) {
    console.error('Erro: Forneca uma descricao detalhada da persona (min 10 chars)');
    console.log('Exemplo: node brain.js generate persona "Senior backend engineer especialista em APIs REST e microsservicos"');
    process.exit(1);
  }
  
  await initPersonaGenerator();
  
  // Step 1: Generate persona
  log.step(1, 'GENERATING - Criando persona...');
  console.log(`Descricao: "${description}"\n`);
  
  const result = await personaGenerator.generate(description);
  
  // Step 2: Show matched skills
  log.step(2, 'SKILLS MATCHED - Skills encontradas...');
  
  console.log('\nCore Skills:');
  for (const skill of result.matchedSkills.filter(s => s.tier === 'core')) {
    console.log(`  [${(skill.score * 100).toFixed(0)}%] ${skill.name}`);
    if (skill.reasons.length > 0) {
      console.log(`       ${skill.reasons[0]}`);
    }
  }
  
  console.log('\nSecondary Skills:');
  for (const skill of result.matchedSkills.filter(s => s.tier === 'secondary')) {
    console.log(`  [${(skill.score * 100).toFixed(0)}%] ${skill.name}`);
  }
  
  // Step 3: Self-critique
  log.step(3, 'SELF-CRITIQUE - Validando qualidade...');
  
  const critique = evaluateSkill(result.content, []);
  
  console.log(`\nScore: ${critique.score}/100`);
  
  if (critique.suggestions.length > 0) {
    console.log('\nSugestoes:');
    critique.suggestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  }
  
  // Step 4: Human Gate
  log.step(4, 'HUMAN GATE - Aprovacao necessaria...');
  
  console.log('\n' + '='.repeat(60));
  console.log('PREVIEW DA PERSONA:');
  console.log('='.repeat(60));
  console.log(result.content.substring(0, 1500) + '\n...');
  console.log('='.repeat(60));
  
  const approval = await humanGate({
    type: 'persona',
    name: result.metadata.name,
    content: result.content,
    path: result.filePath
  });
  
  if (approval.action === 'approve') {
    // Step 5: Save persona
    log.step(5, 'COMMIT - Salvando persona...');
    
    await savePersona(result);
    
    console.log(`\nPersona salva em: ${result.filePath}`);
    console.log(`Skills integradas: ${result.metadata.skills.core.length} core, ${result.metadata.skills.secondary.length} secondary`);
    
  } else if (approval.action === 'edit') {
    console.log('\nAbrindo editor...');
    // Open in editor for manual adjustments
    await openInEditor(result.content, result.filePath);
    
  } else {
    console.log('\nPersona rejeitada.');
    
    if (approval.reason) {
      // Log rejection for learning
      await logRejection('persona', result.metadata.name, approval.reason);
    }
  }
}

async function savePersona(result) {
  const fs = require('fs').promises;
  const path = require('path');
  
  // Create directory
  const dir = path.dirname(result.filePath);
  await fs.mkdir(dir, { recursive: true });
  
  // Save persona
  await fs.writeFile(result.filePath, result.content);
  
  // Update personas index if exists
  try {
    await updatePersonasIndex(result.metadata);
  } catch (e) {
    console.warn('Could not update personas index');
  }
}

async function updatePersonasIndex(metadata) {
  const fs = require('fs').promises;
  const indexPath = 'personas/INDEX.md';
  
  let content;
  try {
    content = await fs.readFile(indexPath, 'utf8');
  } catch {
    content = `# Personas Index

| Persona | Role | Level | Core Skills |
|---------|------|-------|-------------|
`;
  }
  
  const newRow = `| [${metadata.name}](./${metadata.name.toLowerCase().replace(/\s+/g, '-')}/PERSONA.md) | ${metadata.role} | ${metadata.level} | ${metadata.skills.core.slice(0, 3).join(', ')} |`;
  
  content += newRow + '\n';
  
  await fs.writeFile(indexPath, content);
}

// Export for CLI
module.exports = { generatePersonaCommand };
```

### 4.4 Task 4: List and Inspect Commands (Day 3-4)

```javascript
// Comandos adicionais para personas

/**
 * Lista todas as personas
 */
async function listPersonasCommand() {
  const fs = require('fs').promises;
  const { glob } = require('glob');
  
  const personaFiles = await glob('personas/*/PERSONA.md');
  
  if (personaFiles.length === 0) {
    console.log('Nenhuma persona encontrada.');
    return;
  }
  
  console.log('\n=== PERSONAS ===\n');
  
  for (const file of personaFiles) {
    const content = await fs.readFile(file, 'utf8');
    const metadata = parsePersonaMetadata(content);
    
    if (metadata) {
      console.log(`${metadata.name}`);
      console.log(`  Role: ${metadata.role}`);
      console.log(`  Level: ${metadata.level}`);
      console.log(`  Domains: ${metadata.domains?.join(', ') || 'N/A'}`);
      console.log(`  Core Skills: ${metadata.skills?.core?.length || 0}`);
      console.log(`  Path: ${file}\n`);
    }
  }
}

/**
 * Inspeciona uma persona especifica
 */
async function inspectPersonaCommand(name) {
  const fs = require('fs').promises;
  const { glob } = require('glob');
  
  // Find persona
  const personaFiles = await glob(`personas/*${name}*/PERSONA.md`);
  
  if (personaFiles.length === 0) {
    console.error(`Persona "${name}" nao encontrada.`);
    return;
  }
  
  const file = personaFiles[0];
  const content = await fs.readFile(file, 'utf8');
  const metadata = parsePersonaMetadata(content);
  
  console.log('\n=== PERSONA DETAILS ===\n');
  console.log(`Name: ${metadata.name}`);
  console.log(`Role: ${metadata.role}`);
  console.log(`Level: ${metadata.level}`);
  console.log(`Domains: ${metadata.domains?.join(', ')}`);
  
  console.log('\nCore Skills:');
  for (const skill of metadata.skills?.core || []) {
    console.log(`  - ${skill}`);
  }
  
  console.log('\nSecondary Skills:');
  for (const skill of metadata.skills?.secondary || []) {
    console.log(`  - ${skill}`);
  }
  
  console.log('\nTriggers:');
  for (const trigger of metadata.triggers || []) {
    console.log(`  - "${trigger}"`);
  }
  
  console.log('\nContext:');
  console.log(`  Communication: ${metadata.context?.communication_style}`);
  console.log(`  Decision: ${metadata.context?.decision_approach}`);
  console.log(`  Collaboration: ${metadata.context?.collaboration_mode}`);
  
  console.log(`\nPath: ${file}`);
}

function parsePersonaMetadata(content) {
  const yaml = require('yaml');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) return null;
  
  try {
    return yaml.parse(frontmatterMatch[1]);
  } catch {
    return null;
  }
}

/**
 * Atualiza persona existente
 */
async function updatePersonaCommand(name, description) {
  console.log(`Atualizando persona "${name}" com novas skills baseado em: "${description}"`);
  
  // TODO: Implement update logic
  // 1. Load existing persona
  // 2. Match new skills based on description
  // 3. Merge with existing skills
  // 4. Self-critique
  // 5. Human Gate
  // 6. Save updated persona
}
```

### 4.5 Task 5: Tests (Day 4-5)

```javascript
// .prompt-os/scripts/test-persona-cli.js

const { SkillMatcher } = require('./skill-matcher');
const { PersonaGenerator } = require('./persona-generator');

async function testSkillMatcher() {
  console.log('\n=== TEST: Skill Matcher ===\n');
  
  const matcher = new SkillMatcher();
  await matcher.init();
  
  const testCases = [
    'Backend engineer especialista em APIs REST',
    'Frontend developer React com experiencia em TypeScript',
    'DevOps engineer com foco em Kubernetes e CI/CD',
    'Fullstack developer Node.js e React',
    'Senior architect de microsservicos'
  ];
  
  for (const desc of testCases) {
    console.log(`\nInput: "${desc}"`);
    
    const result = await matcher.matchSkills(desc);
    
    console.log(`Keywords: ${result.keywords.join(', ')}`);
    console.log(`Domains: ${result.domains.join(', ')}`);
    console.log(`Core skills: ${result.core.map(s => s.name).join(', ')}`);
    console.log(`Secondary: ${result.secondary.map(s => s.name).join(', ')}`);
  }
}

async function testPersonaGenerator() {
  console.log('\n=== TEST: Persona Generator ===\n');
  
  const generator = new PersonaGenerator();
  await generator.init();
  
  const description = 'Senior backend engineer especialista em microsservicos com Node.js e Kubernetes';
  
  console.log(`Generating persona for: "${description}"\n`);
  
  const result = await generator.generate(description);
  
  console.log('Metadata:');
  console.log(JSON.stringify(result.metadata, null, 2));
  
  console.log('\nMatched Skills:');
  for (const skill of result.matchedSkills) {
    console.log(`  [${skill.tier}] ${skill.name} (${(skill.score * 100).toFixed(0)}%)`);
  }
  
  console.log('\nOutput path:', result.filePath);
  console.log('\nContent preview:');
  console.log(result.content.substring(0, 500) + '...');
}

async function runTests() {
  await testSkillMatcher();
  await testPersonaGenerator();
  
  console.log('\n=== ALL TESTS COMPLETE ===\n');
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testSkillMatcher, testPersonaGenerator };
```

---

## 5. Success Criteria

### 5.1 Functional Requirements

| ID | Requirement | Validation |
|----|-------------|------------|
| FR1 | CLI command funcional | `brain generate persona "desc"` executa |
| FR2 | Skills matched corretamente | Backend desc -> backend skills |
| FR3 | Persona template valido | YAML frontmatter + Markdown |
| FR4 | Human Gate integrado | Mostra preview, permite approve/reject |
| FR5 | Arquivo salvo corretamente | personas/{slug}/PERSONA.md |

### 5.2 Quality Metrics

| Metrica | Target | Como Medir |
|---------|--------|------------|
| Tempo de geracao | < 30s | Timer no comando |
| Skills relevantes | > 80% | Revisao humana das matches |
| Aprovacao first-try | > 60% | Taxa de aprovacao no Human Gate |
| Template completo | 100% | Todas secoes preenchidas |

---

## 6. Risks and Mitigations

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| Skills insuficientes | Media | Alto | Sugerir criar skills antes |
| Match incorreto | Media | Medio | Human Gate para revisao |
| Descricao vaga | Alta | Baixo | Pedir mais detalhes |

---

## 7. Dependencies

| Dependencia | Tipo | Status |
|-------------|------|--------|
| SPEC-001 (Self-Critique) | Interna | Required |
| brain.js v1.1.0 | Interna | OK |
| skills/INDEX.md | Interna | OK |
| yaml (npm) | Externa | Install |

---

## 8. Timeline

| Fase | Duracao | Deliverable |
|------|---------|-------------|
| Day 1 | 1 dia | skill-matcher.js |
| Day 1-2 | 1.5 dias | persona-generator.js |
| Day 2-3 | 1 dia | CLI integration |
| Day 3-4 | 1 dia | List/inspect commands |
| Day 4-5 | 0.5 dia | Tests + docs |

**Total:** 5 dias

---

## 9. Future Considerations

### 9.1 Vector DB Integration

Com SPEC-004, usar busca semantica:

```javascript
async function matchSkillsSemantic(description) {
  const embedding = await embed(description);
  return await vectorStore.query(embedding, { topK: 10 });
}
```

### 9.2 Persona Hierarchy

```javascript
const hierarchy = {
  'tech-lead': {
    extends: 'senior-developer',
    additionalSkills: ['team-management', 'architecture'],
    modifiedBehavior: { decision_approach: 'Team-oriented' }
  }
};
```

### 9.3 Persona Composition

```javascript
// Combine multiple personas
const hybridPersona = compose(
  personas['backend-engineer'],
  personas['devops-engineer'],
  { weights: [0.7, 0.3] }
);
```

---

*SPEC-005 | Persona CLI | v1.0.0 | 2026-02-02*
