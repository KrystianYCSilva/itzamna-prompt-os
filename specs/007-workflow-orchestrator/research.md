# Research: Workflow & Persona Orchestrator

**Feature**: Workflow Orchestrator (SPEC-007)  
**Date**: 2026-02-04

---

## 1. Orchestration Layer Placement

### Problem
Where in the existing pipeline does the Orchestrator fit, and how does it receive/pass data?

### Options
1. **Inside INPUT-CLASSIFIER.md**: Merge orchestration logic into the existing classification flow.
   - *Pros*: Fewer files to load.
   - *Cons*: Violates SRP; INPUT-CLASSIFIER already has a defined scope. Would bloat a critical file.
2. **Standalone WORKFLOW-ORCHESTRATOR.md, called by INPUT-CLASSIFIER**: A new protocol, referenced after Router delegation.
   - *Pros*: Clean layer separation (T1-ARCH-01). JIT-loadable independently. Mirrors how COMMAND-ROUTER.md was separated from INPUT-CLASSIFIER in SPEC-006.
   - *Cons*: One more file in the protocol chain.
3. **Inside COMMAND-ROUTER.md**: Extend the Router to also select personas/skills.
   - *Pros*: Fewer hops.
   - *Cons*: Router's job is dispatch, not selection. Violates SRP and the architecture established in SPEC-006.

### Decision
**Standalone `WORKFLOW-ORCHESTRATOR.md`** (Option 2).
- **Rationale**: Consistent with the layered pattern from SPEC-006. Each layer has one job. JIT loading means the file is only pulled into context when a workflow command is actually detected.
- **Alternatives considered**: Options 1 and 3 (both rejected on SRP/architecture grounds).

---

## 2. Skill Eviction Strategy

### Problem
When `--skills` overrides push the total above the 5-skill cap, which skills get dropped?

### Options
1. **Explicit-first eviction**: User-requested skills always survive. Defaults dropped in reverse priority order.
2. **Reject overflow**: Fail the command if cap would be exceeded.
3. **Replace defaults**: Explicit skills entirely replace the default set.

### Decision
**Explicit-first eviction** (Option 1). Confirmed via clarification session.
- **Rationale**: Most user-friendly. User intent is always honored. Predictable behavior (priority order is declared in the Orchestration Map). Consistent with "Last Flag Wins" philosophy from SPEC-006.
- **Alternatives considered**: Reject (too rigid for a prompt-based UX), Replace (loses the value of defaults entirely).

---

## 3. Session State Model

### Problem
Should the Orchestrator maintain state across multiple commands in a session, or reset each time?

### Options
1. **Stateless (Last command wins)**: Each new command fully resets persona + skills.
2. **Stateful (accumulative)**: Skills and persona persist and accumulate across commands.
3. **Sticky persona, fresh skills**: Persona persists until explicitly changed; skills reset per command.

### Decision
**Stateless — Last command wins** (Option 1). Confirmed via clarification session.
- **Rationale**: LLM context windows are inherently ephemeral. Relying on "state" between commands is fragile and model-dependent. Stateless is the safest, most predictable model. Aligns with SPEC-006 flag handling.
- **Alternatives considered**: Stateful (fragile across models), Sticky persona (inconsistent mental model — why would persona persist but not skills?).

---

## 4. Tech-Stack Detection Fallback

### Problem
`FR-006` relies on `.context/_meta/tech-stack.md`. What if it's missing or stale?

### Options
1. **Warn & generic fallback**: Show warning; load only generic core skills.
2. **Hard block**: Refuse to proceed.
3. **Silent fallback**: Load generic skills, no warning.

### Decision
**Warn & generic fallback** (Option 1). Confirmed via clarification session.
- **Rationale**: Keeps the user informed without blocking workflow. Matches the interactive-fallback pattern from SPEC-006 (missing agent → list options). Silent fallback (Option 3) is worse because the user won't know their language skill is missing.
- **Alternatives considered**: Hard block (too rigid for a productivity tool), Silent (violates transparency principle).

---

## 5. Orchestration Map Format

### Problem
How should the static Workflow → Persona + Skills binding be represented?

### Options
1. **Markdown table in the protocol file**: Simple, human-readable, inline with the instructions.
2. **Separate YAML contract file**: Machine-parseable, version-trackable, but requires a separate load.
3. **Both**: Table in protocol for readability; YAML in contracts/ for formal reference.

### Decision
**Both** (Option 3).
- **Rationale**: The protocol file needs the table inline so agents can act on it without loading another file. The YAML in `contracts/` provides a formal, structured reference for validation and future automation. This mirrors the pattern used in SPEC-006 (`grammar.yaml` + inline EBNF).
- **Alternatives considered**: Table-only (no formal contract artifact), YAML-only (agents would need to parse YAML mid-reasoning — adds complexity).

---

## Summary of Unknowns

- ✅ Orchestrator placement → Standalone protocol.
- ✅ Skill eviction → Explicit-first, reverse-priority default eviction.
- ✅ Session state → Stateless, last command wins.
- ✅ Stack detection fallback → Warn + generic skills.
- ✅ Map format → Table in protocol + YAML contract.
