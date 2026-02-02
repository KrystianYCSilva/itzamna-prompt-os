---
name: "css-grid-layout-avancado"
description: "Skill para criar layouts complexos e responsivos usando CSS Grid, incluindo grid areas, auto-fit/auto-fill, e tecnicas avancadas de alinhamento."
version: "1.0.0"
domain: "frontend"
level: "L2"
tags:
  - "frontend"
  - "css"
  - "layout"
  - "responsive"
triggers:
  - "css grid layout avancado"
  - "criar layout com grid"
  - "grid areas css"
  - "layout responsivo sem media queries"
dependencies: []
author: "promptos-brain"
created: "2026-02-02"
status: "approved"
sources:
  - url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"
    type: "official_docs"
  - url: "https://css-tricks.com/snippets/css/complete-guide-grid/"
    type: "tutorial"
---

# CSS Grid Layout Avancado

## Visao Geral

Esta skill fornece diretrizes para implementar layouts complexos usando CSS Grid, o sistema de layout bidimensional mais poderoso do CSS. Diferente do Flexbox (unidimensional), o Grid permite controlar linhas e colunas simultaneamente.

Use esta skill quando precisar criar layouts de pagina completos, dashboards, galerias de imagens, ou qualquer interface que requeira alinhamento preciso em duas dimensoes. O Grid e especialmente util para layouts que precisam ser responsivos sem depender excessivamente de media queries.

O problema que esta skill resolve e a complexidade de criar layouts modernos que se adaptam a diferentes tamanhos de tela mantendo a semantica do HTML limpa e evitando hacks de posicionamento.

**Contexto de Uso:**
- Criar layouts de pagina com header, sidebar, main e footer
- Implementar galerias de cards com tamanhos variaveis
- Construir dashboards com widgets de diferentes dimensoes

---

## Instrucoes

### Ao receber uma tarefa relacionada a CSS Grid Layout avancado:

1. **Analise** o contexto e requisitos especificos
2. **Verifique** se o layout realmente precisa de Grid (layouts simples podem usar Flexbox)
3. **Aplique** os padroes documentados nas Guidelines abaixo
4. **Valide** testando em diferentes viewports (mobile, tablet, desktop)
5. **Documente** as grid areas definidas e a logica de responsividade

---

## Guidelines (SEMPRE)

1. **Use `grid-template-areas` para layouts semanticos** - Defina areas nomeadas que representam as secoes do layout (header, sidebar, main, footer). Isso torna o CSS mais legivel e facil de manter.

2. **Prefira `auto-fit` e `minmax()` para responsividade intrinseca** - Em vez de media queries, use `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` para criar grids que se adaptam automaticamente.

3. **Utilize unidades `fr` para distribuicao proporcional** - A unidade `fr` (fraction) distribui o espaco disponivel proporcionalmente, evitando calculos manuais de porcentagem.

4. **Combine `gap` em vez de margins nos items** - Use `gap` (ou `row-gap`/`column-gap`) no container para espacamento consistente entre items.

5. **Defina `min-height: 0` em items com overflow** - Por padrao, grid items nao encolhem abaixo do seu conteudo minimo. Use `min-height: 0` ou `min-width: 0` quando precisar de scroll interno.

---

## Constraints (NUNCA)

1. **NUNCA** use Grid para layouts unidimensionais simples - Para uma linha de botoes ou uma lista horizontal, Flexbox e mais apropriado e mais simples.

2. **NUNCA** defina tamanhos fixos em pixels para colunas principais - Isso quebra a responsividade. Use `fr`, `minmax()`, ou porcentagens.

3. **NUNCA** aninhe grids desnecessariamente - Cada nivel de grid adiciona complexidade. Considere se um unico grid com `grid-column: span 2` resolve o problema.

4. **NUNCA** ignore o suporte a navegadores antigos sem fallback - Verifique o caniuse.com e forneca fallback com `@supports` se necessario.

---

## Exemplos

### Exemplo 1: Layout de Pagina com Grid Areas

**Cenario:** Criar layout classico com header, sidebar, conteudo principal e footer.

**Input:**
```html
<div class="page-layout">
  <header>Header</header>
  <nav>Sidebar</nav>
  <main>Conteudo Principal</main>
  <footer>Footer</footer>
</div>
```

**Output esperado:**
```css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

header { grid-area: header; }
nav    { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }

/* Responsivo: empilha em mobile */
@media (max-width: 768px) {
  .page-layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

**Explicacao:** Usamos `grid-template-areas` para definir o layout semanticamente. A sidebar tem largura fixa (250px) enquanto o main usa `1fr` para ocupar o espaco restante. Em mobile, reorganizamos as areas para empilhar verticalmente.

---

### Exemplo 2: Galeria Responsiva com Auto-fit

**Cenario:** Criar galeria de cards que se adapta automaticamente ao tamanho da tela sem media queries.

**Input:**
```html
<div class="card-gallery">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <!-- ... mais cards -->
</div>
```

**Output esperado:**
```css
.card-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**Explicacao:** `auto-fit` cria quantas colunas couberem, enquanto `minmax(280px, 1fr)` garante que cada card tenha no minimo 280px e no maximo 1fr. O grid automaticamente ajusta o numero de colunas baseado no espaco disponivel.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| Item precisa ocupar multiplas colunas | Use `grid-column: span 2` ou `grid-column: 1 / -1` para ocupar toda a linha |
| Conteudo maior que a celula | Adicione `min-width: 0` ao item e use `overflow: auto` se necessario |
| Alinhar item no centro da celula | Use `place-self: center` no item ou `place-items: center` no container |
| Grid com numero desconhecido de items | Use `auto-fit`/`auto-fill` com `minmax()` para responsividade automatica |
| Suporte a IE11 | Use `@supports (display: grid)` e forneca fallback com Flexbox |

---

## Referencias

1. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout (official_docs)
2. https://css-tricks.com/snippets/css/complete-guide-grid/ (tutorial)
3. https://gridbyexample.com/ (examples)
4. https://cssgrid.io/ (free_course)

---

## Notas de Implementacao

> Esta skill foi preenchida manualmente apos geracao do template pelo PromptOS Brain.
> Status alterado de "draft" para "approved" apos revisao.
