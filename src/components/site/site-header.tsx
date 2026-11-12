"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconSearch, IconSparkles } from "@tabler/icons-react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { navlinks } from "@/constants/navlinks";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import { AccentPicker, ThemeToggle } from "./theme-controls";
import { CommandMenu, openCommandMenu, type SearchIndex } from "./command-menu";

// "Home" lives on the logo and "Ask AI" is the call-to-action button.
const items = navlinks
  .filter((l) => l.href !== "/" && l.href !== "/chat")
  .map((l) => ({ name: l.label, link: l.href }));

/** Top-level section for the current path ("/projects/foo" → "/projects"). */
const sectionOf = (pathname: string) =>
  "/" + (pathname.split("/").filter(Boolean)[0] ?? "");

function Logo() {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-accent"
    >
      <Image
        src="/images/Headshot.jpeg"
        alt=""
        width={32}
        height={32}
        priority
        className="h-8 w-8 rounded-full object-cover object-top ring-1 ring-border"
      />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight">{SITE.name}</span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Data · AI · Quant
        </span>
      </span>
    </Link>
  );
}

function SearchButton() {
  return (
    <button
      type="button"
      onClick={openCommandMenu}
      aria-label="Search (Command K)"
      title="Search  ⌘K"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <IconSearch className="h-[18px] w-[18px]" stroke={1.75} />
    </button>
  );
}

export function SiteHeader({ searchIndex }: { searchIndex: SearchIndex }) {
  const pathname = usePathname();
  const active = sectionOf(pathname);
  const [open, setOpen] = useState(false);

  return (
    <header>
      <Navbar>
        <NavBody>
          <Logo />
          <NavItems items={items} activeHref={active} />
          <div className="relative z-20 flex items-center gap-0.5">
            <SearchButton />
            <AccentPicker />
            <ThemeToggle />
            <Link
              href="/chat"
              className={cn(
                "ml-1.5 inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-85",
                active === "/chat" && "ring-2 ring-brand ring-offset-2 ring-offset-background"
              )}
            >
              <IconSparkles className="h-4 w-4" stroke={1.75} />
              Ask AI
            </Link>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <div className="flex items-center gap-0.5">
              <SearchButton />
              <ThemeToggle />
              <MobileNavToggle isOpen={open} onClick={() => setOpen((o) => !o)} />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
            {navlinks.map((l) => {
              const isActive = active === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                    isActive && "bg-accent text-foreground"
                  )}
                >
                  <l.icon
                    className={cn("h-[18px] w-[18px]", isActive && "text-brand")}
                    stroke={1.75}
                  />
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-2 flex w-full items-center justify-between border-t px-3 pt-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Accent
              </span>
              <AccentPicker />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <CommandMenu index={searchIndex} />
    </header>
  );
}
