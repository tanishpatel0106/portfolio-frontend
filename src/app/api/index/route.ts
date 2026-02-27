import { NextRequest, NextResponse } from "next/server";
import { crawlSite } from "@/lib/rag/crawler";
import { extractContent } from "@/lib/rag/extractor";
import { chunkContent } from "@/lib/rag/chunker";
import { embedTexts } from "@/lib/rag/embeddings";
import { upsertChunks, removeStaleChunks } from "@/lib/rag/store";
import { initializeDatabase } from "@/lib/db/connection";

export const maxDuration = 300; // 5 minutes for Vercel

export async function POST(request: NextRequest) {
  // Verify secret token
  const authHeader = request.headers.get("authorization");
  const indexingSecret = process.env.INDEXING_SECRET;

  if (!indexingSecret) {
    return NextResponse.json(
      { error: "INDEXING_SECRET not configured on server" },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${indexingSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const baseUrl = process.env.SITE_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "SITE_BASE_URL not configured" },
      { status: 500 }
    );
  }

  try {
    // Initialize database tables
    await initializeDatabase();

    // Step 1: Crawl the site
    const pages = await crawlSite(baseUrl);
    if (pages.length === 0) {
      return NextResponse.json(
        { error: "No pages were crawled. Check SITE_BASE_URL." },
        { status: 400 }
      );
    }

    // Step 2: Extract and chunk content
    const allChunks = [];
    const activeUrls: string[] = [];

    for (const page of pages) {
      const extracted = extractContent(page.url, page.html);
      const chunks = chunkContent(extracted);
      allChunks.push(...chunks);
      if (!activeUrls.includes(extracted.url)) {
        activeUrls.push(extracted.url);
      }
    }

    if (allChunks.length === 0) {
      return NextResponse.json(
        { error: "No content chunks extracted from crawled pages." },
        { status: 400 }
      );
    }

    // Step 3: Generate embeddings in batches
    const texts = allChunks.map((c) => `${c.title} - ${c.headingPath}\n${c.content}`);
    const embeddings = await embedTexts(texts);

    // Step 4: Upsert into database
    const stats = await upsertChunks(allChunks, embeddings);

    // Step 5: Remove stale chunks from pages that no longer exist
    const removedCount = await removeStaleChunks(activeUrls);

    return NextResponse.json({
      success: true,
      stats: {
        pagesCrawled: pages.length,
        totalChunks: allChunks.length,
        inserted: stats.inserted,
        updated: stats.updated,
        unchanged: stats.unchanged,
        staleRemoved: removedCount,
      },
    });
  } catch (error) {
    console.error("Indexing error:", error);
    const message = error instanceof Error ? error.message : "Unknown error during indexing";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
