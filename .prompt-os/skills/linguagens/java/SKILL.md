---
name: java
description: |
  Fundamentos da linguagem Java: tipagem estática forte, gerenciamento automático de memória (GC), modelo de concorrência baseado em threads e ecossistema JVM.
  Use quando precisa entender conceitos core do Java para desenvolvimento de aplicações robustas e escaláveis.
keywords:
  - java
  - jvm
  - tipagem-estatica
  - garbage-collection
  - threads
  - maven
  - gradle
language_version: "Java (moderno)"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://docs.oracle.com/javase/tutorial/
  - https://openjdk.org/
  - https://docs.oracle.com/javase/specs/
---

# Java — Linguagem Baseline

> **Quick Reference:** Linguagem de propósito geral com tipagem estática forte, GC automático e execução na JVM
> **Use when:** Desenvolvendo aplicações enterprise, Android, microservices ou sistemas que exigem portabilidade e robustez

## Introdução

Java é uma linguagem de programação de propósito geral, orientada a objetos, com tipagem estática forte e gerenciamento automático de memória. Criada pela Sun Microsystems (agora Oracle) em 1995, o lema "Write Once, Run Anywhere" (WORA) reflete sua portabilidade via JVM (Java Virtual Machine).

Este baseline cobre os **conceitos fundamentais** da linguagem Java que são transversais às versões. Para features específicas de versão (ex: records, pattern matching, virtual threads), consulte skills especializadas.

**Características principais:**
- Tipagem estática forte com verificação em tempo de compilação
- Garbage Collection automático (sem gerenciamento manual)
- Modelo de concorrência baseado em threads nativas
- Ecossistema maduro (Maven/Gradle, vasta biblioteca padrão, frameworks robustos)

## Sistema de Tipagem

Java possui **tipagem estática forte** com verificação em tempo de compilação. Todo tipo deve ser declarado explicitamente.

### Tipos Primitivos vs Referência

- **Primitivos:** `int`, `double`, `boolean`, `char` (armazenados no stack, passagem por valor)
- **Referência:** Classes, interfaces, arrays (armazenados no heap, passagem por referência)

```java
// Tipos primitivos e referência
int idade = 30;                    // primitivo (stack)
Integer idadeObj = 30;             // referência (heap, autoboxing)
String nome = "Alice";             // referência (heap)
```

### Generics (Tipo Parametrizado)

Generics fornecem type safety em coleções e métodos genéricos. **Type erasure**: informações de tipo genérico removidas em runtime.

```java
// Generics - Type Safety
import java.util.*;

public class GenericsExample {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>();
        nomes.add("Alice");
        // nomes.add(42); // ERRO DE COMPILAÇÃO: tipo incompatível
        
        String primeiro = nomes.get(0); // sem cast necessário
        System.out.println(primeiro); // Output: Alice
    }
}
```

## Gerenciamento de Memória

Java gerencia memória automaticamente via **Garbage Collection (GC)**. Desenvolvedores não fazem `malloc`/`free` manual.

### Heap e Stack

- **Heap:** Armazena objetos (instâncias de classes). Garbage Collector atua aqui.
- **Stack:** Armazena frames de métodos, variáveis locais primitivas e referências a objetos no heap.

```java
// Heap vs Stack
import java.util.*;

public class MemoryExample {
    public static void main(String[] args) {
        int x = 10;                  // stack (primitivo)
        String texto = "Hello";      // referência no stack, objeto no heap
        
        criarObjetos();              // objetos criados no heap
        // Após criarObjetos() retornar, objetos elegíveis para GC
    }
    
    static void criarObjetos() {
        List<String> temp = new ArrayList<>(); // heap
        temp.add("temporário");
    } // temp sai de escopo, objeto List elegível para GC
}
```

### Memory Leaks (Vazamentos de Memória)

Embora GC automático, leaks podem ocorrer via **referências estáticas** ou **recursos não fechados**.

```java
// Memory Leak - Referência estática
import java.util.*;

public class MemoryLeakExample {
    private static final List<byte[]> cache = new ArrayList<>();
    
    public static void addToCache(byte[] data) {
        cache.add(data); // objetos NUNCA removidos = leak!
    }
    
    // FIX: limpar cache periodicamente ou usar WeakReference
    public static void clearCache() {
        cache.clear();
    }
}
```

**Best practice:** Use try-with-resources para AutoCloseable (JDBC, streams).

## Modelo de Concorrência

Java usa **threads** como primitiva de concorrência. Modelo baseado em memória compartilhada + locks.

### Threads e synchronized

`Thread` é a unidade de execução. `synchronized` previne condições de corrida (race conditions).

```java
// Thread Safety com synchronized
public class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++; // operação atômica protegida
    }
    
    public synchronized int getCount() {
        return count;
    }
}

// Uso:
Counter counter = new Counter();
Thread t1 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) counter.increment();
});
Thread t2 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) counter.increment();
});
t1.start(); t2.start();
t1.join(); t2.join();
System.out.println(counter.getCount()); // Output: 2000 (seguro)
```

### java.util.concurrent

O pacote `java.util.concurrent` oferece abstrações de alto nível: `ExecutorService`, `Future`, `CountDownLatch`, `ConcurrentHashMap`.

```java
// ExecutorService - Thread Pool
import java.util.concurrent.*;

public class ExecutorExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(4);
        
        Future<Integer> resultado = executor.submit(() -> {
            Thread.sleep(1000);
            return 42;
        });
        
        System.out.println("Resultado: " + resultado.get()); // bloqueia até completar
        executor.shutdown();
    }
}
```

## Ecossistema

### JVM (Java Virtual Machine)

A JVM executa bytecode Java, garantindo portabilidade ("compile once, run anywhere"). Principais implementações:
- **Oracle JDK:** Implementação oficial (licença comercial para produção)
- **OpenJDK:** Implementação open-source (base do Oracle JDK, gratuita)

### Build Tools

**Maven** e **Gradle** são as ferramentas de build dominantes.

**Maven (pom.xml):**
```xml
<!-- Maven - Estrutura básica -->
<project>
    <groupId>com.example</groupId>
    <artifactId>meu-app</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.9.3</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

**Gradle (build.gradle):**
```groovy
// Gradle - Estrutura básica
plugins {
    id 'java'
}

group = 'com.example'
version = '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter:5.9.3'
}
```

### Standard Library

A biblioteca padrão Java é vasta:
- **java.base:** Core (collections, I/O, concurrency, reflection)
- **java.sql:** JDBC para bancos de dados
- **java.net:** Networking (sockets, URLs, HTTP)

### Frameworks Populares

- **Spring Framework:** IoC, REST APIs, microservices
- **Hibernate:** ORM para persistência
- **JUnit/TestNG:** Testing frameworks

## Recursos e Referências

**Documentação Oficial:**
- [Java Tutorials (Oracle)](https://docs.oracle.com/javase/tutorial/)
- [Java SE API Docs](https://docs.oracle.com/javase/8/docs/api/) (versões múltiplas disponíveis)

**OpenJDK:**
- [OpenJDK Project](https://openjdk.org/)
- [JEP (JDK Enhancement Proposals)](https://openjdk.org/jeps/0)

**Especificações:**
- [Java Language Specification (JLS)](https://docs.oracle.com/javase/specs/)
- [Java Virtual Machine Specification (JVMS)](https://docs.oracle.com/javase/specs/jvms/)

**Build Tools:**
- [Maven Documentation](https://maven.apache.org/guides/)
- [Gradle User Manual](https://docs.gradle.org/current/userguide/userguide.html)
