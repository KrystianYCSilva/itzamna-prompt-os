# Memory Management - Best Practices

## Source
CoALA Paper: https://arxiv.org/abs/2309.02427  
Itzamna PromptOS Architecture  
Accessed: 2026-02-11

## Summary
Best practices for managing 4-layer memory architecture (Working, Project Context, Episodic, Semantic) in AI coding agents. Based on CoALA cognitive architecture research.

## Fundamental Principles

### 1. Memory = State Management
Memory in AI agents is equivalent to state management:
- **Working Memory**: Current session state (volatile)
- **Project Context**: Project-specific state (JIT-loaded)
- **Episodic Memory**: Historical state (persistent)
- **Semantic Memory**: General knowledge (static)

**Source**: CoALA paper - Memory Systems

### 2. Layered Access Pattern
Agents should access memory in order:
```
Task arrives
    ↓
K1: Check Working Memory (in context window)
    ↓
K2: Load Project Context (.context/)
    ↓
K3: Read Episodic Memory (MEMORY.md)
    ↓
K3: Consult Semantic Memory (templates)
```

### 3. Write-Through Strategy
Memory updates should be immediate and persistent:
```
Agent learns something new
    ↓
Update Working Memory (context window)
    ↓
Append to Episodic Memory (MEMORY.md)
    ↓
Update Project Context (.context/) if structural
```

---

## 4-Layer Memory Architecture

### Layer 1: Working Memory (Volatile)

**Storage**: Agent's current context window  
**Lifespan**: Single session  
**Access**: O(1) - immediate  
**Size**: ~8K-200K tokens (model dependent)

**Best Practices**:
- Keep working memory clean (no duplication)
- Summarize long conversations periodically
- Offload to episodic memory when context fills

**Example**:
```
Current task: Implement user authentication
Working memory contains:
- Requirements (from user)
- Current file being edited
- Recent decisions in this session
```

### Layer 2: Project Context (JIT-Loaded)

**Storage**: `.context/` directory  
**Lifespan**: Project lifetime  
**Access**: O(1) - JIT via YAML frontmatter  
**Size**: Lean (3 files) or Enterprise (10+ files)

**Best Practices**:
- Use YAML frontmatter for selective loading
- Keep files focused (single responsibility)
- Update when project structure changes

**Lean Structure (3 files)**:
```
.context/
  project.md      # Project overview
  tech.md         # Tech stack
  rules.md        # Project-specific rules
```

**Enterprise Structure (10+ files)**:
```
.context/
  _meta/
    key-decisions.md
    project-overview.md
    tech-stack.md
  standards/
    architectural-rules.md
    code-quality.md
    testing-strategy.md
  patterns/
    architecture.md
  knowledge/
    domain-concepts.md
  workflows/
    deployment.md
```

### Layer 3: Episodic Memory (Persistent)

**Storage**: `MEMORY.md`  
**Lifespan**: Permanent (across sessions)  
**Access**: O(n) - linear scan  
**Size**: Grows over time

**Best Practices**:
- Structure sessions chronologically
- Include context, actions, learnings, next steps
- Prune old sessions periodically (archive)
- Use consistent format

**Format**:
```yaml
---
description: |
  Episodic memory for AI agents (CoALA layer).
  Use when: storing learnings, retrieving past decisions.
---

# Memory - [Project Name]

## Recent Sessions

### 2026-02-11 - Implemented User Auth
**Context:** Building authentication system
**Actions:** Created User model, implemented JWT tokens
**Learnings:** bcrypt is better than SHA-256 for passwords
**Next:** Add refresh tokens, implement logout

### 2026-02-10 - Database Schema
**Context:** Designing initial schema
**Actions:** Created users, posts, comments tables
**Learnings:** Use UUIDs for IDs to avoid enumeration attacks
**Next:** Add indexes for performance

## Key Learnings

- Always hash passwords with bcrypt (12+ rounds)
- Use UUIDs for public-facing IDs
- JWT expiry should be 15 minutes max
```

### Layer 4: Semantic Memory (Static)

**Storage**: Templates + knowledge base  
**Lifespan**: Version-controlled  
**Access**: O(1) - direct reference  
**Size**: Fixed per version

**Best Practices**:
- Keep semantic memory version-controlled
- Update via Itzamna upgrades
- Don't modify templates directly (override in project)

**Contents**:
- `kernel.md` - Cognitive kernel (K1/K2/K3)
- `CONSTITUTION.md` - T0/T1/T2 rules
- `templates/` - Skill, agent, context templates
- `knowledge/` - Best practices, research

---

## Memory Operations

### 1. Read (Retrieval)

**K1 (Reflexive)**: Read from Working Memory
```
Agent checks current context window
→ O(1) access, ~100ms
```

**K2 (Deliberate)**: Load from Project Context
```
Agent checks .context/tech.md frontmatter
→ Matches "Use when: understanding tech stack"
→ JIT loads file
→ O(1) access, ~1-2s
```

**K3 (Deep)**: Scan Episodic Memory
```
Agent reads MEMORY.md
→ Scans recent sessions for similar problem
→ O(n) access, ~5-10s
```

### 2. Write (Storage)

**Immediate**: Update Working Memory
```
Agent learns: "User prefers functional components"
→ Add to working memory (context window)
```

**Session End**: Update Episodic Memory
```
Agent appends to MEMORY.md:
### 2026-02-11 - Component Refactor
**Context:** Refactoring to functional components
**Learnings:** User prefers hooks over classes
**Next:** Convert remaining class components
```

**Structural Change**: Update Project Context
```
Agent detects new architecture pattern
→ Updates .context/patterns/architecture.md
→ Commits change to git
```

### 3. Prune (Cleanup)

**Working Memory**: Summarize when near capacity
```
if context_usage > 80%:
    summarize_conversation()
    keep_last_n_messages(10)
```

**Episodic Memory**: Archive old sessions
```
# Every quarter, archive sessions older than 6 months
mv MEMORY.md MEMORY-2025-H1.md
create new MEMORY.md with recent sessions
```

**Project Context**: Remove obsolete files
```
# When migrating architecture
rm .context/patterns/old-architecture.md
add .context/patterns/new-architecture.md
```

---

## Memory Anti-Patterns

### ❌ Anti-Pattern 1: No Episodic Memory
```
# Agent starts every session from scratch
# Repeats same mistakes
# User has to re-explain context
```

**Fix**: Always update MEMORY.md at session end

### ❌ Anti-Pattern 2: Monolithic Context
```
# Single .context/everything.md file
# Loads entire context every time
# Wastes tokens
```

**Fix**: Split into focused files with YAML frontmatter

### ❌ Anti-Pattern 3: Stale Memory
```
# MEMORY.md has sessions from 2 years ago
# Agent confused by outdated decisions
# Contradictory learnings
```

**Fix**: Prune quarterly, archive old sessions

### ❌ Anti-Pattern 4: No Semantic Memory
```
# Agent doesn't have templates/patterns
# Reinvents wheel every time
# Inconsistent decisions
```

**Fix**: Maintain templates/ and knowledge/ directories

---

## Memory Commands

### Read Memory
```bash
/itzamna.memory read
```
Displays recent sessions + key learnings from MEMORY.md

### Update Memory
```bash
/itzamna.memory update "learned X about Y"
```
Appends new learning to MEMORY.md with timestamp

### Check Memory
```bash
/itzamna.memory check
```
Validates MEMORY.md format, checks for issues

---

## Related

- [context-structure.md](context-structure.md) - `.context/` organization
- [kernel-usage.md](kernel-usage.md) - K1/K2/K3 decision routing
- [token-optimization.md](token-optimization.md) - Token reduction strategies
- [../research/coala-paper-summary.md](../research/coala-paper-summary.md) - CoALA architecture

---

## References

1. CoALA: Cognitive Architectures for Language Agents (https://arxiv.org/abs/2309.02427)
2. Memory Systems in Cognitive Science (Stanford Encyclopedia)
3. Itzamna PromptOS Architecture (ADR-001)

---

**Best Practice** | Itzamna Knowledge Base | v1.0.0
