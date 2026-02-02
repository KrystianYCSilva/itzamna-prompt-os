---
name: technical-writing
description: |
  Practice of documenting technical information clearly, concisely, and accurately for specific audiences.
  Use for documentation, API references, user guides, tutorials, and technical specifications.
keywords:
  - technical-writing
  - documentation
  - communication
  - user-guides
  - api-documentation
  - clarity
category: academic
subcategory: fundamentals
version: "3.5.0"
created: 2026-02-02
type: skill
---

# Technical Writing

> **Quick Reference:** Clear, concise documentation of technical information for specific audiences
> **Use when:** Creating docs, tutorials, API references, or any technical communication

## When to Use

- ✅ Writing API documentation and developer guides
- ✅ Creating user manuals and how-to tutorials
- ✅ Documenting system architecture and design decisions
- ✅ Writing README files and project documentation
- ✅ Creating technical specifications and requirements
- ❌ **NOT for:** Marketing copy, creative writing, or informal communication

## Core Concepts

### 1. Know Your Audience

```
STRUCTURE Audience
    role: developer | end_user | technical_writer | manager
    expertise: beginner | intermediate | expert
    goals: learn | implement | troubleshoot | decide
    context: time_constrained | exploring | problem_solving

FUNCTION tailor_content(audience)
    IF audience.expertise == beginner THEN
        - Define all terms
        - Include step-by-step instructions
        - Add screenshots and examples
        - Avoid assumptions
    ELSE IF audience.expertise == expert THEN
        - Use technical terminology
        - Focus on advanced concepts
        - Provide reference material
        - Skip basic explanations
    
    IF audience.role == developer THEN
        - Include code examples
        - Show API references
        - Explain technical details
    ELSE IF audience.role == end_user THEN
        - Focus on tasks and outcomes
        - Use plain language
        - Emphasize UI/workflow
```

### 2. Structure and Organization

**Information Hierarchy:**
```
Document Structure (Top-Down)
├── Title (What is this?)
├── Introduction/Overview (Why should I care?)
├── Prerequisites (What do I need?)
├── Main Content
│   ├── Concepts (What should I know?)
│   ├── Procedures (How do I do it?)
│   ├── Examples (Show me)
│   └── Reference (Quick lookup)
├── Troubleshooting (What if it breaks?)
└── Related Resources (Where do I learn more?)
```

**The Pyramid Principle:**
```
Start with conclusion/answer
    ├── Key point 1
    │   ├── Supporting detail
    │   └── Example
    ├── Key point 2
    │   ├── Supporting detail
    │   └── Example
    └── Key point 3
```

### 3. Writing Style Principles

**Clear and Concise:**
```
❌ BAD: "In order to facilitate the process of authentication..."
✅ GOOD: "To authenticate..."

❌ BAD: "The system will perform a validation check on the input data"
✅ GOOD: "The system validates the input"

❌ BAD: "It is recommended that users should consider..."
✅ GOOD: "Users should..." or "We recommend..."
```

**Active Voice:**
```
❌ PASSIVE: "The file is processed by the server"
✅ ACTIVE: "The server processes the file"

❌ PASSIVE: "An error will be returned if validation fails"
✅ ACTIVE: "The API returns an error if validation fails"
```

**Parallel Structure:**
```
❌ NOT PARALLEL:
- Configure the database
- Authentication setup
- Starting the server

✅ PARALLEL:
- Configure the database
- Set up authentication
- Start the server
```

### 4. Documentation Types and Templates

**API Documentation Pattern:**
```markdown
## Endpoint Name

Brief description of what this endpoint does.

### Request
- Method: GET/POST/PUT/DELETE
- URL: /api/v1/resource
- Auth required: Yes/No

### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|

### Example Request
[Code block]

### Response
[Success and error examples]

### Error Codes
[List of possible errors]
```

**Tutorial Pattern:**
```markdown
# Title: Action-Oriented (How to X, Building Y, Creating Z)

## What You'll Build
[Brief description with screenshot/diagram]

## Prerequisites
- Requirement 1
- Requirement 2

## Step 1: [Action Verb]
[Explanation]
[Code/Screenshot]
[Verification step]

## Step 2: [Action Verb]
...

## Troubleshooting
[Common issues]

## Next Steps
[Where to go from here]
```

### 5. Visual Communication

**When to Use Diagrams:**
```
Architecture Diagrams → System components and relationships
Flowcharts → Decision trees and processes
Sequence Diagrams → Interaction between systems
Entity Relationships → Database schemas
Mind Maps → Concept relationships
```

**Screenshot Guidelines:**
```
DO:
✅ Annotate with arrows/highlights
✅ Crop to relevant area
✅ Use consistent resolution
✅ Include alt text

DON'T:
❌ Show entire screen with tiny relevant area
❌ Use different themes/styles
❌ Include sensitive data
❌ Forget to update when UI changes
```

## Best Practices

1. **Front-load important information:** Lead with the answer, then provide supporting details
2. **Use consistent terminology:** Pick one term per concept and use it throughout (avoid synonyms)
3. **Write scannable content:** Use headings, bullets, bold text, short paragraphs, and white space
4. **Provide context early:** Explain what, why, and who-for in the introduction
5. **Include examples for everything:** Show concrete usage alongside abstract explanations
6. **Test your documentation:** Have someone follow your instructions before publishing
7. **Keep it up to date:** Version docs, mark deprecated features, update screenshots
8. **Use templates:** Standardize structure across similar document types
9. **Write in second person:** "You can configure..." feels more direct than "Users can configure..."
10. **Link generously:** Cross-reference related docs, external resources, and definitions

## Common Pitfalls

- ❌ **Assuming knowledge:** "Simply configure the API" → Explain HOW to configure, what settings exist
- ❌ **Vague instructions:** "Set up the server" → Provide specific commands and expected output
- ❌ **Jargon overload:** Using undefined acronyms → Define on first use or link to glossary
- ❌ **Missing examples:** Only abstract descriptions → Always include concrete code/configuration examples
- ❌ **No verification steps:** Can't tell if it worked → Add "You should see..." or "Verify by..."
- ❌ **Outdated screenshots:** Shows old UI → Include version number, review regularly
- ❌ **Wall of text:** Dense paragraphs → Break into sections, use bullets, add visuals
- ❌ **Burying the lede:** Important info at bottom → Put key information first

## Related Skills

- [markdown](../../markup/markdown) - Format for writing documentation
- rest-api - Documenting API endpoints
- uml - Creating technical diagrams
- accessibility - Making docs accessible to all users

## Examples

📚 **Detailed implementations:** → View [technical-writing-examples](examples/technical-writing-examples.md)