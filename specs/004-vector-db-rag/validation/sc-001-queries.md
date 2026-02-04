# SC-001: 20-Query Search Test Set

**Purpose**: Validate that the similarity-scoring protocol surfaces the correct skill in top-3 for natural-language queries that do NOT use exact skill names.  
**Target**: ≥ 80% hit-rate (≥ 16 / 20 correct in top-3).  
**Registry**: 13 skills in `.prompt-os/skills/INDEX.md` (6 baselines + 7 advanced).  
**Gap queries**: Queries 19 and 20 target topics with no matching skill — expected outcome is `gapDetected = true`.

---

| # | Query | Expected Skill | Rationale |
|---|-------|----------------|-----------|
| Q01 | "How do I run tasks in parallel in Go?" | go | goroutines = Go's concurrency model; "parallel" → concurrency signal |
| Q02 | "I need to write a web scraper in Python" | python | web + automation + Python ecosystem |
| Q03 | "What's the best way to handle async operations in a browser app?" | javascript | event loop + async-await + browser |
| Q04 | "How do I manage memory manually without a garbage collector?" | c-cpp | manual-memory, pointers, no GC |
| Q05 | "I want to build an Android app with null-safe types" | kotlin | null-safety + android |
| Q06 | "Explain how the JVM executes bytecode and manages threads" | java | JVM + threads + tipagem-estatica |
| Q07 | "How do streams and lambdas work in Java?" | java-8 | lambdas + streams-api = java-8 keywords |
| Q08 | "I want to use the new HTTP client without external libraries in Java" | java-11 | http-client = java-11 keyword |
| Q09 | "How do I use sealed classes and records in Java?" | java-17 | sealed-classes + records = java-17 keywords |
| Q10 | "Tell me about virtual threads and sequenced collections" | java-21 | virtual-threads + sequenced-collections = java-21 |
| Q11 | "What changed in Java 23 with structured concurrency?" | java-23 | structured-concurrency + java-23 |
| Q12 | "How do I create DSLs and extension functions in Kotlin?" | kotlin-1xx | dsl-building + extension-functions = kotlin-1xx |
| Q13 | "I need to understand the K2 compiler improvements in Kotlin" | kotlin-2xx | k2 + context-receivers = kotlin-2xx |
| Q14 | "How do I build a REST API server that handles many requests?" | go | APIs backend + microservices + concurrency (go's strength) |
| Q15 | "What's the difference between duck typing and static typing?" | python | duck-typing is a python keyword; description contrast |
| Q16 | "How do closures and the event loop work in Node.js?" | javascript | event-loop + nodejs keywords |
| Q17 | "I want type inference so I don't have to declare variable types" | java-11 | var / local-variable-type-inference = java-11; also python (duck typing) — java-11 should win on keyword match |
| Q18 | "How do I write high-performance native code that runs on bare metal?" | c-cpp | native-compilation + performance + low-level |
| Q19 | "How do I consume messages from a Kafka topic?" | *(none — gap)* | No skill covers Kafka; gapDetected expected |
| Q20 | "What are the best practices for deploying containers with Kubernetes?" | *(none — gap)* | No skill covers Kubernetes/containers; gapDetected expected |

---

*Generated for SPEC-004 SC-001 validation | 2026-02-03*
