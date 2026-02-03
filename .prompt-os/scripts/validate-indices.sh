#!/usr/bin/env bash
# validate-indices.sh - Validates INDEX.md integrity
# Version: 1.0.0
# Created: 2026-02-03
# Part of: PromptOS v2.1.0

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0

# Root directory (script location is .prompt-os/scripts/)
# Handle both Unix and Windows (Git Bash) paths
if [[ -n "${BASH_SOURCE[0]}" ]]; then
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
else
    # Fallback: assume script is in .prompt-os/scripts/
    SCRIPT_DIR="$(pwd)"
    PROJECT_ROOT="$(cd "../.." && pwd)"
fi

# Convert to Windows-style path if on Windows (Git Bash)
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    PROJECT_ROOT=$(cygpath -m "$PROJECT_ROOT" 2>/dev/null || echo "$PROJECT_ROOT")
fi

# INDEX files to validate
SKILLS_INDEX="$PROJECT_ROOT/.prompt-os/skills/INDEX.md"
PERSONAS_INDEX="$PROJECT_ROOT/.prompt-os/personas/INDEX.md"

# ============================================================
# UTILITY FUNCTIONS
# ============================================================

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
    ((ERRORS++))
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" >&2
    ((WARNINGS++))
}

info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

# ============================================================
# VALIDATION FUNCTIONS
# ============================================================

# Function 1: Validate links (check paths exist)
validate_links() {
    local index_file="$1"
    local index_type="$2" # "skills" or "personas"
    
    info "Validating links in $index_type INDEX..."
    
    local link_count=0
    local broken_count=0
    
    # Read file line by line directly
    while IFS= read -r line; do
        # Check if line contains a file path (using glob pattern instead of regex)
        if [[ "$line" != *".prompt-os/"*"SKILL.md"* ]] && [[ "$line" != *".prompt-os/"*"PERSONA.md"* ]]; then
            continue
        fi
        
        # Extract path from backticks using sed
        local path
        path=$(echo "$line" | sed 's/.*`\([^`]*\)`.*/\1/')
        
        # Skip if extraction failed
        if [[ "$path" == "$line" ]] || [[ -z "$path" ]]; then
            continue
        fi
        
        ((link_count++))
        
        # Check if file exists (resolve relative to PROJECT_ROOT)
        local full_path="$PROJECT_ROOT/$path"
        if [[ ! -f "$full_path" ]]; then
            error "Broken link in $index_type INDEX: $path (file not found)"
            ((broken_count++))
        fi
    done < "$index_file"
    
    if [[ $link_count -eq 0 ]]; then
        warn "No valid links parsed from $index_type INDEX"
    elif [[ $broken_count -eq 0 ]]; then
        info "✓ All $link_count links are valid in $index_type INDEX"
    else
        error "✗ Found $broken_count broken links out of $link_count in $index_type INDEX"
    fi
}

# Function 2: Verify counts (compare header stats vs actual files)
verify_counts() {
    local index_file="$1"
    local index_type="$2"
    
    info "Verifying counts in $index_type INDEX..."
    
    # Extract declared count from header
    # Skills: "## SKILLS DISPONIVEIS (5 baselines, 1 categoria)"
    # Personas: "## PERSONAS DISPONIVEIS"
    local declared_count
    if [[ "$index_type" == "skills" ]]; then
        # Extract "Total de Skills | X"
        declared_count=$(grep -E '^\| Total de Skills \|' "$index_file" | sed -E 's/.*\| ([0-9]+).*/\1/' || echo "0")
    else
        # For personas, count table rows with status
        declared_count=$(grep -E '^\|.*\|.*\|.*\| 📋 Not created \|$|^\|.*\|.*\|.*\| ✅ Created \|$' "$index_file" | wc -l || echo "0")
    fi
    
    # Count actual entries in table (rows with file paths)
    local actual_count
    if [[ "$index_type" == "skills" ]]; then
        actual_count=$(grep -E '^\|.*\.prompt-os/skills/.*SKILL\.md.*\|$' "$index_file" | wc -l || echo "0")
    else
        actual_count=$(grep -E '^\|.*\.prompt-os/personas/.*PERSONA\.md.*\|$' "$index_file" | wc -l || echo "0")
    fi
    
    # Trim whitespace
    declared_count=$(echo "$declared_count" | tr -d '[:space:]')
    actual_count=$(echo "$actual_count" | tr -d '[:space:]')
    
    if [[ "$declared_count" -eq "$actual_count" ]]; then
        info "✓ Count matches in $index_type INDEX: $actual_count entries"
    else
        error "✗ Count mismatch in $index_type INDEX: declared=$declared_count, actual=$actual_count"
    fi
}

# Function 3: Detect malformed entries (table format validation)
detect_malformed() {
    local index_file="$1"
    local index_type="$2"
    
    info "Detecting malformed entries in $index_type INDEX..."
    
    local malformed_count=0
    local line_number=0
    
    # Check for table rows with incorrect number of columns
    # Valid format: | col1 | col2 | col3 | col4 |
    while IFS= read -r line; do
        ((line_number++))
        
        # Skip non-table lines
        if [[ ! "$line" =~ ^\| ]]; then
            continue
        fi
        
        # Count pipes (should be 5 for 4-column table: | col1 | col2 | col3 | col4 |)
        local pipe_count
        pipe_count=$(echo "$line" | tr -cd '|' | wc -c)
        
        # Skip separator lines (e.g., |------|-------|)
        if [[ "$line" =~ ^[|\-[:space:]]+$ ]]; then
            continue
        fi
        
        # Check if it's a table line (has at least 3 pipes)
        if [[ $pipe_count -lt 3 ]]; then
            continue
        fi
        
        # Expected column count (depends on table type)
        local expected_pipes=5 # Default: 4 columns (| c1 | c2 | c3 | c4 |)
        if [[ "$index_type" == "personas" ]]; then
            expected_pipes=5 # Personas: | ID | Persona | Quando Usar | Status |
        fi
        
        if [[ $pipe_count -ne $expected_pipes ]]; then
            error "Malformed entry at line $line_number: expected $expected_pipes pipes, found $pipe_count"
            error "  Line: $line"
            ((malformed_count++))
        fi
        
        # Check for empty cells (|| or | |)
        if [[ "$line" =~ \|\| ]] || [[ "$line" =~ \|[[:space:]]*\| ]]; then
            warn "Empty cell detected at line $line_number: $line"
            ((malformed_count++))
        fi
        
    done < "$index_file"
    
    if [[ $malformed_count -eq 0 ]]; then
        info "✓ No malformed entries in $index_type INDEX"
    else
        error "✗ Found $malformed_count malformed entries in $index_type INDEX"
    fi
}

# Function 4: Check duplicates (same name/path appears twice)
check_duplicates() {
    local index_file="$1"
    local index_type="$2"
    
    info "Checking for duplicates in $index_type INDEX..."
    
    # Create temp files for tracking
    local names_file=$(mktemp)
    local paths_file=$(mktemp)
    
    # Extract names and paths
    while IFS= read -r line; do
        # Skip non-table lines, headers, separators
        if [[ "$line" != "|"* ]] || [[ "$line" == *"---"* ]] || [[ "$line" == *"Nome"* ]] || [[ "$line" == *"Level"* ]] || [[ "$line" == *"ID"* ]]; then
            continue
        fi
        
        # Extract name (first column)
        local name
        name=$(echo "$line" | sed 's/^\| *\([^|]*\) *.*/\1/' | tr -d '[:space:]')
        if [[ -n "$name" ]] && [[ "$name" != "Nome" ]] && [[ "$name" != "ID" ]]; then
            echo "$name" >> "$names_file"
        fi
        
        # Extract path if present (using glob pattern)
        if [[ "$line" == *".prompt-os/"* ]]; then
            local path
            path=$(echo "$line" | sed 's/.*`\([^`]*\)`.*/\1/')
            if [[ "$path" != "$line" ]] && [[ -n "$path" ]]; then
                echo "$path" >> "$paths_file"
            fi
        fi
    done < "$index_file"
    
    # Check for duplicate names
    local duplicate_names
    duplicate_names=$(sort "$names_file" | uniq -d)
    
    if [[ -n "$duplicate_names" ]]; then
        error "✗ Duplicate names found in $index_type INDEX:"
        while IFS= read -r dup; do
            if [[ -n "$dup" ]]; then
                error "  - $dup"
            fi
        done < <(echo "$duplicate_names")
    else
        info "✓ No duplicate names in $index_type INDEX"
    fi
    
    # Check for duplicate paths
    local duplicate_paths
    duplicate_paths=$(sort "$paths_file" | uniq -d)
    
    if [[ -n "$duplicate_paths" ]]; then
        error "✗ Duplicate paths found in $index_type INDEX:"
        while IFS= read -r dup; do
            if [[ -n "$dup" ]]; then
                error "  - $dup"
            fi
        done < <(echo "$duplicate_paths")
    else
        info "✓ No duplicate paths in $index_type INDEX"
    fi
    
    # Cleanup temp files
    rm -f "$names_file" "$paths_file"
}

# Function 5: Validate metadata (level, category)
validate_metadata() {
    local index_file="$1"
    local index_type="$2"
    
    info "Validating metadata in $index_type INDEX..."
    
    local metadata_errors=0
    local line_number=0
    
    while IFS= read -r line; do
        ((line_number++))
        
        # Skip non-table lines, headers, separators
        if [[ "$line" != "|"* ]] || [[ "$line" == *"---"* ]] || [[ "$line" == *"Nome"* ]] || [[ "$line" == *"Level"* ]] || [[ "$line" == *"ID"* ]]; then
            continue
        fi
        
        # Extract level (third column for skills: | name | desc | L1 | path |)
        if [[ "$index_type" == "skills" ]]; then
            local level
            level=$(echo "$line" | sed 's/^|[^|]*|[^|]*| *\([^|]*\) *.*/\1/' | tr -d '[:space:]')
            
            # Check if level is valid (L0, L1, L2, L3)
            if [[ "$level" == "L"* ]] && [[ ! "$level" =~ ^L[0-3]$ ]]; then
                error "Invalid level at line $line_number: '$level' (must be L0, L1, L2, or L3)"
                error "  Line: $line"
                ((metadata_errors++))
            fi
        fi
        
        # Check path format (should start with .prompt-os/)
        if [[ "$line" == *".prompt-os/"* ]]; then
            local path
            path=$(echo "$line" | sed 's/.*`\([^`]*\)`.*/\1/')
            
            # Check if path follows naming convention
            if [[ "$index_type" == "skills" ]] && [[ "$path" == *"SKILL.md"* ]] && [[ "$path" != *".prompt-os/skills/"* ]]; then
                error "Invalid path format at line $line_number: '$path'"
                error "  Expected: .prompt-os/skills/{category}/{name}/SKILL.md"
                ((metadata_errors++))
            elif [[ "$index_type" == "personas" ]] && [[ "$path" == *"PERSONA.md"* ]] && [[ "$path" != *".prompt-os/personas/"* ]]; then
                error "Invalid path format at line $line_number: '$path'"
                error "  Expected: .prompt-os/personas/{name}/PERSONA.md"
                ((metadata_errors++))
            fi
        fi
        
    done < "$index_file"
    
    if [[ $metadata_errors -eq 0 ]]; then
        info "✓ All metadata valid in $index_type INDEX"
    else
        error "✗ Found $metadata_errors metadata errors in $index_type INDEX"
    fi
}

# ============================================================
# MAIN VALIDATION LOGIC
# ============================================================

main() {
    echo ""
    echo "=================================================="
    echo "  PromptOS INDEX Validation Script v1.0.0"
    echo "=================================================="
    echo ""
    
    # Check if INDEX files exist
    if [[ ! -f "$SKILLS_INDEX" ]]; then
        error "Skills INDEX not found: $SKILLS_INDEX"
        exit 2
    fi
    
    if [[ ! -f "$PERSONAS_INDEX" ]]; then
        error "Personas INDEX not found: $PERSONAS_INDEX"
        exit 2
    fi
    
    # Validate Skills INDEX
    echo ""
    echo ">>> Validating SKILLS INDEX..."
    echo ""
    validate_links "$SKILLS_INDEX" "skills"
    verify_counts "$SKILLS_INDEX" "skills"
    detect_malformed "$SKILLS_INDEX" "skills"
    check_duplicates "$SKILLS_INDEX" "skills"
    validate_metadata "$SKILLS_INDEX" "skills"
    
    # Validate Personas INDEX
    echo ""
    echo ">>> Validating PERSONAS INDEX..."
    echo ""
    validate_links "$PERSONAS_INDEX" "personas"
    verify_counts "$PERSONAS_INDEX" "personas"
    detect_malformed "$PERSONAS_INDEX" "personas"
    check_duplicates "$PERSONAS_INDEX" "personas"
    validate_metadata "$PERSONAS_INDEX" "personas"
    
    # Summary
    echo ""
    echo "=================================================="
    echo "  Validation Summary"
    echo "=================================================="
    echo ""
    
    if [[ $ERRORS -eq 0 ]] && [[ $WARNINGS -eq 0 ]]; then
        echo -e "${GREEN}✓ All checks passed!${NC}"
        echo ""
        exit 0
    elif [[ $ERRORS -eq 0 ]]; then
        echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
        echo -e "${GREEN}✓ No errors found${NC}"
        echo ""
        exit 0
    else
        echo -e "${RED}✗ Errors: $ERRORS${NC}"
        echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
        echo ""
        echo -e "${RED}INDEX validation FAILED${NC}"
        echo "Please fix the errors above before committing."
        echo ""
        exit 1
    fi
}

# ============================================================
# ENTRY POINT
# ============================================================

# Check if --help
if [[ "${1:-}" == "--help" ]] || [[ "${1:-}" == "-h" ]]; then
    echo "Usage: $0 [options]"
    echo ""
    echo "Validates INDEX.md integrity for skills and personas."
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo ""
    echo "Validations performed:"
    echo "  1. Link validation - Check all file paths exist"
    echo "  2. Count verification - Compare header stats vs actual entries"
    echo "  3. Malformed detection - Check table format (pipes, columns)"
    echo "  4. Duplicate detection - Find duplicate names/paths"
    echo "  5. Metadata validation - Verify levels (L0-L3) and path formats"
    echo ""
    echo "Exit codes:"
    echo "  0 - All checks passed (or only warnings)"
    echo "  1 - Validation errors found"
    echo "  2 - Script usage error (missing INDEX files)"
    echo ""
    exit 0
fi

# Run main validation
main
