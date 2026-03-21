import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat About Me | Tanish Patel",
  description:
    "Ask an AI assistant anything about Tanish Patel — his work, research, projects, skills, and interests.",
};

export default function ChatPage() {
  return (
    <Container>
      <span className="text-4xl">🤖</span>
      <Heading className="font-black">Chat About Me</Heading>
      <Paragraph className="mt-4 max-w-xl">
        Curious about my work, research, or what I&apos;m building? Ask the AI
        assistant below — it knows all about me. It even shows you its thinking
        process!
      </Paragraph>
      <div className="mt-8">
        <ChatInterface />
      </div>
    </Container>
  );
}
