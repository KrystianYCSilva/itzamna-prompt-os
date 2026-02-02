# Skill: Python Async Programming

## Domínio
programming

## Descrição
Programação assíncrona em Python permite executar operações de I/O de forma não-bloqueante, melhorando significativamente a performance de aplicações que fazem muitas requisições de rede ou operações de arquivo.

## Conceitos Principais
- Event Loop: Loop principal que gerencia e distribui tarefas assíncronas
- Corrotinas: Funções definidas com `async def` que podem ser pausadas e retomadas
- await: Palavra-chave para aguardar a conclusão de uma corrotina
- Tasks: Wrapper que permite execução concorrente de corrotinas
- asyncio: Biblioteca padrão do Python para programação assíncrona

## Melhores Práticas
1. Use `async def` para funções que fazem operações I/O
2. Sempre use `await` ao chamar corrotinas
3. Use `asyncio.create_task()` para execução concorrente
4. Evite operações bloqueantes dentro de código async
5. Use `asyncio.gather()` para aguardar múltiplas tarefas
6. Implemente tratamento de erros apropriado com try/except
7. Use context managers async quando disponíveis

## Casos de Uso
- APIs e servidores web (FastAPI, aiohttp)
- Web scraping com múltiplas requisições
- Processamento de múltiplos arquivos
- Clientes de banco de dados assíncronos
- Comunicação em tempo real (WebSockets)
- Processamento de streams de dados

## Exemplos

### Exemplo Básico
```python
import asyncio

async def fetch_data(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1)  # Simula requisição
    return f"Data from {url}"

async def main():
    # Executar sequencialmente
    result1 = await fetch_data("https://api1.com")
    result2 = await fetch_data("https://api2.com")
    print(result1, result2)

asyncio.run(main())
```

### Exemplo com Concorrência
```python
import asyncio

async def fetch_data(url):
    await asyncio.sleep(1)
    return f"Data from {url}"

async def main():
    # Executar concorrentemente
    tasks = [
        fetch_data("https://api1.com"),
        fetch_data("https://api2.com"),
        fetch_data("https://api3.com")
    ]
    results = await asyncio.gather(*tasks)
    print(results)

asyncio.run(main())
```

### Exemplo com aiohttp
```python
import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        html = await fetch_url(session, 'https://example.com')
        print(html[:100])

asyncio.run(main())
```

## Referências
- [Documentação oficial asyncio](https://docs.python.org/3/library/asyncio.html)
- [Real Python - Async IO](https://realpython.com/async-io-python/)
- [FastAPI - Async](https://fastapi.tiangolo.com/async/)
- [aiohttp Documentation](https://docs.aiohttp.org/)

---
*Skill de exemplo do Itzamna PromptOS*
*Categoria: Programming | Python*
