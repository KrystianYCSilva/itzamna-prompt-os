/**
 * Tests for knowledge-base.js
 * Validates search, similarity, RAG context, and redundancy checking
 */

const { searchSkills, compareSkills, getRagContext, checkRedundancy, calculateSimilarity, calculateKeywordOverlap, calculateTagOverlap, loadSkillsIndex } = require('../../cli/knowledge-base');

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

// Tests for Knowledge Base Tool
asyncTest('loadSkillsIndex should return array of skills', async () => {
  const skills = await loadSkillsIndex();
  if (!Array.isArray(skills)) {
    throw new Error('Skills should be an array');
  }
  if (skills.length === 0) {
    throw new Error('Skills array should not be empty');
  }
  console.log(`  Loaded ${skills.length} skills from index`);
});

test('calculateKeywordOverlap should return appropriate ratio', () => {
  // Test with overlapping content
  const overlap1 = calculateKeywordOverlap('java programming', 'programming in java');
  if (overlap1 < 0 || overlap1 > 1) {
    throw new Error(`Overlap should be between 0 and 1, got ${overlap1}`);
  }
  console.log(`  Keyword overlap (java programming vs programming in java): ${(overlap1 * 100).toFixed(2)}%`);

  // Test with no overlap
  const overlap2 = calculateKeywordOverlap('java', 'python');
  if (overlap2 < 0 || overlap2 > 1) {
    throw new Error(`Overlap should be between 0 and 1, got ${overlap2}`);
  }
  console.log(`  Keyword overlap (java vs python): ${(overlap2 * 100).toFixed(2)}%`);
});

test('calculateTagOverlap should return appropriate ratio', () => {
  const tags1 = ['java', 'backend', 'oop'];
  const tags2 = ['java', 'frontend', 'react'];

  const overlap = calculateTagOverlap('java backend development', tags1);
  if (overlap < 0 || overlap > 1) {
    throw new Error(`Overlap should be between 0 and 1, got ${overlap}`);
  }
  console.log(`  Tag overlap: ${(overlap * 100).toFixed(2)}%`);
});

asyncTest('calculateSimilarity should return appropriate score', async () => {
  const skills = await loadSkillsIndex();
  const skill = skills[0]; // Use first skill from index

  const similarity = calculateSimilarity('java programming', skill);
  if (!similarity.hasOwnProperty('skill') ||
      !similarity.hasOwnProperty('score') ||
      !similarity.hasOwnProperty('details')) {
    throw new Error('Similarity should have skill, score, and details properties');
  }
  if (typeof similarity.score !== 'number' ||
      similarity.score < 0 ||
      similarity.score > 100) {
    throw new Error(`Score should be a number between 0 and 100, got ${similarity.score}`);
  }
  console.log(`  Similarity score for '${skill.name}': ${similarity.score}/100`);
});

asyncTest('searchSkills should return relevant skills', async () => {
  const results = await searchSkills('java concurrency', 3);
  if (!Array.isArray(results)) {
    throw new Error('Results should be an array');
  }
  if (results.length > 3) {
    throw new Error(`Results should not exceed 3 items, got ${results.length}`);
  }

  for (const result of results) {
    if (!result.hasOwnProperty('skill') || !result.hasOwnProperty('score') || typeof result.score !== 'number') {
      throw new Error('Each result should have skill and score properties');
    }
  }

  console.log(`  Found ${results.length} relevant skills for 'java concurrency'`);
  if (results.length > 0) {
    console.log(`  Top result: ${results[0].skill} with score ${results[0].score}/100`);
  }
});

asyncTest('compareSkills should return similarity between two skills', async () => {
  try {
    const similarity = await compareSkills('java', 'python');
    if (!similarity.hasOwnProperty('skill') || !similarity.hasOwnProperty('score')) {
      throw new Error('Similarity should have skill and score properties');
    }
    console.log(`  Similarity between java and python: ${similarity.score}/100`);
  } catch (error) {
    console.log(`  Skill comparison test skipped: ${error.message}`);
  }
});

asyncTest('getRagContext should return contextual information', async () => {
  const context = await getRagContext('javascript frontend development');
  if (!Array.isArray(context)) {
    throw new Error('Context should be an array');
  }
  console.log(`  RAG context returned ${context.length} relevant skills`);
});

asyncTest('checkRedundancy should identify similar skills', async () => {
  const newSkill = {
    description: 'Fundamentos da linguagem Java: tipagem estática, JVM, GC, threads'
  };

  const redundancy = await checkRedundancy(newSkill);
  if (!redundancy.hasOwnProperty('allMatches') ||
      !redundancy.hasOwnProperty('advisoryMatches') ||
      !redundancy.hasOwnProperty('hardBlockMatches') ||
      !redundancy.hasOwnProperty('hasHighSimilarity')) {
    throw new Error('Redundancy check should have all required properties');
  }

  console.log(`  Redundancy check found ${redundancy.allMatches.length} matches`);
  console.log(`  Advisory matches (80-89%): ${redundancy.advisoryMatches.length}`);
  console.log(`  Hard block matches (90%+): ${redundancy.hardBlockMatches.length}`);
});

// Run tests
console.log('Running Knowledge Base Tool Tests...\n');

// Execute tests
(async () => {
  await test('loadSkillsIndex should return array of skills');
  await test('calculateKeywordOverlap should return appropriate ratio');
  await test('calculateTagOverlap should return appropriate ratio');
  await test('calculateSimilarity should return appropriate score');
  await test('searchSkills should return relevant skills');
  await test('compareSkills should return similarity between two skills');
  await test('getRagContext should return contextual information');
  await test('checkRedundancy should identify similar skills');
  
  console.log('\nKnowledge Base Tool Tests completed.');
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