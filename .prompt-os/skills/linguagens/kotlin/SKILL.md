---
name: kotlin
description: |
  Fundamentos da linguagem Kotlin: tipagem estática com null safety, gerenciamento automático de memória (JVM/Native), coroutines para concorrência e ecossistema multiplatforma.
  Use quando precisa entender conceitos core do Kotlin para desenvolvimento Android, backend ou aplicações multiplatforma.
keywords:
  - kotlin
  - null-safety
  - coroutines
  - jvm
  - multiplatforma
  - android
  - gradle
language_version: "Kotlin (moderno)"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://kotlinlang.org/docs/
  - https://kotlinlang.org/spec/
  - https://github.com/Kotlin/kotlinx.coroutines
---

# Kotlin — Linguagem Baseline

> **Quick Reference:** Linguagem moderna com null safety nativo, coroutines para concorrência e suporte multiplatforma (JVM/JS/Native)
> **Use when:** Desenvolvendo para Android, backend JVM, ou aplicações multiplataforma que exigem segurança de tipos e código conciso

## Introdução

Kotlin é uma linguagem de programação de propósito geral, estaticamente tipada, criada pela JetBrains em 2011 e adotada como linguagem oficial para Android em 2017. Combina paradigmas orientados a objetos e funcionais, priorizando **null safety**, **concisão** e **interoperabilidade** com Java.

Este baseline cobre os **conceitos fundamentais** da linguagem Kotlin que são transversais às versões. Para features específicas de versão (ex: context receivers, Kotlin 2.0), consulte skills especializadas.

**Características principais:**
- Null safety integrado ao sistema de tipos (`?`, `!!`, `?.`)
- Coroutines para concorrência leve e estruturada
- Tipo inference agressivo (menos verbosidade que Java)
- Multiplatforma: JVM, JavaScript, Native (iOS, desktop)

## Sistema de Tipagem

Kotlin possui **tipagem estática forte** com null safety como parte fundamental do sistema de tipos.

### Null Safety

Diferente de Java, Kotlin distingue tipos **nullable** (`String?`) de **non-nullable** (`String`) em tempo de compilação.

```kotlin
// Null Safety
fun main() {
    val nonNull: String = "Kotlin"
    // val error: String = null // ERRO DE COMPILAÇÃO
    
    val nullable: String? = null  // OK
    // println(nullable.length)   // ERRO: possível null
    println(nullable?.length)     // Safe call: null
}
```

**Operadores de null safety:**
- `?.` (safe call): retorna `null` se o receptor for `null`
- `?:` (Elvis operator): fornece valor padrão se for `null`
- `!!` (not-null assertion): força cast para non-null, lança `NullPointerException` se for `null`

```kotlin
// Elvis Operator e Not-Null Assertion
fun main() {
    val nullable: String? = null
    
    // Elvis operator: valor padrão
    val length = nullable?.length ?: 0
    println(length) // Output: 0
    
    // Not-null assertion (use com cautela!)
    // val forced = nullable!!.length // NPE em runtime!
}
```

### Type Inference

Kotlin infere tipos automaticamente, reduzindo verbosidade sem perder type safety.

```kotlin
// Type Inference
fun main() {
    val number = 42              // Int inferido
    val text = "Hello"           // String inferido
    val list = listOf(1, 2, 3)   // List<Int> inferido
    
    // Tipos explícitos quando necessário
    val explicit: Double = 3.14
}
```

### Data Classes

Classes otimizadas para armazenamento de dados com `equals()`, `hashCode()`, `toString()` e `copy()` gerados automaticamente.

```kotlin
// Data Classes
data class User(val name: String, val age: Int)

fun main() {
    val user1 = User("Alice", 30)
    val user2 = user1.copy(age = 31)  // cópia imutável
    
    println(user1) // Output: User(name=Alice, age=30)
    println(user2) // Output: User(name=Alice, age=31)
}
```

## Gerenciamento de Memória

Kotlin herda o modelo de memória da plataforma alvo: **JVM** (garbage collection), **JavaScript** (GC do engine), ou **Native** (ARC - Automatic Reference Counting).

### JVM Target (Padrão)

Quando compilado para JVM, Kotlin usa o mesmo modelo de Java: heap/stack e garbage collection automático.

```kotlin
// Heap e Stack (JVM)
fun main() {
    val x = 10                  // primitivo (stack na JVM)
    val text = "Kotlin"         // referência (heap)
    
    createObjects()             // objetos no heap
    // Após retornar, objetos elegíveis para GC
}

fun createObjects() {
    val temp = mutableListOf("temporary")
} // temp sai de escopo, List elegível para GC
```

### Kotlin/Native Memory Model

No target Native (iOS, desktop), Kotlin usa **gerenciamento automático de memória** sem GC tradicional, baseado em contagem de referências e detecção de ciclos.

**Note**: Para baseline, foco está no comportamento comum (memória automática). Detalhes de Kotlin/Native são tópicos avançados.

### Memory Leaks

Mesmo com GC automático, leaks podem ocorrer via **referências fortes desnecessárias** ou **listeners não removidos**.

```kotlin
// Memory Leak - Listener não removido
class EventEmitter {
    private val listeners = mutableListOf<() -> Unit>()
    
    fun addListener(listener: () -> Unit) {
        listeners.add(listener) // NUNCA removido = leak potencial!
    }
    
    // FIX: Prover método para remover
    fun removeListener(listener: () -> Unit) {
        listeners.remove(listener)
    }
}
```

## Modelo de Concorrência

Kotlin usa **coroutines** como modelo principal de concorrência: threads leves gerenciadas pela biblioteca `kotlinx.coroutines`, não pelo sistema operacional.

### Coroutines Basics

Funções `suspend` podem pausar execução sem bloquear thread. Lançadas via builders (`launch`, `async`) dentro de um `CoroutineScope`.

```kotlin
// Coroutines Basics
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)  // suspende sem bloquear thread
        println("World!")
    }
    println("Hello,")
} 
// Output: Hello, (imediato)
//         World! (após 1 segundo)
```

### Structured Concurrency

`CoroutineScope` gerencia ciclo de vida das coroutines filhas. Se o scope é cancelado, todas as coroutines dentro dele são canceladas automaticamente.

```kotlin
// Structured Concurrency
import kotlinx.coroutines.*

suspend fun fetchData(): String {
    delay(500)
    return "Data"
}

fun main() = runBlocking {
    val job = launch {
        val data = fetchData()
        println("Fetched: $data")
    }
    
    delay(200)
    job.cancel()  // Cancela coroutine antes de terminar
    println("Cancelled")
}
// Output: Cancelled (coroutine não imprime "Fetched")
```

### Flow

`Flow` é a API reativa do Kotlin para streams assíncronos de dados (análogo a `Observable` no RxJava ou `Publisher` no Reactive Streams).

```kotlin
// Flow - Async Streams
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun numbers(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)  // emite valores assincronamente
    }
}

fun main() = runBlocking {
    numbers().collect { value ->
        println(value)
    }
}
// Output: 1 (após 100ms), 2 (após 200ms), 3 (após 300ms)
```

## Ecossistema

### Gradle e Kotlin DSL

**Gradle** é a ferramenta de build padrão, com suporte para Kotlin DSL (syntax Kotlin em vez de Groovy).

```kotlin
// build.gradle.kts (Kotlin DSL)
plugins {
    kotlin("jvm") version "1.9.20"
}

group = "com.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    testImplementation(kotlin("test"))
}
```

### Multiplatforma

Kotlin suporta compilação para múltiplos targets a partir do mesmo código-fonte:
- **JVM**: Backend, Android
- **JavaScript**: Frontend web, Node.js
- **Native**: iOS, macOS, Linux, Windows

```kotlin
// Multiplatform - Declaração comum
// commonMain/kotlin/Platform.kt
expect fun platformName(): String

// jvmMain/kotlin/Platform.kt
actual fun platformName(): String = "JVM"

// iosMain/kotlin/Platform.kt
actual fun platformName(): String = "iOS"
```

### Android

Kotlin é a **linguagem preferencial** para desenvolvimento Android desde 2019 (Google I/O). Android Studio possui suporte first-class para Kotlin.

**Frameworks Android populares:**
- **Jetpack Compose**: UI declarativo em Kotlin
- **Ktor**: Cliente/servidor HTTP assíncrono
- **Room**: ORM para SQLite

### Standard Library

Biblioteca padrão rica com extensions para coleções, strings, I/O:
- **Collections**: `map`, `filter`, `fold`, `groupBy`
- **Strings**: `split`, `trim`, `replace` com regex
- **Scope functions**: `let`, `apply`, `run`, `also`, `with`

## Recursos e Referências

**Documentação Oficial:**
- [Kotlin Docs](https://kotlinlang.org/docs/)
- [Kotlin Language Specification](https://kotlinlang.org/spec/)
- [Kotlin API Docs](https://kotlinlang.org/api/latest/jvm/stdlib/)

**Coroutines:**
- [kotlinx.coroutines Guide](https://kotlinlang.org/docs/coroutines-guide.html)
- [kotlinx.coroutines API](https://kotlinlang.org/api/kotlinx.coroutines/)

**Multiplatforma:**
- [Kotlin Multiplatform Docs](https://kotlinlang.org/docs/multiplatform.html)
- [Kotlin/Native Documentation](https://kotlinlang.org/docs/native-overview.html)

**Ferramentas:**
- [Gradle Kotlin DSL Primer](https://docs.gradle.org/current/userguide/kotlin_dsl.html)
- [Android Kotlin Style Guide](https://developer.android.com/kotlin/style-guide)

**Comunidade:**
- [Kotlin Slack](https://surveys.jetbrains.com/s3/kotlin-slack-sign-up)
- [Kotlin Forum](https://discuss.kotlinlang.org/)

**Versões Específicas:**
- [Kotlin 2.x (K2)](./kotlin-2xx/SKILL.md) - Para features específicas do compilador K2, como `context receivers`.

**Versões Antigas (Kotlin 1.x.x):**
- [@kotlin-1xx](kotlin-1xx/SKILL.md) - Especificidades do desenvolvimento em Kotlin 1.x.x (antes do K2 Compiler)
- [@kotlin-funcional](kotlin-1xx/kotlin-funcional/) - Programação funcional em Kotlin 1.x.x
- [@kotlin-orientacao-objetos](kotlin-1xx/kotlin-orientacao-objetos/) - Orientação a objetos em Kotlin 1.x.x
