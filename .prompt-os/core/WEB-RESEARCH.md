# WEB-RESEARCH - Pesquisa na Web

> **Instrucoes para voce (agente de IA) fazer pesquisa na web.**  
> Use estas diretrizes quando precisar buscar informacao externa.

---

## QUANDO USAR PESQUISA WEB

Use quando:
1. Criar skill com informacao atualizada
2. Validar informacao potencialmente desatualizada
3. Buscar documentacao oficial de tecnologias
4. Usuario solicita explicitamente

**NAO use** para: Informacao que voce ja conhece, topicos cobertos por skills existentes, opiniao/preferencia

---

## JIT REFERENCE: Source Validation Rules

**For detailed validation scoring and tier assignment**, load:
→ `.prompt-os/core/web-research/source-validation-rules.md`

**Quick Summary:**
- **4-dimension scoring**: Authority (40%), Recency (30%), Completeness (20%), Relevance (10%)
- **Score range**: 0-100 points with tier assignment (T1-T5)
- **Validation workflow**: Score → Classify → Conflict resolution → Document
- Use this when you need formal source reliability assessment

---

## JIT REFERENCE: Citation Templates

**For detailed citation formats and selection guidelines**, load:
→ `.prompt-os/core/web-research/citation-templates.md`

**Quick Summary:**
- **3 formats**: Minimal (URL array), Standard (url+type+accessed), Detailed (full metadata)
- **Selection guideline**: Minimal for baseline skills, Detailed for research-heavy content
- **Type taxonomy**: official_docs, github_community, stackoverflow, blog_company, etc.
- Use this when citing sources in skills or protocols

---

## JIT REFERENCE: Tier System

**For detailed tier definitions and domain registry**, load:
→ `.prompt-os/core/web-research/tier-system.md`

**Quick Summary:**
- **5 tiers**: T1 (🟢 95-100) → T5 (🔴 0-40)
- **Domain patterns**: React, Kubernetes, AWS, Python, etc. with official URLs
- **Conflict resolution**: Score-based precedence over domain patterns
- Use this to quickly classify source reliability

**Quick Tier Reference:**
- **T1 (🟢)**: Official docs (kubernetes.io, reactjs.org, nodejs.org)
- **T2 (🔵)**: Official orgs (CNCF, W3C, OWASP), official GitHub repos
- **T3 (🟡)**: Popular GitHub (>1000 stars), accepted Stack Overflow answers
- **T4 (🟠)**: Recognized tech blogs, recent tutorials
- **T5 (🔴)**: Outdated content, unreliable sources

---

## JIT REFERENCE: Gap Detection

**For detailed gap scenarios and AUTO-INCREMENT integration**, load:
→ `.prompt-os/core/web-research/gap-detection.md`

**Quick Summary:**
- **4 gap types**: missing_official_docs, outdated_sources, insufficient_coverage, low_reliability
- **Memory registration**: Integrated with AUTO-INCREMENT protocol
- **Human decision prompts**: Defined conversation flows for defer vs research now
- Use this when research reveals quality/coverage issues

---

## PROTOCOLO DE PESQUISA

### Fase 1: Planejar
1. Objetivo claro
2. Fontes oficiais conhecidas (use tier-system.md)
3. Nivel de profundidade necessario

### Fase 2: Executar Busca

```
ESTRATEGIA:
1. "{tecnologia} official documentation"
2. "{tecnologia} best practices {ano}"
3. "site:github.com {tecnologia} {caso}" (se necessario)
```

### Fase 3: Validar

**Quick checklist** (detailed scoring in `source-validation-rules.md`):
- [ ] Data: Ultimos 2 anos? (30 pts)
- [ ] Fonte: Oficial/reconhecida? (40 pts)
- [ ] Conteudo: Completo/relevante? (30 pts)

### Fase 4: Sintetizar

1. Priorize T1-T2 sources
2. Cross-reference multiplas fontes
3. Cite usando `citation-templates.md`
4. Indique tier + confidence level

---

## SE VOCE NAO TEM ACESSO A WEB

### Opcoes Alternativas

1. **Usar Conhecimento Base**: Informar que usou conhecimento interno + recomendar validacao em docs oficiais
2. **Pedir ao Usuario**: Sugerir URLs oficiais e aguardar informacao
3. **Marcar para Revisao**: Adicionar `status: needs_review` no frontmatter da skill

**Para gaps de pesquisa**: Use `gap-detection.md` para registrar na memoria

---

## FORMATANDO RESULTADOS

**Quick format**:
```markdown
## Pesquisa: {topico}
Fontes: {url1} (T1, 95/100), {url2} (T2, 88/100)
Descobertas: {lista-concisa}
Confianca: Alta (T1-T2 sources)
```

**Para formato detalhado**: Use `citation-templates.md` (Detailed format com metadata completo)

---

## NIVEIS DE CONFIANCA

**Quick Ref** (detalhes em `tier-system.md`):
- **Alta (✓✓✓)**: T1-T2 (official docs)
- **Media (✓✓/✓)**: T3-T4 (community/blogs)
- **Baixa (⚠)**: T5 (outdated/unreliable)

---

## CACHE DE PESQUISA

**Validade**: Conceitos (2a), Best practices (1a), APIs (6m), Security (1m)

---

## PARA GERACAO DE SKILLS

**Foco**: Docs oficiais (T1-T2) → Best practices → Exemplos → Troubleshooting

**Citacao**: Use `citation-templates.md` (minimal para baseline skills, standard/detailed para complexos)

---

## EXEMPLO

```
"Crie skill Redis caching"
→ PLANEJAR: redis.io (oficial)
→ PESQUISAR: "redis caching docs" + "redis best practices"
→ VALIDAR: redis.io/docs (T1, score 95) ✓
→ SINTETIZAR: T1 source, cache-aside pattern, TTL obrigatorio
→ GERAR SKILL com citacoes
```

---

## LIMITACOES

### Quando Informacao Nao Esta Disponivel

```
"Nao encontrei fonte confiavel (T1-T3) sobre {topico}.

Opcoes:
1. Use meu conhecimento base (marcar para revisao)
2. Me passe informacao oficial
3. Registre gap para pesquisa futura (use gap-detection.md)"
```

**Para gaps de pesquisa**: Use `gap-detection.md` para registrar em memoria via AUTO-INCREMENT

---

*Fim do Web-Research Protocol v2.1 (JIT-enabled). Para validacao detalhada, citacoes, tiers e gaps, carregue os sub-files JIT.*
