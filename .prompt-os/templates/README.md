# Templates

> Reusable Markdown templates for common PromptOS artifacts: ADR, AGENTS, CARD, INDEX, MEMORY, SKILL, TEST-PLAN, and context documents.

---

## 📋 DIRECTORY CONTENTS

| Template | Purpose | Usage |
|----------|---------|-------|
| [ADR.template.md](ADR.template.md) | Architecture Decision Records | Documenting design decisions |
| [AGENTS.template.md](AGENTS.template.md) | AI Agent definitions | Defining agents with personas, capabilities, constraints |
| [CARD.template.md](CARD.template.md) | Knowledge card (brief reference) | Quick-reference format for concepts |
| [INDEX.template.md](INDEX.template.md) | Directory index and navigation hub | Navigating complex directory structures |
| [MEMORY.template.md](MEMORY.template.md) | Agent memory and state | Recording agent history, decisions, patterns |
| [SKILL.template.md](SKILL.template.md) | Skill definition for agents | Defining capabilities and knowledge domains |
| [TEST-PLAN.template.md](TEST-PLAN.template.md) | Test plan and quality assurance | Planning test execution and coverage |
| [context/](context/) | Context document templates | Foundational project/system documentation |

---

## 📂 CONTEXT TEMPLATES

Context templates are in `[context/](context/)` subdirectory:

| Template | Purpose |
|----------|---------|
| [architectural-rules.template.md](context/architectural-rules.template.md) | System architecture rules and constraints (T0 level) |
| [code-quality.template.md](context/code-quality.template.md) | Code quality standards and practices (T1 level) |
| [project-overview.template.md](context/project-overview.template.md) | High-level project description and goals |
| [tech-stack.template.md](context/tech-stack.template.md) | Technology stack and framework choices |

---

## 🚀 HOW TO USE TEMPLATES

1. **Copy template**: `cp {template}.md {your-file}.md`
2. **Fill in content**: Replace `{{ placeholder }}` and sections
3. **Follow structure**: Maintain markdown hierarchy and formatting
4. **Reference examples**: See worked examples in `.context/` or `specs/` directories

---

## 📌 TEMPLATE STANDARDS

All templates follow these conventions:
- **Frontmatter**: YAML metadata (optional, see examples)
- **H1 Title**: Primary heading
- **Sections**: Organized with H2/H3 headings
- **Placeholders**: `{{ }}` format for interactive fields
- **Notes**: Tips marked with `>` blockquotes

---

## 🔗 QUICK NAVIGATION

- [Parent: Core](..\README.md)
- [Index](../INDEX.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total templates**: 11 (7 main + 4 context)

