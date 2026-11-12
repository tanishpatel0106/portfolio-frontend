import { ButtonLink, Eyebrow, Shell } from "@/components/shared/primitives";

export default function NotFound() {
  return (
    <main>
      <Shell className="flex min-h-[70vh] flex-col items-start justify-center pt-32">
        <Eyebrow className="text-brand">404</Eyebrow>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
          That page isn’t{" "}
          <span className="font-display font-normal italic text-brand">here</span>.
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The link may be old or mistyped. The work, research and writing are
          all still around.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/projects" variant="outline">
            See the work
          </ButtonLink>
        </div>
      </Shell>
    </main>
  );
}
