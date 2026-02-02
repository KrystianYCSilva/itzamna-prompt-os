---
name: "xslt"
description: "Skill para transformacoes XSLT: converter XML em outros formatos, templates, xpath expressions e boas praticas."
version: "1.0.0"
domain: "markup"
level: "L2"
tags:
  - "markup"
  - "xml"
  - "xslt"
  - "transformation"
triggers:
  - "xslt"
  - "transformar xml"
  - "xml to html"
  - "xsl template"
  - "xpath"
dependencies:
  - "xml"
author: "promptos-brain"
created: "2025-01-06"
status: "approved"
sources:
  - url: "https://developer.mozilla.org/en-US/docs/Web/XSLT"
    type: "official_docs"
  - url: "https://www.w3.org/TR/xslt-30/"
    type: "specification"
---

# XSLT (Extensible Stylesheet Language Transformations)

## Visao Geral

Esta skill cobre XSLT, uma linguagem para transformar documentos XML em outros formatos (HTML, texto, XML diferente). XSLT usa XPath para navegar no documento XML e templates para definir como cada elemento deve ser transformado.

Use esta skill quando precisar converter XML em HTML para exibicao, transformar formatos de dados XML, gerar relatorios a partir de dados XML, ou processar feeds RSS/Atom.

O problema que esta skill resolve e a complexidade de transformar estruturas XML em outputs utilizaveis de forma declarativa e mantivel.

**Contexto de Uso:**
- Converter XML de dados em paginas HTML
- Transformar entre diferentes schemas XML
- Gerar documentacao a partir de XML
- Processar e formatar feeds de dados

---

## Instrucoes

### Ao receber uma tarefa relacionada a XSLT:

1. **Analise** a estrutura do XML de entrada
2. **Identifique** o formato de saida desejado (HTML, texto, XML)
3. **Defina** templates para cada tipo de elemento
4. **Use** XPath apropriado para selecionar nos
5. **Teste** com diferentes inputs para validar transformacao

---

## Guidelines (SEMPRE)

1. **Declare o namespace XSLT corretamente** - Use `xmlns:xsl="http://www.w3.org/1999/XSL/Transform"` e especifique a versao (1.0, 2.0, ou 3.0).

2. **Use templates nomeados para reutilizacao** - `<xsl:template name="formatDate">` permite reutilizar logica comum.

3. **Prefira `xsl:apply-templates` sobre loops explicitos** - O modelo push (apply-templates) e mais idiomatico que loops `for-each` em muitos casos.

4. **Especifique o metodo de output** - Use `<xsl:output method="html"/>` ou `method="xml"` ou `method="text"` conforme necessario.

5. **Use modes para processar o mesmo no de formas diferentes** - `<xsl:template match="item" mode="summary">` vs `mode="detail"`.

6. **Organize XPath do mais especifico para o mais generico** - Templates mais especificos tem prioridade sobre genericos.

---

## Constraints (NUNCA)

1. **NUNCA** misture logica de negocio complexa em XSLT - XSLT e para transformacao, nao para processamento de dados complexo.

2. **NUNCA** use `disable-output-escaping` sem necessidade real - Isso pode introduzir vulnerabilidades XSS e quebrar XML bem-formado.

3. **NUNCA** ignore namespaces do XML fonte - Declare e use prefixos de namespace corretamente nas expressoes XPath.

4. **NUNCA** dependa de ordem de processamento entre templates - A ordem de execucao de templates nao e garantida.

---

## Exemplos

### Exemplo 1: Transformar XML em HTML

**Cenario:** Converter lista de produtos XML em tabela HTML.

**Input XML:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product id="1">
    <name>Laptop</name>
    <price currency="USD">999.99</price>
    <stock>50</stock>
  </product>
  <product id="2">
    <name>Mouse</name>
    <price currency="USD">29.99</price>
    <stock>200</stock>
  </product>
</products>
```

**XSLT:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  
  <!-- Template principal -->
  <xsl:template match="/products">
    <html>
      <head>
        <title>Product Catalog</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Product Catalog</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
          <xsl:apply-templates select="product"/>
        </table>
      </body>
    </html>
  </xsl:template>
  
  <!-- Template para cada produto -->
  <xsl:template match="product">
    <tr>
      <td><xsl:value-of select="@id"/></td>
      <td><xsl:value-of select="name"/></td>
      <td>
        <xsl:value-of select="price/@currency"/>
        <xsl:text> </xsl:text>
        <xsl:value-of select="price"/>
      </td>
      <td><xsl:value-of select="stock"/></td>
    </tr>
  </xsl:template>
  
</xsl:stylesheet>
```

**Explicacao:** O template raiz cria a estrutura HTML e usa `apply-templates` para processar cada produto. O template de produto gera uma linha de tabela. XPath acessa atributos (`@id`) e elementos filhos.

---

### Exemplo 2: Templates com Modes

**Cenario:** Gerar diferentes visualizacoes do mesmo dado.

**XSLT:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/products">
    <html>
      <body>
        <!-- Sumario -->
        <h2>Summary</h2>
        <ul>
          <xsl:apply-templates select="product" mode="summary"/>
        </ul>
        
        <!-- Detalhes -->
        <h2>Details</h2>
        <xsl:apply-templates select="product" mode="detail"/>
      </body>
    </html>
  </xsl:template>
  
  <!-- Mode: summary - versao compacta -->
  <xsl:template match="product" mode="summary">
    <li>
      <xsl:value-of select="name"/> - 
      <xsl:value-of select="price"/>
    </li>
  </xsl:template>
  
  <!-- Mode: detail - versao completa -->
  <xsl:template match="product" mode="detail">
    <div class="product-card">
      <h3><xsl:value-of select="name"/></h3>
      <p>ID: <xsl:value-of select="@id"/></p>
      <p>Price: <xsl:value-of select="price/@currency"/>
         <xsl:value-of select="price"/></p>
      <p>In Stock: <xsl:value-of select="stock"/> units</p>
    </div>
  </xsl:template>
  
</xsl:stylesheet>
```

**Explicacao:** Modes permitem processar o mesmo elemento de formas diferentes. `mode="summary"` gera lista simples, `mode="detail"` gera cards completos.

---

### Exemplo 3: Templates Nomeados e Variaveis

**Cenario:** Reutilizar logica de formatacao.

**XSLT:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" indent="yes"/>
  
  <!-- Variavel global -->
  <xsl:variable name="currency-symbol">$</xsl:variable>
  
  <!-- Template nomeado reutilizavel -->
  <xsl:template name="format-price">
    <xsl:param name="amount"/>
    <xsl:param name="currency" select="$currency-symbol"/>
    <span class="price">
      <xsl:value-of select="$currency"/>
      <xsl:value-of select="format-number($amount, '#,##0.00')"/>
    </span>
  </xsl:template>
  
  <xsl:template match="/products">
    <div class="products">
      <xsl:for-each select="product">
        <div class="product">
          <xsl:value-of select="name"/>: 
          <xsl:call-template name="format-price">
            <xsl:with-param name="amount" select="price"/>
          </xsl:call-template>
        </div>
      </xsl:for-each>
    </div>
  </xsl:template>
  
</xsl:stylesheet>
```

**Explicacao:** `xsl:variable` define valores reutilizaveis. Templates nomeados (`name="format-price"`) sao chamados com `call-template` e recebem parametros via `with-param`.

---

## Edge Cases

| Situacao | Como Tratar |
|----------|-------------|
| XML com namespaces | Declare o namespace e use prefixo no XPath: `xmlns:ns="..."` e `ns:element` |
| Elemento nao encontrado | Use `xsl:if` ou `xsl:choose` para verificar existencia antes de processar |
| Ordenar resultados | Use `<xsl:sort select="campo"/>` dentro de `for-each` ou `apply-templates` |
| Condicional complexo | Use `<xsl:choose>` com multiplos `<xsl:when>` e `<xsl:otherwise>` |
| Preservar espacos | Use `xsl:preserve-space` ou `xml:space="preserve"` |

---

## Referencias

1. https://developer.mozilla.org/en-US/docs/Web/XSLT (official_docs)
2. https://www.w3.org/TR/xslt-30/ (specification)
3. https://www.w3schools.com/xml/xsl_intro.asp (tutorial)
4. https://xsltfiddle.liberty-development.net/ (online_tool)

---

## Notas de Implementacao

> XSLT 1.0 e suportado nativamente em navegadores. XSLT 2.0+ requer processadores como Saxon.
> Para XML basico, veja a skill `xml`. Para XPath detalhado, uma skill dedicada pode ser criada.
