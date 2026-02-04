---
name: skills-linguagens-java-index
description: "INDEX: Java"
---

# INDEX: Java

> Enterprise language built on the JVM, emphasizing platform independence, strong typing, and mature ecosystem. Covers Java 8 through Java 23 with version-specific features.

---

## 📋 CONTENTS

| File | Purpose | When to Use |
|------|---------|------------|
| [SKILL.md](SKILL.md) | Java fundamentals: syntax, OOP, JVM model, generics, annotations, concurrency | Core Java knowledge, applicable across versions |
| [java-8/SKILL.md](java-8/SKILL.md) | Java 8 specifics: lambdas, streams, functional interfaces, default methods | Legacy systems, Java 8 LTS projects |
| [java-11/SKILL.md](java-11/SKILL.md) | Java 11 features: var keyword, modules, HTTP client, local variable type inference | Java 11 LTS codebases |
| [java-17/SKILL.md](java-17/SKILL.md) | Java 17 features: sealed classes, pattern matching (preview), records | Java 17 LTS, modern enterprise systems |
| [java-21/SKILL.md](java-21/SKILL.md) | Java 21 features: virtual threads, structured concurrency, pattern matching | High-concurrency systems, latest LTS |
| [java-23/SKILL.md](java-23/SKILL.md) | Java 23 features: latest previews, experimental APIs, upcoming features | Cutting-edge development, feature evaluation |

---

## 🎯 READING ORDER

1. **Start Here**: [SKILL.md](SKILL.md) — Understand Java core concepts
2. **Version Selection**:
   - Java 8 legacy? → [java-8/SKILL.md](java-8/SKILL.md)
   - Java 11 LTS? → [java-11/SKILL.md](java-11/SKILL.md)
   - Java 17 LTS? → [java-17/SKILL.md](java-17/SKILL.md)
   - Java 21 LTS? → [java-21/SKILL.md](java-21/SKILL.md)
   - Evaluating 23? → [java-23/SKILL.md](java-23/SKILL.md)

---

## 🚀 USE CASES

| Use Case | Primary File | Version Modules |
|----------|-------------|-----------------|
| Learning Java | SKILL.md | — |
| Legacy maintenance (8/11) | SKILL.md + Version file | java-8, java-11 |
| Modern enterprise (17+) | SKILL.md + Version file | java-17, java-21 |
| High-performance concurrency | SKILL.md | java-21 (virtual threads) |
| Evaluating language evolution | Multiple | Compare across versions |

---

## 📚 KEY CONCEPTS COVERED

### Core (SKILL.md)
- **OOP**: Classes, interfaces, inheritance, polymorphism, composition
- **Type System**: Generics, bounded wildcards, type erasure
- **Concurrency**: Threads, synchronized, volatile, java.util.concurrent
- **JVM Model**: Bytecode, class loading, garbage collection, memory model
- **Standard Library**: Collections, Streams (8+), lambda expressions, annotations

### Version-Specific Highlights
| Version | Key Features |
|---------|-------------|
| **8** | Lambda expressions, streams, functional interfaces, default methods |
| **11** | Var keyword, modules (JPMS), HTTP/2 client, local variable type inference |
| **17** | Sealed classes, pattern matching (preview), records (preview) |
| **21** | Virtual threads (Project Loom), structured concurrency, pattern matching (finalized) |
| **23** | Pattern matching refinements, experimental APIs, unnamed variables |

---

## 🔄 VERSION MIGRATION PATH

**Recommended progression** for keeping skills current:
- **LTS Focus**: 8 → 11 → 17 → 21 (each LTS is 3 years support)
- **Feature Learning**: 17 → 21 → 23 (understand evolution)

---

## 💡 EXPANSION OPPORTUNITIES (v2.3.0+)

- Java 25+ preview features
- Framework-specific modules (Spring Boot, Quarkus, Micronaut)
- Performance tuning and profiling guides
- Testing frameworks depth

---

## 🔗 QUICK NAVIGATION

- [Parent: Linguagens](../INDEX.md)
- [Skills Hub](../../README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total files**: 6 (1 core + 5 version-specific)  
**Depth**: Very Deep (comprehensive version coverage, 8–23)  
**LTS Versions**: 8, 11, 17, 21

