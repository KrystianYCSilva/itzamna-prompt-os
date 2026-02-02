---
name: "docker"
description: "Skill para containerizacao com Docker: Dockerfiles, multi-stage builds, docker-compose e boas praticas de imagens."
version: "1.0.0"
domain: "devops"
level: "L2"
tags:
  - "devops"
  - "docker"
  - "containers"
  - "infrastructure"
triggers:
  - "docker"
  - "dockerfile"
  - "container"
  - "docker-compose"
  - "imagem docker"
dependencies: []
author: "promptos-brain"
created: "2025-01-06"
status: "approved"
sources:
  - url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/"
    type: "official_docs"
  - url: "https://docs.docker.com/compose/"
    type: "official_docs"
---

# Docker

## Visao Geral

Esta skill fornece diretrizes para containerizacao de aplicacoes usando Docker. Cobre desde a criacao de Dockerfiles eficientes ate orquestracao com docker-compose para ambientes de desenvolvimento e producao.

Use esta skill quando precisar criar imagens Docker, configurar ambientes multi-container, otimizar builds com multi-stage, ou debugar problemas de containerizacao.

O problema que esta skill resolve e a inconsistencia entre ambientes de desenvolvimento e producao, alem de builds de imagens lentos e inseguros.

**Contexto de Uso:**
- Containerizar aplicacoes Node.js, Python, Java, Go
- Configurar ambientes de desenvolvimento local com docker-compose
- Otimizar imagens para producao (tamanho e seguranca)
- CI/CD pipelines com Docker

---

## Instrucoes

### Ao receber uma tarefa relacionada a Docker:

1. **Identifique** o tipo de aplicacao e runtime necessario
2. **Escolha** a imagem base apropriada (alpine quando possivel)
3. **Aplique** multi-stage build para separar build e runtime
4. **Configure** .dockerignore para excluir arquivos desnecessarios
5. **Valide** a imagem com docker scan ou trivy

---

## Guidelines (SEMPRE)

1. **Use multi-stage builds para reducao de tamanho** - Separe o estagio de build (com ferramentas de compilacao) do estagio de runtime (apenas binarios/artefatos necessarios).

2. **Prefira imagens alpine ou distroless** - Imagens menores reduzem superficie de ataque e tempo de pull. Use `node:20-alpine` em vez de `node:20`.

3. **Ordene instrucoes para maximizar cache** - Coloque instrucoes que mudam menos frequentemente primeiro (COPY package*.json antes de COPY . .).

4. **Use usuario nao-root** - Crie e use um usuario sem privilegios com `USER` instruction para seguranca.

5. **Defina health checks** - Use `HEALTHCHECK` para permitir que orquestradores monitorem a saude do container.

6. **Especifique versoes exatas de imagens base** - Use `node:20.11.0-alpine` em vez de `node:latest` para builds reproduziveis.

---

## Constraints (NUNCA)

1. **NUNCA** use `latest` tag em producao - Tags mutaveis quebram reproducibilidade e podem introduzir breaking changes.

2. **NUNCA** rode containers como root em producao - Compromete a seguranca do host em caso de vulnerabilidade.

3. **NUNCA** copie secrets para a imagem - Use environment variables, Docker secrets, ou volumes em runtime.

4. **NUNCA** ignore o .dockerignore - Copiar node_modules, .git, ou arquivos de teste aumenta tamanho e tempo de build.

---

## Exemplos

### Exemplo 1: Node.js Multi-stage Build

**Cenario:** Criar imagem otimizada para aplicacao Node.js/Express.

**Dockerfile:**
```dockerfile
# Estagio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar apenas arquivos de dependencias primeiro (melhor cache)
COPY package*.json ./
RUN npm ci --only=production

# Copiar codigo fonte
COPY . .

# Build se necessario (TypeScript, etc)
RUN npm run build

# Estagio 2: Runtime
FROM node:20-alpine AS runtime

# Seguranca: usuario nao-root
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

# Copiar apenas artefatos necessarios do builder
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]
```

**Explicacao:** Multi-stage reduz tamanho final (sem devDependencies ou ferramentas de build). Usuario nao-root e healthcheck aumentam seguranca e observabilidade.

---

### Exemplo 2: Docker Compose para Desenvolvimento

**Cenario:** Ambiente de desenvolvimento com app, banco de dados e cache.

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules  # Exclude node_modules from bind mount
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Explicacao:** Healthcheck no DB garante que app so inicia quando banco esta pronto. Volumes nomeados persistem dados entre restarts. Bind mount com exclusao de node_modules evita conflitos.

---

### Exemplo 3: .dockerignore

**Cenario:** Evitar copiar arquivos desnecessarios.

**.dockerignore:**
```
# Dependencias
node_modules
.npm

# Build e cache
dist
.cache
*.log

# Git
.git
.gitignore

# IDE
.idea
.vscode
*.swp

# Testes
coverage
*.test.js
*.spec.js
__tests__

# Docker
Dockerfile*
docker-compose*
.dockerignore

# Documentacao
README.md
docs

# Ambiente local
.env
.env.*
*.local
```

**Explicacao:** Reduz contexto de build (mais rapido), tamanho da imagem, e evita vazar secrets ou arquivos sensiveis.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| Aplicacao precisa de binarios nativos | Use multi-stage com builder que compila, copie apenas binarios para runtime |
| Secrets necessarios no build | Use BuildKit secrets: `RUN --mount=type=secret,id=npmrc` |
| Imagem muito grande | Analise com `docker history` e `dive`; remova cache e arquivos temporarios |
| Build lento | Otimize ordem de layers, use BuildKit cache mounts |
| Container morre silenciosamente | Adicione HEALTHCHECK e verifique logs com `docker logs` |

---

## Referencias

1. https://docs.docker.com/develop/develop-images/dockerfile_best-practices/ (official_docs)
2. https://docs.docker.com/compose/ (official_docs)
3. https://github.com/wagoodman/dive (image_analyzer)
4. https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/ (tutorial)

---

## Notas de Implementacao

> Esta skill cobre Docker para desenvolvimento e producao.
> Para Kubernetes, uma skill dedicada deve ser criada.
> Para CI/CD com Docker, veja integracao com GitHub Actions ou GitLab CI.
