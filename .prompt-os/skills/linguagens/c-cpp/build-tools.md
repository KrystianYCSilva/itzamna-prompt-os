# Build Tools C/C++ - Make, CMake e Package Managers

> **Load JIT quando:** Precisa configurar build systems ou gerenciar dependências C/C++
> **Parent skill:** [c-cpp](../SKILL.md)

---

## Make

**Make** é o build automation clássico, baseado em `Makefile` que define regras de compilação e dependências.

### Makefile Básico

```makefile
# Makefile
CC = gcc
CFLAGS = -Wall -O2
TARGET = myapp

# Regra padrão (executada com 'make')
all: $(TARGET)

# Regra para gerar executável
$(TARGET): main.o utils.o
	$(CC) $(CFLAGS) -o $(TARGET) main.o utils.o

# Regra para gerar object files
main.o: main.c utils.h
	$(CC) $(CFLAGS) -c main.c

utils.o: utils.c utils.h
	$(CC) $(CFLAGS) -c utils.c

# Regra para limpar arquivos compilados
clean:
	rm -f *.o $(TARGET)
```

**Comandos:**
```bash
make          # Compila (executa regra 'all')
make clean    # Remove arquivos compilados
make -j4      # Compila em paralelo (4 jobs)
```

**Vantagens:**
- Universal (presente em todos os sistemas Unix)
- Recompila apenas arquivos modificados (incremental build)

**Desvantagens:**
- Sintaxe arcaica (tabs obrigatórios)
- Difícil manutenção em projetos grandes

---

## CMake

**CMake** é um meta-build system: gera Makefiles, projetos Visual Studio, Xcode, Ninja, etc.

### CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyApp VERSION 1.0)

# Define padrão C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Adiciona executável
add_executable(myapp 
    main.cpp 
    utils.cpp
)

# Linka bibliotecas
target_link_libraries(myapp pthread)

# Inclui diretórios de headers
target_include_directories(myapp PRIVATE include)
```

**Comandos:**
```bash
# Configuração (gera Makefile na pasta build/)
mkdir build && cd build
cmake ..

# Compilação
cmake --build .

# Instalação
cmake --install .
```

**Vantagens:**
- Multiplataforma (Windows, Linux, macOS)
- Detecta dependências automaticamente
- Integração com IDEs (Visual Studio, CLion)
- Suporte para bibliotecas externas (find_package)

**Desvantagens:**
- Curva de aprendizado
- Sintaxe própria (não é Makefile)

### CMake com Dependências Externas

```cmake
# Buscar biblioteca instalada no sistema
find_package(Boost REQUIRED COMPONENTS filesystem)

add_executable(myapp main.cpp)
target_link_libraries(myapp Boost::filesystem)
```

---

## Autotools (GNU Build System)

**Autotools** gera `./configure` scripts portáveis (usado em projetos GNU).

**Componentes:**
- **autoconf**: Gera `configure` script
- **automake**: Gera `Makefile.in`
- **libtool**: Suporte para bibliotecas compartilhadas

**Uso típico (como usuário):**
```bash
./configure       # Detecta sistema e gera Makefile
make              # Compila
make install      # Instala
```

**Vantagens:**
- Extremamente portável (Unix/Linux)
- Padrão em projetos open-source clássicos

**Desvantagens:**
- Complexo para manter
- Lento (configure script pesado)
- Obsoleto em projetos modernos (CMake mais popular)

---

## Package Managers

Diferente de linguagens modernas (npm, pip, cargo), C/C++ não possui package manager universal. Existem opções fragmentadas:

### Conan

**Conan** é o package manager C/C++ mais popular.

```bash
# Instalar Conan
pip install conan

# conanfile.txt (dependências)
[requires]
boost/1.80.0
fmt/9.1.0

[generators]
cmake
```

**Integração com CMake:**
```cmake
include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup()

add_executable(myapp main.cpp)
target_link_libraries(myapp ${CONAN_LIBS})
```

**Comandos:**
```bash
conan install .       # Baixa dependências
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build .
```

### vcpkg

**vcpkg** (Microsoft) é package manager multiplataforma.

```bash
# Instalar vcpkg
git clone https://github.com/microsoft/vcpkg
./vcpkg/bootstrap-vcpkg.sh

# Instalar biblioteca
./vcpkg/vcpkg install fmt boost-filesystem
```

**Integração com CMake:**
```bash
cmake .. -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

### Comparação

| Feature | Conan | vcpkg | System Package Manager |
|---------|-------|-------|------------------------|
| Multiplataforma | ✅ | ✅ | ❌ (específico do OS) |
| Integração CMake | ✅ | ✅ | Manual |
| Bibliotecas disponíveis | ~2000 | ~1800 | Depende do OS |
| Facilidade | Média | Alta | Baixa |

**System Package Managers** (apt, yum, brew):
```bash
# Ubuntu/Debian
sudo apt install libboost-all-dev

# macOS
brew install boost

# Fedora/RHEL
sudo yum install boost-devel
```

---

## Ninja

**Ninja** é um build system focado em velocidade (alternativa ao Make).

```bash
# Gerar build.ninja com CMake
cmake -G Ninja ..

# Compilar
ninja
```

**Vantagens:**
- Muito mais rápido que Make (builds incrementais)
- Usado por Chromium, LLVM, Android

**Desvantagens:**
- Não escreve-se build.ninja manualmente (usa geradores como CMake)

---

## Comparação de Build Tools

| Tool | Tipo | Uso Típico | Plataforma |
|------|------|------------|------------|
| **Make** | Build | Projetos pequenos/médios Unix | Unix/Linux |
| **CMake** | Meta-build | Projetos modernos multiplataforma | Todos |
| **Autotools** | Meta-build | Projetos GNU clássicos | Unix/Linux |
| **Ninja** | Build | Builds rápidos (via CMake) | Todos |
| **MSBuild** | Build | Projetos Visual Studio | Windows |

---

## Recomendações

**Para novos projetos:**
1. **CMake** como build system (meta-build multiplataforma)
2. **Ninja** como backend (velocidade)
3. **Conan** ou **vcpkg** para dependências

**Para projetos existentes:**
- Mantenha o build system atual (Make, Autotools)
- Considere migrar para CMake se houver necessidade multiplataforma

---

## Referências

- [CMake Documentation](https://cmake.org/documentation/)
- [GNU Make Manual](https://www.gnu.org/software/make/manual/)
- [Conan Documentation](https://docs.conan.io/)
- [vcpkg Documentation](https://vcpkg.io/en/getting-started.html)
- [Ninja Build](https://ninja-build.org/)
