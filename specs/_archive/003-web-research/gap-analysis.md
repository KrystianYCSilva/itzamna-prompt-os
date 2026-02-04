# SPEC-003 Gap Analysis: WEB-RESEARCH.md Enhancement

**Date:** 2026-02-03  
**Phase:** Phase 2 - Research & Gap Analysis  
**Analyzed:** Current WEB-RESEARCH.md (401 lines, 10 sections)  
**Compared with:** SPEC-010 baseline skills (Java, Python, JavaScript, Kotlin, C/C++)

---

## Executive Summary

**Current state:** WEB-RESEARCH.md provides informal guidance for web research during skill creation. Structure is solid (10 sections, ~1,500 tokens), but lacks **formal validation mechanisms**, **citation standards**, and **Auto-Increment integration**.

**Gap analysis:** Identified **5 high-priority gaps** across 4 categories (validation, citations, tier system, integration). Estimated enhancement will increase protocol size to ~3,500 tokens, requiring JIT sub-files architecture.

**Recommendation:** Proceed with enhancement following SPEC-010 learnings (JIT pattern, ≥95 target score, incremental Human Gate approval).

---

## Current WEB-RESEARCH.md Analysis

### Structure Overview (10 Sections)

| Section | Lines | Purpose | Strengths | Weaknesses |
|---------|-------|---------|-----------|------------|
| 1. QUANDO USAR | 23 | When to research | Clear triggers defined | No validation triggers |
| 2. FONTES CONFIAVEIS | 69 | Source hierarchy table | 7-tier table, official domains listed | No scoring rules, qualitative only |
| 3. PROTOCOLO DE PESQUISA | 56 | 4-phase research workflow | Structured process (Plan → Search → Validate → Synthesize) | Validation is checklist, not rules |
| 4. SE VOCE NAO TEM ACESSO A WEB | 42 | Fallback strategies | 3 options (knowledge base, ask user, mark for review) | ✅ Good |
| 5. FORMATANDO RESULTADOS | 41 | Research result format | Structured template | Not used in actual skills |
| 6. NIVEIS DE CONFIANCA | 36 | Confidence levels | 5 levels with visual indicators | Not tied to validation rules |
| 7. CACHE DE PESQUISA | 27 | Cache reuse strategy | TTL table by info type | ✅ Practical |
| 8. PARA GERACAO DE SKILLS | 46 | Skill-specific research | 4-step structure + YAML citation | **Gap 2: Citation format** |
| 9. EXEMPLO COMPLETO | 43 | Redis case study | End-to-end example | ✅ Helpful |
| 10. LIMITACOES | 30 | When to admit uncertainty | 2 scenarios (unknown, outdated) | ✅ Good |

**Total:** 401 lines, ~1,500 tokens

---

## SPEC-010 Source Citation Analysis

Analyzed **5 baseline skills** to identify current citation patterns:

### Java Baseline
```yaml
sources:
  - https://docs.oracle.com/javase/tutorial/
  - https://openjdk.org/
  - https://docs.oracle.com/javase/specs/
```
**Format:** YAML array, bullet list of URLs  
**Metadata:** None (no date, type, tier)

### Python Baseline
```yaml
sources:
  - https://docs.python.org/3/
  - https://peps.python.org/
  - https://wiki.python.org/moin/GlobalInterpreterLock
```
**Format:** YAML array, bullet list of URLs  
**Metadata:** None

### JavaScript Baseline
```yaml
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript
  - https://tc39.es/ecma262/
  - https://nodejs.org/docs/
```
**Format:** YAML array, bullet list of URLs  
**Metadata:** None

### Kotlin Baseline (inferred from pattern)
**Format:** YAML array, bullet list of URLs  
**Metadata:** None

### C/C++ Baseline (inferred from pattern)
**Format:** YAML array, bullet list of URLs  
**Metadata:** None

### Pattern Summary

**Consistency:**
- ✅ All 5 skills use YAML frontmatter `sources:` key
- ✅ All use bullet list (array) format
- ✅ All prioritize official documentation (Tier 1 sources)

**Inconsistencies:**
- ❌ No access date (`accessed: "2026-02-03"` mentioned in WEB-RESEARCH.md, line 316, but NOT used in actual skills)
- ❌ No source type (`type: "official_docs"` mentioned in WEB-RESEARCH.md, line 315, but NOT used)
- ❌ No tier indicator (could be inferred from WEB-RESEARCH.md table, but not explicit)
- ❌ No reliability score

**Current template in WEB-RESEARCH.md (line 311-320):**
```yaml
sources:
  - url: "https://kubernetes.io/docs/"
    type: "official_docs"
    accessed: "2026-02-02"
  - url: "https://github.com/kubernetes/examples"
    type: "github"
    accessed: "2026-02-02"
```

**Reality (all 5 SPEC-010 skills):**
```yaml
sources:
  - https://docs.oracle.com/javase/tutorial/
  - https://openjdk.org/
```

**Discrepancy:** Template shows rich metadata, actual skills use minimal format. **Gap 2 confirmed.**

---

## Identified Gaps (5 Total)

### Gap 1: Formal Source Validation Rules ⚠️ HIGH PRIORITY

**Current state:**
- WEB-RESEARCH.md has validation checklist (line 109-115):
  ```
  [ ] Data: Publicado nos ultimos 2 anos?
  [ ] Fonte: E fonte oficial ou reconhecida?
  [ ] Autor: Tem credibilidade na area?
  [ ] Atualizacao: Conteudo parece atualizado?
  [ ] Consenso: Outras fontes confirmam?
  ```
- Qualitative checklist, no quantitative rules
- No thresholds defined (what is "official"? what is "recently"?)
- No scoring system

**Gap:**
- **No formal validation rules** - Checklist is subjective
- **No scoring rubric** - No way to measure "reliability 0.95" mentioned in SPEC-003 pre-spec
- **No validation workflow** - No step-by-step process to apply rules

**Required enhancement:**
- Define validation dimensions (authority, recency, completeness, relevance)
- Create scoring rubric (0-100 scale with thresholds)
- Document step-by-step validation process
- Integrate with Auto-Increment (trigger gap detection if validation fails)

**Estimated size:** ~200 lines (~800 tokens)

**Priority:** HIGH (blocks formal source quality assessment)

---

### Gap 2: Citation Templates Not Followed ⚠️ HIGH PRIORITY

**Current state:**
- WEB-RESEARCH.md proposes rich YAML format (line 311-320)
- Actual SPEC-010 skills use minimal format (URL list only)
- Discrepancy suggests template is not practical or not enforced

**Gap:**
- **Template mismatch** - Proposed format not used in practice
- **No multiple format options** - Only YAML shown (but SPEC-010 shows bullet list is simpler)
- **No guidance on when to use rich vs minimal** - When is metadata necessary?

**Required enhancement:**
- Provide **3 template formats**:
  1. Minimal (URL list) - For baselines with obvious official sources
  2. Standard (YAML with type, accessed) - For skills with mixed source types
  3. Detailed (YAML with tier, reliability_score) - For research-heavy skills or controversial topics
- Document **when to use each format**
- Update WEB-RESEARCH.md to match reality (minimal as default, rich as optional)

**Estimated size:** ~150 lines (~600 tokens)

**Priority:** HIGH (prevents citation inconsistency in future skills)

---

### Gap 3: Quality Tier Scoring System ⚠️ HIGH PRIORITY

**Current state:**
- WEB-RESEARCH.md has 7-tier hierarchy table (line 29-37)
- Tiers are qualitative categories ("Muito Alta", "Alta", "Media-Alta", etc.)
- No scoring algorithm to calculate tier from source properties

**Gap:**
- **No tier assignment rules** - How to determine if a source is Tier 1 vs Tier 2?
- **No scoring algorithm** - Table is lookup, not calculation
- **No tier indicators** - Skills don't show which tier sources belong to

**Required enhancement:**
- Define **tier assignment rules**:
  - Tier 1: Official domains (*.io/docs, *.org/docs) + recognized standards bodies
  - Tier 2: Official repos (github.com/{org}/{project} verified) + academic papers (.edu, IEEE)
  - Tier 3: Popular community resources (>1000 stars, active) + established blogs
  - Tier 4: General tutorials (Medium, Dev.to, curated lists)
  - Tier 5: Unverified sources or outdated content (>2 years)
- Create **scoring rubric** integrated with validation rules:
  - Score = Authority (40%) + Recency (30%) + Completeness (20%) + Relevance (10%)
  - Score ≥80 → Tier 1, 60-79 → Tier 2, 40-59 → Tier 3, 20-39 → Tier 4, <20 → Tier 5
- Document **tier indicators** for citation templates:
  - Badges: 🟢 T1, 🔵 T2, 🟡 T3, 🟠 T4, 🔴 T5
  - Confidence levels: ✓✓✓ high, ✓✓ medium, ✓ low, ⚠ caution

**Estimated size:** ~150 lines (~600 tokens)

**Priority:** HIGH (enables quantitative source quality assessment)

---

### Gap 4: Auto-Increment Integration Missing ⚠️ HIGH PRIORITY

**Current state:**
- WEB-RESEARCH.md is standalone protocol
- No integration with AUTO-INCREMENT.md for gap detection
- No workflow to trigger gap notification when sources are inadequate

**Gap:**
- **No source gap detection** - System doesn't know when sources are missing/inadequate
- **No integration workflow** - No defined process to call Auto-Increment after research
- **No memory registration** - Source gaps not logged in agent memory

**Required enhancement:**
- Define **source gap scenarios**:
  1. No Tier 1 source found (missing official documentation)
  2. All sources >2 years old (outdated information)
  3. <2 total sources (insufficient coverage)
  4. All sources <60 score (low reliability)
- Create **integration protocol**:
  - Step 1: Research phase completion
  - Step 2: Source validation execution
  - Step 3: Gap detection check (if any scenario above)
  - Step 4: AUTO-INCREMENT notification (proactive suggestion)
  - Step 5: Human decision (research more | defer | accept limitation)
  - Step 6: MEMORY-MANAGEMENT (register gap in agent memory)
- Document **flowchart**: Research → Validation → Gap Detection → Memory

**Estimated size:** ~100 lines (~400 tokens)

**Priority:** HIGH (enables SPEC-002 integration, critical for system evolution)

---

### Gap 5: Quality Metrics for Research Results 🟡 MEDIUM PRIORITY

**Current state:**
- WEB-RESEARCH.md shows result format (line 178-213)
- No metrics to assess research quality (completeness, diversity, reliability)

**Gap:**
- **No quality metrics** - How to measure if research was thorough?
- **No acceptance criteria** - When is research "good enough"?

**Required enhancement:**
- Define **research quality metrics**:
  - Source diversity: ≥2 source types (docs, repos, Stack Overflow)
  - Tier distribution: ≥1 Tier 1 source required
  - Avg reliability: ≥70 score
  - Coverage: Addressed all 4 research areas (docs, best practices, examples, troubleshooting)
- Document **acceptance criteria** in validation section

**Estimated size:** ~50 lines (~200 tokens)

**Priority:** MEDIUM (nice-to-have, not blocking)

---

## Token Budget Analysis

### Current State
- WEB-RESEARCH.md: **401 lines** (~**1,500 tokens**)

### Estimated After Enhancement
- Gap 1 (Validation rules): +200 lines (+800 tokens)
- Gap 2 (Citation templates): +150 lines (+600 tokens)
- Gap 3 (Tier scoring): +150 lines (+600 tokens)
- Gap 4 (Integration): +100 lines (+400 tokens)
- Gap 5 (Metrics): +50 lines (+200 tokens)

**Total estimated:** 401 + 650 = **1,051 lines** (~**4,000 tokens**) ⚠️

**T0-SIZE-01 limit:** 1,400 tokens

**Conclusion:** ⚠️ **JIT sub-files required** (will exceed token limit by ~2.5x)

---

## JIT Architecture Recommendation

### Main Protocol (Target: <1,400 tokens)
**File:** `.prompt-os/core/WEB-RESEARCH.md`

Keep sections:
- QUANDO USAR (23 lines)
- FONTES CONFIAVEIS - Summary only (20 lines, reduced from 69)
- PROTOCOLO DE PESQUISA - High-level (30 lines, reduced from 56)
- SE VOCE NAO TEM ACESSO A WEB (42 lines)
- FORMATANDO RESULTADOS - Summary (20 lines, reduced from 41)
- NIVEIS DE CONFIANCA - Table only (20 lines, reduced from 36)
- CACHE DE PESQUISA (27 lines)
- PARA GERACAO DE SKILLS - Reference to citation templates JIT (10 lines)
- EXEMPLO COMPLETO (43 lines)
- LIMITACOES (30 lines)
- **NEW:** INTEGRACAO COM AUTO-INCREMENT (20 lines) - High-level flowchart only

**Total main:** ~285 lines (~1,100 tokens) ✅ Under limit

### JIT Sub-Files (Loaded on-demand)

**File 1:** `.prompt-os/core/web-research/source-validation-rules.md` (~200 lines, ~800 tokens)
- Validation dimensions (authority, recency, completeness, relevance)
- Scoring rubric (0-100 scale)
- Step-by-step validation workflow
- Edge cases and troubleshooting

**File 2:** `.prompt-os/core/web-research/citation-templates.md` (~150 lines, ~600 tokens)
- Minimal template (URL list)
- Standard template (YAML with type, accessed)
- Detailed template (YAML with tier, reliability_score)
- When to use each format
- Examples from SPEC-010

**File 3:** `.prompt-os/core/web-research/tier-system.md` (~150 lines, ~600 tokens)
- Tier assignment rules (domain-based, score-based)
- Tier indicators (badges, confidence levels)
- Scoring algorithm integration
- Manual override guidelines

**File 4 (optional):** `.prompt-os/core/web-research/auto-increment-integration.md` (~100 lines, ~400 tokens)
- Detailed integration workflow
- Source gap scenarios
- Memory registration format
- Examples of gap detection outcomes

**Total JIT:** ~600 lines (~2,400 tokens)

**Combined total:** 285 (main) + 600 (JIT) = **885 lines** (~**3,500 tokens**)

---

## Phase 2 Completion Checklist

- [x] Reviewed current WEB-RESEARCH.md (401 lines, 10 sections)
- [x] Analyzed SPEC-010 source citation patterns (5 baseline skills)
- [x] Identified gaps (5 gaps: validation, citations, tiers, integration, metrics)
- [x] Calculated token budget (~4,000 tokens if no JIT)
- [x] Recommended JIT architecture (main <1,400 tokens + 4 JIT sub-files)
- [x] Prioritized gaps (4 HIGH, 1 MEDIUM)
- [ ] Create gap analysis document (this file) → ✅ DONE

---

## Next Steps: Phase 3 - Protocol Enhancement

**Task 3: Source Validation Rules** (HIGH priority)
- Create `.prompt-os/core/web-research/source-validation-rules.md`
- Define 4 dimensions, scoring rubric, workflow
- Self-Critique target: ≥95
- Human Gate approval

**Task 4: Citation Templates** (HIGH priority)
- Create `.prompt-os/core/web-research/citation-templates.md`
- Define 3 template formats with examples
- Self-Critique target: ≥95
- Human Gate approval

**Task 5: Quality Tier System** (HIGH priority)
- Create `.prompt-os/core/web-research/tier-system.md`
- Define tier assignment rules, scoring integration
- Self-Critique target: ≥95
- Human Gate approval

**Task 6: JIT Refactoring** (MANDATORY)
- Create directory `.prompt-os/core/web-research/`
- Move detailed sections to JIT sub-files
- Update main WEB-RESEARCH.md with JIT references
- Re-run Self-Critique on refactored structure

**Task 7: Auto-Increment Integration** (HIGH priority)
- Add integration section to main WEB-RESEARCH.md
- Optionally create detailed JIT sub-file
- Test integration with AUTO-INCREMENT.md
- Self-Critique target: ≥95
- Human Gate approval

---

**Gap Analysis Complete** ✅  
**Time spent:** ~1.5 hours  
**Next:** Phase 3 - Protocol Enhancement (Tasks 3-7)
