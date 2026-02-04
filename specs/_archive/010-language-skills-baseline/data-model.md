# Data Model: Language Skills Baseline

**Phase**: 1 (Design & Workflow Definition)  
**Date**: 2026-02-03  
**Purpose**: Define canonical structures, state machine, and workflows for SPEC-010 execution

---

## D1: Skill Data Model

### YAML Frontmatter Schema

**Location**: `.prompt-os/skills/linguagens/{language}/SKILL.md`  
**Format**: YAML block at file start (lines 1-15 approx)

```yaml
---
type: skill
category: technology
subcategory: languages
name: {language-name}
level: baseline
version: "1.0.0"
language_version: "{version-info}"
tags:
  - {language-name}
  - {key-concept-1}
  - {key-concept-2}
  - {key-concept-3}
  - {ecosystem-tool}
dependencies: []
related_skills:
  - {related-skill-1}
  - {related-skill-2}
sources:
  - name: "{Official Documentation}"
    url: "{https://...}"
  - name: "{Standard/Reference}"
    url: "{https://...}"
created: "{YYYY-MM-DD}"
updated: "{YYYY-MM-DD}"
---
```

### Field Definitions & Constraints

| Field | Type | Constraint | Example (Java) | Purpose |
|-------|------|-----------|----------------|---------|
| `type` | string | Fixed: "skill" | `skill` | Identifies document type for indexing |
| `category` | string | Fixed: "technology" | `technology` | Top-level categorization (vs "academic") |
| `subcategory` | string | Fixed: "languages" | `languages` | Second-level categorization |
| `name` | string | Lowercase, hyphenated | `java` | Unique identifier (matches directory name) |
| `level` | string | Fixed: "baseline" | `baseline` | Skill depth level (SPEC-010 creates baselines) |
| `version` | string | Semantic versioning | `"1.0.0"` | Skill version (increment per SPEC-002) |
| `language_version` | string | Free text | `"Java 17 LTS, 21 LTS"` | Language version(s) covered (R2 research) |
| `tags` | list[string] | 4-6 items, lowercase | `["java", "jvm", "oop", "maven", "gradle"]` | Search keywords (language + 3-5 key concepts) |
| `dependencies` | list[string] | Empty for baselines | `[]` | Skills required before this one (empty = standalone) |
| `related_skills` | list[string] | 1-3 items, lowercase | `["kotlin", "jvm-internals"]` | Related or complementary skills |
| `sources` | list[object] | 2-4 items, name+url | See R1 research | Citations for FR-004 compliance (T0-SOURCE-01) |
| `created` | string | ISO 8601 date | `"2026-02-03"` | Initial creation date |
| `updated` | string | ISO 8601 date | `"2026-02-03"` | Last modification date (same as created initially) |

### Markdown Body Structure (6 Sections)

**Target Length**: ~1200-1350 tokens (leaves ~50-150 for YAML)  
**Constraint**: Total <1400 tokens (T0-SIZE-01)

#### Section 1: Introdução (~150-200 tokens, 2-3 paragraphs)

**Purpose**: Contextualize language, philosophy, and when to use

**Contents**:
- What the language is and primary use cases (1 paragraph)
- Language philosophy and design principles (1 paragraph)
- Version context: which versions covered, why these versions (1 paragraph)

**Example opening** (Java):
```markdown
# Java

> **Quick Reference:** Linguagem orientada a objetos com tipagem estática para JVM  
> **Use when:** Aplicações enterprise, sistemas distribuídos, Android

## Introdução

Java é uma linguagem de programação de propósito geral com tipagem estática forte, 
orientação a objetos e gestão automática de memória. Criada na década de 1990, 
tornou-se padrão para aplicações enterprise devido à portabilidade ("write once, 
run anywhere") e ecossistema maduro.

A filosofia Java prioriza legibilidade, segurança de tipo e compatibilidade retroativa. 
O design enfatiza verbosidade explícita sobre magia implícita, tornando código previsível 
mas às vezes prolixo comparado a linguagens modernas.

Este baseline cobre Java 17 LTS (amplamente adotado) e Java 21 LTS (versão mais recente). 
Versões legadas (Java 8, 11) estão fora do escopo; foco está em features modernas 
como records (Java 14+), pattern matching (Java 16+) e virtual threads (Java 21).
```

---

#### Section 2: Sistema de Tipagem (~250-300 tokens, 3-5 paragraphs + 1-2 examples)

**Purpose**: Explain type system fundamentals (R3 framework dimension 1)

**Contents**:
- Static vs dynamic, strong vs weak (1 paragraph)
- Type inference mechanisms if applicable (1 paragraph)
- Generics/templates/parametric types (1 paragraph)
- Type safety features or concerns (1 paragraph)
- 1-2 code examples demonstrating key type concepts (150-200 chars each)

**Key Questions to Answer**:
- Is typing static or dynamic? Strong or weak?
- How does type inference work (if applicable)?
- How are generic types handled?
- What are common type-related pitfalls?

**Example snippet** (Kotlin):
```markdown
## Sistema de Tipagem

Kotlin possui tipagem estática forte com inferência agressiva. O compilador deduz 
tipos na maioria dos contextos, reduzindo verbosidade sem sacrificar segurança.

### Null Safety (Feature Distintiva)

Sistema de tipos distingue tipos nullable (`String?`) de non-nullable (`String`). 
Acesso a nullable requer safe call (`?.`), elvis operator (`?:`) ou null assertion (`!!`).

### Exemplo: Null Safety

**Contexto**: Kotlin 1.9+

```kotlin
fun greet(name: String?) {
    println(name?.length)  // Safe call: null if name is null
    // println(name.length) // Compile error
}

fun main() {
    greet(null) // Output: null
    greet("Alice") // Output: 5
}
```

**Comportamento**: Operador `?.` evita NullPointerException, retornando null se objeto for null.
```

---

#### Section 3: Gerenciamento de Memória (~250-300 tokens, 3-5 paragraphs + 1-2 examples)

**Purpose**: Explain memory management model (R3 framework dimension 2)

**Contents**:
- Stack vs heap allocation (1 paragraph)
- Automatic (GC) vs manual memory management (1 paragraph)
- Ownership/borrowing model if applicable (Rust, C++) (1 paragraph)
- Common memory pitfalls (leaks, corruption, dangling pointers) (1 paragraph)
- 1-2 code examples demonstrating memory concepts

**Key Questions to Answer**:
- How is memory allocated (stack vs heap)?
- Is memory management automatic or manual?
- What are common memory-related errors?
- How to avoid memory leaks or undefined behavior?

**Example snippet** (C/C++):
```markdown
## Gerenciamento de Memória

C e C++ exigem gerenciamento manual de memória. Programador controla alocação 
(malloc/free em C, new/delete em C++) e é responsável por evitar leaks e corrupção.

### RAII (Resource Acquisition Is Initialization) - C++

C++ introduz RAII: recursos (memória, arquivos) adquiridos no construtor e liberados 
no destrutor automaticamente. Smart pointers (std::unique_ptr, std::shared_ptr) 
implementam RAII para memória.

### Exemplo: Manual vs RAII

**Contexto**: C++17 - g++/clang++

```cpp
#include <memory>
#include <iostream>

// Manual (C-style)
void manualManagement() {
    int* ptr = new int(42);
    std::cout << *ptr << std::endl; // Output: 42
    delete ptr; // Must remember to free
}

// RAII (C++-style)
void raiiManagement() {
    auto ptr = std::make_unique<int>(42);
    std::cout << *ptr << std::endl; // Output: 42
    // Automatically freed when ptr goes out of scope
}
```

**Comportamento**: RAII elimina necessidade de delete manual, prevenindo leaks.
```

---

#### Section 4: Modelo de Concorrência (~250-300 tokens, 3-5 paragraphs + 1-2 examples)

**Purpose**: Explain concurrency primitives (R3 framework dimension 3)

**Contents**:
- Threading model (OS threads, green threads, coroutines) (1 paragraph)
- Synchronization mechanisms (locks, mutexes, atomics) (1 paragraph)
- Async/await, Promises, event loop if applicable (1 paragraph)
- Concurrency pitfalls (race conditions, deadlocks) (1 paragraph)
- 1-2 code examples demonstrating concurrency patterns

**Key Questions to Answer**:
- What threading primitives does the language provide?
- How are shared resources synchronized?
- Is there async/await or event-driven model?
- What are common concurrency bugs and how to avoid them?

**Example snippet** (JavaScript):
```markdown
## Modelo de Concorrência

JavaScript usa event loop single-threaded. Operações bloqueantes são assíncronas, 
permitindo código não-bloqueante sem paralelismo real. Web Workers (browser) e 
worker_threads (Node.js) permitem paralelismo, mas são casos de uso específicos.

### Async/Await (ES2017)

async/await sintaxe açúcar sobre Promises, tornando código assíncrono legível 
como código síncrono. Funções async retornam Promises automaticamente.

### Exemplo: Async/Await vs Promises

**Contexto**: ES2023 (Node.js ou browser)

```javascript
// Promise chain (ES2015)
function fetchDataOld() {
    return fetch('/api/data')
        .then(res => res.json())
        .then(data => console.log(data));
}

// Async/await (ES2017+)
async function fetchDataNew() {
    const res = await fetch('/api/data');
    const data = await res.json();
    console.log(data);
}
```

**Comportamento**: Ambos assíncronos, mas async/await mais legível (evita callback hell).
```

---

#### Section 5: Ecossistema (~250-300 tokens, 3-5 paragraphs + examples if applicable)

**Purpose**: Overview of tooling and community (R3 framework dimension 4)

**Contents**:
- Package manager(s) and ecosystem repository (1 paragraph)
- Build tools and project structure conventions (1 paragraph)
- Standard library highlights (1 paragraph)
- Key frameworks or community resources (1 paragraph)
- Example commands or configurations (not code examples, but tool usage)

**Key Questions to Answer**:
- What package manager(s) are standard?
- What build tools are commonly used?
- What are the most important standard library features?
- Where to find community resources, documentation?

**Example snippet** (Python):
```markdown
## Ecossistema

### Gerenciador de Pacotes: pip e PyPI

pip é gerenciador padrão, instalando pacotes do PyPI (Python Package Index). 
Poetry e pipenv são alternativas populares para gerenciamento de dependências 
e ambientes virtuais.

```bash
pip install requests  # Instalar pacote
pip freeze > requirements.txt  # Exportar dependências
python -m venv venv  # Criar ambiente virtual
```

### Ambientes Virtuais

venv (built-in Python 3.3+) cria ambientes isolados por projeto, evitando conflitos 
de dependências. Ativação: `source venv/bin/activate` (Linux/Mac) ou 
`venv\Scripts\activate` (Windows).

### Standard Library e Ecossistema Data Science

Standard library vasta: collections, itertools, functools, asyncio, pathlib. 
Ecossistema data science dominante: NumPy, Pandas, Matplotlib, scikit-learn, 
TensorFlow/PyTorch.

### Recursos

- Documentação oficial: docs.python.org/3
- PEPs (Python Enhancement Proposals): python.org/dev/peps
- PyPI: pypi.org
```

---

#### Section 6: Recursos e Referências (~100-150 tokens)

**Purpose**: Provide authoritative resources (satisfies FR-004 + T0-SOURCE-01)

**Contents**:
- Links to official documentation (1-2 bullets)
- Key references (standards, specifications) (1-2 bullets)
- Community resources (optional, 0-2 bullets)

**Format**:
```markdown
## Recursos e Referências

### Documentação Oficial

- [Java SE Documentation](https://docs.oracle.com/javase/17/) - Oracle official docs
- [OpenJDK](https://openjdk.org/) - Open-source Java implementation

### Especificações

- [Java Language Specification](https://docs.oracle.com/javase/specs/) - Formal language spec
- [JVM Specification](https://docs.oracle.com/javase/specs/jvms/se17/html/) - JVM behavior definition

### Comunidade

- [Stack Overflow - Java](https://stackoverflow.com/questions/tagged/java) - Q&A community
- [r/java](https://reddit.com/r/java) - Java subreddit
```

**Note**: Sources in YAML frontmatter must match or include these references

---

### Token Budget Breakdown (Target ~1200-1350 total)

| Section | Target Tokens | Min Tokens | Max Tokens | Priority |
|---------|---------------|------------|------------|----------|
| YAML Frontmatter | ~80 | 60 | 100 | Required (T0) |
| Introdução | 175 | 150 | 200 | High |
| Sistema de Tipagem | 275 | 250 | 300 | Critical (Completude) |
| Gerenciamento de Memória | 275 | 250 | 300 | Critical (Completude) |
| Modelo de Concorrência | 275 | 250 | 300 | Critical (Completude) |
| Ecossistema | 200 | 150 | 250 | High |
| Recursos e Referências | 70 | 50 | 100 | Required (FR-004) |
| **TOTAL** | **1350** | **1160** | **1550** | **Target <1400** |

**Constraint Enforcement**:
- If skill exceeds 1400 tokens: Trim in priority order: Ecossistema → Introdução → Examples (reduce 20-30 lines each)
- If skill <1160 tokens: Add examples (1 per section missing example) or expand weakest dimension
- Critical sections (Tipagem, Memória, Concorrência): Never trim below 250 tokens (Completude score depends on these)

---

### Code Example Requirements (FR-003)

**Minimum**: 3 working code examples across all sections  
**Recommended**: 4-5 examples (1-2 per core dimension)  
**Format**: Per R4 research standards

```markdown
### Exemplo: {Concept Name}

**Contexto**: {Language Version} - {Setup if needed}

```{language}
// Code 5-20 lines
// Comments explaining key points
```

**Saída Esperada** (or **Comportamento**):
```
{Output or behavior description}
```
```

**Quality Criteria** (from R4):
- ✅ Syntactically correct (would compile/run in specified version)
- ✅ Demonstrates ONE concept clearly
- ✅ Includes context (version, dependencies)
- ✅ Verifiable (copy-paste runnable or behavior understandable)
- ✅ Minimal (5-20 lines preferred, <30 absolute max)

---

### Validation Checklist (Self-Critique Completude Dimension)

**Before Self-Critique**, verify:

- [ ] YAML frontmatter complete (14 required fields)
- [ ] All 6 Markdown sections present (Introdução, Tipagem, Memória, Concorrência, Ecossistema, Recursos)
- [ ] ≥3 code examples total (FR-003)
- [ ] ≥2 sources cited in YAML + referenced in Recursos section (FR-004)
- [ ] Token count <1400 (T0-SIZE-01)
- [ ] Zero placeholders `[XXX]` or `[AQUI:]` (T0-VALIDATE)
- [ ] Language version specified in YAML `language_version` and mentioned in Introdução
- [ ] All code examples include context (version, setup)

**Completude Scoring** (25 points max):
- 6 sections × 4 points = 24 points (1 point deducted if any section <2 paragraphs)
- ≥3 examples = +1 point (0 points if <3 examples)
- **Score 20-25 = Good**, 15-19 = Acceptable, <15 = Needs Work

---

## D2: Workflow State Machine

### State Definitions

```
NOT_STARTED → RESEARCHING → GENERATING → SELF_CRITIQUING → HUMAN_GATE → INDEXING → COMPLETE
                                 ↓              ↓               ↓
                            [REVISING] ← [REVISING] ← [REVISING]
                                                       ↓
                                                  [REJECTED] → [CANCELLED]
```

| State | Description | Entry Condition | Exit Condition | Duration Est. |
|-------|-------------|-----------------|----------------|---------------|
| **NOT_STARTED** | Skill not yet begun | Initial state | Agent starts language research | 0 min |
| **RESEARCHING** | Agent reading docs, analyzing language | Agent loads authoritative sources (R1) | Research complete, notes drafted | 10-15 min |
| **GENERATING** | Agent writing skill content | Research complete | First draft complete (all 6 sections) | 15-20 min |
| **SELF_CRITIQUING** | Running Self-Critique protocol (SPEC-001) | Draft complete | Score calculated (0-100) | 5 min |
| **REVISING** | Agent improving skill based on Self-Critique | Score <70 OR agent wants to improve | Revised draft complete, re-run Self-Critique | 5-10 min |
| **HUMAN_GATE** | Awaiting human decision | Score ≥70 | Human approves, edits, rejects, or cancels | Variable (mins to hours) |
| **INDEXING** | Updating INDEX.md and incrementing version | Human approves | Skill added to index, version incremented | 2 min |
| **COMPLETE** | Skill finalized and available | Indexing complete | (terminal state) | 0 min |
| **REJECTED** | Human rejected, categorization and learning | Human rejects | Category logged, learned action drafted | 3-5 min |
| **CANCELLED** | Execution stopped by human or error | Human cancels OR critical error | (terminal state) | 0 min |

### State Transitions

| From State | To State | Trigger | Notes |
|------------|----------|---------|-------|
| NOT_STARTED | RESEARCHING | Agent starts language | Sequential execution (Java → Kotlin → C/C++ → JS → Python) |
| RESEARCHING | GENERATING | Research complete | Agent has authoritative sources loaded, notes drafted |
| GENERATING | SELF_CRITIQUING | Draft complete | All 6 sections written, ≥3 examples, sources cited |
| SELF_CRITIQUING | REVISING | Score <70 | Agent must improve weakest dimension before Human Gate (FR-010) |
| SELF_CRITIQUING | HUMAN_GATE | Score ≥70 | Agent proceeds to Human Gate (score may still be 70-79, human decides) |
| REVISING | SELF_CRITIQUING | Revision complete | Re-evaluate score, may loop multiple times until ≥70 |
| HUMAN_GATE | INDEXING | Human approves | Approval with no further edits |
| HUMAN_GATE | REVISING | Human requests edits | Human specifies section or dimension to improve |
| HUMAN_GATE | REJECTED | Human rejects | Rejection reason logged, categorization begins |
| REJECTED | GENERATING | Learning complete | Agent regenerates skill applying learned actions, starts fresh generation |
| REJECTED | CANCELLED | Human cancels | Human decides not to retry (rare, flags critical issue) |
| HUMAN_GATE | CANCELLED | Human cancels | Execution stopped (e.g., realization skill not needed) |
| INDEXING | COMPLETE | Index updated | Version incremented (SPEC-002), skill available |

### Metadata Tracked Per State

**File**: `memory/opencode-spec010-session.md` (section "State Tracking" - not in template but add if needed)

| Metadata Field | When Set | Example Value | Purpose |
|----------------|----------|---------------|---------|
| `language` | NOT_STARTED → RESEARCHING | `java` | Identifies which baseline |
| `status` | Every transition | `HUMAN_GATE` | Current workflow state |
| `score_overall` | SELF_CRITIQUING | `85` | Self-Critique overall score (0-100) |
| `score_completude` | SELF_CRITIQUING | `24` | Completude dimension score (0-25) |
| `score_clareza` | SELF_CRITIQUING | `20` | Clareza dimension score (0-25) |
| `score_correcao` | SELF_CRITIQUING | `22` | Correção dimension score (0-25) |
| `score_best_practices` | SELF_CRITIQUING | `19` | Best Practices dimension score (0-25) |
| `constitution_check` | SELF_CRITIQUING | `PASS` or `FAIL` | T0 rules compliance (T0-SIZE-01, T0-VALIDATE) |
| `constitution_violations` | SELF_CRITIQUING | `["T0-SIZE-01: 1450 tokens"]` | List of violations if FAIL |
| `revision_count` | REVISING | `2` | Number of revisions (counter) |
| `rejection_category` | REJECTED | `exemplos` | One of 6 categories (R7 research) |
| `rejection_reason` | REJECTED | `"Examples have syntax errors"` | Human's free text feedback |
| `learned_action` | REJECTED | `"Test all examples before submission"` | Actionable instruction for future |
| `timestamp_start` | RESEARCHING | `2026-02-03T10:00:00Z` | When language started |
| `timestamp_human_gate` | HUMAN_GATE | `2026-02-03T10:45:00Z` | When submitted to human |
| `timestamp_complete` | COMPLETE | `2026-02-03T11:00:00Z` | When finalized |

**Note**: Not all metadata stored in memory file (would be verbose). Key data for reports:
- **Self-Critique Metrics Report**: score_overall, score_* dimensions (all 5 languages)
- **Rejection Analysis Report**: rejection_category, rejection_reason, learned_action (if any rejections)
- **Gap Detection Report**: Gaps logged during RESEARCHING state (separate table)

### Error Handling & Edge Cases

| Scenario | Current State | Action | Next State |
|----------|---------------|--------|------------|
| Token limit exceeded (>1400) | SELF_CRITIQUING | constitution_check = FAIL, flag T0-SIZE-01 | REVISING (trim per priority in D1) |
| Placeholder detected `[XXX]` | SELF_CRITIQUING | constitution_check = FAIL, flag T0-VALIDATE | REVISING (replace all placeholders) |
| Score <70 after 3 revisions | REVISING | Log warning, proceed to HUMAN_GATE anyway (human decides) | HUMAN_GATE (note: low confidence) |
| Human unavailable >24h | HUMAN_GATE | Queue state (no action), wait | HUMAN_GATE (resume when available) |
| Agent error during generation | GENERATING | Log error, mark status ERROR | CANCELLED (human investigates) |
| Same language rejected 3+ times | REJECTED | Log critical pattern, recommend process review | CANCELLED (unlikely with learning) |

---

## D3: Human Gate Display Format

### Preview Template (Presented Before Approval)

**Format**: Markdown block shown to human via terminal or chat interface

```markdown
---
🔔 HUMAN GATE: {Language} Baseline Skill Ready for Review
---

## 📊 Self-Critique Summary

**Overall Score**: {score_overall}/100 - {Label from R5: Excellent/Production/Acceptable/Needs Improvement/Unacceptable}

| Dimension | Score | Interpretation |
|-----------|-------|----------------|
| **Completude** | {score}/25 | {Good (20-25) / Acceptable (15-19) / Needs Work (<15)} |
| **Clareza** | {score}/25 | {Good / Acceptable / Needs Work} |
| **Correção** | {score}/25 | {Good / Acceptable / Needs Work} |
| **Best Practices** | {score}/25 | {Good / Acceptable / Needs Work} |

**Weakest Dimension**: {dimension_name} ({score}/25) - {specific issue}  
**Strongest Dimension**: {dimension_name} ({score}/25)

**Score Interpretation** (from R5):
- 90-100: 🟢 Excellent - Exceeds baseline, approve immediately
- 80-89: 🟢 Production Ready - Strong baseline, approve
- 70-79: 🔵 Acceptable - Meets threshold, approve or minor edits
- 60-69: 🟡 Needs Improvement - Below threshold, edit required
- <60: 🔴 Unacceptable - Major issues, reject and regenerate

---

## 🛡️ Constitution Check

**Status**: {PASS or FAIL}

{If PASS:}
✅ All T0 rules compliant:
- T0-SIZE-01: {token_count} tokens (<1400) ✅
- T0-VALIDATE: No placeholders detected ✅
- T0-SOURCE-01: {source_count} sources cited ✅

{If FAIL:}
❌ Constitution violations detected:
- {violation_1}
- {violation_2}

**Recommendation**: {If FAIL: "Revise before approval to fix violations" | If PASS: "Compliant, safe to approve"}

---

## 🎓 Learned Actions Applied (from previous rejections)

{If no prior rejections:}
- (No prior rejections - first skill or all previous approved)

{If learned actions exist:}
- ✅ "{learned_action_1}" (from {previous_language} rejection - {category})
- ✅ "{learned_action_2}" (from {previous_language} rejection - {category})

**How Applied**:
- {Brief explanation of how agent incorporated learned action}

---

## 💡 Self-Critique Suggestions

**Improvements Identified**:
1. {suggestion_1 from Self-Critique protocol}
2. {suggestion_2}
3. {suggestion_3}

**Optional Enhancements** (not required for approval):
- {optional_enhancement_1}
- {optional_enhancement_2}

---

## 📄 Skill Preview

### YAML Frontmatter
```yaml
name: {language-name}
level: baseline
version: "1.0.0"
language_version: "{version-info}"
tags: [{tag1}, {tag2}, {tag3}, {tag4}]
sources: {source_count} sources
```

### Content Structure (6 sections present)
- ✅ Introdução (~{token_count} tokens)
- ✅ Sistema de Tipagem (~{token_count} tokens, {example_count} examples)
- ✅ Gerenciamento de Memória (~{token_count} tokens, {example_count} examples)
- ✅ Modelo de Concorrência (~{token_count} tokens, {example_count} examples)
- ✅ Ecossistema (~{token_count} tokens)
- ✅ Recursos e Referências (~{token_count} tokens, {source_count} sources)

**Total Examples**: {total_example_count} (minimum 3 required ✅)  
**Total Tokens**: {total_token_count} (limit 1400)

### First 200 Characters
```
{First 200 characters of Introdução section to give human a sense of tone and content}
```

---

## ❓ Decision Required

**Options**:
1. **approve** - Accept skill as-is, proceed to indexing
2. **view** - View full skill content (open file or display in terminal)
3. **edit [section]** - Request edits to specific section (e.g., "edit concorrencia")
4. **reject [reason]** - Reject skill with reason (triggers categorization and regeneration)
5. **cancel** - Stop execution (rare, use if critical issue discovered)

**Recommended Action**: {Agent recommendation based on score, e.g., "approve" if 80+, "view" if 70-79, "edit" if <70}

**Your decision**:
```

### Human Response Format

**Agent parses human response**:
- `approve` → Transition to INDEXING state
- `view` → Display full file content, return to HUMAN_GATE (ask again)
- `edit [section]` → Extract section name, transition to REVISING with target section
- `reject [reason]` → Extract reason (everything after "reject"), transition to REJECTED
- `cancel` → Transition to CANCELLED state

**Example exchanges**:
```
Human: approve
Agent: ✅ Approved. Indexing Java baseline skill...