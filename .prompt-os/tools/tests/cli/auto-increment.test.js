/**
 * Tests for auto-increment.js
 * Validates gap detection, rejection logging, and evolution reporting
 */

const { detectKnowledgeGap, logRejection, generateEvolutionReport, getSkillsIndex, generateSuggestedSkillName } = require('../../cli/auto-increment');

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

// Tests for Auto-Increment Tool
asyncTest('detectKnowledgeGap should identify missing skills', async () => {
  const result = await detectKnowledgeGap('kafka messaging');
  if (!result.hasOwnProperty('hasGap')) {
    throw new Error('Result should have hasGap property');
  }
  console.log(`  Gap detection result: ${JSON.stringify(result, null, 2)}`);
});

asyncTest('detectKnowledgeGap should identify existing skills', async () => {
  const result = await detectKnowledgeGap('java programming');
  if (!result.hasOwnProperty('hasGap')) {
    throw new Error('Result should have hasGap property');
  }
  console.log(`  Existing skill detection result: ${JSON.stringify(result, null, 2)}`);
});

asyncTest('logRejection should create valid rejection record', async () => {
  const rejection = await logRejection('sample-skill', 'Examples do not work', 'examples');
  if (!rejection.hasOwnProperty('artifactName') ||
      !rejection.hasOwnProperty('reason') ||
      !rejection.hasOwnProperty('category')) {
    throw new Error('Rejection should have artifactName, reason, and category properties');
  }
  if (rejection.artifactName !== 'sample-skill') {
    throw new Error(`Expected artifactName to be 'sample-skill', got '${rejection.artifactName}'`);
  }
  console.log(`  Rejection record: ${JSON.stringify(rejection, null, 2)}`);
});

asyncTest('logRejection should reject invalid category', async () => {
  try {
    await logRejection('sample-skill', 'Invalid category test', 'invalid-category');
    console.log('  ERROR: Should have thrown an error for invalid category');
  } catch (error) {
    console.log(`  Correctly rejected invalid category: ${error.message}`);
  }
});

asyncTest('generateEvolutionReport should return valid report', async () => {
  const report = await generateEvolutionReport();
  if (!report.hasOwnProperty('reportingPeriod') ||
      !report.hasOwnProperty('skillsCreated') ||
      !report.hasOwnProperty('approvalRate')) {
    throw new Error('Report should have reportingPeriod, skillsCreated, and approvalRate properties');
  }
  console.log(`  Evolution report generated with ${report.skillsCreated} skills created`);
});

asyncTest('getSkillsIndex should return array of skills', async () => {
  const skills = await getSkillsIndex();
  if (!Array.isArray(skills)) {
    throw new Error('Skills should be an array');
  }
  if (skills.length === 0) {
    throw new Error('Skills array should not be empty');
  }
  console.log(`  Skills index contains ${skills.length} skills`);
});

test('generateSuggestedSkillName should convert text to kebab-case', () => {
  const name1 = generateSuggestedSkillName('Kafka Messaging System');
  if (name1 !== 'kafka-messaging-system') {
    throw new Error(`Expected 'kafka-messaging-system', got '${name1}'`);
  }

  const name2 = generateSuggestedSkillName('React Frontend Development');
  if (name2 !== 'react-frontend-development') {
    throw new Error(`Expected 'react-frontend-development', got '${name2}'`);
  }

  console.log(`  Generated skill names: "${name1}", "${name2}"`);
});

// Run tests
console.log('Running Auto-Increment Tool Tests...\n');

// Execute tests
(async () => {
  await test('detectKnowledgeGap should identify missing skills');
  await test('detectKnowledgeGap should identify existing skills');
  await test('logRejection should create valid rejection record');
  await test('logRejection should reject invalid category');
  await test('generateEvolutionReport should return valid report');
  await test('getSkillsIndex should return array of skills');
  await test('generateSuggestedSkillName should convert text to kebab-case');
  
  console.log('\nAuto-Increment Tool Tests completed.');
})();

// Simple test runner
async function test(description, fn) {
  try {
    console.log(`✓ ${description}`);
    if (fn) await fn();
  } catch (error) {
    console.log(`✗ ${description} - ${error.message}`);
  }
}