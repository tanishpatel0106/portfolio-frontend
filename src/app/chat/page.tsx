import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  getChatPlaceholders,
  getSuggestedQuestions,
} from "@/lib/portfolio-knowledge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat About Me | Tanish Patel",
  description:
    "Ask an AI assistant anything about Tanish Patel — his work, research, projects, skills, and interests.",
};

export default function ChatPage() {
  const placeholders = getChatPlaceholders();
  const suggestedQuestions = getSuggestedQuestions();

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden pt-20">
      <ChatInterface
        placeholders={placeholders}
        suggestedQuestions={suggestedQuestions}
      />
    </div>
  );
}
