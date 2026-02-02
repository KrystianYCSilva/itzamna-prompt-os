# 🚦 HUMAN GATE - Approval Protocol v2.0

> **Purpose:** Pausar e apresentar artefatos para aprovação humana
> **For:** Todos os agentes (obrigatório antes de commits)
> **Critical:** NUNCA pular este passo para criação de skills/personas

---

## 📋 QUANDO USAR HUMAN GATE

**OBRIGATÓRIO para:**
- ✅ Criar nova skill
- ✅ Criar nova persona
- ✅ Modificar skill existente
- ✅ Modificar persona existente
- ✅ Deletar qualquer artefato
- ✅ Atualizar AGENTS.md
- ✅ Operações /speckit.*

**NÃO necessário para:**
- ❌ Ler arquivos existentes
- ❌ Pesquisar (web search)
- ❌ Responder perguntas
- ❌ Atualizar MEMORY.md (auto-update)
- ❌ Atualizar INDEX.md (se skill já aprovada)

---

## PROTOCOLO DE APRESENTAÇÃO

### Passo 1: Preparar Resumo

**Coletar informações:**
```yaml
artifact_type: "{skill | persona | spec | plan}"
artifact_name: "{nome do artefato}"
action: "{create | update | delete}"
sources_used:
  - "{fonte 1}"
  - "{fonte 2}"
validation_score: "{0-100}"
token_count: "{N}"
issues_found: "{N critical, N warnings}"
```

### Passo 2: Apresentar ao Usuário

**Template de apresentação:**

````markdown
---
## 🔍 REVIEW: {artifact_type} - {artifact_name}

**Ação:** {create | update | delete}
**Status:** Aguardando aprovação

### 📊 Resumo

| Métrica | Valor |
|---------|-------|
| Tipo | {skill/persona/spec} |
| Nome | {artifact_name} |
| Tokens | {N} |
| Validação | {score}/100 |
| Issues | {N critical}, {N warnings} |

### 📚 Fontes Utilizadas

1. **{Fonte 1}** ({confiabilidade})
   - {URL se aplicável}
2. **{Fonte 2}** ({confiabilidade})

### 📝 Preview

```
{Primeiras 10-15 linhas do artefato}
...
```

### ⚠️ Issues Encontradas

{Se houver issues:}
- ❌ **Critical:** {descrição}
- ⚠️ **Warning:** {descrição}

{Se não houver:}
✅ Nenhum issue crítico encontrado.

---

### 🎯 O que você gostaria de fazer?

- **"aprovar"** → Salvar e indexar
- **"ver completo"** → Mostrar artefato inteiro
- **"editar [X]"** → Sugerir mudança específica
- **"adicionar [Y]"** → Incluir nova informação
- **"rejeitar"** → Descartar (com feedback)

---
````

### Passo 3: Processar Resposta

**Ação: "aprovar" ou "ok" ou "sim"**
```
1. Confirmar: "Aprovando {artifact_name}..."
2. Executar: Mover para localização final
3. Executar: Atualizar INDEX.md
4. Executar: Registrar em MEMORY.md
5. Confirmar: "✅ {artifact_name} salvo com sucesso!"
6. Informar: Localização do arquivo
```

**Ação: "ver completo" ou "mostrar"**
```
1. Exibir: Artefato completo em code block
2. Repetir: Opções de ação
```

**Ação: "editar [X]" ou sugestão de mudança**
```
1. Confirmar: "Entendido! Vou ajustar {X}..."
2. Executar: Regenerar seção afetada
3. Validar: Verificar se mudança está ok
4. Retornar: Nova apresentação com mudanças destacadas
```

**Ação: "adicionar [Y]" ou "incluir [Y]"**
```
1. Confirmar: "Vou pesquisar e adicionar {Y}..."
2. Executar: Web search se necessário
3. Executar: Incorporar informação
4. Retornar: Nova apresentação com adição destacada
```

**Ação: "rejeitar" ou "não"**
```
1. Perguntar: "Pode me dizer o que não ficou bom?"
2. Registrar: Feedback em MEMORY.md (seção errors/learned)
3. Confirmar: "Entendido. Artefato descartado. Feedback registrado."
4. Oferecer: "Quer que eu tente novamente com uma abordagem diferente?"
```

---

## EXEMPLOS DE INTERAÇÃO

### Exemplo 1: Aprovação Simples

```
AI: "🔍 REVIEW: skill - kubernetes

     Tokens: 1,287 | Validação: 95/100 | Issues: 0 critical, 1 warning
     
     Fontes: kubernetes.io (oficial), CNCF docs
     
     Preview:
     ```
     ---
     name: kubernetes
     description: |
       Container orchestration platform...
     ```
     
     ⚠️ Warning: Consider adding Helm as concept
     
     O que deseja fazer? aprovar | ver | editar | rejeitar"

User: "aprovar"

AI: "✅ Skill 'kubernetes' salva com sucesso!
     📁 Localização: skills/technology/cloud/kubernetes.md
     📊 INDEX.md atualizado
     💾 MEMORY.md registrado"
```

### Exemplo 2: Edição Durante Review

```
AI: "🔍 REVIEW: skill - graphql
     ...
     O que deseja fazer?"

User: "adiciona uma seção sobre N+1 problem"

AI: "Boa sugestão! N+1 é um pitfall muito comum em GraphQL.
     
     Pesquisando best practices para evitar N+1...
     
     Adicionei em 'Common Pitfalls':
     
     ```diff
     ## Common Pitfalls
     
     - ❌ **Over-fetching:** Requesting more data than needed
     + - ❌ **N+1 Problem:** One query per item in list
     +   - Cause: Resolvers fetching related data individually
     +   - Solution: Use DataLoader for batching
     ```
     
     Tokens: 1,342 (still within budget)
     
     Aprovar agora?"

User: "aprovar"

AI: "✅ Skill 'graphql' salva com a adição de N+1 problem!"
```

### Exemplo 3: Rejeição com Feedback

```
AI: "🔍 REVIEW: persona - junior-developer
     ...
     O que deseja fazer?"

User: "rejeitar - não preciso de persona junior, quero senior"

AI: "Entendido! Descartando persona 'junior-developer'.
     
     📝 Feedback registrado: Usuário prefere personas senior-level
     
     Quer que eu gere uma persona 'senior-developer' ao invés?"

User: "sim, focado em backend"

AI: "Perfeito! Gerando 'senior-backend-developer'...
     [Inicia novo ciclo de geração]"
```

---

## REGRAS CRÍTICAS

### ❌ NUNCA FAZER

1. **Salvar sem aprovação** - SEMPRE mostrar preview primeiro
2. **Pular validação** - SEMPRE rodar validação antes de apresentar
3. **Ignorar feedback** - SEMPRE registrar rejeições em MEMORY.md
4. **Assumir aprovação** - Silêncio não é consentimento

### ✅ SEMPRE FAZER

1. **Mostrar resumo** - Tokens, validação, issues
2. **Citar fontes** - De onde veio a informação
3. **Dar opções claras** - aprovar | ver | editar | rejeitar
4. **Confirmar ações** - Feedback após cada operação
5. **Ser conciso** - Preview, não arquivo completo (a menos que peçam)

---

## INTEGRAÇÃO COM MEMORY.md

**Após aprovação:**
```yaml
# MEMORY.md - seção skills_created ou personas_created
- name: "{artifact_name}"
  date: "{YYYY-MM-DD}"
  path: "{path/to/file.md}"
  status: "active"
  approval_notes: "{feedback do usuário, se houver}"
```

**Após rejeição:**
```yaml
# MEMORY.md - seção errors
- id: "REJ-{N}"
  date: "{YYYY-MM-DD}"
  type: "artifact_rejected"
  artifact: "{artifact_name}"
  reason: "{feedback do usuário}"
  learned: "{o que aprender para próxima vez}"
```

---

## NÍVEIS DE AUTONOMIA

| Nível | Human Gate Behavior |
|-------|---------------------|
| **A1 (Operador)** | Aprovar cada ação, incluindo pesquisas |
| **A2 (Colaborador)** | Aprovar criações; pesquisas auto-executam |
| **A3 (Consultor)** | Aprovar novas skills; updates auto-executam |
| **A4 (Aprovador)** | Aprovar planos completos (batch) |
| **A5 (Observador)** | Apenas auditoria periódica |

**Default para PromptOS v2.0:** A2 (Colaborador)

---

**Version:** 2.0.0 | **Criticality:** HIGH - Core safety mechanism
