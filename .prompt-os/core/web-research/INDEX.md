---
name: core-web-research-index
description: ".prompt-os/core/web-research/INDEX.md - Web Research & Source Validation Guide"
---

# .prompt-os/core/web-research/INDEX.md - Web Research & Source Validation Guide

> **Web research, source classification, and citation validation.**  
> This subdirectory implements the research protocol referenced in `WEB-RESEARCH.md`.

---

## What is Web Research in PromptOS?

Web research in PromptOS is **not just Google searches** - it's a systematic process:

1. **Classify sources** by tier (T0-T3: from inviolable to unreliable)
2. **Validate credibility** (is the source reliable for this claim?)
3. **Check facts** (does it match other sources?)
4. **Cite correctly** (give credit, enable verification)
5. **Detect gaps** (what's missing? what's controversial?)

**This subdirectory** provides the tools and rules for each step.

---

## The 4 Research Implementation Files

### **1. tier-system.md** - Source Tier Classification

**Purpose:** Classify information sources by reliability and authority.

**What it covers:**
- **T0 sources**: Inviolable (peer-reviewed papers, official specs, documented code)
- **T1 sources**: Authoritative (well-maintained docs, established experts, major publications)
- **T2 sources**: Reliable but secondary (blogs by domain experts, tech articles)
- **T3 sources**: Unreliable (social media, unsourced claims, speculation)
- Tier assignment rules and rationale
- When to trust which tiers
- Tier combinations (some claims need T0 + T1)

**When to use:** Evaluating a source; deciding if you can cite it; determining confidence level.

**Lines:** ~350 | **Size:** ~10KB

---

### **2. source-validation-rules.md** - Credibility & Relevance Rules

**Purpose:** Validate that a source is actually credible for a specific claim.

**What it covers:**
- Credibility indicators (author credentials, publication venue, peer review)
- Red flags (no author, outdated, sponsored bias, unsourced claims)
- Relevance filtering (is this source about what we need?)
- Conflict of interest detection (author benefits from this claim?)
- Date validation (is it recent enough?)
- Authority matching (is author an expert in this domain?)
- Fact-checking rules (cross-reference with multiple sources)

**When to use:** Before citing a source; when you're unsure if a source is trustworthy; debugging poor research quality.

**Lines:** ~400 | **Size:** ~12KB

---

### **3. citation-templates.md** - Citation Formatting & Standards

**Purpose:** Cite sources consistently and correctly.

**What it covers:**
- Citation templates (APA, MLA, Chicago, inline)
- PromptOS citation standard (how we cite in this system)
- Building a bibliography
- Inline citations (linking claims to sources)
- Citation metadata (title, author, date, URL, access date)
- How to format different source types (papers, websites, code repos, books)
- Adding context to citations (why this source? what does it say?)

**When to use:** Citing sources in artifacts; building reference lists; validating citation format.

**Lines:** ~300 | **Size:** ~9KB

---

### **4. gap-detection.md** - Research Gap Analysis

**Purpose:** Identify what's missing, controversial, or needs further research.

**What it covers:**
- Completeness checking (is the research comprehensive?)
- Conflicting sources (what do experts disagree on?)
- Emerging topics (where's the cutting edge?)
- Underexplored areas (what's not well documented?)
- Opinion vs. fact (which claims need more evidence?)
- Coverage holes (what perspectives are missing?)
- Recommendations (suggest follow-up research)

**When to use:** After research is done; identifying next steps; understanding limitations of findings.

**Lines:** ~350 | **Size:** ~10KB

---

## Recommended Reading Order

```
1. tier-system.md               → Learn source tiers (foundation)
2. source-validation-rules.md   → Validate credibility (decision rules)
3. citation-templates.md        → Format citations (mechanics)
4. gap-detection.md             → Identify gaps (meta-analysis)
```

This order takes you from **classification → validation → citation → analysis**.

---

## When to Use Each File

| Task | Read |
|------|------|
| "Is this source trustworthy?" | tier-system.md + source-validation-rules.md |
| "What tier is this source?" | tier-system.md |
| "How do I cite this?" | citation-templates.md |
| "What's missing from my research?" | gap-detection.md |
| "I found conflicting sources. What do I do?" | gap-detection.md (conflict detection) |
| "Should I cite this source?" | source-validation-rules.md |
| "How confident am I in this claim?" | tier-system.md (depends on source tiers) |
| "I'm doing a full research task" | All 4 files (in recommended order) |

---

## Key Concepts

### Tier System (T0-T3)

The tier system is crucial to PromptOS:

| Tier | Examples | Trust Level | Usage |
|------|----------|-------------|-------|
| **T0** | Peer-reviewed papers, official specs, documented code | Inviolable | Cite without caveats |
| **T1** | Authoritative docs, expert blogs, established publications | High | Cite with confidence |
| **T2** | Tech articles, domain expert discussions | Medium | Cite with context |
| **T3** | Social media, speculation, unsourced claims | Low | Cite with caveats or avoid |

**Key rule:** Claims about facts/specifications need at least T1. Claims about opinions can use T2.

### Credibility Indicators

Good sources have:
- Clear author with credentials
- Cited sources (bibliography)
- Recent publication or maintained updates
- Peer review or editorial oversight
- No obvious bias or commercial interest
- Reproducible claims (code, data, methodology)

### Fact-Checking Strategy

1. Find T0 sources (gold standard)
2. If unavailable, use multiple T1 sources
3. Cross-reference claims (do they all say the same thing?)
4. Flag disagreements (interesting research gaps!)
5. Cite at least the tier you're using

---

## Integration with Core Protocols

This subdirectory implements **WEB-RESEARCH.md** (Protocol 9):

- **INPUT-CLASSIFIER.md** → Routes "research" requests here
- **KNOWLEDGE-BASE.md** → Retrieves candidate sources (RAG)
- **SELF-CRITIQUE.md** → Evaluates research quality (are sources valid?)
- **MEMORY-MANAGEMENT.md** → Stores research results + source database
- **AUTO-INCREMENT.md** → Detects research gaps for future work

---

## File Structure

```
.prompt-os/core/web-research/
├── INDEX.md                     # ← YOU ARE HERE
├── tier-system.md               # Source classification (T0-T3)
├── source-validation-rules.md   # Credibility & relevance rules
├── citation-templates.md        # Citation formatting
└── gap-detection.md             # Research gap analysis
```

---

## Statistics

| File | Lines | Size | Purpose |
|------|-------|------|---------|
| tier-system.md | ~350 | ~10KB | Source classification |
| source-validation-rules.md | ~400 | ~12KB | Validation rules |
| citation-templates.md | ~300 | ~9KB | Citation formats |
| gap-detection.md | ~350 | ~10KB | Gap analysis |
| **TOTAL** | **1,400** | **41KB** | **Research framework** |

---

## Related Files

### In this system
- **Parent**: [../WEB-RESEARCH.md](../WEB-RESEARCH.md) (protocol overview)
- **Related protocols**: [../KNOWLEDGE-BASE.md](../KNOWLEDGE-BASE.md), [../SELF-CRITIQUE.md](../SELF-CRITIQUE.md)
- **Index of all subdirs**: [../INDEX.md](../INDEX.md)

### In other subdirectories
- **Knowledge retrieval**: [../knowledge-base/](../knowledge-base/) (find sources via RAG)
- **Persona background research**: [../persona-generator/](../persona-generator/) (research personas)

---

## Workflow Example: Research a Programming Feature

```
User: "Research async/await in JavaScript - is it production-ready?"

1. CLASSIFY INPUT
   → INPUT-CLASSIFIER.md routes to RESEARCH mode

2. GATHER SOURCES
   → KNOWLEDGE-BASE.md retrieves candidate documents via RAG
   → Get 20 potentially relevant documents

3. CLASSIFY SOURCES
   → tier-system.md classifies each source (T0-T3)
   → Example: MDN docs = T1 (official), Twitter = T3 (opinion)

4. VALIDATE CREDIBILITY
   → source-validation-rules.md checks each source
   → Example: Author is TC39 committee member? ✅
   → Example: Source is 8 years old? ⚠️ (might be outdated)

5. CITE SOURCES
   → citation-templates.md formats citations
   → Example: "According to [MDN Web Docs (T1)](url): async/await was added in ES2017"

6. DETECT GAPS
   → gap-detection.md analyzes coverage
   → Found: No sources about performance trade-offs
   → Recommendation: "Further research needed on performance vs. readability"

7. EVALUATE RESEARCH
   → SELF-CRITIQUE.md scores the research (0-100)
   → High score if: sources are T0-T1, contradictions resolved, gaps identified

8. SAVE RESULTS
   → MEMORY-MANAGEMENT.md stores research + sources + gaps
```

---

## Quick Tips

### Best Practices for Research

1. **Start with T0** (peer-reviewed papers) if available
2. **Cross-reference** multiple sources (especially T1-T2)
3. **Check dates** (is this still relevant?)
4. **Identify author** (are they qualified?)
5. **Note conflicts** (what do experts disagree on?)
6. **Mark gaps** (what needs more research?)
7. **Cite everything** (even secondary claims)

### Common Problems & Solutions

| Problem | Solution |
|---------|----------|
| "All my sources are T3 (unreliable)" | Find at least one T1 source, or mark claim as speculative |
| "Sources contradict each other" | Use gap-detection.md to explain disagreement |
| "My source is outdated" | Find more recent source, or note limitations |
| "Author seems biased" | Use source-validation-rules.md to assess conflict of interest |
| "Citation format is inconsistent" | Use citation-templates.md as standard |
| "I don't know if this is a fact or opinion" | Look for peer review (T0) vs. analysis (T2) |

---

## Related PromptOS Features

- **Constitution T0-HUMAN-01**: Always cite sources when making claims about facts
- **Constitution T1-RESEARCH**: Research must be comprehensive and cross-referenced
- **Constitution T2-CITATIONS**: Citations must follow PromptOS standards

---

## Next Steps

1. **New to PromptOS research?** → Start with tier-system.md
2. **Need to validate a source?** → Jump to source-validation-rules.md
3. **Doing a full research task?** → Read all 4 files in recommended order
4. **Need to analyze research gaps?** → Focus on gap-detection.md

---

*Last Updated: 2026-02-04*  
*Status: Production Ready*  
*For maintenance, see [../governance/INDEX-MAINTENANCE.md](../governance/INDEX-MAINTENANCE.md)*
