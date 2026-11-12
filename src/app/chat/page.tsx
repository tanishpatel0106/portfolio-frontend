import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  getChatPlaceholders,
  getSuggestedQuestions,
} from "@/lib/portfolio-knowledge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask AI",
  description:
    "Ask an AI assistant anything about Tanish Patel: his work, research, projects, skills and interests. It answers from this site's content.",
};

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const initialQuestion = (Array.isArray(q) ? q[0] : q)?.slice(0, 500).trim() || undefined;

  return (
    <main className="flex h-[100dvh] flex-col overflow-hidden pt-[4.5rem]">
      <ChatInterface
        placeholders={getChatPlaceholders()}
        suggestedQuestions={getSuggestedQuestions()}
        initialQuestion={initialQuestion}
      />
    </main>
  );
}
