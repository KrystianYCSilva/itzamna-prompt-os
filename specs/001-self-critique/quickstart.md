# Quick Start: Enhanced Self-Critique Protocol

**Feature Branch**: `001-self-critique`  
**Date**: 2026-02-02

---

## What is Self-Critique?

Self-Critique is a protocol that AI agents follow to evaluate their own work **before** presenting it to humans for approval. It produces:

- **Quality Score** (0-100) with breakdown by dimension
- **Strengths/Weaknesses** identification
- **Improvement Suggestions** (actionable)
- **Redundancy Detection** (for skills)

---

## How It Works

```
You (AI agent) generate an artifact
           │
           ▼
You follow SELF-CRITIQUE.md protocol
           │
           ▼
You produce a CritiqueResult (score, suggestions, etc.)
           │
           ▼
You present artifact + critique in HUMAN-GATE
           │
           ▼
Human reviews and decides
```

**Key Point**: This is prompt-based. You READ the protocol instructions and FOLLOW them. No code execution required.

---

## Step-by-Step Usage

### Step 1: Complete Your Artifact

Generate your code, skill, persona, or documentation as usual.

### Step 2: Apply Quick Check (Phase 1)

Before detailed evaluation, verify:

```
[ ] Did I understand the request correctly?
[ ] Does my response answer what was asked?
[ ] Any obvious errors (typos, syntax, logic)?
[ ] Am I violating any T0 rule?
```

**If any answer is "no"**: Fix before continuing.

### Step 3: Evaluate Quality (Phase 2)

Score your artifact on 4 dimensions (0-25 each):

| Dimension | What to Check |
|-----------|---------------|
| **Completeness** | All requirements met? No TODOs/placeholders? Edge cases handled? |
| **Clarity** | Easy to understand? Descriptive names? Logical structure? |
| **Correctness** | Logic correct? No bugs? APIs used correctly? |
| **Best Practices** | SOLID? DRY? Project patterns? Language conventions? |

**Total Score** = Sum of 4 dimensions (max 100)

### Step 4: Apply Type-Specific Checklist

Choose the checklist matching your artifact type:

**For Code**:
- [ ] Compiles/executes without errors?
- [ ] Tests pass (if exist)?
- [ ] No hardcoded secrets (T0-SEC-01)?
- [ ] Functions <30 lines?
- [ ] Error handling adequate?

**For Skills**:
- [ ] Valid YAML frontmatter?
- [ ] All required sections present?
- [ ] Minimum 2-3 examples?
- [ ] No placeholders (TODO, XXX)?

**For Documentation**:
- [ ] Answers the user's question?
- [ ] Logical structure?
- [ ] Examples included?

### Step 5: Check for Redundancy (Skills Only)

1. Read `skills/INDEX.md` to get list of existing skills
2. Compare your new skill's:
   - Name
   - Tags
   - Domain
   - Description keywords
3. If >60% overlap with existing skill, flag it

### Step 6: Produce Critique Result

Format your evaluation:

```yaml
critique:
  score: {your_score}
  band: "{Excellent|Good|Fair|Poor}"
  
  dimensions:
    completeness: {score}/25
    clarity: {score}/25
    correctness: {score}/25
    best_practices: {score}/25
  
  strengths:
    - "{what you did well}"
    - "{another strength}"
  
  weaknesses:
    - "{what needs improvement}"
  
  suggestions:
    - "{actionable improvement 1}"
    - "{actionable improvement 2}"
  
  similar_items:  # Only if found
    - name: "{skill_name}"
      similarity: {percentage}
```

### Step 7: Present in Human Gate

Display your artifact with the critique:

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: {name}
 Type: {type}
 
 SELF-CRITIQUE: {score}/100 ({band}) {emoji}
 
 ✓ Strengths:
   {list strengths}
 
 ✗ Weaknesses:
   {list weaknesses}
 
 💡 Suggestions:
   {list suggestions}
============================================

[1] approve  [2] view  [3] edit  [4] reject  [5] cancel
```

---

## Score Bands and Actions

| Score | Band | Indicator | Your Action |
|-------|------|-----------|-------------|
| 90-100 | Excellent | 🟢 | Proceed with confidence |
| 70-89 | Good | 🔵 | Proceed, note attention points |
| 50-69 | Fair | 🟡 | Display warning, emphasize suggestions |
| 0-49 | Poor | 🔴 | Strong warning, suggest regeneration |

**Never auto-reject**: Human always decides, regardless of score.

---

## Example: Evaluating a Skill

**Artifact**: A new skill called `docker-compose-basics`

**Quick Check**:
```
[x] Understood request: Create Docker Compose skill
[x] Response: Created skill with examples
[x] No obvious errors
[x] No T0 violations
```

**Dimension Scores**:
```
Completeness:   22/25 (missing troubleshooting section)
Clarity:        24/25 (clear instructions)
Correctness:    20/25 (examples work but one is outdated)
Best Practices: 19/25 (good structure, could add more constraints)

Total: 85/100 (Good)
```

**Checklist**:
```
[x] Valid YAML frontmatter
[x] All required sections present
[x] 3 examples (meets minimum)
[x] No placeholders
```

**Redundancy Check**:
```
Compared with skills/INDEX.md:
- docker-basics: 55% overlap (below threshold)
- kubernetes-basics: 30% overlap (below threshold)
No redundancy warning needed.
```

**Critique Result**:
```yaml
critique:
  score: 85
  band: "Good"
  
  dimensions:
    completeness: 22/25
    clarity: 24/25
    correctness: 20/25
    best_practices: 19/25
  
  strengths:
    - "Clear step-by-step compose instructions"
    - "Practical examples with real services"
    - "Good coverage of common use cases"
  
  weaknesses:
    - "Missing troubleshooting section"
    - "One example uses deprecated syntax"
  
  suggestions:
    - "Add troubleshooting section for common errors"
    - "Update example 2 to use version 3.8 syntax"
    - "Add constraint about network configuration"
```

**Human Gate Display**:
```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: docker-compose-basics
 Type: skill
 
 SELF-CRITIQUE: 85/100 (Good) 🔵
 
 ✓ Strengths:
   + Clear step-by-step compose instructions
   + Practical examples with real services
   + Good coverage of common use cases
 
 ✗ Weaknesses:
   - Missing troubleshooting section
   - One example uses deprecated syntax
 
 💡 Suggestions:
   1. Add troubleshooting section for common errors
   2. Update example 2 to use version 3.8 syntax
============================================

[1] approve  [2] view  [3] edit  [4] reject  [5] cancel
```

---

## When NOT to Self-Critique

Self-critique is for **significant deliverables**. Skip for:

- Simple yes/no answers
- Quick commands
- Clarifying questions
- Trivial formatting

---

## Common Mistakes to Avoid

1. **Inflating scores** - Be honest. A 90+ should be genuinely excellent.
2. **Generic suggestions** - Make suggestions specific and actionable.
3. **Skipping redundancy check** - Always check INDEX.md for skills.
4. **Verbose critique output** - Keep it concise, humans will ask for details.
5. **Auto-rejecting low scores** - Never reject; let human decide.

---

## Reference Files

| File | Purpose |
|------|---------|
| `.prompt-os/core/SELF-CRITIQUE.md` | Full protocol instructions |
| `.prompt-os/core/HUMAN-GATE.md` | Approval workflow |
| `skills/INDEX.md` | Skill registry for redundancy check |
| `.prompt-os/CONSTITUTION.md` | T0/T1/T2 rules |

---

*Quick Start version: 1.0.0 | Created: 2026-02-02*
