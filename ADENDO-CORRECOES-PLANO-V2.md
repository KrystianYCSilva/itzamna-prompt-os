# 📝 ADENDO - Correções ao Plano v2.0

> **Version:** 2.0.1 | **Data:** 2026-02-02
> **Status:** CORREÇÕES CRÍTICAS

---

## ⚠️ CORREÇÃO 1: Formato de Skills

### ❌ ERRADO (no plano original)
```
skills/
├── academic/
│   └── fundamentals/
│       └── algorithm-design.md
└── technology/
    └── cloud/
        └── docker.md
```

### ✅ CORRETO (formato obrigatório)
```
skills/
├── algorithm-design/
│   └── SKILL.md
├── docker/
│   └── SKILL.md
├── kubernetes/
│   └── SKILL.md
└── python/
    └── SKILL.md
```

**Regras:**
1. Cada skill tem seu próprio **diretório**
2. O arquivo principal é **sempre** `SKILL.md` (maiúsculo)
3. Path: `/skills/{skill-name}/SKILL.md`
4. **Não usar** subcategorias no path (category vai no YAML, não no path)

**Exemplo de criação:**
```bash
# Criar nova skill
mkdir -p skills/kubernetes
touch skills/kubernetes/SKILL.md

# Estrutura final
skills/kubernetes/SKILL.md
```

**Conteúdo do SKILL.md mantém categoria no YAML:**
```yaml
---
name: kubernetes
description: |
  Container orchestration platform...
category: technology        # Categoria aqui, não no path
subcategory: cloud          # Subcategoria aqui, não no path
...
---
```

---

## ⚠️ CORREÇÃO 2: Integração Spec-Kit

### ❌ ERRADO (no plano original)
Criamos templates para Spec-Kit em `templates/speckit/`

### ✅ CORRETO
O Spec-Kit já fornece **todos os templates e comandos** via:

```bash
# Inicialização completa
speckit init --here --ai {agente}

# Onde {agente} pode ser:
# - claude
# - gpt
# - gemini
# - cursor
```

**O que o `speckit init` cria automaticamente:**
```
.specify/
├── memory/
│   └── constitution.md      # Regras T0 do projeto
├── templates/
│   ├── spec.md              # Template de especificação
│   ├── plan.md              # Template de plano técnico
│   └── tasks.md             # Template de tasks
└── config.yaml              # Configuração do Spec-Kit
```

**Removido do PromptOS (redundante):**
- ~~`templates/speckit/spec-template.md`~~
- ~~`templates/speckit/plan-template.md`~~
- ~~`templates/speckit/tasks-template.md`~~

### Integração Simplificada

O PromptOS **apenas**:
1. Detecta comandos `/speckit.*` no input
2. Delega para o Spec-Kit instalado
3. Sincroniza `constitution.md` ↔ `architectural-rules.md`

**Script de sync permanece:**
```powershell
# scripts/sync-constitution.ps1
# Sincroniza entre PromptOS e Spec-Kit
```

---

## 📂 ESTRUTURA CORRIGIDA DO PROJETO

```
{project-root}/
│
├── AGENTS.md                          # Kernel PromptOS
├── MEMORY.md                          # Estado persistente
│
├── skills/                            # Skills do PromptOS
│   ├── {skill-name}/                  # Diretório por skill
│   │   └── SKILL.md                   # Arquivo da skill
│   ├── docker/
│   │   └── SKILL.md
│   ├── kubernetes/
│   │   └── SKILL.md
│   └── INDEX.md                       # Índice de skills
│
├── personas/                          # Personas do PromptOS
│   ├── {persona-name}/
│   │   └── PERSONA.md
│   └── INDEX.md
│
├── .prompt-os/                        # Internals do PromptOS
│   ├── core/
│   │   ├── input-classifier.md
│   │   ├── master-router.md
│   │   └── loading-protocol.md
│   ├── templates/
│   │   ├── auto-increment/
│   │   │   ├── skill-generator.prompt.md
│   │   │   ├── persona-generator.prompt.md
│   │   │   ├── research-pipeline.prompt.md
│   │   │   └── human-gate-protocol.md
│   │   └── context/
│   │       ├── AGENTS.template.md
│   │       └── MEMORY.template.md
│   ├── scripts/
│   │   ├── validate-skill.ps1
│   │   ├── sync-index.ps1
│   │   └── sync-constitution.ps1
│   └── prompts/
│       ├── research.prompt.md
│       ├── generation.prompt.md
│       └── validation.prompt.md
│
├── .specify/                          # ← GERADO PELO SPEC-KIT
│   ├── memory/
│   │   └── constitution.md
│   ├── templates/                     # ← Templates do Spec-Kit (não criar)
│   │   ├── spec.md
│   │   ├── plan.md
│   │   └── tasks.md
│   └── config.yaml
│
├── .context/                          # Contexto do projeto
│   ├── _meta/
│   │   └── tech-stack.md
│   └── standards/
│       └── architectural-rules.md
│
├── docs/
│   ├── cards/                         # Tasks ágeis (PromptOS)
│   ├── specs/                         # Especificações (Spec-Kit)
│   └── pesquisa-previa/               # Pesquisas antes de gerar
│
└── GLOSSARIO-TECNICO.md               # Referência de termos
```

---

## 🔄 FLUXO DE INICIALIZAÇÃO CORRIGIDO

### Para Projeto Novo

```bash
# 1. Inicializar PromptOS
# (criar AGENTS.md, MEMORY.md, estrutura base)

# 2. Inicializar Spec-Kit
speckit init --here --ai claude

# 3. Sync inicial
./scripts/sync-constitution.ps1

# 4. Verificar estrutura
ls -la .specify/    # Criado pelo Spec-Kit
ls -la skills/      # Criar manualmente ou via generator
```

### Para Projeto Existente com Spec-Kit

```bash
# 1. Spec-Kit já existe (.specify/)

# 2. Adicionar PromptOS
# (criar AGENTS.md, MEMORY.md, skills/)

# 3. Sync constitution → architectural-rules
./scripts/sync-constitution.ps1 -Direction speckit-to-promptos

# 4. Mapear specs existentes no MEMORY.md
```

---

## 📋 CHECKLIST ATUALIZADO

### Fase 1: Foundation (CORRIGIDO)

- [ ] Criar estrutura de skills: `skills/{name}/SKILL.md`
- [ ] Criar AGENTS.md v2.0
- [ ] Criar MEMORY.md v2.0
- [ ] Criar templates em `.prompt-os/templates/`
- [ ] **NÃO criar** templates do Spec-Kit (usar `speckit init`)
- [ ] Adicionar GLOSSARIO-TECNICO.md

### Fase 4: Spec-Kit Integration (SIMPLIFICADO)

- [ ] Executar `speckit init --here --ai claude`
- [ ] Criar script `sync-constitution.ps1`
- [ ] Integrar detecção de `/speckit.*` no input-classifier
- [ ] Testar sync bidirecional

---

## 🎯 RESUMO DAS MUDANÇAS

| Item | Antes | Depois |
|------|-------|--------|
| **Path de skill** | `skills/category/subcategory/name.md` | `skills/{name}/SKILL.md` |
| **Arquivo de skill** | `{name}.md` | `SKILL.md` (maiúsculo) |
| **Templates Spec-Kit** | Criar em `templates/speckit/` | Usar `speckit init` |
| **Glossário** | Não existia | `GLOSSARIO-TECNICO.md` |

---

**Aplicar estas correções antes de iniciar implementação!**
