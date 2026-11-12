import "./globals.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/site/site-header";
import { Providers, preferencesScript } from "@/components/site/providers";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/projects";
import { research } from "@/constants/research";
import { socials } from "@/constants/socials";
import { getAllBlogs } from "../../lib/getAllBlogs";

const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Titles only: the search palette never needs the full write-ups.
  const posts = await getAllBlogs();
  const searchIndex = {
    projects: getProjects().map((p) => ({ slug: p.slug, title: p.title })),
    papers: research.map((r) => ({ slug: r.slug, title: r.title })),
    posts: posts.map((b) => ({ slug: b.slug as string, title: b.title as string })),
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    jobTitle: SITE.role,
    description: SITE.description,
    image: `${SITE.url}/images/Headshot.jpeg`,
    address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Columbia University" },
      { "@type": "CollegeOrUniversity", name: "Pandit Deendayal Energy University" },
    ],
    sameAs: socials.map((s) => s.href),
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable, displaySerif.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <Providers>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader searchIndex={searchIndex} />
          <div id="content">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
