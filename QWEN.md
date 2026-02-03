# QWEN.md

> **Bootstrap para Qwen** | Itzamna PromptOS v2.1.0

---

## LEIA PRIMEIRO

Este arquivo configura o Qwen para trabalhar com Itzamna PromptOS.

**Carregamento JIT - Ordem de prioridade:**

1. **`ITZAMNA-AGENT.md`** - Agente principal (workflows + referencias obrigatorias)
2. **`.prompt-os/PROMPTOS.md`** - Entry point do sistema
3. **`.prompt-os/CONSTITUTION.md`** - Regras T0/T1/T2
4. **`MEMORY.md`** - Estado persistente
5. **`.context/`** - Contexto do projeto (carregar JIT)

---

## INICIALIZACAO RAPIDA

```
1. LER: ITZAMNA-AGENT.md (agente principal)
2. LER: .prompt-os/PROMPTOS.md (entry point)
3. LER: .prompt-os/CONSTITUTION.md (regras)
4. LER: MEMORY.md (estado atual)
5. CARREGAR JIT: .context/ conforme necessidade
```

---

## REGRAS T0 (INVIOLAVEIS)

| ID | Regra |
|----|-------|
| T0-HUMAN-01 | TODA criacao/modificacao de arquivo REQUER aprovacao humana |
| T0-HUMAN-02 | SEMPRE mostrar preview antes de commit |
| T0-MEMORY-01 | SEMPRE atualizar MEMORY.md apos acoes significativas |
| T0-SIZE-01 | Skills < 1400 tokens, Kernel < 5KB |
| T0-SOURCE-01 | SEMPRE citar fontes em skills geradas |
| T0-PROTOCOL-01 | Protocolos devem estar integrados e referenciarem-se mutuamente |

---

## RESUMO DO CONTEXTO (v2.1.0)

- PromptOS e **prompt-based**: core = Markdown (sem execucao obrigatoria de codigo).
- Entry point: `.prompt-os/PROMPTOS.md`; regras em `.prompt-os/CONSTITUTION.md`.
- Protocolos core (8): SELF-CRITIQUE, HUMAN-GATE, AUTO-INCREMENT, WEB-RESEARCH, KNOWLEDGE-BASE, PERSONA-GENERATOR, INPUT-CLASSIFIER, JIT-PROTOCOL.
- Estado persistente e historico: `MEMORY.md` (sempre manter estavel e atualizado).
- Skills/Personas: **23 skills** em 8 categorias (18 legacy + **5 language baselines**: Java, Kotlin, C/C++, JavaScript, Python); 1 persona (ver `MEMORY.md`).
- SPEC-010 **✅ COMPLETE**: 5 language baselines delivered (avg score 99.20/100, 0% rejections, JIT sub-files pattern proven).
- Roadmap v2.1.0 completo: SPEC-002 validada (90/90 tasks), SPEC-010 validada (5/5 skills), memoria distribuida, integracao cross-protocol.
- **Próximo (v2.2.0)**: SPEC-003 Web Research Enhancement.

---

## CONTEXTO DO PROJETO

O contexto esta em `.context/` - carregue JIT:

| Arquivo | Quando Carregar |
|---------|-----------------|
| `.context/standards/architectural-rules.md` | Ao escrever codigo (T0) |
| `.context/_meta/project-overview.md` | Para entender o projeto |
| `.context/_meta/tech-stack.md` | Para entender a stack |
| `.context/patterns/architectural-overview.md` | Ao projetar sistemas |
| `.context/workflows/development-workflows.md` | Ao executar workflows |
| `.context/troubleshooting/common-issues.md` | Ao encontrar problemas |
| `.context/standards/code-quality.md` | Para padroes de qualidade |
| `.context/standards/testing-strategy.md` | Para estrategia de testes |

---

## HUMAN GATE

**Nivel de Autonomia: A2 (Colaborador)**
**Protocolo completo:** `.prompt-os/core/HUMAN-GATE.md`

Operacoes que REQUEREM aprovacao:
- Criar/modificar arquivos
- Gerar skills/personas
- Fazer commits
- Deletar arquivos

---

## PROTOCOLOS CORE

| Protocolo | Proposito |
|-----------|-----------|
| `SELF-CRITIQUE.md` | Avaliacao de qualidade (score 0-100, 4 dimensoes) |
| `HUMAN-GATE.md` | Apresentacao estruturada ao humano |
| `AUTO-INCREMENT.md` | Deteccao de gaps, aprendizado com rejeicoes, sugestoes proativas, relatorios de evolucao |
| `WEB-RESEARCH.md` | Metodologia de pesquisa |
| `KNOWLEDGE-BASE.md` | Gestao de conhecimento |
| `PERSONA-GENERATOR.md` | Criacao de personas |
| `INPUT-CLASSIFIER.md` | Classificacao de input |
| `JIT-PROTOCOL.md` | Carregamento otimizado |

---

## REFERENCIA COMPLETA

Para informacoes detalhadas, consulte:
- **`ITZAMNA-AGENT.md`** - Agente principal com todos os detalhes
- **`.context/ai-assistant-guide.md`** - Guia completo para AIs
- **`.prompt-os/CONSTITUTION.md`** - Regras completas

---

*Itzamna PromptOS v2.1.0 | Qwen Bootstrap | 2026-02-03*
