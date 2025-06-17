import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Research } from "@/components/Research";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | Tanish Patel",
  description:
    "Research papers authored by Tanish Patel on machine learning and related topics.",
};

export default function ResearchPage() {
  return (
    <Container>
      <span className="text-4xl">📄</span>
      <Heading className="font-black">Research Papers</Heading>
      <Paragraph className="max-w-xl mt-4">
        A collection of my research publications and technical papers.
      </Paragraph>
      <Research />
    </Container>
  );
}
