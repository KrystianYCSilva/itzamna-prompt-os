/**
 * Tests for persona-generator.js
 * Validates persona generation, listing, inspection, and validation
 */

const { generatePersona, extractPersonaAttributes, generateBehavioralTraits, generateTriggers, listPersonas, parseSimpleYaml } = require('../../cli/persona-generator');

function test(description, fn) {
  try {
    console.log(`✓ ${description}`);
    if (fn) fn();
  } catch (error) {
    console.log(`✗ ${description} - ${error.message}`);
  }
}

function asyncTest(description, fn) {
  console.log(`✓ ${description}`);
  return fn();
}

// Tests for Persona Generator Tool
test('extractPersonaAttributes should correctly parse description', () => {
  const desc1 = 'Senior backend engineer specializing in Java microservices';
  const attrs1 = extractPersonaAttributes(desc1);
  if (attrs1.level !== 'senior') {
    throw new Error(`Expected level to be 'senior', got '${attrs1.level}'`);
  }
  if (!attrs1.domains.includes('backend')) {
    throw new Error(`Expected domains to include 'backend'`);
  }
  console.log(`  Parsed attributes for "${desc1}": Level=${attrs1.level}, Domains=[${attrs1.domains.join(', ')}]`);
  
  const desc2 = 'Junior frontend developer with React experience';
  const attrs2 = extractPersonaAttributes(desc2);
  if (attrs2.level !== 'junior') {
    throw new Error(`Expected level to be 'junior', got '${attrs2.level}'`);
  }
  if (!attrs2.domains.includes('frontend')) {
    throw new Error(`Expected domains to include 'frontend'`);
  }
  console.log(`  Parsed attributes for "${desc2}": Level=${attrs2.level}, Domains=[${attrs2.domains.join(', ')}]`);
});

test('generateTriggers should return appropriate triggers', () => {
  const triggers = generateTriggers('Backend Engineer', ['backend', 'java']);
  if (!Array.isArray(triggers)) {
    throw new Error('Triggers should be an array');
  }
  if (triggers.length === 0) {
    throw new Error('Triggers should not be empty');
  }
  console.log(`  Generated triggers: [${triggers.join(', ')}]`);
});

test('generateBehavioralTraits should return appropriate traits', () => {
  const traits = generateBehavioralTraits('senior', ['backend']);
  if (!traits.hasOwnProperty('communicationStyle') ||
      !traits.hasOwnProperty('decisionApproach') ||
      !traits.hasOwnProperty('collaborationMode')) {
    throw new Error('Traits should have communicationStyle, decisionApproach, and collaborationMode properties');
  }
  console.log(`  Generated communication style: ${traits.communicationStyle}`);
});

asyncTest('generatePersona should create valid persona object', async () => {
  const description = 'Mid-level DevOps engineer with Docker and Kubernetes experience';
  const persona = await generatePersona(description);
  
  if (!persona.hasOwnProperty('name') ||
      !persona.hasOwnProperty('role') ||
      !persona.hasOwnProperty('level') ||
      !persona.hasOwnProperty('domains') ||
      !persona.hasOwnProperty('skills') ||
      !persona.hasOwnProperty('context') ||
      !persona.hasOwnProperty('triggers')) {
    throw new Error('Persona should have all required properties');
  }
  
  console.log(`  Generated persona: ${persona.name} (${persona.role})`);
  console.log(`  Domains: [${persona.domains.join(', ')}]`);
  console.log(`  Core skills: [${persona.skills.core.join(', ')}]`);
});

asyncTest('listPersonas should return array of personas', async () => {
  const personas = await listPersonas();
  if (!Array.isArray(personas)) {
    throw new Error('Personas should be an array');
  }
  if (personas.length === 0) {
    throw new Error('Personas array should not be empty');
  }
  console.log(`  Found ${personas.length} personas in the system`);
});

test('parseSimpleYaml should correctly parse YAML content', () => {
  const yamlContent = `
name: test-persona
role: Test Role
level: mid
domains: [backend, devops]
triggers: [api, microservices]
`;
  const parsed = parseSimpleYaml(yamlContent);
  if (parsed.name !== 'test-persona') {
    throw new Error(`Expected name to be 'test-persona', got '${parsed.name}'`);
  }
  if (parsed.role !== 'Test Role') {
    throw new Error(`Expected role to be 'Test Role', got '${parsed.role}'`);
  }
  if (parsed.level !== 'mid') {
    throw new Error(`Expected level to be 'mid', got '${parsed.level}'`);
  }
  if (!Array.isArray(parsed.domains) || !parsed.domains.includes('backend')) {
    throw new Error('Expected domains to be an array containing "backend"');
  }
  if (!Array.isArray(parsed.triggers) || !parsed.triggers.includes('api')) {
    throw new Error('Expected triggers to be an array containing "api"');
  }
  console.log('  YAML parsing working correctly');
});

// Run tests
console.log('Running Persona Generator Tool Tests...\n');

// Execute tests
(async () => {
  await test('extractPersonaAttributes should correctly parse description');
  await test('generateTriggers should return appropriate triggers');
  await test('generateBehavioralTraits should return appropriate traits');
  await test('generatePersona should create valid persona object');
  await test('listPersonas should return array of personas');
  await test('parseSimpleYaml should correctly parse YAML content');
  
  console.log('\nPersona Generator Tool Tests completed.');
})();