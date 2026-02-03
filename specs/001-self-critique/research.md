# Research: Self-Critique Protocol Enhancement

**Feature Branch**: `001-self-critique`  
**Date**: 2026-02-02  
**Phase**: 0 (Research)

---

## 1. Technical Context

### 1.1 Architecture Type

**Decision**: Prompt-based architecture (NOT executable code)

| Approach | Description | Selected |
|----------|-------------|----------|
| JavaScript module | Code that runs evaluation logic | ❌ |
| Prompt protocol | Markdown instructions AI follows | ✅ |
| Hybrid (code + prompts) | Both approaches combined | ❌ |

**Rationale**: PromptOS v2.0.0 is built on prompt-based architecture where AI agents READ Markdown files and FOLLOW instructions. This approach:
- Works with ANY AI agent (Claude, Cursor, Gemini, GPT, Codex, Qwen)
- Requires no runtime dependencies
- Is transparent and auditable (instructions are readable text)
- Aligns with existing protocol patterns in `.prompt-os/core/`

### 1.2 Existing Implementation Analysis

**Current file**: `.prompt-os/core/SELF-CRITIQUE.md` (390 lines)

| Section | Status | Enhancement Needed |
|---------|--------|-------------------|
| Why self-evaluate | ✅ Complete | None |
| When to apply | ✅ Complete | None |
| Phase 1: Quick check | ✅ Complete | Minor refinement |
| Phase 2: Quality dimensions | ✅ Complete | Add structured output |
| Phase 3: Calculate score | ✅ Complete | Add score band actions |
| Phase 4: Identify improvements | ✅ Complete | Add structured format |
| Type-specific checklists | ✅ Complete | Expand with more items |
| Transparency | ✅ Complete | Add Human Gate format |
| **Redundancy detection** | ❌ Missing | **NEW: Add section** |
| **Structured output** | ❌ Missing | **NEW: Add format** |

---

## 2. Technical Decisions

### 2.1 Quality Evaluation Method

**Decision**: Rule-based evaluation (AI follows checklist instructions)

| Option | Pros | Cons | Selected |
|--------|------|------|----------|
| Rule-based | Transparent, consistent, no dependencies | Limited semantic understanding | ✅ |
| ML-based | Better semantic evaluation | External API calls, latency, cost | ❌ |
| LLM self-reflection | Deep understanding | Recursive, expensive, unpredictable | ❌ |

**Rationale**: Rule-based evaluation is sufficient for initial version. The AI agent applies the checklist criteria and produces a score. This is deterministic, fast, and requires no external dependencies.

**Future**: Consider LLM-based semantic evaluation in v3.0 if rule-based proves insufficient.

### 2.2 Redundancy Detection Method

**Decision**: Keyword/structural matching using INDEX.md lookup

| Option | Pros | Cons | Selected |
|--------|------|------|----------|
| Vector embeddings | Semantic similarity | Requires vector DB (out of scope) | ❌ |
| Keyword matching | Simple, fast, no dependencies | May miss semantic overlap | ✅ |
| TF-IDF | Better than keywords | Requires computation | ❌ |

**Implementation**:
1. AI agent reads `skills/INDEX.md` to get list of existing skills
2. For each skill, compare: name, tags, domain, description keywords
3. Estimate similarity percentage based on overlap
4. Flag skills with >60% estimated overlap

**Rationale**: Vector DB is explicitly out of scope (spec: Out of Scope item 3). Keyword/structural matching is sufficient for detecting obvious redundancies. The AI agent's judgment fills gaps in automated matching.

### 2.3 Output Format

**Decision**: Structured YAML-like format embedded in protocol instructions

```yaml
# Self-Critique Result (example)
critique:
  score: 78
  band: "Good"
  
  dimensions:
    completeness: 20/25
    clarity: 22/25
    correctness: 18/25
    best_practices: 18/25
  
  strengths:
    - "Clear step-by-step instructions"
    - "Practical examples with context"
  
  weaknesses:
    - "Only 2 examples (recommended: 3+)"
    - "Missing error handling case"
  
  suggestions:
    - "Add example showing error handling"
    - "Include edge case for empty input"
    - "Add reference to official documentation"
  
  similar_skills:
    - name: "related-skill"
      similarity: 65%
      note: "Overlaps in domain X"
```

**Rationale**: YAML format is:
- Human-readable
- Easy for AI to generate
- Structured for Human Gate display
- Consistent with existing skill/persona formats

### 2.4 Human Gate Integration

**Decision**: Inline display in existing Human Gate protocol

| Option | Pros | Cons | Selected |
|--------|------|------|----------|
| Separate critique display | Clear separation | Extra step in workflow | ❌ |
| Inline in Human Gate | Single approval point | Slightly more complex display | ✅ |
| Score-only (details on demand) | Cleaner UI | May miss important context | ❌ |

**Implementation**: Modify HUMAN-GATE.md to include critique results section with:
- Score and band (color-coded indicator)
- Top 3 strengths/weaknesses
- Suggestions (if score < 90)
- Similar skills warning (if any detected)

---

## 3. Constraints Analysis

### 3.1 Token Economy

**Constraint**: Protocol files must be <10KB for efficient context loading

| File | Current Size | Post-Enhancement Estimate |
|------|--------------|---------------------------|
| SELF-CRITIQUE.md | ~8KB (390 lines) | ~12KB (500-550 lines) |

**Mitigation**: 
- Split into SELF-CRITIQUE.md (core) and SELF-CRITIQUE-CHECKLISTS.md (extended)
- OR use JIT loading for type-specific checklists
- OR trim verbose examples (current file has 1 detailed example)

**Recommendation**: Trim existing verbose example section and use concise format. Target: stay under 10KB.

### 3.2 Performance

**Constraint**: Self-critique adds <5 seconds to workflow (SC-005)

**Analysis**: Since this is prompt-based (AI reads instructions and follows), the "performance" is the time for AI to:
1. Read critique protocol (~100ms)
2. Evaluate artifact against checklist (~2-3 seconds of "thinking")
3. Format output (~500ms)

**Assessment**: Well within 5-second budget. No optimization needed.

### 3.3 Cross-Agent Compatibility

**Constraint**: Must work with any AI agent

**Analysis**: Protocol uses only Markdown formatting which all agents understand. No agent-specific syntax or features used.

**Verified agents**: Claude, Cursor, Gemini, GPT-4, Codex, Qwen (all read .md files)

---

## 4. Integration Points

### 4.1 Protocol Loading Order

```
PROMPTOS.md (entry point)
    ↓ loads
GENERATION.md (artifact generation)
    ↓ calls after generation
SELF-CRITIQUE.md ← ENHANCEMENT TARGET
    ↓ outputs to
HUMAN-GATE.md (approval workflow)
```

### 4.2 Data Sources

| Source | Purpose | Access Method |
|--------|---------|---------------|
| `skills/INDEX.md` | Redundancy detection | AI reads file listing |
| Generated artifact | Evaluation target | In-context (already available) |
| Constitution | T0 validation | AI checks against rules |

### 4.3 Output Consumers

| Consumer | Consumes | Purpose |
|----------|----------|---------|
| HUMAN-GATE.md | Critique result | Display to human |
| Human reviewer | Score + suggestions | Make approval decision |
| MEMORY.md | Feedback correlation | Learning (future) |

---

## 5. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Score doesn't reflect actual quality | Medium | High | Calibrate with human feedback over time |
| Suggestions too generic | Medium | Medium | Type-specific suggestion templates |
| Redundancy false positives | Low | Low | Human validates similarity warnings |
| Protocol file too large | Medium | Medium | Split or trim verbose sections |
| AI ignores protocol | Low | High | Ensure protocol is loaded via PROMPTOS.md |

---

## 6. Decisions Summary

| # | Decision | Option Selected | Rationale |
|---|----------|-----------------|-----------|
| D1 | Architecture | Prompt-based | Aligns with PromptOS v2.0 |
| D2 | Evaluation method | Rule-based | Transparent, no dependencies |
| D3 | Redundancy detection | Keyword/structural | Vector DB out of scope |
| D4 | Output format | Structured YAML | Human-readable, parseable |
| D5 | Human Gate integration | Inline display | Single approval point |
| D6 | File size management | Trim verbose examples | Stay under 10KB |

---

## 7. Next Steps

1. **data-model.md** - Define formal entity structures
2. **contracts/** - Define protocol interface formats
3. **quickstart.md** - Usage documentation
4. **tasks.md** - Detailed implementation tasks (Phase 2)

---

*Research completed: 2026-02-02 | Ready for Phase 1 Design*
