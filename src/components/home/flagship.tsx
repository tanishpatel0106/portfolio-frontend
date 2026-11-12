import Image from "next/image";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { VideoPlayer } from "@/components/shared/video-player";
import { ArrowLink, Eyebrow } from "@/components/shared/primitives";
import type { Project } from "@/lib/projects";

/** The one big scroll moment: the lead project tilts up into view (Aceternity Container Scroll). */
export function Flagship({ project }: { project: Project }) {
  return (
    <section aria-label={`Featured project: ${project.shortTitle}`} className="overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mx-auto mb-6 max-w-3xl px-4">
            <Eyebrow className="flex items-center justify-center gap-2">
              <span className="text-brand">01</span>
              <span aria-hidden>/</span>
              Featured build
            </Eyebrow>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              {project.shortTitle}
            </h2>
            <p className="mx-auto mt-4 line-clamp-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-5 flex justify-center gap-6">
              <ArrowLink href={`/projects/${project.slug}`}>Read the case study</ArrowLink>
              {project.repoUrl && <ArrowLink href={project.repoUrl}>Source</ArrowLink>}
            </div>
          </div>
        }
      >
        {project.video ? (
          <VideoPlayer video={project.video} title={project.shortTitle} className="h-full w-full rounded-xl" />
        ) : (
          <Link href={`/projects/${project.slug}`} className="relative block h-full w-full" tabIndex={-1} aria-hidden>
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="rounded-xl object-cover object-left-top"
              draggable={false}
            />
          </Link>
        )}
      </ContainerScroll>
    </section>
  );
}
