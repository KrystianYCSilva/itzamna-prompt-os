# Architectural Rules - T0 (Enforcement)

> **Tier:** T0 - ABSOLUTO. SEMPRE seguir estas regras.
> **Versão:** 2.1.0 | **Atualizado:** 2026-02-03

---

## IMPORTANTE

Regras T0 são **INVIOLÁVEIS**. Se uma ação viola qualquer regra T0:
1. **PARE** imediatamente
2. **INFORME** o usuário sobre a violação
3. **SUGIRA** alternativa que respeite a regra
4. **NÃO PROSSIGA** até resolver

---

## ARCH-001: Human-in-the-Loop Enforcement

**ID:** `T0-HUMAN-01`
**Regra:** Nenhuma operação de persistência pode ocorrer sem aprovação humana explícita.

### Operações que Requerem Aprovação

| Operação | Nível | Aprovação |
|----------|-------|-----------|
| Leitura de arquivos | L1 | Auto-aprovado |
| Formatação, lint | L1 | Auto-aprovado |
| Criação de skill | L2 | **Requer aprovação** |
| Modificação de arquivo | L2 | **Requer aprovação** |
| Criação de persona | L3 | **Requer aprovação** |
| Mudança arquitetural | L3 | **Requer aprovação + revisão** |

### Fluxo Correto

```
1. Gerar artefato (skill, código, etc.)
2. Executar Self-Critique
3. MOSTRAR preview ao usuário
4. AGUARDAR decisão: approve | view | edit | reject | cancel
5. SE aprovado: persistir
6. SE rejeitado: registrar motivo, aprender
```

### Exemplo

```javascript
// ✅ CORRETO
showPreview(artifact);
const decision = await waitForHumanApproval();
if (decision === 'approve') {
  saveToFile(artifact);
  updateMemory();
}

// ❌ PROIBIDO
saveToFile(artifact); // Nunca salvar sem aprovação!
```

---

## ARCH-002: Kernel Lightweight Constraint

**ID:** `T0-SIZE-01`
**Regra:** O kernel (AGENTS.md) deve ter menos de 5KB.

### Justificativa
Context windows de AI são limitados. Kernel leve deixa espaço para skills e contexto.

### Limites

| Componente | Limite |
|------------|--------|
| AGENTS.md | < 5KB |
| Skills individuais | < 1400 tokens |
| PROMPTOS.md | < 3KB |
| CONSTITUTION.md | < 10KB |

### Exemplo

```markdown
// ✅ CORRETO
# AGENTS.md - Itzamna PromptOS v2.1.0
> **Size:** ~4.5KB (dentro do limite)

// ❌ PROIBIDO
# AGENTS.md - Itzamna PromptOS v2.1.0
> **Size:** ~8KB (excede limite!)
// Mover conteúdo para .prompt-os/core/ ou skills/
```

---

## ARCH-003: Skill Size Limit

**ID:** `T0-SIZE-02`
**Regra:** Cada skill deve ter menos de 1400 tokens.

### Justificativa
Skills muito grandes consomem contexto desnecessariamente. Preferir composição de skills menores.

### Se Skill Exceder Limite

1. Dividir em skills menores e focadas
2. Criar skill "hub" que referencia sub-skills
3. Mover detalhes para seção de exemplos

---

## ARCH-004: Source Citation Requirement

**ID:** `T0-SOURCE-01`
**Regra:** Sempre citar fontes em skills geradas.

### Requisitos

| Tipo | Mínimo de Fontes |
|------|------------------|
| Skill técnica | 2 fontes |
| Skill conceitual | 1 fonte |
| Atualização de skill | 1 fonte nova |

### Formato de Citação

```markdown
## Referências

- [Nome da Fonte](URL) - Acessado em YYYY-MM-DD
- Documentação Oficial: https://docs.example.com/
```

### Hierarquia de Fontes

| Tier | Tipo | Uso |
|------|------|-----|
| 1 | Documentação oficial | Preferencial |
| 2 | Artigos acadêmicos | Suplementar |
| 3 | Sites consolidados (Baeldung, MDN) | Suplementar |
| X | Blogs pessoais, redes sociais | **PROIBIDO** |

---

## ARCH-005: Cross-Model Compatibility

**ID:** `T0-COMPAT-01`
**Regra:** Todas as implementações devem funcionar em diferentes modelos de IA.

### Modelos Suportados

- Claude (Anthropic)
- GPT (OpenAI)
- Gemini (Google)
- Qwen (Alibaba)
- Cursor
- GitHub Copilot

### Práticas Obrigatórias

```markdown
// ✅ CORRETO
Usar Markdown padrão
Instruções claras e estruturadas
Formatos universais (YAML, JSON)

// ❌ PROIBIDO
Usar features específicas de um modelo
Depender de API específica
Assumir capacidades não-universais
```

---

## ARCH-006: Memory State Management

**ID:** `T0-MEMORY-01`
**Regra:** Atualizar MEMORY.md após cada ação significativa.

### Ações que Requerem Atualização

- Criação de skill
- Criação de persona
- Modificação estrutural
- Rejeição (registrar motivo)
- Mudança de configuração

### Formato de Atualização

```markdown
## Memória Episódica Recente

| Data | Tipo | Nome | Status |
|------|------|------|--------|
| 2026-02-03 | skill | docker | approved |
| 2026-02-03 | persona | devops-expert | approved |
```

---

## ARCH-007: Prompt-Based Architecture

**ID:** `T0-ARCH-01`
**Regra:** O core do sistema são prompts (Markdown), não código executável.

### Princípio

```
PromptOS = PROMPTS que AI agents LEEM e SEGUEM
         ≠ Código que EXECUTA

Entry Point: .prompt-os/PROMPTOS.md
Protocols: .prompt-os/core/*.md
```

### Consequências

| ✅ Permitido | ❌ Proibido |
|-------------|-------------|
| Instruções em Markdown | Código obrigatório para funcionar |
| Protocolos que AI segue | Runtime específico requerido |
| Tools opcionais | Dependências obrigatórias |

---

## ARCH-008: Entry Point Requirement

**ID:** `T0-ENTRY-01`
**Regra:** `.prompt-os/PROMPTOS.md` é o entry point obrigatório.

### Bootstrap Sequence

```
1. AI Agent → Lê .prompt-os/PROMPTOS.md
2. PROMPTOS.md → Instrui carregar CONSTITUTION.md
3. CONSTITUTION.md → Define regras T0/T1/T2
4. Protocolos → Carregados conforme necessidade (JIT)
```

---

## ARCH-009: Self-Critique Before Persist

**ID:** `T0-CRITIQUE-01`
**Regra:** Executar Self-Critique antes de qualquer operação L2/L3.

### Fluxo

```
1. Gerar artefato
2. EXECUTAR Self-Critique (SELF-CRITIQUE.md)
3. SE score < 70: Melhorar antes de continuar
4. SE score >= 70: Prosseguir para Human Gate
5. Incluir score e sugestões no preview
```

---

## ARCH-010: Tier Precedence

**ID:** `T0-TIER-01`
**Regra:** Respeitar hierarquia de tiers em conflitos.

### Hierarquia

```
T0 > T1 > T2 > T3

SE T0 conflita com qualquer tier → T0 VENCE
SE T1 conflita com T2 ou T3 → T1 VENCE
SE T2 conflita com T3 → T2 VENCE
```

### Ao Aplicar Regra

```markdown
// ✅ CORRETO
"Não posso fazer isso. Regra T0-HUMAN-01 exige aprovação."

// ❌ PROIBIDO
Ignorar regra T0 silenciosamente
```

---

## ARCH-011: Enhanced Protocol Integration

**ID:** `T0-PROTOCOL-01`
**Regra:** Todos os protocolos devem estar integrados e referenciarem-se mutuamente.

### Justificativa
Para garantir consistência e evitar redundâncias entre os protocolos do sistema.

### Implementação

- Self-Critique deve referenciar Human Gate
- Human Gate deve exibir resultados do Self-Critique
- JIT Protocol deve referenciar Input Classifier
- Knowledge Base deve referenciar outras skills

### Exemplo

```markdown
// ✅ CORRETO
## Protocolos Integrados
- Self-Critique: Avalia qualidade antes do Human Gate
- Human Gate: Apresenta resultado do Self-Critique ao usuário
```

---

## Checklist de Verificação

Antes de qualquer ação de persistência:

### T0 - Segurança
- [ ] Sem secrets hardcoded?
- [ ] Sem vulnerabilidades conhecidas?
- [ ] Dados sensíveis protegidos?

### T0 - Human Gate
- [ ] Preview mostrado ao usuário?
- [ ] Aprovação explícita recebida?
- [ ] MEMORY.md será atualizado?

### T0 - Qualidade
- [ ] Self-Critique executado?
- [ ] Score >= 70?
- [ ] Fontes citadas?

### T0 - Compatibilidade
- [ ] Funciona em múltiplos modelos?
- [ ] Sem dependências específicas?
- [ ] Markdown padrão?

### T0 - Integração
- [ ] Protocolos referenciam-se corretamente?
- [ ] Informações do Self-Critique incluídas no Human Gate?

---

## Violações

### Se Detectar Violação T0

```
1. PARE a operação atual
2. IDENTIFIQUE a regra violada (cite o ID)
3. EXPLIQUE ao usuário
4. SUGIRA alternativa compliant
5. NÃO PROSSIGA até resolver
```

### Exemplo de Resposta

```
⚠️ VIOLAÇÃO T0 DETECTADA

Regra: T0-HUMAN-01 (Human-in-the-Loop)
Problema: Tentativa de salvar arquivo sem aprovação
Ação: Operação cancelada

Sugestão: Posso mostrar o preview para você aprovar?
```

---

*Itzamna PromptOS v2.1.0 | Architectural Rules | T0 Enforcement | 2026-02-03*
