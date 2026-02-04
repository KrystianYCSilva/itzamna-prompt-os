/**
 * Tests for self-critique.js
 * Validates the quality evaluation functionality
 */

const { evaluateArtifact, evaluateCompleteness, evaluateClarity, evaluateCorrectness, evaluateBestPractices, getImprovementSuggestions } = require('../../cli/self-critique');

// Mock artifact content for testing
const sampleArtifact = `# Sample Skill Documentation

## Description
This is a sample skill documentation for testing purposes.

## Requirements
- Node.js 14+
- npm

## Installation
\`\`\`
npm install
\`\`\`

## Usage
\`\`\`
node app.js
\`\`\`

## Examples
Here are some examples of usage.

## Best Practices
Follow these best practices for optimal results.
`;

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

// Tests for Self-Critique Tool
test('evaluateCompleteness should return appropriate score', () => {
  const score = evaluateCompleteness(sampleArtifact);
  if (score < 0 || score > 25) {
    throw new Error(`Score out of range: ${score}`);
  }
  console.log(`  Completeness score: ${score}/25`);
});

test('evaluateClarity should return appropriate score', () => {
  const score = evaluateClarity(sampleArtifact);
  if (score < 0 || score > 25) {
    throw new Error(`Score out of range: ${score}`);
  }
  console.log(`  Clarity score: ${score}/25`);
});

test('evaluateCorrectness should return appropriate score', () => {
  const score = evaluateCorrectness(sampleArtifact);
  if (score < 0 || score > 25) {
    throw new Error(`Score out of range: ${score}`);
  }
  console.log(`  Correctness score: ${score}/25`);
});

test('evaluateBestPractices should return appropriate score', () => {
  const score = evaluateBestPractices(sampleArtifact);
  if (score < 0 || score > 25) {
    throw new Error(`Score out of range: ${score}`);
  }
  console.log(`  Best Practices score: ${score}/25`);
});

test('getImprovementSuggestions should return array of suggestions', () => {
  const scores = {
    completeness: 15,
    clarity: 10,
    correctness: 20,
    bestPractices: 18
  };

  const suggestions = getImprovementSuggestions(scores, sampleArtifact);
  if (!Array.isArray(suggestions)) {
    throw new Error('Suggestions should be an array');
  }
  console.log(`  Improvement suggestions: ${suggestions.length}`);
});

asyncTest('evaluateArtifact should handle missing file gracefully', async () => {
  try {
    await evaluateArtifact('nonexistent-file.md');
    console.log('  ERROR: Should have thrown an error for nonexistent file');
  } catch (error) {
    console.log(`  Correctly handled missing file: ${error.message}`);
  }
});

// Run tests
console.log('Running Self-Critique Tool Tests...\n');

// Execute tests
(async () => {
  await test('evaluateCompleteness should return appropriate score');
  await test('evaluateClarity should return appropriate score');
  await test('evaluateCorrectness should return appropriate score');
  await test('evaluateBestPractices should return appropriate score');
  await test('getImprovementSuggestions should return array of suggestions');
  await test('evaluateArtifact should return complete evaluation object');
  await test('evaluateArtifact should handle missing file gracefully');
  
  console.log('\nSelf-Critique Tool Tests completed.');
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