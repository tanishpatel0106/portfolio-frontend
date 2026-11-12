import Link from "next/link";
import React from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/** Page-width wrapper used by every section. */
export function Shell({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-4 md:px-8", className)}>
      {children}
    </Tag>
  );
}

/** Small monospace label: `01 / WORK`. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  action,
  className,
  as: Tag = "h2",
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: { href: string; label: string };
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        <Eyebrow className="flex items-center gap-2">
          {index && <span className="text-brand">{index}</span>}
          {index && <span aria-hidden>/</span>}
          {label}
        </Eyebrow>
        <Tag
          className={cn(
            "mt-3 text-balance font-semibold tracking-tight text-foreground",
            Tag === "h1" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
          )}
        >
          {title}
        </Tag>
        {description && (
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <ArrowLink href={action.href}>{action.label}</ArrowLink>}
    </div>
  );
}

const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = isExternal(href);
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
      <IconArrowUpRight
        className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        stroke={1.75}
      />
    </Link>
  );
}

type ButtonVariant = "primary" | "outline" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
  outline:
    "border bg-card/60 text-foreground hover:bg-accent backdrop-blur-sm",
  ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
};

export const buttonClass = (variant: ButtonVariant = "primary", className?: string) =>
  cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,filter,color] disabled:pointer-events-none disabled:opacity-50",
    buttonStyles[variant],
    className
  );

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const external = isExternal(href);
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={buttonClass(variant, className)}
    >
      {children}
    </Link>
  );
}

/** Monospace chip for stack items, tags and categories. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/60 px-2 py-0.5 font-mono text-[11px] leading-5 text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

export type Status = "live" | "waking" | "down" | "video" | "idle";

const statusStyles: Record<Status, { dot: string; text: string; label: string }> = {
  live: { dot: "bg-success", text: "text-success", label: "Live" },
  waking: { dot: "bg-warning", text: "text-warning", label: "Waking" },
  down: { dot: "bg-destructive", text: "text-destructive", label: "Offline" },
  video: { dot: "bg-brand", text: "text-brand", label: "Video" },
  idle: { dot: "bg-muted-foreground/50", text: "text-muted-foreground", label: "Checking" },
};

export function StatusDot({
  status,
  pulse = status === "live",
  className,
}: {
  status: Status;
  pulse?: boolean;
  className?: string;
}) {
  const s = statusStyles[status];
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
            s.dot
          )}
        />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", s.dot)} />
    </span>
  );
}

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm",
        s.text,
        className
      )}
    >
      <StatusDot status={status} />
      {label ?? s.label}
    </span>
  );
}

/** Continuous horizontal marquee. Pauses on hover and when motion is reduced. */
export function Marquee({
  children,
  className,
  durationSeconds = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="marquee-track flex shrink-0 items-center group-hover/marquee:[animation-play-state:paused]"
          style={{
            animationDuration: `${durationSeconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
