import React from "react";
import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-4xl px-4 pb-20 pt-28 md:px-10 md:pt-32",
        className
      )}
    >
      {children}
    </main>
  );
};
