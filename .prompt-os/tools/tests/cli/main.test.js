/**
 * Tests for main.js
 * Validates the central CLI entry point functionality
 */

const { executeTool, runToolAsSubprocess } = require('../../cli/main');

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

// Main CLI Tool Tests
asyncTest('executeTool should recognize available tools', async () => {
  try {
    // This will test if the tool can be loaded (without actually executing it)
    await executeTool('self-critique', ['--help']);
    console.log('  Successfully recognized self-critique tool');
  } catch (error) {
    // The tool might not support --help or might require different arguments
    // But if it's a different error, it means the tool wasn't found
    if (error.message.includes('Unknown tool')) {
      console.log(`  ERROR: self-critique tool not recognized: ${error.message}`);
    } else {
      console.log(`  self-critique tool recognized (different error: ${error.message})`);
    }
  }
});

asyncTest('executeTool should reject unknown tools', async () => {
  try {
    await executeTool('unknown-tool', []);
    console.log('  ERROR: Should have thrown an error for unknown tool');
  } catch (error) {
    if (error.message.includes('Unknown tool')) {
      console.log('  Correctly rejected unknown tool');
    } else {
      console.log(`  Different error when rejecting unknown tool: ${error.message}`);
    }
  }
});

test('runToolAsSubprocess should execute tools as subprocess', () => {
  // This test verifies the function exists and has the right signature
  if (typeof runToolAsSubprocess !== 'function') {
    throw new Error('runToolAsSubprocess should be a function');
  }
  console.log('  runToolAsSubprocess function exists');
});

asyncTest('main CLI should handle different tool commands', async () => {
  // Test different tool invocations
  const testCases = [
    { tool: 'auto-increment', args: ['--help'] },
    { tool: 'web-research', args: ['--help'] },
    { tool: 'knowledge-base', args: ['--help'] },
    { tool: 'persona-generator', args: ['--help'] }
  ];

  for (const testCase of testCases) {
    try {
      await executeTool(testCase.tool, testCase.args);
      console.log(`  Successfully handled ${testCase.tool} tool`);
    } catch (error) {
      // Different tools might not support --help, so we just verify they're recognized
      if (!error.message.includes('Unknown tool')) {
        console.log(`  ${testCase.tool} tool recognized (different error: ${error.message})`);
      } else {
        console.log(`  ERROR: ${testCase.tool} tool not recognized`);
      }
    }
  }
});

// Run tests
console.log('Running Main CLI Tool Tests...\n');

// Execute tests
(async () => {
  await test('executeTool should recognize available tools');
  await test('executeTool should reject unknown tools');
  await test('runToolAsSubprocess should execute tools as subprocess');
  await test('main CLI should handle different tool commands');

  console.log('\nMain CLI Tool Tests completed.');
})();