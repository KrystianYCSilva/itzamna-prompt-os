# PromptOS Structure Examples - T3 (Illustrative)

> **Tier**: T3 - Ilustrativo. Exemplos de como estruturar componentes no PromptOS v2.0.0.
> **Versão:** 2.0.0 | **Arquitetura:** Prompt-Based

## Estrutura do Sistema PromptOS

### Estrutura Completa

```
itzamna-prompt-os/
│
├── .prompt-os/                      # Core do Sistema (Prompt-Based)
│   ├── PROMPTOS.md                  # 📖 ENTRY POINT - Leia primeiro!
│   ├── CONSTITUTION.md              # ⚖️ Regras T0/T1/T2
│   ├── MEMORY.md                    # 🧠 Estado persistente
│   │
│   ├── core/                        # Protocolos comportamentais
│   │   ├── SELF-CRITIQUE.md         # Avaliação de qualidade
│   │   ├── AUTO-INCREMENT.md        # Detecção de gaps
│   │   ├── WEB-RESEARCH.md          # Metodologia de pesquisa
│   │   ├── KNOWLEDGE-BASE.md        # Gestão de conhecimento
│   │   ├── PERSONA-GENERATOR.md     # Criação de personas
│   │   ├── INPUT-CLASSIFIER.md      # Classificação de input
│   │   └── JIT-PROTOCOL.md          # Carregamento otimizado
│   │
│   ├── templates/                   # Templates canônicos
│   │   ├── SKILL.template.md
│   │   └── PERSONA.template.md
│   │
│   └── tools/                       # CLIs opcionais (para humanos)
│       └── brain.js                 # Helper interativo
│
├── skills/                          # Biblioteca de Skills (17 skills)
│   ├── INDEX.md                     # Índice navegável
│   ├── frontend/                    # HTML, CSS
│   ├── backend/                     # API, TypeScript, GraphQL
│   ├── config/                      # YAML, JSON, Properties
│   ├── markup/                      # XML, XSLT, Markdown
│   ├── devops/                      # Docker, Git
│   ├── docs/                        # Technical Writing
│   └── testing/                     # Test skills
│
├── personas/                        # Biblioteca de Personas
│   ├── INDEX.md
│   └── senior-fullstack-developer/
│       └── PERSONA.md
│
├── .context/                        # Contexto para AI Agents
│   ├── README.md                    # Hub de navegação
│   ├── ai-assistant-guide.md        # Guia completo
│   ├── _meta/                       # Contexto do projeto (T2)
│   ├── standards/                   # Regras e padrões (T0-T1)
│   ├── patterns/                    # Blueprints (T1)
│   ├── examples/                    # Este diretório (T3)
│   ├── workflows/                   # Fluxos de trabalho
│   └── troubleshooting/             # Problemas comuns
│
├── AGENTS.md                        # Bootstrap para GitHub Copilot
├── CLAUDE.md                        # Bootstrap para Claude
├── MEMORY.md                        # Estado persistente (root)
└── .cursorrules                     # Bootstrap para Cursor
```

## Exemplo de Skill

### Estrutura de uma Skill

```
skills/devops/docker/
└── SKILL.md
```

### Conteúdo da Skill

```markdown
---
name: docker-containerization
category: devops
level: L2
tokens: ~800
last_updated: 2026-02-02
sources:
  - https://docs.docker.com/
  - https://12factor.net/
---

# Docker Containerization

## Descrição
Padrões e práticas para containerização de aplicações usando Docker, seguindo 
os 12 fatores e melhores práticas de segurança.

## Quando Usar
- Containerizar aplicações para deployment
- Criar imagens Docker otimizadas
- Configurar multi-stage builds

## Guidelines

### Estrutura de Dockerfile
```dockerfile
# Etapa 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Etapa 2: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Práticas Obrigatórias
- Usar multi-stage builds
- Não rodar como root (USER node)
- Especificar versões exatas de imagens
- Usar .dockerignore

## Exemplos

### Exemplo 1: API Node.js
[código do exemplo]

### Exemplo 2: Aplicação Python
[código do exemplo]

## Restrições
- NUNCA incluir secrets no Dockerfile
- NUNCA usar :latest em produção
- SEMPRE especificar HEALTHCHECK

## Referências
- [Docker Documentation](https://docs.docker.com/) - Acessado 2026-02-02
- [12 Factor App](https://12factor.net/) - Acessado 2026-02-02
```

## Exemplo de Persona

### Estrutura de uma Persona

```
personas/senior-fullstack-developer/
└── PERSONA.md
```

### Conteúdo da Persona

```markdown
---
name: senior-fullstack-developer
role: Software Engineer
level: Senior
skills:
  - clean-code
  - api-design
  - typescript
  - testing
  - docker
domains:
  - frontend
  - backend
  - devops
---

# Senior Fullstack Developer

## Perfil
Desenvolvedor sênior com expertise em frontend e backend, focado em 
arquitetura limpa e práticas modernas de desenvolvimento.

## Domínios de Expertise
- **Frontend**: React, TypeScript, HTML/CSS
- **Backend**: Node.js, APIs REST/GraphQL
- **DevOps**: Docker, CI/CD

## Skills Compostas
1. `clean-code` - Princípios de código limpo
2. `api-design` - Design de APIs RESTful
3. `typescript` - Desenvolvimento TypeScript
4. `testing` - Estratégias de teste
5. `docker` - Containerização

## Comportamentos
- Prioriza legibilidade sobre cleverness
- Escreve testes antes de código
- Documenta decisões importantes
- Segue SOLID e Clean Architecture

## Quando Ativar
- Pedidos de implementação de features
- Refatoração de código
- Revisão de código
- Discussões de arquitetura

## Exemplo de Uso
Usuário: "#impl CARD-001 - Criar CRUD de produtos"
→ Persona ativada: Senior Fullstack Developer
→ Skills carregadas: api-design, typescript, clean-code, testing
```

## Exemplo de Protocolo

### Estrutura de um Protocolo

```
.prompt-os/core/
└── SELF-CRITIQUE.md
```

### Padrão de Protocolo

```markdown
# SELF-CRITIQUE PROTOCOL

## Propósito
Avaliar qualidade de artefatos gerados antes do Human Gate.

## Quando Executar
- Após gerar qualquer artefato L2/L3
- Antes de apresentar ao Human Gate

## Steps

### Step 1: Checklist de Completude
□ Todas seções obrigatórias presentes?
□ Frontmatter YAML válido?
□ Mínimo 2 exemplos incluídos?
□ Fontes citadas?

### Step 2: Avaliar Qualidade
- Clareza: 0-25 pontos
- Completude: 0-25 pontos
- Exemplos: 0-25 pontos
- Conformidade: 0-25 pontos

### Step 3: Gerar Score
Score Total = soma dos 4 critérios (0-100)

### Step 4: Decisão
- >= 90: Excelente, prosseguir
- 70-89: Bom, prosseguir
- < 70: MELHORAR antes de continuar

### Step 5: Sugestões
Listar mínimo 3 sugestões de melhoria.

## Output Format
```
Confidence Score: [score]/100
Strengths: [pontos fortes]
Improvements: [sugestões]
Decision: [prosseguir/melhorar]
```

## Exemplo
[exemplo de aplicação do protocolo]
```

## Padrões de Nomenclatura

### Arquivos
| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Skills | `SKILL.md` | `skills/devops/docker/SKILL.md` |
| Personas | `PERSONA.md` | `personas/qa-engineer/PERSONA.md` |
| Protocolos | `[NOME].md` | `.prompt-os/core/SELF-CRITIQUE.md` |
| Índices | `INDEX.md` | `skills/INDEX.md` |

### Diretórios
| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Skills | `kebab-case` | `skills/backend/api-design/` |
| Personas | `kebab-case` | `personas/senior-fullstack-developer/` |
| Categorias | lowercase | `skills/frontend/`, `skills/backend/` |

### Commits
```
feat(skills): add Docker containerization skill
fix(core): correct JIT loading protocol
docs(readme): update project structure
refactor(personas): simplify fullstack developer
```

---

*Itzamna PromptOS v2.0.0 | Examples | T3 Illustrative | 2026-02-02*