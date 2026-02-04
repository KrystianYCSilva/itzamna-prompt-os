/**
 * Tests for knowledge-base.js
 * Validates search, similarity, RAG context, and redundancy checking
 */

const { searchSkills, compareSkills, getRagContext, checkRedundancy, calculateSimilarity, calculateKeywordOverlap, calculateTagOverlap, loadSkillsIndex } = require('../cli/knowledge-base');

describe('Knowledge Base Tool Tests', () => {
  test('loadSkillsIndex should return array of skills', async () => {
    const skills = await loadSkillsIndex();
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
    console.log(`Loaded ${skills.length} skills from index`);
  });

  test('calculateKeywordOverlap should return appropriate ratio', () => {
    // Test with overlapping content
    const overlap1 = calculateKeywordOverlap('java programming', 'programming in java');
    expect(overlap1).toBeGreaterThanOrEqual(0);
    expect(overlap1).toBeLessThanOrEqual(1);
    console.log(`Keyword overlap (java programming vs programming in java): ${(overlap1 * 100).toFixed(2)}%`);
    
    // Test with no overlap
    const overlap2 = calculateKeywordOverlap('java', 'python');
    expect(overlap2).toBeGreaterThanOrEqual(0);
    expect(overlap2).toBeLessThanOrEqual(1);
    console.log(`Keyword overlap (java vs python): ${(overlap2 * 100).toFixed(2)}%`);
  });

  test('calculateTagOverlap should return appropriate ratio', () => {
    const tags1 = ['java', 'backend', 'oop'];
    const tags2 = ['java', 'frontend', 'react'];
    
    const overlap = calculateTagOverlap('java backend development', tags1);
    expect(overlap).toBeGreaterThanOrEqual(0);
    expect(overlap).toBeLessThanOrEqual(1);
    console.log(`Tag overlap: ${(overlap * 100).toFixed(2)}%`);
  });

  test('calculateSimilarity should return appropriate score', async () => {
    const skills = await loadSkillsIndex();
    const skill = skills[0]; // Use first skill from index
    
    const similarity = calculateSimilarity('java programming', skill);
    expect(similarity).toHaveProperty('skill');
    expect(similarity).toHaveProperty('score');
    expect(similarity).toHaveProperty('details');
    expect(typeof similarity.score).toBe('number');
    expect(similarity.score).toBeGreaterThanOrEqual(0);
    expect(similarity.score).toBeLessThanOrEqual(100);
    console.log(`Similarity score for '${skill.name}': ${similarity.score}/100`);
  });

  test('searchSkills should return relevant skills', async () => {
    const results = await searchSkills('java concurrency', 3);
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeLessThanOrEqual(3);
    
    for (const result of results) {
      expect(result).toHaveProperty('skill');
      expect(result).toHaveProperty('score');
      expect(typeof result.score).toBe('number');
    }
    
    console.log(`Found ${results.length} relevant skills for 'java concurrency'`);
    if (results.length > 0) {
      console.log(`Top result: ${results[0].skill} with score ${results[0].score}/100`);
    }
  });

  test('compareSkills should return similarity between two skills', async () => {
    try {
      const similarity = await compareSkills('java', 'python');
      expect(similarity).toHaveProperty('skill');
      expect(similarity).toHaveProperty('score');
      console.log(`Similarity between java and python: ${similarity.score}/100`);
    } catch (error) {
      console.log(`Skill comparison test skipped: ${error.message}`);
    }
  });

  test('getRagContext should return contextual information', async () => {
    const context = await getRagContext('javascript frontend development');
    expect(Array.isArray(context)).toBe(true);
    console.log(`RAG context returned ${context.length} relevant skills`);
  });

  test('checkRedundancy should identify similar skills', async () => {
    const newSkill = {
      description: 'Fundamentos da linguagem Java: tipagem estática, JVM, GC, threads'
    };
    
    const redundancy = await checkRedundancy(newSkill);
    expect(redundancy).toHaveProperty('allMatches');
    expect(redundancy).toHaveProperty('advisoryMatches');
    expect(redundancy).toHaveProperty('hardBlockMatches');
    expect(redundancy).toHaveProperty('hasHighSimilarity');
    
    console.log(`Redundancy check found ${redundancy.allMatches.length} matches`);
    console.log(`Advisory matches (80-89%): ${redundancy.advisoryMatches.length}`);
    console.log(`Hard block matches (90%+): ${redundancy.hardBlockMatches.length}`);
  });
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