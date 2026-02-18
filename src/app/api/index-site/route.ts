import { crawlSite } from "@/lib/rag/crawler";
import { chunkPages } from "@/lib/rag/chunker";
import { indexChunks } from "@/lib/rag/embeddings";
import { getChunkCount } from "@/lib/db";

export async function POST(req: Request) {
  // Protect with secret
  const authHeader = req.headers.get("authorization");
  const expectedSecret = process.env.INDEXING_SECRET;

  if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const baseUrl =
      process.env.SITE_BASE_URL || "https://tanishpatel.dev";

    // Step 1: Crawl
    const pages = await crawlSite(baseUrl);

    // Step 2: Chunk
    const chunks = await chunkPages(pages);

    // Step 3: Embed + upsert
    const results = await indexChunks(chunks);

    // Summary
    const totalIndexed = results.reduce(
      (sum, r) => sum + r.chunksIndexed,
      0
    );
    const totalSkipped = results.reduce(
      (sum, r) => sum + r.chunksSkipped,
      0
    );
    const totalDeleted = results.reduce(
      (sum, r) => sum + r.chunksDeleted,
      0
    );
    const totalChunksInDb = await getChunkCount();

    return new Response(
      JSON.stringify({
        success: true,
        summary: {
          pagesCrawled: pages.length,
          totalChunks: chunks.length,
          chunksIndexed: totalIndexed,
          chunksSkipped: totalSkipped,
          chunksDeleted: totalDeleted,
          totalChunksInDb,
        },
        perPage: results,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Indexing failed", details: message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
