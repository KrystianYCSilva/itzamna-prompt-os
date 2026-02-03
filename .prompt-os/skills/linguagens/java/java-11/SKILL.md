---
name: java-11
description: |
  Features e melhorias do Java 11 (LTS): Type Inference (var), nova API HTTP Client, métodos de String e execução direta de código fonte.
  Essencial para modernização de aplicações Java e adoção de práticas recentes.
keywords:
  - java-11
  - var
  - http-client
  - string-methods
  - local-variable-type-inference
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://openjdk.org/projects/jdk/11/
  - https://docs.oracle.com/en/java/javase/11/docs/api/index.html
---

# Java 11 Features (LTS)

> **Quick Reference:** Type Inference (var), HTTP Client nativo, novos métodos de String e execução direta.
> **Use when:** Atualizando projetos para a versão LTS moderna ou escrevendo scripts Java concisos.

## When to Use

- ✅ Simplificação de declaração de tipos locais com `var`
- ✅ Comunicação HTTP assíncrona/síncrona robusta sem bibliotecas externas (Apache/OkHttp)
- ✅ Manipulação de texto mais rica (strip, lines, isBlank)
- ✅ Execução rápida de arquivos únicos (`java Script.java`) para prototipagem
- ❌ **NOT for:** Uso de APIs removidas do JDK (ex: JAXB, CORBA, JavaFX - agora módulos separados)

## Core Concepts

### 1. Local Variable Type Inference (`var`)

Introduzido no Java 10 e aprimorado no 11 (suporte em lambdas). O compilador infere o tipo.

```java
// Inferência de tipo
var list = new ArrayList<String>(); // infere ArrayList<String>
var stream = list.stream();         // infere Stream<String>

// Uso em lambdas (Java 11) para anotações
list.forEach((@NotNull var item) -> System.out.println(item));

// LIMITAÇÕES:
// var x; // ERRO: precisa inicializar
// var f = () -> {}; // ERRO: não funciona com lambdas sem contexto explícito
```

### 2. New String Methods

Métodos utilitários essenciais adicionados à classe `String`.

```java
String text = "  Hello Java 11  \n";

System.out.println(text.isBlank());    // false (verifica whitespace)
System.out.println(text.strip());      // "Hello Java 11" (Unicode aware, melhor que trim)
System.out.println(text.stripLeading());
System.out.println(text.stripTrailing());
System.out.println("Java".repeat(3));  // "JavaJavaJava"

// Stream de linhas
"Line 1\nLine 2\nLine 3".lines()
    .forEach(System.out::println);
```

### 3. HttpClient API (Standard)

Substitui a antiga `HttpURLConnection`. Suporta HTTP/1.1 e HTTP/2, WebSocket, síncrono e assíncrono.

```java
import java.net.http.*;
import java.net.URI;

var client = HttpClient.newHttpClient();
var request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .GET()
    .build();

// Síncrono
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());

// Assíncrono
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);
```

### 4. Files API Enhancements

Métodos convenientes para ler/escrever strings em arquivos.

```java
import java.nio.file.Files;
import java.nio.file.Path;

// Ler tudo como String
String content = Files.readString(Path.of("config.json"));

// Escrever String
Files.writeString(Path.of("output.txt"), "Java 11 is cool");
```

### 5. Running Source Files Directly

Executar arquivo `.java` sem compilar (`javac`) explicitamente.

```bash
# Terminal
java Main.java
```

## Best Practices

1. **Use `var` com moderação:** Apenas quando o tipo é óbvio pelo lado direito da atribuição. Se prejudicar a leitura, use o tipo explícito.
2. **Adote `HttpClient`:** Migre de bibliotecas legadas ou de terceiros para a API nativa para reduzir dependências.
3. **Prefira `strip()`:** Use `strip()` em vez de `trim()` pois suporta padrões Unicode modernos de espaço em branco.

## Common Pitfalls

- ❌ **`var` não é `dynamic`:** Java continua estaticamente tipado. O tipo é fixado na compilação.
- ❌ **Remoção de Módulos Java EE:** JAXB, JAX-WS, etc., foram removidos. Adicione dependências Maven/Gradle explícitas se precisar.
- ❌ **Imutabilidade de `List.of`:** Coleções criadas com métodos de fábrica (Java 9+) são imutáveis.

## Related Skills

- [java](../SKILL.md) - Fundamentos da linguagem
- [java-8](../java-8/SKILL.md) - Versão LTS anterior (referência histórica)

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder