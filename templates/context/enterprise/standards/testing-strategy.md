---
description: |
  Testing strategy, coverage requirements, and test patterns.
  Use when: writing tests or reviewing test coverage.
---

# Testing Strategy

## Test Pyramid

```
       /\
      /E2E\       <- 10%  (Selenium, Playwright)
     /------\
    /  API  \     <- 20%  (Integration tests)
   /--------\
  /   Unit   \    <- 70%  (Unit tests)
 /------------\
```

## Coverage Requirements

| Type | Minimum Coverage | Tool |
|------|------------------|------|
| Unit | *(ex: 80%)* | *(ex: JaCoCo, Coverage.py)* |
| Integration | *(ex: 60%)* | |
| E2E | *(ex: critical paths)* | |

## Test Patterns

### Unit Tests

- **Naming:** `test_<method>_<scenario>_<expected>`
- **Structure:** Arrange-Act-Assert (AAA)
- **Mocking:** *(tool: ex: Mockito, jest.mock)*

### Integration Tests

- **Scope:** *(ex: Controller -> Service -> Repository -> DB)*
- **Database:** *(ex: Testcontainers, in-memory)*

### E2E Tests

- **Coverage:** *(ex: apenas user journeys criticos)*
- **Tool:** *(ex: Cypress, Playwright)*

## CI/CD Integration

- Tests rodados em: *(ex: PR, push to main)*
- Falhas bloqueiam merge: *(sim/nao)*
