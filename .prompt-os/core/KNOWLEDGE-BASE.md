# KNOWLEDGE-BASE - Gestao de Conhecimento

> **Instrucoes para voce (agente de IA) gerenciar e acessar o conhecimento do PromptOS.**  
> Como encontrar, relacionar e utilizar skills, personas e documentacao.

---

## SISTEMA DE CONHECIMENTO

O PromptOS organiza conhecimento em:

| Tipo | Localizacao | Proposito |
|------|-------------|-----------|
| **Skills** | `skills/` | Como fazer coisas especificas |
| **Personas** | `personas/` | Modos de comportamento/especializacao |
| **Docs** | `docs/` | Documentacao do sistema |
| **Memory** | `.prompt-os/MEMORY.md` | Estado e historico |

---

## BUSCA DE CONHECIMENTO

### Hierarquia de Busca

Quando precisar de informacao, siga esta ordem:

```
1. SKILLS existentes
   -> skills/INDEX.md para catalogo
   -> skills/{categoria}/{skill}.md para conteudo

2. PERSONAS disponiveis
   -> personas/INDEX.md para catalogo
   -> Se match, carregar persona

3. DOCS do sistema
   -> docs/ para arquitetura, padroes

4. MEMORY do projeto
   -> .prompt-os/MEMORY.md para historico

5. PESQUISA EXTERNA (se necessario)
   -> Seguir WEB-RESEARCH.md
```

### Como Buscar Skills

#### Por Nome/Topico

```
1. Verifique skills/INDEX.md
2. Busque por:
   - Nome exato: "react-hooks"
   - Categoria: "frontend"
   - Tags relacionadas: "hooks", "state"
   - Triggers: frases que ativam
```

#### Por Similaridade Semantica

Se nao encontrar match exato:

```
Pedido: "Como gerenciar estado no React?"

Processo mental:
1. Termos-chave: "gerenciar", "estado", "React"
2. Sinonimos: "state management", "useState", "Redux"
3. Busca em INDEX.md por termos relacionados
4. Encontra: "react-hooks" - match por "state"
```

#### Por Problema

```
Pedido: "Minha aplicacao esta lenta"

Processo mental:
1. Problema: performance
2. Contexto: aplicacao (qual tipo?)
3. Skills relacionadas: 
   - "performance-optimization"
   - "caching-strategies"
   - "code-profiling"
4. Pergunte contexto se necessario
```

---

## RELACIONAMENTO ENTRE SKILLS

### Skills Complementares

Algumas skills funcionam bem juntas:

```yaml
# Exemplo de grupos
api_development:
  - nodejs-api
  - graphql-basics
  - rest-patterns
  - api-security

container_deployment:
  - docker-basics
  - kubernetes-deployment
  - ci-cd-pipelines

frontend_modern:
  - react-hooks
  - typescript-basics
  - testing-frontend
```

### Sugerindo Skills Relacionadas

Quando carregar uma skill, mencione relacionadas:

```
"Carreguei a skill 'docker-basics'.

Skills relacionadas que podem ajudar:
- kubernetes-deployment (orquestracao)
- ci-cd-pipelines (automacao)
- container-security (seguranca)

Gostaria que eu carregue alguma adicional?"
```

---

## RETRIEVAL AUGMENTED GENERATION (RAG)

### Conceito

Quando gerar conteudo novo (skill, codigo, resposta):

1. **RETRIEVE:** Busque conhecimento relevante existente
2. **AUGMENT:** Use como contexto para sua geracao
3. **GENERATE:** Crie conteudo informado pelo contexto

### Aplicacao Pratica

```
Pedido: "Crie uma skill para GraphQL"

RETRIEVE:
- Busco skills similares: "rest-api", "nodejs-api"
- Encontro padroes: estrutura, exemplos, formato

AUGMENT:
- Uso estrutura de skills existentes como modelo
- Identifico nivel de detalhe esperado
- Noto padroes de exemplos

GENERATE:
- Crio skill no mesmo formato
- Mantenho consistencia
- Adapto para GraphQL especifico
```

### Checklist de RAG

Antes de gerar conteudo novo:

```
[ ] Busquei skills/docs relacionados?
[ ] Identifiquei padroes existentes?
[ ] Estou mantendo consistencia?
[ ] Estou evitando duplicacao?
[ ] Estou referenciando quando apropriado?
```

---

## DETECCAO DE REDUNDANCIA

### Quando Verificar

Antes de criar skill nova:

```
1. Busque skills com nome similar
2. Busque skills com tags similares
3. Busque skills que mencionam o topico
4. Verifique se e extensao ou duplicacao
```

### Decidindo: Nova vs Extensao

| Cenario | Acao |
|---------|------|
| Topico totalmente novo | Criar skill nova |
| Subtopico de skill existente | Expandir skill existente |
| Abordagem diferente do mesmo topico | Criar skill nova, referenciar existente |
| Mesma coisa com nome diferente | NAO criar, usar existente |

### Comunicando ao Usuario

```
# Se encontrar redundancia
"Encontrei uma skill similar: '{nome}' ({similaridade}% relacionado)

Opcoes:
1. Expandir skill existente com novo conteudo
2. Criar skill nova que complementa existente
3. Usar skill existente como esta

O que prefere?"
```

---

## CARREGAMENTO INTELIGENTE

### JIT Loading (Just-In-Time)

Carregue conhecimento apenas quando necessario:

```
Pedido: "Implemente autenticacao JWT"

1. CLASSIFICAR: Precisa de skills de auth + JWT
2. VERIFICAR: Existe skill? 
   -> Sim: jwt-authentication
3. CARREGAR: Apenas jwt-authentication
4. SE NECESSARIO: Carregar mais durante execucao
```

### Prioridade de Carregamento

| Prioridade | Criterio | Exemplo |
|------------|----------|---------|
| P0 | Match exato com request | "use jwt-auth" -> jwt-auth |
| P1 | Match por trigger | "login seguro" -> auth-patterns |
| P2 | Match por dominio | projeto backend -> nodejs-api |
| P3 | Skill da persona ativa | DevOps -> docker, k8s |

### Limite de Carregamento

Para manter contexto eficiente:

```
MAXIMO SIMULTANEO:
- Skills: 3-5 (depende do tamanho)
- Personas: 1 ativa
- Docs: conforme necessidade

SE PRECISAR DE MAIS:
- Pergunte ao usuario qual e prioritaria
- Carregue e descarregue conforme uso
- Mantenha referencia para recarregar
```

---

## ORGANIZACAO DO CONHECIMENTO

### Indice de Skills (skills/INDEX.md)

Estrutura esperada:

```markdown
# Skills Index

## Por Categoria

### Frontend
| Skill | Descricao | Nivel |
|-------|-----------|-------|
| [react-hooks](frontend/react-hooks.md) | Hooks do React | L2 |

### Backend
| Skill | Descricao | Nivel |
|-------|-----------|-------|
| [nodejs-api](backend/nodejs-api.md) | APIs com Node.js | L2 |

## Por Nivel
- L1 (Basico): {lista}
- L2 (Intermediario): {lista}
- L3 (Avancado): {lista}
```

### Mantendo Indice Atualizado

Ao criar nova skill:

```
1. Adicione entrada no INDEX.md
2. Mantenha ordem alfabetica na categoria
3. Verifique se categoria existe (crie se nao)
4. Atualize contadores se existirem
```

---

## VERSIONAMENTO DE CONHECIMENTO

### Quando Atualizar

Skills/docs devem ser atualizados quando:

```
1. Tecnologia teve major version (React 18 -> 19)
2. Best practices mudaram significativamente
3. Feedback indica informacao incorreta
4. Mais de 1 ano sem revisao
```

### Como Atualizar

```
# No frontmatter
version: "1.0.0"  -> "1.1.0" (minor update)
version: "1.1.0"  -> "2.0.0" (major rewrite)
updated: "2026-02-02"
changelog:
  - "1.1.0: Adicionado exemplo de X"
  - "2.0.0: Reescrito para versao Y"
```

### Comunicando Desatualizacao

```
"⚠ A skill '{nome}' foi criada em {data}.

Desde entao, {tecnologia} teve atualizacoes significativas.

Sugestoes:
1. Usar com cautela, verificar docs atuais
2. Atualizar skill antes de usar
3. Procurar alternativa mais recente

O que prefere?"
```

---

## INTEGRACAO COM MEMORIA

### Registrando Uso

Quando usar uma skill:

```yaml
# Em MEMORY.md
skill_usage:
  - skill: react-hooks
    used: 2026-02-02
    context: "Criacao de componente"
    success: true
```

### Identificando Skills Populares

```
Skills mais usadas (ultimo mes):
1. nodejs-api (15 usos)
2. docker-basics (12 usos)
3. git-workflow (10 usos)

-> Considerar: expandir ou criar relacionadas
```

### Identificando Gaps de Conhecimento

```
Requests sem skill match (ultimo mes):
1. "Kafka" (5 vezes)
2. "Terraform" (3 vezes)
3. "gRPC" (2 vezes)

-> Considerar: criar novas skills
```

---

## CHECKLIST DE GESTAO DE CONHECIMENTO

### Ao Receber Request

```
[ ] Existe skill para isso? (verificar INDEX)
[ ] Skill e atual? (verificar data)
[ ] Precisa complementar com outras skills?
[ ] Ha gaps a registrar?
```

### Ao Criar Conteudo

```
[ ] Busquei referencias existentes?
[ ] Estou mantendo padroes?
[ ] Vou duplicar algo?
[ ] Onde vai no indice?
```

### Ao Finalizar Sessao

```
[ ] Registrar skills usadas
[ ] Registrar gaps encontrados
[ ] Atualizar estatisticas
```

---

## EXEMPLO COMPLETO

### Cenario: Usuario Pede Ajuda com Docker Compose

```
Usuario: "Me ajuda a criar um docker-compose para minha app Node com Redis?"

Agente (voce):

1. BUSCA:
   -> skills/INDEX.md
   -> Encontrado: docker-basics, redis-cache
   -> NAO encontrado: docker-compose especifico

2. DECISAO:
   -> docker-basics cobre docker-compose parcialmente
   -> redis-cache cobre configuracao Redis
   -> Combinar conhecimento das duas

3. CARREGAMENTO:
   -> Carregar docker-basics (tem secao de compose)
   -> Carregar redis-cache (tem configuracao)

4. RESPOSTA:
   "Encontrei skills relacionadas:
   - docker-basics (inclui Docker Compose)
   - redis-cache (configuracao Redis)
   
   Vou combinar para ajudar. Se precisar de skill
   especifica 'docker-compose-patterns', posso criar."

5. REGISTRO:
   -> Registrar uso de docker-basics, redis-cache
   -> Registrar possivel gap: docker-compose-patterns
```

---

*Fim do Knowledge-Base Protocol. Use para gerenciar conhecimento de forma eficiente.*
