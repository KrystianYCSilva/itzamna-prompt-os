# SC-003: 5-Draft Redundancy Test Set

**Purpose**: Validate the two-tier redundancy gate catches all overlapping drafts before persistence. Zero false negatives required.  
**Target**: Every draft with similarity ≥ 80 is flagged. Every draft ≥ 90 is hard-blocked (2 options only).  
**Composition**: ≥ 2 near-duplicate (≥ 90), ≥ 2 high-overlap (80-89), 1 allowed (< 80).

---

## Draft 1 — "Go Concurrency Patterns" (Expected: ≥ 90 vs `go`)

**Title**: Go Concurrency Patterns  
**Tags**: [goroutines, channels, concurrency, go, parallel-execution]  
**Description**: A guide to Go's concurrency primitives: goroutines, channels, select statements, and WaitGroups for parallel task execution.  
**Overlap target**: `go` — shares goroutines, channels, concurrency directly. Content is a subset of go baseline.

---

## Draft 2 — "Python Automation Scripts" (Expected: ≥ 90 vs `python`)

**Title**: Python Automation Scripts  
**Tags**: [python, automation, pip, scripting, duck-typing]  
**Description**: Writing automation scripts in Python using standard library modules. Covers file I/O, process management, and scheduling.  
**Overlap target**: `python` — shares python, pip, duck-typing, automation (in description). Content is a specialization of python baseline scope.

---

## Draft 3 — "Python Async Patterns" (Expected: 80-89 vs `python`)

**Title**: Python Async Patterns  
**Tags**: [python, asyncio, async-await, concurrency, event-loop]  
**Description**: Advanced async programming patterns in Python using asyncio: task groups, async generators, and structured concurrency.  
**Overlap target**: `python` — shares python, asyncio, dynamic-typing adjacency. But "async patterns" is a distinct sub-topic not fully covered by the baseline. Enough divergence for 80-89 band.

---

## Draft 4 — "JavaScript Testing Fundamentals" (Expected: 80-89 vs `javascript`)

**Title**: JavaScript Testing Fundamentals  
**Tags**: [javascript, testing, jest, npm, unit-testing]  
**Description**: Unit and integration testing in JavaScript using Jest. Covers mocking, async testing, and test-driven development workflows.  
**Overlap target**: `javascript` — shares javascript, npm. But "testing" is a distinct domain not covered by the JS baseline. Enough divergence for 80-89 band.

---

## Draft 5 — "Rust Systems Programming" (Expected: < 80 — allowed)

**Title**: Rust Systems Programming  
**Tags**: [rust, ownership, borrow-checker, systems, native-compilation]  
**Description**: Systems programming in Rust: ownership model, zero-cost abstractions, and safe concurrency without a garbage collector.  
**Overlap target**: `c-cpp` is the closest (native-compilation, systems, no GC) but Rust is a different language entirely. Overlap should land < 80.

---

*SC-003 Draft Set | SPEC-004 | 2026-02-03*
