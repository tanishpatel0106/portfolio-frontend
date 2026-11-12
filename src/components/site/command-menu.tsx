"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import {
  IconArticle,
  IconBriefcase2,
  IconFlask,
  IconMail,
  IconMoon,
  IconPlayerPause,
  IconPlayerPlay,
  IconRocket,
  IconSparkles,
  IconSun,
} from "@tabler/icons-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navlinks } from "@/constants/navlinks";
import { ACCENTS } from "@/constants/site";
import { usePreferences } from "./providers";

export type SearchIndex = {
  projects: { slug: string; title: string }[];
  papers: { slug: string; title: string }[];
  posts: { slug: string; title: string }[];
};

export const OPEN_COMMAND_MENU = "tp:open-command-menu";
export const openCommandMenu = () =>
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU));

export function CommandMenu({ index }: { index: SearchIndex }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setTheme } = useTheme();
  const { setAccent, motion, setMotion } = usePreferences();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    setQuery("");
    action();
  }, []);

  const go = (href: string) => run(() => router.push(href));
  const trimmed = query.trim();

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search"
      description="Search projects, papers and posts, or ask the AI."
      showCloseButton={false}
    >
      <CommandInput
        placeholder="Search projects, papers, posts… or ask a question"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>Nothing matches. Press Enter on “Ask AI” to ask instead.</CommandEmpty>

        {trimmed.length > 2 && (
          <CommandGroup heading="Ask">
            <CommandItem
              value={`ask ai ${trimmed}`}
              onSelect={() => go(`/chat?q=${encodeURIComponent(trimmed)}`)}
            >
              <IconSparkles className="text-brand" />
              <span className="truncate">Ask AI: “{trimmed}”</span>
            </CommandItem>
          </CommandGroup>
        )}

        <CommandGroup heading="Pages">
          {navlinks.map((l) => (
            <CommandItem key={l.href} value={`page ${l.label}`} onSelect={() => go(l.href)}>
              <l.icon />
              {l.label}
            </CommandItem>
          ))}
          <CommandItem value="page contact email" onSelect={() => go("/contact")}>
            <IconMail />
            Contact
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Projects">
          {index.projects.map((p) => (
            <CommandItem
              key={p.slug}
              value={`project ${p.title}`}
              onSelect={() => go(`/projects/${p.slug}`)}
            >
              <IconBriefcase2 />
              <span className="truncate">{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Research">
          {index.papers.map((p) => (
            <CommandItem
              key={p.slug}
              value={`paper ${p.title}`}
              onSelect={() => go(`/research/${p.slug}`)}
            >
              <IconFlask />
              <span className="truncate">{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Writing">
          {index.posts.map((p) => (
            <CommandItem
              key={p.slug}
              value={`post ${p.title}`}
              onSelect={() => go(`/blog/${p.slug}`)}
            >
              <IconArticle />
              <span className="truncate">{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Preferences">
          <CommandItem value="theme light" onSelect={() => run(() => setTheme("light"))}>
            <IconSun />
            Light theme
          </CommandItem>
          <CommandItem value="theme dark" onSelect={() => run(() => setTheme("dark"))}>
            <IconMoon />
            Dark theme
          </CommandItem>
          <CommandItem value="theme system" onSelect={() => run(() => setTheme("system"))}>
            <IconRocket />
            Match system theme
          </CommandItem>
          {ACCENTS.map((a) => (
            <CommandItem
              key={a.id}
              value={`accent colour ${a.label}`}
              onSelect={() => run(() => setAccent(a.id))}
            >
              <span
                className="mx-0.5 h-3.5 w-3.5 rounded-full"
                style={{ background: a.swatch }}
              />
              {a.label} accent
            </CommandItem>
          ))}
          <CommandItem
            value="motion animation pause resume"
            onSelect={() =>
              run(() => setMotion(motion === "reduced" ? "full" : "reduced"))
            }
          >
            {motion === "reduced" ? <IconPlayerPlay /> : <IconPlayerPause />}
            {motion === "reduced" ? "Resume motion" : "Pause motion"}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
