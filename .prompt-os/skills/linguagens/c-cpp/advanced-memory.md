# Advanced Memory Management - C/C++

> **Load JIT quando:** Precisa diagnosticar problemas de memória ou otimizar uso de memória
> **Parent skill:** [c-cpp](../SKILL.md)

---

## Problemas Comuns de Memória

### 1. Memory Leaks

**Definição**: Memória alocada dinamicamente nunca é liberada, causando esgotamento gradual de memória.

```cpp
// Memory Leak - BAD
void process_data() {
    int *data = new int[1000];  // aloca 4KB
    // ... processa dados ...
    // ERRO: esqueceu 'delete[] data'
}  // data sai de escopo mas memória não é liberada

int main() {
    for (int i = 0; i < 10000; ++i) {
        process_data();  // vaza 4KB a cada iteração = 40MB total!
    }
    return 0;
}
```

**Correção - Manual:**
```cpp
void process_data() {
    int *data = new int[1000];
    // ... processa dados ...
    delete[] data;  // libera memória
}
```

**Correção - RAII (C++):**
```cpp
#include <vector>

void process_data() {
    std::vector<int> data(1000);  // RAII: delete automático
    // ... processa dados ...
}  // destrutor de vector libera memória automaticamente
```

### 2. Dangling Pointers

**Definição**: Ponteiro aponta para memória já liberada, causando **undefined behavior** (crash, corrupção).

```cpp
// Dangling Pointer - BAD
int* create_array() {
    int arr[5] = {1, 2, 3, 4, 5};  // array na stack
    return arr;  // ERRO: arr é destruído ao sair da função
}

int main() {
    int *ptr = create_array();
    std::cout << ptr[0] << std::endl;  // undefined behavior!
    return 0;
}
```

**Correção - Alocar no Heap:**
```cpp
int* create_array() {
    int *arr = new int[5]{1, 2, 3, 4, 5};  // heap allocation
    return arr;  // OK: memória persiste
}

int main() {
    int *ptr = create_array();
    std::cout << ptr[0] << std::endl;  // OK
    delete[] ptr;  // liberar quando terminar
    return 0;
}
```

**Correção - Smart Pointers (C++11):**
```cpp
#include <memory>
#include <vector>

std::unique_ptr<std::vector<int>> create_array() {
    auto arr = std::make_unique<std::vector<int>>(
        std::initializer_list<int>{1, 2, 3, 4, 5}
    );
    return arr;  // ownership transferido
}

int main() {
    auto ptr = create_array();
    std::cout << (*ptr)[0] << std::endl;  // OK
    // delete automático ao sair do escopo
    return 0;
}
```

### 3. Double Free

**Definição**: Liberar mesma memória duas vezes causa **heap corruption**.

```cpp
// Double Free - BAD
int main() {
    int *ptr = new int(42);
    delete ptr;
    delete ptr;  // ERRO: double free → crash!
    return 0;
}
```

**Correção - Zerar ponteiro:**
```cpp
int main() {
    int *ptr = new int(42);
    delete ptr;
    ptr = nullptr;  // marca como inválido
    
    if (ptr != nullptr) {
        delete ptr;  // não executado
    }
    return 0;
}
```

**Correção - Smart Pointers:**
```cpp
#include <memory>

int main() {
    auto ptr = std::make_unique<int>(42);
    // delete automático, impossível double free
    return 0;
}
```

### 4. Use-After-Free

**Definição**: Usar ponteiro após liberar a memória (variante de dangling pointer).

```cpp
// Use-After-Free - BAD
int main() {
    int *ptr = new int(42);
    delete ptr;
    std::cout << *ptr << std::endl;  // ERRO: memória já liberada
    return 0;
}
```

**Correção:**
```cpp
int main() {
    int *ptr = new int(42);
    std::cout << *ptr << std::endl;  // usar antes de deletar
    delete ptr;
    ptr = nullptr;  // prevenir uso acidental
    return 0;
}
```

### 5. Buffer Overflow

**Definição**: Escrever além dos limites de array, causando corrupção ou vulnerabilidade de segurança.

```cpp
// Buffer Overflow - BAD
int main() {
    int arr[5];
    for (int i = 0; i <= 5; ++i) {  // ERRO: i=5 está fora dos limites
        arr[i] = i * 10;  // corrompe memória adjacente
    }
    return 0;
}
```

**Correção - Verificar limites:**
```cpp
int main() {
    int arr[5];
    for (int i = 0; i < 5; ++i) {  // i < 5 (não <=)
        arr[i] = i * 10;
    }
    return 0;
}
```

**Correção - std::vector (C++):**
```cpp
#include <vector>

int main() {
    std::vector<int> arr(5);
    for (size_t i = 0; i < arr.size(); ++i) {
        arr[i] = i * 10;  // bounds checking com .at(i)
    }
    return 0;
}
```

---

## Ferramentas de Detecção

### Valgrind (Linux/macOS)

Detecta memory leaks, invalid accesses, double free.

```bash
# Compilar com símbolos de debug
g++ -g main.cpp -o myapp

# Executar com Valgrind
valgrind --leak-check=full ./myapp
```

**Output exemplo:**
```
==12345== HEAP SUMMARY:
==12345==     in use at exit: 4,000 bytes in 1 blocks
==12345==   total heap usage: 1 allocs, 0 frees, 4,000 bytes allocated
==12345== 
==12345== 4,000 bytes in 1 blocks are definitely lost in loss record 1 of 1
==12345==    at 0x4C2E0EF: operator new[](unsigned long)
==12345==    by 0x400A3B: process_data() (main.cpp:5)
```

### AddressSanitizer (ASan)

Sanitizer do Clang/GCC para detectar memory errors em runtime.

```bash
# Compilar com ASan
g++ -fsanitize=address -g main.cpp -o myapp

# Executar (crash ao detectar erro)
./myapp
```

**Detecta:**
- Use-after-free
- Heap buffer overflow
- Stack buffer overflow
- Double free
- Memory leaks

### Static Analyzers

**Clang Static Analyzer:**
```bash
clang --analyze main.cpp
```

**Cppcheck:**
```bash
cppcheck --enable=all main.cpp
```

---

## Best Practices

### 1. Preferir Stack a Heap

Stack é automático, rápido e sem leaks.

```cpp
// GOOD - Stack allocation
void process() {
    int data[100];  // destruído automaticamente
    // ... usar data ...
}

// AVOID - Heap desnecessário
void process() {
    int *data = new int[100];  // requer delete manual
    // ... usar data ...
    delete[] data;
}
```

### 2. Usar RAII (C++)

Encapsular recursos em classes com destrutor.

```cpp
// GOOD - RAII
class Resource {
    int *data;
public:
    Resource(size_t size) : data(new int[size]) {}
    ~Resource() { delete[] data; }  // automático
};

void process() {
    Resource res(1000);  // alocação
    // ... usar res ...
}  // destrutor libera memória automaticamente
```

### 3. Usar Smart Pointers (C++11+)

```cpp
#include <memory>

// GOOD - unique_ptr (ownership único)
void process() {
    auto data = std::make_unique<int[]>(1000);
    // ... usar data ...
}  // delete automático

// GOOD - shared_ptr (ownership compartilhado)
std::shared_ptr<Data> create_shared() {
    return std::make_shared<Data>();
}
```

### 4. Evitar Ponteiros Crus para Ownership

```cpp
// BAD - Ownership ambíguo
Data* create() {
    return new Data();  // quem deve deletar?
}

// GOOD - Ownership explícito
std::unique_ptr<Data> create() {
    return std::make_unique<Data>();  // caller é dono
}
```

### 5. Inicializar Ponteiros

```cpp
// BAD - Ponteiro não inicializado
int *ptr;  // contém lixo (undefined behavior se usado)

// GOOD - Inicializar com nullptr
int *ptr = nullptr;
if (condition) {
    ptr = new int(42);
}
if (ptr != nullptr) {
    delete ptr;
}
```

---

## Memory Profiling

### Heap Profiling (massif - Valgrind)

Analisa uso de memória ao longo do tempo.

```bash
valgrind --tool=massif ./myapp
ms_print massif.out.12345
```

### Performance Profiling

```bash
# perf (Linux)
perf record ./myapp
perf report

# Instruments (macOS)
instruments -t "Allocations" ./myapp
```

---

## Referências

- [Valgrind Documentation](https://valgrind.org/docs/manual/manual.html)
- [AddressSanitizer (ASan)](https://clang.llvm.org/docs/AddressSanitizer.html)
- [C++ Core Guidelines - Memory Management](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#r-resource-management)
- [Smart Pointers (cppreference)](https://en.cppreference.com/w/cpp/memory)
