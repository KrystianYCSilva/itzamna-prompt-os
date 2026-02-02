# Itzamna PromptOS - Guia Completo

## Visão Geral do Projeto

Itzamna PromptOS é um sistema operacional cognitivo baseado em prompts para programação paralela humano-agente. Diferente de frameworks baseados em código, o PromptOS funciona como uma coleção de **arquivos Markdown** que agentes de IA **leem e seguem** como instruções.

### Arquitetura Principal

O sistema utiliza uma abordagem **prompt-based** (baseada em prompts) em vez de code-centric (baseada em código):

- **Versão Atual:** v2.0.0 (Prompt-Based Architecture)
- **Filosofia:** "PromptOS é um conjunto de arquivos Markdown que agentes de IA leem e seguem. Nenhuma execução de código é necessária para o funcionamento do sistema principal."
- **Compatibilidade:** Funciona com qualquer agente de IA que possa ler Markdown (Claude, GPT, Gemini, Cursor, Copilot, Qwen, etc.)

### Componentes Principais

1. **.prompt-os/** - Sistema principal baseado em prompts
   - `PROMPTOS.md` - Ponto de entrada principal
   - `CONSTITUTION.md` - Regras T0/T1/T2 invioláveis
   - `core/` - Protocolos comportamentais
   - `templates/` - Templates canônicos
   - `tools/` - Ferramentas opcionais para humanos

2. **.context/** - Contexto para agentes de IA
   - `standards/` - Regras arquiteturais (T0, T1) e qualidade de código
   - `_meta/` - Informações contextuais do projeto
   - `patterns/` - Blueprints arquiteturais
   - `examples/` - Exemplos de código
   - `workflows/` - Fluxos de trabalho
   - `troubleshooting/` - Solução de problemas comuns

3. **skills/** - Biblioteca de habilidades (17 no total, em 7 categorias)
   - Organizadas por domínio (frontend, backend, devops, etc.)
   - Cada skill contém descrição, exemplos e restrições

4. **personas/** - Biblioteca de perfis especializados
   - `senior-fullstack-developer` - Persona atual disponível

## Como o Sistema Funciona

### Para Agentes de IA

1. **Leia o ponto de entrada:** `.prompt-os/PROMPTOS.md`
2. **Siga as instruções para carregar:**
   - `CONSTITUTION.md` (regras invioláveis)
   - Protocolos em `core/` (conforme necessário)
   - Skills em `skills/` (sob demanda)
   - Personas em `personas/` (conforme apropriado)

3. **Siga o protocolo JIT (Just-In-Time):**
   - Carregue apenas o contexto necessário para a tarefa
   - Não carregue todos os arquivos de uma vez
   - Objetivo: 10-16KB por tarefa (não 50KB+)

### Para Humanos

1. **Configuração:** Basta clonar o repositório - o sistema está pronto
2. **Uso opcional:** CLI tools em `.prompt-os/tools/` para auxílio
3. **Protocolo Human Gate:** Todas as operações de escrita requerem aprovação humana

## Protocolos Principais

### Core Protocols (em .prompt-os/core/)

1. **SELF-CRITIQUE.md** - Avaliação de qualidade antes do Human Gate
2. **AUTO-INCREMENT.md** - Detecção de gaps e aprendizado com rejeições
3. **WEB-RESEARCH.md** - Metodologia de pesquisa e validação de fontes
4. **KNOWLEDGE-BASE.md** - Gestão de conhecimento e relações entre skills
5. **PERSONA-GENERATOR.md** - Criação e composição de personas
6. **INPUT-CLASSIFIER.md** - Classificação de inputs do usuário
7. **JIT-PROTOCOL.md** - Carregamento otimizado de contexto

### Tier System (Sistema de Hierarquia)

| Tier | Tipo | Autoridade | Diretório |
|------|------|------------|-----------|
| **T0** | Enforcement | ABSOLUTA | `standards/architectural-rules.md` |
| **T1** | Standards | NORMATIVA | `standards/`, `patterns/` |
| **T2** | Context | INFORMATIVA | `_meta/` |
| **T3** | Examples | ILUSTRATIVA | `examples/` |

**Lógica de Resolução de Conflitos:**
- Se T0 conflita com qualquer tier → T0 VENCE
- Se T1 conflita com T2 ou T3 → T1 VENCE
- Se T2 conflita com T3 → T2 VENCE

## Regras Fundamentais (Constituição)

### T0 - Regras Invioláveis

1. **Segurança:** Nunca inclua secrets hardcoded, use SQL injection patterns ou exponha dados sensíveis
2. **Controle Humano:** Mudanças significativas requerem aprovação, nunca faça commit/push automaticamente
3. **Estrutura:** Siga CARD-FIRST para novas features, mantenha estrutura de pastas
4. **Validação:** Não afirme sucesso sem verificar, não invente APIs/métodos

### T1 - Regras Fortes

- Siga princípios SOLID
- Escreva testes para código novo
- Não duplique código (DRY)
- Funções pequenas e focadas
- Documente decisões importantes

### T2 - Convenções

- Nomenclatura: kebab-case para arquivos, PascalCase para classes, camelCase para funções
- Commits semânticos usando conventional commits
- Estilo de código consistente com o projeto existente

## Human Gate Protocol

Todas as operações de escrita passam por aprovação humana:

- **L1 (Auto-aprovado):** Leitura, formatação, correção de typos
- **L2 (Humano necessário):** Criação de skills, modificações
- **L3 (Dupla revisão):** Arquitetura, personas, mudanças estruturais

### Ações Disponíveis:
- `approve` - Proceder com commit
- `view` - Mostrar conteúdo completo
- `edit` - Permitir edição
- `reject` - Rejeitar com feedback
- `cancel` - Abortar operação

## Desenvolvimento e Contribuição

### Adicionar Nova Skill

1. Siga o protocolo `PERSONA-GENERATOR.md` (ou use `brain.js` CLI)
2. Preencha o template gerado
3. Passe pelo Human Gate de aprovação
4. A skill é adicionada a `skills/INDEX.md`

### Adicionar Nova Persona

1. Siga o protocolo `PERSONA-GENERATOR.md`
2. Componha a partir de skills existentes
3. Passe pelo Human Gate de aprovação
4. A persona é adicionada a `personas/INDEX.md`

### Adicionar Novo Protocolo

1. Crie uma SPEC em `specs/` seguindo o formato existente
2. Crie o arquivo de prompt em `.prompt-os/core/`
3. Atualize `specs/IMPLEMENTATION-STATUS.md`
4. Referencie em `PROMPTOS.md` no bootstrap

## Estrutura de Pastas

```
itzamna-prompt-os/
├── README.md                    # Visão geral do projeto
├── AGENTS.md                    # Kernel do sistema (instruções para agentes)
├── MEMORY.md                    # Estado persistente
├── ROADMAP.md                   # Plano de evolução
│
├── .prompt-os/                  # Sistema principal baseado em prompts
│   ├── PROMPTOS.md              # Ponto de entrada principal
│   ├── CONSTITUTION.md          # Regras invioláveis
│   ├── core/                    # Protocolos comportamentais
│   ├── templates/               # Templates canônicos
│   ├── tools/                   # Ferramentas opcionais
│   └── scripts/                 # Scripts utilitários
│
├── .context/                    # Contexto para agentes de IA
│   ├── README.md               # Hub de navegação
│   ├── ai-assistant-guide.md   # Protocolo completo para AIs
│   ├── _meta/                  # Contexto e decisões
│   ├── standards/              # Regras e padrões
│   ├── patterns/               # Blueprints arquiteturais
│   ├── examples/               # Exemplos de código
│   ├── workflows/              # Fluxos de trabalho
│   └── troubleshooting/        # Solução de problemas
│
├── skills/                      # Biblioteca de habilidades
│   ├── INDEX.md                # Índice de skills
│   └── {categoria}/            # Skills organizadas por categoria
│
├── personas/                    # Biblioteca de personas
│   ├── INDEX.md                # Índice de personas
│   └── {nome}/                 # Definição de persona
│
├── specs/                       # Especificações formais
├── docs/                        # Documentação adicional
└── .{agent}/                    # Configurações específicas por agente
```

## Comandos e Ferramentas

### CLI Opcional (para humanos)

```bash
# Gerar uma skill usando CLI interativo
node .prompt-os/tools/brain.js generate skill "descrição" --category categoria

# Sincronizar constituição entre agentes
.\.prompt-os\scripts\sync-constitution.ps1 push
```

### Workflows Disponíveis

| Atalho | Workflow | Quando Usar |
|--------|----------|-------------|
| `#new` | card_generation | Para novas features |
| `#impl CARD-XXX` | code_implementation | Para implementar cards existentes |
| `#test` | test_generation | Para criar testes |
| `#review` | code_review | Para revisar código |
| `#bug` | bug_fixing | Para corrigir bugs |
| `#refactor` | refactoring | Para melhorar código existente |
| `#docs` | documentation | Para criar documentação |

## Objetivos Futuros

### v2.1.0 - Enhanced Protocols
- Validação de protocolos entre diferentes modelos de IA
- Testes estruturados para protocolos
- Melhoria na documentação de criação de protocolos
- Eficiência aprimorada no carregamento JIT

### v3.0.0 - Advanced RAG Integration
- Busca semântica para skills usando embeddings
- Geração aumentada por recuperação (RAG) para criação de skills
- Gráfico de conhecimento avançado para relações entre skills

## Dicas para Uso Efetivo

1. **Comece com o ponto de entrada:** Sempre leia `.prompt-os/PROMPTOS.md` primeiro
2. **Siga o protocolo JIT:** Carregue apenas o contexto necessário
3. **Respeite o Human Gate:** Todas as operações de escrita precisam de aprovação
4. **Use o tier system:** Siga a hierarquia de precedência para resolver conflitos
5. **Aplique self-critique:** Avalie seu próprio trabalho antes de entregar
6. **Mantenha-se dentro das regras T0:** Elas são invioláveis e devem sempre ser seguidas

O Itzamna PromptOS representa uma abordagem inovadora para programação assistida por IA, onde o foco está em instruções claras e estruturadas em vez de execução de código, permitindo compatibilidade universal com diferentes agentes de IA.