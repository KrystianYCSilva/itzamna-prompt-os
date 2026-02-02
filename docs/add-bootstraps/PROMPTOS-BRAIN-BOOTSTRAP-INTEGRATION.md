# PROMPTOS BRAIN - INTEGRAÇÃO COM BOOTSTRAPS
## Extensão dos Protocolos Existentes para Auto-Geração

**Versão:** 3.5.0  
**Status:** Production Ready  
**Compatível:** PromptOS v3.5+, Spec-Kit, Scripts PowerShell existentes

---

## 📋 SUMÁRIO

1. [Visão Geral da Integração](#1-visão-geral-da-integração)
2. [Protocolo #BRAIN-GENERATE](#2-protocolo-brain-generate)
3. [Protocolo #ADD-SKILL (Completo)](#3-protocolo-add-skill-completo)
4. [Protocolo #ADD-PERSONA (Completo)](#4-protocolo-add-persona-completo)
5. [Scripts PowerShell](#5-scripts-powershell)
6. [Fluxo de Trabalho Integrado](#6-fluxo-de-trabalho-integrado)

---

## 1. VISÃO GERAL DA INTEGRAÇÃO

### 1.1 O Que Muda

```
ANTES (v3.5.0):
  create-skill.ps1 → Cria com placeholders
  expand-skill.ps1 → Detecta placeholders, pede ajuda de IA
  ❌ Sem pesquisa automática
  ❌ Sem geração inteligente
  ❌ Sem aprovação estruturada

DEPOIS (v3.5.0 + Brain):
  brain-generate.ps1 → Pesquisa + Gera + Aprova + Salva
  create-skill.ps1 → Usa Brain automaticamente (--brain flag)
  expand-skill.ps1 → Brain expande com pesquisa
  ✅ Pesquisa web automática
  ✅ Geração baseada em padrões
  ✅ Human Gate estruturado
```

### 1.2 Hierarquia de Comandos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE COMANDOS                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  #brain-generate ─────────────┬──────────────────────────────────────   │
│       │                       │                                         │
│       ├── skill "descrição"   │  Fluxo completo com pesquisa            │
│       ├── persona "descrição" │  Fluxo completo com pesquisa            │
│       └── prompt "descrição"  │  Fluxo completo com pesquisa            │
│                               │                                         │
│  #add-skill ──────────────────┤                                         │
│       │                       │                                         │
│       ├── (sem --brain)       │  create-skill.ps1 (placeholders)        │
│       └── (com --brain)       │  brain-generate.ps1 (completo)          │
│                               │                                         │
│  #expand-skill ───────────────┤                                         │
│       │                       │                                         │
│       ├── (sem --brain)       │  Detecta, pede ajuda manual             │
│       └── (com --brain)       │  Pesquisa e expande automaticamente     │
│                               │                                         │
│  #validate-skill ─────────────┴──────────────────────────────────────   │
│       │                                                                 │
│       └── Validação ADR-001 (inalterado)                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Mapeamento Script → Protocolo

| Script PowerShell | Protocolo | Modo Brain |
|-------------------|-----------|------------|
| `init.ps1` | `init-protocol.md` | N/A |
| `create-skill.ps1` | `add-skill-protocol.md` | `--brain` |
| `add-persona.ps1` | `add-persona-protocol.md` | `--brain` |
| `expand-skill.ps1` | `add-skill-protocol.md` | `--brain` |
| `brain-generate.ps1` | `brain-generate-protocol.md` | **NOVO** |
| `validate-skill.ps1` | `add-skill-protocol.md` | N/A |
| `sync.ps1` | `sync-protocol.md` | N/A |
| `update.ps1` | `update-protocol.md` | N/A |

---

## 2. PROTOCOLO #BRAIN-GENERATE

```markdown
# PROTOCOLO #BRAIN-GENERATE - Geração Inteligente com IA

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `brain-generate.ps1`

---

## 🎯 OBJETIVO

Gerar skills, personas e prompts automaticamente usando o fluxo:
**Pesquisa → Geração → Validação → Aprovação Humana → Commit**

Este protocolo implementa o "cérebro" auto-evolutivo do PromptOS.

---

## 📋 FASES DO #BRAIN-GENERATE

### FASE 1: CLASSIFY (Classificação)
```
1.1. Receber input do usuário (descrição livre)
1.2. Detectar TIPO: skill | persona | prompt
1.3. Detectar DOMÍNIO: graphql, react, devops, security, etc.
1.4. Detectar COMPLEXIDADE: simple | medium | complex
1.5. Se complexidade >= complex, sugerir Spec-Kit
```

### FASE 2: RESEARCH (Pesquisa)
```
2.1. Buscar skills/personas existentes similares
     - Diretório: .github/skills/ ou skills/generated/
     - Matching: keywords, nome, descrição
     
2.2. Web search (se habilitado)
     - Documentação oficial
     - Best practices
     - Padrões comuns
     
2.3. Consolidar pesquisa
     - Padrões identificados (guidelines)
     - Antipadrões a evitar (constraints)
     - Fontes consultadas (referências)
     
2.4. LOOP CONVERSACIONAL (opcional)
     - Usuário pode sugerir referências
     - Usuário pode corrigir escopo
     - Agente ajusta pesquisa
```

### FASE 3: GENERATE (Geração)
```
3.1. Selecionar template apropriado
     - SKILL-TEMPLATE.md para skills
     - PERSONA-TEMPLATE.md para personas
     - PROMPT-TEMPLATE.md para prompts
     
3.2. Preencher YAML frontmatter
     - name, description, version, domain
     - triggers, dependencies, tags
     - sources (da pesquisa)
     
3.3. Gerar conteúdo principal
     - Instruções (ações imperativas)
     - Guidelines (SEMPRE fazer)
     - Constraints (NUNCA fazer)
     - Exemplos (mínimo 2)
     
3.4. Montar draft completo
```

### FASE 4: VALIDATE (Validação)
```
4.1. Validação estrutural (JSON Schema)
     - YAML frontmatter válido
     - Campos obrigatórios presentes
     - Campos proibidos ausentes (ADR-001)
     
4.2. Validação de conteúdo
     - Tem seção de instruções?
     - Tem seção de guidelines?
     - Tem seção de constraints?
     - Tem seção de exemplos? (mínimo 2)
     
4.3. Validação de tamanho
     - Skills: máx 3KB
     - Personas: máx 5KB
     - Prompts: máx 10KB
     
4.4. Se inválido, voltar para GENERATE com feedback
```

### FASE 5: HUMAN GATE (Aprovação)
```
5.1. Exibir preview do draft gerado
5.2. Exibir fontes consultadas na pesquisa
5.3. Solicitar decisão do humano:
     - approve: Salvar como está
     - edit: Humano faz edições manuais
     - reject: Rejeitar com feedback (volta para RESEARCH)
     - cancel: Abortar completamente
     
5.4. Se rejeitado, registrar motivo e recomeçar
```

### FASE 6: COMMIT (Persistência)
```
6.1. Criar diretório se necessário
     - skills/generated/{nome}/
     - personas/generated/{nome}/
     - prompts/generated/{nome}/
     
6.2. Salvar arquivo principal
     - SKILL.md, PERSONA.md, ou PROMPT.md
     - Status: approved
     
6.3. Atualizar INDEX.md
     - Adicionar entrada na tabela
     
6.4. Atualizar MEMORY.md
     - Registrar em memória episódica
     - Incrementar estatísticas
     
6.5. Notificar sucesso
     - Caminho do arquivo
     - Próximos passos
```

---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#brain-generate <tipo> "descrição" [OPTIONS]

Tipos:
  skill               Gera nova skill
  persona             Gera nova persona
  prompt              Gera novo prompt

Options:
  --no-research       Pula fase de pesquisa web
  --auto-approve      Auto-aprova (CUIDADO: sem human gate)
  --dry-run           Simula sem salvar
  --verbose           Output detalhado
  --speckit           Força uso de Spec-Kit para features complexas
```

### Exemplos
```bash
# Gerar skill simples
#brain-generate skill "validação de formulários com Zod"

# Gerar skill com pesquisa detalhada
#brain-generate skill "API GraphQL com Apollo Server e auth JWT" --verbose

# Gerar persona
#brain-generate persona "DevOps Engineer especialista em Kubernetes"

# Gerar prompt
#brain-generate prompt "code review focado em segurança OWASP"

# Simular sem salvar
#brain-generate skill "Docker multi-stage builds" --dry-run
```

---

## 📂 ARQUIVOS AFETADOS

### Geração de Skill
- `skills/generated/{nome}/SKILL.md` - Skill criada
- `skills/generated/INDEX.md` - Índice atualizado
- `MEMORY.md` - Registro da operação

### Geração de Persona
- `personas/generated/{nome}/PERSONA.md` - Persona criada
- `personas/generated/INDEX.md` - Índice atualizado
- `MEMORY.md` - Registro da operação

### Geração de Prompt
- `prompts/generated/{nome}/PROMPT.md` - Prompt criado
- `prompts/generated/INDEX.md` - Índice atualizado
- `MEMORY.md` - Registro da operação

---

## ✅ CRITÉRIOS DE SUCESSO

- [x] Classificação correta do tipo e domínio
- [x] Pesquisa retornou fontes relevantes
- [x] Draft segue template canônico
- [x] Validação ADR-001 passou
- [x] Humano aprovou (ou --auto-approve usado)
- [x] Arquivo salvo no diretório correto
- [x] INDEX.md atualizado
- [x] MEMORY.md atualizado

---

## 🚨 TRATAMENTO DE ERROS

### Erro: Domínio não reconhecido
```
⚠️  Domínio não detectado automaticamente.

Solução:
  - Especifique domínio explicitamente na descrição
  - Ou use: #brain-generate skill "Docker" --domain devops
```

### Erro: Pesquisa falhou
```
❌ Erro ao pesquisar fontes.

Solução:
  - Use --no-research para pular pesquisa
  - Verifique conectividade
  - Tente novamente
```

### Erro: Human Gate timeout
```
⚠️  Nenhuma resposta em 24h. Operação cancelada.

Solução:
  - Execute novamente quando disponível
  - Use --auto-approve para auto-aprovar (não recomendado)
```

---

## 📚 PRÓXIMOS PASSOS

Mensagem exibida ao usuário após sucesso:

```
🎉 #BRAIN-GENERATE EXECUTADO COM SUCESSO!

📁 Arquivo criado: skills/generated/docker-multi-stage/SKILL.md
🏷️  Nome: docker-multi-stage
📂 Domínio: devops
✅ Status: approved

🚀 PRÓXIMOS PASSOS:
  1. Revisar skill gerada: cat skills/generated/docker-multi-stage/SKILL.md
  2. Validar conformidade: #validate-skill docker-multi-stage
  3. Testar uso: Peça ao agente para usar a skill
  4. Expandir se necessário: #expand-skill docker-multi-stage --brain
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-02-02
**Script:** `brain-generate.ps1` disponível em `~/src/prompt-os/bootstrap/`
```

---

## 3. PROTOCOLO #ADD-SKILL (Completo)

```markdown
# PROTOCOLO #ADD-SKILL - Adicionar Skill Customizada

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `add-skill.ps1` (wrapper) + `create-skill.ps1` + `brain-generate.ps1`

---

## 🎯 OBJETIVO

Adicionar uma nova skill ao projeto, com duas modalidades:
1. **Modo Rápido** (placeholders): Cria estrutura para preenchimento manual
2. **Modo Brain** (completo): Pesquisa, gera e valida automaticamente

---

## 📋 FASES DO #ADD-SKILL

### MODO RÁPIDO (sem --brain)

#### FASE 1: Validação de Input
```
1.1. Verificar se nome está em kebab-case
1.2. Verificar se categoria é válida (academic, technology)
1.3. Verificar se skill já existe (evitar duplicação)
1.4. Se existe, perguntar: sobrescrever ou abortar?
```

#### FASE 2: Criação de Estrutura
```
2.1. Criar diretório skills/{category}/{nome}/
2.2. Gerar SKILL.md com template e placeholders:
     - [AQUI]: Campos obrigatórios a preencher
     - [PENDENTE]: Campos que requerem pesquisa
     - [OPCIONAL]: Campos opcionais
2.3. Gerar arquivo de metadados auxiliares (se necessário)
```

#### FASE 3: Registro
```
3.1. Atualizar INDEX.md da categoria
3.2. Atualizar MEMORY.md com registro da criação
3.3. Exibir próximos passos (expand, validate)
```

---

### MODO BRAIN (com --brain)

#### FASE 1: Delegação para Brain
```
1.1. Extrair nome e categoria do input
1.2. Construir descrição para o Brain
1.3. Chamar: brain-generate.ps1 skill "$descricao"
```

#### FASE 2-6: Executado pelo Brain
```
(Ver protocolo #BRAIN-GENERATE)
- CLASSIFY → RESEARCH → GENERATE → VALIDATE → HUMAN GATE → COMMIT
```

---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#add-skill <nome> [OPTIONS]

Options:
  --category <cat>       Categoria: academic | technology (obrigatório)
  --brain                Usa Brain para geração completa
  --mode <m>             fast | complete (só sem --brain)
  --description "desc"   Descrição adicional para o Brain
  --force                Sobrescreve se existir
  --dry-run              Simula sem criar arquivos
```

### Exemplos
```bash
# Modo rápido (placeholders)
#add-skill docker-basics --category technology --mode fast

# Modo Brain (pesquisa + geração)
#add-skill graphql-api --category technology --brain --description "API GraphQL com Apollo Server, foco em auth e rate limiting"

# Forçar sobrescrita
#add-skill react-hooks --category technology --brain --force
```

---

## 📂 ARQUIVOS AFETADOS

### Modo Rápido
- `skills/{category}/{nome}/SKILL.md` - Com placeholders
- `skills/{category}/INDEX.md` - Atualizado
- `MEMORY.md` - Registro

### Modo Brain
- `skills/generated/{nome}/SKILL.md` - Completo
- `skills/generated/INDEX.md` - Atualizado
- `MEMORY.md` - Registro detalhado

---

## ✅ CRITÉRIOS DE SUCESSO

### Modo Rápido
- [x] Diretório criado
- [x] SKILL.md com placeholders
- [x] INDEX.md atualizado
- [x] MEMORY.md registrado

### Modo Brain
- [x] Todos os critérios de #BRAIN-GENERATE
- [x] Validação ADR-001 passou
- [x] Humano aprovou

---

## 🚨 TRATAMENTO DE ERROS

### Erro: Skill já existe
```
❌ Skill 'docker-basics' já existe em skills/technology/docker-basics/

Opções:
  - Use --force para sobrescrever
  - Escolha outro nome
  - Use #expand-skill para adicionar conteúdo
```

### Erro: Categoria inválida
```
❌ Categoria 'devops' não é válida.

Categorias válidas:
  - academic
  - technology

Solução:
  #add-skill docker-basics --category technology
```

---

## 🔄 INTEGRAÇÃO COM EXPAND-SKILL

Se skill foi criada em modo rápido (com placeholders):

```bash
# Ver placeholders
#expand-skill docker-basics

# Expandir com Brain
#expand-skill docker-basics --brain
```

---

## 📚 PRÓXIMOS PASSOS

### Após Modo Rápido
```
🎉 #ADD-SKILL DOCKER-BASICS EXECUTADO!

📁 Arquivo: skills/technology/docker-basics/SKILL.md
📊 Placeholders: 5 [AQUI], 3 [PENDENTE], 2 [OPCIONAL]

🚀 PRÓXIMOS PASSOS:
  1. Editar manualmente: code skills/technology/docker-basics/SKILL.md
  2. Ou expandir com Brain: #expand-skill docker-basics --brain
  3. Validar: #validate-skill docker-basics
```

### Após Modo Brain
```
🎉 #ADD-SKILL DOCKER-BASICS EXECUTADO COM BRAIN!

📁 Arquivo: skills/generated/docker-basics/SKILL.md
✅ Status: approved
📊 Fontes: 3 consultadas

🚀 PRÓXIMOS PASSOS:
  1. Revisar: cat skills/generated/docker-basics/SKILL.md
  2. Validar: #validate-skill docker-basics
  3. Usar: Peça ao agente para aplicar a skill
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-02-02
**Script:** `add-skill.ps1` disponível em `~/src/prompt-os/bootstrap/`
```

---

## 4. PROTOCOLO #ADD-PERSONA (Completo)

```markdown
# PROTOCOLO #ADD-PERSONA - Adicionar Persona Customizada

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `add-persona.ps1` + `brain-generate.ps1`

---

## 🎯 OBJETIVO

Adicionar uma persona customizada ao projeto, com duas modalidades:
1. **Modo Rápido** (template): Cria estrutura básica
2. **Modo Brain** (completo): Pesquisa, gera persona completa com skills

---

## 📋 FASES DO #ADD-PERSONA

### MODO RÁPIDO (sem --brain)

#### FASE 1: Validação
```
1.1. Verificar nome em kebab-case
1.2. Verificar se persona já existe
1.3. Detectar tipo: base | composed | specialist
```

#### FASE 2: Template
```
2.1. Criar diretório personas/{nome}/
2.2. Gerar PERSONA.md com template básico:
     - Identidade (role, especialidades, estilo)
     - Comportamentos (placeholders)
     - Skills associadas (vazio)
```

#### FASE 3: Skills
```
3.1. Perguntar quais skills associar
3.2. Validar que skills existem
3.3. Adicionar ao YAML frontmatter
```

#### FASE 4: Registro
```
4.1. Atualizar personas/INDEX.md
4.2. Atualizar MEMORY.md
```

---

### MODO BRAIN (com --brain)

#### FASE 1: Classificação
```
1.1. Detectar especialidades da descrição
1.2. Identificar skills necessárias
1.3. Determinar se herda de persona existente
```

#### FASE 2: Pesquisa
```
2.1. Buscar personas similares existentes
2.2. Identificar skills recomendadas para a especialidade
2.3. Pesquisar padrões de comunicação do domínio
```

#### FASE 3: Geração
```
3.1. Preencher template PERSONA-TEMPLATE.md
3.2. Definir comportamentos específicos
3.3. Mapear skills a carregar (JIT)
3.4. Criar constraints da persona
```

#### FASE 4-6: Validação, Aprovação, Commit
```
(Ver protocolo #BRAIN-GENERATE)
```

---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#add-persona <nome> [OPTIONS]

Options:
  --brain                Usa Brain para geração completa
  --inherits <persona>   Herda de persona existente
  --skills "s1,s2,s3"    Skills a associar
  --description "desc"   Descrição para o Brain
  --force                Sobrescreve se existir
  --dry-run              Simula sem criar
```

### Exemplos
```bash
# Modo rápido
#add-persona devops-engineer

# Modo Brain
#add-persona devops-engineer --brain --description "Especialista em Kubernetes, CI/CD com GitHub Actions, observabilidade com Prometheus/Grafana"

# Com herança
#add-persona security-specialist --brain --inherits software-engineer-fullstack

# Com skills específicas
#add-persona data-scientist --brain --skills "python,pandas,machine-learning,deep-learning"
```

---

## 📂 ARQUIVOS AFETADOS

- `personas/generated/{nome}/PERSONA.md` - Persona criada
- `personas/generated/INDEX.md` - Índice atualizado
- `MEMORY.md` - Registro da operação

---

## ✅ CRITÉRIOS DE SUCESSO

- [x] Nome válido em kebab-case
- [x] Template completo (sem placeholders se --brain)
- [x] Skills associadas existem
- [x] Herança válida (se especificada)
- [x] INDEX.md atualizado
- [x] MEMORY.md registrado

---

## 📚 PRÓXIMOS PASSOS

```
🎉 #ADD-PERSONA DEVOPS-ENGINEER EXECUTADO!

📁 Arquivo: personas/generated/devops-engineer/PERSONA.md
🔧 Skills: 8 associadas (kubernetes, docker, github-actions, ...)
✅ Status: approved

🚀 PRÓXIMOS PASSOS:
  1. Revisar: cat personas/generated/devops-engineer/PERSONA.md
  2. Testar: Inicie conversa com "Use persona devops-engineer"
  3. Ajustar skills: #add-skill <nome> --brain
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-02-02
**Script:** `add-persona.ps1` disponível em `~/src/prompt-os/bootstrap/`
```

---

## 5. SCRIPTS POWERSHELL

### 5.1 brain-generate.ps1

```powershell
<#
.SYNOPSIS
    Gera skills, personas ou prompts usando o Brain do PromptOS.

.DESCRIPTION
    Implementa o fluxo: Pesquisa → Geração → Validação → Aprovação → Commit
    Este é o "cérebro" auto-evolutivo do PromptOS.

.PARAMETER Type
    Tipo a gerar: skill, persona, prompt

.PARAMETER Description
    Descrição do que gerar

.PARAMETER NoResearch
    Pula fase de pesquisa

.PARAMETER AutoApprove
    Auto-aprova (sem human gate)

.PARAMETER DryRun
    Simula sem salvar

.EXAMPLE
    .\brain-generate.ps1 -Type skill -Description "API GraphQL com Apollo"
    .\brain-generate.ps1 -Type persona -Description "DevOps Engineer"

.NOTES
    Version: 3.5.0
    Requires: PowerShell 7+ ou Windows PowerShell 5.1
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('skill', 'persona', 'prompt')]
    [string]$Type,
    
    [Parameter(Mandatory=$true)]
    [string]$Description,
    
    [Parameter()]
    [switch]$NoResearch,
    
    [Parameter()]
    [switch]$AutoApprove,
    
    [Parameter()]
    [switch]$DryRun,
    
    [Parameter()]
    [switch]$Verbose
)

# ═══════════════════════════════════════════════════════════════════════
# CONFIGURAÇÃO
# ═══════════════════════════════════════════════════════════════════════

$VERSION = "3.5.0"
$PROMPT_OS_ROOT = $env:PROMPT_OS_ROOT
if (-not $PROMPT_OS_ROOT) {
    $PROMPT_OS_ROOT = Join-Path $HOME "src\prompt-os"
}

$CONFIG = @{
    SkillsDir = Join-Path $PROMPT_OS_ROOT "skills\generated"
    PersonasDir = Join-Path $PROMPT_OS_ROOT "personas\generated"
    PromptsDir = Join-Path $PROMPT_OS_ROOT "prompts\generated"
    TemplatesDir = Join-Path $PROMPT_OS_ROOT "templates"
    MemoryFile = Join-Path (Get-Location) "MEMORY.md"
    MinExamples = 2
    MaxSkillSize = 3KB
}

# ═══════════════════════════════════════════════════════════════════════
# FUNÇÕES AUXILIARES
# ═══════════════════════════════════════════════════════════════════════

function Write-Banner {
    Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  🧠 PROMPTOS BRAIN - Gerador Inteligente v$VERSION" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan
}

function Write-Step {
    param([int]$Number, [string]$Name, [string]$Status)
    $icon = switch ($Status) {
        "start" { "⏳" }
        "done" { "✅" }
        "error" { "❌" }
        default { "▶️" }
    }
    Write-Host "$icon [$Number] $Name" -ForegroundColor $(if ($Status -eq "error") { "Red" } else { "White" })
}

function ConvertTo-KebabCase {
    param([string]$Text)
    return ($Text.ToLower() -replace '[^a-z0-9\s]', '' -replace '\s+', '-').Substring(0, [Math]::Min($Text.Length, 50))
}

function Get-Today {
    return (Get-Date -Format "yyyy-MM-dd")
}

# ═══════════════════════════════════════════════════════════════════════
# FASE 1: CLASSIFY
# ═══════════════════════════════════════════════════════════════════════

function Invoke-Classify {
    param([string]$Input)
    
    Write-Step -Number 1 -Name "CLASSIFY - Analisando pedido..." -Status "start"
    
    $domainKeywords = @{
        graphql = @('graphql', 'apollo', 'schema', 'resolver', 'mutation')
        react = @('react', 'hook', 'component', 'jsx', 'tsx', 'redux', 'nextjs')
        nodejs = @('node', 'express', 'fastify', 'npm', 'backend')
        devops = @('docker', 'kubernetes', 'k8s', 'ci/cd', 'terraform', 'ansible')
        security = @('auth', 'jwt', 'oauth', 'security', 'owasp', 'encryption')
        database = @('sql', 'postgres', 'mysql', 'mongodb', 'redis', 'prisma')
        testing = @('test', 'jest', 'pytest', 'cypress', 'coverage', 'tdd')
        api = @('rest', 'api', 'endpoint', 'swagger', 'openapi', 'grpc')
        python = @('python', 'django', 'flask', 'fastapi', 'pandas')
    }
    
    $lowerInput = $Input.ToLower()
    $detectedDomain = "general"
    $maxMatches = 0
    
    foreach ($domain in $domainKeywords.Keys) {
        $matches = ($domainKeywords[$domain] | Where-Object { $lowerInput.Contains($_) }).Count
        if ($matches -gt $maxMatches) {
            $maxMatches = $matches
            $detectedDomain = $domain
        }
    }
    
    # Complexidade
    $complexIndicators = @('arquitetura', 'sistema', 'completo', 'enterprise', 'full')
    $simpleIndicators = @('básico', 'simples', 'introdução', 'hello')
    
    $complexity = "medium"
    if ($complexIndicators | Where-Object { $lowerInput.Contains($_) }) { $complexity = "complex" }
    if ($simpleIndicators | Where-Object { $lowerInput.Contains($_) }) { $complexity = "simple" }
    
    Write-Host "   Domínio: $detectedDomain" -ForegroundColor Gray
    Write-Host "   Complexidade: $complexity" -ForegroundColor Gray
    
    Write-Step -Number 1 -Name "CLASSIFY" -Status "done"
    
    return @{
        Description = $Input
        Domain = $detectedDomain
        Complexity = $complexity
        Name = ConvertTo-KebabCase $Input
    }
}

# ═══════════════════════════════════════════════════════════════════════
# FASE 2: RESEARCH
# ═══════════════════════════════════════════════════════════════════════

function Invoke-Research {
    param([hashtable]$Classification, [switch]$Skip)
    
    Write-Step -Number 2 -Name "RESEARCH - Pesquisando fontes..." -Status "start"
    
    if ($Skip) {
        Write-Host "   (Pesquisa pulada com --no-research)" -ForegroundColor Yellow
        return @{
            Summary = "Pesquisa não realizada"
            Patterns = @("Seguir padrões SOLID", "Documentar código", "Escrever testes")
            Antipatterns = @("Código duplicado", "Funções muito longas", "Sem tratamento de erros")
            Sources = @(@{url="https://refactoring.guru"; type="best_practices"})
        }
    }
    
    # Padrões por domínio (mock - em produção usar web search)
    $domainPatterns = @{
        graphql = @{
            Patterns = @(
                "Usar DataLoader para evitar N+1 queries",
                "Implementar rate limiting por query complexity",
                "Separar schema em módulos por domínio"
            )
            Antipatterns = @(
                "Expor todos os campos do banco diretamente",
                "Ignorar depth limiting em queries aninhadas",
                "Não implementar autenticação no context"
            )
            Sources = @(
                @{url="https://graphql.org/learn/best-practices/"; type="official_docs"},
                @{url="https://www.apollographql.com/docs/"; type="official_docs"}
            )
        }
        react = @{
            Patterns = @(
                "Usar React.memo para componentes puros",
                "Implementar custom hooks para lógica reutilizável",
                "Separar componentes de apresentação e lógica"
            )
            Antipatterns = @(
                "Mutar estado diretamente",
                "Usar índice como key em listas dinâmicas",
                "Fazer chamadas API dentro do render"
            )
            Sources = @(
                @{url="https://react.dev/learn"; type="official_docs"},
                @{url="https://react.dev/reference/react/hooks"; type="official_docs"}
            )
        }
        devops = @{
            Patterns = @(
                "Infrastructure as Code (IaC) para reprodutibilidade",
                "Implementar observabilidade (logs, metrics, traces)",
                "CI/CD com testes automatizados em cada stage"
            )
            Antipatterns = @(
                "Configuração manual de servidores",
                "Secrets hardcoded no código",
                "Deploy manual sem automação"
            )
            Sources = @(
                @{url="https://12factor.net/"; type="best_practices"},
                @{url="https://docs.docker.com/"; type="official_docs"}
            )
        }
    }
    
    $research = $domainPatterns[$Classification.Domain]
    if (-not $research) {
        $research = @{
            Patterns = @("Seguir princípios SOLID", "Documentar funções públicas", "Escrever testes unitários")
            Antipatterns = @("Código duplicado", "Funções muito longas", "Acoplamento forte")
            Sources = @(@{url="https://refactoring.guru/refactoring"; type="best_practices"})
        }
    }
    
    $research.Summary = "Pesquisa sobre $($Classification.Domain) concluída."
    
    Write-Host "   Fontes: $($research.Sources.Count)" -ForegroundColor Gray
    Write-Host "   Padrões: $($research.Patterns.Count)" -ForegroundColor Gray
    
    Write-Step -Number 2 -Name "RESEARCH" -Status "done"
    
    return $research
}

# ═══════════════════════════════════════════════════════════════════════
# FASE 3: GENERATE
# ═══════════════════════════════════════════════════════════════════════

function Invoke-Generate {
    param(
        [string]$Type,
        [hashtable]$Classification,
        [hashtable]$Research
    )
    
    Write-Step -Number 3 -Name "GENERATE - Gerando draft..." -Status "start"
    
    $name = $Classification.Name
    $title = ($Classification.Description -split ' ' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ' '
    $today = Get-Today
    
    switch ($Type) {
        'skill' {
            $content = @"
---
name: "$name"
description: |
  Skill para $($Classification.Description). Gerada automaticamente pelo 
  PromptOS Brain com base em pesquisa de melhores práticas do domínio 
  $($Classification.Domain).
version: "3.5.0"
type: skill
category: technology
subcategory: $($Classification.Domain)
keywords:
  - $($Classification.Domain)
  - auto-generated
  - promptos-brain
created: $today
status: pending
sources:
$($Research.Sources | ForEach-Object { "  - url: `"$($_.url)`"`n    type: `"$($_.type)`"" })
---

# $title

## 📋 Visão Geral

Esta skill fornece diretrizes e padrões para trabalhar com $($Classification.Domain).
Gerada automaticamente pelo PromptOS Brain.

---

## 🎯 Instruções

### Ao receber uma tarefa relacionada a $($Classification.Domain):

1. **Analise** o contexto e requisitos específicos
2. **Verifique** se há código existente relacionado
3. **Aplique** os padrões documentados abaixo
4. **Valide** o resultado antes de apresentar

---

## ✅ Guidelines (SEMPRE)

$($Research.Patterns | ForEach-Object -Begin {$i=1} -Process { "$i. $_"; $i++ })

## ❌ Constraints (NUNCA)

$($Research.Antipatterns | ForEach-Object -Begin {$i=1} -Process { "$i. **NUNCA** $_"; $i++ })

---

## 📚 Exemplos

### Exemplo 1: Caso Básico

**Cenário:** Implementação padrão de $($Classification.Domain)

**Input:**
``````
// Requisição do usuário
``````

**Output esperado:**
``````
// Código seguindo os padrões
``````

**Explicação:** Aplicação dos guidelines documentados.

### Exemplo 2: Tratamento de Erros

**Cenário:** Situação de erro

**Input:**
``````
// Cenário com possível erro
``````

**Output esperado:**
``````
try {
  // Operação
} catch (error) {
  // Tratamento apropriado
}
``````

**Explicação:** Sempre implementar tratamento de erros robusto.

---

## 📖 Referências

$($Research.Sources | ForEach-Object -Begin {$i=1} -Process { "$i. $($_.url) ($($_.type))"; $i++ })
"@
        }
        'persona' {
            $content = @"
---
name: "$name"
type: persona
description: |
  Persona para $($Classification.Description). Gerada pelo PromptOS Brain.
version: "3.5.0"
expertise:
  - $($Classification.Domain)
communication_style: technical
created: $today
status: pending
---

# $title

## 🎭 Identidade

- **Role:** Especialista em $($Classification.Domain)
- **Especialidades:** $($Classification.Description)
- **Estilo:** Pragmático, foca em soluções que funcionam
- **Mindset:** Qualidade > Velocidade

---

## 💡 Comportamentos Core

1. **Análise antes de ação**
   - Sempre entender o contexto completo antes de implementar

2. **Padrões consistentes**
   - Aplicar guidelines documentadas

3. **Comunicação clara**
   - Explicar decisões técnicas

---

## ⚠️ Constraints

1. **NÃO** assumir contexto sem confirmar
2. **NÃO** ignorar tratamento de erros
3. **SEMPRE** documentar decisões importantes
"@
        }
        'prompt' {
            $content = @"
---
name: "$name"
type: meta-protocol
description: |
  Prompt para $($Classification.Description). Gerado pelo PromptOS Brain.
version: "3.5.0"
category: generation
created: $today
status: pending
---

# $title

## 🎯 Objetivo

$($Classification.Description)

---

## 📝 Template

``````xml
<context>
Você é um especialista em $($Classification.Domain).
</context>

<task>
{{task_description}}
</task>

<constraints>
- Siga os padrões documentados
- Inclua tratamento de erros
- Documente decisões importantes
</constraints>
``````
"@
        }
    }
    
    Write-Host "   Nome: $name" -ForegroundColor Gray
    Write-Host "   Tamanho: $($content.Length) chars" -ForegroundColor Gray
    
    Write-Step -Number 3 -Name "GENERATE" -Status "done"
    
    return @{
        Name = $name
        Content = $content
        Metadata = @{
            Name = $name
            Domain = $Classification.Domain
            Type = $Type
            Created = $today
        }
    }
}

# ═══════════════════════════════════════════════════════════════════════
# FASE 4: VALIDATE
# ═══════════════════════════════════════════════════════════════════════

function Invoke-Validate {
    param([hashtable]$Draft)
    
    Write-Step -Number 4 -Name "VALIDATE - Validando draft..." -Status "start"
    
    $errors = @()
    $warnings = @()
    $content = $Draft.Content
    
    # YAML frontmatter
    if ($content -notmatch '^---') {
        $errors += "YAML frontmatter não encontrado"
    }
    
    # Campos obrigatórios
    if ($content -notmatch 'name:') { $errors += "Campo 'name' ausente" }
    if ($content -notmatch 'description:') { $errors += "Campo 'description' ausente" }
    if ($content -notmatch 'version:') { $errors += "Campo 'version' ausente" }
    
    # Seções obrigatórias (para skills)
    if ($Draft.Metadata.Type -eq 'skill') {
        if ($content -notmatch '## 📚 Exemplos') { $errors += "Seção de exemplos ausente" }
        if ($content -notmatch '## ❌ Constraints') { $errors += "Seção de constraints ausente" }
        
        $exampleCount = ([regex]::Matches($content, '### Exemplo \d+')).Count
        if ($exampleCount -lt 2) { $warnings += "Apenas $exampleCount exemplo(s) - recomendado: 2+" }
    }
    
    # Tamanho
    $sizeKB = [Math]::Round($content.Length / 1024, 1)
    if ($sizeKB -gt 3) { $warnings += "Tamanho $sizeKB KB excede 3KB recomendado" }
    
    # Resultado
    if ($errors.Count -gt 0) {
        Write-Host "   ❌ Erros:" -ForegroundColor Red
        $errors | ForEach-Object { Write-Host "      - $_" -ForegroundColor Red }
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "   ⚠️  Avisos:" -ForegroundColor Yellow
        $warnings | ForEach-Object { Write-Host "      - $_" -ForegroundColor Yellow }
    }
    
    if ($errors.Count -eq 0) {
        Write-Host "   ✅ Draft válido!" -ForegroundColor Green
        Write-Step -Number 4 -Name "VALIDATE" -Status "done"
    } else {
        Write-Step -Number 4 -Name "VALIDATE" -Status "error"
    }
    
    return @{
        Valid = $errors.Count -eq 0
        Errors = $errors
        Warnings = $warnings
    }
}

# ═══════════════════════════════════════════════════════════════════════
# FASE 5: HUMAN GATE
# ═══════════════════════════════════════════════════════════════════════

function Invoke-HumanGate {
    param([hashtable]$Draft, [switch]$AutoApprove)
    
    Write-Step -Number 5 -Name "HUMAN GATE - Aguardando aprovação..." -Status "start"
    
    if ($AutoApprove) {
        Write-Host "   ⚠️  Auto-aprovação ativada" -ForegroundColor Yellow
        return @{ Action = "approve" }
    }
    
    Write-Host "`n" + ("═" * 70) -ForegroundColor Magenta
    Write-Host "  🔐 APROVAÇÃO NECESSÁRIA" -ForegroundColor Magenta
    Write-Host ("═" * 70) -ForegroundColor Magenta
    
    Write-Host "`n📄 PREVIEW:`n" -ForegroundColor Cyan
    Write-Host ("─" * 50) -ForegroundColor Gray
    
    $lines = $Draft.Content -split "`n"
    $preview = ($lines | Select-Object -First 40) -join "`n"
    Write-Host $preview -ForegroundColor White
    
    if ($lines.Count -gt 40) {
        Write-Host "`n... [$($lines.Count - 40) linhas omitidas]" -ForegroundColor Gray
    }
    
    Write-Host ("─" * 50) -ForegroundColor Gray
    
    Write-Host "`n📋 OPÇÕES:" -ForegroundColor Cyan
    Write-Host "  approve  - Salvar como está" -ForegroundColor White
    Write-Host "  reject   - Rejeitar (informe motivo após espaço)" -ForegroundColor White
    Write-Host "  cancel   - Cancelar operação`n" -ForegroundColor White
    
    $response = Read-Host "❓ Sua decisão"
    
    $parts = $response.Trim().ToLower() -split ' ', 2
    $action = $parts[0]
    $reason = if ($parts.Count -gt 1) { $parts[1] } else { "" }
    
    Write-Step -Number 5 -Name "HUMAN GATE" -Status "done"
    
    return @{
        Action = $action
        Reason = $reason
    }
}

# ═══════════════════════════════════════════════════════════════════════
# FASE 6: COMMIT
# ═══════════════════════════════════════════════════════════════════════

function Invoke-Commit {
    param(
        [string]$Type,
        [hashtable]$Draft,
        [switch]$DryRun
    )
    
    Write-Step -Number 6 -Name "COMMIT - Salvando..." -Status "start"
    
    $outputDir = switch ($Type) {
        'skill' { $CONFIG.SkillsDir }
        'persona' { $CONFIG.PersonasDir }
        'prompt' { $CONFIG.PromptsDir }
    }
    
    $targetDir = Join-Path $outputDir $Draft.Name
    $fileName = switch ($Type) {
        'skill' { "SKILL.md" }
        'persona' { "PERSONA.md" }
        'prompt' { "PROMPT.md" }
    }
    $filePath = Join-Path $targetDir $fileName
    
    if ($DryRun) {
        Write-Host "   [DRY-RUN] Criaria: $filePath" -ForegroundColor Yellow
        Write-Step -Number 6 -Name "COMMIT (dry-run)" -Status "done"
        return $filePath
    }
    
    # Criar diretório
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }
    
    # Atualizar status para approved
    $finalContent = $Draft.Content -replace 'status: pending', 'status: approved'
    
    # Salvar arquivo
    $finalContent | Out-File -FilePath $filePath -Encoding UTF8
    Write-Host "   📁 Arquivo: $filePath" -ForegroundColor Green
    
    # Atualizar INDEX.md
    $indexPath = Join-Path $outputDir "INDEX.md"
    $today = Get-Today
    $indexEntry = "| $($Draft.Name) | $($Draft.Metadata.Domain) | approved | $today | promptos-brain |"
    
    if (Test-Path $indexPath) {
        $indexContent = Get-Content $indexPath -Raw
        if ($indexContent -notmatch [regex]::Escape($Draft.Name)) {
            Add-Content -Path $indexPath -Value $indexEntry
            Write-Host "   📑 INDEX.md atualizado" -ForegroundColor Green
        }
    }
    
    # Atualizar MEMORY.md
    if (Test-Path $CONFIG.MemoryFile) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $memoryEntry = "`n- [$timestamp] $Type ``$($Draft.Name)`` - approved (brain-generate)"
        
        $memoryContent = Get-Content $CONFIG.MemoryFile -Raw
        $memoryContent = $memoryContent -replace '(## 🧠 MEMÓRIA EPISÓDICA RECENTE.*?\n\n)', "`$1$memoryEntry`n"
        Set-Content -Path $CONFIG.MemoryFile -Value $memoryContent -Encoding UTF8
        Write-Host "   🧠 MEMORY.md atualizado" -ForegroundColor Green
    }
    
    Write-Step -Number 6 -Name "COMMIT" -Status "done"
    
    return $filePath
}

# ═══════════════════════════════════════════════════════════════════════
# EXECUÇÃO PRINCIPAL
# ═══════════════════════════════════════════════════════════════════════

Write-Banner

Write-Host "📥 Input: `"$Description`"" -ForegroundColor White
Write-Host "📦 Tipo: $Type`n" -ForegroundColor White

try {
    # 1. CLASSIFY
    $classification = Invoke-Classify -Input $Description
    
    # 2. RESEARCH
    $research = Invoke-Research -Classification $classification -Skip:$NoResearch
    
    # 3. GENERATE
    $draft = Invoke-Generate -Type $Type -Classification $classification -Research $research
    
    # 4. VALIDATE
    $validation = Invoke-Validate -Draft $draft
    
    if (-not $validation.Valid) {
        Write-Host "`n⚠️  Draft com erros, mas prosseguindo para revisão humana..." -ForegroundColor Yellow
    }
    
    # 5. HUMAN GATE
    $approval = Invoke-HumanGate -Draft $draft -AutoApprove:$AutoApprove
    
    switch ($approval.Action) {
        'approve' {
            # 6. COMMIT
            $filePath = Invoke-Commit -Type $Type -Draft $draft -DryRun:$DryRun
            
            Write-Host "`n" + ("═" * 70) -ForegroundColor Green
            Write-Host "  ✅ $($Type.ToUpper()) CRIADO COM SUCESSO!" -ForegroundColor Green
            Write-Host ("═" * 70) -ForegroundColor Green
            Write-Host "`n📁 Localização: $filePath" -ForegroundColor Cyan
            Write-Host "🏷️  Nome: $($draft.Name)" -ForegroundColor White
            Write-Host "📂 Domínio: $($classification.Domain)" -ForegroundColor White
            
            Write-Host "`n🚀 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
            Write-Host "  1. Revisar: cat $filePath" -ForegroundColor White
            Write-Host "  2. Validar: #validate-skill $($draft.Name)" -ForegroundColor White
            Write-Host "  3. Usar: Peça ao agente para aplicar" -ForegroundColor White
        }
        'reject' {
            Write-Host "`n❌ Rejeitado. Motivo: $($approval.Reason)" -ForegroundColor Red
        }
        'cancel' {
            Write-Host "`n🚫 Operação cancelada." -ForegroundColor Yellow
        }
        default {
            Write-Host "`n⚠️  Ação não reconhecida: $($approval.Action). Cancelando." -ForegroundColor Yellow
        }
    }
    
} catch {
    Write-Host "`n❌ Erro: $_" -ForegroundColor Red
    exit 1
}
```

---

## 6. FLUXO DE TRABALHO INTEGRADO

### 6.1 Diagrama de Integração

```
┌─────────────────────────────────────────────────────────────────────────┐
│              FLUXO INTEGRADO: BOOTSTRAPS + BRAIN                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  USUÁRIO                                                                │
│     │                                                                   │
│     ▼                                                                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ ESCOLHA DE COMANDO                                               │  │
│  │                                                                   │  │
│  │  #brain-generate ──────────┐                                     │  │
│  │  #add-skill --brain ───────┼──► brain-generate.ps1               │  │
│  │  #add-persona --brain ─────┘         │                           │  │
│  │                                       ▼                           │  │
│  │  #add-skill ──────────────────► create-skill.ps1 (placeholders)  │  │
│  │  #add-persona ────────────────► add-persona.ps1 (template)       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ BRAIN FLOW (se --brain ou #brain-generate)                       │  │
│  │                                                                   │  │
│  │  CLASSIFY → RESEARCH → GENERATE → VALIDATE → HUMAN GATE → COMMIT │  │
│  │      │          │          │          │           │          │    │  │
│  │      ▼          ▼          ▼          ▼           ▼          ▼    │  │
│  │  Detectar   Buscar     Aplicar   ADR-001    Aprovar/    Salvar    │  │
│  │  domínio    fontes     template  check      Rejeitar    arquivo   │  │
│  │                                                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ PÓS-GERAÇÃO                                                      │  │
│  │                                                                   │  │
│  │  #validate-skill {nome} ──────► validate-skill.ps1 (ADR-001)     │  │
│  │  #expand-skill {nome} ────────► expand-skill.ps1 (placeholders)  │  │
│  │  #expand-skill {nome} --brain ► brain expande com pesquisa       │  │
│  │  #sync ───────────────────────► sync.ps1 (multi-agent)           │  │
│  │                                                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Cenários de Uso

```markdown
## CENÁRIO 1: Criar Skill Rápida (sem Brain)

```bash
# Criar com placeholders
#add-skill docker-basics --category technology --mode fast

# Resultado: Arquivo com [AQUI], [PENDENTE], [OPCIONAL]

# Depois, expandir manualmente ou com Brain
#expand-skill docker-basics --brain
```

---

## CENÁRIO 2: Criar Skill Completa (com Brain)

```bash
# Criar com Brain (pesquisa + geração + aprovação)
#add-skill graphql-api --category technology --brain \
  --description "API GraphQL com Apollo Server, auth JWT, rate limiting"

# Resultado: Arquivo completo, aprovado, pronto para uso
```

---

## CENÁRIO 3: Criar Persona com Brain

```bash
# Criar persona DevOps
#add-persona devops-engineer --brain \
  --description "Kubernetes, CI/CD GitHub Actions, Terraform, observabilidade"

# Resultado: Persona com skills mapeadas, comportamentos definidos
```

---

## CENÁRIO 4: Workflow Spec-Kit para Feature Complexa

```bash
# Brain detecta complexidade e sugere Spec-Kit
#brain-generate skill "Sistema completo de pagamentos com Stripe"

# Output: "⚠️ Feature complexa detectada. Recomendo Spec-Kit..."

# Usuário aceita, segue fluxo Spec-Kit
#speckit.specify Sistema de Pagamentos Stripe
#speckit.plan
#speckit.tasks

# Depois, Brain gera skills necessárias
#brain-generate skill "stripe-checkout-integration"
#brain-generate skill "stripe-webhooks-handling"
#brain-generate skill "payment-error-handling"
```

---

## CENÁRIO 5: Multi-Agente com Sync

```bash
# Agente A (Claude) cria skill
#brain-generate skill "react-forms"

# Agente B (Copilot) cria skill
#brain-generate skill "react-validation"

# Sincronizar decisões
#sync

# Resultado: MEMORY.md consolidado com histórico de ambos
```
```

---

## APÊNDICE: Checklist de Integração

```markdown
## CHECKLIST: Integrar Brain com Bootstraps Existentes

### Arquivos a Criar
- [ ] `brain-generate.ps1` - Script principal do Brain
- [ ] `brain-generate-protocol.md` - Protocolo documentado

### Arquivos a Atualizar
- [ ] `add-skill.ps1` - Adicionar flag --brain
- [ ] `add-skill-protocol.md` - Documentar modo Brain
- [ ] `add-persona.ps1` - Adicionar flag --brain  
- [ ] `add-persona-protocol.md` - Documentar modo Brain
- [ ] `expand-skill.ps1` - Integrar com Brain

### Configuração
- [ ] Criar `brain-config.yaml` em ~/src/prompt-os/core/
- [ ] Criar diretório `skills/generated/`
- [ ] Criar diretório `personas/generated/`
- [ ] Criar diretório `prompts/generated/`
- [ ] Criar INDEX.md em cada diretório

### Testes
- [ ] `#brain-generate skill "teste"` funciona
- [ ] `#add-skill teste --brain` funciona
- [ ] Human Gate pausa corretamente
- [ ] INDEX.md atualiza após commit
- [ ] MEMORY.md registra operação
- [ ] Validação ADR-001 passa
```

---

**FIM DO DOCUMENTO DE INTEGRAÇÃO**

*Versão: 3.5.0 | Última atualização: 2026-02-02*
