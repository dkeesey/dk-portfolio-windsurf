import { cn } from "@/lib/utils";
import React from "react";

interface MainContentProps {
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export function MainContent({
  children,
  className,
  fullWidth = false
}: MainContentProps) {
  return (
    <main
      className={cn(
        "flex-1 py-8",
        !fullWidth && "container mx-auto px-4",
        className
      )}
    >
      {children}
    </main>
  );
} 