# SPEC-003 Execution Checklist

**Spec:** Web Research Protocol Enhancement  
**Started:** 2026-02-03  
**Estimated Duration:** 3-5 days  
**Status:** 🔵 IN PROGRESS

---

## Context

**SPEC-003** enhances the existing `WEB-RESEARCH.md` protocol based on learnings from SPEC-010 (Language Skills Baseline). During SPEC-010 execution, informal web research was conducted, revealing gaps in:

1. **Source validation** - No formal validation rules
2. **Citation consistency** - Inconsistent formats across skills
3. **Quality tiers** - All sources treated equally
4. **Auto-Increment integration** - No source gap detection

**Dependencies satisfied:**
- ✅ SPEC-002 (Auto-Increment) implemented
- ✅ SPEC-010 (Language Skills) complete (5 skills with informal research)
- ✅ Core protocols operational (8 protocols)
- ✅ T0-SOURCE-01 rule defined in Constitution

---

## Phase 1: Preparation ✅ COMPLETE

### Pre-Execution Setup

- [x] Create execution checklist (this file)
- [x] Create data collection guide
- [x] Create memory tracking file (`memory/opencode-spec003-session.md`)
- [x] Review current `WEB-RESEARCH.md` protocol
- [x] Review SPEC-010 learnings (TRANSITION-010-TO-003.md)
- [x] Load mandatory protocols (SELF-CRITIQUE, HUMAN-GATE, AUTO-INCREMENT, MEMORY-MANAGEMENT)

**Phase 1 Status**: ✅ COMPLETE - All prerequisites verified

---

## Phase 2: Research & Gap Analysis

### Task 1: Review Current WEB-RESEARCH.md ⏳

- [ ] **Read** - Review entire current protocol (~400 lines)
  - [ ] Identify existing sections (10 major sections)
  - [ ] List current features (source hierarchy, research protocol, cache strategy)
  - [ ] Note current limitations (no validation rules, no citation templates, no tier scoring)
  
- [ ] **Map to SPEC-010 needs** - Identify specific gaps
  - [ ] Gap 1: Formal source validation rules (date, authority, completeness)
  - [ ] Gap 2: Citation templates for skills
  - [ ] Gap 3: Tier scoring system (beyond table hierarchy)
  - [ ] Gap 4: Auto-Increment integration for source gaps
  - [ ] Gap 5: Quality metrics for research results
  
- [ ] **Document** - Create gap analysis document
  - [ ] List all identified gaps in `specs/003-web-research/gap-analysis.md`
  - [ ] Prioritize gaps (HIGH/MEDIUM/LOW)
  - [ ] Estimate complexity per gap

**Estimated time:** 1-2 hours  
**Output:** Gap analysis document

---

### Task 2: Analyze SPEC-010 Source Patterns ⏳

- [ ] **Review 5 baseline skills** - Extract source citation patterns
  - [ ] Java baseline - Document source format used
  - [ ] Kotlin baseline - Document source format used
  - [ ] C/C++ baseline - Document source format used
  - [ ] JavaScript baseline - Document source format used
  - [ ] Python baseline - Document source format used
  
- [ ] **Identify inconsistencies** - Document variations
  - [ ] Format variations (bullet list vs table vs inline)
  - [ ] Metadata variations (date presence, access date, type label)
  - [ ] Quality indicators (tier, reliability score, last-updated)
  
- [ ] **Extract best practices** - What worked well
  - [ ] Official docs prioritized (all 5 skills cited official sources)
  - [ ] Multiple sources per skill (avg 3-5 sources)
  - [ ] Section-specific citations (when applicable)
  
- [ ] **Propose standard** - Citation template design
  - [ ] YAML frontmatter format option
  - [ ] Markdown section format option
  - [ ] Inline citation format option

**Estimated time:** 1-2 hours  
**Output:** Source pattern analysis document

---

## Phase 3: Protocol Enhancement

### Task 3: Source Validation Rules 🔵 NEXT

- [ ] **Design validation framework** - Ruleset for source quality
  - [ ] Date validation rules (< 2 years for best practices, < 5 years for fundamentals)
  - [ ] Authority validation rules (official domains, recognized organizations)
  - [ ] Completeness validation rules (snippets, code examples, breadth)
  - [ ] Relevance validation rules (keyword matching, domain alignment)
  
- [ ] **Create scoring system** - Quantitative source scoring
  - [ ] Define scoring dimensions (authority 40%, recency 30%, completeness 20%, relevance 10%)
  - [ ] Create scoring rubric (0-100 scale)
  - [ ] Define thresholds (≥80 = excellent, 60-79 = good, 40-59 = acceptable, <40 = unreliable)
  
- [ ] **Write validation protocol** - Step-by-step validation process
  - [ ] Phase 1: Collect source metadata
  - [ ] Phase 2: Apply validation rules
  - [ ] Phase 3: Calculate scores
  - [ ] Phase 4: Classify tier
  - [ ] Phase 5: Flag issues
  
- [ ] **Self-Critique** - Evaluate validation rules quality
  - [ ] Execute SELF-CRITIQUE.md on validation rules section
  - [ ] Target score ≥95 (enhancement complexity)
  - [ ] Document score in memory file
  
- [ ] **Human Gate** - Present validation rules for approval
  - [ ] Show preview with scoring examples
  - [ ] Await decision: approve | view | edit | reject | cancel
  - [ ] If rejected: register in memory file

**Estimated time:** 2-3 hours  
**Output:** Validation rules section in WEB-RESEARCH.md or JIT sub-file

---

### Task 4: Citation Templates 📋

- [ ] **Design template formats** - Multiple citation styles
  - [ ] YAML frontmatter template (for skill metadata)
  - [ ] Markdown section template (for "Fontes" section)
  - [ ] Inline citation template (for in-content citations)
  - [ ] Bibliography template (for extensive research)
  
- [ ] **Create examples** - Demonstrate each template
  - [ ] Example 1: Java baseline (official docs + GitHub repo)
  - [ ] Example 2: Framework skill (docs + tutorial + Stack Overflow)
  - [ ] Example 3: Pattern skill (multiple academic + industry sources)
  
- [ ] **Define fields** - Required vs optional metadata
  - [ ] Required: title, url, type, accessed_date
  - [ ] Optional: author, last_updated, tier, reliability_score, notes
  
- [ ] **Self-Critique** - Evaluate templates quality
  - [ ] Execute SELF-CRITIQUE.md on templates section
  - [ ] Target score ≥95
  - [ ] Document score in memory file
  
- [ ] **Human Gate** - Present templates for approval
  - [ ] Show preview with examples
  - [ ] Await decision
  - [ ] If rejected: register in memory file

**Estimated time:** 1.5-2 hours  
**Output:** Citation templates section in WEB-RESEARCH.md or JIT sub-file

---

### Task 5: Quality Tier System 📊

- [ ] **Define tier levels** - Source quality classification
  - [ ] Tier 1 (Excellent): Official docs, recognized standards bodies
  - [ ] Tier 2 (High): Official repos, academic papers, reputable orgs
  - [ ] Tier 3 (Good): Popular community resources, established blogs
  - [ ] Tier 4 (Acceptable): General tutorials, curated lists
  - [ ] Tier 5 (Use with caution): Unverified sources, outdated content
  
- [ ] **Create tier assignment rules** - Automated tier classification
  - [ ] Domain-based rules (*.io/docs → Tier 1, github.com/official → Tier 2)
  - [ ] Score-based rules (score ≥80 → Tier 1, 60-79 → Tier 2, etc.)
  - [ ] Manual override guidelines (when to escalate/downgrade tier)
  
- [ ] **Document tier indicators** - Visual representation
  - [ ] Tier badges (🟢 T1, 🔵 T2, 🟡 T3, 🟠 T4, 🔴 T5)
  - [ ] Confidence levels (✓✓✓ high, ✓✓ medium, ✓ low, ⚠ caution)
  - [ ] Integration with citation templates
  
- [ ] **Self-Critique** - Evaluate tier system quality
  - [ ] Execute SELF-CRITIQUE.md on tier system section
  - [ ] Target score ≥95
  - [ ] Document score in memory file
  
- [ ] **Human Gate** - Present tier system for approval
  - [ ] Show preview with classification examples
  - [ ] Await decision
  - [ ] If rejected: register in memory file

**Estimated time:** 1.5-2 hours  
**Output:** Tier system section in WEB-RESEARCH.md or JIT sub-file

---

### Task 6: Token Budget Assessment (JIT Decision) ⚙️

- [ ] **Calculate current size** - Measure enhanced protocol size
  - [ ] Current WEB-RESEARCH.md: ~400 lines (~1,500 tokens)
  - [ ] + Validation rules: ~200 lines (~800 tokens)
  - [ ] + Citation templates: ~150 lines (~600 tokens)
  - [ ] + Tier system: ~150 lines (~600 tokens)
  - [ ] **Total estimated**: ~900 lines (~3,500 tokens) ⚠️ EXCEEDS T0-SIZE-01
  
- [ ] **JIT sub-files decision** - Apply SPEC-010 learning
  - [ ] IF total > 1,400 tokens → Extract to JIT sub-files
  - [ ] Candidates: `source-validation-rules.md`, `citation-templates.md`, `tier-system.md`
  - [ ] Keep main protocol < 1,400 tokens with references to sub-files
  
- [ ] **Refactor if necessary** - Apply JIT pattern
  - [ ] Create `.prompt-os/core/web-research/` directory
  - [ ] Move detailed sections to JIT sub-files
  - [ ] Update main WEB-RESEARCH.md with JIT references
  - [ ] Re-run Self-Critique on refactored structure

**Estimated time:** 1 hour  
**Output:** JIT architecture decision + refactored files if needed

---

## Phase 4: Integration & Testing

### Task 7: AUTO-INCREMENT Integration 🔗

- [ ] **Review AUTO-INCREMENT.md** - Understand integration points
  - [ ] Phase 2.5 (Redundancy Detection) - How it detects gaps
  - [ ] Memory architecture - Where to register source gaps
  - [ ] Gap registration format - Table structure in agent memory
  
- [ ] **Define source gap detection** - When to trigger Auto-Increment
  - [ ] Scenario 1: Missing official documentation (no Tier 1 source)
  - [ ] Scenario 2: Outdated sources (all sources > 2 years old)
  - [ ] Scenario 3: Incomplete coverage (< 2 total sources)
  - [ ] Scenario 4: Low reliability (all sources < 60 score)
  
- [ ] **Create integration protocol** - Step-by-step process
  - [ ] Step 1: Research phase completion
  - [ ] Step 2: Source validation execution
  - [ ] Step 3: Gap detection check
  - [ ] Step 4: Auto-Increment notification (if gap detected)
  - [ ] Step 5: Human decision (create source now | defer | reject)
  - [ ] Step 6: Memory registration (MEMORY-MANAGEMENT protocol)
  
- [ ] **Document integration** - Add to WEB-RESEARCH.md
  - [ ] New section: "Integration with Auto-Increment"
  - [ ] Flowchart: Research → Validation → Gap Detection → Memory
  - [ ] Examples: 3 scenarios with gap detection outcomes
  
- [ ] **Self-Critique** - Evaluate integration section
  - [ ] Execute SELF-CRITIQUE.md on integration section
  - [ ] Target score ≥95
  - [ ] Document score in memory file
  
- [ ] **Human Gate** - Present integration for approval
  - [ ] Show preview with flowchart and examples
  - [ ] Await decision
  - [ ] If rejected: register in memory file

**Estimated time:** 2-3 hours  
**Output:** Integration section + AUTO-INCREMENT cross-references

---

### Task 8: Protocol Testing (Validation) ✅

- [ ] **Test with SPEC-010 retroactively** - Apply new protocol to existing skills
  - [ ] Java baseline - Validate sources using new rules
  - [ ] Python baseline - Validate sources using new rules
  - [ ] Expected outcome: Identify validation gaps or confirm compliance
  
- [ ] **Test with new skill (optional)** - Real-world validation
  - [ ] Generate 1 test skill using enhanced WEB-RESEARCH.md
  - [ ] Apply validation rules, citation templates, tier system
  - [ ] Measure: Time taken, ease of use, quality improvement
  
- [ ] **Document test results** - Validation report
  - [ ] Test coverage: 2/5 SPEC-010 skills validated
  - [ ] Issues found: List any protocol gaps or ambiguities
  - [ ] Improvements confirmed: Source quality upgrade, consistency
  
- [ ] **Iterate if necessary** - Fix issues found during testing
  - [ ] Update protocol based on test feedback
  - [ ] Re-run Self-Critique if major changes

**Estimated time:** 1-2 hours  
**Output:** Validation test report

---

## Phase 5: Documentation & Finalization

### Task 9: Documentation Updates 📝

- [ ] **Update README.md** - Add SPEC-003 to completed specs
  - [ ] v2.3.0-dev roadmap section - Mark SPEC-003 as ✅ COMPLETE
  - [ ] Protocol count - Update from 8 to 9 protocols (if new files created)
  
- [ ] **.context/_meta/project-overview.md** - Add SPEC-003 summary
  - [ ] Achievements section - Source validation, citation templates, tier system
  - [ ] Metrics - Enhancement size, Self-Critique scores, integration success
  
- [ ] **.context/ai-assistant-guide.md** - Add research quality guidelines
  - [ ] Section 6 (new): "Web Research Quality Standards"
  - [ ] Cross-reference to WEB-RESEARCH.md
  - [ ] Examples of proper source validation
  
- [ ] **ITZAMNA-AGENT.md** - Reference SPEC-003 learnings
  - [ ] Monitoring section - Add SPEC-003 to completed specs
  - [ ] Proven patterns - JIT sub-files (if applied), validation rigor
  - [ ] Update próxima SPEC to SPEC-004 or TBD

**Estimated time:** 1 hour  
**Output:** 4 documentation files updated

---

## Phase 6: Reports & Memory

### Task 10: Final Reports 📊

- [ ] **Self-Critique Metrics Report** - Quality analysis
  - [ ] Create `specs/003-web-research/reports/self-critique-metrics.md`
  - [ ] Aggregate all Self-Critique scores from session
  - [ ] Calculate averages per dimension
  - [ ] Compare to SPEC-010 (baseline: 99.20)
  
- [ ] **Gap Detection Report** (if gaps detected)
  - [ ] Create `specs/003-web-research/reports/gap-detection-report.md`
  - [ ] List all detected gaps during enhancement
  - [ ] Categorize by type (source, tool, integration)
  - [ ] Document resolution (created, deferred, rejected)
  
- [ ] **Rejection Analysis Report** (if rejections occurred)
  - [ ] Create `specs/003-web-research/reports/rejection-analysis-report.md`
  - [ ] List all rejections with categories
  - [ ] Pattern analysis - Common rejection reasons
  - [ ] Learnings - Corrections applied
  
- [ ] **Enhancement Impact Report** (new for SPEC-003)
  - [ ] Create `specs/003-web-research/reports/enhancement-impact-report.md`
  - [ ] Before/After comparison - Protocol size, features, clarity
  - [ ] Validation test results - SPEC-010 skills tested
  - [ ] Integration validation - AUTO-INCREMENT connection verified

**Estimated time:** 2-3 hours  
**Output:** 3-4 final reports in `specs/003-web-research/reports/`

---

### Task 11: Memory Management (MANDATORY) 🧠

- [ ] **Update MEMORY.md** - Global statistics + session notes
  - [ ] Header - Update "Ultima Atualizacao", "Spec Atual" to SPEC-003 COMPLETE
  - [ ] Statistics table - Update "Core Protocols" count (8 → 9 if JIT created)
  - [ ] Episodic memory - Add SPEC-003 completion entry
  - [ ] Session notes - Add SPEC-003 section with summary
  
- [ ] **Update memory/opencode-memory.md** - Agent-specific tracking
  - [ ] Session notes - Add detailed SPEC-003 execution notes
  - [ ] Gaps table - Register any source gaps detected (if applicable)
  - [ ] Rejections table - Register any rejections (if applicable)
  - [ ] Pattern analysis - Document enhancement learnings
  
- [ ] **Create workflow doc** (if applicable)
  - [ ] `.context/workflows/spec-003-execution-pattern.md`
  - [ ] Only if: Reusable pattern emerged (like SPEC-010 JIT pattern)
  - [ ] Document: Validation flow, integration sequence, testing approach
  
- [ ] **Commit memory WITH artifacts** - Atomic update (T0-MEMORY-01)
  - [ ] Ensure WEB-RESEARCH.md + memory files committed together
  - [ ] Never commit artifacts separately from memory updates

**Estimated time:** 1 hour  
**Output:** MEMORY.md + agent memory updated, workflow doc created if needed

---

## Success Metrics

### Quantitative Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Self-Critique avg score | ≥95 | TBD | ⏳ |
| Rejection rate | <20% | TBD | ⏳ |
| Constitution violations | 0 | TBD | ⏳ |
| Avg time per deliverable | <2h | TBD | ⏳ |
| Token budget compliance | <1,400 main | TBD | ⏳ |
| Skills using validated sources | 100% (5/5 SPEC-010) | TBD | ⏳ |

### Qualitative Goals

- [ ] Source validation rules are clear and applicable
- [ ] Citation templates are easy to use
- [ ] Tier system covers common source types
- [ ] Auto-Increment integration is functional
- [ ] AI agents can follow protocol without ambiguity
- [ ] Protocol enhancement improves skill quality measurably

---

## Risk Management

### Identified Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Scope creep (API integrations)** | Medium | High | Focus on protocol instructions only; APIs are OPTIONAL |
| **Protocol complexity too high** | High | Medium | Apply JIT sub-files; Target score ≥95 (not 99) |
| **Auto-Increment integration breaks** | Medium | High | Review API first; Test with validation scenarios |
| **Token budget exceeded** | High | Medium | Monitor size; Extract to JIT sub-files proactively |

---

## Learned Actions (Apply from SPEC-010)

1. **JIT sub-files pattern** - If >1,400 tokens, extract to JIT sub-files ✅
2. **Version-agnostic approach** - Focus on principles, not specific tools ✅
3. **Self-Critique ≥95 target** - Enhancement complexity requires high bar ✅
4. **Consistent structure** - Follow existing protocol format ✅
5. **Human Gate at each major section** - Don't batch; incremental approval ✅

---

## Quick Commands

### Start enhancement:
```bash
# Backup current protocol
cp .prompt-os/core/WEB-RESEARCH.md .prompt-os/core/WEB-RESEARCH.md.backup-spec003

# Create JIT directory (if needed)
mkdir -p .prompt-os/core/web-research
```

### After approval:
```bash
# Commit with conventional message
git add .prompt-os/core/WEB-RESEARCH.md memory/opencode-spec003-session.md MEMORY.md
git commit -m "feat(protocol): enhance WEB-RESEARCH with validation, citations, tier system (SPEC-003)"
```

### Register score:
```bash
echo "| $(date +%Y-%m-%d) | {artifact} | protocol | {overall} | {comp} | {clar} | {corr} | {bp} | {notes} |" >> memory/opencode-spec003-session.md
```

---

## Session Log

### 2026-02-03 - Phase 1 Preparation COMPLETE ✅

- ✅ Execution checklist created (this file)
- ✅ Data collection guide created
- ✅ Memory tracking file prepared
- 🔵 **NEXT:** Phase 2 - Research & Gap Analysis

---

## Troubleshooting

**If score <95:**
1. Identify dimension with lowest score
2. Add more examples or detail
3. Simplify language (clarity)
4. Add integration examples (completeness)
5. Re-run Self-Critique

**If rejected:**
1. Register in memory file (MEMORY-MANAGEMENT)
2. Categorize rejection reason
3. Apply correction
4. Re-submit via Human Gate

**If token budget exceeded:**
1. Calculate section sizes
2. Identify candidates for JIT extraction (>200 lines or >800 tokens)
3. Create JIT sub-files in `.prompt-os/core/web-research/`
4. Update main protocol with references
5. Re-run Self-Critique

---

**Template used:** Based on SPEC-010 execution-checklist.md  
**Version:** 1.0  
**Status:** Phase 1 COMPLETE | Phase 2 NEXT  
**Estimated completion:** 2026-02-06 (3-5 days from start)

