---
name: kotlin-orientacao-objetos
description: |
  Aborda o paradigma de orientação a objetos em Kotlin, e como as features do K2 o aprimoram.
  Use para aprender sobre delegação, encapsulamento e como `context receivers` podem refinar design patterns.
keywords:
  - kotlin
  - oop
  - objects
  - delegation
  - design-patterns
category: academic
subcategory: programming-paradigms
version: "1.0.0"
created: 2026-02-03
type: skill-session
---

# Sessão JIT: Kotlin Orientado a Objetos com K2

> **Quick Reference:** Técnicas de programação orientada a objetos (OOP) em Kotlin, com otimizações do K2.
> **Use when:** Modelar sistemas complexos usando abstração, encapsulamento e polimorfismo.

## Encapsulamento e Modificadores de Visibilidade

Kotlin oferece `public`, `private`, `protected`, e `internal` para controlar a visibilidade de classes e membros. `internal` é particularmente útil para módulos, restringindo o uso ao mesmo build module.

```kotlin
// Visível apenas dentro do mesmo módulo
internal class ModuleApi {
    
    // Visível apenas dentro desta classe
    private val secret = "secret"

    fun expose() { /* ... */ }
}

// Pública, visível em qualquer lugar
class PublicApi
```

## Delegação de Propriedades e Classes

Kotlin tem suporte de primeira classe para o padrão de delegação.

### Delegação de Classe
Permite compor comportamento em vez de herdar.

```kotlin
interface CanFly {
    fun fly()
}
class Bird : CanFly {
    override fun fly() = println("Flying")
}

// A classe 'Plane' DELEGA a implementação de 'CanFly' para um objeto 'Bird'
class Plane(bird: CanFly) : CanFly by bird

val plane = Plane(Bird())
plane.fly() // Output: Flying
```

### Delegação de Propriedade
Adia ou gerencia a lógica de inicialização de uma propriedade.

```kotlin
// 'lazy' é uma função da stdlib que implementa a delegação
val heavyObject: String by lazy {
    println("Initializing heavy object...")
    "I am heavy"
}

fun main() {
    println("Before first access")
    println(heavyObject) // "Initializing..." é impresso aqui
    println(heavyObject) // Não imprime mais, o valor já foi cacheado
}
```

## Design Patterns com Context Receivers

`context receivers` podem simplificar a implementação de certos design patterns. Por exemplo, o padrão **Strategy** pode ser implementado de forma mais fluida.

```kotlin
// Estratégia de validação
fun interface Validator {
    fun validate(input: String): Boolean
}

val notEmpty = Validator { it.isNotEmpty() }
val isEmail = Validator { ".+\@.+\..+".toRegex().matches(it) }

// A função 'processInput' requer um 'Validator' no contexto
context(Validator)
fun processInput(input: String) {
    if (validate(input)) { // 'validate' vem do Validator no contexto
        println("Input is valid.")
    } else {
        println("Input is invalid.")
    }
}

fun main() {
    val userInput = "test@example.com"

    println("--- Validating for not empty ---")
    with(notEmpty) {
        processInput(userInput) // Output: Input is valid.
    }

    println("--- Validating for email format ---")
    with(isEmail) {
        processInput(userInput) // Output: Input is valid.
    }
}
```
Neste exemplo, `processInput` não está acoplado a uma implementação de `Validator` específica. A estratégia é "injetada" via contexto, tornando a função mais reutilizável.

```
