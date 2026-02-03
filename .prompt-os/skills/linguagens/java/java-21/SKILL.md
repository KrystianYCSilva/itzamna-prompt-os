---
name: java-21
description: |
  Principais novidades do Java 21 (LTS), com foco em virtual threads, pattern matching e coleções sequenciadas.
  Use quando precisar adotar recursos modernos do Java 21 com segurança e clareza.
keywords:
  - java-21
  - virtual-threads
  - pattern-matching
  - record-patterns
  - sequenced-collections
  - structured-concurrency
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://openjdk.org/projects/jdk/21/
  - https://mail.openjdk.org/pipermail/announce/2023-September/000337.html
  - https://openjdk.org/jeps/444
  - https://openjdk.org/jeps/441
  - https://openjdk.org/jeps/440
  - https://openjdk.org/jeps/431
  - https://openjdk.org/jeps/453
  - https://openjdk.org/jeps/446
  - https://openjdk.org/jeps/430
---

# Java 21 (LTS)

> **Quick Reference:** LTS com virtual threads, pattern matching e colecoes sequenciadas
> **Use when:** Migrando para Java 21 ou buscando modernizar concorrencia e legibilidade

## When to Use

- ✅ Adotar o LTS Java 21 em projetos enterprise ou servicos criticos
- ✅ Melhorar concorrencia com virtual threads em workloads de I/O bloqueante
- ✅ Simplificar codigo com pattern matching e record patterns
- ❌ **NOT for:** Ambientes presos a JVM < 21 ou sem suporte a `--enable-preview`

## Core Concepts

### 1. Virtual Threads (JEP 444)

Virtual threads sao leves e ideais para alta concorrencia com I/O bloqueante.

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<String> f = executor.submit(() -> {
        Thread.sleep(100);
        return "ok";
    });
    System.out.println(f.get());
}
```

### 2. Pattern Matching for switch + Record Patterns (JEP 441/440)

Permite deconstruir records e reduzir casts/boilerplate.

```java
record Point(int x, int y) {}

static String describe(Object o) {
    return switch (o) {
        case Point(int x, int y) -> "Point(" + x + "," + y + ")";
        case String s -> "String(" + s + ")";
        default -> "Unknown";
    };
}
```

### 3. Sequenced Collections (JEP 431)

Metodos padrao para acessar extremos e inverter ordem.

```java
List<String> names = new ArrayList<>();
names.add("Ana");
names.add("Bob");

String first = names.getFirst();
String last = names.getLast();
List<String> reversed = names.reversed();
```

## Best Practices

1. **Virtual threads para I/O:** Use para chamadas bloqueantes; CPU-bound continua melhor em platform threads.
2. **Switch exaustivo:** Prefira `switch` exaustivo com sealed types/records para evitar `default` generico.
3. **Intencao explicita:** Use `getFirst()`/`getLast()` em vez de indices magicos.

## Common Pitfalls

- ❌ **Preview sem flags:** Recursos preview exigem `--enable-preview` no `javac` e no `java`.
- ❌ **Assumir ganho em CPU-bound:** Virtual threads nao aceleram tarefas puramente computacionais.
- ❌ **Switch nao exaustivo:** Pode gerar `MatchException` se nenhum padrao bater.

## Related Skills

- [java](../SKILL.md) - Fundamentos da linguagem
- [java-8](../java-8/SKILL.md) - Features introduzidas no Java 8

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder
