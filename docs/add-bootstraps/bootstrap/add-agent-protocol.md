# PROTOCOLO #ADD-AGENT - Adicionar Agente IA

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `add-agent.ps1`

---

## 🎯 OBJETIVO

Configurar o ambiente do projeto para suportar múltiplos agentes de IA (ex: Copilot + Claude + Gemini) trabalhando de forma colaborativa e sincronizada. Cada agente recebe um arquivo de bootstrap dedicado para otimizar seu comportamento específico.

---

## 📋 FASES DO #ADD-AGENT

### FASE 1: Registro de Identidade
1.1. Solicitar ou detectar o nome do novo agente (ex: `deepseek`).
1.2. Criar o arquivo `{agente}.md` na raiz do projeto (ex: `deepseek.md`).
1.3. O script `add-agent.ps1` popula este arquivo com as configurações padrão do Prompt OS.

### FASE 2: Configuração de Contexto
2.1. O novo arquivo de agente deve carregar os ponteiros para `AGENTS.md` e `MEMORY.md`.
2.2. Definir regras específicas do modelo (ex: temperatura ideal, formato de CoT preferido).
2.3. Mapear as capacidades do agente (Reasoning, Implementation, Review).

### FASE 3: Sincronização Inicial
3.1. Criar o arquivo de sessão em `.memory/session-{agente}.md`.
3.2. Executar o comando `#sync` para garantir que o novo agente parta do estado mais recente do projeto.

### FASE 4: Ativação
4.1. Notificar os outros agentes sobre a presença do novo colega.
4.2. Registrar a adição do agente no `MEMORY.md`.
4.3. Testar a primeira tarefa com o novo agente (ex: `#analyze`).

---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#add-agent <nome> [OPTIONS]

Options:
  --force                Sobrescreve configuração se já existir
  --dry-run              Simula criação sem escrever no disco
```

### Exemplos
```bash
# Adicionar suporte ao DeepSeek R1
#add-agent deepseek
```

---

## 📂 ARQUIVOS AFETADOS

- `{agente}.md` - Arquivo de configuração raiz do novo agente.
- `MEMORY.md` - Registro da expansão do time.
- `.memory/session-{agente}.md` - Arquivo de persistência efêmera.

---

## ✅ CRITÉRIOS DE SUCESSO

- [x] Arquivo `{agente}.md` criado e legível pelo modelo alvo.
- [x] Novo agente consegue ler `AGENTS.md` e `MEMORY.md`.
- [x] Primeiro comando do novo agente registrado com sucesso.

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-01-29
**Script:** `add-agent.ps1` disponível em `~/src/prompt-os/bootstrap/`