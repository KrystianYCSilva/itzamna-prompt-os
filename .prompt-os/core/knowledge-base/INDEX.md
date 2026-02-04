# .prompt-os/core/knowledge-base/INDEX.md - RAG Implementation Guide

> **Retrieval-Augmented Generation (RAG): Vector-based knowledge retrieval without hallucination.**  
> This subdirectory implements the RAG algorithms referenced in `KNOWLEDGE-BASE.md`.

---

## What is RAG?

RAG = **Retrieval-Augmented Generation**

Instead of relying purely on training data (which causes hallucinations), RAG:
1. **Retrieves** relevant documents from a knowledge base using vector similarity
2. **Ranks** them by relevance and confidence
3. **Filters** duplicate or low-quality results
4. **Augments** the LLM prompt with these documents
5. **Generates** accurate answers based on retrieved facts

**This subdirectory** contains the 4 implementation files needed to build a RAG system.

---

## The 4 RAG Implementation Files

### **1. rag-workflow.md** - Main RAG Workflow

**Purpose:** The complete end-to-end RAG pipeline.

**What it covers:**
- Input preprocessing (tokenization, cleaning)
- Vector embedding (convert text → vectors)
- Similarity search (find relevant documents)
- Ranking and reranking
- Deduplication
- Prompt augmentation
- Output generation

**When to use:** Understanding the overall RAG process; implementing a new RAG system.

**Lines:** ~400 | **Size:** ~12KB

---

### **2. relationship-map.md** - Knowledge Graph & Entity Relationships

**Purpose:** Structure knowledge as interconnected entities; link related concepts.

**What it covers:**
- Entity extraction from documents
- Relationship classification (cause/effect, similarity, hierarchy)
- Knowledge graph construction
- Entity linking and disambiguation
- Cross-document connections
- Graph traversal for context expansion

**When to use:** When you need to understand connections between documents; build knowledge graphs; expand context with related entities.

**Lines:** ~500 | **Size:** ~15KB

---

### **3. similarity-scoring.md** - Vector Similarity & Ranking Algorithms

**Purpose:** Measure document relevance using vector math.

**What it covers:**
- Embedding models (choice of model affects quality)
- Cosine similarity, Euclidean distance, dot product
- BM25 algorithm (traditional ranking)
- Semantic vs. lexical similarity
- Multi-stage ranking (retrieval + reranking)
- Confidence scoring (how sure are we?)
- Threshold tuning (how relevant is "relevant enough?")

**When to use:** Tuning retrieval quality; choosing embedding models; debugging poor search results.

**Lines:** ~450 | **Size:** ~13KB

---

### **4. redundancy-gate.md** - Deduplication & Filtering

**Purpose:** Remove duplicate, near-duplicate, and low-quality documents.

**What it covers:**
- Exact duplicate detection (hash-based)
- Fuzzy duplicate detection (similarity threshold)
- Quality filtering (length, readability, completeness)
- Diversity sampling (avoid too-similar results)
- Conflict detection (contradictory sources)
- Result summarization (compress large result sets)

**When to use:** Cleaning RAG results; removing noise; ensuring quality output.

**Lines:** ~300 | **Size:** ~9KB

---

## Recommended Reading Order

```
1. rag-workflow.md          → Understand the overall pipeline
2. relationship-map.md      → Learn how to structure knowledge
3. similarity-scoring.md    → Master the ranking algorithms
4. redundancy-gate.md       → Clean and filter results
```

This order takes you from **big picture → implementation details → optimization**.

---

## When to Use Each File

| Task | Read |
|------|------|
| "How does RAG work?" | rag-workflow.md |
| "How do I structure knowledge?" | relationship-map.md |
| "Why is this document ranked #1?" | similarity-scoring.md |
| "How do I remove duplicates?" | redundancy-gate.md |
| "How do I implement RAG from scratch?" | All 4 files (in order) |
| "My retrieval quality is poor" | similarity-scoring.md + redundancy-gate.md |
| "I need to link related documents" | relationship-map.md |
| "I'm getting redundant results" | redundancy-gate.md |

---

## Key Concepts

### Vector Embeddings

Text is converted to numbers (vectors) that capture semantic meaning:
- Similar documents have similar vectors
- Distance between vectors = relevance difference
- Chosen embedding model affects quality (e.g., OpenAI's ada, BERT, custom)

### Retrieval vs. Generation

- **Retrieval** = Find relevant documents (this subdirectory)
- **Generation** = Create new text based on those documents (handled by LLM)

This subdirectory focuses on **retrieval quality** - the better your retrieval, the better your generated answers.

### The RAG Advantage

| Without RAG | With RAG |
|-------------|----------|
| "What's the capital of France?" → Hallucinates based on training data | Retrieves Wikipedia article → "Paris" ✅ |
| Up-to-date? Only if trained recently | Always up-to-date (pulls from current docs) |
| Source verification? No | Can cite exact documents |
| Customizable? Hard (retrain model) | Easy (swap knowledge base) |

---

## Integration with Core Protocols

This subdirectory implements **KNOWLEDGE-BASE.md** (Protocol 5):

- **INPUT-CLASSIFIER.md** → Routes "knowledge retrieval" requests here
- **JIT-PROTOCOL.md** → Loads rag-workflow.md + relevant similarity algorithm
- **SELF-CRITIQUE.md** → Evaluates retrieval quality (did we get relevant docs?)
- **MEMORY-MANAGEMENT.md** → Stores retrieved documents + search logs

---

## File Structure

```
.prompt-os/core/knowledge-base/
├── INDEX.md                     # ← YOU ARE HERE
├── rag-workflow.md              # The complete pipeline
├── relationship-map.md          # Knowledge graph & entity linking
├── similarity-scoring.md        # Vector similarity algorithms
└── redundancy-gate.md           # Deduplication & filtering
```

---

## Statistics

| File | Lines | Size | Purpose |
|------|-------|------|---------|
| rag-workflow.md | ~400 | ~12KB | Overall pipeline |
| relationship-map.md | ~500 | ~15KB | Entity relationships |
| similarity-scoring.md | ~450 | ~13KB | Ranking algorithms |
| redundancy-gate.md | ~300 | ~9KB | Deduplication |
| **TOTAL** | **1,650** | **49KB** | **RAG implementation** |

---

## Related Files

### In this system
- **Parent**: [../KNOWLEDGE-BASE.md](../KNOWLEDGE-BASE.md) (protocol overview)
- **Related protocols**: [../JIT-PROTOCOL.md](../JIT-PROTOCOL.md), [../SELF-CRITIQUE.md](../SELF-CRITIQUE.md)
- **Index of all subdirs**: [../INDEX.md](../INDEX.md)

### In other subdirectories
- **Web research sources**: [../web-research/](../web-research/) (tier classification + validation)
- **Persona triggers**: [../persona-generator/](../persona-generator/) (use RAG to find personality matches)

---

## Quick Tips

### Best Practices for RAG

1. **Use domain-specific embeddings** (legal docs → legal embeddings)
2. **Multi-stage ranking** (fast retrieval + slow reranking)
3. **Measure retrieval quality** separately from generation quality
4. **Update knowledge base regularly** (stale docs hurt quality)
5. **Use multiple retrieval strategies** (vector + keyword search)

### Common Problems & Solutions

| Problem | Solution |
|---------|----------|
| "Getting irrelevant results" | Tune similarity threshold in similarity-scoring.md |
| "Getting duplicate results" | Increase dedup threshold in redundancy-gate.md |
| "Missing relevant documents" | Improve entity linking in relationship-map.md |
| "Answer quality is poor" | Check retrieval quality first (RAG) before blaming LLM |
| "Slow retrieval" | Use approximate nearest neighbor (ANN) in similarity-scoring.md |

---

## Next Steps

1. **New to RAG?** → Start with rag-workflow.md
2. **Implementing RAG?** → Read all 4 files in recommended order
3. **Optimizing retrieval?** → Jump to similarity-scoring.md or redundancy-gate.md
4. **Building knowledge graphs?** → Focus on relationship-map.md

---

*Last Updated: 2026-02-03 23:15:53*  
*Status: Production Ready*  
*For maintenance, see [../docs/INDEX-MAINTENANCE.md](../docs/INDEX-MAINTENANCE.md)*
