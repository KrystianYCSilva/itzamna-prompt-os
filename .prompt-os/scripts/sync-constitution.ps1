#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Sync Constitution between Spec-Kit and PromptOS Brain

.DESCRIPTION
    This script synchronizes the Constitution document between:
    - Source: .specify/memory/constitution.md (Spec-Kit canonical source)
    - Targets: Agent-specific directories (.claude, .qwen, .gemini, .cursor, .opencode)
    
    It supports bidirectional sync with conflict detection.

.PARAMETER Direction
    Sync direction: 'push' (spec-kit -> agents), 'pull' (agents -> spec-kit), 'status' (check sync state)

.PARAMETER Force
    Force overwrite without confirmation

.EXAMPLE
    .\sync-constitution.ps1 -Direction status
    .\sync-constitution.ps1 -Direction push
    .\sync-constitution.ps1 -Direction pull -Force

.NOTES
    Part of Itzamna PromptOS v1.0.0
    Follows Constitution Principle VII: Spec-Kit Integration
#>

param(
    [Parameter(Mandatory = $false)]
    [ValidateSet('push', 'pull', 'status')]
    [string]$Direction = 'status',
    
    [Parameter(Mandatory = $false)]
    [switch]$Force
)

# Configuration
$ErrorActionPreference = 'Stop'

function Get-RepoRoot {
    try {
        $result = git rev-parse --show-toplevel 2>$null
        if ($LASTEXITCODE -eq 0) {
            return $result.Trim()
        }
    } catch {}
    
    # Fallback to script location
    return (Resolve-Path (Join-Path $PSScriptRoot "../..")).Path
}

$REPO_ROOT = Get-RepoRoot
$SPECIFY_CONSTITUTION = Join-Path $REPO_ROOT ".specify/memory/constitution.md"
$PROMPTOS_DIR = Join-Path $REPO_ROOT ".prompt-os"

# Agent directories that should receive constitution updates
$AGENT_DIRS = @(
    @{ Name = "Claude"; Path = Join-Path $REPO_ROOT ".claude"; File = "CONSTITUTION.md" },
    @{ Name = "Qwen"; Path = Join-Path $REPO_ROOT ".qwen"; File = "CONSTITUTION.md" },
    @{ Name = "Gemini"; Path = Join-Path $REPO_ROOT ".gemini"; File = "CONSTITUTION.md" },
    @{ Name = "Cursor"; Path = Join-Path $REPO_ROOT ".cursor"; File = "CONSTITUTION.md" },
    @{ Name = "OpenCode"; Path = Join-Path $REPO_ROOT ".opencode"; File = "CONSTITUTION.md" }
)

# Utility functions
function Write-Header {
    param([string]$Title)
    Write-Host ""
    Write-Host ("=" * 70) -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Cyan
    Write-Host ("=" * 70) -ForegroundColor Cyan
    Write-Host ""
}

function Write-Status {
    param(
        [string]$Message,
        [ValidateSet('Info', 'Success', 'Warning', 'Error')]
        [string]$Type = 'Info'
    )
    
    $color = switch ($Type) {
        'Info' { 'White' }
        'Success' { 'Green' }
        'Warning' { 'Yellow' }
        'Error' { 'Red' }
    }
    
    $prefix = switch ($Type) {
        'Info' { '[INFO]' }
        'Success' { '[OK]' }
        'Warning' { '[WARN]' }
        'Error' { '[ERROR]' }
    }
    
    Write-Host "$prefix $Message" -ForegroundColor $color
}

function Get-FileHash256 {
    param([string]$Path)
    
    if (-not (Test-Path $Path)) {
        return $null
    }
    
    return (Get-FileHash -Path $Path -Algorithm SHA256).Hash
}

function Get-ConstitutionVersion {
    param([string]$Path)
    
    if (-not (Test-Path $Path)) {
        return "N/A"
    }
    
    $content = Get-Content $Path -Raw
    if ($content -match '\*\*Version\*\*:\s*(\d+\.\d+\.\d+)') {
        return $matches[1]
    }
    
    return "Unknown"
}

function Get-ConstitutionRatifiedDate {
    param([string]$Path)
    
    if (-not (Test-Path $Path)) {
        return "N/A"
    }
    
    $content = Get-Content $Path -Raw
    if ($content -match '\*\*Ratified\*\*:\s*(\d{4}-\d{2}-\d{2})') {
        return $matches[1]
    }
    
    return "Unknown"
}

function Get-ContentWithoutSyncHeader {
    param([string]$Path)
    
    if (-not (Test-Path $Path)) {
        return $null
    }
    
    $content = Get-Content $Path -Raw
    # Remove sync header comment block at the start
    $cleanContent = $content -replace '(?s)^<!--\s*Constitution synced[\s\S]*?-->\s*\n*', ''
    return $cleanContent.Trim()
}

function Compare-ConstitutionContent {
    param(
        [string]$SourcePath,
        [string]$AgentPath
    )
    
    $sourceContent = (Get-Content $SourcePath -Raw).Trim()
    $agentContent = Get-ContentWithoutSyncHeader $AgentPath
    
    if ($null -eq $agentContent) {
        return $false
    }
    
    return $sourceContent -eq $agentContent
}

# Check sync status
function Get-SyncStatus {
    Write-Header "Constitution Sync Status"
    
    # Check source
    Write-Status "Checking source constitution..."
    
    if (-not (Test-Path $SPECIFY_CONSTITUTION)) {
        Write-Status "Source constitution not found: $SPECIFY_CONSTITUTION" -Type Error
        return $false
    }
    
    $sourceHash = Get-FileHash256 $SPECIFY_CONSTITUTION
    $sourceVersion = Get-ConstitutionVersion $SPECIFY_CONSTITUTION
    $sourceDate = Get-ConstitutionRatifiedDate $SPECIFY_CONSTITUTION
    
    Write-Status "Source: .specify/memory/constitution.md" -Type Success
    Write-Status "  Version: $sourceVersion | Ratified: $sourceDate"
    Write-Status "  Hash: $($sourceHash.Substring(0, 16))..."
    Write-Host ""
    
    # Check agents
    Write-Status "Checking agent constitutions..."
    Write-Host ""
    
    $syncNeeded = @()
    $inSync = @()
    $missing = @()
    
    foreach ($agent in $AGENT_DIRS) {
        $agentFile = Join-Path $agent.Path $agent.File
        
        if (-not (Test-Path $agent.Path)) {
            Write-Host "  [ ] $($agent.Name): Agent directory not found" -ForegroundColor DarkGray
            continue
        }
        
        if (-not (Test-Path $agentFile)) {
            Write-Host "  [!] $($agent.Name): Constitution missing" -ForegroundColor Yellow
            $missing += $agent
            continue
        }
        
        $agentHash = Get-FileHash256 $agentFile
        $agentVersion = Get-ConstitutionVersion $agentFile
        
        # Compare content (ignoring sync header)
        $isInSync = Compare-ConstitutionContent -SourcePath $SPECIFY_CONSTITUTION -AgentPath $agentFile
        
        if ($isInSync) {
            Write-Host "  [OK] $($agent.Name): In sync (v$agentVersion)" -ForegroundColor Green
            $inSync += $agent
        } else {
            Write-Host "  [!=] $($agent.Name): Out of sync (v$agentVersion)" -ForegroundColor Yellow
            $syncNeeded += $agent
        }
    }
    
    Write-Host ""
    Write-Host ("-" * 50)
    Write-Status "Summary:"
    Write-Status "  In Sync: $($inSync.Count) agents"
    if ($syncNeeded.Count -gt 0) {
        Write-Status "  Need Sync: $($syncNeeded.Count) agents" -Type Warning
    } else {
        Write-Status "  Need Sync: 0 agents"
    }
    if ($missing.Count -gt 0) {
        Write-Status "  Missing: $($missing.Count) agents" -Type Warning
    } else {
        Write-Status "  Missing: 0 agents"
    }
    
    return @{
        InSync = $inSync
        NeedSync = $syncNeeded
        Missing = $missing
        SourceHash = $sourceHash
        SourceVersion = $sourceVersion
    }
}

# Push constitution to agents
function Push-Constitution {
    Write-Header "Push Constitution to Agents"
    
    if (-not (Test-Path $SPECIFY_CONSTITUTION)) {
        Write-Status "Source constitution not found!" -Type Error
        return $false
    }
    
    $sourceContent = Get-Content $SPECIFY_CONSTITUTION -Raw
    $sourceVersion = Get-ConstitutionVersion $SPECIFY_CONSTITUTION
    
    Write-Status "Pushing constitution v$sourceVersion to agents..."
    Write-Host ""
    
    $updated = 0
    $created = 0
    $skipped = 0
    
    foreach ($agent in $AGENT_DIRS) {
        if (-not (Test-Path $agent.Path)) {
            Write-Host "  [SKIP] $($agent.Name): Directory not found" -ForegroundColor DarkGray
            $skipped++
            continue
        }
        
        $agentFile = Join-Path $agent.Path $agent.File
        $exists = Test-Path $agentFile
        
        if ($exists -and -not $Force) {
            $agentHash = Get-FileHash256 $agentFile
            $sourceHash = Get-FileHash256 $SPECIFY_CONSTITUTION
            
            if ($agentHash -eq $sourceHash) {
                Write-Host "  [SKIP] $($agent.Name): Already in sync" -ForegroundColor DarkGray
                $skipped++
                continue
            }
        }
        
        # Add agent-specific header (using string concatenation instead of here-string)
        $syncDate = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
        $header = "<!--`n"
        $header += "  Constitution synced from .specify/memory/constitution.md`n"
        $header += "  Agent: $($agent.Name)`n"
        $header += "  Synced: $syncDate`n"
        $header += "  DO NOT EDIT - Changes will be overwritten on next sync`n"
        $header += "  To modify, edit .specify/memory/constitution.md and run sync-constitution.ps1 -Direction push`n"
        $header += "-->`n`n"
        
        $agentContent = $header + $sourceContent
        
        Set-Content -Path $agentFile -Value $agentContent -Encoding UTF8
        
        if ($exists) {
            Write-Host "  [UPD] $($agent.Name): Updated to v$sourceVersion" -ForegroundColor Green
            $updated++
        } else {
            Write-Host "  [NEW] $($agent.Name): Created v$sourceVersion" -ForegroundColor Cyan
            $created++
        }
    }
    
    Write-Host ""
    Write-Host ("-" * 50)
    Write-Status "Push complete!"
    Write-Status "  Created: $created"
    Write-Status "  Updated: $updated"
    Write-Status "  Skipped: $skipped"
    
    return $true
}

# Pull constitution from agent (merge/conflict detection)
function Pull-Constitution {
    Write-Header "Pull Constitution from Agent"
    
    Write-Status "Checking for modifications in agent directories..."
    Write-Host ""
    
    $modifications = @()
    
    foreach ($agent in $AGENT_DIRS) {
        $agentFile = Join-Path $agent.Path $agent.File
        
        if (-not (Test-Path $agentFile)) {
            continue
        }
        
        # Use content comparison (ignoring sync header)
        $isInSync = Compare-ConstitutionContent -SourcePath $SPECIFY_CONSTITUTION -AgentPath $agentFile
        
        if (-not $isInSync) {
            $agentVersion = Get-ConstitutionVersion $agentFile
            $modifications += @{
                Agent = $agent
                Version = $agentVersion
                Path = $agentFile
            }
            
            Write-Host "  [MOD] $($agent.Name): Has modifications (v$agentVersion)" -ForegroundColor Yellow
        } else {
            Write-Host "  [OK] $($agent.Name): No modifications" -ForegroundColor Green
        }
    }
    
    if ($modifications.Count -eq 0) {
        Write-Status "No modifications found in agent directories." -Type Success
        Write-Status "Source constitution is authoritative."
        return $true
    }
    
    Write-Host ""
    Write-Status "$($modifications.Count) agent(s) have modifications." -Type Warning
    Write-Host ""
    
    if (-not $Force) {
        Write-Status "Pull would overwrite source. Use -Force to confirm, or manually review:"
        foreach ($mod in $modifications) {
            Write-Host "  - $($mod.Path)"
        }
        Write-Host ""
        Write-Status "Recommended: Edit .specify/memory/constitution.md directly and push."
        return $false
    }
    
    # If force and only one modification, use it
    if ($modifications.Count -eq 1 -and $Force) {
        $mod = $modifications[0]
        Write-Status "Force pulling from $($mod.Agent.Name)..."
        
        $agentContent = Get-Content $mod.Path -Raw
        # Remove sync header
        $cleanContent = $agentContent -replace '(?s)^<!--[\s\S]*?-->\s*\n*', ''
        
        # Backup source
        $backupPath = "$SPECIFY_CONSTITUTION.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Copy-Item $SPECIFY_CONSTITUTION $backupPath
        Write-Status "Backup created: $backupPath"
        
        Set-Content -Path $SPECIFY_CONSTITUTION -Value $cleanContent -Encoding UTF8
        Write-Status "Constitution updated from $($mod.Agent.Name)" -Type Success
        
        return $true
    }
    
    Write-Status "Multiple modifications found. Manual merge required." -Type Error
    return $false
}

# Main execution
switch ($Direction) {
    'status' {
        $status = Get-SyncStatus
    }
    'push' {
        Push-Constitution
    }
    'pull' {
        Pull-Constitution
    }
}

Write-Host ""
