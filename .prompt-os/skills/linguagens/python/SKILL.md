---
name: python
description: |
  Fundamentos da linguagem Python: tipagem dinâmica com duck typing, GIL e concorrência, 
  gerenciamento automático de memória e ecossistema pip/PyPI. Linguagem de propósito geral 
  amplamente usada em web, ciência de dados e automação.
keywords:
  - python
  - dynamic-typing
  - duck-typing
  - gil
  - asyncio
  - pip
  - list-comprehension
language_version: "Python (moderno)"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://docs.python.org/3/
  - https://peps.python.org/
  - https://wiki.python.org/moin/GlobalInterpreterLock
---

# Python — Linguagem Baseline

> **Quick Reference:** Linguagem dinâmica com duck typing, GIL, gerenciamento automático de memória e rico ecossistema
> **Use when:** Desenvolvendo aplicações web, scripts de automação, análise de dados, machine learning ou prototipagem rápida

## Introdução

**Python** (1991, Guido van Rossum) é uma linguagem de programação de alto nível, multi-paradigma (imperativa, funcional, orientada a objetos), com foco em legibilidade e produtividade. Filosofia expressa no "Zen of Python": "Simple is better than complex", "Readability counts".

Características principais diferenciam Python de linguagens estaticamente tipadas ou de baixo nível:
- **Tipagem dinâmica forte**: Tipos verificados em runtime, sem conversões implícitas arbitrárias
- **Duck typing**: "Se anda como pato e grasna como pato, é um pato" (foco em comportamento, não tipo)
- **GIL (Global Interpreter Lock)**: Limita paralelismo em CPython (threads não executam bytecode Python em paralelo)
- **Gerenciamento automático de memória**: Reference counting + cyclic garbage collector

Este baseline cobre os **conceitos fundamentais** transversais às versões modernas de Python (3.6+). Para features específicas de versão (ex: Python 3.10 pattern matching, 3.11 exception groups), consulte skills especializadas.

**📖 Para detalhes do ecossistema (pip, PyPI, virtual environments, frameworks populares):**  
→ Veja [ecosystem.md](ecosystem.md)

## Sistema de Tipagem

Python possui **tipagem dinâmica forte** com duck typing.

### Duck Typing

Diferente de linguagens com interfaces explícitas, Python verifica comportamento em runtime:

```python
# Duck typing: se implementa __len__, é "sized"
def print_length(obj):
    print(len(obj))  # Funciona com qualquer objeto que implementa __len__

print_length([1, 2, 3])      # Lista
print_length("hello")        # String
print_length({1, 2})         # Set
# Não precisa de interface explícita
```

### Type Hints (PEP 484)

Type hints são **anotações opcionais** para ferramentas de análise estática (mypy, Pyright):

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

# Runtime NÃO valida tipos automaticamente
greet(123)  # Executa sem erro (tipo ignorado em runtime)

# Mypy detecta em tempo de análise:
# error: Argument 1 to "greet" has incompatible type "int"; expected "str"
```

**⚠️ Type hints não afetam execução:**
- São metadados armazenados em `__annotations__`
- Validação requer ferramentas externas (mypy) ou bibliotecas runtime (Pydantic)

### Tipos Primitivos

```python
# Numéricos
x = 10              # int (precisão arbitrária)
y = 3.14            # float
z = 2 + 3j          # complex

# Sequências
lst = [1, 2, 3]                     # list (mutável)
tpl = (1, 2, 3)                     # tuple (imutável)
rng = range(10)                     # range (lazy)

# Texto
s = "hello"                         # str (imutável, Unicode)

# Booleano
flag = True                         # bool (subclasse de int)

# None
val = None                          # NoneType (singleton)
```

**Pegadinha - Mutabilidade em defaults:**

```python
def add_item(item, lst=[]):  # ❌ Default mutável compartilhado
    lst.append(item)
    return lst

add_item(1)  # [1]
add_item(2)  # [1, 2] — mesma lista!

# ✅ Correto
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
```

## Gerenciamento de Memória

Python usa **reference counting** como mecanismo primário + **cyclic garbage collector** para ciclos.

### Reference Counting

Cada objeto mantém um contador de referências. Quando chega a 0, memória é liberada imediatamente:

```python
import sys

x = [1, 2, 3]
print(sys.getrefcount(x))  # 2 (x + argumento temporário)

y = x  # Incrementa contador
print(sys.getrefcount(x))  # 3

del y  # Decrementa contador
```

### Cyclic Garbage Collector

Reference counting não detecta **ciclos**:

```python
class Node:
    def __init__(self):
        self.ref = None

a = Node()
b = Node()
a.ref = b
b.ref = a  # Ciclo: a → b → a

del a, b  # Reference counting não libera (contador > 0)
# Cyclic GC detecta e libera após threshold
```

### Otimização de Memória

**`__slots__`** desabilita `__dict__` dinâmico, reduzindo uso de memória:

```python
class Point:
    __slots__ = ['x', 'y']  # Sem dict dinâmico
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
# p.z = 3  # ❌ AttributeError: 'Point' object has no attribute 'z'
```

**Trade-off:** Reduz memória (~40-50%), mas perde flexibilidade (não pode adicionar atributos dinamicamente).

## Concorrência e GIL

### Global Interpreter Lock (GIL)

O **GIL** (Global Interpreter Lock) é um mutex que protege o acesso ao interpretador CPython. **Implicação crítica:** apenas uma thread executa bytecode Python por vez.

```python
import threading

counter = 0

def increment():
    global counter
    for _ in range(1_000_000):
        counter += 1

# Duas threads NÃO aceleram CPU-bound tasks
t1 = threading.Thread(target=increment)
t2 = threading.Thread(target=increment)
t1.start(); t2.start()
t1.join(); t2.join()
# Tempo ≈ tempo de 1 thread (GIL serializa execução)
```

### Threading vs Multiprocessing

**Threading** — Bom para I/O-bound (GIL liberado durante operações I/O):

```python
import threading
import time

def download(url):
    time.sleep(1)  # Simula I/O (GIL liberado)
    print(f"Downloaded {url}")

threads = [threading.Thread(target=download, args=(f"url{i}",)) for i in range(5)]
for t in threads: t.start()
for t in threads: t.join()
# Termina em ~1s (concorrente)
```

**Multiprocessing** — Necessário para CPU-bound (processos separados, sem GIL):

```python
from multiprocessing import Process

def compute(n):
    return sum(i*i for i in range(n))

processes = [Process(target=compute, args=(10_000_000,)) for _ in range(4)]
for p in processes: p.start()
for p in processes: p.join()
# Usa múltiplos cores (paralelo verdadeiro)
```

### Asyncio

**Asyncio** é um framework single-threaded para I/O assíncrono (similar ao event loop do JavaScript):

```python
import asyncio

async def fetch(url):
    await asyncio.sleep(1)  # I/O não-bloqueante
    return f"Data from {url}"

async def main():
    tasks = [fetch(f"url{i}") for i in range(5)]
    results = await asyncio.gather(*tasks)
    print(results)

asyncio.run(main())
# Termina em ~1s (concorrente, sem threads)
```

**Quando usar cada abordagem:**
- **Threading:** I/O-bound com bibliotecas síncronas (requests, sqlite3)
- **Asyncio:** I/O-bound com bibliotecas assíncronas (aiohttp, asyncpg) — evita overhead de threads
- **Multiprocessing:** CPU-bound (cálculos pesados, processamento de dados)

## Recursos Avançados da Linguagem

### List Comprehensions

Sintaxe concisa para criar listas:

```python
# Tradicional
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x**2)

# Comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]

# Também: dict, set comprehensions
{x: x**2 for x in range(5)}
{x**2 for x in range(10)}
```

### Generators

Iteradores lazy que produzem valores sob demanda (memória eficiente):

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Consome memória O(1), não O(n)
gen = fibonacci()
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 1

# Generator expression
squares = (x**2 for x in range(1_000_000))  # Lazy
sum(squares)  # Processa um por vez
```

### Decorators

Funções que modificam outras funções (metaprogramação):

```python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.2f}s")
        return result
    return wrapper

@timer  # Equivalente a: compute = timer(compute)
def compute(n):
    return sum(range(n))

compute(1_000_000)  # Imprime tempo de execução
```

**Decorators comuns:**
- `@property`: Transforma método em propriedade
- `@staticmethod`, `@classmethod`: Métodos de classe
- `@lru_cache`: Memoização automática (functools)

### Context Managers

Garantem limpeza de recursos (pattern RAII-like):

```python
# Automático: fecha arquivo mesmo com exceção
with open('file.txt') as f:
    data = f.read()
# f.close() chamado automaticamente

# Implementação customizada
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self
    
    def __exit__(self, *args):
        print(f"Elapsed: {time.time() - self.start:.2f}s")

with Timer():
    time.sleep(1)
```

## Orientação a Objetos

Python suporta OOP com herança, polimorfismo e encapsulamento (convenções, não enforcement):

```python
class Animal:
    def __init__(self, name):
        self.name = name           # Público
        self._protected = "data"   # Convenção: protected
        self.__private = "secret"  # Name mangling: _Animal__private
    
    def speak(self):
        raise NotImplementedError("Subclass must implement")

class Dog(Animal):
    def speak(self):  # Polimorfismo
        return f"{self.name} says Woof!"

dog = Dog("Rex")
print(dog.speak())         # Rex says Woof!
print(dog._protected)      # Acessível (convenção apenas)
# print(dog.__private)     # ❌ AttributeError
print(dog._Animal__private)  # ✅ Funciona (name mangling)
```

**Magic methods** (dunder methods) permitem operador overloading:

```python
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    
    def __add__(self, other):  # +
        return Vector(self.x + other.x, self.y + other.y)
    
    def __repr__(self):  # print()
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)  # Vector(4, 6)
```

## Exception Handling

Python usa exceções para controle de fluxo (não error codes):

```python
try:
    value = int(input("Enter number: "))
    result = 10 / value
except ValueError:
    print("Not a number")
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:  # Catch-all (evite)
    print(f"Unexpected error: {e}")
else:
    print(f"Result: {result}")  # Executa se nenhum except
finally:
    print("Cleanup")  # Sempre executa
```

**Criar exceções customizadas:**

```python
class ValidationError(Exception):
    pass

def validate_age(age):
    if age < 0:
        raise ValidationError("Age cannot be negative")
    return age
```

## Comparação com Outras Linguagens

| Aspecto | Python | Java | JavaScript |
|---------|--------|------|------------|
| Tipagem | Dinâmica forte (duck typing) | Estática forte | Dinâmica fraca |
| GC | Reference counting + cyclic GC | Tracing GC (generational) | Tracing GC (V8) |
| Concorrência | GIL (threads limitadas) | Threads reais | Event loop (single-thread) |
| Paradigma | Multi-paradigma | OOP primário | Multi-paradigma |
| Performance | Interpretado (mais lento) | JIT (rápido) | JIT (rápido) |

## Pitfalls Comuns

### 1. Late Binding em Closures

```python
# ❌ Todas as funções referenciam mesmo 'i'
funcs = [lambda: i for i in range(3)]
[f() for f in funcs]  # [2, 2, 2]

# ✅ Captura valor no momento da criação
funcs = [lambda i=i: i for i in range(3)]
[f() for f in funcs]  # [0, 1, 2]
```

### 2. Mutabilidade Inadvertida

```python
# ❌ Modifica lista original
def process(data=[]):
    data.append(1)
    return data

process()  # [1]
process()  # [1, 1]

# ✅ Cria nova lista
def process(data=None):
    if data is None:
        data = []
    data.append(1)
    return data
```

### 3. Comparação de Identidade vs Igualdade

```python
a = [1, 2, 3]
b = [1, 2, 3]

a == b   # True (valores iguais)
a is b   # False (objetos diferentes)

# Singleton: None, True, False
x = None
x is None  # ✅ Correto
x == None  # Funciona mas menos idiomático
```

## Quando Usar Python

**✅ Ideal para:**
- Prototipagem rápida (sintaxe simples, tipagem dinâmica)
- Scripts de automação e DevOps
- Data science (NumPy, pandas, scikit-learn)
- Web backends (Django, Flask, FastAPI)
- Machine learning (TensorFlow, PyTorch)

**❌ Menos adequado para:**
- Aplicações real-time com latência crítica (GC pausas)
- CPU-bound paralelos complexos (GIL limita threading)
- Mobile nativo (suporte limitado)
- Sistemas de baixo nível (kernel, drivers)

## Próximos Passos

1. **📖 Carregue:** [ecosystem.md](ecosystem.md) para pip, PyPI, virtual environments e frameworks populares
2. **Aprofunde:** Crie skill específica para asyncio (tasks, event loops, aiohttp)
3. **Aprofunde:** Crie skill para data science (NumPy, pandas, Matplotlib)
4. **Aprofunde:** Crie skill para web frameworks (Django ORM, FastAPI async)
5. **Compare:** Leia skill de JavaScript para entender diferenças no event loop

---

**Fontes:**
- [Python Documentation](https://docs.python.org/3/)
- [Python Enhancement Proposals (PEPs)](https://peps.python.org/)
- [Global Interpreter Lock (GIL)](https://wiki.python.org/moin/GlobalInterpreterLock)

**Tags:** `#python` `#duck-typing` `#gil` `#asyncio` `#list-comprehension`
