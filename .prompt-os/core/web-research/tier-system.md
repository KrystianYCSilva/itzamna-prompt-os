---
name: core-web-research-tier-system
description: "Tier System"
---

# Tier System

**Protocol**: WEB-RESEARCH Enhancement  
**Version**: 2.2.0  
**Purpose**: Automatic source quality classification with visual indicators  
**Integration**: Main protocol → `.prompt-os/core/WEB-RESEARCH.md`

---

## Introduction

This document defines a **5-tier quality classification system** (T1-T5) for research sources, combining domain pattern recognition with validation score thresholds. The system enables automatic tier assignment with visual indicators (🟢🔵🟡🟠🔴) and confidence levels (✓✓✓, ✓✓, ✓, ⚠, 🚫).

**Why tier classification matters:**
- **Priority Guidance**: Helps agents prioritize high-quality sources during research
- **At-a-Glance Quality**: Visual indicators provide instant quality assessment
- **Citation Depth**: Tier distribution influences citation template selection
- **Gap Detection**: Missing Tier 1 sources triggers AUTO-INCREMENT integration
- **Retroactive Validation**: Enables quality tracking across all skills

**Assignment Method**: Score-based precedence (validation score determines tier, domain patterns provide secondary heuristics).

---

## Tier Definitions

### Tier 1: Official Documentation (🟢 Highly Reliable)

**Score Range**: 90-100 points  
**Visual Badge**: 🟢 (Green circle)  
**Confidence**: ✓✓✓ (High)  
**Label**: "Official, highly reliable"

**Characteristics**:
- Official project documentation hosted on official domains
- Maintained by core project teams or standards organizations
- Authoritative, canonical, primary sources
- Regularly updated to match current releases
- Comprehensive coverage with official examples

**Examples**:
- `kubernetes.io/docs` - Kubernetes official documentation
- `python.org/3/library` - Python standard library docs
- `reactjs.org` / `react.dev` - React official documentation
- `w3.org/TR/` - W3C web standards specifications
- `golang.org/doc` - Go programming language docs

**When to assign Tier 1**:
- Validation score ≥90 points
- Domain matches official documentation pattern (see Domain Pattern Registry)
- Content is maintained by official project maintainers

---

### Tier 2: Official Repositories & Organizations (🔵 Very Good)

**Score Range**: 80-89 points  
**Visual Badge**: 🔵 (Blue circle)  
**Confidence**: ✓✓ (Medium-High)  
**Label**: "Very good, minor limitations"

**Characteristics**:
- Official GitHub/GitLab repositories owned by project maintainers
- Standards body publications (IETF, IEEE, OWASP)
- Major tech company engineering blogs (Google, Netflix, Uber)
- Popular community projects (>5k stars, active maintenance)
- High authority but may have slight age or completeness gaps

**Examples**:
- `github.com/kubernetes/kubernetes` - Official Kubernetes repository
- `github.com/facebook/react` - Official React repository
- `owasp.org/www-project-top-ten` - OWASP security guidelines
- `netflixtechblog.com` - Netflix engineering blog
- `github.com/axios/axios` (65k+ stars) - Popular HTTP client

**When to assign Tier 2**:
- Validation score 80-89 points
- Official repositories or recognized organizations
- High community trust (GitHub stars, citations)

---

### Tier 3: Community Resources & Tutorials (🟡 Good)

**Score Range**: 60-79 points  
**Visual Badge**: 🟡 (Yellow circle)  
**Confidence**: ✓ (Medium)  
**Label**: "Good, acceptable for most uses"

**Characteristics**:
- High-quality community tutorials and guides
- Stack Overflow accepted answers with high scores
- Well-maintained community GitHub projects (>1k stars)
- Recognized individual author blogs (Martin Fowler, Kent C. Dodds)
- Tutorial platforms with good engagement (freeCodeCamp, Dev.to)
- May lack official endorsement but content quality is solid

**Examples**:
- `stackoverflow.com/questions/...` (accepted answer, 100+ votes)
- `martinfowler.com/articles/microservices.html` - Authoritative blog
- `github.com/community/popular-library` (5k stars) - Community tool
- `freecodecamp.org/news/...` - Comprehensive tutorials
- `kentcdodds.com/blog` - Recognized React expert

**When to assign Tier 3**:
- Validation score 60-79 points
- Community resources with good reputation
- Content quality verified through peer validation (votes, stars, citations)

---

### Tier 4: Personal Blogs & Lower-Authority Sources (🟠 Fair)

**Score Range**: 40-59 points  
**Visual Badge**: 🟠 (Orange circle)  
**Confidence**: ⚠ (Low-Medium)  
**Label**: "Fair, needs corroboration"

**Characteristics**:
- Personal blogs without established reputation
- Medium posts by unknown authors
- Stack Overflow questions without accepted answers
- GitHub projects with <1k stars or inactive maintenance
- Outdated content from previously authoritative sources
- Requires corroboration with higher-tier sources

**Examples**:
- `medium.com/@unknown-author/tutorial` - Personal Medium post
- `personal-blog.com/tech-post` - Individual developer blog (no reputation)
- `stackoverflow.com/questions/...` (no accepted answer, low votes)
- `github.com/user/small-repo` (100 stars, last commit 1 year ago)
- Official docs from 3+ years ago (version-specific, outdated)

**When to assign Tier 4**:
- Validation score 40-59 points
- Source authority questionable or unknown
- Content may be useful but requires verification

**Usage Guidance**: Use Tier 4 sources only when:
- Supplementing higher-tier sources (not as primary source)
- Specific use case not covered elsewhere
- Explicitly documented with reliability score in detailed citations

---

### Tier 5: Unreliable or Severely Outdated (🔴 Poor)

**Score Range**: 0-39 points  
**Visual Badge**: 🔴 (Red circle)  
**Confidence**: 🚫 (Very Low)  
**Label**: "Poor, avoid or use with extreme caution"

**Characteristics**:
- Unknown sources with no credibility indicators
- Severely outdated content (>5 years for fast-evolving tech)
- Broken or incomplete content
- Content farms, low-quality tutorial mills
- Personal projects with no community validation
- Deprecated or archived official content

**Examples**:
- `random-blog.com/post-from-2015` - 9-year-old tutorial
- `sketchy-tutorials.com/learn-react` - Content farm site
- `github.com/user/abandoned-repo` (archived, no stars)
- Official docs explicitly marked as deprecated
- Medium posts with minimal engagement (0 claps, 1 view)

**When to assign Tier 5**:
- Validation score <40 points
- Source credibility cannot be established
- Content is demonstrably outdated or incorrect

**Usage Guidance**: **Avoid Tier 5 sources** unless:
- Historical research (intentionally studying legacy approaches)
- No alternative sources exist (document as known limitation)
- Used as counterexample or cautionary tale

---

## Domain Pattern Registry

**Purpose**: Fast-path tier assignment for known official domains before full validation scoring.

**Usage**: Check if source URL matches any official domain pattern below. If match found, **suggest** tier (but score-based assignment takes precedence if conflict occurs).

### Frontend Frameworks

| Technology | Official Domains | Suggested Tier |
|------------|------------------|----------------|
| React | `reactjs.org`, `react.dev` | T1 |
| Vue.js | `vuejs.org` | T1 |
| Angular | `angular.io` | T1 |
| Next.js | `nextjs.org` | T1 |
| Svelte | `svelte.dev` | T1 |

### Backend Languages & Frameworks

| Technology | Official Domains | Suggested Tier |
|------------|------------------|----------------|
| Node.js | `nodejs.org` | T1 |
| Python | `python.org`, `docs.python.org` | T1 |
| Go | `golang.org`, `go.dev` | T1 |
| Rust | `rust-lang.org` | T1 |
| Java | `docs.oracle.com/javase`, `openjdk.org` | T1 |
| C# / .NET | `docs.microsoft.com/dotnet` | T1 |
| Ruby | `ruby-lang.org` | T1 |
| PHP | `php.net` | T1 |

### DevOps & Cloud Platforms

| Technology | Official Domains | Suggested Tier |
|------------|------------------|----------------|
| Kubernetes | `kubernetes.io` | T1 |
| Docker | `docker.com`, `docs.docker.com` | T1 |
| AWS | `docs.aws.amazon.com`, `aws.amazon.com/documentation` | T1 |
| Azure | `docs.microsoft.com/azure`, `azure.microsoft.com/documentation` | T1 |
| GCP | `cloud.google.com/docs` | T1 |
| Terraform | `terraform.io`, `developer.hashicorp.com/terraform` | T1 |
| Helm | `helm.sh` | T1 |

### Databases

| Technology | Official Domains | Suggested Tier |
|------------|------------------|----------------|
| PostgreSQL | `postgresql.org` | T1 |
| MongoDB | `mongodb.com/docs` | T1 |
| Redis | `redis.io` | T1 |
| MySQL | `dev.mysql.com/doc` | T1 |
| Cassandra | `cassandra.apache.org` | T1 |
| Elasticsearch | `elastic.co/guide` | T1 |

### Security & Standards

| Technology | Official Domains | Suggested Tier |
|------------|------------------|----------------|
| OWASP | `owasp.org` | T1 |
| W3C | `w3.org/TR`, `w3.org/standards` | T1 |
| IETF | `ietf.org/rfc`, `datatracker.ietf.org` | T1 |
| IEEE | `ieee.org` | T1 |
| NIST | `nist.gov` | T1 |

### Official GitHub Organizations

| Organization | Pattern | Suggested Tier |
|--------------|---------|----------------|
| Kubernetes | `github.com/kubernetes/*` | T2 |
| Facebook (React, etc.) | `github.com/facebook/*` | T2 |
| Google (Angular, etc.) | `github.com/google/*`, `github.com/angular/*` | T2 |
| Microsoft | `github.com/microsoft/*`, `github.com/dotnet/*` | T2 |
| HashiCorp | `github.com/hashicorp/*` | T2 |
| Apache Foundation | `github.com/apache/*` | T2 |

**Note**: Domain patterns provide **suggestions**, not final assignments. Validation score takes precedence in conflict cases.

---

## Score-Based Assignment Rules

**Primary Rule**: Tier assignment is determined by validation score using fixed thresholds.

### Assignment Algorithm

```
INPUT: validation_score (0-100)

IF validation_score >= 90:
  tier = "T1"
  badge = "🟢"
  confidence = "✓✓✓"
ELSE IF validation_score >= 80:
  tier = "T2"
  badge = "🔵"
  confidence = "✓✓"
ELSE IF validation_score >= 60:
  tier = "T3"
  badge = "🟡"
  confidence = "✓"
ELSE IF validation_score >= 40:
  tier = "T4"
  badge = "🟠"
  confidence = "⚠"
ELSE:
  tier = "T5"
  badge = "🔴"
  confidence = "🚫"

OUTPUT: tier, badge, confidence
```

### Score Threshold Rationale

**90-100 (T1)**: Only highest-quality sources qualify
- Requires official domain (Authority 35-40) + excellent recency/completeness/relevance
- Example: kubernetes.io with 40+28+18+9 = 95

**80-89 (T2)**: Very good sources with minor gaps
- May have slightly lower authority (30-35) or older content (20-27 recency)
- Example: Official GitHub repo with good examples but 6 months old

**60-79 (T3)**: Acceptable community resources
- Moderate authority (15-30) but compensated by good content
- Example: Stack Overflow accepted answer (Authority 15) + excellent completeness/relevance

**40-59 (T4)**: Questionable sources needing corroboration
- Low authority (5-15) or very outdated (Recency 0-10)
- Example: Personal blog with moderate content but no reputation

**0-39 (T5)**: Unreliable, avoid if possible
- Very low authority (<10) AND poor recency/completeness
- Example: Unknown blog from 2015 with minimal content

---

## Conflict Resolution

**Conflict Scenario**: Domain pattern suggests one tier, but validation score suggests a different tier.

### Resolution Protocol

```
STEP 1: Check domain pattern match
  IF source.url matches official_domain_pattern:
    domain_suggested_tier = T1 or T2
  ELSE:
    domain_suggested_tier = None

STEP 2: Calculate score-based tier
  score_based_tier = apply_score_thresholds(validation_score)

STEP 3: Compare and resolve
  IF domain_suggested_tier == score_based_tier:
    final_tier = score_based_tier
    conflict = False
  ELSE IF domain_suggested_tier != None:
    final_tier = score_based_tier  # SCORE TAKES PRECEDENCE
    conflict = True
    conflict_note = "[CONFLICT] Domain suggests {domain_suggested_tier}, score assigns {score_based_tier}. Score precedence applied."
  ELSE:
    final_tier = score_based_tier
    conflict = False

STEP 4: Set confidence
  IF conflict == True:
    confidence = "⚠"  # Always downgrade confidence on conflicts
  ELSE:
    confidence = standard_confidence_for_tier(final_tier)

OUTPUT: final_tier, confidence, conflict_note
```

### Conflict Examples

**Example 1: Official Domain, Outdated Content**

```
Source: https://kubernetes.io/docs/v1.10/
Domain Pattern: kubernetes.io → Suggests T1 (official)
Validation Score: 45 (Authority 35, Recency 0, Completeness 10, Relevance 0)
Score-Based Tier: T4 (40-59 range)

Resolution:
  final_tier = T4 (score precedence)
  confidence = ⚠ (downgraded due to conflict)
  conflict_note = "[CONFLICT] Domain suggests T1, score assigns T4. Score precedence applied."
  
Reasoning: Outdated Kubernetes version (v1.10 from 2018) should not be trusted despite official domain.
```

**Example 2: Unknown Domain, Excellent Content**

```
Source: https://unknown-expert-blog.com/kubernetes-guide
Domain Pattern: No match → No suggestion
Validation Score: 92 (Authority 10, Recency 30, Completeness 20, Relevance 10 + manual adjustment)
Score-Based Tier: T1 (90-100 range)

Resolution:
  final_tier = T1 (score-based, no conflict)
  confidence = ✓✓✓ (standard for T1)
  conflict_note = None
  
Reasoning: Exceptional content quality trumps unknown domain. Score correctly identifies high value.
```

**Example 3: Official Repo, Low Stars, Inactive**

```
Source: https://github.com/project/official-but-abandoned
Domain Pattern: github.com/project → Suggests T2 (official org)
Validation Score: 58 (Authority 30, Recency 5, Completeness 15, Relevance 8)
Score-Based Tier: T4 (40-59 range)

Resolution:
  final_tier = T4 (score precedence)
  confidence = ⚠ (downgraded due to conflict)
  conflict_note = "[CONFLICT] Domain suggests T2, score assigns T4. Score precedence applied."
  
Reasoning: Abandoned repository (last commit 3 years ago) is unreliable despite official ownership.
```

### Why Score Precedence?

**Rationale for prioritizing validation score over domain patterns:**

1. **Recency Matters**: Official domains can host outdated content (deprecated versions, archived docs)
2. **Completeness Varies**: Official repos can be minimal (README-only, no examples)
3. **Relevance Crucial**: Official docs for wrong technology version are misleading
4. **Objective Calculation**: Scores use reproducible formulas, domain patterns are heuristics
5. **Transparency**: Conflicts are flagged, not hidden, enabling human review

---

## Visual Indicators

### Badge System

Use Unicode emoji circles for at-a-glance quality assessment:

| Tier | Badge | Unicode | Markdown | Semantic Meaning |
|------|-------|---------|----------|------------------|
| T1 | 🟢 | U+1F7E2 | `:green_circle:` | Go / Safe / Excellent |
| T2 | 🔵 | U+1F535 | `:blue_circle:` | Good / Trustworthy |
| T3 | 🟡 | U+1F7E1 | `:yellow_circle:` | Caution / Acceptable |
| T4 | 🟠 | U+1F7E0 | `:orange_circle:` | Warning / Questionable |
| T5 | 🔴 | U+1F534 | `:red_circle:` | Stop / Avoid |

### Confidence Indicators

Use checkmarks and warning symbols for confidence levels:

| Confidence | Symbol | Unicode | Markdown | Meaning |
|------------|--------|---------|----------|---------|
| High | ✓✓✓ | U+2713 (×3) | `✓✓✓` | Very confident, reliable |
| Medium-High | ✓✓ | U+2713 (×2) | `✓✓` | Confident, minor limitations |
| Medium | ✓ | U+2713 | `✓` | Acceptable, some concerns |
| Low | ⚠ | U+26A0 | `:warning:` | Requires verification |
| Very Low | 🚫 | U+1F6AB | `:no_entry_sign:` | Not recommended |

### Usage in Citations

**Minimal Format** (Tier badges not typically shown):
```yaml
sources:
  - https://kubernetes.io/docs/
```

**Standard Format** (Optional tier badge in comments):
```yaml
sources:
  # T1 🟢 Official Kubernetes documentation
  - url: https://kubernetes.io/docs/
    type: official_docs
    accessed: 2026-02-03
```

**Detailed Format** (Full tier + badge + confidence):
```yaml
sources:
  - url: https://kubernetes.io/docs/
    type: official_docs
    tier: T1
    reliability_score: 95
    accessed: 2026-02-03
    notes: "Official documentation 🟢 ✓✓✓ - Highly reliable primary source"
```

---

## Edge Case Handling

### Boundary Scores (Near Tier Thresholds)

**Scenario**: Score is within ±2 points of tier boundary (e.g., 58, 59, 60, 61, 62)

**Handling**:
- Apply strict threshold rules (60 = T3, 59 = T4)
- Add note flag: `[BORDERLINE] Score {X} near T3/T4 boundary, human review recommended`
- Downgrade confidence by one level (T3 ✓ → ⚠)

**Example**:
```
Score: 59
Strict Assignment: T4 (40-59 range)
Confidence: ⚠ (downgraded from standard T4 confidence)
Note: "[BORDERLINE] Score 59 near T3/T4 boundary (60 threshold)"
```

### Unknown Domains (No Pattern Match)

**Scenario**: Source URL does not match any domain in registry

**Handling**:
- Proceed with validation scoring only (no domain suggestion)
- No conflict possible (no competing heuristic)
- Assign tier purely based on calculated score

**Example**:
```
Source: https://new-tech-site.example/guide
Domain Pattern: No match
Validation Score: 72
Assignment: T3 (60-79 range), confidence ✓, no conflict
```

### Archived or Deprecated Official Content

**Scenario**: Official domain hosts deprecated/archived content (e.g., `kubernetes.io/docs/v1.10/`, GitHub archived repo)

**Handling**:
- Authority score reduced by -5 pts for archived status
- Recency score heavily penalized (likely 0-5 pts for old version)
- Overall score drops to T4 or T5 range
- Conflict flagged (domain suggests T1, score assigns T4/T5)
- Add note: `[ARCHIVED] Official but deprecated content, use current version instead`

### Multiple Tier Assignment (Aggregate)

**Scenario**: Skill cites 5 sources with mixed tiers: T1, T1, T3, T4, T5

**Handling**:
- Calculate tier distribution: `{T1: 2, T3: 1, T4: 1, T5: 1}`
- Identify highest tier present: T1
- Identify lowest tier present: T5
- Calculate average score: (95 + 92 + 68 + 52 + 28) / 5 = 67
- Aggregate assessment: "Mixed quality (T1-T5 range, avg 67 = T3 equivalent)"

**Citation Template Selection**:
- IF any T4 or T5 present → Use Detailed format (transparency required)
- IF all T1-T3 → Use Standard or Minimal format

### Version-Specific Documentation

**Scenario**: Source is official but version-specific (e.g., `react.dev/docs/18.2.0/`)

**Handling**:
- Check if version matches current stable release
- IF current version: Full authority score (35-40 pts)
- IF one version behind: Authority -5 pts, Recency -10 pts
- IF 2+ versions behind: Authority -10 pts, Recency -20 pts
- Add note: `[VERSION: 18.2.0] Verify current stable version before use`

---

**Version**: 2.2.0  
**Last Updated**: 2026-02-03  
**Related**: `.prompt-os/core/WEB-RESEARCH.md`, `source-validation-rules.md`, `citation-templates.md`, `gap-detection.md`

