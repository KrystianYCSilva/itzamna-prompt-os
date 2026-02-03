# Common Issues & Troubleshooting - T2 (Context)

> **Tier**: T2 - Informativo. Problemas comuns e soluções para o desenvolvimento com Itzamna PromptOS.
> **Versão:** 2.1.0 | **Arquitetura:** Prompt-Based

## Problemas de Bootstrap

### 1. AI Não Segue o Sistema
**Sintoma**: AI agent não está seguindo as regras do PromptOS.

**Causa**: AI não leu o entry point ou constitution.

**Solução**:
```
1. Verificar se AI leu .prompt-os/PROMPTOS.md
2. Verificar se AI leu .prompt-os/CONSTITUTION.md
3. Instruir: "Leia .prompt-os/PROMPTOS.md e siga as instruções"
```

### 2. Entry Point Não Encontrado
**Sintoma**: AI não consegue encontrar PROMPTOS.md.

**Causa**: Caminho incorreto ou arquivo não existe.

**Solução**:
```
1. Verificar se .prompt-os/PROMPTOS.md existe
2. Usar caminho absoluto se necessário
3. Verificar permissões de leitura
```

### 3. Regras T0 Ignoradas
**Sintoma**: AI está fazendo operações sem aprovação humana.

**Causa**: AI não carregou CONSTITUTION.md corretamente.

**Solução**:
```
1. Instruir: "Leia .prompt-os/CONSTITUTION.md"
2. Reforçar: "Regras T0 são INVIOLÁVEIS"
3. Citar regra específica: "T0-HUMAN-01 exige aprovação"
```

## Problemas de Carregamento (JIT)

### 4. Contexto Excessivo
**Sintoma**: AI carregou muitas skills, contexto muito grande.

**Causa**: Não seguiu JIT-PROTOCOL.md.

**Solução**:
```
1. Instruir: "Siga .prompt-os/core/JIT-PROTOCOL.md"
2. Lembrar: "Carregue apenas 2-5 skills relevantes"
3. Target: 10-16KB por tarefa
```

### 5. Skills Não Encontradas
**Sintoma**: AI não encontra skill relevante.

**Causa**: Skill não existe ou busca incorreta.

**Solução**:
```
1. Verificar skills/INDEX.md
2. Buscar por categoria em skills/{categoria}/
3. Se não existir, criar nova skill (workflow)
```

### 6. Protocolo Não Carregado
**Sintoma**: AI não está seguindo protocolo esperado.

**Causa**: Protocolo não foi carregado.

**Solução**:
```
1. Listar protocolos: .prompt-os/core/
2. Instruir: "Carregue e siga [PROTOCOLO].md"
3. Verificar se protocolo está completo
```

## Problemas de Human Gate

### 7. Human Gate Ignorado
**Sintoma**: AI fez operação sem pedir aprovação.

**Causa**: Violação de T0-HUMAN-01.

**Solução**:
```
1. PARAR operação imediatamente
2. Reforçar: "Regra T0-HUMAN-01: TODA operação L2/L3 requer aprovação"
3. Instruir AI a sempre mostrar preview primeiro
```

### 8. Preview Incompleto
**Sintoma**: Preview não mostra informações suficientes.

**Causa**: Self-Critique não executado ou incompleto.

**Solução**:
```
1. Verificar se SELF-CRITIQUE.md foi seguido
2. Preview deve incluir:
   - Confidence Score
   - Summary
   - Sources
   - Opções: approve | view | edit | reject
```

## Problemas de Geração

### 9. Skill Muito Grande
**Sintoma**: Skill gerada excede 1400 tokens.

**Causa**: Conteúdo excessivo.

**Solução**:
```
1. Dividir em múltiplas skills menores
2. Mover exemplos extensos para seção separada
3. Simplificar explicações sem perder essência
```

### 10. Self-Critique Score Baixo
**Sintoma**: Score < 70, não prossegue para Human Gate.

**Causa**: Artefato precisa de melhorias.

**Solução**:
```
1. Revisar sugestões do Self-Critique
2. Aplicar melhorias sugeridas
3. Re-executar Self-Critique
4. Iterar até score >= 70
```

### 11. Fontes Não Citadas
**Sintoma**: Skill gerada sem referências.

**Causa**: Violação de T0-SOURCE-01.

**Solução**:
```
1. Usar WEB-RESEARCH.md para pesquisa
2. Citar mínimo 2 fontes para skill técnica
3. Usar fontes Tier 1-2 (oficiais, acadêmicas)
4. NUNCA usar blogs pessoais ou redes sociais
```

## Problemas de Memória

### 12. MEMORY.md Desatualizado
**Sintoma**: MEMORY.md não reflete estado atual.

**Causa**: T0-MEMORY-01 não foi seguido.

**Solução**:
```
1. Verificar se AI atualizou MEMORY.md após última ação
2. Instruir: "Atualize MEMORY.md com a ação realizada"
3. Formato:
   - Last Updated: data
   - Recent Actions: últimas ações
```

### 13. Estado Inconsistente
**Sintoma**: MEMORY.md contradiz estado real do projeto.

**Causa**: Atualizações manuais incorretas ou AI não sincronizou.

**Solução**:
```
1. Revisar MEMORY.md manualmente
2. Corrigir inconsistências
3. Instruir AI: "Leia MEMORY.md para sincronizar estado"
```

## Problemas de Compatibilidade

### 14. Agent Não Suportado
**Sintoma**: Novo AI agent não funciona com PromptOS.

**Causa**: Agent não consegue ler Markdown ou seguir instruções.

**Solução**:
```
1. Verificar se agent lê arquivos Markdown
2. Criar bootstrap específico se necessário
3. Mínimo: apontar para .prompt-os/PROMPTOS.md
```

### 15. Comportamento Diferente Entre Agents
**Sintoma**: Claude se comporta diferente de Cursor, etc.

**Causa**: Interpretações diferentes das instruções.

**Solução**:
```
1. Verificar se todos usam mesmo CONSTITUTION.md
2. Usar instruções mais explícitas se necessário
3. Testar em múltiplos agents antes de commit
```

## Problemas de Tier System

### 16. Conflito de Regras
**Sintoma**: Duas regras parecem conflitar.

**Causa**: Regras de tiers diferentes.

**Solução**:
```
1. Identificar tier de cada regra
2. Aplicar precedência: T0 > T1 > T2 > T3
3. T0 SEMPRE vence
4. Citar regra vencedora na explicação
```

### 17. Regra T0 Não Reconhecida
**Sintoma**: AI não reconhece regra como T0.

**Causa**: AI não carregou CONSTITUTION.md ou architectural-rules.md.

**Solução**:
```
1. Instruir: "Leia .context/standards/architectural-rules.md"
2. Reforçar: "Regras ARCH-XXX são T0 ABSOLUTO"
```

## Problemas de Integração de Protocolos (v2.1.0)

### 18. Protocolos Não Integrados
**Sintoma**: Protocolos não se referenciam mutuamente como esperado.

**Causa**: Implementação incompleta da ADR-011.

**Solução**:
```
1. Verificar se Self-Critique referencia Human Gate
2. Verificar se Human Gate exibe resultados do Self-Critique
3. Verificar integração entre JIT Protocol e Input Classifier
4. Confirmar que Knowledge Base referencia outras skills
```

### 19. Informações do Self-Critique Não Exibidas
**Sintoma**: Human Gate não mostra score e sugestões do Self-Critique.

**Causa**: Falta de integração entre os protocolos.

**Solução**:
```
1. Verificar se Self-Critique gera saída formatada correta
2. Verificar se Human Gate lê e exibe essas informações
3. Confirmar que ambos protocolos seguem formato padronizado
```

## Diagnóstico Rápido

### Checklist de Verificação

```
□ AI leu PROMPTOS.md?
□ AI leu CONSTITUTION.md?
□ AI leu MEMORY.md?
□ JIT-PROTOCOL.md está sendo seguido?
□ Human Gate está funcionando?
□ Self-Critique está sendo executado?
□ MEMORY.md está sendo atualizado?
□ Protocolos estão integrados (v2.1.0)?
```

### Comandos de Reset

```
Para "resetar" o AI para estado correto:

1. "Por favor, leia .prompt-os/PROMPTOS.md e siga o protocolo de inicialização"

2. "Leia .prompt-os/CONSTITUTION.md e liste as regras T0"

3. "Verifique MEMORY.md para entender o estado atual"
```

## Melhores Práticas (Prevenção)

### Antes de Cada Sessão
1. Verificar que AI leu PROMPTOS.md
2. Confirmar que AI conhece regras T0
3. Verificar MEMORY.md está atual

### Durante o Trabalho
1. Sempre mostrar preview antes de persistir
2. Executar Self-Critique antes do Human Gate
3. Atualizar MEMORY.md após cada ação significativa
4. Verificar integração entre protocolos (v2.1.0)

### Ao Encontrar Problemas
1. Identificar qual protocolo/regra foi violado
2. Citar regra específica (ID)
3. Instruir AI a seguir o protocolo correto
4. Verificar integração com outros protocolos

---

*Itzamna PromptOS v2.1.0 | Troubleshooting | T2 Context | 2026-02-03*