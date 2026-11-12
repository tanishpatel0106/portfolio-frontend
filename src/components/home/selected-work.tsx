"use client";

import { ProjectTile } from "@/components/projects/project-tile";
import { Reveal } from "@/components/shared/reveal";
import { useAppStatuses } from "@/hooks/use-app-status";
import type { ProjectCard } from "@/lib/projects";
import { cn } from "@/lib/utils";

// 3-column bento: wide+narrow, narrow+wide, then three across.
const SPANS = ["lg:col-span-2", "", "", "lg:col-span-2", "", "", ""];

export function SelectedWork({ projects }: { projects: ProjectCard[] }) {
  const statuses = useAppStatuses();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 0.06} className={cn(SPANS[i % SPANS.length])}>
          <ProjectTile
            project={p}
            status={statuses[p.slug]}
            size={SPANS[i % SPANS.length] ? "lg" : "md"}
          />
        </Reveal>
      ))}
    </div>
  );
}
