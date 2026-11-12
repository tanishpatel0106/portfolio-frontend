import Link from "next/link";
import { socials } from "@/constants/socials";
import { SITE } from "@/constants/site";
import { MotionToggle } from "@/components/site/theme-controls";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {SITE.availability}
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. Built with Next.js,
            Tailwind and Aceternity UI.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {socials.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <s.icon className="h-4 w-4" stroke={1.75} />
              {s.label}
            </Link>
          ))}
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
};
