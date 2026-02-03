# Compilação C/C++ - Processo Detalhado

> **Load JIT quando:** Precisa entender como C/C++ transforma código-fonte em executável
> **Parent skill:** [c-cpp](../SKILL.md)

---

## Processo de Compilação

C e C++ compilam em **4 fases sequenciais**: Preprocessor → Compiler → Assembler → Linker.

### 1. Preprocessor

Processa diretivas `#include`, `#define`, `#ifdef` antes da compilação.

```bash
# Expande macros e includes
gcc -E main.c -o main.i
```

**O que faz:**
- Expande `#include` (copia conteúdo de headers)
- Substitui `#define` macros
- Processa `#ifdef`, `#ifndef` (conditional compilation)

```c
// Exemplo: Antes do preprocessor
#define PI 3.14159
#define SQUARE(x) ((x) * (x))

int main() {
    double area = PI * SQUARE(5);  // macro expansion
    return 0;
}

// Depois do preprocessor (main.i)
int main() {
    double area = 3.14159 * ((5) * (5));  // expandido
    return 0;
}
```

### 2. Compiler

Transforma código C/C++ em **assembly** (linguagem de baixo nível específica da arquitetura).

```bash
# Gera assembly (.s)
gcc -S main.i -o main.s
```

**O que faz:**
- Análise léxica, sintática, semântica
- Otimizações (dead code elimination, inlining, loop unrolling)
- Gera código assembly (x86, ARM, etc.)

```asm
; Exemplo de assembly gerado (x86-64)
main:
    push    rbp
    mov     rbp, rsp
    mov     DWORD PTR [rbp-4], 42
    mov     eax, 0
    pop     rbp
    ret
```

### 3. Assembler

Converte assembly em **object file** (.o ou .obj) - código de máquina binário.

```bash
# Gera object file (.o)
gcc -c main.s -o main.o
```

**O que faz:**
- Traduz mnemonics assembly para opcodes binários
- Cria tabela de símbolos (funções, variáveis globais)
- Gera relocatable code (endereços ainda não resolvidos)

### 4. Linker

Combina múltiplos object files e bibliotecas em um **executável final**.

```bash
# Gera executável
gcc main.o utils.o -o myapp
```

**O que faz:**
- Resolve referências entre object files (symbol resolution)
- Linka bibliotecas estáticas (.a) ou dinâmicas (.so, .dll)
- Atribui endereços finais de memória
- Gera executável (ELF no Linux, PE no Windows, Mach-O no macOS)

### Linking Estático vs Dinâmico

**Static Linking** (.a, .lib):
- Biblioteca copiada para o executável
- Executável maior, sem dependências externas
- Usado para distribuir binários standalone

**Dynamic Linking** (.so, .dll, .dylib):
- Biblioteca carregada em runtime
- Executável menor, múltiplos programas compartilham biblioteca
- Requer biblioteca instalada no sistema

```bash
# Link estático
gcc main.c -static -o myapp_static

# Link dinâmico (padrão)
gcc main.c -o myapp_dynamic

# Verificar dependências dinâmicas (Linux)
ldd myapp_dynamic
# Output: libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6
```

---

## Compilação Direta

Na prática, raramente se executa cada fase manualmente. Compiladores fazem todas as fases automaticamente:

```bash
# GCC: Todas as fases de uma vez
gcc main.c -o myapp

# Com otimização e warnings
gcc -Wall -O2 main.c -o myapp

# C++ com padrão específico
g++ -std=c++17 -Wall -O2 main.cpp -o myapp
```

---

## Flags de Compilação Comuns

| Flag | Descrição |
|------|-----------|
| `-Wall` | Habilita warnings comuns |
| `-Werror` | Trata warnings como erros |
| `-O0` / `-O1` / `-O2` / `-O3` | Níveis de otimização (0=debug, 3=máxima) |
| `-g` | Inclui símbolos de debug (para gdb, lldb) |
| `-std=c11` / `-std=c++17` | Define versão do padrão |
| `-I<dir>` | Adiciona diretório para busca de headers |
| `-L<dir>` | Adiciona diretório para busca de bibliotecas |
| `-l<lib>` | Linka biblioteca (ex: `-lpthread`, `-lm`) |
| `-c` | Compila sem linkar (gera .o) |
| `-E` | Apenas preprocessor |
| `-S` | Apenas até assembly |

---

## Compilers Principais

### GCC (GNU Compiler Collection)
- **Plataforma**: Linux, macOS (via brew), Windows (MinGW)
- **Linguagens**: C, C++, Objective-C, Fortran
- **Uso**: `gcc` (C), `g++` (C++)

```bash
gcc --version
gcc main.c -o myapp
```

### Clang
- **Plataforma**: macOS (padrão), Linux, Windows
- **Baseado em**: LLVM (modular, otimizações avançadas)
- **Uso**: `clang` (C), `clang++` (C++)
- **Vantagens**: Mensagens de erro mais claras, compilação mais rápida

```bash
clang --version
clang++ -std=c++17 main.cpp -o myapp
```

### MSVC (Microsoft Visual C++)
- **Plataforma**: Windows
- **IDE**: Visual Studio
- **Uso**: `cl.exe` (linha de comando)

```cmd
cl /EHsc main.cpp /Fe:myapp.exe
```

---

## Referências

- [GCC Documentation](https://gcc.gnu.org/onlinedocs/)
- [Clang User's Manual](https://clang.llvm.org/docs/UsersManual.html)
- [MSVC Compiler Reference](https://learn.microsoft.com/en-us/cpp/build/reference/compiler-options)
- [Linkers and Loaders (Book)](https://www.iecc.com/linker/)
