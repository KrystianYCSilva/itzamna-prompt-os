# Quickstart Guide: Auto-Increment Protocol

**Spec**: `002-auto-increment`  
**Version**: 1.0.0  
**Created**: 2026-02-03

---

## Overview

The Auto-Increment Protocol enables PromptOS to learn and evolve by:
- **Detecting gaps** when users request topics without existing skills
- **Learning from rejections** to improve quality over time
- **Suggesting improvements** proactively based on patterns
- **Tracking evolution** with periodic reports

This is a **prompt-based protocol** - AI agents read instructions from `.prompt-os/core/AUTO-INCREMENT.md` and follow them. No code execution required.

---

## For AI Agents

### Quick Reference

**When to Apply Each Protocol**:

| Situation | Protocol | Action |
|-----------|----------|--------|
| User requests unknown topic | Gap Detection | Check INDEX.md → Inform user → Log to `memory/{agente}-memory.md` |
| Human rejects artifact | Rejection Learning | Ask reason → Categorize → Log → Apply patterns |
| Session starts | Proactive Suggestions | Check for gaps ≥2 → Suggest creation |
| User requests report | Evolution Reports | Aggregate all agent memories → Generate report |

### Protocol Entry Points

**1. Gap Detection** (Automatic)
```
Trigger: User request for topic

Checklist:
[ ] Extract topic from user request (use INPUT-CLASSIFIER)
[ ] Check .prompt-os/skills/INDEX.md for existing skill
[ ] Use JIT-PROTOCOL to search (fuzzy matching)
[ ] IF NOT FOUND:
    [ ] Inform user with 3 options (create/proceed/defer)
    [ ] Log to memory/{agente}-memory.md under "## Gaps Detectados"
    [ ] Check if gap count >= 2 → Suggest creating
```

**Example Flow**:
```
User: "Help me configure Kafka"
Agent: 
  1. Search INDEX.md for "kafka" → NOT FOUND
  2. Say: "I didn't find a skill for 'kafka'. Options: [create now/proceed without/defer]"
  3. Log: "2026-02-03 | Help me configure Kafka | kafka-basics | pending"
  4. Check history: Is this 2nd+ time? → If yes, recommend creating
```

**2. Rejection Learning** (Automatic)
```
Trigger: HUMAN-GATE returns "reject"

Checklist:
[ ] Check if reason provided
[ ] IF NOT: Ask "Could you tell me why you rejected this?"
[ ] Categorize reason (examples/specificity/clarity/completeness/relevance/other)
[ ] Derive learned action (e.g., "Test all examples")
[ ] Log to memory/{agente}-memory.md under "## Log de Rejeicoes"
[ ] Calculate patterns: Any category > 30%?
[ ] IF YES: Apply proactively in next generation
```

**Example Flow**:
```
User: [rejects skill] "Examples don't work"
Agent:
  1. Categorize: "examples" (keyword: "don't work")
  2. Learned action: "Test Kafka commands before showing"
  3. Log: "2026-02-03 | skill | kafka-basics | Examples don't work | examples | Test commands"
  4. Check: 4/10 rejections are "examples" (40% > 30%) → PATTERN
  5. Next generation: "I've validated all examples carefully (40% of feedback concerned examples)"
```

**3. Proactive Suggestions** (On Session Start or User Request)
```
Trigger: Session start OR user asks "What should I improve?"

Checklist:
[ ] Read memory/{agente}-memory.md
[ ] Count gaps per suggested_skill_name (status pending/deferred)
[ ] Identify gaps with count >= 2
[ ] Check skill quality scores (identify avg < 60)
[ ] Check skill ages (identify > 2 years)
[ ] Prioritize suggestions (gaps × 10, quality × 2, age × 5)
[ ] Present top 3 suggestions to user
[ ] Await user decision
```

**Example Flow**:
```
Session starts:
Agent:
  1. Read gaps: "kafka-basics" appears 3 times
  2. Priority: 3 × 10 = 30
  3. Say: "I noticed you've asked about Kafka 3 times. Would you like me to create a skill 'kafka-basics'?"
  4. User: "Yes" → Initiate skill generation → HUMAN-GATE
```

**4. Evolution Reports** (On User Request)
```
Trigger: User says "Generate evolution report" or "Show system stats"

Checklist:
[ ] Discover all agent memory files: memory/*.md (exclude root)
[ ] Read gaps from all agents → Aggregate
[ ] Read rejections from all agents → Aggregate
[ ] Read global stats from root MEMORY.md
[ ] Calculate metrics (skills created/updated, approval rate, gaps, etc.)
[ ] Identify top 3 unresolved gaps
[ ] Calculate rejection patterns (% per category)
[ ] Generate suggested actions (prioritized)
[ ] Format markdown report
[ ] Present to user
```

**Example Flow**:
```
User: "Generate evolution report for January 2026"
Agent:
  1. Read memory/opencode-memory.md, memory/itzamna-memory.md, etc.
  2. Aggregate: 12 gaps total, 5 resolved
  3. Top gaps: kafka-basics (3×), argocd-deploy (2×)
  4. Rejections: 40% examples, 25% clarity
  5. Format report (see template below)
  6. Present + offer actions
```

### Memory File Structure

**Agent-Specific Memory**: `memory/{agente}-memory.md`

```markdown
# Memory for {Agente Name}

## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-03 | "Help me configure Kafka" | kafka-basics | pending |
| 2026-02-01 | "Use Redis for caching" | redis-cache | created |

## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-03 | skill | kafka-basics | "Examples don't work" | examples | Test commands |
| 2026-02-01 | skill | redis-cache | "Too generic" | specificity | Add use cases |
```

**Global Statistics**: `MEMORY.md` (root)

```markdown
# PromptOS Memory

## Global Statistics

| Metric | Value |
|--------|-------|
| Total Skills | 42 |
| Approval Rate | 87.5% |
| Skills Created (Jan 2026) | 5 |
| Skills Updated (Jan 2026) | 3 |
```

### Key Rules for Agents

**DO**:
- ✅ Always check for gaps before proceeding with unknown topics
- ✅ Ask for rejection reasons politely ("helps me improve")
- ✅ Log ALL gaps and rejections (complete history is valuable)
- ✅ Check patterns regularly (every generation)
- ✅ Suggest proactively when gaps ≥2 or quality <60
- ✅ Aggregate across ALL agent memories for reports

**DON'T**:
- ❌ NEVER auto-create or auto-modify skills without Human Gate
- ❌ Don't log vague topics (ask for clarification first)
- ❌ Don't spam suggestions (7-day cooldown on deferred items)
- ❌ Don't block workflow waiting for rejection reasons (timeout 30s)
- ❌ Don't skip skill search (use JIT-PROTOCOL before declaring gap)

---

## For Humans

### How to Use the Auto-Increment Features

**1. When You Ask About a New Topic**

```
You: "Help me set up Kafka"

Agent: "I didn't find a skill for 'kafka' in the system.

Options:
1. I can create a skill for this topic now
2. I can help without a specific skill (quality may vary)
3. You can indicate where to find information

What do you prefer?"

Your Options:
- Type "1" or "create now" → Agent generates skill, you review at Human Gate
- Type "2" or "proceed" → Agent helps best effort, logs gap for later
- Type "3" or provide link/doc → Agent uses your resource
```

**Why this helps**: System learns what knowledge is missing and can create reusable skills.

**2. When You Reject an Artifact**

```
Agent: [shows generated skill at Human Gate]

You: [reject]

Agent: "Could you tell me why you rejected this? (helps me improve)"

Your Options:
- Provide specific reason: "Examples don't work correctly"
- Skip: Just press Enter (agent logs "No reason provided")
```

**Why this helps**: System learns from your feedback and improves future generations. If 40% of rejections mention examples, the agent will focus extra attention on examples quality.

**3. Request System Evolution Reports**

```
You: "Generate evolution report"
OR: "Show system stats"
OR: "How is the system evolving?"

Agent: [shows report with metrics, patterns, suggestions]
```

**Report includes**:
- Skills created/updated this period
- Approval rate
- Most frequently requested topics (gaps)
- Rejection patterns (what needs improvement)
- Suggested actions (prioritized improvements)

**When to request**:
- Monthly reviews
- After completing a project phase
- When curious about system growth

**4. Respond to Proactive Suggestions**

```
Agent: "I noticed you've asked about Kafka 3 times. 
Would you like me to create a skill 'kafka-basics'?"

Your Options:
- "Yes" → Agent creates skill, you review
- "Not now" → Deferred for 7 days
- "No" / "Reject" → Won't suggest again
```

**Why proactive**: Agent learns what you need and suggests solutions before you ask again.

---

## Memory Architecture

### Distributed vs. Global

**Key Concept**: Each agent maintains its own memory file to prevent write conflicts.

```
memory/
├── opencode-memory.md     # OpenCode agent's session logs
├── itzamna-memory.md       # ITZAMNA agent's session logs
├── speckit-memory.md       # SpecKit agent's session logs
└── ...

MEMORY.md (root)            # Global statistics (shared)
```

**Why Distributed**:
- **No concurrent write conflicts**: Each agent writes to its own file
- **Session isolation**: Agent A doesn't interfere with Agent B
- **Independent learning**: Each agent learns from its own interactions

**When Aggregated**:
- **Evolution reports**: Read ALL agent files, aggregate patterns
- **Cross-agent insights**: "Kafka requested 3× across 2 agents"

### How Agents Use Memory

| Operation | Location | When |
|-----------|----------|------|
| Log gap | `memory/{agente}-memory.md` | After gap detected |
| Log rejection | `memory/{agente}-memory.md` | After Human Gate rejection |
| Check patterns | Own memory only | Before each generation |
| Generate report | ALL agent memories | When user requests report |
| Update global stats | `MEMORY.md` (root) | Manually or via reports |

---

## Memory Management

### When to Archive Old Data

**Symptoms that memory is too large**:
- Agent takes >1 second to read memory file
- Memory file exceeds 10,000 entries or 1MB
- Reports take >5 seconds to generate

**How to Archive** (Manual Process):

```bash
# 1. Create archive directory
mkdir -p memory/archive/

# 2. Move old entries (keep last 3 months)
# Example: Archive 2025 data in Jan 2026
cp memory/opencode-memory.md memory/archive/opencode-memory-2025.md

# 3. Edit memory/opencode-memory.md
# - Keep only entries from last 3 months
# - Delete older rows from tables
# - Keep section headers

# 4. Document archive
echo "Archived 2025 data on 2026-02-03" >> memory/archive/README.md
```

**Archival Policy** (Recommended):
- Keep last **3 months** in active memory
- Archive older data **quarterly**
- Never auto-delete (manual only)

**Note**: Future versions may include automated archival tools.

---

## Testing the Protocol

### Acceptance Scenarios (For Validation)

**Test 1: Gap Detection**
```
1. Request help with topic that has no skill (e.g., "Kafka")
2. Verify: Agent says "No skill found for 'kafka'"
3. Verify: Agent presents 3 options
4. Choose "proceed without"
5. Verify: Gap logged in memory/{agente}-memory.md
6. Request same topic again
7. Verify: Agent mentions "2nd time this topic was requested"
```

**Test 2: Rejection Learning**
```
1. Reject an artifact with reason "Examples are wrong"
2. Verify: Agent logs rejection with category "examples"
3. Reject 3 more artifacts with similar reasons (40% "examples")
4. Generate new artifact
5. Verify: Agent mentions "I've noticed examples are a concern"
```

**Test 3: Proactive Suggestions**
```
1. Log 2 gaps for "kafka-basics" (request it twice)
2. Start new session
3. Verify: Agent suggests "Create skill for 'kafka-basics'?"
4. Accept suggestion
5. Verify: Skill generation workflow starts
```

**Test 4: Evolution Report**
```
1. Use system for a week (create skills, log gaps, reject some artifacts)
2. Request "Generate evolution report"
3. Verify report includes:
   - Skills created count
   - Approval rate
   - Top 3 gaps
   - Rejection patterns
   - Suggested actions
4. Verify report completes in <10 seconds
```

---

## Troubleshooting

### Common Issues

**Issue 1: Agent doesn't detect gap**

```
Symptom: Agent proceeds without offering to create skill

Possible Causes:
- Skill exists but agent didn't search (check INDEX.md)
- JIT-PROTOCOL matched skill with different name
- Topic too vague (agent couldn't extract clear topic)

Solution:
- Manually tell agent: "This topic doesn't have a skill"
- Check: Does skill exist in .prompt-os/skills/?
- If exists, it's correct behavior (no gap)
```

**Issue 2: Rejection not logged**

```
Symptom: Rejected artifact, but not in memory log

Possible Causes:
- Agent memory file doesn't exist yet (first run)
- Write permission issue on memory/ directory
- Agent crashed before writing

Solution:
- Check: Does memory/{agente}-memory.md exist?
- Manually create with template if needed
- Retry rejection, verify log entry appears
```

**Issue 3: Evolution report empty**

```
Symptom: Report says "No data available"

Possible Causes:
- No agent memory files exist (new system)
- Period filter excludes all data (e.g., "January" but data is February)
- Memory files corrupted (malformed tables)

Solution:
- Check: Run `ls memory/*.md` to list agent files
- Try: Request report for "All time" (no period filter)
- Validate: Open memory files, check table formatting
```

**Issue 4: Patterns not applied**

```
Symptom: 40% rejections are "examples", but agent doesn't mention it

Possible Causes:
- Pattern detection not run (agent didn't check before generation)
- Threshold not met (need 30%, have 29%)
- Agent memory not read (reading wrong file)

Solution:
- Verify: Count rejections manually, confirm percentage
- Remind agent: "Check rejection patterns before generating"
- Check: Is agent reading correct memory/{agente}-memory.md?
```

---

## Examples

### Example 1: Complete Gap Detection Flow

```
User: "Help me deploy with ArgoCD"

Agent (thinking):
  1. Extract topic: "argocd"
  2. Check INDEX.md: No "argocd" skill found
  3. Check JIT search: No similar skills
  4. GAP DETECTED

Agent: "I didn't find a skill for 'argocd' in the system.

Options:
1. I can create a skill for this topic now
2. I can help without a specific skill (quality may vary)
3. You can indicate where to find information

What do you prefer?"

User: "proceed without"

Agent (thinking):
  5. Log gap: "2026-02-03 | Help me deploy with ArgoCD | argocd-deploy | deferred"
  6. Check history: First time (count=1), don't suggest yet

Agent: "Understood. I'll help you with ArgoCD deployment based on general knowledge. 
Note: I've logged this as a potential skill for the future."

[Agent proceeds to help]

---

[One week later]

User: "Can you show me ArgoCD best practices?"

Agent (thinking):
  1. Extract topic: "argocd"
  2. Check INDEX.md: Still no skill
  3. GAP DETECTED
  4. Check history: 2nd occurrence!

Agent: "I didn't find a skill for 'argocd'.

Note: This is the 2nd time you've asked about ArgoCD.
Would you like me to create a skill 'argocd-deploy'? 
This would help with future ArgoCD questions.

[Yes, create skill] [Not now] [Never ask about this]"

User: "Yes, create skill"

Agent: "Great! Let me generate an ArgoCD deployment skill for you."

[Skill generation workflow starts → SELF-CRITIQUE → HUMAN-GATE]
```

### Example 2: Rejection Pattern Learning

```
Session 1:
Agent: [generates kafka-basics.md]
User: [rejects] "Examples have syntax errors"
Agent: Logged → Category: examples

Session 2:
Agent: [generates redis-cache.md]
User: [rejects] "Code examples don't run"
Agent: Logged → Category: examples (2/2 = 100%)

Session 3:
Agent: [generates docker-guide.md]
User: [rejects] "Needs clearer structure"
Agent: Logged → Category: clarity (2/3 = 67% examples, 33% clarity)

Session 4:
Agent: [generates graphql-api.md]
User: [rejects] "Examples are incomplete"
Agent: Logged → Category: examples (3/4 = 75%)

Session 5 (Next generation):
Agent: "I'm now generating a skill for 'postgres-backup'.

Note: I've noticed that 75% of recent rejections concerned examples.
For this skill, I've:
- Tested all code examples
- Verified commands work
- Added expected outputs

Let me know if this addresses your concerns."

[Generates skill with extra attention to examples]
User: [approves] ✅
```

### Example 3: Evolution Report

```
User: "Generate evolution report for January 2026"

Agent: Generating report...
  1. Reading memory/opencode-memory.md... (5 gaps, 3 rejections)
  2. Reading memory/itzamna-memory.md... (7 gaps, 2 rejections)
  3. Reading MEMORY.md (global stats)
  4. Aggregating data...
  5. Calculating patterns...

---

## Relatorio de Evolucao do PromptOS

### Periodo: Janeiro 2026

### Resumo
| Metrica | Valor |
|---------|-------|
| Skills criadas | 5 |
| Skills atualizadas | 2 |
| Gaps detectados | 12 |
| Gaps resolvidos | 5 |
| Taxa de aprovacao | 83.3% |

### Top 3 Gaps Mais Frequentes
1. kafka-basics - 3 occurrences
2. argocd-deploy - 2 occurrences
3. terraform-modules - 2 occurrences

### Padroes de Rejeicao
- Examples: 60% das rejeicoes (3 occurrences)
- Clarity: 20% das rejeicoes (1 occurrence)
- Other: 20% das rejeicoes (1 occurrence)

### Sugestoes de Acao
1. Improve examples quality in all skills - 60% of rejections
2. Create skill for 'kafka-basics' - requested 3 times
3. Create skill for 'argocd-deploy' - requested 2 times

---
*Gerado automaticamente pelo PromptOS*
*Periodo: Janeiro 2026*
*Gerado em: 2026-02-03 14:30:00*

---

What would you like to do?
- Create skill for 'kafka-basics'? [Yes/No]
- Review rejection patterns in detail? [Yes/No]
- Export report to file? [Yes/No]
- Continue working [Default]
```

---

## Best Practices

### For AI Agents

1. **Be Transparent**: Always tell users what you're doing
   - "I'm logging this gap for future reference"
   - "I've noticed examples are a common concern"

2. **Ask, Don't Assume**: Offer options, don't impose
   - "Would you like me to create a skill?" (not "I'll create a skill")

3. **Learn Continuously**: Check patterns before every generation
   - Read rejection logs before creating new artifact
   - Apply learned corrections proactively

4. **Respect User Time**: Don't block workflows
   - 30-second timeout on rejection reasons
   - Cooldown periods on suggestions (7 days)

5. **Aggregate Wisely**: Cross-agent data only for reports
   - Don't read other agents' memory during normal operations
   - Only aggregate when generating evolution reports

### For Humans

1. **Provide Feedback**: Help the system learn
   - When rejecting, briefly explain why ("Examples don't work")
   - Your feedback improves future generations

2. **Review Reports**: Check evolution periodically
   - Monthly reports show what's missing in knowledge base
   - Suggested actions are prioritized by impact

3. **Accept Suggestions**: Trust the patterns
   - If agent suggests creating skill (gap appeared 3×), it's useful
   - If agent mentions focusing on examples (40% rejections), it learned

4. **Archive Regularly**: Keep memory manageable
   - Quarterly archival of old data (>3 months)
   - Prevents slow performance

---

## Related Documentation

- **Specification**: `specs/002-auto-increment/spec.md` - Full requirements and user stories
- **Data Model**: `specs/002-auto-increment/data-model.md` - Entity definitions
- **Contracts**: `specs/002-auto-increment/contracts/*.md` - Protocol workflows
- **Implementation**: `.prompt-os/core/AUTO-INCREMENT.md` - Agent instructions
- **Research**: `specs/002-auto-increment/research.md` - Implementation validation

---

## Support

**Need Help?**

- Check troubleshooting section above
- Review acceptance scenarios for expected behavior
- Read protocol contracts for detailed workflows
- Consult `.prompt-os/core/AUTO-INCREMENT.md` for agent instructions

**Found a Bug?**

- Check if memory files exist and are formatted correctly
- Verify agent is reading correct memory file (`memory/{agente}-memory.md`)
- Review recent changes to AUTO-INCREMENT.md protocol

---

**Version**: 1.0.0  
**Author**: Itzamna PromptOS  
**Status**: Complete  
**Last Updated**: 2026-02-03
