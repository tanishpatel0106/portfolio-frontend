import Link from "next/link";
import { socials } from "@/constants/socials";
import { navlinks } from "@/constants/navlinks";
import { SITE } from "@/constants/site";
import { MotionToggle } from "@/components/site/theme-controls";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Eyebrow, Shell, StatusDot } from "@/components/shared/primitives";

export const Footer = () => {
  return (
    <footer className="mt-28 border-t">
      <Shell className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <StatusDot status="live" />
            {SITE.availability}
          </p>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Data scientist, AI engineer and quant, based in {SITE.location}.
            Building AI systems for finance, analytics and research.
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm font-medium underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
          >
            Get in touch
          </Link>
        </div>

        <nav aria-label="Footer">
          <Eyebrow>Site</Eyebrow>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {navlinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <Eyebrow>Elsewhere</Eyebrow>
          <ul className="mt-4 space-y-2.5 text-sm">
            {socials.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" stroke={1.75} />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Shell>

      {/* Aceternity Text Hover Effect: outline wordmark that lights up under the cursor. */}
      <div aria-hidden className="mx-auto hidden h-44 max-w-6xl px-4 md:block lg:h-56">
        <TextHoverEffect text="TANISH" />
      </div>

      <Shell className="flex flex-col gap-3 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Built with Next.js, Tailwind
          and Aceternity UI.
        </p>
        <div className="flex items-center gap-5">
          <span className="font-mono">
            Press <kbd className="rounded border bg-muted px-1.5 py-0.5">⌘K</kbd> to search
          </span>
          <MotionToggle />
        </div>
      </Shell>
    </footer>
  );
};
