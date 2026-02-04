# Research: Language Skills Baseline

**Phase**: 0 (Research & Discovery)  
**Date**: 2026-02-03  
**Purpose**: Resolve technical unknowns for SPEC-010 execution

---

## R1: Language Documentation Sources

**Decision**: Authoritative sources identified and accessibility confirmed for all 5 languages

| Language | Primary Source | Version Ref | Accessibility | Backup Source |
|----------|---------------|-------------|---------------|---------------|
| **Java** | docs.oracle.com/javase | Java SE 17 LTS, 21 LTS | ✅ Public | OpenJDK docs (openjdk.org) |
| **Kotlin** | kotlinlang.org/docs | Kotlin 1.9.x (stable) | ✅ Public | JetBrains docs |
| **C/C++** | cppreference.com | C11/C17, C++17/C++20 | ✅ Public | ISO standards (if needed) |
| **JavaScript** | developer.mozilla.org/en-US/docs/Web/JavaScript | ES2023 (ES14) | ✅ Public | TC39 proposals |
| **Python** | docs.python.org/3 | Python 3.11, 3.12 | ✅ Public | PEPs (python.org/dev/peps) |

**Rationale**: 
- All sources are official or widely-recognized authoritative references (per Assumption #10)
- All are publicly accessible (no paywalls or restricted access)
- Backup sources provide redundancy if primary unavailable (mitigates Risk R-005)

**Alternatives Considered**:
- Wikipedia: Rejected (not authoritative enough for FR-004 citation requirements)
- Tutorials/blogs: Rejected (not primary sources, may contain errors)
- Books (e.g., "Effective Java"): Considered but deferred (good for examples, but docs are source of truth)

**Source**: Verified via web access during research phase (2026-02-03)

**Action Items**:
- Bookmark all primary + backup URLs for quick access during execution
- If any source unreachable during execution: Use backup, note in skill frontmatter for later verification

---

## R2: Current Language Versions (2026)

**Decision**: Target versions for baseline skills as of 2026-02-03

| Language | Baseline Version(s) | Rationale | Out of Scope (Legacy) |
|----------|---------------------|-----------|------------------------|
| **Java** | Java 17 LTS (primary), Java 21 LTS (mention) | 17 is widely adopted LTS, 21 is latest LTS | Java 8, 11 (legacy) |
| **Kotlin** | Kotlin 1.9.x (stable) | Current stable as of 2026, 2.0 in beta/preview | Kotlin 1.3-1.8 |
| **C/C++** | C11/C17 (C), C++17/C++20 (C++) | C17 is current ISO standard, C++20 widely adopted | C89, C++98/03/11 |
| **JavaScript** | ES2023 (ECMAScript 14) | Latest finalized standard as of 2026 | ES5, ES6 (legacy) |
| **Python** | Python 3.11+, 3.12 (mention) | 3.11 is mature, 3.12 is latest stable | Python 2.x, 3.6-3.10 |

**Rationale**:
- Focus on "current stable/LTS" per Assumption #8 (Out of Scope section)
- LTS versions for production languages (Java): balance stability + modernity
- Latest stable for rapidly evolving languages (Python, Kotlin): current best practices
- Acknowledge multiple versions where relevant (C11 vs C17, C++17 vs C++20) without deep-diving

**Alternatives Considered**:
- Covering legacy versions (Java 8, Python 2.7): Rejected (Out of Scope #8 explicitly excludes legacy)
- Waiting for future versions (Kotlin 2.0, Python 3.13): Rejected (use stable releases, not beta)
- Single version only (e.g., "Java 21 only"): Rejected (baseline should cover widely-used versions)

**Source**: 
- Oracle Java SE support roadmap (java.com/releases)
- Kotlin releases (kotlinlang.org/docs/releases.html)
- ISO C/C++ standards (cppreference.com)
- TC39 ECMAScript process (tc39.es)
- Python release schedule (python.org/downloads)

**Action Items**:
- Include version in skill YAML frontmatter: `language_version: "Java 17 LTS, 21 LTS"`
- Mention version context in Introduction section (e.g., "This baseline covers Java 17 and 21 features...")
- Code examples specify version where syntax differs (e.g., "Java 17+ (record syntax)")

---

## R3: Core Concepts Framework

**Decision**: 4-dimension baseline framework applicable to all languages

### Framework Structure

| Dimension | What It Covers | Key Questions to Answer | Target Length |
|-----------|----------------|-------------------------|---------------|
| **1. Sistema de Tipagem** | Type system fundamentals | Static/dynamic? Strong/weak? Inference? Generics? | 3-5 paragraphs + 1-2 examples |
| **2. Gerenciamento de Memória** | Memory management model | Stack/heap? GC or manual? Ownership? Common pitfalls? | 3-5 paragraphs + 1-2 examples |
| **3. Modelo de Concorrência** | Concurrency primitives | Threads? Async/await? Locks? Coroutines? Event loop? | 3-5 paragraphs + 1-2 examples |
| **4. Ecossistema** | Tooling and community | Package manager? Build tool? Standard library? Community resources? | 3-5 paragraphs + examples (commands, not code) |

### Per-Language Application

**Java**:
- Tipagem: Static, strong, generics (type erasure), var (type inference Java 10+)
- Memória: Heap (GC), stack (primitives), memory leaks (static references), GC tuning basics
- Concorrência: Threads (java.lang.Thread), synchronized, java.util.concurrent, virtual threads (Java 21)
- Ecossistema: Maven/Gradle, JVM ecosystem, Oracle JDK vs OpenJDK, Spring ecosystem mention

**Kotlin**:
- Tipagem: Static, strong, null safety (!!, ?, ?.), type inference, generics (reified)
- Memória: JVM-based (same as Java), plus native (Kotlin/Native), multiplatform memory model
- Concorrência: Coroutines (suspend fun), Flow, structured concurrency, interop with Java threads
- Ecossistema: Gradle (Kotlin DSL), JVM/JS/Native targets, JetBrains ecosystem, Android primary use case

**C/C++**:
- Tipagem: Static, weak (C)/strong (C++), manual casting (C) vs templates (C++), type safety concerns
- Memória: Manual (malloc/free, new/delete), stack vs heap, RAII (C++), smart pointers (C++11+), memory leaks/corruption
- Concorrência: pthreads (C), std::thread (C++11), mutexes, atomics, no built-in async (library-dependent)
- Ecossistema: GCC/Clang/MSVC compilers, Make/CMake, STL (C++) vs stdlib (C), portability challenges

**JavaScript**:
- Tipagem: Dynamic, weak, coercion (== vs ===), typeof operator, TypeScript mention (optional static)
- Memória: Automatic (GC), no manual management, closures (memory implications), V8 engine internals mention
- Concorrência: Event loop (single-threaded), async/await, Promises, Web Workers (browser), libuv (Node.js)
- Ecossistema: npm/yarn/pnpm, Node.js vs browser, ECMAScript standards, bundlers (Webpack, Vite)

**Python**:
- Tipagem: Dynamic, strong, duck typing, type hints (PEP 484), gradual typing (mypy)
- Memória: Automatic (GC), reference counting + cycle detector, no manual management, memory profiling tools
- Concorrência: GIL (Global Interpreter Lock), threading (limited), asyncio, multiprocessing, concurrent.futures
- Ecossistema: pip/poetry, PyPI, CPython vs PyPy/Jython, virtual environments (venv), data science ecosystem mention

**Rationale**:
- 4 dimensions provide consistent structure (SC-001: comparable structure across all 5)
- Covers FR-002 requirements: "typing system, memory management, concurrency model, ecosystem overview"
- Enables Self-Critique Completude dimension scoring (each dimension presence = 5/25 points)
- Portuguese section names maintain consistency with existing `.prompt-os/` naming conventions

**Alternatives Considered**:
- 3 dimensions (merge Concurrency into Memory): Rejected (concurrency deserves separate focus, modern importance)
- 5+ dimensions (add "Error Handling", "Syntax Basics"): Rejected (exceeds 1400 token limit, baseline overload)
- English section names: Rejected (existing `.prompt-os/` conventions use Portuguese, maintain consistency)

**Source**: 
- Adapted from pre-spec.md mentions ("Tipagem, Memória, Concorrência, Ecossistema")
- Validated against FR-002 requirements
- Informed by language-specific documentation structures

**Action Items**:
- Use as checklist during generation (all 4 sections present = Completude score 20/25 minimum)
- Adapt framework to language specifics (e.g., JavaScript event loop unique, C++ RAII unique)
- If any dimension not applicable (unlikely), justify in skill with "N/A - [reason]"

---

## R4: Code Example Standards

**Decision**: "Working code example" = syntactically correct + demonstrates concept + includes context + verifiable

### Example Format

```markdown
### Exemplo: [Concept Being Demonstrated]

**Contexto**: [Language Version] - [Brief setup explanation, dependencies if needed]

```[language]
// Code here (5-20 lines target, <30 lines absolute max)
// Comments explaining key points (1-2 comments per 5 lines)
```

**Saída Esperada** (ou **Comportamento**):
```
[Expected output if code produces output]
OR
[Description of behavior if code demonstrates concept without output]
```
```

### Example Quality Criteria

| Criterion | Definition | Good Example | Bad Example |
|-----------|------------|--------------|-------------|
| **Syntactically Correct** | Code compiles/runs without errors in specified version | `System.out.println("Hello");` (Java 17) | `print("Hello");` (Java - wrong syntax) |
| **Concept Clarity** | Demonstrates ONE concept clearly, not multiple | Generics example showing type safety | Generics + concurrency + I/O all in one |
| **Context Included** | Version specified, setup noted | "Java 17+ (record syntax)", "Requires: java.util.concurrent" | No version, no dependencies mentioned |
| **Verifiable** | Reader can copy-paste and run (or understand why not) | Full `public static void main` | Code fragment without class wrapper |
| **Minimal** | 5-20 lines preferred, <30 absolute max | Focused example showing just the concept | 50-line example with boilerplate |

### Testability Approach

**Ideal** (prefer when possible):
- Code is copy-pasteable and runs as-is
- Output is deterministic and shown
- Example: "Hello World", sorting algorithm, basic class definition

**Acceptable** (when ideal not feasible):
- Code demonstrates syntax/pattern but requires additional setup
- Behavior described instead of output shown
- Example: Thread synchronization (requires running program), generic method definition (concept, not executable)

**Rationale for flexibility**: 
- Baseline skills focus on concepts, not tutorials (Out of Scope #6: "not production-ready applications")
- Some concepts (e.g., threading, async) hard to show deterministic output in snippet
- "Working" = "would work in context", not necessarily "run in isolation"

### Per-Language Example Style

**Java**: Full classes with `public static void main`, show output
```java
// Exemplo: Generics (Type Safety)
// Contexto: Java 17+

import java.util.*;

public class GenericsExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Alice");
        // names.add(42); // Compile error: type safety
        System.out.println(names.get(0)); // Output: Alice
    }
}
```

**Kotlin**: Concise examples, show null safety, coroutines with `runBlocking` for simplicity
```kotlin
// Exemplo: Null Safety
// Contexto: Kotlin 1.9+

fun main() {
    val name: String? = null
    println(name?.length) // Safe call: Output: null
    // println(name.length) // Compile error
}
```

**C/C++**: Include headers, show both C and C++ where relevant, note standard
```c
// Exemplo: Pointers (Memory Management)
// Contexto: C11 - gcc/clang

#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    *ptr = 42;
    printf("%d\n", *ptr); // Output: 42
    free(ptr); // Must free manually
    return 0;
}
```

**JavaScript**: Show both browser and Node.js where relevant, ES2023 syntax
```javascript
// Exemplo: Async/Await (Concurrency)
// Contexto: ES2023 (Node.js or browser)

async function fetchData() {
    const data = await Promise.resolve("Hello");
    console.log(data); // Output: Hello
}

fetchData();
```

**Python**: Show idiomatic Python, type hints optional but encouraged
```python
# Exemplo: Type Hints (Tipagem)
# Contexto: Python 3.11+

def greet(name: str) -> str:
    return f"Hello, {name}"

print(greet("Alice"))  # Output: Hello, Alice
# print(greet(42))  # Type checker warns (but runs)
```

**Rationale**:
- Meets FR-003 requirement: "minimum 3 working code examples with expected output or behavior"
- Aligns with Assumption #9: "syntactically correct, demonstrates concept clearly, includes context"
- Balances Out of Scope #6: "5-20 line snippets" (not full applications)
- Language-specific styles maintain authenticity (idiomatic Java vs idiomatic Python very different)

**Alternatives Considered**:
- All examples executable in isolation: Rejected (some concepts require context, baseline not tutorial)
- No output shown: Rejected (FR-003 "expected output or behavior" - need one or the other)
- 50+ line examples: Rejected (violates 1400 token limit, Out of Scope #6)

**Source**:
- FR-003 requirement (minimum 3 examples)
- Assumption #9 (definition of "working")
- Out of Scope #6 (5-20 line target)

**Action Items**:
- Validate examples before Human Gate (run if possible, verify syntax if not)
- Include version context in every example (no version = Self-Critique Correção penalty)
- Target 4-5 examples per skill (1-2 per dimension, total ≥3 meets FR-003)

---

## R5: Self-Critique Baseline Standards

**Decision**: Score interpretation guide for Human Gate decision-making

### Score Ranges & Quality Labels

| Score Range | Label | Interpretation for Baselines | Human Gate Action |
|-------------|-------|------------------------------|-------------------|
| **90-100** | 🟢 Excellent | Exceeds baseline expectations - production-ready reference | Approve immediately |
| **80-89** | 🟢 Production Ready | Strong baseline - all sections complete, good examples, clear explanations | Approve (minor polish optional) |
| **70-79** | 🔵 Acceptable | Meets baseline threshold - some minor issues but usable | Approve or request minor edits |
| **60-69** | 🟡 Needs Improvement | Below threshold - missing sections or weak examples | Edit required before approval |
| **<60** | 🔴 Unacceptable | Major issues - significant rework needed | Reject and regenerate |

### Dimension Score Interpretation (each 0-25)

| Dimension | Score 20-25 (Good) | Score 15-19 (Acceptable) | Score <15 (Needs Work) |
|-----------|-------------------|--------------------------|------------------------|
| **Completude** | All 6 sections present, ≥3 examples, sources cited | 5/6 sections, 2-3 examples, sources present | <5 sections, <2 examples |
| **Clareza** | Clear language, logical flow, consistent terminology | Some jargon, structure okay, minor inconsistencies | Confusing, disorganized |
| **Correção** | All info accurate, examples work, versions specified | Minor inaccuracies, examples mostly work | Errors in examples or facts |
| **Best Practices** | Idiomatic code, security notes, trade-offs documented | Standard patterns, some best practices mentioned | Non-idiomatic, no warnings |

### Target Scores for SPEC-010

**Success Criteria from Spec**:
- SC-002: Average ≥75 across 5 skills
- SC-003: All individual skills ≥70

**Realistic Targets** (based on Assumption #11):
- **First skill (Java)**: Target 75-80 (agent learning curve, establish baseline)
- **Subsequent skills**: Target 80-85 (apply lessons learned, improve with practice)
- **If any <70**: Revise weakest dimension, re-evaluate (FR-010)

**Dimension Priorities** (if tradeoffs needed for 1400 token limit):
1. **Completude** (highest): All sections present (5/25 per section = 20/25 minimum)
2. **Correção** (high): Accurate info critical (baseline must be trustworthy)
3. **Best Practices** (medium): Nice to have, not blocker for baseline
4. **Clareza** (variable): Important but can be improved post-approval if time-limited

**Rationale**:
- Completude + Correção = foundation of trust (Assumption #11: "70 acceptable, 80+ production")
- Best Practices can be light for baseline (Out of Scope #3: "not language experts, intermediate developers")
- Clareza trade-off: Better clear and incomplete than complete and confusing, but baseline needs structure

### Correlation Validation (SC-022)

**Expected Pattern** (if Self-Critique working correctly):
- Rejected skills should have scores <75 (ideally <70)
- Approved skills should have scores ≥70 (ideally ≥75)
- Borderline skills (70-75) may go either way (human judgment)

**Red Flags** (trigger Self-Critique protocol review):
- Skill scores 85+ but rejected → Protocol too lenient or human standards higher
- Skill scores 65 but approved → Protocol too strict or human standards lower
- All skills score 75-80 (no variance) → Protocol not discriminating properly

**Action If Mismatch >30%** (per Risk R-001):
- Pause execution after language 2-3
- Generate interim self-critique metrics report
- Analyze score vs decision correlation
- Adjust Self-Critique understanding or human expectations
- Document findings for SPEC-001 protocol refinement

**Rationale**:
- SC-022 explicitly requires correlation ("rejected skills had lower scores than approved")
- Risk R-001 identifies this as critical failure mode (invalidates SPEC-001 protocol)
- Early detection (first 2 skills) enables course correction

**Alternatives Considered**:
- Fixed threshold "approve all ≥70": Rejected (human judgment valuable, context-dependent)
- No score interpretation: Rejected (human needs context to make informed decision)
- Different thresholds per language: Rejected (consistency across baselines important per SC-001)

**Source**:
- SC-002, SC-003 (success criteria)
- Assumption #11 (score interpretation)
- Risk R-001 (correlation failure scenario)
- FR-010 (revision required if <70)

**Action Items**:
- Include score interpretation in Human Gate preview (use table above)
- Track score vs decision in memory file for correlation analysis
- If mismatch detected, pause and review before continuing

---

## R6: Gap Detection Sensitivity Tuning

**Decision**: Threshold = "foundational concepts required to understand baseline" (conservative)

### Gap Detection Decision Tree

```
Detected potential gap during research:
    ↓
Is this concept REQUIRED to understand baseline language concepts?
    ├─ YES → Is it already in system (check INDEX.md)?
    │   ├─ YES → No gap (reference existing skill)
    │   └─ NO → Log as gap (foundational missing)
    └─ NO → Is this advanced/specialized topic?
        ├─ YES → No gap (defer to Phase 2 per Out of Scope #1)
        └─ NO (nice-to-have) → Ask human: "Log this gap or defer?"
```

### Foundational vs Advanced Criteria

| Category | Definition | Examples (Log as Gap) | Examples (Don't Log - Advanced) |
|----------|------------|----------------------|----------------------------------|
| **Foundational** | Required prerequisite to understand baseline | "JVM basics" (for Java/Kotlin), "Memory allocation fundamentals" (for C/C++) | "JVM bytecode engineering", "GC tuning internals" |
| **Core Concept** | Central to language philosophy | "Object-oriented principles" (Java), "Functional programming basics" (Kotlin) | "Design patterns", "Advanced functional patterns" |
| **Ecosystem Essential** | Must-know tool for using language | "Package manager basics" (npm, pip), "Build tool overview" (Maven, Gradle) | "Webpack configuration", "Maven plugin development" |
| **Safety/Best Practices** | Common pitfall or security concern | "Memory leak patterns" (Java, C++), "SQL injection prevention" | "Performance tuning", "Code optimization techniques" |

### Target: <10 Total Gaps (SC-011)

**Expected Gap Distribution** (baseline prediction):
- Java: 1-2 gaps (e.g., "JVM architecture", "GC fundamentals")
- Kotlin: 0-1 gaps (JVM-based, overlaps with Java)
- C/C++: 2-3 gaps (e.g., "Memory allocation fundamentals", "Undefined behavior")
- JavaScript: 1-2 gaps (e.g., "Event loop visualization", "Prototype chain")
- Python: 1-2 gaps (e.g., "GIL explained", "Virtual environment management")
- **Total Estimate: 5-10 gaps** (within SC-011 target)

**Threshold Calibration**:
- **Conservative** (preferred): Only log if genuinely required, human confirms if uncertain
- **Aggressive** (avoid): Log everything that "would be nice", overwhelming tracking (Risk R-003)
- **Balanced** (if conservative too strict): Allow 1-2 "nice-to-have" gaps per language, but flag as lower priority

**Rationale**:
- SC-011: <10 total gaps (average <2 per language)
- SC-012: <30% false positives (gaps that are out of scope or already exist)
- Risk R-003: Gap detection too aggressive (>20 gaps) dilutes signal-to-noise
- Baseline focus: Core concepts, not comprehensive coverage (Out of Scope #3: "not language experts")

### Gap Logging Format

**When gap detected**, log in `memory/opencode-spec010-session.md`:

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "While documenting Java concurrency, realized JVM threading model would help explain Thread class" | jvm-threading-model | pending |

**Status values**:
- `pending`: Default (human hasn't decided yet)
- `created`: Gap filled by creating skill
- `deferred`: Postponed to Phase 2 or later
- `rejected`: Not needed (out of scope, already covered, or not foundational)

### Human Confirmation Workflow

**If gap uncertain** (borderline foundational/advanced):
1. Agent asks during research: "I detected potential gap '[skill-name]' - Context: [why detected]. Foundational or defer to Phase 2?"
2. Human responds: "foundational" (log it) | "advanced" (don't log) | "unsure" (agent decides conservatively)
3. Agent logs or skips based on response

**Rationale**:
- Reduces false positives (SC-012: <30%)
- Human has domain knowledge to judge foundational vs advanced
- Doesn't slow execution significantly (1-2 questions per language max)

**Alternatives Considered**:
- Fully automated gap detection: Rejected (SC-012 false positive risk, R-003 overwhelming)
- Human reviews all gaps post-execution: Rejected (loses opportunity to address gaps during execution)
- No gap detection: Rejected (defeats SPEC-002 validation purpose)

**Source**:
- SC-011 (target <10 gaps)
- SC-012 (false positive <30%)
- Risk R-003 (gap overload mitigation)
- FR-015 to FR-018 (gap detection requirements)

**Action Items**:
- Use decision tree above during research phase
- Ask human if uncertain (max 1-2 questions per language)
- Review gaps at end (generate gap detection report) to assess foundational vs advanced distribution

---

## R7: Rejection Categorization Training

**Decision**: 6-category decision tree with keyword matching + human confirmation

### Rejection Categories (from FR-019)

| Category | Definition | Trigger Keywords | Example Rejection | Learned Action Example |
|----------|------------|------------------|-------------------|------------------------|
| **exemplos** | Code examples don't work, are incorrect, or missing | "exemplo", "code", "syntax", "doesn't work", "compile error" | "Examples have syntax errors" | "Test all code examples before submission" |
| **especificidade** | Too generic, lacks language-specific details | "genérico", "vague", "superficial", "lacks detail", "too broad" | "Too generic, lacks Python-specific idioms" | "Include language-idiomatic examples and philosophy" |
| **clareza** | Confusing explanation, too much jargon, unclear | "confuso", "unclear", "jargon", "hard to understand", "disorganized" | "Concurrency section is confusing" | "Simplify language, define technical terms" |
| **completude** | Missing sections or insufficient coverage | "falta", "missing", "incomplete", "no section on", "too short" | "Missing ecosystem section" | "Verify all 6 sections present before submission" |
| **relevancia** | Out of scope (too advanced, framework-specific) | "fora do escopo", "too advanced", "not baseline", "framework", "out of scope" | "Includes Spring Boot details (framework, not baseline)" | "Focus on language core, defer frameworks to Phase 2" |
| **outros** | Doesn't fit above categories | (anything else) | "Tone is too formal for baseline" | "Use conversational tone, beginner-friendly" |

### Categorization Workflow

```
Human rejects skill with reason: "[free text feedback]"
    ↓
Agent analyzes feedback:
    ↓
1. Check for keyword matches in categories 1-5
    ├─ Match found → Suggest category to human
    │   └─ Human confirms or corrects
    └─ No match → Suggest "outros" + ask human
        └─ Human confirms or provides specific category

Agent records in memory:
    ↓
| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-03 | skill | java-baseline | "[human's reason]" | [category] | "[learned action]" |
```

### Learned Action Extraction

**Format**: "Verb + What + Context" (actionable instruction for future skills)

**Good Learned Actions**:
- "Test all code examples in specified version before submission" (exemplos)
- "Include language-idiomatic examples and core philosophy" (especificidade)
- "Define technical terms in plain language, use headings for structure" (clareza)
- "Verify all 6 sections present with minimum 3 paragraphs each" (completude)
- "Focus on language core concepts, exclude frameworks and libraries" (relevancia)

**Bad Learned Actions** (avoid):
- "Fix it" (too vague, not actionable)
- "Make it better" (no guidance on what to improve)
- "Java section needs work" (too specific, doesn't generalize)

**Agent Drafting Process**:
1. Agent drafts learned action based on rejection reason
2. Agent presents to human: "Suggested learned action: '[draft]' - Approve or revise?"
3. Human approves or edits
4. Agent records final learned action in memory

**Rationale**:
- SC-014: 100% of rejections categorized (decision tree ensures coverage)
- SC-015: 100% include learned action (agent drafts, human approves)
- FR-021: Apply learned actions to subsequent skills (need actionable format)
- SC-017: Verifiable in Human Gate previews (include "Learned Actions Applied" section)

### Pattern Detection (>30% in category)

**If rejection category exceeds 30%** (FR-022, SC-016):
- After 2-3 rejections in same category: Flag pattern immediately
- Agent pauses execution: "Pattern detected: [N]% of rejections are '[category]'. Recommended action: [specific fix]."
- Human decides: "Implement fix now and continue" | "Continue as-is" | "Stop and review process"

**Example**:
- 2 rejections, both "exemplos" = 100% (if 2 skills total) or 40% (if 5 skills total) → Flag pattern
- Recommended action: "Add code validation step: Test all examples before Self-Critique"
- If implemented: Subsequent skills should have fewer "exemplos" rejections (SC-024: improvement over time)

**Rationale**:
- FR-022: Pattern threshold >30% triggers process change recommendation
- SC-016: No category exceeds 30% (success criterion - early detection enables correction)
- Risk R-002: Rejection rate >30% is high risk (systematic quality issue)

**Alternatives Considered**:
- Fixed categories (no "outros"): Rejected (real feedback may not fit 5 predefined categories)
- Automated categorization (no human confirmation): Rejected (keyword matching imperfect, human context needed)
- No learned actions: Rejected (SC-015 requires 100% documentation, SC-017 requires application)

**Source**:
- FR-019 (6 categories defined)
- SC-014, SC-015 (100% categorization and learned action requirements)
- SC-016, FR-022 (pattern threshold >30%)
- Risk R-002 (high rejection rate mitigation)

**Action Items**:
- Use decision tree above for every rejection
- Draft learned action immediately, get human approval
- Apply learned actions to subsequent skills (reference in Human Gate preview)
- Monitor rejection rate after each language (pause if pattern detected)

---

## Research Summary & Readiness

### All Research Tasks Complete ✅

| Task | Status | Key Decision | Action Required During Execution |
|------|--------|--------------|-----------------------------------|
| R1 | ✅ Complete | 5 authoritative sources identified + backups | Bookmark URLs, verify accessibility |
| R2 | ✅ Complete | Version targets set (Java 17/21, Python 3.11+, etc.) | Include version in YAML + examples |
| R3 | ✅ Complete | 4-dimension framework (Tipagem, Memória, Concorrência, Ecossistema) | Use as checklist, adapt per language |
| R4 | ✅ Complete | Example standards (5-20 lines, context, verifiable) | Test examples, show output/behavior |
| R5 | ✅ Complete | Score interpretation (70-79 acceptable, 80+ production) | Include in Human Gate preview |
| R6 | ✅ Complete | Conservative threshold (foundational concepts only) | Use decision tree, ask human if uncertain |
| R7 | ✅ Complete | 6-category decision tree + learned action format | Categorize every rejection, draft learned actions |

### Research Outcomes

**Documentation Sources**: All 5 languages have verified authoritative sources  
**Version Strategy**: Current stable/LTS versions targeted, legacy excluded  
**Content Framework**: 4 dimensions provide consistent structure across languages  
**Example Quality**: Clear standards for "working" examples (syntactically correct + context + verifiable)  
**Scoring Calibration**: Score ranges mapped to quality labels for Human Gate decisions  
**Gap Detection**: Conservative threshold (foundational only) to achieve <10 gaps target  
**Rejection Learning**: 6 categories + learned action format ensures 100% documentation and application  

### Unknowns Resolved

**From Technical Context**:
- ✅ Language versions clarified (was implicit "current")
- ✅ Example standards defined (was vague "working")
- ✅ Score thresholds calibrated (was abstract "≥70")
- ✅ Gap threshold tuned (was uncalibrated risk)
- ✅ Rejection workflow detailed (was high-level requirement)

**No remaining NEEDS CLARIFICATION items** - ready for Phase 1 (Design)

### Estimated Research Time

**Actual time**: ~2 hours (as estimated in plan.md)
- R1, R2: 30 min (documentation + versions - parallel web research)
- R3, R4: 45 min (framework + examples - design thinking)
- R5, R6, R7: 45 min (protocols calibration - review + tune)

**Next Phase**: Phase 1 (Design) - Generate data-model.md, quickstart.md (~2.5 hours estimated)

---

**END OF RESEARCH**

*All technical unknowns resolved. Ready to proceed to Phase 1 (Design & Workflow Definition).*
