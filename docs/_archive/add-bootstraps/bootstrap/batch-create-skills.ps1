<#
.SYNOPSIS
    Cria múltiplas skills de uma vez

.DESCRIPTION
    Lê arquivo CSV ou array e cria múltiplas skills em batch.
    Útil para criar categorias completas rapidamente.

.PARAMETER InputFile
    Arquivo CSV com colunas: name, category, mode

.PARAMETER Skills
    Array de hashtables @{name=''; category=''; mode='fast'}

.EXAMPLE
    .\batch-create-skills.ps1 -InputFile skills-to-create.csv
    .\batch-create-skills.ps1 -Skills @(@{name='skill1'; category='fundamentals'}, ...)

.NOTES
    Version: 3.5.0
    Delegates to: create-skill.ps1
#>

[CmdletBinding()]
param(
    [Parameter(ParameterSetName='File')]
    [string]$InputFile,
    
    [Parameter(ParameterSetName='Array')]
    [hashtable[]]$Skills
)

$createScript = Join-Path $PSScriptRoot "create-skill.ps1"
$created = 0
$failed = 0

if ($InputFile) {
    $Skills = Import-Csv $InputFile
}

Write-Host "📦 BATCH CREATION - $($Skills.Count) skills`n" -ForegroundColor Cyan

foreach ($skill in $Skills) {
    try {
        & $createScript -Name $skill.name -Category $skill.category -Mode $skill.mode
        $created++
    } catch {
        Write-Host "❌ Erro ao criar $($skill.name): $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n📊 RESUMO:" -ForegroundColor Cyan
Write-Host "  ✅ Criadas: $created" -ForegroundColor Green
Write-Host "  ❌ Falhas: $failed" -ForegroundColor Red
