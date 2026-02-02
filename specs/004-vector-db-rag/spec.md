# SPEC-004: Vector DB + RAG

> **Status:** Draft
> **Priority:** P1 (High)
> **Estimated Effort:** 7-10 days
> **Author:** Itzamna PromptOS
> **Created:** 2026-02-02
> **Depends On:** SPEC-003 (Web Research Real)
> **Target Version:** v2.0.0

---

## 1. Problem Statement

### 1.1 Current State

O Itzamna PromptOS atualmente usa **busca por keyword** para encontrar skills:

```javascript
// Atual - busca simples por nome/tag
function findSkill(query) {
  return skills.filter(s => 
    s.name.includes(query) || 
    s.tags.some(t => t.includes(query))
  );
}
```

**Limitacoes:**
- "Como fazer deploy?" nao encontra skill `kubernetes-deployment`
- "Gerenciar estado React" nao encontra skill `react-hooks`
- Nao entende sinonimos ou contexto
- Self-critique usa apenas regras locais, nao semantica

### 1.2 Desired State

O sistema deve usar **busca semantica** com Vector DB:
- Embeddings para todas as skills
- Busca por similaridade semantica
- RAG (Retrieval Augmented Generation) para contexto
- Self-critique com LLM usando skills similares como referencia

### 1.3 Impact

| Sem Vector DB | Com Vector DB + RAG |
|---------------|---------------------|
| Busca exata por keyword | Busca semantica por significado |
| "deploy" nao encontra "kubernetes" | "deploy" encontra skills relacionadas |
| Self-critique local | Self-critique com contexto de skills similares |
| Exemplos genericos | Exemplos baseados em skills existentes |

---

## 2. Goals and Non-Goals

### 2.1 Goals

1. **G1:** Integrar com ChromaDB (local) ou Pinecone (cloud)
2. **G2:** Gerar embeddings para todas as 17+ skills existentes
3. **G3:** Busca por similaridade semantica com threshold configuravel
4. **G4:** RAG para enriquecer geracao de novas skills
5. **G5:** LLM-based self-critique usando skills similares como referencia

### 2.2 Non-Goals

- **NG1:** Nao treinar modelo proprio de embeddings
- **NG2:** Nao implementar fine-tuning nesta fase
- **NG3:** Nao suportar multiplos idiomas inicialmente
- **NG4:** Nao indexar conteudo externo (apenas skills locais)

---

## 3. Solution Design

### 3.1 Architecture

```
Vector DB + RAG System
========================================

+------------------+     +------------------+     +------------------+
|  EmbeddingEngine |     |   VectorStore    |     |    RAGEngine     |
+------------------+     +------------------+     +------------------+
| - embed()        |     | - upsert()       |     | - retrieve()     |
| - batchEmbed()   |     | - query()        |     | - augment()      |
| - getModel()     |     | - delete()       |     | - generate()     |
+------------------+     +------------------+     +------------------+
        |                        |                        |
        v                        v                        v
+-----------------------------------------------------------------------+
|                        SemanticSearch                                  |
+-----------------------------------------------------------------------+
| - searchSkills(query)                                                  |
| - findSimilar(skill)                                                   |
| - getSuggestions(context)                                              |
+-----------------------------------------------------------------------+
                                |
                    +-----------+-----------+
                    |                       |
                    v                       v
            +---------------+       +---------------+
            |   brain.js    |       | self-critique |
            +---------------+       +---------------+
```

### 3.2 Embedding Flow

```
Skill Indexing
==============

[Load Skill] --> [Parse Content] --> [Generate Embedding] --> [Store in VectorDB]
     |                |                       |                      |
     v                v                       v                      v
 kubernetes.md   {name, desc,         [0.123, -0.456, ...]    ChromaDB/Pinecone
                  examples,
                  triggers}
```

### 3.3 RAG Flow

```
Query: "Como fazer caching com Redis?"
                    |
                    v
          [Generate Query Embedding]
                    |
                    v
          [Search VectorDB]
           similarity > 0.7
                    |
                    v
          [Retrieve Top 3 Skills]
           - redis-caching (0.92)
           - nodejs-performance (0.78)
           - database-patterns (0.71)
                    |
                    v
          [Augment Prompt]
           "Baseado nestas skills existentes:
            {skill_contents}
            Gere uma nova skill para: {query}"
                    |
                    v
          [Generate with LLM]
                    |
                    v
          [New Skill Draft]
```

### 3.4 Data Structures

```javascript
// Skill embedding document
const SkillDocument = {
  id: 'redis-caching',
  content: 'Full skill content for embedding...',
  metadata: {
    name: 'redis-caching',
    category: 'backend',
    level: 'L2',
    tags: ['redis', 'caching', 'performance'],
    triggers: ['redis', 'cache', 'memoria'],
    createdAt: '2026-01-15',
    updatedAt: '2026-02-01'
  },
  embedding: [0.123, -0.456, 0.789, ...] // 1536 dims (OpenAI) or 384 (local)
};

// Search result
const SearchResult = {
  skill: 'redis-caching',
  similarity: 0.92,
  content: '...',
  metadata: { ... }
};

// RAG context
const RAGContext = {
  query: 'Como fazer caching com Redis?',
  retrievedSkills: [
    { name: 'redis-caching', similarity: 0.92, content: '...' },
    { name: 'nodejs-performance', similarity: 0.78, content: '...' }
  ],
  augmentedPrompt: '...'
};
```

### 3.5 Vector Store Options

| Provider | Tipo | Preco | Latencia | Escolha |
|----------|------|-------|----------|---------|
| **ChromaDB** | Local | Free | ~10ms | **Default** |
| Pinecone | Cloud | Free tier | ~50ms | Opcional |
| Qdrant | Local/Cloud | Free | ~15ms | Alternativa |
| Weaviate | Local/Cloud | Free | ~20ms | Alternativa |

**Decisao:** ChromaDB como default (local, zero config, Python/JS bindings).

### 3.6 Embedding Models

| Model | Provider | Dims | Preco | Qualidade |
|-------|----------|------|-------|-----------|
| text-embedding-3-small | OpenAI | 1536 | $0.02/1M tokens | Alta |
| text-embedding-3-large | OpenAI | 3072 | $0.13/1M tokens | Muito Alta |
| all-MiniLM-L6-v2 | HuggingFace | 384 | Free (local) | Boa |
| nomic-embed-text | Ollama | 768 | Free (local) | Boa |

**Decisao:** 
- **Default:** all-MiniLM-L6-v2 (local, free, rapido)
- **Opcional:** OpenAI text-embedding-3-small (melhor qualidade)

---

## 4. Implementation Plan

### 4.1 Task 1: Embedding Engine (Day 1-2)

```javascript
// .prompt-os/scripts/embedding-engine.js

const { pipeline } = require('@xenova/transformers');

class EmbeddingEngine {
  constructor(options = {}) {
    this.model = options.model || 'Xenova/all-MiniLM-L6-v2';
    this.dimensions = options.dimensions || 384;
    this.extractor = null;
  }
  
  async init() {
    console.log(`[EMBEDDING] Loading model: ${this.model}`);
    this.extractor = await pipeline('feature-extraction', this.model);
    console.log(`[EMBEDDING] Model loaded successfully`);
  }
  
  /**
   * Gera embedding para um texto
   * @param {string} text - Texto para embedar
   * @returns {number[]} - Vetor de embedding
   */
  async embed(text) {
    if (!this.extractor) {
      await this.init();
    }
    
    const output = await this.extractor(text, {
      pooling: 'mean',
      normalize: true
    });
    
    return Array.from(output.data);
  }
  
  /**
   * Gera embeddings em batch
   * @param {string[]} texts - Array de textos
   * @returns {number[][]} - Array de vetores
   */
  async batchEmbed(texts) {
    const embeddings = [];
    
    for (const text of texts) {
      const embedding = await this.embed(text);
      embeddings.push(embedding);
    }
    
    return embeddings;
  }
  
  /**
   * Prepara texto de skill para embedding
   * @param {object} skill - Skill parsed
   * @returns {string} - Texto preparado
   */
  prepareSkillText(skill) {
    return `
      Skill: ${skill.name}
      Category: ${skill.category}
      Description: ${skill.description}
      Tags: ${skill.tags.join(', ')}
      Triggers: ${skill.triggers.join(', ')}
      
      Instructions: ${skill.instructions.substring(0, 1000)}
      
      Examples: ${skill.examples.slice(0, 2).join('\n\n')}
    `.trim();
  }
  
  /**
   * Calcula similaridade coseno entre dois vetores
   * @param {number[]} a - Vetor A
   * @param {number[]} b - Vetor B
   * @returns {number} - Similaridade (0-1)
   */
  cosineSimilarity(a, b) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

// OpenAI alternative
class OpenAIEmbeddingEngine {
  constructor(apiKey) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY;
    this.model = 'text-embedding-3-small';
    this.dimensions = 1536;
  }
  
  async embed(text) {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.model,
        input: text
      })
    });
    
    const data = await response.json();
    return data.data[0].embedding;
  }
  
  async batchEmbed(texts) {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.model,
        input: texts
      })
    });
    
    const data = await response.json();
    return data.data.map(d => d.embedding);
  }
}

module.exports = { EmbeddingEngine, OpenAIEmbeddingEngine };
```

### 4.2 Task 2: Vector Store (Day 2-4)

```javascript
// .prompt-os/scripts/vector-store.js

const { ChromaClient } = require('chromadb');

class VectorStore {
  constructor(options = {}) {
    this.collectionName = options.collectionName || 'itzamna-skills';
    this.client = null;
    this.collection = null;
  }
  
  async init() {
    console.log('[VECTORDB] Initializing ChromaDB...');
    
    this.client = new ChromaClient({
      path: '.prompt-os/chromadb'
    });
    
    // Get or create collection
    this.collection = await this.client.getOrCreateCollection({
      name: this.collectionName,
      metadata: { 
        'hnsw:space': 'cosine',
        'description': 'Itzamna PromptOS Skills Collection'
      }
    });
    
    console.log(`[VECTORDB] Collection "${this.collectionName}" ready`);
  }
  
  /**
   * Insere ou atualiza documento
   * @param {string} id - ID do documento
   * @param {number[]} embedding - Vetor de embedding
   * @param {object} metadata - Metadata
   * @param {string} document - Conteudo original
   */
  async upsert(id, embedding, metadata, document) {
    await this.collection.upsert({
      ids: [id],
      embeddings: [embedding],
      metadatas: [metadata],
      documents: [document]
    });
  }
  
  /**
   * Insere multiplos documentos
   * @param {object[]} items - Array de {id, embedding, metadata, document}
   */
  async batchUpsert(items) {
    await this.collection.upsert({
      ids: items.map(i => i.id),
      embeddings: items.map(i => i.embedding),
      metadatas: items.map(i => i.metadata),
      documents: items.map(i => i.document)
    });
  }
  
  /**
   * Busca por similaridade
   * @param {number[]} queryEmbedding - Vetor de busca
   * @param {number} topK - Numero de resultados
   * @param {object} filter - Filtro de metadata
   * @returns {SearchResult[]}
   */
  async query(queryEmbedding, topK = 5, filter = null) {
    const results = await this.collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
      where: filter
    });
    
    return results.ids[0].map((id, i) => ({
      id,
      similarity: 1 - results.distances[0][i], // ChromaDB returns distance, convert to similarity
      document: results.documents[0][i],
      metadata: results.metadatas[0][i]
    }));
  }
  
  /**
   * Deleta documento
   * @param {string} id - ID do documento
   */
  async delete(id) {
    await this.collection.delete({
      ids: [id]
    });
  }
  
  /**
   * Retorna estatisticas da collection
   */
  async getStats() {
    const count = await this.collection.count();
    
    return {
      collection: this.collectionName,
      documentCount: count
    };
  }
  
  /**
   * Lista todos os IDs
   */
  async listIds() {
    const result = await this.collection.get();
    return result.ids;
  }
}

module.exports = { VectorStore };
```

### 4.3 Task 3: RAG Engine (Day 4-6)

```javascript
// .prompt-os/scripts/rag-engine.js

const { EmbeddingEngine } = require('./embedding-engine');
const { VectorStore } = require('./vector-store');

class RAGEngine {
  constructor(options = {}) {
    this.embeddingEngine = new EmbeddingEngine(options.embedding);
    this.vectorStore = new VectorStore(options.vectorStore);
    this.similarityThreshold = options.similarityThreshold || 0.7;
    this.topK = options.topK || 3;
  }
  
  async init() {
    await this.embeddingEngine.init();
    await this.vectorStore.init();
  }
  
  /**
   * Busca skills semanticamente similares
   * @param {string} query - Query de busca
   * @param {object} options - Opcoes
   * @returns {RetrievalResult[]}
   */
  async retrieve(query, options = {}) {
    const { topK = this.topK, threshold = this.similarityThreshold, filter } = options;
    
    // Generate query embedding
    const queryEmbedding = await this.embeddingEngine.embed(query);
    
    // Search vector store
    const results = await this.vectorStore.query(queryEmbedding, topK * 2, filter);
    
    // Filter by threshold
    const filtered = results.filter(r => r.similarity >= threshold);
    
    return filtered.slice(0, topK);
  }
  
  /**
   * Aumenta prompt com contexto de skills similares
   * @param {string} query - Query original
   * @param {string} basePrompt - Prompt base para geracao
   * @returns {AugmentedPrompt}
   */
  async augment(query, basePrompt) {
    const retrievedSkills = await this.retrieve(query);
    
    if (retrievedSkills.length === 0) {
      return {
        prompt: basePrompt,
        context: null,
        retrievedSkills: []
      };
    }
    
    // Build context from retrieved skills
    const context = retrievedSkills.map((skill, i) => `
### Skill Similar ${i + 1}: ${skill.metadata.name} (Similaridade: ${(skill.similarity * 100).toFixed(0)}%)

${skill.document.substring(0, 1500)}
---
    `).join('\n\n');
    
    // Augment prompt
    const augmentedPrompt = `
${basePrompt}

## Contexto: Skills Existentes Similares

Ao gerar a nova skill, use as seguintes skills existentes como referencia para estilo, estrutura e qualidade:

${context}

## Instrucoes Adicionais

1. Mantenha consistencia de formato com as skills de referencia
2. Evite duplicar conteudo ja coberto pelas skills existentes
3. Referencie skills relacionadas quando apropriado
4. Use o mesmo nivel de detalhe nos exemplos
    `;
    
    return {
      prompt: augmentedPrompt,
      context,
      retrievedSkills: retrievedSkills.map(s => ({
        name: s.metadata.name,
        similarity: s.similarity
      }))
    };
  }
  
  /**
   * Gera nova skill usando RAG
   * @param {string} description - Descricao da skill desejada
   * @param {function} generateFn - Funcao de geracao (LLM)
   * @returns {GenerationResult}
   */
  async generate(description, generateFn) {
    const basePrompt = `
Gere uma skill de alta qualidade para: ${description}

A skill deve seguir o formato YAML frontmatter + Markdown body.
Inclua:
- Descricao clara
- 3+ exemplos praticos
- Guidelines especificas
- Constraints importantes
- Triggers para ativacao
    `;
    
    const augmented = await this.augment(description, basePrompt);
    
    // Generate with LLM
    const generated = await generateFn(augmented.prompt);
    
    return {
      content: generated,
      retrievedSkills: augmented.retrievedSkills,
      usedRAG: augmented.retrievedSkills.length > 0
    };
  }
  
  /**
   * Encontra skills redundantes para uma nova skill
   * @param {string} skillContent - Conteudo da nova skill
   * @returns {RedundancyResult}
   */
  async findRedundant(skillContent) {
    const similar = await this.retrieve(skillContent, {
      topK: 5,
      threshold: 0.8 // Higher threshold for redundancy
    });
    
    if (similar.length === 0) {
      return {
        isRedundant: false,
        similarSkills: []
      };
    }
    
    // Check for high similarity (potential duplicate)
    const highSimilarity = similar.filter(s => s.similarity > 0.9);
    
    return {
      isRedundant: highSimilarity.length > 0,
      similarSkills: similar.map(s => ({
        name: s.metadata.name,
        similarity: s.similarity,
        overlap: this.estimateOverlap(skillContent, s.document)
      }))
    };
  }
  
  estimateOverlap(content1, content2) {
    const words1 = new Set(content1.toLowerCase().match(/\b\w+\b/g));
    const words2 = new Set(content2.toLowerCase().match(/\b\w+\b/g));
    
    const intersection = [...words1].filter(w => words2.has(w));
    const union = new Set([...words1, ...words2]);
    
    return intersection.length / union.size; // Jaccard similarity
  }
}

module.exports = { RAGEngine };
```

### 4.4 Task 4: Semantic Search (Day 6-7)

```javascript
// .prompt-os/scripts/semantic-search.js

const { RAGEngine } = require('./rag-engine');

class SemanticSearch {
  constructor() {
    this.ragEngine = new RAGEngine();
  }
  
  async init() {
    await this.ragEngine.init();
  }
  
  /**
   * Busca skills por query semantica
   * @param {string} query - Query em linguagem natural
   * @returns {SkillSearchResult[]}
   */
  async searchSkills(query) {
    const results = await this.ragEngine.retrieve(query, {
      topK: 5,
      threshold: 0.5 // Lower threshold for broader search
    });
    
    return results.map(r => ({
      name: r.metadata.name,
      category: r.metadata.category,
      similarity: r.similarity,
      matchReason: this.explainMatch(query, r)
    }));
  }
  
  /**
   * Encontra skills similares a uma skill especifica
   * @param {string} skillName - Nome da skill
   * @returns {SimilarSkill[]}
   */
  async findSimilar(skillName) {
    // Get the skill's embedding from the store
    const skillData = await this.ragEngine.vectorStore.collection.get({
      ids: [skillName]
    });
    
    if (!skillData.embeddings || skillData.embeddings.length === 0) {
      throw new Error(`Skill "${skillName}" not found in vector store`);
    }
    
    const results = await this.ragEngine.vectorStore.query(
      skillData.embeddings[0],
      6 // Get 6 to exclude self
    );
    
    // Exclude self
    return results
      .filter(r => r.id !== skillName)
      .slice(0, 5)
      .map(r => ({
        name: r.metadata.name,
        category: r.metadata.category,
        similarity: r.similarity
      }));
  }
  
  /**
   * Sugere skills baseado no contexto atual
   * @param {string} context - Contexto (codigo, conversa, etc)
   * @returns {SkillSuggestion[]}
   */
  async getSuggestions(context) {
    // Extract key concepts from context
    const concepts = this.extractConcepts(context);
    
    // Search for each concept
    const allResults = [];
    for (const concept of concepts) {
      const results = await this.ragEngine.retrieve(concept, {
        topK: 2,
        threshold: 0.6
      });
      allResults.push(...results);
    }
    
    // Deduplicate and rank
    const uniqueResults = this.deduplicateResults(allResults);
    
    return uniqueResults.slice(0, 3).map(r => ({
      skill: r.metadata.name,
      confidence: r.similarity,
      reason: `Matches concept: "${this.findMatchingConcept(r, concepts)}"`
    }));
  }
  
  explainMatch(query, result) {
    const queryWords = query.toLowerCase().split(/\s+/);
    const skillTags = result.metadata.tags || [];
    const skillTriggers = result.metadata.triggers || [];
    
    const matchedTags = skillTags.filter(t => 
      queryWords.some(w => t.includes(w) || w.includes(t))
    );
    
    const matchedTriggers = skillTriggers.filter(t =>
      queryWords.some(w => t.includes(w) || w.includes(t))
    );
    
    if (matchedTags.length > 0) {
      return `Tags match: ${matchedTags.join(', ')}`;
    } else if (matchedTriggers.length > 0) {
      return `Triggers match: ${matchedTriggers.join(', ')}`;
    } else {
      return 'Semantic similarity';
    }
  }
  
  extractConcepts(context) {
    // Simple concept extraction (could be enhanced with NLP)
    const techKeywords = [
      'react', 'vue', 'angular', 'node', 'python', 'java', 'go',
      'docker', 'kubernetes', 'aws', 'azure', 'gcp',
      'database', 'api', 'rest', 'graphql', 'cache', 'redis',
      'testing', 'ci', 'cd', 'deploy', 'security'
    ];
    
    const words = context.toLowerCase().match(/\b\w+\b/g) || [];
    return [...new Set(words.filter(w => techKeywords.includes(w)))];
  }
  
  deduplicateResults(results) {
    const seen = new Set();
    return results.filter(r => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    }).sort((a, b) => b.similarity - a.similarity);
  }
  
  findMatchingConcept(result, concepts) {
    const doc = result.document.toLowerCase();
    return concepts.find(c => doc.includes(c)) || 'general context';
  }
}

module.exports = { SemanticSearch };
```

### 4.5 Task 5: LLM Self-Critique (Day 7-8)

```javascript
// .prompt-os/scripts/llm-self-critique.js

const { RAGEngine } = require('./rag-engine');

class LLMSelfCritique {
  constructor(options = {}) {
    this.ragEngine = new RAGEngine();
    this.llmProvider = options.llmProvider || 'openai';
    this.model = options.model || 'gpt-4o-mini';
  }
  
  async init() {
    await this.ragEngine.init();
  }
  
  /**
   * Avalia uma skill usando LLM com contexto de skills similares
   * @param {string} skillContent - Conteudo da skill a avaliar
   * @returns {CritiqueResult}
   */
  async evaluate(skillContent) {
    // Find similar skills for comparison
    const similar = await this.ragEngine.retrieve(skillContent, {
      topK: 3,
      threshold: 0.6
    });
    
    // Find potential redundancy
    const redundancy = await this.ragEngine.findRedundant(skillContent);
    
    // Build critique prompt
    const prompt = this.buildCritiquePrompt(skillContent, similar, redundancy);
    
    // Call LLM
    const response = await this.callLLM(prompt);
    
    // Parse response
    return this.parseCritiqueResponse(response);
  }
  
  buildCritiquePrompt(skillContent, similarSkills, redundancy) {
    const similarContext = similarSkills.map(s => `
### ${s.metadata.name} (${(s.similarity * 100).toFixed(0)}% similar)
${s.document.substring(0, 500)}...
    `).join('\n');
    
    return `
Voce e um revisor de qualidade para skills de um sistema de prompts.
Avalie a seguinte skill e retorne uma analise em formato JSON.

## Skill a Avaliar

${skillContent}

## Skills Similares Existentes (para comparacao)

${similarContext || 'Nenhuma skill similar encontrada.'}

## Analise de Redundancia

${redundancy.isRedundant 
  ? `ATENCAO: Skill possivelmente redundante com: ${redundancy.similarSkills.map(s => s.name).join(', ')}`
  : 'Nao foram encontradas skills redundantes.'}

## Instrucoes

Avalie a skill considerando:
1. Completude (todas secoes necessarias)
2. Clareza (instrucoes claras e actionable)
3. Praticidade (exemplos executaveis)
4. Consistencia (descricao alinha com conteudo)
5. Diferenciacao (valor unico vs skills existentes)

Retorne APENAS um objeto JSON no formato:
{
  "score": 0-100,
  "confidence": "low|medium|high",
  "strengths": ["ponto forte 1", "ponto forte 2"],
  "weaknesses": ["ponto fraco 1", "ponto fraco 2"],
  "suggestions": ["sugestao 1", "sugestao 2", "sugestao 3"],
  "redundancyRisk": "none|low|medium|high",
  "recommendedAction": "approve|improve|reconsider"
}
    `;
  }
  
  async callLLM(prompt) {
    switch (this.llmProvider) {
      case 'openai':
        return this.callOpenAI(prompt);
      case 'anthropic':
        return this.callAnthropic(prompt);
      case 'local':
        return this.callOllama(prompt);
      default:
        throw new Error(`LLM provider ${this.llmProvider} not supported`);
    }
  }
  
  async callOpenAI(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
  async callAnthropic(prompt) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    const data = await response.json();
    return data.content[0].text;
  }
  
  async callOllama(prompt) {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: prompt,
        stream: false
      })
    });
    
    const data = await response.json();
    return data.response;
  }
  
  parseCritiqueResponse(response) {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('Failed to parse LLM response:', e);
      
      // Return default critique
      return {
        score: 50,
        confidence: 'low',
        strengths: ['Unable to evaluate automatically'],
        weaknesses: ['LLM critique failed'],
        suggestions: ['Manual review required'],
        redundancyRisk: 'unknown',
        recommendedAction: 'improve'
      };
    }
  }
}

module.exports = { LLMSelfCritique };
```

### 4.6 Task 6: Index All Skills (Day 8-9)

```javascript
// .prompt-os/scripts/index-skills.js

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const { EmbeddingEngine } = require('./embedding-engine');
const { VectorStore } = require('./vector-store');
const yaml = require('yaml');

async function indexAllSkills() {
  console.log('[INDEX] Starting skill indexing...\n');
  
  const embeddingEngine = new EmbeddingEngine();
  const vectorStore = new VectorStore();
  
  await embeddingEngine.init();
  await vectorStore.init();
  
  // Find all skill files
  const skillFiles = await glob('skills/**/*.md', {
    ignore: ['skills/INDEX.md', 'skills/**/README.md']
  });
  
  console.log(`[INDEX] Found ${skillFiles.length} skill files\n`);
  
  const items = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of skillFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const parsed = parseSkill(content);
      
      if (!parsed) {
        console.warn(`[SKIP] Could not parse: ${file}`);
        errorCount++;
        continue;
      }
      
      // Prepare text for embedding
      const textForEmbedding = embeddingEngine.prepareSkillText(parsed);
      
      // Generate embedding
      const embedding = await embeddingEngine.embed(textForEmbedding);
      
      items.push({
        id: parsed.name,
        embedding,
        metadata: {
          name: parsed.name,
          category: parsed.category || path.dirname(file).split('/').pop(),
          level: parsed.level || 'L2',
          tags: parsed.tags || [],
          triggers: parsed.triggers || [],
          filePath: file
        },
        document: content
      });
      
      console.log(`[OK] Indexed: ${parsed.name}`);
      successCount++;
      
    } catch (e) {
      console.error(`[ERROR] Failed to index ${file}: ${e.message}`);
      errorCount++;
    }
  }
  
  // Batch upsert to vector store
  if (items.length > 0) {
    await vectorStore.batchUpsert(items);
    console.log(`\n[INDEX] Batch upsert complete`);
  }
  
  // Print summary
  console.log('\n=== INDEXING COMPLETE ===');
  console.log(`Successful: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total indexed: ${items.length}`);
  
  const stats = await vectorStore.getStats();
  console.log(`Vector store documents: ${stats.documentCount}`);
}

function parseSkill(content) {
  // Extract YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    return null;
  }
  
  try {
    const metadata = yaml.parse(frontmatterMatch[1]);
    
    // Extract body content
    const body = content.slice(frontmatterMatch[0].length).trim();
    
    // Extract sections
    const instructionsMatch = body.match(/## Instructions\n([\s\S]*?)(?=##|$)/);
    const examplesMatch = body.match(/## Examples\n([\s\S]*?)(?=##|$)/);
    
    return {
      name: metadata.name || metadata.title,
      description: metadata.description,
      category: metadata.category || metadata.domain,
      level: metadata.level,
      tags: metadata.tags || [],
      triggers: metadata.triggers || [],
      instructions: instructionsMatch ? instructionsMatch[1].trim() : '',
      examples: examplesMatch 
        ? examplesMatch[1].split(/### Example \d+/).filter(e => e.trim())
        : []
    };
  } catch (e) {
    console.error('YAML parse error:', e.message);
    return null;
  }
}

// Run if called directly
if (require.main === module) {
  indexAllSkills().catch(console.error);
}

module.exports = { indexAllSkills, parseSkill };
```

### 4.7 Task 7: Integration with brain.js (Day 9-10)

```javascript
// Adicoes ao brain.js

const { SemanticSearch } = require('./semantic-search');
const { RAGEngine } = require('./rag-engine');
const { LLMSelfCritique } = require('./llm-self-critique');

let semanticSearch = null;
let ragEngine = null;
let llmCritique = null;

// Initialize on first use
async function initVectorSystems() {
  if (!semanticSearch) {
    semanticSearch = new SemanticSearch();
    ragEngine = new RAGEngine();
    llmCritique = new LLMSelfCritique();
    
    await Promise.all([
      semanticSearch.init(),
      ragEngine.init(),
      llmCritique.init()
    ]);
  }
}

// Enhanced skill search
async function searchCommand(query) {
  await initVectorSystems();
  
  console.log(`\n=== SEMANTIC SEARCH: "${query}" ===\n`);
  
  const results = await semanticSearch.searchSkills(query);
  
  if (results.length === 0) {
    console.log('Nenhuma skill encontrada.');
    return;
  }
  
  for (const result of results) {
    const similarity = (result.similarity * 100).toFixed(0);
    console.log(`[${similarity}%] ${result.name} (${result.category})`);
    console.log(`       ${result.matchReason}\n`);
  }
}

// Enhanced generate with RAG
async function generateWithRAG(type, description) {
  await initVectorSystems();
  
  log.step(2.5, 'RAG - Buscando skills similares...');
  
  const augmented = await ragEngine.augment(description, getBasePrompt(type, description));
  
  if (augmented.retrievedSkills.length > 0) {
    console.log('\nSkills de referencia:');
    for (const skill of augmented.retrievedSkills) {
      console.log(`  - ${skill.name} (${(skill.similarity * 100).toFixed(0)}%)`);
    }
  }
  
  // Generate using augmented prompt
  const draft = await generate(type, augmented.prompt);
  draft.usedRAG = augmented.retrievedSkills.length > 0;
  draft.referenceSkills = augmented.retrievedSkills;
  
  return draft;
}

// Enhanced self-critique with LLM
async function critiqueWithLLM(skillContent) {
  await initVectorSystems();
  
  log.step(4.5, 'LLM SELF-CRITIQUE - Avaliando com IA...');
  
  const critique = await llmCritique.evaluate(skillContent);
  
  // Display enhanced critique
  console.log(`\nScore: ${critique.score}/100 (${critique.confidence})`);
  console.log(`Acao recomendada: ${critique.recommendedAction}`);
  
  if (critique.strengths.length > 0) {
    console.log('\nPontos fortes:');
    critique.strengths.forEach(s => console.log(`  + ${s}`));
  }
  
  if (critique.weaknesses.length > 0) {
    console.log('\nPontos fracos:');
    critique.weaknesses.forEach(w => console.log(`  - ${w}`));
  }
  
  if (critique.suggestions.length > 0) {
    console.log('\nSugestoes:');
    critique.suggestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  }
  
  if (critique.redundancyRisk !== 'none') {
    console.log(`\n[WARNING] Risco de redundancia: ${critique.redundancyRisk}`);
  }
  
  return critique;
}

// New CLI commands
async function vectorCommand(action, arg) {
  switch (action) {
    case 'index':
      const { indexAllSkills } = require('./index-skills');
      await indexAllSkills();
      break;
      
    case 'search':
      await searchCommand(arg);
      break;
      
    case 'similar':
      await initVectorSystems();
      const similar = await semanticSearch.findSimilar(arg);
      console.log(`\nSkills similares a "${arg}":\n`);
      for (const s of similar) {
        console.log(`  [${(s.similarity * 100).toFixed(0)}%] ${s.name} (${s.category})`);
      }
      break;
      
    case 'stats':
      await initVectorSystems();
      const stats = await ragEngine.vectorStore.getStats();
      console.log('\n=== VECTOR STORE STATS ===');
      console.log(`Collection: ${stats.collection}`);
      console.log(`Documents: ${stats.documentCount}`);
      break;
      
    default:
      console.log('Usage: brain vector [index|search|similar|stats] [arg]');
  }
}
```

---

## 5. Success Criteria

### 5.1 Functional Requirements

| ID | Requirement | Validation |
|----|-------------|------------|
| FR1 | Embeddings para todas as skills | Executar index, verificar count |
| FR2 | Busca semantica funcional | "fazer deploy" encontra kubernetes |
| FR3 | RAG aumenta qualidade | Comparar skills com/sem RAG |
| FR4 | LLM critique funcional | Critique retorna JSON valido |
| FR5 | Deteccao de redundancia | Skill duplicada detectada |

### 5.2 Quality Metrics

| Metrica | Target | Como Medir |
|---------|--------|------------|
| Precisao de busca semantica | > 80% | Top 3 resultados relevantes |
| Tempo de busca | < 500ms | Timer no searchSkills |
| Melhoria de qualidade com RAG | +15% score | Comparar scores com/sem RAG |
| LLM critique accuracy | > 70% | Correlacao com feedback humano |

---

## 6. Risks and Mitigations

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| LLM API costs | Media | Medio | Cache, usar local model |
| ChromaDB storage growth | Baixa | Baixo | Prune old embeddings |
| Embedding model accuracy | Media | Medio | A/B test diferentes modelos |
| Cold start latency | Media | Baixo | Lazy loading, pre-warm |

---

## 7. Dependencies

| Dependencia | Tipo | Status |
|-------------|------|--------|
| SPEC-003 (Web Research) | Interna | Required |
| chromadb | npm | Install required |
| @xenova/transformers | npm | Install required |
| OpenAI API (opcional) | Externa | For better embeddings |

---

## 8. Timeline

| Fase | Duracao | Deliverable |
|------|---------|-------------|
| Day 1-2 | 2 dias | embedding-engine.js |
| Day 2-4 | 2 dias | vector-store.js (ChromaDB) |
| Day 4-6 | 2 dias | rag-engine.js |
| Day 6-7 | 1 dia | semantic-search.js |
| Day 7-8 | 1.5 dias | llm-self-critique.js |
| Day 8-9 | 1 dia | index-skills.js |
| Day 9-10 | 1.5 dias | Integracao brain.js + testes |

**Total:** 10 dias

---

## 9. Future Considerations

### 9.1 Multi-Modal Embeddings

```javascript
// Suportar imagens e diagramas em skills
async function embedMultiModal(skill) {
  const textEmbedding = await embedText(skill.content);
  const imageEmbeddings = await Promise.all(
    skill.images.map(img => embedImage(img))
  );
  
  return combineEmbeddings(textEmbedding, imageEmbeddings);
}
```

### 9.2 Incremental Indexing

```javascript
// Re-indexar apenas skills modificadas
async function incrementalIndex() {
  const lastIndexTime = await getLastIndexTime();
  const modifiedSkills = await findModifiedSince(lastIndexTime);
  
  for (const skill of modifiedSkills) {
    await reindexSkill(skill);
  }
}
```

### 9.3 Cross-Skill Relationships

```javascript
// Grafo de relacionamentos entre skills
const skillGraph = {
  'react-hooks': {
    requires: ['javascript-basics'],
    enhances: ['react-components'],
    relatedTo: ['vue-composition', 'svelte-stores']
  }
};
```

---

*SPEC-004 | Vector DB + RAG | v1.0.0 | 2026-02-02*
