# Feature Specification: WEB-RESEARCH Protocol Enhancement

**Feature Branch**: `003-web-research`  
**Created**: 2026-02-03  
**Status**: Draft - Ready for Planning  
**Input**: Enhance WEB-RESEARCH.md protocol with formal source validation rules, structured citation templates, quality tier scoring system, and AUTO-INCREMENT integration based on SPEC-010 learnings

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI Agent Validates Research Sources with Scoring (Priority: P1)

An AI agent conducting web research for skill generation needs to validate source quality using objective, reproducible criteria rather than subjective judgment.

**Why this priority**: Core capability - without formal validation rules, source quality assessment remains inconsistent and unreliable. This is the foundation for all other enhancements.

**Independent Test**: Can be fully tested by providing an AI agent with a set of URLs and measuring whether it correctly calculates validation scores (0-100) across 4 dimensions (authority, recency, completeness, relevance) and correctly classifies sources into quality tiers.

**Acceptance Scenarios**:

1. **Given** WEB-RESEARCH.md validation rules loaded, **When** agent validates `https://kubernetes.io/docs/`, **Then** scores: authority=40/40 (official domain), recency=28/30 (updated <30 days), completeness=18/20 (code examples present), relevance=9/10 (perfect keyword match) → Overall: 95/100 → Tier 1
2. **Given** validation rules loaded, **When** agent validates `https://medium.com/@random/old-post` from 2020, **Then** scores: authority=10/40 (general blog), recency=0/30 (>2 years old), completeness=10/20 (no code), relevance=8/10 → Overall: 28/100 → Tier 5
3. **Given** validation rules loaded, **When** agent encounters conflicting rules (e.g., official `.io` domain = Tier 1 pattern, but score 58/100 = Tier 3), **Then** system applies score-based precedence (assigns Tier 3), calculates overall score using weighted formula, and flags the tier conflict in validation notes for human review

---

### User Story 2 - AI Agent Cites Sources Consistently Across Skills (Priority: P1)

An AI agent creating skills needs to cite sources using consistent, appropriate formats that match the research depth and context requirements.

**Why this priority**: Critical for quality and compliance - T0-SOURCE-01 rule requires citations, but current implementation is inconsistent. This directly impacts SPEC-010 skill quality.

**Independent Test**: Can be tested by generating 3 skills (simple baseline, mixed-source skill, research-intensive skill) and verifying each uses the appropriate citation template (minimal/standard/detailed) with consistent formatting.

**Acceptance Scenarios**:

1. **Given** citation templates loaded, **When** agent creates baseline skill with 2 official doc sources, **Then** uses **minimal format** (YAML array of URLs only) matching SPEC-010 pattern
2. **Given** citation templates loaded, **When** agent creates framework integration skill with mixed sources (docs + GitHub + Stack Overflow), **Then** uses **standard format** (YAML with type, accessed date) for clarity
3. **Given** citation templates loaded, **When** agent creates research-heavy skill with controversial/evolving topic, **Then** uses **detailed format** (YAML with tier, reliability_score, notes) for full transparency

---

### User Story 3 - AI Agent Classifies Sources into Quality Tiers (Priority: P2)

An AI agent processing research results needs to automatically classify sources into quality tiers (T1-T5) using domain patterns and validation scores.

**Why this priority**: Enables automatic quality assessment and helps agents prioritize high-quality sources. Builds on P1 validation rules.

**Independent Test**: Can be tested by providing 10 mixed-quality sources and verifying tier assignment matches expected tiers based on domain rules + validation scores.

**Acceptance Scenarios**:

1. **Given** tier system rules loaded, **When** agent encounters `kubernetes.io/docs` (score 95), **Then** assigns **Tier 1** (🟢) with confidence ✓✓✓ (high)
2. **Given** tier system loaded, **When** agent encounters `github.com/kubernetes/examples` (official repo, 5000 stars, score 85), **Then** assigns **Tier 2** (🔵) with confidence ✓✓ (medium-high)
3. **Given** tier system loaded, **When** agent encounters edge case (`.io` domain but score <60 due to outdated content), **Then** applies score-based override, assigns Tier 4, and flags for manual review

---

### User Story 4 - System Detects Source Gaps and Triggers Auto-Increment (Priority: P2)

When an AI agent completes research but validation reveals source quality issues (missing Tier 1, all outdated, insufficient coverage), the system automatically detects these gaps and triggers AUTO-INCREMENT protocol for proactive gap notification.

**Why this priority**: Enables system evolution - integrates WEB-RESEARCH with AUTO-INCREMENT for automatic improvement cycles. Critical for v2.1.0 memory architecture goals.

**Independent Test**: Can be tested by simulating 4 gap scenarios (no T1 source, all outdated, <2 sources, all low-score) and verifying each correctly triggers Auto-Increment with appropriate gap registration in agent memory.

**Acceptance Scenarios**:

1. **Given** research phase complete, **When** validation finds 0 Tier 1 sources (missing official docs), **Then** triggers AUTO-INCREMENT with gap type "missing_official_docs", presents proactive suggestion to human, registers gap in MEMORY-MANAGEMENT
2. **Given** research complete, **When** validation finds all sources >2 years old, **Then** triggers AUTO-INCREMENT with gap type "outdated_sources", offers "research more | defer | accept limitation", registers decision
3. **Given** research complete, **When** validation finds only 1 source total (insufficient coverage), **Then** triggers AUTO-INCREMENT with gap type "insufficient_coverage", recommends finding 1+ additional sources

---

### User Story 5 - Developer Refactors Protocol Using JIT Sub-Files (Priority: P3)

A protocol maintainer needs to enhance WEB-RESEARCH.md with 650+ lines of new content while staying under T0-SIZE-01 limit (1,400 tokens) by extracting detailed sections to JIT sub-files.

**Why this priority**: Technical implementation detail - important for maintainability but doesn't directly impact agent functionality. Can be done incrementally.

**Independent Test**: Can be tested by measuring token counts before/after refactoring and verifying main protocol <1,400 tokens while JIT sub-files load correctly when referenced.

**Acceptance Scenarios**:

1. **Given** current WEB-RESEARCH.md (401 lines, 1,500 tokens) + enhancements (650 lines, 2,500 tokens), **When** maintainer applies JIT pattern, **Then** main protocol reduces to ~285 lines (~1,100 tokens) with 4 JIT sub-files (`source-validation-rules.md`, `citation-templates.md`, `tier-system.md`, `gap-detection.md`)
2. **Given** refactored structure, **When** agent loads main WEB-RESEARCH.md, **Then** sees high-level guidance with JIT references (e.g., "For detailed validation rules, load `.prompt-os/core/web-research/source-validation-rules.md`")
3. **Given** JIT sub-file reference, **When** agent needs detailed rules, **Then** loads specific sub-file on-demand without loading all enhancements unnecessarily

---

### Edge Cases

- **What happens when a source scores exactly on a tier boundary (e.g., 60/100) or produces conflicting signals?** 
  - System applies scoring threshold rules: 60-79 → Tier 2. For conflicts (e.g., official domain pattern = T1, but score = 58 → T3), score-based assignment takes precedence to ensure reproducibility. System flags the conflict in validation notes for human awareness.

- **How does system handle sources with no detectable metadata (no date, unknown domain)?**
  - Applies conservative scoring: defaults to lowest applicable tier (Tier 4-5), flags for manual review via inline conversational prompt (e.g., "Source X has unknown domain - approve Tier 4 assignment?"), human responds in session, agent documents override decision in memory if needed for future reference.

- **What if Auto-Increment integration triggers but human rejects all suggestions?**
  - MEMORY-MANAGEMENT records rejection with category "source_gap_accepted_as_limitation", does not re-trigger for same topic within session, documents in agent episodic memory for future context.

- **What if official documentation domain changes (e.g., reactjs.org → react.dev)?**
  - Domain whitelist is updatable in `tier-system.md` under "Official Domains Registry". Agents should flag unknown `.dev` or `.io` domains for review if they claim to be official.

- **How does system handle multilingual sources?**
  - Validation rules focus on structural quality (authority, recency, completeness) which are language-agnostic. Relevance scoring may adjust for non-English sources if keywords don't match perfectly.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide formal validation rules for 4 dimensions: authority (40%), recency (30%), completeness (20%), relevance (10%)
- **FR-002**: System MUST calculate objective source quality scores (0-100 scale) using documented scoring rubric. In case of tier assignment conflicts (domain-based vs score-based), score takes precedence to ensure reproducibility
- **FR-003**: System MUST define 3 citation template formats (minimal, standard, detailed) with clear usage guidelines
- **FR-004**: System MUST provide tier classification system (T1-T5) with domain-based and score-based assignment rules
- **FR-005**: System MUST integrate with AUTO-INCREMENT protocol to detect 4 source gap scenarios
- **FR-006**: System MUST register detected source gaps in MEMORY-MANAGEMENT using markdown table format: `| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |` matching existing agent-memory.md table patterns
- **FR-007**: Enhanced protocol MUST comply with T0-SIZE-01 limit (<1,400 tokens main protocol) using JIT sub-files architecture
- **FR-008**: System MUST provide visual indicators for tiers (🟢 T1, 🔵 T2, 🟡 T3, 🟠 T4, 🔴 T5) and confidence levels (✓✓✓, ✓✓, ✓, ⚠)
- **FR-009**: System MUST document step-by-step validation workflow applicable by AI agents without human interpretation
- **FR-010**: System MUST include examples demonstrating each validation rule, citation format, and tier assignment scenario
- **FR-011**: System MUST emit structured validation logs after each source validation run (format: `[timestamp] WEB-RESEARCH-VALIDATION | sources=N | avg_score=X | gaps=[types] | time=Ns | conflicts=N`) to enable SC-001/007/008 measurement and pattern detection

### Key Entities *(protocol components)*

- **Validation Rule**: Scoring criterion for one dimension (authority/recency/completeness/relevance) with threshold definitions, weight percentage, and calculation formula
- **Citation Template**: Structured format for documenting research sources with required/optional fields (url, type, accessed_date, tier, reliability_score, notes)
- **Quality Tier**: Classification level (T1-T5) representing source reliability, with assignment rules, confidence indicators, and visual badges
- **Source Gap**: Detected deficiency in research coverage with type (missing_official_docs/outdated_sources/insufficient_coverage/low_reliability), trigger conditions, resolution workflow, and table-based registration format (Date, Gap Type, Topic, Trigger, Resolution, Deferred Until)
- **JIT Sub-File**: Extracted detailed section loaded on-demand to keep main protocol under token limit, with clear reference pattern in main protocol

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Agent can validate 10 diverse sources and produce consistent scores within ±5 points when validation is repeated (reproducibility test)
- **SC-002**: SPEC-010 baseline skills (5 total) achieve 100% citation format consistency after template implementation (currently inconsistent). Note: Baseline skills may show validation failures in other dimensions (authority/recency/tier assignment) when retroactively tested; these are documented as known issues for next revision cycle rather than immediate updates
- **SC-003**: Self-Critique scores for all 4 protocol enhancements average ≥95/100 (target for protocol complexity)
- **SC-004**: Main WEB-RESEARCH.md stays under 1,400 tokens (<1,100 actual) after enhancements via JIT architecture
- **SC-005**: Auto-Increment integration triggers correctly in 4/4 test scenarios (missing T1, outdated, insufficient, low-score)
- **SC-006**: Zero T0-MEMORY-01 violations (memory always updated atomically with protocol changes)
- **SC-007**: Protocol enhancement reduces source validation time by 40% (baseline: manual subjective assessment ~5 min/source → automated scoring ~3 min/source), measured via structured validation logs
- **SC-008**: Gap detection reduces research quality incidents by 60% (measured by skills requiring post-creation source corrections), tracked via incident logs and gap trigger frequencies

---

## Assumptions

### Made During Specification

- **A1**: AI agents have access to source metadata (publication date, domain, content structure) via web fetch capabilities
- **A2**: Official documentation domains follow standard patterns (*.io/docs, *.org/docs, docs.*, official GitHub orgs) that can be pattern-matched
- **A3**: Target audience (AI agents) can interpret and apply numerical scoring rubrics without ambiguity
- **A4**: Most research scenarios involve 2-5 sources per skill (based on SPEC-010 average), not dozens requiring advanced filtering
- **A5**: Human reviewers are available for edge cases (unknown domains, borderline scores, conflicting metadata) and provide decisions via inline conversational responses during agent sessions
- **A6**: Token counting is consistent across agents (approximation: 1 token ≈ 0.4 lines of Markdown)

### Protocol Design Decisions

- **D1**: Chose weighted scoring (40/30/20/10) based on informal survey indicating authority and recency are most critical for technical documentation
- **D2**: Selected 5-tier system (not 3 or 7) to balance granularity with simplicity - aligns with existing WEB-RESEARCH.md hierarchy
- **D3**: Minimal citation format as default (not standard) because SPEC-010 analysis shows 5/5 baseline skills use simple URL lists
- **D4**: JIT sub-files pattern chosen over single-file monolith based on SPEC-010 learnings (JavaScript: 94→99 score improvement with JIT)
- **D5**: Auto-Increment integration required (not optional) because v2.1.0 roadmap prioritizes memory-driven system evolution

---

## Scope & Boundaries

### In Scope

- ✅ Formal validation rules (4 dimensions, scoring rubric, workflow)
- ✅ Citation templates (3 formats with examples)
- ✅ Tier system (T1-T5 with assignment rules)
- ✅ Auto-Increment integration (gap detection, memory registration)
- ✅ JIT architecture (main protocol + 3 sub-files)
- ✅ Visual indicators (tier badges, confidence levels)
- ✅ SPEC-010 retroactive validation (test with existing skills, document any non-citation failures as known issues)

### Out of Scope

- ❌ API integrations (Tavily, Perplexity, SerpAPI) - Pre-spec mentions these as "OPTIONAL", not required for prompt-based protocol
- ❌ Automated web scraping tools - Protocol provides instructions for agents with existing web fetch capabilities
- ❌ JavaScript implementation (search-adapter.js, source-parser.js, cache-manager.js) - Pre-spec notes these are "Historical Reference" only
- ❌ Cache management system - Pre-spec states "Not needed (AI handles conversationally)"
- ❌ Multi-language source handling - Will use standard relevance scoring, no specialized translation/keyword matching
- ❌ Paid source access (paywalled journals, premium APIs) - Limited to publicly accessible free-tier sources per pre-spec NG4
- ❌ AI-powered summarization - Pre-spec NG3: "Nao usar AI para resumir nesta fase", deferred to v2.0 future consideration

---

## Dependencies

### Internal Dependencies

- **SPEC-002 (Auto-Increment)**: ✅ IMPLEMENTED - Required for gap detection integration (FR-005, FR-006)
- **SPEC-010 (Language Skills Baseline)**: ✅ COMPLETE - Provides 5 skills for retroactive validation testing (SC-002)
- **MEMORY-MANAGEMENT Protocol**: ✅ IMPLEMENTED (v2.1.0) - Required for gap registration (FR-006)
- **SELF-CRITIQUE Protocol**: ✅ IMPLEMENTED - Required for quality validation (SC-003)
- **HUMAN-GATE Protocol**: ✅ IMPLEMENTED - Required for incremental approval during enhancement
- **Current WEB-RESEARCH.md**: ✅ EXISTS (401 lines) - Foundation for enhancements

### External Dependencies

- **AI Agent Web Fetch Capability**: Assumed available (A1) - Agents need ability to retrieve source metadata
- **Markdown Rendering**: Standard CommonMark - For visual indicators (badges, checkmarks) to display correctly
- **Git Version Control**: Required for atomic memory commits (T0-MEMORY-01 compliance)

### Risk Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Protocol complexity too high (agents can't follow) | Medium | High | Target Self-Critique ≥95, test with actual agent execution, iterate based on feedback |
| Token budget exceeded despite JIT | Low | Medium | Monitor token counts per section, extract additional sub-files if needed (tier system, examples) |
| Auto-Increment integration breaks existing workflow | Medium | High | Review AUTO-INCREMENT.md API before implementation, test with validation scenarios, ensure backward compatibility |
| Validation scores not reproducible across agents | High | Medium | Document scoring formulas explicitly with worked examples, provide edge case handling, accept ±5 point variance (SC-001) |

---

## Related Documentation

### Preparation Files (Already Created)

- `specs/003-web-research/pre-spec.md` - Historical context (JavaScript implementation design, now prompt-based)
- `specs/003-web-research/execution-checklist.md` - Task breakdown (11 tasks across 6 phases)
- `specs/003-web-research/gap-analysis.md` - Detailed analysis of 5 gaps with prioritization
- `specs/003-web-research/data-collection-guide.md` - Instructions for collecting Self-Critique scores, gaps, rejections, enhancement metrics

### Next Steps: Ready for `/speckit.plan`

This specification is **READY FOR PLANNING** phase. All mandatory sections complete:

- ✅ User Scenarios & Testing (5 stories, priorities P1-P3, independently testable)
- ✅ Requirements (10 functional requirements, 5 key entities)
- ✅ Success Criteria (8 measurable outcomes)
- ✅ Assumptions & Boundaries (6 assumptions, 5 design decisions, clear scope)
- ✅ Dependencies (6 internal, 1 external, risk mitigations)

**Recommended next command:** `/speckit.plan` to generate implementation tasks based on this specification.

---

**Version**: 1.0  
**Self-Critique Ready**: Yes (score after planning phase)  
**Estimated Implementation**: 3-5 days (per execution-checklist.md)  
**Target Release**: v2.3.0-dev (per ROADMAP.md)

---

## Clarifications

### Session 2026-02-03

- **Q1: Gap Registration Format** - When a source gap is detected (FR-006), what exact format should be used to register it in MEMORY-MANAGEMENT? → **A:** Markdown table row: `| Date | Gap Type | Topic | Trigger | Resolution | Deferred Until |` (matches existing agent memory table patterns)

- **Q2: Validation Conflict Resolution** - When validation produces conflicting tier assignments (e.g., official `.io` domain suggests Tier 1, but score of 58/100 suggests Tier 3), what is the tiebreaker logic? → **A:** Score-based assignment takes precedence (58/100 → Tier 3), system flags conflict in validation notes for human review. This ensures reproducibility (SC-001) while maintaining transparency for edge cases.

- **Q3: Retroactive Validation Failures** - If SPEC-010 baseline skills fail new validation rules when retroactively tested (beyond citation format compliance in SC-002), what is the remediation path? → **A:** Document failures as known issues in validation report, fix on next skill revision cycle (v2.3.0+). This balances quality tracking with baseline stability, avoiding regressions in approved production skills.

- **Q4: Human Override Mechanism** - When agent flags a source for manual review (unknown domain, borderline score, conflict), how does human provide verdict? → **A:** Inline conversational approval in agent session (e.g., "approve tier 2", "use tier 3 instead", "reject source"). Maintains conversational flow, no file modifications during active session. Agent documents decision in memory if persistent record needed.

- **Q5: Observability Signals** - How will protocol usage, validation outcomes, and failures be monitored for quality tracking (SC-001/007/008 measurement)? → **A:** Structured logs with validation counts, average scores per dimension, gap trigger frequencies, and validation time measurements. Format: `[timestamp] WEB-RESEARCH-VALIDATION | sources=N | avg_score=X | gaps=[types] | time=Ns | conflicts=N`. Enables quantitative SC measurement and pattern detection for system evolution.

