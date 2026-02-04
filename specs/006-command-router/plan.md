# Implementation Plan: Command Router & Chat Grammar

**Branch**: `006-command-router` | **Date**: 2026-02-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/006-command-router/spec.md`

## Summary

Implement a standardized command grammar (`#command [args] [--flags]`) and a Router Protocol to reliably dispatch user intents to specific workflows (Bootstrap, Sync, Update). This standardizes interaction across different LLM agents and provides a consistent "CLI-like" experience within the chat interface.

## Technical Context

**Language/Version**: Markdown (System Prompts)  
**Primary Dependencies**: `INPUT-CLASSIFIER.md`, `ITZAMNA-AGENT.md`  
**Storage**: N/A (Stateless interaction, persistent protocols in `.prompt-os/core/`)  
**Testing**: Manual cross-model validation (Claude, Gemini, Copilot)  
**Target Platform**: LLM Context Window (Text-based)  
**Project Type**: Prompt-based System  
**Performance Goals**: Zero-overhead on non-command messages; <2s reasoning overhead for commands.  
**Constraints**: Must work within standard context limits; must be robust against model hallucinations.  
**Scale/Scope**: Core lifecycle commands (`#init`, `#add`, `#sync`, `#update`, `#impl`, `#docs`).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### T0 - INVIOLABLE
- **T0-SEC-01 (Secrets)**: ✅ No secrets involved in command grammar.
- **T0-HUMAN-01 (Approval)**: ✅ Commands trigger workflows that respect Human Gate.
- **T0-STRUCT-01 (Card-First)**: ✅ Feature has a SPEC and PLAN.
- **T0-VAL-02 (No Invented APIs)**: ✅ Using existing PromptOS workflow patterns.

### T1 - STRONG
- **T1-QUAL-01 (SOLID)**: ✅ Router follows Single Responsibility Principle (separate from execution).
- **T1-ARCH-01 (Layer Separation)**: ✅ Router separated from Classifier and Workflows.
- **T1-DOC-02 (README)**: ✅ Documentation update required for `docs/add-core/master-router.md`.

## Project Structure

### Documentation (this feature)

```text
specs/006-command-router/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (Grammar definition)
├── quickstart.md        # Phase 1 output (Usage guide)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
.prompt-os/core/
├── INPUT-CLASSIFIER.md  # To be updated with Router logic
└── COMMAND-ROUTER.md    # New protocol (if separated)

docs/add-core/
└── master-router.md     # Documentation update
```

**Structure Decision**: Integrated router logic into `INPUT-CLASSIFIER.md` or a lightweight `COMMAND-ROUTER.md` referenced by it, to minimize context usage.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
