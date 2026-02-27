import { gateway, embed, embedMany } from "ai";

const EMBEDDING_MODEL = "openai/text-embedding-3-small";

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: gateway.embeddingModel(EMBEDDING_MODEL),
    values: texts,
  });
  return embeddings;
}

export async function embedQuery(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: gateway.embeddingModel(EMBEDDING_MODEL),
    value: text,
  });
  return embedding;
}
