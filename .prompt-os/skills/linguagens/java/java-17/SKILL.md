---
name: java-17
description: |
  Java 17 LTS features: sealed classes, records, pattern matching, virtual threads preview, and enhanced encapsulation.
  Use when leveraging modern Java patterns for type safety, concurrency, and maintainability in JVM applications.
keywords:
  - java-17
  - sealed-classes
  - records
  - pattern-matching
  - virtual-threads
  - jvm
language_version: "Java 17 LTS"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://docs.oracle.com/en/java/javase/17/
  - https://openjdk.org/projects/jdk/17/
  - https://openjdk.org/jeps/356
  - https://openjdk.org/jeps/378
---

# Java 17 — Modern Language Features

> **Quick Reference:** Long-term support release with sealed classes, records, enhanced pattern matching, and virtual thread preview
> **Use when:** Building type-safe, maintainable JVM applications with modern Java idioms

## When to Use

- ✅ Implementing domain hierarchies with sealed classes for exhaustive type checking
- ✅ Creating immutable data structures via records with automatic accessors and equals/hashCode
- ✅ Matching on complex object structures with pattern matching (switch expressions)
- ✅ Experimenting with virtual threads for high-concurrency scenarios
- ✅ Enforcing strong encapsulation and removing deprecated warnings in Java 9+ code
- ❌ **NOT for:** Legacy systems requiring Java 8/11 compatibility without migration

## Core Concepts

### 1. Sealed Classes

Sealed classes restrict which types can extend or implement them, enabling exhaustive type analysis.

```java
// Define sealed class with permitted subtypes
public sealed class Shape permits Circle, Rectangle, Triangle {
    public abstract double area();
}

// Non-sealed allows further extension
public non-sealed class Circle extends Shape {
    private double radius;
    public double area() { return Math.PI * radius * radius; }
}

// Final prevents further extension
public final class Rectangle extends Shape {
    private double width, height;
    public double area() { return width * height; }
}

// Pattern matching with sealed exhaustiveness
double calculateArea(Shape shape) {
    return switch(shape) {
        case Circle c -> Math.PI * c.radius() * c.radius()
        case Rectangle r -> r.width() * r.height()
        case Triangle t -> 0.5 * t.base() * t.height()
        // Compiler guarantees all cases covered—no default needed
    };
}
```

### 2. Records

Immutable data carriers with automatically generated constructors, accessors, equals/hashCode, and toString.

```java
// Compact constructor syntax
public record Person(String name, int age, String email) {
    // Automatic: canonical constructor, getters, equals, hashCode, toString

    // Compact constructor for validation
    public Person {
        if (age < 0) throw new IllegalArgumentException("Age must be non-negative");
    }
}

// Usage
Person p = new Person("Alice", 30, "alice@example.com");
String name = p.name();  // Auto-generated accessor

// Pattern matching with records
if (p instanceof Person(var name, var age, _)) {
    System.out.println(name + " is " + age);
}
```

### 3. Enhanced Pattern Matching

Patterns enable concise condition extraction from complex objects.

```java
// Type pattern (Java 16+)
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}

// Record pattern (Java 17+)
record Point(int x, int y) {}
if (obj instanceof Point(int x, int y) && x > 0) {
    System.out.println("Point in first quadrant: " + x + "," + y);
}

// Switch pattern matching
Object value = getObject();
String result = switch(value) {
    case Integer i && i > 0 -> "Positive: " + i
    case Integer i -> "Non-positive: " + i
    case String s -> "String: " + s
    case null -> "Null value"
    default -> "Unknown type"
};
```

### 4. Virtual Threads (Preview)

Lightweight, user-mode threads for handling massive concurrency without OS thread overhead.

```java
// Virtual thread execution (Preview API)
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

for (int i = 0; i < 10_000; i++) {
    executor.submit(() -> {
        try {
            Thread.sleep(1000);  // Lightweight sleep, no OS thread blocking
            System.out.println("Task from virtual thread");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    });
}

executor.awaitTermination(10, TimeUnit.SECONDS);

// Virtual thread API
Thread vthread = Thread.ofVirtual()
    .name("worker-", 0)
    .start(() -> System.out.println("Running on virtual thread"));
vthread.join();
```

## Best Practices

1. **Use sealed classes for domain models:** Restrict inheritance hierarchies to known types for type safety
2. **Prefer records for data:** Eliminate boilerplate in immutable value objects; compact constructors for validation
3. **Leverage pattern matching:** Simplify conditionals and reduce casting; use guards (`&&`) for complex conditions
4. **Virtual threads for I/O-bound:** Use virtual threads for handling thousands of concurrent I/O operations
5. **Strong encapsulation ready:** Ensure code uses public APIs; `--add-opens` is deprecated path

## Common Pitfalls

- ❌ **Mutable records:** Records are immutable—don't try to add setters → Use sealed classes + mutable fields if needed
- ❌ **Sealed class design:** Too restrictive hierarchy → Keep sealed classes close to usage domain
- ❌ **Virtual thread assumptions:** Not a magic bullet for CPU-bound work → Use for I/O-bound concurrency only
- ❌ **Incomplete pattern matching:** Missing a case in sealed switch → Compiler enforces exhaustiveness

## Related Skills

- [java](../SKILL.md) - Baseline Java fundamentals
- [kotlin](../../kotlin/SKILL.md) - JVM language with similar modern patterns
- [api-rest](../../backend/api-rest/SKILL.md) - REST APIs using Java 17 records + sealed classes

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder
