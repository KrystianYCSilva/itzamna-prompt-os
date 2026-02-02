---
name: "java-properties"
description: "Skill para arquivos .properties do Java: sintaxe, encoding, boas praticas de configuracao e internacionalizacao."
version: "1.0.0"
domain: "config"
level: "L1"
tags:
  - "config"
  - "java"
  - "properties"
  - "i18n"
triggers:
  - "java properties"
  - "arquivo .properties"
  - "configuracao java"
  - "application.properties"
  - "messages.properties"
dependencies: []
author: "promptos-brain"
created: "2025-01-06"
status: "approved"
sources:
  - url: "https://docs.oracle.com/javase/tutorial/essential/environment/properties.html"
    type: "official_docs"
  - url: "https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html"
    type: "framework_docs"
---

# Java Properties

## Visao Geral

Esta skill cobre o formato de arquivos `.properties` usado em aplicacoes Java para configuracao e internacionalizacao (i18n). E um formato simples de chave-valor que e padrao no ecossistema Java, usado extensivamente pelo Spring Boot, Maven, e outras ferramentas.

Use esta skill quando precisar criar ou modificar arquivos de configuracao Java, definir mensagens para diferentes idiomas, ou configurar aplicacoes Spring Boot.

O problema que esta skill resolve e a falta de padronizacao na organizacao de propriedades e erros comuns de encoding que quebram caracteres especiais.

**Contexto de Uso:**
- Configurar aplicacoes Spring Boot (application.properties)
- Criar arquivos de mensagens para i18n
- Definir configuracoes de build (Maven, Gradle)
- Externalizar configuracoes de aplicacoes Java

---

## Instrucoes

### Ao receber uma tarefa relacionada a Java Properties:

1. **Identifique** o tipo de arquivo (config, i18n, build)
2. **Organize** as propriedades em grupos logicos
3. **Aplique** encoding correto (UTF-8 ou escape sequences)
4. **Documente** propriedades nao obvias com comentarios
5. **Valide** que as chaves seguem convencao de nomenclatura

---

## Guidelines (SEMPRE)

1. **Use notacao hierarquica com pontos** - Agrupe propriedades relacionadas: `app.database.host`, `app.database.port`. Isso facilita organizacao e uso com frameworks.

2. **Mantenha encoding UTF-8 com escapes quando necessario** - Para caracteres especiais, use `\uXXXX` (ex: `\u00E9` para e). Modernos frameworks suportam UTF-8 direto.

3. **Documente com comentarios** - Use `#` ou `!` para comentarios. Documente valores nao obvios, opcoes disponiveis, e unidades.

4. **Separe configuracoes por ambiente** - Use arquivos separados: `application-dev.properties`, `application-prod.properties`.

5. **Use placeholders para valores dinamicos** - `${VARIABLE}` para variaveis de ambiente, `${other.property}` para referencias internas.

6. **Agrupe propriedades relacionadas** - Mantenha propriedades do mesmo modulo/feature juntas, separadas por linhas em branco.

---

## Constraints (NUNCA)

1. **NUNCA** commite senhas ou secrets em arquivos properties - Use variaveis de ambiente ou secret managers.

2. **NUNCA** use espacos ao redor do `=`** - `chave=valor` e correto; `chave = valor` pode causar problemas em alguns parsers.

3. **NUNCA** use caracteres especiais em chaves - Chaves devem conter apenas letras, numeros, pontos, hifens e underscores.

4. **NUNCA** duplique chaves no mesmo arquivo - A ultima ocorrencia sobrescreve silenciosamente.

---

## Exemplos

### Exemplo 1: Application Properties (Spring Boot)

**Cenario:** Configurar aplicacao Spring Boot com banco de dados e servidor.

**Output esperado:**
```properties
# ====================================
# Configuracoes do Servidor
# ====================================
server.port=8080
server.servlet.context-path=/api

# ====================================
# Configuracoes do Banco de Dados
# ====================================
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/myapp
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# Pool de conexoes
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=300000

# ====================================
# JPA / Hibernate
# ====================================
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# ====================================
# Logging
# ====================================
logging.level.root=INFO
logging.level.com.myapp=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

**Explicacao:** Propriedades organizadas em secoes com comentarios. Valores sensiveis usam placeholders `${VAR}` com valores default usando `${VAR:default}`. Hierarquia clara com notacao de pontos.

---

### Exemplo 2: Mensagens i18n

**Cenario:** Criar arquivos de mensagens para internacionalizacao.

**messages.properties (padrao/ingles):**
```properties
# ====================================
# Mensagens Gerais
# ====================================
app.name=My Application
app.welcome=Welcome, {0}!

# ====================================
# Validacao
# ====================================
validation.required=This field is required
validation.email.invalid=Please enter a valid email address
validation.password.min=Password must be at least {0} characters

# ====================================
# Erros
# ====================================
error.generic=An unexpected error occurred
error.not.found=Resource not found
error.unauthorized=You are not authorized to perform this action
```

**messages_pt_BR.properties (portugues):**
```properties
# ====================================
# Mensagens Gerais
# ====================================
app.name=Minha Aplica\u00E7\u00E3o
app.welcome=Bem-vindo, {0}!

# ====================================
# Valida\u00E7\u00E3o
# ====================================
validation.required=Este campo \u00E9 obrigat\u00F3rio
validation.email.invalid=Por favor, insira um email v\u00E1lido
validation.password.min=A senha deve ter pelo menos {0} caracteres

# ====================================
# Erros
# ====================================
error.generic=Ocorreu um erro inesperado
error.not.found=Recurso n\u00E3o encontrado
error.unauthorized=Voc\u00EA n\u00E3o tem permiss\u00E3o para esta a\u00E7\u00E3o
```

**Explicacao:** Usamos `{0}`, `{1}` para parametros que serao interpolados pelo MessageFormat. Caracteres acentuados em arquivos i18n usam escapes Unicode para garantir compatibilidade.

---

### Exemplo 3: Maven Properties

**Cenario:** Configurar propriedades em pom.xml.

**Output esperado:**
```properties
# Build properties (usado via maven-resources-plugin)
project.build.sourceEncoding=UTF-8
project.reporting.outputEncoding=UTF-8
java.version=17

# Versoes de dependencias
spring-boot.version=3.2.0
lombok.version=1.18.30
mapstruct.version=1.5.5.Final

# Configuracoes do plugin
maven.compiler.source=${java.version}
maven.compiler.target=${java.version}
```

**Explicacao:** Propriedades de build sao centralizadas para facil manutencao. Versoes de dependencias em um lugar facilitam atualizacoes.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| Valor com `=` ou `:` | Escape com `\`: `url=http\://example.com` ou use aspas |
| Valor multilinea | Termine cada linha com `\`: `texto=linha1\nlinha2` |
| Caracteres especiais (acentos) | Use escapes Unicode: `\u00E7` para c cedilha |
| Propriedade vazia | `chave=` e valido e resulta em string vazia |
| Espacos no inicio/fim do valor | Use `\ ` para preservar espacos |

---

## Referencias

1. https://docs.oracle.com/javase/tutorial/essential/environment/properties.html (official_docs)
2. https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html (framework_docs)
3. https://www.baeldung.com/java-properties (tutorial)
4. https://native2ascii.net/ (encoding_tool)

---

## Notas de Implementacao

> Para YAML como alternativa em Spring Boot, veja a skill `yaml-configuration-best-practices`.
> Spring Boot suporta ambos formatos, mas YAML oferece melhor suporte a estruturas aninhadas.
