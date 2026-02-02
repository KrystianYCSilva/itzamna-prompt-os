---
name: "api-rest"
description: "Skill para design de APIs REST: endpoints, HTTP methods, status codes, versionamento e boas praticas."
version: "1.0.0"
domain: "backend"
level: "L2"
tags:
  - "backend"
  - "api"
  - "rest"
  - "http"
triggers:
  - "api rest"
  - "rest api"
  - "endpoint"
  - "http api"
  - "criar api"
dependencies: []
author: "promptos-brain"
created: "2025-01-06"
status: "approved"
sources:
  - url: "https://restfulapi.net/"
    type: "best_practices"
  - url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
    type: "official_docs"
---

# API REST

## Visao Geral

Esta skill fornece diretrizes para design e implementacao de APIs RESTful. Cobre nomenclatura de recursos, uso correto de metodos HTTP, codigos de status, paginacao, versionamento e tratamento de erros.

Use esta skill quando precisar projetar endpoints de API, escolher metodos HTTP corretos, definir formato de respostas, ou implementar padroes de paginacao e filtragem.

O problema que esta skill resolve e a inconsistencia no design de APIs, uso incorreto de metodos HTTP, e falta de padroes que dificultam integracao por consumidores.

**Contexto de Uso:**
- Projetar nova API para aplicacao
- Refatorar API existente para seguir padroes REST
- Documentar API para consumidores externos
- Implementar paginacao, filtragem e ordenacao

---

## Instrucoes

### Ao receber uma tarefa relacionada a API REST:

1. **Identifique** os recursos (substantivos) do dominio
2. **Defina** endpoints usando nomenclatura consistente
3. **Escolha** metodos HTTP apropriados para cada operacao
4. **Determine** codigos de status para sucesso e erro
5. **Documente** com OpenAPI/Swagger

---

## Guidelines (SEMPRE)

1. **Use substantivos no plural para recursos** - `/users`, `/products`, `/orders`. Recursos sao coisas, nao acoes.

2. **Use metodos HTTP corretamente** - GET (ler), POST (criar), PUT (substituir), PATCH (atualizar parcial), DELETE (remover).

3. **Retorne codigos de status apropriados** - 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 404 (Not Found), 500 (Server Error).

4. **Use hierarquia para relacoes** - `/users/{id}/orders` para pedidos de um usuario especifico.

5. **Implemente paginacao para listas** - Use query params: `?page=1&limit=20` ou `?cursor=abc123`.

6. **Versione a API** - Use prefixo na URL: `/v1/users` ou header `Accept-Version: v1`.

---

## Constraints (NUNCA)

1. **NUNCA** use verbos em endpoints - `/getUsers` ou `/createUser` esta errado. Use `/users` com GET ou POST.

2. **NUNCA** retorne 200 para erros - Use codigos 4xx para erros do cliente, 5xx para erros do servidor.

3. **NUNCA** exponha IDs internos sequenciais publicamente - Prefira UUIDs ou hashids para seguranca.

4. **NUNCA** retorne arrays na raiz da resposta - Envolva em objeto: `{ "data": [...], "meta": {...} }`.

---

## Exemplos

### Exemplo 1: Design de Endpoints CRUD

**Cenario:** Projetar API para gerenciamento de usuarios.

**Endpoints:**
```
# Listar usuarios (com paginacao)
GET /v1/users?page=1&limit=20&sort=-createdAt

# Buscar usuario especifico
GET /v1/users/{id}

# Criar usuario
POST /v1/users
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}

# Atualizar usuario (parcial)
PATCH /v1/users/{id}
Content-Type: application/json
{
  "name": "John Updated"
}

# Substituir usuario (completo)
PUT /v1/users/{id}
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}

# Remover usuario
DELETE /v1/users/{id}

# Recursos aninhados
GET /v1/users/{id}/orders
POST /v1/users/{id}/orders
```

**Explicacao:** Usamos substantivos no plural, metodos HTTP semanticos, e hierarquia para relacoes. O prefixo `/v1` permite evolucao futura da API.

---

### Exemplo 2: Formato de Respostas

**Cenario:** Padronizar formato de respostas para sucesso e erro.

**Resposta de Sucesso (lista):**
```json
{
  "data": [
    {
      "id": "usr_abc123",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "usr_def456",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "createdAt": "2024-01-16T14:20:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "links": {
    "self": "/v1/users?page=1&limit=20",
    "next": "/v1/users?page=2&limit=20",
    "last": "/v1/users?page=8&limit=20"
  }
}
```

**Resposta de Sucesso (item unico):**
```json
{
  "data": {
    "id": "usr_abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T09:15:00Z"
  }
}
```

**Resposta de Erro:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request body contains invalid data",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address",
        "value": "invalid-email"
      },
      {
        "field": "name",
        "message": "Must be at least 2 characters",
        "value": "J"
      }
    ]
  },
  "meta": {
    "requestId": "req_xyz789",
    "timestamp": "2024-01-20T10:30:00Z"
  }
}
```

**Explicacao:** Respostas sempre tem estrutura previsivel. `data` contem o payload, `meta` contem metadados, `links` permite navegacao (HATEOAS). Erros incluem `code` para tratamento programatico.

---

### Exemplo 3: Codigos de Status HTTP

**Cenario:** Escolher codigos corretos para cada situacao.

**Tabela de Referencia:**
```
# Sucesso (2xx)
200 OK              - GET, PATCH, DELETE com corpo
201 Created         - POST que cria recurso (incluir Location header)
204 No Content      - DELETE, PATCH sem corpo de resposta

# Redirecionamento (3xx)
301 Moved Permanently - Recurso moveu permanentemente
304 Not Modified      - Cache valido (com ETag)

# Erro do Cliente (4xx)
400 Bad Request     - Corpo invalido, parametros incorretos
401 Unauthorized    - Nao autenticado (falta token)
403 Forbidden       - Autenticado mas sem permissao
404 Not Found       - Recurso nao existe
405 Method Not Allowed - Metodo HTTP nao suportado
409 Conflict        - Conflito de estado (ex: email duplicado)
422 Unprocessable Entity - Validacao de negocio falhou
429 Too Many Requests - Rate limit excedido

# Erro do Servidor (5xx)
500 Internal Server Error - Erro inesperado
502 Bad Gateway     - Servico upstream falhou
503 Service Unavailable - Servico temporariamente indisponivel
504 Gateway Timeout - Timeout de servico upstream
```

**Implementacao:**
```javascript
// Express.js example
app.post('/v1/users', async (req, res) => {
  try {
    const validation = validateUserInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: validation.errors
        }
      });
    }

    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({
        error: {
          code: 'DUPLICATE_EMAIL',
          message: 'A user with this email already exists'
        }
      });
    }

    const user = await createUser(req.body);
    
    return res.status(201)
      .header('Location', `/v1/users/${user.id}`)
      .json({ data: user });

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});
```

**Explicacao:** 400 para input invalido, 409 para conflito de estado, 201 com Location header para criacao bem-sucedida, 500 para erros internos.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| Acao que nao e CRUD | Use sub-recurso: POST `/users/{id}/activate` ou `/users/{id}/actions` com body |
| Bulk operations | POST `/users/batch` com array no body; retorne 207 Multi-Status se parcial |
| Busca complexa | GET com query params ou POST `/users/search` com body (quando URL muito longa) |
| Long-running operation | Retorne 202 Accepted com Location para polling de status |
| Soft delete | DELETE retorna 200/204; recurso pode ter flag `deletedAt` |

---

## Referencias

1. https://restfulapi.net/ (best_practices)
2. https://developer.mozilla.org/en-US/docs/Web/HTTP/Status (official_docs)
3. https://swagger.io/specification/ (openapi_spec)
4. https://jsonapi.org/ (json_api_spec)

---

## Notas de Implementacao

> Esta skill cobre design de API REST generica.
> Para GraphQL, veja a skill dedicada.
> Para documentacao com OpenAPI/Swagger, considere ferramentas como Stoplight ou Redoc.
