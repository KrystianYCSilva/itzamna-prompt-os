---
name: c-cpp
description: |
  Fundamentos de C e C++: tipagem estática, gerenciamento manual de memória, 
  ponteiros e compilação nativa. C++ adiciona OOP, templates e RAII.
  Use quando precisa entender controle explícito de memória, performance nativa ou sistemas de baixo nível.
keywords:
  - c
  - cpp
  - pointers
  - manual-memory
  - raii
  - stl
  - native-compilation
language_version: "C/C++ (moderno)"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://en.cppreference.com/
  - https://isocpp.org/
  - https://gcc.gnu.org/onlinedocs/
---

# C/C++ — Linguagem Baseline

> **Quick Reference:** Linguagens nativas com controle explícito de memória, ponteiros e compilação para código de máquina
> **Use when:** Desenvolvendo sistemas operacionais, drivers, embarcados, engines de performance crítica ou integrando com hardware

## Introdução

**C** (1972, Dennis Ritchie) é uma linguagem procedural, estaticamente tipada, com gerenciamento manual de memória. **C++** (1983, Bjarne Stroustrup) estende C com orientação a objetos, templates, exceções e RAII (Resource Acquisition Is Initialization).

Ambas compilam diretamente para código de máquina nativo (sem VM), oferecendo controle total sobre hardware e memória ao custo de maior complexidade e responsabilidade do programador.

Este baseline cobre os **conceitos fundamentais** comuns entre C e C++ que são transversais às versões. Para features específicas de versão (ex: C++20 modules, C11 atomics), consulte skills especializadas.

**Características principais:**
- Tipagem estática forte (verificação em compile-time)
- Gerenciamento manual de memória (malloc/free, new/delete)
- Ponteiros para acesso direto à memória
- Compilação nativa (sem garbage collector, sem runtime VM)
- C++: RAII, smart pointers, STL (Standard Template Library)

## Sistema de Tipagem

C e C++ possuem **tipagem estática forte** com verificação em tempo de compilação.

### Tipos Primitivos

```c
// Tipos Primitivos
#include <stdio.h>

int main() {
    int x = 42;              // inteiro (geralmente 4 bytes)
    float y = 3.14f;         // ponto flutuante (4 bytes)
    double z = 3.14159;      // double precision (8 bytes)
    char c = 'A';            // caractere (1 byte)
    
    printf("int: %d, float: %.2f, double: %.5f, char: %c\n", x, y, z, c);
    return 0;
}
```

### Ponteiros

Ponteiros armazenam endereços de memória, permitindo acesso direto e manipulação de dados.

```c
// Ponteiros
#include <stdio.h>

int main() {
    int x = 10;
    int *ptr = &x;  // ptr aponta para o endereço de x
    
    printf("Valor de x: %d\n", x);        // Output: 10
    printf("Endereço de x: %p\n", (void*)&x);
    printf("Valor via ponteiro: %d\n", *ptr);  // dereferência
    
    *ptr = 20;  // modifica x via ponteiro
    printf("Novo valor de x: %d\n", x);   // Output: 20
    
    return 0;
}
```

**Operadores de ponteiros:**
- `&` (address-of): obtém endereço de variável
- `*` (dereference): acessa valor apontado
- Aritmética de ponteiros: `ptr++`, `ptr + n` (avança bytes baseado no tipo)

### Structs e Classes

**C**: Structs agrupam dados sem métodos.  
**C++**: Classes adicionam encapsulamento, métodos, herança.

```cpp
// Structs (C) vs Classes (C++)
// C struct
struct Point {
    int x;
    int y;
};

// C++ class
class Rectangle {
private:
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    int area() const { return width * height; }
};

int main() {
    Point p = {10, 20};  // C-style init
    Rectangle r(5, 10);  // C++ object
    return r.area();     // 50
}
```

## Gerenciamento de Memória

C e C++ exigem **gerenciamento manual de memória**: o programador aloca e desaloca explicitamente.

### Stack vs Heap

```cpp
// Stack vs Heap
#include <iostream>

int main() {
    int stack_var = 42;  // alocado na stack (automático)
    
    // Heap allocation (C)
    int *heap_var_c = (int*)malloc(sizeof(int));
    *heap_var_c = 100;
    free(heap_var_c);  // OBRIGATÓRIO: desalocar
    
    // Heap allocation (C++)
    int *heap_var_cpp = new int(200);
    std::cout << *heap_var_cpp << std::endl;  // 200
    delete heap_var_cpp;  // OBRIGATÓRIO: desalocar
    
    return 0;
}
// stack_var é destruído automaticamente ao sair do escopo
```

**Stack**: Alocação automática, rápida, limitada (tipicamente 1-8 MB).  
**Heap**: Alocação dinâmica, lenta, maior (limitado pela RAM), requer free/delete manual.

### RAII (C++ Only)

**RAII** (Resource Acquisition Is Initialization) garante que recursos sejam liberados automaticamente ao sair do escopo, usando construtores e destrutores.

```cpp
// RAII - Automatic Resource Management
#include <iostream>
#include <fstream>

class FileHandler {
    std::ofstream file;
public:
    FileHandler(const char* filename) : file(filename) {
        std::cout << "File opened\n";
    }
    
    void write(const char* data) { file << data; }
    
    ~FileHandler() {  // destrutor chamado automaticamente
        file.close();
        std::cout << "File closed\n";
    }
};

int main() {
    FileHandler fh("data.txt");
    fh.write("Hello RAII");
    // fh.~FileHandler() chamado automaticamente ao sair do escopo
    return 0;
}
```

### Smart Pointers (C++11+)

Smart pointers automatizam gerenciamento de memória usando RAII.

```cpp
// Smart Pointers (C++11)
#include <memory>
#include <iostream>

int main() {
    // unique_ptr: ownership exclusivo
    std::unique_ptr<int> ptr1 = std::make_unique<int>(42);
    std::cout << *ptr1 << std::endl;  // 42
    // delete automático ao sair do escopo
    
    // shared_ptr: ownership compartilhado (reference counting)
    std::shared_ptr<int> ptr2 = std::make_shared<int>(100);
    std::shared_ptr<int> ptr3 = ptr2;  // ambos apontam para 100
    std::cout << ptr2.use_count() << std::endl;  // 2
    // delete automático quando último shared_ptr é destruído
    
    return 0;
}
```

**📖 Para diagnóstico de problemas de memória (leaks, dangling pointers, buffer overflow):**  
→ Veja [advanced-memory.md](advanced-memory.md)

## Modelo de Concorrência

C e C++ não possuem concorrência nativa no core language (até C11/C++11). Threads são fornecidos por bibliotecas.

### Threads

**C (POSIX)**: pthread  
**C++11+**: std::thread

```cpp
// Threads (C++11)
#include <iostream>
#include <thread>

void print_message(const char* msg) {
    std::cout << msg << std::endl;
}

int main() {
    std::thread t1(print_message, "Hello from thread 1");
    std::thread t2(print_message, "Hello from thread 2");
    
    t1.join();  // aguarda t1 terminar
    t2.join();  // aguarda t2 terminar
    
    return 0;
}
```

### Mutexes e Race Conditions

Mutexes (mutual exclusion) protegem dados compartilhados de race conditions.

```cpp
// Mutex - Evitando Race Conditions
#include <iostream>
#include <thread>
#include <mutex>

int counter = 0;
std::mutex mtx;

void increment() {
    for (int i = 0; i < 1000; ++i) {
        std::lock_guard<std::mutex> lock(mtx);  // RAII lock
        ++counter;  // seção crítica protegida
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    
    t1.join();
    t2.join();
    
    std::cout << "Counter: " << counter << std::endl;  // 2000 (correto)
    return 0;
}
```

**Sem mutex**: Race condition → resultado imprevisível (ex: 1523 em vez de 2000).  
**Com mutex**: Acesso serializado → resultado correto.

## Compilação e Ecossistema

### Compilação Nativa

C/C++ compilam em código de máquina nativo através de 4 fases: **Preprocessor → Compiler → Assembler → Linker**.

```bash
# Compilação direta (todas as fases)
gcc main.c -o myapp           # C
g++ main.cpp -o myapp         # C++

# Com otimização e warnings
gcc -Wall -O2 main.c -o myapp
```

**📖 Para detalhes do processo de compilação (4 fases, flags, static/dynamic linking):**  
→ Veja [compilation.md](compilation.md)

### Compilers Principais

- **GCC** (GNU Compiler Collection): Padrão em Linux, open-source
- **Clang**: Front-end moderno (LLVM), usado no macOS/iOS
- **MSVC**: Microsoft Visual C++ Compiler (Windows)

### Standard Library

**C Standard Library** (libc):
- `stdio.h`: I/O (printf, scanf, fopen)
- `stdlib.h`: Alocação (malloc, free), conversões
- `string.h`: Manipulação de strings (strcpy, strlen)
- `math.h`: Funções matemáticas (sin, cos, sqrt)

**C++ Standard Template Library** (STL):
- **Containers**: `vector`, `list`, `map`, `set`, `unordered_map`
- **Algorithms**: `sort`, `find`, `accumulate`, `transform`
- **Iterators**: Abstrações para navegar containers
- **Streams**: `iostream` (cin, cout), `fstream`

```cpp
// STL Containers e Algorithms
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9};
    
    // Algoritmo sort
    std::sort(nums.begin(), nums.end());
    
    // Iterar com range-based for (C++11)
    for (int n : nums) {
        std::cout << n << " ";  // Output: 1 2 5 8 9
    }
    
    return 0;
}
```

### Build Systems

**📖 Para configurar build systems (Make, CMake, Ninja) e package managers (Conan, vcpkg):**  
→ Veja [build-tools.md](build-tools.md)

**Quick summary:**
- **Make**: Build automation clássico (Makefile)
- **CMake**: Meta-build multiplataforma (gera Makefile, VS projects, etc.)
- **Conan/vcpkg**: Package managers C/C++

## Recursos e Referências

**Documentação Oficial:**
- [cppreference.com](https://en.cppreference.com/) - Referência completa C/C++
- [ISO C++ Standards](https://isocpp.org/) - Padrões oficiais e guidelines
- [GCC Documentation](https://gcc.gnu.org/onlinedocs/) - Compiler reference

**Standard Libraries:**
- [C Library Reference](https://en.cppreference.com/w/c)
- [STL Containers](https://en.cppreference.com/w/cpp/container)
- [STL Algorithms](https://en.cppreference.com/w/cpp/algorithm)
- [Smart Pointers](https://en.cppreference.com/w/cpp/memory)

**Comunidade:**
- [Stack Overflow C](https://stackoverflow.com/questions/tagged/c)
- [Stack Overflow C++](https://stackoverflow.com/questions/tagged/c%2b%2b)
- [Reddit r/cpp](https://www.reddit.com/r/cpp/)

**Sub-files (load JIT):**
- [compilation.md](compilation.md) - Processo de compilação detalhado
- [build-tools.md](build-tools.md) - Make, CMake, package managers
- [advanced-memory.md](advanced-memory.md) - Memory leaks, dangling pointers, debugging
