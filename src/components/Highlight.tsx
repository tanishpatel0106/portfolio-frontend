import React from "react";
import { cn } from "@/lib/utils";

export const Highlight = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={cn(
        "rounded-sm bg-primary/20 px-1 py-0.5 text-foreground decoration-clone",
        className
      )}
    >
      {children}
    </span>
  );
};
