# ESPECIFICACAO-TECNICA-V1.md
## Prompt OS - Versão Piloto (MVP)
**Status:** Especificação Inicial para Desenvolvimento
**Objetivo:** Estabelecer a infraestrutura base do Sistema Operacional Cognitivo (AIOS).

---

## 1. Fundamentos Arquiteturais (Kernel Piloto)

O objetivo do Piloto é validar a separação entre o "Kernel" (no projeto) e o "Cérebro" (externo).

### 1.1 O Kernel Mínimo (`AGENTS.md`)
Arquivo de manifesto a ser criado na raiz dos projetos monitorados.
- **Função:** Pointer para o repositório de skills e definição básica da stack.
- **Implementação Piloto:** Estrutura YAML simples apontando para o diretório local de skills.

### 1.2 Repositório Central de Conhecimento
Para o piloto, criaremos uma estrutura de diretórios padronizada para armazenar as Skills e Personas, evitando duplicação.
- **Localização Sugerida:** `~/src/prompt-os/` (ou diretório relativo durante dev).
- **Estrutura:** Pastas separadas para `skills/`, `personas/` e `core/`.

---

## 2. Arquitetura Cognitiva (Conceito PromptSO)

Aplicação prática da teoria de níveis cognitivos para organizar os prompts do Piloto.

| Nível | Função | Implementação no Piloto |
|-------|--------|-------------------------|
| **L1** | **Instintivo** | Prompts rápidos para correções de sintaxe e linting. |
| **L2** | **Contextual** | Prompts para revisão de código e análise de segurança básica. |
| **L3** | **Estratégico** | Prompts para planejamento de arquitetura e design de sistemas. |

---

## 3. Engenharia de Personas e Skills (Modularidade)

### 3.1 Personas Modulares
Evitar personas gigantescas desde o início.
- **Conceito:** Criar uma "Persona Base" e "Módulos de Especialidade".
- **Ação:** No piloto, permitir que uma persona carregue 1 ou 2 listas de skills adicionais via referência.

### 3.2 Estratégia Multi-Modelo
Preparar o sistema para lidar com diferentes tipos de LLMs.
- **Chat (GPT/Claude):** Templates com instruções de sistema detalhadas.
- **Raciocínio (DeepSeek/o1):** Templates simplificados focados na tarefa (User Prompts).

---

## 4. Workflows de Assertividade

### 4.1 Ciclo de Qualidade Básico
Implementar um fluxo simples de verificação no piloto:
1. **Gerar:** O agente cria o código.
2. **Criticar:** Um prompt secundário verifica se requisitos básicos foram atendidos.
3. **Entregar:** Apenas após a verificação.

### 4.2 Padronização MCP
Utilizar o conceito de MCP (Model Context Protocol) para estruturar como o agente acessa ferramentas (ex: leitura de arquivos), mesmo que simulado inicialmente.

---

## 5. Estrutura de Pastas do Piloto

```text
.prompt-os/                  # Raiz do Projeto Piloto
├── core/                    # Prompts do Sistema (Kernel)
│   ├── router.md            # Classificador de intenção
│   └── memory.md            # Template de memória
├── personas/                # Definições de Agentes
│   ├── base/                # Personas Base
│   └── modules/             # Módulos acopláveis
├── skills/                  # Banco de Conhecimento
│   ├── academic/            # Conceitos Teóricos
│   └── technical/           # Ferramentas Práticas
└── templates/               # Arquivos .md modelo
```