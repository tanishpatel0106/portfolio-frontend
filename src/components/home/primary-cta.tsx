"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/** Primary call to action with Aceternity's Hover Border Gradient. */
export function PrimaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <HoverBorderGradient
      as={Link}
      {...{ href }}
      containerClassName="rounded-full"
      className="flex h-11 items-center gap-2 bg-neutral-950 px-5 text-sm font-medium text-white"
    >
      {children}
      <IconArrowRight className="h-4 w-4" />
    </HoverBorderGradient>
  );
}
