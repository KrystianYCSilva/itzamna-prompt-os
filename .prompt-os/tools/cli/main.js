#!/usr/bin/env node
/**
 * ITZAMNA PROMPTOS - Main CLI Tool v1.0.0
 *
 * Central entry point for all PromptOS tools
 *
 * Usage:
 *   node main.js <tool> <command> [options]
 *
 * Available tools:
 *   - brain: Generate skills and personas
 *   - self-critique: Evaluate quality of artifacts
 *   - auto-increment: Handle gap detection and evolution
 *   - web-research: Validate and score research sources
 *   - knowledge-base: Search and retrieve knowledge
 *   - persona-generator: Create personas from descriptions
 *   - input-classifier: Classify user input
 *   - jit-loader: Load context JIT
 *   - tier-system: Apply T0/T1/T2 rules
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// CONSTANTS
// ============================================================================

const TOOLS_DIR = path.join(__dirname, 'cli');
const AVAILABLE_TOOLS = [
  'brain',
  'self-critique', 
  'auto-increment',
  'web-research',
  'knowledge-base',
  'persona-generator',
  'input-classifier',
  'jit-loader',
  'tier-system'
];

// ============================================================================
// HELPERS
// ============================================================================

const log = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`),
  debug: (msg) => console.log(`[DEBUG] ${msg}`)
};

// ============================================================================
// TOOL EXECUTION
// ============================================================================

/**
 * Execute a specific tool with given arguments
 */
async function executeTool(toolName, args) {
  // Validate tool name
  if (!AVAILABLE_TOOLS.includes(toolName)) {
    throw new Error(`Unknown tool: ${toolName}. Available tools: ${AVAILABLE_TOOLS.join(', ')}`);
  }

  // Construct path to tool
  const toolPath = path.join(TOOLS_DIR, `${toolName}.js`);

  try {
    // Check if tool file exists
    await fs.access(toolPath);
    
    // Dynamically import the tool
    const toolModule = require(toolPath);
    
    // If the module has a default export that's a function, use it
    if (typeof toolModule === 'function') {
      return await toolModule(args);
    }
    
    // Otherwise, look for a main function or execute based on available exports
    if (toolModule.main && typeof toolModule.main === 'function') {
      return await toolModule.main(args);
    }
    
    // If no main function, try to execute based on the first argument as a command
    if (args.length > 0) {
      const command = args[0];
      if (toolModule[command] && typeof toolModule[command] === 'function') {
        return await toolModule[command](args.slice(1));
      }
    }
    
    // If no specific command found, try to execute the tool directly
    // This assumes the tool has its own CLI handling
    throw new Error(`Tool ${toolName} does not have a callable function for the provided arguments`);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      // If the module doesn't have callable functions, we'll run it as a subprocess
      return await runToolAsSubprocess(toolPath, args);
    } else {
      throw error;
    }
  }
}

/**
 * Run a tool as a subprocess (for tools that handle their own CLI)
 */
async function runToolAsSubprocess(toolPath, args) {
  const { spawn } = require('child_process');
  
  return new Promise((resolve, reject) => {
    const child = spawn('node', [toolPath, ...args], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Tool exited with code ${code}: ${stderr}`));
      }
    });
  });
}

// ============================================================================
// CLI HANDLER
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
ITZAMNA PROMPTOS - Main CLI Tool v1.0.0

Central entry point for all PromptOS tools

Usage:
  node main.js <tool> <command> [options]

Available tools:
  - brain: Generate skills and personas
  - self-critique: Evaluate quality of artifacts
  - auto-increment: Handle gap detection and evolution
  - web-research: Validate and score research sources
  - knowledge-base: Search and retrieve knowledge
  - persona-generator: Create personas from descriptions
  - input-classifier: Classify user input
  - jit-loader: Load context JIT
  - tier-system: Apply T0/T1/T2 rules

Examples:
  node main.js brain generate skill "Docker containerization"
  node main.js self-critique score my-skill.md
  node main.js web-research validate https://example.com
  node main.js knowledge-base search "Java concurrency"
  node main.js persona-generator generate "Senior backend engineer"
`);
    process.exit(0);
  }
  
  const toolName = args[0];
  const toolArgs = args.slice(1);
  
  try {
    await executeTool(toolName, toolArgs);
  } catch (error) {
    log.error(`Failed to execute tool '${toolName}': ${error.message}`);
    process.exit(1);
  }
}

// ============================================================================
// RUN
// ============================================================================

if (require.main === module) {
  main().catch(error => {
    log.error(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  executeTool,
  runToolAsSubprocess
};