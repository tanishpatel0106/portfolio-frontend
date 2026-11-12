import Link from "next/link";
import { IconSparkles } from "@tabler/icons-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { PrimaryCta } from "./primary-cta";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { ButtonLink, Shell, StatusDot } from "@/components/shared/primitives";
import { ROLES, SITE } from "@/constants/site";
import { timeline as work } from "@/constants/timeline";
import { timeline as education } from "@/constants/education";
import { getProjects } from "@/lib/projects";

const shortCompany = (company: string) => company.split(/\s[—–-]\s/)[0].trim();

function DeskPanel() {
  const current = work.find((w) => /present/i.test(w.date)) ?? work[0];
  const school = education[0];
  const latest = getProjects()[0];

  const rows: { key: string; value: React.ReactNode }[] = [
    {
      key: "Now",
      value: (
        <>
          {current.title}
          <span className="text-muted-foreground"> @ {shortCompany(current.company)}</span>
        </>
      ),
    },
    {
      key: "Studying",
      value: (
        <>
          MS Data Science
          <span className="text-muted-foreground"> · Columbia University</span>
        </>
      ),
    },
    { key: "Based in", value: SITE.location },
    { key: "Focus", value: SITE.focus },
    {
      key: "Latest",
      value: (
        <Link
          href={`/projects/${latest.slug}`}
          className="underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
        >
          {latest.shortTitle}
        </Link>
      ),
    },
  ];

  return (
    <div className="rounded-2xl border bg-card/80 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          status.log
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-success">
          <StatusDot status="live" />
          online
        </span>
      </div>
      <dl className="divide-y">
        {rows.map((row) => (
          <div key={row.key} className="grid grid-cols-[5.5rem_1fr] gap-3 px-4 py-3">
            <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {row.key}
            </dt>
            <dd className="text-sm leading-snug text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        {school.date.replace(/.*-\s*/, "Graduating ")}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      {/* Aceternity Dotted Glow Background, faded out toward the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      >
        <DottedGlowBackground
          gap={18}
          radius={1.4}
          opacity={0.55}
          colorLightVar="--color-neutral-400"
          colorDarkVar="--color-neutral-600"
          glowColorLightVar="--brand"
          glowColorDarkVar="--primary"
          speedMin={0.2}
          speedMax={0.9}
        />
      </div>

      <Shell className="relative grid items-end gap-12 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            <StatusDot status="live" />
            {SITE.availability}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm">
            <EncryptedText
              text="TANISH PATEL"
              revealDelayMs={55}
              encryptedClassName="text-muted-foreground"
              revealedClassName="text-foreground font-medium tracking-[0.14em]"
            />
            <span aria-hidden className="text-muted-foreground">
              /
            </span>
            <LayoutTextFlip words={ROLES} wordClassName="text-xs" />
          </div>

          <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            I build AI systems for{" "}
            <span className="font-display font-normal italic text-brand">finance</span>,
            analytics and{" "}
            <PointerHighlight
              containerClassName="inline-block"
              rectangleClassName="border-brand/70 rounded-md"
              pointerClassName="text-brand"
            >
              <span className="relative z-10 px-1">real-world decisions.</span>
            </PointerHighlight>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Data scientist, AI engineer and quant. I work on multi-agent LLM
            systems, forecasting and trading research — taking ideas from a
            research notebook to something people use in production.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryCta href="/projects">See the work</PrimaryCta>
            <ButtonLink href="/lab" variant="outline">
              <StatusDot status="live" />
              Try live apps
            </ButtonLink>
            <ButtonLink href="/chat" variant="ghost">
              <IconSparkles className="h-4 w-4" />
              Ask my AI
            </ButtonLink>
          </div>
        </div>

        <DeskPanel />
      </Shell>
    </section>
  );
}
