---
name: go
description: |
  Fundamentos da linguagem Go: tipagem estática com type inference, gerenciamento automático de memória (GC), 
  goroutines para concorrência leve e ecossistema moderno. Linguagem de propósito geral focada em simplicidade e performance.
keywords:
  - go
  - golang
  - goroutines
  - channels
  - static-typing
  - garbage-collection
  - concurrency
language_version: "Go (moderno)"
category: technology
subcategory: languages
version: "1.0.0"
created: 2026-02-03
type: skill
sources:
  - https://go.dev/doc/
  - https://go.dev/ref/spec
  - https://golang.org/doc/effective_go
---

# Go — Linguagem Baseline

> **Quick Reference:** Linguagem compilada com goroutines nativas, tipagem estática forte e foco em simplicidade
> **Use when:** Desenvolvendo APIs backend, microservices, ferramentas CLI, sistemas distribuídos ou aplicações de alta concorrência

## Introdução

**Go** (2009, Google) é uma linguagem de programação de propósito geral, estaticamente tipada, com gerenciamento automático de memória e compilação nativa. Criada por Robert Griesemer, Rob Pike e Ken Thompson, Go combina a eficiência de linguagens compiladas (C/C++) com a simplicidade de linguagens dinâmicas (Python).

Características principais diferenciam Go de outras linguagens:
- **Concorrência nativa**: Goroutines (green threads) e channels como primitivas da linguagem
- **Simplicidade**: Apenas 25 keywords, sem herança de classes, sem exceções tradicionais
- **Tipagem estática forte** com type inference
- **Compilação rápida** para binários nativos (sem VM)
- **Garbage Collection** automático, otimizado para baixa latência

Este baseline cobre os **conceitos fundamentais** transversais às versões modernas de Go (1.13+). Para features específicas de versão (ex: Go 1.18 generics, Go 1.21 range over func), consulte skills especializadas.

## Sistema de Tipagem

Go possui **tipagem estática forte** com type inference (`:=` operator).

### Tipos Primitivos

```go
// Números inteiros
var i int = 42           // tamanho dependente da arquitetura (32/64 bits)
var i8 int8 = -128       // 8 bits com sinal
var ui uint = 42         // unsigned (sem sinal)

// Números ponto flutuante
var f32 float32 = 3.14
var f64 float64 = 3.141592653589793

// Booleanos
var b bool = true

// Strings (imutáveis, UTF-8)
var s string = "Hello, 世界"

// Runes (aliases para int32, representam code points Unicode)
var r rune = '世'
```

### Type Inference

```go
// Short declaration (:=) infere o tipo
x := 42              // int
name := "Go"         // string
isReady := true      // bool

// Apenas dentro de funções (não em escopo de pacote)
```

### Zero Values

Go inicializa automaticamente variáveis não atribuídas com "zero value":

```go
var i int       // 0
var f float64   // 0.0
var b bool      // false
var s string    // "" (string vazia)
var p *int      // nil
```

**Diferença de outras linguagens**: Não há valores "undefined" - todas as variáveis têm valor padrão seguro.

### Structs (Tipos Compostos)

```go
// Definição
type Person struct {
    Name string
    Age  int
}

// Inicialização
p1 := Person{Name: "Alice", Age: 30}
p2 := Person{"Bob", 25}  // ordem dos campos (não recomendado)

// Zero value para struct: todos os campos são zero values
var p3 Person  // {Name: "", Age: 0}
```

**Diferença de classes**: Go não tem classes - structs + métodos substituem OOP tradicional.

## Gerenciamento de Memória

Go possui **garbage collection automático** (não requer malloc/free manual).

### Stack vs Heap

```go
func createInt() int {
    x := 42  // pode ser stack ou heap (escape analysis do compilador decide)
    return x
}

func createPointer() *int {
    x := 42
    return &x  // x "escapa" para heap (retorna ponteiro)
}
```

**Escape Analysis**: Compilador decide automaticamente se variável vai para stack (rápido) ou heap (GC).

### Ponteiros (Sem Aritmética)

```go
x := 42
p := &x      // ponteiro para x
fmt.Println(*p)  // dereferencia: imprime 42

*p = 21      // modifica x através do ponteiro
```

**Diferença de C/C++**: Não há aritmética de ponteiros (`p++` é inválido) - segurança contra buffer overflow.

### Garbage Collection

- **Tipo**: Concurrent mark-and-sweep (tri-color marking)
- **Latência**: Otimizado para pausas <1ms (Go 1.8+)
- **Tuning**: Variável `GOGC` controla trade-off memória vs CPU

**Quando GC roda**: Automaticamente quando heap atinge threshold (padrão: 100% de crescimento).

## Concorrência: Goroutines e Channels

### Goroutines (Green Threads)

Goroutines são **threads leves** gerenciadas pelo runtime Go (não são threads do OS).

```go
func sayHello() {
    fmt.Println("Hello from goroutine")
}

func main() {
    go sayHello()  // inicia goroutine (não bloqueia)
    
    time.Sleep(time.Second)  // aguarda goroutine terminar (exemplo)
}
```

**Características**:
- **Leves**: ~2KB de stack inicial (threads OS: ~1-2MB)
- **Multiplexadas**: Runtime Go agenda N goroutines em M threads OS (M:N scheduling)
- **Criação rápida**: Milhares/milhões de goroutines são viáveis

### Channels (Comunicação)

Channels são **pipes tipados** para comunicação entre goroutines.

```go
// Criar channel
ch := make(chan int)  // unbuffered (síncrono)
chBuf := make(chan int, 10)  // buffered (assíncrono até 10 valores)

// Enviar/receber
go func() {
    ch <- 42  // envia (bloqueia até receptor ler)
}()
value := <-ch  // recebe (bloqueia até dado disponível)

// Fechar channel
close(ch)

// Range sobre channel (recebe até fechar)
for val := range ch {
    fmt.Println(val)
}
```

**Select (Multiplexação)**:

```go
select {
case msg := <-ch1:
    fmt.Println("Recebido de ch1:", msg)
case msg := <-ch2:
    fmt.Println("Recebido de ch2:", msg)
case <-time.After(time.Second):
    fmt.Println("Timeout")
}
```

**Diferença de outras linguagens**: Channels são primitivas de primeira classe (não bibliotecas externas como Java/Python).

### Padrões de Concorrência

**Worker Pool**:

```go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2  // processa job
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    // Inicia 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Envia jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Coleta resultados
    for a := 1; a <= 5; a++ {
        <-results
    }
}
```

## Interfaces (Implícitas)

Go usa **interfaces implícitas** (duck typing estrutural).

```go
type Writer interface {
    Write([]byte) (int, error)
}

type File struct {}

// File implementa Writer automaticamente (sem declaração explícita)
func (f File) Write(data []byte) (int, error) {
    // implementação
    return len(data), nil
}

func writeData(w Writer, data []byte) {
    w.Write(data)  // aceita qualquer tipo que implemente Writer
}

func main() {
    var f File
    writeData(f, []byte("hello"))  // File é Writer implicitamente
}
```

**Vantagens**:
- Sem acoplamento entre definição de interface e implementação
- Tipos de bibliotecas externas podem satisfazer interfaces do seu código

**Interface vazia**:

```go
var x interface{}  // aceita qualquer tipo (similar a Object em Java)

x = 42
x = "hello"
x = []int{1, 2, 3}
```

## Controle de Erro (Sem Exceções)

Go **não possui exceções tradicionais** (try/catch). Erros são valores retornados.

```go
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("divisão por zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Erro:", err)
        return
    }
    fmt.Println("Resultado:", result)
}
```

**Idioma comum**:

```go
if err := someFunction(); err != nil {
    // trata erro
}
```

**Panic/Recover** (emergências):

```go
func safeDivide(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recuperado de panic:", r)
            result = 0
        }
    }()
    
    if b == 0 {
        panic("divisão por zero")  // panic é para erros irrecuperáveis
    }
    return a / b
}
```

**Quando usar panic**: Erros de programação (bugs), não erros esperados.

## Defer (Cleanup)

`defer` executa função ao final do escopo (similar a finally, mas sem try).

```go
func readFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close()  // executado ao final (sucesso ou erro)
    
    // processa arquivo
    return nil
}
```

**Ordem de execução**: LIFO (Last In, First Out)

```go
defer fmt.Println("1")
defer fmt.Println("2")
defer fmt.Println("3")
// Imprime: 3, 2, 1
```

## Estrutura de Projetos

### Módulos (Go 1.11+)

```bash
# Inicializar módulo
go mod init github.com/usuario/projeto

# go.mod gerado:
module github.com/usuario/projeto

go 1.21

require (
    github.com/gorilla/mux v1.8.0
)
```

### Estrutura de Diretórios

```
projeto/
├── go.mod              # Definição do módulo
├── go.sum              # Checksums de dependências
├── main.go             # Ponto de entrada
├── internal/           # Código privado (não exportável)
│   └── utils/
│       └── helper.go
└── pkg/                # Código exportável
    └── api/
        └── server.go
```

**Convenção `internal/`**: Pacotes aqui não podem ser importados por projetos externos.

## Ferramentas Padrão

Go possui toolchain integrado (não requer build tools externos):

```bash
go build      # Compila binário
go run        # Compila e executa
go test       # Executa testes
go fmt        # Formata código (estilo oficial)
go vet        # Analisa código para erros comuns
go mod tidy   # Limpa dependências não usadas
```

**Testing embutido**:

```go
// math_test.go
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}
```

## Quando Usar Go

### Casos de Uso Ideais

- ✅ **Microservices/APIs REST** - Concorrência nativa, baixo footprint
- ✅ **Ferramentas CLI** - Compilação para binário único, cross-compilation fácil
- ✅ **Sistemas distribuídos** - Goroutines para I/O concorrente (Kubernetes escrito em Go)
- ✅ **Proxies/Load balancers** - Alta performance I/O (ex: Traefik, Caddy)
- ✅ **DevOps tooling** - Docker, Terraform escritos em Go

### Comparação com Outras Linguagens

| Aspecto | Go | Java | Python | Rust |
|---------|----|----|--------|------|
| **Performance** | Alta (compilado) | Alta (JIT) | Baixa (interpretado) | Muito alta |
| **Concorrência** | Goroutines nativas | Threads pesadas | GIL limita | Async/await |
| **Complexidade** | Baixa (25 keywords) | Média-Alta | Baixa | Alta (ownership) |
| **Startup time** | Instantâneo (binário) | Lento (JVM warmup) | Rápido | Instantâneo |
| **Garbage Collection** | Sim (low-latency) | Sim (pausas maiores) | Sim | Não (ownership) |

### Quando NÃO Usar Go

- ❌ **GUI desktop/mobile** - Não é foco da linguagem
- ❌ **Machine Learning** - Ecossistema Python é superior
- ❌ **Sistemas de tempo real hard** - GC introduz latência (use Rust/C++)
- ❌ **Requires generics complexos** - Generics Go são limitados (Go 1.18+)

## Recursos Adicionais

**Documentação Oficial**:
- Tour interativo: https://go.dev/tour/
- Effective Go (best practices): https://golang.org/doc/effective_go
- Especificação da linguagem: https://go.dev/ref/spec

**Ferramentas Populares**:
- **Frameworks web**: Gin, Echo, Fiber
- **ORMs**: GORM, sqlx (evita abstrações pesadas)
- **Testing**: Testify (assertions), httptest (HTTP testing)

---

**Última atualização:** 2026-02-03  
**Skill version:** 1.0.0  
**Compatível com:** Go 1.13+ (conceitos fundamentais cross-version)
