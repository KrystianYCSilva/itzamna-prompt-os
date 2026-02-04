# INDEX Validation Script

> **Automated validation for INDEX.md integrity.**  
> Ensures skills and personas registries remain consistent.

---

## Quick Start

### Run Validation

```bash
# From project root
python .prompt-os/scripts/validate-indices.py

# Or with py launcher (Windows)
py .prompt-os/scripts/validate-indices.py
```

### Install Pre-commit Hook

```bash
# From project root
cp .prompt-os/scripts/pre-commit-hook.template .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit  # Unix/Mac only
```

---

## What It Validates

The script performs 5 types of validation:

### 1. **Link Validation**
- Checks all file paths exist
- Example: `` `.prompt-os/skills/linguagens/java/SKILL.md` ``
- **Error if:** File not found at specified path

### 2. **Count Verification**
- Compares declared count vs actual entries
- Example: `| Total de Skills | 10 |` should match 10 SKILL.md entries
- **Error if:** Mismatch between header stats and table entries

### 3. **Malformed Detection**
- Checks table format (correct number of pipes)
- Example: `| name | desc | level | path |` = 5 pipes
- **Error if:** Wrong pipe count or empty cells (`||`)

### 4. **Duplicate Detection**
- Finds duplicate names or paths
- **Error if:** Same skill/persona name appears twice, or same path used twice

### 5. **Metadata Validation**
- Verifies level codes (L0, L1, L2, L3)
- Checks path formats follow conventions
- **Error if:** Invalid level or incorrect path format

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | All checks passed (or only warnings) |
| 1 | Validation errors found |
| 2 | Script usage error (missing INDEX files) |

---

## Example Output

### ✅ Success (All Checks Pass)

```
==================================================
  PromptOS INDEX Validation Script v1.0.0
==================================================

>>> Validating SKILLS INDEX...

[INFO] Validating links in skills INDEX...
[INFO] [OK] All 10 links are valid in skills INDEX
[INFO] Verifying counts in skills INDEX...
[INFO] [OK] Count matches in skills INDEX: 10 entries
[INFO] Detecting malformed entries in skills INDEX...
[INFO] [OK] No malformed entries in skills INDEX
[INFO] Checking for duplicates in skills INDEX...
[INFO] [OK] No duplicate names in skills INDEX
[INFO] [OK] No duplicate paths in skills INDEX
[INFO] Validating metadata in skills INDEX...
[INFO] [OK] All metadata valid in skills INDEX

>>> Validating PERSONAS INDEX...

[INFO] Validating links in personas INDEX...
[INFO] [OK] All 3 links are valid in personas INDEX
...

==================================================
  Validation Summary
==================================================

[OK] All checks passed!
```

### ❌ Failure (Errors Found)

```
>>> Validating SKILLS INDEX...

[INFO] Validating links in skills INDEX...
[ERROR] Broken link in skills INDEX (line 27): .prompt-os/skills/java/SKILL.md (file not found)
[ERROR] [X] Found 1 broken links out of 10 in skills INDEX
[INFO] Verifying counts in skills INDEX...
[ERROR] [X] Count mismatch in skills INDEX: declared=10, actual=11

...

==================================================
  Validation Summary
==================================================

[X] Errors: 3
[!] Warnings: 1

INDEX validation FAILED
Please fix the errors above before committing.
```

---

## Common Errors and Solutions

### Error: "Broken link - file not found"

**Cause:** Path in INDEX.md points to non-existent file

**Solution:**
1. Check if file was moved or renamed
2. Update INDEX.md with correct path
3. Or create the missing file

### Error: "Count mismatch"

**Cause:** Statistics section doesn't match actual entries

**Solution:**
1. Count entries in main table manually
2. Update `| Total de Skills | X |` with correct count
3. Also update header if needed (e.g., "5 baselines + 2 advanced")

### Error: "Duplicate names found"

**Cause:** Same skill/persona name appears multiple times

**Solution:**
1. Find duplicate entries in INDEX.md
2. Remove one or rename to make unique
3. If intentional (e.g., version-specific), use different names (e.g., `java`, `java-11`)

### Error: "Invalid level"

**Cause:** Level must be L0, L1, L2, or L3

**Solution:**
1. Find entry with invalid level
2. Change to valid level:
   - L0 = Test/example
   - L1 = Fundamentals
   - L2 = Intermediate
   - L3 = Advanced

### Error: "Invalid path format"

**Cause:** Path doesn't follow naming convention

**Solution:**
- Skills: `.prompt-os/skills/{category}/{name}/SKILL.md`
- Personas: `.prompt-os/personas/{name}/PERSONA.md`

---

## Pre-commit Hook

### Installation

```bash
# Copy template to hooks directory
cp .prompt-os/scripts/pre-commit-hook.template .git/hooks/pre-commit

# Make executable (Unix/Mac)
chmod +x .git/hooks/pre-commit

# On Windows (Git Bash), the file is already executable
```

### Behavior

- **Runs automatically** before each commit
- **Only validates** if INDEX.md files are being committed
- **Blocks commit** if validation fails
- **Can be skipped** with `git commit --no-verify` (not recommended)

### Example

```bash
$ git add .prompt-os/skills/INDEX.md
$ git commit -m "Add new skill"

Validating INDEX.md files...

[ERROR] Count mismatch in skills INDEX: declared=10, actual=11
[X] INDEX validation failed. Please fix the errors above.

To skip this check, use: git commit --no-verify
```

---

## Integration with INDEX-MAINTENANCE.md

This script automates checks described in **INDEX-MAINTENANCE.md**:

| Manual Check (INDEX-MAINTENANCE.md) | Automated (validate-indices.py) |
|-------------------------------------|----------------------------------|
| ✅ Section replacement (not line) | N/A (manual edit guideline) |
| ✅ Verify paths exist | ✅ Automated |
| ✅ Update statistics | ✅ Automated verification |
| ✅ Check for duplicates | ✅ Automated |
| ✅ Validate table format | ✅ Automated |
| ✅ Verify levels (L0-L3) | ✅ Automated |

**Recommendation:** 
- Use INDEX-MAINTENANCE.md for **how to edit** safely
- Use validate-indices.py to **verify** edits are correct

---

## Development

### Requirements

- Python 3.7+
- No external dependencies (uses only stdlib)

### Testing

```bash
# Test on current INDEX files
py .prompt-os/scripts/validate-indices.py

# Test with intentional errors (edit INDEX.md to break something)
# Example: Change "L1" to "L5" in a skill entry
py .prompt-os/scripts/validate-indices.py  # Should fail
```

### Extending Validations

To add a new validation:

1. Create function: `validate_xyz(index_file: Path, index_type: str) -> None`
2. Add call in `main()` after existing validations
3. Use `error()`, `warn()`, `info()` for output
4. Update this README with new validation description

---

## Troubleshooting

### "Python not found"

**Windows:**
```cmd
# Install Python from python.org or Microsoft Store
# Or use py launcher (comes with Python)
py .prompt-os/scripts/validate-indices.py
```

**Unix/Mac:**
```bash
# Install Python 3
sudo apt install python3  # Ubuntu/Debian
brew install python3       # Mac

python3 .prompt-os/scripts/validate-indices.py
```

### "UnicodeEncodeError" on Windows

The script automatically converts Unicode characters (✓, ✗) to ASCII ([OK], [X]) for Windows compatibility. If you still see this error, ensure you're running on Python 3.7+.

### Pre-commit hook not running

```bash
# Check if hook is executable
ls -l .git/hooks/pre-commit

# Make executable if needed (Unix/Mac)
chmod +x .git/hooks/pre-commit

# On Windows, ensure file has no .sample extension
mv .git/hooks/pre-commit.sample .git/hooks/pre-commit
```

---

## Related Files

- `.prompt-os/skills/INDEX.md` - Skills registry (validated by script)
- `.prompt-os/personas/INDEX.md` - Personas registry (validated by script)
- `.prompt-os/docs/INDEX-MAINTENANCE.md` - Manual for safe INDEX editing
- `.prompt-os/scripts/pre-commit-hook.template` - Pre-commit hook template
- `.prompt-os/core/governance/SKILL-GOVERNANCE.md` - When to create/update skills

---

**Version:** 1.0.0  
**Created:** 2026-02-03  
**Part of:** PromptOS v2.1.0

