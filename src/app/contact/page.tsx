import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ArrowLink, Eyebrow, Shell, StatusDot } from "@/components/shared/primitives";
import { socials } from "@/constants/socials";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tanish Patel about roles in applied AI, data science and quantitative research, or a collaboration.",
};

export default function ContactPage() {
  return (
    <main>
      <Shell className="grid gap-12 pt-36 md:pt-44 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow className="flex items-center gap-2">
            <span className="text-brand">Contact</span>
            <span aria-hidden>/</span>
            {SITE.location}
          </Eyebrow>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Let’s{" "}
            <span className="font-display font-normal italic text-brand">talk</span>.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Roles in applied AI, data science and quantitative research, a
            research collaboration, or a question about something I built.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <StatusDot status="live" />
            {SITE.availability}
          </p>
          <ul className="mt-10 space-y-3">
            {socials.map((s) => (
              <li key={s.href}>
                <ArrowLink href={s.href}>
                  <s.icon className="h-4 w-4 text-muted-foreground" stroke={1.75} />
                  {s.label}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </Shell>
    </main>
  );
}
