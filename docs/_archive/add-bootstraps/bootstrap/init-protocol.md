# PROTOCOLO #INIT - Instalação do Prompt OS

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `init.ps1` (PowerShell) + `init.sh` (Bash)

---

## 🎯 OBJETIVO

Instalar o Prompt OS v3.5 em um projeto novo ou existente, criando a estrutura mínima necessária para operação.

---

## 📋 FASES DO #INIT

### FASE 1: DETECTION (Análise do Ambiente)
```
1.1. Verificar se Prompt OS já está instalado
     - Check: Arquivo `.prompt-os-signature` existe?
     - Se SIM: Abortar ou oferecer #update
     
1.2. Detectar tipo de projeto
     - Greenfield: Projeto novo/vazio
     - Brownfield: Projeto existente com código
     
1.3. Detectar tech stack
     - Linguagem principal (Java, Python, JS, etc)
     - Framework (Spring, Django, React, etc)
     - Build tool (Maven, npm, gradle, etc)
     
1.4. Detectar agente IA
     - Claude, GPT, Gemini, Copilot, Qwen, etc
     - Usado para customizar {agente}.md
```

### FASE 2: STRUCTURE (Criação de Arquivos)
```
2.1. Criar AGENTS.md (kernel)
     - Template: ~/src/prompt-os/templates/AGENTS.template.md
     - Variáveis: {PROJECT_NAME}, {TECH_STACK}, {AGENTE}
     
2.2. Criar MEMORY.md (estado)
     - Template: ~/src/prompt-os/templates/MEMORY.template.md
     - Variáveis: {PROJECT_NAME}, {DATE}, {INITIAL_STATE}
     
2.3. Criar {agente}.md (bootstrap do agente)
     - Nome baseado no agente detectado (ex: copilot.md, claude.md)
     - Instruções específicas para o agente
     
2.4. Criar .prompt-os-signature
     - Versão: 3.5.0
     - Data de instalação
     - Agente principal
```

### FASE 3: CONTEXT (Estrutura de Contexto)
```
3.1. Criar diretório .context/
     ├── _meta/
     │   ├── project-overview.md
     │   └── tech-stack.md
     ├── standards/
     │   ├── architectural-rules.md (T0)
     │   └── code-quality.md (T1)
     └── workflows/
         └── development-workflow.md
         
3.2. Preencher tech-stack.md
     - Baseado na detecção da Fase 1.3
     - Versões de linguagens/frameworks
     - Dependências principais
     
3.3. Preencher architectural-rules.md (T0)
     - Regras inegociáveis do projeto
     - Template com regras comuns (ex: no System.out.println)
     
3.4. Preencher code-quality.md (T1)
     - Padrões SOLID, Clean Code
     - Convenções de nomenclatura
     - Estrutura de testes
```

### FASE 4: FINALIZATION (Finalização)
```
4.1. Registrar instalação em MEMORY.md
     - Data/hora
     - Versão instalada
     - Agente configurado
     - Tech stack detectado
     
4.2. Criar arquivo README-PROMPT-OS.md
     - Instruções de uso
     - Próximos passos
     - Comandos disponíveis
     
4.3. Mensagem de sucesso
     - Confirmar instalação
     - Listar arquivos criados
     - Sugerir próximas ações
```

---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#init [OPTIONS]

Options:
  --ia <agente>          Nome do agente IA (claude, gpt, gemini, copilot, qwen)
  --level <nivel>        Nível de instalação (minimal, standard, complete)
  --force                Força instalação mesmo se já existir
  --dry-run              Simula sem criar arquivos
  --lang <linguagem>     Força detecção de linguagem
```

### Exemplos
```bash
# Instalação básica (detecção automática)
#init

# Instalação com agente específico
#init --ia copilot

# Instalação completa
#init --ia claude --level complete

# Forçar reinstalação
#init --force

# Simular instalação
#init --dry-run
```

---

## 📂 ARQUIVOS CRIADOS

### Instalação Minimal (5 arquivos)
```
projeto/
├── AGENTS.md                    # ~5KB
├── MEMORY.md                    # ~3KB
├── {agente}.md                  # ~2KB
├── .prompt-os-signature         # ~0.1KB
└── .context/
    ├── _meta/
    │   └── tech-stack.md        # ~1KB
    └── standards/
        └── architectural-rules.md  # ~2KB
```

### Instalação Standard (8 arquivos)
```
+ code-quality.md               # ~3KB
+ project-overview.md           # ~1KB
+ development-workflow.md       # ~2KB
```

### Instalação Complete (12 arquivos)
```
+ testing-strategy.md           # ~2KB
+ deployment-guide.md           # ~2KB
+ troubleshooting.md            # ~2KB
+ CARD-TEMPLATE.md              # ~1KB
```

---

## ⚙️ VARIÁVEIS DE TEMPLATE

### AGENTS.md
- `{PROJECT_NAME}` - Nome do projeto (pasta ou git repo)
- `{TECH_STACK}` - Stack detectado (ex: "Java 17 + Spring Boot 3.2")
- `{AGENTE}` - Nome do agente (ex: "Copilot", "Claude")
- `{VERSION}` - Versão do Prompt OS (3.5.0)
- `{DATE}` - Data de instalação (ISO 8601)

### MEMORY.md
- `{PROJECT_NAME}` - Nome do projeto
- `{DATE}` - Data de instalação
- `{VERSION}` - Versão instalada
- `{AGENTE}` - Agente configurado
- `{INITIAL_STATE}` - Estado inicial (Greenfield/Brownfield)

### tech-stack.md
- `{LANGUAGE}` - Linguagem principal
- `{LANGUAGE_VERSION}` - Versão da linguagem
- `{FRAMEWORK}` - Framework principal
- `{FRAMEWORK_VERSION}` - Versão do framework
- `{BUILD_TOOL}` - Ferramenta de build
- `{DEPENDENCIES}` - Lista de dependências principais

---

## ✅ CRITÉRIOS DE SUCESSO

### Instalação Mínima
- [x] AGENTS.md criado e válido
- [x] MEMORY.md criado e populado
- [x] {agente}.md criado
- [x] .prompt-os-signature criado
- [x] .context/_meta/tech-stack.md criado
- [x] .context/standards/architectural-rules.md criado

### Instalação Standard
- [x] Todos os arquivos mínimos
- [x] code-quality.md criado
- [x] project-overview.md criado
- [x] development-workflow.md criado

### Instalação Complete
- [x] Todos os arquivos standard
- [x] testing-strategy.md criado
- [x] deployment-guide.md criado
- [x] troubleshooting.md criado
- [x] CARD-TEMPLATE.md criado

---

## 🚨 TRATAMENTO DE ERROS

### Erro: Prompt OS já instalado
```
❌ Prompt OS v{version} já está instalado neste projeto.

Opções:
  - Use #update para atualizar
  - Use #init --force para reinstalar
  - Use #sync para sincronizar
```

### Erro: Não foi possível detectar tech stack
```
⚠️  Não foi possível detectar automaticamente o tech stack.

Execute com flag --lang:
  #init --lang java
  #init --lang python
  #init --lang javascript
```

### Erro: Permissões insuficientes
```
❌ Erro ao criar arquivos. Verifique permissões de escrita.

Pasta: {caminho}
Erro: {mensagem_sistema}
```

---

## 🔄 VALIDAÇÃO PÓS-INSTALAÇÃO

Script automático executa após instalação:

```powershell
function Validate-PromptOSInstallation {
    $checks = @(
        "AGENTS.md existe",
        "MEMORY.md existe",
        "Agente .md existe",
        ".prompt-os-signature existe",
        ".context/ existe",
        "tech-stack.md existe",
        "architectural-rules.md existe"
    )
    
    foreach ($check in $checks) {
        # Validar cada item
        if (Test-Path $check) {
            Write-Host "✅ $check" -ForegroundColor Green
        } else {
            Write-Host "❌ $check" -ForegroundColor Red
        }
    }
}
```

---

## 📚 PRÓXIMOS PASSOS APÓS #INIT

Mensagem exibida ao usuário após sucesso:

```
🎉 PROMPT OS v3.5.0 INSTALADO COM SUCESSO!

📂 Arquivos criados:
  ✅ AGENTS.md (kernel)
  ✅ MEMORY.md (estado)
  ✅ {agente}.md (bootstrap)
  ✅ .context/ (7 arquivos)

🚀 PRÓXIMOS PASSOS:

1. Personalize as regras T0:
   → Edite .context/standards/architectural-rules.md

2. Crie seu primeiro Card:
   → #new "Nome da feature"

3. Explore comandos disponíveis:
   → #help

4. Adicione skills customizadas:
   → #add-skill {nome}

📖 Documentação completa:
   → README-PROMPT-OS.md

💡 Dica: O Prompt OS está configurado para {AGENTE}.
    Todos os comandos serão otimizados para este agente.
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-01-30
**Script:** `init.ps1` disponível em `~/src/prompt-os/bootstrap/`
