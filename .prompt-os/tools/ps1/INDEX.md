---
name: tools-ps1-index
description: "INDEX: PowerShell Tools"
---

# INDEX: PowerShell Tools

> 3 Windows automation scripts for PromptOS environment setup, CONSTITUTION synchronization, and SKILL validation.

---

## 📋 CONTENTS

| File | Purpose | When to Use |
|------|---------|------------|
| [setup-promptos-brain.ps1](setup-promptos-brain.ps1) | Initialize PromptOS environment (Windows) | First-time setup, environment configuration |
| [sync-constitution.ps1](sync-constitution.ps1) | Sync CONSTITUTION.md changes across system | After modifying CONSTITUTION.md |
| [validate-skill.ps1](validate-skill.ps1) | Validate SKILL.md structure and YAML metadata | Before committing SKILL files |

---

## 🚀 EXECUTION

### Setup (Run Once)
```powershell
.\setup-promptos-brain.ps1
```
- Initializes environment variables
- Creates necessary directories
- Sets up git hooks (if applicable)
- Installs dependencies (Node.js, modules, etc.)

### Sync Constitution
```powershell
.\sync-constitution.ps1
```
- Finds all references to CONSTITUTION.md
- Updates links if paths changed
- Validates consistency across codebase
- Reports conflicts

### Validate Skill
```powershell
.\validate-skill.ps1 -SkillPath ".prompt-os/skills/my-skill.md"
```
- Validates YAML frontmatter
- Checks required metadata fields
- Verifies markdown syntax
- Reports validation results

---

## 📋 SCRIPT DETAILS

### setup-promptos-brain.ps1
- **Size**: ~1.8 KB
- **Functions**: Environment initialization, dependency check
- **Idempotent**: Yes (safe to run multiple times)
- **Requires**: Admin privileges (for some environment variables)

### sync-constitution.ps1
- **Size**: ~12.9 KB
- **Functions**: Find references, update links, validate consistency
- **Idempotent**: Yes (checks before updating)
- **Requires**: Git installed

### validate-skill.ps1
- **Size**: ~14.2 KB
- **Functions**: YAML parsing, metadata validation, syntax checking
- **Idempotent**: Yes (read-only validation)
- **Requires**: PowerShell 5.0+

---

## 🔗 QUICK NAVIGATION

- [README.md](../README.md) — Tools overview
- [Parent: Tools](../README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total files**: 3  
**Total size**: ~28 KB  
**Platform**: Windows only (PowerShell 5.0+)  
**Dependencies**: Git (for sync-constitution.ps1)

