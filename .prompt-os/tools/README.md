# Tools

> Automation scripts and utilities for PromptOS development and management. Divided into JavaScript (js/) for node-based tools and PowerShell (ps1/) for Windows automation.

---

## 📂 DIRECTORY STRUCTURE

```
.prompt-os/tools/
├── README.md (you are here)
├── INDEX.md (master index)
├── js/
│   ├── INDEX.md
│   ├── brain.js
│   ├── input-classifier.js
│   ├── jit-loader.js
│   └── tier-system.js
├── ps1/
│   ├── INDEX.md
│   ├── setup-promptos-brain.ps1
│   ├── sync-constitution.ps1
│   └── validate-skill.ps1
└── setup-promptos-brain.sh (cross-platform shell script)
```

---

## 🚀 TOOL CATEGORIES

### JavaScript Tools (`js/`)
Node.js-based utilities for intelligent task classification, JIT loading, and tier system management. Run with: `node {script}.js`

| Tool | Purpose |
|------|---------|
| [brain.js](js/brain.js) | PromptOS intelligent router (CLI) |
| [input-classifier.js](js/input-classifier.js) | Classify user input for task routing |
| [jit-loader.js](js/jit-loader.js) | Just-in-time loading of skills and protocols |
| [tier-system.js](js/tier-system.js) | Tier classification and protocol selection |

### PowerShell Tools (`ps1/`)
Windows automation scripts for setup, validation, and synchronization. Run with: `.\{script}.ps1`

| Tool | Purpose |
|------|---------|
| [setup-promptos-brain.ps1](ps1/setup-promptos-brain.ps1) | Initialize PromptOS environment (Windows) |
| [sync-constitution.ps1](ps1/sync-constitution.ps1) | Synchronize CONSTITUTION.md across the system |
| [validate-skill.ps1](ps1/validate-skill.ps1) | Validate SKILL.md structure and metadata |

### Cross-Platform Tools
| Tool | Purpose |
|------|---------|
| [setup-promptos-brain.sh](setup-promptos-brain.sh) | Initialize PromptOS environment (macOS/Linux) |

---

## 🔗 QUICK NAVIGATION

- [JavaScript Tools](js/)
- [PowerShell Tools](ps1/)
- [INDEX.md](INDEX.md) — Detailed tool index
- [Parent: Core](..\README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total tools**: 8 (4 JS + 3 PS1 + 1 shell script)

