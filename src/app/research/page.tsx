import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Metadata } from "next";
import { ResearchGrid } from "@/components/ResearchGrid";

export const metadata: Metadata = {
  title: "Research | Tanish Patel",
  description: "Research papers authored by Tanish Patel.",
};

export default function ResearchPage() {
  return (
    <Container>
      <span className="text-4xl">📚</span>
      <Heading className="font-black mb-10">Research Papers</Heading>
      <ResearchGrid />
    </Container>
  );
}
