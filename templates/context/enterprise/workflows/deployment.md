---
description: |
  Deployment process, environments, and release procedures.
  Use when: deploying changes or understanding the release pipeline.
---

# Deployment Workflow

## Environments

| Environment | URL | Purpose | Auto-deploy? |
|-------------|-----|---------|--------------|
| Development | *(URL)* | Dev testing | Yes (on push to dev) |
| Staging | *(URL)* | Pre-production | Yes (on push to staging) |
| Production | *(URL)* | Live users | Manual approval |

## Release Process

### 1. Pre-Release Checklist

- [ ] All tests passing
- [ ] Code review approved
- [ ] CHANGELOG.md updated
- [ ] Version bumped
- [ ] Database migrations tested

### 2. Deploy Steps

```bash
# 1. Create release branch
git checkout -b release/v1.2.3

# 2. Build
*(comando de build)*

# 3. Run tests
*(comando de testes)*

# 4. Deploy to staging
*(comando ou CI trigger)*

# 5. Smoke test staging
*(checklist de validacao)*

# 6. Deploy to production
*(comando ou manual approval)*
```

### 3. Rollback Procedure

*(Descreva como fazer rollback se algo der errado)*

## CI/CD Pipeline

**Tool:** *(ex: GitHub Actions, Jenkins)*

**Stages:**
1. Lint & Test
2. Build
3. Deploy to Staging
4. Manual Approval Gate
5. Deploy to Production

## Monitoring

**Post-deploy checks:**
- [ ] Health endpoint responding
- [ ] Logs showing no errors
- [ ] Metrics normal
- [ ] User traffic normal
