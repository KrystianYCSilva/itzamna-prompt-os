# Integration Analysis: Bootstrap & Core Patterns

> **Version:** 1.0.0  
> **Date:** 2026-02-03  
> **Purpose:** Analyze existing documentation in `add-bootstraps/` and `add-core/` to determine what patterns can be integrated into the current implementation.

---

## Executive Summary

This document compares the patterns documented in `docs/add-bootstraps/` and `docs/add-core/` against the current `brain.js` implementation (v1.1.0), identifying what already exists, what's missing but valuable, and providing prioritized recommendations for integration.

### Key Findings

| Area | Current State | Gap Level | Priority |
|------|--------------|-----------|----------|
| 6-Phase Flow | Implemented | None | - |
| Input Classification | Basic keywords | Medium | High |
| Tier System (T0/T1/T2) | Not implemented | High | Critical |
| JIT Loading | Not implemented | High | Medium |
| Workflow Detection | Basic (domain only) | Medium | High |
| Persona Routing | Single persona | Medium | P2 (after SPEC-005) |
| Human Gate | Implemented | None | - |

---

## 1. What Already Exists in brain.js

### 1.1 6-Phase Flow (COMPLETE)

```
brain.js Flow:                 Documentation Pattern:
================               =====================
1. CLASSIFY (classifyInput)    1. CLASSIFY
2. RESEARCH (conductResearch)  2. RESEARCH
3. GENERATE (generateContent)  3. GENERATE
4. VALIDATE (validateDraft)    4. VALIDATE
5. HUMAN GATE (requestApproval) 5. HUMAN GATE
6. COMMIT (commitSkill)        6. COMMIT
```

**Status:** 100% aligned with `PROMPTOS-BRAIN-BLUEPRINT-V1.md`

### 1.2 Input Classification (BASIC)

**Current Implementation (brain.js:51-117):**
```javascript
// Domain detection via keywords
const domainKeywords = {
  frontend: ['css', 'html', 'tailwind', ...],
  backend: ['graphql', 'apollo', 'nodejs', ...],
  // ... 10 domains
};

// Complexity detection
const complexIndicators = ['arquitetura', 'enterprise', ...];
const simpleIndicators = ['basico', 'hello', ...];
```

**Documentation Pattern (input-classifier.md):**
```
Detection Flow:
1. Error/bug? -> bug_fixing
2. #impl CARD? -> code_implementation
3. Shortcut #xxx? -> workflow mapping
4. /speckit.*? -> spec_kit_workflow
5. Action on code? -> review/test/refactor
6. New feature? -> card_generation (CARD-FIRST!)
7. DEFAULT -> consultation
```

**Gap:** Current brain.js only detects **domain** (frontend, backend, etc.) but not **workflow** (card_generation, code_implementation, bug_fixing, etc.)

### 1.3 Human Gate (COMPLETE)

**Current Implementation (brain.js:314-350):**
- Preview of generated content
- Options: approve/edit/reject/cancel
- Interactive readline interface

**Status:** Matches documentation pattern fully.

### 1.4 Category System (COMPLETE)

**Current:** 7 categories (frontend, backend, config, markup, devops, docs, testing)

**Status:** Already organized, compatible with future JIT loading.

---

## 2. What's Missing But Valuable

### 2.1 Tier System (T0/T1/T2) - CRITICAL

**From `tier-system.md`:**

| Tier | Description | Example Rules |
|------|-------------|---------------|
| T0 | INVIOLABLE | No hardcoded secrets, no SQL injection, CARD-FIRST |
| T1 | STRONG | SOLID principles, 80%+ coverage, clean code |
| T2 | CONVENTIONS | camelCase, 4-space indent, 120 char lines |

**Impact on brain.js:**
- Validation phase should check T0 rules
- Self-critique (SPEC-001) should evaluate T1 compliance
- Suggestions should follow T2 conventions

**Recommendation:** Create `tier-system.js` module for rule validation.

### 2.2 Workflow Detection - HIGH PRIORITY

**From `input-classifier.md`:**

| Input Pattern | Workflow | Persona |
|--------------|----------|---------|
| "Quero criar..." | card_generation | PO |
| "#impl CARD-XXX" | code_implementation | SWE |
| "Revise..." | code_review | Reviewer |
| "Erro: NPE..." | bug_fixing | Debugger |
| "#test..." | test_generation | QA |

**Current Gap:**
- brain.js detects **what** (domain) but not **why** (workflow)
- No shortcut commands (#impl, #test, #review, etc.)
- No CARD-FIRST rule enforcement

**Recommendation:** Extend `classifyInput()` to return `workflow` alongside `domain`.

### 2.3 JIT Loading Protocol - MEDIUM PRIORITY

**From `loading-protocol.md`:**

```
3-Level Architecture:
Level 1 (Kernel):  AGENTS.md, MEMORY.md, T0 rules (~2KB)
Level 2 (Core):    input-classifier, master-router (~3KB)
Level 3 (JIT):     2-5 skills per task (~4-10KB)

Total: 10-16KB (vs 50KB without JIT = -68-76% reduction)
```

**Current Gap:**
- brain.js loads skills on-demand (good)
- No explicit level separation
- No token budget tracking
- No cache strategy

**Impact:** Critical for future multi-model support and Claude context optimization.

**Recommendation:** Implement as part of v1.3.0+ (after core specs complete).

### 2.4 Persona Routing - DEPENDS ON SPEC-005

**From `master-router.md`:**

```
Workflow -> Persona -> Skills JIT
card_generation -> Product Owner -> [card-templates, requirements, validation]
code_implementation -> Software Engineer -> [java, spring-boot, testing]
bug_fixing -> Debugger -> [debugging, stack-trace, error-handling]
```

**Current Gap:**
- Only 1 persona exists (senior-fullstack-developer)
- No routing logic
- No skill-persona mapping

**Recommendation:** Implement after SPEC-005 (Persona CLI) is complete.

### 2.5 Dual-Mode Generation - LOW PRIORITY

**From `PROMPTOS-BRAIN-BLUEPRINT-V1.md`:**

```
Fast Mode: Creates with [PLACEHOLDERS] for manual fill
Brain Mode: Full research + LLM generation + approval
```

**Current State:**
- brain.js only has "Fast Mode" (placeholder templates)
- No LLM integration yet (depends on SPEC-003 Web Research)

**Recommendation:** Defer until v1.3.0+ when Web Research is implemented.

---

## 3. Integration Priority Matrix

### Based on Specs 001-005 Alignment

| Pattern | Aligns With | Priority | Effort | Impact |
|---------|------------|----------|--------|--------|
| Tier System (T0/T1/T2) | SPEC-001 Self-Critique | P0 | 2-3 days | High |
| Workflow Detection | SPEC-002 Auto-Increment | P1 | 1-2 days | High |
| Shortcut Commands | UX Improvement | P1 | 1 day | Medium |
| CARD-FIRST Rule | T0 Compliance | P1 | 0.5 day | Medium |
| JIT Loading | SPEC-004 Vector DB | P2 | 3-5 days | High |
| Persona Routing | SPEC-005 Persona CLI | P2 | 2-3 days | Medium |
| Dual-Mode (Fast/Brain) | SPEC-003 Web Research | P3 | 2-3 days | Medium |
| Model Type Detection | Future Multi-model | P4 | 1-2 days | Low |

### Recommended Implementation Order

```
Phase 1 (Before SPEC-001):
  1. Tier System integration into validation
  2. Workflow detection in classifyInput()
  3. Shortcut commands (#impl, #test, etc.)

Phase 2 (With SPEC-001):
  4. T0/T1 validation in self-critique
  5. CARD-FIRST rule enforcement

Phase 3 (With SPEC-002):
  6. Gap detection via workflow analysis
  7. Evolution suggestions based on patterns

Phase 4 (With SPEC-003/004):
  8. JIT Loading protocol
  9. Dual-mode generation (Fast vs Brain)

Phase 5 (With SPEC-005):
  10. Persona routing
  11. Skill-persona mapping
```

---

## 4. Detailed Integration Specifications

### 4.1 Tier System Integration

**File:** `.prompt-os/scripts/tier-system.js`

**Structure:**
```javascript
const TIERS = {
  T0: {
    name: 'INVIOLABLE',
    rules: [
      { id: 'T0-01', rule: 'No hardcoded secrets', check: (content) => !content.includes('password=') },
      { id: 'T0-02', rule: 'No SQL injection patterns', check: (content) => !content.includes('+ userId') },
      { id: 'T0-CARD-FIRST', rule: 'Card before implementation', check: (context) => context.hasCard },
    ]
  },
  T1: {
    name: 'STRONG',
    rules: [
      { id: 'T1-SOLID', rule: 'SOLID principles mentioned', check: (content) => /SOLID|Single Responsibility/.test(content) },
      { id: 'T1-EXAMPLES', rule: 'At least 2 examples', check: (content) => (content.match(/### Exemplo/g) || []).length >= 2 },
    ]
  },
  T2: {
    name: 'CONVENTIONS',
    rules: [
      { id: 'T2-NAMING', rule: 'Kebab-case file names', check: (name) => /^[a-z0-9-]+$/.test(name) },
      { id: 'T2-SECTIONS', rule: 'Standard sections present', check: (content) => content.includes('## Guidelines') },
    ]
  }
};

function validateTiers(content, metadata) {
  const results = { t0: [], t1: [], t2: [] };
  // Run checks and return violations/passes
  return results;
}
```

**Integration Point:** `validateDraft()` in brain.js

### 4.2 Workflow Detection Enhancement

**Update to `classifyInput()` in brain.js:**

```javascript
function classifyInput(input, explicitCategory = null) {
  // NEW: Workflow detection
  const workflowPatterns = {
    bug_fixing: /erro|bug|exception|crash|falha|nao funciona/i,
    code_implementation: /#impl\s+CARD-\d+/i,
    code_review: /revis[ea]|review|analise codigo/i,
    test_generation: /#test|crie testes|teste unitario/i,
    card_generation: /quero criar|nova feature|novo crud|implementar/i,
    refactoring: /refator|limpar codigo|melhorar/i,
    consultation: /como|por que|explique|o que e/i,
  };

  let detectedWorkflow = 'consultation'; // default
  for (const [workflow, pattern] of Object.entries(workflowPatterns)) {
    if (pattern.test(input)) {
      detectedWorkflow = workflow;
      break;
    }
  }

  // EXISTING: Domain detection
  // ... (keep current implementation)

  return {
    description: input,
    domain: detectedDomain,
    category,
    complexity,
    workflow: detectedWorkflow,  // NEW
    triggers: [...],
  };
}
```

### 4.3 Shortcut Commands

**Add to brain.js main():**

```javascript
// NEW: Shortcut expansion
const SHORTCUTS = {
  '#new': 'generate skill',
  '#impl': 'implement card',
  '#test': 'generate test',
  '#review': 'review code',
  '#bug': 'fix bug',
};

// In main():
if (args[0] && args[0].startsWith('#')) {
  const shortcut = SHORTCUTS[args[0]];
  if (shortcut) {
    log.info(`Shortcut ${args[0]} -> ${shortcut}`);
    args = shortcut.split(' ').concat(args.slice(1));
  }
}
```

---

## 5. Key Decisions Required

### Decision 1: Adopt 3-Level Loading Architecture?

**Options:**
| Option | Pros | Cons |
|--------|------|------|
| A: Full adoption | -68% tokens, scalable | 3-5 days effort |
| B: Simplified (2 levels) | Easier to implement | Less optimization |
| C: Defer to v2.0.0 | Focus on core specs | Technical debt |

**Recommendation:** Option B - Implement simplified 2-level (Kernel + JIT) as part of SPEC-004.

### Decision 2: Implement Tier System Now?

**Options:**
| Option | Pros | Cons |
|--------|------|------|
| A: Before SPEC-001 | Self-critique can use it | Delays spec start |
| B: With SPEC-001 | Single integration effort | More complex spec |
| C: Standalone | Clean separation | Separate maintenance |

**Recommendation:** Option A - Implement as prerequisite for SPEC-001 (1-2 days).

### Decision 3: Add Dual-Mode Generation?

**Options:**
| Option | Pros | Cons |
|--------|------|------|
| A: Keep Fast-only | Simpler, current state | No LLM generation |
| B: Add Brain mode | Full generation | Needs SPEC-003 first |
| C: Hybrid (flag) | User choice | More complexity |

**Recommendation:** Option C - Add `--mode fast|brain` flag, implement Brain mode with SPEC-003.

### Decision 4: PowerShell Scripts or Pure Node.js?

**Options:**
| Option | Pros | Cons |
|--------|------|------|
| A: Pure Node.js | Cross-platform, single stack | No PS automation |
| B: Both (Node + PS) | Flexibility, PS for CI | Dual maintenance |
| C: Node core + PS wrappers | Best of both | Slight overhead |

**Recommendation:** Option A - Keep pure Node.js. Add PowerShell wrappers only if needed for CI/CD.

### Decision 5: Integrate Input Classifier Fully?

**Options:**
| Option | Pros | Cons |
|--------|------|------|
| A: Enhance classifyInput() | Simple, inline | Grows large |
| B: Separate module | Clean, testable | More files |
| C: Full port from docs | Complete feature | Over-engineering |

**Recommendation:** Option B - Create `input-classifier.js` module, import into brain.js.

---

## 6. Updated Implementation Plan

### Pre-SPEC-001 (Foundation Work)

| Task | File | Effort | Priority |
|------|------|--------|----------|
| Create tier-system.js | `.prompt-os/scripts/tier-system.js` | 1 day | P0 |
| Create input-classifier.js | `.prompt-os/scripts/input-classifier.js` | 1 day | P0 |
| Add workflow detection | Update classifyInput() | 0.5 day | P0 |
| Add shortcut commands | Update main() | 0.5 day | P1 |
| Integrate tiers into validate | Update validateDraft() | 0.5 day | P0 |

**Total Pre-SPEC-001 Work:** ~3.5 days

### SPEC-001 Implementation (Updated)

With foundation work done:
- Self-critique can leverage tier validation
- Score calculation based on T0/T1/T2 compliance
- Suggestions based on T2 conventions

### Updated Roadmap Adjustment

```
Current Roadmap:
v1.0.0 -> v1.1.0 (Self-Critique) -> v1.2.0 (Auto-Increment) -> ...

Proposed Adjustment:
v1.0.0 -> v1.0.5 (Foundation) -> v1.1.0 (Self-Critique) -> v1.2.0 -> ...
           ^
           |
           +-- Tier System
           +-- Input Classifier
           +-- Workflow Detection
           +-- Shortcut Commands
```

---

## 7. Files to Create/Modify

### New Files

| File | Purpose | Lines Est. |
|------|---------|------------|
| `.prompt-os/scripts/tier-system.js` | T0/T1/T2 validation | ~150 |
| `.prompt-os/scripts/input-classifier.js` | Workflow + persona detection | ~200 |
| `docs/TIER-SYSTEM.md` | User documentation | ~100 |

### Modified Files

| File | Changes |
|------|---------|
| `.prompt-os/scripts/brain.js` | Import modules, enhance classify, add shortcuts |
| `ROADMAP.md` | Add v1.0.5 milestone |
| `MEMORY.md` | Log integration work |

---

## 8. Success Metrics

### After Foundation Integration

| Metric | Current | Target |
|--------|---------|--------|
| Workflow detection accuracy | 0% (not implemented) | >80% |
| T0 rule violations caught | 0% | 100% |
| Shortcut commands available | 0 | 6 |
| Input classification dimensions | 2 (domain, complexity) | 4 (+ workflow, persona) |

### After SPEC-001 (with Tiers)

| Metric | Target |
|--------|--------|
| Skills failing T0 auto-rejected | >95% |
| T1 suggestions generated | 3+ per skill |
| Self-critique score accuracy | Correlates with human decision |

---

## 9. Conclusion

The documentation in `add-bootstraps/` and `add-core/` provides excellent patterns that can significantly enhance the current brain.js implementation. 

### Key Takeaways

1. **Tier System is Critical** - Should be implemented before SPEC-001 to enable meaningful self-critique.

2. **Workflow Detection is Valuable** - Enables smarter routing and future persona selection.

3. **Full 3-Level JIT Loading** - Will be implemented as part of foundation work (v1.0.5).

4. **Keep Node.js as Primary** - PowerShell scripts are optional for automation but not core.

5. **Foundation Work First** - ~4-5 days of pre-SPEC-001 work will accelerate all future specs.

---

## 10. CONFIRMED DECISIONS

> **Date:** 2026-02-03  
> **Approved by:** Human-in-the-Loop

| Decision | Question | Confirmed Choice |
|----------|----------|------------------|
| D1 | When to implement Tier System? | **Before SPEC-001** - As v1.0.5 foundation |
| D2 | 3-Level Loading Architecture? | **Full 3-Level now** - Complete implementation |
| D3 | Dual-Mode Generation? | **Add flag, Brain with SPEC-003** - Prepare now, implement later |
| D4 | Implementation Stack? | **Pure Node.js** - Cross-platform, single stack |
| D5 | Input Classifier Integration? | **Separate module** - input-classifier.js |

### Confirmed v1.0.5 Scope (Updated)

Based on decisions, v1.0.5 now includes:

| Component | Effort | Status |
|-----------|--------|--------|
| `tier-system.js` (T0/T1/T2) | 1-2 days | Planned |
| `input-classifier.js` (workflow detection) | 1-2 days | Planned |
| `jit-loader.js` (3-level loading) | 2-3 days | Planned |
| `--mode fast\|brain` flag | 0.5 day | Planned |
| Shortcut commands (#impl, #test, etc.) | 0.5 day | Planned |
| Integration into brain.js | 0.5 day | Planned |

**Total v1.0.5 Effort:** 5-7 days (increased due to full JIT implementation)

### Updated Implementation Order

```
v1.0.5 Foundation (5-7 days):
  Day 1-2: tier-system.js
  Day 2-3: input-classifier.js
  Day 3-5: jit-loader.js (3-level architecture)
  Day 5-6: Integration + --mode flag + shortcuts
  Day 6-7: Testing + Documentation

v1.1.0 Self-Critique (3-5 days):
  Leverages: tier validation, workflow detection
  Focus: Score calculation, suggestions, redundancy detection

v1.2.0+ continues as planned
```

---

### Immediate Next Steps

1. **Update ROADMAP.md** with confirmed v1.0.5 scope (5-7 days)
2. **Create tier-system.js** (Day 1-2)
3. **Create input-classifier.js** (Day 2-3)
4. **Create jit-loader.js** (Day 3-5)
5. **Integrate into brain.js** with --mode flag (Day 5-6)
6. **Test and document** (Day 6-7)
7. **Begin SPEC-001** with solid foundation

---

*Document Version: 1.1.0*  
*Created: 2026-02-03*  
*Updated: 2026-02-03 (Decisions Confirmed)*  
*Author: PromptOS Development Team*
