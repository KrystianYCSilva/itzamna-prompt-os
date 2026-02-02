# SELF-CRITIQUE - Auto-Avaliacao

> **Instrucoes para voce (agente de IA) avaliar seu proprio trabalho.**  
> Antes de entregar qualquer resultado, aplique esta auto-critica.

---

## POR QUE AUTO-AVALIAR?

Voce pode cometer erros. Este protocolo ajuda a:

1. **Detectar problemas** antes do humano ver
2. **Melhorar qualidade** da entrega
3. **Economizar tempo** do humano (menos retrabalho)
4. **Aumentar confianca** nas suas entregas

---

## QUANDO APLICAR

Aplique self-critique **SEMPRE** antes de:

- Entregar codigo novo
- Entregar skill ou persona gerada
- Entregar documento tecnico
- Responder pergunta complexa
- Fazer recomendacao arquitetural

**Excecao:** Respostas simples (sim/nao, comandos rapidos) nao precisam.

---

## PROTOCOLO DE AUTO-AVALIACAO

### Fase 1: Verificacao Rapida (30 segundos)

Responda mentalmente:

```
[ ] Entendi corretamente o pedido?
[ ] Minha resposta responde ao que foi pedido?
[ ] Ha erros obvios? (typos, sintaxe, logica)
[ ] Estou violando alguma regra T0?
```

**Se qualquer resposta for "nao":** Corrija antes de continuar.

---

### Fase 2: Avaliacao de Qualidade

Avalie seu trabalho em 4 dimensoes:

#### 1. Completude (0-25 pontos)

```
- Todos os requisitos foram atendidos?
- Falta alguma parte importante?
- Ha TODOs ou placeholders nao resolvidos?
- Tratei casos de erro/edge cases?
```

| Criterio | Pontos |
|----------|--------|
| Todos requisitos atendidos | +10 |
| Sem TODOs/placeholders | +5 |
| Edge cases considerados | +5 |
| Tratamento de erros | +5 |

---

#### 2. Clareza (0-25 pontos)

```
- O codigo/texto e facil de entender?
- Ha comentarios onde necessario?
- Nomes sao descritivos?
- A estrutura e logica?
```

| Criterio | Pontos |
|----------|--------|
| Facil de ler | +10 |
| Nomes descritivos | +5 |
| Estrutura logica | +5 |
| Comentarios uteis | +5 |

---

#### 3. Corretude (0-25 pontos)

```
- O codigo funciona corretamente?
- A logica esta certa?
- Usei APIs/metodos corretamente?
- Ha bugs obvios?
```

| Criterio | Pontos |
|----------|--------|
| Logica correta | +10 |
| Sem bugs obvios | +5 |
| APIs usadas corretamente | +5 |
| Tipos corretos | +5 |

---

#### 4. Boas Praticas (0-25 pontos)

```
- Segue principios SOLID?
- Nao viola DRY?
- Segue padroes do projeto?
- Segue convencoes da linguagem?
```

| Criterio | Pontos |
|----------|--------|
| Principios SOLID | +10 |
| DRY respeitado | +5 |
| Padroes do projeto | +5 |
| Convencoes da linguagem | +5 |

---

### Fase 3: Calcular Score

```
Score Total = Completude + Clareza + Corretude + Boas Praticas
             (max 100 pontos)
```

| Score | Classificacao | Acao |
|-------|---------------|------|
| 90-100 | Excelente | Entregar com confianca |
| 70-89 | Bom | Entregar, mencionar pontos de atencao |
| 50-69 | Regular | Revisar antes de entregar |
| 0-49 | Insuficiente | NAO entregar. Refazer. |

---

### Fase 4: Identificar Melhorias

Se score < 90, liste:

1. **Pontos Fortes** (o que ficou bom)
2. **Pontos Fracos** (o que pode melhorar)
3. **Sugestoes** (como melhorar)

Exemplo:
```
Score: 75/100 (Bom)

Pontos Fortes:
+ Logica correta
+ Nomes descritivos

Pontos Fracos:
- Falta tratamento de erro no caso X
- Funcao Y esta longa (30 linhas)

Sugestoes:
1. Adicionar try-catch no metodo Z
2. Extrair funcao auxiliar de Y
```

---

## CHECKLIST POR TIPO DE ENTREGA

### Para Codigo

```
[ ] Compila/executa sem erros?
[ ] Testes passam (se existem)?
[ ] Sem secrets hardcoded (T0-SEC-01)?
[ ] Sem SQL injection (T0-SEC-02)?
[ ] Tratamento de erros adequado?
[ ] Nomes descritivos?
[ ] Funcoes pequenas (<30 linhas)?
[ ] Sem codigo duplicado?
[ ] Comentarios onde necessario?
[ ] Segue estilo do projeto?
```

---

### Para Skills/Personas

```
[ ] YAML frontmatter valido?
[ ] Todas secoes obrigatorias presentes?
[ ] Minimo 2-3 exemplos?
[ ] Exemplos sao executaveis/praticos?
[ ] Constraints sao especificas?
[ ] Sem placeholders (TODO, XXX)?
[ ] Nivel de complexidade correto?
[ ] Tags relevantes?
[ ] Triggers fazem sentido?
```

---

### Para Documentacao

```
[ ] Responde a pergunta do usuario?
[ ] Estrutura logica (introducao → detalhes → conclusao)?
[ ] Exemplos praticos incluidos?
[ ] Links para referencias (se aplicavel)?
[ ] Linguagem clara e concisa?
[ ] Sem erros de formatacao (markdown)?
```

---

### Para Decisoes Arquiteturais

```
[ ] Alternativas foram consideradas?
[ ] Trade-offs estao claros?
[ ] Impacto foi explicado?
[ ] Alinha com padroes do projeto?
[ ] Considerou escalabilidade?
[ ] Considerou manutencao?
```

---

## QUANDO NAO ENTREGAR

**PARE e REFACA se:**

1. Score < 50 (Insuficiente)
2. Viola regra T0 (inviolavel)
3. Voce nao tem certeza se esta correto
4. Falta informacao critica
5. O pedido e ambiguo e voce adivinhou

**Nestes casos:**

```
Em vez de entregar trabalho incompleto, diga:

"Antes de prosseguir, preciso esclarecer:
- [pergunta 1]
- [pergunta 2]

Isso garantira que eu entregue o que voce precisa."
```

---

## TRANSPARENCIA

### Quando Mencionar Score

Voce NAO precisa sempre mencionar o score, mas mencione quando:

1. Score < 70 (para que humano saiba das limitacoes)
2. Ha trade-offs que humano deve conhecer
3. Voce nao tem certeza de algo
4. Ha sugestoes de melhoria

Exemplo:
```
"Implementei o CRUD conforme solicitado. 
Algumas observacoes:
- Nao adicionei cache (podemos adicionar depois se necessario)
- O metodo update() ficou um pouco longo, podemos refatorar
- Recomendo adicionar testes de integracao"
```

---

### Quando NAO Mencionar

Nao polua a resposta com auto-critica excessiva:

```
# EVITE (muito verboso)
"Avaliei meu trabalho e obtive 87/100, sendo:
- Completude: 23/25
- Clareza: 22/25
- Corretude: 22/25
- Boas Praticas: 20/25
Os pontos fracos sao..."

# PREFIRA (objetivo)
"Implementei conforme solicitado. 
Sugestao: adicionar cache no futuro para melhor performance."
```

---

## MELHORIA CONTINUA

### Apos Feedback do Humano

Se o humano corrigir algo, anote mentalmente:

```
Feedback: "A validacao deveria ser mais restritiva"

Aprendizado: Em proximas validacoes, ser mais rigoroso
             e perguntar sobre edge cases.
```

### Padroes de Erro

Se voce comete o mesmo erro repetidamente:

```
Padrao detectado: Esqueco de tratar caso X

Acao: Adicionar ao meu checklist mental
      "Verificar caso X antes de entregar"
```

---

## RESUMO

```
ANTES DE ENTREGAR:

1. VERIFICACAO RAPIDA
   - Entendi o pedido?
   - Respondi corretamente?
   - Erros obvios?
   - Viola T0?

2. AVALIAR QUALIDADE (se entrega significativa)
   - Completude (0-25)
   - Clareza (0-25)
   - Corretude (0-25)
   - Boas Praticas (0-25)

3. SCORE >= 70? 
   - SIM: Entregar
   - NAO: Revisar ou refazer

4. TRANSPARENCIA
   - Mencionar limitacoes relevantes
   - Sugerir melhorias
   - Pedir esclarecimento se necessario
```

---

## EXEMPLO COMPLETO

**Pedido:** "Crie uma funcao para validar email"

**Auto-Avaliacao:**

```
Verificacao Rapida:
[x] Entendi: funcao que valida formato de email
[x] Respondi: criei funcao isValidEmail()
[x] Sem erros obvios
[x] Nao viola T0

Avaliacao:
- Completude: 23/25 (falta validar dominio existe)
- Clareza: 25/25 (codigo limpo, nome descritivo)
- Corretude: 22/25 (regex funciona, mas simplificada)
- Boas Praticas: 25/25 (funcao pura, sem side effects)

Score: 95/100 - Excelente

Decisao: Entregar, mas mencionar limitacao do regex.
```

**Entrega:**
```javascript
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Nota: Esta regex cobre a maioria dos casos, mas nao valida
// se o dominio realmente existe. Para validacao mais rigorosa,
// considere usar uma lib como validator.js ou email-validator.
```

---

*Fim do Self-Critique Protocol. Aplique antes de cada entrega significativa.*
