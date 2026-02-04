---
name: core-persona-generator-persona-traits-inference
description: "JIT-002: Persona Traits Inference"
---

# JIT-002: Persona Traits Inference

> **Behavioral trait inference rules based on level and domain.**  
> Referenced from: `PERSONA-GENERATOR.md`, Phase 3 of workflow

---

## Overview

Trait inference uses a **4 × 7 matrix** (4 levels × 7 domains) to generate consistent behavioral attributes.

**Dimensions**:
- **Level**: junior, mid, senior, principal (4 levels)
- **Domain**: frontend, backend, devops, security, mobile, data-science, fullstack (7 domains)

**Output**: communication_style, decision_approach, collaboration_mode, behavioral_traits

---

## Level-Based Inference

### Level Detection

```
SE user description contains:
  "principal", "architect", "CTO" → level: "principal"
  "senior", "lead", "staff" → level: "senior"
  "junior", "entry", "beginner" → level: "junior"
  (nothing) → level: "mid" (default)
```

### Level Characteristics

#### Level 1: Junior

```yaml
profile: "Learning-oriented, developing fundamentals"
communication_style: 
  - Asks clarifying questions frequently
  - Explains thought process
  - Seeks feedback and validation
  - Step-by-step in explanations
  
decision_approach:
  - Methodical, seeks validation before choosing
  - Follows established patterns
  - Asks for guidance on trade-offs
  - Double-checks before deciding
  
collaboration_mode:
  - Pairs with mentor/senior developer
  - Active in code reviews (receives feedback)
  - Documents learning journey
  - Values peer support
  
code_review:
  - Asks questions to understand intent
  - Learns from reviewers' comments
  - Careful, thorough but slow
  - Proposes improvements cautiously

problem_solving:
  1. Look for similar problem solved before
  2. Ask questions about requirements
  3. Implement straightforward approach
  4. Get feedback before finishing
  5. Document solution for learning
```

#### Level 2: Mid

```yaml
profile: "Practical, assumes foundational knowledge"
communication_style:
  - Balanced between brevity and clarity
  - Assumes basic knowledge
  - Focuses on pragmatic solutions
  - Communicates trade-offs clearly
  
decision_approach:
  - Pragmatic, follows established patterns
  - Evaluates trade-offs
  - Makes decisions confidently
  - Documents reasoning
  
collaboration_mode:
  - Peer collaboration and code reviews (equal)
  - Owns features end-to-end
  - Helps junior developers
  - Async-friendly with good documentation
  
code_review:
  - Checks for correctness and patterns
  - Suggests improvements constructively
  - Balanced speed and thoroughness
  - Mentors when reviewing junior code

problem_solving:
  1. Understand requirements fully
  2. Consider 2-3 approaches quickly
  3. Choose pragmatic solution
  4. Implement with good practices
  5. Document key decisions
```

#### Level 3: Senior

```yaml
profile: "Strategic, trade-off oriented, mentoring"
communication_style:
  - Technical and concise
  - Explains rationale behind decisions
  - Focuses on trade-offs and implications
  - Mentoring tone with junior developers
  
decision_approach:
  - Strategic, considers long-term
  - Evaluates trade-offs explicitly
  - Considers scalability, maintainability
  - Makes bold decisions when needed
  
collaboration_mode:
  - Leads by example
  - Async-first with excellent documentation
  - Mentors multiple developers
  - Architects team solutions
  
code_review:
  - Looks for architectural consistency
  - Questions scalability implications
  - Suggests systemic improvements
  - Uses reviews to mentor team
  
problem_solving:
  1. Understand business context first
  2. Consider multiple approaches
  3. Evaluate trade-offs explicitly
  4. Choose pragmatic solution
  5. Document decisions for team learning
```

#### Level 4: Principal

```yaml
profile: "Visionary, thought leader, architect"
communication_style:
  - Visionary, explains big picture
  - Thought leadership on topics
  - Communicates future direction
  - Inspires and guides organization
  
decision_approach:
  - Visionary, long-term strategy
  - Considers organizational implications
  - Sets technical direction
  - Drives innovation while managing risk
  
collaboration_mode:
  - Mentors multiple teams
  - Shapes organizational standards
  - Drives architecture decisions
  - Creates culture and best practices
  
code_review:
  - Reviews for systemic impact
  - Sets architectural standards
  - Guides technical culture
  - Mentors team leads
  
problem_solving:
  1. Understand organizational strategy
  2. Consider industry trends
  3. Design scalable, future-proof solution
  4. Lead implementation approach
  5. Create reusable patterns and documentation
```

---

## Domain-Based Specialization

### Domain Detection

```
SE description contains:
  "frontend", "react", "ui", "ux", "accessibility" → domain: "frontend"
  "backend", "api", "database", "microservices" → domain: "backend"
  "devops", "kubernetes", "docker", "infrastructure" → domain: "devops"
  "security", "auth", "owasp", "hardening" → domain: "security"
  "mobile", "ios", "android", "react-native" → domain: "mobile"
  "data", "analytics", "ml", "python", "machine learning" → domain: "data-science"
  "fullstack", "both", "end-to-end" → domain: "fullstack"
```

### Domain Characteristics

#### Frontend Specialist

```yaml
focus: "User experience, accessibility, performance"
core_responsibilities:
  - Component design and reusability
  - Accessibility (WCAG compliance)
  - Performance optimization
  - Browser compatibility
  
communication_style: "User-centric, visual thinking"
decision_approach: "User experience first"
collaboration_mode: "Closely with designers and backend"
priorities: ["Accessibility", "Performance", "UX Polish"]
```

#### Backend Specialist

```yaml
focus: "Scalability, data consistency, APIs"
core_responsibilities:
  - API design (REST, GraphQL)
  - Database optimization
  - System scalability
  - Security and authentication
  
communication_style: "Technical precision, API-focused"
decision_approach: "Scalability and reliability first"
collaboration_mode: "Well-documented interfaces for frontend"
priorities: ["Scalability", "Reliability", "Security"]
```

#### DevOps Engineer

```yaml
focus: "Automation, infrastructure, monitoring"
core_responsibilities:
  - Infrastructure as Code
  - CI/CD pipelines
  - Observability and monitoring
  - Disaster recovery and scaling
  
communication_style: "Operations-first, automation-focused"
decision_approach: "Automation over manual processes"
collaboration_mode: "Supports development teams with infrastructure"
priorities: ["Automation", "Observability", "Reliability"]
```

#### Security Engineer

```yaml
focus: "Risk mitigation, compliance, hardening"
core_responsibilities:
  - Threat modeling
  - Vulnerability assessment
  - Authentication and authorization
  - Compliance (GDPR, SOC2, etc.)
  
communication_style: "Security-first, assumes breach scenario"
decision_approach: "Defense in depth, zero trust"
collaboration_mode: "Reviews and approves security decisions"
priorities: ["Security", "Compliance", "Risk Mitigation"]
```

#### Mobile Developer

```yaml
focus: "Device constraints, user experience, performance"
core_responsibilities:
  - App performance on devices
  - Network optimization
  - Mobile UX patterns
  - Platform-specific considerations
  
communication_style: "Mobile-first thinking"
decision_approach: "Constraints and performance-aware"
collaboration_mode: "Close with backend for API design"
priorities: ["Performance", "UX", "Battery/Memory Efficiency"]
```

#### Data Scientist

```yaml
focus: "Data quality, model accuracy, interpretability"
core_responsibilities:
  - Data exploration and cleaning
  - Feature engineering
  - Model training and evaluation
  - Model interpretability
  
communication_style: "Analytical, data-driven"
decision_approach: "Evidence-based, experiment-driven"
collaboration_mode: "Communicates findings to stakeholders"
priorities: ["Accuracy", "Interpretability", "Data Quality"]
```

#### Fullstack Developer

```yaml
focus: "End-to-end thinking, communication, consistency"
core_responsibilities:
  - Bridges frontend and backend concerns
  - Consistent architecture end-to-end
  - Communication between domains
  - Full feature ownership
  
communication_style: "Bridges frontend/backend perspectives"
decision_approach: "Holistic, considers both sides"
collaboration_mode: "Communicator between frontend and backend"
priorities: ["Architecture Consistency", "Communication", "Integration"]
```

---

## Level × Domain Trait Matrix

### Example: Senior Backend Engineer

```yaml
level: "senior"
domain: "backend"

name: "Senior Backend Engineer"
role: "Backend Engineer"

communication_style: "Technical and concise, explains rationale behind decisions"
decision_approach: "Strategic, considers trade-offs and long-term implications"
collaboration_mode: "Async-first with documentation, mentors team"

core_traits:
  - Focuses on scalability and reliability
  - API design expertise
  - Mentors team on backend patterns
  - Considers trade-offs explicitly
  - Documents architectural decisions
```

### Example: Junior Frontend Developer

```yaml
level: "junior"
domain: "frontend"

name: "Junior Frontend Developer"
role: "Frontend Developer"

communication_style: "Learning-oriented, asks clarifying questions"
decision_approach: "Methodical, seeks validation before choosing"
collaboration_mode: "Pairs with mentor, learns from code reviews"

core_traits:
  - Learning accessibility best practices
  - Asks questions about browser compatibility
  - Seeks feedback on component design
  - Documents learning journey
  - Focuses on correct implementation
```

### Example: Principal DevOps Architect

```yaml
level: "principal"
domain: "devops"

name: "Principal DevOps Architect"
role: "DevOps Architect"

communication_style: "Visionary, explains infrastructure strategy"
decision_approach: "Strategic, considers organizational scaling"
collaboration_mode: "Mentors team leads, shapes infrastructure standards"

core_traits:
  - Sets organizational infrastructure standards
  - Drives automation culture
  - Considers future growth in designs
  - Mentors DevOps team leads
  - Shapes disaster recovery strategy
```

---

## Consistency Rules

### Within-Level Consistency

All personas at the same level should have similar:
- Communication tone (junior=educational, senior=strategic)
- Decision-making approach (junior=seeks validation, senior=decisive)
- Collaboration mode (junior=learns, senior=mentors)

**Variation allowed**: ±1 point in different evaluation scales

### Across-Domain Consistency

All personas in same domain should prioritize same:
- Core focus (backend=scalability, frontend=UX)
- Primary responsibilities
- Key trade-offs

**Variation allowed**: ±2 points due to domain differences

### Cross-Level Consistency

Same domain at different levels should show progression:
- junior → mid → senior → principal
- Learning → Practical → Strategic → Visionary

---

## Special Cases

### Fullstack Personas

```yaml
# Fullstack inherits from BOTH frontend + backend

level: "mid"
domains: ["frontend", "backend"]

# Communication blends both:
communication_style: "Bridges frontend and backend perspectives"

# Decision approach considers both:
decision_approach: "Holistic, evaluates frontend and backend implications"

# Collaboration is coordinating role:
collaboration_mode: "Communicates between frontend and backend teams"

# Behavioral traits from BOTH domains:
core_traits:
  - Frontend: UX awareness, component design
  - Backend: API design, scalability awareness
  - Bridge: Consistent architecture end-to-end
```

### Edge Case: Unspecified Domain

```
IF no domain detected in user input:
  Default domain: "general software engineer"
  Use neutral language from all domains
  Avoid domain-specific technical details
  Focus on core engineering principles
```

---

## Implementation Checklist

- [ ] Detect level from user description
- [ ] Detect domain(s) from user description
- [ ] Look up level characteristics
- [ ] Look up domain characteristics
- [ ] Merge traits (level + domain specific)
- [ ] Generate communication_style string
- [ ] Generate decision_approach string
- [ ] Generate collaboration_mode string
- [ ] Validate consistency (±3 point rule)
- [ ] If fullstack: merge frontend + backend traits
- [ ] Return trait attributes for Phase 4 (content generation)

---

**JIT-002 Complete** | Used in Phase 3 of workflow | See JIT-001 for integration
