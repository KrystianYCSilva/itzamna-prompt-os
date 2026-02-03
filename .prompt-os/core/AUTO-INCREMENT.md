# AUTO-INCREMENT - Evolucao Autonoma do Sistema

> **Instrucoes para voce (agente de IA) evoluir o PromptOS ao longo do tempo.**  
> O sistema deve detectar lacunas, aprender com feedback e sugerir melhorias.

---

## O QUE E AUTO-INCREMENTACAO?

Auto-incrementacao significa que o PromptOS **melhora sozinho** com o uso:

1. **Detecta lacunas** quando algo falta
2. **Aprende com rejeicoes** do humano
3. **Sugere novas skills** proativamente
4. **Propoe melhorias** em skills existentes

**IMPORTANTE:** Voce nunca cria ou modifica nada automaticamente.  
Sempre passa pelo HUMAN GATE para aprovacao.

---

## QUANDO APLICAR

Aplique auto-incrementacao quando:

1. Usuario pede algo que NAO existe no sistema
2. Usuario rejeita algo que voce gerou
3. Voce identifica padrao de uso repetitivo
4. Voce nota que uma skill esta incompleta

---

## PROTOCOLO DE DETECCAO DE LACUNAS

**SEQUENCIA DE PROTOCOLOS:** Este protocolo e o **PRIMEIRO** na sequencia obrigatoria:
```
1. AUTO-INCREMENT (este protocolo) → Detectar gaps, verificar similaridade
2. GENERATE → Criar artefato
3. SELF-CRITIQUE → Avaliar qualidade (veja .prompt-os/core/SELF-CRITIQUE.md)
4. HUMAN-GATE → Apresentar ao humano (veja .prompt-os/core/HUMAN-GATE.md)
5. COMMIT → Persistir (somente apos aprovacao)
```

### Fase 1: Detectar Gap

Quando o usuario pede algo, verifique:

```
1. Existe skill para isso em .prompt-os/skills/INDEX.md?
2. Existe persona relacionada em .prompt-os/personas/?
3. Existe conhecimento em docs/?

SE NAO EXISTE:
  -> Registre como GAP
  -> Informe ao usuario
  -> Sugira criacao

SE TOPICO MUITO VAGO:
  -> Pergunte clarificacao ANTES de registrar gap
  -> Exemplo: "Qual tecnologia de streaming voce quer usar?" 
  -> Aguarde resposta especifica para sugerir nome de skill
```

### Fase 2: Informar ao Usuario

Quando detectar gap, diga:

```
"Nao encontrei uma skill para '{topico}' no sistema.

Opcoes:
1. Posso criar uma skill para isso agora
2. Posso ajudar sem skill especifica (qualidade pode variar)
3. Voce pode me indicar onde encontrar informacao

O que prefere?"
```

### Fase 3: Registrar Gap na Memoria do Agente

Se o usuario NAO quiser criar skill agora, registre no seu arquivo de memoria (`memory/{agente}-memory.md`):

**IMPORTANTE**: Cada agente registra em seu proprio arquivo (ex: `memory/opencode-memory.md`, `memory/itzamna-memory.md`) para evitar conflitos de escrita concorrente.

```markdown
## Gaps Detectados

| Data | Request | Skill Sugerida | Status |
|------|---------|----------------|--------|
| 2026-02-02 | "Como usar Kafka?" | kafka-basics | pending |
| 2026-02-01 | "Deploy com ArgoCD" | argocd-deploy | pending |
```

**Atualizacao de Status**: Sempre atualize o status do gap conforme acao do usuario:
- `pending` → `created` quando skill for criada e adicionada ao INDEX.md
- `pending` → `deferred` quando usuario escolher opcao 2 ou 3 (proceder sem skill)
- `pending` → `rejected` quando usuario explicitamente recusar criacao

---

## PROTOCOLO DE APRENDIZADO COM REJEICOES

### Quando Ocorre Rejeicao

Se o humano rejeitar algo que voce gerou:

1. **SEMPRE pergunte o motivo** (se nao foi dado)
2. **Registre em `memory/{agente}-memory.md`** para aprendizado
3. **Ajuste sua abordagem** na proxima tentativa

### Categorias de Rejeicao

Classifique o motivo da rejeicao:

| Categoria | Palavras-Chave | O Que Aprender |
|-----------|----------------|----------------|
| **Exemplos** | "exemplo errado", "nao funciona" | Validar exemplos melhor |
| **Especificidade** | "generico", "vago", "superficial" | Adicionar mais detalhes |
| **Clareza** | "confuso", "nao entendi" | Simplificar linguagem |
| **Completude** | "falta", "incompleto" | Verificar todas secoes |
| **Relevancia** | "nao aplica", "fora do escopo" | Melhorar classificacao |
| **Outros** | (nenhum match acima) | Revisar manualmente |

### Registro de Rejeicao

Adicione ao seu arquivo de memoria (`memory/{agente}-memory.md`):

```markdown
## Log de Rejeicoes

| Data | Tipo | Item | Motivo | Categoria | Aprendizado |
|------|------|------|--------|-----------|-------------|
| 2026-02-02 | skill | redis-cache | "Exemplos incorretos" | exemplos | Testar comandos |
| 2026-02-01 | skill | graphql-api | "Muito generico" | especificidade | Adicionar casos reais |
```

### Aplicar Aprendizado

Na proxima geracao:

1. Consulte o log de rejeicoes
2. Identifique se ha padroes (mesma categoria repetida)
3. Aplique correcoes proativamente

```
SE categoria "exemplos" aparece em >30% das rejeicoes:
  -> Na proxima skill, enfatize: "Verifiquei que os exemplos funcionam"
  -> Adicione nota: "Exemplos testados em {ambiente}"
```

---

## PROTOCOLO DE SUGESTAO PROATIVA

### Quando Sugerir Novas Skills

Sugira nova skill quando:

1. **Mesmo gap aparece 2+ vezes** no seu `memory/{agente}-memory.md`
2. **Usuario menciona tecnologia** que nao temos skill
3. **Skill existente esta obsoleta** (>2 anos sem atualizacao)

### Como Sugerir

```
"Percebi que voce tem perguntado sobre '{topico}' algumas vezes.

Atualmente, nao temos uma skill dedicada para isso.

Gostaria que eu criasse uma skill '{topico}-basics'?
Isso ajudaria em futuras interacoes sobre o tema.

[Sim, criar skill] [Nao, obrigado] [Talvez depois]"
```

### Sugestoes de Melhoria em Skills Existentes

Se perceber que skill existente precisa de atualizacao:

```
"Ao usar a skill '{nome}', notei que:

- Secao X pode estar desatualizada
- Exemplo Y nao cobre caso Z
- Falta informacao sobre W

Gostaria que eu atualizasse esta skill?

[Sim, atualizar] [Nao agora] [Me mostre as mudancas primeiro]"
```

**Multiplas Rejeicoes**: Se a mesma skill foi rejeitada 2+ vezes (verifique `Log de Rejeicoes` no `memory/{agente}-memory.md`), mencione o historico:

> "Esta skill foi rejeitada {X} vezes anteriormente por motivos diferentes. Isso indica que precisa de revisao mais profunda."

---

## RELATORIO DE EVOLUCAO

### Agregacao Cross-Agent

**IMPORTANTE**: Relatorios de evolucao agregam dados de TODOS os agentes do sistema:

1. **Leia todos os arquivos de memoria**: `memory/opencode-memory.md`, `memory/itzamna-memory.md`, `memory/speckit-memory.md`, etc.
2. **Agregue estatisticas**: Conte gaps, rejeicoes e padroes em TODOS os arquivos
3. **Consulte estatisticas globais**: Root `MEMORY.md` para metricas compartilhadas
4. **Gere relatorio unificado**: Visao completa da evolucao do sistema

Isto permite insights cross-agent (ex: "opencode detecta gaps de infraestrutura, itzamna detecta gaps de documentacao").

### O Que Incluir

Periodicamente (quando solicitado), gere relatorio:

```markdown
## Relatorio de Evolucao do PromptOS

### Periodo: {mes/ano}

### Resumo
| Metrica | Valor |
|---------|-------|
| Skills criadas | {n} |
| Skills atualizadas | {n} |
| Gaps detectados | {n} |
| Gaps resolvidos | {n} |
| Taxa de aprovacao | {%} |

### Top 3 Gaps Mais Frequentes
1. {gap1} - {vezes} ocorrencias
2. {gap2} - {vezes} ocorrencias
3. {gap3} - {vezes} ocorrencias

### Padroes de Rejeicao
- {categoria1}: {%} das rejeicoes
- {categoria2}: {%} das rejeicoes

### Sugestoes de Acao
1. Criar skill para {gap1}
2. Melhorar exemplos nas skills de {dominio}
3. Atualizar skills com mais de {n} meses

---
*Gerado automaticamente pelo PromptOS*
```

---

## CHECKLIST DE AUTO-INCREMENTACAO

### Ao Receber Novo Request

```
[ ] Existe skill para isso?
    -> NAO: Informar gap, sugerir criacao
[ ] Existe gap similar no historico?
    -> SIM: Considerar criacao mais fortemente
[ ] Houve rejeicoes recentes relacionadas?
    -> SIM: Aplicar aprendizado
```

### Apos Rejeicao

```
[ ] Perguntar motivo (se nao dado)
[ ] Classificar categoria
[ ] Registrar em memory/{agente}-memory.md
[ ] Identificar se e padrao recorrente
[ ] Ajustar proxima tentativa
```

### Periodicamente

```
[ ] Revisar gaps pendentes
[ ] Sugerir criacao dos mais frequentes
[ ] Identificar skills desatualizadas
[ ] Propor atualizacoes
```

---

## INTEGRACAO COM OUTROS PROTOCOLOS

### Com SELF-CRITIQUE.md

Antes de entregar qualquer geracao:
1. Aplique self-critique
2. Se score < 60, mencione e ofereca melhorias
3. Registre score para analise de padroes

### Com INPUT-CLASSIFIER.md

Ao classificar input:
1. Verifique se skill necessaria existe
2. Se nao, aplique protocolo de gap
3. Registre para analise futura

### Com JIT-PROTOCOL.md

Ao carregar skills:
1. Verifique se ha versoes mais recentes
2. Se skill foi criada ha muito tempo, sugira revisao
3. Priorize skills com alta taxa de aprovacao

---

## MEMORIA DE APRENDIZADO

### O Que Lembrar

**Arquitetura de Memoria Distribuida:**
- Cada agente registra em seu proprio arquivo: `memory/{agente}-memory.md` (ex: `opencode-memory.md`, `itzamna-memory.md`)
- Root `MEMORY.md` contem apenas estatisticas globais agregadas
- Isto evita conflitos de escrita concorrente entre diferentes agentes

Mantenha em mente (ou consulte seu arquivo de memoria):

1. **Gaps frequentes** - O que usuarios pedem que nao temos
2. **Padroes de rejeicao** - Por que coisas sao rejeitadas
3. **Preferencias do usuario** - Como ele gosta de receber informacao
4. **Tecnologias do projeto** - Stack tech em uso

### Como Usar

```
ANTES de gerar skill:
  1. Consulte gaps para ver demanda
  2. Consulte rejeicoes para evitar erros
  3. Consulte preferencias para ajustar estilo

DEPOIS de interacao:
  1. Atualize gaps se necessario
  2. Atualize padroes se houve feedback
```

---

## EXEMPLO COMPLETO

### Cenario: Usuario Pede Skill Inexistente

```
Usuario: "Me ajuda a configurar Kafka?"

Agente (voce):
1. Busca em skills/INDEX.md: NAO ENCONTRADO
2. Busca em MEMORY.md gaps: kafka apareceu 1x antes
3. Detecta: Este e o 2o pedido sobre Kafka

Resposta:
"Nao encontrei uma skill especifica para Kafka no sistema.

Interessante: esta e a segunda vez que Kafka e mencionado aqui.

Opcoes:
1. Criar skill 'kafka-basics' agora (recomendado)
2. Ajudar sem skill especifica
3. Adicionar a lista de gaps para futuro

O que prefere?"

Usuario: "Cria a skill"

Agente:
-> Executa fluxo de geracao
-> Aplica self-critique
-> Passa pelo Human Gate
-> Registra em MEMORY.md: gap "kafka" -> resolvido
```

---

## PRINCIPIOS FUNDAMENTAIS

1. **Nunca automatize aprovacoes** - Humano sempre decide
2. **Transparencia total** - Diga o que esta fazendo e por que
3. **Aprenda com cada interacao** - Registre e consulte
4. **Sugira, nao imponha** - Ofereca opcoes
5. **Evolua gradualmente** - Pequenas melhorias constantes

---

*Fim do Auto-Increment Protocol. Aplique para evoluir o sistema continuamente.*
