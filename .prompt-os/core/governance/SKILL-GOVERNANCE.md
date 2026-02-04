---
name: core-governance-skill-governance
description: "SKILL-GOVERNANCE.md - Governança de Skills"
---

# SKILL-GOVERNANCE.md - Governança de Skills

**Versão:** 1.0  
**Data:** 2026-02-03  
**Status:** 🟢 DEFER - Post-SPEC-003 (Nice-to-Have)  
**Propósito:** Definir diretrizes para criação, atualização e depreciação de skills no Itzamna PromptOS

---

## Visão Geral

Este documento estabelece **políticas de governança** para o ciclo de vida de skills no sistema. Objetivo: manter consistência, evitar redundância e facilitar manutenção.

**Escopo:**
- Quando criar version-specific skill vs specialized skill
- Quando atualizar existing skill vs criar new
- Política de depreciação
- Version matrix (linguagens com múltiplas versões)

**Fora do escopo:**
- Processo técnico de criação (veja `ITZAMNA-AGENT.md` workflows)
- Protocolos core (veja `.prompt-os/core/`)
- INDEX maintenance (veja `INDEX-MAINTENANCE.md`)

---

## 1. Criação de Skills: Decision Tree

### Quando Criar Version-Specific Skill?

**Regra:** Crie version-specific skill quando:
1. **Breaking changes** entre versões (Java 8 → Java 17: records, sealed classes)
2. **Paradigm shift** (Python 2 vs Python 3: print function, Unicode)
3. **Major feature addition** que muda uso comum (JavaScript ES6: arrow functions, async/await)

**Estrutura de path:**
```
.prompt-os/skills/linguagens/{lang}/{version}/SKILL.md
```

**Exemplos:**
- ✅ `.prompt-os/skills/linguagens/java/java-17/SKILL.md` (records, sealed classes, virtual threads são breaking)
- ✅ `.prompt-os/skills/linguagens/python/python-3/SKILL.md` (print, Unicode, async são breaking vs Python 2)
- ❌ `.prompt-os/skills/linguagens/java/java-17-1/SKILL.md` (patch version desnecessária)

**Quando NÃO criar:**
- Patch versions (Java 17.0.1, 17.0.2) → atualizar baseline
- Minor API additions que não mudam uso fundamental → atualizar baseline ou criar specialized skill

---

### Quando Criar Specialized Skill?

**Regra:** Crie specialized skill quando:
1. **Framework/biblioteca específico** (Spring Boot, React, Django)
2. **Pattern/técnica específica** (Java Streams API, Python decorators)
3. **Domain-specific** (Java microservices, Python data science)
4. **Tool-specific** (Maven, npm, Docker)

**Estrutura de path:**
```
.prompt-os/skills/{categoria}/{subcategoria}/SKILL.md
```

**Exemplos:**
- ✅ `.prompt-os/skills/frameworks/spring/spring-boot/SKILL.md` (framework sobre Java)
- ✅ `.prompt-os/skills/linguagens/java/streams-api/SKILL.md` (feature específica do Java 8+)
- ✅ `.prompt-os/skills/patterns/microservices/SKILL.md` (pattern language-agnostic)
- ❌ `.prompt-os/skills/linguagens/java/java-spring-boot/SKILL.md` (mistura linguagem + framework incorretamente)

**Diferença-chave:** Version-specific = **breaking changes between versions**; Specialized = **deep dive into specific feature/domain**.

---

### Decision Tree Visual

```
User request: "Crie skill para {topico}"
                    |
                    v
            É uma LINGUAGEM?
           /                \
         YES                 NO
          |                   |
          v                   v
    É version-breaking?    É FRAMEWORK?
      (records, async)        |
     /            \          YES
   YES            NO          |
    |              |          v
    v              v      frameworks/{name}/
linguagens/{lang}/ linguagens/{lang}/     SKILL.md
  {version}/         {specialized}/
    SKILL.md            SKILL.md
    
                         NO
                          |
                          v
                    É PATTERN/TOOL?
                          |
                         YES
                          |
                          v
                    patterns/{name}/
                    ou tools/{name}/
                       SKILL.md
```

---

## 2. Atualização de Skills: Update vs New

### Quando Atualizar Existing Skill?

**Regra:** Atualize existing skill quando:
1. **Fix errors** (exemplos incorretos, typos, links quebrados)
2. **Add minor examples** (novo exemplo de uso que não muda escopo)
3. **Update sources** (fonte oficial mudou de URL)
4. **Clarify language** (melhorar clareza sem mudar conteúdo)
5. **Patch version bump** (Java 17.0.5 → 17.0.6, sem breaking changes)

**Como atualizar:**
1. Edit `.prompt-os/skills/{path}/SKILL.md`
2. Update `version: "X.Y.Z"` (increment patch or minor)
3. Run Self-Critique (score should remain ≥95)
4. Human Gate approval
5. Commit com mensagem `fix(skill): {description}` ou `docs(skill): {description}`

**Exemplo:**
```bash
# Fix erro em exemplo
git commit -m "fix(skill): correct Java streams example filter syntax (java-17)"
```

---

### Quando Criar New Skill?

**Regra:** Crie new skill quando:
1. **Breaking change** (major version bump)
2. **Scope expansion** (skill atual é baseline, novo é specialized)
3. **New technology** (framework/tool que não existia)
4. **Deprecation** (skill antiga deprecada, nova substitui)

**Como criar:**
1. Run AUTO-INCREMENT protocol (detect gap)
2. Generate new SKILL.md usando template
3. Self-Critique ≥95
4. Human Gate approval
5. Add to INDEX.md
6. Commit com mensagem `feat(skill): {description}`

**Exemplo:**
```bash
# Nova versão breaking
git commit -m "feat(skill): add Java 21 with virtual threads and pattern matching"

# Novo framework
git commit -m "feat(skill): add Spring Boot 3 baseline (frameworks/spring)"
```

---

### Update Decision Matrix

| Scenario | Update Existing | Create New | Rationale |
|----------|-----------------|------------|-----------|
| Typo em exemplo | ✅ | ❌ | Minor fix |
| Adicionar 1-2 exemplos | ✅ | ❌ | Scope unchanged |
| Java 17 → Java 21 (virtual threads) | ❌ | ✅ | Breaking change (major feature) |
| Python 3.9 → Python 3.10 (match/case) | ⚠️ | ⚠️ | **Depende:** Se baseline cobre, update; se deep dive, create specialized |
| Spring Boot 2 → Spring Boot 3 (Jakarta) | ❌ | ✅ | Breaking change (namespace change) |
| React 17 → React 18 (concurrent features) | ❌ | ✅ | Breaking change (new rendering model) |
| Source URL change | ✅ | ❌ | Metadata fix |
| Token limit exceeded (T0-SIZE-01) | ⚠️ | ❌ | Apply JIT sub-files, don't create new |

**Nota sobre token limit:** Se skill exceder 1,400 tokens, aplicar **JIT sub-files pattern** (ver SPEC-010 learnings), não criar nova skill fragmentada.

---

## 3. Política de Depreciação

### Quando Deprecar uma Skill?

**Regra:** Deprecar skill quando:
1. **Technology end-of-life** (Python 2 EOL em 2020, Java 8 EOL em 2023 para Oracle)
2. **Breaking replacement exists** (nova versão substitui completamente)
3. **Redundância detectada** (2 skills cobrindo mesmo tópico, uma é superior)

**Como deprecar:**

**Step 1: Mark as deprecated**
```yaml
---
name: java-8
status: deprecated
deprecated_date: "2026-02-03"
replacement: "java-17"
reason: "Java 8 reached end-of-life. Migrate to Java 17 (LTS)."
---
```

**Step 2: Add deprecation notice**
```markdown
# Java 8 — Linguagem Baseline

> ⚠️ **DEPRECATED:** This skill is deprecated as of 2026-02-03.
> **Replacement:** Use [Java 17](../java-17/SKILL.md) (LTS) for modern Java development.
> **Reason:** Java 8 reached end-of-life (EOL) in 2023.
```

**Step 3: Update INDEX.md**
```markdown
| java-8 | L2 | 🔴 DEPRECATED - Use java-17 |
```

**Step 4: Do NOT delete**
- Keep deprecated skill for historical reference
- Link to replacement in frontmatter and content
- Move to `.prompt-os/skills/_deprecated/` (opcional, v2.3.0)

---

### Deprecation Lifecycle

```
ACTIVE → DEPRECATED → ARCHIVED (optional)
  |          |            |
  |          |            +-- Move to _deprecated/ (v2.3.0)
  |          +-- Mark with ⚠️, link replacement
  +-- Actively maintained
```

**Timeline:**
- **Immediate:** Mark as deprecated, add notice
- **6 months:** Remove from primary navigation (INDEX shows at bottom)
- **12 months:** Optional archive to `_deprecated/` directory
- **Never:** Delete completely (keep for historical context)

---

## 4. Version Matrix (Linguagens)

### Supported Language Versions

**Policy:** Manter **baseline + LTS versions + latest** para linguagens principais.

| Linguagem | Baseline (Version-Agnostic) | LTS/Stable Versions | Latest | Deprecated |
|-----------|----------------------------|---------------------|--------|------------|
| **Java** | `java/SKILL.md` | java-11, java-17, java-21 | java-23 | java-8 (EOL 2023) |
| **Python** | `python/SKILL.md` | python-3.9, python-3.11 | python-3.13 | python-2 (EOL 2020) |
| **JavaScript** | `javascript/SKILL.md` | ES2020, ES2022 | ES2024 | ES5 (obsolete) |
| **Kotlin** | `kotlin/SKILL.md` | kotlin-1.8 | kotlin-2.0 | - |
| **C/C++** | `c-cpp/SKILL.md` | C++17, C++20 | C++23 | C++03 (legacy) |
| **Go** | `go/SKILL.md` (defer v2.3.0) | go-1.20 | go-1.22 | - |
| **Rust** | `rust/SKILL.md` (defer v2.3.0) | rust-1.70 | rust-1.75 | - |

**Baseline = Version-agnostic:** Cobre conceitos fundamentais transversais a todas as versões modernas (tipagem, memória, concorrência, ecossistema).

**Version-specific:** Deep dive em features específicas de versão (records Java 17, pattern matching Python 3.10, etc.).

---

### When to Add New Version Skill?

**Criteria:**
1. **LTS release** (Java 17, Python 3.11) → Add immediately
2. **Major breaking features** (Java 21 virtual threads, Python 3.10 match/case) → Add if widely adopted
3. **Latest release** → Wait 6 months for adoption; add if significant features

**Example decision:**
- **Java 21** (Sep 2023, LTS): Add in 2024 Q1 (6 months post-release)
- **Java 22** (Mar 2024, non-LTS): Defer until Java 23 (or skip if Java 23 LTS)
- **Java 23** (Sep 2024): If non-LTS, defer; if LTS, add in 2025 Q1

---

## 5. Governance Workflows

### Create Version-Specific Skill Workflow

```
1. GAP DETECTED
   ↓
2. CHECK VERSION MATRIX
   ↓ (Is it LTS or widely adopted?)
  YES
   ↓
3. AUTO-INCREMENT NOTIFICATION
   ↓
4. HUMAN DECISION (approve | defer | reject)
   ↓ (approve)
5. GENERATE SKILL
   - Path: linguagens/{lang}/{version}/SKILL.md
   - Reference baseline in introduction
   - Focus on version-specific features
   ↓
6. SELF-CRITIQUE (≥95)
   ↓
7. HUMAN GATE
   ↓ (approve)
8. INDEX UPDATE
   ↓
9. COMMIT
   ↓
10. MEMORY-MANAGEMENT (update version matrix in MEMORY.md)
```

---

### Create Specialized Skill Workflow

```
1. GAP DETECTED (framework, pattern, tool)
   ↓
2. CHECK CATEGORY (frameworks | patterns | tools | testing | etc.)
   ↓
3. AUTO-INCREMENT NOTIFICATION
   ↓
4. HUMAN DECISION (approve | defer | reject)
   ↓ (approve)
5. GENERATE SKILL
   - Path: {categoria}/{subcategoria}/SKILL.md
   - Reference related language baseline
   - Focus on specific feature/domain
   ↓
6. SELF-CRITIQUE (≥95)
   ↓
7. HUMAN GATE
   ↓ (approve)
8. INDEX UPDATE
   ↓
9. COMMIT
   ↓
10. MEMORY-MANAGEMENT
```

---

### Update Skill Workflow

```
1. ISSUE DETECTED (error, outdated info, improvement)
   ↓
2. LOAD EXISTING SKILL
   ↓
3. EDIT (fix, clarify, add minor examples)
   ↓
4. VERSION BUMP
   - Patch: 1.0.0 → 1.0.1 (fix)
   - Minor: 1.0.1 → 1.1.0 (add examples)
   ↓
5. SELF-CRITIQUE (score should remain ≥95)
   ↓
6. HUMAN GATE
   ↓ (approve)
7. COMMIT (fix: | docs: | refactor:)
   ↓
8. MEMORY-MANAGEMENT (optional, if significant change)
```

---

### Deprecate Skill Workflow

```
1. DEPRECATION TRIGGER (EOL, breaking replacement)
   ↓
2. CHECK REPLACEMENT (new version skill exists?)
   ↓ (YES)
3. MARK AS DEPRECATED
   - Update frontmatter (status, deprecated_date, replacement)
   - Add ⚠️ notice in content
   ↓
4. UPDATE INDEX.md
   - Mark as 🔴 DEPRECATED
   - Link to replacement
   ↓
5. COMMIT (chore: deprecate {skill} - replaced by {new-skill})
   ↓
6. MEMORY-MANAGEMENT (log deprecation in episodic memory)
   ↓
7. OPTIONAL (12 months): Move to _deprecated/ directory
```

---

## 6. Examples

### Example 1: Java 17 vs Java Streams API

**Scenario:** User asks "Crie skill para Java Streams"

**Decision:**
- Java Streams é **feature-specific** (não version-breaking, existe desde Java 8)
- Cria **specialized skill**: `.prompt-os/skills/linguagens/java/streams-api/SKILL.md`
- References: Baseline `java/SKILL.md` e version-specific `java-8/SKILL.md` (introduziu streams)

**Path chosen:**
```
.prompt-os/skills/linguagens/java/streams-api/SKILL.md
```

---

### Example 2: Spring Boot 3 (Breaking from Spring Boot 2)

**Scenario:** Spring Boot 3 migra de `javax.*` para `jakarta.*` (breaking change)

**Decision:**
- Spring Boot 3 é **breaking replacement** de Spring Boot 2
- Cria **new version-specific skill**: `.prompt-os/skills/frameworks/spring/spring-boot-3/SKILL.md`
- Deprecates: `spring-boot-2/SKILL.md` com link para nova versão

**Path chosen:**
```
.prompt-os/skills/frameworks/spring/spring-boot-3/SKILL.md
```

**Deprecation:**
```yaml
# spring-boot-2/SKILL.md
status: deprecated
deprecated_date: "2023-11-01"
replacement: "spring-boot-3"
reason: "Spring Boot 2 reached end-of-life. Migrate to Spring Boot 3 (jakarta namespace)."
```

---

### Example 3: Python 3.10 Match/Case

**Scenario:** Python 3.10 introduz `match/case` (structural pattern matching)

**Decision tree:**
- É **version-specific feature** (não em Python 3.9)
- **Opção A:** Atualizar baseline `python/SKILL.md` mencionando match/case brevemente
- **Opção B:** Criar specialized skill `python/pattern-matching/SKILL.md`

**Decision:** **Opção A** (atualizar baseline)
- Rationale: Match/case é novo, mas não muda paradigma fundamental do Python
- Baseline deve cobrir transversalmente, mencionando que feature existe desde 3.10
- Se usuário precisar deep dive, criar specialized skill depois

---

## 7. Governance Metrics (Future)

**V2.3.0 - Track governance health:**

| Metric | Target | Current | How to Measure |
|--------|--------|---------|----------------|
| Skills por categoria | Balanced | TBD | Count skills in each category |
| Deprecated skills | <10% | TBD | Count deprecated / total |
| Version-specific vs baseline ratio | 3:1 | TBD | (version-specific + specialized) / baselines |
| Update frequency | >1/month | TBD | Commits with `fix(skill):` or `docs(skill):` |
| Avg skill quality | ≥95 | 99.20 (SPEC-010) | Self-Critique avg score |

---

## 8. FAQ

**Q: Quando criar skill de framework vs linguagem?**  
A: Framework = categoria `frameworks/`. Linguagem = categoria `linguagens/`. Nunca misturar path (`.prompt-os/skills/linguagens/java/spring-boot/` é ERRADO).

**Q: Python 3.11 vs Python 3.12 - preciso de 2 skills?**  
A: Depende. Se 3.12 tem breaking changes ou features fundamentais novas (ex: PEP 701 f-strings), crie nova. Senão, atualize baseline.

**Q: Skill excedeu 1,400 tokens. Criar nova skill fragmentada?**  
A: NÃO. Aplicar **JIT sub-files pattern** (ver C/C++ em SPEC-010). Nunca fragmentar skill por token limit.

**Q: Posso deletar skill deprecada após 12 meses?**  
A: NÃO recomendado. Mover para `_deprecated/` (v2.3.0) para manter histórico. Nunca deletar completamente.

**Q: Skill de React 18 deve referenciar JavaScript baseline?**  
A: SIM. No frontmatter ou introdução, link para `linguagens/javascript/SKILL.md` como prerequisite.

---

## 9. References

- **SPEC-010 learnings:** JIT sub-files pattern, version-agnostic baselines
- **Constitution:** T0-SIZE-01 (token limit), T1-NAMING-01/02/03 (path structure)
- **INDEX maintenance:** `.prompt-os/docs/INDEX-MAINTENANCE.md`
- **Protocol workflows:** `ITZAMNA-AGENT.md`, `.prompt-os/core/AUTO-INCREMENT.md`

---

## 10. Changelog

**v1.0 (2026-02-03):**
- Initial version
- Defined version-specific vs specialized decision tree
- Documented update vs new policy
- Established deprecation lifecycle
- Created version matrix for 5 languages

**Future:**
- v1.1: Add governance metrics tracking
- v1.2: Define `_deprecated/` directory structure
- v2.0: Integrate with automated validation (Solution 8)

---

**Status:** 🟢 DEFER - Post-SPEC-003 (Nice-to-Have)  
**Estimated effort:** 2-3 hours (completed)  
**Next:** Solution 8 (Index Validation Script)
