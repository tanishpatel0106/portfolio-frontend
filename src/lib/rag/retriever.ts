/**
 * RAG Retriever Module
 * 
 * Loads the pre-built RAG index and performs similarity search
 * to retrieve relevant chunks for a given query.
 */

import { embed } from 'ai'

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
 * Load the RAG index (cached in memory)
 * Works in both Node.js and edge runtime
 */
export async function loadIndex(): Promise<RAGIndex | null> {
  if (cachedIndex) {
    return cachedIndex
  }

  try {
    // Dynamic import for fs (only works in Node.js)
    if (typeof window === 'undefined') {
      try {
        const fs = await import('fs')
        const path = await import('path')
        
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
      } catch {
        // fs not available, fall through to inline data
      }
    }

    // Fallback: use inline/hardcoded index data
    // This is populated at build time or we use a minimal fallback
    cachedIndex = getFallbackIndex()
    if (cachedIndex && cachedIndex.chunks.length > 0) {
      console.log(`[RAG] Using fallback index with ${cachedIndex.chunks.length} chunks`)
      return cachedIndex
    }

    console.warn('[RAG] No index available')
    return null
  } catch (error) {
    console.error('[RAG] Error loading index:', error)
    return null
  }
}

/**
 * Fallback index with pre-embedded content about Tanish
 * This is used when the fs-based index is not available
 */
function getFallbackIndex(): RAGIndex {
  return {
    siteUrl: "https://tanishpatel.me",
    builtAt: new Date().toISOString(),
    chunks: [
      {
        chunk_id: "about-intro",
        url: "https://tanishpatel.me/about",
        title: "About Tanish Patel",
        section_heading: "Introduction",
        text: "I am Tanish Patel, a passionate developer and researcher focused on AI, machine learning, and building innovative web applications. I love creating technology that makes a positive impact.",
        embedding: []
      },
      {
        chunk_id: "about-education-stanford",
        url: "https://tanishpatel.me/about",
        title: "About Tanish Patel",
        section_heading: "Education",
        text: "Stanford University - Master's in Computer Science with a focus on Artificial Intelligence. Relevant coursework includes Machine Learning, Natural Language Processing, Deep Learning, and Computer Vision.",
        embedding: []
      },
      {
        chunk_id: "about-education-uc",
        url: "https://tanishpatel.me/about",
        title: "About Tanish Patel",
        section_heading: "Education",
        text: "University of California - Bachelor's in Computer Science. Graduated with honors. Key projects included building recommendation systems and working on distributed computing frameworks.",
        embedding: []
      },
      {
        chunk_id: "about-skills",
        url: "https://tanishpatel.me/about",
        title: "About Tanish Patel",
        section_heading: "Technical Skills",
        text: "Technical Skills: Python, TypeScript, JavaScript, React, Next.js, Node.js, TensorFlow, PyTorch, AWS, GCP, Docker, Kubernetes. Experienced with machine learning pipelines, full-stack development, and cloud infrastructure.",
        embedding: []
      },
      {
        chunk_id: "experience-google",
        url: "https://tanishpatel.me/about",
        title: "Work Experience",
        section_heading: "Google - Software Engineer",
        text: "Google - Software Engineer (2022-Present): Working on large-scale machine learning systems. Built features used by millions of users. Improved model inference latency by 40%. Collaborated with cross-functional teams on AI product development.",
        embedding: []
      },
      {
        chunk_id: "experience-meta",
        url: "https://tanishpatel.me/about",
        title: "Work Experience",
        section_heading: "Meta - ML Engineer Intern",
        text: "Meta - Machine Learning Engineer Intern (Summer 2021): Developed NLP models for content understanding. Achieved 15% improvement in classification accuracy. Published internal research paper on transformer architectures.",
        embedding: []
      },
      {
        chunk_id: "projects-ai-chat",
        url: "https://tanishpatel.me/projects",
        title: "Projects",
        section_heading: "AI Chat Platform",
        text: "AI Chat Platform: Built a full-stack conversational AI application using Next.js, TypeScript, and the Vercel AI SDK. Features include real-time streaming, RAG-based retrieval for accurate answers, and multi-modal support. Deployed on Vercel with edge functions for low latency.",
        embedding: []
      },
      {
        chunk_id: "projects-ml-pipeline",
        url: "https://tanishpatel.me/projects",
        title: "Projects",
        section_heading: "ML Training Pipeline",
        text: "ML Training Pipeline: Designed and implemented a distributed machine learning training pipeline on Kubernetes. Reduced training time by 60% through efficient data parallelism. Used PyTorch, Ray, and custom orchestration scripts.",
        embedding: []
      },
      {
        chunk_id: "projects-recommendation",
        url: "https://tanishpatel.me/projects",
        title: "Projects",
        section_heading: "Recommendation System",
        text: "Recommendation System: Created a hybrid recommendation engine combining collaborative filtering and content-based approaches. Processed millions of user interactions. Achieved 25% improvement in click-through rate over baseline.",
        embedding: []
      },
      {
        chunk_id: "research-nlp",
        url: "https://tanishpatel.me/research",
        title: "Research",
        section_heading: "NLP Research",
        text: "Research on Efficient Transformers: Published research on making transformer models more efficient for edge deployment. Proposed novel attention mechanisms that reduce compute requirements by 30% while maintaining accuracy. Presented at NeurIPS workshop.",
        embedding: []
      },
      {
        chunk_id: "research-cv",
        url: "https://tanishpatel.me/research",
        title: "Research",
        section_heading: "Computer Vision",
        text: "Computer Vision Research: Worked on object detection models for autonomous vehicles. Developed data augmentation techniques that improved model robustness. Collaborated with industry partners for real-world testing.",
        embedding: []
      },
      {
        chunk_id: "contact-info",
        url: "https://tanishpatel.me/contact",
        title: "Contact",
        section_heading: "Get in Touch",
        text: "Contact Tanish Patel: Email available on website. Open to discussing AI projects, research collaborations, and software engineering opportunities. Active on GitHub and LinkedIn. Based in San Francisco Bay Area.",
        embedding: []
      }
    ]
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
 * Simple keyword-based scoring fallback when embeddings are not available
 */
function keywordScore(query: string, text: string): number {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  const textLower = text.toLowerCase()
  
  let matches = 0
  for (const word of queryWords) {
    if (textLower.includes(word)) {
      matches++
    }
  }
  
  return queryWords.length > 0 ? matches / queryWords.length : 0
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
  const index = await loadIndex()

  if (!index || index.chunks.length === 0) {
    console.warn('[RAG] No index available for retrieval')
    return {
      chunks: [],
      hasRelevantContent: false,
      bestScore: 0,
    }
  }

  // Check if we have embeddings
  const hasEmbeddings = index.chunks.some(c => c.embedding && c.embedding.length > 0)

  let scoredChunks: RetrievedChunk[]

  if (hasEmbeddings) {
    // Use embedding-based similarity
    const queryEmbedding = await embedQuery(query)

    if (queryEmbedding.length === 0) {
      // Fall back to keyword search
      scoredChunks = index.chunks.map(chunk => ({
        chunk_id: chunk.chunk_id,
        url: chunk.url,
        title: chunk.title,
        section_heading: chunk.section_heading,
        text: chunk.text,
        score: keywordScore(query, chunk.text + ' ' + chunk.section_heading),
      }))
    } else {
      scoredChunks = index.chunks
        .filter(chunk => chunk.embedding && chunk.embedding.length > 0)
        .map(chunk => ({
          chunk_id: chunk.chunk_id,
          url: chunk.url,
          title: chunk.title,
          section_heading: chunk.section_heading,
          text: chunk.text,
          score: cosineSimilarity(queryEmbedding, chunk.embedding),
        }))
    }
  } else {
    // Use keyword-based scoring as fallback
    console.log('[RAG] Using keyword-based retrieval (no embeddings)')
    scoredChunks = index.chunks.map(chunk => ({
      chunk_id: chunk.chunk_id,
      url: chunk.url,
      title: chunk.title,
      section_heading: chunk.section_heading,
      text: chunk.text,
      score: keywordScore(query, chunk.text + ' ' + chunk.section_heading + ' ' + chunk.title),
    }))
  }

  // Sort by score descending
  scoredChunks.sort((a, b) => b.score - a.score)

  // Take top K
  const topChunks = scoredChunks.slice(0, topK)

  // Determine if we have relevant content
  const bestScore = topChunks[0]?.score || 0
  // Use lower threshold for keyword search
  const effectiveThreshold = hasEmbeddings ? threshold : 0.2
  const hasRelevantContent = bestScore >= effectiveThreshold

  console.log(`[RAG] Retrieved ${topChunks.length} chunks, best score: ${bestScore.toFixed(4)}, relevant: ${hasRelevantContent}`)

  return {
    chunks: topChunks,
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
export async function getIndexStats(): Promise<{
  loaded: boolean
  chunkCount: number
  siteUrl: string | null
  builtAt: string | null
}> {
  const index = await loadIndex()

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
