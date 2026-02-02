<#
.SYNOPSIS
    Expande placeholders de uma skill criada em modo fast

.DESCRIPTION
    Lê skill existente, identifica placeholders [AQUI], [PENDENTE], [OPCIONAL]
    e expande com conteúdo pesquisado e validado.

.PARAMETER Name
    Nome da skill a expandir

.PARAMETER Section
    Seção específica para expandir (Core Concepts, Examples, etc)
    Se omitido, expande tudo.

.PARAMETER All
    Expande todas as seções de uma vez

.EXAMPLE
    .\expand-skill.ps1 -Name blockchain-basics -Section "Core Concepts"
    .\expand-skill.ps1 -Name devops-culture -All

.NOTES
    Version: 3.5.0
    Requires: AI agent context
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$Name,
    
    [Parameter()]
    [string]$Section,
    
    [Parameter()]
    [switch]$All
)

$skillsDir = Join-Path $PSScriptRoot "..\skills"
if (-not (Test-Path $skillsDir)) {
    Write-Host "❌ Diretório de skills não encontrado em: $skillsDir" -ForegroundColor Red
    exit 1
}

$skillFile = Get-ChildItem -Path $skillsDir -Recurse -Filter "$Name.md" | Select-Object -First 1

if (-not $skillFile) {
    Write-Host "❌ Skill '$Name' não encontrada!" -ForegroundColor Red
    exit 1
}

Write-Host "🔍 Expandindo skill: $Name" -ForegroundColor Cyan
Write-Host "   Arquivo: $($skillFile.FullName)" -ForegroundColor White

$content = Get-Content $skillFile.FullName -Raw

# Contar placeholders
$placeholders = @{
    AQUI = ([regex]::Matches($content, '\[AQUI[^\]]*\]')).Count
    PENDENTE = ([regex]::Matches($content, '\[PENDENTE[^\]]*\]')).Count
    OPCIONAL = ([regex]::Matches($content, '\[OPCIONAL[^\]]*\]')).Count
}

$total = $placeholders.AQUI + $placeholders.PENDENTE + $placeholders.OPCIONAL

Write-Host "`n📊 Placeholders encontrados:" -ForegroundColor Yellow
Write-Host "   [AQUI]: $($placeholders.AQUI)" -ForegroundColor White
Write-Host "   [PENDENTE]: $($placeholders.PENDENTE)" -ForegroundColor White
Write-Host "   [OPCIONAL]: $($placeholders.OPCIONAL)" -ForegroundColor White
Write-Host "   Total: $total`n" -ForegroundColor Cyan

if ($total -eq 0) {
    Write-Host "✅ Skill já está completa (sem placeholders)!" -ForegroundColor Green
    exit 0
}

Write-Host "⚠️  Esta operação requer interação com AI agent." -ForegroundColor Yellow
Write-Host "    Use o agente para pesquisar e expandir conteúdo.`n" -ForegroundColor Yellow

Write-Host "💡 SUGESTÃO: Peça ao agente:" -ForegroundColor Cyan
Write-Host "   'Expanda os placeholders de $Name.md com conteúdo T0/T1 validado'" -ForegroundColor White
