import { Metadata } from "next";
import { PhotoStack } from "@/components/about/photo-stack";
import { PlacesMap } from "@/components/about/places-map";
import { ButtonLink, Eyebrow, SectionHeading, Shell } from "@/components/shared/primitives";
import { Reveal } from "@/components/shared/reveal";
import { ABOUT_PARAGRAPHS, ABOUT_PHOTOS } from "@/constants/about";
import { HOBBIES } from "@/constants/system-prompt";
import { SITE } from "@/constants/site";
import { timeline as work } from "@/constants/timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Tanish Patel: a Data Science graduate student at Columbia University working at the intersection of AI/ML and quantitative finance.",
};

export default function AboutPage() {
  const hobbies = HOBBIES.split("\n")
    // The list is written for the chat assistant; drop its asides here.
    .map((l) => l.replace(/^-\s*/, "").replace(/\s*\(.*?\)/g, "").trim())
    .filter(Boolean);
  const [lead, ...rest] = ABOUT_PARAGRAPHS;
  const current = work.filter((w) => /present/i.test(w.date));

  return (
    <main>
      <Shell className="pt-36 md:pt-44">
        <Eyebrow className="flex items-center gap-2">
          <span className="text-brand">About</span>
          <span aria-hidden>/</span>
          {SITE.location}
        </Eyebrow>
        <h1 className="mt-4 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
          The math has to be right, and the system has to{" "}
          <span className="font-display font-normal italic text-brand">actually work</span>.
        </h1>
      </Shell>

      <Shell className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <p className="text-pretty text-xl leading-relaxed text-foreground">{lead}</p>
          {rest.slice(0, 2).map((p) => (
            <p key={p.slice(0, 40)} className="text-pretty leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
        <div className="space-y-6">
          <PhotoStack photos={ABOUT_PHOTOS} />
          {current.length > 0 && (
            <div className="rounded-2xl border bg-card p-5">
              <Eyebrow className="text-brand">Now</Eyebrow>
              <ul className="mt-3 space-y-3">
                {current.map((role) => (
                  <li key={role.title} className="text-sm leading-relaxed">
                    <span className="font-medium text-foreground">{role.title}</span>
                    <span className="text-muted-foreground"> · {role.company}</span>
                    <p className="mt-0.5 text-muted-foreground">{role.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Shell>

      <Shell as="section" className="mt-24">
        <SectionHeading
          label="Places"
          title="From Gujarat to New York, by way of the Himalayas"
          description="Undergrad in Gandhinagar, a drone competition at IIT Roorkee, mountain trails in Uttarakhand, and now Columbia."
        />
        <div className="overflow-hidden rounded-3xl border bg-card p-2 md:p-6">
          <PlacesMap />
        </div>
      </Shell>

      <Shell className="mt-24 grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          {rest.slice(2).map((p, i) => (
            <Reveal key={p.slice(0, 40)} delay={i * 0.05}>
              <p className="text-pretty leading-relaxed text-muted-foreground">{p}</p>
            </Reveal>
          ))}
          <div className="flex flex-wrap gap-3 pt-4">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/resume" variant="outline">
              Resume
            </ButtonLink>
          </div>
        </div>
        <div>
          <Eyebrow>Away from the keyboard</Eyebrow>
          <ul className="mt-4 divide-y border-y">
            {hobbies.map((h, i) => (
              <li key={h} className="flex gap-4 py-3.5 text-sm">
                <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-foreground">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </main>
  );
}
