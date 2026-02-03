# CLAUDE.md

> **Bootstrap para Claude Code** | Itzamna PromptOS v2.1.0
> Resumo do contexto total do projeto para orientar sessões de trabalho.

---

## 1. BOOTSTRAP — Leia na Ordem

```
1. ITZAMNA-AGENT.md          → Agente principal (abstrai regras e workflows comuns)
2. .prompt-os/PROMPTOS.md    → Entry point do sistema PromptOS
3. .prompt-os/CONSTITUTION.md → Regras T0/T1/T2 (leia SEMPRE)
4. MEMORY.md                 → Estado persistente da última sessão
5. .context/                 → Contexto estruturado (carregar JIT conforme necessidade)
```

Para detalhes completos consulte `ITZAMNA-AGENT.md` e `.context/ai-assistant-guide.md`.

---

## 2. O QUE É O PROJETO

**Itzamna PromptOS** é um sistema operacional cognitivo **prompt-based** para programação assistida por IA.
O core **não é código** — são arquivos Markdown que qualquer agente de IA lê e segue.

```
Agente AI
  ├── Lê .prompt-os/PROMPTOS.md          (entry point)
  ├── Segue .prompt-os/CONSTITUTION.md   (regras T0/T1/T2)
  ├── Carrega .prompt-os/core/*.md       (8 protocolos comportamentais)
  ├── Carrega skills/*.md                (17 skills, JIT)
  └── Carrega personas/*.md              (personas especializadas, JIT)
```

Scripts opcionais (`brain.js`, `sync-constitution.ps1`) existem como helpers para uso humano — **não são necessários para o sistema funcionar**.

---

## 3. DOIS SISTEMAS DE CONTEXTO (Complementares)

| Sistema | Diretório | Proposito |
|---------|-----------|-----------|
| **PromptOS** | `.prompt-os/` | O "sistema operacional" — protocolos, constitution, templates, skills registry |
| **Context Hub** | `.context/` | Contexto estruturado para AIs — padrões, regras, workflows, exemplos, troubleshooting |

Ambos coexistem. `.prompt-os/` define **como o sistema opera**; `.context/` ajuda o agente a **navegar e tomar decisões**.

---

## 4. TIER SYSTEM — Hierarquia de Autoridade

```
T0 (Enforcement) > T1 (Standards) > T2 (Context) > T3 (Examples)

Se há conflito entre tiers, o mais alto SEMPRE vence.
```

| Tier | Autoridade | Pode Quebrar? | Arquivos Principais |
|------|------------|---------------|---------------------|
| **T0** | ABSOLUTA | NUNCA | `.context/standards/architectural-rules.md` |
| **T1** | NORMATIVA | Com justificativa explícita | `.context/standards/`, `.context/patterns/`, `.context/workflows/` |
| **T2** | INFORMATIVA | Livremente | `.context/_meta/` |
| **T3** | ILUSTRATIVA | N/A | `.context/examples/` |

---

## 5. REGRAS T0 — INVIOLÁVEIS

### 5a. Regras Arquiteturais (`.context/standards/architectural-rules.md`)

| ID | Regra |
|----|-------|
| ARCH-001 / T0-HUMAN-01 | Nenhuma persistência sem aprovação humana (L1 auto, L2/L3 requer aprovação) |
| ARCH-002 / T0-SIZE-01 | Kernel (AGENTS.md) < 5KB; PROMPTOS.md < 3KB; CONSTITUTION.md < 10KB |
| ARCH-003 / T0-SIZE-02 | Skills individuais < 1400 tokens |
| ARCH-004 / T0-SOURCE-01 | Sempre citar fontes (mínimo 2 para skills técnicas) |
| ARCH-005 / T0-COMPAT-01 | Compatibilidade cross-model obrigatória |
| ARCH-006 / T0-MEMORY-01 | Atualizar MEMORY.md após ações significativas |
| ARCH-007 / T0-ARCH-01 | Core do sistema é prompts (Markdown), não código executável |
| ARCH-008 / T0-ENTRY-01 | `.prompt-os/PROMPTOS.md` é o entry point obrigatório |
| ARCH-009 / T0-CRITIQUE-01 | Executar Self-Critique antes de qualquer operação L2/L3 (score < 70 bloqueia) |
| ARCH-010 / T0-TIER-01 | Respeitar hierarquia T0 > T1 > T2 > T3 |
| ARCH-011 / T0-PROTOCOL-01 | Protocolos devem referenciar-se mutuamente |

### 5b. Regras da Constitution (`.prompt-os/CONSTITUTION.md`)

| Categoria | Regras Chave |
|-----------|--------------|
| **T0-SEC** | Sem secrets hardcoded (SEC-01), sem SQL injection (SEC-02), sem dados sensíveis em logs (SEC-03), sem desabilitar validações de segurança (SEC-04) |
| **T0-HUMAN** | Aprovação para mudanças significativas (01), sem commit automático (02), sem push automático (03), sem deletar sem confirmar (04) |
| **T0-STRUCT** | CARD-FIRST para novas features (01), manter estrutura de pastas (02), não criar arquivos fora do escopo sem permissão (03) |
| **T0-VALIDATE** | Não afirmar sucesso sem verificar (01), não inventar APIs/métodos (02), não ignorar erros de compilação (03) |

**Arquivos críticos que SEMPRE pedem aprovação:** `package.json`, `pom.xml`, `.env*` (nunca commite!), `Dockerfile`, `docker-compose.yml`, CI/CD configs.

**Exceção CARD-FIRST:** `#impl-direct` (usuário consciente), bug fixes urgentes, refatorações pequenas.

---

## 6. HUMAN GATE — Protocolo de Aprovação

**Nível de Autonomia Padrão: A2 (Colaborador)**
**Protocolo completo:** `.prompt-os/core/HUMAN-GATE.md`

### Níveis Cognitivos

| Nível | Exemplos | Auto-Approve? |
|-------|----------|---------------|
| **L1** | Formatação, lint, leitura | Sim |
| **L2** | Criação/modificação de skill, código | **Não** |
| **L3** | Criação de persona, decisões arquiteturais | **Não** (revisão dupla) |

### Fluxo Correto (6 Fases)

```
1. CLASSIFY  → Tipo, domínio, nível cognitivo
2. RESEARCH  → Skills existentes, fontes externas
3. GENERATE  → Aplicar template canônico
4. SELF-CRITIQUE → Score 0-100 (< 70 = iterar, não avançar)
5. [HUMAN GATE]  → Apresentar com score e fontes
6. COMMIT    → Salvar, indexar, atualizar MEMORY.md
```

### Score Bands (Self-Critique)

| Band | Score | Indicador | Comportamento |
|------|-------|-----------|---------------|
| Excelente | 90-100 | 🟢 | Prosseguir normalmente |
| Bom | 70-89 | 🔵 | Prosseguir com sugestões |
| Precisa Melhoria | 50-69 | 🟡 | **Bloquear** — iterar antes |
| Insuficiente | 0-49 | 🔴 | **Bloquear** — rever fundamentalmente |

### Formato de Apresentação

```
"[Artefato] gerado! Score: [score]/100 ([band]) [indicator]
 Sources: [fontes]

 approve | view | edit | reject | cancel"
```

---

## 7. PROTOCOLOS CORE (8 Total)

Localizados em `.prompt-os/core/` — carregue JIT conforme necessidade:

| Protocolo | Arquivo | Proposito | Quando Carregar |
|-----------|---------|-----------|-----------------|
| **Self-Critique** | `SELF-CRITIQUE.md` | Avaliação 4 dimensões (completude, clareza, correção, best practices), score 0-100, redundância | Antes de qualquer L2/L3 |
| **Human Gate** | `HUMAN-GATE.md` | Display estruturado com score, indicadores visuais, Constitution violation blockers | Na fase 5 do pipeline |
| **Input Classifier** | `INPUT-CLASSIFIER.md` | Classifica input → workflow + persona + skills | Ao receber pedido |
| **JIT Protocol** | `JIT-PROTOCOL.md` | Carregamento otimizado: Kernel (~3KB) → Core (~4KB) → Skills (2-5 × ~2KB). Target: 10-16KB/tarefa | Sempre |
| **Auto-Increment** | `AUTO-INCREMENT.md` | Detecção de gaps, aprendizado com rejeições, sugestões proativas, relatórios de evolução | Após rejeições ou periodicamente |
| **Web Research** | `WEB-RESEARCH.md` | Metodologia de pesquisa, hierarquia de fontes (T1-T7), cache | Ao precisar de pesquisa externa |
| **Knowledge Base** | `KNOWLEDGE-BASE.md` | Gerenciamento de conhecimento, busca hierárquica, relações entre skills | Ao buscar skills relacionadas |
| **Persona Generator** | `PERSONA-GENERATOR.md` | Criação e composição de personas a partir de skills | Ao criar nova persona |

---

## 8. PERSONAS DISPONÍVEIS (8)

Definidas em `.prompt-os/personas/INDEX.md`:

| Persona | Ativa Quando | Skills Carregadas |
|---------|--------------|-------------------|
| Product Owner | Nova feature, criação de CARD | requirements-gathering, card-templates |
| Software Engineer | Implementação (`#impl`), refatoração | clean-code, linguagem do projeto, testing |
| QA Engineer | Criação de testes (`#test`) | software-testing, tdd |
| Code Reviewer | Revisão (`#review`) | code-quality, clean-code |
| Debugger | Bug fix (`#bug`) | debugging-techniques, error-handling |
| Technical Writer | Documentação (`#docs`) | technical-writing |
| Solutions Architect | Decisões de arquitetura (`#arch`) | design patterns, system design |
| DevOps Engineer | Deploy, CI/CD (`#deploy`) | docker, kubernetes |

**Persona gerada (conteúdo):** `personas/senior-fullstack-developer/` — composta por typescript, api-rest, docker, git, graphql.

---

## 9. WORKFLOWS E SHORTCUTS

| Shortcut | Workflow | Persona | Quando Usar |
|----------|----------|---------|-------------|
| `#new` | card_generation | Product Owner | Nova feature (CARD-FIRST) |
| `#impl CARD-XXX` | code_implementation | Software Engineer | Implementar CARD existente |
| `#impl-direct` | code_implementation | Software Engineer | Implementar sem CARD (bypass) |
| `#test` | test_generation | QA Engineer | Criar testes |
| `#review` | code_review | Code Reviewer | Revisar código |
| `#bug` | bug_fixing | Debugger | Corrigir erro/bug |
| `#refactor` | refactoring | Software Engineer | Melhorar código |
| `#docs` | documentation | Technical Writer | Criar/atualizar documentação |
| `#deploy` | devops | DevOps Engineer | Deploy, CI/CD |
| `#db` | database | Database Specialist | Banco de dados |
| `#security` | security_audit | Security Engineer | Auditoria de segurança |
| `#arch` | architecture | Solutions Architect | Decisões de arquitetura |

Classificação detalhada: `.prompt-os/core/INPUT-CLASSIFIER.md`

---

## 10. SKILLS LIBRARY (18 Skills, 8 Categorias)

Índice completo: `skills/INDEX.md` | Registry interno: `.prompt-os/skills/INDEX.md`

| Categoria | Skills |
|-----------|--------|
| **frontend/** | html (L1), css-basico (L2), css-grid-layout-avancado (L2) |
| **backend/** | api-rest (L2), graphql (L2), python-async-programming (L2), typescript (L2) |
| **config/** | json (L1), java-properties (L1), yaml-configuration-best-practices (L2) |
| **markup/** | markdown (L1), xml (L1), xslt (L2) |
| **devops/** | docker (L2), git (L1) |
| **docs/** | technical-writing (L2) |
| **linguagens-programacao/** | java-8-orientacao-objetos (L2) |
| **testing/** | hello-world-test (L0) |

Todas aprovadas (taxa 100%). Template canônico: `.prompt-os/templates/SKILL.template.md`

---

## 11. SPEC-KIT — Para Features Complexas

Disponível como skills Claude Code. Ative quando esforço estimado > 5 dias:

| Comando | Função |
|---------|--------|
| `/speckit.specify` | Criar especificação formal |
| `/speckit.clarify` | Identificar áreas sub-especificadas (até 5 perguntas) |
| `/speckit.plan` | Gerar plano técnico |
| `/speckit.tasks` | Quebrar em tarefas ordenadas por dependência |
| `/speckit.implement` | Executar implementação das tarefas |
| `/speckit.analyze` | Analisar consistência cross-artifact (spec ↔ plan ↔ tasks) |
| `/speckit.checklist` | Gerar checklist customizado |
| `/speckit.taskstoissues` | Converter tarefas em GitHub issues |
| `/speckit.constitution` | Criar/atualizar constituição do projeto |

**Complexidade:**
- < 3 dias → Geração direta permitida
- 3-5 dias → Recomendar SpecKit
- \> 5 dias → SpecKit **OBRIGATÓRIO** (Princípio VII da Constitution)

---

## 12. ESTADO ATUAL DO PROJETO (v2.1.0 — Sessão 10)

| Métrica | Valor |
|---------|-------|
| Skills totais | 18 (todas aprovadas, 8 categorias) |
| Personas geradas | 1 (senior-fullstack-developer) |
| Personas disponíveis | 8 (no registry) |
| Core protocols | 8 |
| SPECs formais | 5 |
| Agentes sincronizados | 5 (Claude, Qwen, Gemini, Cursor, OpenCode) |
| Taxa de aprovação histórica | 100% |

### Specs Implementadas

| Spec | Protocolo | Status |
|------|-----------|--------|
| SPEC-001 Self-Critique | `SELF-CRITIQUE.md` + `HUMAN-GATE.md` | ✅ Implementado (35/35 tasks completadas) |
| SPEC-002 Auto-Increment | `AUTO-INCREMENT.md` | ✅ Implementado (90/90 tasks completadas, production ready) |
| SPEC-003 Web Research | `WEB-RESEARCH.md` | ✅ Implementado |
| SPEC-004 Vector DB/RAG | `KNOWLEDGE-BASE.md` | ⚠️ Parcial (prompt-based + tooling opcional) |
| SPEC-005 Persona CLI | `PERSONA-GENERATOR.md` | ✅ Implementado |

---

## 13. ROADMAP

| Versão | Status | Foco |
|--------|--------|------|
| v1.0.0 | ✅ Completo | Piloto code-centric |
| v2.0.0 | ✅ Completo | Arquitetura prompt-based |
| **v2.1.0** | **✅ Completo** | Enhanced protocols — SPEC-002 validado (90/90 tasks), integração cross-protocol, memoria distribuída |
| v3.0.0 | 📋 Planejado | Advanced RAG — embeddings, semantic search, knowledge graph |

### v2.1.0 — Próximos Passos
- [ ] Validação automática de protocols
- [ ] Testes de cross-model compatibility
- [ ] Documentação de como criar novos protocols
- [ ] Melhoria do JIT loading (caching hints)
- [ ] Dashboard de métricas

### Backlog (Post v3.0)
Slack Integration, Multi-language Skills, A/B Testing Templates, Multi-agent Coordination, MCP Full Compatibility, Visual Protocol Editor.

---

## 14. PADRÕES DE CÓDIGO E QUALIDADE

Detalhes completos: `.context/standards/code-quality.md` e `.context/standards/testing-strategy.md`

### Nomenclatura (T2)

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Arquivos/Diretórios | kebab-case | `user-service.ts` |
| Classes | PascalCase | `UserService` |
| Funções/Métodos | camelCase | `getUserById()` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Tabelas/Colunas BD | snake_case | `user_profiles` / `created_at` |
| Skills | SKILL.md (maiúsculo) | `skills/backend/api-rest/SKILL.md` |
| Personas | PERSONA.md (maiúsculo) | `personas/senior-fullstack-developer/PERSONA.md` |

### Commits (Conventional Commits)

```
feat(skills): add Docker containerization skill
fix(core): correct JIT loading protocol
docs(readme): update project structure
refactor(personas): simplify senior-fullstack-developer
```

Branches: `feature/CARD-XXX-descricao`, `fix/CARD-XXX-descricao`, `hotfix/descricao`

### Testes (T1)

| Tipo | Proporção | Frameworks |
|------|-----------|------------|
| Unit | 70% | Jest (JS), pytest (Python), Pester (PowerShell) |
| Integration | 20% | Jest, pytest |
| E2E | 10% | Cypress |

**Coverage target:** Line ≥ 90%, Branch ≥ 80%, Function ≥ 95%

### T1 — Regras Fortes (quebrar com justificativa)
- SOLID, DRY, funções pequenas e focadas
- Testes para código novo
- Separação de camadas, Dependency Injection
- Tratamento de erros explícito
- Documentar decisões importantes

---

## 15. DECISÕES ARQUITETURAIS (ADRs)

Completo em `.context/_meta/key-decisions.md`

| ADR | Decisão | Tier |
|-----|---------|------|
| ADR-001 | Human-in-the-Loop obrigatório (L2/L3) | T0 |
| ADR-002 | Kernel lightweight (< 5KB) | T0 |
| ADR-003 | JIT Skill Loading | T1 |
| ADR-004 | Cross-Model Compatibility | T0 |
| ADR-005 | 6-Phase Generation Pipeline | T1 |
| ADR-006 | **Prompt-Based Architecture** (v2.0 — mudança fundamental de code-centric para prompt-based) | T0 |
| ADR-007 | Tier System (T0 > T1 > T2 > T3) | T0 |
| ADR-008 | Self-Critique antes do Human Gate (threshold 70) | T1 |
| ADR-009 | Unified Context Structure (`.context/`) | T1 |
| ADR-010 | Learning from Rejections → AUTO-INCREMENT | T1 |
| ADR-011 | Enhanced Protocol Integration (v2.1 — protocolos referenciam-se mutuamente) | T1 |

---

## 16. TROUBLESHOOTING

Problemas comuns (17 issues documentados em `.context/troubleshooting/common-issues.md`):

- **Bootstrap** → Re-leia PROMPTOS.md e CONSTITUTION.md
- **JIT loading** → Verifique se skills/INDEX.md está atualizado
- **Human Gate travado** → Responda com: approve | view | edit | reject | cancel
- **Score baixo** → Leia SELF-CRITIQUE.md para entender as 4 dimensões
- **Conflito de tiers** → T0 sempre vence; cite o ID da regra

---

## 17. ECONOMIA DE TOKENS (JIT)

**NÃO carregue tudo de uma vez!**

```
Nível 1 — Kernel (SEMPRE):           ~3KB
  └── CONSTITUTION.md + MEMORY.md

Nível 2 — Core (Se necessário):      ~4KB
  └── INPUT-CLASSIFIER.md + Persona ativa

Nível 3 — Skills/Context (JIT):      variável
  └── Apenas 2-5 skills relevantes
  └── Apenas contexto necessário de .context/

TARGET: 10-16KB por tarefa
```

---

## 18. REFERÊNCIA COMPLETA

| Necessidade | Arquivo |
|-------------|---------|
| Visão geral do sistema | `ITZAMNA-AGENT.md` |
| Guia completo para AIs | `.context/ai-assistant-guide.md` |
| Regras T0/T1/T2 detalhadas | `.prompt-os/CONSTITUTION.md` |
| Regras T0 arquiteturais | `.context/standards/architectural-rules.md` |
| Padrões de código | `.context/standards/code-quality.md` |
| Estratégia de testes | `.context/standards/testing-strategy.md` |
| Workflows detalhados | `.context/workflows/development-workflows.md` |
| Blueprints arquiteturais | `.context/patterns/architectural-overview.md` |
| Exemplos de código | `.context/examples/clean-architecture-structure.md` |
| ADRs (decisões arquiteturais) | `.context/_meta/key-decisions.md` |
| Visão geral do projeto | `.context/_meta/project-overview.md` |
| Tech stack | `.context/_meta/tech-stack.md` |
| Troubleshooting | `.context/troubleshooting/common-issues.md` |
| Estado persistente | `MEMORY.md` |
| Roadmap | `ROADMAP.md` |

---

*Itzamna PromptOS v2.1.0 | Claude Code Bootstrap | 2026-02-03*
