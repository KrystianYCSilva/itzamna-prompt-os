---
name: java-8-orientacao-objetos
description: |
  Fundamentos de Orientacao a Objetos em Java 8: classes, heranca, interfaces e polimorismo.
  Use quando precisa modelar sistemas usando paradigma OOP em Java.
keywords:
  - java
  - oop
  - orientacao-objetos
  - classes
  - heranca
  - polimorismo
  - interfaces
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
---

# Java 8 — Orientacao a Objetos

> **Quick Reference:** Pilares de OOP em Java 8: encapsulamento, heranca, polimorismo, abstracao
> **Use when:** Modelando classes e hierarquias de tipos em projetos Java

## When to Use

- ✅ Projetando estrutura de classes para um dominio de negocio
- ✅ Implementando heranca e polimorismo para flexibilidade
- ✅ Definindo contratos via interfaces funcionais (Java 8+)
- ✅ Refatorando codigo procedural para estrutura orientada a objetos
- ❌ **NOT for:** Scripts simples ou utilitarios sem estado (use metodos estaticos)

## Core Concepts

### 1. Classes e Encapsulamento

Uma classe encapsula estado (fields) e comportamento (methods). Visibilidade controla acesso externo.

```java
public class Conta {
    private double saldo;          // encapsulado
    private final String titular;  // imutavel apos criacao

    public Conta(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public void depositar(double valor) {
        if (valor <= 0) throw new IllegalArgumentException("Valor deve ser positivo");
        this.saldo += valor;
    }

    public double getSaldo() { return saldo; }
    public String getTitular() { return titular; }
}
```

**Regra:** Fields privados sempre. Acesso via getters/setters ou metodos de negocio.

### 2. Heranca e Polimorismo

Subtipo estende comportamento do supertipo. Polimorismo permite tratar tipos distintos sob mesmo contrato.

```java
abstract class Forma {
    abstract double area();                    // contrato obrigatorio
    String descricao() { return "Forma"; }    // comportamento padrao
}

class Circulo extends Forma {
    private final double raio;
    Circulo(double raio) { this.raio = raio; }

    @Override
    double area() { return Math.PI * raio * raio; }

    @Override
    String descricao() { return "Circulo raio=" + raio; }
}

class Retangulo extends Forma {
    private final double largura, altura;
    Retangulo(double largura, double altura) {
        this.largura = largura;
        this.altura = altura;
    }

    @Override
    double area() { return largura * altura; }
}

// Polimorismo em acao
List<Forma> formas = Arrays.asList(new Circulo(5), new Retangulo(4, 6));
formas.forEach(f -> System.out.println(f.descricao() + " area=" + f.area()));
// Circulo raio=5 area=78.53
// Forma area=24.0
```

### 3. Interfaces e Contratos Funcionais (Java 8)

Interfaces definem contratos. Com Java 8, podem ter um unico metodo abstrato (SAM) e ser usadas como lambdas.

```java
@FunctionalInterface
interface Validador<T> {
    boolean validar(T valor);
}

// Uso com lambda
Validador<String> naoVazio = s -> s != null && !s.isBlank();
Validador<Integer> positivo = n -> n != null && n > 0;

// Uso em metodo generico
static <T> List<T> filtrar(List<T> lista, Validador<T> validador) {
    return lista.stream()
                .filter(validador::validar)
                .collect(Collectors.toList());
}
```

## Best Practices

1. **Favorece composicao sobre heranca:** Heranca cria acoplamento rígido. Interfaces + composicao sao mais flexíveis.
2. **Classes pequenas e focadas (SRP):** Uma classe, uma responsabilidade. Se esta descrevendo mais de uma coisa, divide.
3. **Final por padrao:** Marca campos, parametros e classes como `final` quando nao precisam mudar. Previne bugs.

## Common Pitfalls

- ❌ **Hierarquias profundas:** 3+ níveis de heranca tornam o codigo difícil de seguir → Quebra em interfaces menores
- ❌ **Getters/setters para todos os fields:** Viola encapsulamento real → Expoe apenas o que o comportamento externo precisa
- ❌ **Classe God:** Uma classe que faz tudo → Aplica SRP, quebra em colaboradores

## Related Skills

- [java-properties](../../../config/java-properties/SKILL.md) - Configuracao de aplicacoes Java
- [typescript](../../../backend/typescript/SKILL.md) - Tipos e interfaces em TypeScript (paradigma similar)

## Examples

📚 **Detailed implementations:**
→ See `examples/` directory in this skill folder
