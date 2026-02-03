# Key Decisions - Itzamna PromptOS

> **Versão:** 2.1.0 | Architectural Decision Records (ADRs)
> **Última Atualização:** 2026-02-03

---

## ADR-001: Human-in-the-Loop Protocol

**Data:** 2026-01-15
**Status:** ✅ Aprovado
**Tier:** T0

### Contexto
Sistemas de AI podem gerar conteúdo incorreto ou indesejado. Precisamos garantir controle humano.

### Decisão
Implementar protocolo de aprovação humana obrigatória para todas as operações de persistência (L2/L3).

### Consequências
- ✅ Melhora confiabilidade do sistema
- ✅ Previne modificações acidentais
- ⚠️ Adiciona etapa manual ao processo

### Implementação
- `T0-HUMAN-01` em CONSTITUTION.md
- Human Gate no pipeline de 6 fases
- Fluxos: approve, view, edit, reject, cancel

---

## ADR-002: Kernel Lightweight Architecture

**Data:** 2026-01-16
**Status:** ✅ Aprovado
**Tier:** T0

### Contexto
Context windows de AI são limitados. O kernel deve ser leve para deixar espaço para skills.

### Decisão
Manter o kernel (AGENTS.md) com tamanho inferior a 5KB, contendo apenas regras fundamentais.

### Consequências
- ✅ Melhora eficiência de carregamento
- ✅ Força decisões claras sobre o que é essencial
- ⚠️ Requer separação entre kernel e extensões

### Implementação
- `ARCH-002` em architectural-rules.md
- Skills limitadas a 1400 tokens

---

## ADR-003: JIT Skill Loading

**Data:** 2026-01-17
**Status:** ✅ Aprovado
**Tier:** T1

### Contexto
Carregar todas as skills consome contexto desnecessariamente.

### Decisão
Implementar carregamento Just-In-Time (JIT) de skills baseado em necessidade contextual.

### Consequências
- ✅ Melhora eficiência do uso de contexto
- ✅ Reduz tempo de processamento
- ⚠️ Requer sistema de classificação

### Implementação
- `.prompt-os/core/JIT-PROTOCOL.md`
- `.prompt-os/core/INPUT-CLASSIFIER.md`

---

## ADR-004: Cross-Model Compatibility

**Data:** 2026-01-18
**Status:** ✅ Aprovado
**Tier:** T0

### Contexto
Diferentes equipes usam diferentes AI agents. O sistema deve funcionar em todos.

### Decisão
Garantir que todas as implementações funcionem consistentemente em diferentes modelos de IA.

### Consequências
- ✅ Maximiza portabilidade
- ✅ Expande alcance de utilização
- ⚠️ Limita uso de features específicas de modelos

### Implementação
- Arquitetura prompt-based (ADR-006)
- Bootstrap files para cada agent
- Sync-constitution.ps1 para sincronização

---

## ADR-005: 6-Phase Generation Pipeline

**Data:** 2026-01-19
**Status:** ✅ Aprovado
**Tier:** T1

### Contexto
Geração de skills precisa de qualidade consistente e controle.

### Decisão
Implementar pipeline de 6 fases: Classify → Research → Generate → Self-Critique → Human Gate → Commit

### Consequências
- ✅ Processo robusto e controlado
- ✅ Melhor rastreabilidade
- ⚠️ Maior overhead para gerações simples

### Implementação
- Descrito em AGENTS.md
- Self-Critique em `.prompt-os/core/SELF-CRITIQUE.md`
- Human Gate protocol documentado

---

## ADR-006: Prompt-Based Architecture (v2.0.0)

**Data:** 2026-02-02
**Status:** ✅ Aprovado
**Tier:** T0

### Contexto
v1.0.0 era code-centric (Node.js, Python). Isso criava dependência de runtime e limitava cross-model compatibility.

### Decisão
Reestruturar o sistema para ser **prompt-based**: o core são arquivos Markdown que AI agents leem e seguem, não código que executa.

### Razões
1. **Universal:** Qualquer AI que lê Markdown pode usar
2. **Sem dependências:** Não precisa de Node.js/Python
3. **Auto-documentado:** O protocolo explica a si mesmo
4. **Fácil evolução:** Editar Markdown é mais simples que código

### Consequências
- ✅ Verdadeira cross-model compatibility
- ✅ Sem dependências de runtime
- ✅ Instruções claras e legíveis
- ✅ Fácil de modificar e evoluir
- ⚠️ Tools opcionais ainda precisam de runtime

### Implementação

| Antes (v1.0) | Depois (v2.0) |
|--------------|---------------|
| `orchestrator.py` | `.prompt-os/PROMPTOS.md` |
| `cli.py` | Instruções em `core/*.md` |
| `self-critique.js` | `core/SELF-CRITIQUE.md` |
| `gap-detector.js` | `core/AUTO-INCREMENT.md` |
| Scripts executáveis | Protocolos para seguir |

### Arquivos Criados
- `.prompt-os/PROMPTOS.md` (entry point)
- `.prompt-os/CONSTITUTION.md` (rules)
- `.prompt-os/core/SELF-CRITIQUE.md`
- `.prompt-os/core/AUTO-INCREMENT.md`
- `.prompt-os/core/WEB-RESEARCH.md`
- `.prompt-os/core/KNOWLEDGE-BASE.md`
- `.prompt-os/core/PERSONA-GENERATOR.md`
- `.prompt-os/core/INPUT-CLASSIFIER.md`
- `.prompt-os/core/JIT-PROTOCOL.md`

---

## ADR-007: Tier System for Rules

**Data:** 2026-02-02
**Status:** ✅ Aprovado
**Tier:** T0

### Contexto
Diferentes regras têm diferentes níveis de importância. Precisamos de hierarquia clara.

### Decisão
Implementar sistema de 3 tiers com precedência clara:

| Tier | Nome | Autoridade | Pode Quebrar? |
|------|------|------------|---------------|
| T0 | Inviolável | Absoluta | NUNCA |
| T1 | Forte | Normativa | Com justificativa |
| T2 | Convenção | Informativa | Livremente |

### Regra de Conflito
```
T0 > T1 > T2
Se tiers conflitam, tier mais alto vence.
```

### Implementação
- Definido em `CONSTITUTION.md`
- Documentado em `.context/standards/`
- Aplicado via Self-Critique

---

## ADR-008: Self-Critique Before Human Gate

**Data:** 2026-02-02
**Status:** ✅ Aprovado
**Tier:** T1

### Contexto
Humanos gastavam tempo revisando gerações de baixa qualidade.

### Decisão
Implementar auto-avaliação antes do Human Gate, com score de confiança e sugestões de melhoria.

### Consequências
- ✅ Filtra gerações de baixa qualidade
- ✅ Fornece sugestões de melhoria
- ✅ Reduz carga do revisor humano
- ⚠️ Adiciona etapa ao pipeline

### Implementação
- `.prompt-os/core/SELF-CRITIQUE.md`
- Score threshold: >= 70 para prosseguir
- 3+ sugestões de melhoria

---

## ADR-009: Unified Context Structure

**Data:** 2026-02-02
**Status:** ✅ Aprovado
**Tier:** T1

### Contexto
AI agents precisam de contexto estruturado e consistente para funcionar bem.

### Decisão
Implementar estrutura `.context/` padronizada baseada na RFC-UNIFIED-CONTEXT-STRUCTURE.

### Estrutura
```
.context/
├── README.md
├── ai-assistant-guide.md
├── _meta/
├── standards/
├── patterns/
├── examples/
├── workflows/
└── troubleshooting/
```

### Consequências
- ✅ Contexto organizado e navegável
- ✅ Tier system integrado
- ✅ Compatível com múltiplos agents

### Implementação
- Baseado em RFC docs/templates/RFC-UNIFIED-CONTEXT-STRUCTURE.md
- Nível Completo implementado

---

## ADR-010: Learning from Rejections

**Data:** 2026-02-02
**Status:** ✅ Aprovado
**Tier:** T1

### Contexto
Rejeições humanas contêm feedback valioso que pode melhorar gerações futuras.

### Decisão
Registrar motivos de rejeição e usar para melhorar o sistema.

### Implementação
- `.prompt-os/core/AUTO-INCREMENT.md`
- Seção "Rejection Learning Protocol"
- Registro em MEMORY.md

---

## ADR-011: Enhanced Protocol Integration (v2.1.0)

**Data:** 2026-02-03
**Status:** ✅ Aprovado
**Tier:** T1

### Contexto
A v2.0.0 introduziu a arquitetura prompt-based, mas faltava integração mais profunda entre os protocolos.

### Decisão
Integrar mais profundamente os protocolos core, especialmente o Human Gate, com os demais protocolos.

### Razões
1. **Consistência:** Garantir que todos os protocolos sejam usados juntos de forma coerente
2. **Eficiência:** Reduzir redundâncias entre protocolos
3. **Qualidade:** Melhorar a integração entre Self-Critique e Human Gate

### Consequências
- ✅ Maior integração entre protocolos
- ✅ Menos inconsistências na aplicação
- ✅ Melhor experiência de uso
- ⚠️ Requer revisão de todos os protocolos existentes

### Implementação
- Atualização do `.prompt-os/core/HUMAN-GATE.md`
- Integração com Self-Critique para mostrar scores automaticamente
- Atualização de todos os protocolos para referenciar uns aos outros

---

## Histórico de Versões

| Versão | Data | ADRs Adicionados |
|--------|------|------------------|
| 2.1.0 | 2026-02-03 | ADR-011 |
| 2.0.0 | 2026-02-02 | ADR-006 a ADR-010 |
| 1.0.0 | 2026-01-19 | ADR-001 a ADR-005 |

---

*Itzamna PromptOS v2.1.0 | Key Decisions | 2026-02-03*
