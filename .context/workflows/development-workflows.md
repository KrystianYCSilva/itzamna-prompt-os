# Development Workflows - T1 (Normative)

> **Tier**: T1 - Normativo. Siga estes fluxos de trabalho para manter consistência no desenvolvimento.
> **Versão:** 2.1.0 | **Arquitetura:** Prompt-Based

## Fluxos PromptOS v2.1.0

### 1. Workflow de Inicialização (Bootstrap)

```
AI Agent inicia sessão
    │
    ▼
1. LER .prompt-os/PROMPTOS.md
   - Entender estrutura do sistema
   - Identificar entry point
    │
    ▼
2. LER .prompt-os/CONSTITUTION.md
   - Carregar regras T0 (invioláveis)
   - Carregar regras T1/T2
    │
    ▼
3. LER MEMORY.md (se existir)
   - Entender estado atual
   - Ver últimas ações
   - Identificar próximos passos
    │
    ▼
4. LER AGENTS.md
   - Contexto do projeto
   - Tech stack
    │
    ▼
5. AGUARDAR pedido do usuário
```

### 2. Workflow de Classificação de Input

```
Usuário faz pedido
    │
    ▼
1. CLASSIFICAR (INPUT-CLASSIFIER.md)
   - Identificar workflow
   - Identificar persona necessária
   - Identificar skills relevantes
    │
    ├──► Shortcuts detectados:
    │    #new    → card_generation
    │    #impl   → code_implementation
    │    #test   → test_generation
    │    #review → code_review
    │    #bug    → bug_fixing
    │    #docs   → documentation
    │
    ▼
2. CARREGAR JIT (JIT-PROTOCOL.md)
   - Carregar persona relevante
   - Carregar 2-5 skills relevantes
   - NÃO carregar tudo!
    │
    ▼
3. EXECUTAR seguindo Constitution
```

### 3. Skill Generation Workflow

```
Pedido: "Crie uma skill de [tópico]"
    │
    ▼
PHASE 1: CLASSIFY
    - Tipo: skill
    - Domínio: identificar categoria
    - Nível: L2 (requer aprovação)
    │
    ▼
PHASE 2: RESEARCH (KNOWLEDGE-BASE.md, WEB-RESEARCH.md)
    - Buscar skills existentes similares
    - Pesquisar padrões e best practices
    - Coletar 2+ fontes confiáveis
    │
    ▼
PHASE 3: GENERATE
    - Usar template: .prompt-os/templates/SKILL.template.md
    - Preencher seções obrigatórias
    - Adicionar YAML frontmatter
    - Incluir 2+ exemplos
    │
    ▼
PHASE 4: SELF-CRITIQUE (SELF-CRITIQUE.md)
    - Avaliar completude
    - Gerar score (0-100)
    - Listar sugestões de melhoria
    - SE score < 70: iterar antes de continuar
    │
    ▼
+====================================+
|  PHASE 5: HUMAN GATE               |
|                                    |
|  "[Skill] gerada!                  |
|   Confidence: [score]/100          |
|   Summary: [resumo]                |
|   Sources: [fontes]                |
|                                    |
|   approve | view | edit | reject"  |
+====================================+
    │
    ▼
PHASE 6: COMMIT (se aprovado)
    - Salvar: skills/{categoria}/{nome}/SKILL.md
    - Atualizar: skills/INDEX.md
    - Registrar em MEMORY.md
```

### 4. Persona Creation Workflow

```
Pedido: "Crie uma persona de [especialidade]"
    │
    ▼
1. DEFINIR DOMÍNIO (PERSONA-GENERATOR.md)
   - Identificar área de especialização
   - Determinar skills compostas
    │
    ▼
2. PESQUISAR PERFIL
   - Analisar perfis de mercado
   - Identificar competências chave
    │
    ▼
3. COMBINAR SKILLS
   - Selecionar skills do INDEX.md
   - Definir prioridades
    │
    ▼
4. DOCUMENTAR
   - Usar template: .prompt-os/templates/PERSONA.template.md
   - Incluir exemplos de uso
    │
    ▼
5. SELF-CRITIQUE + HUMAN GATE
    │
    ▼
6. COMMIT (se aprovado)
   - Salvar: personas/{nome}/PERSONA.md
   - Atualizar: personas/INDEX.md
```

### 5. Protocol Development Workflow

```
Pedido: "Crie um protocolo de [comportamento]"
    │
    ▼
1. ANALISAR NECESSIDADE
   - Qual comportamento deve definir?
   - Quais protocolos existentes são similares?
    │
    ▼
2. DEFINIR ESTRUTURA
   - Trigger: quando ativar
   - Steps: passos a seguir
   - Output: resultado esperado
    │
    ▼
3. DOCUMENTAR PROTOCOLO
   - Criar em .prompt-os/core/
   - Formato: instruções claras e sequenciais
   - Incluir exemplos
    │
    ▼
4. HUMAN GATE (T0 requer aprovação)
    │
    ▼
5. INTEGRAR
   - Referenciar em PROMPTOS.md se necessário
   - Atualizar CONSTITUTION.md se afeta regras
```

## Fluxos de Código

### 6. Feature Development Workflow
```
1. ANALISAR REQUISITOS
   - Ler especificação/CARD
   - Identificar componentes afetados
   - Avaliar complexidade
   │
   ▼
2. CARREGAR CONTEXTO (JIT)
   - Skill relevantes (clean-code, api-design, etc.)
   - Persona: Software Engineer
   │
   ▼
3. DESENVOLVER
   - Seguir guidelines das skills
   - Aplicar regras T0/T1
   - Escrever testes
   │
   ▼
4. SELF-CRITIQUE
   - Avaliar qualidade do código
   - Verificar conformidade
   │
   ▼
5. HUMAN GATE
   - Mostrar preview do código
   - Aguardar aprovação
   │
   ▼
6. COMMIT
   - Salvar arquivos
   - Atualizar MEMORY.md
```

### 7. Bug Fix Workflow
```
1. REPRODUZIR
   - Entender o problema reportado
   - Identificar comportamento incorreto
    │
    ▼
2. INVESTIGAR
   - Analisar código relacionado
   - Identificar causa raiz
    │
    ▼
3. CORRIGIR
   - Implementar correção mínima
   - Manter alterações focadas
    │
    ▼
4. TESTAR
   - Verificar correção
   - Confirmar sem regressões
    │
    ▼
5. HUMAN GATE + COMMIT
```

### 8. Code Review Workflow
```
1. RECEBER código para revisão
    │
    ▼
2. CARREGAR skills relevantes
   - code-quality, testing, clean-code
    │
    ▼
3. ANALISAR
   - Verificar conformidade com T0/T1
   - Identificar problemas
   - Sugerir melhorias
    │
    ▼
4. REPORTAR
   - Lista de issues encontrados
   - Sugestões de melhoria
   - Aprovação ou rejeição
```

## Fluxos de Qualidade

### 9. Self-Critique Workflow
```
Após gerar qualquer artefato L2/L3:
    │
    ▼
1. LER .prompt-os/core/SELF-CRITIQUE.md
    │
    ▼
2. AVALIAR (checklist)
   - [ ] Todas seções obrigatórias presentes?
   - [ ] Exemplos incluídos (mínimo 2)?
   - [ ] Fontes citadas?
   - [ ] Tamanho dentro do limite?
   - [ ] Formatação correta?
    │
    ▼
3. GERAR SCORE (0-100)
   - >= 90: Excelente
   - 70-89: Bom (prosseguir)
   - < 70: Melhorar antes de continuar
    │
    ▼
4. LISTAR SUGESTÕES
   - Mínimo 3 sugestões de melhoria
    │
    ▼
5. INCLUIR no preview do Human Gate
```

### 10. Memory Update Workflow
```
Após ação significativa:
    │
    ▼
1. IDENTIFICAR tipo de ação
   - Skill criada
   - Persona criada
   - Código gerado
   - Configuração alterada
   - Rejeição (registrar motivo)
    │
    ▼
2. ATUALIZAR MEMORY.md
   - Seção: Recent Actions
   - Seção: Episodic Memory (se relevante)
   - Seção: Statistics (se aplicável)
    │
    ▼
3. ATUALIZAR Next Steps (se necessário)
```

## Spec-Kit Workflow (Funcionalidades Complexas)

### 11. Specification Workflow
```
SE esforço estimado > 5 dias OU funcionalidade crítica:
    │
    ▼
1. INICIAR ESPECIFICAÇÃO
   - Criar spec formal
   - Definir requisitos
   - Definir critérios de sucesso
    │
    ▼
2. REVISAR
   - Compartilhar com stakeholders
   - Incorporar feedback
    │
    ▼
3. APROVAR ESPECIFICAÇÃO
    │
    ▼
4. IMPLEMENTAR baseado na spec
   - Seguir especificação
   - Registrar desvios
   - Validar resultado
```

## Referência Rápida

### Shortcuts de Workflow

| Shortcut | Workflow | Persona |
|----------|----------|---------|
| `#new` | card_generation | Product Owner |
| `#impl CARD-XXX` | code_implementation | Software Engineer |
| `#test` | test_generation | QA Engineer |
| `#review` | code_review | Code Reviewer |
| `#bug` | bug_fixing | Debugger |
| `#refactor` | refactoring | Software Engineer |
| `#docs` | documentation | Technical Writer |

### Critérios de Aceitação

#### Para Skills
- [ ] Tamanho < 1400 tokens
- [ ] Frontmatter YAML válido
- [ ] Seções obrigatórias presentes
- [ ] Pelo menos 2 exemplos práticos
- [ ] Fontes citadas
- [ ] Score Self-Critique >= 70
- [ ] Aprovada no Human Gate

#### Para Personas
- [ ] Domínio de especialização definido
- [ ] Skills compostas válidas
- [ ] Exemplos de uso incluídos
- [ ] Aprovada no Human Gate

#### Para Código
- [ ] Segue guidelines das skills
- [ ] Conformidade com T0/T1
- [ ] Testes incluídos
- [ ] Aprovado no Human Gate

---

*Itzamna PromptOS v2.1.0 | Development Workflows | T1 Normative | 2026-02-03*