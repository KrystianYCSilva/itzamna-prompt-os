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

## RESUMO DO CONTEXTO (v2.2.0)

- PromptOS e **prompt-based**: core = Markdown (sem execucao obrigatoria de codigo).
- Entry point: `.prompt-os/PROMPTOS.md`; regras em `.prompt-os/CONSTITUTION.md`.
- Protocolos core (17): 9 main (SELF-CRITIQUE, HUMAN-GATE, AUTO-INCREMENT, WEB-RESEARCH, KNOWLEDGE-BASE, PERSONA-GENERATOR, INPUT-CLASSIFIER, JIT-PROTOCOL, MEMORY-MANAGEMENT) + 4 JIT web-research + 4 JIT knowledge-base sub-files.
- Estado persistente e historico: `MEMORY.md` (sempre manter estavel e atualizado).
- Skills/Personas: **13 skills** (6 baselines + 7 advanced); 0 personas criadas (on-demand).
- Language baselines: **6** (Java, Kotlin, C/C++, JavaScript, Python, **Go**).
- **SPEC-004 ✅ COMPLETE** (Session 26): Knowledge Base/RAG - Phases 0-3 complete, SC-001/SC-003 validated, 100% pass rate, deferred SCs triggered on next skill creation.
- **SPEC-003 ✅ COMPLETE** (Session 24): 4-dimension scoring, citation templates, tier system, gap detection. Go skill = first SPEC-003 application (100/100).
- **SPEC-010 ✅ COMPLETE**: 6 language baselines delivered (avg score 99.20/100, 0% rejections, JIT sub-files pattern proven).
- Roadmap v2.2.0 COMPLETO: SPEC-003 + SPEC-004 validadas e live em `.prompt-os/core/`.
- **Próximo (v2.3.0)**: Advanced features & ecosystem - ecosystem sub-files, more baselines (Rust, TypeScript).

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

## MANDATORY PROTOCOL SEQUENCE ⚠️ CRITICAL

**Ao gerar qualquer artefato (skill, persona, code, doc), siga esta sequencia EXATA:**

```
1. AUTO-INCREMENT (.prompt-os/core/AUTO-INCREMENT.md)
   → Verificar se artefato similar existe
   → Detectar gaps se necessario
   → Se gap + defer: MEMORY-MANAGEMENT registra gap

2. GENERATE
   → Criar artefato seguindo templates/standards
   → Aplicar learned actions (version-agnostic, JIT sub-files, etc.)

3. SELF-CRITIQUE (.prompt-os/core/SELF-CRITIQUE.md)
   → Avaliar em 4 dimensoes (Completude, Clareza, Correcao, Best Practices)
   → Calcular score (0-100)
   → Gerar YAML estruturado

4. HUMAN-GATE (.prompt-os/core/HUMAN-GATE.md) ⚠️ CHECKPOINT OBRIGATORIO
   → Apresentar artefato com score visual
   → Mostrar preview completo ao humano
   → Aguardar aprovacao: approve|view|edit|reject|cancel
   → Se reject: MEMORY-MANAGEMENT registra rejeicao
   → ⚠️ NUNCA escrever arquivos sem aprovacao (T0-HUMAN-01 violation)

5. COMMIT (somente apos aprovacao)
   → Escrever arquivos
   → Atualizar indices (INDEX.md)
   → Commit com conventional commits

6. MEMORY-MANAGEMENT (.prompt-os/core/MEMORY-MANAGEMENT.md) ⚠️ OBRIGATORIO
   → Atualizar MEMORY.md (estatisticas + episodica)
   → Atualizar memory/{agente}-memory.md (nota de sessao)
   → Criar workflow doc se necessario (.context/workflows/)
   → ⚠️ NUNCA commitar sem atualizar memoria (T0-MEMORY-01 violation)
```

**⚠️ Violacoes T0**:
- Pular HUMAN-GATE = T0-HUMAN-01 violation
- Pular MEMORY-MANAGEMENT = T0-MEMORY-01 violation

**Arquitetura de Memoria (3 Camadas):**
- **MEMORY.md**: Estatisticas agregadas + ultimas 5-10 sessoes (SUCINTO)
- **memory/{agente}-memory.md**: Gaps + Rejeicoes + Sessoes detalhadas (AGENT-SPECIFIC)
- **.context/workflows/**: Execution patterns reutilizaveis (WORKFLOW DOCS)

**Leia o protocolo completo:** `.prompt-os/core/MEMORY-MANAGEMENT.md`

---

## REFERENCIA COMPLETA

Para informacoes detalhadas, consulte:
- **`ITZAMNA-AGENT.md`** - Agente principal com todos os detalhes
- **`.context/ai-assistant-guide.md`** - Guia completo para AIs
- **`.prompt-os/CONSTITUTION.md`** - Regras completas

---

*Itzamna PromptOS v2.2.0 | Qwen Bootstrap | 2026-02-03*
