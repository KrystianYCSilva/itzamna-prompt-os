# Research: Command Router & Chat Grammar

**Feature**: Command Router (SPEC-006)
**Date**: 2026-02-04

## 1. Grammar Syntax Analysis

### Problem
We need a syntax that is distinctive enough to not be confused with normal conversation, but easy to type.

### Options
1. **Slash Commands (`/command`)**: Standard in Discord/Slack.
   - *Pros*: Familiar.
   - *Cons*: Often intercepted by UI (e.g., in some chat interfaces `/` opens a menu).
2. **Hash Commands (`#command`)**: Standard in some IRC/Twitter contexts.
   - *Pros*: Distinctive, rarely used at start of line in normal text (headers use `# ` with space).
   - *Cons*: Markdown headers use `#`.
3. **Dot Commands (`.command`)**: Common in IRC bots.
   - *Pros*: Quick.
   - *Cons*: Can look like file extensions or bullet points if misformatted.

### Decision
**Hash Commands (`#command`)** without space.
- Markdown headers require a space (`# Header`).
- Hash tags usually don't start a line in technical documentation unless referring to an issue, but `#init` is distinct.
- **Clarification**: Spec decided on `#`.
- **Constraint**: Must be at start of line (`^#command`).

## 2. Integration Strategy

### Problem
Where does the Router live?
1. **Inside `INPUT-CLASSIFIER.md`**:
   - *Pros*: Single point of entry.
   - *Cons*: Increases file size of a critical protocol.
2. **Separate `COMMAND-ROUTER.md`**:
   - *Pros*: Modular, cleaner.
   - *Cons*: Requires `INPUT-CLASSIFIER` to load it or know about it.

### Decision
**Hybrid**:
- `INPUT-CLASSIFIER.md` gets a high-priority rule: "IF input starts with `#`, DELEGATE to `COMMAND-ROUTER.md`".
- `COMMAND-ROUTER.md` contains the grammar and mapping table.
- This adheres to **T1-ARCH-01 (Layer Separation)**.

## 3. Conflict Analysis

### Potential Conflicts
- **Markdown Headers**: `# Title` vs `#init`.
  - *Resolution*: Regex `^#[a-zA-Z]` (no space) vs `^#\s`.
- **Issue References**: `Fixed #123`.
  - *Resolution*: Router only looks at *start of message*.

## 4. Workflow Mapping

| Command | Target Workflow |
|---------|-----------------|
| `#init` | `BOOTSTRAP.md` |
| `#add` | `BOOTSTRAP-AGENT.md` |
| `#sync` | `SYNC-CONTEXT.md` (or similar) |
| `#update`| Version update workflow |
| `#impl` | `INPUT-CLASSIFIER` standard flow (explicit) |

## 5. Summary of Unknowns

- **Resolved**: Grammar is `#command`.
- **Resolved**: Integration via delegation from Classifier.
- **Resolved**: Conflict mitigation via start-of-line + no-space rules.
