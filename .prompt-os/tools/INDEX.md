# INDEX: Tools

> Collection of 8 automation scripts for PromptOS: 4 JavaScript tools for intelligent routing and loading, 3 PowerShell tools for Windows setup/validation, 1 cross-platform shell script.

---

## 📋 JAVASCRIPT TOOLS (js/ subdirectory)

| File | Purpose | Language | Size | Usage |
|------|---------|----------|------|-------|
| [js/brain.js](js/brain.js) | PromptOS intelligent router | JavaScript (Node.js) | ~23 KB | `node js/brain.js` |
| [js/input-classifier.js](js/input-classifier.js) | Classify input by domain/task type | JavaScript (Node.js) | ~20 KB | Used by brain.js |
| [js/jit-loader.js](js/jit-loader.js) | Just-in-time protocol/skill loader | JavaScript (Node.js) | ~21 KB | Used by brain.js |
| [js/tier-system.js](js/tier-system.js) | Tier classification (T0/T1/T2) | JavaScript (Node.js) | ~22.5 KB | Used by brain.js |

---

## 📋 POWERSHELL TOOLS (ps1/ subdirectory)

| File | Purpose | Platform | Size | Usage |
|------|---------|----------|------|-------|
| [ps1/setup-promptos-brain.ps1](ps1/setup-promptos-brain.ps1) | Initialize PromptOS environment | Windows | ~1.8 KB | `.\ps1\setup-promptos-brain.ps1` |
| [ps1/sync-constitution.ps1](ps1/sync-constitution.ps1) | Sync CONSTITUTION.md across system | Windows | ~12.9 KB | `.\ps1\sync-constitution.ps1` |
| [ps1/validate-skill.ps1](ps1/validate-skill.ps1) | Validate SKILL.md structure | Windows | ~14.2 KB | `.\ps1\validate-skill.ps1 {file}` |

---

## 📋 CROSS-PLATFORM TOOLS

| File | Purpose | Platform | Size | Usage |
|------|---------|----------|------|-------|
| [setup-promptos-brain.sh](setup-promptos-brain.sh) | Initialize PromptOS environment | macOS/Linux | ~1.5 KB | `bash setup-promptos-brain.sh` |

---

## 🎯 TOOL SELECTION GUIDE

### By Task
| Task | Tool | Platform |
|------|------|----------|
| Initialize PromptOS | setup-promptos-brain | Windows: ps1/, macOS/Linux: sh |
| Validate skill file | validate-skill.ps1 | Windows only |
| Sync constitution | sync-constitution.ps1 | Windows only |
| Route user input | brain.js | All (Node.js required) |
| Classify task type | input-classifier.js | Used by brain.js |
| Load protocols | jit-loader.js | Used by brain.js |

### By Platform
| Platform | Available Tools |
|----------|-----------------|
| Windows | All (js/ + ps1/) |
| macOS/Linux | js/ + sh scripts only |

---

## 🚀 COMMON WORKFLOWS

### Windows Setup
```bash
# Initialize environment
.\ps1\setup-promptos-brain.ps1

# Validate your skills
.\ps1\validate-skill.ps1 .prompt-os/skills/my-skill.md

# Sync constitution changes
.\ps1\sync-constitution.ps1
```

### Brain.js Routing
```bash
# Start intelligent router
node js/brain.js

# Input will be classified and routed to appropriate protocol/skill
```

### Cross-platform
```bash
# On macOS/Linux
bash setup-promptos-brain.sh

# Node-based tools work everywhere
node js/brain.js
```

---

## 📊 TOOL STATISTICS

| Category | Count | Total Size |
|----------|-------|-----------|
| JavaScript | 4 | ~86 KB |
| PowerShell | 3 | ~28 KB |
| Shell | 1 | ~1.5 KB |
| **Total** | **8** | **~115 KB** |

---

## 💡 FUTURE EXTENSIONS (v2.3.0+)

- Python versions of PowerShell tools (cross-platform)
- Docker integration tools
- GitHub Actions CI/CD workflows
- Metrics and performance monitoring scripts

---

## 🔗 QUICK NAVIGATION

- [README.md](README.md) — Overview
- [JavaScript Tools](js/)
- [PowerShell Tools](ps1/)
- [Parent: Core](..\README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total tools**: 8  
**JavaScript tools**: 4 (all interdependent)  
**PowerShell tools**: 3 (independent scripts)  
**Shell scripts**: 1

