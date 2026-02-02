---
name: "graphql"
description: "Skill para GraphQL: schemas, queries, mutations, resolvers e boas praticas de design de API."
version: "1.0.0"
domain: "backend"
level: "L2"
tags:
  - "backend"
  - "api"
  - "graphql"
  - "schema"
triggers:
  - "graphql"
  - "criar schema graphql"
  - "query graphql"
  - "mutation graphql"
  - "resolver graphql"
dependencies: []
author: "promptos-brain"
created: "2025-01-06"
status: "approved"
sources:
  - url: "https://graphql.org/learn/"
    type: "official_docs"
  - url: "https://spec.graphql.org/"
    type: "specification"
---

# GraphQL

## Visao Geral

Esta skill cobre GraphQL, uma linguagem de query para APIs que permite aos clientes requisitar exatamente os dados que precisam. Diferente de REST, GraphQL usa um unico endpoint e o cliente define a estrutura da resposta.

Use esta skill quando precisar projetar schemas GraphQL, escrever queries e mutations, implementar resolvers, ou otimizar performance de APIs GraphQL.

O problema que esta skill resolve e over-fetching (receber dados demais) e under-fetching (precisar de multiplas requests) comuns em APIs REST.

**Contexto de Uso:**
- Projetar schemas para novas APIs
- Escrever queries e mutations eficientes
- Implementar resolvers em diferentes linguagens
- Otimizar performance com DataLoader e caching

---

## Instrucoes

### Ao receber uma tarefa relacionada a GraphQL:

1. **Analise** os requisitos de dados e relacoes
2. **Projete** o schema com types, queries e mutations
3. **Implemente** resolvers seguindo as Guidelines
4. **Valide** queries usando ferramentas como GraphiQL
5. **Otimize** com batching e caching quando necessario

---

## Guidelines (SEMPRE)

1. **Projete o schema primeiro (Schema-First Design)** - Defina types, queries e mutations antes de implementar. Isso serve como contrato entre frontend e backend.

2. **Use tipos especificos e descritivos** - `User`, `Product`, `Order` em vez de tipos genericos. Adicione descricoes com `"""` para documentacao.

3. **Implemente paginacao para listas** - Use Connections (Relay-style) ou offset/limit para listas que podem crescer.

4. **Use DataLoader para resolver N+1** - Agrupe requests ao banco de dados para evitar o problema N+1 queries.

5. **Retorne erros estruturados** - Use o campo `errors` padrao do GraphQL com codigos e mensagens claras.

6. **Versionamento via evolucao** - Adicione campos novos sem remover antigos. Use `@deprecated` para campos obsoletos.

---

## Constraints (NUNCA)

1. **NUNCA** exponha dados sensiveis sem autorizacao - Implemente autenticacao e autorizacao em resolvers.

2. **NUNCA** permita queries sem limite de profundidade - Limite a profundidade de queries aninhadas para prevenir DoS.

3. **NUNCA** retorne erros internos ao cliente - Capture excecoes e retorne mensagens user-friendly.

4. **NUNCA** use mutations para leitura de dados - Mutations sao para escrita; queries para leitura.

---

## Exemplos

### Exemplo 1: Schema Definition Language (SDL)

**Cenario:** Definir schema para uma aplicacao de e-commerce.

**Output esperado:**
```graphql
"""
Schema principal da aplicacao de e-commerce
"""
type Query {
  """Busca usuario por ID"""
  user(id: ID!): User
  
  """Lista produtos com paginacao"""
  products(first: Int = 10, after: String): ProductConnection!
  
  """Busca produto por ID"""
  product(id: ID!): Product
  
  """Busca pedidos do usuario autenticado"""
  myOrders: [Order!]!
}

type Mutation {
  """Cria um novo usuario"""
  createUser(input: CreateUserInput!): CreateUserPayload!
  
  """Adiciona item ao carrinho"""
  addToCart(productId: ID!, quantity: Int!): Cart!
  
  """Finaliza a compra"""
  checkout(input: CheckoutInput!): Order!
}

"""Representa um usuario do sistema"""
type User {
  id: ID!
  email: String!
  name: String!
  orders: [Order!]!
  createdAt: DateTime!
}

"""Representa um produto"""
type Product {
  id: ID!
  name: String!
  description: String
  price: Float!
  stock: Int!
  category: Category!
  reviews: [Review!]!
  averageRating: Float
}

"""Representa um pedido"""
type Order {
  id: ID!
  user: User!
  items: [OrderItem!]!
  total: Float!
  status: OrderStatus!
  createdAt: DateTime!
}

type OrderItem {
  product: Product!
  quantity: Int!
  unitPrice: Float!
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

"""Input para criacao de usuario"""
input CreateUserInput {
  email: String!
  name: String!
  password: String!
}

"""Payload de retorno da criacao de usuario"""
type CreateUserPayload {
  user: User
  errors: [Error!]
}

type Error {
  field: String
  message: String!
}

"""Conexao para paginacao (Relay-style)"""
type ProductConnection {
  edges: [ProductEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type ProductEdge {
  cursor: String!
  node: Product!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

scalar DateTime
```

**Explicacao:** Schema usa tipos especificos com descricoes. Paginacao usa Connections (Relay pattern). Mutations retornam payloads com erros estruturados. Enums para valores fixos.

---

### Exemplo 2: Queries e Fragments

**Cenario:** Escrever queries eficientes com fragments.

**Output esperado:**
```graphql
# Fragment reutilizavel para dados de produto
fragment ProductBasic on Product {
  id
  name
  price
  stock
}

fragment ProductDetails on Product {
  ...ProductBasic
  description
  category {
    id
    name
  }
  averageRating
}

# Query simples
query GetProduct($id: ID!) {
  product(id: $id) {
    ...ProductDetails
    reviews {
      id
      rating
      comment
      author {
        name
      }
    }
  }
}

# Query com paginacao
query ListProducts($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    edges {
      cursor
      node {
        ...ProductBasic
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}

# Query com multiplas raizes
query Dashboard {
  # Dados do usuario
  me: user(id: "current") {
    name
    email
  }
  
  # Produtos em destaque
  featured: products(first: 5) {
    edges {
      node {
        ...ProductBasic
      }
    }
  }
  
  # Pedidos recentes
  myOrders {
    id
    status
    total
  }
}
```

**Explicacao:** Fragments evitam repeticao e facilitam manutencao. Aliases (`me:`, `featured:`) permitem multiplas chamadas ao mesmo campo com argumentos diferentes.

---

### Exemplo 3: Resolvers (Node.js/Apollo)

**Cenario:** Implementar resolvers com DataLoader.

**Output esperado:**
```javascript
const { ApolloServer } = require('@apollo/server');
const DataLoader = require('dataloader');

// DataLoader para evitar N+1
const createLoaders = () => ({
  userLoader: new DataLoader(async (ids) => {
    const users = await db.users.findByIds(ids);
    // Retorna na mesma ordem dos IDs
    return ids.map(id => users.find(u => u.id === id));
  }),
  
  productLoader: new DataLoader(async (ids) => {
    const products = await db.products.findByIds(ids);
    return ids.map(id => products.find(p => p.id === id));
  }),
});

const resolvers = {
  Query: {
    user: async (_, { id }, { loaders }) => {
      return loaders.userLoader.load(id);
    },
    
    products: async (_, { first, after }) => {
      const { items, hasMore, total } = await db.products.paginate({
        limit: first,
        cursor: after,
      });
      
      return {
        edges: items.map(item => ({
          cursor: encodeCursor(item.id),
          node: item,
        })),
        pageInfo: {
          hasNextPage: hasMore,
          endCursor: items.length ? encodeCursor(items[items.length - 1].id) : null,
        },
        totalCount: total,
      };
    },
    
    product: async (_, { id }, { loaders }) => {
      return loaders.productLoader.load(id);
    },
  },
  
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const user = await db.users.create(input);
        return { user, errors: null };
      } catch (error) {
        return {
          user: null,
          errors: [{ field: 'email', message: 'Email already exists' }],
        };
      }
    },
  },
  
  // Resolvers de campo
  Order: {
    user: async (order, _, { loaders }) => {
      return loaders.userLoader.load(order.userId);
    },
    
    items: async (order) => {
      return db.orderItems.findByOrderId(order.id);
    },
  },
  
  Product: {
    category: async (product, _, { loaders }) => {
      return loaders.categoryLoader.load(product.categoryId);
    },
    
    averageRating: async (product) => {
      const reviews = await db.reviews.findByProductId(product.id);
      if (!reviews.length) return null;
      return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    },
  },
};

// Setup do servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Context com loaders (um por request)
const context = async ({ req }) => ({
  loaders: createLoaders(),
  user: await getUserFromToken(req.headers.authorization),
});
```

**Explicacao:** DataLoader agrupa requisicoes ao banco (resolve N+1). Context e criado por request com loaders frescos. Mutations retornam payloads estruturados. Resolvers de campo calculam dados derivados.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| Campo nullable retorna null | GraphQL permite nulls por padrao; use `!` para campos obrigatorios |
| Query muito profunda | Implemente limite de profundidade (ex: graphql-depth-limit) |
| Upload de arquivos | Use multipart request com graphql-upload ou pre-signed URLs |
| Subscriptions | Use WebSocket com graphql-ws para dados em tempo real |
| Versionamento | Nao versione a API; evolua o schema adicionando campos |

---

## Referencias

1. https://graphql.org/learn/ (official_docs)
2. https://spec.graphql.org/ (specification)
3. https://www.apollographql.com/docs/ (implementation)
4. https://relay.dev/docs/guides/graphql-server-specification/ (relay_spec)

---

## Notas de Implementacao

> Esta skill foca em design de schema e boas praticas. Para implementacoes especificas, considere as docs do Apollo (JS), Graphene (Python), ou gqlgen (Go).
> Para APIs REST tradicionais, veja as convencionais de design RESTful.
