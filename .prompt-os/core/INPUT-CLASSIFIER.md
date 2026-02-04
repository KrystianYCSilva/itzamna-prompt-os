# INPUT CLASSIFIER - Classificacao de Pedidos

> **Use este arquivo para classificar o pedido do usuario.**  
> Identifique: Workflow + Persona + Skills necessarias.

---

## COMO USAR

Quando o usuario fizer um pedido:

1. Leia o pedido
2. Identifique o **workflow** (o que fazer)
3. Identifique a **persona** (quem fazer)
4. Identifique as **skills** necessarias (como fazer)
5. Carregue apenas o necessario (JIT)

---

## FLUXO DE CLASSIFICACAO

```
INPUT: [mensagem do usuario]
    ↓
┌─────────────────────────────────────┐
│ 0. E UM COMANDO ROUTER?             │ → DELEGATE TO COMMAND-ROUTER.md
│    CRITERIO ESTRITO:                │   STOP CLASSIFICATION HERE.
│    Deve ser o PRIMEIRO token (Regex: ^(#|/))
│    Ex: "#init", "#ini", "/itzamna.init" │ Execute instructions in protocol.
└─────────────────────────────────────┘
    ↓ (nao)
┌─────────────────────────────────────┐
│ 1. E um ERRO ou BUG?                │ → bug_fixing
│    "erro", "bug", "nao funciona"    │   Persona: Debugger
└─────────────────────────────────────┘
    ↓ (nao)
┌─────────────────────────────────────┐
│ 2. Tem SHORTCUT #xxx?               │ → workflow do shortcut
│    "#impl", "#test", "#review"      │   
└─────────────────────────────────────┘
    ↓ (nao)
┌─────────────────────────────────────┐
│ 3. E IMPLEMENTACAO de CARD?         │ → code_implementation
│    "#impl CARD-XXX"                 │   Persona: Software Engineer
└─────────────────────────────────────┘
    ↓ (nao)
┌─────────────────────────────────────┐
│ 4. E ACAO sobre codigo existente?   │ → review/test/refactor
│    "revise", "teste", "melhore"     │   Persona: varia
└─────────────────────────────────────┘
    ↓ (nao)
┌─────────────────────────────────────┐
│ 5. E NOVA FEATURE?                  │ → card_generation ⭐
│    "quero criar", "preciso de"      │   Persona: Product Owner
│    "nova funcionalidade"            │   (CARD-FIRST!)
└─────────────────────────────────────┘
    ↓ (nao)
┌─────────────────────────────────────┐
│ 6. E PERGUNTA/CONSULTA?             │ → consultation
│    "como", "por que", "o que e"     │   Persona: Architect
└─────────────────────────────────────┘
```

---

## PROTOCOLOS AUXILIARES

- **COMMAND-ROUTER.md**: Use para comandos de sistema (#init, #ini, /itzamna.init, #add, #sync). **IMPORTANTE:** O comando deve estar no INICIO ABSOLUTO da mensagem (primeiros caracteres). Se estiver no meio do texto, ignore.
- **WORKFLOW-ORCHESTRATOR.md**: Apos o Router identificar o workflow, delegue ao Orchestrator para resolucao de Persona e Skills.

## SHORTCUTS DISPONIVEIS

O usuario pode usar atalhos para indicar diretamente o workflow:

| Shortcut | Workflow | Persona | Descricao |
|----------|----------|---------|-----------|
| `#new` | card_generation | Product Owner | Criar novo CARD para feature |
| `#impl CARD-XXX` | code_implementation | Software Engineer | Implementar CARD especifico |
| `#impl-direct` | code_implementation | Software Engineer | Implementar sem CARD (bypass) |
| `#test` | test_generation | QA Engineer | Gerar testes |
| `#review` | code_review | Code Reviewer | Revisar codigo |
| `#bug` | bug_fixing | Debugger | Corrigir erro/bug |
| `#refactor` | refactoring | Software Engineer | Refatorar codigo |
| `#docs` | documentation | Technical Writer | Criar documentacao |
| `#deploy` | devops | DevOps Engineer | Deploy, CI/CD |
| `#db` | database | Database Specialist | Banco de dados |
| `#security` | security_audit | Security Engineer | Auditoria de seguranca |
| `#arch` | architecture | Solution Architect | Decisoes de arquitetura |

**Se o usuario usar shortcut, use o workflow correspondente diretamente.**

---

## WORKFLOWS DETALHADOS

### 1. bug_fixing

**Detectar quando:**
- Palavras: "erro", "bug", "exception", "crash", "falha", "nao funciona", "quebrou"
- Stack traces, mensagens de erro

**Persona:** Debugger

**Skills sugeridas:**
- debugging-techniques
- error-handling
- stack-trace-analysis

**Acao:**
1. Entenda o erro
2. Reproduza (se possivel)
3. Identifique causa raiz
4. Proponha correcao
5. Peca aprovacao

---

### 2. code_implementation

**Detectar quando:**
- `#impl CARD-XXX` ou `#impl-direct`
- Referencias a um CARD existente

**Persona:** Software Engineer

**Skills sugeridas (baseado no CARD):**
- Linguagem (java, typescript, python, etc.)
- Framework (spring-boot, react, django, etc.)
- clean-code
- software-testing

**Acao:**
1. Leia o CARD referenciado
2. Entenda requisitos e criterios de aceite
3. Implemente seguindo guidelines
4. Escreva testes
5. Peca review

---

### 3. card_generation (CARD-FIRST!)

**Detectar quando:**
- "Quero criar...", "Preciso de...", "Nova feature..."
- "Adicionar funcionalidade", "Implementar..."
- **IMPORTANTE:** Se nao ha CARD, crie primeiro!

**Persona:** Product Owner

**Skills sugeridas:**
- requirements-gathering
- card-templates
- validation-patterns

**Acao:**
1. Entenda a necessidade
2. Faca perguntas de refinamento
3. Crie CARD seguindo template
4. Peca aprovacao do CARD
5. So depois, implemente (#impl CARD-XXX)

**Excecao:** `#impl-direct` bypassa a criacao de CARD

---

### 4. code_review

**Detectar quando:**
- "Revise", "Review", "Analise o codigo"
- "O que acha deste codigo?"

**Persona:** Code Reviewer

**Skills sugeridas:**
- clean-code
- code-smells
- software-quality

**Acao:**
1. Analise o codigo
2. Verifique contra Constitution (T0/T1/T2)
3. Identifique problemas
4. Sugira melhorias
5. Classifique: APPROVED / CHANGES_REQUESTED

---

### 5. test_generation

**Detectar quando:**
- `#test`, "Crie testes", "Teste isto"
- "Preciso de cobertura"

**Persona:** QA Engineer

**Skills sugeridas:**
- software-testing
- test-automation
- tdd

**Acao:**
1. Entenda o codigo a testar
2. Identifique cenarios (happy path, edge cases)
3. Escreva testes
4. Verifique cobertura

---

### 6. refactoring

**Detectar quando:**
- `#refactor`, "Melhore", "Limpe", "Otimize"
- "Este codigo esta confuso"

**Persona:** Software Engineer

**Skills sugeridas:**
- refactoring
- clean-code
- software-design

**Acao:**
1. Entenda o codigo atual
2. Identifique code smells
3. Proponha refatoracoes
4. Aplique incrementalmente
5. Garanta testes passando

---

### 7. consultation

**Detectar quando:**
- Perguntas: "Como...?", "Por que...?", "O que e...?"
- Pedidos de explicacao

**Persona:** Solution Architect

**Skills sugeridas:**
- Depende do topico da pergunta

**Acao:**
1. Entenda a duvida
2. Pesquise se necessario
3. Explique claramente
4. Ofereca exemplos
5. Pergunte se ficou claro

---

## DETECCAO DE DOMINIO

Apos identificar workflow, identifique o **dominio tecnico** para carregar skills corretas:

| Palavras-chave | Dominio | Skills Relacionadas |
|----------------|---------|---------------------|
| react, vue, angular, css, html | frontend | react, css, html |
| spring, express, django, api | backend | java, nodejs, python |
| postgres, mysql, mongodb, sql | database | sql, database-design |
| docker, kubernetes, ci/cd | devops | docker, kubernetes |
| jest, pytest, cypress | testing | software-testing |
| jwt, oauth, owasp | security | cybersecurity |

---

## DETECCAO DE COMPLEXIDADE

| Indicadores | Complexidade | Max Skills |
|-------------|--------------|------------|
| "basico", "simples", "hello world" | Simples (L1) | 2 |
| (default) | Media (L2) | 4 |
| "arquitetura", "enterprise", "completo" | Complexa (L3) | 5 |

---

## EXEMPLO COMPLETO

### Input do usuario:
```
"Quero criar um endpoint REST para listar usuarios com paginacao"
```

### Classificacao:

1. **Workflow:** `card_generation` (nova feature, CARD-FIRST)
2. **Persona:** Product Owner (para criar CARD)
3. **Dominio:** backend (REST, endpoint)
4. **Complexidade:** Media (paginacao)
5. **Skills:** 
   - requirements-gathering
   - card-templates
   - api-design

### Sua resposta:

```
Vou ajudar a criar um CARD para essa feature antes de implementar.

## CARD-XXX: Endpoint REST para Listagem de Usuarios

### Descricao
Criar endpoint GET /api/users que retorna lista paginada de usuarios.

### Criterios de Aceite
- [ ] Endpoint GET /api/users funcionando
- [ ] Suporte a paginacao (?page=1&size=10)
- [ ] Retorno em formato JSON padrao
- [ ] Testes unitarios

### Tecnologias
- [Detectar do projeto]

---

Posso criar este CARD? Ou deseja ajustar algo?
```

---

*Use este classificador para TODA mensagem do usuario.*
