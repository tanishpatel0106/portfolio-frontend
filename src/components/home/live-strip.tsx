"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { StatusDot } from "@/components/shared/primitives";
import { useAppStatuses } from "@/hooks/use-app-status";

export type LiveAppCard = {
  slug: string;
  title: string;
  host: string;
  thumbnail: string;
  /** A recorded demo instead of a deployed app. */
  videoOnly?: boolean;
};

/** Compact list of things to run or watch: live apps (with a real health check) and video demos. */
export function LiveStrip({ apps }: { apps: LiveAppCard[] }) {
  const statuses = useAppStatuses();
  return (
    <ul className="divide-y overflow-hidden rounded-2xl border bg-card">
      {apps.map((app) => {
        const status = statuses[app.slug];
        return (
          <li key={app.slug}>
            <Link
              href={`/lab#${app.slug}`}
              className="group flex items-center gap-4 p-4 transition-colors hover:bg-accent/60"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-muted">
                <Image src={app.thumbnail} alt="" fill sizes="48px" className="object-cover object-left-top" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">{app.title}</span>
                <span className="block truncate font-mono text-[11px] text-muted-foreground">{app.host}</span>
              </span>
              <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:inline-flex">
                {app.videoOnly ? (
                  <>
                    <StatusDot status="video" />
                    video demo
                  </>
                ) : (
                  <>
                    <StatusDot status={status?.state ?? "idle"} />
                    {status
                      ? status.state === "live"
                        ? `${status.latencyMs} ms`
                        : status.state
                      : "checking"}
                  </>
                )}
              </span>
              <IconArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                stroke={1.75}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
