import React from "react";
import { cn } from "@/lib/utils";

export const Heading = ({
  className,
  children,
  as: Tag = "h1",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) => {
  return (
    <Tag
      className={cn(
        "text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl",
        className
      )}
    >
      {children}
    </Tag>
  );
};
