# Tech Stack - Itzamna PromptOS v2.0.0

> **Versão:** 2.0.0 | **Arquitetura:** Prompt-Based
> **Última Atualização:** 2026-02-02

---

## Overview

Itzamna PromptOS é um sistema operacional cognitivo com **arquitetura prompt-based**. O core do sistema são arquivos Markdown que AI agents leem e seguem - não há código que precisa ser executado para o sistema funcionar.

---

## Arquitetura Prompt-Based

### Core (Sem Dependências de Runtime)

| Componente | Formato | Propósito |
|------------|---------|-----------|
| Entry Point | `.prompt-os/PROMPTOS.md` | Ponto de entrada para AI agents |
| Constitution | `.prompt-os/CONSTITUTION.md` | Regras T0/T1/T2 |
| Protocols | `.prompt-os/core/*.md` | Protocolos comportamentais |
| Skills | `skills/**/*.md` | Biblioteca de conhecimento |
| Personas | `personas/**/*.md` | Perfis especializados |
| Context | `.context/**/*.md` | Contexto estruturado |

### Insight Chave

```
O sistema funciona quando um AI agent:
1. Lê os arquivos Markdown
2. Segue as instruções contidas neles
3. Comporta-se conforme os protocolos

Não há código para executar. São instruções para seguir.
```

---

## Linguagens e Formatos

### Core System (Prompt-Based)

| Formato | Uso | Exemplos |
|---------|-----|----------|
| **Markdown** | Core do sistema | `PROMPTOS.md`, `core/*.md`, `skills/*.md` |
| **YAML Frontmatter** | Metadados estruturados | Headers em skills e personas |

### Tools Opcionais (Para Humanos)

| Linguagem | Uso | Status |
|-----------|-----|--------|
| **JavaScript/Node.js** | CLI helper (`brain.js`) | Opcional |
| **PowerShell** | Scripts de automação | Opcional |
| **Python** | Scripts legacy | Deprecado |

**Importante:** Os tools são OPCIONAIS. O sistema funciona sem eles.

---

## Estrutura de Arquivos

### Core System

```
.prompt-os/
├── PROMPTOS.md              # Entry point - AI lê primeiro
├── CONSTITUTION.md          # Regras T0/T1/T2
└── core/                    # Protocolos comportamentais
    ├── SELF-CRITIQUE.md
    ├── AUTO-INCREMENT.md
    ├── WEB-RESEARCH.md
    ├── KNOWLEDGE-BASE.md
    ├── PERSONA-GENERATOR.md
    ├── INPUT-CLASSIFIER.md
    └── JIT-PROTOCOL.md
```

### Knowledge

```
skills/                      # 17 skills em 7 categorias
├── INDEX.md
├── frontend/               # HTML, CSS
├── backend/                # API, TypeScript, GraphQL
├── config/                 # YAML, JSON, Properties
├── markup/                 # XML, XSLT, Markdown
├── devops/                 # Docker, Git
├── docs/                   # Technical Writing
└── testing/                # Test skills

personas/                   # 1 persona
├── INDEX.md
└── senior-fullstack-developer/
```

### Context

```
.context/                   # Contexto estruturado (RFC)
├── README.md               # Hub de navegação
├── ai-assistant-guide.md   # Guia completo para AIs
├── _meta/                  # Contexto do projeto
├── standards/              # Regras e padrões
├── patterns/               # Blueprints
├── examples/               # Exemplos
├── workflows/              # Fluxos de trabalho
└── troubleshooting/        # Problemas comuns
```

---

## Compatibilidade

### AI Agents Suportados

| Agent | Config | Como Usar |
|-------|--------|-----------|
| **Claude Code** | `.claude/`, `CLAUDE.md` | Lê PROMPTOS.md |
| **Cursor** | `.cursor/`, `.cursorrules` | Lê .cursorrules |
| **GitHub Copilot** | `AGENTS.md` | Lê AGENTS.md |
| **Gemini CLI** | `.gemini/` | Lê PROMPTOS.md |
| **Qwen** | `.qwen/` | Lê PROMPTOS.md |
| **OpenCode** | `.opencode/` | Lê PROMPTOS.md |
| **Qualquer LLM** | - | Lê PROMPTOS.md |

### Requisitos Mínimos

Para funcionar, o AI agent precisa apenas:
1. Conseguir ler arquivos Markdown
2. Seguir instruções estruturadas
3. Manter contexto durante a conversa

**Não precisa de:**
- Node.js
- Python
- Qualquer runtime específico

---

## Optional Tools

### brain.js (Helper CLI)

```bash
# Localização
.prompt-os/tools/brain.js

# Uso (opcional)
node .prompt-os/tools/brain.js generate skill "Docker" --category devops
```

**Propósito:** Ajudar humanos a gerar skills interativamente.

### sync-constitution.ps1

```powershell
# Localização
.prompt-os/scripts/sync-constitution.ps1

# Uso
.\.prompt-os\scripts\sync-constitution.ps1 push
```

**Propósito:** Sincronizar constitution entre diferentes agent configs.

---

## Tier System

| Tier | Autoridade | Arquivos |
|------|------------|----------|
| **T0** | ABSOLUTA | `CONSTITUTION.md` (T0), `standards/architectural-rules.md` |
| **T1** | NORMATIVA | `CONSTITUTION.md` (T1), `standards/code-quality.md` |
| **T2** | INFORMATIVA | `_meta/`, `CONSTITUTION.md` (T2) |
| **T3** | ILUSTRATIVA | `examples/`, `skills/` |

---

## Integrações

### Spec-Kit

```
.specify/
└── memory/
    └── constitution.md    # Source of truth para constitution
```

### Agent Configs

```
.claude/                   # Claude Code
.qwen/                     # Qwen
.gemini/                   # Gemini CLI
.cursor/                   # Cursor IDE
.opencode/                 # OpenCode
```

---

## Métricas do Sistema

```yaml
# Core
entry_point: .prompt-os/PROMPTOS.md
protocols: 7
skills: 17
personas: 1
categories: 7

# Compatibility
agents_synced: 5
cross_model: true

# Dependencies
required_runtime: none
optional_tools: 2 (brain.js, sync-constitution.ps1)
```

---

*Itzamna PromptOS v2.0.0 | Tech Stack | 2026-02-02*
