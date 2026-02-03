---
name: java-8
description: |
  Especificidades e recursos da linguagem Java 8: lambdas, streams, optional, novas APIs de datas e coleções.
  Use quando precisa trabalhar com código Java 8 ou entender suas funcionalidades específicas.
keywords:
  - java-8
  - lambdas
  - streams-api
  - optional
  - api-datas
  - functional-programming
language_version: "Java 8"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://docs.oracle.com/javase/8/docs/
  - https://www.oracle.com/java/technologies/javase/8-whats-new.html
  - https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html
---

# Java 8 — Features Específicas

> **Quick Reference:** Versão lançada em março de 2014 com suporte a programação funcional
> **Use when:** Trabalhando com código Java 8 ou migrando de versões anteriores para aproveitar novas funcionalidades

## When to Use

- ✅ Implementar programação funcional com lambdas e streams
- ✅ Processar coleções de forma declarativa com API Streams
- ✅ Trabalhar com datas e horas usando a nova API java.time
- ✅ Utilizar Optional para evitar NullPointerExceptions
- ❌ **NOT for:** Projetos que exigem versões mais recentes do Java com features avançadas (records, sealed classes, etc.)

## Core Concepts

### 1. Expressões Lambda

Lambda expressions permitem representar interfaces funcionais (com apenas um método abstrato) de forma concisa.

```java
// Exemplo de lambda: Runnable
Runnable runnable = () -> System.out.println("Hello from lambda!");

// Exemplo de lambda: Comparator
List<String> names = Arrays.asList("John", "Alice", "Bob");
names.sort((s1, s2) -> s1.compareTo(s2));

// Exemplo de lambda: Consumer
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.forEach(num -> System.out.println(num));
```

### 2. API Streams

A API Streams permite processamento funcional de coleções com operações como filter, map, reduce, etc.

```java
import java.util.*;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filtrar números pares e dobrar cada um
        List<Integer> evenDoubled = numbers.stream()
            .filter(n -> n % 2 == 0)  // Operação intermediária
            .map(n -> n * 2)          // Operação intermediária
            .collect(Collectors.toList());  // Operação terminal
        
        System.out.println(evenDoubled); // Output: [4, 8, 12, 16, 20]
        
        // Outro exemplo: somar todos os números pares
        int sumOfEvens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)  // Converter para int stream
            .sum();                       // Operação terminal
        
        System.out.println(sumOfEvens); // Output: 30
    }
}
```

### 3. Optional

Optional é uma classe utilitária para evitar NullPointerExceptions, encapsulando valores que podem ser nulos.

```java
import java.util.Optional;

public class OptionalExample {
    public static void main(String[] args) {
        // Criar Optional com valor presente
        Optional<String> optWithValue = Optional.of("Valor presente");
        
        // Criar Optional vazio
        Optional<String> emptyOpt = Optional.empty();
        
        // Criar Optional que pode conter null
        Optional<String> optWithNull = Optional.ofNullable(null);
        
        // Usar get() com segurança
        if (optWithValue.isPresent()) {
            System.out.println(optWithValue.get()); // Output: Valor presente
        }
        
        // Usar orElse para fornecer valor padrão
        String result = optWithNull.orElse("Valor padrão");
        System.out.println(result); // Output: Valor padrão
        
        // Usar orElseThrow para lançar exceção se vazio
        try {
            String value = optWithNull.orElseThrow(() -> new RuntimeException("Valor ausente"));
        } catch (RuntimeException e) {
            System.out.println("Erro: " + e.getMessage());
        }
        
        // Encadeamento de operações com Optional
        Optional<String> optionalString = Optional.of("Hello World");
        String processed = optionalString
            .filter(s -> s.length() > 5)
            .map(String::toUpperCase)
            .orElse("DEFAULT");
        
        System.out.println(processed); // Output: HELLO WORLD
    }
}
```

### 4. Nova API de Datas (java.time)

Java 8 introduziu uma nova API de datas imutáveis e thread-safe no pacote `java.time`.

```java
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class DateTimeExample {
    public static void main(String[] args) {
        // LocalDate - apenas data (ano, mês, dia)
        LocalDate today = LocalDate.now();
        LocalDate specificDate = LocalDate.of(2026, 2, 3);
        System.out.println("Hoje: " + today);
        System.out.println("Data específica: " + specificDate);
        
        // LocalTime - apenas hora (hora, minuto, segundo)
        LocalTime currentTime = LocalTime.now();
        LocalTime specificTime = LocalTime.of(14, 30, 45);
        System.out.println("Hora atual: " + currentTime);
        System.out.println("Hora específica: " + specificTime);
        
        // LocalDateTime - data e hora combinadas
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime specificDateTime = LocalDateTime.of(specificDate, specificTime);
        System.out.println("Data e hora atual: " + currentDateTime);
        System.out.println("Data e hora específica: " + specificDateTime);
        
        // ZonedDateTime - data e hora com fuso horário
        ZonedDateTime zonedCurrent = ZonedDateTime.now();
        ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime zonedDateTime = ZonedDateTime.of(specificDate, specificTime, zoneId);
        System.out.println("Horário com fuso: " + zonedDateTime);
        
        // Manipulação de datas
        LocalDate futureDate = today.plus(30, ChronoUnit.DAYS);
        LocalDate pastDate = today.minus(1, ChronoUnit.MONTHS);
        System.out.println("Daqui a 30 dias: " + futureDate);
        System.out.println("Um mês atrás: " + pastDate);
        
        // Formatação
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        System.out.println("Data formatada: " + formattedDateTime);
    }
}
```

## Best Practices

1. **Usar lambdas com moderação:** Prefira métodos de referência (`Class::method`) quando possível para melhor legibilidade
2. **Streams para transformações encadeadas:** Use streams para operações encadeadas em vez de loops tradicionais
3. **Evitar side effects nos streams:** Operações em streams devem ser livres de efeitos colaterais
4. **Utilizar Optional corretamente:** Não use Optional em campos de classes ou parâmetros de métodos públicos
5. **Preferir a nova API de datas:** Use `java.time` em vez das classes antigas como `Date` e `Calendar`

## Common Pitfalls

- ❌ **Uso indevido de Optional em campos de classe:** Optional não foi projetado para ser usado como campo de classe → Use apenas em retornos de métodos
- ❌ **Side effects em operações de stream:** Evite modificar variáveis externas dentro de operações de stream → Mantenha operações puras
- ❌ **Performance em streams pequenos:** Para coleções muito pequenas, laços tradicionais podem ser mais eficientes que streams

## Related Skills

- [java](../SKILL.md) - Fundamentos da linguagem Java
- [functional-programming](../../paradigmas/functional-programming/SKILL.md) - Programação funcional em Java

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder