---
name: "typescript"
description: "Skill para TypeScript: tipos, interfaces, generics, configuracao e boas praticas de tipagem."
version: "1.0.0"
domain: "backend"
level: "L2"
tags:
  - "backend"
  - "frontend"
  - "typescript"
  - "types"
triggers:
  - "typescript"
  - "tipagem"
  - "tipos typescript"
  - "interface typescript"
  - "generic typescript"
dependencies: []
author: "promptos-brain"
created: "2025-01-06"
status: "approved"
sources:
  - url: "https://www.typescriptlang.org/docs/"
    type: "official_docs"
  - url: "https://www.totaltypescript.com/"
    type: "tutorial"
---

# TypeScript

## Visao Geral

Esta skill fornece diretrizes para escrever codigo TypeScript idiomatico e seguro. Cobre desde tipos basicos ate patterns avancados como generics, utility types e inferencia de tipos.

Use esta skill quando precisar tipar aplicacoes JavaScript, criar interfaces de API, definir tipos para bibliotecas, ou resolver erros de tipagem complexos.

O problema que esta skill resolve e a falta de seguranca de tipos em JavaScript, erros em runtime que poderiam ser capturados em compile time, e documentacao implicita de APIs.

**Contexto de Uso:**
- Migrar projeto JavaScript para TypeScript
- Definir tipos para APIs REST ou GraphQL
- Criar bibliotecas com tipos exportados
- Resolver erros de tipagem complexos

---

## Instrucoes

### Ao receber uma tarefa relacionada a TypeScript:

1. **Analise** o codigo existente e infira tipos quando possivel
2. **Prefira** interfaces para objetos, types para unions/intersections
3. **Evite** `any` - use `unknown` quando tipo e realmente desconhecido
4. **Configure** tsconfig.json com strict mode habilitado
5. **Documente** tipos complexos com JSDoc comments

---

## Guidelines (SEMPRE)

1. **Habilite strict mode no tsconfig.json** - `"strict": true` ativa todas as verificacoes de seguranca: strictNullChecks, noImplicitAny, etc.

2. **Prefira inferencia quando obvio** - Nao anote tipos que o TypeScript infere corretamente: `const name = "John"` ja e `string`.

3. **Use interfaces para objetos, types para composicao** - Interfaces sao extensiveis (declaration merging), types sao melhores para unions e intersections.

4. **Prefira unknown sobre any** - `unknown` requer type guard antes de uso, mantendo type safety.

5. **Use const assertions para literais** - `as const` preserva tipos literais em vez de ampliar para string/number.

6. **Exporte tipos junto com implementacao** - Consumidores da sua API precisam dos tipos para usar corretamente.

---

## Constraints (NUNCA)

1. **NUNCA** use `any` sem justificativa documentada - Desabilita type checking e propaga inseguranca pelo codigo.

2. **NUNCA** use `!` (non-null assertion) sem garantia real - Prefira optional chaining (`?.`) ou type guards.

3. **NUNCA** ignore erros com `@ts-ignore` sem comentario explicativo - Use `@ts-expect-error` quando o erro e esperado.

4. **NUNCA** exporte `any` em APIs publicas - Tipos publicos devem ser precisos para consumidores.

---

## Exemplos

### Exemplo 1: Tipos Basicos e Interfaces

**Cenario:** Definir tipos para entidades de dominio.

**Input:**
```typescript
// Dados de usuario vindos de API
const userData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  createdAt: "2024-01-15T10:30:00Z"
};
```

**Output esperado:**
```typescript
// Tipos base reutilizaveis
type UserId = number;
type ISODateString = string;

// Enum para valores fixos
enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest"
}

// Interface para entidade
interface User {
  readonly id: UserId;
  name: string;
  email: string;
  role: UserRole;
  createdAt: ISODateString;
  updatedAt?: ISODateString; // Opcional
}

// Tipos derivados
type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
type UpdateUserInput = Partial<Pick<User, "name" | "email" | "role">>;

// Uso com type safety
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: UserRole.ADMIN,
  createdAt: "2024-01-15T10:30:00Z"
};
```

**Explicacao:** Usamos type aliases para tipos semanticos (UserId), enum para valores fixos, interface para a entidade principal, e utility types (Omit, Partial, Pick) para derivar tipos relacionados.

---

### Exemplo 2: Generics e Type Guards

**Cenario:** Criar funcao generica com type safety.

**Input:**
```typescript
// Funcao que busca dados de API e precisa ser type-safe
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
```

**Output esperado:**
```typescript
// Tipo para resposta de API
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Type guard para verificar sucesso
function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true && response.data !== undefined;
}

// Funcao generica tipada
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return {
        data: null as unknown as T,
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }
    
    const data: T = await response.json();
    return { data, success: true };
  } catch (error) {
    return {
      data: null as unknown as T,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Uso com inferencia automatica
interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User | null> {
  const response = await fetchData<User>(`/api/users/${id}`);
  
  if (isSuccessResponse(response)) {
    // TypeScript sabe que response.data e User aqui
    return response.data;
  }
  
  console.error(response.error);
  return null;
}
```

**Explicacao:** Generic `<T>` permite reutilizar a funcao com diferentes tipos. Type guard `isSuccessResponse` estreita o tipo e garante acesso seguro a `data`.

---

### Exemplo 3: Configuracao tsconfig.json

**Cenario:** Configurar projeto TypeScript para producao.

**tsconfig.json:**
```json
{
  "compilerOptions": {
    // Strict Mode (SEMPRE habilitar)
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    
    // Modulos
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    
    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    // Paths
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/types/*": ["./src/types/*"]
    },
    
    // Misc
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

**Explicacao:** Strict mode habilitado com opcoes adicionais de seguranca. `noUncheckedIndexedAccess` e especialmente util para evitar undefined em acessos de array/objeto.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| Biblioteca sem tipos | Instale @types/package ou crie declarations.d.ts local |
| Objeto com chaves dinamicas | Use `Record<string, ValueType>` ou index signature |
| Funcao que retorna tipos diferentes | Use discriminated unions com propriedade discriminante |
| Tipo muito complexo | Quebre em tipos menores, use type aliases para clareza |
| Migrando de JS | Comece com `allowJs: true` e `checkJs: true`, migre gradualmente |

---

## Referencias

1. https://www.typescriptlang.org/docs/ (official_docs)
2. https://www.totaltypescript.com/ (tutorial)
3. https://github.com/type-challenges/type-challenges (practice)
4. https://ts-error-translator.vercel.app/ (error_helper)

---

## Notas de Implementacao

> Esta skill cobre TypeScript para backend e frontend.
> Para React com TypeScript, considere patterns especificos de componentes e hooks.
> Para Node.js com TypeScript, veja configuracao de paths e module resolution.
