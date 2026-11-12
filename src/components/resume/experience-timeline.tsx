"use client";

import { Timeline } from "@/components/ui/timeline";

export type Role = {
  company: string;
  title: string;
  date: string;
  description: string;
  responsibilities: string[];
};

/** Aceternity Timeline: dates stick on the left while the role scrolls past. */
export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  return (
    <Timeline
      data={roles.map((role) => ({
        title: role.date,
        content: (
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {role.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-brand">{role.company}</p>
            {role.description && (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {role.description}
              </p>
            )}
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {role.responsibilities.map((r) => (
                <li key={r.slice(0, 48)} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ),
      }))}
    />
  );
}
