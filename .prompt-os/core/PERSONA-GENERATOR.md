---
name: core-persona-generator
description: "PERSONA-GENERATOR - Criacao de Personas"
---

# PERSONA-GENERATOR - Criacao de Personas

> **Instrucoes para voce (agente de IA) criar novas personas.**  
> Como gerar personas compostas por skills existentes.  
> **Status**: SPEC-005a v2.0 (Protocol formalization in progress)

---

## O QUE E UMA PERSONA

Uma persona e um **modo de comportamento especializado** que:

1. Define expertise e estilo de comunicacao
2. Carrega automaticamente skills relevantes
3. Ajusta como voce aborda problemas
4. E ativada por triggers ou solicitacao explicita

### Diferenca de Skill

| Aspecto | Skill | Persona |
|---------|-------|---------|
| Proposito | Como fazer algo | Quem voce e |
| Conteudo | Instrucoes tecnicas | Comportamentos |
| Ativacao | Por demanda | Por contexto |
| Combinacao | 3-5 por vez | 1 ativa |

---

## QUANDO CRIAR PERSONA

Crie persona quando:

1. Usuario trabalha repetidamente em dominio especifico
2. Combinacao de skills e frequentemente usada
3. Estilo de comunicacao especifico e necessario
4. Usuario solicita explicitamente

**NAO crie** quando:
- Skill simples resolve
- Uso unico ou raro
- Apenas preferencia de formatacao

---

## ESTRUTURA DE PERSONA

### Template Padrao

```yaml
---
# PERSONA: {nome}
# Version: 1.0.0
# Generated: {data}
# Author: promptos-brain

name: "{Nome da Persona}"
role: "{Titulo Profissional}"
level: "{junior|mid|senior|principal}"
domains: ["{dominio1}", "{dominio2}"]

skills:
  core: ["{skill-1}", "{skill-2}"]
  secondary: ["{skill-3}"]

context:
  communication_style: "{estilo}"
  decision_approach: "{abordagem}"
  collaboration_mode: "{modo}"

triggers: ["{frase-1}", "{frase-2}"]
---

# {Nome da Persona}

## Identity
{Descricao de quem e esta persona}

## Core Competencies
{Lista de especialidades principais}

## Behavioral Traits
{Como esta persona age e pensa}

## When to Activate
{Situacoes onde usar esta persona}
```

---

## PROCESSO DE GERACAO (6 Fases)

### Workflow Overview

Persona generation follows a 6-phase workflow:

1. **Entender Request**: Extract domain, level, specialization from user input
2. **Match de Skills**: Query `.prompt-os/skills/INDEX.md`, score and rank skills (3-5 core, 2-3 secondary)
3. **Inferir Atributos**: Determine level-based traits (junior/mid/senior/principal) and domain specialization
4. **Gerar Conteudo**: Apply template, populate all sections with persona attributes
5. **Self-Critique**: Validate skill relevance, triggers uniqueness, behavior consistency (target: ≥80/100)
6. **Human Gate**: Present to user with preview, await approval/rejection

**Detailed algorithms** → See JIT files:
- `persona-generation-workflow.md` — Complete 6-phase algorithm with scoring formula
- `persona-traits-inference.md` — Level × Domain trait combinations
- `persona-triggers.md` — Trigger derivation algorithm + conflict detection
- `persona-examples.md` — 3 worked examples (Senior Backend, Junior Frontend, DevOps)

---

## REGRAS DE COMPOSICAO

**Core Skills**: 3-5 obrigatorias (carregadas automaticamente)  
**Secondary Skills**: 2-3 complementares (sob demanda)  
**Skill Gap**: Se skills solicitadas nao existem, REJECT persona + log to AUTO-INCREMENT.md

---

## COMANDOS DE PERSONA

### Listar Personas

```
Usuario: "Quais personas existem?"

Resposta:
"Personas disponiveis:
| Persona | Role | Domains |
|---------|------|---------|
| Senior Backend Engineer | Backend | backend, devops |
..."
```

### Ativar Persona

```
Usuario: "Ative persona Backend"

Resposta:
"Persona 'Senior Backend Engineer' ativada.
Skills carregadas: nodejs-api, docker-basics, kubernetes
Meu foco: Escalabilidade, API design, observabilidade"
```

### Desativar Persona

```
Usuario: "Desative persona"

Resposta:
"Persona desativada. Voltando ao modo padrao."
```

---

## VALIDACAO

### Checklist de Qualidade

- [ ] Nome claro e descritivo?
- [ ] Skills existem em `.prompt-os/skills/INDEX.md`?
- [ ] Triggers sao unicos (sem conflitos)?
- [ ] Comportamentos distintos do padrao?
- [ ] Nivel coerente com estilo?
- [ ] Self-critique score ≥80/100?

### Evitar Redundancia

SE persona similar existe:
1. Compare skills e triggers
2. Sugira: atualizar existente vs criar especializacao
3. Deixe usuario decidir

---

## ESPECIALIZACOES

### Por Area

**Frontend**: accessibility focus | **Backend**: scalability focus | **DevOps**: automation focus | **Security**: hardening focus | **Data Science**: model accuracy focus

### Por Nivel

**junior**: Learning-oriented | **mid**: Practical, balanced | **senior**: Strategic, mentoring | **principal**: Visionary, architect

---

## PERSISTENCIA E INDEX

### Guardar Persona

After approval:
1. Create file: `.prompt-os/personas/{persona-name}.md`
2. Add to `.prompt-os/personas/INDEX.md`:
   - Entry format: `| {name} | {role} | {domains} | {level} |`
3. Log creation to MEMORY.md

### Skills Validation

Query skill library before persona creation:
- IF skills missing → REJECT + suggest AUTO-INCREMENT
- IF skills overlap → Consolidate (choose best)
- IF skill library growing → Update INDEX.md

---

## INTEGRACAO

| Protocol | Purpose |
|----------|---------|
| SELF-CRITIQUE.md | Avalie persona antes de apresentar |
| HUMAN-GATE.md | Approval workflow + preview |
| AUTO-INCREMENT.md | Log personas criadas + gaps |
| KNOWLEDGE-BASE.md | Query skill library |

---

## REFERENCIAS

- **Spec**: `specs/005-persona-generator/spec.md`
- **JIT**: `.prompt-os/core/persona-generator/` (4 files: workflow, traits, triggers, examples)

---

**Persona Generator v2.0** | SPEC-005a | [Learn more in JIT files]
