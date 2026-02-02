---
name: git
description: |
  Distributed version control system for tracking changes in source code during development.
  Use for managing code history, collaboration, branching strategies, and team workflows.
keywords:
  - git
  - version-control
  - github
  - gitlab
  - branching
  - merge
  - commit
category: technology
subcategory: practices
version: "3.5.0"
created: 2026-02-02
type: skill
---

# Git

> **Quick Reference:** Distributed version control for tracking code changes and collaboration
> **Use when:** Managing any codebase, collaborating with teams, or tracking project history

## When to Use

- ✅ Tracking changes in source code over time
- ✅ Collaborating with multiple developers on same codebase
- ✅ Managing different versions or releases of software
- ✅ Experimenting with features using branches
- ✅ Reverting mistakes or recovering old code versions
- ❌ **NOT for:** Storing large binary files (use Git LFS), sensitive secrets (use secret managers)

## Core Concepts

### 1. Repository Structure and Workflow

Git operates with three main areas: working directory, staging area, and repository.

```
STRUCTURE GitRepository
    working_directory: Files you edit
    staging_area: (Index) Prepared changes
    local_repository: Committed history (.git/)
    remote_repository: Shared repository (GitHub, GitLab)

WORKFLOW basic_git_flow
    1. MODIFY files in working_directory
    2. ADD changes to staging_area
    3. COMMIT staged changes to local_repository
    4. PUSH commits to remote_repository
    5. PULL updates from remote_repository

COMMANDS
    git status              // Show state of working directory
    git add <file>          // Stage changes
    git commit -m "msg"     // Commit staged changes
    git push origin main    // Push to remote
    git pull origin main    // Fetch + merge from remote
```

### 2. Branching and Merging

```bash
# Create and switch to new branch
git checkout -b feature/new-feature
# or modern syntax
git switch -c feature/new-feature

# List branches
git branch -a

# Switch between branches
git checkout main
git switch main  # modern syntax

# Merge branch into current branch
git merge feature/new-feature

# Delete branch (local)
git branch -d feature/new-feature

# Delete branch (remote)
git push origin --delete feature/new-feature

# Rebase (alternative to merge)
git checkout feature/new-feature
git rebase main  # Replay feature commits on top of main
```

**Merge vs Rebase:**
```
MERGE: Creates merge commit, preserves history
  main:     A---B---C---D
  feature:      E---F
  merged:   A---B---C---D---M (merge commit)
                    |       |
                    +---E---F

REBASE: Linear history, rewrites commits
  main:     A---B---C---D
  feature:      E---F
  rebased:  A---B---C---D---E'---F' (replayed commits)
```

### 3. Commit Best Practices

```bash
# Atomic commits (one logical change)
git add src/auth.js
git commit -m "feat: add JWT token validation"

# Conventional commit format
<type>(<scope>): <subject>

<body>

<footer>

# Types: feat, fix, docs, style, refactor, test, chore

# Example:
git commit -m "fix(auth): resolve token expiration bug

- Check token expiry before validation
- Add tests for expired tokens
- Update error messages

Fixes #123"

# Amend last commit (before pushing)
git commit --amend -m "Updated message"

# Stage parts of a file interactively
git add -p <file>
```

### 4. Undoing Changes

```bash
# Discard changes in working directory
git restore <file>
# or old syntax
git checkout -- <file>

# Unstage file (keep changes)
git restore --staged <file>
# or old syntax
git reset HEAD <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>

# View history
git log --oneline --graph --all

# Find who changed a line
git blame <file>

# Search commit messages
git log --grep="bug fix"
```

### 5. Remote Collaboration

```bash
# Clone repository
git clone https://github.com/user/repo.git

# Add remote
git remote add origin https://github.com/user/repo.git

# View remotes
git remote -v

# Fetch updates (doesn't merge)
git fetch origin

# Pull updates (fetch + merge)
git pull origin main

# Pull with rebase
git pull --rebase origin main

# Push branch
git push -u origin feature/branch-name

# Force push (use with caution)
git push --force-with-lease origin feature/branch

# Stash changes temporarily
git stash save "Work in progress"
git stash list
git stash pop  # Apply and remove stash
git stash apply  # Apply and keep stash
```

### 6. Advanced Operations

```bash
# Interactive rebase (clean up commits)
git rebase -i HEAD~3

# Cherry-pick specific commit
git cherry-pick <commit-hash>

# View file at specific commit
git show <commit>:<file>

# Create tags
git tag v1.0.0
git push origin v1.0.0

# View diff
git diff  # Working dir vs staging
git diff --staged  # Staging vs last commit
git diff main..feature  # Between branches

# Reflog (recover "lost" commits)
git reflog
git checkout <commit-hash>
```

## Best Practices

1. **Commit early and often:** Small, frequent commits are easier to understand and revert
2. **Write meaningful commit messages:** Follow conventional commits format for consistency
3. **Use branches for features:** Keep main/master stable, develop features in branches
4. **Pull before push:** Always sync with remote before pushing to avoid conflicts
5. **Don't commit sensitive data:** Use .gitignore for secrets, credentials, API keys
6. **Review before committing:** Use `git diff` and `git status` to check what you're committing
7. **Use .gitignore properly:** Exclude build artifacts, dependencies, IDE files
8. **Sign commits:** Use GPG signing for verified commits in sensitive projects

## Common Pitfalls

- ❌ **Committing directly to main:** Risky for teams → Use feature branches and PRs
- ❌ **Force pushing shared branches:** Overwrites others' work → Use `--force-with-lease` if necessary
- ❌ **Committing large files:** Bloats repository → Use Git LFS for large binaries
- ❌ **Vague commit messages:** "Fixed stuff" → Be descriptive: "fix: resolve null pointer in auth flow"
- ❌ **Not pulling before working:** Causes merge conflicts → Always `git pull` first
- ❌ **Mixing whitespace changes:** Hard to review → Separate formatting commits from logic changes
- ❌ **Forgetting to push:** Commits stay local → Remember `git push` to share work
- ❌ **Committing merge conflicts:** Broken code → Resolve conflicts, test, then commit

## Related Skills

- github - Git hosting platform with collaboration features
- ci-cd - Automated testing and deployment with Git hooks
- code-review - Reviewing Git diffs and pull requests
- branching-strategies - Git Flow, GitHub Flow, trunk-based

## Examples

📚 **Detailed implementations:** → View [git-examples](../examples/git-examples.md)