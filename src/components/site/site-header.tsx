"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

const items = navlinks
  .filter((l) => l.href !== "/")
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

export function SiteHeader() {
  const pathname = usePathname();
  const active = sectionOf(pathname);
  const [open, setOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <Logo />
        <NavItems items={items} activeHref={active} />
        <div className="relative z-20 flex items-center gap-0.5">
          <AccentPicker />
          <ThemeToggle />
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Logo />
          <div className="flex items-center gap-0.5">
            <AccentPicker />
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
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
