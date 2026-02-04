# JIT-001: Persona Generation Workflow

> **Detailed 6-phase workflow for generating personas.**  
> Referenced from: `PERSONA-GENERATOR.md`

---

## 6-Phase Generation Workflow

### Phase 1: Entender o Request (Understand Request)

**Goal**: Extract requirements from user input

**Algorithm**:

```
Input: User description
  Example: "Crie uma persona de backend engineer focado em microsservicos"

1. Extract domain keywords:
   - "backend" → domains: ["backend"]
   - "microsservicos" → specialization: "microservices"
   - "engineer" → role indicator

2. Detect level indicators:
   - IF contains: "senior", "lead", "staff", "principal" → level = "senior"
   - IF contains: "junior", "entry", "beginner" → level = "junior"
   - ELSE → level = "mid" (default)

3. Extract specialization:
   - "microsservicos" → specialization: "microservices"
   - "kubernetes" → domain hint: "devops"
   - "react" → domain hint: "frontend"

4. Output:
   {
     domains: ["backend"],
     level: "mid" (or extracted),
     specialization: "microservices",
     keywords: ["backend", "microsservicos"]
   }
```

---

### Phase 2: Match de Skills (Skill Matching)

**Goal**: Find and rank relevant skills from library

**Data Source**: `.prompt-os/skills/INDEX.md`

**Algorithm Steps**:

#### Step 1: Query Skill Library

```
for each skill in INDEX.md:
  calculate relevance_score(skill, extracted_keywords)
```

#### Step 2: Scoring Formula (4-weight model)

```
score = (domain_match × 0.40) + 
        (name_match × 0.30) + 
        (tag_match × 0.20) + 
        (desc_match × 0.10)

Where:
- domain_match: Does skill's domain match persona domain? (0.0 or 0.40)
- name_match: Keywords in skill name? (0.0-0.30, 0.1 per match, max 3)
- tag_match: Keywords in skill tags? (0.0-0.20, 0.05 per match, max 4)
- desc_match: Keywords in skill description? (0.0-0.10, 0.02 per match, max 5)
```

#### Step 3: Filtering & Ranking

```
1. Calculate score for ALL skills
2. Sort by score (descending)
3. Core skills: Top 3-5 (with score ≥ 0.70)
4. Secondary skills: Next 2-3 (with score 0.40-0.69)
5. Excluded: Score < 0.40 (too low relevance)

Example output:
{
  core: [
    "nodejs-api" (score: 0.95),
    "docker-basics" (score: 0.85),
    "kubernetes" (score: 0.80)
  ],
  secondary: [
    "testing-backend" (score: 0.60),
    "observability" (score: 0.55)
  ]
}
```

#### Step 4: Skill Gap Handling

**Decision Rule** (from SPEC clarification):
```
IF no skills with score ≥ 0.40 found:
  Action: REJECT persona creation
  Message: "No skills matching {domains}. Current library: {available domains}"
  Guidance: "To create this persona, add skills first"
  Logging: Register gap in AUTO-INCREMENT.md for v2.3.0

Rationale: Maintains quality. AUTO-INCREMENT drives library growth.
```

---

### Phase 3: Inferir Atributos (Infer Attributes)

**Goal**: Determine behavioral traits based on level and domain

**See**: `persona-traits-inference.md` for detailed trait matrices

**Output**:
```
{
  communication_style: "Technical and concise",
  decision_approach: "Strategic, considers trade-offs",
  collaboration_mode: "Async-first with documentation",
  behavioral_traits: {
    problem_solving: [...],
    communication: [...],
    code_review: [...]
  }
}
```

---

### Phase 4: Gerar Conteudo (Generate Content)

**Goal**: Fill template with all attributes

**Template Structure**:
```yaml
---
# PERSONA: {name}
# Version: 1.0.0
# Generated: {date}
# Author: promptos-brain

name: "{Name}"
role: "{Professional Title}"
level: "{junior|mid|senior|principal}"
domains: [{domain1}, {domain2}]

skills:
  core: [{skill1}, {skill2}, {skill3}]
  secondary: [{skill4}, {skill5}]

context:
  communication_style: "{style}"
  decision_approach: "{approach}"
  collaboration_mode: "{mode}"

triggers: [{trigger1}, {trigger2}, ...]
---

# {Name}

## Identity
{Description: 2-3 sentences about who this persona is}

## Core Competencies
{Bulleted list: what can they do well?}

## Behavioral Traits

### Communication
{How do they communicate?}

### Problem Solving
{How do they approach problems?}

### Code Review (if applicable)
{How do they review code?}

## When to Activate
{Situations where this persona applies}
```

**Filling Rules**:
1. Use inferred traits from Phase 3
2. List core skills from Phase 2
3. Generate triggers using algorithm from `persona-triggers.md`
4. Match template tone to level (junior=educational, senior=technical)

---

### Phase 5: Self-Critique

**Goal**: Validate persona quality before presenting

**Checklist**:
```
Quality Dimensions (0-100 scale):

[Completude]
  - [ ] All YAML fields present? (10 points)
  - [ ] Name, role, level specified? (10 points)
  - [ ] Domains explicitly listed? (10 points)
  - [ ] Skills selected (core + secondary)? (10 points)
  - [ ] Triggers generated (4-8)? (10 points)

[Clareza]
  - [ ] Identity section clear and specific? (10 points)
  - [ ] Behavioral traits match level + domain? (10 points)
  - [ ] Triggers relevant and unique? (10 points)

[Correcao]
  - [ ] Skills exist in INDEX.md? (10 points)
  - [ ] No trigger conflicts with existing personas? (10 points)

[Best Practices]
  - [ ] Not duplicate of existing persona? (10 points)
  - [ ] Level coherent with style? (10 points)
```

**Target Score**: ≥80/100 for generated personas

**Example Self-Critique Output**:
```
Self-Critique Results for "Senior Backend Engineer":

Completude: 45/50 (all fields present)
Clareza: 30/30 (clear and specific)
Correcao: 20/20 (skills verified, no conflicts)
Best Practices: 18/20 (minor redundancy with existing)

Total: 113/120 = 94/100 ✅

Recommendations:
- Consider renaming to avoid confusion with "Backend Engineer" persona
- All other aspects excellent
```

---

### Phase 6: Human Gate

**Goal**: Get user approval before saving

**Workflow**:

```
Agent presents to user:

"I've generated persona 'Senior Backend Engineer':

Configuration:
- Role: Backend Engineer
- Level: senior
- Domains: backend, devops
- Core Skills: nodejs-api, docker-basics, kubernetes
- Secondary Skills: testing-backend, observability
- Triggers: backend, microservices, api design, kubernetes

Self-Critique Score: 94/100

Preview (first 300 words):
{persona content preview}

[View Full] [Approve] [Edit] [Reject] [Cancel]"

User selects one:
1. [View Full] → Show complete persona file
2. [Approve] → Save to `.prompt-os/personas/{name}.md`, update INDEX
3. [Edit] → Return to Phase 4 with specific edits
4. [Reject] → Log rejection, close without saving
5. [Cancel] → Abandon generation

Post-approval actions:
1. Create file: `.prompt-os/personas/{persona-name}.md`
2. Add entry to `.prompt-os/personas/INDEX.md`
3. Log to MEMORY.md: new persona created
4. Return: "Persona '{name}' created and registered."
```

---

## Integration with Other Protocols

| Protocol | Purpose | When Used |
|----------|---------|-----------|
| SELF-CRITIQUE.md | Score persona quality | Phase 5 |
| HUMAN-GATE.md | Get user approval | Phase 6 |
| AUTO-INCREMENT.md | Log skill gaps + personas | After Phase 6 |
| KNOWLEDGE-BASE.md | Query skill library | Phase 2 |

---

## Error Handling

### Case 1: Skills Not Found

```
User Request: "Crie persona Data Scientist expert em Rust"
Phase 2 Result: No skills matching data-science + rust found
Action: REJECT + log gap
Message: "No skills matching 'data science' domain. Current skills: backend, frontend, devops"
Log: AUTO-INCREMENT.md → "Gap: data-science skills needed in v2.3.0"
```

### Case 2: Duplicate Triggers

```
User Request: "Crie Backend Engineer especializado"
Phase 6 check: triggers ["backend", "api design"] overlap with existing persona
Action: Alert user
Message: "Triggers overlap with 'Senior Backend Engineer' persona. Proceed anyway? [Y/N]"
```

### Case 3: Ambiguous Domain

```
User Request: "Crie persona Fullstack"
Phase 1: domains = ["frontend", "backend"]
Phase 2: Match both frontend AND backend skills
Phase 3: Trait inference from fullstack matrix
Result: Balanced persona across both domains
```

---

## Success Criteria (from spec)

- ✅ SC-001: Natural language descriptions convertible to personas
- ✅ SC-002: Personas maintain 3-5 core skills, 2-3 secondary
- ✅ SC-003: Behavioral traits derived consistently (±3 point variation)
- ✅ SC-004: Triggers generated without user manual input
- ✅ SC-005: Duplicates detected via trigger/skill overlap
- ✅ SC-006: Self-critique scores ≥80/100
- ✅ SC-007: Human Gate approval required before persistence
- ✅ SC-008: Personas indexed in `.prompt-os/personas/INDEX.md`

---

**JIT-001 Complete** | Referenced in PERSONA-GENERATOR.md | Use with JIT-002, JIT-003, JIT-004
