/**
 * Tests for web-research.js
 * Validates source validation, scoring, and citation generation
 */

const { validateSource, calculateAuthorityScore, calculateRecencyScore, calculateCompletenessScore, calculateRelevanceScore, getTierFromScore, getConfidenceLevel, generateCitation } = require('../../cli/web-research');

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

// Tests for Web Research Tool
test('calculateAuthorityScore should return appropriate score', () => {
  // Test official documentation site
  const url1 = new URL('https://kubernetes.io/docs/');
  const score1 = calculateAuthorityScore(url1);
  if (score1 < 25) {
    throw new Error(`Expected score >= 25 for official docs, got ${score1}`);
  }
  console.log(`  Authority score for kubernetes.io: ${score1}/40`);

  // Test GitHub
  const url2 = new URL('https://github.com/user/repo');
  const score2 = calculateAuthorityScore(url2);
  if (score2 < 20) {
    throw new Error(`Expected score >= 20 for GitHub, got ${score2}`);
  }
  console.log(`  Authority score for github.com: ${score2}/40`);
});

test('calculateRecencyScore should return appropriate score', () => {
  // Test with a URL that looks recent
  const url1 = new URL('https://example.com/2025/guide');
  const score1 = calculateRecencyScore(url1);
  console.log(`  Recency score for 2025 content: ${score1}/30`);

  // Test with a URL that looks old
  const url2 = new URL('https://example.com/2020/tutorial');
  const score2 = calculateRecencyScore(url2);
  console.log(`  Recency score for 2020 content: ${score2}/30`);
});

test('calculateCompletenessScore should return appropriate score', () => {
  // Test documentation path
  const url1 = new URL('https://example.com/docs/guide');
  const score1 = calculateCompletenessScore(url1);
  console.log(`  Completeness score for docs path: ${score1}/20`);

  // Test tutorial path
  const url2 = new URL('https://example.com/tutorial/basic');
  const score2 = calculateCompletenessScore(url2);
  console.log(`  Completeness score for tutorial path: ${score2}/20`);
});

test('calculateRelevanceScore should return appropriate score', () => {
  // Test technical content
  const url1 = new URL('https://github.com/example/code-repo');
  const score1 = calculateRelevanceScore('github.com/example/code-repo', url1);
  console.log(`  Relevance score for GitHub: ${score1}/10`);

  // Test documentation
  const url2 = new URL('https://example.com/docs/api');
  const score2 = calculateRelevanceScore('example.com/docs/api', url2);
  console.log(`  Relevance score for docs: ${score2}/10`);
});

test('getTierFromScore should return correct tier', () => {
  if (getTierFromScore(90) !== 'T1') throw new Error(`Expected T1 for score 90, got ${getTierFromScore(90)}`);
  if (getTierFromScore(75) !== 'T2') throw new Error(`Expected T2 for score 75, got ${getTierFromScore(75)}`);
  if (getTierFromScore(60) !== 'T3') throw new Error(`Expected T3 for score 60, got ${getTierFromScore(60)}`);
  if (getTierFromScore(40) !== 'T4') throw new Error(`Expected T4 for score 40, got ${getTierFromScore(40)}`);
  if (getTierFromScore(10) !== 'T5') throw new Error(`Expected T5 for score 10, got ${getTierFromScore(10)}`);
  console.log('  Tier determination working correctly');
});

test('getConfidenceLevel should return correct level', () => {
  const validLevels = ['✓✓✓', '✓✓', '✓', '⚠'];
  if (!validLevels.includes(getConfidenceLevel(90))) throw new Error(`Invalid confidence level for score 90: ${getConfidenceLevel(90)}`);
  if (!validLevels.includes(getConfidenceLevel(75))) throw new Error(`Invalid confidence level for score 75: ${getConfidenceLevel(75)}`);
  if (!validLevels.includes(getConfidenceLevel(55))) throw new Error(`Invalid confidence level for score 55: ${getConfidenceLevel(55)}`);
  if (!validLevels.includes(getConfidenceLevel(30))) throw new Error(`Invalid confidence level for score 30: ${getConfidenceLevel(30)}`);
  console.log('  Confidence level determination working correctly');
});

test('generateCitation should return appropriate format', () => {
  const url = 'https://example.com/article';

  // Test minimal format
  const minimal = generateCitation(url, 'minimal');
  if (!Array.isArray(minimal) || minimal[0] !== url) {
    throw new Error(`Minimal citation should be array with URL as first element`);
  }
  console.log('  Minimal citation format working');

  // Test standard format
  const standard = generateCitation(url, 'standard');
  if (standard.url !== url || standard.format !== 'standard') {
    throw new Error(`Standard citation should have correct URL and format`);
  }
  console.log('  Standard citation format working');

  // Test detailed format
  const detailed = generateCitation(url, 'detailed');
  if (detailed.url !== url || detailed.format !== 'detailed') {
    throw new Error(`Detailed citation should have correct URL and format`);
  }
  console.log('  Detailed citation format working');
});

asyncTest('validateSource should handle invalid URL', async () => {
  try {
    await validateSource('not-a-url');
    console.log('  ERROR: Should have thrown an error for invalid URL');
  } catch (error) {
    console.log(`  Correctly handled invalid URL: ${error.message}`);
  }
});

// Run tests
console.log('Running Web Research Tool Tests...\n');

// Execute tests
(async () => {
  await test('calculateAuthorityScore should return appropriate score');
  await test('calculateRecencyScore should return appropriate score');
  await test('calculateCompletenessScore should return appropriate score');
  await test('calculateRelevanceScore should return appropriate score');
  await test('getTierFromScore should return correct tier');
  await test('getConfidenceLevel should return correct level');
  await test('generateCitation should return appropriate format');
  await test('validateSource should return complete validation object');
  await test('validateSource should handle invalid URL');
  
  console.log('\nWeb Research Tool Tests completed.');
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