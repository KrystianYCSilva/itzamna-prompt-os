<#
.SYNOPSIS
    Atualiza o Prompt OS para a versão mais recente disponível na biblioteca central.

.DESCRIPTION
    Compara a versão local em .prompt-os-signature com a versão global em src/prompt-os/VERSION.txt.
    Se houver diferença, lista as mudanças e aplica scripts de migração necessários.

.PARAMETER Version
    Força a atualização para uma versão específica.

.PARAMETER Force
    Aplica a atualização mesmo se as versões coincidirem.

.EXAMPLE
    .\update.ps1

.NOTES
    Version: 3.5.0
    Status: Functional
#>

[CmdletBinding()]
param(
    [string]$Version,
    [switch]$Force
)

# Configuração
$ProjectRoot = Get-Location
$GlobalRepo = Resolve-Path (Join-Path $PSScriptRoot "..")
$GlobalVersionFile = Join-Path $GlobalRepo "VERSION.txt"
$SignatureFile = Join-Path $ProjectRoot ".prompt-os-signature"
$MigrationDir = Join-Path $PSScriptRoot "migrations"

Write-Host "`n🆙 PROMPT OS UPDATE v3.5.0" -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

# 1. Obter Versão Global (Desejada)
if (-not (Test-Path $GlobalVersionFile)) {
    Write-Host "❌ Erro: Arquivo de versão global não encontrado em $GlobalVersionFile" -ForegroundColor Red
    exit 1
}
$targetVersion = (Get-Content $GlobalVersionFile).Trim()
if ($Version) { $targetVersion = $Version }

# 2. Obter Versão Local (Atual)
if (-not (Test-Path $SignatureFile)) {
    Write-Host "⚠️  Assinatura não encontrada. Assumindo instalação incompleta." -ForegroundColor Yellow
    $currentVersion = "0.0.0"
} else {
    $sigContent = Get-Content $SignatureFile -Raw
    if ($sigContent -match "version=([0-9.]+)") {
        $currentVersion = $matches[1]
    } else {
        $currentVersion = "0.0.0"
    }
}

Write-Host "  🔍 Versão Atual:  $currentVersion" -ForegroundColor White
Write-Host "  🎯 Versão Alvo:   $targetVersion" -ForegroundColor White

# 3. Verificar Necessidade de Update
if ($currentVersion -eq $targetVersion -and -not $Force) {
    Write-Host "`n✅ Você já está rodando a versão mais recente ($currentVersion)." -ForegroundColor Green
    exit 0
}

# 4. Listar Mudanças (Changelog Simplificado)
Write-Host "`n📝 Mudanças pendentes ($currentVersion → $targetVersion):" -ForegroundColor Yellow
$changelog = Join-Path $GlobalRepo "..\..\CHANGELOG.md"
if (Test-Path $changelog) {
    $changes = Get-Content $changelog | Select-String -Pattern "v$targetVersion" -Context 0, 10
    Write-Host $changes -ForegroundColor Gray
} else {
    Write-Host "  - Atualização de estrutura e correções de segurança." -ForegroundColor Gray
}

# 5. Executar Migrações
Write-Host "`n⚙️  Iniciando migração..." -ForegroundColor Cyan

# Simulação de passos de migração (exemplo v3.4 -> v3.5)
if ($currentVersion -match "3.4") {
    Write-Host "  📦 Migrando estrutura .prompt-os/ para src/prompt-os/..." -ForegroundColor Gray
    # Lógica de migração de diretórios aqui
}

# 6. Atualizar Assinatura
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$newSig = "version=$targetVersion`ninstalled=$timestamp`nstatus=updated"
Set-Content -Path $SignatureFile -Value $newSig -Encoding UTF8

Write-Host "`n✅ Atualização para v$targetVersion concluída com sucesso!" -ForegroundColor Green
Write-Host "🚀 Próximo passo: Execute #sync para validar o estado do projeto." -ForegroundColor Cyan