---
name: java-23
description: |
  Java 23 preview features para codificacao: primitive patterns, module imports, structured concurrency e scoped values.
  Use quando precisar avaliar recursos de linguagem e concorrencia do Java 23 em aplicacoes JVM.
keywords:
  - java-23
  - primitive-patterns
  - module-import
  - structured-concurrency
  - scoped-values
  - jep-455
  - jep-476
  - jep-480
  - jep-481
language_version: "Java 23"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://openjdk.org/projects/jdk/23/
  - https://www.oracle.com/java/technologies/javase/23-relnote-issues.html
  - https://openjdk.org/jeps/455
  - https://openjdk.org/jeps/476
  - https://openjdk.org/jeps/480
  - https://openjdk.org/jeps/481
---

# Java 23 — Preview Language + Concurrency

> **Quick Reference:** Preview features de linguagem e concorrencia do Java 23
> **Use when:** Aplicacoes Java que podem habilitar preview features

## When to Use

- ✅ Usar primitive patterns em `switch`/`instanceof` para codigo mais uniforme
- ✅ Reduzir boilerplate de imports com `import module`
- ✅ Coordenar tarefas relacionadas com structured concurrency
- ✅ Compartilhar contexto imutavel via scoped values
- ❌ **NOT for:** Producao sem `--enable-preview`

## Core Concepts

### 1. Primitive Patterns (JEP 455)

Permite padroes com tipos primitivos em `switch` e `instanceof`.

```java
int status = getStatus();

String label = switch (status) {
    case 0 -> "ok";
    case 1 -> "warn";
    case 2 -> "error";
    case int i -> "unknown: " + i;
};
```

### 2. Module Import Declarations (JEP 476)

Importa todas as packages exportadas por um modulo (preview).

```java
import module java.base;
import module java.sql; // inclui exports transitivos

// Compilar e rodar com --enable-preview
```

### 3. Structured Concurrency (JEP 480)

Trata tarefas relacionadas como uma unica unidade de trabalho.

```java
import java.util.concurrent.StructuredTaskScope;

record User(String id) {}
record Order(String id) {}

Result fetch() throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        var userTask = scope.fork(this::loadUser);
        var orderTask = scope.fork(this::loadOrder);
        scope.join();
        scope.throwIfFailed();
        return new Result(userTask.get(), orderTask.get());
    }
}
```

### 4. Scoped Values (JEP 481)

Compartilha dados imutaveis com metodos chamados e threads filhas.

```java
import java.lang.ScopedValue;

static final ScopedValue<String> REQUEST_ID = ScopedValue.newInstance();

void handle() {
    ScopedValue.where(REQUEST_ID, "req-123").run(this::process);
}

void process() {
    String id = REQUEST_ID.get();
}
```

## Best Practices

1. **Habilite preview explicitamente:** `javac --release 23 --enable-preview` e `java --enable-preview`.
2. **Use structured concurrency para tarefas correlatas:** evita cancelamentos e erros dispersos.
3. **Scoped values = contexto imutavel:** nao use para estado mutavel ou compartilhado.
4. **Refira versoes anteriores quando necessario:** Java 8/11/17/21 devem ser consultadas nas skills/docs especificas.

## Common Pitfalls

- ❌ **Esquecer preview flags:** falha de compilacao/execucao → habilite preview em build e runtime.
- ❌ **Scoped values mutaveis:** gera estado oculto → mantenha imutavel.
- ❌ **Structured concurrency para tarefas nao relacionadas:** reduz clareza → agrupe apenas unidades coesas.

## Related Skills

- [java](../SKILL.md) - Fundamentos da linguagem Java
- [java-17](../java-17/SKILL.md) - Features modernas LTS
- [java-8-orientacao-objetos](../../linguagens-programacao/java/java-8-orientacao-objetos/SKILL.md) - OOP fundamentals

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder
