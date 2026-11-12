import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { formatDate } from "../../lib/formatDate";
import { Prose } from "@/components/Prose";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Shell, Tag } from "@/components/shared/primitives";

type BlogMeta = {
  title: string;
  description?: string;
  date: string;
  image: string;
  tags?: string[];
};

/** Wrapper used by every MDX post (`export default (props) => <BlogLayout meta={meta} {...props} />`). */
export function BlogLayout({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: BlogMeta;
}) {
  return (
    <main>
      <article>
        <Shell className="max-w-3xl pt-28 md:pt-36">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            All writing
          </Link>
          <header className="mt-8">
            <time
              dateTime={meta.date}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              {formatDate(meta.date)}
            </time>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {meta.title}
            </h1>
            {meta.description && (
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {meta.description}
              </p>
            )}
            {meta.tags && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {meta.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}
          </header>
        </Shell>

        <Shell className="mt-10 max-w-4xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={meta.image}
              alt=""
              fill
              priority
              sizes="(min-width: 896px) 832px, 100vw"
              className="object-cover"
            />
          </div>
        </Shell>

        <Shell className="mt-12 max-w-3xl lg:pl-12">
          {/* Aceternity Tracing Beam tracks reading progress. */}
          <TracingBeam className="h-auto max-w-none">
            <Prose>{children}</Prose>
          </TracingBeam>
        </Shell>
      </article>
    </main>
  );
}
