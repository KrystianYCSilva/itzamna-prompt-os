# Orchestration Map Verification

**Task:** T022 - Verify `contracts/orchestration-map.yaml` is consistent with the final Orchestration Map table in the protocol  
**Protocol File:** `.prompt-os/core/WORKFLOW-ORCHESTRATOR.md` (Section 4, Lines 38-49)  
**Contract File:** `specs/007-workflow-orchestrator/contracts/orchestration-map.yaml` (Lines 105-126)

---

## Verification Method

Compare each workflow entry in the protocol table against the YAML contract to ensure:
1. Workflow ID matches
2. Persona name matches
3. Skills list matches (order and content)
4. `{stack-skill}` placeholder syntax is consistent

---

## Workflow-by-Workflow Verification

### Workflow 1: `#new`

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 43):**
```
Workflow: #new
Persona: Product Owner
Skills: requirements-gathering, card-templates
```

**Contract (orchestration-map.yaml, Lines 106-108):**
```yaml
- workflow: new
  persona: Product Owner
  skills: [requirements-gathering, card-templates]
```

**Comparison:**
- Workflow ID: ✅ `new` (matches, # prefix stripped in YAML)
- Persona: ✅ `Product Owner` (exact match)
- Skills: ✅ `[requirements-gathering, card-templates]` (exact match, same order)

**Status:** ✅ CONSISTENT

---

### Workflow 2: `#impl`

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 44):**
```
Workflow: #impl
Persona: Software Engineer
Skills: {stack-skill}, clean-code, software-testing
```

**Contract (orchestration-map.yaml, Lines 109-111):**
```yaml
- workflow: impl
  persona: Software Engineer
  skills: ["{stack-skill}", clean-code, software-testing]
```

**Comparison:**
- Workflow ID: ✅ `impl` (matches, # prefix stripped in YAML)
- Persona: ✅ `Software Engineer` (exact match)
- Skills: ✅ `["{stack-skill}", clean-code, software-testing]` (exact match, same order)
- Placeholder syntax: ✅ `{stack-skill}` wrapped in quotes in YAML (correct for string literal)

**Status:** ✅ CONSISTENT

---

### Workflow 3: `#bug`

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 45):**
```
Workflow: #bug
Persona: Debugger
Skills: debugging-techniques, error-handling, {stack-skill}
```

**Contract (orchestration-map.yaml, Lines 112-114):**
```yaml
- workflow: bug
  persona: Debugger
  skills: [debugging-techniques, error-handling, "{stack-skill}"]
```

**Comparison:**
- Workflow ID: ✅ `bug` (matches, # prefix stripped in YAML)
- Persona: ✅ `Debugger` (exact match)
- Skills: ✅ `[debugging-techniques, error-handling, "{stack-skill}"]` (exact match, same order)
- Placeholder syntax: ✅ `{stack-skill}` wrapped in quotes in YAML (correct for string literal)

**Status:** ✅ CONSISTENT

---

### Workflow 4: `#review`

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 46):**
```
Workflow: #review
Persona: Code Reviewer
Skills: code-quality, security-basics
```

**Contract (orchestration-map.yaml, Lines 115-117):**
```yaml
- workflow: review
  persona: Code Reviewer
  skills: [code-quality, security-basics]
```

**Comparison:**
- Workflow ID: ✅ `review` (matches, # prefix stripped in YAML)
- Persona: ✅ `Code Reviewer` (exact match)
- Skills: ✅ `[code-quality, security-basics]` (exact match, same order)

**Status:** ✅ CONSISTENT

---

### Workflow 5: `#docs`

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 47):**
```
Workflow: #docs
Persona: Technical Writer
Skills: technical-writing, markdown
```

**Contract (orchestration-map.yaml, Lines 118-120):**
```yaml
- workflow: docs
  persona: Technical Writer
  skills: [technical-writing, markdown]
```

**Comparison:**
- Workflow ID: ✅ `docs` (matches, # prefix stripped in YAML)
- Persona: ✅ `Technical Writer` (exact match)
- Skills: ✅ `[technical-writing, markdown]` (exact match, same order)

**Status:** ✅ CONSISTENT

---

### Workflow 6: `#test`

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 48):**
```
Workflow: #test
Persona: QA Engineer
Skills: software-testing, tdd
```

**Contract (orchestration-map.yaml, Lines 121-123):**
```yaml
- workflow: test
  persona: QA Engineer
  skills: [software-testing, tdd]
```

**Comparison:**
- Workflow ID: ✅ `test` (matches, # prefix stripped in YAML)
- Persona: ✅ `QA Engineer` (exact match)
- Skills: ✅ `[software-testing, tdd]` (exact match, same order)

**Status:** ✅ CONSISTENT

---

### Workflow 7: `#arch`

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 49):**
```
Workflow: #arch
Persona: Solutions Architect
Skills: system-design, architecture-patterns
```

**Contract (orchestration-map.yaml, Lines 124-126):**
```yaml
- workflow: arch
  persona: Solutions Architect
  skills: [system-design, architecture-patterns]
```

**Comparison:**
- Workflow ID: ✅ `arch` (matches, # prefix stripped in YAML)
- Persona: ✅ `Solutions Architect` (exact match)
- Skills: ✅ `[system-design, architecture-patterns]` (exact match, same order)

**Status:** ✅ CONSISTENT

---

## Valid Personas Verification

**Protocol (WORKFLOW-ORCHESTRATOR.md, Line 51):**
```
Valid Personas: Product Owner, Software Engineer, Debugger, Code Reviewer, Technical Writer, QA Engineer, Solutions Architect
```

**Contract (orchestration-map.yaml, Lines 23-31):**
```yaml
persona:
  type: string
  enum:
    - Product Owner
    - Software Engineer
    - Debugger
    - Code Reviewer
    - Technical Writer
    - QA Engineer
    - Solutions Architect
```

**Comparison:**
- ✅ All 7 personas are listed in both files
- ✅ Persona names match exactly (case-sensitive)
- ✅ Order is consistent

**Status:** ✅ CONSISTENT

---

## Schema Constraints Verification

**Contract (orchestration-map.yaml, Lines 32-38):**
```yaml
skills:
  type: array
  items:
    type: string
  minItems: 2
  maxItems: 5
  description: Ordered by priority. Index 0 is evicted last.
```

**Protocol (WORKFLOW-ORCHESTRATOR.md):**
- **Skill count constraint:** Section 6.5, Lines 327-352 (2-5 skills enforced)
- **Priority order:** Section 4, Line 39 ("Skills are listed in priority order (highest priority first = evicted last)")
- **Eviction logic:** Section 6.4, Lines 246-259 (evict in reverse priority order)

**Comparison:**
- ✅ `minItems: 2` matches protocol validation (Line 328: `len(skills) >= 2`)
- ✅ `maxItems: 5` matches protocol validation (Line 328: `len(skills) <= 5`)
- ✅ Priority order description matches (Line 39 vs. Line 38 in YAML)

**Status:** ✅ CONSISTENT

---

## Summary

| Workflow | Workflow ID | Persona | Skills | Priority Order | Status |
|----------|-------------|---------|--------|----------------|--------|
| `#new` | ✅ Match | ✅ Match | ✅ Match | ✅ Correct | ✅ PASS |
| `#impl` | ✅ Match | ✅ Match | ✅ Match | ✅ Correct | ✅ PASS |
| `#bug` | ✅ Match | ✅ Match | ✅ Match | ✅ Correct | ✅ PASS |
| `#review` | ✅ Match | ✅ Match | ✅ Match | ✅ Correct | ✅ PASS |
| `#docs` | ✅ Match | ✅ Match | ✅ Match | ✅ Correct | ✅ PASS |
| `#test` | ✅ Match | ✅ Match | ✅ Match | ✅ Correct | ✅ PASS |
| `#arch` | ✅ Match | ✅ Match | ✅ Match | ✅ Correct | ✅ PASS |

**Additional Checks:**
- ✅ Valid Personas list is consistent (7 personas)
- ✅ Schema constraints match protocol validation (2-5 skills)
- ✅ Priority order description is consistent
- ✅ `{stack-skill}` placeholder syntax is consistent (quoted in YAML)

---

## Issues Found

**None.** The `contracts/orchestration-map.yaml` file is fully consistent with the Orchestration Map table in `.prompt-os/core/WORKFLOW-ORCHESTRATOR.md`.

---

## Recommendations

1. **Keep these files in sync:** Any future changes to the Orchestration Map should be reflected in both files.
2. **Version control:** Both files should be versioned together to maintain consistency.
3. **Validation automation:** Consider adding a CI check to verify YAML contract matches protocol table.

---

## Sign-off

| Verification Aspect | Status | Reviewer | Date |
|---------------------|--------|----------|------|
| All 7 workflows match | ✅ Pass | ___________ | ________ |
| All personas match | ✅ Pass | ___________ | ________ |
| All skills match (order & content) | ✅ Pass | ___________ | ________ |
| Schema constraints match | ✅ Pass | ___________ | ________ |
| `{stack-skill}` syntax consistent | ✅ Pass | ___________ | ________ |
| Overall consistency | ✅ Pass | ___________ | ________ |

---

*Orchestration Map Verification | T022 | SPEC-007 | v1.0.0 | 2026-02-04*
