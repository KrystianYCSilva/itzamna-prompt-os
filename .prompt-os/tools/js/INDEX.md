# INDEX: JavaScript Tools

> 4 Node.js-based utilities for intelligent task routing, input classification, JIT protocol loading, and tier system management.

---

## 📋 CONTENTS

| File | Purpose | Dependencies | When to Use |
|------|---------|-------------|------------|
| [brain.js](brain.js) | PromptOS main router CLI | input-classifier, jit-loader, tier-system | Running PromptOS intelligent routing |
| [input-classifier.js](input-classifier.js) | Classify user input by type/domain | None | Understanding input classification logic |
| [jit-loader.js](jit-loader.js) | Load skills/protocols on-demand | tier-system | Protocol loading and skill selection |
| [tier-system.js](tier-system.js) | Classify content by tier (T0/T1/T2) | None | Understanding PromptOS tier classification |

---

## 🚀 EXECUTION CHAIN

```
user input
    ↓
brain.js (main entry)
    ├─→ input-classifier.js (what type is this?)
    ├─→ tier-system.js (what tier rules apply?)
    └─→ jit-loader.js (load which protocols?)
    ↓
routing decision + loaded protocols
```

---

## 🎯 USAGE

### Run Main Router
```bash
node brain.js
```

### Use Modules in Your Code
```javascript
const classifier = require('./input-classifier.js');
const jitLoader = require('./jit-loader.js');
const tierSystem = require('./tier-system.js');

// Classify input
const classification = classifier.classify(userInput);

// Get applicable tier rules
const tier = tierSystem.getTier(classification);

// Load relevant protocols
const protocols = jitLoader.loadProtocols(tier, classification);
```

---

## 📚 KEY FUNCTIONS

### brain.js
- `main()` — Entry point, orchestrates classification and loading
- `routeInput(userInput)` — Route input to appropriate handler

### input-classifier.js
- `classify(text)` — Classify input by domain (code, docs, system, etc.)
- `detectDomain(text)` — Identify primary domain

### jit-loader.js
- `loadProtocols(tier, classification)` — Load applicable protocols
- `loadSkill(skillName)` — Load specific skill file

### tier-system.js
- `getTier(classification)` — Determine tier (T0/T1/T2)
- `getTierRules(tier)` — Get rules for tier

---

## 🔗 QUICK NAVIGATION

- [README.md](../README.md) — Tools overview
- [Parent: Tools](../README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total files**: 4  
**Total size**: ~86 KB  
**Dependencies**: Node.js 14+ required

