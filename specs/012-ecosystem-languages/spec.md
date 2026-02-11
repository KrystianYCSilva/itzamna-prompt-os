# Feature Specification: Language Ecosystem & New Baselines

**Feature Branch**: `012-ecosystem-languages`  
**Created**: 2026-02-04  
**Status**: Draft  
**Input**: User description: "Expand PromptOS language support with ecosystem sub-files for Go/Python/JavaScript and create three new language baselines: Rust, TypeScript, and Ruby"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ecosystem Sub-Files for Existing Languages (Priority: P1)

As a developer using Go, Python, or JavaScript, I want to access ecosystem-specific guidance (frameworks, libraries, testing tools) on-demand so that I can build production-ready applications following best practices without consulting external documentation.

**Why this priority**: This delivers immediate value to the 80% of developers who need ecosystem knowledge beyond language syntax. Without ecosystem files, developers lack practical guidance for real-world projects.

**Independent Test**: Can be fully tested by requesting ecosystem guidance for Go (e.g., "How do I use Gin for web routing?") and receiving comprehensive, actionable advice with code examples.

**Acceptance Scenarios**:

1. **Given** a developer is working on a Go web application, **When** they request guidance on web frameworks, **Then** the system provides detailed coverage of Gin, Echo, and Chi with routing examples, middleware patterns, and request lifecycle management

2. **Given** a Python developer needs to set up a web API, **When** they ask about FastAPI vs Flask, **Then** the system provides comparison, best practices for async handlers, and ORM integration patterns

3. **Given** a JavaScript developer is choosing a testing framework, **When** they request testing guidance, **Then** the system explains Jest vs Vitest with mocking examples, snapshot testing, and e2e basics

4. **Given** any ecosystem file is loaded, **When** the file exceeds 1,400 tokens, **Then** the system MUST split into JIT sub-files to comply with T0-SIZE-01 constraint

---

### User Story 2 - New Language Baselines (Priority: P2)

As a PromptOS user working with Rust, TypeScript, or Ruby, I want comprehensive language baseline skills so that I can write idiomatic code and understand core concepts without switching to external documentation.

**Why this priority**: These three languages represent high-demand ecosystems not yet covered (Rust for systems programming, TypeScript for type-safe JS, Ruby for web/ DevOps). Expanding baseline coverage from 6 to 9 languages significantly broadens PromptOS applicability.

**Independent Test**: Can be fully tested by requesting a Rust code review and receiving feedback on ownership, borrowing, and lifetime usage - demonstrating the baseline skill is active and functioning.

**Acceptance Scenarios**:

1. **Given** a developer writes Rust code with ownership issues, **When** they request a review, **Then** the system identifies ownership violations, explains borrowing rules, and suggests idiomatic fixes

2. **Given** a TypeScript developer uses `any` types excessively, **When** they ask for type safety guidance, **Then** the system explains interfaces vs type aliases, generics, and mapped types with refactoring examples

3. **Given** a Ruby developer creates a DSL, **When** they ask about metaprogramming, **Then** the system explains define_method, class_eval, and block patterns with practical examples

4. **Given** any baseline skill is created, **When** it is evaluated, **Then** it must score ≥ 95 on Self-Critique and include comparison tables with at least 3 other languages

---

### User Story 3 - Version-Specific Advanced Skills (Priority: P3)

As a developer using modern language versions (Go 1.18+, Python 3.10+, ES2023+), I want guidance on version-specific features so that I can leverage new capabilities like generics, pattern matching, and modern array methods effectively.

**Why this priority**: Version-specific skills enable developers to use cutting-edge features safely. This is quality-of-life enhancement that differentiates PromptOS from static documentation.

**Independent Test**: Can be fully tested by asking about Go 1.18 generics and receiving explanation of type parameters, constraints, and migration guidance from pre-1.18 patterns.

**Acceptance Scenarios**:

1. **Given** a Go developer on 1.18+, **When** they ask about generics, **Then** the system explains type parameters, constraints (comparable, any), and provides before/after migration examples

2. **Given** a Python 3.10+ user, **When** they encounter pattern matching for the first time, **Then** the system explains match/case syntax, guards, and class patterns with practical data structure examples

3. **Given** a JavaScript developer using ES2023, **When** they ask about new array methods, **Then** the system demonstrates findLast, toSorted, toReversed, and with methods compared to older approaches

4. **Given** any advanced skill references its parent baseline, **When** the baseline is loaded, **Then** the advanced skill is discoverable via the parent's "See Also" section

---

### Edge Cases

- **What happens when ecosystem guidance conflicts with baseline guidance?** → Baseline takes precedence for core language concepts; ecosystem provides framework-specific implementation details
- **How does the system handle a language version that is too new (no established best practices)?** → Mark as experimental, reference official docs primarily, note limited community consensus
- **What happens when two frameworks provide the same functionality (e.g., Flask vs FastAPI)?** → Provide comparison table with trade-offs (performance, learning curve, ecosystem size) and recommend based on use case
- **How does JIT loading handle ecosystem files that exceed token limits mid-generation?** → Auto-split at logical boundaries (by framework or topic) following SPEC-003 JIT protocol
- **What happens if a new language version breaks backward compatibility?** → Advanced skill must include "Migration from Previous Version" section with breaking changes and migration path
- **How are ecosystem files validated for accuracy with rapidly changing libraries?** → Use SPEC-003 source validation (minimum 2 T1 sources), version-lock examples to stable releases

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide ecosystem sub-files for Go, Python, and JavaScript covering frameworks, testing, deployment, and tooling
- **FR-002**: System MUST create baseline skills for Rust, TypeScript, and Ruby following SPEC-010 template structure
- **FR-003**: System MUST create version-specific advanced skills for Go 1.18+, Python 3.10+, and JavaScript ES2023+
- **FR-004**: Each ecosystem file MUST cover at minimum: web frameworks, testing approaches, deployment patterns, and key tooling
- **FR-005**: Each baseline skill MUST include: core concepts, type system, error handling, and comparison with ≥3 languages
- **FR-006**: All files MUST comply with T0-SIZE-01 constraint (≤ 1,400 tokens) or use JIT sub-files
- **FR-007**: All baseline skills MUST achieve Self-Critique score ≥ 95 before approval
- **FR-008**: System MUST use SPEC-003 research protocols (minimum 2 T1 sources per skill)
- **FR-009**: All new skills MUST be registered in INDEX.md with proper categorization
- **FR-010**: Ecosystem files MUST be loadable on-demand via JIT protocol without loading entire skill
- **FR-011**: Version-specific skills MUST reference parent baseline and explain migration from previous versions
- **FR-012**: All files MUST include at least 3 runnable code examples

### Key Entities

- **Ecosystem Sub-File**: JIT-loadable file containing framework-specific guidance for a language (e.g., `go/ecosystem.md`)
- **Language Baseline**: Core skill file covering language fundamentals (e.g., `rust/SKILL.md`)
- **Advanced Skill**: Version-specific file extending baseline (e.g., `go/go-118/SKILL.md`)
- **Source Validation**: SPEC-003 protocol ensuring ≥2 T1 sources per skill
- **Self-Critique Score**: 4-dimension quality assessment (completeness, accuracy, clarity, applicability)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Language baselines increase from 6 to 9 (50% expansion) - Rust, TypeScript, Ruby successfully created and approved
- **SC-002**: Ecosystem sub-files created for all 3 target languages (Go, Python, JavaScript) with ≥5 topics each
- **SC-003**: Version-specific advanced skills created for 3 language versions (Go 1.18+, Python 3.10+, ES2023+)
- **SC-004**: 100% of new skills achieve Self-Critique score ≥ 95 (maintain existing 99.20 average)
- **SC-005**: 100% of ecosystem and baseline files comply with T0-SIZE-01 (≤ 1,400 tokens or JIT split)
- **SC-006**: All skills include ≥2 T1 validated sources per SPEC-003 protocol
- **SC-007**: Total skills grow from 13 to 22 (9 new skills delivered)
- **SC-008**: 100% of new skills include comparison tables with ≥3 languages
- **SC-009**: 100% of ecosystem files include ≥3 runnable examples
- **SC-010**: Zero T0 violations across all deliverables

---

## Assumptions *(optional)*

- Developers using ecosystem files have basic familiarity with the parent language (baseline skill available)
- Framework versions referenced are stable/LTS releases (not alpha/beta)
- Version-specific features are generally available (not behind feature flags in most distributions)
- JIT loading infrastructure from SPEC-003 is fully operational
- Existing baseline skills (Go, Python, JavaScript) are stable and approved
- Human Gate approval will not block more than 10% of deliverables (target rejection rate < 10%)

---

## Out of Scope *(optional)*

- Language ecosystems beyond Go, Python, JavaScript (future phases)
- Baseline skills beyond Rust, TypeScript, Ruby (future expansion)
- Version-specific skills beyond the 3 target versions (continuous updates)
- GUI/visual programming frameworks (focus on code/text-based)
- Mobile-specific frameworks (React Native, Flutter - different domain)
- Legacy/deprecated framework versions (focus on current stable)
- IDE/editor specific configurations (VSCode, Vim - separate concern)
- Cloud-provider specific tooling (AWS SDK, Azure - separate domain)

---

## Dependencies *(optional)*

- **SPEC-003 (WEB-RESEARCH.md)**: Source validation protocols for research quality
- **SPEC-010 (Language Skills Baseline)**: Template structure for baseline creation
- **Go Baseline**: Must exist before go-118 advanced skill
- **Python Baseline**: Must exist before python-310 advanced skill
- **JavaScript Baseline**: Must exist before es2023 advanced skill
- **AUTO-INCREMENT.md**: Prevent duplicate entries in INDEX.md
- **SKILL.template.md**: Canonical template for all skill files
- **INDEX.md**: Registry must be updated after each skill approval

---

## Constraints *(optional)*

- All files MUST comply with T0-SIZE-01 (≤ 1,400 tokens)
- All baselines MUST achieve Self-Critique ≥ 95
- All skills MUST use JIT sub-files if exceeding token limit
- All research MUST use ≥2 T1 sources per SPEC-003
- All baselines MUST include cross-language comparison (≥3 languages)
- Human Gate approval required for each skill individually
- INDEX.md updates must be atomic (no partial updates)
- Conventional commits required per phase

---

*SPEC-012 — Language Ecosystem & New Baselines | v1.0 | 2026-02-04*
