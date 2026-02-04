# AI Assistant Guide — T0 Authority

> **Tier**: T0 (Enforcement) — Fonte de verdade para regras, links e protocolos.
> **Versão**: 2.3.0-dev | **Atualizado**: 2026-02-04
> **Leia SEMPRE antes de qualquer ação.**

---

## Hierarquia dos Arquivos de Agente

```
T0  .context/ai-assistant-guide.md   ← ESTE ARQUIVO (regras, links, protocolos)
 └─ T1  ITZAMNA-AGENT.md            ← Workflows, memória longa, exemplos
     └─ T3  CLAUDE.md / GEMINI.md / QWEN.md / AGENTS.md
            .cursorrules / copilot-instructions.md
            └─ Dicas específicas do CLI; sempre referenciam T0 + T1
```

Em conflito entre tiers, o mais alto **sempre** vence. Cite o ID da regra.

---

## Mapa de Arquivos (Links Canônicos)

| Propósito | Arquivo | Tier |
|-----------|---------|------|
| Este guia (regras & protocolos) | `.context/ai-assistant-guide.md` | T0 |
| Workflows, memória, exemplos | `ITZAMNA-AGENT.md` | T1 |
| Estado persistente | `MEMORY.md` | T1 |
| Constitution (fonte de verdade das regras) | `.prompt-os/CONSTITUTION.md` | T0 ref |
| Entry point do sistema | `.prompt-os/PROMPTOS.md` | T0 ref |
| Regras arquiteturais detalhadas | `.context/standards/architectural-rules.md` | T0 |
| Qualidade de código | `.context/standards/code-quality.md` | T1 |
| Estratégia de testes | `.context/standards/testing-strategy.md` | T1 |
| Decisões arquiteturais (ADRs) | `.context/_meta/key-decisions.md` | T2 |
| Visão geral do projeto | `.context/_meta/project-overview.md` | T2 |
| Tech stack | `.context/_meta/tech-stack.md` | T2 |
| Workflows detalhados | `.context/workflows/development-workflows.md` | T1 |
| Blueprints arquiteturais | `.context/patterns/architectural-overview.md` | T1 |
| Exemplos de código | `.context/examples/` | T3 |
| Troubleshooting | `.context/troubleshooting/common-issues.md` | T2 |
| Skills (índice completo) | `.prompt-os/skills/INDEX.md` | T1 |
| Personas (índice) | `.prompt-os/personas/INDEX.md` | T1 |
| Governança de skills | `.prompt-os/core/governance/SKILL-GOVERNANCE.md` | T1 |
| Validação de INDEX | `.prompt-os/scripts/validate-indices.py` | T1 |
| Constitution do SpecKit | `.specify/memory/constitution.md` | T1 |
| Docs consolidados | `docs/ARCHITECTURE.md` | T2 |
| Monitoring templates | `.prompt-os/templates/monitoring/` | T2 |

---

## T0 — Regras Invioláveis

### T0-SEC: Segurança

| ID | Regra |
|----|-------|
| T0-SEC-01 | NUNCA secrets hardcoded — use env vars, `.env`, secrets managers |
| T0-SEC-02 | NUNCA SQL injection — use parameterized queries, ORMs |
| T0-SEC-03 | NUNCA expor dados sensíveis em logs — mascare senhas, tokens, PII |
| T0-SEC-04 | NUNCA desabilite validações de segurança — CORS, CSRF, rate limiting |

**Se detectar violação:** Pare → Avise o usuário → Sugira correção → NÃO prossiga.

### T0-HUMAN: Controle Humano

| ID | Regra |
|----|-------|
| T0-HUMAN-01 | Mudanças significativas REQUEREM aprovação humana |
| T0-HUMAN-02 | NUNCA commit automático |
| T0-HUMAN-03 | NUNCA push automático |
| T0-HUMAN-04 | NUNCA delete sem confirmar |

**Arquivos críticos (sempre pedir aprovação):** `package.json`, `pom.xml`, `build.gradle`,
`.env*` (nunca commite!), `Dockerfile`, `docker-compose.yml`, CI/CD configs, security configs.

### T0-STRUCT: Estrutura

| ID | Regra |
|----|-------|
| T0-STRUCT-01 | CARD-FIRST para novas features (exceções: `#impl-direct`, bug fixes urgentes, refators pequenos) |
| T0-STRUCT-02 | Mantenha estrutura de pastas existente |
| T0-STRUCT-03 | Não crie arquivos fora do escopo sem permissão |

### T0-VALIDATE: Validação

| ID | Regra |
|----|-------|
| T0-VAL-01 | NUNCA afirme sucesso sem verificar |
| T0-VAL-02 | NUNCA invente APIs/métodos — verifique docs oficiais |
| T0-VAL-03 | NUNCA ignore erros de compilação |

### T0 Arquiteturais (`.context/standards/architectural-rules.md`)

| ID | Regra |
|----|-------|
| T0-SIZE-01 | Kernel < 5KB; PROMPTOS.md < 3KB; CONSTITUTION.md < 10KB |
| T0-SIZE-02 | Skills individuais < 1400 tokens |
| T0-SOURCE-01 | Sempre citar fontes (mínimo 2 para skills técnicas) |
| T0-COMPAT-01 | Compatibilidade cross-model obrigatória |
| T0-MEMORY-01 | Atualizar MEMORY.md após ações significativas |
| T0-ARCH-01 | Core do sistema é prompts (Markdown), não código executável |
| T0-ENTRY-01 | `.prompt-os/PROMPTOS.md` é o entry point obrigatório |
| T0-CRITIQUE-01 | Self-Critique antes de qualquer operação L2/L3 (score < 70 bloqueia) |
| T0-TIER-01 | Respeitar hierarquia T0 > T1 > T2 > T3 |
| T0-PROTOCOL-01 | Protocolos devem referenciar-se mutuamente |

---

## T1 — Regras Fortes

Quebrar RARAMENTE e apenas com justificativa explícita. Sempre informe o usuário.

### T1-QUAL: Qualidade

| ID | Regra | Quando Quebrar |
|----|-------|----------------|
| T1-QUAL-01 | SOLID | Protótipo, POC, scripts descartáveis |
| T1-QUAL-02 | Testes para código novo | Código trivial, getters/setters |
| T1-QUAL-03 | DRY | Duplicação mais clara que abstração |
| T1-QUAL-04 | Funções pequenas e focadas | Performance crítica |
| T1-QUAL-05 | Nomes descritivos | Convenções do domínio (i, j) |

### T1-ARCH: Arquitetura

| ID | Regra | Quando Quebrar |
|----|-------|----------------|
| T1-ARCH-01 | Separação de camadas | Scripts simples, CLIs pequenos |
| T1-ARCH-02 | Dependency Injection | Código legado |
| T1-ARCH-03 | Interfaces para dependências externas | MVP, protótipo |
| T1-ARCH-04 | Tratamento de erros explícito | NUNCA (promova a T0) |

### T1-NAMING: Skills & Categorias

| ID | Regra | Quando Quebrar |
|----|-------|----------------|
| T1-NAMING-01 | Categorias em inglês | NUNCA |
| T1-NAMING-02 | Subcategorias lowercase com hífens | Convenção legada |
| T1-NAMING-03 | Skills seguem padrão da categoria | Compat. sistema legado |

**Categorias válidas:**

| Categoria | Subcategorias |
|-----------|---------------|
| `linguagens` | java, kotlin, python, javascript, c-cpp, go, rust, typescript |
| `frameworks` | spring, react, django, express, flask, angular, vue |
| `cloud` | aws, azure, gcp, kubernetes, docker, terraform |
| `databases` | postgresql, mongodb, redis, elasticsearch |
| `devops` | cicd, monitoring, logging, infrastructure |
| `frontend` | css, html, ui-ux, accessibility |
| `backend` | apis, authentication, microservices, messaging |
| `testing` | unit, integration, e2e, performance |
| `tools` | git, vim, vscode, ide |
| `patterns` | design-patterns, architectural-patterns, best-practices |

**Path:** `.prompt-os/skills/{categoria}/{subcategoria}/{versao}/SKILL.md`

### T1-DOC: Documentação

| ID | Regra | Quando Quebrar |
|----|-------|----------------|
| T1-DOC-01 | Documente decisões importantes | Óbvias ou temporárias |
| T1-DOC-02 | README para novos projetos/módulos | Módulo interno pequeno |
| T1-DOC-03 | Comentários para lógica complexa | Auto-explicativo |
| T1-DOC-04 | CHANGELOG para releases | Desenvolvimento inicial |

### T1-PERF: Performance

| ID | Regra | Quando Quebrar |
|----|-------|----------------|
| T1-PERF-01 | Otimize queries de banco | Dev, dados pequenos |
| T1-PERF-02 | Cache onde apropriado | MVP |
| T1-PERF-03 | Lazy loading para objetos grandes | Sempre necessários |

---

## T2 — Convenções

### Nomenclatura de Código

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Arquivos | kebab-case | `user-service.ts` |
| Classes | PascalCase | `UserService` |
| Funções | camelCase | `getUserById()` |
| Constantes | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| Variáveis | camelCase | `userName` |
| Tabelas BD | snake_case | `user_profiles` |
| Colunas BD | snake_case | `created_at` |

### Git

| Tipo | Formato |
|------|---------|
| Commits | Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`) |
| Feature | `feature/CARD-XXX-descricao` |
| Fix | `fix/CARD-XXX-descricao` |
| Hotfix | `hotfix/descricao` |

### Estilo de Código

| Regra | Padrão |
|-------|--------|
| Indentação | 2 spaces (JS/TS), 4 spaces (Java/Python) |
| Linha máxima | 120 chars |
| Imports | Organizados (externos → internos → relativos) |
| Aspas | Single (JS/TS), double (Java/Python) |

### Testes

| Tipo | Proporção | Frameworks |
|------|-----------|------------|
| Unit | 70% | Jest (JS), pytest (Python), Pester (PS) |
| Integration | 20% | Jest, pytest |
| E2E | 10% | Cypress |

**Coverage target:** Line ≥ 90%, Branch ≥ 80%, Function ≥ 95%

---

## Protocolo Obrigatório (6 Fases)

Ao gerar qualquer artefato (skill, persona, código, doc):

```
1. AUTO-INCREMENT  → Verificar se artefato similar existe; detectar gaps
2. GENERATE        → Criar seguindo templates/standards
3. SELF-CRITIQUE   → Score 0-100 (< 70 = bloquear e iterar)
4. HUMAN-GATE      → Preview ao humano; aguardar approve|view|edit|reject|cancel
                     ⚠️ NUNCA escrever sem aprovação (T0-HUMAN-01)
5. COMMIT          → Escrever arquivos, atualizar INDEX.md
6. MEMORY-MGMT     → Atualizar MEMORY.md + memory/{agente}-memory.md
                     ⚠️ NUNCA commitar sem atualizar (T0-MEMORY-01)
```

**Score Bands:**

| Score | Band | Indicador | Ação |
|-------|------|-----------|------|
| 90-100 | Excelente | 🟢 | Prosseguir |
| 70-89 | Bom | 🔵 | Prosseguir com sugestões |
| 50-69 | Precisa melhoria | 🟡 | BLOQUEAR — iterar |
| 0-49 | Insuficiente | 🔴 | BLOQUEAR — rever |

---

## Human Gate

**Formato de apresentação:**
```
[Artefato] gerado! Score: [N]/100 ([band]) [indicador]
Sources: [fontes]

approve | view | edit | reject | cancel
```

**Níveis cognitivos:**

| Nível | Exemplos | Auto-Approve? |
|-------|----------|---------------|
| L1 | Formatação, lint, leitura | Sim |
| L2 | Skills, código | Não |
| L3 | Arquitetura, personas | Não (revisão dupla) |

---

## Definition of Done

| Critério | Mínimo |
|----------|--------|
| Self-Critique Score | ≥ 70 (≥ 99 para baselines) |
| Human Approval | Obrigatório L2/L3 |
| Sources Cited | ≥ 2 fontes (skills técnicas) |
| Template Compliance | 100% |
| Token Limit (Skills) | < 1,400 tokens (use JIT sub-files se necessário) |
| MEMORY.md Updated | Obrigatório após ações significativas |

---

## JIT Sub-Files Pattern

Para skills que excedem 1,400 tokens:

```
skills/{categoria}/{skill}/
├── SKILL.md          # Principal (~1,400 tokens)
├── {topic}.md        # JIT sub-file (carregado sob demanda)
└── {topic2}.md       # JIT sub-file
```

Referência no SKILL.md: `[Ver detalhes](./{topic}.md)`

**Benefícios provados (SPEC-010):** Score 94→99 (C/C++), 95→99 (JavaScript).

---

## Metodologia de Pesquisa

Ver protocolo: `.prompt-os/core/WEB-RESEARCH.md`

---

## Protocolos Core Recentes

- `COMMAND-ROUTER.md` (SPEC-006) — comandos `#init`, `#ini`, `/itzamna.init`
- `BOOTSTRAP.md` — bootstrap e preenchimento de contexto via chat
- `WORKFLOW-ORCHESTRATOR.md` (SPEC-007) — mapeamento workflow → persona

| Tier | Tipo | Uso |
|------|------|-----|
| 1 | Oficiais (docs.docker.com, developer.mozilla.org) | SEMPRE primeiro |
| 2 | Acadêmicas (peer-reviewed) | Suplementar |
| 3 | Consolidados (Baeldung, SO alta pontuação) | Suplementar |
| 4 | Fórums (Reddit, Discord) | ÚLTIMO recurso |
| X | Blogs pessoais, redes sociais | NUNCA |

---

## Como Aplicar Regras

**Ao escrever código:**
1. T0 — Estou violando regra inviolável? → SIM: Pare. NÃO: Continue.
2. T1 — Estou seguindo regras fortes? → NÃO sem justificativa: Informe usuário.
3. T2 — Estou seguindo convenções? → Siga a convenção do projeto se diferente.

**Ao revisar código:**
- T0 violation = BLOCKER
- T1 violation = WARNING
- T2 violation = INFO

**Exceções:** Pode solicitar exceção de T1/T2 ao usuário. NUNCA de T0.

---

## Checklist Rápido

**Antes de persistir:**
- [ ] Self-Critique executado? Score ≥ 70?
- [ ] JIT sub-files se skill > 1,400 tokens?
- [ ] Preview mostrado ao usuário?
- [ ] Aprovação explícita recebida?
- [ ] MEMORY.md será atualizado?

**Segurança (T0):**
- [ ] Sem secrets hardcoded?
- [ ] Sem SQL injection?
- [ ] Sem dados sensíveis em logs?

**Skills Naming (T1):**
- [ ] Categoria em inglês?
- [ ] Subcategoria lowercase com hífens?
- [ ] Path: `{categoria}/{subcategoria}/{versão}/SKILL.md`?

---

*`.context/ai-assistant-guide.md` — T0 Authority | Itzamna PromptOS v2.3.0-dev | 2026-02-04*
