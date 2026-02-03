# Itzamna PromptOS v2.1.0 - Arquitetura

> **Sistema Operacional Cognitivo para Programacao Paralela Humano-Agente**
> **Arquitetura:** Prompt-Based | **Atualizado:** 2026-02-03

---

## 1. Visao Geral

O Itzamna PromptOS e um sistema **prompt-based**: o core sao arquivos Markdown que agentes de IA leem e seguem. Nao ha execucao obrigatoria de codigo para o funcionamento do sistema.

**Entry point:** `.prompt-os/PROMPTOS.md`

---

## 2. Insight Chave

```
PromptOS = PROMPTS (Markdown) que AI agents LEEM e SEGUEM
         ≠ Codigo que EXECUTA
```

---

## 3. Componentes Principais

```
.prompt-os/
├── PROMPTOS.md           # Entry point (leia primeiro)
├── CONSTITUTION.md       # Regras T0/T1/T2
├── core/                 # Protocolos comportamentais
│   ├── SELF-CRITIQUE.md
│   ├── HUMAN-GATE.md
│   ├── AUTO-INCREMENT.md
│   ├── WEB-RESEARCH.md
│   ├── KNOWLEDGE-BASE.md
│   ├── PERSONA-GENERATOR.md
│   ├── INPUT-CLASSIFIER.md
│   └── JIT-PROTOCOL.md
├── skills/INDEX.md       # Registry interno (espelho)
└── personas/INDEX.md     # Registry interno (espelho)

skills/                   # Conteudo gerado (17 skills)
personas/                 # Conteudo gerado (1 persona)
.context/                 # Contexto estruturado (T0-T3)
MEMORY.md                 # Memoria persistente
ITZAMNA-AGENT.md           # Agente principal
```

---

## 4. Fluxo de Operacao (Prompt-Based)

```
AI Agent
  ↓
Ler ITZAMNA-AGENT.md
  ↓
Ler .prompt-os/PROMPTOS.md
  ↓
Ler .prompt-os/CONSTITUTION.md
  ↓
Carregar protocolos core JIT
  ↓
Carregar skills/personas JIT
  ↓
Executar tarefa
  ↓
Human Gate (antes de persistir)
  ↓
Atualizar MEMORY.md
```

---

## 5. Human-in-the-Loop (T0)

Toda operacao de escrita exige aprovacao humana explicita. O protocolo Human Gate define preview + aprovacao:

```
1. Gerar artefato
2. Self-Critique (score 0-100)
3. Mostrar preview
4. Aguardar: approve | view | edit | reject | cancel
```

---

## 6. Sistema de Memorias (CoALA simplificado)

| Tipo | Funcao | Local |
|------|--------|-------|
| Working | Contexto da sessao | Context window |
| Episodica | Historico de interacoes | MEMORY.md |
| Semantica | Conhecimento | skills/ + docs/ |
| Procedural | Protocolos e workflows | .prompt-os/core/ |

---

## 7. Tiers de Autoridade (.context/)

| Tier | Tipo | Prevalece Sobre | Arquivo |
|------|------|-----------------|---------|
| T0 | Enforcement | Todos | .context/standards/architectural-rules.md |
| T1 | Standards | T2, T3 | .context/standards/ + patterns/ + workflows/ |
| T2 | Context | T3 | .context/_meta/ + troubleshooting/ |
| T3 | Examples | Nenhum | .context/examples/ |

---

## 8. Protocolos Core (8)

| Protocolo | Funcao | Spec |
|-----------|--------|------|
| SELF-CRITIQUE | Avaliacao de qualidade | SPEC-001 |
| HUMAN-GATE | Aprovacao humana | SPEC-001 |
| AUTO-INCREMENT | Deteccao de gaps, aprendizado com rejeicoes, sugestoes proativas, relatorios de evolucao | SPEC-002 |
| WEB-RESEARCH | Metodologia de pesquisa | SPEC-003 |
| KNOWLEDGE-BASE | Gestao de conhecimento | SPEC-004 |
| PERSONA-GENERATOR | Criacao de personas | SPEC-005 |
| INPUT-CLASSIFIER | Classificacao de input | Foundation |
| JIT-PROTOCOL | Carregamento JIT | Foundation |

---

## 9. Ferramentas Opcionais (Nao Core)

- Node CLI: `node .prompt-os\tools\brain.js ...`
- Python CLI: `py .prompt-os\core\cli.py ...`
- PowerShell: `\.\.prompt-os\scripts\sync-constitution.ps1 ...`

---

## 10. Historico (Legacy)

v1.0.0 era code-centric (scripts .js/.py). A partir do v2.0.0, o sistema passou a ser **prompt-based** e universal. Consulte `docs/v1/` para referencias historicas.

---

**EOF** | Arquitetura v2.1.0
