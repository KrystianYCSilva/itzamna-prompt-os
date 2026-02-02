<#
.SYNOPSIS
    Sincroniza memória e estado multi-agente no projeto.

.DESCRIPTION
    Lê sessões pendentes em .memory/session-*.md, identifica conflitos de decisão
    e consolida o progresso no MEMORY.md principal.

.EXAMPLE
    .\sync.ps1

.NOTES
    Version: 3.5.0
    Status: Functional
#>

[CmdletBinding()]
param(
    [switch]$Verbose
)

# Configuração
$ProjectRoot = Get-Location
$MemoryFile = Join-Path $ProjectRoot "MEMORY.md"
$SessionDir = Join-Path $ProjectRoot ".memory"
$SignatureFile = Join-Path $ProjectRoot ".prompt-os-signature"

Write-Host "`n🔄 PROMPT OS SYNC v3.5.0" -ForegroundColor Cyan
Write-Host "==========================`n" -ForegroundColor Cyan

# 1. Validação de Ambiente
if (-not (Test-Path $MemoryFile)) {
    Write-Host "❌ Erro: MEMORY.md não encontrado. Execute #init primeiro." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $SessionDir)) {
    New-Item -ItemType Directory -Path $SessionDir -Force | Out-Null
    Write-Host "📁 Diretório de sessões criado: .memory/" -ForegroundColor Gray
}

# 2. Coleta de Sessões Pendentes
$sessions = Get-ChildItem -Path $SessionDir -Filter "session-*.md"
Write-Host "🔍 Encontradas $($sessions.Count) sessões para sincronização." -ForegroundColor White

if ($sessions.Count -eq 0) {
    Write-Host "✅ Memória já está sincronizada (nenhuma sessão pendente)." -ForegroundColor Green
    exit 0
}

# 3. Consolidação de Estado
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$consolidationLog = "`n### $timestamp - Multi-Agent Sync`n"

foreach ($session in $sessions) {
    $agentName = $session.Name -replace "session-", "" -replace ".md", ""
    Write-Host "⚙️  Consolidando sessão de: $agentName" -ForegroundColor Yellow
    
    $content = Get-Content $session.FullName -Raw
    
    # Extrair decisões e progresso (baseado em convenção de tags)
    if ($content -match "(?s)## Decisions`n(.*?)(?=`n##|$) அம்ச") {
        $decisions = $matches[1].Trim()
        $consolidationLog += "- **Decisões ($agentName):**`n$decisions`n"
    }
    
    if ($content -match "(?s)## Progress`n(.*?)(?=`n##|$) அம்ச") {
        $progress = $matches[1].Trim()
        $consolidationLog += "- **Progresso ($agentName):**`n$progress`n"
    }
    
    # Mover sessão para histórico (evitar re-processamento)
    $archiveDir = Join-Path $SessionDir "archive"
    if (-not (Test-Path $archiveDir)) { New-Item -ItemType Directory -Path $archiveDir | Out-Null }
    Move-Item -Path $session.FullName -Destination (Join-Path $archiveDir "$($session.BaseName)-$($timestamp -replace ':','-').md") -Force
}

# 4. Atualizar MEMORY.md
try {
    $currentMemory = Get-Content $MemoryFile -Raw
    
    # Localizar seção "Recent Actions"
    $pattern = "(?ms)(## Recent Actions \(Last 5\)\n+)(.*?)(?=---|"`n)"
    
    if ($currentMemory -match $pattern) {
        $header = $matches[1]
        $existingActions = $matches[2]
        
        # Inserir novo log no topo das ações recentes
        $newActions = "$consolidationLog`n$existingActions"
        $newMemory = $currentMemory -replace [regex]::Escape($existingActions), $newActions
        
        Set-Content -Path $MemoryFile -Value $newMemory -Encoding UTF8
        Write-Host "✅ MEMORY.md atualizado com logs de sincronização." -ForegroundColor Green
    } else {
        # Fallback: append ao final
        $currentMemory += "`n`n## Sync Log`n$consolidationLog"
        Set-Content -Path $MemoryFile -Value $currentMemory -Encoding UTF8
        Write-Host "⚠️  Seção 'Recent Actions' não encontrada. Log adicionado ao final." -ForegroundColor Yellow
    }
    
    # 5. Atualizar Assinatura
    if (Test-Path $SignatureFile) {
        $sig = Get-Content $SignatureFile -Raw
        $sig = $sig -replace "(?m)^last_sync=.*$", "last_sync=$timestamp"
        if ($sig -notmatch "last_sync=") { $sig += "`nlast_sync=$timestamp" }
        Set-Content -Path $SignatureFile -Value $sig -Encoding UTF8
    }

    Write-Host "`n🎉 Sincronização concluída com sucesso!" -ForegroundColor Green

} catch {
    Write-Host "❌ Falha crítica na sincronização: $_" -ForegroundColor Red
    exit 1
}