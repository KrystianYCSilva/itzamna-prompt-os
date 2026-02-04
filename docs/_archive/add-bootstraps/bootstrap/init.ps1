<#
.SYNOPSIS
    Instala o Prompt OS v3.5 em um projeto.

.DESCRIPTION
    Script de inicialização do Prompt OS que cria a estrutura mínima necessária
    para operação: AGENTS.md, MEMORY.md, .context/, e arquivos de configuração.

.PARAMETER Agente
    Nome do agente IA (claude, gpt, gemini, copilot, qwen). Padrão: autodetect

.PARAMETER Level
    Nível de instalação (minimal, standard, complete). Padrão: standard

.PARAMETER Force
    Força instalação mesmo se Prompt OS já estiver instalado

.PARAMETER DryRun
    Simula a instalação sem criar arquivos

.PARAMETER Lang
    Força detecção de linguagem (java, python, javascript, etc)

.EXAMPLE
    .\init.ps1
    .\init.ps1 -Agente copilot
    .\init.ps1 -Agente claude -Level complete
    .\init.ps1 -Force

.NOTES
    Versão: 3.5.0
    Autor: Prompt OS Team
    Data: 2026-01-30
#>

[CmdletBinding()]
param(
    [Parameter()]
    [ValidateSet('claude', 'gpt', 'gemini', 'copilot', 'qwen', 'autodetect')]
    [string]$Agente = 'autodetect',
    
    [Parameter()]
    [ValidateSet('minimal', 'standard', 'complete')]
    [string]$Level = 'standard',
    
    [Parameter()]
    [switch]$Force,
    
    [Parameter()]
    [switch]$DryRun,
    
    [Parameter()]
    [string]$Lang
)

# CONFIGURAÇÃO
$VERSION = "3.5.0"
$PROMPT_OS_REPO = Resolve-Path (Join-Path $PSScriptRoot "..")
$PROJECT_ROOT = Get-Location

# FUNÇÕES AUXILIARES

function Write-Banner {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  PROMPT OS v$VERSION - INSTALAÇÃO" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Test-PromptOSInstalled {
    return Test-Path (Join-Path $PROJECT_ROOT ".prompt-os-signature")
}

function Get-ProjectName {
    $gitConfig = Join-Path $PROJECT_ROOT ".git\config"
    if (Test-Path $gitConfig) {
        $content = Get-Content $gitConfig -Raw
        if ($content -match 'url\s*=\s*.*/([^/]+?)(?:\.git)?$') {
            return $matches[1]
        }
    }
    return (Get-Item $PROJECT_ROOT).Name
}

function Detect-TechStack {
    param([string]$ForceLang)
    
    if ($ForceLang) {
        return @{
            Language = $ForceLang
            Framework = "Unknown"
            BuildTool = "Unknown"
        }
    }
    
    # Java/Kotlin
    if (Test-Path "pom.xml") {
        $pom = Get-Content "pom.xml" -Raw
        $springBoot = $pom -match "spring-boot"
        return @{
            Language = "Java"
            Version = if ($pom -match '<maven.compiler.source>(\d+)</maven.compiler.source>') { $matches[1] } else { "17" }
            Framework = if ($springBoot) { "Spring Boot" } else { "Maven" }
            BuildTool = "Maven"
        }
    }
    
    if (Test-Path "build.gradle" -or Test-Path "build.gradle.kts") {
        return @{
            Language = "Kotlin/Java"
            Version = "11+"
            Framework = "Gradle"
            BuildTool = "Gradle"
        }
    }
    
    # JavaScript/TypeScript
    if (Test-Path "package.json") {
        $pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
        $isReact = $pkg.dependencies.PSObject.Properties.Name -contains "react"
        $isNext = $pkg.dependencies.PSObject.Properties.Name -contains "next"
        $isExpress = $pkg.dependencies.PSObject.Properties.Name -contains "express"
        
        $framework = "Node.js"
        if ($isNext) { $framework = "Next.js" }
        elseif ($isReact) { $framework = "React" }
        elseif ($isExpress) { $framework = "Express" }
        
        return @{
            Language = if (Test-Path "tsconfig.json") { "TypeScript" } else { "JavaScript" }
            Version = "ES2023"
            Framework = $framework
            BuildTool = "npm"
        }
    }
    
    # Python
    if (Test-Path "requirements.txt" -or Test-Path "pyproject.toml") {
        $framework = "Python"
        if (Test-Path "requirements.txt") {
            $req = Get-Content "requirements.txt" -Raw
            if ($req -match "django") { $framework = "Django" }
            elseif ($req -match "flask") { $framework = "Flask" }
            elseif ($req -match "fastapi") { $framework = "FastAPI" }
        }
        
        return @{
            Language = "Python"
            Version = "3.11+"
            Framework = $framework
            BuildTool = "pip"
        }
    }
    
    # Go
    if (Test-Path "go.mod") {
        return @{
            Language = "Go"
            Version = "1.21+"
            Framework = "Go"
            BuildTool = "go mod"
        }
    }
    
    # Rust
    if (Test-Path "Cargo.toml") {
        return @{
            Language = "Rust"
            Version = "1.75+"
            Framework = "Cargo"
            BuildTool = "cargo"
        }
    }
    
    # C#/.NET
    if (Test-Path "*.csproj") {
        return @{
            Language = "C#"
            Version = "12.0"
            Framework = ".NET 8"
            BuildTool = "dotnet"
        }
    }
    
    # Default
    return @{
        Language = "Unknown"
        Version = ""
        Framework = "Unknown"
        BuildTool = "Unknown"
    }
}

function Detect-Agent {
    # Tentar detectar qual agente está executando o script
    if ($env:GITHUB_COPILOT -or $env:VSCODE_GIT_IPC_HANDLE) {
        return "copilot"
    }
    
    # Default
    return "copilot"
}

function Create-File {
    param(
        [string]$Path,
        [string]$Content
    )
    
    if ($DryRun) {
        Write-Host "  [DRY-RUN] Criaria: $Path" -ForegroundColor Yellow
        return
    }
    
    $dir = Split-Path $Path -Parent
    if ($dir -and -not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    $Content | Out-File -FilePath $Path -Encoding UTF8
    Write-Host "  ✅ Criado: $Path" -ForegroundColor Green
}

function Get-TemplateContent {
    param(
        [string]$TemplateName,
        [hashtable]$Variables
    )
    
    $templatePath = Join-Path $PROMPT_OS_REPO "templates\$TemplateName"
    
    if (-not (Test-Path $templatePath)) {
        Write-Host "  ⚠️  Template não encontrado: $TemplateName" -ForegroundColor Yellow
        return "# $TemplateName`n`nTemplate not found. Please create manually."
    }
    
    $content = Get-Content $templatePath -Raw
    
    # Substituir variáveis
    foreach ($key in $Variables.Keys) {
        $content = $content -replace "\{$key\}", $Variables[$key]
    }
    
    return $content
}

# EXECUÇÃO PRINCIPAL

Write-Banner

# FASE 1: DETECTION
Write-Host "📊 FASE 1: DETECÇÃO`n" -ForegroundColor Cyan

# Check se já instalado
if (Test-PromptOSInstalled -and -not $Force) {
    Write-Host "❌ Prompt OS já está instalado neste projeto." -ForegroundColor Red
    Write-Host "   Use -Force para reinstalar ou #update para atualizar.`n" -ForegroundColor Yellow
    exit 1
}

$projectName = Get-ProjectName
Write-Host "  📁 Projeto: $projectName" -ForegroundColor White

$techStack = Detect-TechStack -ForceLang $Lang
Write-Host "  💻 Linguagem: $($techStack.Language) $($techStack.Version)" -ForegroundColor White
Write-Host "  🔧 Framework: $($techStack.Framework)" -ForegroundColor White
Write-Host "  📦 Build Tool: $($techStack.BuildTool)" -ForegroundColor White

if ($Agente -eq 'autodetect') {
    $Agente = Detect-Agent
}
Write-Host "  🤖 Agente: $Agente" -ForegroundColor White

$projectType = if ((Get-ChildItem -Directory | Measure-Object).Count -eq 0) { "Greenfield" } else { "Brownfield" }
Write-Host "  📋 Tipo: $projectType`n" -ForegroundColor White

# FASE 2: STRUCTURE
Write-Host "📂 FASE 2: CRIAÇÃO DE ARQUIVOS`n" -ForegroundColor Cyan

$variables = @{
    PROJECT_NAME = $projectName
    TECH_STACK = "$($techStack.Language) $($techStack.Version) + $($techStack.Framework)"
    AGENTE = $Agente.ToUpper()
    VERSION = $VERSION
    DATE = (Get-Date -Format "yyyy-MM-dd")
    LANGUAGE = $techStack.Language
    LANGUAGE_VERSION = $techStack.Version
    FRAMEWORK = $techStack.Framework
    FRAMEWORK_VERSION = ""
    BUILD_TOOL = $techStack.BuildTool
    INITIAL_STATE = $projectType
}

# 2.1 AGENTS.md
$agentsContent = Get-TemplateContent -TemplateName "AGENTS.template.md" -Variables $variables
Create-File -Path "AGENTS.md" -Content $agentsContent

# 2.2 MEMORY.md
$memoryContent = Get-TemplateContent -TemplateName "MEMORY.template.md" -Variables $variables
Create-File -Path "MEMORY.md" -Content $memoryContent

# 2.3 {agente}.md
$agenteContent = @"
# $($Agente.ToUpper()) - Bootstrap Configuration

**Projeto:** $projectName
**Versão Prompt OS:** $VERSION
**Data:** $(Get-Date -Format "yyyy-MM-dd")

---

## Instruções Específicas para $($Agente.ToUpper())

Este arquivo contém configurações otimizadas para o agente $($Agente.ToUpper()).

### Comandos Rápidos

- ``#new`` - Criar novo Card
- ``#impl CARD-XXX`` - Implementar Card
- ``#review`` - Revisar código
- ``#help`` - Ver todos os comandos

### Performance Tips

- Use JIT loading (carregue apenas skills necessárias)
- Mantenha contexto < 16KB por request
- Atualize MEMORY.md após cada tarefa

---

**Status:** Configurado e pronto para uso! 🚀
"@
Create-File -Path "$Agente.md" -Content $agenteContent

# 2.4 .prompt-os-signature
$signatureContent = @"
version=$VERSION
installed=$(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
agent=$Agente
"@
Create-File -Path ".prompt-os-signature" -Content $signatureContent

# FASE 3: CONTEXT
Write-Host "`n📚 FASE 3: ESTRUTURA DE CONTEXTO`n" -ForegroundColor Cyan

# 3.1 .context/_meta/tech-stack.md
$techStackContent = @"
# Tech Stack - $projectName

## Linguagem Principal
- **Linguagem:** $($techStack.Language)
- **Versão:** $($techStack.Version)

## Framework
- **Framework:** $($techStack.Framework)
- **Build Tool:** $($techStack.BuildTool)

## Dependências Principais
- (A ser preenchido conforme o projeto evolui)

---

**Última Atualização:** $(Get-Date -Format "yyyy-MM-dd")
"@
Create-File -Path ".context\_meta\tech-stack.md" -Content $techStackContent

# 3.2 .context/_meta/project-overview.md (se standard/complete)
if ($Level -in @('standard', 'complete')) {
    $overviewContent = @"
# Project Overview - $projectName

## Descrição
(A ser preenchido)

## Objetivos
- (A ser preenchido)

## Stakeholders
- (A ser preenchido)

---

**Última Atualização:** $(Get-Date -Format "yyyy-MM-dd")
"@
    Create-File -Path ".context\_meta\project-overview.md" -Content $overviewContent
}

# 3.3 .context/standards/architectural-rules.md (T0)
$t0RulesContent = @"
# [T0] Regras Arquiteturais - $projectName

> **Tier 0 (T0):** Regras INEGOCIÁVEIS. Violações devem ser rejeitadas.

## Regras Gerais

### [T0-ARCH-01] Proibido System.out.println
- **Motivo:** Logs devem usar framework (SLF4J, Log4j, Winston, etc)
- **Alternativa:** Use logger apropriado

### [T0-ARCH-02] Proibido catch genérico sem tratamento
\`\`\`
❌ try { ... } catch (Exception e) { }
✅ try { ... } catch (Exception e) { logger.error("...", e); throw new CustomException(...); }
\`\`\`

### [T0-ARCH-03] Proibido hardcoded credentials
- Senhas, API keys, tokens devem estar em environment variables ou vault

## Regras Específicas do Projeto

(Adicione regras específicas aqui)

---

**Última Atualização:** $(Get-Date -Format "yyyy-MM-dd")
"@
Create-File -Path ".context\standards\architectural-rules.md" -Content $t0RulesContent

# 3.4 .context/standards/code-quality.md (T1) (se standard/complete)
if ($Level -in @('standard', 'complete')) {
    $t1QualityContent = @"
# [T1] Padrões de Qualidade - $projectName

> **Tier 1 (T1):** Padrões RECOMENDADOS. Violações devem ser justificadas.

## SOLID Principles
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

## Clean Code
- Métodos < 20 linhas
- Classes < 300 linhas
- Nomes descritivos
- Evitar comentários desnecessários

## Testing
- Cobertura mínima: 80%
- Unit tests para lógica de negócio
- Integration tests para APIs

---

**Última Atualização:** $(Get-Date -Format "yyyy-MM-dd")
"@
    Create-File -Path ".context\standards\code-quality.md" -Content $t1QualityContent
}

# FASE 4: FINALIZATION
Write-Host "`n✅ FASE 4: FINALIZAÇÃO`n" -ForegroundColor Cyan

if (-not $DryRun) {
    Write-Host "🎉 PROMPT OS v$VERSION INSTALADO COM SUCESSO!`n" -ForegroundColor Green
    
    Write-Host "📂 Arquivos criados:" -ForegroundColor Cyan
    Write-Host "  ✅ AGENTS.md (kernel)" -ForegroundColor Green
    Write-Host "  ✅ MEMORY.md (estado)" -ForegroundColor Green
    Write-Host "  ✅ $Agente.md (bootstrap)" -ForegroundColor Green
    Write-Host "  ✅ .context/ (estrutura)" -ForegroundColor Green
    Write-Host "  ✅ .prompt-os-signature" -ForegroundColor Green
    
    Write-Host "`n🚀 PRÓXIMOS PASSOS:`n" -ForegroundColor Cyan
    Write-Host "  1. Personalize .context/standards/architectural-rules.md" -ForegroundColor White
    Write-Host "  2. Execute: #new `"Nome da primeira feature`"" -ForegroundColor White
    Write-Host "  3. Explore: #help para ver todos os comandos`n" -ForegroundColor White
    
    Write-Host "💡 Dica: O sistema está configurado para $($Agente.ToUpper())." -ForegroundColor Yellow
    Write-Host "         Todos os comandos serão otimizados para este agente.`n" -ForegroundColor Yellow
} else {
    Write-Host "🔍 DRY-RUN COMPLETO - Nenhum arquivo foi criado.`n" -ForegroundColor Yellow
}
