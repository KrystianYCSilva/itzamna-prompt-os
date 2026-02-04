# INDEX: Kotlin

> JVM language designed for interoperability with Java, modern syntax, null safety, and functional programming. Covers Kotlin 1.x and 2.x with paradigm-specific modules.

---

## 📋 CONTENTS

| File | Purpose | When to Use |
|------|---------|------------|
| [SKILL.md](SKILL.md) | Kotlin fundamentals: syntax, null safety, extension functions, coroutines, interop with Java | Core Kotlin knowledge applicable to all versions |
| [kotlin-1xx/SKILL.md](kotlin-1xx/SKILL.md) | Kotlin 1.x specifics: features, stability, compatibility notes | Kotlin 1.x projects, legacy codebases |
| [kotlin-2xx/SKILL.md](kotlin-2xx/SKILL.md) | Kotlin 2.x overview: K2 compiler, language refinements, breaking changes | Understanding 1.x to 2.x migration |
| [kotlin-2xx/kotlin-orientacao-objetos.md](kotlin-2xx/kotlin-orientacao-objetos.md) | OOP in Kotlin 2.x: classes, data classes, sealed classes, delegation, design patterns | OOP-focused development in modern Kotlin |
| [kotlin-2xx/kotlin-funcional.md](kotlin-2xx/kotlin-funcional.md) | Functional programming in Kotlin 2.x: lambdas, higher-order functions, immutability, functional idioms | Functional paradigm and reactive systems |

---

## 🎯 READING ORDER

1. **Start Here**: [SKILL.md](SKILL.md) — Learn Kotlin fundamentals
2. **Version Selection**:
   - Using Kotlin 1.x? → [kotlin-1xx/SKILL.md](kotlin-1xx/SKILL.md)
   - Migrating to 2.x? → [kotlin-2xx/SKILL.md](kotlin-2xx/SKILL.md)
3. **Paradigm Focus**:
   - OOP-heavy project? → [kotlin-orientacao-objetos.md](kotlin-2xx/kotlin-orientacao-objetos.md)
   - Functional/reactive? → [kotlin-funcional.md](kotlin-2xx/kotlin-funcional.md)

---

## 🚀 USE CASES

| Use Case | Primary File | Secondary Files |
|----------|-------------|-----------------|
| Learning Kotlin | SKILL.md | — |
| Kotlin 1.x projects | SKILL.md + kotlin-1xx/SKILL.md | — |
| Kotlin 2.x migration | SKILL.md + kotlin-2xx/SKILL.md | Paradigm file |
| Android development | SKILL.md + kotlin-orientacao-objetos.md | — |
| Reactive/functional | SKILL.md + kotlin-funcional.md | — |
| Java interop | SKILL.md | — |

---

## 📚 KEY CONCEPTS COVERED

### Core (SKILL.md)
- **Syntax**: Variables, functions, control flow, collections
- **Null Safety**: Nullable types (?), non-null assertions, Elvis operator, safe call
- **Extension Functions**: Adding methods to existing types without inheritance
- **Coroutines**: Suspend functions, launch, async, structured concurrency
- **Higher-Order Functions**: Function types, lambdas, receiver contexts
- **Java Interoperability**: Calling Java from Kotlin, platform types, null safety mismatch

### OOP Paradigm (kotlin-orientacao-objetos.md)
- Classes, data classes, sealed classes, enum classes
- Inheritance, composition, delegation patterns
- Properties with custom getters/setters
- Object declarations and companion objects

### Functional Paradigm (kotlin-funcional.md)
- Pure functions, immutability, function composition
- Functional collection operations (map, filter, fold, reduce)
- Functional idioms and best practices
- Reactive patterns with coroutines

### Version-Specific
| Version | Key Highlights |
|---------|----------------|
| **1.x** | Stable, widely used, mature ecosystem |
| **2.x** | K2 compiler (faster), language refinements, improved type inference |

---

## 🔄 VERSION MIGRATION PATH

- **From Java**: Learn Kotlin fundamentals + null safety + extension functions
- **Within Kotlin**: 1.x → 2.x (mostly backward compatible, check deprecations)
- **Cross-paradigm**: Core → OOP-specific OR Core → Functional-specific

---

## 💡 EXPANSION OPPORTUNITIES (v2.3.0+)

- Kotlin multiplatform (KMP) modules
- DSL design and implementation
- Testing frameworks (JUnit, Kotest)
- Performance optimization specific to Kotlin

---

## 🔗 QUICK NAVIGATION

- [Parent: Linguagens](../INDEX.md)
- [Skills Hub](../../README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total files**: 5 (1 core + 1 version overview + 3 paradigm/version deep-dives)  
**Depth**: Deep (version coverage + paradigm modules)  
**Versions**: 1.x, 2.x

