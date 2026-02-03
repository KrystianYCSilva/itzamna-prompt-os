# AI Assistant Guide - Itzamna PromptOS v2.1.0

> **Versão:** 2.1.0 | **Arquitetura:** Prompt-Based
> **Última Atualização:** 2026-02-03
> **SPEC-010:** ✅ COMPLETE | **Próxima SPEC:** 003 (Web Research Enhancement)

---

## IMPORTANTE: Arquitetura Prompt-Based

**PromptOS NÃO é um sistema baseado em código que executa.** É uma coleção de **arquivos Markdown** que AI agents **leem e seguem**.

```
AI Agent → Lê .prompt-os/PROMPTOS.md → Segue instruções → Comporta-se conforme protocolos
```

---

## 1. Bootstrap Sequence

### Passo 1: Entry Point
```
LEIA: .prompt-os/PROMPTOS.md
Este é o ponto de entrada principal do sistema.
```

### Passo 2: Constitution
```
LEIA: .prompt-os/CONSTITUTION.md
Contém regras T0 (invioláveis), T1 (fortes) e T2 (convenções).
```

### Passo 3: Contexto do Projeto
```
LEIA: .context/_meta/tech-stack.md
LEIA: .context/_meta/project-overview.md
```

### Passo 4: Carregar Protocolos (JIT)
```
Baseado no tipo de tarefa, carregue protocolos de .prompt-os/core/:
- SELF-CRITIQUE.md → Para avaliação de qualidade
- AUTO-INCREMENT.md → Para detecção de gaps
- WEB-RESEARCH.md → Para pesquisa
- KNOWLEDGE-BASE.md → Para gestão de conhecimento
- PERSONA-GENERATOR.md → Para criação de personas
- INPUT-CLASSIFIER.md → Para classificação de input
- JIT-PROTOCOL.md → Para carregamento otimizado
- HUMAN-GATE.md → Para aprovação humana
```

---

## 2. Request Classification

| Tipo de Request | Protocolos a Carregar | Exemplo |
|-----------------|----------------------|---------|
| Skill Generation | `SELF-CRITIQUE.md`, `WEB-RESEARCH.md` | "Generate a Docker skill" |
| Persona Creation | `PERSONA-GENERATOR.md`, `KNOWLEDGE-BASE.md` | "Create a DevOps persona" |
| Code Review | `SELF-CRITIQUE.md`, `.context/standards/code-quality.md` | "Review this code" |
| Architecture | `.context/patterns/`, `.context/standards/` | "Design auth system" |
| Bug Fix | `.context/troubleshooting/`, skills relevantes | "Fix this error" |
| Research | `WEB-RESEARCH.md` | "Research best practices for X" |
| Gap Detection | `AUTO-INCREMENT.md` | "What skills are missing?" |

---

## 3. Tier System

### Hierarquia de Autoridade

| Tier | Tipo | Autoridade | Quando Usar |
|------|------|------------|-------------|
| **T0** | Enforcement | ABSOLUTA | Regras que NUNCA podem ser violadas |
| **T1** | Standards | NORMATIVA | Regras fortes, quebrar com justificativa |
| **T2** | Context | INFORMATIVA | Contexto e convenções |
| **T3** | Examples | ILUSTRATIVA | Exemplos de referência |

### Arquivos por Tier

| Tier | Arquivos |
|------|----------|
| T0 | `.prompt-os/CONSTITUTION.md` (seção T0), `.context/standards/architectural-rules.md` |
| T1 | `.prompt-os/CONSTITUTION.md` (seção T1), `.context/standards/code-quality.md`, `.context/patterns/` |
| T2 | `.context/_meta/`, `.prompt-os/CONSTITUTION.md` (seção T2) |
| T3 | `.context/examples/`, `skills/` |

### Lógica de Resolução de Conflitos

```
IF T0 conflita com qualquer tier → T0 VENCE
IF T1 conflita com T2 ou T3 → T1 VENCE
IF T2 conflita com T3 → T2 VENCE
ALWAYS cite a regra específica (ID) na resposta
```

### Exemplo de Aplicação

```
Usuário: "Salva esse arquivo direto sem perguntar"

AI: "Não posso fazer isso. Regra T0-HUMAN-01 exige aprovação
     humana para operações de persistência.
     Posso mostrar o preview para você aprovar?"
```

---

## 4. Human Gate Protocol

### Quando Aplicar

| Nível | Operação | Aprovação |
|-------|----------|-----------|
| L1 | Leitura, formatação, lint | Auto-aprovado |
| L2 | Criação de skills, modificações | **Requer aprovação** |
| L3 | Arquitetura, personas, mudanças estruturais | **Requer aprovação + revisão** |

### Fluxo do Human Gate

```
1. Gerar artefato (skill, persona, código)
2. Executar Self-Critique (ver SELF-CRITIQUE.md)
3. Mostrar preview ao usuário
4. Aguardar decisão:
   - approve → Salvar e commitar
   - view → Mostrar conteúdo completo
   - edit → Permitir edição
   - reject [motivo] → Registrar feedback, aprender
   - cancel → Abortar sem registro
5. Se aprovado, atualizar MEMORY.md
```

---

## 5. Definition of Done

| Métrica | Mínimo | Verificação |
|---------|--------|-------------|
| **Self-Critique Score** | >= 70 | Executar protocolo SELF-CRITIQUE.md |
| **Human Approval** | Obrigatório | Human Gate para L2/L3 |
| **Sources Cited** | >= 2 fontes | Para skills geradas |
| **Template Compliance** | 100% | Todas seções preenchidas |
| **Token Limit (Skills)** | < 1,400 tokens | Use JIT sub-files se necessário |
| **MEMORY.md Updated** | Obrigatório | Após ações significativas |

### JIT Sub-Files Pattern (SPEC-010 Innovation)

**Problema:** Skills que excedem T0-SIZE-01 (1,400 tokens)

**Solução:** Extrair seções detalhadas para arquivos JIT separados

**Estrutura:**
```
skills/{categoria}/{skill}/
├── SKILL.md          # Main skill (~1,400-1,550 tokens)
├── {topic}.md        # JIT sub-file (loaded on demand)
└── {topic2}.md       # JIT sub-file (loaded on demand)
```

**Exemplo (C/C++ baseline - SPEC-010):**
```
.prompt-os/skills/linguagens/c-cpp/
├── SKILL.md             # Main: 370 lines, ~1,400 tokens
├── compilation.md       # JIT: compilation process details
├── build-tools.md       # JIT: CMake, Make, build systems
└── advanced-memory.md   # JIT: RAII, smart pointers, memory
```

**Quando usar:**
- ✅ Skill principal > 1,400 tokens → Extrair sub-topics para JIT files
- ✅ Tópicos complexos que merecem aprofundamento separado
- ✅ Conteúdo avançado que nem todo usuário precisará

**Benefícios comprovados (SPEC-010):**
- Score improvement: 94 → 99 (C/C++), 95 → 99 (JavaScript)
- T0-SIZE-01 compliance sem perda de completude
- Melhor organização de conteúdo avançado

**Nomenclatura:**
- Main skill: `SKILL.md` (sempre)
- Sub-files: `{topic}.md` (e.g., `ecosystem.md`, `compilation.md`, `advanced-memory.md`)
- Referência no SKILL.md: `[Ver detalhes completos](./{topic}.md)` (JIT loading)

---

## 6. Metodologia de Pesquisa

Ver protocolo completo: `.prompt-os/core/WEB-RESEARCH.md`

### Hierarquia de Fontes

| Tier | Tipo | Exemplos | Uso |
|------|------|----------|-----|
| **1** | Oficiais | docs.docker.com, developer.mozilla.org | SEMPRE primeiro |
| **2** | Acadêmicas | artigos, pesquisas peer-reviewed | Suplementar |
| **3** | Consolidados | Baeldung, StackOverflow (alta pontuação) | Suplementar |
| **4** | Fórums | Reddit, Discord | ÚLTIMO RECURSO |
| **X** | **PROIBIDO** | Blogs pessoais, redes sociais | NUNCA |

### Regras de Pesquisa

```
SEMPRE trazer referência (URL + data de acesso)
SEMPRE validar com fonte oficial quando possível
SEMPRE preferir documentação oficial
NUNCA usar fontes não-verificáveis
NUNCA inventar informações
```

---

## 7. Protocolos Core

### 7.1 SELF-CRITIQUE.md
**Propósito:** Avaliar qualidade antes do Human Gate
**Quando usar:** Antes de qualquer geração L2/L3
**Output:** Score 0-100, sugestões de melhoria

### 7.2 AUTO-INCREMENT.md
**Propósito:** Detectar gaps, aprender com rejeições
**Quando usar:** Periodicamente, após rejeições
**Output:** Lista de gaps, sugestões de evolução

### 7.3 WEB-RESEARCH.md
**Propósito:** Metodologia de pesquisa estruturada
**Quando usar:** Ao gerar skills, buscar informações
**Output:** Fontes validadas, informações estruturadas

### 7.4 KNOWLEDGE-BASE.md
**Propósito:** Gestão de conhecimento, relacionamentos
**Quando usar:** Ao buscar skills relacionadas
**Output:** Skills relevantes, hierarquia de conhecimento

### 7.5 PERSONA-GENERATOR.md
**Propósito:** Criar e compor personas
**Quando usar:** Ao criar novas personas
**Output:** Persona completa com skills compostas

### 7.6 INPUT-CLASSIFIER.md
**Propósito:** Classificar tipo de input
**Quando usar:** No início de cada interação
**Output:** Tipo, domínio, nível cognitivo

### 7.7 JIT-PROTOCOL.md
**Propósito:** Carregamento otimizado de contexto
**Quando usar:** Ao decidir o que carregar
**Output:** Lista mínima de arquivos necessários

### 7.8 HUMAN-GATE.md
**Propósito:** Protocolo de aprovação humana
**Quando usar:** Antes de qualquer operação de persistência L2/L3
**Output:** Interface para aprovação do usuário

---

## 8. Available Personas

| Persona | Domínio | Skills Core | Quando Ativar |
|---------|---------|-------------|---------------|
| senior-fullstack-developer | Desenvolvimento | typescript, api-rest, docker, git, graphql | Tarefas de desenvolvimento fullstack |
| skill-engineer | PromptOS | geração de skills | Criar novas skills |
| software-architect | Arquitetura | design de sistemas | Decisões arquiteturais |
| code-reviewer | Qualidade | revisão de código | Code reviews |
| devops-expert | DevOps | CI/CD, containers | Tarefas de infraestrutura |

---

## 9. Fluxo de Trabalho Típico

### Para Nova Skill

```
1. [INPUT-CLASSIFIER] Classificar request
2. [WEB-RESEARCH] Pesquisar fontes
3. [KNOWLEDGE-BASE] Verificar skills existentes
4. [GENERATE] Gerar skill usando template
5. [CHECK TOKEN LIMIT] Se > 1,400 tokens → aplicar JIT sub-files pattern
6. [SELF-CRITIQUE] Avaliar qualidade (target: ≥99 para baseline, ≥80 para advanced)
7. [HUMAN GATE] Mostrar para aprovação
8. [COMMIT] Se aprovado, salvar e atualizar MEMORY.md
```

**Aprendizados SPEC-010:**
- ✅ Self-Critique score ≥99 → 100% aprovação (5/5 skills aprovadas)
- ✅ Version-agnostic approach: Use "Language (moderno)" ao invés de versões específicas
- ✅ JIT sub-files: Scores melhoram de 94→99 quando bem aplicado
- ✅ Estrutura consistente: Template-driven creation é 15% mais rápida (51min vs 60min)

### Para Nova Persona

```
1. [INPUT-CLASSIFIER] Classificar request
2. [PERSONA-GENERATOR] Seguir protocolo de criação
3. [KNOWLEDGE-BASE] Identificar skills para compor
4. [SELF-CRITIQUE] Avaliar qualidade
5. [HUMAN GATE] Mostrar para aprovação
6. [COMMIT] Se aprovado, salvar
```

### Para Tarefa de Código

```
1. [INPUT-CLASSIFIER] Classificar request
2. [JIT-PROTOCOL] Carregar contexto mínimo
3. [standards/] Verificar regras aplicáveis
4. [EXECUTE] Executar tarefa
5. [SELF-CRITIQUE] Se L2/L3, avaliar
6. [HUMAN GATE] Se escrita, aprovar
```

---

## 10. Checklist Rápido

### Antes de Gerar Código
- [ ] Carreguei .prompt-os/PROMPTOS.md?
- [ ] Verifiquei regras T0 em CONSTITUTION.md?
- [ ] Classifiquei o nível da tarefa (L1/L2/L3)?
- [ ] Carreguei protocolos relevantes?
- [ ] Se gerando skill, verifiquei token limit (~1,400)?

### Antes de Persistir
- [ ] Executei Self-Critique?
- [ ] Score ≥70 (mínimo) ou ≥99 (baseline quality)?
- [ ] Apliquei JIT sub-files se skill > 1,400 tokens?
- [ ] Mostrei preview ao usuário?
- [ ] Recebi aprovação explícita?
- [ ] Atualizei MEMORY.md?

### Ao Encontrar Conflito
- [ ] Identifiquei os tiers envolvidos?
- [ ] Apliquei regra de precedência correta?
- [ ] Citei a regra específica (ID)?

---

*Itzamna PromptOS v2.1.0 | AI Assistant Guide | 2026-02-03*
