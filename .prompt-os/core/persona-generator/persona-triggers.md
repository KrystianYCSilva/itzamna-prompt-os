---
name: core-persona-generator-persona-triggers
description: "JIT-003: Persona Trigger Generation"
---

# JIT-003: Persona Trigger Generation

> **Trigger generation algorithm and conflict detection rules.**  
> Referenced from: `PERSONA-GENERATOR.md`, Phase 2 of workflow

---

## What Are Triggers?

Triggers are **activation phrases** that indicate when a persona should be activated or suggested.

```yaml
Example persona: "Senior Backend Engineer"
triggers:
  - "backend"              # Domain trigger
  - "microservices"        # Skill/specialization trigger
  - "api design"           # Specialization trigger
  - "kubernetes"           # Core skill trigger
```

**Purpose**: Enable context-aware persona activation without explicit user request

---

## Trigger Derivation Algorithm

**Input**: persona attributes (level, domains, core_skills, role)  
**Output**: 4-8 activation triggers (unordered list)

### Algorithm Steps

#### Step 1: Domain Triggers (Mandatory)

Add each domain from the `domains` array directly as a trigger.

```
Input: domains = ["backend", "devops"]
Output: triggers = ["backend", "devops"]

Rationale: Domain is primary activation criterion
Count: 1-2 triggers
```

#### Step 2: Skill Triggers (Top 3 core skills, max 3)

Take top 3 core skills, clean formatting (remove hyphens), add as triggers.

```
Input: core_skills = ["nodejs-api", "docker-basics", "kubernetes"]
Process:
  - "nodejs-api" → "nodejs api"
  - "docker-basics" → "docker"
  - "kubernetes" → "kubernetes" (no change)
Output: triggers += ["nodejs api", "docker", "kubernetes"]

Rationale: Specific technical skills activate specialized personas
Count: 2-3 triggers
```

#### Step 3: Role Trigger (Optional)

Add simplified role name in lowercase.

```
Input: role = "Senior Backend Engineer"
Process:
  - Extract role title: "backend engineer"
  - Lowercase: "backend engineer"
Output: triggers += ["backend engineer"]

Rationale: Role describes persona
Count: 0-1 triggers
```

#### Step 4: Specialization Triggers (Domain-specific, optional)

Add 2-3 specialization-specific triggers based on domain.

```
Domain: "backend"
Specialization triggers: ["api design", "microservices", "performance optimization"]

Domain: "devops"
Specialization triggers: ["ci/cd", "infrastructure", "automation"]

Domain: "security"
Specialization triggers: ["vulnerability assessment", "hardening", "compliance"]

Domain: "frontend"
Specialization triggers: ["accessibility", "responsive design", "component design"]

Domain: "data-science"
Specialization triggers: ["data analysis", "machine learning", "feature engineering"]

Domain: "mobile"
Specialization triggers: ["mobile performance", "ios", "android"]

Rationale: Context-specific triggers enable topic-based activation
Count: 2-3 triggers (select based on specialization hints from Phase 1)
```

#### Step 5: Deduplication (Remove exact matches)

Compare all triggers, remove case-insensitive duplicates.

```
Before: ["backend", "backend engineer", "api design", "backend", "nodejs api"]
After: ["backend", "backend engineer", "api design", "nodejs api"]

Rationale: Avoid redundancy
```

#### Step 6: Final Trigger List

Ensure trigger count is 4-8. Adjust if needed.

```
IF triggers.count < 4:
  Add more specialization triggers
  IF still < 4: Add level-based triggers
    level: "senior" → "senior developer"
    level: "principal" → "architect"

IF triggers.count > 8:
  Trim lowest-priority triggers (keep domain, skill, role)

Final count: 4-8 triggers
```

### Complete Example

```
Input Persona:
  level: "senior"
  domains: ["backend", "devops"]
  role: "Senior Backend Engineer"
  core_skills: ["nodejs-api", "docker-basics", "kubernetes"]
  specialization: "microservices"

Step 1 (Domain): ["backend", "devops"]
Step 2 (Skills): ["nodejs api", "docker", "kubernetes"]
Step 3 (Role): ["backend engineer"]
Step 4 (Specialization): ["microservices", "api design"]
Step 5 (Dedup): ["backend", "devops", "nodejs api", "docker", "kubernetes", "backend engineer", "microservices", "api design"]

Dedup check: No duplicates found

Step 6 (Final): 8 triggers (within range)

Output triggers:
  - "backend"
  - "devops"
  - "nodejs api"
  - "docker"
  - "kubernetes"
  - "backend engineer"
  - "microservices"
  - "api design"
```

---

## Conflict Detection (FR-011)

**Goal**: Prevent overlapping personas or identify specializations

**Algorithm**:

### Query Phase

```
When creating new persona:
  1. Load all existing persona files from `.prompt-os/personas/`
  2. For each existing persona:
     intersection = new_persona.triggers ∩ existing_persona.triggers
     IF intersection.count > 0:
       Flag as potential conflict
```

### Decision Logic

```
IF intersection found:
  IF intersection triggers in {domain triggers only}:
    → This is expected (same domain)
    → Check if specialization is different
    IF role or specialization is different:
      → Allowed (specialization case)
      Message: "Creating specialized variant of existing persona"
    ELSE:
      → Potential duplicate
      Message: "Duplicate persona detected. Suggest modifying existing."
      Offer: "Merge? [Yes] [No, create independent]"

  IF intersection includes {skill or role triggers}:
    → Likely duplicate
    Message: "Persona '{}' has overlapping triggers: {}"
    Offer: "Overwrite? [Yes] [No, cancel]"
```

### Examples

#### Case 1: Same Domain (Allowed Specialization)

```
Existing: "Backend Engineer"
  triggers: ["backend", "nodejs", "api design"]

New: "Backend Microservices Engineer"
  triggers: ["backend", "nodejs api", "microservices", "kubernetes"]

Intersection: ["backend", "nodejs"] (domain only)
Decision: Allowed, but warn user
Message: "Creating specialized variant of 'Backend Engineer' persona"
Action: Create new persona with different role/specialization
```

#### Case 2: Identical Role (Duplicate)

```
Existing: "Senior Backend Engineer"
  triggers: ["backend", "nodejs api", "docker", "kubernetes"]

New: "Senior Backend Engineer (attempt 2)"
  triggers: ["backend", "microservices", "nodejs api"]

Intersection: ["backend", "nodejs api"] (includes skill trigger)
Decision: Likely duplicate
Message: "Persona 'Senior Backend Engineer' already exists with similar triggers"
Action: Ask user to review existing persona or rename new one
```

#### Case 3: Different Domain (No Conflict)

```
Existing: "Backend Engineer"
  triggers: ["backend", "api design"]

New: "Frontend Developer"
  triggers: ["frontend", "react", "accessibility"]

Intersection: [] (empty)
Decision: No conflict
Action: Create new persona without warning
```

---

## Trigger Generation Rules by Level

### Junior Level Triggers

Emphasize learning and mentoring aspects:
```
Additional triggers:
  - "learning {domain}"
  - "junior {role}"
  - "mentoring" (looking for mentorship)
  
Example: "learning backend", "junior developer"
```

### Mid Level Triggers

Emphasize practical, pattern-based aspects:
```
Additional triggers:
  - "{pattern} implementation"
  - "best practices"
  - "{domain} patterns"
  
Example: "microservices pattern", "backend best practices"
```

### Senior Level Triggers

Emphasize strategic, architectural aspects:
```
Additional triggers:
  - "architecture {domain}"
  - "mentoring"
  - "technical leadership"
  
Example: "backend architecture", "technical leadership"
```

### Principal Level Triggers

Emphasize visionary, organizational aspects:
```
Additional triggers:
  - "{domain} strategy"
  - "architecture"
  - "technical vision"
  
Example: "backend strategy", "technical vision"
```

---

## Edge Cases

### Case 1: Single Skill Library

```
Scenario: Skill library has only 6 baseline skills (Java, Kotlin, C/C++, JavaScript, Python, Go)

Step 2 output: Fewer than 3 skills matched
Action: Reduce minimum skill triggers (allow 1-2)
Adjust final count formula: IF < 3 skills, allow fewer overall triggers

Example output: 4 triggers instead of 6
  - "backend"
  - "java"
  - "backend engineer"
  - "api design"
```

### Case 2: Fullstack Domain

```
Scenario: domain = ["frontend", "backend"]

Step 1 (Domain triggers): ["frontend", "backend"]
Step 4 (Specialization): 
  - Frontend triggers: ["accessibility", "responsive design"]
  - Backend triggers: ["api design", "microservices"]
  - Merge: ["accessibility", "api design", "responsive design", "microservices"]

Output: Combined triggers from both domains (8-10 total, trim if >8)
```

### Case 3: No Domain Inferred

```
Scenario: User input doesn't clearly indicate domain

Action: Ask user for domain clarification OR
  Use neutral triggers:
  - "{role}" (e.g., "software engineer")
  - "{level}" (e.g., "senior developer")
  - Specialization terms from description

Example: ["software engineer", "general developer", "api", "testing"]
```

---

## Trigger Examples by Persona Type

### Data Science Specialist

```
Profile: Senior Data Scientist
Domains: ["data-science"]
Core Skills: ["python-pandas", "scikit-learn", "jupyter"]

Generated triggers:
1. "data-science" (domain)
2. "data science" (domain alternate)
3. "python" (skill)
4. "scikit-learn" (skill)
5. "machine learning" (specialization)
6. "data analysis" (specialization)
7. "data scientist" (role)
8. "feature engineering" (specialization)
```

### Security Engineer

```
Profile: Mid Security Engineer
Domains: ["security"]
Core Skills: ["owasp-top-10", "auth-patterns", "ssl-tls"]

Generated triggers:
1. "security" (domain)
2. "owasp" (skill)
3. "authentication" (skill/spec)
4. "ssl" (skill)
5. "security engineer" (role)
6. "vulnerability" (specialization)
7. "hardening" (specialization)
```

### DevOps Engineer

```
Profile: Senior DevOps Engineer
Domains: ["devops"]
Core Skills: ["docker-basics", "kubernetes", "terraform"]

Generated triggers:
1. "devops" (domain)
2. "docker" (skill)
3. "kubernetes" (skill)
4. "terraform" (skill)
5. "devops engineer" (role)
6. "ci/cd" (specialization)
7. "infrastructure" (specialization)
8. "automation" (specialization)
```

---

## Implementation Checklist

- [ ] Collect domain(s) from persona
- [ ] Step 1: Add all domains to trigger list
- [ ] Step 2: Extract top 3 skills, clean formatting, add triggers
- [ ] Step 3: Simplify role to lowercase, add trigger
- [ ] Step 4: Select 2-3 domain-specific specialization triggers
- [ ] Step 5: Deduplicate trigger list (case-insensitive)
- [ ] Step 6: Count triggers; if < 4, add level triggers; if > 8, trim
- [ ] Conflict detection: Query existing personas, flag intersections
- [ ] Output: 4-8 unique, ordered triggers (alphabetically or by priority)

---

**JIT-003 Complete** | Used in Phase 4 (content generation) | Conflict detection in Phase 6
