# docs/ Master Index

> **Complete registry of ALL documentation in docs/**  
> Navigate by category, purpose, or audience.

---

## Quick Navigation

- [Active Documentation](#active-documentation) - 7 root files
- [Monitoring Templates](#monitoring-templates) - 4+ files
- [RFC/Planning Templates](#rfcplanning-templates) - 3+ files
- [Archived Content](#archived-content) - 20+ files (legacy)
- [Statistics](#statistics)

---

## Active Documentation

Current, maintained documentation for PromptOS.

### Root-Level Documentation (7 files)

| File | Size | Purpose | Audience | Status | Tags |
|------|------|---------|----------|--------|------|
| `ARCHITECTURE.md` | ~12KB | System design, components, data flow, decision rationale | Architects, Tech Leads | Current ✓ | design, components, flow |
| `GAP-ANALYSIS.md` | ~8KB | Feature gaps, incomplete implementations, missing capabilities | Product Managers, Devs | Current ✓ | gaps, features, todo |
| `GLOSSARIO-TECNICO-PROMPTOS.md` | ~15KB | Technical terminology, definitions, concepts specific to PromptOS | All (Reference) | Current ✓ | glossary, terms, reference |
| `IMPLEMENTATION-STATUS.md` | ~10KB | Feature tracking, implementation progress, milestone status | Project Managers, Tech | Current ✓ | status, tracking, milestones |
| `INTEGRATION-ANALYSIS.md` | ~9KB | Integration patterns, API design, compatibility considerations | Developers, Architects | Current ✓ | integration, api, patterns |
| `MONITORING-GUIDE.md` | ~7KB | Operational monitoring, health checks, alerts, metrics | DevOps, SRE | Current ✓ | monitoring, operations, metrics |
| `TIER-SYSTEM.md` | ~6KB | Skill tier/level system, categorization, ranking | Developers, Content | Current ✓ | tiers, levels, classification |

### File Details

#### ARCHITECTURE.md
- **Purpose**: Describe system architecture, major components, and data flows
- **Audience**: Technical teams, architects, senior developers
- **Contains**: 
  - Component diagrams
  - System layers
  - Decision rationale
  - Technology choices
- **When to read**: Understanding how system works, before major changes

#### GAP-ANALYSIS.md
- **Purpose**: Document missing features, incomplete work, future opportunities
- **Audience**: Product managers, tech leads, developers
- **Contains**:
  - Feature gaps
  - Incomplete specs
  - Performance issues
  - Future roadmap items
- **When to read**: Planning work, prioritization

#### GLOSSARIO-TECNICO-PROMPTOS.md
- **Purpose**: Define technical terms and concepts specific to PromptOS
- **Audience**: All (reference document)
- **Contains**:
  - Terminology
  - Concepts
  - Acronyms
  - Definitions
- **When to read**: Learning system concepts, clarifying terminology

#### IMPLEMENTATION-STATUS.md
- **Purpose**: Track what's been implemented, what's in progress, what's pending
- **Audience**: Project managers, stakeholders, developers
- **Contains**:
  - Feature checklist
  - Implementation status
  - Progress metrics
  - Milestone tracking
- **When to read**: Status updates, progress reports, planning

#### INTEGRATION-ANALYSIS.md
- **Purpose**: Document how PromptOS integrates with external systems and AI agents
- **Audience**: Developers, system architects, integration teams
- **Contains**:
  - Integration patterns
  - API specifications
  - Compatibility matrix
  - Integration examples
- **When to read**: Integrating with other systems, API design

#### MONITORING-GUIDE.md
- **Purpose**: Guide for operational monitoring, alerting, and health management
- **Audience**: DevOps, SRE, operations teams
- **Contains**:
  - Health check procedures
  - Metrics to monitor
  - Alert configuration
  - Logging standards
  - Troubleshooting guides
- **When to read**: Setting up monitoring, diagnosing issues, operations

#### TIER-SYSTEM.md
- **Purpose**: Explain the skill tier/level system (L0, L1, L2, L3)
- **Audience**: Developers, content creators, system designers
- **Contains**:
  - Tier definitions
  - Level descriptions
  - Classification rules
  - Examples
- **When to read**: Creating skills, understanding skill classification

---

## Monitoring Templates

Templates and guides for operational monitoring. Located in `monitoring/`.

| File | Purpose | Tags |
|------|---------|------|
| `monitoring/health-check-template.md` | Template for system health checks | template, monitoring, health |
| `monitoring/metrics-collection.md` | Guide for collecting performance metrics | template, metrics, performance |
| `monitoring/alert-config-template.md` | Template for alert configuration | template, alerts, ops |
| `monitoring/README.md` | Overview of monitoring resources | index, monitoring, reference |

**Purpose**: Provide templates and examples for operational monitoring of PromptOS deployments.

---

## RFC/Planning Templates

Templates for documentation and planning. Located in `templates/`.

| File | Purpose | Tags |
|------|---------|------|
| `templates/RFC-template.md` | Request for Comments template | template, rfc, planning |
| `templates/DECISION-template.md` | Decision documentation template | template, decision, adr |
| `templates/ROADMAP-template.md` | Feature roadmap template | template, roadmap, planning |

**Purpose**: Provide standard templates for proposing changes, documenting decisions, and planning features.

---

## Archived Content

Legacy and superseded documentation. Located in `_archive/` and other legacy directories.

### Legacy Directories

| Directory | Content | Status |
|-----------|---------|--------|
| `_archive/` | General legacy/superseded docs | Archived |
| `_archive/v1/` | PromptOS v1.0 specific docs | Archived |
| `relatorios-testes/` | Legacy test reports | Archived |
| `add-bootstraps/` | Old bootstrap files | Archived |
| `add-core/` | Legacy core resources | Archived |
| `v1/` | Version 1.x archives | Archived |

### Archive Statistics

| Metric | Count |
|--------|-------|
| Total archived files | 20+ |
| v1.x documentation | 8+ files |
| Test reports | 5+ files |
| Legacy bootstraps | 4+ files |
| Miscellaneous | 3+ files |

**Note**: Archive content is preserved for historical reference but should NOT be used for current development. Reference current documentation in root-level files.

---

## Directory Structure

```
docs/
├── README.md                        # This directory overview
├── INDEX.md                         # Master index (this file)
├── ARCHITECTURE.md                  # System architecture
├── GAP-ANALYSIS.md                  # Feature gaps
├── GLOSSARIO-TECNICO-PROMPTOS.md    # Technical glossary
├── IMPLEMENTATION-STATUS.md         # Implementation tracking
├── INTEGRATION-ANALYSIS.md          # Integration patterns
├── MONITORING-GUIDE.md              # Monitoring guide
├── TIER-SYSTEM.md                   # Skill tiers/levels
├── monitoring/                      # Monitoring templates
│   ├── README.md
│   ├── health-check-template.md
│   ├── metrics-collection.md
│   └── alert-config-template.md
├── templates/                       # RFC & planning templates
│   ├── RFC-template.md
│   ├── DECISION-template.md
│   └── ROADMAP-template.md
├── _archive/                        # Archived content (legacy)
│   ├── v1/                          # Version 1.0 archives
│   └── [superseded files]
├── relatorios-testes/               # Legacy test reports
├── add-bootstraps/                  # Legacy bootstrap files
├── add-core/                        # Legacy core resources
└── v1/                              # v1.x archives
```

---

## Statistics by Category

### Active Documentation
| Type | Count |
|------|-------|
| Core Documentation | 7 |
| Monitoring Templates | 4 |
| RFC Templates | 3 |
| **Active Total** | **14** |

### Archived Content
| Type | Count |
|------|-------|
| Version 1.x Docs | 8 |
| Test Reports | 5 |
| Legacy Bootstraps | 4 |
| Other Archives | 3 |
| **Archive Total** | **20+** |

### Overall Statistics
| Metric | Value |
|--------|-------|
| Active Files | 14 |
| Archived Files | 20+ |
| **Total Files** | **35+** |
| Size (Active) | ~67KB |
| Size (Archived) | ~150KB |

---

## How to Use This Index

### Find by Purpose
Look in the table above for file purposes and navigate directly.

**Example:** "How do I monitor the system?"
- Find purpose: "Operational monitoring"
- File: `MONITORING-GUIDE.md`

### Find by Audience
Scan the "Audience" column to find documentation for your role.

**Example:** "I'm a product manager"
- Audiences with PM: `IMPLEMENTATION-STATUS.md`, `GAP-ANALYSIS.md`

### Find by Tags
Use tags to discover related documentation.

**Example:** "Show me everything about integration"
- Search tag: "integration"
- Files: `INTEGRATION-ANALYSIS.md`

### Find by Status
All current documentation has ✓ status. Archive has no status.

**Example:** "I want current documentation only"
- Look for files with ✓ in Status column
- Ignore `_archive/` and legacy directories

---

## Documentation Layers

PromptOS has three documentation layers:

1. **AI System Core** (`.prompt-os/`)
   - For AI agents to read and follow
   - Protocols, skills, rules
   - Machine-readable format

2. **AI Context** (`.context/`)
   - Domain knowledge for agents
   - Workflows and standards
   - Context JIT loading

3. **Human Documentation** (`docs/` - this directory)
   - For humans to understand
   - Architecture and design
   - Reference and guides

---

## Maintenance

### Adding New Documentation
1. Determine correct layer (docs/ for human reference)
2. Choose category (root, monitoring/, templates/)
3. Create file following standards
4. Add entry to INDEX.md with metadata
5. Update file count in statistics

### Archiving Old Documentation
1. Move file to `_archive/`
2. Preserve version information
3. Update links in active documentation
4. Update INDEX.md

### Updating This Index
- Update whenever files are added/removed
- Keep statistics current
- Maintain file metadata

---

## Related Documentation

- **AI System Core** → See `.prompt-os/README.md` and `.prompt-os/INDEX.md`
- **AI Context** → See `.context/README.md`
- **Project Configuration** → See `AGENTS.md` (root)
- **Implementation Guide** → See `.context/ai-assistant-guide.md`

---

## Version & Status

- **Version**: 2.2.0
- **Last Updated**: 2026-02-03
- **Status**: Production documentation
- **Active Files**: 14
- **Archived Files**: 20+

---

*Index maintained by: PromptOS Team | Next review: When files are added*
