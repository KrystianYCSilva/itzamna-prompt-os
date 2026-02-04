# Archive

> Legacy documentation from v1.x and v2.0.x. Superseded by v2.2.0+ architecture but preserved for historical reference.

---

## 📦 WHAT'S HERE

This directory contains documentation that is no longer current:

| Directory | Content | Status | Migration Path |
|-----------|---------|--------|-----------------|
| [add-bootstraps/](add-bootstraps/) | Bootstrap configuration docs (v1.x) | Superseded | See `.prompt-os/templates/` |
| [add-core/](add-core/) | Core module setup (v1.x) | Superseded | See `.prompt-os/core/` |
| [test-reports-2026-02-03/](test-reports-2026-02-03/) | Test execution reports | Historical | See MONITORING-GUIDE.md |
| [v1/](v1/) | Version 1.x documentation | Superseded | See `.prompt-os/` and `.context/` |

---

## 📖 WHY ARCHIVED?

- **v1.x documentation** is pre-v2.2.0, before SPEC-001 through SPEC-005 implementation
- **Bootstrap docs** were replaced by `.prompt-os/templates/`
- **Test reports** are historical and replaced by ongoing monitoring

---

## 🔄 MIGRATION GUIDE

### If you need bootstrap information:
❌ **OLD**: `docs/add-bootstraps/`  
✅ **NEW**: `.prompt-os/templates/` → `AGENTS.template.md`, `SKILL.template.md`

### If you need core protocol information:
❌ **OLD**: `docs/add-core/`  
✅ **NEW**: `.prompt-os/core/` → Individual protocol files (HUMAN-GATE, SELF-CRITIQUE, etc.)

### If you need test information:
❌ **OLD**: `docs/relatorios-testes/`  
✅ **NEW**: `docs/MONITORING-GUIDE.md` + `.context/standards/testing-strategy.md`

### If you need v1 documentation:
❌ **OLD**: `docs/v1/`  
✅ **NEW**: Latest v2.2.0+ documentation in `.prompt-os/` and `.context/`

---

## 🔗 CURRENT DOCUMENTATION

**Main documentation paths**:
- **`.prompt-os/`** — All protocols, templates, tools
- **`.context/`** — Project metadata, standards, workflows
- **`docs/`** — User-facing documentation, monitoring

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Contents**: Legacy v1.x–v2.0.x documentation  
**Policy**: No updates (archive only, use current docs)

**To reference archived docs**:
1. Check if info exists in current structure
2. If needed for historical context, reference here with note that it's superseded
3. Update links to point to current locations

