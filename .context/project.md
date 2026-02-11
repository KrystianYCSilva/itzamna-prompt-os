---
description: |
  Project overview: goals, scope, and current state.
  Use when: you need to understand what this project is and why it exists.
---

# Project Overview

## What

Itzamna PromptOS is a prompt-driven framework and Typer-based CLI (itzamna) that orchestrates AI coding agents, project context, and memory to enable reproducible, governed AI-assisted development.

## Why

To provide a safe, auditable, and structured way to use AI CLIs inside projects by capturing project memory, enforcing a constitution, and offering reusable workflows and templates.

## Scope

- Bootstrap project kernel, memory, and CLI agent integrations (.github/.gemini/etc.).
- Maintain project-scoped context under .context/ (project.md, tech.md, rules.md) and support upgrades to an enterprise layout.
- Detect integrations (hefesto, spec-kit) and provide non-destructive updates; does not install external AI binaries.

## Status

Alpha — actively developed; core CLI commands (init, check, context management) implemented, documentation and templates present. Contributions and context population required for production readiness.
