# WORKFLOW ORCHESTRATOR PROTOCOL

> **Version:** 0.1.0 (Draft)
> **Source:** `specs/007-workflow-orchestrator/spec.md`
> **Type:** Core Protocol
> **Status:** Experimental

---

## 1. IDENTITY & PURPOSE

**Role:** The Workflow Orchestrator is the central coordinator that maps workflow commands to their default Persona and Skill configurations.

**Goal:** Automatically select the correct persona and relevant skills when a workflow is triggered, eliminating manual configuration while respecting the 5-skill cap and supporting manual overrides.

---

## 2. CORE RESPONSIBILITIES

1. Maintain the declarative Orchestration Map of workflows → personas → skills
2. Resolve `{stack-skill}` placeholders from Tech Stack Profile
3. Apply `--persona` and `--skills` overrides when present
4. Enforce the 2-5 skill cap with explicit-first eviction
5. Output Active Context to JIT Protocol for skill loading

---

## 3. INTEGRATION POINTS

- **Input:** Receives workflow commands from `COMMAND-ROUTER.md`
- **Stack Detection:** Reads `.context/_meta/tech-stack.md` for language-specific skill resolution
- **Output:** Produces Active Context object for `JIT-PROTOCOL.md`
- **Classification:** Referenced by `INPUT-CLASSIFIER.md` after Router delegation

---

## 4. ORCHESTRATION MAP

Static binding of workflows to personas and skills. Skills are listed in priority order (highest priority first = evicted last).

| Workflow | Persona | Skills (priority order) |
|----------|---------|-------------------------|
| `#new` | Product Owner | requirements-gathering, card-templates |
| `#impl` | Software Engineer | {stack-skill}, clean-code, software-testing |
| `#bug` | Debugger | debugging-techniques, error-handling, {stack-skill} |
| `#review` | Code Reviewer | code-quality, security-basics |
| `#docs` | Technical Writer | technical-writing, markdown |
| `#test` | QA Engineer | software-testing, tdd |
| `#arch` | Solutions Architect | system-design, architecture-patterns |

**Valid Personas:** Product Owner, Software Engineer, Debugger, Code Reviewer, Technical Writer, QA Engineer, Solutions Architect

---

## 5. STACK-SKILL PLACEHOLDER CONVENTION

**Syntax:** `{stack-skill}` is a runtime placeholder that resolves to a language-specific skill identifier.

**Resolution Source:** `.context/_meta/tech-stack.md`

### Resolution Logic

1. Read `.context/_meta/tech-stack.md` to identify the `primary_language` (e.g., `typescript`, `python`, `java`)
2. Map the language to its corresponding skill identifier:
   - `typescript` → skill: `typescript`
   - `javascript` → skill: `javascript`
   - `python` → skill: `python`
   - `java` → skill: `java`
   - etc.
3. Replace `{stack-skill}` in the workflow's skill list with the resolved skill ID
4. If `.context/_meta/tech-stack.md` is missing, outdated, or `primary_language` is unspecified:
   - **Emit warning:** Use template `WARN_MISSING_STACK`
   - **Fallback:** Omit `{stack-skill}` from the active skill set
   - **Continue:** Workflow proceeds with remaining skills

### Example

**Input (Orchestration Map):** `#impl` → Skills: `[{stack-skill}, clean-code, software-testing]`

**Tech Stack Profile:** `primary_language: typescript`

**Output (Active Context):** Skills: `[typescript, clean-code, software-testing]`

---

## 6. RESOLUTION FLOW

The Orchestrator processes each workflow command in 5 steps to produce the final Active Context.

### Step 1: Lookup (T008 - Automatic Map Lookup)

**Purpose:** Given a workflow name, output the bound persona and skill list.

**Implementation:**

1. Extract workflow identifier from command (e.g., `#impl` → `impl`)
2. Match workflow identifier against Orchestration Map (Section 4)
3. Retrieve bound persona and skills list
4. If workflow not found in map:
   - Emit error: "Unknown workflow: {workflow_id}"
   - List all valid workflows: `new`, `impl`, `bug`, `review`, `docs`, `test`, `arch`
   - Halt execution

**Example:**

```
Input: #impl
Lookup: Orchestration Map[impl]
Output:
  - Persona: Software Engineer
  - Skills: [{stack-skill}, clean-code, software-testing]
```

**Valid Workflows:** `new`, `impl`, `bug`, `review`, `docs`, `test`, `arch`

**Validation:** Workflow identifier MUST exist in Orchestration Map. Non-existent workflows MUST halt execution with error.

### Step 2: Stack Resolve (T009 - Stack-Skill Resolution)

**Purpose:** Read Tech Stack Profile, inject `{stack-skill}` into active skill set for workflows that use it.

**Workflows Using Stack-Skill:** `#impl`, `#bug`

**Implementation:**

1. Check if skills list contains `{stack-skill}` placeholder
2. If YES:
   a. Attempt to read `.context/_meta/tech-stack.md`
   b. Extract `primary_language` field (e.g., `typescript`, `python`, `java`)
   c. Map language to skill identifier using 1:1 mapping:
      - `typescript` → skill ID: `typescript`
      - `javascript` → skill ID: `javascript`
      - `python` → skill ID: `python`
      - `java` → skill ID: `java`
      - `csharp` → skill ID: `csharp`
      - `go` → skill ID: `go`
      - `rust` → skill ID: `rust`
      - `ruby` → skill ID: `ruby`
      - `php` → skill ID: `php`
   d. Replace `{stack-skill}` placeholder with resolved skill ID in the skills list
3. If NO `{stack-skill}` placeholder: skip to Step 3

**Fallback Path (T010 - Warn & Generic Fallback):**

If `.context/_meta/tech-stack.md` is missing, unreadable, or `primary_language` is undefined:
   - Emit warning: `WARN_MISSING_STACK` (see Section 7)
   - Remove `{stack-skill}` from skills list (do NOT substitute)
   - Continue workflow with remaining skills (generic fallback)
   - Execution does NOT halt

**Example (Success):**

```
Input skills: [{stack-skill}, clean-code, software-testing]
Tech Stack Profile: primary_language: typescript
Output skills: [typescript, clean-code, software-testing]
```

**Example (Fallback):**

```
Input skills: [{stack-skill}, clean-code, software-testing]
Tech Stack Profile: MISSING or primary_language: null
Warning: WARN_MISSING_STACK emitted
Output skills: [clean-code, software-testing]
```

### Step 3: Persona Override (T012, T013)

**Purpose:** Apply `--persona` flag override if present, with validation.

**Implementation:**

1. Check if `--persona` flag is present in command
2. If `--persona` flag is ABSENT:
   - Use default persona from Step 1 (map lookup)
   - Continue to Step 4
3. If `--persona` flag is PRESENT:
   a. Extract persona value from flag (e.g., `--persona architect` → `architect`)
   b. Normalize to full persona name:
      - `architect` → `Solutions Architect`
      - `engineer` → `Software Engineer`
      - `debugger` → `Debugger`
      - `reviewer` → `Code Reviewer`
      - `writer` → `Technical Writer`
      - `qa` → `QA Engineer`
      - `owner` → `Product Owner`
   c. Validate: persona MUST be one of 7 valid personas:
      - Product Owner
      - Software Engineer
      - Debugger
      - Code Reviewer
      - Technical Writer
      - QA Engineer
      - Solutions Architect
   d. If persona is VALID:
      - Replace default persona (from Step 1) with the specified value
      - Continue to Step 4
   e. If persona is INVALID:
      - Emit `WARN_INVALID_PERSONA` (see Section 7)
      - Replace `{persona_value}` with the invalid input
      - Replace `{default_persona}` with the workflow default from Step 1
      - Revert to workflow default persona
      - Continue to Step 4 (execution does NOT halt)

**Example (Valid Override):**

```
Input: #impl --persona architect
Step 1 persona: Software Engineer (default)
Step 3 override: Solutions Architect
Output persona: Solutions Architect
```

**Example (Invalid Override):**

```
Input: #review --persona ninja
Step 1 persona: Code Reviewer (default)
Step 3 validation: FAIL (ninja not in valid list)
Warning: WARN_INVALID_PERSONA emitted
Output persona: Code Reviewer (fallback to default)
```

### Step 4: Skills Merge & Eviction (T014, T015)

**Purpose:** Append user-requested skills to defaults, enforce 5-skill cap with explicit-first eviction.

**Implementation:**

1. Start with default skills from Step 2 (post-stack-resolution)
2. Check if `--skills` flag is present in command
3. If `--skills` flag is ABSENT:
   - Use default skills from Step 2 as-is
   - Continue to Step 5
4. If `--skills` flag is PRESENT:
   a. Parse comma-separated skill IDs (e.g., `--skills tdd,security-basics` → `[tdd, security-basics]`)
   b. Build merged skills list:
      - **Explicit skills FIRST** (user-requested via `--skills` flag)
      - Then append default skills (from Step 2)
      - Remove duplicates (keep first occurrence, which prioritizes explicit skills)
   c. Check total skill count:
      - If merged total ≤ 5: use merged list as-is, continue to Step 5
      - If merged total > 5: apply explicit-first eviction (see below)

**Explicit-First Eviction Logic (T015):**

When merged skill count exceeds 5, apply the following eviction strategy:

1. **Keep ALL explicit skills** (user-requested via `--skills` flag) — these are never evicted
2. **Evict default skills** in reverse priority order until total ≤ 5
3. Priority order reference: see Orchestration Map (Section 4) — skills are listed left-to-right in priority order (leftmost = highest priority = evicted last)
4. Reverse priority order = rightmost skills evicted first
5. Continue evicting default skills one-by-one from lowest priority until:
   - `len(explicit_skills) + len(remaining_default_skills) <= 5`
6. Emit `WARN_SKILL_EVICTION` (see Section 7):
   - Replace `{evicted_skill_list}` with comma-separated list of evicted skill IDs
   - Replace `{final_skill_list}` with comma-separated list of final active skills

**Example (Merge Without Eviction):**

```
Input: #review --skills tdd
Step 2 default skills: [code-quality, security-basics]
Step 4 merge: [tdd, code-quality, security-basics]
Total: 3 skills (≤ 5)
Output skills: [tdd, code-quality, security-basics]
No eviction needed.
```

**Example (Merge With Eviction):**

```
Input: #impl --skills tdd,security-basics,architecture-patterns
Step 2 default skills: [typescript, clean-code, software-testing]
Step 4 merge attempt: [tdd, security-basics, architecture-patterns, typescript, clean-code, software-testing]
Total: 6 skills (> 5)
Eviction required:
  - Explicit skills (KEEP): [tdd, security-basics, architecture-patterns]
  - Default skills priority order: [typescript, clean-code, software-testing]
  - Reverse priority (evict rightmost first): software-testing → clean-code → typescript
  - Evict: software-testing (lowest priority)
  - Remaining: [tdd, security-basics, architecture-patterns, typescript, clean-code]
  - Total: 5 skills (≤ 5) ✓
Warning: WARN_SKILL_EVICTION emitted
  - evicted_skill_list: software-testing
  - final_skill_list: tdd, security-basics, architecture-patterns, typescript, clean-code
Output skills: [tdd, security-basics, architecture-patterns, typescript, clean-code]
```

**Example (Multiple Evictions):**

```
Input: #bug --skills tdd,security-basics,architecture-patterns,system-design
Step 2 default skills: [debugging-techniques, error-handling, typescript]
Step 4 merge attempt: [tdd, security-basics, architecture-patterns, system-design, debugging-techniques, error-handling, typescript]
Total: 7 skills (> 5)
Eviction required:
  - Explicit skills (KEEP): [tdd, security-basics, architecture-patterns, system-design]
  - Default skills priority order: [debugging-techniques, error-handling, typescript]
  - Need to remove 2 skills (7 - 5 = 2)
  - Reverse priority eviction: typescript (evict 1st), error-handling (evict 2nd)
  - Remaining default: [debugging-techniques]
  - Final: [tdd, security-basics, architecture-patterns, system-design, debugging-techniques]
  - Total: 5 skills (≤ 5) ✓
Warning: WARN_SKILL_EVICTION emitted
  - evicted_skill_list: typescript, error-handling
  - final_skill_list: tdd, security-basics, architecture-patterns, system-design, debugging-techniques
Output skills: [tdd, security-basics, architecture-patterns, system-design, debugging-techniques]
```

### Step 5: Final Validation Gate (T016)

**Purpose:** Enforce skill-count constraints before passing Active Context to JIT Protocol.

**Implementation:**

1. Build Active Context object:
   ```yaml
   workflow: impl
   persona: Software Engineer
   skills: [typescript, clean-code, software-testing]
   stack_skill: typescript  # only if {stack-skill} was resolved
   warnings: []
   ```

2. **Skill Count Validation:**
   - Assert: `len(skills) >= 2 AND len(skills) <= 5`
   - If `len(skills) < 2`:
     - **Edge Case:** Stack-skill fallback resulted in < 2 skills
     - **Action:** Emit error and halt execution
     - **Error Template:**
       ```
       ❌ Skill count too low (minimum 2 required)
          - Current skill count: {actual_count}
          - Active skills: {skill_list}
          - Reason: Stack-skill resolution failed and remaining skills < 2
          - Fix: Ensure .context/_meta/tech-stack.md exists OR workflow has ≥2 non-stack skills
       ```
   - If `len(skills) > 5`:
     - **Edge Case:** Eviction logic failed (should never happen if Step 4 is correct)
     - **Action:** Emit error and halt execution
     - **Error Template:**
       ```
       ❌ Skill count exceeds cap (maximum 5 allowed)
          - Current skill count: {actual_count}
          - Active skills: {skill_list}
          - Reason: Internal eviction logic error
          - Fix: Report this as a bug in WORKFLOW-ORCHESTRATOR.md
       ```
   - If `2 <= len(skills) <= 5`:
     - **Valid:** Continue to output

3. **Pass Active Context to JIT Protocol:**
   - Deliver validated Active Context object to `JIT-PROTOCOL.md` (see Section 10 for contract)
   - JIT receives object and loads exactly those skills, no more

**Example (Valid Output):**

```
Input: #impl (TypeScript project)
Final skills: [typescript, clean-code, software-testing]
Validation: 3 skills (2 ≤ 3 ≤ 5) ✓
Output: Active Context passed to JIT
```

**Example (Invalid - Too Few Skills):**

```
Input: #docs --skills technical-writing
Step 2 default skills: [technical-writing, markdown]
Step 4 merge: [technical-writing, markdown] (removed duplicate)
Result: 1 skill after deduplication
Validation: 1 skill (< 2) ❌
Error: ERR_SKILL_COUNT_LOW emitted, execution halted
```

**Example (Invalid - Too Many Skills - Should Never Occur):**

```
Input: #impl --skills a,b,c,d,e,f
Step 4 should have evicted to 5, but somehow 6 reached Step 5
Validation: 6 skills (> 5) ❌
Error: ERR_SKILL_COUNT_HIGH emitted, execution halted (indicates bug)
```

---

## 7. WARNING MESSAGE TEMPLATES

### WARN_MISSING_STACK

```
⚠️ Tech Stack Profile missing or outdated
   - File: .context/_meta/tech-stack.md
   - Impact: Language-specific skill omitted from active skill set
   - Action: Update .context/_meta/tech-stack.md with primary_language to resolve
```

### WARN_INVALID_PERSONA

```
⚠️ Invalid persona specified: "{persona_value}"
   - Valid personas: Product Owner, Software Engineer, Debugger, Code Reviewer, Technical Writer, QA Engineer, Solutions Architect
   - Fallback: Using workflow default persona "{default_persona}"
```

### WARN_SKILL_EVICTION

```
⚠️ Skill cap exceeded (5-skill limit)
   - Evicted skills: {evicted_skill_list}
   - Reason: Explicit skills (--skills flag) take priority
   - Active skills: {final_skill_list}
```

---

## 8. VALIDATION RULES

- **Skill Count:** Final skill list MUST contain 2-5 skills
- **Persona:** MUST be one of the 7 valid personas
- **Workflow:** MUST be one of the 7 supported workflows (`new`, `impl`, `bug`, `review`, `docs`, `test`, `arch`)
- **Stack Resolution:** OPTIONAL — absence does not block execution
- **Warnings:** MUST be surfaced to user before workflow execution

---

## 9. SESSION STATE MODEL (T017)

**Philosophy:** "Last command wins" — each workflow command produces a fresh Active Context with zero carry-over.

### Core Principles

1. **Ephemeral Active Context:**
   - Active Context exists ONLY for the duration of a single workflow command
   - Lifespan: Command received → Resolution Flow → Output to JIT → Destroyed
   - No persistence between commands

2. **No State Carry-Over:**
   - Previous workflow's persona does NOT affect current workflow's persona
   - Previous workflow's skills do NOT affect current workflow's skills
   - Previous workflow's warnings do NOT affect current workflow's warnings
   - Each command starts from Step 1 (Lookup) with a clean slate

3. **Independent Resolution:**
   - Every workflow command triggers the full Resolution Flow (Steps 1-5)
   - Orchestration Map lookup happens fresh every time
   - Stack resolution happens fresh every time
   - Overrides (`--persona`, `--skills`) apply ONLY to the current command

### Example Sequence

```
Command 1: #impl
  → Active Context 1:
     - persona: Software Engineer
     - skills: [typescript, clean-code, software-testing]
  → Passed to JIT, executed, destroyed

Command 2: #review
  → Active Context 2:
     - persona: Code Reviewer (NOT Software Engineer from Command 1)
     - skills: [code-quality, security-basics] (NOT typescript, clean-code, software-testing)
  → Fresh lookup, fresh resolution, zero carry-over

Command 3: #impl --persona architect
  → Active Context 3:
     - persona: Solutions Architect (override applies)
     - skills: [typescript, clean-code, software-testing] (from fresh map lookup)
  → Override does NOT persist to future commands
```

### Anti-Pattern: Stateful Accumulation (DO NOT DO THIS)

```
❌ WRONG: Accumulating skills across commands
Command 1: #impl → skills: [typescript, clean-code, software-testing]
Command 2: #review → skills: [typescript, clean-code, software-testing, code-quality, security-basics]
                     ↑ DO NOT carry over from Command 1

✓ CORRECT: Fresh context per command
Command 1: #impl → skills: [typescript, clean-code, software-testing]
Command 2: #review → skills: [code-quality, security-basics]
                     ↑ Only skills from Orchestration Map lookup
```

### Rationale

- **Predictability:** Users always get the workflow's default persona and skills unless explicitly overridden
- **Simplicity:** No hidden state to track or debug
- **Consistency:** Same command always produces same Active Context (given same project state)
- **Isolation:** Bugs in one workflow execution cannot pollute future executions

---

## 10. LIFECYCLE

**Trigger:** Workflow command received from COMMAND-ROUTER

**Output:** Active Context passed to JIT-PROTOCOL

**Reset:** Active Context is ephemeral — fully reset on each new workflow command (no state carry-over)

**Session Model:** See Section 9 for detailed "last command wins" semantics

---

*WORKFLOW-ORCHESTRATOR.md v0.1.0 | Phase 2 Complete | 2026-02-04*
