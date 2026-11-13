import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { ProjectVideo } from "@/types/products";
import { StatusBadge } from "./primitives";
import { VideoPlayer } from "./video-player";
import { cn } from "@/lib/utils";

const clock = (seconds?: number) =>
  seconds ? `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}` : null;

/**
 * The same browser-style frame as a live app, playing a recorded demo. Used
 * for projects that are not deployed, so they sit beside the live ones.
 */
export function VideoDemo({
  slug,
  title,
  video,
  linkToCaseStudy = true,
  className,
}: {
  slug: string;
  title: string;
  video: ProjectVideo;
  linkToCaseStudy?: boolean;
  className?: string;
}) {
  const length = clock(video.duration);
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card shadow-sm", className)}>
      <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {slug} · recorded demo{length && ` · ${length}`}
        </div>
        <StatusBadge status="video" label="Video demo" className="hidden sm:inline-flex" />
        {linkToCaseStudy && (
          <Link
            href={`/projects/${slug}`}
            aria-label={`${title} case study`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <IconArrowUpRight className="h-4 w-4" stroke={1.75} />
          </Link>
        )}
      </div>
      <VideoPlayer video={video} title={title} fit="contain" className="aspect-video w-full" />
    </div>
  );
}
