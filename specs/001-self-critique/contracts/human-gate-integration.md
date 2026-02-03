# Protocol Interface: Human Gate Integration

**Feature Branch**: `001-self-critique`  
**Date**: 2026-02-02  
**Type**: Protocol Contract

---

## Overview

This contract defines how Self-Critique results integrate with the Human Gate protocol. The Human Gate displays critique information to help humans make informed approval decisions.

---

## Integration Flow

```
┌─────────────────────┐
│  SELF-CRITIQUE.md   │
│  Protocol executed  │
└──────────┬──────────┘
           │ produces
           ▼
┌─────────────────────┐
│   CritiqueResult    │
│   (YAML format)     │
└──────────┬──────────┘
           │ passed to
           ▼
┌─────────────────────┐
│   HUMAN-GATE.md     │
│   Displays result   │
└──────────┬──────────┘
           │ human decides
           ▼
┌─────────────────────┐
│  approve / reject   │
│  edit / cancel      │
└─────────────────────┘
```

---

## Display Format

### Standard Human Gate Display

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: {artifact_name}
 Type: {artifact_type}
 
 SELF-CRITIQUE: {score}/100 ({band}) {indicator}
 
 Dimensions:
   Completeness:   {dim_1}/25  {bar_1}
   Clarity:        {dim_2}/25  {bar_2}
   Correctness:    {dim_3}/25  {bar_3}
   Best Practices: {dim_4}/25  {bar_4}
 
 ✓ Strengths:
   {strengths_list}
 
 ✗ Weaknesses:
   {weaknesses_list}
 
 💡 Suggestions:
   {suggestions_list}
 
 {similarity_warning_if_any}
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

### Visual Indicators by Band

| Band | Score | Indicator | Color | Header Style |
|------|-------|-----------|-------|--------------|
| Excellent | 90-100 | 🟢 | Green | Standard |
| Good | 70-89 | 🔵 | Blue | Standard |
| Fair | 50-69 | 🟡 | Yellow | ⚠️ Warning prefix |
| Poor | 0-49 | 🔴 | Red | ⚠️⚠️ Strong warning |

### Progress Bar Format

```
Score 25/25: █████████████████████████ (100%)
Score 20/25: ████████████████████░░░░░ (80%)
Score 15/25: ███████████████░░░░░░░░░░ (60%)
Score 10/25: ██████████░░░░░░░░░░░░░░░ (40%)
Score  5/25: █████░░░░░░░░░░░░░░░░░░░░ (20%)
Score  0/25: ░░░░░░░░░░░░░░░░░░░░░░░░░ (0%)
```

---

## Display Examples

### Excellent Score (92/100)

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: kubernetes-deployment
 Type: skill
 
 SELF-CRITIQUE: 92/100 (Excellent) 🟢
 
 Dimensions:
   Completeness:   23/25  █████████████████████░░░░
   Clarity:        24/25  ██████████████████████░░░
   Correctness:    22/25  ████████████████████░░░░░
   Best Practices: 23/25  █████████████████████░░░░
 
 ✓ Strengths:
   + Comprehensive coverage of deployment scenarios
   + Well-structured with clear sections
   + Practical, copy-paste ready examples
 
 💡 Suggestions:
   1. Consider adding rollback example
 
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

### Fair Score with Warnings (58/100)

```
============================================
 ⚠️ HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: database-connection
 Type: code
 
 SELF-CRITIQUE: 58/100 (Fair) 🟡
 
 Dimensions:
   Completeness:   15/25  ███████████████░░░░░░░░░░
   Clarity:        18/25  ██████████████████░░░░░░░
   Correctness:    12/25  ████████████░░░░░░░░░░░░░
   Best Practices: 13/25  █████████████░░░░░░░░░░░░
 
 ✓ Strengths:
   + Basic connection logic works
   + Good variable naming
 
 ✗ Weaknesses:
   - No error handling for connection failure
   - Connection string hardcoded (T1 warning)
   - No connection pooling
 
 💡 Suggestions:
   1. Add try-catch for connection errors
   2. Move connection string to environment variable
   3. Implement connection pooling
   4. Add retry logic for transient failures
 
 ⚠️ REVIEW SUGGESTIONS BEFORE APPROVING
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

### Poor Score with Strong Warning (38/100)

```
============================================
 ⚠️⚠️ HUMAN GATE - LOW QUALITY WARNING
============================================
 Artifact: auth-handler
 Type: code
 
 SELF-CRITIQUE: 38/100 (Poor) 🔴
 
 Dimensions:
   Completeness:   10/25  ██████████░░░░░░░░░░░░░░░
   Clarity:        12/25  ████████████░░░░░░░░░░░░░
   Correctness:    8/25   ████████░░░░░░░░░░░░░░░░░
   Best Practices: 8/25   ████████░░░░░░░░░░░░░░░░░
 
 ✓ Strengths:
   + Basic structure in place
 
 ✗ Weaknesses:
   - Missing password hashing
   - No input validation
   - SQL query vulnerable to injection
   - No session management
 
 💡 Suggestions:
   1. CRITICAL: Use parameterized queries
   2. CRITICAL: Hash passwords with bcrypt
   3. Add input validation for all fields
   4. Implement proper session handling
   5. Add rate limiting
 
 🔴 REGENERATION STRONGLY RECOMMENDED
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

### With Similarity Warning

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: api-error-handling
 Type: skill
 
 SELF-CRITIQUE: 76/100 (Good) 🔵
 
 Dimensions:
   Completeness:   19/25  ███████████████████░░░░░░
   Clarity:        21/25  █████████████████████░░░░
   Correctness:    18/25  ██████████████████░░░░░░░
   Best Practices: 18/25  ██████████████████░░░░░░░
 
 ✓ Strengths:
   + Good error code examples
   + Clear HTTP status mapping
 
 ✗ Weaknesses:
   - Only 2 examples provided
 
 💡 Suggestions:
   1. Add example for validation errors
   2. Include retry-after header example
 
 ⚠️ SIMILAR SKILLS DETECTED:
   - rest-api-design (68% overlap) - Both cover error responses
   - http-status-codes (62% overlap) - Overlapping status code guidance
   Consider merging or differentiating from existing skills.
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

---

## Compact Format (Optional)

For simpler artifacts or when verbosity is not needed:

```
============================================
 HUMAN GATE: api-helper (code)
 Score: 85/100 (Good) 🔵
 
 ✓ Clean code, good naming
 ✗ Missing null checks
 💡 Add parameter validation
============================================
[1] approve  [2] view  [3] edit  [4] reject
```

---

## Human Gate Actions

| Action | Command | Behavior |
|--------|---------|----------|
| Approve | `1`, `approve`, `ok`, `yes` | Commit artifact, record approval |
| View | `2`, `view`, `show` | Display full artifact content |
| Edit | `3`, `edit`, `edit X` | Revise artifact (optionally specific section X) |
| Reject | `4`, `reject`, `no` | Discard, record rejection with reason |
| Cancel | `5`, `cancel` | Abort without recording |

---

## Behavior Rules

### Score-Based Behavior

| Score Range | Automatic Behavior |
|-------------|-------------------|
| 90-100 | Display with confidence indicator |
| 70-89 | Standard display |
| 50-69 | Add warning prefix to header |
| 0-49 | Add strong warning, suggest regeneration |

### Similarity Warnings

- Only display if similarity ≥ 60%
- List up to 3 most similar items
- Include suggestion to merge or differentiate
- Human decides whether to proceed

### Constitution Violations

| Violation Type | Behavior |
|----------------|----------|
| T0 violation | **BLOCKER** - Do not allow approval |
| T1 violation | Warning in weaknesses section |
| T2 violation | Info only, does not affect approval |

---

## Error Handling

### If Self-Critique Fails

```
============================================
 HUMAN GATE - APPROVAL REQUIRED
============================================
 Artifact: {artifact_name}
 Type: {artifact_type}
 
 SELF-CRITIQUE: ⚠️ INCOMPLETE
 
 Reason: {reason}
 - Could not evaluate dimension: {dimension}
 - Artifact may be malformed
 
 Proceed with manual review.
============================================

[1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

### If No Similar Skills Found

```
 Similar skills: None found
```
(or omit the section entirely)

---

*Contract version: 1.0.0 | Created: 2026-02-02*
