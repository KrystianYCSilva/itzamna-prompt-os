# PLANO PARA PROJETO: PROMPT OS (Itzamna)
> **Versão Piloto:** Implementação inicial da arquitetura de Sistema Operacional Cognitivo, focada em modularidade e orquestração de prompts.
> **Escopo do Piloto:** núcleo mínimo (kernel leve + skills JIT), validação humana e interoperabilidade cross-model. Evitar automações avançadas de versões futuras (ex: auto-evolução total de prompts).

## Introdução
Contextualização sobre as ferramentas atuais e a proposta do Prompt OS como um orquestrador unificado.
*   **Metáfora operacional:** LLM como CPU, janela de contexto como RAM, RAG/memória como disco e MCP como barramento de I/O.
*   **Objetivo do piloto:** padronizar artefatos (Skills/Personas/Contexto) e reduzir ruído com estrutura, não com volume.

### Claude Code
*   **Conceito:** Ferramenta CLI avançada.
*   **Aplicação no Piloto:** Utilizar como referência para **tags XML** e separação de contexto **apenas quando o alvo for Claude**. Foco em prompts que estimulam raciocínio detalhado ("Extended Thinking") e skills modulares (SKILL.md).

### Copilot Cli
*   **Conceito:** Assistente de terminal.
*   **Aplicação no Piloto:** Implementar **Agent Skills** modulares (SKILL.md), `.github/copilot-instructions.md` e uso de `@workspace` para recuperação de contexto (RAG). Preparar integração com MCP para ferramentas externas.

### Gemini Cli
*   **Conceito:** Assistente multimodal.
*   **Aplicação no Piloto:** Explorar **contexto longo**, `system_instruction` dedicado e caching de contexto. Manter instruções após o contexto (recência) quando o input for multimodal.

### Gpt Codex / Cursor
*   **Conceito:** Base para autocomplete e IDEs agênticas.
*   **Aplicação no Piloto:** Adotar `.cursorrules` como "Constituição" do projeto e usar **Composer** para multi‑arquivo. Criar `.cursorignore` para evitar contexto inútil.

---

## Agentes de IA focados em programação paralela (Humano-IA)
Implementação da arquitetura **PromptSO** para simular níveis cognitivos.

### Objetivos
*   Criar um sistema que não apenas "responda", mas atue em camadas de profundidade diferentes.
*   **Nível 1 (Rápido):** Automação de tarefas repetitivas (linting, boilerplate).
*   **Nível 2 (Contextual):** Análise técnica e trade-offs.
*   **Nível 3 (Estratégico):** Arquitetura e planejamento.
*   **Padrões agênticos:** Orchestrator‑Workers (delegação), Evaluator‑Optimizer (crítica), Hierarchical Planning (longa duração).

### Regras e Customização (Modularidade)
*   **Personas Composables:** Em vez de agentes monolíticos, o piloto deve suportar a composição: `Base Persona` + `Módulos de Skill`.
*   **YAML Metadata:** Padronizar o cabeçalho dos arquivos `.md` para leitura automática (name, description, version, tags). **Não abreviar chaves** (legibilidade > microeconomia).
*   **Bifurcação por modelo:** versão “chat” (GPT/Claude/Gemini) vs “raciocínio” (o1/R1), com prompt mais direto no segundo caso.

### Executar programaticamente
*   Desenvolver scripts (Python/Node) que atuem como o "Kernel", lendo os arquivos de prompt e enviando para a API do LLM.
*   Estruturar o uso de ferramentas externas (File System, Git) de forma segura via MCP (schemas estritos).
*   **Roteamento dinâmico:** escolher modelo/nível de esforço conforme complexidade (custo x qualidade).

### Gerenciamento de Memoria
*   **Memória Experiencial:** Implementar o arquivo `MEMORY.md` na raiz do projeto para persistir decisões e contexto entre sessões, evitando "amnésia" do agente.
*   **Memória híbrida:** working (janela ativa), episódica (histórico resumido), semântica (RAG/graph) e procedural (skills).
*   **Higiene de contexto:** compactação, offloading e descarte estratégico de histórico irrelevante.

---

## Engenharia de Contexto & Criação de contexto
Transição de prompts estáticos para gestão dinâmica de recursos.
*   **Seleção → Compressão → Estruturação:** evitar “poluição de contexto” e manter aderência às instruções críticas.
*   **Memória virtual (MemGPT):** inspiração em hierarquia de memória (core/recall/archival) para contexto longo.
*   **MCP como barramento:** padrão aberto para conectar ferramentas/dados ao agente.

### O Kernel do Sistema (`AGENTS.md`)
*   Criar um arquivo manifesto leve na raiz do projeto alvo.
*   Este arquivo serve como "ponte", apontando para o repositório central de skills e índices (JIT), evitando copiar centenas de prompts por projeto.
*   Indicar `MEMORY.md`, `skills/INDEX.md` e regras globais mínimas.

### Otimização de Tokens
*   **Higienização:** Implementar diretrizes para que os prompts de *Skills* tenham seções como "Bibliografia" comentadas, reduzindo o consumo de tokens sem perder a referência para humanos.
*   **Cache:** Estruturar os arquivos para aproveitar mecanismos de cache de prefixo (onde disponível), colocando definições estáticas no início.
*   **JIT Loading:** carregar apenas skills/personas necessárias por tarefa.

### Integrações úteis (piloto)
*   **MCP Servers (exemplos):** GitHub, Git, Postgres, Slack, Google Drive, Puppeteer.
*   **Repositórios MCP:** `modelcontextprotocol/servers` (catálogo), `modelcontextprotocol/modelcontextprotocol` (spec), `Awesome-MCP` (curadoria).
*   **Exemplo rápido:** agente consulta schema Postgres via MCP, gera migração e valida com testes antes de aplicar.

---

## Engenharia de Prompts & Prompts para Agentes de IA
Adoção de rigor técnico na construção dos prompts.

### Prompts Manuais e Boas Práticas
*   **Bifurcação de Estratégia:** O sistema piloto deve reconhecer que diferentes modelos exigem diferentes prompts.
    *   **Chat (GPT/Claude):** Usar System Prompts detalhados e XML (para Claude).
    *   **Raciocínio (DeepSeek/o1):** Usar prompts diretos e objetivos, sem instruções de "pensar passo a passo" (pois interfere no processo nativo).
*   **Estrutura universal:** Role/Objective/Instructions/Constraints/Output Format, com exemplos quando necessário.
*   **Markdown como padrão cross‑model:** XML somente quando Claude for alvo principal.
*   **Taxonomia de técnicas:** alinhar terminologia ao survey “The Prompt Report” (arXiv:2406.06608).

### Programmatic Prompts (Conceito)
*   Estruturar os prompts não como texto livre, mas como "assinaturas" (Input -> Processamento -> Output), facilitando uma futura migração para frameworks de otimização (como DSPy).
*   **Prompt chaining:** decompor tarefas complexas em passos menores (plan → generate → verify).
*   **DSPy (Stanford):** referência para “programar” pipelines e otimizar prompts por métrica.

---

## Arquitetura de Sistemas Cognitivos
Definição da infraestrutura de arquivos e pastas.
*   **CoALA (arXiv):** modularidade de memória, espaço de ações e decisão como base conceitual.

### Estrutura do Repositório Central
*   Organizar o "Cérebro Externo" em categorias claras: `skills/academic`, `skills/technical`, `personas/`.
*   Criar um índice (`INDEX.md`) para facilitar a busca e carregamento JIT (Just-in-Time) das habilidades.
*   **SKILL.md canônico:** frontmatter obrigatório (name, description, version, tags) + instruções + exemplos.

---

## Criação de Workflows e assertividade
Processos para garantir a qualidade do código gerado.
*   **LangGraph:** referência para fluxos com estado, execução durável e checkpoints (human‑in‑the‑loop).

### Exemplos de fluxo do piloto
*   **Roteamento → Skills JIT → Execução → Verificação:** classificar tarefa, carregar skill específica, executar e validar.
*   **Refatoração segura:** gerar patch → rodar testes → self‑critique → ajuste final.

### Ciclo de Verificação (Quality Gates)
*   O piloto deve testar o conceito de "Self-Criticism": O agente gera o código, depois é forçado a criticar seu próprio trabalho (procurando bugs ou falhas de segurança) antes de apresentar a resposta final.
*   **Evaluator‑Optimizer:** separar geração e avaliação para reduzir erros.
*   **Human‑in‑the‑loop:** nenhuma ação destrutiva sem confirmação explícita (pilot).

## Referencias
*Manter referencias originais e adicionar links para documentação de padrões adotados (YAML Frontmatter, Markdown guide, etc).*
 # Skills reference
 - https://geminicli.com/docs/cli/skills/
 - https://geminicli.com/docs/cli/creating-skills/
 - https://docs.github.com/pt/copilot/concepts/agents/about-agent-skills
 - https://code.claude.com/docs/pt/sub-agents#pr%C3%A9-carregue-skills-em-suagentes
 - https://code.claude.com/docs/pt/skills
 - https://developers.openai.com/codex/skills/create-skill
 - https://cursor.com/pt-BR/docs/context/skills
 - https://code.visualstudio.com/docs/copilot/customization/agent-skills
 - https://qwenlm.github.io/qwen-code-docs/pt-BR/users/features/skills/
 - https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags
 - https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide
 - https://ai.google.dev/gemini-api/docs/prompting-strategies

### Agents, Sub Agents & Custom Agents
- https://code.visualstudio.com/docs/copilot/customization/custom-agents
- https://developers.openai.com/codex/guides/agents-md
- https://platform.openai.com/docs/guides/agents
- https://cursor.com/pt-BR/docs/context/subagents
- https://code.claude.com/docs/pt/sub-agents
- https://geminicli.com/docs/core/subagents/
- https://docs.github.com/pt/copilot/concepts/agents/coding-agent/about-custom-agents
- https://qwenlm.github.io/qwen-code-docs/pt-BR/users/features/sub-agents/

### Context
- https://developers.openai.com/codex/guides/agents-md
- https://geminicli.com/docs/cli/gemini-md/
- https://docs.github.com/pt/copilot/concepts/context
- https://docs.github.com/en/copilot/tutorials/use-custom-instructions
- https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions
- https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions
- https://qwenlm.github.io/qwen-code-docs/pt-BR/users/configuration/settings/#exemplo-de-conte%C3%BAdo-de-arquivo-de-contexto-por-exemplo-qwenmd

### Docs e Referencias
- https://developers.openai.com/codex
- https://geminicli.com/docs/
- https://cursor.com/pt-BR/docs
- https://docs.github.com/pt/copilot
- https://code.claude.com/docs/pt/headless
- https://code.claude.com/docs/pt/overview
- https://code.visualstudio.com/docs/copilot/overview
- https://platform.openai.com/docs/guides/code-generation
- https://code.claude.com/docs/pt/settings#escopos-dispon%C3%ADveis
- https://qwenlm.github.io/qwen-code-docs/pt-BR/users/overview/
- https://qwenlm.github.io/qwen-code-docs/pt-BR/
- https://arxiv.org/abs/2406.06608
- https://arxiv.org/abs/2309.02427
- https://arxiv.org/abs/2310.08560
- https://arxiv.org/abs/2310.03714
- https://modelcontextprotocol.io/
- https://www.anthropic.com/news/model-context-protocol
- https://github.com/modelcontextprotocol/modelcontextprotocol
- https://github.com/modelcontextprotocol/servers
- https://github.com/AlexMili/Awesome-MCP
- https://github.com/QuantGeekDev/mcp-framework
- https://docs.langchain.com/oss/python/langgraph/overview
- https://github.com/langchain-ai/langgraph
- https://github.com/ysymyth/awesome-language-agents
- https://dspy.ai/
- https://github.com/stanfordnlp/dspy
- https://blog.logrocket.com/understanding-anthropic-model-context-protocol-mcp/
