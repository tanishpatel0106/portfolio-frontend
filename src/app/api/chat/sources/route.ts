import { retrieveRelevantChunks } from "@/lib/rag/retrieval";

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query || typeof query !== "string") {
    return new Response(
      JSON.stringify({ error: "Query is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { sources } = await retrieveRelevantChunks(query, 8);

  return new Response(
    JSON.stringify({
      sources: sources.map((s, i) => ({
        index: i + 1,
        url: s.url,
        title: s.title,
        snippet: s.snippet,
      })),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
