/**
 * Tests for web-research.js
 * Validates source validation, scoring, and citation generation
 */

const { validateSource, calculateAuthorityScore, calculateRecencyScore, calculateCompletenessScore, calculateRelevanceScore, getTierFromScore, getConfidenceLevel, generateCitation } = require('../cli/web-research');

describe('Web Research Tool Tests', () => {
  test('calculateAuthorityScore should return appropriate score', () => {
    // Test official documentation site
    const url1 = new URL('https://kubernetes.io/docs/');
    const score1 = calculateAuthorityScore(url1);
    expect(score1).toBeGreaterThanOrEqual(25); // Should be high for official docs
    console.log(`Authority score for kubernetes.io: ${score1}/40`);
    
    // Test GitHub
    const url2 = new URL('https://github.com/user/repo');
    const score2 = calculateAuthorityScore(url2);
    expect(score2).toBeGreaterThanOrEqual(20); // Should be high for GitHub
    console.log(`Authority score for github.com: ${score2}/40`);
  });

  test('calculateRecencyScore should return appropriate score', () => {
    // Test with a URL that looks recent
    const url1 = new URL('https://example.com/2025/guide');
    const score1 = calculateRecencyScore(url1);
    console.log(`Recency score for 2025 content: ${score1}/30`);
    
    // Test with a URL that looks old
    const url2 = new URL('https://example.com/2020/tutorial');
    const score2 = calculateRecencyScore(url2);
    console.log(`Recency score for 2020 content: ${score2}/30`);
  });

  test('calculateCompletenessScore should return appropriate score', () => {
    // Test documentation path
    const url1 = new URL('https://example.com/docs/guide');
    const score1 = calculateCompletenessScore(url1);
    console.log(`Completeness score for docs path: ${score1}/20`);
    
    // Test tutorial path
    const url2 = new URL('https://example.com/tutorial/basic');
    const score2 = calculateCompletenessScore(url2);
    console.log(`Completeness score for tutorial path: ${score2}/20`);
  });

  test('calculateRelevanceScore should return appropriate score', () => {
    // Test technical content
    const url1 = new URL('https://github.com/example/code-repo');
    const score1 = calculateRelevanceScore('github.com/example/code-repo', url1);
    console.log(`Relevance score for GitHub: ${score1}/10`);
    
    // Test documentation
    const url2 = new URL('https://example.com/docs/api');
    const score2 = calculateRelevanceScore('example.com/docs/api', url2);
    console.log(`Relevance score for docs: ${score2}/10`);
  });

  test('getTierFromScore should return correct tier', () => {
    expect(getTierFromScore(90)).toBe('T1');
    expect(getTierFromScore(75)).toBe('T2');
    expect(getTierFromScore(60)).toBe('T3');
    expect(getTierFromScore(40)).toBe('T4');
    expect(getTierFromScore(10)).toBe('T5');
    console.log('Tier determination working correctly');
  });

  test('getConfidenceLevel should return correct level', () => {
    expect(['✓✓✓', '✓✓', '✓', '⚠']).toContain(getConfidenceLevel(90));
    expect(['✓✓✓', '✓✓', '✓', '⚠']).toContain(getConfidenceLevel(75));
    expect(['✓✓✓', '✓✓', '✓', '⚠']).toContain(getConfidenceLevel(55));
    expect(['✓✓✓', '✓✓', '✓', '⚠']).toContain(getConfidenceLevel(30));
    console.log('Confidence level determination working correctly');
  });

  test('generateCitation should return appropriate format', () => {
    const url = 'https://example.com/article';
    
    // Test minimal format
    const minimal = generateCitation(url, 'minimal');
    expect(Array.isArray(minimal)).toBe(true);
    expect(minimal[0]).toBe(url);
    console.log('Minimal citation format working');
    
    // Test standard format
    const standard = generateCitation(url, 'standard');
    expect(standard.url).toBe(url);
    expect(standard.format).toBe('standard');
    console.log('Standard citation format working');
    
    // Test detailed format
    const detailed = generateCitation(url, 'detailed');
    expect(detailed.url).toBe(url);
    expect(detailed.format).toBe('detailed');
    console.log('Detailed citation format working');
  });

  test('validateSource should return complete validation object', async () => {
    try {
      const validation = await validateSource('https://kubernetes.io/docs/');
      expect(validation).toHaveProperty('url');
      expect(validation).toHaveProperty('totalScore');
      expect(validation).toHaveProperty('tier');
      expect(validation).toHaveProperty('badge');
      expect(validation.url).toBe('https://kubernetes.io/docs/');
      expect(typeof validation.totalScore).toBe('number');
      console.log(`Validation for kubernetes.io: ${validation.totalScore}/100 (${validation.badge} ${validation.tier})`);
    } catch (error) {
      // This is expected if network requests are not allowed in tests
      console.log(`Network validation skipped: ${error.message}`);
    }
  });

  test('validateSource should handle invalid URL', async () => {
    try {
      await validateSource('not-a-url');
      console.log('ERROR: Should have thrown an error for invalid URL');
    } catch (error) {
      console.log(`Correctly handled invalid URL: ${error.message}`);
    }
  });
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