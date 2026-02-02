---
name: "yaml-configuration-best-practices"
description: "Skill para escrever arquivos YAML bem estruturados, legiveis e seguros para configuracoes de aplicacoes, CI/CD, e infraestrutura."
version: "1.0.0"
domain: "config"
level: "L2"
tags:
  - "config"
  - "yaml"
  - "devops"
  - "infrastructure"
triggers:
  - "yaml configuration best practices"
  - "escrever arquivo yaml"
  - "configuracao yaml"
  - "docker-compose yaml"
  - "kubernetes manifest"
dependencies: []
author: "promptos-brain"
created: "2026-02-02"
status: "approved"
sources:
  - url: "https://yaml.org/spec/1.2.2/"
    type: "official_docs"
  - url: "https://learnxinyminutes.com/docs/yaml/"
    type: "tutorial"
---

# YAML Configuration Best Practices

## Visao Geral

YAML (YAML Ain't Markup Language) e um formato de serializacao de dados legivel por humanos, amplamente usado para arquivos de configuracao. Esta skill fornece diretrizes para escrever YAML limpo, seguro e mantenivel.

Use esta skill ao criar ou revisar arquivos de configuracao como `docker-compose.yml`, manifestos Kubernetes, configuracoes de CI/CD (GitHub Actions, GitLab CI), ou qualquer arquivo `.yaml`/`.yml` do projeto.

O problema que esta skill resolve e a criacao de arquivos YAML inconsistentes, dificeis de ler, ou com erros sutis de indentacao que causam falhas em runtime.

**Contexto de Uso:**
- Criar arquivos docker-compose.yml
- Escrever manifestos Kubernetes (Deployment, Service, ConfigMap)
- Configurar pipelines CI/CD (GitHub Actions, GitLab CI)
- Definir configuracoes de aplicacao (config.yaml, settings.yml)

---

## Instrucoes

### Ao receber uma tarefa relacionada a YAML:

1. **Analise** o tipo de YAML necessario (Docker, K8s, CI/CD, app config)
2. **Verifique** se existe um schema ou especificacao para validar
3. **Aplique** os padroes documentados nas Guidelines abaixo
4. **Valide** usando ferramentas como `yamllint` ou validadores online
5. **Documente** variaveis de ambiente e valores sensiveis

---

## Guidelines (SEMPRE)

1. **Use indentacao consistente de 2 espacos** - Nunca use tabs. Configure seu editor para converter tabs em espacos automaticamente.

2. **Prefira aspas para strings com caracteres especiais** - Use aspas duplas para strings que contem `:`, `#`, `@`, ou caracteres especiais. Strings simples podem ficar sem aspas.

3. **Use anchors (&) e aliases (*) para evitar repeticao** - Quando o mesmo bloco aparece multiplas vezes, defina um anchor e reutilize com alias.

4. **Organize em secoes logicas com comentarios** - Agrupe configuracoes relacionadas e adicione comentarios explicativos para valores nao obvios.

5. **Use multi-line strings com | ou >** - Para textos longos, use `|` (preserva quebras) ou `>` (junta em uma linha).

6. **Mantenha valores sensiveis fora do YAML** - Use referencias a variaveis de ambiente (`${VAR}`) ou arquivos externos para secrets.

---

## Constraints (NUNCA)

1. **NUNCA** use tabs para indentacao - YAML so aceita espacos. Tabs causam erros de parsing.

2. **NUNCA** deixe espacos em branco no final das linhas - Trailing whitespace pode causar comportamento inesperado.

3. **NUNCA** commite secrets ou senhas diretamente no YAML - Use variaveis de ambiente, secrets managers, ou arquivos `.env` ignorados pelo git.

4. **NUNCA** misture estilos de lista (hifen vs colchetes) no mesmo arquivo - Escolha um estilo e seja consistente.

5. **NUNCA** omita aspas em valores que parecem numeros mas sao strings - `version: "3.8"` nao `version: 3.8` (que seria float).

---

## Exemplos

### Exemplo 1: Docker Compose Bem Estruturado

**Cenario:** Criar docker-compose.yml para aplicacao com banco de dados.

**Input:**
```yaml
# Requisicao: preciso de um compose com app Node e PostgreSQL
```

**Output esperado:**
```yaml
# docker-compose.yml
# Aplicacao Node.js com PostgreSQL
version: "3.8"

services:
  # Aplicacao principal
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules
    restart: unless-stopped

  # Banco de dados
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Explicacao:** Version como string entre aspas, comentarios descritivos, indentacao de 2 espacos, volumes nomeados, e organizacao logica.

---

### Exemplo 2: Usando Anchors para Reutilizacao

**Cenario:** Configuracao de ambiente com valores repetidos.

**Input:**
```yaml
# Preciso definir limites de recursos para varios servicos
```

**Output esperado:**
```yaml
# Definicao de anchors para reutilizacao
x-resources: &default-resources
  limits:
    memory: 512M
    cpus: "0.5"
  reservations:
    memory: 256M
    cpus: "0.25"

x-logging: &default-logging
  driver: json-file
  options:
    max-size: "10m"
    max-file: "3"

services:
  api:
    image: myapp/api:latest
    deploy:
      resources:
        <<: *default-resources
    logging:
      <<: *default-logging

  worker:
    image: myapp/worker:latest
    deploy:
      resources:
        <<: *default-resources
        limits:
          memory: 1G  # Override apenas memoria
    logging:
      <<: *default-logging
```

**Explicacao:** Anchors (`&default-resources`) definem blocos reutilizaveis. Aliases (`*default-resources`) referenciam. `<<:` faz merge permitindo overrides.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| String comeca com `@` ou `*` | Usar aspas: `"@usuario"` |
| Valor booleano como string | Usar aspas: `"true"`, `"yes"`, `"on"` |
| Numero de versao como 3.8 | Usar aspas: `version: "3.8"` |
| Texto com quebras de linha | Usar `\|` para preservar ou `>` para folded |
| Valor null explicito | Usar `~` ou `null` |
| Lista vazia | Usar `[]` ou omitir a chave |

---

## Referencias

1. https://yaml.org/spec/1.2.2/ (official_docs)
2. https://learnxinyminutes.com/docs/yaml/ (tutorial)
3. https://yamllint.readthedocs.io/ (linter)
4. https://www.yamllint.com/ (online_validator)

---

## Arquivos de Exemplo

- [examples/docker-compose.example.yml](examples/docker-compose.example.yml)
- [examples/github-actions.example.yml](examples/github-actions.example.yml)
- [examples/kubernetes-deployment.example.yml](examples/kubernetes-deployment.example.yml)

---

## Notas de Implementacao

> Skill preenchida manualmente com boas praticas de YAML.
> Status alterado de "draft" para "approved".
