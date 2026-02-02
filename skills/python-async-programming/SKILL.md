---
name: "python-async-programming"
description: |
  Skill para programacao assincrona em Python usando async/await.
  Cobre event loop, corrotinas, tasks, asyncio e melhores praticas
  para aplicacoes I/O-bound de alta performance.
version: "1.0.0"
domain: "python"
level: "L2"
tags:
  - "python"
  - "async"
  - "asyncio"
  - "concurrency"
  - "performance"
triggers:
  - "trabalhar com async python"
  - "criar codigo assincrono"
  - "usar asyncio"
  - "programacao assincrona em python"
dependencies: []
author: "promptos-brain"
created: "2026-02-02"
status: "approved"
sources:
  - url: "https://docs.python.org/3/library/asyncio.html"
    type: "official_docs"
  - url: "https://realpython.com/async-io-python/"
    type: "tutorial"
  - url: "https://peps.python.org/pep-0492/"
    type: "specification"
---

# Python Async Programming

## Visao Geral

Programacao assincrona em Python permite executar operacoes de I/O de forma 
nao-bloqueante, melhorando significativamente a performance de aplicacoes que 
fazem muitas requisicoes de rede ou operacoes de arquivo.

Esta skill cobre os conceitos fundamentais e melhores praticas para escrever
codigo assincrono eficiente e correto em Python 3.8+.

---

## Instrucoes

### Ao receber uma tarefa relacionada a async Python:

1. **Identifique** se a tarefa envolve operacoes I/O-bound (rede, disco, banco)
2. **Verifique** se o contexto ja usa async (FastAPI, aiohttp, etc)
3. **Aplique** o padrao async/await seguindo as guidelines abaixo
4. **Evite** operacoes bloqueantes dentro de codigo async
5. **Teste** com diferentes cenarios de concorrencia

---

## Conceitos Principais

| Conceito | Descricao |
|----------|-----------|
| **Event Loop** | Loop principal que gerencia e distribui tarefas assincronas |
| **Corrotina** | Funcao definida com `async def` que pode ser pausada e retomada |
| **await** | Palavra-chave para aguardar conclusao de uma corrotina |
| **Task** | Wrapper que permite execucao concorrente de corrotinas |
| **asyncio** | Biblioteca padrao do Python para programacao assincrona |
| **Future** | Objeto que representa resultado eventual de operacao async |

---

## Guidelines (SEMPRE)

1. Use `async def` para funcoes que fazem operacoes I/O
2. Sempre use `await` ao chamar corrotinas
3. Use `asyncio.create_task()` para execucao concorrente
4. Use `asyncio.gather()` para aguardar multiplas tarefas
5. Implemente tratamento de erros com try/except em cada corrotina
6. Use context managers async (`async with`) quando disponiveis
7. Prefira `asyncio.run()` como ponto de entrada (Python 3.7+)

## Constraints (NUNCA)

1. **NUNCA** use operacoes bloqueantes dentro de codigo async (time.sleep, requests.get)
2. **NUNCA** ignore excecoes em Tasks - sempre trate ou logue
3. **NUNCA** crie event loops aninhados - use o loop existente
4. **NUNCA** misture sync e async sem usar `run_in_executor()`
5. **NUNCA** esqueca de fechar recursos async (sessions, connections)

---

## Exemplos

### Exemplo 1: Corrotina Basica

**Cenario:** Criar e executar uma corrotina simples

**Input:**
```python
# Preciso de uma funcao async que simula uma requisicao HTTP
```

**Output esperado:**
```python
import asyncio

async def fetch_data(url: str) -> str:
    """Simula uma requisicao HTTP assincrona."""
    print(f"Iniciando requisicao para {url}...")
    await asyncio.sleep(1)  # Simula latencia de rede
    return f"Dados de {url}"

async def main():
    result = await fetch_data("https://api.example.com")
    print(result)

# Ponto de entrada
asyncio.run(main())
```

**Explicacao:** `async def` define a corrotina, `await` pausa ate completar, 
`asyncio.run()` e o ponto de entrada padrao.

### Exemplo 2: Execucao Concorrente com gather

**Cenario:** Fazer multiplas requisicoes simultaneamente

**Input:**
```python
# Preciso buscar dados de 3 APIs diferentes ao mesmo tempo
```

**Output esperado:**
```python
import asyncio

async def fetch_api(api_id: int) -> dict:
    """Busca dados de uma API."""
    await asyncio.sleep(1)  # Simula latencia
    return {"api": api_id, "data": f"response_{api_id}"}

async def main():
    # Executar todas as requisicoes concorrentemente
    results = await asyncio.gather(
        fetch_api(1),
        fetch_api(2),
        fetch_api(3),
        return_exceptions=True  # Nao falha se uma der erro
    )
    
    for result in results:
        if isinstance(result, Exception):
            print(f"Erro: {result}")
        else:
            print(f"Sucesso: {result}")

asyncio.run(main())
```

**Explicacao:** `asyncio.gather()` executa todas as corrotinas concorrentemente.
O tempo total sera ~1s (nao 3s), pois rodam em paralelo.

### Exemplo 3: Tratamento de Erros em Tasks

**Cenario:** Criar tasks com tratamento de erros robusto

**Input:**
```python
# Preciso criar tasks que podem falhar sem derrubar o programa
```

**Output esperado:**
```python
import asyncio
from typing import List

async def risky_operation(task_id: int) -> str:
    """Operacao que pode falhar."""
    await asyncio.sleep(0.5)
    if task_id == 2:
        raise ValueError(f"Task {task_id} falhou!")
    return f"Task {task_id} completou"

async def safe_task_runner(tasks: List[asyncio.Task]) -> List[str]:
    """Executa tasks com tratamento de erros individual."""
    results = []
    
    for task in asyncio.as_completed(tasks):
        try:
            result = await task
            results.append(result)
        except Exception as e:
            results.append(f"ERRO: {e}")
    
    return results

async def main():
    # Criar tasks
    tasks = [
        asyncio.create_task(risky_operation(i))
        for i in range(1, 4)
    ]
    
    results = await safe_task_runner(tasks)
    print(results)

asyncio.run(main())
```

**Explicacao:** Cada task e tratada individualmente, erros nao propagam para outras tasks.

### Exemplo 4: Context Manager Async

**Cenario:** Usar aiohttp para requisicoes HTTP reais

**Input:**
```python
# Preciso fazer requisicoes HTTP reais com aiohttp
```

**Output esperado:**
```python
import asyncio
import aiohttp

async def fetch_url(session: aiohttp.ClientSession, url: str) -> str:
    """Busca conteudo de uma URL."""
    async with session.get(url) as response:
        response.raise_for_status()
        return await response.text()

async def main():
    urls = [
        "https://httpbin.org/get",
        "https://httpbin.org/ip",
    ]
    
    # Session deve ser criada uma vez e reutilizada
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        
        for url, content in zip(urls, results):
            print(f"{url}: {len(content)} bytes")

asyncio.run(main())
```

**Explicacao:** `async with` garante que a session sera fechada corretamente.
Sempre reutilize sessions para melhor performance.

---

## Anti-Padroes Comuns

### Bloqueando o Event Loop

```python
# ERRADO - bloqueia o event loop
async def bad_example():
    import time
    time.sleep(5)  # BLOQUEANTE!
    return "done"

# CORRETO - usa await
async def good_example():
    await asyncio.sleep(5)  # NAO BLOQUEANTE
    return "done"
```

### Esquecendo await

```python
# ERRADO - corrotina nunca executa
async def main():
    fetch_data()  # Falta await!

# CORRETO
async def main():
    await fetch_data()  # Executa corretamente
```

---

## Casos de Uso

- **APIs e servidores web:** FastAPI, aiohttp, Starlette
- **Web scraping:** Multiplas requisicoes simultaneas
- **Clientes de banco de dados:** asyncpg, motor (MongoDB)
- **WebSockets:** Comunicacao bidirecional em tempo real
- **Processamento de filas:** Consumir mensagens de RabbitMQ/Redis

---

## Referencias

1. [Documentacao oficial asyncio](https://docs.python.org/3/library/asyncio.html)
2. [Real Python - Async IO in Python](https://realpython.com/async-io-python/)
3. [PEP 492 - Coroutines with async and await](https://peps.python.org/pep-0492/)
4. [aiohttp Documentation](https://docs.aiohttp.org/)
5. [FastAPI - Async](https://fastapi.tiangolo.com/async/)

---

*Skill gerada pelo Itzamna PromptOS v1.0.0*
