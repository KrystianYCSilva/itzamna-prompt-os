#!/usr/bin/env python3
"""
validate-indices.py - Validates INDEX.md integrity
Version: 1.0.0
Created: 2026-02-03
Part of: PromptOS v2.1.0
"""

import sys
import re
from pathlib import Path
from typing import List, Tuple
from collections import Counter


# ANSI color codes
class Colors:
    RED = "\033[0;31m"
    GREEN = "\033[0;32m"
    YELLOW = "\033[1;33m"
    NC = "\033[0m"  # No Color


# Counters
errors = 0
warnings = 0


def error(msg: str):
    """Print error message"""
    global errors
    # Replace special characters with ASCII for Windows compatibility
    msg = msg.replace("[OK]", "[OK]").replace("[X]", "[X]").replace("⚠", "[!]")
    print(f"{Colors.RED}[ERROR]{Colors.NC} {msg}", file=sys.stderr)
    errors += 1


def warn(msg: str):
    """Print warning message"""
    global warnings
    print(f"{Colors.YELLOW}[WARN]{Colors.NC} {msg}", file=sys.stderr)
    warnings += 1


def info(msg: str):
    """Print info message"""
    # Replace checkmark with ASCII for Windows compatibility
    msg = msg.replace("[OK]", "[OK]").replace("[X]", "[X]")
    print(f"{Colors.GREEN}[INFO]{Colors.NC} {msg}")


def validate_links(index_file: Path, index_type: str) -> None:
    """Function 1: Validate links (check paths exist)"""
    info(f"Validating links in {index_type} INDEX...")

    link_count = 0
    broken_count = 0
    project_root = (
        index_file.parent.parent.parent
    )  # Go up from .prompt-os/skills/ to root

    with open(index_file, "r", encoding="utf-8") as f:
        for line_num, line in enumerate(f, 1):
            # Check if line contains a file path in backticks
            # Look for `.prompt-os/skills/.../SKILL.md` or `.prompt-os/personas/.../PERSONA.md`
            match = re.search(r"\x60(\.prompt-os/(skills|personas)/[^\x60]+)\x60", line)
            if not match:
                continue

            path_str = match.group(1)

            # Only process if it's a SKILL.md or PERSONA.md file
            if not (path_str.endswith("SKILL.md") or path_str.endswith("PERSONA.md")):
                continue
            link_count += 1

            # Check if file exists
            full_path = project_root / path_str
            if not full_path.exists():
                error(
                    f"Broken link in {index_type} INDEX (line {line_num}): {path_str} (file not found)"
                )
                broken_count += 1

    if link_count == 0:
        warn(f"No valid links parsed from {index_type} INDEX")
    elif broken_count == 0:
        info(f"[OK] All {link_count} links are valid in {index_type} INDEX")
    else:
        error(
            f"[X] Found {broken_count} broken links out of {link_count} in {index_type} INDEX"
        )


def verify_counts(index_file: Path, index_type: str) -> None:
    """Function 2: Verify counts (compare header stats vs actual files)"""
    info(f"Verifying counts in {index_type} INDEX...")

    with open(index_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract declared count
    declared_count = 0
    if index_type == "skills":
        # Look for "| Total de Skills | X |" or "| Total de Skills | ... = X |"
        match = re.search(r"\| Total de Skills \|.*?= (\d+)", content)
        if not match:
            match = re.search(r"\| Total de Skills \| (\d+)", content)
        if match:
            declared_count = int(match.group(1))
    else:
        # For personas, count table rows with status
        declared_count = len(
            re.findall(
                r"^\|.*\|.*\|.*\| (📋 Not created|✅ Created) \|$",
                content,
                re.MULTILINE,
            )
        )

    # Count actual entries (lines with file paths)
    if index_type == "skills":
        actual_count = len(re.findall(r"`\.prompt-os/skills/.*SKILL\.md`", content))
    else:
        actual_count = len(re.findall(r"`\.prompt-os/personas/.*PERSONA\.md`", content))

    if declared_count == actual_count:
        info(f"[OK] Count matches in {index_type} INDEX: {actual_count} entries")
    else:
        error(
            f"[X] Count mismatch in {index_type} INDEX: declared={declared_count}, actual={actual_count}"
        )


def detect_malformed(index_file: Path, index_type: str) -> None:
    """Function 3: Detect malformed entries (table format validation)"""
    info(f"Detecting malformed entries in {index_type} INDEX...")

    malformed_count = 0

    with open(index_file, "r", encoding="utf-8") as f:
        for line_num, line in enumerate(f, 1):
            # Skip non-table lines
            if not line.startswith("|"):
                continue

            # Skip separator lines (|------|-------|)
            if re.match(r"^[|\-\s]+$", line):
                continue

            # Count pipes
            pipe_count = line.count("|")

            # Detect table type based on header proximity or content
            # Skills main table: 5 pipes (| name | desc | level | path |)
            # Stats/Levels tables: 3 pipes (| label | value |)
            # Allow both formats
            if pipe_count < 3:  # Not a table line
                continue

            # Only validate main skill/persona tables (those with paths)
            if ".prompt-os/" in line:
                expected_pipes = 5  # Main tables
                if pipe_count != expected_pipes:
                    error(
                        f"Malformed entry at line {line_num}: expected {expected_pipes} pipes, found {pipe_count}"
                    )
                    error(f"  Line: {line.strip()}")
                    malformed_count += 1

            # Check for empty cells (||)
            if "||" in line:
                warn(f"Empty cell detected at line {line_num}: {line.strip()}")
                malformed_count += 1

    if malformed_count == 0:
        info(f"[OK] No malformed entries in {index_type} INDEX")
    else:
        error(f"[X] Found {malformed_count} malformed entries in {index_type} INDEX")


def check_duplicates(index_file: Path, index_type: str) -> None:
    """Function 4: Check duplicates (same name/path appears twice)"""
    info(f"Checking for duplicates in {index_type} INDEX...")

    names = []
    paths = []

    with open(index_file, "r", encoding="utf-8") as f:
        for line in f:
            # Skip non-table lines, headers, separators
            if (
                not line.startswith("|")
                or "---" in line
                or "Nome" in line
                or "Level" in line
                or "ID" in line
            ):
                continue

            # Extract name (first column)
            name_match = re.match(r"^\| *([^|]+) *\|", line)
            if name_match:
                name = name_match.group(1).strip()
                if name and name not in ["Nome", "ID"]:
                    names.append(name)

            # Extract path if present (using \x60 for backtick)
            path_match = re.search(r"\x60([^\x60]+)\x60", line)
            if path_match:
                path = path_match.group(1)
                paths.append(path)

    # Check for duplicate names
    name_counts = Counter(names)
    duplicate_names = [name for name, count in name_counts.items() if count > 1]

    if duplicate_names:
        error(f"[X] Duplicate names found in {index_type} INDEX:")
        for dup in duplicate_names:
            error(f"  - {dup}")
    else:
        info(f"[OK] No duplicate names in {index_type} INDEX")

    # Check for duplicate paths
    path_counts = Counter(paths)
    duplicate_paths = [path for path, count in path_counts.items() if count > 1]

    if duplicate_paths:
        error(f"[X] Duplicate paths found in {index_type} INDEX:")
        for dup in duplicate_paths:
            error(f"  - {dup}")
    else:
        info(f"[OK] No duplicate paths in {index_type} INDEX")


def validate_metadata(index_file: Path, index_type: str) -> None:
    """Function 5: Validate metadata (level, category)"""
    info(f"Validating metadata in {index_type} INDEX...")

    metadata_errors = 0

    with open(index_file, "r", encoding="utf-8") as f:
        for line_num, line in enumerate(f, 1):
            # Skip non-table lines, headers, separators
            if (
                not line.startswith("|")
                or "---" in line
                or "Nome" in line
                or "Level" in line
                or "ID" in line
            ):
                continue

            # Extract level (third column for skills)
            if index_type == "skills":
                level_match = re.match(r"^\|[^|]*\|[^|]*\| *([^|]+) *\|", line)
                if level_match:
                    level = level_match.group(1).strip()

                    # Check if level is valid (L0, L1, L2, L3)
                    if level.startswith("L") and not re.match(r"^L[0-3]$", level):
                        error(
                            f"Invalid level at line {line_num}: '{level}' (must be L0, L1, L2, or L3)"
                        )
                        error(f"  Line: {line.strip()}")
                        metadata_errors += 1

            # Check path format (using \x60 for backtick)
            path_match = re.search(r"\x60(\.prompt-os/[^\x60]+)\x60", line)
            if path_match:
                path = path_match.group(1)

                # Check if path follows naming convention
                if index_type == "skills" and "SKILL.md" in path:
                    if not re.match(r"\.prompt-os/skills/.+/SKILL\.md$", path):
                        error(f"Invalid path format at line {line_num}: '{path}'")
                        error(
                            f"  Expected: .prompt-os/skills/{{category}}/{{name}}/SKILL.md"
                        )
                        metadata_errors += 1
                elif index_type == "personas" and "PERSONA.md" in path:
                    if not re.match(r"\.prompt-os/personas/.+/PERSONA\.md$", path):
                        error(f"Invalid path format at line {line_num}: '{path}'")
                        error(f"  Expected: .prompt-os/personas/{{name}}/PERSONA.md")
                        metadata_errors += 1

    if metadata_errors == 0:
        info(f"[OK] All metadata valid in {index_type} INDEX")
    else:
        error(f"[X] Found {metadata_errors} metadata errors in {index_type} INDEX")


def main():
    """Main validation logic"""
    global errors, warnings

    print()
    print("=" * 50)
    print("  PromptOS INDEX Validation Script v1.0.0")
    print("=" * 50)
    print()

    # Determine project root
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent

    # INDEX files to validate
    skills_index = project_root / ".prompt-os" / "skills" / "INDEX.md"
    personas_index = project_root / ".prompt-os" / "personas" / "INDEX.md"

    # Check if INDEX files exist
    if not skills_index.exists():
        error(f"Skills INDEX not found: {skills_index}")
        sys.exit(2)

    if not personas_index.exists():
        error(f"Personas INDEX not found: {personas_index}")
        sys.exit(2)

    # Validate Skills INDEX
    print()
    print(">>> Validating SKILLS INDEX...")
    print()
    validate_links(skills_index, "skills")
    verify_counts(skills_index, "skills")
    detect_malformed(skills_index, "skills")
    check_duplicates(skills_index, "skills")
    validate_metadata(skills_index, "skills")

    # Validate Personas INDEX
    print()
    print(">>> Validating PERSONAS INDEX...")
    print()
    validate_links(personas_index, "personas")
    verify_counts(personas_index, "personas")
    detect_malformed(personas_index, "personas")
    check_duplicates(personas_index, "personas")
    validate_metadata(personas_index, "personas")

    # Summary
    print()
    print("=" * 50)
    print("  Validation Summary")
    print("=" * 50)
    print()

    if errors == 0 and warnings == 0:
        print(f"{Colors.GREEN}[OK] All checks passed!{Colors.NC}")
        print()
        sys.exit(0)
    elif errors == 0:
        print(f"{Colors.YELLOW}[!] Warnings: {warnings}{Colors.NC}")
        print(f"{Colors.GREEN}[OK] No errors found{Colors.NC}")
        print()
        sys.exit(0)
    else:
        print(f"{Colors.RED}[X] Errors: {errors}{Colors.NC}")
        print(f"{Colors.YELLOW}[!] Warnings: {warnings}{Colors.NC}")
        print()
        print(f"{Colors.RED}INDEX validation FAILED{Colors.NC}")
        print("Please fix the errors above before committing.")
        print()
        sys.exit(1)


if __name__ == "__main__":
    # Check for --help
    if len(sys.argv) > 1 and sys.argv[1] in ["--help", "-h"]:
        print("Usage: python validate-indices.py [options]")
        print()
        print("Validates INDEX.md integrity for skills and personas.")
        print()
        print("Options:")
        print("  -h, --help     Show this help message")
        print()
        print("Validations performed:")
        print("  1. Link validation - Check all file paths exist")
        print("  2. Count verification - Compare header stats vs actual entries")
        print("  3. Malformed detection - Check table format (pipes, columns)")
        print("  4. Duplicate detection - Find duplicate names/paths")
        print("  5. Metadata validation - Verify levels (L0-L3) and path formats")
        print()
        print("Exit codes:")
        print("  0 - All checks passed (or only warnings)")
        print("  1 - Validation errors found")
        print("  2 - Script usage error (missing INDEX files)")
        print()
        sys.exit(0)

    main()
