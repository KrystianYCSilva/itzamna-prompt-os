# validate-skills-yaml.ps1
# Validates skill files for ADR-001 compliance
# Usage: .\validate-skills-yaml.ps1 [-Path "path/to/skill.md"] [-Directory "path/to/skills/"]

param(
    [string]$Path = "",
    [string]$Directory = "",
    [switch]$Verbose = $false
)

# Colors
$COLOR_GREEN = "Green"
$COLOR_RED = "Red"
$COLOR_YELLOW = "Yellow"
$COLOR_CYAN = "Cyan"
$COLOR_GRAY = "Gray"

# Statistics
$script:totalFiles = 0
$script:passedFiles = 0
$script:failedFiles = 0
$script:errors = @()

function Write-ColorOutput {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Extract-YAMLBlock {
    param([string]$Content)
    
    if ($Content -match '(?s)^---\s*\n(.*?)\n---') {
        return $matches[1]
    }
    return $null
}

function Parse-YAMLField {
    param([string]$YAMLBlock, [string]$FieldName)
    
    # Handle multi-line fields (description)
    if ($YAMLBlock -match "(?ms)^$FieldName\s*:\s*|\s*\n((?:  .+\n?)*)") {
        $value = $matches[1].Trim()
        return $value
    }
    
    # Handle array fields (keywords, etc) - FIXED: stop at next field
    if ($YAMLBlock -match "(?ms)^$FieldName\s*:\s*\n((?:  - [^\n]+\n)+)") {
        $arrayContent = $matches[1]
        $items = @()
        foreach ($line in $arrayContent -split "\n") {
            if ($line -match '^\s*-\s*(.+)$') {
                $items += $matches[1].Trim()
            }
        }
        return $items
    }
    
    # Handle simple fields
    if ($YAMLBlock -match "(?m)^$FieldName\s*:\s*(.+)$") {
        return $matches[1].Trim()
    }
    
    return $null
}

function Validate-SkillFile {
    param([string]$FilePath)
    
    $script:totalFiles++
    $fileName = Split-Path $FilePath -Leaf
    $errors = @()
    
    if ($Verbose) {
        Write-ColorOutput "`nValidating: $fileName" $COLOR_CYAN
    }
    
    # Read file
    if (-not (Test-Path $FilePath)) {
        $errors += "File not found: $FilePath"
        return $errors
    }
    
    $content = Get-Content $FilePath -Raw
    
    # Check 1: Extract YAML block
    $yamlBlock = Extract-YAMLBlock -Content $content
    if (-not $yamlBlock) {
        $errors += "No YAML frontmatter found (must start with ---")"
        return $errors
    }
    
    if ($Verbose) {
        Write-ColorOutput "  ✓ YAML frontmatter found" $COLOR_GRAY
    }
    
    # Check 2: Required fields (9 fields for skills, 8 for templates/protocols)
    $requiredFields = @("name", "description", "version", "created", "type")
    
    # Skills require additional fields
    if ($yamlBlock -match 'type\s*:\s*skill') {
        $requiredFields += @("keywords", "category", "subcategory")
    }
    
    foreach ($field in $requiredFields) {
        $value = Parse-YAMLField -YAMLBlock $yamlBlock -FieldName $field
        if (-not $value) {
            $errors += "Missing required field: $field"
        } elseif ($Verbose) {
            Write-ColorOutput "  ✓ Field '$field' present" $COLOR_GRAY
        }
    }
    
    # Check 3: Forbidden fields
    $forbiddenFields = @(
        "level", "difficulty", "experience_level",
        "validated_universities", "academic_foundation",
        "tags", "author", "contributors",
        "model_type", "optimized_for", "temperature", "few_shot"
    )
    
    foreach ($field in $forbiddenFields) {
        if ($yamlBlock -match "(?m)^$field\s*:") {
            $errors += "Forbidden field found: $field (not allowed per ADR-001)"
        }
    }
    
    if ($Verbose -and $errors.Count -eq 0) {
        Write-ColorOutput "  ✓ No forbidden fields" $COLOR_GRAY
    }
    
    # Check 4: Description must be multi-line
    $description = Parse-YAMLField -YAMLBlock $yamlBlock -FieldName "description"
    if ($description -and $yamlBlock -notmatch 'description\s*:\s*|') {
        $errors += "Description must be multi-line (use 'description: |')"
    } elseif ($Verbose -and $description) {
        Write-ColorOutput "  ✓ Description is multi-line" $COLOR_GRAY
    }
    
    # Check 5: Keywords must be array (for skills)
    if ($yamlBlock -match 'type\s*:\s*skill') {
        $keywords = Parse-YAMLField -YAMLBlock $yamlBlock -FieldName "keywords"
        if ($keywords -is [array]) {
            if ($keywords.Count -lt 3) {
                $errors += "Keywords must have at least 3 items (found: $($keywords.Count))"
            } elseif ($keywords.Count -gt 10) {
                $errors += "Keywords should have max 10 items (found: $($keywords.Count))"
            } elseif ($Verbose) {
                $msg = "  OK: Keywords array valid ({0} items)" -f $keywords.Count
                Write-ColorOutput $msg $COLOR_GRAY
            }
        } else {
            $errors += "Keywords must be an array (not inline)"
        }
    }
    
    # Check 6: Category validation (for skills)
    if ($yamlBlock -match 'type\s*:\s*skill') {
        $category = Parse-YAMLField -YAMLBlock $yamlBlock -FieldName "category"
        if ($category -and $category -notin @("academic", "technology")) {
            $errors += "Category must be 'academic' or 'technology' (found: $category)"
        } elseif ($Verbose -and $category) {
            Write-ColorOutput "  ✓ Category valid: $category" $COLOR_GRAY
        }
    }
    
    # Check 7: Version must be quoted string "3.5.0"
    if ($yamlBlock -match 'version\s*:\s*["'']3\.5\.0["'']') {
        if ($Verbose) {
            Write-ColorOutput "  ✓ Version is quoted: `"3.5.0`"" $COLOR_GRAY
        }
    } else {
        $errors += "Version must be quoted string: `"3.5.0`" (not 3.5.0 or '3.5.0')"
    }
    
    # Check 8: Created must be ISO 8601 date (YYYY-MM-DD)
    $created = Parse-YAMLField -YAMLBlock $yamlBlock -FieldName "created"
    if ($created -and $created -match '^\d{4}-\d{2}-\d{2}$') {
        if ($Verbose) {
            Write-ColorOutput "  ✓ Created date is ISO 8601: $created" $COLOR_GRAY
        }
    } else {
        $errors += "Created must be ISO 8601 date (YYYY-MM-DD), found: $created"
    }
    
    # Check 9: Type validation
    $type = Parse-YAMLField -YAMLBlock $yamlBlock -FieldName "type"
    $validTypes = @("skill", "template", "meta-protocol")
    if ($type -and $type -notin $validTypes) {
        $errors += "Type must be one of: $($validTypes -join ', ') (found: $type)"
    } elseif ($Verbose -and $type) {
        Write-ColorOutput "  ✓ Type valid: $type" $COLOR_GRAY
    }
    
    # Check 10: File size (skills should be ≤ 3KB)
    if ($yamlBlock -match 'type\s*:\s*skill') {
        $sizeKB = [math]::Round((Get-Item $FilePath).Length / 1KB, 1)
        if ($sizeKB -gt 3.0) {
            $errors += "File size exceeds 3KB limit: $sizeKB KB (consider extracting examples)"
        } elseif ($sizeKB -gt 2.0) {
            if ($Verbose) {
                Write-ColorOutput "  ⚠ File size: $sizeKB KB (approaching 3KB limit)" $COLOR_YELLOW
            }
        } elseif ($Verbose) {
            Write-ColorOutput "  ✓ File size OK: $sizeKB KB" $COLOR_GRAY
        }
    }
    
    return $errors
}

function Show-Summary {
    Write-ColorOutput "`n═══════════════════════════════════════════════════════════════" $COLOR_CYAN
    Write-ColorOutput "                     VALIDATION SUMMARY                          " "White"
    Write-ColorOutput "═══════════════════════════════════════════════════════════════" $COLOR_CYAN
    Write-ColorOutput ""
    
    Write-ColorOutput "Files Validated: $script:totalFiles" "White"
    Write-ColorOutput "Passed: $script:passedFiles" $COLOR_GREEN
    Write-ColorOutput "Failed: $script:failedFiles" $COLOR_RED
    Write-ColorOutput ""
    
    if ($script:failedFiles -eq 0) {
        Write-ColorOutput "✅ ALL FILES PASSED ADR-001 VALIDATION!" $COLOR_GREEN
        Write-ColorOutput ""
        return 0
    } else {
        Write-ColorOutput "❌ VALIDATION FAILED - See errors above" $COLOR_RED
        Write-ColorOutput ""
        return 1
    }
}

# Main execution
Write-ColorOutput "🔍 ADR-001 YAML Validation Tool" $COLOR_CYAN
Write-ColorOutput "Validating skill files for compliance..." "White"
Write-ColorOutput ""

$filesToValidate = @()

if ($Path) {
    $filesToValidate += $Path
} elseif ($Directory) {
    $filesToValidate = Get-ChildItem -Path $Directory -Filter "*.md" -Recurse | Select-Object -ExpandProperty FullName
} else {
    # Default: validate examples we just created
    $examplePaths = @(
        "src\prompt-os\skills\academic\fundamentals\algorithm-design.md",
        "src\prompt-os\skills\technology\cloud\docker.md",
        "src\prompt-os\skills\technology\spring\spring-security.md"
    )
    $filesToValidate = $examplePaths | Where-Object { Test-Path $_ }
}

foreach ($file in $filesToValidate) {
    $fileErrors = Validate-SkillFile -FilePath $file
    
    $fileName = Split-Path $file -Leaf
    
    if ($fileErrors.Count -eq 0) {
        Write-ColorOutput "✅ $fileName - PASSED" $COLOR_GREEN
        $script:passedFiles++
    } else {
        Write-ColorOutput "❌ $fileName - FAILED" $COLOR_RED
        $script:failedFiles++
        $script:errors += @{ File = $fileName; Errors = $fileErrors }
        
        foreach ($error in $fileErrors) {
            Write-ColorOutput "   ✗ $error" $COLOR_RED
        }
    }
}

# Show detailed errors if any
if ($script:errors.Count -gt 0) {
    Write-ColorOutput "`n═══════════════════════════════════════════════════════════════" $COLOR_YELLOW
    Write-ColorOutput "                       DETAILED ERRORS                           " "White"
    Write-ColorOutput "═══════════════════════════════════════════════════════════════" $COLOR_YELLOW
    Write-ColorOutput ""
    
    foreach ($errorGroup in $script:errors) {
        Write-ColorOutput "File: $($errorGroup.File)" $COLOR_YELLOW
        foreach ($error in $errorGroup.Errors) {
            Write-ColorOutput "  • $error" $COLOR_RED
        }
        Write-ColorOutput ""
    }
}

# Summary
$exitCode = Show-Summary
exit $exitCode