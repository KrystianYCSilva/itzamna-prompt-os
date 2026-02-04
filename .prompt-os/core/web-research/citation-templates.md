# Citation Templates

**Protocol**: WEB-RESEARCH Enhancement  
**Version**: 2.2.0  
**Purpose**: Consistent, context-appropriate source citation across all skills and artifacts  
**Integration**: Main protocol → `.prompt-os/core/WEB-RESEARCH.md`

---

## Introduction

This document defines **3 citation template formats** (minimal, standard, detailed) for citing research sources in AI-generated skills, personas, and documentation. Each template balances completeness with readability, matching citation depth to research complexity.

**Why citation templates matter:**
- **Consistency**: T0-SOURCE-01 compliance requires citations, but format consistency improves readability
- **Context-Appropriate**: Simple skills need simple citations, research-heavy skills need detailed transparency
- **Traceability**: Proper citations enable verification and quality auditing
- **Reproducibility**: Standardized formats make retroactive validation possible

**Target**: 100% citation format consistency across all skills (SC-002 compliance).

---

## Template Overview

The system provides 3 citation formats, selected based on skill complexity and source profile:

| Format | Use Case | Fields | Example Context |
|--------|----------|--------|-----------------|
| **Minimal** | Baseline skills, 1-3 official sources, non-controversial | URL only (YAML array) | Python language baseline with 2 official docs |
| **Standard** | Integration skills, mixed sources, moderate complexity | url, type, accessed | Kubernetes deployment guide with docs + GitHub + Stack Overflow |
| **Detailed** | Research-heavy, controversial topics, low-tier sources | url, type, tier, reliability_score, accessed, notes | New framework comparison with blogs, personal sites, conflicting opinions |

**Selection Logic**:
```
IF baseline_skill AND sources ≤3 AND all_tier_1_2 → Minimal
ELSE IF mixed_sources OR sources ≥4 → Standard  
ELSE IF controversial_topic OR any_tier_4_5 → Detailed
```

**Migration Path**: 
- Existing SPEC-010 baseline skills already use minimal format (retroactive validation confirms 100% compliance)
- New skills choose format via selection guidelines
- Existing skills migrate to updated formats during next revision cycle (v2.3.0+)

---

## Minimal Format

### Use Cases

**When to use Minimal format:**
- Baseline language skills (e.g., Python, Java, JavaScript fundamentals)
- Official documentation is primary/only source
- Non-controversial, stable technology (no competing approaches)
- Source count ≤3
- All sources are Tier 1-2 (official docs, official repos)

**Examples of appropriate skills:**
- `python-basics`: Python 3 official docs + PEPs
- `java-17`: Java SE 17 docs + JEP specifications
- `kubernetes-basics`: kubernetes.io documentation only

### Format Specification

**Structure**: YAML array of URL strings (no object structure)

```yaml
sources:
  - <url1>
  - <url2>
  - <url3>
```

**Required Fields**:
- URL string (fully qualified, with protocol)

**Optional Fields**: None (this is the minimal format)

### Examples

#### Example 1: Language Baseline (2 sources)

```yaml
sources:
  - https://docs.python.org/3/
  - https://peps.python.org/
```

**Context**: Python language baseline skill covering syntax, built-in types, and core libraries.

---

#### Example 2: Framework Documentation (3 sources)

```yaml
sources:
  - https://reactjs.org/docs/getting-started.html
  - https://react.dev/learn
  - https://github.com/facebook/react
```

**Context**: React fundamentals skill using official documentation and official GitHub repository.

---

#### Example 3: Single Authoritative Source

```yaml
sources:
  - https://kubernetes.io/docs/concepts/
```

**Context**: Kubernetes core concepts skill using only official documentation (sufficient for foundational content).

---

### Guidelines

**DO use Minimal format when:**
- ✅ All sources are official documentation domains
- ✅ Technology is mature and stable (no rapid evolution)
- ✅ No conflicting information between sources
- ✅ Sources are universally recognized as authoritative

**DON'T use Minimal format when:**
- ❌ Sources include community blogs or personal sites
- ❌ Skill covers controversial or evolving practices
- ❌ Source quality varies significantly (mix of Tier 1 and Tier 4-5)
- ❌ Research date matters for currency validation (use Standard with `accessed` field)

**Benefits of Minimal format:**
- **Readability**: Clean, scannable list of URLs
- **Brevity**: No metadata overhead for simple skills
- **Backward Compatibility**: Matches SPEC-010 baseline pattern (no migration needed)

---

## Standard Format

### Use Cases

**When to use Standard format:**
- Integration skills combining multiple technologies
- Mixed source types (official docs + GitHub + Stack Overflow + blogs)
- Moderate research complexity (4+ sources)
- Source recency matters (fast-evolving frameworks, cloud services)
- All sources are Tier 1-3 (acceptable quality)

**Examples of appropriate skills:**
- `kubernetes-helm-deploy`: Official docs + Helm docs + GitHub examples + Stack Overflow troubleshooting
- `react-redux-integration`: React docs + Redux docs + community tutorials
- `aws-lambda-patterns`: AWS docs + serverless framework docs + blog posts

### Format Specification

**Structure**: YAML array of objects with `url`, `type`, and `accessed` fields

```yaml
sources:
  - url: <url>
    type: <source_type>
    accessed: <YYYY-MM-DD>
```

**Required Fields**:
- `url`: Fully qualified URL with protocol
- `type`: Source type classification (see type taxonomy below)
- `accessed`: ISO 8601 date (YYYY-MM-DD) when source was retrieved

**Optional Fields**: None (all 3 fields required for Standard format)

### Type Taxonomy

| Type Value | Description | Examples |
|------------|-------------|----------|
| `official_docs` | Official project documentation | kubernetes.io/docs, reactjs.org, python.org |
| `official_repo` | Official GitHub/GitLab repository | github.com/kubernetes/kubernetes |
| `github_community` | Community-maintained GitHub repo | Popular libraries, tools (>1k stars) |
| `stackoverflow` | Stack Overflow question/answer | stackoverflow.com/questions/... |
| `blog_company` | Company engineering blog | Netflix Tech Blog, Uber Engineering |
| `blog_personal` | Individual author blog | Martin Fowler, Kent C. Dodds |
| `tutorial` | Tutorial platform | Medium, Dev.to, freeCodeCamp |
| `specification` | Standards body specification | W3C, IETF, OWASP |

### Examples

#### Example 1: Integration Skill (Mixed Sources)

```yaml
sources:
  - url: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
    type: official_docs
    accessed: 2026-02-03
  - url: https://helm.sh/docs/intro/quickstart/
    type: official_docs
    accessed: 2026-02-03
  - url: https://github.com/kubernetes/examples/tree/master/staging/helm
    type: official_repo
    accessed: 2026-02-03
  - url: https://stackoverflow.com/questions/47848528/helm-chart-best-practices
    type: stackoverflow
    accessed: 2026-02-03
```

**Context**: Kubernetes + Helm deployment guide using official docs, official examples, and community troubleshooting.

---

#### Example 2: Cloud Service Skill (Recency Matters)

```yaml
sources:
  - url: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
    type: official_docs
    accessed: 2026-02-03
  - url: https://www.serverless.com/framework/docs
    type: official_docs
    accessed: 2026-02-03
  - url: https://aws.amazon.com/blogs/compute/best-practices-lambda/
    type: blog_company
    accessed: 2026-02-03
```

**Context**: AWS Lambda patterns skill using official AWS docs, Serverless framework docs, and AWS official blog.

---

#### Example 3: Framework Integration (4+ Sources)

```yaml
sources:
  - url: https://react.dev/learn
    type: official_docs
    accessed: 2026-02-03
  - url: https://redux.js.org/introduction/getting-started
    type: official_docs
    accessed: 2026-02-03
  - url: https://react-redux.js.org/introduction/quick-start
    type: official_docs
    accessed: 2026-02-03
  - url: https://github.com/reduxjs/redux-toolkit
    type: official_repo
    accessed: 2026-02-03
  - url: https://blog.isquaredsoftware.com/2021/06/redux-fundamentals/
    type: blog_personal
    accessed: 2026-02-03
```

**Context**: React + Redux integration skill using official docs from both ecosystems plus maintainer's blog.

---

### Guidelines

**DO use Standard format when:**
- ✅ Mixing official docs with community resources
- ✅ Source recency matters for validation (fast-evolving tech)
- ✅ Multiple technologies or frameworks involved
- ✅ 4+ sources cited
- ✅ Need to distinguish between official and community sources

**DON'T use Standard format when:**
- ❌ All sources are official docs only (use Minimal instead)
- ❌ Any sources are Tier 4-5 (use Detailed for transparency)
- ❌ Controversial topic with conflicting opinions (use Detailed)

**Benefits of Standard format:**
- **Transparency**: Source type helps assess credibility at a glance
- **Recency Tracking**: `accessed` date enables retroactive validation
- **Context**: Distinguishes official vs community sources

---

## Detailed Format

### Use Cases

**When to use Detailed format:**
- Research-heavy skills with extensive investigation
- Controversial or evolving topics (competing approaches, best practices debates)
- Any Tier 4-5 sources included (blogs, personal sites, unverified content)
- Mixed quality sources (need reliability scores for comparison)
- Requires explicit quality assessment and notes

**Examples of appropriate skills:**
- `microservices-vs-monolith`: Architectural debate with varied opinions
- `react-state-management`: Multiple approaches (Context, Redux, Zustand, Jotai) with pros/cons
- `ai-prompt-engineering`: Emerging field, many blogs, few official sources

### Format Specification

**Structure**: YAML array of objects with all validation metadata

```yaml
sources:
  - url: <url>
    type: <source_type>
    tier: <T1-T5>
    reliability_score: <0-100>
    accessed: <YYYY-MM-DD>
    notes: <quality_assessment>
```

**Required Fields**:
- `url`: Fully qualified URL
- `type`: Source type (same taxonomy as Standard format)
- `tier`: Quality tier from validation (T1-T5)
- `reliability_score`: Validation score (0-100) from source-validation-rules.md
- `accessed`: ISO 8601 date
- `notes`: Human-readable assessment (1-2 sentences)

### Examples

#### Example 1: Controversial Topic (Architectural Debate)

```yaml
sources:
  - url: https://martinfowler.com/articles/microservices.html
    type: blog_personal
    tier: T2
    reliability_score: 85
    accessed: 2026-02-03
    notes: "Authoritative overview by Martin Fowler (recognized expert), slightly dated (2014) but foundational"
  - url: https://stackoverflow.com/questions/11292215/microservices-vs-monolithic
    type: stackoverflow
    tier: T3
    reliability_score: 68
    accessed: 2026-02-03
    notes: "Community discussion with varied perspectives, accepted answer has 150+ votes"
  - url: https://medium.com/@user/why-we-moved-from-microservices
    type: tutorial
    tier: T4
    reliability_score: 52
    accessed: 2026-02-03
    notes: "Single company's experience, useful counterpoint but limited generalizability"
```

**Context**: Microservices architecture skill presenting multiple viewpoints on architectural trade-offs.

---

#### Example 2: Emerging Technology (Limited Official Sources)

```yaml
sources:
  - url: https://platform.openai.com/docs/guides/prompt-engineering
    type: official_docs
    tier: T1
    reliability_score: 95
    accessed: 2026-02-03
    notes: "Official OpenAI guidelines, authoritative for GPT models specifically"
  - url: https://www.promptingguide.ai/
    type: tutorial
    tier: T3
    reliability_score: 72
    accessed: 2026-02-03
    notes: "Community-curated guide with examples, well-maintained but not officially endorsed"
  - url: https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/
    type: blog_personal
    tier: T2
    reliability_score: 88
    accessed: 2026-02-03
    notes: "Research scientist blog (Lilian Weng at OpenAI), technically rigorous analysis"
```

**Context**: AI prompt engineering skill for emerging field where official docs are limited.

---

#### Example 3: Mixed Quality Sources (Research Synthesis)

```yaml
sources:
  - url: https://react.dev/learn/managing-state
    type: official_docs
    tier: T1
    reliability_score: 98
    accessed: 2026-02-03
    notes: "Official React docs, comprehensive state management overview"
  - url: https://redux.js.org/
    type: official_docs
    tier: T1
    reliability_score: 96
    accessed: 2026-02-03
    notes: "Redux official documentation, well-established state management library"
  - url: https://github.com/pmndrs/zustand
    type: github_community
    tier: T2
    reliability_score: 82
    accessed: 2026-02-03
    notes: "Popular alternative (25k+ stars), simpler API than Redux"
  - url: https://dev.to/user/choosing-state-management-2024
    type: tutorial
    tier: T4
    reliability_score: 48
    accessed: 2026-02-03
    notes: "Opinion piece comparing approaches, useful perspective but single author viewpoint"
```

**Context**: React state management comparison skill synthesizing multiple approaches with varying source quality.

---

### Guidelines

**DO use Detailed format when:**
- ✅ Any source is Tier 4-5 (reliability transparency required)
- ✅ Controversial topic with competing viewpoints
- ✅ Research synthesizes multiple approaches or philosophies
- ✅ Quality assessment critical for skill credibility
- ✅ Need to document source limitations or biases

**DON'T use Detailed format when:**
- ❌ All sources are Tier 1-2 and non-controversial (use Minimal/Standard instead)
- ❌ Overkill for simple skills (metadata overhead not justified)

**Benefits of Detailed format:**
- **Full Transparency**: Readers see exact quality scores and tiers
- **Quality Context**: Notes explain source limitations, strengths, biases
- **Audit Trail**: Complete validation metadata for retroactive review
- **Credibility**: Explicit quality assessment increases skill trustworthiness

---

## Selection Guidelines

### Decision Tree

```
START: Need to cite sources for new skill/artifact
  │
  ├─ Is this a baseline skill (language fundamentals, stable tech)?
  │  └─ YES → Are all sources Tier 1-2 (official docs/repos)?
  │     └─ YES → Are there ≤3 sources?
  │        └─ YES → Use MINIMAL format ✓
  │        └─ NO (4+ sources) → Use STANDARD format
  │     └─ NO (contains Tier 3-5) → Use DETAILED format
  │
  ├─ Is this a controversial/evolving topic?
  │  └─ YES → Use DETAILED format ✓
  │
  ├─ Do any sources have Tier 4-5 quality?
  │  └─ YES → Use DETAILED format ✓
  │
  ├─ Are sources mixed types (docs + GitHub + blogs)?
  │  └─ YES → Are all sources Tier 1-3?
  │     └─ YES → Use STANDARD format ✓
  │     └─ NO → Use DETAILED format
  │
  └─ Default: Use STANDARD format (safest middle ground)
```

### Quick Reference Table

| Scenario | Source Count | Tier Range | Topic Type | Recommended Format |
|----------|--------------|------------|------------|-------------------|
| Language baseline | 1-3 | T1-T2 | Stable | **Minimal** |
| Official docs only | Any | T1-T2 | Non-controversial | **Minimal** |
| Integration skill | 4+ | T1-T3 | Moderate complexity | **Standard** |
| Mixed sources | Any | T1-T3 | Any | **Standard** |
| Research synthesis | Any | T1-T5 (any T4-T5) | Any | **Detailed** |
| Controversial topic | Any | Any | Debated/evolving | **Detailed** |
| Emerging technology | Any | T2-T5 (limited T1) | Cutting-edge | **Detailed** |

### Edge Cases

**Edge Case 1: 3 sources, all Tier 1, but controversial topic**
→ Use **Detailed** (controversy overrides simplicity)

**Edge Case 2: 1 source, Tier 4 (personal blog)**
→ Use **Detailed** (tier trumps count, need transparency)

**Edge Case 3: 10 sources, all Tier 1-2, integration skill**
→ Use **Standard** (large count + mixed tech = standard, detailed overkill)

**Edge Case 4: Uncertain which format to use**
→ Default to **Standard** (safest middle ground, provides recency tracking without overwhelming detail)

---

## SPEC-010 Migration Guide

### Current State (SPEC-010 Baseline Skills)

**Observation**: All 5 SPEC-010 baseline skills (Python, Java, Kotlin, C/C++, JavaScript) currently use **Minimal format**:

```yaml
sources:
  - https://docs.python.org/3/
  - https://peps.python.org/
```

**Validation Status**: ✅ **100% compliant** (SC-002 requirement met)

### Migration Strategy

**No immediate migration needed** for SPEC-010 baseline skills:
- Minimal format is correct choice for these skills (official docs only, stable tech, ≤3 sources)
- Existing citations already consistent and appropriate
- Retroactive validation (Task T023) will confirm compliance without requiring changes

**Future Skills (v2.2.0+)**:
- **New baseline skills**: Continue using Minimal format
- **New integration skills**: Use Standard format with `accessed` dates
- **New research-heavy skills**: Use Detailed format with tier/score/notes

**Existing Skills Revision (v2.3.0+)**:
- When updating existing skills, apply selection guidelines to choose format
- If source profile changes (e.g., adding Stack Overflow example), upgrade format accordingly
- Document format changes in skill changelog

### Retroactive Validation Process (Task T023)

**Purpose**: Verify SPEC-010 baseline skills comply with Minimal format requirements

**Process**:
1. Load each baseline skill's `sources:` section
2. Verify format matches Minimal template (YAML array of URLs)
3. Run validation scoring on each URL (calculate tier/score)
4. Generate validation report with:
   - Citation format compliance: PASS/FAIL
   - Source quality scores (informational, not blocking)
   - Known issues (if any sources score <60, document for v2.3.0 revision)

**Expected Outcome**: 100% citation format compliance (all use Minimal correctly)

---

## Usage Examples

### Example: Choosing Format for New Skill

**Scenario**: Creating skill for "Docker Networking Patterns"

**Research Sources Collected**:
1. https://docs.docker.com/network/ (official Docker docs, Tier 1)
2. https://github.com/docker/labs/tree/master/networking (official Docker repo, Tier 1)
3. https://stackoverflow.com/questions/24319662/docker-networking-best-practices (Stack Overflow, Tier 3)
4. https://blog.docker.com/2016/12/understanding-docker-networking-drivers/ (company blog, Tier 2)

**Selection Process**:
- Source count: 4 (suggests Standard over Minimal)
- Tier range: T1-T3 (no Tier 4-5, so Detailed not required)
- Mixed source types: official docs + repo + SO + blog (suggests Standard)
- Controversial? No (established technology, clear best practices)

**Decision**: Use **Standard format**

**Result**:
```yaml
sources:
  - url: https://docs.docker.com/network/
    type: official_docs
    accessed: 2026-02-03
  - url: https://github.com/docker/labs/tree/master/networking
    type: official_repo
    accessed: 2026-02-03
  - url: https://stackoverflow.com/questions/24319662/docker-networking-best-practices
    type: stackoverflow
    accessed: 2026-02-03
  - url: https://blog.docker.com/2016/12/understanding-docker-networking-drivers/
    type: blog_company
    accessed: 2026-02-03
```

---

**Version**: 2.2.0  
**Last Updated**: 2026-02-03  
**Related**: `.prompt-os/core/WEB-RESEARCH.md`, `source-validation-rules.md`, `tier-system.md`

