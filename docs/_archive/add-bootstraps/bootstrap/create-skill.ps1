<#
.SYNOPSIS
    Cria uma nova skill rapidamente com placeholders

.DESCRIPTION
    Wrapper para process-skill.ps1 em modo generation rápida.
    Cria skill com estrutura ADR-001 + placeholders para expansão on-demand.

.PARAMETER Name
    Nome da skill (kebab-case)

.PARAMETER Category
    Categoria (fundamentals, software-engineering, etc)

.PARAMETER Mode
    Modo: fast (placeholders) ou complete (full content)

.EXAMPLE
    .\create-skill.ps1 -Name blockchain-basics -Category fundamentals
    .\create-skill.ps1 -Name devops-culture -Category software-engineering -Mode complete

.NOTES
    Version: 3.5.0
    Delegates to: process-skill.ps1
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$Name,
    
    [Parameter(Mandatory=$true)]
    [string]$Category,
    
    [Parameter()]
    [ValidateSet('fast', 'complete')]
    [string]$Mode = 'fast'
)

$processScript = Join-Path $PSScriptRoot "..\..\..\scripts\process-skill.ps1"

if (-not (Test-Path $processScript)) {
    Write-Host "❌ process-skill.ps1 não encontrado!" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Criando skill: $Name" -ForegroundColor Cyan
Write-Host "   Categoria: $Category" -ForegroundColor White
Write-Host "   Modo: $Mode`n" -ForegroundColor White

# Delegar para process-skill.ps1
& $processScript -Name $Name -Category $Category -Mode generation -Detail $Mode

Write-Host "`n✅ Skill '$Name' criada!" -ForegroundColor Green
Write-Host "📝 Próximos passos:" -ForegroundColor Cyan
Write-Host "   - Revisar skill gerada" -ForegroundColor White
Write-Host "   - Executar: #expand-skill $Name (se placeholders)" -ForegroundColor White
Write-Host "   - Executar: #validate-skill $Name" -ForegroundColor White
