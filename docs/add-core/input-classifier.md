# INPUT CLASSIFIER - Automatic Workflow & Persona Detection
## Versão: 3.5.0 | Integração com Prompt OS v3.5

**v3.5 NEW:** JIT Loading de skills, Progressive Disclosure, 3-Level Architecture

---

## 🎯 OBJETIVO

Este módulo analisa a mensagem do usuário e automaticamente identifica:
1. **Workflow** a executar (criar card, implementar código, revisar, testar, etc)
2. **Persona** necessária (PO, TechLead, Dev, QA, etc)
3. **Skills** a carregar via JIT (2-5 skills, ≤10KB)

---

## 🧠 COMO FUNCIONA (JIT Loading)

### PASSO 1: Carregar NÍVEL 1 (Sempre)
- AGENTS.md do projeto (~2KB)
- MEMORY.md (estado atual)
- T0 rules

### PASSO 2: Classificar Input
- Analisar padrões na mensagem
- Detectar workflow + persona
- Carregar input-classifier.md (~2KB)

### PASSO 3: Selecionar Skills (JIT)
- Consultar ~/src/prompt-os/skills/INDEX.md
- Carregar 2-5 skills relevantes (~4-10KB)
- Cada skill ≤2KB

### PASSO 4: Executar
- Aplicar T0 rules
- Seguir workflow
- Atualizar MEMORY.md

**Total por tarefa:** 10-16KB (vs 50KB na v3.4)

---

## 📋 FLUXO DE CLASSIFICAÇÃO

```
INPUT: [mensagem do usuário]
  ↓
┌─────────────────────────┐
│ 1. Tem erro/bug?        │ → bug_fixing (MÁXIMA PRIORIDADE)
└─────────────────────────┘
  ↓ (não)
┌─────────────────────────┐
│ 2. Tem #impl + CARD?    │ → code_implementation
└─────────────────────────┘
  ↓ (não)
┌─────────────────────────┐
│ 3. Atalho #xxx?         │ → workflow do atalho
└─────────────────────────┘
  ↓ (não)
┌─────────────────────────┐
│ 4. /speckit.*?          │ → spec_kit_workflow
└─────────────────────────┘
  ↓ (não)
┌─────────────────────────┐
│ 5. Ação sobre código?   │ → review/test/refactor
└─────────────────────────┘
  ↓ (não)
┌─────────────────────────┐
│ 6. Nova feature?        │ → card_generation ⭐
│    (criar, quero)       │    (CARD-FIRST!)
└─────────────────────────┘
  ↓ (não)
┌─────────────────────────┐
│ 7. DEFAULT              │ → consultation
└─────────────────────────┘
```

---

## 🎯 WORKFLOW MAPPING

| Padrão | Workflow | Persona | Skills JIT | Exemplo |
|--------|----------|---------|-----------|---------|
| "Quero criar..." | card_generation | PO | [3 skills] | "Quero CRUD de produtos" |
| "#impl CARD-001" | code_implementation | SWE | [4 skills] | "#impl CARD-001" |
| "Revise..." | code_review | Reviewer | [2 skills] | "Revise ProductService" |
| "Erro: NPE..." | bug_fixing | Debugger | [2 skills] | "Erro no login" |
| "#test..." | test_generation | QA | [3 skills] | "#test ProductService" |
| "Como...?" | consultation | Architect | [2 skills] | "Como fazer OAuth?" |

---

## 🚀 ATALHOS DISPONÍVEIS

- `#new` → card_generation
- `#impl CARD-XXX` → code_implementation
- `#review` → code_review
- `#test` → test_generation
- `#bug` → bug_fixing
- `#refactor` → refactoring
- `#deploy` → devops
- `#db` → database
- `#security` → security_audit
- `/speckit.specify` → spec_kit_workflow

---

## ✅ REGRA DE OURO: CARD-FIRST

**ANTES de implementar código novo, SEMPRE criar um Card.**

```
"Quero criar X"      → card_generation (NÃO code_implementation!)
"Crie um projeto Y"  → card_generation
"Desenvolva Z"       → card_generation (se não há CARD-XXX)
```

**Exceção:** Implementação com `#impl CARD-XXX` (card já existe)

---

**Versão:** 3.5.0
**Status:** PRODUCTION READY
**Compatível com:** Prompt OS v3.5 (JIT Loading)
