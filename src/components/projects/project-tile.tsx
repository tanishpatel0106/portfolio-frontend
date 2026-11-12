"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { StatusBadge, Tag, type Status } from "@/components/shared/primitives";
import { CATEGORY_LABELS, type LinkKind, type ProjectCard } from "@/lib/projects";
import type { AppStatus } from "@/lib/app-status";
import { cn } from "@/lib/utils";

const KIND_LABEL: Partial<Record<LinkKind, string>> = {
  github: "Source",
  paper: "Paper",
  slides: "Slides",
  document: "Report",
  post: "Post",
  site: "Site",
};

function badgeFor(project: ProjectCard, status?: AppStatus): { status: Status; label: string } | null {
  if (project.isLive) {
    if (project.liveKind === "external") return { status: "live", label: "Live site" };
    return { status: status?.state ?? "live", label: status?.state === "waking" ? "Waking" : "Live demo" };
  }
  if (project.video) return { status: "video", label: "Video" };
  return null;
}

/**
 * Project card: screenshot (or hover-to-play video), status badge, title,
 * summary and stack. The border uses Aceternity's Glowing Effect.
 */
export function ProjectTile({
  project,
  status,
  size = "md",
  priority = false,
  className,
}: {
  project: ProjectCard;
  status?: AppStatus;
  size?: "md" | "lg";
  priority?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const badge = badgeFor(project, status);
  const kind = KIND_LABEL[project.linkKind];

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
      className={cn(
        "group relative flex h-full flex-col rounded-[1.35rem] border p-1.5 outline-offset-4",
        className
      )}
    >
      <GlowingEffect spread={36} glow={false} disabled={false} proximity={56} inactiveZone={0.01} borderWidth={2} />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-muted",
            size === "lg" ? "aspect-[16/9]" : "aspect-[16/10]"
          )}
        >
          <Image
            src={project.thumbnail}
            alt=""
            fill
            priority={priority}
            sizes={size === "lg" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {project.video && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              muted
              loop
              playsInline
              preload="none"
              poster={project.video.poster}
              aria-hidden
            >
              {project.video.webm && <source src={project.video.webm} type="video/webm" />}
              <source src={project.video.src} type="video/mp4" />
            </video>
          )}
          <div className="absolute left-3 top-3 flex gap-1.5">
            {badge && <StatusBadge status={badge.status} label={badge.label} />}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {CATEGORY_LABELS[project.category]}
              {kind && <span className="text-muted-foreground/60"> · {kind}</span>}
            </p>
            <IconArrowUpRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              stroke={1.75}
            />
          </div>
          <h3
            className={cn(
              "mt-2 text-balance font-semibold tracking-tight text-foreground",
              size === "lg" ? "text-xl md:text-2xl" : "text-lg"
            )}
          >
            {project.shortTitle}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          {project.stack.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {project.stack.slice(0, size === "lg" ? 5 : 3).map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
