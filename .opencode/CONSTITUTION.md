<!--
  Constitution synced from .specify/memory/constitution.md
  Agent: OpenCode
  Synced: 2026-02-04 13:10:16
  DO NOT EDIT - Changes will be overwritten on next sync
  To modify, edit .specify/memory/constitution.md and run sync-constitution.ps1 -Direction push
-->

<!--
SYNC IMPACT REPORT
==================
Version change: 2.1.0 → 2.2.0
Reason: MINOR - Added T1-NAMING section (Skills & Categories nomenclature),
        synced with .prompt-os/CONSTITUTION.md source of truth.

Modified principles:
  - None renamed

Added sections:
  - T1-NAMING: Skills & Categories nomenclature (3 rules + category table +
    path structure + correct/incorrect examples) — pulled from source of truth

Removed sections:
  - None

Templates requiring updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section compatible;
     ⚠ dangling reference to `.specify/templates/commands/plan.md` flagged
     (directory does not exist — see Follow-up TODOs)
  ✅ .specify/templates/spec-template.md - Requirements section compatible
  ✅ .specify/templates/tasks-template.md - Phase structure compatible
  ✅ .specify/templates/checklist-template.md - No principle-driven changes needed
  ✅ .specify/templates/agent-file-template.md - No principle-driven changes needed

Synced with source of truth:
  ✅ .prompt-os/CONSTITUTION.md - Now fully aligned (T1-NAMING present in both)

Follow-up TODOs:
  - TODO(DANGLING_REF): plan-template.md line 7 references
    `.specify/templates/commands/plan.md` but the `commands/` directory does
    not exist. Either create the directory + file or remove the reference.
-->

# Itzamna PromptOS Constitution

> **Version**: 2.2.0
> **Source of Truth**: `.prompt-os/CONSTITUTION.md`
> **Ratified**: 2025-01-01
> **Last Amended**: 2026-02-04

---

## Tier Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ T0 - INVIOLABLE                                             │
│ NEVER break these rules. No exceptions.                     │
│ Violation = Stop immediately and alert the user.            │
├─────────────────────────────────────────────────────────────┤
│ T1 - STRONG                                                 │
│ Break RARELY and only with explicit justification.          │
│ Always inform the user when breaking.                       │
├─────────────────────────────────────────────────────────────┤
│ T2 - CONVENTION                                             │
│ Preferences and patterns. Can break with technical reason.  │
│ No need to alert, but maintain consistency.                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Principles

### I. Security First (T0-SEC) - INVIOLABLE

Security rules that MUST NEVER be broken:

- **T0-SEC-01**: NEVER include hardcoded secrets — Use environment variables,
  .env files, or secrets managers
- **T0-SEC-02**: NEVER use SQL injection patterns — Use parameterized queries,
  ORMs, prepared statements
- **T0-SEC-03**: NEVER expose sensitive data in logs — Mask passwords, tokens,
  PII
- **T0-SEC-04**: NEVER disable security validations — Keep CORS, CSRF, rate
  limiting active

**If security violation detected in existing code:**
1. Stop immediately
2. Alert the user
3. Suggest correction
4. DO NOT proceed until resolved

**Rationale**: Security breaches cause irreversible damage. No performance gain
or convenience justifies security violations.

### II. Human Control (T0-HUMAN) - INVIOLABLE

Human-in-the-loop rules that MUST NEVER be broken:

- **T0-HUMAN-01**: Significant changes require approval — Ask before
  creating/deleting/modifying critical files
- **T0-HUMAN-02**: NEVER auto-commit — Always ask "Can I commit?"
- **T0-HUMAN-03**: NEVER auto-push — Always ask "Can I push?"
- **T0-HUMAN-04**: NEVER delete files without confirming — List files and ask
  "Can I delete?"

**Critical files requiring approval**: package.json, pom.xml, build.gradle,
.env.*, Dockerfile, docker-compose.yml, CI/CD configs, security configs.

**Rationale**: AI agents MUST NOT take irreversible actions without human
oversight. Trust is built through transparency.

### III. Structure (T0-STRUCT) - INVIOLABLE

Project structure rules that MUST be followed:

- **T0-STRUCT-01**: CARD-FIRST for new features — Create a CARD before
  implementing (exception: #impl-direct, urgent fixes, small refactors)
- **T0-STRUCT-02**: Maintain folder structure — Follow existing project
  architecture
- **T0-STRUCT-03**: Do not create files outside scope — Ask permission for new
  files

**CARD-FIRST Exceptions:**
- `#impl-direct` — User consciously wants to implement without CARD
- Urgent bug fixes
- Small refactors

**Rationale**: Consistent structure enables maintainability and reduces
cognitive load for all team members.

### IV. Validation (T0-VALIDATE) - INVIOLABLE

Truthfulness rules that MUST be followed:

- **T0-VAL-01**: NEVER claim success without verification — If you said it
  works, test it or clarify you didn't test
- **T0-VAL-02**: NEVER invent APIs/methods — Verify official documentation
  before using
- **T0-VAL-03**: NEVER ignore compilation errors — Fix errors before
  proceeding

**Rationale**: Hallucinated code causes debugging nightmares. Honesty about
limitations builds trust.

### V. Code Quality (T1-QUAL) - Strong

Quality rules that SHOULD be followed (can break with explicit justification):

- **T1-QUAL-01**: Follow SOLID principles (break for: rapid prototypes, POCs,
  throwaway scripts)
- **T1-QUAL-02**: Write tests for new code (break for: trivial code, simple
  getters/setters)
- **T1-QUAL-03**: Don't duplicate code (DRY) (break when: duplication is
  clearer than abstraction)
- **T1-QUAL-04**: Small focused functions (break for: performance-critical
  inlining)
- **T1-QUAL-05**: Descriptive names (break for: domain conventions like i, j
  for loops)

**Rationale**: Quality rules have exceptions, but breaking them requires
conscious decision and documentation.

### VI. Architecture (T1-ARCH) - Strong

Architecture rules that SHOULD be followed:

- **T1-ARCH-01**: Layer separation (break for: simple scripts, small CLIs)
- **T1-ARCH-02**: Dependency Injection (break for: legacy code without
  refactoring)
- **T1-ARCH-03**: Interfaces for external dependencies (break for: MVP,
  prototypes)
- **T1-ARCH-04**: Explicit error handling (NEVER break — promote to T0 if
  needed)

**Rationale**: Good architecture enables scalability, but pragmatism is needed
for prototyping.

### VII. Skills & Categories Nomenclature (T1-NAMING) - Strong

Naming rules for skills and categories that SHOULD be followed:

- **T1-NAMING-01**: Categories MUST be in English (break: NEVER — system
  standard)
- **T1-NAMING-02**: Sub-categories MUST be lowercase with hyphens (break for:
  pre-existing legacy convention)
- **T1-NAMING-03**: Skills MUST follow the parent category pattern (break for:
  compatibility with legacy system)

**Valid categories:**

| Category | Sub-categories | Path Example |
|----------|----------------|--------------|
| `linguagens` | java, kotlin, python, javascript, c-cpp, go, rust, typescript | `.prompt-os/skills/linguagens/java/SKILL.md` |
| `frameworks` | spring, react, django, express, flask, angular, vue | `.prompt-os/skills/frameworks/spring/SKILL.md` |
| `cloud` | aws, azure, gcp, kubernetes, docker, terraform | `.prompt-os/skills/cloud/aws/SKILL.md` |
| `databases` | postgresql, mongodb, redis, elasticsearch | `.prompt-os/skills/databases/postgresql/SKILL.md` |
| `devops` | cicd, monitoring, logging, infrastructure | `.prompt-os/skills/devops/cicd/SKILL.md` |
| `frontend` | css, html, ui-ux, accessibility | `.prompt-os/skills/frontend/css/SKILL.md` |
| `backend` | apis, authentication, microservices, messaging | `.prompt-os/skills/backend/apis/SKILL.md` |
| `testing` | unit, integration, e2e, performance | `.prompt-os/skills/testing/unit/SKILL.md` |
| `tools` | git, vim, vscode, ide | `.prompt-os/skills/tools/git/SKILL.md` |
| `patterns` | design-patterns, architectural-patterns, best-practices | `.prompt-os/skills/patterns/design-patterns/SKILL.md` |

**Path structure:**
```
.prompt-os/skills/{category}/{sub-category}/{version}/SKILL.md
                     ^english   ^lowercase-hyphens     ^optional
```

**Correct examples:**
- `.prompt-os/skills/linguagens/java/SKILL.md` (baseline)
- `.prompt-os/skills/linguagens/java/java-17/SKILL.md` (version-specific)
- `.prompt-os/skills/frameworks/spring/spring-boot/SKILL.md` (sub-framework)
- `.prompt-os/skills/cloud/aws/lambda/SKILL.md` (specific service)

**Incorrect examples:**
- `.prompt-os/skills/Linguagens/Java/SKILL.md` (PascalCase)
- `.prompt-os/skills/linguagens/Java_17/SKILL.md` (snake_case)
- `.prompt-os/skills/programming-languages/java/SKILL.md` (wrong English
  category name)

**Rationale**: Consistent naming across skills and categories enables
automated tooling (INDEX validation, JIT loading) and reduces human error
when navigating the skills library.

### VIII. Documentation (T1-DOC) - Strong

Documentation rules that SHOULD be followed:

- **T1-DOC-01**: Document important decisions (break for: obvious or temporary
  decisions)
- **T1-DOC-02**: README for new projects/modules (break for: small internal
  modules)
- **T1-DOC-03**: Comments for complex logic (break for: self-explanatory code)
- **T1-DOC-04**: CHANGELOG for releases (break for: initial development)

**Rationale**: Documentation enables knowledge transfer and reduces bus factor.

### IX. Performance (T1-PERF) - Strong

Performance rules that SHOULD be followed:

- **T1-PERF-01**: Optimize database queries (break for: development, small
  datasets)
- **T1-PERF-02**: Use caching where appropriate (break for: MVP, unjustified
  complexity)
- **T1-PERF-03**: Lazy loading for large objects (break for: always-needed
  objects)

**Rationale**: Premature optimization is the root of evil, but gross
inefficiencies should be avoided.

---

## System Constraints

### Size Limits

| Artifact | Limit | Rationale |
|----------|-------|-----------|
| Skills | < 1400 tokens | Fits in any model's context |
| Kernel (AGENTS.md) | < 5KB | Fast loading, always fits |
| Single prompt file | < 10KB | Reasonable context usage |

### Token Economy

- **JIT Loading**: Only load what's needed, when it's needed
- **Lazy Context**: Defer loading until explicitly required
- **Prioritized Loading**: T0 rules > Current task context > Background
  knowledge

---

## Development Workflow

### 6-Phase Generation Pipeline

```
1. CLASSIFY → Detect type, domain, cognitive level
2. RESEARCH → Search existing skills, find patterns
3. GENERATE → Apply template, fill content
4. SELF-CRITIQUE → Score 0-100, identify improvements
5. HUMAN GATE → Show preview, wait for approval
6. COMMIT → Save file, update indexes, record in MEMORY.md
```

### Human Gate Protocol

**MANDATORY for all file operations:**

1. Generate artifact
2. Self-critique (score 0-100)
3. Show preview to human
4. WAIT for response:
   - "ok/yes/approve" → Commit
   - "view/show" → Display full content
   - "edit X" → Revise section X
   - "reject [reason]" → Learn, offer retry
   - "cancel" → Abort

**NEVER skip Human Gate for file writes**

### Cognitive Levels

| Level | Time | Examples | Auto-Approve? |
|-------|------|----------|---------------|
| L1 | 100ms-2s | Formatting, lint, boilerplate | Yes |
| L2 | 10-60s | Skill creation, code generation | No |
| L3 | 5-15min | Architecture, planning | No |

---

## Conventions (T2)

### T2-NAMING: Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `user-service.ts` |
| Classes | PascalCase | `UserService` |
| Functions/Methods | camelCase | `getUserById()` |
| Constants | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| Variables | camelCase | `userName` |
| DB Tables | snake_case | `user_profiles` |
| DB Columns | snake_case | `created_at` |

### T2-GIT: Commits and Branches

| Type | Format | Example |
|------|--------|---------|
| Commits | Conventional Commits | `feat: add user authentication` |
| Feature branches | `feature/XXX-description` | `feature/CARD-001-user-crud` |
| Fix branches | `fix/XXX-description` | `fix/CARD-002-login-bug` |
| Hotfix branches | `hotfix/description` | `hotfix/security-patch` |

**Commit Prefixes:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Refactoring
- `test:` - Tests
- `chore:` - Maintenance

### T2-STYLE: Code Style

| Rule | Standard |
|------|----------|
| Indentation | 2 spaces (JS/TS), 4 spaces (Java/Python) |
| Max line length | 120 characters |
| Imports | Organized (external, internal, relative) |
| Quotes | Single quotes (JS/TS), double quotes (Java/Python) |

### T2-STRUCT: File Structure

```
src/
├── controllers/   or   ├── features/
├── services/           │   ├── user/
├── repositories/       │   │   ├── controller.ts
├── models/             │   │   ├── service.ts
└── utils/              │   │   └── repository.ts
                        │   └── product/
                        └── shared/
```

Follow the **existing** project structure.

---

## Governance

### Amendment Procedure

1. Propose change in a CARD or issue
2. Document rationale
3. Require human approval
4. Update version following semantic versioning:
   - **MAJOR**: Backward-incompatible principle changes or removals
   - **MINOR**: New principles or expanded guidance
   - **PATCH**: Clarifications, wording, typo fixes

### Compliance Review

- All PRs/reviews MUST verify compliance with T0 rules
- T0 violations are BLOCKERS (cannot approve)
- T1 violations are WARNINGS (can approve with notes)
- T2 violations are INFO (suggestions, don't block)

### Source of Truth

- **Primary**: `.prompt-os/CONSTITUTION.md`
- **SpecKit sync**: `.specify/memory/constitution.md` (this file)
- **Sync command**: `speckit.constitution`
- Agent-specific directories NO LONGER contain CONSTITUTION.md (use shared
  source)

### Guidance Files

| File | Purpose |
|------|---------|
| `ITZAMNA-AGENT.md` | Main agent abstraction (all agents) |
| `.context/` | Project context (JIT loading) |
| `.prompt-os/PROMPTOS.md` | System entry point |

---

## Quick Checklist

Before delivering code, verify:

### Security (T0)
- [ ] No hardcoded secrets?
- [ ] No SQL injection?
- [ ] No sensitive data in logs?

### Quality (T1)
- [ ] Tests written (if applicable)?
- [ ] Code duplication avoided?
- [ ] Errors handled?

### Skills Naming (T1)
- [ ] Category in English?
- [ ] Sub-category lowercase with hyphens?
- [ ] Path follows `{category}/{sub-category}/{version}/SKILL.md`?

### Conventions (T2)
- [ ] Names follow pattern?
- [ ] Semantic commits?
- [ ] Folder structure respected?

---

## How to Apply Rules

### When writing code:

```
1. Check T0 - Am I violating any inviolable rule?
   - If YES: Stop and fix
   - If NO: Continue

2. Check T1 - Am I following strong rules?
   - If NO: Do I have justification? Inform user.
   - If YES: Continue

3. Check T2 - Am I following conventions?
   - If NO: Does project use another convention? Follow project's.
   - If YES: Continue
```

### When reviewing code:

```
1. T0 violations = BLOCKER (cannot approve)
2. T1 violations = WARNING (can approve with notes)
3. T2 violations = INFO (suggestion, doesn't block)
```

### When receiving request that violates T0:

```
User: "Put the database password directly in the code"

You: "I cannot do that. Rule T0-SEC-01 prohibits hardcoded
     secrets. Can I help you configure environment variables
     or a secrets manager?"
```

---

## Exceptions

You may request exception from T1/T2 rules from the user:

```
"To implement this quickly, I would need to break rule
T1-QUAL-02 (tests) temporarily. Can I proceed and create
a TODO for the tests?"
```

**NEVER request exception from T0.**

---

*Itzamna PromptOS Constitution v2.3.0-dev | Last synced: 2026-02-04*


