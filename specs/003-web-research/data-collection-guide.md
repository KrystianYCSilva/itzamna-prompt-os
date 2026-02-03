# Data Collection Guide - SPEC-003 Execution

**Purpose:** Instructions for collecting data during SPEC-003 (Web Research Protocol Enhancement) implementation  
**For:** Agent executing the spec (OpenCode, Claude, etc.)  
**Output:** Data for monitoring reports (Self-Critique, Gap Detection, Rejection Analysis, Enhancement Impact)

---

## Overview

During SPEC-003 execution, you will collect **4 types of data**:

1. **Self-Critique Scores** - Quality of protocol enhancements
2. **Gaps Detected** - Missing components or integration points
3. **Rejections** - Sections/features rejected by human
4. **Enhancement Metrics** - Before/after improvements, validation results

**Tracking file:** `memory/opencode-spec003-session.md`

---

## 1. Collecting Self-Critique Scores

### When to Collect

**After completing each major deliverable:**
- Task 3: Source validation rules
- Task 4: Citation templates
- Task 5: Quality tier system
- Task 7: AUTO-INCREMENT integration
- (Optional) Task 8: Test skill generation

### How to Collect

1. Execute SELF-CRITIQUE.md protocol on the completed section
2. Extract YAML output:

```yaml
overall_score: 96
dimensions:
  completude:
    score: 24
    criteria_scores: [5, 5, 5, 5, 4]
  clareza:
    score: 24
    criteria_scores: [5, 5, 5, 5, 4]
  correcao:
    score: 24
    criteria_scores: [5, 5, 5, 4, 5]
  best_practices:
    score: 24
    criteria_scores: [5, 5, 5, 5, 4]
```

3. Add to `memory/opencode-spec003-session.md` table:

```markdown
| 2026-02-03 | validation-rules | protocol | 96 | 24 | 24 | 24 | 24 | Comprehensive rubric |
```

### Format

```
| Data | Artifact | Type | Overall | Comp | Clar | Corr | BP | Notes |
```

- **Data:** YYYY-MM-DD
- **Artifact:** Section name (`validation-rules`, `citation-templates`, `tier-system`, `auto-increment-integration`)
- **Type:** Always `protocol` for SPEC-003
- **Overall:** 0-100 score
- **Comp/Clar/Corr/BP:** 0-25 each dimension
- **Notes:** Brief observations

**Target:** Overall ≥95 (enhancement complexity)

---

## 2. Collecting Gaps Detected

### When to Collect

**During any phase when you identify:**
- Missing integration point with existing protocol
- Required tool/API not available
- Documentation gap (unclear instructions)
- Feature gap (validation rule missing edge case)

### How to Collect

1. Identify the gap specifically
2. Classify gap type:
   - `source` - Missing source validation capability
   - `tool` - Missing tool/API for automation
   - `integration` - Missing connection to other protocol
   - `documentation` - Unclear or missing instructions
   - `feature` - Missing functionality

3. Add to `## Gaps Detectados` table in `memory/opencode-spec003-session.md`:

```markdown
| 2026-02-03 | "Need to validate academic paper sources" | source-academic-validation | source | deferred |
```

### Format

```
| Data | Request | Component Suggested | Type | Status |
```

- **Data:** YYYY-MM-DD
- **Request:** Context that revealed gap (quoted)
- **Component Suggested:** Specific name for missing component
- **Type:** `source`, `tool`, `integration`, `documentation`, `feature`
- **Status:** `pending`, `created`, `deferred`, `rejected`

### Status Updates

- `created` - Gap filled during session
- `deferred` - Documented for future SPEC
- `rejected` - Out of scope or not needed

---

## 3. Collecting Rejections

### When to Collect

**After each Human Gate decision** - If human responds with `reject`

### How to Collect

1. Note the rejection reason (ask if not provided)
2. Classify into category:
   - `exemplos` - Examples unclear or missing
   - `especificidade` - Too generic, lacks detail
   - `clareza` - Confusing instructions
   - `completude` - Missing sections or features
   - `relevancia` - Not aligned with goal
   - `integracao` - Integration with other protocols broken
   - `outros` - Other reason

3. Identify correction action

4. Add to `## Log de Rejeições` table:

```markdown
| 2026-02-03 | protocol | validation-rules | "Scoring rubric unclear" | clareza | Add step-by-step validation examples |
```

### Format

```
| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
```

- **Data:** YYYY-MM-DD
- **Tipo:** `protocol` (always for SPEC-003)
- **Item:** Section rejected
- **Motivo:** Human feedback (quoted)
- **Categoria:** One of 7 categories above
- **Aprendizado:** Correction action for next iteration

---

## 4. Collecting Enhancement Metrics (New for SPEC-003)

### What to Collect

**Before/After Comparisons:**

#### Protocol Size
```markdown
## Enhancement Metrics

### Protocol Size
| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Lines | 401 | 850 | +449 (+112%) |
| Sections | 10 | 14 | +4 |
| Examples | 5 | 12 | +7 |
| Token estimate | 1,500 | 3,200 | +1,700 (JIT needed) |
```

#### Feature Coverage
```markdown
### Feature Coverage
| Feature | Before | After | Status |
|---------|--------|-------|--------|
| Source validation | ❌ Informal | ✅ Formal rules | Added |
| Citation templates | ❌ No standard | ✅ 3 templates | Added |
| Quality tiers | ⚠️ Table only | ✅ Scoring system | Enhanced |
| Auto-Increment integration | ❌ No integration | ✅ Full integration | Added |
```

#### Validation Test Results (Task 8)
```markdown
### Validation Tests
| Skill | Sources Before | Validation Result | Issues Found | Actions Taken |
|-------|----------------|-------------------|--------------|---------------|
| Java baseline | 3 (informal) | 2/3 Tier 1, 1/3 Tier 2 | Date missing | Added access date |
| Python baseline | 4 (informal) | 3/4 Tier 1, 1/4 Tier 3 | 1 outdated source | Flagged for update |
```

### When to Collect

- **Protocol Size:** Before starting (Task 1), after completing (Task 6)
- **Feature Coverage:** Before starting (Task 1), after each feature added (Tasks 3-5, 7)
- **Validation Tests:** During Task 8 (optional testing phase)

### How to Document

Create these tables in `memory/opencode-spec003-session.md` under `## Enhancement Metrics` section.

---

## 5. Workflow per Task

### Task 1-2: Research (Phase 2)
- [ ] Document current protocol size (lines, tokens, sections)
- [ ] If gap detected → Register in Gaps table
- [ ] Create baseline metrics for "Before" comparison

### Task 3: Validation Rules (Phase 3)
- [x] Generate validation rules section
- [ ] **MANDATORY:** Execute Self-Critique → Register score
- [ ] Human Gate → If reject: Register rejection
- [ ] If gap detected: Register in Gaps table
- [ ] Update Feature Coverage table (validation: ❌ → ✅)

### Task 4: Citation Templates (Phase 3)
- [ ] Generate templates section
- [ ] **MANDATORY:** Execute Self-Critique → Register score
- [ ] Human Gate → If reject: Register rejection
- [ ] Update Feature Coverage table (citations: ❌ → ✅)

### Task 5: Tier System (Phase 3)
- [ ] Generate tier system section
- [ ] **MANDATORY:** Execute Self-Critique → Register score
- [ ] Human Gate → If reject: Register rejection
- [ ] Update Feature Coverage table (tiers: ⚠️ → ✅)

### Task 6: JIT Decision (Phase 3)
- [ ] Calculate total protocol size
- [ ] Document in Protocol Size table (After column)
- [ ] If >1,400 tokens: Extract to JIT sub-files
- [ ] If refactored: Re-run Self-Critique → Register new score

### Task 7: Integration (Phase 4)
- [ ] Generate integration section
- [ ] **MANDATORY:** Execute Self-Critique → Register score
- [ ] Human Gate → If reject: Register rejection
- [ ] Update Feature Coverage table (integration: ❌ → ✅)
- [ ] Test integration → Document results

### Task 8: Validation Tests (Phase 4)
- [ ] Test with 2+ SPEC-010 skills
- [ ] Document results in Validation Tests table
- [ ] If issues found → Register in Gaps or create immediate fix
- [ ] Calculate improvement metrics

### Task 9-11: Documentation & Reports (Phase 5-6)
- [ ] Generate final reports using collected data
- [ ] **MANDATORY:** Update MEMORY.md (MEMORY-MANAGEMENT protocol)
- [ ] Commit memory WITH artifacts (atomic update)

---

## 6. Quick Commands

### Add Self-Critique Score
```bash
echo "| $(date +%Y-%m-%d) | {artifact} | protocol | {overall} | {comp} | {clar} | {corr} | {bp} | {notes} |" >> memory/opencode-spec003-session.md
```

### Add Gap
```bash
echo "| $(date +%Y-%m-%d) | \"{request}\" | {component-name} | {type} | pending |" >> memory/opencode-spec003-session.md
```

### Add Rejection
```bash
echo "| $(date +%Y-%m-%d) | protocol | {item} | \"{motivo}\" | {categoria} | {aprendizado} |" >> memory/opencode-spec003-session.md
```

### Update Feature Coverage (manual in editor)
```markdown
| {feature} | ❌ None | ✅ Implemented | Added |
```

---

## 7. Data Validation Checklist

### Before Generating Reports

**Self-Critique Tracking:**
- [ ] All major sections (validation, citations, tiers, integration) have scores
- [ ] All scores are in valid ranges (0-100 overall, 0-25 dimensions)
- [ ] Dimension sum equals overall score
- [ ] Average score ≥95 (target for enhancements)

**Gaps Detected:**
- [ ] All gaps have specific component name
- [ ] Type is one of: source, tool, integration, documentation, feature
- [ ] Status is one of: pending, created, deferred, rejected
- [ ] Request context is quoted

**Log de Rejeições:**
- [ ] All rejections have category from defined list
- [ ] Motivo is quoted
- [ ] Aprendizado is actionable
- [ ] If multiple rejections: Pattern analysis documented

**Enhancement Metrics:**
- [ ] Protocol Size table complete (Before, After, Delta)
- [ ] Feature Coverage table shows all 4 features
- [ ] Validation Tests table populated (if Task 8 executed)
- [ ] Calculations are accurate

---

## 8. Example: Complete Data Collection for Validation Rules

### Scenario: Task 3 (Source Validation Rules)

**1. Generate validation rules section (~200 lines)**

**2. Self-Critique:**
```yaml
overall_score: 96
dimensions:
  completude: { score: 24, criteria_scores: [5, 5, 5, 5, 4] }
  clareza: { score: 24, criteria_scores: [5, 5, 5, 4, 5] }
  correcao: { score: 24, criteria_scores: [5, 5, 5, 5, 4] }
  best_practices: { score: 24, criteria_scores: [5, 5, 5, 5, 4] }
```

**3. Register score:**
```markdown
| 2026-02-03 | validation-rules | protocol | 96 | 24 | 24 | 24 | 24 | Comprehensive scoring rubric |
```

**4. Human Gate decision: `edit`**
- Human: "Add example for academic paper validation"
- Action: Add example
- Re-Critique: 97
- Decision: `approve`

**5. Update Feature Coverage:**
```markdown
| Source validation | ❌ Informal | ✅ Formal rules + examples | Added |
```

**6. No gaps detected, no rejection → Continue to Task 4**

---

## 9. Report Generation Inputs

### Self-Critique Metrics Report
**Uses:** All rows from Self-Critique Tracking table  
**Calculates:**
- Average overall score (target ≥95)
- Average per dimension
- Score distribution (Excellent 90-100, Good 80-89, etc.)
- Comparison to SPEC-010 baseline (99.20)

### Gap Detection Report
**Uses:** All rows from Gaps Detectados table  
**Groups by:**
- Type (source, tool, integration, etc.)
- Status (created, deferred, rejected)
**Outputs:**
- Total gaps: X
- Resolved: Y (created)
- Deferred: Z (for future specs)

### Rejection Analysis Report
**Uses:** All rows from Log de Rejeições table  
**Analyzes:**
- Rejection rate: X% (rejections / submissions)
- Categories distribution
- Pattern: Most common rejection reason
- Learnings applied

### Enhancement Impact Report (New)
**Uses:** Enhancement Metrics section  
**Compares:**
- Protocol size growth
- Feature coverage improvement
- Validation test results
- Integration success
**Outputs:**
- Impact assessment (quantitative + qualitative)

---

## 10. Troubleshooting

### "Forgot to register score!"
- If still in same session: Estimate score from memory notes
- If unsure: Mark as "N/A - not recorded"
- Continue collecting for remaining tasks

### "Don't know gap type"
Decision tree:
```
Is it about SOURCE QUALITY? → source
Is it about MISSING TOOL/API? → tool
Is it about CONNECTING TO OTHER PROTOCOL? → integration
Is it about UNCLEAR INSTRUCTIONS? → documentation
Is it about MISSING FUNCTIONALITY? → feature
```

### "Multiple rejection reasons"
- Choose PRIMARY reason (most important)
- Mention others in "Aprendizado" field
Example:
```markdown
| 2026-02-03 | protocol | validation-rules | "Examples missing and scoring unclear" | exemplos | Add 3 examples; also clarify scoring rubric |
```

### "Token budget calculation unclear"
Use this formula:
```
Tokens ≈ Lines × 4
Example: 400 lines ≈ 1,600 tokens
```

If exact count needed, use token counter tool or estimate conservatively.

---

## 11. Final Checklist Before Reports

- [ ] All Self-Critique scores registered (Tasks 3, 4, 5, 7, optional 8)
- [ ] All gaps have component name and type
- [ ] All rejections have category and learning
- [ ] Enhancement Metrics tables complete
- [ ] Session notes documented
- [ ] Calculations verified (averages, totals)
- [ ] Memory file commitado: `memory/opencode-spec003-session.md`

---

## 12. MEMORY-MANAGEMENT Integration (MANDATORY)

**After SPEC-003 completion:**

1. **Update MEMORY.md** (global)
   - Header: Update date, Spec Atual
   - Statistics: Update Core Protocols count if new files created
   - Episodic memory: Add SPEC-003 entry
   - Session notes: Add SPEC-003 section

2. **Update memory/opencode-memory.md** (agent-specific)
   - Session notes: Detailed SPEC-003 execution
   - Gaps table: Register source gaps if any
   - Rejections table: Register protocol rejections if any
   - Pattern analysis: Document enhancement learnings

3. **Create workflow doc** (if applicable)
   - `.context/workflows/spec-003-enhancement-pattern.md`
   - Only if reusable pattern emerged
   - Document validation flow, integration sequence

4. **Commit atomically** (T0-MEMORY-01)
   - WEB-RESEARCH.md + memory files TOGETHER
   - Never separate artifact from memory update

---

**Ready to start data collection!**

As you execute Task 3 (Validation Rules), follow this guide to ensure all data points are captured correctly.

**Next step:** Begin Phase 2 - Research & Gap Analysis (Tasks 1-2)

---

**Template used:** Based on SPEC-010 data-collection-guide.md  
**Version:** 1.0  
**Last updated:** 2026-02-03  
**Related:** `specs/003-web-research/execution-checklist.md`, `MEMORY-MANAGEMENT.md`
