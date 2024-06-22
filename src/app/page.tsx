import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">Hello there! I&apos;m Tanish</Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m an AI Developer that loves{" "}
        <Highlight>building products</Highlight> and solutions that can impact a solution to the community.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a Junior AI Engineer with{" "}
        <Highlight>2 years of experience</Highlight> building scalable AI and ML based solutions for all kinds of organisations and needs
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
