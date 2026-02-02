# SPEC-003: Web Research Real

> **Status:** ✅ IMPLEMENTED (Prompt-Based)
> **Priority:** P1 (High)
> **Estimated Effort:** 5-7 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-02
> **Depends On:** SPEC-002 (Auto-Increment)

---

## ⚠️ IMPLEMENTATION NOTE (v2.0.0)

**This spec has been implemented as PROMPT INSTRUCTIONS, not JavaScript code.**

| Original Design | Actual Implementation |
|-----------------|----------------------|
| `search-adapter.js` | `.prompt-os/core/WEB-RESEARCH.md` |
| `source-parser.js` | `.prompt-os/core/WEB-RESEARCH.md` |
| `cache-manager.js` | Not needed (AI handles conversationally) |

**How it works now:** AI agents READ the prompt file and FOLLOW the instructions.
Many AI agents have built-in web search. The instructions guide HOW to research.

**Note:** The original API integrations (Tavily, Perplexity) remain as OPTIONAL
tooling for automation scenarios. They are NOT required for the core system.

**See:** `.prompt-os/core/WEB-RESEARCH.md` for the implementation.

---

## Original Spec (Historical Reference)

---

## 1. Problem Statement

### 1.1 Current State

O `brain.js` atualmente usa **mock data** para pesquisa:

```javascript
// Atual - conductResearch() retorna dados fakes
async function conductResearch(topic) {
  return {
    sources: [
      { title: 'Mock Official Docs', url: 'https://example.com' },
      { title: 'Mock Best Practices', url: 'https://example.com' }
    ],
    patterns: ['Pattern 1', 'Pattern 2'],
    bestPractices: ['Practice 1', 'Practice 2']
  };
}
```

**Limitacoes:**
- Nao busca documentacao oficial real
- Nao valida se patterns estao atualizados
- Nao extrai exemplos de repositorios
- Skills geradas podem ter informacoes desatualizadas

### 1.2 Desired State

O sistema deve realizar **pesquisa real** em fontes confiaveis:
- Documentacao oficial do framework/biblioteca
- Repositorios GitHub com stars e atividade recente
- Stack Overflow para problemas comuns
- Cache inteligente para evitar requests repetidos

### 1.3 Impact

| Sem Web Research Real | Com Web Research Real |
|----------------------|----------------------|
| Patterns genericos | Patterns da documentacao oficial |
| Exemplos inventados | Exemplos de repos reais |
| Pode estar desatualizado | Validacao de data < 2 anos |
| Sem referencias | Links para fontes oficiais |

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. **G1:** Integrar com API de busca (Tavily, Perplexity, ou SerpAPI)
2. **G2:** Parser de documentacao oficial para extrair patterns
3. **G3:** Extrator de patterns de repositorios GitHub populares
4. **G4:** Sistema de cache com TTL de 7 dias
5. **G5:** Validacao de fontes (data, stars, autoridade)

### 2.2 Non-Goals

- **NG1:** Nao implementar scraping generico (apenas APIs)
- **NG2:** Nao armazenar conteudo completo (apenas resumos)
- **NG3:** Nao usar AI para resumir nesta fase (regras)
- **NG4:** Nao suportar fontes pagas (apenas APIs free-tier)

---

## 3. Solution Design

### 3.1 Architecture

```
Web Research System
========================================

+------------------+     +------------------+     +------------------+
|   SearchAdapter  |     |   SourceParser   |     |   CacheManager   |
+------------------+     +------------------+     +------------------+
| - search()       |     | - parseGitHub()  |     | - get()          |
| - setProvider()  |     | - parseDocs()    |     | - set()          |
| - validateKey()  |     | - parseStack()   |     | - invalidate()   |
+------------------+     +------------------+     +------------------+
        |                        |                        |
        v                        v                        v
+-----------------------------------------------------------------------+
|                          ResearchEngine                                |
+-----------------------------------------------------------------------+
| - conductResearch(topic)                                               |
| - validateSources(sources)                                             |
| - rankResults(results)                                                 |
| - formatForSkill(results)                                              |
+-----------------------------------------------------------------------+
                                |
                                v
                        +---------------+
                        |   brain.js    |
                        +---------------+
```

### 3.2 Search Provider Flow

```
Usuario: "brain generate skill kubernetes-helm"
                    |
                    v
          [Extract Keywords]
           "kubernetes" + "helm"
                    |
                    v
          [Check Cache] -----> HIT? -----> [Return Cached]
                    |
                   MISS
                    |
                    v
          [Search via API]
           Tavily/Perplexity
                    |
                    v
          [Parse Results]
           - Official docs
           - GitHub repos
           - Stack Overflow
                    |
                    v
          [Validate Sources]
           - Date < 2 years
           - Stars > 100
           - Official domain
                    |
                    v
          [Rank & Format]
                    |
                    v
          [Cache Results]
           TTL: 7 days
                    |
                    v
          [Return to brain.js]
```

### 3.3 Source Validation Rules

| Tipo | Criterio | Peso |
|------|----------|------|
| **Data** | < 2 anos | 30% |
| **Autoridade** | Dominio oficial (.io, .dev, github.com) | 30% |
| **Popularidade** | Stars > 100 (GitHub) | 20% |
| **Relevancia** | Match com keywords | 20% |

### 3.4 Data Structures

```javascript
// Resultado de pesquisa
const ResearchResult = {
  query: 'kubernetes helm',
  timestamp: '2026-02-02T10:00:00Z',
  cached: false,
  
  sources: [
    {
      title: 'Helm | The Kubernetes Package Manager',
      url: 'https://helm.sh/docs/',
      type: 'official_docs',
      lastUpdated: '2026-01-15',
      reliability: 0.95,
      snippets: [
        'Helm helps you manage Kubernetes applications...',
        'Helm Charts help you define, install, and upgrade...'
      ]
    },
    {
      title: 'helm/helm: The Kubernetes Package Manager',
      url: 'https://github.com/helm/helm',
      type: 'github',
      stars: 25000,
      lastCommit: '2026-02-01',
      reliability: 0.90,
      patterns: [
        'helm install [NAME] [CHART]',
        'helm upgrade [RELEASE] [CHART]'
      ]
    }
  ],
  
  patterns: [
    {
      name: 'Chart Installation',
      code: 'helm install my-release bitnami/nginx',
      source: 'https://helm.sh/docs/intro/using_helm/'
    }
  ],
  
  bestPractices: [
    {
      practice: 'Always version your charts',
      source: 'https://helm.sh/docs/topics/chart_best_practices/'
    }
  ],
  
  commonIssues: [
    {
      issue: 'UPGRADE FAILED: cannot patch',
      solution: 'Use --force flag or delete and reinstall',
      votes: 156,
      source: 'https://stackoverflow.com/q/...'
    }
  ]
};
```

### 3.5 Cache Structure

```yaml
# .prompt-os/cache/research-cache.json
{
  "kubernetes-helm": {
    "timestamp": "2026-02-02T10:00:00Z",
    "ttl": 604800000,  # 7 days in ms
    "result": { ... }
  },
  "react-hooks": {
    "timestamp": "2026-01-25T10:00:00Z",
    "ttl": 604800000,
    "result": { ... }
  }
}
```

---

## 4. Implementation Plan

### 4.1 Task 1: Search Adapter (Day 1-2)

```javascript
// .prompt-os/scripts/search-adapter.js

const axios = require('axios');

class SearchAdapter {
  constructor(provider = 'tavily') {
    this.provider = provider;
    this.apiKey = process.env[`${provider.toUpperCase()}_API_KEY`];
  }
  
  /**
   * Busca em API de search
   * @param {string} query - Termo de busca
   * @param {object} options - Opcoes de busca
   * @returns {SearchResult[]}
   */
  async search(query, options = {}) {
    const { maxResults = 10, searchDepth = 'advanced' } = options;
    
    switch (this.provider) {
      case 'tavily':
        return this.searchTavily(query, maxResults, searchDepth);
      case 'perplexity':
        return this.searchPerplexity(query, maxResults);
      case 'serp':
        return this.searchSerp(query, maxResults);
      default:
        throw new Error(`Provider ${this.provider} not supported`);
    }
  }
  
  async searchTavily(query, maxResults, searchDepth) {
    const response = await axios.post('https://api.tavily.com/search', {
      api_key: this.apiKey,
      query: `${query} official documentation best practices`,
      search_depth: searchDepth,
      max_results: maxResults,
      include_domains: [
        'github.com',
        'stackoverflow.com',
        // Adicionar dominios oficiais dinamicamente
      ]
    });
    
    return response.data.results.map(r => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score
    }));
  }
  
  async searchPerplexity(query, maxResults) {
    const response = await axios.post('https://api.perplexity.ai/chat/completions', {
      model: 'pplx-7b-online',
      messages: [{
        role: 'user',
        content: `Find official documentation and best practices for: ${query}. Return URLs and key patterns.`
      }]
    }, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    
    // Parse response and extract URLs/patterns
    return this.parsePerplexityResponse(response.data);
  }
  
  setProvider(provider) {
    this.provider = provider;
    this.apiKey = process.env[`${provider.toUpperCase()}_API_KEY`];
  }
  
  validateApiKey() {
    if (!this.apiKey) {
      throw new Error(`API key for ${this.provider} not found. Set ${this.provider.toUpperCase()}_API_KEY env variable.`);
    }
    return true;
  }
}

module.exports = { SearchAdapter };
```

### 4.2 Task 2: Source Parser (Day 2-3)

```javascript
// .prompt-os/scripts/source-parser.js

const axios = require('axios');
const cheerio = require('cheerio');

class SourceParser {
  
  /**
   * Extrai patterns de repositorio GitHub
   * @param {string} repoUrl - URL do repositorio
   * @returns {GitHubPatterns}
   */
  async parseGitHub(repoUrl) {
    const [owner, repo] = this.extractRepoInfo(repoUrl);
    
    // API do GitHub para metadata
    const repoData = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } }
    );
    
    // README para patterns
    const readmeData = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers: { 'Accept': 'application/vnd.github.v3.raw' } }
    );
    
    return {
      name: repoData.data.name,
      description: repoData.data.description,
      stars: repoData.data.stargazers_count,
      lastUpdate: repoData.data.updated_at,
      language: repoData.data.language,
      patterns: this.extractCodeBlocks(readmeData.data),
      reliability: this.calculateReliability(repoData.data)
    };
  }
  
  /**
   * Extrai informacoes de documentacao oficial
   * @param {string} docUrl - URL da documentacao
   * @returns {DocPatterns}
   */
  async parseDocs(docUrl) {
    const response = await axios.get(docUrl);
    const $ = cheerio.load(response.data);
    
    // Extrair code blocks
    const codeBlocks = [];
    $('pre code, .highlight code').each((i, el) => {
      const code = $(el).text().trim();
      if (code.length > 20 && code.length < 500) {
        codeBlocks.push(code);
      }
    });
    
    // Extrair headings para estrutura
    const sections = [];
    $('h2, h3').each((i, el) => {
      sections.push($(el).text().trim());
    });
    
    return {
      url: docUrl,
      title: $('title').text() || $('h1').first().text(),
      sections,
      codeExamples: codeBlocks.slice(0, 5), // Top 5 examples
      lastModified: response.headers['last-modified']
    };
  }
  
  /**
   * Extrai solucoes do Stack Overflow
   * @param {string} query - Termo de busca
   * @returns {StackOverflowResults}
   */
  async parseStackOverflow(query) {
    const searchUrl = `https://api.stackexchange.com/2.3/search/advanced?` +
      `order=desc&sort=votes&q=${encodeURIComponent(query)}&site=stackoverflow`;
    
    const response = await axios.get(searchUrl);
    
    return response.data.items.slice(0, 3).map(item => ({
      title: item.title,
      url: item.link,
      votes: item.score,
      answered: item.is_answered,
      tags: item.tags
    }));
  }
  
  extractCodeBlocks(markdown) {
    const codeBlockRegex = /```[\w]*\n([\s\S]*?)```/g;
    const blocks = [];
    let match;
    
    while ((match = codeBlockRegex.exec(markdown)) !== null) {
      if (match[1].trim().length > 20) {
        blocks.push(match[1].trim());
      }
    }
    
    return blocks.slice(0, 5);
  }
  
  calculateReliability(repoData) {
    let score = 0;
    
    // Stars weight
    if (repoData.stargazers_count > 10000) score += 0.3;
    else if (repoData.stargazers_count > 1000) score += 0.2;
    else if (repoData.stargazers_count > 100) score += 0.1;
    
    // Recency weight
    const lastUpdate = new Date(repoData.updated_at);
    const daysSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 30) score += 0.3;
    else if (daysSinceUpdate < 90) score += 0.2;
    else if (daysSinceUpdate < 365) score += 0.1;
    
    // Official org weight
    if (repoData.owner.type === 'Organization') score += 0.2;
    
    // Has wiki/docs
    if (repoData.has_wiki || repoData.has_pages) score += 0.1;
    
    return Math.min(score, 1.0);
  }
  
  extractRepoInfo(url) {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error(`Invalid GitHub URL: ${url}`);
    return [match[1], match[2]];
  }
}

module.exports = { SourceParser };
```

### 4.3 Task 3: Cache Manager (Day 3-4)

```javascript
// .prompt-os/scripts/cache-manager.js

const fs = require('fs').promises;
const path = require('path');

class CacheManager {
  constructor(cachePath = '.prompt-os/cache') {
    this.cachePath = cachePath;
    this.cacheFile = path.join(cachePath, 'research-cache.json');
    this.defaultTTL = 7 * 24 * 60 * 60 * 1000; // 7 days
  }
  
  async init() {
    await fs.mkdir(this.cachePath, { recursive: true });
    
    try {
      await fs.access(this.cacheFile);
    } catch {
      await fs.writeFile(this.cacheFile, '{}');
    }
  }
  
  async get(key) {
    const cache = await this.loadCache();
    const entry = cache[this.normalizeKey(key)];
    
    if (!entry) return null;
    
    // Check TTL
    if (Date.now() - new Date(entry.timestamp).getTime() > entry.ttl) {
      await this.invalidate(key);
      return null;
    }
    
    return {
      ...entry.result,
      cached: true,
      cachedAt: entry.timestamp
    };
  }
  
  async set(key, result, ttl = this.defaultTTL) {
    const cache = await this.loadCache();
    
    cache[this.normalizeKey(key)] = {
      timestamp: new Date().toISOString(),
      ttl,
      result
    };
    
    await this.saveCache(cache);
  }
  
  async invalidate(key) {
    const cache = await this.loadCache();
    delete cache[this.normalizeKey(key)];
    await this.saveCache(cache);
  }
  
  async invalidateAll() {
    await fs.writeFile(this.cacheFile, '{}');
  }
  
  async getStats() {
    const cache = await this.loadCache();
    const keys = Object.keys(cache);
    
    let validCount = 0;
    let expiredCount = 0;
    
    for (const key of keys) {
      const entry = cache[key];
      if (Date.now() - new Date(entry.timestamp).getTime() > entry.ttl) {
        expiredCount++;
      } else {
        validCount++;
      }
    }
    
    return {
      totalEntries: keys.length,
      validEntries: validCount,
      expiredEntries: expiredCount,
      cacheSize: JSON.stringify(cache).length
    };
  }
  
  normalizeKey(key) {
    return key.toLowerCase().replace(/\s+/g, '-');
  }
  
  async loadCache() {
    try {
      const data = await fs.readFile(this.cacheFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  
  async saveCache(cache) {
    await fs.writeFile(this.cacheFile, JSON.stringify(cache, null, 2));
  }
}

module.exports = { CacheManager };
```

### 4.4 Task 4: Research Engine (Day 4-5)

```javascript
// .prompt-os/scripts/research-engine.js

const { SearchAdapter } = require('./search-adapter');
const { SourceParser } = require('./source-parser');
const { CacheManager } = require('./cache-manager');

class ResearchEngine {
  constructor() {
    this.searchAdapter = new SearchAdapter();
    this.sourceParser = new SourceParser();
    this.cacheManager = new CacheManager();
  }
  
  async init() {
    await this.cacheManager.init();
  }
  
  /**
   * Conduz pesquisa completa para um topico
   * @param {string} topic - Topico a pesquisar
   * @param {object} options - Opcoes de pesquisa
   * @returns {ResearchResult}
   */
  async conductResearch(topic, options = {}) {
    const { 
      useCache = true, 
      maxSources = 5,
      includeStackOverflow = true 
    } = options;
    
    // Check cache first
    if (useCache) {
      const cached = await this.cacheManager.get(topic);
      if (cached) {
        console.log(`[CACHE HIT] Using cached research for: ${topic}`);
        return cached;
      }
    }
    
    console.log(`[RESEARCH] Searching for: ${topic}`);
    
    // Step 1: Search via API
    const searchResults = await this.searchAdapter.search(topic, { maxResults: 10 });
    
    // Step 2: Categorize and parse sources
    const sources = await this.categorizeSources(searchResults);
    
    // Step 3: Parse detailed info from top sources
    const parsedSources = await this.parseTopSources(sources, maxSources);
    
    // Step 4: Get Stack Overflow issues if enabled
    let commonIssues = [];
    if (includeStackOverflow) {
      commonIssues = await this.sourceParser.parseStackOverflow(topic);
    }
    
    // Step 5: Validate and rank
    const validatedSources = this.validateSources(parsedSources);
    const rankedSources = this.rankResults(validatedSources);
    
    // Step 6: Format result
    const result = {
      query: topic,
      timestamp: new Date().toISOString(),
      cached: false,
      sources: rankedSources,
      patterns: this.extractPatterns(rankedSources),
      bestPractices: this.extractBestPractices(rankedSources),
      commonIssues
    };
    
    // Step 7: Cache result
    await this.cacheManager.set(topic, result);
    
    return result;
  }
  
  async categorizeSources(searchResults) {
    return searchResults.map(result => {
      let type = 'general';
      
      if (result.url.includes('github.com')) {
        type = 'github';
      } else if (result.url.includes('stackoverflow.com')) {
        type = 'stackoverflow';
      } else if (this.isOfficialDocs(result.url)) {
        type = 'official_docs';
      }
      
      return { ...result, type };
    });
  }
  
  async parseTopSources(sources, maxSources) {
    const parsed = [];
    const githubSources = sources.filter(s => s.type === 'github').slice(0, 2);
    const docsSources = sources.filter(s => s.type === 'official_docs').slice(0, 2);
    const generalSources = sources.filter(s => s.type === 'general').slice(0, 1);
    
    // Parse GitHub repos
    for (const source of githubSources) {
      try {
        const ghData = await this.sourceParser.parseGitHub(source.url);
        parsed.push({ ...source, ...ghData });
      } catch (e) {
        console.warn(`Failed to parse GitHub: ${source.url}`);
      }
    }
    
    // Parse documentation
    for (const source of docsSources) {
      try {
        const docsData = await this.sourceParser.parseDocs(source.url);
        parsed.push({ ...source, ...docsData });
      } catch (e) {
        console.warn(`Failed to parse docs: ${source.url}`);
      }
    }
    
    // Add general sources as-is
    parsed.push(...generalSources);
    
    return parsed.slice(0, maxSources);
  }
  
  validateSources(sources) {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    return sources.filter(source => {
      // Check date if available
      if (source.lastUpdate || source.lastModified) {
        const sourceDate = new Date(source.lastUpdate || source.lastModified);
        if (sourceDate < twoYearsAgo) {
          console.warn(`[OUTDATED] Skipping old source: ${source.url}`);
          return false;
        }
      }
      
      // Check GitHub stars if applicable
      if (source.type === 'github' && source.stars < 50) {
        console.warn(`[LOW STARS] Skipping unpopular repo: ${source.url}`);
        return false;
      }
      
      return true;
    });
  }
  
  rankResults(sources) {
    return sources.sort((a, b) => {
      const scoreA = this.calculateSourceScore(a);
      const scoreB = this.calculateSourceScore(b);
      return scoreB - scoreA;
    }).map((source, index) => ({
      ...source,
      rank: index + 1,
      score: this.calculateSourceScore(source)
    }));
  }
  
  calculateSourceScore(source) {
    let score = 0;
    
    // Type weight
    const typeWeights = { official_docs: 1.0, github: 0.8, stackoverflow: 0.6, general: 0.4 };
    score += typeWeights[source.type] || 0.3;
    
    // Reliability weight
    score += (source.reliability || 0.5) * 0.5;
    
    // Recency weight
    if (source.lastUpdate) {
      const daysSince = (Date.now() - new Date(source.lastUpdate)) / (1000 * 60 * 60 * 24);
      if (daysSince < 30) score += 0.3;
      else if (daysSince < 90) score += 0.2;
      else if (daysSince < 365) score += 0.1;
    }
    
    return score;
  }
  
  extractPatterns(sources) {
    const patterns = [];
    
    for (const source of sources) {
      if (source.patterns) {
        for (const pattern of source.patterns.slice(0, 2)) {
          patterns.push({
            code: pattern,
            source: source.url,
            reliability: source.reliability || 0.5
          });
        }
      }
      if (source.codeExamples) {
        for (const example of source.codeExamples.slice(0, 2)) {
          patterns.push({
            code: example,
            source: source.url,
            reliability: source.reliability || 0.5
          });
        }
      }
    }
    
    return patterns.slice(0, 5);
  }
  
  extractBestPractices(sources) {
    // Extract from sections that contain "best practice", "recommendation", etc.
    const practices = [];
    
    for (const source of sources) {
      if (source.sections) {
        const practicesSections = source.sections.filter(s => 
          /best practice|recommendation|tip|guideline/i.test(s)
        );
        
        for (const section of practicesSections) {
          practices.push({
            practice: section,
            source: source.url
          });
        }
      }
    }
    
    return practices.slice(0, 5);
  }
  
  isOfficialDocs(url) {
    const officialPatterns = [
      /\.io\/docs/,
      /\.dev\/docs/,
      /docs\./,
      /documentation\./,
      /kubernetes\.io/,
      /reactjs\.org/,
      /vuejs\.org/,
      /nodejs\.org/,
      /python\.org/,
      /golang\.org/,
      /rust-lang\.org/
    ];
    
    return officialPatterns.some(pattern => pattern.test(url));
  }
}

module.exports = { ResearchEngine };
```

### 4.5 Task 5: Integration with brain.js (Day 5-6)

```javascript
// Atualizacoes no brain.js

const { ResearchEngine } = require('./research-engine');

// No inicio
const researchEngine = new ResearchEngine();

// Substituir conductResearch mock
async function conductResearch(topic) {
  await researchEngine.init();
  
  try {
    const result = await researchEngine.conductResearch(topic, {
      useCache: true,
      maxSources: 5,
      includeStackOverflow: true
    });
    
    // Format for skill generation
    return {
      sources: result.sources.map(s => ({
        title: s.title,
        url: s.url,
        type: s.type,
        reliability: s.reliability
      })),
      patterns: result.patterns.map(p => p.code),
      bestPractices: result.bestPractices.map(bp => bp.practice),
      commonIssues: result.commonIssues.map(ci => ci.title)
    };
  } catch (error) {
    console.warn(`[RESEARCH] Failed to conduct real research: ${error.message}`);
    console.warn('[RESEARCH] Falling back to minimal mock data');
    
    // Fallback para nao bloquear
    return {
      sources: [],
      patterns: [],
      bestPractices: [],
      commonIssues: []
    };
  }
}

// Novo comando: cache
async function cacheCommand(action) {
  await researchEngine.init();
  
  switch (action) {
    case 'stats':
      const stats = await researchEngine.cacheManager.getStats();
      console.log('\n=== CACHE STATS ===');
      console.log(`Total entries: ${stats.totalEntries}`);
      console.log(`Valid entries: ${stats.validEntries}`);
      console.log(`Expired entries: ${stats.expiredEntries}`);
      console.log(`Cache size: ${(stats.cacheSize / 1024).toFixed(2)} KB`);
      break;
      
    case 'clear':
      await researchEngine.cacheManager.invalidateAll();
      console.log('Cache cleared successfully.');
      break;
      
    default:
      console.log('Usage: brain cache [stats|clear]');
  }
}
```

### 4.6 Task 6: CLI Commands & Tests (Day 6-7)

```bash
# Novos comandos

node brain.js generate skill "kubernetes-helm"  # Usa pesquisa real
node brain.js cache stats                       # Mostra estatisticas do cache
node brain.js cache clear                       # Limpa cache
node brain.js research "topic"                  # Pesquisa sem gerar skill
```

```javascript
// .prompt-os/scripts/test-research.js

const { ResearchEngine } = require('./research-engine');

async function testResearch() {
  const engine = new ResearchEngine();
  await engine.init();
  
  const testCases = [
    'react hooks',
    'kubernetes deployment',
    'graphql apollo',
    'typescript generics',
    'docker compose'
  ];
  
  for (const topic of testCases) {
    console.log(`\n=== Testing: ${topic} ===`);
    
    const result = await engine.conductResearch(topic);
    
    console.log(`Sources found: ${result.sources.length}`);
    console.log(`Patterns extracted: ${result.patterns.length}`);
    console.log(`Best practices: ${result.bestPractices.length}`);
    console.log(`Stack Overflow issues: ${result.commonIssues.length}`);
    
    if (result.sources[0]) {
      console.log(`Top source: ${result.sources[0].title} (${result.sources[0].type})`);
    }
  }
}

testResearch().catch(console.error);
```

---

## 5. Success Criteria

### 5.1 Functional Requirements

| ID | Requirement | Validation |
|----|-------------|------------|
| FR1 | Buscar via API de search | Executar pesquisa, verificar resultados reais |
| FR2 | Parsear GitHub repos | Extrair stars, patterns de README |
| FR3 | Cache funcional | Pesquisar 2x, verificar HIT na segunda |
| FR4 | Validacao de data | Fontes > 2 anos excluidas |
| FR5 | Fallback graceful | API offline -> continua com mock |

### 5.2 Quality Metrics

| Metrica | Target | Como Medir |
|---------|--------|------------|
| Fontes reais por skill | >= 3 | Contar sources com URLs validas |
| Precisao de patterns | > 80% | Patterns compilam/executam |
| Tempo de pesquisa | < 30s | Timer no conductResearch |
| Cache hit rate | > 50% | Stats do cache apos 1 semana |

---

## 6. Risks and Mitigations

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| API rate limiting | Alta | Alto | Cache agressivo, fallback graceful |
| API key exposure | Media | Alto | Env variables, nunca commit |
| Scraping bloqueado | Media | Medio | Usar apenas APIs oficiais |
| Resultados irrelevantes | Media | Medio | Validacao + ranking |
| API costs | Baixa | Baixo | Free tier primeiro, cache |

---

## 7. Dependencies

| Dependencia | Tipo | Status |
|-------------|------|--------|
| SPEC-002 (Auto-Increment) | Interna | Required |
| brain.js v1.2.0 | Interna | OK |
| axios | Externa | npm install |
| cheerio | Externa | npm install |
| Tavily/Perplexity API key | Externa | Free tier |
| GitHub Token (optional) | Externa | For higher rate limits |

---

## 8. Timeline

| Fase | Duracao | Deliverable |
|------|---------|-------------|
| Day 1-2 | 2 dias | search-adapter.js |
| Day 2-3 | 1.5 dias | source-parser.js |
| Day 3-4 | 1 dia | cache-manager.js |
| Day 4-5 | 1.5 dias | research-engine.js |
| Day 5-6 | 1 dia | Integracao brain.js |
| Day 6-7 | 1 dia | CLI, testes, docs |

**Total:** 7 dias

---

## 9. Future Considerations

### 9.1 AI-Powered Summarization

Na v2.0, usar LLM para resumir resultados:

```javascript
async function summarizeWithLLM(sources) {
  const prompt = `
    Summarize the following documentation sources into:
    1. Key patterns (code examples)
    2. Best practices (3-5 bullet points)
    3. Common pitfalls to avoid
    
    Sources:
    ${JSON.stringify(sources, null, 2)}
  `;
  
  return await llm.generate(prompt);
}
```

### 9.2 Multi-Provider Fallback

```javascript
const providers = ['tavily', 'perplexity', 'serp'];

async function searchWithFallback(query) {
  for (const provider of providers) {
    try {
      searchAdapter.setProvider(provider);
      return await searchAdapter.search(query);
    } catch (e) {
      console.warn(`Provider ${provider} failed, trying next...`);
    }
  }
  throw new Error('All search providers failed');
}
```

### 9.3 Domain-Specific Sources

```javascript
const domainSources = {
  frontend: ['reactjs.org', 'vuejs.org', 'angular.io'],
  backend: ['nodejs.org', 'expressjs.com', 'fastify.io'],
  devops: ['kubernetes.io', 'docker.com', 'terraform.io'],
  database: ['mongodb.com/docs', 'postgresql.org/docs', 'redis.io/docs']
};

function getDomainSources(domain) {
  return domainSources[domain] || [];
}
```

---

*SPEC-003 | Web Research Real | v1.0.0 | 2026-02-02*
