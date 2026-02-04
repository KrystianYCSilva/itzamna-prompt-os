# docs/ - Human-Facing Documentation

> **Documentation for humans using PromptOS**  
> Reference guides, architecture docs, and monitoring resources.

---

## What is docs/?

`docs/` contains **human-readable documentation** about the PromptOS system, architecture decisions, monitoring, and integration patterns.

This is **different from:**
- **.prompt-os/** - AI system core (for agents to read and follow)
- **.context/** - AI context files (domain knowledge for agents)

---

## Key Difference: Three Documentation Layers

| Layer | Location | Audience | Purpose | Format |
|-------|----------|----------|---------|--------|
| **AI System** | `.prompt-os/` | AI Agents | Rules, protocols, skills | Markdown (prompt-based) |
| **AI Context** | `.context/` | AI Agents | Domain knowledge, workflows | Markdown + YAML |
| **Human Docs** | `docs/` | Humans | Architecture, guides, analysis | Markdown articles |

---

## Directory Structure

```
docs/
├── monitoring/              # Monitoring templates & guides
├── templates/               # RFC & planning templates
├── _archive/                # Archived/legacy content (v1.x)
├── relatorios-testes/       # Test reports (legacy)
├── add-bootstraps/          # Legacy bootstrap files
├── add-core/                # Legacy core resources
├── v1/                      # Version 1.0 archives
├── ARCHITECTURE.md          # System architecture
├── GAP-ANALYSIS.md          # Feature gaps & analysis
├── GLOSSARIO-TECNICO-PROMPTOS.md  # Technical glossary
├── IMPLEMENTATION-STATUS.md # Feature implementation tracking
├── INTEGRATION-ANALYSIS.md  # Integration patterns & analysis
├── MONITORING-GUIDE.md      # Operational monitoring
├── TIER-SYSTEM.md           # Skill tier/level system
└── INDEX.md                 # Master index of this directory
```

---

## Major Directories

### **monitoring/** - Monitoring Templates & Guides

Operational monitoring resources for managing PromptOS systems:

- Health check templates
- Performance metrics guides
- Alert configuration
- Logging standards

### **templates/** - RFC & Planning Templates

Templates for documentation and planning:

- RFC (Request for Comments) templates
- Decision documentation
- Planning documents
- Specification templates

### **_archive/** - Archived Content

Legacy and archived documentation from earlier versions:

- v1.x documentation
- Deprecated patterns
- Historical decisions
- Superseded specifications

---

## Active Documentation

### Root-Level Documentation Files (7 files)

| File | Purpose | Audience | Status | Tags |
|------|---------|----------|--------|------|
| `ARCHITECTURE.md` | System architecture, components, flow diagrams | Architects, Developers | Current | architecture, design |
| `GAP-ANALYSIS.md` | Feature gaps, missing implementations, todo items | Product, Developers | Current | gaps, planning, features |
| `GLOSSARIO-TECNICO-PROMPTOS.md` | Technical terminology and definitions | All | Current | glossary, terms, reference |
| `IMPLEMENTATION-STATUS.md` | Feature tracking, implementation progress | Project Managers | Current | status, tracking, features |
| `INTEGRATION-ANALYSIS.md` | Integration patterns, compatibility, apis | Developers | Current | integration, patterns, api |
| `MONITORING-GUIDE.md` | Operational monitoring, health checks, alerts | DevOps, SRE | Current | monitoring, operations |
| `TIER-SYSTEM.md` | Skill tier/level definitions, categorization | Developers | Current | tiers, levels, classification |

---

## Documentation Characteristics

### This is a Prompt-Based System

PromptOS is fundamentally **prompt-based**:

- **No runtime system** - No process running continuously
- **No database** - State stored in Markdown files (MEMORY.md)
- **Pure Markdown** - Everything is Markdown that AI agents read
- **Human tools optional** - Scripts in `.prompt-os/tools/` are optional convenience

This means:
- Documentation is the specification
- Files are the API
- Markdown is the protocol

### Human Documentation is Reference

The docs/ in this directory are **reference materials** for human understanding:

- Explain WHY decisions were made
- Provide context and background
- Document architecture and design
- Serve as guides for using the system

They are **NOT instructions for AI agents** (those are in `.prompt-os/`).

---

## Quick Navigation

### For Understanding the System
1. **Architecture Overview** → `ARCHITECTURE.md`
2. **What exists?** → `IMPLEMENTATION-STATUS.md`
3. **What's missing?** → `GAP-ANALYSIS.md`
4. **How to integrate?** → `INTEGRATION-ANALYSIS.md`

### For Operational Use
1. **Monitor the system** → `MONITORING-GUIDE.md`
2. **Understand skill levels** → `TIER-SYSTEM.md`
3. **Look up terminology** → `GLOSSARIO-TECNICO-PROMPTOS.md`

### For Administration
1. **Check status** → `IMPLEMENTATION-STATUS.md`
2. **View metrics** → `monitoring/` directory
3. **Understand tiers** → `TIER-SYSTEM.md`

### Related Resources
- **AI Agent Guide** → `.context/ai-assistant-guide.md`
- **AI System Core** → `.prompt-os/README.md`
- **Project Configuration** → `AGENTS.md` (root)

---

## File Metadata

| File | Size | Audience | Update Freq |
|------|------|----------|-------------|
| ARCHITECTURE.md | ~12KB | Technical | Quarterly |
| GAP-ANALYSIS.md | ~8KB | Product/Tech | Monthly |
| GLOSSARIO-TECNICO-PROMPTOS.md | ~15KB | All | Ad-hoc |
| IMPLEMENTATION-STATUS.md | ~10KB | PM/Tech | Weekly |
| INTEGRATION-ANALYSIS.md | ~9KB | Technical | Quarterly |
| MONITORING-GUIDE.md | ~7KB | DevOps | Quarterly |
| TIER-SYSTEM.md | ~6KB | Technical | Quarterly |

---

## Archive Structure

For historical reference, archived content is located in:

- `_archive/` - General legacy content
- `_archive/v1/` - Version 1.0 specific
- `relatorios-testes/` - Test report archives
- `add-bootstraps/` - Legacy bootstrap files
- `add-core/` - Legacy core resources

These are preserved for reference but should not be used for current development.

---

## Documentation Standards

### Markdown Format
- Standard GitHub-flavored Markdown (GFM)
- Tables for structured data
- Code blocks for examples
- Links to related files

### Structure
- Clear headings hierarchy
- Table of contents for long docs
- Links to related sections
- "Quick navigation" for discoverability

### Audience
- Written for humans (not AI agents)
- Plain language explanations
- Business context where relevant
- Technical accuracy

---

## Contribution Guidelines

When adding new documentation:

1. **Choose correct layer**
   - AI system rules → `.prompt-os/`
   - AI context/knowledge → `.context/`
   - Human reference → `docs/`

2. **Follow standards**
   - Use GFM Markdown
   - Include metadata (purpose, audience, status)
   - Link to related files

3. **Update INDEX.md**
   - Add entry to `docs/INDEX.md`
   - Update file tables
   - Include purpose and tags

4. **Archive old content**
   - Move to `_archive/` when superseded
   - Preserve version information
   - Update links in active docs

---

## Version & Maintenance

- **Version**: 2.2.0
- **Last Updated**: 2026-02-03
- **Status**: Production documentation
- **Archive**: Yes (_archive/ subdirectory)

---

## Statistics

| Category | Count |
|----------|-------|
| Active Documentation Files | 7 |
| Monitoring Resources | 4+ |
| Templates | 3+ |
| Archived Files | 20+ |
| Total Files | 35+ |

---

*For complete file listing and detailed navigation, see [INDEX.md](./INDEX.md)*
