---
name: kotlin-funcional
description: |
  Aborda o paradigma de programação funcional em Kotlin, com ênfase nas features do K2.
  Use para aprender sobre imutabilidade, funções de ordem superior, e como o `context receivers` potencializa a composição de funções.
keywords:
  - kotlin
  - funcional
  - fp
  - immutability
  - pure-functions
  - context-receivers
category: academic
subcategory: programming-paradigms
version: "1.0.0"
created: 2026-02-03
type: skill-session
---

# Sessão JIT: Kotlin Funcional com K2

> **Quick Reference:** Técnicas de programação funcional em Kotlin, potencializadas pelo compilador K2.
> **Use when:** Precisar escrever código mais declarativo, previsível e livre de efeitos colaterais (side-effects).

## Imutabilidade

O pilar da programação funcional. Em Kotlin, prefira `val` em vez de `var` e use coleções imutáveis (`listOf`, `mapOf`, `setOf`).

```kotlin
val numbers = listOf(1, 2, 3)
val doubled = numbers.map { it * 2 } // Retorna uma NOVA lista

// numbers permanece [1, 2, 3]
// doubled é [2, 4, 6]
```

`data class` com `val` são excelentes para modelar estado imutável.

```kotlin
data class User(val name: String, val age: Int)

val user = User("Alice", 30)
val olderUser = user.copy(age = 31) // Cria uma nova instância
```

## Funções Puras e de Ordem Superior

- **Funções Puras:** Para a mesma entrada, sempre produzem a mesma saída e não têm efeitos colaterais observáveis.
- **Funções de Ordem Superior (Haskell):** Funções que recebem outras funções como parâmetro ou retornam funções.

```kotlin
// Função Pura
fun add(a: Int, b: Int): Int = a + b

// Função de Ordem Superior
fun operate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

val sum = operate(5, 3, ::add) // Passa a função 'add' como referência
val product = operate(5, 3) { x, y -> x * y } // Usa uma lambda
```

## Composição com Context Receivers

`context receivers` permitem uma forma elegante de compor funções que operam sobre um contexto compartilhado, uma alternativa poderosa ao `Reader Monad` de bibliotecas como Arrow.

Imagine um sistema que precisa de um `Config` e um `Logger`.

```kotlin
interface Config {
    fun get(key: String): String
}
interface Logger {
    fun log(message: String)
}

context(Config, Logger)
fun businessLogic() {
    val endpoint = get("api.endpoint")
    log("Connecting to $endpoint")
    // ...
}

fun main() {
    val testConfig = object : Config { /* ... */ }
    val consoleLogger = object : Logger { /* ... */ }

    // O contexto é injetado, e a businessLogic não precisa conhecê-los
    with(testConfig, consoleLogger) {
        businessLogic()
    }
}
```
Isso torna o código de negócio mais limpo e focado, enquanto as dependências são gerenciadas de forma implícita e segura.
