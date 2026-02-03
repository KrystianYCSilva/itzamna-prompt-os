# SPEC-010: Language Skills Baseline

> **Status:** Draft
> **Priority:** P1 (High)
> **Estimated Effort:** 5-8 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-03
> **Depends On:** SPEC-001 (Self-Critique), SPEC-002 (Auto-Increment)

---

## 1. Problem Statement

### 1.1 Current State
O Itzamna PromptOS possui uma biblioteca de skills em crescimento, mas carece de uma base padronizada e abrangente para as linguagens de programação mais utilizadas no mercado. Atualmente, as skills de linguagens estão dispersas ou focadas em tópicos muito específicos (ex: `java-8-orientacao-objetos`), sem um "pilar central" genérico para cada linguagem.

### 1.2 Desired State
O sistema deve possuir uma hierarquia clara de conhecimento para linguagens de programação:
1. **Nível Baseline**: Uma skill geral para cada linguagem (`java`, `kotlin`, `c-and-cpp`, `javascript`, `python`) cobrindo conceitos fundamentais, sintaxe básica e filosofia da linguagem.
2. **Nível Especializado**: Sub-skills organizadas em subpastas que tratam de versões específicas (ex: `java-17`, `java-21`) ou paradigmas/modos de uso (ex: `kotlin-funcional`, `ponteiros-em-c`).

### 1.3 Impact
- **Consistência**: Agentes terão um ponto de referência comum para cada linguagem.
- **Escalabilidade**: A estrutura hierárquica facilita o auto-incremento de versões futuras.
- **Qualidade**: Todas as skills passarão pelo protocolo de `SELF-CRITIQUE` v2.0, garantindo exemplos práticos e ausência de placeholders.

---

## 2. Goals and Non-Goals

### 2.1 Goals
1. Criar a pasta `@.prompt-os/skills/linguagens/` como root das linguagens.
2. Implementar a primeira fase: um `SKILL.md` genérico para cada uma das 5 linguagens alvo.
3. Definir a estrutura de subpastas para a segunda fase (versões e especializações).
4. Seguir rigorosamente o fluxo: Generate -> Self-Critique -> Human Gate.
5. Atualizar o `SKILLS INDEX` global e o registro interno do sistema.

### 2.2 Non-Goals
- Não implementar frameworks específicos nestas skills (ex: Spring, React) - focar na linguagem pura.
- Não exaurir todos os tópicos avançados no nível baseline.
- Não automatizar a criação sem revisão humana.

---

## 3. Solution Design

### 3.1 Directory Structure
```
.prompt-os/skills/linguagens/
├── java/
│   ├── SKILL.md (Baseline)
│   ├── java-8/
│   ├── java-17/
│   └── ...
├── kotlin/
│   ├── SKILL.md (Baseline)
│   ├── kotlin-funcional/
│   └── ...
├── c-and-cpp/
│   ├── SKILL.md (Baseline)
│   └── ...
├── javascript/
│   ├── SKILL.md (Baseline)
│   └── ...
└── python/
    ├── SKILL.md (Baseline)
    └── ...
```

### 3.2 Workflow de Implementação
Para cada linguagem:
1. **Research**: Identificar conceitos core (Tipagem, Memória, Concorrência, Ecossistema).
2. **Generate**: Usar o `SKILL.template.md` para criar o baseline.
3. **Self-Critique**: Aplicar o protocolo v2.0 (YAML output, Score >= 70).
4. **Human Gate**: Apresentar preview e aguardar `approve`.
5. **Index**: Adicionar ao registro de skills.

---

## 4. Implementation Plan

### Phase 1: Setup & Baseline (Current)
- [ ] Criar estrutura de pastas em `.prompt-os/skills/linguagens/`.
- [ ] Gerar Skill Baseline: Java.
- [ ] Gerar Skill Baseline: Kotlin.
- [ ] Gerar Skill Baseline: C/C++.
- [ ] Gerar Skill Baseline: JavaScript.
- [ ] Gerar Skill Baseline: Python.

### Phase 2: Specialization (Next)
- [ ] Mapear versões críticas (Java 8, 11, 17, 21, etc.).
- [ ] Mapear tópicos profundos (Ponteiros, Coroutines, Prototypal Inheritance).

---

## 5. Acceptance Criteria
- Cada pasta de linguagem possui um `SKILL.md` válido.
- O score de `SELF-CRITIQUE` de cada skill é superior a 70.
- Nenhuma skill contém placeholders `[XXX]`.
- O `SKILLS INDEX` reflete as novas adições.
- A hierarquia de pastas segue o padrão `linguagens/{lang}/{specialization}/`.

---

## 6. References
- `.prompt-os/templates/SKILL.template.md`
- `.prompt-os/core/SELF-CRITIQUE.md`
- `.prompt-os/core/AUTO-INCREMENT.md`
- `ITZAMNA-AGENT.md`
