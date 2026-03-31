import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";
import { ResearchCarousel } from "@/components/ResearchCarousel";
import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";

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
      <section className="relative mt-10 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/70">
        <div className="absolute inset-0">
          <WebcamPixelGrid
            gridCols={48}
            gridRows={32}
            maxElevation={12}
            motionSensitivity={0.35}
            elevationSmoothing={0.15}
            colorMode="monochrome"
            monochromeColor="#60a5fa"
            backgroundColor="#f8fafc"
            mirror={true}
            gapRatio={0.08}
            invertColors={false}
            darken={0.1}
            borderColor="#94a3b8"
            borderOpacity={0.08}
            className="h-full w-full"
          />
        </div>
        <div className="relative z-10 flex min-h-[320px] flex-col justify-end gap-3 p-8 sm:p-10">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Live background
          </span>
          <Heading as="h2" className="text-2xl font-black md:text-3xl">
            A subtle, interactive backdrop.
          </Heading>
          <Paragraph className="max-w-xl text-sm text-neutral-600 sm:text-base">
            A webcam-powered pixel grid adds motion and depth while keeping the
            page clean and light.
          </Paragraph>
        </div>
      </section>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Explore My Research
      </Heading>
      <ResearchCarousel />
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        What I&apos;ve been working on
      </Heading>
      <FeatureGrid />
      <TechStack />
    </Container>
  );
}
