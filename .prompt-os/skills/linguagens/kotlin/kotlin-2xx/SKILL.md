---
name: kotlin-2xx
description: |
  Especialização da skill de Kotlin para cobrir as features introduzidas a partir do compilador K2 (versão 2.x.x).
  Use para entender conceitos como context receivers, novas diretivas de compilação e otimizações de performance específicas do K2.
keywords:
  - kotlin
  - kotlin2
  - k2
  - context-receivers
  - multiplatform
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://kotlinlang.org/docs/whatsnew-eap.html
  - https://blog.jetbrains.com/kotlin/tag/k2/
---

# Kotlin 2.x (K2)

> **Quick Reference:** Nova geração do compilador Kotlin (K2) com foco em performance, unificação de pipeline e novas features de linguagem.
> **Use when:** Desenvolvendo projetos modernos que tiram proveito das últimas otimizações e funcionalidades da linguagem Kotlin.

## Introdução

O Kotlin 2.0 representa uma reescrita completa do compilador (apelidado de **K2**), trazendo melhorias massivas de **performance**, **velocidade de compilação** e unificação das plataformas (JVM, JS, Native). Além das otimizações internas, o K2 introduz novas features de linguagem que antes não eram possíveis.

Esta skill foca nas **mudanças e adições** trazidas a partir do Kotlin 2.0. Para os fundamentos da linguagem, consulte a skill base de [kotlin](../kotlin/SKILL.md).

**Principais Pilares do K2:**
- **Performance:** Compilação até 2x mais rápida.
- **Arquitetura Unificada:** Mesma pipeline para todos os targets (JVM, JS, Native), garantindo consistência.
- **Novas Features:** Desbloqueia novas capacidades de linguagem através de uma análise de código mais poderosa.

## Core Concepts (Novidades do K2)

### 1. Context Receivers (Stable)

Permite que funções exijam múltiplos `this` receivers no escopo, simplificando injeção de dependência e DSLs. Uma função pode operar "dentro" do contexto de múltiplos objetos.

```kotlin
// Antes: passando dependências explicitamente
fun process(logger: Logger, tracer: Tracer, data: Data) {
    logger.log("Starting...")
    tracer.trace("Processing data")
    // ...
}

// Com Context Receivers: dependências implícitas no escopo
context(Logger, Tracer)
fun process(data: Data) {
    log("Starting...")    // Chama log() do Logger no contexto
    trace("Processing data") // Chama trace() do Tracer no contexto
}

fun main() {
    val myLogger = ConsoleLogger()
    val myTracer = OpenTracer()
    
    // Fornece o contexto para a chamada
    with(myLogger, myTracer) {
        process(Data(...))
    }
}
```
**Caso de uso:** Frameworks, bibliotecas de logging, e APIs que precisam de um "ambiente" contextual para operar.

### 2. Melhorias no Multiplatform

O compilador K2 unifica a análise de código e a geração de intermediários para todos os targets, resultando em maior consistência e performance.

- **Consistência:** Menos bugs específicos de plataforma.
- **Velocidade:** Build caches e análises são mais eficientes.
- **Bibliotecas:** Facilita o desenvolvimento de bibliotecas 100% compatíveis com todos os targets.

Um exemplo prático é a simplificação na declaração de dependências no `build.gradle.kts`, onde a mesma dependência pode ser aplicada a múltiplos `sourceSets` de uma vez.

```kotlin
// build.gradle.kts

kotlin {
    sourceSets {
        // A dependência é declarada uma vez no source set comum
        val commonMain by getting {
            dependencies {
                // Ex: Ktor client para chamadas de rede
                implementation("io.ktor:ktor-client-core:2.3.10") 
            }
        }

        // Os source sets específicos (jvm, js) herdam a dependência
        // e apenas precisam adicionar o engine específico.
        val jvmMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-cio:2.3.10")
            }
        }
        val jsMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-js:2.3.10")
            }
        }
    }
}
```
Este modelo, fortalecido pelo K2, garante que o código em `commonMain` seja analisado e compilado de forma consistente para todas as plataformas alvo.

### 3. Diretivas de Compilação `@JvmInline`

A anotação `@JvmInline` (value classes) agora tem um suporte mais robusto, permitindo a criação de tipos "wrapper" sem overhead de alocação de objeto em muitos casos, crucial para performance.

```kotlin
// Cria um tipo 'UserId' que é um 'String' em runtime
@JvmInline
value class UserId(val id: String)

fun processUserId(userId: UserId) {
    println("Processing user: ${userId.id}")
}

fun main() {
    val userId = UserId("user-123")
    processUserId(userId) // O compilador pode otimizar e passar a String diretamente
}
```

## Sessões JIT (Just-In-Time)

Para aprofundar em paradigmas específicos com as novas features do Kotlin 2.x, consulte as sessões especializadas:

- **Kotlin Funcional:** `load_skill("kotlin-funcional")`
  - Explora como `context receivers` e outras features aprimoram a programação funcional, composição de funções e manejo de efeitos colaterais.

- **Kotlin Orientado a Objetos:** `load_skill("kotlin-orientacao-objetos")`
  - Detalha como as novas capacidades do K2 se integram com design patterns clássicos, delegação, e arquitetura de objetos.

## Best Practices ao Adotar K2

1.  **Habilite o K2:** Em `gradle.properties`, adicione `kotlin.experimental.tryK2=true` ou a flag correspondente à sua versão do Kotlin.
2.  **Atualize Plugins:** Certifique-se de que plugins como KSP e KAPT são compatíveis com o K2.
3.  **Refatore para Context Receivers:** Identifique padrões de passagem de dependências repetitivas e refatore-os para usar `context` quando fizer sentido, tornando o código mais limpo.
4.  **Monitore a Performance:** Use o `build scan` do Gradle para verificar as melhorias no tempo de compilação.

## Related Skills

- [kotlin](../kotlin/SKILL.md) - **(Fundamento Obrigatório)** A skill base da linguagem Kotlin.
- [gradle](../gradle/SKILL.md) - Essencial para configurar o compilador K2 e gerenciar dependências.
- [java-21](../java/java-21/SKILL.md) - Relevante para entender a interoperabilidade com as últimas features da JVM, como virtual threads.
