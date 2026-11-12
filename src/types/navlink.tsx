import type { Icon } from "@tabler/icons-react";

export type Navlink = {
  href: string;
  label: string;
  icon?: Icon | React.ComponentType<{ className?: string }> | any;
};
