/**
 * RAG Chat API Route
 * 
 * Handles chat requests with RAG-based retrieval for grounded answers.
 * Uses streaming responses with the Vercel AI SDK.
 */

import {
  streamText,
  convertToModelMessages,
  UIMessage,
} from 'ai'
import {
  retrieveChunks,
  formatChunksAsContext,
  createCitation,
  type RetrievedChunk,
} from '@/lib/rag/retriever'

export const maxDuration = 30

// Simple in-memory rate limiter (use KV store in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 20 // requests per window
const RATE_WINDOW = 60 * 1000 // 1 minute in ms

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: RATE_LIMIT - entry.count }
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return 'unknown'
}

// Extract text from UIMessage parts
function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(req)
    const { allowed, remaining } = checkRateLimit(clientIP)

    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          },
        }
      )
    }

    // Parse request
    const body = await req.json()
    const messages: UIMessage[] = body.messages || []
    const recruiterMode: boolean = body.recruiterMode || false

    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No messages provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get the latest user message for retrieval
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
    const query = lastUserMessage ? getMessageText(lastUserMessage) : ''

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'No user message found' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Retrieve relevant chunks
    const { chunks, hasRelevantContent, bestScore } = await retrieveChunks(query)

    // Build system prompt based on mode and relevance
    const systemPrompt = buildSystemPrompt(chunks, hasRelevantContent, recruiterMode)

    // Stream response
    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 1024,
      temperature: 0.3,
      abortSignal: req.signal,
    })

    // Create response with citations in headers
    const citations = chunks.slice(0, 5).map(createCitation)

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      headers: {
        'X-RateLimit-Remaining': remaining.toString(),
        'X-Citations': encodeURIComponent(JSON.stringify(citations)),
        'X-Has-Relevant-Content': hasRelevantContent.toString(),
        'X-Best-Score': bestScore.toFixed(4),
      },
    })
  } catch (error) {
    console.error('[Chat API] Error:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

function buildSystemPrompt(
  chunks: RetrievedChunk[],
  hasRelevantContent: boolean,
  recruiterMode: boolean
): string {
  const baseInstructions = `You are Tanish Patel's portfolio assistant. Your ONLY job is to answer questions about Tanish based on the provided sources from his website.

CRITICAL RULES:
1. ONLY answer using information from the SOURCES provided below
2. If the answer is not supported by the sources, respond: "I don't have information about that based on my site content."
3. NEVER make up facts or add information not in the sources
4. Keep answers concise and focused
5. When citing information, naturally reference where it came from (e.g., "According to Tanish's work history..." or "In his research on...")

${recruiterMode ? `
RECRUITER MODE ENABLED - Format your response as follows:
- Use bullet points for key information
- Lead with metrics and quantifiable achievements
- Include a "Relevant Projects" section with project names and links when applicable
- Highlight technical skills and technologies
- Be direct and professional
` : `
Format your responses naturally and conversationally, but stay focused and concise.
`}

After your answer, you MUST include a JSON citations block on a new line in exactly this format:
\`\`\`citations
[{"chunk_id": "...", "url": "...", "title": "...", "section_heading": "...", "snippet": "..."}]
\`\`\`

Include 2-5 citations from the sources you actually used.`

  if (!hasRelevantContent || chunks.length === 0) {
    return `${baseInstructions}

SOURCES:
No relevant sources found for this query.

Since no relevant sources were found, respond: "I don't have information about that based on my site content. Feel free to ask about Tanish's projects, research, work experience, education, or skills!"`
  }

  const sourcesContext = formatChunksAsContext(chunks)

  return `${baseInstructions}

SOURCES:
${sourcesContext}`
}
