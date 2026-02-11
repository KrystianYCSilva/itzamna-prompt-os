---
description: |
  Architectural patterns and design patterns used in this project.
  Use when: implementing new features or understanding existing architecture.
---

# Architectural Patterns

## Primary Pattern

**Name:** *(ex: Layered Architecture, Hexagonal, CQRS)*

**Description:** *(descreva em 2-3 paragrafos)*

**Diagram:**
```
*(ASCII diagram ou referencia a imagem)*
```

## Design Patterns Used

| Pattern | Where | Why |
|---------|-------|-----|
| *(ex: Repository)* | *(ex: data access layer)* | *(justificativa)* |
| *(ex: Factory)* | *(ex: entity creation)* | |

## Communication Patterns

- **Sync:** *(ex: REST APIs, gRPC)*
- **Async:** *(ex: Message Queue, Events)*

## Data Flow

```
User Request -> Controller -> Service -> Repository -> Database
            <-             <-         <-            <-
```

## Error Handling Pattern

*(Descreva como erros sao tratados e propagados)*
