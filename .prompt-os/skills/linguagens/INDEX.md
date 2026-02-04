---
name: skills-linguagens-index
description: "INDEX: Linguagens de Programação"
---

# INDEX: Linguagens de Programação

> Curated skill collection for 6 programming languages used in PromptOS. Each language has a baseline SKILL.md and specialized advanced modules for version-specific features or deep dives.

---

## 📋 LANGUAGES

| Language | Baseline | Advanced Modules | Purpose |
|----------|----------|------------------|---------|
| **C/C++** | [SKILL.md](c-cpp/SKILL.md) | [Memory](c-cpp/advanced-memory.md), [Build Tools](c-cpp/build-tools.md), [Compilation](c-cpp/compilation.md) | Systems programming, performance-critical code |
| **Go** | [SKILL.md](go/SKILL.md) | — | Concurrent systems, CLI tools, microservices |
| **Java** | [SKILL.md](java/SKILL.md) | [8](java/java-8/), [11](java/java-11/), [17](java/java-17/), [21](java/java-21/), [23](java/java-23/) | Enterprise applications, JVM ecosystem, backend systems |
| **JavaScript** | [SKILL.md](javascript/SKILL.md) | [Ecosystem](javascript/ecosystem.md) | Web development, Node.js, browser APIs |
| **Kotlin** | [SKILL.md](kotlin/SKILL.md) | [1.x](kotlin/kotlin-1xx/), [2.x (OOP)](kotlin/kotlin-2xx/kotlin-orientacao-objetos.md), [2.x (Functional)](kotlin/kotlin-2xx/kotlin-funcional.md) | JVM interop, Android development, modern language features |
| **Python** | [SKILL.md](python/SKILL.md) | [Ecosystem](python/ecosystem.md) | Data science, automation, web development, scripting |

---

## 🗺️ DIRECTORY STRUCTURE

```
.prompt-os/skills/linguagens/
├── INDEX.md (you are here)
├── c-cpp/
│   ├── INDEX.md
│   ├── SKILL.md
│   ├── advanced-memory.md
│   ├── build-tools.md
│   └── compilation.md
├── go/
│   ├── INDEX.md
│   └── SKILL.md
├── java/
│   ├── INDEX.md
│   ├── SKILL.md
│   ├── java-8/
│   │   └── SKILL.md
│   ├── java-11/
│   │   └── SKILL.md
│   ├── java-17/
│   │   └── SKILL.md
│   ├── java-21/
│   │   └── SKILL.md
│   └── java-23/
│       └── SKILL.md
├── javascript/
│   ├── INDEX.md
│   ├── SKILL.md
│   └── ecosystem.md
├── kotlin/
│   ├── INDEX.md
│   ├── SKILL.md
│   ├── kotlin-1xx/
│   │   └── SKILL.md
│   └── kotlin-2xx/
│       ├── SKILL.md
│       ├── kotlin-funcional.md
│       └── kotlin-orientacao-objetos.md
└── python/
    ├── INDEX.md
    ├── SKILL.md
    └── ecosystem.md
```

---

## 🎯 HOW TO USE

### For New Agents / Personas
1. Start with **SKILL.md** in the language directory
2. If dealing with version-specific features, check the version-specific module (e.g., `java-21/SKILL.md`)
3. For ecosystem questions (frameworks, package managers), check the ecosystem module

### For Deep Dives
- **C/C++**: See advanced modules for memory management, build systems, compilation strategies
- **Java**: Check version-specific modules for Java 8/11/17/21/23 feature differences
- **Kotlin**: Version modules cover 1.x vs 2.x paradigm shifts
- **JavaScript/Python**: Ecosystem.md covers frameworks, dependency management, best practices

### Reading Order (Recommended)
1. Language-specific `INDEX.md` (e.g., `java/INDEX.md`)
2. `SKILL.md` (foundational knowledge)
3. Advanced modules (version-specific or deep dives)
4. Ecosystem.md (if applicable)

---

## 📊 LANGUAGE STATISTICS

| Language | Files | Depth | Version Coverage |
|----------|-------|-------|-----------------|
| C/C++ | 4 | Deep (memory, build, compilation) | All |
| Go | 1 | Baseline | Current |
| Java | 6 | Very Deep (5 versions) | 8–23 |
| JavaScript | 2 | Baseline + Ecosystem | ES2020+ |
| Kotlin | 5 | Deep (version + paradigm) | 1.x, 2.x |
| Python | 2 | Baseline + Ecosystem | 3.6+ |

**Total**: 20 files across 6 languages

---

## 🔗 QUICK NAVIGATION

- [Parent Directory](../README.md)
- [Skills Hub](../README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total files**: 20  
**Total directories**: 11  
**Version**: 1.0.0

**To add a new language**:
1. Create `{language}/` directory
2. Add `{language}/SKILL.md` baseline
3. Add version/advanced modules if applicable
4. Create `{language}/INDEX.md` explaining structure
5. Update this file with new row in table

