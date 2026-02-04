# INDEX: Scripts

> Validation and automation scripts for PromptOS INDEX.md integrity checks and repository maintenance.

---

## 📋 CONTENTS

| File | Purpose | Language | When to Use | Size |
|------|---------|----------|------------|------|
| [validate-indices.py](validate-indices.py) | Validate INDEX.md files (links, counts, metadata) | Python | Before committing INDEX changes | ~13.6 KB |
| [validate-indices.sh](validate-indices.sh) | Validate INDEX.md files (shell version) | Bash | Before committing INDEX changes (Unix/Mac) | ~14.4 KB |
| [pre-commit-hook.template](pre-commit-hook.template) | Git pre-commit hook template | Bash | Setting up automatic validation on commit | ~1.4 KB |

---

## 🎯 READING ORDER

1. **Setup once**: Read this INDEX and pre-commit hook setup instructions
2. **Before each commit**: Run validate-indices.py (or .sh)
3. **Setup automation**: Install pre-commit hook (optional)

---

## 🚀 USAGE

### Python Validation (Recommended)
```bash
# From project root
python .prompt-os/scripts/validate-indices.py

# Or with Windows py launcher
py .prompt-os/scripts/validate-indices.py
```

### Bash Validation
```bash
# From project root (Unix/Mac)
bash .prompt-os/scripts/validate-indices.sh
```

### Install Pre-commit Hook
```bash
# Copy hook template to git hooks
cp .prompt-os/scripts/pre-commit-hook.template .git/hooks/pre-commit

# Make executable (Unix/Mac)
chmod +x .git/hooks/pre-commit
```

---

## 📚 VALIDATION CHECKS

### All Scripts Validate (5 checks)

| Check | Purpose | Fails if |
|-------|---------|----------|
| **Link validation** | All file paths exist | File missing |
| **Count verification** | Declared count matches actual entries | Mismatch in metrics |
| **Malformed detection** | Table format correct (pipe count) | Wrong pipe count or empty cells |
| **Duplicate detection** | No duplicate names or paths | Duplicate found |
| **Metadata validation** | Level codes (L0-L3) and format valid | Invalid level or format |

---

## 🚀 EXIT CODES

| Code | Meaning | Action |
|------|---------|--------|
| 0 | All checks passed | ✅ Safe to commit |
| 1 | Validation errors found | ❌ Fix errors before commit |
| 2 | Script error (missing files) | ⚠️ Check script path/setup |

---

## 📊 SCRIPT COMPARISON

| Feature | validate-indices.py | validate-indices.sh |
|---------|-------------------|-------------------|
| Platform | All (Python 3.6+) | Unix/Mac/WSL only |
| Speed | Fast | Medium |
| Dependencies | Python only | Bash |
| **Recommended** | **YES** | No (use Python) |

---

## 💡 BEST PRACTICES

1. **Run before every commit**: Make it a habit
2. **Fix errors immediately**: Don't commit broken INDEX files
3. **Install pre-commit hook**: For automatic validation
4. **Check output carefully**: Read all warnings and errors
5. **Update metrics**: Keep "Total files" counts accurate

---

## 🔗 QUICK NAVIGATION

- [Parent: Core](..\README.md)
- [PromptOS Root](.../README.md)

---

## 📌 MAINTENANCE

**Last updated**: 2026-02-03  
**Total scripts**: 3 (1 Python + 1 Bash + 1 hook template)  
**Combined size**: ~29.4 KB  
**Python version required**: 3.6+

