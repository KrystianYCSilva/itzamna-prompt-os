---
name: "css-basico"
description: "Skill para fundamentos de CSS: seletores, box model, posicionamento, cores, tipografia e boas praticas de estilizacao."
version: "1.0.0"
domain: "frontend"
level: "L1"
tags:
  - "frontend"
  - "css"
  - "styling"
  - "fundamentals"
triggers:
  - "css basico"
  - "estilizar elemento"
  - "seletores css"
  - "box model"
  - "posicionamento css"
dependencies: []
author: "promptos-brain"
created: "2025-01-06"
status: "approved"
sources:
  - url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
    type: "official_docs"
  - url: "https://web.dev/learn/css/"
    type: "tutorial"
---

# CSS Basico

## Visao Geral

Esta skill cobre os fundamentos essenciais de CSS (Cascading Style Sheets), a linguagem que controla a apresentacao visual de documentos HTML. CSS permite separar conteudo (HTML) de apresentacao (estilos), tornando o codigo mais organizado e mantivel.

Use esta skill quando precisar estilizar elementos HTML, entender como seletores funcionam, trabalhar com o box model, ou aplicar posicionamento basico. E o ponto de partida para qualquer trabalho de frontend.

O problema que esta skill resolve e a falta de padronizacao visual em paginas web e a dificuldade de manter estilos consistentes sem conhecer os fundamentos.

**Contexto de Uso:**
- Estilizar elementos HTML com cores, fontes e espacamentos
- Entender especificidade e cascata de estilos
- Aplicar layouts basicos com posicionamento e display
- Criar estilos responsivos fundamentais

---

## Instrucoes

### Ao receber uma tarefa relacionada a CSS basico:

1. **Identifique** o elemento ou elementos a serem estilizados
2. **Escolha** o seletor mais apropriado (classe, ID, elemento, atributo)
3. **Aplique** as propriedades seguindo as Guidelines abaixo
4. **Teste** em diferentes navegadores se necessario
5. **Valide** usando ferramentas de desenvolvimento do navegador

---

## Guidelines (SEMPRE)

1. **Use classes para estilizacao reutilizavel** - Classes (`.nome-classe`) sao reutilizaveis e tem especificidade moderada. Evite IDs para estilos pois tem especificidade muito alta e nao sao reutilizaveis.

2. **Entenda o Box Model** - Todo elemento e uma caixa com: content, padding, border, margin. Use `box-sizing: border-box` para que padding e border sejam incluidos na largura/altura declarada.

3. **Prefira unidades relativas** - Use `rem` para fontes (relativo ao root), `em` para espacamentos locais, `%` ou `vw/vh` para dimensoes fluidas. Reserve `px` para bordas e detalhes pequenos.

4. **Siga a ordem logica de propriedades** - Agrupe propriedades por: posicionamento, box model, tipografia, visual, misc. Isso melhora legibilidade.

5. **Use variaveis CSS para valores reutilizaveis** - `--cor-primaria: #007bff;` permite centralizar valores e facilita temas/manutencao.

6. **Respeite a cascata e especificidade** - Entenda que estilos mais especificos sobrescrevem menos especificos: inline > ID > classe > elemento.

---

## Constraints (NUNCA)

1. **NUNCA** use `!important` como primeira solucao - Isso quebra a cascata natural. Refatore seletores para aumentar especificidade corretamente.

2. **NUNCA** use IDs para estilizacao - IDs tem especificidade muito alta e nao sao reutilizaveis. Reserve para JavaScript e ancora de links.

3. **NUNCA** use estilos inline no HTML** - Mantenha estilos em arquivos CSS separados para manter separacao de conceitos.

4. **NUNCA** use nomes de classes baseados em aparencia - `.texto-vermelho` quebra quando a cor muda. Use `.texto-erro` ou `.texto-destaque`.

---

## Exemplos

### Exemplo 1: Seletores Basicos

**Cenario:** Estilizar diferentes elementos usando seletores apropriados.

**Input:**
```html
<article class="card">
  <h2 class="card-title">Titulo</h2>
  <p class="card-body">Conteudo do card</p>
  <a href="#" class="card-link">Saiba mais</a>
</article>
```

**Output esperado:**
```css
/* Seletor de classe - recomendado */
.card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Seletor descendente */
.card .card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
}

/* Seletor de classe simples */
.card-body {
  color: #666;
  line-height: 1.6;
}

/* Pseudo-classes para estados */
.card-link {
  color: #007bff;
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}
```

**Explicacao:** Usamos classes para todos os estilos, garantindo reutilizabilidade. Pseudo-classes (`:hover`) adicionam interatividade. A especificidade e mantida baixa e consistente.

---

### Exemplo 2: Box Model e Espacamento

**Cenario:** Aplicar espacamentos corretos usando o box model.

**Input:**
```html
<div class="container">
  <div class="box">Caixa 1</div>
  <div class="box">Caixa 2</div>
</div>
```

**Output esperado:**
```css
/* Reset do box-sizing - aplicar globalmente */
*, *::before, *::after {
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;        /* Centraliza horizontalmente */
  padding: 0 1rem;       /* Espacamento interno lateral */
}

.box {
  /* Box model */
  width: 100%;
  padding: 1rem;         /* Espacamento interno */
  margin-bottom: 1rem;   /* Espacamento externo */
  border: 1px solid #ddd;
  
  /* Visual */
  background-color: #f5f5f5;
  border-radius: 4px;
}

/* Remove margin do ultimo elemento */
.box:last-child {
  margin-bottom: 0;
}
```

**Explicacao:** `box-sizing: border-box` garante que padding e border nao aumentem a largura total. Usamos `margin` para espacamento entre elementos e `padding` para espacamento interno.

---

### Exemplo 3: Tipografia Basica

**Cenario:** Configurar tipografia consistente para um site.

**Output esperado:**
```css
:root {
  /* Variaveis CSS para tipografia */
  --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: "Fira Code", "Consolas", monospace;
  
  --font-size-base: 1rem;      /* 16px padrao */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-lg: 1.25rem;     /* 20px */
  --font-size-xl: 1.5rem;      /* 24px */
  
  --line-height-base: 1.6;
  --line-height-heading: 1.2;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  line-height: var(--line-height-heading);
  margin-top: 0;
  margin-bottom: 0.5em;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }

code, pre {
  font-family: var(--font-family-mono);
  font-size: 0.9em;
}
```

**Explicacao:** Usamos variaveis CSS para centralizar valores tipograficos. A font stack inclui fallbacks para diferentes sistemas operacionais. Unidades `rem` garantem escalabilidade.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| Elemento nao recebe estilo | Verifique especificidade - outro seletor pode estar sobrescrevendo |
| Margem colapsando | Margins verticais adjacentes colapsam; use padding ou flexbox/grid |
| Elemento nao respeita width | Verifique se e inline - aplique `display: block` ou `inline-block` |
| Hover nao funciona em mobile | Nao dependa apenas de hover; forneca indicadores visuais estaticos |
| Fonte nao carrega | Sempre forneca font-stack com fallbacks genericos |

---

## Referencias

1. https://developer.mozilla.org/en-US/docs/Web/CSS (official_docs)
2. https://web.dev/learn/css/ (tutorial)
3. https://cssreference.io/ (visual_reference)
4. https://specificity.keegan.st/ (specificity_calculator)

---

## Notas de Implementacao

> Esta skill cobre CSS nivel basico (L1). Para layouts avancados com Grid, veja a skill `css-grid-layout-avancado`.
> Para Flexbox, uma skill dedicada sera criada futuramente.
