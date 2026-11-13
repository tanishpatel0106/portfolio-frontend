import { Metadata } from "next";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Eyebrow, Shell } from "@/components/shared/primitives";
import { getProjects, toCard } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Tanish Patel: trading research tools, agentic analytics, forecasting platforms and applied machine learning, each with a full write-up.",
};

// Small, optimized versions of the screenshots for the decorative wall.
const wallImage = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;

export default function Projects() {
  const projects = getProjects();
  const wall = projects.flatMap((p) => p.images.slice(0, 2)).slice(0, 28).map(wallImage);
  const demoCount = projects.filter((p) => p.live || p.video).length;

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        {/* Aceternity 3D Marquee built from the project screenshots (decorative). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] opacity-60 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:block"
        >
          <ThreeDMarquee images={wall} className="h-full rounded-none" />
        </div>
        <Shell className="relative pb-16 pt-36 md:pb-20 md:pt-44">
          <Eyebrow className="flex items-center gap-2">
            <span className="text-brand">Work</span>
            <span aria-hidden>/</span>
            {projects.length} projects{demoCount > 0 && ` · ${demoCount} with demos`}
          </Eyebrow>
          <h1 className="mt-4 max-w-2xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Things I’ve{" "}
            <span className="font-display font-normal italic text-brand">built</span> and shipped
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Trading research tools, agentic analytics, forecasting platforms
            and applied ML. Every project has a full write-up; some you can run or watch.
          </p>
        </Shell>
      </section>

      <Shell as="section" className="py-12">
        <ProjectsExplorer projects={projects.map(toCard)} />
      </Shell>
    </main>
  );
}
