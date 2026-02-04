# 🧠 PromptOS Brain - Resumo Executivo

## O Que É

Um **sistema auto-evolutivo** que gera skills, personas e prompts automaticamente para o PromptOS, com **aprovação humana obrigatória** antes de persistir.

## Fluxo Principal

```
Usuário pede → Pesquisa → Gera → Valida → HUMANO APROVA → Salva
```

## Arquitetura Simplificada (CoALA)

```
┌─────────────────────────────────────────────────────────────┐
│                    GLOBAL WORKSPACE                         │
│           (foco atual + contexto ~10K tokens)               │
├─────────────────────────────────────────────────────────────┤
│     RECALL          │     REASON          │      ACT        │
│   (4 memórias)      │      (LLM)          │    (Tools)      │
│ • Working (sessão)  │ • Classify          │ • Web Search    │
│ • Episodic (hist)   │ • Generate          │ • File Ops      │
│ • Semantic (know)   │ • Validate          │ • Human Gate    │
│ • Procedural (skill)│                     │                 │
└─────────────────────────────────────────────────────────────┘
```

## Níveis Cognitivos

| Nível | Função | Aprovação | Exemplo |
|-------|--------|-----------|---------|
| L1 | Automático | Auto | Linting, boilerplate |
| L2 | Contextual | **Humana** | Gerar skill, code review |
| L3 | Estratégico | **Dupla** | Arquitetura, personas |

## Comandos Principais

```bash
# Gerar
brain generate skill "API GraphQL com Apollo"
brain generate persona "DevOps Engineer"

# Listar
brain list skills

# Buscar
brain search "react"
```

## Integração Spec-Kit

| Cenário | Ação |
|---------|------|
| Skill simples (<3 dias) | `brain generate` direto |
| Feature complexa (>5 dias) | Sugere `/speckit.specify` |
| Sistema formal | Obrigatório Spec-Kit |

## Estrutura de Diretórios

```
~/src/prompt-os/
├── core/brain-config.yaml      # Configuração
├── skills/generated/           # Skills geradas
├── personas/generated/         # Personas geradas
├── prompts/generated/          # Prompts gerados
├── memory/                     # Sistema de memórias
├── templates/                  # Templates canônicos
├── scripts/brain.js           # CLI principal
└── MEMORY.md                   # Estado persistente
```

## Fases de Implementação

| Fase | Duração | Entregáveis |
|------|---------|-------------|
| **1. MVP** | 2 semanas | CLI funcional, templates, human gate |
| **2. Integração** | 2 semanas | Spec-Kit, web search, Slack |
| **3. Inteligência** | 3 semanas | Embeddings, meta-agent, analytics |
| **4. Escala** | Contínuo | Mais domínios, MCP, marketplace |

## Documentos Gerados

1. **PROMPTOS-BRAIN-BLUEPRINT-V1.md** (1.500+ linhas)
   - Arquitetura completa
   - Sistema de memórias
   - Templates canônicos
   - Fluxo de auto-geração
   - Plano de implementação

2. **PROMPTOS-BRAIN-IMPLEMENTATION-GUIDE.md** (800+ linhas)
   - Scripts completos (brain.js)
   - Setup automatizado
   - Integração Spec-Kit
   - Workflows detalhados
   - Troubleshooting

## Próximos Passos

1. ✅ Ler documentos gerados
2. Executar `setup-promptos-brain.sh`
3. Copiar `brain.js` para scripts/
4. Gerar primeira skill de teste
5. Iterar e refinar

---

**Versão:** 1.0.0 | **Data:** 2026-02-02
