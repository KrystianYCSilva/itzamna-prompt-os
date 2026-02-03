---
name: kotlin-1xx
description: |
  Especificidades do desenvolvimento em Kotlin versões 1.x.x (antes do K2 Compiler): extension functions, lambdas com receiver, DSLs,
  e particularidades da interoperabilidade Java-Kotlin. Use quando trabalhando com bases de código legado ou versões antigas do Kotlin.
keywords:
  - kotlin-1xx
  - extension-functions
  - lambdas-with-receiver
  - dsl-building
  - java-interoperability
  - kotlin-compiler
  - inline-functions
  - annotation-processing
language_version: "Kotlin 1.x.x (antes do K2)"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://kotlinlang.org/docs/reference/
  - https://kotlinlang.org/docs/reference/idioms.html
  - https://kotlinlang.org/docs/reference/kotlin-doc.html
---

# Kotlin 1.x.x — Especificidades Pré-K2 Compiler

> **Quick Reference:** Features e particularidades do Kotlin nas versões 1.x.x (antes da introdução do K2 Compiler)
> **Use when:** Trabalhando com bases de código legado, versões antigas do Kotlin, ou precisando entender diferenças com relação ao K2

## Introdução

O Kotlin 1.x.x representa as versões originais da linguagem antes da introdução do **K2 Compiler** (a partir do Kotlin 2.0). Essas versões estabeleceram os fundamentos da linguagem e introduziram recursos essenciais como **extension functions**, **lambdas com receiver**, e **DSL building capabilities**.

Esta skill aborda especificidades do desenvolvimento em Kotlin 1.x.x, incluindo particularidades da **interoperabilidade Java-Kotlin**, **inline functions**, e **annotation processing**, que diferem em alguns aspectos do novo compilador K2.

## Extension Functions

As **extension functions** permitem estender classes existentes com novas funcionalidades sem herança ou modificação da classe original. Esta é uma característica central do Kotlin 1.x.x.

```kotlin
// Extension function para String
fun String.lastChar(): Char = this.get(this.length - 1)

fun main() {
    println("Kotlin".lastChar()) // Output: n
}
```

### Extension Properties

Além de funções, Kotlin 1.x.x também permite **extension properties**:

```kotlin
val String.lastIndex: Int
    get() = this.length - 1

fun main() {
    println("Kotlin".lastIndex) // Output: 5
}
```

## Lambdas com Receiver

O Kotlin 1.x.x introduziu **lambdas com receiver**, permitindo definir o tipo de objeto chamador dentro do lambda:

```kotlin
fun buildString(action: StringBuilder.() -> Unit): String {
    val sb = StringBuilder()
    sb.action()
    return sb.toString()
}

fun main() {
    val result = buildString {
        append("Hello, ")
        append("Kotlin 1.x.x!")
    }
    println(result) // Output: Hello, Kotlin 1.x.x!
}
```

## DSL Building

Essas features tornam o Kotlin 1.x.x excelente para construção de **DSLs (Domain Specific Languages)**:

```kotlin
class Html {
    private val children = mutableListOf<String>()
    
    fun body(init: Body.() -> Unit) {
        val body = Body()
        body.init()
        children.add("<body>${body.content}</body>")
    }
    
    fun render() = "<html>${children.joinToString("")}</html>"
}

class Body {
    var content = ""
    
    fun p(text: String) {
        content += "<p>$text</p>"
    }
}

fun html(init: Html.() -> Unit): Html {
    val html = Html()
    html.init()
    return html
}

fun main() {
    val html = html {
        body {
            p("Conteúdo do parágrafo")
        }
    }
    println(html.render())
    // Output: <html><body><p>Conteúdo do parágrafo</p></body></html>
}
```

## Interoperabilidade Java-Kotlin

O Kotlin 1.x.x foi projetado com forte ênfase em **interoperabilidade com Java**, permitindo chamadas diretas entre as linguagens:

### Chamando Java de Kotlin

```java
// Arquivo Java: StringUtils.java
public class StringUtils {
    public static boolean isPalindrome(String str) {
        String cleanStr = str.replaceAll("[^a-zA-Z]", "").toLowerCase();
        return cleanStr.equals(new StringBuilder(cleanStr).reverse().toString());
    }
}
```

```kotlin
// Chamando de Kotlin
fun main() {
    println(StringUtils.isPalindrome("ana")) // true
    println(StringUtils.isPalindrome("hello")) // false
}
```

### Annotations Java em Kotlin

```kotlin
import org.jetbrains.annotations.NotNull
import org.jetbrains.annotations.Nullable

class UserService {
    fun getUser(@NotNull id: String): User? {
        // ...
        return null
    }
    
    fun processUser(@Nullable user: User) {
        if (user != null) {
            // Processar usuário
        }
    }
}
```

## Inline Functions

As **inline functions** no Kotlin 1.x.x ajudam a eliminar overhead de alocação de objetos para funções lambda:

```kotlin
inline fun <T> myRun(obj: T, block: T.() -> Unit): T {
    obj.block()
    return obj
}

fun main() {
    val result = myRun("Kotlin 1.x.x") {
        println("Processing: $this")
        uppercase()
    }
    println(result) // KOTLIN 1.X.X
}
```

### Crossinline e Noinline

```kotlin
inline fun performOperation(
    value: Int,
    crossinline operation: (Int) -> Int,
    noinline callback: () -> Unit
) {
    val result = operation(value)
    callback()
    println("Result: $result")
}
```

## Annotation Processing

No Kotlin 1.x.x, o **annotation processing** era feito principalmente através do KAPT (Kotlin Annotation Processing Tool):

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "1.8.20"
    id("kotlin-kapt") // Habilita KAPT
}

dependencies {
    kapt("com.example:processor:1.0.0") // Annotation processor
    implementation("com.example:annotations:1.0.0")
}
```

## Null Safety e Platform Types

Embora o Kotlin tenha **null safety** integrado, a interoperabilidade com Java traz os chamados **platform types**:

```kotlin
// Código Java
public class JavaClass {
    public String getString() { return null; } // Pode retornar null
    public String getNonNullString() { return "safe"; } // @NotNull
}
```

```kotlin
fun main() {
    val javaObj = JavaClass()
    
    // Platform type - tratamento manual necessário
    val platformStr: String? = javaObj.getString() // Pode ser null
    
    // Non-null garantido por @NotNull
    val nonNullStr: String = javaObj.getNonNullString() // Não pode ser null
}
```

## Companion Objects e Static Members

No Kotlin 1.x.x, os **companion objects** são usados para simular membros estáticos:

```kotlin
class MyClass {
    companion object Factory {
        fun create(): MyClass = MyClass()
        
        const val CONSTANT = "Constant Value"
    }
}

fun main() {
    val instance = MyClass.create() // Acessado como método estático
    println(MyClass.CONSTANT) // Acessado como constante estática
}
```

## Coroutines em Kotlin 1.x.x

As **coroutines** eram uma feature experimental inicialmente, mas se tornaram estáveis a partir do Kotlin 1.3:

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("Mundo!")
    }
    println("Olá,")
}
```

## Recursos Adicionais (JIT Loading)

Para aprofundar-se em tópicos específicos do Kotlin 1.x.x, carregue os seguintes recursos JIT:

### @kotlin-funcional
Recursos e padrões específicos de programação funcional em Kotlin 1.x.x, incluindo:
- Higher-order functions
- Funções puras e efeitos colaterais
- Imutabilidade e data classes
- Operações encadeadas com collections
- Functors e monads básicos

### @kotlin-orientacao-objetos
Recursos e padrões específicos de orientação a objetos em Kotlin 1.x.x, incluindo:
- Classes e herança
- Interfaces e abstração
- Polimorfismo
- Encapsulamento e modificadores de visibilidade
- Classes aninhadas e inner classes

## Recursos e Referências

**Documentação Oficial (Versão 1.x.x):**
- [Kotlin 1.x Documentation](https://kotlinlang.org/docs/reference/)
- [Kotlin Idioms](https://kotlinlang.org/docs/reference/idioms.html)
- [Kotlin Coding Conventions](https://kotlinlang.org/docs/reference/coding-conventions.html)

**Interoperabilidade:**
- [Calling Java from Kotlin](https://kotlinlang.org/docs/reference/java-interop.html)
- [Calling Kotlin from Java](https://kotlinlang.org/docs/reference/java-to-kotlin-interop.html)

**DSL Building:**
- [Creating Domain-Specific Languages](https://kotlinlang.org/docs/reference/type-safe-builders.html)

**Annotation Processing:**
- [KAPT Documentation](https://kotlinlang.org/docs/reference/kapt.html)
- [Using Annotation Processors](https://blog.kotlin-academy.com/annotation-processing-in-kotlin-3d1ab5ad6efb)

**Coroutines:**
- [Coroutines Guide (1.x.x)](https://kotlinlang.org/docs/reference/coroutines/coroutines-guide.html)
- [Coroutines Sequence and Channels](https://kotlinlang.org/docs/reference/coroutines/channels.html)