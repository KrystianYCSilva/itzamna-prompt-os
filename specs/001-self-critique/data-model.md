# Data Model: Self-Critique Protocol Enhancement

**Feature Branch**: `001-self-critique`  
**Date**: 2026-02-02  
**Phase**: 1 (Design)

---

## Overview

This document defines the conceptual data structures used by the Self-Critique protocol. Since this is a prompt-based architecture, these are NOT code classes but rather **structured formats** that AI agents produce when following the protocol.

---

## 1. Core Entities

### 1.1 CritiqueResult

The complete output of a self-critique evaluation.

```yaml
CritiqueResult:
  description: "Complete self-critique output for an artifact"
  
  properties:
    score:
      type: integer
      range: 0-100
      description: "Overall quality score"
      
    band:
      type: enum
      values: ["Excellent", "Good", "Fair", "Poor"]
      description: "Score classification band"
      mapping:
        Excellent: 90-100
        Good: 70-89
        Fair: 50-69
        Poor: 0-49
    
    dimensions:
      type: array<QualityDimension>
      count: 4
      description: "Breakdown by quality dimension"
    
    strengths:
      type: array<string>
      min: 1
      max: 5
      description: "What the artifact does well"
    
    weaknesses:
      type: array<string>
      min: 0
      max: 5
      description: "Areas needing improvement"
    
    suggestions:
      type: array<string>
      min: 1  # Required if score < 90
      max: 5
      description: "Actionable improvement recommendations"
    
    similar_items:
      type: array<SimilarityMatch>
      min: 0
      max: 5
      description: "Potentially redundant existing artifacts"
    
    artifact_type:
      type: ArtifactType
      description: "Type of artifact being evaluated"

  example: |
    critique:
      score: 78
      band: "Good"
      dimensions:
        - name: "Completeness"
          score: 20
          max: 25
        - name: "Clarity"
          score: 22
          max: 25
        - name: "Correctness"
          score: 18
          max: 25
        - name: "Best Practices"
          score: 18
          max: 25
      strengths:
        - "Clear step-by-step instructions"
        - "Practical examples with context"
      weaknesses:
        - "Only 2 examples (recommended: 3+)"
        - "Missing error handling case"
      suggestions:
        - "Add example showing error handling"
        - "Include edge case for empty input"
      similar_items:
        - name: "related-skill"
          similarity: 65
          note: "Overlaps in error handling domain"
      artifact_type: "skill"
```

---

### 1.2 QualityDimension

A single dimension of quality evaluation.

```yaml
QualityDimension:
  description: "One of four quality evaluation dimensions"
  
  properties:
    name:
      type: enum
      values: ["Completeness", "Clarity", "Correctness", "Best Practices"]
      description: "Dimension identifier"
    
    score:
      type: integer
      range: 0-25
      description: "Points earned in this dimension"
    
    max:
      type: integer
      value: 25
      description: "Maximum points possible"
    
    criteria_met:
      type: array<string>
      optional: true
      description: "Which criteria passed (for transparency)"
    
    criteria_failed:
      type: array<string>
      optional: true
      description: "Which criteria failed (for transparency)"

  dimension_details:
    Completeness:
      description: "All required parts present"
      criteria:
        - "All required sections present (+5)"
        - "No TODOs or placeholders (+5)"
        - "Edge cases considered (+5)"
        - "Error handling included (+5)"
        - "Minimum examples met (+5)"
    
    Clarity:
      description: "Easy to understand"
      criteria:
        - "Easy to read (+5)"
        - "Descriptive names (+5)"
        - "Logical structure (+5)"
        - "Useful comments where needed (+5)"
        - "Step-by-step when appropriate (+5)"
    
    Correctness:
      description: "Technically accurate"
      criteria:
        - "Logic is correct (+5)"
        - "No obvious bugs (+5)"
        - "APIs used correctly (+5)"
        - "Types correct (+5)"
        - "Compiles/validates (+5)"
    
    Best Practices:
      description: "Follows standards"
      criteria:
        - "SOLID principles (+5)"
        - "DRY respected (+5)"
        - "Project patterns followed (+5)"
        - "Language conventions followed (+5)"
        - "Constitution rules followed (+5)"
```

---

### 1.3 ArtifactType

Classification of what is being evaluated.

```yaml
ArtifactType:
  description: "Type of artifact being evaluated"
  
  type: enum
  values:
    - code
    - skill
    - persona
    - documentation
    - architectural_decision

  checklist_mapping:
    code:
      file_pattern: "*.ts, *.js, *.py, *.java, etc."
      checklist_section: "Para Codigo"
      special_checks:
        - "Compiles/executes without errors"
        - "Tests pass (if exist)"
        - "No hardcoded secrets (T0-SEC-01)"
        - "No SQL injection (T0-SEC-02)"
        - "Functions <30 lines"
    
    skill:
      file_pattern: "skills/*.md"
      checklist_section: "Para Skills/Personas"
      special_checks:
        - "Valid YAML frontmatter"
        - "All required sections present"
        - "Minimum 2-3 examples"
        - "Examples are executable/practical"
        - "No placeholders (TODO, XXX)"
    
    persona:
      file_pattern: "personas/*.md"
      checklist_section: "Para Skills/Personas"
      special_checks:
        - "Valid YAML frontmatter"
        - "Clear personality definition"
        - "Behavior examples included"
        - "Constraints are specific"
    
    documentation:
      file_pattern: "docs/*.md, README.md, *.md"
      checklist_section: "Para Documentacao"
      special_checks:
        - "Answers the user's question"
        - "Logical structure (intro → details → conclusion)"
        - "Practical examples included"
        - "References linked (if applicable)"
    
    architectural_decision:
      file_pattern: "ADR-*.md, decisions/*.md"
      checklist_section: "Para Decisoes Arquiteturais"
      special_checks:
        - "Alternatives considered"
        - "Trade-offs clear"
        - "Impact explained"
        - "Aligns with project patterns"
```

---

### 1.4 SimilarityMatch

A reference to a potentially redundant existing artifact.

```yaml
SimilarityMatch:
  description: "An existing artifact with significant similarity"
  
  properties:
    name:
      type: string
      description: "Name/identifier of the similar artifact"
      example: "kubernetes-basics"
    
    similarity:
      type: integer
      range: 0-100
      unit: "percentage"
      description: "Estimated similarity score"
      threshold: 60  # Only report if >= 60%
    
    note:
      type: string
      optional: true
      description: "Brief explanation of the overlap"
      example: "Both cover pod lifecycle management"
    
    path:
      type: string
      optional: true
      description: "File path to the similar artifact"
      example: "skills/kubernetes-basics.md"

  detection_method:
    description: "Keyword/structural matching (not vector similarity)"
    factors:
      - name_similarity: "Common words in skill names"
      - tag_overlap: "Shared tags"
      - domain_match: "Same domain category"
      - description_keywords: "Common keywords in descriptions"
    
    formula: |
      similarity = (
        name_similarity * 0.3 +
        tag_overlap * 0.3 +
        domain_match * 0.2 +
        description_keywords * 0.2
      ) * 100
```

---

## 2. Supporting Types

### 2.1 ScoreBand

```yaml
ScoreBand:
  description: "Classification of score into actionable bands"
  
  bands:
    Excellent:
      range: [90, 100]
      indicator: "🟢"
      color: "green"
      action: "Proceed with confidence"
      display: "High confidence - ready for approval"
    
    Good:
      range: [70, 89]
      indicator: "🔵"
      color: "blue"
      action: "Proceed with attention points noted"
      display: "Good quality - minor improvements possible"
    
    Fair:
      range: [50, 69]
      indicator: "🟡"
      color: "yellow"
      action: "Review suggestions before approval"
      display: "⚠️ Fair quality - improvements recommended"
    
    Poor:
      range: [0, 49]
      indicator: "🔴"
      color: "red"
      action: "Consider regeneration"
      display: "⚠️ Low quality - regeneration suggested"
```

---

### 2.2 HumanGateDisplay

Format for presenting critique results in Human Gate.

```yaml
HumanGateDisplay:
  description: "Formatted output for Human Gate approval interface"
  
  format: |
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

  example: |
    ============================================
     HUMAN GATE - APPROVAL REQUIRED
    ============================================
     Artifact: kubernetes-basics
     Type: skill
     
     SELF-CRITIQUE: 78/100 (Good) 🔵
     
     Dimensions:
       Completeness:   20/25  ████████░░
       Clarity:        22/25  █████████░
       Correctness:    18/25  ███████░░░
       Best Practices: 18/25  ███████░░░
     
     ✓ Strengths:
       + Clear step-by-step instructions
       + Practical examples with context
     
     ✗ Weaknesses:
       - Only 2 examples (recommended: 3+)
       - Missing error handling case
     
     💡 Suggestions:
       1. Add example showing error handling
       2. Include edge case for empty input
     
     ⚠️ Similar: kubernetes-advanced (65% overlap)
    ============================================
    
    [1] approve   [2] view   [3] edit   [4] reject   [5] cancel
```

---

## 3. Entity Relationships

```
┌─────────────────────┐
│   CritiqueResult    │
├─────────────────────┤
│ score: 0-100        │
│ band: ScoreBand     │
│ artifact_type       │───────────────────┐
└─────────────────────┘                   │
         │                                │
         │ contains                       │
         ▼                                ▼
┌─────────────────────┐         ┌─────────────────────┐
│  QualityDimension   │         │    ArtifactType     │
├─────────────────────┤         ├─────────────────────┤
│ name                │         │ type enum           │
│ score: 0-25         │         │ checklist_mapping   │
│ criteria_met[]      │         └─────────────────────┘
│ criteria_failed[]   │
└─────────────────────┘
         
         │ references
         ▼
┌─────────────────────┐
│   SimilarityMatch   │
├─────────────────────┤
│ name                │
│ similarity: 0-100%  │
│ note                │
│ path                │
└─────────────────────┘
         
         │ displayed via
         ▼
┌─────────────────────┐
│  HumanGateDisplay   │
├─────────────────────┤
│ formatted output    │
│ visual indicators   │
│ action options      │
└─────────────────────┘
```

---

## 4. Validation Rules

### 4.1 CritiqueResult Validation

```yaml
rules:
  - score_sum: "sum(dimensions.score) == critique.score"
  - score_bounds: "0 <= score <= 100"
  - band_accuracy: "band matches score range"
  - suggestions_required: "if score < 90 then suggestions.length >= 1"
  - strengths_required: "strengths.length >= 1"
  - max_items: "suggestions.length <= 5 AND weaknesses.length <= 5"
```

### 4.2 Dimension Validation

```yaml
rules:
  - dimension_count: "exactly 4 dimensions"
  - dimension_bounds: "0 <= dimension.score <= 25"
  - required_dimensions: "all 4 dimension types present"
```

### 4.3 Similarity Validation

```yaml
rules:
  - threshold: "only report if similarity >= 60%"
  - bounds: "0 <= similarity <= 100"
  - exists: "referenced artifact must exist in skills/INDEX.md"
```

---

*Data model completed: 2026-02-02 | Next: contracts/, quickstart.md*
