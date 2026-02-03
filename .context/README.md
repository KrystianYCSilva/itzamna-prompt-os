# .context/ - AI Context Hub

> **Itzamna PromptOS v2.1.0** | Prompt-Based Architecture
> **Atualizado:** 2026-02-03

---

## Quick Start (Para AI Agents)

### Passo 1: Bootstrap
```
1. Leia este arquivo
2. Carregue .prompt-os/PROMPTOS.md (entry point principal)
3. Siga as instruções do PROMPTOS.md para carregar protocolos
```

### Passo 2: Regras Obrigatórias
```
1. Carregue standards/architectural-rules.md (T0 - ABSOLUTO)
2. Consulte _meta/tech-stack.md para contexto do projeto
3. Siga o tier system para resolução de conflitos
```

### Passo 3: Execução
```
1. Classifique o input usando INPUT-CLASSIFIER.md
2. Carregue skills/protocolos necessários (JIT)
3. Siga Human Gate para operações de escrita
```

---

## Estrutura de Diretórios

```
.context/
├── README.md                    # Este arquivo - Hub de navegação
├── ai-assistant-guide.md        # Protocolo completo para AIs
│
├── _meta/                       # T2: Contexto e Decisões
│   ├── project-overview.md      # Visão geral do projeto
│   ├── tech-stack.md            # Stack técnica
│   └── key-decisions.md         # ADRs consolidados
│
├── standards/                   # T0-T1: Regras e Padrões
│   ├── architectural-rules.md   # T0: ABSOLUTO - Nunca violar
│   ├── code-quality.md          # T1: SOLID, Clean Code
│   └── testing-strategy.md      # T1: TDD, cobertura
│
├── patterns/                    # T1: Blueprints
│   └── architectural-overview.md
│
├── examples/                    # T3: Exemplos de código
│   └── clean-architecture-structure.md
│
├── workflows/                   # Fluxos de trabalho
│   └── development-workflows.md
│
└── troubleshooting/             # Erros comuns
    └── common-issues.md
```

---

## Tier System (Hierarquia de Precedência)

| Tier | Tipo | Autoridade | Prevalece Sobre | Diretório |
|------|------|------------|-----------------|-----------|
| **T0** | Enforcement | ABSOLUTA | Todos | `standards/architectural-rules.md` |
| **T1** | Standards | NORMATIVA | T2, T3 | `standards/`, `patterns/` |
| **T2** | Context | INFORMATIVA | T3 | `_meta/` |
| **T3** | Examples | ILUSTRATIVA | Nenhum | `examples/` |

### Lógica de Resolução de Conflitos

```
IF T0 conflita com qualquer tier → T0 VENCE
IF T1 conflita com T2 ou T3 → T1 VENCE
IF T2 conflita com T3 → T2 VENCE
ALWAYS cite a regra específica (ID) na resposta
```

---

## Integração com PromptOS

### Entry Point Principal
```
.prompt-os/PROMPTOS.md → Entry point para AI agents
```

### Protocolos Core
| Protocolo | Arquivo | Propósito |
|-----------|---------|-----------|
| Self-Critique | `.prompt-os/core/SELF-CRITIQUE.md` | Avaliação de qualidade |
| Auto-Increment | `.prompt-os/core/AUTO-INCREMENT.md` | Detecção de gaps |
| Web Research | `.prompt-os/core/WEB-RESEARCH.md` | Metodologia de pesquisa |
| Knowledge Base | `.prompt-os/core/KNOWLEDGE-BASE.md` | Gestão de conhecimento |
| Persona Generator | `.prompt-os/core/PERSONA-GENERATOR.md` | Criação de personas |
| Input Classifier | `.prompt-os/core/INPUT-CLASSIFIER.md` | Classificação de input |
| JIT Protocol | `.prompt-os/core/JIT-PROTOCOL.md` | Carregamento sob demanda |
| Human Gate | `.prompt-os/core/HUMAN-GATE.md` | Aprovação humana |
| Memory Management | `.prompt-os/core/MEMORY-MANAGEMENT.md` | Gestão de memória (3 camadas) |

### Constitution
```
.prompt-os/CONSTITUTION.md → Regras T0/T1/T2 detalhadas
```

---

## Para Diferentes Agentes

### Claude Code
```
Ver: CLAUDE.md (root) → Bootstrap específico para Claude
```

### Cursor IDE
```
Ver: .cursorrules (root) → Regras para Cursor
```

### GitHub Copilot
```
Ver: AGENTS.md (root) → Bootstrap genérico
```

### Outros Agentes
```
Qualquer agente pode ler .prompt-os/PROMPTOS.md e seguir as instruções
```

---

## Referências Rápidas

| Necessidade | Arquivo |
|-------------|---------|
| Entender o projeto | `_meta/project-overview.md` |
| Ver tecnologias | `_meta/tech-stack.md` |
| Decisões arquiteturais | `_meta/key-decisions.md` |
| Regras obrigatórias | `standards/architectural-rules.md` |
| Qualidade de código | `standards/code-quality.md` |
| Estratégia de testes | `standards/testing-strategy.md` |
| Padrões arquiteturais | `patterns/architectural-overview.md` |
| Exemplos de código | `examples/` |
| Fluxos de trabalho | `workflows/development-workflows.md` |
| Problemas comuns | `troubleshooting/common-issues.md` |

---

## Checklist de Conformidade

### Nível Básico (Mínimo)
- [x] AGENTS.md criado
- [x] MEMORY.md criado
- [x] .context/README.md criado
- [x] .context/_meta/tech-stack.md criado
- [x] .context/standards/architectural-rules.md criado

### Nível Completo (Atual)
- [x] CLAUDE.md criado
- [x] .cursorrules criado
- [x] .context/ai-assistant-guide.md criado
- [x] .context/_meta/project-overview.md criado
- [x] .context/_meta/key-decisions.md criado
- [x] .context/standards/code-quality.md criado
- [x] .context/standards/testing-strategy.md criado
- [x] .context/patterns/ populado
- [x] .context/examples/ populado
- [x] .context/workflows/ populado
- [x] .context/troubleshooting/ populado

---

*Itzamna PromptOS v2.1.0 | Prompt-Based Architecture | 2026-02-03*
