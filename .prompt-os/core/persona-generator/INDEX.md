# .prompt-os/core/persona-generator/INDEX.md - Persona Generation Guide

> **Create specialized AI personas from skills: behavioral traits, triggers, and decision-making rules.**  
> This subdirectory implements the persona generation protocol referenced in `PERSONA-GENERATOR.md`.

---

## What is Persona Generation?

A **persona** is a specialized AI agent role with:
- **Traits**: How it behaves (analytical, creative, careful, aggressive)
- **Triggers**: When it activates (certain input patterns, keywords, contexts)
- **Skills**: What it can do (derived from `.prompt-os/skills/`)
- **Constraints**: What it won't do (safety rules, scope boundaries)
- **Communication**: How it talks to users (tone, language, verbosity)

**This subdirectory** provides the systematic process to generate these personas from raw skills.

---

## The 4 Persona Generation Files

### **1. persona-generation-workflow.md** - The 6-Phase Workflow

**Purpose:** Complete end-to-end process for creating a new persona.

**The 6 phases:**
1. **Analysis** - Extract traits from skill files
2. **Inference** - Infer personality from capabilities
3. **Synthesis** - Combine traits into a coherent persona
4. **Trigger Generation** - Define activation conditions
5. **Validation** - Check consistency and conflicts
6. **Packaging** - Format as YAML/Markdown for `.prompt-os/personas/`

**What it covers:**
- Step-by-step instructions for each phase
- Input requirements (which skills to analyze)
- Output format (YAML structure)
- Quality gates (validation checklist)
- Examples and edge cases

**When to use:** Creating a new persona from scratch; understanding the generation process.

**Lines:** ~450 | **Size:** ~14KB

---

### **2. persona-traits-inference.md** - Trait Matrices & Inference Rules

**Purpose:** Map skills to personality traits using level-based matrices.

**What it covers:**
- Trait dimension (competence, caution, creativity, collaboration, etc.)
- Level-based inference (if skill = advanced → higher competence)
- Trait combinations (which traits appear together?)
- Domain-specific traits (traits for Python vs. Kotlin personas)
- Trait intensity (how "strong" is this trait?)
- Contradictions (what trait combinations are invalid?)
- Trait inference rules (decision trees for trait assignment)

**When to use:** Extracting traits from skills; understanding trait combinations; resolving contradictory traits.

**Lines:** ~500 | **Size:** ~15KB

---

### **3. persona-triggers.md** - Trigger Generation & Conflict Detection

**Purpose:** Define when a persona activates; resolve trigger conflicts.

**What it covers:**
- Trigger types (keyword, context, user-request, skill-present)
- Trigger design (specific vs. broad, exact vs. fuzzy)
- Trigger priority (which persona fires first if multiple match?)
- Trigger conflicts (two personas with same trigger - how to resolve?)
- Fallback behavior (what if no trigger matches?)
- Exclusion rules (when NOT to activate a persona)
- Testing triggers (verify they work as expected)

**When to use:** Designing persona activation; debugging persona conflicts; testing trigger logic.

**Lines:** ~400 | **Size:** ~12KB

---

### **4. persona-examples.md** - 3 Complete Worked Examples

**Purpose:** See personas generated from start to finish with explanations.

**What it covers:**
- **Example 1: Python Specialist Persona**
  - Input skills: Python basics + advanced versions
  - Generated traits: Pragmatic, detail-oriented, pedagogical
  - Triggers: User mentions Python, needs code review
  - Final YAML definition

- **Example 2: Security-Focused Persona**
  - Input skills: Security, cryptography, code review
  - Generated traits: Cautious, critical, thorough
  - Triggers: Security-related keywords, code review request
  - Final YAML definition

- **Example 3: Research & Documentation Persona**
  - Input skills: Web research, knowledge base, writing
  - Generated traits: Thorough, analytical, academic
  - Triggers: Research request, documentation task
  - Final YAML definition

Each example shows:
- How traits are inferred from skills
- How triggers are designed
- The final YAML output
- Rationale for decisions

**When to use:** Learning by example; understanding the output format; getting inspiration for new personas.

**Lines:** ~350 | **Size:** ~11KB

---

## Recommended Reading Order

```
1. persona-generation-workflow.md    → Understand the 6-phase process
2. persona-traits-inference.md       → Master trait inference rules
3. persona-triggers.md               → Design activation triggers
4. persona-examples.md               → See 3 worked examples
```

This order takes you from **process → rules → implementation → examples**.

---

## When to Use Each File

| Task | Read |
|------|------|
| "How do I create a new persona?" | persona-generation-workflow.md (all 6 phases) |
| "What traits should this persona have?" | persona-traits-inference.md |
| "When should this persona activate?" | persona-triggers.md |
| "What does the output look like?" | persona-examples.md |
| "What if traits conflict?" | persona-traits-inference.md (contradiction detection) |
| "Why did two personas trigger together?" | persona-triggers.md (conflict detection) |
| "Can I see a real persona generation?" | persona-examples.md (worked examples) |
| "What's the YAML format?" | persona-examples.md (examine the output) |

---

## Key Concepts

### The 6-Phase Workflow

```
PHASE 1: ANALYSIS
Input: Skill files (SKILL.md)
↓ Extract capabilities, topics, difficulty levels
PHASE 2: INFERENCE
↓ Map capabilities → personality traits
PHASE 3: SYNTHESIS
↓ Combine traits into coherent persona (resolve conflicts)
PHASE 4: TRIGGER GENERATION
↓ Define when persona activates (keywords, context)
PHASE 5: VALIDATION
↓ Check consistency (traits, triggers, constraints)
PHASE 6: PACKAGING
Output: YAML definition in .prompt-os/personas/
```

### Trait Dimensions

Personas are defined along several trait axes:

| Dimension | Low ← → High | Example Behaviors |
|-----------|------------|-------------------|
| **Competence** | Novice ← → Expert | Cautious claims vs. confident assertions |
| **Caution** | Risk-taking ← → Cautious | Bold experiments vs. conservative approach |
| **Creativity** | Rigid ← → Creative | Standard solutions vs. novel approaches |
| **Collaboration** | Solo ← → Teamwork | Independent work vs. cross-functional help |
| **Verbosity** | Concise ← → Detailed | Terse answers vs. comprehensive explanations |

**A persona is a point in this multi-dimensional space.**

### Triggers

Triggers determine **when** a persona activates:

```
Persona: Python Specialist
Triggers:
  - keyword: ["python", "py", "django", "flask"]
  - context: ["code review", "debugging", "optimization"]
  - skill_match: ["linguagens/python/*"]
Priority: 5 (medium priority)
Excludes: ["safety-critical", "real-time-systems"]
```

When user message contains "python" → this persona activates (if not excluded).

### Conflicts

Two personas might claim the same trigger:

```
Persona A: Python Security Specialist
Trigger: ["security", "python"]

Persona B: Python General Specialist
Trigger: ["python"]

User: "How do I secure a Python app?"
→ Both trigger! Persona A has higher priority (more specific)
```

Solution: Use trigger priority and specificity rules.

---

## Integration with Core Protocols

This subdirectory implements **PERSONA-GENERATOR.md** (Protocol 7):

- **INPUT-CLASSIFIER.md** → Routes "persona generation" requests here
- **AUTO-INCREMENT.md** → Detects missing personas (e.g., "we need a Rust persona")
- **PERSONA-GENERATOR.md** → Main protocol (this subdirectory is the detailed implementation)
- **SELF-CRITIQUE.md** → Evaluates generated personas (consistency, trigger clarity)
- **HUMAN-GATE.md** → Requires approval before saving new personas
- **MEMORY-MANAGEMENT.md** → Records new personas + generation history

---

## File Structure

```
.prompt-os/core/persona-generator/
├── INDEX.md                         # ← YOU ARE HERE
├── persona-generation-workflow.md   # The 6-phase process
├── persona-traits-inference.md      # Trait extraction & inference
├── persona-triggers.md              # Trigger design & conflicts
└── persona-examples.md              # 3 worked examples
```

---

## Statistics

| File | Lines | Size | Purpose |
|------|-------|------|---------|
| persona-generation-workflow.md | ~450 | ~14KB | 6-phase workflow |
| persona-traits-inference.md | ~500 | ~15KB | Trait inference rules |
| persona-triggers.md | ~400 | ~12KB | Trigger generation |
| persona-examples.md | ~350 | ~11KB | Worked examples |
| **TOTAL** | **1,700** | **52KB** | **Persona generation framework** |

---

## Related Files

### In this system
- **Parent**: [../PERSONA-GENERATOR.md](../PERSONA-GENERATOR.md) (protocol overview)
- **Related protocols**: [../AUTO-INCREMENT.md](../AUTO-INCREMENT.md), [../SELF-CRITIQUE.md](../SELF-CRITIQUE.md)
- **Index of all subdirs**: [../INDEX.md](../INDEX.md)

### In other subdirectories
- **Skills to analyze**: [../../skills/](../../skills/) (source material for personas)
- **Research for persona backgrounds**: [../web-research/](../web-research/)

### In personas directory
- **Generated personas**: [../../personas/](../../personas/) (output of this process)

---

## Workflow Example: Create a JavaScript Specialist Persona

```
User: "Generate a JavaScript specialist persona"

PHASE 1: ANALYSIS
→ Read .prompt-os/skills/linguagens/javascript/SKILL.md
→ Extract: capabilities (ES6, async, DOM), topics (web dev, Node.js), levels (basic-advanced)

PHASE 2: INFERENCE
→ Use persona-traits-inference.md to map capabilities to traits
→ High competence: JavaScript expert
→ Medium creativity: Pragmatic approach
→ High collaboration: Mentors other devs

PHASE 3: SYNTHESIS
→ Check for conflicts: all traits consistent ✅
→ Create coherent persona: "Pragmatic JavaScript mentor"

PHASE 4: TRIGGER GENERATION
→ Triggers:
  - keyword: ["javascript", "js", "node", "react", "async/await"]
  - context: ["code review", "optimization", "debugging"]
  - skill_match: ["linguagens/javascript/*"]

PHASE 5: VALIDATION
→ Check consistency ✅
→ Test triggers ✅
→ No conflicts with existing personas ✅

PHASE 6: PACKAGING
→ Create .prompt-os/personas/javascript-specialist.md
→ Format as YAML with traits, triggers, skills, constraints

OUTPUT YAML:
name: JavaScript Specialist
traits:
  competence: 9/10
  caution: 5/10
  creativity: 6/10
  collaboration: 8/10
triggers:
  keywords: ["javascript", "js", "node", "react"]
  contexts: ["code review", "debugging"]
skills:
  - "linguagens/javascript/SKILL.md"
constraints:
  - avoid: ["safety-critical", "real-time"]
communication:
  tone: "pragmatic, helpful"
  verbosity: "detailed examples"
```

---

## Quick Tips

### Best Practices for Persona Design

1. **Start with skills** (read SKILL.md thoroughly)
2. **Infer one trait at a time** (don't mix dimensions)
3. **Check for contradictions** (careful + creative might be rare)
4. **Design specific triggers** (not too broad, not too narrow)
5. **Validate against existing personas** (avoid duplicates)
6. **Test triggers** (ask: "Would this activate correctly?")
7. **Document rationale** (why these traits?)

### Common Problems & Solutions

| Problem | Solution |
|---------|----------|
| "Two personas with same trigger" | Use trigger priority in persona-triggers.md |
| "Persona traits seem contradictory" | Check persona-traits-inference.md for valid combinations |
| "Generated persona is too generic" | Increase trigger specificity in persona-triggers.md |
| "I don't know how to map skills → traits" | See persona-examples.md for worked examples |
| "What's the correct YAML format?" | Copy structure from persona-examples.md |
| "How do I know if a persona is good?" | Use SELF-CRITIQUE.md (consistency, clarity, utility) |

---

## Next Steps

1. **New to persona generation?** → Start with persona-generation-workflow.md
2. **Need to understand traits?** → Jump to persona-traits-inference.md
3. **Designing a new persona?** → Read all 4 files in recommended order
4. **Want to see examples?** → Go straight to persona-examples.md
5. **Ready to generate?** → Use the 6-phase workflow as a checklist

---

*Last Updated: 2026-02-03 23:15:53*  
*Status: Production Ready*  
*For maintenance, see [../docs/INDEX-MAINTENANCE.md](../docs/INDEX-MAINTENANCE.md)*
