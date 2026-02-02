/**
 * RAG Retriever Module
 * 
 * Loads the pre-built RAG index and performs similarity search
 * to retrieve relevant chunks for a given query.
 */

import { embed } from 'ai'
import * as fs from 'fs'
import * as path from 'path'

// Types
export interface Chunk {
  chunk_id: string
  url: string
  title: string
  section_heading: string
  text: string
  embedding: number[]
}

export interface RAGIndex {
  siteUrl: string
  builtAt: string
  chunks: Chunk[]
}

export interface RetrievedChunk {
  chunk_id: string
  url: string
  title: string
  section_heading: string
  text: string
  score: number
}

// Configuration
const EMBEDDING_MODEL = 'openai/text-embedding-3-small'
const TOP_K = 10
const RELEVANCE_THRESHOLD = 0.25

// Global cache for the index
let cachedIndex: RAGIndex | null = null

/**
 * Load the RAG index from disk (cached in memory)
 */
export function loadIndex(): RAGIndex | null {
  if (cachedIndex) {
    return cachedIndex
  }

  try {
    // Try multiple possible paths
    const possiblePaths = [
      path.join(process.cwd(), 'rag', 'rag_index.json'),
      path.join(process.cwd(), '.next', 'rag', 'rag_index.json'),
      path.join(process.cwd(), 'public', 'rag', 'rag_index.json'),
    ]

    for (const indexPath of possiblePaths) {
      if (fs.existsSync(indexPath)) {
        console.log(`[RAG] Loading index from ${indexPath}`)
        const data = fs.readFileSync(indexPath, 'utf-8')
        cachedIndex = JSON.parse(data) as RAGIndex
        console.log(`[RAG] Loaded ${cachedIndex.chunks.length} chunks from index`)
        return cachedIndex
      }
    }

    console.warn('[RAG] Index file not found')
    return null
  } catch (error) {
    console.error('[RAG] Error loading index:', error)
    return null
  }
}

/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) {
    return 0
  }

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB)
  if (magnitude === 0) return 0

  return dotProduct / magnitude
}

/**
 * Generate embedding for a query
 */
async function embedQuery(query: string): Promise<number[]> {
  try {
    const result = await embed({
      model: EMBEDDING_MODEL,
      value: query,
    })
    return result.embedding
  } catch (error) {
    console.error('[RAG] Error generating query embedding:', error)
    return []
  }
}

/**
 * Retrieve relevant chunks for a query
 */
export async function retrieveChunks(
  query: string,
  topK: number = TOP_K,
  threshold: number = RELEVANCE_THRESHOLD
): Promise<{
  chunks: RetrievedChunk[]
  hasRelevantContent: boolean
  bestScore: number
}> {
  const index = loadIndex()

  if (!index || index.chunks.length === 0) {
    console.warn('[RAG] No index available for retrieval')
    return {
      chunks: [],
      hasRelevantContent: false,
      bestScore: 0,
    }
  }

  // Generate query embedding
  const queryEmbedding = await embedQuery(query)

  if (queryEmbedding.length === 0) {
    return {
      chunks: [],
      hasRelevantContent: false,
      bestScore: 0,
    }
  }

  // Compute similarity scores for all chunks
  const scoredChunks: (RetrievedChunk & { embedding: number[] })[] = index.chunks
    .filter(chunk => chunk.embedding && chunk.embedding.length > 0)
    .map(chunk => ({
      chunk_id: chunk.chunk_id,
      url: chunk.url,
      title: chunk.title,
      section_heading: chunk.section_heading,
      text: chunk.text,
      embedding: chunk.embedding,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))

  // Sort by score descending
  scoredChunks.sort((a, b) => b.score - a.score)

  // Take top K
  const topChunks = scoredChunks.slice(0, topK)

  // Determine if we have relevant content
  const bestScore = topChunks[0]?.score || 0
  const hasRelevantContent = bestScore >= threshold

  // Return without embeddings
  const result: RetrievedChunk[] = topChunks.map(({ embedding, ...chunk }) => chunk)

  console.log(`[RAG] Retrieved ${result.length} chunks, best score: ${bestScore.toFixed(4)}, relevant: ${hasRelevantContent}`)

  return {
    chunks: result,
    hasRelevantContent,
    bestScore,
  }
}

/**
 * Format retrieved chunks as context for the LLM
 */
export function formatChunksAsContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) {
    return 'No relevant sources found.'
  }

  return chunks
    .map((chunk, i) => {
      return `[SOURCE ${i + 1}]
Chunk ID: ${chunk.chunk_id}
URL: ${chunk.url}
Title: ${chunk.title}
Section: ${chunk.section_heading}
Relevance Score: ${chunk.score.toFixed(4)}

Content:
${chunk.text}

---`
    })
    .join('\n\n')
}

/**
 * Create a citation from a chunk
 */
export function createCitation(chunk: RetrievedChunk): {
  chunk_id: string
  url: string
  title: string
  section_heading: string
  snippet: string
} {
  // Create a short snippet (first 150 chars)
  const snippet = chunk.text.length > 150
    ? chunk.text.substring(0, 150).trim() + '...'
    : chunk.text

  return {
    chunk_id: chunk.chunk_id,
    url: chunk.url,
    title: chunk.title,
    section_heading: chunk.section_heading,
    snippet,
  }
}

/**
 * Get index stats
 */
export function getIndexStats(): {
  loaded: boolean
  chunkCount: number
  siteUrl: string | null
  builtAt: string | null
} {
  const index = loadIndex()

  if (!index) {
    return {
      loaded: false,
      chunkCount: 0,
      siteUrl: null,
      builtAt: null,
    }
  }

  return {
    loaded: true,
    chunkCount: index.chunks.length,
    siteUrl: index.siteUrl,
    builtAt: index.builtAt,
  }
}
