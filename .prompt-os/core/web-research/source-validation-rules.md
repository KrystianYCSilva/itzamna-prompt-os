---
name: core-web-research-source-validation-rules
description: "Source Validation Rules"
---

# Source Validation Rules

**Protocol**: WEB-RESEARCH Enhancement  
**Version**: 2.2.0  
**Purpose**: Objective, reproducible source quality assessment  
**Integration**: Main protocol → `.prompt-os/core/WEB-RESEARCH.md`

---

## Introduction

This document defines formal validation rules for assessing research source quality using a **4-dimension scoring rubric**. The rubric produces objective, reproducible scores (0-100 scale) that enable consistent source quality assessment across all AI agent research sessions.

**Why validation matters:**
- Prevents reliance on outdated or unreliable sources
- Enables objective comparison between sources
- Supports tier-based source classification (T1-T5)
- Triggers gap detection when source quality is insufficient
- Ensures research credibility and reproducibility

**Target consistency**: Scores should remain within **±5 points** when the same source is validated multiple times (SC-001 compliance).

---

## Purpose

**Primary Use Cases:**
1. **Source Quality Assessment**: Validate each research source during skill/persona creation
2. **Tier Assignment**: Calculate scores to determine quality tiers (T1-T5)
3. **Gap Detection**: Identify missing high-quality sources, outdated content, or insufficient coverage
4. **Citation Selection**: Choose appropriate citation template based on source profile
5. **Retroactive Validation**: Test existing skills against new quality standards

**When to apply:**
- During WEB-RESEARCH protocol execution (Phase 2: Validate Sources)
- Before generating skills with cited sources
- When reviewing source quality for existing artifacts
- After identifying potential source gaps (AUTO-INCREMENT integration)

---

## 4-Dimension Overview

The validation rubric evaluates sources across 4 independent dimensions, each contributing a weighted percentage to the overall score:

| Dimension | Weight | Max Points | Focus |
|-----------|--------|------------|-------|
| **Authority** | 40% | 40 | Source credibility, domain reputation, organizational backing |
| **Recency** | 30% | 30 | Content freshness, last updated date, relevance to current tech landscape |
| **Completeness** | 20% | 20 | Depth of coverage, practical examples, edge case handling |
| **Relevance** | 10% | 10 | Topic alignment, keyword matching, contextual fit for research goal |

**Overall Score Calculation:**
```
Overall Score = Authority + Recency + Completeness + Relevance
Range: 0-100 points
```

**Design Rationale:**
- **Authority weighted highest (40%)**: Source credibility is most critical for research reliability
- **Recency second (30%)**: Outdated information is dangerous in fast-evolving technology domains
- **Completeness third (20%)**: Practical examples and depth increase source utility
- **Relevance last (10%)**: Even tangential sources can be valuable if highly authoritative

**Reproducibility Target**: Scores should vary by ≤5 points when re-validating the same source (accounts for subjective judgment in borderline cases).

---

## Authority Dimension (40 points max)

**Definition**: Authority measures source credibility based on domain reputation, organizational backing, community trust, and author expertise.

**Scoring Thresholds:**

| Condition | Points | Examples | Recognition Criteria |
|-----------|--------|----------|---------------------|
| **Official documentation domain** | 40 | kubernetes.io/docs, reactjs.org, python.org, go.dev | Primary docs hosted on official project domain |
| **Official organization** | 35 | CNCF, W3C, OWASP, IEEE, Apache Foundation | Standards bodies, tech consortiums, foundations |
| **Official GitHub repository** | 30 | github.com/facebook/react, github.com/kubernetes/kubernetes | Repository owned by project maintainers |
| **Popular GitHub (>5k stars, active)** | 25 | Community projects with strong adoption | 5k+ stars, commits in last 3 months |
| **Popular GitHub (>1k stars)** | 20 | Well-known community projects | 1k+ stars, established project |
| **Stack Overflow (accepted, high score)** | 15 | Verified community answers | Accepted answer or score >50 |
| **Recognized tech blog** | 10 | Martin Fowler, Kent C. Dodds, company engineering blogs | Known author or reputable company blog |
| **General tutorial site** | 5 | Medium, Dev.to, personal tech blogs | Community platforms, personal blogs |
| **Unknown/personal blog** | 0-3 | No established reputation | New or unverified sources |

**Evaluation Guidelines:**

1. **Official Domains (40 pts)**: Check if URL matches project's official documentation domain
   - Examples: `kubernetes.io/docs`, `reactjs.org`, `python.org/3/library`
   - Verify domain ownership if uncertain (WHOIS, GitHub org links)

2. **Organizations (35 pts)**: Recognize standards bodies and tech foundations
   - CNCF projects (kubernetes, prometheus, helm)
   - W3C specifications (HTML, CSS, Web APIs)
   - OWASP security guidelines
   - IEEE standards
   - Apache Software Foundation projects

3. **GitHub Authority (20-30 pts)**: Evaluate based on ownership and popularity
   - **30 pts**: Repository owned by official project maintainers (check org name matches project)
   - **25 pts**: Community project with >5k stars AND recent activity (<3 months)
   - **20 pts**: Established projects with >1k stars

4. **Community Authority (10-15 pts)**:
   - **15 pts**: Stack Overflow accepted answers or score >50
   - **10 pts**: Recognized individual authors (Martin Fowler, Kent C. Dodds, etc.) or company blogs (Netflix Tech Blog, Uber Engineering)

5. **Low Authority (0-5 pts)**:
   - **5 pts**: General tutorial platforms (Medium, Dev.to) with decent engagement
   - **0-3 pts**: Unknown personal blogs, unverified sources

**Borderline Cases:**
- **.io domains without official status**: Award based on organization credibility, not domain extension (e.g., `kubernetes.io` = 40 pts, `random-tutorial.io` = 5 pts)
- **Archived GitHub projects**: Reduce score by 5 pts if repository is archived (no active maintenance)
- **Corporate blogs**: Award 10 pts only if from recognized tech company with public engineering culture

---

## Recency Dimension (30 points max)

**Definition**: Recency measures content freshness based on last updated date, accounting for technology evolution speed and content stability.

**Scoring Thresholds:**

| Condition | Points | Rationale | Application Context |
|-----------|--------|-----------|---------------------|
| **Updated <1 month ago** | 28-30 | Extremely current | Fast-evolving tech (frameworks, cloud services) |
| **Updated 1-3 months ago** | 25-27 | Very current | Active development tools (libraries, APIs) |
| **Updated 3-6 months ago** | 20-24 | Reasonably current | Stable technology with regular updates |
| **Updated 6-12 months ago** | 15-19 | Moderately current | Mature tech, may miss recent changes |
| **Updated 1-2 years ago** | 5-14 | Aging content | Likely outdated for fast-evolving tech |
| **Updated >2 years ago** | 0-4 | Likely outdated | High risk of obsolete information |

**Evaluation Guidelines:**

1. **Determine Last Updated Date**:
   - Check "Last updated" or "Last modified" timestamp on page
   - For GitHub repositories: Check last commit date on main branch
   - For Stack Overflow: Check answer post date or last edit date
   - For documentation: Check page footer or changelog for version date

2. **Calculate Age**:
   ```
   Age = Current Date - Last Updated Date
   ```
   - Current Date: Use research session date (e.g., 2026-02-03)
   - Express age in days, convert to months/years for threshold matching

3. **Apply Context Adjustment**:
   - **Fast-Evolving Tech** (full recency scoring): JavaScript frameworks (React, Vue), cloud services (AWS, Azure), DevOps tools (Kubernetes, Docker)
   - **Moderate Evolution** (add +5 pts tolerance): Programming language features, database systems, web standards
   - **Stable Foundations** (add +10 pts tolerance): Design patterns, algorithms, architectural concepts, SOLID principles

4. **Scoring Examples**:
   - React hooks documentation updated 15 days ago → **28-30 pts** (fast-evolving, extremely current)
   - Python asyncio tutorial from 8 months ago → **15-19 pts** (moderate evolution, but showing age)
   - Design patterns article from 3 years ago → **10 pts** (stable foundation, +10 tolerance → 0 + 10 = 10 pts)
   - Kubernetes v1.28 docs from 2023 → **0-4 pts** (2+ years old, version-specific, outdated)

**Special Cases:**

- **Timeless Content**: Award **20 pts minimum** for foundational concepts (e.g., SOLID principles, Big-O notation, HTTP fundamentals) regardless of age, if content remains accurate
- **Version-Specific Docs**: Penalize heavily if specific version is outdated (e.g., Kubernetes 1.18 docs from 2020 → 0 pts, even if official)
- **Archived Content**: Award **0 pts** if explicitly marked as archived or deprecated

**Borderline Judgment**:
- If exact update date unknown, estimate based on surrounding context (comments, related pages, copyright year)
- For ranges (e.g., 28-30 pts), use higher end if clearly up-to-date, middle if uncertain, lower end if signs of minor staleness

---

## Completeness Dimension (20 points max)

**Definition**: Completeness measures depth of coverage, including theoretical explanations, practical examples, code samples, edge case handling, and actionable guidance.

**Scoring Thresholds:**

| Condition | Points | Indicators | Content Quality |
|-----------|--------|------------|-----------------|
| **Comprehensive** | 18-20 | Theory + code + examples + edge cases + troubleshooting | Full tutorial, definitive guide |
| **Good** | 15-17 | Theory + practical examples + working code | Solid how-to guide |
| **Moderate** | 10-14 | Theory + basic example | Hello World level, intro tutorial |
| **Basic** | 5-9 | Theory only, no code | Conceptual overview, glossary |
| **Minimal** | 0-4 | Surface-level, incomplete, vague | Stub article, placeholder content |

**Evaluation Guidelines:**

1. **Comprehensive (18-20 pts)** - Contains ALL of:
   - ✅ Theoretical explanation (what it is, why it matters)
   - ✅ Step-by-step implementation guide
   - ✅ Multiple working code examples
   - ✅ Edge case handling (common pitfalls, error scenarios)
   - ✅ Troubleshooting section or FAQ
   - ✅ Best practices and anti-patterns

   **Example**: Kubernetes StatefulSets guide with YAML examples, volume mounting, scaling strategies, failure recovery, and production recommendations.

2. **Good (15-17 pts)** - Contains MOST of:
   - ✅ Clear explanation of concept
   - ✅ At least 2 working code examples
   - ✅ Practical use cases demonstrated
   - ⚠️ May lack edge case details or troubleshooting

   **Example**: React hooks tutorial with useState, useEffect examples, and common patterns, but no error handling examples.

3. **Moderate (10-14 pts)** - Contains SOME of:
   - ✅ Basic explanation
   - ✅ Single "Hello World" example
   - ⚠️ Lacks depth, advanced use cases, or edge cases

   **Example**: Docker intro with single `docker run` command, no multi-container or networking examples.

4. **Basic (5-9 pts)** - Contains ONLY:
   - ✅ Conceptual overview or definition
   - ❌ No code samples
   - ❌ No practical guidance

   **Example**: API documentation with endpoint descriptions but no request/response examples.

5. **Minimal (0-4 pts)**:
   - Incomplete or placeholder content
   - Vague explanations without specifics
   - Broken or missing code examples

**Scoring Modifiers:**

- **Add +2 pts**: If includes video demonstration or interactive examples
- **Subtract -3 pts**: If code examples have errors or won't run
- **Subtract -2 pts**: If critical steps missing (e.g., setup prerequisites not mentioned)

---

## Relevance Dimension (10 points max)

**Definition**: Relevance measures how well source content aligns with the specific research topic, keywords, and contextual needs of the current task.

**Scoring Thresholds:**

| Condition | Points | Match Quality | Coverage Scope |
|-----------|--------|---------------|----------------|
| **Perfect match** | 9-10 | Directly addresses research topic | 90-100% scope coverage |
| **Strong match** | 7-8 | Most keywords present, topic aligned | 70-90% scope coverage |
| **Moderate match** | 5-6 | Some keywords, related topic | 40-70% scope coverage |
| **Weak match** | 2-4 | Few keywords, tangential relation | 10-40% scope coverage |
| **Irrelevant** | 0-1 | Off-topic, no meaningful overlap | <10% scope coverage |

**Evaluation Guidelines:**

1. **Perfect Match (9-10 pts)**:
   - Source title/headline directly mentions research topic
   - All primary keywords present in content
   - Content scope perfectly aligned with research need

   **Example**: Researching "Kubernetes pod networking" → Finding official "Pod Networking" documentation from kubernetes.io

2. **Strong Match (7-8 pts)**:
   - Source covers research topic as primary focus
   - Most (70%+) keywords present
   - May include additional related topics

   **Example**: Researching "React state management" → Finding "React Hooks and State" tutorial (includes state management + broader hooks context)

3. **Moderate Match (5-6 pts)**:
   - Source covers research topic as one of several topics
   - Some (40-70%) keywords present
   - Requires extracting relevant sections from broader content

   **Example**: Researching "Docker networking" → Finding "Docker Complete Guide" (networking is Chapter 5 of 10)

4. **Weak Match (2-4 pts)**:
   - Source mentions research topic tangentially
   - Few (<40%) keywords present
   - Related but not directly applicable

   **Example**: Researching "PostgreSQL indexing strategies" → Finding "Database Performance Tuning" article that mentions indexing briefly

5. **Irrelevant (0-1 pts)**:
   - Source does not address research topic
   - Wrong technology, wrong context, or completely off-topic

   **Example**: Researching "React components" → Finding "Angular directives" tutorial

**Contextual Adjustments:**

- **Research Goal Matters**: For skill creation, prioritize practical implementation guides (9-10 pts). For conceptual learning, broader surveys acceptable (7-8 pts).
- **Keyword Density**: Count unique keyword occurrences, not total mentions (3 mentions of "Kubernetes" = 1 keyword)
- **Section Relevance**: If only one section of long article is relevant, reduce score by 2-3 pts

**Example Evaluation**:
```
Research Topic: "Kubernetes persistent volumes"
Source: "Kubernetes Storage Explained: Volumes, PVs, PVCs, and StorageClasses"

Keywords Found: kubernetes (✓), volumes (✓), persistent (✓), PV (✓), PVC (✓)
Coverage: All aspects of persistent volumes covered (100%)
Score: 10/10 (perfect match)
```

---

## Worked Examples

### Example 1: High-Quality Official Documentation (Tier 1)

**Source**: `https://kubernetes.io/docs/concepts/overview/`

**Research Context**:
- Topic: Kubernetes architecture
- Keywords: pods, nodes, cluster, control plane
- Session Date: 2026-02-03

**Validation Scoring**:

| Dimension | Score | Justification |
|-----------|-------|---------------|
| **Authority** | 40/40 | Official Kubernetes documentation domain (kubernetes.io/docs) |
| **Recency** | 28/30 | Last updated 15 days ago (2026-01-19), extremely current |
| **Completeness** | 18/20 | Comprehensive coverage: theory + diagrams + YAML examples + best practices. Minor: lacks troubleshooting section |
| **Relevance** | 9/10 | Perfect keyword match (pods, nodes, cluster all present), directly addresses topic |
| **Overall** | **95/100** | Sum of all dimensions |

**Tier Assignment**: **Tier 1** (🟢 Official, highly reliable)  
**Confidence**: ✓✓✓ (High)  
**Conflicts**: None

**Interpretation**: Excellent source - official, current, comprehensive, and directly relevant. Safe to use as primary source.

---

### Example 2: Low-Quality Outdated Blog Post (Tier 5)

**Source**: `https://medium.com/@random-author/kubernetes-intro-2020`

**Research Context**:
- Topic: Kubernetes architecture basics
- Keywords: kubernetes, pods, basics
- Session Date: 2026-02-03

**Validation Scoring**:

| Dimension | Score | Justification |
|-----------|-------|---------------|
| **Authority** | 10/40 | General tutorial site (Medium), no recognized author credentials |
| **Recency** | 0/30 | Published in 2020 (6 years ago), no updates, likely outdated for fast-evolving Kubernetes |
| **Completeness** | 10/20 | Moderate: Basic explanation + single pod example, no advanced use cases or edge cases |
| **Relevance** | 8/10 | Keywords present (kubernetes, pods), covers basics as requested |
| **Overall** | **28/100** | Sum of all dimensions |

**Tier Assignment**: **Tier 5** (🔴 Poor, avoid or use with extreme caution)  
**Confidence**: ⚠ (Low)  
**Conflicts**: None

**Interpretation**: Unreliable source - low authority, severely outdated (6 years for Kubernetes is critical), minimal depth. Should be replaced with official documentation or recent tutorials.

---

### Example 3: Conflict Case - Official Domain but Low Score (Tier 3)

**Source**: `https://some-project.io/deprecated-guide`

**Research Context**:
- Topic: Legacy API usage patterns
- Keywords: API, authentication, v1
- Session Date: 2026-02-03

**Validation Scoring**:

| Dimension | Score | Justification |
|-----------|-------|---------------|
| **Authority** | 35/40 | `.io` domain suggests official project (official organization), but -5 pts for "deprecated" label |
| **Recency** | 4/30 | Marked as deprecated, last updated 3 years ago (2023-02-01), very outdated |
| **Completeness** | 10/20 | Basic examples, no migration guide to current API |
| **Relevance** | 9/10 | Directly addresses API authentication topic |
| **Overall** | **58/100** | Sum of all dimensions |

**Domain Pattern Check**: `.io` domain → Suggests Tier 1 (official)  
**Score-Based Tier**: 58/100 → Tier 3 (60-79 range)  

**Tier Assignment**: **Tier 3** (🟡 Good, acceptable for most uses)  
**Conflict Resolution**: Score-based precedence applied (score assigns Tier 3, overriding domain pattern)  
**Conflicts**: `[CONFLICT] Domain pattern suggests Tier 1 (official .io domain), but score assigns Tier 3 (58/100). Score precedence applied.`

**Interpretation**: Conflicting signals - official domain but outdated/deprecated content. Score correctly reflects current utility (Tier 3). Should be used with caution and supplemented with current docs. Flag for manual review.

---

## Validation Workflow

**When to Validate**: During WEB-RESEARCH protocol Phase 2, after collecting research sources and before generating artifacts (skills, personas, documentation).

### Step-by-Step Workflow

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: Validate Sources (WEB-RESEARCH Protocol)          │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Gather Source Metadata                             │
│ ───────────────────────────────────────────────────────────│
│ For each source URL:                                        │
│ - Fetch page/repository                                     │
│ - Extract: domain, last updated date, content depth        │
│ - Identify: keywords, code examples, organization backing   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Calculate 4-Dimension Scores                       │
│ ───────────────────────────────────────────────────────────│
│ Authority (0-40):   Match domain against official list,    │
│                     check GitHub stars, identify org        │
│ Recency (0-30):     Calculate age (current - last updated) │
│ Completeness (0-20): Assess depth (theory/code/examples)   │
│ Relevance (0-10):   Count keyword matches, measure coverage│
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Calculate Overall Score                            │
│ ───────────────────────────────────────────────────────────│
│ Overall = Authority + Recency + Completeness + Relevance   │
│ Range: 0-100 points                                         │
│                                                             │
│ Example: 40 + 28 + 18 + 9 = 95/100                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Assign Quality Tier Based on Score                 │
│ ───────────────────────────────────────────────────────────│
│ 90-100 → Tier 1 🟢 (Official, highly reliable)             │
│ 80-89  → Tier 2 🔵 (Very good, minor limitations)          │
│ 60-79  → Tier 3 🟡 (Good, acceptable for most uses)        │
│ 40-59  → Tier 4 🟠 (Fair, needs corroboration)             │
│ 0-39   → Tier 5 🔴 (Poor, avoid or use with caution)       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Check for Conflicts & Emit Structured Log          │
│ ───────────────────────────────────────────────────────────│
│ Conflict Check:                                             │
│ - IF domain pattern suggests different tier than score     │
│ - THEN flag: "[CONFLICT] Domain suggests TX, score TY"     │
│ - APPLY score-based precedence (score wins)                │
│                                                             │
│ Emit Structured Log (FR-011):                               │
│ [2026-02-03T14:30:00Z] WEB-RESEARCH-VALIDATION |           │
│   sources=3 | avg_score=78.5 | gaps=["missing_T1"] |       │
│   time=45s | conflicts=1                                    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ OUTPUT: Validation Results                                  │
│ ───────────────────────────────────────────────────────────│
│ For each source:                                            │
│ - url, overall_score, tier, confidence, dimension_scores    │
│ - conflicts[] (if any), notes                               │
│                                                             │
│ Aggregate statistics:                                       │
│ - sources_count, avg_score, tier_distribution               │
│ - validation_time_seconds                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
      ┌────────────────────┴────────────────────┐
      │                                         │
      ▼                                         ▼
┌─────────────────┐                  ┌──────────────────────┐
│ Gap Detection   │                  │ Citation Template    │
│ (US4)           │                  │ Selection (US2)      │
│ Check triggers  │                  │ Choose format based  │
│ (AUTO-INCREMENT)│                  │ on source profile    │
└─────────────────┘                  └──────────────────────┘
```

### Workflow Notes

1. **Automation Level**: This workflow is semi-automated - AI agents follow steps but may need human input for:
   - Borderline score judgments (e.g., 28 vs 30 pts for recency)
   - Conflict resolution decisions
   - Gap detection responses ("Research more | Defer | Accept limitation")

2. **Performance**: Typical validation time per source: 10-15 seconds (fetch + score + log)

3. **Error Handling**:
   - **Source unreachable**: Assign Authority=0, flag for manual review
   - **Metadata missing**: Use conservative estimates (e.g., assume >2 years if no date → Recency=0)
   - **Ambiguous authority**: Default to lower tier, flag for human judgment

4. **Integration Points**:
   - **Before**: WEB-RESEARCH Phase 1 (Topic Research) must complete first
   - **After**: Results feed into Citation Template Selection (US2) and Gap Detection (US4)
   - **Parallel**: Can validate multiple sources concurrently (parallelizable at source level)

---

## Conflict Resolution

**Conflict Scenario**: When domain patterns suggest one tier but validation score suggests a different tier.

### Resolution Algorithm

```
IF domain_pattern_tier != score_based_tier:
  1. APPLY score-based precedence (score determines final tier)
  2. FLAG conflict in validation_result.conflicts[]
  3. ADD note: "[CONFLICT] Domain suggests T{X}, score assigns T{Y}. Score precedence applied."
  4. SET confidence to ⚠ (Low) regardless of score
  5. RECOMMEND human review for edge case assessment
```

### Rationale for Score Precedence

**Why score wins over domain pattern:**
- Scores reflect actual content quality (recency, completeness, relevance)
- Domain patterns are heuristics, not guarantees (e.g., official domains can host outdated content)
- Reproducibility: Scores are objective calculations, domain patterns require subjective pattern matching

### Example Conflict Cases

| Domain Pattern | Score | Domain Suggests | Score Suggests | Final Tier | Reasoning |
|----------------|-------|-----------------|----------------|------------|-----------|
| `kubernetes.io/v1.10/` | 45 | Tier 1 (official) | Tier 4 (40-59) | **Tier 4** 🟠 | Outdated version (v1.10 from 2018), low recency score |
| `unknown-blog.com` | 92 | Tier 5 (unknown) | Tier 1 (90-100) | **Tier 1** 🟢 | Exceptional content quality despite unknown domain |
| `github.com/user/repo` | 58 | Tier 2 (GitHub) | Tier 3 (60-79) | **Tier 3** 🟡 | Personal repo with low stars, moderate content |

### Human Review Triggers

**Automatically flag for human review when:**
- Conflict severity ≥2 tiers (e.g., domain suggests T1, score suggests T4+)
- Score is borderline (58-62, 78-82, 88-92) AND conflict exists
- Authority dimension has <10 pts but Completeness ≥15 pts (high-quality content from unknown source)

**Human Review Prompt Example:**
```
⚠️ Tier conflict detected:
Source: https://some-project.io/deprecated-guide
Domain Pattern: Tier 1 (official .io domain)
Score-Based: Tier 3 (58/100 - outdated, deprecated)

Current Assignment: Tier 3 (score precedence applied)

Do you want to:
1. Accept Tier 3 (recommended)
2. Override to Tier 1 (trust domain pattern)
3. Downgrade to Tier 4 (extra caution for deprecated content)
```

---

## Usage Guidelines

### When to Skip Validation

Validation can be skipped in these scenarios:
- **Foundational/Evergreen Content**: Design patterns, algorithms, mathematical proofs (recency less critical)
- **Historical Research**: Intentionally researching legacy systems or deprecated approaches
- **Internal Documentation**: Company-internal wikis where authority is already established

**If skipping**: Document reasoning in citation notes (e.g., "Historical reference, validation skipped").

### Integration with Other Protocols

1. **AUTO-INCREMENT Integration**: After validation, trigger gap detection if:
   - 0 Tier 1 sources found (missing_official_docs gap)
   - All sources >2 years old (outdated_sources gap)
   - <2 total sources (insufficient_coverage gap)
   - All sources score <50 (low_reliability gap)

2. **Citation Template Selection**: Use validation results to choose template:
   - All Tier 1-2 sources → Minimal format
   - Mixed Tier 1-3 sources → Standard format
   - Any Tier 4-5 sources → Detailed format (with reliability scores)

3. **SELF-CRITIQUE Integration**: Include validation statistics in self-critique:
   - Average source score
   - Tier distribution
   - Conflict count

---

**Version**: 2.2.0  
**Last Updated**: 2026-02-03  
**Related**: `.prompt-os/core/WEB-RESEARCH.md`, `citation-templates.md`, `tier-system.md`, `gap-detection.md`

