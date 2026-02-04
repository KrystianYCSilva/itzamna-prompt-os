/**
 * Run all tests for PromptOS tools
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

async function runTest(filePath) {
  console.log(`\n--- Running test: ${filePath} ---`);
  
  return new Promise((resolve, reject) => {
    const child = spawn('node', [filePath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✓ ${filePath} completed successfully`);
        resolve();
      } else {
        console.log(`✗ ${filePath} failed with code ${code}`);
        reject(new Error(`Test failed with code ${code}`));
      }
    });
  });
}

async function findAllTestFiles(dir) {
  const testFiles = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      const nestedFiles = await findAllTestFiles(fullPath);
      testFiles.push(...nestedFiles);
    } else if (item.isFile() && item.name.endsWith('.test.js')) {
      testFiles.push(fullPath);
    }
  }

  return testFiles;
}

async function runAllTests() {
  console.log('Starting all PromptOS tool tests...\n');
  
  const testDir = __dirname;
  const testFiles = await findAllTestFiles(testDir);
  
  console.log(`Found ${testFiles.length} test files:\n`);
  testFiles.forEach(file => console.log(`- ${path.relative(testDir, file)}`));
  
  let passed = 0;
  let failed = 0;
  
  for (const testFile of testFiles) {
    try {
      await runTest(testFile);
      passed++;
    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\n--- Test Results ---`);
  console.log(`Total: ${testFiles.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

// Run all tests
runAllTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});