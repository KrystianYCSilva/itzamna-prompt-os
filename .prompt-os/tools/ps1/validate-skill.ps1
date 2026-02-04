<#
.SYNOPSIS
    Valida skills do PromptOS seguindo ADR-001

.DESCRIPTION
    Script de validação que verifica:
    - YAML frontmatter válido e completo
    - Seções obrigatórias presentes
    - Token budget respeitado
    - Nenhum placeholder remanescente

.PARAMETER Path
    Caminho para o arquivo de skill ou diretório

.PARAMETER Strict
    Modo estrito - falha em warnings também

.PARAMETER Fix
    Tenta corrigir problemas automaticamente

.EXAMPLE
    .\validate-skill.ps1 -Path "skills/technology/cloud/docker.md"
    
.EXAMPLE
    .\validate-skill.ps1 -Path "skills/" -Strict
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$Path,
    
    [switch]$Strict,
    
    [switch]$Fix,
    
    [switch]$Verbose
)

# ============================================================================
# CONFIGURAÇÃO
# ============================================================================

$Script:RequiredYamlFields = @(
    'name',
    'description',
    'keywords',
    'category',
    'subcategory',
    'version',
    'created',
    'type'
)

$Script:RequiredSections = @(
    'When to Use',
    'Core Concepts',
    'Best Practices',
    'Common Pitfalls',
    'Related Skills'
)

$Script:ForbiddenPatterns = @(
    '\{[A-Za-z_-]+\}',           # {placeholder}
    '\[AQUI:',                    # [AQUI: ...]
    '\[PENDENTE',                 # [PENDENTE ...]
    '\[TODO',                     # [TODO ...]
    'Lorem ipsum'                 # Placeholder text
)

$Script:TokenBudgets = @{
    'yaml' = 150
    'when_to_use' = 150
    'core_concepts' = 1000
    'best_practices' = 200
    'common_pitfalls' = 200
    'related_skills' = 100
    'total' = 1600
}

# ============================================================================
# FUNÇÕES DE VALIDAÇÃO
# ============================================================================

function Get-TokenEstimate {
    param([string]$Text)
    
    # Estimativa simples: ~4 caracteres por token em inglês
    # Ajuste para português: ~3.5 caracteres por token
    $charCount = $Text.Length
    return [math]::Ceiling($charCount / 3.5)
}

function Parse-YamlFrontmatter {
    param([string]$Content)
    
    $pattern = '(?s)^---\r?\n(.+?)\r?\n---'
    if ($Content -match $pattern) {
        $yamlContent = $Matches[1]
        
        $yaml = @{}
        $currentKey = $null
        $multilineValue = $false
        $multilineContent = @()
        
        foreach ($line in $yamlContent -split "`n") {
            $line = $line.TrimEnd()
            
            # Handle multiline values
            if ($multilineValue) {
                if ($line -match '^\s{2}' -or $line -eq '') {
                    $multilineContent += $line.TrimStart()
                    continue
                } else {
                    $yaml[$currentKey] = ($multilineContent -join "`n").Trim()
                    $multilineValue = $false
                    $multilineContent = @()
                }
            }
            
            # Parse key: value
            if ($line -match '^([a-z_-]+):\s*(.*)$') {
                $key = $Matches[1]
                $value = $Matches[2].Trim()
                
                if ($value -eq '|' -or $value -eq '>') {
                    $currentKey = $key
                    $multilineValue = $true
                    $multilineContent = @()
                } elseif ($value -eq '' -or $value -match '^\s*$') {
                    # List or empty - check next lines
                    $yaml[$key] = @()
                    $currentKey = $key
                } else {
                    # Remove quotes if present
                    $value = $value -replace '^["'']|["'']$', ''
                    $yaml[$key] = $value
                }
            } elseif ($line -match '^\s+-\s+(.+)$' -and $currentKey) {
                # List item
                if ($yaml[$currentKey] -isnot [array]) {
                    $yaml[$currentKey] = @()
                }
                $yaml[$currentKey] += $Matches[1].Trim() -replace '^["'']|["'']$', ''
            }
        }
        
        # Handle last multiline value
        if ($multilineValue -and $currentKey) {
            $yaml[$currentKey] = ($multilineContent -join "`n").Trim()
        }
        
        return $yaml
    }
    
    return $null
}

function Test-YamlFields {
    param([hashtable]$Yaml)
    
    $results = @{
        Passed = @()
        Failed = @()
        Warnings = @()
    }
    
    foreach ($field in $Script:RequiredYamlFields) {
        if ($Yaml.ContainsKey($field) -and $Yaml[$field]) {
            $results.Passed += "YAML field '$field' present"
        } else {
            $results.Failed += "Missing required YAML field: $field"
        }
    }
    
    # Validate specific fields
    if ($Yaml['category'] -and $Yaml['category'] -notin @('academic', 'technology')) {
        $results.Failed += "Invalid category: $($Yaml['category']). Must be 'academic' or 'technology'"
    }
    
    if ($Yaml['type'] -and $Yaml['type'] -ne 'skill') {
        $results.Warnings += "Type is '$($Yaml['type'])' - expected 'skill'"
    }
    
    if ($Yaml['keywords'] -and $Yaml['keywords'].Count -lt 3) {
        $results.Warnings += "Only $($Yaml['keywords'].Count) keywords - recommend at least 3"
    }
    
    if ($Yaml['version'] -and $Yaml['version'] -notmatch '^\d+\.\d+\.\d+$') {
        $results.Warnings += "Version '$($Yaml['version'])' doesn't follow semver"
    }
    
    return $results
}

function Test-RequiredSections {
    param([string]$Content)
    
    $results = @{
        Passed = @()
        Failed = @()
        Warnings = @()
    }
    
    foreach ($section in $Script:RequiredSections) {
        if ($Content -match "##\s+$section") {
            $results.Passed += "Section '$section' present"
        } else {
            $results.Failed += "Missing required section: $section"
        }
    }
    
    # Check for Examples section (recommended but not required)
    if ($Content -notmatch '##\s+Examples') {
        $results.Warnings += "No 'Examples' section found (recommended)"
    }
    
    return $results
}

function Test-Placeholders {
    param([string]$Content)
    
    $results = @{
        Passed = @()
        Failed = @()
        Warnings = @()
    }
    
    foreach ($pattern in $Script:ForbiddenPatterns) {
        $matches = [regex]::Matches($Content, $pattern)
        if ($matches.Count -gt 0) {
            foreach ($match in $matches) {
                $results.Failed += "Placeholder found: '$($match.Value)'"
            }
        }
    }
    
    if ($results.Failed.Count -eq 0) {
        $results.Passed += "No placeholders found"
    }
    
    return $results
}

function Test-TokenBudget {
    param([string]$Content)
    
    $results = @{
        Passed = @()
        Failed = @()
        Warnings = @()
        Details = @{}
    }
    
    # Total tokens
    $totalTokens = Get-TokenEstimate -Text $Content
    $results.Details['total'] = $totalTokens
    
    if ($totalTokens -gt $Script:TokenBudgets['total']) {
        $results.Failed += "Total tokens ($totalTokens) exceeds budget ($($Script:TokenBudgets['total']))"
    } else {
        $results.Passed += "Total tokens ($totalTokens) within budget"
    }
    
    # Extract and check Core Concepts section
    if ($Content -match '(?s)## Core Concepts(.+?)(?=## [A-Z]|$)') {
        $coreConceptsTokens = Get-TokenEstimate -Text $Matches[1]
        $results.Details['core_concepts'] = $coreConceptsTokens
        
        if ($coreConceptsTokens -gt $Script:TokenBudgets['core_concepts']) {
            $results.Warnings += "Core Concepts ($coreConceptsTokens tokens) exceeds soft limit ($($Script:TokenBudgets['core_concepts']))"
        }
    }
    
    return $results
}

function Test-CodeBlocks {
    param([string]$Content)
    
    $results = @{
        Passed = @()
        Failed = @()
        Warnings = @()
    }
    
    # Check for code blocks
    $codeBlockMatches = [regex]::Matches($Content, '```[\s\S]*?```')
    
    if ($codeBlockMatches.Count -eq 0) {
        $results.Warnings += "No code blocks found - consider adding examples"
    } else {
        $results.Passed += "Found $($codeBlockMatches.Count) code block(s)"
        
        # Check for unclosed code blocks
        $openCount = ([regex]::Matches($Content, '```')).Count
        if ($openCount % 2 -ne 0) {
            $results.Failed += "Unclosed code block detected"
        }
    }
    
    return $results
}

# ============================================================================
# FUNÇÃO PRINCIPAL
# ============================================================================

function Validate-Skill {
    param([string]$FilePath)
    
    $results = @{
        File = $FilePath
        Valid = $true
        Passed = @()
        Failed = @()
        Warnings = @()
        TokenCount = 0
    }
    
    # Read file
    if (-not (Test-Path $FilePath)) {
        $results.Failed += "File not found: $FilePath"
        $results.Valid = $false
        return $results
    }
    
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    
    # 1. Parse and validate YAML
    Write-Host "`n[1/5] Validating YAML frontmatter..." -ForegroundColor Cyan
    $yaml = Parse-YamlFrontmatter -Content $content
    
    if ($null -eq $yaml) {
        $results.Failed += "No valid YAML frontmatter found"
        $results.Valid = $false
    } else {
        $yamlResults = Test-YamlFields -Yaml $yaml
        $results.Passed += $yamlResults.Passed
        $results.Failed += $yamlResults.Failed
        $results.Warnings += $yamlResults.Warnings
    }
    
    # 2. Validate required sections
    Write-Host "[2/5] Checking required sections..." -ForegroundColor Cyan
    $sectionResults = Test-RequiredSections -Content $content
    $results.Passed += $sectionResults.Passed
    $results.Failed += $sectionResults.Failed
    $results.Warnings += $sectionResults.Warnings
    
    # 3. Check for placeholders
    Write-Host "[3/5] Scanning for placeholders..." -ForegroundColor Cyan
    $placeholderResults = Test-Placeholders -Content $content
    $results.Passed += $placeholderResults.Passed
    $results.Failed += $placeholderResults.Failed
    
    # 4. Check token budget
    Write-Host "[4/5] Calculating token budget..." -ForegroundColor Cyan
    $tokenResults = Test-TokenBudget -Content $content
    $results.Passed += $tokenResults.Passed
    $results.Failed += $tokenResults.Failed
    $results.Warnings += $tokenResults.Warnings
    $results.TokenCount = $tokenResults.Details['total']
    
    # 5. Check code blocks
    Write-Host "[5/5] Validating code blocks..." -ForegroundColor Cyan
    $codeResults = Test-CodeBlocks -Content $content
    $results.Passed += $codeResults.Passed
    $results.Failed += $codeResults.Failed
    $results.Warnings += $codeResults.Warnings
    
    # Determine final validity
    if ($results.Failed.Count -gt 0) {
        $results.Valid = $false
    }
    if ($Strict -and $results.Warnings.Count -gt 0) {
        $results.Valid = $false
    }
    
    return $results
}

function Show-Results {
    param([hashtable]$Results)
    
    Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
    Write-Host "VALIDATION RESULTS: $($Results.File)" -ForegroundColor White
    Write-Host ("=" * 60) -ForegroundColor Gray
    
    # Summary
    $status = if ($Results.Valid) { "✅ PASSED" } else { "❌ FAILED" }
    $statusColor = if ($Results.Valid) { "Green" } else { "Red" }
    Write-Host "`nStatus: $status" -ForegroundColor $statusColor
    Write-Host "Tokens: $($Results.TokenCount)" -ForegroundColor Cyan
    
    # Passed checks
    if ($Results.Passed.Count -gt 0 -and $Verbose) {
        Write-Host "`n✅ Passed ($($Results.Passed.Count)):" -ForegroundColor Green
        foreach ($item in $Results.Passed) {
            Write-Host "   • $item" -ForegroundColor DarkGreen
        }
    }
    
    # Failed checks
    if ($Results.Failed.Count -gt 0) {
        Write-Host "`n❌ Failed ($($Results.Failed.Count)):" -ForegroundColor Red
        foreach ($item in $Results.Failed) {
            Write-Host "   • $item" -ForegroundColor Red
        }
    }
    
    # Warnings
    if ($Results.Warnings.Count -gt 0) {
        Write-Host "`n⚠️ Warnings ($($Results.Warnings.Count)):" -ForegroundColor Yellow
        foreach ($item in $Results.Warnings) {
            Write-Host "   • $item" -ForegroundColor Yellow
        }
    }
    
    Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
}

# ============================================================================
# EXECUÇÃO
# ============================================================================

$files = @()

if (Test-Path $Path -PathType Container) {
    # Directory - find all .md files
    $files = Get-ChildItem -Path $Path -Filter "*.md" -Recurse | 
             Where-Object { $_.Name -notmatch 'INDEX|README|TEMPLATE' }
} else {
    # Single file
    $files = @(Get-Item $Path)
}

$totalPassed = 0
$totalFailed = 0

foreach ($file in $files) {
    $results = Validate-Skill -FilePath $file.FullName
    Show-Results -Results $results
    
    if ($results.Valid) {
        $totalPassed++
    } else {
        $totalFailed++
    }
}

# Summary for multiple files
if ($files.Count -gt 1) {
    Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
    Write-Host "SUMMARY" -ForegroundColor White
    Write-Host ("=" * 60) -ForegroundColor Gray
    Write-Host "Total files: $($files.Count)"
    Write-Host "Passed: $totalPassed" -ForegroundColor Green
    Write-Host "Failed: $totalFailed" -ForegroundColor Red
    Write-Host ("=" * 60) -ForegroundColor Gray
}

# Exit code
if ($totalFailed -gt 0) {
    exit 1
} else {
    exit 0
}
