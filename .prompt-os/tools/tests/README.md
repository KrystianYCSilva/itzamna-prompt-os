---
name: tools-tests-readme
description: "Test Suite for PromptOS Tools"
---

# Test Suite for PromptOS Tools

This directory contains test suites for all the tools in the PromptOS system.

## Directory Structure

- `cli/` - Tests for command-line interface tools
  - `self-critique.test.js` - Tests for self-critique functionality
  - `auto-increment.test.js` - Tests for auto-increment functionality
  - `web-research.test.js` - Tests for web research functionality
  - `knowledge-base.test.js` - Tests for knowledge base functionality
  - `persona-generator.test.js` - Tests for persona generator functionality
  - `main.test.js` - Tests for main CLI entry point

- `js/` - Tests for JavaScript utility tools
  - `input-classifier.test.js` - Tests for input classification functionality
  - `jit-loader.test.js` - Tests for JIT loading functionality
  - `tier-system.test.js` - Tests for tier system functionality

- `utils/` - Shared testing utilities (if any)

## Running Tests

To run all tests:

```bash
node run-all-tests.js
```

To run tests for a specific tool:

```bash
node cli/self-critique.test.js
```

## Test Coverage

The test suite covers:

- Function validation for all major tools
- Input/output verification
- Error handling
- Boundary condition testing
- Integration between components