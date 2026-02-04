# INDEX: Templates

> Collection of 11 reusable Markdown templates for PromptOS artifacts, skills, context documents, and quality assurance plans.

---

## 📋 MAIN TEMPLATES (7 files)

| File | Purpose | When to Use | Size |
|------|---------|------------|------|
| [ADR.template.md](ADR.template.md) | Architecture Decision Record | Recording architectural decisions and rationales | ~290 bytes |
| [AGENTS.template.md](AGENTS.template.md) | AI Agent definition | Defining new agents with personas, capabilities, constraints | ~5 KB |
| [CARD.template.md](CARD.template.md) | Knowledge card (reference) | Quick-reference cards for concepts or tools | ~553 bytes |
| [INDEX.template.md](INDEX.template.md) | Directory index | Creating navigation hubs for complex directories | ~4.8 KB |
| [MEMORY.template.md](MEMORY.template.md) | Agent memory | Recording agent history, sessions, decisions | ~3.9 KB |
| [SKILL.template.md](SKILL.template.md) | Skill definition | Documenting skills, knowledge domains, capabilities | ~6.4 KB |
| [TEST-PLAN.template.md](TEST-PLAN.template.md) | Test plan | Planning test execution, coverage, quality metrics | ~458 bytes |

---

## 📂 CONTEXT TEMPLATES (4 files in `context/` subdirectory)

| File | Purpose | When to Use | Size |
|------|---------|------------|------|
| [context/architectural-rules.template.md](context/architectural-rules.template.md) | System architecture rules | Defining T0 inviolable rules and system constraints | ~213 bytes |
| [context/code-quality.template.md](context/code-quality.template.md) | Code quality standards | Setting T1 quality standards and practices | ~181 bytes |
| [context/project-overview.template.md](context/project-overview.template.md) | Project overview | High-level project description and goals | ~206 bytes |
| [context/tech-stack.template.md](context/tech-stack.template.md) | Technology stack | Documenting framework, language, tool choices | ~347 bytes |

---

## 🎯 READING ORDER

1. Start with **README.md** (this directory) for overview
2. Choose template based on your artifact type
3. Reference examples in `.context/` or `specs/` directories
4. Follow template structure and replace placeholders

---

## 🚀 USE CASES

| Use Case | Primary Template | Context? |
|----------|-----------------|----------|
| New agent creation | AGENTS.template.md | No |
| Recording decision | ADR.template.md | No |
| Documenting skill | SKILL.template.md | No |
| Test planning | TEST-PLAN.template.md | No |
| Directory navigation | INDEX.template.md | No |
| Agent memory/history | MEMORY.template.md | No |
| Quick reference | CARD.template.md | No |
| Project setup | Multiple | YES (use context/ templates) |
| System design | ADR.template.md | YES (use architectural-rules.template.md) |

---

## 📐 TEMPLATE STRUCTURE OVERVIEW

### Main Templates
- **ADR**: Decision context, alternatives, decision, consequences
- **AGENTS**: Name, persona, capabilities, constraints, examples
- **CARD**: Term, definition, key points, use cases
- **INDEX**: Directory description, file listing, reading order, navigation
- **MEMORY**: Episodes/sessions, decisions, patterns, statistics
- **SKILL**: Name, description, use cases, key concepts, examples
- **TEST-PLAN**: Objectives, scope, resources, test cases, reporting

### Context Templates
- **architectural-rules.template.md**: Rules, rationale, exceptions, verification
- **code-quality.template.md**: Standards, linting, testing, documentation
- **project-overview.template.md**: Vision, scope, stakeholders, timeline
- **tech-stack.template.md**: Components, versions, justification, dependencies

---

## 💡 BEST PRACTICES

1. **Preserve Structure**: Keep template sections and hierarchy
2. **Replace Placeholders**: Look for `{{ }}` format and fill with actual content
3. **Follow Style**: Maintain markdown conventions (headings, tables, code blocks)
4. **Link References**: Add links to related documents (INDEX.md, SKILL.md, etc.)
5. **Version Control**: Track changes in git, update `Last updated` field

---

## 🔗 QUICK NAVIGATION

- [README.md](README.md) — Overview and usage guide
- [Parent: Core](..\README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total templates**: 11  
**Categories**: Main (7) + Context (4)  
**Typical size**: 200 bytes – 6.4 KB

