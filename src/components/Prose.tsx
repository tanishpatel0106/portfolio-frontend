import { cn } from "@/lib/utils";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        "prose-headings:scroll-mt-28 prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground",
        "prose-a:text-brand prose-a:underline-offset-4 prose-strong:text-foreground",
        "prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:rounded-xl prose-pre:border prose-pre:bg-neutral-950",
        className
      )}
    >
      {children}
    </div>
  );
}
