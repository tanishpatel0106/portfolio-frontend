import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Eyebrow, Shell, Tag } from "@/components/shared/primitives";
import { Reveal } from "@/components/shared/reveal";
import { getBlogMetas } from "../../../lib/getAllBlogs";
import { formatDate } from "../../../lib/formatDate";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Articles by Tanish Patel on machine learning, data engineering and market microstructure.",
};

export default async function Blog() {
  const posts = await getBlogMetas();
  const [lead, ...rest] = posts;

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Shell className="relative pb-14 pt-36 md:pt-44">
          <Eyebrow className="flex items-center gap-2">
            <span className="text-brand">Writing</span>
            <span aria-hidden>/</span>
            {posts.length} articles
          </Eyebrow>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Notes on ML,{" "}
            <span className="font-display font-normal italic text-brand">markets</span> and the
            systems between them
          </h1>
        </Shell>
      </section>

      <Shell as="section" className="py-12">
        {lead && (
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="group grid overflow-hidden rounded-2xl border bg-card transition-colors hover:border-brand/50 md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto md:min-h-[20rem]">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span className="text-brand">Latest</span> · {formatDate(lead.date)} ·{" "}
                  {lead.readingMinutes} min read
                </p>
                <h2 className="mt-3 text-balance text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                  {lead.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-muted-foreground">{lead.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {lead.tags?.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        <ul className="mt-6 divide-y border-y">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={0.04 * i}>
              <li>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid items-center gap-5 py-6 md:grid-cols-[10rem_1fr_auto]"
                >
                  <div className="relative hidden aspect-[16/10] overflow-hidden rounded-xl border bg-muted md:block">
                    <Image src={post.image} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {formatDate(post.date)} · {post.readingMinutes} min read
                    </p>
                    <h2 className="mt-1.5 text-balance text-xl font-semibold tracking-tight group-hover:text-brand">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                  <div className="hidden flex-wrap justify-end gap-1.5 lg:flex lg:max-w-[14rem]">
                    {post.tags?.slice(0, 2).map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </main>
  );
}
