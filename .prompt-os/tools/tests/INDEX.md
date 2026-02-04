# INDEX: Tests

> Comprehensive test suite for PromptOS tools: CLI tools, JavaScript utilities, and validation helpers.

## 📋 TEST CATEGORIES

### CLI Tool Tests (cli/ subdirectory)

| File | Tool Tested | Purpose |
|------|-------------|---------|
| `cli/self-critique.test.js` | self-critique.js | Validate quality evaluation functionality |
| `cli/auto-increment.test.js` | auto-increment.js | Validate gap detection and evolution reports |
| `cli/web-research.test.js` | web-research.js | Validate source validation and scoring |
| `cli/knowledge-base.test.js` | knowledge-base.js | Validate search and RAG functionality |
| `cli/persona-generator.test.js` | persona-generator.js | Validate persona generation from descriptions |
| `cli/main.test.js` | main.js | Validate central CLI entry point |

### JavaScript Tool Tests (js/ subdirectory)

| File | Tool Tested | Purpose |
|------|-------------|---------|
| `js/input-classifier.test.js` | input-classifier.js | Validate user input classification |
| `js/jit-loader.test.js` | jit-loader.js | Validate JIT context loading |
| `js/tier-system.test.js` | tier-system.js | Validate T0/T1/T2 rule enforcement |

### Test Utilities (utils/ subdirectory)

| File | Purpose |
|------|---------|
| `run-all-tests.js` | Execute all test suites |
| `README.md` | Test suite documentation |

## 🧪 TEST COVERAGE

The test suite covers:

- **Function validation**: All major functions in each tool
- **Input/output verification**: Proper handling of inputs and expected outputs
- **Error handling**: Graceful handling of invalid inputs and edge cases
- **Boundary condition testing**: Testing of limits and edge cases
- **Integration testing**: Validation of tool interactions

## 🚀 EXECUTION

To run all tests:

```bash
node run-all-tests.js
```

To run tests for a specific category:

```bash
node cli/self-critique.test.js
node js/input-classifier.test.js
```

## 📊 VALIDATION STATUS

- ✅ Self-Critique Tool: Fully tested
- ✅ Auto-Increment Tool: Fully tested
- ✅ Web Research Tool: Fully tested
- ✅ Knowledge Base Tool: Fully tested
- ✅ Persona Generator Tool: Fully tested
- ✅ Main CLI Tool: Fully tested
- 📋 JavaScript Utilities: Template tests created