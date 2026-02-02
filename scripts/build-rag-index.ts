/**
 * Build-time RAG Index Generator
 * 
 * This script crawls the portfolio website, extracts content, 
 * chunks it, generates embeddings, and outputs a JSON index.
 * 
 * Run with: npx tsx scripts/build-rag-index.ts
 */

import { embed, embedMany } from 'ai'
import * as fs from 'fs'
import * as path from 'path'

// Types
interface PageContent {
  url: string
  title: string
  sections: {
    heading: string
    content: string
  }[]
}

interface Chunk {
  chunk_id: string
  url: string
  title: string
  section_heading: string
  text: string
  embedding: number[]
}

interface RAGIndex {
  siteUrl: string
  builtAt: string
  chunks: Chunk[]
}

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://tanishpatel.vercel.app'
const MAX_CHUNK_TOKENS = 400
const CHUNK_OVERLAP = 50
const EMBEDDING_MODEL = 'openai/text-embedding-3-small'
const BATCH_SIZE = 20

// Patterns to skip
const SKIP_PATTERNS = [
  /\/api\//,
  /\/admin/,
  /\/auth/,
  /\.(png|jpg|jpeg|gif|svg|ico|webp|pdf|mp3|mp4|woff|woff2|ttf|eot)$/i,
  /\?/,
  /#/,
]

// URLs to always include (these are the main portfolio pages)
const KNOWN_PAGES = [
  '',
  '/about',
  '/projects',
  '/research',
  '/blog',
  '/contact',
  '/resume',
]

/**
 * Parse sitemap.xml and extract URLs
 */
async function parseSitemap(siteUrl: string): Promise<string[]> {
  try {
    const sitemapUrl = `${siteUrl}/sitemap.xml`
    console.log(`Fetching sitemap from ${sitemapUrl}...`)
    
    const response = await fetch(sitemapUrl, {
      headers: { 'User-Agent': 'RAG-Indexer/1.0' },
    })
    
    if (!response.ok) {
      console.log('Sitemap not found, falling back to known pages')
      return []
    }
    
    const xml = await response.text()
    const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g) || []
    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''))
    
    console.log(`Found ${urls.length} URLs in sitemap`)
    return urls
  } catch (error) {
    console.log('Error fetching sitemap, falling back to known pages')
    return []
  }
}

/**
 * Crawl internal links from a page
 */
async function crawlInternalLinks(siteUrl: string, visitedUrls: Set<string>): Promise<string[]> {
  const urls: string[] = []
  const baseHost = new URL(siteUrl).host
  
  // Start with known pages
  for (const pagePath of KNOWN_PAGES) {
    const fullUrl = `${siteUrl}${pagePath}`
    if (!visitedUrls.has(fullUrl)) {
      urls.push(fullUrl)
      visitedUrls.add(fullUrl)
    }
  }
  
  // Try to discover more pages by crawling the homepage
  try {
    const response = await fetch(siteUrl, {
      headers: { 'User-Agent': 'RAG-Indexer/1.0' },
    })
    
    if (response.ok) {
      const html = await response.text()
      const hrefMatches = html.match(/href="([^"]+)"/g) || []
      
      for (const match of hrefMatches) {
        const href = match.replace(/href="|"/g, '')
        let fullUrl: string
        
        if (href.startsWith('http')) {
          try {
            const urlObj = new URL(href)
            if (urlObj.host !== baseHost) continue // Skip external URLs
            fullUrl = href
          } catch {
            continue
          }
        } else if (href.startsWith('/')) {
          fullUrl = `${siteUrl}${href}`
        } else {
          continue
        }
        
        // Skip patterns
        if (SKIP_PATTERNS.some(pattern => pattern.test(fullUrl))) continue
        
        if (!visitedUrls.has(fullUrl)) {
          urls.push(fullUrl)
          visitedUrls.add(fullUrl)
        }
      }
    }
  } catch (error) {
    console.log('Error crawling homepage for links')
  }
  
  return urls
}

/**
 * Fetch and parse a page's content
 */
async function fetchPageContent(url: string): Promise<PageContent | null> {
  try {
    console.log(`Fetching: ${url}`)
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'RAG-Indexer/1.0' },
      signal: AbortSignal.timeout(10000),
    })
    
    if (!response.ok) {
      console.log(`  Skipped: HTTP ${response.status}`)
      return null
    }
    
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) {
      console.log(`  Skipped: Not HTML (${contentType})`)
      return null
    }
    
    const html = await response.text()
    
    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : url
    
    // Remove script, style, nav, header, footer, aside elements
    let cleanHtml = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
    
    // Try to extract main content
    const mainMatch = cleanHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    const articleMatch = cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    const contentHtml = mainMatch?.[1] || articleMatch?.[1] || cleanHtml
    
    // Parse sections based on headings
    const sections: { heading: string; content: string }[] = []
    
    // Split by h2 and h3 headings
    const headingRegex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi
    const parts = contentHtml.split(headingRegex)
    
    let currentHeading = 'Introduction'
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      
      // Check if this part is a heading
      if (i > 0 && i % 2 === 1) {
        currentHeading = stripHtml(part).trim() || 'Section'
        continue
      }
      
      const content = stripHtml(part).trim()
      if (content.length > 50) {
        sections.push({
          heading: currentHeading,
          content,
        })
      }
    }
    
    // If no sections found, create one from all content
    if (sections.length === 0) {
      const allContent = stripHtml(contentHtml).trim()
      if (allContent.length > 50) {
        sections.push({
          heading: 'Content',
          content: allContent,
        })
      }
    }
    
    console.log(`  Found ${sections.length} sections`)
    return { url, title, sections }
    
  } catch (error) {
    console.log(`  Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return null
  }
}

/**
 * Strip HTML tags and decode entities
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Estimate token count (rough approximation)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).length * 1.3)
}

/**
 * Chunk text into smaller pieces
 */
function chunkText(
  text: string,
  maxTokens: number,
  overlap: number
): string[] {
  const words = text.split(/\s+/)
  const chunks: string[] = []
  
  // Approximate words per chunk
  const wordsPerChunk = Math.floor(maxTokens / 1.3)
  const overlapWords = Math.floor(overlap / 1.3)
  
  let start = 0
  while (start < words.length) {
    const end = Math.min(start + wordsPerChunk, words.length)
    const chunk = words.slice(start, end).join(' ')
    
    if (chunk.trim().length > 20) {
      chunks.push(chunk.trim())
    }
    
    start = end - overlapWords
    if (start <= 0 || end === words.length) break
    if (end === words.length) break
  }
  
  // Handle case where we didn't get any chunks
  if (chunks.length === 0 && text.trim().length > 20) {
    chunks.push(text.trim())
  }
  
  return chunks
}

/**
 * Generate embeddings for chunks
 */
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = []
  
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE)
    console.log(`Generating embeddings for batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(texts.length / BATCH_SIZE)}...`)
    
    try {
      const result = await embedMany({
        model: EMBEDDING_MODEL,
        values: batch,
      })
      
      embeddings.push(...result.embeddings)
    } catch (error) {
      console.error('Error generating embeddings:', error)
      // Fill with empty embeddings on error
      for (let j = 0; j < batch.length; j++) {
        embeddings.push([])
      }
    }
  }
  
  return embeddings
}

/**
 * Main function to build the RAG index
 */
async function buildRAGIndex() {
  console.log('='.repeat(60))
  console.log('RAG Index Builder')
  console.log('='.repeat(60))
  console.log(`Site URL: ${SITE_URL}`)
  console.log('')
  
  // Collect URLs
  let urls = await parseSitemap(SITE_URL)
  
  if (urls.length === 0) {
    console.log('Falling back to link crawling...')
    const visited = new Set<string>()
    urls = await crawlInternalLinks(SITE_URL, visited)
  }
  
  // Filter URLs to same domain only
  const baseHost = new URL(SITE_URL).host
  urls = urls.filter(url => {
    try {
      const urlHost = new URL(url).host
      return urlHost === baseHost
    } catch {
      return false
    }
  })
  
  // Filter out skip patterns
  urls = urls.filter(url => !SKIP_PATTERNS.some(pattern => pattern.test(url)))
  
  console.log(`\nProcessing ${urls.length} URLs...`)
  console.log('')
  
  // Fetch all pages
  const pages: PageContent[] = []
  const failedUrls: string[] = []
  
  for (const url of urls) {
    const content = await fetchPageContent(url)
    if (content) {
      pages.push(content)
    } else {
      failedUrls.push(url)
    }
  }
  
  console.log(`\nSuccessfully fetched ${pages.length} pages`)
  if (failedUrls.length > 0) {
    console.log(`Failed to fetch ${failedUrls.length} URLs:`)
    failedUrls.forEach(url => console.log(`  - ${url}`))
  }
  
  // Create chunks
  console.log('\nChunking content...')
  const allChunks: Omit<Chunk, 'embedding'>[] = []
  let chunkId = 0
  
  for (const page of pages) {
    for (const section of page.sections) {
      const textChunks = chunkText(section.content, MAX_CHUNK_TOKENS, CHUNK_OVERLAP)
      
      for (const text of textChunks) {
        allChunks.push({
          chunk_id: `chunk_${chunkId++}`,
          url: page.url,
          title: page.title,
          section_heading: section.heading,
          text,
        })
      }
    }
  }
  
  console.log(`Created ${allChunks.length} chunks`)
  
  // Generate embeddings
  console.log('\nGenerating embeddings...')
  const texts = allChunks.map(chunk => chunk.text)
  const embeddings = await generateEmbeddings(texts)
  
  // Combine chunks with embeddings
  const chunks: Chunk[] = allChunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i] || [],
  }))
  
  // Create index
  const index: RAGIndex = {
    siteUrl: SITE_URL,
    builtAt: new Date().toISOString(),
    chunks,
  }
  
  // Write to file
  const outputDir = path.join(process.cwd(), 'rag')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'rag_index.json')
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2))
  
  console.log('\n' + '='.repeat(60))
  console.log('RAG Index Build Complete')
  console.log('='.repeat(60))
  console.log(`Output: ${outputPath}`)
  console.log(`Total chunks: ${chunks.length}`)
  console.log(`Pages indexed: ${pages.length}`)
  console.log(`Build time: ${index.builtAt}`)
  console.log('')
}

// Run
buildRAGIndex().catch(console.error)
