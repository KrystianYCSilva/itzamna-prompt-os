---
name: javascript
description: |
  Fundamentos da linguagem JavaScript: tipagem dinâmica, event loop single-threaded, 
  async/await e ecossistema npm. Executa em browsers e Node.js.
  Use quando precisa entender assincronismo não-bloqueante, closures ou prototypal inheritance.
keywords:
  - javascript
  - dynamic-typing
  - event-loop
  - async-await
  - promises
  - npm
  - nodejs
language_version: "JavaScript (moderno)"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript
  - https://tc39.es/ecma262/
  - https://nodejs.org/docs/
---

# JavaScript — Linguagem Baseline

> **Quick Reference:** Linguagem dinâmica com event loop single-threaded, async/await e execução em browsers/Node.js
> **Use when:** Desenvolvendo aplicações web (frontend/backend), APIs REST, ferramentas CLI ou scripts de automação

## Introdução

**JavaScript** (1995, Brendan Eich) é uma linguagem de programação dinâmica, multi-paradigma (imperativa, funcional, orientada a objetos), originalmente criada para adicionar interatividade a páginas web. Hoje executa em browsers (V8, SpiderMonkey) e servidores (Node.js).

Características principais diferenciam JavaScript de linguagens compiladas ou fortemente tipadas:
- **Tipagem dinâmica**: Tipos verificados em runtime
- **Event loop**: Concorrência single-threaded não-bloqueante
- **First-class functions**: Funções são valores (podem ser passadas como argumentos)
- **Prototypal inheritance**: Objetos herdam de outros objetos (não de classes)

Este baseline cobre os **conceitos fundamentais** transversais às versões modernas de JavaScript (ES6+). Para features específicas de versão (ex: ES2022 top-level await, ES2023 array grouping), consulte skills especializadas.

## Sistema de Tipagem

JavaScript possui **tipagem dinâmica fraca** com conversões implícitas (coercion).

### Tipos Primitivos

```javascript
// Tipos Primitivos
let num = 42;                    // number
let str = "Hello";               // string
let bool = true;                 // boolean
let nothing = null;              // null (ausência intencional)
let notDefined;                  // undefined (não inicializado)
let sym = Symbol("id");          // symbol (ES6, identificador único)
let big = 9007199254740991n;     // bigint (ES2020, inteiros grandes)

console.log(typeof num);         // "number"
console.log(typeof nothing);     // "object" (bug histórico!)
console.log(typeof notDefined);  // "undefined"
```

### Type Coercion

JavaScript converte tipos automaticamente em contextos mistos (**weak typing**).

```javascript
// Type Coercion (conversão implícita)
console.log("5" + 1);     // "51" (number → string, concatenação)
console.log("5" - 1);     // 4 (string → number, subtração)
console.log(true + 1);    // 2 (boolean → number: true=1, false=0)
console.log("5" == 5);    // true (igualdade com coercion)
console.log("5" === 5);   // false (igualdade estrita, sem coercion)

// Evitar coercion: usar === (strict equality)
```

**Best practice**: Sempre usar `===` e `!==` (strict equality) para evitar surpresas.

### Objetos e Arrays

Objetos e arrays são **tipos de referência** (alocados no heap).

```javascript
// Objetos e Arrays
const person = { name: "Alice", age: 30 };  // objeto literal
const numbers = [1, 2, 3, 4, 5];            // array literal

// Acesso por propriedade/índice
console.log(person.name);      // "Alice"
console.log(numbers[0]);       // 1

// Arrays são objetos especiais
console.log(typeof numbers);   // "object"
console.log(Array.isArray(numbers));  // true
```

## Gerenciamento de Memória

JavaScript usa **garbage collection automático** (mark-and-sweep).

### Heap e Stack

```javascript
// Heap e Stack
let x = 10;                    // primitivo (stack)
let obj = { value: 20 };       // referência (heap)

let y = x;                     // copia valor
let obj2 = obj;                // copia referência (ambos apontam para mesmo objeto)

y = 30;
console.log(x);                // 10 (x inalterado)

obj2.value = 40;
console.log(obj.value);        // 40 (obj modificado via obj2)
```

**Primitivos**: Copiados por valor (stack).  
**Objetos**: Copiados por referência (heap).

### Closures e Memory Leaks

**Closures**: Funções que capturam variáveis do escopo externo.

```javascript
// Closures
function createCounter() {
    let count = 0;  // variável capturada pelo closure
    
    return function increment() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
// 'count' permanece na memória enquanto 'counter' existir
```

**Memory leak potencial**: Closures mantêm referências a variáveis externas, impedindo garbage collection.

```javascript
// Memory Leak - Event Listener não removido
function setupListener() {
    const bigData = new Array(1000000).fill("data");  // 1MB
    
    document.getElementById("btn").addEventListener("click", () => {
        console.log(bigData.length);  // closure captura bigData
    });
    // Se listener não for removido, bigData nunca é coletado
}

// FIX: Remover listener quando não necessário
const handler = () => console.log("clicked");
button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

## Modelo de Concorrência

JavaScript é **single-threaded** com **event loop** para assincronismo não-bloqueante.

### Event Loop

**Event loop**: Processa tarefas da call stack, microtask queue (Promises), macrotask queue (setTimeout, I/O).

```javascript
// Event Loop
console.log("1: Síncrono");

setTimeout(() => {
    console.log("2: Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("3: Microtask (Promise)");
});

console.log("4: Síncrono");

// Output:
// 1: Síncrono
// 4: Síncrono
// 3: Microtask (Promise) ← Microtasks executam antes de macrotasks
// 2: Macrotask (setTimeout)
```

**Ordem de execução**: Call stack → Microtasks (Promises) → Macrotasks (setTimeout, I/O).

### Callbacks (Padrão Clássico)

```javascript
// Callbacks (padrão clássico)
function fetchData(callback) {
    setTimeout(() => {
        callback(null, { data: "response" });
    }, 1000);
}

fetchData((error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result.data);  // "response" após 1 segundo
    }
});
```

**Problema**: Callback hell (callbacks aninhados difíceis de ler).

### Promises (ES6)

Promises encadeiam operações assíncronas de forma mais legível.

```javascript
// Promises (ES6)
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: "response" });
        }, 1000);
    });
}

fetchData()
    .then(result => {
        console.log(result.data);  // "response"
        return fetchData();        // encadeamento
    })
    .then(result => {
        console.log(result.data);  // "response" novamente
    })
    .catch(error => {
        console.error(error);
    });
```

**Estados de Promise**: `pending`, `fulfilled` (resolved), `rejected`.

### Async/Await (ES2017)

Syntactic sugar sobre Promises para código assíncrono que parece síncrono.

```javascript
// Async/Await (ES2017)
async function fetchDataSequential() {
    try {
        const result1 = await fetchData();  // aguarda Promise resolver
        console.log(result1.data);
        
        const result2 = await fetchData();
        console.log(result2.data);
        
    } catch (error) {
        console.error(error);
    }
}

fetchDataSequential();  // execução sequencial
```

**Paralelo com `Promise.all`**:

```javascript
// Paralelo - Promise.all
async function fetchDataParallel() {
    const [result1, result2] = await Promise.all([
        fetchData(),
        fetchData()
    ]);
    console.log(result1.data, result2.data);  // execução paralela
}
```

## Prototypal Inheritance

JavaScript usa **prototypes** (não classes tradicionais) para herança.

### Prototype Chain

```javascript
// Prototype Chain
const animal = {
    eat() { console.log("eating"); }
};

const dog = Object.create(animal);  // dog herda de animal
dog.bark = function() { console.log("barking"); };

dog.eat();   // "eating" (herdado de animal)
dog.bark();  // "barking" (próprio de dog)

console.log(dog.__proto__ === animal);  // true (prototype chain)
```

### ES6 Classes (Syntactic Sugar)

```javascript
// ES6 Classes (syntactic sugar sobre prototypes)
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Dog extends Animal {
    bark() {
        console.log(`${this.name} is barking`);
    }
}

const dog = new Dog("Rex");
dog.eat();   // "Rex is eating"
dog.bark();  // "Rex is barking"
```

**Por baixo dos panos**: `class` é syntactic sugar sobre constructor functions e prototypes.

## Ecossistema

### Runtimes e Módulos

JavaScript executa em **browsers** (V8, SpiderMonkey, JavaScriptCore) e **Node.js** (V8 server-side).

**Sistemas de módulos**:
- **CommonJS** (`require`/`module.exports`) - Node.js tradicional
- **ES Modules** (`import`/`export`) - Padrão moderno

```javascript
// ES Modules (moderno)
// math.js
export function add(a, b) { return a + b; }

// main.js
import { add } from './math.js';
console.log(add(2, 3));  // 5
```

**📖 Para detalhes de runtimes (browsers, Node.js), módulos (CommonJS vs ESM), npm e frameworks:**  
→ Veja [ecosystem.md](ecosystem.md)

### Quick Ecosystem Summary

**Package manager**: npm (2M+ pacotes), yarn, pnpm

**Frameworks populares**:
- **Frontend**: React, Vue, Angular
- **Backend**: Express, Fastify, Nest.js

**Build tools**: Webpack, Vite, esbuild, Rollup

## Recursos e Referências

**Documentação Oficial:**
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Referência completa
- [ECMAScript Specification](https://tc39.es/ecma262/) - Especificação oficial
- [Node.js Documentation](https://nodejs.org/docs/) - Runtime server-side

**Guias de Aprendizado:**
- [JavaScript.info](https://javascript.info/) - Tutorial moderno e completo
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) - Série de livros open-source

**Async/Await:**
- [Async Functions (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Promises (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

**Comunidade:**
- [Stack Overflow JavaScript](https://stackoverflow.com/questions/tagged/javascript)
- [Reddit r/javascript](https://www.reddit.com/r/javascript/)
- [TC39 Proposals](https://github.com/tc39/proposals) - Novas features em discussão

**Sub-files (load JIT):**
- [ecosystem.md](ecosystem.md) - Runtimes, módulos, npm, frameworks
