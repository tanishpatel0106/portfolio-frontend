import { Metadata } from "next";
import { IconFileText } from "@tabler/icons-react";
import { ExperienceTimeline } from "@/components/resume/experience-timeline";
import { PrintButton } from "@/components/resume/print-button";
import { ButtonLink, Eyebrow, SectionHeading, Shell, Tag } from "@/components/shared/primitives";
import { timeline as work } from "@/constants/timeline";
import { timeline as education } from "@/constants/education";
import { timeline as leadership } from "@/constants/leadership";
import { timeline as cocurricular } from "@/constants/cocurricular";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Tanish Patel: experience in applied AI and data science, education at Columbia University and PDEU, leadership and awards.",
};

export default function ResumePage() {
  const awards = cocurricular.flatMap((c) => c.responsibilities);

  return (
    <main>
      <Shell className="pt-36 md:pt-44">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="flex items-center gap-2">
              <span className="text-brand">Resume</span>
              <span aria-hidden>/</span>
              {SITE.availability}
            </Eyebrow>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
              {SITE.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {SITE.role} · {SITE.location}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-3">
            <PrintButton />
            <ButtonLink href="/contact" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </div>
      </Shell>

      <Shell as="section" className="mt-16">
        <SectionHeading index="01" label="Experience" title="Work history" className="mb-0" />
        <ExperienceTimeline roles={work} />
      </Shell>

      <Shell as="section" className="mt-16">
        <SectionHeading index="02" label="Education" title="Education" />
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((e) => (
            <div key={e.company} className="flex flex-col rounded-2xl border bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {e.date}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{e.title}</h3>
              <p className="mt-1 text-sm font-medium text-brand">{e.company}</p>
              <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
              {e.courses && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.courses.split(",").map((c) => (
                    <Tag key={c}>{c.trim()}</Tag>
                  ))}
                </div>
              )}
              {e.transcript && (
                <a
                  href={e.transcript}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-print mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-foreground underline-offset-4 hover:text-brand hover:underline"
                >
                  <IconFileText className="h-4 w-4" stroke={1.75} />
                  Transcript (PDF)
                </a>
              )}
            </div>
          ))}
        </div>
      </Shell>

      <Shell as="section" className="mt-24 grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading index="03" label="Leadership" title="Leadership" />
          <ul className="space-y-6">
            {leadership.map((l) => (
              <li key={l.company} className="border-l-2 border-border pl-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {l.date}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">{l.title}</h3>
                <p className="text-sm font-medium text-brand">{l.company}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {l.responsibilities.map((r) => (
                    <li key={r.slice(0, 48)}>{r}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading index="04" label="Awards" title="Hackathons and awards" />
          <ul className="divide-y border-y">
            {awards.map((a, i) => (
              <li key={a.slice(0, 48)} className="flex gap-4 py-3.5 text-sm leading-relaxed">
                <span className="pt-0.5 font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted-foreground">{a.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </main>
  );
}
