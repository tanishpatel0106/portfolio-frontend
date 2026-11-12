"use client";

import { Terminal } from "@/components/ui/terminal";
import { useAppStatuses } from "@/hooks/use-app-status";

/**
 * Aceternity Terminal replaying the health checks behind the status dots.
 * The output lines are the real results from /api/status.
 */
export function StatusTerminal({ apps }: { apps: { slug: string; host: string }[] }) {
  const statuses = useAppStatuses();
  const ready = apps.every((a) => statuses[a.slug]);

  if (!ready) {
    return (
      <div className="flex h-56 items-center justify-center rounded-2xl border bg-card font-mono text-xs text-muted-foreground">
        running health checks…
      </div>
    );
  }

  const commands = apps.map((a) => `curl -sI https://${a.host}`);
  const outputs = Object.fromEntries(
    apps.map((a, i) => {
      const s = statuses[a.slug];
      const line =
        s.state === "live"
          ? `200 OK  ·  ${s.latencyMs} ms  ·  live`
          : s.state === "waking"
            ? "no answer yet  ·  container is asleep (free tier), launch to wake it"
            : "unreachable right now";
      return [i, [line]];
    })
  );

  return (
    <Terminal
      commands={commands}
      outputs={outputs}
      username="tanish@lab"
      typingSpeed={22}
      delayBetweenCommands={500}
      enableSound={false}
      className="w-full"
    />
  );
}
