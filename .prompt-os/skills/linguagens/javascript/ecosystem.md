---
name: skills-linguagens-javascript-ecosystem
description: "JavaScript Ecosystem - Runtimes, Modules, npm"
---

# JavaScript Ecosystem - Runtimes, Modules, npm

> **Load JIT quando:** Precisa entender execução JavaScript (browsers vs Node.js), módulos ou package management
> **Parent skill:** [javascript](../SKILL.md)

---

## Runtimes

JavaScript executa em diferentes **engines** (browsers) e **runtimes** (server-side).

### Browser Engines

Cada browser possui sua própria engine JavaScript:

**V8** (Google Chrome, Microsoft Edge, Node.js):
- Engine de alta performance escrita em C++
- Compila JavaScript para código de máquina nativo (JIT compilation)
- Usado em Chrome, Edge, Node.js, Deno

**SpiderMonkey** (Mozilla Firefox):
- Primeira engine JavaScript (1995)
- Escrita em C++
- JIT compilation com múltiplos tiers de otimização

**JavaScriptCore** (Safari):
- Engine da Apple (também chamada Nitro)
- Usada em Safari e todos os browsers iOS (WebKit)

**Chakra** (Internet Explorer / Edge Legacy):
- Engine Microsoft (descontinuada, Edge agora usa V8)

**Diferenças**: Todas implementam ECMAScript spec, mas podem ter diferenças em:
- Performance (V8 geralmente mais rápido)
- APIs específicas do browser (não padronizadas)
- Suporte a features novas (timing diferente)

---

### Node.js

**Node.js** é um runtime JavaScript server-side baseado em V8.

**Características:**
- **Event-driven, non-blocking I/O**: Ideal para I/O intensivo (APIs, streaming)
- **Acesso ao sistema**: Filesystem, rede, processos (não disponível em browsers)
- **Single-threaded**: Mesmo modelo de event loop dos browsers
- **Módulos nativos**: Escritos em C++ para performance crítica

```javascript
// Node.js - Filesystem (não funciona em browsers)
const fs = require('fs');

// Assíncrono (non-blocking)
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Síncrono (blocking, evitar)
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
```

**Use cases comuns:**
- APIs REST/GraphQL (Express, Fastify)
- Real-time applications (Socket.io)
- Build tools (Webpack, Vite, esbuild)
- CLI tools (npm, yarn, pnpm)

---

## Sistemas de Módulos

JavaScript possui dois sistemas principais de módulos: **CommonJS** (Node.js tradicional) e **ES Modules** (padrão moderno).

### CommonJS (CJS)

**CommonJS** é o sistema tradicional do Node.js (desde 2009).

```javascript
// math.js (exportando)
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };
// ou: exports.add = add; exports.subtract = subtract;
```

```javascript
// main.js (importando)
const math = require('./math');
console.log(math.add(5, 3));      // 8
console.log(math.subtract(5, 3)); // 2

// Destructuring
const { add } = require('./math');
console.log(add(5, 3));  // 8
```

**Características:**
- **Síncrono**: `require()` bloqueia até módulo carregar
- **Runtime**: Módulos resolvidos em runtime (não compile-time)
- **Default no Node.js**: Arquivos `.js` são CJS por padrão (a menos que `"type": "module"` em package.json)

---

### ES Modules (ESM)

**ES Modules** (ou ESM) é o padrão oficial do ECMAScript (ES6/ES2015).

```javascript
// math.js (exportando)
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// Default export (opcional)
export default function multiply(a, b) {
    return a * b;
}
```

```javascript
// main.js (importando)
import { add, subtract } from './math.js';  // named imports
import multiply from './math.js';           // default import

console.log(add(5, 3));       // 8
console.log(multiply(5, 3));  // 15

// Import tudo
import * as math from './math.js';
console.log(math.add(5, 3));  // 8
```

**Características:**
- **Assíncrono**: Imports resolvidos antes de execução (não bloqueiam event loop)
- **Static**: Estrutura de imports analisada em compile-time (permite tree-shaking)
- **Browsers**: Suporte nativo em browsers modernos (`<script type="module">`)
- **Node.js**: Requer `.mjs` extension ou `"type": "module"` em package.json

**Habilitando ESM no Node.js:**

```json
// package.json
{
  "type": "module"
}
```

ou usar extensão `.mjs`:
```bash
node script.mjs
```

---

### Comparação CJS vs ESM

| Feature | CommonJS (CJS) | ES Modules (ESM) |
|---------|----------------|------------------|
| **Sintaxe** | `require()`, `module.exports` | `import`, `export` |
| **Carregamento** | Síncrono | Assíncrono |
| **Análise** | Runtime (dinâmico) | Compile-time (estático) |
| **Tree-shaking** | ❌ Não suportado | ✅ Suportado |
| **Browsers** | ❌ Requer bundler | ✅ Nativo |
| **Node.js default** | ✅ Sim (`.js`) | ❌ Requer config |
| **Interop** | Pode importar ESM com `await import()` | Pode importar CJS |

**Recomendação**: Use **ESM** em novos projetos (padrão moderno, suporte universal).

---

## Package Manager - npm

**npm** (Node Package Manager) é o ecossistema de pacotes JavaScript com 2M+ pacotes.

### Comandos Básicos

```bash
# Inicializar projeto (cria package.json)
npm init
npm init -y  # aceita defaults

# Instalar dependência (produção)
npm install express
npm i express  # abreviação

# Instalar dev dependency (apenas desenvolvimento)
npm install --save-dev jest
npm i -D jest  # abreviação

# Instalar globalmente
npm install -g typescript

# Remover pacote
npm uninstall express

# Atualizar pacotes
npm update

# Auditar vulnerabilidades
npm audit
npm audit fix
```

### package.json

**package.json** define metadados e dependências do projeto.

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "My awesome app",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^2.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Campos importantes:**
- **dependencies**: Pacotes necessários em produção
- **devDependencies**: Pacotes apenas para desenvolvimento (testes, build)
- **scripts**: Comandos customizados executáveis com `npm run <script>`
- **engines**: Versão mínima do Node.js

### Versionamento Semântico

npm usa **Semantic Versioning** (semver): `MAJOR.MINOR.PATCH`

```json
"dependencies": {
  "express": "4.18.2",     // Versão exata
  "lodash": "^4.17.0",     // ^: permite minor/patch (>=4.17.0 <5.0.0)
  "axios": "~1.4.0"        // ~: permite apenas patch (>=1.4.0 <1.5.0)
}
```

**Símbolos:**
- `^` (caret): Atualiza minor e patch (default do `npm install`)
- `~` (tilde): Atualiza apenas patch
- Nenhum: Versão exata (lock)

### package-lock.json

**package-lock.json** trava versões exatas de todas as dependências (incluindo transitivas).

**Por que existe:**
- `package.json` usa ranges (`^4.18.0`)
- `package-lock.json` trava versão exata (`4.18.2`)
- Garante builds reproduzíveis (mesmas versões em dev/CI/produção)

**Commit package-lock.json ao git!**

---

### Alternativas ao npm

**Yarn** (Facebook):
- Mais rápido que npm (paralelo)
- Workspace support (monorepos)
- `yarn install`, `yarn add express`

**pnpm** (performant npm):
- Ainda mais rápido (symlinks, deduplica pacotes)
- Economiza espaço em disco (compartilha pacotes entre projetos)
- `pnpm install`, `pnpm add express`

---

## Frameworks Populares

### Frontend

**React** (Meta/Facebook):
- Biblioteca (não framework completo)
- Component-based, virtual DOM
- Unidirectional data flow
- Ecossistema: Next.js (SSR), React Native (mobile)

```javascript
// React Component
function Counter() {
    const [count, setCount] = useState(0);
    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

**Vue** (Evan You):
- Framework progressivo (adoção incremental)
- Template syntax (HTML-like)
- Reatividade automática
- Ecossistema: Nuxt.js (SSR), Vuetify (UI)

```vue
<!-- Vue Component -->
<template>
  <button @click="count++">Count: {{ count }}</button>
</template>

<script>
export default {
  data() {
    return { count: 0 };
  }
};
</script>
```

**Angular** (Google):
- Framework completo (opinionated)
- TypeScript first
- Dependency injection, RxJS
- Enterprise-focused

---

### Backend (Node.js)

**Express** (minimalista):
- Micro-framework flexível
- Middleware-based
- Mais popular (14M+ downloads/semana npm)

```javascript
// Express Server
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
    res.json({ users: [] });
});

app.listen(3000);
```

**Fastify** (performance):
- ~2x mais rápido que Express
- Schema-based validation (JSON Schema)
- TypeScript support

**Nest.js** (enterprise):
- Framework completo (como Angular)
- TypeScript, decorators
- Dependency injection, modular

---

## Build Tools

**Bundlers** (empacotam módulos para browsers):
- **Webpack**: Mais configurável, lento (legacy)
- **Vite**: Rápido (ESM nativo no dev), moderno
- **esbuild**: Extremamente rápido (escrito em Go)
- **Rollup**: Focado em bibliotecas (tree-shaking)

**Transpilers** (transformam código moderno para compatível):
- **Babel**: Transforma ES6+ para ES5
- **TypeScript Compiler**: TypeScript → JavaScript

---

## Referências

**Runtimes:**
- [Node.js Documentation](https://nodejs.org/docs/)
- [V8 JavaScript Engine](https://v8.dev/)
- [MDN - JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

**npm:**
- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [package.json Reference](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

**Frameworks:**
- [React](https://react.dev/)
- [Vue](https://vuejs.org/)
- [Express](https://expressjs.com/)
- [Fastify](https://fastify.dev/)
