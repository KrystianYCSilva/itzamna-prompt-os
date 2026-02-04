---
name: tools-index
description: "INDEX: Tools"
---

# INDEX: Tools

> Collection of automation scripts for PromptOS: CLI tools, protocol loaders, validation helpers, and setup utilities.

## 📋 CLI TOOLS (cli/ subdirectory)

| File | Purpose | Language | Size | Usage |
|------|---------|----------|------|-------|
| `cli/brain.js` | Main CLI tool for generating skills/personas | JavaScript | 736 lines | `node brain.js generate skill "descricao"` |

## 📋 JAVASCRIPT TOOLS (js/ subdirectory)

| File | Purpose | Dependencies | When to Use |
|------|---------|-------------|------------|
| `js/input-classifier.js` | Classify user input into workflow/persona/skills | None | At start of any task |
| `js/jit-loader.js` | Load context JIT (Just-In-Time) | None | When loading context |
| `js/tier-system.js` | Implement T0/T1/T2 rule system | None | When validating rules |

## 📋 POWERSHELL TOOLS (ps1/ subdirectory)

| File | Purpose | When to Use |
|------|---------|------------|
| `ps1/setup-promptos-brain.ps1` | Initialize PromptOS structure | New project setup |
| `ps1/sync-constitution.ps1` | Sync constitution across agent configs | Constitution updates |
| `ps1/validate-skill.ps1` | Validate skill files | Before committing skills |

## 📋 SHELL SCRIPTS (sh/ subdirectory)

| File | Purpose | Language | When to Use |
|------|---------|----------|-------------|
| `sh/setup-promptos-brain.sh` | Initialize PromptOS structure (Unix) | Unix/Linux project setup |

## 📋 NEW TOOLS FOR DELIVERED SPECS

| File | Spec | Purpose | Language |
|------|------|---------|----------|
| `cli/self-critique.js` | SPEC-001 | Evaluate quality of generated artifacts | JavaScript |
| `cli/auto-increment.js` | SPEC-002 | Handle gap detection and evolution reports | JavaScript |
| `cli/web-research.js` | SPEC-003 | Validate and score research sources | JavaScript |
| `cli/knowledge-base.js` | SPEC-004 | Multi-signal similarity search and RAG | JavaScript |
| `cli/persona-generator.js` | SPEC-005 | Generate personas from natural language | JavaScript |
| `cli/main.js` | - | Central CLI entry point for all tools | JavaScript |