"use client";

import { IconFileCv, IconMail } from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { socials } from "@/constants/socials";

/** Aceternity Floating Dock with the social links (magnifies on hover). */
export function SocialDock() {
  const items = [
    ...socials.map((s) => ({
      title: s.label,
      href: s.href,
      icon: <s.icon className="h-full w-full text-muted-foreground" stroke={1.5} />,
    })),
    {
      title: "Resume",
      href: "/resume",
      icon: <IconFileCv className="h-full w-full text-muted-foreground" stroke={1.5} />,
    },
    {
      title: "Contact",
      href: "/contact",
      icon: <IconMail className="h-full w-full text-muted-foreground" stroke={1.5} />,
    },
  ];
  return <FloatingDock items={items} desktopClassName="mx-auto w-fit" mobileClassName="hidden" />;
}
